"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import {
  SiteConfig,
  SITES,
  getSiteConfig,
  getTestimonials,
  getTrustBadges,
  formatPrice,
  getThemeCSSVariables,
  Testimonial,
  TrustBadge,
  INDIAN_PAYMENT_METHODS,
  CHINESE_PAYMENT_METHODS,
} from "@/lib/site-config";

// =============================================================================
// TYPES
// =============================================================================

interface SiteContextType {
  // Core config
  siteConfig: SiteConfig;
  siteId: string;
  domain: string;

  // Theme helpers
  theme: SiteConfig["theme"];
  cssVariables: Record<string, string>;

  // Layout helpers
  layout: SiteConfig["layout"];
  isIndiaSite: boolean;
  isUrgentSite: boolean;
  isChinaSite: boolean;

  // Content helpers
  content: SiteConfig["content"];
  siteName: string;
  tagline: string;

  // Data
  testimonials: Testimonial[];
  trustBadges: TrustBadge[];
  indianPaymentMethods: typeof INDIAN_PAYMENT_METHODS;
  chinesePaymentMethods: typeof CHINESE_PAYMENT_METHODS;

  // Utilities
  formatSitePrice: (usdAmount: number) => string;
  getPrimaryColor: () => string;
}

// =============================================================================
// CONTEXT
// =============================================================================

const SiteContext = createContext<SiteContextType | undefined>(undefined);

// =============================================================================
// HELPER: Get domain from cookie (client-side)
// =============================================================================

function getDomainFromCookie(): string {
  if (typeof document === "undefined") return "vietnamvisahelp.com";

  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === "site-domain" && value) {
      return value;
    }
  }

  // Fallback to window.location
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname.replace(/^www\./, "").toLowerCase();
    // Handle localhost
    if (hostname === "localhost" || hostname.includes("127.0.0.1")) {
      return "vietnamvisahelp.com"; // Default for local dev
    }
    return hostname;
  }

  return "vietnamvisahelp.com";
}

// =============================================================================
// PROVIDER
// =============================================================================

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [domain, setDomain] = useState<string>("vietnamvisahelp.com");
  const [isHydrated, setIsHydrated] = useState(false);

  // Detect domain on mount
  useEffect(() => {
    const detectedDomain = getDomainFromCookie();
    setDomain(detectedDomain);
    setIsHydrated(true);
  }, []);

  // Get site config based on domain
  const siteConfig = useMemo(() => getSiteConfig(domain), [domain]);

  // Memoized values
  const contextValue = useMemo<SiteContextType>(() => {
    const testimonials = getTestimonials(siteConfig.id);
    const trustBadges = getTrustBadges(siteConfig.id);
    const cssVariables = getThemeCSSVariables(siteConfig.theme);

    return {
      // Core
      siteConfig,
      siteId: siteConfig.id,
      domain,

      // Theme
      theme: siteConfig.theme,
      cssVariables,

      // Layout
      layout: siteConfig.layout,
      isIndiaSite: siteConfig.id === "vietnamvisaurgent-india",
      isUrgentSite: siteConfig.id.includes("urgent"),
      isChinaSite: siteConfig.id === "yueqian-china",

      // Content
      content: siteConfig.content,
      siteName: siteConfig.content.siteName,
      tagline: siteConfig.content.tagline,

      // Data
      testimonials,
      trustBadges,
      indianPaymentMethods: INDIAN_PAYMENT_METHODS,
      chinesePaymentMethods: CHINESE_PAYMENT_METHODS,

      // Utilities
      formatSitePrice: (usdAmount: number) => formatPrice(usdAmount, siteConfig),
      getPrimaryColor: () => siteConfig.theme.primaryColor,
    };
  }, [siteConfig, domain]);

  // Apply CSS variables to document root
  useEffect(() => {
    if (typeof document !== "undefined" && isHydrated) {
      const root = document.documentElement;
      Object.entries(contextValue.cssVariables).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
    }
  }, [contextValue.cssVariables, isHydrated]);

  return (
    <SiteContext.Provider value={contextValue}>
      {children}
    </SiteContext.Provider>
  );
}

// =============================================================================
// HOOK
// =============================================================================

export function useSite() {
  const context = useContext(SiteContext);
  if (context === undefined) {
    throw new Error("useSite must be used within a SiteProvider");
  }
  return context;
}

// =============================================================================
// SERVER-SIDE HELPER
// =============================================================================

/**
 * Get site config on the server side using headers
 * Use this in Server Components
 */
export function getServerSiteConfig(headers: Headers): SiteConfig {
  const domain = headers.get("x-site-domain") || "vietnamvisahelp.com";
  return getSiteConfig(domain);
}
