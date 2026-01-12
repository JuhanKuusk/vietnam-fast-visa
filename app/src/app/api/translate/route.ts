import { NextRequest, NextResponse } from "next/server";

const DEEPL_API_KEY = process.env.DEEPL_API_KEY;
const DEEPL_API_URL = "https://api.deepl.com/v2/translate";

export async function POST(request: NextRequest) {
  if (!DEEPL_API_KEY) {
    return NextResponse.json(
      { error: "DeepL API key not configured" },
      { status: 500 }
    );
  }

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
