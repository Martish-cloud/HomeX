"use client";

import React from "react";
import { X, Heart, Trash2, ArrowUpRight, Bed, Bath, Maximize } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useFavorites } from "@/hooks/useFavorites";
import { PROPERTIES } from "@/data/properties";
import { Property } from "@/types";

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProperty: (property: Property) => void;
}

export function FavoritesDrawer({
  isOpen,
  onClose,
  onSelectProperty,
}: FavoritesDrawerProps) {
  const { favorites, toggleFavorite } = useFavorites();

  const savedProperties = PROPERTIES.filter((p) => favorites.includes(p.id));

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-brand-navy/50 backdrop-blur-sm"
        />

        {/* Slide-over Panel */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between"
          >
            {/* Drawer Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
                  <Heart className="w-4 h-4 fill-red-500" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-brand-navy">
                    Saved Properties
                  </h3>
                  <p className="text-xs text-slate-400">
                    {savedProperties.length} properties shortlisted
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {savedProperties.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 mx-auto mb-4">
                    <Heart className="w-8 h-8" />
                  </div>
                  <h4 className="text-base font-bold text-brand-navy mb-1">
                    No properties saved yet
                  </h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto mb-6">
                    Click the heart icon on any property card to save it for quick comparison and review later.
                  </p>
                </div>
              ) : (
                savedProperties.map((prop) => (
                  <div
                    key={prop.id}
                    className="p-3.5 rounded-2xl border border-slate-100 hover:border-brand-blue/30 transition-all bg-white shadow-sm flex gap-3.5 group cursor-pointer"
                    onClick={() => {
                      onSelectProperty(prop);
                      onClose();
                    }}
                  >
                    <img
                      src={prop.images[0]}
                      alt={prop.title}
                      className="w-24 h-24 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-brand-blue">
                            {prop.type}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(prop.id);
                            }}
                            className="text-slate-400 hover:text-red-500 p-1"
                            title="Remove from saved"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <h4 className="text-sm font-bold text-brand-navy line-clamp-1 group-hover:text-brand-blue transition-colors">
                          {prop.title}
                        </h4>
                        <p className="text-xs text-slate-400 truncate">
                          {prop.locality}, {prop.city}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-50">
                        <span className="text-sm font-extrabold text-brand-navy">
                          {prop.price}
                        </span>
                        <span className="text-xs font-semibold text-brand-blue flex items-center gap-0.5">
                          View <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {savedProperties.length > 0 && (
              <div className="p-6 border-t border-slate-100 bg-slate-50">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-3 rounded-full bg-brand-blue hover:bg-brand-blue-hover text-white text-sm font-bold shadow-md shadow-brand-blue/20 transition-all"
                >
                  Continue Browsing
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
