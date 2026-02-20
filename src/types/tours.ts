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

// Activity types for filtering
export type TourActivity =
  | "cruise"
  | "kayaking"
  | "cave-exploration"
  | "trekking"
  | "cycling"
  | "cultural"
  | "food-tour"
  | "beach"
  | "snorkeling"
  | "city-tour"
  | "photography"
  | "homestay"
  | "cooking-class"
  | "temple-visit"
  | "market-visit"
  | "boat-trip"
  | "nature"
  | "wildlife";

// Start cities where tours depart from
export type StartCity =
  | "Hanoi"
  | "Ho Chi Minh City"
  | "Da Nang"
  | "Hue"
  | "Hoi An"
  | "Nha Trang"
  | "Sapa"
  | "Can Tho"
  | "Hai Phong";

// Destination regions/areas visited
export type Destination =
  | "Halong Bay"
  | "Lan Ha Bay"
  | "Bai Tu Long Bay"
  | "Mekong Delta"
  | "Sapa"
  | "Ninh Binh"
  | "Hoi An"
  | "Hue"
  | "Da Nang"
  | "Phu Quoc"
  | "Nha Trang"
  | "Da Lat"
  | "Cu Chi"
  | "Can Tho"
  | "Ben Tre"
  | "Cat Ba Island"
  | "Phong Nha"
  | "Ha Giang"
  | "Mai Chau"
  | "Pu Luong"
  | "Cambodia";

export interface Tour {
  id: string;
  slug: string;
  name: string;
  category: "cruise" | "day-trip" | "multi-day";
  location: string;
  duration: string;
  durationHours?: number; // Duration in hours for precise filtering (e.g., 8 for day trip, 48 for 2 days)
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
  // Grouping for tour variations (e.g., same tour with different durations)
  groupId?: string; // Tours with same groupId are variations of each other
  groupName?: string; // Display name for the group (e.g., "Mekong Eyes Cruise")
  variationLabel?: string; // Short label for this variation (e.g., "2 Days", "3 Days")
  // Enhanced search/filter fields
  startCity: StartCity; // City where tour departs from
  destinations: Destination[]; // Regions/areas visited during the tour
  activities: TourActivity[]; // Activities included in the tour
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
  location: string; // Legacy field - destination filter
  priceRange: "all" | "0-100" | "100-200" | "200-400" | "400+";
  minRating?: number;
  // Enhanced filters
  startCity: "all" | StartCity;
  destinations: Destination[]; // Multiple destinations can be selected
  activities: TourActivity[]; // Multiple activities can be selected
  minDuration?: number; // Minimum duration in hours
  maxDuration?: number; // Maximum duration in hours
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
