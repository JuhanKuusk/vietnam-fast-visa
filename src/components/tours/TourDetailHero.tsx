"use client";

import Image from "next/image";
import type { Tour } from "@/types/tours";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCurrency } from "@/contexts/CurrencyContext";

// Tour translation type
interface TourTranslation {
  name?: string;
  description?: string;
  location?: string;
  duration?: string;
  highlights?: string[];
  included?: string[];
  excluded?: string[];
  fullDescription?: string;
  itinerary?: Array<{
    title?: string;
    description?: string;
    activities?: string[];
    meals?: string[];
  }>;
}

interface TourDetailHeroProps {
  tour: Tour;
}

export function TourDetailHero({ tour }: TourDetailHeroProps) {
  const { language, t } = useLanguage();
  const { formatPrice } = useCurrency();
  const isZH = language === "ZH";

  // Get translated tour content if available
  const toursTranslations = (t as Record<string, unknown>).tours as Record<string, TourTranslation> | undefined;
  const tourTranslation = toursTranslations?.[tour.id];

  // Use translations with fallback to original
  const displayName = tourTranslation?.name || tour.name;
  const displayLocation = tourTranslation?.location || tour.location;
  const displayDuration = tourTranslation?.duration || tour.duration;

  // Category labels
  const getCategoryLabel = () => {
    if (tour.category === "cruise") return isZH ? "邮轮" : "Cruise";
    if (tour.category === "day-trip") return isZH ? "一日游" : "Day Trip";
    return isZH ? "多日游" : "Multi-Day Tour";
  };

  return (
    <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] bg-gradient-to-br from-gray-900 to-gray-700">
      {/* Background Image */}
      <Image
        src={tour.imageUrl}
        alt={displayName}
        fill
        className="object-cover opacity-60"
        priority
        sizes="100vw"
      />

      {/* Overlay Content */}
      <div className="relative h-full flex items-end">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16 w-full">
          <div className="max-w-3xl">
            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-white/90 text-gray-900">
                {getCategoryLabel()}
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg"
              style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)' }}
            >
              {displayName}
            </h1>

            {/* Meta Information */}
            <div
              className="flex flex-wrap items-center gap-4 sm:gap-6 text-white drop-shadow-md"
              style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8), 0 0 10px rgba(0,0,0,0.4)' }}
            >
              {/* Location */}
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 drop-shadow-md"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.6))' }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-sm sm:text-base font-medium">{displayLocation}</span>
              </div>

              {/* Duration */}
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 drop-shadow-md"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.6))' }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm sm:text-base font-medium">{displayDuration}</span>
              </div>

              {/* Rating */}
              {tour.rating && (
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-yellow-400 drop-shadow-md"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.6))' }}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm sm:text-base font-semibold">
                    {tour.rating}
                    {tour.reviewCount && (
                      <span className="text-white/90 ml-1">
                        ({tour.reviewCount} {isZH ? "评价" : "reviews"})
                      </span>
                    )}
                  </span>
                </div>
              )}
            </div>

            {/* Price (visible on mobile) */}
            <div className="mt-6 sm:hidden">
              <div className="inline-flex items-baseline gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <span className="text-sm text-white/70">{isZH ? "起价" : "From"}</span>
                {tour.originalPrice && (
                  <span className="text-sm text-white/50 line-through">
                    {formatPrice(tour.originalPrice)}
                  </span>
                )}
                <span className="text-2xl font-bold text-white">
                  {formatPrice(tour.price)}
                </span>
                <span className="text-sm text-white/70">{isZH ? "每人" : "per person"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Overlay - stronger for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 pointer-events-none" />
    </div>
  );
}
