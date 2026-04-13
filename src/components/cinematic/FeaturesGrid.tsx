'use client';

const FEATURES = [
  {
    icon: '📱',
    name: 'Mobile-First Design',
    desc: 'Every site works flawlessly on any device',
  },
  {
    icon: '🔍',
    name: 'SEO & AEO Built In',
    desc: 'Optimized for Google AND AI search tools',
  },
  {
    icon: '🤖',
    name: 'AI Chatbot Included',
    desc: 'Captures leads 24/7 with smart conversation',
  },
  {
    icon: '⚡',
    name: 'Speed Optimized',
    desc: 'Sub-2-second load times, 90+ Lighthouse scores',
  },
  {
    icon: '🏷️',
    name: 'Schema Markup',
    desc: 'Rich results that stand out in search',
  },
  {
    icon: '📊',
    name: 'Analytics Dashboard',
    desc: 'See your traffic, leads, and growth in real time',
  },
];

export default function FeaturesGrid() {
  return (
    <section
      style={{
        background: 'var(--bg2, #111114)',
        padding: 'clamp(72px, 9vw, 120px) clamp(20px, 6vw, 60px)',
        borderTop: '1px solid var(--border, rgba(176,183,188,0.12))',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Headline */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 72px)' }}>
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
            What&apos;s Included
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
            Every page.{' '}
            <span style={{ color: 'var(--navy, #0076B6)' }}>Built to convert.</span>
          </h2>
        </div>

        {/* Cards grid */}
        <div className="features-grid">
          {FEATURES.map((feature) => (
            <div key={feature.name} className="flip-card">
              <div className="flip-inner">
                {/* Front */}
                <div className="flip-front">
                  <div
                    style={{
                      fontSize: '36px',
                      marginBottom: '20px',
                      lineHeight: 1,
                    }}
                  >
                    {feature.icon}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-syne, 'Syne', sans-serif)",
                      fontSize: 'clamp(1rem, 1.5vw, 1.1rem)',
                      fontWeight: 700,
                      color: 'var(--silver, #D0D8E0)',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.2,
                      margin: 0,
                    }}
                  >
                    {feature.name}
                  </h3>
                </div>
                {/* Back */}
                <div className="flip-back">
                  <h3
                    style={{
                      fontFamily: "var(--font-syne, 'Syne', sans-serif)",
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      color: 'var(--navy, #0076B6)',
                      marginBottom: '12px',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {feature.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-inter, 'Inter', sans-serif)",
                      fontSize: '14px',
                      lineHeight: 1.65,
                      color: 'var(--silver, #D0D8E0)',
                      margin: 0,
                      maxWidth: 'none',
                    }}
                  >
                    {feature.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(12px, 2vw, 20px);
        }
        @media (max-width: 860px) {
          .features-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .features-grid { grid-template-columns: 1fr; }
        }

        .flip-card {
          perspective: 800px;
          height: 200px;
        }
        .flip-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .flip-card:hover .flip-inner {
          transform: rotateY(180deg);
        }
        .flip-front,
        .flip-back {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 8px;
          padding: clamp(24px, 3vw, 32px);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
        }
        .flip-front {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .flip-back {
          background: rgba(0,118,182,0.12);
          border: 1px solid rgba(0,118,182,0.3);
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
}
