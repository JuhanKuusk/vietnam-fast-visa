import { NextRequest, NextResponse } from "next/server";
import {
  getFlightPriceWithFallback,
  getCountryRiskLevel,
  shouldShowRiskBlock,
  COUNTRY_AIRPORTS,
  FALLBACK_PRICES,
} from "@/lib/amadeus";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const countryCode = searchParams.get("country")?.toUpperCase();
    const visaSpeed = searchParams.get("visaSpeed") || "30-min";

    if (!countryCode) {
      return NextResponse.json(
        { error: "Country code is required" },
        { status: 400 }
      );
    }

    // Check if we should show the risk block for this country/speed combination
    const showRisk = shouldShowRiskBlock(countryCode, visaSpeed);

    if (!showRisk) {
      return NextResponse.json({
        showRisk: false,
        countryCode,
        visaSpeed,
      });
    }

    // Get flight price metrics
    const priceMetrics = await getFlightPriceWithFallback(countryCode);
    const airport = COUNTRY_AIRPORTS[countryCode];
    const riskLevel = getCountryRiskLevel(countryCode);

    if (!priceMetrics || !airport) {
      // Use fallback if available
      const fallback = FALLBACK_PRICES[countryCode];
      if (fallback) {
        return NextResponse.json({
          showRisk: true,
          countryCode,
          visaSpeed,
          riskLevel,
          origin: airport?.name || countryCode,
          priceRange: {
            min: fallback.minimumPrice,
            max: fallback.maximumPrice,
            median: fallback.medianPrice,
          },
          currency: "USD",
          isFallback: true,
        });
      }

      return NextResponse.json({
        showRisk: false,
        countryCode,
        visaSpeed,
        reason: "No price data available",
      });
    }

    return NextResponse.json({
      showRisk: true,
      countryCode,
      visaSpeed,
      riskLevel,
      origin: airport.name,
      priceRange: {
        min: priceMetrics.minimumPrice,
        max: priceMetrics.maximumPrice,
        median: priceMetrics.medianPrice,
      },
      currency: "USD",
      isFallback: false,
    });
  } catch (error) {
    console.error("Error fetching flight price risk:", error);
    return NextResponse.json(
      { error: "Failed to fetch flight price data" },
      { status: 500 }
    );
  }
}
