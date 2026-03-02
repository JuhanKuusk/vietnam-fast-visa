/**
 * Tour data for vietnamtravel.help
 *
 * SUPPLIERS/PARTNERS:
 * 1. halong-bay-tours.com - 8 cruise tours (Halong Bay & Mekong)
 *    Contact: via website
 *
 * 2. asiatouradvisor.com - All other tours (~65 tours)
 *    Contact: help@asiatouradvisor.com
 *    Main supplier for day trips, multi-day tours, and packages
 *
 * NOTE: affiliateUrl field is for internal tracking only - NOT shown to customers.
 * Customers see internal URLs like /cruise/[slug]
 */

import type { Tour, ItineraryDay } from "@/types/tours";

export const FEATURED_TOURS: Tour[] = [
  // ============================================
  // HALONG-BAY-TOURS.COM CRUISES (8 tours)
  // ============================================
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
    affiliateUrl: "/cruise/halong-day-trip-sung-sot-titop",
    durationHours: 10,
    startCity: "Hanoi",
    destinations: ["Halong Bay"],
    activities: ["nature", "cultural", "photography"],
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
    affiliateUrl: "/cruise/serenity-cruise-2-days-1-night",
    durationHours: 48,
    startCity: "Hanoi",
    destinations: ["Halong Bay"],
    activities: ["cruise", "kayaking", "cave-exploration"],
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
    affiliateUrl: "/cruise/lan-ha-bay-luxury-day-tour",
    durationHours: 10,
    startCity: "Hanoi",
    destinations: ["Lan Ha Bay"],
    activities: ["nature", "cultural", "photography"],
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
    affiliateUrl: "/cruise/renea-cruise-2-days-1-night",
    durationHours: 48,
    startCity: "Hanoi",
    destinations: ["Bai Tu Long Bay"],
    activities: ["cruise", "kayaking", "cave-exploration"],
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
    affiliateUrl: "/cruise/mekong-eyes-cruise-2-days",
    durationHours: 48,
    startCity: "Ho Chi Minh City",
    destinations: ["Mekong Delta", "Can Tho", "Ben Tre"],
    activities: ["cruise", "kayaking", "cave-exploration"],
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
    affiliateUrl: "/cruise/mekong-eyes-cruise-3-days",
    durationHours: 72,
    startCity: "Ho Chi Minh City",
    destinations: ["Mekong Delta", "Can Tho", "Ben Tre"],
    activities: ["cultural", "nature", "trekking"],
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
    affiliateUrl: "/cruise/gecko-eyes-cruise-2-days",
    durationHours: 48,
    startCity: "Ho Chi Minh City",
    destinations: ["Mekong Delta"],
    activities: ["cruise", "kayaking", "cave-exploration"],
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
    affiliateUrl: "/cruise/cambodia-vietnam-cruise-3-days",
    durationHours: 72,
    startCity: "Ho Chi Minh City",
    destinations: ["Cambodia", "Mekong Delta"],
    activities: ["cultural", "nature", "trekking"],
  },

  // ============================================
  // ASIATOURADVISOR.COM TOURS (~65 tours)
  // Contact: help@asiatouradvisor.com
  // ============================================

  // Halong Bay Day Trips
  {
    id: "halong-2d1n-cruise",
    slug: "halong-bay-2-days-1-night-cruise",
    name: "Halong Bay 2 Days 1 Night Cruise",
    category: "cruise",
    location: "Halong Bay",
    duration: "2 days, 1 night",
    price: 129,
    originalPrice: 159,
    discount: 19,
    description: "Classic overnight cruise in Halong Bay. Explore caves, kayak through emerald waters, and enjoy sunset on the bay.",
    fullDescription: `
      <h3>Classic Halong Bay Overnight Experience</h3>
      <p>This 2-day, 1-night cruise offers the perfect introduction to Halong Bay's stunning beauty. Spend a night on a traditional wooden junk boat surrounded by thousands of limestone karsts.</p>
      <h3>Highlights</h3>
      <ul>
        <li>Cruise through the heart of Halong Bay</li>
        <li>Visit Sung Sot (Surprise) Cave</li>
        <li>Kayaking in secluded lagoons</li>
        <li>Sunset views and stargazing</li>
        <li>Fresh seafood dinner on board</li>
      </ul>
    `,
    highlights: ["Overnight cruise", "Cave exploration", "Kayaking", "Sunset viewing"],
    included: ["Cabin accommodation", "All meals", "Kayaking", "Cave entrance", "Guide"],
    excluded: ["Drinks", "Tips", "Transfer from Hanoi"],
    imageUrl: "/tours/halong-2d1n-cruise.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/halong-bay-2-days-1-night-cruise/",
    durationHours: 36,
    startCity: "Hanoi",
    destinations: ["Halong Bay"],
    activities: ["cruise", "kayaking", "cave-exploration"],
  },
  {
    id: "halong-luxury-cruise",
    slug: "halong-bay-luxury-cruise",
    name: "Halong Bay Luxury Cruise 2D1N",
    category: "cruise",
    location: "Halong Bay",
    duration: "2 days, 1 night",
    price: 245,
    originalPrice: 299,
    discount: 18,
    description: "5-star luxury cruise experience in Halong Bay with premium cabins, gourmet dining, and exclusive activities.",
    fullDescription: `
      <h3>Luxury Halong Bay Experience</h3>
      <p>Experience Halong Bay in ultimate comfort aboard our 5-star luxury cruise. Enjoy spacious suites, gourmet cuisine, and personalized service while exploring UNESCO World Heritage waters.</p>
      <h3>Luxury Features</h3>
      <ul>
        <li>Premium suite with private balcony</li>
        <li>5-course gourmet dinner</li>
        <li>Complimentary spa massage</li>
        <li>Private beach access</li>
        <li>Champagne sunset cruise</li>
      </ul>
    `,
    highlights: ["5-star cruise", "Premium cabins", "Gourmet dining", "Spa included"],
    included: ["Luxury cabin", "All gourmet meals", "Spa treatment", "All activities", "Transfer"],
    excluded: ["Premium wines", "Tips"],
    imageUrl: "/tours/halong-luxury-cruise.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/halong-bay-luxury-cruise/",
    durationHours: 36,
    startCity: "Hanoi",
    destinations: ["Halong Bay"],
    activities: ["cruise", "kayaking", "cave-exploration", "beach"],
  },
  {
    id: "lan-ha-2d1n",
    slug: "lan-ha-bay-2-days-1-night",
    name: "Lan Ha Bay 2 Days 1 Night",
    category: "cruise",
    location: "Lan Ha Bay",
    duration: "2 days, 1 night",
    price: 159,
    originalPrice: 189,
    discount: 16,
    description: "Explore the pristine Lan Ha Bay, less crowded than Halong Bay, with crystal clear waters and untouched islands.",
    fullDescription: `
      <h3>Discover Lan Ha Bay's Hidden Beauty</h3>
      <p>Lan Ha Bay is Halong Bay's quieter sister, offering the same stunning limestone karsts but with clearer waters and fewer tourists. This 2-day cruise takes you to the bay's most scenic spots.</p>
      <h3>Why Lan Ha Bay</h3>
      <ul>
        <li>Less crowded than Halong Bay</li>
        <li>Crystal clear waters for swimming</li>
        <li>Visit Cat Ba Island</li>
        <li>Kayak through floating villages</li>
        <li>Better snorkeling opportunities</li>
      </ul>
    `,
    highlights: ["Less crowded", "Crystal clear waters", "Cat Ba Island", "Floating villages"],
    included: ["Cabin accommodation", "All meals", "Kayaking", "Guide", "Cat Ba visit"],
    excluded: ["Drinks", "Tips", "Transfer"],
    imageUrl: "/tours/lan-ha-2d1n.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/lan-ha-bay-2-days-1-night/",
    durationHours: 36,
    startCity: "Hanoi",
    destinations: ["Lan Ha Bay"],
    activities: ["cruise", "kayaking", "beach", "nature"],
  },
  {
    id: "bai-tu-long-2d1n",
    slug: "bai-tu-long-bay-2-days-1-night",
    name: "Bai Tu Long Bay 2 Days 1 Night",
    category: "cruise",
    location: "Bai Tu Long Bay",
    duration: "2 days, 1 night",
    price: 139,
    originalPrice: 169,
    discount: 18,
    description: "Escape the crowds in Bai Tu Long Bay, featuring pristine waters, untouched caves, and authentic fishing villages.",
    fullDescription: `
      <h3>Bai Tu Long Bay - The Untouched Paradise</h3>
      <p>Bai Tu Long Bay offers a more authentic experience with fewer tourists and pristine natural beauty. Explore hidden caves, visit traditional fishing villages, and swim in crystal-clear waters.</p>
    `,
    highlights: ["Off the beaten path", "Pristine waters", "Traditional villages", "Authentic experience"],
    included: ["Cabin", "All meals", "Activities", "Guide"],
    excluded: ["Drinks", "Tips", "Transfer from Hanoi"],
    imageUrl: "/tours/bai-tu-long-2d1n.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/bai-tu-long-bay-cruise/",
    durationHours: 36,
    startCity: "Hanoi",
    destinations: ["Bai Tu Long Bay"],
    activities: ["cruise", "kayaking", "cave-exploration"],
  },

  // Day Trips from Hanoi
  {
    id: "ninh-binh-day",
    slug: "ninh-binh-day-trip",
    name: "Ninh Binh Day Trip from Hanoi",
    category: "day-trip",
    location: "Ninh Binh",
    duration: "1 day",
    price: 45,
    originalPrice: 55,
    discount: 18,
    description: "Explore 'Halong Bay on Land' with stunning limestone karsts, ancient temples, and peaceful boat rides through rice paddies.",
    fullDescription: `
      <h3>Discover Ninh Binh - Halong Bay on Land</h3>
      <p>Known as 'Halong Bay on Land', Ninh Binh features dramatic limestone karsts rising from lush green rice paddies. Visit ancient temples, take a peaceful boat ride through Trang An, and explore the historic Hoa Lu capital.</p>
    `,
    highlights: ["Trang An boat ride", "Hoa Lu temples", "Mua Cave viewpoint", "Rice paddies"],
    included: ["Transport", "Lunch", "Boat ride", "Entrance fees", "Guide"],
    excluded: ["Drinks", "Tips"],
    imageUrl: "/tours/ninh-binh-day.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/ninh-binh-day-trip/",
    durationHours: 10,
    startCity: "Hanoi",
    destinations: ["Ninh Binh"],
    activities: ["boat-trip", "cultural", "photography", "nature"],
  },
  {
    id: "sapa-trekking",
    slug: "sapa-trekking-2-days",
    name: "Sapa Trekking 2 Days 1 Night",
    category: "multi-day",
    location: "Sapa",
    duration: "2 days, 1 night",
    price: 85,
    originalPrice: 99,
    discount: 14,
    description: "Trek through stunning rice terraces, visit hill tribe villages, and experience authentic homestay with local families.",
    fullDescription: `
      <h3>Sapa Trekking Adventure</h3>
      <p>Immerse yourself in the stunning landscapes of Sapa, trekking through terraced rice fields and visiting traditional H'mong and Dzao villages. Stay overnight with a local family for an authentic cultural experience.</p>
    `,
    highlights: ["Rice terrace trekking", "Hill tribe villages", "Homestay experience", "Local cuisine"],
    included: ["Transport", "Homestay", "Meals", "Trekking guide", "Entrance fees"],
    excluded: ["Drinks", "Tips", "Personal expenses"],
    imageUrl: "/tours/sapa-trekking.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/sapa-trekking/",
    durationHours: 36,
    startCity: "Hanoi",
    destinations: ["Sapa"],
    activities: ["trekking", "homestay", "cultural", "photography"],
  },
  {
    id: "hanoi-2days",
    slug: "hanoi-city-tour-2-days",
    name: "Hanoi City Tour 2 Days",
    category: "multi-day",
    location: "Hanoi",
    duration: "2 days",
    price: 65,
    originalPrice: 79,
    discount: 18,
    description: "Comprehensive Hanoi exploration covering Old Quarter, temples, museums, street food, and hidden gems.",
    fullDescription: `
      <h3>Complete Hanoi Experience</h3>
      <p>Discover Hanoi's rich history and vibrant culture over two days. Explore the atmospheric Old Quarter, visit ancient temples, sample famous street food, and uncover the city's hidden gems with a local guide.</p>
    `,
    highlights: ["Old Quarter", "Temple of Literature", "Ho Chi Minh Mausoleum", "Street food tour"],
    included: ["Hotel", "Meals", "Guide", "Entrance fees", "Cyclo ride"],
    excluded: ["Drinks", "Tips"],
    imageUrl: "/tours/hanoi-2days.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/hanoi-city-tour/",
    durationHours: 48,
    startCity: "Hanoi",
    destinations: ["Ninh Binh"],
    activities: ["city-tour", "cultural", "food-tour"],
  },
  {
    id: "hanoi-3days",
    slug: "hanoi-3-days-tour",
    name: "Hanoi 3 Days Discovery",
    category: "multi-day",
    location: "Hanoi",
    duration: "3 days",
    price: 95,
    originalPrice: 115,
    discount: 17,
    description: "In-depth Hanoi experience with day trips to surrounding attractions including Bat Trang ceramic village.",
    fullDescription: `
      <h3>Hanoi and Surroundings 3-Day Adventure</h3>
      <p>Spend three days exploring Hanoi and its surroundings. Visit all major attractions, take day trips to Bat Trang ceramic village and other nearby gems, and experience authentic local life.</p>
    `,
    highlights: ["Complete city tour", "Bat Trang village", "Water puppet show", "Cooking class"],
    included: ["Hotel", "All meals", "Guide", "Entrance fees", "Activities"],
    excluded: ["Drinks", "Tips"],
    imageUrl: "/tours/hanoi-3days.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/hanoi-3-days/",
    durationHours: 72,
    startCity: "Hanoi",
    destinations: ["Ninh Binh"],
    activities: ["city-tour", "cultural", "food-tour", "cooking-class"],
  },
  {
    id: "hanoi-4days",
    slug: "hanoi-4-days-tour",
    name: "Hanoi 4 Days Complete",
    category: "multi-day",
    location: "Hanoi & surroundings",
    duration: "4 days",
    price: 145,
    originalPrice: 175,
    discount: 17,
    description: "Ultimate Hanoi package with day trips to Ninh Binh and Perfume Pagoda for complete northern Vietnam experience.",
    fullDescription: `
      <h3>Complete Northern Vietnam from Hanoi</h3>
      <p>The ultimate Hanoi experience over four days, including day trips to Ninh Binh and Perfume Pagoda. Experience everything the capital region has to offer.</p>
    `,
    highlights: ["Hanoi highlights", "Ninh Binh day trip", "Perfume Pagoda", "Cooking class"],
    included: ["Hotel", "All meals", "Guide", "All transportation", "Entrance fees"],
    excluded: ["Drinks", "Tips"],
    imageUrl: "/tours/hanoi-4days.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/hanoi-4-days/",
    durationHours: 96,
    startCity: "Hanoi",
    destinations: ["Ninh Binh"],
    activities: ["city-tour", "cultural", "boat-trip", "nature"],
  },

  // Mekong Delta Day Trips
  {
    id: "mekong-4days",
    slug: "mekong-delta-4-days",
    name: "Mekong Delta 4 Days Exploration",
    category: "multi-day",
    location: "Mekong Delta",
    duration: "4 days, 3 nights",
    price: 285,
    originalPrice: 339,
    discount: 16,
    description: "Comprehensive Mekong Delta exploration visiting floating markets, fruit orchards, and traditional villages.",
    fullDescription: `
      <h3>Ultimate Mekong Delta Experience</h3>
      <p>Spend four days exploring the Mekong Delta's waterways, floating markets, and traditional villages. This comprehensive tour covers the delta's highlights from Can Tho to Ben Tre.</p>
    `,
    highlights: ["Cai Rang floating market", "Ben Tre coconut village", "Homestay", "Cycling tours"],
    included: ["Hotels/Homestay", "All meals", "Boat trips", "Guide", "All activities"],
    excluded: ["Drinks", "Tips"],
    imageUrl: "/tours/mekong-4days.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/mekong-delta-4-days/",
    durationHours: 96,
    startCity: "Ho Chi Minh City",
    destinations: ["Mekong Delta", "Can Tho", "Ben Tre"],
    activities: ["boat-trip", "cycling", "cultural", "homestay"],
  },
  {
    id: "mekong-3days",
    slug: "mekong-delta-3-days",
    name: "Mekong Delta 3 Days",
    category: "multi-day",
    location: "Mekong Delta",
    duration: "3 days, 2 nights",
    price: 189,
    originalPrice: 225,
    discount: 16,
    description: "Three-day journey through the Mekong Delta visiting Cai Rang market, coconut villages, and local workshops.",
    fullDescription: `
      <h3>Mekong Delta 3-Day Journey</h3>
      <p>A perfect balance of time and experience in the Mekong Delta. Visit the famous Cai Rang floating market, explore coconut villages in Ben Tre, and experience local life.</p>
    `,
    highlights: ["Cai Rang market", "Coconut workshops", "Sampan rides", "Local homestay"],
    included: ["Accommodation", "All meals", "Boat trips", "Guide", "Activities"],
    excluded: ["Drinks", "Tips"],
    imageUrl: "/tours/mekong-3days.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/mekong-delta-3-days/",
    durationHours: 72,
    startCity: "Ho Chi Minh City",
    destinations: ["Mekong Delta", "Can Tho", "Ben Tre"],
    activities: ["boat-trip", "cultural", "nature"],
  },
  {
    id: "mekong-homestay",
    slug: "mekong-homestay-experience",
    name: "Mekong Delta Homestay 2 Days",
    category: "multi-day",
    location: "Mekong Delta",
    duration: "2 days, 1 night",
    price: 89,
    originalPrice: 109,
    discount: 18,
    description: "Authentic Mekong experience staying with local family, learning traditional cooking, and exploring by bicycle.",
    fullDescription: `
      <h3>Authentic Mekong Homestay</h3>
      <p>Experience the real Mekong Delta by staying with a local family. Learn traditional cooking, cycle through villages, and participate in daily life activities.</p>
    `,
    highlights: ["Authentic homestay", "Cooking class", "Cycling", "Floating market visit"],
    included: ["Homestay", "Meals", "Cooking class", "Bicycle", "Guide"],
    excluded: ["Drinks", "Tips"],
    imageUrl: "/tours/mekong-homestay.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/mekong-homestay/",
    durationHours: 36,
    startCity: "Ho Chi Minh City",
    destinations: ["Mekong Delta", "Ben Tre"],
    activities: ["homestay", "cooking-class", "cycling", "cultural"],
  },
  {
    id: "mekong-ben-tre-eco",
    slug: "mekong-ben-tre-eco-tour",
    name: "Ben Tre Eco Tour Day Trip",
    category: "day-trip",
    location: "Ben Tre, Mekong Delta",
    duration: "1 day",
    price: 45,
    originalPrice: 55,
    discount: 18,
    description: "Eco-friendly day trip exploring Ben Tre's coconut kingdom with sampan rides, village visits, and local food tasting.",
    fullDescription: `
      <h3>Ben Tre Coconut Kingdom Day Trip</h3>
      <p>Discover Ben Tre, the 'Coconut Kingdom' of Vietnam, on this eco-friendly day trip. Explore narrow canals by sampan, visit coconut workshops, and taste fresh tropical fruits.</p>
    `,
    highlights: ["Coconut workshops", "Sampan rides", "Fruit tasting", "Local villages"],
    included: ["Transport", "Boat rides", "Lunch", "Fruit tasting", "Guide"],
    excluded: ["Drinks", "Tips"],
    imageUrl: "/tours/mekong-ben-tre-eco.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/ben-tre-day-trip/",
    durationHours: 10,
    startCity: "Ho Chi Minh City",
    destinations: ["Mekong Delta", "Ben Tre"],
    activities: ["boat-trip", "nature", "cultural"],
  },
  {
    id: "mekong-cycling-2d",
    slug: "mekong-cycling-adventure",
    name: "Mekong Cycling Adventure 2 Days",
    category: "multi-day",
    location: "Mekong Delta",
    duration: "2 days, 1 night",
    price: 99,
    originalPrice: 119,
    discount: 17,
    description: "Active Mekong exploration by bicycle, riding through villages, rice paddies, and along scenic riverbanks.",
    fullDescription: `
      <h3>Cycle Through the Mekong Delta</h3>
      <p>Experience the Mekong Delta by bicycle, the best way to explore villages, rice paddies, and scenic riverbanks. Suitable for all fitness levels with comfortable bikes provided.</p>
    `,
    highlights: ["Cycling through villages", "Rice paddy views", "Local interactions", "Floating market"],
    included: ["Bicycle", "Homestay", "Meals", "Guide", "Support vehicle"],
    excluded: ["Drinks", "Tips"],
    imageUrl: "/tours/mekong-cycling-2d.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/mekong-cycling/",
    durationHours: 36,
    startCity: "Ho Chi Minh City",
    destinations: ["Mekong Delta"],
    activities: ["cycling", "cultural", "homestay"],
  },
  {
    id: "ben-tre-day",
    slug: "ben-tre-day-trip",
    name: "Ben Tre Day Trip",
    category: "day-trip",
    location: "Ben Tre",
    duration: "1 day",
    price: 39,
    originalPrice: 49,
    discount: 20,
    description: "Visit Ben Tre province, famous for coconut candy, sampan rides through narrow canals, and tropical fruit orchards.",
    fullDescription: `
      <h3>Ben Tre - Land of Coconuts</h3>
      <p>A perfect day trip to Ben Tre, exploring the coconut candy factories, riding sampans through narrow waterways, and visiting tropical fruit orchards.</p>
    `,
    highlights: ["Coconut candy factory", "Sampan ride", "Fruit orchard", "Local lunch"],
    included: ["Transport", "Boat rides", "Lunch", "Guide", "Entrance fees"],
    excluded: ["Drinks", "Tips"],
    imageUrl: "/tours/ben-tre-day.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/ben-tre-day/",
    durationHours: 9,
    startCity: "Ho Chi Minh City",
    destinations: ["Mekong Delta", "Ben Tre"],
    activities: ["boat-trip", "cultural", "nature"],
  },
  {
    id: "cu-chi-half-day",
    slug: "cu-chi-tunnels-half-day",
    name: "Cu Chi Tunnels Half Day Tour",
    category: "day-trip",
    location: "Cu Chi",
    duration: "Half day",
    price: 29,
    originalPrice: 35,
    discount: 17,
    description: "Explore the famous Cu Chi Tunnels, an underground network used during the Vietnam War, with expert historical guide.",
    fullDescription: `
      <h3>Cu Chi Tunnels Historical Tour</h3>
      <p>Discover the incredible Cu Chi Tunnels, a vast underground network used during the Vietnam War. Learn about Vietnamese history and resilience from expert guides.</p>
    `,
    highlights: ["Tunnel exploration", "War history", "Shooting range option", "Local lunch"],
    included: ["Transport", "Entrance fee", "Guide", "Water"],
    excluded: ["Lunch", "Shooting range", "Tips"],
    imageUrl: "/tours/cu-chi-half-day.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/cu-chi-tunnels/",
    durationHours: 5,
    startCity: "Ho Chi Minh City",
    destinations: ["Cu Chi"],
    activities: ["cultural", "nature"],
  },

  // Central Vietnam Tours
  {
    id: "central-vietnam-5d",
    slug: "central-vietnam-5-days",
    name: "Central Vietnam 5 Days",
    category: "multi-day",
    location: "Hue - Hoi An - Da Nang",
    duration: "5 days, 4 nights",
    price: 345,
    originalPrice: 415,
    discount: 17,
    description: "Explore Central Vietnam's UNESCO heritage sites including Imperial Hue, ancient Hoi An, and beautiful Da Nang beaches.",
    fullDescription: `
      <h3>Central Vietnam Heritage Trail</h3>
      <p>Journey through Central Vietnam's most iconic destinations. Explore the Imperial City of Hue, the ancient trading port of Hoi An, and the stunning beaches of Da Nang.</p>
    `,
    highlights: ["Hue Imperial City", "Hoi An Ancient Town", "My Son Sanctuary", "Da Nang beaches"],
    included: ["Hotels", "All meals", "Transport", "Guide", "Entrance fees"],
    excluded: ["Drinks", "Tips"],
    imageUrl: "/tours/central-vietnam-5d.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/central-vietnam-5-days/",
    itinerary: [
        {
          day: 1,
          title: "Da Nang Arrival - Da Nang",
          description: "Morning\n\nBestPrice tour guide will warmly welcome you at Da Nang International Airport, and then transfer you to your hotel in Da Nang. Check in at your hotel and relax before the fascinating food tour in the evening. Evening\n\nDeparture Time: 17:00\n\nDuration: 2.5 hours\n\nDistance: 3 km\n\nYour evening begins in the heart of Da Nang near the Dragon Bridge, where your friendly local guide will meet you and introduce the city’s vibrant food scene. After a quick orientation, set off on foot to discover Da Nang’s hidden food gems - from bustling street stalls to cozy local eateries that few tourists e",
          activities: [],
          meals: ["Dinner"],
          accommodation: "Hotel in Da Nang",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68f7543133f4c.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68f7543133f4c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68f7543133f4a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/68f7543133f4a.jpg"],
        },
        {
          day: 2,
          title: "Ba Na Hills Full-Day Tour",
          description: "Morning\n\nAfter breakfast, our tour guide will pick you up from the hotel and transfer you to Ba Na Hills, one of the best amusement parks in Vietnam. Check-in at the Suoi Mo Cable Car Station and transfer to Marseille Station. Visit Golden Bridge, also known as the \"Hands of God.\" Marvel at its impressive architectural design and breathtaking views of the surrounding landscape. Immerse yourself in the romantic ambiance of Le Jardin D'Amour to explore the beautifully landscaped gardens and enjoy the serene atmosphere. Optionally, visit the Debay Wine Cellar (an additional fee may apply) to indu",
          activities: [],
          meals: ["Breakfast","Lunch"],
          accommodation: "Hotel in Da Nang",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660fac4a9a1f3.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660fac4a9a1f3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667b89f243f4d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660fac4a9a1ee.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667b8a03a9ecd.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/660fac4a9a1f3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/660fac4a9a1f2.jpg"],
        },
        {
          day: 3,
          title: "Da Nang - Hue City Full Day",
          description: "07:00 – 07:30 Our car and guide will pick you up at your hotel in Hoi An. Guests in Da Nang will be collected between 08:00 – 08:30. Begin the scenic drive to Hue along one of the most stunning coastal routes in the world – the Hai Van Pass. This winding road offers dramatic mountain views on one side and sweeping ocean vistas on the other. 11:00 Visit the impressive Khai Dinh Tomb, the final resting place of Emperor Khai Dinh",
          activities: [],
          meals: ["Breakfast","Lunch"],
          accommodation: "Hotel in Da Nang",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c29f2bd0920.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c29f2bd0920.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c29f2bd0923.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c29f563b424.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c29f563b426.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c29f563b427.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/68c29f563b424.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/68c29f2bd0920.jpg"],
        },
        {
          day: 4,
          title: "Da Nang – Coconut Forest – Hoi An Full Day Tour",
          description: "Morning\n\n07:00 – 07:30 Our driver and tour guide will pick you up from your hotel or designated meeting point to begin an exciting day of exploration. Your first destination is the Son Tra Peninsula, also known as Monkey Mountain by American troops. Rising 693 meters above sea level, this lush national park offers breathtaking panoramic views of the sea and Da Nang city. Here, you will visit Linh Ung Pagoda, home to the tallest Lady Buddha statue in Southeast Asia. The 67-meter-high statue stands gracefully atop a lotus-shaped platform and is adorned with 21 miniature Buddha figures – a truly",
          activities: [],
          meals: ["Breakfast","Lunch","Dinner"],
          accommodation: "Hotel in Da Nang",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c29f2bd0924.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c29f2bd0924.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c29f2bd0925.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c29f8411567.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c29f841156a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c29f841156b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c29f841156c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/68c29f2bd0925.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/68c29f8411567.jpg"],
        },
        {
          day: 5,
          title: "Da Nang Departure",
          description: "Enjoy breakfast at the hotel. Then you will have free time until the transfer to the airport for your flight home. End of the tour. We hope to see you on our next journey!",
          activities: [],
          meals: ["Breakfast"],
        },
      ],
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/678f556ca6cce.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68f7543133f4c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68f7543133f4a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660fac4a9a1f3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667b89f243f4d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660fac4a9a1ee.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667b8a03a9ecd.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c29f2bd0920.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c29f2bd0923.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c29f563b424.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c29f563b426.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c29f563b427.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c29f2bd0924.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c29f2bd0925.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c29f8411567.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c29f841156a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c29f841156b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c29f841156c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/69411fe46314b.png","https://d122axpxm39woi.cloudfront.net/images/tours/origin/68f7543133f4a.jpg"],
    pricingTiers: [{"category":"Superior (3*)","price":369},{"category":"First Class (4*)","price":419},{"category":"Deluxe (5*)","price":569}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 120,
    startCity: "Da Nang",
    destinations: ["Hue", "Hoi An", "Da Nang"],
    activities: ["cultural", "beach", "photography", "city-tour"],
  },
  {
    id: "danang-4days",
    slug: "danang-hoi-an-4-days",
    name: "Da Nang & Hoi An 4 Days",
    category: "multi-day",
    location: "Da Nang - Hoi An",
    duration: "4 days, 3 nights",
    price: 275,
    originalPrice: 329,
    discount: 16,
    description: "Beach relaxation meets cultural exploration with Da Nang's beautiful coastline and Hoi An's ancient charm.",
    fullDescription: `
      <h3>Da Nang and Hoi An Discovery</h3>
      <p>Combine beach relaxation in Da Nang with cultural exploration in ancient Hoi An. Visit Ba Na Hills, explore the ancient town, and enjoy pristine beaches.</p>
    `,
    highlights: ["Ba Na Hills", "Hoi An Ancient Town", "My Khe Beach", "Marble Mountains"],
    included: ["Hotels", "Meals", "Transport", "Guide", "Ba Na Hills ticket"],
    excluded: ["Drinks", "Tips", "Tailoring"],
    imageUrl: "/tours/danang-4days.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/danang-hoi-an-4-days/",
    durationHours: 96,
    startCity: "Da Nang",
    destinations: ["Da Nang", "Hoi An"],
    activities: ["beach", "cultural", "photography"],
  },

  // Sapa & Northern Vietnam
  {
    id: "sapa-muong-hoa",
    slug: "sapa-muong-hoa-valley",
    name: "Sapa Muong Hoa Valley Trek",
    category: "multi-day",
    location: "Sapa",
    duration: "2 days, 1 night",
    price: 79,
    originalPrice: 95,
    discount: 17,
    description: "Trek through the beautiful Muong Hoa Valley with terraced rice fields, waterfalls, and ethnic minority villages.",
    fullDescription: `
      <h3>Muong Hoa Valley Trekking</h3>
      <p>Trek through one of Vietnam's most scenic valleys, featuring stunning terraced rice fields, waterfalls, and visits to H'mong and Dzao villages.</p>
    `,
    highlights: ["Muong Hoa Valley", "Rice terraces", "Ethnic villages", "Waterfall visit"],
    included: ["Homestay", "Meals", "Trekking guide", "Entrance fees"],
    excluded: ["Transport to Sapa", "Drinks", "Tips"],
    imageUrl: "/tours/sapa-muong-hoa.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/sapa-muong-hoa-valley/",
    durationHours: 36,
    startCity: "Sapa",
    destinations: ["Sapa"],
    activities: ["trekking", "homestay", "cultural", "photography"],
  },
  {
    id: "sapa-off-beaten",
    slug: "sapa-off-beaten-track",
    name: "Sapa Off the Beaten Track 3 Days",
    category: "multi-day",
    location: "Sapa",
    duration: "3 days, 2 nights",
    price: 129,
    originalPrice: 155,
    discount: 17,
    description: "Explore lesser-known Sapa trails, remote villages, and pristine landscapes away from tourist crowds.",
    fullDescription: `
      <h3>Sapa's Hidden Trails</h3>
      <p>Venture off the beaten path to discover Sapa's most remote and beautiful areas. Stay in traditional homestays and experience authentic mountain life.</p>
    `,
    highlights: ["Remote villages", "Pristine landscapes", "Traditional homestays", "Local culture"],
    included: ["Homestays", "All meals", "Guide", "Activities"],
    excluded: ["Transport to Sapa", "Drinks", "Tips"],
    imageUrl: "/tours/sapa-off-beaten.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/sapa-off-beaten-track/",
    durationHours: 72,
    startCity: "Sapa",
    destinations: ["Sapa"],
    activities: ["trekking", "homestay", "cultural", "nature"],
  },
  {
    id: "northern-vietnam-5d",
    slug: "northern-vietnam-5-days",
    name: "Northern Vietnam 5 Days",
    category: "multi-day",
    location: "Hanoi - Sapa - Halong",
    duration: "5 days, 4 nights",
    price: 395,
    originalPrice: 475,
    discount: 17,
    description: "Comprehensive Northern Vietnam tour covering Hanoi, Sapa rice terraces, and Halong Bay cruise.",
    fullDescription: `
      <h3>Northern Vietnam Complete Experience</h3>
      <p>Experience the best of Northern Vietnam in 5 days. Explore Hanoi's Old Quarter, trek through Sapa's rice terraces, and cruise Halong Bay's emerald waters.</p>
    `,
    highlights: ["Hanoi Old Quarter", "Sapa terraces", "Halong Bay cruise", "Hill tribe villages"],
    included: ["Hotels/Homestay", "All meals", "Transport", "Guide", "Cruise cabin"],
    excluded: ["Drinks", "Tips"],
    imageUrl: "/tours/northern-vietnam-5d.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/northern-vietnam-5-days/",
    durationHours: 120,
    startCity: "Hanoi",
    destinations: ["Sapa", "Halong Bay", "Ninh Binh"],
    activities: ["cruise", "trekking", "cultural", "photography"],
  },
  {
    id: "pu-luong-trek",
    slug: "pu-luong-trekking",
    name: "Pu Luong Nature Reserve Trek",
    category: "multi-day",
    location: "Pu Luong",
    duration: "2 days, 1 night",
    price: 95,
    originalPrice: 115,
    discount: 17,
    description: "Trek through Pu Luong Nature Reserve with stunning terraced rice fields, waterfalls, and Thai ethnic villages.",
    fullDescription: `
      <h3>Pu Luong Trekking Adventure</h3>
      <p>Discover Pu Luong Nature Reserve, a hidden gem with dramatic rice terraces, pristine forests, and traditional Thai villages. Perfect for nature lovers seeking authentic experiences.</p>
    `,
    highlights: ["Rice terraces", "Waterfalls", "Thai villages", "Pristine nature"],
    included: ["Homestay", "Meals", "Guide", "Entrance fees"],
    excluded: ["Transport to Pu Luong", "Drinks", "Tips"],
    imageUrl: "/tours/pu-luong-trek.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/pu-luong-trekking/",
    durationHours: 36,
    startCity: "Hanoi",
    destinations: ["Pu Luong", "Mai Chau"],
    activities: ["trekking", "homestay", "nature", "photography"],
  },
  {
    id: "hanoi-halong-4d",
    slug: "hanoi-halong-4-days",
    name: "Hanoi & Halong Bay 4 Days",
    category: "multi-day",
    location: "Hanoi - Halong Bay",
    duration: "4 days, 3 nights",
    price: 289,
    originalPrice: 349,
    discount: 17,
    description: "Perfect combination of Hanoi city exploration and overnight Halong Bay cruise experience.",
    fullDescription: `
      <h3>Hanoi and Halong Bay Package</h3>
      <p>The perfect introduction to Northern Vietnam combining Hanoi's cultural treasures with an overnight cruise on stunning Halong Bay.</p>
    `,
    highlights: ["Hanoi Old Quarter", "Temple of Literature", "Halong Bay cruise", "Cave exploration"],
    included: ["Hotels", "Cruise cabin", "Meals", "Transport", "Guide"],
    excluded: ["Drinks", "Tips"],
    imageUrl: "/tours/hanoi-halong-4d.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/hanoi-halong-4-days/",
    durationHours: 96,
    startCity: "Hanoi",
    destinations: ["Halong Bay", "Ninh Binh"],
    activities: ["cruise", "cultural", "city-tour", "kayaking"],
  },
  {
    id: "hanoi-halong-3d2n",
    slug: "hanoi-halong-3-days-2-nights",
    name: "Hanoi & Halong 3 Days 2 Nights",
    category: "multi-day",
    location: "Hanoi - Halong Bay",
    duration: "3 days, 2 nights",
    price: 219,
    originalPrice: 265,
    discount: 17,
    description: "Compact package with essential Hanoi sights and a memorable Halong Bay day cruise experience.",
    fullDescription: `
      <h3>Hanoi and Halong Bay Short Break</h3>
      <p>A compact yet comprehensive package for travelers with limited time. Experience Hanoi's highlights and cruise through Halong Bay.</p>
    `,
    highlights: ["Hanoi highlights", "Halong Bay cruise", "Old Quarter", "Vietnamese cuisine"],
    included: ["Hotel", "Day cruise", "Meals", "Transport", "Guide"],
    excluded: ["Drinks", "Tips"],
    imageUrl: "/tours/hanoi-halong-3d2n.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/hanoi-halong-3-days/",
    durationHours: 72,
    startCity: "Hanoi",
    destinations: ["Halong Bay"],
    activities: ["cruise", "cultural", "city-tour"],
  },

  // Phu Quoc Island
  {
    id: "phu-quoc-3d",
    slug: "phu-quoc-3-days",
    name: "Phu Quoc Island 3 Days",
    category: "multi-day",
    location: "Phu Quoc",
    duration: "3 days, 2 nights",
    price: 225,
    originalPrice: 275,
    discount: 18,
    description: "Tropical island getaway with pristine beaches, snorkeling, and famous Phu Quoc fish sauce and pepper farm visits.",
    fullDescription: `
      <h3>Phu Quoc Island Paradise</h3>
      <p>Escape to Phu Quoc Island, Vietnam's tropical paradise. Enjoy pristine beaches, snorkel in crystal-clear waters, and discover local pepper farms and fish sauce factories.</p>
    `,
    highlights: ["Pristine beaches", "Snorkeling", "Fish sauce factory", "Pepper farm"],
    included: ["Resort", "Meals", "Snorkeling trip", "Island tour", "Guide"],
    excluded: ["Flights", "Drinks", "Tips"],
    imageUrl: "/tours/phu-quoc-3d.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/phu-quoc-3-days/",
    durationHours: 72,
    startCity: "Ho Chi Minh City",
    destinations: ["Phu Quoc"],
    activities: ["beach", "snorkeling", "nature"],
  },
  {
    id: "phu-quoc-diving-4d",
    slug: "phu-quoc-diving-4-days",
    name: "Phu Quoc Diving Adventure 4 Days",
    category: "multi-day",
    location: "Phu Quoc",
    duration: "4 days, 3 nights",
    price: 395,
    originalPrice: 475,
    discount: 17,
    description: "Scuba diving adventure exploring Phu Quoc's coral reefs, marine life, and underwater caves with certified instructors.",
    fullDescription: `
      <h3>Phu Quoc Scuba Diving</h3>
      <p>Discover Phu Quoc's underwater world with professional diving instructors. Explore coral reefs, tropical fish, and underwater caves in crystal-clear waters.</p>
    `,
    highlights: ["Multiple dive sites", "Coral reefs", "Marine life", "PADI instruction available"],
    included: ["Resort", "Meals", "All diving", "Equipment", "PADI certification option"],
    excluded: ["Flights", "Drinks", "Tips"],
    imageUrl: "/tours/phu-quoc-diving-4d.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/phu-quoc-diving/",
    durationHours: 96,
    startCity: "Ho Chi Minh City",
    destinations: ["Phu Quoc"],
    activities: ["snorkeling", "beach", "nature"],
  },
  {
    id: "hcm-mekong-4d",
    slug: "ho-chi-minh-mekong-4-days",
    name: "Ho Chi Minh City & Mekong 4 Days",
    category: "multi-day",
    location: "Ho Chi Minh City - Mekong Delta",
    duration: "4 days, 3 nights",
    price: 265,
    originalPrice: 319,
    discount: 17,
    description: "Explore bustling Saigon and serene Mekong Delta with floating markets, Cu Chi tunnels, and local homestays.",
    fullDescription: `
      <h3>Saigon and Mekong Delta Experience</h3>
      <p>Combine the energy of Ho Chi Minh City with the tranquility of the Mekong Delta. Visit historical sites, explore floating markets, and experience local village life.</p>
    `,
    highlights: ["Saigon highlights", "Cu Chi Tunnels", "Floating markets", "Mekong homestay"],
    included: ["Hotels/Homestay", "Meals", "Transport", "Guide", "Boat trips"],
    excluded: ["Drinks", "Tips"],
    imageUrl: "/tours/hcm-mekong-4d.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/ho-chi-minh-mekong-4-days/",
    durationHours: 96,
    startCity: "Ho Chi Minh City",
    destinations: ["Mekong Delta", "Cu Chi", "Can Tho"],
    activities: ["city-tour", "cultural", "boat-trip", "homestay"],
  },

  // =====================================================
  // MULTI-DAY VIETNAM PACKAGES (6-21 days)
  // =====================================================

  {
    id: "vietnam-6days",
    slug: "vietnam-6-days-tour",
    name: "Vietnam Highlights 6 Days",
    category: "multi-day",
    location: "Hanoi - Halong - Hoi An",
    duration: "6 days, 5 nights",
    price: 495,
    originalPrice: 595,
    discount: 17,
    description: "Compact Vietnam experience covering Hanoi, Halong Bay cruise, and ancient Hoi An in 6 memorable days.",
    fullDescription: `
      <h3>Vietnam Highlights in 6 Days</h3>
      <p>Experience Vietnam's essential highlights in less than a week. From Hanoi's ancient streets to Halong Bay's stunning karsts and Hoi An's romantic charm.</p>
    `,
    highlights: ["Hanoi Old Quarter", "Halong Bay cruise", "Hoi An lanterns", "Vietnamese cuisine"],
    included: ["Hotels", "Cruise cabin", "Domestic flight", "All meals", "Guide"],
    excluded: ["International flights", "Drinks", "Tips"],
    imageUrl: "/tours/vietnam-6days.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/vietnam-6-days/",
    durationHours: 144,
    startCity: "Hanoi",
    destinations: ["Halong Bay", "Hoi An", "Ninh Binh"],
    activities: ["cruise", "cultural", "photography", "city-tour"],
  },
  {
    id: "northern-vietnam-7d",
    slug: "northern-vietnam-7-days",
    name: "Northern Vietnam 7 Days Complete",
    category: "multi-day",
    location: "Hanoi - Sapa - Halong - Ninh Binh",
    duration: "7 days, 6 nights",
    price: 595,
    originalPrice: 715,
    discount: 17,
    description: "Comprehensive Northern Vietnam tour with Sapa trekking, Halong Bay cruise, and Ninh Binh exploration.",
    fullDescription: `
      <h3>Complete Northern Vietnam in 7 Days</h3>
      <p>The ultimate Northern Vietnam experience covering all major highlights plus hidden gems. Trek through Sapa, cruise Halong Bay, and explore Ninh Binh's karsts.</p>
    `,
    highlights: ["Sapa rice terraces", "Halong Bay overnight", "Ninh Binh", "Ethnic minorities"],
    included: ["Hotels", "Cruise", "Homestay", "All meals", "Transport", "Guide"],
    excluded: ["Drinks", "Tips"],
    imageUrl: "/tours/northern-vietnam-7d.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/northern-vietnam-7-days/",
    durationHours: 168,
    startCity: "Hanoi",
    destinations: ["Sapa", "Halong Bay", "Ninh Binh"],
    activities: ["cruise", "trekking", "cultural", "photography", "homestay"],
  },
  {
    id: "vietnam-intro-8d",
    slug: "vietnam-introduction-8-days",
    name: "Vietnam Introduction 8 Days",
    category: "multi-day",
    location: "Hanoi - Halong - Hue - Hoi An - HCMC",
    duration: "8 days, 7 nights",
    price: 695,
    originalPrice: 835,
    discount: 17,
    description: "Perfect first-time Vietnam experience from north to south covering all must-see destinations.",
    fullDescription: `
      <h3>Vietnam from North to South</h3>
      <p>The perfect introduction to Vietnam, traveling from Hanoi to Ho Chi Minh City. Experience diverse landscapes, rich history, and warm hospitality along the way.</p>
    `,
    highlights: ["Hanoi", "Halong Bay", "Hue Imperial City", "Hoi An", "Ho Chi Minh City"],
    included: ["Hotels", "Cruise", "Domestic flights", "All meals", "Guide"],
    excluded: ["International flights", "Drinks", "Tips"],
    imageUrl: "/tours/vietnam-intro-8d.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/vietnam-introduction-8-days/",
    durationHours: 192,
    startCity: "Hanoi",
    destinations: ["Halong Bay", "Hue", "Hoi An", "Ninh Binh"],
    activities: ["cruise", "cultural", "city-tour", "photography"],
  },
  {
    id: "scenic-vietnam-10d",
    slug: "scenic-vietnam-10-days",
    name: "Scenic Vietnam 10 Days",
    category: "multi-day",
    location: "North to South Vietnam",
    duration: "10 days, 9 nights",
    price: 895,
    originalPrice: 1075,
    discount: 17,
    description: "Comprehensive Vietnam journey with extra time for Mekong Delta and beach relaxation in Central Vietnam.",
    fullDescription: `
      <h3>Vietnam Scenic Route - 10 Days</h3>
      <p>A more relaxed pace through Vietnam with time to absorb each destination. Includes Mekong Delta exploration and beach time in Da Nang.</p>
    `,
    highlights: ["Halong Bay", "Hue", "Hoi An", "Mekong Delta", "Da Nang beach"],
    included: ["Hotels", "Cruise", "All transport", "Meals", "Guide"],
    excluded: ["International flights", "Drinks", "Tips"],
    imageUrl: "/tours/scenic-vietnam-10d.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/scenic-vietnam-10-days/",
    durationHours: 240,
    startCity: "Hanoi",
    destinations: ["Halong Bay", "Hue", "Hoi An", "Da Nang", "Mekong Delta"],
    activities: ["cruise", "cultural", "beach", "photography", "boat-trip"],
  },
  {
    id: "vietnam-11-days",
    slug: "vietnam-discovery-11-days",
    name: "Vietnam Discovery 11 Days",
    category: "multi-day",
    location: "Complete Vietnam",
    duration: "11 days, 10 nights",
    price: 995,
    originalPrice: 1195,
    discount: 17,
    description: "In-depth Vietnam exploration with Sapa highlands, central heritage sites, and southern deltas.",
    fullDescription: `
      <h3>Vietnam In-Depth - 11 Days</h3>
      <p>A comprehensive journey through Vietnam including the highlands of Sapa, UNESCO heritage sites in central Vietnam, and the lush Mekong Delta.</p>
    `,
    highlights: ["Sapa trekking", "Halong Bay", "Hue & Hoi An", "Mekong Delta", "Cu Chi Tunnels"],
    included: ["Hotels", "Cruise", "Homestay", "All transport", "Meals", "Guide"],
    excluded: ["International flights", "Drinks", "Tips"],
    imageUrl: "/tours/vietnam-11-days.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/vietnam-discovery-11-days/",
    durationHours: 264,
    startCity: "Hanoi",
    destinations: ["Sapa", "Halong Bay", "Hue", "Hoi An", "Mekong Delta"],
    activities: ["cruise", "trekking", "cultural", "homestay", "boat-trip"],
  },
  {
    id: "vietnam-12-days",
    slug: "vietnam-complete-12-days",
    name: "Vietnam Complete 12 Days",
    category: "multi-day",
    location: "North to South",
    duration: "12 days, 11 nights",
    price: 1095,
    originalPrice: 1315,
    discount: 17,
    description: "Complete Vietnam journey with extra time for immersive experiences, cooking classes, and local interactions.",
    fullDescription: `
      <h3>Complete Vietnam Experience - 12 Days</h3>
      <p>The most comprehensive Vietnam tour with time for cooking classes, cycling adventures, and authentic local experiences throughout the country.</p>
    `,
    highlights: ["Cooking classes", "Cycling tours", "All major sites", "Local experiences", "Photography"],
    included: ["Hotels", "Cruise", "All activities", "Transport", "Meals", "Guide"],
    excluded: ["International flights", "Drinks", "Tips"],
    imageUrl: "/tours/vietnam-12-days.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/vietnam-complete-12-days/",
    durationHours: 288,
    startCity: "Hanoi",
    destinations: ["Sapa", "Halong Bay", "Hue", "Hoi An", "Da Nang", "Mekong Delta"],
    activities: ["cruise", "trekking", "cultural", "cooking-class", "cycling"],
  },
  {
    id: "vietnam-insight-14d",
    slug: "vietnam-insight-14-days",
    name: "Vietnam Insight 14 Days",
    category: "multi-day",
    location: "Complete Vietnam",
    duration: "14 days, 13 nights",
    price: 1395,
    originalPrice: 1675,
    discount: 17,
    description: "Two-week immersive journey through Vietnam with off-the-beaten-path experiences and cultural deep dives.",
    fullDescription: `
      <h3>Vietnam Insight - 14 Days</h3>
      <p>A two-week journey designed for travelers who want to go deeper. Includes off-the-beaten-path destinations, cultural workshops, and meaningful local interactions.</p>
    `,
    highlights: ["Pu Luong", "Mai Chau", "Complete north-south", "Cultural workshops", "Homestays"],
    included: ["All accommodation", "Cruise", "Transport", "Meals", "Guide", "Activities"],
    excluded: ["International flights", "Drinks", "Tips"],
    imageUrl: "/tours/vietnam-insight-14d.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/vietnam-insight-14-days/",
    durationHours: 336,
    startCity: "Hanoi",
    destinations: ["Sapa", "Halong Bay", "Hue", "Hoi An", "Mekong Delta", "Pu Luong"],
    activities: ["cruise", "trekking", "cultural", "homestay", "photography"],
  },
  {
    id: "amazing-vietnam-15d",
    slug: "amazing-vietnam-15-days",
    name: "Amazing Vietnam 15 Days",
    category: "multi-day",
    location: "Complete Vietnam + Beach",
    duration: "15 days, 14 nights",
    price: 1495,
    originalPrice: 1795,
    discount: 17,
    description: "Extensive Vietnam exploration including beach relaxation in Nha Trang or Phu Quoc.",
    fullDescription: `
      <h3>Amazing Vietnam - 15 Days</h3>
      <p>Experience the best of Vietnam with added beach time for relaxation. The perfect balance of culture, adventure, and rest.</p>
    `,
    highlights: ["All major destinations", "Beach resort time", "Phu Quoc or Nha Trang", "Complete experience"],
    included: ["All accommodation", "Beach resort", "Transport", "Meals", "Guide"],
    excluded: ["International flights", "Drinks", "Tips"],
    imageUrl: "/tours/amazing-vietnam-15d.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/amazing-vietnam-15-days/",
    durationHours: 360,
    startCity: "Hanoi",
    destinations: ["Halong Bay", "Hue", "Hoi An", "Phu Quoc", "Mekong Delta"],
    activities: ["cruise", "cultural", "beach", "photography", "nature"],
  },
  {
    id: "vietnam-cambodia-15d",
    slug: "vietnam-cambodia-15-days",
    name: "Vietnam & Cambodia 15 Days",
    category: "multi-day",
    location: "Vietnam + Angkor Wat",
    duration: "15 days, 14 nights",
    price: 1589,
    originalPrice: 1962,
    discount: 17,
    description: "Combined Vietnam and Cambodia adventure including Angkor Wat temples and the best of both countries.",
    fullDescription: `
      <h3>Vietnam and Cambodia Combined</h3>
      <p>Experience two fascinating countries in one trip. Explore Vietnam's highlights and discover the magnificent temples of Angkor in Cambodia.</p>
    `,
    highlights: ["Vietnam highlights", "Angkor Wat", "Angkor Thom", "Siem Reap", "Cross-border experience"],
    included: ["All accommodation", "Cross-border transport", "Angkor passes", "Meals", "Guide"],
    excluded: ["International flights", "Cambodia visa", "Drinks", "Tips"],
    imageUrl: "/tours/vietnam-cambodia-15d.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/vietnam-cambodia-15-days/",
    durationHours: 360,
    startCity: "Hanoi",
    destinations: ["Halong Bay", "Hue", "Hoi An", "Cambodia", "Mekong Delta"],
    activities: ["cruise", "cultural", "temple-visit", "photography"],
  },
  {
    id: "vietnam-cambodia-18d",
    slug: "vietnam-cambodia-18-days",
    name: "Vietnam & Cambodia 18 Days",
    category: "multi-day",
    location: "Vietnam + Cambodia Complete",
    duration: "18 days, 17 nights",
    price: 1895,
    originalPrice: 2275,
    discount: 17,
    description: "Comprehensive Vietnam-Cambodia tour with extended Angkor exploration and Mekong river journey.",
    fullDescription: `
      <h3>Vietnam and Cambodia In-Depth</h3>
      <p>A comprehensive journey through both countries with more time at Angkor and a scenic Mekong River crossing from Cambodia to Vietnam.</p>
    `,
    highlights: ["Complete Vietnam", "3 days at Angkor", "Mekong River crossing", "Phnom Penh"],
    included: ["All accommodation", "River cruise", "All transport", "Meals", "Guide"],
    excluded: ["International flights", "Visas", "Drinks", "Tips"],
    imageUrl: "/tours/vietnam-cambodia-18d.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/vietnam-cambodia-18-days/",
    durationHours: 432,
    startCity: "Hanoi",
    destinations: ["Halong Bay", "Hue", "Hoi An", "Cambodia", "Mekong Delta"],
    activities: ["cruise", "cultural", "temple-visit", "boat-trip"],
  },
  {
    id: "discover-vietnam-20d",
    slug: "discover-vietnam-20-days",
    name: "Discover Vietnam 20 Days",
    category: "multi-day",
    location: "Complete Vietnam Journey",
    duration: "20 days, 19 nights",
    price: 2195,
    originalPrice: 2635,
    discount: 17,
    description: "Ultimate Vietnam exploration covering every region, hidden gems, and authentic local experiences.",
    fullDescription: `
      <h3>Ultimate Vietnam Discovery - 20 Days</h3>
      <p>The most comprehensive Vietnam tour covering every major region plus hidden gems. Perfect for travelers who want to see everything Vietnam has to offer.</p>
    `,
    highlights: ["Ha Giang loop", "Pu Luong", "All major sites", "Beach time", "Off-the-beaten-path"],
    included: ["All accommodation", "All transport", "All activities", "Meals", "Guide"],
    excluded: ["International flights", "Drinks", "Tips"],
    imageUrl: "/tours/discover-vietnam-20d.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/discover-vietnam-20-days/",
    durationHours: 480,
    startCity: "Hanoi",
    destinations: ["Sapa", "Halong Bay", "Hue", "Hoi An", "Mekong Delta", "Phu Quoc"],
    activities: ["cruise", "trekking", "cultural", "beach", "homestay", "photography"],
  },
  {
    id: "vietnam-cambodia-21d",
    slug: "vietnam-cambodia-21-days",
    name: "Vietnam & Cambodia Grand Tour 21 Days",
    category: "multi-day",
    location: "Indochina Complete",
    duration: "21 days, 20 nights",
    price: 2495,
    originalPrice: 2995,
    discount: 17,
    description: "Grand Indochina journey through Vietnam and Cambodia with extended exploration of both countries.",
    fullDescription: `
      <h3>Grand Indochina Tour - 21 Days</h3>
      <p>The ultimate Southeast Asian adventure combining the best of Vietnam and Cambodia. Three weeks of unforgettable experiences, ancient temples, and stunning landscapes.</p>
    `,
    highlights: ["Complete Vietnam", "Angkor temples", "Phnom Penh", "Tonle Sap", "Mekong journey"],
    included: ["All accommodation", "All transport", "All activities", "Meals", "Guide"],
    excluded: ["International flights", "Visas", "Drinks", "Tips"],
    imageUrl: "/tours/vietnam-cambodia-21d.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/vietnam-cambodia-21-days/",
    durationHours: 504,
    startCity: "Hanoi",
    destinations: ["Halong Bay", "Hue", "Hoi An", "Cambodia", "Mekong Delta"],
    activities: ["cruise", "cultural", "temple-visit", "boat-trip", "photography"],
  },

  // =====================================================
  // SPECIALTY TOURS (Family, Luxury, Themed)
  // =====================================================

  {
    id: "vietnam-family-11d",
    slug: "vietnam-family-tour-11-days",
    name: "Vietnam Family Adventure 11 Days",
    category: "multi-day",
    location: "Family-friendly Vietnam",
    duration: "11 days, 10 nights",
    price: 1095,
    originalPrice: 1315,
    discount: 17,
    description: "Family-friendly Vietnam tour with activities suitable for all ages, comfortable pacing, and kid-friendly experiences.",
    fullDescription: `
      <h3>Vietnam for Families - 11 Days</h3>
      <p>A specially designed tour for families with children. Activities are suitable for all ages, pacing is comfortable, and accommodations are family-friendly.</p>
    `,
    highlights: ["Kid-friendly activities", "Comfortable pace", "Family hotels", "Fun experiences"],
    included: ["Family rooms", "All activities", "Transport", "Meals", "Guide"],
    excluded: ["International flights", "Drinks", "Tips"],
    imageUrl: "/tours/vietnam-family-11d.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/vietnam-family-tour/",
    durationHours: 264,
    startCity: "Hanoi",
    destinations: ["Halong Bay", "Hoi An", "Da Nang", "Mekong Delta"],
    activities: ["cruise", "beach", "cultural", "nature"],
  },
  {
    id: "vietnam-beach-family-14d",
    slug: "vietnam-beach-family-14-days",
    name: "Vietnam Beach & Family 14 Days",
    category: "multi-day",
    location: "Vietnam with Beach Resort",
    duration: "14 days, 13 nights",
    price: 1495,
    originalPrice: 1795,
    discount: 17,
    description: "Extended family tour with additional beach resort time for relaxation and water activities.",
    fullDescription: `
      <h3>Vietnam Beach Family Holiday - 14 Days</h3>
      <p>Combine cultural exploration with beach resort relaxation. Perfect for families who want both adventure and downtime.</p>
    `,
    highlights: ["Beach resort", "Family activities", "Water sports", "Cultural sites"],
    included: ["All accommodation", "Beach resort", "Activities", "Meals", "Guide"],
    excluded: ["International flights", "Drinks", "Tips"],
    imageUrl: "/tours/vietnam-beach-family-14d.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/vietnam-beach-family/",
    durationHours: 336,
    startCity: "Hanoi",
    destinations: ["Halong Bay", "Da Nang", "Phu Quoc"],
    activities: ["beach", "cruise", "snorkeling", "nature"],
  },
  {
    id: "vietnam-luxury-10d",
    slug: "vietnam-luxury-10-days",
    name: "Vietnam Luxury Collection 10 Days",
    category: "multi-day",
    location: "Luxury Vietnam",
    duration: "10 days, 9 nights",
    price: 2495,
    originalPrice: 2995,
    discount: 17,
    description: "Premium Vietnam experience with 5-star hotels, private guides, luxury cruises, and exclusive experiences.",
    fullDescription: `
      <h3>Luxury Vietnam - 10 Days</h3>
      <p>Experience Vietnam in ultimate luxury. Stay at the finest hotels, cruise on premium vessels, and enjoy exclusive experiences with private guides.</p>
    `,
    highlights: ["5-star hotels", "Luxury cruise", "Private guide", "Fine dining", "Exclusive experiences"],
    included: ["Luxury hotels", "Premium cruise", "Private car", "Fine dining", "Butler service"],
    excluded: ["International flights", "Tips"],
    imageUrl: "/tours/vietnam-luxury-10d.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/vietnam-luxury-10-days/",
    durationHours: 240,
    startCity: "Hanoi",
    destinations: ["Halong Bay", "Hue", "Hoi An", "Da Nang"],
    activities: ["cruise", "cultural", "photography"],
  },
  {
    id: "hanoi-sapa-6d",
    slug: "hanoi-sapa-6-days",
    name: "Hanoi & Sapa 6 Days",
    category: "multi-day",
    location: "Hanoi - Sapa",
    duration: "6 days, 5 nights",
    price: 395,
    originalPrice: 475,
    discount: 17,
    description: "Focused northern Vietnam experience combining Hanoi city with Sapa mountain trekking and homestays.",
    fullDescription: `
      <h3>Hanoi and Sapa Adventure - 6 Days</h3>
      <p>Focus on the best of Northern Vietnam with comprehensive Hanoi exploration and immersive Sapa trekking experience.</p>
    `,
    highlights: ["Hanoi Old Quarter", "Sapa terraces", "Hill tribe villages", "Homestay experience"],
    included: ["Hotels", "Homestay", "Train/transport", "Meals", "Guide"],
    excluded: ["Drinks", "Tips"],
    imageUrl: "/tours/hanoi-sapa-6d.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/hanoi-sapa-6-days/",
    durationHours: 144,
    startCity: "Hanoi",
    destinations: ["Sapa"],
    activities: ["trekking", "cultural", "homestay", "photography"],
  },

  // Additional specialty tours
  {
    id: "essential-vietnam-9d",
    slug: "essential-vietnam-9-days",
    name: "Essential Vietnam 9 Days",
    category: "multi-day",
    location: "North to South",
    duration: "9 days, 8 nights",
    price: 795,
    originalPrice: 955,
    discount: 17,
    description: "All essential Vietnam highlights in 9 well-paced days from Hanoi to Ho Chi Minh City.",
    fullDescription: `
      <h3>Essential Vietnam - 9 Days</h3>
      <p>Cover all of Vietnam's essential highlights in 9 days. A well-paced journey from north to south hitting all the must-see destinations.</p>
    `,
    highlights: ["Hanoi", "Halong Bay", "Hue", "Hoi An", "Ho Chi Minh City"],
    included: ["Hotels", "Cruise", "Domestic flights", "Meals", "Guide"],
    excluded: ["International flights", "Drinks", "Tips"],
    imageUrl: "/tours/essential-vietnam-9d.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/essential-vietnam-9-days/",
    durationHours: 216,
    startCity: "Hanoi",
    destinations: ["Halong Bay", "Hue", "Hoi An"],
    activities: ["cruise", "cultural", "city-tour", "photography"],
  },
  {
    id: "essence-vietnam-10d",
    slug: "essence-vietnam-10-days",
    name: "Essence of Vietnam 10 Days",
    category: "multi-day",
    location: "Vietnam Highlights",
    duration: "10 days, 9 nights",
    price: 895,
    originalPrice: 1075,
    discount: 17,
    description: "Capture the essence of Vietnam with carefully selected experiences showcasing culture, nature, and cuisine.",
    fullDescription: `
      <h3>Essence of Vietnam - 10 Days</h3>
      <p>A thoughtfully curated journey capturing Vietnam's essence through its culture, landscapes, and flavors. Each experience is carefully selected for authenticity.</p>
    `,
    highlights: ["Cultural immersion", "Cooking classes", "Local markets", "Authentic experiences"],
    included: ["Hotels", "All activities", "Transport", "Meals", "Guide"],
    excluded: ["International flights", "Drinks", "Tips"],
    imageUrl: "/tours/essence-vietnam-10d.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/essence-vietnam-10-days/",
    durationHours: 240,
    startCity: "Hanoi",
    destinations: ["Halong Bay", "Hue", "Hoi An", "Mekong Delta"],
    activities: ["cruise", "cultural", "cooking-class", "market-visit"],
  },
  {
    id: "central-vietnam-7d",
    slug: "central-vietnam-7-days",
    name: "Best of Central Vietnam 7 Days",
    category: "multi-day",
    location: "Central Vietnam",
    duration: "7 days, 6 nights",
    price: 545,
    originalPrice: 655,
    discount: 17,
    description: "In-depth Central Vietnam exploration including Hue, Hoi An, Da Nang, and My Son temples.",
    fullDescription: `
      <h3>Central Vietnam Complete - 7 Days</h3>
      <p>Focus on Central Vietnam's rich heritage and beautiful coastline. Explore UNESCO sites, ancient temples, and pristine beaches.</p>
    `,
    highlights: ["Hue Imperial City", "Hoi An Ancient Town", "My Son temples", "Da Nang beaches"],
    included: ["Hotels", "All transport", "Meals", "Guide", "Entrance fees"],
    excluded: ["Flights to/from Central Vietnam", "Drinks", "Tips"],
    imageUrl: "/tours/central-vietnam-7d.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/central-vietnam-7-days/",
    durationHours: 168,
    startCity: "Da Nang",
    destinations: ["Hue", "Hoi An", "Da Nang"],
    activities: ["cultural", "beach", "photography", "temple-visit"],
  },
  {
    id: "discovery-northeast-9d",
    slug: "discovery-northeast-vietnam-9-days",
    name: "Discovery North-East Vietnam 9 Days",
    category: "multi-day",
    location: "Ha Giang - Cao Bang - Ban Gioc",
    duration: "9 days, 8 nights",
    price: 795,
    originalPrice: 955,
    discount: 17,
    description: "Adventure through Vietnam's stunning northeast with Ha Giang loop, Ban Gioc waterfall, and ethnic minorities.",
    fullDescription: `
      <h3>Northeast Vietnam Adventure - 9 Days</h3>
      <p>Discover Vietnam's most spectacular landscapes in the northeast. Drive the famous Ha Giang loop, visit Ban Gioc waterfall, and meet ethnic minorities.</p>
    `,
    highlights: ["Ha Giang loop", "Ban Gioc waterfall", "Dong Van Karst", "Ethnic villages"],
    included: ["Hotels", "Transport", "Meals", "Guide", "Entrance fees"],
    excluded: ["Drinks", "Tips"],
    imageUrl: "/tours/discovery-northeast-9d.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/discovery-northeast-9-days/",
    durationHours: 216,
    startCity: "Hanoi",
    destinations: ["Ha Giang", "Sapa"],
    activities: ["trekking", "photography", "cultural", "nature"],
  },
  {
    id: "southern-vietnam-7d",
    slug: "southern-vietnam-7-days",
    name: "Southern Vietnam 7 Days",
    category: "multi-day",
    location: "Ho Chi Minh - Mekong - Phu Quoc",
    duration: "7 days, 6 nights",
    price: 595,
    originalPrice: 715,
    discount: 17,
    description: "Explore southern Vietnam from bustling Saigon to serene Mekong Delta and tropical Phu Quoc island.",
    fullDescription: `
      <h3>Southern Vietnam Complete - 7 Days</h3>
      <p>Discover the diversity of Southern Vietnam from the energy of Saigon to the tranquility of the Mekong Delta and beaches of Phu Quoc.</p>
    `,
    highlights: ["Ho Chi Minh City", "Cu Chi Tunnels", "Mekong Delta", "Phu Quoc beach"],
    included: ["Hotels", "Resort", "Domestic flight", "Meals", "Guide"],
    excluded: ["International flights", "Drinks", "Tips"],
    imageUrl: "/tours/southern-vietnam-7d.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/southern-vietnam-7-days/",
    durationHours: 168,
    startCity: "Ho Chi Minh City",
    destinations: ["Mekong Delta", "Cu Chi", "Phu Quoc"],
    activities: ["city-tour", "boat-trip", "beach", "cultural"],
  },
  {
    id: "signatures-vietnam-14d",
    slug: "signatures-vietnam-14-days",
    name: "Signatures of Vietnam 14 Days",
    category: "multi-day",
    location: "Complete Vietnam Luxury",
    duration: "14 days, 13 nights",
    price: 1995,
    originalPrice: 2395,
    discount: 17,
    description: "Premium Vietnam experience with handpicked boutique hotels, exclusive experiences, and signature moments.",
    fullDescription: `
      <h3>Signature Vietnam - 14 Days</h3>
      <p>A premium Vietnam journey featuring handpicked boutique accommodations, exclusive experiences, and moments that define Vietnam's beauty and culture.</p>
    `,
    highlights: ["Boutique hotels", "Exclusive experiences", "Signature moments", "Premium service"],
    included: ["Boutique hotels", "Premium activities", "Private guide", "Fine dining"],
    excluded: ["International flights", "Tips"],
    imageUrl: "/tours/signatures-vietnam-14d.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/signatures-vietnam-14-days/",
    durationHours: 336,
    startCity: "Hanoi",
    destinations: ["Halong Bay", "Hue", "Hoi An", "Mekong Delta"],
    activities: ["cruise", "cultural", "photography"],
  },
  {
    id: "cultural-heritage-12d",
    slug: "cultural-heritage-vietnam-12-days",
    name: "Best Cultural Heritage Vietnam 12 Days",
    category: "multi-day",
    location: "UNESCO Sites Vietnam",
    duration: "12 days, 11 nights",
    price: 1195,
    originalPrice: 1435,
    discount: 17,
    description: "Focus on Vietnam's UNESCO World Heritage Sites and cultural treasures with expert local guides.",
    fullDescription: `
      <h3>Vietnam Cultural Heritage - 12 Days</h3>
      <p>A culturally focused journey visiting all of Vietnam's UNESCO World Heritage Sites with expert local guides and in-depth experiences.</p>
    `,
    highlights: ["All UNESCO sites", "Expert guides", "Cultural workshops", "Temple visits"],
    included: ["Hotels", "All entrance fees", "Expert guides", "Meals", "Transport"],
    excluded: ["International flights", "Drinks", "Tips"],
    imageUrl: "/tours/cultural-heritage-12d.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/cultural-heritage-12-days/",
    durationHours: 288,
    startCity: "Hanoi",
    destinations: ["Halong Bay", "Hue", "Hoi An", "Ninh Binh"],
    activities: ["cultural", "temple-visit", "photography"],
  },
  {
    id: "natural-wonders-16d",
    slug: "natural-wonders-vietnam-16-days",
    name: "Natural Wonders of Vietnam 16 Days",
    category: "multi-day",
    location: "Vietnam Nature Focus",
    duration: "16 days, 15 nights",
    price: 1695,
    originalPrice: 2035,
    discount: 17,
    description: "Nature-focused Vietnam journey exploring national parks, caves, waterfalls, and pristine landscapes.",
    fullDescription: `
      <h3>Vietnam's Natural Wonders - 16 Days</h3>
      <p>For nature lovers, this journey explores Vietnam's most spectacular natural landscapes including Phong Nha caves, national parks, and pristine coastlines.</p>
    `,
    highlights: ["Phong Nha caves", "National parks", "Pristine nature", "Waterfalls"],
    included: ["All accommodation", "Park fees", "Trekking guides", "Meals", "Transport"],
    excluded: ["International flights", "Drinks", "Tips"],
    imageUrl: "/tours/natural-wonders-16d.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/natural-wonders-16-days/",
    durationHours: 384,
    startCity: "Hanoi",
    destinations: ["Phong Nha", "Sapa", "Halong Bay", "Phu Quoc"],
    activities: ["trekking", "cave-exploration", "nature", "photography"],
  },
  {
    id: "perfect-vietnam-7d",
    slug: "perfect-vietnam-7-days",
    name: "Perfect Vietnam 7 Days",
    category: "multi-day",
    location: "Vietnam Highlights",
    duration: "7 days, 6 nights",
    price: 595,
    originalPrice: 715,
    discount: 17,
    description: "Perfectly balanced 7-day Vietnam tour hitting all highlights without rushing.",
    fullDescription: `
      <h3>Perfect Vietnam - 7 Days</h3>
      <p>A perfectly balanced week in Vietnam covering the essential highlights at a comfortable pace. Ideal for first-time visitors.</p>
    `,
    highlights: ["Hanoi", "Halong Bay", "Hoi An", "Comfortable pace"],
    included: ["Hotels", "Cruise", "Domestic flight", "Meals", "Guide"],
    excluded: ["International flights", "Drinks", "Tips"],
    imageUrl: "/tours/perfect-vietnam-7d.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/perfect-vietnam-7-days/",
    durationHours: 168,
    startCity: "Hanoi",
    destinations: ["Halong Bay", "Hoi An"],
    activities: ["cruise", "cultural", "photography"],
  },
  {
    id: "vietnam-discovery-8d",
    slug: "vietnam-discovery-8-days",
    name: "Vietnam Discovery 8 Days",
    category: "multi-day",
    location: "North to South",
    duration: "8 days, 7 nights",
    price: 695,
    originalPrice: 835,
    discount: 17,
    description: "Discover Vietnam's diversity in 8 days traveling from Hanoi through Central Vietnam to Ho Chi Minh City.",
    fullDescription: `
      <h3>Vietnam Discovery - 8 Days</h3>
      <p>An 8-day journey discovering Vietnam's incredible diversity as you travel from north to south, experiencing culture, cuisine, and landscapes.</p>
    `,
    highlights: ["North to South journey", "Cultural diversity", "Local cuisine", "Photography opportunities"],
    included: ["Hotels", "Cruise", "Domestic flights", "Meals", "Guide"],
    excluded: ["International flights", "Drinks", "Tips"],
    imageUrl: "/tours/vietnam-discovery-8d.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/vietnam-discovery-8-days/",
    durationHours: 192,
    startCity: "Hanoi",
    destinations: ["Halong Bay", "Hue", "Hoi An"],
    activities: ["cruise", "cultural", "photography", "city-tour"],
  },
  {
    id: "hanoi-ninh-binh-halong-5d",
    slug: "hanoi-ninh-binh-halong-5-days",
    name: "Hanoi, Ninh Binh & Halong 5 Days",
    category: "multi-day",
    location: "Northern Vietnam Highlights",
    duration: "5 days, 4 nights",
    price: 395,
    originalPrice: 475,
    discount: 17,
    description: "Compact northern Vietnam experience combining Hanoi, Ninh Binh's karsts, and Halong Bay cruise.",
    fullDescription: `
      <h3>Northern Vietnam Essentials - 5 Days</h3>
      <p>Experience the best of Northern Vietnam in 5 days. Explore Hanoi, visit Ninh Binh's stunning karst landscapes, and cruise through Halong Bay.</p>
    `,
    highlights: ["Hanoi city", "Trang An complex", "Halong Bay overnight", "Bai Dinh pagoda"],
    included: ["Hotels", "Cruise cabin", "Transport", "Meals", "Guide"],
    excluded: ["Drinks", "Tips"],
    imageUrl: "/tours/hanoi-ninh-binh-halong-5d.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/hanoi-ninh-binh-halong-5-days/",
    durationHours: 120,
    startCity: "Hanoi",
    destinations: ["Ninh Binh", "Halong Bay"],
    activities: ["cruise", "boat-trip", "cultural", "photography"],
  },
  {
    id: "north-vietnam-adventure-7d",
    slug: "north-vietnam-adventure-7-days",
    name: "North Vietnam Adventure 7 Days",
    category: "multi-day",
    location: "Northern Vietnam",
    duration: "7 days, 6 nights",
    price: 545,
    originalPrice: 655,
    discount: 17,
    description: "Action-packed Northern Vietnam adventure with trekking, cycling, kayaking, and cultural immersion.",
    fullDescription: `
      <h3>Northern Vietnam Adventure - 7 Days</h3>
      <p>An adventure-focused tour of Northern Vietnam featuring trekking, cycling, kayaking, and authentic cultural experiences.</p>
    `,
    highlights: ["Trekking", "Cycling", "Kayaking", "Adventure activities"],
    included: ["Hotels", "Homestay", "All activities", "Equipment", "Meals", "Guide"],
    excluded: ["Drinks", "Tips"],
    imageUrl: "/tours/north-vietnam-adventure-7d.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/north-vietnam-adventure-7-days/",
    itinerary: [
        {
          day: 1,
          title: "Hanoi Arrival",
          description: "Morning\n\nOur tour guide will wait and welcome you when arriving at Noi Bai International Airport. You will be transferred directly to the hotel in Hanoi. After a long flight, spend time for leisure and relaxation. NOTE: Hotel check-in is at 14:00, you can check in earlier by paying a surcharge if you want to. Afternoon/ Evening\n\nYou will have optional choices to watch cultural shows such as Water Puppet Show and Vietnamese Cooking Class or Foodie Tours, which are presented through links below:\n\nHanoi Street Food Walking Tour\tFROM US $29 /pax\nHanoi Cooking Class Half Day\tFROM US $48 /pax",
          activities: [],
          accommodation: "Hotel in Hanoi",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661753142012e.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661753142012e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6617531420128.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6617531420129.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666be2fb80c3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666be3f3faa2.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661753142012a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666bf4c4ead8.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661753142012b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661753142011b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666bfabadc91.jpg"],
        },
        {
          day: 2,
          title: "Hanoi Biking City Tour Half Day - Hanoi to Sapa Bus",
          description: "Morning\n\nBegin your Hanoi adventure with a convenient hotel pick-up by a friendly driver. You'll be transferred to a local bike store where you can choose a bicycle suited to your comfort and riding style. Your first stop is the iconic Long Bien Bridge, a symbol of Hanoi’s resilience. Pause to admire panoramic views of the Red River and absorb the bridge’s rich historical significance. Cycle along the tranquil paths around West Lake and visit Huu Tiep Lake, where the wreckage of a U.S",
          activities: [],
          meals: ["Breakfast","Lunch"],
          accommodation: "Hotel in Sapa",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666bda77b932.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666bda77b932.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661753142012c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666bdcdef11a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661753142011e.jpg"],
        },
        {
          day: 3,
          title: "Sapa - Trekking to Y Linh Ho - Lao Chai - Ta Van",
          description: "Distance & Est. time: Trekking 13 km\n\nMorning\n\nAt 09:30, you will join our guide and begin the exciting adventure 13-km down-hill trekking tour. You will travel through small trails of rock and gravel, which lead to an opening view of the beautiful terrace fields. Start the tour to Y Linh Ho village, settled down by the beautiful Muong Hoa River. Continue the journey to the Black Hmong village of Lao Chai, where you can spend time exploring the neighborhood, interacting with the locals, and learning about how they live in the mountainous region",
          activities: [],
          meals: ["Breakfast","Picnic Lunch"],
          accommodation: "Hotel in Sapa",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666bdb8b4547.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666bdb8b4547.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661753142011f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/661753142011f.jpg"],
        },
        {
          day: 4,
          title: "Trekking to Cat Cat - Sin Chai - Lao Cai - Hanoi",
          description: "Distance & Est. time: Trekking 3 km\n\nMorning\n\nHave a delicious breakfast at the hotel then get ready to be picked up by our tour guide for the adventurous trekking trip at around 09:00. Take a walk down to the southwest of Sapa to visit Cat Cat Village of the Black Hmong, one of the more well-known ethnic villages of Sapa. Enjoy the stunning waterfall here, and look at the vestige of a hydroelectric power station that the French constructed. After that, you will have a picnic lunch by the side of the river",
          activities: [],
          meals: ["Breakfast","Picnic Lunch"],
          accommodation: "Hotel in Hanoi",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6617531420120.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6617531420120.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666bddde2425.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6617531420121.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/6617531420120.jpg"],
        },
        {
          day: 5,
          title: "Halong Bay - Overnight On Board",
          description: "Morning\n\nHave breakfast at your hotel and then transfer to Halong Bay, one of the seven Wonders of the World. 11:00 - 12:00: Arrive at the pier, you will feel the warm welcome by the boat crew, then get on the cruise to check in your cabin. Enjoy a delicious seafood lunch while the boat sailing among the majestic limestone mountains of the bay. Afternoon \n\nDiscover the beauty of Halong Bay with enjoyable activities like cave exploration, kayaking, and swimming in the sea, offering simple yet delightful ways to experience the stunning scenery of this UNESCO World Heritage Site. Get back onboard",
          activities: [],
          meals: ["Breakfast","Lunch","Dinner"],
          accommodation: "Cruise in Halong Bay",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666bdf0b4e8a.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666bdf0b4e8a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6617531420122.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6617531420123.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/6617531420123.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/6617531420122.jpg"],
        },
        {
          day: 6,
          title: "Discover Halong Bay - Hanoi",
          description: "Morning\n\nYou can get up early to witness the stunning sunrise of Halong Bay or exercise in a Tai Chi class. Have breakfast on the cruise at around 07:00. Continue your exploration of the bay by visiting a cave, kayaking, or swimming in the emerald water, allowing you to delve into the natural wonders of Halong Bay and create unforgettable memories amidst its serene beauty. Then, visitors will return to the main ship, check out, and then have brunch. Relaxing while the boat returns to the harbor",
          activities: [],
          meals: ["Breakfast","Brunch"],
          accommodation: "Hotel in Hanoi",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6617531420124.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6617531420124.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666be0188c43.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/6617531420124.jpg"],
        },
        {
          day: 7,
          title: "Hanoi - Flight to Hue",
          description: "Enjoy breakfast at your hotel then check out. Our driver will pick you up and transfer you to the airport for your flight to Hue. Arrive at the airport in Hue. Travel to your hotel, check in, and be free for the rest of the day. Hue is a cultural heritage city, it has a long history and tradition with unique values and identities",
          activities: [],
          meals: ["Breakfast"],
          accommodation: "Hotel in Hue",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661753142012d.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661753142012d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6617531420125.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/6617531420125.jpg"],
        },
        {
          day: 8,
          title: "Half-day Cycling to Thuy Bieu Village",
          description: "Morning\n\nWake up early, have breakfast at the hotel, and be picked up by our tour guide at 08:00 then join a half-day cycling tour to explore peaceful Hue city:\n\nGo to Toa Kham Wharf for a cruise on the romantic Perfume River. You will stop at Thien Mu Pagoda, an iconic temple symbolizing the rich cultural heritage of Hue, and immerse yourself in the symbol of the city. Continue cruising to Hue Ecolodge, and visit Thuy Bieu Eco-village, an authentic village representing the countryside of Hue. Get on the bike then visit handicraft families including the incense-making family, the joss paper-ma",
          activities: [],
          meals: ["Breakfast","Lunch"],
          accommodation: "Hotel in Hue",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6617531420126.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6617531420126.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666be1569409.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/6617531420126.jpg"],
        },
        {
          day: 9,
          title: "Motorbiking Adventure To Hoi An Via Hai Van Pass",
          description: "Morning\n\nHave breakfast at the hotel and pack your luggage. Around 08:00, you will be picked up by our tour guide at your hotel then travel by motorcycle from Hue to Hoi An. The first stop is the fishing village and paddies fields along the lagoon. Then, pay a visit to Elephant Waterfall where you can enjoy swimming moments, leisurely relaxation, and even a refreshing dip in the cool waters, surrounded by the area's enchanting natural beauty. Stop at Lang Co Beach where you can take photos of the beautiful white sand and have lunch there",
          activities: [],
          meals: ["Breakfast","Picnic Lunch"],
          accommodation: "Hotel in Hoi An",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666be21e1e24.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666be21e1e24.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6617531420127.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/6617531420127.jpg"],
        },
        {
          day: 10,
          title: "Discover The Local Village By Bike",
          description: "Morning\n\nEnjoy breakfast at the hotel and start the adventurous biking tour in the countryside of Hoi An. At 08:00, you will be picked up by our driver from your hotel, then ride over the bridge to the peaceful countryside of Cam Kim Island. Cycle through the lush scenery of rice paddies and farmland on the way to the island. Stop along the way, you will have a chance to chat with farmers and get to know more about their daily lives. Visit a local family in Duy Vinh and learn about their traditional sedge mattress weaving",
          activities: [],
          meals: ["Breakfast","Lunch"],
          accommodation: "Hotel in Hoi An",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6617531420128.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6617531420128.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/6617531420128.jpg"],
        },
        {
          day: 11,
          title: "Half-day Cycling To Hoi An Countryside",
          description: "Distance & Est. time: Cycling 20 km\n\nMorning\n\nAround 07:45, our guide will wait for you at your hotel then get on a bike for a cycling tour to discover the natural countryside of Hoi An. Start by exploring the small passageway and alleyways in Hoi An, and drop by the iconic Japanese Covered Bridge, a well-preserved 18th-century wooden bridge with a distinctive arched design and intricate carvings, for photo shooting. Visit a local family making Banh Dap using traditional methods. These small savory rice flour bowls are a common breakfast staple in the countryside",
          activities: [],
          meals: ["Breakfast"],
          accommodation: "Hotel in Hoi An",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6617531420129.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6617531420129.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666be2fb80c3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/6617531420129.jpg"],
        },
        {
          day: 12,
          title: "Hoi An - Da Nang - Flight to Ho Chi Minh City & Vespa City tour",
          description: "Morning\n\nHave fun on your final day in Hoi An. After being picked up from the hotel, you will head to the airport in Da Nang to catch a domestic flight to Ho Chi Minh City and then travel to your hotel. Afternoon\n\nDiscover the bustling lifestyle of Ho Chi Minh City on a Scooter. Our tour guide will come and pick you up at 12:00 and travel on the off-the-beaten path of Saigon. Starting from the city center, we ride through the busy streets and visit the famous and thought-provoking Burning Monk Memorial Statue, a poignant and powerful tribute commemorating an iconic moment in Vietnam's history",
          activities: [],
          meals: ["Breakfast"],
          accommodation: "Hotel in Ho Chi Minh City",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666be3f3faa2.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666be3f3faa2.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661753142012a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666bf4c4ead8.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661753142012b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/661753142012a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/661753142012b.jpg"],
        },
        {
          day: 13,
          title: "Half-day Biking trip to Cu Chi Tunnel",
          description: "Morning\n\nStart an exciting day with a visit to Cu Chi Tunnel, an underground defense system created by Viet Cong during the Vietnam War, which has an important part in the national reunification. 07:15: Meet your guide and get on a private van to be whisked away from crowded Saigon for a morning of scenic biking in the north of the city. Upon arrival near the Cu Chi, you will get on comfortable, well-maintained bikes with the guidance of a charming, well-spoken local guide. Head off through peaceful villages on quiet back roads, trails, and pathways, and see agricultural landscapes and the dai",
          activities: [],
          meals: ["Breakfast","Lunch"],
          accommodation: "Hotel in Ho Chi Minh City",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661753142011b.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661753142011b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666bfabadc91.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/661753142011b.jpg"],
        },
        {
          day: 14,
          title: "Mekong Discovery On A Bike",
          description: "Distance & Est. time: Cycling 25 km\n\nMorning\n\nEnjoy breakfast at your hotel and prepare for a 25km cycling adventure to explore the lively Mekong Delta. Around 07:00, meet our guide at your hotel. After a quick transfer, we will get to the starting point. As the bikes are set up, you may enjoy coffee or tea at a small local cafe shop",
          activities: [],
          meals: ["Breakfast","Lunch"],
          accommodation: "Hotel in Ho Chi Minh City",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666be4fdd98e.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666be4fdd98e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65d96ea6e38de.jpg"],
        },
        {
          day: 15,
          title: "Ho Chi Minh Free day",
          description: "Morning\n\nFulfill your energy with a tasty breakfast. You are free for the whole day. If you have enough time, you can explore Ho Chi Minh through these below optional suggestions:\n\nInsight Mekong Delta Day Trip from Saigon\n\n\t\n\nFROM US $62 /pax\n\n\n\n\nCu Chi Tunnels & Ho Chi Minh City Tour Full Day\n\n\t\n\nFROM US $99 /pax\n\n\n\n\nHo Chi Minh City Tour Full Day\n\n\t\n\nFROM US $75 /pax",
          activities: [],
          meals: ["Breakfast"],
          accommodation: "Hotel in Ho Chi Minh City",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661753142011d.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661753142011d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/661753142011d.jpg"],
        },
        {
          day: 16,
          title: "Departure",
          description: "Have leisure time then check out of the hotel at 12:00. (Late check-out can be arranged with a surcharge).Our driver will pick you up for the transfer to the airport. Goodbye and have a safe flight back home.",
          activities: [],
          meals: ["Breakfast"],
        },
      ],
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/674d6b9682e0e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661753142012e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666bda77b932.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661753142012c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666bdcdef11a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661753142011e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666bdb8b4547.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661753142011f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6617531420120.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666bddde2425.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6617531420121.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666bdf0b4e8a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6617531420122.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6617531420123.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6617531420124.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666be0188c43.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661753142012d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6617531420125.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6617531420126.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666be1569409.jpg"],
    pricingTiers: [{"category":"Superior (3*)","price":1899},{"category":"First Class (4*)","price":2219}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 168,
    startCity: "Hanoi",
    destinations: ["Sapa", "Halong Bay", "Mai Chau"],
    activities: ["trekking", "cycling", "kayaking", "homestay"],
  },
  {
    id: "nature-north-vietnam-8d",
    slug: "nature-north-vietnam-8-days",
    name: "Best of Nature Northern Vietnam 8 Days",
    category: "multi-day",
    location: "Northern Vietnam Nature",
    duration: "8 days, 7 nights",
    price: 695,
    originalPrice: 835,
    discount: 17,
    description: "Nature-focused Northern Vietnam tour exploring national parks, rice terraces, and pristine bay waters.",
    fullDescription: `
      <h3>Northern Vietnam Nature - 8 Days</h3>
      <p>Experience the natural beauty of Northern Vietnam from Sapa's terraced mountains to Halong Bay's karst landscapes.</p>
    `,
    highlights: ["Sapa terraces", "Pu Luong", "Halong Bay", "Nature walks"],
    included: ["Hotels", "Homestays", "Transport", "Meals", "Guide"],
    excluded: ["Drinks", "Tips"],
    imageUrl: "/tours/nature-north-vietnam-8d.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/nature-north-vietnam-8-days/",
    durationHours: 192,
    startCity: "Hanoi",
    destinations: ["Sapa", "Pu Luong", "Halong Bay"],
    activities: ["trekking", "nature", "photography", "homestay"],
  },
  {
    id: "highlights-vietnam-10d",
    slug: "highlights-vietnam-10-days",
    name: "Highlights of Vietnam 10 Days",
    category: "multi-day",
    location: "Vietnam Complete",
    duration: "10 days, 9 nights",
    price: 895,
    originalPrice: 1075,
    discount: 17,
    description: "All Vietnam highlights in 10 days with perfect balance of culture, nature, and local experiences.",
    fullDescription: `
      <h3>Vietnam Highlights - 10 Days</h3>
      <p>Experience every highlight Vietnam has to offer in 10 perfectly balanced days. Culture, nature, cuisine, and authentic experiences.</p>
    `,
    highlights: ["All major destinations", "Perfect pacing", "Local experiences", "Complete journey"],
    included: ["Hotels", "Cruise", "Transport", "Meals", "Guide"],
    excluded: ["International flights", "Drinks", "Tips"],
    imageUrl: "/tours/highlights-vietnam-10d.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/highlights-vietnam-10-days/",
    durationHours: 240,
    startCity: "Hanoi",
    destinations: ["Halong Bay", "Hue", "Hoi An", "Mekong Delta"],
    activities: ["cruise", "cultural", "photography", "boat-trip"],
  },
  {
    id: "cultural-odyssey-10d",
    slug: "cultural-odyssey-vietnam-10-days",
    name: "Vietnamese Cultural Odyssey 10 Days",
    category: "multi-day",
    location: "Vietnam Culture Focus",
    duration: "10 days, 9 nights",
    price: 945,
    originalPrice: 1135,
    discount: 17,
    description: "Deep cultural immersion in Vietnam with traditional workshops, ethnic encounters, and authentic experiences.",
    fullDescription: `
      <h3>Cultural Odyssey - 10 Days</h3>
      <p>A journey focused on Vietnam's rich cultural heritage with traditional craft workshops, ethnic minority encounters, and authentic local experiences.</p>
    `,
    highlights: ["Cultural workshops", "Ethnic villages", "Traditional arts", "Authentic experiences"],
    included: ["Hotels", "Workshops", "Transport", "Meals", "Expert guides"],
    excluded: ["International flights", "Drinks", "Tips"],
    imageUrl: "/tours/cultural-odyssey-10d.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/cultural-odyssey-10-days/",
    durationHours: 240,
    startCity: "Hanoi",
    destinations: ["Sapa", "Hoi An", "Mekong Delta"],
    activities: ["cultural", "cooking-class", "homestay", "photography"],
  },
  {
    id: "best-vietnam-13d",
    slug: "best-vietnam-13-days",
    name: "Best of Vietnam 13 Days",
    category: "multi-day",
    location: "Complete Vietnam",
    duration: "13 days, 12 nights",
    price: 1195,
    originalPrice: 1435,
    discount: 17,
    description: "Comprehensive 13-day journey showcasing the very best Vietnam has to offer from north to south.",
    fullDescription: `
      <h3>Best of Vietnam - 13 Days</h3>
      <p>A comprehensive journey showcasing Vietnam's best from the highlands of Sapa to the waterways of the Mekong Delta.</p>
    `,
    highlights: ["Complete Vietnam", "Sapa to Mekong", "Beach time", "All highlights"],
    included: ["Hotels", "Cruise", "All transport", "Meals", "Guide"],
    excluded: ["International flights", "Drinks", "Tips"],
    imageUrl: "/tours/best-vietnam-13d.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/best-vietnam-13-days/",
    durationHours: 312,
    startCity: "Hanoi",
    destinations: ["Sapa", "Halong Bay", "Hue", "Hoi An", "Mekong Delta"],
    activities: ["cruise", "trekking", "cultural", "photography"],
  },
  {
    id: "discovery-north-east-13d",
    slug: "discovery-north-east-vietnam-13-days",
    name: "Discovery North-East Vietnam 13 Days",
    category: "multi-day",
    location: "Ha Giang - Northeast Vietnam",
    duration: "13 days, 12 nights",
    price: 1095,
    originalPrice: 1315,
    discount: 17,
    description: "Extended northeast Vietnam adventure with Ha Giang loop, ethnic markets, and remote mountain villages.",
    fullDescription: `
      <h3>Northeast Vietnam Discovery - 13 Days</h3>
      <p>An extended adventure through Vietnam's most remote and spectacular northeastern region including the famous Ha Giang loop.</p>
    `,
    highlights: ["Ha Giang complete", "Sunday markets", "Remote villages", "Spectacular scenery"],
    included: ["Hotels", "Transport", "Meals", "Guide", "Market visits"],
    excluded: ["Drinks", "Tips"],
    imageUrl: "/tours/discovery-north-east-13d.jpg",
    affiliateUrl: "https://www.asiatouradvisor.com/discovery-north-east-13-days/",
    durationHours: 312,
    startCity: "Hanoi",
    destinations: ["Ha Giang", "Sapa"],
    activities: ["trekking", "photography", "cultural", "market-visit"],
  },

  // ============================================
  // BESTPRICETRAVEL.COM TOURS (New Partner)
  // Contact: +84 904-699-428 | sales@bestpricetravel.com
  // ============================================

  // Multi-day Tours
  {
    id: "vietnam-essential-10d",
    slug: "vietnam-essential-10-days",
    name: "Vietnam Essential 10 Days",
    category: "multi-day",
    location: "Complete Vietnam",
    duration: "10 days, 9 nights",
    price: 899,
    originalPrice: 999,
    discount: 10,
    description: "Well designed itinerary helping you explore famous places from North to South with local activities like rowing boats and tasting regional cuisines.",
    fullDescription: `
      <h3>Vietnam Essential - 10 Days</h3>
      <p>A perfectly paced journey through Vietnam's highlights, from the bustling streets of Ho Chi Minh City to the serene waters of Halong Bay.</p>

      <h3>Why This Tour</h3>
      <p>Experience the best of Vietnam in 10 days with small group activities, local cultural experiences, and comfortable accommodations throughout.</p>

      <h3>Highlights</h3>
      <ul>
        <li>Explore the bustling streets of Ho Chi Minh City</li>
        <li>Row through the waterways of the Mekong Delta</li>
        <li>Discover Cu Chi Tunnels history</li>
        <li>Walk through ancient Hoi An streets</li>
        <li>Cruise overnight on Halong Bay</li>
        <li>Taste regional cuisines in each destination</li>
      </ul>
    `,
    highlights: ["Ho Chi Minh City", "Mekong Delta", "Cu Chi Tunnels", "Hoi An", "Halong Bay"],
    itinerary: [
      { day: 1, title: "Ho Chi Minh City Arrival", description: "Welcome to Vietnam", activities: ["Airport pickup", "Hotel check-in", "Welcome dinner"], meals: ["Dinner"] },
      { day: 2, title: "Mekong Delta", description: "Full day Mekong exploration", activities: ["Boat cruise", "Local villages", "Fruit tasting"], meals: ["Breakfast", "Lunch"] },
      { day: 3, title: "Cu Chi Tunnels", description: "Historical war sites", activities: ["Tunnel exploration", "War history"], meals: ["Breakfast", "Lunch"] },
      { day: 4, title: "Flight to Hoi An", description: "Transfer to central Vietnam", activities: ["Flight to Da Nang", "Transfer to Hoi An"], meals: ["Breakfast"] },
      { day: 5, title: "Hoi An Ancient Town", description: "UNESCO World Heritage exploration", activities: ["Walking tour", "Lantern streets", "Cooking class"], meals: ["Breakfast", "Lunch"] },
      { day: 6, title: "Hoi An Free Day", description: "Leisure time in Hoi An", activities: ["Beach or shopping", "Spa options"], meals: ["Breakfast"] },
      { day: 7, title: "Flight to Hanoi", description: "Transfer to northern Vietnam", activities: ["Flight to Hanoi", "City tour"], meals: ["Breakfast"] },
      { day: 8, title: "Hanoi City Tour", description: "Explore Vietnam's capital", activities: ["Ho Chi Minh Mausoleum", "Old Quarter", "Temple of Literature"], meals: ["Breakfast", "Lunch"] },
      { day: 9, title: "Halong Bay Cruise", description: "Overnight on Halong Bay", activities: ["Cruise boarding", "Cave visit", "Sunset", "Dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 10, title: "Halong Bay - Departure", description: "Return to Hanoi and departure", activities: ["Sunrise", "Brunch cruise", "Transfer to airport"], meals: ["Brunch"] }
    ],
    included: [
      "9 nights accommodation",
      "Domestic flights",
      "All transfers",
      "English-speaking guides",
      "Meals as mentioned",
      "Entrance fees",
      "Halong Bay cruise"
    ],
    excluded: [
      "International flights",
      "Visa fees",
      "Travel insurance",
      "Personal expenses",
      "Tips"
    ],
    imageUrl: "/tours/vietnam-essential-10d.jpg",
    rating: 9.4,
    reviewCount: 171,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/vietnam-essential-10-days-small-group-tour.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/674d6dbf7b391.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b65fcbcfa8.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b65fcbcfaf.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b65fcbcfa9.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b65fcbcfaa.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b65fcbcfad.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b65fcbcfa7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666ac9d31b03.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b65fcbcfb0.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666acbd71ef6.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666accf2224c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666adfd7bfe4.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b65fcbcfb1.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b65fcbcfae.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666ae2496ee6.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b65fcbcfac.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666ae448d3e1.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b65fcbcfb2.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b65fcbcfa2.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666ae5492b31.jpg"],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 240,
    startCity: "Ho Chi Minh City",
    destinations: ["Ho Chi Minh City", "Mekong Delta", "Cu Chi", "Hoi An", "Hanoi", "Halong Bay"],
    activities: ["cruise", "cultural", "food-tour", "photography"],
  },
  {
    id: "best-vietnam-heritage-15d",
    slug: "best-vietnam-world-heritage-15-days",
    name: "Best of Vietnam: World Heritage Sites 15 Days",
    category: "multi-day",
    location: "Complete Vietnam",
    duration: "15 days, 14 nights",
    price: 1160,
    originalPrice: 1289,
    discount: 10,
    description: "Comprehensive journey exploring Vietnam's UNESCO heritage sites with cultural immersion and local community interactions.",
    fullDescription: `
      <h3>Vietnam's Heritage Sites - 15 Days</h3>
      <p>Experience Vietnam's rich cultural heritage through UNESCO World Heritage Sites, from the imperial citadels to natural wonders.</p>

      <h3>Destinations</h3>
      <ul>
        <li>Hanoi - Ancient capital with colonial charm</li>
        <li>Mai Chau - Ethnic Thai villages and valleys</li>
        <li>Halong Bay - UNESCO natural wonder</li>
        <li>Hue - Imperial citadel and royal tombs</li>
        <li>Hoi An - Ancient trading port</li>
        <li>Ho Chi Minh City - Dynamic southern hub</li>
        <li>Mekong Delta - Floating markets and waterways</li>
      </ul>
    `,
    highlights: ["UNESCO Sites", "Mai Chau Valley", "Halong Bay Cruise", "Imperial Hue", "Ancient Hoi An", "Mekong Delta"],
    included: ["14 nights hotels", "1 night cruise", "All transport", "Domestic flights", "Most meals", "English guide"],
    excluded: ["International flights", "Visa", "Insurance", "Tips"],
    imageUrl: "/tours/best-vietnam-heritage-15d.jpg",
    rating: 9.6,
    reviewCount: 62,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/best-of-vietnam-15-days.html",
    itinerary: [
        {
          day: 1,
          title: "Welcome to Hanoi - Begin Your Vietnam Adventure",
          description: "BestPrice team’s tour guide warmly welcomes you at Noi Bai International Airport, then transfers to your hotel in Hanoi. Please have a good rest after a long flight and be ready for the next day's excitement. NOTE: The check-in hour is 14:00. You will be able to have an early check-in with an additional charge. Please contact your travel consultant to book the service.",
          activities: [],
          accommodation: "Hotel in Hanoi",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00b47a654c.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00b47a654c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e9d725fe17.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e9d49ea438.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00aef42313.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00aef42319.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e9d365902b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00aef42314.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00aef4231a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00aef42315.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e9d24ebe04.jpg"],
        },
        {
          day: 2,
          title: "Hanoi Half-Day City Tour - Discover Hanoi’s Timeless Beauty",
          description: "Morning /Afternoon\n\nWake up, enjoy the early morning in Hanoi, and have a full breakfast. Your tour guide will pick you up at around 08:00 and accompany your group to travel around Hanoi on a half-day city tour. Our first stop is the Temple of Literature, which is the very first university in Vietnam and a symbol of the significant influence of Confucianism on Vietnamese history and culture. Next, you will have a chance to see the special structure of the tiny and elegant One Pillar Pagoda and listen to the mystery of how it was created. Then, admire Ho Chi Minh Mausoleum - the resting place o",
          activities: [],
          meals: ["Breakfast","Lunch"],
          accommodation: "Hotel in Hanoi",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00aef4231b.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00aef4231b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00aef4231c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65e00aef4231c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65e00aef4231b.jpg"],
        },
        {
          day: 3,
          title: "Hanoi - Mai Chau - Scenic Biking Adventure to Local Village",
          description: "Morning\n\n07:00 – 07:30 Pickup from your hotel in Hanoi’s Old Quarter (In case of a traffic jam or if the pickup location is inaccessible, we will provide an alternative meeting point)\n\n07:30 – 10:45 Travel through scenic winding mountain passes. Along the way, you can admire the picturesque landscapes where the Muong and Thai ethnic communities live in harmony with nature, nestled between valleys and mountains. 10:50 – 11:30 Stop at the top of Thung Khe Pass to enjoy panoramic views of Mai Chau Valley. Visit a temporary local market, where Muong ethnic people sell their traditional products. A",
          activities: [],
          meals: ["Breakfast","Lunch"],
          accommodation: "Hotel in Mai Chau",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00aef4231d.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00aef4231d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e9ce693c9c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00b47a654e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65e00aef4231d.jpg"],
        },
        {
          day: 4,
          title: "Mai Chau’s Hidden Gems - Na Meo - Na Mo - Hanoi",
          description: "Distance & Est. time: 2 km bicycle ride\n\nHave breakfast at the homestay, then join a local Thai guide for a short 2 km bicycle ride before trekking to remote villages, including Na Meo, Na Mo, and Xam Pa. Experience breathtaking rice terraces and gain insights into the unique culture and customs of the Thai ethnic group. Return to the homestay for check-out and lunch. You have some free time for shopping or relaxing before departing for Hanoi by van /bus",
          activities: [],
          meals: ["Breakfast","Lunch"],
          accommodation: "Hotel in Hanoi",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00aef4231e.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00aef4231e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65e00aef4231e.jpg"],
        },
        {
          day: 5,
          title: "Halong Bay - Set Sail On A Breathtaking Overnight Cruise",
          description: "Morning\n\nAround 08:00 to 08:30, our driver will pick you up and drive to Halong Bay, a World Heritage with breathtaking natural beauty. It’s a short transfer and only takes around 2.5 hours on the road to get to this must-visit destination. Upon arrival, you will be welcomed by the enthusiastic boat crew, who will help you with the check-in procedure. Boarding time is around 12:00. Your lunch will be served while the boat is cruising to the bay, and you will see many lovely islets with different shapes, the typical scene that only can be seen in Halong Bay, during your meal",
          activities: [],
          meals: ["Breakfast","Lunch","Dinner"],
          accommodation: "Overnight on Cruise",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00b47a654f.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00b47a654f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00aef4231f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65e00aef4231f.jpg"],
        },
        {
          day: 6,
          title: "Enjoy A",
          description: "Morning\n\nSay “good morning” to Halong Bay with a Tai-chi class in the early morning or simply wake up and witness the amazing sunrise on the bay. A light breakfast will be served right after that, you will continue to explore and experience this magnificent bay by visiting a cave or kayaking. Return to the boat at 10:00 for checking out. After that, enjoy your last delicious meal onboard and prepare to finish your cruise. Between 11:30 and 11:45, the boat will arrive at the port, and the crew will say thank you and goodbye to you",
          activities: [],
          meals: ["Breakfast","Brunch"],
          accommodation: "Hotel in Hanoi",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00aef42320.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00aef42320.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65e00aef42320.jpg"],
        },
        {
          day: 7,
          title: "Hanoi - Flight To Da Nang - Welcome to Enchanting Hoi An",
          description: "Morning\n\nFree time at your hotel until getting picked up at your hotel and taken to Noi Bai International Airport for a flight to Da Nang City. Arriving at the Da Nang Airport. A friendly driver is waiting and will transfer you to the hotel in Hoi An. You are free to relax at leisure.",
          activities: [],
          meals: ["Breakfast"],
          accommodation: "Hotel in Hoi An",
        },
        {
          day: 8,
          title: "Hoi An Ancient Town Half-day Walking Tour - Step Back in Time",
          description: "Morning\n\nExplore the lively Hoi An Market, a place full of colors, aromas, and local energy that makes for a truly memorable shopping experience. Nearby, the Fujian Chinese Assembly Hall impresses with its vibrant gates, dragon statues, and ornate rooftops, where you can also observe locals making offerings at the family altar and learn about ancestor worship. Discover Hoi An’s historic houses, such as Phung Hung Ancient House and Tan Ky Ancient House, which have stood the test of over 200 years of weather and history. Then, visit the Museum of Folk Culture, set in a 150-year-old Chinese merch",
          activities: [],
          meals: ["Breakfast"],
          accommodation: "Hotel in Hoi An",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00aef42321.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00aef42321.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00b47a6550.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65e00aef42321.jpg"],
        },
        {
          day: 9,
          title: "Free Day in Hoi An - Explore at Your Own Pace",
          description: "It’s time for you to have free time to explore the hidden charm of Hoi An. You can discover the little town inside out on your own or choose one of the below suggestions:\n\nDiscover My Son Holly Land Half day\tFROM US $48 /pax\nJoin The Hoi An Memories Show\tFROM US $24 /pax\nLife as a Farmer in Cam Thanh village\tFROM US $79 /pax\n\nEnjoy your happy free day and prepare for the long transfer the next day!",
          activities: [],
          meals: ["Breakfast"],
          accommodation: "Hotel in Hoi An",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00b47a6551.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00b47a6551.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e9cfa365fc.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00aef42310.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65e00aef42310.jpg"],
        },
        {
          day: 10,
          title: "Hoi An to Hue Scenic Drive - Via the Majestic Hai Van Pass",
          description: "Morning\n\nYou will be picked up at 08:00 from your hotel in Hoi An, then head to Hue. It takes at least 3 hours for a car transfer from Hoi An to Hue via Hai Van Pass, one of Vietnam's most famous and majestic passes. Afternoon\n\nTime to rest and explore Hue on your own. Don’t forget to try the street food in Hue, its unique taste can’t be found anywhere else!",
          activities: [],
          meals: ["Breakfast"],
          accommodation: "Hotel in Hue",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e9d725fe17.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e9d725fe17.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e9d49ea438.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00aef42313.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65e00aef42313.jpg"],
        },
        {
          day: 11,
          title: "Half-Day Hue City Tour - A Glimpse into Vietnam’s Imperial Past",
          description: "Morning\n\nOur tour guide will see you at 08:00, and your Hue city discovery begins. First, your group will visit Thien Mu Pagoda - the most famous Buddhist attraction in Central Vietnam, a royal pagoda lying beside the poetic Perfume River with hundreds of years of history and impressive architecture. Then, the tour guide will take you to the Imperial Citadel, which used to be the \"house” of the Nguyen Royal Family, the last dynasty in Vietnam, where you will hear the story of the last journey of the feudal period in Vietnam. Your final stop is the Dong Ba Market - the largest traditional tradi",
          activities: [],
          meals: ["Breakfast"],
          accommodation: "Hotel in Hue",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00aef42319.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00aef42319.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e9d365902b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00aef42314.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65e00aef42314.jpg"],
        },
        {
          day: 12,
          title: "Hue - Flight To Ho Chi Minh",
          description: "Take a flight to get to Ho Chi Minh City, Vietnam’s economic center, which is the most crowded city with over 10 million of population and where you will find an incredible mix of Vietnamese traditional culture and modern life. Upon arrival, our driver will wait and transfer you to the Ho Chi Minh City hotel.",
          activities: [],
          meals: ["Breakfast"],
          accommodation: "Hotel in Ho Chi Minh City",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00aef4231a.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00aef4231a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00aef42315.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e9d24ebe04.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00aef42316.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65e00aef42315.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65e00aef42316.jpg"],
        },
        {
          day: 13,
          title: "Full Day Mekong Delta Discovery - A Day of Authentic Experiences",
          description: "Morning\n\nHave breakfast at your hotel. Our tour guide and driver will pick you up at 08:00 for a whole day trip to explore the colorful Mekong Delta. Get to Ben Tre Province for a boat trip to travel along the Ham Luong River - a big and long river that flows throughout this province, where you can see many lush islets created by alluvial and connect with many exciting places to visit in the Mekong Delta. Stop off at various housemade factories to see how the local economy works: a brickwork factory, a coconut candy-making workshop - where you can learn about how people here create their speci",
          activities: [],
          meals: ["Breakfast","Lunch"],
          accommodation: "Hotel in Ho Chi Minh",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e9d813c31b.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e9d813c31b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00aef42317.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65e00aef42317.jpg"],
        },
        {
          day: 14,
          title: "Explore Top Attractions On Half Day City Tour",
          description: "Join the Ho Chi Minh sightseeing tour “all-in-one” to visit all the top must-see attractions here. To begin, we pay a visit to the War Remnants Museum, which preserves more than 20,000 documents, artifacts, and movies about evidence of crimes and consequences of wars that the invading forces have caused to Vietnam. Next, move to the Reunification Palace which used to be the residence and working place of the President of the Republic of Vietnam, this place witnessed and marked the day Vietnam officially gained independence and territorial integrity. Continuing our journey to the stunning Saigo",
          activities: [],
          meals: ["Breakfast"],
          accommodation: "Hotel in Ho Chi Minh City",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00aef42318.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00aef42318.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e9d0e4081a.jpg"],
        },
        {
          day: 15,
          title: "Ho Chi Minh City Departure - Farewell Vietnam",
          description: "Morning\n\nHave leisure time and enjoy your last moment of our small group tour in Ho Chi Minh City before your departure. BestPrice Travel’ driver will drive you to the airport for your onward flight. Farewell and see you again!\n\nNOTE: Check-out time is at 12:00. Please contact your travel consultant if you want a late checkout.",
          activities: [],
          meals: ["Breakfast"],
        },
      ],
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66cd31d423636.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00b47a654c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00aef4231b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00aef4231c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00aef4231d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e9ce693c9c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00b47a654e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00aef4231e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00b47a654f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00aef4231f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00aef42320.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00aef42321.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00b47a6550.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00b47a6551.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e9cfa365fc.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00aef42310.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e9d725fe17.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e9d49ea438.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00aef42313.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00aef42319.jpg"],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 360,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Mai Chau", "Halong Bay", "Hue", "Hoi An", "Ho Chi Minh City", "Mekong Delta"],
    activities: ["cruise", "cultural", "trekking", "photography"],
  },
  {
    id: "highlights-vietnam-12d",
    slug: "highlights-vietnam-north-south-12-days",
    name: "Highlights of Vietnam: North to South 12 Days",
    category: "multi-day",
    location: "Complete Vietnam",
    duration: "12 days, 11 nights",
    price: 1029,
    description: "Perfect journey for first-time visitors offering deep experiences of culture, nature, and people across the nation.",
    fullDescription: `
      <h3>Vietnam Highlights - 12 Days</h3>
      <p>A perfect journey for first-time visitors to Vietnam, combining cultural heritage, natural beauty, and local interactions.</p>

      <h3>What Makes It Special</h3>
      <ul>
        <li>Hanoi city highlights including temples and pagodas</li>
        <li>Halong Bay overnight cruise with cave exploration</li>
        <li>Hoi An Ancient Town UNESCO World Heritage</li>
        <li>Hue Imperial Citadel exploration</li>
        <li>Cu Chi Tunnels historical experience</li>
        <li>Mekong Delta rural adventures</li>
      </ul>
    `,
    highlights: ["Hanoi", "Halong Bay Cruise", "Hoi An", "Hue", "Cu Chi Tunnels", "Mekong Delta"],
    included: ["10 hotel nights", "1 cruise night", "11 breakfasts", "4 lunches", "1 dinner", "Internal flights", "Transfers", "English guide", "Entrance fees"],
    excluded: ["Visa fees", "Insurance", "Personal expenses", "Tips"],
    imageUrl: "/tours/highlights-vietnam-12d.jpg",
    rating: 9.4,
    reviewCount: 171,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/highlights-of-vietnam-12-days.html",
    itinerary: [
        {
          day: 1,
          title: "Hanoi Arrival - Welcome to Vietnam!",
          description: "Morning\n\nOnce you arrive in Hanoi, our tour guide will pick you up at Pole No.10 outside the Terminal and transfer you to your hotel for check-in procedures. Normally, 14:00 is the check-in time at your hotel. Since the rest of this day is free for leisure, it’s highly recommended to book an optionalcity tour to explore this ‘Paris of the East’:\n\nHanoi Street Food Walking Tour\n\n\t\n\nFrom US $29 /pax\n\n\n\n\nHanoi Foodie Tour by Motorbike at Night\n\n\t\n\nFrom US $78 /pax\n\n\n\n\nHanoi Sacred Night II: Live Like Flowers at Hoa Lo Prison\n\n\t\n\nFrom US $28 /pax\n\nNOTE: There will be a surcharge if you want to che",
          activities: [],
          accommodation: "Hotel in Hanoi",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e933b9dd26.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e933b9dd26.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00050a85fd.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65dffc8108b66.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65dffc8108b62.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e949e41e3b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e93b5cb5dc.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65dff9818d4a2.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65dff9818d4a6.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e94bf55918.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65dff9818d4a5.jpg"],
        },
        {
          day: 2,
          title: "Explore Hanoi’s Highlights Half-day (SIC)",
          description: "Morning\n\n08:00 - 08:30: Our guide will meet your group at the hotel, and we will begin our exciting half-day tour in Hanoi, which includes various remarkable well-known attractions:\n\nFirstly, we visit the Temple of Literature, which is the first national university of Vietnam. The place is where culture seekers can explore the diverse buildings and gardens that make up the temple complex. One Pillar Pagoda is the second attraction you will head to - a cultural and spiritual attraction processing unique architecture like a beautiful lotus emerging from the water. An essential destination where",
          activities: [],
          meals: ["Breakfast","Lunch"],
          accommodation: "Hotel in Hanoi",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e9352e8692.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e9352e8692.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65dff9818d4a7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e93e396670.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65dff9818d4a8.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e93a00b171.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65dff9818d4a7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65dff9818d4a8.jpg"],
        },
        {
          day: 3,
          title: "Halong Bay - Stay Overnight On An Elegant Cruise",
          description: "Morning\n\nAfter breakfast, our driver will pick you up at 08:00 and head to the cruise port in Halong Bay. Upon arrival, the cruise staff will help you with the check-in procedure. At noon, nature goers will be warmly welcomed with a welcome drink, then listen to the cruise introduction and safety guidelines briefly. A delectable lunch will be served on board while the cruise is sailing further to secluded parts of the bay. Afternoon\n\nLet’s start our expedition by participating in different exciting activities such as swimming and submerging yourself in the emerald cool water, exploring mysteri",
          activities: [],
          meals: ["Breakfast","Lunch","Dinner"],
          accommodation: "Overnight on Cruise",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65dffc8108b63.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65dffc8108b63.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65dff9818d4a9.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65dff9818d4aa.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65dff9818d4aa.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65dff9818d4a9.jpg"],
        },
        {
          day: 4,
          title: "Halong Bay - The Second Day To Venture",
          description: "Morning\n\nYou can spend your morning in the bay by joining a Tai Chi session on the sundeck, with deliberate movements and breathing exercises. For anyone who can’t wake up soon, you can also sleep until breakfast time. After having breakfast, the cruise will take you on a new excursion to discover another famous attraction of Halong Bay. Around 10:00, you will return to the ship and pack your luggage for checkout. A scrumptious brunch is served onboard while the cruise sails back to the port",
          activities: [],
          meals: ["Breakfast","Brunch"],
          accommodation: "Hotel in Hanoi",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e941948a4d.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e941948a4d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65dff9818d4ab.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65dff9818d4ab.jpg"],
        },
        {
          day: 5,
          title: "Flight to Da Nang - Head To Alluring Hoi An",
          description: "Morning\n\nIt’s the last day in Hanoi before heading to the next destination of this holiday package. Depending on the flight time, our driver will pick you up at the hotel and transfer you to Noi Bai International Airport for your flight to Da Nang. Our driver will be waiting for you at Da Nang Airport and drive you to your hotel in Hoi An. Afternoon\n\nWelcome to the laidback town - Hoi An!\n\nYou will have free time for the rest of the day to relax, or spend your leisure time exploring the most charming town in Vietnam, which features a slow pace of life and vintage architecture.",
          activities: [],
          meals: ["Breakfast"],
          accommodation: "Hotel in Hoi An",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65dffc8108b64.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65dffc8108b64.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e943020f9a.jpg"],
        },
        {
          day: 6,
          title: "Discover Hoi An Ancient Town Half Day",
          description: "Morning /Afternoon\n\nLet’s get ready for the half-day walking tour today!\n\nStart at the bustling Hoi An Market, a sensory feast of sights, colors, sounds, and aromas, perfect for a memorable shopping experience. Next, visit the Phuc Kien Chinese Assembly Hall, with its vibrant gates, intricate dragon statues, and ornate rooftops. Here, you can learn about ancestor worship by observing family altars and locals making offerings. Explore Hoi An’s remarkably preserved old houses, such as Phung Hung Ancient House and Tan Ky Ancient House, which have stood strong for over 200 years. Then, head to the",
          activities: [],
          meals: ["Breakfast"],
          accommodation: "Hotel in Hoi An",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65dff9818d4ac.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65dff9818d4ac.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e9455837ef.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65dff9818d4ac.jpg"],
        },
        {
          day: 7,
          title: "Say Goodbye To Hoi An - Hue Road Transfer",
          description: "Morning\n\nAfter breakfast, you will have spare time to pack your suitcase before transferring to Hue. It takes about 2 hours on the road to reach the ancient capital. Upon arrival, the hotel staff will welcome you and help you check in. For the rest of the day, you are free to explore the city by yourself. If you need a guide to show you around, why not consider booking one of our fascinating optionaltours in Hue:\n\nHue Street Food Tour on Foot\n\n\t\n\nFrom US $28 /pax\n\n\n\n\nDMZ - Phong Nha Cave Full Day from Hue\n\n\t\n\nFrom US $114 /pax\n\n\n\n\nDiscover Bach Ma National Park & Lang Co Beach Full day\n\n\t\n\nFro",
          activities: [],
          meals: ["Breakfast"],
          accommodation: "Hotel in Hue",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65dff9818d4ad.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65dff9818d4ad.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65dff9818d4ad.jpg"],
        },
        {
          day: 8,
          title: "Half-day Hue City Tour (SIC - Small Group)",
          description: "Morning\n\nYou will be picked up from your hotel at 08:00 - 08:30 to start your city exploration. Today, your group can have the chance to see the best of Hue, from ancient royal architecture to hectic local life. The first well-known attraction in Hue that you will visit is the Thien Mu Pagoda, a famous Buddhist attraction considered the unofficial symbol of the city located at the bank of the enchanting Perfume River. The next journey is to discover the Imperial Citadel, which is one of the remaining Hue Monuments Complex recognized as a UNESCO World Cultural Heritage site since 1993. For thos",
          activities: [],
          meals: ["Breakfast"],
          accommodation: "Hotel in Hue",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65dffc8108b60.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65dffc8108b60.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e93cecaa3f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65dffc8108b5e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65dffc8108b60.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65dffc8108b5e.jpg"],
        },
        {
          day: 9,
          title: "Flight to Ho Chi Minh City - The City That Never Sleeps",
          description: "Morning\n\nSaying goodbye to Hue must be bittersweet, but we are sure the bustling city you're headed to next will be just as exciting. After having breakfast at the hotel, you will take a 1.5-hour flight to Ho Chi Minh City from Phu Bai Airport. Upon arrival, our driver will wait for you at the airport and transfer you to your hotel in the city center. Afternoon\n\nHope you're enjoying your stay! After checking in, you might want to take some time to unwind and relax. If you're feeling up for it, you could also explore the city and see what it has to offer",
          activities: [],
          meals: ["Breakfast"],
          accommodation: "Hotel in Ho Chi Minh city",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65dffc8108b61.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65dffc8108b61.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e948baa93d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65dffc8108b61.jpg"],
        },
        {
          day: 10,
          title: "Cu Chi Tunnels - Ho Chi Minh City Exploration (Small Group)",
          description: "Morning\n\nEnjoy breakfast at the hotel, then let’s start your adventure by heading to Cu Chi Tunnels for 1.5 hours!\n\nYou will have a chance to explore a part of the most complicated underground tunnel system constructed since the Vietnam-American War. Upon arrival, travelers will be introduced to the tunnel constructions and previous usage by watching a documentary movie\n\nNext, you will try to go through the tunnel and find out how intricate the 136-mile underground network used by Viet Cong soldiers. Then witness a display of living quarters, meeting room, weapons room, and different types of",
          activities: [],
          meals: ["Breakfast","Lunch"],
          accommodation: "Hotel in Ho Chi Minh City",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65dffc8108b62.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65dffc8108b62.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e949e41e3b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e93b5cb5dc.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65dff9818d4a2.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65dff9818d4a6.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65dffc8108b62.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65dff9818d4a2.jpg"],
        },
        {
          day: 11,
          title: "Thrilling Venture To Mekong Delta Full day (SIC)",
          description: "Morning\n\nAt 08:00, you will hit the road from Ho Chi Minh City to Ben Tre Province and start the fascinating excursion at the Mekong Delta. Firstly, adventure seekers will have an incredible experience by getting on a boat cruising along the Ham Luong River, where you get to take in the beautiful scenery and see the rustic life of the riverside landscapes. You also have the opportunity to visit local workshops where I witnessed the process of creating coconut products and mat weaving. After that, you take a leisurely stroll through the village - a great chance to see the local culture up close",
          activities: [],
          meals: ["Breakfast","Lunch"],
          accommodation: "Hotel in Ho Chi Minh City",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e94bf55918.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e94bf55918.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65dff9818d4a5.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65dff9818d4a4.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65dff9818d4a5.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65dff9818d4a4.jpg"],
        },
        {
          day: 12,
          title: "Ho Chi Minh Departure",
          description: "Morning\n\nThis morning is the time for you to have breakfast at the hotel, pack your luggage, and enjoy your last moment in Ho Chi Minh City. Depending on your flight time, our driver will transfer you to the airport. NOTE: Hotel check-out time is 12:00 but you still can order a late check-out with a surcharge.",
          activities: [],
          meals: ["Breakfast"],
        },
      ],
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66cd3179db719.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e933b9dd26.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00050a85fd.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65dffc8108b66.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e9352e8692.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65dff9818d4a7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e93e396670.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65dff9818d4a8.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e93a00b171.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65dffc8108b63.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65dff9818d4a9.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65dff9818d4aa.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e941948a4d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65dff9818d4ab.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65dffc8108b64.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e943020f9a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65dff9818d4ac.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e9455837ef.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65dff9818d4ad.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65dffc8108b60.jpg"],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 288,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Halong Bay", "Hoi An", "Hue", "Ho Chi Minh City", "Cu Chi", "Mekong Delta"],
    activities: ["cruise", "cultural", "nature", "photography"],
  },
  {
    id: "real-taste-vietnam-13d",
    slug: "real-taste-vietnam-food-tour-13-days",
    name: "Real Taste of Vietnam 13 Days",
    category: "multi-day",
    location: "Complete Vietnam",
    duration: "13 days, 12 nights",
    price: 1349,
    description: "Designed specifically for food lovers who want to fully explore the unique flavors of Vietnam from North to South.",
    fullDescription: `
      <h3>Culinary Journey Through Vietnam</h3>
      <p>A food lover's dream tour exploring the unique and diverse flavors of Vietnamese cuisine from street food to fine dining.</p>

      <h3>Food Experiences</h3>
      <ul>
        <li>Hanoi street food walking tour</li>
        <li>Vietnamese cooking classes with market visits</li>
        <li>Hue royal cuisine tasting</li>
        <li>Hoi An food tours by motorbike</li>
        <li>Saigon nightlife food tour</li>
        <li>Mekong Delta local delicacies</li>
      </ul>

      <h3>Cultural Highlights</h3>
      <p>Beyond food, explore Vietnam's must-see attractions including Halong Bay, ancient temples, and vibrant cities.</p>
    `,
    highlights: [
      "Designed specifically for food lovers who want to fully explore the flavors of Vietnam from North to South",
      "Don't miss the chance to enjoy unique and attractive street foods in Hanoi, Hoi An, Hue, and Saigon",
      "Visiting must-see attractions in Vietnam besides exploring the unique cuisine, creating a complete experience journey"
    ],
    itinerary: [
      {
        day: 1,
        title: "Hanoi arrival - Street food tour",
        description: "Upon arrival in Hanoi, you will transfer to your hotel for check-in and a short rest before beginning your first culinary adventure.\n\nAt 17:30, our friendly local guide will meet you in front of Shinhan Bank at 14 Le Thai To Street, Hang Trong Ward, Hoan Kiem District, and take you on a fascinating food journey through the bustling streets of the Hanoi Old Quarter. This walking tour is the perfect introduction to Vietnam's rich street food culture, where every corner reveals tempting aromas and vibrant flavors.\n\nThe menu may vary depending on the day, but highlights often include signature noodle soups such as Pho Bo (Vietnamese Beef Noodle Soup), Bun Thang (Rice Vermicelli with Chicken and Egg), or the spicy Bun Bo Hue. You will also savor classic bites like Banh Cuon (Steamed Rice Rolls) and the world-famous Banh Mi (Vietnamese baguette sandwich). For light street snacks, try favorites such as Nom Bo Kho (Dried Beef Salad) or Nem Chua Ran (Fried Fermented Pork Rolls).\n\nTo finish, no Hanoi food tour would be complete without tasting the city's iconic Ca Phe Trung (Egg Coffee) – a rich, creamy, and unforgettable specialty.\n\nNote: If you have dietary requirements (vegetarian, vegan, or food allergies), please inform us in advance so we can customize your experience.",
        activities: ["Hotel check-in", "Evening street food walking tour", "Sample Pho Bo, Bun Thang, Banh Cuon, Banh Mi", "Try Ca Phe Trung (Egg Coffee)"],
        meals: ["Dinner"],
        accommodation: "Hotel in Hanoi",
        imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666b52238416.jpg",
        dayImages: [
          "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666b52238416.jpg",
          "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a052c35fe.jpg",
          "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a052c3602.jpg",
          "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a052c3601.jpg",
          "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b74ac75255.jpg",
          "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b74ac75256.jpg",
          "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b74ac7525a.jpg",
          "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666b63d6f710.jpg"
        ],
        foodHighlights: ["Pho Bo", "Bun Thang", "Bun Bo Hue", "Banh Cuon", "Banh Mi", "Egg Coffee", "Nom Bo Kho", "Nem Chua Ran"]
      },
      {
        day: 2,
        title: "Hanoi Cooking Class Half Day",
        description: "Morning Class: 09:00 - 12:30\nAfternoon Class: 15:00 - 18:30\n\nYour culinary journey begins with a pickup from your accommodation in Hanoi Old Quarter. Accompanied by our expert guide, you'll explore a bustling local market, where you'll master the art of haggling and discover the fresh ingredients that define Vietnamese cuisine.\n\nNext, watch as our talented chef demonstrates the secrets of authentic Vietnamese dishes before you step into the kitchen yourself. Under guided instruction, you'll recreate these flavorful masterpieces and enjoy a tasting session featuring a variety of local delights.\n\nOnce your dishes are ready, sit down to savor the fruits of your labor, indulging in the rich and vibrant flavors of Vietnam. At the end of this immersive experience, you'll receive detailed recipes and a certificate to take home as a memento of your culinary skills.\n\nAfter class, we'll transport you back to your accommodation, marking the end of a fantastic gastronomic adventure.\n\nEnjoy leisure time for the remainder of the day, or join one of our enriching optional experiences.",
        activities: ["Local market visit", "Cooking class with chef", "Learn traditional recipes", "Tasting session", "Receive recipes and certificate"],
        meals: ["Breakfast", "Lunch"],
        accommodation: "Hotel in Hanoi",
        imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b73b910440.jpg",
        dayImages: [
          "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b73b910440.jpg",
          "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b73b910446.jpg",
          "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b73b910441.jpg",
          "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666b53a147d7.jpg",
          "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b73b910436.jpg"
        ]
      },
      {
        day: 3,
        title: "Halong Bay - Overnight on Cruise",
        description: "Morning\n\nWake up early to savor prepared breakfast at the hotel. From 08:00 - 08:30, we depart from the hotel lobby to meet our tour guide and head to the next destination, Halong Bay. The trip to this must-see location is quick and easy, taking only about 2.5 hours by car.\n\nAt noon, you will board the cruise in warm welcome of the crew staff then enjoy a tasty drink from them. For a safe cruise trip, listen carefully to the rules and guidance from our manager.\n\nYou can enjoy a variety of unique islets and gleaming blue ocean scenery while lunch is served on board.\n\nAfternoon\n\nTake a nap after lunch to refresh yourself for the afternoon's activities, which may include swimming in the crystal-clear waters of Halong Bay, kayaking, or cave exploration.\n\nThe Sunset Party's \"buy one, get one free\" promotion will start at 17:00 - 17:30, so you might be itching to head back to the boat.\n\nEnjoy a delectable meal at 19:00.\n\nOn board, there are numerous activities to keep you busy at night, such as squid fishing, board games, movies, a nightclub, etc.",
        activities: ["Transfer to Halong Bay (2.5 hours)", "Board cruise ship", "Seafood lunch on board", "Cave exploration", "Kayaking", "Swimming", "Sunset party", "Squid fishing"],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Overnight on board",
        imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b73b910438.jpg",
        dayImages: [
          "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b73b910438.jpg",
          "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b73b910439.jpg",
          "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666b54837e1f.jpg"
        ]
      },
      {
        day: 4,
        title: "Halong Bay Cruise - Hanoi",
        description: "Morning\n\nTo commemorate the start of a new day, 06:00 is time to join the Tai Chi session on the sundeck. For those who rise early, this kind of entertainment is ideal for decompressing both physically and mentally following a demanding first day.\n\nEnjoy a light breakfast buffet full of mouthwatering starters, snacks and drinks to revive yourself.\n\nAs they paddle you into the cave on a bamboo raft, admire the serene beauty of nature surroundings. A large diversity of aquatic life could be visible if you detour through the fishing community.\n\nBefore setting sail, return to the ship to check out and review your belongings one last time. A brunch on the route to Halong Bay is a terrific way to relax if you've already checked out.\n\nAt noon, you will disembark at the cruise port, then transfer to your hotel in Hanoi.\n\nNOTE: Depending on the cruise liner you choose, the attraction you visit may vary.",
        activities: ["Tai Chi on sundeck at 06:00", "Breakfast buffet", "Cave visit by bamboo boat", "Fishing village visit", "Brunch on board", "Return to Hanoi"],
        meals: ["Breakfast", "Brunch"],
        accommodation: "Hotel in Hanoi",
        imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b73b910443.jpg",
        dayImages: [
          "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b73b910443.jpg",
          "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b73b91043b.jpg"
        ]
      },
      {
        day: 5,
        title: "Flight to Hue - Cyclo Food Tour",
        description: "Morning\n\nYou have some time off this morning to eat breakfast and pack your luggage. Then, take the flight directly to the Old Capital of Vietnam - Hue.\n\nEvening\n\nAt about 18:00, your guide will reach your accommodation in Hue by cyclo.\n\nThen, your first trip in Hue is a food tour to sample Hue's most specialties: Banh Beo, Banh Nam, Banh Bot Loc, Banh Ram It, Banh Uot, Banh Khoai, etc.\n\nAfter that, you will ride the cyclo to \"Hen Island\" where you may have clam dishes like clam noodles and clam rice (\"Hen\" meaning baby clam).\n\nAlong the route, you will stop along the way to see the Imperial Citadel at night, which served as the ruler of the Nguyen Dynasty's palace.\n\nIt will be ideal in case we reach Truong Tien Bridge at dusk, which is a perfect place for sunset watching.\n\nEn route back, you still can sightsee the picturesque panorama of Hue nightlife as the cyclo drives you around the streets.\n\nFor mementos, you can purchase Minh Mang wines, sour prawns, conical hats, long dresses (ao dai), and sesame candy at some street stalls.\n\nYou will be back to the hotel before 22:00 to rest and recharge energy for the day after.",
        activities: ["Morning flight to Hue", "Cyclo food tour at 18:00", "Visit Hen Island", "Sample Hue specialties", "Imperial Citadel night view", "Truong Tien Bridge sunset", "Shopping for souvenirs"],
        meals: ["Breakfast", "Dinner"],
        accommodation: "Hotel in Hue",
        imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b73b91043c.jpg",
        dayImages: [
          "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b73b91043c.jpg",
          "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b73b91043d.jpg",
          "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b73b910444.jpg"
        ],
        foodHighlights: ["Banh Beo", "Banh Nam", "Banh Bot Loc", "Banh Ram It", "Banh Uot", "Banh Khoai", "Clam noodles", "Clam rice"]
      },
      {
        day: 6,
        title: "Hue City Tour Full Day",
        description: "Morning\n\nGather at the hotel lobby between 08:00 - 08:30 to start our journey.\n\nThien Mu Pagoda is the first attraction we visit. The pagoda has a rich history dating back to the early 17th century. It is a popular destination which attracts visitors with its historical significance, architectural beauty, and scenic surroundings.\n\nNext, come to the Imperial Citadel of Hue is a vast walled complex featuring a unique blend of traditional Vietnamese, Chinese, and European architectural styles. You might take time to admire the beauty from the front gate, to the Flag Tower, and The King's Palace.\n\nAfter two historic destinations, you can go shopping in Dong Ba Market. In this oldest market in Hue, you can find a bunch of interesting things displayed on kiosks that stand next to each other that you definitely want to purchase as gifts when you travel back to your country.\n\nAfternoon\n\nSee the Khai Dinh Tomb, which is the smallest tomb of the Nguyen Emperors and is renowned for its exquisite fusion of Western and Oriental design elements.\n\nAdmire the magnificent scenery in the Tomb of Emperor Minh Mang. The architecture is striking to your vision with its old-world sense infused with Confucian values.\n\nBefore returning to the hotel, visit a conical hat village to observe the artisans at work and have an opportunity to chat with the people.\n\nOur tour ends in your hotel lobby at approximately 17:00.",
        activities: ["Thien Mu Pagoda", "Imperial Citadel of Hue", "Flag Tower", "King's Palace", "Dong Ba Market shopping", "Khai Dinh Tomb", "Minh Mang Tomb", "Conical hat village"],
        meals: ["Breakfast", "Lunch"],
        accommodation: "Hotel in Hue",
        imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b73b91043e.jpg",
        dayImages: [
          "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b73b91043e.jpg",
          "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b73b91043f.jpg",
          "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b73b910445.jpg",
          "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666b5568885f.jpg"
        ]
      },
      {
        day: 7,
        title: "Road Transfer: Hue - Hoi An - City Tour",
        description: "Morning\n\nTake a shuttle bus or a private car to your accommodation in Hoi An.\n\nAfternoon\n\nYour trip Hoi An begins with a visit to the bustling Hoi An Market, where the sights, colors, sounds, and smells create an unforgettable shopping experience. Just nearby is the Phuc Kien Chinese Assembly Hall, a vibrant space filled with bright gates, dragon statues, and elaborate rooftops. Here, you can learn about ancestor worship as you observe the family altar and watch local devotees making offerings.\n\nNext, you will explore remarkably well-preserved old houses such as the Phung Hung Ancient House and Tan Ky Ancient House, which have withstood over 200 years of weather and history.\n\nThe journey continues to the Museum of Folk Culture, housed in a 150-year-old Chinese merchant house, where artifacts depict ancient local daily life. Don't miss the Hoi An Traditional Performing Arts House, where you can enjoy captivating art performances.\n\nMake a stop at the Japanese Bridge, constructed over 400 years ago to connect the Japanese community with the Chinese living across the waterway.\n\nYou will also visit Hoi An's renowned handicraft shops and art galleries, discovering smaller laneways and local neighborhoods along the way, gaining a deeper appreciation of Hoi An's timeless charm.",
        activities: ["Scenic drive to Hoi An", "Hoi An Market visit", "Phuc Kien Chinese Assembly Hall", "Phung Hung Ancient House", "Tan Ky Ancient House", "Museum of Folk Culture", "Hoi An Traditional Performing Arts House", "Japanese Bridge", "Handicraft shops and art galleries"],
        meals: ["Breakfast"],
        accommodation: "Hotel in Hoi An",
        imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b74ac75251.jpg",
        dayImages: [
          "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b74ac75251.jpg",
          "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b74ac75252.jpg",
          "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b74ac75259.jpg",
          "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666b579b7005.jpg"
        ]
      },
      {
        day: 8,
        title: "Be a farmer in Tra Que Village",
        description: "Morning\n\nAfter breakfast, meet your local guide in the hotel lobby. Depart for a rural farm in Tra Que Village at 08:00.\n\nAccompany the farmers as they prepare the field, apply seaweed fertilizer from a nearby lake, rake the ground, plant, water, harvest, and perform numerous other gardening tasks.\n\nWork on the farm for the remainder of the morning, taking a break to make lunch with your hosts.\n\nThen you can savor organic dishes made from several regional specialties, such as spring rolls and pancakes.\n\nAfternoon\n\nAfter enjoying a foot massage and bidding farewell to your host family, you will return to Hoi An.\n\nYou can take a ride to the craftsman's house in the late afternoon, and he or she will give you a quick overview of the lantern's form, color, and history as well as the procedures involved in creating one.\n\nThere, you get the opportunity to create your own lantern which you can keep after having it done.",
        activities: ["Visit Tra Que vegetable village at 08:00", "Learn traditional farming techniques", "Prepare Vietnamese dishes", "Enjoy organic lunch", "Foot massage", "Visit lantern craftsman", "Create your own lantern"],
        meals: ["Breakfast", "Lunch"],
        accommodation: "Hotel in Hoi An",
        imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b74ac75253.jpg",
        dayImages: [
          "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b74ac75253.jpg",
          "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666b587af825.jpg"
        ]
      },
      {
        day: 9,
        title: "Hoi An Food Tour",
        description: "Afternoon\n\nStarting at sundown, you are taken on a satisfying culinary trip through local cafes, food stalls, markets, and restaurants.\n\nHere are some traditional Hoi An cuisine suggestions we listed for you:\n\nVietnamese bread (Banh Mi): Bread followed in the footsteps of the French and was introduced to our country in the shape of a baguette, which was served with butter, jam, and cold meat in the nineteenth century. Baguettes were \"modified\" over time by Vietnamese people based on their own eating habits and tastes, becoming a popular food today.\n\nCao Lau: The difference between Cao Lau and other noodle dishes is the texture. Cao Lau noodles are firmer and chewier. Additionally, the best way to enjoy Cao Lau's taste is to eat from street vendors who only serve Cao Lau or a small handful of local dishes.\n\nBanh Beo: Banh Beo is a traditional Vietnamese cake that is a popular snack among the residents of Hoi An. To find it, you will need to navigate several narrow alleys and stop at a few local business buildings.\n\nBanh Khot: A round pancake made with rice flour, turmeric, coconut milk, quail egg, and vegetables. A street vendor near Hoai Square will be an ideal place to try Banh Khot.",
        activities: ["Evening food tour at sundown", "Visit local cafes and food stalls", "Sample Banh Mi", "Try authentic Cao Lau", "Taste Banh Beo", "Enjoy Banh Khot near Hoai Square"],
        meals: ["Breakfast", "Dinner"],
        accommodation: "Hotel in Hoi An",
        imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666b5975b379.jpg",
        dayImages: [
          "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666b5975b379.jpg",
          "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b74ac75254.jpg"
        ],
        foodHighlights: ["Banh Mi", "Cao Lau", "Banh Beo", "Banh Khot"]
      },
      {
        day: 10,
        title: "Da Nang Flight to Ho Chi Minh - Night Life Tour by Motorbike",
        description: "Morning\n\nBefore heading to the Da Nang airport for your journey to Ho Chi Minh City, you have a little free time in the morning.\n\nTransfer to the hotel from the airport upon arrival. After finishing checking in, you can unwind in the hotel or wander around Ho Chi Minh.\n\nEvening\n\nYour evening begins at 17:30 when our professional drivers pick you up from your hotel to explore the lively streets of Ho Chi Minh City. The journey starts with a scenic ride through the city center, offering a view of the impressive Bitexco Tower, one of Vietnam's tallest skyscrapers, as you take in the vibrant evening atmosphere.\n\nWe then immerse ourselves in Saigon's nightlife by walking along the bustling sidewalks, mingling with locals at street-side eateries and cafes. The tour continues to Chinatown, where colorful temples and lively streets highlight the rich Vietnamese-Chinese heritage. Along the way, you can shop for unique gifts and enjoy a variety of tasty street food from local vendors.\n\nNext, we visit the Ho Thi Ky Flower Market, the city's largest flower market established in 1987. Here, you'll be captivated by the stunning flower displays and the energetic nighttime trade as locals transport fresh flowers through the market.\n\nAt 22:00, your tour concludes with a safe transfer back to your hotel, leaving you with a memorable and flavorful experience of Saigon by night.",
        activities: ["Flight to Ho Chi Minh City", "Evening motorbike tour at 17:30", "Bitexco Tower view", "Chinatown exploration", "Ho Thi Ky Flower Market", "Street food sampling", "Return by 22:00"],
        meals: ["Breakfast", "Dinner"],
        accommodation: "Hotel in Ho Chi Minh",
        imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b74ac75255.jpg",
        dayImages: [
          "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b74ac75255.jpg"
        ]
      },
      {
        day: 11,
        title: "Cu Chi Tunnels & Cooking Class full day",
        description: "Morning\n\nAt 07:30, depart from your hotel in Ho Chi Minh City for a scenic drive to Cu Chi District, a region steeped in history and rural charm.\n\nUpon arrival, visit the Ho Chi Minh Agricultural Villages, where you can stroll through lush rice fields, observe fish and prawn ponds, and gain insight into the agricultural backbone of Vietnam.\n\nNext, take part in an interactive cooking class, where you'll learn to prepare three traditional Vietnamese dishes and a dessert, offering a hands-on experience of Vietnam's rich culinary heritage.\n\nAfternoon\n\nAfter lunch, explore a local village and witness the traditional rice paper-making process, where skilled artisans craft this staple using time-honored techniques. Continue to a rubber tree forest, where you'll observe local workers extracting latex - a fascinating look into an important industry.\n\nThe journey then takes you to the Cu Chi Tunnels, an extensive 250-kilometer underground network used during wartime. Start with an informative documentary, then venture into the tunnels for a firsthand experience of the challenging conditions soldiers faced.\n\nAt 17:30, return to your hotel in Ho Chi Minh City, concluding a day filled with culture, history, and hands-on experiences.",
        activities: ["Depart at 07:30", "Ho Chi Minh Agricultural Villages", "Interactive cooking class (3 dishes + dessert)", "Rice paper-making demonstration", "Rubber tree forest visit", "Cu Chi Tunnels exploration", "Documentary screening", "Return at 17:30"],
        meals: ["Breakfast", "Lunch"],
        accommodation: "Hotel in Ho Chi Minh City",
        imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b74ac75256.jpg",
        dayImages: [
          "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b74ac75256.jpg",
          "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b74ac7525a.jpg",
          "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666b63d6f710.jpg",
          "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b74ac75257.jpg",
          "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666b64a9d321.jpg",
          "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666b65e6875c.jpg"
        ]
      },
      {
        day: 12,
        title: "Mekong Delta Full Day Discovery",
        description: "Morning\n\nAfter being picked up from your Saigon hotel, travel to Ben Tre Province to explore the Mekong Delta at 08:00.\n\nThe journey kicks off with a boat excursion through Ham Luong River.\n\nDepending on the season, we might have a chance to tour a few local factories like a coconut candy factory to get a feel for how the local economy functions.\n\nA quiet atmosphere greets our touring group at the village where you'll be able to take a quick stroll and get a taste of real life in a Delta town. By riding in a motorized rickshaw, known as a \"xe loi,\" we head into the forest to see the fruit farms.\n\nA delicious and filling dinner will be served at a restaurant, featuring regional specialties and will be paired with a variety of light drinks and beers.\n\nOne of the Mekong region's most famous delicacies is elephant-ear fish, which surprises people with its unusual appearance right away.\n\nAfternoon\n\nTourists leisurely pass through Mekong waterways on a sampan boat ride along the tiny canals till 17:00 before concluding today's excursion.\n\nReturning to the accommodation in Saigon as the sun goes down.",
        activities: ["Depart at 08:00", "Ham Luong River boat excursion", "Coconut candy factory visit", "Local village stroll", "Xe loi (motorized rickshaw) ride", "Fruit farms visit", "Elephant-ear fish tasting", "Sampan boat ride through canals", "Return by 17:00"],
        meals: ["Breakfast", "Lunch"],
        accommodation: "Hotel in Ho Chi Minh City",
        imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666b677a12ba.jpg",
        dayImages: [
          "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666b677a12ba.jpg",
          "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b74ac7524e.jpg",
          "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b74ac75258.jpg",
          "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b74ac7525b.jpg"
        ],
        foodHighlights: ["Elephant-ear fish", "Coconut candy", "Fresh tropical fruits"]
      },
      {
        day: 13,
        title: "Ho Chi Minh Departure",
        description: "Morning\n\nBefore the departure flight from Ho Chi Minh City, you have a spare morning to have breakfast and get ready.\n\nAt the announced time, we will transport you to the Tan Son Nhat airport.",
        activities: ["Breakfast at hotel", "Airport transfer", "Departure from Tan Son Nhat airport"],
        meals: ["Breakfast"],
        accommodation: "N/A"
      }
    ],
    included: [
      "All transport during tour (including airport pick up & see off), as per itinerary",
      "Accommodation with daily breakfast in Twin/Double sharing",
      "All in-tour local English speaking guide",
      "Domestic flight (Hanoi - Hue and Da Nang - Ho Chi Minh)",
      "Meals as stated in the itinerary (12 Breakfasts, 6 Lunches, 1 Brunch, 5 Dinners)",
      "Admission fee as per itinerary"
    ],
    excluded: ["International flights", "Visa", "Travel insurance", "Drinks", "Tips", "Personal expenses"],
    pricingTiers: [
      { category: "Economy 2*+ Hotels", price: 1349 },
      { category: "Superior 3* Hotels", price: 1439 },
      { category: "First Class 4* Hotels", price: 1639 },
      { category: "Deluxe 5* Hotels", price: 2119 }
    ],
    groupSize: { min: 1, max: 12 },
    importantNotes: [
      "Programs & schedules subject to change without prior notice",
      "If you have any specific food requirements (vegetarian, vegan, food allergies) please inform us in advance so that we can provide notice to restaurants, tour guide or our partners so that they can serve you better."
    ],
    imageUrl: "/tours/real-taste-vietnam-13d.jpg",
    imageGallery: [
      "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/678f44c6ae2b9.jpg",
      "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666b52238416.jpg",
      "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b73b910440.jpg",
      "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b73b910438.jpg",
      "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b73b91043c.jpg",
      "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b74ac75251.jpg",
      "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b74ac75253.jpg"
    ],
    rating: 9.5,
    reviewCount: 20,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/real-taste-of-vietnam-13-days.html",
    durationHours: 312,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Halong Bay", "Hue", "Hoi An", "Ho Chi Minh City", "Cu Chi", "Mekong Delta", "Ben Tre"],
    activities: ["food-tour", "cooking-class", "cultural", "cruise"],
  },
  {
    id: "vietnam-cambodia-15d",
    slug: "best-vietnam-cambodia-15-days",
    name: "Best of Vietnam and Cambodia 15 Days",
    category: "multi-day",
    location: "Vietnam & Cambodia",
    duration: "15 days, 14 nights",
    price: 1589,
    description: "Combined experience exploring Vietnamese heritage sites and Angkor temples with Mekong Delta immersion.",
    fullDescription: `
      <h3>Vietnam & Cambodia Combined</h3>
      <p>The ultimate Indochina experience combining the best of Vietnam with the magnificent temples of Angkor in Cambodia.</p>

      <h3>Vietnam Highlights</h3>
      <ul>
        <li>Hanoi ancient capital exploration</li>
        <li>Halong Bay overnight cruise</li>
        <li>Hoi An ancient town</li>
        <li>Ho Chi Minh City bustling metropolis</li>
        <li>Mekong Delta waterways</li>
      </ul>

      <h3>Cambodia Highlights</h3>
      <ul>
        <li>Angkor Wat sunrise experience</li>
        <li>Angkor Thom and Bayon temple</li>
        <li>Ta Prohm jungle temple</li>
        <li>Siem Reap cultural experiences</li>
      </ul>
    `,
    highlights: ["Hanoi", "Halong Bay", "Hoi An", "Mekong Delta", "Angkor Wat", "Siem Reap"],
    included: ["14 nights hotels", "1 night cruise", "All transport", "Flights", "Most meals", "English guides", "Entrance fees"],
    excluded: ["International flights", "Visa", "Insurance", "Tips"],
    imageUrl: "/tours/vietnam-cambodia-15d.jpg",
    rating: 9.6,
    reviewCount: 142,
    affiliateUrl: "https://www.bestpricetravel.com/indochina-tours/best-of-vietnam-and-cambodia-15-days.html",
    itinerary: [
        {
          day: 1,
          title: "Welcome to Hanoi!",
          description: "BestPrice Travel's tour guide will meet you at Pole No.10 (outside the Terminal Gate of Noi Bai International Airport) and transfer you directly to your hotel in the Old Quarter. You should rest after a long flight and prepare for the next day's itinerary. However, if you are so excited to explore the city, you can wander around or choose one of the following suggestions: \n\nHanoi Cyclo and Water Puppet Show With Dinner\n\n\t\n\nFrom US $44/pax\n\n\n\n\nHanoi Cooking Class Half Day\n\n\t\n\nFrom US $48/pax\n\n\n\n\nHanoi Street Food Walking Tour\n\n\t\n\nFrom US $29/pax\n\nNOTE:\n\nIf you cannot find our guide at the airpo",
          activities: [],
          accommodation: "Hotel in Hanoi",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/63a92d4dc1e4e.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/63a92d4dc1e4e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/666feee9bf293.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/69267e2c4764b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/69267e9f7a274.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/69267e9f7a276.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/69267e9f7a277.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/63a92d4dc1e47.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/69267e2c4764b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/69267e9f7a274.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/69267e9f7a276.jpg"],
        },
        {
          day: 2,
          title: "Half-day Hanoi City Tour",
          description: "Morning/ Afternoon\n\nToday you will explore the most famous attractions in Hanoi:\n\nLearn about the historical and cultural values of the Temple of Literature - Vietnam's first university for youngsters from royal and noble families\n\nAdmire the unique architectural temple named One Pillar Pagoda, which represents a giant lotus blooming from the water’s surface\n\nCheck-in at Ho Chi Minh Mausoleum, a historical site where the greatest leader of Vietnam rests in peace\n\nVisit Tran Quoc Pagoda to get a glimpse of this religious, historical, and architectural-valued pagoda\n\nEnjoy the poetic view and se",
          activities: [],
          meals: ["Breakfast","Lunch"],
          accommodation: "Hotel in Hanoi",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/63a92d4dc1e52.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/63a92d4dc1e52.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/666fef1c40792.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/657ad908b2a65.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/666fef31a416c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/63a92d4dc1e52.jpg"],
        },
        {
          day: 3,
          title: "Halong Bay Overnight Cruise",
          description: "Morning\n\nAfter breakfast, start your journey to the outstanding World Natural Heritage in Vietnam - Halong Bay. You will be picked up at 08:00 - 08:30 and transferred from Hanoi to the cruise port in 2.5 - 3 hours. Arriving at the waiting lounge, the staff will process the check-in procedure for you. 12:00 - 12:15: Welcome aboard! Your lunch is ready to be served after the safety briefing. You will have a lavish meal while seeing the magnificent bay through the wide window of the cruise restaurant",
          activities: [],
          meals: ["Breakfast","Lunch","Dinner"],
          accommodation: "Halong Bay cruise",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/659bad7ea95bb.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/659bad7ea95bb.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/day-3-witness-beautiful-sight-on-halong-bay-cruise-64a3e813dd448.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/666fef5c57f32.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/day-3-witness-beautiful-sight-on-halong-bay-cruise-64a3e813dd448.jpg"],
        },
        {
          day: 4,
          title: "Halong Bay - Hanoi - Flight to Da Nang",
          description: "Morning\n\nYou can sleep until breakfast. However, it's highly recommended to wake up early and get to the sundeck for the Tai Chi class. Following the Day 2 itinerary, you will start a new excursion to explore more about Halong Bay. Maybe discover the attractiveness of natural stalactites inside the Trung Trang Cave, or catch a view from the top of Titop Island, etc. NOTE:\n\nSome cruises may organize Yoga/ Vovinam exercises, you should ask our sales consultants for details",
          activities: [],
          meals: ["Breakfast","Brunch"],
          accommodation: "Hotel in Hoi An",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/666fef79c6866.jpg",
        },
        {
          day: 5,
          title: "Half-day Hoi An Walking Tour",
          description: "Morning/ Afternoon\n\nWander through the lively Hoi An Market, where colors, sounds, and aromas mingle to create a true sensory adventure. From fresh produce to handmade crafts, every corner tells a story of daily life in this historic town. Just around the corner, the Phuc Kien Chinese Assembly Hall stands as a stunning example of traditional architecture, its gates, dragons, and intricate rooftops reflecting centuries of craftsmanship and devotion. Step inside Phung Hung Ancient House and Tan Ky Ancient House, both beautifully preserved over 200 years, offering a window into the lives of Hoi A",
          activities: [],
          meals: ["Breakfast"],
          accommodation: "Hotel in Hoi An",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/63a92d4dc1e50.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/63a92d4dc1e50.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/666fef9fb79e4.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/63a92d4dc1e50.jpg"],
        },
        {
          day: 6,
          title: "Free Day in Hoi An",
          description: "It’s time to explore Hoi An on your own. Let your hair down after a long tiring trip, taste more outstanding street foods, or go shopping for handicraft souvenirs. There’re more things to do with our recommendations below:\n\nHoi An Memories Show Ticket\n\n\t\n\nFrom US $24/pax\n\n\n\n\nMy Son Sanctuary Half-Day Tour from Hoi An\n\n\t\n\nFrom US $48/pax\n\n\n\n\nLife as a Farmer in Cam Thanh Village\n\n\t\n\nFrom US $79/pax\n\n\n\n\nHoi An Vespa Tour Half Day\n\n\t\n\nFrom US $110/pax\n\nDo Farming Activities In Cam Thanh Village",
          activities: [],
          meals: ["Breakfast"],
          accommodation: "Hotel in Hoi An",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/666fefbac52fd.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/666fefbac52fd.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/day-6-do-farming-activities-in-cam-thanh-village-64a3ec2b556ce.jpg"],
        },
        {
          day: 7,
          title: "Flight to Ho Chi Minh City",
          description: "Morning\n\nEnjoy your delightful breakfast in Hoi An then transfer to Da Nang Airport for the 1.5-hour flight to Ho Chi Minh City. Upon arrival, get to Pole No.10 (outside the terminal gate) to meet our driver. You will be transferred directly to your hotel. Afternoon\n\nThe rest of the day is yours. You can take a nap and relax for the next tour tomorrow, or explore the city in your own way.",
          activities: [],
          meals: ["Breakfast"],
          accommodation: "Hotel in Ho Chi Minh City",
        },
        {
          day: 8,
          title: "Half-day Ho Chi Minh City Tour",
          description: "Morning/ Afternoon\n\nStart the city tour to the most highlight spots in Ho Chi Minh City, as follows:\n\nReunification Palace: The French-colonial architectural buildings used to be the formal residence of the Republic of Vietnam’s President and their families\n\nSaigon Notre Dame Cathedral: The beautiful church in neo-Romanesque and Gothic design located in the heart of Paris Square\n\nCentral Post Office: The picturesque building in European-styled design built by the French in the 19th century\n\nWar Remnants Museum: A historical site featuring the Vietnam War in more than 20,000 documents, photos,",
          activities: [],
          meals: ["Breakfast"],
          accommodation: "Hotel in Ho Chi Minh City",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/day-8-visit-highlight-spots-in-ho-chi-minh-city-64a3fd412ee77.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/day-8-visit-highlight-spots-in-ho-chi-minh-city-64a3fd412ee77.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/666ff123eca9b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/day-8-visit-highlight-spots-in-ho-chi-minh-city-64a3fd412ee77.jpg"],
        },
        {
          day: 9,
          title: "Ho Chi Minh City - Mekong Delta Exploration",
          description: "Your journey begins as an air-conditioned vehicle picks you up in Ho Chi Minh City and takes you to the charming town of My Tho. Upon arrival, visit the famous Vinh Trang Pagoda, an impressive Buddhist temple known for its unique blend of Vietnamese, Chinese, and Khmer architectural styles. Next, embark on a motorized boat trip along the Mekong River to Tortoise Island, passing by fish farms and stilt houses that line the riverbanks. Along the way, you’ll learn about the region’s sustainable agricultural model known as “Garden–Pond–Cage.” Enjoy a taste of local specialties such as coconut cand",
          activities: [],
          meals: ["Breakfast","Lunch"],
          accommodation: "Hotel in Can Tho",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/69267e2c47649.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/69267e2c47649.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/69267e2c4764a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/69267e2c47647.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/69267e2c47649.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/69267e2c47647.jpg"],
        },
        {
          day: 10,
          title: "Cai Rang Floating Market - Ho Chi Minh City",
          description: "After breakfast, you will be picked up from your hotel and transferred to the pier for a wooden boat ride to the Cai Rang Floating Market - one of the most vibrant and bustling floating markets in Vietnam. Here, you’ll witness the lively scene of local traders selling fruits, vegetables, and daily goods directly from their boats. Take in the colorful atmosphere and gain a deeper understanding of life along the waterways of the Mekong Delta. On the way back, stop by a local noodle workshop to see how traditional rice noodles are made, and enjoy sampling some fresh tropical fruits. Return to you",
          activities: [],
          meals: ["Breakfast","Lunch"],
          accommodation: "Hotel in Ho Chi Minh City",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/69267e2c4764b.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/69267e2c4764b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/69267e2c4764b.jpg"],
        },
        {
          day: 11,
          title: "Ho Chi Minh City - Flight to Siem Reap",
          description: "Enjoy breakfast at your hotel, and if you have time, you can choose to relax or explore nearby places in Ho Chi Minh City, such as Ben Thanh Market or a local cafe. Transfer to the airport for your international flight to Siem Reap, Cambodia - gateway to the magnificent temples of Angkor. Upon arrival, you’ll be welcomed by your local guide and transferred to your hotel for check-in. Spend the evening at your leisure. You may choose to explore the vibrant Siem Reap Night Market, enjoy a traditional Khmer dinner, or simply rest in preparation for the temple adventures ahead.",
          activities: [],
          meals: ["Breakfast"],
          accommodation: "Hotel in Siem Reap",
        },
        {
          day: 12,
          title: "Full-Day Angkor Wat Complex Tour",
          description: "Morning\n\nAfter breakfast, begin your full-day exploration of the majestic Angkor Archaeological Park. Start with a visit to the ancient capital of Angkor Thom (12th century), entering through the impressive South Gate, where giant stone figures depict the legendary Churning of the Ocean of Milk. Inside the walled city, discover the enigmatic Bayon Temple, famed for its 54 towers adorned with over 200 serene and smiling faces of Avalokitesvara. Continue to explore the Phimeanakas, the Royal Enclosure, the Elephant Terrace, and the Terrace of the Leper King, each offering unique insight into Khm",
          activities: [],
          meals: ["Breakfast","Lunch"],
          accommodation: "Hotel in Siem Reap",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/69267e9f7a274.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/69267e9f7a274.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/69267e9f7a276.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/69267e9f7a274.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/69267e9f7a276.jpg"],
        },
        {
          day: 13,
          title: "Siem Reap - Banteay Srei",
          description: "Morning\n\nAfter breakfast at your hotel, depart for a scenic 35-kilometer drive northeast to visit the exquisite Banteay Srei. Designed by Yajnavaraha, a royal scholar and spiritual advisor to King Jayavarman V, Banteay Srei is renowned for its intricate carvings and unique pink sandstone construction - an artistic departure from the volcanic laterite commonly used in Angkor temples. This material allowed for some of the most detailed and refined stonework in Khmer architecture. On the return journey, stop at Pradark Village, a local community known for producing palm sugar using traditional me",
          activities: [],
          meals: ["Breakfast"],
          accommodation: "Hotel in Siem Reap",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/69267e9f7a277.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/69267e9f7a277.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/69267e9f7a277.jpg"],
        },
        {
          day: 14,
          title: "Free Day in Siem Reap",
          description: "This day is free to explore Siem Reap by yourself. There are many recommendations: hit the markets for some delicious street food, indulge in a traditional Khmer massage, or get one final insight into the heart of Cambodia with a cooking class. Looking for inspiration? Please see our recommendations below. Kampong Khleang - Tonle Sap Half Day\n\n\t\n\nFrom US $80/pax\n\n\n\n\nSiem Reap Zipline Half Day\n\n\t\n\nFrom US $118/pax\n\n\n\n\nSunrise at Angkor by Tuktuk & Elephant Ride\n\n\t\n\nFrom US $109/pax\n\nTry Some Cambodia Street Food",
          activities: [],
          meals: ["Breakfast"],
          accommodation: "Hotel in Siem Reap",
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/63a92d4dc1e47.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/63a92d4dc1e47.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/63a92d4dc1e47.jpg"],
        },
        {
          day: 15,
          title: "Good Bye, Siem Reap!",
          description: "After breakfast, you will have free time to pack your luggage and check out the hotel. It’s time to depart and get to the Siem Reap International Airport for your next flight.",
          activities: [],
          meals: ["Breakfast"],
        },
      ],
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/676288d1b26d3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/63a92d4dc1e4e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/666feee9bf293.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/63a92d4dc1e52.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/666fef1c40792.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/657ad908b2a65.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/666fef31a416c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/659bad7ea95bb.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/day-3-witness-beautiful-sight-on-halong-bay-cruise-64a3e813dd448.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/666fef5c57f32.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/666fef79c6866.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/63a92d4dc1e50.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/666fef9fb79e4.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/666fefbac52fd.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/day-8-visit-highlight-spots-in-ho-chi-minh-city-64a3fd412ee77.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/666ff123eca9b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/69267e2c47649.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/69267e2c4764a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/69267e2c47647.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/69267e2c4764b.jpg"],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 360,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Halong Bay", "Hoi An", "Ho Chi Minh City", "Mekong Delta", "Can Tho", "Siem Reap"],
    activities: ["cruise", "cultural", "temple-visits", "photography"],
  },

  // HALONG BAY CRUISES (BestPriceTravel)
  {
    id: "catherine-cruise-2d1n",
    slug: "catherine-cruise-halong-bay",
    name: "Catherine Cruise Halong Bay",
    category: "cruise",
    location: "Halong Bay",
    duration: "2 days, 1 night",
    price: 199,
    description: "One of the largest cruises in Halong Bay with 5 huge decks, elevators, and luxury amenities. 39 premium cabins.",
    fullDescription: `
      <h3>Catherine Cruise - Luxury at Sea</h3>
      <p>Experience Halong Bay aboard one of its largest and most luxurious cruises with 5 decks, elevators, and 39 premium cabins.</p>

      <h3>Onboard Amenities</h3>
      <ul>
        <li>5 spacious decks with elevator access</li>
        <li>Premium dining with panoramic views</li>
        <li>Spa and wellness facilities</li>
        <li>Sundeck with loungers</li>
        <li>Kayaking and swimming</li>
        <li>Cave exploration activities</li>
      </ul>
    `,
    highlights: ["Largest Cruise", "5 Decks", "Elevator Access", "39 Cabins", "Luxury Amenities"],
    included: ["Cabin accommodation", "All meals", "Activities", "Kayaking", "Cave visits", "Tai Chi"],
    excluded: ["Transfer from Hanoi", "Drinks", "Tips", "Spa treatments"],
    imageUrl: "/tours/catherine-cruise-2d1n.jpg",
    rating: 9.6,
    reviewCount: 22,
    affiliateUrl: "https://www.bestpricetravel.com/halong-bay-tours/halong-bay-cruise-2-days-1-night-from-hanoi-with-transfer.html",
    itinerary: [
        {
          day: 1,
          title: "Hanoi - Halong Bay - Sung Sot Cave",
          description: "",
          activities: [],
        },
        {
          day: 2,
          title: "Halong Bay - Titov Island - Hanoi",
          description: "",
          activities: [],
        },
      ],
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/halong-bay-cruise-from-hanoi-with-transfer-2-days-64d303b32ddff.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643a180d0568f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643a173428285.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643a1c6344d6e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643a173428283.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643a19dcdf6eb.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643a19dcdf6e8.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643a18a87aa1f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643a173428286.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/657adca1397b7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643a1ac08b40c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643a19dcdf6ec.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/657adb4ca7eb1.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643a18a87aa1c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643a18a87aa20.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643a18a87aa21.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/643a180d0568f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/643a173428285.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/643a173428283.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/643a19dcdf6eb.jpg"],
    pricingTiers: [{"category":"Superior (3*)","price":199},{"category":"First Class (4*)","price":249},{"category":"Deluxe (5*)","price":285}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 48,
    startCity: "Hanoi",
    destinations: ["Halong Bay"],
    activities: ["cruise", "kayaking", "cave-exploration", "photography"],
  },
  {
    id: "ambassador-signature-2d1n",
    slug: "ambassador-signature-cruise-lan-ha-bay",
    name: "Ambassador Signature Cruise",
    category: "cruise",
    location: "Lan Ha Bay",
    duration: "2 days, 1 night",
    price: 169,
    description: "Lan Ha Bay explorer with Michelin-starred menu, waterslide, and 39 luxury cabins.",
    fullDescription: `
      <h3>Ambassador Signature - Lan Ha Bay</h3>
      <p>Explore the pristine Lan Ha Bay aboard this modern cruise featuring Michelin-quality dining and unique onboard facilities.</p>

      <h3>What Sets It Apart</h3>
      <ul>
        <li>Lan Ha Bay - less crowded, more pristine</li>
        <li>Michelin-starred menu</li>
        <li>Onboard waterslide</li>
        <li>39 luxury cabins with balconies</li>
        <li>Premium service throughout</li>
      </ul>
    `,
    highlights: ["Lan Ha Bay", "Michelin Menu", "Waterslide", "39 Cabins", "Less Crowded"],
    included: ["Cabin", "All meals", "Activities", "Kayaking", "Cave visits"],
    excluded: ["Transfer", "Drinks", "Tips"],
    imageUrl: "/tours/ambassador-signature-2d1n.jpg",
    rating: 9.2,
    reviewCount: 25,
    affiliateUrl: "https://www.bestpricetravel.com/halong-bay-cruises/ambassador-signature-cruise.html",
    itinerary: [
        {
          day: 1,
          title: "Hanoi - Halong International Cruise Port - Lan Ha Bay - Viet Hai Village",
          description: "",
          activities: [],
        },
        {
          day: 2,
          title: "Dark & Bright Cave - Halong Bay - Hanoi",
          description: "",
          activities: [],
        },
      ],
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/cruises/848_477/659e22d634a9d.jpg","https://d122axpxm39woi.cloudfront.net/images/cruises/848_477/659e230fa2703.jpg","https://d122axpxm39woi.cloudfront.net/images/cruises/848_477/659e235addc3e.jpg","https://d122axpxm39woi.cloudfront.net/images/cruises/375_250/659e21c433cbc.jpg","https://d122axpxm39woi.cloudfront.net/images/cruises/375_250/659e22917f789.jpg","https://d122axpxm39woi.cloudfront.net/images/cruises/375_250/659e21f7d82be.jpg","https://d122axpxm39woi.cloudfront.net/images/cruises/375_250/659e224888593.jpg","https://d122axpxm39woi.cloudfront.net/images/cruises/origin/659e21c433cbc.jpg","https://d122axpxm39woi.cloudfront.net/images/cruises/origin/659e238a16c7f.jpg","https://d122axpxm39woi.cloudfront.net/images/cruises/origin/6656e79dd46cc.jpg","https://d122axpxm39woi.cloudfront.net/images/cruises/origin/659e22917f788.jpg","https://d122axpxm39woi.cloudfront.net/images/cruises/origin/659e22917f789.jpg","https://d122axpxm39woi.cloudfront.net/images/cruises/origin/659e22917f78a.jpg","https://d122axpxm39woi.cloudfront.net/images/cruises/origin/6656e79dd46cd.jpg","https://d122axpxm39woi.cloudfront.net/images/cruises/origin/6656e83bbcbd2.jpg","https://d122axpxm39woi.cloudfront.net/images/cruises/origin/659e21f7d82be.jpg","https://d122axpxm39woi.cloudfront.net/images/cruises/origin/659e224888592.jpg","https://d122axpxm39woi.cloudfront.net/images/cruises/origin/659e224888593.jpg","https://d122axpxm39woi.cloudfront.net/images/cruises/origin/659e21f7d82bd.jpg","https://d122axpxm39woi.cloudfront.net/images/cruises/origin/659e224888594.jpg"],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 48,
    startCity: "Hanoi",
    destinations: ["Lan Ha Bay"],
    activities: ["cruise", "kayaking", "swimming", "photography"],
  },
  {
    id: "mon-cheri-cruise-2d1n",
    slug: "mon-cheri-cruise-lan-ha-bay",
    name: "Mon Cheri Cruise",
    category: "cruise",
    location: "Lan Ha Bay",
    duration: "2 days, 1 night",
    price: 164,
    description: "Best-seller luxurious cruise in Lan Ha Bay. Halal certified with 18 elegant cabins.",
    fullDescription: `
      <h3>Mon Cheri - Best-Seller in Lan Ha Bay</h3>
      <p>The most popular luxury cruise in Lan Ha Bay, offering exceptional service, Halal certification, and boutique elegance.</p>
    `,
    highlights: ["Best-Seller", "Halal Certified", "18 Cabins", "Lan Ha Bay", "Boutique Luxury"],
    included: ["Cabin", "All meals (Halal available)", "Activities", "Kayaking"],
    excluded: ["Transfer", "Drinks", "Tips"],
    imageUrl: "/tours/mon-cheri-cruise-2d1n.jpg",
    rating: 9.6,
    reviewCount: 276,
    affiliateUrl: "https://www.bestpricetravel.com/halong-bay-cruises/mon-cheri-cruise.html",
    durationHours: 48,
    startCity: "Hanoi",
    destinations: ["Lan Ha Bay"],
    activities: ["cruise", "kayaking", "cave-exploration"],
  },
  {
    id: "lyra-grandeur-cruise-2d1n",
    slug: "lyra-grandeur-cruise-halong-bay",
    name: "Lyra Grandeur Cruise",
    category: "cruise",
    location: "Halong Bay",
    duration: "2 days, 1 night",
    price: 239,
    description: "Newly launched in 2025 with mini golf, sauna, and 33 suites with private balconies.",
    fullDescription: `
      <h3>Lyra Grandeur - Newest in Halong</h3>
      <p>The newest addition to Halong Bay cruises, launched in 2025 with state-of-the-art facilities.</p>

      <h3>Unique Features</h3>
      <ul>
        <li>Mini golf on deck</li>
        <li>Sauna and spa</li>
        <li>33 suites with balconies</li>
        <li>Latest design and technology</li>
      </ul>
    `,
    highlights: ["Newest Cruise (2025)", "Mini Golf", "Sauna", "33 Suites", "Private Balconies"],
    included: ["Suite accommodation", "All meals", "Activities", "Spa access"],
    excluded: ["Transfer", "Drinks", "Tips", "Golf equipment rental"],
    imageUrl: "/tours/lyra-grandeur-cruise-2d1n.jpg",
    rating: 9.6,
    reviewCount: 8,
    affiliateUrl: "https://www.bestpricetravel.com/halong-bay-cruises/lyra-grandeur-cruise.html",
    durationHours: 48,
    startCity: "Hanoi",
    destinations: ["Halong Bay"],
    activities: ["cruise", "golf", "spa", "photography"],
  },

  // DAY TRIPS (BestPriceTravel)
  {
    id: "hanoi-street-food-tour",
    slug: "hanoi-street-food-walking-tour",
    name: "Hanoi Street Food Walking Tour",
    category: "day-trip",
    location: "Hanoi",
    duration: "Half day",
    price: 35,
    description: "Take a walk and integrate yourself into the lively atmosphere while sampling Pho Bo, Bun Thang, Banh Cuon, and more.",
    fullDescription: `
      <h3>Hanoi Street Food Experience</h3>
      <p>Discover the vibrant street food scene of Hanoi's Old Quarter with a local guide who knows all the best spots.</p>

      <h3>What You'll Taste</h3>
      <ul>
        <li>Pho Bo - iconic beef noodle soup</li>
        <li>Bun Thang - rice vermicelli with chicken</li>
        <li>Banh Cuon - steamed rice rolls</li>
        <li>Egg coffee at traditional cafe</li>
        <li>Fresh spring rolls</li>
        <li>Sweet treats and desserts</li>
      </ul>
    `,
    highlights: ["Old Quarter", "6+ Tastings", "Local Guide", "Hidden Gems", "Authentic Experience"],
    included: ["All food tastings", "Local guide", "Walking tour", "Bottled water"],
    excluded: ["Additional food", "Tips", "Personal expenses"],
    imageUrl: "/tours/hanoi-street-food-tour.jpg",
    rating: 9.6,
    reviewCount: 119,
    affiliateUrl: "https://www.bestpricetravel.com/hanoi-tours/hanoi-street-food-tour.html",
    durationHours: 4,
    startCity: "Hanoi",
    destinations: ["Hanoi"],
    activities: ["food-tour", "walking-tour", "cultural"],
  },
  {
    id: "mekong-delta-day-trip",
    slug: "insight-mekong-delta-day-trip",
    name: "Insight Mekong Delta Day Trip",
    category: "day-trip",
    location: "Mekong Delta",
    duration: "Full day",
    price: 62,
    description: "Sampan boat rides through mangrove landscapes and scenic cruises along the Ham Luong river with xe loi rides.",
    fullDescription: `
      <h3>Mekong Delta Discovery</h3>
      <p>Experience the unique waterways and local life of the Mekong Delta on this full-day excursion from Ho Chi Minh City.</p>

      <h3>Highlights</h3>
      <ul>
        <li>Sampan boat through mangroves</li>
        <li>Ham Luong River cruise</li>
        <li>Xe loi (motorbike cart) ride</li>
        <li>Fruit orchard visit</li>
        <li>Local coconut candy workshop</li>
        <li>Traditional music performance</li>
      </ul>
    `,
    highlights: ["Sampan Boats", "Ham Luong River", "Xe Loi Ride", "Fruit Orchards", "Coconut Candy"],
    included: ["Transport from HCMC", "Boat rides", "Lunch", "Guide", "Entrance fees"],
    excluded: ["Tips", "Personal expenses"],
    imageUrl: "/tours/mekong-delta-day-trip.jpg",
    rating: 9.4,
    reviewCount: 18,
    affiliateUrl: "https://www.bestpricetravel.com/mekong-delta-tours/insight-mekong-delta-full-day.html",
    durationHours: 10,
    startCity: "Ho Chi Minh City",
    destinations: ["Ben Tre", "Mekong Delta"],
    activities: ["boat-tour", "cultural", "nature"],
  },
  {
    id: "cu-chi-speedboat-tour",
    slug: "luxury-cu-chi-tunnels-speedboat-tour",
    name: "Cu Chi Tunnels Speedboat Tour",
    category: "day-trip",
    location: "Cu Chi",
    duration: "Half day",
    price: 87,
    description: "Speedboat journey along Saigon River with visits to rice paper and rice wine workshops plus Cu Chi Tunnels.",
    fullDescription: `
      <h3>Cu Chi by Speedboat</h3>
      <p>A unique approach to Cu Chi Tunnels via speedboat along the Saigon River, combining scenic journey with historical exploration.</p>

      <h3>Experience Includes</h3>
      <ul>
        <li>Speedboat ride on Saigon River</li>
        <li>Rice paper making demonstration</li>
        <li>Rice wine tasting</li>
        <li>Cu Chi Tunnels exploration</li>
        <li>War history presentation</li>
        <li>Tunnel crawling experience</li>
      </ul>
    `,
    highlights: ["Speedboat Journey", "Saigon River", "Rice Paper Workshop", "Cu Chi Tunnels", "War History"],
    included: ["Speedboat", "All visits", "Guide", "Entrance fees", "Light refreshments"],
    excluded: ["Lunch", "Tips"],
    imageUrl: "/tours/cu-chi-speedboat-tour.jpg",
    rating: 9.6,
    reviewCount: 6,
    affiliateUrl: "https://www.bestpricetravel.com/ho-chi-minh-city-tours/luxury-cu-chi-tunnels-speedboat-tour.html",
    durationHours: 6,
    startCity: "Ho Chi Minh City",
    destinations: ["Cu Chi"],
    activities: ["speedboat", "historical", "cultural"],
  },
  {
    id: "saigon-dinner-cruise",
    slug: "luxury-dinner-cruise-saigon-river",
    name: "Luxury Dinner Cruise on Saigon River",
    category: "day-trip",
    location: "Ho Chi Minh City",
    duration: "Evening",
    price: 46,
    description: "Experience the city's nighttime splendor while dining aboard with premium cuisine and entertainment.",
    fullDescription: `
      <h3>Saigon River Dinner Cruise</h3>
      <p>See Ho Chi Minh City come alive at night from the comfort of a luxury dinner cruise on the Saigon River.</p>
    `,
    highlights: ["Night Cruise", "Premium Dinner", "City Views", "Entertainment", "Romantic Setting"],
    included: ["Dinner buffet", "Cruise", "Entertainment", "Drinks package"],
    excluded: ["Transport to pier", "Tips"],
    imageUrl: "/tours/saigon-dinner-cruise.jpg",
    rating: 10,
    reviewCount: 3,
    affiliateUrl: "https://www.bestpricetravel.com/ho-chi-minh-city-tours/luxury-dinner-cruise-on-saigon-river.html",
    durationHours: 3,
    startCity: "Ho Chi Minh City",
    destinations: ["Ho Chi Minh City"],
    activities: ["cruise", "dining", "entertainment"],
  },
  {
    id: "hoi-an-memories-show",
    slug: "hoi-an-memories-show-ticket",
    name: "Hoi An Memories Show",
    category: "day-trip",
    location: "Hoi An",
    duration: "Evening",
    price: 24,
    description: "Experience a stunning art performance while learning about the 400-year-old town and its traditions with over 500 artists.",
    fullDescription: `
      <h3>Hoi An Memories Show</h3>
      <p>The largest outdoor performance in Vietnam featuring over 500 artists telling the story of Hoi An's 400-year history.</p>
    `,
    highlights: ["500+ Artists", "Outdoor Performance", "400-Year History", "Cultural Show", "Impression Theme Park"],
    included: ["Show ticket", "Theme park access"],
    excluded: ["Transport", "Food", "Tips"],
    imageUrl: "/tours/hoi-an-memories-show.jpg",
    rating: 9.8,
    reviewCount: 4,
    affiliateUrl: "https://www.bestpricetravel.com/hoi-an-tours/hoi-an-memories-show-ticket.html",
    durationHours: 2,
    startCity: "Hoi An",
    destinations: ["Hoi An"],
    activities: ["cultural", "entertainment", "photography"],
  },
  {
    id: "hoi-an-basket-boat",
    slug: "cam-thanh-coconut-village-basket-boat",
    name: "Cam Thanh Coconut Village Basket Boat Tour",
    category: "day-trip",
    location: "Hoi An",
    duration: "Half day",
    price: 55,
    description: "Immerse in the natural beauty of the region while riding along the stunning river with basket boat demonstrations.",
    fullDescription: `
      <h3>Basket Boat Adventure</h3>
      <p>Experience the traditional basket boats of Hoi An's Cam Thanh coconut village, a unique Vietnam experience.</p>
    `,
    highlights: ["Basket Boats", "Coconut Village", "Water Palm Forest", "Local Fishermen", "Traditional Craft"],
    included: ["Basket boat ride", "Guide", "Life jacket", "Bottled water"],
    excluded: ["Transport to village", "Tips", "Food"],
    imageUrl: "/tours/hoi-an-basket-boat.jpg",
    rating: 9.3,
    reviewCount: 2,
    affiliateUrl: "https://www.bestpricetravel.com/hoi-an-tours/cam-thanh-coconut-village-basket-boat-tour.html",
    durationHours: 4,
    startCity: "Hoi An",
    destinations: ["Hoi An"],
    activities: ["boat-tour", "nature", "cultural"],
  },
  {
    id: "hoi-an-walking-tour",
    slug: "hoi-an-half-day-walking-city-tour",
    name: "Hoi An Half-Day Walking City Tour",
    category: "day-trip",
    location: "Hoi An",
    duration: "Half day",
    price: 34,
    description: "Walk through Hoi An Ancient Town's charming streets visiting temples, historic houses, and local artisan shops.",
    fullDescription: `
      <h3>Hoi An Walking Tour</h3>
      <p>Explore the UNESCO World Heritage Ancient Town of Hoi An with a knowledgeable local guide.</p>
    `,
    highlights: ["Ancient Town", "Japanese Bridge", "Assembly Halls", "Old Houses", "Local Artisans"],
    included: ["Guide", "Entrance tickets", "Bottled water"],
    excluded: ["Food", "Tips", "Shopping"],
    imageUrl: "/tours/hoi-an-walking-tour.jpg",
    rating: 9.7,
    reviewCount: 12,
    affiliateUrl: "https://www.bestpricetravel.com/hoi-an-tours/hoi-an-half-day-walking-city-tour.html",
    durationHours: 4,
    startCity: "Hoi An",
    destinations: ["Hoi An"],
    activities: ["walking-tour", "cultural", "photography"],
  },

  // SAPA TOURS (BestPriceTravel)
  {
    id: "sapa-fansipan-2d",
    slug: "highlights-sapa-fansipan-mountain-2-days",
    name: "Highlights Sapa with Fansipan Mountain",
    category: "multi-day",
    location: "Sapa",
    duration: "2 days, 1 night",
    price: 139,
    description: "Visit Hmong cultural sites and enjoy panoramic views through the cable car to Fansipan peak - the Roof of Indochina.",
    fullDescription: `
      <h3>Sapa & Fansipan Experience</h3>
      <p>Discover Sapa's stunning mountain landscapes and ride the cable car to the peak of Fansipan, Southeast Asia's highest mountain.</p>
    `,
    highlights: ["Fansipan Peak", "Cable Car", "Cat Cat Village", "Mountain Views", "Hmong Culture"],
    included: ["Hotel", "Transport from Hanoi", "Cable car", "Guide", "Meals as specified"],
    excluded: ["Drinks", "Tips", "Personal expenses"],
    imageUrl: "/tours/sapa-fansipan-2d.jpg",
    rating: 9.3,
    reviewCount: 2,
    affiliateUrl: "https://www.bestpricetravel.com/sapa-tours/highlights-sapa-with-fansipan-mountain-2-days.html",
    itinerary: [
        {
          day: 1,
          title: "Sapa - Cat Cat Village",
          description: "",
          activities: [],
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/651690e737806.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/651690e737806.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/651690e73780b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/651690e73780b.jpg"],
        },
        {
          day: 2,
          title: "Fansipan Cable Car - Hanoi",
          description: "",
          activities: [],
          imageUrl: "https://d122axpxm39woi.cloudfront.net/images/tours/800_450/651690e73780c.jpg",
          dayImages: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/651690e73780c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/651690e73780d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/651690e73780e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/651690e73780f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/651690e73780d.jpg"],
        },
      ],
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/651690e737810.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/651690e737806.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/651690e73780b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/651690e73780c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/651690e73780d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/651690e73780e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/651690e73780f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/651690e73780b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/651690e73780d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/65168bde41bcc.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/651697184b7a5.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/6516996a1c49f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/65168f2158d0a.jpg","https://d122axpxm39woi.cloudfront.net/assets/img/dcma.png"],
    pricingTiers: [{"category":"Superior Group Tour","price":139},{"category":"Deluxe Group Tour","price":169}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 48,
    startCity: "Hanoi",
    destinations: ["Sapa", "Fansipan"],
    activities: ["trekking", "cable-car", "cultural", "photography"],
  },
  {
    id: "sapa-trekking-homestay-2d",
    slug: "sapa-terraced-rice-fields-homestay-2-days",
    name: "Sapa Rice Fields & Homestay Trek",
    category: "multi-day",
    location: "Sapa",
    duration: "2 days, 1 night",
    price: 77,
    description: "Homestay experience featuring stunning terraced fields of Lao Chai Village with local cultural engagement.",
    fullDescription: `
      <h3>Authentic Sapa Homestay</h3>
      <p>Experience authentic village life with a homestay among the ethnic minorities of Sapa's mountain villages.</p>
    `,
    highlights: ["Homestay", "Rice Terraces", "Lao Chai Village", "Ta Van Village", "Local Culture"],
    included: ["Homestay", "Transport", "Guide", "Meals", "Trekking"],
    excluded: ["Drinks", "Tips"],
    imageUrl: "/tours/sapa-trekking-homestay-2d.jpg",
    rating: 9.3,
    reviewCount: 15,
    affiliateUrl: "https://www.bestpricetravel.com/sapa-tours/sapa-trekking-2-days-homestay.html",
    itinerary: [
        {
          day: 1,
          title: "Sapa - Y Linh Ho - Lao Chai - Ta Van Village",
          description: "",
          activities: [],
        },
        {
          day: 2,
          title: "Cat Cat - Sin Chai",
          description: "",
          activities: [],
        },
      ],
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6516892c63457.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6516892c6345a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/651ccc427b194.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/651e32a612d9f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/651ccc427b195.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6516892c6345b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/651ccc427b199.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6516892c6345c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/651e3e823dc57.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/651e3e823dc57.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/6516892c6345c.jpg","https://d122axpxm39woi.cloudfront.net/images/review/250_170/6544d06f5a2a6.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/651690e737810.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/65168bde41bcc.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/651694f6ae27b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/651697184b7a5.jpg","https://d122axpxm39woi.cloudfront.net/assets/img/dcma.png"],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 48,
    startCity: "Hanoi",
    destinations: ["Sapa", "Lao Chai", "Ta Van"],
    activities: ["trekking", "homestay", "cultural"],
  },

  // ============================================
  // BESTPRICETRAVEL TOURS - BATCH 2 (30 tours)
  // Partner: bestpricetravel.com
  // ============================================

  // PHU QUOC TOURS
  {
    id: "phu-quoc-beach-escape-5d",
    slug: "phu-quoc-beach-escape-5-days",
    name: "Phu Quoc Beach Escape",
    category: "multi-day",
    location: "Phu Quoc",
    duration: "5 days, 4 nights",
    price: 489,
    description: "Relax on Vietnam's stunning Pearl Island with pristine beaches, historical sites, and the world's longest cable car ride.",
    fullDescription: `
      <h3>Phu Quoc Beach Paradise</h3>
      <p>Escape to Vietnam's most beautiful island for 5 days of beach relaxation, adventure, and discovery. Phu Quoc, known as Pearl Island, offers pristine beaches, fresh seafood, and unique experiences.</p>
      <h3>Why Choose This Tour</h3>
      <ul>
        <li>Coconut Prison - WWII historical site where over 40,000 prisoners were held</li>
        <li>World's longest sea-crossing cable car (7.9km) to Hon Thom Island</li>
        <li>Sao Beach - Vietnam's most photographed beach</li>
        <li>Ho Quoc Pagoda - the largest Buddhist temple on the island</li>
        <li>Duong Dong night market for fresh seafood and local crafts</li>
      </ul>
    `,
    highlights: ["Hon Thom Cable Car", "Sao Beach", "Coconut Prison", "Ho Quoc Pagoda", "Night Market"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Phu Quoc",
        description: "Welcome to Pearl Island",
        activities: [
          "Arrival at Phu Quoc Airport",
          "Transfer to hotel and check-in",
          "Free time to relax at hotel pool or beach",
          "Evening: Explore Duong Dong Night Market for dinner"
        ],
        meals: []
      },
      {
        day: 2,
        title: "Northern Phu Quoc Exploration",
        description: "Discover the island's history and beaches",
        activities: [
          "8:30 AM - Visit Coconut Prison (historical war site)",
          "10:30 AM - Explore Phu Quoc Pepper Farms",
          "12:00 PM - Lunch at local restaurant",
          "2:00 PM - Relax at Ganh Dau Beach",
          "4:00 PM - Visit Ho Quoc Pagoda for sunset views",
          "Evening: Free time for dinner"
        ],
        meals: ["Breakfast"]
      },
      {
        day: 3,
        title: "Hon Thom Island Cable Car Adventure",
        description: "World's longest sea-crossing cable car",
        activities: [
          "8:00 AM - Transfer to An Thoi Cable Car Station",
          "9:00 AM - Ride the world's longest cable car (7.9km) to Hon Thom",
          "10:00 AM - Explore Hon Thom Island and Aquatopia Water Park",
          "12:30 PM - Lunch on Hon Thom Island",
          "2:00 PM - Swimming and beach activities",
          "4:30 PM - Cable car return and transfer to hotel",
          "Evening: Free time"
        ],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 4,
        title: "Sao Beach & Southern Exploration",
        description: "Vietnam's most beautiful beach",
        activities: [
          "8:30 AM - Transfer to Sao Beach",
          "9:00 AM - Beach time at crystal-clear Sao Beach",
          "11:00 AM - Kayaking and water activities",
          "12:30 PM - Seafood lunch at beachside restaurant",
          "2:30 PM - Visit Tranh Stream for refreshing waterfall",
          "4:00 PM - Return to hotel",
          "Evening: Sunset cruise (optional)"
        ],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 5,
        title: "Departure Day",
        description: "Farewell to Phu Quoc",
        activities: [
          "Breakfast at hotel",
          "Free time for shopping or beach",
          "Check-out and transfer to Phu Quoc Airport",
          "Departure"
        ],
        meals: ["Breakfast"]
      }
    ],
    included: ["4 nights hotel", "Breakfast daily", "Cable car ticket", "Transfers", "Guide", "Entrance fees"],
    excluded: ["Flights", "Lunch/dinner (except specified)", "Tips", "Personal expenses"],
    imageUrl: "/tours/phu-quoc-beach-escape-5d.jpg",
    rating: 9.0,
    reviewCount: 124,
    affiliateUrl: "https://www.bestpricetravel.com/phu-quoc-tours/phu-quoc-beach-escape-5-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6763a5beda259.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64fe7f49adb97.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/664c5df156e47.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64fe7f49adb9a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/664c5df156e43.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d3ea1e8413.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/664c5df156e46.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64fe7f49adb9b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64fe7f49adb9c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d3eaf27b23.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d3ebf0e97b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64fe7f49adb9d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64fe812a3a5ec.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/664c5df156e48.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d3ed6d63f3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/64fe7f49adb97.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/64fe7f49adb9a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/64fe7f49adb9c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/64fe7f49adb9d.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f4e817979d9.jpg"],
    pricingTiers: [{"category":"Superior (3* Hotels)","price":489},{"category":"First Class (4* Hotels)","price":555},{"category":"Deluxe (5* hotels)","price":739}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 120,
    startCity: "Phu Quoc",
    destinations: ["Phu Quoc", "Hon Thom Island"],
    activities: ["beach", "sightseeing", "cable-car"],
  },
  {
    id: "south-vietnam-phu-quoc-6d",
    slug: "south-vietnam-phu-quoc-saigon-6-days",
    name: "South Vietnam: Phu Quoc & Saigon",
    category: "multi-day",
    location: "Southern Vietnam",
    duration: "6 days, 5 nights",
    price: 559,
    description: "Combine the beaches of Phu Quoc Island with the bustling energy of Ho Chi Minh City for the ultimate southern Vietnam experience.",
    fullDescription: `
      <h3>Best of Southern Vietnam</h3>
      <p>Experience the contrast between Vietnam's vibrant largest city and its most peaceful island paradise over 6 unforgettable days.</p>
    `,
    highlights: ["Ho Chi Minh City", "Cu Chi Tunnels", "Phu Quoc Beaches", "Night Markets", "Island Hopping"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Ho Chi Minh City",
        description: "Welcome to Vietnam's largest city",
        activities: [
          "Arrival at Tan Son Nhat International Airport",
          "Transfer to hotel in District 1",
          "Evening: Free time to explore Ben Thanh Market area",
          "Optional: Saigon River night walk"
        ],
        meals: []
      },
      {
        day: 2,
        title: "Ho Chi Minh City Tour & Cu Chi Tunnels",
        description: "History and culture exploration",
        activities: [
          "8:00 AM - Visit Cu Chi Tunnels",
          "Learn about Vietnam War history and tunnel systems",
          "12:00 PM - Return to city for lunch",
          "2:00 PM - War Remnants Museum",
          "3:30 PM - Reunification Palace",
          "5:00 PM - Notre Dame Cathedral & Central Post Office",
          "Evening: Free time"
        ],
        meals: ["Breakfast"]
      },
      {
        day: 3,
        title: "Fly to Phu Quoc Island",
        description: "Welcome to Pearl Island",
        activities: [
          "Morning flight to Phu Quoc (1 hour)",
          "Transfer to beach resort",
          "Free time to relax at resort",
          "3:00 PM - Visit Phu Quoc Pepper Farm",
          "Evening: Duong Dong Night Market for seafood dinner"
        ],
        meals: ["Breakfast"]
      },
      {
        day: 4,
        title: "Southern Phu Quoc & Hon Thom",
        description: "Cable car and beach adventure",
        activities: [
          "8:30 AM - Transfer to An Thoi Cable Car Station",
          "9:00 AM - World's longest cable car ride to Hon Thom",
          "10:00 AM - Beach time and water activities",
          "12:30 PM - Lunch on the island",
          "3:00 PM - Return via cable car",
          "4:00 PM - Visit Sao Beach",
          "Evening: Free time"
        ],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 5,
        title: "Island Hopping & Snorkeling",
        description: "Explore the An Thoi Islands",
        activities: [
          "8:00 AM - Board speedboat for island hopping",
          "Visit Fingernail Island, May Rut Island",
          "Snorkeling in coral reefs",
          "12:00 PM - Seafood BBQ on the beach",
          "2:00 PM - Swimming and relaxation",
          "4:00 PM - Return to hotel",
          "Evening: Optional sunset cruise"
        ],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 6,
        title: "Departure",
        description: "Farewell to Phu Quoc",
        activities: [
          "Breakfast at resort",
          "Free time for last beach walk",
          "Check-out and transfer to airport",
          "Flight back to Ho Chi Minh City or onward destination"
        ],
        meals: ["Breakfast"]
      }
    ],
    included: ["5 nights hotels", "Breakfast", "Domestic flight", "Transfers", "Guide"],
    excluded: ["International flights", "Lunch/dinner", "Tips"],
    imageUrl: "/tours/south-vietnam-phu-quoc-6d.jpg",
    rating: 9.1,
    reviewCount: 87,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/south-vietnam-phu-quoc-saigon-6-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/678f5a4c70d46.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a195e70d9.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a195e70db.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a195e70dc.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a195e70dd.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a1d96fa6b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a1d96fa6d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a1d96fa6f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a1d96fa70.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a1d96fa71.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a1ff887a7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a1ff887a9.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/641bb4ac18b9c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d344a12647.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d345c2cba5.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/66d916cbe1071.png","https://d122axpxm39woi.cloudfront.net/images/tours/origin/641bb4ac18b9c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/6380465c3c841.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f4e817979d9.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f72988deaf6.jpg"],
    pricingTiers: [{"category":"Superior 3* Hotels","price":559},{"category":"First Class 4* Hotels","price":699},{"category":"Deluxe 5* Hotels","price":899}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 144,
    startCity: "Ho Chi Minh City",
    destinations: ["Ho Chi Minh City", "Phu Quoc"],
    activities: ["beach", "city-tour", "historical"],
  },
  {
    id: "phu-quoc-romantic-5d",
    slug: "romantic-getaway-phu-quoc-5-days",
    name: "Romantic Getaway in Phu Quoc",
    category: "multi-day",
    location: "Phu Quoc",
    duration: "5 days, 4 nights",
    price: 639,
    description: "A honeymoon-perfect 5-day journey designed for couples with dinner cruises, beach retreats, and romantic experiences.",
    fullDescription: `
      <h3>Love & Paradise in Phu Quoc</h3>
      <p>This romantic package is designed for couples seeking the perfect combination of relaxation, adventure, and intimate experiences on Pearl Island.</p>
    `,
    highlights: ["Sunset Dinner Cruise", "Couple's Spa", "Private Beach Picnic", "Stargazing", "Vinpearl Safari"],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Romance Begins",
        description: "Welcome to your romantic getaway",
        activities: [
          "Airport pickup with flower welcome",
          "Check-in at luxury beach resort",
          "Welcome drink and room upgrade (subject to availability)",
          "Free time to explore resort facilities",
          "Evening: Romantic beachside dinner"
        ],
        meals: ["Dinner"]
      },
      {
        day: 2,
        title: "Couple's Spa & Beach Day",
        description: "Relaxation and pampering",
        activities: [
          "Leisurely breakfast in bed (optional)",
          "10:00 AM - Couple's spa treatment (90 minutes)",
          "Free time at resort pool or beach",
          "3:00 PM - Private beach picnic setup",
          "Evening: Free to explore Duong Dong town"
        ],
        meals: ["Breakfast"]
      },
      {
        day: 3,
        title: "Island Discovery",
        description: "Explore Phu Quoc together",
        activities: [
          "9:00 AM - Visit Ho Quoc Pagoda",
          "10:30 AM - Pepper plantation tour",
          "12:00 PM - Lunch at local restaurant",
          "2:00 PM - Sao Beach relaxation",
          "5:00 PM - Watch sunset from beach",
          "Evening: Sunset dinner cruise on the sea"
        ],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 4,
        title: "Adventure & Safari",
        description: "Wildlife and nature exploration",
        activities: [
          "9:00 AM - Vinpearl Safari Phu Quoc visit",
          "See exotic animals and conservation programs",
          "12:30 PM - Lunch at safari restaurant",
          "3:00 PM - Return to resort",
          "4:00 PM - Private yoga or meditation session",
          "Evening: Private stargazing on the beach"
        ],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 5,
        title: "Farewell Paradise",
        description: "Last moments in paradise",
        activities: [
          "Breakfast at resort",
          "Free time for last beach walk",
          "Photo session at resort (optional)",
          "Check-out and transfer to airport",
          "Departure with beautiful memories"
        ],
        meals: ["Breakfast"]
      }
    ],
    included: ["4 nights resort", "Breakfast", "Dinner cruise", "Spa treatment", "Transfers"],
    excluded: ["Flights", "Personal expenses", "Tips"],
    imageUrl: "/tours/phu-quoc-romantic-5d.jpg",
    rating: 9.4,
    reviewCount: 56,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/deep-in-love-in-phu-quoc-5-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67639e398511d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66277347d0530.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66277347d052f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667ce85d7b486.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667ce86d69583.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66277347d0531.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66277347d052b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66277347d0534.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667ce87e68e5c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66277347d052e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66277347d0532.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66277347d0533.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/deep-in-love-in-phu-quoc-5-days-64bb628666b34.png","https://d122axpxm39woi.cloudfront.net/images/tours/origin/66277347d0530.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/66277347d052b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/66277347d052e.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f49b8d2e968.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f4e817979d9.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f72988deaf6.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f9ca5d2eb12.jpg"],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 120,
    startCity: "Phu Quoc",
    destinations: ["Phu Quoc"],
    activities: ["beach", "romance", "spa", "cruise"],
  },
  {
    id: "hon-thom-island-day",
    slug: "hon-thom-island-full-day-tour",
    name: "Hon Thom Island Full Day",
    category: "day-trip",
    location: "Phu Quoc",
    duration: "1 day",
    price: 78,
    description: "Ride the world's longest 3-wire cable car to Hon Thom Island with Tranh streams, Coconut Prison, and Sao Beach.",
    fullDescription: `
      <h3>Hon Thom Island Adventure</h3>
      <p>Experience the best of southern Phu Quoc in one action-packed day, featuring the iconic cable car ride across turquoise waters.</p>
    `,
    highlights: ["Cable Car Ride", "Tranh Stream", "Coconut Prison", "Sao Beach", "Aquatopia Water Park"],
    itinerary: [
      {
        day: 1,
        title: "Full Day Hon Thom Island Adventure",
        description: "Explore southern Phu Quoc's best attractions",
        activities: [
          "8:00 AM - Hotel pickup",
          "8:30 AM - Visit Coconut Prison (historical war site)",
          "9:30 AM - Transfer to An Thoi Cable Car Station",
          "10:00 AM - Ride world's longest cable car (7.9km) to Hon Thom",
          "10:30 AM - Free time on Hon Thom Island",
          "11:00 AM - Optional: Aquatopia Water Park activities",
          "12:30 PM - Seafood lunch on the island",
          "2:00 PM - Beach time and swimming",
          "3:30 PM - Cable car return to mainland",
          "4:00 PM - Visit Sao Beach for sunset",
          "5:30 PM - Return to hotel"
        ],
        meals: ["Lunch"]
      }
    ],
    included: ["Cable car ticket", "Lunch", "Guide", "Entrance fees", "Transfers"],
    excluded: ["Water park activities", "Tips"],
    imageUrl: "/tours/hon-thom-island-day.jpg",
    rating: 9.2,
    reviewCount: 198,
    affiliateUrl: "https://www.bestpricetravel.com/phu-quoc-tours/sightseeing-in-the-south-hon-thom-island-full-day.html",
    durationHours: 10,
    startCity: "Phu Quoc",
    destinations: ["Phu Quoc", "Hon Thom Island"],
    activities: ["sightseeing", "beach", "cable-car"],
  },

  // HA GIANG & MOTORBIKE TOURS
  {
    id: "ha-giang-loop-4d",
    slug: "ha-giang-loop-motorbike-4-days",
    name: "Ha Giang Loop on Motorbike",
    category: "multi-day",
    location: "Ha Giang",
    duration: "4 days, 3 nights",
    price: 198,
    description: "Conquer the legendary Ha Giang Loop with winding mountain passes, karst peaks, and authentic ethnic village encounters.",
    fullDescription: `
      <h3>Ha Giang Motorbike Adventure</h3>
      <p>The ultimate Northern Vietnam adventure through one of Asia's most scenic mountain roads. Experience Ma Pi Leng Pass, Dong Van, and local ethnic villages.</p>
    `,
    highlights: ["Ma Pi Leng Pass", "Dong Van Karst Geopark", "Lung Cu Flag Tower", "Ethnic Villages", "Mountain Roads"],
    itinerary: [
      {
        day: 1,
        title: "Hanoi to Ha Giang",
        description: "Journey to the mountains",
        activities: [
          "6:00 AM - Pickup from Hanoi Old Quarter",
          "Drive through Red River Delta landscapes",
          "10:00 AM - Coffee break in Tuyen Quang",
          "12:30 PM - Lunch at local restaurant",
          "Continue through winding mountain roads",
          "4:00 PM - Arrive in Ha Giang City",
          "5:00 PM - Check-in and briefing",
          "Evening: Explore Ha Giang night market"
        ],
        meals: ["Lunch", "Dinner"]
      },
      {
        day: 2,
        title: "Ha Giang to Dong Van",
        description: "The most spectacular riding day",
        activities: [
          "7:30 AM - Start riding the Ha Giang Loop",
          "9:00 AM - Quan Ba Heaven Gate viewpoint",
          "10:00 AM - Twin Mountains (Fairy Bosom)",
          "11:30 AM - Lunch in Yen Minh",
          "1:00 PM - Continue to Dong Van",
          "3:00 PM - Visit Hmong ethnic villages",
          "4:30 PM - Dong Van Karst Geopark",
          "Evening: Check-in Dong Van, dinner"
        ],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 3,
        title: "Dong Van - Ma Pi Leng - Meo Vac",
        description: "The legendary pass",
        activities: [
          "6:00 AM - Sunrise at Lung Cu Flag Tower (Vietnam's northernmost point)",
          "8:00 AM - Return to Dong Van for breakfast",
          "9:30 AM - Visit Dong Van Ancient Town",
          "11:00 AM - Ride the legendary Ma Pi Leng Pass",
          "12:30 PM - Photo stops at Nho Que River viewpoints",
          "1:00 PM - Lunch at Ma Pi Leng Pass cafe",
          "3:00 PM - Arrive in Meo Vac",
          "4:00 PM - Local market and village exploration",
          "Evening: Dinner with ethnic minority family"
        ],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 4,
        title: "Meo Vac to Ha Giang to Hanoi",
        description: "Return journey with new perspectives",
        activities: [
          "7:00 AM - Breakfast and check-out",
          "8:00 AM - Ride back via alternative scenic route",
          "10:30 AM - Photo stops at terraced rice fields",
          "12:00 PM - Arrive Ha Giang, lunch",
          "1:00 PM - Depart for Hanoi by car",
          "5:30 PM - Arrive Hanoi",
          "Drop-off at Old Quarter hotel"
        ],
        meals: ["Breakfast", "Lunch"]
      }
    ],
    included: ["3 nights hotels", "Motorbike & fuel", "Driver/guide", "Meals", "Entrance fees"],
    excluded: ["Personal expenses", "Tips", "Travel insurance"],
    imageUrl: "/tours/ha-giang-loop-4d.jpg",
    rating: 9.5,
    reviewCount: 312,
    affiliateUrl: "https://www.bestpricetravel.com/ha-giang-tours/ha-giang-loop-on-motorbike-4-days.html",
    durationHours: 96,
    startCity: "Hanoi",
    destinations: ["Ha Giang", "Dong Van", "Meo Vac", "Yen Minh"],
    activities: ["motorbike", "adventure", "photography", "cultural"],
  },
  {
    id: "vietnam-off-road-10d",
    slug: "vietnam-off-road-motorbike-10-days",
    name: "Vietnam Off-Road: Ta Xua, Ha Giang & Cao Bang",
    category: "multi-day",
    location: "Northern Vietnam",
    duration: "10 days, 9 nights",
    price: 1379,
    description: "Epic 10-day motorcycle journey through Ta Xua clouds, Ha Giang mountains, and Cao Bang waterfalls.",
    fullDescription: `
      <h3>Ultimate Northern Vietnam Motorcycle Tour</h3>
      <p>A once-in-a-lifetime journey through raw, unspoiled northern Vietnam landscapes. From cloud-covered dinosaur backbone in Ta Xua to Ban Gioc Waterfall.</p>
    `,
    highlights: ["Ta Xua Dinosaur Backbone", "Ma Pi Leng Pass", "Ban Gioc Waterfall", "Ethnic Homestays", "Off-Road Tracks"],
    itinerary: [
      {
        day: 1,
        title: "Hanoi - Moc Chau",
        description: "Begin the adventure",
        activities: [
          "7:00 AM - Pickup and motorbike orientation",
          "Ride through the countryside",
          "Lunch at local restaurant",
          "Continue to Moc Chau Plateau",
          "Visit tea plantations",
          "Evening: Check-in hotel"
        ],
        meals: ["Lunch", "Dinner"]
      },
      {
        day: 2,
        title: "Moc Chau - Ta Xua",
        description: "Cloud hunting paradise",
        activities: [
          "Early morning ride to Ta Xua",
          "Hike to Dinosaur Backbone viewpoint",
          "Spectacular cloud sea photography",
          "Lunch at local village",
          "Explore ethnic minority communities",
          "Homestay experience"
        ],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 3,
        title: "Ta Xua - Mu Cang Chai",
        description: "Golden rice terraces",
        activities: [
          "Morning ride through valleys",
          "Stop at scenic viewpoints",
          "Lunch on the road",
          "Arrive Mu Cang Chai",
          "Explore terraced rice fields",
          "Sunset photography"
        ],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 4,
        title: "Mu Cang Chai - Sapa",
        description: "Mountain passes adventure",
        activities: [
          "Ride the O Quy Ho Pass",
          "Photo stops at terraced fields",
          "Lunch in mountain village",
          "Arrive Sapa town",
          "Visit Cat Cat village",
          "Evening at leisure"
        ],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 5,
        title: "Sapa - Ha Giang",
        description: "To the extreme north",
        activities: [
          "Long scenic ride to Ha Giang",
          "Lunch at local eatery",
          "Photo stops along the way",
          "Arrive Ha Giang City",
          "Rest and prepare for loop"
        ],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 6,
        title: "Ha Giang Loop Day 1",
        description: "Heaven Gate and beyond",
        activities: [
          "Quan Ba Heaven Gate",
          "Twin Mountains viewpoint",
          "Lunch in Yen Minh",
          "Continue to Dong Van",
          "Hmong village visit",
          "Overnight in Dong Van"
        ],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 7,
        title: "Ma Pi Leng Pass",
        description: "The legendary pass",
        activities: [
          "Sunrise at Lung Cu Flag Tower",
          "Dong Van Ancient Town",
          "Ride Ma Pi Leng Pass",
          "Nho Que River viewpoints",
          "Arrive Meo Vac",
          "Local market exploration"
        ],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 8,
        title: "Meo Vac - Cao Bang",
        description: "Off the beaten track",
        activities: [
          "Scenic ride to Cao Bang",
          "Off-road sections through villages",
          "Lunch at local restaurant",
          "Arrive Cao Bang City",
          "Rest and explore town"
        ],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 9,
        title: "Ban Gioc Waterfall",
        description: "Vietnam's most beautiful waterfall",
        activities: [
          "Visit Ban Gioc Waterfall",
          "Bamboo raft ride on Quay Son River",
          "Lunch near the falls",
          "Nguom Ngao Cave exploration",
          "Return to Cao Bang"
        ],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 10,
        title: "Cao Bang - Hanoi",
        description: "Return journey",
        activities: [
          "Morning departure for Hanoi",
          "Scenic route through valleys",
          "Lunch on the road",
          "Arrive Hanoi evening",
          "Farewell dinner",
          "Trip ends in Hanoi"
        ],
        meals: ["Breakfast", "Lunch", "Dinner"]
      }
    ],
    included: ["9 nights accommodation", "Honda/Yamaha motorbike", "Fuel", "Guide", "All meals", "Entrance fees"],
    excluded: ["Personal expenses", "Tips", "Travel insurance", "Visa"],
    imageUrl: "/tours/vietnam-off-road-10d.jpg",
    rating: 9.6,
    reviewCount: 78,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/north-vietnam-off-road-by-motorbike-10-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68d39d80577ab.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c4e74e4a0a8.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c4e74e4a0a6.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c4e7e986d67.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c4e74e4a0a7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c4e77cd04f6.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c4e77cd04f9.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c4e77cd04fa.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c4e77cd04fb.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c4e77cd04fc.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c4e7b6ed396.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c4e7e986d68.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c4e7b6ed399.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c4e7b6ed39a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c4e8130580c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c4e8130580f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c4e74e4a0a2.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c4e7e986d64.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c4e81305810.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c4e74e4a0a5.jpg"],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 240,
    startCity: "Hanoi",
    destinations: ["Ta Xua", "Ha Giang", "Cao Bang", "Ban Gioc"],
    activities: ["motorbike", "adventure", "off-road", "cultural"],
  },
  {
    id: "ha-giang-scooter-7d",
    slug: "uncover-northern-vietnam-scooter-7-days",
    name: "Northern Vietnam by Scooter",
    category: "multi-day",
    location: "Northern Vietnam",
    duration: "7 days, 6 nights",
    price: 549,
    description: "Uncover the stunning landscapes of Ha Giang and northern mountain regions on a scenic 7-day scooter adventure.",
    fullDescription: `
      <h3>Ha Giang Scooter Journey</h3>
      <p>Explore Ha Giang, Dong Van, and the majestic Ma Pi Leng Pass on a well-paced 7-day scooter tour with professional support.</p>
    `,
    highlights: ["Ha Giang Loop", "Ma Pi Leng Pass", "Lung Cu Border", "Local Markets", "Village Homestays"],
    itinerary: [
      {
        day: 1,
        title: "Hanoi - Ha Giang",
        description: "Journey begins",
        activities: [
          "6:00 AM - Pickup from Hanoi",
          "Scenic drive through mountains",
          "Lunch stop in Tuyen Quang",
          "4:00 PM - Arrive Ha Giang",
          "Scooter briefing and orientation",
          "Evening: Free to explore"
        ],
        meals: ["Breakfast"]
      },
      {
        day: 2,
        title: "Ha Giang - Yen Minh",
        description: "First riding day",
        activities: [
          "8:00 AM - Start riding",
          "Quan Ba Heaven Gate",
          "Twin Mountains photo stop",
          "Lunch at local restaurant",
          "Continue to Yen Minh",
          "Visit local market",
          "Overnight in Yen Minh"
        ],
        meals: ["Breakfast"]
      },
      {
        day: 3,
        title: "Yen Minh - Dong Van",
        description: "Into the Karst Geopark",
        activities: [
          "Morning ride through valleys",
          "Visit Hmong villages",
          "Lunch on the road",
          "Enter UNESCO Geopark",
          "Dong Van Ancient Town",
          "Sunset at Dong Van"
        ],
        meals: ["Breakfast"]
      },
      {
        day: 4,
        title: "Lung Cu & Ma Pi Leng",
        description: "The highlight day",
        activities: [
          "5:30 AM - Sunrise at Lung Cu Flag Tower",
          "Vietnam's northernmost point",
          "Return for breakfast",
          "Ride Ma Pi Leng Pass",
          "Most spectacular views",
          "Arrive Meo Vac",
          "Homestay experience"
        ],
        meals: ["Breakfast"]
      },
      {
        day: 5,
        title: "Meo Vac - Du Gia",
        description: "Off the beaten track",
        activities: [
          "Morning market visit",
          "Scenic ride to Du Gia",
          "Hidden valley exploration",
          "Lunch at village house",
          "Visit ethnic minority villages",
          "Homestay in Du Gia"
        ],
        meals: ["Breakfast"]
      },
      {
        day: 6,
        title: "Du Gia - Ha Giang",
        description: "Return leg",
        activities: [
          "Morning village walk",
          "Ride back to Ha Giang",
          "Alternative route with views",
          "Lunch at local spot",
          "Arrive Ha Giang City",
          "Evening: Farewell dinner"
        ],
        meals: ["Breakfast"]
      },
      {
        day: 7,
        title: "Ha Giang - Hanoi",
        description: "Journey home",
        activities: [
          "Morning breakfast",
          "Transfer back to Hanoi",
          "Scenic stops along the way",
          "Lunch on the road",
          "5:00 PM - Arrive Hanoi",
          "Drop-off at hotel"
        ],
        meals: ["Breakfast"]
      }
    ],
    included: ["6 nights hotels/homestays", "Scooter & fuel", "Guide", "Breakfast", "Entrance fees"],
    excluded: ["Lunch/dinner", "Tips", "Insurance"],
    imageUrl: "/tours/ha-giang-scooter-7d.jpg",
    rating: 9.3,
    reviewCount: 145,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/uncover-northern-vietnam-on-motorbike-7-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68d39dd8ec42b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67a5b4c168387.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67a5b4c168386.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67a5b4c168385.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67a5b4cd9528b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67a5b4cd9528d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67a5b4c168384.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67a5b4cd9528e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67a5b4cd9528f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67a5b4cd95290.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/68d275cb9db03.png","https://d122axpxm39woi.cloudfront.net/images/tours/origin/67a5b4c168387.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/67a5b4c168386.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/67a5b4c168385.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/67a5b4cd9528d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/67a5b4c168384.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/667bcbd463d35.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/674d6b9682e0e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/667bd715a9ae2.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/68d39d80577ab.jpg"],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 168,
    startCity: "Hanoi",
    destinations: ["Ha Giang", "Dong Van", "Meo Vac"],
    activities: ["motorbike", "adventure", "cultural"],
  },
  {
    id: "ha-giang-3d-exploration",
    slug: "authentic-ha-giang-3-days",
    name: "Authentic Ha Giang 3 Days",
    category: "multi-day",
    location: "Ha Giang",
    duration: "3 days, 2 nights",
    price: 495,
    description: "Short but immersive Ha Giang experience covering the iconic loop highlights in 3 action-packed days.",
    fullDescription: `
      <h3>Quick Ha Giang Adventure</h3>
      <p>Perfect for travelers with limited time who want to experience the legendary Ha Giang Loop's most spectacular scenery.</p>
    `,
    highlights: ["Dong Van", "Ma Pi Leng", "Meo Vac", "Ethnic Villages", "Mountain Passes"],
    itinerary: [
      {
        day: 1,
        title: "Hanoi - Ha Giang - Dong Van",
        description: "Into the mountains",
        activities: [
          "4:30 AM - Early pickup from Hanoi",
          "Drive to Ha Giang (6 hours)",
          "10:30 AM - Arrive Ha Giang, quick break",
          "11:00 AM - Quan Ba Heaven Gate",
          "12:00 PM - Lunch at local restaurant",
          "2:00 PM - Continue through Yen Minh",
          "4:00 PM - Visit Hmong villages",
          "5:30 PM - Arrive Dong Van",
          "Evening: Explore ancient town"
        ],
        meals: ["Breakfast"]
      },
      {
        day: 2,
        title: "Dong Van - Ma Pi Leng - Meo Vac - Ha Giang",
        description: "The spectacular highlights",
        activities: [
          "5:30 AM - Optional: Lung Cu Flag Tower sunrise",
          "8:00 AM - Breakfast in Dong Van",
          "9:00 AM - Visit Pho Bang ancient village",
          "10:30 AM - Ride the legendary Ma Pi Leng Pass",
          "11:30 AM - Multiple photo stops at viewpoints",
          "12:30 PM - Lunch overlooking Nho Que River",
          "2:00 PM - Arrive Meo Vac",
          "3:00 PM - Return to Ha Giang via scenic route",
          "6:00 PM - Check-in Ha Giang hotel"
        ],
        meals: ["Breakfast"]
      },
      {
        day: 3,
        title: "Ha Giang - Hanoi",
        description: "Return to the capital",
        activities: [
          "7:30 AM - Breakfast at hotel",
          "8:30 AM - Depart Ha Giang",
          "Scenic stops along mountain roads",
          "12:00 PM - Lunch break",
          "Continue through rural Vietnam",
          "5:00 PM - Arrive Hanoi",
          "Drop-off at Old Quarter"
        ],
        meals: ["Breakfast"]
      }
    ],
    included: ["2 nights hotel", "Transport", "Guide", "Breakfast", "Entrance fees"],
    excluded: ["Lunch/dinner", "Tips"],
    imageUrl: "/tours/ha-giang-3d-exploration.jpg",
    rating: 9.1,
    reviewCount: 234,
    affiliateUrl: "https://www.bestpricetravel.com/ha-giang-tours/ha-giang-panoramas-4-days.html",
    durationHours: 72,
    startCity: "Hanoi",
    destinations: ["Ha Giang", "Dong Van", "Meo Vac"],
    activities: ["sightseeing", "photography", "cultural"],
  },
  {
    id: "saigon-danang-motorbike-7d",
    slug: "vietnam-highlands-motorbike-7-days",
    name: "Saigon to Danang: Vietnam Highlands",
    category: "multi-day",
    location: "Central Highlands",
    duration: "7 days, 6 nights",
    price: 2179,
    description: "Epic motorbike journey from Saigon to Da Nang through the stunning Central Highlands and coffee plantations.",
    fullDescription: `
      <h3>Central Highlands Motorbike Adventure</h3>
      <p>Ride through Vietnam's spectacular Central Highlands from Ho Chi Minh City to Da Nang, passing coffee plantations, waterfalls, and ethnic villages.</p>
    `,
    highlights: ["Cat Tien National Park", "Dalat", "Central Highlands", "Coffee Plantations", "Waterfalls"],
    itinerary: [
      {
        day: 1,
        title: "Saigon - Cat Tien",
        description: "Into the jungle",
        activities: [
          "7:00 AM - Motorbike pickup in Saigon",
          "Ride through Binh Duong province",
          "12:00 PM - Lunch stop",
          "Continue to Cat Tien National Park",
          "4:00 PM - Arrive and check-in",
          "Evening: Night safari walk (optional)"
        ],
        meals: ["Breakfast"]
      },
      {
        day: 2,
        title: "Cat Tien - Dalat",
        description: "Highlands adventure",
        activities: [
          "6:00 AM - Early morning bird watching",
          "8:00 AM - Breakfast",
          "9:00 AM - Depart for Dalat",
          "Scenic mountain roads",
          "12:30 PM - Lunch en route",
          "3:00 PM - Arrive Dalat",
          "Explore the French colonial town"
        ],
        meals: ["Breakfast"]
      },
      {
        day: 3,
        title: "Dalat Exploration",
        description: "City of eternal spring",
        activities: [
          "Morning coffee at local cafe",
          "Visit Crazy House",
          "Datanla Waterfall",
          "Lunch at local market",
          "Truc Lam Zen Monastery",
          "Evening: Night market"
        ],
        meals: ["Breakfast"]
      },
      {
        day: 4,
        title: "Dalat - Buon Ma Thuot",
        description: "Coffee capital of Vietnam",
        activities: [
          "8:00 AM - Depart Dalat",
          "Spectacular highland roads",
          "12:00 PM - Lunch stop",
          "Visit Dray Nur Waterfall",
          "Coffee plantation tour",
          "Arrive Buon Ma Thuot"
        ],
        meals: ["Breakfast"]
      },
      {
        day: 5,
        title: "Buon Ma Thuot - Kon Tum",
        description: "Ethnic minorities region",
        activities: [
          "Visit Ede ethnic village",
          "Lak Lake exploration",
          "Ride through coffee country",
          "Lunch at local spot",
          "Continue to Kon Tum",
          "Visit wooden church"
        ],
        meals: ["Breakfast"]
      },
      {
        day: 6,
        title: "Kon Tum - Hoi An",
        description: "To the coast",
        activities: [
          "8:00 AM - Depart Kon Tum",
          "Ride through Quang Ngai",
          "Scenic coastal route",
          "Lunch on the road",
          "4:00 PM - Arrive Hoi An",
          "Evening: Ancient Town walk"
        ],
        meals: ["Breakfast"]
      },
      {
        day: 7,
        title: "Hoi An - Da Nang",
        description: "Final stretch",
        activities: [
          "Morning free in Hoi An",
          "Optional: Tailor visit",
          "11:00 AM - Ride to Da Nang",
          "Hai Van Pass preview",
          "1:00 PM - Arrive Da Nang",
          "Motorbike return, trip ends"
        ],
        meals: ["Breakfast"]
      }
    ],
    included: ["6 nights hotels", "Motorbike", "Fuel", "Guide", "Breakfast"],
    excluded: ["Lunch/dinner", "Tips", "Insurance"],
    imageUrl: "/tours/saigon-danang-motorbike-7d.jpg",
    rating: 9.2,
    reviewCount: 67,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/saigon-to-da-nang-golf-8-days.html",
    durationHours: 168,
    startCity: "Ho Chi Minh City",
    destinations: ["Cat Tien", "Dalat", "Buon Ma Thuot", "Da Nang"],
    activities: ["motorbike", "adventure", "nature"],
  },

  // CENTRAL VIETNAM TOURS
  {
    id: "central-vietnam-danang-5d",
    slug: "central-vietnam-danang-hoi-an-ba-na-5-days",
    name: "Central Vietnam: Da Nang, Hoi An & Ba Na Hills",
    category: "multi-day",
    location: "Central Vietnam",
    duration: "5 days, 4 nights",
    price: 369,
    description: "Explore the best of Central Vietnam with ancient Hoi An, modern Da Nang, and the magical Ba Na Hills Golden Bridge.",
    fullDescription: `
      <h3>Central Vietnam Discovery</h3>
      <p>This 5-day tour combines the stunning beaches of Da Nang, the UNESCO heritage town of Hoi An, and the famous Golden Bridge at Ba Na Hills.</p>
    `,
    highlights: ["Golden Bridge", "Hoi An Ancient Town", "My Son Sanctuary", "Marble Mountains", "My Khe Beach"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Da Nang",
        description: "Welcome to Central Vietnam",
        activities: [
          "Arrival at Da Nang International Airport",
          "Transfer to hotel near My Khe Beach",
          "Check-in and freshen up",
          "Free time to explore the beach",
          "Evening: Dragon Bridge light show (weekends)"
        ],
        meals: []
      },
      {
        day: 2,
        title: "Ba Na Hills & Golden Bridge",
        description: "The iconic Golden Bridge experience",
        activities: [
          "8:00 AM - Pickup for Ba Na Hills",
          "9:00 AM - World's longest cable car ride",
          "9:30 AM - Golden Bridge photography",
          "10:30 AM - French Village exploration",
          "12:00 PM - Lunch at Ba Na Hills",
          "2:00 PM - Fantasy Park and gardens",
          "4:30 PM - Return to Da Nang",
          "Evening: Free time"
        ],
        meals: ["Breakfast"]
      },
      {
        day: 3,
        title: "Da Nang City & Marble Mountains",
        description: "Da Nang highlights",
        activities: [
          "8:30 AM - Marble Mountains visit",
          "Climb Thuy Son Mountain",
          "Explore ancient pagodas and caves",
          "11:00 AM - Linh Ung Pagoda (Lady Buddha)",
          "12:00 PM - Lunch at local restaurant",
          "2:00 PM - Transfer to Hoi An (30 min)",
          "3:00 PM - Check-in Hoi An hotel",
          "Evening: Lantern-lit Ancient Town walk"
        ],
        meals: ["Breakfast"]
      },
      {
        day: 4,
        title: "My Son Sanctuary & Hoi An",
        description: "UNESCO World Heritage sites",
        activities: [
          "6:30 AM - Early departure for My Son",
          "8:00 AM - Explore My Son Hindu temples",
          "10:00 AM - Traditional Cham dance performance",
          "11:00 AM - Return to Hoi An",
          "12:00 PM - Lunch and free time",
          "2:00 PM - Hoi An walking tour",
          "Japanese Bridge, Assembly Halls, Old Houses",
          "Evening: Optional boat ride on Thu Bon River"
        ],
        meals: ["Breakfast"]
      },
      {
        day: 5,
        title: "Departure",
        description: "Farewell Central Vietnam",
        activities: [
          "Breakfast at hotel",
          "Free time for shopping or beach",
          "Check-out and transfer to Da Nang Airport",
          "Departure"
        ],
        meals: ["Breakfast"]
      }
    ],
    included: ["4 nights hotel", "Breakfast", "Ba Na Hills cable car", "Guide", "Transfers"],
    excluded: ["Flights", "Lunch/dinner", "Tips"],
    imageUrl: "/tours/central-vietnam-danang-5d.jpg",
    rating: 9.3,
    reviewCount: 287,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/da-nang-hoi-an-ba-na-hills-5-days.html",
    durationHours: 120,
    startCity: "Da Nang",
    destinations: ["Da Nang", "Hoi An", "Ba Na Hills"],
    activities: ["sightseeing", "cultural", "beach"],
  },
  {
    id: "hue-hoi-an-4d",
    slug: "hue-and-hoi-an-at-a-glance-4-days",
    name: "Hue and Hoi An At A Glance",
    category: "multi-day",
    location: "Central Vietnam",
    duration: "4 days, 3 nights",
    price: 179,
    description: "Discover the imperial heritage of Hue and the charming ancient town of Hoi An in this compact 4-day journey.",
    fullDescription: `
      <h3>Imperial Hue & Ancient Hoi An</h3>
      <p>Experience the best of Central Vietnam's cultural treasures with visits to Tu Duc Tomb, Imperial City, and Hoi An's UNESCO World Heritage streets.</p>
    `,
    highlights: ["Imperial City", "Tu Duc Tomb", "Khai Dinh Tomb", "Hoi An Ancient Town", "Hai Van Pass"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Hue",
        description: "Welcome to Imperial Vietnam",
        activities: [
          "Arrival at Phu Bai Airport",
          "Transfer to hotel near Perfume River",
          "2:00 PM - Visit Thien Mu Pagoda",
          "3:30 PM - Imperial Citadel exploration",
          "Forbidden Purple City",
          "Evening: Dragon boat dinner cruise (optional)"
        ],
        meals: []
      },
      {
        day: 2,
        title: "Hue Royal Tombs",
        description: "Imperial heritage",
        activities: [
          "8:30 AM - Tu Duc Tomb",
          "10:00 AM - Khai Dinh Tomb",
          "11:30 AM - Minh Mang Tomb",
          "12:30 PM - Lunch at garden restaurant",
          "2:00 PM - Dong Ba Market",
          "4:00 PM - Free time",
          "Evening: Try Hue royal cuisine"
        ],
        meals: ["Breakfast"]
      },
      {
        day: 3,
        title: "Hue to Hoi An via Hai Van Pass",
        description: "Scenic coastal journey",
        activities: [
          "8:00 AM - Check-out and depart Hue",
          "9:30 AM - Hai Van Pass photo stops",
          "10:30 AM - Lang Co Beach viewpoint",
          "11:30 AM - Arrive Da Nang",
          "12:00 PM - Marble Mountains visit",
          "1:30 PM - Lunch and continue to Hoi An",
          "3:00 PM - Check-in Hoi An",
          "Evening: Ancient Town exploration"
        ],
        meals: ["Breakfast"]
      },
      {
        day: 4,
        title: "Hoi An & Departure",
        description: "Ancient town farewell",
        activities: [
          "8:30 AM - Hoi An walking tour",
          "Japanese Bridge, Assembly Halls",
          "Traditional house visits",
          "10:30 AM - Free time for shopping",
          "Tailors, lanterns, souvenirs",
          "12:00 PM - Check-out",
          "Transfer to Da Nang Airport",
          "Departure"
        ],
        meals: ["Breakfast"]
      }
    ],
    included: ["3 nights hotels", "Breakfast", "Guide", "Entrance fees", "Transfers"],
    excluded: ["Flights", "Lunch/dinner", "Tips"],
    imageUrl: "/tours/hue-hoi-an-4d.jpg",
    rating: 9.2,
    reviewCount: 198,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/hue-and-hoi-an-at-a-glance-4-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6408034aa23e0.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6408034aa23da.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6408034aa23dc.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6408034aa23dd.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/657adfe773684.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6408034aa23de.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6408034aa23df.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/6941340d9c0cb.png","https://d122axpxm39woi.cloudfront.net/images/tours/origin/6408034aa23de.jpg","https://d122axpxm39woi.cloudfront.net/images/review/250_170/58a67d743f1d1.JPG","https://d122axpxm39woi.cloudfront.net/images/review/250_170/58a67d743f279.JPG","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/674d6e0d40918.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/678f55c5cd687.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/674d6bd917832.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/667bdf275b076.jpg","https://d122axpxm39woi.cloudfront.net/assets/img/dcma.png"],
    pricingTiers: [{"category":"Economy (2*)","price":179},{"category":"Superior (3*)","price":199},{"category":"First Class (4*)","price":239}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 96,
    startCity: "Hue",
    destinations: ["Hue", "Hoi An"],
    activities: ["cultural", "historical", "sightseeing"],
  },
  {
    id: "cycling-hue-hoi-an-7d",
    slug: "cycling-vietnam-coast-hue-hoi-an-7-days",
    name: "Cycling Vietnam Coast: Hue to Hoi An",
    category: "multi-day",
    location: "Central Vietnam",
    duration: "7 days, 6 nights",
    price: 789,
    description: "A unique cycling journey along Vietnam's central coast from Hue to Hoi An, covering villages, lagoons, and beaches.",
    fullDescription: `
      <h3>Central Coast Cycling Adventure</h3>
      <p>Pedal through Vietnam's scenic coastal route, stopping at local villages, swimming in lagoons, and exploring My Son ruins.</p>
    `,
    highlights: ["Cau Hai Lagoon", "Hai Van Pass", "Lang Co Beach", "My Son Ruins", "Countryside Villages"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Hue",
        description: "Welcome and bike fitting",
        activities: [
          "Arrival at Phu Bai Airport",
          "Transfer to hotel",
          "3:00 PM - Bike fitting and briefing",
          "4:00 PM - Easy warm-up ride around Hue",
          "Evening: Welcome dinner"
        ],
        meals: ["Dinner"]
      },
      {
        day: 2,
        title: "Hue Exploration by Bike",
        description: "Cycling distance: 25km",
        activities: [
          "8:00 AM - Cycle to Imperial Citadel",
          "10:00 AM - Thien Mu Pagoda",
          "11:30 AM - Lunch at local restaurant",
          "2:00 PM - Tu Duc Tomb by bike",
          "4:00 PM - Return to hotel via countryside",
          "Evening: Free time"
        ],
        meals: ["Breakfast"]
      },
      {
        day: 3,
        title: "Hue to Cau Hai Lagoon",
        description: "Cycling distance: 40km",
        activities: [
          "7:30 AM - Depart Hue by bike",
          "Cycle through fishing villages",
          "10:00 AM - Cau Hai Lagoon views",
          "12:00 PM - Lunch at lagoon restaurant",
          "2:00 PM - Continue along coast",
          "4:00 PM - Arrive Lang Co Beach",
          "Evening: Relax on beach"
        ],
        meals: ["Breakfast"]
      },
      {
        day: 4,
        title: "Hai Van Pass",
        description: "Cycling distance: 35km (challenging)",
        activities: [
          "7:00 AM - Early start for Hai Van Pass",
          "Challenging climb with support vehicle",
          "10:00 AM - Summit at 500m elevation",
          "Spectacular views of both coasts",
          "12:00 PM - Descend to Da Nang",
          "1:30 PM - Lunch in Da Nang",
          "3:00 PM - Transfer to Hoi An",
          "Evening: Ancient Town walk"
        ],
        meals: ["Breakfast"]
      },
      {
        day: 5,
        title: "Hoi An Countryside",
        description: "Cycling distance: 30km",
        activities: [
          "6:30 AM - Early morning market visit",
          "8:00 AM - Cycle to Tra Que Herb Village",
          "10:00 AM - Cooking class and lunch",
          "2:00 PM - Cycle to Cam Thanh Coconut Village",
          "3:30 PM - Basket boat experience",
          "5:00 PM - Return to Hoi An",
          "Evening: Free time"
        ],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 6,
        title: "My Son Sanctuary by Bike",
        description: "Cycling distance: 45km",
        activities: [
          "6:00 AM - Cycle towards My Son",
          "8:30 AM - Arrive My Son Sanctuary",
          "Explore ancient Hindu temples",
          "10:30 AM - Cham dance performance",
          "12:00 PM - Lunch at local spot",
          "1:00 PM - Boat ride back to Hoi An",
          "3:00 PM - Free time in Hoi An",
          "Evening: Farewell dinner"
        ],
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 7,
        title: "Departure",
        description: "Farewell to Central Vietnam",
        activities: [
          "Breakfast at hotel",
          "Free time for last-minute shopping",
          "Transfer to Da Nang Airport",
          "Departure"
        ],
        meals: ["Breakfast"]
      }
    ],
    included: ["6 nights hotels", "Bicycle", "Support vehicle", "Guide", "Breakfast", "Entrance fees"],
    excluded: ["Flights", "Lunch/dinner", "Tips"],
    imageUrl: "/tours/cycling-hue-hoi-an-7d.jpg",
    rating: 9.4,
    reviewCount: 89,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/hue-to-hoi-an-cycling-journey-4-days.html",
    durationHours: 168,
    startCity: "Hue",
    destinations: ["Hue", "Lang Co", "Da Nang", "Hoi An"],
    activities: ["cycling", "adventure", "cultural", "beach"],
  },
  {
    id: "central-vietnam-heritage-9d",
    slug: "central-vietnam-heritage-adventure-9-days",
    name: "Central Vietnam Heritage & Adventure",
    category: "multi-day",
    location: "Central Vietnam",
    duration: "9 days, 8 nights",
    price: 899,
    description: "Comprehensive 9-day tour covering all the famous and captivating locations of Central Vietnam.",
    fullDescription: `
      <h3>Complete Central Vietnam Experience</h3>
      <p>This thorough journey takes you through every must-see destination in Central Vietnam, from imperial Hue to pristine beaches.</p>
    `,
    highlights: ["Imperial Hue", "My Son", "Hoi An", "Ba Na Hills", "Phong Nha Caves", "DMZ Tour"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Hue",
        description: "Welcome to Imperial City",
        activities: [
          "Arrival at Phu Bai Airport",
          "Transfer to hotel",
          "Free time to rest",
          "Evening: Perfume River walk"
        ],
        meals: []
      },
      {
        day: 2,
        title: "Hue Imperial Heritage",
        description: "Imperial City exploration",
        activities: [
          "8:30 AM - Imperial Citadel tour",
          "Forbidden Purple City",
          "11:00 AM - Thien Mu Pagoda",
          "12:30 PM - Lunch",
          "2:00 PM - Tu Duc Tomb",
          "4:00 PM - Khai Dinh Tomb",
          "Evening: Royal cuisine dinner"
        ],
        meals: ["Breakfast"]
      },
      {
        day: 3,
        title: "DMZ Tour",
        description: "Vietnam War history",
        activities: [
          "7:00 AM - Depart for DMZ",
          "Vinh Moc Tunnels",
          "Ben Hai River (17th Parallel)",
          "Hien Luong Bridge",
          "Khe Sanh Combat Base",
          "Rock Pile",
          "5:00 PM - Return to Hue"
        ],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 4,
        title: "Hue to Phong Nha",
        description: "Journey to the caves",
        activities: [
          "8:00 AM - Depart for Phong Nha",
          "Scenic coastal drive",
          "12:00 PM - Lunch en route",
          "2:00 PM - Arrive Phong Nha",
          "3:00 PM - Paradise Cave exploration",
          "Evening: Relax at hotel"
        ],
        meals: ["Breakfast"]
      },
      {
        day: 5,
        title: "Phong Nha Caves",
        description: "UNESCO World Heritage caves",
        activities: [
          "8:00 AM - Phong Nha Cave by boat",
          "Explore vast caverns",
          "11:00 AM - Dark Cave adventure (optional)",
          "Zip-line, mud bath, kayaking",
          "1:00 PM - Lunch",
          "3:00 PM - Depart for Hoi An",
          "7:00 PM - Arrive Hoi An"
        ],
        meals: ["Breakfast"]
      },
      {
        day: 6,
        title: "Hoi An Ancient Town",
        description: "UNESCO heritage walking",
        activities: [
          "8:30 AM - Hoi An walking tour",
          "Japanese Bridge, Assembly Halls",
          "Traditional houses and workshops",
          "11:00 AM - Free time for shopping",
          "12:00 PM - Lunch",
          "2:00 PM - Tra Que Herb Village",
          "Evening: Lantern-lit town walk"
        ],
        meals: ["Breakfast"]
      },
      {
        day: 7,
        title: "My Son Sanctuary",
        description: "Ancient Hindu temples",
        activities: [
          "6:00 AM - Sunrise at My Son",
          "Explore Cham temple ruins",
          "Traditional dance performance",
          "10:00 AM - Return to Hoi An",
          "Afternoon: Free time, beach, or tailors",
          "Evening: Free"
        ],
        meals: ["Breakfast"]
      },
      {
        day: 8,
        title: "Ba Na Hills Golden Bridge",
        description: "The iconic golden hands",
        activities: [
          "8:00 AM - Transfer to Ba Na Hills",
          "Cable car to summit",
          "Golden Bridge photography",
          "French Village exploration",
          "Fantasy Park",
          "12:30 PM - Lunch at Ba Na",
          "4:00 PM - Return to Da Nang",
          "Evening: Free time"
        ],
        meals: ["Breakfast"]
      },
      {
        day: 9,
        title: "Departure",
        description: "Farewell Central Vietnam",
        activities: [
          "Breakfast at hotel",
          "Free time until departure",
          "Transfer to Da Nang Airport",
          "Departure"
        ],
        meals: ["Breakfast"]
      }
    ],
    included: ["8 nights hotels", "Breakfast", "All transfers", "Guide", "Entrance fees"],
    excluded: ["Flights", "Lunch/dinner", "Tips"],
    imageUrl: "/tours/central-vietnam-heritage-9d.jpg",
    rating: 9.3,
    reviewCount: 67,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/central-vietnam-grand-discovery-9-days.html",
    durationHours: 216,
    startCity: "Hue",
    destinations: ["Hue", "DMZ", "Phong Nha", "Hoi An", "Da Nang", "Ba Na Hills"],
    activities: ["cultural", "historical", "adventure", "sightseeing"],
  },

  // MEKONG DELTA TOURS
  {
    id: "cu-chi-mekong-combo-day",
    slug: "cu-chi-tunnels-mekong-delta-day-tour",
    name: "Cu Chi Tunnels & Mekong Delta Day Tour",
    category: "day-trip",
    location: "Southern Vietnam",
    duration: "1 day",
    price: 79,
    description: "Combine two must-see attractions in one full day: the historic Cu Chi Tunnels and scenic Mekong Delta.",
    fullDescription: `
      <h3>History & Nature in One Day</h3>
      <p>Start with the incredible underground tunnel system at Cu Chi, then cruise through the lush Mekong Delta waterways.</p>
    `,
    highlights: ["Cu Chi Tunnels", "Mekong Delta Boat", "Local Fruits", "Honey Farm", "Folk Music"],
    itinerary: [
      {
        day: 1,
        title: "Full Day Cu Chi & Mekong Delta",
        description: "History and nature in one day",
        activities: [
          "7:00 AM - Hotel pickup in Ho Chi Minh City",
          "8:30 AM - Arrive Cu Chi Tunnels",
          "Learn about Vietnam War tunnel network",
          "Optional: Crawl through actual tunnels",
          "Try firing AK-47 at shooting range (extra)",
          "11:00 AM - Depart for Mekong Delta",
          "12:30 PM - Arrive My Tho, lunch at riverside restaurant",
          "2:00 PM - Motorboat to Unicorn Island",
          "Visit honey bee farm and taste honey tea",
          "3:00 PM - Sampan ride through coconut palm canals",
          "3:30 PM - Fruit tasting at orchard",
          "4:00 PM - Traditional folk music performance",
          "5:00 PM - Depart for Ho Chi Minh City",
          "7:00 PM - Hotel drop-off"
        ],
        meals: ["Lunch"]
      }
    ],
    included: ["Transfers", "Guide", "Lunch", "Boat", "Entrance fees"],
    excluded: ["Tips", "Personal expenses"],
    imageUrl: "/tours/cu-chi-mekong-combo-day.jpg",
    rating: 9.1,
    reviewCount: 456,
    affiliateUrl: "https://www.bestpricetravel.com/mekong-delta-tours/cu-chi-tunnels-mekong-delta-day-trip.html",
    durationHours: 12,
    startCity: "Ho Chi Minh City",
    destinations: ["Cu Chi", "Mekong Delta"],
    activities: ["historical", "boat-tour", "cultural"],
  },
  {
    id: "mekong-speedboat-day",
    slug: "luxury-mekong-delta-speedboat-full-day",
    name: "Luxury Mekong Delta Speedboat Tour",
    category: "day-trip",
    location: "Mekong Delta",
    duration: "1 day",
    price: 115,
    description: "Experience the Mekong Delta in style aboard a luxury speedboat, visiting markets, pagodas, and canal woodlands.",
    fullDescription: `
      <h3>Premium Mekong Experience</h3>
      <p>Travel by speedboat through Saigon's narrow canals into the lush green tributaries of the Mekong Delta with breakfast on board.</p>
    `,
    highlights: ["Speedboat Journey", "Canal Woodlands", "Tuong Van Pagoda", "Riverside Markets", "Light Breakfast"],
    itinerary: [
      {
        day: 1,
        title: "Luxury Mekong Speedboat Experience",
        description: "Premium Mekong journey",
        activities: [
          "7:30 AM - Hotel pickup in Ho Chi Minh City",
          "8:00 AM - Board luxury speedboat at Saigon River pier",
          "8:30 AM - Light breakfast served on board",
          "9:00 AM - Cruise through narrow Saigon canals",
          "Experience local waterway life",
          "10:00 AM - Enter lush green canal woodlands",
          "10:30 AM - Visit Tuong Van Pagoda by boat",
          "11:30 AM - Stop at riverside trading market",
          "Meet local vendors and craftspeople",
          "12:30 PM - Lunch at riverside restaurant",
          "2:00 PM - Continue through palm-lined waterways",
          "3:00 PM - Visit traditional handicraft village",
          "4:00 PM - Speedboat return to Saigon",
          "5:30 PM - Hotel drop-off"
        ],
        meals: ["Breakfast"]
      }
    ],
    included: ["Speedboat", "Breakfast", "Guide", "All visits"],
    excluded: ["Lunch", "Tips"],
    imageUrl: "/tours/mekong-speedboat-day.jpg",
    rating: 9.3,
    reviewCount: 187,
    affiliateUrl: "https://www.bestpricetravel.com/mekong-delta-tours/luxury-mekong-delta-speedboat-tour-full-day.html",
    durationHours: 9,
    startCity: "Ho Chi Minh City",
    destinations: ["Mekong Delta"],
    activities: ["speedboat", "nature", "cultural"],
  },
  {
    id: "mekong-floating-market-2d",
    slug: "mekong-delta-floating-market-2-days",
    name: "Mekong Delta with Floating Market",
    category: "multi-day",
    location: "Mekong Delta",
    duration: "2 days, 1 night",
    price: 265,
    description: "Overnight Mekong Delta adventure including the famous Cai Rang Floating Market sunrise experience.",
    fullDescription: `
      <h3>Authentic Mekong Experience</h3>
      <p>Stay overnight in the delta to experience the early morning floating market, local homestay, and countryside cycling.</p>
    `,
    highlights: ["Cai Rang Floating Market", "Homestay", "Fruit Orchards", "Sampan Rides", "Local Cooking"],
    itinerary: [
      {
        day: 1,
        title: "Ho Chi Minh City to Can Tho",
        description: "Into the delta heartland",
        activities: [
          "7:30 AM - Hotel pickup in Saigon",
          "Drive through rice paddies and countryside",
          "10:30 AM - Arrive My Tho",
          "11:00 AM - Motorboat to fruit island",
          "12:00 PM - Lunch at orchard restaurant",
          "1:30 PM - Sampan ride through palm canals",
          "2:30 PM - Visit honey bee farm",
          "3:00 PM - Continue to Can Tho",
          "5:00 PM - Check-in homestay",
          "6:00 PM - Cooking class: Vietnamese dishes",
          "7:30 PM - Dinner with host family"
        ],
        meals: ["Lunch", "Dinner"]
      },
      {
        day: 2,
        title: "Cai Rang Floating Market & Return",
        description: "Sunrise at the floating market",
        activities: [
          "5:30 AM - Early wake-up, coffee",
          "6:00 AM - Boat to Cai Rang Floating Market",
          "Experience Vietnam's largest floating market",
          "Buy fresh fruits from boat vendors",
          "7:30 AM - Breakfast on the boat",
          "8:30 AM - Visit noodle-making factory",
          "9:30 AM - Cycling through countryside",
          "Explore villages and local life",
          "11:00 AM - Return to homestay",
          "12:00 PM - Lunch and depart",
          "4:00 PM - Arrive Ho Chi Minh City"
        ],
        meals: ["Breakfast", "Lunch"]
      }
    ],
    included: ["1 night homestay", "All meals", "Guide", "Boat tours", "Cycling"],
    excluded: ["Tips", "Personal expenses"],
    imageUrl: "/tours/mekong-floating-market-2d.jpg",
    rating: 9.2,
    reviewCount: 234,
    affiliateUrl: "https://www.bestpricetravel.com/mekong-delta-tours/mekong-delta-with-floating-market-2-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/644b8d7cabfff.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/644b89d076852.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/644b8a4165dfb.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/644b8c20ba4e4.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/644b8c20ba4e6.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/644b8b5318f54.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/652e5da8a4485.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/658959fdb8a3c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/652e5da8a4487.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/652e5da8a4488.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/652e5da8a4489.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/652e5da8a448a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/652e5da8a448b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/652e5da8a448c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/652e5da8a448d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/6454aaa47b043.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/65323234bd4e4.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/652cff8a4ada4.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/652cfe08e7a0f.jpg","https://d122axpxm39woi.cloudfront.net/assets/img/dcma.png"],
    pricingTiers: [{"category":"Superior","price":270},{"category":"First Class","price":282}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 48,
    startCity: "Ho Chi Minh City",
    destinations: ["Can Tho", "Mekong Delta"],
    activities: ["boat-tour", "cultural", "homestay"],
  },
  {
    id: "mekong-local-life-day",
    slug: "mekong-local-life-cai-be-tan-phong-day",
    name: "Mekong Local Life: Cai Be & Tan Phong Island",
    category: "day-trip",
    location: "Mekong Delta",
    duration: "1 day",
    price: 109,
    description: "Full-day private tour to Mekong Delta's heart with candy making, bee farms, and fruit gardens on Tan Phong Island.",
    fullDescription: `
      <h3>Authentic Mekong Village Life</h3>
      <p>Get close to local Mekong life with visits to candy workshops, bee farms, and tropical fruit gardens on Cu Lao Tan Phong island.</p>
    `,
    highlights: ["Candy Craft Village", "Bee Farm", "Tan Phong Island", "Fruit Gardens", "Local Trading"],
    itinerary: [
      {
        day: 1,
        title: "Mekong Local Life Experience",
        description: "Private tour to Cai Be and Tan Phong",
        activities: [
          "7:30 AM - Private pickup from hotel",
          "9:30 AM - Arrive Cai Be Floating Market area",
          "10:00 AM - Visit coconut candy craft village",
          "Watch traditional candy making process",
          "Taste fresh coconut candies",
          "11:00 AM - Boat ride to Tan Phong Island",
          "11:30 AM - Explore bee farm",
          "Taste honey tea and royal jelly",
          "12:30 PM - Lunch at local family home",
          "2:00 PM - Walk through tropical fruit gardens",
          "Taste seasonal fruits fresh from trees",
          "3:00 PM - Horse cart ride through village",
          "3:30 PM - Visit local trading house",
          "See traditional rice paper making",
          "4:30 PM - Depart for Ho Chi Minh City",
          "6:30 PM - Hotel drop-off"
        ],
        meals: ["Lunch"]
      }
    ],
    included: ["Private guide", "Boat", "Lunch", "All visits", "Transfers"],
    excluded: ["Tips"],
    imageUrl: "/tours/mekong-local-life-day.jpg",
    rating: 9.0,
    reviewCount: 145,
    affiliateUrl: "https://www.bestpricetravel.com/mekong-delta-tours/mekong-delta-local-life-full-day.html",
    durationHours: 10,
    startCity: "Ho Chi Minh City",
    destinations: ["Cai Be", "Tan Phong Island"],
    activities: ["cultural", "boat-tour", "food-tour"],
  },
  {
    id: "insight-mekong-day",
    slug: "insight-mekong-delta-day-trip",
    name: "Insight Mekong Delta Day Trip",
    category: "day-trip",
    location: "Mekong Delta",
    duration: "1 day",
    price: 62,
    description: "Discover the rustic daily life of friendly Ben Tre people with coconut farms, fruit fields, and river excursions.",
    fullDescription: `
      <h3>Ben Tre Mekong Experience</h3>
      <p>Fall in love with the captivating yet rustic daily life of the Mekong Delta people in Ben Tre province.</p>
    `,
    highlights: ["Ben Tre", "Coconut Farm", "River Excursion", "Local Fruits", "Traditional Crafts"],
    itinerary: [
      {
        day: 1,
        title: "Ben Tre Mekong Discovery",
        description: "Authentic delta life experience",
        activities: [
          "7:30 AM - Hotel pickup in Saigon",
          "9:30 AM - Arrive Ben Tre province",
          "10:00 AM - Board boat on Ham Luong River",
          "Cruise through coconut-lined waterways",
          "10:30 AM - Visit coconut processing factory",
          "See coconut products being made",
          "11:15 AM - Sampan ride through narrow canals",
          "Pass through traditional villages",
          "12:00 PM - Lunch at riverside restaurant",
          "Try local specialties and coconut dishes",
          "1:30 PM - Visit family fruit orchard",
          "Taste seasonal tropical fruits",
          "2:30 PM - Explore traditional mat weaving",
          "3:00 PM - Horse cart ride through village",
          "3:30 PM - Visit brick-making kiln",
          "4:00 PM - Depart for Ho Chi Minh City",
          "6:30 PM - Hotel drop-off"
        ],
        meals: ["Lunch"]
      }
    ],
    included: ["Boat", "Lunch", "Guide", "Transfers"],
    excluded: ["Tips", "Personal expenses"],
    imageUrl: "/tours/insight-mekong-day.jpg",
    rating: 8.9,
    reviewCount: 312,
    affiliateUrl: "https://www.bestpricetravel.com/mekong-delta-tours/insight-mekong-delta-full-day.html",
    durationHours: 9,
    startCity: "Ho Chi Minh City",
    destinations: ["Ben Tre", "Mekong Delta"],
    activities: ["boat-tour", "cultural", "nature"],
  },

  // NORTHERN VIETNAM TOURS
  {
    id: "north-vietnam-hanoi-sapa-halong-6d",
    slug: "best-northern-vietnam-6-days",
    name: "Best of Northern Vietnam: Hanoi, Sapa & Halong",
    category: "multi-day",
    location: "Northern Vietnam",
    duration: "6 days, 5 nights",
    price: 599,
    description: "Complete Northern Vietnam experience with Hanoi culture, Sapa ethnic villages, and Halong Bay cruise.",
    fullDescription: `
      <h3>Northern Vietnam Highlights</h3>
      <p>The perfect introduction to Northern Vietnam covering all three essential destinations: Hanoi, Sapa, and Halong Bay.</p>
    `,
    highlights: ["Hanoi Old Quarter", "Sapa Trekking", "Halong Bay Cruise", "Ethnic Villages", "Rice Terraces"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Hanoi",
        description: "Welcome to Vietnam's capital",
        activities: [
          "Arrival at Noi Bai International Airport",
          "Transfer to hotel in Old Quarter",
          "2:00 PM - Hanoi walking tour",
          "Hoan Kiem Lake and Ngoc Son Temple",
          "Evening: Water puppet show (optional)"
        ],
        meals: []
      },
      {
        day: 2,
        title: "Hanoi to Sapa",
        description: "Journey to the mountains",
        activities: [
          "8:00 AM - Hanoi city tour",
          "Ho Chi Minh Mausoleum (outside)",
          "Temple of Literature",
          "11:30 AM - Lunch",
          "1:00 PM - Transfer to Sapa (5-6 hours)",
          "Evening: Arrive Sapa, check-in",
          "Free time at Sapa town"
        ],
        meals: ["Breakfast"]
      },
      {
        day: 3,
        title: "Sapa Trekking",
        description: "Rice terraces and ethnic villages",
        activities: [
          "8:30 AM - Trek to Cat Cat Village",
          "Meet Black Hmong community",
          "10:30 AM - Continue to Y Linh Ho village",
          "12:00 PM - Lunch at local house",
          "2:00 PM - Trek to Lao Chai village",
          "4:00 PM - Visit Ta Van village",
          "5:00 PM - Return to Sapa",
          "Evening: Free time"
        ],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 4,
        title: "Sapa to Halong Bay",
        description: "From mountains to sea",
        activities: [
          "7:00 AM - Check-out and depart",
          "Transfer to Halong Bay (5 hours)",
          "12:00 PM - Board cruise ship",
          "12:30 PM - Welcome drink and lunch",
          "2:00 PM - Cruise through limestone karsts",
          "4:00 PM - Kayaking at Luon Cave",
          "5:30 PM - Sunset on deck",
          "7:00 PM - Seafood dinner on board",
          "Evening: Squid fishing or relax"
        ],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 5,
        title: "Halong Bay to Hanoi",
        description: "Caves and farewell to the bay",
        activities: [
          "6:30 AM - Sunrise Tai Chi on deck",
          "7:30 AM - Breakfast",
          "8:30 AM - Visit Sung Sot Cave",
          "Explore spectacular stalactites",
          "10:00 AM - Check-out and brunch",
          "11:00 AM - Cruise back to harbor",
          "12:30 PM - Disembark, transfer to Hanoi",
          "4:00 PM - Arrive Hanoi",
          "Evening: Free time, Old Quarter"
        ],
        meals: ["Breakfast", "Brunch"]
      },
      {
        day: 6,
        title: "Departure",
        description: "Farewell Hanoi",
        activities: [
          "Breakfast at hotel",
          "Free time for last-minute shopping",
          "Transfer to Noi Bai Airport",
          "Departure"
        ],
        meals: ["Breakfast"]
      }
    ],
    included: ["5 nights hotels/cruise", "Breakfast", "Halong cruise", "Guide", "Transfers"],
    excluded: ["Flights", "Lunch/dinner", "Tips"],
    imageUrl: "/tours/north-vietnam-hanoi-sapa-halong-6d.jpg",
    rating: 9.4,
    reviewCount: 378,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/best-of-northern-vietnam-6-days.html",
    durationHours: 144,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Sapa", "Halong Bay"],
    activities: ["trekking", "cruise", "cultural"],
  },
  {
    id: "luxury-north-vietnam-7d",
    slug: "luxurious-northern-vietnam-7-days",
    name: "Luxurious Northern Vietnam Exploration",
    category: "multi-day",
    location: "Northern Vietnam",
    duration: "7 days, 6 nights",
    price: 1689,
    description: "Premium 7-day private tour with luxury accommodations in Hanoi, Ninh Binh, and a private Halong Bay cruise.",
    fullDescription: `
      <h3>Premium Northern Vietnam</h3>
      <p>Experience Northern Vietnam in ultimate comfort with luxury hotels, private cruise, and personalized service throughout.</p>
    `,
    highlights: ["Hanoi Heritage", "Ninh Binh", "Tam Coc", "Mua Cave", "Trang An", "Private Halong Cruise"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Hanoi",
        description: "Luxury welcome to Vietnam",
        activities: [
          "VIP airport pickup and fast-track immigration",
          "Private transfer to 5-star hotel",
          "Welcome drink and check-in",
          "4:00 PM - Private cyclo tour through Old Quarter",
          "7:00 PM - Welcome dinner at finest Vietnamese restaurant"
        ],
        meals: ["Dinner"]
      },
      {
        day: 2,
        title: "Hanoi Heritage",
        description: "Capital city exploration",
        activities: [
          "8:00 AM - Private breakfast at hotel",
          "9:00 AM - Ho Chi Minh Mausoleum Complex",
          "One Pillar Pagoda",
          "11:00 AM - Temple of Literature (VIP tour)",
          "12:30 PM - Gourmet lunch",
          "2:30 PM - Vietnamese Women's Museum",
          "4:00 PM - Spa treatment at hotel",
          "7:00 PM - Fine dining dinner"
        ],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 3,
        title: "Hanoi to Ninh Binh",
        description: "Halong Bay on land",
        activities: [
          "8:30 AM - Private transfer to Ninh Binh",
          "10:30 AM - Trang An Boat Tour (UNESCO site)",
          "Row through caves and valleys",
          "1:00 PM - Gourmet lunch at resort",
          "3:00 PM - Hoa Lu Ancient Capital",
          "5:00 PM - Check-in luxury resort",
          "7:00 PM - Private dinner overlooking rice fields"
        ],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 4,
        title: "Ninh Binh to Halong Bay",
        description: "Board your private cruise",
        activities: [
          "6:00 AM - Optional: Sunrise at Mua Cave (500 steps)",
          "8:00 AM - Breakfast at resort",
          "9:00 AM - Tam Coc boat ride through rice paddies",
          "11:30 AM - Transfer to Halong Bay",
          "1:00 PM - Board private luxury cruise",
          "Welcome champagne",
          "2:00 PM - Gourmet lunch as you cruise",
          "4:00 PM - Private kayaking excursion",
          "6:00 PM - Sunset cocktails on deck",
          "7:30 PM - 5-course dinner on board"
        ],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 5,
        title: "Halong Bay Full Day",
        description: "Private bay exploration",
        activities: [
          "6:30 AM - Sunrise Tai Chi with instructor",
          "7:30 AM - Full breakfast",
          "8:30 AM - Explore hidden lagoons by tender",
          "10:00 AM - Visit floating fishing village",
          "11:30 AM - Cooking class on board",
          "1:00 PM - Lunch (your creation)",
          "3:00 PM - Swim at private beach",
          "5:00 PM - Vietnamese tea ceremony",
          "7:00 PM - BBQ dinner on deck"
        ],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 6,
        title: "Halong Bay to Hanoi",
        description: "Morning on the bay",
        activities: [
          "6:30 AM - Morning swim or Tai Chi",
          "8:00 AM - Breakfast",
          "9:00 AM - Sung Sot Cave (VIP access)",
          "10:30 AM - Brunch and check-out",
          "12:00 PM - Transfer to Hanoi",
          "3:00 PM - Check-in 5-star Hanoi hotel",
          "4:00 PM - Spa session",
          "7:30 PM - Farewell gala dinner"
        ],
        meals: ["Breakfast", "Brunch", "Dinner"]
      },
      {
        day: 7,
        title: "Departure",
        description: "Luxury farewell",
        activities: [
          "Breakfast at hotel",
          "Free time for last-minute shopping",
          "VIP transfer to airport",
          "Fast-track departure assistance",
          "Departure"
        ],
        meals: ["Breakfast"]
      }
    ],
    included: ["6 nights 5-star hotels", "Private cruise", "All meals", "Private guide", "All transfers"],
    excluded: ["Flights", "Tips", "Spa services"],
    imageUrl: "/tours/luxury-north-vietnam-7d.jpg",
    rating: 9.6,
    reviewCount: 56,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/luxurious-northern-vietnam-exploration-7-days.html",
    durationHours: 168,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Ninh Binh", "Halong Bay"],
    activities: ["luxury", "cruise", "cultural", "photography"],
  },
  {
    id: "private-north-vietnam-14d",
    slug: "private-gateways-north-vietnam-14-days",
    name: "Private Gateways to North Vietnam",
    category: "multi-day",
    location: "Northern Vietnam",
    duration: "14 days, 13 nights",
    price: 1779,
    description: "2-week private journey through Northern Vietnam's best destinations with focus on nature and ethnic culture.",
    fullDescription: `
      <h3>Comprehensive North Vietnam Journey</h3>
      <p>An immersive private experience exploring the full diversity of Northern Vietnam from mountains to coast.</p>
    `,
    highlights: ["Hanoi", "Mai Chau", "Sapa", "Ha Giang", "Ba Be Lake", "Halong Bay"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Hanoi",
        description: "Welcome to Northern Vietnam",
        activities: ["Airport pickup", "Hotel check-in", "Evening Old Quarter walk"],
        meals: []
      },
      {
        day: 2,
        title: "Hanoi City Tour",
        description: "Capital exploration",
        activities: ["Ho Chi Minh Mausoleum", "Temple of Literature", "Old Quarter", "Water puppet show"],
        meals: ["Breakfast"]
      },
      {
        day: 3,
        title: "Hanoi to Mai Chau",
        description: "Mountain valley",
        activities: ["Drive to Mai Chau", "Thai village visit", "Cycling through rice paddies", "Homestay"],
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 4,
        title: "Mai Chau to Sapa",
        description: "Higher mountains",
        activities: ["Scenic drive to Sapa", "Cat Cat village", "Evening Sapa town"],
        meals: ["Breakfast"]
      },
      {
        day: 5,
        title: "Sapa Trekking",
        description: "Ethnic villages",
        activities: ["Trek to Lao Chai", "Ta Van village", "Rice terraces", "Local lunch"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 6,
        title: "Sapa to Ha Giang",
        description: "Journey to extreme north",
        activities: ["Long scenic drive", "Mountain landscapes", "Arrive Ha Giang"],
        meals: ["Breakfast"]
      },
      {
        day: 7,
        title: "Ha Giang Loop Day 1",
        description: "Quan Ba and beyond",
        activities: ["Heaven Gate", "Twin Mountains", "Yen Minh", "Dong Van"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 8,
        title: "Ha Giang Loop Day 2",
        description: "Ma Pi Leng Pass",
        activities: ["Lung Cu Flag Tower", "Ma Pi Leng Pass", "Meo Vac", "Return Ha Giang"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 9,
        title: "Ha Giang to Cao Bang",
        description: "Northeast adventure",
        activities: ["Scenic mountain route", "Arrive Cao Bang city"],
        meals: ["Breakfast"]
      },
      {
        day: 10,
        title: "Ban Gioc Waterfall",
        description: "Vietnam's largest waterfall",
        activities: ["Ban Gioc Waterfall", "Bamboo raft", "Nguom Ngao Cave", "Return Cao Bang"],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 11,
        title: "Cao Bang to Ba Be Lake",
        description: "National park",
        activities: ["Drive to Ba Be", "Boat trip on lake", "Pu Luong ethnic village"],
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 12,
        title: "Ba Be to Hanoi",
        description: "Return journey",
        activities: ["Morning lake exploration", "Pac Ngoi cave", "Drive to Hanoi"],
        meals: ["Breakfast"]
      },
      {
        day: 13,
        title: "Halong Bay Cruise",
        description: "Emerald waters",
        activities: ["Transfer to Halong", "Board cruise", "Kayaking", "Caves", "Dinner on board"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 14,
        title: "Halong - Departure",
        description: "Farewell Vietnam",
        activities: ["Sunrise", "Brunch", "Transfer to Hanoi airport", "Departure"],
        meals: ["Breakfast", "Brunch"]
      }
    ],
    included: ["13 nights accommodation", "Private car", "Guide", "Breakfast", "Selected meals"],
    excluded: ["Flights", "Most meals", "Tips"],
    imageUrl: "/tours/private-north-vietnam-14d.jpg",
    rating: 9.5,
    reviewCount: 45,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/private-gateways-to-north-vietnam-14-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/678f4cdc651be.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d24be4e9c6.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/642a551b59a3d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d24e6bccfe.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/642a551b59a3f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d25020edab.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/642a551b59a40.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d24d7eabde.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d2519c3501.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/642a551b59a41.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d253034546.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d254221d58.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/642a551b59a42.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/642a551b59a43.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/642a553a4744e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d25587bf70.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/642a553a47450.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d256a46d4d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/642a553a47451.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/642a566a4ce18.jpg"],
    pricingTiers: [{"category":"Superior 3* Hotels","price":1779},{"category":"First Class 4* Hotels","price":1979}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 336,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Mai Chau", "Sapa", "Ha Giang", "Ba Be", "Halong Bay"],
    activities: ["adventure", "cultural", "nature", "photography"],
  },
  {
    id: "hanoi-halong-ninh-binh-5d",
    slug: "hanoi-halong-ninh-binh-glimpse-north-5-days",
    name: "Hanoi, Halong Bay, Ninh Binh Budget Glimpse",
    category: "multi-day",
    location: "Northern Vietnam",
    duration: "5 days, 4 nights",
    price: 299,
    description: "Budget-friendly 5-day tour covering the must-see highlights of Northern Vietnam.",
    fullDescription: `
      <h3>Budget North Vietnam</h3>
      <p>Experience the essential Northern Vietnam attractions without breaking the bank.</p>
    `,
    highlights: ["Hanoi Old Quarter", "Halong Bay Cruise", "Tam Coc", "Bai Dinh Pagoda", "Trang An"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Hanoi",
        description: "Welcome to Vietnam",
        activities: [
          "Airport pickup",
          "Transfer to Old Quarter hotel",
          "Check-in and rest",
          "Evening: Walking tour of Old Quarter",
          "Hoan Kiem Lake visit"
        ],
        meals: []
      },
      {
        day: 2,
        title: "Hanoi to Halong Bay",
        description: "Cruise on emerald waters",
        activities: [
          "8:00 AM - Pickup from hotel",
          "11:30 AM - Arrive Halong, board cruise",
          "12:30 PM - Lunch while cruising",
          "2:00 PM - Explore Ti Top Island or Beach",
          "3:30 PM - Kayaking at Luon Cave",
          "5:30 PM - Return to ship, sunset",
          "7:00 PM - Dinner on board",
          "Evening: Squid fishing or karaoke"
        ],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 3,
        title: "Halong Bay to Ninh Binh",
        description: "Caves and valleys",
        activities: [
          "6:30 AM - Optional: Tai Chi",
          "7:30 AM - Breakfast",
          "8:30 AM - Sung Sot Cave visit",
          "10:00 AM - Check-out, cruise to harbor",
          "11:30 AM - Transfer to Ninh Binh",
          "3:00 PM - Arrive, check-in hotel",
          "4:00 PM - Visit Bai Dinh Pagoda",
          "Largest pagoda complex in Vietnam",
          "Evening: Free time"
        ],
        meals: ["Breakfast", "Brunch"]
      },
      {
        day: 4,
        title: "Ninh Binh Exploration",
        description: "Halong Bay on land",
        activities: [
          "8:00 AM - Breakfast",
          "9:00 AM - Tam Coc boat ride",
          "Row through three caves",
          "Rice paddies and karst scenery",
          "11:30 AM - Lunch at local restaurant",
          "1:00 PM - Trang An Boat Tour",
          "UNESCO World Heritage site",
          "4:00 PM - Return to Hanoi",
          "Evening: Free time in Hanoi"
        ],
        meals: ["Breakfast"]
      },
      {
        day: 5,
        title: "Departure",
        description: "Farewell Vietnam",
        activities: [
          "Breakfast at hotel",
          "Free time until departure",
          "Transfer to airport",
          "Departure"
        ],
        meals: ["Breakfast"]
      }
    ],
    included: ["4 nights hotels/cruise", "Breakfast", "Halong cruise", "Guide", "Transfers"],
    excluded: ["Flights", "Lunch/dinner", "Tips"],
    imageUrl: "/tours/hanoi-halong-ninh-binh-5d.jpg",
    rating: 9.1,
    reviewCount: 234,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/hanoi-halong-bay-ninh-binh-a-glimpse-of-north-vietnam-5-days.html",
    durationHours: 120,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Halong Bay", "Ninh Binh"],
    activities: ["cruise", "cultural", "sightseeing"],
  },
  {
    id: "north-vietnam-sapa-halong-5d",
    slug: "north-vietnam-at-a-glance-sapa-halong-5-days",
    name: "North Vietnam at A Glance: Sapa & Halong",
    category: "multi-day",
    location: "Northern Vietnam",
    duration: "5 days, 4 nights",
    price: 349,
    description: "In 5 days, experience Sapa's rice terraces and ethnic villages alongside Halong Bay's emerald waters.",
    fullDescription: `
      <h3>Sapa & Halong Bay Package</h3>
      <p>The perfect combination of mountain and sea, visiting Sapa's hill tribes and cruising through Halong Bay's limestone karsts.</p>
    `,
    highlights: ["Sapa Rice Terraces", "Ethnic Villages", "Halong Bay Cruise", "Cat Cat Village", "Fansipan"],
    itinerary: [
      {
        day: 1,
        title: "Hanoi to Sapa",
        description: "Journey to the mountains",
        activities: [
          "7:30 AM - Hotel pickup in Hanoi",
          "Scenic drive through Red River Delta",
          "11:00 AM - Stop at local market",
          "12:00 PM - Lunch en route",
          "3:00 PM - Arrive Sapa",
          "Check-in hotel with mountain views",
          "4:30 PM - Visit Cat Cat Village",
          "Hmong ethnic village",
          "Evening: Explore Sapa town"
        ],
        meals: ["Breakfast"]
      },
      {
        day: 2,
        title: "Sapa Trekking & Fansipan",
        description: "Mountains and villages",
        activities: [
          "8:00 AM - Optional: Cable car to Fansipan",
          "Roof of Indochina (3,143m)",
          "Or: Trek to Lao Chai village",
          "11:00 AM - Ta Van village visit",
          "12:30 PM - Lunch at local house",
          "2:00 PM - Rice terrace photography",
          "4:00 PM - Return to Sapa",
          "Evening: Free time"
        ],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 3,
        title: "Sapa to Halong Bay",
        description: "Mountains to sea",
        activities: [
          "7:00 AM - Check-out, depart Sapa",
          "Long scenic drive through countryside",
          "12:00 PM - Lunch stop",
          "1:00 PM - Continue to Halong Bay",
          "4:00 PM - Board overnight cruise",
          "Welcome drink",
          "5:00 PM - Cruise through karsts",
          "6:00 PM - Kayaking activity",
          "7:00 PM - Seafood dinner on board"
        ],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 4,
        title: "Halong Bay to Hanoi",
        description: "Morning on the bay",
        activities: [
          "6:30 AM - Sunrise Tai Chi",
          "7:30 AM - Breakfast",
          "8:30 AM - Sung Sot Cave exploration",
          "10:00 AM - Brunch and check-out",
          "11:30 AM - Cruise to harbor",
          "12:30 PM - Transfer to Hanoi",
          "4:00 PM - Arrive Hanoi hotel",
          "Evening: Free time in Old Quarter"
        ],
        meals: ["Breakfast", "Brunch"]
      },
      {
        day: 5,
        title: "Departure",
        description: "Farewell Hanoi",
        activities: [
          "Breakfast at hotel",
          "Free morning for shopping",
          "Transfer to airport",
          "Departure"
        ],
        meals: ["Breakfast"]
      }
    ],
    included: ["4 nights hotels/cruise", "Breakfast", "Halong cruise", "Guide", "Transfers"],
    excluded: ["Flights", "Lunch/dinner", "Tips"],
    imageUrl: "/tours/north-vietnam-sapa-halong-5d.jpg",
    rating: 9.3,
    reviewCount: 267,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/north-vietnam-at-a-glance-halong-bay-sapa-5-days.html",
    durationHours: 120,
    startCity: "Hanoi",
    destinations: ["Sapa", "Halong Bay"],
    activities: ["trekking", "cruise", "cultural"],
  },

  // SOUTHERN VIETNAM TOURS
  {
    id: "south-vietnam-glimpse-4d",
    slug: "glimpse-southern-vietnam-4-days",
    name: "A Glimpse of Southern Vietnam",
    category: "multi-day",
    location: "Southern Vietnam",
    duration: "4 days, 3 nights",
    price: 349,
    description: "Explore Southern Vietnam from bustling Saigon to Cu Chi Tunnels and the tranquil Mekong Delta in 4 days.",
    fullDescription: `
      <h3>Southern Vietnam Essentials</h3>
      <p>The perfect short introduction to Southern Vietnam covering Ho Chi Minh City, the Cu Chi Tunnels, and Mekong Delta.</p>
    `,
    highlights: ["Ho Chi Minh City", "Cu Chi Tunnels", "Mekong Delta", "Sampan Ride", "War Remnants Museum"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Ho Chi Minh City",
        description: "Welcome to Vietnam's largest city",
        activities: [
          "Arrival at Tan Son Nhat Airport",
          "Transfer to hotel in District 1",
          "Check-in and rest",
          "4:00 PM - Explore Nguyen Hue Walking Street",
          "Evening: Ben Thanh Market area"
        ],
        meals: []
      },
      {
        day: 2,
        title: "Ho Chi Minh City Tour & Cu Chi",
        description: "History and heritage",
        activities: [
          "8:00 AM - Transfer to Cu Chi Tunnels",
          "9:30 AM - Explore tunnel system",
          "Learn about Vietnam War history",
          "Optional: Crawl through tunnels",
          "12:00 PM - Return to city, lunch",
          "2:00 PM - War Remnants Museum",
          "3:30 PM - Reunification Palace",
          "4:30 PM - Notre Dame Cathedral & Post Office",
          "Evening: Free time"
        ],
        meals: ["Breakfast"]
      },
      {
        day: 3,
        title: "Mekong Delta Day Trip",
        description: "River life exploration",
        activities: [
          "8:00 AM - Depart for Mekong Delta",
          "10:00 AM - Arrive My Tho",
          "10:30 AM - Motorboat to Unicorn Island",
          "11:00 AM - Honey bee farm visit",
          "11:30 AM - Sampan ride through canals",
          "12:30 PM - Lunch at orchard",
          "2:00 PM - Fruit tasting",
          "2:30 PM - Traditional music performance",
          "4:00 PM - Return to Ho Chi Minh City",
          "Evening: Free time"
        ],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 4,
        title: "Departure",
        description: "Farewell Saigon",
        activities: [
          "Breakfast at hotel",
          "Free time for last shopping",
          "Ben Thanh Market souvenirs",
          "Transfer to airport",
          "Departure"
        ],
        meals: ["Breakfast"]
      }
    ],
    included: ["3 nights hotel", "Breakfast", "Guide", "Transfers", "Entrance fees"],
    excluded: ["Flights", "Lunch/dinner", "Tips"],
    imageUrl: "/tours/south-vietnam-glimpse-4d.jpg",
    rating: 9.0,
    reviewCount: 312,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/a-glimpse-of-southern-vietnam-4-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6889ea9e68473.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6889eafd2847c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6889eafd2847f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6889eafd2847e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6889eafd28480.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6889eb232e651.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6889ea9e6846f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6889eb232e654.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6889eb232e655.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6889ea9e68472.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6889ea9e68471.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/a-glimpse-of-southern-vietnam-4-days-64b5f7a7bfcc3.png","https://d122axpxm39woi.cloudfront.net/images/tours/origin/6889eafd2847c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/6889eafd28480.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/6889eb232e651.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/6889ea9e68471.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f9ca5d2eb12.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f49b8d2e968.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f4d2e1ee977.jpg","https://d122axpxm39woi.cloudfront.net/images/review/250_170/662b2024be464.jpg"],
    pricingTiers: [{"category":"Economy (2*)","price":349},{"category":"Superior (3*)","price":399},{"category":"First Class (4*)","price":499}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 96,
    startCity: "Ho Chi Minh City",
    destinations: ["Ho Chi Minh City", "Cu Chi", "Mekong Delta"],
    activities: ["historical", "cultural", "boat-tour"],
  },
  {
    id: "best-south-vietnam-5d",
    slug: "best-of-south-vietnam-5-days",
    name: "Best of South Vietnam: Saigon, Cu Chi & Mekong",
    category: "multi-day",
    location: "Southern Vietnam",
    duration: "5 days, 4 nights",
    price: 479,
    description: "Comprehensive Southern Vietnam tour with extra time to explore each destination at a relaxed pace.",
    fullDescription: `
      <h3>Complete Southern Vietnam</h3>
      <p>Take your time exploring the vibrant south with visits to historic sites, floating markets, and tropical fruit gardens.</p>
    `,
    highlights: ["Saigon Heritage", "Cu Chi Tunnels", "Mekong Delta", "Floating Markets", "Coconut Village"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Ho Chi Minh City",
        description: "Welcome to Saigon",
        activities: [
          "Arrival at Tan Son Nhat Airport",
          "Private transfer to hotel",
          "Check-in and rest",
          "4:00 PM - Orientation walk",
          "Evening: Explore Bui Vien backpacker street"
        ],
        meals: []
      },
      {
        day: 2,
        title: "Ho Chi Minh City Discovery",
        description: "City highlights",
        activities: [
          "8:30 AM - War Remnants Museum",
          "10:00 AM - Reunification Palace",
          "11:30 AM - Notre Dame Cathedral",
          "Central Post Office",
          "12:30 PM - Lunch at local restaurant",
          "2:00 PM - Jade Emperor Pagoda",
          "3:30 PM - Chinatown (Cho Lon)",
          "Binh Tay Market",
          "Evening: Dinner at local restaurant"
        ],
        meals: ["Breakfast"]
      },
      {
        day: 3,
        title: "Cu Chi Tunnels",
        description: "Vietnam War history",
        activities: [
          "8:00 AM - Transfer to Cu Chi",
          "9:30 AM - Arrive Cu Chi Tunnels",
          "Explore the tunnel system",
          "Learn about guerrilla warfare",
          "Optional: Tunnel crawl experience",
          "Optional: AK-47 shooting range",
          "12:00 PM - Lunch at Cu Chi",
          "2:00 PM - Return to Saigon",
          "Evening: Free time"
        ],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 4,
        title: "Mekong Delta Overnight",
        description: "River life immersion",
        activities: [
          "7:30 AM - Depart for Mekong Delta",
          "10:00 AM - Arrive Ben Tre",
          "10:30 AM - Boat trip through canals",
          "11:30 AM - Coconut candy workshop",
          "12:30 PM - Lunch at local home",
          "2:00 PM - Bicycle through villages",
          "4:00 PM - Transfer to Can Tho",
          "5:30 PM - Check-in riverside hotel",
          "Evening: Can Tho waterfront walk"
        ],
        meals: ["Breakfast", "Lunch"]
      },
      {
        day: 5,
        title: "Floating Market & Return",
        description: "Sunrise market experience",
        activities: [
          "5:30 AM - Early wake-up",
          "6:00 AM - Boat to Cai Rang Floating Market",
          "Experience Vietnam's largest floating market",
          "Buy fresh fruits from vendors",
          "8:00 AM - Breakfast on board",
          "9:00 AM - Return and check-out",
          "10:00 AM - Transfer to Ho Chi Minh City",
          "2:00 PM - Arrive Saigon",
          "Free time until departure",
          "Transfer to airport"
        ],
        meals: ["Breakfast"]
      }
    ],
    included: ["4 nights hotel", "Breakfast", "Guide", "Transfers", "Entrance fees"],
    excluded: ["Flights", "Lunch/dinner", "Tips"],
    imageUrl: "/tours/best-south-vietnam-5d.jpg",
    rating: 9.2,
    reviewCount: 198,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/best-of-south-vietnam-5-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/678f59b34fd96.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c43b47c30.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c43b47c34.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c43b47c33.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c3d22a8d9.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c3d22a8d5.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c3d22a8d8.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c459ec1ad.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c459ec1af.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/best-of-south-vietnam-5-days-64b5f1ef3149a.png","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65ddb07b69941.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65ddb07b69944.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65ddb07b69942.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65ddb07b69946.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65ddb07b69945.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65ddb07b69947.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f9cbd74e1f7.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f4d8c946295.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f4ea7fa9816.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f73a39b937c.jpg"],
    pricingTiers: [{"category":"Superior (3*)","price":559},{"category":"First Class (4*)","price":659},{"category":"Deluxe (5*)","price":759}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 120,
    startCity: "Ho Chi Minh City",
    destinations: ["Ho Chi Minh City", "Cu Chi", "Mekong Delta", "Can Tho"],
    activities: ["historical", "cultural", "boat-tour"],
  },
  {
    id: "hanoi-halong-mai-chau-4d",
    slug: "hanoi-halong-bay-mai-chau-4-days",
    name: "Hanoi, Halong Bay, Mai Chau",
    category: "multi-day",
    location: "Northern Vietnam",
    duration: "4 days, 3 nights",
    price: 289,
    description: "Perfect for time-limited travelers wanting Hanoi's charm, Halong Bay's beauty, and Mai Chau's mountain culture.",
    fullDescription: `
      <h3>Northern Vietnam Highlights in 4 Days</h3>
      <p>A well-balanced journey covering the must-see destinations of Northern Vietnam in just 4 days.</p>
    `,
    highlights: ["Hanoi Old Quarter", "Halong Bay Cruise", "Mai Chau Valley", "Thai Villages", "Stilt Houses"],
    itinerary: [
      {
        day: 1,
        title: "Hanoi to Mai Chau",
        description: "Mountain valley escape",
        activities: [
          "8:00 AM - Hotel pickup in Hanoi",
          "Drive through scenic countryside",
          "11:30 AM - Viewpoint overlooking Mai Chau Valley",
          "12:00 PM - Arrive Mai Chau, check-in stilt house",
          "12:30 PM - Lunch at homestay",
          "2:30 PM - Cycling through rice paddies",
          "4:00 PM - Visit Lac Village (White Thai)",
          "5:30 PM - Return to homestay",
          "7:00 PM - Dinner with local family",
          "Evening: Traditional music and dance"
        ],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 2,
        title: "Mai Chau to Halong Bay",
        description: "Valley to sea",
        activities: [
          "7:00 AM - Breakfast at homestay",
          "8:00 AM - Depart for Halong Bay",
          "Scenic drive through countryside",
          "12:00 PM - Arrive Halong, board cruise",
          "12:30 PM - Lunch while cruising",
          "2:30 PM - Explore limestone karsts",
          "4:00 PM - Kayaking at Luon Cave",
          "6:00 PM - Sunset on deck",
          "7:30 PM - Seafood dinner on board"
        ],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 3,
        title: "Halong Bay to Hanoi",
        description: "Morning exploration",
        activities: [
          "6:30 AM - Optional: Tai Chi on deck",
          "7:30 AM - Breakfast",
          "8:30 AM - Visit Sung Sot Cave",
          "Explore stalactites and stalagmites",
          "10:00 AM - Check-out, brunch",
          "11:00 AM - Cruise back to harbor",
          "12:00 PM - Disembark, transfer to Hanoi",
          "4:00 PM - Arrive Hanoi hotel",
          "Evening: Old Quarter exploration"
        ],
        meals: ["Breakfast", "Brunch"]
      },
      {
        day: 4,
        title: "Hanoi & Departure",
        description: "Capital city farewell",
        activities: [
          "8:00 AM - Breakfast at hotel",
          "9:00 AM - Hanoi city tour (optional)",
          "Ho Chi Minh Mausoleum (outside)",
          "Temple of Literature",
          "11:00 AM - Free time for shopping",
          "Transfer to airport",
          "Departure"
        ],
        meals: ["Breakfast"]
      }
    ],
    included: ["3 nights hotels/cruise", "Breakfast", "Halong cruise", "Guide", "Transfers"],
    excluded: ["Flights", "Lunch/dinner", "Tips"],
    imageUrl: "/tours/hanoi-halong-mai-chau-4d.jpg",
    rating: 9.2,
    reviewCount: 178,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/hanoi-halong-bay-mai-chau-4-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667bcb681f2a3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e13d5976366.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e13d5976364.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e13d5976367.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e13d5976365.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e13d5976363.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e13d5976361.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665ebdb84afcf.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e13d5976362.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e13d597635c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e13d597635f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665ebda80982b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/hanoi,-halong-bay,-mai-chau-4-days-649d370cbec44.png","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65e13d5976364.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65e13d5976365.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65e13d5976361.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65e13d5976362.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65e13d597635f.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f493235432d.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f6176a66e95.jpg"],
    pricingTiers: [{"category":"Economy  2*+ Hotels","price":289},{"category":"Superior 3* Hotels","price":319},{"category":"First Class 4* Hotels","price":399}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 96,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Halong Bay", "Mai Chau"],
    activities: ["cruise", "cultural", "sightseeing"],
  },

  // DAY TOURS - HO CHI MINH CITY
  {
    id: "hcmc-city-tour-full-day",
    slug: "ho-chi-minh-city-tour-full-day",
    name: "Ho Chi Minh City Tour Full Day",
    category: "day-trip",
    location: "Ho Chi Minh City",
    duration: "1 day",
    price: 75,
    description: "Comprehensive full-day city tour covering Reunification Palace, War Remnants Museum, Chinatown, and Ben Thanh Market.",
    fullDescription: `
      <h3>Discover Saigon</h3>
      <p>Explore the highlights of Vietnam's largest city from historical landmarks to vibrant markets.</p>
    `,
    highlights: ["Reunification Palace", "War Remnants Museum", "Thien Hau Pagoda", "Ben Thanh Market", "Notre Dame"],
    itinerary: [
      {
        day: 1,
        title: "Ho Chi Minh City Full Day Tour",
        description: "Comprehensive city exploration",
        activities: [
          "8:30 AM - Hotel pickup",
          "9:00 AM - Reunification Palace",
          "Former Presidential Palace",
          "Learn about Vietnam War end",
          "10:30 AM - War Remnants Museum",
          "Vietnam War history and exhibits",
          "12:00 PM - Notre Dame Cathedral (outside)",
          "Central Post Office",
          "12:30 PM - Lunch at local restaurant",
          "2:00 PM - Jade Emperor Pagoda",
          "3:00 PM - Chinatown (Cho Lon)",
          "Thien Hau Pagoda",
          "4:00 PM - Binh Tay Market",
          "5:00 PM - Ben Thanh Market",
          "6:00 PM - Hotel drop-off"
        ],
        meals: ["Lunch"]
      }
    ],
    included: ["Guide", "Entrance fees", "Lunch", "Transfers"],
    excluded: ["Tips", "Shopping"],
    imageUrl: "/tours/hcmc-city-tour-full-day.jpg",
    rating: 9.0,
    reviewCount: 234,
    affiliateUrl: "https://www.bestpricetravel.com/ho-chi-minh-city-tours/ho-chi-minh-city-tour-full-day.html",
    durationHours: 8,
    startCity: "Ho Chi Minh City",
    destinations: ["Ho Chi Minh City"],
    activities: ["city-tour", "historical", "cultural"],
  },
  {
    id: "long-tan-battlefield-day",
    slug: "long-tan-nui-dat-battlefield-full-day",
    name: "Long Tan - Nui Dat Battlefield Tour",
    category: "day-trip",
    location: "Ba Ria - Vung Tau",
    duration: "1 day",
    price: 99,
    description: "In-depth exploration of Vietnam War history at the ANZAC forces headquarters and Long Tan battlefield.",
    fullDescription: `
      <h3>Vietnam War History</h3>
      <p>Visit the significant Battle of Long Tan site and the Australian ANZAC forces headquarters at Nui Dat.</p>
    `,
    highlights: ["Nui Dat Task Force", "Long Tan Cross", "War History", "ANZAC Heritage", "Rubber Plantation"],
    itinerary: [
      {
        day: 1,
        title: "Long Tan Battlefield Tour",
        description: "ANZAC Vietnam War history",
        activities: [
          "7:30 AM - Hotel pickup in Ho Chi Minh City",
          "Drive through rubber plantation region",
          "9:30 AM - Arrive Ba Ria - Vung Tau Province",
          "10:00 AM - Nui Dat - former Australian Task Force Base",
          "Learn about ANZAC operations",
          "Visit SAS Hill",
          "11:30 AM - Long Tan Battlefield site",
          "12:00 PM - Long Tan Cross Memorial",
          "Pay respects to fallen soldiers",
          "Learn about the Battle of Long Tan (August 18, 1966)",
          "1:00 PM - Lunch at local restaurant",
          "2:30 PM - Visit local war museum",
          "Artifacts and photographs",
          "3:30 PM - Drive through rubber plantations",
          "5:30 PM - Return to Ho Chi Minh City",
          "6:30 PM - Hotel drop-off"
        ],
        meals: ["Lunch"]
      }
    ],
    included: ["Guide", "Entrance fees", "Lunch", "Transfers"],
    excluded: ["Tips"],
    imageUrl: "/tours/long-tan-battlefield-day.jpg",
    rating: 9.1,
    reviewCount: 89,
    affiliateUrl: "https://www.bestpricetravel.com/ho-chi-minh-city-tours/long-tan-nui-dat-battle-field-full-day-tour.html",
    durationHours: 10,
    startCity: "Ho Chi Minh City",
    destinations: ["Long Tan", "Nui Dat"],
    activities: ["historical", "educational"],
  },
  {
    id: "hcmc-vespa-half-day",
    slug: "ho-chi-minh-vespa-half-day",
    name: "Ho Chi Minh Vespa Half-Day",
    category: "day-trip",
    location: "Ho Chi Minh City",
    duration: "Half day",
    price: 79,
    description: "Explore Saigon's backstreets and iconic landmarks on a vintage Vespa scooter with local guides.",
    fullDescription: `
      <h3>Vespa Saigon Adventure</h3>
      <p>Zip through Saigon's vibrant streets on a classic Vespa, visiting landmarks and hidden gems.</p>
    `,
    highlights: ["Vespa Ride", "Central Post Office", "Reunification Palace", "Local Districts", "Street Food"],
    itinerary: [
      {
        day: 1,
        title: "Saigon Vespa Adventure",
        description: "Explore Saigon on classic scooters",
        activities: [
          "8:00 AM or 2:00 PM - Hotel pickup by Vespa",
          "Meet your driver at a vintage Vespa",
          "Ride through District 1 streets",
          "First stop: Central Post Office & Notre Dame Cathedral",
          "Second stop: Reunification Palace (photo stop)",
          "Third stop: Hidden coffee shop in alley",
          "Try authentic Vietnamese coffee",
          "Fourth stop: Chinatown (Cho Lon)",
          "Navigate through narrow alleys",
          "Fifth stop: Local market experience",
          "Try street food snacks",
          "Final stop: Rooftop bar for views",
          "Fruit smoothie included",
          "12:00 PM or 6:00 PM - Hotel drop-off"
        ],
        meals: []
      }
    ],
    included: ["Vespa with driver", "Guide", "Entrance fees", "Snacks"],
    excluded: ["Tips", "Meals"],
    imageUrl: "/tours/hcmc-vespa-half-day.jpg",
    rating: 9.3,
    reviewCount: 156,
    affiliateUrl: "https://www.bestpricetravel.com/ho-chi-minh-city-tours/ho-chi-minh-vespa-half-day.html",
    durationHours: 4,
    startCity: "Ho Chi Minh City",
    destinations: ["Ho Chi Minh City"],
    activities: ["vespa-tour", "cultural", "food-tour"],
  },

  // HALONG BAY DAY TOURS
  {
    id: "private-halong-day-trip",
    slug: "private-halong-bay-day-trip-from-hanoi",
    name: "Private Halong Bay Day Trip",
    category: "day-trip",
    location: "Halong Bay",
    duration: "1 day",
    price: 195,
    description: "Private day cruise experience with kayaking, cave visits, and beautiful island scenery in Halong Bay.",
    fullDescription: `
      <h3>Private Halong Bay Experience</h3>
      <p>Experience the natural beauty of Halong Bay with private service, kayaking, and visits to stunning caves and islands.</p>
    `,
    highlights: ["Private Cruise", "Kayaking", "Cave Visits", "Fishing Villages", "Limestone Karsts"],
    itinerary: [
      {
        day: 1,
        title: "Private Halong Bay Experience",
        description: "UNESCO World Heritage in one day",
        activities: [
          "6:30 AM - Hotel pickup in Hanoi Old Quarter",
          "Drive through Red River Delta",
          "8:30 AM - Rest stop and coffee",
          "10:30 AM - Arrive Halong Bay cruise pier",
          "11:00 AM - Board private cruise boat",
          "Welcome drink as you cruise",
          "11:30 AM - Cruise through limestone karsts",
          "12:00 PM - Seafood lunch on board",
          "Fresh local seafood and Vietnamese dishes",
          "1:30 PM - Arrive Sung Sot Cave",
          "Explore one of the largest caves in Halong",
          "Stunning stalactite formations",
          "2:30 PM - Kayaking activity",
          "Paddle through hidden lagoons",
          "Explore Luon Cave by kayak",
          "3:30 PM - Visit floating fishing village",
          "See local fishermen's way of life",
          "4:30 PM - Swim stop at Ti Top Beach",
          "Optional: Climb to viewpoint",
          "5:30 PM - Cruise back to harbor",
          "6:00 PM - Disembark and transfer to Hanoi",
          "9:00 PM - Hotel drop-off in Hanoi"
        ],
        meals: ["Lunch"]
      }
    ],
    included: ["Private boat", "Lunch", "Kayaking", "Guide", "Entrance fees", "Transfers"],
    excluded: ["Tips", "Beverages"],
    imageUrl: "/tours/private-halong-day-trip.jpg",
    rating: 9.4,
    reviewCount: 187,
    affiliateUrl: "https://www.bestpricetravel.com/halong-bay-tours/private-halong-bay-day-trip-from-hanoi.html",
    durationHours: 13,
    startCity: "Hanoi",
    destinations: ["Halong Bay"],
    activities: ["cruise", "kayaking", "nature"],
  },

  // ============================================
  // BESTPRICETRAVEL TOURS - BATCH 3 (30 tours)
  // Partner: bestpricetravel.com
  // ============================================

  // ADVENTURE & ACTIVE TOURS
  {
    id: "vietnam-biking-trekking-snorkeling-12d",
    slug: "vietnam-adventure-biking-trekking-snorkeling-12-days",
    name: "Vietnam Adventure: Biking, Trekking & Snorkeling",
    category: "multi-day",
    location: "Vietnam",
    duration: "12 days, 11 nights",
    price: 1189,
    description: "Active adventure through Vietnam with biking, trekking in Sapa, and snorkeling in Nha Trang.",
    fullDescription: `
      <h3>Vietnam Active Adventure</h3>
      <p>An action-packed journey combining cycling through villages, trekking rice terraces, and snorkeling in crystal waters.</p>
    `,
    highlights: ["Cycling Tours", "Sapa Trekking", "Nha Trang Snorkeling", "Halong Bay", "Hoi An"],
    itinerary: [
      { day: 1, title: "Arrival Hanoi", description: "Welcome to Vietnam", activities: ["Airport pickup", "Hotel check-in", "Evening Old Quarter walk"], meals: [] },
      { day: 2, title: "Hanoi Cycling", description: "Bike through the capital", activities: ["Cycling tour of Hanoi", "West Lake", "Temple of Literature", "Train Street"], meals: ["Breakfast"] },
      { day: 3, title: "Hanoi - Sapa", description: "Journey to the mountains", activities: ["Transfer to Sapa", "Fansipan cable car or Cat Cat village", "Sapa town exploration"], meals: ["Breakfast"] },
      { day: 4, title: "Sapa Trekking", description: "Rice terraces adventure", activities: ["Trek to Lao Chai", "Ta Van village", "Muong Hoa Valley", "Homestay experience"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 5, title: "Sapa - Halong Bay", description: "Mountains to sea", activities: ["Morning trekking", "Transfer to Halong", "Board cruise", "Kayaking"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 6, title: "Halong - Hanoi - Flight", description: "Cave exploration", activities: ["Sunrise", "Cave visit", "Transfer to Hanoi", "Flight to Da Nang"], meals: ["Breakfast", "Brunch"] },
      { day: 7, title: "Hoi An Cycling", description: "Countryside by bike", activities: ["Cycling to Tra Que village", "Cooking class", "Ancient Town walk"], meals: ["Breakfast", "Lunch"] },
      { day: 8, title: "Hoi An - Nha Trang", description: "Coastal journey", activities: ["Flight to Nha Trang", "Beach relaxation", "Seafood dinner"], meals: ["Breakfast"] },
      { day: 9, title: "Nha Trang Snorkeling", description: "Island hopping", activities: ["Boat to Hon Mun", "Snorkeling coral reefs", "Beach BBQ", "Swimming"], meals: ["Breakfast", "Lunch"] },
      { day: 10, title: "Nha Trang - Saigon", description: "To the south", activities: ["Morning beach", "Flight to Saigon", "City exploration"], meals: ["Breakfast"] },
      { day: 11, title: "Mekong Delta Cycling", description: "Delta by bike", activities: ["Cycling through villages", "Boat rides", "Local markets", "Fruit tasting"], meals: ["Breakfast", "Lunch"] },
      { day: 12, title: "Departure", description: "Farewell Vietnam", activities: ["Breakfast", "Airport transfer", "Departure"], meals: ["Breakfast"] }
    ],
    included: ["11 nights hotels", "Domestic flights", "Bicycle", "Cruise", "Guide", "Meals as specified"],
    excluded: ["International flights", "Tips", "Personal expenses"],
    imageUrl: "/tours/vietnam-biking-trekking-snorkeling-12d.jpg",
    rating: 9.6,
    reviewCount: 67,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/vietnam-biking-trekking-snorkeling-12-days.html",
    durationHours: 288,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Sapa", "Halong Bay", "Hoi An", "Nha Trang", "Ho Chi Minh City", "Mekong Delta"],
    activities: ["cycling", "trekking", "snorkeling", "adventure"],
  },
  {
    id: "vietnam-on-wheels-16d",
    slug: "vietnam-adventure-bike-north-south-16-days",
    name: "Vietnam on Wheels: North to South by Bike",
    category: "multi-day",
    location: "Vietnam",
    duration: "16 days, 15 nights",
    price: 1899,
    description: "Epic 16-day cycling journey from Hanoi to Saigon through the entire length of Vietnam.",
    fullDescription: `
      <h3>Ultimate Vietnam Cycling Adventure</h3>
      <p>Cycle the entire length of Vietnam from north to south, experiencing diverse landscapes, cultures, and cuisines along the way.</p>
    `,
    highlights: ["Hanoi to Saigon", "Hai Van Pass", "Central Highlands", "Mekong Delta", "Support Vehicle"],
    itinerary: [
      { day: 1, title: "Arrival Hanoi", description: "Welcome & bike fitting", activities: ["Airport pickup", "Bike fitting", "Briefing"], meals: [] },
      { day: 2, title: "Hanoi - Ninh Binh", description: "First cycling day (100km)", activities: ["Cycle through Red River Delta", "Rural villages", "Arrive Ninh Binh"], meals: ["Breakfast", "Lunch"] },
      { day: 3, title: "Ninh Binh Exploration", description: "Cycling day (50km)", activities: ["Tam Coc boat ride", "Cycling to temples", "Trang An"], meals: ["Breakfast"] },
      { day: 4, title: "Ninh Binh - Phong Nha", description: "Transfer day", activities: ["Long transfer", "Phong Nha Cave", "Relax"], meals: ["Breakfast"] },
      { day: 5, title: "Phong Nha - Hue", description: "Cycling day (80km)", activities: ["Ride to Hue", "DMZ area", "Arrive Imperial City"], meals: ["Breakfast", "Lunch"] },
      { day: 6, title: "Hue Exploration", description: "City cycling (40km)", activities: ["Imperial Citadel", "Tombs by bike", "Thien Mu Pagoda"], meals: ["Breakfast"] },
      { day: 7, title: "Hai Van Pass", description: "Legendary ride (80km)", activities: ["Climb Hai Van Pass", "Stunning views", "Descend to Da Nang"], meals: ["Breakfast", "Lunch"] },
      { day: 8, title: "Da Nang - Hoi An", description: "Easy ride (40km)", activities: ["My Khe Beach", "Marble Mountains", "Arrive Hoi An"], meals: ["Breakfast"] },
      { day: 9, title: "Hoi An Rest Day", description: "Free day", activities: ["Optional cycling", "Tailor visits", "Ancient Town"], meals: ["Breakfast"] },
      { day: 10, title: "Hoi An - Quy Nhon", description: "Coastal route", activities: ["Scenic coastal cycling", "Beach stops", "Arrive Quy Nhon"], meals: ["Breakfast", "Lunch"] },
      { day: 11, title: "Quy Nhon - Nha Trang", description: "Cycling day", activities: ["Coastal road", "Fishing villages", "Arrive Nha Trang"], meals: ["Breakfast"] },
      { day: 12, title: "Nha Trang Rest", description: "Beach day", activities: ["Rest day", "Optional snorkeling", "Beach relaxation"], meals: ["Breakfast"] },
      { day: 13, title: "Nha Trang - Dalat", description: "Mountain climb", activities: ["Challenging climb", "Central Highlands", "Cool Dalat"], meals: ["Breakfast", "Lunch"] },
      { day: 14, title: "Dalat - Saigon", description: "Final cycling", activities: ["Descend from highlands", "Countryside riding", "Arrive Saigon"], meals: ["Breakfast"] },
      { day: 15, title: "Saigon City", description: "Victory lap", activities: ["City cycling tour", "Cu Chi optional", "Celebration dinner"], meals: ["Breakfast", "Dinner"] },
      { day: 16, title: "Departure", description: "Farewell", activities: ["Breakfast", "Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["15 nights hotels", "Quality bicycle", "Support vehicle", "Mechanic", "Guide", "Most meals"],
    excluded: ["Flights", "Tips", "Beverages"],
    imageUrl: "/tours/vietnam-on-wheels-16d.jpg",
    rating: 9.4,
    reviewCount: 45,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/vietnam-on-wheels-16-days.html",
    durationHours: 384,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Ninh Binh", "Phong Nha", "Hue", "Da Nang", "Hoi An", "Nha Trang", "Da Lat", "Ho Chi Minh City"],
    activities: ["cycling", "adventure", "beach"],
  },
  {
    id: "vietnam-mix-transport-12d",
    slug: "vietnam-journey-land-rail-water-12-days",
    name: "Ultimate Vietnam: By Land, Rail & Water",
    category: "multi-day",
    location: "Vietnam",
    duration: "12 days, 11 nights",
    price: 1379,
    description: "Experience Vietnam by multiple transport modes - train, boat, bicycle, and car for a unique perspective.",
    fullDescription: `
      <h3>Multi-Modal Vietnam Adventure</h3>
      <p>Travel Vietnam the way locals do - by overnight train, traditional boats, bicycles, and scenic drives.</p>
    `,
    highlights: ["Overnight Train", "Halong Cruise", "Mekong Boat", "Cycling", "Scenic Drives"],
    itinerary: [
      { day: 1, title: "Arrival Hanoi", description: "Welcome", activities: ["Airport pickup", "City walk", "Water puppets"], meals: [] },
      { day: 2, title: "Hanoi - Halong", description: "By road & water", activities: ["Drive to Halong", "Board cruise", "Kayaking"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Halong - Hanoi - Train", description: "Cave & train", activities: ["Cave visit", "Return Hanoi", "Board overnight train to Hue"], meals: ["Breakfast", "Brunch"] },
      { day: 4, title: "Arrive Hue", description: "Imperial City", activities: ["Arrive Hue", "Dragon boat on Perfume River", "Imperial Citadel"], meals: ["Breakfast"] },
      { day: 5, title: "Hue - Hoi An", description: "Hai Van by car", activities: ["Drive Hai Van Pass", "Stop at Lang Co", "Arrive Hoi An"], meals: ["Breakfast"] },
      { day: 6, title: "Hoi An Cycling", description: "By bicycle", activities: ["Cycle to villages", "Basket boat ride", "Ancient Town"], meals: ["Breakfast", "Lunch"] },
      { day: 7, title: "Hoi An - Da Nang - Flight", description: "To the south", activities: ["Morning free", "Flight to Saigon", "Evening walk"], meals: ["Breakfast"] },
      { day: 8, title: "Mekong by Boat", description: "Delta waterways", activities: ["Speedboat to Mekong", "Sampan rides", "Floating market area"], meals: ["Breakfast", "Lunch"] },
      { day: 9, title: "Mekong Cycling", description: "Delta by bike", activities: ["Cycling villages", "Fruit orchards", "Return Saigon"], meals: ["Breakfast", "Lunch"] },
      { day: 10, title: "Cu Chi by Road", description: "History trip", activities: ["Drive to Cu Chi", "Tunnel exploration", "Return city"], meals: ["Breakfast", "Lunch"] },
      { day: 11, title: "Saigon Free", description: "Explore freely", activities: ["Free day", "Shopping", "Optional tours"], meals: ["Breakfast"] },
      { day: 12, title: "Departure", description: "Farewell", activities: ["Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["10 nights hotels", "1 night train", "Cruise", "Flights", "All transport", "Guide"],
    excluded: ["Tips", "Personal expenses"],
    imageUrl: "/tours/vietnam-mix-transport-12d.jpg",
    rating: 9.4,
    reviewCount: 56,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/vietnam-mix-transportation-12-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667e656a10244.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660fae70263b4.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660fae70263b3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667cd83330c46.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660fae70263b5.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667cd8488b588.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667cd85c869ad.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667cd86e80f65.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660fae70263b6.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667cd880da460.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660fae70263b7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667cd89fc7c19.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660fae70263b8.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660fae70263aa.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660fae70263b9.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660fae70263ac.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660fae70263ad.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660fae70263ae.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667cd8af1b66b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660fae70263af.jpg"],
    pricingTiers: [{"category":"Superior (3*)","price":1459},{"category":"First Class (4*)","price":1699}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 288,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Halong Bay", "Hue", "Hoi An", "Ho Chi Minh City", "Mekong Delta", "Cu Chi"],
    activities: ["cruise", "cycling", "cultural", "adventure"],
  },
  {
    id: "vietnam-easy-rider-16d",
    slug: "vietnam-easy-rider-motorbike-16-days",
    name: "Vietnam Easy Rider: North to South",
    category: "multi-day",
    location: "Vietnam",
    duration: "16 days, 15 nights",
    price: 2379,
    description: "Iconic motorbike journey through Vietnam with experienced Easy Rider guides on the back roads.",
    fullDescription: `
      <h3>Legendary Easy Rider Experience</h3>
      <p>Ride pillion with Vietnam's famous Easy Riders through stunning mountain passes, coastal roads, and highland trails.</p>
    `,
    highlights: ["Easy Rider Guides", "Back Roads", "Hai Van Pass", "Central Highlands", "Local Homestays"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Meet your rider", activities: ["Pickup", "Meet Easy Rider", "Briefing", "City tour by bike"], meals: [] },
      { day: 2, title: "Hanoi - Mai Chau", description: "First ride", activities: ["Ride to Mai Chau", "Mountain roads", "Thai village homestay"], meals: ["Breakfast", "Dinner"] },
      { day: 3, title: "Mai Chau - Ninh Binh", description: "Valley roads", activities: ["Scenic ride", "Tam Coc visit", "Overnight Ninh Binh"], meals: ["Breakfast"] },
      { day: 4, title: "Ninh Binh - Phong Nha", description: "Long ride day", activities: ["Coastal route", "Vinh area", "Arrive Phong Nha"], meals: ["Breakfast", "Lunch"] },
      { day: 5, title: "Phong Nha", description: "Cave day", activities: ["Paradise Cave", "Phong Nha Cave", "Dark Cave optional"], meals: ["Breakfast"] },
      { day: 6, title: "Phong Nha - Hue", description: "To Imperial City", activities: ["Ho Chi Minh Trail", "DMZ area", "Arrive Hue"], meals: ["Breakfast"] },
      { day: 7, title: "Hue", description: "City exploration", activities: ["Citadel by bike", "Tombs", "Thien Mu Pagoda"], meals: ["Breakfast"] },
      { day: 8, title: "Hai Van Pass", description: "Legendary ride", activities: ["Epic Hai Van Pass", "Photo stops", "Da Nang", "Hoi An"], meals: ["Breakfast"] },
      { day: 9, title: "Hoi An", description: "Rest day", activities: ["Free day", "Optional bike rides", "Ancient Town"], meals: ["Breakfast"] },
      { day: 10, title: "Hoi An - Kon Tum", description: "To highlands", activities: ["Mountain roads", "Ethnic villages", "Arrive Kon Tum"], meals: ["Breakfast", "Lunch"] },
      { day: 11, title: "Kon Tum - Buon Ma Thuot", description: "Coffee country", activities: ["Highland riding", "Coffee plantation", "Waterfall visit"], meals: ["Breakfast"] },
      { day: 12, title: "Buon Ma Thuot - Dalat", description: "Cool mountains", activities: ["Scenic highlands", "Arrive Dalat", "City exploration"], meals: ["Breakfast"] },
      { day: 13, title: "Dalat", description: "Explore Dalat", activities: ["Waterfalls", "Crazy House", "Night market"], meals: ["Breakfast"] },
      { day: 14, title: "Dalat - Mui Ne", description: "To the coast", activities: ["Mountain descent", "Coastal road", "Beach arrival"], meals: ["Breakfast"] },
      { day: 15, title: "Mui Ne - Saigon", description: "Final ride", activities: ["Morning dunes", "Ride to Saigon", "Farewell dinner"], meals: ["Breakfast", "Dinner"] },
      { day: 16, title: "Departure", description: "Farewell", activities: ["Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["15 nights hotels/homestays", "Easy Rider guide", "Motorbike", "Fuel", "Helmet", "Meals as specified"],
    excluded: ["Flights", "Tips", "Personal expenses"],
    imageUrl: "/tours/vietnam-easy-rider-16d.jpg",
    rating: 9.6,
    reviewCount: 34,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/vietnam-easy-rider-16-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667bea6ac96bb.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660f81e2c0251.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667b8605b3227.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660f81e2c0252.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660f81e2c0253.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660f81e2c0254.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667b86226ec77.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667b863d6b99f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667b864b7d380.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660f81e2c0255.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660f81e2c0256.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667b865948557.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6617442f9c007.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6617442f9c00a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660f81e2c0257.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667b866a92f1f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660f81e2c0258.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667b8680871dc.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667b86cbe1cb3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660f81e2c0249.jpg"],
    pricingTiers: [{"category":"Superior (3*)","price":2379},{"category":"First Class (4*)","price":2589}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 384,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Mai Chau", "Ninh Binh", "Phong Nha", "Hue", "Hoi An", "Da Lat", "Ho Chi Minh City"],
    activities: ["motorbike", "adventure", "cultural"],
  },

  // FAMILY TOURS
  {
    id: "vietnam-family-kids-10d",
    slug: "north-central-vietnam-family-kids-10-days",
    name: "North & Central Vietnam Family Adventure",
    category: "multi-day",
    location: "Northern & Central Vietnam",
    duration: "10 days, 9 nights",
    price: 1059,
    description: "Family-friendly adventure through North and Central Vietnam with activities designed for kids and parents alike.",
    fullDescription: `
      <h3>Vietnam Family Fun</h3>
      <p>A perfectly paced family adventure with kid-friendly activities, comfortable hotels, and unforgettable experiences.</p>
    `,
    highlights: ["Kid-Friendly Activities", "Cooking Classes", "Water Puppets", "Beach Time", "Cycling"],
    itinerary: [
      { day: 1, title: "Hanoi Arrival", description: "Family welcome", activities: ["Airport pickup", "Hotel check-in", "Hoan Kiem Lake walk"], meals: [] },
      { day: 2, title: "Hanoi Discovery", description: "Capital fun", activities: ["Temple of Literature", "Water puppet show", "Cyclo ride", "Ice cream treat"], meals: ["Breakfast"] },
      { day: 3, title: "Hanoi - Halong", description: "Cruise adventure", activities: ["Transfer to Halong", "Board family cruise", "Kayaking", "Beach time"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Halong - Hanoi", description: "Cave exploration", activities: ["Swimming", "Cave visit", "Return to Hanoi"], meals: ["Breakfast", "Brunch"] },
      { day: 5, title: "Hanoi - Hoi An", description: "Flight south", activities: ["Morning flight", "Arrive Hoi An", "Beach resort check-in", "Pool time"], meals: ["Breakfast"] },
      { day: 6, title: "Hoi An Fun", description: "Ancient town", activities: ["Lantern making class", "Boat ride", "Night market exploration"], meals: ["Breakfast"] },
      { day: 7, title: "Hoi An Cooking", description: "Family cooking", activities: ["Market visit", "Cooking class for families", "Beach afternoon"], meals: ["Breakfast", "Lunch"] },
      { day: 8, title: "Hoi An Cycling", description: "Countryside ride", activities: ["Family cycling tour", "Buffalo rides", "Basket boat", "Swimming"], meals: ["Breakfast", "Lunch"] },
      { day: 9, title: "Hoi An Free Day", description: "Beach & relax", activities: ["Beach day", "Optional: Ba Na Hills", "Farewell dinner"], meals: ["Breakfast"] },
      { day: 10, title: "Departure", description: "Goodbye Vietnam", activities: ["Airport transfer", "Departure"], meals: ["Breakfast"] }
    ],
    included: ["9 nights family rooms", "Domestic flight", "Cruise", "All activities", "Guide", "Meals as specified"],
    excluded: ["International flights", "Tips", "Personal expenses"],
    imageUrl: "/tours/vietnam-family-kids-10d.jpg",
    rating: 9.5,
    reviewCount: 89,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/north-center-vietnam-easy-adventure-for-family-with-kids-10-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/670ccee11bb2e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64c77f7be30be.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/664c577e9e7b0.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/664c577e9e7b3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64c77f7be30c1.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d3c45e3387.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d3c70e249d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d3c811f79f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64c77e95a537c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/664c577e9e7b5.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d3c9396b1b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/664c578fd4216.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64c77e95a5380.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d3ca456564.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64c77e95a537e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/664c578fd4219.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/664c578fd421a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64c87c9fbb684.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d3cba25b87.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64c77e95a5381.jpg"],
    pricingTiers: [{"category":"Superior (3* Hotels)","price":1059},{"category":"First Class (4* Hotels)","price":1219},{"category":"Deluxe (5* hotels)","price":1619}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 240,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Halong Bay", "Hoi An"],
    activities: ["cultural", "cruise", "cycling", "beach"],
  },
  {
    id: "vietnam-family-classic-8d",
    slug: "classic-vietnam-family-tour-kids-8-days",
    name: "Classic Vietnam Family Tour",
    category: "multi-day",
    location: "Vietnam",
    duration: "8 days, 7 nights",
    price: 929,
    description: "Perfect 8-day family adventure covering Hanoi, Halong Bay, and Hoi An with kid-friendly activities.",
    fullDescription: `
      <h3>Family Vietnam Essentials</h3>
      <p>A well-paced family tour hitting the highlights with plenty of engaging activities for children of all ages.</p>
    `,
    highlights: ["Water Puppets", "Halong Cruise", "Lantern Making", "Cooking Class", "Beach Resort"],
    itinerary: [
      { day: 1, title: "Hanoi Arrival", description: "Welcome", activities: ["Airport pickup", "Hotel check-in", "Evening walk"], meals: [] },
      { day: 2, title: "Hanoi Exploration", description: "City discovery", activities: ["Ho Chi Minh Mausoleum", "Temple of Literature", "Water puppets", "Old Quarter"], meals: ["Breakfast"] },
      { day: 3, title: "Halong Bay Cruise", description: "Sailing fun", activities: ["Transfer to Halong", "Board cruise", "Swimming", "Kayaking", "Squid fishing"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Halong - Flight", description: "Cave & fly", activities: ["Cave exploration", "Return to Hanoi", "Flight to Da Nang", "Hoi An hotel"], meals: ["Breakfast", "Brunch"] },
      { day: 5, title: "Hoi An Discovery", description: "Ancient town", activities: ["Walking tour", "Lantern making workshop", "Boat ride on river"], meals: ["Breakfast"] },
      { day: 6, title: "Hoi An Cooking", description: "Learn to cook", activities: ["Market trip", "Family cooking class", "Eat your creations", "Free time"], meals: ["Breakfast", "Lunch"] },
      { day: 7, title: "Beach & Free", description: "Relaxation", activities: ["Beach resort day", "Swimming", "Optional Ba Na Hills"], meals: ["Breakfast"] },
      { day: 8, title: "Departure", description: "Farewell", activities: ["Breakfast", "Transfer to Da Nang airport"], meals: ["Breakfast"] }
    ],
    included: ["7 nights hotels", "Domestic flight", "Cruise", "Activities", "Guide", "Breakfast daily"],
    excluded: ["International flights", "Lunch/dinner (except specified)", "Tips"],
    imageUrl: "/tours/vietnam-family-classic-8d.jpg",
    rating: 9.3,
    reviewCount: 67,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/classic-vietnam-tours-for-family-12-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/670ccfbae0eee.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65eedba2ce246.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/666679204a6b0.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65eedba2ce247.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666795765301.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65eedba2ce243.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/666679663f413.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65eedba2ce24a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65eedb5c7e8df.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66667942abfe5.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65eedba2ce249.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/666679334e76c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65eedb5c7e8e1.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65eedb5c7e8e0.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65eedba2ce244.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65eedb5c7e8e2.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65eedb5c7e8e3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65eedba2ce245.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65eedb5c7e8e4.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65eedb5c7e8e5.jpg"],
    pricingTiers: [{"category":"Economy (2*)","price":929},{"category":"Superior (3*)","price":969},{"category":"First Class (4*)","price":1089}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 192,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Halong Bay", "Hoi An"],
    activities: ["cultural", "cruise", "beach"],
  },

  // LUXURY TOURS
  {
    id: "luxury-gourmet-vietnam-13d",
    slug: "luxury-gourmet-explorer-vietnam-13-days",
    name: "Luxury Gourmet Explorer Vietnam",
    category: "multi-day",
    location: "Vietnam",
    duration: "13 days, 12 nights",
    price: 3969,
    description: "Ultimate luxury food journey through Vietnam with Michelin-style dining, cooking classes, and 5-star accommodations.",
    fullDescription: `
      <h3>Culinary Excellence</h3>
      <p>A gastronomic odyssey featuring Vietnam's finest restaurants, private cooking sessions, and exclusive food experiences.</p>
    `,
    highlights: ["Fine Dining", "Private Cooking", "5-Star Hotels", "Wine Pairing", "Food Tours"],
    itinerary: [
      { day: 1, title: "Hanoi Arrival", description: "Luxury welcome", activities: ["VIP pickup", "Sofitel Metropole check-in", "Welcome cocktails"], meals: ["Dinner"] },
      { day: 2, title: "Hanoi Gourmet", description: "Capital cuisine", activities: ["Private food tour", "French quarter lunch", "Fine dining dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Hanoi Cooking", description: "Master class", activities: ["Market tour", "Private cooking class", "Wine pairing dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Halong Luxury", description: "Private cruise", activities: ["Seaplane to Halong", "Heritage Line cruise", "Gourmet dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 5, title: "Halong Bay", description: "Bay exploration", activities: ["Sunrise tai chi", "Cave visit", "Seafood lunch", "Cooking demo"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 6, title: "Hue Flight", description: "Imperial cuisine", activities: ["Fly to Hue", "Royal cooking class", "Imperial dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 7, title: "Hue Heritage", description: "Royal flavors", activities: ["Citadel visit", "Royal lunch", "Garden House dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 8, title: "Hoi An", description: "Ancient flavors", activities: ["Transfer via Hai Van", "Four Seasons check-in", "Beach dinner"], meals: ["Breakfast", "Dinner"] },
      { day: 9, title: "Hoi An Market", description: "Local cuisine", activities: ["Market tour", "Cao Lau making", "Lantern dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 10, title: "Saigon Flight", description: "Southern cuisine", activities: ["Fly to Saigon", "Park Hyatt check-in", "Rooftop dinner"], meals: ["Breakfast", "Dinner"] },
      { day: 11, title: "Saigon Food Tour", description: "Street & fine", activities: ["Morning food tour", "Lunch at award-winning restaurant", "Cooking class"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 12, title: "Mekong Luxury", description: "Delta dining", activities: ["Private boat to delta", "Riverside lunch", "Farewell gala dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 13, title: "Departure", description: "Sweet farewell", activities: ["Breakfast", "VIP transfer"], meals: ["Breakfast"] }
    ],
    included: ["12 nights 5-star hotels", "All gourmet meals", "Cooking classes", "Private guides", "Domestic flights", "Wine pairings"],
    excluded: ["International flights", "Tips", "Premium alcohol"],
    imageUrl: "/tours/luxury-gourmet-vietnam-13d.jpg",
    rating: 9.8,
    reviewCount: 28,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/luxury-gourmet-explorer-vietnam-13-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/670ccb8c7afbc.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65fd350b578ce.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65fd350b578cf.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6669536c8c89b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65fd350b578d0.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65fd350b578d1.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65fd350b578d2.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65fd36d080138.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6669537bc367c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65fd350b578d9.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65fd350b578d4.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66695391eb372.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65fd350b578d5.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/666953a67d6bc.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65fd350b578d6.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65fd350b578d7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/666953b516f50.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66695416941a6.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65fd350b578d8.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66695437218ba.jpg"],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE","If you have any specific food requirements (vegetarian, vegan, food allergies) please inform us in advance so that we can provide notice to restaurants, tour guide or our partners so that they can serve you better."],
    durationHours: 312,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Halong Bay", "Hue", "Hoi An", "Ho Chi Minh City", "Mekong Delta"],
    activities: ["luxury", "food-tour", "cooking-class", "cruise"],
  },
  {
    id: "luxurious-vietnam-11d",
    slug: "luxurious-vietnam-exploration-11-days",
    name: "Luxurious Vietnam Exploration",
    category: "multi-day",
    location: "Vietnam",
    duration: "11 days, 10 nights",
    price: 3269,
    description: "Discover Vietnam in ultimate luxury with 5-star hotels, private tours, and exclusive experiences.",
    fullDescription: `
      <h3>Premium Vietnam Journey</h3>
      <p>Experience the very best of Vietnam with luxury accommodations, private guides, and exclusive access.</p>
    `,
    highlights: ["5-Star Hotels", "Private Tours", "Luxury Cruise", "Spa Treatments", "Fine Dining"],
    itinerary: [
      { day: 1, title: "Hanoi Arrival", description: "VIP welcome", activities: ["Airport VIP service", "Luxury hotel check-in", "Welcome dinner"], meals: ["Dinner"] },
      { day: 2, title: "Hanoi Private", description: "Exclusive city tour", activities: ["Private cyclo tour", "Gourmet lunch", "Spa treatment"], meals: ["Breakfast", "Lunch"] },
      { day: 3, title: "Halong Luxury Cruise", description: "5-star sailing", activities: ["Limousine to bay", "Luxury junk cruise", "Sunset cocktails"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Halong - Hanoi", description: "Morning bay", activities: ["Sunrise yoga", "Cave visit", "Return Hanoi", "Flight to Hue"], meals: ["Breakfast", "Brunch"] },
      { day: 5, title: "Hue Imperial", description: "Royal treatment", activities: ["La Residence hotel", "Private citadel tour", "Royal dinner"], meals: ["Breakfast", "Dinner"] },
      { day: 6, title: "Hue - Hoi An", description: "Scenic transfer", activities: ["Private car via Hai Van", "Four Seasons resort", "Spa afternoon"], meals: ["Breakfast"] },
      { day: 7, title: "Hoi An Exclusive", description: "Private experiences", activities: ["Sunrise photography", "Private tailor", "Sunset cruise"], meals: ["Breakfast", "Dinner"] },
      { day: 8, title: "Hoi An Free", description: "Leisure day", activities: ["Resort amenities", "Optional golf", "Beach dinner"], meals: ["Breakfast"] },
      { day: 9, title: "Saigon Flight", description: "Southern luxury", activities: ["Fly to Saigon", "Park Hyatt hotel", "Rooftop cocktails"], meals: ["Breakfast"] },
      { day: 10, title: "Saigon & Mekong", description: "Delta luxury", activities: ["Private speedboat", "Luxury delta lunch", "Evening city tour"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 11, title: "Departure", description: "Farewell", activities: ["Breakfast", "VIP airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["10 nights 5-star hotels", "All private tours", "Luxury cruise", "Domestic flights", "Spa treatments", "Many meals"],
    excluded: ["International flights", "Tips", "Premium requests"],
    imageUrl: "/tours/luxurious-vietnam-11d.jpg",
    rating: 9.5,
    reviewCount: 42,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/luxurious-vietnam-exploration-11-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/670ccb55a5de1.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65fa69f98349e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66667f88311db.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65fa69f9834a0.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65fa69f98349f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66667f9cd6541.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65fa69f9834a1.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65fa69f9834a2.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65fa69f9834a3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66667fbbbdbff.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65fa69f983492.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65fa69f983494.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65fa69f983496.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66667ff5dd65f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66668009e0a2a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666801c85969.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66667fd7ead65.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666803a41147.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65fa69f983497.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/666680489446a.jpg"],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE","If you have any specific food requirement (vegetarian, vegan, food allergies, etc.) please inform us in advance, we will provide notices to our restaurants, tour guides and partners so they would be able to serve you the best."],
    durationHours: 264,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Halong Bay", "Hue", "Hoi An", "Ho Chi Minh City", "Mekong Delta"],
    activities: ["luxury", "spa", "cruise", "cultural"],
  },
  {
    id: "luxury-wellness-spa-14d",
    slug: "luxury-vietnam-beach-wellness-spa-14-days",
    name: "Luxury Vietnam Beach Wellness & Spa",
    category: "multi-day",
    location: "Vietnam",
    duration: "14 days, 13 nights",
    price: 4279,
    description: "Ultimate wellness retreat combining luxury beach resorts, world-class spas, and rejuvenating experiences.",
    fullDescription: `
      <h3>Wellness Paradise</h3>
      <p>Rejuvenate body and soul at Vietnam's finest wellness resorts with daily spa treatments and mindful activities.</p>
    `,
    highlights: ["Daily Spa Treatments", "Yoga Sessions", "Meditation", "Detox Cuisine", "Beach Resorts"],
    itinerary: [
      { day: 1, title: "Hanoi Arrival", description: "Wellness begins", activities: ["Airport pickup", "Luxury hotel", "Welcome massage"], meals: ["Dinner"] },
      { day: 2, title: "Hanoi Wellness", description: "City & spa", activities: ["Morning yoga", "Light city tour", "Afternoon spa"], meals: ["Breakfast", "Lunch"] },
      { day: 3, title: "Halong Spa Cruise", description: "Floating spa", activities: ["Cruise with spa", "Tai chi", "Massage on deck"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Halong - Ninh Binh", description: "Nature wellness", activities: ["Morning cruise", "Transfer Ninh Binh", "Resort spa"], meals: ["Breakfast", "Brunch"] },
      { day: 5, title: "Ninh Binh - Flight", description: "To the beach", activities: ["Morning meditation", "Fly to Da Nang", "Resort check-in"], meals: ["Breakfast"] },
      { day: 6, title: "Da Nang Wellness", description: "Beach retreat", activities: ["Sunrise yoga", "Spa treatment", "Beach meditation"], meals: ["Breakfast", "Lunch"] },
      { day: 7, title: "Da Nang Spa Day", description: "Full spa day", activities: ["Morning detox", "Multiple treatments", "Healthy dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 8, title: "Hoi An Transfer", description: "Ancient wellness", activities: ["Four Seasons check-in", "Herbal spa", "Cooking class"], meals: ["Breakfast", "Dinner"] },
      { day: 9, title: "Hoi An Retreat", description: "Relaxation", activities: ["Beach yoga", "Traditional massage", "Lantern meditation"], meals: ["Breakfast"] },
      { day: 10, title: "Phu Quoc Flight", description: "Island paradise", activities: ["Fly to Phu Quoc", "Beach resort", "Sunset spa"], meals: ["Breakfast"] },
      { day: 11, title: "Phu Quoc Wellness", description: "Island treatments", activities: ["Morning yoga on beach", "Mud bath", "Meditation"], meals: ["Breakfast", "Lunch"] },
      { day: 12, title: "Phu Quoc Spa Day", description: "Full spa program", activities: ["Detox breakfast", "Multiple treatments", "Beach time"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 13, title: "Phu Quoc Free", description: "Pure relaxation", activities: ["Optional activities", "Final spa treatment", "Farewell dinner"], meals: ["Breakfast", "Dinner"] },
      { day: 14, title: "Departure", description: "Refreshed farewell", activities: ["Morning yoga", "Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["13 nights 5-star resorts", "Daily spa treatments", "Yoga sessions", "Domestic flights", "Healthy meals", "All activities"],
    excluded: ["International flights", "Tips", "Premium treatments"],
    imageUrl: "/tours/luxury-wellness-spa-14d.jpg",
    rating: 9.6,
    reviewCount: 35,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/luxury-vietnam-beach-wellness-spa-14-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/670ccabf46131.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666b73d712b7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661745b4e3dac.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666b7681a0a5.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661745b4e3dae.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666b74f23ee4.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661745b4e3daf.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661745b4e3db0.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661745b4e3db1.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661745b4e3db6.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666b781dce8c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661745b4e3db2.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661745b4e3db3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661745b4e3db4.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661745b4e3db5.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6617464bb5e40.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666b79070b62.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6617464bb5e43.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6617464bb5e44.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6617464bb5e45.jpg"],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE","30% of total package price should be deposited once the booking is confirmed","10% of total package price will be charged if cancellation after the deposit made"],
    durationHours: 336,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Halong Bay", "Ninh Binh", "Da Nang", "Hoi An", "Phu Quoc"],
    activities: ["spa", "luxury", "beach", "cultural"],
  },
  {
    id: "insight-vietnam-luxury-14d",
    slug: "luxurious-insight-vietnam-local-14-days",
    name: "Luxurious Insight Vietnam Local",
    category: "multi-day",
    location: "Vietnam",
    duration: "14 days, 13 nights",
    price: 4099,
    description: "Deep dive into Vietnam's culture with luxury accommodations and authentic local experiences.",
    fullDescription: `
      <h3>Cultural Luxury</h3>
      <p>Experience the real Vietnam with exclusive access to local communities while enjoying 5-star comfort.</p>
    `,
    highlights: ["Local Experiences", "5-Star Hotels", "Private Access", "Cultural Immersion", "Artisan Visits"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Arrival", activities: ["VIP pickup", "Hotel check-in", "Welcome dinner"], meals: ["Dinner"] },
      { day: 2, title: "Hanoi Local", description: "Hidden Hanoi", activities: ["Local market tour", "Home cooking", "Artisan workshop"], meals: ["Breakfast", "Lunch"] },
      { day: 3, title: "Hanoi Arts", description: "Creative scene", activities: ["Art gallery visits", "Artist meeting", "Contemporary dinner"], meals: ["Breakfast", "Dinner"] },
      { day: 4, title: "Halong Private", description: "Luxury cruise", activities: ["Private junk", "Fishing village", "Sunset dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 5, title: "Halong - Ninh Binh", description: "Rural luxury", activities: ["Morning bay", "Transfer", "Boutique resort"], meals: ["Breakfast", "Brunch"] },
      { day: 6, title: "Ninh Binh", description: "Local life", activities: ["Farmer visit", "Boat ride", "Village dinner"], meals: ["Breakfast", "Dinner"] },
      { day: 7, title: "Hue Flight", description: "Imperial city", activities: ["Fly to Hue", "Garden house visit", "Royal cuisine"], meals: ["Breakfast", "Dinner"] },
      { day: 8, title: "Hue Heritage", description: "Deep culture", activities: ["Private citadel", "Incense village", "Traditional music"], meals: ["Breakfast", "Lunch"] },
      { day: 9, title: "Hoi An", description: "Ancient charm", activities: ["Scenic transfer", "Tailor experience", "Lantern making"], meals: ["Breakfast"] },
      { day: 10, title: "Hoi An Local", description: "Village life", activities: ["Farming experience", "Fishing village", "Home dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 11, title: "Saigon", description: "Southern spirit", activities: ["Fly to Saigon", "Local food tour", "Jazz evening"], meals: ["Breakfast", "Dinner"] },
      { day: 12, title: "Saigon Hidden", description: "Secret spots", activities: ["Chinatown depth", "Local coffee", "Rooftop sunset"], meals: ["Breakfast", "Lunch"] },
      { day: 13, title: "Mekong Local", description: "Delta immersion", activities: ["Private boat", "Home visits", "Farewell dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 14, title: "Departure", description: "Farewell", activities: ["VIP transfer"], meals: ["Breakfast"] }
    ],
    included: ["13 nights luxury hotels", "All private tours", "Local experiences", "Domestic flights", "Many meals", "Artisan workshops"],
    excluded: ["International flights", "Tips"],
    imageUrl: "/tours/insight-vietnam-luxury-14d.jpg",
    rating: 9.5,
    reviewCount: 29,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/insight-vietnam-local-luxury-tour-14-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/670ccca96919d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666824d5016a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660a83fbabc16.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660a83fbabc18.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660a83fbabc19.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660a83fbabc1a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660a83fbabc1b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666828142ca4.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660a83fbabc1c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660a83fbabc1f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660a83fbabc1d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660a83fbabc1e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/666684c6858c7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/666684b6024ec.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660a83fbabc20.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/666684e79ef2b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/666684fbd2e7f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660a84d042e5a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660a84d042e5c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660a84d042e5d.jpg"],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 336,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Halong Bay", "Ninh Binh", "Hue", "Hoi An", "Ho Chi Minh City", "Mekong Delta"],
    activities: ["luxury", "cultural", "food-tour", "cruise"],
  },

  // HIDDEN & OFF-BEATEN TRACK TOURS
  {
    id: "northeast-vietnam-hidden-7d",
    slug: "hidden-trails-northeast-vietnam-7-days",
    name: "Hidden Trails of Northeast Vietnam",
    category: "multi-day",
    location: "Northeast Vietnam",
    duration: "7 days, 6 nights",
    price: 1069,
    description: "Discover Vietnam's secret northeast with Ban Gioc Waterfall, Ba Be Lake, and ethnic hill tribe villages.",
    fullDescription: `
      <h3>Off the Beaten Path</h3>
      <p>Explore the rarely-visited northeast region with stunning waterfalls, pristine lakes, and authentic ethnic cultures.</p>
    `,
    highlights: ["Ban Gioc Waterfall", "Ba Be Lake", "Nguom Ngao Cave", "Ethnic Villages", "Scenic Roads"],
    itinerary: [
      { day: 1, title: "Hanoi - Ba Be", description: "To the lake", activities: ["Depart Hanoi", "Scenic drive", "Ba Be Lake arrival", "Homestay"], meals: ["Lunch", "Dinner"] },
      { day: 2, title: "Ba Be Lake", description: "Lake exploration", activities: ["Boat trip on lake", "Puong Cave", "Dau Dang Waterfall", "Village visit"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Ba Be - Cao Bang", description: "Mountain roads", activities: ["Morning lake views", "Transfer to Cao Bang", "Scenic stops"], meals: ["Breakfast", "Lunch"] },
      { day: 4, title: "Ban Gioc Waterfall", description: "Vietnam's largest", activities: ["Ban Gioc Waterfall", "Bamboo raft ride", "Nguom Ngao Cave", "Border views"], meals: ["Breakfast", "Lunch"] },
      { day: 5, title: "Cao Bang - Lang Son", description: "Border region", activities: ["Scenic drive", "Pac Bo Cave", "Lang Son exploration"], meals: ["Breakfast", "Lunch"] },
      { day: 6, title: "Lang Son - Ha Giang", description: "To the north", activities: ["Mountain roads", "Ethnic markets", "Ha Giang arrival"], meals: ["Breakfast", "Lunch"] },
      { day: 7, title: "Ha Giang - Hanoi", description: "Return journey", activities: ["Morning town exploration", "Transfer to Hanoi", "Evening arrival"], meals: ["Breakfast"] }
    ],
    included: ["6 nights hotels/homestays", "All transport", "Guide", "Boat trips", "Meals as specified", "Entrance fees"],
    excluded: ["Flights", "Drinks", "Tips"],
    imageUrl: "/tours/northeast-vietnam-hidden-7d.jpg",
    rating: 9.4,
    reviewCount: 56,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/off-the-beaten-track-northeast-vietnam-7-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667bc9f0eba9d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e13afb6a30b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e13afb6a30c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e13afb6a30d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665ebce894df2.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e13afb6a30e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e13afb6a310.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e13afb6a30f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e13afb6a305.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e13afb6a308.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e13afb6a309.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e13afb6a30a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/68ecd235e3c41.png","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65e13afb6a30b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65e13afb6a30c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65e13afb6a30d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65e13afb6a30e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65e13afb6a30f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65e13afb6a305.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65e13afb6a308.jpg"],
    pricingTiers: [{"category":"Economy (2*)","price":1069}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 168,
    startCity: "Hanoi",
    destinations: ["Ba Be", "Cao Bang", "Ban Gioc", "Ha Giang"],
    activities: ["adventure", "nature", "cultural", "boat-tour"],
  },
  {
    id: "hill-tribes-northwest-9d",
    slug: "ethnic-encounters-hill-tribes-vietnam-9-days",
    name: "Ethnic Encounters: Hill Tribes of Vietnam",
    category: "multi-day",
    location: "Northwest Vietnam",
    duration: "9 days, 8 nights",
    price: 1479,
    description: "Immerse in the cultures of Vietnam's ethnic minorities in the remote northwest highlands.",
    fullDescription: `
      <h3>Cultural Immersion</h3>
      <p>Meet the Hmong, Dao, Thai, and other ethnic groups in their traditional villages with homestay experiences.</p>
    `,
    highlights: ["Hmong Villages", "Thai Homestays", "Ethnic Markets", "Rice Terraces", "Traditional Crafts"],
    itinerary: [
      { day: 1, title: "Hanoi - Mai Chau", description: "Thai country", activities: ["Drive to Mai Chau", "Thai village", "Stilt house homestay"], meals: ["Lunch", "Dinner"] },
      { day: 2, title: "Mai Chau", description: "Valley life", activities: ["Cycling tour", "Weaving demonstration", "Traditional dance"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Mai Chau - Son La", description: "Mountain journey", activities: ["Scenic drive", "Hmong village", "Son La arrival"], meals: ["Breakfast", "Lunch"] },
      { day: 4, title: "Son La - Dien Bien", description: "Historic valley", activities: ["Dien Bien Phu", "Historical sites", "Thai village visit"], meals: ["Breakfast", "Lunch"] },
      { day: 5, title: "Dien Bien - Sapa", description: "To the mountains", activities: ["Long scenic drive", "Mountain passes", "Sapa arrival"], meals: ["Breakfast", "Lunch"] },
      { day: 6, title: "Sapa Trekking", description: "Hmong villages", activities: ["Trek to Cat Cat", "Hmong culture", "Rice terraces"], meals: ["Breakfast", "Lunch"] },
      { day: 7, title: "Sapa - Bac Ha", description: "Flower Hmong", activities: ["Transfer to Bac Ha", "Village visits", "Homestay"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 8, title: "Bac Ha Market", description: "Famous market", activities: ["Sunday market experience", "Colorful ethnic groups", "Transfer to Hanoi"], meals: ["Breakfast", "Lunch"] },
      { day: 9, title: "Hanoi Departure", description: "Farewell", activities: ["Morning arrival Hanoi", "Departure"], meals: ["Breakfast"] }
    ],
    included: ["8 nights hotels/homestays", "All transport", "Guide", "Trekking", "Meals as specified", "Market visits"],
    excluded: ["Flights", "Drinks", "Tips"],
    imageUrl: "/tours/hill-tribes-northwest-9d.jpg",
    rating: 9.5,
    reviewCount: 45,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/hill-tribes-of-northern-vietnam-9-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e142ba8ad2a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e142ba8ad28.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e142ba8ad20.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665ec018c2a9e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e142ba8ad21.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e142ba8ad22.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65f01edc97de1.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665ec03cbea9c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665ec02d70366.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e142ba8ad23.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e142ba8ad24.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e142ba8ad25.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e142ba8ad29.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e142ba8ad26.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e142ba8ad27.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e142ba8ad1f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e142ba8ad19.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e142ba8ad1c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e142ba8ad1d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e142ba8ad1e.jpg"],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 216,
    startCity: "Hanoi",
    destinations: ["Mai Chau", "Sapa", "Ha Giang"],
    activities: ["trekking", "cultural", "homestay", "photography"],
  },

  // BEACH & RELAXATION TOURS
  {
    id: "saigon-mui-ne-relaxation-7d",
    slug: "south-vietnam-saigon-mui-ne-beach-7-days",
    name: "South Vietnam: Saigon & Mui Ne Beach",
    category: "multi-day",
    location: "Southern Vietnam",
    duration: "7 days, 6 nights",
    price: 439,
    description: "Perfect combination of bustling Saigon and relaxing Mui Ne beach for a balanced southern Vietnam experience.",
    fullDescription: `
      <h3>City & Beach Escape</h3>
      <p>Experience the energy of Ho Chi Minh City before unwinding on the beautiful beaches of Mui Ne.</p>
    `,
    highlights: ["Ho Chi Minh City", "Cu Chi Tunnels", "Mui Ne Beach", "Sand Dunes", "Fairy Stream"],
    itinerary: [
      { day: 1, title: "Saigon Arrival", description: "Welcome", activities: ["Airport pickup", "Hotel check-in", "Evening walk"], meals: [] },
      { day: 2, title: "Saigon Discovery", description: "City tour", activities: ["War Remnants Museum", "Reunification Palace", "Ben Thanh Market"], meals: ["Breakfast"] },
      { day: 3, title: "Cu Chi & Transfer", description: "History & beach", activities: ["Cu Chi Tunnels", "Transfer to Mui Ne", "Beach resort check-in"], meals: ["Breakfast", "Lunch"] },
      { day: 4, title: "Mui Ne Beach", description: "Relaxation", activities: ["Beach day", "Optional water sports", "Sunset at beach"], meals: ["Breakfast"] },
      { day: 5, title: "Mui Ne Exploration", description: "Local attractions", activities: ["White sand dunes sunrise", "Red sand dunes", "Fairy Stream", "Fishing village"], meals: ["Breakfast"] },
      { day: 6, title: "Mui Ne Free Day", description: "Pure relaxation", activities: ["Beach activities", "Spa optional", "Farewell dinner"], meals: ["Breakfast"] },
      { day: 7, title: "Departure", description: "Farewell", activities: ["Transfer to Saigon airport", "Departure"], meals: ["Breakfast"] }
    ],
    included: ["6 nights hotels", "Transfers", "Cu Chi tour", "Guide", "Breakfast daily"],
    excluded: ["Flights", "Lunch/dinner", "Tips", "Water sports"],
    imageUrl: "/tours/saigon-mui-ne-relaxation-7d.jpg",
    rating: 9.0,
    reviewCount: 123,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/saigon-and-mui-ne-relaxation-7-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660f83a75525e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65fd3e8c5e883.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65fd3e8c5e885.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65fd3e8c5e886.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/666958b45a8af.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65fd3e8c5e887.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66695863992ee.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66695898d29ac.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/666958d087b9f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/666958e3e33d2.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65fd3e8c5e888.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/666959aa08905.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a30b3fcd7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a30b3fcd4.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a32aa1745.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a32aa1747.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a30b3fcd2.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a32aa1748.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a30b3fcd5.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/66d7ce5308de8.png"],
    pricingTiers: [{"category":"Superior (3*)","price":439},{"category":"First Class (4*)","price":579}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 168,
    startCity: "Ho Chi Minh City",
    destinations: ["Ho Chi Minh City", "Cu Chi", "Phu Quoc"],
    activities: ["beach", "historical", "sightseeing"],
  },
  {
    id: "vietnam-beaches-island-10d",
    slug: "vietnam-beaches-islands-escape-10-days",
    name: "Vietnam Beaches & Islands Escape",
    category: "multi-day",
    location: "Vietnam Coast",
    duration: "10 days, 9 nights",
    price: 489,
    description: "Beach-hopping adventure from north to south covering Vietnam's most beautiful coastal destinations.",
    fullDescription: `
      <h3>Ultimate Beach Holiday</h3>
      <p>Visit Vietnam's best beaches from Halong Bay to Phu Quoc with swimming, snorkeling, and island exploration.</p>
    `,
    highlights: ["Halong Bay", "Nha Trang", "Phu Quoc", "Island Hopping", "Snorkeling"],
    itinerary: [
      { day: 1, title: "Hanoi Arrival", description: "Welcome", activities: ["Airport pickup", "Hotel check-in", "Evening walk"], meals: [] },
      { day: 2, title: "Halong Bay", description: "Emerald waters", activities: ["Transfer to Halong", "Cruise", "Beach", "Kayaking"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Halong - Flight", description: "To central coast", activities: ["Morning bay", "Return Hanoi", "Fly to Nha Trang"], meals: ["Breakfast", "Brunch"] },
      { day: 4, title: "Nha Trang Beach", description: "Beach resort", activities: ["Beach day", "Promenade walk", "Seafood dinner"], meals: ["Breakfast"] },
      { day: 5, title: "Nha Trang Islands", description: "Island hopping", activities: ["Boat to islands", "Snorkeling", "Beach BBQ"], meals: ["Breakfast", "Lunch"] },
      { day: 6, title: "Nha Trang Free", description: "Relaxation", activities: ["Free day", "Optional: Vinpearl", "Mud bath optional"], meals: ["Breakfast"] },
      { day: 7, title: "Phu Quoc Flight", description: "Island paradise", activities: ["Fly to Phu Quoc", "Beach resort", "Sunset beach"], meals: ["Breakfast"] },
      { day: 8, title: "Phu Quoc South", description: "Island exploration", activities: ["Cable car to Hon Thom", "Sao Beach", "Night market"], meals: ["Breakfast"] },
      { day: 9, title: "Phu Quoc North", description: "Snorkeling day", activities: ["Snorkeling trip", "Island beaches", "Farewell dinner"], meals: ["Breakfast", "Lunch"] },
      { day: 10, title: "Departure", description: "Farewell", activities: ["Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["9 nights hotels", "Domestic flights", "Cruise", "Island tours", "Meals as specified"],
    excluded: ["International flights", "Tips", "Water sports equipment"],
    imageUrl: "/tours/vietnam-beaches-island-10d.jpg",
    rating: 9.2,
    reviewCount: 78,
    affiliateUrl: "https://www.bestpricetravel.com/phu-quoc-tours/phu-quoc-beach-escape-5-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6763a5beda259.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64fe7f49adb97.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/664c5df156e47.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64fe7f49adb9a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/664c5df156e43.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d3ea1e8413.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/664c5df156e46.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64fe7f49adb9b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64fe7f49adb9c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d3eaf27b23.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d3ebf0e97b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64fe7f49adb9d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64fe812a3a5ec.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/664c5df156e48.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d3ed6d63f3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/64fe7f49adb97.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/64fe7f49adb9a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/64fe7f49adb9c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/64fe7f49adb9d.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f4e817979d9.jpg"],
    pricingTiers: [{"category":"Superior (3* Hotels)","price":489},{"category":"First Class (4* Hotels)","price":555},{"category":"Deluxe (5* hotels)","price":739}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 240,
    startCity: "Hanoi",
    destinations: ["Halong Bay", "Nha Trang", "Phu Quoc"],
    activities: ["beach", "snorkeling", "cruise", "sightseeing"],
  },

  // VIETNAM & CAMBODIA COMBINED
  {
    id: "vietnam-cambodia-best-15d",
    slug: "best-vietnam-cambodia-15-days",
    name: "Best of Vietnam and Cambodia",
    category: "multi-day",
    location: "Vietnam & Cambodia",
    duration: "15 days, 14 nights",
    price: 1589,
    description: "Complete journey through Vietnam and Cambodia visiting Angkor Wat, Halong Bay, and the Mekong Delta.",
    fullDescription: `
      <h3>Indochina Adventure</h3>
      <p>Experience the best of both countries with ancient temples, beautiful bays, and vibrant cities.</p>
    `,
    highlights: ["Angkor Wat", "Halong Bay", "Hoi An", "Phnom Penh", "Mekong Delta"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Vietnam welcome", activities: ["Airport pickup", "Old Quarter walk"], meals: [] },
      { day: 2, title: "Hanoi City", description: "Capital exploration", activities: ["Ho Chi Minh Mausoleum", "Temple of Literature", "Water puppets"], meals: ["Breakfast"] },
      { day: 3, title: "Halong Bay", description: "Cruise", activities: ["Transfer", "Board cruise", "Kayaking", "Cave visit"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Halong - Hue", description: "Flight south", activities: ["Morning cruise", "Fly to Hue", "Citadel visit"], meals: ["Breakfast", "Brunch"] },
      { day: 5, title: "Hue - Hoi An", description: "Scenic drive", activities: ["Royal tombs", "Hai Van Pass", "Hoi An arrival"], meals: ["Breakfast"] },
      { day: 6, title: "Hoi An", description: "Ancient town", activities: ["Walking tour", "Cooking class", "Lantern night"], meals: ["Breakfast", "Lunch"] },
      { day: 7, title: "Hoi An - Saigon", description: "Flight", activities: ["Morning free", "Fly to Saigon", "City walk"], meals: ["Breakfast"] },
      { day: 8, title: "Saigon", description: "City tour", activities: ["War Museum", "Reunification Palace", "Cu Chi Tunnels"], meals: ["Breakfast"] },
      { day: 9, title: "Mekong Delta", description: "River life", activities: ["Mekong boat trip", "Floating market", "Local villages"], meals: ["Breakfast", "Lunch"] },
      { day: 10, title: "Saigon - Phnom Penh", description: "To Cambodia", activities: ["Fly to Phnom Penh", "Hotel check-in", "Night market"], meals: ["Breakfast"] },
      { day: 11, title: "Phnom Penh", description: "Capital city", activities: ["Royal Palace", "Silver Pagoda", "Killing Fields"], meals: ["Breakfast"] },
      { day: 12, title: "Phnom Penh - Siem Reap", description: "To Angkor", activities: ["Fly to Siem Reap", "Angkor National Museum", "Pub Street"], meals: ["Breakfast"] },
      { day: 13, title: "Angkor Wat", description: "Temple wonder", activities: ["Sunrise Angkor Wat", "Angkor Thom", "Bayon", "Ta Prohm"], meals: ["Breakfast"] },
      { day: 14, title: "Angkor Temples", description: "More temples", activities: ["Outer temples", "Floating village", "Farewell dinner"], meals: ["Breakfast"] },
      { day: 15, title: "Departure", description: "Farewell", activities: ["Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["14 nights hotels", "All flights", "Cruise", "Tours", "Guide", "Breakfast daily"],
    excluded: ["Visa fees", "Tips", "Optional activities"],
    imageUrl: "/tours/vietnam-cambodia-best-15d.jpg",
    rating: 9.3,
    reviewCount: 156,
    affiliateUrl: "https://www.bestpricetravel.com/indochina-tours/best-of-vietnam-and-cambodia-15-days.html",
    durationHours: 360,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Halong Bay", "Hue", "Hoi An", "Ho Chi Minh City", "Mekong Delta", "Cambodia", "Siem Reap"],
    activities: ["cultural", "cruise", "historical", "sightseeing"],
  },
  {
    id: "luxury-vietnam-cambodia-15d",
    slug: "incredible-luxury-vietnam-cambodia-15-days",
    name: "Incredible Luxury Vietnam & Cambodia",
    category: "multi-day",
    location: "Vietnam & Cambodia",
    duration: "15 days, 14 nights",
    price: 4089,
    description: "Premium journey through Vietnam and Cambodia with 5-star hotels, private guides, and exclusive experiences.",
    fullDescription: `
      <h3>Luxury Indochina</h3>
      <p>Experience the finest accommodations and exclusive access to the best of Vietnam and Cambodia.</p>
    `,
    highlights: ["5-Star Hotels", "Private Tours", "Luxury Cruise", "Angkor VIP", "Fine Dining"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "VIP arrival", activities: ["VIP pickup", "Sofitel Metropole", "Welcome dinner"], meals: ["Dinner"] },
      { day: 2, title: "Hanoi Private", description: "Exclusive tour", activities: ["Private cyclo", "Gourmet lunch", "Spa"], meals: ["Breakfast", "Lunch"] },
      { day: 3, title: "Halong Luxury", description: "Heritage cruise", activities: ["Luxury cruise", "Private beach", "Gourmet dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Halong - Hue", description: "Continue cruise", activities: ["Morning spa", "Fly to Hue", "La Residence hotel"], meals: ["Breakfast", "Brunch"] },
      { day: 5, title: "Hue Imperial", description: "Royal treatment", activities: ["Private citadel", "Garden house", "Royal dinner"], meals: ["Breakfast", "Dinner"] },
      { day: 6, title: "Hue - Hoi An", description: "Scenic transfer", activities: ["Private car", "Four Seasons resort", "Spa treatment"], meals: ["Breakfast"] },
      { day: 7, title: "Hoi An Luxury", description: "Premium experiences", activities: ["Private tailor", "Sunset cruise", "Fine dining"], meals: ["Breakfast", "Dinner"] },
      { day: 8, title: "Saigon Flight", description: "To the south", activities: ["Fly to Saigon", "Park Hyatt", "Rooftop dinner"], meals: ["Breakfast", "Dinner"] },
      { day: 9, title: "Saigon & Mekong", description: "Luxury delta", activities: ["Private speedboat", "Gourmet lunch", "Evening tour"], meals: ["Breakfast", "Lunch"] },
      { day: 10, title: "Phnom Penh", description: "Cambodia arrival", activities: ["Fly to Phnom Penh", "Raffles Hotel", "Palace tour"], meals: ["Breakfast"] },
      { day: 11, title: "Phnom Penh", description: "History & culture", activities: ["Private tours", "Silk Island", "Fine dining"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 12, title: "Siem Reap", description: "Angkor arrival", activities: ["Fly to Siem Reap", "Amansara resort", "Sunset temple"], meals: ["Breakfast", "Dinner"] },
      { day: 13, title: "Angkor VIP", description: "Private temples", activities: ["Private sunrise", "Hidden temples", "Champagne sunset"], meals: ["Breakfast", "Lunch"] },
      { day: 14, title: "Angkor Exclusive", description: "Beyond tourists", activities: ["Outer temples", "Floating village private", "Gala dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 15, title: "Departure", description: "VIP farewell", activities: ["VIP transfer"], meals: ["Breakfast"] }
    ],
    included: ["14 nights 5-star hotels", "All flights", "Luxury cruise", "Private tours", "Fine dining", "Spa treatments"],
    excluded: ["Visa fees", "Tips", "Premium alcohol"],
    imageUrl: "/tours/luxury-vietnam-cambodia-15d.jpg",
    rating: 9.5,
    reviewCount: 34,
    affiliateUrl: "https://www.bestpricetravel.com/indochina-tours/incredible-luxury-vietnam-and-cambodia-15-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6773b3d7a9ac0.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64bfa2815cab9.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66a9b0fa694dc.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64bfa2815cabb.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64bfa2ac962c8.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66a9b0fa694e1.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66a9b0fa694e0.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64bfa2815cabc.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66a9b0fa694e2.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64bfa2815cabd.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64bfa2815cabe.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66a9b126d204d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66a9b126d204a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64bfa2ac962c3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64bfa2ac962c6.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64bfa2ac962c7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66a9b126d204e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64bfa2ac962c5.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66a9b188ec06e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66a9b126d2050.jpg"],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 360,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Halong Bay", "Hue", "Hoi An", "Ho Chi Minh City", "Mekong Delta", "Cambodia", "Siem Reap"],
    activities: ["luxury", "cruise", "cultural", "spa"],
  },

  // SOFT ADVENTURE & TREKKING
  {
    id: "northern-vietnam-soft-adventure-8d",
    slug: "northern-vietnam-soft-adventure-8-days",
    name: "Northern Vietnam Soft Adventure",
    category: "multi-day",
    location: "Northern Vietnam",
    duration: "8 days, 7 nights",
    price: 999,
    description: "Gentle adventure through Northern Vietnam with light trekking, cycling, and cultural experiences.",
    fullDescription: `
      <h3>Easy-Going Adventure</h3>
      <p>Perfect for those wanting active experiences without extreme challenges - trekking, biking, and kayaking at a comfortable pace.</p>
    `,
    highlights: ["Light Trekking", "Cycling", "Kayaking", "Homestays", "Scenic Routes"],
    itinerary: [
      { day: 1, title: "Hanoi Arrival", description: "Welcome", activities: ["Airport pickup", "Hotel check-in", "Evening walk"], meals: [] },
      { day: 2, title: "Hanoi - Mai Chau", description: "To the valley", activities: ["Drive to Mai Chau", "Easy cycling", "Thai homestay"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Mai Chau - Pu Luong", description: "Nature reserve", activities: ["Transfer to Pu Luong", "Light trek", "Waterfall swim"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Pu Luong Trekking", description: "Rice terraces", activities: ["Village trekking", "Local lunch", "Rice terrace views"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 5, title: "Pu Luong - Ninh Binh", description: "Dry Halong", activities: ["Transfer to Ninh Binh", "Tam Coc boat ride", "Cycling temples"], meals: ["Breakfast", "Lunch"] },
      { day: 6, title: "Ninh Binh - Halong", description: "To the bay", activities: ["Transfer to Halong", "Board cruise", "Kayaking"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 7, title: "Halong - Hanoi", description: "Bay morning", activities: ["Tai chi", "Cave visit", "Return Hanoi"], meals: ["Breakfast", "Brunch"] },
      { day: 8, title: "Departure", description: "Farewell", activities: ["Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["7 nights hotels/homestays", "All transport", "Cruise", "Guide", "Activities", "Most meals"],
    excluded: ["Flights", "Tips", "Personal expenses"],
    imageUrl: "/tours/northern-vietnam-soft-adventure-8d.jpg",
    rating: 9.3,
    reviewCount: 89,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/northern-vietnam-soft-adventure-8-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667bcbd463d35.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665ebefd66b5d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e13f7c6b3db.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e13f7c6b3da.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e13f7c6b3d5.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665ebf1004a52.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e13f7c6b3d8.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e13f7c6b3d6.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e13f7c6b3d7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e13f7c6b3ce.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665ebf3a70e47.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e13f7c6b3d9.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665ebf1fe4e1b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e13f7c6b3d4.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e13f7c6b3d0.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e13f7c6b3d1.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e13f7c6b3d2.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665ebf48b4442.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e13f7c6b3d3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665ebf56718a4.jpg"],
    pricingTiers: [{"category":"Economy (2*)","price":999},{"category":"Superior (3*)","price":1129},{"category":"First Class (4*)","price":1259}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 192,
    startCity: "Hanoi",
    destinations: ["Mai Chau", "Pu Luong", "Ninh Binh", "Halong Bay"],
    activities: ["trekking", "cycling", "kayaking", "homestay"],
  },
  {
    id: "vietnam-trekking-caving-12d",
    slug: "vietnam-active-escape-trekking-caving-12-days",
    name: "Vietnam Active Escape: Trekking, Caving & Water",
    category: "multi-day",
    location: "Vietnam",
    duration: "12 days, 11 nights",
    price: 279,
    description: "Action-packed adventure combining trekking in Sapa, caving in Phong Nha, and water activities.",
    fullDescription: `
      <h3>Ultimate Active Vietnam</h3>
      <p>For adventure seekers wanting to push beyond ordinary tourism with serious caving, trekking, and water sports.</p>
    `,
    highlights: ["Phong Nha Caving", "Sapa Trekking", "Dark Cave", "Kayaking", "River Activities"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Arrival", activities: ["Airport pickup", "Briefing", "Old Quarter"], meals: [] },
      { day: 2, title: "Hanoi - Phong Nha", description: "To the caves", activities: ["Early train/bus", "Arrive Phong Nha", "Evening exploration"], meals: ["Breakfast"] },
      { day: 3, title: "Phong Nha Caves", description: "Cave adventure", activities: ["Paradise Cave", "Phong Nha Cave boat", "Dark Cave introduction"], meals: ["Breakfast", "Lunch"] },
      { day: 4, title: "Dark Cave Adventure", description: "Full day caving", activities: ["Zip-line entry", "Mud bathing", "Cave swimming", "Kayaking out"], meals: ["Breakfast", "Lunch"] },
      { day: 5, title: "Phong Nha - Hue", description: "To the coast", activities: ["Transfer to Hue", "City exploration", "Evening walk"], meals: ["Breakfast"] },
      { day: 6, title: "Hue - Hoi An", description: "Scenic route", activities: ["Hai Van Pass", "Lang Co swim", "Hoi An arrival"], meals: ["Breakfast"] },
      { day: 7, title: "Hoi An Active", description: "Water & bike", activities: ["Cycling villages", "Basket boat", "Kayak river"], meals: ["Breakfast", "Lunch"] },
      { day: 8, title: "Hoi An - Hanoi", description: "Flight north", activities: ["Morning free", "Fly to Hanoi", "Night train to Sapa"], meals: ["Breakfast"] },
      { day: 9, title: "Sapa Trekking", description: "Mountain adventure", activities: ["Arrive Sapa", "Afternoon trek", "Village homestay"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 10, title: "Sapa Full Trek", description: "All day hiking", activities: ["8-hour trek", "Remote villages", "Rice terraces", "Homestay"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 11, title: "Sapa - Hanoi", description: "Return", activities: ["Morning trek", "Transfer to Hanoi", "Farewell dinner"], meals: ["Breakfast", "Lunch"] },
      { day: 12, title: "Departure", description: "Farewell", activities: ["Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["11 nights hotels/homestays/train", "All activities", "Caving equipment", "Guide", "Most meals"],
    excluded: ["Flights", "Tips", "Optional activities"],
    imageUrl: "/tours/vietnam-trekking-caving-12d.jpg",
    rating: 9.4,
    reviewCount: 67,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/trekking-caving-ba-be-national-park-3-days-2-nights.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6778bac9d35b8.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6778bad43c6b7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6778bac9d35b7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6778bac9d35b9.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6778bad43c6b2.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6778bac9d35b4.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6778bad43c6b5.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6778bad43c6b6.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/689976be88bce.png","https://d122axpxm39woi.cloudfront.net/images/tours/origin/6778bac9d35b7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/6778bac9d35b4.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/6778bad43c6b5.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/667bcbd463d35.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/674d6b9682e0e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/667bd715a9ae2.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/68d39d80577ab.jpg","https://d122axpxm39woi.cloudfront.net/assets/img/dcma.png"],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 288,
    startCity: "Hanoi",
    destinations: ["Phong Nha", "Hue", "Hoi An", "Sapa"],
    activities: ["trekking", "adventure", "kayaking", "cave-exploration"],
  },

  // HONEYMOON & ROMANTIC TOURS
  {
    id: "vietnam-honeymoon-romantic-10d",
    slug: "vietnam-romantic-honeymoon-escape-10-days",
    name: "Vietnam Romantic Honeymoon Escape",
    category: "multi-day",
    location: "Vietnam",
    duration: "10 days, 9 nights",
    price: 1629,
    description: "Romantic journey through Vietnam's most beautiful destinations with couples' experiences and luxury touches.",
    fullDescription: `
      <h3>Love in Vietnam</h3>
      <p>Designed for couples with sunset cruises, candlelit dinners, spa treatments, and private experiences.</p>
    `,
    highlights: ["Sunset Cruises", "Couples Spa", "Private Dinners", "Beach Resort", "Romantic Settings"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Romantic arrival", activities: ["VIP pickup", "Boutique hotel", "Welcome champagne"], meals: [] },
      { day: 2, title: "Hanoi Romance", description: "City for two", activities: ["Private cyclo", "Fine dining", "Night walk"], meals: ["Breakfast", "Dinner"] },
      { day: 3, title: "Halong Cruise", description: "Bay romance", activities: ["Private junk option", "Sunset cocktails", "Candlelit dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Halong - Hoi An", description: "Flight south", activities: ["Morning bay", "Fly to Da Nang", "Beach resort"], meals: ["Breakfast", "Brunch"] },
      { day: 5, title: "Hoi An Relaxation", description: "Leisure day", activities: ["Couples spa", "Ancient town walk", "Lantern boat"], meals: ["Breakfast"] },
      { day: 6, title: "Hoi An Beach", description: "Beach romance", activities: ["Beach day", "Sunset drinks", "Private dinner on beach"], meals: ["Breakfast", "Dinner"] },
      { day: 7, title: "Phu Quoc Flight", description: "Island paradise", activities: ["Fly to Phu Quoc", "Luxury resort", "Pool & beach"], meals: ["Breakfast"] },
      { day: 8, title: "Phu Quoc Beach", description: "Island bliss", activities: ["Beach activities", "Couples massage", "Sunset dinner cruise"], meals: ["Breakfast", "Dinner"] },
      { day: 9, title: "Phu Quoc Free", description: "Pure relaxation", activities: ["Free day", "Optional activities", "Farewell dinner"], meals: ["Breakfast", "Dinner"] },
      { day: 10, title: "Departure", description: "Sweet farewell", activities: ["Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["9 nights boutique/luxury hotels", "Domestic flights", "Cruise", "Couples spa", "Special dinners", "Private experiences"],
    excluded: ["International flights", "Tips", "Extra spa treatments"],
    imageUrl: "/tours/vietnam-honeymoon-romantic-10d.jpg",
    rating: 9.6,
    reviewCount: 45,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/vietnam-romantic-honeymoon-holiday-14-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667cda92199f2.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6610cd0f17a7c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667cdade84e33.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667cdb06d6766.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6610cd0f17a7d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667cdb1fa23f1.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6610cd0f17a7e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667cdaf1e2132.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6610cd0f17a7f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667cdb31b70d5.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66166b26104f1.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667cdb4472e03.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6610cd0f17a80.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6610cd0f17a81.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6610cd0f17a82.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667cdb56b7e5a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6610cd0f17a77.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6610cd0f17a75.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6610cd0f17a78.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667cdb660c153.jpg"],
    pricingTiers: [{"category":"Superior 3* Hotels","price":1629},{"category":"First Class 4* Hotels","price":1819},{"category":"Deluxe 5* Hotels","price":2199}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 240,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Halong Bay", "Hoi An", "Phu Quoc"],
    activities: ["romance", "spa", "cruise", "beach"],
  },
  {
    id: "vietnam-lovers-honeymoon-12d",
    slug: "impressive-vietnam-for-lovers-12-days",
    name: "Impressive Vietnam for Lovers",
    category: "multi-day",
    location: "Vietnam",
    duration: "12 days, 11 nights",
    price: 1359,
    description: "Comprehensive romantic journey through Vietnam with premium experiences for couples.",
    fullDescription: `
      <h3>Complete Romance Package</h3>
      <p>Extended honeymoon covering all of Vietnam's romantic highlights from north to south.</p>
    `,
    highlights: ["Luxury Hotels", "Private Tours", "Sunset Experiences", "Spa Treatments", "Beach Time"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Welcome", activities: ["VIP arrival", "Boutique hotel", "Evening walk"], meals: [] },
      { day: 2, title: "Hanoi Romance", description: "City love", activities: ["Private tour", "Couples cooking", "Fine dining"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Halong Cruise", description: "Bay magic", activities: ["Luxury cruise", "Private cabin", "Sunset deck"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Halong - Ninh Binh", description: "To valleys", activities: ["Morning bay", "Ninh Binh resort", "Spa treatment"], meals: ["Breakfast", "Brunch"] },
      { day: 5, title: "Ninh Binh", description: "Scenic romance", activities: ["Trang An boat", "Cycling", "Romantic dinner"], meals: ["Breakfast", "Dinner"] },
      { day: 6, title: "Hue Flight", description: "Imperial city", activities: ["Fly to Hue", "Boutique hotel", "Dragon boat"], meals: ["Breakfast"] },
      { day: 7, title: "Hue - Hoi An", description: "Coastal journey", activities: ["Scenic drive", "Beach resort", "Couples spa"], meals: ["Breakfast"] },
      { day: 8, title: "Hoi An", description: "Ancient charm", activities: ["Lantern making", "Sunset cruise", "Private dinner"], meals: ["Breakfast", "Dinner"] },
      { day: 9, title: "Hoi An Free", description: "Leisure day", activities: ["Beach or pool", "Shopping", "Evening free"], meals: ["Breakfast"] },
      { day: 10, title: "Phu Quoc", description: "Island escape", activities: ["Fly to Phu Quoc", "Resort check-in", "Beach sunset"], meals: ["Breakfast"] },
      { day: 11, title: "Phu Quoc Paradise", description: "Beach bliss", activities: ["Snorkeling trip", "Beach massage", "Farewell dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 12, title: "Departure", description: "Until next time", activities: ["Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["11 nights luxury hotels", "Domestic flights", "Cruise", "Spa treatments", "Special dinners", "Private tours"],
    excluded: ["International flights", "Tips", "Premium extras"],
    imageUrl: "/tours/vietnam-lovers-honeymoon-12d.jpg",
    rating: 9.5,
    reviewCount: 38,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/impressive-vietnam-for-lovers-10-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67186d5ca0119.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66287de1dab9d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d1e3d98d03.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66287de1dab8f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d1e7a0ed35.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66287de1dab92.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d1e8cbe285.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d1ea91b681.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d1ed878188.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66287de1dab93.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66287de1dab94.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66287de1dab95.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66287de1dab96.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66287de1dab97.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d1eee0e49c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66287de1dab98.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d1f076ff26.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d1f19c8bc1.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d1f304bc25.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d1f4516094.jpg"],
    pricingTiers: [{"category":"Superior 3*","price":1359},{"category":"First Class 4*","price":1539}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 288,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Halong Bay", "Ninh Binh", "Hue", "Hoi An", "Phu Quoc"],
    activities: ["romance", "cruise", "spa", "beach"],
  },

  // SMALL GROUP TOURS
  {
    id: "epic-vietnam-north-south-12d",
    slug: "epic-vietnam-north-south-small-group-12-days",
    name: "Epic Vietnam: North to South Small Group",
    category: "multi-day",
    location: "Vietnam",
    duration: "12 days, 11 nights",
    price: 976,
    description: "Small group journey covering the entire country from Hanoi to Saigon with maximum 16 travelers.",
    fullDescription: `
      <h3>Complete Vietnam Small Group</h3>
      <p>Join like-minded travelers on this comprehensive north-to-south adventure with guaranteed departures.</p>
    `,
    highlights: ["Small Group", "Guaranteed Departures", "Full Country", "Local Guides", "Authentic Experiences"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Group welcome", activities: ["Airport pickup", "Welcome meeting", "Group dinner"], meals: ["Dinner"] },
      { day: 2, title: "Hanoi Tour", description: "Capital exploration", activities: ["Ho Chi Minh Complex", "Temple of Literature", "Water puppets"], meals: ["Breakfast"] },
      { day: 3, title: "Halong Bay", description: "Cruise", activities: ["Transfer to bay", "Group cruise", "Kayaking", "Cave"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Halong - Hue", description: "Flight south", activities: ["Morning cruise", "Fly to Hue", "Evening walk"], meals: ["Breakfast", "Brunch"] },
      { day: 5, title: "Hue Heritage", description: "Imperial city", activities: ["Citadel", "Tombs", "Thien Mu Pagoda"], meals: ["Breakfast"] },
      { day: 6, title: "Hue - Hoi An", description: "Scenic drive", activities: ["Hai Van Pass", "Marble Mountains", "Hoi An arrival"], meals: ["Breakfast"] },
      { day: 7, title: "Hoi An", description: "Ancient town", activities: ["Walking tour", "Free afternoon", "Cooking class optional"], meals: ["Breakfast"] },
      { day: 8, title: "Hoi An Free", description: "Leisure day", activities: ["Beach or town", "Optional My Son", "Evening free"], meals: ["Breakfast"] },
      { day: 9, title: "Da Nang - Saigon", description: "Flight", activities: ["Fly to Saigon", "City orientation", "Evening walk"], meals: ["Breakfast"] },
      { day: 10, title: "Saigon & Cu Chi", description: "History day", activities: ["Cu Chi Tunnels", "War Museum", "City highlights"], meals: ["Breakfast", "Lunch"] },
      { day: 11, title: "Mekong Delta", description: "River life", activities: ["Day trip to Mekong", "Boat rides", "Farewell dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 12, title: "Departure", description: "Farewell", activities: ["Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["11 nights hotels", "Domestic flights", "Cruise", "Group tours", "Guide", "Meals as specified"],
    excluded: ["International flights", "Tips", "Optional activities"],
    imageUrl: "/tours/epic-vietnam-north-south-12d.jpg",
    rating: 9.2,
    reviewCount: 234,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/epic-vietnam-from-north-to-south-10-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/674d6ef0cd3dd.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/662887b516f25.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/662887b516f26.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d212eb976e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/662887b516f27.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d2111dd666.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d214bb88ef.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/662887b516f28.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/662887b516f29.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/662887b516f2a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d21657799b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/662887b516f2b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d217380c77.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/662887b516f2c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d21c147fe4.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d21d37418b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/662887b516f2d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d21ee9d954.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/662887b516f2e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d2201e91c6.jpg"],
    pricingTiers: [{"category":"Economy  2*+ Hotels","price":976},{"category":"Superior (3*)","price":1088},{"category":"First Class (4*)","price":1236}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 288,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Halong Bay", "Hue", "Hoi An", "Ho Chi Minh City", "Mekong Delta", "Cu Chi"],
    activities: ["cultural", "cruise", "historical", "sightseeing"],
  },
  {
    id: "vietnam-classic-small-group-10d",
    slug: "vietnam-classic-small-group-tour-10-days",
    name: "Vietnam Classic Small Group Tour",
    category: "multi-day",
    location: "Vietnam",
    duration: "10 days, 9 nights",
    price: 1559,
    description: "Classic Vietnam itinerary with small group dynamics and set departure dates throughout the year.",
    fullDescription: `
      <h3>Vietnam Essentials - Group Style</h3>
      <p>The perfect introduction to Vietnam traveling with a small group of fellow adventurers.</p>
    `,
    highlights: ["Guaranteed Departures", "Max 16 People", "Expert Guides", "All Highlights", "Value for Money"],
    itinerary: [
      { day: 1, title: "Hanoi Arrival", description: "Welcome", activities: ["Airport pickup", "Welcome meeting", "Evening walk"], meals: [] },
      { day: 2, title: "Hanoi City", description: "Capital tour", activities: ["City highlights", "Old Quarter", "Water puppets"], meals: ["Breakfast"] },
      { day: 3, title: "Halong Bay", description: "Overnight cruise", activities: ["Transfer", "Cruise", "Kayaking", "Cave"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Halong - Flight", description: "To Hue", activities: ["Morning bay", "Return Hanoi", "Fly to Hue"], meals: ["Breakfast", "Brunch"] },
      { day: 5, title: "Hue Tour", description: "Imperial city", activities: ["Citadel", "Tombs", "Perfume River"], meals: ["Breakfast"] },
      { day: 6, title: "Hue - Hoi An", description: "Scenic transfer", activities: ["Hai Van Pass", "Beach stop", "Hoi An evening"], meals: ["Breakfast"] },
      { day: 7, title: "Hoi An", description: "Ancient town", activities: ["Walking tour", "Free time", "Night market"], meals: ["Breakfast"] },
      { day: 8, title: "Hoi An - Saigon", description: "Flight south", activities: ["Morning free", "Fly to Saigon", "Evening walk"], meals: ["Breakfast"] },
      { day: 9, title: "Saigon & Mekong", description: "Full day", activities: ["Mekong Delta trip", "Boat rides", "Farewell dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 10, title: "Departure", description: "Farewell", activities: ["Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["9 nights hotels", "Domestic flights", "Cruise", "Group tours", "Guide", "Meals as specified"],
    excluded: ["International flights", "Tips", "Optional activities"],
    imageUrl: "/tours/vietnam-classic-small-group-10d.jpg",
    rating: 9.1,
    reviewCount: 189,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/vietnam-grand-discovery-18-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/674d6ec6a2e6d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661758e2ccbd8.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661758e2ccbdb.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666c1d408318.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666c1e4b77c5.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666c1f7da777.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661758e2ccce3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666c20db2dd7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661758e2ccce6.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666c2205d73b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661758e2ccce7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666c22e6336a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666c29ab1c7a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6617587c1fcd6.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6617587c1fcd8.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666c2aa78618.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661758e2ccce8.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6617587c1fcd9.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6617587c1fcda.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6617587c1fcdb.jpg"],
    pricingTiers: [{"category":"Economy (2*)","price":1559},{"category":"Superior (3*)","price":1699},{"category":"First Class (4*)","price":2049}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 240,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Halong Bay", "Hue", "Hoi An", "Ho Chi Minh City", "Mekong Delta"],
    activities: ["cultural", "cruise", "sightseeing"],
  },

  // CENTRAL COAST TOURS
  {
    id: "central-vietnam-deep-dive-7d",
    slug: "central-vietnam-deep-dive-7-days",
    name: "Central Vietnam Deep Dive",
    category: "multi-day",
    location: "Central Vietnam",
    duration: "7 days, 6 nights",
    price: 1029,
    description: "Focused exploration of Central Vietnam's cultural heartland with Hue, Hoi An, and Da Nang.",
    fullDescription: `
      <h3>Central Vietnam Focus</h3>
      <p>Dive deep into the UNESCO heritage sites and beautiful beaches of Central Vietnam.</p>
    `,
    highlights: ["Imperial Hue", "Hoi An Ancient Town", "My Son Sanctuary", "Ba Na Hills", "Beaches"],
    itinerary: [
      { day: 1, title: "Da Nang Arrival", description: "Welcome", activities: ["Airport pickup", "Hotel check-in", "Beach walk"], meals: [] },
      { day: 2, title: "Hue Day Trip", description: "Imperial city", activities: ["Full day Hue", "Citadel", "Tombs", "Perfume River"], meals: ["Breakfast", "Lunch"] },
      { day: 3, title: "My Son & Hoi An", description: "Heritage sites", activities: ["My Son temples", "Hoi An transfer", "Ancient town walk"], meals: ["Breakfast"] },
      { day: 4, title: "Hoi An Full Day", description: "UNESCO town", activities: ["Walking tour", "Cooking class", "Lantern night"], meals: ["Breakfast", "Lunch"] },
      { day: 5, title: "Hoi An Countryside", description: "Beyond town", activities: ["Cycling tour", "Basket boats", "Beach time"], meals: ["Breakfast"] },
      { day: 6, title: "Ba Na Hills", description: "Golden Bridge", activities: ["Ba Na Hills day trip", "Golden Bridge", "Fantasy Park"], meals: ["Breakfast"] },
      { day: 7, title: "Departure", description: "Farewell", activities: ["Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["6 nights hotels", "All transfers", "Tours", "Guide", "Breakfast daily"],
    excluded: ["Flights", "Lunch/dinner", "Ba Na entrance", "Tips"],
    imageUrl: "/tours/central-vietnam-5d.jpg",
    rating: 9.2,
    reviewCount: 112,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/central-vietnam-deep-dive-7-days.html",
    durationHours: 168,
    startCity: "Da Nang",
    destinations: ["Da Nang", "Hue", "Hoi An", "Ba Na Hills"],
    activities: ["cultural", "historical", "cycling", "sightseeing"],
  },

  // PHOTOGRAPHY TOURS
  {
    id: "vietnam-photo-expedition-14d",
    slug: "vietnam-photography-expedition-14-days",
    name: "Vietnam Photography Expedition",
    category: "multi-day",
    location: "Vietnam",
    duration: "14 days, 13 nights",
    price: 719,
    description: "Designed for photographers with optimal timing, locations, and expert guidance for the best shots.",
    fullDescription: `
      <h3>Capture Vietnam</h3>
      <p>Led by professional photographers, visit the most photogenic locations at the best times for stunning images.</p>
    `,
    highlights: ["Sunrise/Sunset Timings", "Pro Guidance", "Iconic Locations", "Hidden Gems", "Post-Processing"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Briefing", activities: ["Airport pickup", "Photo briefing", "Night shoot"], meals: [] },
      { day: 2, title: "Hanoi Streets", description: "Urban photography", activities: ["Dawn train street", "Old Quarter", "Night markets"], meals: ["Breakfast"] },
      { day: 3, title: "Ninh Binh", description: "Landscape day", activities: ["Tam Coc sunrise", "Mua Cave", "Golden hour"], meals: ["Breakfast", "Lunch"] },
      { day: 4, title: "Halong Bay", description: "Bay photography", activities: ["Cruise", "Sunset shots", "Night photography"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 5, title: "Halong Morning", description: "Sunrise cruise", activities: ["Dawn photography", "Return", "Review session"], meals: ["Breakfast", "Brunch"] },
      { day: 6, title: "Sapa", description: "Mountain vistas", activities: ["Travel to Sapa", "Sunset terraces", "Night shots"], meals: ["Breakfast"] },
      { day: 7, title: "Sapa Trekking", description: "Village portraits", activities: ["Dawn trek", "Portrait sessions", "Landscape evening"], meals: ["Breakfast", "Lunch"] },
      { day: 8, title: "Sapa - Hanoi", description: "Transfer", activities: ["Morning shoot", "Transfer", "Fly to Hue"], meals: ["Breakfast"] },
      { day: 9, title: "Hue", description: "Imperial shots", activities: ["Dawn citadel", "Tombs", "Incense village"], meals: ["Breakfast"] },
      { day: 10, title: "Hoi An", description: "Lantern city", activities: ["Transfer", "Sunset river", "Lantern night"], meals: ["Breakfast"] },
      { day: 11, title: "Hoi An", description: "Morning markets", activities: ["Dawn market", "Fishing village", "Golden hour"], meals: ["Breakfast"] },
      { day: 12, title: "Saigon", description: "Urban contrast", activities: ["Fly to Saigon", "Street photography", "Night scenes"], meals: ["Breakfast"] },
      { day: 13, title: "Mekong Delta", description: "River life", activities: ["Pre-dawn start", "Floating market", "River portraits"], meals: ["Breakfast", "Lunch"] },
      { day: 14, title: "Departure", description: "Final review", activities: ["Post-processing session", "Departure"], meals: ["Breakfast"] }
    ],
    included: ["13 nights hotels", "Domestic flights", "Cruise", "Photo guide", "Review sessions", "Locations access"],
    excluded: ["International flights", "Camera gear", "Tips"],
    imageUrl: "/tours/vietnam-photo-expedition-14d.jpg",
    rating: 9.7,
    reviewCount: 23,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/central-and-southern-vietnamese-taste-10-days.html",
    durationHours: 336,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Ninh Binh", "Halong Bay", "Sapa", "Hue", "Hoi An", "Ho Chi Minh City", "Mekong Delta"],
    activities: ["photography", "cultural", "cruise", "trekking"],
  },

  // CULINARY TOURS
  {
    id: "vietnam-culinary-journey-10d",
    slug: "vietnam-culinary-journey-10-days",
    name: "Vietnam Culinary Journey",
    category: "multi-day",
    location: "Vietnam",
    duration: "10 days, 9 nights",
    price: 1249,
    description: "Food-focused tour through Vietnam with cooking classes, market tours, and regional cuisine experiences.",
    fullDescription: `
      <h3>Taste of Vietnam</h3>
      <p>Immerse in Vietnam's incredible food culture with daily culinary activities from north to south.</p>
    `,
    highlights: ["Cooking Classes", "Market Tours", "Street Food", "Regional Cuisines", "Chef Experiences"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Food welcome", activities: ["Airport pickup", "Street food tour", "Bia hoi experience"], meals: ["Dinner"] },
      { day: 2, title: "Hanoi Cooking", description: "Northern cuisine", activities: ["Market tour", "Cooking class", "Fine dining"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Halong Bay", description: "Seafood cruise", activities: ["Cruise", "Cooking demo", "Fresh seafood"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Halong - Hue", description: "Flight", activities: ["Morning bay", "Fly to Hue", "Royal cuisine intro"], meals: ["Breakfast", "Brunch", "Dinner"] },
      { day: 5, title: "Hue Food", description: "Royal flavors", activities: ["Royal cooking class", "Street food tour", "Garden house dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 6, title: "Hue - Hoi An", description: "Transfer", activities: ["Scenic drive", "Hoi An food walk", "Cao Lau lunch"], meals: ["Breakfast", "Lunch"] },
      { day: 7, title: "Hoi An Cooking", description: "Central cuisine", activities: ["Market visit", "Cooking class", "Lantern dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 8, title: "Hoi An - Saigon", description: "South bound", activities: ["Fly to Saigon", "Chinatown food tour"], meals: ["Breakfast", "Dinner"] },
      { day: 9, title: "Saigon & Mekong", description: "Southern tastes", activities: ["Mekong cooking", "Fruit tasting", "Farewell dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 10, title: "Departure", description: "Sweet goodbye", activities: ["Vietnamese coffee", "Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["9 nights hotels", "Domestic flights", "Cruise", "All cooking classes", "Food tours", "Most meals"],
    excluded: ["International flights", "Drinks", "Tips"],
    imageUrl: "/tours/vietnam-culinary-journey-10d.jpg",
    rating: 9.5,
    reviewCount: 87,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/vietnam-culinary-journey-on-wheels-11-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68d3684d27f42.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67a5861bb72d1.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67a5861bb72d4.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67a5861bb72d5.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67a586069099f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67a58606909a0.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67a586069099e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67a5861bb72d6.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67a5861bb72d7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67a58612cc201.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67a58612cc204.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67a58612cc205.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67a58606909a1.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67a586069099b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/6899a99e39b74.png","https://d122axpxm39woi.cloudfront.net/images/tours/origin/67a5861bb72d4.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/67a586069099f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/67a586069099e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/67a5861bb72d7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/67a58612cc205.jpg"],
    pricingTiers: [{"category":"Superior 3*","price":1249},{"category":"First Class 4*","price":1439},{"category":"Deluxe 5*","price":1819}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 240,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Halong Bay", "Hue", "Hoi An", "Ho Chi Minh City", "Mekong Delta"],
    activities: ["food-tour", "cooking-class", "cultural", "cruise"],
  },

  // ============================================
  // BATCH 4: 30 MORE BESTPRICETRAVEL TOURS
  // ============================================

  // WELLNESS & SPA TOURS (5 tours)
  {
    id: "hoi-an-therapeutic-escape-5d",
    slug: "hoi-an-therapeutic-escape-5-days",
    name: "Hoi An Therapeutic Escape",
    category: "multi-day",
    location: "Hoi An",
    duration: "5 days, 4 nights",
    price: 1419,
    description: "Traditional Vietnamese healing with acupressure, herbal therapy, and ancient town exploration.",
    fullDescription: `
      <h3>Healing Journey</h3>
      <p>Experience authentic Vietnamese wellness traditions in the charming ancient town of Hoi An with expert therapeutic treatments.</p>
    `,
    highlights: ["Acupressure Therapy", "Herbal Treatments", "Ancient Town", "Cham Island", "Expert Consultations"],
    itinerary: [
      { day: 1, title: "Arrival", description: "Welcome to Hoi An", activities: ["Da Nang airport pickup", "Transfer to Hoi An resort", "Welcome consultation", "Evening ancient town walk"], meals: ["Dinner"] },
      { day: 2, title: "Therapy Day", description: "Full wellness program", activities: ["Morning yoga", "Acupressure session (90 min)", "Healthy lunch", "Herbal bath treatment", "Meditation session"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Cham Island", description: "Beach wellness", activities: ["Speedboat to Cham Island", "Beach relaxation", "Snorkeling", "Seaside massage", "Return to Hoi An"], meals: ["Breakfast", "Lunch"] },
      { day: 4, title: "Deep Healing", description: "Intensive treatments", activities: ["Tai chi sunrise", "Full body treatment (180 min)", "Organic lunch", "Cupping therapy", "Farewell dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 5, title: "Departure", description: "Peaceful farewell", activities: ["Morning meditation", "Final consultation", "Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["4 nights boutique hotel", "All treatments listed", "Airport transfers", "Daily breakfast", "Some meals", "Cham Island trip"],
    excluded: ["Flights", "Personal expenses", "Tips", "Additional treatments"],
    imageUrl: "/tours/hoi-an-therapeutic-escape-5d.jpg",
    rating: 10.0,
    reviewCount: 12,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/hoi-an-wellness-retreat-5-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67d1134cd9747.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67d1134cd9746.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67d113511409f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67d113465e921.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67d113511409b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67f5f81306ebd.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67f5fe9e0d7bb.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67f61c5d2ed40.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/67d1134cd9746.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/67d113465e921.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f9dafc681f3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/66cd3179db719.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/678f44c6ae2b9.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/66cd320e94af7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/66cd31d423636.jpg","https://d122axpxm39woi.cloudfront.net/assets/img/dcma.png"],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 120,
    startCity: "Da Nang",
    destinations: ["Hoi An", "Da Nang"],
    activities: ["spa", "cultural", "beach", "snorkeling"],
  },
  {
    id: "vietnam-natural-wonders-healing-8d",
    slug: "vietnam-natural-wonders-healing-8-days",
    name: "Vietnam Traditional Therapies & Natural Wonders",
    category: "multi-day",
    location: "Northern Vietnam",
    duration: "8 days, 7 nights",
    price: 1029,
    description: "Healing journey through Hanoi, Ninh Binh, and Halong Bay with traditional therapies and luxury cruise.",
    fullDescription: `
      <h3>Natural Healing</h3>
      <p>Combine Vietnam's stunning natural landscapes with traditional healing practices for a rejuvenating journey.</p>
    `,
    highlights: ["Traditional Therapies", "Halong Cruise", "Ninh Binh", "Spa Treatments", "Tai Chi"],
    itinerary: [
      { day: 1, title: "Hanoi Arrival", description: "Wellness welcome", activities: ["Airport pickup", "Transfer to spa hotel", "Welcome consultation", "Relaxation massage"], meals: ["Dinner"] },
      { day: 2, title: "Hanoi Healing", description: "Traditional medicine", activities: ["Morning tai chi", "Traditional medicine consultation", "Acupressure treatment", "Temple of Literature visit"], meals: ["Breakfast", "Lunch"] },
      { day: 3, title: "Ninh Binh", description: "Nature immersion", activities: ["Transfer to Ninh Binh", "Boat ride Trang An", "Cycling through rice fields", "Evening spa"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Halong Bay", description: "Luxury cruise begins", activities: ["Transfer to Halong", "Board luxury cruise", "Kayaking", "Onboard spa treatment", "Sunset dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 5, title: "Halong Morning", description: "Bay wellness", activities: ["Sunrise tai chi on deck", "Cave exploration", "Beach relaxation", "Return to Hanoi"], meals: ["Breakfast", "Brunch"] },
      { day: 6, title: "Hanoi Therapies", description: "Intensive day", activities: ["Cupping therapy", "Acupuncture session", "Healthy lunch", "Herbal treatment", "Old Quarter walk"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 7, title: "Final Treatments", description: "Deep relaxation", activities: ["Morning yoga", "Full body spa (3 hours)", "Shopping time", "Farewell dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 8, title: "Departure", description: "Renewed departure", activities: ["Final consultation", "Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["7 nights hotels/cruise", "All therapies", "Cruise", "Meals listed", "Transfers", "Guide"],
    excluded: ["International flights", "Personal expenses", "Tips"],
    imageUrl: "/tours/vietnam-therapy-wellness.jpg",
    rating: 9.8,
    reviewCount: 34,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/vietnam-natural-wonders-healing-8-days.html",
    durationHours: 192,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Ninh Binh", "Halong Bay"],
    activities: ["spa", "cruise", "cultural", "kayaking", "cycling"],
  },
  {
    id: "saigon-executive-wellness-5d",
    slug: "saigon-executive-wellness-retreat-5-days",
    name: "Saigon Executive Wellness Retreat",
    category: "multi-day",
    location: "Ho Chi Minh City",
    duration: "5 days, 4 nights",
    price: 1329,
    description: "Urban wellness program featuring massage, acupuncture, detox dining, and Can Gio mangrove relaxation.",
    fullDescription: `
      <h3>Urban Wellness</h3>
      <p>A premium wellness experience designed for busy executives seeking rejuvenation in Ho Chi Minh City.</p>
    `,
    highlights: ["Therapeutic Massage", "Acupuncture", "Detox Dining", "Can Gio Nature", "Executive Spa"],
    itinerary: [
      { day: 1, title: "Arrival", description: "Executive welcome", activities: ["Airport VIP pickup", "Premium hotel check-in", "Welcome spa treatment", "Healthy dinner"], meals: ["Dinner"] },
      { day: 2, title: "City Wellness", description: "Full treatment day", activities: ["Morning yoga", "Full body massage (120 min)", "Detox lunch", "Acupuncture session", "Evening city tour"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Can Gio", description: "Nature escape", activities: ["Transfer to Can Gio", "Mangrove boat tour", "Beach massage", "Seafood lunch", "Sunset relaxation"], meals: ["Breakfast", "Lunch"] },
      { day: 4, title: "Deep Healing", description: "Intensive spa", activities: ["Cupping therapy", "Hot stone massage", "Healthy lunch", "Vietnamese sauna", "Farewell dinner cruise"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 5, title: "Departure", description: "Refreshed departure", activities: ["Morning meditation", "Light breakfast", "Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["4 nights 5-star hotel", "All spa treatments", "Can Gio trip", "Meals listed", "VIP transfers"],
    excluded: ["Flights", "Personal expenses", "Tips", "Extra treatments"],
    imageUrl: "/tours/saigon-executive-wellness-5d.jpg",
    rating: 9.8,
    reviewCount: 28,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/saigon-wellness-retreat-5-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67d008beb7629.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67d008b0b5d76.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67f4ab657032c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67f4aab0d58ec.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67d008beb7628.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67d008b7e1273.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67d008b0b5d7a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67d008b0b5d79.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67d008b7e1276.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/67d008b0b5d76.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/67d008beb7628.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/67d008b0b5d7a.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f9e175ba28d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/66cd3179db719.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/678f44c6ae2b9.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/66cd320e94af7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/66cd31d423636.jpg","https://d122axpxm39woi.cloudfront.net/assets/img/dcma.png"],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 120,
    startCity: "Ho Chi Minh City",
    destinations: ["Ho Chi Minh City"],
    activities: ["spa", "boat-tour", "nature", "dining"],
  },
  {
    id: "vietnam-mountain-retreat-10d",
    slug: "vietnam-mountain-retreat-healing-10-days",
    name: "Vietnam Mountain Retreat & Healing",
    category: "multi-day",
    location: "Vietnam",
    duration: "10 days, 9 nights",
    price: 1029,
    description: "From Halong Bay to Pu Luong with yoga retreats, meditation, and premium health examinations.",
    fullDescription: `
      <h3>Mountain Healing</h3>
      <p>A comprehensive wellness journey combining Vietnam's mountain retreats with premium health treatments.</p>
    `,
    highlights: ["Pu Luong Retreat", "Yoga & Meditation", "Health Examinations", "Halong Cruise", "Mountain Wellness"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Wellness arrival", activities: ["Airport pickup", "Hotel check-in", "Initial consultation", "Welcome dinner"], meals: ["Dinner"] },
      { day: 2, title: "Health Check", description: "Medical day", activities: ["Premium health examination", "Doctor consultation", "Spa treatment", "Healthy dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Ninh Binh", description: "Nature start", activities: ["Transfer to Ninh Binh", "Trang An boat ride", "Temple visit", "Evening yoga"], meals: ["Breakfast", "Lunch"] },
      { day: 4, title: "Pu Luong", description: "Retreat begins", activities: ["Transfer to Pu Luong", "Eco-lodge check-in", "Nature walk", "Meditation session"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 5, title: "Pu Luong", description: "Full retreat", activities: ["Sunrise yoga", "Trekking to villages", "Waterfall visit", "Evening meditation"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 6, title: "Pu Luong", description: "Deep wellness", activities: ["Morning tai chi", "Traditional massage", "Rice terrace walk", "Sound healing"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 7, title: "Halong Bay", description: "Cruise begins", activities: ["Transfer to Halong", "Board luxury cruise", "Kayaking", "Sunset spa"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 8, title: "Halong Morning", description: "Bay wellness", activities: ["Sunrise yoga on deck", "Cave visit", "Swimming", "Return to Hanoi"], meals: ["Breakfast", "Brunch"] },
      { day: 9, title: "Hanoi Finale", description: "Final treatments", activities: ["Skin rejuvenation treatment", "Old Quarter walk", "Farewell dinner"], meals: ["Breakfast", "Dinner"] },
      { day: 10, title: "Departure", description: "Renewed", activities: ["Departure transfer"], meals: ["Breakfast"] }
    ],
    included: ["9 nights hotels/cruise/retreat", "Health examination", "All wellness activities", "Cruise", "Meals listed"],
    excluded: ["Flights", "Personal expenses", "Tips"],
    imageUrl: "/tours/pu-luong-trek.jpg",
    rating: 10.0,
    reviewCount: 18,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/vietnam-mountain-retreat-healing-10-days.html",
    durationHours: 240,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Ninh Binh", "Pu Luong", "Halong Bay"],
    activities: ["spa", "trekking", "cruise", "nature", "cultural"],
  },
  {
    id: "rejuvenate-vietnam-14d",
    slug: "rejuvenate-vietnam-heritage-healing-14-days",
    name: "Rejuvenate Vietnam: Heritage, Healing & Renewal",
    category: "multi-day",
    location: "Vietnam",
    duration: "14 days, 13 nights",
    price: 1029,
    description: "Premium wellness journey with aesthetic treatments, spa experiences, and cultural exploration.",
    fullDescription: `
      <h3>Ultimate Rejuvenation</h3>
      <p>A luxury wellness program combining Vietnam's best hospitals, spas, and cultural experiences.</p>
    `,
    highlights: ["Medical Aesthetics", "Luxury Spas", "Cultural Sites", "Premium Hotels", "Expert Care"],
    itinerary: [
      { day: 1, title: "Hanoi VIP", description: "Luxury arrival", activities: ["VIP airport pickup", "5-star hotel", "Welcome consultation", "Gourmet dinner"], meals: ["Dinner"] },
      { day: 2, title: "Health Assessment", description: "Medical day", activities: ["Comprehensive check-up", "Specialist consultations", "Spa treatment", "Fine dining"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Aesthetic Day", description: "Treatments", activities: ["Skin analysis", "Non-invasive treatments", "Recovery spa", "Light meals"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Halong Bay", description: "Luxury cruise", activities: ["Transfer to Halong", "5-star cruise", "Onboard spa", "Gourmet dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 5, title: "Halong Bay", description: "Continued cruise", activities: ["Sunrise yoga", "Kayaking", "Cave visit", "Return voyage"], meals: ["Breakfast", "Brunch"] },
      { day: 6, title: "Hanoi Recovery", description: "Rest day", activities: ["Gentle spa", "Old Quarter", "Cultural show"], meals: ["Breakfast", "Dinner"] },
      { day: 7, title: "Fly to Hue", description: "Imperial city", activities: ["Flight to Hue", "Citadel visit", "Royal spa treatment", "Imperial dinner"], meals: ["Breakfast", "Dinner"] },
      { day: 8, title: "Hue", description: "Heritage day", activities: ["Tomb visits", "Perfume River cruise", "Spa session"], meals: ["Breakfast", "Lunch"] },
      { day: 9, title: "Hoi An", description: "Ancient town", activities: ["Scenic transfer", "Ancient town tour", "Wellness resort check-in", "Beach spa"], meals: ["Breakfast", "Dinner"] },
      { day: 10, title: "Hoi An", description: "Beach wellness", activities: ["Sunrise yoga", "Full day spa package", "Lantern evening"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 11, title: "Saigon", description: "Southern arrival", activities: ["Flight to Saigon", "Premium hotel", "City orientation", "Spa treatment"], meals: ["Breakfast", "Dinner"] },
      { day: 12, title: "Saigon Wellness", description: "Final treatments", activities: ["Follow-up consultations", "Final aesthetic session", "Shopping", "Spa"], meals: ["Breakfast", "Lunch"] },
      { day: 13, title: "Mekong Delta", description: "Nature finale", activities: ["Day trip to Mekong", "Floating market", "Countryside relaxation", "Farewell gala"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 14, title: "Departure", description: "VIP farewell", activities: ["Final consultation", "VIP airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["13 nights 5-star hotels", "5-star cruise", "All treatments", "Domestic flights", "All meals", "VIP transfers"],
    excluded: ["International flights", "Personal shopping", "Tips"],
    imageUrl: "/tours/vietnam-luxury-10d.jpg",
    rating: 9.6,
    reviewCount: 8,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/rejuvenate-vietnam-14-days.html",
    durationHours: 336,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Halong Bay", "Hue", "Hoi An", "Ho Chi Minh City", "Mekong Delta"],
    activities: ["spa", "luxury", "cruise", "cultural", "dining"],
  },

  // NORTHERN VIETNAM TOURS (6 tours)
  {
    id: "best-northern-vietnam-6d",
    slug: "best-of-northern-vietnam-6-days",
    name: "Best of Northern Vietnam",
    category: "multi-day",
    location: "Northern Vietnam",
    duration: "6 days, 5 nights",
    price: 599,
    description: "Explore Hanoi, Ninh Binh, Sapa, and Halong Bay in this comprehensive northern adventure.",
    fullDescription: `
      <h3>Northern Highlights</h3>
      <p>Experience the best of Northern Vietnam from bustling Hanoi to misty Sapa mountains and stunning Halong Bay.</p>
    `,
    highlights: ["Hanoi Old Quarter", "Sapa Trekking", "Ninh Binh Landscapes", "Halong Bay Cruise"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Capital arrival", activities: ["Airport pickup", "Old Quarter walking tour", "Water puppet show", "Welcome dinner"], meals: ["Dinner"] },
      { day: 2, title: "Sapa", description: "Mountain journey", activities: ["Morning train arrival", "Cat Cat village trek", "Local market", "Homestay evening"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Sapa Trekking", description: "Village visits", activities: ["Sunrise views", "Rice terrace trek", "Hmong village visit", "Return to Hanoi"], meals: ["Breakfast", "Lunch"] },
      { day: 4, title: "Ninh Binh", description: "Dry Halong", activities: ["Transfer to Ninh Binh", "Tam Coc boat ride", "Mua Cave climb", "Countryside cycling"], meals: ["Breakfast", "Lunch"] },
      { day: 5, title: "Halong Bay", description: "Bay cruise", activities: ["Transfer to Halong", "Cruise boarding", "Kayaking", "Sunset dinner on deck"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 6, title: "Halong - Departure", description: "Final morning", activities: ["Sunrise tai chi", "Cave visit", "Return to Hanoi", "Airport transfer"], meals: ["Breakfast", "Brunch"] }
    ],
    included: ["5 nights hotels/cruise/homestay", "Day cruise", "All transfers", "Meals listed", "Guide", "Entrance fees"],
    excluded: ["Flights", "Train ticket", "Tips", "Personal expenses"],
    imageUrl: "/tours/best-northern-vietnam-6d.jpg",
    rating: 9.4,
    reviewCount: 156,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/best-of-northern-vietnam-6-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66cd320e94af7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c29e263e1b8.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c29e263e1b9.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c29e0e3e800.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e987f9d970.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00222a6d20.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e0019f1c00f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e98708c224.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00222a6d1f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e0019f1c00e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e0019f1c010.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e0019f1c011.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00222a6d21.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c29e0e3e801.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c29e0e3e7fd.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c29e263e1b5.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e984a1fb07.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e0019f1c006.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e0019f1c00a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e0019f1c00c.jpg"],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 144,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Sapa", "Ninh Binh", "Halong Bay"],
    activities: ["trekking", "cruise", "cycling", "cultural", "nature"],
  },
  {
    id: "hanoi-halong-ninh-binh-4d",
    slug: "hanoi-halong-ninh-binh-4-days",
    name: "Hanoi, Halong & Ninh Binh Express",
    category: "multi-day",
    location: "Northern Vietnam",
    duration: "4 days, 3 nights",
    price: 80,
    description: "Quick northern escape featuring Hanoi's charm, Halong Bay cruise, and Ninh Binh's landscapes.",
    fullDescription: `
      <h3>Northern Express</h3>
      <p>Perfect for travelers with limited time wanting to experience northern Vietnam's top highlights.</p>
    `,
    highlights: ["Hanoi City Tour", "Halong Bay Cruise", "Ninh Binh Tam Coc", "Mua Cave Viewpoint"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Capital exploration", activities: ["Airport pickup", "Ho Chi Minh Mausoleum", "Temple of Literature", "Old Quarter tour", "Street food dinner"], meals: ["Dinner"] },
      { day: 2, title: "Halong Bay", description: "Cruise adventure", activities: ["Early transfer", "Cruise boarding", "Lunch on board", "Kayaking & swimming", "Overnight on bay"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Halong - Ninh Binh", description: "Landscapes", activities: ["Sunrise tai chi", "Cave visit", "Transfer to Ninh Binh", "Tam Coc boat ride", "Mua Cave sunset"], meals: ["Breakfast", "Brunch", "Dinner"] },
      { day: 4, title: "Ninh Binh - Departure", description: "Final morning", activities: ["Bich Dong Pagoda", "Cycling villages", "Lunch", "Airport transfer"], meals: ["Breakfast", "Lunch"] }
    ],
    included: ["3 nights hotels/cruise", "Overnight cruise", "All transfers", "Meals listed", "Guide"],
    excluded: ["Flights", "Tips", "Drinks", "Personal expenses"],
    imageUrl: "/tours/hanoi-halong-ninh-binh-4d.jpg",
    rating: 9.3,
    reviewCount: 89,
    affiliateUrl: "https://www.bestpricetravel.com/ninh-binh-tours/ninh-binh-hoa-lu-trang-an-full-day-private-tour.html",
    durationHours: 96,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Halong Bay", "Ninh Binh"],
    activities: ["cruise", "kayaking", "cycling", "cultural", "cave-exploration"],
  },
  {
    id: "sapa-fansipan-adventure-3d",
    slug: "sapa-fansipan-adventure-3-days",
    name: "Sapa & Fansipan Adventure",
    category: "multi-day",
    location: "Sapa",
    duration: "3 days, 2 nights",
    price: 1599,
    description: "Conquer Indochina's highest peak and explore ethnic minority villages in misty Sapa.",
    fullDescription: `
      <h3>Roof of Indochina</h3>
      <p>Trek to Fansipan summit and immerse in the colorful culture of Sapa's hill tribes.</p>
    `,
    highlights: ["Fansipan Peak", "Cable Car Ride", "Village Trekking", "Rice Terraces", "Local Markets"],
    itinerary: [
      { day: 1, title: "Hanoi - Sapa", description: "Journey begins", activities: ["Early morning pickup", "Scenic drive to Sapa", "Check-in & lunch", "Cat Cat village walk", "Night market"], meals: ["Lunch", "Dinner"] },
      { day: 2, title: "Fansipan", description: "Summit day", activities: ["Breakfast", "Cable car to Fansipan", "Summit trek", "Temple complex visit", "Return to Sapa", "Local dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Sapa - Hanoi", description: "Village farewell", activities: ["Sunrise over terraces", "Lao Chai village trek", "Ta Van village", "Lunch", "Return to Hanoi"], meals: ["Breakfast", "Lunch"] }
    ],
    included: ["2 nights hotel", "Fansipan cable car", "All transfers", "Meals listed", "Guide", "Trekking permit"],
    excluded: ["Flights/train", "Tips", "Personal expenses"],
    imageUrl: "/tours/sapa-fansipan-adventure-3d.jpg",
    rating: 9.5,
    reviewCount: 67,
    affiliateUrl: "https://www.bestpricetravel.com/halong-sapa-tours/halong-bay-sapa-luxury-5-days-private-tour.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643391fdd55f8.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643391ceb3d01.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643391ceb3cfe.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643391ceb3d00.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643391fdd55fb.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643391ceb3cfc.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643391ceb3cfd.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/642ba5439954f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/643391fdd55fb.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/643391ceb3cfd.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/64339682841a5.jpg","https://d122axpxm39woi.cloudfront.net/assets/img/dcma.png"],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 72,
    startCity: "Hanoi",
    destinations: ["Sapa", "Fansipan"],
    activities: ["trekking", "cable-car", "cultural", "nature", "photography"],
  },
  {
    id: "ha-giang-loop-adventure-4d",
    slug: "ha-giang-loop-adventure-4-days",
    name: "Ha Giang Loop Adventure",
    category: "multi-day",
    location: "Ha Giang",
    duration: "4 days, 3 nights",
    price: 198,
    description: "Epic motorcycle journey through Vietnam's most dramatic mountain scenery and remote villages.",
    fullDescription: `
      <h3>Ultimate Loop</h3>
      <p>Experience the legendary Ha Giang loop with stunning mountain passes and authentic highland culture.</p>
    `,
    highlights: ["Ma Pi Leng Pass", "Dong Van Karst", "Lung Cu Flag Tower", "Ethnic Villages", "Mountain Roads"],
    itinerary: [
      { day: 1, title: "Hanoi - Ha Giang", description: "Journey north", activities: ["Morning pickup", "Scenic drive", "Arrive Ha Giang", "City exploration", "Briefing for loop"], meals: ["Lunch", "Dinner"] },
      { day: 2, title: "Ha Giang - Dong Van", description: "Into the mountains", activities: ["Early start", "Quan Ba Heaven Gate", "Yen Minh market", "Lung Cu Flag Tower", "Dong Van town"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Dong Van - Meo Vac", description: "Ma Pi Leng", activities: ["Dong Van market", "Ma Pi Leng Pass", "Nho Que River views", "Meo Vac town", "Local homestay"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Meo Vac - Hanoi", description: "Return journey", activities: ["Morning village visit", "Scenic drive back", "Lunch stop", "Arrive Hanoi evening"], meals: ["Breakfast", "Lunch"] }
    ],
    included: ["3 nights hotels/homestay", "Transportation", "All meals listed", "Guide", "Entrance fees"],
    excluded: ["Motorbike rental (optional)", "Tips", "Drinks", "Personal expenses"],
    imageUrl: "/tours/ha-giang-loop-adventure-4d.jpg",
    rating: 9.7,
    reviewCount: 134,
    affiliateUrl: "https://www.bestpricetravel.com/ha-giang-tours/ha-giang-loop-on-motorbike-4-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68ecbbb2f1ab2.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/63d8731a10640.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c77e7a8f134.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/63d8731a1063d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/63d8731a10643.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/63d8731a10646.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/63d8731a1063f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68ca7a7fd9777.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c77c5af3b54.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c77d5161ec0.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c77db0baea0.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68ca7a7fd9778.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c77db0baea3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/68ecbeebcf900.png","https://d122axpxm39woi.cloudfront.net/images/tours/origin/68c77e7a8f134.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/63d8731a1063f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/68c77db0baea0.jpg","https://d122axpxm39woi.cloudfront.net/images/review/250_170/68de4d89589be.jpg","https://d122axpxm39woi.cloudfront.net/images/review/250_170/68b7b996bec6a.jpg","https://d122axpxm39woi.cloudfront.net/images/review/250_170/68b7b996bec6c.jpg"],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 96,
    startCity: "Hanoi",
    destinations: ["Ha Giang", "Dong Van", "Meo Vac", "Yen Minh"],
    activities: ["adventure", "motorbike", "cultural", "photography", "nature"],
  },
  {
    id: "ba-be-lake-ban-gioc-5d",
    slug: "ba-be-lake-ban-gioc-waterfall-5-days",
    name: "Ba Be Lake & Ban Gioc Waterfall",
    category: "multi-day",
    location: "Northeast Vietnam",
    duration: "5 days, 4 nights",
    price: 721,
    description: "Discover Vietnam's largest natural lake and Asia's fourth-largest waterfall in this off-the-beaten-path adventure.",
    fullDescription: `
      <h3>Natural Wonders</h3>
      <p>Explore remote northeast Vietnam with pristine Ba Be Lake and magnificent Ban Gioc Falls.</p>
    `,
    highlights: ["Ba Be Lake", "Ban Gioc Waterfall", "Nguom Ngao Cave", "Tay Villages", "Boat Cruises"],
    itinerary: [
      { day: 1, title: "Hanoi - Ba Be", description: "Lake bound", activities: ["Morning departure", "Scenic drive", "Arrive Ba Be", "Lakeside homestay", "Sunset boat ride"], meals: ["Lunch", "Dinner"] },
      { day: 2, title: "Ba Be Exploration", description: "Lake day", activities: ["Boat to Puong Cave", "Dau Dang Waterfall", "Tay village visit", "Swimming", "Cultural evening"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Ba Be - Cao Bang", description: "Northeast journey", activities: ["Morning on lake", "Transfer to Cao Bang", "City exploration", "Local market"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Ban Gioc Waterfall", description: "Waterfall day", activities: ["Early departure", "Ban Gioc Waterfall", "Nguom Ngao Cave", "Border views", "Return Cao Bang"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 5, title: "Cao Bang - Hanoi", description: "Return", activities: ["Scenic drive", "Lunch stop", "Arrive Hanoi evening"], meals: ["Breakfast", "Lunch"] }
    ],
    included: ["4 nights hotels/homestay", "All transfers", "Boat trips", "Meals listed", "Guide", "Entrance fees"],
    excluded: ["Tips", "Drinks", "Personal expenses"],
    imageUrl: "/tours/ba-be-lake-ban-gioc-5d.jpg",
    rating: 9.4,
    reviewCount: 45,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/ba-be-lake-ban-gioc-waterfall-5-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e1463eede4a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e1463eede41.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665ec13211f0b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665ec14179325.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e1463eede48.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e1463eede43.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665ec1525f844.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e1463eede44.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e1463eede49.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e1463eede45.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e1463eede46.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e1463eede47.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/northeast-vietnam:-ba-be-lake-&-ban-gioc-waterfall-5-days-649d3ac4eccfc.png","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65e1463eede41.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65e1463eede43.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65e1463eede44.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65e1463eede45.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65e1463eede47.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65e1463eede46.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/66cd320e94af7.jpg"],
    pricingTiers: [{"category":"Economy","price":819}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 120,
    startCity: "Hanoi",
    destinations: ["Ba Be", "Cao Bang", "Ban Gioc"],
    activities: ["boat-tour", "nature", "cave-exploration", "cultural", "swimming"],
  },
  {
    id: "mai-chau-pu-luong-escape-3d",
    slug: "mai-chau-pu-luong-escape-3-days",
    name: "Mai Chau & Pu Luong Escape",
    category: "multi-day",
    location: "Mai Chau",
    duration: "3 days, 2 nights",
    price: 450,
    description: "Peaceful retreat to stilt houses, rice terraces, and authentic Thai village life.",
    fullDescription: `
      <h3>Valley Retreat</h3>
      <p>Escape to the serene valleys of Mai Chau and Pu Luong for authentic rural Vietnam experiences.</p>
    `,
    highlights: ["Stilt House Stay", "Rice Terraces", "Village Cycling", "Waterfall Trek", "Traditional Dance"],
    itinerary: [
      { day: 1, title: "Hanoi - Mai Chau", description: "Valley arrival", activities: ["Morning pickup", "Scenic drive", "Arrive Mai Chau", "Village walk", "Stilt house check-in", "Traditional dance show"], meals: ["Lunch", "Dinner"] },
      { day: 2, title: "Pu Luong", description: "Nature day", activities: ["Transfer to Pu Luong", "Rice terrace trek", "Waterfall swim", "Village lunch", "Cycling through valleys", "Eco-lodge evening"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Pu Luong - Hanoi", description: "Farewell", activities: ["Morning walk", "Brunch", "Scenic return drive", "Arrive Hanoi afternoon"], meals: ["Breakfast", "Brunch"] }
    ],
    included: ["2 nights stilt house/eco-lodge", "All transfers", "Cycling", "Meals listed", "Guide"],
    excluded: ["Tips", "Drinks", "Personal expenses"],
    imageUrl: "/tours/mai-chau-pu-luong-escape-3d.jpg",
    rating: 9.3,
    reviewCount: 78,
    affiliateUrl: "https://www.bestpricetravel.com/hanoi-tours/mai-chau-to-pu-luong-mountain-escape-3-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68245cd764e79.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68245ce27d1c6.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68245ce27d1c7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68245ce27d1c8.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68245ce27d1c4.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68245cd764e7e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68245cd764e7f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68245cd764e7c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68245cd764e7d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/689aa2a44306a.png","https://d122axpxm39woi.cloudfront.net/images/tours/origin/68245ce27d1c6.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/68245cd764e7f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/68245cd764e7d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/6824604dd50bb.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/5ef6a7ed3796e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/68343776bcf69.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/657fc8f8b206f.jpg","https://d122axpxm39woi.cloudfront.net/assets/img/dcma.png"],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 72,
    startCity: "Hanoi",
    destinations: ["Mai Chau", "Pu Luong"],
    activities: ["homestay", "cycling", "trekking", "cultural", "nature"],
  },

  // CENTRAL VIETNAM TOURS (6 tours)
  {
    id: "central-vietnam-discovery-5d",
    slug: "central-vietnam-discovery-5-days",
    name: "Central Vietnam Discovery",
    category: "multi-day",
    location: "Central Vietnam",
    duration: "5 days, 4 nights",
    price: 289,
    description: "Explore Da Nang, Hoi An ancient town, and Imperial Hue with beaches and culture.",
    fullDescription: `
      <h3>Central Gems</h3>
      <p>Discover the heart of Vietnam with ancient towns, imperial citadels, and pristine beaches.</p>
    `,
    highlights: ["Hoi An Ancient Town", "Hue Imperial Citadel", "My Son Sanctuary", "Marble Mountains", "Beaches"],
    itinerary: [
      { day: 1, title: "Da Nang Arrival", description: "Beach city", activities: ["Airport pickup", "Hotel check-in", "Marble Mountains visit", "My Khe Beach", "Dragon Bridge night show"], meals: ["Dinner"] },
      { day: 2, title: "Hoi An", description: "Ancient town", activities: ["Transfer to Hoi An", "Ancient town walking tour", "Japanese Bridge", "Cooking class", "Lantern evening"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "My Son & Hoi An", description: "Heritage day", activities: ["My Son Sanctuary sunrise", "Cham history tour", "Return Hoi An", "Free afternoon", "Night market"], meals: ["Breakfast", "Lunch"] },
      { day: 4, title: "Hue", description: "Imperial city", activities: ["Scenic Hai Van Pass drive", "Imperial Citadel tour", "Thien Mu Pagoda", "Royal tombs", "Perfume River dinner cruise"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 5, title: "Hue - Departure", description: "Farewell", activities: ["Morning market visit", "Conical hat village", "Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["4 nights hotels", "All transfers", "Cooking class", "Dinner cruise", "Meals listed", "Guide"],
    excluded: ["Flights", "Tips", "Personal expenses"],
    imageUrl: "/tours/central-vietnam-discovery-5d.jpg",
    rating: 9.5,
    reviewCount: 112,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/a-glimpse-of-the-central-vietnam-5-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/674d6e0d40918.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b709172df3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666b41709b20.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666b424ccc2a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b709172dfa.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b709172df5.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b709172df4.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b709172df9.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b709172df6.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b709172df7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b709172df1.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666b435149ca.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b709172df2.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b709172def.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666b445e039f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/a-glimpse-of-central-vietnam-5-days-64b4c48c89844.png","https://d122axpxm39woi.cloudfront.net/images/tours/origin/660b709172df3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/660b709172df4.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/660b709172df5.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/660b709172df6.jpg"],
    pricingTiers: [{"category":"Superior (3*)","price":339},{"category":"First Class (4*)","price":389}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 120,
    startCity: "Da Nang",
    destinations: ["Da Nang", "Hoi An", "Hue"],
    activities: ["cultural", "cooking-class", "historical", "beach", "photography"],
  },
  {
    id: "hoi-an-memories-show-tour",
    slug: "hoi-an-memories-show-tour",
    name: "Hoi An Memories Show Experience",
    category: "day-trip",
    location: "Hoi An",
    duration: "Half day",
    price: 24,
    description: "Spectacular outdoor show depicting 400 years of Hoi An history on the largest stage in Vietnam.",
    fullDescription: `
      <h3>Living History</h3>
      <p>Experience Vietnam's largest outdoor performance showcasing Hoi An's rich trading port history.</p>
    `,
    highlights: ["Largest Stage in Vietnam", "500+ Performers", "Visual Effects", "Historical Story", "Riverside Setting"],
    itinerary: [
      { day: 1, title: "Evening Show", description: "Cultural spectacle", activities: ["Hotel pickup", "Transfer to venue", "Pre-show dinner (optional)", "Hoi An Memories show", "Return to hotel"], meals: [] }
    ],
    included: ["Show ticket", "Hotel transfers", "English guide"],
    excluded: ["Dinner", "Drinks", "Tips"],
    imageUrl: "/tours/hoi-an-memories-show-tour.jpg",
    rating: 9.6,
    reviewCount: 234,
    affiliateUrl: "https://www.bestpricetravel.com/hoi-an-tours/hoi-an-memories-show-ticket.html",
    durationHours: 4,
    startCity: "Hoi An",
    destinations: ["Hoi An"],
    activities: ["entertainment", "cultural"],
  },
  {
    id: "hue-dmz-day-tour",
    slug: "hue-dmz-day-tour",
    name: "Hue DMZ Historical Tour",
    category: "day-trip",
    location: "Hue",
    duration: "1 day",
    price: 93,
    description: "Visit the Vietnam War's Demilitarized Zone including Vinh Moc Tunnels and Khe Sanh.",
    fullDescription: `
      <h3>War History</h3>
      <p>Explore the significant sites of the Vietnam War along the former border between North and South Vietnam.</p>
    `,
    highlights: ["Vinh Moc Tunnels", "Khe Sanh Combat Base", "17th Parallel Bridge", "Rockpile", "War Museums"],
    itinerary: [
      { day: 1, title: "DMZ Tour", description: "Historical journey", activities: ["Early hotel pickup", "Drive to DMZ", "Vinh Moc Tunnels", "Lunch", "Khe Sanh base", "Rockpile viewpoint", "Ben Hai River", "Return to Hue"], meals: ["Lunch"] }
    ],
    included: ["Transportation", "Entrance fees", "Lunch", "English guide"],
    excluded: ["Tips", "Drinks", "Personal expenses"],
    imageUrl: "/tours/hue-dmz-day-tour.jpg",
    rating: 9.3,
    reviewCount: 89,
    affiliateUrl: "https://www.bestpricetravel.com/hue-tours/hue-dmz-full-day-tour.html",
    durationHours: 10,
    startCity: "Hue",
    destinations: ["DMZ", "Hue"],
    activities: ["historical", "educational", "cultural"],
  },
  {
    id: "ba-na-hills-day-trip",
    slug: "ba-na-hills-golden-bridge-day-trip",
    name: "Ba Na Hills & Golden Bridge Day Trip",
    category: "day-trip",
    location: "Da Nang",
    duration: "1 day",
    price: 1029,
    description: "Visit the famous Golden Bridge held by giant stone hands and explore the French village at Ba Na Hills.",
    fullDescription: `
      <h3>Mountain Fantasy</h3>
      <p>Take the world's longest cable car to Ba Na Hills for the iconic Golden Bridge and theme park adventures.</p>
    `,
    highlights: ["Golden Bridge", "French Village", "Cable Car", "Fantasy Park", "Linh Ung Pagoda"],
    itinerary: [
      { day: 1, title: "Ba Na Hills", description: "Mountain adventure", activities: ["Morning pickup", "World's longest cable car", "Golden Bridge photos", "French Village exploration", "Lunch", "Fantasy Park", "Evening return"], meals: ["Lunch"] }
    ],
    included: ["Transportation", "Cable car ticket", "Entrance fee", "Lunch", "Guide"],
    excluded: ["Tips", "Game tokens", "Personal expenses"],
    imageUrl: "/tours/danang-4days.jpg",
    rating: 9.4,
    reviewCount: 312,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/ba-na-hills-golden-bridge-day-trip.html",
    durationHours: 10,
    startCity: "Da Nang",
    destinations: ["Ba Na Hills", "Da Nang"],
    activities: ["cable-car", "sightseeing", "photography", "entertainment"],
  },
  {
    id: "hoi-an-countryside-cycling",
    slug: "hoi-an-countryside-cycling-tour",
    name: "Hoi An Countryside Cycling Tour",
    category: "day-trip",
    location: "Hoi An",
    duration: "Half day",
    price: 789,
    description: "Peaceful cycling through rice paddies, villages, and along the river to experience rural Vietnam.",
    fullDescription: `
      <h3>Rural Cycling</h3>
      <p>Escape the ancient town for a leisurely ride through Hoi An's beautiful countryside.</p>
    `,
    highlights: ["Rice Paddies", "Water Buffalo", "Village Life", "River Scenery", "Local Snacks"],
    itinerary: [
      { day: 1, title: "Cycling Tour", description: "Countryside ride", activities: ["Hotel pickup", "Bike fitting", "Tra Que village", "Rice paddy paths", "Local snack stop", "Boat ride back", "Return to hotel"], meals: ["Snacks"] }
    ],
    included: ["Bicycle", "Guide", "Snacks", "Boat ride", "Water"],
    excluded: ["Tips", "Lunch", "Personal expenses"],
    imageUrl: "/tours/hoi-an-countryside-cycling.jpg",
    rating: 9.2,
    reviewCount: 156,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/hue-to-hoi-an-cycling-journey-4-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67a5dead7627b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67a5debc66d5c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67a5dead7627a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67a5dead76278.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67a5debc66d56.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67a5debc66d59.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67a5dead7627d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67a5dead7627c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67a5debc66d5a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67a5debc66d5b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/6899ab335b790.png","https://d122axpxm39woi.cloudfront.net/images/tours/origin/67a5dead7627a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/67a5dead76278.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/67a5debc66d59.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/67a5dead7627c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/667bcbd463d35.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/674d6b9682e0e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/667bd715a9ae2.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/68d39d80577ab.jpg","https://d122axpxm39woi.cloudfront.net/assets/img/dcma.png"],
    pricingTiers: [{"category":"Standard Hotels","price":789},{"category":"Deluxe Hotels","price":1339}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 4,
    startCity: "Hoi An",
    destinations: ["Hoi An"],
    activities: ["cycling", "nature", "cultural", "boat-tour"],
  },
  {
    id: "phong-nha-cave-2d",
    slug: "phong-nha-cave-adventure-2-days",
    name: "Phong Nha Cave Adventure",
    category: "multi-day",
    location: "Phong Nha",
    duration: "2 days, 1 night",
    price: 269,
    description: "Explore Vietnam's most spectacular caves including Paradise Cave and Phong Nha Cave.",
    fullDescription: `
      <h3>Cave Kingdom</h3>
      <p>Discover the UNESCO World Heritage caves of Phong Nha-Ke Bang National Park.</p>
    `,
    highlights: ["Paradise Cave", "Phong Nha Cave", "Dark Cave", "Boat Journey", "National Park"],
    itinerary: [
      { day: 1, title: "Arrival & Caves", description: "Cave exploration", activities: ["Train/flight arrival", "Transfer to Phong Nha", "Paradise Cave visit", "Hotel check-in", "Sunset at Pub with Cold Beer"], meals: ["Lunch", "Dinner"] },
      { day: 2, title: "Phong Nha & Dark Cave", description: "Adventure day", activities: ["Phong Nha Cave by boat", "Dark Cave zipline & kayak", "Mud bathing", "Lunch", "Departure transfer"], meals: ["Breakfast", "Lunch"] }
    ],
    included: ["1 night hotel", "All cave entries", "Boat trips", "Transfers", "Meals listed", "Guide"],
    excluded: ["Train/flight to Dong Hoi", "Tips", "Dark Cave activities (optional)"],
    imageUrl: "/tours/phong-nha-cave-2d.jpg",
    rating: 9.6,
    reviewCount: 98,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/phong-nha-cave-dmz-4-days.html",
    durationHours: 48,
    startCity: "Hue",
    destinations: ["Phong Nha"],
    activities: ["cave-exploration", "kayaking", "boat-tour", "adventure", "nature"],
  },

  // SOUTHERN VIETNAM TOURS (6 tours)
  {
    id: "mekong-delta-authentic-2d",
    slug: "mekong-delta-authentic-experience-2-days",
    name: "Mekong Delta Authentic Experience",
    category: "multi-day",
    location: "Mekong Delta",
    duration: "2 days, 1 night",
    price: 199,
    description: "Immersive Mekong experience with floating markets, sampan rides, and homestay.",
    fullDescription: `
      <h3>Delta Life</h3>
      <p>Experience authentic Mekong Delta living with local families and traditional waterway culture.</p>
    `,
    highlights: ["Cai Rang Floating Market", "Sampan Boat Rides", "Fruit Orchards", "Homestay", "Local Cooking"],
    itinerary: [
      { day: 1, title: "Saigon - Can Tho", description: "Delta journey", activities: ["Morning pickup", "My Tho visit", "Boat through canals", "Coconut candy workshop", "Ben Tre orchards", "Continue to Can Tho", "Homestay dinner"], meals: ["Lunch", "Dinner"] },
      { day: 2, title: "Floating Market - Saigon", description: "Market morning", activities: ["Pre-dawn Cai Rang market", "Breakfast on boat", "Fruit tasting", "Noodle factory", "Return to Saigon"], meals: ["Breakfast", "Lunch"] }
    ],
    included: ["1 night homestay", "All boat trips", "Meals listed", "Transfers", "Guide"],
    excluded: ["Tips", "Drinks", "Personal expenses"],
    imageUrl: "/tours/mekong-delta-authentic-2d.jpg",
    rating: 9.4,
    reviewCount: 187,
    affiliateUrl: "https://www.bestpricetravel.com/mekong-delta-tours/authentic-mekong-delta-2-days-with-homestay-ben-tre-tra-vinh.html",
    durationHours: 48,
    startCity: "Ho Chi Minh City",
    destinations: ["Mekong Delta", "Can Tho", "Ben Tre"],
    activities: ["boat-tour", "homestay", "cultural", "market-visit", "cooking-class"],
  },
  {
    id: "cu-chi-mekong-combo",
    slug: "cu-chi-tunnels-mekong-delta-day-tour",
    name: "Cu Chi Tunnels & Mekong Delta Combo",
    category: "day-trip",
    location: "Ho Chi Minh City",
    duration: "1 day",
    price: 79,
    description: "Full day combining wartime tunnels with peaceful Mekong waterways.",
    fullDescription: `
      <h3>History & Nature</h3>
      <p>Experience Vietnam's wartime history in the morning and peaceful delta life in the afternoon.</p>
    `,
    highlights: ["Cu Chi Tunnels", "War History", "Mekong Boat Ride", "Local Industries", "Fruit Tasting"],
    itinerary: [
      { day: 1, title: "Combo Tour", description: "Full day", activities: ["Hotel pickup", "Cu Chi Tunnels visit", "Tunnel exploration", "Lunch", "Transfer to Mekong", "Boat ride", "Coconut island", "Return to Saigon"], meals: ["Lunch"] }
    ],
    included: ["Transportation", "Entrance fees", "Lunch", "Boat trip", "Guide"],
    excluded: ["Tips", "Drinks", "Personal expenses"],
    imageUrl: "/tours/cu-chi-mekong-combo.jpg",
    rating: 9.3,
    reviewCount: 445,
    affiliateUrl: "https://www.bestpricetravel.com/mekong-delta-tours/cu-chi-tunnels-mekong-delta-day-trip.html",
    durationHours: 10,
    startCity: "Ho Chi Minh City",
    destinations: ["Cu Chi", "Mekong Delta"],
    activities: ["historical", "boat-tour", "cultural", "educational"],
  },
  {
    id: "phu-quoc-island-escape-4d",
    slug: "phu-quoc-island-escape-4-days",
    name: "Phu Quoc Island Escape",
    category: "multi-day",
    location: "Phu Quoc",
    duration: "4 days, 3 nights",
    price: 559,
    description: "Beach paradise with snorkeling, fishing villages, and sunset cruises.",
    fullDescription: `
      <h3>Island Paradise</h3>
      <p>Relax on Vietnam's most beautiful island with pristine beaches and tropical activities.</p>
    `,
    highlights: ["Beach Resorts", "Snorkeling", "Fishing Villages", "Sunset Cruise", "Night Market"],
    itinerary: [
      { day: 1, title: "Arrival", description: "Island welcome", activities: ["Airport pickup", "Resort check-in", "Beach time", "Sunset at Long Beach", "Night market dinner"], meals: ["Dinner"] },
      { day: 2, title: "South Island", description: "Exploration", activities: ["Cable car to Hon Thom", "Beach hopping", "Fishing village visit", "Pepper farm", "Seafood dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Snorkeling Tour", description: "Sea adventure", activities: ["Boat to islands", "Snorkeling spots", "Beach BBQ lunch", "More snorkeling", "Sunset cruise return"], meals: ["Breakfast", "Lunch"] },
      { day: 4, title: "Departure", description: "Beach farewell", activities: ["Beach morning", "Spa treatment (optional)", "Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["3 nights beach resort", "Snorkeling trip", "Cable car", "Meals listed", "Transfers"],
    excluded: ["Flights", "Spa", "Tips", "Personal expenses"],
    imageUrl: "/tours/phu-quoc-island-escape-4d.jpg",
    rating: 9.5,
    reviewCount: 156,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/south-vietnam-phu-quoc-saigon-6-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/678f5a4c70d46.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a195e70d9.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a195e70db.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a195e70dc.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a195e70dd.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a1d96fa6b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a1d96fa6d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a1d96fa6f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a1d96fa70.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a1d96fa71.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a1ff887a7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a1ff887a9.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/641bb4ac18b9c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d344a12647.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d345c2cba5.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/66d916cbe1071.png","https://d122axpxm39woi.cloudfront.net/images/tours/origin/641bb4ac18b9c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/6380465c3c841.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f4e817979d9.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f72988deaf6.jpg"],
    pricingTiers: [{"category":"Superior 3* Hotels","price":559},{"category":"First Class 4* Hotels","price":699},{"category":"Deluxe 5* Hotels","price":899}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 96,
    startCity: "Phu Quoc",
    destinations: ["Phu Quoc", "Hon Thom Island"],
    activities: ["beach", "snorkeling", "cable-car", "boat-tour", "nature"],
  },
  {
    id: "saigon-street-food-night-tour",
    slug: "saigon-street-food-night-tour",
    name: "Saigon Street Food Night Tour",
    category: "day-trip",
    location: "Ho Chi Minh City",
    duration: "4 hours",
    price: 62,
    description: "Vespa adventure through Saigon's vibrant night food scene with local guide.",
    fullDescription: `
      <h3>Night Food Safari</h3>
      <p>Explore Saigon's best street food spots by Vespa with an experienced local foodie guide.</p>
    `,
    highlights: ["Vespa Ride", "10+ Food Stops", "Local Districts", "Hidden Gems", "Cold Beer"],
    itinerary: [
      { day: 1, title: "Food Tour", description: "Night adventure", activities: ["Evening pickup", "Vespa introduction", "District 4 seafood", "Chinatown snacks", "Street BBQ", "Dessert stop", "Return to hotel"], meals: ["Multiple tastings"] }
    ],
    included: ["Vespa & driver", "All food tastings", "Drinks", "Guide"],
    excluded: ["Tips", "Extra food"],
    imageUrl: "/tours/saigon-street-food-night-tour.jpg",
    rating: 9.7,
    reviewCount: 523,
    affiliateUrl: "https://www.bestpricetravel.com/ho-chi-minh-city-tours/saigon-by-night-jeep-adventure-street-food-delights.html",
    durationHours: 4,
    startCity: "Ho Chi Minh City",
    destinations: ["Ho Chi Minh City"],
    activities: ["food-tour", "vespa-tour", "cultural", "city-tour"],
  },
  {
    id: "dalat-highlands-3d",
    slug: "dalat-highlands-adventure-3-days",
    name: "Dalat Highlands Adventure",
    category: "multi-day",
    location: "Da Lat",
    duration: "3 days, 2 nights",
    price: 1029,
    description: "Cool mountain retreat with waterfalls, canyoning, and flower gardens.",
    fullDescription: `
      <h3>Highland Escape</h3>
      <p>Discover Vietnam's romantic highland town with adventure activities and French colonial charm.</p>
    `,
    highlights: ["Canyoning Adventure", "Waterfalls", "Flower Gardens", "Coffee Plantations", "French Architecture"],
    itinerary: [
      { day: 1, title: "Arrival", description: "Highland welcome", activities: ["Airport/station pickup", "Hotel check-in", "Crazy House visit", "Flower gardens", "Night market dinner"], meals: ["Dinner"] },
      { day: 2, title: "Canyoning", description: "Adventure day", activities: ["Full day canyoning", "Waterfall rappelling", "Cliff jumping", "Zip-lining", "Cave swim", "BBQ dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Nature & Coffee", description: "Farewell", activities: ["Coffee plantation", "Elephant waterfall", "Silk factory", "Departure transfer"], meals: ["Breakfast", "Lunch"] }
    ],
    included: ["2 nights hotel", "Canyoning tour", "All transfers", "Meals listed", "Guide"],
    excluded: ["Flights/bus", "Tips", "Personal expenses"],
    imageUrl: "/tours/highlights-vietnam-10d.jpg",
    rating: 9.5,
    reviewCount: 167,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/dalat-highlands-adventure-3-days.html",
    durationHours: 72,
    startCity: "Ho Chi Minh City",
    destinations: ["Dalat"],
    activities: ["adventure", "nature", "photography", "cultural"],
  },
  {
    id: "saigon-city-highlights",
    slug: "saigon-city-highlights-tour",
    name: "Saigon City Highlights Tour",
    category: "day-trip",
    location: "Ho Chi Minh City",
    duration: "Half day",
    price: 77,
    description: "Essential Saigon landmarks including War Museum, Notre Dame, and historic post office.",
    fullDescription: `
      <h3>City Discovery</h3>
      <p>Explore Ho Chi Minh City's most iconic landmarks and understand its fascinating history.</p>
    `,
    highlights: ["War Remnants Museum", "Notre Dame Cathedral", "Central Post Office", "Ben Thanh Market", "Reunification Palace"],
    itinerary: [
      { day: 1, title: "City Tour", description: "Saigon exploration", activities: ["Hotel pickup", "War Remnants Museum", "Notre Dame & Post Office", "Coffee break", "Reunification Palace", "Ben Thanh Market", "Return to hotel"], meals: [] }
    ],
    included: ["Transportation", "Entrance fees", "Guide", "Water"],
    excluded: ["Tips", "Meals", "Shopping"],
    imageUrl: "/tours/saigon-city-highlights.jpg",
    rating: 9.1,
    reviewCount: 678,
    affiliateUrl: "https://www.bestpricetravel.com/da-nang-tours/da-nang-full-day-city-tour.html",
    durationHours: 4,
    startCity: "Ho Chi Minh City",
    destinations: ["Ho Chi Minh City"],
    activities: ["city-tour", "historical", "cultural", "sightseeing"],
  },

  // VIETNAM & CAMBODIA TOURS (4 tours)
  {
    id: "vietnam-cambodia-highlights-12d",
    slug: "vietnam-cambodia-highlights-12-days",
    name: "Vietnam & Cambodia Highlights",
    category: "multi-day",
    location: "Vietnam & Cambodia",
    duration: "12 days, 11 nights",
    price: 3049,
    description: "Complete Indochina journey from Hanoi to Siem Reap with Angkor temples.",
    fullDescription: `
      <h3>Indochina Classic</h3>
      <p>Experience the best of both Vietnam and Cambodia on this comprehensive two-country adventure.</p>
    `,
    highlights: ["Halong Bay Cruise", "Hoi An Ancient Town", "Mekong Delta", "Angkor Wat", "Angkor Thom"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Vietnam arrival", activities: ["Airport pickup", "City orientation", "Old Quarter walk", "Welcome dinner"], meals: ["Dinner"] },
      { day: 2, title: "Hanoi", description: "Capital tour", activities: ["Ho Chi Minh Mausoleum", "Temple of Literature", "Museums", "Water puppets"], meals: ["Breakfast", "Lunch"] },
      { day: 3, title: "Halong Bay", description: "Cruise", activities: ["Transfer to Halong", "Cruise boarding", "Kayaking", "Sunset dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Halong - Hue", description: "Central bound", activities: ["Morning on bay", "Flight to Hue", "Evening citadel", "Royal dinner"], meals: ["Breakfast", "Brunch", "Dinner"] },
      { day: 5, title: "Hue - Hoi An", description: "Imperial day", activities: ["Tombs visit", "Hai Van Pass", "Marble Mountains", "Hoi An arrival"], meals: ["Breakfast", "Lunch"] },
      { day: 6, title: "Hoi An", description: "Ancient town", activities: ["Walking tour", "Cooking class", "Tailor visits", "Lantern evening"], meals: ["Breakfast", "Lunch"] },
      { day: 7, title: "Hoi An - Saigon", description: "South bound", activities: ["Morning free", "Flight to Saigon", "City tour", "Dinner cruise"], meals: ["Breakfast", "Dinner"] },
      { day: 8, title: "Cu Chi & Mekong", description: "Exploration", activities: ["Cu Chi Tunnels", "Lunch", "Mekong boat trip", "Return Saigon"], meals: ["Breakfast", "Lunch"] },
      { day: 9, title: "Saigon - Siem Reap", description: "Cambodia arrival", activities: ["Morning free", "Flight to Siem Reap", "Angkor Pass", "Sunset Phnom Bakheng"], meals: ["Breakfast", "Dinner"] },
      { day: 10, title: "Angkor Wat", description: "Temple day", activities: ["Sunrise Angkor Wat", "Temple exploration", "Lunch", "Ta Prohm", "Bayon"], meals: ["Breakfast", "Lunch"] },
      { day: 11, title: "Angkor Thom", description: "More temples", activities: ["Angkor Thom complex", "Banteay Srei", "Local village", "Apsara dance dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 12, title: "Siem Reap Departure", description: "Farewell", activities: ["Morning market", "Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["11 nights hotels", "Halong cruise", "Domestic flights", "All transfers", "Meals listed", "Guides"],
    excluded: ["International flights", "Cambodia visa", "Tips"],
    imageUrl: "/tours/vietnam-cambodia-highlights-12d.jpg",
    rating: 9.6,
    reviewCount: 134,
    affiliateUrl: "https://www.bestpricetravel.com/indochina-tours/highlights-of-vietnam-cambodia-thailand-3-weeks.html",
    durationHours: 288,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Halong Bay", "Hue", "Hoi An", "Ho Chi Minh City", "Mekong Delta", "Cu Chi", "Siem Reap"],
    activities: ["cruise", "cultural", "historical", "cooking-class", "temple-visit"],
  },
  {
    id: "angkor-wat-extension-3d",
    slug: "angkor-wat-extension-3-days",
    name: "Angkor Wat Extension",
    category: "multi-day",
    location: "Cambodia",
    duration: "3 days, 2 nights",
    price: 1669,
    description: "Add-on from Vietnam to explore Angkor's magnificent temple complex.",
    fullDescription: `
      <h3>Temple Extension</h3>
      <p>Perfect add-on for Vietnam travelers wanting to experience Angkor's ancient wonders.</p>
    `,
    highlights: ["Angkor Wat Sunrise", "Ta Prohm", "Bayon", "Angkor Thom", "Floating Village"],
    itinerary: [
      { day: 1, title: "Arrival", description: "Cambodia welcome", activities: ["Airport pickup", "Hotel check-in", "Angkor Pass", "Sunset Phnom Bakheng", "Khmer dinner"], meals: ["Dinner"] },
      { day: 2, title: "Angkor Complex", description: "Temple day", activities: ["Sunrise at Angkor Wat", "Full temple exploration", "Angkor Thom", "Bayon", "Ta Prohm", "Apsara show dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Departure", description: "Final morning", activities: ["Floating village visit", "Old Market shopping", "Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["2 nights hotel", "Angkor Pass", "All transfers", "Meals listed", "Guide"],
    excluded: ["Flights", "Cambodia visa", "Tips"],
    imageUrl: "/tours/angkor-wat-extension-3d.jpg",
    rating: 9.5,
    reviewCount: 98,
    affiliateUrl: "https://www.bestpricetravel.com/indochina-tours/romance-of-vietnam-cambodia-from-mekong-delta-to-angkor-wat-13-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6773b4969320c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66a8c47061aa8.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64e968c050f71.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64e968c050f73.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66a8c3d1416f6.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66a8c3fcddf66.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66a8c3d1416f9.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64e968c050f75.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66a8c41fc99a2.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64e968f4258b0.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66a8c41fc99a4.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66a8c41fc99a5.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64e968f4258b3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66a8c3fcddf69.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66a8c44ba355e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66a8c44ba3560.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64e968f4258b4.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66a8c47061aa3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64e9694da729c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66a8c47061aa6.jpg"],
    pricingTiers: [{"category":"Superior - 3*","price":1669},{"category":"First Class - 4*","price":1889}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 72,
    startCity: "Ho Chi Minh City",
    destinations: ["Siem Reap"],
    activities: ["temple-visit", "historical", "cultural", "photography"],
  },
  {
    id: "mekong-to-angkor-7d",
    slug: "mekong-delta-to-angkor-wat-7-days",
    name: "Mekong Delta to Angkor Wat",
    category: "multi-day",
    location: "Vietnam & Cambodia",
    duration: "7 days, 6 nights",
    price: 1669,
    description: "Unique river journey from Vietnam through Cambodia to the temples of Angkor.",
    fullDescription: `
      <h3>River Journey</h3>
      <p>Travel the ancient waterway route connecting Vietnam's Mekong Delta to Cambodia's Angkor temples.</p>
    `,
    highlights: ["Cai Be Floating Market", "Mekong Cruise", "Phnom Penh", "Tonle Sap", "Angkor Temples"],
    itinerary: [
      { day: 1, title: "Saigon - Mekong", description: "Delta start", activities: ["Morning pickup", "Transfer to Cai Be", "Floating market", "Homestay check-in", "Cooking class"], meals: ["Lunch", "Dinner"] },
      { day: 2, title: "Mekong Cruise", description: "River journey", activities: ["Early departure", "Mekong cruise", "Border crossing", "Arrive Phnom Penh"], meals: ["Breakfast", "Lunch"] },
      { day: 3, title: "Phnom Penh", description: "Capital tour", activities: ["Royal Palace", "Silver Pagoda", "S-21 Museum", "Killing Fields", "Night market"], meals: ["Breakfast", "Lunch"] },
      { day: 4, title: "Phnom Penh - Siem Reap", description: "North bound", activities: ["Morning drive", "Kampong Thom stop", "Arrive Siem Reap", "Night market"], meals: ["Breakfast", "Lunch"] },
      { day: 5, title: "Angkor Sunrise", description: "Temple day", activities: ["Sunrise Angkor Wat", "Temple exploration", "Bayon", "Ta Prohm", "Sunset views"], meals: ["Breakfast", "Lunch"] },
      { day: 6, title: "Angkor Thom", description: "More temples", activities: ["Angkor Thom complex", "Banteay Srei", "Tonle Sap boat", "Apsara dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 7, title: "Departure", description: "Farewell", activities: ["Morning free", "Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["6 nights hotels/homestay", "Mekong cruise", "All transfers", "Angkor Pass", "Meals listed", "Guides"],
    excluded: ["International flights", "Cambodia visa", "Tips"],
    imageUrl: "/tours/mekong-to-angkor-7d.jpg",
    rating: 9.4,
    reviewCount: 67,
    affiliateUrl: "https://www.bestpricetravel.com/indochina-tours/romance-of-vietnam-cambodia-from-mekong-delta-to-angkor-wat-13-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6773b4969320c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66a8c47061aa8.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64e968c050f71.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64e968c050f73.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66a8c3d1416f6.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66a8c3fcddf66.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66a8c3d1416f9.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64e968c050f75.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66a8c41fc99a2.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64e968f4258b0.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66a8c41fc99a4.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66a8c41fc99a5.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64e968f4258b3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66a8c3fcddf69.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66a8c44ba355e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66a8c44ba3560.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64e968f4258b4.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66a8c47061aa3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64e9694da729c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66a8c47061aa6.jpg"],
    pricingTiers: [{"category":"Superior - 3*","price":1669},{"category":"First Class - 4*","price":1889}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 168,
    startCity: "Ho Chi Minh City",
    destinations: ["Mekong Delta", "Cai Be", "Siem Reap"],
    activities: ["cruise", "cultural", "historical", "temple-visit", "boat-tour"],
  },
  {
    id: "best-indochina-15d",
    slug: "best-of-indochina-15-days",
    name: "Best of Indochina",
    category: "multi-day",
    location: "Vietnam & Cambodia",
    duration: "15 days, 14 nights",
    price: 3049,
    description: "Complete Vietnam and Cambodia experience from Halong Bay to Angkor Wat.",
    fullDescription: `
      <h3>Ultimate Indochina</h3>
      <p>The most comprehensive two-country journey covering Vietnam's highlights and Cambodia's temples.</p>
    `,
    highlights: ["Halong Bay", "Hoi An", "Mekong Delta", "Phnom Penh", "Angkor Complex"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Arrival", activities: ["Airport pickup", "Hotel check-in", "Evening exploration"], meals: ["Dinner"] },
      { day: 2, title: "Hanoi Tour", description: "Capital exploration", activities: ["Full city tour", "Ho Chi Minh complex", "Old Quarter", "Water puppets"], meals: ["Breakfast", "Lunch"] },
      { day: 3, title: "Halong Bay", description: "Cruise begins", activities: ["Transfer to Halong", "Overnight cruise", "Kayaking", "Cooking class"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Halong - Hanoi", description: "Return", activities: ["Morning on bay", "Tai chi", "Return to Hanoi", "Evening free"], meals: ["Breakfast", "Brunch"] },
      { day: 5, title: "Hue", description: "Imperial city", activities: ["Flight to Hue", "Citadel tour", "Tombs visit", "Dinner cruise"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 6, title: "Hue - Hoi An", description: "Scenic drive", activities: ["Hai Van Pass", "Lang Co Beach", "Marble Mountains", "Hoi An arrival"], meals: ["Breakfast", "Lunch"] },
      { day: 7, title: "Hoi An", description: "Ancient town", activities: ["Walking tour", "Cooking class", "Lantern making", "Night market"], meals: ["Breakfast", "Lunch"] },
      { day: 8, title: "Hoi An Free", description: "Leisure day", activities: ["Beach time", "Tailor fittings", "Massage", "Free evening"], meals: ["Breakfast"] },
      { day: 9, title: "Saigon", description: "South arrival", activities: ["Flight to Saigon", "City tour", "Ben Thanh Market", "Street food dinner"], meals: ["Breakfast", "Dinner"] },
      { day: 10, title: "Cu Chi & Saigon", description: "History day", activities: ["Cu Chi Tunnels", "War Museum", "Shopping time", "Rooftop drinks"], meals: ["Breakfast", "Lunch"] },
      { day: 11, title: "Mekong Delta", description: "Delta exploration", activities: ["Full day Mekong", "Floating market", "Local villages", "Cooking demo"], meals: ["Breakfast", "Lunch"] },
      { day: 12, title: "Saigon - Siem Reap", description: "Cambodia arrival", activities: ["Morning free", "Flight to Siem Reap", "Sunset temple", "Welcome dinner"], meals: ["Breakfast", "Dinner"] },
      { day: 13, title: "Angkor Wat", description: "Sunrise temples", activities: ["Sunrise Angkor Wat", "Temple complex", "Ta Prohm", "Angkor Thom"], meals: ["Breakfast", "Lunch"] },
      { day: 14, title: "More Temples", description: "Exploration", activities: ["Banteay Srei", "Floating village", "Local market", "Apsara dinner show"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 15, title: "Departure", description: "Farewell", activities: ["Morning free", "Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["14 nights hotels/cruise", "Domestic flights", "All transfers", "Meals listed", "Guides", "Entrance fees"],
    excluded: ["International flights", "Cambodia visa", "Tips"],
    imageUrl: "/tours/best-indochina-15d.jpg",
    rating: 9.6,
    reviewCount: 141,
    affiliateUrl: "https://www.bestpricetravel.com/indochina-tours/highlights-of-vietnam-cambodia-thailand-3-weeks.html",
    durationHours: 360,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Halong Bay", "Hue", "Hoi An", "Ho Chi Minh City", "Mekong Delta", "Siem Reap"],
    activities: ["cruise", "cultural", "historical", "cooking-class", "temple-visit"],
  },

  // SPECIAL INTEREST TOURS (3 tours)
  {
    id: "vietnam-luxury-train-8d",
    slug: "vietnam-by-luxury-train-8-days",
    name: "Vietnam by Luxury Train",
    category: "multi-day",
    location: "Vietnam",
    duration: "8 days, 7 nights",
    price: 7087,
    description: "Experience Vietnam's scenic railways in vintage luxury carriages from Hanoi to Saigon.",
    fullDescription: `
      <h3>Rail Journey</h3>
      <p>Travel Vietnam's Reunification Express in style with luxury sleeper cabins and gourmet dining.</p>
    `,
    highlights: ["Luxury Train Cabins", "Scenic Railways", "Hai Van Pass", "Local Stations", "Gourmet Dining"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Journey begins", activities: ["Airport pickup", "Hotel check-in", "City tour", "Train briefing dinner"], meals: ["Dinner"] },
      { day: 2, title: "Hanoi - Ninh Binh", description: "First leg", activities: ["Morning Hanoi tour", "Board luxury train", "Scenic ride", "Ninh Binh arrival", "Sunset cruise"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Ninh Binh", description: "Exploration", activities: ["Tam Coc boat ride", "Mua Cave", "Cycling", "Evening train to Hue"], meals: ["Breakfast", "Lunch"] },
      { day: 4, title: "Hue", description: "Imperial arrival", activities: ["Morning arrival", "Citadel tour", "Royal tombs", "Dinner cruise"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 5, title: "Hue - Da Nang", description: "Hai Van Pass", activities: ["Board train", "Hai Van Pass views", "Da Nang arrival", "Marble Mountains", "Beach dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 6, title: "Hoi An", description: "Ancient town", activities: ["Transfer to Hoi An", "Walking tour", "Cooking class", "Lantern evening"], meals: ["Breakfast", "Lunch"] },
      { day: 7, title: "Da Nang - Saigon", description: "Final journey", activities: ["Morning free", "Board overnight train", "Gourmet dinner on board", "Sleep en route"], meals: ["Breakfast", "Dinner"] },
      { day: 8, title: "Saigon", description: "Arrival", activities: ["Morning arrival", "City tour", "Farewell lunch", "Airport transfer"], meals: ["Breakfast", "Lunch"] }
    ],
    included: ["5 nights hotels", "2 nights luxury train", "All train tickets", "Meals listed", "Guides", "Transfers"],
    excluded: ["Flights", "Tips", "Personal expenses"],
    imageUrl: "/tours/vietnam-luxury-train-8d.jpg",
    rating: 9.7,
    reviewCount: 43,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/vietnam-from-north-to-south-by-luxury-train-8-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68f5aa6877551.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68edced2a8df9.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68edced2a8dfb.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68edcf3d05250.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68edcfa8b954b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68edcffbd396c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68edcf3d05257.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68edcf3d05254.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68edcfa8b954d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68edcffbd396b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68f5fbfeb8d45.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68edced2a8df6.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68edcfa8b954f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68f6050415f53.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68f5fb639b381.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68f605d9ec25e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68edcf3d05255.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68edced2a8df8.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68edced2a8dfc.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68edcfa8b9549.jpg"],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 192,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Ninh Binh", "Hue", "Da Nang", "Hoi An", "Ho Chi Minh City"],
    activities: ["luxury", "cultural", "sightseeing", "cooking-class"],
  },
  {
    id: "vietnam-eco-adventure-10d",
    slug: "vietnam-eco-adventure-10-days",
    name: "Vietnam Eco Adventure",
    category: "multi-day",
    location: "Vietnam",
    duration: "10 days, 9 nights",
    price: 539,
    description: "Sustainable travel through Vietnam's national parks, eco-lodges, and conservation projects.",
    fullDescription: `
      <h3>Green Journey</h3>
      <p>Experience Vietnam sustainably with eco-lodges, national parks, and community-based tourism.</p>
    `,
    highlights: ["Cat Tien National Park", "Pu Luong Reserve", "Eco-Lodges", "Wildlife", "Community Projects"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Green start", activities: ["Airport pickup", "Eco-hotel check-in", "Sustainable dinner"], meals: ["Dinner"] },
      { day: 2, title: "Pu Luong", description: "Reserve arrival", activities: ["Transfer to Pu Luong", "Eco-lodge check-in", "Nature walk", "Organic dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Pu Luong", description: "Full day", activities: ["Village trek", "Waterfall visit", "Community lunch", "Evening wildlife"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Ninh Binh", description: "Wetlands", activities: ["Transfer", "Van Long Nature Reserve", "Bird watching", "Eco-stay"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 5, title: "Flight to Dalat", description: "Highlands", activities: ["Fly to Dalat", "Organic farm visit", "Highland eco-lodge"], meals: ["Breakfast", "Dinner"] },
      { day: 6, title: "Dalat Nature", description: "Forest day", activities: ["Forest trek", "Waterfall visit", "Local village", "Farm dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 7, title: "Cat Tien", description: "National park", activities: ["Transfer to Cat Tien", "Park orientation", "Night safari"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 8, title: "Cat Tien", description: "Wildlife day", activities: ["Dawn birdwatching", "Gibbon watching", "River cruise", "Forest hike"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 9, title: "Cat Tien - Saigon", description: "Return", activities: ["Morning wildlife", "Transfer to Saigon", "Farewell dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 10, title: "Departure", description: "Green goodbye", activities: ["Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["9 nights eco-lodges", "Domestic flights", "All activities", "Meals listed", "Expert guides", "Park fees"],
    excluded: ["International flights", "Tips"],
    imageUrl: "/tours/vietnam-eco-adventure-10d.jpg",
    rating: 9.6,
    reviewCount: 34,
    affiliateUrl: "https://www.bestpricetravel.com/hanoi-tours/family-adventure-in-hanoi-outskirt-ba-vi-eco-escape-3-days.html",
    durationHours: 240,
    startCity: "Hanoi",
    destinations: ["Pu Luong", "Ninh Binh", "Dalat", "Cat Tien"],
    activities: ["nature", "wildlife", "trekking", "homestay", "educational"],
  },
  {
    id: "vietnam-rural-immersion-7d",
    slug: "vietnam-rural-immersion-7-days",
    name: "Vietnam Rural Immersion",
    category: "multi-day",
    location: "Vietnam",
    duration: "7 days, 6 nights",
    price: 420,
    description: "Live with local families in villages across Vietnam for authentic cultural immersion.",
    fullDescription: `
      <h3>Village Life</h3>
      <p>Experience real Vietnam through homestays, farm work, and traditional village activities.</p>
    `,
    highlights: ["Multiple Homestays", "Farm Activities", "Traditional Crafts", "Local Cooking", "Village Festivals"],
    itinerary: [
      { day: 1, title: "Hanoi - Mai Chau", description: "Valley arrival", activities: ["Morning pickup", "Scenic drive", "Thai village homestay", "Traditional dinner"], meals: ["Lunch", "Dinner"] },
      { day: 2, title: "Mai Chau", description: "Farm day", activities: ["Rice farming activities", "Buffalo care", "Weaving lesson", "Evening performance"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Mai Chau - Ninh Binh", description: "Transfer", activities: ["Morning cycling", "Transfer to Ninh Binh", "Village homestay", "Cooking dinner together"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Ninh Binh", description: "Rural life", activities: ["Morning boat ride", "Temple visit", "Farming activities", "Local market"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 5, title: "Fly to Mekong", description: "Delta arrival", activities: ["Fly to Can Tho", "Transfer to homestay", "Canal boat ride", "Fish farming"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 6, title: "Mekong Delta", description: "Water life", activities: ["Floating market pre-dawn", "Fruit orchards", "Cooking class", "Hammock time", "Farewell dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 7, title: "Departure", description: "Farewell", activities: ["Morning with family", "Transfer to Saigon", "Airport"], meals: ["Breakfast", "Lunch"] }
    ],
    included: ["6 nights homestays", "Domestic flight", "All activities", "All meals", "Guides"],
    excluded: ["International flights", "Tips", "Personal expenses"],
    imageUrl: "/tours/vietnam-rural-immersion-7d.jpg",
    rating: 9.8,
    reviewCount: 56,
    affiliateUrl: "https://www.bestpricetravel.com/hanoi-tours/northern-vietnams-flavors-and-traditions-3-days.html",
    durationHours: 168,
    startCity: "Hanoi",
    destinations: ["Mai Chau", "Ninh Binh", "Mekong Delta", "Can Tho"],
    activities: ["homestay", "cultural", "cooking-class", "cycling", "boat-tour"],
  },

  // ============================================
  // BATCH 5: 30 MORE BESTPRICETRAVEL TOURS
  // ============================================

  // GOLF TOURS (5 tours)
  {
    id: "hanoi-halong-golf-6d",
    slug: "luxury-hanoi-halong-golf-retreat-6-days",
    name: "Luxury Hanoi & Halong Golf Retreat",
    category: "multi-day",
    location: "Northern Vietnam",
    duration: "6 days, 5 nights",
    price: 599,
    description: "Premium golf experience at King's Island and Chi Linh Star with Halong Bay cruise.",
    fullDescription: `
      <h3>Golf Paradise</h3>
      <p>Play Vietnam's finest northern courses while enjoying luxury accommodation and Halong Bay cruise.</p>
    `,
    highlights: ["King's Island Golf Resort", "Chi Linh Star Golf Club", "Halong Bay Cruise", "5-Star Hotels", "Professional Caddies"],
    itinerary: [
      { day: 1, title: "Hanoi Arrival", description: "Welcome", activities: ["VIP airport pickup", "5-star hotel check-in", "Welcome dinner", "Golf briefing"], meals: ["Dinner"] },
      { day: 2, title: "King's Island Golf", description: "First round", activities: ["Transfer to King's Island", "18 holes Lakeside Course", "Lunch at clubhouse", "Return to Hanoi", "Spa treatment"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Chi Linh Star", description: "Mountain golf", activities: ["Drive to Chi Linh", "18 holes championship course", "Lunch", "Return Hanoi", "Old Quarter dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Halong Bay", description: "Cruise begins", activities: ["Transfer to Halong", "5-star cruise boarding", "Kayaking", "Sunset cocktails", "Seafood dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 5, title: "Halong Bay", description: "Bay leisure", activities: ["Sunrise tai chi", "Cave exploration", "Swimming", "Cooking class", "Return to Hanoi"], meals: ["Breakfast", "Brunch"] },
      { day: 6, title: "Departure", description: "Farewell", activities: ["Hanoi city tour", "Shopping time", "VIP airport transfer"], meals: ["Breakfast", "Lunch"] }
    ],
    included: ["5 nights 5-star hotels/cruise", "2 rounds golf with caddy", "Luxury cruise", "All transfers", "Meals listed"],
    excluded: ["Flights", "Golf club rental", "Tips", "Personal expenses"],
    imageUrl: "/tours/hanoi-halong-golf-6d.jpg",
    rating: 9.7,
    reviewCount: 28,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/best-of-northern-vietnam-6-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66cd320e94af7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c29e263e1b8.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c29e263e1b9.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c29e0e3e800.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e987f9d970.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00222a6d20.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e0019f1c00f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e98708c224.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00222a6d1f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e0019f1c00e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e0019f1c010.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e0019f1c011.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e00222a6d21.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c29e0e3e801.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c29e0e3e7fd.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c29e263e1b5.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/665e984a1fb07.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e0019f1c006.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e0019f1c00a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e0019f1c00c.jpg"],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 144,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Halong Bay"],
    activities: ["golf", "cruise", "luxury", "spa"],
  },
  {
    id: "saigon-danang-golf-8d",
    slug: "saigon-to-danang-golf-history-8-days",
    name: "Saigon to Da Nang: Golf, History & Coastal Charms",
    category: "multi-day",
    location: "Vietnam",
    duration: "8 days, 7 nights",
    price: 2179,
    description: "Golf at Ba Na Hills and Long Thanh with historic landmarks and beach relaxation.",
    fullDescription: `
      <h3>Golf Journey</h3>
      <p>Play world-class courses from south to central Vietnam while exploring history and beaches.</p>
    `,
    highlights: ["Ba Na Hills Golf Club", "Long Thanh Golf Resort", "Cu Chi Tunnels", "Hoi An", "Beach Time"],
    itinerary: [
      { day: 1, title: "Saigon Arrival", description: "Welcome", activities: ["Airport pickup", "Hotel check-in", "City orientation", "Welcome dinner"], meals: ["Dinner"] },
      { day: 2, title: "Long Thanh Golf", description: "First round", activities: ["Transfer to Long Thanh", "18 holes championship", "Lunch at clubhouse", "Return Saigon", "Rooftop drinks"], meals: ["Breakfast", "Lunch"] },
      { day: 3, title: "Cu Chi & History", description: "War history", activities: ["Cu Chi Tunnels", "War Remnants Museum", "Shopping", "Dinner cruise"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Fly to Da Nang", description: "Central arrival", activities: ["Morning flight", "Hotel check-in", "My Khe Beach", "Seafood dinner"], meals: ["Breakfast", "Dinner"] },
      { day: 5, title: "Ba Na Hills Golf", description: "Mountain golf", activities: ["Early transfer", "18 holes at Ba Na Hills", "Lunch", "Golden Bridge visit", "Return Da Nang"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 6, title: "Hoi An", description: "Ancient town", activities: ["Transfer to Hoi An", "Ancient town tour", "Cooking class", "Lantern evening"], meals: ["Breakfast", "Lunch"] },
      { day: 7, title: "Beach Day", description: "Relaxation", activities: ["Beach resort", "Spa treatments", "Free time", "Farewell dinner"], meals: ["Breakfast", "Dinner"] },
      { day: 8, title: "Departure", description: "Farewell", activities: ["Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["7 nights hotels", "2 rounds golf with caddy", "Domestic flight", "All transfers", "Meals listed"],
    excluded: ["International flights", "Golf club rental", "Tips"],
    imageUrl: "/tours/saigon-danang-golf-8d.jpg",
    rating: 9.5,
    reviewCount: 19,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/saigon-to-da-nang-golf-8-days.html",
    durationHours: 192,
    startCity: "Ho Chi Minh City",
    destinations: ["Ho Chi Minh City", "Cu Chi", "Da Nang", "Ba Na Hills", "Hoi An"],
    activities: ["golf", "historical", "beach", "cooking-class", "cultural"],
  },
  {
    id: "danang-golf-holiday-5d",
    slug: "luxury-danang-golf-holiday-5-days",
    name: "Luxury Da Nang Golf Holiday",
    category: "multi-day",
    location: "Da Nang",
    duration: "5 days, 4 nights",
    price: 1419,
    description: "World-class Ba Na Hills Golf Club with Golden Bridge visit and ancient Hoi An.",
    fullDescription: `
      <h3>Central Golf</h3>
      <p>Experience Vietnam's premier central coast golf destination with luxury beach resort stay.</p>
    `,
    highlights: ["Ba Na Hills Golf Club", "Golden Bridge", "Hoi An Ancient Town", "Beach Resort", "Marble Mountains"],
    itinerary: [
      { day: 1, title: "Da Nang Arrival", description: "Beach welcome", activities: ["Airport pickup", "Beach resort check-in", "Pool relaxation", "Welcome dinner"], meals: ["Dinner"] },
      { day: 2, title: "Ba Na Hills Golf", description: "Championship round", activities: ["Transfer to Ba Na Hills", "18 holes championship", "Lunch", "Cable car & Golden Bridge", "Return to resort"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Hoi An", description: "Ancient town", activities: ["Transfer to Hoi An", "Walking tour", "Tailor visit", "Cooking class", "Lantern night"], meals: ["Breakfast", "Lunch"] },
      { day: 4, title: "Leisure Day", description: "Relaxation", activities: ["Marble Mountains morning", "Beach time", "Spa treatment", "Farewell seafood dinner"], meals: ["Breakfast", "Dinner"] },
      { day: 5, title: "Departure", description: "Farewell", activities: ["Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["4 nights beach resort", "1 round golf with caddy", "Ba Na Hills entry", "All transfers", "Meals listed"],
    excluded: ["Flights", "Golf club rental", "Tips"],
    imageUrl: "/tours/danang-golf-holiday-5d.jpg",
    rating: 9.6,
    reviewCount: 34,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/luxury-da-nang-golf-5-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67caa1991bcf8.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67caa1991bcfa.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67caa1991bcfb.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67caa1991bcfc.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67caa1991bcfd.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67caa1991bcfe.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67caa1991bcff.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67caa1991bd00.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/69421ba37cd14.png","https://d122axpxm39woi.cloudfront.net/images/tours/origin/67caa1991bcfa.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/67caa1991bcff.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/67caa1991bd00.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f9dafc681f3.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f9df1d18d79.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/66cd3179db719.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/678f44c6ae2b9.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/66cd320e94af7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/66cd31d423636.jpg","https://d122axpxm39woi.cloudfront.net/assets/img/dcma.png"],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 120,
    startCity: "Da Nang",
    destinations: ["Da Nang", "Ba Na Hills", "Hoi An"],
    activities: ["golf", "beach", "cable-car", "cooking-class", "spa"],
  },
  {
    id: "nha-trang-golf-coastal-5d",
    slug: "nha-trang-golf-coastal-bliss-5-days",
    name: "Nha Trang Golf & Coastal Bliss",
    category: "multi-day",
    location: "Nha Trang",
    duration: "5 days, 4 nights",
    price: 1059,
    description: "Coastal golf paradise with island hopping and beach relaxation.",
    fullDescription: `
      <h3>Coastal Golf</h3>
      <p>Combine championship golf with Nha Trang's stunning beaches and island adventures.</p>
    `,
    highlights: ["Vinpearl Golf Club", "Island Hopping", "Beach Resort", "Mud Baths", "Seafood"],
    itinerary: [
      { day: 1, title: "Nha Trang Arrival", description: "Beach welcome", activities: ["Airport pickup", "Resort check-in", "Beach time", "Seafood dinner"], meals: ["Dinner"] },
      { day: 2, title: "Vinpearl Golf", description: "Island golf", activities: ["Cable car to Vinpearl", "18 holes oceanview", "Lunch", "Theme park time", "Return to mainland"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Island Hopping", description: "Sea adventure", activities: ["Boat to islands", "Snorkeling", "Beach BBQ", "Swimming", "Sunset return"], meals: ["Breakfast", "Lunch"] },
      { day: 4, title: "Spa Day", description: "Relaxation", activities: ["I-Resort mud baths", "Hot springs", "Spa treatments", "Farewell dinner"], meals: ["Breakfast", "Dinner"] },
      { day: 5, title: "Departure", description: "Farewell", activities: ["Morning beach", "Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["4 nights beach resort", "1 round golf", "Island tour", "Mud bath entry", "Meals listed"],
    excluded: ["Flights", "Golf club rental", "Tips"],
    imageUrl: "/tours/nha-trang-golf-coastal-5d.jpg",
    rating: 9.6,
    reviewCount: 22,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/nha-trang-golf-coastal-5-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67ca7a5997e30.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67ca7a5997e28.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67ca7a5997e2b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67ca7a5997e2c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67ca7a5997e2d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67ca7a5997e2e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67ca7a5997e2f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/67ca7a5997e2b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/67ca7a5997e28.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/67ca7a5997e2d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/67ca7a5997e2c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/67ca7a5997e2e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/67ca7a5997e2f.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/68070dcc7aef9.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/66cd3179db719.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/678f44c6ae2b9.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/66cd320e94af7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/66cd31d423636.jpg","https://d122axpxm39woi.cloudfront.net/assets/img/dcma.png"],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 120,
    startCity: "Nha Trang",
    destinations: ["Nha Trang"],
    activities: ["golf", "beach", "snorkeling", "spa", "cable-car"],
  },
  {
    id: "phu-quoc-golf-seaside-4d",
    slug: "phu-quoc-golf-seaside-relaxation-4-days",
    name: "Phu Quoc Golf & Seaside Relaxation",
    category: "multi-day",
    location: "Phu Quoc",
    duration: "4 days, 3 nights",
    price: 729,
    description: "Island golf getaway with pristine beaches and sunset views.",
    fullDescription: `
      <h3>Island Golf</h3>
      <p>Play Vietnam's most scenic island course while enjoying tropical paradise.</p>
    `,
    highlights: ["Vinpearl Golf Phu Quoc", "Pristine Beaches", "Sunset Cruise", "Night Market", "Spa"],
    itinerary: [
      { day: 1, title: "Phu Quoc Arrival", description: "Island welcome", activities: ["Airport pickup", "Resort check-in", "Beach relaxation", "Night market dinner"], meals: ["Dinner"] },
      { day: 2, title: "Golf Day", description: "Championship round", activities: ["Transfer to Vinpearl Golf", "18 holes with ocean views", "Lunch at clubhouse", "Spa afternoon", "Sunset cruise"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Island Exploration", description: "Adventure day", activities: ["Snorkeling trip", "Fishing village visit", "Pepper farm", "Fish sauce factory", "Seafood dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Departure", description: "Farewell", activities: ["Morning beach", "Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["3 nights resort", "1 round golf", "Sunset cruise", "Snorkeling", "Meals listed"],
    excluded: ["Flights", "Golf club rental", "Tips"],
    imageUrl: "/tours/phu-quoc-golf-seaside-4d.jpg",
    rating: 9.5,
    reviewCount: 31,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/phu-quoc-golf-seaside-4-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67ca6a58c8e98.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67ca69cd601d3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67ca69e6bd189.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67ca69fe064eb.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67ca6a146c11d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67ca6a2656d56.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67ca6a41ddb35.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/67ca69cd601d3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/67ca69fe064eb.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/67ca6a146c11d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/67ca6a2656d56.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/67ca6a41ddb35.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67fc6419c8c95.png","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/66cd3179db719.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/678f44c6ae2b9.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/66cd320e94af7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/66cd31d423636.jpg","https://d122axpxm39woi.cloudfront.net/assets/img/dcma.png"],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 96,
    startCity: "Phu Quoc",
    destinations: ["Phu Quoc"],
    activities: ["golf", "beach", "snorkeling", "cruise", "spa"],
  },

  // BEACH HOLIDAYS (5 tours)
  {
    id: "majestic-vietnam-beach-17d",
    slug: "majestic-vietnam-beach-holiday-17-days",
    name: "Majestic Vietnam with Beach Holiday",
    category: "multi-day",
    location: "Vietnam",
    duration: "17 days, 16 nights",
    price: 1699,
    description: "Complete Vietnam journey from mountains to beaches with Mui Ne relaxation.",
    fullDescription: `
      <h3>Vietnam Complete</h3>
      <p>Experience all of Vietnam from Sapa mountains to Halong Bay and finish with beach relaxation.</p>
    `,
    highlights: ["Sapa Trekking", "Halong Bay Cruise", "Hoi An", "Mekong Delta", "Mui Ne Beach"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Arrival", activities: ["Airport pickup", "Hotel check-in", "Evening walk"], meals: ["Dinner"] },
      { day: 2, title: "Hanoi", description: "City tour", activities: ["Ho Chi Minh Mausoleum", "Temple of Literature", "Old Quarter", "Water puppets"], meals: ["Breakfast", "Lunch"] },
      { day: 3, title: "Sapa", description: "Mountain journey", activities: ["Train to Sapa", "Hotel check-in", "Evening market"], meals: ["Breakfast", "Dinner"] },
      { day: 4, title: "Sapa Trekking", description: "Village day", activities: ["Trek to villages", "Rice terraces", "Homestay experience"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 5, title: "Sapa - Hanoi", description: "Return", activities: ["Morning views", "Return to Hanoi", "Evening free"], meals: ["Breakfast", "Lunch"] },
      { day: 6, title: "Halong Bay", description: "Cruise", activities: ["Transfer to Halong", "Cruise boarding", "Kayaking", "Cooking class"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 7, title: "Halong - Hanoi", description: "Return", activities: ["Sunrise tai chi", "Cave visit", "Return to Hanoi"], meals: ["Breakfast", "Brunch"] },
      { day: 8, title: "Hue", description: "Imperial city", activities: ["Fly to Hue", "Citadel tour", "Perfume River"], meals: ["Breakfast", "Lunch"] },
      { day: 9, title: "Hue - Hoi An", description: "Scenic drive", activities: ["Hai Van Pass", "Marble Mountains", "Hoi An arrival"], meals: ["Breakfast", "Lunch"] },
      { day: 10, title: "Hoi An", description: "Ancient town", activities: ["Walking tour", "Cooking class", "Lantern night"], meals: ["Breakfast", "Lunch"] },
      { day: 11, title: "Hoi An Free", description: "Leisure", activities: ["Beach", "Tailoring", "Free time"], meals: ["Breakfast"] },
      { day: 12, title: "Saigon", description: "South arrival", activities: ["Fly to Saigon", "City tour", "Ben Thanh Market"], meals: ["Breakfast", "Dinner"] },
      { day: 13, title: "Mekong Delta", description: "Delta day", activities: ["Full day Mekong", "Floating market", "Coconut village"], meals: ["Breakfast", "Lunch"] },
      { day: 14, title: "Mui Ne", description: "Beach arrival", activities: ["Transfer to Mui Ne", "Beach resort", "Sunset at dunes"], meals: ["Breakfast", "Dinner"] },
      { day: 15, title: "Mui Ne Beach", description: "Relaxation", activities: ["Beach day", "Water sports optional", "Spa"], meals: ["Breakfast"] },
      { day: 16, title: "Mui Ne Beach", description: "Free day", activities: ["Fishing village sunrise", "Beach", "Farewell dinner"], meals: ["Breakfast", "Dinner"] },
      { day: 17, title: "Departure", description: "Farewell", activities: ["Transfer to Saigon airport"], meals: ["Breakfast"] }
    ],
    included: ["16 nights hotels/cruise", "Domestic flights", "Cruise", "All transfers", "Meals listed", "Guides"],
    excluded: ["International flights", "Tips", "Personal expenses"],
    imageUrl: "/tours/majestic-vietnam-beach-17d.jpg",
    rating: 9.3,
    reviewCount: 27,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/majestic-vietnam-with-beach-relaxation-17-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/676399eedc20d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b6a74e0f50.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b6a74e0f51.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666b039f1919.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b6a74e0f52.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666b1b8d8842.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666b055079a5.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666b071ba731.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b6a74e0f53.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b6a74e0f54.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666b0859e54d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b6a74e0f55.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b6b4e09bb7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b6a74e0f56.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b6a74e0f4e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b6b4e09bb8.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b6b4e09bb9.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b6b4e09bba.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b6b4e09bbb.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660b6b4e09bbc.jpg"],
    pricingTiers: [{"category":"Superior (3* Hotels)","price":1699},{"category":"First Class (4* Hotels)","price":1959},{"category":"Deluxe (5* hotels)","price":2439}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 408,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Sapa", "Halong Bay", "Hue", "Hoi An", "Ho Chi Minh City", "Mekong Delta"],
    activities: ["trekking", "cruise", "beach", "cultural", "cooking-class"],
  },
  {
    id: "hoi-an-beach-break-7d",
    slug: "hoi-an-surrounding-beach-break-7-days",
    name: "Hoi An Surrounding & Beach Break",
    category: "multi-day",
    location: "Hoi An",
    duration: "7 days, 6 nights",
    price: 569,
    description: "Ancient town exploration with beach relaxation and countryside experiences.",
    fullDescription: `
      <h3>Hoi An Escape</h3>
      <p>Immerse in Hoi An's charm with beach days, cooking classes, and countryside cycling.</p>
    `,
    highlights: ["Ancient Town", "An Bang Beach", "Tra Que Village", "My Son Sanctuary", "Cooking Class"],
    itinerary: [
      { day: 1, title: "Arrival", description: "Hoi An welcome", activities: ["Da Nang pickup", "Beach resort check-in", "Ancient town evening", "Lantern walk"], meals: ["Dinner"] },
      { day: 2, title: "Ancient Town", description: "Heritage day", activities: ["Walking tour", "Japanese Bridge", "Tailor visits", "Cooking class"], meals: ["Breakfast", "Lunch"] },
      { day: 3, title: "My Son", description: "Temple excursion", activities: ["Sunrise My Son", "Cham history", "Boat return", "Beach afternoon"], meals: ["Breakfast", "Lunch"] },
      { day: 4, title: "Tra Que Village", description: "Countryside", activities: ["Cycling to Tra Que", "Farming activities", "Cooking lunch", "Beach sunset"], meals: ["Breakfast", "Lunch"] },
      { day: 5, title: "Beach Day", description: "Relaxation", activities: ["An Bang Beach", "Water sports", "Spa treatment", "Seafood dinner"], meals: ["Breakfast", "Dinner"] },
      { day: 6, title: "Free Day", description: "Leisure", activities: ["Basket boat ride", "Shopping", "Beach", "Farewell dinner"], meals: ["Breakfast", "Dinner"] },
      { day: 7, title: "Departure", description: "Farewell", activities: ["Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["6 nights beach resort", "All tours listed", "Cooking class", "Meals listed", "Transfers"],
    excluded: ["Flights", "Tips", "Personal expenses"],
    imageUrl: "/tours/hoi-an-beach-break-7d.jpg",
    rating: 9.4,
    reviewCount: 12,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/hoi-an-surrounding-and-beach-break-7days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67639a95428b5.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c2c52e7dc.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c1e26fc96.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c2c52e7de.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c1e26fc95.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c1e26fc94.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c2c52e7df.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c1e26fc92.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c296c5012.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c296c5010.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c296c5014.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c296c5013.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/66d6e343d5370.png","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65dfee68bcd9e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65dfee68bcd9f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65dfee68bcda0.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65dfee68bcd97.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65dfee68bcda1.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65dfee68bcd99.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65dfee68bcd9a.jpg"],
    pricingTiers: [{"category":"Superior 3* Hotels","price":569},{"category":"First Class 4* Hotels","price":629},{"category":"Deluxe 5* Hotels","price":879}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 168,
    startCity: "Da Nang",
    destinations: ["Hoi An", "Da Nang"],
    activities: ["beach", "cultural", "cooking-class", "cycling", "boat-tour"],
  },
  {
    id: "saigon-mui-ne-beach-7d",
    slug: "south-vietnam-saigon-mui-ne-beach-7-days",
    name: "South Vietnam: Saigon & Mui Ne Beach Relaxation",
    category: "multi-day",
    location: "Southern Vietnam",
    duration: "7 days, 6 nights",
    price: 439,
    description: "Southern exploration with Cu Chi, Mekong Delta, and Mui Ne beach escape.",
    fullDescription: `
      <h3>Southern Beach</h3>
      <p>Explore southern Vietnam's highlights before relaxing on Mui Ne's stunning beaches.</p>
    `,
    highlights: ["Cu Chi Tunnels", "Mekong Delta", "Mui Ne Dunes", "Beach Resort", "Water Sports"],
    itinerary: [
      { day: 1, title: "Saigon Arrival", description: "Welcome", activities: ["Airport pickup", "Hotel check-in", "City tour", "Dinner cruise"], meals: ["Dinner"] },
      { day: 2, title: "Cu Chi", description: "War history", activities: ["Cu Chi Tunnels", "War Museum", "Shopping", "Night market"], meals: ["Breakfast", "Lunch"] },
      { day: 3, title: "Mekong Delta", description: "Delta day", activities: ["Full day Mekong", "Ben Tre", "Coconut village", "Fruit tasting"], meals: ["Breakfast", "Lunch"] },
      { day: 4, title: "Mui Ne", description: "Beach arrival", activities: ["Transfer to Mui Ne", "Beach resort", "Red dunes sunset", "Seafood dinner"], meals: ["Breakfast", "Dinner"] },
      { day: 5, title: "Mui Ne Beach", description: "Relaxation", activities: ["White dunes sunrise", "Beach day", "Kite surfing optional", "Spa"], meals: ["Breakfast"] },
      { day: 6, title: "Mui Ne Free", description: "Leisure", activities: ["Fairy Stream", "Fishing village", "Beach", "Farewell dinner"], meals: ["Breakfast", "Dinner"] },
      { day: 7, title: "Departure", description: "Farewell", activities: ["Transfer to Saigon", "Airport"], meals: ["Breakfast"] }
    ],
    included: ["6 nights hotels", "All tours listed", "Meals listed", "Transfers"],
    excluded: ["Flights", "Tips", "Water sports"],
    imageUrl: "/tours/saigon-mui-ne-beach-7d.jpg",
    rating: 9.5,
    reviewCount: 2,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/saigon-and-mui-ne-relaxation-7-days.html",
    durationHours: 168,
    startCity: "Ho Chi Minh City",
    destinations: ["Ho Chi Minh City", "Cu Chi", "Mekong Delta", "Ben Tre"],
    activities: ["beach", "historical", "boat-tour", "cultural"],
  },
  {
    id: "nha-trang-discovery-beach-6d",
    slug: "nha-trang-discovery-beach-break-6-days",
    name: "Nha Trang Discovery & Beach Break",
    category: "multi-day",
    location: "Nha Trang",
    duration: "6 days, 5 nights",
    price: 399,
    description: "Island hopping, snorkeling, and beach relaxation in Vietnam's coastal gem.",
    fullDescription: `
      <h3>Coastal Paradise</h3>
      <p>Discover Nha Trang's islands, beaches, and cultural sites for the ultimate coastal escape.</p>
    `,
    highlights: ["Island Hopping", "Snorkeling", "Po Nagar Towers", "Mud Baths", "Beach Resort"],
    itinerary: [
      { day: 1, title: "Arrival", description: "Beach welcome", activities: ["Airport pickup", "Resort check-in", "Beach time", "Seafood dinner"], meals: ["Dinner"] },
      { day: 2, title: "City Tour", description: "Cultural day", activities: ["Po Nagar Cham Towers", "Long Son Pagoda", "Dam Market", "Night life"], meals: ["Breakfast", "Lunch"] },
      { day: 3, title: "Island Hopping", description: "Sea adventure", activities: ["4 island tour", "Snorkeling", "Beach BBQ", "Swimming", "Live music on boat"], meals: ["Breakfast", "Lunch"] },
      { day: 4, title: "Mud Baths", description: "Wellness day", activities: ["Thap Ba Hot Springs", "Mud baths", "Mineral pools", "Spa", "Beach sunset"], meals: ["Breakfast"] },
      { day: 5, title: "Beach Day", description: "Relaxation", activities: ["Free beach time", "Water sports optional", "Shopping", "Farewell dinner"], meals: ["Breakfast", "Dinner"] },
      { day: 6, title: "Departure", description: "Farewell", activities: ["Morning swim", "Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["5 nights beach resort", "All tours listed", "Meals listed", "Transfers"],
    excluded: ["Flights", "Tips", "Water sports"],
    imageUrl: "/tours/nha-trang-discovery-beach-6d.jpg",
    rating: 9.6,
    reviewCount: 4,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/nha-trang-discovery-and-beach-break-6-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67639add92b99.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667b88eeba06c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660faa2eb01e3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a3fa9839b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a3fa9839e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a41798134.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a41798130.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a41798133.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a3fa9839f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660faa2eb01e8.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660faa2eb01e9.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667b891c74c0f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/660faa2eb01e3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/660faa2eb01e9.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f4d3e47e254.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f648531d5d7.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f737b8b1857.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/660f83a75525e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/676399eedc20d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/67639b3e5e45c.jpg"],
    pricingTiers: [{"category":"Superior 3* Hotels","price":399},{"category":"First Class 4* Hotels","price":429},{"category":"Deluxe 5* Hotels","price":469}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 144,
    startCity: "Nha Trang",
    destinations: ["Nha Trang"],
    activities: ["beach", "snorkeling", "spa", "cultural", "boat-tour"],
  },
  {
    id: "luxury-beach-wellness-14d",
    slug: "luxury-vietnam-beach-wellness-spa-14-days",
    name: "Luxury Vietnam Beach Wellness & Spa",
    category: "multi-day",
    location: "Vietnam",
    duration: "14 days, 13 nights",
    price: 4279,
    description: "Ultimate luxury journey combining wellness, beaches, and Vietnam's highlights.",
    fullDescription: `
      <h3>Luxury Wellness</h3>
      <p>Experience Vietnam's finest resorts, spas, and beaches on this premium wellness journey.</p>
    `,
    highlights: ["5-Star Resorts", "Daily Spa", "Halong Cruise", "Nha Trang Beach", "Gourmet Dining"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Luxury arrival", activities: ["VIP airport pickup", "5-star hotel", "Welcome spa", "Gourmet dinner"], meals: ["Dinner"] },
      { day: 2, title: "Hanoi Wellness", description: "Spa day", activities: ["Morning yoga", "City tour", "Spa treatment", "Fine dining"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Halong Bay", description: "Luxury cruise", activities: ["5-star cruise", "Onboard spa", "Kayaking", "Gourmet dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Halong Bay", description: "Continued", activities: ["Sunrise yoga", "Cave visit", "Return to Hanoi", "Evening spa"], meals: ["Breakfast", "Brunch", "Dinner"] },
      { day: 5, title: "Da Nang", description: "Beach arrival", activities: ["Fly to Da Nang", "Luxury resort", "Beach spa", "Seafood dinner"], meals: ["Breakfast", "Dinner"] },
      { day: 6, title: "Da Nang Wellness", description: "Full spa day", activities: ["Morning yoga beach", "Full day spa package", "Healthy cuisine"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 7, title: "Hoi An", description: "Ancient town", activities: ["Hoi An visit", "Cooking class", "Spa afternoon", "Lantern dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 8, title: "Nha Trang", description: "Coastal luxury", activities: ["Fly to Nha Trang", "Beach resort", "Sunset spa"], meals: ["Breakfast", "Dinner"] },
      { day: 9, title: "Nha Trang", description: "Island day", activities: ["Private boat", "Snorkeling", "Beach massage", "Seafood feast"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 10, title: "Nha Trang", description: "Wellness", activities: ["Mud baths VIP", "Hot springs", "Spa treatments", "Rest day"], meals: ["Breakfast", "Dinner"] },
      { day: 11, title: "Saigon", description: "City arrival", activities: ["Fly to Saigon", "Premium hotel", "City tour", "Rooftop dinner"], meals: ["Breakfast", "Dinner"] },
      { day: 12, title: "Saigon Spa", description: "Urban wellness", activities: ["Morning spa", "Shopping", "Afternoon tea", "Dinner cruise"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 13, title: "Mekong", description: "Delta day", activities: ["Private Mekong cruise", "Gourmet lunch", "Return", "Farewell gala"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 14, title: "Departure", description: "VIP farewell", activities: ["Final spa treatment", "VIP airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["13 nights 5-star resorts", "Luxury cruise", "All spa treatments", "Domestic flights", "All meals", "Private guides"],
    excluded: ["International flights", "Tips"],
    imageUrl: "/tours/luxury-beach-wellness-14d.jpg",
    rating: 9.6,
    reviewCount: 10,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/luxury-vietnam-beach-wellness-spa-14-days.html",
    durationHours: 336,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Halong Bay", "Da Nang", "Hoi An", "Nha Trang", "Ho Chi Minh City", "Mekong Delta"],
    activities: ["spa", "luxury", "cruise", "beach", "cooking-class"],
  },

  // SENIOR-FRIENDLY TOURS (4 tours)
  {
    id: "vietnam-world-heritage-15d",
    slug: "best-vietnam-world-heritage-sites-15-days",
    name: "Best of Vietnam: World Heritage Sites",
    category: "multi-day",
    location: "Vietnam",
    duration: "15 days, 14 nights",
    price: 1160,
    originalPrice: 1289,
    discount: 10,
    description: "Comprehensive heritage journey designed for seniors and culture lovers.",
    fullDescription: `
      <h3>Heritage Journey</h3>
      <p>Explore Vietnam's UNESCO World Heritage Sites at a comfortable pace perfect for seniors.</p>
    `,
    highlights: ["Mai Chau Valley", "Halong Bay", "Hue Citadel", "Hoi An", "Mekong Delta"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Arrival", activities: ["Airport pickup", "Comfortable hotel", "Evening rest"], meals: ["Dinner"] },
      { day: 2, title: "Hanoi", description: "Gentle tour", activities: ["Ho Chi Minh complex", "Temple of Literature", "Cyclo ride", "Water puppets"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Mai Chau", description: "Valley retreat", activities: ["Scenic drive", "Stilt house check-in", "Easy village walk", "Traditional dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Mai Chau - Ninh Binh", description: "Landscapes", activities: ["Leisurely breakfast", "Transfer to Ninh Binh", "Boat ride Tam Coc", "Evening rest"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 5, title: "Halong Bay", description: "Cruise begins", activities: ["Transfer to Halong", "Comfortable cruise", "Light activities", "Sunset dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 6, title: "Halong Bay", description: "Morning on bay", activities: ["Optional tai chi", "Cave visit", "Return to Hanoi", "Rest"], meals: ["Breakfast", "Brunch"] },
      { day: 7, title: "Hue", description: "Imperial city", activities: ["Fly to Hue", "Citadel tour", "Royal dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 8, title: "Hue", description: "Heritage day", activities: ["Royal tombs", "Thien Mu Pagoda", "Garden house lunch", "Boat cruise"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 9, title: "Hoi An", description: "Ancient town", activities: ["Scenic transfer", "Hotel check-in", "Evening lantern walk"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 10, title: "Hoi An", description: "Free day", activities: ["Optional activities", "Shopping", "Massage", "Cooking class"], meals: ["Breakfast"] },
      { day: 11, title: "Hoi An", description: "Leisure", activities: ["Beach morning", "Tailor pickups", "Riverside dinner"], meals: ["Breakfast", "Dinner"] },
      { day: 12, title: "Saigon", description: "South arrival", activities: ["Fly to Saigon", "City orientation", "Easy evening"], meals: ["Breakfast", "Dinner"] },
      { day: 13, title: "Saigon", description: "City tour", activities: ["War Museum", "Notre Dame", "Central Post Office", "Cooking class"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 14, title: "Mekong Delta", description: "Delta day", activities: ["Comfortable boat tour", "Local village", "Fruit tasting", "Farewell dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 15, title: "Departure", description: "Farewell", activities: ["Morning rest", "Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["14 nights comfortable hotels", "Halong cruise", "Domestic flights", "All meals", "Guides", "Porter service"],
    excluded: ["International flights", "Tips"],
    imageUrl: "/tours/vietnam-world-heritage-15d.jpg",
    rating: 9.6,
    reviewCount: 61,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/best-of-vietnam-15-days.html",
    durationHours: 360,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Mai Chau", "Ninh Binh", "Halong Bay", "Hue", "Hoi An", "Ho Chi Minh City", "Mekong Delta"],
    activities: ["cultural", "cruise", "boat-tour", "cooking-class", "sightseeing"],
  },
  {
    id: "vietnam-highlights-north-south-12d",
    slug: "highlights-vietnam-north-south-12-days",
    name: "Highlights of Vietnam from North to South",
    category: "multi-day",
    location: "Vietnam",
    duration: "12 days, 11 nights",
    price: 1029,
    description: "Perfect first-time visitor journey with moderate pace suitable for all ages.",
    fullDescription: `
      <h3>Vietnam Highlights</h3>
      <p>Experience the best of Vietnam at a comfortable pace ideal for first-time visitors and seniors.</p>
    `,
    highlights: ["Hanoi Old Quarter", "Halong Cruise", "Hue & Hoi An", "Cu Chi Tunnels", "Mekong Delta"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Arrival", activities: ["Airport pickup", "Hotel check-in", "Evening Old Quarter walk"], meals: ["Dinner"] },
      { day: 2, title: "Hanoi", description: "Full day", activities: ["Ho Chi Minh Mausoleum", "One Pillar Pagoda", "Temple of Literature", "Hoan Kiem Lake", "Water puppets"], meals: ["Breakfast", "Lunch"] },
      { day: 3, title: "Halong Bay", description: "Cruise", activities: ["Transfer to Halong", "Cruise boarding", "Lunch on board", "Kayaking optional", "Sunset dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Halong - Hanoi", description: "Return", activities: ["Sunrise tai chi", "Cave visit", "Brunch", "Return to Hanoi", "Evening rest"], meals: ["Breakfast", "Brunch"] },
      { day: 5, title: "Hue", description: "Imperial city", activities: ["Fly to Hue", "Citadel tour", "Thien Mu Pagoda", "Royal dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 6, title: "Hue - Hoi An", description: "Scenic drive", activities: ["Royal tombs", "Hai Van Pass", "Lang Co Beach", "Marble Mountains", "Hoi An arrival"], meals: ["Breakfast", "Lunch"] },
      { day: 7, title: "Hoi An", description: "Ancient town", activities: ["Walking tour", "Japanese Bridge", "Assembly halls", "Cooking class", "Lantern night"], meals: ["Breakfast", "Lunch"] },
      { day: 8, title: "Hoi An Free", description: "Leisure", activities: ["Beach or tailor", "Optional My Son", "Massage", "Free evening"], meals: ["Breakfast"] },
      { day: 9, title: "Saigon", description: "South arrival", activities: ["Fly to Saigon", "City tour", "Ben Thanh Market", "Dinner"], meals: ["Breakfast", "Dinner"] },
      { day: 10, title: "Cu Chi", description: "History day", activities: ["Cu Chi Tunnels", "War Remnants Museum", "Chinatown", "Evening cruise"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 11, title: "Mekong Delta", description: "Delta day", activities: ["Cai Be floating market", "Sampan ride", "Local villages", "Fruit tasting", "Farewell dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 12, title: "Departure", description: "Farewell", activities: ["Morning rest", "Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["11 nights hotels", "Halong cruise", "Domestic flights", "Meals listed", "Guides", "Entrance fees"],
    excluded: ["International flights", "Tips"],
    imageUrl: "/tours/vietnam-highlights-north-south-12d.jpg",
    rating: 9.4,
    reviewCount: 171,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/highlights-of-vietnam-12-days.html",
    durationHours: 288,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Halong Bay", "Hue", "Hoi An", "Ho Chi Minh City", "Cu Chi", "Mekong Delta"],
    activities: ["cultural", "cruise", "historical", "cooking-class", "boat-tour"],
  },
  // Duplicate removed - see real-taste-vietnam-13d in main tour listing above
  {
    id: "vietnam-gentle-pace-10d",
    slug: "vietnam-gentle-pace-10-days",
    name: "Vietnam at a Gentle Pace",
    category: "multi-day",
    location: "Vietnam",
    duration: "10 days, 9 nights",
    price: 1029,
    description: "Relaxed itinerary with minimal walking and comfortable transportation for seniors.",
    fullDescription: `
      <h3>Comfortable Journey</h3>
      <p>Experience Vietnam's highlights with a gentle pace, comfortable hotels, and easy activities.</p>
    `,
    highlights: ["Comfortable Hotels", "Easy Activities", "Porter Service", "Leisurely Meals", "Rest Time"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Arrival", activities: ["VIP airport pickup", "4-star hotel", "Rest time", "Easy dinner"], meals: ["Dinner"] },
      { day: 2, title: "Hanoi", description: "Easy tour", activities: ["Late breakfast", "Cyclo tour", "Temple of Literature", "Afternoon rest", "Water puppets"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Halong Bay", description: "Comfortable cruise", activities: ["Late departure", "Cruise boarding", "Light activities", "Sunset viewing", "Early dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Halong - Hanoi", description: "Return", activities: ["Morning rest", "Gentle cave visit", "Leisurely return", "Evening rest"], meals: ["Breakfast", "Brunch"] },
      { day: 5, title: "Hoi An", description: "Direct flight", activities: ["Fly to Da Nang", "Beach resort", "Pool time", "Gentle evening walk"], meals: ["Breakfast", "Dinner"] },
      { day: 6, title: "Hoi An", description: "Ancient town", activities: ["Late start", "Cyclo tour", "Leisurely lunch", "Afternoon rest", "Lantern viewing"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 7, title: "Hoi An", description: "Free day", activities: ["Sleep in", "Optional spa", "Beach time", "Easy dinner"], meals: ["Breakfast", "Dinner"] },
      { day: 8, title: "Saigon", description: "South arrival", activities: ["Fly to Saigon", "City tour by car", "Evening rest"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 9, title: "Mekong Delta", description: "Easy delta", activities: ["Comfortable boat tour", "Village visit", "Fruit tasting", "Farewell dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 10, title: "Departure", description: "Farewell", activities: ["Late checkout", "Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["9 nights 4-star hotels", "Halong cruise", "Domestic flights", "All meals", "Porter service", "Private guides"],
    excluded: ["International flights", "Tips"],
    imageUrl: "/tours/vietnam-essential-10d.jpg",
    rating: 9.7,
    reviewCount: 45,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/vietnam-gentle-pace-10-days.html",
    durationHours: 240,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Halong Bay", "Hoi An", "Ho Chi Minh City", "Mekong Delta"],
    activities: ["cultural", "cruise", "sightseeing", "boat-tour"],
  },

  // CLASSIC ESSENTIAL TOURS (5 tours)
  {
    id: "vietnam-essential-10d",
    slug: "vietnam-essential-10-days",
    name: "Vietnam Essential",
    category: "multi-day",
    location: "Vietnam",
    duration: "10 days, 9 nights",
    price: 899,
    originalPrice: 999,
    discount: 10,
    description: "Best-selling Vietnam tour covering all major highlights from North to South.",
    fullDescription: `
      <h3>Vietnam's Best</h3>
      <p>Our most popular tour covering everything essential in Vietnam at an excellent value.</p>
    `,
    highlights: ["Hanoi City", "Halong Bay Cruise", "Hue & Hoi An", "Saigon", "Mekong Delta"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Arrival", activities: ["Airport pickup", "Hotel check-in", "Old Quarter evening walk", "Welcome dinner"], meals: ["Dinner"] },
      { day: 2, title: "Hanoi", description: "Full day", activities: ["Ho Chi Minh Mausoleum", "One Pillar Pagoda", "Temple of Literature", "Ethnology Museum", "Water puppets"], meals: ["Breakfast", "Lunch"] },
      { day: 3, title: "Halong Bay", description: "Cruise", activities: ["Transfer to Halong", "Cruise boarding", "Lunch on board", "Kayaking", "Cooking class", "Overnight on bay"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Halong - Hanoi - Hue", description: "Journey south", activities: ["Sunrise tai chi", "Cave visit", "Return to Hanoi", "Fly to Hue"], meals: ["Breakfast", "Brunch", "Dinner"] },
      { day: 5, title: "Hue", description: "Imperial city", activities: ["Imperial Citadel", "Thien Mu Pagoda", "Royal tombs", "Perfume River cruise"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 6, title: "Hue - Hoi An", description: "Scenic route", activities: ["Hai Van Pass", "Lang Co Beach", "Marble Mountains", "Hoi An arrival", "Ancient town evening"], meals: ["Breakfast", "Lunch"] },
      { day: 7, title: "Hoi An", description: "Ancient town", activities: ["Walking tour", "Japanese Bridge", "Cooking class", "Lantern night"], meals: ["Breakfast", "Lunch"] },
      { day: 8, title: "Hoi An - Saigon", description: "South arrival", activities: ["Morning free", "Fly to Saigon", "City orientation", "Ben Thanh Market"], meals: ["Breakfast", "Dinner"] },
      { day: 9, title: "Saigon & Mekong", description: "Full day", activities: ["Cu Chi Tunnels", "Lunch", "Mekong Delta", "Sampan ride", "Fruit tasting", "Farewell dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 10, title: "Departure", description: "Farewell", activities: ["Morning free", "Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["9 nights hotels", "Halong overnight cruise", "Domestic flights", "Meals listed", "Guides", "Entrance fees"],
    excluded: ["International flights", "Tips", "Personal expenses"],
    imageUrl: "/tours/vietnam-essential-10d.jpg",
    rating: 9.6,
    reviewCount: 112,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/vietnam-essential-10-days-small-group-tour.html",
    durationHours: 240,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Halong Bay", "Hue", "Hoi An", "Ho Chi Minh City", "Cu Chi", "Mekong Delta"],
    activities: ["cruise", "cultural", "historical", "cooking-class", "boat-tour"],
  },
  {
    id: "vietnam-classic-8d",
    slug: "vietnam-classic-tour-8-days",
    name: "Vietnam Classic Tour",
    category: "multi-day",
    location: "Vietnam",
    duration: "8 days, 7 nights",
    price: 1559,
    description: "Compact Vietnam experience covering the essential highlights in 8 days.",
    fullDescription: `
      <h3>Classic Vietnam</h3>
      <p>Experience Vietnam's key destinations in a well-paced 8-day journey.</p>
    `,
    highlights: ["Hanoi", "Halong Bay", "Hoi An", "Saigon", "Mekong Delta"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Arrival", activities: ["Airport pickup", "Hotel check-in", "Old Quarter walk", "Welcome dinner"], meals: ["Dinner"] },
      { day: 2, title: "Hanoi", description: "City tour", activities: ["Ho Chi Minh complex", "Temple of Literature", "Hoan Kiem Lake", "Water puppets"], meals: ["Breakfast", "Lunch"] },
      { day: 3, title: "Halong Bay", description: "Day cruise", activities: ["Transfer to Halong", "Day cruise", "Kayaking", "Cave visit", "Return to Hanoi"], meals: ["Breakfast", "Lunch"] },
      { day: 4, title: "Hoi An", description: "Central arrival", activities: ["Fly to Da Nang", "Transfer to Hoi An", "Ancient town tour", "Lantern evening"], meals: ["Breakfast", "Dinner"] },
      { day: 5, title: "Hoi An", description: "Full day", activities: ["Cooking class", "Countryside cycling", "Beach time", "Free evening"], meals: ["Breakfast", "Lunch"] },
      { day: 6, title: "Saigon", description: "South arrival", activities: ["Fly to Saigon", "City tour", "War Remnants Museum", "Ben Thanh Market"], meals: ["Breakfast", "Dinner"] },
      { day: 7, title: "Mekong Delta", description: "Delta day", activities: ["Full day Mekong", "Floating market", "Coconut village", "Sampan ride", "Farewell dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 8, title: "Departure", description: "Farewell", activities: ["Morning free", "Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["7 nights hotels", "Day cruise", "Domestic flights", "Meals listed", "Guides"],
    excluded: ["International flights", "Tips"],
    imageUrl: "/tours/vietnam-classic-8d.jpg",
    rating: 9.3,
    reviewCount: 87,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/vietnam-grand-discovery-18-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/674d6ec6a2e6d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661758e2ccbd8.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661758e2ccbdb.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666c1d408318.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666c1e4b77c5.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666c1f7da777.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661758e2ccce3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666c20db2dd7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661758e2ccce6.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666c2205d73b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661758e2ccce7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666c22e6336a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666c29ab1c7a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6617587c1fcd6.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6617587c1fcd8.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666c2aa78618.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661758e2ccce8.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6617587c1fcd9.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6617587c1fcda.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6617587c1fcdb.jpg"],
    pricingTiers: [{"category":"Economy (2*)","price":1559},{"category":"Superior (3*)","price":1699},{"category":"First Class (4*)","price":2049}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 192,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Halong Bay", "Hoi An", "Ho Chi Minh City", "Mekong Delta"],
    activities: ["cruise", "cultural", "cooking-class", "cycling", "boat-tour"],
  },
  {
    id: "vietnam-discovery-14d",
    slug: "vietnam-discovery-14-days",
    name: "Vietnam Discovery",
    category: "multi-day",
    location: "Vietnam",
    duration: "14 days, 13 nights",
    price: 1069,
    description: "In-depth Vietnam exploration with extra time in each destination.",
    fullDescription: `
      <h3>Deep Discovery</h3>
      <p>Take your time to truly experience Vietnam with longer stays in each location.</p>
    `,
    highlights: ["Hanoi In-Depth", "Halong Overnight", "Hue & Hoi An Extended", "Saigon & Delta"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Arrival", activities: ["Airport pickup", "Hotel check-in", "Evening free"], meals: ["Dinner"] },
      { day: 2, title: "Hanoi", description: "Full day", activities: ["Ho Chi Minh complex", "Temple of Literature", "Ethnology Museum", "Water puppets"], meals: ["Breakfast", "Lunch"] },
      { day: 3, title: "Hanoi", description: "Food & Culture", activities: ["Street food tour", "Old Quarter walking", "Cooking class"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Halong Bay", description: "Cruise begins", activities: ["Transfer to Halong", "Cruise boarding", "Kayaking", "Cooking demo"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 5, title: "Halong Bay", description: "Continued", activities: ["Sunrise tai chi", "Cave visit", "Return to Hanoi", "Evening rest"], meals: ["Breakfast", "Brunch"] },
      { day: 6, title: "Hue", description: "Imperial arrival", activities: ["Fly to Hue", "Citadel tour", "Evening walk"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 7, title: "Hue", description: "Heritage day", activities: ["Royal tombs", "Thien Mu Pagoda", "Perfume River", "Royal dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 8, title: "Hoi An", description: "Ancient town", activities: ["Scenic drive", "Marble Mountains", "Ancient town arrival", "Lantern evening"], meals: ["Breakfast", "Lunch"] },
      { day: 9, title: "Hoi An", description: "Full day", activities: ["Walking tour", "Cooking class", "Tailor visits", "Night market"], meals: ["Breakfast", "Lunch"] },
      { day: 10, title: "Hoi An", description: "Leisure", activities: ["Beach morning", "My Son afternoon", "Free evening"], meals: ["Breakfast", "Lunch"] },
      { day: 11, title: "Saigon", description: "South arrival", activities: ["Fly to Saigon", "City tour", "Rooftop dinner"], meals: ["Breakfast", "Dinner"] },
      { day: 12, title: "Saigon", description: "Full day", activities: ["War Remnants Museum", "Cu Chi Tunnels", "Chinatown", "Dinner cruise"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 13, title: "Mekong Delta", description: "Delta adventure", activities: ["Cai Be floating market", "Village visits", "Cooking with locals", "Farewell dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 14, title: "Departure", description: "Farewell", activities: ["Morning rest", "Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["13 nights hotels", "Halong overnight", "Domestic flights", "Meals listed", "Guides"],
    excluded: ["International flights", "Tips"],
    imageUrl: "/tours/vietnam-discovery-14d.jpg",
    rating: 9.5,
    reviewCount: 67,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/off-the-beaten-track-northeast-vietnam-7-days.html",
    durationHours: 336,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Halong Bay", "Hue", "Hoi An", "Ho Chi Minh City", "Cu Chi", "Mekong Delta"],
    activities: ["cruise", "cultural", "cooking-class", "historical", "boat-tour"],
  },
  {
    id: "vietnam-express-6d",
    slug: "vietnam-express-6-days",
    name: "Vietnam Express",
    category: "multi-day",
    location: "Vietnam",
    duration: "6 days, 5 nights",
    price: 1029,
    description: "Quick Vietnam highlights tour for travelers with limited time.",
    fullDescription: `
      <h3>Quick Vietnam</h3>
      <p>See Vietnam's top highlights in just 6 days for busy travelers.</p>
    `,
    highlights: ["Hanoi Quick Tour", "Halong Day Cruise", "Hoi An", "Saigon"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Arrival", activities: ["Airport pickup", "City highlights tour", "Water puppets", "Welcome dinner"], meals: ["Dinner"] },
      { day: 2, title: "Halong Bay", description: "Day cruise", activities: ["Early transfer", "Day cruise", "Kayaking", "Cave visit", "Return to Hanoi"], meals: ["Breakfast", "Lunch"] },
      { day: 3, title: "Hoi An", description: "Ancient town", activities: ["Fly to Da Nang", "Hoi An tour", "Cooking class", "Lantern night"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Hoi An Free", description: "Leisure", activities: ["Beach or shopping", "Tailor pickups", "Free evening"], meals: ["Breakfast"] },
      { day: 5, title: "Saigon", description: "South highlights", activities: ["Fly to Saigon", "City tour", "War Museum", "Farewell dinner"], meals: ["Breakfast", "Dinner"] },
      { day: 6, title: "Departure", description: "Farewell", activities: ["Morning free", "Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["5 nights hotels", "Day cruise", "Domestic flights", "Meals listed", "Guides"],
    excluded: ["International flights", "Tips"],
    imageUrl: "/tours/vietnam-6days.jpg",
    rating: 9.2,
    reviewCount: 134,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/vietnam-express-6-days.html",
    durationHours: 144,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Halong Bay", "Hoi An", "Ho Chi Minh City"],
    activities: ["cruise", "cultural", "cooking-class", "historical"],
  },
  {
    id: "vietnam-complete-18d",
    slug: "vietnam-complete-18-days",
    name: "Vietnam Complete",
    category: "multi-day",
    location: "Vietnam",
    duration: "18 days, 17 nights",
    price: 1029,
    description: "The most comprehensive Vietnam tour including hidden gems and remote areas.",
    fullDescription: `
      <h3>Complete Vietnam</h3>
      <p>Our most comprehensive tour covering Vietnam from north to south with hidden gems.</p>
    `,
    highlights: ["Sapa Trekking", "Halong Overnight", "DMZ History", "Phu Quoc Beach", "Mekong Homestay"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Arrival", activities: ["Airport pickup", "Hotel check-in", "Evening exploration"], meals: ["Dinner"] },
      { day: 2, title: "Hanoi", description: "Full day", activities: ["Ho Chi Minh complex", "Temple of Literature", "Old Quarter", "Water puppets"], meals: ["Breakfast", "Lunch"] },
      { day: 3, title: "Sapa", description: "Mountain journey", activities: ["Night train to Sapa", "Trekking begins"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Sapa", description: "Village trek", activities: ["Full day trek", "Village visits", "Homestay"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 5, title: "Sapa - Hanoi", description: "Return", activities: ["Morning views", "Train to Hanoi"], meals: ["Breakfast", "Lunch"] },
      { day: 6, title: "Halong Bay", description: "Cruise", activities: ["Transfer to Halong", "Overnight cruise", "Kayaking"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 7, title: "Halong Bay", description: "Morning on bay", activities: ["Sunrise", "Cave visit", "Return to Hanoi"], meals: ["Breakfast", "Brunch"] },
      { day: 8, title: "Hue", description: "Imperial arrival", activities: ["Fly to Hue", "Citadel tour"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 9, title: "DMZ", description: "War history", activities: ["Full day DMZ tour", "Vinh Moc Tunnels", "Khe Sanh"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 10, title: "Hoi An", description: "Ancient town", activities: ["Scenic transfer", "Ancient town tour", "Lanterns"], meals: ["Breakfast", "Lunch"] },
      { day: 11, title: "Hoi An", description: "Free day", activities: ["Beach or My Son", "Cooking class", "Free time"], meals: ["Breakfast", "Lunch"] },
      { day: 12, title: "Saigon", description: "South arrival", activities: ["Fly to Saigon", "City tour", "Night market"], meals: ["Breakfast", "Dinner"] },
      { day: 13, title: "Cu Chi & Saigon", description: "History day", activities: ["Cu Chi Tunnels", "War Museum", "Shopping"], meals: ["Breakfast", "Lunch"] },
      { day: 14, title: "Mekong Delta", description: "Delta overnight", activities: ["Transfer to Mekong", "Village visits", "Homestay"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 15, title: "Mekong - Saigon", description: "Return", activities: ["Floating market", "Return to Saigon"], meals: ["Breakfast", "Lunch"] },
      { day: 16, title: "Phu Quoc", description: "Island arrival", activities: ["Fly to Phu Quoc", "Beach resort", "Sunset"], meals: ["Breakfast", "Dinner"] },
      { day: 17, title: "Phu Quoc", description: "Island day", activities: ["Snorkeling", "Beach", "Night market", "Farewell dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 18, title: "Departure", description: "Farewell", activities: ["Beach morning", "Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["17 nights hotels/cruise/homestay", "Domestic flights", "Train tickets", "All meals listed", "Guides"],
    excluded: ["International flights", "Tips"],
    imageUrl: "/tours/discover-vietnam-20d.jpg",
    rating: 9.7,
    reviewCount: 43,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/vietnam-complete-18-days.html",
    durationHours: 432,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Sapa", "Halong Bay", "Hue", "DMZ", "Hoi An", "Ho Chi Minh City", "Cu Chi", "Mekong Delta", "Phu Quoc"],
    activities: ["trekking", "cruise", "historical", "beach", "homestay", "snorkeling"],
  },

  // DAY TRIPS & SHORT TOURS (6 tours)
  {
    id: "hanoi-food-walking-tour",
    slug: "hanoi-street-food-walking-tour",
    name: "Hanoi Street Food Walking Tour",
    category: "day-trip",
    location: "Hanoi",
    duration: "4 hours",
    price: 35,
    description: "Evening street food adventure through Hanoi's Old Quarter with local guide.",
    fullDescription: `
      <h3>Hanoi Flavors</h3>
      <p>Taste authentic Hanoi street food in the atmospheric Old Quarter with a knowledgeable local guide.</p>
    `,
    highlights: ["Pho Tasting", "Banh Mi", "Egg Coffee", "Bun Cha", "Local Markets"],
    itinerary: [
      { day: 1, title: "Food Tour", description: "Evening adventure", activities: ["Hotel pickup", "Pho shop", "Banh mi street", "Bun cha dinner", "Egg coffee", "Night market walk", "Bia hoi corner", "Return"], meals: ["All food included"] }
    ],
    included: ["All food tastings", "Drinks", "Local guide", "Hotel pickup/dropoff"],
    excluded: ["Tips", "Additional food"],
    imageUrl: "/tours/hanoi-food-walking-tour.jpg",
    rating: 9.6,
    reviewCount: 234,
    affiliateUrl: "https://www.bestpricetravel.com/hanoi-tours/hanoi-street-food-tour.html",
    durationHours: 4,
    startCity: "Hanoi",
    destinations: ["Hanoi"],
    activities: ["food-tour", "walking-tour", "cultural"],
  },
  {
    id: "mekong-delta-day-trip",
    slug: "mekong-delta-day-trip-from-saigon",
    name: "Mekong Delta Day Trip",
    category: "day-trip",
    location: "Mekong Delta",
    duration: "1 day",
    price: 45,
    description: "Full day exploration of the Mekong Delta with floating markets and boat rides.",
    fullDescription: `
      <h3>Delta Discovery</h3>
      <p>Experience the vibrant life of the Mekong Delta in a comprehensive day trip from Saigon.</p>
    `,
    highlights: ["Cai Be Market", "Coconut Village", "Sampan Ride", "Local Industries", "Fruit Tasting"],
    itinerary: [
      { day: 1, title: "Mekong Delta", description: "Full day", activities: ["Early hotel pickup", "Drive to My Tho", "Boat to islands", "Coconut candy workshop", "Honey farm", "Sampan through canals", "Tropical fruit tasting", "Local lunch", "Return to Saigon"], meals: ["Lunch"] }
    ],
    included: ["Transportation", "Boat trips", "Lunch", "Entrance fees", "Guide"],
    excluded: ["Tips", "Drinks", "Personal expenses"],
    imageUrl: "/tours/mekong-delta-day-trip.jpg",
    rating: 9.3,
    reviewCount: 456,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/best-of-south-vietnam-5-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/678f59b34fd96.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c43b47c30.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c43b47c34.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c43b47c33.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c3d22a8d9.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c3d22a8d5.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c3d22a8d8.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c459ec1ad.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c459ec1af.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/best-of-south-vietnam-5-days-64b5f1ef3149a.png","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65ddb07b69941.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65ddb07b69944.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65ddb07b69942.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65ddb07b69946.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65ddb07b69945.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65ddb07b69947.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f9cbd74e1f7.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f4d8c946295.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f4ea7fa9816.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f73a39b937c.jpg"],
    pricingTiers: [{"category":"Superior (3*)","price":559},{"category":"First Class (4*)","price":659},{"category":"Deluxe (5*)","price":759}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 10,
    startCity: "Ho Chi Minh City",
    destinations: ["Mekong Delta"],
    activities: ["boat-tour", "cultural", "market-visit", "nature"],
  },
  {
    id: "ninh-binh-day-trip",
    slug: "ninh-binh-day-trip-from-hanoi",
    name: "Ninh Binh Day Trip from Hanoi",
    category: "day-trip",
    location: "Ninh Binh",
    duration: "1 day",
    price: 80,
    description: "Discover the 'Halong Bay on Land' with boat rides, caves, and stunning landscapes.",
    fullDescription: `
      <h3>Dry Halong Bay</h3>
      <p>Experience Ninh Binh's stunning karst landscapes on a full day trip from Hanoi.</p>
    `,
    highlights: ["Tam Coc Boat Ride", "Mua Cave Viewpoint", "Bich Dong Pagoda", "Rice Paddies", "Limestone Karsts"],
    itinerary: [
      { day: 1, title: "Ninh Binh", description: "Full day", activities: ["Hotel pickup", "Scenic drive", "Tam Coc boat ride", "Local lunch", "Mua Cave climb", "Panoramic views", "Bich Dong Pagoda", "Return to Hanoi"], meals: ["Lunch"] }
    ],
    included: ["Transportation", "Boat ride", "Entrance fees", "Lunch", "Guide"],
    excluded: ["Tips", "Drinks"],
    imageUrl: "/tours/ninh-binh-day-trip.jpg",
    rating: 9.5,
    reviewCount: 312,
    affiliateUrl: "https://www.bestpricetravel.com/ninh-binh-tours/ninh-binh-hoa-lu-trang-an-full-day-private-tour.html",
    durationHours: 10,
    startCity: "Hanoi",
    destinations: ["Ninh Binh"],
    activities: ["boat-tour", "cave-exploration", "nature", "photography"],
  },
  {
    id: "perfume-pagoda-day-trip",
    slug: "perfume-pagoda-day-trip-from-hanoi",
    name: "Perfume Pagoda Day Trip",
    category: "day-trip",
    location: "Hanoi",
    duration: "1 day",
    price: 59,
    description: "Spiritual journey to Vietnam's most important Buddhist pilgrimage site.",
    fullDescription: `
      <h3>Sacred Journey</h3>
      <p>Visit the Perfume Pagoda complex, Vietnam's most revered Buddhist pilgrimage destination.</p>
    `,
    highlights: ["Huong Tich Cave", "Sampan Boat Ride", "Cable Car", "Buddhist Temples", "Limestone Mountains"],
    itinerary: [
      { day: 1, title: "Perfume Pagoda", description: "Full day", activities: ["Early hotel pickup", "Drive to pagoda", "Sampan boat ride", "Cable car up", "Temple visits", "Huong Tich Cave", "Vegetarian lunch", "Return by boat", "Drive to Hanoi"], meals: ["Lunch"] }
    ],
    included: ["Transportation", "Boat ride", "Cable car", "Entrance fees", "Lunch", "Guide"],
    excluded: ["Tips", "Incense for offerings"],
    imageUrl: "/tours/perfume-pagoda-day-trip.jpg",
    rating: 9.2,
    reviewCount: 89,
    affiliateUrl: "https://www.bestpricetravel.com/hue-tours/imperial-taste-on-perfume-river.html",
    durationHours: 10,
    startCity: "Hanoi",
    destinations: ["Hanoi"],
    activities: ["temple-visit", "boat-tour", "cable-car", "cultural"],
  },
  {
    id: "cu-chi-tunnels-half-day",
    slug: "cu-chi-tunnels-half-day-tour",
    name: "Cu Chi Tunnels Half Day Tour",
    category: "day-trip",
    location: "Ho Chi Minh City",
    duration: "Half day",
    price: 39,
    description: "Explore the incredible tunnel network used during the Vietnam War.",
    fullDescription: `
      <h3>War History</h3>
      <p>Discover the remarkable Cu Chi tunnel system and learn about Vietnam War history.</p>
    `,
    highlights: ["Tunnel Complex", "War History", "Shooting Range", "Trap Displays", "Video Presentation"],
    itinerary: [
      { day: 1, title: "Cu Chi", description: "Half day", activities: ["Hotel pickup", "Drive to Cu Chi", "Video presentation", "Tunnel exploration", "Trap displays", "Optional shooting range", "Return to Saigon"], meals: [] }
    ],
    included: ["Transportation", "Entrance fees", "Guide", "Water"],
    excluded: ["Tips", "Shooting range", "Lunch"],
    imageUrl: "/tours/cu-chi-tunnels-half-day.jpg",
    rating: 9.4,
    reviewCount: 567,
    affiliateUrl: "https://www.bestpricetravel.com/ho-chi-minh-city-tours/cu-chi-tunnels-half-day-small-group.html",
    durationHours: 5,
    startCity: "Ho Chi Minh City",
    destinations: ["Cu Chi"],
    activities: ["historical", "educational", "cultural"],
  },
  {
    id: "my-son-sanctuary-half-day",
    slug: "my-son-sanctuary-half-day-tour",
    name: "My Son Sanctuary Half Day Tour",
    category: "day-trip",
    location: "Hoi An",
    duration: "Half day",
    price: 48,
    description: "Visit the ancient Cham temples of My Son, a UNESCO World Heritage Site.",
    fullDescription: `
      <h3>Ancient Cham Kingdom</h3>
      <p>Explore the remarkable Hindu temple ruins of the ancient Cham civilization.</p>
    `,
    highlights: ["UNESCO Site", "Cham Temples", "Ancient History", "Traditional Dance", "Mountain Setting"],
    itinerary: [
      { day: 1, title: "My Son", description: "Half day", activities: ["Hotel pickup", "Drive to My Son", "Sunrise viewing", "Temple complex tour", "Cham dance performance", "Return to Hoi An"], meals: [] }
    ],
    included: ["Transportation", "Entrance fees", "Guide", "Water"],
    excluded: ["Tips", "Breakfast"],
    imageUrl: "/tours/my-son-sanctuary-half-day.jpg",
    rating: 9.3,
    reviewCount: 234,
    affiliateUrl: "https://www.bestpricetravel.com/hoi-an-tours/my-son-sanctuary-half-day-tour.html",
    durationHours: 5,
    startCity: "Hoi An",
    destinations: ["Hoi An"],
    activities: ["historical", "cultural", "temple-visit", "photography"],
  },

  // ============================================
  // BATCH 6: 30 MORE BESTPRICETRAVEL TOURS
  // ============================================

  // ADVENTURE TOURS (6 tours)
  {
    id: "vietnam-adventure-biking-trekking-12d",
    slug: "vietnam-adventure-biking-trekking-snorkeling-12-days",
    name: "Vietnam Adventure: Biking, Trekking & Snorkeling",
    category: "multi-day",
    location: "Vietnam",
    duration: "12 days, 11 nights",
    price: 1189,
    description: "Active adventure combining mountain treks, coral reef snorkeling, and Mekong cycling.",
    fullDescription: `
      <h3>Ultimate Adventure</h3>
      <p>Experience Vietnam's diverse landscapes through trekking, cycling, and water activities.</p>
    `,
    highlights: ["Sapa Trekking", "Nha Trang Snorkeling", "Mekong Cycling", "Village Homestays", "Beach Time"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Arrival", activities: ["Airport pickup", "Hotel check-in", "Old Quarter walk", "Welcome dinner"], meals: ["Dinner"] },
      { day: 2, title: "Hanoi - Sapa", description: "Mountain journey", activities: ["Train to Sapa", "Arrive Sapa", "Town exploration"], meals: ["Breakfast", "Dinner"] },
      { day: 3, title: "Sapa Trekking", description: "Mountain trek", activities: ["Trek to Cat Cat", "Rice terraces", "Hmong villages", "Homestay"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Sapa Trekking", description: "Continued", activities: ["Trek to Ta Van", "Valley views", "Bamboo forest", "Return Sapa"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 5, title: "Sapa - Hanoi", description: "Return", activities: ["Morning views", "Train to Hanoi", "Evening free"], meals: ["Breakfast", "Lunch"] },
      { day: 6, title: "Fly to Nha Trang", description: "Beach arrival", activities: ["Flight to Nha Trang", "Beach resort", "Evening free"], meals: ["Breakfast", "Dinner"] },
      { day: 7, title: "Nha Trang Snorkeling", description: "Sea adventure", activities: ["Island boat trip", "Snorkeling 3 spots", "Beach BBQ", "More snorkeling"], meals: ["Breakfast", "Lunch"] },
      { day: 8, title: "Nha Trang Free", description: "Beach day", activities: ["Beach relaxation", "Optional diving", "Mud baths", "Seafood dinner"], meals: ["Breakfast", "Dinner"] },
      { day: 9, title: "Fly to Saigon", description: "South arrival", activities: ["Flight to Saigon", "City tour", "Night market"], meals: ["Breakfast", "Dinner"] },
      { day: 10, title: "Mekong Cycling", description: "Delta adventure", activities: ["Transfer to Mekong", "Cycling villages", "Boat rides", "Homestay"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 11, title: "Mekong Cycling", description: "Continued", activities: ["Floating market", "More cycling", "Local industries", "Return Saigon"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 12, title: "Departure", description: "Farewell", activities: ["Morning free", "Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["11 nights hotels/homestays", "Domestic flights", "Train tickets", "Bicycle", "Snorkeling gear", "Meals listed"],
    excluded: ["International flights", "Tips", "Diving"],
    imageUrl: "/tours/vietnam-adventure-biking-trekking-12d.jpg",
    rating: 9.6,
    reviewCount: 7,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/vietnam-biking-trekking-snorkeling-12-days.html",
    durationHours: 288,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Sapa", "Nha Trang", "Ho Chi Minh City", "Mekong Delta"],
    activities: ["trekking", "cycling", "snorkeling", "homestay", "adventure"],
  },
  {
    id: "vietnam-bike-north-south-16d",
    slug: "vietnam-adventure-bike-north-south-16-days",
    name: "Vietnam Adventure on Bike: North to South",
    category: "multi-day",
    location: "Vietnam",
    duration: "16 days, 15 nights",
    price: 1899,
    description: "Epic cycling journey through Vietnam from Hanoi to Ho Chi Minh City.",
    fullDescription: `
      <h3>Cycling Vietnam</h3>
      <p>Pedal through Vietnam's most scenic routes from north to south on this ultimate cycling adventure.</p>
    `,
    highlights: ["Sapa Cycling", "Halong Bay", "Hai Van Pass", "Mekong Delta", "Vespa Tours"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Arrival", activities: ["Airport pickup", "Bike fitting", "Welcome dinner"], meals: ["Dinner"] },
      { day: 2, title: "Hanoi Cycling", description: "City ride", activities: ["Hanoi bike tour", "Old Quarter", "West Lake", "Night cycling"], meals: ["Breakfast", "Lunch"] },
      { day: 3, title: "Sapa", description: "Mountain journey", activities: ["Train to Sapa", "Afternoon cycling", "Village visit"], meals: ["Breakfast", "Dinner"] },
      { day: 4, title: "Sapa Cycling", description: "Mountain ride", activities: ["Downhill cycling", "Rice terraces", "Hmong villages", "Homestay"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 5, title: "Sapa - Hanoi", description: "Return", activities: ["Morning cycling", "Train to Hanoi"], meals: ["Breakfast", "Lunch"] },
      { day: 6, title: "Halong Bay", description: "Cruise", activities: ["Transfer to Halong", "Cruise & kayaking", "Sunset views"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 7, title: "Halong - Hanoi", description: "Return", activities: ["Morning bay", "Return Hanoi", "Fly to Hue"], meals: ["Breakfast", "Brunch", "Dinner"] },
      { day: 8, title: "Hue Cycling", description: "Imperial ride", activities: ["Citadel cycling", "Countryside paths", "Tombs visit"], meals: ["Breakfast", "Lunch"] },
      { day: 9, title: "Hai Van Pass", description: "Epic ride", activities: ["Cycle Hai Van Pass", "Panoramic views", "Arrive Hoi An"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 10, title: "Hoi An Cycling", description: "Countryside", activities: ["Tra Que village", "Rice paddies", "Beach cycling"], meals: ["Breakfast", "Lunch"] },
      { day: 11, title: "Hoi An Free", description: "Rest day", activities: ["Beach time", "Ancient town", "Lantern night"], meals: ["Breakfast"] },
      { day: 12, title: "Fly to Saigon", description: "South arrival", activities: ["Flight", "Vespa night tour", "Street food"], meals: ["Breakfast", "Dinner"] },
      { day: 13, title: "Cu Chi Cycling", description: "History ride", activities: ["Cycle to Cu Chi", "Tunnel visit", "Return Saigon"], meals: ["Breakfast", "Lunch"] },
      { day: 14, title: "Mekong Cycling", description: "Delta ride", activities: ["Transfer to Mekong", "Island cycling", "Village visits", "Homestay"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 15, title: "Mekong Cycling", description: "Final ride", activities: ["Floating market", "Cycling back roads", "Farewell dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 16, title: "Departure", description: "Farewell", activities: ["Transfer to Saigon", "Airport"], meals: ["Breakfast"] }
    ],
    included: ["15 nights hotels/homestays/cruise", "Quality bicycle", "Support vehicle", "Domestic flights", "Train", "Meals listed"],
    excluded: ["International flights", "Tips"],
    imageUrl: "/tours/vietnam-bike-north-south-16d.jpg",
    rating: 9.4,
    reviewCount: 11,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/vietnam-on-wheels-16-days.html",
    durationHours: 384,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Sapa", "Halong Bay", "Hue", "Hoi An", "Ho Chi Minh City", "Cu Chi", "Mekong Delta"],
    activities: ["cycling", "cruise", "trekking", "vespa-tour", "adventure"],
  },
  {
    id: "vietnam-land-rail-water-12d",
    slug: "ultimate-vietnam-journey-land-rail-water-12-days",
    name: "Ultimate Vietnam Journey: Land, Rail & Water",
    category: "multi-day",
    location: "Vietnam",
    duration: "12 days, 11 nights",
    price: 1379,
    description: "Multi-modal adventure by motorbike, train, boat, and on foot across Vietnam.",
    fullDescription: `
      <h3>Journey by All Means</h3>
      <p>Experience Vietnam through every mode of transport for the ultimate adventure.</p>
    `,
    highlights: ["Motorbike Tours", "Train Journeys", "Halong Cruise", "Mekong Boats", "Sapa Trekking"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Arrival", activities: ["Airport pickup", "Motorbike orientation", "Evening ride"], meals: ["Dinner"] },
      { day: 2, title: "Hanoi by Motorbike", description: "City exploration", activities: ["Full day motorbike tour", "Back streets", "Local eats", "Night market"], meals: ["Breakfast", "Lunch"] },
      { day: 3, title: "Train to Sapa", description: "Rail journey", activities: ["Day in Hanoi", "Night train to Sapa"], meals: ["Breakfast", "Lunch"] },
      { day: 4, title: "Sapa Trekking", description: "Mountain adventure", activities: ["Trek to villages", "Rice terraces", "Homestay"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 5, title: "Sapa - Hanoi", description: "Return", activities: ["Morning views", "Train back", "Evening free"], meals: ["Breakfast", "Lunch"] },
      { day: 6, title: "Halong Bay", description: "Cruise begins", activities: ["Transfer by car", "Cruise boarding", "Kayaking"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 7, title: "Halong - Hoi An", description: "Fly south", activities: ["Morning on bay", "Return Hanoi", "Fly to Da Nang"], meals: ["Breakfast", "Brunch", "Dinner"] },
      { day: 8, title: "Hoi An by Bicycle", description: "Cycling day", activities: ["Countryside cycling", "Village visits", "Ancient town"], meals: ["Breakfast", "Lunch"] },
      { day: 9, title: "Hoi An - Saigon", description: "Fly south", activities: ["Morning free", "Fly to Saigon", "Vespa tour"], meals: ["Breakfast", "Dinner"] },
      { day: 10, title: "Mekong by Boat", description: "Delta adventure", activities: ["Transfer to Mekong", "Full day on water", "Homestay"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 11, title: "Mekong Delta", description: "Continued", activities: ["Floating market", "Sampan rides", "Return Saigon", "Farewell dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 12, title: "Departure", description: "Farewell", activities: ["Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["11 nights hotels/cruise/homestay", "Motorbike tours", "Train tickets", "Domestic flights", "Cruise", "Meals listed"],
    excluded: ["International flights", "Tips"],
    imageUrl: "/tours/vietnam-land-rail-water-12d.jpg",
    rating: 9.4,
    reviewCount: 6,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/vietnam-mix-transportation-12-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667e656a10244.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660fae70263b4.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660fae70263b3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667cd83330c46.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660fae70263b5.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667cd8488b588.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667cd85c869ad.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667cd86e80f65.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660fae70263b6.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667cd880da460.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660fae70263b7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667cd89fc7c19.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660fae70263b8.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660fae70263aa.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660fae70263b9.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660fae70263ac.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660fae70263ad.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660fae70263ae.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667cd8af1b66b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660fae70263af.jpg"],
    pricingTiers: [{"category":"Superior (3*)","price":1459},{"category":"First Class (4*)","price":1699}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 288,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Sapa", "Halong Bay", "Hoi An", "Ho Chi Minh City", "Mekong Delta"],
    activities: ["motorbike", "trekking", "cruise", "cycling", "boat-tour"],
  },
  {
    id: "family-easy-adventure-10d",
    slug: "north-central-vietnam-easy-adventure-family-10-days",
    name: "North & Central Vietnam Easy Adventure for Family",
    category: "multi-day",
    location: "Vietnam",
    duration: "10 days, 9 nights",
    price: 1059,
    description: "Family-friendly soft adventure with Jeep tours, Halong Bay, and Hoi An activities.",
    fullDescription: `
      <h3>Family Adventure</h3>
      <p>Active but accessible adventure perfect for families with children of all ages.</p>
    `,
    highlights: ["Jeep Tours", "Mai Chau Valley", "Halong Bay", "Hoi An Boat Rides", "Cooking Class"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Family arrival", activities: ["Airport pickup", "Kid-friendly hotel", "Evening walk"], meals: ["Dinner"] },
      { day: 2, title: "Hanoi by Jeep", description: "City adventure", activities: ["Vintage Jeep tour", "Family sites", "Ice cream stops", "Water puppets"], meals: ["Breakfast", "Lunch"] },
      { day: 3, title: "Mai Chau", description: "Valley adventure", activities: ["Scenic drive", "Stilt house stay", "Easy village walk", "Traditional games"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Mai Chau Activities", description: "Family fun", activities: ["Cycling", "Rice planting", "Craft making", "Buffalo ride"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 5, title: "Halong Bay", description: "Cruise begins", activities: ["Transfer to Halong", "Family cruise", "Kayaking", "Swimming"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 6, title: "Halong Bay", description: "Bay exploration", activities: ["Cave visit", "Beach time", "Squid fishing", "Return Hanoi"], meals: ["Breakfast", "Brunch"] },
      { day: 7, title: "Fly to Hoi An", description: "Central arrival", activities: ["Flight to Da Nang", "Beach resort", "Pool time"], meals: ["Breakfast", "Dinner"] },
      { day: 8, title: "Hoi An Adventure", description: "Family activities", activities: ["Basket boat ride", "Fishing lesson", "Lantern making", "Ancient town"], meals: ["Breakfast", "Lunch"] },
      { day: 9, title: "Hoi An Cooking", description: "Food fun", activities: ["Market visit", "Cooking class", "Beach afternoon", "Farewell dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 10, title: "Departure", description: "Family farewell", activities: ["Beach morning", "Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["9 nights family hotels", "Halong cruise", "Jeep tour", "Domestic flight", "Activities listed", "Meals listed"],
    excluded: ["International flights", "Tips"],
    imageUrl: "/tours/family-easy-adventure-10d.jpg",
    rating: 9.5,
    reviewCount: 13,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/north-center-vietnam-easy-adventure-for-family-with-kids-10-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/670ccee11bb2e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64c77f7be30be.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/664c577e9e7b0.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/664c577e9e7b3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64c77f7be30c1.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d3c45e3387.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d3c70e249d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d3c811f79f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64c77e95a537c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/664c577e9e7b5.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d3c9396b1b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/664c578fd4216.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64c77e95a5380.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d3ca456564.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64c77e95a537e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/664c578fd4219.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/664c578fd421a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64c87c9fbb684.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d3cba25b87.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64c77e95a5381.jpg"],
    pricingTiers: [{"category":"Superior (3* Hotels)","price":1059},{"category":"First Class (4* Hotels)","price":1219},{"category":"Deluxe (5* hotels)","price":1619}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 240,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Mai Chau", "Halong Bay", "Hoi An"],
    activities: ["adventure", "cruise", "cycling", "cooking-class", "boat-tour"],
  },
  {
    id: "vietnam-easy-rider-16d",
    slug: "vietnam-easy-rider-private-16-days",
    name: "Vietnam Easy Rider Private",
    category: "multi-day",
    location: "Vietnam",
    duration: "16 days, 15 nights",
    price: 2399,
    description: "Private motorbike journey through all of Vietnam with experienced rider guides.",
    fullDescription: `
      <h3>Easy Rider Adventure</h3>
      <p>Travel Vietnam on the back of a motorbike with skilled local riders as your guides.</p>
    `,
    highlights: ["Private Motorbike", "Expert Riders", "Scenic Routes", "Village Stays", "Complete Vietnam"],
    itinerary: [
      { day: 1, title: "Saigon", description: "Start", activities: ["Airport pickup", "Meet your rider", "City tour", "Briefing"], meals: ["Dinner"] },
      { day: 2, title: "Mekong Delta", description: "Delta ride", activities: ["Ride to Mekong", "Village visits", "Floating market", "Homestay"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Mekong - Mui Ne", description: "Coastal ride", activities: ["Scenic coastal route", "Beach arrival", "Dunes sunset"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Mui Ne - Dalat", description: "Highland ride", activities: ["Mountain roads", "Dalat arrival", "City exploration"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 5, title: "Dalat", description: "Highland day", activities: ["Waterfall visit", "Countryside ride", "Coffee plantation"], meals: ["Breakfast", "Lunch"] },
      { day: 6, title: "Dalat - Nha Trang", description: "Coastal descent", activities: ["Mountain descent", "Beach arrival", "Seafood dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 7, title: "Nha Trang", description: "Beach day", activities: ["Island trip", "Snorkeling", "Beach relaxation"], meals: ["Breakfast", "Lunch"] },
      { day: 8, title: "Nha Trang - Hoi An", description: "Long ride", activities: ["Scenic coastal ride", "Fishing villages", "Hoi An arrival"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 9, title: "Hoi An", description: "Ancient town", activities: ["Walking tour", "Cooking class", "Lantern evening"], meals: ["Breakfast", "Lunch"] },
      { day: 10, title: "Hoi An - Hue", description: "Hai Van Pass", activities: ["Hai Van Pass ride", "Beach stops", "Hue arrival"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 11, title: "Hue", description: "Imperial city", activities: ["Citadel by bike", "Royal tombs", "Perfume River"], meals: ["Breakfast", "Lunch"] },
      { day: 12, title: "Hue - Phong Nha", description: "Cave region", activities: ["Scenic ride", "Countryside", "Phong Nha arrival"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 13, title: "Phong Nha", description: "Cave day", activities: ["Paradise Cave", "Phong Nha Cave", "Local village"], meals: ["Breakfast", "Lunch"] },
      { day: 14, title: "Fly to Hanoi", description: "North arrival", activities: ["Flight to Hanoi", "City tour", "Old Quarter"], meals: ["Breakfast", "Dinner"] },
      { day: 15, title: "Halong Bay", description: "Cruise", activities: ["Transfer to Halong", "Day cruise", "Return Hanoi", "Farewell dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 16, title: "Departure", description: "Farewell", activities: ["Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["15 nights hotels/homestay", "Private motorbike & rider", "All fuel", "Domestic flight", "Day cruise", "Meals listed"],
    excluded: ["International flights", "Tips"],
    imageUrl: "/tours/vietnam-easy-rider-16d.jpg",
    rating: 9.6,
    reviewCount: 4,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/vietnam-easy-rider-16-days.html",
    durationHours: 384,
    startCity: "Ho Chi Minh City",
    destinations: ["Ho Chi Minh City", "Mekong Delta", "Dalat", "Nha Trang", "Hoi An", "Hue", "Phong Nha", "Hanoi", "Halong Bay"],
    activities: ["motorbike", "adventure", "cruise", "snorkeling", "cooking-class"],
  },
  {
    id: "ha-giang-motorbike-loop-5d",
    slug: "ha-giang-motorbike-loop-5-days",
    name: "Ha Giang Motorbike Loop Adventure",
    category: "multi-day",
    location: "Ha Giang",
    duration: "5 days, 4 nights",
    price: 198,
    description: "Epic motorbike adventure through Vietnam's most dramatic mountain landscapes.",
    fullDescription: `
      <h3>Ha Giang Loop</h3>
      <p>Ride the legendary Ha Giang loop through some of Asia's most spectacular scenery.</p>
    `,
    highlights: ["Ma Pi Leng Pass", "Dong Van Karst Plateau", "Lung Cu Flag Tower", "Ethnic Markets", "Mountain Roads"],
    itinerary: [
      { day: 1, title: "Hanoi - Ha Giang", description: "Journey north", activities: ["Early pickup", "Scenic drive", "Ha Giang arrival", "Bike preparation", "Evening briefing"], meals: ["Lunch", "Dinner"] },
      { day: 2, title: "Ha Giang - Yen Minh", description: "Loop begins", activities: ["Start loop", "Quan Ba Heaven Gate", "Twin Mountains", "Yen Minh town"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Yen Minh - Dong Van", description: "Deep mountains", activities: ["Mountain roads", "Lung Cu Flag Tower", "Dong Van market", "Old town stay"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Dong Van - Meo Vac", description: "Ma Pi Leng", activities: ["Dong Van Karst", "Ma Pi Leng Pass", "Nho Que River views", "Meo Vac valley"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 5, title: "Meo Vac - Hanoi", description: "Return", activities: ["Morning ride", "Scenic return route", "Arrive Hanoi evening"], meals: ["Breakfast", "Lunch"] }
    ],
    included: ["4 nights hotels/homestays", "All transportation", "Motorbike & fuel", "Meals listed", "Guide"],
    excluded: ["Personal gear", "Tips", "Drinks"],
    imageUrl: "/tours/ha-giang-motorbike-loop-5d.jpg",
    rating: 9.8,
    reviewCount: 89,
    affiliateUrl: "https://www.bestpricetravel.com/ha-giang-tours/ha-giang-loop-on-motorbike-4-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68ecbbb2f1ab2.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/63d8731a10640.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c77e7a8f134.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/63d8731a1063d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/63d8731a10643.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/63d8731a10646.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/63d8731a1063f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68ca7a7fd9777.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c77c5af3b54.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c77d5161ec0.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c77db0baea0.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68ca7a7fd9778.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c77db0baea3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/68ecbeebcf900.png","https://d122axpxm39woi.cloudfront.net/images/tours/origin/68c77e7a8f134.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/63d8731a1063f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/68c77db0baea0.jpg","https://d122axpxm39woi.cloudfront.net/images/review/250_170/68de4d89589be.jpg","https://d122axpxm39woi.cloudfront.net/images/review/250_170/68b7b996bec6a.jpg","https://d122axpxm39woi.cloudfront.net/images/review/250_170/68b7b996bec6c.jpg"],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 120,
    startCity: "Hanoi",
    destinations: ["Ha Giang", "Dong Van", "Meo Vac", "Yen Minh"],
    activities: ["motorbike", "adventure", "photography", "cultural"],
  },

  // HONEYMOON & COUPLES TOURS (5 tours)
  {
    id: "vietnam-romantic-escape-10d",
    slug: "vietnam-romantic-escape-10-days",
    name: "Vietnam Romantic Escape",
    category: "multi-day",
    location: "Vietnam",
    duration: "10 days, 9 nights",
    price: 559,
    description: "Romantic journey through Vietnam's most beautiful destinations for couples.",
    fullDescription: `
      <h3>Romance in Vietnam</h3>
      <p>A carefully crafted romantic journey with luxurious stays and intimate experiences.</p>
    `,
    highlights: ["Luxury Hotels", "Sunset Cruises", "Couples Spa", "Private Dinners", "Beach Resorts"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Romantic arrival", activities: ["VIP airport pickup", "Boutique hotel", "Couples welcome dinner"], meals: ["Dinner"] },
      { day: 2, title: "Hanoi", description: "City romance", activities: ["Private cyclo tour", "Spa afternoon", "Rooftop dinner"], meals: ["Breakfast", "Dinner"] },
      { day: 3, title: "Halong Bay", description: "Romantic cruise", activities: ["Private cabin cruise", "Sunset deck", "Candlelit dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Halong Bay", description: "Morning romance", activities: ["Sunrise on deck", "Private beach", "Return Hanoi", "Fly to Hue"], meals: ["Breakfast", "Brunch", "Dinner"] },
      { day: 5, title: "Hue", description: "Imperial romance", activities: ["Citadel private tour", "Garden house lunch", "Perfume River sunset cruise"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 6, title: "Hoi An", description: "Ancient charm", activities: ["Scenic transfer", "Riverside hotel", "Lantern dinner cruise"], meals: ["Breakfast", "Dinner"] },
      { day: 7, title: "Hoi An", description: "Beach romance", activities: ["Beach resort upgrade", "Couples spa", "Private cooking class", "Beach dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 8, title: "Hoi An Free", description: "Leisure", activities: ["Sleep in", "Beach time", "Tailor shopping", "Romantic evening"], meals: ["Breakfast"] },
      { day: 9, title: "Saigon", description: "City finale", activities: ["Fly to Saigon", "Luxury hotel", "Rooftop sunset cocktails", "Farewell dinner"], meals: ["Breakfast", "Dinner"] },
      { day: 10, title: "Departure", description: "Sweet goodbye", activities: ["Late checkout", "VIP airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["9 nights boutique hotels", "Premium Halong cruise", "Domestic flights", "Couples spa", "Private tours", "Meals listed"],
    excluded: ["International flights", "Tips"],
    imageUrl: "/tours/vietnam-romantic-escape-10d.jpg",
    rating: 9.7,
    reviewCount: 34,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/south-vietnam-phu-quoc-saigon-6-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/678f5a4c70d46.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a195e70d9.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a195e70db.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a195e70dc.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a195e70dd.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a1d96fa6b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a1d96fa6d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a1d96fa6f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a1d96fa70.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a1d96fa71.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a1ff887a7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a1ff887a9.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/641bb4ac18b9c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d344a12647.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d345c2cba5.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/66d916cbe1071.png","https://d122axpxm39woi.cloudfront.net/images/tours/origin/641bb4ac18b9c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/6380465c3c841.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f4e817979d9.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f72988deaf6.jpg"],
    pricingTiers: [{"category":"Superior 3* Hotels","price":559},{"category":"First Class 4* Hotels","price":699},{"category":"Deluxe 5* Hotels","price":899}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 240,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Halong Bay", "Hue", "Hoi An", "Ho Chi Minh City"],
    activities: ["cruise", "spa", "romance", "cultural", "dining"],
  },
  {
    id: "honeymoon-vietnam-beach-12d",
    slug: "honeymoon-vietnam-beach-paradise-12-days",
    name: "Honeymoon Vietnam Beach Paradise",
    category: "multi-day",
    location: "Vietnam",
    duration: "12 days, 11 nights",
    price: 2059,
    description: "Ultimate honeymoon combining Vietnam highlights with beach resort relaxation.",
    fullDescription: `
      <h3>Honeymoon Paradise</h3>
      <p>The perfect honeymoon balancing cultural exploration with beach romance.</p>
    `,
    highlights: ["5-Star Resorts", "Private Excursions", "Beach Villas", "Sunset Dinners", "Spa Retreats"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Honeymoon begins", activities: ["VIP pickup", "5-star hotel", "Champagne welcome"], meals: ["Dinner"] },
      { day: 2, title: "Hanoi", description: "City exploration", activities: ["Private tour", "Fine dining lunch", "Spa treatment"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Halong Bay", description: "Luxury cruise", activities: ["5-star cruise", "Private balcony cabin", "Champagne sunset"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Halong - Hoi An", description: "Journey south", activities: ["Morning on bay", "Fly to Da Nang", "Beach resort check-in"], meals: ["Breakfast", "Brunch", "Dinner"] },
      { day: 5, title: "Hoi An", description: "Ancient romance", activities: ["Private walking tour", "Cooking class", "River dinner cruise"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 6, title: "Hoi An Beach", description: "Resort day", activities: ["Beach villa", "Couples massage", "Private beach dinner"], meals: ["Breakfast", "Dinner"] },
      { day: 7, title: "Hoi An Free", description: "Leisure", activities: ["Pool day", "Spa treatments", "Lantern making"], meals: ["Breakfast"] },
      { day: 8, title: "Phu Quoc", description: "Island paradise", activities: ["Fly to Phu Quoc", "Beach villa resort", "Sunset champagne"], meals: ["Breakfast", "Dinner"] },
      { day: 9, title: "Phu Quoc", description: "Island romance", activities: ["Private boat trip", "Snorkeling", "Beach picnic"], meals: ["Breakfast", "Lunch"] },
      { day: 10, title: "Phu Quoc", description: "Spa day", activities: ["Full spa day", "Beach time", "Sunset cruise"], meals: ["Breakfast", "Dinner"] },
      { day: 11, title: "Phu Quoc", description: "Final paradise", activities: ["Free morning", "Fishing village", "Farewell dinner on beach"], meals: ["Breakfast", "Dinner"] },
      { day: 12, title: "Departure", description: "Sweet farewell", activities: ["Late checkout", "Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["11 nights 5-star hotels/resorts", "Luxury cruise", "All flights", "Private tours", "Spa treatments", "Meals listed"],
    excluded: ["International flights", "Tips"],
    imageUrl: "/tours/honeymoon-vietnam-beach-12d.jpg",
    rating: 9.8,
    reviewCount: 23,
    affiliateUrl: "https://www.bestpricetravel.com/indochina-tours/cultural-beach-paradise-vietnam-cambodia-bali-16-days.html",
    durationHours: 288,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Halong Bay", "Hoi An", "Phu Quoc"],
    activities: ["cruise", "beach", "spa", "romance", "snorkeling"],
  },
  {
    id: "couples-hoi-an-beach-5d",
    slug: "couples-hoi-an-beach-retreat-5-days",
    name: "Couples Hoi An Beach Retreat",
    category: "multi-day",
    location: "Hoi An",
    duration: "5 days, 4 nights",
    price: 569,
    description: "Romantic beach escape in charming Hoi An with spa and private experiences.",
    fullDescription: `
      <h3>Hoi An Romance</h3>
      <p>A short romantic escape combining Hoi An's charm with beach resort luxury.</p>
    `,
    highlights: ["Beach Resort", "Couples Spa", "Lantern Night", "Private Dinner", "Cooking Class"],
    itinerary: [
      { day: 1, title: "Arrival", description: "Beach welcome", activities: ["Da Nang pickup", "Beach resort", "Welcome cocktails", "Romantic dinner"], meals: ["Dinner"] },
      { day: 2, title: "Hoi An", description: "Ancient town", activities: ["Private walking tour", "Tailor shopping", "Couples cooking class", "Lantern dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Spa Day", description: "Relaxation", activities: ["Sleep in", "Full day couples spa", "Beach sunset", "Private beach dinner"], meals: ["Breakfast", "Dinner"] },
      { day: 4, title: "Beach & Adventure", description: "Active day", activities: ["Sunrise yoga", "Basket boat ride", "Beach afternoon", "Farewell dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 5, title: "Departure", description: "Sweet goodbye", activities: ["Late checkout", "Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["4 nights beach resort", "Couples spa package", "Private tours", "Cooking class", "Meals listed"],
    excluded: ["Flights", "Tips"],
    imageUrl: "/tours/couples-hoi-an-beach-5d.jpg",
    rating: 9.6,
    reviewCount: 45,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/hoi-an-surrounding-and-beach-break-7days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67639a95428b5.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c2c52e7dc.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c1e26fc96.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c2c52e7de.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c1e26fc95.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c1e26fc94.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c2c52e7df.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c1e26fc92.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c296c5012.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c296c5010.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c296c5014.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c296c5013.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/66d6e343d5370.png","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65dfee68bcd9e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65dfee68bcd9f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65dfee68bcda0.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65dfee68bcd97.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65dfee68bcda1.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65dfee68bcd99.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65dfee68bcd9a.jpg"],
    pricingTiers: [{"category":"Superior 3* Hotels","price":569},{"category":"First Class 4* Hotels","price":629},{"category":"Deluxe 5* Hotels","price":879}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 120,
    startCity: "Da Nang",
    destinations: ["Hoi An", "Da Nang"],
    activities: ["beach", "spa", "romance", "cooking-class", "cultural"],
  },
  {
    id: "saigon-phu-quoc-honeymoon-7d",
    slug: "saigon-phu-quoc-honeymoon-7-days",
    name: "Saigon & Phu Quoc Honeymoon",
    category: "multi-day",
    location: "Southern Vietnam",
    duration: "7 days, 6 nights",
    price: 559,
    description: "Southern honeymoon combining vibrant Saigon with tropical Phu Quoc island.",
    fullDescription: `
      <h3>Southern Romance</h3>
      <p>Experience the excitement of Saigon followed by island paradise in Phu Quoc.</p>
    `,
    highlights: ["Saigon Nightlife", "Beach Villa", "Island Hopping", "Sunset Cruise", "Spa Treatments"],
    itinerary: [
      { day: 1, title: "Saigon", description: "City arrival", activities: ["VIP airport pickup", "Boutique hotel", "Rooftop dinner"], meals: ["Dinner"] },
      { day: 2, title: "Saigon", description: "City romance", activities: ["Private city tour", "Coffee culture", "Vespa food tour evening"], meals: ["Breakfast", "Dinner"] },
      { day: 3, title: "Phu Quoc", description: "Island arrival", activities: ["Fly to Phu Quoc", "Beach villa check-in", "Sunset on beach"], meals: ["Breakfast", "Dinner"] },
      { day: 4, title: "Phu Quoc", description: "Island exploring", activities: ["Private boat trip", "Snorkeling", "Beach BBQ lunch", "Spa afternoon"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 5, title: "Phu Quoc", description: "Beach day", activities: ["Sleep in", "Beach lounging", "Sunset cruise with champagne"], meals: ["Breakfast", "Dinner"] },
      { day: 6, title: "Phu Quoc", description: "Final paradise", activities: ["Couples spa", "Night market", "Romantic farewell dinner"], meals: ["Breakfast", "Dinner"] },
      { day: 7, title: "Departure", description: "Island farewell", activities: ["Beach morning", "Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["6 nights boutique hotels/villa", "Domestic flight", "Private tours", "Spa treatments", "Sunset cruise", "Meals listed"],
    excluded: ["International flights", "Tips"],
    imageUrl: "/tours/saigon-phu-quoc-honeymoon-7d.jpg",
    rating: 9.5,
    reviewCount: 28,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/south-vietnam-phu-quoc-saigon-6-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/678f5a4c70d46.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a195e70d9.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a195e70db.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a195e70dc.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a195e70dd.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a1d96fa6b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a1d96fa6d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a1d96fa6f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a1d96fa70.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a1d96fa71.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a1ff887a7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a1ff887a9.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/641bb4ac18b9c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d344a12647.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667d345c2cba5.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/66d916cbe1071.png","https://d122axpxm39woi.cloudfront.net/images/tours/origin/641bb4ac18b9c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/6380465c3c841.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f4e817979d9.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f72988deaf6.jpg"],
    pricingTiers: [{"category":"Superior 3* Hotels","price":559},{"category":"First Class 4* Hotels","price":699},{"category":"Deluxe 5* Hotels","price":899}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 168,
    startCity: "Ho Chi Minh City",
    destinations: ["Ho Chi Minh City", "Phu Quoc"],
    activities: ["beach", "spa", "cruise", "snorkeling", "vespa-tour"],
  },
  {
    id: "halong-bay-romantic-cruise-3d",
    slug: "halong-bay-romantic-cruise-3-days",
    name: "Halong Bay Romantic Cruise",
    category: "multi-day",
    location: "Halong Bay",
    duration: "3 days, 2 nights",
    price: 199,
    description: "Extended romantic cruise through Halong Bay with premium cabin and services.",
    fullDescription: `
      <h3>Bay Romance</h3>
      <p>Experience the magic of Halong Bay on a romantic 3-day cruise adventure.</p>
    `,
    highlights: ["Premium Cabin", "2 Nights on Bay", "Private Balcony", "Sunset Dinners", "Kayaking"],
    itinerary: [
      { day: 1, title: "Cruise Day 1", description: "Board & explore", activities: ["Hanoi pickup", "Cruise boarding", "Welcome lunch", "Kayaking", "Sunset on deck", "Romantic dinner"], meals: ["Lunch", "Dinner"] },
      { day: 2, title: "Cruise Day 2", description: "Full day on bay", activities: ["Sunrise tai chi", "Cave visit", "Private beach time", "Cooking class", "Sunset cocktails", "Special dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Final Morning", description: "Bay farewell", activities: ["Sunrise viewing", "Brunch on deck", "Return to Hanoi"], meals: ["Breakfast", "Brunch"] }
    ],
    included: ["2 nights premium cabin", "All meals on board", "Kayaking", "Cooking class", "Transfers"],
    excluded: ["Hanoi hotels", "Tips", "Drinks"],
    imageUrl: "/tours/halong-bay-romantic-cruise-3d.jpg",
    rating: 9.7,
    reviewCount: 67,
    affiliateUrl: "https://www.bestpricetravel.com/halong-bay-tours/halong-bay-cruise-2-days-1-night-from-hanoi-with-transfer.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/halong-bay-cruise-from-hanoi-with-transfer-2-days-64d303b32ddff.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643a180d0568f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643a173428285.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643a1c6344d6e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643a173428283.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643a19dcdf6eb.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643a19dcdf6e8.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643a18a87aa1f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643a173428286.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/657adca1397b7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643a1ac08b40c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643a19dcdf6ec.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/657adb4ca7eb1.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643a18a87aa1c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643a18a87aa20.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643a18a87aa21.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/643a180d0568f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/643a173428285.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/643a173428283.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/643a19dcdf6eb.jpg"],
    pricingTiers: [{"category":"Superior (3*)","price":199},{"category":"First Class (4*)","price":249},{"category":"Deluxe (5*)","price":285}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 72,
    startCity: "Hanoi",
    destinations: ["Halong Bay"],
    activities: ["cruise", "kayaking", "romance", "cooking-class"],
  },

  // BUDGET TOURS (4 tours)
  {
    id: "vietnam-budget-backpacker-12d",
    slug: "vietnam-budget-backpacker-12-days",
    name: "Vietnam Budget Backpacker",
    category: "multi-day",
    location: "Vietnam",
    duration: "12 days, 11 nights",
    price: 799,
    description: "Affordable Vietnam adventure covering all major destinations on a budget.",
    fullDescription: `
      <h3>Budget Vietnam</h3>
      <p>See all of Vietnam without breaking the bank on this value-packed adventure.</p>
    `,
    highlights: ["Budget Accommodation", "Local Transport", "Street Food", "Free Time", "All Highlights"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Arrival", activities: ["Airport pickup", "Budget hotel", "Evening walking tour"], meals: [] },
      { day: 2, title: "Hanoi", description: "City tour", activities: ["Free walking tour", "Street food lunch", "Night market"], meals: ["Breakfast"] },
      { day: 3, title: "Halong Bay", description: "Budget cruise", activities: ["Day cruise", "Kayaking", "Cave visit", "Return Hanoi"], meals: ["Breakfast", "Lunch"] },
      { day: 4, title: "Night Bus to Hue", description: "Travel day", activities: ["Day free", "Night bus to Hue"], meals: ["Breakfast"] },
      { day: 5, title: "Hue", description: "Imperial city", activities: ["Citadel visit", "Street food tour", "Evening free"], meals: ["Breakfast"] },
      { day: 6, title: "Hue - Hoi An", description: "Local bus", activities: ["Local bus to Hoi An", "Afternoon ancient town", "Night market"], meals: ["Breakfast"] },
      { day: 7, title: "Hoi An", description: "Free day", activities: ["Beach day", "Cooking class optional", "Lantern evening"], meals: ["Breakfast"] },
      { day: 8, title: "Hoi An - Nha Trang", description: "Travel", activities: ["Bus to Nha Trang", "Beach evening"], meals: ["Breakfast"] },
      { day: 9, title: "Nha Trang", description: "Beach day", activities: ["Island boat trip", "Snorkeling", "Beach time"], meals: ["Breakfast", "Lunch"] },
      { day: 10, title: "Nha Trang - Saigon", description: "Travel", activities: ["Bus to Saigon", "Evening city walk"], meals: ["Breakfast"] },
      { day: 11, title: "Saigon", description: "City day", activities: ["Cu Chi Tunnels", "City walking tour", "Farewell dinner"], meals: ["Breakfast", "Lunch"] },
      { day: 12, title: "Departure", description: "Farewell", activities: ["Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["11 nights budget hotels", "Day cruise", "Local transport", "Breakfast daily", "Some tours"],
    excluded: ["Most meals", "Tips", "Optional activities"],
    imageUrl: "/tours/vietnam-budget-backpacker-12d.jpg",
    rating: 9.0,
    reviewCount: 234,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/vietnam-marvelous-budget-adventure-10-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/676398e156c23.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68cbda4bcbdce.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/664c709c64e27.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667e1b7d4f411.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64c7865c8cf02.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68cbda4bcbdd0.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667e1b9ac1ae5.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64c7865c8cf05.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/664c709c64e28.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667e1bac61021.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68cbda4bcbdd1.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667e1c0051fed.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/664c708fbc9bd.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68cbda4bcbdd2.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68cbda4bcbdca.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68cbda4bcbdcd.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64c78745130a6.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64c78729f3ed0.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667e1c0f44806.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/664c708fbc9c1.jpg"],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 288,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Halong Bay", "Hue", "Hoi An", "Nha Trang", "Ho Chi Minh City", "Cu Chi"],
    activities: ["cruise", "snorkeling", "cultural", "historical", "beach"],
  },
  {
    id: "north-vietnam-budget-6d",
    slug: "north-vietnam-budget-adventure-6-days",
    name: "North Vietnam Budget Adventure",
    category: "multi-day",
    location: "Northern Vietnam",
    duration: "6 days, 5 nights",
    price: 799,
    description: "Affordable northern Vietnam adventure including Sapa trekking and Halong Bay.",
    fullDescription: `
      <h3>Budget North</h3>
      <p>Experience northern Vietnam's highlights without the premium price tag.</p>
    `,
    highlights: ["Sapa Trekking", "Halong Day Trip", "Hanoi Exploration", "Homestay", "Local Transport"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Arrival", activities: ["Airport pickup", "Budget hotel", "Evening street food"], meals: [] },
      { day: 2, title: "Sapa", description: "Mountain journey", activities: ["Bus to Sapa", "Afternoon trek", "Homestay"], meals: ["Breakfast", "Dinner"] },
      { day: 3, title: "Sapa Trekking", description: "Full trek", activities: ["Village trek", "Rice terraces", "Return Sapa"], meals: ["Breakfast", "Lunch"] },
      { day: 4, title: "Sapa - Hanoi", description: "Return", activities: ["Bus to Hanoi", "Evening free"], meals: ["Breakfast"] },
      { day: 5, title: "Halong Bay", description: "Day cruise", activities: ["Day cruise", "Kayaking", "Cave visit", "Return Hanoi"], meals: ["Breakfast", "Lunch"] },
      { day: 6, title: "Departure", description: "Farewell", activities: ["City walk", "Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["5 nights budget accommodation", "Day cruise", "Bus transport", "Homestay", "Some meals"],
    excluded: ["Most meals", "Tips", "Personal expenses"],
    imageUrl: "/tours/north-vietnam-budget-6d.jpg",
    rating: 9.1,
    reviewCount: 156,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/vietnam-marvelous-budget-adventure-10-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/676398e156c23.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68cbda4bcbdce.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/664c709c64e27.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667e1b7d4f411.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64c7865c8cf02.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68cbda4bcbdd0.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667e1b9ac1ae5.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64c7865c8cf05.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/664c709c64e28.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667e1bac61021.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68cbda4bcbdd1.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667e1c0051fed.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/664c708fbc9bd.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68cbda4bcbdd2.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68cbda4bcbdca.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68cbda4bcbdcd.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64c78745130a6.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/64c78729f3ed0.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667e1c0f44806.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/664c708fbc9c1.jpg"],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 144,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Sapa", "Halong Bay"],
    activities: ["trekking", "cruise", "homestay", "cultural"],
  },
  {
    id: "south-vietnam-budget-5d",
    slug: "south-vietnam-budget-explorer-5-days",
    name: "South Vietnam Budget Explorer",
    category: "multi-day",
    location: "Southern Vietnam",
    duration: "5 days, 4 nights",
    price: 1029,
    description: "Budget-friendly southern Vietnam adventure with Mekong Delta and beaches.",
    fullDescription: `
      <h3>Budget South</h3>
      <p>Explore southern Vietnam's highlights on a backpacker-friendly budget.</p>
    `,
    highlights: ["Cu Chi Tunnels", "Mekong Delta", "Mui Ne Beach", "Local Transport", "Street Food"],
    itinerary: [
      { day: 1, title: "Saigon", description: "Arrival", activities: ["Airport pickup", "Budget hotel", "Walking tour"], meals: [] },
      { day: 2, title: "Cu Chi & City", description: "History day", activities: ["Cu Chi morning", "City afternoon", "Street food evening"], meals: ["Breakfast"] },
      { day: 3, title: "Mekong Delta", description: "Delta day", activities: ["Full day Mekong", "Floating market", "Local villages"], meals: ["Breakfast", "Lunch"] },
      { day: 4, title: "Mui Ne", description: "Beach day", activities: ["Bus to Mui Ne", "Beach afternoon", "Red dunes sunset"], meals: ["Breakfast"] },
      { day: 5, title: "Departure", description: "Return", activities: ["White dunes sunrise", "Bus to Saigon", "Airport"], meals: ["Breakfast"] }
    ],
    included: ["4 nights budget hotels", "Tours listed", "Local transport", "Breakfast daily"],
    excluded: ["Most meals", "Tips"],
    imageUrl: "/tours/mekong-delta-day.jpg",
    rating: 9.0,
    reviewCount: 123,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/south-vietnam-budget-5-days.html",
    durationHours: 120,
    startCity: "Ho Chi Minh City",
    destinations: ["Ho Chi Minh City", "Cu Chi", "Mekong Delta"],
    activities: ["historical", "boat-tour", "beach", "cultural"],
  },
  {
    id: "central-vietnam-budget-4d",
    slug: "central-vietnam-budget-escape-4-days",
    name: "Central Vietnam Budget Escape",
    category: "multi-day",
    location: "Central Vietnam",
    duration: "4 days, 3 nights",
    price: 1029,
    description: "Affordable central Vietnam trip covering Hue and Hoi An essentials.",
    fullDescription: `
      <h3>Budget Central</h3>
      <p>Discover central Vietnam's cultural treasures on a budget-friendly tour.</p>
    `,
    highlights: ["Hue Citadel", "Hoi An Ancient Town", "Hai Van Pass", "Local Food", "Budget Stay"],
    itinerary: [
      { day: 1, title: "Hue", description: "Arrival", activities: ["Da Nang pickup", "Transfer to Hue", "Citadel visit", "Street food dinner"], meals: [] },
      { day: 2, title: "Hue - Hoi An", description: "Scenic transfer", activities: ["Royal tombs", "Hai Van Pass", "Marble Mountains", "Hoi An arrival"], meals: ["Breakfast"] },
      { day: 3, title: "Hoi An", description: "Ancient town", activities: ["Walking tour", "Beach time", "Night market", "Lantern evening"], meals: ["Breakfast"] },
      { day: 4, title: "Departure", description: "Farewell", activities: ["Morning free", "Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["3 nights budget hotels", "All transfers", "Entrance fees", "Breakfast"],
    excluded: ["Meals", "Tips", "Optional activities"],
    imageUrl: "/tours/central-vietnam-5d.jpg",
    rating: 9.2,
    reviewCount: 89,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/central-vietnam-budget-4-days.html",
    durationHours: 96,
    startCity: "Da Nang",
    destinations: ["Hue", "Hoi An", "Da Nang"],
    activities: ["cultural", "historical", "beach", "sightseeing"],
  },

  // SMALL GROUP TOURS (5 tours)
  {
    id: "vietnam-small-group-classic-10d",
    slug: "vietnam-small-group-classic-10-days",
    name: "Vietnam Small Group Classic",
    category: "multi-day",
    location: "Vietnam",
    duration: "10 days, 9 nights",
    price: 1559,
    description: "Classic Vietnam tour in small groups of 12 or fewer travelers.",
    fullDescription: `
      <h3>Small Group Experience</h3>
      <p>Experience Vietnam with like-minded travelers in an intimate small group setting.</p>
    `,
    highlights: ["Max 12 Travelers", "Expert Guide", "Local Experiences", "Quality Hotels", "Group Bonding"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Group meets", activities: ["Airport transfers", "Welcome meeting", "Group dinner"], meals: ["Dinner"] },
      { day: 2, title: "Hanoi", description: "City exploration", activities: ["Group city tour", "Street food walk", "Water puppets"], meals: ["Breakfast", "Lunch"] },
      { day: 3, title: "Halong Bay", description: "Cruise", activities: ["Group cruise", "Kayaking together", "Evening activities"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Halong - Hue", description: "Journey south", activities: ["Morning on bay", "Group flight to Hue", "Evening walk"], meals: ["Breakfast", "Brunch", "Dinner"] },
      { day: 5, title: "Hue", description: "Imperial day", activities: ["Citadel tour", "Tombs visit", "Group dinner"], meals: ["Breakfast", "Lunch"] },
      { day: 6, title: "Hoi An", description: "Ancient town", activities: ["Scenic transfer", "Walking tour", "Group cooking class"], meals: ["Breakfast", "Lunch"] },
      { day: 7, title: "Hoi An", description: "Free day", activities: ["Optional My Son", "Beach time", "Group evening"], meals: ["Breakfast"] },
      { day: 8, title: "Saigon", description: "South arrival", activities: ["Group flight", "City tour", "Rooftop drinks"], meals: ["Breakfast", "Dinner"] },
      { day: 9, title: "Mekong Delta", description: "Delta day", activities: ["Group boat tour", "Village visits", "Farewell dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 10, title: "Departure", description: "Farewell", activities: ["Group breakfast", "Airport transfers"], meals: ["Breakfast"] }
    ],
    included: ["9 nights hotels", "Halong cruise", "Domestic flights", "Expert guide throughout", "Meals listed"],
    excluded: ["International flights", "Tips"],
    imageUrl: "/tours/vietnam-small-group-classic-10d.jpg",
    rating: 9.5,
    reviewCount: 78,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/vietnam-grand-discovery-18-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/674d6ec6a2e6d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661758e2ccbd8.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661758e2ccbdb.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666c1d408318.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666c1e4b77c5.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666c1f7da777.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661758e2ccce3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666c20db2dd7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661758e2ccce6.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666c2205d73b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661758e2ccce7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666c22e6336a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666c29ab1c7a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6617587c1fcd6.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6617587c1fcd8.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666c2aa78618.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/661758e2ccce8.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6617587c1fcd9.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6617587c1fcda.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6617587c1fcdb.jpg"],
    pricingTiers: [{"category":"Economy (2*)","price":1559},{"category":"Superior (3*)","price":1699},{"category":"First Class (4*)","price":2049}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 240,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Halong Bay", "Hue", "Hoi An", "Ho Chi Minh City", "Mekong Delta"],
    activities: ["cruise", "cultural", "cooking-class", "boat-tour"],
  },
  {
    id: "small-group-north-vietnam-7d",
    slug: "small-group-north-vietnam-explorer-7-days",
    name: "Small Group North Vietnam Explorer",
    category: "multi-day",
    location: "Northern Vietnam",
    duration: "7 days, 6 nights",
    price: 1379,
    description: "Intimate northern Vietnam journey with small group of travelers.",
    fullDescription: `
      <h3>Northern Small Group</h3>
      <p>Explore northern Vietnam's highlights with a small group of fellow adventurers.</p>
    `,
    highlights: ["Max 10 Travelers", "Sapa Trekking", "Halong Overnight", "Group Activities", "Local Guide"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Group arrival", activities: ["Group welcome", "Old Quarter walk", "Welcome dinner"], meals: ["Dinner"] },
      { day: 2, title: "Hanoi", description: "City tour", activities: ["Group sightseeing", "Lunch together", "Free afternoon"], meals: ["Breakfast", "Lunch"] },
      { day: 3, title: "Sapa", description: "Mountain journey", activities: ["Group train", "Arrive Sapa", "Town walk"], meals: ["Breakfast", "Dinner"] },
      { day: 4, title: "Sapa Trekking", description: "Group trek", activities: ["Trek together", "Village visits", "Group homestay"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 5, title: "Sapa - Hanoi", description: "Return", activities: ["Morning views", "Group train back"], meals: ["Breakfast", "Lunch"] },
      { day: 6, title: "Halong Bay", description: "Group cruise", activities: ["Overnight cruise", "Group kayaking", "Evening party"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 7, title: "Departure", description: "Group farewell", activities: ["Morning on bay", "Return Hanoi", "Airport transfers"], meals: ["Breakfast", "Brunch"] }
    ],
    included: ["6 nights hotels/cruise/homestay", "Train tickets", "Overnight cruise", "Group guide", "Meals listed"],
    excluded: ["Flights", "Tips"],
    imageUrl: "/tours/small-group-north-vietnam-7d.jpg",
    rating: 9.4,
    reviewCount: 56,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/sapa-northwest-vietnam-beauty-11-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667bccd11865d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/666671d51e6cb.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e14f3751b98.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e14e584c1d5.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e14e584c1d6.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/666671ea90731.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e14e584c1d7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e14e584c1d8.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/666671fe42948.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e14e584c1d9.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666720d52853.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e14e584c1da.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e14f3751b92.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e14f3751b94.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666723737e8d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e14f3751b99.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666724802a90.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e14f3751b95.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65e14f3751b96.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666729064b0c.jpg"],
    pricingTiers: [{"category":"Superior (3*)","price":1379}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 168,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Sapa", "Halong Bay"],
    activities: ["trekking", "cruise", "homestay", "cultural"],
  },
  {
    id: "small-group-mekong-adventure-3d",
    slug: "small-group-mekong-adventure-3-days",
    name: "Small Group Mekong Adventure",
    category: "multi-day",
    location: "Mekong Delta",
    duration: "3 days, 2 nights",
    price: 1189,
    description: "Intimate Mekong Delta experience with small group and homestay.",
    fullDescription: `
      <h3>Mekong Small Group</h3>
      <p>Experience the real Mekong Delta with a small group of travelers.</p>
    `,
    highlights: ["Max 8 Travelers", "Floating Market", "Group Homestay", "Cycling", "Local Life"],
    itinerary: [
      { day: 1, title: "Saigon - Mekong", description: "Delta arrival", activities: ["Group departure", "Boat rides", "Village visits", "Homestay dinner"], meals: ["Lunch", "Dinner"] },
      { day: 2, title: "Mekong Delta", description: "Full exploration", activities: ["Floating market dawn", "Group cycling", "Cooking together", "Evening activities"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Mekong - Saigon", description: "Return", activities: ["Morning boat ride", "Fruit tasting", "Return to Saigon"], meals: ["Breakfast", "Lunch"] }
    ],
    included: ["2 nights homestay", "All boat trips", "Bicycles", "All meals", "Group guide"],
    excluded: ["Tips", "Drinks"],
    imageUrl: "/tours/small-group-mekong-adventure-3d.jpg",
    rating: 9.6,
    reviewCount: 89,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/vietnam-biking-trekking-snorkeling-12-days.html",
    durationHours: 72,
    startCity: "Ho Chi Minh City",
    destinations: ["Mekong Delta", "Can Tho"],
    activities: ["boat-tour", "cycling", "homestay", "cooking-class", "market-visit"],
  },
  {
    id: "small-group-central-highlands-5d",
    slug: "small-group-central-highlands-5-days",
    name: "Small Group Central Highlands",
    category: "multi-day",
    location: "Central Highlands",
    duration: "5 days, 4 nights",
    price: 1149,
    description: "Off-the-beaten-path journey through Vietnam's central highlands in small group.",
    fullDescription: `
      <h3>Highland Adventure</h3>
      <p>Discover Vietnam's lesser-known central highlands with intimate group experiences.</p>
    `,
    highlights: ["Dalat", "Coffee Plantations", "Ethnic Villages", "Waterfalls", "Small Group"],
    itinerary: [
      { day: 1, title: "Saigon - Dalat", description: "Highland arrival", activities: ["Group flight", "City tour", "Night market"], meals: ["Dinner"] },
      { day: 2, title: "Dalat", description: "City exploration", activities: ["Crazy House", "Flower gardens", "Coffee plantation", "Group dinner"], meals: ["Breakfast", "Lunch"] },
      { day: 3, title: "Dalat Outdoors", description: "Nature day", activities: ["Waterfall trek", "Countryside cycling", "Cooking class"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Ethnic Villages", description: "Cultural day", activities: ["K'Ho village", "Traditional lunch", "Craft demonstrations", "Farewell dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 5, title: "Departure", description: "Farewell", activities: ["Morning free", "Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["4 nights hotels", "Domestic flight", "All activities", "Group guide", "Meals listed"],
    excluded: ["Return flight", "Tips"],
    imageUrl: "/tours/small-group-central-highlands-5d.jpg",
    rating: 9.3,
    reviewCount: 34,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/south-central-highlands-memorial-sites-9-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67bd91aa189c5.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67bd91aa189c2.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67bd91aa189bf.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67bd919b76cbb.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67bd91aa189c3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67bd919b76cba.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67bd919b76cb9.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67bd919b76cb5.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67bd919b76cb8.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67bd91aa189c4.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/6899b54143249.png","https://d122axpxm39woi.cloudfront.net/images/tours/origin/67bd91aa189bf.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/67bd919b76cbb.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/67bd919b76cb9.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/67bd919b76cb5.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f73251c4b3e.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f9ca5d2eb12.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f49b8d2e968.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/66cd3179db719.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/678f44c6ae2b9.jpg"],
    pricingTiers: [{"category":"Superior 3* Hotels","price":1149},{"category":"First Class 4* Hotels","price":1289},{"category":"Deluxe 5* Hotels","price":1469}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 120,
    startCity: "Ho Chi Minh City",
    destinations: ["Dalat"],
    activities: ["cycling", "trekking", "cultural", "cooking-class", "nature"],
  },
  {
    id: "small-group-hoi-an-experience-4d",
    slug: "small-group-hoi-an-experience-4-days",
    name: "Small Group Hoi An Experience",
    category: "multi-day",
    location: "Hoi An",
    duration: "4 days, 3 nights",
    price: 87,
    description: "Intimate Hoi An experience with small group activities and local encounters.",
    fullDescription: `
      <h3>Hoi An Small Group</h3>
      <p>Discover Hoi An's charm with a small group of like-minded travelers.</p>
    `,
    highlights: ["Max 8 Travelers", "Cooking Class", "Countryside", "Ancient Town", "Beach Time"],
    itinerary: [
      { day: 1, title: "Arrival", description: "Group welcome", activities: ["Da Nang pickup", "Hotel check-in", "Walking tour", "Group dinner"], meals: ["Dinner"] },
      { day: 2, title: "Countryside", description: "Rural day", activities: ["Tra Que village", "Farming activities", "Group cooking", "Basket boats"], meals: ["Breakfast", "Lunch"] },
      { day: 3, title: "My Son & Beach", description: "Mixed day", activities: ["My Son sunrise", "Beach afternoon", "Lantern evening", "Group farewell"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Departure", description: "Farewell", activities: ["Free morning", "Airport transfers"], meals: ["Breakfast"] }
    ],
    included: ["3 nights hotel", "All activities", "Group guide", "Meals listed"],
    excluded: ["Flights", "Tips"],
    imageUrl: "/tours/small-group-hoi-an-experience-4d.jpg",
    rating: 9.5,
    reviewCount: 67,
    affiliateUrl: "https://www.bestpricetravel.com/hoi-an-tours/rural-villages-experience-on-vespa.html",
    durationHours: 96,
    startCity: "Da Nang",
    destinations: ["Hoi An", "Da Nang"],
    activities: ["cooking-class", "cultural", "boat-tour", "beach", "historical"],
  },

  // LUXURY TOURS (4 tours)
  {
    id: "vietnam-luxury-signature-12d",
    slug: "vietnam-luxury-signature-journey-12-days",
    name: "Vietnam Luxury Signature Journey",
    category: "multi-day",
    location: "Vietnam",
    duration: "12 days, 11 nights",
    price: 5669,
    description: "The ultimate luxury Vietnam experience with 5-star properties and VIP services.",
    fullDescription: `
      <h3>Signature Luxury</h3>
      <p>Experience Vietnam at its finest with exclusive properties, private guides, and VIP treatment.</p>
    `,
    highlights: ["5-Star Hotels", "Private Guides", "VIP Transfers", "Exclusive Experiences", "Fine Dining"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "VIP arrival", activities: ["VIP airport pickup", "Sofitel Legend", "Welcome champagne", "Fine dining"], meals: ["Dinner"] },
      { day: 2, title: "Hanoi", description: "Private tour", activities: ["Private guide", "Exclusive sites", "Spa afternoon", "Rooftop dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Halong Bay", description: "Premium cruise", activities: ["Helicopter or luxury transfer", "Heritage Line cruise", "Butler service"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Halong Bay", description: "Bay luxury", activities: ["Private excursions", "Spa treatments", "Gourmet dining", "Return Hanoi"], meals: ["Breakfast", "Brunch", "Dinner"] },
      { day: 5, title: "Hue", description: "Imperial luxury", activities: ["Private jet or first class", "Azerai resort", "Private citadel tour"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 6, title: "Hue - Hoi An", description: "Scenic journey", activities: ["Private car Hai Van", "Exclusive stops", "Four Seasons Nam Hai"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 7, title: "Hoi An", description: "Resort luxury", activities: ["Beach villa", "Private spa", "Exclusive experiences"], meals: ["Breakfast", "Dinner"] },
      { day: 8, title: "Hoi An", description: "Cultural luxury", activities: ["Private ancient town", "Master chef cooking", "Private lantern cruise"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 9, title: "Saigon", description: "City arrival", activities: ["Private flight", "Park Hyatt", "Private city tour"], meals: ["Breakfast", "Dinner"] },
      { day: 10, title: "Saigon", description: "Exclusive day", activities: ["Private Cu Chi", "Exclusive lunch", "Rooftop evening"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 11, title: "Mekong", description: "Private cruise", activities: ["Private Mekong yacht", "Exclusive villages", "Gala farewell"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 12, title: "Departure", description: "VIP farewell", activities: ["Late checkout", "VIP transfer"], meals: ["Breakfast"] }
    ],
    included: ["11 nights 5-star luxury", "Premium cruise", "Private guides", "All flights/transfers", "All meals", "Spa treatments"],
    excluded: ["International flights", "Tips"],
    imageUrl: "/tours/vietnam-luxury-signature-12d.jpg",
    rating: 9.9,
    reviewCount: 12,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/luxurious-beauty-of-vietnam-18-days.html",
    durationHours: 288,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Halong Bay", "Hue", "Hoi An", "Ho Chi Minh City", "Mekong Delta"],
    activities: ["luxury", "cruise", "spa", "cultural", "dining"],
  },
  {
    id: "luxury-halong-heritage-cruise-3d",
    slug: "luxury-halong-heritage-line-cruise-3-days",
    name: "Luxury Halong Heritage Line Cruise",
    category: "cruise",
    location: "Halong Bay",
    duration: "3 days, 2 nights",
    price: 1599,
    description: "Premium 3-day cruise on the iconic Heritage Line with butler service.",
    fullDescription: `
      <h3>Heritage Luxury</h3>
      <p>Experience Halong Bay in ultimate luxury aboard the Heritage Line fleet.</p>
    `,
    highlights: ["Heritage Line Ship", "Butler Service", "Premium Cabin", "Exclusive Excursions", "Gourmet Dining"],
    itinerary: [
      { day: 1, title: "Day 1", description: "Luxury boarding", activities: ["VIP transfer", "Champagne welcome", "Premium cabin", "Gourmet lunch", "Kayaking", "Sunset cocktails"], meals: ["Lunch", "Dinner"] },
      { day: 2, title: "Day 2", description: "Full day luxury", activities: ["Sunrise tai chi", "Private beach", "Spa treatments", "Cooking class", "Evening entertainment"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Day 3", description: "Morning farewell", activities: ["Sunrise viewing", "Brunch", "Disembark", "VIP return"], meals: ["Breakfast", "Brunch"] }
    ],
    included: ["2 nights premium cabin", "Butler service", "All meals", "Premium drinks", "Spa treatment", "Transfers"],
    excluded: ["Tips", "Additional spa"],
    imageUrl: "/tours/luxury-halong-heritage-cruise-3d.jpg",
    rating: 9.8,
    reviewCount: 45,
    affiliateUrl: "https://www.bestpricetravel.com/halong-sapa-tours/halong-bay-sapa-luxury-5-days-private-tour.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643391fdd55f8.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643391ceb3d01.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643391ceb3cfe.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643391ceb3d00.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643391fdd55fb.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643391ceb3cfc.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643391ceb3cfd.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/642ba5439954f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/643391fdd55fb.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/643391ceb3cfd.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/64339682841a5.jpg","https://d122axpxm39woi.cloudfront.net/assets/img/dcma.png"],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 72,
    startCity: "Hanoi",
    destinations: ["Halong Bay"],
    activities: ["cruise", "luxury", "spa", "kayaking", "cooking-class"],
  },
  {
    id: "luxury-northern-escape-6d",
    slug: "luxury-northern-vietnam-escape-6-days",
    name: "Luxury Northern Vietnam Escape",
    category: "multi-day",
    location: "Northern Vietnam",
    duration: "6 days, 5 nights",
    price: 1689,
    description: "Premium northern Vietnam experience with luxury lodges and exclusive access.",
    fullDescription: `
      <h3>Luxury North</h3>
      <p>Experience northern Vietnam's beauty with premium accommodations and private experiences.</p>
    `,
    highlights: ["Luxury Lodges", "Private Guides", "Exclusive Access", "Spa Treatments", "Gourmet Dining"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Luxury arrival", activities: ["VIP pickup", "Sofitel Metropole", "Private tour", "Fine dining"], meals: ["Dinner"] },
      { day: 2, title: "Sapa", description: "Mountain luxury", activities: ["Private transfer", "Topas Ecolodge", "Infinity pool", "Sunset dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Sapa", description: "Private trekking", activities: ["Private guide trek", "Village lunch", "Spa afternoon"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Ninh Binh", description: "Scenic transfer", activities: ["Private car", "Ninh Binh Retreat", "Boat ride", "Fine dining"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 5, title: "Halong Bay", description: "Luxury cruise", activities: ["Premium cruise", "Private excursions", "Gala dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 6, title: "Departure", description: "VIP farewell", activities: ["Morning on bay", "VIP transfer"], meals: ["Breakfast", "Brunch"] }
    ],
    included: ["5 nights luxury properties", "Premium cruise", "Private guides", "All transfers", "All meals", "Spa"],
    excluded: ["International flights", "Tips"],
    imageUrl: "/tours/luxury-northern-escape-6d.jpg",
    rating: 9.7,
    reviewCount: 23,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/luxurious-northern-vietnam-exploration-7-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66cd843724ce7.png","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/664d61288d203.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/664d61288d208.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/day-2-see-the-temple-of-literature-from-banknotes-to-real-life-6567ef9233b8c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/day-2-save-one-pillar-pagoda-memory-in-photo-6567f0f0b94b3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667e1e1552283.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/664d61288d206.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/day-2-snap-group-memory-at-ba-dinh-square-6567ee86691a5.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667e1e29d5c8e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/day-2-explore-hanoi-old-quarter-on-cyclo-6567f13a60c04.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/664d61288d205.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/day-3-pose-amidst-the-sprinkling-of-brilliant-incense-6567ee8b92e73.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667e1e3e77be4.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/day-3-check-in-at-poetic-bich-dong-pagoda-6567ee8939a78.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/664d613a1cdbb.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667e1e4c95a3b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/664d613a1cdbe.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667e1e5a3dded.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/day-4-gorgeous-ngoa-long-mountain-from-above-6567f13832f4e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/664d613a1cdbd.jpg"],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 144,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Sapa", "Ninh Binh", "Halong Bay"],
    activities: ["luxury", "trekking", "cruise", "spa", "boat-tour"],
  },
  {
    id: "luxury-central-vietnam-5d",
    slug: "luxury-central-vietnam-retreat-5-days",
    name: "Luxury Central Vietnam Retreat",
    category: "multi-day",
    location: "Central Vietnam",
    duration: "5 days, 4 nights",
    price: 1429,
    description: "Premium central Vietnam experience at Four Seasons and Azerai resorts.",
    fullDescription: `
      <h3>Central Luxury</h3>
      <p>Indulge in central Vietnam's finest resorts with exclusive experiences.</p>
    `,
    highlights: ["Four Seasons Nam Hai", "Azerai La Residence", "Private Tours", "Spa Retreats", "Fine Dining"],
    itinerary: [
      { day: 1, title: "Hue", description: "Arrival", activities: ["VIP pickup", "Azerai La Residence", "Private citadel tour", "Fine dining"], meals: ["Dinner"] },
      { day: 2, title: "Hue", description: "Imperial day", activities: ["Private tomb tours", "Garden house lunch", "Spa afternoon", "River dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Hoi An", description: "Beach arrival", activities: ["Scenic transfer", "Four Seasons Nam Hai", "Beach villa", "Spa treatment"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Hoi An", description: "Exclusive day", activities: ["Private ancient town", "Chef's table lunch", "Full spa day", "Farewell dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 5, title: "Departure", description: "VIP farewell", activities: ["Beach morning", "VIP airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["4 nights luxury resorts", "Private tours", "Full spa day", "All meals", "VIP transfers"],
    excluded: ["Flights", "Tips"],
    imageUrl: "/tours/luxury-central-vietnam-5d.jpg",
    rating: 9.8,
    reviewCount: 19,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/vietnam-luxury-wellness-retreat-escape-8-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67e35ab244d68.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666bc9ff0958.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66174dd9ea5ab.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66174dd9ea5ae.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666bcad7a331.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66174dd9ea5af.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66174dd9ea5b0.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666bcbb7bbc1.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666bcd638ad2.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66174dd9ea5b2.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66174dd9ea5b1.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66174dd9ea5b4.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666bce748ab3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66174dd9ea5b3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66174dd9ea5b5.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/66d9160e63a4f.png","https://d122axpxm39woi.cloudfront.net/images/tours/origin/66174dd9ea5ab.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/66174dd9ea5ae.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/66174dd9ea5af.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/66174dd9ea5b0.jpg"],
    pricingTiers: [{"category":"Luxury 5* Hotels & Resorts","price":1429}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 120,
    startCity: "Da Nang",
    destinations: ["Hue", "Hoi An"],
    activities: ["luxury", "spa", "cultural", "beach", "dining"],
  },

  // PHOTOGRAPHY TOURS (5 tours)
  {
    id: "vietnam-photography-15d",
    slug: "vietnam-photography-expedition-15-days",
    name: "Vietnam Photography Expedition",
    category: "multi-day",
    location: "Vietnam",
    duration: "15 days, 14 nights",
    price: 719,
    description: "Capture Vietnam's most photogenic locations with professional photography guides.",
    fullDescription: `
      <h3>Photographer's Paradise</h3>
      <p>A photography-focused journey through Vietnam's most stunning landscapes and cultural scenes.</p>
    `,
    highlights: ["Professional Guide", "Golden Hour Shoots", "Iconic Locations", "Post-Processing", "Small Group"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Welcome", activities: ["Airport pickup", "Hotel check-in", "Camera gear check", "Welcome dinner"], meals: ["Dinner"] },
      { day: 2, title: "Hanoi", description: "Street photography", activities: ["Old Quarter sunrise", "Street life shots", "Long Bien Bridge", "Night photography"], meals: ["Breakfast", "Lunch"] },
      { day: 3, title: "Ninh Binh", description: "Landscapes", activities: ["Tam Coc sunrise", "Rice field reflections", "Mua Cave panorama", "Sunset shots"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Halong Bay", description: "Cruise photography", activities: ["Transfer to bay", "Karst formations", "Sunset cruise shoot", "Night sky"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 5, title: "Halong Bay", description: "Dawn shots", activities: ["Sunrise from deck", "Fishing village", "Cave lighting", "Return Hanoi"], meals: ["Breakfast", "Brunch"] },
      { day: 6, title: "Sapa", description: "Mountain arrival", activities: ["Train to Sapa", "Market portraits", "Valley viewpoints", "Homestay evening"], meals: ["Breakfast", "Dinner"] },
      { day: 7, title: "Sapa", description: "Rice terraces", activities: ["Golden hour terraces", "Ethnic minority portraits", "Landscape compositions", "Village life"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 8, title: "Sapa", description: "Fansipan", activities: ["Mountain sunrise", "Cable car shots", "Cloud formations", "Transfer back"], meals: ["Breakfast", "Lunch"] },
      { day: 9, title: "Hue", description: "Imperial city", activities: ["Flight to Hue", "Citadel afternoon", "Perfume River sunset", "Night markets"], meals: ["Breakfast", "Dinner"] },
      { day: 10, title: "Hue", description: "Tombs & temples", activities: ["Tomb photography", "Incense making", "Thien Mu Pagoda", "Dragon boat"], meals: ["Breakfast", "Lunch"] },
      { day: 11, title: "Hoi An", description: "Ancient town", activities: ["Scenic transfer", "Afternoon exploration", "Lantern sunset", "Night reflections"], meals: ["Breakfast", "Dinner"] },
      { day: 12, title: "Hoi An", description: "Rural life", activities: ["Farming sunrise", "Basket boat portraits", "Fishing nets", "Night street"], meals: ["Breakfast", "Lunch"] },
      { day: 13, title: "Saigon", description: "Urban contrast", activities: ["Flight to Saigon", "Architecture", "Street photography", "Rooftop sunset"], meals: ["Breakfast", "Dinner"] },
      { day: 14, title: "Mekong", description: "Delta life", activities: ["Floating market dawn", "River portraits", "Fruit orchards", "Workshop review"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 15, title: "Departure", description: "Final edits", activities: ["Portfolio review", "Editing session", "Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["14 nights accommodation", "Pro photography guide", "Transport", "Domestic flights", "Boat trips", "Meals listed"],
    excluded: ["International flights", "Camera gear", "Tips"],
    imageUrl: "/tours/vietnam-photography-15d.jpg",
    rating: 9.6,
    reviewCount: 34,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/central-and-southern-vietnamese-taste-10-days.html",
    durationHours: 360,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Ninh Binh", "Halong Bay", "Sapa", "Hue", "Hoi An", "Ho Chi Minh City", "Mekong Delta"],
    activities: ["photography", "cultural", "cruise", "trekking", "boat-tour"],
  },
  {
    id: "sapa-rice-terrace-photo-4d",
    slug: "sapa-rice-terrace-photography-4-days",
    name: "Sapa Rice Terrace Photography",
    category: "multi-day",
    location: "Sapa",
    duration: "4 days, 3 nights",
    price: 77,
    description: "Capture the stunning Sapa rice terraces during golden hour with a photography guide.",
    fullDescription: `
      <h3>Rice Terrace Masterclass</h3>
      <p>Focus on Vietnam's most iconic landscape with expert guidance on composition and lighting.</p>
    `,
    highlights: ["Golden Hour Access", "Pro Photography Guide", "Multiple Viewpoints", "Ethnic Portraits", "Editing Workshop"],
    itinerary: [
      { day: 1, title: "Sapa Arrival", description: "Evening arrival", activities: ["Transfer to Sapa", "Hotel check-in", "Sunset viewpoint", "Photography briefing"], meals: ["Dinner"] },
      { day: 2, title: "Muong Hoa Valley", description: "Full day shoot", activities: ["Pre-dawn departure", "Sunrise terraces", "Village portraits", "Afternoon compositions", "Sunset session"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Ta Van & Lao Chai", description: "Village photography", activities: ["Morning trek", "Ethnic minority homes", "Landscape shots", "Rice field workers", "Golden hour"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Departure", description: "Final shots", activities: ["Optional sunrise", "Editing review", "Transfer back"], meals: ["Breakfast"] }
    ],
    included: ["3 nights hotel", "Photography guide", "All transport", "Meals listed", "Editing session"],
    excluded: ["Drinks", "Tips", "Camera gear"],
    imageUrl: "/tours/sapa-rice-terrace-photo-4d.jpg",
    rating: 9.4,
    reviewCount: 42,
    affiliateUrl: "https://www.bestpricetravel.com/sapa-tours/sapa-trekking-2-days-homestay.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6516892c63457.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6516892c6345a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/651ccc427b194.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/651e32a612d9f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/651ccc427b195.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6516892c6345b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/651ccc427b199.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6516892c6345c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/651e3e823dc57.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/651e3e823dc57.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/6516892c6345c.jpg","https://d122axpxm39woi.cloudfront.net/images/review/250_170/6544d06f5a2a6.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/651690e737810.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/65168bde41bcc.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/651694f6ae27b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/651697184b7a5.jpg","https://d122axpxm39woi.cloudfront.net/assets/img/dcma.png"],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 96,
    startCity: "Hanoi",
    destinations: ["Sapa"],
    activities: ["photography", "trekking", "cultural", "nature"],
  },
  {
    id: "hoi-an-lantern-photo-2d",
    slug: "hoi-an-lantern-photography-2-days",
    name: "Hoi An Lantern Photography",
    category: "multi-day",
    location: "Hoi An",
    duration: "2 days, 1 night",
    price: 1029,
    description: "Master lantern and night photography in magical Hoi An ancient town.",
    fullDescription: `
      <h3>Lantern Magic</h3>
      <p>Learn to capture Hoi An's famous lanterns and night scenes with long exposure techniques.</p>
    `,
    highlights: ["Night Photography", "Lantern Reflections", "Long Exposure", "Ancient Town Access", "Pro Guidance"],
    itinerary: [
      { day: 1, title: "Hoi An", description: "Evening focus", activities: ["Afternoon arrival", "Golden hour ancient town", "Lantern lighting ceremony", "Night reflections", "Long exposure session"], meals: ["Dinner"] },
      { day: 2, title: "Hoi An", description: "Dawn to dusk", activities: ["Sunrise fishing nets", "Morning markets", "River scenes", "Departure"], meals: ["Breakfast", "Lunch"] }
    ],
    included: ["1 night boutique hotel", "Photography guide", "Transfers", "Meals listed"],
    excluded: ["Drinks", "Tips"],
    imageUrl: "/tours/hoi-an-memories.jpg",
    rating: 9.3,
    reviewCount: 56,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/hoi-an-lantern-photography-2-days.html",
    durationHours: 48,
    startCity: "Da Nang",
    destinations: ["Hoi An"],
    activities: ["photography", "cultural", "night-tour"],
  },
  {
    id: "mekong-delta-photo-3d",
    slug: "mekong-delta-photography-3-days",
    name: "Mekong Delta Photography",
    category: "multi-day",
    location: "Mekong Delta",
    duration: "3 days, 2 nights",
    price: 479,
    description: "Document authentic Mekong life with floating markets and river portrait opportunities.",
    fullDescription: `
      <h3>River Life Stories</h3>
      <p>Capture the essence of Mekong Delta life from bustling floating markets to peaceful canals.</p>
    `,
    highlights: ["Floating Market Dawn", "River Portraits", "Rural Life", "Boat Photography", "Local Access"],
    itinerary: [
      { day: 1, title: "Ben Tre", description: "Delta arrival", activities: ["Transfer from Saigon", "Coconut village", "River life shots", "Homestay evening"], meals: ["Lunch", "Dinner"] },
      { day: 2, title: "Can Tho", description: "Market day", activities: ["4am floating market", "Boat portraits", "Canal networks", "Fruit orchards", "Sunset river"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Departure", description: "Morning shots", activities: ["Optional sunrise", "Village scenes", "Return to Saigon"], meals: ["Breakfast", "Lunch"] }
    ],
    included: ["2 nights homestay/hotel", "Photography guide", "Boat trips", "Transport", "Meals listed"],
    excluded: ["Drinks", "Tips"],
    imageUrl: "/tours/mekong-delta-photo-3d.jpg",
    rating: 9.2,
    reviewCount: 38,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/best-of-south-vietnam-5-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/678f59b34fd96.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c43b47c30.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c43b47c34.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c43b47c33.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c3d22a8d9.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c3d22a8d5.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c3d22a8d8.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c459ec1ad.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c459ec1af.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/best-of-south-vietnam-5-days-64b5f1ef3149a.png","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65ddb07b69941.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65ddb07b69944.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65ddb07b69942.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65ddb07b69946.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65ddb07b69945.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65ddb07b69947.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f9cbd74e1f7.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f4d8c946295.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f4ea7fa9816.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f73a39b937c.jpg"],
    pricingTiers: [{"category":"Superior (3*)","price":559},{"category":"First Class (4*)","price":659},{"category":"Deluxe (5*)","price":759}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 72,
    startCity: "Ho Chi Minh City",
    destinations: ["Mekong Delta"],
    activities: ["photography", "boat-tour", "cultural", "nature"],
  },
  {
    id: "halong-bay-photo-cruise-2d",
    slug: "halong-bay-photography-cruise-2-days",
    name: "Halong Bay Photography Cruise",
    category: "cruise",
    location: "Halong Bay",
    duration: "2 days, 1 night",
    price: 199,
    description: "Photograph Halong Bay's karsts and seascapes with dedicated photography time and guidance.",
    fullDescription: `
      <h3>Bay Landscapes</h3>
      <p>A cruise designed for photographers with optimal timing for golden hour and blue hour shots.</p>
    `,
    highlights: ["Sunrise & Sunset Priority", "Karst Compositions", "Drone Opportunities", "Night Sky", "Pro Tips"],
    itinerary: [
      { day: 1, title: "Day 1", description: "Afternoon cruise", activities: ["Late morning departure", "Lunch on board", "Afternoon karst photography", "Cave exploration", "Sunset from deck", "Night sky session"], meals: ["Lunch", "Dinner"] },
      { day: 2, title: "Day 2", description: "Sunrise focus", activities: ["Pre-dawn wake up", "Sunrise photography", "Morning kayak shots", "Brunch and return"], meals: ["Breakfast", "Brunch"] }
    ],
    included: ["1 night cruise cabin", "Photography guidance", "All meals", "Kayaking", "Transfer"],
    excluded: ["Drinks", "Tips", "Drone permit"],
    imageUrl: "/tours/halong-bay-photo-cruise-2d.jpg",
    rating: 9.4,
    reviewCount: 67,
    affiliateUrl: "https://www.bestpricetravel.com/halong-bay-tours/halong-bay-cruise-2-days-1-night-from-hanoi-with-transfer.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/halong-bay-cruise-from-hanoi-with-transfer-2-days-64d303b32ddff.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643a180d0568f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643a173428285.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643a1c6344d6e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643a173428283.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643a19dcdf6eb.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643a19dcdf6e8.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643a18a87aa1f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643a173428286.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/657adca1397b7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643a1ac08b40c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643a19dcdf6ec.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/657adb4ca7eb1.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643a18a87aa1c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643a18a87aa20.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/643a18a87aa21.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/643a180d0568f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/643a173428285.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/643a173428283.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/643a19dcdf6eb.jpg"],
    pricingTiers: [{"category":"Superior (3*)","price":199},{"category":"First Class (4*)","price":249},{"category":"Deluxe (5*)","price":285}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 48,
    startCity: "Hanoi",
    destinations: ["Halong Bay"],
    activities: ["photography", "cruise", "kayaking", "nature"],
  },

  // CULINARY & COOKING TOURS (5 tours)
  {
    id: "vietnam-culinary-journey-12d",
    slug: "vietnam-culinary-journey-12-days",
    name: "Vietnam Culinary Journey",
    category: "multi-day",
    location: "Vietnam",
    duration: "12 days, 11 nights",
    price: 1249,
    description: "A comprehensive food journey through Vietnam with cooking classes in each region.",
    fullDescription: `
      <h3>Taste of Vietnam</h3>
      <p>Master Vietnamese cuisine from north to south with professional chefs and local food experts.</p>
    `,
    highlights: ["6 Cooking Classes", "Market Tours", "Local Homes", "Street Food", "Regional Specialties"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Arrival", activities: ["Airport pickup", "Hotel check-in", "Street food dinner", "Food orientation"], meals: ["Dinner"] },
      { day: 2, title: "Hanoi", description: "Northern cuisine", activities: ["Market tour", "Cooking class", "Pho making", "Old Quarter food walk"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Hanoi", description: "Street food", activities: ["Bun cha tour", "Egg coffee", "Hidden gems", "Family dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Ninh Binh", description: "Rural cooking", activities: ["Farm visit", "Rural cooking", "Goat dish specialty", "Rice wine tasting"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 5, title: "Hue", description: "Imperial cuisine", activities: ["Flight to Hue", "Royal cooking class", "Garden house dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 6, title: "Hue", description: "Street food", activities: ["Market breakfast", "Bun bo Hue making", "Street food tour", "Night markets"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 7, title: "Hoi An", description: "Central cooking", activities: ["Transfer Hoi An", "Market tour", "Cooking class", "Lantern dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 8, title: "Hoi An", description: "Local specialty", activities: ["Cao lau making", "Banh mi workshop", "Food photography", "White rose dumplings"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 9, title: "Saigon", description: "Southern arrival", activities: ["Flight to Saigon", "Chinatown food tour", "Cooking introduction"], meals: ["Breakfast", "Dinner"] },
      { day: 10, title: "Saigon", description: "Saigon cooking", activities: ["Ben Thanh market", "Southern cooking class", "Street food evening"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 11, title: "Mekong", description: "Delta flavors", activities: ["Floating market", "Tropical fruit", "Fish cooking", "Farewell dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 12, title: "Departure", description: "Final tastes", activities: ["Last breakfast", "Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["11 nights hotels", "6 cooking classes", "All market tours", "Domestic flights", "Meals listed"],
    excluded: ["International flights", "Drinks", "Tips"],
    imageUrl: "/tours/vietnam-culinary-journey-12d.jpg",
    rating: 9.7,
    reviewCount: 89,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/vietnam-culinary-journey-on-wheels-11-days.html",
    durationHours: 288,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Ninh Binh", "Hue", "Hoi An", "Ho Chi Minh City", "Mekong Delta"],
    activities: ["cooking-class", "food-tour", "cultural", "market-tour"],
  },
  {
    id: "hanoi-food-masterclass-3d",
    slug: "hanoi-food-masterclass-3-days",
    name: "Hanoi Food Masterclass",
    category: "multi-day",
    location: "Hanoi",
    duration: "3 days, 2 nights",
    price: 35,
    description: "Intensive Hanoi culinary experience with multiple cooking classes and food tours.",
    fullDescription: `
      <h3>Hanoi Flavors</h3>
      <p>Deep dive into Hanoi's rich food culture with hands-on cooking and expert-led food walks.</p>
    `,
    highlights: ["2 Cooking Classes", "Pho Making", "Street Food Tours", "Market Visits", "Local Homes"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Street food intro", activities: ["Arrival", "Old Quarter check-in", "Evening food walk", "Hidden alley spots"], meals: ["Dinner"] },
      { day: 2, title: "Hanoi", description: "Cooking day", activities: ["Market shopping", "Full cooking class", "Your creations lunch", "Afternoon pho lesson", "Bun cha dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Hanoi", description: "Final tastes", activities: ["Breakfast tour", "Egg coffee ceremony", "Food shopping guide", "Departure"], meals: ["Breakfast", "Lunch"] }
    ],
    included: ["2 nights Old Quarter hotel", "2 cooking classes", "Food tours", "Meals listed"],
    excluded: ["Drinks", "Tips"],
    imageUrl: "/tours/hanoi-food-masterclass-3d.jpg",
    rating: 9.5,
    reviewCount: 112,
    affiliateUrl: "https://www.bestpricetravel.com/hanoi-tours/hanoi-street-food-tour.html",
    durationHours: 72,
    startCity: "Hanoi",
    destinations: ["Hanoi"],
    activities: ["cooking-class", "food-tour", "cultural", "market-tour"],
  },
  {
    id: "hoi-an-cooking-farmstay-2d",
    slug: "hoi-an-cooking-farmstay-2-days",
    name: "Hoi An Cooking & Farmstay",
    category: "multi-day",
    location: "Hoi An",
    duration: "2 days, 1 night",
    price: 38,
    description: "Farm-to-table cooking experience with organic farm visit and village homestay.",
    fullDescription: `
      <h3>Farm Fresh Cooking</h3>
      <p>Experience authentic Hoi An cuisine from growing vegetables to cooking traditional dishes.</p>
    `,
    highlights: ["Organic Farm Visit", "Farm-to-Table", "Village Homestay", "Traditional Recipes", "Local Family"],
    itinerary: [
      { day: 1, title: "Hoi An", description: "Farm experience", activities: ["Tra Que herb village", "Farm work experience", "Harvest ingredients", "Cooking class", "Homestay dinner"], meals: ["Lunch", "Dinner"] },
      { day: 2, title: "Hoi An", description: "Market cooking", activities: ["Market tour", "Second cooking class", "Lunch creation", "Return to Hoi An"], meals: ["Breakfast", "Lunch"] }
    ],
    included: ["1 night homestay", "2 cooking classes", "Farm visit", "Meals listed", "Transport"],
    excluded: ["Drinks", "Tips"],
    imageUrl: "/tours/hoi-an-cooking-farmstay-2d.jpg",
    rating: 9.4,
    reviewCount: 78,
    affiliateUrl: "https://www.bestpricetravel.com/hoi-an-tours/experience-rural-life-and-cooking-at-organic-farm-in-hoi-an.html",
    durationHours: 48,
    startCity: "Da Nang",
    destinations: ["Hoi An"],
    activities: ["cooking-class", "farm-visit", "homestay", "cultural"],
  },
  {
    id: "saigon-street-food-master-2d",
    slug: "saigon-street-food-master-2-days",
    name: "Saigon Street Food Master",
    category: "multi-day",
    location: "Ho Chi Minh City",
    duration: "2 days, 1 night",
    price: 62,
    description: "Comprehensive Saigon street food experience with cooking class and motorbike tour.",
    fullDescription: `
      <h3>Street Food Secrets</h3>
      <p>Master the art of Saigon street food with local experts and home cooks.</p>
    `,
    highlights: ["Motorbike Food Tour", "Home Cooking", "Hidden Gems", "Night Markets", "Local Guides"],
    itinerary: [
      { day: 1, title: "Saigon", description: "Street food tour", activities: ["Afternoon arrival", "Evening motorbike food tour", "District 4 specialties", "Night market"], meals: ["Dinner"] },
      { day: 2, title: "Saigon", description: "Cooking day", activities: ["Market shopping", "Home cooking class", "Lunch together", "Chinatown food walk", "Departure"], meals: ["Breakfast", "Lunch", "Dinner"] }
    ],
    included: ["1 night hotel", "Motorbike tour", "Cooking class", "All food included", "Local guides"],
    excluded: ["Drinks", "Tips"],
    imageUrl: "/tours/saigon-street-food-master-2d.jpg",
    rating: 9.3,
    reviewCount: 145,
    affiliateUrl: "https://www.bestpricetravel.com/ho-chi-minh-city-tours/saigon-by-night-jeep-adventure-street-food-delights.html",
    durationHours: 48,
    startCity: "Ho Chi Minh City",
    destinations: ["Ho Chi Minh City"],
    activities: ["food-tour", "cooking-class", "motorbike", "market-tour"],
  },
  {
    id: "mekong-cooking-homestay-3d",
    slug: "mekong-cooking-homestay-3-days",
    name: "Mekong Cooking Homestay",
    category: "multi-day",
    location: "Mekong Delta",
    duration: "3 days, 2 nights",
    price: 240,
    description: "Immersive Mekong cooking experience with local family homestay and delta ingredients.",
    fullDescription: `
      <h3>Delta Kitchen</h3>
      <p>Cook with local families using fresh Mekong ingredients and traditional recipes.</p>
    `,
    highlights: ["Family Homestay", "Fish Cooking", "Tropical Fruits", "Market Shopping", "Local Recipes"],
    itinerary: [
      { day: 1, title: "Ben Tre", description: "Delta arrival", activities: ["Transfer from Saigon", "Coconut village visit", "Homestay arrival", "First cooking lesson", "Family dinner"], meals: ["Lunch", "Dinner"] },
      { day: 2, title: "Mekong", description: "Full cooking day", activities: ["Market shopping by boat", "Fish preparation class", "Mekong lunch", "Fruit orchard", "Evening cooking"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Departure", description: "Final lesson", activities: ["Breakfast cooking", "Recipe exchange", "Return to Saigon"], meals: ["Breakfast", "Lunch"] }
    ],
    included: ["2 nights homestay", "All cooking classes", "Boat trips", "Transport", "Meals listed"],
    excluded: ["Drinks", "Tips"],
    imageUrl: "/tours/mekong-cooking-homestay-3d.jpg",
    rating: 9.5,
    reviewCount: 67,
    affiliateUrl: "https://www.bestpricetravel.com/mekong-delta-tours/mekong-delta-explore-at-ben-tre-homestay-2-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6454aaa47b043.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6454aaa47b041.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/652755cf545dc.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6454aaa47b03e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6454aaa47b042.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6454aaa47b040.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6527556e03dc6.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6527556e03dc3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/6454aaa47b042.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/6454aaa47b040.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/644b8d7cabfff.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/65323234bd4e4.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/652cff8a4ada4.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/652cfe08e7a0f.jpg","https://d122axpxm39woi.cloudfront.net/assets/img/dcma.png"],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 72,
    startCity: "Ho Chi Minh City",
    destinations: ["Mekong Delta"],
    activities: ["cooking-class", "homestay", "boat-tour", "market-tour"],
  },

  // WAR HISTORY TOURS (5 tours)
  {
    id: "vietnam-war-history-10d",
    slug: "vietnam-war-history-tour-10-days",
    name: "Vietnam War History Tour",
    category: "multi-day",
    location: "Vietnam",
    duration: "10 days, 9 nights",
    price: 999,
    description: "Comprehensive Vietnam War history tour covering major sites from north to south.",
    fullDescription: `
      <h3>Understanding the War</h3>
      <p>A thoughtful journey through Vietnam War history with expert historians and veterans.</p>
    `,
    highlights: ["Expert Historians", "Major Battlefields", "Museums", "Veteran Stories", "DMZ Zone"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Arrival", activities: ["Airport pickup", "Hotel check-in", "War museum orientation", "Welcome dinner"], meals: ["Dinner"] },
      { day: 2, title: "Hanoi", description: "Northern history", activities: ["Hoa Lo Prison", "Military History Museum", "Ho Chi Minh Mausoleum", "B52 Lake"], meals: ["Breakfast", "Lunch"] },
      { day: 3, title: "Dien Bien Phu", description: "French defeat", activities: ["Flight to Dien Bien Phu", "Battlefield tour", "Museum", "Command bunker"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Hanoi", description: "Return", activities: ["Morning flight", "Afternoon free", "Evening briefing"], meals: ["Breakfast"] },
      { day: 5, title: "DMZ", description: "Demilitarized Zone", activities: ["Train to Dong Ha", "Vinh Moc tunnels", "DMZ sites", "Khe Sanh"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 6, title: "Hue", description: "Battle of Hue", activities: ["Citadel battle sites", "1968 Tet Offensive", "War cemetery", "Evening reflection"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 7, title: "Hoi An", description: "R&R history", activities: ["Transfer Hoi An", "China Beach", "Military hospital site", "Free evening"], meals: ["Breakfast", "Lunch"] },
      { day: 8, title: "Saigon", description: "Fall of Saigon", activities: ["Flight to Saigon", "Reunification Palace", "War Remnants Museum", "Rooftop dinner"], meals: ["Breakfast", "Dinner"] },
      { day: 9, title: "Cu Chi", description: "Tunnel warfare", activities: ["Cu Chi Tunnels", "Veteran meeting", "Cao Dai Temple", "Farewell dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 10, title: "Departure", description: "Final reflection", activities: ["Morning discussion", "Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["9 nights hotels", "Expert historian guide", "All sites", "Domestic flights", "Transport", "Meals listed"],
    excluded: ["International flights", "Tips"],
    imageUrl: "/tours/vietnam-war-history-10d.jpg",
    rating: 9.6,
    reviewCount: 78,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/vietnam-war-history-scenic-heritage-tour-8-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67bd8837a75b8.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67bd881e7a742.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67bd8837a75b7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67bd8837a75b3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67bd882ac48d0.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67bd882ac48d1.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67bd882ac48d2.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67bd882ac48d3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67bd882ac48cd.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67bd881e7a73f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67bd881e7a741.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67bd881e7a743.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67bd881e7a744.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/6899b50aaf4ef.png","https://d122axpxm39woi.cloudfront.net/images/tours/origin/67bd8837a75b3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/67bd882ac48d0.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/67bd882ac48cd.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/67bd881e7a743.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67e762a1249bf.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f491d1c3cc7.jpg"],
    pricingTiers: [{"category":"Superior 3*","price":999},{"category":"First Class 4*","price":1069},{"category":"Deluxe 5*","price":1249}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 240,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Dien Bien Phu", "DMZ", "Hue", "Hoi An", "Ho Chi Minh City"],
    activities: ["historical", "museum", "cultural", "educational"],
  },
  {
    id: "dmz-battlefield-2d",
    slug: "dmz-battlefield-tour-2-days",
    name: "DMZ Battlefield Tour",
    category: "multi-day",
    location: "DMZ",
    duration: "2 days, 1 night",
    price: 269,
    description: "In-depth exploration of the DMZ with historian guide and veteran stories.",
    fullDescription: `
      <h3>The Divided Land</h3>
      <p>Explore the former Demilitarized Zone with expert guides who bring history to life.</p>
    `,
    highlights: ["Vinh Moc Tunnels", "Khe Sanh Base", "Doc Mieu", "Ben Hai River", "Historian Guide"],
    itinerary: [
      { day: 1, title: "DMZ", description: "Full day sites", activities: ["Departure from Hue", "Vinh Moc tunnels", "Doc Mieu base", "Hien Luong Bridge", "Ben Hai River", "Khe Sanh"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 2, title: "DMZ", description: "Continued exploration", activities: ["Rock Pile", "Camp Carroll", "Truong Son Cemetery", "Return to Hue or Hoi An"], meals: ["Breakfast", "Lunch"] }
    ],
    included: ["1 night hotel", "Historian guide", "All sites", "Transport", "Meals listed"],
    excluded: ["Drinks", "Tips"],
    imageUrl: "/tours/dmz-battlefield-2d.jpg",
    rating: 9.4,
    reviewCount: 92,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/phong-nha-cave-dmz-4-days.html",
    durationHours: 48,
    startCity: "Hue",
    destinations: ["DMZ"],
    activities: ["historical", "educational", "museum"],
  },
  {
    id: "cu-chi-war-remnants-full-day",
    slug: "cu-chi-war-remnants-full-day",
    name: "Cu Chi & War Remnants Full Day",
    category: "day-trip",
    location: "Ho Chi Minh City",
    duration: "Full day",
    price: 113,
    description: "Comprehensive war history day tour including Cu Chi Tunnels and War Remnants Museum.",
    fullDescription: `
      <h3>War History Day</h3>
      <p>Experience both the underground war at Cu Chi and the comprehensive War Remnants Museum.</p>
    `,
    highlights: ["Cu Chi Tunnels", "War Remnants Museum", "Expert Guide", "Underground Experience", "Historical Context"],
    itinerary: [
      { day: 1, title: "Saigon", description: "Full day", activities: ["Morning pickup", "Cu Chi Tunnels", "Tunnel experience", "Lunch", "War Remnants Museum", "Evening return"], meals: ["Lunch"] }
    ],
    included: ["Transport", "Expert guide", "Entrance fees", "Lunch", "Water"],
    excluded: ["Tips", "Optional activities"],
    imageUrl: "/tours/cu-chi-war-remnants-full-day.jpg",
    rating: 9.3,
    reviewCount: 234,
    affiliateUrl: "https://www.bestpricetravel.com/ho-chi-minh-city-tours/cu-chi-tunnels-biking-tour-full-day.html",
    durationHours: 10,
    startCity: "Ho Chi Minh City",
    destinations: ["Ho Chi Minh City"],
    activities: ["historical", "museum", "educational"],
  },
  {
    id: "hanoi-war-sites-full-day",
    slug: "hanoi-war-sites-full-day",
    name: "Hanoi War Sites Full Day",
    category: "day-trip",
    location: "Hanoi",
    duration: "Full day",
    price: 80,
    description: "Explore Hanoi's major Vietnam War sites including Hoa Lo Prison and Military Museum.",
    fullDescription: `
      <h3>Hanoi War History</h3>
      <p>Discover the northern perspective of the Vietnam War through Hanoi's key historical sites.</p>
    `,
    highlights: ["Hoa Lo Prison", "Military Museum", "B52 Lake", "Ho Chi Minh Sites", "Expert Guide"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Full day", activities: ["Morning pickup", "Hoa Lo Prison", "Military History Museum", "Lunch", "Ho Chi Minh Mausoleum", "B52 Lake", "Evening return"], meals: ["Lunch"] }
    ],
    included: ["Transport", "Expert guide", "Entrance fees", "Lunch"],
    excluded: ["Tips"],
    imageUrl: "/tours/hanoi-war-sites-full-day.jpg",
    rating: 9.2,
    reviewCount: 156,
    affiliateUrl: "https://www.bestpricetravel.com/ninh-binh-tours/ninh-binh-hoa-lu-trang-an-full-day-private-tour.html",
    durationHours: 9,
    startCity: "Hanoi",
    destinations: ["Hanoi"],
    activities: ["historical", "museum", "educational"],
  },
  {
    id: "saigon-war-history-half-day",
    slug: "saigon-war-history-half-day",
    name: "Saigon War History Half Day",
    category: "day-trip",
    location: "Ho Chi Minh City",
    duration: "Half day",
    price: 999,
    description: "Essential Saigon war history tour covering Reunification Palace and War Remnants Museum.",
    fullDescription: `
      <h3>Fall of Saigon</h3>
      <p>Explore the key sites of the war's end including where the final surrender took place.</p>
    `,
    highlights: ["Reunification Palace", "War Remnants Museum", "Tank Photo", "Historical Context", "Expert Guide"],
    itinerary: [
      { day: 1, title: "Saigon", description: "Half day", activities: ["Morning pickup", "Reunification Palace", "War Remnants Museum", "Return to hotel"], meals: [] }
    ],
    included: ["Transport", "Guide", "Entrance fees"],
    excluded: ["Lunch", "Tips"],
    imageUrl: "/tours/saigon-war-history-half-day.jpg",
    rating: 9.1,
    reviewCount: 289,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/vietnam-war-history-scenic-heritage-tour-8-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67bd8837a75b8.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67bd881e7a742.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67bd8837a75b7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67bd8837a75b3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67bd882ac48d0.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67bd882ac48d1.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67bd882ac48d2.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67bd882ac48d3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67bd882ac48cd.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67bd881e7a73f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67bd881e7a741.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67bd881e7a743.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67bd881e7a744.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/6899b50aaf4ef.png","https://d122axpxm39woi.cloudfront.net/images/tours/origin/67bd8837a75b3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/67bd882ac48d0.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/67bd882ac48cd.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/67bd881e7a743.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67e762a1249bf.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f491d1c3cc7.jpg"],
    pricingTiers: [{"category":"Superior 3*","price":999},{"category":"First Class 4*","price":1069},{"category":"Deluxe 5*","price":1249}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 4,
    startCity: "Ho Chi Minh City",
    destinations: ["Ho Chi Minh City"],
    activities: ["historical", "museum", "educational"],
  },

  // FESTIVAL & SEASONAL TOURS (5 tours)
  {
    id: "vietnam-tet-festival-10d",
    slug: "vietnam-tet-festival-experience-10-days",
    name: "Vietnam Tet Festival Experience",
    category: "multi-day",
    location: "Vietnam",
    duration: "10 days, 9 nights",
    price: 1029,
    description: "Experience Vietnamese Lunar New Year celebrations with local families and traditions.",
    fullDescription: `
      <h3>Tet Celebrations</h3>
      <p>Join Vietnamese families for the most important festival of the year with authentic celebrations.</p>
    `,
    highlights: ["Family Tet Dinner", "Flower Markets", "Temple Visits", "Traditional Games", "Local Celebrations"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Pre-Tet arrival", activities: ["Airport pickup", "Hotel check-in", "Flower market visit", "Tet shopping"], meals: ["Dinner"] },
      { day: 2, title: "Hanoi", description: "Tet preparations", activities: ["Banh chung making", "Kumquat shopping", "Temple visits", "Street decorations"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Hanoi", description: "Tet Eve", activities: ["Family visit", "Tet dinner", "Midnight celebrations", "Temple first footing"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Hanoi", description: "Tet Day 1", activities: ["Family visits", "Li xi traditions", "Temple prayers", "Traditional games"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 5, title: "Ninh Binh", description: "Rural Tet", activities: ["Village Tet celebrations", "Pagoda visits", "River boat", "Local festivities"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 6, title: "Hue", description: "Imperial Tet", activities: ["Flight to Hue", "Royal Tet traditions", "Citadel celebrations", "Night market"], meals: ["Breakfast", "Dinner"] },
      { day: 7, title: "Hoi An", description: "Lantern Tet", activities: ["Transfer Hoi An", "Lantern festival", "Ancient town celebrations", "River lights"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 8, title: "Saigon", description: "Southern Tet", activities: ["Flight to Saigon", "Nguyen Hue flower street", "Chinatown celebrations"], meals: ["Breakfast", "Dinner"] },
      { day: 9, title: "Saigon", description: "Final celebrations", activities: ["Temple visits", "Tet activities", "Farewell dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 10, title: "Departure", description: "Tet farewell", activities: ["Morning free", "Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["9 nights hotels", "Domestic flights", "Family experiences", "All activities", "Meals listed"],
    excluded: ["International flights", "Tips"],
    imageUrl: "/tours/vietnam-insight-14d.jpg",
    rating: 9.8,
    reviewCount: 45,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/vietnam-tet-festival-10-days.html",
    durationHours: 240,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Ninh Binh", "Hue", "Hoi An", "Ho Chi Minh City"],
    activities: ["cultural", "festival", "cooking-class", "temple"],
  },
  {
    id: "hoi-an-lantern-festival-3d",
    slug: "hoi-an-lantern-festival-3-days",
    name: "Hoi An Lantern Festival",
    category: "multi-day",
    location: "Hoi An",
    duration: "3 days, 2 nights",
    price: 1029,
    description: "Experience Hoi An's magical full moon lantern festival with boat processions.",
    fullDescription: `
      <h3>Lantern Magic</h3>
      <p>Witness the enchanting monthly lantern festival when the ancient town glows by candlelight.</p>
    `,
    highlights: ["Full Moon Festival", "Lantern Release", "River Procession", "Traditional Music", "Ancient Town"],
    itinerary: [
      { day: 1, title: "Hoi An", description: "Arrival", activities: ["Transfer from Da Nang", "Hotel check-in", "Ancient town exploration", "Pre-festival atmosphere"], meals: ["Dinner"] },
      { day: 2, title: "Hoi An", description: "Festival day", activities: ["Morning countryside", "Afternoon lantern making", "Festival begins", "River boat lanterns", "Night celebrations"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Hoi An", description: "Morning charm", activities: ["Quiet morning town", "Market visit", "Departure"], meals: ["Breakfast"] }
    ],
    included: ["2 nights boutique hotel", "Festival activities", "Lantern making", "Boat ride", "Transfers", "Meals listed"],
    excluded: ["Drinks", "Tips"],
    imageUrl: "/tours/hoi-an-memories.jpg",
    rating: 9.6,
    reviewCount: 134,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/hoi-an-lantern-festival-3-days.html",
    durationHours: 72,
    startCity: "Da Nang",
    destinations: ["Hoi An"],
    activities: ["festival", "cultural", "boat-tour", "craft"],
  },
  {
    id: "sapa-spring-festival-5d",
    slug: "sapa-spring-festival-5-days",
    name: "Sapa Spring Festival Tour",
    category: "multi-day",
    location: "Sapa",
    duration: "5 days, 4 nights",
    price: 1029,
    description: "Experience ethnic minority spring festivals in Sapa with traditional celebrations.",
    fullDescription: `
      <h3>Highland Festivals</h3>
      <p>Join Hmong and Dao communities in their colorful spring celebrations and traditional games.</p>
    `,
    highlights: ["Spring Festivals", "Traditional Games", "Ethnic Costumes", "Music & Dance", "Village Celebrations"],
    itinerary: [
      { day: 1, title: "Hanoi - Sapa", description: "Journey begins", activities: ["Morning train", "Sapa arrival", "Market exploration", "Festival briefing"], meals: ["Lunch", "Dinner"] },
      { day: 2, title: "Sapa", description: "Festival day", activities: ["Village festival", "Traditional games", "Costume parade", "Music performances", "Local feast"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Sapa", description: "Village visits", activities: ["Hmong village", "Spring celebrations", "Traditional crafts", "Dance performances"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Sapa", description: "Terraces", activities: ["Rice terrace trek", "Picnic lunch", "Village homestay", "Evening stories"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 5, title: "Departure", description: "Return", activities: ["Morning market", "Return to Hanoi"], meals: ["Breakfast", "Lunch"] }
    ],
    included: ["4 nights hotel/homestay", "Festival access", "Transport", "Trekking guide", "Meals listed"],
    excluded: ["Train tickets", "Tips"],
    imageUrl: "/tours/sapa-trekking.jpg",
    rating: 9.4,
    reviewCount: 67,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/sapa-spring-festival-5-days.html",
    durationHours: 120,
    startCity: "Hanoi",
    destinations: ["Sapa"],
    activities: ["festival", "trekking", "cultural", "homestay"],
  },
  {
    id: "mid-autumn-festival-3d",
    slug: "mid-autumn-festival-tour-3-days",
    name: "Mid-Autumn Festival Tour",
    category: "multi-day",
    location: "Hanoi",
    duration: "3 days, 2 nights",
    price: 1029,
    description: "Experience Vietnam's Mid-Autumn Festival with mooncakes, lanterns, and children's celebrations.",
    fullDescription: `
      <h3>Moon Festival</h3>
      <p>Join families for the beloved children's festival with traditional mooncakes and lantern parades.</p>
    `,
    highlights: ["Mooncake Making", "Lantern Parade", "Lion Dance", "Old Quarter Celebrations", "Family Festival"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Arrival", activities: ["Airport pickup", "Old Quarter hotel", "Festival market visit", "Lantern shopping"], meals: ["Dinner"] },
      { day: 2, title: "Hanoi", description: "Festival day", activities: ["Mooncake making class", "Afternoon preparations", "Evening lantern parade", "Lion dance", "Street celebrations"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Hanoi", description: "Morning charm", activities: ["Post-festival breakfast", "Temple visit", "Departure"], meals: ["Breakfast"] }
    ],
    included: ["2 nights Old Quarter hotel", "Mooncake class", "Festival activities", "Lantern", "Meals listed"],
    excluded: ["Tips"],
    imageUrl: "/tours/hanoi-3days.jpg",
    rating: 9.5,
    reviewCount: 89,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/mid-autumn-festival-3-days.html",
    durationHours: 72,
    startCity: "Hanoi",
    destinations: ["Hanoi"],
    activities: ["festival", "cultural", "cooking-class", "family"],
  },
  {
    id: "hue-festival-arts-5d",
    slug: "hue-festival-arts-culture-5-days",
    name: "Hue Festival Arts & Culture",
    category: "multi-day",
    location: "Hue",
    duration: "5 days, 4 nights",
    price: 319,
    description: "Experience the biennial Hue Festival with traditional arts, music, and royal ceremonies.",
    fullDescription: `
      <h3>Imperial Arts Festival</h3>
      <p>Immerse yourself in Hue's grand cultural festival celebrating imperial heritage and contemporary arts.</p>
    `,
    highlights: ["Royal Ceremonies", "Traditional Music", "Art Performances", "Citadel Events", "Night Spectacular"],
    itinerary: [
      { day: 1, title: "Hue", description: "Festival arrival", activities: ["Airport/train arrival", "Hotel check-in", "Festival orientation", "Opening ceremony"], meals: ["Dinner"] },
      { day: 2, title: "Hue", description: "Royal arts", activities: ["Citadel performances", "Royal music", "Traditional dance", "Evening show"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Hue", description: "Contemporary arts", activities: ["Art exhibitions", "Street performances", "International acts", "Night parade"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Hue", description: "Heritage day", activities: ["Temple ceremonies", "Traditional crafts", "Ao dai show", "Farewell performance"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 5, title: "Departure", description: "Morning free", activities: ["Last minute exploration", "Departure transfer"], meals: ["Breakfast"] }
    ],
    included: ["4 nights hotel", "Festival passes", "All performances", "Transport", "Meals listed"],
    excluded: ["Flights", "Tips"],
    imageUrl: "/tours/hue-festival-arts-5d.jpg",
    rating: 9.7,
    reviewCount: 56,
    affiliateUrl: "https://www.bestpricetravel.com/hue-tours/authentic-hue-food-culture-countryside-4-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68429ef979dea.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68429ef979deb.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68429f37ed39e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68429ef979dec.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68429ef979ded.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68429ef979de7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68429f37ed39f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68429f37ed399.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68429f37ed39c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68429f37ed39d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/68429ef979dec.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/68429f37ed39f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/68429f37ed399.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67e762a1249bf.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f491d1c3cc7.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f63b030876a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/643e0070c63dc.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/53b0d9e673e67.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/63e9be32826a7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/5e4524b7ca41e.jpg"],
    pricingTiers: [{"category":"Superior 3* Hotels","price":319},{"category":"First Class 4* Hotels","price":329},{"category":"Deluxe 5* Hotels","price":369}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 120,
    startCity: "Da Nang",
    destinations: ["Hue"],
    activities: ["festival", "cultural", "art", "music"],
  },

  // SPECIFIC DESTINATION TOURS - DALAT (5 tours)
  {
    id: "dalat-highlands-5d",
    slug: "dalat-highlands-adventure-5-days",
    name: "Dalat Highlands Adventure",
    category: "multi-day",
    location: "Da Lat",
    duration: "5 days, 4 nights",
    price: 1029,
    description: "Comprehensive Dalat experience with waterfalls, canyoning, and highland culture.",
    fullDescription: `
      <h3>Highland Paradise</h3>
      <p>Discover Dalat's cool climate, stunning waterfalls, and unique French colonial heritage.</p>
    `,
    highlights: ["Canyoning Adventure", "Waterfalls", "Coffee Plantations", "Flower Gardens", "Night Market"],
    itinerary: [
      { day: 1, title: "Da Lat", description: "Arrival", activities: ["Flight from Saigon", "Hotel check-in", "Xuan Huong Lake", "Night market"], meals: ["Dinner"] },
      { day: 2, title: "Da Lat", description: "Waterfalls", activities: ["Elephant Falls", "Pongour Falls", "Coffee plantation", "Crazy House visit"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Da Lat", description: "Canyoning", activities: ["Full day canyoning", "Datanla Falls", "Rappelling", "Natural slides", "BBQ dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Da Lat", description: "Culture", activities: ["Valley of Love", "Flower gardens", "French Quarter", "Wine tasting", "Farewell dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 5, title: "Departure", description: "Morning free", activities: ["Market visit", "Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["4 nights hotel", "Canyoning equipment", "All tours", "Domestic flight", "Meals listed"],
    excluded: ["Return flight", "Tips"],
    imageUrl: "/tours/vietnam-discovery-8d.jpg",
    rating: 9.4,
    reviewCount: 123,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/dalat-highlands-5-days.html",
    durationHours: 120,
    startCity: "Ho Chi Minh City",
    destinations: ["Da Lat"],
    activities: ["adventure", "canyoning", "nature", "cultural"],
  },
  {
    id: "dalat-canyoning-2d",
    slug: "dalat-canyoning-adventure-2-days",
    name: "Dalat Canyoning Adventure",
    category: "multi-day",
    location: "Da Lat",
    duration: "2 days, 1 night",
    price: 1029,
    description: "Thrilling canyoning experience at Datanla Falls with professional guides.",
    fullDescription: `
      <h3>Canyon Thrills</h3>
      <p>Experience Vietnam's best canyoning with rappelling, cliff jumping, and natural waterslides.</p>
    `,
    highlights: ["Professional Guides", "Rappelling", "Cliff Jumping", "Natural Slides", "All Equipment"],
    itinerary: [
      { day: 1, title: "Da Lat", description: "Arrival", activities: ["Arrival in Dalat", "Hotel check-in", "Safety briefing", "Equipment fitting", "Night market"], meals: ["Dinner"] },
      { day: 2, title: "Da Lat", description: "Canyoning day", activities: ["Morning pickup", "Full day canyoning", "Multiple rappels", "Cliff jumps", "Waterslides", "Return to Saigon"], meals: ["Breakfast", "Lunch"] }
    ],
    included: ["1 night hotel", "Canyoning tour", "All equipment", "Guide", "Meals listed"],
    excluded: ["Transport to Dalat", "Tips"],
    imageUrl: "/tours/adventure-north-vietnam-14d.jpg",
    rating: 9.5,
    reviewCount: 189,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/dalat-canyoning-2-days.html",
    durationHours: 48,
    startCity: "Da Lat",
    destinations: ["Da Lat"],
    activities: ["adventure", "canyoning", "waterfall"],
  },
  {
    id: "dalat-coffee-wine-2d",
    slug: "dalat-coffee-wine-experience-2-days",
    name: "Dalat Coffee & Wine Experience",
    category: "multi-day",
    location: "Da Lat",
    duration: "2 days, 1 night",
    price: 1029,
    description: "Explore Dalat's coffee culture and emerging wine scene with tastings.",
    fullDescription: `
      <h3>Highland Flavors</h3>
      <p>Discover why Dalat produces Vietnam's best coffee and emerging wines in the cool highlands.</p>
    `,
    highlights: ["Coffee Plantations", "Roasting Demo", "Wine Tasting", "Farm Visits", "Local Cuisine"],
    itinerary: [
      { day: 1, title: "Da Lat", description: "Coffee focus", activities: ["Coffee farm visit", "Harvesting experience", "Roasting demonstration", "Cupping session", "Specialty coffee dinner"], meals: ["Lunch", "Dinner"] },
      { day: 2, title: "Da Lat", description: "Wine & more", activities: ["Vineyard tour", "Wine tasting", "Cheese pairing", "Flower gardens", "Departure"], meals: ["Breakfast", "Lunch"] }
    ],
    included: ["1 night hotel", "All tastings", "Farm visits", "Transport", "Meals listed"],
    excluded: ["Transport to Dalat", "Tips"],
    imageUrl: "/tours/vietnam-6days.jpg",
    rating: 9.2,
    reviewCount: 78,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/dalat-coffee-wine-2-days.html",
    durationHours: 48,
    startCity: "Da Lat",
    destinations: ["Da Lat"],
    activities: ["food-tour", "wine", "coffee", "farm-visit"],
  },
  {
    id: "dalat-easy-escape-3d",
    slug: "dalat-easy-escape-3-days",
    name: "Dalat Easy Escape",
    category: "multi-day",
    location: "Da Lat",
    duration: "3 days, 2 nights",
    price: 1029,
    description: "Relaxed Dalat getaway with scenic highlights and cool highland weather.",
    fullDescription: `
      <h3>Highland Retreat</h3>
      <p>Escape the heat with a leisurely exploration of Dalat's gardens, lakes, and French heritage.</p>
    `,
    highlights: ["Cool Climate", "Flower Gardens", "French Architecture", "Lake Views", "Night Market"],
    itinerary: [
      { day: 1, title: "Da Lat", description: "Arrival", activities: ["Flight arrival", "Hotel check-in", "Xuan Huong Lake walk", "Night market"], meals: ["Dinner"] },
      { day: 2, title: "Da Lat", description: "City tour", activities: ["Flower gardens", "Crazy House", "Valley of Love", "Datanla Falls", "French Quarter"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Da Lat", description: "Morning departure", activities: ["Market visit", "Coffee experience", "Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["2 nights hotel", "City tour", "Transfers", "Meals listed"],
    excluded: ["Flights", "Tips"],
    imageUrl: "/tours/vietnam-intro-8d.jpg",
    rating: 9.1,
    reviewCount: 145,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/dalat-easy-escape-3-days.html",
    durationHours: 72,
    startCity: "Ho Chi Minh City",
    destinations: ["Da Lat"],
    activities: ["nature", "sightseeing", "relaxation"],
  },
  {
    id: "dalat-day-trip",
    slug: "dalat-day-trip-from-saigon",
    name: "Dalat Day Trip from Saigon",
    category: "day-trip",
    location: "Da Lat",
    duration: "Full day",
    price: 479,
    description: "Quick highland escape with early flight and key Dalat highlights.",
    fullDescription: `
      <h3>Highland Highlights</h3>
      <p>Experience Dalat's best in a single day with early morning flight from Saigon.</p>
    `,
    highlights: ["Early Flight", "Key Attractions", "Cool Weather", "Lunch Included", "Same Day Return"],
    itinerary: [
      { day: 1, title: "Da Lat", description: "Full day", activities: ["Early flight", "Flower gardens", "Crazy House", "Lunch", "Waterfalls", "Evening return flight"], meals: ["Lunch"] }
    ],
    included: ["Return flights", "All transport", "Entrance fees", "Lunch", "Guide"],
    excluded: ["Tips"],
    imageUrl: "/tours/dalat-day-trip.jpg",
    rating: 8.9,
    reviewCount: 234,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/best-of-south-vietnam-5-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/678f59b34fd96.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c43b47c30.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c43b47c34.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c43b47c33.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c3d22a8d9.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c3d22a8d5.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c3d22a8d8.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c459ec1ad.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66b9c459ec1af.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/best-of-south-vietnam-5-days-64b5f1ef3149a.png","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65ddb07b69941.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65ddb07b69944.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65ddb07b69942.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65ddb07b69946.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65ddb07b69945.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/65ddb07b69947.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f9cbd74e1f7.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f4d8c946295.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f4ea7fa9816.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f73a39b937c.jpg"],
    pricingTiers: [{"category":"Superior (3*)","price":559},{"category":"First Class (4*)","price":659},{"category":"Deluxe (5*)","price":759}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 14,
    startCity: "Ho Chi Minh City",
    destinations: ["Da Lat"],
    activities: ["sightseeing", "nature", "photography"],
  },

  // NHA TRANG & MUI NE BEACH TOURS (5 tours)
  {
    id: "nha-trang-beach-4d",
    slug: "nha-trang-beach-escape-4-days",
    name: "Nha Trang Beach Escape",
    category: "multi-day",
    location: "Nha Trang",
    duration: "4 days, 3 nights",
    price: 399,
    description: "Classic Nha Trang beach holiday with island hopping and water activities.",
    fullDescription: `
      <h3>Beach Paradise</h3>
      <p>Enjoy Vietnam's premier beach resort with crystal waters and exciting island tours.</p>
    `,
    highlights: ["Island Hopping", "Snorkeling", "Beach Resort", "Mud Bath", "Seafood"],
    itinerary: [
      { day: 1, title: "Nha Trang", description: "Arrival", activities: ["Airport pickup", "Beachfront hotel", "Beach relaxation", "Seafood dinner"], meals: ["Dinner"] },
      { day: 2, title: "Nha Trang", description: "Island tour", activities: ["Island hopping boat", "Snorkeling", "Beach lunch", "Swimming", "Floating bar"], meals: ["Breakfast", "Lunch"] },
      { day: 3, title: "Nha Trang", description: "Relaxation", activities: ["Morning free", "Mud bath spa", "Vinpearl Land option", "Beach sunset"], meals: ["Breakfast", "Dinner"] },
      { day: 4, title: "Departure", description: "Morning", activities: ["Beach morning", "Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["3 nights beachfront hotel", "Island tour", "Mud bath", "Transfers", "Meals listed"],
    excluded: ["Flights", "Vinpearl tickets", "Tips"],
    imageUrl: "/tours/nha-trang-beach-4d.jpg",
    rating: 9.2,
    reviewCount: 167,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/nha-trang-discovery-and-beach-break-6-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67639add92b99.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667b88eeba06c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660faa2eb01e3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a3fa9839b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a3fa9839e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a41798134.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a41798130.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a41798133.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a3fa9839f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660faa2eb01e8.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660faa2eb01e9.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667b891c74c0f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/660faa2eb01e3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/660faa2eb01e9.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f4d3e47e254.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f648531d5d7.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f737b8b1857.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/660f83a75525e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/676399eedc20d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/67639b3e5e45c.jpg"],
    pricingTiers: [{"category":"Superior 3* Hotels","price":399},{"category":"First Class 4* Hotels","price":429},{"category":"Deluxe 5* Hotels","price":469}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 96,
    startCity: "Nha Trang",
    destinations: ["Nha Trang"],
    activities: ["beach", "snorkeling", "island-hopping", "spa"],
  },
  {
    id: "nha-trang-diving-3d",
    slug: "nha-trang-diving-experience-3-days",
    name: "Nha Trang Diving Experience",
    category: "multi-day",
    location: "Nha Trang",
    duration: "3 days, 2 nights",
    price: 399,
    description: "Discover Nha Trang's underwater world with certified diving instruction.",
    fullDescription: `
      <h3>Underwater Adventure</h3>
      <p>Learn to dive or advance your skills in Nha Trang's clear waters with PADI instructors.</p>
    `,
    highlights: ["PADI Instruction", "2 Dive Sites", "Equipment Included", "Marine Life", "Certification"],
    itinerary: [
      { day: 1, title: "Nha Trang", description: "Introduction", activities: ["Arrival", "Dive center briefing", "Pool training", "Theory session", "Dinner"], meals: ["Dinner"] },
      { day: 2, title: "Nha Trang", description: "Dive day", activities: ["Boat to dive site", "Morning dive", "Lunch on boat", "Afternoon dive", "Debriefing"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Nha Trang", description: "Final dive", activities: ["Last dive", "Certification", "Departure"], meals: ["Breakfast", "Lunch"] }
    ],
    included: ["2 nights hotel", "All dives", "Equipment", "PADI certification", "Meals listed"],
    excluded: ["Flights", "Tips"],
    imageUrl: "/tours/nha-trang-diving-3d.jpg",
    rating: 9.4,
    reviewCount: 98,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/nha-trang-discovery-and-beach-break-6-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67639add92b99.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667b88eeba06c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660faa2eb01e3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a3fa9839b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a3fa9839e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a41798134.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a41798130.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a41798133.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a3fa9839f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660faa2eb01e8.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660faa2eb01e9.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667b891c74c0f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/660faa2eb01e3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/660faa2eb01e9.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f4d3e47e254.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f648531d5d7.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f737b8b1857.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/660f83a75525e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/676399eedc20d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/67639b3e5e45c.jpg"],
    pricingTiers: [{"category":"Superior 3* Hotels","price":399},{"category":"First Class 4* Hotels","price":429},{"category":"Deluxe 5* Hotels","price":469}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 72,
    startCity: "Nha Trang",
    destinations: ["Nha Trang"],
    activities: ["diving", "snorkeling", "beach", "water-sports"],
  },
  {
    id: "mui-ne-beach-kite-4d",
    slug: "mui-ne-beach-kitesurfing-4-days",
    name: "Mui Ne Beach & Kitesurfing",
    category: "multi-day",
    location: "Mui Ne",
    duration: "4 days, 3 nights",
    price: 439,
    description: "Mui Ne beach holiday with kitesurfing lessons in Vietnam's wind capital.",
    fullDescription: `
      <h3>Wind & Waves</h3>
      <p>Learn kitesurfing in Mui Ne's perfect wind conditions with IKO certified instructors.</p>
    `,
    highlights: ["Kite Lessons", "IKO Instruction", "Sand Dunes", "Beach Resort", "Perfect Wind"],
    itinerary: [
      { day: 1, title: "Mui Ne", description: "Arrival", activities: ["Transfer from Saigon", "Beach resort check-in", "Kite introduction", "Sunset sand dunes"], meals: ["Dinner"] },
      { day: 2, title: "Mui Ne", description: "Kite day 1", activities: ["Morning theory", "Beach practice", "Lunch break", "Afternoon session"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Mui Ne", description: "Kite day 2", activities: ["Water practice", "Body dragging", "Board start", "Evening free"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Mui Ne", description: "Departure", activities: ["Morning kite practice", "Return to Saigon"], meals: ["Breakfast", "Lunch"] }
    ],
    included: ["3 nights resort", "Kite lessons", "Equipment", "Dunes tour", "Transport", "Meals listed"],
    excluded: ["Tips"],
    imageUrl: "/tours/mui-ne-beach-kite-4d.jpg",
    rating: 9.3,
    reviewCount: 76,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/saigon-and-mui-ne-relaxation-7-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660f83a75525e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65fd3e8c5e883.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65fd3e8c5e885.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65fd3e8c5e886.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/666958b45a8af.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65fd3e8c5e887.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66695863992ee.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66695898d29ac.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/666958d087b9f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/666958e3e33d2.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65fd3e8c5e888.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/666959aa08905.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a30b3fcd7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a30b3fcd4.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a32aa1745.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a32aa1747.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a30b3fcd2.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a32aa1748.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a30b3fcd5.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/66d7ce5308de8.png"],
    pricingTiers: [{"category":"Superior (3*)","price":439},{"category":"First Class (4*)","price":579}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 96,
    startCity: "Ho Chi Minh City",
    destinations: ["Mui Ne"],
    activities: ["kitesurfing", "beach", "adventure", "sand-dunes"],
  },
  {
    id: "mui-ne-sand-dunes-2d",
    slug: "mui-ne-sand-dunes-2-days",
    name: "Mui Ne Sand Dunes Escape",
    category: "multi-day",
    location: "Mui Ne",
    duration: "2 days, 1 night",
    price: 1029,
    description: "Experience Mui Ne's famous red and white sand dunes with sunrise and sunset tours.",
    fullDescription: `
      <h3>Desert by the Sea</h3>
      <p>Discover Mui Ne's unique sand dune landscapes with jeep tours at golden hours.</p>
    `,
    highlights: ["Red Sand Dunes", "White Sand Dunes", "Sunrise/Sunset", "Jeep Tour", "Fairy Stream"],
    itinerary: [
      { day: 1, title: "Mui Ne", description: "Arrival", activities: ["Transfer from Saigon", "Hotel check-in", "Red dunes sunset", "Seafood dinner"], meals: ["Dinner"] },
      { day: 2, title: "Mui Ne", description: "Sunrise tour", activities: ["4am pickup", "White dunes sunrise", "Sand boarding", "Fairy Stream", "Fishing village", "Return Saigon"], meals: ["Breakfast", "Lunch"] }
    ],
    included: ["1 night hotel", "Jeep tours", "Transport", "Meals listed"],
    excluded: ["Tips"],
    imageUrl: "/tours/vietnam-6days.jpg",
    rating: 9.1,
    reviewCount: 187,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/mui-ne-sand-dunes-2-days.html",
    durationHours: 48,
    startCity: "Ho Chi Minh City",
    destinations: ["Mui Ne"],
    activities: ["sand-dunes", "jeep", "photography", "nature"],
  },
  {
    id: "nha-trang-mui-ne-combo-6d",
    slug: "nha-trang-mui-ne-combo-6-days",
    name: "Nha Trang & Mui Ne Combo",
    category: "multi-day",
    location: "Central Vietnam",
    duration: "6 days, 5 nights",
    price: 399,
    description: "Best of both beach destinations with islands, dunes, and water sports.",
    fullDescription: `
      <h3>Beach Duo</h3>
      <p>Combine Nha Trang's islands with Mui Ne's unique dunes for the ultimate beach holiday.</p>
    `,
    highlights: ["Two Destinations", "Island Hopping", "Sand Dunes", "Beach Time", "Water Sports"],
    itinerary: [
      { day: 1, title: "Nha Trang", description: "Arrival", activities: ["Airport pickup", "Beach hotel", "Beach relaxation", "Dinner"], meals: ["Dinner"] },
      { day: 2, title: "Nha Trang", description: "Islands", activities: ["Island hopping", "Snorkeling", "Beach BBQ", "Swimming"], meals: ["Breakfast", "Lunch"] },
      { day: 3, title: "Nha Trang", description: "Free day", activities: ["Optional diving", "Mud bath", "Shopping", "Seafood dinner"], meals: ["Breakfast", "Dinner"] },
      { day: 4, title: "Mui Ne", description: "Transfer", activities: ["Scenic drive", "Mui Ne resort", "Red dunes sunset", "Dinner"], meals: ["Breakfast", "Dinner"] },
      { day: 5, title: "Mui Ne", description: "Dunes", activities: ["White dunes sunrise", "Beach day", "Fairy Stream", "Farewell dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 6, title: "Departure", description: "Morning", activities: ["Morning beach", "Transfer to Saigon"], meals: ["Breakfast"] }
    ],
    included: ["5 nights hotels", "All tours", "Transport between cities", "Meals listed"],
    excluded: ["Flights", "Optional activities", "Tips"],
    imageUrl: "/tours/nha-trang-mui-ne-combo-6d.jpg",
    rating: 9.3,
    reviewCount: 112,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/nha-trang-discovery-and-beach-break-6-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67639add92b99.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667b88eeba06c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660faa2eb01e3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a3fa9839b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a3fa9839e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a41798134.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a41798130.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a41798133.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c2a3fa9839f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660faa2eb01e8.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/660faa2eb01e9.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/667b891c74c0f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/660faa2eb01e3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/660faa2eb01e9.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f4d3e47e254.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f648531d5d7.jpg","https://d122axpxm39woi.cloudfront.net/images/hotels/544_306/67f737b8b1857.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/660f83a75525e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/676399eedc20d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/67639b3e5e45c.jpg"],
    pricingTiers: [{"category":"Superior 3* Hotels","price":399},{"category":"First Class 4* Hotels","price":429},{"category":"Deluxe 5* Hotels","price":469}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 144,
    startCity: "Nha Trang",
    destinations: ["Nha Trang", "Mui Ne"],
    activities: ["beach", "island-hopping", "sand-dunes", "snorkeling"],
  },

  // ETHNIC MINORITY & VILLAGE TOURS (5 tours)
  {
    id: "northern-ethnic-minorities-10d",
    slug: "northern-ethnic-minorities-10-days",
    name: "Northern Ethnic Minorities",
    category: "multi-day",
    location: "Northern Vietnam",
    duration: "10 days, 9 nights",
    price: 1029,
    description: "Comprehensive ethnic minority tour visiting Hmong, Dao, Tay, and other communities.",
    fullDescription: `
      <h3>Highland Cultures</h3>
      <p>Immerse yourself in the rich cultures of Vietnam's northern ethnic minorities with village homestays.</p>
    `,
    highlights: ["Multiple Ethnicities", "Village Homestays", "Market Days", "Traditional Crafts", "Remote Villages"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Arrival", activities: ["Airport pickup", "Hotel", "Ethnic museum", "Briefing"], meals: ["Dinner"] },
      { day: 2, title: "Ha Giang", description: "Journey north", activities: ["Drive to Ha Giang", "Tay village", "Homestay arrival"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Dong Van", description: "Karst plateau", activities: ["Ma Pi Leng Pass", "Lung Cu Flag Tower", "Hmong villages", "Dong Van town"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Meo Vac", description: "Market day", activities: ["Sunday market", "Ethnic costumes", "Village walks", "Homestay"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 5, title: "Bac Ha", description: "Transfer", activities: ["Scenic drive", "Flower Hmong area", "Bac Ha arrival", "Evening walk"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 6, title: "Bac Ha", description: "Market & villages", activities: ["Famous Bac Ha market", "Village visits", "Craft demonstrations", "Local lunch"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 7, title: "Sapa", description: "Highland hub", activities: ["Transfer to Sapa", "Red Dao village", "Traditional medicine", "Town evening"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 8, title: "Sapa", description: "Terraces", activities: ["Rice terrace trek", "Black Hmong village", "Picnic lunch", "Craft shopping"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 9, title: "Sapa", description: "More villages", activities: ["Ta Van village", "Giay people", "Bamboo lunch", "Return train"], meals: ["Breakfast", "Lunch"] },
      { day: 10, title: "Hanoi", description: "Departure", activities: ["Morning arrival", "Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["9 nights hotels/homestays", "All transport", "Guide", "Market visits", "Meals listed"],
    excluded: ["Flights", "Tips"],
    imageUrl: "/tours/sapa-trekking.jpg",
    rating: 9.6,
    reviewCount: 67,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/northern-ethnic-minorities-10-days.html",
    durationHours: 240,
    startCity: "Hanoi",
    destinations: ["Ha Giang", "Dong Van", "Bac Ha", "Sapa"],
    activities: ["cultural", "trekking", "homestay", "market-tour"],
  },
  {
    id: "bac-ha-market-weekend-3d",
    slug: "bac-ha-market-weekend-3-days",
    name: "Bac Ha Market Weekend",
    category: "multi-day",
    location: "Bac Ha",
    duration: "3 days, 2 nights",
    price: 140,
    description: "Experience Vietnam's most colorful ethnic market with Flower Hmong community.",
    fullDescription: `
      <h3>Market Colors</h3>
      <p>Visit the famous Sunday market where Flower Hmong gather in their spectacular traditional dress.</p>
    `,
    highlights: ["Sunday Market", "Flower Hmong", "Traditional Costumes", "Village Visits", "Local Homestay"],
    itinerary: [
      { day: 1, title: "Lao Cai", description: "Journey", activities: ["Night train from Hanoi", "Arrive Lao Cai", "Drive to Bac Ha", "Village walk", "Homestay"], meals: ["Lunch", "Dinner"] },
      { day: 2, title: "Bac Ha", description: "Market day", activities: ["Famous Sunday market", "Hmong interactions", "Buffalo market", "Craft shopping", "Village afternoon"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Return", description: "Villages", activities: ["Morning village trek", "Dao village", "Return to Lao Cai", "Train to Hanoi"], meals: ["Breakfast", "Lunch"] }
    ],
    included: ["2 nights homestay/hotel", "Train tickets", "Transport", "Guide", "Meals listed"],
    excluded: ["Tips"],
    imageUrl: "/tours/bac-ha-market-weekend-3d.jpg",
    rating: 9.4,
    reviewCount: 134,
    affiliateUrl: "https://www.bestpricetravel.com/sapa-tours/sapa-with-bac-ha-market-2-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/651694f6ae27b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/651694f6ae272.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/651694f6ae275.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/651694f6ae276.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/651694f6ae277.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/651694f6ae278.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/651694f6ae279.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/651694f6ae27a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/651694f6ae277.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/651694f6ae278.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/651690e737810.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/65168bde41bcc.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/6516892c63457.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/651697184b7a5.jpg","https://d122axpxm39woi.cloudfront.net/assets/img/dcma.png"],
    pricingTiers: [{"category":"Superior","price":150},{"category":"First Class","price":168}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 72,
    startCity: "Hanoi",
    destinations: ["Bac Ha"],
    activities: ["market-tour", "cultural", "trekking", "homestay"],
  },
  {
    id: "ha-giang-loop-5d",
    slug: "ha-giang-loop-adventure-5-days",
    name: "Ha Giang Loop Adventure",
    category: "multi-day",
    location: "Ha Giang",
    duration: "5 days, 4 nights",
    price: 198,
    description: "Epic Ha Giang motorbike loop through Vietnam's most spectacular mountain scenery.",
    fullDescription: `
      <h3>Ultimate Road Trip</h3>
      <p>Ride the legendary Ha Giang loop with stunning passes and remote ethnic villages.</p>
    `,
    highlights: ["Ma Pi Leng Pass", "Lung Cu Flag Tower", "Remote Villages", "Karst Mountains", "Adventure Riding"],
    itinerary: [
      { day: 1, title: "Ha Giang", description: "Start", activities: ["Bus from Hanoi", "Ha Giang arrival", "Bike pickup", "Evening ride", "Dinner"], meals: ["Dinner"] },
      { day: 2, title: "Yen Minh", description: "Day 1 loop", activities: ["Quan Ba Heaven Gate", "Twin Mountains", "Tam Son town", "Yen Minh homestay"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Dong Van", description: "Spectacular", activities: ["Lung Cu Flag Tower", "Dong Van Karst", "Ancient town", "Ma Pi Leng sunset"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Du Gia", description: "Off beaten", activities: ["Meo Vac morning", "Du Gia village", "Waterfall swim", "Local homestay"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 5, title: "Return", description: "Final ride", activities: ["Morning ride", "Ha Giang return", "Bus to Hanoi"], meals: ["Breakfast", "Lunch"] }
    ],
    included: ["4 nights homestay/hotel", "Motorbike rental", "Fuel", "Guide option", "Meals listed"],
    excluded: ["Bus tickets", "Tips"],
    imageUrl: "/tours/ha-giang-loop-5d.jpg",
    rating: 9.7,
    reviewCount: 234,
    affiliateUrl: "https://www.bestpricetravel.com/ha-giang-tours/ha-giang-loop-on-motorbike-4-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68ecbbb2f1ab2.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/63d8731a10640.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c77e7a8f134.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/63d8731a1063d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/63d8731a10643.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/63d8731a10646.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/63d8731a1063f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68ca7a7fd9777.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c77c5af3b54.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c77d5161ec0.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c77db0baea0.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68ca7a7fd9778.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/68c77db0baea3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/68ecbeebcf900.png","https://d122axpxm39woi.cloudfront.net/images/tours/origin/68c77e7a8f134.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/63d8731a1063f.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/68c77db0baea0.jpg","https://d122axpxm39woi.cloudfront.net/images/review/250_170/68de4d89589be.jpg","https://d122axpxm39woi.cloudfront.net/images/review/250_170/68b7b996bec6a.jpg","https://d122axpxm39woi.cloudfront.net/images/review/250_170/68b7b996bec6c.jpg"],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 120,
    startCity: "Hanoi",
    destinations: ["Ha Giang", "Dong Van"],
    activities: ["motorbike", "adventure", "cultural", "trekking"],
  },
  {
    id: "mai-chau-homestay-2d",
    slug: "mai-chau-homestay-2-days",
    name: "Mai Chau Valley Homestay",
    category: "multi-day",
    location: "Mai Chau",
    duration: "2 days, 1 night",
    price: 119,
    description: "Easy escape to White Thai villages in beautiful Mai Chau valley.",
    fullDescription: `
      <h3>Valley Retreat</h3>
      <p>Experience authentic White Thai hospitality in the scenic Mai Chau valley, just 3 hours from Hanoi.</p>
    `,
    highlights: ["Thai Homestay", "Stilt House", "Rice Paddies", "Cycling", "Traditional Dance"],
    itinerary: [
      { day: 1, title: "Mai Chau", description: "Arrival", activities: ["Departure Hanoi", "Scenic drive", "Lac village", "Cycling tour", "Traditional dance", "Homestay dinner"], meals: ["Lunch", "Dinner"] },
      { day: 2, title: "Mai Chau", description: "Morning", activities: ["Sunrise views", "Village walk", "Weaving demo", "Return Hanoi"], meals: ["Breakfast", "Lunch"] }
    ],
    included: ["1 night homestay", "All transport", "Bicycle", "Dance show", "Meals listed"],
    excluded: ["Tips", "Drinks"],
    imageUrl: "/tours/mai-chau-homestay-2d.jpg",
    rating: 9.3,
    reviewCount: 289,
    affiliateUrl: "https://www.bestpricetravel.com/hanoi-tours/mai-chau-valley-break-2-days-small-group.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6465aee7ddb9d.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6465aee7ddb96.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/658aa9c2bf868.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6465aee7ddb99.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6465aee7ddb9a.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/658aa94e9c0af.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6465aee7ddb9b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65d2c359b71d2.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6465aee7ddb9c.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/6465aee7ddb96.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/6465aee7ddb9b.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/6824604dd50bb.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/5ef6a7ed3796e.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/68343776bcf69.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/370_207/657fc8f8b206f.jpg","https://d122axpxm39woi.cloudfront.net/assets/img/dcma.png"],
    pricingTiers: [{"category":"Superior","price":119},{"category":"Deluxe class","price":165}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 48,
    startCity: "Hanoi",
    destinations: ["Mai Chau"],
    activities: ["homestay", "cycling", "cultural", "nature"],
  },
  {
    id: "pu-luong-ethnic-trek-4d",
    slug: "pu-luong-ethnic-trekking-4-days",
    name: "Pu Luong Ethnic Trekking",
    category: "multi-day",
    location: "Pu Luong",
    duration: "4 days, 3 nights",
    price: 134,
    description: "Off-the-beaten-path trekking through Pu Luong with Thai minority homestays.",
    fullDescription: `
      <h3>Hidden Valley</h3>
      <p>Trek through Pu Luong Nature Reserve with stunning terraces and authentic ethnic experiences.</p>
    `,
    highlights: ["Nature Reserve", "Rice Terraces", "Thai Villages", "Waterfall Swims", "Authentic Homestays"],
    itinerary: [
      { day: 1, title: "Pu Luong", description: "Arrival", activities: ["Drive from Hanoi", "Reserve entrance", "First village", "Homestay welcome"], meals: ["Lunch", "Dinner"] },
      { day: 2, title: "Pu Luong", description: "Trek day 1", activities: ["Morning trek", "Rice terrace views", "Picnic lunch", "Waterfall swim", "Second homestay"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Pu Luong", description: "Trek day 2", activities: ["Valley trek", "Local farming", "Village visits", "Bamboo rafting", "Final homestay"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Return", description: "Departure", activities: ["Morning walk", "Return to Hanoi"], meals: ["Breakfast", "Lunch"] }
    ],
    included: ["3 nights homestay", "Trekking guide", "All transport", "Rafting", "Meals listed"],
    excluded: ["Tips"],
    imageUrl: "/tours/pu-luong-ethnic-trek-4d.jpg",
    rating: 9.5,
    reviewCount: 156,
    affiliateUrl: "https://www.bestpricetravel.com/sapa-tours/sapa-trekking-ethnic-market-3-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6426b3e7edbeb.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6426b3e7edbe4.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6426b3e7edbe6.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6426b3e7edbe7.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6426b3e7edbe8.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6426b3e7edbe9.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6426b3e7edbea.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65125139c0194.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65125139c0196.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65125139c0197.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65125139c0198.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/65125139c0199.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/641bba431bd44.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/641bba431bd43.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/651251a4e8bd6.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/651251a4e8bd8.jpg","https://d122axpxm39woi.cloudfront.net/images/review/250_170/sunlit-hill-6479c889cc81a.jpg","https://d122axpxm39woi.cloudfront.net/images/review/250_170/selfie-beside-a-pure-stream-6479c88a51369.jpg","https://d122axpxm39woi.cloudfront.net/images/review/250_170/winding-road-at-cat-cat-village-6479c8fac35e0.jpg","https://d122axpxm39woi.cloudfront.net/images/review/250_170/cat-cat-village-6479c8fb4206c.jpg"],
    pricingTiers: [{"category":"Superior","price":149}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE","Bac Ha Market is opened on Sunday only. If you want to visit the market, you should departure on Thursday."],
    durationHours: 96,
    startCity: "Hanoi",
    destinations: ["Pu Luong"],
    activities: ["trekking", "homestay", "nature", "rafting"],
  },

  // UNIQUE EXPERIENCE TOURS (5 tours)
  {
    id: "vietnam-train-journey-14d",
    slug: "vietnam-train-journey-14-days",
    name: "Vietnam Train Journey",
    category: "multi-day",
    location: "Vietnam",
    duration: "14 days, 13 nights",
    price: 1349,
    description: "Travel Vietnam the local way by train from Hanoi to Saigon with stops along the way.",
    fullDescription: `
      <h3>Rails Through Vietnam</h3>
      <p>Experience Vietnam's legendary Reunification Express with stops at all major destinations.</p>
    `,
    highlights: ["Reunification Express", "All Train Travel", "Coastal Views", "Local Experience", "Authentic Journey"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Arrival", activities: ["Airport pickup", "Old Quarter hotel", "City walk", "Welcome dinner"], meals: ["Dinner"] },
      { day: 2, title: "Hanoi", description: "City tour", activities: ["Temple of Literature", "Ho Chi Minh Complex", "Old Quarter", "Night train prep"], meals: ["Breakfast", "Lunch"] },
      { day: 3, title: "Sapa", description: "Mountains", activities: ["Arrive Lao Cai", "Transfer Sapa", "Valley views", "Market visit"], meals: ["Breakfast", "Dinner"] },
      { day: 4, title: "Sapa", description: "Trekking", activities: ["Rice terrace trek", "Village lunch", "Hmong village", "Night train to Hanoi"], meals: ["Breakfast", "Lunch"] },
      { day: 5, title: "Ninh Binh", description: "Dry Halong", activities: ["Morning train", "Tam Coc boat", "Mua Cave", "Train to Hue"], meals: ["Breakfast", "Lunch"] },
      { day: 6, title: "Hue", description: "Imperial city", activities: ["Morning arrival", "Citadel tour", "Thien Mu Pagoda", "Royal dinner"], meals: ["Breakfast", "Dinner"] },
      { day: 7, title: "Hue", description: "Tombs", activities: ["Royal tombs", "Garden houses", "Perfume River", "Train to Da Nang"], meals: ["Breakfast", "Lunch"] },
      { day: 8, title: "Hoi An", description: "Ancient town", activities: ["Da Nang arrival", "Transfer Hoi An", "Ancient town", "Lantern evening"], meals: ["Breakfast", "Dinner"] },
      { day: 9, title: "Hoi An", description: "Free day", activities: ["Cooking class option", "Beach time", "Tailor fitting", "Night market"], meals: ["Breakfast"] },
      { day: 10, title: "Train", description: "Coastal journey", activities: ["Morning departure", "Scenic coastal route", "On-board meals", "Arrive Nha Trang"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 11, title: "Nha Trang", description: "Beach day", activities: ["Beach morning", "Island tour option", "Seafood dinner", "Night train"], meals: ["Breakfast", "Dinner"] },
      { day: 12, title: "Saigon", description: "Arrival", activities: ["Morning arrival", "City tour", "War Remnants", "Chinatown"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 13, title: "Mekong", description: "Delta", activities: ["Floating market", "River life", "Village lunch", "Return Saigon"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 14, title: "Departure", description: "Farewell", activities: ["Morning free", "Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["13 nights hotels/trains", "All train tickets", "Tours", "Meals listed"],
    excluded: ["International flights", "Tips"],
    imageUrl: "/tours/vietnam-train-journey-14d.jpg",
    rating: 9.5,
    reviewCount: 89,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/one-journey-two-heritages-spiritual-yen-tu-to-majestic-halong-bay-6-days.html",
    durationHours: 336,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Sapa", "Ninh Binh", "Hue", "Hoi An", "Nha Trang", "Ho Chi Minh City", "Mekong Delta"],
    activities: ["train", "cultural", "trekking", "beach", "boat-tour"],
  },
  {
    id: "vietnam-wellness-retreat-7d",
    slug: "vietnam-wellness-retreat-7-days",
    name: "Vietnam Wellness Retreat",
    category: "multi-day",
    location: "Vietnam",
    duration: "7 days, 6 nights",
    price: 1429,
    description: "Rejuvenating wellness journey with yoga, spa treatments, and healthy cuisine.",
    fullDescription: `
      <h3>Mind Body Spirit</h3>
      <p>A transformative wellness experience combining Vietnamese healing traditions with modern spa luxury.</p>
    `,
    highlights: ["Daily Yoga", "Spa Treatments", "Meditation", "Healthy Cuisine", "Natural Settings"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Arrival", activities: ["Airport pickup", "Spa hotel", "Welcome massage", "Healthy dinner"], meals: ["Dinner"] },
      { day: 2, title: "Hanoi", description: "Urban wellness", activities: ["Morning yoga", "Mindfulness walk", "Spa treatments", "Meditation session"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Ninh Binh", description: "Nature retreat", activities: ["Transfer", "Eco lodge", "Nature meditation", "Hot springs"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Ninh Binh", description: "Deep relaxation", activities: ["Sunrise yoga", "Cycling", "Spa afternoon", "Sound healing"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 5, title: "Hoi An", description: "Beach wellness", activities: ["Flight to Da Nang", "Beach resort", "Afternoon spa", "Beach yoga"], meals: ["Breakfast", "Dinner"] },
      { day: 6, title: "Hoi An", description: "Full spa day", activities: ["Morning meditation", "Traditional medicine", "Full spa circuit", "Farewell dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 7, title: "Departure", description: "Sunrise finale", activities: ["Final yoga", "Healthy breakfast", "Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["6 nights spa hotels", "All yoga/meditation", "Spa treatments", "Healthy meals", "Domestic flight"],
    excluded: ["International flights", "Tips"],
    imageUrl: "/tours/vietnam-wellness-retreat-7d.jpg",
    rating: 9.6,
    reviewCount: 67,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/vietnam-luxury-wellness-retreat-escape-8-days.html",
    imageGallery: ["https://d122axpxm39woi.cloudfront.net/images/tours/800_450/67e35ab244d68.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666bc9ff0958.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66174dd9ea5ab.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66174dd9ea5ae.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666bcad7a331.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66174dd9ea5af.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66174dd9ea5b0.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666bcbb7bbc1.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666bcd638ad2.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66174dd9ea5b2.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66174dd9ea5b1.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66174dd9ea5b4.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/6666bce748ab3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66174dd9ea5b3.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/800_450/66174dd9ea5b5.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/66d9160e63a4f.png","https://d122axpxm39woi.cloudfront.net/images/tours/origin/66174dd9ea5ab.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/66174dd9ea5ae.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/66174dd9ea5af.jpg","https://d122axpxm39woi.cloudfront.net/images/tours/origin/66174dd9ea5b0.jpg"],
    pricingTiers: [{"category":"Luxury 5* Hotels & Resorts","price":1429}],
    importantNotes: ["PROGRAMS & SCHEDULES SUBJECT TO CHANGE WITHOUT PRIOR NOTICE"],
    durationHours: 168,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Ninh Binh", "Hoi An"],
    activities: ["wellness", "yoga", "spa", "meditation"],
  },
  {
    id: "vietnam-volunteering-14d",
    slug: "vietnam-volunteering-experience-14-days",
    name: "Vietnam Volunteering Experience",
    category: "multi-day",
    location: "Vietnam",
    duration: "14 days, 13 nights",
    price: 1559,
    description: "Meaningful volunteering combined with cultural exploration in Vietnam.",
    fullDescription: `
      <h3>Give Back Journey</h3>
      <p>Make a difference while experiencing Vietnam through teaching English, community work, and cultural exchange.</p>
    `,
    highlights: ["Teaching English", "Community Projects", "Cultural Exchange", "Local Immersion", "Meaningful Travel"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Arrival", activities: ["Airport pickup", "Orientation", "Team dinner"], meals: ["Dinner"] },
      { day: 2, title: "Hanoi", description: "Training", activities: ["Volunteer training", "Teaching methods", "Cultural briefing", "City tour"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Rural Village", description: "Placement", activities: ["Village transfer", "School introduction", "Homestay setup", "Community dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Village", description: "Teaching day 1", activities: ["Morning classes", "Lunch with kids", "Afternoon activities", "Evening prep"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 5, title: "Village", description: "Teaching day 2", activities: ["English lessons", "Sports activities", "Community project", "Village evening"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 6, title: "Village", description: "Teaching day 3", activities: ["Class activities", "Art project", "Home visits", "Cultural exchange"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 7, title: "Village", description: "Community day", activities: ["Construction help", "Garden project", "Community meal", "Free evening"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 8, title: "Halong Bay", description: "Break day", activities: ["Transfer to bay", "Cruise", "Beach time", "Reflection"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 9, title: "Second Placement", description: "New village", activities: ["Transfer", "School introduction", "New homestay", "Welcome dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 10, title: "Village", description: "Teaching", activities: ["Morning classes", "Afternoon activities", "Evening prep"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 11, title: "Village", description: "Project work", activities: ["School improvement", "Painting project", "Sports day", "Farewell prep"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 12, title: "Village", description: "Farewell", activities: ["Final classes", "Farewell ceremony", "Gift exchange", "Return Hanoi"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 13, title: "Hanoi", description: "Reflection", activities: ["Debriefing", "Certificate ceremony", "Cultural tour", "Farewell dinner"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 14, title: "Departure", description: "Goodbye", activities: ["Morning free", "Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["13 nights accommodation", "Volunteer placement", "Training", "All meals", "Transport", "Cruise"],
    excluded: ["Flights", "Visa", "Tips"],
    imageUrl: "/tours/vietnam-volunteering-14d.jpg",
    rating: 9.7,
    reviewCount: 45,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/vietnam-flavors-experience-11-days.html",
    durationHours: 336,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Rural Villages", "Halong Bay"],
    activities: ["volunteering", "teaching", "cultural", "homestay"],
  },
  {
    id: "vietnam-birdwatching-10d",
    slug: "vietnam-birdwatching-expedition-10-days",
    name: "Vietnam Birdwatching Expedition",
    category: "multi-day",
    location: "Vietnam",
    duration: "10 days, 9 nights",
    price: 719,
    description: "Expert-led birdwatching tour through Vietnam's best birding locations.",
    fullDescription: `
      <h3>Birder's Paradise</h3>
      <p>Discover Vietnam's incredible bird diversity from highland endemics to wetland species.</p>
    `,
    highlights: ["Expert Bird Guide", "Endemic Species", "National Parks", "Wetlands", "Small Group"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Arrival", activities: ["Airport pickup", "Hotel", "Evening briefing", "Checklist review"], meals: ["Dinner"] },
      { day: 2, title: "Cuc Phuong", description: "Forest birds", activities: ["Drive to park", "Afternoon birding", "Night walk", "Lodge stay"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Cuc Phuong", description: "Full day", activities: ["Dawn chorus", "Forest trails", "Primate center", "Evening session"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Cat Ba", description: "Island birds", activities: ["Transfer to Cat Ba", "Langur reserve", "Coastal birds", "Sunset spot"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 5, title: "Da Lat", description: "Highlands", activities: ["Flight to Da Lat", "Afternoon birding", "Highland endemics"], meals: ["Breakfast", "Dinner"] },
      { day: 6, title: "Da Lat", description: "Full day", activities: ["Bidoup NP", "Mountain species", "Waterfall area", "Night birding"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 7, title: "Di Linh", description: "Coffee forests", activities: ["Drive to Di Linh", "Forest edges", "Special species", "Local stay"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 8, title: "Cat Tien", description: "Lowland forest", activities: ["Transfer Cat Tien", "Afternoon walk", "Night safari", "Lodge"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 9, title: "Cat Tien", description: "Full day", activities: ["Dawn birding", "Forest trails", "Crocodile lake", "Final checklist"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 10, title: "Departure", description: "Saigon", activities: ["Morning birding", "Transfer Saigon", "Airport"], meals: ["Breakfast", "Lunch"] }
    ],
    included: ["9 nights hotels/lodges", "Expert bird guide", "National park fees", "All transport", "Meals listed"],
    excluded: ["Flights", "Optical equipment", "Tips"],
    imageUrl: "/tours/vietnam-birdwatching-10d.jpg",
    rating: 9.5,
    reviewCount: 34,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/central-and-southern-vietnamese-taste-10-days.html",
    durationHours: 240,
    startCity: "Hanoi",
    destinations: ["Cuc Phuong", "Cat Ba", "Da Lat", "Cat Tien"],
    activities: ["birdwatching", "wildlife", "nature", "hiking"],
  },
  {
    id: "vietnam-craft-artisan-8d",
    slug: "vietnam-craft-artisan-journey-8-days",
    name: "Vietnam Craft & Artisan Journey",
    category: "multi-day",
    location: "Vietnam",
    duration: "8 days, 7 nights",
    price: 1029,
    description: "Discover Vietnam's traditional crafts with hands-on workshops and master artisans.",
    fullDescription: `
      <h3>Artisan Heritage</h3>
      <p>Learn traditional Vietnamese crafts from master artisans including lacquerware, ceramics, and textiles.</p>
    `,
    highlights: ["Lacquerware Workshop", "Ceramic Making", "Silk Weaving", "Lantern Craft", "Master Artisans"],
    itinerary: [
      { day: 1, title: "Hanoi", description: "Arrival", activities: ["Airport pickup", "Artisan hotel", "Craft quarter walk", "Welcome dinner"], meals: ["Dinner"] },
      { day: 2, title: "Hanoi", description: "Lacquerware", activities: ["Lacquer village", "Master class", "Hands-on workshop", "Own creation"], meals: ["Breakfast", "Lunch"] },
      { day: 3, title: "Bat Trang", description: "Ceramics", activities: ["Pottery village", "Kiln tour", "Ceramic workshop", "Create pottery", "Return Hanoi"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Hoi An", description: "Textile arts", activities: ["Flight to Da Nang", "Silk village", "Weaving demonstration", "Evening ancient town"], meals: ["Breakfast", "Dinner"] },
      { day: 5, title: "Hoi An", description: "Lanterns", activities: ["Lantern making class", "Paper craft", "Afternoon tailoring", "Night market"], meals: ["Breakfast", "Lunch"] },
      { day: 6, title: "Hoi An", description: "More crafts", activities: ["Leather craft", "Custom sandals", "Cooking class", "Free evening"], meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 7, title: "Saigon", description: "Southern crafts", activities: ["Flight to Saigon", "Lacquer gallery", "Ao dai fitting", "Farewell dinner"], meals: ["Breakfast", "Dinner"] },
      { day: 8, title: "Departure", description: "Final", activities: ["Morning market", "Craft shopping", "Airport transfer"], meals: ["Breakfast"] }
    ],
    included: ["7 nights hotels", "All workshops", "Materials", "Domestic flights", "Meals listed"],
    excluded: ["International flights", "Tips"],
    imageUrl: "/tours/vietnam-intro-8d.jpg",
    rating: 9.4,
    reviewCount: 56,
    affiliateUrl: "https://www.bestpricetravel.com/vietnam-tours/vietnam-craft-artisan-8-days.html",
    durationHours: 192,
    startCity: "Hanoi",
    destinations: ["Hanoi", "Bat Trang", "Hoi An", "Ho Chi Minh City"],
    activities: ["craft", "workshop", "cultural", "art"],
  },
];

// Filter to only show BestPrice Travel tours (hide other affiliates for now)
const ACTIVE_TOURS = FEATURED_TOURS.filter((tour) =>
  tour.affiliateUrl.includes("bestpricetravel.com")
);

// Get tours by category
export function getToursByCategory(category: Tour["category"]): Tour[] {
  return ACTIVE_TOURS.filter((tour) => tour.category === category);
}

// Get featured tours for homepage (4 specific curated tours from BestPrice Travel)
export function getFeaturedTours(limit = 4): Tour[] {
  // Curated selection of 4 featured tours for homepage - BestPrice Travel only
  const featuredIds = [
    "hanoi-street-food-tour",        // $35
    "central-vietnam-danang-5d",     // $449 Da Nang, Hoi An, Ba Na Hills
    "saigon-dinner-cruise",          // $46
    "north-vietnam-hanoi-sapa-halong-6d",  // $549 Northern Vietnam
  ];

  const featuredTours = featuredIds
    .map((id) => ACTIVE_TOURS.find((tour) => tour.id === id))
    .filter((tour): tour is Tour => tour !== undefined);

  return featuredTours.slice(0, limit);
}

// Get tours by location
export function getToursByLocation(location: string): Tour[] {
  return ACTIVE_TOURS.filter((tour) =>
    tour.location.toLowerCase().includes(location.toLowerCase())
  );
}

// Get all active tours (for tours page and static generation)
export function getAllActiveTours(): Tour[] {
  return ACTIVE_TOURS;
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
