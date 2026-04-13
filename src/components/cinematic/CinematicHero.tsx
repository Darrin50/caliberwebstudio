'use client';

import { useRef, useState, useEffect, useCallback } from 'react';

const heroVideos = [
  '/videos/hero-scene-1.mp4',
  '/videos/hero-scene-2.mp4',
  '/videos/hero-scene-3.mp4',
  '/videos/hero-scene-4.mp4',
];

// Duration of the opacity crossfade between scenes (ms)
const CROSSFADE_MS = 700;

export default function CinematicHero() {
  const [currentScene, setCurrentScene] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [revealVisible, setRevealVisible] = useState(false);
  const [muted, setMuted] = useState(true);

  // Ref array so we never recreate callbacks when refs change
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([null, null, null, null]);
  // Ref mirrors for values needed inside async callbacks (avoid stale closures)
  const currentSceneRef = useRef(0);
  const mutedRef = useRef(true);

  // Boot: play scene 0 immediately
  useEffect(() => {
    const v = videoRefs.current[0];
    if (v) {
      v.muted = true;
      v.play().catch(() => {});
    }
  }, []);

  const handleToggleMute = useCallback(() => {
    const next = !mutedRef.current;
    mutedRef.current = next;
    setMuted(next);
    videoRefs.current.forEach(v => { if (v) v.muted = next; });
  }, []);

  const handleEnded = useCallback((endedScene: number) => {
    // Guard against stale onEnded events from previously-active videos
    if (endedScene !== currentSceneRef.current) return;

    const nextScene = endedScene + 1;

    if (nextScene >= heroVideos.length) {
      // All scenes done — fade every video out, then reveal
      setIsDone(true);
      setTimeout(() => setRevealVisible(true), CROSSFADE_MS + 100);
      return;
    }

    // Start the next video (it's already in the DOM, just needs play())
    const nextVideo = videoRefs.current[nextScene];
    if (nextVideo) {
      nextVideo.muted = mutedRef.current;
      nextVideo.currentTime = 0;
      nextVideo.play().catch(() => {});
    }

    // Update both the ref (sync) and state (triggers re-render → CSS crossfade)
    currentSceneRef.current = nextScene;
    setCurrentScene(nextScene);

    // Pause the outgoing video after the crossfade finishes (save resources)
    setTimeout(() => {
      const prev = videoRefs.current[endedScene];
      if (prev) prev.pause();
    }, CROSSFADE_MS + 50);
  }, []);

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
      {/* ── All 4 videos always in DOM, stacked — opacity crossfade handles transitions ── */}
      {heroVideos.map((src, i) => (
        <video
          key={i}
          ref={el => { videoRefs.current[i] = el; }}
          muted
          playsInline
          preload="auto"
          onEnded={() => handleEnded(i)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: isDone ? 0 : currentScene === i ? 1 : 0,
            transition: `opacity ${CROSSFADE_MS}ms ease`,
            zIndex: 0,
          }}
        >
          <source src={src} type="video/mp4" />
        </video>
      ))}

      {/* Dark overlay — softens video so text is always legible */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(10,10,11,0.25) 0%, rgba(10,10,11,0.6) 100%)',
          opacity: isDone ? 0 : 1,
          transition: `opacity ${CROSSFADE_MS}ms ease`,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Reveal background gradient (fades in after videos end) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,118,182,0.18) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(0,118,182,0.08) 0%, transparent 60%), #0a0a0b',
          opacity: isDone && revealVisible ? 1 : 0,
          transition: 'opacity 0.8s ease',
          zIndex: 0,
        }}
      />

      {/* ── Scene progress indicators ── */}
      <div
        style={{
          position: 'absolute',
          bottom: '48px',
          right: '32px',
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
          zIndex: 3,
          opacity: isDone ? 0 : 1,
          transition: `opacity ${CROSSFADE_MS}ms ease`,
        }}
      >
        {heroVideos.map((_, i) => (
          <span
            key={i}
            style={{
              display: 'block',
              width: i === currentScene ? '24px' : '8px',
              height: '2px',
              background: i === currentScene ? '#0076B6' : 'rgba(208,216,224,0.3)',
              borderRadius: '2px',
              transition: 'width 0.3s ease, background 0.3s ease',
            }}
          />
        ))}
      </div>

      {/* ── Mute/unmute button ── */}
      <button
        onClick={handleToggleMute}
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
          display: isDone ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'rgba(208,216,224,0.8)',
          backdropFilter: 'blur(8px)',
          transition: 'background 0.2s ease',
          zIndex: 3,
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

      {/* ── Reveal content: headline + CTA (fades in after all videos end) ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          padding: 'clamp(100px, 12vw, 140px) clamp(20px, 6vw, 60px) clamp(60px, 8vw, 100px)',
          maxWidth: '900px',
          margin: '0 auto',
          opacity: isDone && revealVisible ? 1 : 0,
          transform: isDone && revealVisible ? 'translateY(0)' : 'translateY(32px)',
          transition: 'opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s',
          pointerEvents: isDone ? 'auto' : 'none',
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

      {/* Chevron — only after reveal */}
      {isDone && revealVisible && (
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
