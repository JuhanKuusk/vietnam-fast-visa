"use client";

import { useState, useEffect } from "react";

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

interface FlightInfoProps {
  flightNumber: string;
  date?: string;
  onCheckInUrgent?: () => void;
}

export function FlightInfo({ flightNumber, date, onCheckInUrgent }: FlightInfoProps) {
  const [flightData, setFlightData] = useState<FlightData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!flightNumber || flightNumber.length < 3) {
      setFlightData(null);
      setError(null);
      return;
    }

    const fetchFlightInfo = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({ flight: flightNumber });
        if (date) params.append("date", date);

        const response = await fetch(`/api/flight-info?${params}`);
        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Failed to fetch flight info");
          setFlightData(null);
          return;
        }

        setFlightData(data);

        // Trigger callback if check-in is closing soon
        if (data.checkInStatus === "closing_soon" && onCheckInUrgent) {
          onCheckInUrgent();
        }
      } catch {
        setError("Failed to fetch flight information");
        setFlightData(null);
      } finally {
        setLoading(false);
      }
    };

    // Debounce the API call
    const timeoutId = setTimeout(fetchFlightInfo, 500);
    return () => clearTimeout(timeoutId);
  }, [flightNumber, date, onCheckInUrgent]);

  if (!flightNumber || flightNumber.length < 3) {
    return null;
  }

  if (loading) {
    return (
      <div className="mt-3 p-4 rounded-xl bg-gray-50 border border-gray-200 animate-pulse">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gray-300"></div>
          <div className="h-4 bg-gray-300 rounded w-32"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return null; // Silently fail - don't show errors for flight lookup
  }

  if (!flightData) {
    return null;
  }

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status: FlightData["checkInStatus"]) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800 border-green-200";
      case "closing_soon":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "closed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: FlightData["checkInStatus"]) => {
    switch (status) {
      case "open":
        return "✓";
      case "closing_soon":
        return "⚠️";
      case "closed":
        return "✕";
      default:
        return "?";
    }
  };

  const getCheckInMessage = () => {
    if (flightData.checkInStatus === "closed") {
      return "Check-in has CLOSED - Contact us immediately!";
    }
    if (flightData.checkInStatus === "closing_soon" && flightData.minutesUntilCheckInCloses) {
      return `Check-in closes in ${flightData.minutesUntilCheckInCloses} minutes!`;
    }
    if (flightData.checkInStatus === "open" && flightData.minutesUntilCheckInCloses) {
      const hours = Math.floor(flightData.minutesUntilCheckInCloses / 60);
      const mins = flightData.minutesUntilCheckInCloses % 60;
      return `Check-in closes in ${hours}h ${mins}m`;
    }
    return "Check-in status unknown";
  };

  return (
    <div className={`mt-3 p-4 rounded-xl border-2 ${flightData.checkInStatus === "closing_soon" ? "border-yellow-400 bg-yellow-50" : flightData.checkInStatus === "closed" ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"}`}>
      {/* Flight Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">✈️</span>
          <div>
            <span className="font-bold text-gray-900">{flightData.flightNumber}</span>
            <span className="text-gray-500 text-sm ml-2">{flightData.airline}</span>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${flightData.status === "On Time" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
          {flightData.status}
        </span>
      </div>

      {/* Route */}
      <div className="flex items-center gap-3 mb-3 text-sm">
        <div className="flex-1">
          <div className="font-medium text-gray-900">{flightData.departure.airport.split("(")[0].trim()}</div>
          <div className="text-gray-500 text-xs">{formatTime(flightData.departure.scheduledTime)}</div>
        </div>
        <div className="flex items-center text-gray-400">
          <div className="w-8 h-px bg-gray-300"></div>
          <span className="mx-1">→</span>
          <div className="w-8 h-px bg-gray-300"></div>
        </div>
        <div className="flex-1 text-right">
          <div className="font-medium text-gray-900">{flightData.arrival.airport.split("(")[0].trim()}</div>
          <div className="text-gray-500 text-xs">{formatTime(flightData.arrival.scheduledTime)}</div>
        </div>
      </div>

      {/* Gate & Terminal Info */}
      <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
        {flightData.departure.terminal && (
          <div className="bg-gray-50 rounded-lg p-2">
            <span className="text-gray-500 text-xs">Terminal</span>
            <div className="font-semibold text-gray-900">{flightData.departure.terminal}</div>
          </div>
        )}
        {flightData.departure.gate && (
          <div className="bg-gray-50 rounded-lg p-2">
            <span className="text-gray-500 text-xs">Gate</span>
            <div className="font-semibold text-gray-900">{flightData.departure.gate}</div>
          </div>
        )}
      </div>

      {/* Check-in Status - THE KEY INFO */}
      <div className={`p-3 rounded-lg border ${getStatusColor(flightData.checkInStatus)}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">{getStatusIcon(flightData.checkInStatus)}</span>
            <div>
              <div className="font-semibold text-sm">{getCheckInMessage()}</div>
              <div className="text-xs opacity-75">
                Closes at {formatTime(flightData.checkInClosingTime)} ({formatDate(flightData.checkInClosingTime)})
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Urgent Warning */}
      {(flightData.checkInStatus === "closing_soon" || flightData.checkInStatus === "closed") && (
        <button
          onClick={() => {
            if (typeof window !== 'undefined' && (window as unknown as { Askly?: { open?: () => void } }).Askly?.open) {
              (window as unknown as { Askly: { open: () => void } }).Askly.open();
            }
          }}
          className="mt-3 w-full py-3 rounded-lg font-bold text-white flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
          style={{ backgroundColor: '#e13530' }}
        >
          <svg className="w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
          </svg>
          {flightData.checkInStatus === "closed" ? "URGENT: Chat Now for Help!" : "Get Visa Before Check-in Closes!"}
        </button>
      )}
    </div>
  );
}
