#!/usr/bin/env node

/**
 * Script to download correct tour images from asiatouradvisor.com
 * This script fetches each tour page and extracts the main tour image
 */

import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'tours');

// Mapping of image filename to source URL
// Format: { outputFilename: affiliateUrl }
const TOUR_IMAGE_MAPPINGS = [
  // Asia Tour Advisor tours with specific URLs
  { filename: 'halong-2d1n-cruise.jpg', url: 'https://www.asiatouradvisor.com/halong-bay-cruises-2-days-1-night/' },
  { filename: 'halong-luxury-cruise.jpg', url: 'https://www.asiatouradvisor.com/halong-bay-overnight-cruise/' },
  { filename: 'mekong-4days.jpg', url: 'https://www.asiatouradvisor.com/mekong-river-4-days/' },
  { filename: 'mekong-3days.jpg', url: 'https://www.asiatouradvisor.com/best-mekong-delta-tours-3-days/' },
  { filename: 'mekong-homestay.jpg', url: 'https://www.asiatouradvisor.com/mekong-homestay-tour-2-days/' },
  { filename: 'central-vietnam-5d.jpg', url: 'https://www.asiatouradvisor.com/cultural-historical-tour-center/' },
  { filename: 'sapa-trekking.jpg', url: 'https://www.asiatouradvisor.com/authentic-sapa-tour-3-nights-2-days/' },
  { filename: 'ninh-binh-day.jpg', url: 'https://www.asiatouradvisor.com/ninh-binh-itinerary/' },
  { filename: 'pu-luong-trek.jpg', url: 'https://www.asiatouradvisor.com/mai-chau-pu-luong-trekking-tours-3-days-2-nights/' },
  { filename: 'lan-ha-2d1n.jpg', url: 'https://www.asiatouradvisor.com/lan-ha-bay-cruises/' },
  { filename: 'northern-vietnam-5d.jpg', url: 'https://www.asiatouradvisor.com/exclusive-journey-of-northern-vietnam/' },
  { filename: 'hanoi-halong-4d.jpg', url: 'https://www.asiatouradvisor.com/hanoi-halong-bay-tour-3-days/' },
  { filename: 'danang-4days.jpg', url: 'https://www.asiatouradvisor.com/da-nang-glimpse-4-days/' },
  { filename: 'phu-quoc-3d.jpg', url: 'https://www.asiatouradvisor.com/phu-quoc-sightseeing-3-days/' },
  { filename: 'phu-quoc-diving-4d.jpg', url: 'https://www.asiatouradvisor.com/diving-fishing-phu-quoc-4-days/' },
  { filename: 'hcm-mekong-4d.jpg', url: 'https://www.asiatouradvisor.com/vietnam-itinerary-for-4-days/' },
  { filename: 'mekong-ben-tre-eco.jpg', url: 'https://www.asiatouradvisor.com/mekong-eco-tour-2-days-trip/' },
  { filename: 'mekong-cycling-2d.jpg', url: 'https://www.asiatouradvisor.com/mekong-delta-tour-with-good-reviews/' },
  { filename: 'ben-tre-day.jpg', url: 'https://www.asiatouradvisor.com/ben-tre-mekong-day-tours/' },
  { filename: 'cu-chi-half-day.jpg', url: 'https://www.asiatouradvisor.com/cu-chi-tunnels/' },
  { filename: 'bai-tu-long-2d1n.jpg', url: 'https://www.asiatouradvisor.com/bai-tu-long-bay-cruises/' },
  { filename: 'sapa-muong-hoa.jpg', url: 'https://www.asiatouradvisor.com/sapa-itinerary-3-days/' },
  { filename: 'hanoi-2days.jpg', url: 'https://www.asiatouradvisor.com/2-days-in-hanoi/' },
  { filename: 'hanoi-3days.jpg', url: 'https://www.asiatouradvisor.com/3-days-in-hanoi/' },
  { filename: 'hanoi-4days.jpg', url: 'https://www.asiatouradvisor.com/4-days-in-hanoi/' },
  { filename: 'hanoi-halong-3d2n.jpg', url: 'https://www.asiatouradvisor.com/hanoi-halong-bay-tour-3-days/' },
  { filename: 'sapa-off-beaten.jpg', url: 'https://www.asiatouradvisor.com/vietnam-itinerary-5-days/' },
  { filename: 'vietnam-6days.jpg', url: 'https://www.asiatouradvisor.com/vietnam-6-day-itinerary/' },
  { filename: 'northern-vietnam-7d.jpg', url: 'https://www.asiatouradvisor.com/best-of-northern-vietnam-7-days/' },
  { filename: 'vietnam-intro-8d.jpg', url: 'https://www.asiatouradvisor.com/vietnam-intro-8-days/' },
  { filename: 'scenic-vietnam-10d.jpg', url: 'https://www.asiatouradvisor.com/scenic-vietnam-10-days/' },
  { filename: 'vietnam-11-days.jpg', url: 'https://www.asiatouradvisor.com/vietnam-11-days-itinerary/' },
  { filename: 'vietnam-12-days.jpg', url: 'https://asiatouradvisor.com/vietnam-itinerary-12-days' },
  { filename: 'vietnam-insight-14d.jpg', url: 'https://www.asiatouradvisor.com/vietnam-insight/' },
  { filename: 'amazing-vietnam-15d.jpg', url: 'https://www.asiatouradvisor.com/amazing-vietnam-15-days/' },
  { filename: 'vietnam-cambodia-15d.jpg', url: 'https://www.asiatouradvisor.com/the-spirit-of-vietnam-and-cambodia-15-days/' },
  { filename: 'vietnam-cambodia-18d.jpg', url: 'https://www.asiatouradvisor.com/endless-beauty-of-vietnam-cambodia/' },
  { filename: 'discover-vietnam-20d.jpg', url: 'https://www.asiatouradvisor.com/discover-vietnam-20-days/' },
  { filename: 'vietnam-cambodia-21d.jpg', url: 'https://www.asiatouradvisor.com/vietnam-cambodia-itinerary-21-days/' },
  { filename: 'vietnam-family-11d.jpg', url: 'https://www.asiatouradvisor.com/vietnam-family-tours/' },
  { filename: 'vietnam-beach-family-14d.jpg', url: 'https://www.asiatouradvisor.com/vietnam-beach-family/' },
  { filename: 'vietnam-luxury-10d.jpg', url: 'https://www.asiatouradvisor.com/vietnam-luxury-tours/' },
  { filename: 'hanoi-sapa-6d.jpg', url: 'https://www.asiatouradvisor.com/hanoi-and-sapa-itinerary-6-days/' },
  { filename: 'essential-vietnam-9d.jpg', url: 'https://www.asiatouradvisor.com/essential-vietnam-9-days/' },
  { filename: 'essence-vietnam-10d.jpg', url: 'https://www.asiatouradvisor.com/simply-vietnam-10-days/' },
  { filename: 'central-vietnam-7d.jpg', url: 'https://www.asiatouradvisor.com/best-central-vietnam-7-days/' },
  { filename: 'discovery-northeast-9d.jpg', url: 'https://www.asiatouradvisor.com/vietnam-tours/package-tours/' },
  { filename: 'southern-vietnam-7d.jpg', url: 'https://www.asiatouradvisor.com/south-vietnam-tours/' },
  { filename: 'signatures-vietnam-14d.jpg', url: 'https://www.asiatouradvisor.com/vietnam-tours/package-tours/' },
  { filename: 'cultural-heritage-12d.jpg', url: 'https://www.asiatouradvisor.com/vietnam-tours/package-tours/' },
  { filename: 'natural-wonders-16d.jpg', url: 'https://www.asiatouradvisor.com/vietnam-tours/natural-wonders-of-vietnam/' },
  { filename: 'perfect-vietnam-7d.jpg', url: 'https://www.asiatouradvisor.com/7-days-vietnam-itinerary/' },
  { filename: 'vietnam-discovery-8d.jpg', url: 'https://www.asiatouradvisor.com/vietnam-8-days-itinerary/' },
  { filename: 'hanoi-ninh-binh-halong-5d.jpg', url: 'https://www.asiatouradvisor.com/vietnam-itinerary-5-days/' },
  { filename: 'north-vietnam-adventure-7d.jpg', url: 'https://www.asiatouradvisor.com/best-of-northern-vietnam-7-days/' },
  { filename: 'nature-north-vietnam-8d.jpg', url: 'https://www.asiatouradvisor.com/vietnam-tours/package-tours/' },
  { filename: 'highlights-vietnam-10d.jpg', url: 'https://www.asiatouradvisor.com/vietnam-tours/package-tours/' },
  { filename: 'cultural-odyssey-10d.jpg', url: 'https://www.asiatouradvisor.com/vietnam-tours/package-tours/' },
  { filename: 'best-vietnam-13d.jpg', url: 'https://www.asiatouradvisor.com/vietnam-tours/best-vietnam-tour-13days/' },
  { filename: 'discovery-north-east-13d.jpg', url: 'https://www.asiatouradvisor.com/vietnam-tours/ha-giang-tours/' },
  // VietnamTourBooking tours (no asiatouradvisor URL - use generic Vietnam images)
  { filename: 'halong-day-trip.jpg', url: 'https://www.asiatouradvisor.com/halong-bay-cruises/' },
  { filename: 'serenity-cruise.jpg', url: 'https://www.asiatouradvisor.com/halong-bay-cruises-2-days-1-night/' },
  { filename: 'lan-ha-luxury.jpg', url: 'https://www.asiatouradvisor.com/lan-ha-bay-cruises/' },
  { filename: 'renea-cruise.jpg', url: 'https://www.asiatouradvisor.com/halong-bay-cruises-2-days-1-night/' },
  { filename: 'mekong-eyes.jpg', url: 'https://www.asiatouradvisor.com/mekong-river-cruises/' },
  { filename: 'mekong-3day.jpg', url: 'https://www.asiatouradvisor.com/best-mekong-delta-tours-3-days/' },
  { filename: 'gecko-eyes.jpg', url: 'https://www.asiatouradvisor.com/mekong-river-cruises/' },
  { filename: 'cambodia-vietnam.jpg', url: 'https://www.asiatouradvisor.com/the-spirit-of-vietnam-and-cambodia-15-days/' },
];

