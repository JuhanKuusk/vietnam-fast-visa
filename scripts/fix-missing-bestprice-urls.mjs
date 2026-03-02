#!/usr/bin/env node

/**
 * Try to match missing bestpricetravel.com URLs with real ones
 * using smart name matching
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ANALYSIS_FILE = path.join(__dirname, 'bestprice-url-analysis.json');
const REAL_URLS_FILE = path.join(__dirname, 'all-bestprice-urls.json');
const TOURS_DATA_FILE = path.join(__dirname, '..', 'src', 'lib', 'tours-data.ts');

// Load data
const { missing } = JSON.parse(fs.readFileSync(ANALYSIS_FILE, 'utf-8'));
const realUrls = JSON.parse(fs.readFileSync(REAL_URLS_FILE, 'utf-8'));

// Create index of real URLs by key terms
const realUrlIndex = {};
for (const url of realUrls) {
  const match = url.match(/\/([^\/]+)\.html$/);
  if (match) {
    const slug = match[1].toLowerCase();
    realUrlIndex[slug] = url;
  }
}

// Extract key terms from tour name
function getKeyTerms(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\d+\s*(days?|nights?|d|n)/gi, '')
    .split(/\s+/)
    .filter(w => w.length > 2 && !['the', 'and', 'for', 'from', 'with', 'tour', 'vietnam'].includes(w));
}

// Calculate match score between tour and URL
function matchScore(tourName, urlSlug) {
  const tourTerms = getKeyTerms(tourName);
  const urlTerms = urlSlug.split('-').filter(w => w.length > 2);

  let matches = 0;
  for (const term of tourTerms) {
    if (urlTerms.some(ut => ut.includes(term) || term.includes(ut))) {
      matches++;
    }
  }

  return tourTerms.length > 0 ? matches / tourTerms.length : 0;
}

// Find best matching URL
function findBestMatch(tour) {
  let bestUrl = null;
  let bestScore = 0;

  for (const [slug, url] of Object.entries(realUrlIndex)) {
    const score = matchScore(tour.name, slug);
    if (score > bestScore) {
      bestScore = score;
      bestUrl = url;
    }
  }

  return { url: bestUrl, score: bestScore };
}

console.log('===========================================');
console.log('  Matching Missing URLs with Real Ones');
console.log('===========================================\n');
console.log(`Missing tours to match: ${missing.length}`);
console.log(`Real URLs available: ${realUrls.length}\n`);

const results = {
  matched: [],
  unmatched: []
};

for (const tour of missing) {
  const match = findBestMatch(tour);

  if (match.score >= 0.5) {
    results.matched.push({
      ...tour,
      newUrl: match.url,
      score: match.score
    });
  } else {
    results.unmatched.push({
      ...tour,
      bestMatch: match.url,
      score: match.score
    });
  }
}

console.log(`\n=== MATCHED (score >= 50%) ===`);
console.log(`${results.matched.length} tours can be updated\n`);
results.matched.slice(0, 20).forEach(t => {
  console.log(`  ${t.name} (${(t.score * 100).toFixed(0)}%)`);
  console.log(`    OLD: ${t.affiliateUrl}`);
  console.log(`    NEW: ${t.newUrl}\n`);
});

console.log(`\n=== UNMATCHED (score < 50%) ===`);
console.log(`${results.unmatched.length} tours cannot be matched\n`);
results.unmatched.slice(0, 20).forEach(t => {
  console.log(`  ${t.name} (best: ${(t.score * 100).toFixed(0)}%)`);
  console.log(`    Current: ${t.affiliateUrl}`);
  console.log(`    Best guess: ${t.bestMatch}\n`);
});

// Summary
console.log('\n===========================================');
console.log('  SUMMARY');
console.log('===========================================');
console.log(`Can be matched: ${results.matched.length}`);
console.log(`Cannot be matched: ${results.unmatched.length}`);
console.log(`\nRecommendation:`);
console.log(`- Update ${results.matched.length} tours with new URLs`);
console.log(`- Remove ${results.unmatched.length} tours (URLs don't exist)`);

// Save results
fs.writeFileSync(
  path.join(__dirname, 'missing-url-fixes.json'),
  JSON.stringify(results, null, 2)
);
console.log(`\nResults saved to missing-url-fixes.json`);

// If user confirms, we can apply fixes
if (process.argv.includes('--apply')) {
  console.log('\n=== APPLYING FIXES ===');
  let content = fs.readFileSync(TOURS_DATA_FILE, 'utf-8');
  let fixedCount = 0;

  for (const tour of results.matched) {
    const oldUrl = tour.affiliateUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`affiliateUrl:\\s*"${oldUrl}"`, 'g');
    const newContent = content.replace(pattern, `affiliateUrl: "${tour.newUrl}"`);

    if (newContent !== content) {
      content = newContent;
      fixedCount++;
      console.log(`Fixed: ${tour.id}`);
    }
  }

  fs.writeFileSync(TOURS_DATA_FILE, content);
  console.log(`\n✅ Applied ${fixedCount} fixes to tours-data.ts`);
}
