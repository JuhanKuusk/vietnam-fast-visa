/**
 * Script to pre-translate all content using DeepL/Google Translate APIs
 * and save to static JSON files for fast loading.
 *
 * Usage: npx ts-node scripts/generate-translations.ts
 *
 * Required environment variables:
 * - DEEPL_API_KEY: For ES, PT, FR, RU
 * - GOOGLE_TRANSLATE_API_KEY: For HI (Hindi)
 */

import * as fs from "fs";
import * as path from "path";
import { translations } from "../src/lib/translations";

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

const DEEPL_API_KEY = process.env.DEEPL_API_KEY;
const GOOGLE_TRANSLATE_API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY;
const DEEPL_API_URL = "https://api.deepl.com/v2/translate";

// Languages to translate
const LANGUAGES_TO_TRANSLATE = ["ES", "PT", "FR", "RU", "HI"] as const;

// Hindi needs Google Translate (not supported by DeepL)
const GOOGLE_TRANSLATE_LANGUAGES = ["HI"];

// Output directory for translation files
const OUTPUT_DIR = path.join(__dirname, "../src/locales");

// Helper function to extract all texts from translations object
function getAllTexts(obj: Record<string, unknown>, texts: string[] = []): string[] {
  for (const value of Object.values(obj)) {
    if (typeof value === "string") {
      texts.push(value);
    } else if (typeof value === "object" && value !== null) {
      getAllTexts(value as Record<string, unknown>, texts);
    }
  }
  return texts;
}

// Helper function to rebuild translations object with new texts
function rebuildWithTexts<T>(obj: T, texts: string[], index: { value: number }): T {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
    if (typeof value === "string") {
      result[key] = texts[index.value++];
    } else if (typeof value === "object" && value !== null) {
      result[key] = rebuildWithTexts(value, texts, index);
    }
  }
  return result as T;
}

// Translate with DeepL API (batch support)
async function translateWithDeepL(
  texts: string[],
  targetLang: string
): Promise<string[]> {
  if (!DEEPL_API_KEY) {
    throw new Error("DEEPL_API_KEY not configured");
  }

  // DeepL has a limit of ~50 texts per request, so batch them
  const BATCH_SIZE = 50;
  const allTranslations: string[] = [];

  for (let i = 0; i < texts.length; i += BATCH_SIZE) {
    const batch = texts.slice(i, i + BATCH_SIZE);
    console.log(`  Translating batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(texts.length / BATCH_SIZE)}...`);

    const response = await fetch(DEEPL_API_URL, {
      method: "POST",
      headers: {
        Authorization: `DeepL-Auth-Key ${DEEPL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: batch,
        target_lang: targetLang,
        source_lang: "EN",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`DeepL API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const batchTranslations = data.translations.map((t: { text: string }) => t.text);
    allTranslations.push(...batchTranslations);

    // Small delay to avoid rate limiting
    if (i + BATCH_SIZE < texts.length) {
      await new Promise((r) => setTimeout(r, 100));
    }
  }

  return allTranslations;
}

// Translate with Google Translate API
async function translateWithGoogle(
  texts: string[],
  targetLang: string
): Promise<string[]> {
  if (!GOOGLE_TRANSLATE_API_KEY) {
    throw new Error("GOOGLE_TRANSLATE_API_KEY not configured");
  }

  const googleTargetLang = targetLang.toLowerCase();
  const translations: string[] = [];

  // Google Translate one at a time (can batch with v3 API, but v2 is simpler)
  for (let i = 0; i < texts.length; i++) {
    if (i % 50 === 0) {
      console.log(`  Translating ${i + 1}/${texts.length}...`);
    }

    const url = `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: texts[i],
        target: googleTargetLang,
        source: "en",
        format: "text",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Google Translate API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    translations.push(data.data?.translations?.[0]?.translatedText || texts[i]);

    // Small delay to avoid rate limiting
    if (i < texts.length - 1) {
      await new Promise((r) => setTimeout(r, 50));
    }
  }

  return translations;
}

// Main function
async function generateTranslations() {
  console.log("Starting translation generation...\n");

  // Create output directory if it doesn't exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Extract all texts from the English translations
  const englishTexts = getAllTexts(translations as unknown as Record<string, unknown>);
  console.log(`Found ${englishTexts.length} texts to translate\n`);

  // Save English translations as the base
  const englishOutput = path.join(OUTPUT_DIR, "en.json");
  fs.writeFileSync(englishOutput, JSON.stringify(translations, null, 2));
  console.log(`Saved English translations to ${englishOutput}\n`);

  // Translate each language
  for (const lang of LANGUAGES_TO_TRANSLATE) {
    console.log(`\nTranslating to ${lang}...`);

    try {
      let translatedTexts: string[];

      if (GOOGLE_TRANSLATE_LANGUAGES.includes(lang)) {
        // Use Google Translate for Hindi
        translatedTexts = await translateWithGoogle(englishTexts, lang);
      } else {
        // Use DeepL for other languages
        translatedTexts = await translateWithDeepL(englishTexts, lang);
      }

      // Rebuild the translations object with translated texts
      const translatedObj = rebuildWithTexts(
        translations,
        translatedTexts,
        { value: 0 }
      );

      // Save to JSON file
      const outputPath = path.join(OUTPUT_DIR, `${lang.toLowerCase()}.json`);
      fs.writeFileSync(outputPath, JSON.stringify(translatedObj, null, 2));
      console.log(`Saved ${lang} translations to ${outputPath}`);
    } catch (error) {
      console.error(`Error translating to ${lang}:`, error);
    }
  }

  console.log("\n\nTranslation generation complete!");
  console.log(`\nGenerated files in ${OUTPUT_DIR}:`);
  const files = fs.readdirSync(OUTPUT_DIR);
  files.forEach((f) => console.log(`  - ${f}`));
}

// Run the script
generateTranslations().catch(console.error);
