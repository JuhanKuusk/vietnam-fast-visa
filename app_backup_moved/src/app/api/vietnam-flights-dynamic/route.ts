import { NextRequest, NextResponse } from "next/server";
import { IATA_TO_ICAO } from "@/lib/amadeus";

// Vietnam airport ICAO codes
const VIETNAM_AIRPORTS = ["VVNB", "VVTS", "VVDN", "VVCR", "VVPQ"]; // Hanoi, Ho Chi Minh, Da Nang, Cam Ranh, Phu Quoc

interface Flight {
  flightNumber: string;
  airline: string;
  airlineCode: string;
  departureTime: string;
  destination: string;
  destinationCode: string;
  isDirect: boolean;
  stopover?: string; // e.g., "via Singapore (SIN)"
}

interface DayFlights {
  date: string;
  dateFormatted: string;
  flights: Flight[];
}

export async function GET(request: NextRequest) {
  const useRealApi = process.env.USE_REAL_FLIGHT_API === "true";
  const apiKey = process.env.AERODATABOX_API_KEY;
  const searchParams = request.nextUrl.searchParams;
  const requestedDate = searchParams.get("date"); // Optional: specific date in YYYY-MM-DD format
  const originIata = searchParams.get("origin")?.toUpperCase() || "DPS"; // Default to DPS for backwards compatibility

  // Convert IATA to ICAO
  const originIcao = IATA_TO_ICAO[originIata];

  if (!originIcao) {
    // If we don't have the ICAO code, return empty result with info
    return NextResponse.json({
      success: true,
      origin: originIata,
      message: `No flight data available for ${originIata}`,
      days: [],
    });
  }

  const formatDate = (d: Date) => d.toISOString().split("T")[0];
  const formatDateDisplay = (d: Date) =>
    d.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  // If a specific date is requested, only return that date
  if (requestedDate) {
    const dateObj = new Date(requestedDate + "T12:00:00Z");

    if (!useRealApi || !apiKey) {
      return NextResponse.json({
        success: true,
        origin: originIata,
        originIcao,
        days: [
          {
            date: requestedDate,
            dateFormatted: formatDateDisplay(dateObj),
            flights: getMockFlightsForDate(requestedDate, originIata),
          },
        ],
      });
    }

    try {
      const flights = await fetchFlightsForDate(requestedDate, apiKey, originIcao, originIata);
      return NextResponse.json({
        success: true,
        origin: originIata,
        originIcao,
        days: [
          {
            date: requestedDate,
            dateFormatted: formatDateDisplay(dateObj),
            flights,
          },
        ],
      });
    } catch (error) {
      console.error("Vietnam flights fetch error:", error);
      return NextResponse.json(
        { error: "Failed to fetch flight information" },
        { status: 500 }
      );
    }
  }

  // Default: return today and tomorrow
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const todayStr = formatDate(today);
  const tomorrowStr = formatDate(tomorrow);

  if (!useRealApi || !apiKey) {
    // Return mock data for demo
    return NextResponse.json({
      success: true,
      origin: originIata,
      originIcao,
      days: [
        {
          date: todayStr,
          dateFormatted: formatDateDisplay(today),
          flights: getMockFlightsForDate(todayStr, originIata),
        },
        {
          date: tomorrowStr,
          dateFormatted: formatDateDisplay(tomorrow),
          flights: getMockFlightsForDate(tomorrowStr, originIata),
        },
      ],
    });
  }

  try {
    const results: DayFlights[] = [];

    for (const dateStr of [todayStr, tomorrowStr]) {
      const dateObj = dateStr === todayStr ? today : tomorrow;
      const flights = await fetchFlightsForDate(dateStr, apiKey, originIcao, originIata);
      results.push({
        date: dateStr,
        dateFormatted: formatDateDisplay(dateObj),
        flights,
      });
    }

    return NextResponse.json({
      success: true,
      origin: originIata,
      originIcao,
      days: results,
    });
  } catch (error) {
    console.error("Vietnam flights fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch flight information" },
      { status: 500 }
    );
  }
}

