"use client";

import React from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { CATEGORIES } from "@/data/categories";
import { CategoryInfo } from "@/types";

interface CategorySectionProps {
  onSelectCategory?: (category: string) => void;
}

export function CategorySection({ onSelectCategory }: CategorySectionProps) {
  return (
    <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 5-Column Grid on Desktop, 2/3 on Tablet, 1/2 on Mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
        {CATEGORIES.map((cat, idx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            onClick={() => onSelectCategory?.(cat.name)}
            className="group cursor-pointer bg-white rounded-2xl border border-slate-200/80 p-3 sm:p-3.5 shadow-sm hover:shadow-xl hover:border-brand-blue/30 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Architectural Image Container */}
            <div className="relative aspect-[16/11] rounded-xl overflow-hidden mb-3.5 bg-slate-100">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                loading="lazy"
              />

              {/* Special map pin overlay graphic for "Plots" matching reference image */}
              {cat.id === "plots" && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-brand-blue border border-brand-blue/30 animate-pulse">
                    <MapPin className="w-6 h-6 fill-brand-blue/20 stroke-brand-blue" />
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Content & Arrow Button */}
            <div className="flex items-start justify-between gap-2 px-1 pb-1">
              <div className="pr-1">
                <h3 className="text-base font-bold text-brand-navy group-hover:text-brand-blue transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 font-medium line-clamp-2 mt-0.5 leading-snug">
                  {cat.description}
                </p>
              </div>

              {/* Circular Arrow Button (Reference matched) */}
              <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 group-hover:bg-brand-blue group-hover:text-white group-hover:border-brand-blue shrink-0 transition-all duration-200 mt-0.5 shadow-sm">
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
