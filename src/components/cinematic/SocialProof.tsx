'use client';

import { useEffect, useRef, useState } from 'react';

const TESTIMONIALS = [
  {
    quote:
      "Caliber built us a site in 48 hours that I'm genuinely proud to hand to customers. We went from invisible on Google to ranking for 'auto glass Detroit' in two months. The phone hasn't stopped.",
    name: 'Marcus T.',
    business: 'Detroit Auto Glass',
    rating: 5,
  },
  {
    quote:
      "I'd been burned by two agencies before — big promises, bad results, worse communication. Darrin showed me a mockup before I paid a dime. We were booked three weeks out within 60 days of launch.",
    name: 'Kevin R.',
    business: 'Motor City Barbershop',
    rating: 5,
  },
  {
    quote:
      "I was skeptical about paying for a website when I'd been doing it myself. Three months in, we're ranking #1 for our neighborhood and getting 3x the inquiries. Best investment we've made.",
    name: 'Alicia M.',
    business: 'Prime Home Services',
    rating: 5,
  },
];

const TRUST_STATS = [
  { value: 50, suffix: '+', label: 'Sites Built' },
  { value: 4.9, suffix: '★', label: 'Average Rating', isDecimal: true },
  { value: 2.1, suffix: 'M', prefix: '$', label: 'Client Revenue', isDecimal: true },
];

function useCountUp(target: number, duration: number, started: boolean, isDecimal = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const steps = duration / 16;
    const step = target / steps;
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      setCount(isDecimal ? Math.round(start * 10) / 10 : Math.floor(start));
      if (start >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, started, isDecimal]);
  return count;
}

function TrustStat({
  value,
  suffix,
  prefix = '',
  label,
  isDecimal = false,
  started,
}: {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  isDecimal?: boolean;
  started: boolean;
}) {
  const count = useCountUp(value, 1600, started, isDecimal);
  const display = isDecimal ? count.toFixed(1) : count;
  return (
    <div style={{ textAlign: 'center', padding: '0 clamp(16px, 3vw, 32px)' }}>
      <div
        style={{
          fontFamily: "var(--font-syne, 'Syne', sans-serif)",
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 800,
          color: '#ffffff',
          letterSpacing: '-0.03em',
          lineHeight: 1,
          marginBottom: '8px',
        }}
      >
        {prefix}{display}{suffix}
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

export default function SocialProof() {
  const trustRef = useRef<HTMLDivElement>(null);
  const [trustVisible, setTrustVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTrustVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (trustRef.current) observer.observe(trustRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      data-force-dark
      style={{
        background: '#18181c',
        padding: 'clamp(72px, 9vw, 120px) clamp(20px, 6vw, 60px)',
        borderTop: '1px solid rgba(176,183,188,0.12)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Headline */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 64px)' }}>
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
              justifyContent: 'center',
              gap: '12px',
            }}
          >
            <span style={{ display: 'block', width: '24px', height: '1px', background: 'var(--navy, #0076B6)' }} />
            Social Proof
            <span style={{ display: 'block', width: '24px', height: '1px', background: 'var(--navy, #0076B6)' }} />
          </div>
          <h2
            style={{
              fontFamily: "var(--font-heading, var(--font-syne, 'Syne', sans-serif))",
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: 'var(--silver, #D0D8E0)',
            }}
          >
            Don&apos;t take our word for it.
          </h2>
        </div>

        {/* Testimonials */}
        <div className="social-proof-grid">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              style={{
                background: 'var(--bg2, #111114)',
                border: '1px solid var(--border, rgba(176,183,188,0.12))',
                borderRadius: '12px',
                padding: 'clamp(28px, 3.5vw, 40px)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Blue top accent */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'linear-gradient(90deg, #0076B6, transparent)',
                }}
              />

              {/* Stars */}
              <div style={{ fontSize: '14px', color: '#f59e0b', marginBottom: '16px', letterSpacing: '2px' }}>
                {'★'.repeat(t.rating)}
              </div>

              {/* Quote */}
              <blockquote
                style={{
                  fontFamily: "var(--font-inter, 'Inter', sans-serif)",
                  fontSize: 'clamp(14px, 1.4vw, 16px)',
                  lineHeight: 1.75,
                  color: 'var(--chrome, #B0B7BC)',
                  fontStyle: 'italic',
                  margin: '0 0 24px',
                  flex: 1,
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Attribution */}
              <div style={{ paddingTop: '20px', borderTop: '1px solid var(--border, rgba(176,183,188,0.12))' }}>
                <div
                  style={{
                    fontFamily: "var(--font-syne, 'Syne', sans-serif)",
                    fontWeight: 700,
                    fontSize: '15px',
                    color: 'var(--silver, #D0D8E0)',
                    marginBottom: '3px',
                  }}
                >
                  {t.name}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-space-mono, 'Space Mono', monospace)",
                    fontSize: '9px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--dim, rgba(176,183,188,0.55))',
                  }}
                >
                  {t.business}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust bar */}
        <div
          ref={trustRef}
          style={{
            marginTop: 'clamp(56px, 7vw, 80px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0',
            padding: 'clamp(32px, 4vw, 48px)',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--border, rgba(176,183,188,0.12))',
            borderRadius: '8px',
          }}
        >
          {TRUST_STATS.map((stat, i) => (
            <div key={stat.label} style={{ display: 'flex', alignItems: 'center' }}>
              <TrustStat {...stat} started={trustVisible} />
              {i < TRUST_STATS.length - 1 && (
                <div
                  style={{
                    width: '1px',
                    height: '48px',
                    background: 'var(--border, rgba(176,183,188,0.12))',
                    margin: '0 clamp(16px, 3vw, 32px)',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .social-proof-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(16px, 2.5vw, 24px);
        }
        @media (max-width: 900px) {
          .social-proof-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .social-proof-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
