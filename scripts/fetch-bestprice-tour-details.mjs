#!/usr/bin/env node

/**
 * BestPrice Travel Tour Scraper
 *
 * Fetches detailed tour data from BestPrice Travel website and outputs JSON
 * that can be integrated into tours-data.ts
 *
 * Usage:
 *   node scripts/fetch-bestprice-tour-details.mjs <tour-url>
 *   node scripts/fetch-bestprice-tour-details.mjs --all    # Fetch all tours
 *   node scripts/fetch-bestprice-tour-details.mjs --test   # Test with one tour
 *
 * Output: JSON files in scripts/tour-data-output/
 */

import * as cheerio from 'cheerio';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, 'tour-data-output');
const IMAGES_DIR = path.join(__dirname, '..', 'public', 'tours');

// Delay between requests to avoid rate limiting
const REQUEST_DELAY = 2000;

/**
 * Fetch a URL with retry logic
 */
async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.text();
    } catch (error) {
      console.error(`  Attempt ${i + 1} failed: ${error.message}`);
      if (i === retries - 1) throw error;
      await sleep(1000 * (i + 1));
    }
  }
}

/**
 * Sleep for specified milliseconds
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Download an image to local filesystem
 */
async function downloadImage(imageUrl, localPath) {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) return null;

    const buffer = Buffer.from(await response.arrayBuffer());
    await fs.mkdir(path.dirname(localPath), { recursive: true });
    await fs.writeFile(localPath, buffer);

    return localPath;
  } catch (error) {
    console.error(`  Failed to download image: ${error.message}`);
    return null;
  }
}

/**
 * Parse BestPrice Travel tour page
 */
async function parseTourPage(url) {
  console.log(`\nFetching: ${url}`);

  const html = await fetchWithRetry(url);
  const $ = cheerio.load(html);

  const tourData = {
    sourceUrl: url,
    fetchedAt: new Date().toISOString(),
  };

  // Extract tour title
  tourData.name = $('h1.tour-title, h1.product-title, .tour-header h1').first().text().trim()
    || $('h1').first().text().trim();

  // Extract overview/description
  tourData.overview = $('.tour-overview, .tour-description, .product-description')
    .first()
    .find('p')
    .map((_, el) => $(el).text().trim())
    .get()
    .filter(t => t.length > 0)
    .join('\n\n');

  // Extract duration
  const durationText = $('.tour-duration, .duration-info, [class*="duration"]').first().text();
  tourData.duration = durationText.match(/(\d+)\s*days?/i)?.[0] || '';

  // Extract group size
  const groupSizeText = $('.group-size, [class*="group"]').first().text();
  const minMatch = groupSizeText.match(/min[:\s]*(\d+)/i);
  const maxMatch = groupSizeText.match(/max[:\s]*(\d+)/i);
  if (minMatch || maxMatch) {
    tourData.groupSize = {
      min: parseInt(minMatch?.[1] || '1'),
      max: parseInt(maxMatch?.[1] || '12')
    };
  }

  // Extract highlights
  tourData.highlights = $('.tour-highlights li, .highlights-list li, [class*="highlight"] li')
    .map((_, el) => $(el).text().trim())
    .get()
    .filter(t => t.length > 0);

  // Extract itinerary
  tourData.itinerary = [];

  // Try different itinerary selectors
  const itinerarySelectors = [
    '.itinerary-day, .day-item, [class*="itinerary"] [class*="day"]',
    '.accordion-item, .collapse-item',
    '[data-day], [id*="day"]'
  ];

  let itineraryElements = $();
  for (const selector of itinerarySelectors) {
    itineraryElements = $(selector);
    if (itineraryElements.length > 0) break;
  }

  itineraryElements.each((idx, el) => {
    const $day = $(el);

    // Extract day number
    const dayText = $day.find('.day-number, .day-title, h3, h4').first().text();
    const dayMatch = dayText.match(/day\s*(\d+)/i);
    const dayNum = dayMatch ? parseInt(dayMatch[1]) : idx + 1;

    // Extract title (remove "Day X:" prefix)
    let title = $day.find('.day-title, h3, h4, .title').first().text().trim();
    title = title.replace(/^day\s*\d+\s*[:\-–]\s*/i, '').trim();

    // Extract description
    const description = $day.find('.day-description, .description, p').first().text().trim();

    // Extract activities
    const activities = $day.find('.activities li, .activity-list li, ul li')
      .map((_, li) => $(li).text().trim())
      .get()
      .filter(t => t.length > 0 && t.length < 200);

    // Extract meals
    const mealsText = $day.text();
    const meals = [];
    if (/breakfast/i.test(mealsText)) meals.push('Breakfast');
    if (/lunch/i.test(mealsText)) meals.push('Lunch');
    if (/brunch/i.test(mealsText)) meals.push('Brunch');
    if (/dinner/i.test(mealsText)) meals.push('Dinner');

    // Extract accommodation
    const accommodationMatch = mealsText.match(/accommodation[:\s]*([^.]+)/i)
      || mealsText.match(/overnight[:\s]*([^.]+)/i)
      || mealsText.match(/hotel[:\s]*([^.]+)/i);
    const accommodation = accommodationMatch?.[1]?.trim();

    // Extract day image
    const dayImage = $day.find('img').first().attr('src')
      || $day.find('[style*="background"]').first().attr('style')?.match(/url\(['"]?([^'"]+)['"]?\)/)?.[1];

    if (title || description || activities.length > 0) {
      tourData.itinerary.push({
        day: dayNum,
        title: title || `Day ${dayNum}`,
        description: description,
        activities: activities,
        meals: meals.length > 0 ? meals : undefined,
        accommodation: accommodation,
        imageUrl: dayImage,
      });
    }
  });

  // Extract included items
  tourData.included = $('.included-list li, .whats-included li, [class*="include"] li')
    .map((_, el) => $(el).text().trim())
    .get()
    .filter(t => t.length > 0 && !t.includes('NOT') && !t.includes('not'));

  // Extract excluded items
  tourData.excluded = $('.excluded-list li, .not-included li, [class*="exclude"] li')
    .map((_, el) => $(el).text().trim())
    .get()
    .filter(t => t.length > 0);

  // Extract pricing tiers
  tourData.pricingTiers = [];
  $('.pricing-table tr, .price-table tr, [class*="pricing"] tr').each((_, tr) => {
    const $tr = $(tr);
    const cells = $tr.find('td').map((_, td) => $(td).text().trim()).get();

    if (cells.length >= 2) {
      const category = cells[0];
      const priceMatch = cells[1].match(/\$?([\d,]+)/);

      if (priceMatch && category && !category.toLowerCase().includes('category')) {
        tourData.pricingTiers.push({
          category: category,
          price: parseInt(priceMatch[1].replace(/,/g, '')),
        });
      }
    }
  });

  // Extract reviews
  tourData.reviews = [];
  tourData.rating = null;
  tourData.reviewCount = 0;

  // Rating
  const ratingText = $('.rating, .review-score, [class*="rating"]').first().text();
  const ratingMatch = ratingText.match(/([\d.]+)\s*\/?\s*10/);
  if (ratingMatch) {
    tourData.rating = parseFloat(ratingMatch[1]);
  }

  // Review count
  const reviewCountMatch = $('body').text().match(/(\d+)\s*(?:reviews?|ratings?)/i);
  if (reviewCountMatch) {
    tourData.reviewCount = parseInt(reviewCountMatch[1]);
  }

  // Individual reviews
  $('.review-item, .customer-review, [class*="review"]').each((_, el) => {
    const $review = $(el);
    const name = $review.find('.reviewer-name, .name, strong').first().text().trim();
    const comment = $review.find('.review-text, .comment, p').first().text().trim();
    const country = $review.find('.country, .location').first().text().trim();

    if (name && comment) {
      tourData.reviews.push({
        name,
        country: country || 'Unknown',
        rating: tourData.rating || 9.0,
        comment: comment.substring(0, 500),
      });
    }
  });

  // Extract all images
  tourData.images = [];
  $('img[src*="cloudfront"], img[src*="bestprice"], .gallery img, .tour-images img').each((_, img) => {
    const src = $(img).attr('src') || $(img).attr('data-src');
    if (src && !src.includes('logo') && !src.includes('icon')) {
      tourData.images.push(src);
    }
  });

  // Extract important notes
  tourData.importantNotes = [];
  $('.important-notes li, .tour-notes li, [class*="note"] li, [class*="important"] li').each((_, el) => {
    const note = $(el).text().trim();
    if (note.length > 10 && note.length < 500) {
      tourData.importantNotes.push(note);
    }
  });

  console.log(`  Found: ${tourData.name || 'Unknown'}`);
  console.log(`  Itinerary days: ${tourData.itinerary.length}`);
  console.log(`  Images: ${tourData.images.length}`);
  console.log(`  Pricing tiers: ${tourData.pricingTiers.length}`);

  return tourData;
}

