"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { CategorySection } from "@/components/home/CategorySection";
import { PromoBanners } from "@/components/home/PromoBanners";
import { TrustSection } from "@/components/home/TrustSection";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { PropertyFilters } from "@/components/properties/PropertyFilters";
import { PropertyDetailModal } from "@/components/properties/PropertyDetailModal";
import { ScheduleVisitModal } from "@/components/shared/ScheduleVisitModal";
import { ContactAgentModal } from "@/components/shared/ContactAgentModal";
import { ListPropertyModal } from "@/components/shared/ListPropertyModal";
import { FavoritesDrawer } from "@/components/shared/FavoritesDrawer";
import { EmiCalculator } from "@/components/shared/EmiCalculator";
import { PROPERTIES } from "@/data/properties";
import { PROJECTS } from "@/data/projects";
import { AGENTS } from "@/data/agents";
import { BLOG_POSTS } from "@/data/blogPosts";
import { Property, City, FilterState, Agent } from "@/types";
import { ArrowRight, Sparkles, Building2, ShieldCheck, Star, HelpCircle, ChevronDown, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const FAQ_ITEMS = [
  {
    q: "How does HomeX verify property listings?",
    a: "Every listing on HomeX undergoes a rigorous 4-step physical and legal audit by our legal team, cross-verifying RERA approvals, title encumbrance certificates, survey demarcations, and sanctioned municipal layouts.",
  },
  {
    q: "Is there any brokerage fee for buyers on primary project launches?",
    a: "No. For all registered partner developer project launches and exclusive mandates, HomeX charges zero brokerage to the buyer or investor.",
  },
  {
    q: "How do I schedule an in-person site visit or 3D video walkthrough?",
    a: "Simply click 'Schedule Visit' on any property card or detail view. You can select your preferred day, time slot, and tour type (in-person with private chauffeur pickup or a high-definition 3D interactive video call).",
  },
  {
    q: "Can HomeX assist with bank loans and NRI title documentation?",
    a: "Yes. HomeX has direct integrations with Tier-1 banking partners (HDFC, ICICI, SBI, Axis) providing preferential interest rates, fast-track loan sanctions, and end-to-end power-of-attorney documentation for NRI clients.",
  },
];

export function HomeClient() {
  const [currentCity, setCurrentCity] = useState<City>("Bengaluru");

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    city: "Bengaluru",
    propertyType: "All",
    tab: "Buy",
    priceRange: [1000000, 500000000],
    bedrooms: "All",
    possession: "All",
    furnishing: "All",
    amenities: [],
    sortBy: "popular",
    viewMode: "grid",
  });

  // Modals state
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactAgent, setContactAgent] = useState<Agent | null>(null);
  const [isListPropertyOpen, setIsListPropertyOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Filter properties
  const filteredProperties = PROPERTIES.filter((prop) => {
    // City match
    if (filters.city !== "All" && prop.city !== filters.city) {
      return false;
    }
    // Type match
    if (filters.propertyType !== "All" && prop.type !== filters.propertyType) {
      return false;
    }
    // Search match
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const match =
        prop.title.toLowerCase().includes(q) ||
        prop.locality.toLowerCase().includes(q) ||
        prop.location.toLowerCase().includes(q) ||
        prop.type.toLowerCase().includes(q);
      if (!match) return false;
    }
    // Bedrooms match
    if (filters.bedrooms !== "All") {
      if (filters.bedrooms === "5+") {
        if (prop.bedrooms < 5) return false;
      } else {
        if (prop.bedrooms !== parseInt(filters.bedrooms)) return false;
      }
    }
    // Possession match
    if (
      filters.possession !== "All" &&
      prop.specifications.possessionStatus !== filters.possession
    ) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    if (filters.sortBy === "price-asc") return a.priceNumeric - b.priceNumeric;
    if (filters.sortBy === "price-desc") return b.priceNumeric - a.priceNumeric;
    if (filters.sortBy === "rating") return b.rating - a.rating;
    return 0; // popular default
  });

  const handleHeroSearch = (
    term: string,
    tab: "Buy" | "Rent" | "Sell" | "Projects"
  ) => {
    setFilters((prev) => ({
      ...prev,
      search: term,
      tab,
    }));
    // Smooth scroll down to properties section
    const el = document.getElementById("properties-discovery");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSelectCategory = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      propertyType: category,
    }));
    const el = document.getElementById("properties-discovery");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    setIsDetailModalOpen(true);
  };

  const handleOpenSchedule = (property: Property) => {
    setSelectedProperty(property);
    setIsScheduleModalOpen(true);
  };

  const handleOpenContact = (property: Property) => {
    setSelectedProperty(property);
    setContactAgent(property.agent);
    setIsContactModalOpen(true);
  };

  const handleCityChange = (city: City) => {
    setCurrentCity(city);
    setFilters((prev) => ({ ...prev, city }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Sticky Header */}
      <Header
        currentCity={currentCity}
        onSelectCity={handleCityChange}
        onOpenListProperty={() => setIsListPropertyOpen(true)}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
      />

      {/* Main Flagship Content */}
      <main className="flex-1">
        {/* 1. Hero Section (Pixel match with reference image) */}
        <HeroSection
          currentCity={currentCity}
          onSearch={handleHeroSearch}
          onSelectProperty={(id) => {
            const found = PROPERTIES.find((p) => p.id === id);
            if (found) handlePropertyClick(found);
          }}
        />

        {/* 2. Stats Section (Floating 4-metric strip) */}
        <StatsSection />

        {/* 3. Property Category Section (5 architectural cards) */}
        <CategorySection onSelectCategory={handleSelectCategory} />

        {/* 4. Promotional Banners (Dual CTA cards) */}
        <PromoBanners
          onExploreHomes={() => {
            setFilters((prev) => ({ ...prev, propertyType: "All" }));
            const el = document.getElementById("properties-discovery");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        />

        {/* 5. Trust Features Strip (4 credibility pillars) */}
        <TrustSection />

        {/* 6. Real Property Discovery Experience */}
        <section
          id="properties-discovery"
          className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-light text-brand-blue text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Curated Portfolio</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
                Featured Properties in {currentCity}
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Handpicked premium residences, architectural villas and high-yield commercial assets.
              </p>
            </div>

            <Link
              href="/properties"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-blue hover:text-brand-blue-hover group"
            >
              <span>View All Properties ({PROPERTIES.length})</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Interactive Filters Bar */}
          <PropertyFilters
            filters={filters}
            onChange={(newFilters) => setFilters((prev) => ({ ...prev, ...newFilters }))}
            onReset={() =>
              setFilters({
                search: "",
                city: "All",
                propertyType: "All",
                tab: "Buy",
                priceRange: [1000000, 500000000],
                bedrooms: "All",
                possession: "All",
                furnishing: "All",
                amenities: [],
                sortBy: "popular",
                viewMode: filters.viewMode,
              })
            }
            totalResults={filteredProperties.length}
          />

          {/* Property Cards Grid/List */}
          {filteredProperties.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-100 p-8">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-brand-navy mb-1">
                No properties match your current filters
              </h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto mb-5">
                Try switching the city to "All" or clearing your bedroom and category constraints.
              </p>
              <button
                type="button"
                onClick={() =>
                  setFilters({
                    search: "",
                    city: "All",
                    propertyType: "All",
                    tab: "Buy",
                    priceRange: [1000000, 500000000],
                    bedrooms: "All",
                    possession: "All",
                    furnishing: "All",
                    amenities: [],
                    sortBy: "popular",
                    viewMode: "grid",
                  })
                }
                className="px-6 py-2.5 rounded-full bg-brand-blue text-white text-xs font-bold"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div
              className={
                filters.viewMode === "list"
                  ? "flex flex-col gap-4"
                  : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              }
            >
              {filteredProperties.map((prop) => (
                <PropertyCard
                  key={prop.id}
                  property={prop}
                  onSelect={handlePropertyClick}
                  onScheduleVisit={handleOpenSchedule}
                  viewMode={filters.viewMode}
                />
              ))}
            </div>
          )}
        </section>

        {/* 7. Flagship Developer Projects Showcase */}
        <section id="projects" className="py-12 sm:py-16 bg-slate-50 border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-light text-brand-blue text-xs font-bold mb-2">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Masterplanned Developments</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
                  Premier Real Estate Projects
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Iconic gated townships from India’s foremost Tier-1 developers.
                </p>
              </div>

              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-blue hover:text-brand-blue-hover group"
              >
                <span>Explore All Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PROJECTS.map((project) => (
                <div
                  key={project.id}
                  className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={project.images[0]}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute top-3 left-3 bg-brand-navy/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
                      {project.status}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-bold text-brand-blue uppercase tracking-wider mb-1">
                        {project.developer}
                      </div>
                      <h3 className="text-lg font-bold text-brand-navy group-hover:text-brand-blue transition-colors line-clamp-1 mb-1">
                        {project.name}
                      </h3>
                      <p className="text-xs text-slate-500 mb-3">
                        {project.location}, {project.city}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.configurations.map((cfg) => (
                          <span
                            key={cfg}
                            className="text-[11px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                          >
                            {cfg}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[11px] text-slate-400 block font-medium">Starts from</span>
                        <span className="text-base font-extrabold text-brand-navy">
                          {project.startingPrice}
                        </span>
                      </div>
                      <Link
                        href="/projects"
                        className="px-3.5 py-1.5 rounded-full bg-brand-blue-light text-brand-blue text-xs font-bold hover:bg-brand-blue hover:text-white transition-colors"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Interactive Home Loan & EMI Calculator */}
        <EmiCalculator />

        {/* 9. Verified Advisors / Agents Directory */}
        <section id="agents" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-light text-brand-blue text-xs font-bold mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>RERA Certified Advisory</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
                Top Real Estate Advisors
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Decades of cumulative expertise in high-value asset acquisitions and title security.
              </p>
            </div>

            <Link
              href="/agents"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-blue hover:text-brand-blue-hover group"
            >
              <span>View All Advisors</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {AGENTS.map((agent) => (
              <div
                key={agent.id}
                className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-slate-100">
                    <img
                      src={agent.photo}
                      alt={agent.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-brand-navy text-xs font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{agent.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-brand-navy group-hover:text-brand-blue transition-colors">
                    {agent.name}
                  </h3>
                  <p className="text-xs text-brand-blue font-semibold mt-0.5">
                    {agent.role}
                  </p>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                    {agent.bio}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-extrabold text-brand-navy block">
                      {agent.propertiesSold}+ Closed
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {agent.experienceYears} Years Exp
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setContactAgent(agent);
                      setSelectedProperty(null);
                      setIsContactModalOpen(true);
                    }}
                    className="px-4 py-2 rounded-full bg-brand-navy text-white text-xs font-bold hover:bg-brand-blue transition-colors shadow-sm"
                  >
                    Contact
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 10. Real Estate Editorial & Market Insights */}
        <section id="blog" className="py-12 sm:py-16 bg-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-light text-brand-blue text-xs font-bold mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Market Intelligence</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
                  HomeX Real Estate Journal
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Expert perspectives on infrastructure, macro investment trends, and architectural living.
                </p>
              </div>

              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-blue hover:text-brand-blue-hover group"
              >
                <span>Read All Articles</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {BLOG_POSTS.map((post) => (
                <Link
                  key={post.id}
                  href="/blog"
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 text-brand-blue text-xs font-bold px-3 py-1 rounded-full shadow-sm backdrop-blur-sm">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-xs text-slate-400 font-semibold mb-2">
                        {post.publishDate} • {post.readTime}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-brand-navy group-hover:text-brand-blue transition-colors line-clamp-2 mb-2 leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={post.author.avatar}
                          alt=""
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <span className="text-xs font-semibold text-slate-700">
                          {post.author.name}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-brand-blue flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Read Story →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 11. Frequently Asked Questions */}
        <section id="faq" className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-light text-brand-blue text-xs font-bold mb-2">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Got Questions?</span>
            </div>
            <h2 className="text-3xl font-black text-brand-navy tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Everything you need to know about buying, selling, and leasing on HomeX.
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-brand-navy">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                      openFaq === idx ? "rotate-180 text-brand-blue" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 12. Pre-Footer Call to Action Strip */}
        <section
          id="contact"
          className="py-14 bg-gradient-to-r from-brand-navy via-[#101D42] to-brand-navy text-white text-center px-4"
        >
          <div className="max-w-3xl mx-auto space-y-4">
            <h3 className="text-3xl sm:text-4xl font-black tracking-tight">
              Ready to Discover Your Dream Home?
            </h3>
            <p className="text-sm sm:text-base text-slate-300 font-normal max-w-xl mx-auto">
              Join over 25,000 satisfied property owners and investors. Speak with an advisor today or list your property in minutes.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3.5">
              <button
                type="button"
                onClick={() => setIsListPropertyOpen(true)}
                className="bg-brand-blue hover:bg-brand-blue-hover text-white text-sm font-bold px-7 py-3 rounded-full shadow-lg shadow-brand-blue/30 transition-all active:scale-95"
              >
                List Your Property Free
              </button>
              <button
                type="button"
                onClick={() => {
                  setContactAgent(AGENTS[0]);
                  setSelectedProperty(null);
                  setIsContactModalOpen(true);
                }}
                className="bg-white/10 hover:bg-white/20 text-white text-sm font-bold px-7 py-3 rounded-full backdrop-blur-sm border border-white/20 transition-all"
              >
                Speak with an Advisor
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Reference Footer */}
      <Footer onOpenListProperty={() => setIsListPropertyOpen(true)} />

      {/* Global Modals */}
      <PropertyDetailModal
        property={selectedProperty}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onScheduleVisit={(prop) => {
          setSelectedProperty(prop);
          setIsDetailModalOpen(false);
          setIsScheduleModalOpen(true);
        }}
        onContactAgent={(prop) => {
          setSelectedProperty(prop);
          setContactAgent(prop.agent);
          setIsDetailModalOpen(false);
          setIsContactModalOpen(true);
        }}
      />

      <ScheduleVisitModal
        property={selectedProperty}
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
      />

      <ContactAgentModal
        agent={contactAgent}
        property={selectedProperty}
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      <ListPropertyModal
        isOpen={isListPropertyOpen}
        onClose={() => setIsListPropertyOpen(false)}
      />

      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        onSelectProperty={handlePropertyClick}
      />
    </div>
  );
}
