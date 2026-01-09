"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FileUpload } from "@/components/ui/file-upload";

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

interface ApplicantData {
  fullName: string;
  nationality: string;
  passportNumber: string;
  dateOfBirth: string;
  passportExpiry: string;
  gender: string;
}

// Photo Upload Component with Two Options
function PhotoUploadSection({
  label,
  description,
  icon,
  file,
  onFileChange,
  captureType,
}: {
  label: string;
  description: string;
  icon: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
  captureType: "user" | "environment";
}) {
  const [uploadMode, setUploadMode] = useState<"camera" | "upload" | null>(null);

  if (file) {
    return (
      <div className="border-2 border-emerald-500/50 rounded-xl p-5 bg-emerald-500/10">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-xl overflow-hidden bg-black flex-shrink-0">
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-emerald-400 font-semibold text-lg flex items-center gap-2">
              <span>✓</span> {label} uploaded
            </p>
            <p className="text-base text-gray-400 truncate">{file.name}</p>
          </div>
          <button
            onClick={() => onFileChange(null)}
            className="text-gray-400 hover:text-red-400 p-3 text-xl"
          >
            ✕
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <label className="block text-base font-medium text-gray-300 mb-3">
        {label} *
      </label>

      {/* Option Selection */}
      {!uploadMode && (
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setUploadMode("camera")}
            className="flex flex-col items-center gap-3 p-5 rounded-xl border-2 border-dashed border-white/20 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all"
          >
            <span className="text-4xl">📷</span>
            <span className="text-base font-medium text-gray-300">Take Photo</span>
            <span className="text-sm text-gray-500">Use camera</span>
          </button>

          <button
            onClick={() => setUploadMode("upload")}
            className="flex flex-col items-center gap-3 p-5 rounded-xl border-2 border-dashed border-white/20 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all"
          >
            <span className="text-4xl">📁</span>
            <span className="text-base font-medium text-gray-300">Upload File</span>
            <span className="text-sm text-gray-500">From device</span>
          </button>
        </div>
      )}

      {/* Camera Mode */}
      {uploadMode === "camera" && (
        <div className="space-y-4">
          <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center bg-white/5">
            <input
              type="file"
              accept="image/*"
              capture={captureType}
              onChange={(e) => {
                const selectedFile = e.target.files?.[0] || null;
                onFileChange(selectedFile);
                if (selectedFile) setUploadMode(null);
              }}
              className="hidden"
              id={`camera-${label}`}
            />
            <label htmlFor={`camera-${label}`} className="cursor-pointer block">
              <span className="text-5xl block mb-4">{icon}</span>
              <p className="text-gray-300 font-medium text-lg">Tap to open camera</p>
              <p className="text-sm text-gray-500 mt-2">{description}</p>
            </label>
          </div>
          <button
            onClick={() => setUploadMode(null)}
            className="text-base text-gray-400 hover:text-white py-2"
          >
            ← Back to options
          </button>
        </div>
      )}

      {/* Upload Mode with Aceternity UI */}
      {uploadMode === "upload" && (
        <div className="space-y-4">
          <div className="border-2 border-dashed border-white/20 rounded-xl bg-white/5 overflow-hidden">
            <FileUpload
              onChange={(files) => {
                if (files.length > 0) {
                  onFileChange(files[0]);
                  setUploadMode(null);
                }
              }}
              accept="image/*"
              title={`Upload ${label}`}
              subtitle={description}
            />
          </div>
          <button
            onClick={() => setUploadMode(null)}
            className="text-base text-gray-400 hover:text-white py-2"
          >
            ← Back to options
          </button>
        </div>
      )}
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

  // Calculate minimum passport expiry (6 months from entry date)
  const minPassportExpiry = new Date();
  minPassportExpiry.setMonth(minPassportExpiry.getMonth() + 6);

  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Validate all applicants have required fields
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

      // Validate contact info
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

      // Prepare data for API
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

      // Store application data for payment page
      sessionStorage.setItem("applicationId", result.applicationId);
      sessionStorage.setItem("referenceNumber", result.referenceNumber);
      sessionStorage.setItem("totalAmount", String(result.amount));

      // Navigate to payment
      router.push(`/payment?applicants=${applicantCount}&ref=${result.referenceNumber}`);
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitError(error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Header */}
      <header className="px-5 py-6 flex justify-between items-center max-w-6xl mx-auto">
        <a href="/" className="text-2xl font-bold text-emerald-400">
          VietnamFastVisa
        </a>
        <a
          href="https://wa.me/1234567890"
          className="flex items-center gap-2 text-base text-gray-300 hover:text-white"
        >
          <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
          Need help?
        </a>
      </header>

      <main className="px-5 pb-24">
        {/* Progress Steps */}
        <div className="max-w-lg mx-auto mb-10">
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-base font-bold">
                ✓
              </div>
              <span className="text-base text-gray-400 hidden sm:inline">Trip Details</span>
            </div>
            <div className="w-10 h-0.5 bg-emerald-500"></div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-base font-bold">
                2
              </div>
              <span className="text-base text-white hidden sm:inline">Your Information</span>
            </div>
            <div className="w-10 h-0.5 bg-gray-600"></div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-base">
                3
              </div>
              <span className="text-base text-gray-400 hidden sm:inline">Payment</span>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <section className="max-w-lg mx-auto">
          <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur overflow-hidden shadow-xl shadow-black/20">
            {/* Form Header */}
            <div className="bg-emerald-500/20 border-b border-emerald-500/30 px-6 py-5">
              <h2 className="text-xl font-semibold text-emerald-400">
                Applicant Information
              </h2>
              {applicantCount > 1 && (
                <p className="text-base text-gray-400 mt-1">
                  Applicant {currentApplicant + 1} of {applicantCount}
                </p>
              )}
            </div>

            {/* Applicant Tabs (if multiple) */}
            {applicantCount > 1 && (
              <div className="flex border-b border-white/10 overflow-x-auto">
                {applicants.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentApplicant(index)}
                    className={`flex-1 min-w-[100px] px-4 py-4 text-base font-medium transition-colors ${
                      currentApplicant === index
                        ? "bg-emerald-500/20 text-emerald-400 border-b-2 border-emerald-500"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    Person {index + 1}
                    {applicants[index].fullName && (
                      <span className="ml-1 text-emerald-400">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Form Body */}
            <div className="p-6 space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-base font-medium text-gray-300 mb-3">
                  Full Name (as on passport) *
                </label>
                <input
                  type="text"
                  value={currentData.fullName}
                  onChange={(e) => updateApplicant("fullName", e.target.value.toUpperCase())}
                  placeholder="JOHN DOE"
                  className="w-full px-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white text-lg placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 uppercase transition-all"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Enter exactly as shown on passport
                </p>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-base font-medium text-gray-300 mb-3">
                  Gender *
                </label>
                <div className="flex gap-4">
                  {["Male", "Female"].map((gender) => (
                    <label
                      key={gender}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 rounded-xl border-2 cursor-pointer transition-all text-lg ${
                        currentData.gender === gender.toLowerCase()
                          ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                          : "bg-white/5 border-white/20 text-gray-300 hover:border-white/40"
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

              {/* Nationality */}
              <div>
                <label className="block text-base font-medium text-gray-300 mb-3">
                  Nationality *
                </label>
                <select
                  value={currentData.nationality}
                  onChange={(e) => updateApplicant("nationality", e.target.value)}
                  className="w-full px-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white text-lg focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                >
                  <option value="" className="bg-gray-900">Select your nationality</option>
                  {EVISA_COUNTRIES.map((country) => (
                    <option key={country.code} value={country.code} className="bg-gray-900">
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-base font-medium text-gray-300 mb-3">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  value={currentData.dateOfBirth}
                  onChange={(e) => updateApplicant("dateOfBirth", e.target.value)}
                  max={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white text-lg focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 [color-scheme:dark] transition-all"
                />
              </div>

              {/* Passport Number */}
              <div>
                <label className="block text-base font-medium text-gray-300 mb-3">
                  Passport Number *
                </label>
                <input
                  type="text"
                  value={currentData.passportNumber}
                  onChange={(e) => updateApplicant("passportNumber", e.target.value.toUpperCase())}
                  placeholder="AB1234567"
                  className="w-full px-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white text-lg placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 uppercase transition-all"
                />
              </div>

              {/* Passport Expiry */}
              <div>
                <label className="block text-base font-medium text-gray-300 mb-3">
                  Passport Expiry Date *
                </label>
                <input
                  type="date"
                  value={currentData.passportExpiry}
                  onChange={(e) => updateApplicant("passportExpiry", e.target.value)}
                  min={minPassportExpiry.toISOString().split("T")[0]}
                  className="w-full px-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white text-lg focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 [color-scheme:dark] transition-all"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Must be valid for at least 6 months
                </p>
              </div>

              {/* Passport Photo Upload */}
              <PhotoUploadSection
                label="Passport Data Page"
                description="Clear photo showing all details"
                icon="📄"
                file={passportPhotos[currentApplicant]}
                onFileChange={(file) => {
                  const files = [...passportPhotos];
                  files[currentApplicant] = file;
                  setPassportPhotos(files);
                }}
                captureType="environment"
              />

              {/* Portrait Photo Upload */}
              <PhotoUploadSection
                label="Portrait Photo"
                description="White background, no glasses"
                icon="🤳"
                file={portraitPhotos[currentApplicant]}
                onFileChange={(file) => {
                  const files = [...portraitPhotos];
                  files[currentApplicant] = file;
                  setPortraitPhotos(files);
                }}
                captureType="user"
              />

              {/* Contact Information (only for first applicant) */}
              {currentApplicant === 0 && (
                <>
                  <div className="border-t border-white/10 pt-6 mt-6">
                    <h3 className="font-semibold text-lg text-white mb-5">Contact Information</h3>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-base font-medium text-gray-300 mb-3">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full px-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white text-lg placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Visa will be sent to this email
                    </p>
                  </div>

                  {/* Confirm Email */}
                  <div>
                    <label className="block text-base font-medium text-gray-300 mb-3">
                      Confirm Email *
                    </label>
                    <input
                      type="email"
                      value={contactInfo.confirmEmail}
                      onChange={(e) => setContactInfo({ ...contactInfo, confirmEmail: e.target.value })}
                      placeholder="your@email.com"
                      className={`w-full px-4 py-4 rounded-xl bg-white/10 border text-white text-lg placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                        contactInfo.confirmEmail && contactInfo.email !== contactInfo.confirmEmail
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/50"
                          : "border-white/20 focus:border-emerald-500 focus:ring-emerald-500/50"
                      }`}
                    />
                    {contactInfo.confirmEmail && contactInfo.email !== contactInfo.confirmEmail && (
                      <p className="text-sm text-red-400 mt-2">Emails do not match</p>
                    )}
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <label className="block text-base font-medium text-gray-300 mb-3">
                      WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                      placeholder="+1 234 567 8900"
                      className="w-full px-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white text-lg placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Include country code for instant updates
                    </p>
                  </div>
                </>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 pt-6">
                {applicantCount > 1 && currentApplicant > 0 && (
                  <button
                    onClick={() => setCurrentApplicant(currentApplicant - 1)}
                    className="flex-1 py-4 rounded-xl border border-white/20 text-gray-300 text-lg hover:bg-white/5 transition-colors"
                  >
                    ← Previous
                  </button>
                )}

                {applicantCount > 1 && currentApplicant < applicantCount - 1 ? (
                  <button
                    onClick={() => setCurrentApplicant(currentApplicant + 1)}
                    className="flex-1 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 font-bold text-lg transition-colors"
                  >
                    Next Applicant →
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1 py-5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 font-bold text-xl transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 text-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-3">
                        <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      "Continue to Payment →"
                    )}
                  </button>
                )}

                {/* Error Message */}
                {submitError && (
                  <div className="col-span-full text-center p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                    <p className="text-red-400">{submitError}</p>
                  </div>
                )}
              </div>

              {/* Price Summary */}
              <div className="border-t border-white/10 pt-5 mt-5">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total ({applicantCount} {applicantCount === 1 ? "person" : "people"})</span>
                  <span className="text-emerald-400">${totalPrice} USD</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* WhatsApp Floating Button - Larger */}
      <a
        href="https://wa.me/1234567890?text=Hi, I need help with my visa application!"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-400 transition-all duration-300 hover:scale-110 z-50"
      >
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-emerald-400 text-xl">Loading...</div>
      </div>
    }>
      <ApplyForm />
    </Suspense>
  );
}
