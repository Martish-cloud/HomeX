"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { PropertyDetailModal } from "@/components/properties/PropertyDetailModal";
import { ScheduleVisitModal } from "@/components/shared/ScheduleVisitModal";
import { ContactAgentModal } from "@/components/shared/ContactAgentModal";
import { ListPropertyModal } from "@/components/shared/ListPropertyModal";
import { FavoritesDrawer } from "@/components/shared/FavoritesDrawer";
import { useFavorites } from "@/hooks/useFavorites";
import { PROPERTIES } from "@/data/properties";
import { Property, City, Agent } from "@/types";
import { Heart, ArrowRight, Building2 } from "lucide-react";

export default function SavedPage() {
  const [currentCity, setCurrentCity] = useState<City>("Bengaluru");
  const { favorites } = useFavorites();
  const savedProperties = PROPERTIES.filter((p) => favorites.includes(p.id));

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactAgent, setContactAgent] = useState<Agent | null>(null);
  const [isListPropertyOpen, setIsListPropertyOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header
        currentCity={currentCity}
        onSelectCity={setCurrentCity}
        onOpenListProperty={() => setIsListPropertyOpen(true)}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
      />

      <main className="flex-1 pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-500 text-xs font-bold mb-2 border border-red-100">
            <Heart className="w-3.5 h-3.5 fill-red-500" />
            <span>Shortlisted Portfolio</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            Saved Properties ({savedProperties.length})
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Properties you've bookmarked for comparative analysis, private viewings, and advisor discussions.
          </p>
        </div>

        {savedProperties.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-100 p-8 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-white text-red-400 flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-brand-navy mb-1">
              Your saved properties list is empty
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              Browse through our collection of premium residences and tap the heart icon on any listing to bookmark it here.
            </p>
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-bold shadow-md shadow-brand-blue/20"
            >
              <span>Explore Verified Properties</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProperties.map((prop) => (
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
