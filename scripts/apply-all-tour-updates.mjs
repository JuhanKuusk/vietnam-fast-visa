#!/usr/bin/env node

/**
 * Apply ALL Tour Updates by matching via affiliateUrl
 *
 * This is a more robust approach that matches scraped data to tours
 * using the affiliateUrl (source URL) rather than slug matching.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCRAPED_DIR = path.join(__dirname, 'tour-data-output');
const TOURS_DATA_FILE = path.join(__dirname, '..', 'src', 'lib', 'tours-data.ts');
const BACKUP_FILE = path.join(__dirname, '..', 'src', 'lib', 'tours-data.ts.backup-all');

// Read all scraped JSON files and index by sourceUrl
function readScrapedTours() {
  const files = fs.readdirSync(SCRAPED_DIR).filter(f => f.endsWith('.json'));
  const toursByUrl = new Map();

  for (const file of files) {
    try {
      const content = fs.readFileSync(path.join(SCRAPED_DIR, file), 'utf-8');
      const data = JSON.parse(content);
      if (data.sourceUrl) {
        toursByUrl.set(data.sourceUrl, data);
      }
    } catch (err) {
      // Skip invalid files
    }
  }

  return toursByUrl;
}

// Extract all tours with their affiliate URLs from tours-data.ts
function extractToursFromFile(content) {
  const tours = [];

  // Find each tour by matching slug and affiliateUrl
  const slugRegex = /slug:\s*["']([^"']+)["']/g;
  let match;

  while ((match = slugRegex.exec(content)) !== null) {
    const slug = match[1];
    const slugIndex = match.index;

    // Find the affiliateUrl for this tour (within ~3000 chars after slug)
    const searchArea = content.substring(slugIndex, slugIndex + 3000);
    const urlMatch = searchArea.match(/affiliateUrl:\s*["']([^"']+)["']/);

    if (urlMatch) {
      tours.push({
        slug,
        affiliateUrl: urlMatch[1],
        slugIndex
      });
    }
  }

  return tours;
}

// Format a single itinerary day
function formatDay(day) {
  const parts = [];
  parts.push(`        {`);
  parts.push(`          day: ${day.day},`);
  parts.push(`          title: ${JSON.stringify(day.title || `Day ${day.day}`)},`);

  const desc = (day.description || '').replace(/\.\.\.+$/, '').trim();
  parts.push(`          description: ${JSON.stringify(desc)},`);

  const activities = (day.activities || []).filter(a => a && a.trim());
  parts.push(`          activities: ${JSON.stringify(activities)},`);

  if (day.meals && day.meals.length > 0) {
    const meals = day.meals.filter(m => m && m !== 'NA' && m !== 'N/A');
    if (meals.length > 0) {
      parts.push(`          meals: ${JSON.stringify(meals)},`);
    }
  }

  if (day.accommodation && day.accommodation !== 'NA' && day.accommodation !== 'N/A') {
    parts.push(`          accommodation: ${JSON.stringify(day.accommodation.trim())},`);
  }

  if (day.dayImages && day.dayImages.length > 0) {
    const uniqueImages = [...new Set(day.dayImages)].slice(0, 10);
    parts.push(`          imageUrl: ${JSON.stringify(uniqueImages[0])},`);
    if (uniqueImages.length > 1) {
      parts.push(`          dayImages: ${JSON.stringify(uniqueImages)},`);
    }
  }

  parts.push(`        },`);
  return parts.join('\n');
}

// Generate the full itinerary block
function generateItinerary(itinerary) {
  if (!itinerary || itinerary.length === 0) return '';
  const days = itinerary.map(d => formatDay(d)).join('\n');
  return `    itinerary: [\n${days}\n      ],`;
}

// Generate imageGallery
function generateImageGallery(images) {
  if (!images || images.length === 0) return '';
  const unique = [...new Set(images)].slice(0, 20);
  return `    imageGallery: ${JSON.stringify(unique)},`;
}

// Generate pricingTiers
function generatePricingTiers(tiers) {
  if (!tiers || tiers.length === 0) return '';
  return `    pricingTiers: ${JSON.stringify(tiers)},`;
}

// Generate importantNotes
function generateImportantNotes(notes) {
  if (!notes || notes.length === 0) return '';
  const filtered = notes.filter(n => n && n.trim());
  if (filtered.length === 0) return '';
  return `    importantNotes: ${JSON.stringify(filtered)},`;
}

// Main update function
function applyUpdates(content, toursInFile, scrapedByUrl) {
  let result = content;
  let updatedCount = 0;
  let skippedCount = 0;
  let notFoundCount = 0;

  for (const tour of toursInFile) {
    const scraped = scrapedByUrl.get(tour.affiliateUrl);

    if (!scraped) {
      notFoundCount++;
      continue;
    }

    if (!scraped.itinerary || scraped.itinerary.length === 0) {
      console.log(`  ⏭️  No itinerary: ${tour.slug}`);
      skippedCount++;
      continue;
    }

    // Find this tour in the result string
    const slugPattern = new RegExp(`slug:\\s*["']${tour.slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`);
    const slugMatch = result.match(slugPattern);

    if (!slugMatch) {
      console.log(`  ⚠️  Slug not found: ${tour.slug}`);
      skippedCount++;
      continue;
    }

    const slugIndex = slugMatch.index;

    // Check if already has dayImages (already enhanced) - search ~15000 chars after slug
    const searchEndIndex = Math.min(slugIndex + 15000, result.length);
    const tourSection = result.substring(slugIndex, searchEndIndex);

    // Find where this tour ends (next tour starts)
    const nextTourMatch = tourSection.substring(100).match(/^\s*\{\s*\n\s*id:/m);
    const tourEndOffset = nextTourMatch ? 100 + nextTourMatch.index : 15000;
    const thisTourSection = tourSection.substring(0, tourEndOffset);

    if (thisTourSection.includes('dayImages:')) {
      console.log(`  ⏭️  Already enhanced: ${tour.slug}`);
      skippedCount++;
      continue;
    }

    // Find the affiliateUrl line to insert after
    const affiliateMatch = thisTourSection.match(/affiliateUrl:\s*["'][^"']+["'],?\n/);

    if (!affiliateMatch) {
      console.log(`  ⚠️  No affiliateUrl line for: ${tour.slug}`);
      skippedCount++;
      continue;
    }

    const insertPosition = slugIndex + affiliateMatch.index + affiliateMatch[0].length;

    // Build the new content to insert
    const newContent = [];

    // Add itinerary (only if not exists in this tour section)
    if (!thisTourSection.includes('itinerary:')) {
      const itineraryCode = generateItinerary(scraped.itinerary);
      if (itineraryCode) newContent.push(itineraryCode);
    }

    // Add imageGallery (only if not exists)
    if (!thisTourSection.includes('imageGallery:')) {
      const galleryCode = generateImageGallery(scraped.images);
      if (galleryCode) newContent.push(galleryCode);
    }

    // Add pricingTiers (only if not exists)
    if (!thisTourSection.includes('pricingTiers:')) {
      const pricingCode = generatePricingTiers(scraped.pricingTiers);
      if (pricingCode) newContent.push(pricingCode);
    }

    // Add importantNotes (only if not exists)
    if (!thisTourSection.includes('importantNotes:')) {
      const notesCode = generateImportantNotes(scraped.importantNotes);
      if (notesCode) newContent.push(notesCode);
    }

    if (newContent.length === 0) {
      console.log(`  ⏭️  No new content for: ${tour.slug}`);
      skippedCount++;
      continue;
    }

    // Insert the new content
    const insertText = newContent.join('\n') + '\n';
    result = result.substring(0, insertPosition) + insertText + result.substring(insertPosition);

    console.log(`  ✅ Updated: ${tour.slug} (${scraped.itinerary.length} days, ${scraped.images?.length || 0} images)`);
    updatedCount++;
  }

  return { result, updatedCount, skippedCount, notFoundCount };
}

// Main function
async function main() {
  console.log('=== Applying ALL Tour Updates (by URL matching) ===\n');

  // Read scraped tours
  console.log('Reading scraped tour data...');
  const scrapedByUrl = readScrapedTours();
  console.log(`Found ${scrapedByUrl.size} scraped tours\n`);

  // Read tours-data.ts
  console.log('Reading tours-data.ts...');
  const content = fs.readFileSync(TOURS_DATA_FILE, 'utf-8');

  // Extract all tours with their affiliate URLs
  console.log('Extracting tours from file...');
  const toursInFile = extractToursFromFile(content);
  console.log(`Found ${toursInFile.length} tours with affiliate URLs\n`);

  // Create backup
  console.log('Creating backup...');
  fs.writeFileSync(BACKUP_FILE, content);
  console.log(`Backup saved to: ${BACKUP_FILE}\n`);

  // Apply updates
  console.log('Applying updates...\n');
  const { result, updatedCount, skippedCount, notFoundCount } = applyUpdates(content, toursInFile, scrapedByUrl);

  // Write updated content
  console.log('\nWriting updated tours-data.ts...');
  fs.writeFileSync(TOURS_DATA_FILE, result);

  console.log('\n=== Summary ===');
  console.log(`Total tours in file: ${toursInFile.length}`);
  console.log(`Scraped data available: ${scrapedByUrl.size}`);
  console.log(`Successfully updated: ${updatedCount}`);
  console.log(`Skipped (already enhanced/no data): ${skippedCount}`);
  console.log(`No scraped data found: ${notFoundCount}`);
  console.log('\nDone! Run "npx tsc --noEmit" to verify.');
}

main().catch(console.error);
