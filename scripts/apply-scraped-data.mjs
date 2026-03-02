#!/usr/bin/env node
/**
 * Apply scraped data from bestpricetravel.com to tours-data.ts
 *
 * Updates:
 * - price
 * - originalPrice (if available)
 * - rating
 * - reviewCount
 * - description (if better than existing)
 *
 * Usage:
 *   node scripts/apply-scraped-data.mjs          # Preview changes
 *   node scripts/apply-scraped-data.mjs --apply  # Apply changes
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOURS_DATA_PATH = path.join(__dirname, '../src/lib/tours-data.ts');
const SCRAPED_DATA_PATH = path.join(__dirname, 'tour-data-output/scraped-tours-playwright.json');

// Load scraped data
const scrapedData = JSON.parse(fs.readFileSync(SCRAPED_DATA_PATH, 'utf-8'));
let content = fs.readFileSync(TOURS_DATA_PATH, 'utf-8');

const args = process.argv.slice(2);
const applyMode = args.includes('--apply');

console.log('='.repeat(60));
console.log('Apply Scraped Data to tours-data.ts');
console.log('='.repeat(60));
console.log(`\nLoaded ${scrapedData.scraped.length} scraped tours`);
console.log(`Mode: ${applyMode ? 'APPLY' : 'PREVIEW'}\n`);

let updatedCount = 0;
let priceUpdates = 0;
let ratingUpdates = 0;
let reviewUpdates = 0;

for (const tour of scrapedData.scraped) {
  if (!tour.tourId || !tour.price) continue;

  // Skip tours with suspicious data (like 3859 reviews from default page)
  if (tour.reviewCount === 3859) {
    tour.reviewCount = null;
  }

  let tourUpdated = false;

  // Find the tour block - look for this tour's id
  const tourIdPattern = new RegExp(`id:\\s*["']${tour.tourId}["']`);
  if (!content.match(tourIdPattern)) {
    continue;
  }

  // Update price
  if (tour.price) {
    const pricePattern = new RegExp(
      `(id:\\s*["']${tour.tourId}["'][^}]*?price:\\s*)\\d+`,
      's'
    );
    if (content.match(pricePattern)) {
      const currentPrice = content.match(pricePattern);
      const oldPrice = currentPrice[0].match(/price:\s*(\d+)/)[1];
      if (parseInt(oldPrice) !== tour.price) {
        if (applyMode) {
          content = content.replace(pricePattern, `$1${tour.price}`);
        }
        console.log(`  ${tour.tourId}: price ${oldPrice} -> ${tour.price}`);
        priceUpdates++;
        tourUpdated = true;
      }
    }
  }

  // Update originalPrice if we have one and it's different from price
  if (tour.originalPrice && tour.originalPrice !== tour.price) {
    const origPricePattern = new RegExp(
      `(id:\\s*["']${tour.tourId}["'][^}]*?originalPrice:\\s*)\\d+`,
      's'
    );
    if (content.match(origPricePattern)) {
      if (applyMode) {
        content = content.replace(origPricePattern, `$1${tour.originalPrice}`);
      }
    }
  }

  // Update rating
  if (tour.rating && tour.rating > 0 && tour.rating <= 10) {
    const ratingPattern = new RegExp(
      `(id:\\s*["']${tour.tourId}["'][^}]*?rating:\\s*)\\d+\\.?\\d*`,
      's'
    );
    if (content.match(ratingPattern)) {
      const currentRating = content.match(ratingPattern);
      const oldRating = currentRating[0].match(/rating:\s*(\d+\.?\d*)/)[1];
      if (parseFloat(oldRating) !== tour.rating) {
        if (applyMode) {
          content = content.replace(ratingPattern, `$1${tour.rating}`);
        }
        console.log(`  ${tour.tourId}: rating ${oldRating} -> ${tour.rating}`);
        ratingUpdates++;
        tourUpdated = true;
      }
    }
  }

  // Update reviewCount
  if (tour.reviewCount && tour.reviewCount > 0 && tour.reviewCount < 1000) {
    const reviewPattern = new RegExp(
      `(id:\\s*["']${tour.tourId}["'][^}]*?reviewCount:\\s*)\\d+`,
      's'
    );
    if (content.match(reviewPattern)) {
      const currentReview = content.match(reviewPattern);
      const oldReviewCount = currentReview[0].match(/reviewCount:\s*(\d+)/)[1];
      if (parseInt(oldReviewCount) !== tour.reviewCount) {
        if (applyMode) {
          content = content.replace(reviewPattern, `$1${tour.reviewCount}`);
        }
        console.log(`  ${tour.tourId}: reviewCount ${oldReviewCount} -> ${tour.reviewCount}`);
        reviewUpdates++;
        tourUpdated = true;
      }
    }
  }

  if (tourUpdated) {
    updatedCount++;
  }
}

console.log('\n' + '='.repeat(60));
console.log('SUMMARY');
console.log('='.repeat(60));
console.log(`Tours updated: ${updatedCount}`);
console.log(`  - Price updates: ${priceUpdates}`);
console.log(`  - Rating updates: ${ratingUpdates}`);
console.log(`  - Review count updates: ${reviewUpdates}`);

if (applyMode) {
  fs.writeFileSync(TOURS_DATA_PATH, content);
  console.log('\nChanges applied to tours-data.ts');
} else {
  console.log('\nThis was a preview. Run with --apply to make changes.');
}
