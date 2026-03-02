"use client";

import type { Tour, ItineraryDay } from "@/types/tours";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import { useState, useCallback } from "react";

// Tour translation type
interface ItineraryTranslation {
  title?: string;
  description?: string;
  activities?: string[];
  meals?: string[];
  accommodation?: string;
  foodHighlights?: string[];
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
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set([0])); // First day expanded by default

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

  // State for image gallery lightbox
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const openLightbox = useCallback((images: string[], startIndex: number) => {
    setLightboxImages(images);
    setLightboxIndex(startIndex);
    setIsLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % lightboxImages.length);
  }, [lightboxImages.length]);

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length);
  }, [lightboxImages.length]);

  // Merge translated data with original, using translation when available
  const getDisplayDay = (day: ItineraryDay, idx: number) => {
    const translation = translatedItinerary?.[idx];
    return {
      day: day.day,
      title: translation?.title || day.title,
      description: translation?.description || day.description,
      activities: translation?.activities || day.activities,
      meals: translation?.meals || day.meals,
      accommodation: translation?.accommodation || day.accommodation,
      imageUrl: day.imageUrl,
      dayImages: day.dayImages || (day.imageUrl ? [day.imageUrl] : []),
      foodHighlights: translation?.foodHighlights || day.foodHighlights,
    };
  };

  const toggleDay = (idx: number) => {
    setExpandedDays(prev => {
      const newSet = new Set(prev);
      if (newSet.has(idx)) {
        newSet.delete(idx);
      } else {
        newSet.add(idx);
      }
      return newSet;
    });
  };

  const expandAll = () => {
    setExpandedDays(new Set(originalItinerary.map((_, idx) => idx)));
  };

  const collapseAll = () => {
    setExpandedDays(new Set());
  };

  // Check if this itinerary has any images
  const hasImages = originalItinerary.some(day => day.imageUrl);

  return (
    <section className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {isZH ? "行程安排" : "Itinerary"}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={expandAll}
            className="text-sm text-cyan-600 hover:text-cyan-700 font-medium"
          >
            {isZH ? "全部展开" : "Expand All"}
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={collapseAll}
            className="text-sm text-cyan-600 hover:text-cyan-700 font-medium"
          >
            {isZH ? "全部收起" : "Collapse All"}
          </button>
        </div>
      </div>
      <div className="space-y-4">
        {originalItinerary.map((day, idx) => {
          const displayDay = getDisplayDay(day, idx);
          const isExpanded = expandedDays.has(idx);
          return (
            <div
              key={idx}
              className="border border-gray-200 rounded-lg overflow-hidden hover:border-cyan-300 transition-colors"
            >
              {/* Day Header - Clickable */}
              <button
                onClick={() => toggleDay(idx)}
                className="w-full flex items-center gap-4 p-4 text-left hover:bg-gray-50 transition-colors"
              >
                {/* Day Number Badge */}
                <div className="w-10 h-10 rounded-full bg-cyan-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {displayDay.day}
                </div>

                {/* Day Title */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 truncate">
                    {displayDay.title}
                  </h3>
                  {/* Quick info badges */}
                  <div className="flex flex-wrap gap-2 mt-1">
                    {displayDay.meals && displayDay.meals.length > 0 && (
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                        {displayDay.meals.join(", ")}
                      </span>
                    )}
                    {displayDay.accommodation && displayDay.accommodation !== "N/A" && displayDay.accommodation !== "NA" && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                        {displayDay.accommodation}
                      </span>
                    )}
                  </div>
                </div>

                {/* Expand/Collapse Icon */}
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Day Content - Expandable */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-0 border-t border-gray-100">
                  <div className={`grid gap-4 mt-4 ${hasImages && displayDay.imageUrl ? 'md:grid-cols-[1fr_240px]' : ''}`}>
                    {/* Text Content */}
                    <div>
                      {/* Description */}
                      <p className="text-gray-600 mb-4">{displayDay.description}</p>

                      {/* Activities */}
                      {displayDay.activities && displayDay.activities.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">
                            {isZH ? "活动" : "Activities"}
                          </h4>
                          <ul className="space-y-2">
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
                        </div>
                      )}

                      {/* Food Highlights */}
                      {displayDay.foodHighlights && displayDay.foodHighlights.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                            <span>🍜</span>
                            {isZH ? "美食亮点" : "Food Highlights"}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {displayDay.foodHighlights.map((food, foodIdx) => (
                              <span
                                key={foodIdx}
                                className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full border border-amber-200"
                              >
                                {food}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Meals & Accommodation */}
                      <div className="flex flex-wrap gap-4 text-sm">
                        {displayDay.meals && displayDay.meals.length > 0 && (
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4 text-orange-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>
                            <span className="text-gray-600">
                              <span className="font-medium">{isZH ? "餐食：" : "Meals: "}</span>
                              {displayDay.meals.join(", ")}
                            </span>
                          </div>
                        )}
                        {displayDay.accommodation && displayDay.accommodation !== "N/A" && displayDay.accommodation !== "NA" && (
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4 text-blue-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                              />
                            </svg>
                            <span className="text-gray-600">
                              <span className="font-medium">{isZH ? "住宿：" : "Stay: "}</span>
                              {displayDay.accommodation}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Day Images Gallery */}
                    {displayDay.dayImages && displayDay.dayImages.length > 0 && (
                      <div className="space-y-2">
                        {/* Main Image */}
                        <div
                          className="relative h-48 md:h-40 rounded-lg overflow-hidden bg-gray-100 cursor-pointer group"
                          onClick={() => openLightbox(displayDay.dayImages!, 0)}
                        >
                          <Image
                            src={displayDay.dayImages[0]}
                            alt={`Day ${displayDay.day}: ${displayDay.title}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, 240px"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </div>
                        </div>
                        {/* Thumbnail Grid */}
                        {displayDay.dayImages.length > 1 && (
                          <div className="grid grid-cols-4 gap-1">
                            {displayDay.dayImages.slice(1, 5).map((img, imgIdx) => (
                              <div
                                key={imgIdx}
                                className="relative h-14 rounded overflow-hidden bg-gray-100 cursor-pointer group"
                                onClick={() => openLightbox(displayDay.dayImages!, imgIdx + 1)}
                              >
                                <Image
                                  src={img}
                                  alt={`Day ${displayDay.day} photo ${imgIdx + 2}`}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform"
                                  sizes="60px"
                                />
                                {imgIdx === 3 && displayDay.dayImages!.length > 5 && (
                                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">+{displayDay.dayImages!.length - 5}</span>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && lightboxImages.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            onClick={closeLightbox}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous Button */}
          {lightboxImages.length > 1 && (
            <button
              className="absolute left-4 text-white hover:text-gray-300 z-10 p-2"
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Image */}
          <div
            className="relative max-w-[90vw] max-h-[85vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxImages[lightboxIndex]}
              alt={`Photo ${lightboxIndex + 1} of ${lightboxImages.length}`}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>

          {/* Next Button */}
          {lightboxImages.length > 1 && (
            <button
              className="absolute right-4 text-white hover:text-gray-300 z-10 p-2"
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
            {lightboxIndex + 1} / {lightboxImages.length}
          </div>
        </div>
      )}
    </section>
  );
}
