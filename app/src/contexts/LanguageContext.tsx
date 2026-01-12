"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  translations as defaultTranslations,
  SupportedLanguage,
  LANGUAGES,
  getAllTranslationTexts,
  rebuildTranslations,
} from "@/lib/translations";

type TranslationsType = typeof defaultTranslations;

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: TranslationsType;
  isLoading: boolean;
  languages: typeof LANGUAGES;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Cache for translations to avoid re-fetching
const translationCache: Record<SupportedLanguage, TranslationsType> = {
  EN: defaultTranslations,
  ES: defaultTranslations,
  PT: defaultTranslations,
  FR: defaultTranslations,
  RU: defaultTranslations,
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>("EN");
  const [t, setT] = useState<TranslationsType>(defaultTranslations);
  const [isLoading, setIsLoading] = useState(false);

  // Load language preference from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("language") as SupportedLanguage;
      if (savedLang && LANGUAGES[savedLang]) {
        setLanguageState(savedLang);
      }
    }
  }, []);

  // Fetch translations when language changes
  const fetchTranslations = useCallback(async (lang: SupportedLanguage) => {
    if (lang === "EN") {
      setT(defaultTranslations);
      return;
    }

    // Check cache first
    if (translationCache[lang] !== defaultTranslations) {
      setT(translationCache[lang]);
      return;
    }

    setIsLoading(true);
    try {
      const textsToTranslate = getAllTranslationTexts();

      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          texts: textsToTranslate,
          targetLang: lang,
          sourceLang: "EN",
        }),
      });

      if (!response.ok) {
        throw new Error("Translation failed");
      }

      const data = await response.json();
      const translatedTexts = data.translations;

      // Rebuild translations object with translated texts
      const newTranslations = rebuildTranslations(translatedTexts);

      // Cache the translations
      translationCache[lang] = newTranslations;

      setT(newTranslations);
    } catch (error) {
      console.error("Failed to fetch translations:", error);
      // Fall back to English
      setT(defaultTranslations);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const setLanguage = useCallback(
    (lang: SupportedLanguage) => {
      setLanguageState(lang);
      if (typeof window !== "undefined") {
        localStorage.setItem("language", lang);
      }
      fetchTranslations(lang);
    },
    [fetchTranslations]
  );

  // Fetch translations on mount if language is not English
  useEffect(() => {
    if (language !== "EN") {
      fetchTranslations(language);
    }
  }, [language, fetchTranslations]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        isLoading,
        languages: LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
