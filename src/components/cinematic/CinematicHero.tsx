'use client';

import { useState } from 'react';

export default function CinematicHero() {
  const [videoEnded, setVideoEnded] = useState(false);

  return (
    <section
      id="hero"
      data-force-dark
      style={{
        minHeight: '100vh',
        background: '#0a0a0b',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* ── Hero video — plays once, no loop ── */}
      <video
        autoPlay
        muted
        playsInline
        onEnded={() => setVideoEnded(true)}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
        src="/videos/hero-new.mp4"
      />

      {/* Dark overlay — fades in after video ends */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(10,10,11,0.25) 0%, rgba(10,10,11,0.6) 100%)',
          opacity: videoEnded ? 1 : 0,
          transition: 'opacity 0.8s ease',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* ── Hero text — fades in after video ends ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          padding: 'clamp(100px, 12vw, 140px) clamp(20px, 6vw, 60px) clamp(60px, 8vw, 100px)',
          maxWidth: '900px',
          margin: '0 auto',
          opacity: videoEnded ? 1 : 0,
          transform: videoEnded ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s',
          pointerEvents: videoEnded ? 'auto' : 'none',
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            fontFamily: "var(--font-space-mono, 'Space Mono', monospace)",
            fontSize: '10px',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#0076B6',
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
          }}
        >
          <span style={{ display: 'block', width: '32px', height: '1px', background: '#0076B6' }} />
          Detroit Web Design Agency
          <span style={{ display: 'block', width: '32px', height: '1px', background: '#0076B6' }} />
        </div>

        <h1
          style={{
            fontFamily: "var(--font-heading, var(--font-syne, 'Syne', sans-serif))",
            fontSize: 'clamp(2.6rem, 6.5vw, 5.5rem)',
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            marginBottom: '32px',
          }}
        >
          We Build Businesses<br />
          <span style={{ color: '#0076B6' }}>That Get Found.</span>
        </h1>

        <p
          style={{
            fontFamily: "var(--font-inter, 'Inter', sans-serif)",
            fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
            lineHeight: 1.7,
            color: 'rgba(208,216,224,0.82)',
            maxWidth: '560px',
            margin: '0 auto 48px',
          }}
        >
          High-performance websites. Real Google rankings. AI lead capture.
          <br />$0 down — see your free mockup before you pay a cent.
        </p>

        <a
          href="/contact"
          className="cinematic-cta"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '18px 38px',
            background: '#0076B6',
            color: '#ffffff',
            fontFamily: "var(--font-syne, 'Syne', sans-serif)",
            fontSize: '15px',
            fontWeight: 700,
            letterSpacing: '0.04em',
            textDecoration: 'none',
            borderRadius: '4px',
            border: '1px solid transparent',
            transition: 'box-shadow 0.3s ease, transform 0.2s ease',
          }}
        >
          Get Your Free Mockup →
        </a>
      </div>

      {/* Bounce chevron — appears after video ends */}
      {videoEnded && (
        <div
          className="chevron-bounce"
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2,
          }}
        >
          <svg width="24" height="14" viewBox="0 0 24 14" fill="none">
            <path d="M2 2L12 11L22 2" stroke="rgba(208,216,224,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}

      <style>{`
        .cinematic-cta:hover {
          box-shadow: 0 0 32px rgba(0,118,182,0.55), 0 0 64px rgba(0,118,182,0.25);
          transform: translateY(-2px);
        }
        @keyframes bounce-chevron {
          0%, 100% { transform: translateX(-50%) translateY(0); opacity: 0.5; }
          50% { transform: translateX(-50%) translateY(8px); opacity: 1; }
        }
        .chevron-bounce { animation: bounce-chevron 2s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
