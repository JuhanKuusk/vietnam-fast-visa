/**
 * Script to translate all tours to Chinese using Google Translate API
 * and generate Chinese tour translations for zh.json
 *
 * Usage: npx tsx scripts/translate-tours-to-chinese.ts
 *
 * Required environment variable:
 * - GOOGLE_TRANSLATE_API_KEY
 */

import * as fs from "fs";
import * as path from "path";

// Load environment variables from .env.local if it exists
const envPath = path.join(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split("=");
    if (key && valueParts.length > 0) {
      const value = valueParts.join("=").trim();
      if (!process.env[key.trim()]) {
        process.env[key.trim()] = value;
      }
    }
  });
}

// Try GOOGLE_TRANSLATE_API_KEY first, then fall back to GOOGLE_CLOUD_VISION_API_KEY
// (same Google Cloud project keys often work across services)
const GOOGLE_TRANSLATE_API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY || process.env.GOOGLE_CLOUD_VISION_API_KEY;

// Import tours data
import { FEATURED_TOURS } from "../src/lib/tours-data";

interface TourTranslation {
  name: string;
  description: string;
  location: string;
  duration: string;
  highlights: string[];
  included?: string[];
  excluded?: string[];
}

// Translate with Google Translate API (batched)
async function translateWithGoogle(
  texts: string[],
  targetLang: string = "zh"
): Promise<string[]> {
  if (!GOOGLE_TRANSLATE_API_KEY) {
    throw new Error("GOOGLE_TRANSLATE_API_KEY not configured");
  }

  const translations: string[] = [];
  const BATCH_SIZE = 100; // Google allows batching

  for (let i = 0; i < texts.length; i += BATCH_SIZE) {
    const batch = texts.slice(i, i + BATCH_SIZE);
    console.log(`  Translating batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(texts.length / BATCH_SIZE)} (${batch.length} texts)...`);

    const url = `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: batch,
        target: targetLang,
        source: "en",
        format: "text",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Google Translate API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const batchTranslations = data.data?.translations?.map((t: { translatedText: string }) => t.translatedText) || batch;
    translations.push(...batchTranslations);

    // Small delay to avoid rate limiting
    if (i + BATCH_SIZE < texts.length) {
      await new Promise((r) => setTimeout(r, 200));
    }
  }

  return translations;
}

// Main function
async function translateTours() {
  console.log("Starting tour translation to Chinese...\n");

  if (!GOOGLE_TRANSLATE_API_KEY) {
    console.error("ERROR: No Google API key found in environment");
    console.log("Please add GOOGLE_TRANSLATE_API_KEY or GOOGLE_CLOUD_VISION_API_KEY to your .env.local file");
    process.exit(1);
  }

  console.log(`Found ${FEATURED_TOURS.length} tours to translate\n`);

  // Collect all texts to translate
  const allTexts: string[] = [];
  const textMap: { tourId: string; field: string; index?: number }[] = [];

  for (const tour of FEATURED_TOURS) {
    // Name
    allTexts.push(tour.name);
    textMap.push({ tourId: tour.id, field: "name" });

    // Description
    allTexts.push(tour.description);
    textMap.push({ tourId: tour.id, field: "description" });

    // Location
    allTexts.push(tour.location);
    textMap.push({ tourId: tour.id, field: "location" });

    // Duration
    allTexts.push(tour.duration);
    textMap.push({ tourId: tour.id, field: "duration" });

    // Highlights
    if (tour.highlights) {
      tour.highlights.forEach((h, i) => {
        allTexts.push(h);
        textMap.push({ tourId: tour.id, field: "highlights", index: i });
      });
    }

    // Included
    if (tour.included) {
      tour.included.forEach((item, i) => {
        allTexts.push(item);
        textMap.push({ tourId: tour.id, field: "included", index: i });
      });
    }

    // Excluded
    if (tour.excluded) {
      tour.excluded.forEach((item, i) => {
        allTexts.push(item);
        textMap.push({ tourId: tour.id, field: "excluded", index: i });
      });
    }
  }

  console.log(`Total texts to translate: ${allTexts.length}\n`);
  console.log("Estimated cost: ~$" + ((allTexts.join("").length / 1000000) * 20).toFixed(2));
  console.log("\nStarting translation...\n");

  // Translate all texts
  const translatedTexts = await translateWithGoogle(allTexts, "zh");

  // Build the tour translations object
  const tourTranslations: Record<string, TourTranslation> = {};

  // Initialize tour entries
  for (const tour of FEATURED_TOURS) {
    tourTranslations[tour.id] = {
      name: "",
      description: "",
      location: "",
      duration: "",
      highlights: [],
      included: tour.included ? [] : undefined,
      excluded: tour.excluded ? [] : undefined,
    };
  }

  // Map translated texts back to tour structure
  for (let i = 0; i < textMap.length; i++) {
    const { tourId, field, index } = textMap[i];
    const translation = translatedTexts[i];

    if (field === "name") {
      tourTranslations[tourId].name = translation;
    } else if (field === "description") {
      tourTranslations[tourId].description = translation;
    } else if (field === "location") {
      tourTranslations[tourId].location = translation;
    } else if (field === "duration") {
      tourTranslations[tourId].duration = translation;
    } else if (field === "highlights" && index !== undefined) {
      tourTranslations[tourId].highlights[index] = translation;
    } else if (field === "included" && index !== undefined && tourTranslations[tourId].included) {
      tourTranslations[tourId].included![index] = translation;
    } else if (field === "excluded" && index !== undefined && tourTranslations[tourId].excluded) {
      tourTranslations[tourId].excluded![index] = translation;
    }
  }

  // Read existing zh.json
  const zhJsonPath = path.join(__dirname, "../src/locales/zh.json");
  let zhJson: Record<string, unknown> = {};

  if (fs.existsSync(zhJsonPath)) {
    const content = fs.readFileSync(zhJsonPath, "utf-8");
    zhJson = JSON.parse(content);
  }

  // Add tour translations
  zhJson.tours = tourTranslations;

  // Save updated zh.json
  fs.writeFileSync(zhJsonPath, JSON.stringify(zhJson, null, 2));
  console.log(`\nSaved Chinese tour translations to ${zhJsonPath}`);

  // Also save a standalone file for reference
  const toursOutputPath = path.join(__dirname, "../src/locales/tours-zh.json");
  fs.writeFileSync(toursOutputPath, JSON.stringify(tourTranslations, null, 2));
  console.log(`Saved standalone tour translations to ${toursOutputPath}`);

  console.log("\n\nTranslation complete!");
  console.log(`Translated ${FEATURED_TOURS.length} tours with ${allTexts.length} text strings`);
}

// Run the script
translateTours().catch(console.error);
