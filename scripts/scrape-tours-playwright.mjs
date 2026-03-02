#!/usr/bin/env node
/**
 * Scrape tour details from bestpricetravel.com using Playwright
 *
 * This script extracts comprehensive tour data including:
 * - Name, price, rating, duration
 * - Highlights, itinerary, inclusions
 * - Images and reviews
 *
 * Usage:
 *   node scripts/scrape-tours-playwright.mjs           # Scrape all tours
 *   node scripts/scrape-tours-playwright.mjs --test    # Test with first 3 tours
 *   node scripts/scrape-tours-playwright.mjs --apply   # Apply updates after scraping
 */

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const TOURS_DATA_PATH = path.join(__dirname, '../src/lib/tours-data.ts');
const OUTPUT_DIR = path.join(__dirname, 'tour-data-output');
const SCRAPED_DATA_PATH = path.join(OUTPUT_DIR, 'scraped-tours-playwright.json');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Rate limiting
const DELAY_BETWEEN_REQUESTS = 1500;
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Extract tours with bestpricetravel.com URLs from tours-data.ts
 */
function extractToursWithBestPriceUrls() {
  const content = fs.readFileSync(TOURS_DATA_PATH, 'utf-8');
  const tours = [];
  const seen = new Set();

  // Find all tour blocks - they start with { and have id: field
  // Match: id: "xxx" ... affiliateUrl: "https://www.bestpricetravel.com/..."
  const lines = content.split('\n');
  let currentTour = null;
  let braceCount = 0;
  let tourBlock = '';

  for (const line of lines) {
    // Track brace depth
    const openBraces = (line.match(/\{/g) || []).length;
    const closeBraces = (line.match(/\}/g) || []).length;

    if (braceCount > 0) {
      tourBlock += line + '\n';
      braceCount += openBraces - closeBraces;

      if (braceCount === 0) {
        // End of tour block - extract data
        const idMatch = tourBlock.match(/id:\s*["']([^"']+)["']/);
        const urlMatch = tourBlock.match(/affiliateUrl:\s*["'](https:\/\/www\.bestpricetravel\.com[^"']+)["']/);
        const nameMatch = tourBlock.match(/name:\s*["']([^"']+)["']/);

        if (idMatch && urlMatch && !seen.has(idMatch[1])) {
          seen.add(idMatch[1]);
          tours.push({
            id: idMatch[1],
            name: nameMatch ? nameMatch[1] : null,
            affiliateUrl: urlMatch[1]
          });
        }
        tourBlock = '';
      }
    } else if (line.includes('id:') && line.includes('{')) {
      // Start of a new tour object
      braceCount = openBraces - closeBraces;
      tourBlock = line + '\n';
    } else if (line.trim().startsWith('{') && !line.includes('//')) {
      // Could be start of tour object
      braceCount = openBraces - closeBraces;
      tourBlock = line + '\n';
    }
  }

  return tours;
}

/**
 * Scrape a single tour page using Playwright
 */
