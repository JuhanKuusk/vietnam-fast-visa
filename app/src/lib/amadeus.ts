// Amadeus Flight Price Analysis API Integration
// Used for displaying flight ticket risk warnings based on user's origin country

interface AmadeusToken {
  access_token: string;
  expires_in: number;
  expiresAt: number;
}

interface PriceMetrics {
  minimumPrice: number;
  medianPrice: number;
  maximumPrice: number;
}

interface FlightPriceData {
  origin: string;
  destination: string;
  currency: string;
  priceMetrics: PriceMetrics;
  fetchedAt: number;
}

// Cache for flight prices (country-based, 24h TTL)
const priceCache: Map<string, FlightPriceData> = new Map();
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Token cache
let tokenCache: AmadeusToken | null = null;

// Vietnam airport codes (primary destinations)
const VIETNAM_AIRPORTS = ["SGN", "HAN", "DAD"]; // Ho Chi Minh, Hanoi, Da Nang

// Country to primary airport mapping for origin countries
export const COUNTRY_AIRPORTS: Record<string, { code: string; name: string }> = {
  // High-risk countries (show risk block ALWAYS)
  US: { code: "JFK", name: "New York" },
  CA: { code: "YYZ", name: "Toronto" },
  AU: { code: "SYD", name: "Sydney" },
  NZ: { code: "AKL", name: "Auckland" },

  // Medium-risk countries (show on URGENT/WEEKEND only)
  GB: { code: "LHR", name: "London" },
  DE: { code: "FRA", name: "Frankfurt" },
  FR: { code: "CDG", name: "Paris" },
  NL: { code: "AMS", name: "Amsterdam" },
  SE: { code: "ARN", name: "Stockholm" },
  NO: { code: "OSL", name: "Oslo" },
  DK: { code: "CPH", name: "Copenhagen" },
  FI: { code: "HEL", name: "Helsinki" },
  IE: { code: "DUB", name: "Dublin" },
  CH: { code: "ZRH", name: "Zurich" },
  AT: { code: "VIE", name: "Vienna" },
  BE: { code: "BRU", name: "Brussels" },
  IT: { code: "FCO", name: "Rome" },
  ES: { code: "MAD", name: "Madrid" },
  PT: { code: "LIS", name: "Lisbon" },
  PL: { code: "WAW", name: "Warsaw" },
  CZ: { code: "PRG", name: "Prague" },

  // Low-risk countries (DON'T show risk block)
  IN: { code: "DEL", name: "Delhi" },
  TH: { code: "BKK", name: "Bangkok" },
  SG: { code: "SIN", name: "Singapore" },
  MY: { code: "KUL", name: "Kuala Lumpur" },
  ID: { code: "CGK", name: "Jakarta" },
  PH: { code: "MNL", name: "Manila" },
  KR: { code: "ICN", name: "Seoul" },
  JP: { code: "NRT", name: "Tokyo" },
  CN: { code: "PVG", name: "Shanghai" },
  HK: { code: "HKG", name: "Hong Kong" },
  TW: { code: "TPE", name: "Taipei" },
  RU: { code: "SVO", name: "Moscow" },
  BR: { code: "GRU", name: "Sao Paulo" },
  MX: { code: "MEX", name: "Mexico City" },
  AR: { code: "EZE", name: "Buenos Aires" },
};

// Risk level categorization
export type RiskLevel = "high" | "medium" | "low" | "none";

export function getCountryRiskLevel(countryCode: string): RiskLevel {
  const highRisk = ["US", "CA", "AU", "NZ"];
  const mediumRisk = ["GB", "DE", "FR", "NL", "SE", "NO", "DK", "FI", "IE", "CH", "AT", "BE", "IT", "ES", "PT", "PL", "CZ"];
  const lowRisk = ["IN", "TH", "SG", "MY", "ID", "PH", "KR", "JP", "CN", "HK", "TW", "RU", "BR", "MX", "AR"];

  if (highRisk.includes(countryCode)) return "high";
  if (mediumRisk.includes(countryCode)) return "medium";
  if (lowRisk.includes(countryCode)) return "low";
  return "none";
}

// Should show risk block based on country and visa speed
export function shouldShowRiskBlock(countryCode: string, visaSpeed: string): boolean {
  const riskLevel = getCountryRiskLevel(countryCode);

  if (riskLevel === "high") return true;
  if (riskLevel === "medium" && (visaSpeed === "30-min" || visaSpeed === "weekend")) return true;
  return false;
}

