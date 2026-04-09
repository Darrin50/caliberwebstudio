import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Website Design Guides by Industry | Caliber Web Studio Detroit",
  description: "Industry-specific website design guides for Detroit small businesses — barbershops, plumbers, salons, restaurants, auto shops, law firms, dentists, real estate, and gyms.",
  alternates: { canonical: "https://caliberwebstudio.com/blog/industry-guide" },
  openGraph: {
    title: "Website Design Guides by Industry | Caliber Web Studio Detroit",
    description: "Nine deep-dive guides on what a high-converting website must include for your specific industry. Built for Detroit businesses that want results, not templates.",
    url: "https://caliberwebstudio.com/blog/industry-guide",
    type: "website",
    images: [{ url: "/logo-full-hero.png", alt: "Caliber Web Studio Industry Guides", width: 1200, height: 630 }],
  },
};

const industries = [
  {
    slug: "website-design-for-barbers",
    title: "Barbershops & Barbers",
    headline: "Turn Browsers Into Booked Appointments",
    description: "Your chair fills up from Instagram, word of mouth, and walk-ins. A website closes the gap — it captures people searching \u201cbarber near me\u201d at midnight and turns them into regulars with online booking and a gallery that does the selling for you.",
    thumbnail: "https://images.unsplash.com/photo-1512864084360-7c0c4d0a0845?w=800&q=80",
    thumbnailAlt: "Barber giving a fade haircut in a Detroit barbershop",
    icon: "✂",
    accentColor: "#f472b6",
  },
  {
    slug: "website-design-for-plumbers-contractors",
    title: "Plumbers & Contractors",
    headline: "Generate Leads While You're on the Job",
    description: "Homeowners in a plumbing crisis Google first and call second. Your site needs to rank, load fast, and make it dead simple to call or request service. We build contractor sites with trust signals, service pages for every job type, and 24/7 lead capture.",
    thumbnail: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&q=80",
    thumbnailAlt: "Plumber working on pipes in a Metro Detroit home",
    icon: "🔧",
    accentColor: "#60a5fa",
  },
  {
    slug: "website-design-for-salons",
    title: "Hair Salons & Beauty Studios",
    headline: "A Site as Polished as Your Work",
    description: "Beauty is visual. Your site needs to prove that in the first three seconds. We build salon sites with stunning galleries, online booking integrations, service menus, and the local SEO to get you found when someone searches \u201cnatural hair salon Detroit.\u201d",
    thumbnail: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=80",
    thumbnailAlt: "Stylist working at a Detroit hair salon",
    icon: "💇",
    accentColor: "#a78bfa",
  },
  {
    slug: "website-design-for-restaurants",
    title: "Restaurants & Food Businesses",
    headline: "Fill Tables From Search, Not Just Yelp",
    description: "Diners search Google before they call OpenTable. Your restaurant site needs a fast-loading menu, online ordering or reservation link, and enough local SEO to show up when someone searches \u201cbest Detroit restaurant near me.\u201d We make that happen.",
    thumbnail: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    thumbnailAlt: "Detroit restaurant interior with ambient lighting",
    icon: "🍽",
    accentColor: "#fb923c",
  },
  {
    slug: "website-design-for-auto-repair-shops",
    title: "Auto Repair Shops",
    headline: "Get Found When the Check Engine Light Comes On",
    description: "People don't plan car repairs — they panic. Your site needs to be the first thing they find, instantly communicate trustworthiness, and make calling or booking as frictionless as possible. We build auto shop sites that earn the click and close the call.",
    thumbnail: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
    thumbnailAlt: "Mechanic working in a Metro Detroit auto repair shop",
    icon: "🔩",
    accentColor: "#34d399",
  },
  {
    slug: "website-design-for-lawyers",
    title: "Lawyers & Law Firms",
    headline: "Establish Authority. Win the Client Before the Call.",
    description: "Legal clients research before they retain. Your website is the first deposition — and you need to win it. We build law firm sites with practice area pages, schema markup, trust signals, and the SEO to rank for high-intent searches in Michigan courts and counties.",
    thumbnail: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
    thumbnailAlt: "Detroit law office professional setting",
    icon: "⚖",
    accentColor: "#facc15",
  },
  {
    slug: "website-design-for-dentists",
    title: "Dental Practices",
    headline: "New Patients From Google, Not Just Referrals",
    description: "People switching dentists go online first. Your practice site needs to showcase your team, list every service with its own SEO page, surface your reviews, and make booking an appointment frictionless on mobile. Referrals are a bonus — your site is the engine.",
    thumbnail: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=800&q=80",
    thumbnailAlt: "Modern dental office in Metro Detroit",
    icon: "🦷",
    accentColor: "#00d4ff",
  },
  {
    slug: "website-design-for-real-estate-agents",
    title: "Real Estate Agents",
    headline: "Your Personal Brand, Not the Brokerage's Site",
    description: "Buyers and sellers Google the agent before they sign. Your personal website — not your broker's generic page — is what builds trust and captures leads. We build agent sites with IDX-ready design, area pages, testimonials, and the local SEO to own your market.",
    thumbnail: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    thumbnailAlt: "Metro Detroit residential neighborhood for real estate",
    icon: "🏠",
    accentColor: "#f472b6",
  },
  {
    slug: "website-design-for-gyms-and-fitness",
    title: "Gyms & Fitness Studios",
    headline: "Convert Search Traffic Into Memberships",
    description: "People pick a gym the same way they pick a restaurant — they look at photos, read reviews, and check proximity. Your site needs to show your space, list your classes and pricing, and make signing up or booking a free trial impossible to resist.",
    thumbnail: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    thumbnailAlt: "Modern gym or fitness studio in Detroit",
    icon: "💪",
    accentColor: "#34d399",
  },
];

const hubSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Website Design Guides by Industry — Caliber Web Studio Detroit",
  description: "Industry-specific website design guides for Detroit small businesses covering barbershops, plumbers, salons, restaurants, auto shops, law firms, dental practices, real estate agents, and gyms.",
  url: "https://caliberwebstudio.com/blog/industry-guide",
  publisher: {
    "@type": "Organization",
    name: "Caliber Web Studio",
    url: "https://caliberwebstudio.com",
    logo: { "@type": "ImageObject", url: "https://caliberwebstudio.com/logo-full-hero.png" },
  },
  hasPart: industries.map((ind) => ({
    "@type": "Article",
    name: `Website Design for ${ind.title} in Detroit`,
    url: `https://caliberwebstudio.com/blog/${ind.slug}`,
  })),
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Detroit Industry Website Design Guides",
  description: "Nine complete guides on building a high-converting website for specific industries in Metro Detroit.",
  numberOfItems: industries.length,
  itemListElement: industries.map((ind, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: `Website Design for ${ind.title} in Detroit`,
    url: `https://caliberwebstudio.com/blog/${ind.slug}`,
  })),
};

export default function IndustryGuideHub() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hubSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <Nav />
      <main style={{ minHeight: "100vh", paddingTop: "80px", paddingBottom: "80px" }}>

        {/* Hero */}
        <section style={{ paddingTop: "clamp(48px, 8vw, 96px)", paddingBottom: "clamp(48px, 6vw, 72px)", textAlign: "center", padding: "clamp(48px, 8vw, 96px) 24px clamp(48px, 6vw, 72px)" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent, #00d4ff)", marginBottom: "20px" }}>
              Industry Guides
            </p>
            <h1 style={{ fontSize: "clamp(36px, 7vw, 72px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", color: "var(--text-primary, #fff)", margin: "0 0 24px" }}>
              Website Design Guides<br />for Every Detroit Industry
            </h1>
            <p style={{ fontSize: "clamp(17px, 2vw, 20px)", color: "var(--text-secondary, rgba(255,255,255,0.7))", lineHeight: 1.7, maxWidth: "620px", margin: "0 auto 36px" }}>
              Nine industry-specific deep dives on what a high-converting website must include — written for Detroit small businesses, not generic SaaS startups.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/#pricing" style={{ display: "inline-block", padding: "14px 28px", background: "var(--accent, #00d4ff)", color: "#000", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "0.95rem" }}>
                View Plans & Pricing
              </Link>
              <Link href="/contact" style={{ display: "inline-block", padding: "14px 28px", background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "var(--text-primary, #fff)", borderRadius: "8px", fontWeight: 600, textDecoration: "none", fontSize: "0.95rem" }}>
                Free Strategy Call
              </Link>
            </div>
          </div>
        </section>

        {/* Why Industry-Specific Matters */}
        <section style={{ maxWidth: "760px", margin: "0 auto", padding: "0 24px 80px" }}>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "clamp(28px, 5vw, 48px)" }}>
            <h2 style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 700, color: "var(--text-primary, #fff)", marginBottom: "16px" }}>
              Why generic website advice fails Detroit businesses
            </h2>
            <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.8, marginBottom: "16px", fontSize: "clamp(15px, 1.8vw, 17px)" }}>
              A barbershop website needs a photo gallery and online booking. A law firm site needs authority signals and practice area pages. A restaurant site needs to load in under two seconds on a phone in a parking lot. These aren't the same website with different logos.
            </p>
            <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.8, marginBottom: "0", fontSize: "clamp(15px, 1.8vw, 17px)" }}>
              Each guide below breaks down exactly what your industry requires — the pages, the structure, the SEO signals, and the conversion elements — so you know what to demand from any web designer you hire, including us.
            </p>
          </div>
        </section>

        {/* Industry Grid */}
        <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px 80px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))", gap: "24px" }}>
            {industries.map((ind) => (
              <Link
                key={ind.slug}
                href={`/blog/${ind.slug}`}
                style={{ display: "flex", flexDirection: "column", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", overflow: "hidden", textDecoration: "none", transition: "border-color 0.2s, transform 0.2s" }}
                className="industry-card"
              >
                {/* Thumbnail */}
                <div style={{ position: "relative", height: "180px", flexShrink: 0 }}>
                  <Image
                    src={ind.thumbnail}
                    alt={ind.thumbnailAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 360px"
                    style={{ objectFit: "cover" }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.7))" }} />
                  <span style={{ position: "absolute", bottom: "14px", left: "16px", fontSize: "1.4rem" }}>{ind.icon}</span>
                </div>

                {/* Content */}
                <div style={{ padding: "20px 24px 28px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: ind.accentColor, marginBottom: "8px" }}>
                    {ind.title}
                  </p>
                  <h2 style={{ fontSize: "clamp(16px, 2vw, 18px)", fontWeight: 700, color: "var(--text-primary, #fff)", lineHeight: 1.3, marginBottom: "10px" }}>
                    {ind.headline}
                  </h2>
                  <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, flex: 1, marginBottom: "20px" }}>
                    {ind.description}
                  </p>
                  <span style={{ fontSize: "0.85rem", fontWeight: 600, color: ind.accentColor, display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    Read the guide →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* What Makes a Detroit Business Site Actually Work */}
        <section style={{ maxWidth: "760px", margin: "0 auto", padding: "0 24px 80px" }}>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, color: "var(--text-primary, #fff)", marginBottom: "32px", letterSpacing: "-0.02em" }}>
            What every Detroit business website needs — regardless of industry
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {[
              { label: "Mobile-first speed", body: "60%+ of local searches happen on mobile. If your site takes more than 3 seconds to load, the customer is gone. We build on Next.js — sub-2-second load times are standard, not aspirational." },
              { label: "Local SEO from day one", body: "Schema markup, Google Business Profile alignment, location-specific landing pages, and NAP consistency across directories. These aren't optional extras — they're table stakes for ranking in Detroit." },
              { label: "A clear next step on every page", body: "Every page needs one primary action: call, book, request a quote, or fill out a form. Sites without a clear CTA are brochures. We build conversion machines." },
              { label: "Trust signals that do the heavy lifting", body: "Real photos, reviews, credentials, and years in business. Customers make trust decisions in 3 seconds. Your site either builds trust instantly or you lose the lead to whoever does." },
            ].map(({ label, body }) => (
              <div key={label} style={{ paddingLeft: "20px", borderLeft: "2px solid var(--accent, #00d4ff)" }}>
                <h3 style={{ fontSize: "clamp(15px, 2vw, 17px)", fontWeight: 700, color: "var(--text-primary, #fff)", marginBottom: "6px" }}>{label}</h3>
                <p style={{ fontSize: "clamp(14px, 1.8vw, 15px)", color: "rgba(255,255,255,0.65)", lineHeight: 1.75, margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section style={{ maxWidth: "760px", margin: "0 auto", padding: "0 24px 80px" }}>
          <div style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.08) 0%, rgba(99,102,241,0.08) 100%)", border: "1px solid rgba(0,212,255,0.2)", borderRadius: "20px", padding: "clamp(32px, 6vw, 56px)", textAlign: "center" }}>
            <h2 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 800, color: "var(--text-primary, #fff)", marginBottom: "14px", letterSpacing: "-0.02em" }}>
              Ready to build a site that actually works?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "28px", fontSize: "clamp(15px, 2vw, 17px)", maxWidth: "480px", margin: "0 auto 28px" }}>
              Custom-built for your industry. Live in 2 weeks. Starting at $197/month with $0 down. No templates, no agency bloat.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/#pricing" style={{ display: "inline-block", padding: "14px 28px", background: "var(--accent, #00d4ff)", color: "#000", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "0.95rem" }}>
                See Plans & Pricing
              </Link>
              <Link href="/contact" style={{ display: "inline-block", padding: "14px 28px", background: "transparent", border: "1px solid rgba(0,212,255,0.4)", color: "var(--accent, #00d4ff)", borderRadius: "8px", fontWeight: 600, textDecoration: "none", fontSize: "0.95rem" }}>
                Talk to Darrin
              </Link>
            </div>
          </div>
        </section>

        {/* Breadcrumb-style back link */}
        <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <Link href="/blog" style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>
            ← Back to all articles
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
