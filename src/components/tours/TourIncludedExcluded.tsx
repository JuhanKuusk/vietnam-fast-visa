"use client";

import type { Tour } from "@/types/tours";
import { useLanguage } from "@/contexts/LanguageContext";

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

interface TourIncludedExcludedProps {
  tour: Tour;
}

export function TourIncludedExcluded({ tour }: TourIncludedExcludedProps) {
  const { language, t } = useLanguage();
  const isZH = language === "ZH";

  // Get translated tour content if available
  const toursTranslations = (t as Record<string, unknown>).tours as Record<string, TourTranslation> | undefined;
  const tourTranslation = toursTranslations?.[tour.id];

  // Use translations with fallback to original
  const displayIncluded = tourTranslation?.included || tour.included;
  const displayExcluded = tourTranslation?.excluded || tour.excluded;

  if (!displayIncluded?.length && !displayExcluded?.length) {
    return null;
  }

  return (
    <section className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Included */}
        {displayIncluded && displayIncluded.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg
                className="w-6 h-6 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {isZH ? "费用包含" : "Included"}
            </h3>
            <ul className="space-y-2">
              {displayIncluded.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700">
                  <svg
                    className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Excluded */}
        {displayExcluded && displayExcluded.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg
                className="w-6 h-6 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              {isZH ? "费用不含" : "Not Included"}
            </h3>
            <ul className="space-y-2">
              {displayExcluded.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700">
                  <svg
                    className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
