/**
 * Countries Configuration for Google Ads
 *
 * Contains country data including:
 * - ISO country codes
 * - Languages spoken
 * - Google Ads geo targeting IDs
 * - Language targeting IDs
 */

import { SupportedLanguage } from '@/lib/translations';

// Country configuration for ads
export interface CountryConfig {
  code: string;          // ISO 3166-1 alpha-2
  name: string;          // English name
  nativeName: string;    // Name in local language
  languages: SupportedLanguage[]; // Supported ad languages
  geoTargetId: number;   // Google Ads geo target constant
  currencyCode: string;  // ISO 4217
  timezone: string;      // IANA timezone
  priority: 'high' | 'medium' | 'low'; // Ad spend priority
}

// Google Ads Language Target Constants
export const LANGUAGE_TARGETS: Record<SupportedLanguage, number> = {
  EN: 1000, // English
  ZH: 1017, // Chinese (Simplified)
  ES: 1003, // Spanish
  PT: 1014, // Portuguese
  FR: 1002, // French
  RU: 1031, // Russian
  HI: 1023, // Hindi
};

// Primary countries for Google Ads targeting
// EXCLUDES visa-free countries: GB, DE, FR, IT, ES, RU, SG, CL, PH, ID, MY, TH
// (45-day visa-free: GB, DE, FR, IT, ES, RU; 30-day: SG, PH, ID, MY, TH; 21-day: CL)
export const COUNTRIES: CountryConfig[] = [
  // TIER 1 - High Priority (visa-required countries only)
  {
    code: 'US',
    name: 'United States',
    nativeName: 'United States',
    languages: ['EN', 'ES'],
    geoTargetId: 2840,
    currencyCode: 'USD',
    timezone: 'America/New_York',
    priority: 'high',
  },
  {
    code: 'CA',
    name: 'Canada',
    nativeName: 'Canada',
    languages: ['EN', 'FR'],
    geoTargetId: 2124,
    currencyCode: 'CAD',
    timezone: 'America/Toronto',
    priority: 'high',
  },
  {
    code: 'AU',
    name: 'Australia',
    nativeName: 'Australia',
    languages: ['EN'],
    geoTargetId: 2036,
    currencyCode: 'AUD',
    timezone: 'Australia/Sydney',
    priority: 'high',
  },
  {
    code: 'NZ',
    name: 'New Zealand',
    nativeName: 'New Zealand',
    languages: ['EN'],
    geoTargetId: 2554,
    currencyCode: 'NZD',
    timezone: 'Pacific/Auckland',
    priority: 'high',
  },

  // TIER 2 - Medium Priority (Europe - visa-required only)
  {
    code: 'NL',
    name: 'Netherlands',
    nativeName: 'Nederland',
    languages: ['EN'],
    geoTargetId: 2528,
    currencyCode: 'EUR',
    timezone: 'Europe/Amsterdam',
    priority: 'medium',
  },

  // Latin America (visa-required only)
  {
    code: 'MX',
    name: 'Mexico',
    nativeName: 'Mexico',
    languages: ['ES'],
    geoTargetId: 2484,
    currencyCode: 'MXN',
    timezone: 'America/Mexico_City',
    priority: 'medium',
  },
  {
    code: 'BR',
    name: 'Brazil',
    nativeName: 'Brasil',
    languages: ['PT'],
    geoTargetId: 2076,
    currencyCode: 'BRL',
    timezone: 'America/Sao_Paulo',
    priority: 'medium',
  },
  {
    code: 'AR',
    name: 'Argentina',
    nativeName: 'Argentina',
    languages: ['ES'],
    geoTargetId: 2032,
    currencyCode: 'ARS',
    timezone: 'America/Argentina/Buenos_Aires',
    priority: 'medium',
  },
  {
    code: 'CO',
    name: 'Colombia',
    nativeName: 'Colombia',
    languages: ['ES'],
    geoTargetId: 2170,
    currencyCode: 'COP',
    timezone: 'America/Bogota',
    priority: 'low',
  },

  // TIER 3 - Lower Priority (Asia - visa-required only)
  {
    code: 'IN',
    name: 'India',
    nativeName: 'भारत',
    languages: ['HI', 'EN'],
    geoTargetId: 2356,
    currencyCode: 'INR',
    timezone: 'Asia/Kolkata',
    priority: 'low',
  },
];

// Country code to language mapping for auto-detection
// Includes only visa-required countries + common visa-required countries not in COUNTRIES array
export const COUNTRY_TO_PRIMARY_LANGUAGE: Record<string, SupportedLanguage> = {
  // Spanish-speaking (visa-required)
  MX: 'ES', AR: 'ES', CO: 'ES', PE: 'ES', VE: 'ES',
  EC: 'ES', GT: 'ES', CU: 'ES', BO: 'ES', DO: 'ES', HN: 'ES', PY: 'ES',
  SV: 'ES', NI: 'ES', CR: 'ES', PA: 'ES', UY: 'ES',

  // Portuguese-speaking (visa-required)
  BR: 'PT', PT: 'PT', AO: 'PT', MZ: 'PT',

  // French-speaking (visa-required)
  BE: 'FR', CH: 'FR', SN: 'FR', CI: 'FR', CM: 'FR',
  MG: 'FR', ML: 'FR', BF: 'FR', NE: 'FR', TG: 'FR', BJ: 'FR',

  // Hindi-speaking (visa-required)
  IN: 'HI',

  // English-speaking (visa-required only)
  US: 'EN', CA: 'EN', AU: 'EN', NZ: 'EN', NL: 'EN', IE: 'EN',
  ZA: 'EN', NG: 'EN', KE: 'EN', GH: 'EN',
};

/**
 * Get country config by code
 */
export function getCountryConfig(code: string): CountryConfig | undefined {
  return COUNTRIES.find((c) => c.code === code.toUpperCase());
}

/**
 * Get all countries for a language
 */
export function getCountriesForLanguage(language: SupportedLanguage): CountryConfig[] {
  return COUNTRIES.filter((c) => c.languages.includes(language));
}

/**
 * Get primary language for a country
 */
export function getPrimaryLanguageForCountry(countryCode: string): SupportedLanguage {
  return COUNTRY_TO_PRIMARY_LANGUAGE[countryCode.toUpperCase()] || 'EN';
}

/**
 * Get all high-priority countries (for campaign creation)
 */
export function getHighPriorityCountries(): CountryConfig[] {
  return COUNTRIES.filter((c) => c.priority === 'high');
}

/**
 * Get countries by priority
 */
export function getCountriesByPriority(
  priority: 'high' | 'medium' | 'low'
): CountryConfig[] {
  return COUNTRIES.filter((c) => c.priority === priority);
}
