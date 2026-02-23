"use client";

import Image from "next/image";
import type { Tour } from "@/types/tours";
import { useSite } from "@/contexts/SiteContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { getTourVariations } from "@/lib/tours-utils";

interface TourCardProps {
  tour: Tour;
  /** Custom link URL - if not provided, links to affiliate URL */
  href?: string;
  /** Whether to open in new tab (default: true for affiliate, false for internal) */
  openInNewTab?: boolean;
}

export function TourCard({ tour, href, openInNewTab }: TourCardProps) {
  const { theme } = useSite();
  const { language, t } = useLanguage();
  const { formatPrice } = useCurrency();

  // Get translated tour content if available
  // Tours translations are dynamically added to zh.json, so we use type assertion
  const toursTranslations = (t as Record<string, unknown>).tours as Record<string, {
    name?: string;
    description?: string;
    location?: string;
    duration?: string;
    highlights?: string[];
  }> | undefined;
  const tourTranslation = toursTranslations?.[tour.id];
  const displayName = tourTranslation?.name || tour.name;
  const displayDescription = tourTranslation?.description || tour.description;
  const displayLocation = tourTranslation?.location || tour.location;
  const displayDuration = tourTranslation?.duration || tour.duration;
  const displayHighlights = tourTranslation?.highlights || tour.highlights;

  // Check if this tour has variations
  const variations = tour.groupId ? getTourVariations(tour.groupId) : [];
  const hasMultipleVariations = variations.length > 1;

  // Use provided href or default to affiliate URL
  const linkUrl = href || tour.affiliateUrl;
  const shouldOpenNewTab = openInNewTab ?? !href; // Default: new tab for affiliate, same tab for internal

  return (
    <a
      href={linkUrl}
      target={shouldOpenNewTab ? "_blank" : undefined}
      rel={shouldOpenNewTab ? "noopener noreferrer" : undefined}
      className="group block bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
    >
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {/* Tour image */}
        <Image
          src={tour.imageUrl}
          alt={tour.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

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
          {tour.category === "cruise"
            ? (language === "ZH" ? "邮轮" : "Cruise")
            : tour.category === "day-trip"
              ? (language === "ZH" ? "一日游" : "Day Trip")
              : (language === "ZH" ? "多日游" : "Multi-Day")}
        </div>

        {/* Duration */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-black/60 text-white">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {displayDuration}
        </div>

        {/* Variations badge */}
        {hasMultipleVariations && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-purple-600 text-white">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            {variations.length} {language === "ZH" ? "个选项" : "options"}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Location */}
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          {displayLocation}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-cyan-700 transition-colors">
          {displayName}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {displayDescription}
        </p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-1 mb-3">
          {displayHighlights.slice(0, 3).map((highlight, idx) => (
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
                {formatPrice(tour.originalPrice)}
              </span>
            )}
            <span
              className="text-lg font-bold"
              style={{ color: theme.primaryColor }}
            >
              {formatPrice(tour.price)}
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
  title,
  subtitle
}: ToursSectionProps) {
  const { theme } = useSite();
  const { language } = useLanguage();

  // Default titles based on language
  const defaultTitle = language === "ZH" ? "探索越南旅游和活动" : "Explore Vietnam Tours & Activities";
  const defaultSubtitle = language === "ZH" ? "与我们信赖的旅行合作伙伴一起预订精彩体验" : "Book amazing experiences with our trusted travel partner";
  const displayTitle = title || defaultTitle;
  const displaySubtitle = subtitle || defaultSubtitle;

  if (!tours || tours.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            {displayTitle}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {displaySubtitle}
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
            href="/tours"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: theme.primaryColor }}
          >
            {language === "ZH" ? "查看全部旅游" : "View All Tours"}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

        {/* Partner Badge */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            {language === "ZH" ? "旅游由" : "Tours provided by"}{" "}
            <a
              href="https://www.vietnamtourbooking.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline"
              style={{ color: theme.primaryColor }}
            >
              Vietnam Tour Booking
            </a>
            {" "}· {language === "ZH" ? "评分 4.5/5 星" : "Rated 4.5/5 stars"}
          </p>
        </div>
      </div>
    </section>
  );
}
