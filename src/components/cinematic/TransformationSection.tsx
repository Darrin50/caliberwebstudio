'use client';

import { useEffect, useRef, useState } from 'react';

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
    <div className="ts-stat-card">
      {/* Top accent */}
      <div className="ts-stat-accent" />
      <div className="ts-stat-num">{displayValue}</div>
      <div className="ts-stat-lbl">{label}</div>
    </div>
  );
}

function IconShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="ts-icon-shell">
      {children}
    </div>
  );
}

function DesignIcon() {
  return (
    <IconShell>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="1.5" y="2.5" width="19" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M1.5 7h19" stroke="currentColor" strokeWidth="1.8"/>
        <circle cx="4.5" cy="4.75" r="0.9" fill="currentColor"/>
        <circle cx="7.5" cy="4.75" r="0.9" fill="currentColor"/>
        <path d="M7.5 11.5l3 2.5-3 2.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12.5 16.5h3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
      </svg>
    </IconShell>
  );
}

function SEOIcon() {
  return (
    <IconShell>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M14 14l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M6.5 9h5M9 6.5v5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
      </svg>
    </IconShell>
  );
}

function AIIcon() {
  return (
    <IconShell>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M3 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H8.5l-4 3.5V15H5a2 2 0 0 1-2-2V5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
        <circle cx="7.5" cy="9" r="1" fill="currentColor"/>
        <circle cx="11" cy="9" r="1" fill="currentColor"/>
        <circle cx="14.5" cy="9" r="1" fill="currentColor"/>
      </svg>
    </IconShell>
  );
}

function GrowthIcon() {
  return (
    <IconShell>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M3 17l5-6 4 3.5L19 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14.5 6H19v4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 20h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
      </svg>
    </IconShell>
  );
}

const SERVICE_CARDS = [
  { Icon: DesignIcon,  title: 'Website Design',  desc: 'High-performance sites that rank and convert' },
  { Icon: SEOIcon,     title: 'SEO & Google',     desc: 'Get found on Google, Maps, and AI search' },
  { Icon: AIIcon,      title: 'AI Chatbot',       desc: '24/7 lead capture that never sleeps' },
  { Icon: GrowthIcon,  title: 'Growth Systems',   desc: 'Reviews, reputation, and recurring revenue' },
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
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto' }}>
        {/* Headline */}
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

        {/* Stat cards */}
        <div ref={sectionRef} className="transformation-stats">
          <StatCard value="340%" label="More bookings"      numericValue={340} suffix="%" started={statsVisible} />
          <StatCard value="#1"   label="Google ranking"     numericValue={0}   started={statsVisible} />
          <StatCard value="200%" label="More online orders"  numericValue={200} suffix="%" started={statsVisible} />
          <StatCard value="15+"  label="Calls per week"     numericValue={15}  suffix="+" started={statsVisible} />
        </div>

        {/* Service cards */}
        <div className="transformation-services" style={{ marginTop: 'clamp(48px, 6vw, 64px)' }}>
          {SERVICE_CARDS.map(({ Icon, title, desc }) => (
            <div key={title} className="ts-service-card service-card-hover">
              {/* Top accent line */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                background: 'linear-gradient(90deg, #0076B6, transparent)',
                borderRadius: '8px 8px 0 0',
              }} />
              <Icon />
              <h3 className="ts-service-title" style={{
                fontFamily: "var(--font-syne, 'Syne', sans-serif)",
                fontSize: 'clamp(1rem, 1.6vw, 1.1rem)',
                fontWeight: 700, marginBottom: '8px', letterSpacing: '-0.01em',
              }}>{title}</h3>
              <p className="ts-service-desc" style={{
                fontFamily: "var(--font-inter, 'Inter', sans-serif)",
                fontSize: '14px', lineHeight: 1.65, margin: 0,
              }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* ── Section ── */
        .ts-section { background: var(--bg); border-top: 1px solid var(--border); }
        .ts-heading  { color: var(--text-primary); }

        /* ── Stat cards ── */
        .ts-stat-card {
          position: relative;
          text-align: center;
          padding: clamp(24px, 3vw, 36px) clamp(16px, 2vw, 24px);
          border-radius: 8px;
          background: var(--bg2);
          border: 1px solid var(--border);
          overflow: hidden;
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
        }
        .ts-stat-card:hover {
          transform: translateY(-3px);
          border-color: rgba(0,118,182,0.4);
          box-shadow: 0 6px 28px rgba(0,118,182,0.12);
        }
        .ts-stat-accent {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #0076B6, transparent);
        }
        .ts-stat-num {
          font-family: var(--font-syne, 'Syne', sans-serif);
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1;
          margin-bottom: 8px;
          color: var(--text-primary);
        }
        .ts-stat-lbl {
          font-family: var(--font-space-mono, 'Space Mono', monospace);
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--chrome);
        }

        /* ── Icon shell ── */
        .ts-icon-shell {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(0,118,182,0.1);
          border: 1px solid rgba(0,118,182,0.22);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0076B6;
          margin-bottom: 18px;
          transition: background 0.3s ease, box-shadow 0.3s ease;
        }
        .service-card-hover:hover .ts-icon-shell {
          background: rgba(0,118,182,0.18);
          box-shadow: 0 0 20px rgba(0,118,182,0.2);
        }

        /* ── Service cards ── */
        .ts-service-card {
          position: relative;
          border-radius: 8px;
          padding: clamp(24px, 3vw, 36px);
          background: var(--bg2);
          border: 1px solid var(--border);
          overflow: hidden;
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .ts-service-title { color: var(--text-primary); }
        .ts-service-desc  { color: var(--chrome); }
        .service-card-hover:hover {
          transform: translateY(-4px);
          border-color: rgba(0,118,182,0.4);
          box-shadow: 0 8px 32px rgba(0,118,182,0.12);
        }

        /* ── Light mode ── */
        [data-theme="light"] .ts-section    { background: var(--bg); }
        [data-theme="light"] .ts-heading    { color: #0d0d0e !important; }
        [data-theme="light"] .ts-stat-card  { background: #ffffff !important; border-color: rgba(0,0,0,0.08) !important; box-shadow: 0 2px 12px rgba(0,0,0,0.04); }
        [data-theme="light"] .ts-stat-num   { color: #0076B6 !important; }
        [data-theme="light"] .ts-stat-lbl   { color: #6b7280 !important; }
        [data-theme="light"] .ts-service-card   { background: #ffffff !important; border-color: rgba(0,0,0,0.08) !important; box-shadow: 0 2px 12px rgba(0,0,0,0.04); }
        [data-theme="light"] .ts-service-title  { color: #111827 !important; }
        [data-theme="light"] .ts-service-desc   { color: #374151 !important; }

        /* ── Layout ── */
        .transformation-stats    { display: grid; grid-template-columns: repeat(4,1fr); gap: clamp(12px,2vw,20px); }
        .transformation-services { display: grid; grid-template-columns: repeat(4,1fr); gap: clamp(12px,2vw,20px); }
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
