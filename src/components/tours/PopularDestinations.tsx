"use client";

import Image from "next/image";
import Link from "next/link";

interface DestinationCard {
  name: string;
  image: string;
  description: string;
  tourCount: number;
  filterValue: string;
}

const DESTINATIONS: DestinationCard[] = [
  {
    name: "Halong Bay",
    image: "/tours/halong-day-trip.jpg",
    description: "UNESCO World Heritage Site with thousands of limestone karsts and islands rising from emerald waters. Perfect for cruises and kayaking.",
    tourCount: 12,
    filterValue: "Halong Bay",
  },
  {
    name: "Mekong Delta",
    image: "/tours/mekong-eyes.jpg",
    description: "Vietnam's rice bowl featuring floating markets, lush orchards, and traditional village life along winding waterways.",
    tourCount: 8,
    filterValue: "Mekong Delta",
  },
  {
    name: "Sapa",
    image: "/tours/sapa-trekking.jpg",
    description: "Stunning terraced rice fields and vibrant hill tribe cultures in Vietnam's northern highlands.",
    tourCount: 6,
    filterValue: "Sapa",
  },
  {
    name: "Hoi An",
    image: "/tours/danang-4days.jpg",
    description: "Ancient trading port with well-preserved architecture, lantern-lit streets, and world-class tailoring.",
    tourCount: 5,
    filterValue: "Hoi An",
  },
  {
    name: "Ninh Binh",
    image: "/tours/ninh-binh-day.jpg",
    description: "Known as 'Halong Bay on land' with dramatic karst landscapes, ancient temples, and peaceful boat rides.",
    tourCount: 4,
    filterValue: "Ninh Binh",
  },
  {
    name: "Phu Quoc",
    image: "/tours/phu-quoc-3d.jpg",
    description: "Tropical paradise island with pristine beaches, coral reefs, and fresh seafood galore.",
    tourCount: 3,
    filterValue: "Phu Quoc",
  },
];

export function PopularDestinations() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Popular Destinations in Vietnam
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover the most sought-after destinations for travelers exploring Vietnam
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DESTINATIONS.map((dest) => (
            <div
              key={dest.name}
              className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold text-white">{dest.name}</h3>
                  <p className="text-sm text-white/80">{dest.tourCount} tours available</p>
                </div>
              </div>
              <div className="p-5">
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                  {dest.description}
                </p>
                <Link
                  href={`/tours?destination=${encodeURIComponent(dest.filterValue)}`}
                  className="inline-flex items-center text-cyan-600 dark:text-cyan-400 font-medium text-sm hover:text-cyan-700 dark:hover:text-cyan-300"
                >
                  View Tours
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
