/**
 * Airports Configuration for Google Ads
 *
 * Contains airport data for geo-targeting ads at airports.
 * Airports are organized by country for easier management.
 */

// Airport configuration
export interface AirportConfig {
  code: string;           // IATA code
  name: string;           // Airport name
  city: string;           // City name
  countryCode: string;    // ISO 3166-1 alpha-2
  coordinates: {
    latitude: number;
    longitude: number;
  };
  radiusMeters: number;   // Targeting radius (default 5000m = 5km)
  trafficVolume: 'high' | 'medium' | 'low'; // For budget allocation
}

// Major airports with direct or common Vietnam connections
export const AIRPORTS: AirportConfig[] = [
  // United States - Major Hubs
  {
    code: 'JFK',
    name: 'John F. Kennedy International Airport',
    city: 'New York',
    countryCode: 'US',
    coordinates: { latitude: 40.6413, longitude: -73.7781 },
    radiusMeters: 5000,
    trafficVolume: 'high',
  },
  {
    code: 'LAX',
    name: 'Los Angeles International Airport',
    city: 'Los Angeles',
    countryCode: 'US',
    coordinates: { latitude: 33.9425, longitude: -118.4081 },
    radiusMeters: 5000,
    trafficVolume: 'high',
  },
  {
    code: 'SFO',
    name: 'San Francisco International Airport',
    city: 'San Francisco',
    countryCode: 'US',
    coordinates: { latitude: 37.6213, longitude: -122.379 },
    radiusMeters: 5000,
    trafficVolume: 'high',
  },
  {
    code: 'ORD',
    name: "O'Hare International Airport",
    city: 'Chicago',
    countryCode: 'US',
    coordinates: { latitude: 41.9742, longitude: -87.9073 },
    radiusMeters: 5000,
    trafficVolume: 'high',
  },
  {
    code: 'DFW',
    name: 'Dallas/Fort Worth International Airport',
    city: 'Dallas',
    countryCode: 'US',
    coordinates: { latitude: 32.8998, longitude: -97.0403 },
    radiusMeters: 5000,
    trafficVolume: 'medium',
  },
  {
    code: 'MIA',
    name: 'Miami International Airport',
    city: 'Miami',
    countryCode: 'US',
    coordinates: { latitude: 25.7959, longitude: -80.287 },
    radiusMeters: 5000,
    trafficVolume: 'medium',
  },
  {
    code: 'SEA',
    name: 'Seattle-Tacoma International Airport',
    city: 'Seattle',
    countryCode: 'US',
    coordinates: { latitude: 47.4502, longitude: -122.3088 },
    radiusMeters: 5000,
    trafficVolume: 'medium',
  },
  {
    code: 'IAH',
    name: 'George Bush Intercontinental Airport',
    city: 'Houston',
    countryCode: 'US',
    coordinates: { latitude: 29.9902, longitude: -95.3368 },
    radiusMeters: 5000,
    trafficVolume: 'medium',
  },

  // Canada
  {
    code: 'YYZ',
    name: 'Toronto Pearson International Airport',
    city: 'Toronto',
    countryCode: 'CA',
    coordinates: { latitude: 43.6777, longitude: -79.6248 },
    radiusMeters: 5000,
    trafficVolume: 'high',
  },
  {
    code: 'YVR',
    name: 'Vancouver International Airport',
    city: 'Vancouver',
    countryCode: 'CA',
    coordinates: { latitude: 49.1951, longitude: -123.1818 },
    radiusMeters: 5000,
    trafficVolume: 'medium',
  },
  {
    code: 'YUL',
    name: 'Montreal-Trudeau International Airport',
    city: 'Montreal',
    countryCode: 'CA',
    coordinates: { latitude: 45.4697, longitude: -73.7408 },
    radiusMeters: 5000,
    trafficVolume: 'medium',
  },

  // Australia
  {
    code: 'SYD',
    name: 'Sydney Kingsford Smith Airport',
    city: 'Sydney',
    countryCode: 'AU',
    coordinates: { latitude: -33.9399, longitude: 151.1753 },
    radiusMeters: 5000,
    trafficVolume: 'high',
  },
  {
    code: 'MEL',
    name: 'Melbourne Airport',
    city: 'Melbourne',
    countryCode: 'AU',
    coordinates: { latitude: -37.6733, longitude: 144.8433 },
    radiusMeters: 5000,
    trafficVolume: 'high',
  },
  {
    code: 'BNE',
    name: 'Brisbane Airport',
    city: 'Brisbane',
    countryCode: 'AU',
    coordinates: { latitude: -27.3942, longitude: 153.1218 },
    radiusMeters: 5000,
    trafficVolume: 'medium',
  },
  {
    code: 'PER',
    name: 'Perth Airport',
    city: 'Perth',
    countryCode: 'AU',
    coordinates: { latitude: -31.9403, longitude: 115.9668 },
    radiusMeters: 5000,
    trafficVolume: 'medium',
  },

  // New Zealand
  {
    code: 'AKL',
    name: 'Auckland Airport',
    city: 'Auckland',
    countryCode: 'NZ',
    coordinates: { latitude: -37.0082, longitude: 174.7917 },
    radiusMeters: 5000,
    trafficVolume: 'medium',
  },

  // United Kingdom
  {
    code: 'LHR',
    name: 'London Heathrow Airport',
    city: 'London',
    countryCode: 'GB',
    coordinates: { latitude: 51.47, longitude: -0.4543 },
    radiusMeters: 5000,
    trafficVolume: 'high',
  },
  {
    code: 'LGW',
    name: 'London Gatwick Airport',
    city: 'London',
    countryCode: 'GB',
    coordinates: { latitude: 51.1537, longitude: -0.1821 },
    radiusMeters: 5000,
    trafficVolume: 'medium',
  },
  {
    code: 'MAN',
    name: 'Manchester Airport',
    city: 'Manchester',
    countryCode: 'GB',
    coordinates: { latitude: 53.3537, longitude: -2.275 },
    radiusMeters: 5000,
    trafficVolume: 'medium',
  },

  // Germany
  {
    code: 'FRA',
    name: 'Frankfurt Airport',
    city: 'Frankfurt',
    countryCode: 'DE',
    coordinates: { latitude: 50.0379, longitude: 8.5622 },
    radiusMeters: 5000,
    trafficVolume: 'high',
  },
  {
    code: 'MUC',
    name: 'Munich Airport',
    city: 'Munich',
    countryCode: 'DE',
    coordinates: { latitude: 48.3538, longitude: 11.775 },
    radiusMeters: 5000,
    trafficVolume: 'medium',
  },
  {
    code: 'BER',
    name: 'Berlin Brandenburg Airport',
    city: 'Berlin',
    countryCode: 'DE',
    coordinates: { latitude: 52.3667, longitude: 13.5033 },
    radiusMeters: 5000,
    trafficVolume: 'medium',
  },

  // France
  {
    code: 'CDG',
    name: 'Paris Charles de Gaulle Airport',
    city: 'Paris',
    countryCode: 'FR',
    coordinates: { latitude: 49.0097, longitude: 2.5479 },
    radiusMeters: 5000,
    trafficVolume: 'high',
  },
  {
    code: 'ORY',
    name: 'Paris Orly Airport',
    city: 'Paris',
    countryCode: 'FR',
    coordinates: { latitude: 48.7253, longitude: 2.3594 },
    radiusMeters: 5000,
    trafficVolume: 'medium',
  },

  // Netherlands
  {
    code: 'AMS',
    name: 'Amsterdam Airport Schiphol',
    city: 'Amsterdam',
    countryCode: 'NL',
    coordinates: { latitude: 52.3105, longitude: 4.7683 },
    radiusMeters: 5000,
    trafficVolume: 'high',
  },

  // Spain
  {
    code: 'MAD',
    name: 'Madrid-Barajas Airport',
    city: 'Madrid',
    countryCode: 'ES',
    coordinates: { latitude: 40.4983, longitude: -3.5676 },
    radiusMeters: 5000,
    trafficVolume: 'medium',
  },
  {
    code: 'BCN',
    name: 'Barcelona-El Prat Airport',
    city: 'Barcelona',
    countryCode: 'ES',
    coordinates: { latitude: 41.2974, longitude: 2.0833 },
    radiusMeters: 5000,
    trafficVolume: 'medium',
  },

  // Italy
  {
    code: 'FCO',
    name: 'Rome Fiumicino Airport',
    city: 'Rome',
    countryCode: 'IT',
    coordinates: { latitude: 41.8003, longitude: 12.2389 },
    radiusMeters: 5000,
    trafficVolume: 'medium',
  },
  {
    code: 'MXP',
    name: 'Milan Malpensa Airport',
    city: 'Milan',
    countryCode: 'IT',
    coordinates: { latitude: 45.63, longitude: 8.7231 },
    radiusMeters: 5000,
    trafficVolume: 'medium',
  },

  // Russia
  {
    code: 'SVO',
    name: 'Sheremetyevo International Airport',
    city: 'Moscow',
    countryCode: 'RU',
    coordinates: { latitude: 55.9726, longitude: 37.4146 },
    radiusMeters: 5000,
    trafficVolume: 'high',
  },
  {
    code: 'DME',
    name: 'Domodedovo International Airport',
    city: 'Moscow',
    countryCode: 'RU',
    coordinates: { latitude: 55.4088, longitude: 37.9063 },
    radiusMeters: 5000,
    trafficVolume: 'medium',
  },
  {
    code: 'LED',
    name: 'Pulkovo Airport',
    city: 'Saint Petersburg',
    countryCode: 'RU',
    coordinates: { latitude: 59.8003, longitude: 30.2625 },
    radiusMeters: 5000,
    trafficVolume: 'medium',
  },

  // Singapore
  {
    code: 'SIN',
    name: 'Singapore Changi Airport',
    city: 'Singapore',
    countryCode: 'SG',
    coordinates: { latitude: 1.3644, longitude: 103.9915 },
    radiusMeters: 5000,
    trafficVolume: 'high',
  },

  // India
  {
    code: 'DEL',
    name: 'Indira Gandhi International Airport',
    city: 'New Delhi',
    countryCode: 'IN',
    coordinates: { latitude: 28.5562, longitude: 77.1 },
    radiusMeters: 5000,
    trafficVolume: 'high',
  },
  {
    code: 'BOM',
    name: 'Chhatrapati Shivaji International Airport',
    city: 'Mumbai',
    countryCode: 'IN',
    coordinates: { latitude: 19.0896, longitude: 72.8656 },
    radiusMeters: 5000,
    trafficVolume: 'high',
  },
  {
    code: 'BLR',
    name: 'Kempegowda International Airport',
    city: 'Bangalore',
    countryCode: 'IN',
    coordinates: { latitude: 13.1986, longitude: 77.7066 },
    radiusMeters: 5000,
    trafficVolume: 'medium',
  },
  {
    code: 'MAA',
    name: 'Chennai International Airport',
    city: 'Chennai',
    countryCode: 'IN',
    coordinates: { latitude: 12.9941, longitude: 80.1709 },
    radiusMeters: 5000,
    trafficVolume: 'medium',
  },
  {
    code: 'CCU',
    name: 'Netaji Subhas Chandra Bose International Airport',
    city: 'Kolkata',
    countryCode: 'IN',
    coordinates: { latitude: 22.6547, longitude: 88.4467 },
    radiusMeters: 5000,
    trafficVolume: 'medium',
  },

  // Southeast Asia Transit Hubs
  {
    code: 'KUL',
    name: 'Kuala Lumpur International Airport',
    city: 'Kuala Lumpur',
    countryCode: 'MY',
    coordinates: { latitude: 2.7456, longitude: 101.7099 },
    radiusMeters: 5000,
    trafficVolume: 'high',
  },
  {
    code: 'BKK',
    name: 'Suvarnabhumi Airport',
    city: 'Bangkok',
    countryCode: 'TH',
    coordinates: { latitude: 13.6929, longitude: 100.7507 },
    radiusMeters: 5000,
    trafficVolume: 'high',
  },
  {
    code: 'CGK',
    name: 'Soekarno-Hatta International Airport',
    city: 'Jakarta',
    countryCode: 'ID',
    coordinates: { latitude: -6.1256, longitude: 106.6559 },
    radiusMeters: 5000,
    trafficVolume: 'high',
  },
  {
    code: 'MNL',
    name: 'Ninoy Aquino International Airport',
    city: 'Manila',
    countryCode: 'PH',
    coordinates: { latitude: 14.5086, longitude: 121.0194 },
    radiusMeters: 5000,
    trafficVolume: 'medium',
  },

  // Latin America
  {
    code: 'MEX',
    name: 'Mexico City International Airport',
    city: 'Mexico City',
    countryCode: 'MX',
    coordinates: { latitude: 19.4363, longitude: -99.0721 },
    radiusMeters: 5000,
    trafficVolume: 'high',
  },
  {
    code: 'GRU',
    name: 'Sao Paulo-Guarulhos International Airport',
    city: 'Sao Paulo',
    countryCode: 'BR',
    coordinates: { latitude: -23.4356, longitude: -46.4731 },
    radiusMeters: 5000,
    trafficVolume: 'high',
  },
  {
    code: 'GIG',
    name: 'Rio de Janeiro-Galeao International Airport',
    city: 'Rio de Janeiro',
    countryCode: 'BR',
    coordinates: { latitude: -22.8099, longitude: -43.2505 },
    radiusMeters: 5000,
    trafficVolume: 'medium',
  },
  {
    code: 'EZE',
    name: 'Ministro Pistarini International Airport',
    city: 'Buenos Aires',
    countryCode: 'AR',
    coordinates: { latitude: -34.8222, longitude: -58.5358 },
    radiusMeters: 5000,
    trafficVolume: 'medium',
  },
  {
    code: 'SCL',
    name: 'Comodoro Arturo Merino Benitez International Airport',
    city: 'Santiago',
    countryCode: 'CL',
    coordinates: { latitude: -33.393, longitude: -70.7858 },
    radiusMeters: 5000,
    trafficVolume: 'medium',
  },
  {
    code: 'BOG',
    name: 'El Dorado International Airport',
    city: 'Bogota',
    countryCode: 'CO',
    coordinates: { latitude: 4.7016, longitude: -74.1469 },
    radiusMeters: 5000,
    trafficVolume: 'medium',
  },
];

