/**
 * TypeScript types for Tour Booking System
 * Completely separate from visa application types
 */

// =====================================================
// Tour Types
// =====================================================

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
  meals?: string[];
}

export interface Tour {
  id: string;
  slug: string;
  name: string;
  category: "cruise" | "day-trip" | "multi-day";
  location: string;
  duration: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  description: string;
  fullDescription: string; // HTML content for detail pages
  highlights: string[];
  itinerary?: ItineraryDay[];
  included?: string[];
  excluded?: string[];
  imageUrl: string;
  imageGallery?: string[]; // Additional images for gallery
  rating?: number;
  reviewCount?: number;
  affiliateUrl: string;
}

// =====================================================
// Tour Inquiry Types
// =====================================================

export interface TourInquiry {
  id?: string;
  inquiryNumber?: string;

  // Tour information
  tourId: string;
  tourName: string;
  tourCategory: string;

  // Customer information
  fullName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  nationality?: string;

  // Booking details
  preferredDate?: string; // ISO date string
  numberOfAdults: number;
  numberOfChildren?: number;
  specialRequests?: string;

  // Status (set by backend)
  status?: string;
  referredToAffiliate?: boolean;
  affiliateClickedAt?: string;

  // Metadata
  sourceDomain?: string;
  userAgent?: string;
  ipAddress?: string;

  // Timestamps
  createdAt?: string;
  updatedAt?: string;
  contactedAt?: string;
}

export interface TourInquiryFormData {
  tourId: string;
  tourName: string;
  tourCategory: string;
  fullName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  nationality?: string;
  preferredDate?: string;
  numberOfAdults: number;
  numberOfChildren: number;
  specialRequests?: string;
}

export interface TourInquiryResponse {
  success: boolean;
  inquiryNumber?: string;
  error?: string;
}

// =====================================================
// Tour Analytics Types
// =====================================================

export interface TourAnalyticsEvent {
  tourId: string;
  eventType: "view" | "inquiry" | "affiliate_click";
  sourceDomain?: string;
  userAgent?: string;
  referrer?: string;
}

export interface TourAnalytics {
  id: string;
  tourId: string;
  eventType: string;
  sourceDomain: string;
  userAgent?: string;
  referrer?: string;
  createdAt: string;
}

// =====================================================
// Filter and Sort Types
// =====================================================

export interface TourFilters {
  category: "all" | "cruise" | "day-trip" | "multi-day";
  location: string;
  priceRange: "all" | "0-100" | "100-200" | "200-400" | "400+";
  minRating?: number;
}

export type TourSortOption =
  | "popular"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "duration";

// =====================================================
// Helper Types
// =====================================================

export interface TourSearchParams {
  query?: string;
  category?: Tour["category"];
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: TourSortOption;
}
