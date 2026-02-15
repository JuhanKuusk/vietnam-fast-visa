"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import {
  translations as defaultTranslations,
  SupportedLanguage,
  LANGUAGES,
} from "@/lib/translations";
import { getSiteConfig } from "@/lib/site-config";

// Import pre-translated static JSON files
import esTranslations from "@/locales/es.json";
import ptTranslations from "@/locales/pt.json";
import frTranslations from "@/locales/fr.json";
import ruTranslations from "@/locales/ru.json";
import hiTranslations from "@/locales/hi.json";
import zhTranslations from "@/locales/zh.json";

type TranslationsType = typeof defaultTranslations;

// Map country codes to preferred languages
const COUNTRY_TO_LANGUAGE: Record<string, SupportedLanguage> = {
  // Chinese-speaking countries/regions
  CN: "ZH", TW: "ZH", HK: "ZH", MO: "ZH", SG: "ZH",
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

// Helper to get domain from cookie
function getDomainFromCookie(): string {
  if (typeof document === "undefined") return "vietnamvisahelp.com";
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === "site-domain" && value) {
      return value;
    }
  }
  return "vietnamvisahelp.com";
}

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
  ZH: zhTranslations as TranslationsType,
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

  // Load language preference from localStorage on mount, or detect from site config/geolocation
  useEffect(() => {
    if (initialLoadDone.current) return;
    initialLoadDone.current = true;

    if (typeof window !== "undefined") {
      // First, check site config for default language
      const domain = getDomainFromCookie();
      const siteConfig = getSiteConfig(domain);
      const siteDefaultLanguage = siteConfig.behavior.defaultLanguage;
      const forceLanguage = siteConfig.behavior.forceLanguageForCountries;

      const savedLang = localStorage.getItem("language") as SupportedLanguage;

      // If site forces language (e.g., India site), use site's default
      if (forceLanguage && siteDefaultLanguage !== "EN") {
        setLanguageState(siteDefaultLanguage);
        loadTranslations(siteDefaultLanguage);
        return;
      }

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
            const detectedLang = COUNTRY_TO_LANGUAGE[countryCode] || siteDefaultLanguage;

            // Set the detected language (but don't save to localStorage yet)
            // Only save when user explicitly changes language
            setLanguageState(detectedLang);
            loadTranslations(detectedLang);
          } else {
            // Fallback to site default if geolocation fails
            setLanguageState(siteDefaultLanguage);
            loadTranslations(siteDefaultLanguage);
          }
        } catch (error) {
          // On error, use site default language
          console.error("Failed to detect language from location:", error);
          setLanguageState(siteDefaultLanguage);
          loadTranslations(siteDefaultLanguage);
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
