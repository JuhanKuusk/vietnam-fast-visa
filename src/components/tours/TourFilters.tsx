"use client";

import type { TourFilters, TourActivity, Destination, StartCity } from "@/types/tours";

interface TourFiltersProps {
  filters: TourFilters;
  setFilters: (filters: TourFilters) => void;
  totalCount: number;
  filteredCount: number;
}

// Available options for filters
const START_CITIES: { value: StartCity | "all"; label: string }[] = [
  { value: "all", label: "All Cities" },
  { value: "Hanoi", label: "Hanoi" },
  { value: "Ho Chi Minh City", label: "Ho Chi Minh City" },
  { value: "Da Nang", label: "Da Nang" },
  { value: "Hue", label: "Hue" },
  { value: "Hoi An", label: "Hoi An" },
  { value: "Nha Trang", label: "Nha Trang" },
  { value: "Sapa", label: "Sapa" },
  { value: "Can Tho", label: "Can Tho" },
];

const DESTINATIONS: { value: Destination; label: string }[] = [
  { value: "Halong Bay", label: "Halong Bay" },
  { value: "Lan Ha Bay", label: "Lan Ha Bay" },
  { value: "Bai Tu Long Bay", label: "Bai Tu Long Bay" },
  { value: "Mekong Delta", label: "Mekong Delta" },
  { value: "Sapa", label: "Sapa" },
  { value: "Ninh Binh", label: "Ninh Binh" },
  { value: "Hoi An", label: "Hoi An" },
  { value: "Hue", label: "Hue" },
  { value: "Da Nang", label: "Da Nang" },
  { value: "Phu Quoc", label: "Phu Quoc" },
  { value: "Nha Trang", label: "Nha Trang" },
  { value: "Cu Chi", label: "Cu Chi Tunnels" },
  { value: "Can Tho", label: "Can Tho" },
  { value: "Ben Tre", label: "Ben Tre" },
  { value: "Mai Chau", label: "Mai Chau" },
  { value: "Pu Luong", label: "Pu Luong" },
  { value: "Cambodia", label: "Cambodia" },
];

const ACTIVITIES: { value: TourActivity; label: string }[] = [
  { value: "cruise", label: "Cruise" },
  { value: "kayaking", label: "Kayaking" },
  { value: "cave-exploration", label: "Cave Exploration" },
  { value: "trekking", label: "Trekking" },
  { value: "cycling", label: "Cycling" },
  { value: "cultural", label: "Cultural" },
  { value: "food-tour", label: "Food Tour" },
  { value: "beach", label: "Beach" },
  { value: "snorkeling", label: "Snorkeling" },
  { value: "city-tour", label: "City Tour" },
  { value: "photography", label: "Photography" },
  { value: "homestay", label: "Homestay" },
  { value: "cooking-class", label: "Cooking Class" },
  { value: "nature", label: "Nature" },
  { value: "boat-trip", label: "Boat Trip" },
];

const DURATION_OPTIONS = [
  { value: "all", label: "Any Duration", min: undefined, max: undefined },
  { value: "day", label: "Day Trip (< 24h)", min: 0, max: 24 },
  { value: "2-3days", label: "2-3 Days", min: 24, max: 72 },
  { value: "4-7days", label: "4-7 Days", min: 72, max: 168 },
  { value: "week+", label: "Week+ (8+ Days)", min: 168, max: undefined },
];

