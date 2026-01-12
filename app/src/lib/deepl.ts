// DeepL API integration for translations

const DEEPL_API_KEY = process.env.DEEPL_API_KEY;
const DEEPL_API_URL = "https://api.deepl.com/v2/translate";

export type SupportedLanguage = "EN" | "ES" | "PT" | "FR" | "RU";

export const LANGUAGES: Record<SupportedLanguage, { name: string; flag: string }> = {
  EN: { name: "English", flag: "🇬🇧" },
  ES: { name: "Español", flag: "🇪🇸" },
  PT: { name: "Português", flag: "🇧🇷" },
  FR: { name: "Français", flag: "🇫🇷" },
  RU: { name: "Русский", flag: "🇷🇺" },
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

export async function translateTexts({
  texts,
  targetLang,
  sourceLang = "EN",
}: TranslateParams): Promise<string[]> {
  if (!DEEPL_API_KEY) {
    console.error("DeepL API key not configured");
    return texts; // Return original texts if no API key
  }

  // Don't translate if target is English (source language)
  if (targetLang === "EN") {
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
