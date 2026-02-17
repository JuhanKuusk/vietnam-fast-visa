"use client";

import Image from "next/image";
import type { Tour } from "@/types/tours";

interface TourDetailHeroProps {
  tour: Tour;
}

export function TourDetailHero({ tour }: TourDetailHeroProps) {
  return (
    <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] bg-gradient-to-br from-gray-900 to-gray-700">
      {/* Background Image */}
      <Image
        src={tour.imageUrl}
        alt={tour.name}
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
                {tour.category === "cruise"
                  ? "Cruise"
                  : tour.category === "day-trip"
                  ? "Day Trip"
                  : "Multi-Day Tour"}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              {tour.name}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-white/90">
              {/* Location */}
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-sm sm:text-base">{tour.location}</span>
              </div>

              {/* Duration */}
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
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
                <span className="text-sm sm:text-base">{tour.duration}</span>
              </div>

              {/* Rating */}
              {tour.rating && (
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm sm:text-base font-medium">
                    {tour.rating}
                    {tour.reviewCount && (
                      <span className="text-white/70 ml-1">
                        ({tour.reviewCount} reviews)
                      </span>
                    )}
                  </span>
                </div>
              )}
            </div>

            {/* Price (visible on mobile) */}
            <div className="mt-6 sm:hidden">
              <div className="inline-flex items-baseline gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <span className="text-sm text-white/70">From</span>
                {tour.originalPrice && (
                  <span className="text-sm text-white/50 line-through">
                    US${tour.originalPrice}
                  </span>
                )}
                <span className="text-2xl font-bold text-white">
                  US${tour.price}
                </span>
                <span className="text-sm text-white/70">per person</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />
    </div>
  );
}
