"use client";

import { useState, useRef, useEffect } from "react";

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

/* ── Individual FAQ row ── */
function FaqItem({
  index,
  question,
  answer,
  isOpen,
  onToggle,
}: {
  index: number;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const answerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (answerRef.current) {
      setHeight(isOpen ? answerRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  const num = String(index + 1).padStart(2, "0");
  const active = isOpen || hovered;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: "16px",
        overflow: "hidden",
        marginBottom: "8px",
        transition: "transform 0.22s ease, box-shadow 0.22s ease, background 0.22s ease",
        transform: active ? "translateY(-2px)" : "none",
        boxShadow: isOpen
          ? "0 8px 40px rgba(30,61,143,0.18), inset 0 0 0 1px rgba(30,61,143,0.35)"
          : hovered
          ? "0 4px 24px rgba(30,61,143,0.1), inset 0 0 0 1px rgba(30,61,143,0.18)"
          : "inset 0 0 0 1px var(--border)",
        background: isOpen
          ? "linear-gradient(135deg, rgba(30,61,143,0.1) 0%, var(--bg2) 60%)"
          : hovered
          ? "linear-gradient(135deg, rgba(30,61,143,0.05) 0%, var(--bg2) 60%)"
          : "var(--bg2)",
      }}
    >
      {/* Left accent bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "3px",
          borderRadius: "3px 0 0 3px",
          background: "linear-gradient(180deg, var(--navy) 0%, var(--chrome) 100%)",
          opacity: isOpen ? 1 : hovered ? 0.45 : 0,
          transition: "opacity 0.22s ease",
        }}
      />

      {/* Question button */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          padding: "22px 24px 22px 28px",
          textAlign: "left",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.06em",
              color: isOpen ? "var(--navy)" : "var(--dim)",
              flexShrink: 0,
              transition: "color 0.22s ease",
            }}
          >
            {num}
          </span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(14px, 1.8vw, 16px)",
              fontWeight: 600,
              color: "var(--silver)",
              letterSpacing: "-0.01em",
              lineHeight: 1.4,
            }}
          >
            {question}
          </span>
        </div>

        {/* +/× icon pill */}
        <span
          style={{
            flexShrink: 0,
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            border: `1px solid ${isOpen ? "rgba(30,61,143,0.5)" : "var(--border)"}`,
            background: isOpen ? "rgba(30,61,143,0.14)" : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            lineHeight: 1,
            color: isOpen ? "var(--navy)" : "var(--dim)",
            transition: "all 0.25s ease",
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          +
        </span>
      </button>

      {/* Answer — smooth height transition */}
      <div
        style={{
          maxHeight: `${height}px`,
          overflow: "hidden",
          transition: "max-height 0.38s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div
          ref={answerRef}
          style={{
            padding: "0 28px 24px 62px",
            color: "var(--chrome)",
            lineHeight: 1.78,
            fontSize: "15px",
          }}
        >
          {answer}
        </div>
      </div>
    </div>
  );
}

/* ── Section ── */
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  /* Smooth cursor-following glow orb */
  useEffect(() => {
    const section = sectionRef.current;
    const orb = orbRef.current;
    if (!section || !orb) return;

    let rafId: number;
    let tx = 0, ty = 0, cx = 0, cy = 0;

    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
      orb.style.opacity = "1";
    };
    const onLeave = () => { orb.style.opacity = "0"; };

    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      orb.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(tick);
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      ref={sectionRef}
      id="faq"
      style={{
        position: "relative",
        padding: "clamp(80px, 10vw, 120px) 24px",
        maxWidth: "860px",
        margin: "0 auto",
        overflow: "hidden",
      }}
    >
      {/* Cursor glow orb */}
      <div
        ref={orbRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(30,61,143,0.13) 0%, rgba(30,61,143,0.04) 45%, transparent 70%)",
          pointerEvents: "none",
          opacity: 0,
          transition: "opacity 0.4s ease",
          zIndex: 0,
        }}
      />

      {/* Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "clamp(40px, 6vw, 64px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "10px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--navy)",
            marginBottom: "14px",
          }}
        >
          FAQ
        </p>
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 800,
            color: "var(--silver)",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          Common Questions
        </h2>
      </div>

      {/* Items */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {faqs.map((faq, i) => (
          <FaqItem
            key={i}
            index={i}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === i}
            onToggle={() => toggle(i)}
          />
        ))}
      </div>
    </section>
  );
}