async function scrapeTourPage(page, url) {
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1000); // Let page settle

    const data = { url };

    // Extract title
    data.name = await page.$eval('h1', el => el.textContent?.trim()).catch(() => null);

    // Extract price - look for the discounted price first, then original
    try {
      const priceText = await page.$eval('[class*="price"]', el => el.textContent).catch(() => '');
      const priceMatch = priceText.match(/\$(\d+)/g);
      if (priceMatch && priceMatch.length > 0) {
        // Get the last price (usually the discounted one)
        data.price = parseInt(priceMatch[priceMatch.length - 1].replace('$', ''));
        if (priceMatch.length > 1) {
          data.originalPrice = parseInt(priceMatch[0].replace('$', ''));
        }
      }
    } catch (e) {
      // Try alternative selectors
      const pageText = await page.textContent('body');
      const priceMatch = pageText.match(/US\$(\d+)/);
      if (priceMatch) {
        data.price = parseInt(priceMatch[1]);
      }
    }

    // Extract rating
    try {
      const ratingText = await page.textContent('body');
      const ratingMatch = ratingText.match(/(\d+\.?\d*)\s*Excellent/);
      if (ratingMatch) {
        data.rating = parseFloat(ratingMatch[1]);
      }
    } catch (e) {}

    // Extract review count
    try {
      const reviewText = await page.textContent('body');
      const reviewMatch = reviewText.match(/(\d+)\s*(?:customer's\s*)?reviews?/i);
      if (reviewMatch) {
        data.reviewCount = parseInt(reviewMatch[1]);
      }
    } catch (e) {}

    // Extract duration
    try {
      const durationEl = await page.$('text=Duration');
      if (durationEl) {
        const parent = await durationEl.$('xpath=..');
        if (parent) {
          const text = await parent.textContent();
          const match = text.match(/Duration\s*:?\s*(\d+\s*days?)/i);
          if (match) {
            data.duration = match[1];
          }
        }
      }
    } catch (e) {}

    // Extract places
    try {
      const placesEl = await page.$('text=Places:');
      if (placesEl) {
        const parent = await placesEl.$('xpath=..');
        if (parent) {
          const text = await parent.textContent();
          const match = text.match(/Places:?\s*(.+)/i);
          if (match) {
            data.places = match[1].trim();
          }
        }
      }
    } catch (e) {}

    // Extract meals
    try {
      const mealsEl = await page.$('text=Meals:');
      if (mealsEl) {
        const parent = await mealsEl.$('xpath=..');
        if (parent) {
          const text = await parent.textContent();
          const match = text.match(/Meals:?\s*(.+)/i);
          if (match) {
            data.meals = match[1].trim();
          }
        }
      }
    } catch (e) {}

    // Extract highlights (why tourists love this trip)
    data.highlights = [];
    try {
      const highlights = await page.$$eval('text=Why >> xpath=../following-sibling::*//strong',
        elements => elements.map(el => el.textContent?.trim()).filter(Boolean)
      ).catch(() => []);
      data.highlights = highlights.slice(0, 5);
    } catch (e) {}

    // Extract itinerary days
    data.itinerary = [];
    try {
      // Look for Day X: Title pattern
      const dayElements = await page.$$('[class*="itinerary"] >> text=/Day \\d+:/');
      for (let i = 0; i < dayElements.length && i < 20; i++) {
        const el = dayElements[i];
        const text = await el.textContent();
        const match = text.match(/Day\s*(\d+):\s*(.+)/);
        if (match) {
          data.itinerary.push({
            day: parseInt(match[1]),
            title: match[2].trim()
          });
        }
      }
    } catch (e) {}

    // If no itinerary found, try alternative method
    if (data.itinerary.length === 0) {
      try {
        const pageContent = await page.content();
        const dayMatches = pageContent.matchAll(/"Day\s*(\d+):\s*([^"<]+)/g);
        for (const match of dayMatches) {
          const dayNum = parseInt(match[1]);
          const title = match[2].trim();
          if (!data.itinerary.find(d => d.day === dayNum)) {
            data.itinerary.push({ day: dayNum, title });
          }
        }
        data.itinerary.sort((a, b) => a.day - b.day);
      } catch (e) {}
    }

    // Extract inclusions
    data.included = [];
    try {
      const inclusions = await page.$$eval('text=Included activities >> xpath=../following-sibling::*//li',
        elements => elements.map(el => el.textContent?.trim()).filter(Boolean)
      ).catch(() => []);
      data.included = inclusions.slice(0, 10);
    } catch (e) {}

    // Extract meta description
    try {
      data.description = await page.$eval('meta[name="description"]',
        el => el.getAttribute('content')
      ).catch(() => null);
    } catch (e) {}

    // Extract og:image
    try {
      data.mainImage = await page.$eval('meta[property="og:image"]',
        el => el.getAttribute('content')
      ).catch(() => null);
    } catch (e) {}

    return data;

  } catch (error) {
    return { url, error: error.message };
  }
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);
  const testMode = args.includes('--test');
  const applyMode = args.includes('--apply');

  console.log('='.repeat(60));
  console.log('BestPrice Travel Tour Scraper (Playwright)');
  console.log('='.repeat(60));

  // Get tours
  const tours = extractToursWithBestPriceUrls();
  console.log(`\nFound ${tours.length} tours with bestpricetravel.com URLs`);

  if (tours.length === 0) {
    console.log('No tours to scrape. Exiting.');
    return;
  }

  const toursToScrape = testMode ? tours.slice(0, 3) : tours;
  console.log(`\nScraping ${toursToScrape.length} tours${testMode ? ' (TEST MODE)' : ''}...`);

  // Launch browser
  console.log('\nLaunching browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
  });
  const page = await context.newPage();

  const results = {
    scraped: [],
    failed: [],
    timestamp: new Date().toISOString()
  };

  for (let i = 0; i < toursToScrape.length; i++) {
    const tour = toursToScrape[i];
    const progress = `[${i + 1}/${toursToScrape.length}]`;

    console.log(`\n${progress} Scraping: ${tour.id}`);

    const scraped = await scrapeTourPage(page, tour.affiliateUrl);

    if (scraped.error) {
      console.log(`    ERROR: ${scraped.error}`);
      results.failed.push({ ...tour, error: scraped.error });
    } else {
      console.log(`    Name: ${scraped.name || 'N/A'}`);
      console.log(`    Price: ${scraped.price ? '$' + scraped.price : 'N/A'}`);
      console.log(`    Rating: ${scraped.rating || 'N/A'} (${scraped.reviewCount || 0} reviews)`);
      console.log(`    Duration: ${scraped.duration || 'N/A'}`);
      console.log(`    Highlights: ${scraped.highlights?.length || 0}`);
      console.log(`    Itinerary: ${scraped.itinerary?.length || 0} days`);
      console.log(`    Inclusions: ${scraped.included?.length || 0}`);

      results.scraped.push({
        tourId: tour.id,
        originalName: tour.name,
        ...scraped
      });
    }

    // Rate limiting
    if (i < toursToScrape.length - 1) {
      await sleep(DELAY_BETWEEN_REQUESTS);
    }
  }

  // Close browser
  await browser.close();

  // Save results
  console.log('\n' + '='.repeat(60));
  console.log('SCRAPING COMPLETE');
  console.log('='.repeat(60));
  console.log(`Successfully scraped: ${results.scraped.length}`);
  console.log(`Failed: ${results.failed.length}`);

  fs.writeFileSync(SCRAPED_DATA_PATH, JSON.stringify(results, null, 2));
  console.log(`\nResults saved to: ${SCRAPED_DATA_PATH}`);

  if (applyMode && results.scraped.length > 0) {
    console.log('\nApplying updates to tours-data.ts...');
    applyUpdates(results.scraped);
  }
}

