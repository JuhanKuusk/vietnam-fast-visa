#!/usr/bin/env node

/**
 * Match our tours with bestpricetravel.com tours using REAL TITLES
 * fetched from the actual pages
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TITLES_FILE = path.join(__dirname, 'bestprice-tour-titles.json');
const ANALYSIS_FILE = path.join(__dirname, 'bestprice-url-analysis.json');
const TOURS_DATA_FILE = path.join(__dirname, '..', 'src', 'lib', 'tours-data.ts');

// Load data
const titlesData = JSON.parse(fs.readFileSync(TITLES_FILE, 'utf-8'));
const { missing } = JSON.parse(fs.readFileSync(ANALYSIS_FILE, 'utf-8'));

// Clean title for matching
function cleanTitle(title) {
  return title
    .replace(/\s*\|\s*BestPrice Travel\s*$/, '')
    .replace(/:\s*Price\s*&\s*Itiner(ary)?\s*\d*\s*$/i, '')
    .replace(/\s*\d+\s*(days?|nights?)\s*$/i, '')
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Extract key terms
function getKeyTerms(text) {
  const fillers = new Set([
    'the', 'and', 'for', 'from', 'with', 'tour', 'tours', 'trip',
    'day', 'days', 'night', 'nights', 'vietnam', 'private', 'small',
    'group', 'best', 'price', 'travel', 'of', 'to', 'in', 'a', 'an'
  ]);

  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2 && !fillers.has(w));
}

// Calculate match score between two titles
function matchScore(ourTitle, theirTitle) {
  const ourTerms = getKeyTerms(ourTitle);
  const theirTerms = getKeyTerms(cleanTitle(theirTitle));

  if (ourTerms.length === 0 || theirTerms.length === 0) return 0;

  let matches = 0;
  const matchedOur = [];
  const matchedTheir = [];

  for (const ourTerm of ourTerms) {
    for (const theirTerm of theirTerms) {
      // Exact match
      if (ourTerm === theirTerm) {
        matches += 2;
        matchedOur.push(ourTerm);
        matchedTheir.push(theirTerm);
        break;
      }
      // Partial match (one contains the other)
      if (ourTerm.length >= 4 && theirTerm.length >= 4) {
        if (ourTerm.includes(theirTerm) || theirTerm.includes(ourTerm)) {
          matches += 1;
          matchedOur.push(ourTerm);
          matchedTheir.push(theirTerm);
          break;
        }
      }
    }
  }

  const maxPossible = ourTerms.length * 2;
  return matches / maxPossible;
}

// Build index of real titles
const titleIndex = titlesData.map(t => ({
  url: t.url,
  title: t.title,
  cleanTitle: cleanTitle(t.title)
}));

console.log('===========================================');
console.log('  Matching Tours with REAL Titles');
console.log('===========================================\n');
console.log(`Tours to match: ${missing.length}`);
console.log(`Real titles available: ${titleIndex.length}\n`);

const results = {
  highConfidence: [],  // >= 60%
  mediumConfidence: [], // 40-60%
  lowConfidence: [],   // 25-40%
  noMatch: []          // < 25%
};

for (const tour of missing) {
  let bestMatch = null;
  let bestScore = 0;

  for (const entry of titleIndex) {
    const score = matchScore(tour.name, entry.title);
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  const result = {
    id: tour.id,
    name: tour.name,
    currentUrl: tour.affiliateUrl,
    matchedUrl: bestMatch?.url,
    matchedTitle: bestMatch?.title?.replace(/\s*\|\s*BestPrice Travel\s*$/, ''),
    score: bestScore
  };

  if (bestScore >= 0.6) {
    results.highConfidence.push(result);
  } else if (bestScore >= 0.4) {
    results.mediumConfidence.push(result);
  } else if (bestScore >= 0.25) {
    results.lowConfidence.push(result);
  } else {
    results.noMatch.push(result);
  }
}

console.log('=== HIGH CONFIDENCE (>= 60%) ===');
console.log(`${results.highConfidence.length} tours\n`);
results.highConfidence.forEach(r => {
  console.log(`  ✅ "${r.name}" (${(r.score * 100).toFixed(0)}%)`);
  console.log(`     -> "${r.matchedTitle}"`);
  console.log(`     URL: ${r.matchedUrl}\n`);
});

console.log('\n=== MEDIUM CONFIDENCE (40-60%) ===');
console.log(`${results.mediumConfidence.length} tours\n`);
results.mediumConfidence.forEach(r => {
  console.log(`  ⚠️  "${r.name}" (${(r.score * 100).toFixed(0)}%)`);
  console.log(`     -> "${r.matchedTitle}"`);
  console.log(`     URL: ${r.matchedUrl}\n`);
});

console.log('\n=== LOW CONFIDENCE (25-40%) ===');
console.log(`${results.lowConfidence.length} tours\n`);
results.lowConfidence.slice(0, 15).forEach(r => {
  console.log(`  ❓ "${r.name}" (${(r.score * 100).toFixed(0)}%)`);
  console.log(`     -> "${r.matchedTitle}"\n`);
});

console.log('\n=== NO MATCH (< 25%) ===');
console.log(`${results.noMatch.length} tours\n`);
results.noMatch.forEach(r => {
  console.log(`  ❌ "${r.name}" (${(r.score * 100).toFixed(0)}%)`);
});

console.log('\n===========================================');
console.log('  SUMMARY');
console.log('===========================================');
console.log(`High confidence (auto-fix): ${results.highConfidence.length}`);
console.log(`Medium confidence (review): ${results.mediumConfidence.length}`);
console.log(`Low confidence (manual): ${results.lowConfidence.length}`);
console.log(`No match: ${results.noMatch.length}`);
console.log(`Total missing: ${missing.length}`);

// Save results
fs.writeFileSync(
  path.join(__dirname, 'real-title-matching.json'),
  JSON.stringify(results, null, 2)
);
console.log('\nResults saved to real-title-matching.json');

// If --apply flag, apply high + medium confidence fixes
if (process.argv.includes('--apply')) {
  console.log('\n=== APPLYING FIXES ===');

  let content = fs.readFileSync(TOURS_DATA_FILE, 'utf-8');
  let fixedCount = 0;

  const toApply = [...results.highConfidence, ...results.mediumConfidence];

  for (const tour of toApply) {
    const oldUrl = tour.currentUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`affiliateUrl:\\s*"${oldUrl}"`, 'g');
    const newContent = content.replace(pattern, `affiliateUrl: "${tour.matchedUrl}"`);

    if (newContent !== content) {
      content = newContent;
      fixedCount++;
      console.log(`Fixed: ${tour.id} -> ${tour.matchedTitle}`);
    }
  }

  fs.writeFileSync(TOURS_DATA_FILE, content);
  console.log(`\n✅ Applied ${fixedCount} fixes to tours-data.ts`);
}