/**
 * Get airport by IATA code
 */
export function getAirport(code: string): AirportConfig | undefined {
  return AIRPORTS.find((a) => a.code === code.toUpperCase());
}

/**
 * Get all airports for a country
 */
export function getAirportsByCountry(countryCode: string): AirportConfig[] {
  return AIRPORTS.filter((a) => a.countryCode === countryCode.toUpperCase());
}

/**
 * Get all high-traffic airports
 */
export function getHighTrafficAirports(): AirportConfig[] {
  return AIRPORTS.filter((a) => a.trafficVolume === 'high');
}

/**
 * Get airports by traffic volume
 */
export function getAirportsByTrafficVolume(
  volume: 'high' | 'medium' | 'low'
): AirportConfig[] {
  return AIRPORTS.filter((a) => a.trafficVolume === volume);
}

/**
 * Get airport coordinates for Google Ads geo-targeting
 * Returns latitude/longitude in micro-degrees (as required by Google Ads API)
 */
export function getAirportGeoTarget(code: string): {
  latitudeMicroDegrees: number;
  longitudeMicroDegrees: number;
  radiusMeters: number;
} | null {
  const airport = getAirport(code);
  if (!airport) return null;

  return {
    latitudeMicroDegrees: Math.round(airport.coordinates.latitude * 1_000_000),
    longitudeMicroDegrees: Math.round(airport.coordinates.longitude * 1_000_000),
    radiusMeters: airport.radiusMeters,
  };
}

/**
 * Get recommended airports for a campaign (high and medium traffic)
 */
export function getRecommendedAirports(): AirportConfig[] {
  return AIRPORTS.filter(
    (a) => a.trafficVolume === 'high' || a.trafficVolume === 'medium'
  );
}

/**
 * Get airport count by country (for reporting)
 */
export function getAirportCountByCountry(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const airport of AIRPORTS) {
    counts[airport.countryCode] = (counts[airport.countryCode] || 0) + 1;
  }
  return counts;
}
