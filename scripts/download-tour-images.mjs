#!/usr/bin/env node
/**
 * Script to download and process tour images from Wikimedia Commons
 * All images are CC licensed and appropriate for commercial use
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Output dimensions for tour card images (16:10 aspect ratio)
const IMAGE_WIDTH = 800;
const IMAGE_HEIGHT = 500;

// Wikimedia Commons direct image URLs - all CC licensed
const IMAGES_TO_DOWNLOAD = [
  // Halong Bay images
  {
    filename: 'halong-2d1n-cruise.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Halong_Bay_2.jpg/1280px-Halong_Bay_2.jpg'
  },
  {
    filename: 'halong-luxury-cruise.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Halong_Bay%2C_Vietnam_%2810502520675%29.jpg/1280px-Halong_Bay%2C_Vietnam_%2810502520675%29.jpg'
  },
  {
    filename: 'hanoi-halong-4d.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Halong_Bay_from_above.jpg/1280px-Halong_Bay_from_above.jpg'
  },
  {
    filename: 'hanoi-halong-3d2n.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/H%E1%BA%A1_Long_Bay%2C_Vietnam_%28Unsplash%29.jpg/1280px-H%E1%BA%A1_Long_Bay%2C_Vietnam_%28Unsplash%29.jpg'
  },
  {
    filename: 'lan-ha-2d1n.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Lan_H%E1%BA%A1_Bay%2C_Vietnam.jpg/1280px-Lan_H%E1%BA%A1_Bay%2C_Vietnam.jpg'
  },
  {
    filename: 'bai-tu-long-2d1n.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Ha_Long_Bay%2C_Vietnam.jpg/1280px-Ha_Long_Bay%2C_Vietnam.jpg'
  },

  // Mekong Delta images
  {
    filename: 'mekong-4days.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Mekong_River_at_Tr%E1%BA%A5n_%C4%90%E1%BB%A9c%2C_An_Giang%2C_Vietnam.jpg/1280px-Mekong_River_at_Tr%E1%BA%A5n_%C4%90%E1%BB%A9c%2C_An_Giang%2C_Vietnam.jpg'
  },
  {
    filename: 'mekong-3days.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Mekong_Delta_in_Vietnam.jpg/1280px-Mekong_Delta_in_Vietnam.jpg'
  },
  {
    filename: 'mekong-homestay.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Cai_Be_floating_market.jpg/1280px-Cai_Be_floating_market.jpg'
  },
  {
    filename: 'mekong-ben-tre-eco.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Ben_Tre_coconut_trees_Vietnam.jpg/1280px-Ben_Tre_coconut_trees_Vietnam.jpg'
  },
  {
    filename: 'mekong-cycling-2d.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Rice_paddies_in_Mekong_Delta%2C_Vietnam.jpg/1280px-Rice_paddies_in_Mekong_Delta%2C_Vietnam.jpg'
  },
  {
    filename: 'ben-tre-day.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Floating_market_-_C%E1%BA%A7n_Th%C6%A1_-_Vietnam.jpg/1280px-Floating_market_-_C%E1%BA%A7n_Th%C6%A1_-_Vietnam.jpg'
  },
  {
    filename: 'hcm-mekong-4d.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Ho_Chi_Minh_City_Skyline_%28cropped%29.jpg/1280px-Ho_Chi_Minh_City_Skyline_%28cropped%29.jpg'
  },

  // Sapa and Northern Vietnam
  {
    filename: 'sapa-trekking.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Sapa_rice_terraces_%28Unsplash%29.jpg/1280px-Sapa_rice_terraces_%28Unsplash%29.jpg'
  },
  {
    filename: 'sapa-muong-hoa.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Mu_Cang_Chai_Rice_Terraces.jpg/1280px-Mu_Cang_Chai_Rice_Terraces.jpg'
  },
  {
    filename: 'sapa-off-beaten.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Sa_Pa%2C_Vietnam_%28Unsplash%29.jpg/1280px-Sa_Pa%2C_Vietnam_%28Unsplash%29.jpg'
  },
  {
    filename: 'northern-vietnam-5d.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Hanoi_Temple_of_Literature.jpg/1280px-Hanoi_Temple_of_Literature.jpg'
  },

  // Hanoi tours
  {
    filename: 'hanoi-2days.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Hanoi_Old_Quarter_street_scene.jpg/1280px-Hanoi_Old_Quarter_street_scene.jpg'
  },
  {
    filename: 'hanoi-3days.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Ho_Chi_Minh_Mausoleum.jpg/1280px-Ho_Chi_Minh_Mausoleum.jpg'
  },
  {
    filename: 'hanoi-4days.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Hoan_Kiem_Lake%2C_Hanoi%2C_Vietnam.jpg/1280px-Hoan_Kiem_Lake%2C_Hanoi%2C_Vietnam.jpg'
  },

  // Central Vietnam
  {
    filename: 'central-vietnam-5d.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Hue_Imperial_City_Vietnam.jpg/1280px-Hue_Imperial_City_Vietnam.jpg'
  },
  {
    filename: 'danang-4days.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Dragon_Bridge%2C_Da_Nang.jpg/1280px-Dragon_Bridge%2C_Da_Nang.jpg'
  },

  // Ninh Binh / Trang An
  {
    filename: 'ninh-binh-day.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Trang_An_Landscape_Complex.jpg/1280px-Trang_An_Landscape_Complex.jpg'
  },

  // Pu Luong
  {
    filename: 'pu-luong-trek.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Mai_Chau_Valley_Vietnam.jpg/1280px-Mai_Chau_Valley_Vietnam.jpg'
  },

  // Phu Quoc
  {
    filename: 'phu-quoc-3d.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Phu_Quoc_Island_Vietnam.jpg/1280px-Phu_Quoc_Island_Vietnam.jpg'
  },
  {
    filename: 'phu-quoc-diving-4d.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Vietnam_underwater_coral.jpg/1280px-Vietnam_underwater_coral.jpg'
  },

  // Cu Chi
  {
    filename: 'cu-chi-half-day.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Cu_Chi_tunnels_Vietnam.jpg/1280px-Cu_Chi_tunnels_Vietnam.jpg'
  },
];

const TOURS_DIR = path.join(__dirname, '..', 'public', 'tours');

// Download image from URL with redirect handling
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const makeRequest = (reqUrl, redirectCount = 0) => {
      if (redirectCount > 5) {
        reject(new Error('Too many redirects'));
        return;
      }

      const protocol = reqUrl.startsWith('https:') ? https : http;

      protocol.get(reqUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'image/*,*/*;q=0.8'
        }
      }, (response) => {
        // Handle redirects
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          let redirectUrl = response.headers.location;
          if (!redirectUrl.startsWith('http')) {
            const urlObj = new URL(reqUrl);
            redirectUrl = `${urlObj.protocol}//${urlObj.host}${redirectUrl}`;
          }
          makeRequest(redirectUrl, redirectCount + 1);
          return;
        }

        if (response.statusCode !== 200) {
          reject(new Error(`HTTP ${response.statusCode}`));
          return;
        }

        const chunks = [];
        response.on('data', (chunk) => chunks.push(chunk));
        response.on('end', () => resolve(Buffer.concat(chunks)));
        response.on('error', reject);
      }).on('error', reject);
    };

    makeRequest(url);
  });
}

