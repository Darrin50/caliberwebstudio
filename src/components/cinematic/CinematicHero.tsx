'use client';

import { useEffect, useRef, useState } from 'react';

export default function CinematicHero() {
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Fallback: show content after 1.5 s even if video hasn't loaded/ended.
    // This prevents a solid-black hero when the browser can't autoplay or the
    // file is slow on a first visit.
    const fallback = setTimeout(() => setVideoEnded(true), 1500);

    // Explicitly attempt play — React hydration doesn't re-trigger autoplay.
    const v = videoRef.current;
    if (v) v.play().catch(() => {});

    return () => clearTimeout(fallback);
  }, []);

  return (
    <section
      id="hero"
      data-force-dark
      style={{
        background: '#0a0a0b',
        padding: 'clamp(40px, 6vw, 80px) clamp(20px, 5vw, 40px)',
      }}
    >
      {/* ── Letterbox container ── */}
      <div
        style={{
          position: 'relative',
          maxWidth: '1200px',
          margin: '0 auto',
          borderRadius: '12px',
          overflow: 'hidden',
          height: 'clamp(320px, 60vh, 500px)',
          background: '#0a0a0b',
        }}
      >
        {/* Video — plays once, no loop */}
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="metadata"
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

        {/* Hero text — fades in after video ends */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: 'clamp(24px, 4vw, 60px)',
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
              marginBottom: '20px',
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
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              marginBottom: '20px',
            }}
          >
            We Build Businesses<br />
            <span style={{ color: '#0076B6' }}>That Get Found.</span>
          </h1>

          <p
            style={{
              fontFamily: "var(--font-inter, 'Inter', sans-serif)",
              fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
              lineHeight: 1.65,
              color: 'rgba(208,216,224,0.82)',
              maxWidth: '500px',
              margin: '0 auto 32px',
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
              padding: '16px 34px',
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

        {/* Bounce chevron — inside container, bottom-center */}
        {videoEnded && (
          <div
            className="chevron-bounce"
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 3,
            }}
          >
            <svg width="24" height="14" viewBox="0 0 24 14" fill="none">
              <path d="M2 2L12 11L22 2" stroke="rgba(208,216,224,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
      </div>

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
