"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MapPin,
  Heart,
  User,
  ChevronDown,
  Menu,
  X,
  PlusCircle,
  Building2,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { City } from "@/types";

interface HeaderProps {
  currentCity?: City;
  onSelectCity?: (city: City) => void;
  onOpenListProperty?: () => void;
  onOpenFavorites?: () => void;
}

export const CITIES: City[] = [
  "Bengaluru",
  "Mumbai",
  "Delhi NCR",
  "Hyderabad",
  "Pune",
  "Chennai",
];

export function Header({
  currentCity = "Bengaluru",
  onSelectCity,
  onOpenListProperty,
  onOpenFavorites,
}: HeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCityMenuOpen, setIsCityMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { count: favoritesCount } = useFavorites();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Buy", href: "/properties?tab=Buy" },
    { label: "Rent", href: "/properties?tab=Rent" },
    { label: "Projects", href: "/projects" },
    { label: "Agents", href: "/agents" },
    { label: "About", href: "/#about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-3"
          : "bg-white/80 backdrop-blur-sm py-4 border-b border-slate-100/60"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-lg"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-blue flex items-center justify-center text-white shadow-md shadow-brand-blue/30 group-hover:scale-105 transition-transform duration-200">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
                aria-hidden="true"
              >
                <path d="M12 2.5L2 11.5h3.2V21h5.6v-6.2h4.4V21h5.6V11.5H22L12 2.5z" />
              </svg>
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-brand-navy">
              Home<span className="text-brand-blue">X</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-[15px] font-medium transition-colors duration-150 relative py-1 hover:text-brand-blue ${
                    isActive ? "text-brand-blue font-semibold" : "text-brand-slate"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-blue rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & CTA */}
          <div className="hidden sm:flex items-center gap-3.5">
            {/* City Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCityMenuOpen(!isCityMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-brand-navy hover:text-brand-blue rounded-full hover:bg-slate-100 transition-colors focus:outline-none"
                aria-expanded={isCityMenuOpen}
                aria-label={`Current location: ${currentCity}`}
              >
                <MapPin className="w-4 h-4 text-brand-blue" />
                <span>{currentCity}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
              </button>

              {isCityMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsCityMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Select Metropolitan Hub
                    </div>
                    {CITIES.map((city) => (
                      <button
                        key={city}
                        onClick={() => {
                          onSelectCity?.(city);
                          setIsCityMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between hover:bg-brand-blue-light hover:text-brand-blue transition-colors ${
                          currentCity === city
                            ? "text-brand-blue font-bold bg-brand-blue-light/60"
                            : "text-slate-700 font-medium"
                        }`}
                      >
                        <span>{city}</span>
                        {currentCity === city && (
                          <span className="w-2 h-2 rounded-full bg-brand-blue" />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Favorites Icon */}
            <button
              type="button"
              onClick={onOpenFavorites}
              aria-label="View saved properties"
              className="relative p-2 text-slate-700 hover:text-brand-blue hover:bg-slate-100 rounded-full transition-colors"
            >
              <Heart className="w-5 h-5" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-blue text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* User Account Icon */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                aria-label="User profile menu"
                className="p-2 text-slate-700 hover:text-brand-blue hover:bg-slate-100 rounded-full transition-colors"
              >
                <User className="w-5 h-5" />
              </button>

              {isUserMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs text-slate-400 font-medium">Signed in as</p>
                      <p className="text-sm font-semibold text-brand-navy truncate">
                        client@homex.in
                      </p>
                    </div>
                    <Link
                      href="/saved"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-brand-blue"
                    >
                      Saved Properties ({favoritesCount})
                    </Link>
                    <Link
                      href="/properties"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-brand-blue"
                    >
                      Browse Catalog
                    </Link>
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onOpenListProperty?.();
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-brand-blue font-medium hover:bg-brand-blue-light"
                    >
                      + List Your Property
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* List Property CTA Button */}
            <button
              type="button"
              onClick={onOpenListProperty}
              className="bg-brand-blue hover:bg-brand-blue-hover text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-md shadow-brand-blue/20 hover:shadow-lg hover:shadow-brand-blue/30 transition-all duration-200 active:scale-95 flex items-center gap-1.5"
            >
              List Property
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={onOpenFavorites}
              className="relative p-2 text-slate-700 rounded-full"
              aria-label="Favorites"
            >
              <Heart className="w-5 h-5" />
              {favoritesCount > 0 && (
                <span className="absolute 0 right-0 bg-brand-blue text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              className="p-2 text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileNavOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-white/98 backdrop-blur-xl border-b border-slate-200 shadow-2xl px-6 py-6 transition-all duration-200">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-400 uppercase">Selected City</span>
            <div className="flex items-center gap-1 text-sm font-bold text-brand-blue">
              <MapPin className="w-4 h-4" />
              <span>{currentCity}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileNavOpen(false)}
                className="text-base font-semibold text-brand-navy hover:text-brand-blue py-1.5 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-slate-300">→</span>
              </Link>
            ))}
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                setIsMobileNavOpen(false);
                onOpenListProperty?.();
              }}
              className="w-full bg-brand-blue text-white font-semibold py-3 rounded-full text-center shadow-md shadow-brand-blue/20"
            >
              List Property for Free
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
