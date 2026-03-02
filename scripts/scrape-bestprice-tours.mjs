#!/usr/bin/env node
/**
 * Scrape tour details from bestpricetravel.com
 *
 * This script:
 * 1. Reads all tours from tours-data.ts that have bestpricetravel.com affiliateUrls
 * 2. Fetches each tour page and extracts detailed information
 * 3. Saves scraped data to JSON files for review
 * 4. Can optionally apply updates to tours-data.ts
 *
 * Usage:
 *   node scripts/scrape-bestprice-tours.mjs           # Scrape and save to JSON
 *   node scripts/scrape-bestprice-tours.mjs --apply   # Apply updates to tours-data.ts
 *   node scripts/scrape-bestprice-tours.mjs --test    # Test with first 3 tours only
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const TOURS_DATA_PATH = path.join(__dirname, '../src/lib/tours-data.ts');
const OUTPUT_DIR = path.join(__dirname, 'tour-data-output');
const SCRAPED_DATA_PATH = path.join(OUTPUT_DIR, 'scraped-tours.json');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Rate limiting - be respectful to the server
const DELAY_BETWEEN_REQUESTS = 2000; // 2 seconds
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Extract tours with bestpricetravel.com URLs from tours-data.ts
 */
function extractToursWithBestPriceUrls() {
  const content = fs.readFileSync(TOURS_DATA_PATH, 'utf-8');

  const tours = [];
  // Match tour objects - looking for id and affiliateUrl
  const tourRegex = /\{\s*id:\s*["']([^"']+)["'][^}]*affiliateUrl:\s*["'](https:\/\/www\.bestpricetravel\.com[^"']+)["']/gs;

  let match;
  while ((match = tourRegex.exec(content)) !== null) {
    tours.push({
      id: match[1],
      affiliateUrl: match[2]
    });
  }

  // Also try to get the name
  for (const tour of tours) {
    const nameRegex = new RegExp(`id:\\s*["']${tour.id}["'][^}]*?name:\\s*["']([^"']+)["']`, 's');
    const nameMatch = content.match(nameRegex);
    if (nameMatch) {
      tour.name = nameMatch[1];
    }
  }

  return tours;
}

/**
 * Fetch and parse a tour page from bestpricetravel.com
 */
async function scrapeTourPage(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      }
    });

    if (!response.ok) {
      return { error: `HTTP ${response.status}`, url };
    }

    const html = await response.text();
    return parseTourPage(html, url);
  } catch (error) {
    return { error: error.message, url };
  }
}

/**
 * Parse tour page HTML and extract structured data
 */
