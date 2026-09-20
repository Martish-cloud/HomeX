"use client";

import React, { useState } from "react";
import {
  Heart,
  Bed,
  Bath,
  Maximize,
  MapPin,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { Property } from "@/types";
import { useFavorites } from "@/hooks/useFavorites";

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
  onScheduleVisit?: (property: Property) => void;
  viewMode?: "grid" | "list";
}

export function PropertyCard({
  property,
  onSelect,
  onScheduleVisit,
  viewMode = "grid",
}: PropertyCardProps) {
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(property.id);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIdx((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(property.id);
  };

  if (viewMode === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        onClick={() => onSelect(property)}
        className="group cursor-pointer bg-white rounded-2xl border border-slate-200/80 hover:border-brand-blue/40 shadow-sm hover:shadow-xl transition-all duration-300 p-4 flex flex-col md:flex-row gap-5"
      >
        {/* Image Carousel */}
        <div className="relative w-full md:w-80 h-56 rounded-xl overflow-hidden shrink-0 bg-slate-100">
          <img
            src={property.images[currentImgIdx]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {/* Tag & Verified Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
            {property.verified && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-white/95 text-brand-blue backdrop-blur-sm shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-blue fill-brand-blue/20" />
                Verified
              </span>
            )}
            {property.tag && (
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-brand-navy/90 text-white backdrop-blur-sm shadow-sm">
                {property.tag}
              </span>
            )}
          </div>

          {/* Favorite Button */}
          <button
            type="button"
            onClick={handleFavoriteClick}
            aria-label="Save to favorites"
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm text-slate-700 hover:text-red-500 hover:scale-110 active:scale-90 transition-all shadow-sm z-10"
          >
            <Heart
              className={`w-4 h-4 ${
                favorited ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </button>

          {/* Carousel Arrows */}
          {property.images.length > 1 && (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">
                {property.type} • {property.listingType}
              </span>
              <div className="text-right">
                <span className="text-2xl font-black text-brand-navy">
                  {property.price}
                </span>
                <span className="text-xs text-slate-400 ml-1">
                  ({property.pricePerSqFt})
                </span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-brand-navy group-hover:text-brand-blue transition-colors line-clamp-1 mb-1">
              {property.title}
            </h3>

            <p className="text-sm font-medium text-slate-500 flex items-center gap-1.5 mb-3">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{property.location}</span>
            </p>

            <p className="text-sm text-slate-600 line-clamp-2 mb-4 font-normal">
              {property.description}
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
              {property.bedrooms > 0 && (
                <span className="flex items-center gap-1">
                  <Bed className="w-4 h-4 text-brand-blue" />
                  {property.bedrooms} Beds
                </span>
              )}
              {property.bathrooms > 0 && (
                <span className="flex items-center gap-1">
                  <Bath className="w-4 h-4 text-brand-blue" />
                  {property.bathrooms} Baths
                </span>
              )}
              <span className="flex items-center gap-1">
                <Maximize className="w-4 h-4 text-brand-blue" />
                {property.area.toLocaleString()} {property.areaUnit}
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onScheduleVisit?.(property);
                }}
                className="px-4 py-2 rounded-full border border-slate-200 text-xs font-bold text-brand-navy hover:bg-slate-100 transition-colors"
              >
                Schedule Visit
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-full bg-brand-blue text-white text-xs font-bold hover:bg-brand-blue-hover transition-colors flex items-center gap-1 shadow-sm"
              >
                <span>View Details</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid Mode (Default)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={() => onSelect(property)}
      className="group cursor-pointer bg-white rounded-2xl border border-slate-200/80 hover:border-brand-blue/30 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
    >
      {/* Top Image Carousel */}
      <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
        <img
          src={property.images[currentImgIdx]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
          {property.verified && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-white/95 text-brand-blue backdrop-blur-sm shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-blue fill-brand-blue/20" />
              Verified
            </span>
          )}
          {property.tag && (
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-brand-navy/90 text-white backdrop-blur-sm shadow-sm">
              {property.tag}
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          type="button"
          onClick={handleFavoriteClick}
          aria-label="Save to favorites"
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm text-slate-700 hover:text-red-500 hover:scale-110 active:scale-90 transition-all shadow-sm z-10"
        >
          <Heart
            className={`w-4 h-4 ${
              favorited ? "fill-red-500 text-red-500" : ""
            }`}
          />
        </button>

        {/* Image Navigation Arrows */}
        {property.images.length > 1 && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Dot Indicators */}
        {property.images.length > 1 && (
          <div className="absolute bottom-2.5 left-0 right-0 flex justify-center gap-1.5 z-10 pointer-events-none">
            {property.images.map((_, i) => (
              <span
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === currentImgIdx ? "bg-white w-3" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">
              {property.type}
            </span>
            <span className="text-xs font-semibold text-slate-400">
              {property.specifications.possessionStatus}
            </span>
          </div>

          <h3 className="text-lg font-bold text-brand-navy group-hover:text-brand-blue transition-colors line-clamp-1 mb-1">
            {property.title}
          </h3>

          <p className="text-xs sm:text-sm font-medium text-slate-500 flex items-center gap-1 mb-3.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{property.location}</span>
          </p>

          {/* Specs Pill Strip */}
          <div className="flex items-center gap-3 py-2.5 border-y border-slate-100 text-xs font-semibold text-slate-600">
            {property.bedrooms > 0 && (
              <div className="flex items-center gap-1">
                <Bed className="w-4 h-4 text-brand-blue" />
                <span>{property.bedrooms} Beds</span>
              </div>
            )}
            {property.bathrooms > 0 && (
              <div className="flex items-center gap-1">
                <Bath className="w-4 h-4 text-brand-blue" />
                <span>{property.bathrooms} Baths</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Maximize className="w-4 h-4 text-brand-blue" />
              <span>{property.area.toLocaleString()} {property.areaUnit}</span>
            </div>
          </div>
        </div>

        {/* Footer: Price & CTA */}
        <div className="mt-4 pt-1 flex items-center justify-between">
          <div>
            <div className="text-xl font-black text-brand-navy leading-tight">
              {property.price}
            </div>
            <div className="text-[11px] text-slate-400 font-medium">
              {property.pricePerSqFt}
            </div>
          </div>

          <button
            type="button"
            className="w-9 h-9 rounded-full bg-brand-blue-light text-brand-blue group-hover:bg-brand-blue group-hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
            aria-label="View property details"
          >
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
