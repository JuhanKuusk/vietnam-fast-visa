"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { FlightInfo } from "@/components/ui/flight-info";
import { DirectFlights } from "@/components/ui/direct-flights";
import { CitizenshipChecker } from "@/components/ui/citizenship-checker";
import { LanguageSelector } from "@/components/ui/language-selector";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Logo } from "@/components/ui/logo";
import { useLanguage } from "@/contexts/LanguageContext";

// Visa Info Modal Component
function VisaInfoModal({ isOpen, onClose, t }: { isOpen: boolean; onClose: () => void; t: ReturnType<typeof useLanguage>["t"] }) {
  if (!isOpen) return null;

  const steps = [
    { title: t.modal.step1Title, content: t.modal.step1Content },
    { title: t.modal.step2Title, content: t.modal.step2Content },
    { title: t.modal.step3Title, content: t.modal.step3Content },
    { title: t.modal.step4Title, content: t.modal.step4Content },
    { title: t.modal.step5Title, content: t.modal.step5Content },
    { title: t.modal.step6Title, content: t.modal.step6Content },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 px-6 py-4 flex justify-between items-center" style={{ backgroundColor: '#c41e3a' }}>
          <h2 className="text-xl font-bold text-white">{t.modal.title}</h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-2xl p-2"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(85vh-140px)] space-y-6">
          <p className="text-gray-600 dark:text-gray-300 text-base">
            {t.modal.intro}
          </p>

          {/* Steps */}
          {steps.map((step, index) => (
            <div key={index} className="space-y-2">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm text-white" style={{ backgroundColor: '#c41e3a' }}>{index + 1}</span>
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 pl-11">{step.content}</p>
            </div>
          ))}

          {/* Important Notice */}
          <div className="rounded-xl p-5 bg-gray-100 dark:bg-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">{t.modal.importantTitle}</h3>
            <p className="text-gray-700 dark:text-gray-300">{t.modal.importantText}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full py-4 rounded-xl text-white font-bold text-lg transition-all hover:opacity-90"
            style={{ backgroundColor: '#c41e3a' }}
          >
            {t.modal.gotItButton}
          </button>
        </div>
      </div>
    </div>
  );
}

// Visa-free countries with duration
const VISA_FREE_45_DAYS = ["DE", "FR", "IT", "ES", "GB", "RU", "JP", "KR", "DK", "SE", "NO", "FI", "BY"];
const VISA_FREE_30_DAYS = ["TH", "MY", "SG", "ID", "LA", "KH", "MM", "BN", "PH"];
const VISA_FREE_21_DAYS = ["CL"];
const VISA_FREE_14_DAYS = ["KG"];

// All countries for the selector
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
  "AL", "AT", "AZ", "BY", "BE", "BA", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "GE", "DE", "GR", "HU", "IS", "IE", "IT", "KZ", "LV", "LT", "LU", "MT", "ME", "NL", "MK", "NO", "PL", "PT", "RO", "RU", "RS", "SK", "SI", "ES", "SE", "CH", "TR", "UA", "GB",
  "AU", "BN", "CN", "IN", "ID", "JP", "KR", "MN", "MM", "NZ", "PH", "SG", "TW", "TH", "TL", "UZ",
  "AE", "QA", "SA",
  "AR", "BR", "CA", "CL", "CO", "CU", "MX", "PA", "PE", "US", "UY", "VE"
];

// Function to determine visa requirements
function getVisaRequirement(countryCode: string): {
  type: "visa_free" | "evisa" | "embassy_required";
  days?: number;
  color: string;
  bgColor: string;
} {
  if (VISA_FREE_45_DAYS.includes(countryCode)) {
    return { type: "visa_free", days: 45, color: "text-green-700", bgColor: "bg-green-50 border-green-200" };
  }
  if (VISA_FREE_30_DAYS.includes(countryCode)) {
    return { type: "visa_free", days: 30, color: "text-green-700", bgColor: "bg-green-50 border-green-200" };
  }
  if (VISA_FREE_21_DAYS.includes(countryCode)) {
    return { type: "visa_free", days: 21, color: "text-green-700", bgColor: "bg-green-50 border-green-200" };
  }
  if (VISA_FREE_14_DAYS.includes(countryCode)) {
    return { type: "visa_free", days: 14, color: "text-green-700", bgColor: "bg-green-50 border-green-200" };
  }
  if (EVISA_COUNTRIES.includes(countryCode)) {
    return { type: "evisa", color: "text-blue-700", bgColor: "bg-blue-50 border-blue-200" };
  }
  return { type: "embassy_required", color: "text-orange-700", bgColor: "bg-orange-50 border-orange-200" };
}

