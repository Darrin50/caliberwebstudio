'use client';

import { useRef, useState, useCallback } from 'react';
import BuriedOnGoogle from './slider/BuriedOnGoogle';
import SilentPhone from './slider/SilentPhone';
import GoogleNumberOne from './slider/GoogleNumberOne';
import PhoneBlowingUp from './slider/PhoneBlowingUp';

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

        {/* Slider */}
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
          {/* AFTER (right, vibrant) — full-width base layer, always visible */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, #0d1f3c 0%, #0a2540 40%, #0d2e4a 100%)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(0,118,182,0.15) 0%, rgba(0,90,142,0.1) 100%)',
              }}
            />
            {/* After label */}
            <div
              style={{
                position: 'absolute',
                top: 12,
                right: 14,
                fontFamily: "var(--font-space-mono, 'Space Mono', monospace)",
                fontSize: 8,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)',
                zIndex: 2,
              }}
            >
              AFTER →
            </div>
            {/* After content — right half: video + phone graphics */}
            <div style={{
              position: 'absolute',
              top: 0, bottom: 0, right: 0,
              width: '50%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(6px, 1vw, 12px)',
              padding: '12px 8px 80px',
              zIndex: 1,
            }}>
              {/* Packed store video loop */}
              <div style={{ position: 'relative', width: '55%', aspectRatio: '1/1', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  src="/videos/loop-packed-store.mp4"
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }} />
                <span style={{ position: 'absolute', bottom: '8px', left: '10px', fontSize: 'clamp(9px, 1.1vw, 12px)', color: 'rgba(255,255,255,0.75)', fontWeight: 500, fontFamily: "var(--font-space-mono, 'Space Mono', monospace)", letterSpacing: '0.04em' }}>Caliber-built presence</span>
              </div>
              {/* Phone graphics */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(6px, 1vw, 14px)' }}>
                <GoogleNumberOne />
                <PhoneBlowingUp />
              </div>
            </div>

            {/* AFTER explanation card */}
            <div
              style={{
                position: 'absolute',
                bottom: 14,
                right: 14,
                width: 'min(calc(50% - 28px), 320px)',
                background: 'rgba(5,18,38,0.88)',
                border: '1px solid rgba(0,118,182,0.28)',
                borderRadius: 10,
                padding: 'clamp(10px, 1.2vw, 16px)',
                backdropFilter: 'blur(12px)',
                zIndex: 3,
              }}
            >
              <div style={{
                fontSize: 'clamp(7px, 0.75vw, 9px)',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#0076B6',
                marginBottom: 6,
                fontFamily: "var(--font-space-mono, 'Space Mono', monospace)",
              }}>
                With Caliber Web Studio
              </div>
              <p style={{
                fontSize: 'clamp(9px, 0.95vw, 12px)',
                color: 'rgba(208,216,224,0.8)',
                lineHeight: 1.55,
                margin: 0,
              }}>
                Google #1 ranking, AI lead capture, 5-star reputation — working 24/7. Your phone rings. Your store fills up. Customers find you every single day.
              </p>
            </div>
          </div>

          {/* BEFORE (left, dark, desaturated) — clipped panel on top.
              FIX: use inset(0 position% 0 0) so dragging RIGHT reveals more AFTER. */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              clipPath: `inset(0 ${position}% 0 0)`,
              background: 'linear-gradient(135deg, #0a0a0b 0%, #111114 100%)',
              filter: 'saturate(0.25)',
            }}
          >
            {/* Before label */}
            <div
              style={{
                position: 'absolute',
                top: 12,
                left: 14,
                fontFamily: "var(--font-space-mono, 'Space Mono', monospace)",
                fontSize: 8,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(208,216,224,0.35)',
                zIndex: 2,
              }}
            >
              ← BEFORE
            </div>
            {/* Before content — left half: video + phone graphics */}
            <div style={{
              position: 'absolute',
              top: 0, bottom: 0, left: 0,
              width: '50%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(6px, 1vw, 12px)',
              padding: '12px 8px 80px',
              zIndex: 1,
            }}>
              {/* Empty store video loop */}
              <div style={{ position: 'relative', width: '55%', aspectRatio: '1/1', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  src="/videos/loop-empty-store.mp4"
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }} />
                <span style={{ position: 'absolute', bottom: '8px', left: '10px', fontSize: 'clamp(9px, 1.1vw, 12px)', color: 'rgba(255,255,255,0.75)', fontWeight: 500, fontFamily: "var(--font-space-mono, 'Space Mono', monospace)", letterSpacing: '0.04em' }}>No online presence</span>
              </div>
              {/* Phone graphics */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(6px, 1vw, 14px)' }}>
                <BuriedOnGoogle />
                <SilentPhone />
              </div>
            </div>

            {/* BEFORE explanation card — lives inside the filtered panel so it desaturates naturally */}
            <div
              style={{
                position: 'absolute',
                bottom: 14,
                left: 14,
                width: 'min(calc(50% - 28px), 320px)',
                background: 'rgba(8,8,10,0.88)',
                border: '1px solid rgba(176,183,188,0.14)',
                borderRadius: 10,
                padding: 'clamp(10px, 1.2vw, 16px)',
                backdropFilter: 'blur(12px)',
                zIndex: 3,
              }}
            >
              <div style={{
                fontSize: 'clamp(7px, 0.75vw, 9px)',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'rgba(208,216,224,0.45)',
                marginBottom: 6,
                fontFamily: "var(--font-space-mono, 'Space Mono', monospace)",
              }}>
                The Status Quo
              </div>
              <p style={{
                fontSize: 'clamp(9px, 0.95vw, 12px)',
                color: 'rgba(208,216,224,0.62)',
                lineHeight: 1.55,
                margin: 0,
              }}>
                Most businesses rely on signs, word-of-mouth, and social posts. When customers search Google — they find your competitors, not you.
              </p>
            </div>
          </div>

          {/* Draggable handle */}
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
            }}
          >
            {/* Circle handle */}
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
              marginBottom: '20px',
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
