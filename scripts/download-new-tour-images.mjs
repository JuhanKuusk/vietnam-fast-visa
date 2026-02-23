#!/usr/bin/env node
/**
 * Script to download images for the 18 new multi-day tours
 * All images from Wikimedia Commons - CC licensed
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

// New tours image URLs - all Wikimedia Commons CC licensed
const IMAGES_TO_DOWNLOAD = [
  // Essential Vietnam 9 Days - Halong Bay main image
  {
    filename: 'essential-vietnam-9d.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Halong_Bay_viewed_from_Titov_Island.jpg/1280px-Halong_Bay_viewed_from_Titov_Island.jpg'
  },
  // Essence of Vietnam 10 Days - Hoi An lanterns
  {
    filename: 'essence-vietnam-10d.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Hoi_An_lanterns.jpg/1280px-Hoi_An_lanterns.jpg'
  },
  // Best of Central Vietnam 7 Days - Hue Imperial City
  {
    filename: 'central-vietnam-7d.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/The_forbidden_city_Hue_Vietnam.jpg/1280px-The_forbidden_city_Hue_Vietnam.jpg'
  },
  // Discovery North-East Vietnam 9 Days - Ban Gioc Waterfall
  {
    filename: 'discovery-northeast-9d.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Detian_Falls.jpg/1280px-Detian_Falls.jpg'
  },
  // Southern Vietnam 7 Days - Mekong Delta
  {
    filename: 'southern-vietnam-7d.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Mekong_Delta%2C_Vietnam.jpg/1280px-Mekong_Delta%2C_Vietnam.jpg'
  },
  // Signatures of Vietnam 14 Days - Terraced fields panorama
  {
    filename: 'signatures-vietnam-14d.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Terraced_rice_fields_in_Mu_Cang_Chai%2C_Vietnam.jpg/1280px-Terraced_rice_fields_in_Mu_Cang_Chai%2C_Vietnam.jpg'
  },
  // Best Cultural Heritage Vietnam 12 Days - Temple of Literature
  {
    filename: 'cultural-heritage-12d.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Temple_of_Literature%2C_Hanoi.jpg/1280px-Temple_of_Literature%2C_Hanoi.jpg'
  },
  // Natural Wonders of Vietnam 16 Days - Phong Nha cave
  {
    filename: 'natural-wonders-16d.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Hang_En%2C_Phong_Nha-K%E1%BA%BB_B%C3%A0ng.jpg/1280px-Hang_En%2C_Phong_Nha-K%E1%BA%BB_B%C3%A0ng.jpg'
  },
  // Perfect 7 Days Vietnam - Vietnam collage style (Hanoi street)
  {
    filename: 'perfect-vietnam-7d.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Hanoi_street_scene_%28Unsplash%29.jpg/1280px-Hanoi_street_scene_%28Unsplash%29.jpg'
  },
  // Vietnam Discovery 8 Days - Hai Van Pass
  {
    filename: 'vietnam-discovery-8d.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Hai_Van_Pass%2C_Vietnam.jpg/1280px-Hai_Van_Pass%2C_Vietnam.jpg'
  },
  // Hanoi-Ninh Binh-Halong 5 Days - Trang An
  {
    filename: 'hanoi-ninh-binh-halong-5d.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Trang_An_Complex.jpg/1280px-Trang_An_Complex.jpg'
  },
  // North Vietnam Adventure 7 Days - Pu Luong terraces
  {
    filename: 'north-vietnam-adventure-7d.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Pu_Luong_Nature_Reserve.jpg/1280px-Pu_Luong_Nature_Reserve.jpg'
  },
  // Best of Nature Northern Vietnam 8 Days - Sapa panorama
  {
    filename: 'nature-north-vietnam-8d.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Sa_Pa_terraces.jpg/1280px-Sa_Pa_terraces.jpg'
  },
  // Highlights of Vietnam 10 Days - Combined Vietnam image
  {
    filename: 'highlights-vietnam-10d.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Vietnam_panorama_Halong_Bay.jpg/1280px-Vietnam_panorama_Halong_Bay.jpg'
  },
  // Vietnamese Cultural Odyssey 10 Days - Water puppets/culture
  {
    filename: 'cultural-odyssey-10d.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Water_Puppet_Theatre%2C_Hanoi.jpg/1280px-Water_Puppet_Theatre%2C_Hanoi.jpg'
  },
  // Best of Vietnam 13 Days - Phu Quoc beach
  {
    filename: 'best-vietnam-13d.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Phu_Quoc_beach.jpg/1280px-Phu_Quoc_beach.jpg'
  },
  // Discovery North-East Vietnam 13 Days - Ha Giang loop
  {
    filename: 'discovery-north-east-13d.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Ha_Giang_Loop.jpg/1280px-Ha_Giang_Loop.jpg'
  },
  // Hanoi Sapa 6 Days (existing tour but ensure image exists)
  {
    filename: 'hanoi-sapa-6d.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Sapa_Vietnam.jpg/1280px-Sapa_Vietnam.jpg'
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
  console.log('Starting new tour image download from Wikimedia Commons...\n');

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
      await new Promise(resolve => setTimeout(resolve, 300));

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
