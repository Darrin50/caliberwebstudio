'use client';

import { useEffect, useRef } from 'react';

/* ═══════════════════════════════════════════════════════════════════
   MOCK 1: Prestige Landscape Design — Editorial luxury, split hero
   Elegant serif-style type, gold foil accents, editorial photography
   layout with thin hairline dividers and refined whitespace
   ═══════════════════════════════════════════════════════════════════ */
function LandscapingMock() {
  return (
    <div className="mock-site mk-land">
      {/* Ultra-slim nav with hairline border */}
      <div className="mk-land-nav">
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div className="mk-land-monogram" style={{ width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '7px', fontWeight: 700, letterSpacing: '0.05em' }}>PL</div>
          <div style={{ fontWeight: 300, fontSize: '8px', letterSpacing: '0.25em', textTransform: 'uppercase' }} className="mk-land-brand">Prestige Landscapes</div>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {['Portfolio', 'Services', 'About'].map(t => <span key={t} style={{ fontSize: '5.5px', letterSpacing: '0.12em', textTransform: 'uppercase' }} className="mk-land-link">{t}</span>)}
          <span className="mk-land-nav-cta" style={{ fontSize: '5.5px', fontWeight: 600, padding: '3px 8px', borderRadius: '0', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'default' }}>Consult</span>
        </div>
      </div>
      {/* Split editorial hero */}
      <div className="mk-land-hero">
        {/* Left editorial content */}
        <div style={{ flex: '1 1 52%', padding: '16px 14px 12px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="mk-land-eyebrow" style={{ fontSize: '5px', fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '8px' }}>Dearborn, Michigan · Est. 2011</div>
          <div style={{ fontSize: '16px', fontWeight: 300, lineHeight: 1.08, marginBottom: '8px', letterSpacing: '-0.01em' }} className="mk-land-heading">Crafting Outdoor<br/><span style={{ fontStyle: 'italic', fontWeight: 600 }}>Masterpieces</span></div>
          <div className="mk-land-divider" style={{ width: '32px', height: '1px', marginBottom: '8px' }} />
          <div style={{ fontSize: '6.5px', lineHeight: 1.6, marginBottom: '12px', maxWidth: '160px' }} className="mk-land-sub">Bespoke landscape architecture for distinguished Metro Detroit residences.</div>
          <span className="mk-land-cta" style={{ fontSize: '6px', fontWeight: 600, padding: '5px 14px', letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'default', alignSelf: 'flex-start' }}>Schedule a Visit</span>
        </div>
        {/* Right — luxury image area */}
        <div style={{ flex: '1 1 48%', position: 'relative', overflow: 'hidden' }} className="mk-land-img">
          <img src="/images/prestige-landscapes.png" alt="Prestige Landscapes" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '60% 40%' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(12,11,9,0.3) 0%, transparent 50%)' }} />
        </div>
      </div>
      {/* Stats with thin dividers */}
      <div className="mk-land-stats">
        {[{ n: '500+', l: 'Estates Transformed' }, { n: '15', l: 'Years of Excellence' }, { n: '4.9', l: 'Client Rating' }].map((s, i) => (
          <div key={s.l} style={{ textAlign: 'center', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {i > 0 && <div className="mk-land-stat-div" style={{ width: '1px', height: '18px' }} />}
            <div>
              <div style={{ fontSize: '11px', fontWeight: 300, lineHeight: 1, letterSpacing: '-0.02em' }} className="mk-land-stat-num">{s.n}</div>
              <div style={{ fontSize: '4.5px', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '2px', fontWeight: 500 }} className="mk-land-stat-label">{s.l}</div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .mk-land { font-family: 'Inter', sans-serif; font-size: 10px; line-height: 1.3; height: 100%; display: flex; flex-direction: column; }
        .mk-land { background: #0c0b09; color: #e8e2d8; }
        .mk-land-nav { padding: 7px 14px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(200,175,120,0.1); background: rgba(12,11,9,0.95); }
        .mk-land-monogram { border: 1px solid rgba(200,175,120,0.4); color: #c8a44e; background: transparent; }
        .mk-land-brand { color: rgba(232,226,216,0.7); }
        .mk-land-link { color: rgba(232,226,216,0.35); }
        .mk-land-nav-cta { background: transparent; color: #c8a44e; border: 1px solid rgba(200,164,78,0.35); }
        .mk-land-hero { display: flex; flex: 1; min-height: 0; }
        .mk-land-eyebrow { color: #c8a44e; }
        .mk-land-heading { color: #f5f0e6; }
        .mk-land-divider { background: linear-gradient(90deg, #c8a44e, transparent); }
        .mk-land-sub { color: rgba(232,226,216,0.45); }
        .mk-land-cta { background: transparent; color: #c8a44e; border: 1px solid rgba(200,164,78,0.4); transition: all 0.2s; }
        .mk-land-img { background: linear-gradient(145deg, #1a1608 0%, #0f0d08 50%, #1a1608 100%); }
        .mk-land-img-frame { border: 1px solid rgba(200,175,120,0.2); background: rgba(200,175,120,0.05); }
        .mk-land-img-caption { color: rgba(200,164,78,0.4); }
        .mk-land-stats { display: flex; justify-content: center; gap: 0; padding: 10px 14px; border-top: 1px solid rgba(200,175,120,0.08); background: #0c0b09; flex-shrink: 0; }
        .mk-land-stat-num { color: #c8a44e; }
        .mk-land-stat-label { color: rgba(232,226,216,0.3); }
        .mk-land-stat-div { background: rgba(200,175,120,0.15); }
        /* LIGHT */
        [data-theme="light"] .mk-land { background: #faf9f6; color: #2c2208; }
        [data-theme="light"] .mk-land-nav { background: rgba(250,249,246,0.97); border-bottom-color: rgba(200,175,120,0.15); }
        [data-theme="light"] .mk-land-monogram { border-color: #8B6914; color: #6b4f0e; }
        [data-theme="light"] .mk-land-brand { color: #4a3d20; }
        [data-theme="light"] .mk-land-link { color: #a09480; }
        [data-theme="light"] .mk-land-nav-cta { color: #6b4f0e; border-color: rgba(107,79,14,0.3); }
        [data-theme="light"] .mk-land-eyebrow { color: #8B6914; }
        [data-theme="light"] .mk-land-heading { color: #1a1608; }
        [data-theme="light"] .mk-land-divider { background: linear-gradient(90deg, #8B6914, transparent); }
        [data-theme="light"] .mk-land-sub { color: #7a6e58; }
        [data-theme="light"] .mk-land-cta { color: #6b4f0e; border-color: rgba(107,79,14,0.3); }
        [data-theme="light"] .mk-land-img { background: linear-gradient(145deg, #f0ebe0 0%, #e8e0d0 50%, #f0ebe0 100%); }
        [data-theme="light"] .mk-land-img-frame { border-color: rgba(139,105,20,0.2); background: rgba(139,105,20,0.05); }
        [data-theme="light"] .mk-land-img-caption { color: #8B6914; }
        [data-theme="light"] .mk-land-stats { background: #faf9f6; border-top-color: rgba(200,175,120,0.12); }
        [data-theme="light"] .mk-land-stat-num { color: #6b4f0e; }
        [data-theme="light"] .mk-land-stat-label { color: #a09480; }
        [data-theme="light"] .mk-land-stat-div { background: rgba(200,175,120,0.2); }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MOCK 2: Apex Automotive — Premium dark dashboard, glass cards
   Distinctive: Glassmorphism service cards, subtle glow effects,
   sleek monochrome + red accent, status-indicator styling
   ═══════════════════════════════════════════════════════════════════ */
function AutoRepairMock() {
  return (
    <div className="mock-site mk-auto">
      {/* Slim header with glow accent line */}
      <div className="mk-auto-accent-line" style={{ height: '2px' }} />
      <div className="mk-auto-nav">
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div className="mk-auto-logo" style={{ fontSize: '8px', fontWeight: 900, letterSpacing: '0.08em', padding: '3px 6px' }}>APEX</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '7.5px', letterSpacing: '0.06em' }} className="mk-auto-brand">AUTOMOTIVE</div>
            <div style={{ fontSize: '4.5px', letterSpacing: '0.2em' }} className="mk-auto-sub">SOUTHFIELD, MI</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <span style={{ fontSize: '5.5px', letterSpacing: '0.1em' }} className="mk-auto-phone">313.555.8843</span>
          <span className="mk-auto-book" style={{ fontSize: '5.5px', fontWeight: 700, padding: '3px 8px', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'default' }}>Reserve</span>
        </div>
      </div>
      {/* Full-bleed hero with photo background */}
      <div className="mk-auto-hero" style={{ position: 'relative', overflow: 'hidden', padding: '0', flexShrink: 0, height: '110px' }}>
        <img src="/images/apex-automotive.png" alt="Apex Automotive" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.45) 0%, rgba(10,10,10,0.82) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: '12px 14px 12px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div style={{ fontSize: '5px', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '4px' }} className="mk-auto-eyebrow">Family Owned · Since 1998 · ASE Master Certified</div>
          <div style={{ fontSize: '16px', fontWeight: 200, lineHeight: 1.05, letterSpacing: '-0.01em', marginBottom: '5px' }} className="mk-auto-heading">Precision<br/><span style={{ fontWeight: 800 }}>Automotive Care</span></div>
          <div style={{ display: 'flex', gap: '5px' }}>
            <span className="mk-auto-cta" style={{ fontSize: '6px', fontWeight: 700, padding: '4px 12px', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'default' }}>Book Service</span>
            <span className="mk-auto-cta2" style={{ fontSize: '6px', fontWeight: 500, padding: '4px 12px', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'default' }}>Our Process</span>
          </div>
        </div>
      </div>
      {/* Glass service cards */}
      <div style={{ padding: '6px 14px 8px', flex: 1 }} className="mk-auto-cards-wrap">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
          {[
            { s: 'Full Diagnostic', p: '$49', icon: '◎' },
            { s: 'Brake System', p: '$99+', icon: '◉' },
            { s: 'Engine Service', p: 'Quote', icon: '⬡' },
            { s: 'Performance', p: '$129+', icon: '△' },
          ].map(i => (
            <div key={i.s} className="mk-auto-glass-card" style={{ borderRadius: '6px', padding: '6px 7px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: '6.5px', fontWeight: 600, marginBottom: '1px' }} className="mk-auto-card-name">{i.s}</div>
                  <div style={{ fontSize: '8px', fontWeight: 800, letterSpacing: '-0.02em' }} className="mk-auto-card-price">{i.p}</div>
                </div>
                <span style={{ fontSize: '9px', lineHeight: 1, opacity: 0.3 }} className="mk-auto-card-icon">{i.icon}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Bottom bar */}
      <div className="mk-auto-bottom">
        {['4.9★ Rating', 'Same-Day Available', 'Lifetime Warranty'].map(s => (
          <span key={s} style={{ fontSize: '5px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s}</span>
        ))}
      </div>

      <style>{`
        .mk-auto { font-family: 'Inter', sans-serif; font-size: 10px; line-height: 1.3; height: 100%; display: flex; flex-direction: column; }
        .mk-auto { background: #0a0a0a; color: #e5e5e5; }
        .mk-auto-accent-line { background: linear-gradient(90deg, #dc2626, #ff4444, #dc2626); flex-shrink: 0; }
        .mk-auto-nav { padding: 7px 14px; display: flex; justify-content: space-between; align-items: center; background: #0a0a0a; border-bottom: 1px solid rgba(255,255,255,0.05); flex-shrink: 0; }
        .mk-auto-logo { background: #dc2626; color: #fff; border-radius: 2px; }
        .mk-auto-brand { color: #fff; }
        .mk-auto-sub { color: rgba(255,255,255,0.3); }
        .mk-auto-phone { color: rgba(255,255,255,0.35); }
        .mk-auto-book { background: transparent; color: #dc2626; border: 1px solid rgba(220,38,38,0.4); border-radius: 2px; }
        .mk-auto-hero { background: radial-gradient(ellipse at 30% 20%, rgba(220,38,38,0.06) 0%, transparent 60%); flex-shrink: 0; }
        .mk-auto-eyebrow { color: #dc2626; }
        .mk-auto-heading { color: #fff; }
        .mk-auto-sub { color: rgba(255,255,255,0.4); }
        .mk-auto-cta { background: #dc2626; color: #fff; border-radius: 3px; }
        .mk-auto-cta2 { background: transparent; color: rgba(255,255,255,0.5); border: 1px solid rgba(255,255,255,0.1); border-radius: 3px; }
        .mk-auto-glass-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); backdrop-filter: blur(4px); }
        .mk-auto-card-name { color: rgba(255,255,255,0.6); }
        .mk-auto-card-price { color: #dc2626; }
        .mk-auto-card-icon { color: #dc2626; }
        .mk-auto-bottom { padding: 6px 14px; display: flex; justify-content: space-around; border-top: 1px solid rgba(255,255,255,0.05); background: #0a0a0a; color: rgba(255,255,255,0.35); flex-shrink: 0; }
        /* LIGHT */
        [data-theme="light"] .mk-auto { background: #fafafa; color: #1a1a1a; }
        [data-theme="light"] .mk-auto-accent-line { background: linear-gradient(90deg, #b91c1c, #dc2626, #b91c1c); }
        [data-theme="light"] .mk-auto-nav { background: #fff; border-bottom-color: #f0f0f0; }
        [data-theme="light"] .mk-auto-logo { background: #b91c1c; }
        [data-theme="light"] .mk-auto-brand { color: #111; }
        [data-theme="light"] .mk-auto-sub { color: #b91c1c; }
        [data-theme="light"] .mk-auto-phone { color: #9ca3af; }
        [data-theme="light"] .mk-auto-book { color: #b91c1c; border-color: rgba(185,28,28,0.3); }
        [data-theme="light"] .mk-auto-hero { background: radial-gradient(ellipse at 30% 20%, rgba(185,28,28,0.04) 0%, transparent 60%); }
        [data-theme="light"] .mk-auto-eyebrow { color: #b91c1c; }
        [data-theme="light"] .mk-auto-heading { color: #111; }
        [data-theme="light"] .mk-auto-sub { color: #6b7280; }
        [data-theme="light"] .mk-auto-cta { background: #b91c1c; }
        [data-theme="light"] .mk-auto-cta2 { color: #6b7280; border-color: #e5e7eb; }
        [data-theme="light"] .mk-auto-glass-card { background: #fff; border-color: #f0f0f0; box-shadow: 0 1px 4px rgba(0,0,0,0.04); }
        [data-theme="light"] .mk-auto-card-name { color: #4b5563; }
        [data-theme="light"] .mk-auto-card-price { color: #b91c1c; }
        [data-theme="light"] .mk-auto-card-icon { color: #b91c1c; }
        [data-theme="light"] .mk-auto-bottom { background: #fff; border-top-color: #f0f0f0; color: #9ca3af; }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MOCK 3: Verde Lawn Atelier — Minimalist luxury, oversized type
   Distinctive: Huge elegant typography, centered layout, thin
   horizontal plan cards, organic green with champagne accents
   ═══════════════════════════════════════════════════════════════════ */
function LawnCareMock() {
  return (
    <div className="mock-site mk-lawn">
      {/* Minimal floating nav */}
      <div className="mk-lawn-nav">
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div className="mk-lawn-mark" style={{ width: '6px', height: '6px', borderRadius: '50%' }} />
          <span style={{ fontWeight: 300, fontSize: '8px', letterSpacing: '0.2em', textTransform: 'uppercase' }} className="mk-lawn-brand">Verde</span>
        </div>
        <div style={{ display: 'flex', gap: '7px', alignItems: 'center' }}>
          {['Plans', 'Process', 'Reviews'].map(t => <span key={t} style={{ fontSize: '5.5px', letterSpacing: '0.12em', textTransform: 'uppercase' }} className="mk-lawn-link">{t}</span>)}
        </div>
      </div>
      {/* Full-bleed hero with lawn photo background */}
      <div className="mk-lawn-hero" style={{ position: 'relative', overflow: 'hidden', padding: '0', flexShrink: 0, height: '118px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src="/images/verde-lawn.png" alt="Verde Lawn" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 55%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(8,20,8,0.3) 0%, rgba(8,20,8,0.75) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: '14px 14px 12px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <div style={{ fontSize: '5px', fontWeight: 500, letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '6px' }} className="mk-lawn-eyebrow">Metro Detroit Lawn Atelier</div>
          <div style={{ fontSize: '20px', fontWeight: 200, lineHeight: 0.9, letterSpacing: '-0.03em', marginBottom: '3px' }} className="mk-lawn-heading">your lawn,</div>
          <div style={{ fontSize: '20px', fontWeight: 700, lineHeight: 0.9, letterSpacing: '-0.03em', fontStyle: 'italic', marginBottom: '8px' }} className="mk-lawn-heading">elevated.</div>
          <div className="mk-lawn-line" style={{ width: '24px', height: '1px', marginBottom: '8px' }} />
          <div style={{ fontSize: '6.5px', lineHeight: 1.6, maxWidth: '180px', marginBottom: '10px' }} className="mk-lawn-sub">Curated lawn care plans for homes that demand perfection. Cancel anytime.</div>
          <span className="mk-lawn-cta" style={{ fontSize: '5.5px', fontWeight: 600, padding: '4px 16px', letterSpacing: '0.18em', textTransform: 'uppercase', cursor: 'default' }}>Begin Your Plan</span>
        </div>
      </div>
      {/* Elegant pricing row */}
      <div style={{ padding: '8px 14px', flex: 1 }} className="mk-lawn-plans">
        <div style={{ display: 'flex', gap: '4px' }}>
          {[
            { n: 'Essential', p: '$35', f: '/wk', pop: false },
            { n: 'Signature', p: '$55', f: '/wk', pop: true },
            { n: 'Estate', p: '$85', f: '/wk', pop: false },
          ].map(s => (
            <div key={s.n} className={`mk-lawn-plan ${s.pop ? 'mk-lawn-featured' : ''}`} style={{ flex: 1, padding: '7px 5px', borderRadius: '6px', textAlign: 'center', position: 'relative' }}>
              {s.pop && <div className="mk-lawn-pop-tag" style={{ position: 'absolute', top: '0', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '4px', fontWeight: 700, padding: '1px 6px', borderRadius: '8px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Recommended</div>}
              <div style={{ fontSize: '5px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '3px' }} className="mk-lawn-plan-name">{s.n}</div>
              <div style={{ fontSize: '14px', fontWeight: 200, lineHeight: 1 }} className="mk-lawn-plan-price">{s.p}<span style={{ fontSize: '5.5px', fontWeight: 500, letterSpacing: '0.05em' }}>{s.f}</span></div>
            </div>
          ))}
        </div>
      </div>
      {/* Bottom */}
      <div className="mk-lawn-bottom" style={{ padding: '7px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '5.5px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' }} className="mk-lawn-bottom-txt">First service complimentary</span>
        <span style={{ fontSize: '5px', letterSpacing: '0.08em' }} className="mk-lawn-bottom-areas">Oak Park · Southfield · Royal Oak</span>
      </div>

      <style>{`
        .mk-lawn { font-family: 'Inter', sans-serif; font-size: 10px; line-height: 1.3; height: 100%; display: flex; flex-direction: column; }
        .mk-lawn { background: #080f0a; color: #d4eed4; }
        .mk-lawn-nav { padding: 7px 14px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(34,197,94,0.08); background: rgba(8,15,10,0.95); }
        .mk-lawn-mark { background: #22c55e; box-shadow: 0 0 6px rgba(34,197,94,0.4); }
        .mk-lawn-brand { color: rgba(212,238,212,0.7); }
        .mk-lawn-link { color: rgba(212,238,212,0.3); }
        .mk-lawn-hero { flex: 0 0 auto; }
        .mk-lawn-eyebrow { color: #22c55e; }
        .mk-lawn-heading { color: #fff; }
        .mk-lawn-line { background: linear-gradient(90deg, transparent, #22c55e, transparent); }
        .mk-lawn-sub { color: rgba(212,238,212,0.4); }
        .mk-lawn-cta { background: transparent; color: #4ade80; border: 1px solid rgba(34,197,94,0.3); }
        .mk-lawn-plan { background: rgba(255,255,255,0.02); border: 1px solid rgba(34,197,94,0.08); }
        .mk-lawn-featured { background: rgba(34,197,94,0.06); border-color: rgba(34,197,94,0.25); }
        .mk-lawn-pop-tag { background: #22c55e; color: #052e16; }
        .mk-lawn-plan-name { color: rgba(134,239,172,0.5); }
        .mk-lawn-plan-price { color: #fff; }
        .mk-lawn-bottom { border-top: 1px solid rgba(34,197,94,0.08); background: rgba(8,15,10,0.95); flex-shrink: 0; }
        .mk-lawn-bottom-txt { color: #4ade80; }
        .mk-lawn-bottom-areas { color: rgba(212,238,212,0.2); }
        /* LIGHT */
        [data-theme="light"] .mk-lawn { background: #f8fcf9; color: #14532d; }
        [data-theme="light"] .mk-lawn-nav { background: rgba(248,252,249,0.97); border-bottom-color: #e0f2e0; }
        [data-theme="light"] .mk-lawn-mark { background: #16a34a; box-shadow: none; }
        [data-theme="light"] .mk-lawn-brand { color: #15803d; }
        [data-theme="light"] .mk-lawn-link { color: #9ca3af; }
        [data-theme="light"] .mk-lawn-eyebrow { color: #16a34a; }
        [data-theme="light"] .mk-lawn-heading { color: #052e16; }
        [data-theme="light"] .mk-lawn-line { background: linear-gradient(90deg, transparent, #16a34a, transparent); }
        [data-theme="light"] .mk-lawn-sub { color: #6b7280; }
        [data-theme="light"] .mk-lawn-cta { color: #15803d; border-color: rgba(21,128,61,0.3); }
        [data-theme="light"] .mk-lawn-plan { background: #fff; border-color: #e0f2e0; }
        [data-theme="light"] .mk-lawn-featured { background: #f0fdf4; border-color: #86efac; }
        [data-theme="light"] .mk-lawn-pop-tag { background: #16a34a; color: #fff; }
        [data-theme="light"] .mk-lawn-plan-name { color: #15803d; }
        [data-theme="light"] .mk-lawn-plan-price { color: #052e16; }
        [data-theme="light"] .mk-lawn-bottom { background: rgba(248,252,249,0.97); border-top-color: #e0f2e0; }
        [data-theme="light"] .mk-lawn-bottom-txt { color: #15803d; }
        [data-theme="light"] .mk-lawn-bottom-areas { color: #9ca3af; }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MOCK 4: Crown'd — Luxury e-commerce boutique, centered brand
   Distinctive: Full-width promo, centered logo, 4-col product grid
   with hover-style cards, rose gold / champagne pink palette
   ═══════════════════════════════════════════════════════════════════ */
function HairExtensionsMock() {
  return (
    <div className="mock-site mk-hair">
      {/* Luxury promo ticker */}
      <div className="mk-hair-ticker" style={{ padding: '3px 12px', textAlign: 'center' }}>
        <span style={{ fontSize: '5px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Complimentary Install with 3+ Bundle Purchase · Code: CROWND</span>
      </div>
      {/* Centered luxury nav */}
      <div className="mk-hair-nav">
        <div style={{ display: 'flex', gap: '8px' }}>
          {['Bundles', 'Closures', 'Wigs'].map(t => <span key={t} style={{ fontSize: '5.5px', letterSpacing: '0.12em', textTransform: 'uppercase' }} className="mk-hair-link">{t}</span>)}
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 200, fontSize: '13px', letterSpacing: '0.22em' }} className="mk-hair-brand">CROWN'D</div>
          <div style={{ fontSize: '4px', letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 500 }} className="mk-hair-sub-brand">Detroit Hair Atelier</div>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'flex-end' }}>
          <span style={{ fontSize: '5.5px', letterSpacing: '0.12em', textTransform: 'uppercase' }} className="mk-hair-link">Account</span>
          <span className="mk-hair-cart" style={{ fontSize: '5.5px', fontWeight: 600, letterSpacing: '0.08em', cursor: 'default' }}>Bag (0)</span>
        </div>
      </div>
      {/* Hero with photo backdrop */}
      <div className="mk-hair-hero" style={{ padding: '0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <img src="/images/crownd-hair.png" alt="Crown'd Hair" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(20,14,20,0.25) 0%, rgba(20,14,20,0.7) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: '14px 14px 10px' }}>
          <div style={{ fontSize: '5px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '5px', fontWeight: 500 }} className="mk-hair-eyebrow">Premium Vietnamese Hair</div>
          <div style={{ fontSize: '15px', fontWeight: 200, lineHeight: 1.05, marginBottom: '3px' }} className="mk-hair-heading">Your Crown,</div>
          <div style={{ fontSize: '15px', fontWeight: 700, lineHeight: 1.05, fontStyle: 'italic', marginBottom: '8px' }} className="mk-hair-heading">Your Rules</div>
          <span className="mk-hair-shop" style={{ fontSize: '5.5px', fontWeight: 600, padding: '4px 16px', letterSpacing: '0.18em', textTransform: 'uppercase', cursor: 'default', display: 'inline-block' }}>Shop Collection</span>
        </div>
      </div>
      {/* Product grid */}
      <div style={{ padding: '6px 12px 6px', flex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
          {[
            { n: 'Body Wave', p: '$85+', tag: 'Bestseller' },
            { n: 'HD Frontal', p: '$120+', tag: '' },
            { n: 'Deep Wave', p: '$90+', tag: 'New In' },
            { n: 'Straight', p: '$75+', tag: '' },
          ].map(s => (
            <div key={s.n} className="mk-hair-product" style={{ borderRadius: '4px', overflow: 'hidden', textAlign: 'center' }}>
              <div className="mk-hair-prod-img" style={{ height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(200,120,170,0.12) 0%, rgba(140,60,120,0.18) 100%)' }} />
                <span style={{ fontSize: '9px', opacity: 0.4, position: 'relative', zIndex: 1 }}>✦</span>
                {s.tag && <span className="mk-hair-tag" style={{ position: 'absolute', top: '2px', left: '2px', fontSize: '3.5px', fontWeight: 700, padding: '1px 4px', borderRadius: '1px', letterSpacing: '0.08em', textTransform: 'uppercase', zIndex: 2 }}>{s.tag}</span>}
              </div>
              <div style={{ padding: '3px 2px 4px' }}>
                <div style={{ fontSize: '5.5px', fontWeight: 500, letterSpacing: '0.04em' }} className="mk-hair-prod-name">{s.n}</div>
                <div style={{ fontSize: '7px', fontWeight: 300, marginTop: '1px' }} className="mk-hair-prod-price">{s.p}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Review */}
      <div className="mk-hair-review" style={{ margin: '0 12px 8px', borderRadius: '4px', padding: '6px 8px', textAlign: 'center' }}>
        <div style={{ fontSize: '6px', fontStyle: 'italic', lineHeight: 1.6, fontWeight: 300 }}>"The only hair I trust. Zero shedding, perfect curl pattern every time."</div>
        <div style={{ fontSize: '4.5px', fontWeight: 600, marginTop: '2px', letterSpacing: '0.1em', textTransform: 'uppercase' }} className="mk-hair-reviewer">Tasha M. · ★★★★★</div>
      </div>

      <style>{`
        .mk-hair { font-family: 'Inter', sans-serif; font-size: 10px; line-height: 1.3; height: 100%; display: flex; flex-direction: column; }
        .mk-hair { background: #140e14; color: #f0e4f0; }
        .mk-hair-ticker { background: linear-gradient(90deg, #9d174d, #be185d, #9d174d); color: #fce7f3; flex-shrink: 0; }
        .mk-hair-nav { padding: 6px 12px; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; border-bottom: 1px solid rgba(200,120,170,0.1); background: rgba(20,14,20,0.95); flex-shrink: 0; }
        .mk-hair-brand { color: #e8a0c8; }
        .mk-hair-sub-brand { color: rgba(232,160,200,0.35); }
        .mk-hair-link { color: rgba(240,228,240,0.3); }
        .mk-hair-cart { color: #c878aa; }
        .mk-hair-hero { flex: 0 0 auto; background: radial-gradient(ellipse at 50% 30%, rgba(200,120,170,0.06) 0%, transparent 70%); }
        .mk-hair-eyebrow { color: #c878aa; }
        .mk-hair-heading { color: #f5e8f0; }
        .mk-hair-shop { background: transparent; color: #e8a0c8; border: 1px solid rgba(200,120,170,0.3); }
        .mk-hair-product { background: rgba(255,255,255,0.02); border: 1px solid rgba(200,120,170,0.08); }
        .mk-hair-prod-img { background: rgba(200,120,170,0.04); }
        .mk-hair-tag { background: #c878aa; color: #140e14; }
        .mk-hair-prod-name { color: rgba(240,228,240,0.65); }
        .mk-hair-prod-price { color: #e8a0c8; }
        .mk-hair-review { background: rgba(200,120,170,0.04); border: 1px solid rgba(200,120,170,0.08); color: rgba(240,228,240,0.55); }
        .mk-hair-reviewer { color: #c878aa; }
        /* LIGHT */
        [data-theme="light"] .mk-hair { background: #fdf8fb; color: #4a1942; }
        [data-theme="light"] .mk-hair-ticker { background: linear-gradient(90deg, #be185d, #db2777, #be185d); color: #fff; }
        [data-theme="light"] .mk-hair-nav { background: rgba(253,248,251,0.97); border-bottom-color: #fce7f3; }
        [data-theme="light"] .mk-hair-brand { color: #9d174d; }
        [data-theme="light"] .mk-hair-sub-brand { color: #be185d; }
        [data-theme="light"] .mk-hair-link { color: #9ca3af; }
        [data-theme="light"] .mk-hair-cart { color: #9d174d; }
        [data-theme="light"] .mk-hair-hero { background: radial-gradient(ellipse at 50% 30%, rgba(190,24,93,0.03) 0%, transparent 70%); }
        [data-theme="light"] .mk-hair-eyebrow { color: #be185d; }
        [data-theme="light"] .mk-hair-heading { color: #4a1942; }
        [data-theme="light"] .mk-hair-shop { color: #9d174d; border-color: rgba(157,23,77,0.25); }
        [data-theme="light"] .mk-hair-product { background: #fff; border-color: #fce7f3; }
        [data-theme="light"] .mk-hair-prod-img { background: #fdf2f8; }
        [data-theme="light"] .mk-hair-tag { background: #be185d; color: #fff; }
        [data-theme="light"] .mk-hair-prod-name { color: #4a1942; }
        [data-theme="light"] .mk-hair-prod-price { color: #be185d; }
        [data-theme="light"] .mk-hair-review { background: #fdf2f8; border-color: #fce7f3; color: #831843; }
        [data-theme="light"] .mk-hair-reviewer { color: #9d174d; }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Browser chrome wrapper — theme-aware luxury frame
   ═══════════════════════════════════════════════════════════════════ */

interface BrowserMockProps {
  url: string;
  children: React.ReactNode;
  result: string;
  industry: string;
  name: string;
}

function BrowserMock({ url, children, result, industry, name }: BrowserMockProps) {
  return (
    <div
      className="work-card"
      style={{
        borderRadius: '12px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = 'translateY(-8px) scale(1.015)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = 'translateY(0) scale(1)';
      }}
    >
      {/* Browser chrome */}
      <div className="work-card-chrome">
        <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
          <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#28c840' }} />
        </div>
        <div className="work-card-url-bar">
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', flexShrink: 0 }} className="work-card-ssl" />
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '6.5px', letterSpacing: '0.02em' }} className="work-card-url">{url}</span>
        </div>
      </div>

      {/* Website content */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        {children}
      </div>

      {/* Result bar */}
      <div className="work-card-result">
        <div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '12px', marginBottom: '2px', letterSpacing: '-0.01em' }} className="work-card-name">{name}</div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '8px', letterSpacing: '0.08em', textTransform: 'uppercase' }} className="work-card-industry">{industry}</div>
        </div>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', fontWeight: 700, letterSpacing: '0.04em', textAlign: 'right', fontStyle: 'italic' }} className="work-card-result-text">
          {result}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Main component
   ═══════════════════════════════════════════════════════════════════ */

const projects = [
  {
    name: 'Prestige Landscapes',
    industry: 'Landscape Architecture',
    result: '3x leads in 60 days',
    url: 'prestigelandscapes.com',
    Mock: LandscapingMock,
  },
  {
    name: 'Crown\'d Hair Atelier',
    industry: 'Luxury Hair & Extensions',
    result: 'Sold out launch weekend',
    url: 'crownddetroit.com',
    Mock: HairExtensionsMock,
  },
  {
    name: 'Apex Automotive',
    industry: 'Premium Auto Care',
    result: '+210% online bookings',
    url: 'apexautomotivedetroit.com',
    Mock: AutoRepairMock,
  },
  {
    name: 'Verde Lawn Atelier',
    industry: 'Curated Lawn Care',
    result: '95 new clients, season 1',
    url: 'verdelawn.com',
    Mock: LawnCareMock,
  },
];

export default function WorkShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll('.work-card-wrapper') as NodeListOf<HTMLElement>;
    if (!cards) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = '1';
            (entry.target as HTMLElement).style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    );

    cards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(48px)';
      card.style.transition = `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`;
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="work-grid">
      {projects.map((p) => (
        <div key={p.name} className="work-card-wrapper">
          <BrowserMock url={p.url} result={p.result} industry={p.industry} name={p.name}>
            <p.Mock />
          </BrowserMock>
        </div>
      ))}

      <style>{`
        .work-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(16px, 2.5vw, 28px);
        }
        @media (max-width: 768px) {
          .work-grid { grid-template-columns: 1fr; }
        }
        .work-card-wrapper {
          height: 300px;
        }
        .work-card {
          cursor: default;
          height: 100%;
          background: var(--work-card-bg, #0a0a0a);
          box-shadow: var(--work-card-shadow, 0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04));
          border: 1px solid var(--work-card-border, rgba(255,255,255,0.06));
        }
        .work-card-chrome {
          background: var(--work-chrome-bg, #161616);
          padding: 7px 10px 6px;
          display: flex;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
        }
        .work-card-url-bar {
          flex: 1;
          background: var(--work-url-bg, rgba(255,255,255,0.06));
          border-radius: 4px;
          padding: 3px 8px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .work-card-ssl { background: rgba(74,222,128,0.6); }
        .work-card-url { color: var(--work-url-color, rgba(255,255,255,0.35)); }
        .work-card-result {
          background: var(--work-card-bg, #0a0a0a);
          padding: 10px 14px;
          border-top: 1px solid var(--work-card-border, rgba(255,255,255,0.06));
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-shrink: 0;
        }
        .work-card-name { color: var(--work-name-color, #fff); }
        .work-card-industry { color: var(--work-industry-color, rgba(208,216,224,0.35)); }
        .work-card-result-text { color: #4ade80; }

        /* ─── LIGHT MODE ─── */
        [data-theme="light"] .work-card {
          --work-card-bg: #ffffff;
          --work-card-shadow: 0 4px 24px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.03);
          --work-card-border: rgba(0,0,0,0.06);
          --work-chrome-bg: #f0f0f0;
          --work-url-bg: rgba(0,0,0,0.05);
          --work-url-color: rgba(0,0,0,0.4);
          --work-name-color: #111;
          --work-industry-color: #9ca3af;
        }
        [data-theme="light"] .work-card-ssl { background: rgba(22,163,74,0.6); }
        [data-theme="light"] .work-card-result-text { color: #16a34a; }
      `}</style>
    </div>
  );
}
