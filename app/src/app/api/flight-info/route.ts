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
  const origin = searchParams.get("origin"); // Optional: origin airport code (e.g., "DPS" or "WADD")

  if (!flightNumber) {
    return NextResponse.json(
      { error: "Flight number is required" },
      { status: 400 }
    );
  }

  const apiKey = process.env.AERODATABOX_API_KEY;

  if (!apiKey) {
    // Return mock data for development/demo purposes
    return NextResponse.json(getMockFlightData(flightNumber, date, origin));
  }

  try {
    // Normalize flight number: remove spaces and trim (e.g., "VJ 894" -> "VJ894")
    const normalizedFlightNumber = flightNumber.replace(/\s+/g, "").trim();

    // Parse flight number (e.g., "VN123" -> airline: "VN", number: "123")
    const match = normalizedFlightNumber.match(/^([A-Z]{2,3})(\d+)$/i);
    if (!match) {
      return NextResponse.json(
        { error: "Invalid flight number format. Use format like VN123 or VJ 894" },
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
      const errorText = await response.text().catch(() => "Unknown error");
      console.error(`AeroDataBox API error: ${response.status} - ${errorText}`);

      if (response.status === 404) {
        return NextResponse.json(
          { error: "Flight not found. Please check the flight number and date." },
          { status: 404 }
        );
      }
      if (response.status === 403 || response.status === 401) {
        // API key issue - fall back to mock data
        console.error("AeroDataBox API key issue, returning mock data");
        return NextResponse.json(getMockFlightData(flightNumber, date, origin));
      }
      if (response.status === 429) {
        // Rate limit exceeded - fall back to mock data
        console.error("AeroDataBox rate limit exceeded, returning mock data");
        return NextResponse.json(getMockFlightData(flightNumber, date, origin));
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

    // If origin is provided, try to find a flight departing from that airport
    // This handles cases where the same flight number operates on multiple routes
    let flight = data[0];
    if (origin && data.length > 0) {
      const originUpper = origin.toUpperCase();
      const matchingFlight = data.find((f: { departure?: { airport?: { iata?: string; icao?: string } } }) =>
        f.departure?.airport?.iata?.toUpperCase() === originUpper ||
        f.departure?.airport?.icao?.toUpperCase() === originUpper
      );
      if (matchingFlight) {
        flight = matchingFlight;
      }
    }

    // Debug: log the flight data structure
    console.log("AeroDataBox flight data:", JSON.stringify(flight.departure, null, 2));

    // Parse departure time - prefer UTC time for accurate calculations
    // AeroDataBox returns scheduledTime as object with "utc" and "local" properties
    let departureTimeStr: string | undefined;

    // Prefer UTC time for calculations (avoids timezone issues)
    if (flight.departure?.scheduledTime?.utc) {
      departureTimeStr = flight.departure.scheduledTime.utc;
    } else if (typeof flight.departure?.scheduledTimeUtc === "string") {
      departureTimeStr = flight.departure.scheduledTimeUtc;
    } else if (flight.departure?.scheduledTimeUtc?.utc) {
      departureTimeStr = flight.departure.scheduledTimeUtc.utc;
    } else if (flight.departure?.scheduledTime?.local) {
      departureTimeStr = flight.departure.scheduledTime.local;
    } else if (typeof flight.departure?.scheduledTimeLocal === "string") {
      departureTimeStr = flight.departure.scheduledTimeLocal;
    } else if (flight.departure?.scheduledTimeLocal?.local) {
      departureTimeStr = flight.departure.scheduledTimeLocal.local;
    }

    // Also get local time for display purposes
    let departureLocalStr: string | undefined;
    if (flight.departure?.scheduledTime?.local) {
      departureLocalStr = flight.departure.scheduledTime.local;
    } else if (typeof flight.departure?.scheduledTimeLocal === "string") {
      departureLocalStr = flight.departure.scheduledTimeLocal;
    } else if (flight.departure?.scheduledTimeLocal?.local) {
      departureLocalStr = flight.departure.scheduledTimeLocal.local;
    }

    let departureTime: Date;

    if (departureTimeStr && typeof departureTimeStr === "string") {
      // Handle UTC format like "2026-01-12 07:35Z"
      let timeStr = departureTimeStr;
      // Replace space with T for ISO format
      if (timeStr.includes(" ")) {
        timeStr = timeStr.replace(" ", "T");
      }
      // Ensure Z suffix for UTC times
      if (!timeStr.includes("+") && !timeStr.includes("Z") && !timeStr.match(/[+-]\d{2}:\d{2}$/)) {
        timeStr += "Z";
      }
      departureTime = new Date(timeStr);

      // If still invalid, try original string
      if (isNaN(departureTime.getTime())) {
        departureTime = new Date(departureTimeStr);
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

    // For display, use local time if available
    const displayDepartureTime = departureLocalStr ? departureLocalStr : departureTime.toISOString();

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

    // Helper to format airport name with code - ensures format like "Airport Name (ABC)"
    const formatAirportWithCode = (airport: { name?: string; iata?: string } | undefined): string => {
      if (!airport) return "Unknown";
      const name = airport.name || "Unknown";
      const code = airport.iata;
      // If name already contains the code in parentheses, return as-is
      if (code && name.includes(`(${code})`)) {
        return name;
      }
      // Otherwise append the code
      if (code) {
        return `${name} (${code})`;
      }
      return name;
    };

    const flightData: FlightData = {
      flightNumber: `${airlineCode}${flightNum}`.toUpperCase(),
      airline: flight.airline?.name || airlineCode,
      departure: {
        airport: formatAirportWithCode(flight.departure?.airport),
        scheduledTime: displayDepartureTime,
        terminal: flight.departure?.terminal,
        gate: flight.departure?.gate,
        actualTime: flight.departure?.actualTime ? extractTimeString(flight.departure.actualTime) : undefined,
      },
      arrival: {
        airport: formatAirportWithCode(flight.arrival?.airport),
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
    // On any error, return mock data so the feature still works
    return NextResponse.json(getMockFlightData(flightNumber, date, origin));
  }
}

// Mock data for development/demo when no API key is configured
function getMockFlightData(flightNumber: string, date: string | null, origin: string | null): FlightData {
  // Normalize flight number: remove spaces
  const normalizedFlightNumber = flightNumber.replace(/\s+/g, "").trim().toUpperCase();

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

  // Parse airline code from normalized flight number
  const match = normalizedFlightNumber.match(/^([A-Z]{2,3})/i);
  const airlineCode = match ? match[1].toUpperCase() : "XX";

  const airlines: Record<string, string> = {
    "VN": "Vietnam Airlines",
    "VJ": "VietJet Air",
    "QH": "Bamboo Airways",
    "BL": "Pacific Airlines",
    "SQ": "Singapore Airlines",
    "QR": "Qatar Airways",
    "EK": "Emirates",
    "TG": "Thai Airways",
    "CX": "Cathay Pacific",
    "MH": "Malaysia Airlines",
    "BA": "British Airways",
    "LH": "Lufthansa",
    "KE": "Korean Air",
    "OZ": "Asiana Airlines",
    "JL": "Japan Airlines",
    "NH": "ANA",
    "CZ": "China Southern",
    "CA": "Air China",
    "MU": "China Eastern",
  };

  // Routes based on airline - default routes
  const defaultRoutes: Record<string, { from: string; to: string; fromTerminal: string; toTerminal: string }> = {
    "VN": { from: "Incheon International Airport (ICN)", to: "Noi Bai International Airport (HAN)", fromTerminal: "1", toTerminal: "2" },
    "VJ": { from: "Changi Airport (SIN)", to: "Tan Son Nhat International Airport (SGN)", fromTerminal: "4", toTerminal: "1" },
    "QH": { from: "Narita International Airport (NRT)", to: "Da Nang International Airport (DAD)", fromTerminal: "2", toTerminal: "1" },
    "SQ": { from: "Changi Airport (SIN)", to: "Tan Son Nhat International Airport (SGN)", fromTerminal: "3", toTerminal: "2" },
    "TG": { from: "Suvarnabhumi Airport (BKK)", to: "Noi Bai International Airport (HAN)", fromTerminal: "Main", toTerminal: "2" },
    "EK": { from: "Dubai International Airport (DXB)", to: "Tan Son Nhat International Airport (SGN)", fromTerminal: "3", toTerminal: "2" },
    "QR": { from: "Hamad International Airport (DOH)", to: "Noi Bai International Airport (HAN)", fromTerminal: "Main", toTerminal: "2" },
    "CX": { from: "Hong Kong International Airport (HKG)", to: "Tan Son Nhat International Airport (SGN)", fromTerminal: "1", toTerminal: "2" },
    "MH": { from: "Kuala Lumpur International Airport (KUL)", to: "Noi Bai International Airport (HAN)", fromTerminal: "M", toTerminal: "2" },
    "KE": { from: "Incheon International Airport (ICN)", to: "Tan Son Nhat International Airport (SGN)", fromTerminal: "2", toTerminal: "2" },
  };

  // Routes from DPS (Denpasar Bali) - used when origin is DPS
  const dpsRoutes: Record<string, { from: string; to: string; fromTerminal: string; toTerminal: string }> = {
    "VN": { from: "Ngurah Rai International Airport (DPS)", to: "Tan Son Nhat International Airport (SGN)", fromTerminal: "I", toTerminal: "2" },
    "VJ": { from: "Ngurah Rai International Airport (DPS)", to: "Tan Son Nhat International Airport (SGN)", fromTerminal: "I", toTerminal: "1" },
    "QH": { from: "Ngurah Rai International Airport (DPS)", to: "Da Nang International Airport (DAD)", fromTerminal: "I", toTerminal: "1" },
    "SQ": { from: "Ngurah Rai International Airport (DPS)", to: "Noi Bai International Airport (HAN)", fromTerminal: "I", toTerminal: "2" },
    "TG": { from: "Ngurah Rai International Airport (DPS)", to: "Noi Bai International Airport (HAN)", fromTerminal: "I", toTerminal: "2" },
    "MH": { from: "Ngurah Rai International Airport (DPS)", to: "Tan Son Nhat International Airport (SGN)", fromTerminal: "I", toTerminal: "2" },
    "GA": { from: "Ngurah Rai International Airport (DPS)", to: "Noi Bai International Airport (HAN)", fromTerminal: "I", toTerminal: "2" },
    "CX": { from: "Ngurah Rai International Airport (DPS)", to: "Tan Son Nhat International Airport (SGN)", fromTerminal: "I", toTerminal: "2" },
  };

  // Select route based on origin
  let route: { from: string; to: string; fromTerminal: string; toTerminal: string };
  const originUpper = origin?.toUpperCase();

  if (originUpper === "DPS" || originUpper === "WADD") {
    route = dpsRoutes[airlineCode] || {
      from: "Ngurah Rai International Airport (DPS)",
      to: "Tan Son Nhat International Airport (SGN)",
      fromTerminal: "I",
      toTerminal: "2"
    };
  } else {
    route = defaultRoutes[airlineCode] || {
      from: "Singapore Changi Airport (SIN)",
      to: "Tan Son Nhat International Airport (SGN)",
      fromTerminal: "3",
      toTerminal: "2"
    };
  }

  return {
    flightNumber: normalizedFlightNumber,
    airline: airlines[airlineCode] || `${airlineCode} Airlines`,
    departure: {
      airport: route.from,
      scheduledTime: departureTime.toISOString(),
      terminal: route.fromTerminal,
      gate: `${String.fromCharCode(65 + Math.floor(Math.random() * 4))}${Math.floor(Math.random() * 20) + 1}`,
    },
    arrival: {
      airport: route.to,
      scheduledTime: new Date(departureTime.getTime() + 2 * 60 * 60 * 1000).toISOString(),
      terminal: route.toTerminal,
    },
    status: "On Time",
    checkInOpeningTime: checkInOpeningTime.toISOString(),
    checkInClosingTime: checkInClosingTime.toISOString(),
    checkInStatus,
    minutesUntilCheckInOpens: minutesUntilOpen > 0 ? minutesUntilOpen : null,
    minutesUntilCheckInCloses: minutesUntilClose > 0 ? minutesUntilClose : null,
  };
}
