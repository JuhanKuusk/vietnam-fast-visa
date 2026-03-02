"use client";

import type { Tour } from "@/types/tours";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useState } from "react";

// Tour translation type
interface TourTranslation {
  name?: string;
  description?: string;
  location?: string;
  duration?: string;
  highlights?: string[];
  included?: string[];
  excluded?: string[];
}

interface TourPricingProps {
  tour: Tour;
}

export function TourPricing({ tour }: TourPricingProps) {
  const { language, t } = useLanguage();
  const { formatPrice } = useCurrency();
  const isZH = language === "ZH";
  const [selectedTier, setSelectedTier] = useState(0);

  // Get translated tour content if available
  const toursTranslations = (t as Record<string, unknown>).tours as Record<string, TourTranslation> | undefined;
  const tourTranslation = toursTranslations?.[tour.id];

  // Use translations with fallback to original
  const displayDuration = tourTranslation?.duration || tour.duration;
  const displayLocation = tourTranslation?.location || tour.location;

  // Get current price (from selected tier or default)
  const pricingTiers = tour.pricingTiers ?? [];
  const hasPricingTiers = pricingTiers.length > 0;
  const currentPrice = hasPricingTiers ? pricingTiers[selectedTier].price : tour.price;
  const currentCategory = hasPricingTiers ? pricingTiers[selectedTier].category : null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-cyan-100">
      {/* Discount Badge */}
      {tour.discount && (
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full">
            {tour.discount}% {isZH ? "折扣" : "OFF"}
          </span>
        </div>
      )}

      {/* Pricing Tiers */}
      {hasPricingTiers && (
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 block mb-2">
            {isZH ? "选择酒店级别" : "Select Hotel Category"}
          </label>
          <div className="grid grid-cols-2 gap-2">
            {pricingTiers.map((tier, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedTier(idx)}
                className={`px-3 py-2 text-xs rounded-lg border transition-colors ${
                  selectedTier === idx
                    ? 'bg-cyan-600 text-white border-cyan-600'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-cyan-300'
                }`}
              >
                <div className="font-medium">{tier.category.replace(' Hotels', '')}</div>
                <div className={selectedTier === idx ? 'text-cyan-100' : 'text-gray-500'}>
                  {formatPrice(tier.price)}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-sm text-gray-600">{isZH ? "起价" : "From"}</span>
          {tour.originalPrice && (
            <span className="text-lg text-gray-400 line-through">
              {formatPrice(tour.originalPrice)}
            </span>
          )}
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-cyan-600">
            {formatPrice(currentPrice)}
          </span>
          <span className="text-gray-600">/ {isZH ? "每人" : "person"}</span>
        </div>
        {currentCategory && (
          <p className="text-sm text-cyan-600 font-medium mt-1">
            {currentCategory}
          </p>
        )}
        {tour.discount && (
          <p className="text-sm text-green-600 font-medium mt-1">
            {isZH ? `节省 ${formatPrice(tour.originalPrice! - tour.price)}!` : `Save ${formatPrice(tour.originalPrice! - tour.price)}!`}
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
            <strong>{isZH ? "时长：" : "Duration:"}</strong> {displayDuration}
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
            <strong>{isZH ? "地点：" : "Location:"}</strong> {displayLocation}
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
              {tour.reviewCount && ` (${tour.reviewCount} ${isZH ? "评价" : "reviews"})`}
            </span>
          </div>
        )}

        {tour.groupSize && (
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="text-gray-700">
              <strong>{isZH ? "团队规模：" : "Group Size:"}</strong> {tour.groupSize.min}-{tour.groupSize.max} {isZH ? "人" : "people"}
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
          {isZH ? "免费取消" : "Free cancellation available"}
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
          {isZH ? "即时确认" : "Instant confirmation"}
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
          {isZH ? "中文导游" : "English speaking guide"}
        </div>
      </div>
    </div>
  );
}
