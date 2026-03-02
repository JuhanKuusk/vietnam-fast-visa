#!/usr/bin/env node

/**
 * Scrape All Missing Tours from BestPrice Travel
 *
 * This script:
 * 1. Reads all tours from tours-data.ts
 * 2. Checks which ones don't have scraped data yet
 * 3. Scrapes the missing ones from their BestPrice affiliate URLs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOURS_DATA_FILE = path.join(__dirname, '..', 'src', 'lib', 'tours-data.ts');
const OUTPUT_DIR = path.join(__dirname, 'tour-data-output');

// Extract all tours with their affiliate URLs
function extractToursFromData() {
  const content = fs.readFileSync(TOURS_DATA_FILE, 'utf-8');
  const tours = [];

  // Match tour objects - find slug and affiliateUrl pairs
  const tourRegex = /\{\s*\n\s*id:\s*["']([^"']+)["'][\s\S]*?slug:\s*["']([^"']+)["'][\s\S]*?affiliateUrl:\s*["']([^"']+)["']/g;

  let match;
  while ((match = tourRegex.exec(content)) !== null) {
    const [, id, slug, affiliateUrl] = match;
    if (affiliateUrl.includes('bestpricetravel.com')) {
      tours.push({ id, slug, affiliateUrl });
    }
  }

  return tours;
}

// Check which tours already have scraped data
function getScrapedSlugs() {
  const files = fs.readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.json'));
  const slugs = new Set();

  for (const file of files) {
    try {
      const content = fs.readFileSync(path.join(OUTPUT_DIR, file), 'utf-8');
      const data = JSON.parse(content);
      if (data.sourceUrl) {
        // Extract slug from URL
        const urlMatch = data.sourceUrl.match(/\/([^/]+)\.html$/);
        if (urlMatch) {
          slugs.add(urlMatch[1]);
        }
      }
      // Also add the file name as a slug (without .json)
      slugs.add(file.replace('.json', ''));
    } catch (err) {
      // Ignore
    }
  }

  return slugs;
}

// Scrape a single tour page
async function scrapeTourPage(page, url, slug) {
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000);

    const data = await page.evaluate(() => {
      const result = {
        name: '',
        overview: '',
        highlights: [],
        itinerary: [],
        included: [],
        excluded: [],
        importantNotes: [],
        pricingTiers: [],
        images: [],
        dayImages: {}
      };

      // Get tour name
      const nameEl = document.querySelector('h1');
      if (nameEl) result.name = nameEl.textContent.trim();

      // Get overview
      const overviewEl = document.querySelector('.tour-overview, .overview, [class*="overview"]');
      if (overviewEl) result.overview = overviewEl.textContent.trim();

      // Get all images on page
      const allImages = document.querySelectorAll('img[src*="cloudfront"], img[src*="bestprice"]');
      allImages.forEach(img => {
        const src = img.src || img.getAttribute('data-src');
        if (src && !src.includes('icon') && !src.includes('logo') && !src.includes('flag')) {
          result.images.push(src);
        }
      });

      // Get itinerary
      const itineraryItems = document.querySelectorAll('[class*="itinerary"] [class*="day"], .day-item, .itinerary-day, [data-day]');
      itineraryItems.forEach((item, idx) => {
        const dayNum = idx + 1;
        const titleEl = item.querySelector('h3, h4, .day-title, [class*="title"]');
        const descEl = item.querySelector('p, .description, [class*="description"], [class*="content"]');

        const dayData = {
          day: dayNum,
          title: titleEl ? titleEl.textContent.trim() : `Day ${dayNum}`,
          description: descEl ? descEl.textContent.trim() : '',
          activities: [],
          meals: [],
          accommodation: '',
          dayImages: []
        };

        // Get images for this day
        const dayImages = item.querySelectorAll('img[src*="cloudfront"], img[src*="bestprice"]');
        dayImages.forEach(img => {
          const src = img.src || img.getAttribute('data-src');
          if (src && !src.includes('icon') && !src.includes('logo')) {
            dayData.dayImages.push(src);
          }
        });

        // Get meals
        const mealsEl = item.querySelector('[class*="meal"], .meals');
        if (mealsEl) {
          const mealsText = mealsEl.textContent;
          if (mealsText.toLowerCase().includes('breakfast')) dayData.meals.push('Breakfast');
          if (mealsText.toLowerCase().includes('lunch')) dayData.meals.push('Lunch');
          if (mealsText.toLowerCase().includes('dinner')) dayData.meals.push('Dinner');
        }

        // Get accommodation
        const accomEl = item.querySelector('[class*="accommodation"], [class*="hotel"]');
        if (accomEl) {
          dayData.accommodation = accomEl.textContent.trim();
        }

        result.itinerary.push(dayData);
      });

      // Get highlights
      const highlightItems = document.querySelectorAll('[class*="highlight"] li, .tour-highlights li');
      highlightItems.forEach(item => {
        const text = item.textContent.trim();
        if (text && text.length > 5) result.highlights.push(text);
      });

      // Get included items
      const includedItems = document.querySelectorAll('[class*="include"] li, .included li, .tour-include li');
      includedItems.forEach(item => {
        const text = item.textContent.trim();
        if (text && text.length > 5) result.included.push(text);
      });

      // Get pricing tiers
      const pricingRows = document.querySelectorAll('[class*="price"] tr, .pricing-table tr');
      pricingRows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length >= 2) {
          const category = cells[0].textContent.trim();
          const priceText = cells[1].textContent.trim();
          const priceMatch = priceText.match(/\$?\s*(\d+)/);
          if (priceMatch && category) {
            result.pricingTiers.push({
              category,
              price: parseInt(priceMatch[1])
            });
          }
        }
      });

      // Get important notes
      const notesItems = document.querySelectorAll('[class*="note"] li, .important-notes li');
      notesItems.forEach(item => {
        const text = item.textContent.trim();
        if (text && text.length > 10) result.importantNotes.push(text);
      });

      return result;
    });

    data.sourceUrl = url;
    data.scrapedAt = new Date().toISOString();

    // Remove duplicates from images
    data.images = [...new Set(data.images)];

    return data;
  } catch (err) {
    console.error(`    Error scraping ${url}: ${err.message}`);
    return null;
  }
}

// Main function
async function main() {
  console.log('=== Scraping Missing Tours ===\n');

  // Get all tours with BestPrice URLs
  console.log('Reading tours from tours-data.ts...');
  const allTours = extractToursFromData();
  console.log(`Found ${allTours.length} tours with BestPrice URLs\n`);

  // Get already scraped slugs
  console.log('Checking existing scraped data...');
  const scrapedSlugs = getScrapedSlugs();
  console.log(`Already have ${scrapedSlugs.size} scraped tours\n`);

  // Find missing tours
  const missingTours = allTours.filter(tour => {
    // Check if we have this tour's data
    const urlSlug = tour.affiliateUrl.match(/\/([^/]+)\.html$/)?.[1];
    return !scrapedSlugs.has(urlSlug) && !scrapedSlugs.has(tour.slug);
  });

  console.log(`Need to scrape ${missingTours.length} tours\n`);

  if (missingTours.length === 0) {
    console.log('All tours already scraped!');
    return;
  }

  // Launch browser
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
  });
  const page = await context.newPage();

  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < missingTours.length; i++) {
    const tour = missingTours[i];
    const urlSlug = tour.affiliateUrl.match(/\/([^/]+)\.html$/)?.[1] || tour.slug;

    console.log(`[${i + 1}/${missingTours.length}] Scraping: ${tour.slug}`);
    console.log(`    URL: ${tour.affiliateUrl}`);

    const data = await scrapeTourPage(page, tour.affiliateUrl, tour.slug);

    if (data && (data.itinerary.length > 0 || data.images.length > 5)) {
      const outputFile = path.join(OUTPUT_DIR, `${urlSlug}.json`);
      fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
      console.log(`    ✅ Saved: ${urlSlug}.json (${data.itinerary.length} days, ${data.images.length} images)`);
      successCount++;
    } else {
      console.log(`    ⚠️ No useful data found`);
      errorCount++;
    }

    // Small delay to be polite
    await page.waitForTimeout(1500);
  }

  await browser.close();

  console.log('\n=== Summary ===');
  console.log(`Successfully scraped: ${successCount}`);
  console.log(`Failed/empty: ${errorCount}`);
  console.log('\nNext: Run import-scraped-tours.mjs and apply-tour-updates-v2.mjs to apply changes');
}

main().catch(console.error);
