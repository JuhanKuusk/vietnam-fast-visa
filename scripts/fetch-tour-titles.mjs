#!/usr/bin/env node

/**
 * Fetch actual tour titles from bestpricetravel.com pages
 * to build a proper title-to-URL mapping
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REAL_URLS_FILE = path.join(__dirname, 'all-bestprice-urls.json');

// Load real URLs
const realUrls = JSON.parse(fs.readFileSync(REAL_URLS_FILE, 'utf-8'));

// Fetch with timeout
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('Timeout'));
    }, 10000);

    const request = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml'
      }
    }, (response) => {
      clearTimeout(timeout);

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

    request.on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}

// Extract title from HTML
function extractTitle(html) {
  // Try og:title first
  const ogMatch = html.match(/<meta\s+property="og:title"\s+content="([^"]+)"/i) ||
                  html.match(/<meta\s+content="([^"]+)"\s+property="og:title"/i);
  if (ogMatch) return ogMatch[1];

  // Try h1
  const h1Match = html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
  if (h1Match) return h1Match[1].trim();

  // Try title tag
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  if (titleMatch) return titleMatch[1].split('|')[0].trim();

  return null;
}

async function main() {
  console.log('===========================================');
  console.log('  Fetching Tour Titles from BestPrice');
  console.log('===========================================\n');
  console.log(`URLs to fetch: ${realUrls.length}\n`);

  const results = [];
  let fetched = 0;
  let failed = 0;

  for (const url of realUrls) {
    try {
      const html = await fetchUrl(url);
      const title = extractTitle(html);

      if (title) {
        results.push({ url, title });
        fetched++;
        process.stdout.write(`\rFetched: ${fetched}/${realUrls.length} (${failed} failed)`);
      } else {
        failed++;
        console.log(`\nNo title found: ${url}`);
      }
    } catch (err) {
      failed++;
      console.log(`\nFailed: ${url} - ${err.message}`);
    }

    // Small delay to be polite
    await new Promise(r => setTimeout(r, 100));
  }

  console.log(`\n\n✅ Fetched ${fetched} titles, ${failed} failed`);

  // Save results
  fs.writeFileSync(
    path.join(__dirname, 'bestprice-tour-titles.json'),
    JSON.stringify(results, null, 2)
  );
  console.log('Saved to bestprice-tour-titles.json');

  // Show sample
  console.log('\nSample titles:');
  results.slice(0, 10).forEach(r => {
    console.log(`  "${r.title}"`);
    console.log(`    ${r.url}\n`);
  });
}

main().catch(console.error);
