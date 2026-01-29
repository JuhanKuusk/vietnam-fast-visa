/**
 * Pricing Engine Business Rules
 *
 * Implements tier-based pricing for different countries and services.
 * Prices are determined by:
 * - Country tier (economic level)
 * - Service type (urgency)
 * - Time-based modifiers (optional)
 */

import { ServiceType, SERVICES } from './service-availability';
import { getVietnamOfficeStatus, isWeekendWindow } from './vietnam-time';

// Country tiers based on economic factors and willingness to pay
export type CountryTier = 'TIER1' | 'TIER2' | 'TIER3';

// Country to tier mapping
export const COUNTRY_TIERS: Record<string, CountryTier> = {
  // TIER 1 - High income countries (highest prices)
  US: 'TIER1', // United States
  CA: 'TIER1', // Canada
  AU: 'TIER1', // Australia
  NZ: 'TIER1', // New Zealand
  SG: 'TIER1', // Singapore
  CH: 'TIER1', // Switzerland
  NO: 'TIER1', // Norway
  AE: 'TIER1', // United Arab Emirates
  QA: 'TIER1', // Qatar
  KW: 'TIER1', // Kuwait
  HK: 'TIER1', // Hong Kong
  JP: 'TIER1', // Japan
  KR: 'TIER1', // South Korea

  // TIER 2 - Medium income countries (medium prices)
  GB: 'TIER2', // United Kingdom
  DE: 'TIER2', // Germany
  FR: 'TIER2', // France
  IT: 'TIER2', // Italy
  ES: 'TIER2', // Spain
  NL: 'TIER2', // Netherlands
  BE: 'TIER2', // Belgium
  AT: 'TIER2', // Austria
  SE: 'TIER2', // Sweden
  DK: 'TIER2', // Denmark
  FI: 'TIER2', // Finland
  IE: 'TIER2', // Ireland
  PT: 'TIER2', // Portugal
  PL: 'TIER2', // Poland
  CZ: 'TIER2', // Czech Republic
  RU: 'TIER2', // Russia
  BR: 'TIER2', // Brazil
  MX: 'TIER2', // Mexico
  AR: 'TIER2', // Argentina
  CL: 'TIER2', // Chile
  TW: 'TIER2', // Taiwan
  IL: 'TIER2', // Israel
  SA: 'TIER2', // Saudi Arabia
  ZA: 'TIER2', // South Africa
  TR: 'TIER2', // Turkey

  // TIER 3 - Lower income countries (lowest prices)
  IN: 'TIER3', // India
  PH: 'TIER3', // Philippines
  ID: 'TIER3', // Indonesia
  TH: 'TIER3', // Thailand
  MY: 'TIER3', // Malaysia
  VN: 'TIER3', // Vietnam (domestic)
  PK: 'TIER3', // Pakistan
  BD: 'TIER3', // Bangladesh
  LK: 'TIER3', // Sri Lanka
  NP: 'TIER3', // Nepal
  MM: 'TIER3', // Myanmar
  KH: 'TIER3', // Cambodia
  LA: 'TIER3', // Laos
  EG: 'TIER3', // Egypt
  NG: 'TIER3', // Nigeria
  KE: 'TIER3', // Kenya
  GH: 'TIER3', // Ghana
  CO: 'TIER3', // Colombia
  PE: 'TIER3', // Peru
  VE: 'TIER3', // Venezuela
  UA: 'TIER3', // Ukraine
  RO: 'TIER3', // Romania
  BG: 'TIER3', // Bulgaria
  HR: 'TIER3', // Croatia
  HU: 'TIER3', // Hungary
};

// Base prices in USD by service type and tier
export const BASE_PRICES: Record<ServiceType, Record<CountryTier, number>> = {
  URGENT_1H: { TIER1: 299, TIER2: 249, TIER3: 199 },
  URGENT_2H: { TIER1: 249, TIER2: 199, TIER3: 159 },
  URGENT_4H: { TIER1: 199, TIER2: 169, TIER3: 139 },
  '1DAY': { TIER1: 149, TIER2: 129, TIER3: 99 },
  '2DAY': { TIER1: 129, TIER2: 109, TIER3: 89 },
  WEEKEND: { TIER1: 349, TIER2: 299, TIER3: 249 },
  STANDARD: { TIER1: 79, TIER2: 69, TIER3: 49 },
};

// Price modifiers
export interface PriceModifiers {
  // Surge pricing during high-demand periods (e.g., holidays)
  surgePremium?: number; // Percentage, e.g., 20 = 20% increase
  // Discount for early booking
  earlyBirdDiscount?: number; // Percentage
  // Multi-applicant discount
  groupDiscount?: number; // Percentage per additional person
  // Referral discount
  referralDiscount?: number; // Fixed amount in USD
}

// Pricing result
export interface PriceQuote {
  basePrice: number;
  finalPrice: number;
  currency: 'USD';
  countryCode: string;
  countryTier: CountryTier;
  serviceType: ServiceType;
  modifiers: {
    name: string;
    amount: number;
    type: 'percentage' | 'fixed';
  }[];
  breakdown: {
    base: number;
    adjustments: number;
    total: number;
  };
}

/**
 * Get the tier for a country code
 * Defaults to TIER2 for unknown countries
 */
export function getCountryTier(countryCode: string): CountryTier {
  return COUNTRY_TIERS[countryCode.toUpperCase()] || 'TIER2';
}

/**
 * Get base price for a service and country
 */
export function getBasePrice(
  serviceType: ServiceType,
  countryCode: string
): number {
  const tier = getCountryTier(countryCode);
  const prices = BASE_PRICES[serviceType];

  if (!prices) {
    throw new Error(`Unknown service type: ${serviceType}`);
  }

  return prices[tier];
}

