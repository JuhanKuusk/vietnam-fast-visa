import { NextRequest, NextResponse } from "next/server";
import {
  getFlightPriceWithFallback,
  getCountryRiskLevel,
  shouldShowRiskBlock,
  COUNTRY_AIRPORTS,
  FALLBACK_PRICES,
  getDefaultAirport,
  getAirportByCode,
} from "@/lib/amadeus";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const countryCode = searchParams.get("country")?.toUpperCase();
    const airportCode = searchParams.get("airport")?.toUpperCase();
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
        airportCode,
        visaSpeed,
      });
    }

    // Get the airport info - either by specific code or default for country
    let airport = null;
    let effectiveAirportCode = airportCode;

    if (airportCode) {
      // Find the specific airport
      const airportInfo = getAirportByCode(airportCode);
      if (airportInfo) {
        airport = airportInfo.airport;
      }
    }

    if (!airport) {
      // Fall back to default airport for country
      airport = getDefaultAirport(countryCode);
      effectiveAirportCode = airport?.code;
    }

    const riskLevel = getCountryRiskLevel(countryCode);

    // Get flight price metrics with specific airport
    const priceMetrics = await getFlightPriceWithFallback(countryCode, effectiveAirportCode);

    if (!priceMetrics) {
      // Use fallback if available
      const fallback = FALLBACK_PRICES[countryCode];
      if (fallback) {
        return NextResponse.json({
          showRisk: true,
          countryCode,
          airportCode: effectiveAirportCode,
          visaSpeed,
          riskLevel,
          origin: airport ? `${airport.city} (${airport.code})` : countryCode,
          priceRange: {
            min: fallback.minimumPrice,
            max: fallback.maximumPrice,
            median: fallback.medianPrice,
          },
          currency: "USD",
          isFallback: true,
        }, {
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate',
          },
        });
      }

      return NextResponse.json({
        showRisk: false,
        countryCode,
        airportCode: effectiveAirportCode,
        visaSpeed,
        reason: "No price data available",
      });
    }

    return NextResponse.json({
      showRisk: true,
      countryCode,
      airportCode: effectiveAirportCode,
      visaSpeed,
      riskLevel,
      origin: airport ? `${airport.city} (${airport.code})` : countryCode,
      priceRange: {
        min: priceMetrics.minimumPrice,
        max: priceMetrics.maximumPrice,
        median: priceMetrics.medianPrice,
      },
      currency: "USD",
      isFallback: false,
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error) {
    console.error("Error fetching flight price risk:", error);
    return NextResponse.json(
      { error: "Failed to fetch flight price data" },
      { status: 500 }
    );
  }
}
