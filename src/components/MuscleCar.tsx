'use client';

import { useEffect, useRef, useState } from 'react';

const COLOR_STOPS = [
  { at: 0.00, r: 0x1e, g: 0x3a, b: 0x5f },
  { at: 0.15, r: 0x25, g: 0x63, b: 0xeb },
  { at: 0.30, r: 0x7c, g: 0x3a, b: 0xed },
  { at: 0.45, r: 0xea, g: 0x58, b: 0x0c },
  { at: 0.60, r: 0xdc, g: 0x26, b: 0x26 },
  { at: 0.75, r: 0x16, g: 0xa3, b: 0x4a },
  { at: 0.90, r: 0xca, g: 0x8a, b: 0x04 },
];

function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t);
}

function scrollColor(progress: number): string {
  const clamped = Math.max(0, Math.min(1, progress));
  let i = COLOR_STOPS.length - 2;
  for (let k = 0; k < COLOR_STOPS.length - 1; k++) {
    if (clamped >= COLOR_STOPS[k].at && clamped <= COLOR_STOPS[k + 1].at) {
      i = k;
      break;
    }
  }
  const a = COLOR_STOPS[i];
  const b = COLOR_STOPS[i + 1];
  const t = (clamped - a.at) / (b.at - a.at);
  const r  = lerp(a.r, b.r,  t).toString(16).padStart(2, '0');
  const g  = lerp(a.g, b.g,  t).toString(16).padStart(2, '0');
  const bv = lerp(a.b, b.b,  t).toString(16).padStart(2, '0');
  return `#${r}${g}${bv}`;
}

