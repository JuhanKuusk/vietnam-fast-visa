/**
 * Currency conversion utility
 * Uses ExchangeRate-API's free open access endpoint (no API key required)
 * https://www.exchangerate-api.com/docs/free
 *
 * Rate limited to once per day updates, data refreshes every 24 hours
 */

// Cache the exchange rate to avoid excessive API calls
let cachedRate: { rate: number; timestamp: number } | null = null;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Fallback rate in case API fails (approximate USD to CNY rate as of Feb 2026)
const FALLBACK_USD_TO_CNY = 7.25;

/**
 * Fetch the current USD to CNY exchange rate
 * Uses free ExchangeRate-API with 24-hour caching
 */
export async function getUsdToCnyRate(): Promise<number> {
  // Check if we have a valid cached rate
  if (cachedRate && Date.now() - cachedRate.timestamp < CACHE_DURATION) {
    return cachedRate.rate;
  }

  try {
    // ExchangeRate-API free endpoint (no API key required)
    const response = await fetch(
      "https://open.er-api.com/v6/latest/USD",
      { next: { revalidate: 86400 } } // Cache for 24 hours in Next.js
    );

    if (!response.ok) {
      console.warn("Currency API returned non-OK status, using fallback rate");
      return FALLBACK_USD_TO_CNY;
    }

    const data = await response.json();

    if (data.result === "success" && data.rates?.CNY) {
      const rate = data.rates.CNY;
      cachedRate = { rate, timestamp: Date.now() };
      return rate;
    }

    console.warn("Unexpected API response format, using fallback rate");
    return FALLBACK_USD_TO_CNY;
  } catch (error) {
    console.error("Failed to fetch exchange rate:", error);
    return FALLBACK_USD_TO_CNY;
  }
}

/**
 * Convert USD amount to CNY
 * @param usdAmount - Amount in USD
 * @param rate - Optional exchange rate (if already fetched)
 * @returns Amount in CNY, rounded to nearest integer
 */
export function convertUsdToCny(usdAmount: number, rate: number = FALLBACK_USD_TO_CNY): number {
  return Math.round(usdAmount * rate);
}

/**
 * Format price for display in CNY
 * @param cnyAmount - Amount in CNY
 * @returns Formatted string like "¥725" or "￥725"
 */
export function formatCnyPrice(cnyAmount: number): string {
  return `¥${cnyAmount.toLocaleString("zh-CN")}`;
}

/**
 * Format price for display in USD
 * @param usdAmount - Amount in USD
 * @returns Formatted string like "US$100"
 */
export function formatUsdPrice(usdAmount: number): string {
  return `US$${usdAmount}`;
}
