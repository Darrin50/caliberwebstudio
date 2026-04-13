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
    <div
      className="stat-card"
      style={{
        textAlign: 'center',
        padding: 'clamp(24px, 3vw, 36px) clamp(16px, 2vw, 24px)',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '8px',
        transition: 'border-color 0.3s ease, transform 0.3s ease',
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-syne, 'Syne', sans-serif)",
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          color: '#ffffff',
          lineHeight: 1,
          marginBottom: '8px',
        }}
      >
        {displayValue}
      </div>
      <div
        style={{
          fontFamily: "var(--font-space-mono, 'Space Mono', monospace)",
          fontSize: '10px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--dim, rgba(176,183,188,0.55))',
        }}
      >
        {label}
      </div>
    </div>
  );
}

const SERVICE_CARDS = [
  {
    icon: '◈',
    title: 'Website Design',
    desc: 'High-performance sites that rank and convert',
  },
  {
    icon: '◎',
    title: 'SEO & Google',
    desc: 'Get found on Google, Maps, and AI search',
  },
  {
    icon: '◉',
    title: 'AI Chatbot',
    desc: '24/7 lead capture that never sleeps',
  },
  {
    icon: '◐',
    title: 'Growth Systems',
    desc: 'Reviews, reputation, and recurring revenue',
  },
];

export default function TransformationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      style={{
        background: 'var(--bg, #0a0a0b)',
        padding: 'clamp(72px, 9vw, 120px) clamp(20px, 6vw, 60px)',
        borderTop: '1px solid var(--border, rgba(176,183,188,0.12))',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Headline */}
        <div style={{ marginBottom: 'clamp(48px, 6vw, 72px)', maxWidth: '720px' }}>
          <div
            style={{
              fontFamily: "var(--font-space-mono, 'Space Mono', monospace)",
              fontSize: '10px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--navy, #0076B6)',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span style={{ display: 'block', width: '24px', height: '1px', background: 'var(--navy, #0076B6)' }} />
            The Transformation
          </div>
          <h2
            style={{
              fontFamily: "var(--font-heading, var(--font-syne, 'Syne', sans-serif))",
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: 'var(--silver, #D0D8E0)',
              marginBottom: '12px',
            }}
          >
            We don&apos;t just build websites.
          </h2>
          <h2
            style={{
              fontFamily: "var(--font-heading, var(--font-syne, 'Syne', sans-serif))",
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: 'var(--navy, #0076B6)',
            }}
          >
            We build your entire online presence.
          </h2>
        </div>

        {/* Video placeholder */}
        <div
          style={{
            width: '100%',
            aspectRatio: '16 / 9',
            background: 'linear-gradient(135deg, #0d1a2e 0%, #0a1622 50%, #060e17 100%)',
            borderRadius: '12px',
            border: '1px solid rgba(0,118,182,0.15)',
            marginBottom: 'clamp(48px, 6vw, 72px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,118,182,0.1) 0%, transparent 70%)',
            }}
          />
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'rgba(0,118,182,0.15)',
              border: '2px solid rgba(0,118,182,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M8 5l13 7-13 7V5z" fill="rgba(0,118,182,0.8)" />
            </svg>
          </div>
        </div>

        {/* Stats row */}
        <div ref={sectionRef} className="transformation-stats">
          <StatCard value="340%" label="More bookings" numericValue={340} suffix="%" started={statsVisible} />
          <StatCard value="#1" label="Google ranking" numericValue={0} started={statsVisible} />
          <StatCard value="200%" label="More online orders" numericValue={200} suffix="%" started={statsVisible} />
          <StatCard value="15+" label="Calls per week" numericValue={15} suffix="+" started={statsVisible} />
        </div>

        {/* Service cards */}
        <div className="transformation-services" style={{ marginTop: 'clamp(48px, 6vw, 64px)' }}>
          {SERVICE_CARDS.map((card) => (
            <div
              key={card.title}
              className="service-card-hover"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '8px',
                padding: 'clamp(24px, 3vw, 36px)',
                transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
              }}
            >
              <div
                style={{
                  fontSize: '28px',
                  marginBottom: '16px',
                  color: 'var(--navy, #0076B6)',
                  lineHeight: 1,
                }}
              >
                {card.icon}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-syne, 'Syne', sans-serif)",
                  fontSize: 'clamp(1rem, 1.6vw, 1.15rem)',
                  fontWeight: 700,
                  color: 'var(--silver, #D0D8E0)',
                  marginBottom: '8px',
                  letterSpacing: '-0.01em',
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-inter, 'Inter', sans-serif)",
                  fontSize: '14px',
                  lineHeight: 1.65,
                  color: 'var(--dim, rgba(176,183,188,0.55))',
                  margin: 0,
                  maxWidth: 'none',
                }}
              >
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .transformation-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(12px, 2vw, 20px);
        }
        .transformation-services {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(12px, 2vw, 20px);
        }
        .service-card-hover:hover {
          transform: translateY(-4px);
          border-color: rgba(0,118,182,0.4);
          box-shadow: 0 8px 32px rgba(0,118,182,0.12);
        }
        @media (max-width: 900px) {
          .transformation-stats { grid-template-columns: repeat(2, 1fr); }
          .transformation-services { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .transformation-stats { grid-template-columns: repeat(2, 1fr); }
          .transformation-services { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