export function TourFilters({
  filters,
  setFilters,
  totalCount,
  filteredCount,
}: TourFiltersProps) {
  const handleFilterChange = (key: keyof TourFilters, value: string) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  const handleDurationChange = (value: string) => {
    const option = DURATION_OPTIONS.find((o) => o.value === value);
    setFilters({
      ...filters,
      minDuration: option?.min,
      maxDuration: option?.max,
    });
  };

  const handleDestinationToggle = (destination: Destination) => {
    const current = filters.destinations || [];
    const updated = current.includes(destination)
      ? current.filter((d) => d !== destination)
      : [...current, destination];
    setFilters({
      ...filters,
      destinations: updated,
    });
  };

  const handleActivityToggle = (activity: TourActivity) => {
    const current = filters.activities || [];
    const updated = current.includes(activity)
      ? current.filter((a) => a !== activity)
      : [...current, activity];
    setFilters({
      ...filters,
      activities: updated,
    });
  };

  const clearAllFilters = () => {
    setFilters({
      category: "all",
      location: "all",
      priceRange: "all",
      startCity: "all",
      destinations: [],
      activities: [],
    });
  };

  const getCurrentDuration = () => {
    if (filters.minDuration === undefined && filters.maxDuration === undefined) return "all";
    const option = DURATION_OPTIONS.find(
      (o) => o.min === filters.minDuration && o.max === filters.maxDuration
    );
    return option?.value || "all";
  };

  const hasActiveFilters =
    filters.category !== "all" ||
    filters.location !== "all" ||
    filters.priceRange !== "all" ||
    filters.startCity !== "all" ||
    (filters.destinations && filters.destinations.length > 0) ||
    (filters.activities && filters.activities.length > 0) ||
    filters.minDuration !== undefined ||
    filters.maxDuration !== undefined;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-cyan-600 hover:text-cyan-700 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-6 p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
        <p className="text-sm text-cyan-900 dark:text-cyan-100">
          Showing <strong>{filteredCount}</strong> of <strong>{totalCount}</strong> tours
        </p>
      </div>

      {/* Start City Filter */}
      <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
          Departure City
        </label>
        <select
          value={filters.startCity}
          onChange={(e) => handleFilterChange("startCity", e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          {START_CITIES.map((city) => (
            <option key={city.value} value={city.value}>
              {city.label}
            </option>
          ))}
        </select>
      </div>

      {/* Category Filter */}
      <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
          Tour Type
        </label>
        <div className="space-y-2">
          {[
            { value: "all", label: "All Types" },
            { value: "cruise", label: "Cruises" },
            { value: "day-trip", label: "Day Trips" },
            { value: "multi-day", label: "Multi-Day Tours" },
          ].map((option) => (
            <label key={option.value} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="category"
                value={option.value}
                checked={filters.category === option.value}
                onChange={(e) => handleFilterChange("category", e.target.value)}
                className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
              />
              <span className="ml-3 text-gray-700 dark:text-gray-300">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Duration Filter */}
      <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
          Duration
        </label>
        <div className="space-y-2">
          {DURATION_OPTIONS.map((option) => (
            <label key={option.value} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="duration"
                value={option.value}
                checked={getCurrentDuration() === option.value}
                onChange={(e) => handleDurationChange(e.target.value)}
                className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
              />
              <span className="ml-3 text-gray-700 dark:text-gray-300">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Destinations Filter (Multi-select checkboxes) */}
      <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
          Destinations
          {filters.destinations && filters.destinations.length > 0 && (
            <span className="ml-2 text-xs text-cyan-600 font-normal">
              ({filters.destinations.length} selected)
            </span>
          )}
        </label>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
          {DESTINATIONS.map((dest) => (
            <label key={dest.value} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.destinations?.includes(dest.value) || false}
                onChange={() => handleDestinationToggle(dest.value)}
                className="w-4 h-4 text-cyan-600 rounded focus:ring-cyan-500"
              />
              <span className="ml-3 text-gray-700 dark:text-gray-300 text-sm">{dest.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Activities Filter (Multi-select checkboxes) */}
      <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
          Activities
          {filters.activities && filters.activities.length > 0 && (
            <span className="ml-2 text-xs text-cyan-600 font-normal">
              ({filters.activities.length} selected)
            </span>
          )}
        </label>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
          {ACTIVITIES.map((activity) => (
            <label key={activity.value} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.activities?.includes(activity.value) || false}
                onChange={() => handleActivityToggle(activity.value)}
                className="w-4 h-4 text-cyan-600 rounded focus:ring-cyan-500"
              />
              <span className="ml-3 text-gray-700 dark:text-gray-300 text-sm">{activity.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
          Price Range (USD)
        </label>
        <div className="space-y-2">
          {[
            { value: "all", label: "All Prices" },
            { value: "0-100", label: "Under $100" },
            { value: "100-200", label: "$100 - $200" },
            { value: "200-400", label: "$200 - $400" },
            { value: "400+", label: "$400+" },
          ].map((option) => (
            <label key={option.value} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="priceRange"
                value={option.value}
                checked={filters.priceRange === option.value}
                onChange={(e) => handleFilterChange("priceRange", e.target.value)}
                className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
              />
              <span className="ml-3 text-gray-700 dark:text-gray-300">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Help Section */}
      <div className="p-4 bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20 rounded-lg">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
          Need Help Choosing?
        </h4>
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
          Our travel experts can help you find the perfect tour.
        </p>
        <a
          href="mailto:help@vietnamtravel.help"
          className="block text-center w-full px-4 py-2 bg-cyan-600 text-white text-sm font-medium rounded-lg hover:bg-cyan-700 transition-colors"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}
