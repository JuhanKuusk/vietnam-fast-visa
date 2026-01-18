"use client";

import { useState, useEffect, useCallback } from "react";
import { translations } from "@/lib/translations";

interface Flight {
  flightNumber: string;
  airline: string;
  airlineCode: string;
  departureTime: string;
  destination: string;
  destinationCode: string;
  isDirect: boolean;
  stopover?: string;
}

interface DayFlights {
  date: string;
  dateFormatted: string;
  flights: Flight[];
}

// Default fallback translations
const defaultTranslations = translations.dynamicFlights;

interface DynamicFlightsProps {
  airportCode: string;
  airportName: string;
  cityName?: string;
  t?: typeof defaultTranslations;
}

// Generate next 6 days starting from today
function getNext6Days(todayLabel: string, tomorrowLabel: string): { date: string; label: string; shortLabel: string }[] {
  const days: { date: string; label: string; shortLabel: string }[] = [];
  const today = new Date();

  for (let i = 0; i < 6; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const dateStr = date.toISOString().split("T")[0];
    const dayOfMonth = date.getDate();
    const monthShort = date.toLocaleDateString("en-US", { month: "short" });
    const weekday = date.toLocaleDateString("en-US", { weekday: "short" });

    let label: string;
    if (i === 0) {
      label = todayLabel;
    } else if (i === 1) {
      label = tomorrowLabel;
    } else {
      label = `${weekday}, ${monthShort} ${dayOfMonth}`;
    }

    days.push({
      date: dateStr,
      label,
      shortLabel: i < 2 ? label : `${monthShort} ${dayOfMonth}`,
    });
  }

  return days;
}

export function DynamicFlights({ airportCode, airportName, cityName, t = defaultTranslations }: DynamicFlightsProps) {
  const days = getNext6Days(t.today, t.tomorrow);
  const [selectedDate, setSelectedDate] = useState(days[0].date);
  const [flightData, setFlightData] = useState<DayFlights | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [flightType, setFlightType] = useState<"all" | "direct">("all");

  const fetchFlightsForDate = useCallback(async (date: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/vietnam-flights-dynamic?date=${date}&origin=${airportCode}`);
      if (!response.ok) {
        throw new Error("Failed to fetch flights");
      }
      const data = await response.json();
      if (data.success && data.days && data.days.length > 0) {
        setFlightData(data.days[0]);
      } else {
        setFlightData(null);
      }
    } catch (err) {
      console.error("Error fetching flights:", err);
      setError("Unable to load flight information");
    } finally {
      setLoading(false);
    }
  }, [airportCode]);

  useEffect(() => {
    fetchFlightsForDate(selectedDate);
  }, [selectedDate, fetchFlightsForDate]);

  // Get airline badge color based on airline code
  const getAirlineBadgeStyle = (code: string) => {
    if (code === "VJ") return "bg-red-500 text-white";
    if (code === "VN") return "bg-blue-900 text-yellow-400";
    if (code === "QH") return "bg-orange-500 text-white";
    if (code === "SQ") return "bg-yellow-600 text-white";
    if (code === "TG") return "bg-purple-600 text-white";
    if (code === "CX") return "bg-green-600 text-white";
    if (code === "KE") return "bg-blue-500 text-white";
    if (code === "EK") return "bg-red-700 text-white";
    if (code === "MH") return "bg-blue-800 text-white";
    if (code === "QF") return "bg-red-600 text-white";
    return "bg-gray-500 text-white";
  };

  // Filter flights based on selected filter type and check-in status
  const filteredFlights = (flightData?.flights || []).filter((flight) => {
    if (flightType === "direct" && !flight.isDirect) {
      return false;
    }

    // Filter past flights for today only
    const today = new Date().toISOString().split("T")[0];
    if (flightData?.date === today) {
      const now = new Date();
      const [hours, minutes] = flight.departureTime.split(":").map(Number);
      const flightTime = new Date();
      flightTime.setHours(hours, minutes, 0, 0);
      const checkInCloseTime = new Date(flightTime.getTime() - 45 * 60 * 1000);
      if (now > checkInCloseTime) {
        return false;
      }
    }

    return true;
  });

  const displayName = cityName || airportCode;

  const LoadingState = () => (
    <div className="p-6 flex items-center justify-center">
      <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <span>{t.loading}</span>
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden mt-4">
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              {t.title}
            </h2>
            <p className="text-blue-100 text-sm">
              {t.from.replace("{cityName}", displayName).replace("{airportCode}", airportCode)}
            </p>
          </div>
        </div>
      </div>

      {/* Date Selector Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex overflow-x-auto scrollbar-hide">
          {days.map((day) => (
            <button
              key={day.date}
              onClick={() => setSelectedDate(day.date)}
              className={`flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                selectedDate === day.date
                  ? "border-blue-600 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              }`}
            >
              <span className="hidden sm:inline">{day.label}</span>
              <span className="sm:hidden">{day.shortLabel}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="px-4 sm:px-6 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
        <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">{t.filter}</span>
        <button
          onClick={() => setFlightType("all")}
          className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
            flightType === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
        >
          {t.allFlights}
        </button>
        <button
          onClick={() => setFlightType("direct")}
          className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
            flightType === "direct"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
        >
          {t.directOnly}
        </button>
      </div>

      {/* Flights Content */}
      <div className="p-4 sm:p-6">
        {loading ? (
          <LoadingState />
        ) : error ? (
          <div className="text-center py-6 text-gray-500 dark:text-gray-400">
            {error}
          </div>
        ) : flightData && filteredFlights.length > 0 ? (
          <>
            {/* Day Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {flightData.dateFormatted}
                </h3>
              </div>
              <span className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                {filteredFlights.length === 1
                  ? t.flightCount.replace("{count}", "1")
                  : t.flightCountPlural.replace("{count}", String(filteredFlights.length))}
              </span>
            </div>

            {/* Flights Grid */}
            <div className="grid gap-3">
              {filteredFlights.map((flight, flightIndex) => (
                <div
                  key={`${flightData.date}-${flight.flightNumber}-${flightIndex}`}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
                >
                  <div className="flex items-center gap-4 mb-3 sm:mb-0">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${getAirlineBadgeStyle(
                        flight.airlineCode
                      )}`}
                    >
                      <span className="font-bold text-xs">
                        {flight.airlineCode}
                      </span>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">
                        {flight.flightNumber}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {flight.airline}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-8">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {flight.departureTime}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {airportCode}
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-[2px] bg-gray-300 dark:bg-gray-600"></div>
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                        </svg>
                        <div className="w-8 h-[2px] bg-gray-300 dark:bg-gray-600"></div>
                      </div>
                      {flight.isDirect ? (
                        <span className="text-[10px] text-green-600 dark:text-green-400 font-medium">
                          {t.direct}
                        </span>
                      ) : (
                        <div className="flex flex-col items-center">
                          <span className="text-[10px] text-orange-600 dark:text-orange-400 font-medium">
                            {t.oneStop}
                          </span>
                          {flight.stopover && (
                            <span className="text-[9px] text-gray-500 dark:text-gray-400">
                              {flight.stopover}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="text-center">
                      <div
                        className="text-lg font-bold"
                        style={{ color: "#c41e3a" }}
                      >
                        {flight.destination}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {flight.destinationCode}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-6 text-gray-500 dark:text-gray-400">
            {selectedDate === days[0].date
              ? t.noFlightsToday.replace("{cityName}", displayName).replace("{airportCode}", airportCode)
              : t.noFlightsThisDay}
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            {t.localTimeNote}
          </p>
        </div>
      </div>
    </div>
  );
}
