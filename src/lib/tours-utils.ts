/**
 * Utility functions for Tour Booking System
 * Completely separate from visa utilities
 */

import { Tour, TourFilters, TourSortOption } from "@/types/tours";
import { FEATURED_TOURS } from "./tours-data";

// =====================================================
// Tour Lookup Functions
// =====================================================

/**
 * Get a tour by its URL slug
 */
export function getTourBySlug(slug: string): Tour | undefined {
  return FEATURED_TOURS.find((tour) => tour.slug === slug);
}

/**
 * Get a tour by its ID
 */
export function getTourById(id: string): Tour | undefined {
  return FEATURED_TOURS.find((tour) => tour.id === id);
}

/**
 * Get all tours
 */
export function getAllTours(): Tour[] {
  return FEATURED_TOURS;
}

// =====================================================
// Related Tours
// =====================================================

/**
 * Get related tours based on category and location
 * Excludes the current tour
 */
export function getRelatedTours(
  currentTourId: string,
  category?: string,
  location?: string,
  limit: number = 3
): Tour[] {
  return FEATURED_TOURS.filter((tour) => {
    // Exclude current tour
    if (tour.id === currentTourId) return false;

    // Match by category or location
    const matchesCategory = category ? tour.category === category : true;
    const matchesLocation = location
      ? tour.location.toLowerCase().includes(location.toLowerCase())
      : true;

    return matchesCategory || matchesLocation;
  }).slice(0, limit);
}

// =====================================================
// Filtering and Sorting
// =====================================================

/**
 * Filter tours based on criteria
 */
export function filterTours(tours: Tour[], filters: TourFilters): Tour[] {
  let filtered = [...tours];

  // Filter by category
  if (filters.category && filters.category !== "all") {
    filtered = filtered.filter((tour) => tour.category === filters.category);
  }

  // Filter by location
  if (filters.location && filters.location !== "all") {
    filtered = filtered.filter((tour) =>
      tour.location.toLowerCase().includes(filters.location.toLowerCase())
    );
  }

  // Filter by price range
  if (filters.priceRange && filters.priceRange !== "all") {
    const ranges = {
      "0-100": [0, 100],
      "100-200": [100, 200],
      "200-400": [200, 400],
      "400+": [400, Infinity],
    };
    const [min, max] = ranges[filters.priceRange as keyof typeof ranges] || [
      0, Infinity,
    ];
    filtered = filtered.filter(
      (tour) => tour.price >= min && tour.price <= max
    );
  }

  // Filter by minimum rating
  if (filters.minRating) {
    filtered = filtered.filter(
      (tour) => (tour.rating || 0) >= filters.minRating!
    );
  }

  return filtered;
}

/**
 * Sort tours based on criteria
 */
export function sortTours(tours: Tour[], sortBy: TourSortOption): Tour[] {
  const sorted = [...tours];

  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);

    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);

    case "rating":
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));

    case "duration":
      // Sort by duration (extract number of days)
      return sorted.sort((a, b) => {
        const daysA = parseInt(a.duration) || 1;
        const daysB = parseInt(b.duration) || 1;
        return daysA - daysB;
      });

    case "popular":
    default:
      // Sort by rating * review count (popularity score)
      return sorted.sort((a, b) => {
        const scoreA = (a.rating || 0) * (a.reviewCount || 0);
        const scoreB = (b.rating || 0) * (b.reviewCount || 0);
        return scoreB - scoreA;
      });
  }
}

/**
 * Search tours by query string (name or location)
 */
export function searchTours(tours: Tour[], query: string): Tour[] {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return tours;

  return tours.filter(
    (tour) =>
      tour.name.toLowerCase().includes(lowerQuery) ||
      tour.location.toLowerCase().includes(lowerQuery) ||
      tour.description.toLowerCase().includes(lowerQuery)
  );
}

// =====================================================
// Inquiry Number Generation
// =====================================================

/**
 * Generate unique inquiry number in format: TI-YYYYMMDD-XXXX
 * Example: TI-20260217-0001
 */
export function generateInquiryNumber(existingCount: number = 0): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const sequence = String(existingCount + 1).padStart(4, "0");

  return `TI-${year}${month}${day}-${sequence}`;
}

/**
 * Generate inquiry number with today's date and check Supabase for count
 * This should be called from the API route with database access
 */
export async function generateUniqueInquiryNumber(
  getTodayCountFn: () => Promise<number>
): Promise<string> {
  const count = await getTodayCountFn();
  return generateInquiryNumber(count);
}

// =====================================================
// Slug Generation
// =====================================================

/**
 * Generate URL-friendly slug from tour name
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, "") // Remove non-alphanumeric except hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
}

// =====================================================
// Price Formatting
// =====================================================

/**
 * Format price with USD currency
 */
export function formatPrice(price: number): string {
  return `US$${price}`;
}

/**
 * Calculate discount amount
 */
export function calculateDiscountAmount(
  price: number,
  originalPrice: number
): number {
  return originalPrice - price;
}

/**
 * Calculate discount percentage
 */
export function calculateDiscountPercentage(
  price: number,
  originalPrice: number
): number {
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

// =====================================================
// Location Extraction
// =====================================================

/**
 * Get unique locations from all tours
 */
export function getUniqueLocations(tours: Tour[]): string[] {
  const locations = new Set<string>();
  tours.forEach((tour) => {
    // Extract main location (before any dash or comma)
    const mainLocation = tour.location.split(/[-,]/)[0].trim();
    locations.add(mainLocation);
  });
  return Array.from(locations).sort();
}

/**
 * Get unique categories
 */
export function getUniqueCategories(tours: Tour[]): Tour["category"][] {
  const categories = new Set<Tour["category"]>();
  tours.forEach((tour) => categories.add(tour.category));
  return Array.from(categories);
}

// =====================================================
// Validation Helpers
// =====================================================

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number (international format)
 */
export function isValidPhone(phone: string): boolean {
  // Allow various international formats
  const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
}

/**
 * Validate date is in future
 */
export function isValidFutureDate(dateString: string): boolean {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today;
}
