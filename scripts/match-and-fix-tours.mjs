#!/usr/bin/env node

/**
 * Script to match our tours with real bestpricetravel.com URLs
 * and fix the affiliateUrl values
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOURS_DATA_FILE = path.join(__dirname, '..', 'src', 'lib', 'tours-data.ts');
const REAL_URLS_FILE = path.join(__dirname, 'all-bestprice-urls.json');

// Load real URLs
const realUrls = JSON.parse(fs.readFileSync(REAL_URLS_FILE, 'utf-8'));

// Extract tour name from URL
function extractNameFromUrl(url) {
  // Get the last part of URL without .html
  const match = url.match(/\/([^\/]+)\.html$/);
  if (!match) return '';

  // Convert to readable name
  return match[1]
    .replace(/-/g, ' ')
    .replace(/\d+\s*(days?|nights?|d|n)/gi, '')
    .replace(/full\s*day/gi, '')
    .replace(/half\s*day/gi, '')
    .replace(/small\s*group/gi, '')
    .replace(/private/gi, '')
    .trim()
    .toLowerCase();
}

// Normalize tour name for matching
function normalizeName(name) {
  return name
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\d+\s*(days?|nights?|d|n)/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Calculate similarity between two strings
function similarity(s1, s2) {
  const words1 = s1.split(' ').filter(w => w.length > 2);
  const words2 = s2.split(' ').filter(w => w.length > 2);

  let matches = 0;
  for (const word of words1) {
    if (words2.some(w => w.includes(word) || word.includes(w))) {
      matches++;
    }
  }

  return matches / Math.max(words1.length, words2.length);
}

// Parse tours from tours-data.ts
function parseTours() {
  const content = fs.readFileSync(TOURS_DATA_FILE, 'utf-8');
  const tours = [];

  // Match each tour object
  const tourRegex = /\{\s*id:\s*"([^"]+)"[\s\S]*?name:\s*"([^"]+)"[\s\S]*?affiliateUrl:\s*"([^"]+)"/g;
  let match;

  while ((match = tourRegex.exec(content)) !== null) {
    tours.push({
      id: match[1],
      name: match[2],
      affiliateUrl: match[3]
    });
  }

  return tours;
}

// Find best matching URL for a tour
function findBestMatch(tour, realUrls) {
  const tourNameNorm = normalizeName(tour.name);

  let bestMatch = null;
  let bestScore = 0;

  for (const url of realUrls) {
    const urlNameNorm = extractNameFromUrl(url);
    const score = similarity(tourNameNorm, urlNameNorm);

    if (score > bestScore) {
      bestScore = score;
      bestMatch = url;
    }
  }

  return { url: bestMatch, score: bestScore };
}

// Main function
function main() {
  console.log('===========================================');
  console.log('  Matching Tours with Real URLs');
  console.log('===========================================\n');

  const tours = parseTours();
  console.log(`Found ${tours.length} tours in our file`);
  console.log(`Found ${realUrls.length} real URLs from bestpricetravel.com\n`);

  const results = {
    matched: [],
    unmatched: [],
    alreadyCorrect: []
  };

  for (const tour of tours) {
    // Skip internal cruise URLs
    if (tour.affiliateUrl.startsWith('/cruise/')) {
      results.alreadyCorrect.push({ tour, reason: 'Internal cruise URL' });
      continue;
    }

    // Check if current URL is already in real URLs
    if (realUrls.includes(tour.affiliateUrl)) {
      results.alreadyCorrect.push({ tour, reason: 'URL already correct' });
      continue;
    }

    // Try to find a match
    const match = findBestMatch(tour, realUrls);

    if (match.score >= 0.5) {
      results.matched.push({
        tour,
        newUrl: match.url,
        score: match.score
      });
    } else {
      results.unmatched.push({
        tour,
        bestMatch: match.url,
        score: match.score
      });
    }
  }

  // Print results
  console.log('=== ALREADY CORRECT ===');
  console.log(`${results.alreadyCorrect.length} tours have correct URLs\n`);

  console.log('=== MATCHED (will be updated) ===');
  console.log(`${results.matched.length} tours matched with new URLs\n`);
  results.matched.slice(0, 10).forEach(m => {
    console.log(`  ${m.tour.name}`);
    console.log(`    OLD: ${m.tour.affiliateUrl}`);
    console.log(`    NEW: ${m.newUrl}`);
    console.log(`    Score: ${(m.score * 100).toFixed(0)}%\n`);
  });

  console.log('=== UNMATCHED (need manual review or removal) ===');
  console.log(`${results.unmatched.length} tours could not be matched\n`);
  results.unmatched.slice(0, 10).forEach(u => {
    console.log(`  ${u.tour.name} (best score: ${(u.score * 100).toFixed(0)}%)`);
    console.log(`    Current: ${u.tour.affiliateUrl}`);
    console.log(`    Best guess: ${u.bestMatch}\n`);
  });

  // Save results to JSON for further processing
  const outputFile = path.join(__dirname, 'tour-matching-results.json');
  fs.writeFileSync(outputFile, JSON.stringify({
    matched: results.matched,
    unmatched: results.unmatched,
    alreadyCorrect: results.alreadyCorrect
  }, null, 2));
  console.log(`\nResults saved to ${outputFile}`);

  // Summary
  console.log('\n===========================================');
  console.log('  SUMMARY');
  console.log('===========================================');
  console.log(`Already correct: ${results.alreadyCorrect.length}`);
  console.log(`Can be matched: ${results.matched.length}`);
  console.log(`Cannot be matched: ${results.unmatched.length}`);
  console.log(`Total: ${tours.length}`);
}

main();
