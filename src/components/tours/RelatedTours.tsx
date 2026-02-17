"use client";

import type { Tour } from "@/types/tours";
import { TourCard } from "@/components/ui/tour-card";

interface RelatedToursProps {
  tours: Tour[];
}

export function RelatedTours({ tours }: RelatedToursProps) {
  if (!tours || tours.length === 0) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          You Might Also Like
        </h2>
        <a
          href="/tours"
          className="text-cyan-600 hover:text-cyan-700 font-medium text-sm sm:text-base flex items-center gap-1"
        >
          View All
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <TourCard
            key={tour.id}
            tour={tour}
            href={`/cruise/${tour.slug}`}
          />
        ))}
      </div>
    </div>
  );
}
