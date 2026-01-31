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
    return NextResponse.json(
      { error: "Flight info service unavailable. AERODATABOX_API_KEY not configured." },
      { status: 503 }
    );
  }

  try {
    console.log("[Flight-Info API] Request received - flight:", flightNumber, "date:", date, "origin:", origin);

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

    console.log("[Flight-Info API] Calling AeroDataBox with date:", flightDate);

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
        console.error("AeroDataBox API key issue");
        return NextResponse.json(
          { error: "Flight info service authentication failed. Please check API key." },
          { status: 401 }
        );
      }
      if (response.status === 429) {
        console.error("AeroDataBox rate limit exceeded");
        return NextResponse.json(
          { error: "Flight info service temporarily unavailable. Rate limit exceeded." },
          { status: 429 }
        );
      }
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("[Flight-Info API] AeroDataBox returned", data.length, "flights. First flight departure:", data[0]?.departure?.scheduledTime);

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: "Flight not found" },
        { status: 404 }
      );
    }

    // Verify the returned flight matches the requested date
    // AeroDataBox sometimes returns flights from nearby dates if the exact date's schedule isn't available yet
    // This is common for flights 3+ days in the future
    // We need to check the LOCAL departure date (not UTC) since users book flights by local departure date
    const firstFlightLocalTime = data[0]?.departure?.scheduledTime?.local || data[0]?.departure?.scheduledTimeLocal;
    if (firstFlightLocalTime) {
      // Local time format can be: "2026-02-03 09:00-05:00" or "2026-02-03T09:00:00-05:00"
      // Extract just the date part (YYYY-MM-DD)
      let returnedDate = firstFlightLocalTime;

      // Handle format with space separator: "2026-02-03 09:00-05:00"
      if (returnedDate.includes(" ")) {
        returnedDate = returnedDate.split(" ")[0];
      }
      // Handle ISO format: "2026-02-03T09:00:00-05:00"
      else if (returnedDate.includes("T")) {
        returnedDate = returnedDate.split("T")[0];
      }

      console.log("[Flight-Info API] Date comparison - Requested:", flightDate, "API returned local date:", returnedDate, "Raw:", firstFlightLocalTime);

      if (returnedDate !== flightDate) {
        // Calculate the date difference
        const requestedDateObj = new Date(flightDate + "T00:00:00Z");
        const returnedDateObj = new Date(returnedDate + "T00:00:00Z");
        const daysDiff = Math.abs((requestedDateObj.getTime() - returnedDateObj.getTime()) / (1000 * 60 * 60 * 24));

        console.log("[Flight-Info API] Date mismatch! Requested:", flightDate, "Got:", returnedDate, "Days diff:", daysDiff);

        // If the difference is small (1-2 days) and it's a future flight, accept it
        // This handles cases where AeroDataBox doesn't have exact future dates loaded yet
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const daysUntilFlight = Math.floor((requestedDateObj.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

        if (daysDiff <= 2 && daysUntilFlight >= 2) {
          // Flight exists and operates regularly, accept the data but adjust the times
          // This is a common pattern for daily flights where exact date data isn't available yet
          console.log("[Flight-Info API] Accepting nearby date data for future flight (", daysUntilFlight, "days away), adjusting by", daysDiff, "days");
          // Store the date adjustment to apply to times later
          (data as unknown as { _dateAdjustmentDays: number })._dateAdjustmentDays = requestedDateObj.getTime() > returnedDateObj.getTime() ? daysDiff : -daysDiff;
        } else {
          return NextResponse.json(
            { error: `Flight ${normalizedFlightNumber} not found for ${flightDate}. The flight may not operate on this date.` },
            { status: 404 }
          );
        }
      }
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

    // Apply date adjustment if needed (when API returned data for a different day)
    const dateAdjustmentDays: number = (data as unknown as { _dateAdjustmentDays?: number })._dateAdjustmentDays || 0;
    if (dateAdjustmentDays !== 0) {
      departureTime.setDate(departureTime.getDate() + dateAdjustmentDays);
      console.log("[Flight-Info API] Adjusted departure time by", dateAdjustmentDays, "days to:", departureTime.toISOString());
    }

    // For display and accurate time comparison, always use ISO format with UTC
    // This ensures the frontend can correctly compare times regardless of user's timezone
    const displayDepartureTime = departureTime.toISOString();

    // Parse arrival time similarly
    let arrivalTimeStr: string | undefined;
    if (flight.arrival?.scheduledTime?.utc) {
      arrivalTimeStr = flight.arrival.scheduledTime.utc;
    } else if (flight.arrival?.scheduledTime?.local) {
      arrivalTimeStr = flight.arrival.scheduledTime.local;
    } else if (typeof flight.arrival?.scheduledTimeUtc === "string") {
      arrivalTimeStr = flight.arrival.scheduledTimeUtc;
    } else if (typeof flight.arrival?.scheduledTimeLocal === "string") {
      arrivalTimeStr = flight.arrival.scheduledTimeLocal;
    }

    let arrivalTime: Date;
    if (arrivalTimeStr && typeof arrivalTimeStr === "string") {
      let timeStr = arrivalTimeStr;
      if (timeStr.includes(" ")) {
        timeStr = timeStr.replace(" ", "T");
      }
      if (!timeStr.includes("+") && !timeStr.includes("Z") && !timeStr.match(/[+-]\d{2}:\d{2}$/)) {
        timeStr += "Z";
      }
      arrivalTime = new Date(timeStr);
      if (isNaN(arrivalTime.getTime())) {
        arrivalTime = new Date(arrivalTimeStr);
      }
    } else {
      // Estimate arrival time: departure + typical flight duration (use 12 hours as fallback)
      arrivalTime = new Date(departureTime.getTime() + 12 * 60 * 60 * 1000);
    }

    // Apply date adjustment to arrival time if needed
    if (dateAdjustmentDays !== 0) {
      arrivalTime.setDate(arrivalTime.getDate() + dateAdjustmentDays);
      console.log("[Flight-Info API] Adjusted arrival time by", dateAdjustmentDays, "days to:", arrivalTime.toISOString());
    }

    const displayArrivalTime = arrivalTime.toISOString();

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
        scheduledTime: displayArrivalTime,
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
      { error: "Failed to fetch flight information. Please try again." },
      { status: 500 }
    );
  }
}
