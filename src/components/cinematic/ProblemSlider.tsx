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
          {/* ─────────────────────────────────────────────────
              BEFORE — base layer, always full-width, desaturated.
              Visible on the RIGHT as AFTER clips away to the left.
              Card lives in the right half so it's always in the
              exposed BEFORE area.
          ───────────────────────────────────────────────── */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, #0a0a0b 0%, #111114 100%)',
              filter: 'saturate(0.45)',
            }}
          >
            {/* Subtle video background — left half */}
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '55%', overflow: 'hidden' }}>
              <video
                autoPlay muted loop playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.78 }}
                src="/videos/loop-empty-store.mp4"
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.1), rgba(10,10,11,0.55))' }} />
            </div>

            {/* BEFORE label — top right (visible side) */}
            <div style={{
              position: 'absolute',
              top: 14,
              right: 16,
              fontFamily: "var(--font-space-mono, 'Space Mono', monospace)",
              fontSize: 9,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'rgba(208,216,224,0.3)',
              zIndex: 2,
            }}>
              BEFORE ←
            </div>

            {/* BEFORE card — right half, vertically centered */}
            <div style={{
              position: 'absolute',
              top: 0, bottom: 0,
              right: 0, width: '52%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(16px, 2.5vw, 36px)',
              zIndex: 3,
            }}>
              <div style={{
                width: '100%',
                background: 'rgba(6,6,8,0.80)',
                border: '1px solid rgba(176,183,188,0.14)',
                borderRadius: 14,
                padding: 'clamp(18px, 2.5vw, 36px)',
                backdropFilter: 'blur(18px)',
                textAlign: 'center',
              }}>
                <div style={{
                  fontFamily: "var(--font-space-mono, 'Space Mono', monospace)",
                  fontSize: 'clamp(7px, 0.72vw, 9px)',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'rgba(208,216,224,0.38)',
                  marginBottom: 'clamp(10px, 1.4vw, 18px)',
                }}>
                  The Status Quo
                </div>
                <h3 style={{
                  fontFamily: "var(--font-heading, var(--font-syne, 'Syne', sans-serif))",
                  fontSize: 'clamp(1.1rem, 1.9vw, 2rem)',
                  fontWeight: 800,
                  color: 'rgba(208,216,224,0.75)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  marginBottom: 'clamp(10px, 1.4vw, 18px)',
                }}>
                  Invisible.<br />Undiscoverable.<br />Forgotten.
                </h3>
                <p style={{
                  fontSize: 'clamp(10px, 1vw, 13px)',
                  color: 'rgba(176,183,188,0.55)',
                  lineHeight: 1.65,
                  margin: 0,
                }}>
                  Most businesses rely only on social media and signs. When customers search Google, they find your competitors. Nobody knows you exist.
                </p>
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────
              AFTER — top layer, clips with inset(0 (100-pos)% 0 0).
              pos=0 → inset(0 100% 0 0) → AFTER fully hidden, BEFORE shows.
              pos=100 → inset(0 0% 0 0) → AFTER fully visible.
              Dragging RIGHT reveals more AFTER.
              Card lives in the LEFT half — always in the revealed AFTER area.
          ───────────────────────────────────────────────── */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              clipPath: `inset(0 ${100 - position}% 0 0)`,
              background: 'linear-gradient(135deg, #0b1d3a 0%, #091e37 40%, #0c2845 100%)',
            }}
          >
            {/* Subtle video background — right half */}
            <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '55%', overflow: 'hidden' }}>
              <video
                autoPlay muted loop playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.88 }}
                src="/videos/loop-packed-store.mp4"
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to left, rgba(0,0,0,0.05), rgba(9,30,55,0.45))' }} />
            </div>

            {/* AFTER label — top left (visible side) */}
            <div style={{
              position: 'absolute',
              top: 14,
              left: 16,
              fontFamily: "var(--font-space-mono, 'Space Mono', monospace)",
              fontSize: 9,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
              zIndex: 2,
            }}>
              → AFTER
            </div>

            {/* AFTER card — left half, vertically centered */}
            <div style={{
              position: 'absolute',
              top: 0, bottom: 0,
              left: 0, width: '52%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(16px, 2.5vw, 36px)',
              zIndex: 3,
            }}>
              <div style={{
                width: '100%',
                background: 'rgba(4,14,32,0.85)',
                border: '1px solid rgba(0,118,182,0.38)',
                borderRadius: 14,
                padding: 'clamp(18px, 2.5vw, 36px)',
                backdropFilter: 'blur(18px)',
                textAlign: 'center',
              }}>
                <div style={{
                  fontFamily: "var(--font-space-mono, 'Space Mono', monospace)",
                  fontSize: 'clamp(7px, 0.72vw, 9px)',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#0076B6',
                  marginBottom: 'clamp(10px, 1.4vw, 18px)',
                }}>
                  With Caliber Web Studio
                </div>
                <h3 style={{
                  fontFamily: "var(--font-heading, var(--font-syne, 'Syne', sans-serif))",
                  fontSize: 'clamp(1.1rem, 1.9vw, 2rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  marginBottom: 'clamp(10px, 1.4vw, 18px)',
                }}>
                  Ranked. Found.<br />Booked Solid.
                </h3>
                <p style={{
                  fontSize: 'clamp(10px, 1vw, 13px)',
                  color: 'rgba(208,216,224,0.82)',
                  lineHeight: 1.65,
                  margin: 0,
                }}>
                  Google #1 ranking. AI-powered lead capture. 5-star reputation system. Your phone rings. Your store fills up. Customers find YOU first.
                </p>
              </div>
            </div>
          </div>

          {/* ─── Draggable handle ─── */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `${position}%`,
              transform: 'translateX(-50%)',
              width: '3px',
              background: '#0076B6',
              boxShadow: '0 0 16px rgba(0,118,182,0.8), 0 0 32px rgba(0,118,182,0.4)',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: '#0076B6',
                border: '3px solid #ffffff',
                boxShadow: '0 0 20px rgba(0,118,182,0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                pointerEvents: 'none',
              }}
            >
              <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
                <path d="M1 6h16M5 2L1 6l4 4M13 2l4 4-4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
