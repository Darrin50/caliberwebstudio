'use client';

import { useEffect, useRef, useState } from 'react';

const STEPS = [
  {
    number: '01',
    title: 'We Scout Your Business',
    desc: 'We research your market, competitors, and opportunities.',
  },
  {
    number: '02',
    title: 'You See It Before You Pay',
    desc: 'We build your custom demo site. Free.',
  },
  {
    number: '03',
    title: 'We Build & Launch',
    desc: 'Your site goes live in 5-7 days with everything included.',
  },
  {
    number: '04',
    title: 'You Grow. We Optimize.',
    desc: 'Monthly reports, content updates, and growth systems.',
  },
];

export default function ProcessTimeline() {
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeSteps, setActiveSteps] = useState<boolean[]>(new Array(STEPS.length).fill(false));

  useEffect(() => {
    const observers = stepRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSteps((prev) => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
            obs.disconnect();
          }
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <section
      style={{
        background: 'var(--bg3, #18181c)',
        padding: 'clamp(72px, 9vw, 120px) clamp(20px, 6vw, 60px)',
        borderTop: '1px solid var(--border, rgba(176,183,188,0.12))',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Headline */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(56px, 7vw, 80px)' }}>
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
            How It Works
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
            Simple process.{' '}
            <span style={{ color: 'var(--navy, #0076B6)' }}>Serious results.</span>
          </h2>
        </div>

        {/* Desktop horizontal timeline */}
        <div className="timeline-desktop">
          {/* Connecting line */}
          <div
            style={{
              position: 'absolute',
              top: '26px',
              left: 'calc(12.5%)',
              right: 'calc(12.5%)',
              height: '2px',
              background: 'var(--border, rgba(176,183,188,0.12))',
              zIndex: 0,
            }}
          />
          {/* Active line fill — fills based on how many steps are active */}
          <div
            style={{
              position: 'absolute',
              top: '26px',
              left: 'calc(12.5%)',
              height: '2px',
              background: 'var(--navy, #0076B6)',
              boxShadow: '0 0 8px rgba(0,118,182,0.6)',
              zIndex: 1,
              width: activeSteps.filter(Boolean).length === 0
                ? '0%'
                : `${((activeSteps.filter(Boolean).length - 1) / (STEPS.length - 1)) * 75}%`,
              transition: 'width 0.6s ease',
            }}
          />

          {STEPS.map((step, i) => (
            <div
              key={step.number}
              ref={(el) => { stepRefs.current[i] = el; }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
                zIndex: 2,
                opacity: activeSteps[i] ? 1 : 0.35,
                transform: activeSteps[i] ? 'translateY(0)' : 'translateY(8px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease',
                transitionDelay: `${i * 0.1}s`,
              }}
            >
              {/* Step dot */}
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: activeSteps[i]
                    ? 'linear-gradient(135deg, #005a8e 0%, #0076B6 100%)'
                    : 'var(--bg2, #111114)',
                  border: activeSteps[i]
                    ? '2px solid rgba(0,118,182,0.4)'
                    : '2px solid rgba(176,183,188,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px',
                  boxShadow: activeSteps[i] ? '0 0 24px rgba(0,118,182,0.4)' : 'none',
                  transition: 'all 0.5s ease',
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-space-mono, 'Space Mono', monospace)",
                    fontSize: '12px',
                    fontWeight: 700,
                    color: activeSteps[i] ? '#93c5fd' : 'var(--dim, rgba(176,183,188,0.55))',
                  }}
                >
                  {step.number}
                </span>
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-syne, 'Syne', sans-serif)",
                  fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)',
                  fontWeight: 700,
                  color: 'var(--silver, #D0D8E0)',
                  marginBottom: '8px',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.25,
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-inter, 'Inter', sans-serif)",
                  fontSize: '13px',
                  lineHeight: 1.65,
                  color: 'var(--dim, rgba(176,183,188,0.55))',
                  margin: 0,
                  maxWidth: '180px',
                }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile vertical timeline */}
        <div className="timeline-mobile">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              ref={(el) => { if (!stepRefs.current[i]) stepRefs.current[i] = el; }}
              style={{
                display: 'flex',
                gap: '20px',
                position: 'relative',
                opacity: activeSteps[i] ? 1 : 0.35,
                transform: activeSteps[i] ? 'translateX(0)' : 'translateX(-8px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease',
                transitionDelay: `${i * 0.1}s`,
              }}
            >
              {/* Left column: dot + line */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: activeSteps[i]
                      ? 'linear-gradient(135deg, #005a8e 0%, #0076B6 100%)'
                      : 'var(--bg2, #111114)',
                    border: activeSteps[i]
                      ? '2px solid rgba(0,118,182,0.4)'
                      : '2px solid rgba(176,183,188,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: activeSteps[i] ? '0 0 20px rgba(0,118,182,0.3)' : 'none',
                    transition: 'all 0.5s ease',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-space-mono, 'Space Mono', monospace)",
                      fontSize: '11px',
                      fontWeight: 700,
                      color: activeSteps[i] ? '#93c5fd' : 'var(--dim, rgba(176,183,188,0.55))',
                    }}
                  >
                    {step.number}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    style={{
                      width: '2px',
                      flex: 1,
                      minHeight: '32px',
                      background: activeSteps[i]
                        ? 'var(--navy, #0076B6)'
                        : 'var(--border, rgba(176,183,188,0.12))',
                      marginTop: '8px',
                      transition: 'background 0.5s ease',
                    }}
                  />
                )}
              </div>
              {/* Content */}
              <div style={{ paddingTop: '10px', paddingBottom: i < STEPS.length - 1 ? '32px' : '0' }}>
                <h3
                  style={{
                    fontFamily: "var(--font-syne, 'Syne', sans-serif)",
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: 'var(--silver, #D0D8E0)',
                    marginBottom: '6px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {step.title}
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
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .timeline-desktop {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(16px, 3vw, 32px);
          position: relative;
        }
        .timeline-mobile { display: none; }
        @media (max-width: 720px) {
          .timeline-desktop { display: none; }
          .timeline-mobile { display: flex; flex-direction: column; gap: 0; }
        }
      `}</style>
    </section>
  );
}
