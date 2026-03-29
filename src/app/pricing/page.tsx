import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CheckoutButton from "@/components/CheckoutButton";

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
    features: [
      "AI-optimized website",
      "AI chatbot widget",
      "Google Business Profile setup",
      "Schema markup & local SEO",
      "Basic client dashboard",
      "Hosting & SSL included",
      "1 monthly update request",
      "Text & email support",
    ],
  },
  {
    name: "Growth",
    price: "$397",
    billing: "/mo",
    popular: true,
    features: [
      "Everything in Starter",
      "Review management system",
      "Social media auto-posting",
      "AI content engine (blog posts)",
      "Full client dashboard",
      "Priority support",
    ],
  },
  {
    name: "Domination",
    price: "$697",
    billing: "/mo",
    popular: false,
    features: [
      "Everything in Growth",
      "AI citation tracking",
      "AI phone receptionist",
      "Full automation suite",
      "Advanced SEO reporting",
      "Dedicated account management",
    ],
  },
];

const faqs = [
  {
    q: "Is there any upfront cost?",
    a: "$0 down. We build your site first, show you a free mockup, and you only start paying when you say yes. Your first payment kicks in when you are happy with the result.",
  },
  {
    q: "How long does it take to get my site live?",
    a: "We deliver in as little as 3 business days after you send us your business info. Our AI-powered process is built for speed without sacrificing quality.",
  },
  {
    q: "What is included in the monthly plan?",
    a: "Your plan covers design, development, hosting, SSL, ongoing support, and monthly updates. No separate hosting bill, no hidden fees — it is all in one flat monthly rate.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Plans start with a 12-month agreement. After month 12, cancel anytime with 30 days notice.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit/debit cards and ACH bank transfer via Stripe. You will receive a secure billing link once you are ready to get started.",
  },
];

