import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section
      id="hero"
      data-dark-section
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 'clamp(100px, 18vh, 220px) clamp(20px, 6vw, 60px) 80px',
        background: 'var(--bg)',
        textAlign: 'center',
      }}
    >
      {/* Photographic background */}
      <Image
        src="/images/brand/cws-home-hero-01.jpg"
        alt="Detroit cityscape — Caliber Web Studio builds websites for local businesses"
        fill
        priority
        sizes="100vw"
        style={{ objectFit: 'cover', objectPosition: 'center' }}
      />

      {/* Primary dark overlay — ensures text is always WCAG AA readable */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(10,10,11,0.82) 0%, rgba(10,10,11,0.70) 50%, rgba(10,10,11,0.88) 100%)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* Brand blue radial glow over photo */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(0,118,182,0.22) 0%, transparent 65%)',
        pointerEvents: 'none',
        zIndex: 2,
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
        <div className="sec-label" style={{ justifyContent: 'center', color: '#3b82f6', fontWeight: 600 }}>
          Detroit&apos;s Premier AI Web Agency
        </div>

        {/* Decorative gradient line */}
        <div style={{
          width: '48px',
          height: '2px',
          background: 'linear-gradient(90deg, #0076B6, #3b82f6)',
          margin: '0 auto 8px',
          borderRadius: '1px',
          opacity: 0.7,
        }} />

        {/* Main Heading */}
        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(2.8rem, 6vw, 5rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: 'var(--hero-text)',
            margin: '24px 0 0',
            maxWidth: '900px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <span style={{ display: 'block', color: 'var(--hero-text)', WebkitTextFillColor: 'var(--hero-text)' }}>Detroit Websites That</span>
          <span style={{ display: 'block', color: 'var(--hero-text)', WebkitTextFillColor: 'var(--hero-text)' }}>
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
            color: 'rgba(208,216,224,0.72)',
            margin: '24px auto 36px',
            maxWidth: '580px',
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
          <Link href="/contact" className="btn-chrome" style={{ textDecoration: 'none', display: 'inline-block' }}>
            Get Your Free Mockup →
          </Link>
          <a href="#work" className="btn-line" style={{ textDecoration: 'none', display: 'inline-flex' }}>
            See Our Work
          </a>
        </div>
      </div>
    </section>
  );
}