// Get Amadeus OAuth2 token
async function getAmadeusToken(): Promise<string> {
  // Check if we have a valid cached token
  if (tokenCache && tokenCache.expiresAt > Date.now()) {
    return tokenCache.access_token;
  }

  const apiKey = process.env.AMADEUS_API_KEY;
  const apiSecret = process.env.AMADEUS_API_SECRET;
  const isProduction = process.env.AMADEUS_PRODUCTION === "true";

  if (!apiKey || !apiSecret) {
    throw new Error("Amadeus API credentials not configured");
  }

  const baseUrl = isProduction
    ? "https://api.amadeus.com"
    : "https://test.api.amadeus.com";

  const response = await fetch(`${baseUrl}/v1/security/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: apiKey,
      client_secret: apiSecret,
    }),
  });

  if (!response.ok) {
    throw new Error(`Amadeus authentication failed: ${response.status}`);
  }

  const data = await response.json();

  tokenCache = {
    access_token: data.access_token,
    expires_in: data.expires_in,
    expiresAt: Date.now() + (data.expires_in - 60) * 1000, // Expire 1 min early
  };

  return tokenCache.access_token;
}

// Fetch flight price metrics from Amadeus API
export async function getFlightPriceMetrics(
  originCode: string,
  destinationCode: string = "SGN"
): Promise<FlightPriceData | null> {
  const cacheKey = `${originCode}-${destinationCode}`;

  // Check cache first
  const cached = priceCache.get(cacheKey);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL) {
    return cached;
  }

  try {
    const token = await getAmadeusToken();
    const isProduction = process.env.AMADEUS_PRODUCTION === "true";
    const baseUrl = isProduction
      ? "https://api.amadeus.com"
      : "https://test.api.amadeus.com";

    // Get a future date (2 weeks from now)
    const departureDate = new Date();
    departureDate.setDate(departureDate.getDate() + 14);
    const dateStr = departureDate.toISOString().split("T")[0];

    const response = await fetch(
      `${baseUrl}/v1/analytics/itinerary-price-metrics?originIataCode=${originCode}&destinationIataCode=${destinationCode}&departureDate=${dateStr}&currencyCode=USD`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      console.error(`Amadeus API error: ${response.status}`);
      return null;
    }

    const data = await response.json();

    if (data.data && data.data.length > 0) {
      const priceData: FlightPriceData = {
        origin: originCode,
        destination: destinationCode,
        currency: "USD",
        priceMetrics: {
          minimumPrice: data.data[0].priceMetrics?.first || data.data[0].priceMetrics?.minimumPrice || 0,
          medianPrice: data.data[0].priceMetrics?.median || data.data[0].priceMetrics?.medianPrice || 0,
          maximumPrice: data.data[0].priceMetrics?.third || data.data[0].priceMetrics?.maximumPrice || 0,
        },
        fetchedAt: Date.now(),
      };

      // Cache the result
      priceCache.set(cacheKey, priceData);
      return priceData;
    }

    return null;
  } catch (error) {
    console.error("Error fetching flight price metrics:", error);
    return null;
  }
}

// Fallback static price estimates (used when API is not available)
export const FALLBACK_PRICES: Record<string, PriceMetrics> = {
  // High-risk countries
  US: { minimumPrice: 900, medianPrice: 1200, maximumPrice: 1800 },
  CA: { minimumPrice: 950, medianPrice: 1250, maximumPrice: 1700 },
  AU: { minimumPrice: 650, medianPrice: 880, maximumPrice: 1120 },
  NZ: { minimumPrice: 750, medianPrice: 950, maximumPrice: 1300 },

  // Medium-risk countries (Europe)
  GB: { minimumPrice: 700, medianPrice: 950, maximumPrice: 1200 },
  DE: { minimumPrice: 650, medianPrice: 900, maximumPrice: 1150 },
  FR: { minimumPrice: 650, medianPrice: 900, maximumPrice: 1150 },
  NL: { minimumPrice: 650, medianPrice: 900, maximumPrice: 1150 },
  SE: { minimumPrice: 700, medianPrice: 950, maximumPrice: 1200 },
  NO: { minimumPrice: 750, medianPrice: 1000, maximumPrice: 1300 },
  DK: { minimumPrice: 700, medianPrice: 950, maximumPrice: 1200 },
  FI: { minimumPrice: 700, medianPrice: 950, maximumPrice: 1200 },
  IE: { minimumPrice: 750, medianPrice: 1000, maximumPrice: 1250 },
  CH: { minimumPrice: 700, medianPrice: 950, maximumPrice: 1200 },
  AT: { minimumPrice: 650, medianPrice: 900, maximumPrice: 1150 },
  BE: { minimumPrice: 650, medianPrice: 900, maximumPrice: 1150 },
  IT: { minimumPrice: 600, medianPrice: 850, maximumPrice: 1100 },
  ES: { minimumPrice: 600, medianPrice: 850, maximumPrice: 1100 },
  PT: { minimumPrice: 650, medianPrice: 900, maximumPrice: 1150 },
  PL: { minimumPrice: 550, medianPrice: 750, maximumPrice: 1000 },
  CZ: { minimumPrice: 550, medianPrice: 750, maximumPrice: 1000 },

  // Low-risk countries (Asia/ASEAN) - not shown but included for completeness
  IN: { minimumPrice: 250, medianPrice: 400, maximumPrice: 600 },
  TH: { minimumPrice: 100, medianPrice: 180, maximumPrice: 300 },
  SG: { minimumPrice: 150, medianPrice: 250, maximumPrice: 400 },
  MY: { minimumPrice: 120, medianPrice: 200, maximumPrice: 350 },
  ID: { minimumPrice: 150, medianPrice: 280, maximumPrice: 450 },
  PH: { minimumPrice: 180, medianPrice: 300, maximumPrice: 500 },
  KR: { minimumPrice: 300, medianPrice: 450, maximumPrice: 650 },
  JP: { minimumPrice: 350, medianPrice: 500, maximumPrice: 750 },
  CN: { minimumPrice: 200, medianPrice: 350, maximumPrice: 550 },
  HK: { minimumPrice: 150, medianPrice: 280, maximumPrice: 450 },
  TW: { minimumPrice: 200, medianPrice: 350, maximumPrice: 550 },
};

// Get price metrics with fallback
export async function getFlightPriceWithFallback(countryCode: string): Promise<PriceMetrics | null> {
  const airport = COUNTRY_AIRPORTS[countryCode];
  if (!airport) return null;

  // Try to get from Amadeus API first
  const apiData = await getFlightPriceMetrics(airport.code, "SGN");
  if (apiData && apiData.priceMetrics.medianPrice > 0) {
    return apiData.priceMetrics;
  }

  // Fall back to static estimates
  return FALLBACK_PRICES[countryCode] || null;
}
