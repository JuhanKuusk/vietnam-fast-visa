"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/ui/language-selector";
import { PhoneVerification } from "@/components/ui/phone-verification";

// Visa-free countries with duration
const VISA_FREE_45_DAYS = ["DE", "FR", "IT", "ES", "GB", "RU", "JP", "KR", "DK", "SE", "NO", "FI", "BY"];
const VISA_FREE_30_DAYS = ["TH", "MY", "SG", "ID", "LA", "KH", "MM", "BN", "PH"];
const VISA_FREE_21_DAYS = ["CL"];
const VISA_FREE_14_DAYS = ["KG"];

// Visa speed options with pricing
type VisaSpeedKey = "30-min" | "4-hour" | "1-day" | "2-day" | "weekend";

const VISA_SPEEDS: Record<VisaSpeedKey, {
  name: string;
  nameKey: string;
  description: string;
  descriptionKey: string;
  price: number;
  processingTime: string;
}> = {
  "30-min": {
    name: "30-Minute Express Visa",
    nameKey: "speed30MinName",
    description: "Fastest processing - visa ready in 30 minutes",
    descriptionKey: "speed30MinDesc",
    price: 149,
    processingTime: "30 minutes",
  },
  "4-hour": {
    name: "4-Hour Express Visa",
    nameKey: "speed4HourName",
    description: "Quick processing - visa ready in 4 hours",
    descriptionKey: "speed4HourDesc",
    price: 99,
    processingTime: "4 hours",
  },
  "1-day": {
    name: "1-Day Standard Visa",
    nameKey: "speed1DayName",
    description: "Standard processing - visa ready in 1 business day",
    descriptionKey: "speed1DayDesc",
    price: 69,
    processingTime: "1 business day",
  },
  "2-day": {
    name: "2-Day Economy Visa",
    nameKey: "speed2DayName",
    description: "Economy processing - visa ready in 2 business days",
    descriptionKey: "speed2DayDesc",
    price: 49,
    processingTime: "2 business days",
  },
  "weekend": {
    name: "Weekend & Holiday Visa",
    nameKey: "speedWeekendName",
    description: "Special weekend/holiday processing",
    descriptionKey: "speedWeekendDesc",
    price: 179,
    processingTime: "Same day (weekends/holidays)",
  },
};

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
  { code: "EC", name: "Ecuador" },
  { code: "EG", name: "Egypt" },
  { code: "SV", name: "El Salvador" },
  { code: "EE", name: "Estonia" },
  { code: "ET", name: "Ethiopia" },
  { code: "FJ", name: "Fiji" },
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
  { code: "LY", name: "Libya" },
  { code: "LT", name: "Lithuania" },
  { code: "LU", name: "Luxembourg" },
  { code: "MO", name: "Macau" },
  { code: "MK", name: "North Macedonia" },
  { code: "MG", name: "Madagascar" },
  { code: "MY", name: "Malaysia" },
  { code: "MV", name: "Maldives" },
  { code: "MT", name: "Malta" },
  { code: "MX", name: "Mexico" },
  { code: "MD", name: "Moldova" },
  { code: "MC", name: "Monaco" },
  { code: "MN", name: "Mongolia" },
  { code: "ME", name: "Montenegro" },
  { code: "MA", name: "Morocco" },
  { code: "MZ", name: "Mozambique" },
  { code: "MM", name: "Myanmar" },
  { code: "NA", name: "Namibia" },
  { code: "NP", name: "Nepal" },
  { code: "NL", name: "Netherlands" },
  { code: "NZ", name: "New Zealand" },
  { code: "NI", name: "Nicaragua" },
  { code: "NG", name: "Nigeria" },
  { code: "NO", name: "Norway" },
  { code: "OM", name: "Oman" },
  { code: "PK", name: "Pakistan" },
  { code: "PS", name: "Palestine" },
  { code: "PA", name: "Panama" },
  { code: "PY", name: "Paraguay" },
  { code: "PE", name: "Peru" },
  { code: "PH", name: "Philippines" },
  { code: "PL", name: "Poland" },
  { code: "PT", name: "Portugal" },
  { code: "QA", name: "Qatar" },
  { code: "RO", name: "Romania" },
  { code: "RU", name: "Russia" },
  { code: "RW", name: "Rwanda" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "SN", name: "Senegal" },
  { code: "RS", name: "Serbia" },
  { code: "SG", name: "Singapore" },
  { code: "SK", name: "Slovakia" },
  { code: "SI", name: "Slovenia" },
  { code: "ZA", name: "South Africa" },
  { code: "KR", name: "South Korea" },
  { code: "ES", name: "Spain" },
  { code: "LK", name: "Sri Lanka" },
  { code: "SD", name: "Sudan" },
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

