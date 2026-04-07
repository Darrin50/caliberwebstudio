'use client';

import { useEffect, useRef, useState } from 'react';

// Color stops keyed to scroll 0–1
const COLOR_STOPS = [
  { at: 0.00, r: 0x1e, g: 0x3a, b: 0x5f },  // Deep Midnight Blue
  { at: 0.15, r: 0x25, g: 0x63, b: 0xeb },  // Caliber Blue
  { at: 0.30, r: 0x7c, g: 0x3a, b: 0xed },  // Electric Purple
  { at: 0.45, r: 0xc2, g: 0x41, b: 0x0c },  // Burnt Orange
  { at: 0.60, r: 0xdc, g: 0x26, b: 0x26 },  // Racing Red
  { at: 0.75, r: 0x06, g: 0x4e, b: 0x3b },  // Midnight Green
  { at: 0.90, r: 0xb4, g: 0x53, b: 0x09 },  // Gold
];

function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t);
}

function scrollColor(progress: number): string {
  const clamped = Math.max(0, Math.min(1, progress));
  let i = COLOR_STOPS.length - 2;
  for (let k = 0; k < COLOR_STOPS.length - 1; k++) {
    if (clamped >= COLOR_STOPS[k].at && clamped <= COLOR_STOPS[k + 1].at) { i = k; break; }
  }
  const a = COLOR_STOPS[i];
  const b = COLOR_STOPS[i + 1];
  const t = (clamped - a.at) / (b.at - a.at);
  const r = lerp(a.r, b.r, t).toString(16).padStart(2, '0');
  const g = lerp(a.g, b.g, t).toString(16).padStart(2, '0');
  const bv = lerp(a.b, b.b, t).toString(16).padStart(2, '0');
  return `#${r}${g}${bv}`;
}