function parseTourPage(html, url) {
  const data = { url };

  // Extract title from og:title or h1
  const ogTitleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i);
  const h1Match = html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
  data.name = ogTitleMatch ? ogTitleMatch[1].replace(' | BestPrice Travel', '').trim() :
              h1Match ? h1Match[1].trim() : null;

  // Extract description from og:description or meta description
  const ogDescMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i);
  const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
  data.description = ogDescMatch ? ogDescMatch[1].trim() :
                     metaDescMatch ? metaDescMatch[1].trim() : null;

  // Extract price - look for "US$XX" pattern
  const priceMatch = html.match(/US\$(\d+)(?:\/pax)?/);
  data.price = priceMatch ? parseInt(priceMatch[1]) : null;

  // Extract duration
  const durationMatch = html.match(/Duration\s*:?\s*<\/[^>]+>\s*<[^>]+>([^<]+)/i) ||
                        html.match(/"Duration\s*:"\s*<\/[^>]+>\s*<[^>]+>([^<]+)/i) ||
                        html.match(/(\d+)\s*day/i);
  data.duration = durationMatch ? durationMatch[1].trim() : null;

  // Extract rating
  const ratingMatch = html.match(/<[^>]*class="[^"]*rating[^"]*"[^>]*>(\d+\.?\d*)/i) ||
                      html.match(/>(\d+\.\d+)<\/[^>]+>\s*Excellent/i) ||
                      html.match(/Overall Rating[^>]*>[^<]*<[^>]*>(\d+\.?\d*)/i);
  data.rating = ratingMatch ? parseFloat(ratingMatch[1]) : null;

  // Extract review count
  const reviewMatch = html.match(/(\d+)\s*(?:customer's\s*)?reviews?/i);
  data.reviewCount = reviewMatch ? parseInt(reviewMatch[1]) : null;

  // Extract places/locations
  const placesMatch = html.match(/Places:?\s*<\/[^>]+>\s*<[^>]+>([^<]+)/i) ||
                      html.match(/"Places:"\s*<\/[^>]+>\s*<[^>]+>([^<]+)/i);
  data.places = placesMatch ? placesMatch[1].trim() : null;

  // Extract meals info
  const mealsMatch = html.match(/Meals:?\s*<\/[^>]+>\s*<[^>]+>([^<]+)/i) ||
                     html.match(/"Meals:"\s*<\/[^>]+>\s*<[^>]+>([^<]+)/i);
  data.meals = mealsMatch ? mealsMatch[1].trim() : null;

  // Extract highlights - look for list items in "Why tourists love this trip" section
  data.highlights = [];
  const highlightsSection = html.match(/Why.*tourists.*love.*trip[^]*?<ul[^>]*>(.*?)<\/ul>/is);
  if (highlightsSection) {
    const liMatches = highlightsSection[1].matchAll(/<li[^>]*>.*?<strong[^>]*>([^<]+)<\/strong>/gis);
    for (const li of liMatches) {
      data.highlights.push(li[1].trim());
    }
  }

  // Extract itinerary
  data.itinerary = extractItinerary(html);

  // Extract inclusions
  data.included = extractInclusions(html);

  // Extract exclusions (if available)
  data.excluded = extractExclusions(html);

  // Extract important notes
  const notesMatch = html.match(/Important Notes:?[^]*?<ul[^>]*>(.*?)<\/ul>/is);
  if (notesMatch) {
    data.importantNotes = [];
    const noteItems = notesMatch[1].matchAll(/<li[^>]*>([^<]+)<\/li>/gi);
    for (const item of noteItems) {
      data.importantNotes.push(item[1].trim());
    }
  }

  // Extract pricing tiers if available
  data.pricingTiers = extractPricingTiers(html);

  // Extract image gallery
  data.imageGallery = extractImageGallery(html);

  // Extract og:image for main image
  const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i);
  data.mainImage = ogImageMatch ? ogImageMatch[1] : null;

  return data;
}

/**
 * Extract itinerary from HTML
 */
