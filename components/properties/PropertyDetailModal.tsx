"use client";

import React, { useState } from "react";
import {
  X,
  Heart,
  Share2,
  MapPin,
  ShieldCheck,
  Bed,
  Bath,
  Maximize,
  Calendar,
  Compass,
  Layers,
  Sparkles,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle2,
  Calculator,
  Train,
  School,
  Building,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Property } from "@/types";
import { useFavorites } from "@/hooks/useFavorites";

interface PropertyDetailModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  onScheduleVisit: (property: Property) => void;
  onContactAgent: (property: Property) => void;
}

export function PropertyDetailModal({
  property,
  isOpen,
  onClose,
  onScheduleVisit,
  onContactAgent,
}: PropertyDetailModalProps) {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const { isFavorite, toggleFavorite } = useFavorites();
  const [loanAmount, setLoanAmount] = useState(10000000); // 1 Cr default
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(20);
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen || !property) return null;

  const favorited = isFavorite(property.id);

  // Calculate EMI
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = loanTenure * 12;
  const emi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out ${property.title} in ${property.location} on HomeX!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-navy/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-3xl shadow-2xl border border-slate-200/80 w-full max-w-5xl max-h-[92vh] overflow-y-auto z-10"
        >
          {/* Top Sticky Bar */}
          <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between z-20">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-brand-blue uppercase tracking-wider bg-brand-blue-light px-2.5 py-1 rounded-full">
                {property.type}
              </span>
              {property.verified && (
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified RERA Listing
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => toggleFavorite(property.id)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-700 hover:text-red-500 transition-colors"
                aria-label="Favorite"
              >
                <Heart
                  className={`w-5 h-5 ${
                    favorited ? "fill-red-500 text-red-500" : ""
                  }`}
                />
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-700 transition-colors relative"
                aria-label="Share property"
              >
                <Share2 className="w-5 h-5" />
                {isCopied && (
                  <span className="absolute -bottom-8 right-0 bg-black text-white text-[11px] px-2 py-1 rounded whitespace-nowrap">
                    Link copied!
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-700 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            {/* Gallery */}
            <div>
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100 mb-3 shadow-sm">
                <img
                  src={property.images[selectedImageIdx] || property.images[0]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {property.images.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto pb-2">
                  {property.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImageIdx(idx)}
                      className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                        selectedImageIdx === idx
                          ? "border-brand-blue ring-2 ring-brand-blue/30 scale-105"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Title & Price Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-brand-navy tracking-tight">
                  {property.title}
                </h2>
                <p className="text-sm sm:text-base font-medium text-slate-500 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-4 h-4 text-brand-blue shrink-0" />
                  <span>{property.location}</span>
                </p>
              </div>

              <div className="sm:text-right">
                <div className="text-3xl font-black text-brand-navy">
                  {property.price}
                </div>
                <div className="text-xs font-semibold text-slate-400">
                  {property.pricePerSqFt} • Approx. EMI ₹
                  {emi.toLocaleString("en-IN")}/mo
                </div>
              </div>
            </div>

            {/* Key Specs Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-brand-blue">
                  <Bed className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-semibold">Bedrooms</div>
                  <div className="text-sm font-bold text-brand-navy">
                    {property.bedrooms > 0 ? `${property.bedrooms} BHK` : "Open Layout"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-brand-blue">
                  <Bath className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-semibold">Bathrooms</div>
                  <div className="text-sm font-bold text-brand-navy">
                    {property.bathrooms} Baths
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-brand-blue">
                  <Maximize className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-semibold">Super Built-up</div>
                  <div className="text-sm font-bold text-brand-navy">
                    {property.area.toLocaleString()} {property.areaUnit}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-brand-blue">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-semibold">Status</div>
                  <div className="text-sm font-bold text-brand-navy">
                    {property.specifications.possessionStatus}
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Specifications */}
            <div>
              <h3 className="text-lg font-bold text-brand-navy mb-4">
                Property Specifications
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-6 text-sm">
                <div>
                  <span className="text-slate-400 text-xs block">Carpet Area</span>
                  <span className="font-semibold text-brand-navy">
                    {property.specifications.carpetArea}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Facing</span>
                  <span className="font-semibold text-brand-navy">
                    {property.specifications.facing}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Floor Level</span>
                  <span className="font-semibold text-brand-navy">
                    {property.specifications.floor}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Furnishing</span>
                  <span className="font-semibold text-brand-navy">
                    {property.specifications.furnishing}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Balconies</span>
                  <span className="font-semibold text-brand-navy">
                    {property.specifications.balconies} Balconies
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Age of Property</span>
                  <span className="font-semibold text-brand-navy">
                    {property.specifications.ageOfProperty}
                  </span>
                </div>
              </div>
            </div>

            {/* Description & Features */}
            <div>
              <h3 className="text-lg font-bold text-brand-navy mb-3">About the Property</h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-5 font-normal">
                {property.description}
              </p>

              <h4 className="text-sm font-bold text-brand-navy uppercase tracking-wider mb-3">
                Key Architectural Highlights
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {property.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="text-lg font-bold text-brand-navy mb-4">
                Verified Amenities & Facilities
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {property.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-blue-light/80 text-brand-navy text-xs font-semibold border border-brand-blue/15"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            {/* Interactive EMI Calculator */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-2 mb-4">
                <Calculator className="w-5 h-5 text-brand-blue" />
                <h3 className="text-lg font-bold text-brand-navy">
                  Home Loan EMI Calculator
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-xs font-semibold text-slate-500 block mb-1">
                    Loan Amount: ₹{(loanAmount / 100000).toFixed(0)} Lakhs
                  </label>
                  <input
                    type="range"
                    min={2000000}
                    max={50000000}
                    step={500000}
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full accent-brand-blue"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 block mb-1">
                    Interest Rate: {interestRate}% p.a.
                  </label>
                  <input
                    type="range"
                    min={7.5}
                    max={12.0}
                    step={0.1}
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full accent-brand-blue"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 block mb-1">
                    Tenure: {loanTenure} Years
                  </label>
                  <input
                    type="range"
                    min={5}
                    max={30}
                    step={1}
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                    className="w-full accent-brand-blue"
                  />
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Estimated Monthly Outflow</span>
                  <span className="text-2xl font-black text-brand-blue">
                    ₹{emi.toLocaleString("en-IN")} / month
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onContactAgent(property)}
                  className="px-5 py-2 rounded-full bg-brand-navy text-white text-xs font-bold hover:bg-brand-blue transition-colors"
                >
                  Apply with Partner Banks
                </button>
              </div>
            </div>

            {/* Agent Profile & CTAs */}
            <div className="p-6 rounded-3xl bg-brand-blue-light/50 border border-brand-blue/20 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <img
                  src={property.agent.photo}
                  alt={property.agent.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md"
                />
                <div>
                  <span className="text-[11px] font-bold text-brand-blue uppercase tracking-wider">
                    Listed By Verified Advisor
                  </span>
                  <h4 className="text-base font-bold text-brand-navy">
                    {property.agent.name}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {property.agent.role} • RERA: {property.agent.reraId.slice(0, 16)}...
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => onContactAgent(property)}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-full border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Enquire Now</span>
                </button>

                <button
                  type="button"
                  onClick={() => onScheduleVisit(property)}
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-full bg-brand-blue hover:bg-brand-blue-hover text-white font-bold text-xs transition-colors shadow-md shadow-brand-blue/20 flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Site Visit</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
