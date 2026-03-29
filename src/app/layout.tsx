import type { Metadata } from "next";
import "./globals.css";
import ClientEffects from "@/components/ClientEffects";

/* ─── SEO / AEO / GEO: Full Metadata ─── */
export const metadata: Metadata = {
  metadataBase: new URL("https://caliberwebstudio.com"),
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
  ],
  authors: [{ name: "Darrin Singer", url: "https://caliberwebstudio.com" }],
  creator: "Caliber Web Studio",
  publisher: "High Caliber Operations LLC",
  formatDetection: { telephone: true, email: true },

  /* Canonical & Alternates */
  alternates: {
    canonical: "https://caliberwebstudio.com",
  },

  /* Open Graph */
  openGraph: {
    title: "Caliber Web Studio | Detroit Web Design & AI-Powered Websites",
    description:
      "Detroit\u2019s premier AI-powered web agency. High-performance websites that rank, convert, and grow your business. $0 down \u2014 plans from $197/mo.",
    url: "https://caliberwebstudio.com",
    siteName: "Caliber Web Studio",
    locale: "en_US",
    type: "website",
    images: [
      {
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

  /* Category */
  category: "technology",
};

/* ─── JSON-LD: LocalBusiness Schema ─── */
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://caliberwebstudio.com/#organization",
  name: "Caliber Web Studio",
  alternateName: "High Caliber Operations LLC",
  url: "https://caliberwebstudio.com",
  logo: "https://caliberwebstudio.com/logo-full-hero.png",
  image: "https://caliberwebstudio.com/logo-full-hero.png",
  email: "darrin@caliberwebstudio.com",
  description:
    "Caliber Web Studio is Detroit\u2019s premier AI-powered web agency founded by Darrin Singer. We design and build high-performance websites for local businesses that rank on Google, convert visitors into customers, and drive measurable growth. Plans start at $197/mo with $0 down.",
  founder: {
    "@type": "Person",
    name: "Darrin Singer",
    jobTitle: "Founder & Lead Developer",
    worksFor: { "@id": "https://caliberwebstudio.com/#organization" },
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
    ],
  },
  sameAs: [],
};

/* ─── JSON-LD: WebSite Schema (enables sitelinks search box) ─── */
const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Caliber Web Studio",
  url: "https://caliberwebstudio.com",
  description:
    "Detroit\u2019s premier AI-powered web agency. High-performance websites that rank, convert, and grow your business.",
  publisher: { "@id": "https://caliberwebstudio.com/#organization" },
};

/* ─── JSON-LD: WebPage Schema ─── */
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Caliber Web Studio \u2014 Detroit Web Design & AI-Powered Websites",
  url: "https://caliberwebstudio.com",
  description:
    "Caliber Web Studio is Detroit\u2019s premier AI-powered web agency. We build high-performance websites that rank on Google, convert visitors, and grow local businesses.",
  isPartOf: { "@type": "WebSite", url: "https://caliberwebstudio.com" },
  about: { "@id": "https://caliberwebstudio.com/#organization" },
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
        item: "https://caliberwebstudio.com",
      },
    ],
  },
};

/* ─── JSON-LD: FAQ Schema (AEO) ─── */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a website cost for a small business?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "At Caliber Web Studio, our website plans start at $197 per month with $0 down. This includes a custom-designed, mobile-first website, basic SEO, hosting, and ongoing maintenance. Our Growth Plan at $397/mo adds advanced SEO, an AI chatbot, and Google Business Profile management. Our Scale Plan at $697/mo includes unlimited pages, full-stack development, and a dedicated account manager.",
      },
    },
    {
      "@type": "Question",
      name: "Who is the best web designer in Detroit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Caliber Web Studio, founded by Darrin Singer, is Detroit\u2019s premier AI-powered web agency. We specialize in building high-performance websites for local businesses that rank on Google and convert visitors into customers. Our data-driven approach combines modern design with AI tools to deliver measurable results for businesses across Metro Detroit and Michigan.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to pay anything upfront for a website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Caliber Web Studio offers $0 down on all plans. You only pay a monthly fee starting at $197/mo, which covers design, development, hosting, maintenance, and basic SEO. There are no hidden fees or surprise charges.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to build a website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most websites are completed within 2\u20134 weeks from our initial discovery call. Our streamlined 4-step process includes Discovery & Strategy, Design & Prototype, Build & Optimize, and Launch & Growth. Complex projects with custom features may take 4\u20136 weeks.",
      },
    },
    {
      "@type": "Question",
      name: "What is an AI-powered website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An AI-powered website uses artificial intelligence to enhance user experience and business results. At Caliber Web Studio, this includes AI chatbots that engage visitors 24/7, AI-driven content optimization for better search rankings, smart analytics for conversion tracking, and automated review management. These tools help local businesses compete with larger companies.",
      },
    },
    {
      "@type": "Question",
      name: "Does Caliber Web Studio help with SEO and Google rankings?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Every Caliber Web Studio website includes foundational SEO: optimized meta tags, fast page speeds, mobile-first design, and proper heading structure. Our Growth and Scale plans include advanced SEO services such as keyword research, content strategy, Google Business Profile optimization, local citation building, and monthly performance reporting.",
      },
    },
    {
      "@type": "Question",
      name: "What areas does Caliber Web Studio serve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Caliber Web Studio is based in Detroit, Michigan and serves businesses throughout Metro Detroit including Dearborn, Warren, Sterling Heights, and Ann Arbor. We also work with clients across Michigan and nationwide. All of our services are delivered remotely, so location is never a barrier.",
      },
    },
    {
      "@type": "Question",
      name: "What services does Caliber Web Studio offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Caliber Web Studio offers six core services: (1) Custom Web Design \u2014 unique, mobile-first websites built from scratch; (2) SEO & Search Optimization \u2014 technical SEO, local SEO, and content strategy; (3) AI Chatbot Integration \u2014 24/7 intelligent chat agents for lead capture; (4) Google Business Profile Management \u2014 optimization and ongoing management; (5) Review Automation \u2014 automated systems to collect and manage customer reviews; and (6) Social Media Management \u2014 content creation and posting for major platforms.",
      },
    },
  ],
};

/* ─── Render ─── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        {/* Restore saved theme before first paint — prevents flash of wrong theme */}
        <script dangerouslySetInnerHTML={{__html: `(function(){try{var t=window['localStorage'].getItem('caliber-theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`}} />
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body>
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

