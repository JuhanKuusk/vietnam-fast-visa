#!/usr/bin/env node

/**
 * BestPrice Travel Tour Scraper using Playwright
 *
 * Fetches detailed tour data from BestPrice Travel website using headless browser
 * to properly render JavaScript content.
 *
 * Usage:
 *   node scripts/fetch-bestprice-playwright.mjs <tour-url>
 *   node scripts/fetch-bestprice-playwright.mjs --test   # Test with one tour
 *
 * Output: JSON files in scripts/tour-data-output/
 */

import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, 'tour-data-output');

/**
 * Sleep for specified milliseconds
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Parse BestPrice Travel tour page using Playwright
 */
async function parseTourPage(url) {
  console.log(`\nFetching: ${url}`);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });

    // Wait for the page to load
    await page.waitForSelector('h1', { timeout: 10000 });

    // Click "Expand all" button to show all itinerary content
    const expandButton = page.locator('text=Expand all');
    if (await expandButton.isVisible()) {
      await expandButton.click();
      await sleep(1000); // Wait for content to expand
    }

    const tourData = {
      sourceUrl: url,
      fetchedAt: new Date().toISOString(),
    };

    // Extract tour title
    tourData.name = await page.locator('h1').first().textContent();
    tourData.name = tourData.name?.trim() || '';

    // Extract rating and review count
    const ratingText = await page.locator('.review-score').first().textContent().catch(() => null);
    if (ratingText) {
      tourData.rating = parseFloat(ratingText);
    }

    const reviewCountText = await page.locator('.review-number').first().textContent().catch(() => null);
    if (reviewCountText) {
      const match = reviewCountText.match(/(\d+)/);
      if (match) {
        tourData.reviewCount = parseInt(match[1]);
      }
    }

    // Extract duration
    const durationEl = await page.locator('text=Duration').first().locator('..').locator('xpath=following-sibling::*').first();
    tourData.duration = await durationEl.textContent().catch(() => '');

    // Extract places
    const placesEl = await page.locator('text=Places:').first().locator('..').locator('xpath=following-sibling::*').first();
    tourData.places = await placesEl.textContent().catch(() => '');

    // Extract meals summary
    const mealsEl = await page.locator('text=Meals:').first().locator('..').locator('xpath=following-sibling::*').first();
    tourData.mealsSummary = await mealsEl.textContent().catch(() => '');

    // Extract group size
    const groupSizeEl = await page.locator('text=Group size:').first().locator('..').locator('xpath=following-sibling::*').first();
    const groupSizeText = await groupSizeEl.textContent().catch(() => '');
    const minMatch = groupSizeText.match(/Min\s*(\d+)/i);
    const maxMatch = groupSizeText.match(/Max\s*(\d+)/i);
    if (minMatch || maxMatch) {
      tourData.groupSize = {
        min: parseInt(minMatch?.[1] || '1'),
        max: parseInt(maxMatch?.[1] || '12')
      };
    }

    // Extract highlights (Why tourists love this trip)
    tourData.highlights = [];
    const highlightItems = await page.locator('text=Why American tourists love this trip >> .. >> li strong').all();
    for (const item of highlightItems) {
      const text = await item.textContent();
      if (text) tourData.highlights.push(text.trim());
    }

    // Extract overview paragraph
    const overviewParagraph = await page.locator('#h_tour_itinerary').locator('xpath=following-sibling::p').first();
    tourData.overview = await overviewParagraph.textContent().catch(() => '');

    // Extract itinerary
    tourData.itinerary = [];

    // Find all day headers and their content
    const dayHeaders = await page.locator('[class*="accordion"], [class*="collapse"]').locator('xpath=.//*[contains(text(), "Day ")]').all();

    // Alternative approach: look for day patterns
    const dayElements = await page.evaluate(() => {
      const days = [];
      const dayRegex = /Day\s*(\d+):\s*(.+)/;

      // Find all elements containing "Day X:"
      const allElements = document.querySelectorAll('*');
      let currentDay = null;

      for (const el of allElements) {
        const text = el.textContent?.trim() || '';
        const match = text.match(dayRegex);

        if (match && el.tagName !== 'SCRIPT' && el.tagName !== 'STYLE') {
          // Check if this is a day header (not nested content)
          const directText = Array.from(el.childNodes)
            .filter(n => n.nodeType === Node.TEXT_NODE)
            .map(n => n.textContent)
            .join('');

          if (directText.includes('Day') || el.querySelector(':scope > *')?.textContent?.includes('Day')) {
            const dayNum = parseInt(match[1]);

            // Look for the content container (next sibling or parent's next sibling)
            let contentEl = el.nextElementSibling;
            if (!contentEl || contentEl.textContent.length < 50) {
              contentEl = el.parentElement?.nextElementSibling;
            }
            if (!contentEl || contentEl.textContent.length < 50) {
              contentEl = el.closest('[class*="accordion"]')?.querySelector('[class*="content"], [class*="body"], [class*="collapse"]');
            }

            const content = contentEl?.textContent?.trim() || '';

            // Extract meals
            const mealsMatch = content.match(/Meals:\s*([^\n]+)/i);
            const meals = mealsMatch ? mealsMatch[1].split(',').map(m => m.trim()) : [];

            // Extract accommodation
            const accMatch = content.match(/Accommodation:\s*([^\n]+)/i);
            const accommodation = accMatch ? accMatch[1].trim() : '';

            // Check if we already have this day
            if (!days.find(d => d.day === dayNum)) {
              days.push({
                day: dayNum,
                title: match[2].trim(),
                description: content.substring(0, 500),
                meals,
                accommodation
              });
            }
          }
        }
      }

      return days.sort((a, b) => a.day - b.day);
    });

    // Use a more reliable extraction approach
    const itineraryData = await page.evaluate(() => {
      const days = [];
      const bodyText = document.body.innerText;

      // Split by "Day X:" pattern
      const dayPattern = /Day\s+(\d+):\s*([^\n]+)/g;
      let matches = [...bodyText.matchAll(dayPattern)];

      for (let i = 0; i < matches.length; i++) {
        const match = matches[i];
        const dayNum = parseInt(match[1]);
        const title = match[2].trim();

        // Get the text between this day and the next
        const startPos = match.index + match[0].length;
        const endPos = matches[i + 1] ? matches[i + 1].index : bodyText.length;
        const dayContent = bodyText.substring(startPos, endPos);

        // Extract meals - look for "Meals:" followed by content up to "Accommodation:" or newline
        let meals = [];
        const mealsMatch = dayContent.match(/Meals:\s*([^\n]+)/i);
        if (mealsMatch) {
          let mealsText = mealsMatch[1].trim();
          // Stop at Accommodation if present
          mealsText = mealsText.split('Accommodation')[0].trim();
          meals = mealsText.split(',').map(m => m.trim()).filter(m => m.length > 0 && m.length < 30);
        }

        // Extract accommodation - look for "Accommodation:" followed by content
        let accommodation = '';
        const accMatch = dayContent.match(/Accommodation:\s*([^\n]+)/i);
        if (accMatch) {
          accommodation = accMatch[1].trim();
          // Clean up - stop at common end patterns
          accommodation = accommodation.split('Day ')[0].trim();
          accommodation = accommodation.split('Start point')[0].trim();
          accommodation = accommodation.split('End point')[0].trim();
        }

        // Get description - first few sentences before meals
        let description = '';
        const descEnd = dayContent.search(/Meals:/i);
        if (descEnd > 0) {
          description = dayContent.substring(0, descEnd).trim();
          // Get first 3 paragraphs/sentences
          const sentences = description.split(/\.\s+/);
          description = sentences.slice(0, 5).join('. ').substring(0, 600);
          if (description.length === 600) description += '...';
        }

        // Look for images related to this day in the DOM
        const dayImages = [];
        const imgElements = document.querySelectorAll(`img[alt*="Day ${dayNum}"]`);
        imgElements.forEach(img => {
          const src = img.src || img.getAttribute('data-src');
          if (src && src.includes('cloudfront')) {
            dayImages.push(src);
          }
        });

        // Check if day already exists
        if (!days.find(d => d.day === dayNum)) {
          days.push({
            day: dayNum,
            title: title.split('Morning')[0].split('Afternoon')[0].split('Evening')[0].trim(),
            description,
            activities: [],
            meals,
            accommodation,
            dayImages
          });
        }
      }

      return days.sort((a, b) => a.day - b.day);
    });

    tourData.itinerary = itineraryData;


    // Extract pricing tiers - look for the Tour Price section specifically
    tourData.pricingTiers = await page.evaluate(() => {
      const tiers = [];

      // Find the Tour Price heading and get its parent section
      const priceHeading = document.evaluate(
        "//h2[contains(text(),'Tour Price')]",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;

      if (priceHeading) {
        // Find the table after this heading
        let sibling = priceHeading.nextElementSibling;
        while (sibling) {
          const table = sibling.tagName === 'TABLE' ? sibling : sibling.querySelector('table');
          if (table) {
            const rows = table.querySelectorAll('tbody tr');
            for (const row of rows) {
              const cells = row.querySelectorAll('td');
              if (cells.length >= 2) {
                const category = cells[0].textContent?.trim() || '';
                const priceText = cells[1].textContent?.trim() || '';
                const priceMatch = priceText.match(/\$?([\d,]+)/);

                // Only include hotel tiers (Economy, Superior, First Class, Deluxe)
                if (priceMatch && category &&
                    (category.includes('Hotel') || category.includes('Star') ||
                     category.includes('Economy') || category.includes('Superior') ||
                     category.includes('First Class') || category.includes('Deluxe'))) {
                  tiers.push({
                    category,
                    price: parseInt(priceMatch[1].replace(/,/g, ''))
                  });
                }
              }
            }
            break;
          }
          sibling = sibling.nextElementSibling;
        }
      }

      return tiers;
    });

    // Extract included items
    tourData.included = await page.evaluate(() => {
      const items = [];
      const inclusionSection = document.querySelector('#h_tour_inclusion, [id*="inclusion"], .inclusions');

      if (inclusionSection) {
        const listItems = inclusionSection.querySelectorAll('li');
        for (const li of listItems) {
          const text = li.textContent?.trim();
          if (text && text.length > 5 && text.length < 300) {
            items.push(text);
          }
        }
      }

      // Also try the "Included activities" section
      const actSection = document.evaluate(
        "//*[contains(text(),'Included activities')]/following-sibling::ul",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;

      if (actSection) {
        const lis = actSection.querySelectorAll('li');
        for (const li of lis) {
          const text = li.textContent?.trim();
          if (text && !items.includes(text)) {
            items.push(text);
          }
        }
      }

      return items;
    });

    // Extract images
    tourData.images = await page.evaluate(() => {
      const images = [];
      const imgs = document.querySelectorAll('img[src*="cloudfront"]');
      for (const img of imgs) {
        const src = img.src || img.getAttribute('data-src');
        if (src && !src.includes('logo') && !src.includes('icon') && !images.includes(src)) {
          images.push(src);
        }
      }
      return images;
    });

    // Extract important notes
    tourData.importantNotes = await page.evaluate(() => {
      const notes = [];
      const noteSection = document.evaluate(
        "//*[contains(text(),'Important Notes')]/following-sibling::ul",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;

      if (noteSection) {
        const lis = noteSection.querySelectorAll('li');
        for (const li of lis) {
          const text = li.textContent?.trim();
          if (text) notes.push(text);
        }
      }

      return notes;
    });

    // Extract reviews
    tourData.reviews = await page.evaluate(() => {
      const reviews = [];
      const reviewItems = document.querySelectorAll('[class*="review-item"], [class*="customer-review"]');

      for (const item of reviewItems) {
        const scoreEl = item.querySelector('[class*="score"]');
        const nameEl = item.querySelector('[class*="name"], strong');
        const commentEl = item.querySelector('p, [class*="comment"]');
        const countryEl = item.querySelector('[class*="country"]');

        if (nameEl && commentEl) {
          reviews.push({
            name: nameEl.textContent?.trim() || 'Anonymous',
            country: countryEl?.textContent?.trim() || 'Unknown',
            rating: parseFloat(scoreEl?.textContent || '9.0'),
            comment: commentEl.textContent?.trim().substring(0, 500) || ''
          });
        }
      }

      return reviews.slice(0, 10); // Limit to 10 reviews
    });

    // Extract score breakdown
    tourData.scoreBreakdown = await page.evaluate(() => {
      const breakdown = {};
      const scoreItems = document.querySelectorAll('[class*="score-breakdown"] li, [class*="Score breakdown"] + ul li');

      for (const item of scoreItems) {
        const text = item.textContent || '';
        const match = text.match(/(.+?)\s*([\d.]+)/);
        if (match) {
          const key = match[1].trim().toLowerCase().replace(/[^a-z]/g, '');
          breakdown[key] = parseFloat(match[2]);
        }
      }

      return breakdown;
    });

    console.log(`  Found: ${tourData.name}`);
    console.log(`  Itinerary days: ${tourData.itinerary.length}`);
    console.log(`  Images: ${tourData.images.length}`);
    console.log(`  Pricing tiers: ${tourData.pricingTiers.length}`);
    console.log(`  Included items: ${tourData.included.length}`);

    await browser.close();
    return tourData;

  } catch (error) {
    console.error(`Error parsing tour page: ${error.message}`);
    await browser.close();
    throw error;
  }
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
 * Extract BestPrice URLs from tours-data.ts
 */
async function extractBestPriceUrls() {
  const toursDataPath = path.join(__dirname, '..', 'src', 'lib', 'tours-data.ts');
  const content = await fs.readFile(toursDataPath, 'utf-8');

  const urlPattern = /affiliateUrl:\s*["']([^"']*bestpricetravel\.com[^"']+)["']/g;
  const urls = new Set();

  let match;
  while ((match = urlPattern.exec(content)) !== null) {
    urls.add(match[1]);
  }

  return Array.from(urls);
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
BestPrice Travel Tour Scraper (Playwright)

Usage:
  node scripts/fetch-bestprice-playwright.mjs <tour-url>
  node scripts/fetch-bestprice-playwright.mjs --test
  node scripts/fetch-bestprice-playwright.mjs --all         # Fetch all BestPrice tours
  node scripts/fetch-bestprice-playwright.mjs --list        # List all BestPrice URLs

Examples:
  node scripts/fetch-bestprice-playwright.mjs https://www.bestpricetravel.com/vietnam-tours/real-taste-of-vietnam-13-days.html
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

  } else if (args[0] === '--list') {
    // List all BestPrice URLs
    const urls = await extractBestPriceUrls();
    console.log(`\nFound ${urls.length} unique BestPrice URLs:\n`);
    urls.forEach((url, i) => console.log(`${i + 1}. ${url}`));

  } else if (args[0] === '--all') {
    // Fetch all BestPrice tours
    const urls = await extractBestPriceUrls();
    console.log(`\nFetching ${urls.length} BestPrice tours...\n`);

    const results = { success: [], failed: [] };

    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      const tourId = getTourIdFromUrl(url);
      console.log(`\n[${i + 1}/${urls.length}] Processing: ${tourId}`);

      try {
        const tourData = await parseTourPage(url);
        const outputPath = path.join(OUTPUT_DIR, `${tourId}.json`);
        await fs.writeFile(outputPath, JSON.stringify(tourData, null, 2));
        results.success.push(tourId);
        console.log(`  ✓ Saved to: ${outputPath}`);
      } catch (error) {
        console.error(`  ✗ Failed: ${error.message}`);
        results.failed.push({ tourId, error: error.message });
      }

      // Delay between requests to avoid rate limiting
      if (i < urls.length - 1) {
        await sleep(2000);
      }
    }

    console.log(`\n========== SUMMARY ==========`);
    console.log(`Success: ${results.success.length}`);
    console.log(`Failed: ${results.failed.length}`);
    if (results.failed.length > 0) {
      console.log(`\nFailed tours:`);
      results.failed.forEach(f => console.log(`  - ${f.tourId}: ${f.error}`));
    }

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
