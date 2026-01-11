"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

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
function getVisaRequirement(countryCode: string): {
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
      message: "You can enter Vietnam visa-free for up to 45 days!",
      color: "text-green-700",
      bgColor: "bg-green-50 border-green-200",
    };
  }
  if (VISA_FREE_30_DAYS.includes(countryCode)) {
    return {
      type: "visa_free",
      days: 30,
      message: "You can enter Vietnam visa-free for up to 30 days!",
      color: "text-green-700",
      bgColor: "bg-green-50 border-green-200",
    };
  }
  if (VISA_FREE_21_DAYS.includes(countryCode)) {
    return {
      type: "visa_free",
      days: 21,
      message: "You can enter Vietnam visa-free for up to 21 days!",
      color: "text-green-700",
      bgColor: "bg-green-50 border-green-200",
    };
  }
  if (VISA_FREE_14_DAYS.includes(countryCode)) {
    return {
      type: "visa_free",
      days: 14,
      message: "You can enter Vietnam visa-free for up to 14 days!",
      color: "text-green-700",
      bgColor: "bg-green-50 border-green-200",
    };
  }

  // Check E-Visa eligible countries
  if (EVISA_COUNTRIES.find((c) => c.code === countryCode)) {
    return {
      type: "evisa",
      message: "You are eligible for Vietnam E-Visa! We can process your visa in just 1 hour.",
      color: "text-blue-700",
      bgColor: "bg-blue-50 border-blue-200",
    };
  }

  // Embassy visa required
  return {
    type: "embassy_required",
    message: "You need to apply for a visa at the Vietnam Embassy or Consulate in your country.",
    color: "text-orange-700",
    bgColor: "bg-orange-50 border-orange-200",
  };
}