export default function PricingPage() {
  return (
    <>
      <Nav />
      <main style={{ minHeight: "100vh", paddingTop: "80px", paddingBottom: "80px", background: "var(--bg, #0a0a0e)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>

          {/* Hero */}
          <div style={{ textAlign: "center", marginBottom: "72px", paddingTop: "40px" }}>
            <p style={{ fontSize: "0.8rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent, #0070f3)", marginBottom: "16px", fontFamily: "'Space Mono', monospace" }}>
              Transparent Pricing
            </p>
            <h1 style={{ fontSize: "clamp(2rem, 5.5vw, 3.75rem)", fontWeight: 800, lineHeight: 1.1, color: "var(--text-primary, #fff)", marginBottom: "20px", letterSpacing: "-0.02em" }}>
              Simple Monthly Plans
            </h1>
            <p style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "var(--text-secondary, rgba(255,255,255,0.65))", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
              $0 down. We build the site first — you only pay when you love it. Everything included in one flat monthly rate.
            </p>
          </div>

          {/* Plans */}
          <div className="pricing-grid">
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
                <ul style={{ listStyle: "none", margin: "0 0 36px 0", padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                  {plan.features.map((feat) => (
                    <li key={feat} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "0.9rem", color: "var(--text-secondary, rgba(255,255,255,0.75))", lineHeight: 1.5 }}>
                      <span style={{ color: plan.popular ? "var(--accent, #0070f3)" : "#34d399", fontSize: "1rem", lineHeight: 1.5, flexShrink: 0 }}>✓</span>
                      {feat}
                    </li>
                  ))}
                </ul>
                <CheckoutButton plan={plan.name.toLowerCase()} className={`pricing-cta${plan.popular ? " pricing-cta--popular" : ""}`}>Get Started — $0 Down</CheckoutButton>
              </div>
            ))}
          </div>

          {/* Startup Complete — premium one-time offer */}
          <div style={{ marginTop: "72px" }}>
            <div style={{ textAlign: "center", marginBottom: "36px" }}>
              <p style={{ fontSize: "0.8rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#f59e0b", marginBottom: "12px", fontFamily: "'Space Mono', monospace" }}>One-Time Investment</p>
              <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 800, color: "var(--text-primary, #fff)", marginBottom: "12px", letterSpacing: "-0.01em" }}>Launch Your Entire Business</h2>
              <p style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)", color: "var(--text-secondary, rgba(255,255,255,0.65))", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>Everything you need to go from idea to fully operational — website, brand, AI systems, and legal setup — delivered in 48 hours.</p>
            </div>
            <div className="startup-card">
              <div className="startup-badge">48-Hour Delivery</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center" }}>
                <div>
                  <p style={{ fontSize: "0.75rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#f59e0b", marginBottom: "10px", fontFamily: "'Space Mono', monospace" }}>Startup Complete</p>
                  <span style={{ fontSize: "clamp(2.6rem, 5vw, 3.4rem)", fontWeight: 800, color: "var(--text-primary, #fff)", lineHeight: 1, display: "block", marginBottom: "6px" }}>$5,000</span>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-secondary, rgba(255,255,255,0.65))", marginBottom: "8px", fontFamily: "'Space Mono', monospace", letterSpacing: "0.05em" }}>starting price · one-time</p>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary, rgba(255,255,255,0.65))", marginBottom: "32px", lineHeight: 1.6 }}>Custom scope up to $15,000 depending on brand complexity and business needs.</p>
                  <CheckoutButton plan="startup" className="startup-cta">Get Started — $5,000</CheckoutButton>
                </div>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
                  {[
                    "LLC + EIN filing assistance",
                    "Full web presence (website + SEO + chatbot + GBP)",
                    "AI systems setup (chatbot, review automation, content engine)",
                    "Complete brand kit (logo direction, colors, fonts, social templates)",
                    "Everything delivered in 48 hours",
                  ].map((feat) => (
                    <li key={feat} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "0.9rem", color: "var(--text-primary, rgba(255,255,255,0.9))", lineHeight: 1.5 }}>
                      <span style={{ color: "#f59e0b", fontSize: "1rem", lineHeight: 1.5, flexShrink: 0 }}>✓</span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "96px" }}>
            <div style={{ textAlign: "center", marginBottom: "52px" }}>
              <p style={{ fontSize: "0.8rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent, #0070f3)", marginBottom: "12px", fontFamily: "'Space Mono', monospace" }}>FAQ</p>
              <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 800, color: "var(--text-primary, #fff)", marginBottom: "0", letterSpacing: "-0.01em" }}>Common Questions</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "760px", margin: "0 auto" }}>
              {faqs.map((faq, i) => (
                <div key={i} style={{ background: "var(--card-bg, rgba(255,255,255,0.04))", border: "1px solid var(--border-color, rgba(255,255,255,0.08))", borderRadius: "14px", padding: "28px 32px" }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary, #fff)", marginBottom: "10px", lineHeight: 1.4 }}>{faq.q}</h3>
                  <p style={{ fontSize: "0.9rem", color: "var(--text-secondary, rgba(255,255,255,0.65))", lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ textAlign: "center", marginTop: "80px", padding: "52px 32px", background: "var(--card-bg, rgba(255,255,255,0.04))", borderRadius: "20px", border: "1px solid var(--border-color, rgba(255,255,255,0.08))" }}>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "var(--text-primary, #fff)", marginBottom: "14px", letterSpacing: "-0.01em" }}>Not sure which plan is right for you?</h2>
            <p style={{ color: "var(--text-secondary, rgba(255,255,255,0.65))", marginBottom: "28px", fontSize: "1rem", lineHeight: 1.7 }}>Book a free 15-minute call and we will recommend the best monthly plan for your goals and budget.</p>
            <Link href="/#contact" style={{ display: "inline-block", padding: "14px 36px", background: "var(--accent, #0070f3)", color: "#fff", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "0.95rem", letterSpacing: "0.02em" }}>Book a Free Consultation</Link>
          </div>

        </div>
      </main>
      <Footer />
      <style>{`
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 32px;
          align-items: start;
        }
        .pricing-card {
          position: relative;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 20px;
          padding: 36px 28px 32px;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .pricing-card:hover {
          transform: translateY(-6px);
          border-color: rgba(255,255,255,0.18);
          box-shadow: 0 20px 60px rgba(0,0,0,0.35);
        }
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
        .startup-card { position: relative; z-index: 2; background: linear-gradient(145deg, rgba(245,158,11,0.1) 0%, rgba(245,158,11,0.04) 60%, rgba(255,255,255,0.03) 100%); border: 1px solid rgba(245,158,11,0.35); border-radius: 24px; padding: 52px 48px 48px; box-shadow: 0 0 0 1px rgba(245,158,11,0.12), 0 12px 60px rgba(245,158,11,0.12); transition: box-shadow 0.3s ease, border-color 0.3s ease; }
        .startup-card:hover { border-color: rgba(245,158,11,0.55); box-shadow: 0 0 0 1px rgba(245,158,11,0.2), 0 20px 80px rgba(245,158,11,0.2); }
        .startup-badge { position: absolute; top: -14px; left: 50%; transform: translateX(-50%); background: linear-gradient(90deg, #d97706, #f59e0b); color: #000; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; padding: 5px 18px; border-radius: 20px; white-space: nowrap; font-family: 'Space Mono', monospace; box-shadow: 0 4px 20px rgba(245,158,11,0.45); }
        .startup-cta { display: inline-block; padding: 14px 32px; background: linear-gradient(90deg, #d97706, #f59e0b); color: #000; border-radius: 9px; font-weight: 700; font-size: 0.9rem; text-decoration: none; letter-spacing: 0.04em; transition: opacity 0.2s, transform 0.2s; box-shadow: 0 4px 24px rgba(245,158,11,0.35); }
        .startup-cta:hover { opacity: 0.9; transform: translateY(-2px); }
        [data-theme="light"] .startup-card { background: linear-gradient(145deg, rgba(245,158,11,0.07) 0%, rgba(245,158,11,0.03) 100%); border-color: rgba(245,158,11,0.45); }
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
      `}</style>
    </>
  );
}
