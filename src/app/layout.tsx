import type { Metadata } from "next";
import "./globals.css";
import ClientEffects from "@/components/ClientEffects";

export const metadata: Metadata = {
  title: "Caliber Web Studio — Measure. Design. Rise.",
  description: "Detroit's premier AI-powered web agency. We build high-performance websites that rank, convert, and grow your business. Starting at $197/mo with $0 down.",
  keywords: "web design Detroit, AI website, local business website, SEO Detroit, web agency Michigan",
  openGraph: {
    title: "Caliber Web Studio — Measure. Design. Rise.",
    description: "Detroit's premier AI-powered web agency. $0 down. Starting at $197/mo.",
    url: "https://caliberwebstudio.com",
    siteName: "Caliber Web Studio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        {/* Cursor */}
        <div id="cursor-dot" />
        <div id="cursor-outer" />

        {/* Ambient particle fields */}
        <div className="meteor-field" id="meteorField" />
        <div className="sun-particles" id="sunParticles" />

        {/* Client-side effects: cursor, theme, particles, sound, magnetic, scroll-3d */}
        <ClientEffects />

        {children}
      </body>
    </html>
  );
}
