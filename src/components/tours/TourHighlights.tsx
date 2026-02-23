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

interface TourHighlightsProps {
  tour: Tour;
}

export function TourHighlights({ tour }: TourHighlightsProps) {
  const { language, t } = useLanguage();
  const isZH = language === "ZH";

  // Get translated tour content if available
  const toursTranslations = (t as Record<string, unknown>).tours as Record<string, TourTranslation> | undefined;
  const tourTranslation = toursTranslations?.[tour.id];

  // Use translations with fallback to original
  const displayHighlights = tourTranslation?.highlights || tour.highlights;

  if (!displayHighlights || displayHighlights.length === 0) {
    return null;
  }

  return (
    <section className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {isZH ? "行程亮点" : "Tour Highlights"}
      </h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {displayHighlights.map((highlight, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <svg
              className="w-6 h-6 text-cyan-600 mt-0.5 flex-shrink-0"
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
            <span className="text-gray-700 font-medium">{highlight}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
