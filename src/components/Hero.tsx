import Link from 'next/link';
import { FluidHero } from './ClientOnlyComponents';
import ScrambleText from './ScrambleText';

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
        padding: 'clamp(100px, 18vh, 220px) clamp(20px, 6vw, 60px) 120px',
        background: 'var(--bg)',
        textAlign: 'center',
      }}
    >
      {/* Brand-blue fluid gradient shader — fullscreen quad, zero postprocessing */}
      <FluidHero />

      {/* Dark gradient overlay — ensures WCAG AA contrast over shader */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.60) 55%, rgba(0,0,0,0.80) 100%)',
        pointerEvents: 'none',
        zIndex: 3,
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
        {/* Eyebrow label — scramble effect */}
        <ScrambleText
          text="DETROIT'S PREMIER AI WEB AGENCY"
          as="div"
          resolveDelay={80}
          className="sec-label"
          style={{ justifyContent: 'center', color: '#ffffff', fontWeight: 600, opacity: 0.9 }}
        />

        {/* Decorative gradient line */}
        <div style={{
          width: '48px',
          height: '2px',
          background: 'linear-gradient(90deg, #0076B6, #3b82f6)',
          margin: '0 auto 8px',
          borderRadius: '1px',
          opacity: 0.7,
        }} />

        {/* Main Heading — scramble effect, staggered after eyebrow */}
        <h1
          aria-label="Detroit Websites That Get Found and Win Customers."
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(2.5rem, 5.5vw, 4rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: 'var(--hero-text)',
            margin: '24px 0 0',
            maxWidth: '900px',
            marginLeft: 'auto',
            marginRight: 'auto',
            textShadow: '0 2px 24px rgba(0,0,0,0.85)',
          }}
        >
          <ScrambleText
            text="DETROIT WEBSITES THAT"
            as="span"
            resolveDelay={200}
            style={{ display: 'block', color: '#F4F6F8' }}
          />
          <ScrambleText
            text="GET FOUND AND WIN CUSTOMERS."
            as="span"
            resolveDelay={340}
            style={{ display: 'block', color: '#F4F6F8' }}
          />
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
