"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, MapPin, X, ArrowRight, Sparkles, Building, Home, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { City } from "@/types";
import { PROPERTIES } from "@/data/properties";

interface HeroSectionProps {
  currentCity: City;
  onSearch: (term: string, tab: "Buy" | "Rent" | "Sell" | "Projects") => void;
  onSelectProperty?: (propertyId: string) => void;
}

export function HeroSection({ currentCity, onSearch, onSelectProperty }: HeroSectionProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"Buy" | "Rent" | "Sell" | "Projects">("Buy");
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const tabs: ("Buy" | "Rent" | "Sell" | "Projects")[] = ["Buy", "Rent", "Sell", "Projects"];

  const popularSearches = [
    `2 BHK in ${currentCity}`,
    "Flats for Rent",
    "Ready to Move",
    "Upcoming Projects",
  ];

  // Suggestions filter
  const suggestions = query.trim()
    ? PROPERTIES.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.locality.toLowerCase().includes(query.toLowerCase()) ||
          p.type.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (activeTab === "Projects") {
      router.push(`/projects?search=${encodeURIComponent(query)}`);
      return;
    }
    onSearch(query, activeTab);
  };

  const handlePopularClick = (item: string) => {
    setQuery(item);
    if (item.includes("Rent")) {
      setActiveTab("Rent");
      onSearch(item, "Rent");
    } else if (item.includes("Projects")) {
      setActiveTab("Projects");
      router.push("/projects");
    } else {
      setActiveTab("Buy");
      onSearch(item, "Buy");
    }
  };

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="relative pt-24 lg:pt-28 pb-16 lg:pb-24 overflow-hidden bg-gradient-to-b from-blue-50/40 via-white to-slate-50">
      {/* Cinematic Hero Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[2.5rem] overflow-hidden border border-slate-200/80 shadow-2xl bg-white min-h-[560px] lg:min-h-[620px] flex flex-col justify-between">
          {/* Hero Background Architectural Image */}
          <div className="absolute inset-0 z-0">
            {/* High-res cinematic luxury villa at dusk with illuminated glass windows & pool */}
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=85"
              alt="HomeX Luxury Architectural Villa at Dusk"
              className="w-full h-full object-cover object-center lg:object-[center_60%] scale-100 hover:scale-105 transition-transform duration-1000 ease-out"
              fetchPriority="high"
            />
            {/* Gradient overlays to guarantee razor-sharp text readability matching reference */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent lg:w-[62%]" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-black/15" />
          </div>

          {/* Floating script badge on top right of the hero (Reference match) */}
          <div className="absolute top-6 sm:top-10 right-6 sm:right-12 z-20 hidden md:flex flex-col items-end pointer-events-none select-none drop-shadow-md">
            <div className="font-script text-3xl lg:text-4xl text-white font-bold leading-none tracking-wide text-right">
              More
              <br />
              Than
              <br />
              Just
              <br />
              Homes
            </div>
            <div className="text-white/90 text-xs lg:text-sm font-medium tracking-wide mt-2">
              We build better tomorrows
            </div>
          </div>

          {/* Hero Content (Left Overlay) */}
          <div className="relative z-10 p-6 sm:p-10 lg:p-16 max-w-2xl flex flex-col justify-center">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-3"
            >
              <span className="text-[13px] font-extrabold uppercase tracking-[0.2em] text-slate-700">
                FIND A BETTER TOMORROW
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-navy tracking-tight leading-[1.1] mb-4"
            >
              Find Your
              <br />
              <span className="text-brand-navy">Dream Home</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg font-medium text-slate-600 mb-8"
            >
              Trusted properties. Brighter futures.
            </motion.p>

            {/* Tabs: Buy | Rent | Sell | Projects */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex p-1.5 bg-white rounded-full shadow-md border border-slate-200/90 mb-5 w-fit"
            >
              {tabs.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab);
                      if (tab === "Projects") {
                        router.push("/projects");
                      }
                    }}
                    className={`relative px-5 sm:px-6 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                      isActive
                        ? "bg-brand-blue text-white shadow-sm shadow-brand-blue/30"
                        : "text-slate-600 hover:text-brand-blue"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </motion.div>

            {/* Smart Search Bar */}
            <motion.div
              ref={searchRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative w-full max-w-xl"
            >
              <form
                onSubmit={handleSearchSubmit}
                className={`relative flex items-center bg-white rounded-full border transition-all duration-200 shadow-lg ${
                  isFocused
                    ? "border-brand-blue ring-4 ring-brand-blue/15 shadow-xl"
                    : "border-slate-200/90 shadow-slate-200/60"
                } p-1.5`}
              >
                {/* Location MapPin Icon */}
                <div className="pl-3.5 pr-2 text-slate-700 flex items-center">
                  <MapPin className="w-5 h-5 text-brand-navy" />
                </div>

                {/* Input Field */}
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  placeholder="Enter location, property or keyword..."
                  className="w-full text-sm sm:text-[15px] font-medium text-brand-navy placeholder:text-slate-400 bg-transparent focus:outline-none pr-3"
                />

                {/* Clear Button */}
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="p-1 text-slate-400 hover:text-slate-600 mr-1"
                    aria-label="Clear search text"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}

                {/* Search Button */}
                <button
                  type="submit"
                  className="bg-brand-blue hover:bg-brand-blue-hover text-white text-sm font-semibold px-6 py-2.5 rounded-full shadow-md shadow-brand-blue/25 hover:shadow-lg hover:shadow-brand-blue/35 transition-all flex items-center gap-2 shrink-0 active:scale-95"
                >
                  <Search className="w-4 h-4 stroke-[2.5]" />
                  <span>Search</span>
                </button>
              </form>

              {/* Autocomplete Dropdown */}
              <AnimatePresence>
                {isFocused && suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 z-50 overflow-hidden"
                  >
                    <div className="px-4 py-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Matching Properties & Locations
                    </div>
                    {suggestions.map((prop) => (
                      <button
                        key={prop.id}
                        type="button"
                        onClick={() => {
                          setIsFocused(false);
                          setQuery(prop.title);
                          onSelectProperty?.(prop.id);
                        }}
                        className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-brand-blue-light/50 transition-colors text-left group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                            <img
                              src={prop.images[0]}
                              alt={prop.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-brand-navy group-hover:text-brand-blue transition-colors line-clamp-1">
                              {prop.title}
                            </p>
                            <p className="text-xs text-slate-500">{prop.location}</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-brand-blue">{prop.price}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Popular Searches Pills */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-6 flex flex-wrap items-center gap-2"
            >
              <span className="text-xs font-semibold text-slate-700 mr-1">
                Popular Searches:
              </span>
              {popularSearches.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handlePopularClick(item)}
                  className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm border border-white/20 transition-all duration-150 hover:scale-105 active:scale-95"
                >
                  {item}
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
