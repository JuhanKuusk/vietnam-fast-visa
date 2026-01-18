"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import {
  translations as defaultTranslations,
  SupportedLanguage,
  LANGUAGES,
} from "@/lib/translations";

// Import pre-translated static JSON files
import esTranslations from "@/locales/es.json";
import ptTranslations from "@/locales/pt.json";
import frTranslations from "@/locales/fr.json";
import ruTranslations from "@/locales/ru.json";
import hiTranslations from "@/locales/hi.json";

type TranslationsType = typeof defaultTranslations;

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: TranslationsType;
  isLoading: boolean;
  languages: typeof LANGUAGES;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Pre-loaded translations from static JSON files (no API calls needed!)
const staticTranslations: Record<SupportedLanguage, TranslationsType> = {
  EN: defaultTranslations,
  ES: esTranslations as TranslationsType,
  PT: ptTranslations as TranslationsType,
  FR: frTranslations as TranslationsType,
  RU: ruTranslations as TranslationsType,
  HI: hiTranslations as TranslationsType,
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>("EN");
  const [t, setT] = useState<TranslationsType>(defaultTranslations);
  const [isLoading, setIsLoading] = useState(false);
  const initialLoadDone = useRef(false);

  // Load translations from static files (instant, no API call)
  const loadTranslations = useCallback((lang: SupportedLanguage) => {
    setIsLoading(true);
    try {
      // Get translations from pre-loaded static files
      const translations = staticTranslations[lang] || defaultTranslations;
      setT(translations);
    } catch (error) {
      console.error("Failed to load translations:", error);
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
      loadTranslations(lang);
    },
    [loadTranslations]
  );

  // Load language preference from localStorage on mount
  useEffect(() => {
    if (initialLoadDone.current) return;
    initialLoadDone.current = true;

    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("language") as SupportedLanguage;
      if (savedLang && LANGUAGES[savedLang]) {
        setLanguageState(savedLang);
        // Load translations for the saved language (instant from static files)
        loadTranslations(savedLang);
      }
    }
  }, [loadTranslations]);

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
