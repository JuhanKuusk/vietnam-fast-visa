"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
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
  HI: defaultTranslations,
};

// Track which languages have actually been fetched from the API
const fetchedLanguages = new Set<SupportedLanguage>(["EN"]); // EN is always "fetched"

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>("EN");
  const [t, setT] = useState<TranslationsType>(defaultTranslations);
  const [isLoading, setIsLoading] = useState(false);
  const initialLoadDone = useRef(false);

  // Fetch translations function
  const fetchTranslations = useCallback(async (lang: SupportedLanguage) => {
    if (lang === "EN") {
      setT(defaultTranslations);
      return;
    }

    // Check if this language has already been fetched
    if (fetchedLanguages.has(lang)) {
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

      // Cache the translations and mark as fetched
      translationCache[lang] = newTranslations;
      fetchedLanguages.add(lang);

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

  // Load language preference from localStorage on mount
  useEffect(() => {
    if (initialLoadDone.current) return;
    initialLoadDone.current = true;

    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("language") as SupportedLanguage;
      if (savedLang && LANGUAGES[savedLang]) {
        setLanguageState(savedLang);
        // Fetch translations for the saved language
        if (savedLang !== "EN") {
          fetchTranslations(savedLang);
        }
      }
    }
  }, [fetchTranslations]);

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
