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
  checkInOpeningTime: string;
  checkInClosingTime: string;
  checkInStatus: "open" | "closing_soon" | "closed" | "not_open_yet" | "unknown";
  minutesUntilCheckInOpens: number | null;
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
  const [notifyEmail, setNotifyEmail] = useState("");
  const [subscribeLoading, setSubscribeLoading] = useState(false);
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);
  const [subscribeError, setSubscribeError] = useState<string | null>(null);

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
      case "not_open_yet":
        return "bg-blue-100 text-blue-800 border-blue-200";
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
      case "not_open_yet":
        return "🕐";
      default:
        return "?";
    }
  };

  const getCheckInMessage = () => {
    if (flightData.checkInStatus === "closed") {
      return "Check-in has CLOSED - Contact us immediately!";
    }
    if (flightData.checkInStatus === "not_open_yet" && flightData.minutesUntilCheckInOpens) {
      const hours = Math.floor(flightData.minutesUntilCheckInOpens / 60);
      const mins = flightData.minutesUntilCheckInOpens % 60;
      if (hours > 0) {
        return `Check-in opens in ${hours}h ${mins}m`;
      }
      return `Check-in opens in ${mins} minutes`;
    }
    if (flightData.checkInStatus === "closing_soon" && flightData.minutesUntilCheckInCloses) {
      return `Check-in closes in ${flightData.minutesUntilCheckInCloses} minutes!`;
    }
    if (flightData.checkInStatus === "open" && flightData.minutesUntilCheckInCloses) {
      const hours = Math.floor(flightData.minutesUntilCheckInCloses / 60);
      const mins = flightData.minutesUntilCheckInCloses % 60;
      return `Check-in is OPEN - closes in ${hours}h ${mins}m`;
    }
    return "Check-in status unknown";
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifyEmail || !flightData) return;

    setSubscribeLoading(true);
    setSubscribeError(null);

    try {
      const response = await fetch("/api/flight-notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: notifyEmail,
          flightNumber: flightData.flightNumber,
          flightDate: date || new Date().toISOString().split("T")[0],
          departureAirport: flightData.departure.airport,
          arrivalAirport: flightData.arrival.airport,
          scheduledDeparture: flightData.departure.scheduledTime,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setSubscribeError(data.error || "Failed to subscribe");
        return;
      }

      setSubscribeSuccess(true);
      setNotifyEmail("");
    } catch {
      setSubscribeError("Failed to subscribe to notifications");
    } finally {
      setSubscribeLoading(false);
    }
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
              <div className="text-xs opacity-75 mt-1">
                <div className="flex items-center gap-1">
                  <span className="text-green-600">Opens:</span> {formatTime(flightData.checkInOpeningTime)} ({formatDate(flightData.checkInOpeningTime)})
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-red-600">Closes:</span> {formatTime(flightData.checkInClosingTime)} ({formatDate(flightData.checkInClosingTime)})
                </div>
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

      {/* Email Notification Subscription */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        {subscribeSuccess ? (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-200 text-green-800">
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">You&apos;ll receive email notifications for flight status changes!</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                Get notified about flight changes
              </span>
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                value={notifyEmail}
                onChange={(e) => setNotifyEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                title="Please enter a valid email address (e.g., name@example.com)"
              />
              <button
                type="submit"
                disabled={subscribeLoading || !notifyEmail}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {subscribeLoading ? (
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  "Notify Me"
                )}
              </button>
            </div>
            {subscribeError && (
              <p className="text-xs text-red-600">{subscribeError}</p>
            )}
            <p className="text-xs text-gray-500">
              We&apos;ll email you if your flight status, gate, or time changes.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
