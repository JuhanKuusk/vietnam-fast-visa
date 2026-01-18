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

// Airport info with city name for display
interface AirportInfo {
  code: string;      // IATA code
  name: string;      // Full airport name
  city: string;      // City name
}

// Country to airports mapping (multiple airports per country)
export const COUNTRY_AIRPORTS: Record<string, AirportInfo[]> = {
  // High-risk countries (show risk block ALWAYS)
  US: [
    { code: "JFK", name: "John F. Kennedy International", city: "New York" },
    { code: "LAX", name: "Los Angeles International", city: "Los Angeles" },
    { code: "ORD", name: "O'Hare International", city: "Chicago" },
    { code: "SFO", name: "San Francisco International", city: "San Francisco" },
    { code: "MIA", name: "Miami International", city: "Miami" },
    { code: "ATL", name: "Hartsfield-Jackson Atlanta International", city: "Atlanta" },
    { code: "DFW", name: "Dallas/Fort Worth International", city: "Dallas" },
    { code: "SEA", name: "Seattle-Tacoma International", city: "Seattle" },
    { code: "BOS", name: "Boston Logan International", city: "Boston" },
    { code: "IAD", name: "Washington Dulles International", city: "Washington D.C." },
  ],
  CA: [
    { code: "YYZ", name: "Toronto Pearson International", city: "Toronto" },
    { code: "YVR", name: "Vancouver International", city: "Vancouver" },
    { code: "YUL", name: "Montreal-Trudeau International", city: "Montreal" },
    { code: "YYC", name: "Calgary International", city: "Calgary" },
  ],
  AU: [
    { code: "SYD", name: "Sydney Kingsford Smith", city: "Sydney" },
    { code: "MEL", name: "Melbourne Tullamarine", city: "Melbourne" },
    { code: "BNE", name: "Brisbane Airport", city: "Brisbane" },
    { code: "PER", name: "Perth Airport", city: "Perth" },
  ],
  NZ: [
    { code: "AKL", name: "Auckland Airport", city: "Auckland" },
    { code: "WLG", name: "Wellington Airport", city: "Wellington" },
    { code: "CHC", name: "Christchurch Airport", city: "Christchurch" },
  ],

  // Medium-risk countries (show on URGENT/WEEKEND only)
  GB: [
    { code: "LHR", name: "London Heathrow", city: "London" },
    { code: "LGW", name: "London Gatwick", city: "London" },
    { code: "MAN", name: "Manchester Airport", city: "Manchester" },
    { code: "EDI", name: "Edinburgh Airport", city: "Edinburgh" },
    { code: "BHX", name: "Birmingham Airport", city: "Birmingham" },
  ],
  DE: [
    { code: "FRA", name: "Frankfurt Airport", city: "Frankfurt" },
    { code: "MUC", name: "Munich Airport", city: "Munich" },
    { code: "BER", name: "Berlin Brandenburg", city: "Berlin" },
    { code: "DUS", name: "Dusseldorf Airport", city: "Dusseldorf" },
    { code: "HAM", name: "Hamburg Airport", city: "Hamburg" },
  ],
  FR: [
    { code: "CDG", name: "Paris Charles de Gaulle", city: "Paris" },
    { code: "ORY", name: "Paris Orly", city: "Paris" },
    { code: "NCE", name: "Nice Cote d'Azur", city: "Nice" },
    { code: "LYS", name: "Lyon-Saint Exupery", city: "Lyon" },
  ],
  NL: [
    { code: "AMS", name: "Amsterdam Schiphol", city: "Amsterdam" },
  ],
  SE: [
    { code: "ARN", name: "Stockholm Arlanda", city: "Stockholm" },
    { code: "GOT", name: "Gothenburg Landvetter", city: "Gothenburg" },
  ],
  NO: [
    { code: "OSL", name: "Oslo Gardermoen", city: "Oslo" },
    { code: "BGO", name: "Bergen Flesland", city: "Bergen" },
  ],
  DK: [
    { code: "CPH", name: "Copenhagen Airport", city: "Copenhagen" },
  ],
  FI: [
    { code: "HEL", name: "Helsinki-Vantaa", city: "Helsinki" },
  ],
  IE: [
    { code: "DUB", name: "Dublin Airport", city: "Dublin" },
  ],
  CH: [
    { code: "ZRH", name: "Zurich Airport", city: "Zurich" },
    { code: "GVA", name: "Geneva Airport", city: "Geneva" },
  ],
  AT: [
    { code: "VIE", name: "Vienna International", city: "Vienna" },
  ],
  BE: [
    { code: "BRU", name: "Brussels Airport", city: "Brussels" },
  ],
  IT: [
    { code: "FCO", name: "Rome Fiumicino", city: "Rome" },
    { code: "MXP", name: "Milan Malpensa", city: "Milan" },
    { code: "VCE", name: "Venice Marco Polo", city: "Venice" },
  ],
  ES: [
    { code: "MAD", name: "Madrid Barajas", city: "Madrid" },
    { code: "BCN", name: "Barcelona El Prat", city: "Barcelona" },
  ],
  PT: [
    { code: "LIS", name: "Lisbon Portela", city: "Lisbon" },
    { code: "OPO", name: "Porto Airport", city: "Porto" },
  ],
  PL: [
    { code: "WAW", name: "Warsaw Chopin", city: "Warsaw" },
    { code: "KRK", name: "Krakow Airport", city: "Krakow" },
  ],
  CZ: [
    { code: "PRG", name: "Prague Vaclav Havel", city: "Prague" },
  ],

  // Low-risk countries (flights available but no risk warning)
  IN: [
    { code: "DEL", name: "Indira Gandhi International", city: "Delhi" },
    { code: "BOM", name: "Chhatrapati Shivaji International", city: "Mumbai" },
    { code: "BLR", name: "Kempegowda International", city: "Bangalore" },
    { code: "MAA", name: "Chennai International", city: "Chennai" },
  ],
  TH: [
    { code: "BKK", name: "Suvarnabhumi Airport", city: "Bangkok" },
    { code: "DMK", name: "Don Mueang International", city: "Bangkok" },
    { code: "CNX", name: "Chiang Mai International", city: "Chiang Mai" },
    { code: "HKT", name: "Phuket International", city: "Phuket" },
  ],
  SG: [
    { code: "SIN", name: "Singapore Changi", city: "Singapore" },
  ],
  MY: [
    { code: "KUL", name: "Kuala Lumpur International", city: "Kuala Lumpur" },
    { code: "PEN", name: "Penang International", city: "Penang" },
  ],
  ID: [
    { code: "CGK", name: "Soekarno-Hatta International", city: "Jakarta" },
    { code: "DPS", name: "Ngurah Rai International", city: "Bali" },
    { code: "SUB", name: "Juanda International", city: "Surabaya" },
  ],
  PH: [
    { code: "MNL", name: "Ninoy Aquino International", city: "Manila" },
    { code: "CEB", name: "Mactan-Cebu International", city: "Cebu" },
  ],
  KR: [
    { code: "ICN", name: "Incheon International", city: "Seoul" },
    { code: "GMP", name: "Gimpo International", city: "Seoul" },
    { code: "PUS", name: "Gimhae International", city: "Busan" },
  ],
  JP: [
    { code: "NRT", name: "Narita International", city: "Tokyo" },
    { code: "HND", name: "Haneda Airport", city: "Tokyo" },
    { code: "KIX", name: "Kansai International", city: "Osaka" },
    { code: "NGO", name: "Chubu Centrair International", city: "Nagoya" },
  ],
  CN: [
    { code: "PVG", name: "Shanghai Pudong", city: "Shanghai" },
    { code: "PEK", name: "Beijing Capital", city: "Beijing" },
    { code: "CAN", name: "Guangzhou Baiyun", city: "Guangzhou" },
    { code: "SZX", name: "Shenzhen Bao'an", city: "Shenzhen" },
  ],
  HK: [
    { code: "HKG", name: "Hong Kong International", city: "Hong Kong" },
  ],
  TW: [
    { code: "TPE", name: "Taiwan Taoyuan International", city: "Taipei" },
    { code: "KHH", name: "Kaohsiung International", city: "Kaohsiung" },
  ],
  RU: [
    { code: "SVO", name: "Sheremetyevo International", city: "Moscow" },
    { code: "DME", name: "Domodedovo International", city: "Moscow" },
    { code: "LED", name: "Pulkovo Airport", city: "St. Petersburg" },
  ],
  BR: [
    { code: "GRU", name: "Sao Paulo-Guarulhos", city: "Sao Paulo" },
    { code: "GIG", name: "Rio de Janeiro-Galeao", city: "Rio de Janeiro" },
  ],
  MX: [
    { code: "MEX", name: "Mexico City International", city: "Mexico City" },
    { code: "CUN", name: "Cancun International", city: "Cancun" },
  ],
  AR: [
    { code: "EZE", name: "Ministro Pistarini International", city: "Buenos Aires" },
  ],
};

