#!/usr/bin/env node

/**
 * Apply Tour Updates to tours-data.ts
 *
 * This script reads the update files from tour-updates/ directory
 * and applies them to src/lib/tours-data.ts
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UPDATES_DIR = path.join(__dirname, 'tour-updates');
const TOURS_DATA_FILE = path.join(__dirname, '..', 'src', 'lib', 'tours-data.ts');
const BACKUP_FILE = path.join(__dirname, '..', 'src', 'lib', 'tours-data.ts.backup-updates');

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

// Format itinerary day for TypeScript
function formatItineraryDay(day, indent = '        ') {
  const lines = [];
  lines.push(`${indent}{`);
  lines.push(`${indent}  day: ${day.day},`);
  lines.push(`${indent}  title: ${JSON.stringify(day.title || `Day ${day.day}`)},`);

  // Clean and format description
  let description = day.description || '';
  // Remove truncation markers and clean up
  description = description.replace(/\.\.\.+$/, '').trim();
  if (description) {
    lines.push(`${indent}  description: ${JSON.stringify(description)},`);
  } else {
    lines.push(`${indent}  description: "",`);
  }

  // Activities
  const activities = day.activities && day.activities.length > 0
    ? day.activities.filter(a => a && a.trim())
    : [];
  lines.push(`${indent}  activities: ${JSON.stringify(activities)},`);

  // Meals
  if (day.meals && day.meals.length > 0) {
    const meals = day.meals.filter(m => m && m !== 'NA' && m !== 'N/A' && m.trim());
    if (meals.length > 0) {
      lines.push(`${indent}  meals: ${JSON.stringify(meals)},`);
    }
  }

  // Accommodation
  if (day.accommodation && day.accommodation !== 'NA' && day.accommodation !== 'N/A' && day.accommodation.trim()) {
    lines.push(`${indent}  accommodation: ${JSON.stringify(day.accommodation.trim())},`);
  }

  // Day images - the key enhancement!
  if (day.dayImages && day.dayImages.length > 0) {
    // Remove duplicate images and limit to reasonable number
    const uniqueImages = [...new Set(day.dayImages)].slice(0, 10);
    lines.push(`${indent}  imageUrl: ${JSON.stringify(uniqueImages[0])},`);
    if (uniqueImages.length > 1) {
      lines.push(`${indent}  dayImages: ${JSON.stringify(uniqueImages)},`);
    }
  }

  lines.push(`${indent}},`);
  return lines.join('\n');
}

// Generate complete itinerary array code
function generateItineraryCode(itinerary) {
  if (!itinerary || itinerary.length === 0) return null;

  const lines = ['itinerary: ['];
  for (const day of itinerary) {
    lines.push(formatItineraryDay(day));
  }
  lines.push('      ],');
  return lines.join('\n      ');
}

// Generate highlights code
function generateHighlightsCode(highlights) {
  if (!highlights || highlights.length === 0) return null;
  const filtered = highlights.filter(h => h && h.trim());
  if (filtered.length === 0) return null;
  return `highlights: ${JSON.stringify(filtered)},`;
}

// Generate included code
function generateIncludedCode(included) {
  if (!included || included.length === 0) return null;
  const filtered = included.filter(i => i && i.trim());
  if (filtered.length === 0) return null;
  return `included: ${JSON.stringify(filtered)},`;
}

// Generate image gallery code
function generateGalleryCode(images) {
  if (!images || images.length === 0) return null;
  const uniqueImages = [...new Set(images)].slice(0, 20);
  return `imageGallery: ${JSON.stringify(uniqueImages)},`;
}

// Generate pricing tiers code
function generatePricingCode(pricingTiers) {
  if (!pricingTiers || pricingTiers.length === 0) return null;
  return `pricingTiers: ${JSON.stringify(pricingTiers)},`;
}

// Generate important notes code
function generateNotesCode(importantNotes) {
  if (!importantNotes || importantNotes.length === 0) return null;
  const filtered = importantNotes.filter(n => n && n.trim());
  if (filtered.length === 0) return null;
  return `importantNotes: ${JSON.stringify(filtered)},`;
}

// Find the tour object in the file content and get its boundaries
function findTourBoundaries(content, slug) {
  // Find the tour by its slug
  const slugPattern = new RegExp(`slug:\\s*["']${slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`);
  const slugMatch = content.match(slugPattern);

  if (!slugMatch) {
    return null;
  }

  const slugIndex = slugMatch.index;

  // Find the start of this tour object (go back to find opening brace)
  let braceCount = 0;
  let tourStart = slugIndex;

  // Go backwards to find the opening { of this tour object
  for (let i = slugIndex; i >= 0; i--) {
    if (content[i] === '{') {
      braceCount++;
      if (braceCount === 1) {
        tourStart = i;
        break;
      }
    } else if (content[i] === '}') {
      braceCount--;
    }
  }

  // Find the end of this tour object
  braceCount = 0;
  let tourEnd = slugIndex;

  for (let i = tourStart; i < content.length; i++) {
    if (content[i] === '{') {
      braceCount++;
    } else if (content[i] === '}') {
      braceCount--;
      if (braceCount === 0) {
        tourEnd = i + 1;
        break;
      }
    }
  }

  return { start: tourStart, end: tourEnd };
}

// Check if tour already has itinerary with dayImages
function hasEnhancedItinerary(tourContent) {
  return tourContent.includes('dayImages:') && tourContent.includes('itinerary:');
}

// Update a single tour in the content
function updateTour(content, update) {
  const boundaries = findTourBoundaries(content, update.slug);

  if (!boundaries) {
    console.log(`  ⚠️  Could not find tour: ${update.slug}`);
    return { content, updated: false };
  }

  const tourContent = content.substring(boundaries.start, boundaries.end);

  // Skip if already has enhanced itinerary
  if (hasEnhancedItinerary(tourContent)) {
    console.log(`  ⏭️  Already enhanced: ${update.slug}`);
    return { content, updated: false };
  }

  // Build new properties to add/update
  const newProperties = [];

  // Itinerary (most important)
  if (update.itinerary && update.itinerary.length > 0) {
    const itineraryCode = generateItineraryCode(update.itinerary);
    if (itineraryCode) {
      newProperties.push(itineraryCode);
    }
  }

  // Image gallery
  if (update.images && update.images.length > 0) {
    const galleryCode = generateGalleryCode(update.images);
    if (galleryCode) {
      newProperties.push(galleryCode);
    }
  }

  // Highlights (only if scraped has more)
  if (update.highlights && update.highlights.length > 0) {
    const existingHighlights = tourContent.match(/highlights:\s*\[([^\]]*)\]/);
    const existingCount = existingHighlights ? (existingHighlights[1].match(/"/g) || []).length / 2 : 0;
    if (update.highlights.length > existingCount) {
      const highlightsCode = generateHighlightsCode(update.highlights);
      if (highlightsCode) {
        newProperties.push(highlightsCode);
      }
    }
  }

  // Included items
  if (update.included && update.included.length > 0) {
    const includedCode = generateIncludedCode(update.included);
    if (includedCode) {
      newProperties.push(includedCode);
    }
  }

  // Pricing tiers
  if (update.pricingTiers && update.pricingTiers.length > 0) {
    const pricingCode = generatePricingCode(update.pricingTiers);
    if (pricingCode) {
      newProperties.push(pricingCode);
    }
  }

  // Important notes
  if (update.importantNotes && update.importantNotes.length > 0) {
    const notesCode = generateNotesCode(update.importantNotes);
    if (notesCode) {
      newProperties.push(notesCode);
    }
  }

  if (newProperties.length === 0) {
    console.log(`  ⏭️  No new properties for: ${update.slug}`);
    return { content, updated: false };
  }

  // Find position to insert new properties (before the closing brace of affiliateUrl line or end of object)
  // We want to insert after affiliateUrl but before the closing }

  let updatedTourContent = tourContent;

  // Remove existing itinerary if present (we'll replace it)
  const existingItineraryMatch = updatedTourContent.match(/itinerary:\s*\[[\s\S]*?\],\s*(?=\w|$|})/);
  if (existingItineraryMatch) {
    updatedTourContent = updatedTourContent.replace(existingItineraryMatch[0], '');
  }

  // Remove existing imageGallery if present
  const existingGalleryMatch = updatedTourContent.match(/imageGallery:\s*\[[^\]]*\],?\s*/);
  if (existingGalleryMatch) {
    updatedTourContent = updatedTourContent.replace(existingGalleryMatch[0], '');
  }

  // Remove existing pricingTiers if present
  const existingPricingMatch = updatedTourContent.match(/pricingTiers:\s*\[[\s\S]*?\],\s*(?=\w|$|})/);
  if (existingPricingMatch) {
    updatedTourContent = updatedTourContent.replace(existingPricingMatch[0], '');
  }

  // Remove existing included if present
  const existingIncludedMatch = updatedTourContent.match(/included:\s*\[[^\]]*\],?\s*/);
  if (existingIncludedMatch) {
    updatedTourContent = updatedTourContent.replace(existingIncludedMatch[0], '');
  }

  // Remove existing importantNotes if present
  const existingNotesMatch = updatedTourContent.match(/importantNotes:\s*\[[^\]]*\],?\s*/);
  if (existingNotesMatch) {
    updatedTourContent = updatedTourContent.replace(existingNotesMatch[0], '');
  }

  // Find the last property before closing brace
  const lastPropertyMatch = updatedTourContent.match(/(\s*)(affiliateUrl:[^\n]+\n)/);

  if (lastPropertyMatch) {
    const insertPosition = updatedTourContent.indexOf(lastPropertyMatch[0]) + lastPropertyMatch[0].length;
    const beforeInsert = updatedTourContent.substring(0, insertPosition);
    const afterInsert = updatedTourContent.substring(insertPosition);

    // Format new properties with proper indentation
    const formattedProps = newProperties.map(p => '      ' + p).join('\n');

    updatedTourContent = beforeInsert + formattedProps + '\n' + afterInsert;
  } else {
    // Fallback: insert before closing brace
    const closingBraceIndex = updatedTourContent.lastIndexOf('}');
    const formattedProps = newProperties.map(p => '      ' + p).join('\n');

    updatedTourContent =
      updatedTourContent.substring(0, closingBraceIndex) +
      formattedProps + '\n    ' +
      updatedTourContent.substring(closingBraceIndex);
  }

  // Replace the tour in the main content
  const newContent = content.substring(0, boundaries.start) + updatedTourContent + content.substring(boundaries.end);

  console.log(`  ✅ Updated: ${update.slug} (${update.itinerary?.length || 0} days, ${update.images?.length || 0} images)`);

  return { content: newContent, updated: true };
}

// Main function
async function main() {
  console.log('=== Applying Tour Updates ===\n');

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
  let content = fs.readFileSync(TOURS_DATA_FILE, 'utf-8');

  // Create backup
  console.log('Creating backup...');
  fs.writeFileSync(BACKUP_FILE, content);
  console.log(`Backup saved to: ${BACKUP_FILE}\n`);

  // Apply updates
  console.log('Applying updates...');
  let updatedCount = 0;
  let skippedCount = 0;

  for (const update of updates) {
    const result = updateTour(content, update);
    content = result.content;
    if (result.updated) {
      updatedCount++;
    } else {
      skippedCount++;
    }
  }

  // Write updated content
  console.log('\nWriting updated tours-data.ts...');
  fs.writeFileSync(TOURS_DATA_FILE, content);

  console.log('\n=== Summary ===');
  console.log(`Total update files: ${updates.length}`);
  console.log(`Successfully updated: ${updatedCount}`);
  console.log(`Skipped (already enhanced or not found): ${skippedCount}`);
  console.log('\nDone! Run "npm run build" to verify the changes.');
}

main().catch(console.error);
