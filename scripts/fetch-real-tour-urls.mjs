#!/usr/bin/env node

/**
 * Script to fetch all real tour URLs from bestpricetravel.com
 * and match them with our tours to fix the affiliateUrl values
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOURS_DATA_FILE = path.join(__dirname, '..', 'src', 'lib', 'tours-data.ts');

// Fetch URL with User-Agent
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml',
      }
    }, (response) => {
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

// Extract tour links from page
function extractTourLinks(html, baseUrl) {
  const links = new Set();

  // Match all href links to tour pages
  const patterns = [
    /href="(\/vietnam-tours\/[^"]+\.html)"/g,
    /href="(https:\/\/www\.bestpricetravel\.com\/vietnam-tours\/[^"]+\.html)"/g,
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(html)) !== null) {
      let url = match[1];
      if (url.startsWith('/')) {
        url = `https://www.bestpricetravel.com${url}`;
      }
      links.add(url);
    }
  }

  return Array.from(links);
}

// Main function
async function main() {
  console.log('===========================================');
  console.log('  Fetching Real Tour URLs from BestPrice');
  console.log('===========================================\n');

  try {
    // Fetch main tours page
    console.log('Fetching https://www.bestpricetravel.com/vietnam-tours ...');
    const html = await fetchUrl('https://www.bestpricetravel.com/vietnam-tours');

    const links = extractTourLinks(html);
    console.log(`Found ${links.length} tour links on main page\n`);

    // Show first 20
    console.log('Sample tour URLs:');
    links.slice(0, 20).forEach(link => console.log(`  ${link}`));

    // Save to file for analysis
    const outputFile = path.join(__dirname, 'real-tour-urls.txt');
    fs.writeFileSync(outputFile, links.join('\n'));
    console.log(`\nSaved ${links.length} URLs to ${outputFile}`);

  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