// IATA to ICAO mapping for AeroDataBox API
export const IATA_TO_ICAO: Record<string, string> = {
  // US Airports
  JFK: "KJFK", LAX: "KLAX", ORD: "KORD", SFO: "KSFO", MIA: "KMIA",
  ATL: "KATL", DFW: "KDFW", SEA: "KSEA", BOS: "KBOS", IAD: "KIAD",
  // Canada
  YYZ: "CYYZ", YVR: "CYVR", YUL: "CYUL", YYC: "CYYC",
  // Australia
  SYD: "YSSY", MEL: "YMML", BNE: "YBBN", PER: "YPPH",
  // New Zealand
  AKL: "NZAA", WLG: "NZWN", CHC: "NZCH",
  // UK
  LHR: "EGLL", LGW: "EGKK", MAN: "EGCC", EDI: "EGPH", BHX: "EGBB",
  // Germany
  FRA: "EDDF", MUC: "EDDM", BER: "EDDB", DUS: "EDDL", HAM: "EDDH",
  // France
  CDG: "LFPG", ORY: "LFPO", NCE: "LFMN", LYS: "LFLL",
  // Other Europe
  AMS: "EHAM", ARN: "ESSA", GOT: "ESGG", OSL: "ENGM", BGO: "ENBR",
  CPH: "EKCH", HEL: "EFHK", DUB: "EIDW", ZRH: "LSZH", GVA: "LSGG",
  VIE: "LOWW", BRU: "EBBR", FCO: "LIRF", MXP: "LIMC", VCE: "LIPZ",
  MAD: "LEMD", BCN: "LEBL", LIS: "LPPT", OPO: "LPPR",
  WAW: "EPWA", KRK: "EPKK", PRG: "LKPR",
  // Asia
  DEL: "VIDP", BOM: "VABB", BLR: "VOBL", MAA: "VOMM",
  BKK: "VTBS", DMK: "VTBD", CNX: "VTCC", HKT: "VTSP",
  SIN: "WSSS", KUL: "WMKK", PEN: "WMKP",
  CGK: "WIII", DPS: "WADD", SUB: "WARR",
  MNL: "RPLL", CEB: "RPVM",
  ICN: "RKSI", GMP: "RKSS", PUS: "RKPK",
  NRT: "RJAA", HND: "RJTT", KIX: "RJBB", NGO: "RJGG",
  PVG: "ZSPD", PEK: "ZBAA", CAN: "ZGGG", SZX: "ZGSZ",
  HKG: "VHHH", TPE: "RCTP", KHH: "RCKH",
  // Russia
  SVO: "UUEE", DME: "UUDD", LED: "ULLI",
  // Americas
  GRU: "SBGR", GIG: "SBGL", MEX: "MMMX", CUN: "MMUN", EZE: "SAEZ",
  // Vietnam destinations
  SGN: "VVTS", HAN: "VVNB", DAD: "VVDN",
};

