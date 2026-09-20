"use client";

import React from "react";
import Link from "next/link";

interface FooterProps {
  onOpenListProperty?: () => void;
}

export function Footer({ onOpenListProperty }: FooterProps) {
  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-12 text-brand-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8 pb-14 border-b border-slate-100">
          {/* Brand Info */}
          <div className="lg:col-span-1.5 flex flex-col justify-between">
            <div>
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-xl bg-brand-blue flex items-center justify-center text-white shadow-sm">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12 2.5L2 11.5h3.2V21h5.6v-6.2h4.4V21h5.6V11.5H22L12 2.5z" />
                  </svg>
                </div>
                <span className="text-2xl font-extrabold tracking-tight text-brand-navy">
                  Home<span className="text-brand-blue">X</span>
                </span>
              </Link>
              <p className="mt-3 text-sm font-medium text-slate-700">
                A Home for Every Tomorrow
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Buy. Rent. Invest. Grow.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-brand-navy tracking-tight mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-500 font-medium">
              <li>
                <Link href="/properties?tab=Buy" className="hover:text-brand-blue transition-colors">
                  Buy
                </Link>
              </li>
              <li>
                <Link href="/properties?tab=Rent" className="hover:text-brand-blue transition-colors">
                  Rent
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-brand-blue transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenListProperty}
                  className="hover:text-brand-blue transition-colors text-left"
                >
                  List Property
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-bold text-brand-navy tracking-tight mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-500 font-medium">
              <li>
                <Link href="/#about" className="hover:text-brand-blue transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#careers" className="hover:text-brand-blue transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-brand-blue transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-brand-blue transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-bold text-brand-navy tracking-tight mb-4">
              Support
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-500 font-medium">
              <li>
                <Link href="/#faq" className="hover:text-brand-blue transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/#privacy" className="hover:text-brand-blue transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/#terms" className="hover:text-brand-blue transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/#sitemap" className="hover:text-brand-blue transition-colors">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="text-sm font-bold text-brand-navy tracking-tight mb-4">
              Follow Us
            </h4>
            <div className="flex items-center gap-2">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-[#FF0000] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
              {/* X */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X Twitter"
                className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Download Our App */}
          <div className="lg:col-span-1">
            <h4 className="text-sm font-bold text-brand-navy tracking-tight mb-2">
              Download Our App
            </h4>
            <p className="text-xs text-slate-400 mb-4">
              Get the best property deals on the go.
            </p>
            <div className="flex flex-col gap-2.5">
              {/* Google Play Button */}
              <a
                href="#google-play"
                className="flex items-center gap-2.5 bg-black text-white px-3.5 py-2 rounded-xl hover:bg-slate-800 transition-colors shadow-sm"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#3DDC84]">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186c-.266-.282-.41-.664-.41-1.077V2.891c0-.413.144-.795.41-1.077zm11.255 11.257L4.773.99c.306-.183.67-.282 1.056-.282.477 0 .944.152 1.332.428l10.957 6.27-3.254 5.665zm0 1.858l3.254 5.665-10.957 6.27c-.388.276-.855.428-1.332.428-.386 0-.75-.099-1.056-.282l10.091-12.081zm1.688-.937l3.966-2.27c1.079-.617 1.079-1.626 0-2.244l-3.966-2.27-2.738 4.767 2.738 4.017z" />
                </svg>
                <div className="text-left">
                  <div className="text-[9px] uppercase tracking-wider text-slate-300 font-semibold leading-none">
                    GET IT ON
                  </div>
                  <div className="text-xs font-bold leading-tight mt-0.5">
                    Google Play
                  </div>
                </div>
              </a>

              {/* App Store Button */}
              <a
                href="#app-store"
                className="flex items-center gap-2.5 bg-black text-white px-3.5 py-2 rounded-xl hover:bg-slate-800 transition-colors shadow-sm"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.85-.9.04-2 .61-2.65 1.37-.58.67-.99 1.74-.86 2.78 1.01.08 1.98-.55 2.59-1.3" />
                </svg>
                <div className="text-left">
                  <div className="text-[9px] uppercase tracking-wider text-slate-300 font-semibold leading-none">
                    Download on the
                  </div>
                  <div className="text-xs font-bold leading-tight mt-0.5">
                    App Store
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-400">
          <div>© 2024 HomeX. All rights reserved.</div>
          <div className="flex items-center gap-1.5 font-semibold text-brand-navy">
            <span>Better Homes. Brighter Tomorrows.</span>
            <span className="text-brand-blue">💙</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