// Citizenship Checker Component
function CitizenshipChecker({
  onCountrySelect,
}: {
  onCountrySelect?: (code: string, requirement: ReturnType<typeof getVisaRequirement>) => void;
}) {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [visaResult, setVisaResult] = useState<ReturnType<typeof getVisaRequirement> | null>(null);

  const handleCountryChange = (code: string) => {
    setSelectedCountry(code);
    if (code) {
      const requirement = getVisaRequirement(code);
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
        <h2 className="text-xl font-bold text-gray-900">Check Your Visa Requirements</h2>
        <p className="text-gray-600 text-sm mt-1">Select your citizenship to see what visa you need for Vietnam</p>
      </div>

      <div className="max-w-md mx-auto">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Citizenship / Nationality
        </label>
        <CountrySelector
          value={selectedCountry}
          onChange={handleCountryChange}
          countries={ALL_COUNTRIES}
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
                {selectedCountryName} Citizens
              </h3>
              <p className={`mt-1 ${visaResult.color}`}>{visaResult.message}</p>

              {visaResult.type === "visa_free" && (
                <p className="mt-2 text-sm text-gray-600">
                  For stays longer than {visaResult.days} days, you will need to apply for an E-Visa or visit a Vietnamese Embassy.
                </p>
              )}

              {visaResult.type === "evisa" && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">
                    E-Visa is valid for 90 days with single or multiple entry options.
                  </p>
                  <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Apply below - Get your visa in 1 hour!
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
}

// Searchable Country Selector Component
function CountrySelector({
  value,
  onChange,
  countries,
}: {
  value: string;
  onChange: (code: string) => void;
  countries: { code: string; name: string }[];
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
        placeholder="Type to search or select..."
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
              No countries found
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
}: {
  label: string;
  description: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
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
              {label} uploaded
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
          <p className="text-gray-700 font-medium">Click to upload</p>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </label>
      </div>
    </div>
  );
}

function ApplyForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const applicantCount = Number(searchParams.get("applicants")) || 1;
  const purpose = searchParams.get("purpose") || "tourist";
  const port = searchParams.get("port") || "";
  const entryDate = searchParams.get("entry") || "";
  const exitDate = searchParams.get("exit") || "";

  const pricePerPerson = 149;
  const totalPrice = pricePerPerson * applicantCount;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [currentApplicant, setCurrentApplicant] = useState(0);
  const [applicants, setApplicants] = useState<ApplicantData[]>(
    Array(applicantCount).fill(null).map(() => ({
      fullName: "",
      nationality: "",
      passportNumber: "",
      dateOfBirth: "",
      passportExpiry: "",
      gender: "",
    }))
  );

  const [contactInfo, setContactInfo] = useState({
    email: "",
    phone: "",
    confirmEmail: "",
  });

  const [passportPhotos, setPassportPhotos] = useState<(File | null)[]>(
    Array(applicantCount).fill(null)
  );
  const [portraitPhotos, setPortraitPhotos] = useState<(File | null)[]>(
    Array(applicantCount).fill(null)
  );

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
      for (let i = 0; i < applicants.length; i++) {
        const applicant = applicants[i];
        if (!applicant.fullName || !applicant.nationality || !applicant.passportNumber ||
            !applicant.dateOfBirth || !applicant.gender) {
          setSubmitError(`Please complete all required fields for applicant ${i + 1}`);
          setCurrentApplicant(i);
          setIsSubmitting(false);
          return;
        }
      }

      if (!contactInfo.email || !contactInfo.phone) {
        setSubmitError("Please provide email and WhatsApp number");
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
          applicants: applicantCount,
          purpose: purpose as "tourist" | "business" | "visiting",
          arrivalPort: port,
          entryDate: entryDate,
          exitDate: exitDate,
        },
        applicants: applicants.map((applicant) => ({
          fullName: applicant.fullName,
          nationality: applicant.nationality,
          passportNumber: applicant.passportNumber,
          dateOfBirth: applicant.dateOfBirth,
          gender: applicant.gender as "male" | "female",
          email: contactInfo.email,
          whatsapp: contactInfo.phone,
        })),
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

      router.push(`/payment?applicants=${applicantCount}&ref=${result.referenceNumber}`);
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitError(error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Official Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-yellow-400 text-xl font-bold">V</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">vietnamvisa1hour.com</h1>
              <p className="text-xs text-gray-500">1 Hour Processing Service</p>
            </div>
          </a>
          <a
            href="https://wa.me/1234567890"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-600 transition-colors"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="hidden sm:inline">24/7 Support</span>
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* VOA Information Banner */}
        <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-5 mb-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
              <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-amber-800 mb-2">What "Visa on Arrival" (VOA) Actually Means</h3>
              <p className="text-amber-700 font-medium mb-3">
                Vietnam does NOT issue visas at the airport without advance approval.
              </p>
              <div className="text-amber-900 space-y-2 text-sm">
                <p><strong>"Visa on Arrival" means:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>You must apply <strong>in advance</strong> for an immigration approval letter</li>
                  <li>The visa stamp is issued at the airport <strong>only after landing</strong></li>
                  <li>Airlines require this approval letter <strong>before boarding</strong></li>
                </ul>
                <p className="mt-3 p-2 bg-amber-100 rounded-lg border border-amber-300">
                  <strong>Without the approval letter, you cannot fly to Vietnam.</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Citizenship Checker - Shows visa requirements based on country */}
        <CitizenshipChecker />

        {/* Processing Time Box */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Our Processing Speed</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-green-50 border border-green-200">
              <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl font-bold">40</span>
              </div>
              <div>
                <div className="text-green-700 font-bold text-lg">40 Minutes</div>
                <div className="text-green-600 text-sm">Approval letter for airline check-in</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-50 border border-blue-200">
              <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-lg font-bold">1-2h</span>
              </div>
              <div>
                <div className="text-blue-700 font-bold text-lg">1-2 Hours</div>
                <div className="text-blue-600 text-sm">Full visa issued before you land</div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-900 hidden sm:inline">Trip Details</span>
            </div>
            <div className="w-8 sm:w-16 h-0.5 bg-blue-600"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                2
              </div>
              <span className="text-sm font-medium text-gray-900 hidden sm:inline">Your Information</span>
            </div>
            <div className="w-8 sm:w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm font-medium">
                3
              </div>
              <span className="text-sm font-medium text-gray-500 hidden sm:inline">Payment</span>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Form Header */}
          <div className="bg-blue-600 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">
              Applicant Information
            </h2>
            {applicantCount > 1 && (
              <p className="text-blue-100 text-sm mt-1">
                Applicant {currentApplicant + 1} of {applicantCount}
              </p>
            )}
          </div>

          {/* Applicant Tabs */}
          {applicantCount > 1 && (
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
                  Person {index + 1}
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
                  Full Name (as on passport) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={currentData.fullName}
                  onChange={(e) => updateApplicant("fullName", e.target.value.toUpperCase())}
                  placeholder="JOHN DOE"
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 text-base placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 uppercase transition-all"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter exactly as shown on passport
                </p>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-3">
                  {["Male", "Female"].map((gender) => (
                    <label
                      key={gender}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 cursor-pointer transition-all text-base ${
                        currentData.gender === gender.toLowerCase()
                          ? "bg-blue-50 border-blue-500 text-blue-700"
                          : "bg-white border-gray-300 text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`gender-${currentApplicant}`}
                        value={gender.toLowerCase()}
                        checked={currentData.gender === gender.toLowerCase()}
                        onChange={(e) => updateApplicant("gender", e.target.value)}
                        className="sr-only"
                      />
                      {gender}
                    </label>
                  ))}
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={currentData.dateOfBirth}
                  onChange={(e) => updateApplicant("dateOfBirth", e.target.value)}
                  max={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 text-base focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              {/* Nationality */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nationality <span className="text-red-500">*</span>
                </label>
                <CountrySelector
                  value={currentData.nationality}
                  onChange={(code) => updateApplicant("nationality", code)}
                  countries={EVISA_COUNTRIES}
                />
              </div>

              {/* Passport Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Passport Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={currentData.passportNumber}
                  onChange={(e) => updateApplicant("passportNumber", e.target.value.toUpperCase())}
                  placeholder="AB1234567"
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 text-base placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 uppercase transition-all"
                />
              </div>

              {/* Passport Expiry */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Passport Expiry Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={currentData.passportExpiry}
                  onChange={(e) => updateApplicant("passportExpiry", e.target.value)}
                  min={minPassportExpiry.toISOString().split("T")[0]}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 text-base focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Must be valid for at least 6 months
                </p>
              </div>

              {/* Document Uploads Section */}
              <div className="lg:col-span-2 border-t border-gray-200 pt-6 mt-2">
                <h3 className="font-semibold text-gray-900 mb-4">Document Uploads</h3>
              </div>

              {/* Passport Photo */}
              <div>
                <PhotoUploadSection
                  label="Passport Data Page"
                  description="Clear photo showing all details"
                  file={passportPhotos[currentApplicant]}
                  onFileChange={(file) => {
                    const files = [...passportPhotos];
                    files[currentApplicant] = file;
                    setPassportPhotos(files);
                  }}
                />
              </div>

              {/* Portrait Photo */}
              <div>
                <PhotoUploadSection
                  label="Portrait Photo"
                  description="White background, no glasses"
                  file={portraitPhotos[currentApplicant]}
                  onFileChange={(file) => {
                    const files = [...portraitPhotos];
                    files[currentApplicant] = file;
                    setPortraitPhotos(files);
                  }}
                />
              </div>

              {/* Contact Information */}
              {currentApplicant === 0 && (
                <>
                  <div className="lg:col-span-2 border-t border-gray-200 pt-6 mt-2">
                    <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 text-base placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Visa will be sent to this email
                    </p>
                  </div>

                  {/* Confirm Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={contactInfo.confirmEmail}
                      onChange={(e) => setContactInfo({ ...contactInfo, confirmEmail: e.target.value })}
                      placeholder="your@email.com"
                      className={`w-full px-4 py-3 rounded-lg bg-white border text-gray-900 text-base placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                        contactInfo.confirmEmail && contactInfo.email !== contactInfo.confirmEmail
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
                      }`}
                    />
                    {contactInfo.confirmEmail && contactInfo.email !== contactInfo.confirmEmail && (
                      <p className="text-xs text-red-500 mt-1">Emails do not match</p>
                    )}
                  </div>

                  {/* WhatsApp */}
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      WhatsApp Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                      placeholder="+1 234 567 8900"
                      className="w-full lg:w-1/2 px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 text-base placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Include country code for instant updates
                    </p>
                  </div>
                </>
              )}

              {/* Navigation Buttons */}
              <div className="lg:col-span-2 flex gap-4 pt-6">
                {applicantCount > 1 && currentApplicant > 0 && (
                  <button
                    onClick={() => setCurrentApplicant(currentApplicant - 1)}
                    className="flex-1 lg:flex-none lg:px-8 py-3 rounded-lg border border-gray-300 text-gray-700 text-base font-medium hover:bg-gray-50 transition-colors"
                  >
                    Previous
                  </button>
                )}

                {applicantCount > 1 && currentApplicant < applicantCount - 1 ? (
                  <button
                    onClick={() => setCurrentApplicant(currentApplicant + 1)}
                    className="flex-1 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-base transition-colors"
                  >
                    Next Applicant
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1 py-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      "Continue to Payment"
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
                    Total ({applicantCount} {applicantCount === 1 ? "person" : "people"})
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
            <span>Secure & Encrypted</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span>Fast Processing</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>Official E-Visa</span>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 mb-12">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="text-gray-600 mt-2">Everything you need to know about Vietnam visas</p>
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
                  Types of Vietnam Visas
                </h3>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">What types of visas are available for Vietnam?</h4>
                  <div className="text-gray-600 space-y-2">
                    <p><strong>E-Visa (Electronic Visa):</strong> Single entry, valid for 90 days. Can be applied online. Available for citizens of 80 countries.</p>
                    <p><strong>Visa on Arrival (VOA):</strong> Available at international airports only. Requires pre-approved visa letter.</p>
                    <p><strong>Embassy Visa:</strong> Traditional visa obtained from Vietnamese embassy or consulate in your country.</p>
                    <p><strong>Transit Visa:</strong> For travelers transiting through Vietnam (up to 5 days).</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">What is the E-Visa validity and duration of stay?</h4>
                  <div className="text-gray-600">
                    <ul className="list-disc list-inside space-y-1">
                      <li><strong>Single Entry E-Visa:</strong> Valid for 90 days, maximum stay of 90 days</li>
                      <li><strong>Multiple Entry E-Visa:</strong> Valid for 90 days, multiple entries allowed, 90 days stay per entry</li>
                      <li>E-Visa can be extended once while in Vietnam</li>
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
                  Visa-Free Entry
                </h3>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Which countries have visa-free access to Vietnam?</h4>
                  <div className="text-gray-600 space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="font-medium text-gray-900 mb-2">45 Days Visa-Free (13 Countries):</p>
                      <p>Germany, France, Italy, Spain, United Kingdom, Russia, Japan, South Korea, Denmark, Sweden, Norway, Finland, Belarus</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="font-medium text-gray-900 mb-2">30 Days Visa-Free:</p>
                      <p>Thailand, Malaysia, Singapore, Indonesia, Laos, Cambodia, Myanmar, Brunei, Philippines</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="font-medium text-gray-900 mb-2">21 Days Visa-Free:</p>
                      <p>Chile</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="font-medium text-gray-900 mb-2">14 Days Visa-Free:</p>
                      <p>Kyrgyzstan</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Important notes about visa-free entry:</h4>
                  <ul className="text-gray-600 list-disc list-inside space-y-1">
                    <li>Passport must be valid for at least 6 months from entry date</li>
                    <li>Must have proof of onward travel (flight ticket)</li>
                    <li>30-day gap required between visa-free entries</li>
                    <li>Cannot be extended - must exit and re-enter or apply for visa</li>
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
                  E-Visa Eligible Countries (80 Countries)
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-medium text-gray-900 mb-2">Europe:</p>
                    <p className="text-sm text-gray-600">Albania, Austria, Azerbaijan, Belarus, Belgium, Bosnia, Bulgaria, Croatia, Cyprus, Czech Republic, Denmark, Estonia, Finland, France, Georgia, Germany, Greece, Hungary, Iceland, Ireland, Italy, Kazakhstan, Latvia, Lithuania, Luxembourg, Malta, Montenegro, Netherlands, North Macedonia, Norway, Poland, Portugal, Romania, Russia, Serbia, Slovakia, Slovenia, Spain, Sweden, Switzerland, Turkey, Ukraine, United Kingdom</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-medium text-gray-900 mb-2">Asia & Oceania:</p>
                    <p className="text-sm text-gray-600">Australia, Brunei, China, India, Indonesia, Japan, South Korea, Mongolia, Myanmar, New Zealand, Philippines, Singapore, Taiwan, Thailand, Timor-Leste, Uzbekistan</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-medium text-gray-900 mb-2">Americas & Middle East:</p>
                    <p className="text-sm text-gray-600">Argentina, Brazil, Canada, Chile, Colombia, Cuba, Mexico, Panama, Peru, United States, Uruguay, Venezuela, UAE, Qatar, Saudi Arabia</p>
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
                  Visa on Arrival (VOA)
                </h3>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">What is Visa on Arrival?</h4>
                  <p className="text-gray-600">Visa on Arrival allows you to get your visa stamp at Vietnamese international airports. You need a pre-approved visa letter before traveling.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Requirements for VOA:</h4>
                  <ul className="text-gray-600 list-disc list-inside space-y-1">
                    <li>Pre-approved visa letter (we can arrange this)</li>
                    <li>Passport valid for 6+ months</li>
                    <li>2 passport-sized photos (4x6cm)</li>
                    <li>Completed visa application form (NA1)</li>
                    <li>Stamping fee: $25 USD (single entry) or $50 USD (multiple entry) - paid at airport</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Airports accepting VOA:</h4>
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
                  Arrival Procedures
                </h3>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Step-by-step arrival process with E-Visa:</h4>
                  <ol className="text-gray-600 list-decimal list-inside space-y-2">
                    <li><strong>Print your E-Visa:</strong> Print at least 2 copies of your approved E-Visa</li>
                    <li><strong>Arrival card:</strong> Complete the arrival/departure card on the plane or at the airport</li>
                    <li><strong>Immigration queue:</strong> Join the queue for foreign passport holders</li>
                    <li><strong>Present documents:</strong> Show passport, E-Visa printout, and arrival card</li>
                    <li><strong>Biometrics:</strong> Fingerprints and photo may be taken</li>
                    <li><strong>Entry stamp:</strong> Officer stamps your passport - keep arrival card attached</li>
                    <li><strong>Customs:</strong> Proceed to baggage claim and customs</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">What to declare at customs:</h4>
                  <ul className="text-gray-600 list-disc list-inside space-y-1">
                    <li>Cash over $5,000 USD (or equivalent)</li>
                    <li>Items for commercial purposes</li>
                    <li>Restricted items (medications, food products)</li>
                    <li>Expensive electronics or jewelry</li>
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
                  Processing Times & Requirements
                </h3>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">E-Visa processing times:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                      <p className="font-bold text-red-700 text-xl">1.5 Hours</p>
                      <p className="text-red-600 text-sm">Rush Processing</p>
                      <p className="text-gray-500 text-xs mt-1">Our fast service</p>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                      <p className="font-bold text-yellow-700 text-xl">1-3 Days</p>
                      <p className="text-yellow-600 text-sm">Standard Processing</p>
                      <p className="text-gray-500 text-xs mt-1">Official government</p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                      <p className="font-bold text-gray-700 text-xl">3-5 Days</p>
                      <p className="text-gray-600 text-sm">Embassy Visa</p>
                      <p className="text-gray-500 text-xs mt-1">Traditional method</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Required documents:</h4>
                  <ul className="text-gray-600 list-disc list-inside space-y-1">
                    <li>Passport scan (data page) - valid for 6+ months</li>
                    <li>Passport-style photo (4x6cm, white background, no glasses)</li>
                    <li>Travel itinerary (entry/exit dates, port of entry)</li>
                    <li>Email address for visa delivery</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Photo requirements:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="font-medium text-green-800 mb-2">Acceptable:</p>
                      <ul className="text-green-700 text-sm space-y-1">
                        <li>White or light background</li>
                        <li>Face clearly visible, looking straight</li>
                        <li>Natural expression, mouth closed</li>
                        <li>Recent photo (within 6 months)</li>
                      </ul>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="font-medium text-red-800 mb-2">Not Acceptable:</p>
                      <ul className="text-red-700 text-sm space-y-1">
                        <li>Sunglasses or tinted glasses</li>
                        <li>Hats or head coverings (except religious)</li>
                        <li>Blurry or pixelated images</li>
                        <li>Shadows on face</li>
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
                  Special Cases & Extensions
                </h3>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Can I extend my visa in Vietnam?</h4>
                  <p className="text-gray-600">Yes, E-Visa can be extended once for an additional 90 days. Apply through Vietnam Immigration Department at least 5-7 days before expiry. Cost is approximately $100-150 USD.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Phu Quoc Island - Special visa exemption:</h4>
                  <p className="text-gray-600">All nationalities can visit Phu Quoc Island for up to 30 days without a visa if arriving directly by international flight and staying only on the island.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Business visa requirements:</h4>
                  <ul className="text-gray-600 list-disc list-inside space-y-1">
                    <li>Invitation letter from Vietnamese company</li>
                    <li>Business registration of the host company</li>
                    <li>Purpose of visit documentation</li>
                    <li>May require work permit for extended stays</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">What if my visa is rejected?</h4>
                  <p className="text-gray-600">Common rejection reasons include: incomplete information, passport validity issues, or unclear photos. We review all applications before submission to minimize rejections. If rejected, we provide full refund or free resubmission.</p>
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

export default function ApplyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-blue-600 text-lg">Loading...</div>
      </div>
    }>
      <ApplyForm />
    </Suspense>
  );
}