// Helper to fetch a URL with redirects
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
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
          redirectUrl = `${urlObj.protocol}//${urlObj.host}${redirectUrl}`;
        }
        fetchUrl(redirectUrl).then(resolve).catch(reject);
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

// Helper to download image
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    const request = protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
        'Referer': 'https://www.asiatouradvisor.com/',
      }
    }, (response) => {
      // Handle redirects
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        let redirectUrl = response.headers.location;
        if (!redirectUrl.startsWith('http')) {
          const urlObj = new URL(url);
          redirectUrl = `${urlObj.protocol}//${urlObj.host}${redirectUrl}`;
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

// Extract main image from tour page HTML
function extractMainImage(html, pageUrl) {
  // Try different patterns to find the main tour image
  const patterns = [
    // Open Graph image (usually the best quality)
    /<meta\s+property="og:image"\s+content="([^"]+)"/i,
    /<meta\s+content="([^"]+)"\s+property="og:image"/i,
    // Twitter image
    /<meta\s+name="twitter:image"\s+content="([^"]+)"/i,
    // Main tour image patterns
    /class="[^"]*tour-image[^"]*"[^>]*src="([^"]+)"/i,
    /class="[^"]*featured-image[^"]*"[^>]*src="([^"]+)"/i,
    /class="[^"]*hero-image[^"]*"[^>]*src="([^"]+)"/i,
    // Generic large images
    /<img[^>]+src="([^"]+)"[^>]+(?:width|height)=["']?(?:800|1000|1200|1920)/i,
    // WordPress featured images
    /wp-post-image[^>]*src="([^"]+)"/i,
    // Any large jpg/png in the content
    /src="(https?:\/\/[^"]+(?:tour|travel|vietnam|halong|mekong|sapa|hanoi)[^"]*\.(?:jpg|jpeg|png|webp))"/i,
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
  const outputPath = path.join(OUTPUT_DIR, tour.filename);

  console.log(`\n[${index + 1}/${total}] Processing: ${tour.filename}`);
  console.log(`    URL: ${tour.url}`);

  try {
    // Fetch the tour page
    console.log('    Fetching tour page...');
    const html = await fetchUrl(tour.url);

    // Extract the main image
    const imageUrl = extractMainImage(html, tour.url);

    if (!imageUrl) {
      console.log('    ❌ Could not find main image on page');
      return { filename: tour.filename, success: false, error: 'No image found' };
    }

    console.log(`    Found image: ${imageUrl.substring(0, 80)}...`);

    // Download the image
    console.log('    Downloading image...');
    await downloadImage(imageUrl, outputPath);

    // Check file size
    const stats = fs.statSync(outputPath);
    if (stats.size < 5000) {
      console.log(`    ⚠️ Warning: Image is very small (${stats.size} bytes)`);
    } else {
      console.log(`    ✅ Downloaded successfully (${Math.round(stats.size / 1024)}KB)`);
    }

    return { filename: tour.filename, success: true, imageUrl };
  } catch (error) {
    console.log(`    ❌ Error: ${error.message}`);
    return { filename: tour.filename, success: false, error: error.message };
  }
}

// Main function
async function main() {
  console.log('===========================================');
  console.log('  Tour Image Downloader for AsiaTourAdvisor');
  console.log('===========================================\n');

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const results = {
    success: [],
    failed: []
  };

  // Process tours sequentially to avoid overwhelming the server
  for (let i = 0; i < TOUR_IMAGE_MAPPINGS.length; i++) {
    const result = await processTour(TOUR_IMAGE_MAPPINGS[i], i, TOUR_IMAGE_MAPPINGS.length);

    if (result.success) {
      results.success.push(result);
    } else {
      results.failed.push(result);
    }

    // Small delay between requests to be polite
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Summary
  console.log('\n\n===========================================');
  console.log('  SUMMARY');
  console.log('===========================================');
  console.log(`✅ Successfully downloaded: ${results.success.length}`);
  console.log(`❌ Failed: ${results.failed.length}`);

  if (results.failed.length > 0) {
    console.log('\nFailed images:');
    results.failed.forEach(f => {
      console.log(`  - ${f.filename}: ${f.error}`);
    });
  }

  console.log('\nDone!');
}

main().catch(console.error);
