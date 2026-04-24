import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: { absolute: "Thank You | Caliber Web Studio" },
  description: "Your payment was received. Welcome to Caliber Web Studio — we'll be in touch within 24 hours to get started.",
  alternates: { canonical: "https://www.caliberwebstudio.com/thank-you" },
};

export default function ThankYouPage() {
  return (
    <>
      <Nav />
      <main style={{ minHeight: "100vh", paddingTop: "80px", paddingBottom: "80px", background: "var(--bg, #0a0a0e)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>

          <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "rgba(0,112,243,0.15)", border: "2px solid rgba(0,112,243,0.4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px", fontSize: "2rem" }}>
            ✓
          </div>

          <p style={{ fontSize: "0.8rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent, #0070f3)", marginBottom: "16px", fontFamily: "'Space Mono', monospace" }}>
            Payment Received
          </p>

          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "var(--text-primary, #fff)", marginBottom: "20px", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Welcome to Caliber Web Studio
          </h1>

          <p style={{ fontSize: "1.05rem", color: "var(--text-secondary, rgba(255,255,255,0.65))", lineHeight: 1.7, marginBottom: "48px" }}>
            Your payment was confirmed. Your Caliber team will reach out within <strong style={{ color: "var(--text-primary, #fff)" }}>24 hours</strong> to kick things off and collect your business details.
          </p>

          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "32px", marginBottom: "40px", textAlign: "left" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary, #fff)", marginBottom: "20px" }}>What happens next</h2>
            <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                ["24 hrs", "A Caliber specialist contacts you to collect your business info, brand assets, and goals"],
                ["3 days", "Your AI-optimized website mockup is ready for review"],
                ["Go-live", "After your approval, your site goes live and all included services are activated"],
              ].map(([time, text]) => (
                <li key={time} style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.1em", color: "var(--accent, #0070f3)", background: "rgba(0,112,243,0.1)", border: "1px solid rgba(0,112,243,0.25)", borderRadius: "6px", padding: "4px 10px", whiteSpace: "nowrap", marginTop: "2px" }}>{time}</span>
                  <span style={{ fontSize: "0.9rem", color: "var(--text-secondary, rgba(255,255,255,0.7))", lineHeight: 1.6 }}>{text}</span>
                </li>
              ))}
            </ol>
          </div>

          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary, rgba(255,255,255,0.45))", marginBottom: "32px" }}>
            Questions? Email us at{" "}
            <a href="mailto:darrin@caliberwebstudio.com" style={{ color: "var(--accent, #0070f3)", textDecoration: "none" }}>
              darrin@caliberwebstudio.com
            </a>
          </p>

          <Link href="/" style={{ display: "inline-block", padding: "13px 32px", background: "rgba(255,255,255,0.08)", color: "#fff", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "0.9rem", border: "1px solid rgba(255,255,255,0.12)" }}>
            Back to Home
          </Link>

        </div>
      </main>
      <Footer />
    </>
  );
}
