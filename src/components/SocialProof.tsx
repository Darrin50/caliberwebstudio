'use client';

export default function SocialProof() {
  const badges = [
    { label: 'Next.js', icon: '▲' },
    { label: 'Vercel', icon: '◆' },
    { label: 'OpenAI', icon: '●' },
    { label: 'Stripe', icon: '◈' },
    { label: 'Detroit Built', icon: '◉' },
  ];

  const stats = [
    { value: '48', suffix: 'hr', label: 'Average Delivery' },
    { value: '0', prefix: '$', label: 'Down to Start' },
    { value: '30', suffix: '+', label: 'Detroit Businesses' },
    { value: '90', suffix: '+', label: 'Lighthouse Score' },
  ];

  return (
    <section
      style={{
        position: 'relative',
        padding: 'clamp(40px, 5vw, 64px) clamp(20px, 6vw, 60px)',
        background: 'var(--bg)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
        {/* Trust statement */}
        <p style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '10px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--dim)',
          textAlign: 'center',
          marginBottom: '20px',
        }}>
          Trusted by Detroit businesses · Built on world-class infrastructure
        </p>

        {/* Tech badges row */}
        <div style={{
          display: 'flex',
          gap: 'clamp(16px, 3vw, 40px)',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginBottom: '32px',
        }}>
          {badges.map((badge) => (
            <div key={badge.label} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              opacity: 0.45,
              transition: 'opacity 0.2s ease',
              cursor: 'default',
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.75'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.45'; }}
            >
              <span style={{ fontFamily: "'Syne', sans-serif", fontSize: '16px', color: 'var(--chrome)' }}>
                {badge.icon}
              </span>
              <span style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '11px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--chrome)',
                fontWeight: 700,
              }}>
                {badge.label}
              </span>
            </div>
          ))}
        </div>

        {/* Stats — single rounded card */}
        <div className="social-proof-stats" style={{
          background: 'var(--bg2)',
          borderRadius: '20px',
          overflow: 'hidden',
          border: '1px solid var(--border)',
        }}>
          {stats.map((stat, i) => (
            <div key={stat.label} style={{
              padding: 'clamp(28px, 3.5vw, 44px) clamp(20px, 2.5vw, 36px)',
              textAlign: 'center',
              borderRight: i < stats.length - 1 ? '1px solid var(--border)' : 'none',
            }}>
              <div style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 800,
                color: 'var(--silver)',
                letterSpacing: '-0.03em',
                lineHeight: 1,
                marginBottom: '8px',
              }}>
                <span
                  data-count={stat.value}
                  data-prefix={stat.prefix || ''}
                  data-suffix={stat.suffix || ''}
                >
                  {stat.prefix || ''}{stat.value}{stat.suffix || ''}
                </span>
              </div>
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '10px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--dim)',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .social-proof-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        @media (max-width: 600px) {
          .social-proof-stats { grid-template-columns: repeat(2, 1fr); }
          .social-proof-stats > div:nth-child(2) { border-right: none !important; }
          .social-proof-stats > div:nth-child(1),
          .social-proof-stats > div:nth-child(2) { border-bottom: 1px solid var(--border); }
        }
      `}</style>
    </section>
  );
}