/**
 * Apply scraped data to tours-data.ts
 */
function applyUpdates(scrapedTours) {
  let content = fs.readFileSync(TOURS_DATA_PATH, 'utf-8');
  let updatedCount = 0;

  for (const scraped of scrapedTours) {
    if (!scraped.tourId) continue;

    let updated = false;

    // Update price
    if (scraped.price) {
      const priceRegex = new RegExp(`(id:\\s*["']${scraped.tourId}["'][^}]*price:\\s*)\\d+`, 's');
      if (content.match(priceRegex)) {
        content = content.replace(priceRegex, `$1${scraped.price}`);
        updated = true;
      }
    }

    // Update rating
    if (scraped.rating) {
      const ratingRegex = new RegExp(`(id:\\s*["']${scraped.tourId}["'][^}]*rating:\\s*)\\d+\\.?\\d*`, 's');
      if (content.match(ratingRegex)) {
        content = content.replace(ratingRegex, `$1${scraped.rating}`);
        updated = true;
      }
    }

    // Update reviewCount
    if (scraped.reviewCount) {
      const reviewRegex = new RegExp(`(id:\\s*["']${scraped.tourId}["'][^}]*reviewCount:\\s*)\\d+`, 's');
      if (content.match(reviewRegex)) {
        content = content.replace(reviewRegex, `$1${scraped.reviewCount}`);
        updated = true;
      }
    }

    if (updated) {
      updatedCount++;
      console.log(`  Updated: ${scraped.tourId}`);
    }
  }

  fs.writeFileSync(TOURS_DATA_PATH, content);
  console.log(`\nUpdated ${updatedCount} tours`);
}

main().catch(console.error);
