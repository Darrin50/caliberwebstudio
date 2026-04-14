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

  /* ---- shared card style ---- */
  const cardBase: React.CSSProperties = {
    position: 'absolute',
    bottom: '6%',
    width: '40%',
    borderRadius: 16,
    padding: 'clamp(18px, 2.5vw, 36px)',
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
    textAlign: 'left',
  };

  return (
    <section style={{ background: '#0a0a0c', padding: 'clamp(64px, 8vw, 110px) clamp(20px, 5vw, 60px)', borderTop: '1px solid rgba(176,183,188,0.1)' }}>
      <style>{`
        @keyframes ps-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes ps-pulse-blue {
          0%, 100% { box-shadow: 0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,118,182,0.3); }
          50% { box-shadow: 0 12px 40px rgba(0,0,0,0.6), 0 0 28px rgba(0,118,182,0.25), 0 0 0 1px rgba(0,118,182,0.55); }
        }
        @keyframes ps-pulse-gray {
          0%, 100% { box-shadow: 0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(176,183,188,0.12); }
          50% { box-shadow: 0 12px 40px rgba(0,0,0,0.6), 0 0 20px rgba(150,160,170,0.1), 0 0 0 1px rgba(176,183,188,0.25); }
        }
        .ps-card-before { animation: ps-float 5s ease-in-out infinite, ps-pulse-gray 4s ease-in-out infinite; }
        .ps-card-after  { animation: ps-float 5s ease-in-out infinite 0.5s, ps-pulse-blue 4s ease-in-out infinite 1s; }
        @media (prefers-reduced-motion: reduce) { .ps-card-before, .ps-card-after { animation: none !important; } }
      `}</style>

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* ── Headline ── */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(32px, 4vw, 52px)' }}>
          <div style={{ fontFamily: "var(--font-space-mono,'Space Mono',monospace)", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#0076B6', marginBottom: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <span style={{ width: 24, height: 1, background: '#0076B6', display: 'block' }} />
            The Problem
            <span style={{ width: 24, height: 1, background: '#0076B6', display: 'block' }} />
          </div>
          <h2 style={{ fontFamily: "var(--font-heading,var(--font-syne,'Syne',sans-serif))", fontSize: 'clamp(2rem,4.5vw,3.5rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', color: '#D0D8E0' }}>
            Most Detroit businesses are{' '}<span style={{ color: '#0076B6' }}>invisible online.</span>
          </h2>
        </div>

        {/* ── Drag hint ── */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(10px, 1.5vw, 18px)', fontFamily: "var(--font-space-mono,'Space Mono',monospace)", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(176,183,188,0.35)' }}>
          ← drag to compare →
        </div>

        {/* ── Slider ── */}
        <div
          ref={containerRef}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: 12, overflow: 'hidden', cursor: dragging ? 'grabbing' : 'grab', userSelect: 'none', border: '1px solid rgba(176,183,188,0.1)' }}
        >
          {/* ═══ AFTER — base layer (always full-width underneath) ═══ */}
          <div style={{ position: 'absolute', inset: 0, background: '#091e37' }}>
            <video autoPlay muted loop playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} src="/videos/loop-packed-store.mp4" />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.18)' }} />
            <div style={{ position: 'absolute', top: 14, right: 16, fontFamily: "var(--font-space-mono,'Space Mono',monospace)", fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', zIndex: 2 }}>AFTER →</div>

            {/* AFTER card — right 40%, never crosses the 50% line */}
            <div className="ps-card-after" style={{ ...cardBase, right: '4%', background: 'rgba(4,14,32,0.72)', border: '1px solid rgba(0,118,182,0.4)' }}>
              <div style={{ fontFamily: "var(--font-space-mono,'Space Mono',monospace)", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#0076B6', marginBottom: 14 }}>With Caliber Web Studio</div>
              <h3 style={{ fontFamily: "var(--font-heading,var(--font-syne,'Syne',sans-serif))", fontSize: 'clamp(1.3rem,2.2vw,2.2rem)', fontWeight: 800, color: '#fff', lineHeight: 1.15, letterSpacing: '-0.02em', margin: '0 0 14px' }}>Ranked. Found.<br />Booked Solid.</h3>
              <p style={{ fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(208,216,224,0.88)', lineHeight: 1.65, margin: 0 }}>Google #1 ranking. AI-powered lead capture. 5-star reputation system. Your phone rings. Your store fills up. Customers find <em>you</em> first.</p>
            </div>
          </div>

          {/* ═══ BEFORE — top layer, clips from the right ═══ */}
          <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 ${100 - position}% 0 0)`, background: '#0a0a0c', filter: 'saturate(0.4)' }}>
            <video autoPlay muted loop playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.82 }} src="/videos/loop-empty-store.mp4" />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.22)' }} />
            <div style={{ position: 'absolute', top: 14, left: 16, fontFamily: "var(--font-space-mono,'Space Mono',monospace)", fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(208,216,224,0.25)', zIndex: 2 }}>← BEFORE</div>

            {/* BEFORE card — left 40%, never crosses the 50% line */}
            <div className="ps-card-before" style={{ ...cardBase, left: '4%', background: 'rgba(6,6,10,0.72)', border: '1px solid rgba(176,183,188,0.14)' }}>
              <div style={{ fontFamily: "var(--font-space-mono,'Space Mono',monospace)", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(208,216,224,0.4)', marginBottom: 14 }}>The Status Quo</div>
              <h3 style={{ fontFamily: "var(--font-heading,var(--font-syne,'Syne',sans-serif))", fontSize: 'clamp(1.3rem,2.2vw,2.2rem)', fontWeight: 800, color: 'rgba(208,216,224,0.8)', lineHeight: 1.15, letterSpacing: '-0.02em', margin: '0 0 14px' }}>Invisible.<br />Undiscoverable.<br />Forgotten.</h3>
              <p style={{ fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(176,183,188,0.6)', lineHeight: 1.65, margin: 0 }}>Most businesses rely only on social media and signs. When customers search Google, they find your competitors. Nobody knows you exist.</p>
            </div>
          </div>

          {/* ═══ Handle ═══ */}
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${position}%`, transform: 'translateX(-50%)', width: 3, background: '#0076B6', boxShadow: '0 0 14px rgba(0,118,182,0.85), 0 0 36px rgba(0,118,182,0.35)', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            <div style={{ width: 46, height: 46, borderRadius: '50%', background: '#0076B6', border: '3px solid #fff', boxShadow: '0 0 20px rgba(0,118,182,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, pointerEvents: 'none' }}>
              <svg width="20" height="14" viewBox="0 0 20 14" fill="none"><path d="M1 7h18M6 2L1 7l5 5M14 2l5 5-5 5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
          </div>
        </div>

        {/* ── Quote ── */}
        <div style={{ marginTop: 'clamp(44px, 5.5vw, 68px)', textAlign: 'center', padding: 'clamp(28px, 3.5vw, 44px)', background: 'rgba(0,118,182,0.06)', border: '1px solid rgba(0,118,182,0.14)', borderRadius: 8 }}>
          <blockquote style={{ fontFamily: "var(--font-syne,'Syne',sans-serif)", fontSize: 'clamp(1.05rem,2vw,1.4rem)', fontStyle: 'italic', fontWeight: 700, lineHeight: 1.4, letterSpacing: '-0.02em', color: '#fff', maxWidth: 680, margin: '0 auto 18px' }}>
            &ldquo;Local businesses deserve the same tools big brands take for granted — without the agency price tag.&rdquo;
          </blockquote>
          <cite style={{ fontFamily: "var(--font-space-mono,'Space Mono',monospace)", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(176,183,188,0.5)', fontStyle: 'normal' }}>
            — Darrin Singer, Founder · Caliber Web Studio
          </cite>
        </div>
      </div>
    </section>
  );
}