// Entry ports
const ENTRY_PORTS = [
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
  { code: "DLI", name: "Lien Khuong Int. Airport", type: "airport" },
];

export default function Home() {
  const { t, isLoading } = useLanguage();
  const [formData, setFormData] = useState({
    flightNumber: "",
    nationality: "",
    purpose: "tourist",
  });
  const [showVisaInfo, setShowVisaInfo] = useState(false);
  const [heroFlightNumber, setHeroFlightNumber] = useState("");
  const [nationalitySearch, setNationalitySearch] = useState("");
  const [showNationalityDropdown, setShowNationalityDropdown] = useState(false);
  const [flightArrivalData, setFlightArrivalData] = useState<{
    arrivalAirport: string;
    arrivalAirportCode: string;
    departureAirport: string;
  } | null>(null);

  // Purpose of visit options - must match validation schema values
  const purposeOptions = [
    { value: "tourist", label: t.form?.purposeTourism || "Tourism" },
    { value: "business", label: t.form?.purposeBusiness || "Business" },
    { value: "visiting", label: t.form?.purposeVisiting || "Visiting relatives" },
  ];

  // Handle flight data from FlightInfo component - memoized to prevent infinite re-renders
  const handleFlightData = useCallback((data: { arrivalAirport: string; arrivalAirportCode: string; departureAirport: string }) => {
    setFlightArrivalData(data);
  }, []);

  const visaRequirement = formData.nationality ? getVisaRequirement(formData.nationality) : null;
  const selectedCountryName = ALL_COUNTRIES.find(c => c.code === formData.nationality)?.name;
  const filteredCountries = ALL_COUNTRIES.filter(country =>
    country.name.toLowerCase().includes(nationalitySearch.toLowerCase())
  );

  const pricePerPerson = 179;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="flex items-center gap-3 px-6 py-4 bg-white rounded-xl shadow-lg">
            <svg className="w-6 h-6 animate-spin" style={{ color: '#c41e3a' }} fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-gray-700 font-medium">Translating...</span>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-40 overflow-x-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="hover:opacity-90 transition-opacity">
              <Logo size="md" taglineText={t.header.logoTagline} />
            </Link>

            {/* About, Contact, Theme Toggle & Language */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                href="/about"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white rounded-lg transition-all hover:opacity-90 hover:scale-105"
                style={{ backgroundColor: '#c41e3a' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>About Us</span>
              </Link>
              <a
                href="https://wa.me/3725035137"
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="hidden sm:inline">{t.header.support}</span>
                <span className="sm:hidden">{t.header.supportShort}</span>
              </a>
              <ThemeToggle />
              <LanguageSelector />
            </div>
          </div>
        </div>
      </header>

      {/* Denied Boarding Banner - Shows on all devices */}
      <div className="py-3 md:py-4 px-4 bg-red-700 dark:bg-red-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 w-full">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full animate-pulse flex-shrink-0"></span>
            <p className="text-white text-sm md:text-lg font-semibold">
              <EncryptedText
                text={t.banner.deniedBoarding}
                encryptedClassName="text-white/50"
                revealedClassName="text-white"
                revealDelayMs={40}
              />
            </p>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            {/* WhatsApp Support Button */}
            <a
              href="https://wa.me/3725035137?text=Hi, I need urgent help with Vietnam visa!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex px-3 md:px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors items-center gap-2 flex-shrink-0 text-xs md:text-sm"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {t.banner.askWhatsApp}
            </a>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="text-white py-12 md:py-16 bg-gray-100 dark:bg-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Urgency Badge */}
            <div className="inline-block mb-4 rounded-full px-4 py-2 text-sm font-medium" style={{ backgroundColor: '#8EE1EC' }}>
              <span className="animate-pulse inline-block mr-1">⚡</span>
              <span style={{ color: '#0E5C3D' }}>{t.hero.urgencyBadge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              <span style={{ color: '#c52e3a' }}>{t.hero.headline1}</span>
              <br />
              <span style={{ color: '#5eca52' }}>{t.hero.headline2}</span>
            </h1>

            <p className="text-xl text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              {t.hero.subtitle}
            </p>

            {/* Call to Action Slogans */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur border border-gray-200 dark:border-gray-700">
                <span className="text-lg">🏢</span>
                <span className="font-semibold text-gray-900 dark:text-white">{t.hero.processedIn}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur border border-gray-200 dark:border-gray-700">
                <span className="text-lg">🇻🇳</span>
                <span className="font-semibold text-gray-900 dark:text-white">{t.hero.localExperts}</span>
              </div>
            </div>

            {/* Timeline Cards */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="grid grid-cols-2 gap-4 items-stretch">
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur border border-gray-200 dark:border-gray-700 rounded-xl p-4 md:p-5 shadow-lg flex flex-col justify-center h-full">
                  <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center flex-shrink-0 text-gray-800" style={{ backgroundColor: '#A7E8D7' }}>
                      <span className="text-xl md:text-2xl font-bold">30</span>
                    </div>
                    <div className="text-center md:text-left">
                      <div className="font-bold text-base md:text-lg text-gray-900 dark:text-white">{t.hero.thirtyMinutes}</div>
                      <div className="text-gray-600 dark:text-gray-300 text-xs md:text-sm">{t.hero.thirtyMinutesDesc}</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur border border-gray-200 dark:border-gray-700 rounded-xl p-4 md:p-5 shadow-lg flex flex-col justify-center h-full">
                  <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center flex-shrink-0 text-white" style={{ backgroundColor: '#57D0B2' }}>
                      <span className="text-lg md:text-xl font-bold">1,5h</span>
                    </div>
                    <div className="text-center md:text-left">
                      <div className="font-bold text-base md:text-lg text-gray-900 dark:text-white">{t.hero.oneToTwoHours}</div>
                      <div className="text-gray-600 dark:text-gray-300 text-xs md:text-sm">{t.hero.oneToTwoHoursDesc}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Operating Hours Notice */}
              <div className="mt-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-lg">
                <div className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0">🕐</span>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900 dark:text-white text-sm">{t.operatingHours?.title || "30-Min & 1.5-Hour Express Service Hours"}</div>
                    <div className="text-gray-600 dark:text-gray-300 text-xs mt-1">
                      <span className="font-medium">{t.operatingHours?.weekdaysOnly || "Weekdays only:"}</span> {t.operatingHours?.vietnamTime || "8:00 AM - 5:00 PM (Vietnam Time, GMT+7)"}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                      <span className="font-medium">{t.operatingHours?.fromBali || "From Bali/Indonesia:"}</span> {t.operatingHours?.baliTime || "9:00 AM - 6:00 PM (WITA, GMT+8)"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Flight Check Box */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-2xl p-5 shadow-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">✈️</span>
                  <span className="font-bold text-gray-900 dark:text-white">{t.hero.checkFlightStatus}</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={heroFlightNumber}
                    onChange={(e) => setHeroFlightNumber(e.target.value.toUpperCase())}
                    placeholder={t.hero.enterFlightNumber}
                    className="flex-1 px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 focus:border-transparent"
                  />
                </div>
                {heroFlightNumber && heroFlightNumber.length >= 3 && (
                  <FlightInfo
                    flightNumber={heroFlightNumber}
                  />
                )}
              </div>
            </div>

            {/* Price - Only show after nationality is selected */}
            {formData.nationality && (
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-3">
                  <span className="text-5xl font-bold" style={{ color: '#c41e3a' }}>${pricePerPerson}</span>
                  <span className="text-gray-700 dark:text-gray-300 text-xl">{t.hero.perPerson}</span>
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                  {t.heroPrice?.fullVisaDesc || "1.5-Hour Full Visa | Check-in approval letter in 30 min"}
                </div>
              </div>
            )}

            {/* CTA Buttons Container - Side by side with equal heights */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-[38px]">
              {/* WhatsApp CTA Button */}
              <a
                href="https://wa.me/3725035137?text=Hi, I need help with Vietnam visa!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 h-14"
                style={{ backgroundColor: '#25D366' }}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {t.hero.chatWithUs}
              </a>

              {/* Info Button */}
              <button
                onClick={() => setShowVisaInfo(true)}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/90 dark:bg-gray-800/90 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 transition-all text-lg font-bold shadow-xl h-14"
              >
                <span>📋</span>
                {t.hero.learnAboutVisa}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold" style={{ color: '#c41e3a' }}>10,000+</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{t.trust.happyCustomers}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">99%</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{t.trust.onTimeDelivery}</div>
            </div>
            <div>
              <div className="text-3xl font-bold" style={{ color: '#c41e3a' }}>80+</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{t.trust.countriesSupported}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">24/7</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{t.trust.whatsappSupport}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Citizenship Checker Section */}
      <section className="bg-gray-50 dark:bg-slate-800 py-8 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <CitizenshipChecker />
        </div>
      </section>

      {/* Direct Flights Section */}
      <DirectFlights />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Application Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Form Header */}
              <div className="px-4 sm:px-6 py-4 sm:py-5" style={{ backgroundColor: '#c41e3a' }}>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  {t.form.title}
                </h2>
                <p className="text-white/90 text-sm sm:text-base mt-1">{t.form.subtitle}</p>
                <a
                  href="#faq"
                  className="inline-flex items-center gap-1 text-white/80 hover:text-white text-xs sm:text-sm mt-2 transition-colors"
                >
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  {t.form.faqLink}
                </a>
              </div>

              {/* Form Body */}
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                {/* Flight Number - First Box */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">✈️</span>
                    <span className="font-bold text-gray-900 dark:text-white">{t.form?.yourFlightNumber || "Your Flight Number"}</span>
                  </div>
                  <input
                    type="text"
                    value={formData.flightNumber}
                    onChange={(e) => {
                      setFormData({ ...formData, flightNumber: e.target.value.toUpperCase() });
                      // Reset flight data when changing flight number
                      if (e.target.value.length < 3) {
                        setFlightArrivalData(null);
                      }
                    }}
                    placeholder={t.form.flightPlaceholder}
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500"
                  />
                  {/* Flight Info - Shows check-in time and gate when flight number is entered */}
                  {formData.flightNumber && formData.flightNumber.length >= 3 && (
                    <FlightInfo
                      flightNumber={formData.flightNumber}
                      onFlightData={handleFlightData}
                    />
                  )}
                </div>

                {/* Check Your Visa Requirements - Second Box */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl">🛂</span>
                    <span className="font-bold text-gray-900 dark:text-white">{t.form?.checkVisaRequirements || "Check Your Visa Requirements"}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Nationality / Citizenship */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t.form?.nationality || "Your Nationality"} <span style={{ color: '#c41e3a' }}>*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.nationality ? selectedCountryName : nationalitySearch}
                          onChange={(e) => {
                            setNationalitySearch(e.target.value);
                            setFormData({ ...formData, nationality: "" });
                            setShowNationalityDropdown(true);
                          }}
                          onFocus={() => setShowNationalityDropdown(true)}
                          placeholder={t.form?.selectNationality || "Search your country..."}
                          className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 transition-all"
                        />
                        {formData.nationality && (
                          <button
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, nationality: "" });
                              setNationalitySearch("");
                            }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                          >
                            ✕
                          </button>
                        )}
                        {showNationalityDropdown && !formData.nationality && (
                          <div className="absolute z-20 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            {filteredCountries.slice(0, 10).map((country) => (
                              <button
                                key={country.code}
                                type="button"
                                onClick={() => {
                                  setFormData({ ...formData, nationality: country.code });
                                  setNationalitySearch("");
                                  setShowNationalityDropdown(false);
                                }}
                                className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                              >
                                {country.name}
                              </button>
                            ))}
                            {filteredCountries.length === 0 && (
                              <div className="px-4 py-3 text-gray-500 dark:text-gray-400">{t.form?.noCountryFound || "No country found"}</div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Purpose of Visit */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t.form?.purposeOfVisit || "Purpose of Visit"} <span style={{ color: '#c41e3a' }}>*</span>
                      </label>
                      <select
                        value={formData.purpose}
                        onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 transition-all appearance-none cursor-pointer"
                      >
                        {purposeOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Visa Requirement Info Banner */}
                  {visaRequirement && (
                    <div className={`mt-4 rounded-xl p-4 border ${visaRequirement.bgColor}`}>
                      {visaRequirement.type === "visa_free" && (
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <div className={`font-bold ${visaRequirement.color}`}>
                              {t.form?.visaFree || "Visa-Free Entry"} - {visaRequirement.days} {t.form?.days || "days"}
                            </div>
                            <div className="text-gray-600 text-sm mt-1">
                              {t.form?.visaFreeDesc || `Citizens of ${selectedCountryName} can enter Vietnam without a visa for up to ${visaRequirement.days} days.`}
                            </div>
                            <div className="text-gray-600 text-sm mt-2">
                              <span className="font-medium">{t.form?.stayingLonger || "Staying longer?"}</span> {t.form?.needVisaForLonger || "You'll need a visa for stays exceeding the visa-free period."}
                            </div>
                          </div>
                        </div>
                      )}
                      {visaRequirement.type === "evisa" && (
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1.581.814l-4.419-3.35-4.419 3.35A1 1 0 014 16V4zm2 0v10.586l3.419-2.59a1 1 0 011.162 0L14 14.586V4H6z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <div className={`font-bold ${visaRequirement.color}`}>
                              {t.form?.evisaRequired || "E-Visa Required"}
                            </div>
                            <div className="text-gray-600 text-sm mt-1">
                              {t.form?.evisaDesc || `Citizens of ${selectedCountryName} need an e-visa or visa on arrival to enter Vietnam. We can help you get it fast!`}
                            </div>
                            <div className="mt-2 inline-flex items-center gap-2 text-sm font-medium" style={{ color: '#c41e3a' }}>
                              <span>✓</span> {t.form?.weCanHelp || "We process your e-visa in 30 minutes"}
                            </div>
                          </div>
                        </div>
                      )}
                      {visaRequirement.type === "embassy_required" && (
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <div className={`font-bold ${visaRequirement.color}`}>
                              {t.form?.embassyRequired || "Embassy Visa Required"}
                            </div>
                            <div className="text-gray-600 text-sm mt-1">
                              {t.form?.embassyDesc || `Citizens of ${selectedCountryName} must apply for a visa at a Vietnamese embassy before travel.`}
                            </div>
                            <div className="mt-2 text-sm text-gray-600">
                              {t.form?.contactUsHelp || "Contact us for assistance with your visa application."}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <a
                  href={`/apply?applicants=1&purpose=${formData.purpose}&flight=${formData.flightNumber}&nationality=${formData.nationality}${flightArrivalData?.arrivalAirportCode ? `&entryPort=${flightArrivalData.arrivalAirportCode}` : ''}`}
                  className="block w-full py-4 rounded-xl text-white font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl text-center hover:opacity-90"
                  style={{ backgroundColor: '#c41e3a' }}
                >
                  {t.form.continueButton}
                </a>

                {/* Trust indicators */}
                <div className="flex items-center justify-center gap-4 text-sm text-gray-500 pt-2 flex-wrap">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" style={{ color: '#c41e3a' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    {t.form.securePayment}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" style={{ color: '#c41e3a' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {t.form.moneyBackGuarantee}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Why Choose Us */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">{t.sidebar.whyChooseUs}</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-100 dark:bg-gray-700">
                    <svg className="w-4 h-4" style={{ color: '#c41e3a' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{t.sidebar.fastestProcessing}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{t.sidebar.fastestProcessingDesc}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-100 dark:bg-gray-700">
                    <svg className="w-4 h-4" style={{ color: '#c41e3a' }} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{t.sidebar.whatsappSupport}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{t.sidebar.whatsappSupportDesc}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-100 dark:bg-gray-700">
                    <svg className="w-4 h-4" style={{ color: '#c41e3a' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{t.sidebar.moneyBack}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{t.sidebar.moneyBackDesc}</div>
                  </div>
                </div>
              </div>

              {/* Local Experts Badge */}
              <div className="mt-5 pt-5 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
                  <span className="text-2xl">🇻🇳</span>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white text-sm">{t.sidebar.localExperts}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{t.sidebar.localExpertsDesc}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Comparison */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">{t.sidebar.priceComparison}</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-lg border-2 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white block">{t.sidebar.ourPrice}</span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">{t.heroPrice?.expressLabel || "1.5-Hour Express"}</span>
                  </div>
                  <span className="font-bold text-xl text-gray-900 dark:text-white">$179</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="text-gray-500 dark:text-gray-400">{t.sidebar.competitorA}</span>
                  <span className="text-gray-400 dark:text-gray-500 line-through">$200</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="text-gray-500 dark:text-gray-400">{t.sidebar.competitorB}</span>
                  <span className="text-gray-400 dark:text-gray-500 line-through">$235</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex-shrink-0">🕐</span>
                  <span>{t.operatingHours?.expressServiceNote || "Express service: Weekdays 8AM-5PM Vietnam Time (9AM-6PM Bali)"}</span>
                </div>
              </div>
            </div>

            {/* VOA Info */}
            <div className="rounded-2xl p-6 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3">
                {t.sidebar.voaTitle}
              </h3>
              <p className="text-gray-800 dark:text-gray-300 text-sm mb-3">
                {t.sidebar.voaText}
              </p>
              <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
                <li>• {t.sidebar.voaPoint1}</li>
                <li>• {t.sidebar.voaPoint2}</li>
                <li>• {t.sidebar.voaPoint3}</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Non-Urgent Visa Options Section */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t.nonUrgent?.planningAhead || "Planning Ahead?"}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              {t.nonUrgent?.title || "Need Vietnam Visa? For Non-Urgent Travelers"}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t.nonUrgent?.subtitle || "Choose the processing time that fits your schedule. Single-entry visa valid for 1-3 months."}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {t.nonUrgent?.timezoneNote || "Processing times do not include weekends. All times are Vietnam local time."}
            </p>
          </div>

          {/* Visa Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 4-Hour Express Service */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-blue-200 dark:border-blue-800 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                {t.nonUrgent?.fastest || "FASTEST"}
              </div>
              <div className="text-center mb-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-3">
                  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t.nonUrgent?.fourHourTitle || "4-Hour Express"}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-semibold">{t.nonUrgent?.fourHourSubtitle || "Same Day Delivery"}</p>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t.nonUrgent?.fourHourFeature1 || "Visa ready in 4 hours"}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t.nonUrgent?.fourHourFeature2 || "Perfect for urgent travel"}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t.nonUrgent?.fourHourFeature3 || "Email & WhatsApp delivery"}
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-3 mb-4">
                <div className="text-xs text-gray-700 dark:text-gray-300">
                  <span className="font-semibold block mb-1">{t.nonUrgent?.fourHourCutoff || "Cut-off Times:"}</span>
                  <div className="space-y-1">
                    <div>{t.nonUrgent?.fourHourCutoff1 || "Book by 8:00 AM → Ready by 1:00 PM"}</div>
                    <div>{t.nonUrgent?.fourHourCutoff2 || "Book by 2:00 PM → Ready by 6:00 PM"}</div>
                  </div>
                </div>
              </div>
              <div className="text-center mb-4">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">$135</span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">{t.nonUrgent?.perPerson || "/person"}</span>
              </div>
              <a
                href="/apply?speed=4-hour"
                className="block w-full py-3 rounded-xl text-white font-bold text-center transition-all hover:opacity-90"
                style={{ backgroundColor: '#c41e3a' }}
              >
                {t.nonUrgent?.fourHourButton || "Get 4-Hour Visa"}
              </a>
            </div>

            {/* 1-Day Service */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-3">
                  <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t.nonUrgent?.oneDayTitle || "1-Day Service"}</h3>
                <p className="text-green-600 dark:text-green-400 font-semibold">{t.nonUrgent?.oneDaySubtitle || "Next Business Day"}</p>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t.nonUrgent?.oneDayFeature1 || "Visa ready in 1 day"}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t.nonUrgent?.oneDayFeature2 || "Great for last-minute trips"}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t.nonUrgent?.oneDayFeature3 || "Email & WhatsApp delivery"}
                </div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 mb-4">
                <div className="text-xs text-green-800 dark:text-green-300">
                  <span className="font-semibold block mb-1">{t.nonUrgent?.fourHourCutoff || "Cut-off Times:"}</span>
                  <div className="space-y-1">
                    <div>{t.nonUrgent?.oneDayCutoff1 || "Book by 10:00 AM → Ready by 6:00 PM same day"}</div>
                    <div>{t.nonUrgent?.oneDayCutoff2 || "Book by 4:00 PM → Ready by 1:00 PM next day"}</div>
                  </div>
                </div>
              </div>
              <div className="text-center mb-4">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">$111</span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">{t.nonUrgent?.perPerson || "/person"}</span>
              </div>
              <a
                href="/apply?speed=1-day"
                className="block w-full py-3 rounded-xl text-white font-bold text-center transition-all hover:opacity-90 bg-green-600 hover:bg-green-700"
              >
                {t.nonUrgent?.oneDayButton || "Get 1-Day Visa"}
              </a>
            </div>

            {/* 2-Day Service */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 relative">
              <div className="absolute top-0 right-0 bg-gray-700 dark:bg-gray-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                {t.nonUrgent?.bestValue || "BEST VALUE"}
              </div>
              <div className="text-center mb-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-3">
                  <svg className="w-8 h-8 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t.nonUrgent?.twoDayTitle || "2-Day Service"}</h3>
                <p className="text-gray-600 dark:text-gray-300 font-semibold">{t.nonUrgent?.twoDaySubtitle || "Standard Processing"}</p>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t.nonUrgent?.twoDayFeature1 || "Visa ready in 2 business days"}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t.nonUrgent?.twoDayFeature2 || "Perfect for planned trips"}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t.nonUrgent?.twoDayFeature3 || "Email delivery"}
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg p-3 mb-4">
                <div className="text-xs text-gray-700 dark:text-gray-300">
                  <span className="font-semibold block mb-1">{t.nonUrgent?.twoDayCutoff || "Cut-off Time:"}</span>
                  <div>{t.nonUrgent?.twoDayCutoff1 || "Book by 4:00 PM → Ready by 6:00 PM next working day"}</div>
                </div>
              </div>
              <div className="text-center mb-4">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">$99</span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">{t.nonUrgent?.perPerson || "/person"}</span>
              </div>
              <a
                href="/apply?speed=2-day"
                className="block w-full py-3 rounded-xl text-white font-bold text-center transition-all hover:opacity-90 bg-gray-700 hover:bg-gray-800"
              >
                {t.nonUrgent?.twoDayButton || "Get 2-Day Visa"}
              </a>
            </div>
          </div>

          {/* Add-on Options */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Duration Upgrade */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{t.nonUrgent?.extendedDuration || "Extended Duration"}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{t.nonUrgent?.extendedDurationDesc || "Upgrade to 1-3 months validity"}</p>
                  <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium">
                    +$50
                  </div>
                </div>
              </div>
            </div>

            {/* Multi-Entry Option */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{t.nonUrgent?.multiEntry || "Multi-Entry Visa"}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{t.nonUrgent?.multiEntryDesc || "Enter Vietnam multiple times"}</p>
                  <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium">
                    +$30
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Weekend/Holiday Urgent Visa */}
          <div className="mt-6 rounded-xl p-6 text-white" style={{ backgroundColor: '#c41e3a' }}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🚨</span>
                  <h4 className="font-bold text-xl">{t.nonUrgent?.weekendTitle || "Weekend & Holiday Urgent Visa"}</h4>
                </div>
                <p className="text-white/90 text-sm">{t.nonUrgent?.weekendSubtitle || "Need a visa on Saturday, Sunday, or a public holiday?"}</p>
                <div className="mt-3 space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{t.nonUrgent?.weekendCutoff1 || "Apply by 9:00 AM → Visa ready by 1:00 PM"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{t.nonUrgent?.weekendCutoff2 || "Apply by 2:00 PM → Visa ready by 6:00 PM"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80 text-xs">
                    <span className="ml-6">{t.nonUrgent?.weekendTimezone || "All times Vietnam Time (GMT+7)"}</span>
                  </div>
                </div>
              </div>
              <div className="text-center md:text-right">
                <div className="text-4xl font-bold">$249</div>
                <div className="text-white/80 text-sm">{t.nonUrgent?.perPerson || "/person"}</div>
                <a
                  href="/apply?speed=weekend"
                  className="mt-3 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white font-bold transition-all hover:bg-gray-100"
                  style={{ color: '#c41e3a' }}
                >
                  {t.nonUrgent?.weekendButton || "Get Weekend Visa"}
                </a>
              </div>
            </div>
          </div>

          {/* Info Note */}
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{t.nonUrgent?.allPackagesInclude || "All visa packages include:"}</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {t.nonUrgent?.singleEntry30Days || "Single-entry visa (30 days standard)"}
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {t.nonUrgent?.support247 || "24/7 customer support"}
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {t.nonUrgent?.moneyBackGuarantee || "Money-back guarantee if rejected"}
                  </li>
                </ul>
              </div>
              <div className="text-center md:text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{t.nonUrgent?.need30MinVisa || "Need urgent visa in 30 minutes?"}</p>
                <a
                  href="/apply"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition-all hover:opacity-90"
                  style={{ backgroundColor: '#c41e3a' }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {t.nonUrgent?.get30MinEmergency || "Get 30-Min Emergency Visa"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-10 sm:py-16 bg-gray-100 dark:bg-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
              {t.faq.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
              {t.faq.subtitle}
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {/* FAQ Items */}
            {[
              { q: t.faq.q1, a: t.faq.a1 },
              { q: t.faq.q2, a: t.faq.a2 },
              { q: t.faq.q3, a: t.faq.a3 },
              { q: t.faq.q4, a: t.faq.a4 },
              { q: t.faq.q5, a: t.faq.a5 },
              { q: t.faq.q6, a: t.faq.a6 },
              { q: t.faq.q7, a: t.faq.a7 },
            ].map((faq, index) => (
              <details key={index} className="bg-white dark:bg-gray-700 rounded-xl shadow-sm border border-gray-200 dark:border-gray-600 group">
                <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none">
                  <span className="font-medium text-gray-900 dark:text-white text-sm sm:text-base pr-4">
                    {faq.q}
                  </span>
                  <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>

          {/* CTA after FAQ */}
          <div className="text-center mt-8 sm:mt-10">
            <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm sm:text-base">{t.faq.stillHaveQuestions}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/3725035137?text=Hi, I have a question about Vietnam visa!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-white font-medium rounded-xl transition-colors text-sm sm:text-base hover:opacity-90"
                style={{ backgroundColor: '#25D366' }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {t.faq.chatWithUsNow}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Logo size="lg" showTagline={false} />
            </div>
            <p className="text-gray-500 mb-2">{t.footer.expressService}</p>
            <p className="text-sm text-gray-400 mb-6">{t.footer.processedBy}</p>
            <div className="flex justify-center gap-6 mb-6 text-sm">
              <Link href="/privacy" className="hover:text-white transition-colors">{t.footer.privacyPolicy}</Link>
              <Link href="/terms" className="hover:text-white transition-colors">{t.footer.termsOfService}</Link>
              <Link href="/refund" className="hover:text-white transition-colors">{t.footer.refundPolicy}</Link>
            </div>
            <p className="text-sm">{t.footer.copyright}</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/3725035137?text=Hi, I need an urgent Vietnam visa!"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110 z-50"
      >
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* Visa Info Modal */}
      <VisaInfoModal isOpen={showVisaInfo} onClose={() => setShowVisaInfo(false)} t={t} />
    </div>
  );
}
