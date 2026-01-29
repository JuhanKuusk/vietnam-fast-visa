"use client";

import { useState } from "react";
import { FlightInfo } from "./flight-info";

interface FlightCheckBoxProps {
  flightNumber: string;
  onFlightNumberChange: (value: string) => void;
  flightDate: string;
  onFlightDateChange: (value: string) => void;
  onFlightData?: (data: { arrivalAirport: string; arrivalAirportCode: string; departureAirport: string; departureAirportCode: string }) => void;
  placeholder?: string;
  title?: string;
  /** When true, removes the outer card wrapper for embedding inside other containers */
  embedded?: boolean;
}

export function FlightCheckBox({
  flightNumber,
  onFlightNumberChange,
  flightDate,
  onFlightDateChange,
  onFlightData,
  placeholder = "e.g. VN123, CX841",
  title = "Check Your Flight Status",
  embedded = false,
}: FlightCheckBoxProps) {
  const [hasConnection, setHasConnection] = useState(false);
  const [connectionFlightNumber, setConnectionFlightNumber] = useState("");

  // Handle connection flight data - this is the one that arrives in Vietnam
  const handleConnectionFlightData = (data: { arrivalAirport: string; arrivalAirportCode: string; departureAirport: string; departureAirportCode: string }) => {
    // Pass the connection flight data to parent (this is the flight arriving in Vietnam)
    if (onFlightData) {
      onFlightData(data);
    }
  };

  // Handle main flight data - only use if no connection flight
  const handleMainFlightData = (data: { arrivalAirport: string; arrivalAirportCode: string; departureAirport: string; departureAirportCode: string }) => {
    // Only pass to parent if there's no connection flight
    if (!hasConnection && onFlightData) {
      onFlightData(data);
    }
  };

  const content = (
    <>
      {!embedded && (
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">✈️</span>
          <span className="font-bold text-gray-900 dark:text-white">{title}</span>
        </div>
      )}

      {/* First Flight */}
      <div className={embedded ? "" : "mb-3"}>
        {!embedded && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {hasConnection ? "First Flight" : "Flight Number"}
          </label>
        )}
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={flightNumber}
            onChange={(e) => onFlightNumberChange(e.target.value.toUpperCase())}
            placeholder={placeholder}
            className="flex-1 px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="date"
            value={flightDate}
            onChange={(e) => onFlightDateChange(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Show first flight info */}
      {flightNumber && flightNumber.length >= 3 && (
        <FlightInfo
          flightNumber={flightNumber}
          date={flightDate}
          onFlightData={handleMainFlightData}
        />
      )}

      {/* Connection Flight Checkbox */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              checked={hasConnection}
              onChange={(e) => {
                setHasConnection(e.target.checked);
                if (!e.target.checked) {
                  setConnectionFlightNumber("");
                }
              }}
              className="sr-only peer"
            />
            <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-500 rounded peer-checked:border-blue-500 peer-checked:bg-blue-500 transition-colors">
              {hasConnection && (
                <svg className="w-full h-full text-white p-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>
          <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
            I have a connecting flight to Vietnam
          </span>
        </label>
      </div>

      {/* Connection Flight Input */}
      {hasConnection && (
        <div className="mt-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <label className="block text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
            Connection Flight (to Vietnam)
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={connectionFlightNumber}
              onChange={(e) => setConnectionFlightNumber(e.target.value.toUpperCase())}
              placeholder="e.g. CX799"
              className="flex-1 px-4 py-3 rounded-lg bg-white dark:bg-gray-700 border border-blue-300 dark:border-blue-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="date"
              value={flightDate}
              onChange={(e) => onFlightDateChange(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="px-4 py-3 rounded-lg bg-white dark:bg-gray-700 border border-blue-300 dark:border-blue-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <p className="mt-2 text-xs text-blue-600 dark:text-blue-400">
            Enter your connecting flight that arrives in Vietnam (e.g., HKG → SGN)
          </p>

          {/* Show connection flight info */}
          {connectionFlightNumber && connectionFlightNumber.length >= 3 && (
            <div className="mt-3">
              <FlightInfo
                flightNumber={connectionFlightNumber}
                date={flightDate}
                onFlightData={handleConnectionFlightData}
              />
            </div>
          )}
        </div>
      )}
    </>
  );

  if (embedded) {
    return content;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
      {content}
    </div>
  );
}
