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

interface TourDescriptionProps {
  tour: Tour;
}

export function TourDescription({ tour }: TourDescriptionProps) {
  const { t } = useLanguage();

  // Get translated tour content if available
  const toursTranslations = (t as Record<string, unknown>).tours as Record<string, TourTranslation> | undefined;
  const tourTranslation = toursTranslations?.[tour.id];

  // Use translations with fallback to original
  const displayFullDescription = tourTranslation?.fullDescription || tour.fullDescription;

  return (
    <section className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: displayFullDescription }}
      />
    </section>
  );
}