/**
 * Calculate the final price with all modifiers
 */
export function calculatePrice(
  serviceType: ServiceType,
  countryCode: string,
  modifiers?: PriceModifiers,
  applicantCount: number = 1
): PriceQuote {
  const tier = getCountryTier(countryCode);
  const basePrice = getBasePrice(serviceType, countryCode);

  const appliedModifiers: PriceQuote['modifiers'] = [];
  let adjustments = 0;

  // Apply surge premium
  if (modifiers?.surgePremium) {
    const surgeAmount = basePrice * (modifiers.surgePremium / 100);
    adjustments += surgeAmount;
    appliedModifiers.push({
      name: 'Surge Premium',
      amount: modifiers.surgePremium,
      type: 'percentage',
    });
  }

  // Apply early bird discount
  if (modifiers?.earlyBirdDiscount) {
    const discountAmount = basePrice * (modifiers.earlyBirdDiscount / 100);
    adjustments -= discountAmount;
    appliedModifiers.push({
      name: 'Early Bird Discount',
      amount: -modifiers.earlyBirdDiscount,
      type: 'percentage',
    });
  }

  // Apply group discount (for additional applicants)
  if (applicantCount > 1 && modifiers?.groupDiscount) {
    const additionalApplicants = applicantCount - 1;
    const discountPerPerson = basePrice * (modifiers.groupDiscount / 100);
    const totalGroupDiscount = discountPerPerson * additionalApplicants;
    adjustments -= totalGroupDiscount;
    appliedModifiers.push({
      name: `Group Discount (${additionalApplicants} extra)`,
      amount: -totalGroupDiscount,
      type: 'fixed',
    });
  }

  // Apply referral discount
  if (modifiers?.referralDiscount) {
    adjustments -= modifiers.referralDiscount;
    appliedModifiers.push({
      name: 'Referral Discount',
      amount: -modifiers.referralDiscount,
      type: 'fixed',
    });
  }

  // Calculate final price (minimum $29 to cover costs)
  const calculatedPrice = basePrice + adjustments;
  const finalPrice = Math.max(29, Math.round(calculatedPrice));

  return {
    basePrice,
    finalPrice,
    currency: 'USD',
    countryCode: countryCode.toUpperCase(),
    countryTier: tier,
    serviceType,
    modifiers: appliedModifiers,
    breakdown: {
      base: basePrice,
      adjustments: Math.round(adjustments),
      total: finalPrice,
    },
  };
}

/**
 * Get all prices for a country (for displaying pricing table)
 */
export function getPricingTable(countryCode: string): Record<ServiceType, number> {
  const tier = getCountryTier(countryCode);
  const prices: Partial<Record<ServiceType, number>> = {};

  for (const service of SERVICES) {
    prices[service.type] = BASE_PRICES[service.type][tier];
  }

  return prices as Record<ServiceType, number>;
}

/**
 * Get pricing for Google Ads (to display in ad copy)
 * Returns the "from" price for a service type
 */
export function getAdPrice(
  serviceType: ServiceType,
  countryCode: string
): string {
  const price = getBasePrice(serviceType, countryCode);
  return `$${price}`;
}

/**
 * Get dynamic pricing based on current demand/time
 * This can be used for real-time price adjustments
 */
export function getDynamicPriceModifiers(): PriceModifiers {
  const officeStatus = getVietnamOfficeStatus();
  const modifiers: PriceModifiers = {};

  // Apply weekend surge for weekend service
  if (isWeekendWindow()) {
    // No additional surge for weekend - already priced into WEEKEND service
  }

  // Could add holiday surge here
  if (officeStatus.isHoliday) {
    modifiers.surgePremium = 15; // 15% holiday premium
  }

  return modifiers;
}

/**
 * Format price for display with currency
 */
export function formatPrice(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Get pricing summary for a country (for logging/analytics)
 */
export function getPricingSummary(countryCode: string): {
  countryCode: string;
  tier: CountryTier;
  prices: Record<ServiceType, number>;
  cheapestService: { type: ServiceType; price: number };
  mostExpensiveService: { type: ServiceType; price: number };
} {
  const tier = getCountryTier(countryCode);
  const prices = getPricingTable(countryCode);

  const entries = Object.entries(prices) as [ServiceType, number][];
  const sorted = entries.sort((a, b) => a[1] - b[1]);

  return {
    countryCode: countryCode.toUpperCase(),
    tier,
    prices,
    cheapestService: { type: sorted[0][0], price: sorted[0][1] },
    mostExpensiveService: {
      type: sorted[sorted.length - 1][0],
      price: sorted[sorted.length - 1][1],
    },
  };
}

/**
 * Calculate Target CPA (Cost Per Acquisition) for Google Ads
 * Based on service price and desired profit margin
 */
export function calculateTargetCPA(
  serviceType: ServiceType,
  countryCode: string,
  targetMarginPercent: number = 60 // 60% profit margin target
): number {
  const price = getBasePrice(serviceType, countryCode);
  const targetCPA = price * ((100 - targetMarginPercent) / 100);

  // Minimum CPA to ensure ad visibility
  return Math.max(15, Math.round(targetCPA));
}

/**
 * Get recommended daily ad budget for a country
 * Based on tier and expected conversion volume
 */
export function getRecommendedDailyBudget(countryCode: string): number {
  const tier = getCountryTier(countryCode);

  switch (tier) {
    case 'TIER1':
      return 100; // $100/day for high-value countries
    case 'TIER2':
      return 50; // $50/day for medium-value countries
    case 'TIER3':
      return 25; // $25/day for lower-value countries
    default:
      return 50;
  }
}
