'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const CINEMATIC_SCENES = [
  '/videos/hero-scene-1.mp4',
  '/videos/hero-scene-2.mp4',
  '/videos/hero-scene-3.mp4',
  '/videos/hero-scene-4.mp4',
];
const CROSSFADE_MS = 700;

function useCountUp(target: number, duration: number, started: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      setCount(Math.floor(start));
      if (start >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, started]);

  return count;
}

interface StatCardProps {
  value: string;
  label: string;
  numericValue: number;
  prefix?: string;
  suffix?: string;
  started: boolean;
}

function StatCard({ value, label, numericValue, prefix = '', suffix = '', started }: StatCardProps) {
  const count = useCountUp(numericValue, 1800, started);
  const displayValue = numericValue > 0 ? `${prefix}${count}${suffix}` : value;

  return (
    <div
      className="stat-card ts-stat-card"
      style={{
        textAlign: 'center',
        padding: 'clamp(24px, 3vw, 36px) clamp(16px, 2vw, 24px)',
        borderRadius: '8px',
        transition: 'border-color 0.3s ease, transform 0.3s ease',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      <div
        className="ts-stat-number"
        style={{
          fontFamily: "var(--font-syne, 'Syne', sans-serif)",
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          lineHeight: 1,
          marginBottom: '8px',
        }}
      >
        {displayValue}
      </div>
      <div
        className="ts-stat-label"
        style={{
          fontFamily: "var(--font-space-mono, 'Space Mono', monospace)",
          fontSize: '10px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>
    </div>
  );
}

const SERVICE_CARDS = [
  {
    icon: '◈',
    title: 'Website Design',
    desc: 'High-performance sites that rank and convert',
  },
  {
    icon: '◎',
    title: 'SEO & Google',
    desc: 'Get found on Google, Maps, and AI search',
  },
  {
    icon: '◉',
    title: 'AI Chatbot',
    desc: '24/7 lead capture that never sleeps',
  },
  {
    icon: '◐',
    title: 'Growth Systems',
    desc: 'Reviews, reputation, and recurring revenue',
  },
];

export default function TransformationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([null, null, null, null]);
  const currentSceneRef = useRef(0);

  // Boot: play scene 0
  useEffect(() => {
    const v = videoRefs.current[0];
    if (v) v.play().catch(() => {});
  }, []);

  // Stats intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleEnded = useCallback((endedScene: number) => {
    if (endedScene !== currentSceneRef.current) return;
    const nextScene = (endedScene + 1) % CINEMATIC_SCENES.length;
    const nextVideo = videoRefs.current[nextScene];
    if (nextVideo) {
      nextVideo.currentTime = 0;
      nextVideo.play().catch(() => {});
    }
    currentSceneRef.current = nextScene;
    setCurrentScene(nextScene);
    setTimeout(() => {
      const prev = videoRefs.current[endedScene];
      if (prev) prev.pause();
    }, CROSSFADE_MS + 50);
  }, []);

  return (
    <section
      className="ts-section"
      style={{
        position: 'relative',
        isolation: 'isolate',
        overflow: 'hidden',
        padding: 'clamp(72px, 9vw, 120px) clamp(20px, 6vw, 60px)',
      }}
    >
      {/* ── Cinematic video background ── */}
      {CINEMATIC_SCENES.map((src, i) => (
        <video
          key={i}
          ref={el => { videoRefs.current[i] = el; }}
          muted
          playsInline
          preload="auto"
          onEnded={() => handleEnded(i)}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: currentScene === i ? 1 : 0,
            transition: `opacity ${CROSSFADE_MS}ms ease`,
            zIndex: 0,
          }}
        >
          <source src={src} type="video/mp4" />
        </video>
      ))}

      {/* Dark overlay */}
      <div
        className="ts-bg-overlay"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(10,10,11,0.72)',
          zIndex: 5,
          pointerEvents: 'none',
        }}
      />

      {/* ── Content ── */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto' }}>
        {/* Headline */}
        <div style={{ marginBottom: 'clamp(48px, 6vw, 72px)', maxWidth: '720px' }}>
          <div
            style={{
              fontFamily: "var(--font-space-mono, 'Space Mono', monospace)",
              fontSize: '10px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#0076B6',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span style={{ display: 'block', width: '24px', height: '1px', background: '#0076B6' }} />
            The Transformation
          </div>
          <h2
            className="ts-heading"
            style={{
              fontFamily: "var(--font-heading, var(--font-syne, 'Syne', sans-serif))",
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              marginBottom: '12px',
            }}
          >
            We don&apos;t just build websites.
          </h2>
          <h2
            style={{
              fontFamily: "var(--font-heading, var(--font-syne, 'Syne', sans-serif))",
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#0076B6',
            }}
          >
            We build your entire online presence.
          </h2>
        </div>

        {/* Stats row */}
        <div ref={sectionRef} className="transformation-stats">
          <StatCard value="340%" label="More bookings" numericValue={340} suffix="%" started={statsVisible} />
          <StatCard value="#1" label="Google ranking" numericValue={0} started={statsVisible} />
          <StatCard value="200%" label="More online orders" numericValue={200} suffix="%" started={statsVisible} />
          <StatCard value="15+" label="Calls per week" numericValue={15} suffix="+" started={statsVisible} />
        </div>

        {/* Service cards */}
        <div className="transformation-services" style={{ marginTop: 'clamp(48px, 6vw, 64px)' }}>
          {SERVICE_CARDS.map((card) => (
            <div
              key={card.title}
              className="service-card-hover ts-service-card"
              style={{
                borderRadius: '8px',
                padding: 'clamp(24px, 3vw, 36px)',
                transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
            >
              <div
                style={{
                  fontSize: '28px',
                  marginBottom: '16px',
                  color: '#0076B6',
                  lineHeight: 1,
                }}
              >
                {card.icon}
              </div>
              <h3
                className="ts-service-title"
                style={{
                  fontFamily: "var(--font-syne, 'Syne', sans-serif)",
                  fontSize: 'clamp(1rem, 1.6vw, 1.15rem)',
                  fontWeight: 700,
                  marginBottom: '8px',
                  letterSpacing: '-0.01em',
                }}
              >
                {card.title}
              </h3>
              <p
                className="ts-service-desc"
                style={{
                  fontFamily: "var(--font-inter, 'Inter', sans-serif)",
                  fontSize: '14px',
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* ── Dark mode (default) ── */
        .ts-section {
          background: #0a0a0b;
          border-top: 1px solid rgba(176,183,188,0.12);
        }
        .ts-stat-card {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
        }
        .ts-stat-number { color: #ffffff; }
        .ts-stat-label  { color: rgba(208,216,224,0.6); }
        .ts-heading     { color: #D0D8E0; }
        .ts-service-card {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
        }
        .ts-service-title { color: #D0D8E0; }
        .ts-service-desc  { color: rgba(208,216,224,0.65); }

        /* ── Light mode overrides ── */
        @media (prefers-color-scheme: light) {
          .ts-section {
            background: #ffffff;
            border-top: 1px solid rgba(0,0,0,0.08);
          }
          .ts-section video,
          .ts-bg-overlay { display: none; }
          .ts-stat-card {
            background: rgba(0,0,0,0.04);
            border: 1px solid rgba(0,0,0,0.09);
          }
          .ts-stat-number { color: #0a0a0b; }
          .ts-stat-label  { color: rgba(0,0,0,0.45); }
          .ts-heading     { color: #0a0a0b; }
          .ts-service-card {
            background: rgba(0,0,0,0.04);
            border: 1px solid rgba(0,0,0,0.09);
          }
          .ts-service-title { color: #0a0a0b; }
          .ts-service-desc  { color: rgba(0,0,0,0.5); }
        }

        /* ── Layout ── */
        .transformation-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(12px, 2vw, 20px);
        }
        .transformation-services {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(12px, 2vw, 20px);
        }
        .service-card-hover:hover {
          transform: translateY(-4px);
          border-color: rgba(0,118,182,0.4);
          box-shadow: 0 8px 32px rgba(0,118,182,0.12);
        }
        @media (max-width: 900px) {
          .transformation-stats { grid-template-columns: repeat(2, 1fr); }
          .transformation-services { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .transformation-stats { grid-template-columns: repeat(2, 1fr); }
          .transformation-services { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
