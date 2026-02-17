"use client";

import type { TourFilters } from "@/types/tours";

interface TourFiltersProps {
  filters: TourFilters;
  setFilters: (filters: TourFilters) => void;
  totalCount: number;
  filteredCount: number;
}

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

  const clearAllFilters = () => {
    setFilters({
      category: "all",
      location: "all",
      priceRange: "all",
    });
  };

  const hasActiveFilters =
    filters.category !== "all" ||
    filters.location !== "all" ||
    filters.priceRange !== "all";

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Filters</h3>
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
      <div className="mb-6 p-3 bg-cyan-50 rounded-lg">
        <p className="text-sm text-cyan-900">
          Showing <strong>{filteredCount}</strong> of <strong>{totalCount}</strong> tours
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Tour Type
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="category"
              value="all"
              checked={filters.category === "all"}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
            />
            <span className="ml-3 text-gray-700">All Types</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="category"
              value="cruise"
              checked={filters.category === "cruise"}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
            />
            <span className="ml-3 text-gray-700">Cruises</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="category"
              value="day-trip"
              checked={filters.category === "day-trip"}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
            />
            <span className="ml-3 text-gray-700">Day Trips</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="category"
              value="multi-day"
              checked={filters.category === "multi-day"}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
            />
            <span className="ml-3 text-gray-700">Multi-Day Tours</span>
          </label>
        </div>
      </div>

      {/* Location Filter */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Location
        </label>
        <select
          value={filters.location}
          onChange={(e) => handleFilterChange("location", e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        >
          <option value="all">All Locations</option>
          <option value="halong">Halong Bay</option>
          <option value="lan ha">Lan Ha Bay</option>
          <option value="bai tu long">Bai Tu Long Bay</option>
          <option value="mekong">Mekong Delta</option>
          <option value="cambodia">Cambodia - Vietnam</option>
        </select>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Price Range (USD)
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="priceRange"
              value="all"
              checked={filters.priceRange === "all"}
              onChange={(e) => handleFilterChange("priceRange", e.target.value)}
              className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
            />
            <span className="ml-3 text-gray-700">All Prices</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="priceRange"
              value="0-100"
              checked={filters.priceRange === "0-100"}
              onChange={(e) => handleFilterChange("priceRange", e.target.value)}
              className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
            />
            <span className="ml-3 text-gray-700">Under $100</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="priceRange"
              value="100-200"
              checked={filters.priceRange === "100-200"}
              onChange={(e) => handleFilterChange("priceRange", e.target.value)}
              className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
            />
            <span className="ml-3 text-gray-700">$100 - $200</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="priceRange"
              value="200-400"
              checked={filters.priceRange === "200-400"}
              onChange={(e) => handleFilterChange("priceRange", e.target.value)}
              className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
            />
            <span className="ml-3 text-gray-700">$200 - $400</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="priceRange"
              value="400+"
              checked={filters.priceRange === "400+"}
              onChange={(e) => handleFilterChange("priceRange", e.target.value)}
              className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
            />
            <span className="ml-3 text-gray-700">$400+</span>
          </label>
        </div>
      </div>

      {/* Help Section */}
      <div className="p-4 bg-gradient-to-br from-cyan-50 to-teal-50 rounded-lg">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">
          Need Help Choosing?
        </h4>
        <p className="text-xs text-gray-600 mb-3">
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
