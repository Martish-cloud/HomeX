"use client";

import React, { useEffect, useState, useRef } from "react";
import { Users, Home, Award, Star } from "lucide-react";
import { motion, useInView } from "framer-motion";

interface StatItem {
  icon: React.ElementType;
  value: string;
  targetNumber: number;
  suffix: string;
  prefix?: string;
  label: string;
}

const STATS: StatItem[] = [
  {
    icon: Users,
    value: "10K+",
    targetNumber: 10,
    suffix: "K+",
    label: "Happy Families",
  },
  {
    icon: Home,
    value: "25K+",
    targetNumber: 25,
    suffix: "K+",
    label: "Properties Listed",
  },
  {
    icon: Award,
    value: "500+",
    targetNumber: 500,
    suffix: "+",
    label: "Verified Agents",
  },
  {
    icon: Star,
    value: "4.8/5",
    targetNumber: 4.8,
    suffix: "/5",
    label: "Customer Satisfaction",
  },
];

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="relative z-20 -mt-8 sm:-mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        ref={ref}
        className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/50 p-4 sm:p-6 lg:p-8"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x divide-slate-100">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex items-center gap-3 sm:gap-4 px-2 lg:px-8 group"
              >
                {/* Blue Outline Icon Container */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-brand-blue-light/70 text-brand-blue flex items-center justify-center shrink-0 border border-brand-blue/20 group-hover:scale-110 group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.8]" />
                </div>

                {/* Metric Texts */}
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-brand-navy tracking-tight leading-none">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
