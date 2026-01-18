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
  ES: 1003, // Spanish
  PT: 1014, // Portuguese
  FR: 1002, // French
  RU: 1031, // Russian
  HI: 1023, // Hindi
};

// Primary countries for Google Ads targeting
export const COUNTRIES: CountryConfig[] = [
  // TIER 1 - High Priority
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
  {
    code: 'SG',
    name: 'Singapore',
    nativeName: 'Singapore',
    languages: ['EN'],
    geoTargetId: 2702,
    currencyCode: 'SGD',
    timezone: 'Asia/Singapore',
    priority: 'high',
  },

  // TIER 2 - Medium Priority (Europe)
  {
    code: 'GB',
    name: 'United Kingdom',
    nativeName: 'United Kingdom',
    languages: ['EN'],
    geoTargetId: 2826,
    currencyCode: 'GBP',
    timezone: 'Europe/London',
    priority: 'medium',
  },
  {
    code: 'DE',
    name: 'Germany',
    nativeName: 'Deutschland',
    languages: ['EN'], // Use EN for Germany - most tourists speak English
    geoTargetId: 2276,
    currencyCode: 'EUR',
    timezone: 'Europe/Berlin',
    priority: 'medium',
  },
  {
    code: 'FR',
    name: 'France',
    nativeName: 'France',
    languages: ['FR', 'EN'],
    geoTargetId: 2250,
    currencyCode: 'EUR',
    timezone: 'Europe/Paris',
    priority: 'medium',
  },
  {
    code: 'IT',
    name: 'Italy',
    nativeName: 'Italia',
    languages: ['EN'],
    geoTargetId: 2380,
    currencyCode: 'EUR',
    timezone: 'Europe/Rome',
    priority: 'medium',
  },
  {
    code: 'ES',
    name: 'Spain',
    nativeName: 'Espana',
    languages: ['ES', 'EN'],
    geoTargetId: 2724,
    currencyCode: 'EUR',
    timezone: 'Europe/Madrid',
    priority: 'medium',
  },
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
  {
    code: 'RU',
    name: 'Russia',
    nativeName: 'Россия',
    languages: ['RU', 'EN'],
    geoTargetId: 2643,
    currencyCode: 'RUB',
    timezone: 'Europe/Moscow',
    priority: 'medium',
  },

  // Latin America
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
  {
    code: 'CL',
    name: 'Chile',
    nativeName: 'Chile',
    languages: ['ES'],
    geoTargetId: 2152,
    currencyCode: 'CLP',
    timezone: 'America/Santiago',
    priority: 'low',
  },

  // TIER 3 - Lower Priority (Asia/India)
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
  {
    code: 'PH',
    name: 'Philippines',
    nativeName: 'Pilipinas',
    languages: ['EN'],
    geoTargetId: 2608,
    currencyCode: 'PHP',
    timezone: 'Asia/Manila',
    priority: 'low',
  },
  {
    code: 'ID',
    name: 'Indonesia',
    nativeName: 'Indonesia',
    languages: ['EN'],
    geoTargetId: 2360,
    currencyCode: 'IDR',
    timezone: 'Asia/Jakarta',
    priority: 'low',
  },
  {
    code: 'MY',
    name: 'Malaysia',
    nativeName: 'Malaysia',
    languages: ['EN'],
    geoTargetId: 2458,
    currencyCode: 'MYR',
    timezone: 'Asia/Kuala_Lumpur',
    priority: 'low',
  },
  {
    code: 'TH',
    name: 'Thailand',
    nativeName: 'ประเทศไทย',
    languages: ['EN'],
    geoTargetId: 2764,
    currencyCode: 'THB',
    timezone: 'Asia/Bangkok',
    priority: 'low',
  },
];

// Country code to language mapping for auto-detection
export const COUNTRY_TO_PRIMARY_LANGUAGE: Record<string, SupportedLanguage> = {
  // Spanish-speaking
  ES: 'ES', MX: 'ES', AR: 'ES', CO: 'ES', CL: 'ES', PE: 'ES', VE: 'ES',
  EC: 'ES', GT: 'ES', CU: 'ES', BO: 'ES', DO: 'ES', HN: 'ES', PY: 'ES',
  SV: 'ES', NI: 'ES', CR: 'ES', PA: 'ES', UY: 'ES',

  // Portuguese-speaking
  BR: 'PT', PT: 'PT', AO: 'PT', MZ: 'PT',

  // French-speaking
  FR: 'FR', BE: 'FR', CH: 'FR', SN: 'FR', CI: 'FR', CM: 'FR',
  MG: 'FR', ML: 'FR', BF: 'FR', NE: 'FR', TG: 'FR', BJ: 'FR',

  // Russian-speaking
  RU: 'RU', BY: 'RU', KZ: 'RU', KG: 'RU', UA: 'RU',

  // Hindi-speaking
  IN: 'HI',

  // English-speaking (default)
  US: 'EN', CA: 'EN', GB: 'EN', AU: 'EN', NZ: 'EN', IE: 'EN', SG: 'EN',
  ZA: 'EN', PH: 'EN', MY: 'EN', NG: 'EN', KE: 'EN', GH: 'EN',
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