// Process and save image
async function processAndSaveImage(buffer, outputPath) {
  await sharp(buffer)
    .resize(IMAGE_WIDTH, IMAGE_HEIGHT, {
      fit: 'cover',
      position: 'center',
    })
    .jpeg({
      quality: 85,
      progressive: true,
    })
    .toFile(outputPath);
}

async function main() {
  console.log('Starting tour image download from Wikimedia Commons...\n');

  // Ensure tours directory exists
  if (!fs.existsSync(TOURS_DIR)) {
    fs.mkdirSync(TOURS_DIR, { recursive: true });
  }

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const image of IMAGES_TO_DOWNLOAD) {
    const outputPath = path.join(TOURS_DIR, image.filename);

    // Skip if image already exists
    if (fs.existsSync(outputPath)) {
      console.log(`[SKIP] ${image.filename} - already exists`);
      skipCount++;
      continue;
    }

    try {
      console.log(`[DOWNLOAD] ${image.filename}...`);

      const buffer = await downloadImage(image.url);

      if (buffer.length < 1000) {
        throw new Error('Image too small, likely an error page');
      }

      console.log(`[PROCESS] Resizing to ${IMAGE_WIDTH}x${IMAGE_HEIGHT}...`);
      await processAndSaveImage(buffer, outputPath);

      const stats = fs.statSync(outputPath);
      console.log(`[SUCCESS] ${image.filename} (${Math.round(stats.size / 1024)}KB)\n`);
      successCount++;

      // Small delay between downloads
      await new Promise(resolve => setTimeout(resolve, 200));

    } catch (error) {
      console.error(`[ERROR] ${image.filename} - ${error.message}\n`);
      errorCount++;
    }
  }

  console.log('\n========================================');
  console.log(`Download complete!`);
  console.log(`  Success: ${successCount}`);
  console.log(`  Skipped: ${skipCount}`);
  console.log(`  Errors:  ${errorCount}`);
  console.log('========================================\n');

  // List all images in the tours directory
  console.log('Current tour images:');
  const files = fs.readdirSync(TOURS_DIR);
  files.forEach(file => {
    const stats = fs.statSync(path.join(TOURS_DIR, file));
    console.log(`  - ${file} (${Math.round(stats.size / 1024)}KB)`);
  });
}

main().catch(console.error);
