import { NextRequest, NextResponse } from "next/server";

const DEEPL_API_KEY = process.env.DEEPL_API_KEY;
const DEEPL_API_URL = "https://api.deepl.com/v2/translate";
const GOOGLE_TRANSLATE_API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY;

// Languages not supported by DeepL that need Google Translate
const GOOGLE_TRANSLATE_LANGUAGES = ["HI"]; // Hindi

async function translateWithGoogle(texts: string[], targetLang: string, sourceLang: string): Promise<string[]> {
  if (!GOOGLE_TRANSLATE_API_KEY) {
    console.error("Google Translate API key not configured for language:", targetLang);
    return texts; // Return original texts if no API key
  }

  try {
    // Google Translate language codes are lowercase
    const googleTargetLang = targetLang.toLowerCase();
    const googleSourceLang = sourceLang.toLowerCase();

    const translations: string[] = [];

    // Google Translate API - translate each text
    for (const text of texts) {
      const url = `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: text,
          target: googleTargetLang,
          source: googleSourceLang,
          format: "text",
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error("Google Translate API error:", response.status, errorBody);
        translations.push(text); // Fall back to original text
        continue;
      }

      const data = await response.json();
      const translatedText = data.data?.translations?.[0]?.translatedText || text;
      translations.push(translatedText);
    }

    return translations;
  } catch (error) {
    console.error("Google Translate error:", error);
    return texts; // Return original texts on error
  }
}

export async function POST(request: NextRequest) {
  try {
    const { texts, targetLang, sourceLang = "EN" } = await request.json();

    if (!texts || !Array.isArray(texts) || texts.length === 0) {
      return NextResponse.json(
        { error: "texts array is required" },
        { status: 400 }
      );
    }

    if (!targetLang) {
      return NextResponse.json(
        { error: "targetLang is required" },
        { status: 400 }
      );
    }

    // Don't translate if target is English (source language)
    if (targetLang === "EN") {
      return NextResponse.json({ translations: texts });
    }

    // Use Google Translate for languages not supported by DeepL
    if (GOOGLE_TRANSLATE_LANGUAGES.includes(targetLang)) {
      const translations = await translateWithGoogle(texts, targetLang, sourceLang);
      return NextResponse.json({ translations });
    }

    // Use DeepL for supported languages
    if (!DEEPL_API_KEY) {
      return NextResponse.json(
        { error: "DeepL API key not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(DEEPL_API_URL, {
      method: "POST",
      headers: {
        Authorization: `DeepL-Auth-Key ${DEEPL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: texts,
        target_lang: targetLang,
        source_lang: sourceLang,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("DeepL API error:", response.status, errorText);
      return NextResponse.json(
        { error: "Translation failed", details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    const translations = data.translations.map((t: { text: string }) => t.text);

    return NextResponse.json({ translations });
  } catch (error) {
    console.error("Translation error:", error);
    return NextResponse.json(
      { error: "Translation failed" },
      { status: 500 }
    );
  }
}
