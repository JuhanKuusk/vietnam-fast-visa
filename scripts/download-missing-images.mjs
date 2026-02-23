import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';

const MISSING_IMAGES = [
  // Alternative URLs for 404 pages
  { filename: 'halong-2d1n-cruise.jpg', url: 'https://www.asiatouradvisor.com/halong-bay-overnight-cruise/' },
  { filename: 'hanoi-2days.jpg', url: 'https://www.asiatouradvisor.com/hanoi-sightseeing/' },
  { filename: 'serenity-cruise.jpg', url: 'https://www.asiatouradvisor.com/halong-bay-overnight-cruise/' },
  { filename: 'renea-cruise.jpg', url: 'https://www.asiatouradvisor.com/halong-bay-overnight-cruise/' },
  { filename: 'mekong-eyes.jpg', url: 'https://www.asiatouradvisor.com/best-mekong-delta-tours-3-days/' },
  { filename: 'gecko-eyes.jpg', url: 'https://www.asiatouradvisor.com/mekong-eco-tour-2-days-trip/' },
];

const OUTPUT_DIR = './public/tours';

function fetchWithRedirect(url, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    if (maxRedirects <= 0) {
      reject(new Error('Too many redirects'));
      return;
    }

    const protocol = url.startsWith('https') ? https : http;
    const req = protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      },
      timeout: 30000,
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          const urlObj = new URL(url);
          redirectUrl = `${urlObj.protocol}//${urlObj.host}${redirectUrl}`;
        }
        fetchWithRedirect(redirectUrl, maxRedirects - 1).then(resolve).catch(reject);
        return;
      }

      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }

      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

function extractImageUrl(html, pageUrl) {
  // og:image
  let match = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i);
  if (match) return match[1];

  match = html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i);
  if (match) return match[1];

  // Large tour images
  match = html.match(/<img[^>]+src=["']([^"']*(?:tour|halong|mekong|vietnam|cruise)[^"']*\.(?:jpg|jpeg|png|webp))["'][^>]*>/i);
  if (match) {
    let src = match[1];
    if (!src.startsWith('http')) {
      const urlObj = new URL(pageUrl);
      src = src.startsWith('/') ? `${urlObj.protocol}//${urlObj.host}${src}` : `${urlObj.protocol}//${urlObj.host}/${src}`;
    }
    return src;
  }

  return null;
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const makeRequest = (currentUrl, redirectCount = 0) => {
      if (redirectCount > 5) {
        reject(new Error('Too many redirects'));
        return;
      }

      protocol.get(currentUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
          'Accept': 'image/*',
        },
        timeout: 60000,
      }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          let redirectUrl = res.headers.location;
          if (!redirectUrl.startsWith('http')) {
            const urlObj = new URL(currentUrl);
            redirectUrl = `${urlObj.protocol}//${urlObj.host}${redirectUrl}`;
          }
          makeRequest(redirectUrl, redirectCount + 1);
          return;
        }

        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}`));
          return;
        }

        const fileStream = fs.createWriteStream(filepath);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          const stats = fs.statSync(filepath);
          resolve(stats.size);
        });
        fileStream.on('error', reject);
      }).on('error', reject);
    };

    makeRequest(url);
  });
}

async function processImage(item, index, total) {
  console.log(`\n[${index + 1}/${total}] Processing: ${item.filename}`);
  console.log(`    URL: ${item.url}`);

  try {
    console.log('    Fetching tour page...');
    const html = await fetchWithRedirect(item.url);

    const imageUrl = extractImageUrl(html, item.url);
    if (!imageUrl) {
      console.log('    ❌ No image found on page');
      return false;
    }

    console.log(`    Found image: ${imageUrl.substring(0, 80)}...`);
    console.log('    Downloading image...');

    const filepath = path.join(OUTPUT_DIR, item.filename);
    const size = await downloadImage(imageUrl, filepath);
    console.log(`    ✅ Downloaded successfully (${Math.round(size / 1024)}KB)`);
    return true;
  } catch (error) {
    console.log(`    ❌ Error: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('===========================================');
  console.log('  Downloading Missing Tour Images');
  console.log('===========================================\n');

  let success = 0;
  let failed = 0;

  for (let i = 0; i < MISSING_IMAGES.length; i++) {
    const result = await processImage(MISSING_IMAGES[i], i, MISSING_IMAGES.length);
    if (result) success++;
    else failed++;
    
    // Small delay between requests
    await new Promise(r => setTimeout(r, 1000));
  }

  console.log('\n===========================================');
  console.log('  SUMMARY');
  console.log('===========================================');
  console.log(`✅ Successfully downloaded: ${success}`);
  console.log(`❌ Failed: ${failed}`);
  console.log('\nDone!');
}

main().catch(console.error);
