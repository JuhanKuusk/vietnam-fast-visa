"use client";

import { useState } from "react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { SparklesCore } from "@/components/ui/sparkles";

// Visa Info Modal Component
function VisaInfoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-gray-900 border border-white/10 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 border-b border-white/10 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-emerald-400">Vietnam Visa Guide</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl p-2"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(85vh-80px)] space-y-6">
          <p className="text-gray-300 text-base">
            To enter Vietnam, travelers must have valid immigration approval before departure, unless they are from a visa-exempt country. Please follow the steps below carefully to avoid boarding refusal or entry denial.
          </p>

          {/* Step 1 */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-sm">1</span>
              Check if You Need a Visa
            </h3>
            <p className="text-gray-400 pl-11">Before applying, determine your visa requirement based on your nationality:</p>
            <ul className="text-gray-300 pl-11 space-y-1">
              <li>• <strong className="text-emerald-400">Visa-free:</strong> Some nationalities may enter Vietnam without a visa for a limited number of days.</li>
              <li>• <strong className="text-emerald-400">Visa required:</strong> Most travelers must apply for a visa in advance.</li>
              <li>• <strong className="text-emerald-400">E-visa eligible:</strong> Many nationalities can apply online.</li>
              <li>• <strong className="text-emerald-400">Visa on Arrival (VOA):</strong> Available only with prior approval.</li>
            </ul>
            <p className="text-gray-500 text-sm pl-11">If you are unsure, our system will verify your eligibility automatically.</p>
          </div>

          {/* Step 2 */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-sm">2</span>
              Choose the Correct Visa Type
            </h3>
            <p className="text-gray-400 pl-11">Select the visa that matches your travel purpose:</p>
            <ul className="text-gray-300 pl-11 space-y-1">
              <li>• Tourist visa</li>
              <li>• Business visa</li>
              <li>• Short-term visit</li>
            </ul>
            <p className="text-gray-400 pl-11">Choose your length of stay, single or multiple entry, and entry airport or border checkpoint.</p>
          </div>

          {/* Step 3 */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-sm">3</span>
              Submit Your Online Application
            </h3>
            <p className="text-gray-400 pl-11">Complete the online application form with:</p>
            <ul className="text-gray-300 pl-11 space-y-1">
              <li>• Passport details (must be valid for at least 6 months)</li>
              <li>• Personal information</li>
              <li>• Travel dates</li>
              <li>• Entry point</li>
            </ul>
            <p className="text-gray-400 pl-11">Upload required documents: passport scan and passport photo.</p>
          </div>

          {/* Step 4 */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-sm">4</span>
              Immigration Pre-Approval (Mandatory)
            </h3>
            <p className="text-gray-400 pl-11">Your application is submitted to Vietnam Immigration for review.</p>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 ml-11">
              <p className="text-amber-400 font-medium">Important:</p>
              <ul className="text-amber-200 text-sm mt-2 space-y-1">
                <li>• This step is required for all e-visas and visa on arrival</li>
                <li>• Vietnam does not issue visas without advance approval</li>
                <li>• This process ensures security clearance before travel</li>
              </ul>
            </div>
          </div>

          {/* Step 5 */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-sm">5</span>
              Receive Your Visa or Approval Letter
            </h3>
            <p className="text-gray-400 pl-11">Once approved, you will receive:</p>
            <ul className="text-gray-300 pl-11 space-y-1">
              <li>• An e-visa (PDF), or</li>
              <li>• A visa approval letter (for visa on arrival)</li>
            </ul>
            <p className="text-gray-400 pl-11">Check all details carefully: name spelling, passport number, entry date and visa type.</p>
          </div>

          {/* Step 6 */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-sm">6</span>
              Prepare for Travel
            </h3>
            <p className="text-gray-400 pl-11">Before departure, make sure you have:</p>
            <ul className="text-gray-300 pl-11 space-y-1">
              <li>• Printed e-visa or approval letter</li>
              <li>• Valid passport</li>
              <li>• Return or onward ticket</li>
              <li>• Proof of accommodation (if required)</li>
            </ul>
            <p className="text-gray-500 text-sm pl-11">Airlines will check these documents before boarding.</p>
          </div>

          {/* Step 7 */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-sm">7</span>
              Arrival in Vietnam
            </h3>
            <ul className="text-gray-300 pl-11 space-y-2">
              <li><strong className="text-emerald-400">E-visa holders:</strong> Proceed directly to immigration</li>
              <li><strong className="text-emerald-400">Visa on Arrival holders:</strong>
                <ul className="ml-4 mt-1 space-y-1 text-gray-400">
                  <li>• Go to the VOA counter</li>
                  <li>• Submit approval letter, photos, and stamping fee</li>
                  <li>• Receive visa stamp, then enter Vietnam</li>
                </ul>
              </li>
            </ul>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 ml-11 mt-3">
              <p className="text-red-400 font-medium">⚠️ Travelers arriving without a visa or approval letter will not be allowed to enter Vietnam.</p>
            </div>
          </div>

          {/* Important Clarification */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5">
            <h3 className="text-lg font-bold text-blue-400 mb-3">Important: "Visa on Arrival"</h3>
            <p className="text-gray-300 mb-3">Visa on Arrival is not a traditional airport visa. You cannot:</p>
            <ul className="text-gray-400 space-y-1">
              <li>• Apply for a visa after landing</li>
              <li>• Obtain a visa without prior approval</li>
            </ul>
            <p className="text-blue-300 font-medium mt-3">A pre-approved visa letter is mandatory before travel.</p>
          </div>

          {/* Our Recommendation */}
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-5">
            <h3 className="text-lg font-bold text-emerald-400 mb-3">Our Recommendation</h3>
            <p className="text-gray-300 mb-3">Apply early and verify your visa status before booking flights. Our platform is designed to:</p>
            <ul className="text-emerald-300 space-y-1">
              <li>✓ Check eligibility</li>
              <li>✓ Prevent common mistakes</li>
              <li>✓ Ensure compliance with Vietnam immigration rules</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-900 border-t border-white/10 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 font-bold text-lg transition-all"
          >
            Got it, Start Application →
          </button>
        </div>
      </div>
    </div>
  );
}

// Entry ports (43 total - showing main airports first)
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
  const [applicants, setApplicants] = useState(1);
  const [formData, setFormData] = useState({
    purpose: "tourist",
    arrivalPort: "",
    entryDate: "",
    exitDate: "",
  });
  const [showVisaInfo, setShowVisaInfo] = useState(false);

  const pricePerPerson = 149;
  const totalPrice = pricePerPerson * applicants;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Hero Section */}
      <header className="px-5 py-6 flex justify-between items-center max-w-6xl mx-auto">
        <div className="text-2xl font-bold text-emerald-400">vietnamvisa1hour.com</div>
        <a
          href="https://wa.me/1234567890"
          className="flex items-center gap-2 text-base text-gray-300 hover:text-white"
        >
          <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
          <span className="hidden sm:inline">WhatsApp Support</span>
          <span className="sm:hidden">Help</span>
        </a>
      </header>

      <main className="px-5 pb-24">
        {/* Hero */}
        <section className="text-center py-10 md:py-14 relative">
          {/* Sparkles Background */}
          <div className="absolute inset-0 w-full h-full">
            <SparklesCore
              id="hero-sparkles"
              background="transparent"
              minSize={0.4}
              maxSize={1.2}
              particleDensity={40}
              particleColor="#10b981"
              particleSpeed={0.3}
            />
          </div>

          {/* Urgency Badge */}
          <div className="relative z-10 inline-block mb-5 rounded-full bg-red-500/20 px-5 py-2.5 text-base font-medium text-red-400 border border-red-500/30">
            <span className="animate-pulse inline-block mr-1">⚡</span>
            Stuck at check-in? We can help.
          </div>

          {/* Main Headline with Animation */}
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Vietnam E-Visa
              </span>
              <br />
              <span className="text-emerald-400">in 1 Hour</span>
            </h1>
          </div>

          {/* Animated Subheadline */}
          <div className="relative z-10">
            <TextGenerateEffect
              words="Official E-Visa • Fast Processing • 24/7 Support"
              className="text-xl md:text-2xl text-gray-400 mb-8"
              duration={0.4}
            />
          </div>

          {/* Price - Larger for mobile */}
          <div className="relative z-10 flex items-center justify-center gap-3 mb-8">
            <span className="text-5xl md:text-6xl font-bold text-emerald-400">
              ${pricePerPerson}
            </span>
            <span className="text-gray-400 text-xl">/person</span>
          </div>

          {/* Timeline - Key USP */}
          <div className="relative z-10 max-w-2xl mx-auto mb-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                  <div className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold">40</span>
                  </div>
                  <div>
                    <div className="text-emerald-400 font-bold text-lg">40 Minutes</div>
                    <div className="text-gray-400 text-sm">Approval letter for airline check-in</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
                  <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold">1-2h</span>
                  </div>
                  <div>
                    <div className="text-blue-400 font-bold text-lg">1-2 Hours</div>
                    <div className="text-gray-400 text-sm">Full visa issued before you land</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Value Props - Larger text */}
          <div className="relative z-10 flex flex-wrap justify-center gap-4 md:gap-8 text-base md:text-lg text-gray-300 mb-8">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 text-xl">✓</span>
              <span>1 Hour Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 text-xl">✓</span>
              <span>WhatsApp Updates</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 text-xl">✓</span>
              <span>80+ Countries</span>
            </div>
          </div>

          {/* Info about the Visa Button */}
          <div className="relative z-10 flex justify-center mb-10">
            <button
              onClick={() => setShowVisaInfo(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-gray-300 hover:bg-white/15 hover:text-white hover:border-emerald-500/50 transition-all text-base font-medium"
            >
              <span className="text-xl">📋</span>
              Info about the Visa
            </button>
          </div>
        </section>

        {/* Application Form */}
        <section className="max-w-lg mx-auto">
          <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur overflow-hidden shadow-xl shadow-black/20">
            {/* Form Header */}
            <div className="bg-emerald-500/20 border-b border-emerald-500/30 px-6 py-5">
              <h2 className="text-xl font-semibold text-emerald-400">
                E-Visa Application Form
              </h2>
              <p className="text-base text-gray-400 mt-1">Complete in under 5 minutes</p>
            </div>

            {/* Form Body */}
            <div className="p-6 space-y-6">
              {/* Number of Applicants */}
              <div>
                <label className="block text-base font-medium text-gray-300 mb-3">
                  Number of Applicants *
                </label>
                <select
                  value={applicants}
                  onChange={(e) => setApplicants(Number(e.target.value))}
                  className="w-full px-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white text-lg focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                    <option key={n} value={n} className="bg-gray-900">
                      {n} {n === 1 ? "person" : "people"}
                    </option>
                  ))}
                </select>
              </div>

              {/* Purpose of Travel */}
              <div>
                <label className="block text-base font-medium text-gray-300 mb-3">
                  Purpose of Travel *
                </label>
                <select
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  className="w-full px-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white text-lg focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                >
                  <option value="tourist" className="bg-gray-900">Tourist</option>
                  <option value="business" className="bg-gray-900">Business</option>
                  <option value="visiting" className="bg-gray-900">Visiting relatives/friends</option>
                </select>
              </div>

              {/* Arrival Port */}
              <div>
                <label className="block text-base font-medium text-gray-300 mb-3">
                  Arrival Port (Airport) *
                </label>
                <select
                  value={formData.arrivalPort}
                  onChange={(e) => setFormData({ ...formData, arrivalPort: e.target.value })}
                  className="w-full px-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white text-lg focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                >
                  <option value="" className="bg-gray-900">Select arrival airport</option>
                  {ENTRY_PORTS.map((port) => (
                    <option key={port.code} value={port.code} className="bg-gray-900">
                      {port.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Entry Date */}
              <div>
                <label className="block text-base font-medium text-gray-300 mb-3">
                  Entry Date (Arrival in Vietnam) *
                </label>
                <input
                  type="date"
                  value={formData.entryDate}
                  onChange={(e) => setFormData({ ...formData, entryDate: e.target.value })}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white text-lg focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all [color-scheme:dark]"
                />
              </div>

              {/* Exit Date */}
              <div>
                <label className="block text-base font-medium text-gray-300 mb-3">
                  Exit Date (Departure from Vietnam) *
                </label>
                <input
                  type="date"
                  value={formData.exitDate}
                  onChange={(e) => setFormData({ ...formData, exitDate: e.target.value })}
                  min={formData.entryDate || new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white text-lg focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all [color-scheme:dark]"
                />
              </div>

              {/* Speed Tier - Single option (our USP) */}
              <div className="bg-emerald-500/10 border-2 border-emerald-500/40 rounded-xl p-5">
                <div className="flex items-center gap-4">
                  <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-lg text-emerald-400">
                      EMERGENCY - 1 Hour
                    </div>
                    <div className="text-base text-gray-400">
                      40 min check-in approval • Full visa in 1-2h
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    ${pricePerPerson}
                  </div>
                </div>
              </div>

              {/* Price Summary */}
              <div className="border-t border-white/10 pt-5 space-y-3">
                <div className="flex justify-between text-base text-gray-400">
                  <span>Service fee ({applicants} × ${pricePerPerson})</span>
                  <span>${totalPrice} USD</span>
                </div>
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-emerald-400">${totalPrice} USD</span>
                </div>
              </div>

              {/* CTA Button */}
              <a
                href={`/apply?applicants=${applicants}&purpose=${formData.purpose}&port=${formData.arrivalPort}&entry=${formData.entryDate}&exit=${formData.exitDate}`}
                className="block w-full py-5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 font-bold text-xl transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] text-center"
              >
                Continue to Applicant Details →
              </a>

              {/* Trust indicators */}
              <div className="flex items-center justify-center gap-3 text-sm text-gray-500 pt-3 flex-wrap">
                <span className="flex items-center gap-1">
                  <span>🔒</span> Secure Payment
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1">
                  <span>💬</span> 24/7 Support
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1">
                  <span>✓</span> 98% On-time
                </span>
              </div>
            </div>
          </div>

          {/* Compare Box */}
          <div className="mt-8 p-5 rounded-xl bg-white/5 border border-white/10">
            <h3 className="font-semibold text-base text-gray-300 mb-4">
              Why choose us over competitors?
            </h3>
            <div className="space-y-3 text-base">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Our price (1h)</span>
                <span className="text-emerald-400 font-bold text-lg">$149</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Competitor (2h)</span>
                <span className="text-gray-500 line-through">$200</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Competitor (1-2h)</span>
                <span className="text-gray-500 line-through">$235-250</span>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 text-center text-base text-gray-500">
          <p className="font-medium">Vietnam Fast Visa Service</p>
          <p className="mt-2">© 2026 - All rights reserved</p>
          <div className="mt-5 flex justify-center gap-6 flex-wrap">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Refund Policy</a>
          </div>
        </footer>
      </main>

      {/* WhatsApp Floating Button - Larger */}
      <a
        href="https://wa.me/1234567890?text=Hi, I need an urgent Vietnam visa!"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-400 transition-all duration-300 hover:scale-110 z-50"
      >
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* Visa Info Modal */}
      <VisaInfoModal isOpen={showVisaInfo} onClose={() => setShowVisaInfo(false)} />
    </div>
  );
}
