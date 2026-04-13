'use client';

import { useRef, useState, useCallback, useEffect } from 'react';

const heroVideos = [
  '/videos/hero-scene-1.mp4',
  '/videos/hero-scene-2.mp4',
  '/videos/hero-scene-3.mp4',
  '/videos/hero-scene-4.mp4',
];

export default function CinematicHero() {
  const [sceneIndex, setSceneIndex] = useState<number | 'done'>(0);
  const [muted, setMuted] = useState(true);
  const [revealVisible, setRevealVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // When scene transitions, load and play the new video
  useEffect(() => {
    if (sceneIndex === 'done') return;
    const video = videoRef.current;
    if (!video) return;
    video.muted = muted;
    video.load();
    video.play().catch(() => {});
  }, [sceneIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  // Sync muted state to video element without re-triggering scene transitions
  useEffect(() => {
    const video = videoRef.current;
    if (video) video.muted = muted;
  }, [muted]);

  const handleEnded = useCallback(() => {
    if (sceneIndex === 'done') return;
    const next = (sceneIndex as number) + 1;
    if (next >= heroVideos.length) {
      setSceneIndex('done');
      // Slight delay so the video fade-out reads before the reveal comes in
      setTimeout(() => setRevealVisible(true), 120);
    } else {
      setSceneIndex(next);
    }
  }, [sceneIndex]);

  return (
    <section
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
      {/* ── Video layer ── */}
      {sceneIndex !== 'done' && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
          }}
        >
          <video
            ref={videoRef}
            key={sceneIndex as number}
            autoPlay
            muted={muted}
            playsInline
            onEnded={handleEnded}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          >
            <source src={heroVideos[sceneIndex as number]} type="video/mp4" />
          </video>
          {/* Subtle dark overlay during playback */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(10,10,11,0.25) 0%, rgba(10,10,11,0.55) 100%)',
            }}
          />
          {/* Scene counter */}
          <div
            style={{
              position: 'absolute',
              bottom: '48px',
              right: '32px',
              fontFamily: "var(--font-space-mono, 'Space Mono', monospace)",
              fontSize: '10px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(208,216,224,0.45)',
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
            }}
          >
            {heroVideos.map((_, i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: i === sceneIndex ? '24px' : '8px',
                  height: '2px',
                  background: i === sceneIndex ? '#0076B6' : 'rgba(208,216,224,0.3)',
                  borderRadius: '2px',
                  transition: 'width 0.3s ease, background 0.3s ease',
                }}
              />
            ))}
          </div>
          {/* Mute/unmute */}
          <button
            onClick={() => setMuted(m => !m)}
            aria-label={muted ? 'Unmute video' : 'Mute video'}
            style={{
              position: 'absolute',
              bottom: '40px',
              left: '32px',
              background: 'rgba(10,10,11,0.6)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'rgba(208,216,224,0.8)',
              backdropFilter: 'blur(8px)',
              transition: 'background 0.2s ease',
            }}
          >
            {muted ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            )}
          </button>
        </div>
      )}

      {/* ── Reveal: logo + headline + CTA (shown after Scene 3 ends) ── */}
      {sceneIndex === 'done' && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,118,182,0.18) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(0,118,182,0.08) 0%, transparent 60%), #0a0a0b',
            zIndex: 0,
            opacity: revealVisible ? 1 : 0,
            transition: 'opacity 0.8s ease',
          }}
        />
      )}

      {/* ── Static content overlay — always visible, fades in after reveal ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          padding: 'clamp(100px, 12vw, 140px) clamp(20px, 6vw, 60px) clamp(60px, 8vw, 100px)',
          maxWidth: '900px',
          margin: '0 auto',
          opacity: sceneIndex === 'done' && revealVisible ? 1 : 0,
          transform: sceneIndex === 'done' && revealVisible ? 'translateY(0)' : 'translateY(32px)',
          transition: 'opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s',
        }}
      >
        {/* Eyebrow label */}
        <div
          style={{
            fontFamily: "var(--font-space-mono, 'Space Mono', monospace)",
            fontSize: '10px',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--navy, #0076B6)',
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
          }}
        >
          <span style={{ display: 'block', width: '32px', height: '1px', background: 'var(--navy, #0076B6)' }} />
          Detroit Web Design Agency
          <span style={{ display: 'block', width: '32px', height: '1px', background: 'var(--navy, #0076B6)' }} />
        </div>

        {/* Headline */}
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
          <span style={{ color: 'var(--navy, #0076B6)' }}>That Get Found.</span>
        </h1>

        <p
          style={{
            fontFamily: "var(--font-inter, 'Inter', sans-serif)",
            fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
            lineHeight: 1.7,
            color: 'rgba(208,216,224,0.72)',
            maxWidth: '560px',
            margin: '0 auto 48px',
          }}
        >
          High-performance websites. Real Google rankings. AI lead capture.
          <br />$0 down — see your free mockup before you pay a cent.
        </p>

        {/* CTA */}
        <a
          href="/contact"
          className="cinematic-cta"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '18px 38px',
            background: 'var(--navy, #0076B6)',
            color: '#ffffff',
            fontFamily: "var(--font-syne, 'Syne', sans-serif)",
            fontSize: '15px',
            fontWeight: 700,
            letterSpacing: '0.04em',
            textDecoration: 'none',
            borderRadius: '4px',
            border: '1px solid transparent',
            transition: 'box-shadow 0.3s ease, transform 0.2s ease',
            position: 'relative',
          }}
        >
          Get Your Free Mockup →
        </a>
      </div>

      {/* Animated down chevron — only after reveal */}
      {sceneIndex === 'done' && revealVisible && (
        <div
          className="chevron-bounce"
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
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
        .chevron-bounce {
          animation: bounce-chevron 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
