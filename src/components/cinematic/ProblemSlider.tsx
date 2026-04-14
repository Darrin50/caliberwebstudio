'use client';

import { useRef, useState, useCallback } from 'react';

export default function ProblemSlider() {
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setPosition(pct);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(true);
    updatePosition(e.clientX);
    const onMove = (ev: MouseEvent) => updatePosition(ev.clientX);
    const onUp = () => {
      setDragging(false);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setDragging(true);
    updatePosition(e.touches[0].clientX);
    const onMove = (ev: TouchEvent) => updatePosition(ev.touches[0].clientX);
    const onEnd = () => {
      setDragging(false);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
    };
    window.addEventListener('touchmove', onMove);
    window.addEventListener('touchend', onEnd);
  };

  return (
    <section
      style={{
        background: '#111114',
        padding: 'clamp(72px, 9vw, 120px) clamp(20px, 6vw, 60px)',
        borderTop: '1px solid rgba(176,183,188,0.12)',
      }}
    >
      {/* Card animations */}
      <style>{`
        @keyframes ps-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-7px); }
        }
        @keyframes ps-glow-before {
          0%, 100% { box-shadow: 0 8px 32px rgba(0,0,0,0.55), 0 0 0 1px rgba(176,183,188,0.13); }
          50%       { box-shadow: 0 14px 44px rgba(0,0,0,0.65), 0 0 22px rgba(150,160,170,0.14), 0 0 0 1px rgba(176,183,188,0.28); }
        }
        @keyframes ps-glow-after {
          0%, 100% { box-shadow: 0 8px 32px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,118,182,0.32); }
          50%       { box-shadow: 0 14px 44px rgba(0,0,0,0.55), 0 0 32px rgba(0,118,182,0.32), 0 0 64px rgba(0,118,182,0.12), 0 0 0 1px rgba(0,118,182,0.58); }
        }
        .ps-card-before {
          animation: ps-float 5s ease-in-out infinite, ps-glow-before 4s ease-in-out infinite;
        }
        .ps-card-after {
          animation: ps-float 5s ease-in-out infinite 0.4s, ps-glow-after 4s ease-in-out infinite 0.8s;
        }
        @media (prefers-reduced-motion: reduce) {
          .ps-card-before, .ps-card-after { animation: none !important; }
        }
      `}</style>

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Headline */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 5vw, 60px)' }}>
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
              justifyContent: 'center',
              gap: '12px',
            }}
          >
            <span style={{ display: 'block', width: '24px', height: '1px', background: '#0076B6' }} />
            The Problem
            <span style={{ display: 'block', width: '24px', height: '1px', background: '#0076B6' }} />
          </div>
          <h2
            style={{
              fontFamily: "var(--font-heading, var(--font-syne, 'Syne', sans-serif))",
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#D0D8E0',
            }}
          >
            Most Detroit businesses are{' '}
            <span style={{ color: '#0076B6' }}>invisible online.</span>
          </h2>
        </div>

        {/* Drag hint */}
        <div style={{
          textAlign: 'center',
          marginBottom: 'clamp(12px, 2vw, 20px)',
          fontFamily: "var(--font-space-mono, 'Space Mono', monospace)",
          fontSize: '10px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(176,183,188,0.4)',
        }}>
          ← drag to reveal →
        </div>

        {/* Slider container */}
        <div
          ref={containerRef}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 9',
            borderRadius: '12px',
            overflow: 'hidden',
            cursor: dragging ? 'grabbing' : 'grab',
            userSelect: 'none',
            border: '1px solid rgba(176,183,188,0.12)',
          }}
        >
          {/* ═══════════════════════════════════════════════════
              AFTER — BASE LAYER. Always full-width underneath.
              Visible on the RIGHT side as BEFORE clips away left.
              Card anchored to right half — never crosses clip line.
          ═══════════════════════════════════════════════════ */}
          <div style={{ position: 'absolute', inset: 0, background: '#091e37' }}>

            {/* Packed store video — full panel */}
            <video
              autoPlay muted loop playsInline
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.92 }}
              src="/videos/loop-packed-store.mp4"
            />
            {/* Subtle readability overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.15)' }} />

            {/* AFTER label */}
            <div style={{
              position: 'absolute',
              top: 16, right: 18,
              fontFamily: "var(--font-space-mono, 'Space Mono', monospace)",
              fontSize: 9,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.55)',
              zIndex: 2,
            }}>
              AFTER →
            </div>

            {/* AFTER card — lower-right quadrant, video visible above and around */}
            <div
              className="ps-card-after"
              style={{
                position: 'absolute',
                bottom: '8%', left: '54%', right: '8%',
                background: 'rgba(4,12,28,0.65)',
                border: '1px solid rgba(0,118,182,0.42)',
                borderRadius: 16,
                padding: 'clamp(14px, 1.8vw, 24px)',
                backdropFilter: 'blur(12px)',
                zIndex: 3,
              }}
            >
              <div style={{
                fontFamily: "var(--font-space-mono, 'Space Mono', monospace)",
                fontSize: 10,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#0076B6',
                marginBottom: 10,
              }}>
                With Caliber Web Studio
              </div>
              <h3 style={{
                fontFamily: "var(--font-heading, var(--font-syne, 'Syne', sans-serif))",
                fontSize: 'clamp(16px, 1.8vw, 26px)',
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                margin: '0 0 10px',
              }}>
                Ranked. Found.<br />Booked Solid.
              </h3>
              <p style={{
                fontSize: 'clamp(13px, 1.1vw, 15px)',
                color: 'rgba(208,216,224,0.88)',
                lineHeight: 1.6,
                margin: 0,
              }}>
                Google #1 ranking. AI-powered lead capture. 5-star reputation system. Your phone rings. Your store fills up. Customers find <em>you</em> first.
              </p>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════
              BEFORE — TOP LAYER. Clips to show LEFT portion.
              clipPath: inset(0 (100-pos)% 0 0)
                pos=0  → inset(0 100% 0 0) → BEFORE hidden, AFTER shows
                pos=50 → inset(0 50% 0 0)  → left 50% = BEFORE  ✓
                pos=100→ inset(0 0% 0 0)   → BEFORE covers all
              Card anchored to left half — clips away naturally as you drag left.
          ═══════════════════════════════════════════════════ */}
          <div style={{
            position: 'absolute',
            inset: 0,
            clipPath: `inset(0 ${100 - position}% 0 0)`,
            background: '#0a0a0b',
            filter: 'saturate(0.45)',
          }}>

            {/* Empty store video — full panel */}
            <video
              autoPlay muted loop playsInline
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
              src="/videos/loop-empty-store.mp4"
            />
            {/* Subtle readability overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)' }} />

            {/* BEFORE label */}
            <div style={{
              position: 'absolute',
              top: 16, left: 18,
              fontFamily: "var(--font-space-mono, 'Space Mono', monospace)",
              fontSize: 9,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(208,216,224,0.55)',
              zIndex: 2,
            }}>
              ← BEFORE
            </div>

            {/* BEFORE card — lower-left quadrant, video visible above and around */}
            <div
              className="ps-card-before"
              style={{
                position: 'absolute',
                bottom: '8%', left: '8%', right: '54%',
                background: 'rgba(6,6,8,0.65)',
                border: '1px solid rgba(176,183,188,0.18)',
                borderRadius: 16,
                padding: 'clamp(14px, 1.8vw, 24px)',
                backdropFilter: 'blur(12px)',
                zIndex: 3,
              }}
            >
              <div style={{
                fontFamily: "var(--font-space-mono, 'Space Mono', monospace)",
                fontSize: 10,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(208,216,224,0.5)',
                marginBottom: 10,
              }}>
                The Status Quo
              </div>
              <h3 style={{
                fontFamily: "var(--font-heading, var(--font-syne, 'Syne', sans-serif))",
                fontSize: 'clamp(16px, 1.8vw, 26px)',
                fontWeight: 800,
                color: 'rgba(208,216,224,0.9)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                margin: '0 0 10px',
              }}>
                Invisible.<br />Undiscoverable.<br />Forgotten.
              </h3>
              <p style={{
                fontSize: 'clamp(13px, 1.1vw, 15px)',
                color: 'rgba(176,183,188,0.75)',
                lineHeight: 1.6,
                margin: 0,
              }}>
                Most businesses rely only on social media and signs. When customers search Google, they find your competitors. Nobody knows you exist.
              </p>
            </div>
          </div>

          {/* ─── Draggable handle ─── */}
          <div
            style={{
              position: 'absolute',
              top: 0, bottom: 0,
              left: `${position}%`,
              transform: 'translateX(-50%)',
              width: '3px',
              background: '#0076B6',
              boxShadow: '0 0 16px rgba(0,118,182,0.9), 0 0 40px rgba(0,118,182,0.4)',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: '#0076B6',
              border: '3px solid #ffffff',
              boxShadow: '0 0 24px rgba(0,118,182,0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              pointerEvents: 'none',
            }}>
              <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
                <path d="M1 7h18M6 2L1 7l5 5M14 2l5 5-5 5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Founder quote */}
        <div
          style={{
            marginTop: 'clamp(48px, 6vw, 72px)',
            textAlign: 'center',
            padding: 'clamp(32px, 4vw, 48px)',
            background: 'rgba(0,118,182,0.06)',
            border: '1px solid rgba(0,118,182,0.15)',
            borderRadius: '8px',
          }}
        >
          <blockquote
            style={{
              fontFamily: "var(--font-syne, 'Syne', sans-serif)",
              fontSize: 'clamp(1.05rem, 2vw, 1.4rem)',
              fontStyle: 'italic',
              fontWeight: 700,
              lineHeight: 1.4,
              letterSpacing: '-0.02em',
              color: '#ffffff',
              maxWidth: '680px',
              margin: '0 auto 20px',
            }}
          >
            &ldquo;Local businesses deserve the same tools big brands take for granted — without the agency price tag.&rdquo;
          </blockquote>
          <cite
            style={{
              fontFamily: "var(--font-space-mono, 'Space Mono', monospace)",
              fontSize: '10px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(176,183,188,0.55)',
              fontStyle: 'normal',
            }}
          >
            — Darrin Singer, Founder · Caliber Web Studio
          </cite>
        </div>
      </div>
    </section>
  );
}
