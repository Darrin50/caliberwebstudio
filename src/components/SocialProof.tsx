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
    { value: '100', suffix: '%', label: 'Free Until Approved' },
    { value: '90', suffix: '+', label: 'Lighthouse Score' },
  ];

  return (
    <section
      style={{
        position: 'relative',
        padding: 'clamp(40px, 5vw, 64px) clamp(20px, 6vw, 60px)',
        background: 'var(--bg2)',
        borderBottom: '1px solid var(--border)',
        overflow: 'hidden',
      }}
    >
      {/* Subtle top shimmer */}
      <div className="section-divider" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />

      <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
        {/* Trust statement */}
        <p style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '10px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--dim)',
          textAlign: 'center',
          marginBottom: '28px',
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
          marginBottom: '48px',
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
              <span style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '16px',
                color: 'var(--chrome)',
              }}>
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

        {/* Stats row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '1px',
          background: 'var(--border)',
          borderRadius: '2px',
          overflow: 'hidden',
        }}>
          {stats.map((stat) => (
            <div key={stat.label} style={{
              background: 'var(--bg)',
              padding: 'clamp(20px, 3vw, 32px) clamp(16px, 2vw, 24px)',
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(28px, 4vw, 40px)',
                fontWeight: 800,
                color: 'var(--silver)',
                letterSpacing: '-0.02em',
                lineHeight: 1,
                marginBottom: '6px',
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
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--dim)',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
