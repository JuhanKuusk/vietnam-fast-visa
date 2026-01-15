import { NextRequest, NextResponse } from "next/server";

// Vietnam airport ICAO codes
const VIETNAM_AIRPORTS = ["VVNB", "VVTS", "VVDN", "VVCR", "VVPQ"]; // Hanoi, Ho Chi Minh, Da Nang, Cam Ranh, Phu Quoc

interface Flight {
  flightNumber: string;
  airline: string;
  airlineCode: string;
  departureTime: string;
  destination: string;
  destinationCode: string;
}

interface DayFlights {
  date: string;
  dateFormatted: string;
  flights: Flight[];
}

export async function GET(request: NextRequest) {
  const apiKey = process.env.AERODATABOX_API_KEY;

  // Get today and tomorrow dates in UTC
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatDate = (d: Date) => d.toISOString().split("T")[0];
  const formatDateDisplay = (d: Date) =>
    d.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const todayStr = formatDate(today);
  const tomorrowStr = formatDate(tomorrow);

  if (!apiKey) {
    // Return mock data for development
    return NextResponse.json({
      success: true,
      days: [
        {
          date: todayStr,
          dateFormatted: formatDateDisplay(today),
          flights: getMockFlights(),
        },
        {
          date: tomorrowStr,
          dateFormatted: formatDateDisplay(tomorrow),
          flights: getMockFlights(),
        },
      ],
    });
  }

  try {
    const results: DayFlights[] = [];

    // Fetch flights for today and tomorrow
    for (const dateStr of [todayStr, tomorrowStr]) {
      const dateObj = dateStr === todayStr ? today : tomorrow;
      const flights = await fetchFlightsForDate(dateStr, apiKey);
      results.push({
        date: dateStr,
        dateFormatted: formatDateDisplay(dateObj),
        flights,
      });
    }

    return NextResponse.json({
      success: true,
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
  apiKey: string
): Promise<Flight[]> {
  const flights: Flight[] = [];

  // DPS = Denpasar (Ngurah Rai) ICAO: WADD
  // Fetch departures from Denpasar for 00:00-23:59 on the given date
  const fromTime = `${date}T00:00`;
  const toTime = `${date}T23:59`;

  try {
    const response = await fetch(
      `https://aerodatabox.p.rapidapi.com/flights/airports/icao/WADD/${fromTime}/${toTime}?direction=Departure&withCancelled=false&withCodeshared=false&withCargo=false&withPrivate=false`,
      {
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "aerodatabox.p.rapidapi.com",
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      console.error(`API error for ${date}: ${response.status}`);
      return [];
    }

    const data = await response.json();

    if (!data.departures) {
      return [];
    }

    // Filter for Vietnam-bound flights
    for (const dep of data.departures) {
      const arrivalIcao = dep.arrival?.airport?.icao;

      if (arrivalIcao && VIETNAM_AIRPORTS.includes(arrivalIcao)) {
        // Extract local departure time
        let departureTime = "";
        if (dep.departure?.scheduledTime?.local) {
          // Format: "2026-01-15 13:10" -> "13:10"
          const localTime = dep.departure.scheduledTime.local;
          departureTime = localTime.includes(" ")
            ? localTime.split(" ")[1]
            : localTime.substring(11, 16);
        }

        // Map destination
        const destinationMap: Record<string, { name: string; code: string }> = {
          VVNB: { name: "Hanoi", code: "HAN" },
          VVTS: { name: "Ho Chi Minh City", code: "SGN" },
          VVDN: { name: "Da Nang", code: "DAD" },
          VVCR: { name: "Cam Ranh (Nha Trang)", code: "CXR" },
          VVPQ: { name: "Phu Quoc", code: "PQC" },
        };

        const dest = destinationMap[arrivalIcao] || {
          name: dep.arrival?.airport?.name || "Vietnam",
          code: dep.arrival?.airport?.iata || "VN",
        };

        flights.push({
          flightNumber: dep.number || "Unknown",
          airline: dep.airline?.name || "Unknown Airline",
          airlineCode: dep.airline?.iata || dep.number?.substring(0, 2) || "XX",
          departureTime,
          destination: dest.name,
          destinationCode: dest.code,
        });
      }
    }

    // Sort by departure time
    flights.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
  } catch (error) {
    console.error(`Error fetching flights for ${date}:`, error);
  }

  return flights;
}

function getMockFlights(): Flight[] {
  return [
    {
      flightNumber: "VJ 900",
      airline: "VietJet Air",
      airlineCode: "VJ",
      departureTime: "13:10",
      destination: "Hanoi",
      destinationCode: "HAN",
    },
    {
      flightNumber: "VJ 894",
      airline: "VietJet Air",
      airlineCode: "VJ",
      departureTime: "14:05",
      destination: "Ho Chi Minh City",
      destinationCode: "SGN",
    },
    {
      flightNumber: "VJ 898",
      airline: "VietJet Air",
      airlineCode: "VJ",
      departureTime: "15:35",
      destination: "Ho Chi Minh City",
      destinationCode: "SGN",
    },
    {
      flightNumber: "VN 640",
      airline: "Vietnam Airlines",
      airlineCode: "VN",
      departureTime: "16:05",
      destination: "Ho Chi Minh City",
      destinationCode: "SGN",
    },
    {
      flightNumber: "VJ 998",
      airline: "VietJet Air",
      airlineCode: "VJ",
      departureTime: "17:25",
      destination: "Hanoi",
      destinationCode: "HAN",
    },
  ];
}
