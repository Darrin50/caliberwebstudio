"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What does Caliber Web Studio do?",
    answer:
      "Caliber Web Studio designs and builds high-performance websites for local businesses in Detroit and across Michigan. We handle everything from design and development to SEO, AI chatbots, Google Business Profile optimization, and ongoing content—so you can focus on running your business.",
  },
  {
    question: "How much does a website cost?",
    answer:
      "Our plans start at $197/mo with $0 down. The Launch Plan ($197/mo) includes a 5-page custom website with mobile-first design, basic SEO, and Google Business Profile setup. The Growth Plan ($397/mo) adds advanced SEO, an AI chatbot, review automation, and monthly content. The Scale Plan ($697/mo) is our full-service package with everything included.",
  },
  {
    question: "Do I need to pay anything upfront?",
    answer:
      "No. We believe in earning your trust before you spend a dollar. All plans start with $0 down—you only pay your monthly fee after your site goes live.",
  },
  {
    question: "How long does it take to build a website?",
    answer:
      "Most websites are designed, built, and launched within 2–4 weeks depending on the plan and how quickly we receive your content and feedback. We work efficiently and keep you in the loop throughout the process.",
  },
  {
    question: "Will my website show up on Google?",
    answer:
      "Yes—SEO is built into every plan. We optimize your site structure, content, and metadata so Google can find and rank your pages. Higher-tier plans include advanced SEO, local keyword targeting, and monthly content to continuously improve your rankings.",
  },
  {
    question: "What is an AI-powered website?",
    answer:
      "An AI-powered website uses intelligent tools to engage visitors, answer questions, and convert leads automatically. This includes AI chatbots that respond 24/7, smart contact forms, and content strategies informed by data—helping your business grow even while you sleep.",
  },
  {
    question: "Do you serve businesses outside Detroit?",
    answer:
      "Absolutely. While we're based in Detroit and specialize in serving Metro Detroit businesses—including Dearborn, Warren, Sterling Heights, and Ann Arbor—we work with clients across Michigan and the United States.",
  },
  {
    question: "What happens if I need changes to my website?",
    answer:
      "Updates and changes are included in your monthly plan. Just reach out and our team will handle it. For larger redesigns or new sections, we'll discuss scope and timeline with you directly.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" style={{ padding: "80px 24px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", fontSize: "clamp(1.5rem, 4vw, 2.5rem)", marginBottom: "48px", color: "var(--text-primary, #fff)" }}>
        Frequently Asked Questions
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {faqs.map((faq, i) => (
          <div
            key={i}
            style={{
              border: "1px solid var(--border-color, rgba(255,255,255,0.1))",
              borderRadius: "12px",
              overflow: "hidden",
              background: "var(--card-bg, rgba(255,255,255,0.04))",
            }}
          >
            <button
              onClick={() => toggle(i)}
              aria-expanded={openIndex === i}
              style={{
                width: "100%",
                background: "none",
                border: "none",
                padding: "20px 24px",
                textAlign: "left",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "16px",
                color: "var(--text-primary, #fff)",
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              <span>{faq.question}</span>
              <span style={{ flexShrink: 0, fontSize: "1.25rem", transition: "transform 0.2s", transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)" }}>
                +
              </span>
            </button>
            {openIndex === i && (
              <div
                className="faq-answer"
                style={{
                  padding: "0 24px 20px",
                  color: "var(--text-secondary, rgba(255,255,255,0.7))",
                  lineHeight: 1.7,
                  fontSize: "0.95rem",
                }}
              >
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
