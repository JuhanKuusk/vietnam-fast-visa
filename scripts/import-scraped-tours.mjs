#!/usr/bin/env node

/**
 * Import Scraped Tour Data into tours-data.ts
 *
 * This script reads the scraped JSON files from tour-data-output/
 * and updates the corresponding tours in src/lib/tours-data.ts
 * with enhanced content (descriptions, dayImages, etc.)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCRAPED_DIR = path.join(__dirname, 'tour-data-output');
const TOURS_DATA_FILE = path.join(__dirname, '..', 'src', 'lib', 'tours-data.ts');

// Helper to convert URL slug to match tour slug
function urlToSlug(url) {
  // Extract the last part of the URL path
  const match = url.match(/\/([^/]+)\.html$/);
  if (match) {
    return match[1];
  }
  return null;
}

// Helper to normalize slug for matching
function normalizeSlug(slug) {
  return slug
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Read all scraped JSON files
function readScrapedTours() {
  const files = fs.readdirSync(SCRAPED_DIR).filter(f => f.endsWith('.json'));
  const tours = [];

  for (const file of files) {
    try {
      const content = fs.readFileSync(path.join(SCRAPED_DIR, file), 'utf-8');
      const data = JSON.parse(content);

      // Extract slug from sourceUrl
      const slug = urlToSlug(data.sourceUrl);
      if (slug) {
        tours.push({
          ...data,
          scrapedSlug: slug,
          fileName: file
        });
      }
    } catch (err) {
      console.error(`Error reading ${file}:`, err.message);
    }
  }

  return tours;
}

// Extract tours from tours-data.ts (find slugs)
function extractExistingSlugs(toursDataContent) {
  const slugPattern = /slug:\s*["']([^"']+)["']/g;
  const slugs = [];
  let match;

  while ((match = slugPattern.exec(toursDataContent)) !== null) {
    slugs.push(match[1]);
  }

  return slugs;
}

// Match scraped tours to existing tours
function matchTours(scrapedTours, existingSlugs) {
  const matches = [];
  const unmatched = [];

  for (const scraped of scrapedTours) {
    const normalizedScraped = normalizeSlug(scraped.scrapedSlug);

    // Try to find a matching slug
    let bestMatch = null;
    let bestScore = 0;

    for (const existingSlug of existingSlugs) {
      const normalizedExisting = normalizeSlug(existingSlug);

      // Exact match
      if (normalizedScraped === normalizedExisting) {
        bestMatch = existingSlug;
        bestScore = 100;
        break;
      }

      // Partial match - check if one contains the other
      if (normalizedScraped.includes(normalizedExisting) || normalizedExisting.includes(normalizedScraped)) {
        const score = Math.min(normalizedScraped.length, normalizedExisting.length) /
                     Math.max(normalizedScraped.length, normalizedExisting.length) * 80;
        if (score > bestScore) {
          bestMatch = existingSlug;
          bestScore = score;
        }
      }

      // Check by tour name similarity
      const scrapedName = normalizeSlug(scraped.name || '');
      const existingName = normalizeSlug(existingSlug);
      if (scrapedName && existingName.includes(scrapedName.slice(0, 15))) {
        const score = 60;
        if (score > bestScore) {
          bestMatch = existingSlug;
          bestScore = score;
        }
      }
    }

    if (bestMatch && bestScore >= 50) {
      matches.push({
        scraped,
        existingSlug: bestMatch,
        score: bestScore
      });
    } else {
      unmatched.push(scraped);
    }
  }

  return { matches, unmatched };
}

// Format itinerary day for TypeScript
function formatItineraryDay(day, indent = '        ') {
  const lines = [];
  lines.push(`${indent}{`);
  lines.push(`${indent}  day: ${day.day},`);
  lines.push(`${indent}  title: ${JSON.stringify(day.title)},`);

  // Clean and format description
  let description = day.description || '';
  // Remove truncation markers
  description = description.replace(/\.\.\.+$/, '');
  lines.push(`${indent}  description: ${JSON.stringify(description)},`);

  // Activities
  const activities = day.activities && day.activities.length > 0
    ? day.activities
    : [];
  lines.push(`${indent}  activities: ${JSON.stringify(activities)},`);

  // Meals
  if (day.meals && day.meals.length > 0) {
    const meals = day.meals.filter(m => m && m !== 'NA' && m !== 'N/A');
    if (meals.length > 0) {
      lines.push(`${indent}  meals: ${JSON.stringify(meals)},`);
    }
  }

  // Accommodation
  if (day.accommodation && day.accommodation !== 'NA' && day.accommodation !== 'N/A') {
    lines.push(`${indent}  accommodation: ${JSON.stringify(day.accommodation)},`);
  }

  // Day images
  if (day.dayImages && day.dayImages.length > 0) {
    // Remove duplicate images
    const uniqueImages = [...new Set(day.dayImages)];
    lines.push(`${indent}  imageUrl: ${JSON.stringify(uniqueImages[0])},`);
    lines.push(`${indent}  dayImages: ${JSON.stringify(uniqueImages)},`);
  }

  lines.push(`${indent}},`);
  return lines.join('\n');
}

// Generate the itinerary array code
function generateItineraryCode(itinerary) {
  if (!itinerary || itinerary.length === 0) return null;

  const lines = ['    itinerary: ['];
  for (const day of itinerary) {
    lines.push(formatItineraryDay(day));
  }
  lines.push('    ],');
  return lines.join('\n');
}

// Generate update report
function generateReport(matches, unmatched, scrapedTours) {
  console.log('\n=== Tour Import Report ===\n');
  console.log(`Total scraped tours: ${scrapedTours.length}`);
  console.log(`Matched tours: ${matches.length}`);
  console.log(`Unmatched tours: ${unmatched.length}`);

  console.log('\n--- Matched Tours ---');
  for (const m of matches.sort((a, b) => b.score - a.score)) {
    console.log(`  [${m.score.toFixed(0)}%] ${m.scraped.name}`);
    console.log(`         Scraped: ${m.scraped.scrapedSlug}`);
    console.log(`         Existing: ${m.existingSlug}`);
    console.log(`         Itinerary days: ${m.scraped.itinerary?.length || 0}`);
  }

  if (unmatched.length > 0) {
    console.log('\n--- Unmatched Tours (need manual mapping) ---');
    for (const u of unmatched) {
      console.log(`  - ${u.name} (${u.scrapedSlug})`);
    }
  }
}

// Create a mapping file for manual review
function createMappingFile(matches, unmatched) {
  const mapping = {
    generated: new Date().toISOString(),
    matches: matches.map(m => ({
      scrapedSlug: m.scraped.scrapedSlug,
      scrapedName: m.scraped.name,
      existingSlug: m.existingSlug,
      matchScore: m.score,
      itineraryDays: m.scraped.itinerary?.length || 0,
      images: m.scraped.images?.length || 0
    })),
    unmatched: unmatched.map(u => ({
      scrapedSlug: u.scrapedSlug,
      scrapedName: u.name,
      sourceUrl: u.sourceUrl
    }))
  };

  const mappingFile = path.join(__dirname, 'tour-mapping.json');
  fs.writeFileSync(mappingFile, JSON.stringify(mapping, null, 2));
  console.log(`\nMapping file saved to: ${mappingFile}`);
}

// Generate TypeScript code for a single tour update
function generateTourUpdateCode(match) {
  const scraped = match.scraped;
  const slug = match.existingSlug;

  const updates = [];

  // Itinerary with dayImages
  if (scraped.itinerary && scraped.itinerary.length > 0) {
    updates.push({
      field: 'itinerary',
      code: generateItineraryCode(scraped.itinerary)
    });
  }

  // Pricing tiers
  if (scraped.pricingTiers && scraped.pricingTiers.length > 0) {
    const tiersCode = `    pricingTiers: ${JSON.stringify(scraped.pricingTiers, null, 2).split('\n').join('\n    ')},`;
    updates.push({
      field: 'pricingTiers',
      code: tiersCode
    });
  }

  // Image gallery
  if (scraped.images && scraped.images.length > 0) {
    const uniqueImages = [...new Set(scraped.images)].slice(0, 20);
    updates.push({
      field: 'imageGallery',
      code: `    imageGallery: ${JSON.stringify(uniqueImages)},`
    });
  }

  // Highlights
  if (scraped.highlights && scraped.highlights.length > 0) {
    updates.push({
      field: 'highlights',
      code: `    highlights: ${JSON.stringify(scraped.highlights)},`
    });
  }

  // Included items
  if (scraped.included && scraped.included.length > 0) {
    updates.push({
      field: 'included',
      code: `    included: ${JSON.stringify(scraped.included)},`
    });
  }

  // Important notes
  if (scraped.importantNotes && scraped.importantNotes.length > 0) {
    updates.push({
      field: 'importantNotes',
      code: `    importantNotes: ${JSON.stringify(scraped.importantNotes)},`
    });
  }

  return {
    slug,
    scrapedName: scraped.name,
    updates
  };
}

// Main function
async function main() {
  console.log('Reading scraped tour data...');
  const scrapedTours = readScrapedTours();
  console.log(`Found ${scrapedTours.length} scraped tour files`);

  console.log('\nReading existing tours-data.ts...');
  const toursDataContent = fs.readFileSync(TOURS_DATA_FILE, 'utf-8');
  const existingSlugs = extractExistingSlugs(toursDataContent);
  console.log(`Found ${existingSlugs.length} existing tour slugs`);

  console.log('\nMatching tours...');
  const { matches, unmatched } = matchTours(scrapedTours, existingSlugs);

  // Generate report
  generateReport(matches, unmatched, scrapedTours);

  // Create mapping file
  createMappingFile(matches, unmatched);

  // Generate update snippets for each matched tour
  console.log('\n\n=== Generating Update Code ===\n');

  const updatesDir = path.join(__dirname, 'tour-updates');
  if (!fs.existsSync(updatesDir)) {
    fs.mkdirSync(updatesDir);
  }

  let totalUpdates = 0;
  for (const match of matches) {
    if (match.scraped.itinerary && match.scraped.itinerary.length > 0) {
      const updateInfo = generateTourUpdateCode(match);

      // Save individual update file
      const updateFile = path.join(updatesDir, `${normalizeSlug(match.existingSlug)}.json`);
      fs.writeFileSync(updateFile, JSON.stringify({
        slug: updateInfo.slug,
        scrapedName: updateInfo.scrapedName,
        itinerary: match.scraped.itinerary,
        pricingTiers: match.scraped.pricingTiers,
        highlights: match.scraped.highlights,
        included: match.scraped.included,
        images: match.scraped.images?.slice(0, 20),
        importantNotes: match.scraped.importantNotes
      }, null, 2));

      totalUpdates++;
    }
  }

  console.log(`\nGenerated ${totalUpdates} tour update files in: ${updatesDir}`);
  console.log('\nNext steps:');
  console.log('1. Review the mapping in tour-mapping.json');
  console.log('2. Run: node scripts/apply-tour-updates.mjs');
  console.log('   This will apply the updates to tours-data.ts');
}

main().catch(console.error);
