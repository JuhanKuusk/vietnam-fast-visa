"use client";

import { useState, useEffect } from "react";
import { DynamicFlights } from "./dynamic-flights";
import { getAirportsForCountry } from "@/lib/amadeus";
import { translations } from "@/lib/translations";

interface AirportInfo {
  code: string;
  name: string;
  city: string;
}

interface GeolocationData {
  country: string;
  countryCode: string;
  city: string;
  region: string;
}

// Default fallback translations
const defaultTranslations = translations.dynamicFlights;

interface AutoDetectFlightsProps {
  t?: typeof defaultTranslations;
}

export function AutoDetectFlights({ t = defaultTranslations }: AutoDetectFlightsProps) {
  const [airportCode, setAirportCode] = useState<string>("");
  const [airportInfo, setAirportInfo] = useState<AirportInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGeolocation = async () => {
      try {
        const response = await fetch("/api/geolocation");
        if (response.ok) {
          const data: GeolocationData = await response.json();

          // Get airports for the detected country
          const airports = getAirportsForCountry(data.countryCode);

          if (airports.length > 0) {
            // Try to match detected city to an airport
            const cityMatch = airports.find(
              a => a.city.toLowerCase() === data.city.toLowerCase()
            );

            if (cityMatch) {
              setAirportCode(cityMatch.code);
              setAirportInfo(cityMatch);
            } else {
              // Use first airport as default
              setAirportCode(airports[0].code);
              setAirportInfo(airports[0]);
            }
          } else {
            // No airports for this country - fall back to DPS (Bali)
            setAirportCode("DPS");
            setAirportInfo({
              code: "DPS",
              name: "Ngurah Rai International",
              city: "Bali"
            });
          }
        } else {
          throw new Error("Failed to fetch geolocation");
        }
      } catch (err) {
        console.error("Error fetching geolocation:", err);
        setError("Unable to detect location");
        // Fall back to DPS (Bali)
        setAirportCode("DPS");
        setAirportInfo({
          code: "DPS",
          name: "Ngurah Rai International",
          city: "Bali"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchGeolocation();
  }, []);

  if (isLoading) {
    return (
      <section className="bg-gray-50 dark:bg-slate-800 py-8 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{t.title}</h2>
                  <p className="text-blue-100 text-sm">Detecting your location...</p>
                </div>
              </div>
            </div>
            <div className="p-6 flex items-center justify-center">
              <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{t.loading}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!airportCode || !airportInfo) {
    return null;
  }

  return (
    <section className="bg-gray-50 dark:bg-slate-800 py-8 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <DynamicFlights
          airportCode={airportCode}
          airportName={airportInfo.name}
          cityName={airportInfo.city}
          t={t}
        />
      </div>
    </section>
  );
}
