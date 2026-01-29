"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { FlightInfo } from "./flight-info";

interface FlightDataCallback {
  arrivalAirport: string;
  arrivalAirportCode: string;
  departureAirport: string;
  departureAirportCode: string;
  arrivalDate: string;
  flightNumber: string;
}

interface FlightCheckBoxProps {
  flightNumber: string;
  onFlightNumberChange: (value: string) => void;
  flightDate: string;
  onFlightDateChange: (value: string) => void;
  onFlightData?: (data: FlightDataCallback) => void;
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

  // Use refs to store latest values without causing re-renders
  const hasConnectionRef = useRef(hasConnection);
  const onFlightDataRef = useRef(onFlightData);

  // Keep refs in sync
  useEffect(() => {
    hasConnectionRef.current = hasConnection;
    onFlightDataRef.current = onFlightData;
  }, [hasConnection, onFlightData]);

  // Handle connection flight data - this is the one that arrives in Vietnam
  // Memoized with useCallback to prevent infinite re-renders in FlightInfo
  const handleConnectionFlightData = useCallback((data: FlightDataCallback) => {
    // Pass the connection flight data to parent (this is the flight arriving in Vietnam)
    if (onFlightDataRef.current) {
      onFlightDataRef.current(data);
    }
  }, []);

  // Handle main flight data - only use if no connection flight
  // Memoized with useCallback to prevent infinite re-renders in FlightInfo
  const handleMainFlightData = useCallback((data: FlightDataCallback) => {
    // Only pass to parent if there's no connection flight
    if (!hasConnectionRef.current && onFlightDataRef.current) {
      onFlightDataRef.current(data);
    }
  }, []);

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
        <input
          type="text"
          value={flightNumber}
          onChange={(e) => onFlightNumberChange(e.target.value.toUpperCase())}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Connection Flight Checkbox - Show right after flight input for better visibility */}
      <div className="mt-3 mb-3">
        <label className="flex items-center gap-3 cursor-pointer group p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors">
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
            <div className="w-5 h-5 border-2 border-amber-400 dark:border-amber-500 rounded peer-checked:border-blue-500 peer-checked:bg-blue-500 transition-colors">
              {hasConnection && (
                <svg className="w-full h-full text-white p-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>
          <span className="text-sm font-medium text-amber-800 dark:text-amber-300">
            I have a connecting flight to Vietnam
          </span>
        </label>
      </div>

      {/* Connection Flight Input - Show before first flight info when enabled */}
      {hasConnection && (
        <div className="mb-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <label className="block text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
            Connecting Flight to Vietnam
          </label>
          <input
            type="text"
            value={connectionFlightNumber}
            onChange={(e) => setConnectionFlightNumber(e.target.value.toUpperCase())}
            placeholder="e.g. EY834 (Abu Dhabi to Ho Chi Minh)"
            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-700 border border-blue-300 dark:border-blue-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="mt-2 text-xs text-blue-600 dark:text-blue-400">
            Enter your flight that arrives in Vietnam - this is used for your visa entry date
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

      {/* Show first flight info */}
      {flightNumber && flightNumber.length >= 3 && (
        <div className={hasConnection ? "opacity-70" : ""}>
          {hasConnection && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">First leg of your journey:</p>
          )}
          <FlightInfo
            flightNumber={flightNumber}
            date={flightDate}
            onFlightData={handleMainFlightData}
          />
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