async function fetchFlightsForDate(
  date: string,
  apiKey: string,
  originIcao: string,
  originIata: string
): Promise<Flight[]> {
  const flights: Flight[] = [];

  // AeroDataBox API has a 12-hour maximum limit
  const timeRanges = [
    { from: `${date}T00:00`, to: `${date}T11:59` },
    { from: `${date}T12:00`, to: `${date}T23:59` },
  ];

  for (const { from: fromTime, to: toTime } of timeRanges) {
    try {
      const response = await fetch(
        `https://aerodatabox.p.rapidapi.com/flights/airports/icao/${originIcao}/${fromTime}/${toTime}?direction=Departure&withCancelled=false&withCodeshared=false&withCargo=false&withPrivate=false`,
        {
          headers: {
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": "aerodatabox.p.rapidapi.com",
          },
          next: { revalidate: 3600 },
        }
      );

      if (!response.ok) {
        console.error(`API error for ${date} (${fromTime}-${toTime}): ${response.status}`);
        continue;
      }

      const data = await response.json();

      if (!data.departures) {
        continue;
      }

      // Filter for Vietnam-bound flights
      for (const dep of data.departures) {
        const arrivalIcao = dep.movement?.airport?.icao;

        if (arrivalIcao && VIETNAM_AIRPORTS.includes(arrivalIcao)) {
          let departureTime = "";
          if (dep.movement?.scheduledTime?.local) {
            const localTime = dep.movement.scheduledTime.local;
            departureTime = localTime.includes(" ")
              ? localTime.split(" ")[1].substring(0, 5)
              : localTime.substring(11, 16);
          }

          const destinationMap: Record<string, { name: string; code: string }> = {
            VVNB: { name: "Hanoi", code: "HAN" },
            VVTS: { name: "Ho Chi Minh City", code: "SGN" },
            VVDN: { name: "Da Nang", code: "DAD" },
            VVCR: { name: "Cam Ranh (Nha Trang)", code: "CXR" },
            VVPQ: { name: "Phu Quoc", code: "PQC" },
          };

          const dest = destinationMap[arrivalIcao] || {
            name: dep.movement?.airport?.name || "Vietnam",
            code: dep.movement?.airport?.iata || "VN",
          };

          flights.push({
            flightNumber: dep.number || "Unknown",
            airline: dep.airline?.name || "Unknown Airline",
            airlineCode: dep.airline?.iata || dep.number?.substring(0, 2) || "XX",
            departureTime,
            destination: dest.name,
            destinationCode: dest.code,
            isDirect: true,
          });
        }
      }
    } catch (error) {
      console.error(`Error fetching flights for ${date} (${fromTime}-${toTime}):`, error);
    }
  }

  flights.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
  return flights;
}