function shade(hex: string, factor: number): string {
  const r = Math.min(255, Math.max(0, Math.round(parseInt(hex.slice(1, 3), 16) * factor)));
  const g = Math.min(255, Math.max(0, Math.round(parseInt(hex.slice(3, 5), 16) * factor)));
  const b = Math.min(255, Math.max(0, Math.round(parseInt(hex.slice(5, 7), 16) * factor)));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// 5-spoke tapered rim drawn at arbitrary center — returns a <g> of SVG elements
function Rim({ cx, cy }: { cx: number; cy: number }) {
  const spokes = [0, 72, 144, 216, 288].map((deg) => {
    const r0 = ((deg - 90) * Math.PI) / 180;
    const rp = r0 + Math.PI / 2;
    const iR = 13, oR = 45, w1 = 5.2, w2 = 2.2;
    const ix = cx + Math.cos(r0) * iR, iy = cy + Math.sin(r0) * iR;
    const ox = cx + Math.cos(r0) * oR, oy = cy + Math.sin(r0) * oR;
    return [
      [ix + Math.cos(rp) * w1, iy + Math.sin(rp) * w1],
      [ox + Math.cos(rp) * w2, oy + Math.sin(rp) * w2],
      [ox - Math.cos(rp) * w2, oy - Math.sin(rp) * w2],
      [ix - Math.cos(rp) * w1, iy - Math.sin(rp) * w1],
    ].map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  });

  return (
    <g>
      {/* Tire rubber */}
      <circle cx={cx} cy={cy} r={63} fill="url(#tireGrad)" />
      <circle cx={cx} cy={cy} r={56} fill="#0c0f14" />
      {/* Tire sidewall groove */}
      <circle cx={cx} cy={cy} r={59.5} stroke="rgba(255,255,255,0.04)" strokeWidth="2" fill="none" />
      <circle cx={cx} cy={cy} r={57.5} stroke="rgba(0,0,0,0.4)"           strokeWidth="1" fill="none" />
      {/* Rim lip (chrome outer ring) */}
      <circle cx={cx} cy={cy} r={50} fill="url(#rimGrad)" />
      {/* Rim face (dark recess) */}
      <circle cx={cx} cy={cy} r={46} fill="#111822" />
      {/* Spoke polygons */}
      {spokes.map((pts, i) => (
        <polygon key={i} points={pts} fill="#8a9cb2" />
      ))}
      {/* Spoke shadow: dark center circle masks spoke bases cleanly */}
      <circle cx={cx} cy={cy} r={13} fill="#0e1520" />
      {/* Hub ring */}
      <circle cx={cx} cy={cy} r={11} fill="url(#hubGrad)" />
      <circle cx={cx} cy={cy} r={5.5} fill="#080c14" />
      {/* Center cap */}
      <circle cx={cx} cy={cy} r={4} fill="url(#chromeGrad)" />
      <circle cx={cx} cy={cy} r={1.5} fill="rgba(255,255,255,0.55)" />
      {/* Rim highlight ring */}
      <circle cx={cx} cy={cy} r={50} stroke="rgba(175,200,220,0.30)" strokeWidth="1.5" fill="none" />
      <circle cx={cx} cy={cy} r={46} stroke="rgba(255,255,255,0.06)" strokeWidth="1"   fill="none" />
    </g>
  );
}

export default function MuscleCar() {
  const [bodyColor, setBodyColor] = useState('#1e3a5f');
  const rafRef    = useRef<number>(0);
  const scrollRef = useRef(0);
  const targetRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      targetRef.current = max > 0 ? window.scrollY / max : 0;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    const tick = () => {
      scrollRef.current += (targetRef.current - scrollRef.current) * 0.06;
      setBodyColor(scrollColor(scrollRef.current));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Derive four shading tones from the scroll-driven body color
  const hi   = shade(bodyColor, 1.52);   // specular highlight
  const mid  = bodyColor;                // base paint
  const drk  = shade(bodyColor, 0.54);   // shadow
  const deep = shade(bodyColor, 0.27);   // deep shadow / panel gap

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        right: '0',
        bottom: '0',
        width: 'min(700px, 58vw)',
        pointerEvents: 'none',
        zIndex: 2,
        animation: 'carFloat 3.5s ease-in-out infinite',
        filter: `drop-shadow(0 30px 64px ${bodyColor}58)`,
      }}
    >
      <style>{`
        @keyframes carFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }
      `}</style>

      {/*
       *  COORD KEY  (viewBox 0 0 900 400)
       *  Car faces RIGHT  →  front bumper ~x 868, rear bumper ~x 70
       *  Roof peak   y ≈ 94   |  Window sill y ≈ 150  |  Rocker y ≈ 266
       *  Rear wheel  cx=220   cy=308   tire r=63
       *  Front wheel cx=698   cy=308   tire r=63
       *  Arch spans  rear 148–292 (144 px)   front 628–768 (140 px)
       *  Arch bezier control y=215 → peak ≈ y 227
       */}
      <svg
        viewBox="0 0 900 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        <defs>
          {/* ── Filters ── */}
          <filter id="gndBlur" x="-15%" y="-50%" width="130%" height="200%">
            <feGaussianBlur stdDeviation="9" />
          </filter>
          <filter id="hlGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          {/* ── Body paint (scroll-driven) ── */}
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={hi}   />
            <stop offset="25%"  stopColor={mid}  />
            <stop offset="72%"  stopColor={drk}  />
            <stop offset="100%" stopColor={deep} />
          </linearGradient>
          {/* Hood surface catches light from front-top */}
          <linearGradient id="hoodGrad" x1="0.92" y1="0.08" x2="0.2" y2="1">
            <stop offset="0%"   stopColor={hi}  />
            <stop offset="42%"  stopColor={mid} />
            <stop offset="100%" stopColor={drk} />
          </linearGradient>
          {/* Roof slightly lighter than side */}
          <linearGradient id="roofGrad" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%"   stopColor={hi}  />
            <stop offset="50%"  stopColor={mid} />
            <stop offset="100%" stopColor={drk} />
          </linearGradient>
          {/* Upper door highlight band */}
          <linearGradient id="upperShine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="white" stopOpacity="0.21" />
            <stop offset="58%"  stopColor="white" stopOpacity="0.04" />
            <stop offset="100%" stopColor="white" stopOpacity="0"    />
          </linearGradient>

          {/* ── Glass ── */}
          <linearGradient id="glassGrad" x1="0.18" y1="0" x2="0.78" y2="1">
            <stop offset="0%"   stopColor="#c5dff5" stopOpacity="0.60" />
            <stop offset="55%"  stopColor="#4a80b8" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#1a3050" stopOpacity="0.60" />
          </linearGradient>

          {/* ── Chrome / trim ── */}
          <linearGradient id="chromeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#edf1f5" />
            <stop offset="26%"  stopColor="#aabbc9" />
            <stop offset="60%"  stopColor="#5e7280" />
            <stop offset="100%" stopColor="#233040" />
          </linearGradient>
          <linearGradient id="chromeSideGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#edf1f5" />
            <stop offset="50%"  stopColor="#8aabb8" />
            <stop offset="100%" stopColor="#426070" />
          </linearGradient>

          {/* ── Wheels ── */}
          <radialGradient id="tireGrad" cx="44%" cy="34%" r="70%">
            <stop offset="0%"   stopColor="#383f4a" />
            <stop offset="100%" stopColor="#09090e" />
          </radialGradient>
          <radialGradient id="rimGrad" cx="38%" cy="30%" r="70%">
            <stop offset="0%"   stopColor="#d5dce8" />
            <stop offset="38%"  stopColor="#7890a5" />
            <stop offset="76%"  stopColor="#2e4055" />
            <stop offset="100%" stopColor="#111a28" />
          </radialGradient>
          <radialGradient id="hubGrad" cx="36%" cy="30%" r="74%">
            <stop offset="0%"   stopColor="#c8d5e2" />
            <stop offset="50%"  stopColor="#456075" />
            <stop offset="100%" stopColor="#111a28" />
          </radialGradient>

          {/* ── Lights ── */}
          <radialGradient id="headlightRad" cx="34%" cy="36%" r="72%">
            <stop offset="0%"   stopColor="#ffffff" />
            <stop offset="28%"  stopColor="#dbeafe" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.04" />
          </radialGradient>
          <linearGradient id="taillightGrad" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%"   stopColor="#fca5a5" stopOpacity="0.72" />
            <stop offset="50%"  stopColor="#ef4444" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>

          {/* ── Ground shadow ── */}
          <radialGradient id="shadowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#000" stopOpacity="0.56" />
            <stop offset="64%"  stopColor="#000" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#000" stopOpacity="0"    />
          </radialGradient>
        </defs>

        {/* ════════════════════ GROUND SHADOW ════════════════════ */}
        <ellipse cx="455" cy="378" rx="390" ry="15"
          fill="url(#shadowGrad)" filter="url(#gndBlur)" />

        {/* ════════════════════ TIRES (behind body) ═══════════════ */}
        <Rim cx={220} cy={308} />
        <Rim cx={698} cy={308} />

        {/* ════════════════════ MAIN BODY ═══════════════════════════
         *  Single closed path — wheel arches are cut from the bottom
         *  via concave cubic-bezier arcs.
         */}
        <path
          d={`
            M 72 198
            C 78 178 104 166 152 158
            L 194 150
            C 216 130 240 110 265 98
            L 280 95
            L 575 94
            C 596 94 615 107 632 128
            C 670 152 772 164 842 170
            C 854 174 865 188 868 210
            L 868 258
            C 858 264 845 266 830 266
            L 768 266
            C 768 215 628 215 628 266
            L 292 266
            C 292 215 148 215 148 266
            L 82 266
            C 74 258 70 248 70 236
            L 70 212
            C 70 202 71 198 72 198
            Z
          `}
          fill="url(#bodyGrad)"
        />

        {/* Hood surface — catch-light overlay */}
        <path
          d={`
            M 634 130
            C 672 154 774 166 842 172
            C 854 176 865 188 868 210
            L 868 228
            C 858 220 842 212 816 204
            C 778 194 728 184 676 174
            C 652 169 636 158 630 148
            Z
          `}
          fill="url(#hoodGrad)"
          opacity="0.60"
        />

        {/* Roof panel — lighter overlay */}
        <path
          d="M 280 95 L 575 94 C 595 94 614 106 630 126 L 622 152 L 294 154 C 268 136 256 110 265 98 L 280 95 Z"
          fill="url(#roofGrad)"
          opacity="0.50"
        />

        {/* Upper door shine band (below window sill) */}
        <path
          d="M 148 154 L 628 146 L 621 172 L 148 180 Z"
          fill="url(#upperShine)"
        />

        {/* Hood power dome — highlight edge + shadow edge */}
        <path
          d="M 648 138 C 720 122 798 130 842 162"
          stroke={hi} strokeWidth="4.5" strokeLinecap="round" fill="none" opacity="0.26"
        />
        <path
          d="M 648 143 C 720 128 798 136 840 166"
          stroke={deep} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.52"
        />

        {/* ── Body character line (side crease) ──
         *  Two parallel strokes: dark below, highlight above
         */}
        <path
          d="M 130 223 C 200 220 300 217 420 215 L 580 213 C 650 212 715 215 762 224"
          stroke={deep} strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.70"
        />
        <path
          d="M 130 220 C 200 217 300 214 420 212 L 580 210 C 650 209 715 212 762 221"
          stroke={hi} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.30"
        />

        {/* Rocker panel (lower body strip between arches) */}
        <path d="M 148 266 L 628 266 L 628 275 L 148 275 Z" fill={deep} opacity="0.92" />
        <path d="M 148 271 L 628 271" stroke="url(#chromeSideGrad)" strokeWidth="1.5" opacity="0.50" />

        {/* Wheel arch inner depth shadows */}
        <path d="M 768 266 C 768 215 628 215 628 266 Z" fill="black" fillOpacity="0.44" />
        <path d="M 292 266 C 292 215 148 215 148 266 Z" fill="black" fillOpacity="0.44" />

        {/* ════════════════════ GREENHOUSE GLASS ═══════════════════ */}
        {/* Single glass shape spanning A-pillar to C-pillar */}
        <path
          d="M 284 152 L 578 140 L 574 95 L 280 96 Z"
          fill="url(#glassGrad)"
        />
        {/* Frame outline */}
        <path
          d="M 284 152 L 578 140 L 574 95 L 280 96 Z"
          stroke={deep} strokeWidth="4" fill="none" strokeLinejoin="round"
        />
        {/* Diagonal glare stripes */}
        <path d="M 294 144 L 318 97 L 392 96 L 366 144 Z" fill="white" fillOpacity="0.17" />
        <path d="M 434 140 L 454 96 L 515 96 L 495 140 Z" fill="white" fillOpacity="0.08" />
        {/* B-pillar */}
        <rect x="421" y="95" width="8" height="57" rx="1" fill={deep} opacity="0.93" />
        {/* A-pillar sliver (front of car) */}
        <path d="M 574 95 L 580 95 L 583 143 L 576 152 Z" fill={deep} opacity="0.86" />
        {/* C-pillar sliver (rear of car) */}
        <path d="M 280 96 L 287 96 L 291 152 L 284 152 Z" fill={deep} opacity="0.86" />
        {/* Window-sill chrome strip */}
        <rect x="285" y="149" width="298" height="4.5" rx="1" fill="url(#chromeGrad)" opacity="0.50" />

        {/* ── Door panel lines ── */}
        <line x1="425" y1="152" x2="425" y2="266" stroke={deep} strokeWidth="2.5" opacity="0.66" />
        <line x1="580" y1="143" x2="580" y2="266" stroke={deep} strokeWidth="2"   opacity="0.48" />

        {/* Door handles */}
        <rect x="344" y="197" width="34" height="7.5" rx="3.5" fill="url(#chromeGrad)" />
        <rect x="344" y="197" width="34" height="2.5" rx="1.5" fill="white" fillOpacity="0.35" />
        <rect x="518" y="196" width="34" height="7.5" rx="3.5" fill="url(#chromeGrad)" />
        <rect x="518" y="196" width="34" height="2.5" rx="1.5" fill="white" fillOpacity="0.35" />

        {/* Side mirror */}
        <path d="M 262 154 L 245 146 L 239 158 L 256 165 Z" fill={drk} />
        <path d="M 245 146 L 239 158 L 249 162 L 256 154 Z" fill={deep} opacity="0.82" />
        <rect x="237" y="148" width="8.5" height="12" rx="2" fill="#1a2535" />
        <rect x="238" y="149" width="6.5" height="10" rx="1.5" fill="#94b8d8" fillOpacity="0.42" />

        {/* ════════════════════ FRONT FASCIA ════════════════════════ */}
        {/* Fascia body panel */}
        <path
          d="M 838 170 C 854 175 865 188 868 210 L 868 268 L 832 268 L 832 178 Z"
          fill={deep} opacity="0.90"
        />
        {/* Grille housing (split Charger-style) */}
        <rect x="851" y="188" width="17" height="65" rx="3" fill="#06080e" />
        <rect x="849" y="186" width="19" height="69" rx="4"
          stroke="url(#chromeGrad)" strokeWidth="1.5" fill="none" />
        {/* Horizontal grille slats */}
        {[192, 199, 206, 213, 220, 228, 235, 242].map((y) => (
          <rect key={y} x="851" y={y} width="17" height="2.5" rx="1" fill="#131f2e" />
        ))}
        {/* Vertical center divider */}
        <rect x="858.5" y="186" width="2.5" height="69" rx="1" fill={drk} opacity="0.68" />
        {/* Front bumper chrome */}
        <path d="M 840 256 L 868 256 L 868 268 L 836 268 Z" fill="url(#chromeGrad)" />
        <path d="M 840 256 L 868 256 L 868 259 L 840 259 Z" fill="white" fillOpacity="0.28" />
        {/* Front lip splitter */}
        <rect x="834" y="267" width="36" height="5.5" rx="1" fill="#07090d" />
        <rect x="834" y="267" width="36" height="1.5" rx="0.75" fill={drk} fillOpacity="0.4" />

        {/* ════════════════════ HEADLIGHT CLUSTER ══════════════════ */}
        {/* Housing (black recess) */}
        <path d="M 835 158 L 866 163 L 868 188 L 833 188 Z" fill="#06080d" />
        {/* Outer halo bloom */}
        <ellipse cx="852" cy="174" rx="36" ry="18"
          fill="url(#headlightRad)" opacity="0.26" filter="url(#hlGlow)" />
        {/* Main projector lens */}
        <path d="M 836 160 L 866 165 L 866 186 L 834 186 Z"
          fill="#dbeafe" fillOpacity="0.84" />
        {/* Inner bright core */}
        <path d="M 840 163 L 864 167 L 864 184 L 838 184 Z"
          fill="#eef6ff" fillOpacity="0.92" />
        {/* Catch-light */}
        <path d="M 840 163 L 853 165 L 853 175 L 840 173 Z"
          fill="white" fillOpacity="0.42" />
        {/* DRL strip */}
        <rect x="834" y="186" width="32" height="4.5" rx="2.25" fill="#93c5fd" fillOpacity="0.86" />
        <rect x="834" y="186" width="32" height="1.5" rx="0.75" fill="white" fillOpacity="0.50" />

        {/* ════════════════════ REAR FASCIA ═════════════════════════ */}
        {/* Chrome bumper */}
        <path d="M 70 226 L 94 218 L 94 268 L 70 268 Z" fill="url(#chromeGrad)" opacity="0.88" />
        <path d="M 70 226 L 94 218 L 94 222 L 70 230 Z" fill="white" fillOpacity="0.22" />
        {/* Rear lip diffuser */}
        <rect x="62" y="268" width="36" height="5" rx="1" fill="#07090d" />
        {[66, 72, 78, 84, 90].map((x) => (
          <rect key={x} x={x} y="269" width="2" height="4" rx="1"
            fill="rgba(155,185,205,0.22)" />
        ))}

        {/* ════════════════════ TAILLIGHTS (LED bar) ═══════════════ */}
        {/* Housing */}
        <path d="M 70 158 L 95 152 L 95 222 L 70 222 Z" fill="#04060a" />
        {/* LED strips */}
        {[158, 167, 176, 186, 196, 206].map((y, i) => (
          <rect key={y} x="73" y={y} width="19" height="7" rx="1"
            fill="url(#taillightGrad)"
            opacity={i === 2 || i === 3 ? 0.95 : 0.58} />
        ))}
        {/* Lens tint overlay */}
        <path d="M 70 158 L 95 152 L 95 222 L 70 222 Z" fill="#280000" fillOpacity="0.22" />
        {/* Chrome surround */}
        <path d="M 70 158 L 95 152 L 95 222 L 70 222 Z"
          stroke="url(#chromeGrad)" strokeWidth="1.5" fill="none" />

        {/* ════════════════════ EXHAUST PIPES ══════════════════════ */}
        <rect x="110" y="260" width="27" height="8.5" rx="4.25" fill="#1a2535" />
        <ellipse cx="110" cy="264.25" rx="4.5" ry="4.25" fill="#060a10" />
        <ellipse cx="110" cy="264.25" rx="2.5" ry="2.2" fill="#0e1520"
          stroke="#253550" strokeWidth="0.5" />
        <rect x="144" y="260" width="27" height="8.5" rx="4.25" fill="#1a2535" />
        <ellipse cx="144" cy="264.25" rx="4.5" ry="4.25" fill="#060a10" />
        <ellipse cx="144" cy="264.25" rx="2.5" ry="2.2" fill="#0e1520"
          stroke="#253550" strokeWidth="0.5" />

        {/* ════════════════════ ROOF SPOILER LIP ═══════════════════ */}
        <path d="M 280 96 L 574 94 L 580 87 L 275 89 Z" fill={drk} opacity="0.88" />
        <path d="M 276 89 L 580 87" stroke={hi} strokeWidth="1" strokeOpacity="0.19" />

        {/* ════════════════════ SPECULAR GLASS-COAT HIGHLIGHTS ═════ */}
        {/* Roof centre gloss */}
        <path d="M 308 95 L 564 94 L 557 108 L 323 110 Z"
          fill="white" fillOpacity="0.062" />
        {/* Hood centre gloss */}
        <path
          d="M 660 138 C 742 122 822 138 854 158 L 847 168 C 814 148 732 132 654 148 Z"
          fill="white" fillOpacity="0.062"
        />
        {/* Door belt-line gloss */}
        <path d="M 152 182 L 628 174 L 625 188 L 152 196 Z"
          fill="white" fillOpacity="0.036" />
      </svg>
    </div>
  );
}
