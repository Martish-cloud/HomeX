"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { PropertyFilters } from "@/components/properties/PropertyFilters";
import { PropertyDetailModal } from "@/components/properties/PropertyDetailModal";
import { ScheduleVisitModal } from "@/components/shared/ScheduleVisitModal";
import { ContactAgentModal } from "@/components/shared/ContactAgentModal";
import { ListPropertyModal } from "@/components/shared/ListPropertyModal";
import { FavoritesDrawer } from "@/components/shared/FavoritesDrawer";
import { PROPERTIES } from "@/data/properties";
import { Property, City, FilterState, Agent } from "@/types";
import { Building2, Sparkles, SlidersHorizontal } from "lucide-react";

function PropertiesContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as "Buy" | "Rent" | "Sell") || "Buy";
  const initialCategory = searchParams.get("category") || "All";
  const initialCity = (searchParams.get("city") as City) || "All";

  const [currentCity, setCurrentCity] = useState<City>("Bengaluru");
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    city: initialCity,
    propertyType: initialCategory,
    tab: initialTab,
    priceRange: [1000000, 500000000],
    bedrooms: "All",
    possession: "All",
    furnishing: "All",
    amenities: [],
    sortBy: "popular",
    viewMode: "grid",
  });

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactAgent, setContactAgent] = useState<Agent | null>(null);
  const [isListPropertyOpen, setIsListPropertyOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  // Filter properties
  const filteredProperties = PROPERTIES.filter((prop) => {
    if (filters.city !== "All" && prop.city !== filters.city) return false;
    if (filters.propertyType !== "All" && prop.type !== filters.propertyType) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const match =
        prop.title.toLowerCase().includes(q) ||
        prop.locality.toLowerCase().includes(q) ||
        prop.location.toLowerCase().includes(q) ||
        prop.type.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (filters.bedrooms !== "All") {
      if (filters.bedrooms === "5+") {
        if (prop.bedrooms < 5) return false;
      } else {
        if (prop.bedrooms !== parseInt(filters.bedrooms)) return false;
      }
    }
    if (
      filters.possession !== "All" &&
      prop.specifications.possessionStatus !== filters.possession
    ) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    if (filters.sortBy === "price-asc") return a.priceNumeric - b.priceNumeric;
    if (filters.sortBy === "price-desc") return b.priceNumeric - a.priceNumeric;
    if (filters.sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header
        currentCity={currentCity}
        onSelectCity={(c) => {
          setCurrentCity(c);
          setFilters((prev) => ({ ...prev, city: c }));
        }}
        onOpenListProperty={() => setIsListPropertyOpen(true)}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
      />

      <main className="flex-1 pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Page Heading */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-light text-brand-blue text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified Property Directory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            Explore Properties for Sale & Rent
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Discover verified apartments, luxury villas, commercial developments, and plots across top Indian cities.
          </p>
        </div>

        {/* Filters */}
        <PropertyFilters
          filters={filters}
          onChange={(newFilters) => setFilters((prev) => ({ ...prev, ...newFilters }))}
          onReset={() =>
            setFilters({
              search: "",
              city: "All",
              propertyType: "All",
              tab: "Buy",
              priceRange: [1000000, 500000000],
              bedrooms: "All",
              possession: "All",
              furnishing: "All",
              amenities: [],
              sortBy: "popular",
              viewMode: filters.viewMode,
            })
          }
          totalResults={filteredProperties.length}
        />

        {/* Results Grid */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-100 p-8">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-brand-navy mb-1">
              No properties match your current filters
            </h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto mb-5">
              Try resetting your filters or switching city to view all available listings.
            </p>
            <button
              type="button"
              onClick={() =>
                setFilters({
                  search: "",
                  city: "All",
                  propertyType: "All",
                  tab: "Buy",
                  priceRange: [1000000, 500000000],
                  bedrooms: "All",
                  possession: "All",
                  furnishing: "All",
                  amenities: [],
                  sortBy: "popular",
                  viewMode: "grid",
                })
              }
              className="px-6 py-2.5 rounded-full bg-brand-blue text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            className={
              filters.viewMode === "list"
                ? "flex flex-col gap-4"
                : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            }
          >
            {filteredProperties.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                onSelect={(p) => {
                  setSelectedProperty(p);
                  setIsDetailModalOpen(true);
                }}
                onScheduleVisit={(p) => {
                  setSelectedProperty(p);
                  setIsScheduleModalOpen(true);
                }}
                viewMode={filters.viewMode}
              />
            ))}
          </div>
        )}
      </main>

      <Footer onOpenListProperty={() => setIsListPropertyOpen(true)} />

      {/* Modals */}
      <PropertyDetailModal
        property={selectedProperty}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onScheduleVisit={(prop) => {
          setSelectedProperty(prop);
          setIsDetailModalOpen(false);
          setIsScheduleModalOpen(true);
        }}
        onContactAgent={(prop) => {
          setSelectedProperty(prop);
          setContactAgent(prop.agent);
          setIsDetailModalOpen(false);
          setIsContactModalOpen(true);
        }}
      />

      <ScheduleVisitModal
        property={selectedProperty}
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
      />

      <ContactAgentModal
        agent={contactAgent}
        property={selectedProperty}
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      <ListPropertyModal
        isOpen={isListPropertyOpen}
        onClose={() => setIsListPropertyOpen(false)}
      />

      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        onSelectProperty={(p) => {
          setSelectedProperty(p);
          setIsDetailModalOpen(true);
        }}
      />
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white text-brand-navy">
          <div className="animate-spin w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full" />
        </div>
      }
    >
      <PropertiesContent />
    </Suspense>
  );
}