// Mock flights that are customized based on origin airport
function getMockFlightsForDate(dateStr: string, originIata: string): Flight[] {
  const date = new Date(dateStr + "T12:00:00Z");
  const dayOfWeek = date.getDay();

  // Generate mock flights based on origin region
  // For most airports, there won't be direct flights to Vietnam
  // Only show connecting flights via major hubs

  // Check if this is a regional airport (Southeast Asia) that might have direct flights
  const directFlightOrigins = ["DPS", "BKK", "KUL", "HKG", "ICN", "NRT", "HND", "PVG", "CAN"];
  const hasDirectFlights = directFlightOrigins.includes(originIata);

  const baseFlights: Flight[] = [];
  const connectingFlights: Flight[] = [];

  if (hasDirectFlights) {
    // Regional airports can have direct flights
    baseFlights.push(
      {
        flightNumber: "VN 301",
        airline: "Vietnam Airlines",
        airlineCode: "VN",
        departureTime: "09:30",
        destination: "Ho Chi Minh City",
        destinationCode: "SGN",
        isDirect: true,
      },
      {
        flightNumber: "VJ 812",
        airline: "VietJet Air",
        airlineCode: "VJ",
        departureTime: "14:45",
        destination: "Ho Chi Minh City",
        destinationCode: "SGN",
        isDirect: true,
      }
    );
  }

  // All airports get connecting flights via major hubs
  // Customize based on origin region
  const usAirports = ["JFK", "LAX", "ORD", "SFO", "MIA", "ATL", "DFW", "SEA", "BOS", "IAD"];
  const europeAirports = ["LHR", "CDG", "FRA", "AMS", "MUC", "FCO", "MAD", "BCN"];
  const australiaAirports = ["SYD", "MEL", "BNE", "PER"];

  if (usAirports.includes(originIata)) {
    connectingFlights.push(
      {
        flightNumber: "EK 392",
        airline: "Emirates",
        airlineCode: "EK",
        departureTime: "00:30",
        destination: "Ho Chi Minh City",
        destinationCode: "SGN",
        isDirect: false,
        stopover: "via Dubai (DXB)",
      },
      {
        flightNumber: "CX 831",
        airline: "Cathay Pacific",
        airlineCode: "CX",
        departureTime: "01:15",
        destination: "Hanoi",
        destinationCode: "HAN",
        isDirect: false,
        stopover: "via Hong Kong (HKG)",
      },
      {
        flightNumber: "KE 012",
        airline: "Korean Air",
        airlineCode: "KE",
        departureTime: "13:00",
        destination: "Ho Chi Minh City",
        destinationCode: "SGN",
        isDirect: false,
        stopover: "via Seoul (ICN)",
      }
    );
  } else if (europeAirports.includes(originIata)) {
    connectingFlights.push(
      {
        flightNumber: "TK 083",
        airline: "Turkish Airlines",
        airlineCode: "TK",
        departureTime: "11:30",
        destination: "Ho Chi Minh City",
        destinationCode: "SGN",
        isDirect: false,
        stopover: "via Istanbul (IST)",
      },
      {
        flightNumber: "TG 911",
        airline: "Thai Airways",
        airlineCode: "TG",
        departureTime: "14:20",
        destination: "Hanoi",
        destinationCode: "HAN",
        isDirect: false,
        stopover: "via Bangkok (BKK)",
      },
      {
        flightNumber: "EK 382",
        airline: "Emirates",
        airlineCode: "EK",
        departureTime: "21:45",
        destination: "Ho Chi Minh City",
        destinationCode: "SGN",
        isDirect: false,
        stopover: "via Dubai (DXB)",
      }
    );
  } else if (australiaAirports.includes(originIata)) {
    connectingFlights.push(
      {
        flightNumber: "CX 105",
        airline: "Cathay Pacific",
        airlineCode: "CX",
        departureTime: "08:15",
        destination: "Ho Chi Minh City",
        destinationCode: "SGN",
        isDirect: false,
        stopover: "via Hong Kong (HKG)",
      },
      {
        flightNumber: "VN 782",
        airline: "Vietnam Airlines",
        airlineCode: "VN",
        departureTime: "10:30",
        destination: "Ho Chi Minh City",
        destinationCode: "SGN",
        isDirect: true,
      },
      {
        flightNumber: "QF 091",
        airline: "Qantas",
        airlineCode: "QF",
        departureTime: "16:00",
        destination: "Hanoi",
        destinationCode: "HAN",
        isDirect: false,
        stopover: "via Hong Kong (HKG)",
      }
    );
  } else {
    // Generic connecting flights for other airports
    connectingFlights.push(
      {
        flightNumber: "EK 398",
        airline: "Emirates",
        airlineCode: "EK",
        departureTime: "10:00",
        destination: "Ho Chi Minh City",
        destinationCode: "SGN",
        isDirect: false,
        stopover: "via Dubai (DXB)",
      },
      {
        flightNumber: "TG 999",
        airline: "Thai Airways",
        airlineCode: "TG",
        departureTime: "15:30",
        destination: "Hanoi",
        destinationCode: "HAN",
        isDirect: false,
        stopover: "via Bangkok (BKK)",
      }
    );
  }

  // Add some variation based on day of week
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    // Weekend - add more flights
    connectingFlights.push({
      flightNumber: "MH 756",
      airline: "Malaysia Airlines",
      airlineCode: "MH",
      departureTime: "19:00",
      destination: "Da Nang",
      destinationCode: "DAD",
      isDirect: false,
      stopover: "via Kuala Lumpur (KUL)",
    });
  }

  const allFlights = [...baseFlights, ...connectingFlights];
  return allFlights.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
}
