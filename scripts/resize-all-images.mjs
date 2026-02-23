#!/usr/bin/env node
/**
 * Script to resize all tour images to consistent 800x500 dimensions
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGE_WIDTH = 800;
const IMAGE_HEIGHT = 500;

const TOURS_DIR = path.join(__dirname, '..', 'public', 'tours');

async function main() {
  console.log('Resizing all tour images to consistent 800x500 format...\n');

  const files = fs.readdirSync(TOURS_DIR).filter(f => f.endsWith('.jpg'));

  let processedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const file of files) {
    const filePath = path.join(TOURS_DIR, file);
    const tempPath = path.join(TOURS_DIR, `temp_${file}`);

    try {
      // Get current image dimensions
      const metadata = await sharp(filePath).metadata();

      // Skip if already correct size
      if (metadata.width === IMAGE_WIDTH && metadata.height === IMAGE_HEIGHT) {
        console.log(`[SKIP] ${file} - already 800x500`);
        skippedCount++;
        continue;
      }

      console.log(`[RESIZE] ${file} (${metadata.width}x${metadata.height} -> ${IMAGE_WIDTH}x${IMAGE_HEIGHT})`);

      // Read, resize, and save to temp file
      await sharp(filePath)
        .resize(IMAGE_WIDTH, IMAGE_HEIGHT, {
          fit: 'cover',
          position: 'center',
        })
        .jpeg({
          quality: 85,
          progressive: true,
        })
        .toFile(tempPath);

      // Replace original with resized version
      fs.unlinkSync(filePath);
      fs.renameSync(tempPath, filePath);

      const stats = fs.statSync(filePath);
      console.log(`[SUCCESS] ${file} (${Math.round(stats.size / 1024)}KB)\n`);
      processedCount++;

    } catch (error) {
      console.error(`[ERROR] ${file} - ${error.message}\n`);
      errorCount++;
      // Clean up temp file if it exists
      if (fs.existsSync(tempPath)) {
        fs.unlinkSync(tempPath);
      }
    }
  }

  console.log('\n========================================');
  console.log(`Resize complete!`);
  console.log(`  Processed: ${processedCount}`);
  console.log(`  Skipped:   ${skippedCount}`);
  console.log(`  Errors:    ${errorCount}`);
  console.log('========================================\n');
}

main().catch(console.error);
