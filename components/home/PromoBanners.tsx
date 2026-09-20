"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface PromoBannersProps {
  onExploreHomes?: () => void;
  onViewProjects?: () => void;
}

export function PromoBanners({ onExploreHomes, onViewProjects }: PromoBannersProps) {
  return (
    <section className="py-6 sm:py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Banner 1: Turn Spaces Into Stories */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 min-h-[260px] sm:min-h-[290px] flex items-center bg-[#E5DCCF]"
        >
          {/* Background Interior Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
              alt="Warm luxury living room interior with cozy sofa and house plants"
              className="w-full h-full object-cover object-right sm:object-center hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            {/* Soft Warm Gradient Overlay for contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#3A2D23]/80 via-[#3A2D23]/40 to-transparent sm:w-[70%]" />
          </div>

          {/* Banner Content */}
          <div className="relative z-10 p-6 sm:p-10 max-w-md">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-[1.15] mb-2 drop-shadow-sm">
              Turn Spaces
              <br />
              Into Stories
            </h3>
            <p className="text-sm sm:text-base font-medium text-white/90 mb-6 drop-shadow-sm">
              Beautiful homes. Happier lives.
            </p>
            <button
              type="button"
              onClick={onExploreHomes}
              className="inline-flex items-center gap-2 bg-white text-brand-navy hover:bg-brand-blue hover:text-white font-bold text-sm px-6 py-2.5 rounded-full shadow-lg transition-all duration-200 active:scale-95 group"
            >
              <span>Explore Homes</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Banner 2: Invest Today For a Brighter Tomorrow */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 min-h-[260px] sm:min-h-[290px] flex items-center bg-[#D6E6F5]"
        >
          {/* Background Building Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"
              alt="Modern apartment building architecture"
              className="w-full h-full object-cover object-right hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            {/* Soft Blue Gradient Overlay for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#D6E6F5] via-[#D6E6F5]/90 to-transparent sm:w-[65%]" />
          </div>

          {/* Banner Content */}
          <div className="relative z-10 p-6 sm:p-10 max-w-md">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight leading-[1.15] mb-2">
              Invest Today
              <br />
              For a Brighter Tomorrow
            </h3>
            <p className="text-sm sm:text-base font-medium text-slate-600 mb-6">
              Great locations. Greater opportunities.
            </p>
            <Link
              href="/projects"
              onClick={onViewProjects}
              className="inline-flex items-center gap-2 bg-brand-navy text-white hover:bg-brand-blue font-bold text-sm px-6 py-2.5 rounded-full shadow-lg transition-all duration-200 active:scale-95 group"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
