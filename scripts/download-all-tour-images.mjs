#!/usr/bin/env node

/**
 * Script to download tour images from affiliate URLs
 *
 * This script:
 * 1. Reads all tours from tours-data.ts
 * 2. Fetches og:image from each tour's affiliateUrl
 * 3. Downloads the image with a unique filename based on tour.id
 * 4. Updates tours-data.ts with the new imageUrl values
 *
 * Sources:
 * - 192 tours from bestpricetravel.com
 * - 60 tours from asiatouradvisor.com
 * - 8 tours from internal /cruise/ URLs (skip these - keep existing images)
 */

import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'tours');
const TOURS_DATA_FILE = path.join(__dirname, '..', 'src', 'lib', 'tours-data.ts');

// Parse tours from tours-data.ts
function parseTours() {
  const content = fs.readFileSync(TOURS_DATA_FILE, 'utf-8');
  const tours = [];

  // Match each tour object with id and affiliateUrl
  const tourRegex = /\{\s*id:\s*"([^"]+)"[\s\S]*?affiliateUrl:\s*"([^"]+)"/g;
  let match;

  while ((match = tourRegex.exec(content)) !== null) {
    tours.push({
      id: match[1],
      affiliateUrl: match[2]
    });
  }

  return tours;
}

// Fetch URL with redirects and User-Agent
function fetchUrl(url, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    if (maxRedirects <= 0) {
      reject(new Error('Too many redirects'));
      return;
    }

    const protocol = url.startsWith('https') ? https : http;

    const request = protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      }
    }, (response) => {
      // Handle redirects
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        let redirectUrl = response.headers.location;
        if (!redirectUrl.startsWith('http')) {
          const urlObj = new URL(url);
          redirectUrl = redirectUrl.startsWith('/')
            ? `${urlObj.protocol}//${urlObj.host}${redirectUrl}`
            : `${urlObj.protocol}//${urlObj.host}/${redirectUrl}`;
        }
        fetchUrl(redirectUrl, maxRedirects - 1).then(resolve).catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }

      let data = '';
      response.on('data', chunk => data += chunk);
      response.on('end', () => resolve(data));
      response.on('error', reject);
    });

    request.on('error', reject);
    request.setTimeout(30000, () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

// Download image to file
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    const request = protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
        'Referer': url.includes('bestpricetravel') ? 'https://www.bestpricetravel.com/' : 'https://www.asiatouradvisor.com/',
      }
    }, (response) => {
      // Handle redirects
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        let redirectUrl = response.headers.location;
        if (!redirectUrl.startsWith('http')) {
          const urlObj = new URL(url);
          redirectUrl = redirectUrl.startsWith('/')
            ? `${urlObj.protocol}//${urlObj.host}${redirectUrl}`
            : `${urlObj.protocol}//${urlObj.host}/${redirectUrl}`;
        }
        downloadImage(redirectUrl, filepath).then(resolve).catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }

      const file = fs.createWriteStream(filepath);
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
      file.on('error', (err) => {
        fs.unlink(filepath, () => {}); // Delete partial file
        reject(err);
      });
    });

    request.on('error', reject);
    request.setTimeout(60000, () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

// Extract og:image from HTML
function extractOgImage(html, pageUrl) {
  const patterns = [
    // Open Graph image (primary)
    /<meta\s+property="og:image"\s+content="([^"]+)"/i,
    /<meta\s+content="([^"]+)"\s+property="og:image"/i,
    // Twitter image
    /<meta\s+name="twitter:image"\s+content="([^"]+)"/i,
    // Main content images
    /class="[^"]*tour-image[^"]*"[^>]*src="([^"]+)"/i,
    /class="[^"]*featured-image[^"]*"[^>]*src="([^"]+)"/i,
    /class="[^"]*hero-image[^"]*"[^>]*src="([^"]+)"/i,
    // WordPress featured images
    /wp-post-image[^>]*src="([^"]+)"/i,
    // Large images in main content
    /<img[^>]+src="([^"]+)"[^>]+(?:width|height)=["']?(?:800|1000|1200|1920)/i,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match && match[1]) {
      let imageUrl = match[1];
      // Make absolute URL if relative
      if (!imageUrl.startsWith('http')) {
        const urlObj = new URL(pageUrl);
        imageUrl = imageUrl.startsWith('/')
          ? `${urlObj.protocol}//${urlObj.host}${imageUrl}`
          : `${urlObj.protocol}//${urlObj.host}/${imageUrl}`;
      }
      return imageUrl;
    }
  }

  return null;
}

