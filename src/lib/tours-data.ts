/**
 * Tour data from vietnamtourbooking.com affiliate partner
 * These tours are displayed on vietnamtravel.help to provide additional travel services
 */

export interface Tour {
  id: string;
  name: string;
  category: "cruise" | "day-trip" | "multi-day";
  location: string;
  duration: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  description: string;
  highlights: string[];
  imageUrl: string;
  rating?: number;
  reviewCount?: number;
  affiliateUrl: string;
}

export const FEATURED_TOURS: Tour[] = [
  // Halong Bay Cruises
  {
    id: "halong-day-trip",
    name: "Halong Bay Day Trip",
    category: "day-trip",
    location: "Halong Bay",
    duration: "1 day",
    price: 48,
    originalPrice: 60,
    discount: 20,
    description: "Experience the magnificent Halong Bay on a day cruise. Visit Sung Sot Cave and Titop Island with stunning limestone karst scenery.",
    highlights: ["Sung Sot Cave", "Titop Island", "Kayaking", "Lunch on board"],
    imageUrl: "/tours/halong-day-trip.jpg",
    rating: 7.5,
    reviewCount: 17,
    affiliateUrl: "https://www.vietnamtourbooking.com/halong-bay-cruises/",
  },
  {
    id: "serenity-cruise-2d1n",
    name: "Serenity Cruise 2 Days/1 Night",
    category: "cruise",
    location: "Halong Bay",
    duration: "2 days, 1 night",
    price: 165,
    originalPrice: 184,
    discount: 11,
    description: "Float on a calm, azure sea among limestone peaks. Perfect for discerning travelers seeking tranquility and natural beauty.",
    highlights: ["Overnight on bay", "Cave exploration", "Sunset views", "Fresh seafood dinner"],
    imageUrl: "/tours/serenity-cruise.jpg",
    rating: 7.6,
    reviewCount: 9,
    affiliateUrl: "https://www.vietnamtourbooking.com/halong-bay-cruises/",
  },
  {
    id: "lan-ha-luxury-day",
    name: "Lan Ha Bay Luxury Day Tour",
    category: "day-trip",
    location: "Lan Ha Bay",
    duration: "1 day",
    price: 107,
    originalPrice: 119,
    discount: 11,
    description: "Experience world-class comfort with luxury limousine transfer and premium cruise through the stunning Lan Ha Bay.",
    highlights: ["Luxury transfer", "Less crowded", "Premium cruise", "Gourmet lunch"],
    imageUrl: "/tours/lan-ha-luxury.jpg",
    affiliateUrl: "https://www.vietnamtourbooking.com/halong-bay-cruises/",
  },
  {
    id: "renea-cruise-2d1n",
    name: "Renea Cruise 2 Days/1 Night",
    category: "cruise",
    location: "Bai Tu Long Bay",
    duration: "2 days, 1 night",
    price: 132,
    originalPrice: 165,
    discount: 20,
    description: "Authentic Halong cruise experience on a warm ancient wooden boat. Explore Bai Tu Long Bay with clearer waters and fewer tourists.",
    highlights: ["Traditional wooden boat", "Bai Tu Long Bay", "Clearer waters", "Authentic experience"],
    imageUrl: "/tours/renea-cruise.jpg",
    affiliateUrl: "https://www.vietnamtourbooking.com/halong-bay-cruises/",
  },
  // Mekong Delta Tours
  {
    id: "mekong-eyes-2d",
    name: "Mekong Eyes Cruise 2 Days",
    category: "cruise",
    location: "Mekong Delta",
    duration: "2 days, 1 night",
    price: 305,
    description: "Discover real Vietnamese culture through cooking classes, bicycle tours, floating markets, and sampan river experiences.",
    highlights: ["Floating markets", "Cooking class", "Bicycle tour", "Local villages"],
    imageUrl: "/tours/mekong-eyes.jpg",
    affiliateUrl: "https://www.vietnamtourbooking.com/mekong-delta-tours/",
  },
  {
    id: "mekong-eyes-3d",
    name: "Mekong Eyes Cruise 3 Days",
    category: "multi-day",
    location: "Mekong Delta",
    duration: "3 days, 2 nights",
    price: 431,
    description: "Extended Mekong experience visiting the famous Cai Rang floating market, local handicrafts, brick kilns, and fruit orchards.",
    highlights: ["Cai Rang market", "Handicrafts", "Fruit orchards", "Extended exploration"],
    imageUrl: "/tours/mekong-3day.jpg",
    affiliateUrl: "https://www.vietnamtourbooking.com/mekong-delta-tours/",
  },
  {
    id: "gecko-eyes-2d",
    name: "Gecko Eyes Premium Cruise 2 Days",
    category: "cruise",
    location: "Mekong Delta - Con Dao",
    duration: "2 days, 1 night",
    price: 522,
    description: "Premium cruise watching scenic Mekong views, daily river life, Cai Rang floating market and pearl island exploration.",
    highlights: ["Premium cruise", "Con Dao island", "Pearl island", "Scenic views"],
    imageUrl: "/tours/gecko-eyes.jpg",
    affiliateUrl: "https://www.vietnamtourbooking.com/mekong-delta-tours/",
  },
  {
    id: "cambodia-vietnam-3d",
    name: "Cambodia to Vietnam Cruise 3 Days",
    category: "multi-day",
    location: "Phnom Penh to Ho Chi Minh City",
    duration: "3 days, 2 nights",
    price: 438,
    description: "Cross-border adventure exploring the beautiful Mekong from Phnom Penh, Cambodia to Ho Chi Minh City, Vietnam.",
    highlights: ["Cross-border journey", "Phnom Penh start", "Cultural immersion", "River adventure"],
    imageUrl: "/tours/cambodia-vietnam.jpg",
    affiliateUrl: "https://www.vietnamtourbooking.com/mekong-delta-tours/",
  },
];

// Get tours by category
export function getToursByCategory(category: Tour["category"]): Tour[] {
  return FEATURED_TOURS.filter((tour) => tour.category === category);
}

// Get featured tours (top 6 for homepage)
export function getFeaturedTours(limit = 6): Tour[] {
  return FEATURED_TOURS.slice(0, limit);
}

// Get tours by location
export function getToursByLocation(location: string): Tour[] {
  return FEATURED_TOURS.filter((tour) =>
    tour.location.toLowerCase().includes(location.toLowerCase())
  );
}

// Affiliate partner info
export const AFFILIATE_INFO = {
  name: "Vietnam Tour Booking",
  website: "https://www.vietnamtourbooking.com",
  phone: "+84 966 389 379",
  email: "info@vietnamtourbooking.com",
  rating: 4.5,
  reviewCount: 11,
};
