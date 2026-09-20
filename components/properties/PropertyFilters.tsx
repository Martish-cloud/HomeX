"use client";

import React from "react";
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  RotateCcw,
  Check,
  Building,
  Home,
  MapPin,
} from "lucide-react";
import { FilterState, PropertyCategoryType, City } from "@/types";
import { CITIES } from "@/components/layout/Header";

interface PropertyFiltersProps {
  filters: FilterState;
  onChange: (newFilters: Partial<FilterState>) => void;
  onReset: () => void;
  totalResults: number;
}

const CATEGORIES_LIST: (PropertyCategoryType | "All")[] = [
  "All",
  "Apartments",
  "Villas",
  "Plots",
  "Commercial",
  "Luxury",
];

const BHK_OPTIONS = ["All", "1", "2", "3", "4", "5+"];

const AMENITIES_LIST = [
  "Private Swimming Pool",
  "Home Automation",
  "Landscaped Garden",
  "Gym & Wellness Suite",
  "24/7 Security",
  "EV Fast Chargers",
  "Solar Power Battery Backup",
  "Clubhouse",
];

export function PropertyFilters({
  filters,
  onChange,
  onReset,
  totalResults,
}: PropertyFiltersProps) {
  const toggleAmenity = (amenity: string) => {
    const current = filters.amenities || [];
    const updated = current.includes(amenity)
      ? current.filter((a) => a !== amenity)
      : [...current, amenity];
    onChange({ amenities: updated });
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-sm mb-8 space-y-6">
      {/* Top Row: Search input + View Switcher + Total Results */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Keyword Search */}
        <div className="relative w-full lg:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onChange({ search: e.target.value })}
            placeholder="Search by neighborhood, project name..."
            className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm font-medium rounded-full border border-slate-200 focus:outline-none focus:border-brand-blue bg-slate-50/50"
          />
        </div>

        {/* Categories Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-1 sm:pb-0">
          {CATEGORIES_LIST.map((cat) => {
            const isActive = filters.propertyType === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onChange({ propertyType: cat })}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                  isActive
                    ? "bg-brand-blue text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* View Mode & Sort */}
        <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
          <select
            value={filters.sortBy}
            onChange={(e) =>
              onChange({ sortBy: e.target.value as FilterState["sortBy"] })
            }
            className="px-3.5 py-2 rounded-full border border-slate-200 text-xs font-semibold text-brand-navy focus:outline-none focus:border-brand-blue bg-white"
          >
            <option value="popular">Sort: Most Popular</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>

          {/* Grid vs List View */}
          <div className="flex items-center bg-slate-100 p-1 rounded-full border border-slate-200">
            <button
              type="button"
              onClick={() => onChange({ viewMode: "grid" })}
              className={`p-1.5 rounded-full transition-colors ${
                filters.viewMode === "grid"
                  ? "bg-white text-brand-blue shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onChange({ viewMode: "list" })}
              className={`p-1.5 rounded-full transition-colors ${
                filters.viewMode === "list"
                  ? "bg-white text-brand-blue shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Second Row: Detailed Filters (City, BHK, Status, Amenities) */}
      <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* City Filter */}
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
            Metropolitan Hub
          </label>
          <select
            value={filters.city}
            onChange={(e) => onChange({ city: e.target.value as City | "All" })}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-brand-blue"
          >
            <option value="All">All Cities</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Bedrooms BHK */}
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
            Bedrooms (BHK)
          </label>
          <div className="flex items-center gap-1.5">
            {BHK_OPTIONS.map((bhk) => {
              const isActive = filters.bedrooms === bhk;
              return (
                <button
                  key={bhk}
                  type="button"
                  onClick={() => onChange({ bedrooms: bhk })}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                    isActive
                      ? "border-brand-blue bg-brand-blue-light text-brand-blue"
                      : "border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {bhk}
                </button>
              );
            })}
          </div>
        </div>

        {/* Possession Status */}
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
            Possession Status
          </label>
          <select
            value={filters.possession}
            onChange={(e) => onChange({ possession: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-brand-blue"
          >
            <option value="All">All Statuses</option>
            <option value="Ready to Move">Ready to Move</option>
            <option value="Under Construction">Under Construction</option>
          </select>
        </div>

        {/* Reset Filter Button & Result Count */}
        <div className="flex items-end justify-between gap-3">
          <div>
            <span className="text-xs text-slate-400 block font-medium">Found</span>
            <span className="text-sm font-extrabold text-brand-navy">
              {totalResults} {totalResults === 1 ? "Property" : "Properties"}
            </span>
          </div>

          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 hover:text-brand-blue transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
}
