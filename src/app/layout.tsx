import type { Metadata } from "next";
import { Syne, Inter, Space_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ClientEffects from "@/components/ClientEffects";
import ClientProviders from "@/components/ClientProviders";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

/* ─── SEO / AEO / GEO: Full Metadata ─── */
export const metadata: Metadata = {
  metadataBase: new URL("https://www.caliberwebstudio.com"),
  title: {
    default: "Caliber Web Studio | Detroit Web Design & AI-Powered Websites",
    template: "%s | Caliber Web Studio",
  },
  description:
    "Caliber Web Studio is Detroit\u2019s premier AI-powered web agency. We design and build high-performance websites that rank on Google, convert visitors, and grow local businesses. $0 down, plans from $197/mo. Founded by Darrin Singer.",
  keywords: [
    "web design Detroit",
    "Detroit web designer",
    "AI website builder",
    "local business website",
    "SEO Detroit",
    "web agency Michigan",
    "small business web design",
    "affordable website design",
    "Detroit web development",
    "Google Business Profile optimization",
    "AI chatbot for business",
    "web design near me",
    "website designer Detroit",
    "website designers near me",
    "Detroit website designer",
    "web designer Detroit MI",
    "website designer near me Detroit",
  ],
  authors: [{ name: "Darrin Singer", url: "https://www.caliberwebstudio.com" }],
  creator: "Caliber Web Studio",
  publisher: "High Caliber Operations LLC",
  formatDetection: { telephone: true, email: true },

  /* Canonical & Alternates */
  alternates: {
    canonical: "https://www.caliberwebstudio.com",
  },

  /* Open Graph */
  openGraph: {
    title: "Caliber Web Studio | Detroit Web Design & AI-Powered Websites",
    description:
      "Detroit\u2019s premier AI-powered web agency. High-performance websites that rank, convert, and grow your business. $0 down \u2014 plans from $197/mo.",
    url: "https://www.caliberwebstudio.com",
    siteName: "Caliber Web Studio",
    locale: "en_US",
    type: "website",
    images: [
      {
        // TODO: replace with proper 1200x630 social card hero image (current is the logo PNG)
        url: "/logo-full-hero.png",
        width: 1200,
        height: 630,
        alt: "Caliber Web Studio \u2014 Measure. Design. Rise.",
      },
    ],
  },

  /* Twitter Card */
  twitter: {
    card: "summary_large_image",
    title: "Caliber Web Studio | Detroit Web Design & AI-Powered Websites",
    description:
      "Detroit\u2019s premier AI-powered web agency. $0 down, plans from $197/mo. Websites that rank, convert, and grow your business.",
    images: ["/logo-full-hero.png"],
    creator: "@CaliberWebStudio",
  },

  /* Robots */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  /* Icons / Favicon */
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },

  /* Category */
  category: "technology",
};

