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

  // =====================================================
  // ASIATOURADVISOR.COM TOURS - Day Trips
  // =====================================================

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
    price: 1595,
    originalPrice: 1915,
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
