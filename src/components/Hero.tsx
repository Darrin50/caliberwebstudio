export default function Hero({ children }: { children?: React.ReactNode }) {
  return (
    <section
      id="hero"
      data-dark-section
      style={{
        position: 'relative',
        overflow: 'hidden',
        height: '100vh',
        maxHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '80px clamp(20px, 6vw, 60px) 60px',
        background: '#0a0a0a',
        textAlign: 'center',
      }}
    >
      {/* 3D canvas background — absolutely positioned, never affects layout */}
      {children}

      {/* Radial ambient glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(30,61,143,0.18) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* Content — always in front of canvas */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1100px',
          width: '100%',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {/* Label */}
        <div className="sec-label" style={{ justifyContent: 'center', color: '#1e3d8f' }}>
          Detroit&apos;s Premier AI Web Agency
        </div>

        {/* Main Heading */}
        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            margin: '24px 0 0',
          }}
        >
          <span style={{ display: 'block', color: '#ffffff' }}>Detroit Websites That</span>
          <span
            style={{
              display: 'block',
              background: 'linear-gradient(90deg, #a8b8c8, #fff, #a8b8c8)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shine 3s linear infinite',
            }}
          >
            Get Found and Win Customers.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
            fontWeight: 400,
            lineHeight: 1.7,
            color: 'rgba(208,216,224,0.65)',
            margin: '24px auto 36px',
            maxWidth: '540px',
          }}
        >
          We build high-performance websites that rank, convert, and grow your
          business. $0 down — see your free mockup before you ever pay a cent.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            pointerEvents: 'auto',
          }}
        >
          <a href="/contact" className="btn-chrome" style={{ textDecoration: 'none', display: 'inline-block' }}>
            Get Your Free Mockup →
          </a>
          <a href="#work" className="btn-line" style={{ textDecoration: 'none', display: 'inline-flex' }}>
            See Our Work
          </a>
        </div>
      </div>
    </section>
  );
}
