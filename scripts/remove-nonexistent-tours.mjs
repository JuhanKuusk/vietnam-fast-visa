#!/usr/bin/env node

/**
 * Remove tours whose affiliateUrl doesn't exist on bestpricetravel.com
 * Keep:
 * - Tours with existing bestpricetravel.com URLs (57)
 * - Tours with asiatouradvisor.com URLs (60)
 * - Tours with internal /cruise/ URLs (8)
 *
 * Remove:
 * - 135 tours with non-existent bestpricetravel.com URLs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOURS_DATA_FILE = path.join(__dirname, '..', 'src', 'lib', 'tours-data.ts');
const ANALYSIS_FILE = path.join(__dirname, 'bestprice-url-analysis.json');

// Load analysis
const { missing } = JSON.parse(fs.readFileSync(ANALYSIS_FILE, 'utf-8'));
const toursToRemove = new Set(missing.map(t => t.id));

console.log('===========================================');
console.log('  Removing Non-Existent Tours');
console.log('===========================================\n');
console.log(`Tours to remove: ${toursToRemove.size}`);

let content = fs.readFileSync(TOURS_DATA_FILE, 'utf-8');
let removedCount = 0;

for (const tourId of toursToRemove) {
  // Match the entire tour object from { id: "tourId" to },
  const pattern = new RegExp(
    `\\s*\\{\\s*id:\\s*"${tourId}"[\\s\\S]*?\\},?\\s*(?=\\{\\s*id:|\\]\\s*;)`,
    'g'
  );

  const newContent = content.replace(pattern, '');
  if (newContent !== content) {
    content = newContent;
    removedCount++;
    console.log(`Removed: ${tourId}`);
  }
}

if (removedCount > 0) {
  // Clean up any double commas or trailing commas before ]
  content = content.replace(/,\s*,/g, ',');
  content = content.replace(/,\s*\]/g, ']');

  fs.writeFileSync(TOURS_DATA_FILE, content);
  console.log(`\n✅ Removed ${removedCount} tours from tours-data.ts`);
} else {
  console.log('No tours found to remove');
}

// Count remaining tours
const remainingTours = (content.match(/\{\s*id:\s*"/g) || []).length;
console.log(`\nRemaining tours: ${remainingTours}`);
