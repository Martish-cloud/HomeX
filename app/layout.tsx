import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0066FF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://homex.in"),
  title: {
    default: "HomeX | Find a Better Tomorrow",
    template: "%s | HomeX",
  },
  description: "Trusted properties. Brighter futures. India's premier luxury real estate discovery platform.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-white text-brand-navy antialiased selection:bg-brand-blue selection:text-white">
        {children}
      </body>
    </html>
  );
}
