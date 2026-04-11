import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CheckoutButton from "@/components/CheckoutButton";
import { ScrollReveal, ScrollRevealGroup } from "@/components/ScrollReveal";

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
      "Weekly Strategy Sessions",
    ],
  },
];


export default function PricingPage() {
  return (
    <>
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
                    ["48hr Turnaround", true, true, true],
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

          {/* Startup Complete — premium one-time offer */}
          <div style={{ marginTop: "72px" }}>
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

          {/* FAQ teaser — sends to /faq */}
          <ScrollReveal>
            <div style={{ marginTop: "80px", textAlign: "center", padding: "44px 32px", background: "var(--card-bg, rgba(255,255,255,0.04))", borderRadius: "20px", border: "1px solid var(--border-color, rgba(255,255,255,0.08))" }}>
            <p style={{ fontSize: "0.8rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent, #0070f3)", marginBottom: "12px", fontFamily: "'Space Mono', monospace" }}>Got Questions?</p>
            <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 800, color: "var(--text-primary, #fff)", marginBottom: "14px", letterSpacing: "-0.01em" }}>We&apos;ve answered the most common ones.</h2>
            <p style={{ color: "var(--text-secondary, rgba(255,255,255,0.65))", marginBottom: "28px", fontSize: "1rem", lineHeight: 1.7, maxWidth: "460px", margin: "0 auto 28px" }}>Pricing, timelines, ownership, cancellation, and more — all in one place.</p>
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
        @media (max-width: 900px) {
          .pricing-grid {
            grid-template-columns: 1fr;
            max-width: 440px;
            margin-left: auto;
            margin-right: auto;
          }
          .startup-card { padding: 48px 28px 36px; }
          .startup-card > div { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 600px) {
          .startup-card { padding: 44px 20px 32px; }
        }
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
      `}</style>
    </>
  );
}
