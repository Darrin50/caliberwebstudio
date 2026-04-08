import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: { absolute: "Contact | Caliber Web Studio – Book Your Free Strategy Call" },
  description: "Book a free strategy call with Caliber Web Studio. Tell us about your business and we'll put together a custom plan to get you more clients.",
  alternates: { canonical: "https://caliberwebstudio.com/contact" },
  openGraph: {
    title: "Contact | Caliber Web Studio",
    description: "Book a free strategy call and get a custom web growth plan for your business.",
    url: "https://caliberwebstudio.com/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main style={{ minHeight: "100vh", paddingTop: "80px", paddingBottom: "80px", background: "var(--bg, #0a0a0e)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>

          {/* Hero */}
          <div style={{ textAlign: "center", marginBottom: "64px", paddingTop: "40px" }}>
            <p style={{ fontSize: "0.8rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent, #0070f3)", marginBottom: "16px", fontFamily: "'Space Mono', monospace" }}>
              Free Strategy Call
            </p>
            <h1 style={{ fontSize: "clamp(2rem, 5.5vw, 3.75rem)", fontWeight: 800, lineHeight: 1.1, color: "var(--text-primary)", marginBottom: "20px", letterSpacing: "-0.02em", position: "relative", zIndex: 10 }}>
              Contact Us — Let&apos;s Build Something
            </h1>
            <p style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "var(--text-secondary, rgba(255,255,255,0.65))", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
              Tell us about your business and we&apos;ll put together a custom plan to get you more clients.
            </p>
          </div>

          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start" }}>
            {/* Contact Form */}
            <div style={{ background: "var(--card-bg, rgba(255,255,255,0.04))", border: "1px solid var(--border-color, rgba(255,255,255,0.08))", borderRadius: "20px", padding: "40px 36px" }}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "28px", letterSpacing: "-0.01em" }}>
                Book Your Free Strategy Call
              </h2>
              <form action="https://formsubmit.co/singerdarrin50.ds@gmail.com" method="POST" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <input type="hidden" name="_subject" value="New Lead from Caliber Web Studio" />
                <input type="hidden" name="_next" value="https://caliberwebstudio.com/startup-complete" />
                <input type="hidden" name="_captcha" value="false" />

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: "8px", fontFamily: "'Space Mono', monospace" }}>Name *</label>
                  <input type="text" name="name" required placeholder="Your full name" style={{ width: "100%", padding: "12px 16px", background: "var(--card-bg)", border: "1px solid var(--border-color)", borderRadius: "8px", color: "var(--text-primary)", fontSize: "0.95rem", fontFamily: "'Inter', sans-serif", boxSizing: "border-box", outline: "none" }} />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: "8px", fontFamily: "'Space Mono', monospace" }}>Business Name *</label>
                  <input type="text" name="business_name" required placeholder="Your business name" style={{ width: "100%", padding: "12px 16px", background: "var(--card-bg)", border: "1px solid var(--border-color)", borderRadius: "8px", color: "var(--text-primary)", fontSize: "0.95rem", fontFamily: "'Inter', sans-serif", boxSizing: "border-box", outline: "none" }} />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: "8px", fontFamily: "'Space Mono', monospace" }}>Phone</label>
                  <input type="tel" name="phone" placeholder="(313) 555-0100" style={{ width: "100%", padding: "12px 16px", background: "var(--card-bg)", border: "1px solid var(--border-color)", borderRadius: "8px", color: "var(--text-primary)", fontSize: "0.95rem", fontFamily: "'Inter', sans-serif", boxSizing: "border-box", outline: "none" }} />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: "8px", fontFamily: "'Space Mono', monospace" }}>Email *</label>
                  <input type="email" name="email" required placeholder="you@yourbusiness.com" style={{ width: "100%", padding: "12px 16px", background: "var(--card-bg)", border: "1px solid var(--border-color)", borderRadius: "8px", color: "var(--text-primary)", fontSize: "0.95rem", fontFamily: "'Inter', sans-serif", boxSizing: "border-box", outline: "none" }} />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: "8px", fontFamily: "'Space Mono', monospace" }}>Tell Us About Your Business</label>
                  <textarea name="message" rows={4} placeholder="What kind of business do you run? What are your biggest challenges right now?" style={{ width: "100%", padding: "12px 16px", background: "var(--card-bg)", border: "1px solid var(--border-color)", borderRadius: "8px", color: "var(--text-primary)", fontSize: "0.95rem", fontFamily: "'Inter', sans-serif", boxSizing: "border-box", outline: "none", resize: "vertical" }} />
                </div>

                <button type="submit" style={{ padding: "14px 32px", background: "var(--accent, #0070f3)", color: "#fff", border: "none", borderRadius: "9px", fontWeight: 700, fontSize: "1rem", cursor: "pointer", letterSpacing: "0.02em", marginTop: "4px" }}>
                  Send Your Details →
                </button>
              </form>
            </div>

            {/* Right Side */}
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              <div>
                <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "20px", letterSpacing: "-0.01em" }}>
                  What Happens Next?
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {[
                    { step: "01", title: "We review your submission", desc: "We look over your business details and do a quick audit of your current online presence." },
                    { step: "02", title: "You get a custom plan", desc: "We put together a tailored growth plan — no templates, no fluff." },
                    { step: "03", title: "We build. You grow.", desc: "Site live in as little as 3 days. $0 down to get started." },
                  ].map((item) => (
                    <div key={item.step} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                      <div style={{ flexShrink: 0, width: "36px", height: "36px", borderRadius: "8px", background: "rgba(0,112,243,0.15)", border: "1px solid rgba(0,112,243,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", fontWeight: 700, color: "var(--accent, #0070f3)" }}>
                        {item.step}
                      </div>
                      <div>
                        <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>{item.title}</div>
                        <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: "var(--card-bg, rgba(255,255,255,0.04))", border: "1px solid var(--border-color, rgba(255,255,255,0.08))", borderRadius: "16px", padding: "28px" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "20px" }}>
                  Prefer to reach out directly?
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <a href="mailto:darrin@caliberwebstudio.com" style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.9rem" }}>
                    <span style={{ width: "6px", height: "6px", background: "var(--navy)", flexShrink: 0 }} />
                    darrin@caliberwebstudio.com
                  </a>
                  <a href="tel:+13137992315" style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.9rem" }}>
                    <span style={{ width: "6px", height: "6px", background: "var(--navy)", flexShrink: 0 }} />
                    (313) 799-2315
                  </a>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                    <span style={{ width: "6px", height: "6px", background: "var(--navy)", flexShrink: 0 }} />
                    Detroit, Michigan
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                    <span style={{ width: "6px", height: "6px", background: "var(--navy)", flexShrink: 0 }} />
                    Response within 1 business day
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div style={{ textAlign: "center", marginTop: "80px", padding: "52px 32px", background: "var(--card-bg, rgba(255,255,255,0.04))", borderRadius: "20px", border: "1px solid var(--border-color, rgba(255,255,255,0.08))" }}>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "14px", letterSpacing: "-0.01em" }}>
              Ready to see the pricing?
            </h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: "28px", fontSize: "1rem", lineHeight: 1.7 }}>
              All plans start at $0 down. No contracts — ever. Cancel anytime with 30 days notice.
            </p>
            <Link href="/pricing" style={{ display: "inline-block", padding: "14px 36px", background: "var(--accent, #0070f3)", color: "#fff", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "0.95rem", letterSpacing: "0.02em" }}>
              View Pricing Plans
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <style>{`
        input::placeholder, textarea::placeholder { color: rgba(14,16,32,0.35); }
        [data-theme="dark"] input::placeholder, [data-theme="dark"] textarea::placeholder { color: rgba(255,255,255,0.25); }
        input:focus, textarea:focus { border-color: rgba(0,112,243,0.5) !important; box-shadow: 0 0 0 3px rgba(0,112,243,0.12); }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
                }
