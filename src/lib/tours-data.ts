/**
 * Tour data from vietnamtourbooking.com affiliate partner
 * These tours are displayed on vietnamtravel.help to provide additional travel services
 */

import type { Tour, ItineraryDay } from "@/types/tours";

export const FEATURED_TOURS: Tour[] = [
  // Halong Bay Cruises
  {
    id: "halong-day-trip",
    slug: "halong-day-trip-sung-sot-titop",
    name: "Halong Bay Day Trip (Sung Sot - Titop)",
    category: "day-trip",
    location: "Halong Bay",
    duration: "1 day",
    price: 48,
    originalPrice: 60,
    discount: 20,
    description: "Experience the magnificent Halong Bay on a day cruise. Visit Sung Sot Cave, the largest and most beautiful cave, and Titop Island.",
    fullDescription: `
      <h3>About This Tour</h3>
      <p>Embark on an unforgettable day cruise through the stunning Halong Bay, a UNESCO World Heritage Site. This tour takes you to the most iconic spots including the magnificent Sung Sot Cave and beautiful Titop Island.</p>

      <h3>Why Choose This Tour</h3>
      <p>Perfect for travelers with limited time who want to experience the best of Halong Bay in a single day. Our comfortable cruise includes a delicious Vietnamese lunch, kayaking activities, and visits to the bay's most spectacular locations.</p>

      <h3>What Makes It Special</h3>
      <ul>
        <li>Visit Sung Sot (Surprise) Cave - one of the largest and most beautiful caves in Halong Bay</li>
        <li>Climb to the top of Titop Island for panoramic views</li>
        <li>Kayak through emerald waters and hidden lagoons</li>
        <li>Enjoy authentic Vietnamese lunch on board</li>
        <li>Small group size for a more personal experience</li>
      </ul>
    `,
    highlights: ["Sung Sot Cave", "Titop Island", "Kayaking", "Lunch on board"],
    itinerary: [
      {
        day: 1,
        title: "Halong Bay Discovery",
        description: "Full day exploring Halong Bay's highlights",
        activities: [
          "8:00 AM - Hotel pickup from Hanoi Old Quarter",
          "12:00 PM - Arrive at Tuan Chau Harbor, board cruise",
          "12:30 PM - Welcome lunch while cruising through Halong Bay",
          "2:00 PM - Visit Sung Sot Cave (Surprise Cave)",
          "3:30 PM - Swim and kayak at Titop Island",
          "4:30 PM - Return cruise to harbor",
          "8:00 PM - Drop-off at your Hanoi hotel"
        ],
        meals: ["Lunch"]
      }
    ],
    included: [
      "Round-trip transfer from Hanoi",
      "English-speaking tour guide",
      "Lunch with Vietnamese specialties",
      "Entrance fees and kayaking",
      "Bottled water on bus"
    ],
    excluded: [
      "Personal expenses",
      "Tips and gratuities",
      "Beverages during meals",
      "Travel insurance"
    ],
    imageUrl: "/tours/halong-day-trip.jpg",
    rating: 9.4,
    reviewCount: 17,
    affiliateUrl: "https://www.vietnamtourbooking.com/tour/halong-group-day-trip-sung-sot-titop",
  },
  {
    id: "serenity-cruise-2d1n",
    slug: "serenity-cruise-2-days-1-night",
    name: "Serenity Cruise 2 Days/1 Night",
    category: "cruise",
    location: "Halong Bay",
    duration: "2 days, 1 night",
    price: 165,
    originalPrice: 184,
    discount: 11,
    description: "Float on a calm, azure sea among limestone peaks. Perfect for discerning travelers seeking tranquility and natural beauty.",
    fullDescription: `
      <h3>About Serenity Cruise</h3>
      <p>Experience the magic of Halong Bay aboard the elegant Serenity Cruise. This 2-day, 1-night journey takes you deep into the heart of this UNESCO World Heritage Site, where towering limestone karsts rise from emerald waters.</p>

      <h3>Perfect for Romantic Getaways</h3>
      <p>With comfortable cabins, delicious Vietnamese cuisine, and carefully curated activities, Serenity Cruise offers the perfect blend of relaxation and adventure. Watch the sunset paint the karsts in golden hues, spend the night floating on calm waters, and wake up to the serene beauty of Halong Bay.</p>

      <h3>What You'll Experience</h3>
      <ul>
        <li>Overnight accommodation in a comfortable cabin with private bathroom</li>
        <li>Explore hidden caves and pristine beaches</li>
        <li>Kayaking through secluded lagoons</li>
        <li>Sunset cocktails on the sundeck</li>
        <li>Fresh seafood dinners with Vietnamese specialties</li>
        <li>Morning Tai Chi session on the deck</li>
        <li>Small group size ensuring personalized service</li>
      </ul>
    `,
    highlights: ["Overnight on bay", "Cave exploration", "Sunset views", "Fresh seafood dinner"],
    itinerary: [
      {
        day: 1,
        title: "Halong Bay - Embarkation & Exploration",
        description: "Board the cruise and begin your adventure",
        activities: [
          "12:00 PM - Check-in at Tuan Chau Harbor",
          "12:30 PM - Welcome drink and cruise briefing",
          "1:00 PM - Lunch while cruising through Halong Bay",
          "3:00 PM - Visit Sung Sot Cave",
          "4:30 PM - Kayaking at Luon Cave area",
          "6:00 PM - Sunset party on sundeck with happy hour",
          "7:00 PM - Dinner featuring fresh seafood"
        ],
        meals: ["Lunch", "Dinner"]
      },
      {
        day: 2,
        title: "Sunrise & Return",
        description: "Morning activities and cruise back to harbor",
        activities: [
          "6:30 AM - Sunrise Tai Chi session on sundeck",
          "7:00 AM - Breakfast with coffee and pastries",
          "8:00 AM - Visit Pearl Farm",
          "9:00 AM - Check-out and settle bills",
          "10:00 AM - Vietnamese cooking demonstration",
          "11:00 AM - Brunch while cruising back",
          "12:00 PM - Disembark at Tuan Chau Harbor"
        ],
        meals: ["Breakfast", "Brunch"]
      }
    ],
    included: [
      "1 night accommodation in private cabin",
      "All meals (lunch, dinner, breakfast, brunch)",
      "English-speaking tour guide",
      "Kayaking and cave entrance fees",
      "Sunset party with snacks",
      "Tai Chi class",
      "Cooking demonstration"
    ],
    excluded: [
      "Transfer from Hanoi (available for extra fee)",
      "Beverages and alcohol",
      "Tips and personal expenses",
      "Travel insurance"
    ],
    imageUrl: "/tours/serenity-cruise.jpg",
    rating: 7.6,
    reviewCount: 9,
    affiliateUrl: "https://www.vietnamtourbooking.com/cruise/serenity-cruise-2-days-1-night",
  },
  {
    id: "lan-ha-luxury-day",
    slug: "lan-ha-bay-luxury-day-tour",
    name: "Lan Ha Bay Luxury Day Tour",
    category: "day-trip",
    location: "Lan Ha Bay",
    duration: "1 day",
    price: 107,
    originalPrice: 119,
    discount: 11,
    description: "Experience world-class comfort with luxury limousine transfer and premium cruise through the stunning Lan Ha Bay.",
    fullDescription: `
      <h3>Luxury Lan Ha Bay Experience</h3>
      <p>Discover the pristine beauty of Lan Ha Bay, a hidden gem less crowded than Halong Bay but equally stunning. This premium tour includes luxury limousine transfer from Hanoi and a sophisticated day cruise through crystal-clear waters.</p>

      <h3>Why Lan Ha Bay?</h3>
      <p>Lan Ha Bay offers a more tranquil alternative to the busier Halong Bay, with fewer boats and more opportunities for swimming and kayaking in secluded lagoons. The limestone karsts are just as dramatic, and the waters are even more pristine.</p>

      <h3>Premium Service</h3>
      <ul>
        <li>Luxury limousine transfer with reclining seats</li>
        <li>Modern, well-appointed cruise vessel</li>
        <li>Gourmet lunch with Vietnamese and international dishes</li>
        <li>Swimming and kayaking in less-crowded areas</li>
        <li>Visit to Dark & Bright Cave by bamboo boat</li>
        <li>Professional English-speaking guide</li>
        <li>Small group for personalized attention</li>
      </ul>
    `,
    highlights: ["Luxury transfer", "Less crowded", "Premium cruise", "Gourmet lunch"],
    itinerary: [
      {
        day: 1,
        title: "Lan Ha Bay Luxury Experience",
        description: "Full day of comfort and exploration",
        activities: [
          "8:00 AM - Luxury limousine pickup from Hanoi",
          "11:00 AM - Arrive at Got Harbor, board premium cruise",
          "11:30 AM - Welcome drink and cruise briefing",
          "12:00 PM - Gourmet lunch while cruising",
          "1:30 PM - Kayaking in pristine lagoons",
          "3:00 PM - Visit Dark & Bright Cave by bamboo boat",
          "4:00 PM - Swimming and relaxation",
          "5:00 PM - Return cruise with sunset views",
          "8:30 PM - Drop-off at your Hanoi hotel"
        ],
        meals: ["Lunch"]
      }
    ],
    included: [
      "Luxury limousine round-trip transfer",
      "Premium cruise experience",
      "Gourmet lunch with drinks",
      "English-speaking guide",
      "Kayaking equipment",
      "Bamboo boat ride",
      "All entrance fees",
      "Travel insurance"
    ],
    excluded: [
      "Personal expenses",
      "Tips and gratuities",
      "Alcoholic beverages"
    ],
    imageUrl: "/tours/lan-ha-luxury.jpg",
    affiliateUrl: "https://www.vietnamtourbooking.com/tour/lan-ha-bay-halong-bay-the-most-luxurious-day-tour",
  },
  {
    id: "renea-cruise-2d1n",
    slug: "renea-cruise-2-days-1-night",
    name: "Renea Cruise 2 Days/1 Night",
    category: "cruise",
    location: "Bai Tu Long Bay",
    duration: "2 days, 1 night",
    price: 132,
    originalPrice: 165,
    discount: 20,
    description: "Authentic Halong cruise experience on a warm ancient wooden boat. Explore Bai Tu Long Bay with clearer waters and fewer tourists.",
    fullDescription: `
      <h3>Authentic Wooden Boat Experience</h3>
      <p>Step back in time aboard the Renea Cruise, a beautifully restored traditional wooden junk. This authentic vessel combines old-world charm with modern comfort, offering a unique way to explore the less-visited Bai Tu Long Bay.</p>

      <h3>Bai Tu Long Bay - The Road Less Traveled</h3>
      <p>Bai Tu Long Bay is Halong Bay's quieter neighbor, featuring the same dramatic limestone karsts but with crystal-clear waters and significantly fewer tourists. It's perfect for travelers seeking a more peaceful and authentic Vietnamese bay experience.</p>

      <h3>What Makes Renea Cruise Special</h3>
      <ul>
        <li>Traditional wooden junk with modern amenities</li>
        <li>Explore Bai Tu Long Bay's pristine waters</li>
        <li>Visit Vung Vieng fishing village by bamboo boat</li>
        <li>Kayaking in secluded lagoons</li>
        <li>Fresh seafood and Vietnamese home cooking</li>
        <li>Fewer tourists, more authentic experience</li>
        <li>Sunset squid fishing activity</li>
      </ul>
    `,
    highlights: ["Traditional wooden boat", "Bai Tu Long Bay", "Clearer waters", "Authentic experience"],
    itinerary: [
      {
        day: 1,
        title: "Bai Tu Long Discovery",
        description: "Embark and explore pristine bay",
        activities: [
          "12:00 PM - Check-in at Tuan Chau Harbor",
          "12:30 PM - Lunch while cruising to Bai Tu Long",
          "2:30 PM - Kayaking at Cap La area",
          "4:00 PM - Visit Vung Vieng fishing village by bamboo boat",
          "6:00 PM - Sunset viewing on sundeck",
          "6:30 PM - Squid fishing demonstration",
          "7:30 PM - Dinner with fresh catch of the day"
        ],
        meals: ["Lunch", "Dinner"]
      },
      {
        day: 2,
        title: "Cave Exploration & Return",
        description: "Morning adventures and cruise back",
        activities: [
          "6:30 AM - Sunrise Tai Chi on deck",
          "7:00 AM - Breakfast",
          "8:00 AM - Visit Thien Canh Son Cave",
          "9:30 AM - Check-out and luggage collection",
          "10:00 AM - Brunch while cruising back",
          "11:30 AM - Disembark at Tuan Chau Harbor"
        ],
        meals: ["Breakfast", "Brunch"]
      }
    ],
    included: [
      "1 night on traditional wooden boat",
      "All meals (lunch, dinner, breakfast, brunch)",
      "English-speaking guide",
      "Kayaking and bamboo boat rides",
      "Cave entrance fees",
      "Tai Chi class",
      "Squid fishing equipment"
    ],
    excluded: [
      "Transfer from Hanoi",
      "Beverages and drinks",
      "Tips and personal expenses",
      "Travel insurance"
    ],
    imageUrl: "/tours/renea-cruise.jpg",
    affiliateUrl: "https://www.vietnamtourbooking.com/tour/renea-cruise-2-days-1-night",
  },
  // Mekong Delta Tours
  {
    id: "mekong-eyes-2d",
    slug: "mekong-eyes-cruise-2-days",
    name: "Mekong Eyes Cruise 2 Days",
    category: "cruise",
    location: "Mekong Delta",
    duration: "2 days, 1 night",
    price: 305,
    description: "Discover real Vietnamese culture through cooking classes, bicycle tours, floating markets, and sampan river experiences.",
    fullDescription: `
      <h3>Mekong Delta Cultural Immersion</h3>
      <p>Experience authentic Vietnamese life aboard the Mekong Eyes Cruise. This 2-day journey takes you deep into the Mekong Delta, where you'll visit floating markets, cycle through villages, learn to cook Vietnamese dishes, and meet local families.</p>

      <h3>More Than Just a Cruise</h3>
      <p>Mekong Eyes offers an immersive cultural experience. You'll travel by traditional sampan boats, visit fruit orchards, explore local workshops, and enjoy home-cooked meals prepared with ingredients from the markets you visit.</p>

      <h3>Cultural Highlights</h3>
      <ul>
        <li>Visit Cai Be floating market early morning</li>
        <li>Hands-on Vietnamese cooking class</li>
        <li>Bicycle tour through rural villages</li>
        <li>Sampan rides through narrow canals</li>
        <li>Visit local fruit orchards and try exotic fruits</li>
        <li>Explore traditional brick kilns and rice paper workshops</li>
        <li>Sunset views over Mekong River</li>
      </ul>
    `,
    highlights: ["Floating markets", "Cooking class", "Bicycle tour", "Local villages"],
    itinerary: [
      {
        day: 1,
        title: "Saigon to Mekong Delta",
        description: "Journey into the heart of the delta",
        activities: [
          "8:00 AM - Pickup from Saigon hotel",
          "11:00 AM - Board Mekong Eyes at Cai Be",
          "11:30 AM - Welcome drink and cruise briefing",
          "12:00 PM - Lunch while cruising",
          "2:00 PM - Visit Cai Be floating market",
          "3:00 PM - Bicycle tour through villages",
          "4:30 PM - Visit fruit orchard",
          "6:00 PM - Cooking class on board",
          "7:30 PM - Dinner with your cooked dishes"
        ],
        meals: ["Lunch", "Dinner"]
      },
      {
        day: 2,
        title: "Delta Discovery & Return",
        description: "Explore local life and crafts",
        activities: [
          "6:30 AM - Tai Chi on sundeck",
          "7:00 AM - Breakfast",
          "8:00 AM - Sampan ride through canals",
          "9:00 AM - Visit brick kiln and rice paper workshop",
          "10:30 AM - Check-out and brunch",
          "11:30 AM - Disembark at Vinh Long",
          "2:00 PM - Return to Saigon"
        ],
        meals: ["Breakfast", "Brunch"]
      }
    ],
    included: [
      "Round-trip transfer from Saigon",
      "1 night on cruise with A/C cabin",
      "All meals with drinks",
      "English-speaking guide",
      "Cooking class",
      "Bicycle rental",
      "Sampan boat rides",
      "All entrance fees"
    ],
    excluded: [
      "Alcoholic beverages",
      "Tips and personal expenses",
      "Travel insurance"
    ],
    imageUrl: "/tours/mekong-eyes.jpg",
    affiliateUrl: "https://www.vietnamtourbooking.com/cruise/mekong-eyes-cruise-2-days-saigon-con-dao",
  },
  {
    id: "mekong-eyes-3d",
    slug: "mekong-eyes-cruise-3-days",
    name: "Mekong Eyes Cruise 3 Days",
    category: "multi-day",
    location: "Mekong Delta",
    duration: "3 days, 2 nights",
    price: 431,
    description: "Extended Mekong experience visiting the famous Cai Rang floating market, local handicrafts, brick kilns, and fruit orchards.",
    fullDescription: `
      <h3>The Ultimate Mekong Experience</h3>
      <p>Extend your Mekong adventure with this comprehensive 3-day, 2-night cruise. Experience the delta at a leisurely pace, with more time to explore floating markets, visit remote villages, and immerse yourself in local culture.</p>

      <h3>Deeper Into Delta Life</h3>
      <p>The 3-day itinerary includes a sunrise visit to the famous Cai Rang floating market (the largest in the Mekong Delta), exploration of traditional handicraft villages, and plenty of opportunities to interact with friendly locals.</p>

      <h3>Extended Adventure Features</h3>
      <ul>
        <li>Sunrise at Cai Rang floating market</li>
        <li>Two nights on comfortable river cruise</li>
        <li>Multiple village visits and cultural activities</li>
        <li>Handicraft workshops (pottery, weaving)</li>
        <li>Fresh fruit tasting at orchards</li>
        <li>Traditional Vietnamese cooking classes</li>
        <li>Bicycle tours through countryside</li>
        <li>Sampan rides in narrow canals</li>
      </ul>
    `,
    highlights: ["Cai Rang market", "Handicrafts", "Fruit orchards", "Extended exploration"],
    itinerary: [
      {
        day: 1,
        title: "Saigon to Cai Be",
        description: "Begin your Mekong journey",
        activities: [
          "8:00 AM - Pickup from Saigon",
          "11:00 AM - Board at Cai Be",
          "11:30 AM - Welcome and lunch",
          "2:00 PM - Visit floating market",
          "3:30 PM - Bicycle tour",
          "5:00 PM - Visit local workshop",
          "6:30 PM - Cooking class",
          "7:30 PM - Dinner on deck"
        ],
        meals: ["Lunch", "Dinner"]
      },
      {
        day: 2,
        title: "Deep Delta Exploration",
        description: "Full day of activities",
        activities: [
          "6:00 AM - Early departure to Cai Rang",
          "7:00 AM - Explore Cai Rang floating market",
          "8:30 AM - Breakfast on boat",
          "9:30 AM - Visit fruit orchard",
          "11:00 AM - Sampan ride in canals",
          "12:30 PM - Lunch",
          "3:00 PM - Visit brick kiln and rice paper workshop",
          "6:00 PM - Sunset viewing",
          "7:00 PM - Dinner"
        ],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 3,
        title: "Return to Saigon",
        description: "Morning exploration and departure",
        activities: [
          "6:30 AM - Tai Chi session",
          "7:00 AM - Breakfast",
          "8:00 AM - Visit local market",
          "9:30 AM - Check-out and brunch",
          "11:00 AM - Disembark at Vinh Long",
          "2:00 PM - Return to Saigon"
        ],
        meals: ["Breakfast", "Brunch"]
      }
    ],
    included: [
      "Round-trip transfer from Saigon",
      "2 nights accommodation",
      "All meals and soft drinks",
      "English-speaking guide",
      "Cooking class",
      "Bicycle rental",
      "All activities and entrance fees"
    ],
    excluded: [
      "Alcoholic beverages",
      "Tips and personal expenses",
      "Travel insurance"
    ],
    imageUrl: "/tours/mekong-3day.jpg",
    affiliateUrl: "https://www.vietnamtourbooking.com/cruise/mekong-eyes-cruise-3-days-saigon-con-dao",
  },
  {
    id: "gecko-eyes-2d",
    slug: "gecko-eyes-cruise-2-days",
    name: "Gecko Eyes Premium Cruise 2 Days",
    category: "cruise",
    location: "Mekong Delta - Con Dao",
    duration: "2 days, 1 night",
    price: 522,
    description: "Premium cruise watching scenic Mekong views, daily river life, Cai Rang floating market and pearl island exploration.",
    fullDescription: `
      <h3>Premium Mekong Experience</h3>
      <p>Gecko Eyes offers a more upscale Mekong Delta experience with premium accommodations, gourmet meals, and exclusive activities. This luxury cruise combines the cultural richness of the delta with the comfort of a boutique floating hotel.</p>

      <h3>Luxury Meets Authenticity</h3>
      <p>Enjoy air-conditioned cabins with private bathrooms, fine dining with Vietnamese and international cuisine, and personalized service while still experiencing authentic delta life through carefully curated cultural activities.</p>

      <h3>Premium Features</h3>
      <ul>
        <li>Boutique-style cruise with premium cabins</li>
        <li>Gourmet meals with Vietnamese specialties</li>
        <li>Sunrise at Cai Rang floating market</li>
        <li>Visit to Con Dao pearl island</li>
        <li>Private sampan boat tours</li>
        <li>Premium drinks and snacks included</li>
        <li>Professional photography service available</li>
        <li>Spa treatments on board</li>
      </ul>
    `,
    highlights: ["Premium cruise", "Con Dao island", "Pearl island", "Scenic views"],
    itinerary: [
      {
        day: 1,
        title: "Premium Mekong Discovery",
        description: "Luxury cruise begins",
        activities: [
          "8:00 AM - Luxury van pickup from Saigon",
          "11:30 AM - Board Gecko Eyes at Cai Be",
          "12:00 PM - Welcome champagne and gourmet lunch",
          "2:30 PM - Visit floating market",
          "4:00 PM - Bicycle tour with private guide",
          "6:00 PM - Sunset cocktails on sundeck",
          "7:30 PM - Premium dinner with wine pairing"
        ],
        meals: ["Lunch", "Dinner"]
      },
      {
        day: 2,
        title: "Cai Rang & Return",
        description: "Morning market and departure",
        activities: [
          "5:30 AM - Departure to Cai Rang",
          "6:30 AM - Sunrise at Cai Rang floating market",
          "8:00 AM - Breakfast on boat",
          "9:00 AM - Visit pearl island",
          "10:30 AM - Spa treatment or relaxation",
          "12:00 PM - Brunch and check-out",
          "1:00 PM - Disembark",
          "3:30 PM - Return to Saigon"
        ],
        meals: ["Breakfast", "Brunch"]
      }
    ],
    included: [
      "Luxury van transfer",
      "Premium cabin with A/C",
      "All gourmet meals and premium drinks",
      "English-speaking guide",
      "All activities and entrance fees",
      "Complimentary spa treatment",
      "Welcome champagne",
      "Travel insurance"
    ],
    excluded: [
      "Alcoholic beverages (wine extra)",
      "Tips and personal expenses",
      "Additional spa services"
    ],
    imageUrl: "/tours/gecko-eyes.jpg",
    affiliateUrl: "https://www.vietnamtourbooking.com/cruise/gecko-eyes-cruise-saigon-con-dao-2-days",
  },
  {
    id: "cambodia-vietnam-3d",
    slug: "cambodia-vietnam-cruise-3-days",
    name: "Cambodia to Vietnam Cruise 3 Days",
    category: "multi-day",
    location: "Phnom Penh to Ho Chi Minh City",
    duration: "3 days, 2 nights",
    price: 438,
    description: "Cross-border adventure exploring the beautiful Mekong from Phnom Penh, Cambodia to Ho Chi Minh City, Vietnam.",
    fullDescription: `
      <h3>Cross-Border Mekong Adventure</h3>
      <p>Embark on a unique journey that begins in Cambodia's capital, Phnom Penh, and ends in Vietnam's bustling Ho Chi Minh City. This 3-day cruise follows the mighty Mekong River as it flows from Cambodia into Vietnam, offering a fascinating glimpse into two distinct cultures.</p>

      <h3>Two Countries, One River</h3>
      <p>Experience the Mekong River from a different perspective as you cross international borders by water. Visit both Cambodian and Vietnamese floating markets, explore temples and pagodas, and witness how river life differs between the two nations.</p>

      <h3>Cross-Border Highlights</h3>
      <ul>
        <li>Start in Phnom Penh, end in Saigon</li>
        <li>Cross international border by river</li>
        <li>Visit both Cambodian and Vietnamese markets</li>
        <li>Explore temples and pagodas in both countries</li>
        <li>Experience two distinct cultures</li>
        <li>Sampan boat rides in Vietnam</li>
        <li>Comfortable cabin with all meals included</li>
        <li>Visa assistance provided</li>
      </ul>
    `,
    highlights: ["Cross-border journey", "Phnom Penh start", "Cultural immersion", "River adventure"],
    itinerary: [
      {
        day: 1,
        title: "Phnom Penh - Cambodia",
        description: "Begin your cross-border journey",
        activities: [
          "8:00 AM - Explore Phnom Penh markets",
          "10:00 AM - Visit Royal Palace or Genocide Museum (optional)",
          "12:00 PM - Board cruise at Phnom Penh pier",
          "1:00 PM - Lunch while cruising south",
          "3:00 PM - Visit Cambodian silk weaving village",
          "5:00 PM - Sunset on Mekong River",
          "7:00 PM - Dinner with Cambodian-Vietnamese fusion"
        ],
        meals: ["Lunch", "Dinner"]
      },
      {
        day: 2,
        title: "Border Crossing",
        description: "From Cambodia to Vietnam",
        activities: [
          "7:00 AM - Breakfast",
          "8:00 AM - Border crossing formalities",
          "10:00 AM - Enter Vietnam waters",
          "11:00 AM - Visit Vietnamese floating market",
          "12:30 PM - Lunch",
          "2:00 PM - Sampan ride through canals",
          "4:00 PM - Visit fruit orchard",
          "6:00 PM - Vietnamese cooking class",
          "7:30 PM - Dinner"
        ],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 3,
        title: "Arrival in Saigon",
        description: "Final day cruising to Ho Chi Minh City",
        activities: [
          "6:30 AM - Tai Chi on deck",
          "7:00 AM - Breakfast",
          "8:00 AM - Visit local market",
          "10:00 AM - Brunch and check-out",
          "12:00 PM - Disembark near Saigon",
          "Transfer to your Saigon hotel"
        ],
        meals: ["Breakfast", "Brunch"]
      }
    ],
    included: [
      "2 nights accommodation on cruise",
      "All meals and soft drinks",
      "English-speaking guide",
      "Border crossing assistance",
      "All activities and entrance fees",
      "Sampan boat rides",
      "Cooking class",
      "Transfer to Saigon hotel"
    ],
    excluded: [
      "Visa fees (Cambodia and Vietnam)",
      "Transfer from Phnom Penh hotel to pier",
      "Alcoholic beverages",
      "Tips and personal expenses",
      "Optional Phnom Penh sightseeing",
      "Travel insurance"
    ],
    imageUrl: "/tours/cambodia-vietnam.jpg",
    affiliateUrl: "https://www.vietnamtourbooking.com/cruise/3-day-mekong-eyes-cruise-cambodia-vietnam",
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
