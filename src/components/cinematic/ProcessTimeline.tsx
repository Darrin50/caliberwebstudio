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
        { threshold: 0.3 }
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
          {/* Background track */}
          <div className="absolute top-10 left-[12.5%] right-[12.5%] h-[2px] bg-white/10" />
          {/* Animated gradient line */}
          <div className="absolute top-10 left-[12.5%] right-[12.5%] h-[2px] overflow-hidden">
            <div className="h-full w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_16px_rgba(0,200,255,0.4)]">
              <div className="absolute top-1/2 h-3 w-24 -translate-y-1/2 bg-gradient-to-r from-transparent via-white to-transparent blur-md animate-flow" />
            </div>
          </div>

          {STEPS.map((step, i) => (
            <div
              key={step.number}
              ref={(el) => { stepRefs.current[i] = el; }}
              className="group"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                opacity: activeSteps[i] ? 1 : 0,
                transform: activeSteps[i] ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease',
                transitionDelay: `${i * 0.12}s`,
              }}
            >
              {/* Glass node */}
              <div className="relative z-10 mb-6 h-20 w-20 rounded-full flex items-center justify-center
                bg-gradient-to-br from-cyan-400/30 to-purple-500/30
                border border-white/20 backdrop-blur-md
                shadow-[0_0_30px_rgba(0,200,255,0.35)]
                transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(0,200,255,0.55)]"
              >
                <span
                  style={{
                    fontFamily: "var(--font-space-mono, 'Space Mono', monospace)",
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#93c5fd',
                  }}
                >
                  {step.number}
                </span>
              </div>

              {/* Glass card — equal height via flex-1 stretch */}
              <div className="timeline-card group-hover:-translate-y-2 group-hover:border-cyan-300/30">
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
                    color: 'rgba(176,183,188,0.7)',
                    margin: 0,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile vertical timeline */}
        <div className="timeline-mobile">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              ref={(el) => { if (!stepRefs.current[i]) stepRefs.current[i] = el; }}
              className="group"
              style={{
                display: 'flex',
                gap: '16px',
                opacity: activeSteps[i] ? 1 : 0,
                transform: activeSteps[i] ? 'translateX(0)' : 'translateX(-12px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease',
                transitionDelay: `${i * 0.12}s`,
              }}
            >
              {/* Left: node + connector */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div className="h-14 w-14 rounded-full flex items-center justify-center
                  bg-gradient-to-br from-cyan-400/30 to-purple-500/30
                  border border-white/20 backdrop-blur-md
                  shadow-[0_0_24px_rgba(0,200,255,0.3)]"
                >
                  <span
                    style={{
                      fontFamily: "var(--font-space-mono, 'Space Mono', monospace)",
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#93c5fd',
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
                      background: 'linear-gradient(to bottom, rgba(0,200,255,0.5), rgba(168,85,247,0.3))',
                      marginTop: '8px',
                    }}
                  />
                )}
              </div>
              {/* Content card */}
              <div
                className="flex-1 rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-xl
                  shadow-[0_10px_30px_rgba(0,0,0,0.3)]
                  transition-all duration-300 group-hover:border-cyan-300/30"
                style={{ padding: '16px 20px', marginBottom: i < STEPS.length - 1 ? '12px' : '0' }}
              >
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
                    color: 'rgba(176,183,188,0.7)',
                    margin: 0,
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
          align-items: start;
        }
        /* Equal-height cards via CSS grid subgrid trick */
        .timeline-desktop > div {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .timeline-card {
          flex: 1;
          width: 100%;
          padding: clamp(20px, 2.5vw, 28px);
          border-radius: 16px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          transition: transform 0.3s ease, border-color 0.3s ease;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        [data-theme="light"] .timeline-card {
          background: rgba(255,255,255,0.8);
          border: 1px solid rgba(0,0,0,0.09);
          box-shadow: 0 4px 20px rgba(0,0,0,0.07);
        }
        [data-theme="light"] .timeline-card h3 { color: #0a0a0b; }
        [data-theme="light"] .timeline-card p  { color: rgba(0,0,0,0.5); }
        .timeline-mobile { display: none; }
        @media (max-width: 720px) {
          .timeline-desktop { display: none; }
          .timeline-mobile { display: flex; flex-direction: column; gap: 0; }
        }
        @keyframes flow {
          0%   { transform: translateX(-96px) translateY(-50%); opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { transform: translateX(700px) translateY(-50%); opacity: 0; }
        }
        .animate-flow { animation: flow 3.5s linear infinite; }
      `}</style>
    </section>
  );
}
