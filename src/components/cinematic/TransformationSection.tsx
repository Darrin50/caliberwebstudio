'use client';

import { useEffect, useRef, useState } from 'react';

// Video background removed — the 4 hero-scene clips moved to /about (AboutStoryVideo).
// This section now uses a solid dark background so the stat cards and text stand alone.

function useCountUp(target: number, duration: number, started: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      setCount(Math.floor(start));
      if (start >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, started]);

  return count;
}

interface StatCardProps {
  value: string;
  label: string;
  numericValue: number;
  prefix?: string;
  suffix?: string;
  started: boolean;
}

function StatCard({ value, label, numericValue, prefix = '', suffix = '', started }: StatCardProps) {
  const count = useCountUp(numericValue, 1800, started);
  const displayValue = numericValue > 0 ? `${prefix}${count}${suffix}` : value;

  return (
    <div className="ts-stat-card" style={{
      textAlign: 'center',
      padding: 'clamp(24px, 3vw, 36px) clamp(16px, 2vw, 24px)',
      borderRadius: '8px',
      transition: 'border-color 0.3s ease, transform 0.3s ease',
    }}>
      <div className="ts-stat-num" style={{
        fontFamily: "var(--font-syne, 'Syne', sans-serif)",
        fontSize: 'clamp(2rem, 4vw, 3.5rem)',
        fontWeight: 800,
        letterSpacing: '-0.03em',
        lineHeight: 1,
        marginBottom: '8px',
      }}>
        {displayValue}
      </div>
      <div className="ts-stat-lbl" style={{
        fontFamily: "var(--font-space-mono, 'Space Mono', monospace)",
        fontSize: '10px',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
      }}>
        {label}
      </div>
    </div>
  );
}

const SERVICE_CARDS = [
  { icon: '◈', title: 'Website Design',  desc: 'High-performance sites that rank and convert' },
  { icon: '◎', title: 'SEO & Google',    desc: 'Get found on Google, Maps, and AI search' },
  { icon: '◉', title: 'AI Chatbot',      desc: '24/7 lead capture that never sleeps' },
  { icon: '◐', title: 'Growth Systems',  desc: 'Reviews, reputation, and recurring revenue' },
];

export default function TransformationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="ts-section" style={{
      position: 'relative',
      isolation: 'isolate',
      overflow: 'hidden',
      padding: 'clamp(72px, 9vw, 120px) clamp(20px, 6vw, 60px)',
    }}>
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ marginBottom: 'clamp(48px, 6vw, 72px)', maxWidth: '720px' }}>
          <div style={{
            fontFamily: "var(--font-space-mono, 'Space Mono', monospace)",
            fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#0076B6', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            <span style={{ display: 'block', width: '24px', height: '1px', background: '#0076B6' }} />
            The Transformation
          </div>
          <h2 className="ts-heading" style={{
            fontFamily: "var(--font-heading, var(--font-syne, 'Syne', sans-serif))",
            fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
            fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '12px',
          }}>
            We don&apos;t just build websites.
          </h2>
          <h2 style={{
            fontFamily: "var(--font-heading, var(--font-syne, 'Syne', sans-serif))",
            fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
            fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', color: '#0076B6',
          }}>
            We build your entire online presence.
          </h2>
        </div>

        <div ref={sectionRef} className="transformation-stats">
          <StatCard value="340%" label="More bookings"      numericValue={340} suffix="%" started={statsVisible} />
          <StatCard value="#1"   label="Google ranking"     numericValue={0}   started={statsVisible} />
          <StatCard value="200%" label="More online orders"  numericValue={200} suffix="%" started={statsVisible} />
          <StatCard value="15+"  label="Calls per week"     numericValue={15}  suffix="+" started={statsVisible} />
        </div>

        <div className="transformation-services" style={{ marginTop: 'clamp(48px, 6vw, 64px)' }}>
          {SERVICE_CARDS.map((card) => (
            <div key={card.title} className="ts-service-card service-card-hover" style={{
              borderRadius: '8px',
              padding: 'clamp(24px, 3vw, 36px)',
              transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
            }}>
              <div style={{ fontSize: '28px', marginBottom: '16px', color: '#0076B6', lineHeight: 1 }}>{card.icon}</div>
              <h3 className="ts-service-title" style={{
                fontFamily: "var(--font-syne, 'Syne', sans-serif)",
                fontSize: 'clamp(1rem, 1.6vw, 1.15rem)',
                fontWeight: 700, marginBottom: '8px', letterSpacing: '-0.01em',
              }}>{card.title}</h3>
              <p className="ts-service-desc" style={{
                fontFamily: "var(--font-inter, 'Inter', sans-serif)",
                fontSize: '14px', lineHeight: 1.65, margin: 0,
              }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* ── Theme-responsive backgrounds and text ── */
        .ts-section   { background: var(--bg); border-top: 1px solid var(--border); }
        .ts-heading   { color: var(--text-primary); }
        .ts-stat-card { background: var(--bg2); border: 1px solid var(--border); }
        .ts-stat-num  { color: var(--text-primary); }
        .ts-stat-lbl  { color: var(--chrome); }
        .ts-service-card  { background: var(--bg2); border: 1px solid var(--border); }
        .ts-service-title { color: var(--text-primary); }
        .ts-service-desc  { color: var(--chrome); }

        /* ── Light mode — explicit dark text (overrides variable cascade) ── */
        [data-theme="light"] .ts-heading      { color: #0d0d0e !important; }
        [data-theme="light"] .ts-stat-num     { color: #0d0d0e !important; }
        [data-theme="light"] .ts-stat-lbl     { color: #4b5563 !important; }
        [data-theme="light"] .ts-service-card { background: #ffffff !important; border-color: rgba(0,0,0,0.09) !important; }
        [data-theme="light"] .ts-service-title { color: #111827 !important; }
        [data-theme="light"] .ts-service-desc  { color: #374151 !important; }

        /* ── Layout ── */
        .transformation-stats    { display: grid; grid-template-columns: repeat(4,1fr); gap: clamp(12px,2vw,20px); }
        .transformation-services { display: grid; grid-template-columns: repeat(4,1fr); gap: clamp(12px,2vw,20px); }
        .service-card-hover:hover { transform: translateY(-4px); border-color: rgba(0,118,182,0.4); box-shadow: 0 8px 32px rgba(0,118,182,0.12); }
        @media (max-width: 900px) {
          .transformation-stats    { grid-template-columns: repeat(2,1fr); }
          .transformation-services { grid-template-columns: repeat(2,1fr); }
        }
        @media (max-width: 480px) {
          .transformation-stats    { grid-template-columns: repeat(2,1fr); }
          .transformation-services { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
