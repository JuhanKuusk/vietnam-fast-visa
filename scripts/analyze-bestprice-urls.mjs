#!/usr/bin/env node

/**
 * Analyze which bestpricetravel.com URLs in our tours-data.ts
 * actually exist in the real URL list
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
const realUrlSet = new Set(realUrls);

// Parse tours from tours-data.ts
function parseTours() {
  const content = fs.readFileSync(TOURS_DATA_FILE, 'utf-8');
  const tours = [];

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

// Main
const tours = parseTours();
console.log(`Total tours: ${tours.length}`);

// Separate by source
const bestpriceTours = tours.filter(t => t.affiliateUrl.includes('bestpricetravel.com'));
const asiatourTours = tours.filter(t => t.affiliateUrl.includes('asiatouradvisor.com'));
const cruiseTours = tours.filter(t => t.affiliateUrl.startsWith('/cruise/'));

console.log(`\nBy source:`);
console.log(`  bestpricetravel.com: ${bestpriceTours.length}`);
console.log(`  asiatouradvisor.com: ${asiatourTours.length}`);
console.log(`  Internal /cruise/: ${cruiseTours.length}`);

// Check which bestpricetravel URLs actually exist
const existingUrls = bestpriceTours.filter(t => realUrlSet.has(t.affiliateUrl));
const missingUrls = bestpriceTours.filter(t => !realUrlSet.has(t.affiliateUrl));

console.log(`\n=== BESTPRICETRAVEL.COM URLs ===`);
console.log(`Existing (correct): ${existingUrls.length}`);
console.log(`Missing (need fixing): ${missingUrls.length}`);

console.log(`\n--- EXISTING URLs (first 10) ---`);
existingUrls.slice(0, 10).forEach(t => {
  console.log(`  ${t.name}`);
  console.log(`    ${t.affiliateUrl}`);
});

console.log(`\n--- MISSING URLs (all ${missingUrls.length}) ---`);
missingUrls.forEach(t => {
  console.log(`  ${t.id}: ${t.name}`);
  console.log(`    ${t.affiliateUrl}`);
});

// Save for further processing
fs.writeFileSync(
  path.join(__dirname, 'bestprice-url-analysis.json'),
  JSON.stringify({
    existing: existingUrls,
    missing: missingUrls
  }, null, 2)
);

console.log(`\nAnalysis saved to bestprice-url-analysis.json`);
