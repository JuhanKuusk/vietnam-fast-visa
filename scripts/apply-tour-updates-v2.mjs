#!/usr/bin/env node

/**
 * Apply Tour Updates to tours-data.ts (Version 2)
 *
 * This script reads the update files from tour-updates/ directory
 * and properly applies them to src/lib/tours-data.ts
 *
 * Strategy: Find each tour by slug, then insert the itinerary and other
 * properties right after the affiliateUrl line with proper indentation.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UPDATES_DIR = path.join(__dirname, 'tour-updates');
const TOURS_DATA_FILE = path.join(__dirname, '..', 'src', 'lib', 'tours-data.ts');
const BACKUP_FILE = path.join(__dirname, '..', 'src', 'lib', 'tours-data.ts.backup-v2');

// Read all update files
function readUpdateFiles() {
  const files = fs.readdirSync(UPDATES_DIR).filter(f => f.endsWith('.json'));
  const updates = [];

  for (const file of files) {
    try {
      const content = fs.readFileSync(path.join(UPDATES_DIR, file), 'utf-8');
      const data = JSON.parse(content);
      updates.push(data);
    } catch (err) {
      console.error(`Error reading ${file}:`, err.message);
    }
  }

  return updates;
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

// Generate included
function generateIncluded(included) {
  if (!included || included.length === 0) return '';
  const filtered = included.filter(i => i && i.trim());
  if (filtered.length === 0) return '';
  return `    included: ${JSON.stringify(filtered)},`;
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
function applyUpdates(content, updates) {
  let result = content;
  let updatedCount = 0;
  let skippedCount = 0;

  for (const update of updates) {
    // Skip if no itinerary
    if (!update.itinerary || update.itinerary.length === 0) {
      console.log(`  ⏭️  No itinerary: ${update.slug}`);
      skippedCount++;
      continue;
    }

    // Find the tour by its slug - look for the pattern slug: "xxx"
    const slugPattern = new RegExp(`slug:\\s*["']${update.slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`);
    const slugMatch = result.match(slugPattern);

    if (!slugMatch) {
      console.log(`  ⚠️  Not found: ${update.slug}`);
      skippedCount++;
      continue;
    }

    // Check if already has dayImages (already enhanced)
    const slugIndex = slugMatch.index;
    // Look ahead ~10000 chars for the next tour to check if this one already has dayImages
    const nextTourMatch = result.substring(slugIndex + 50).match(/^\s*\{\s*\n\s*id:/m);
    const tourEndSearch = nextTourMatch
      ? slugIndex + 50 + nextTourMatch.index
      : Math.min(slugIndex + 15000, result.length);

    const tourSection = result.substring(slugIndex, tourEndSearch);

    if (tourSection.includes('dayImages:')) {
      console.log(`  ⏭️  Already enhanced: ${update.slug}`);
      skippedCount++;
      continue;
    }

    // Find the affiliateUrl line for this tour
    const afterSlug = result.substring(slugIndex);
    const affiliateMatch = afterSlug.match(/affiliateUrl:\s*["'][^"']+["'],?\n/);

    if (!affiliateMatch) {
      console.log(`  ⚠️  No affiliateUrl found for: ${update.slug}`);
      skippedCount++;
      continue;
    }

    const insertPosition = slugIndex + affiliateMatch.index + affiliateMatch[0].length;

    // Build the new content to insert
    const newContent = [];

    // Add itinerary (only if not exists)
    if (!tourSection.includes('itinerary:')) {
      const itineraryCode = generateItinerary(update.itinerary);
      if (itineraryCode) newContent.push(itineraryCode);
    }

    // Add imageGallery (only if not exists)
    if (!tourSection.includes('imageGallery:')) {
      const galleryCode = generateImageGallery(update.images);
      if (galleryCode) newContent.push(galleryCode);
    }

    // Add included (only if not exists and scraped has significant content)
    if (!tourSection.includes('included:') && update.included && update.included.length > 2) {
      const includedCode = generateIncluded(update.included);
      if (includedCode) newContent.push(includedCode);
    }

    // Add pricingTiers (only if not exists)
    if (!tourSection.includes('pricingTiers:')) {
      const pricingCode = generatePricingTiers(update.pricingTiers);
      if (pricingCode) newContent.push(pricingCode);
    }

    // Add importantNotes (only if not exists)
    if (!tourSection.includes('importantNotes:')) {
      const notesCode = generateImportantNotes(update.importantNotes);
      if (notesCode) newContent.push(notesCode);
    }

    if (newContent.length === 0) {
      console.log(`  ⏭️  No content to add for: ${update.slug}`);
      skippedCount++;
      continue;
    }

    // Insert the new content
    const insertText = newContent.join('\n') + '\n';
    result = result.substring(0, insertPosition) + insertText + result.substring(insertPosition);

    console.log(`  ✅ Updated: ${update.slug} (${update.itinerary.length} days, ${update.images?.length || 0} images)`);
    updatedCount++;
  }

  return { result, updatedCount, skippedCount };
}

// Main function
async function main() {
  console.log('=== Applying Tour Updates (v2) ===\n');

  // Read update files
  console.log('Reading update files...');
  const updates = readUpdateFiles();
  console.log(`Found ${updates.length} update files\n`);

  if (updates.length === 0) {
    console.log('No updates to apply. Run import-scraped-tours.mjs first.');
    return;
  }

  // Read tours-data.ts
  console.log('Reading tours-data.ts...');
  const content = fs.readFileSync(TOURS_DATA_FILE, 'utf-8');

  // Create backup
  console.log('Creating backup...');
  fs.writeFileSync(BACKUP_FILE, content);
  console.log(`Backup saved to: ${BACKUP_FILE}\n`);

  // Apply updates
  console.log('Applying updates...');
  const { result, updatedCount, skippedCount } = applyUpdates(content, updates);

  // Write updated content
  console.log('\nWriting updated tours-data.ts...');
  fs.writeFileSync(TOURS_DATA_FILE, result);

  console.log('\n=== Summary ===');
  console.log(`Total update files: ${updates.length}`);
  console.log(`Successfully updated: ${updatedCount}`);
  console.log(`Skipped: ${skippedCount}`);
  console.log('\nDone! Run "npx tsc --noEmit" to verify the changes.');
}

main().catch(console.error);
