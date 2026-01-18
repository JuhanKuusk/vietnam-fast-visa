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

// Map country codes to preferred languages
const COUNTRY_TO_LANGUAGE: Record<string, SupportedLanguage> = {
  // Spanish-speaking countries
  ES: "ES", MX: "ES", AR: "ES", CO: "ES", CL: "ES", PE: "ES", VE: "ES",
  EC: "ES", GT: "ES", CU: "ES", BO: "ES", DO: "ES", HN: "ES", PY: "ES",
  SV: "ES", NI: "ES", CR: "ES", PA: "ES", UY: "ES",
  // Portuguese-speaking countries
  BR: "PT", PT: "PT", AO: "PT", MZ: "PT",
  // French-speaking countries
  FR: "FR", BE: "FR", CH: "FR", CA: "FR", SN: "FR", CI: "FR", CM: "FR",
  MG: "FR", ML: "FR", BF: "FR", NE: "FR", TG: "FR", BJ: "FR",
  // Russian-speaking countries
  RU: "RU", BY: "RU", KZ: "RU", KG: "RU", UA: "RU",
  // Hindi-speaking - only India
  IN: "HI",
  // All other countries default to English (handled in code)
};

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

  // Load language preference from localStorage on mount, or detect from geolocation
  useEffect(() => {
    if (initialLoadDone.current) return;
    initialLoadDone.current = true;

    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("language") as SupportedLanguage;

      // If user has explicitly set a language before, use that
      if (savedLang && LANGUAGES[savedLang]) {
        setLanguageState(savedLang);
        loadTranslations(savedLang);
        return;
      }

      // No saved language - detect from geolocation
      const detectLanguageFromLocation = async () => {
        try {
          const response = await fetch("/api/geolocation");
          if (response.ok) {
            const data = await response.json();
            const countryCode = data.countryCode;
            const detectedLang = COUNTRY_TO_LANGUAGE[countryCode] || "EN";

            // Set the detected language (but don't save to localStorage yet)
            // Only save when user explicitly changes language
            setLanguageState(detectedLang);
            loadTranslations(detectedLang);
          }
        } catch (error) {
          // On error, default to English
          console.error("Failed to detect language from location:", error);
        }
      };

      detectLanguageFromLocation();
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
