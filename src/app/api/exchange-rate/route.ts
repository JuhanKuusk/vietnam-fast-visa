import { NextResponse } from "next/server";

// Fallback rate (approximate USD to CNY as of Feb 2026)
const FALLBACK_RATE = 7.25;

// Cache the rate in memory (server-side)
let cachedData: { rate: number; timestamp: number } | null = null;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export async function GET() {
  // Check if we have a valid cached rate
  if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
    return NextResponse.json({
      rate: cachedData.rate,
      cached: true,
      source: "exchangerate-api",
    });
  }

  try {
    // ExchangeRate-API free endpoint (no API key required)
    // https://www.exchangerate-api.com/docs/free
    const response = await fetch("https://open.er-api.com/v6/latest/USD", {
      next: { revalidate: 86400 }, // Cache for 24 hours
    });

    if (!response.ok) {
      console.warn("Currency API returned non-OK status:", response.status);
      return NextResponse.json({
        rate: FALLBACK_RATE,
        cached: false,
        source: "fallback",
        error: "API returned non-OK status",
      });
    }

    const data = await response.json();

    if (data.result === "success" && data.rates?.CNY) {
      const rate = data.rates.CNY;

      // Cache the rate
      cachedData = { rate, timestamp: Date.now() };

      return NextResponse.json({
        rate,
        cached: false,
        source: "exchangerate-api",
        lastUpdate: data.time_last_update_utc,
      });
    }

    console.warn("Unexpected API response format");
    return NextResponse.json({
      rate: FALLBACK_RATE,
      cached: false,
      source: "fallback",
      error: "Unexpected API response",
    });
  } catch (error) {
    console.error("Failed to fetch exchange rate:", error);
    return NextResponse.json({
      rate: FALLBACK_RATE,
      cached: false,
      source: "fallback",
      error: "Failed to fetch rate",
    });
  }
}
