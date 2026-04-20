import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CheckoutButton from "@/components/CheckoutButton";
import { ScrollReveal, ScrollRevealGroup } from "@/components/ScrollReveal";
import PricingFeatureBreakdown from "@/components/PricingFeatureBreakdown";

export const metadata: Metadata = {
  title: { absolute: 'Pricing | Caliber Web Studio – Monthly Web & Growth Plans' },
  description: "Simple, transparent monthly pricing for Detroit small businesses. AI-powered website plans starting at $197/mo. $0 down, no surprise fees.",
  alternates: { canonical: "https://caliberwebstudio.com/pricing" },
  openGraph: {
    title: "Pricing | Caliber Web Studio",
    description: "Monthly website and growth plans starting at $197/mo for Detroit small businesses. Starter, Growth, or Domination.",
    url: "https://caliberwebstudio.com/pricing",
    type: "website",
  },
};

const plans = [
  {
    name: "Starter",
    price: "$197",
    billing: "/mo",
    popular: false,
    cta: "Get My Free Mockup",
    features: [
      "AI-Optimized Website",
      "AI Chatbot Widget",
      "Google Business Profile Setup",
      "Schema Markup & Local SEO",
      "Basic Client Dashboard",
      "SSL & Security Updates",
      "Monthly Performance Report",
    ],
  },
  {
    name: "Growth",
    price: "$397",
    billing: "/mo",
    popular: true,
    cta: "Claim My Growth Plan",
    features: [
      "Everything in Starter",
      "Review Management System",
      "Social Media Auto-Posting",
      "AI Content Engine (Blog Posts)",
      "Full Client Dashboard",
      "Priority Support",
      "Monthly Strategy Call",
    ],
  },
  {
    name: "Domination",
    price: "$697",
    billing: "/mo",
    popular: false,
    cta: "Book My Strategy Call",
    features: [
      "Everything in Growth",
      "AI Citation Tracking",
      "AI Phone Receptionist",
      "Full Automation Suite",
      "Advanced SEO Reporting",
      "Dedicated Account Management",
      "Dedicated Monthly Strategy Call",
    ],
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does Caliber Web Studio cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Caliber Web Studio offers three managed monthly plans: Starter at $197/mo, Growth at $397/mo, and Domination at $697/mo. There is also a one-time Startup Complete package starting at $5,000. Self-serve add-on tools start at $29/mo. All monthly plans require $0 down.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a contract or long-term commitment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No contracts. All monthly plans are month-to-month. You can cancel anytime with 30 days notice. We earn your continued business every month.",
      },
    },
    {
      "@type": "Question",
      name: "What is included in the Starter plan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Starter plan at $197/mo includes a custom AI-optimized website (up to 5 pages), an AI chatbot widget, Google Business Profile setup, local SEO and AEO schema markup, SSL security, and a monthly performance report.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between Starter and Growth?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Growth adds review management (SMS + email requests, smart routing, targeting 5-10 new reviews/mo), social media auto-posting (8 posts/mo to Facebook and Instagram), and 4 AI-written blog posts per month. It also includes a monthly strategy call.",
      },
    },
    {
      "@type": "Question",
      name: "What does the Domination plan include that Growth does not?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Domination adds AI citation tracking (weekly monitoring of ChatGPT, Perplexity, Gemini, and Google AI Overviews), an AI phone receptionist, a full automation suite (missed-call text-back, appointment reminders, 5-touch nurture sequences), and dedicated account management with same-day response.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer self-serve tools without a managed plan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Caliber Web Studio offers standalone self-serve tools starting at $29/mo: a Live Google Review Widget, an Embeddable Quote Calculator, SMS Reminder and Deposit Capture, and an AI Lead Capture Chatbot. These tools work on any existing website with a simple embed code.",
      },
    },
    {
      "@type": "Question",
      name: "What is the Startup Complete package?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Startup Complete is a one-time $5,000+ package that delivers everything a new business needs in 48 hours: LLC formation guidance, domain and email setup, a full website with AI chatbot, a brand kit, social media accounts, 30 days of scheduled content, and email/SMS automation.",
      },
    },
    {
      "@type": "Question",
      name: "Do I own my website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You own all content, copy, and design assets. With a managed monthly plan the hosting and maintenance are included in your subscription. If you cancel, we provide a full export of your site files.",
      },
    },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Caliber Web Studio Plans and Tools",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Product",
        name: "Starter Plan",
        description: "Custom AI-optimized website, AI chatbot, Google Business Profile setup, local SEO and AEO, monthly reporting. $0 down.",
        offers: { "@type": "Offer", price: "197", priceCurrency: "USD", priceSpecification: { "@type": "UnitPriceSpecification", billingDuration: "P1M" } },
        url: "https://caliberwebstudio.com/pricing",
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Product",
        name: "Growth Plan",
        description: "Everything in Starter plus review management, social media auto-posting, 4 AI blog posts/mo, and monthly strategy call.",
        offers: { "@type": "Offer", price: "397", priceCurrency: "USD", priceSpecification: { "@type": "UnitPriceSpecification", billingDuration: "P1M" } },
        url: "https://caliberwebstudio.com/pricing",
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Product",
        name: "Domination Plan",
        description: "Everything in Growth plus AI citation tracking, AI phone receptionist, full automation suite, and dedicated account management.",
        offers: { "@type": "Offer", price: "697", priceCurrency: "USD", priceSpecification: { "@type": "UnitPriceSpecification", billingDuration: "P1M" } },
        url: "https://caliberwebstudio.com/pricing",
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "Product",
        name: "Live Google Review Widget",
        description: "Embeddable widget that displays your live Google reviews on any website. Simple iframe/script install.",
        offers: { "@type": "Offer", price: "29", priceCurrency: "USD", priceSpecification: { "@type": "UnitPriceSpecification", billingDuration: "P1M" } },
        url: "https://caliberwebstudio.com/tools",
      },
    },
    {
      "@type": "ListItem",
      position: 5,
      item: {
        "@type": "Product",
        name: "Embeddable Quote Calculator",
        description: "Interactive pricing calculator that captures leads and quotes automatically on any existing website.",
        offers: { "@type": "Offer", price: "29", priceCurrency: "USD", priceSpecification: { "@type": "UnitPriceSpecification", billingDuration: "P1M" } },
        url: "https://caliberwebstudio.com/tools",
      },
    },
    {
      "@type": "ListItem",
      position: 6,
      item: {
        "@type": "Product",
        name: "SMS Reminder + Deposit Capture",
        description: "Automated SMS appointment reminders with deposit collection to reduce no-shows by up to 70%.",
        offers: { "@type": "Offer", price: "49", priceCurrency: "USD", priceSpecification: { "@type": "UnitPriceSpecification", billingDuration: "P1M" } },
        url: "https://caliberwebstudio.com/tools",
      },
    },
    {
      "@type": "ListItem",
      position: 7,
      item: {
        "@type": "Product",
        name: "AI Lead Capture Chatbot",
        description: "Conversational AI chatbot that qualifies leads and captures contact info 24/7 on any website.",
        offers: { "@type": "Offer", price: "49", priceCurrency: "USD", priceSpecification: { "@type": "UnitPriceSpecification", billingDuration: "P1M" } },
        url: "https://caliberwebstudio.com/tools",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://caliberwebstudio.com" },
    { "@type": "ListItem", position: 2, name: "Pricing", item: "https://caliberwebstudio.com/pricing" },
  ],
};

