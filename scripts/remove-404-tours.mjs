#!/usr/bin/env node

/**
 * Script to remove tours with 404 errors from tours-data.ts
 * These are tours whose affiliate URLs no longer exist
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOURS_DATA_FILE = path.join(__dirname, '..', 'src', 'lib', 'tours-data.ts');

// Tours that returned 404 errors
const failedTours = [
  'halong-bay-2d1n-cruise',
  'lan-ha-bay-2d1n',
  'bai-tu-long-2d1n',
  'halong-luxury-cruise-2d1n',
  'lan-ha-luxury-cruise',
  'renea-cruises',
  'serenity-cruises-3d2n',
  'ambassador-cruise',
  'mon-cheri-cruise',
  'catherine-cruise',
  'lyra-grandeur-cruise',
  'heritage-cruise',
  'gecko-eyes-cruise',
  'serenity-mekong',
  'mekong-eyes-cruise',
  'phu-quoc-island-escape-4d',
  'saigon-street-food-night-tour',
  'dalat-highlands-3d',
  'saigon-city-highlights',
  'vietnam-cambodia-highlights-12d',
  'angkor-wat-extension-3d',
  'mekong-to-angkor-7d',
  'best-indochina-15d',
  'vietnam-luxury-train-8d',
  'vietnam-eco-adventure-10d',
  'vietnam-rural-immersion-7d',
  'saigon-danang-golf-8d',
  'danang-golf-holiday-5d',
  'nha-trang-golf-coastal-5d',
  'phu-quoc-golf-seaside-4d',
  'majestic-vietnam-beach-17d',
  'hoi-an-beach-break-7d',
  'saigon-mui-ne-beach-7d',
  'nha-trang-discovery-beach-6d',
  'luxury-beach-wellness-14d',
  'vietnam-world-heritage-15d',
  'vietnam-highlights-north-south-12d',
  'real-taste-vietnam-13d',
  'vietnam-gentle-pace-10d',
  'vietnam-essential-10d',
  'vietnam-classic-8d',
  'vietnam-discovery-14d',
  'vietnam-express-6d',
  'vietnam-complete-18d',
  'hanoi-food-walking-tour',
  'mekong-delta-day-trip',
  'ninh-binh-day-trip',
  'perfume-pagoda-day-trip',
  'cu-chi-tunnels-half-day',
  'my-son-sanctuary-half-day',
  'vietnam-adventure-biking-trekking-12d',
  'vietnam-bike-north-south-16d',
  'vietnam-land-rail-water-12d',
  'family-easy-adventure-10d',
  'ha-giang-motorbike-loop-5d',
  'vietnam-romantic-escape-10d',
  'honeymoon-vietnam-beach-12d',
  'couples-hoi-an-beach-5d',
  'saigon-phu-quoc-honeymoon-7d',
  'halong-bay-romantic-cruise-3d',
  'vietnam-budget-backpacker-12d',
  'north-vietnam-budget-6d',
  'south-vietnam-budget-5d',
  'central-vietnam-budget-4d',
  'vietnam-small-group-classic-10d',
  'small-group-north-vietnam-7d',
  'small-group-mekong-adventure-3d',
  'small-group-central-highlands-5d',
  'small-group-hoi-an-experience-4d',
  'vietnam-luxury-signature-12d',
  'luxury-halong-heritage-cruise-3d',
  'luxury-northern-escape-6d',
  'luxury-central-vietnam-5d',
  'vietnam-photography-15d',
  'sapa-rice-terrace-photo-4d',
  'hoi-an-lantern-photo-2d',
  'mekong-delta-photo-3d',
  'halong-bay-photo-cruise-2d',
  'vietnam-culinary-journey-12d',
  'hanoi-food-masterclass-3d',
  'hoi-an-cooking-farmstay-2d',
  'saigon-street-food-master-2d',
  'mekong-cooking-homestay-3d',
  'vietnam-war-history-10d',
  'dmz-battlefield-2d',
  'cu-chi-war-remnants-full-day',
  'hanoi-war-sites-full-day',
  'saigon-war-history-half-day',
  'vietnam-tet-festival-10d',
  'hoi-an-lantern-festival-3d',
  'sapa-spring-festival-5d',
  'mid-autumn-festival-3d',
  'hue-festival-arts-5d',
  'dalat-highlands-5d',
  'dalat-canyoning-2d',
  'dalat-coffee-wine-2d',
  'dalat-easy-escape-3d',
  'dalat-day-trip',
  'nha-trang-beach-4d',
  'nha-trang-diving-3d',
  'mui-ne-beach-kite-4d',
  'mui-ne-sand-dunes-2d',
  'nha-trang-mui-ne-combo-6d',
  'northern-ethnic-minorities-10d',
  'bac-ha-market-weekend-3d',
  'ha-giang-loop-5d',
  'mai-chau-homestay-2d',
  'pu-luong-ethnic-trek-4d',
  'vietnam-train-journey-14d',
  'vietnam-wellness-retreat-7d',
  'vietnam-volunteering-14d',
  'vietnam-birdwatching-10d',
  'vietnam-craft-artisan-8d',
];

function removeTours() {
  let content = fs.readFileSync(TOURS_DATA_FILE, 'utf-8');
  let removedCount = 0;

  for (const tourId of failedTours) {
    // Match the entire tour object from { id: "tourId" to the next },
    // The pattern matches the tour object including all its content
    const pattern = new RegExp(
      `\\s*\\{\\s*id:\\s*"${tourId}"[\\s\\S]*?\\},?\\s*(?=\\{\\s*id:|\\]\\s*;)`,
      'g'
    );

    const newContent = content.replace(pattern, '');
    if (newContent !== content) {
      content = newContent;
      removedCount++;
      console.log(`Removed: ${tourId}`);
    }
  }

  if (removedCount > 0) {
    // Clean up any double commas or trailing commas before ]
    content = content.replace(/,\s*,/g, ',');
    content = content.replace(/,\s*\]/g, ']');

    fs.writeFileSync(TOURS_DATA_FILE, content);
    console.log(`\n✅ Removed ${removedCount} tours from tours-data.ts`);
  } else {
    console.log('No tours found to remove');
  }

  return removedCount;
}

console.log('===========================================');
console.log('  Removing 404 Tours from tours-data.ts');
console.log('===========================================\n');

const removed = removeTours();
console.log(`\nTotal removed: ${removed} tours`);
