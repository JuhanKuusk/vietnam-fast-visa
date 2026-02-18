"use client";

import { useState, useEffect } from "react";
import { getAirportsForCountry } from "@/lib/amadeus";
import { FlightRiskBlock } from "./flight-risk-block";
import { useLanguage } from "@/contexts/LanguageContext";
import type { SupportedLanguage } from "@/lib/translations";

// Type for translations that may have countries, cities, purposeOptions
interface TranslationsWithLocalization {
  countries?: Record<string, string>;
  cities?: Record<string, string>;
  purposeOptions?: Record<string, string>;
  searchPrompts?: {
    searchCountry?: string;
    searchAirport?: string;
    searchCitizenship?: string;
  };
  citizenship?: typeof citizenshipFallback;
}

// Helper function to get localized country name (Chinese site only)
function getLocalizedCountryName(
  code: string,
  englishName: string,
  language: SupportedLanguage,
  t: TranslationsWithLocalization
): string {
  if (language === "ZH" && t.countries?.[code]) {
    return `${t.countries[code]} (${englishName})`;
  }
  return englishName;
}

// Helper function to get localized airport display (Chinese site only)
function getLocalizedAirportDisplay(
  airport: AirportInfo,
  language: SupportedLanguage,
  t: TranslationsWithLocalization
): string {
  if (language === "ZH" && t.cities?.[airport.city]) {
    return `${t.cities[airport.city]} ${airport.city} (${airport.code}) - ${airport.name}`;
  }
  return `${airport.city} (${airport.code}) - ${airport.name}`;
}

