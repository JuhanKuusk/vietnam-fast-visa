// DeepL API integration for translations (with Google Translate fallback for Hindi)

const DEEPL_API_KEY = process.env.DEEPL_API_KEY;
const DEEPL_API_URL = "https://api.deepl.com/v2/translate";
const GOOGLE_TRANSLATE_API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY;

// Languages not supported by DeepL that need Google Translate
const GOOGLE_TRANSLATE_LANGUAGES = ["HI"]; // Hindi

export type SupportedLanguage = "EN" | "ES" | "PT" | "FR" | "RU" | "HI";

export const LANGUAGES: Record<SupportedLanguage, { name: string; flag: string }> = {
  EN: { name: "English", flag: "🇬🇧" },
  ES: { name: "Español", flag: "🇪🇸" },
  PT: { name: "Português", flag: "🇧🇷" },
  FR: { name: "Français", flag: "🇫🇷" },
  RU: { name: "Русский", flag: "🇷🇺" },
  HI: { name: "हिन्दी", flag: "🇮🇳" },
};

interface TranslateParams {
  texts: string[];
  targetLang: SupportedLanguage;
  sourceLang?: string;
}

interface DeepLResponse {
  translations: Array<{
    detected_source_language: string;
    text: string;
  }>;
}

async function translateWithGoogle(texts: string[], targetLang: string, sourceLang: string): Promise<string[]> {
  if (!GOOGLE_TRANSLATE_API_KEY) {
    console.error("Google Translate API key not configured for language:", targetLang);
    return texts;
  }

  try {
    const googleTargetLang = targetLang.toLowerCase();
    const googleSourceLang = sourceLang.toLowerCase();
    const translations: string[] = [];

    for (const text of texts) {
      const url = `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q: text,
          target: googleTargetLang,
          source: googleSourceLang,
          format: "text",
        }),
      });

      if (!response.ok) {
        translations.push(text);
        continue;
      }

      const data = await response.json();
      translations.push(data.data?.translations?.[0]?.translatedText || text);
    }

    return translations;
  } catch (error) {
    console.error("Google Translate error:", error);
    return texts;
  }
}

export async function translateTexts({
  texts,
  targetLang,
  sourceLang = "EN",
}: TranslateParams): Promise<string[]> {
  // Don't translate if target is English (source language)
  if (targetLang === "EN") {
    return texts;
  }

  // Use Google Translate for languages not supported by DeepL
  if (GOOGLE_TRANSLATE_LANGUAGES.includes(targetLang)) {
    return translateWithGoogle(texts, targetLang, sourceLang);
  }

  if (!DEEPL_API_KEY) {
    console.error("DeepL API key not configured");
    return texts;
  }

  try {
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
      return texts;
    }

    const data: DeepLResponse = await response.json();
    return data.translations.map((t) => t.text);
  } catch (error) {
    console.error("Translation error:", error);
    return texts;
  }
}

// Translate a single text
export async function translateText(
  text: string,
  targetLang: SupportedLanguage
): Promise<string> {
  const results = await translateTexts({ texts: [text], targetLang });
  return results[0];
}