// Process a single tour
async function processTour(tour, index, total) {
  const outputFilename = `${tour.id}.jpg`;
  const outputPath = path.join(OUTPUT_DIR, outputFilename);

  console.log(`\n[${index + 1}/${total}] Processing: ${tour.id}`);
  console.log(`    URL: ${tour.affiliateUrl}`);

  // Skip internal /cruise/ URLs - keep existing images
  if (tour.affiliateUrl.startsWith('/cruise/')) {
    console.log('    ⏭️  Skipping internal URL (keeping existing image)');
    return { id: tour.id, success: true, skipped: true };
  }

  try {
    // Fetch the tour page
    console.log('    Fetching tour page...');
    const html = await fetchUrl(tour.affiliateUrl);

    // Extract og:image
    const imageUrl = extractOgImage(html, tour.affiliateUrl);

    if (!imageUrl) {
      console.log('    ❌ Could not find og:image on page');
      return { id: tour.id, success: false, error: 'No og:image found' };
    }

    console.log(`    Found image: ${imageUrl.substring(0, 70)}...`);

    // Download the image
    console.log('    Downloading image...');
    await downloadImage(imageUrl, outputPath);

    // Check file size
    const stats = fs.statSync(outputPath);
    if (stats.size < 5000) {
      console.log(`    ⚠️ Warning: Image is very small (${stats.size} bytes)`);
      return { id: tour.id, success: false, error: `Small image (${stats.size} bytes)` };
    }

    console.log(`    ✅ Downloaded successfully (${Math.round(stats.size / 1024)}KB)`);
    return { id: tour.id, success: true, imageUrl, filename: outputFilename };
  } catch (error) {
    console.log(`    ❌ Error: ${error.message}`);
    return { id: tour.id, success: false, error: error.message };
  }
}

// Update tours-data.ts with new imageUrl values
function updateToursData(results) {
  let content = fs.readFileSync(TOURS_DATA_FILE, 'utf-8');
  let updatedCount = 0;

  for (const result of results) {
    if (result.success && !result.skipped && result.filename) {
      // Find and replace imageUrl for this tour
      const pattern = new RegExp(
        `(\\{\\s*id:\\s*"${result.id}"[\\s\\S]*?imageUrl:\\s*")([^"]+)(")`,
        'g'
      );
      const newContent = content.replace(pattern, `$1/tours/${result.filename}$3`);
      if (newContent !== content) {
        content = newContent;
        updatedCount++;
      }
    }
  }

  if (updatedCount > 0) {
    fs.writeFileSync(TOURS_DATA_FILE, content);
    console.log(`\n✅ Updated ${updatedCount} imageUrl values in tours-data.ts`);
  }

  return updatedCount;
}

// Main function
async function main() {
  console.log('===========================================');
  console.log('  Tour Image Downloader');
  console.log('  Sources: bestpricetravel.com, asiatouradvisor.com');
  console.log('===========================================\n');

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Parse tours
  const tours = parseTours();
  console.log(`Found ${tours.length} tours to process\n`);

  const results = {
    success: [],
    failed: [],
    skipped: []
  };

  // Process tours sequentially
  for (let i = 0; i < tours.length; i++) {
    const result = await processTour(tours[i], i, tours.length);

    if (result.skipped) {
      results.skipped.push(result);
    } else if (result.success) {
      results.success.push(result);
    } else {
      results.failed.push(result);
    }

    // Small delay between requests to be polite
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // Update tours-data.ts
  console.log('\n===========================================');
  console.log('  Updating tours-data.ts');
  console.log('===========================================');
  updateToursData(results.success);

  // Summary
  console.log('\n===========================================');
  console.log('  SUMMARY');
  console.log('===========================================');
  console.log(`✅ Successfully downloaded: ${results.success.length}`);
  console.log(`⏭️  Skipped (internal URLs): ${results.skipped.length}`);
  console.log(`❌ Failed: ${results.failed.length}`);

  if (results.failed.length > 0) {
    console.log('\nFailed tours:');
    results.failed.forEach(f => {
      console.log(`  - ${f.id}: ${f.error}`);
    });
  }

  console.log('\nDone!');
}

main().catch(console.error);