// Function to determine visa requirements based on country code
function getVisaRequirement(countryCode: string, citizenship: typeof import("@/lib/translations").translations.citizenship): {
  type: "visa_free" | "evisa" | "embassy_required";
  days?: number;
  message: string;
  color: string;
  bgColor: string;
} {
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

// Entry Ports (Airports and Border Checkpoints)
const ENTRY_PORTS = [
  // International Airports
  { code: "SGN", name: "Tan Son Nhat Int. Airport (Ho Chi Minh City)", type: "airport" },
  { code: "HAN", name: "Noi Bai Int. Airport (Hanoi)", type: "airport" },
  { code: "DAD", name: "Da Nang Int. Airport", type: "airport" },
  { code: "CXR", name: "Cam Ranh Int. Airport (Nha Trang)", type: "airport" },
  { code: "PQC", name: "Phu Quoc Int. Airport", type: "airport" },
  { code: "HPH", name: "Cat Bi Int. Airport (Hai Phong)", type: "airport" },
  { code: "VCA", name: "Can Tho Int. Airport", type: "airport" },
  { code: "HUI", name: "Phu Bai Int. Airport (Hue)", type: "airport" },
  { code: "VDO", name: "Van Don Int. Airport", type: "airport" },
  { code: "THD", name: "Tho Xuan Int. Airport", type: "airport" },
  { code: "VDH", name: "Dong Hoi Int. Airport", type: "airport" },
  { code: "UIH", name: "Phu Cat Int. Airport", type: "airport" },
  { code: "DLI", name: "Lien Khuong Int. Airport (Da Lat)", type: "airport" },
  // Land Border Gates
  { code: "MOCLB", name: "Moc Bai Land Border (Tay Ninh)", type: "land" },
  { code: "LONGL", name: "Lao Bao Land Border (Quang Tri)", type: "land" },
  { code: "HUTIL", name: "Huu Nghi Land Border (Lang Son)", type: "land" },
  { code: "CAOTL", name: "Cao Treo Land Border (Ha Tinh)", type: "land" },
  { code: "XAMAN", name: "Xa Mat Land Border (Tay Ninh)", type: "land" },
  // Seaports
  { code: "HCMSP", name: "Ho Chi Minh City Seaport", type: "seaport" },
  { code: "HANSP", name: "Hai Phong Seaport", type: "seaport" },
  { code: "DANSP", name: "Da Nang Seaport", type: "seaport" },
  { code: "NHASP", name: "Nha Trang Seaport", type: "seaport" },
  { code: "QUASP", name: "Quang Ninh Seaport (Ha Long)", type: "seaport" },
];

// Vietnam Cities/Provinces
const VIETNAM_CITIES = [
  { code: "HN", name: "Hanoi" },
  { code: "HCM", name: "Ho Chi Minh City" },
  { code: "DN", name: "Da Nang" },
  { code: "HP", name: "Hai Phong" },
  { code: "CT", name: "Can Tho" },
  { code: "NT", name: "Nha Trang (Khanh Hoa)" },
  { code: "DL", name: "Da Lat (Lam Dong)" },
  { code: "HL", name: "Ha Long (Quang Ninh)" },
  { code: "HUE", name: "Hue (Thua Thien Hue)" },
  { code: "HA", name: "Hoi An (Quang Nam)" },
  { code: "PQ", name: "Phu Quoc (Kien Giang)" },
  { code: "VT", name: "Vung Tau (Ba Ria-Vung Tau)" },
  { code: "ST", name: "Sa Pa (Lao Cai)" },
  { code: "QN", name: "Quy Nhon (Binh Dinh)" },
  { code: "PT", name: "Phan Thiet (Binh Thuan)" },
  { code: "OTHER", name: "Other" },
];

// Citizenship Checker Component
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
  evisaValid: "E-Visa is valid for 90 days with single or multiple entry options.",
  applyBelow: "Apply below - Approval in 30 minutes!",
};

