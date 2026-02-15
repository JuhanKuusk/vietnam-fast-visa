"use client";

import { Tour } from "@/lib/tours-data";
import { useSite } from "@/contexts/SiteContext";

interface TourCardProps {
  tour: Tour;
}

export function TourCard({ tour }: TourCardProps) {
  const { theme } = useSite();

  return (
    <a
      href={tour.affiliateUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
    >
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {/* Placeholder gradient background - in production would use actual images */}
        <div
          className="absolute inset-0 bg-gradient-to-br opacity-80"
          style={{
            backgroundImage: tour.location.includes("Halong")
              ? "linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)"
              : tour.location.includes("Mekong")
              ? "linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%)"
              : "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%)"
          }}
        />
        {/* Location icon overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-16 h-16 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>

        {/* Discount badge */}
        {tour.discount && (
          <div
            className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold text-white"
            style={{ backgroundColor: theme.primaryColor }}
          >
            {tour.discount}% OFF
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-700">
          {tour.category === "cruise" ? "Cruise" : tour.category === "day-trip" ? "Day Trip" : "Multi-Day"}
        </div>

        {/* Duration */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-black/60 text-white">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {tour.duration}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Location */}
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          {tour.location}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-cyan-700 transition-colors">
          {tour.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {tour.description}
        </p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-1 mb-3">
          {tour.highlights.slice(0, 3).map((highlight, idx) => (
            <span
              key={idx}
              className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600"
            >
              {highlight}
            </span>
          ))}
        </div>

        {/* Rating & Price */}
        <div className="flex items-end justify-between pt-2 border-t border-gray-100">
          {tour.rating && (
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">{tour.rating}</span>
              {tour.reviewCount && (
                <span className="text-xs text-gray-500">({tour.reviewCount})</span>
              )}
            </div>
          )}

          <div className="text-right">
            {tour.originalPrice && (
              <span className="text-xs text-gray-400 line-through block">
                US${tour.originalPrice}
              </span>
            )}
            <span
              className="text-lg font-bold"
              style={{ color: theme.primaryColor }}
            >
              US${tour.price}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

/**
 * Tours Section component for homepage
 */
interface ToursSectionProps {
  tours: Tour[];
  title?: string;
  subtitle?: string;
}

export function ToursSection({
  tours,
  title = "Explore Vietnam Tours & Activities",
  subtitle = "Book amazing experiences with our trusted travel partner"
}: ToursSectionProps) {
  const { theme } = useSite();

  if (!tours || tours.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            {title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <a
            href="https://www.vietnamtourbooking.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: theme.primaryColor }}
          >
            View All Tours
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

        {/* Partner Badge */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            Tours provided by{" "}
            <a
              href="https://www.vietnamtourbooking.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline"
              style={{ color: theme.primaryColor }}
            >
              Vietnam Tour Booking
            </a>
            {" "}· Rated 4.5/5 stars
          </p>
        </div>
      </div>
    </section>
  );
}
