"use client";

import React, { useState } from "react";
import { X, Check, Building, ArrowRight, ArrowLeft, Sparkles, CheckCircle2, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CITIES } from "@/components/layout/Header";
import { City, PropertyCategoryType } from "@/types";

interface ListPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ListPropertyModal({ isOpen, onClose }: ListPropertyModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [listingId, setListingId] = useState("");

  // Form states
  const [listingIntent, setListingIntent] = useState<"Sell" | "Rent">("Sell");
  const [propertyType, setPropertyType] = useState<PropertyCategoryType>("Apartments");
  const [city, setCity] = useState<City>("Bengaluru");
  const [locality, setLocality] = useState("");
  const [societyName, setSocietyName] = useState("");

  const [bedrooms, setBedrooms] = useState("3");
  const [bathrooms, setBathrooms] = useState("3");
  const [area, setArea] = useState("1850");
  const [price, setPrice] = useState("22500000"); // 2.25 Cr
  const [furnishing, setFurnishing] = useState("Semi-Furnished");

  const [ownerName, setOwnerName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `HX-${Math.floor(100000 + Math.random() * 900000)}`;
    setListingId(generatedId);
    setIsSubmitted(true);

    // Try firing confetti if available
    try {
      import("canvas-confetti").then((confetti) => {
        confetti.default({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      });
    } catch {
      // ignore
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setStep(1);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-navy/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
        <div className="fixed inset-0" onClick={handleReset} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-3xl shadow-2xl border border-slate-200/80 w-full max-w-2xl overflow-hidden z-10"
        >
          {/* Header */}
          <div className="px-6 sm:px-8 py-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-blue-light text-brand-blue flex items-center justify-center">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-brand-navy">
                  List Your Property on HomeX
                </h3>
                <p className="text-xs text-slate-400">
                  Connect with over 100,000+ verified high-intent buyers
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper (if not submitted) */}
          {!isSubmitted && (
            <div className="px-6 sm:px-8 pt-4 pb-2">
              <div className="flex items-center justify-between">
                {[
                  { num: 1, title: "Basic Info" },
                  { num: 2, title: "Property Specs" },
                  { num: 3, title: "Contact Details" },
                ].map((s) => (
                  <div key={s.num} className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                        step === s.num
                          ? "bg-brand-blue text-white shadow-sm"
                          : step > s.num
                          ? "bg-emerald-500 text-white"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {step > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
                    </div>
                    <span className="text-xs font-semibold text-slate-600 hidden sm:inline">
                      {s.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-6 sm:p-8">
            {isSubmitted ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h4 className="text-2xl font-black text-brand-navy mb-2">
                  Listing Submitted Successfully!
                </h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto mb-5">
                  Your property reference ID is{" "}
                  <strong className="text-brand-blue font-mono font-bold">
                    {listingId}
                  </strong>
                  . Our luxury acquisition specialist will verify your title deeds and publish it live within 2 hours.
                </p>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 max-w-sm mx-auto text-xs text-slate-500 mb-6 text-left space-y-1">
                  <div>• Dedicated Relationship Manager assigned</div>
                  <div>• Complimentary high-res 3D virtual tour shoot</div>
                  <div>• Zero upfront listing fee</div>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-8 py-3 rounded-full bg-brand-blue hover:bg-brand-blue-hover text-white text-sm font-bold shadow-md"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                        I want to:
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {(["Sell", "Rent"] as const).map((intent) => (
                          <button
                            key={intent}
                            type="button"
                            onClick={() => setListingIntent(intent)}
                            className={`py-3 rounded-xl border text-sm font-bold transition-all ${
                              listingIntent === intent
                                ? "border-brand-blue bg-brand-blue text-white shadow-sm"
                                : "border-slate-200 text-slate-700 hover:border-brand-blue/40"
                            }`}
                          >
                            {intent === "Sell" ? "Sell Property" : "Rent Out"}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                        Property Category:
                      </label>
                      <div className="grid grid-cols-3 gap-2.5">
                        {(
                          ["Apartments", "Villas", "Plots", "Commercial", "Luxury"] as PropertyCategoryType[]
                        ).map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setPropertyType(type)}
                            className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
                              propertyType === type
                                ? "border-brand-blue bg-brand-blue-light text-brand-blue"
                                : "border-slate-200 text-slate-600 hover:border-slate-300"
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-600 block mb-1">
                          City
                        </label>
                        <select
                          value={city}
                          onChange={(e) => setCity(e.target.value as City)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-brand-blue"
                        >
                          {CITIES.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-600 block mb-1">
                          Locality / Neighborhood
                        </label>
                        <input
                          type="text"
                          required
                          value={locality}
                          onChange={(e) => setLocality(e.target.value)}
                          placeholder="e.g. Indiranagar, Sadashivanagar"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-brand-blue"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-600 block mb-1">
                        Society / Project Name
                      </label>
                      <input
                        type="text"
                        required
                        value={societyName}
                        onChange={(e) => setSocietyName(e.target.value)}
                        placeholder="e.g. Prestige Willow Tree"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-brand-blue"
                      />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-600 block mb-1">
                          Bedrooms (BHK)
                        </label>
                        <select
                          value={bedrooms}
                          onChange={(e) => setBedrooms(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-brand-blue"
                        >
                          {["1", "2", "3", "4", "5+"].map((b) => (
                            <option key={b} value={b}>
                              {b} BHK
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-600 block mb-1">
                          Bathrooms
                        </label>
                        <select
                          value={bathrooms}
                          onChange={(e) => setBathrooms(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-brand-blue"
                        >
                          {["1", "2", "3", "4", "5+"].map((b) => (
                            <option key={b} value={b}>
                              {b} Baths
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-600 block mb-1">
                          Super Built-Up Area (sq.ft)
                        </label>
                        <input
                          type="number"
                          required
                          value={area}
                          onChange={(e) => setArea(e.target.value)}
                          placeholder="e.g. 1850"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-brand-blue"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-600 block mb-1">
                          Expected Price (₹ in Rupees)
                        </label>
                        <input
                          type="number"
                          required
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          placeholder="e.g. 15000000"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-brand-blue"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-600 block mb-1">
                        Furnishing Status
                      </label>
                      <div className="grid grid-cols-3 gap-2.5">
                        {["Fully Furnished", "Semi-Furnished", "Unfurnished"].map((f) => (
                          <button
                            key={f}
                            type="button"
                            onClick={() => setFurnishing(f)}
                            className={`py-2.5 px-2 text-xs font-semibold rounded-xl border transition-colors ${
                              furnishing === f
                                ? "border-brand-blue bg-brand-blue-light text-brand-blue"
                                : "border-slate-200 text-slate-600"
                            }`}
                          >
                            {f}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div>
                      <label className="text-xs font-semibold text-slate-600 block mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                        placeholder="e.g. Rajesh Malhotra"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-brand-blue"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-600 block mb-1">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={ownerPhone}
                        onChange={(e) => setOwnerPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-brand-blue"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-600 block mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={ownerEmail}
                        onChange={(e) => setOwnerEmail(e.target.value)}
                        placeholder="rajesh@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-brand-blue"
                      />
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2 text-xs text-slate-500">
                      <ShieldAlert className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                      <span>
                        HomeX is compliant with the Real Estate (Regulation and Development) Act. We never share your phone number with unverified third parties.
                      </span>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step + 1)}
                      className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-bold shadow-md"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-8 py-2.5 rounded-full bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-bold shadow-md shadow-brand-blue/30"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Publish Listing</span>
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