export default function MuscleCar() {
  const [bodyColor, setBodyColor] = useState('#1e3a5f');
  const rafRef = useRef<number>(0);
  const scrollRef = useRef(0);
  const targetRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      targetRef.current = max > 0 ? window.scrollY / max : 0;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const tick = () => {
      // Smoothly interpolate scroll value
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

  // Derive a darker shade for roof/hood gradient
  const darkColor = bodyColor.replace(
    /^#(..)(..)(..)/,
    (_, r, g, b) =>
      `#${Math.round(parseInt(r, 16) * 0.6).toString(16).padStart(2, '0')}${Math.round(parseInt(g, 16) * 0.6).toString(16).padStart(2, '0')}${Math.round(parseInt(b, 16) * 0.6).toString(16).padStart(2, '0')}`
  );

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        right: '0',
        bottom: '0',
        width: 'min(680px, 55vw)',
        pointerEvents: 'none',
        zIndex: 2,
        animation: 'carFloat 3s ease-in-out infinite',
        filter: `drop-shadow(0 24px 48px ${bodyColor}55)`,
      }}
    >
      <style>{`
        @keyframes carFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-14px); }
        }
      `}</style>

      <svg
        viewBox="0 0 800 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        <defs>
          {/* Body gradient — shifts with scroll */}
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={bodyColor} />
            <stop offset="100%" stopColor={darkColor} />
          </linearGradient>

          {/* Roof gradient */}
          <linearGradient id="roofGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={bodyColor} stopOpacity="0.95" />
            <stop offset="100%" stopColor={darkColor} stopOpacity="1" />
          </linearGradient>

          {/* Hood gradient */}
          <linearGradient id="hoodGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={bodyColor} />
            <stop offset="60%" stopColor={darkColor} stopOpacity="0.7" />
            <stop offset="100%" stopColor={darkColor} stopOpacity="0.3" />
          </linearGradient>

          {/* Chrome gradient */}
          <linearGradient id="chromeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d0d8e0" />
            <stop offset="50%" stopColor="#7a8898" />
            <stop offset="100%" stopColor="#3a4452" />
          </linearGradient>

          {/* Wheel gradient */}
          <radialGradient id="wheelGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4a5568" />
            <stop offset="70%" stopColor="#1a202c" />
            <stop offset="100%" stopColor="#0d1117" />
          </radialGradient>

          {/* Tire gradient */}
          <radialGradient id="tireGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2d3748" />
            <stop offset="100%" stopColor="#111827" />
          </radialGradient>

          {/* Headlight glow */}
          <radialGradient id="headlightGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#dbeafe" stopOpacity="0.7" />
            <stop offset="100%" stopColor={bodyColor} stopOpacity="0" />
          </radialGradient>

          {/* Window glass */}
          <linearGradient id="glassGrad" x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0%" stopColor="#a8c4e8" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#1e3050" stopOpacity="0.3" />
          </linearGradient>

          {/* Ground shadow */}
          <radialGradient id="shadowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── Ground shadow ── */}
        <ellipse cx="420" cy="328" rx="340" ry="14" fill="url(#shadowGrad)" />

        {/* ── Body — main slab, Dodge Charger profile ── */}
        {/* Lower body / rocker panel */}
        <path
          d="M110 248 L690 248 L695 270 L105 270 Z"
          fill={darkColor}
          opacity="0.9"
        />
        {/* Main body */}
        <path
          d="M100 185 L120 160 L230 148 L300 128 L510 122 L620 130 L680 145 L710 185 L710 250 L100 250 Z"
          fill="url(#bodyGrad)"
        />
        {/* Muscle car character line (side crease) */}
        <path
          d="M115 210 L300 195 L520 190 L700 205"
          stroke={darkColor}
          strokeWidth="3"
          strokeOpacity="0.6"
          strokeLinecap="round"
        />
        {/* Lower accent stripe */}
        <path
          d="M115 238 L695 238"
          stroke="rgba(168,184,200,0.2)"
          strokeWidth="1.5"
        />

        {/* ── Hood / front end ── */}
        <path
          d="M620 130 L680 145 L710 185 L710 210 L660 210 L650 155 L610 135 Z"
          fill="url(#hoodGrad)"
        />
        {/* Hood power bulge */}
        <path
          d="M310 122 C380 108 450 108 510 122"
          stroke={bodyColor}
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M330 118 C390 104 450 104 500 118"
          fill={darkColor}
          opacity="0.4"
        />

        {/* ── Roof / cabin ── */}
        <path
          d="M230 148 L260 98 L320 80 L490 78 L550 85 L580 105 L610 135 L300 128 Z"
          fill="url(#roofGrad)"
        />
        {/* Roof panel line */}
        <path
          d="M265 100 L550 90"
          stroke="rgba(168,184,200,0.15)"
          strokeWidth="1"
        />

        {/* ── Windshield ── */}
        <path
          d="M245 146 L268 100 L318 82 L488 80 L540 86 L575 110 L570 140 L300 130 Z"
          fill="url(#glassGrad)"
        />
        {/* Windshield glare */}
        <path
          d="M270 102 L310 86 L380 85 L360 100 Z"
          fill="rgba(255,255,255,0.18)"
        />

        {/* ── Side windows ── */}
        {/* Front door window */}
        <path
          d="M248 145 L270 103 L330 88 L370 128 L295 135 Z"
          fill="url(#glassGrad)"
        />
        <path
          d="M255 142 L275 105 L320 92 L355 128 L300 133 Z"
          fill="rgba(255,255,255,0.08)"
        />
        {/* Rear door window */}
        <path
          d="M372 126 L490 82 L545 90 L575 112 L540 138 L410 135 Z"
          fill="url(#glassGrad)"
        />
        <path
          d="M380 124 L490 84 L535 92 L560 110 L535 134 L415 132 Z"
          fill="rgba(255,255,255,0.08)"
        />

        {/* B-pillar */}
        <rect x="367" y="82" width="8" height="52" rx="1" fill={darkColor} opacity="0.7" />

        {/* ── Door panel lines ── */}
        <line x1="368" y1="148" x2="368" y2="250" stroke="rgba(0,0,0,0.3)" strokeWidth="2" />
        <line x1="545" y1="140" x2="545" y2="250" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" />

        {/* ── Door handles ── */}
        <rect x="315" y="194" width="28" height="6" rx="3" fill="url(#chromeGrad)" />
        <rect x="490" y="192" width="28" height="6" rx="3" fill="url(#chromeGrad)" />

        {/* ── Front grille & bumper ── */}
        <rect x="694" y="188" width="22" height="46" rx="4" fill="url(#chromeGrad)" opacity="0.85" />
        {/* Grille slats */}
        {[193, 201, 209, 217, 225].map((y) => (
          <rect key={y} x="694" y={y} width="22" height="2" rx="1" fill="#0d1117" opacity="0.6" />
        ))}
        {/* Bumper */}
        <path
          d="M700 228 L716 228 L718 248 L698 248 Z"
          fill="url(#chromeGrad)"
        />
        {/* Front lip spoiler */}
        <rect x="694" y="248" width="28" height="8" rx="2" fill="#1a1a2e" />

        {/* ── Rear bumper & valance ── */}
        <path d="M100 228 L85 228 L82 248 L102 248 Z" fill="url(#chromeGrad)" />
        <rect x="74" y="248" width="32" height="8" rx="2" fill="#1a1a2e" />
        {/* Rear diffuser fins */}
        {[80, 86, 92, 98].map((x) => (
          <rect key={x} x={x} y="250" width="2" height="6" fill="rgba(168,184,200,0.3)" />
        ))}

        {/* ── Headlights ── */}
        {/* Headlight housing */}
        <rect x="698" y="160" width="18" height="22" rx="3" fill="#0d1117" />
        {/* Headlight glow ellipse */}
        <ellipse cx="707" cy="171" rx="30" ry="20" fill="url(#headlightGlow)" opacity="0.5" />
        {/* Bright headlight lens */}
        <rect x="700" y="162" width="14" height="18" rx="2" fill="url(#headlightGlow)" opacity="0.9" />
        {/* DRL strip */}
        <rect x="700" y="185" width="14" height="3" rx="1.5" fill="#dbeafe" opacity="0.7" />

        {/* ── Taillights ── */}
        <rect x="86" y="162" width="18" height="22" rx="3" fill="#0d1117" />
        {/* Taillight lens */}
        <rect x="88" y="164" width="14" height="18" rx="2" fill="#dc2626" opacity="0.7" />
        {/* Taillight inner glow */}
        <rect x="90" y="166" width="10" height="14" rx="1" fill="#fca5a5" opacity="0.3" />

        {/* ── Exhaust pipes ── */}
        <rect x="108" y="253" width="20" height="7" rx="3.5" fill="#2d3748" />
        <ellipse cx="108" cy="256.5" rx="3.5" ry="3.5" fill="#111827" />
        <rect x="135" y="253" width="20" height="7" rx="3.5" fill="#2d3748" />
        <ellipse cx="135" cy="256.5" rx="3.5" ry="3.5" fill="#111827" />

        {/* ── Front wheel ── */}
        {/* Tire */}
        <circle cx="580" cy="278" r="58" fill="url(#tireGrad)" />
        <circle cx="580" cy="278" r="52" fill="#111827" />
        {/* Wheel / rim */}
        <circle cx="580" cy="278" r="44" fill="url(#wheelGrad)" />
        {/* Rim detail — 5-spoke */}
        {[0, 72, 144, 216, 288].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const x2 = 580 + Math.cos(rad) * 38;
          const y2 = 278 + Math.sin(rad) * 38;
          return (
            <line
              key={deg}
              x1="580" y1="278"
              x2={x2} y2={y2}
              stroke="#718096"
              strokeWidth="8"
              strokeLinecap="round"
            />
          );
        })}
        <circle cx="580" cy="278" r="12" fill="#4a5568" />
        <circle cx="580" cy="278" r="7" fill="#1a202c" />
        {/* Center cap */}
        <circle cx="580" cy="278" r="5" fill="url(#chromeGrad)" />
        {/* Tire sidewall highlight */}
        <circle cx="580" cy="278" r="52" stroke="rgba(255,255,255,0.04)" strokeWidth="2" fill="none" />

        {/* ── Rear wheel ── */}
        <circle cx="215" cy="278" r="58" fill="url(#tireGrad)" />
        <circle cx="215" cy="278" r="52" fill="#111827" />
        <circle cx="215" cy="278" r="44" fill="url(#wheelGrad)" />
        {[0, 72, 144, 216, 288].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const x2 = 215 + Math.cos(rad) * 38;
          const y2 = 278 + Math.sin(rad) * 38;
          return (
            <line
              key={deg}
              x1="215" y1="278"
              x2={x2} y2={y2}
              stroke="#718096"
              strokeWidth="8"
              strokeLinecap="round"
            />
          );
        })}
        <circle cx="215" cy="278" r="12" fill="#4a5568" />
        <circle cx="215" cy="278" r="7" fill="#1a202c" />
        <circle cx="215" cy="278" r="5" fill="url(#chromeGrad)" />
        <circle cx="215" cy="278" r="52" stroke="rgba(255,255,255,0.04)" strokeWidth="2" fill="none" />

        {/* ── Chrome rocker trim strip ── */}
        <rect x="140" y="244" width="510" height="4" rx="2" fill="url(#chromeGrad)" opacity="0.6" />

        {/* ── Roof spoiler / lip ── */}
        <path
          d="M310 80 L490 78 L496 72 L304 74 Z"
          fill={darkColor}
          opacity="0.8"
        />

        {/* ── Side mirror ── */}
        <path d="M240 150 L225 143 L220 155 L235 158 Z" fill={darkColor} />
        <rect x="219" y="145" width="7" height="10" rx="2" fill="#1a202c" opacity="0.7" />
      </svg>
    </div>
  );
}
