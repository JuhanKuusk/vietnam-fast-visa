"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FEATURED_TOURS } from "@/lib/tours-data";
import { TourCard } from "@/components/ui/tour-card";
import { TourFilters } from "@/components/tours/TourFilters";
import { ToursFAQ } from "@/components/tours/ToursFAQ";
import { TravelTips } from "@/components/tours/TravelTips";
import { PopularDestinations } from "@/components/tours/PopularDestinations";
import type { TourFilters as TourFiltersType, TourSortOption } from "@/types/tours";
import { filterTours, sortTours, searchTours, getGroupedToursForListing, hasVariations, getTourVariations } from "@/lib/tours-utils";
import { useSite } from "@/contexts/SiteContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Logo } from "@/components/ui/logo";
import { Footer } from "@/components/ui/footer";
import { LanguageSelector } from "@/components/ui/language-selector";
import { ThemeToggle } from "@/components/ui/theme-toggle";

// Hero background images for the tours page (Vietnam Travel Help branded images)
const HERO_IMAGES = [
  "/VietnamTravel_Help-hero-section-slide.webp",
  "/VietnamTravel_Help-hero-section-slide-2.webp",
  "/VietnamTravel_Help-hero-section-slide-3.webp",
  "/VietnamTravel_Help-hero-section-slide-4.webp",
];

function HeroBackgroundSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      {/* Background Images */}
      {HERO_IMAGES.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt={`Vietnam landscape ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
            sizes="100vw"
          />
        </div>
      ))}
      {/* Light Overlay for vibrant colors with text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-black/35" />

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {HERO_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? "bg-white w-6" : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function ToursPage() {
  const { content, siteName, layout } = useSite();
  const { t } = useLanguage();
  const [filters, setFilters] = useState<TourFiltersType>({
    category: "all",
    location: "all",
    priceRange: "all",
    startCity: "all",
    destinations: [],
    activities: [],
  });

  const [sortBy, setSortBy] = useState<TourSortOption>("popular");
  const [searchQuery, setSearchQuery] = useState("");

  // Apply grouping, filters, search, and sorting
  const displayedTours = useMemo(() => {
    // First, get grouped tours (collapses variations into single representatives)
    let tours = getGroupedToursForListing(FEATURED_TOURS);

    // Apply search
    if (searchQuery.trim()) {
      tours = searchTours(tours, searchQuery);
    }

    // Apply filters
    tours = filterTours(tours, filters);

    // Apply sorting
    tours = sortTours(tours, sortBy);

    return tours;
  }, [filters, sortBy, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-50 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex flex-col">
              <Link href="/" className="hover:opacity-90 transition-opacity">
                <Logo size="md" taglineText={t.header.logoTagline} siteName={siteName !== "VietnamTravel.help" ? siteName : undefined} />
              </Link>
              {/* Mobile contact info below logo */}
              <div className="flex sm:hidden items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
                <a href={`mailto:${content.supportEmail}`} className="hover:text-blue-600">
                  {content.supportEmail}
                </a>
                <span>|</span>
                <a href={`https://wa.me/${content.whatsappNumber.replace(/[^0-9]/g, '')}`} className="hover:text-green-600">
                  {content.whatsappDisplay}
                </a>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* About Us Button - Blue */}
              <Link
                href="/about"
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white rounded-lg transition-all hover:opacity-90"
                style={{ backgroundColor: '#2d7ef6' }}
              >
                {t.header.aboutUs}
              </Link>
              {/* Added Fees Button - Amber/Orange */}
              <Link
                href="/fees"
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white rounded-lg transition-all hover:opacity-90"
                style={{ backgroundColor: '#f59e0b' }}
              >
                {t.header?.addedFees || "Added Fees"}
              </Link>
              {/* Vietnam Tours Button - Teal/Green (Active) */}
              {layout.showTours && (
                <Link
                  href="/tours"
                  className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white rounded-lg transition-all ring-2 ring-offset-2 ring-teal-500"
                  style={{ backgroundColor: '#0d9488' }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Vietnam Tours
                </Link>
              )}
              {/* WhatsApp Button - Green */}
              <a
                href={`https://wa.me/${content.whatsappNumber.replace(/[^0-9]/g, '')}`}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg text-sm font-medium text-white bg-green-500 hover:bg-green-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
              <ThemeToggle />
              <LanguageSelector />
            </div>
          </div>
        </div>
      </header>

      <main className="bg-gray-50 dark:bg-gray-900">
        {/* Hero Section with Background Image Slider */}
        <section className="relative text-white py-32 sm:py-40 overflow-hidden">
          {/* Background Image Slider */}
          <HeroBackgroundSlider />

          {/* Content Overlay */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                Explore Vietnam Tours
              </h1>
              <p className="text-xl sm:text-2xl text-white/90 mb-8 drop-shadow-lg" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
                Discover amazing cruises and cultural experiences across Vietnam
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <svg
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="search"
                    placeholder="Search tours by name or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30 text-lg shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tours Grid Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="lg:sticky lg:top-24">
                <TourFilters
                  filters={filters}
                  setFilters={setFilters}
                  totalCount={FEATURED_TOURS.length}
                  filteredCount={displayedTours.length}
                />
              </div>
            </aside>

            {/* Tours Grid */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {searchQuery ? `Results for "${searchQuery}"` : "All Tours"}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {displayedTours.length} tour{displayedTours.length !== 1 ? "s" : ""} found
                  </p>
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <label htmlFor="sort" className="text-sm text-gray-600 dark:text-gray-400">
                    Sort by:
                  </label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as TourSortOption)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white dark:bg-gray-800 dark:text-white"
                  >
                  <option value="popular">Most Popular</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="duration">Duration</option>
                </select>
              </div>
            </div>

              {/* Tours Grid */}
              {displayedTours.length > 0 ? (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {displayedTours.map((tour) => (
                    <TourCard
                      key={tour.id}
                      tour={tour}
                      href={`/cruise/${tour.slug}`}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <svg
                    className="w-16 h-16 text-gray-300 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No tours found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Try adjusting your filters or search query
                  </p>
                  <button
                    onClick={() => {
                      setFilters({
                        category: "all",
                        location: "all",
                        priceRange: "all",
                        startCity: "all",
                        destinations: [],
                        activities: [],
                      });
                      setSearchQuery("");
                    }}
                    className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Popular Destinations Section */}
        <PopularDestinations />

        {/* Travel Tips Section */}
        <TravelTips />

        {/* FAQ Section */}
        <ToursFAQ />

        {/* CTA Section */}
        <section className="bg-white dark:bg-gray-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Need Help Choosing?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Our travel experts are here to help you find the perfect tour for your Vietnam adventure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`mailto:${content.supportEmail}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-semibold"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Email Us
              </a>
              <a
                href={`https://wa.me/${content.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-cyan-600 text-cyan-600 dark:text-cyan-400 rounded-lg hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-colors font-semibold"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
