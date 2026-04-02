export default function Hero({ children }: { children?: React.ReactNode }) {
  return (
    <section
      id="hero"
      className="hero"
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 'clamp(120px, 16vw, 180px) clamp(20px, 6vw, 60px) clamp(80px, 10vw, 120px)',
        background: 'var(--bg)',
        textAlign: 'center',
      }}
    >
      {/* 3D canvas behind everything */}
      {children}

      {/* Radial ambient glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(30,61,143,0.18) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* All text — always in front of canvas */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '860px',
          width: '100%',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {/* Label */}
        <div className="sec-label fu" style={{ justifyContent: 'center' }}>
          Detroit&apos;s Premier AI Web Agency
        </div>

        {/* Main Heading */}
        <h1
          className="fu"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(52px, 8vw, 88px)',
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            margin: '28px 0 0',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <span style={{ display: 'block', color: '#ffffff' }}>Architects of</span>
          <span
            style={{
              display: 'block',
              background: 'linear-gradient(90deg, var(--chrome), #fff, var(--chrome))',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shine 3s linear infinite',
            }}
          >
            The Modern Web.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="fu"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(17px, 2vw, 20px)',
            fontWeight: 400,
            lineHeight: 1.7,
            color: 'var(--dim)',
            margin: '32px auto 48px',
            maxWidth: '560px',
          }}
        >
          We build high-performance websites that rank, convert, and grow your
          business. $0 down — see your free mockup before you ever pay a cent.
        </p>

        {/* CTA */}
        <div
          className="fu"
          style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            pointerEvents: 'auto',
          }}
        >
          <a href="/contact" className="btn-chrome" style={{ textDecoration: 'none', display: 'inline-block' }}>
            Get Your Free Site Audit →
          </a>
          <a href="#work" className="btn-line" style={{ textDecoration: 'none', display: 'inline-flex' }}>
            See Our Work
          </a>
        </div>

        {/* Stats Row */}
        <div
          className="fu"
          style={{
            marginTop: 'clamp(64px, 8vw, 100px)',
            paddingTop: 'clamp(48px, 6vw, 80px)',
            borderTop: '1px solid var(--border)',
            maxWidth: '540px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <p style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--navy)',
            marginBottom: '32px',
            textAlign: 'center',
          }}>How It Works</p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '16px',
          }}>
            {[
              { metric: '$0', label: 'Down to Start', icon: '💳', detail: 'No upfront cost' },
              { metric: '48hr', label: 'Mockup Turnaround', icon: '⚡', detail: 'See it before paying' },
              { metric: '100%', label: 'Free Until You Approve', icon: '✓', detail: 'Zero risk guarantee' },
            ].map((stat) => (
              <div key={stat.label} className="stat-card" style={{
                textAlign: 'left',
                borderTop: '3px solid var(--navy)',
                padding: '24px 20px 20px',
              }}>
                <div style={{
                  fontSize: '20px',
                  marginBottom: '14px',
                  lineHeight: 1,
                }}>
                  {stat.icon}
                </div>
                <div
                  className="stat-metric"
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 'clamp(24px, 3.5vw, 32px)',
                    fontWeight: 800,
                    color: 'var(--navy)',
                    marginBottom: '6px',
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                  }}
                >
                  {stat.metric}
                </div>
                <div
                  className="stat-label"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--text)',
                    marginBottom: '4px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {stat.label}
                </div>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '11px',
                  color: 'var(--dim)',
                  letterSpacing: '0.01em',
                }}>
                  {stat.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
