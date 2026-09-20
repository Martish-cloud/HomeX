import { HomeClient } from "@/components/home/HomeClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HomeX | Find a Better Tomorrow - Trusted Properties, Brighter Futures",
  description:
    "Discover verified luxury apartments, villas, plots, commercial spaces and premier real estate townships across Bengaluru, Mumbai, Delhi NCR, Hyderabad and Pune.",
  keywords: [
    "HomeX",
    "Real Estate",
    "Luxury Homes",
    "Apartments in Bengaluru",
    "Villas for Sale",
    "Commercial Properties",
    "RERA Verified Real Estate",
  ],
  openGraph: {
    title: "HomeX | Find a Better Tomorrow",
    description: "Trusted properties. Brighter futures. Explore premier real estate on HomeX.",
    url: "https://homex.in",
    siteName: "HomeX",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "HomeX Luxury Architectural Villa",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function HomePage() {
  return <HomeClient />;
}
