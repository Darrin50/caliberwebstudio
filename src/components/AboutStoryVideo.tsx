'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';

/**
 * AboutStoryVideo
 *
 * Plays the 4 cinematic hero-scene clips once (no loop).
 * Each clip has a full-screen overlay with real website stats and the
 * CWS origin story. Content fades in with the clip and fades out on
 * the clip-to-clip crossfade. After the last clip ends the video fades
 * to black and a CTA appears: "Get Your Free Mockup Today".
 */

const CLIPS = [
  '/videos/hero-scene-1.mp4',
  '/videos/hero-scene-2.mp4',
  '/videos/hero-scene-3.mp4',
  '/videos/hero-scene-4.mp4',
];

const CROSSFADE_MS = 700;
const TEXT_FADE_MS = 380;

type StatScene  = { kind: 'stat';  stat: string; label: string };
type StoryScene = { kind: 'story'; heading: string; body: string };
type AScene = StatScene | StoryScene;

const CLIP_SCENES: AScene[] = [
  {
    kind: 'stat',
    stat: '97%',
    label:
      'of consumers search online before visiting a local business\u00a0— BrightLocal, 2024',
  },
  {
    kind: 'stat',
    stat: '75%',
    label:
      'of users judge a business\u2019s credibility based on its website design alone\u00a0— Stanford Web Credibility Research',
  },
  {
    kind: 'story',
    heading: 'We saw the gap no one was filling.',
    body:
      'Great Detroit businesses\u00a0\u2014 restaurants, barbershops, contractors\u00a0\u2014 were losing customers every day. Not because they were bad at what they do. Because nobody online knew they existed.',
  },
  {
    kind: 'story',
    heading: 'AI changed the math.',
    body:
      'What took six weeks and $20\u00a0000 five years ago now takes 48\u00a0hours at a fraction of the cost. We built Caliber to pass that advantage directly to the businesses that need it most.',
  },
];

/* ── Overlay scene renderers ──────────────────────────────────────── */
function StatOverlay({ scene }: { scene: StatScene }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        fontFamily: "var(--font-space-mono,'Space Mono',monospace)",
        fontSize: '11px',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: '#0076B6',
        marginBottom: '16px',
      }}>
        Why This Matters
      </div>
      <div style={{
        fontFamily: "var(--font-syne,'Syne',sans-serif)",
        fontWeight: 800,
        fontSize: 'clamp(5rem,14vw,11rem)',
        lineHeight: 1,
        letterSpacing: '-0.04em',
        color: '#ffffff',
        marginBottom: '20px',
      }}>
        {scene.stat}
      </div>
      <div style={{
        fontFamily: "var(--font-inter,'Inter',sans-serif)",
        fontSize: 'clamp(1rem,1.8vw,1.2rem)',
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

function StoryOverlay({ scene }: { scene: StoryScene }) {
  return (
    <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto' }}>
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
        lineHeight: 1.8,
        margin: 0,
      }}>
        {scene.body}
      </p>
    </div>
  );
}

function CTAOverlay() {
  return (
    <div style={{ textAlign: 'center' }}>
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
        Your Turn
        <span style={{ display: 'block', width: '32px', height: '1px', background: '#0076B6' }} />
      </div>
      <h2 style={{
        fontFamily: "var(--font-syne,'Syne',sans-serif)",
        fontWeight: 800,
        fontSize: 'clamp(2.4rem,6vw,5rem)',
        lineHeight: 0.97,
        letterSpacing: '-0.04em',
        color: '#ffffff',
        marginBottom: '12px',
      }}>
        Ready to get found?
      </h2>
      <p style={{
        fontFamily: "var(--font-inter,'Inter',sans-serif)",
        fontSize: 'clamp(1rem,1.8vw,1.2rem)',
        color: 'rgba(208,216,224,0.72)',
        maxWidth: '500px',
        margin: '0 auto 44px',
        lineHeight: 1.75,
      }}>
        See your custom site before you commit. Free mockup, built around
        your business, delivered in 48&nbsp;hours.
      </p>
      <Link
        href="/contact"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          padding: '18px 52px',
          background: '#0076B6',
          color: '#fff',
          fontFamily: "var(--font-syne,'Syne',sans-serif)",
          fontSize: '16px',
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
        Get Your Free Mockup Today →
      </Link>
    </div>
  );
}

