"use client";

import { useState, useEffect } from "react";

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

export function DirectFlights() {
  const [flightData, setFlightData] = useState<DayFlights[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFlights() {
      try {
        const response = await fetch("/api/vietnam-flights");
        if (!response.ok) {
          throw new Error("Failed to fetch flights");
        }
        const data = await response.json();
        if (data.success && data.days) {
          setFlightData(data.days);
        }
      } catch (err) {
        console.error("Error fetching flights:", err);
        setError("Unable to load flight information");
      } finally {
        setLoading(false);
      }
    }

    fetchFlights();
  }, []);

  // Get airline badge color based on airline code
  const getAirlineBadgeStyle = (airlineCode: string) => {
    if (airlineCode === "VJ") {
      return "bg-red-500 text-white";
    } else if (airlineCode === "VN") {
      return "bg-blue-900 text-yellow-400";
    } else if (airlineCode === "QH") {
      return "bg-orange-500 text-white";
    }
    return "bg-gray-500 text-white";
  };

  if (loading) {
    return (
      <section className="bg-gray-50 dark:bg-slate-800 py-8 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
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
                    Direct Flights to Vietnam
                  </h2>
                  <p className="text-blue-100 text-sm">
                    From Denpasar Ngurah Rai International Airport
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 flex items-center justify-center">
              <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                <svg
                  className="w-5 h-5 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
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
                <span>Loading flight information...</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || flightData.length === 0) {
    return null; // Don't show the section if there's an error or no data
  }

  return (
    <section className="bg-gray-50 dark:bg-slate-800 py-8 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
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
                  Direct Flights to Vietnam
                </h2>
                <p className="text-blue-100 text-sm">
                  From Denpasar Ngurah Rai International Airport
                </p>
              </div>
            </div>
          </div>

          {/* Flights by Day */}
          <div className="p-4 sm:p-6 space-y-6">
            {flightData.map((day, dayIndex) => (
              <div key={day.date}>
                {/* Day Header */}
                <div className="flex items-center gap-3 mb-4">
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
                      {dayIndex === 0 ? "Today" : "Tomorrow"} -{" "}
                      {day.dateFormatted}
                    </h3>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                    {day.flights.length} flight
                    {day.flights.length !== 1 ? "s" : ""}
                  </span>
                </div>

                {/* Flights Grid */}
                {day.flights.length > 0 ? (
                  <div className="grid gap-3">
                    {day.flights.map((flight, flightIndex) => (
                      <div
                        key={`${day.date}-${flight.flightNumber}-${flightIndex}`}
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
                              DPS
                            </div>
                          </div>
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
                ) : (
                  <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                    No direct flights to Vietnam scheduled for this day.
                  </div>
                )}

                {/* Divider between days */}
                {dayIndex < flightData.length - 1 && (
                  <div className="mt-6 border-t border-gray-200 dark:border-gray-700"></div>
                )}
              </div>
            ))}

            {/* Footer Note */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                All times shown in local departure time (WITA, GMT+8). Flight
                schedules subject to change.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
