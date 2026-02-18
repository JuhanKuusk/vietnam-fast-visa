"use client";

import { useState, useEffect, useRef } from "react";

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
  origin?: string; // Optional: origin airport code (e.g., "DPS") for accurate lookup
  onCheckInUrgent?: () => void;
  onFlightData?: (data: {
    arrivalAirport: string;
    arrivalAirportCode: string;
    departureAirport: string;
    departureAirportCode: string;
    arrivalDate: string; // ISO date string (YYYY-MM-DD) extracted from scheduled arrival time
    flightNumber: string; // The flight number
  }) => void;
  language?: string; // Language code for localization
}

export function FlightInfo({ flightNumber, date, origin, onCheckInUrgent, onFlightData, language = "EN" }: FlightInfoProps) {
  const isZH = language === "ZH";
  const [flightData, setFlightData] = useState<FlightData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notifyEmail, setNotifyEmail] = useState("");
  const [subscribeLoading, setSubscribeLoading] = useState(false);
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);
  const [subscribeError, setSubscribeError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Use refs for callbacks to prevent unnecessary re-fetches when parent re-renders
  const onFlightDataRef = useRef(onFlightData);
  const onCheckInUrgentRef = useRef(onCheckInUrgent);

  // Keep refs in sync with props
  useEffect(() => {
    onFlightDataRef.current = onFlightData;
    onCheckInUrgentRef.current = onCheckInUrgent;
  }, [onFlightData, onCheckInUrgent]);

  // Prevent hydration mismatch by only rendering time-dependent content after mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    console.log("[FlightInfo] useEffect triggered - flightNumber:", flightNumber, "date:", date);
    if (!flightNumber || flightNumber.length < 3) {
      console.log("[FlightInfo] Flight number too short, skipping API call");
      setFlightData(null);
      setError(null);
      return;
    }

    const fetchFlightInfo = async () => {
      console.log("[FlightInfo] fetchFlightInfo called - fetching API");
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({ flight: flightNumber });
        if (date) params.append("date", date);
        if (origin) params.append("origin", origin);

        console.log("[FlightInfo] Calling API with params:", params.toString());
        const response = await fetch(`/api/flight-info?${params}`);
        const data = await response.json();
        console.log("[FlightInfo] API response received:", { ok: response.ok, data });

        if (!response.ok) {
          setError(data.error || "Failed to fetch flight info");
          setFlightData(null);
          return;
        }

        setFlightData(data);

        // Trigger callback if check-in is closing soon (use ref to avoid dependency)
        if (data.checkInStatus === "closing_soon" && onCheckInUrgentRef.current) {
          onCheckInUrgentRef.current();
        }

        // Pass flight data to parent for pre-filling apply form (use ref to avoid dependency)
        console.log("[FlightInfo] onFlightDataRef.current exists:", !!onFlightDataRef.current);
        console.log("[FlightInfo] data.arrival:", data.arrival);
        console.log("[FlightInfo] data.departure:", data.departure);
        if (onFlightDataRef.current && data.arrival && data.departure) {
          // Extract airport codes from strings like "Noi Bai International (HAN)"
          const arrivalAirportMatch = data.arrival.airport.match(/\(([A-Z]{3})\)/);
          const arrivalAirportCode = arrivalAirportMatch ? arrivalAirportMatch[1] : "";
          const departureAirportMatch = data.departure.airport.match(/\(([A-Z]{3})\)/);
          const departureAirportCode = departureAirportMatch ? departureAirportMatch[1] : "";
          // Extract arrival date from scheduled arrival time (ISO format)
          const arrivalDate = data.arrival.scheduledTime
            ? data.arrival.scheduledTime.split("T")[0]
            : "";
          const flightDataToSend = {
            arrivalAirport: data.arrival.airport,
            arrivalAirportCode,
            departureAirport: data.departure.airport,
            departureAirportCode,
            arrivalDate,
            flightNumber: data.flightNumber,
          };
          console.log("[FlightInfo] Calling onFlightData with:", flightDataToSend);
          onFlightDataRef.current(flightDataToSend);
        } else {
          console.log("[FlightInfo] NOT calling onFlightData - ref or data missing");
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
  }, [flightNumber, date, origin]); // Removed callback deps - using refs instead

  if (!flightNumber || flightNumber.length < 3) {
    return null;
  }

  if (loading) {
    return (
      <div className="mt-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 animate-pulse">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
        <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
          <span>⚠️</span>
          <span className="text-sm">{error}</span>
        </div>
      </div>
    );
  }

  if (!flightData) {
    return null;
  }

  // Check if flight has already departed - don't show info for past flights
  const checkIfDeparted = () => {
    if (!isMounted) return false; // Don't check on server to avoid hydration mismatch
    try {
      const departureTime = new Date(flightData.departure.scheduledTime);
      const now = new Date();
      return departureTime < now;
    } catch {
      return false;
    }
  };

  // For departed flights, show info but with departed status
  const hasDeparted = checkIfDeparted();
  const isCheckInClosed = flightData.checkInStatus === "closed";

  // Check if flight arrives in Vietnam (for highlighting purposes)
  const vietnamAirportCodes = ["HAN", "SGN", "DAD", "CXR", "PQC", "VDO", "HPH", "VCA", "VII", "HUI", "DLI", "PXU", "UIH", "TBB", "BMV"];
  const arrivalAirportMatch = flightData.arrival.airport.match(/\(([A-Z]{3})\)/);
  const arrivalCode = arrivalAirportMatch ? arrivalAirportMatch[1] : "";
  const arrivesInVietnam = vietnamAirportCodes.includes(arrivalCode);

  // Check if this could be a connecting flight to Vietnam (common stopover airports)
  const commonStopovers = ["HKG", "SIN", "BKK", "KUL", "ICN", "NRT", "PEK", "PVG", "TPE", "MNL", "DOH", "DXB"];
  const isLikelyConnecting = commonStopovers.includes(arrivalCode);

  const formatTime = (isoString: string) => {
    if (!isMounted) return "--:--";
    const d = new Date(isoString);
    if (isZH) {
      const hours = d.getHours();
      const minutes = d.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    }
    return d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (isoString: string) => {
    if (!isMounted) return "---";
    const d = new Date(isoString);
    if (isZH) {
      const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
      return `${d.getMonth() + 1}月${d.getDate()}日 ${weekdays[d.getDay()]}`;
    }
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status: FlightData["checkInStatus"]) => {
    switch (status) {
      case "open":
        return "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700";
      case "closing_soon":
        return "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-700";
      case "not_open_yet":
        return "bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-700";
      case "closed":
        return "bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 border-red-200 dark:border-red-700";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700";
    }
  };

  const getStatusIcon = (status: FlightData["checkInStatus"]) => {
    switch (status) {
      case "open":
        return "✓";
      case "closing_soon":
        return "⚠️";
      case "not_open_yet":
        return "🕐";
      case "closed":
        return "✗";
      default:
        return "?";
    }
  };

  const getCheckInMessage = () => {
    if (hasDeparted) {
      return isZH ? "航班已起飞" : "Flight has departed";
    }
    if (flightData.checkInStatus === "closed") {
      return isZH ? "值机已关闭" : "Check-in is CLOSED";
    }
    if (flightData.checkInStatus === "not_open_yet" && flightData.minutesUntilCheckInOpens) {
      const hours = Math.floor(flightData.minutesUntilCheckInOpens / 60);
      const mins = flightData.minutesUntilCheckInOpens % 60;
      if (hours > 0) {
        return isZH ? `值机将在 ${hours}小时${mins}分钟 后开放` : `Check-in opens in ${hours}h ${mins}m`;
      }
      return isZH ? `值机将在 ${mins}分钟 后开放` : `Check-in opens in ${mins} minutes`;
    }
    if (flightData.checkInStatus === "closing_soon" && flightData.minutesUntilCheckInCloses) {
      return isZH ? `值机将在 ${flightData.minutesUntilCheckInCloses}分钟 后关闭！` : `Check-in closes in ${flightData.minutesUntilCheckInCloses} minutes!`;
    }
    if (flightData.checkInStatus === "open" && flightData.minutesUntilCheckInCloses) {
      const hours = Math.floor(flightData.minutesUntilCheckInCloses / 60);
      const mins = flightData.minutesUntilCheckInCloses % 60;
      return isZH ? `值机已开放 - ${hours}小时${mins}分钟 后关闭` : `Check-in is OPEN - closes in ${hours}h ${mins}m`;
    }
    return isZH ? "值机状态未知" : "Check-in status unknown";
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

  // Determine container border color based on status
  const getContainerStyle = () => {
    if (flightData.checkInStatus === "closing_soon") {
      return "border-yellow-400 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-900/30";
    }
    return "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800";
  };

  return (
    <div className={`mt-3 p-4 rounded-xl border-2 transition-colors ${getContainerStyle()}`}>
      {/* Flight Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">✈️</span>
          <div>
            <span className="font-bold text-gray-900 dark:text-gray-100">{flightData.flightNumber}</span>
            <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">{flightData.airline}</span>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${flightData.status === "On Time" ? "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300" : "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300"}`}>
          {isZH ? (flightData.status === "On Time" ? "准时" : flightData.status === "Delayed" ? "延误" : flightData.status === "Expected" ? "预计" : flightData.status) : flightData.status}
        </span>
      </div>

      {/* Route */}
      <div className="flex items-center gap-3 mb-3 text-sm">
        <div className="flex-1">
          <div className="font-medium text-gray-900 dark:text-gray-100">{flightData.departure.airport.split("(")[0].trim()}</div>
          <div className="text-gray-500 dark:text-gray-400 text-xs">{formatTime(flightData.departure.scheduledTime)}</div>
        </div>
        <div className="flex items-center text-gray-400 dark:text-gray-500">
          <div className="w-8 h-px bg-gray-300 dark:bg-gray-600"></div>
          <span className="mx-1">→</span>
          <div className="w-8 h-px bg-gray-300 dark:bg-gray-600"></div>
        </div>
        <div className="flex-1 text-right">
          <div className="font-medium text-gray-900 dark:text-gray-100">{flightData.arrival.airport.split("(")[0].trim()}</div>
          <div className="text-gray-500 dark:text-gray-400 text-xs">{formatTime(flightData.arrival.scheduledTime)}</div>
        </div>
      </div>

      {/* Connecting flight note */}
      {isLikelyConnecting && !arrivesInVietnam && (
        <div className="mb-3 px-3 py-2 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg text-sm text-blue-700 dark:text-blue-300">
          <span className="font-medium">{isZH ? "转机航班：" : "Connecting flight:"}</span> {isZH ? `这是飞往${arrivalCode}的第一段航程。请查看您的机票确认转机至越南的航班。` : `This is the first leg to ${arrivalCode}. Check your ticket for the connection to Vietnam.`}
        </div>
      )}

      {/* Gate & Terminal Info */}
      <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
        {flightData.departure.terminal && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2">
            <span className="text-gray-500 dark:text-gray-400 text-xs">{isZH ? "航站楼" : "Terminal"}</span>
            <div className="font-semibold text-gray-900 dark:text-gray-100">{flightData.departure.terminal}</div>
          </div>
        )}
        {flightData.departure.gate && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2">
            <span className="text-gray-500 dark:text-gray-400 text-xs">{isZH ? "登机口" : "Gate"}</span>
            <div className="font-semibold text-gray-900 dark:text-gray-100">{flightData.departure.gate}</div>
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
                  <span className="text-green-600">{isZH ? "开放:" : "Opens:"}</span> {formatTime(flightData.checkInOpeningTime)} ({formatDate(flightData.checkInOpeningTime)})
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-red-600">{isZH ? "关闭:" : "Closes:"}</span> {formatTime(flightData.checkInClosingTime)} ({formatDate(flightData.checkInClosingTime)})
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Message for closed/departed flights */}
      {(isCheckInClosed || hasDeparted) && (
        <div className="mt-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {hasDeparted
              ? (isZH ? "该航班已起飞。请选择未来日期查询其他航班。" : "This flight has already departed. Select a future date to check another flight.")
              : (isZH ? "该航班值机已关闭。如需办理下次旅行的签证，请在上方选择未来日期。" : "Check-in for this flight has closed. If you need a visa for your next trip, select a future date above.")}
          </p>
        </div>
      )}

      {/* Email Notification Subscription - only for upcoming flights */}
      {!isCheckInClosed && !hasDeparted && (
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        {subscribeSuccess ? (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 text-green-800 dark:text-green-200">
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">{isZH ? "您将收到航班状态变更的邮件通知！" : "You'll receive email notifications for flight status changes!"}</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {isZH ? "订阅航班变更通知" : "Get notified about flight changes"}
              </span>
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                value={notifyEmail}
                onChange={(e) => setNotifyEmail(e.target.value)}
                placeholder={isZH ? "您的邮箱" : "your@email.com"}
                className="flex-1 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  isZH ? "订阅通知" : "Notify Me"
                )}
              </button>
            </div>
            {subscribeError && (
              <p className="text-xs text-red-600 dark:text-red-400">{subscribeError}</p>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {isZH ? "如果您的航班状态、登机口或时间发生变化，我们将发送邮件通知您。" : "We'll email you if your flight status, gate, or time changes."}
            </p>
          </form>
        )}
      </div>
      )}
    </div>
  );
}
