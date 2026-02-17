"use client";

import type { Tour } from "@/types/tours";

interface TourPricingProps {
  tour: Tour;
}

export function TourPricing({ tour }: TourPricingProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-cyan-100">
      {/* Discount Badge */}
      {tour.discount && (
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full">
            {tour.discount}% OFF
          </span>
        </div>
      )}

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-sm text-gray-600">From</span>
          {tour.originalPrice && (
            <span className="text-lg text-gray-400 line-through">
              US${tour.originalPrice}
            </span>
          )}
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-cyan-600">
            US${tour.price}
          </span>
          <span className="text-gray-600">/ person</span>
        </div>
        {tour.discount && (
          <p className="text-sm text-green-600 font-medium mt-1">
            Save US${tour.originalPrice! - tour.price}!
          </p>
        )}
      </div>

      {/* Quick Info */}
      <div className="space-y-3 py-4 border-t border-gray-200">
        <div className="flex items-center gap-3 text-sm">
          <svg
            className="w-5 h-5 text-gray-400 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-gray-700">
            <strong>Duration:</strong> {tour.duration}
          </span>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <svg
            className="w-5 h-5 text-gray-400 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
          </svg>
          <span className="text-gray-700">
            <strong>Location:</strong> {tour.location}
          </span>
        </div>

        {tour.rating && (
          <div className="flex items-center gap-3 text-sm">
            <svg
              className="w-5 h-5 text-yellow-400 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-gray-700">
              <strong>{tour.rating}/10</strong>
              {tour.reviewCount && ` (${tour.reviewCount} reviews)`}
            </span>
          </div>
        )}
      </div>

      {/* Trust Badges */}
      <div className="pt-4 border-t border-gray-200 space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <svg
            className="w-5 h-5 text-green-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          Free cancellation available
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <svg
            className="w-5 h-5 text-green-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          Instant confirmation
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <svg
            className="w-5 h-5 text-green-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          English speaking guide
        </div>
      </div>
    </div>
  );
}
