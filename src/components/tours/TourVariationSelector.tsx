"use client";

import Link from "next/link";
import type { Tour } from "@/types/tours";
import { getTourVariations } from "@/lib/tours-utils";

interface TourVariationSelectorProps {
  currentTour: Tour;
}

export function TourVariationSelector({ currentTour }: TourVariationSelectorProps) {
  // Only show if tour has variations
  if (!currentTour.groupId) return null;

  const variations = getTourVariations(currentTour.groupId);

  // Don't show if only one variation
  if (variations.length <= 1) return null;

  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 mb-6 border border-purple-100">
      <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
        </svg>
        Choose Duration
      </h3>

      <div className="flex flex-wrap gap-2">
        {variations.map((variation) => {
          const isActive = variation.id === currentTour.id;
          return (
            <Link
              key={variation.id}
              href={`/cruise/${variation.slug}`}
              className={`
                inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${isActive
                  ? 'bg-purple-600 text-white shadow-md ring-2 ring-purple-300'
                  : 'bg-white text-gray-700 hover:bg-purple-100 border border-gray-200 hover:border-purple-300'
                }
              `}
            >
              <span>{variation.variationLabel || variation.duration}</span>
              <span className={`text-xs ${isActive ? 'text-purple-200' : 'text-gray-500'}`}>
                US${variation.price}
              </span>
            </Link>
          );
        })}
      </div>

      <p className="text-xs text-gray-500 mt-3">
        Same great tour, different durations. Pick what suits you best!
      </p>
    </div>
  );
}