function CitizenshipChecker({
  onCountrySelect,
  t,
}: {
  onCountrySelect?: (code: string, requirement: ReturnType<typeof getVisaRequirement>) => void;
  t: typeof import("@/lib/translations").translations;
}) {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [visaResult, setVisaResult] = useState<ReturnType<typeof getVisaRequirement> | null>(null);

  // Use fallback if translations not yet loaded
  const citizenship = t?.citizenship ?? citizenshipFallback;

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

  const selectedCountryName = ALL_COUNTRIES.find((c) => c.code === selectedCountry)?.name;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">{citizenship.title}</h2>
        <p className="text-gray-600 text-sm mt-1">{citizenship.subtitle}</p>
      </div>

      <div className="max-w-md mx-auto">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {citizenship.label}
        </label>
        <CountrySelector
          value={selectedCountry}
          onChange={handleCountryChange}
          countries={ALL_COUNTRIES}
          placeholder={citizenship.searchPlaceholder}
          noResultsText={citizenship.noCountriesFound}
        />
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
                <p className="mt-2 text-sm text-gray-600">
                  {citizenship.longerStay.replace("{days}", String(visaResult.days))}
                </p>
              )}

              {visaResult.type === "evisa" && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">
                    {citizenship.evisaValid}
                  </p>
                  <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    {citizenship.applyBelow}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface ApplicantData {
  fullName: string;
  nationality: string;
  passportNumber: string;
  dateOfBirth: string;
  passportExpiry: string;
  gender: string;
  religion: string;
}

interface TravelDetails {
  applicantCount: number;
  purpose: string;
  entryDate: string;
  exitDate: string;
  entryPort: string;
  exitPort: string;
  addressInVietnam: string;
  cityProvince: string;
  flightNumber: string;
}

// Searchable Country Selector Component
function CountrySelector({
  value,
  onChange,
  countries,
  placeholder = "Type to search or select...",
  noResultsText = "No countries found",
}: {
  value: string;
  onChange: (code: string) => void;
  countries: { code: string; name: string }[];
  placeholder?: string;
  noResultsText?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const selectedCountry = countries.find((c) => c.code === value);

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        value={isOpen ? searchTerm : selectedCountry?.name || ""}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 text-base placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
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
        <div className="absolute z-50 w-full mt-1 max-h-60 overflow-y-auto rounded-lg bg-white border border-gray-200 shadow-lg">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => handleSelect(country.code)}
                className={`w-full px-4 py-3 text-left text-base hover:bg-blue-50 transition-colors ${
                  value === country.code
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "text-gray-700"
                }`}
              >
                {country.name}
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-gray-500 text-base">
              {noResultsText}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Photo Upload Component
function PhotoUploadSection({
  label,
  description,
  file,
  onFileChange,
  uploadedText = "uploaded",
  clickToUploadText = "Click to upload",
}: {
  label: string;
  description: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
  uploadedText?: string;
  clickToUploadText?: string;
}) {
  if (file) {
    return (
      <div className="border-2 border-green-500 rounded-lg p-4 bg-green-50">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-green-700 font-semibold text-base flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {label} {uploadedText}
            </p>
            <p className="text-sm text-gray-600 truncate">{file.name}</p>
          </div>
          <button
            onClick={() => onFileChange(null)}
            className="text-gray-400 hover:text-red-500 p-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const selectedFile = e.target.files?.[0] || null;
            onFileChange(selectedFile);
          }}
          className="hidden"
          id={`upload-${label}`}
        />
        <label htmlFor={`upload-${label}`} className="cursor-pointer block">
          <svg className="w-10 h-10 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-gray-700 font-medium">{clickToUploadText}</p>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </label>
      </div>
    </div>
  );
}

function ApplyForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { t, isLoading: isTranslating, language } = useLanguage();

  // Get initial values from URL params (from home page)
  const initialFlight = searchParams.get("flight") || "";
  const initialNationality = searchParams.get("nationality") || "";
  const initialPurpose = searchParams.get("purpose") || "tourism";
  const initialEntryPort = searchParams.get("entryPort") || "";
  const speedParam = searchParams.get("speed") || "30-min";

  // Get visa speed configuration (default to 30-min if invalid)
  const visaSpeed = (Object.keys(VISA_SPEEDS).includes(speedParam) ? speedParam : "30-min") as VisaSpeedKey;
  const visaSpeedConfig = VISA_SPEEDS[visaSpeed];
  const pricePerPerson = visaSpeedConfig.price;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showVerification, setShowVerification] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  // Travel Details State - pre-fill from URL params
  const [travelDetails, setTravelDetails] = useState<TravelDetails>({
    applicantCount: 1,
    purpose: initialPurpose,
    entryDate: "",
    exitDate: "",
    entryPort: initialEntryPort,
    exitPort: "",
    addressInVietnam: "",
    cityProvince: "",
    flightNumber: initialFlight,
  });

  const totalPrice = pricePerPerson * travelDetails.applicantCount;

  // Calculate length of stay
  const lengthOfStay = travelDetails.entryDate && travelDetails.exitDate
    ? Math.ceil((new Date(travelDetails.exitDate).getTime() - new Date(travelDetails.entryDate).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const [currentApplicant, setCurrentApplicant] = useState(0);
  const [applicants, setApplicants] = useState<ApplicantData[]>([{
    fullName: "",
    nationality: initialNationality,
    passportNumber: "",
    dateOfBirth: "",
    passportExpiry: "",
    gender: "",
    religion: "",
  }]);

  // Update applicants array when count changes
  const updateApplicantCount = (count: number) => {
    setTravelDetails({ ...travelDetails, applicantCount: count });
    if (count > applicants.length) {
      // Add more applicants
      const newApplicants = [...applicants];
      for (let i = applicants.length; i < count; i++) {
        newApplicants.push({
          fullName: "",
          nationality: "",
          passportNumber: "",
          dateOfBirth: "",
          passportExpiry: "",
          gender: "",
          religion: "",
        });
      }
      setApplicants(newApplicants);
    } else if (count < applicants.length) {
      // Remove extra applicants
      setApplicants(applicants.slice(0, count));
      if (currentApplicant >= count) {
        setCurrentApplicant(count - 1);
      }
    }
  };

  const [contactInfo, setContactInfo] = useState({
    email: "",
    mobile: "",
    whatsapp: "",
    whatsappSameAsMobile: true,
    confirmEmail: "",
  });

  // Computed phone value for verification (use mobile)
  const phoneForVerification = contactInfo.mobile;

  const [passportPhotos, setPassportPhotos] = useState<(File | null)[]>([null]);
  const [portraitPhotos, setPortraitPhotos] = useState<(File | null)[]>([null]);

  const updateApplicant = (field: keyof ApplicantData, value: string) => {
    const updated = [...applicants];
    updated[currentApplicant] = { ...updated[currentApplicant], [field]: value };
    setApplicants(updated);
  };

  const currentData = applicants[currentApplicant];

  const minPassportExpiry = new Date();
  minPassportExpiry.setMonth(minPassportExpiry.getMonth() + 6);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Validate travel details
      if (!travelDetails.entryDate || !travelDetails.exitDate) {
        setSubmitError("Please provide entry and exit dates");
        setIsSubmitting(false);
        return;
      }
      if (!travelDetails.entryPort || !travelDetails.exitPort) {
        setSubmitError("Please select entry and exit checkpoints");
        setIsSubmitting(false);
        return;
      }
      if (!travelDetails.addressInVietnam || !travelDetails.cityProvince) {
        setSubmitError("Please provide your temporary address in Vietnam");
        setIsSubmitting(false);
        return;
      }

      // Validate applicants
      for (let i = 0; i < applicants.length; i++) {
        const applicant = applicants[i];
        if (!applicant.fullName || !applicant.nationality || !applicant.passportNumber ||
            !applicant.dateOfBirth || !applicant.gender || !applicant.religion) {
          setSubmitError(`Please complete all required fields for applicant ${i + 1}`);
          setCurrentApplicant(i);
          setIsSubmitting(false);
          return;
        }
      }

      if (!contactInfo.email || !contactInfo.mobile) {
        setSubmitError("Please provide email and mobile phone number");
        setCurrentApplicant(0);
        setIsSubmitting(false);
        return;
      }

      if (contactInfo.email !== contactInfo.confirmEmail) {
        setSubmitError("Email addresses do not match");
        setCurrentApplicant(0);
        setIsSubmitting(false);
        return;
      }

      const applicationData = {
        tripDetails: {
          applicants: travelDetails.applicantCount,
          purpose: travelDetails.purpose as "tourist" | "business" | "visiting",
          entryPort: travelDetails.entryPort,
          exitPort: travelDetails.exitPort,
          entryDate: travelDetails.entryDate,
          exitDate: travelDetails.exitDate,
          addressInVietnam: travelDetails.addressInVietnam,
          cityProvince: travelDetails.cityProvince,
          flightNumber: travelDetails.flightNumber,
        },
        applicants: applicants.map((applicant) => ({
          fullName: applicant.fullName,
          nationality: applicant.nationality,
          passportNumber: applicant.passportNumber,
          dateOfBirth: applicant.dateOfBirth,
          gender: applicant.gender as "male" | "female",
          religion: applicant.religion,
          email: contactInfo.email,
          mobile: contactInfo.mobile,
          whatsapp: contactInfo.whatsappSameAsMobile ? contactInfo.mobile : contactInfo.whatsapp,
        })),
        language, // Include user's language preference for email translations
        visaSpeed, // Include selected visa speed for pricing
      };

      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(applicationData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit application");
      }

      sessionStorage.setItem("applicationId", result.applicationId);
      sessionStorage.setItem("referenceNumber", result.referenceNumber);
      sessionStorage.setItem("totalAmount", String(result.amount));

      router.push(`/payment?applicants=${travelDetails.applicantCount}&ref=${result.referenceNumber}`);
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitError(error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Translation Loading Overlay */}
      {isTranslating && (
        <div className="fixed inset-0 bg-white/80 z-50 flex items-center justify-center">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 animate-spin text-blue-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-gray-600">{t.common.loading}</span>
          </div>
        </div>
      )}

      {/* Official Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-yellow-400 text-xl font-bold">V</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{t.applyHeader.siteName}</h1>
              <p className="text-xs text-gray-500">{t.applyHeader.tagline}</p>
            </div>
          </a>
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <a
              href="https://wa.me/1234567890"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-600 transition-colors"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="hidden sm:inline">{t.applyHeader.support}</span>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Selected Visa Speed Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-5 mb-6 text-white shadow-lg">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold">{visaSpeedConfig.name}</h2>
                <p className="text-blue-100 text-sm">{visaSpeedConfig.description}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">${pricePerPerson}</div>
              <div className="text-blue-200 text-sm">per person</div>
            </div>
          </div>
          {visaSpeed !== "30-min" && (
            <div className="mt-4 pt-4 border-t border-white/20">
              <a
                href="/apply?speed=30-min"
                className="text-sm text-blue-100 hover:text-white flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Need it faster? Upgrade to 30-Minute Express ($149)
              </a>
            </div>
          )}
        </div>

        {/* VOA Information Banner */}
        <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-5 mb-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
              <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-amber-800 mb-2">{t.voa.title}</h3>
              <p className="text-amber-700 font-medium mb-3">
                {t.voa.warning}
              </p>
              <div className="text-amber-900 space-y-2 text-sm">
                <p><strong>{t.voa.means}</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>{t.voa.point1}</li>
                  <li>{t.voa.point2}</li>
                  <li>{t.voa.point3}</li>
                </ul>
                <p className="mt-3 p-2 bg-amber-100 rounded-lg border border-amber-300">
                  <strong>{t.voa.noApproval}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Citizenship Checker - Shows visa requirements based on country */}
        <CitizenshipChecker t={t} />

        {/* Processing Time Box */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">{t.processing.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-green-50 border border-green-200">
              <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl font-bold">30</span>
              </div>
              <div>
                <div className="text-green-700 font-bold text-lg">{t.processing.thirtyMin}</div>
                <div className="text-green-600 text-sm">{t.processing.thirtyMinDesc}</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-50 border border-blue-200">
              <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-lg font-bold">1-2h</span>
              </div>
              <div>
                <div className="text-blue-700 font-bold text-lg">{t.processing.oneToTwo}</div>
                <div className="text-blue-600 text-sm">{t.processing.oneToTwoDesc}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                1
              </div>
              <span className="text-sm font-medium text-gray-900 hidden sm:inline">{t.progress.tripDetails}</span>
            </div>
            <div className="w-8 sm:w-16 h-0.5 bg-blue-600"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                2
              </div>
              <span className="text-sm font-medium text-gray-900 hidden sm:inline">{t.progress.yourInfo}</span>
            </div>
            <div className="w-8 sm:w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm font-medium">
                3
              </div>
              <span className="text-sm font-medium text-gray-500 hidden sm:inline">{t.progress.payment}</span>
            </div>
          </div>
        </div>

        {/* Travel Details Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="bg-green-600 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">
              {t.travelDetails?.title || "Travel Details"}
            </h2>
            <p className="text-green-100 text-sm mt-1">
              {t.travelDetails?.subtitle || "Please provide your trip information"}
            </p>
          </div>

          <div className="p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Number of Applicants */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.travelDetails?.numberOfApplicants || "Number of Applicants"} <span className="text-red-500">*</span>
                </label>
                <select
                  value={travelDetails.applicantCount}
                  onChange={(e) => updateApplicantCount(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? (t.travelDetails?.person || "person") : (t.travelDetails?.people || "people")}
                    </option>
                  ))}
                </select>
              </div>

              {/* Purpose of Travel */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.travelDetails?.purposeOfTravel || "Purpose of Travel"} <span className="text-red-500">*</span>
                </label>
                <select
                  value={travelDetails.purpose}
                  onChange={(e) => setTravelDetails({ ...travelDetails, purpose: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                >
                  <option value="tourist">{t.travelDetails?.tourist || "Tourism"}</option>
                  <option value="business">{t.travelDetails?.business || "Business"}</option>
                  <option value="visiting">{t.travelDetails?.visiting || "Visiting relatives/friends"}</option>
                </select>
              </div>

              {/* Entry Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.travelDetails?.entryDate || "Intended Date of Entry"} <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={travelDetails.entryDate}
                  onChange={(e) => setTravelDetails({ ...travelDetails, entryDate: e.target.value })}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {t.travelDetails?.entryDateHint || "You must enter Vietnam on or after this date"}
                </p>
              </div>

              {/* Exit Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.travelDetails?.exitDate || "Intended Date of Exit"} <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={travelDetails.exitDate}
                  onChange={(e) => setTravelDetails({ ...travelDetails, exitDate: e.target.value })}
                  min={travelDetails.entryDate || new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
                {lengthOfStay > 0 && (
                  <p className="text-xs text-blue-600 mt-1 font-medium">
                    {t.travelDetails?.lengthOfStay || "Length of Stay"}: {lengthOfStay} {t.travelDetails?.days || "days"}
                  </p>
                )}
              </div>

              {/* Entry Port */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.travelDetails?.entryPort || "Entry Checkpoint"} <span className="text-red-500">*</span>
                </label>
                <select
                  value={travelDetails.entryPort}
                  onChange={(e) => setTravelDetails({ ...travelDetails, entryPort: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                >
                  <option value="">{t.travelDetails?.selectPort || "Select checkpoint..."}</option>
                  <optgroup label="International Airports">
                    {ENTRY_PORTS.filter(p => p.type === "airport").map((port) => (
                      <option key={port.code} value={port.code}>{port.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Land Border Gates">
                    {ENTRY_PORTS.filter(p => p.type === "land").map((port) => (
                      <option key={port.code} value={port.code}>{port.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Seaports">
                    {ENTRY_PORTS.filter(p => p.type === "seaport").map((port) => (
                      <option key={port.code} value={port.code}>{port.name}</option>
                    ))}
                  </optgroup>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {t.travelDetails?.entryPortHint || "Select the airport/border where you will enter Vietnam"}
                </p>
              </div>

              {/* Exit Port */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.travelDetails?.exitPort || "Exit Checkpoint"} <span className="text-red-500">*</span>
                </label>
                <select
                  value={travelDetails.exitPort}
                  onChange={(e) => setTravelDetails({ ...travelDetails, exitPort: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                >
                  <option value="">{t.travelDetails?.selectPort || "Select checkpoint..."}</option>
                  <optgroup label="International Airports">
                    {ENTRY_PORTS.filter(p => p.type === "airport").map((port) => (
                      <option key={port.code} value={port.code}>{port.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Land Border Gates">
                    {ENTRY_PORTS.filter(p => p.type === "land").map((port) => (
                      <option key={port.code} value={port.code}>{port.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Seaports">
                    {ENTRY_PORTS.filter(p => p.type === "seaport").map((port) => (
                      <option key={port.code} value={port.code}>{port.name}</option>
                    ))}
                  </optgroup>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {t.travelDetails?.exitPortHint || "Select the airport/border where you will leave Vietnam"}
                </p>
              </div>

              {/* Temporary Address in Vietnam */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.travelDetails?.addressInVietnam || "Temporary Address in Vietnam"} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={travelDetails.addressInVietnam}
                  onChange={(e) => setTravelDetails({ ...travelDetails, addressInVietnam: e.target.value })}
                  placeholder={t.travelDetails?.addressPlaceholder || "e.g. Sheraton Hotel, 88 Dong Khoi Street"}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {t.travelDetails?.addressHint || "Hotel name or address where you will stay"}
                </p>
              </div>

              {/* City/Province */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.travelDetails?.cityProvince || "City/Province"} <span className="text-red-500">*</span>
                </label>
                <select
                  value={travelDetails.cityProvince}
                  onChange={(e) => setTravelDetails({ ...travelDetails, cityProvince: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                >
                  <option value="">{t.travelDetails?.selectCity || "Select city/province..."}</option>
                  {VIETNAM_CITIES.map((city) => (
                    <option key={city.code} value={city.code}>{city.name}</option>
                  ))}
                </select>
              </div>

              {/* Flight Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.travelDetails?.flightNumber || "Flight Number"} <span className="text-gray-400 font-normal">{t.travelDetails?.flightOptional || "(Optional)"}</span>
                </label>
                <input
                  type="text"
                  value={travelDetails.flightNumber}
                  onChange={(e) => setTravelDetails({ ...travelDetails, flightNumber: e.target.value.toUpperCase() })}
                  placeholder={t.travelDetails?.flightPlaceholder || "e.g. VN123, SQ456"}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 uppercase transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Applicant Info Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Form Header */}
          <div className="bg-blue-600 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">
              {t.applyForm.applicantInfo}
            </h2>
            {travelDetails.applicantCount > 1 && (
              <p className="text-blue-100 text-sm mt-1">
                {t.applyForm.applicantOf.replace("{current}", String(currentApplicant + 1)).replace("{total}", String(travelDetails.applicantCount))}
              </p>
            )}
          </div>

          {/* Applicant Tabs */}
          {travelDetails.applicantCount > 1 && (
            <div className="flex border-b border-gray-200 overflow-x-auto bg-gray-50">
              {applicants.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentApplicant(index)}
                  className={`flex-1 min-w-[100px] px-4 py-3 text-sm font-medium transition-colors ${
                    currentApplicant === index
                      ? "bg-white text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {t.applyForm.person} {index + 1}
                  {applicants[index].fullName && (
                    <span className="ml-1 text-green-500">&#10003;</span>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Form Body */}
          <div className="p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.applyForm.fullName} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={currentData.fullName}
                  onChange={(e) => updateApplicant("fullName", e.target.value.toUpperCase())}
                  placeholder={t.applyForm.fullNamePlaceholder}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 text-base placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 uppercase transition-all"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {t.applyForm.fullNameHint}
                </p>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.applyForm.gender} <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-3">
                  {[{ label: t.applyForm.male, value: "male" }, { label: t.applyForm.female, value: "female" }].map((gender) => (
                    <label
                      key={gender.value}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 cursor-pointer transition-all text-base ${
                        currentData.gender === gender.value
                          ? "bg-blue-50 border-blue-500 text-blue-700"
                          : "bg-white border-gray-300 text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`gender-${currentApplicant}`}
                        value={gender.value}
                        checked={currentData.gender === gender.value}
                        onChange={(e) => updateApplicant("gender", e.target.value)}
                        className="sr-only"
                      />
                      {gender.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.applyForm.dateOfBirth} <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={currentData.dateOfBirth}
                  onChange={(e) => updateApplicant("dateOfBirth", e.target.value)}
                  max={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 text-base focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              {/* Religion */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.applyForm.religion || "Religion"} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={currentData.religion}
                  onChange={(e) => updateApplicant("religion", e.target.value)}
                  placeholder={t.applyForm.religionPlaceholder || "e.g. None, Christian, Muslim, Buddhist"}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 text-base placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {t.applyForm.religionHint || "Enter your religion or 'None' if not applicable"}
                </p>
              </div>

              {/* Nationality */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.applyForm.nationality} <span className="text-red-500">*</span>
                </label>
                <CountrySelector
                  value={currentData.nationality}
                  onChange={(code) => updateApplicant("nationality", code)}
                  countries={EVISA_COUNTRIES}
                  placeholder={t.citizenship.searchPlaceholder}
                  noResultsText={t.citizenship.noCountriesFound}
                />
              </div>

              {/* Passport Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.applyForm.passportNumber} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={currentData.passportNumber}
                  onChange={(e) => updateApplicant("passportNumber", e.target.value.toUpperCase())}
                  placeholder={t.applyForm.passportPlaceholder}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 text-base placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 uppercase transition-all"
                />
              </div>

              {/* Passport Expiry */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.applyForm.passportExpiry} <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={currentData.passportExpiry}
                  onChange={(e) => updateApplicant("passportExpiry", e.target.value)}
                  min={minPassportExpiry.toISOString().split("T")[0]}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 text-base focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {t.applyForm.passportExpiryHint}
                </p>
              </div>

              {/* Document Uploads Section */}
              <div className="lg:col-span-2 border-t border-gray-200 pt-6 mt-2">
                <h3 className="font-semibold text-gray-900 mb-4">{t.applyForm.documentUploads}</h3>
              </div>

              {/* Passport Photo */}
              <div>
                <PhotoUploadSection
                  label={t.applyForm.passportDataPage}
                  description={t.applyForm.passportPageDesc}
                  file={passportPhotos[currentApplicant]}
                  onFileChange={(file) => {
                    const files = [...passportPhotos];
                    files[currentApplicant] = file;
                    setPassportPhotos(files);
                  }}
                  uploadedText={t.applyForm.uploaded}
                  clickToUploadText={t.applyForm.clickToUpload}
                />
              </div>

              {/* Portrait Photo */}
              <div>
                <PhotoUploadSection
                  label={t.applyForm.portraitPhoto}
                  description={t.applyForm.portraitDesc}
                  file={portraitPhotos[currentApplicant]}
                  onFileChange={(file) => {
                    const files = [...portraitPhotos];
                    files[currentApplicant] = file;
                    setPortraitPhotos(files);
                  }}
                  uploadedText={t.applyForm.uploaded}
                  clickToUploadText={t.applyForm.clickToUpload}
                />
              </div>

              {/* Contact Information */}
              {currentApplicant === 0 && (
                <>
                  <div className="lg:col-span-2 border-t border-gray-200 pt-6 mt-2">
                    <h3 className="font-semibold text-gray-900 mb-4">{t.applyForm.contactInfo}</h3>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.applyForm.email} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                      placeholder={t.applyForm.emailPlaceholder}
                      className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 text-base placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {t.applyForm.emailHint}
                    </p>
                  </div>

                  {/* Confirm Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.applyForm.confirmEmail} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={contactInfo.confirmEmail}
                      onChange={(e) => setContactInfo({ ...contactInfo, confirmEmail: e.target.value })}
                      placeholder={t.applyForm.emailPlaceholder}
                      className={`w-full px-4 py-3 rounded-lg bg-white border text-gray-900 text-base placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                        contactInfo.confirmEmail && contactInfo.email !== contactInfo.confirmEmail
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
                      }`}
                    />
                    {contactInfo.confirmEmail && contactInfo.email !== contactInfo.confirmEmail && (
                      <p className="text-xs text-red-500 mt-1">{t.applyForm.emailsMismatch}</p>
                    )}
                  </div>

                  {/* Mobile Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.applyForm.mobile} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={contactInfo.mobile}
                      onChange={(e) => setContactInfo({ ...contactInfo, mobile: e.target.value })}
                      placeholder={t.applyForm.mobilePlaceholder}
                      className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 text-base placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {t.applyForm.mobileHint}
                    </p>
                  </div>

                  {/* WhatsApp Same as Mobile Checkbox + WhatsApp Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.applyForm.whatsapp} <span className="text-gray-400 font-normal">{t.applyForm.whatsappOptional}</span>
                    </label>

                    {/* Checkbox */}
                    <label className="flex items-center gap-3 mb-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={contactInfo.whatsappSameAsMobile}
                        onChange={(e) => setContactInfo({
                          ...contactInfo,
                          whatsappSameAsMobile: e.target.checked,
                          whatsapp: e.target.checked ? "" : contactInfo.whatsapp
                        })}
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 cursor-pointer"
                      />
                      <span className="text-sm text-gray-700">{t.applyForm.whatsappSameAsMobile}</span>
                    </label>

                    {/* WhatsApp input - only show when checkbox is unchecked */}
                    {!contactInfo.whatsappSameAsMobile && (
                      <>
                        <input
                          type="tel"
                          value={contactInfo.whatsapp}
                          onChange={(e) => setContactInfo({ ...contactInfo, whatsapp: e.target.value })}
                          placeholder={t.applyForm.whatsappPlaceholder}
                          className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 text-base placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          {t.applyForm.whatsappHint}
                        </p>
                      </>
                    )}
                  </div>
                </>
              )}

              {/* Phone Verification Section */}
              {currentApplicant === travelDetails.applicantCount - 1 && phoneForVerification && !isPhoneVerified && (
                <div className="lg:col-span-2 border-t border-gray-200 pt-6 mt-2">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    {t.applyForm.verifyPhone || "Verify Your Phone Number"}
                  </h3>
                  {showVerification ? (
                    <PhoneVerification
                      phoneNumber={phoneForVerification}
                      onVerified={() => {
                        setIsPhoneVerified(true);
                        setShowVerification(false);
                      }}
                      onCancel={() => setShowVerification(false)}
                      translations={t.verification}
                    />
                  ) : (
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                      <p className="text-blue-800 mb-4">
                        {t.applyForm.verifyPhoneDesc || "Please verify your phone number to continue. We'll send you a verification code."}
                      </p>
                      <button
                        onClick={() => setShowVerification(true)}
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        {t.applyForm.verifyNow || "Verify Phone Number"}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Verified Badge */}
              {isPhoneVerified && (
                <div className="lg:col-span-2 flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-green-700 font-medium">{t.applyForm.phoneVerified || "Phone number verified!"}</span>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="lg:col-span-2 flex gap-4 pt-6">
                {travelDetails.applicantCount > 1 && currentApplicant > 0 && (
                  <button
                    onClick={() => setCurrentApplicant(currentApplicant - 1)}
                    className="flex-1 lg:flex-none lg:px-8 py-3 rounded-lg border border-gray-300 text-gray-700 text-base font-medium hover:bg-gray-50 transition-colors"
                  >
                    {t.applyForm.previous}
                  </button>
                )}

                {travelDetails.applicantCount > 1 && currentApplicant < travelDetails.applicantCount - 1 ? (
                  <button
                    onClick={() => setCurrentApplicant(currentApplicant + 1)}
                    className="flex-1 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-base transition-colors"
                  >
                    {t.applyForm.nextApplicant}
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !isPhoneVerified}
                    className="flex-1 py-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        {t.applyForm.processing}
                      </span>
                    ) : (
                      t.applyForm.continuePayment
                    )}
                  </button>
                )}
              </div>

              {/* Error Message */}
              {submitError && (
                <div className="lg:col-span-2 text-center p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{submitError}</p>
                </div>
              )}

              {/* Price Summary */}
              <div className="lg:col-span-2 border-t border-gray-200 pt-5 mt-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">
                    {t.applyForm.total} ({travelDetails.applicantCount} {travelDetails.applicantCount === 1 ? t.applyForm.person1 : t.applyForm.people})
                  </span>
                  <span className="text-2xl font-bold text-blue-600">${totalPrice} USD</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>{t.applyTrust.secure}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span>{t.applyTrust.fast}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{t.applyTrust.official}</span>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 mb-12">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">{t.applyFaq.title}</h2>
            <p className="text-gray-600 mt-2">{t.applyFaq.subtitle}</p>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-8">

            {/* Section 1: Visa Types */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-blue-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-blue-900 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
                  </svg>
                  {t.applyFaq.visaTypesTitle}
                </h3>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{t.applyFaq.visaTypesQ1}</h4>
                  <div className="text-gray-600 space-y-2">
                    <p>{t.applyFaq.visaTypesA1Evisa}</p>
                    <p>{t.applyFaq.visaTypesA1Voa}</p>
                    <p>{t.applyFaq.visaTypesA1Embassy}</p>
                    <p>{t.applyFaq.visaTypesA1Transit}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{t.applyFaq.visaTypesQ2}</h4>
                  <div className="text-gray-600">
                    <ul className="list-disc list-inside space-y-1">
                      <li>{t.applyFaq.visaTypesA2Single}</li>
                      <li>{t.applyFaq.visaTypesA2Multiple}</li>
                      <li>{t.applyFaq.visaTypesA2Extend}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Visa-Free Countries */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-green-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-green-900 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {t.applyFaq.visaFreeTitle}
                </h3>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{t.applyFaq.visaFreeQ1}</h4>
                  <div className="text-gray-600 space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="font-medium text-gray-900 mb-2">{t.applyFaq.visaFree45Title}</p>
                      <p>{t.applyFaq.visaFree45Countries}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="font-medium text-gray-900 mb-2">{t.applyFaq.visaFree30Title}</p>
                      <p>{t.applyFaq.visaFree30Countries}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="font-medium text-gray-900 mb-2">{t.applyFaq.visaFree21Title}</p>
                      <p>{t.applyFaq.visaFree21Countries}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="font-medium text-gray-900 mb-2">{t.applyFaq.visaFree14Title}</p>
                      <p>{t.applyFaq.visaFree14Countries}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{t.applyFaq.visaFreeQ2}</h4>
                  <ul className="text-gray-600 list-disc list-inside space-y-1">
                    <li>{t.applyFaq.visaFreeNote1}</li>
                    <li>{t.applyFaq.visaFreeNote2}</li>
                    <li>{t.applyFaq.visaFreeNote3}</li>
                    <li>{t.applyFaq.visaFreeNote4}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 3: E-Visa Eligible Countries */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-purple-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-purple-900 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                    <path d="M10 4a1 1 0 011 1v4.586l2.707 2.707a1 1 0 01-1.414 1.414l-3-3A1 1 0 019 10V5a1 1 0 011-1z" />
                  </svg>
                  {t.applyFaq.evisaTitle}
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-medium text-gray-900 mb-2">{t.applyFaq.evisaEurope}</p>
                    <p className="text-sm text-gray-600">{t.applyFaq.evisaEuropeCountries}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-medium text-gray-900 mb-2">{t.applyFaq.evisaAsia}</p>
                    <p className="text-sm text-gray-600">{t.applyFaq.evisaAsiaCountries}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-medium text-gray-900 mb-2">{t.applyFaq.evisaAmericas}</p>
                    <p className="text-sm text-gray-600">{t.applyFaq.evisaAmericasCountries}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Visa on Arrival */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-orange-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-orange-900 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                  {t.applyFaq.voaTitle}
                </h3>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{t.applyFaq.voaQ1}</h4>
                  <p className="text-gray-600">{t.applyFaq.voaA1}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{t.applyFaq.voaQ2}</h4>
                  <ul className="text-gray-600 list-disc list-inside space-y-1">
                    <li>{t.applyFaq.voaReq1}</li>
                    <li>{t.applyFaq.voaReq2}</li>
                    <li>{t.applyFaq.voaReq3}</li>
                    <li>{t.applyFaq.voaReq4}</li>
                    <li>{t.applyFaq.voaReq5}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{t.applyFaq.voaQ3}</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-600">
                    <span className="bg-gray-100 px-3 py-1 rounded">Hanoi (HAN)</span>
                    <span className="bg-gray-100 px-3 py-1 rounded">Ho Chi Minh (SGN)</span>
                    <span className="bg-gray-100 px-3 py-1 rounded">Da Nang (DAD)</span>
                    <span className="bg-gray-100 px-3 py-1 rounded">Nha Trang (CXR)</span>
                    <span className="bg-gray-100 px-3 py-1 rounded">Phu Quoc (PQC)</span>
                    <span className="bg-gray-100 px-3 py-1 rounded">Hai Phong (HPH)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5: Arrival Procedures */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-teal-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-teal-900 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  {t.applyFaq.arrivalTitle}
                </h3>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{t.applyFaq.arrivalQ1}</h4>
                  <ol className="text-gray-600 list-decimal list-inside space-y-2">
                    <li>{t.applyFaq.arrivalStep1}</li>
                    <li>{t.applyFaq.arrivalStep2}</li>
                    <li>{t.applyFaq.arrivalStep3}</li>
                    <li>{t.applyFaq.arrivalStep4}</li>
                    <li>{t.applyFaq.arrivalStep5}</li>
                    <li>{t.applyFaq.arrivalStep6}</li>
                    <li>{t.applyFaq.arrivalStep7}</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{t.applyFaq.arrivalQ2}</h4>
                  <ul className="text-gray-600 list-disc list-inside space-y-1">
                    <li>{t.applyFaq.customsItem1}</li>
                    <li>{t.applyFaq.customsItem2}</li>
                    <li>{t.applyFaq.customsItem3}</li>
                    <li>{t.applyFaq.customsItem4}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 6: Processing & Requirements */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-indigo-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-indigo-900 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  {t.applyFaq.processingTitle}
                </h3>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{t.applyFaq.processingQ1}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                      <p className="font-bold text-red-700 text-xl">{t.applyFaq.rushTime}</p>
                      <p className="text-red-600 text-sm">{t.applyFaq.rushLabel}</p>
                      <p className="text-gray-500 text-xs mt-1">{t.applyFaq.rushNote}</p>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                      <p className="font-bold text-yellow-700 text-xl">{t.applyFaq.standardTime}</p>
                      <p className="text-yellow-600 text-sm">{t.applyFaq.standardLabel}</p>
                      <p className="text-gray-500 text-xs mt-1">{t.applyFaq.standardNote}</p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                      <p className="font-bold text-gray-700 text-xl">{t.applyFaq.embassyTime}</p>
                      <p className="text-gray-600 text-sm">{t.applyFaq.embassyLabel}</p>
                      <p className="text-gray-500 text-xs mt-1">{t.applyFaq.embassyNote}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{t.applyFaq.processingQ2}</h4>
                  <ul className="text-gray-600 list-disc list-inside space-y-1">
                    <li>{t.applyFaq.docReq1}</li>
                    <li>{t.applyFaq.docReq2}</li>
                    <li>{t.applyFaq.docReq3}</li>
                    <li>{t.applyFaq.docReq4}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{t.applyFaq.processingQ3}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="font-medium text-green-800 mb-2">{t.applyFaq.photoAcceptable}</p>
                      <ul className="text-green-700 text-sm space-y-1">
                        <li>{t.applyFaq.photoAccept1}</li>
                        <li>{t.applyFaq.photoAccept2}</li>
                        <li>{t.applyFaq.photoAccept3}</li>
                        <li>{t.applyFaq.photoAccept4}</li>
                      </ul>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="font-medium text-red-800 mb-2">{t.applyFaq.photoNotAcceptable}</p>
                      <ul className="text-red-700 text-sm space-y-1">
                        <li>{t.applyFaq.photoReject1}</li>
                        <li>{t.applyFaq.photoReject2}</li>
                        <li>{t.applyFaq.photoReject3}</li>
                        <li>{t.applyFaq.photoReject4}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 7: Special Cases */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-rose-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-rose-900 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  {t.applyFaq.specialTitle}
                </h3>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{t.applyFaq.specialQ1}</h4>
                  <p className="text-gray-600">{t.applyFaq.specialA1}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{t.applyFaq.specialQ2}</h4>
                  <p className="text-gray-600">{t.applyFaq.specialA2}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{t.applyFaq.specialQ3}</h4>
                  <ul className="text-gray-600 list-disc list-inside space-y-1">
                    <li>{t.applyFaq.businessReq1}</li>
                    <li>{t.applyFaq.businessReq2}</li>
                    <li>{t.applyFaq.businessReq3}</li>
                    <li>{t.applyFaq.businessReq4}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{t.applyFaq.specialQ4}</h4>
                  <p className="text-gray-600">{t.applyFaq.specialA4}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/1234567890?text=Hi, I need help with my visa application!"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110 z-50"
      >
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="flex items-center gap-3">
        <svg className="w-6 h-6 animate-spin text-blue-600" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="text-blue-600 text-lg">Loading...</span>
      </div>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ApplyForm />
    </Suspense>
  );
}
