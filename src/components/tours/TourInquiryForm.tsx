"use client";

import { useState } from "react";
import type { Tour } from "@/types/tours";
import type { TourInquiryFormData } from "@/types/tours";

interface TourInquiryFormProps {
  tour: Tour;
}

export function TourInquiryForm({ tour }: TourInquiryFormProps) {
  const [formData, setFormData] = useState<TourInquiryFormData>({
    tourId: tour.id,
    tourName: tour.name,
    tourCategory: tour.category,
    fullName: "",
    email: "",
    phone: "",
    whatsapp: "",
    nationality: "",
    preferredDate: "",
    numberOfAdults: 1,
    numberOfChildren: 0,
    specialRequests: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [inquiryNumber, setInquiryNumber] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "numberOfAdults" || name === "numberOfChildren"
          ? parseInt(value) || 0
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/tours/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit inquiry");
      }

      setSubmitSuccess(true);
      setInquiryNumber(data.inquiryNumber);

      // Redirect to affiliate URL after 3 seconds
      setTimeout(() => {
        window.open(tour.affiliateUrl, "_blank");
      }, 3000);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-100">
        <div className="text-center">
          <div className="mb-4">
            <svg
              className="w-16 h-16 text-green-500 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Inquiry Submitted!
          </h3>
          <p className="text-gray-600 mb-4">
            Your inquiry reference:
            <br />
            <strong className="text-lg text-cyan-600">{inquiryNumber}</strong>
          </p>
          <p className="text-sm text-gray-600 mb-4">
            We&apos;ve received your inquiry and will contact you within 24 hours.
          </p>
          <p className="text-sm text-gray-500">
            Redirecting you to complete your booking...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Book This Tour</h3>
      <p className="text-sm text-gray-600 mb-6">
        Fill out the form below and we&apos;ll get back to you within 24 hours.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="John Doe"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="john@example.com"
          />
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="+1 234 567 8900"
          />
        </div>

        {/* WhatsApp (Optional) */}
        <div>
          <label
            htmlFor="whatsapp"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            WhatsApp (Optional)
          </label>
          <input
            type="tel"
            id="whatsapp"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="+1 234 567 8900"
          />
        </div>

        {/* Nationality */}
        <div>
          <label
            htmlFor="nationality"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nationality (Optional)
          </label>
          <input
            type="text"
            id="nationality"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="United States"
          />
        </div>

        {/* Preferred Date */}
        <div>
          <label
            htmlFor="preferredDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Preferred Date (Optional)
          </label>
          <input
            type="date"
            id="preferredDate"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
        </div>

        {/* Number of Travelers */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="numberOfAdults"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Adults *
            </label>
            <select
              id="numberOfAdults"
              name="numberOfAdults"
              required
              value={formData.numberOfAdults}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="numberOfChildren"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Children
            </label>
            <select
              id="numberOfChildren"
              name="numberOfChildren"
              value={formData.numberOfChildren}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              {[0, 1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Special Requests */}
        <div>
          <label
            htmlFor="specialRequests"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Special Requests (Optional)
          </label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            rows={3}
            value={formData.specialRequests}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
            placeholder="Any dietary requirements, accessibility needs, etc."
          />
        </div>

        {/* Error Message */}
        {submitError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{submitError}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Submitting...
            </span>
          ) : (
            "Send Inquiry"
          )}
        </button>

        <p className="text-xs text-gray-500 text-center">
          By submitting, you agree to be contacted about your inquiry.
        </p>
      </form>
    </div>
  );
}
