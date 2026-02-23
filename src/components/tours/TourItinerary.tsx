"use client";

import type { Tour, ItineraryDay } from "@/types/tours";
import { useLanguage } from "@/contexts/LanguageContext";

// Tour translation type
interface ItineraryTranslation {
  title?: string;
  description?: string;
  activities?: string[];
  meals?: string[];
}

interface TourTranslation {
  name?: string;
  description?: string;
  location?: string;
  duration?: string;
  highlights?: string[];
  included?: string[];
  excluded?: string[];
  fullDescription?: string;
  itinerary?: ItineraryTranslation[];
}

interface TourItineraryProps {
  tour: Tour;
}

export function TourItinerary({ tour }: TourItineraryProps) {
  const { language, t } = useLanguage();
  const isZH = language === "ZH";

  // Get translated tour content if available
  const toursTranslations = (t as Record<string, unknown>).tours as Record<string, TourTranslation> | undefined;
  const tourTranslation = toursTranslations?.[tour.id];

  // Original itinerary
  const originalItinerary = tour.itinerary;

  if (!originalItinerary || originalItinerary.length === 0) {
    return null;
  }

  // Get translated itinerary or use original
  const translatedItinerary = tourTranslation?.itinerary;

  // Merge translated data with original, using translation when available
  const getDisplayDay = (day: ItineraryDay, idx: number) => {
    const translation = translatedItinerary?.[idx];
    return {
      day: day.day,
      title: translation?.title || day.title,
      description: translation?.description || day.description,
      activities: translation?.activities || day.activities,
      meals: translation?.meals || day.meals,
    };
  };

  return (
    <section className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {isZH ? "行程安排" : "Itinerary"}
      </h2>
      <div className="space-y-6">
        {originalItinerary.map((day, idx) => {
          const displayDay = getDisplayDay(day, idx);
          return (
            <div key={idx} className="relative pl-8 pb-6 last:pb-0">
              {/* Timeline Line */}
              {idx < originalItinerary.length - 1 && (
                <div className="absolute left-3 top-8 bottom-0 w-0.5 bg-cyan-200" />
              )}

              {/* Day Number Badge */}
              <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-cyan-600 text-white flex items-center justify-center text-sm font-bold">
                {displayDay.day}
              </div>

              {/* Day Content */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {isZH ? `第${displayDay.day}天：${displayDay.title}` : `Day ${displayDay.day}: ${displayDay.title}`}
                </h3>
                <p className="text-gray-600 mb-3">{displayDay.description}</p>

                {/* Activities */}
                {displayDay.activities && displayDay.activities.length > 0 && (
                  <ul className="space-y-2 mb-3">
                    {displayDay.activities.map((activity, actIdx) => (
                      <li
                        key={actIdx}
                        className="text-sm text-gray-700 flex items-start gap-2"
                      >
                        <svg
                          className="w-4 h-4 text-cyan-600 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {activity}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Meals */}
                {displayDay.meals && displayDay.meals.length > 0 && (
                  <div className="flex items-center gap-2 text-sm">
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <span className="text-gray-600 font-medium">
                      {isZH ? "餐食：" : "Meals: "}{displayDay.meals.join(", ")}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
