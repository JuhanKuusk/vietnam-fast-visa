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
  checkInOpeningTime: string;
  checkInClosingTime: string;
  checkInStatus: "open" | "closing_soon" | "closed" | "not_open_yet" | "unknown";
  minutesUntilCheckInOpens: number | null;
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

    // Debug: log the flight data structure
    console.log("AeroDataBox flight data:", JSON.stringify(flight.departure, null, 2));

    // Parse departure time - handle various date formats from API
    // AeroDataBox returns scheduledTimeLocal as an object with "dateTime" property
    let departureTimeStr: string | undefined;

    if (typeof flight.departure?.scheduledTimeLocal === "string") {
      departureTimeStr = flight.departure.scheduledTimeLocal;
    } else if (flight.departure?.scheduledTimeLocal?.dateTime) {
      departureTimeStr = flight.departure.scheduledTimeLocal.dateTime;
    } else if (typeof flight.departure?.scheduledTime === "string") {
      departureTimeStr = flight.departure.scheduledTime;
    } else if (flight.departure?.scheduledTime?.dateTime) {
      departureTimeStr = flight.departure.scheduledTime.dateTime;
    } else if (typeof flight.departure?.scheduledTimeUtc === "string") {
      departureTimeStr = flight.departure.scheduledTimeUtc;
    } else if (flight.departure?.scheduledTimeUtc?.dateTime) {
      departureTimeStr = flight.departure.scheduledTimeUtc.dateTime;
    }

    let departureTime: Date;

    if (departureTimeStr && typeof departureTimeStr === "string") {
      // Try parsing the date string
      departureTime = new Date(departureTimeStr);

      // If invalid, try to handle format like "2026-01-12 14:30"
      if (isNaN(departureTime.getTime())) {
        // Replace space with T for ISO format
        const isoFormatted = departureTimeStr.replace(" ", "T");
        departureTime = new Date(isoFormatted);
      }
    } else {
      // Fallback: use current time + 3 hours
      departureTime = new Date();
      departureTime.setHours(departureTime.getHours() + 3);
    }

    // Validate the date is valid
    if (isNaN(departureTime.getTime())) {
      console.error("Could not parse departure time:", departureTimeStr);
      // Use fallback time
      departureTime = new Date();
      departureTime.setHours(departureTime.getHours() + 3);
    }

    // Calculate check-in times
    // Check-in typically opens 3 hours before departure for international flights
    // Check-in closes 45 minutes before departure
    const checkInOpeningTime = new Date(departureTime.getTime() - 3 * 60 * 60 * 1000);
    const checkInClosingTime = new Date(departureTime.getTime() - 45 * 60 * 1000);
    const now = new Date();
    const minutesUntilOpen = Math.floor((checkInOpeningTime.getTime() - now.getTime()) / (1000 * 60));
    const minutesUntilClose = Math.floor((checkInClosingTime.getTime() - now.getTime()) / (1000 * 60));

    let checkInStatus: FlightData["checkInStatus"] = "unknown";
    if (minutesUntilOpen > 0) {
      checkInStatus = "not_open_yet";
    } else if (minutesUntilClose > 60) {
      checkInStatus = "open";
    } else if (minutesUntilClose > 0) {
      checkInStatus = "closing_soon";
    } else {
      checkInStatus = "closed";
    }

    // Helper to extract time string from API response
    const extractTimeString = (timeObj: unknown): string => {
      if (typeof timeObj === "string") return timeObj;
      if (timeObj && typeof timeObj === "object") {
        const obj = timeObj as Record<string, unknown>;
        if (typeof obj.local === "string") return obj.local;
        if (typeof obj.dateTime === "string") return obj.dateTime;
        if (typeof obj.utc === "string") return obj.utc;
      }
      return new Date().toISOString();
    };

    const flightData: FlightData = {
      flightNumber: `${airlineCode}${flightNum}`.toUpperCase(),
      airline: flight.airline?.name || airlineCode,
      departure: {
        airport: flight.departure?.airport?.name || flight.departure?.airport?.iata || "Unknown",
        scheduledTime: departureTime.toISOString(),
        terminal: flight.departure?.terminal,
        gate: flight.departure?.gate,
        actualTime: flight.departure?.actualTime ? extractTimeString(flight.departure.actualTime) : undefined,
      },
      arrival: {
        airport: flight.arrival?.airport?.name || flight.arrival?.airport?.iata || "Unknown",
        scheduledTime: extractTimeString(flight.arrival?.scheduledTimeLocal || flight.arrival?.scheduledTime || flight.arrival?.scheduledTimeUtc),
        terminal: flight.arrival?.terminal,
        gate: flight.arrival?.gate,
      },
      status: flight.status || "Scheduled",
      checkInOpeningTime: checkInOpeningTime.toISOString(),
      checkInClosingTime: checkInClosingTime.toISOString(),
      checkInStatus,
      minutesUntilCheckInOpens: minutesUntilOpen > 0 ? minutesUntilOpen : null,
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
  // Set departure time to 3 hours from now for demo
  const departureTime = new Date();
  departureTime.setHours(departureTime.getHours() + 3);

  // Check-in opens 3 hours before, closes 45 minutes before
  const checkInOpeningTime = new Date(departureTime.getTime() - 3 * 60 * 60 * 1000);
  const checkInClosingTime = new Date(departureTime.getTime() - 45 * 60 * 1000);
  const now = new Date();
  const minutesUntilOpen = Math.floor((checkInOpeningTime.getTime() - now.getTime()) / (1000 * 60));
  const minutesUntilClose = Math.floor((checkInClosingTime.getTime() - now.getTime()) / (1000 * 60));

  let checkInStatus: FlightData["checkInStatus"] = "open";
  if (minutesUntilOpen > 0) {
    checkInStatus = "not_open_yet";
  } else if (minutesUntilClose <= 60 && minutesUntilClose > 0) {
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
    checkInOpeningTime: checkInOpeningTime.toISOString(),
    checkInClosingTime: checkInClosingTime.toISOString(),
    checkInStatus,
    minutesUntilCheckInOpens: minutesUntilOpen > 0 ? minutesUntilOpen : null,
    minutesUntilCheckInCloses: minutesUntilClose > 0 ? minutesUntilClose : null,
  };
}