export default function PricingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Nav />
      <main style={{ minHeight: "100vh", paddingTop: "0", paddingBottom: "0", background: "var(--bg, #0a0a0e)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 48px)" }}>

          {/* Hero */}
          <div style={{ textAlign: "center", marginBottom: "clamp(56px, 8vw, 96px)", paddingTop: "clamp(120px, 14vw, 160px)" }}>
            <ScrollReveal>
              <p className="sec-label fu" style={{ justifyContent: "center" }}>
                Transparent Pricing
              </p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h1 className="fu" style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(44px, 7vw, 80px)", fontWeight: 800, lineHeight: 1.05, color: "var(--text-primary, #fff)", margin: "20px 0 24px", letterSpacing: "-0.03em" }}>
                Pricing — Simple Monthly Plans
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={140}>
              <p className="fu" style={{ fontSize: "clamp(17px, 2vw, 20px)", color: "var(--text-secondary, rgba(255,255,255,0.65))", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
                $0 down. We build it first. You only pay when you love it.
              </p>
            </ScrollReveal>
          </div>

          {/* AI Answer Block — AEO */}
          <ScrollReveal>
            <div style={{ background: "rgba(0,112,243,0.06)", border: "1px solid rgba(0,112,243,0.18)", borderRadius: "14px", padding: "22px 28px", marginBottom: "56px", maxWidth: "800px", margin: "0 auto 56px" }}>
              <p style={{ fontSize: "0.7rem", fontFamily: "'Space Mono', monospace", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(0,112,243,0.7)", marginBottom: "8px" }}>Quick Answer</p>
              <p style={{ fontSize: "clamp(0.9rem, 1.6vw, 1rem)", color: "rgba(255,255,255,0.8)", lineHeight: 1.75, margin: 0 }}>
                Caliber Web Studio offers three managed monthly plans — <strong style={{ color: "#fff" }}>Starter at $197/mo</strong>, <strong style={{ color: "#fff" }}>Growth at $397/mo</strong>, and <strong style={{ color: "#fff" }}>Domination at $697/mo</strong> — plus a <strong style={{ color: "#fff" }}>$5,000 Startup Complete</strong> one-time package. Self-serve add-on tools start at <strong style={{ color: "#fff" }}>$29/mo</strong> and work on any existing website. No contracts. $0 down.
              </p>
            </div>
          </ScrollReveal>

          {/* Plans */}
          <ScrollRevealGroup className="pricing-grid" stagger={120}>
            {plans.map((plan) => (
              <div key={plan.name} className={`pricing-card${plan.popular ? " pricing-card--popular" : ""}`}>
                {plan.popular && <div className="popular-badge">Most Popular</div>}
                <p style={{ fontSize: "0.75rem", letterSpacing: "0.16em", textTransform: "uppercase", color: plan.popular ? "var(--accent, #0070f3)" : "var(--text-secondary, rgba(255,255,255,0.5))", marginBottom: "10px", fontFamily: "'Space Mono', monospace" }}>
                  {plan.name}
                </p>
                <div style={{ display: "flex", alignItems: "flex-end", gap: "2px", marginBottom: "6px" }}>
                  <span style={{ fontSize: "clamp(2.4rem, 5vw, 3rem)", fontWeight: 800, color: "var(--text-primary, #fff)", lineHeight: 1 }}>
                    {plan.price}
                  </span>
                  <span style={{ fontSize: "1rem", color: "var(--text-secondary, rgba(255,255,255,0.5))", marginBottom: "6px", fontFamily: "'Space Mono', monospace" }}>
                    {plan.billing}
                  </span>
                </div>
                <p style={{ fontSize: "0.75rem", color: "var(--text-secondary, rgba(255,255,255,0.4))", marginBottom: "32px", fontFamily: "'Space Mono', monospace", letterSpacing: "0.05em" }}>
                  billed monthly · $0 upfront
                </p>
                <ul className="pricing-features" style={{ listStyle: "none", margin: "0 0 32px 0", padding: 0, display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
                  {plan.features.map((feat) => {
                    const isDivider = feat.startsWith("Everything");
                    return (
                      <li key={feat} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: isDivider ? "0.75rem" : "0.9rem", color: isDivider ? "var(--accent, #0070f3)" : "var(--text-secondary, rgba(255,255,255,0.75))", lineHeight: 1.5, fontWeight: isDivider ? 600 : 400, letterSpacing: isDivider ? "0.04em" : undefined, marginTop: isDivider ? "4px" : undefined }}>
                        {isDivider
                          ? <span style={{ flexShrink: 0, fontSize: "0.8rem", lineHeight: 1.6, opacity: 0.8 }}>▸</span>
                          : <span style={{ color: plan.popular ? "var(--accent, #0070f3)" : "#34d399", fontSize: "1rem", lineHeight: 1.5, flexShrink: 0 }}>✓</span>
                        }
                        {feat}
                      </li>
                    );
                  })}
                </ul>
                <CheckoutButton plan={plan.name.toLowerCase()} className={`pricing-cta${plan.popular ? " pricing-cta--popular" : ""}`}>{plan.cta}</CheckoutButton>
              </div>
            ))}
          </ScrollRevealGroup>

          {/* Feature comparison table */}
          <div style={{ marginTop: "64px", marginBottom: "16px" }}>
            <ScrollReveal>
              <h2 style={{ textAlign: "center", fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 800, color: "var(--text-primary, #fff)", marginBottom: "36px", letterSpacing: "-0.02em" }}>
                What&apos;s Included — Full Comparison
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <div style={{ overflowX: "auto", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="compare-table">
                <thead>
                  <tr>
                    <th style={{ textAlign: "left" }}>Feature</th>
                    <th>Starter</th>
                    <th>Growth</th>
                    <th className="col-domination">Domination</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Custom Website", true, true, true],
                    ["Mobile Optimized", true, true, true],
                    ["AI Chatbot", true, true, true],
                    ["SEO + AEO Setup", true, true, true],
                    ["Google Business Profile", true, true, true],
                    ["Same-Day Edits", true, true, true],
                    ["Monthly Blog Posts", "—", "4/mo", "8/mo"],
                    ["Review Generation", "—", true, true],
                    ["Social Media Posts", "—", "8/mo", "12/mo"],
                    ["Competitor Monitoring", "—", "—", true],
                    ["AI Citation Tracking", "—", "—", true],
                    ["Priority Support", "—", "—", true],
                    ["Dedicated Growth Call", "—", "—", "Monthly"],
                  ].map(([feature, starter, growth, domination], i) => (
                    <tr key={String(feature)} className={i % 2 === 1 ? "row-alt" : ""}>
                      <td style={{ textAlign: "left", fontWeight: 500 }}>{feature}</td>
                      <td>{starter === true ? <span className="check">✓</span> : <span className="dash">{starter}</span>}</td>
                      <td>{growth === true ? <span className="check">✓</span> : <span className="dash">{growth}</span>}</td>
                      <td className="col-domination">{domination === true ? <span className="check">✓</span> : <span className="dash">{domination}</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </ScrollReveal>
          </div>

          {/* Feature Breakdown Accordion */}
          <div style={{ marginTop: "64px" }}>
            <ScrollReveal>
              <h2 style={{ textAlign: "center", fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 800, color: "var(--text-primary, #fff)", marginBottom: "12px", letterSpacing: "-0.02em" }}>
                What Every Feature Actually Means
              </h2>
              <p style={{ textAlign: "center", fontSize: "clamp(0.9rem, 1.6vw, 1rem)", color: "rgba(255,255,255,0.55)", maxWidth: "560px", margin: "0 auto 36px", lineHeight: 1.7 }}>
                Expand any row to see exactly what&apos;s delivered, the SLA, how much effort you need to put in, and what it would cost to buy separately.
              </p>
            </ScrollReveal>
            <PricingFeatureBreakdown />
          </div>

          {/* Self-Serve Tools */}
          <div style={{ marginTop: "80px" }}>
            <ScrollReveal>
              <div style={{ textAlign: "center", marginBottom: "40px" }}>
                <p style={{ fontSize: "0.8rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent, #0070f3)", marginBottom: "12px", fontFamily: "'Space Mono', monospace" }}>Self-Serve Floor Tier</p>
                <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 800, color: "var(--text-primary, #fff)", marginBottom: "12px", letterSpacing: "-0.01em" }}>Not Ready for Managed? Start With a Tool.</h2>
                <p style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)", color: "rgba(255,255,255,0.6)", maxWidth: "540px", margin: "0 auto", lineHeight: 1.7 }}>
                  Plug any of these into your existing website in minutes. No designer, no developer, no agency required.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <div className="tools-grid">
                {[
                  {
                    name: "Live Google Review Widget",
                    price: "$29/mo",
                    desc: "Display your live Google reviews directly on your website. Auto-updates as new reviews come in. Simple copy-paste embed code.",
                    features: ["Live Google data pull", "Customizable display widget", "Copy-paste install", "Works on any platform"],
                    href: "/tools#review-widget",
                  },
                  {
                    name: "Embeddable Quote Calculator",
                    price: "$29/mo",
                    desc: "Interactive pricing calculator that generates instant quotes and captures lead info. Built for your industry and services.",
                    features: ["Custom pricing logic", "Lead capture form", "Email notifications", "Works on any platform"],
                    href: "/tools#quote-calculator",
                  },
                  {
                    name: "SMS Reminder + Deposit",
                    price: "$49/mo",
                    desc: "Automated SMS reminders sent before every appointment. Optional deposit collection to lock in the booking and cut no-shows.",
                    features: ["Automated SMS sequences", "Deposit capture link", "Appointment sync", "Reduces no-shows ~70%"],
                    href: "/tools#sms-reminders",
                  },
                  {
                    name: "AI Lead Capture Chatbot",
                    price: "$49/mo",
                    desc: "Conversational AI widget that qualifies visitors, answers common questions, and captures contact info 24/7 — even while you sleep.",
                    features: ["24/7 lead capture", "Custom Q&A training", "CRM/email delivery", "Works on any platform"],
                    href: "/tools#ai-chatbot",
                  },
                ].map((tool) => (
                  <div key={tool.name} className="tool-card">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px", gap: "12px", flexWrap: "wrap" }}>
                      <p style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary, #fff)", margin: 0, lineHeight: 1.3 }}>{tool.name}</p>
                      <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--accent, #0070f3)", fontFamily: "'Space Mono', monospace", whiteSpace: "nowrap" }}>{tool.price}</span>
                    </div>
                    <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.65, marginBottom: "16px" }}>{tool.desc}</p>
                    <ul style={{ listStyle: "none", margin: "0 0 20px", padding: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
                      {tool.features.map((f) => (
                        <li key={f} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.82rem", color: "rgba(255,255,255,0.7)" }}>
                          <span style={{ color: "#34d399", fontSize: "0.9rem", flexShrink: 0 }}>✓</span>{f}
                        </li>
                      ))}
                    </ul>
                    <Link href={tool.href} className="tool-cta">Learn More →</Link>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Standalone clarification */}
            <ScrollReveal delay={120}>
              <div style={{ marginTop: "28px", padding: "20px 24px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", maxWidth: "700px", margin: "28px auto 0" }}>
                <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, margin: 0 }}>
                  <span style={{ fontSize: "1rem", marginRight: "8px" }}>💡</span>
                  <strong style={{ color: "rgba(255,255,255,0.85)" }}>These tools work on any existing website</strong> — Squarespace, Wix, WordPress, Shopify, or anything else. You don&apos;t need to switch platforms or hire a developer. Just copy-paste the embed code and you&apos;re live. Tools are sold separately and stack with any plan.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={160}>
              <div style={{ textAlign: "center", marginTop: "32px" }}>
                <Link href="/tools" className="btn-chrome" style={{ textDecoration: "none" }}>See All Self-Serve Tools →</Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Industry Bundles */}
          <div style={{ marginTop: "80px" }}>
            <ScrollReveal>
              <div style={{ textAlign: "center", marginBottom: "40px" }}>
                <p style={{ fontSize: "0.8rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--navy, #1E76B6)", marginBottom: "12px", fontFamily: "'Space Mono', monospace" }}>Built for Your Industry</p>
                <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 800, color: "var(--text-primary, #fff)", marginBottom: "12px", letterSpacing: "-0.01em" }}>Industry Bundles — Save $50/mo</h2>
                <p style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.05rem)", color: "rgba(255,255,255,0.6)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
                  Pre-configured plan + tool stacks matched to specific industries. Everything works together on day one.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <div className="bundles-grid">
                {[
                  {
                    name: "Med Spa Stack",
                    industry: "Med Spas & Aesthetics",
                    includes: ["Growth Plan ($397/mo)", "SMS Reminders + Deposit ($49/mo)", "AI Lead Capture Chatbot ($49/mo)"],
                    normal: "$495/mo",
                    bundle: "$445/mo",
                    savings: "Save $50/mo",
                  },
                  {
                    name: "Trade Stack",
                    industry: "Contractors & Trades",
                    includes: ["Growth Plan ($397/mo)", "Embeddable Quote Calculator ($29/mo)", "AI Lead Capture Chatbot ($49/mo)"],
                    normal: "$475/mo",
                    bundle: "$425/mo",
                    savings: "Save $50/mo",
                  },
                  {
                    name: "Salon Stack",
                    industry: "Salons & Barbershops",
                    includes: ["Growth Plan ($397/mo)", "SMS Reminders + Deposit ($49/mo)", "Live Review Widget ($29/mo)"],
                    normal: "$475/mo",
                    bundle: "$425/mo",
                    savings: "Save $50/mo",
                  },
                  {
                    name: "Gym Stack",
                    industry: "Gyms & Fitness Studios",
                    includes: ["Starter Plan ($197/mo)", "SMS Reminders + Deposit ($49/mo)"],
                    normal: "$246/mo",
                    bundle: "$196/mo",
                    savings: "Save $50/mo",
                  },
                  {
                    name: "Full Domination Stack",
                    industry: "Any Industry — Maximum Growth",
                    includes: ["Domination Plan ($697/mo)", "All 4 Self-Serve Tools ($156/mo)"],
                    normal: "$853/mo",
                    bundle: "$803/mo",
                    savings: "Save $50/mo",
                  },
                ].map((bundle) => (
                  <div key={bundle.name} className="bundle-card">
                    <p style={{ fontSize: "0.7rem", fontFamily: "'Space Mono', monospace", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "6px" }}>{bundle.industry}</p>
                    <p style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary, #fff)", marginBottom: "14px" }}>{bundle.name}</p>
                    <ul style={{ listStyle: "none", margin: "0 0 16px", padding: 0, display: "flex", flexDirection: "column", gap: "5px" }}>
                      {bundle.includes.map((item) => (
                        <li key={item} style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.65)", display: "flex", alignItems: "center", gap: "7px" }}>
                          <span style={{ color: "#34d399", fontSize: "0.85rem", flexShrink: 0 }}>✓</span>{item}
                        </li>
                      ))}
                    </ul>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "10px", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary, #fff)" }}>{bundle.bundle}</span>
                      <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.35)", textDecoration: "line-through" }}>{bundle.normal}</span>
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#34d399", fontFamily: "'Space Mono', monospace" }}>{bundle.savings}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <p style={{ textAlign: "center", marginTop: "20px", fontSize: "0.82rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>
                Bundle pricing applied automatically at checkout. <Link href="/contact" style={{ color: "var(--accent, #0070f3)", textDecoration: "underline", textUnderlineOffset: "3px" }}>Contact us</Link> if you need a custom configuration.
              </p>
            </ScrollReveal>
          </div>

          {/* Startup Complete — premium one-time offer */}
          <div style={{ marginTop: "80px" }}>
            <ScrollReveal>
              <div style={{ textAlign: "center", marginBottom: "36px" }}>
                <p style={{ fontSize: "0.8rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--navy)", marginBottom: "12px", fontFamily: "'Space Mono', monospace" }}>One-Time Investment</p>
                <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 800, color: "var(--text-primary, #fff)", marginBottom: "12px", letterSpacing: "-0.01em" }}>Launch Your Entire Business</h2>
                <p style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)", color: "var(--text-secondary, rgba(255,255,255,0.65))", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>Everything you need to go from idea to fully operational — website, brand, AI systems, and legal setup — delivered in 48 hours.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <div className="startup-card">
              <div className="startup-badge">48-Hour Delivery</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center" }}>
                <div>
                  <p style={{ fontSize: "0.75rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--navy)", marginBottom: "10px", fontFamily: "'Space Mono', monospace" }}>Startup Complete</p>
                  <span style={{ fontSize: "clamp(2.6rem, 5vw, 3.4rem)", fontWeight: 800, color: "var(--text-primary, #fff)", lineHeight: 1, display: "block", marginBottom: "6px" }}>$5,000</span>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-secondary, rgba(255,255,255,0.65))", marginBottom: "8px", fontFamily: "'Space Mono', monospace", letterSpacing: "0.05em" }}>starting price · one-time</p>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary, rgba(255,255,255,0.65))", marginBottom: "32px", lineHeight: 1.6 }}>Custom scope up to $15,000 depending on brand complexity and business needs.</p>
                  <CheckoutButton plan="startup" className="startup-cta">Launch My Business — $5,000</CheckoutButton>
                </div>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
                  {[
                    "LLC formation assistance + EIN registration guidance",
                    "Business bank account setup guidance",
                    "Domain + professional email",
                    "Full 5–7 page website + AI chatbot + Google Business Profile",
                    "Brand kit (logo, colors, fonts, social templates)",
                    "Social media accounts created & branded (3 platforms)",
                    "30 days of content scheduled & queued",
                    "Email/SMS automation setup",
                    "Pitch deck + one-pager",
                    "Everything delivered in 48 hours",
                  ].map((feat) => (
                    <li key={feat} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "0.9rem", color: "var(--text-primary, rgba(255,255,255,0.9))", lineHeight: 1.5 }}>
                      <span style={{ color: "var(--navy)", fontSize: "1rem", lineHeight: 1.5, flexShrink: 0 }}>✓</span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Decision Matrix — Managed vs Self-Serve */}
          <div style={{ marginTop: "80px" }}>
            <ScrollReveal>
              <h2 style={{ textAlign: "center", fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 800, color: "var(--text-primary, #fff)", marginBottom: "10px", letterSpacing: "-0.02em" }}>
                Managed vs. Self-Serve — Which Is Right for You?
              </h2>
              <p style={{ textAlign: "center", fontSize: "clamp(0.875rem, 1.6vw, 0.95rem)", color: "rgba(255,255,255,0.5)", maxWidth: "520px", margin: "0 auto 36px", lineHeight: 1.7 }}>
                Not sure whether to hire us to run everything or just grab a tool? Here&apos;s the honest comparison.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <div style={{ overflowX: "auto", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)" }}>
                <table className="decision-table">
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left" }}></th>
                      <th>Managed Plans<br /><span style={{ fontSize: "0.7rem", fontWeight: 400, opacity: 0.6 }}>$197–$697/mo</span></th>
                      <th>Self-Serve Tools<br /><span style={{ fontSize: "0.7rem", fontWeight: 400, opacity: 0.6 }}>$29–$49/mo</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Who runs it", "We handle everything", "You manage it"],
                      ["Setup time", "48 hours — we build it", "Minutes — copy-paste embed"],
                      ["Website required", "We build yours", "Works on your existing site"],
                      ["SEO & content", "Done-for-you monthly", "Not included"],
                      ["Support", "Dedicated account team", "Email support"],
                      ["Monthly cost", "$197–$697/mo", "$29–$49/mo per tool"],
                      ["Best for", "Busy owners who want growth without doing the work", "Cost-conscious owners who have time to DIY"],
                    ].map(([label, managed, selfServe], i) => (
                      <tr key={String(label)} className={i % 2 === 1 ? "row-alt" : ""}>
                        <td style={{ fontWeight: 600, textAlign: "left", color: "rgba(255,255,255,0.85)" }}>{label}</td>
                        <td style={{ color: "rgba(255,255,255,0.75)" }}>{managed}</td>
                        <td style={{ color: "rgba(255,255,255,0.55)" }}>{selfServe}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap", marginTop: "28px" }}>
                <Link href="/contact" className="btn-chrome" style={{ textDecoration: "none" }}>Get a Free Consultation</Link>
                <Link href="/tools" className="btn-line" style={{ textDecoration: "none" }}>Browse Self-Serve Tools</Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Inline FAQ */}
          <div style={{ marginTop: "80px" }}>
            <ScrollReveal>
              <h2 style={{ textAlign: "center", fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 800, color: "var(--text-primary, #fff)", marginBottom: "36px", letterSpacing: "-0.02em" }}>
                Pricing FAQ
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 460px), 1fr))", gap: "20px", maxWidth: "980px", margin: "0 auto" }}>
                {[
                  {
                    q: "Is there a contract?",
                    a: "No contracts, ever. All monthly plans are month-to-month. Cancel with 30 days notice. We earn your business every month.",
                  },
                  {
                    q: "Do I pay anything upfront?",
                    a: "$0 down. We build your website first. You only pay your first monthly invoice once you approve the final mockup.",
                  },
                  {
                    q: "Do I own my website?",
                    a: "Yes — all content, copy, and design assets are yours. If you ever cancel, we export your full site files so you keep everything.",
                  },
                  {
                    q: "Can I switch plans later?",
                    a: "Yes. Upgrade or downgrade at any time. Changes take effect on your next billing cycle with no penalty.",
                  },
                  {
                    q: "How fast can you get my site live?",
                    a: "Most websites are live within 48 hours of your onboarding call. Complex or custom builds may take up to 7 business days.",
                  },
                  {
                    q: "What if I already have a website?",
                    a: "We can either redesign it or leave it in place and add self-serve tools. We work with any existing platform.",
                  },
                  {
                    q: "Do the self-serve tools work without a managed plan?",
                    a: "Yes. Tools are completely standalone. They install on any website — Squarespace, WordPress, Wix, Shopify, or custom — with a simple embed code.",
                  },
                  {
                    q: "What happens if I cancel?",
                    a: "Just give us 30 days notice. We hand over all your files and assets. No penalty, no games. We want you to win either way.",
                  },
                ].map((item) => (
                  <div key={item.q} style={{ padding: "22px 24px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "14px" }}>
                    <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary, #fff)", marginBottom: "8px", lineHeight: 1.4 }}>{item.q}</p>
                    <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, margin: 0 }}>{item.a}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* FAQ teaser — sends to /faq */}
          <ScrollReveal>
            <div style={{ marginTop: "64px", textAlign: "center", padding: "44px 32px", background: "var(--card-bg, rgba(255,255,255,0.04))", borderRadius: "20px", border: "1px solid var(--border-color, rgba(255,255,255,0.08))" }}>
            <p style={{ fontSize: "0.8rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent, #0070f3)", marginBottom: "12px", fontFamily: "'Space Mono', monospace" }}>Got More Questions?</p>
            <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 800, color: "var(--text-primary, #fff)", marginBottom: "14px", letterSpacing: "-0.01em" }}>We&apos;ve answered the most common ones.</h2>
            <p style={{ color: "var(--text-secondary, rgba(255,255,255,0.65))", marginBottom: "28px", fontSize: "1rem", lineHeight: 1.7, maxWidth: "460px", margin: "0 auto 28px" }}>Timelines, ownership, cancellation, and more — all in one place.</p>
            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/faq" className="btn-chrome" style={{ textDecoration: "none" }}>Browse the Full FAQ</Link>
              <Link href="/contact" className="btn-line" style={{ textDecoration: "none" }}>Talk to a Human</Link>
            </div>
            </div>
          </ScrollReveal>

        </div>
      </main>
      <Footer />
      <style>{`
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 32px;
          align-items: stretch;
        }
        .pricing-card {
          position: relative;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 20px;
          padding: 36px 28px 32px;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          display: flex;
          flex-direction: column;
          min-height: 100%;
        }
        .pricing-features {
          flex: 1;
        }
        .pricing-card:hover {
          transform: translateY(-6px);
          border-color: rgba(255,255,255,0.22);
          box-shadow: 0 20px 60px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.1);
        }
        [data-theme="light"] .pricing-card {
          background: #fff;
          border-color: rgba(0,0,0,0.08);
        }
        [data-theme="light"] .pricing-card:hover {
          border-color: rgba(0,0,0,0.15);
          box-shadow: 0 20px 60px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.08);
        }
        [data-theme="light"] .pricing-card p,
        [data-theme="light"] .pricing-card li { color: #1a1a1a !important; }
        .pricing-card--popular {
          background: linear-gradient(145deg, rgba(0,112,243,0.14) 0%, rgba(0,112,243,0.06) 100%);
          border-color: rgba(0,112,243,0.45);
          box-shadow: 0 0 0 1px rgba(0,112,243,0.2), 0 8px 40px rgba(0,112,243,0.18);
        }
        .pricing-card--popular:hover {
          transform: translateY(-6px);
          box-shadow: 0 0 0 1px rgba(0,112,243,0.35), 0 24px 64px rgba(0,112,243,0.28);
          border-color: rgba(0,112,243,0.65);
        }
        .popular-badge {
          position: absolute;
          top: -14px;
          left: 50%;
          transform: translateX(-50%);
          background: #0070f3;
          color: #fff;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 5px 16px;
          border-radius: 20px;
          white-space: nowrap;
          font-family: 'Space Mono', monospace;
          box-shadow: 0 4px 20px rgba(0,112,243,0.45);
        }
        .pricing-cta {
          display: block;
          text-align: center;
          padding: 13px 24px;
          border-radius: 9px;
          font-weight: 700;
          font-size: 0.9rem;
          text-decoration: none;
          letter-spacing: 0.04em;
          transition: opacity 0.2s, transform 0.2s;
          background: rgba(255,255,255,0.08);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.12);
        }
        .pricing-cta:hover {
          opacity: 0.85;
          transform: translateY(-1px);
        }
        .pricing-cta--popular {
          background: #0070f3;
          color: #fff;
          border-color: transparent;
          box-shadow: 0 4px 20px rgba(0,112,243,0.4);
        }
        .startup-card { position: relative; z-index: 2; background: linear-gradient(145deg, rgba(0,118,182,0.1) 0%, rgba(0,118,182,0.04) 60%, rgba(255,255,255,0.03) 100%); border: 1px solid rgba(0,118,182,0.35); border-radius: 24px; padding: 52px 48px 48px; box-shadow: 0 0 0 1px rgba(0,118,182,0.12), 0 12px 60px rgba(0,118,182,0.12); transition: box-shadow 0.3s ease, border-color 0.3s ease; }
        .startup-card:hover { border-color: rgba(0,118,182,0.55); box-shadow: 0 0 0 1px rgba(0,118,182,0.2), 0 20px 80px rgba(0,118,182,0.2); }
        .startup-badge { position: absolute; top: -14px; left: 50%; transform: translateX(-50%); background: var(--navy); color: #fff; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; padding: 5px 18px; border-radius: 20px; white-space: nowrap; font-family: 'Space Mono', monospace; box-shadow: 0 4px 20px rgba(0,118,182,0.45); }
        .startup-cta { display: inline-block; padding: 14px 32px; background: var(--navy); color: #fff; border-radius: 9px; font-weight: 700; font-size: 0.9rem; text-decoration: none; letter-spacing: 0.04em; transition: opacity 0.2s, transform 0.2s; box-shadow: 0 4px 24px rgba(0,118,182,0.35); }
        .startup-cta:hover { opacity: 0.9; transform: translateY(-2px); }
        [data-theme="light"] .startup-card { background: linear-gradient(145deg, rgba(0,118,182,0.07) 0%, rgba(0,118,182,0.03) 100%); border-color: rgba(0,118,182,0.35); }
        [data-theme="light"] .startup-card p,
        [data-theme="light"] .startup-card li { color: #1a1a1a !important; }
        /* Feature comparison table */
        .compare-table {
          width: 100%;
          border-collapse: collapse;
          background: var(--bg);
          font-size: 0.9rem;
          color: rgba(255,255,255,0.8);
          min-width: 480px;
        }
        .compare-table th {
          background: var(--bg2);
          padding: 14px 20px;
          font-family: 'Space Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          text-align: center;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .compare-table td {
          padding: 13px 20px;
          text-align: center;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.75);
        }
        .compare-table .row-alt td { background: rgba(255,255,255,0.02); }
        .compare-table .col-domination {
          border-left: 2px solid rgba(37,99,235,0.4);
          background: rgba(37,99,235,0.04);
        }
        .compare-table th.col-domination {
          border-left: 2px solid rgba(37,99,235,0.4);
          background: rgba(37,99,235,0.1);
          color: #93c5fd;
        }
        .compare-table .check {
          color: #2563eb;
          font-size: 1rem;
          font-weight: 700;
        }
        .compare-table .dash {
          color: rgba(255,255,255,0.3);
          font-family: 'Space Mono', monospace;
          font-size: 0.8rem;
        }
        [data-theme="light"] .compare-table { background: #fff; color: #1a1a1a; }
        [data-theme="light"] .compare-table th { background: #f5f5f7; color: #6e6e73; }
        [data-theme="light"] .compare-table td { color: #374151; border-bottom-color: rgba(0,0,0,0.05); }
        [data-theme="light"] .compare-table .row-alt td { background: rgba(0,0,0,0.02); }
        [data-theme="light"] .compare-table .col-domination { background: rgba(37,99,235,0.04); }
        [data-theme="light"] .compare-table .dash { color: #9ca3af; }
        /* Self-serve tools grid */
        .tools-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .tool-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 24px;
          transition: border-color 0.2s, background 0.2s;
        }
        .tool-card:hover {
          border-color: rgba(0,112,243,0.3);
          background: rgba(0,112,243,0.04);
        }
        .tool-cta {
          display: inline-block;
          padding: 9px 18px;
          background: transparent;
          border: 1px solid rgba(0,112,243,0.4);
          border-radius: 7px;
          color: var(--accent, #0070f3);
          font-size: 0.82rem;
          font-weight: 700;
          text-decoration: none;
          letter-spacing: 0.04em;
          transition: background 0.2s, border-color 0.2s;
        }
        .tool-cta:hover {
          background: rgba(0,112,243,0.1);
          border-color: rgba(0,112,243,0.65);
        }
        /* Industry bundles grid */
        .bundles-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .bundle-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 24px;
          transition: border-color 0.2s, background 0.2s;
        }
        .bundle-card:hover {
          border-color: rgba(52,211,153,0.3);
          background: rgba(52,211,153,0.03);
        }
        /* Decision matrix table */
        .decision-table {
          width: 100%;
          border-collapse: collapse;
          background: var(--bg);
          font-size: 0.9rem;
          min-width: 480px;
        }
        .decision-table th {
          background: var(--bg2);
          padding: 14px 20px;
          font-family: 'Space Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          text-align: center;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .decision-table td {
          padding: 14px 20px;
          text-align: center;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.7);
          line-height: 1.5;
          font-size: 0.875rem;
        }
        .decision-table .row-alt td { background: rgba(255,255,255,0.02); }
        [data-theme="light"] .decision-table { background: #fff; }
        [data-theme="light"] .decision-table th { background: #f5f5f7; color: #6e6e73; }
        [data-theme="light"] .decision-table td { color: #374151; border-bottom-color: rgba(0,0,0,0.05); }
        [data-theme="light"] .decision-table .row-alt td { background: rgba(0,0,0,0.02); }
        @media (max-width: 900px) {
          .pricing-grid {
            grid-template-columns: 1fr;
            max-width: 440px;
            margin-left: auto;
            margin-right: auto;
          }
          .tools-grid { grid-template-columns: 1fr; }
          .bundles-grid { grid-template-columns: 1fr 1fr; }
          .startup-card { padding: 48px 28px 36px; }
          .startup-card > div { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 600px) {
          .startup-card { padding: 44px 20px 32px; }
          .bundles-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