// Helper function to get first airport for a country (for backward compatibility)
export function getDefaultAirport(countryCode: string): AirportInfo | null {
  const airports = COUNTRY_AIRPORTS[countryCode];
  return airports && airports.length > 0 ? airports[0] : null;
}

// Helper function to get all airports for a country
export function getAirportsForCountry(countryCode: string): AirportInfo[] {
  return COUNTRY_AIRPORTS[countryCode] || [];
}

// Helper function to find airport by IATA code
export function getAirportByCode(iataCode: string): { countryCode: string; airport: AirportInfo } | null {
  for (const [countryCode, airports] of Object.entries(COUNTRY_AIRPORTS)) {
    const airport = airports.find(a => a.code === iataCode);
    if (airport) {
      return { countryCode, airport };
    }
  }
  return null;
}

// Helper function to get ICAO code from IATA
export function getIcaoCode(iataCode: string): string | null {
  return IATA_TO_ICAO[iataCode] || null;
}

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

// Get price metrics with fallback (using specific airport or default)
export async function getFlightPriceWithFallback(
  countryCode: string,
  airportCode?: string
): Promise<PriceMetrics | null> {
  // If specific airport provided, use it; otherwise get default for country
  let code = airportCode;
  if (!code) {
    const defaultAirport = getDefaultAirport(countryCode);
    if (!defaultAirport) return null;
    code = defaultAirport.code;
  }

  // Try to get from Amadeus API first
  const apiData = await getFlightPriceMetrics(code, "SGN");
  if (apiData && apiData.priceMetrics.medianPrice > 0) {
    return apiData.priceMetrics;
  }

  // Fall back to static estimates (by airport code first, then country)
  return FALLBACK_PRICES[code] || FALLBACK_PRICES[countryCode] || null;
}
