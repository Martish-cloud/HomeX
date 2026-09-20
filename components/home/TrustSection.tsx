"use client";

import React from "react";
import { ShieldCheck, Headphones, CircleDollarSign, Handshake } from "lucide-react";
import { motion } from "framer-motion";

const TRUST_FEATURES = [
  {
    icon: ShieldCheck,
    title: "Verified Properties",
    desc: "100% genuine listings",
  },
  {
    icon: Headphones,
    title: "Expert Assistance",
    desc: "From search to settlement",
  },
  {
    icon: CircleDollarSign,
    title: "Best Deals",
    desc: "Great value, always",
  },
  {
    icon: Handshake,
    title: "Trusted by Thousands",
    desc: "Building better lives",
  },
];

export function TrustSection() {
  return (
    <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 lg:divide-x divide-slate-100">
          {TRUST_FEATURES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex items-center gap-4 px-2 lg:px-6 group"
              >
                {/* Blue Outline Icon Container */}
                <div className="w-12 h-12 rounded-2xl bg-brand-blue-light text-brand-blue flex items-center justify-center shrink-0 border border-brand-blue/15 group-hover:scale-110 group-hover:bg-brand-blue group-hover:text-white transition-all duration-300 shadow-sm">
                  <Icon className="w-6 h-6 stroke-[1.8]" />
                </div>

                {/* Text Description */}
                <div>
                  <h4 className="text-base font-bold text-brand-navy tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
