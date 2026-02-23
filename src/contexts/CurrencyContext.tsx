"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext";

interface CurrencyContextType {
  /** Current exchange rate USD to CNY */
  usdToCnyRate: number;
  /** Whether to show prices in CNY (true for Chinese users) */
  showCny: boolean;
  /** Convert USD to CNY */
  convertToCny: (usdAmount: number) => number;
  /** Format price based on current language */
  formatPrice: (usdAmount: number) => string;
  /** Whether rate is loading */
  isLoading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Fallback rate (approximate USD to CNY as of Feb 2026)
const FALLBACK_RATE = 7.25;

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage();
  const [usdToCnyRate, setUsdToCnyRate] = useState(FALLBACK_RATE);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch exchange rate on mount
  useEffect(() => {
    async function fetchRate() {
      try {
        // Use our API route to fetch the rate (avoids CORS issues and caches server-side)
        const response = await fetch("/api/exchange-rate");
        if (response.ok) {
          const data = await response.json();
          if (data.rate) {
            setUsdToCnyRate(data.rate);
          }
        }
      } catch (error) {
        console.error("Failed to fetch exchange rate:", error);
        // Keep using fallback rate
      } finally {
        setIsLoading(false);
      }
    }

    fetchRate();
  }, []);

  // Show CNY for Chinese language users
  const showCny = language === "ZH";

  const convertToCny = (usdAmount: number): number => {
    return Math.round(usdAmount * usdToCnyRate);
  };

  const formatPrice = (usdAmount: number): string => {
    if (showCny) {
      const cnyAmount = convertToCny(usdAmount);
      return `¥${cnyAmount.toLocaleString("zh-CN")}`;
    }
    return `US$${usdAmount}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        usdToCnyRate,
        showCny,
        convertToCny,
        formatPrice,
        isLoading,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
