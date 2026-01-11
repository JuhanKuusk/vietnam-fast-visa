"use client";

import { useState } from "react";

// Visa Info Modal Component
function VisaInfoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-blue-600 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Vietnam Visa Guide</h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-2xl p-2"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(85vh-140px)] space-y-6">
          <p className="text-gray-600 text-base">
            To enter Vietnam, travelers must have valid immigration approval before departure, unless they are from a visa-exempt country.
          </p>

          {/* Steps */}
          {[
            { title: "Check if You Need a Visa", content: "Determine your visa requirement based on your nationality. Some may enter visa-free, others need e-visa or visa on arrival." },
            { title: "Choose the Correct Visa Type", content: "Select tourist, business, or visiting visa based on your travel purpose and length of stay." },
            { title: "Submit Your Online Application", content: "Complete the form with passport details, personal information, travel dates, and entry point." },
            { title: "Immigration Pre-Approval", content: "Your application is submitted to Vietnam Immigration for review. This is mandatory for all visas." },
            { title: "Receive Your Approval Letter", content: "Once approved, you will receive an e-visa (PDF) or visa approval letter via email." },
            { title: "Prepare for Travel", content: "Print your e-visa or approval letter, ensure passport is valid, and have return ticket ready." },
          ].map((step, index) => (
            <div key={index} className="space-y-2">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">{index + 1}</span>
                {step.title}
              </h3>
              <p className="text-gray-600 pl-11">{step.content}</p>
            </div>
          ))}

          {/* Important Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <h3 className="text-lg font-bold text-amber-800 mb-2">Important: "Visa on Arrival"</h3>
            <p className="text-amber-700">Vietnam does NOT issue visas at the airport without advance approval. A pre-approved visa letter is mandatory before travel.</p>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg transition-all"
          >
            Got it, Start Application →
          </button>
        </div>
      </div>
    </div>
  );
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
  const [applicants, setApplicants] = useState(1);
  const [formData, setFormData] = useState({
    purpose: "tourist",
    arrivalPort: "",
    entryDate: "",
    exitDate: "",
    flightNumber: "",
    hotelAddress: "",
  });
  const [showVisaInfo, setShowVisaInfo] = useState(false);

  const pricePerPerson = 149;
  const totalPrice = pricePerPerson * applicants;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-yellow-400 text-xl font-bold">V</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">vietnamvisa1hour.com</h1>
                <p className="text-xs text-gray-500">Express Visa Service</p>
              </div>
            </div>

            {/* Contact */}
            <div className="flex items-center gap-4">
              <a
                href="https://wa.me/1234567890"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-600 transition-colors"
              >
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="hidden sm:inline">24/7 WhatsApp Support</span>
                <span className="sm:hidden">Support</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Urgency Badge */}
            <div className="inline-block mb-4 rounded-full bg-red-500 px-4 py-2 text-sm font-medium">
              <span className="animate-pulse inline-block mr-1">⚡</span>
              Stuck at check-in? We fix that in 30 minutes!
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Can't Check In?
              <br />
              <span className="text-yellow-400">Approval in 30 Minutes</span>
            </h1>

            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Get your Vietnam E-Visa approval letter in 30 minutes. Pass airline check-in immediately. Full visa ready before you land.
            </p>

            {/* Timeline Cards */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl font-bold">30</span>
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-lg">30 Minutes</div>
                      <div className="text-blue-200 text-sm">Approval letter for airline check-in</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0 text-blue-900">
                      <span className="text-xl font-bold">1-2h</span>
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-lg">1-2 Hours</div>
                      <div className="text-blue-200 text-sm">Full visa issued before you land</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-5xl font-bold text-yellow-400">${pricePerPerson}</span>
              <span className="text-blue-200 text-xl">/person</span>
            </div>

            {/* Info Button */}
            <button
              onClick={() => setShowVisaInfo(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/30 text-white hover:bg-white/20 transition-all text-base font-medium"
            >
              <span>📋</span>
              Learn about Vietnam Visa Requirements
            </button>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">10,000+</div>
              <div className="text-sm text-gray-500">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">99%</div>
              <div className="text-sm text-gray-500">On-Time Delivery</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">80+</div>
              <div className="text-sm text-gray-500">Countries Supported</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">24/7</div>
              <div className="text-sm text-gray-500">WhatsApp Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Application Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Form Header */}
              <div className="bg-blue-600 px-6 py-5">
                <h2 className="text-xl font-bold text-white">
                  Start Your E-Visa Application
                </h2>
                <p className="text-blue-100 mt-1">Complete in under 5 minutes</p>
              </div>

              {/* Form Body */}
              <div className="p-6 space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  {/* Number of Applicants */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Applicants <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={applicants}
                      onChange={(e) => setApplicants(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "person" : "people"}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Purpose of Travel */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Purpose of Travel <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.purpose}
                      onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    >
                      <option value="tourist">Tourist</option>
                      <option value="business">Business</option>
                      <option value="visiting">Visiting relatives/friends</option>
                    </select>
                  </div>
                </div>

                {/* Arrival Port */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Arrival Airport <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.arrivalPort}
                    onChange={(e) => setFormData({ ...formData, arrivalPort: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  >
                    <option value="">Select arrival airport</option>
                    {ENTRY_PORTS.map((port) => (
                      <option key={port.code} value={port.code}>
                        {port.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  {/* Entry Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Entry Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.entryDate}
                      onChange={(e) => setFormData({ ...formData, entryDate: e.target.value })}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>

                  {/* Exit Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Exit Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.exitDate}
                      onChange={(e) => setFormData({ ...formData, exitDate: e.target.value })}
                      min={formData.entryDate || new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  {/* Flight Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Flight Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.flightNumber}
                      onChange={(e) => setFormData({ ...formData, flightNumber: e.target.value.toUpperCase() })}
                      placeholder="e.g. VN123, SQ456"
                      className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>

                  {/* Hotel Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address in Vietnam <span className="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.hotelAddress}
                      onChange={(e) => setFormData({ ...formData, hotelAddress: e.target.value })}
                      placeholder="Hotel name or address"
                      className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>
                </div>

                {/* Service Type */}
                <div className="bg-green-50 border-2 border-green-500 rounded-xl p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-lg text-green-800">
                        URGENT RESCUE - 30 Minutes
                      </div>
                      <div className="text-green-700 text-sm">
                        30 min check-in approval • Full visa in 1-2 hours
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-green-700">
                      ${pricePerPerson}
                    </div>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="bg-gray-50 rounded-xl p-5 space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Service fee ({applicants} × ${pricePerPerson})</span>
                    <span>${totalPrice} USD</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold border-t border-gray-200 pt-3">
                    <span className="text-gray-900">Total</span>
                    <span className="text-blue-600">${totalPrice} USD</span>
                  </div>
                </div>

                {/* CTA Button */}
                <a
                  href={`/apply?applicants=${applicants}&purpose=${formData.purpose}&port=${formData.arrivalPort}&entry=${formData.entryDate}&exit=${formData.exitDate}&flight=${formData.flightNumber}&hotel=${encodeURIComponent(formData.hotelAddress)}`}
                  className="block w-full py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl text-center"
                >
                  Continue to Applicant Details →
                </a>

                {/* Trust indicators */}
                <div className="flex items-center justify-center gap-4 text-sm text-gray-500 pt-2 flex-wrap">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Secure Payment
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Money-back Guarantee
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Why Choose Us */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Why Choose Us?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Fastest Processing</div>
                    <div className="text-sm text-gray-500">Check-in approval in 30 minutes</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">24/7 WhatsApp Support</div>
                    <div className="text-sm text-gray-500">Real-time updates on your visa</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Money-back Guarantee</div>
                    <div className="text-sm text-gray-500">Full refund if visa is rejected</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Comparison */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Price Comparison</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                  <span className="font-medium text-green-800">Our price (30 min)</span>
                  <span className="font-bold text-xl text-green-600">$149</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-500">Competitor A (2h)</span>
                  <span className="text-gray-400 line-through">$200</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-500">Competitor B (1-2h)</span>
                  <span className="text-gray-400 line-through">$235</span>
                </div>
              </div>
            </div>

            {/* VOA Info */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <h3 className="font-bold text-lg text-amber-800 mb-3">
                Important: Visa on Arrival
              </h3>
              <p className="text-amber-700 text-sm mb-3">
                Vietnam does NOT issue visas at the airport without advance approval.
              </p>
              <ul className="text-amber-700 text-sm space-y-1">
                <li>• Apply in advance for approval letter</li>
                <li>• Airlines require this before boarding</li>
                <li>• Without it, you cannot fly to Vietnam</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-yellow-400 text-xl font-bold">V</span>
              </div>
              <span className="text-xl font-bold text-white">vietnamvisa1hour.com</span>
            </div>
            <p className="text-gray-500 mb-6">Express Vietnam E-Visa Service</p>
            <div className="flex justify-center gap-6 mb-6 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Refund Policy</a>
            </div>
            <p className="text-sm">© 2026 vietnamvisa1hour.com - All rights reserved</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/1234567890?text=Hi, I need an urgent Vietnam visa!"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110 z-50"
      >
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* Visa Info Modal */}
      <VisaInfoModal isOpen={showVisaInfo} onClose={() => setShowVisaInfo(false)} />
    </div>
  );
}
