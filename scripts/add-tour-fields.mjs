/**
 * Script to add new fields to tour data
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toursDataPath = path.join(__dirname, '../src/lib/tours-data.ts');

let content = fs.readFileSync(toursDataPath, 'utf-8');

const locationToStartCity = {
  'halong bay': 'Hanoi',
  'lan ha bay': 'Hanoi',
  'bai tu long bay': 'Hanoi',
  'mekong delta': 'Ho Chi Minh City',
  'mekong delta - con dao': 'Ho Chi Minh City',
  'phnom penh to ho chi minh city': 'Ho Chi Minh City',
  'sapa': 'Hanoi',
  'ninh binh': 'Hanoi',
  'pu luong - mai chau': 'Hanoi',
  'hanoi - bac son - halong bay': 'Hanoi',
  'hanoi - halong bay': 'Hanoi',
  'hue - hoi an': 'Da Nang',
  'hanoi': 'Hanoi',
  'ho chi minh city': 'Ho Chi Minh City',
  'da nang': 'Da Nang',
  'hoi an': 'Da Nang',
  'hue': 'Da Nang',
  'phu quoc': 'Ho Chi Minh City',
  'nha trang': 'Nha Trang',
  'cu chi': 'Ho Chi Minh City',
  'can tho': 'Ho Chi Minh City',
  'ben tre': 'Ho Chi Minh City',
  'multiple cities': 'Hanoi',
};

const locationToDestinations = {
  'halong bay': ['Halong Bay'],
  'lan ha bay': ['Lan Ha Bay'],
  'bai tu long bay': ['Bai Tu Long Bay'],
  'mekong delta': ['Mekong Delta', 'Can Tho', 'Ben Tre'],
  'mekong delta - con dao': ['Mekong Delta'],
  'phnom penh to ho chi minh city': ['Cambodia', 'Mekong Delta'],
  'sapa': ['Sapa'],
  'ninh binh': ['Ninh Binh'],
  'pu luong - mai chau': ['Pu Luong', 'Mai Chau'],
  'hanoi - bac son - halong bay': ['Halong Bay', 'Ninh Binh'],
  'hanoi - halong bay': ['Halong Bay'],
  'hue - hoi an': ['Hue', 'Hoi An', 'Da Nang'],
  'hanoi': ['Halong Bay'],
  'ho chi minh city': ['Mekong Delta'],
  'da nang': ['Da Nang', 'Hoi An'],
  'hoi an': ['Hoi An'],
  'hue': ['Hue'],
  'phu quoc': ['Phu Quoc'],
  'nha trang': ['Nha Trang'],
  'cu chi': ['Cu Chi'],
  'can tho': ['Can Tho', 'Mekong Delta'],
  'ben tre': ['Ben Tre', 'Mekong Delta'],
  'multiple cities': ['Halong Bay', 'Ninh Binh', 'Sapa'],
};

const categoryToActivities = {
  'cruise': ['cruise', 'kayaking', 'cave-exploration'],
  'day-trip': ['nature', 'cultural', 'photography'],
  'multi-day': ['cultural', 'nature', 'trekking'],
};

function getDurationHours(duration) {
  const d = duration.toLowerCase();
  const dayMatch = d.match(/(\d+)\s*day/);
  if (dayMatch) {
    const days = parseInt(dayMatch[1]);
    if (days === 1) return 10;
    return days * 24;
  }
  const hourMatch = d.match(/(\d+)\s*hour/);
  if (hourMatch) {
    return parseInt(hourMatch[1]);
  }
  return 8;
}

const lines = content.split('\n');
const result = [];
let tourInfo = { location: '', category: '', duration: '' };
let count = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // Track tour info
  const locationMatch = line.match(/location: "([^"]+)"/);
  if (locationMatch) {
    tourInfo.location = locationMatch[1];
  }

  const categoryMatch = line.match(/category: "(cruise|day-trip|multi-day)"/);
  if (categoryMatch) {
    tourInfo.category = categoryMatch[1];
  }

  const durationMatch = line.match(/duration: "([^"]+)"/);
  if (durationMatch) {
    tourInfo.duration = durationMatch[1];
  }

  // Check if this is the closing brace of a tour object
  // Pattern: "  }," at start of line (with possible trailing comma)
  if (/^  \},?$/.test(line) && tourInfo.location) {
    // Check previous line for affiliateUrl or group fields
    const prevLine = lines[i - 1];

    if (prevLine && (
      prevLine.includes('affiliateUrl:') ||
      prevLine.includes('groupId:') ||
      prevLine.includes('groupName:') ||
      prevLine.includes('variationLabel:')
    )) {
      const locLower = tourInfo.location.toLowerCase();
      const startCity = locationToStartCity[locLower] || 'Hanoi';
      const destinations = locationToDestinations[locLower] || ['Halong Bay'];
      const activities = categoryToActivities[tourInfo.category] || ['cultural', 'nature'];
      const durationHours = getDurationHours(tourInfo.duration);

      // Insert new fields before the closing brace
      result.push(`    durationHours: ${durationHours},`);
      result.push(`    startCity: "${startCity}",`);
      result.push(`    destinations: [${destinations.map(d => `"${d}"`).join(', ')}],`);
      result.push(`    activities: [${activities.map(a => `"${a}"`).join(', ')}],`);
      count++;
    }

    // Reset tour info after closing brace
    tourInfo = { location: '', category: '', duration: '' };
  }

  result.push(line);
}

console.log(`Added fields to ${count} tours`);

fs.writeFileSync(toursDataPath, result.join('\n'), 'utf-8');
console.log('File saved!');
