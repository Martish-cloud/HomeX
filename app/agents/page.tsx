"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AGENTS } from "@/data/agents";
import { Agent, City } from "@/types";
import {
  ShieldCheck,
  Star,
  Phone,
  Mail,
  MessageSquare,
  Award,
  Sparkles,
} from "lucide-react";
import { ContactAgentModal } from "@/components/shared/ContactAgentModal";
import { ListPropertyModal } from "@/components/shared/ListPropertyModal";
import { FavoritesDrawer } from "@/components/shared/FavoritesDrawer";

export default function AgentsPage() {
  const [currentCity, setCurrentCity] = useState<City>("Bengaluru");
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
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
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-light text-brand-blue text-xs font-bold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Advisory Network</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            Meet Our Top Real Estate Advisors
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Every HomeX advisor is RERA-licensed with verified track records in ultra-luxury estates, gated communities, and high-yield commercial investments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {AGENTS.map((agent) => (
            <div
              key={agent.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row gap-6 group"
            >
              <div className="relative w-full sm:w-44 h-52 sm:h-auto rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                <img
                  src={agent.photo}
                  alt={agent.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-brand-navy text-xs font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{agent.rating}</span>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-brand-blue uppercase tracking-wider mb-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>RERA Certified</span>
                  </div>

                  <h2 className="text-xl font-bold text-brand-navy group-hover:text-brand-blue transition-colors">
                    {agent.name}
                  </h2>
                  <p className="text-xs font-semibold text-slate-500 mb-2">
                    {agent.role}
                  </p>
                  <p className="text-xs font-mono text-slate-400 mb-3 truncate">
                    RERA: {agent.reraId}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {agent.bio}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {agent.languages.map((lang) => (
                      <span
                        key={lang}
                        className="text-[11px] font-semibold bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-md"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-base font-black text-brand-navy">
                      {agent.propertiesSold}+
                    </span>
                    <span className="text-[11px] text-slate-400 block font-medium">
                      Transactions Closed
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedAgent(agent);
                      setIsContactOpen(true);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-bold shadow-md shadow-brand-blue/20 transition-all"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Enquire Directly</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer onOpenListProperty={() => setIsListPropertyOpen(true)} />

      <ContactAgentModal
        agent={selectedAgent}
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
      <ListPropertyModal
        isOpen={isListPropertyOpen}
        onClose={() => setIsListPropertyOpen(false)}
      />
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        onSelectProperty={() => {}}
      />
    </div>
  );
}
