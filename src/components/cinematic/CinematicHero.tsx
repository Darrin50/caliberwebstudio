'use client';

import { useEffect, useRef, useState } from 'react';

export default function CinematicHero() {
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Explicitly attempt play — React hydration doesn't re-trigger autoplay.
    const v = videoRef.current;
    if (v) v.play().catch(() => {});
  }, []);

  return (
    <section
      id="hero"
      data-force-dark
      style={{
        background: '#000000',
        minHeight: 'clamp(480px, 70vh, 100vh)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Video — plays once, unmounts the instant it ends for a hard cut to black */}
      {!videoEnded && (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={() => setVideoEnded(true)}
          onError={() => setVideoEnded(true)}
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
      )}

      {/* Hero content — invisible during video, snaps in the moment it ends */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 'clamp(60px, 8vw, 120px) clamp(20px, 5vw, 60px)',
          width: '100%',
          opacity: videoEnded ? 1 : 0,
          transform: videoEnded ? 'translateY(0)' : 'translateY(12px)',
          transition: videoEnded ? 'opacity 0.35s ease, transform 0.35s ease' : 'none',
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
            marginBottom: '24px',
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
            fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)',
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            marginBottom: '24px',
          }}
        >
          We Build Businesses<br />
          <span style={{ color: '#0076B6' }}>That Get Found.</span>
        </h1>

        <p
          style={{
            fontFamily: "var(--font-inter, 'Inter', sans-serif)",
            fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)',
            lineHeight: 1.65,
            color: 'rgba(208,216,224,0.82)',
            maxWidth: '520px',
            margin: '0 auto 36px',
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
            padding: '16px 36px',
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

        {/* Scroll chevron */}
        <div className="chevron-bounce" style={{ marginTop: '48px' }}>
          <svg width="24" height="14" viewBox="0 0 24 14" fill="none">
            <path d="M2 2L12 11L22 2" stroke="rgba(208,216,224,0.35)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <style>{`
        .cinematic-cta:hover {
          box-shadow: 0 0 32px rgba(0,118,182,0.55), 0 0 64px rgba(0,118,182,0.25);
          transform: translateY(-2px);
        }
        @keyframes bounce-chevron {
          0%, 100% { transform: translateY(0); opacity: 0.35; }
          50%       { transform: translateY(8px); opacity: 0.75; }
        }
        .chevron-bounce { animation: bounce-chevron 2s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