/* ── Main component ─────────────────────────────────────────────────── */
export default function AboutStoryVideo() {
  const videoRefs     = useRef<(HTMLVideoElement | null)[]>([null, null, null, null]);
  const currentClipRef = useRef(0);
  const [currentClip, setCurrentClip] = useState(0);
  const [isDone,      setIsDone]      = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const v = videoRefs.current[0];
    if (!v) return;
    v.play().catch(() => {});
    // Fade in the first overlay shortly after playback starts
    const t = setTimeout(() => setTextVisible(true), 400);
    return () => clearTimeout(t);
  }, []);

  const handleEnded = useCallback((endedClip: number) => {
    if (endedClip !== currentClipRef.current) return;

    const nextClip = endedClip + 1;

    // Fade out current text
    setTextVisible(false);

    if (nextClip >= CLIPS.length) {
      // All clips done — show CTA
      setTimeout(() => {
        setIsDone(true);
        setTextVisible(true);
      }, TEXT_FADE_MS);
      return;
    }

    // Kick off next clip
    const nextVideo = videoRefs.current[nextClip];
    if (nextVideo) {
      nextVideo.currentTime = 0;
      nextVideo.play().catch(() => {});
    }
    currentClipRef.current = nextClip;
    setCurrentClip(nextClip);

    // Fade in new overlay once text has faded out
    setTimeout(() => setTextVisible(true), TEXT_FADE_MS);

    // Pause previous clip after crossfade completes
    setTimeout(() => {
      const prev = videoRefs.current[endedClip];
      if (prev) prev.pause();
    }, CROSSFADE_MS + 50);
  }, []);

  const scene = CLIP_SCENES[currentClip];

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
      {/* Video layers — crossfade between clips */}
      {CLIPS.map((src, i) => (
        <video
          key={i}
          ref={el => { videoRefs.current[i] = el; }}
          muted
          playsInline
          preload={i === 0 ? 'auto' : 'none'}
          onEnded={() => handleEnded(i)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: currentClip === i && !isDone ? 1 : 0,
            transition: `opacity ${CROSSFADE_MS}ms ease`,
            zIndex: 0,
          }}
          src={src}
        />
      ))}

      {/* Dark overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: isDone ? 'rgba(0,0,0,0.92)' : 'rgba(0,0,0,0.70)',
        transition: 'background 1.2s ease',
        zIndex: 1,
        pointerEvents: 'none',
      }} />

      {/* Radial blue glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background:
          'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,118,182,0.09) 0%, transparent 70%)',
        zIndex: 1,
        pointerEvents: 'none',
      }} />

      {/* Text overlay — fades in/out between scenes */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(100px,12vw,160px) clamp(20px,6vw,80px)',
        minHeight: '100vh',
        opacity: textVisible ? 1 : 0,
        transition: `opacity ${TEXT_FADE_MS}ms ease`,
      }}>
        {isDone ? (
          <CTAOverlay />
        ) : scene.kind === 'stat' ? (
          <StatOverlay scene={scene} />
        ) : (
          <StoryOverlay scene={scene} />
        )}
      </div>

      {/* Clip progress dots */}
      {!isDone && (
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
          {CLIPS.map((_, i) => (
            <div key={i} style={{
              width: i === currentClip ? '20px' : '6px',
              height: '3px',
              borderRadius: '2px',
              background: i === currentClip ? '#0076B6' : 'rgba(255,255,255,0.2)',
              transition: 'all 0.4s ease',
            }} />
          ))}
        </div>
      )}
    </section>
  );
}
