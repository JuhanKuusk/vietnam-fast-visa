#!/usr/bin/env node

/**
 * Match our tours with bestpricetravel.com tours by TITLE
 * Fetch the actual page titles from real URLs
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REAL_URLS_FILE = path.join(__dirname, 'all-bestprice-urls.json');
const TOURS_DATA_FILE = path.join(__dirname, '..', 'src', 'lib', 'tours-data.ts');
const ANALYSIS_FILE = path.join(__dirname, 'bestprice-url-analysis.json');

// Load data
const realUrls = JSON.parse(fs.readFileSync(REAL_URLS_FILE, 'utf-8'));
const { missing } = JSON.parse(fs.readFileSync(ANALYSIS_FILE, 'utf-8'));

// Extract readable title from URL slug
function urlToTitle(url) {
  const match = url.match(/\/([^\/]+)\.html$/);
  if (!match) return '';

  return match[1]
    .replace(/-/g, ' ')
    .replace(/(\d+)\s*days?/gi, '$1 days')
    .replace(/(\d+)\s*nights?/gi, '$1 nights')
    .toLowerCase();
}

// Normalize title for matching
function normalizeTitle(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Calculate word overlap score
function wordOverlapScore(title1, title2) {
  const words1 = normalizeTitle(title1).split(' ').filter(w => w.length > 2);
  const words2 = normalizeTitle(title2).split(' ').filter(w => w.length > 2);

  // Remove common filler words
  const fillers = new Set(['the', 'and', 'for', 'from', 'with', 'tour', 'tours', 'trip', 'day', 'days', 'night', 'nights', 'vietnam', 'private', 'small', 'group']);
  const filtered1 = words1.filter(w => !fillers.has(w));
  const filtered2 = words2.filter(w => !fillers.has(w));

  if (filtered1.length === 0 || filtered2.length === 0) {
    // Fall back to original words
    let matches = 0;
    for (const w1 of words1) {
      for (const w2 of words2) {
        if (w1 === w2 || w1.includes(w2) || w2.includes(w1)) {
          matches++;
          break;
        }
      }
    }
    return matches / Math.max(words1.length, words2.length);
  }

  let matches = 0;
  for (const w1 of filtered1) {
    for (const w2 of filtered2) {
      if (w1 === w2 || (w1.length > 3 && w2.length > 3 && (w1.includes(w2) || w2.includes(w1)))) {
        matches++;
        break;
      }
    }
  }

  return matches / Math.max(filtered1.length, filtered2.length);
}

// Build index of real URLs with their extracted titles
const urlIndex = realUrls.map(url => ({
  url,
  title: urlToTitle(url)
}));

console.log('===========================================');
console.log('  Matching Tours by Title');
console.log('===========================================\n');
console.log(`Tours to match: ${missing.length}`);
console.log(`Real URLs available: ${realUrls.length}\n`);

// Sample of URL titles
console.log('Sample URL titles:');
urlIndex.slice(0, 5).forEach(u => console.log(`  "${u.title}" -> ${u.url}`));
console.log();

const results = {
  highConfidence: [], // score >= 0.7
  mediumConfidence: [], // score 0.5-0.7
  lowConfidence: [], // score 0.3-0.5
  noMatch: [] // score < 0.3
};

for (const tour of missing) {
  let bestMatch = null;
  let bestScore = 0;

  for (const entry of urlIndex) {
    const score = wordOverlapScore(tour.name, entry.title);
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
    matchedTitle: bestMatch?.title,
    score: bestScore
  };

  if (bestScore >= 0.7) {
    results.highConfidence.push(result);
  } else if (bestScore >= 0.5) {
    results.mediumConfidence.push(result);
  } else if (bestScore >= 0.3) {
    results.lowConfidence.push(result);
  } else {
    results.noMatch.push(result);
  }
}

console.log('=== HIGH CONFIDENCE (>= 70%) ===');
console.log(`${results.highConfidence.length} tours\n`);
results.highConfidence.slice(0, 15).forEach(r => {
  console.log(`  "${r.name}" (${(r.score * 100).toFixed(0)}%)`);
  console.log(`    -> "${r.matchedTitle}"`);
  console.log(`    URL: ${r.matchedUrl}\n`);
});

console.log('\n=== MEDIUM CONFIDENCE (50-70%) ===');
console.log(`${results.mediumConfidence.length} tours\n`);
results.mediumConfidence.slice(0, 10).forEach(r => {
  console.log(`  "${r.name}" (${(r.score * 100).toFixed(0)}%)`);
  console.log(`    -> "${r.matchedTitle}"`);
  console.log(`    URL: ${r.matchedUrl}\n`);
});

console.log('\n=== LOW CONFIDENCE (30-50%) ===');
console.log(`${results.lowConfidence.length} tours\n`);
results.lowConfidence.slice(0, 10).forEach(r => {
  console.log(`  "${r.name}" (${(r.score * 100).toFixed(0)}%)`);
  console.log(`    -> "${r.matchedTitle}"`);
  console.log(`    URL: ${r.matchedUrl}\n`);
});

console.log('\n=== NO MATCH (< 30%) ===');
console.log(`${results.noMatch.length} tours\n`);
results.noMatch.forEach(r => {
  console.log(`  "${r.name}" (${(r.score * 100).toFixed(0)}%)`);
  console.log(`    Best guess: "${r.matchedTitle}"\n`);
});

console.log('\n===========================================');
console.log('  SUMMARY');
console.log('===========================================');
console.log(`High confidence (can auto-fix): ${results.highConfidence.length}`);
console.log(`Medium confidence (review recommended): ${results.mediumConfidence.length}`);
console.log(`Low confidence (manual review needed): ${results.lowConfidence.length}`);
console.log(`No match found: ${results.noMatch.length}`);

// Save results
fs.writeFileSync(
  path.join(__dirname, 'title-matching-results.json'),
  JSON.stringify(results, null, 2)
);
console.log('\nResults saved to title-matching-results.json');
