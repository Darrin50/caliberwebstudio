'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function DetroitManifestoVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoEnded, setVideoEnded] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.play().catch(() => {});
  }, []);

  return (
    <section
      data-force-dark
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Video — plays once then reveals the manifesto text */}
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
          src="/videos/detroit-manifesto.mp4"
        />
      )}

      {/* Subtle bottom vignette while video plays */}
      {!videoEnded && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 50%, rgba(0,0,0,0.55) 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }} />
      )}

      {/* Manifesto text — revealed after video ends */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        padding: 'clamp(100px,12vw,160px) clamp(20px,6vw,80px) clamp(80px,10vw,120px)',
        width: '100%',
        maxWidth: '900px',
        margin: '0 auto',
        opacity: videoEnded ? 1 : 0,
        transform: videoEnded ? 'none' : 'translateY(16px)',
        transition: videoEnded ? 'opacity 0.45s ease, transform 0.45s ease' : 'none',
        pointerEvents: videoEnded ? 'auto' : 'none',
      }}>
        <div style={{
          fontFamily: "var(--font-space-mono,'Space Mono',monospace)",
          fontSize: '10px',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: '#0076B6',
          marginBottom: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '14px',
        }}>
          <span style={{ display: 'block', width: '36px', height: '1px', background: '#0076B6' }} />
          Detroit First
          <span style={{ display: 'block', width: '36px', height: '1px', background: '#0076B6' }} />
        </div>

        <h2 style={{
          fontFamily: "var(--font-syne,'Syne',sans-serif)",
          fontSize: 'clamp(2.8rem,7vw,6rem)',
          fontWeight: 800,
          lineHeight: 0.95,
          letterSpacing: '-0.04em',
          color: '#ffffff',
          marginBottom: '28px',
        }}>
          We&apos;re Pushing<br />
          <span style={{ color: '#0076B6' }}>The Needle.</span>
        </h2>

        <p style={{
          fontFamily: "var(--font-inter,'Inter',sans-serif)",
          fontSize: 'clamp(1rem,1.8vw,1.2rem)',
          lineHeight: 1.75,
          color: 'rgba(208,216,224,0.85)',
          maxWidth: '580px',
          margin: '0 auto 40px',
        }}>
          Detroit built the modern world once. We&apos;re making sure its businesses build the next chapter — with the digital infrastructure they&apos;ve always deserved.
        </p>

        <Link
          href="/contact"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '16px 36px',
            background: '#0076B6',
            color: '#fff',
            fontFamily: "var(--font-syne,'Syne',sans-serif)",
            fontSize: '15px',
            fontWeight: 700,
            letterSpacing: '0.04em',
            textDecoration: 'none',
            borderRadius: '4px',
            transition: 'box-shadow 0.3s ease, transform 0.2s ease',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.boxShadow = '0 0 32px rgba(0,118,182,0.55), 0 0 64px rgba(0,118,182,0.2)';
            el.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.boxShadow = 'none';
            el.style.transform = 'none';
          }}
        >
          Get Your Free Site →
        </Link>
      </div>

      {/* Bounce chevron — visible while video is playing */}
      {!videoEnded && (
        <div className="dm-chevron" style={{
          position: 'absolute',
          bottom: '36px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
        }}>
          <svg width="24" height="14" viewBox="0 0 24 14" fill="none">
            <path d="M2 2L12 11L22 2" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}

      <style>{`
        @keyframes dm-bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); opacity: 0.35; }
          50%       { transform: translateX(-50%) translateY(8px); opacity: 0.75; }
        }
        .dm-chevron { animation: dm-bounce 2s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
