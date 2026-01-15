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
  const searchParams = request.nextUrl.searchParams;
  const requestedDate = searchParams.get("date"); // Optional: specific date in YYYY-MM-DD format

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
    const dateObj = new Date(requestedDate + "T12:00:00Z"); // Use noon UTC to avoid timezone issues

    if (!apiKey) {
      return NextResponse.json({
        success: true,
        days: [
          {
            date: requestedDate,
            dateFormatted: formatDateDisplay(dateObj),
            flights: getMockFlightsForDate(requestedDate),
          },
        ],
      });
    }

    try {
      const flights = await fetchFlightsForDate(requestedDate, apiKey);
      return NextResponse.json({
        success: true,
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

  if (!apiKey) {
    // Return mock data for development
    return NextResponse.json({
      success: true,
      days: [
        {
          date: todayStr,
          dateFormatted: formatDateDisplay(today),
          flights: getMockFlightsForDate(todayStr),
        },
        {
          date: tomorrowStr,
          dateFormatted: formatDateDisplay(tomorrow),
          flights: getMockFlightsForDate(tomorrowStr),
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
  // AeroDataBox API has a 12-hour maximum limit, so we need to split the day into two requests
  const timeRanges = [
    { from: `${date}T00:00`, to: `${date}T11:59` },
    { from: `${date}T12:00`, to: `${date}T23:59` },
  ];

  for (const { from: fromTime, to: toTime } of timeRanges) {
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
        console.error(`API error for ${date} (${fromTime}-${toTime}): ${response.status}`);
        continue;
      }

      const data = await response.json();

      if (!data.departures) {
        continue;
      }

      // Filter for Vietnam-bound flights
      // Note: AeroDataBox API returns destination as movement.airport for departures
      for (const dep of data.departures) {
        const arrivalIcao = dep.movement?.airport?.icao;

        if (arrivalIcao && VIETNAM_AIRPORTS.includes(arrivalIcao)) {
          // Extract local departure time from movement.scheduledTime
          let departureTime = "";
          if (dep.movement?.scheduledTime?.local) {
            // Format: "2026-01-15 13:10+08:00" -> "13:10"
            const localTime = dep.movement.scheduledTime.local;
            departureTime = localTime.includes(" ")
              ? localTime.split(" ")[1].substring(0, 5)
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
          });
        }
      }
    } catch (error) {
      console.error(`Error fetching flights for ${date} (${fromTime}-${toTime}):`, error);
    }
  }

  // Sort by departure time
  flights.sort((a, b) => a.departureTime.localeCompare(b.departureTime));

  return flights;
}

// Mock flights vary by day of week for realistic demo data
function getMockFlightsForDate(dateStr: string): Flight[] {
  const date = new Date(dateStr + "T12:00:00Z");
  const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday

  // Base flights that always operate
  const baseFlights: Flight[] = [
    {
      flightNumber: "VJ 894",
      airline: "VietJet Air",
      airlineCode: "VJ",
      departureTime: "14:05",
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
  ];

  // Additional flights based on day of week
  const additionalFlights: Record<number, Flight[]> = {
    0: [ // Sunday
      { flightNumber: "VJ 900", airline: "VietJet Air", airlineCode: "VJ", departureTime: "08:30", destination: "Hanoi", destinationCode: "HAN" },
      { flightNumber: "VJ 896", airline: "VietJet Air", airlineCode: "VJ", departureTime: "19:45", destination: "Ho Chi Minh City", destinationCode: "SGN" },
    ],
    1: [ // Monday
      { flightNumber: "VJ 898", airline: "VietJet Air", airlineCode: "VJ", departureTime: "15:35", destination: "Ho Chi Minh City", destinationCode: "SGN" },
      { flightNumber: "VJ 998", airline: "VietJet Air", airlineCode: "VJ", departureTime: "17:25", destination: "Hanoi", destinationCode: "HAN" },
    ],
    2: [ // Tuesday
      { flightNumber: "VJ 900", airline: "VietJet Air", airlineCode: "VJ", departureTime: "13:10", destination: "Hanoi", destinationCode: "HAN" },
      { flightNumber: "VN 642", airline: "Vietnam Airlines", airlineCode: "VN", departureTime: "20:15", destination: "Ho Chi Minh City", destinationCode: "SGN" },
    ],
    3: [ // Wednesday
      { flightNumber: "VJ 898", airline: "VietJet Air", airlineCode: "VJ", departureTime: "15:35", destination: "Ho Chi Minh City", destinationCode: "SGN" },
      { flightNumber: "VJ 902", airline: "VietJet Air", airlineCode: "VJ", departureTime: "09:00", destination: "Da Nang", destinationCode: "DAD" },
      { flightNumber: "VJ 998", airline: "VietJet Air", airlineCode: "VJ", departureTime: "17:25", destination: "Hanoi", destinationCode: "HAN" },
    ],
    4: [ // Thursday
      { flightNumber: "VJ 900", airline: "VietJet Air", airlineCode: "VJ", departureTime: "13:10", destination: "Hanoi", destinationCode: "HAN" },
      { flightNumber: "VN 644", airline: "Vietnam Airlines", airlineCode: "VN", departureTime: "11:30", destination: "Hanoi", destinationCode: "HAN" },
    ],
    5: [ // Friday
      { flightNumber: "VJ 898", airline: "VietJet Air", airlineCode: "VJ", departureTime: "15:35", destination: "Ho Chi Minh City", destinationCode: "SGN" },
      { flightNumber: "VJ 998", airline: "VietJet Air", airlineCode: "VJ", departureTime: "17:25", destination: "Hanoi", destinationCode: "HAN" },
      { flightNumber: "VJ 904", airline: "VietJet Air", airlineCode: "VJ", departureTime: "21:00", destination: "Cam Ranh (Nha Trang)", destinationCode: "CXR" },
    ],
    6: [ // Saturday
      { flightNumber: "VJ 900", airline: "VietJet Air", airlineCode: "VJ", departureTime: "08:30", destination: "Hanoi", destinationCode: "HAN" },
      { flightNumber: "VJ 902", airline: "VietJet Air", airlineCode: "VJ", departureTime: "12:45", destination: "Da Nang", destinationCode: "DAD" },
      { flightNumber: "VN 646", airline: "Vietnam Airlines", airlineCode: "VN", departureTime: "18:30", destination: "Ho Chi Minh City", destinationCode: "SGN" },
    ],
  };

  const allFlights = [...baseFlights, ...(additionalFlights[dayOfWeek] || [])];

  // Sort by departure time
  return allFlights.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
}
