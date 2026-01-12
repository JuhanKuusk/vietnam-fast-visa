import { NextRequest, NextResponse } from "next/server";

// AeroDataBox API for flight information
// Sign up at: https://rapidapi.com/aedbx-aedbx/api/aerodatabox

interface FlightData {
  flightNumber: string;
  airline: string;
  departure: {
    airport: string;
    scheduledTime: string;
    terminal?: string;
    gate?: string;
    actualTime?: string;
  };
  arrival: {
    airport: string;
    scheduledTime: string;
    terminal?: string;
    gate?: string;
  };
  status: string;
  checkInClosingTime: string;
  checkInStatus: "open" | "closing_soon" | "closed" | "unknown";
  minutesUntilCheckInCloses: number | null;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const flightNumber = searchParams.get("flight");
  const date = searchParams.get("date"); // Format: YYYY-MM-DD

  if (!flightNumber) {
    return NextResponse.json(
      { error: "Flight number is required" },
      { status: 400 }
    );
  }

  const apiKey = process.env.AERODATABOX_API_KEY;

  if (!apiKey) {
    // Return mock data for development/demo purposes
    return NextResponse.json(getMockFlightData(flightNumber, date));
  }

  try {
    // Parse flight number (e.g., "VN123" -> airline: "VN", number: "123")
    const match = flightNumber.match(/^([A-Z]{2,3})(\d+)$/i);
    if (!match) {
      return NextResponse.json(
        { error: "Invalid flight number format. Use format like VN123 or SQ456" },
        { status: 400 }
      );
    }

    const [, airlineCode, flightNum] = match;
    const flightDate = date || new Date().toISOString().split("T")[0];

    // AeroDataBox API call - Flight status (specific date)
    const response = await fetch(
      `https://aerodatabox.p.rapidapi.com/flights/number/${airlineCode}${flightNum}/${flightDate}?withAircraftImage=false&withLocation=false`,
      {
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "aerodatabox.p.rapidapi.com",
        },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: "Flight not found. Please check the flight number and date." },
          { status: 404 }
        );
      }
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: "Flight not found" },
        { status: 404 }
      );
    }

    // Get the first flight result
    const flight = data[0];

    // Calculate check-in closing time (typically 45 minutes before departure for international)
    const departureTime = new Date(flight.departure?.scheduledTime || flight.departure?.scheduledTimeUtc);
    const checkInClosingTime = new Date(departureTime.getTime() - 45 * 60 * 1000);
    const now = new Date();
    const minutesUntilClose = Math.floor((checkInClosingTime.getTime() - now.getTime()) / (1000 * 60));

    let checkInStatus: FlightData["checkInStatus"] = "unknown";
    if (minutesUntilClose > 60) {
      checkInStatus = "open";
    } else if (minutesUntilClose > 0) {
      checkInStatus = "closing_soon";
    } else {
      checkInStatus = "closed";
    }

    const flightData: FlightData = {
      flightNumber: `${airlineCode}${flightNum}`.toUpperCase(),
      airline: flight.airline?.name || airlineCode,
      departure: {
        airport: flight.departure?.airport?.name || flight.departure?.airport?.iata || "Unknown",
        scheduledTime: flight.departure?.scheduledTime || flight.departure?.scheduledTimeUtc,
        terminal: flight.departure?.terminal,
        gate: flight.departure?.gate,
        actualTime: flight.departure?.actualTime || flight.departure?.actualTimeUtc,
      },
      arrival: {
        airport: flight.arrival?.airport?.name || flight.arrival?.airport?.iata || "Unknown",
        scheduledTime: flight.arrival?.scheduledTime || flight.arrival?.scheduledTimeUtc,
        terminal: flight.arrival?.terminal,
        gate: flight.arrival?.gate,
      },
      status: flight.status || "Scheduled",
      checkInClosingTime: checkInClosingTime.toISOString(),
      checkInStatus,
      minutesUntilCheckInCloses: minutesUntilClose > 0 ? minutesUntilClose : null,
    };

    return NextResponse.json(flightData);
  } catch (error) {
    console.error("Flight info error:", error);
    return NextResponse.json(
      { error: "Failed to fetch flight information" },
      { status: 500 }
    );
  }
}

// Mock data for development/demo when no API key is configured
function getMockFlightData(flightNumber: string, date: string | null): FlightData {
  const flightDate = date ? new Date(date) : new Date();

  // Set departure time to 3 hours from now for demo
  const departureTime = new Date();
  departureTime.setHours(departureTime.getHours() + 3);

  const checkInClosingTime = new Date(departureTime.getTime() - 45 * 60 * 1000);
  const now = new Date();
  const minutesUntilClose = Math.floor((checkInClosingTime.getTime() - now.getTime()) / (1000 * 60));

  let checkInStatus: FlightData["checkInStatus"] = "open";
  if (minutesUntilClose <= 60 && minutesUntilClose > 0) {
    checkInStatus = "closing_soon";
  } else if (minutesUntilClose <= 0) {
    checkInStatus = "closed";
  }

  // Parse airline code from flight number
  const match = flightNumber.match(/^([A-Z]{2,3})/i);
  const airlineCode = match ? match[1].toUpperCase() : "XX";

  const airlines: Record<string, string> = {
    "VN": "Vietnam Airlines",
    "SQ": "Singapore Airlines",
    "QR": "Qatar Airways",
    "EK": "Emirates",
    "TG": "Thai Airways",
    "CX": "Cathay Pacific",
    "MH": "Malaysia Airlines",
    "BA": "British Airways",
    "LH": "Lufthansa",
  };

  return {
    flightNumber: flightNumber.toUpperCase(),
    airline: airlines[airlineCode] || `${airlineCode} Airlines`,
    departure: {
      airport: "Singapore Changi Airport (SIN)",
      scheduledTime: departureTime.toISOString(),
      terminal: "3",
      gate: "A15",
    },
    arrival: {
      airport: "Ho Chi Minh City (SGN)",
      scheduledTime: new Date(departureTime.getTime() + 2 * 60 * 60 * 1000).toISOString(),
      terminal: "2",
    },
    status: "On Time",
    checkInClosingTime: checkInClosingTime.toISOString(),
    checkInStatus,
    minutesUntilCheckInCloses: minutesUntilClose > 0 ? minutesUntilClose : null,
  };
}
