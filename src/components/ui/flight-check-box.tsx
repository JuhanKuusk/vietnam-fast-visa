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

      {/* WhatsApp Button - Green CTA */}
      <div className="mt-3 mb-3">
        <a
          href="https://wa.me/841205549868?text=Hi!%20I%20need%20help%20with%20my%20Vietnam%20visa."
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 rounded-lg font-bold text-white flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
          style={{ backgroundColor: '#25D366' }}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Get Your Vietnam Visa Ready
        </a>
      </div>

      {/* Connection Flight Checkbox */}
      <div className="mb-3">
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
