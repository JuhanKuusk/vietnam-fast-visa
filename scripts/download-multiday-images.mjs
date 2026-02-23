#!/usr/bin/env node
/**
 * Script to download images for multi-day tours from Wikimedia Commons
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGE_WIDTH = 800;
const IMAGE_HEIGHT = 500;

// New multi-day tour images
const IMAGES_TO_DOWNLOAD = [
  {
    filename: 'vietnam-6days.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/H%E1%BA%A1_Long_Bay%2C_Vietnam_%28Unsplash%29.jpg/1280px-H%E1%BA%A1_Long_Bay%2C_Vietnam_%28Unsplash%29.jpg'
  },
  {
    filename: 'northern-vietnam-7d.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Sapa_rice_terraces_%28Unsplash%29.jpg/1280px-Sapa_rice_terraces_%28Unsplash%29.jpg'
  },
  {
    filename: 'vietnam-intro-8d.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Halong_Bay_2.jpg/1280px-Halong_Bay_2.jpg'
  },
  {
    filename: 'scenic-vietnam-10d.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Hue_Imperial_City_Vietnam.jpg/1280px-Hue_Imperial_City_Vietnam.jpg'
  },
  {
    filename: 'vietnam-11-days.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Mu_Cang_Chai_Rice_Terraces.jpg/1280px-Mu_Cang_Chai_Rice_Terraces.jpg'
  },
  {
    filename: 'vietnam-12-days.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Dragon_Bridge%2C_Da_Nang.jpg/1280px-Dragon_Bridge%2C_Da_Nang.jpg'
  },
  {
    filename: 'vietnam-insight-14d.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Trang_An_Landscape_Complex.jpg/1280px-Trang_An_Landscape_Complex.jpg'
  },
  {
    filename: 'amazing-vietnam-15d.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Ho_Chi_Minh_City_Skyline_%28cropped%29.jpg/1280px-Ho_Chi_Minh_City_Skyline_%28cropped%29.jpg'
  },
  {
    filename: 'vietnam-cambodia-15d.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Angkor_Wat.jpg/1280px-Angkor_Wat.jpg'
  },
  {
    filename: 'vietnam-cambodia-18d.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Angkor_Wat_from_the_air.jpg/1280px-Angkor_Wat_from_the_air.jpg'
  },
  {
    filename: 'discover-vietnam-20d.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Phu_Quoc_Island_Vietnam.jpg/1280px-Phu_Quoc_Island_Vietnam.jpg'
  },
  {
    filename: 'vietnam-cambodia-21d.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Bayon%2C_Angkor_Thom%2C_Camboya%2C_2013-08-17%2C_DD_37.jpg/1280px-Bayon%2C_Angkor_Thom%2C_Camboya%2C_2013-08-17%2C_DD_37.jpg'
  },
  {
    filename: 'vietnam-family-11d.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Floating_market_-_C%E1%BA%A7n_Th%C6%A1_-_Vietnam.jpg/1280px-Floating_market_-_C%E1%BA%A7n_Th%C6%A1_-_Vietnam.jpg'
  },
  {
    filename: 'vietnam-beach-family-14d.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Beach_at_Nha_Trang%2C_Vietnam.jpg/1280px-Beach_at_Nha_Trang%2C_Vietnam.jpg'
  },
  {
    filename: 'vietnam-luxury-10d.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Halong_Bay%2C_Vietnam_%2810502520675%29.jpg/1280px-Halong_Bay%2C_Vietnam_%2810502520675%29.jpg'
  },
  {
    filename: 'hanoi-sapa-6d.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Sa_Pa%2C_Vietnam_%28Unsplash%29.jpg/1280px-Sa_Pa%2C_Vietnam_%28Unsplash%29.jpg'
  },
];

const TOURS_DIR = path.join(__dirname, '..', 'public', 'tours');

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
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
          'Accept': 'image/*,*/*;q=0.8'
        }
      }, (response) => {
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
  console.log('Downloading multi-day tour images...\n');

  if (!fs.existsSync(TOURS_DIR)) {
    fs.mkdirSync(TOURS_DIR, { recursive: true });
  }

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const image of IMAGES_TO_DOWNLOAD) {
    const outputPath = path.join(TOURS_DIR, image.filename);

    if (fs.existsSync(outputPath)) {
      console.log(`[SKIP] ${image.filename} - already exists`);
      skipCount++;
      continue;
    }

    try {
      console.log(`[DOWNLOAD] ${image.filename}...`);
      const buffer = await downloadImage(image.url);

      if (buffer.length < 1000) {
        throw new Error('Image too small');
      }

      console.log(`[PROCESS] Resizing to ${IMAGE_WIDTH}x${IMAGE_HEIGHT}...`);
      await processAndSaveImage(buffer, outputPath);

      const stats = fs.statSync(outputPath);
      console.log(`[SUCCESS] ${image.filename} (${Math.round(stats.size / 1024)}KB)\n`);
      successCount++;

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
}

main().catch(console.error);
