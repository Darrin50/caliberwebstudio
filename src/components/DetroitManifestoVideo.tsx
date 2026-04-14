'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

/* ─── Scene data ─────────────────────────────────────────────────── */
type StatScene  = { type: 'stat';  big: string; label: string };
type CopyScene  = { type: 'copy';  heading: string; body: string };
type Scene = StatScene | CopyScene;

const SCENES: Scene[] = [
  {
    type: 'stat',
    big: '97%',
    label: 'of consumers search online before visiting a local business',
  },
  {
    type: 'stat',
    big: '76,000+',
    label: 'registered small businesses in Detroit — most invisible to their next customer',
  },
  {
    type: 'stat',
    big: 'Only 17%',
    label: 'of local businesses say their website actually brings in new customers',
  },
  {
    type: 'copy',
    heading: '$10,000 — $25,000.',
    body: "That's what agencies charged Detroit businesses for a custom website. Most couldn't afford to play.",
  },
  {
    type: 'copy',
    heading: 'AI changed the math.',
    body: 'Enterprise-grade sites. 48-hour turnaround. A fraction of what traditional agencies charge.',
  },
  {
    type: 'copy',
    heading: 'We built Caliber to close that gap.',
    body: 'Sites that rank on Google, capture leads 24/7, and actually grow your business — starting at $0 down.',
  },
  {
    type: 'stat',
    big: '$0 Down.',
    label: 'See your custom site before you commit. Live in 48 hours.',
  },
];

const FINAL = {
  line1: 'Detroit built the world once.',
  line2: "We're making sure",
  line3: 'the world finds it again.',
  sub:   'This is why Caliber exists.',
};

const SCENE_HOLD_MS = 3200; // how long each scene is fully visible
const FADE_MS       = 420;  // crossfade duration