// Helper function to get localized purpose (Chinese site only)
function getLocalizedPurpose(
  value: string,
  language: SupportedLanguage,
  t: TranslationsWithLocalization
): string {
  if (language === "ZH" && t.purposeOptions?.[value]) {
    return t.purposeOptions[value];
  }
  // Fallback to capitalized English
  return value.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

// Visa-free countries with duration
const VISA_FREE_45_DAYS = ["DE", "FR", "IT", "ES", "GB", "RU", "JP", "KR", "DK", "SE", "NO", "FI", "BY"];
const VISA_FREE_30_DAYS = ["TH", "MY", "SG", "ID", "LA", "KH", "MM", "BN", "PH"];
const VISA_FREE_21_DAYS = ["CL"];
const VISA_FREE_14_DAYS = ["KG"];

// All countries for the selector (including non-eligible)
const ALL_COUNTRIES = [
  { code: "AF", name: "Afghanistan" },
  { code: "AL", name: "Albania" },
  { code: "DZ", name: "Algeria" },
  { code: "AD", name: "Andorra" },
  { code: "AO", name: "Angola" },
  { code: "AR", name: "Argentina" },
  { code: "AM", name: "Armenia" },
  { code: "AU", name: "Australia" },
  { code: "AT", name: "Austria" },
  { code: "AZ", name: "Azerbaijan" },
  { code: "BH", name: "Bahrain" },
  { code: "BD", name: "Bangladesh" },
  { code: "BY", name: "Belarus" },
  { code: "BE", name: "Belgium" },
  { code: "BZ", name: "Belize" },
  { code: "BJ", name: "Benin" },
  { code: "BT", name: "Bhutan" },
  { code: "BO", name: "Bolivia" },
  { code: "BA", name: "Bosnia and Herzegovina" },
  { code: "BW", name: "Botswana" },
  { code: "BR", name: "Brazil" },
  { code: "BN", name: "Brunei" },
  { code: "BG", name: "Bulgaria" },
  { code: "KH", name: "Cambodia" },
  { code: "CM", name: "Cameroon" },
  { code: "CA", name: "Canada" },
  { code: "CL", name: "Chile" },
  { code: "CN", name: "China" },
  { code: "CO", name: "Colombia" },
  { code: "CR", name: "Costa Rica" },
  { code: "HR", name: "Croatia" },
  { code: "CU", name: "Cuba" },
  { code: "CY", name: "Cyprus" },
  { code: "CZ", name: "Czech Republic" },
  { code: "DK", name: "Denmark" },
  { code: "DO", name: "Dominican Republic" },
  { code: "EC", name: "Ecuador" },
  { code: "EG", name: "Egypt" },
  { code: "SV", name: "El Salvador" },
  { code: "EE", name: "Estonia" },
  { code: "ET", name: "Ethiopia" },
  { code: "FI", name: "Finland" },
  { code: "FR", name: "France" },
  { code: "GE", name: "Georgia" },
  { code: "DE", name: "Germany" },
  { code: "GH", name: "Ghana" },
  { code: "GR", name: "Greece" },
  { code: "GT", name: "Guatemala" },
  { code: "HN", name: "Honduras" },
  { code: "HK", name: "Hong Kong" },
  { code: "HU", name: "Hungary" },
  { code: "IS", name: "Iceland" },
  { code: "IN", name: "India" },
  { code: "ID", name: "Indonesia" },
  { code: "IR", name: "Iran" },
  { code: "IQ", name: "Iraq" },
  { code: "IE", name: "Ireland" },
  { code: "IL", name: "Israel" },
  { code: "IT", name: "Italy" },
  { code: "JM", name: "Jamaica" },
  { code: "JP", name: "Japan" },
  { code: "JO", name: "Jordan" },
  { code: "KZ", name: "Kazakhstan" },
  { code: "KE", name: "Kenya" },
  { code: "KW", name: "Kuwait" },
  { code: "KG", name: "Kyrgyzstan" },
  { code: "LA", name: "Laos" },
  { code: "LV", name: "Latvia" },
  { code: "LB", name: "Lebanon" },
  { code: "LT", name: "Lithuania" },
  { code: "LU", name: "Luxembourg" },
  { code: "MO", name: "Macau" },
  { code: "MY", name: "Malaysia" },
  { code: "MV", name: "Maldives" },
  { code: "MT", name: "Malta" },
  { code: "MX", name: "Mexico" },
  { code: "MD", name: "Moldova" },
  { code: "MC", name: "Monaco" },
  { code: "MN", name: "Mongolia" },
  { code: "ME", name: "Montenegro" },
  { code: "MA", name: "Morocco" },
  { code: "MM", name: "Myanmar" },
  { code: "NP", name: "Nepal" },
  { code: "NL", name: "Netherlands" },
  { code: "NZ", name: "New Zealand" },
  { code: "NI", name: "Nicaragua" },
  { code: "NG", name: "Nigeria" },
  { code: "MK", name: "North Macedonia" },
  { code: "NO", name: "Norway" },
  { code: "OM", name: "Oman" },
  { code: "PK", name: "Pakistan" },
  { code: "PA", name: "Panama" },
  { code: "PY", name: "Paraguay" },
  { code: "PE", name: "Peru" },
  { code: "PH", name: "Philippines" },
  { code: "PL", name: "Poland" },
  { code: "PT", name: "Portugal" },
  { code: "QA", name: "Qatar" },
  { code: "RO", name: "Romania" },
  { code: "RU", name: "Russia" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "RS", name: "Serbia" },
  { code: "SG", name: "Singapore" },
  { code: "SK", name: "Slovakia" },
  { code: "SI", name: "Slovenia" },
  { code: "ZA", name: "South Africa" },
  { code: "KR", name: "South Korea" },
  { code: "ES", name: "Spain" },
  { code: "LK", name: "Sri Lanka" },
  { code: "SE", name: "Sweden" },
  { code: "CH", name: "Switzerland" },
  { code: "SY", name: "Syria" },
  { code: "TW", name: "Taiwan" },
  { code: "TJ", name: "Tajikistan" },
  { code: "TZ", name: "Tanzania" },
  { code: "TH", name: "Thailand" },
  { code: "TL", name: "Timor-Leste" },
  { code: "TN", name: "Tunisia" },
  { code: "TR", name: "Turkey" },
  { code: "TM", name: "Turkmenistan" },
  { code: "UG", name: "Uganda" },
  { code: "UA", name: "Ukraine" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "GB", name: "United Kingdom" },
  { code: "US", name: "United States" },
  { code: "UY", name: "Uruguay" },
  { code: "UZ", name: "Uzbekistan" },
  { code: "VE", name: "Venezuela" },
  { code: "YE", name: "Yemen" },
  { code: "ZM", name: "Zambia" },
  { code: "ZW", name: "Zimbabwe" },
].sort((a, b) => a.name.localeCompare(b.name));

// E-Visa eligible countries (80 countries)
const EVISA_COUNTRIES = [
  // Europe
  { code: "AL", name: "Albania" },
  { code: "AT", name: "Austria" },
  { code: "AZ", name: "Azerbaijan" },
  { code: "BY", name: "Belarus" },
  { code: "BE", name: "Belgium" },
  { code: "BA", name: "Bosnia and Herzegovina" },
  { code: "BG", name: "Bulgaria" },
  { code: "HR", name: "Croatia" },
  { code: "CY", name: "Cyprus" },
  { code: "CZ", name: "Czech Republic" },
  { code: "DK", name: "Denmark" },
  { code: "EE", name: "Estonia" },
  { code: "FI", name: "Finland" },
  { code: "FR", name: "France" },
  { code: "GE", name: "Georgia" },
  { code: "DE", name: "Germany" },
  { code: "GR", name: "Greece" },
  { code: "HU", name: "Hungary" },
  { code: "IS", name: "Iceland" },
  { code: "IE", name: "Ireland" },
  { code: "IT", name: "Italy" },
  { code: "KZ", name: "Kazakhstan" },
  { code: "LV", name: "Latvia" },
  { code: "LT", name: "Lithuania" },
  { code: "LU", name: "Luxembourg" },
  { code: "MT", name: "Malta" },
  { code: "ME", name: "Montenegro" },
  { code: "NL", name: "Netherlands" },
  { code: "MK", name: "North Macedonia" },
  { code: "NO", name: "Norway" },
  { code: "PL", name: "Poland" },
  { code: "PT", name: "Portugal" },
  { code: "RO", name: "Romania" },
  { code: "RU", name: "Russia" },
  { code: "RS", name: "Serbia" },
  { code: "SK", name: "Slovakia" },
  { code: "SI", name: "Slovenia" },
  { code: "ES", name: "Spain" },
  { code: "SE", name: "Sweden" },
  { code: "CH", name: "Switzerland" },
  { code: "TR", name: "Turkey" },
  { code: "UA", name: "Ukraine" },
  { code: "GB", name: "United Kingdom" },
  // Asia & Oceania
  { code: "AU", name: "Australia" },
  { code: "BN", name: "Brunei" },
  { code: "CN", name: "China" },
  { code: "IN", name: "India" },
  { code: "ID", name: "Indonesia" },
  { code: "JP", name: "Japan" },
  { code: "KR", name: "South Korea" },
  { code: "MN", name: "Mongolia" },
  { code: "MM", name: "Myanmar" },
  { code: "NZ", name: "New Zealand" },
  { code: "PH", name: "Philippines" },
  { code: "SG", name: "Singapore" },
  { code: "TW", name: "Taiwan" },
  { code: "TH", name: "Thailand" },
  { code: "TL", name: "Timor-Leste" },
  { code: "UZ", name: "Uzbekistan" },
  // Middle East
  { code: "AE", name: "United Arab Emirates" },
  { code: "QA", name: "Qatar" },
  { code: "SA", name: "Saudi Arabia" },
  // Americas
  { code: "AR", name: "Argentina" },
  { code: "BR", name: "Brazil" },
  { code: "CA", name: "Canada" },
  { code: "CL", name: "Chile" },
  { code: "CO", name: "Colombia" },
  { code: "CU", name: "Cuba" },
  { code: "MX", name: "Mexico" },
  { code: "PA", name: "Panama" },
  { code: "PE", name: "Peru" },
  { code: "US", name: "United States" },
  { code: "UY", name: "Uruguay" },
  { code: "VE", name: "Venezuela" },
].sort((a, b) => a.name.localeCompare(b.name));

// Visa requirement result type
interface VisaRequirementResult {
  type: "visa_free" | "evisa" | "embassy_required";
  days?: number;
  message: string;
  color: string;
  bgColor: string;
}

// Function to determine visa requirements based on country code
function getVisaRequirement(countryCode: string, citizenship: typeof citizenshipFallback): VisaRequirementResult {
  // Check visa-free countries first
  if (VISA_FREE_45_DAYS.includes(countryCode)) {
    return {
      type: "visa_free",
      days: 45,
      message: citizenship.visaFree45,
      color: "text-green-700",
      bgColor: "bg-green-50 border-green-200",
    };
  }
  if (VISA_FREE_30_DAYS.includes(countryCode)) {
    return {
      type: "visa_free",
      days: 30,
      message: citizenship.visaFree30,
      color: "text-green-700",
      bgColor: "bg-green-50 border-green-200",
    };
  }
  if (VISA_FREE_21_DAYS.includes(countryCode)) {
    return {
      type: "visa_free",
      days: 21,
      message: citizenship.visaFree21,
      color: "text-green-700",
      bgColor: "bg-green-50 border-green-200",
    };
  }
  if (VISA_FREE_14_DAYS.includes(countryCode)) {
    return {
      type: "visa_free",
      days: 14,
      message: citizenship.visaFree14,
      color: "text-green-700",
      bgColor: "bg-green-50 border-green-200",
    };
  }

  // Check E-Visa eligible countries
  if (EVISA_COUNTRIES.find((c) => c.code === countryCode)) {
    return {
      type: "evisa",
      message: citizenship.evisaEligible,
      color: "text-blue-700",
      bgColor: "bg-blue-50 border-blue-200",
    };
  }

  // Embassy visa required
  return {
    type: "embassy_required",
    message: citizenship.embassyRequired,
    color: "text-orange-700",
    bgColor: "bg-orange-50 border-orange-200",
  };
}

// Default fallback translations for citizenship section
const citizenshipFallback = {
  title: "Check Your Visa Requirements",
  subtitle: "Select your citizenship to see what visa you need for Vietnam",
  label: "Your Citizenship / Nationality",
  searchPlaceholder: "Type to search or select...",
  noCountriesFound: "No countries found",
  citizens: "Citizens",
  visaFree45: "You can enter Vietnam visa-free for up to 45 days!",
  visaFree30: "You can enter Vietnam visa-free for up to 30 days!",
  visaFree21: "You can enter Vietnam visa-free for up to 21 days!",
  visaFree14: "You can enter Vietnam visa-free for up to 14 days!",
  evisaEligible: "You are eligible for Vietnam E-Visa! Approval letter in just 30 minutes.",
  embassyRequired: "You need to apply for a visa at the Vietnam Embassy or Consulate in your country.",
  longerStay: "For stays longer than {days} days, you will need to apply for an E-Visa or visit a Vietnamese Embassy.",
  evisaValid: "E-Visa is valid for 30-90 days with single or multiple entry.",
  applyBelow: "Apply below - Approval in 30 minutes!",
  departingCountry: "Departing From Country",
  departingAirport: "Departing From City/Airport",
  selectAirport: "Select airport...",
  detectingLocation: "Detecting your location...",
  needLongerStay: "Need 60+ days or multiple entries?",
  getLongerVisa: "Get E-Visa",
  purposeOfVisit: "Purpose of Visit",
  selectPurpose: "Select purpose...",
};

// Interface for geolocation response
interface GeolocationData {
  country: string;
  countryCode: string;
  city: string;
  region: string;
}

// Interface for airport info from amadeus
interface AirportInfo {
  code: string;
  name: string;
  city: string;
}

// Searchable Country Selector Component
function CountrySelector({
  value,
  onChange,
  countries,
  placeholder = "Type to search or select...",
  noResultsText = "No countries found",
  language = "EN",
  translations,
}: {
  value: string;
  onChange: (code: string) => void;
  countries: { code: string; name: string }[];
  placeholder?: string;
  noResultsText?: string;
  language?: SupportedLanguage;
  translations?: TranslationsWithLocalization;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const selectedCountry = countries.find((c) => c.code === value);
  const selectedDisplayName = selectedCountry
    ? getLocalizedCountryName(selectedCountry.code, selectedCountry.name, language, translations || {})
    : "";

  // Filter countries - search in both English and Chinese names
  const filteredCountries = countries.filter((country) => {
    const searchLower = searchTerm.toLowerCase();
    const englishMatch = country.name.toLowerCase().includes(searchLower);
    // Also search in Chinese name if available
    const chineseName = translations?.countries?.[country.code] || "";
    const chineseMatch = chineseName.includes(searchTerm);
    return englishMatch || chineseMatch;
  });

  const handleSelect = (code: string) => {
    onChange(code);
    setSearchTerm("");
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
    setSearchTerm("");
  };

  const handleInputBlur = () => {
    setTimeout(() => setIsOpen(false), 200);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={isOpen ? searchTerm : selectedDisplayName}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-base placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 max-h-60 overflow-y-auto rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => handleSelect(country.code)}
                className={`w-full px-4 py-3 text-left text-base hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors ${
                  value === country.code
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
                    : "text-gray-900 dark:text-white"
                }`}
              >
                {getLocalizedCountryName(country.code, country.name, language, translations || {})}
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-gray-500 dark:text-gray-400">{noResultsText}</div>
          )}
        </div>
      )}
    </div>
  );
}

