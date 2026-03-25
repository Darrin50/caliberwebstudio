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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Caliber Web Studio",
  "alternateName": "High Caliber Operations LLC",
  "url": "https://caliberwebstudio.com",
  "email": "darrin@caliberwebstudio.com",
  "description": "Detroit's premier AI-powered web agency. We build high-performance websites that rank, convert, and grow your business.",
  "founder": {
    "@type": "Person",
    "name": "Darrin Singer"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Detroit",
    "addressRegion": "MI",
    "addressCountry": "US"
  },
  "areaServed": [
    { "@type": "City", "name": "Detroit" },
    { "@type": "State", "name": "Michigan" },
    { "@type": "Country", "name": "United States" }
  ],
  "serviceType": [
    "Web Design",
    "Web Development",
    "SEO",
    "AI Chatbot Development",
    "Google Business Profile Optimization",
    "Review Automation",
    "Social Media Management"
  ],
  "priceRange": "$197-$697/mo",
  "slogan": "Measure. Design. Rise."
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