function extractItinerary(html) {
  const itinerary = [];

  // Look for itinerary section
  const itinerarySection = html.match(/Trip itinerary[^]*?(<div[^>]*class="[^"]*itinerary[^"]*"[^>]*>.*?)<(?:heading|generic|div)[^>]*>(?:Inclusions|Important Notes|Customer Reviews)/is);

  if (!itinerarySection) {
    // Try alternative pattern - day-by-day structure
    const dayMatches = html.matchAll(/(?:Day|All-day)\s*(\d*)?\s*:?\s*([^<]+)<[^]*?(?:<h3|<strong|<p)[^>]*>(Morning|Afternoon|Evening|Full Day)[^]*?<\/(?:div|generic)>/gis);

    let dayNum = 0;
    for (const match of dayMatches) {
      dayNum++;
      const day = {
        day: match[1] ? parseInt(match[1]) : dayNum,
        title: match[2] ? match[2].trim() : `Day ${dayNum}`,
        activities: []
      };

      // Extract activities from paragraphs
      const dayContent = match[0];
      const paragraphs = dayContent.matchAll(/<p[^>]*>([^<]+(?:<[^>]+>[^<]*)*)<\/p>/gi);
      for (const p of paragraphs) {
        const text = p[1].replace(/<[^>]+>/g, '').trim();
        if (text.length > 20 && text.length < 500) {
          day.activities.push(text);
        }
      }

      itinerary.push(day);
    }
  }

  // Alternative: Look for accordion-style itinerary
  if (itinerary.length === 0) {
    const accordionItems = html.matchAll(/(?:All-day|Day\s*\d+)\s*:?\s*([^<]+)[^]*?<(?:p|paragraph)[^>]*>(.*?)<\/(?:p|paragraph)>/gis);
    let dayNum = 0;
    for (const match of accordionItems) {
      dayNum++;
      const title = match[1].trim();
      const content = match[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

      if (title && content) {
        itinerary.push({
          day: dayNum,
          title: title,
          description: content.substring(0, 300),
          activities: content.split('. ').filter(s => s.length > 10).slice(0, 5)
        });
      }
    }
  }

  return itinerary;
}

/**
 * Extract inclusions from HTML
 */
function extractInclusions(html) {
  const included = [];

  // Look for "Included activities" or "Inclusions" section
  const inclusionsSection = html.match(/Included activities[^]*?<ul[^>]*>(.*?)<\/ul>/is) ||
                            html.match(/Inclusions[^]*?<ul[^>]*>(.*?)<\/ul>/is);

  if (inclusionsSection) {
    const items = inclusionsSection[1].matchAll(/<li[^>]*>([^<]+)<\/li>/gi);
    for (const item of items) {
      included.push(item[1].trim());
    }
  }

  return included;
}

/**
 * Extract exclusions from HTML
 */
function extractExclusions(html) {
  const excluded = [];

  // Look for "Not included" or "Exclusions" section
  const exclusionsSection = html.match(/Not included[^]*?<ul[^>]*>(.*?)<\/ul>/is) ||
                            html.match(/Exclusions[^]*?<ul[^>]*>(.*?)<\/ul>/is);

  if (exclusionsSection) {
    const items = exclusionsSection[1].matchAll(/<li[^>]*>([^<]+)<\/li>/gi);
    for (const item of items) {
      excluded.push(item[1].trim());
    }
  }

  return excluded;
}

/**
 * Extract pricing tiers from HTML
 */
function extractPricingTiers(html) {
  const tiers = [];

  // Look for pricing table rows
  const priceRows = html.matchAll(/(?:Economy|Superior|First Class|Deluxe|Private|Join in)[^<]*Tour[^]*?US\$(\d+)/gi);

  for (const row of priceRows) {
    const category = row[0].match(/(Economy|Superior|First Class|Deluxe|Private|Join in)/i);
    if (category) {
      tiers.push({
        category: category[1],
        price: parseInt(row[1])
      });
    }
  }

  return tiers.length > 0 ? tiers : null;
}

/**
 * Extract image gallery URLs from HTML
 */
function extractImageGallery(html) {
  const images = [];
  const seen = new Set();

  // Look for CloudFront image URLs (bestpricetravel's CDN)
  const imgMatches = html.matchAll(/https:\/\/d122axpxm39woi\.cloudfront\.net\/images\/[^"'\s]+/g);

  for (const match of imgMatches) {
    const url = match[0];
    // Skip small thumbnails, get larger versions
    if (!seen.has(url) && !url.includes('_thumb') && !url.includes('/50_') && !url.includes('/100_')) {
      seen.add(url);
      images.push(url);
    }
  }

  return images.slice(0, 10); // Limit to 10 images
}

/**
 * Main scraping function
 */
async function main() {
  const args = process.argv.slice(2);
  const testMode = args.includes('--test');
  const applyMode = args.includes('--apply');

  console.log('='.repeat(60));
  console.log('BestPrice Travel Tour Scraper');
  console.log('='.repeat(60));

  // Extract tours with bestpricetravel.com URLs
  const tours = extractToursWithBestPriceUrls();
  console.log(`\nFound ${tours.length} tours with bestpricetravel.com URLs`);

  if (tours.length === 0) {
    console.log('No tours to scrape. Exiting.');
    return;
  }

  // In test mode, only scrape first 3 tours
  const toursToScrape = testMode ? tours.slice(0, 3) : tours;
  console.log(`\nScraping ${toursToScrape.length} tours${testMode ? ' (TEST MODE)' : ''}...`);
  console.log('');

  const results = {
    scraped: [],
    failed: [],
    timestamp: new Date().toISOString()
  };

  for (let i = 0; i < toursToScrape.length; i++) {
    const tour = toursToScrape[i];
    const progress = `[${i + 1}/${toursToScrape.length}]`;

    console.log(`${progress} Scraping: ${tour.id}`);
    console.log(`         URL: ${tour.affiliateUrl}`);

    const scraped = await scrapeTourPage(tour.affiliateUrl);

    if (scraped.error) {
      console.log(`         ERROR: ${scraped.error}`);
      results.failed.push({ ...tour, error: scraped.error });
    } else {
      console.log(`         Name: ${scraped.name || 'N/A'}`);
      console.log(`         Price: ${scraped.price ? '$' + scraped.price : 'N/A'}`);
      console.log(`         Rating: ${scraped.rating || 'N/A'}`);
      console.log(`         Highlights: ${scraped.highlights?.length || 0}`);
      console.log(`         Itinerary days: ${scraped.itinerary?.length || 0}`);
      console.log(`         Inclusions: ${scraped.included?.length || 0}`);

      results.scraped.push({
        tourId: tour.id,
        originalName: tour.name,
        ...scraped
      });
    }

    console.log('');

    // Rate limiting
    if (i < toursToScrape.length - 1) {
      await sleep(DELAY_BETWEEN_REQUESTS);
    }
  }

  // Save results
  console.log('='.repeat(60));
  console.log('SCRAPING COMPLETE');
  console.log('='.repeat(60));
  console.log(`Successfully scraped: ${results.scraped.length}`);
  console.log(`Failed: ${results.failed.length}`);

  // Save to JSON
  fs.writeFileSync(SCRAPED_DATA_PATH, JSON.stringify(results, null, 2));
  console.log(`\nResults saved to: ${SCRAPED_DATA_PATH}`);

  // Save summary
  const summaryPath = path.join(OUTPUT_DIR, 'scrape-summary.json');
  const summary = {
    totalTours: tours.length,
    scraped: results.scraped.length,
    failed: results.failed.length,
    failedTours: results.failed.map(t => ({ id: t.id, error: t.error })),
    timestamp: results.timestamp
  };
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  console.log(`Summary saved to: ${summaryPath}`);

  if (applyMode && results.scraped.length > 0) {
    console.log('\n--apply flag detected. Applying updates to tours-data.ts...');
    applyUpdatesToToursData(results.scraped);
  } else if (!applyMode) {
    console.log('\nTo apply these updates to tours-data.ts, run:');
    console.log('  node scripts/scrape-bestprice-tours.mjs --apply');
  }
}

/**
 * Apply scraped data to tours-data.ts
 */
function applyUpdatesToToursData(scrapedTours) {
  let content = fs.readFileSync(TOURS_DATA_PATH, 'utf-8');
  let updatedCount = 0;

  for (const scraped of scrapedTours) {
    if (!scraped.tourId) continue;

    // Find the tour block in the file
    const tourStartRegex = new RegExp(`(\\{[^}]*id:\\s*["']${scraped.tourId}["'])`, 's');
    const match = content.match(tourStartRegex);

    if (!match) {
      console.log(`  Could not find tour: ${scraped.tourId}`);
      continue;
    }

    let updated = false;

    // Update price if we have one
    if (scraped.price) {
      const priceRegex = new RegExp(`(id:\\s*["']${scraped.tourId}["'][^}]*price:\\s*)\\d+`, 's');
      if (content.match(priceRegex)) {
        content = content.replace(priceRegex, `$1${scraped.price}`);
        updated = true;
      }
    }

    // Update rating if we have one
    if (scraped.rating) {
      const ratingRegex = new RegExp(`(id:\\s*["']${scraped.tourId}["'][^}]*rating:\\s*)\\d+\\.?\\d*`, 's');
      if (content.match(ratingRegex)) {
        content = content.replace(ratingRegex, `$1${scraped.rating}`);
        updated = true;
      }
    }

    // Update reviewCount if we have one
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

  // Write back
  fs.writeFileSync(TOURS_DATA_PATH, content);
  console.log(`\nUpdated ${updatedCount} tours in tours-data.ts`);
}

// Run
main().catch(console.error);