/* ─── JSON-LD: LocalBusiness Schema ─── */
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://www.caliberwebstudio.com/#organization",
  name: "Caliber Web Studio",
  alternateName: "High Caliber Operations LLC",
  url: "https://www.caliberwebstudio.com",
  logo: "https://www.caliberwebstudio.com/logo-full-hero.png",
  image: "https://www.caliberwebstudio.com/logo-full-hero.png",
  email: "darrin@caliberwebstudio.com",
  telephone: "+13137992315",
  description:
    "Caliber Web Studio is Detroit\u2019s premier AI-powered web agency founded by Darrin Singer. We design and build high-performance websites for local businesses that rank on Google, convert visitors into customers, and drive measurable growth. Plans start at $197/mo with $0 down.",
  founder: {
    "@type": "Person",
    name: "Darrin Singer",
    jobTitle: "Founder & Lead Developer",
    worksFor: { "@id": "https://www.caliberwebstudio.com/#organization" },
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Detroit",
    addressRegion: "MI",
    postalCode: "48201",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 42.3314,
    longitude: -83.0458,
  },
  areaServed: [
    { "@type": "City", name: "Detroit" },
    { "@type": "City", name: "Dearborn" },
    { "@type": "City", name: "Warren" },
    { "@type": "City", name: "Sterling Heights" },
    { "@type": "City", name: "Ann Arbor" },
    { "@type": "City", name: "Southfield" },
    { "@type": "City", name: "Troy" },
    { "@type": "City", name: "Royal Oak" },
    { "@type": "City", name: "Livonia" },
    { "@type": "City", name: "Farmington Hills" },
    { "@type": "State", name: "Michigan" },
    { "@type": "Country", name: "United States" },
  ],
  serviceType: [
    "Web Design",
    "Web Development",
    "Search Engine Optimization",
    "AI Chatbot Development",
    "Google Business Profile Optimization",
    "Review Automation",
    "Social Media Management",
    "Content Marketing",
  ],
  priceRange: "$197\u2013$697/mo",
  currenciesAccepted: "USD",
  paymentAccepted: "Credit Card, Debit Card, ACH",
  slogan: "Measure. Design. Rise.",
  knowsAbout: [
    "Web Design",
    "Search Engine Optimization",
    "AI-Powered Websites",
    "Local Business Marketing",
    "Google Business Profile",
    "Conversion Rate Optimization",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Web Design Plans",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Launch Plan",
        description:
          "5-page custom website, mobile-first design, basic SEO, contact form, and Google Business Profile setup. Ideal for startups and new businesses.",
        price: "197",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "197",
          priceCurrency: "USD",
          unitCode: "MON",
          referenceQuantity: {
            "@type": "QuantitativeValue",
            value: "1",
            unitCode: "MON",
          },
        },
      },
      {
        "@type": "Offer",
        name: "Growth Plan",
        description:
          "10-page custom website, advanced SEO, AI chatbot, Google Business Profile management, review automation, and monthly content. For businesses ready to scale.",
        price: "397",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "397",
          priceCurrency: "USD",
          unitCode: "MON",
          referenceQuantity: {
            "@type": "QuantitativeValue",
            value: "1",
            unitCode: "MON",
          },
        },
      },
      {
        "@type": "Offer",
        name: "Scale Plan",
        description:
          "Unlimited pages, full-stack custom development, priority support, advanced AI integrations, social media management, and dedicated account manager. For established businesses that want market dominance.",
        price: "697",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "697",
          priceCurrency: "USD",
          unitCode: "MON",
          referenceQuantity: {
            "@type": "QuantitativeValue",
            value: "1",
            unitCode: "MON",
          },
        },
      },
      {
        "@type": "Offer",
        name: "Startup Complete",
        description:
          "Go from idea to fully operational business in 48 hours. Includes LLC formation assistance, EIN registration guidance, business bank account setup guidance, domain + professional email, full 5–7 page website, AI chatbot, Google Business Profile, brand kit, social media accounts (3 platforms), 30 days of content, email/SMS automation, and pitch deck + one-pager.",
        price: "5000",
        priceCurrency: "USD",
        url: "https://www.caliberwebstudio.com/startup-complete",
      },
    ],
  },
  sameAs: [
    "https://www.instagram.com/caliberwebstudio",
    "https://www.linkedin.com/company/caliber-web-studio",
    "https://twitter.com/caliberwebstudio",
    // TODO: confirm Google Business Profile URL and add here
  ],
};

/* ─── JSON-LD: WebSite Schema (enables sitelinks search box) ─── */
const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Caliber Web Studio",
  url: "https://www.caliberwebstudio.com",
  description:
    "Detroit\u2019s premier AI-powered web agency. High-performance websites that rank, convert, and grow your business.",
  publisher: { "@id": "https://www.caliberwebstudio.com/#organization" },
};

/* ─── JSON-LD: WebPage Schema ─── */
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Caliber Web Studio \u2014 Detroit Web Design & AI-Powered Websites",
  url: "https://www.caliberwebstudio.com",
  description:
    "Caliber Web Studio is Detroit\u2019s premier AI-powered web agency. We build high-performance websites that rank on Google, convert visitors, and grow local businesses.",
  isPartOf: { "@type": "WebSite", url: "https://www.caliberwebstudio.com" },
  about: { "@id": "https://www.caliberwebstudio.com/#organization" },
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: [
      "#hero h1",
      "#hero p",
      "#services h2",
      "#faq h2",
      ".faq-answer",
    ],
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.caliberwebstudio.com",
      },
    ],
  },
};


/* ─── Render ─── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className={`${syne.variable} ${inter.variable} ${spaceMono.variable}`}>
      <head>
        {/* Restore saved theme before first paint — prevents flash of wrong theme.
            Default is dark; only switch to light if the user explicitly saved 'light'. */}
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{__html: `(function(){try{var t=window['localStorage'].getItem('caliber-theme-v2');document.documentElement.setAttribute('data-theme',t==='light'?'light':'dark');}catch(e){}})();`}}
        />
        {/* Structured Data */}
        <Script id="ld-local-business" type="application/ld+json" strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Script id="ld-website" type="application/ld+json" strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <Script id="ld-webpage" type="application/ld+json" strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
        />
      </head>
      <body>
        {/* Ambient particle fields */}
        <div className="meteor-field" id="meteorField" />
        <div className="sun-particles" id="sunParticles" />

        {/* Client-side effects: cursor, theme, particles, magnetic, scroll-3d */}
        <ClientEffects />

        {/* ClientProviders: cursor sparkle + any future client-only wrappers */}
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}