interface CitizenshipCheckerProps {
  onCountrySelect?: (code: string, requirement: VisaRequirementResult) => void;
  onPurposeChange?: (purpose: string) => void;
  onDepartingCountryChange?: (code: string) => void;
  onDepartingAirportChange?: (code: string) => void;
  initialPurpose?: string;
}

export function CitizenshipChecker({
  onCountrySelect,
  onPurposeChange,
  onDepartingCountryChange,
  onDepartingAirportChange,
  initialPurpose = "tourism",
}: CitizenshipCheckerProps) {
  // Get translations from language context
  const { t, language } = useLanguage();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [visaResult, setVisaResult] = useState<VisaRequirementResult | null>(null);
  const [purpose, setPurpose] = useState(initialPurpose);

  // New state for departure location
  const [departingCountry, setDepartingCountry] = useState("");
  const [departingAirport, setDepartingAirport] = useState("");
  const [availableAirports, setAvailableAirports] = useState<AirportInfo[]>([]);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);

  // Use translations from context, with fallback for safety
  const citizenship = t.citizenship ?? citizenshipFallback;

  // Fetch geolocation on mount
  useEffect(() => {
    const fetchGeolocation = async () => {
      try {
        const response = await fetch("/api/geolocation");
        if (response.ok) {
          const data: GeolocationData = await response.json();
          // Set detected country
          setDepartingCountry(data.countryCode);

          // Get airports for the detected country
          const airports = getAirportsForCountry(data.countryCode);
          setAvailableAirports(airports);

          // Try to match detected city to an airport
          if (airports.length > 0) {
            const cityMatch = airports.find(
              a => a.city.toLowerCase() === data.city.toLowerCase()
            );
            if (cityMatch) {
              setDepartingAirport(cityMatch.code);
            } else {
              // Use first airport as default
              setDepartingAirport(airports[0].code);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching geolocation:", error);
      } finally {
        setIsLoadingLocation(false);
      }
    };

    fetchGeolocation();
  }, []);

  // Update available airports when departing country changes
  useEffect(() => {
    if (departingCountry) {
      const airports = getAirportsForCountry(departingCountry);
      setAvailableAirports(airports);
      // Always reset airport when country changes to ensure consistency
      if (airports.length > 0) {
        setDepartingAirport(airports[0].code);
      } else {
        setDepartingAirport("");
      }
    } else {
      setAvailableAirports([]);
      setDepartingAirport("");
    }
  }, [departingCountry]); // Removed departingAirport from deps to prevent loops

  // Notify parent when departing airport changes
  useEffect(() => {
    onDepartingAirportChange?.(departingAirport);
  }, [departingAirport, onDepartingAirportChange]);

  const handleCountryChange = (code: string) => {
    setSelectedCountry(code);
    if (code) {
      const requirement = getVisaRequirement(code, citizenship);
      setVisaResult(requirement);
      onCountrySelect?.(code, requirement);
    } else {
      setVisaResult(null);
    }
  };

  const handleDepartingCountryChange = (code: string) => {
    setDepartingCountry(code);
    onDepartingCountryChange?.(code);
  };

  const handlePurposeChange = (newPurpose: string) => {
    setPurpose(newPurpose);
    onPurposeChange?.(newPurpose);
  };

  const selectedCountryName = ALL_COUNTRIES.find((c) => c.code === selectedCountry)?.name;
  const selectedAirportInfo = availableAirports.find(a => a.code === departingAirport);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{citizenship.title}</h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{citizenship.subtitle}</p>
      </div>

      <div className="max-w-md mx-auto space-y-4">
        {/* Nationality/Citizenship selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {citizenship.label} <span className="text-red-500">*</span>
          </label>
          <CountrySelector
            value={selectedCountry}
            onChange={handleCountryChange}
            countries={ALL_COUNTRIES}
            placeholder={(t as TranslationsWithLocalization).searchPrompts?.searchCitizenship || citizenship.searchPlaceholder}
            noResultsText={citizenship.noCountriesFound}
            language={language}
            translations={t as TranslationsWithLocalization}
          />
        </div>

        {/* Departing Country selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {citizenship.departingCountry} <span className="text-red-500">*</span>
            {isLoadingLocation && (
              <span className="ml-2 text-xs text-gray-400 italic">
                {citizenship.detectingLocation}
              </span>
            )}
          </label>
          <CountrySelector
            value={departingCountry}
            onChange={handleDepartingCountryChange}
            countries={ALL_COUNTRIES}
            placeholder={(t as TranslationsWithLocalization).searchPrompts?.searchCountry || citizenship.searchPlaceholder}
            noResultsText={citizenship.noCountriesFound}
            language={language}
            translations={t as TranslationsWithLocalization}
          />
        </div>

        {/* Departing Airport selector - only show if country has airports */}
        {departingCountry && availableAirports.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {citizenship.departingAirport}
            </label>
            <select
              value={departingAirport}
              onChange={(e) => setDepartingAirport(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-base focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            >
              <option value="">{(t as TranslationsWithLocalization).searchPrompts?.searchAirport || citizenship.selectAirport}</option>
              {availableAirports.map((airport) => (
                <option key={airport.code} value={airport.code}>
                  {getLocalizedAirportDisplay(airport, language, t as TranslationsWithLocalization)}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Purpose of Visit selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {citizenship.purposeOfVisit || "Purpose of Visit"} <span className="text-red-500">*</span>
          </label>
          <select
            value={purpose}
            onChange={(e) => handlePurposeChange(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-base focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
          >
            {/* Form values stay in English, display text is localized */}
            <option value="tourism">{getLocalizedPurpose("tourism", language, t as TranslationsWithLocalization)}</option>
            <option value="business">{getLocalizedPurpose("business", language, t as TranslationsWithLocalization)}</option>
            <option value="visiting_relatives">{getLocalizedPurpose("visiting_relatives", language, t as TranslationsWithLocalization)}</option>
            <option value="study">{getLocalizedPurpose("study", language, t as TranslationsWithLocalization)}</option>
            <option value="work">{getLocalizedPurpose("work", language, t as TranslationsWithLocalization)}</option>
            <option value="transit">{getLocalizedPurpose("transit", language, t as TranslationsWithLocalization)}</option>
            <option value="other">{getLocalizedPurpose("other", language, t as TranslationsWithLocalization)}</option>
          </select>
        </div>
      </div>

      {visaResult && selectedCountryName && (
        <div className={`mt-6 p-4 rounded-lg border-2 ${visaResult.bgColor}`}>
          <div className="flex items-start gap-3">
            {visaResult.type === "visa_free" && (
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
            {visaResult.type === "evisa" && (
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            )}
            {visaResult.type === "embassy_required" && (
              <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            )}
            <div className="flex-1">
              <h3 className={`font-semibold ${visaResult.color}`}>
                {selectedCountryName} {citizenship.citizens}
              </h3>
              <p className={`mt-1 ${visaResult.color}`}>{visaResult.message}</p>

              {visaResult.type === "visa_free" && (
                <>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {citizenship.longerStay.replace("{days}", String(visaResult.days))}
                  </p>
                  {/* Upsell for visa-free countries */}
                  <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                      {citizenship.needLongerStay}
                    </p>
                    <a
                      href="/apply"
                      className="mt-2 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {citizenship.getLongerVisa} →
                    </a>
                  </div>
                </>
              )}

              {visaResult.type === "evisa" && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {citizenship.evisaValid}
                  </p>
                  <a
                    href="/apply"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    {citizenship.applyBelow}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Flight Risk Warning - shown right after citizenship result for e-visa countries */}
      {/* Only show when airport is valid for the selected country to prevent showing stale data */}
      {selectedCountry && visaResult?.type === "evisa" && departingCountry && selectedAirportInfo && (
        <div className="mt-4">
          <FlightRiskBlock
            countryCode={departingCountry}
            visaSpeed="30-min"
            airportCode={departingAirport || undefined}
          />
        </div>
      )}

    </div>
  );
}