/**
 * Generate a tour ID from URL
 */
function getTourIdFromUrl(url) {
  const match = url.match(/\/([^/]+)\.html$/);
  if (match) {
    return match[1].replace(/-/g, '-').substring(0, 50);
  }
  return 'unknown-tour';
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
BestPrice Travel Tour Scraper

Usage:
  node scripts/fetch-bestprice-tour-details.mjs <tour-url>
  node scripts/fetch-bestprice-tour-details.mjs --test
  node scripts/fetch-bestprice-tour-details.mjs --all

Examples:
  node scripts/fetch-bestprice-tour-details.mjs https://www.bestpricetravel.com/vietnam-tours/real-taste-of-vietnam-13-days.html
    `);
    process.exit(0);
  }

  // Ensure output directory exists
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  if (args[0] === '--test') {
    // Test with Real Taste of Vietnam tour
    const testUrl = 'https://www.bestpricetravel.com/vietnam-tours/real-taste-of-vietnam-13-days.html';
    const tourData = await parseTourPage(testUrl);

    const outputPath = path.join(OUTPUT_DIR, 'real-taste-of-vietnam-13-days.json');
    await fs.writeFile(outputPath, JSON.stringify(tourData, null, 2));
    console.log(`\nSaved to: ${outputPath}`);

  } else if (args[0] === '--all') {
    // Fetch all BestPrice tours
    console.log('Fetching all BestPrice tours...');
    console.log('This feature requires the tour URLs to be extracted from tours-data.ts');
    console.log('Run with a specific URL for now.');

  } else {
    // Single URL
    const url = args[0];
    if (!url.includes('bestpricetravel.com')) {
      console.error('Error: URL must be from bestpricetravel.com');
      process.exit(1);
    }

    const tourData = await parseTourPage(url);
    const tourId = getTourIdFromUrl(url);

    const outputPath = path.join(OUTPUT_DIR, `${tourId}.json`);
    await fs.writeFile(outputPath, JSON.stringify(tourData, null, 2));
    console.log(`\nSaved to: ${outputPath}`);
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
