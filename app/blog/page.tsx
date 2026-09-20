"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BLOG_POSTS } from "@/data/blogPosts";
import { BlogPost, City } from "@/types";
import { Sparkles, Calendar, Clock, ArrowRight, X } from "lucide-react";
import { ListPropertyModal } from "@/components/shared/ListPropertyModal";
import { FavoritesDrawer } from "@/components/shared/FavoritesDrawer";

export default function BlogPage() {
  const [currentCity, setCurrentCity] = useState<City>("Bengaluru");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [isListPropertyOpen, setIsListPropertyOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  const categories = [
    "All",
    "Market Insights",
    "Buying",
    "Investment",
    "Renting",
    "Home & Lifestyle",
  ];

  const filteredPosts = BLOG_POSTS.filter(
    (post) => selectedCategory === "All" || post.category === selectedCategory
  );

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
            <Sparkles className="w-3.5 h-3.5" />
            <span>Editorial & Research</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            HomeX Real Estate Journal
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            In-depth market trends, legal due-diligence breakdowns, and architectural inspiration for investors and homebuyers.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-brand-blue text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setActivePost(post)}
              className="cursor-pointer bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute top-4 left-4 bg-white/95 text-brand-blue text-xs font-bold px-3 py-1 rounded-full shadow-sm backdrop-blur-sm">
                  {post.category}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-slate-400 font-semibold mb-2">
                    {post.publishDate} • {post.readTime}
                  </div>
                  <h2 className="text-xl font-bold text-brand-navy group-hover:text-brand-blue transition-colors line-clamp-2 mb-3 leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <span className="text-xs font-semibold text-slate-700">
                      {post.author.name}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-brand-blue flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Article →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Read Article Modal */}
        {activePost && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-navy/60 backdrop-blur-md flex items-center justify-center p-4">
            <div className="fixed inset-0" onClick={() => setActivePost(null)} />
            <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <span className="text-xs font-bold text-brand-blue uppercase">
                  {activePost.category}
                </span>
                <button
                  type="button"
                  onClick={() => setActivePost(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-6">
                <img
                  src={activePost.image}
                  alt={activePost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-brand-navy mb-3">
                {activePost.title}
              </h2>

              <div className="flex items-center gap-3 text-xs text-slate-500 pb-5 mb-5 border-b border-slate-100">
                <img
                  src={activePost.author.avatar}
                  alt=""
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <div className="font-bold text-brand-navy">
                    {activePost.author.name}
                  </div>
                  <div className="text-slate-400">
                    {activePost.author.role} • {activePost.publishDate}
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                {activePost.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActivePost(null)}
                  className="px-6 py-2.5 rounded-full bg-brand-blue text-white text-xs font-bold"
                >
                  Done Reading
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer onOpenListProperty={() => setIsListPropertyOpen(true)} />
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