/* ─── Scene renderer ─────────────────────────────────────────────── */
function SceneView({ scene }: { scene: Scene }) {
  if (scene.type === 'stat') {
    return (
      <div style={{ textAlign: 'center', padding: '0 clamp(20px,6vw,80px)' }}>
        <div style={{
          fontFamily: "var(--font-space-mono,'Space Mono',monospace)",
          fontSize: '11px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#0076B6',
          marginBottom: '16px',
        }}>
          Detroit Facts
        </div>
        <div style={{
          fontFamily: "var(--font-syne,'Syne',sans-serif)",
          fontWeight: 800,
          fontSize: 'clamp(4rem,11vw,9rem)',
          lineHeight: 1,
          letterSpacing: '-0.04em',
          color: '#ffffff',
          marginBottom: '20px',
        }}>
          {scene.big}
        </div>
        <div style={{
          fontFamily: "var(--font-inter,'Inter',sans-serif)",
          fontSize: 'clamp(1rem,1.8vw,1.25rem)',
          color: 'rgba(208,216,224,0.85)',
          maxWidth: '560px',
          margin: '0 auto',
          lineHeight: 1.65,
        }}>
          {scene.label}
        </div>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', padding: '0 clamp(20px,6vw,80px)', maxWidth: '780px', margin: '0 auto' }}>
      <div style={{
        width: '36px',
        height: '2px',
        background: '#0076B6',
        margin: '0 auto 28px',
      }} />
      <h3 style={{
        fontFamily: "var(--font-syne,'Syne',sans-serif)",
        fontWeight: 800,
        fontSize: 'clamp(1.8rem,4.5vw,3.5rem)',
        lineHeight: 1.05,
        letterSpacing: '-0.035em',
        color: '#ffffff',
        marginBottom: '20px',
      }}>
        {scene.heading}
      </h3>
      <p style={{
        fontFamily: "var(--font-inter,'Inter',sans-serif)",
        fontSize: 'clamp(1rem,1.7vw,1.2rem)',
        color: 'rgba(208,216,224,0.78)',
        lineHeight: 1.75,
        margin: 0,
      }}>
        {scene.body}
      </p>
    </div>
  );
}

/* ─── Final static card ──────────────────────────────────────────── */
function FinalView() {
  return (
    <div style={{ textAlign: 'center', padding: '0 clamp(20px,6vw,80px)' }}>
      <div style={{
        fontFamily: "var(--font-space-mono,'Space Mono',monospace)",
        fontSize: '11px',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: '#0076B6',
        marginBottom: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '14px',
      }}>
        <span style={{ display: 'block', width: '32px', height: '1px', background: '#0076B6' }} />
        Detroit First
        <span style={{ display: 'block', width: '32px', height: '1px', background: '#0076B6' }} />
      </div>
      <h2 style={{
        fontFamily: "var(--font-syne,'Syne',sans-serif)",
        fontWeight: 800,
        fontSize: 'clamp(2.4rem,6.5vw,5.5rem)',
        lineHeight: 0.95,
        letterSpacing: '-0.04em',
        color: '#ffffff',
        marginBottom: '8px',
      }}>
        {FINAL.line1}
      </h2>
      <h2 style={{
        fontFamily: "var(--font-syne,'Syne',sans-serif)",
        fontWeight: 800,
        fontSize: 'clamp(2.4rem,6.5vw,5.5rem)',
        lineHeight: 0.95,
        letterSpacing: '-0.04em',
        color: '#ffffff',
        marginBottom: '0',
      }}>
        {FINAL.line2}{' '}
        <span style={{ color: '#0076B6' }}>{FINAL.line3}</span>
      </h2>
      <p style={{
        fontFamily: "var(--font-space-mono,'Space Mono',monospace)",
        fontSize: 'clamp(11px,1.2vw,13px)',
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: 'rgba(208,216,224,0.5)',
        margin: '32px 0 44px',
      }}>
        {FINAL.sub}
      </p>
      <Link
        href="/contact"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          padding: '16px 40px',
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
  );
}

/* ─── Main component ─────────────────────────────────────────────── */
export default function DetroitManifestoVideo() {
  const videoRef    = useRef<HTMLVideoElement>(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [sceneIdx,   setSceneIdx]   = useState(0);
  const [visible,    setVisible]    = useState(false);
  const [isFinal,    setIsFinal]    = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.play().catch(() => {});

    let idx = 0;
    let transitioning = false;

    // Fade in scene 0 after a short pause
    const startT = setTimeout(() => setVisible(true), 300);

    // Advance to next scene every (SCENE_HOLD_MS + FADE_MS) ms
    const interval = setInterval(() => {
      if (transitioning) return;
      transitioning = true;

      setVisible(false);
      setTimeout(() => {
        idx++;
        if (idx >= SCENES.length) {
          setIsFinal(true);
          clearInterval(interval);
        } else {
          setSceneIdx(idx);
        }
        setVisible(true);
        transitioning = false;
      }, FADE_MS);
    }, SCENE_HOLD_MS + FADE_MS);

    return () => {
      clearTimeout(startT);
      clearInterval(interval);
    };
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
      {/* Video — plays once; unmounts on end leaving black bg */}
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

      {/* Heavy dark overlay — covers video imperfections, makes text pop */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0,0,0,0.76)',
        zIndex: 1,
        pointerEvents: 'none',
      }} />

      {/* Subtle radial glow in center */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,118,182,0.1) 0%, transparent 70%)',
        zIndex: 1,
        pointerEvents: 'none',
      }} />

      {/* Text overlay — crossfades between scenes */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(100px,12vw,160px) 0 clamp(80px,10vw,120px)',
        opacity: visible ? 1 : 0,
        transition: `opacity ${FADE_MS}ms ease`,
      }}>
        {isFinal ? <FinalView /> : <SceneView scene={SCENES[sceneIdx]} />}
      </div>

      {/* Scene progress dots */}
      {!isFinal && (
        <div style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
        }}>
          {SCENES.map((_, i) => (
            <div key={i} style={{
              width: i === sceneIdx ? '20px' : '6px',
              height: '3px',
              borderRadius: '2px',
              background: i === sceneIdx ? '#0076B6' : 'rgba(255,255,255,0.2)',
              transition: 'all 0.4s ease',
            }} />
          ))}
        </div>
      )}
    </section>
  );
}
