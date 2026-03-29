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
        padding: '120px 60px 80px',
        background: 'var(--bg)',
        textAlign: 'center',
      }}
    >
      {/* 3D canvas renders here via children — stays at z-index 1 */}
      {children}

      {/* All text content — always in front of canvas */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '900px',
          width: '100%',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {/* Hero Label */}
        <div className="sec-label fu" style={{ justifyContent: 'center' }}>
          Detroit&apos;s Premier AI Web Agency
        </div>

        {/* Main Heading — FIX 2: explicit white color + z-index so always visible on load */}
        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(48px, 8vw, 96px)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: '#ffffff',
            margin: '32px 0 0',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <div className="fu" style={{ color: '#ffffff' }}>Architects of</div>
          <div
            className="fu"
            style={{
              background: 'linear-gradient(90deg, var(--chrome), #fff, var(--chrome))',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shine 3s linear infinite',
            }}
          >
            The Modern Web.
          </div>
        </h1>

        {/* Subtitle */}
        <p
          className="fu"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '18px',
            fontWeight: 400,
            lineHeight: 1.6,
            color: 'var(--dim)',
            margin: '36px 0 48px',
            maxWidth: '700px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          We build high-performance websites that rank, convert, and grow your
          business. $0 down to start — lock in a 12-month growth plan.
        </p>

        {/* CTA Buttons — FIX 3: primary CTA now links to /contact page */}
        <div
          className="fu"
          style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            margin: '48px 0',
          }}
        >
          <a
            href="/contact"
            className="btn-chrome"
            style={{
              textDecoration: 'none',
              display: 'inline-block',
              pointerEvents: 'auto',
            }}
          >
            Get Your Free Site Audit →
          </a>
          <a
            href="#work"
            className="btn-line"
            style={{
              textDecoration: 'none',
              display: 'inline-flex',
              pointerEvents: 'auto',
            }}
          >
            See Our Work
          </a>
        </div>

        {/* Stats Row */}
        <div
          className="fu"
          style={{
            marginTop: '80px',
            paddingTop: '80px',
            borderTop: '1px solid var(--border)',
            maxWidth: '600px',
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
          }}>By the Numbers</p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
          }}
        >
          {[
            { metric: '500+', label: 'Businesses Served' },
            { metric: '97%', label: 'Client Retention' },
            { metric: '$0', label: 'Down to Start' },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '36px',
                  fontWeight: 800,
                  color: 'var(--chrome)',
                  marginBottom: '8px',
                }}
              >
                {stat.metric}
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  fontWeight: 400,
                  color: 'var(--dim)',
                  letterSpacing: '0.04em',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
