'use client'

import { useEffect } from 'react'

const ACCENT = '#B76E79'       // rose gold
const ACCENT2 = '#C9A96E'      // champagne
const GRADIENT = 'linear-gradient(135deg, #B76E79, #C9A96E)'
const BG = '#0A0A0A'
const SURFACE = '#141414'
const SURFACE2 = '#1A1A1A'
const TEXT = '#F5F5F5'
const MUTED = '#A3A3A3'
const BORDER = 'rgba(255,255,255,0.08)'

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap');

  .fms *, .fms *::before, .fms *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .fms {
    font-family: 'Inter', system-ui, sans-serif;
    background: ${BG};
    color: ${TEXT};
    overflow-x: hidden;
    cursor: auto !important;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
  }
  .fms a, .fms button { cursor: pointer !important; }
  .fms img { display: block; max-width: 100%; }
  .fms .con { max-width: 1200px; margin: 0 auto; padding: 0 32px; }

  /* ── NAV ── */
  .fms .nav {
    position: sticky; top: 0; z-index: 100;
    background: rgba(10,10,10,0.85);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid ${BORDER};
  }
  .fms .nav-in {
    max-width: 1200px; margin: 0 auto; padding: 0 32px;
    display: flex; align-items: center; justify-content: space-between;
    height: 72px;
  }
  .fms .logo { line-height: 1; }
  .fms .logo-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px; font-weight: 500; color: ${TEXT};
    letter-spacing: 0.5px;
  }
  .fms .logo-tag {
    font-size: 9px; color: ${MUTED};
    letter-spacing: 3px; text-transform: uppercase;
    margin-top: 2px;
  }
  .fms .nav-links {
    display: flex; gap: 36px; list-style: none;
  }
  .fms .nav-links a {
    color: rgba(245,245,245,0.7); font-size: 13px; font-weight: 400;
    letter-spacing: 0.5px; text-decoration: none;
    transition: color 0.2s;
  }
  .fms .nav-links a:hover { color: ${ACCENT}; }
  .fms .nav-cta {
    background: transparent;
    border: 1px solid ${ACCENT};
    color: ${ACCENT};
    padding: 9px 22px;
    font-size: 12px; font-weight: 500;
    letter-spacing: 1px; text-transform: uppercase;
    text-decoration: none;
    transition: background 0.25s, color 0.25s;
  }
  .fms .nav-cta:hover { background: ${ACCENT}; color: #000; }

  /* ── HERO ── */
  .fms .hero {
    position: relative;
    min-height: 92vh;
    display: flex; align-items: center;
    overflow: hidden;
  }
  .fms .hero-bg {
    position: absolute; inset: 0;
    background: linear-gradient(
      125deg,
      #0a0a0a 0%,
      #111010 30%,
      #150f0f 55%,
      #0f0d0e 80%,
      #0a0a0a 100%
    );
  }
  /* Rose-gold shimmer overlay */
  .fms .hero-shimmer {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at 70% 40%, rgba(183,110,121,0.12) 0%, transparent 55%),
                radial-gradient(ellipse at 20% 80%, rgba(201,169,110,0.06) 0%, transparent 50%);
    pointer-events: none;
  }
  /* Abstract visual element — right side */
  .fms .hero-visual {
    position: absolute;
    right: 0; top: 0; bottom: 0;
    width: 52%;
    overflow: hidden;
  }
  .fms .hero-visual-inner {
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(183,110,121,0.08) 0%, rgba(201,169,110,0.04) 100%);
    border-left: 1px solid rgba(183,110,121,0.15);
  }
  .fms .hero-img-placeholder {
    position: absolute; inset: 0;
    background: linear-gradient(160deg, #1a1012 0%, #120d0e 40%, #0f0a0b 100%);
    display: flex; align-items: center; justify-content: center;
  }
  .fms .hero-img-placeholder svg {
    opacity: 0.08; width: 120px; height: 120px;
  }
  /* Gradient fade from left */
  .fms .hero-visual::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(to right, ${BG} 0%, transparent 30%);
    pointer-events: none;
  }
  .fms .hero-con {
    position: relative; z-index: 2;
    max-width: 1200px; margin: 0 auto;
    padding: 0 32px;
    width: 100%;
  }
  .fms .hero-eyebrow {
    font-size: 10px; font-weight: 500;
    letter-spacing: 4px; text-transform: uppercase;
    color: ${ACCENT};
    margin-bottom: 24px;
  }
  .fms .hero-h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(52px, 6.5vw, 86px);
    font-weight: 500;
    line-height: 1.0;
    color: ${TEXT};
    max-width: 580px;
    margin-bottom: 6px;
    letter-spacing: -0.5px;
  }
  .fms .hero-h1 em {
    font-style: italic;
    background: ${GRADIENT};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .fms .hero-divider {
    width: 48px; height: 1px;
    background: ${GRADIENT};
    margin: 28px 0;
  }
  .fms .hero-sub {
    font-size: 16px; line-height: 1.75;
    color: rgba(245,245,245,0.65);
    max-width: 420px;
    font-weight: 300;
    margin-bottom: 44px;
  }
  .fms .hero-btns { display: flex; gap: 16px; flex-wrap: wrap; }
  .fms .btn-primary {
    background: ${GRADIENT};
    color: #fff;
    padding: 15px 36px;
    font-size: 12px; font-weight: 500;
    letter-spacing: 1.5px; text-transform: uppercase;
    text-decoration: none;
    transition: opacity 0.25s;
    display: inline-block;
  }
  .fms .btn-primary:hover { opacity: 0.88; }
  .fms .btn-ghost {
    border: 1px solid rgba(245,245,245,0.25);
    color: rgba(245,245,245,0.8);
    padding: 14px 34px;
    font-size: 12px; font-weight: 400;
    letter-spacing: 1.5px; text-transform: uppercase;
    text-decoration: none;
    transition: border-color 0.25s, color 0.25s;
    display: inline-block;
  }
  .fms .btn-ghost:hover { border-color: ${ACCENT}; color: ${ACCENT}; }
  .fms .hero-trust {
    display: flex; gap: 32px;
    margin-top: 52px;
    flex-wrap: wrap;
  }
  .fms .htrust {
    display: flex; align-items: center; gap: 10px;
    font-size: 12px; color: rgba(245,245,245,0.5);
    letter-spacing: 0.3px;
  }
  .fms .htrust-dot {
    width: 5px; height: 5px;
    background: ${ACCENT}; border-radius: 50%;
  }

  /* ── MARQUEE ── */
  .fms .marquee {
    background: ${SURFACE};
    border-top: 1px solid rgba(183,110,121,0.2);
    border-bottom: 1px solid rgba(183,110,121,0.2);
    padding: 14px 0;
    overflow: hidden;
    white-space: nowrap;
  }
  .fms .marquee-track {
    display: inline-flex; gap: 48px;
    animation: fms-marquee 28s linear infinite;
    font-size: 10px; font-weight: 500;
    letter-spacing: 3px; text-transform: uppercase;
    color: ${MUTED};
  }
  .fms .m-dot { color: ${ACCENT}; }
  @keyframes fms-marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  /* ── PROOF BAR ── */
  .fms .proof-bar {
    padding: 40px 0;
    border-bottom: 1px solid ${BORDER};
  }
  .fms .proof-row {
    display: flex; justify-content: center;
    gap: 64px; flex-wrap: wrap;
  }
  .fms .proof-item { text-align: center; }
  .fms .proof-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 40px; font-weight: 500;
    background: ${GRADIENT};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: block; line-height: 1.1;
  }
  .fms .proof-lbl {
    font-size: 10px; color: ${MUTED};
    letter-spacing: 2px; text-transform: uppercase;
    margin-top: 6px; display: block;
  }

  /* ── SECTION COMMONS ── */
  .fms .sec { padding: 100px 0; }
  .fms .sec-alt { background: ${SURFACE}; }
  .fms .sec-label {
    font-size: 10px; font-weight: 500;
    letter-spacing: 4px; text-transform: uppercase;
    color: ${ACCENT}; margin-bottom: 14px;
  }
  .fms .sec-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(32px, 4vw, 48px);
    font-weight: 500; color: ${TEXT};
    line-height: 1.1; letter-spacing: -0.3px;
    margin-bottom: 14px;
  }
  .fms .sec-title em { font-style: italic; color: ${ACCENT}; }
  .fms .sec-rule {
    width: 40px; height: 1px;
    background: ${GRADIENT};
    margin: 16px 0 20px;
  }
  .fms .sec-sub {
    font-size: 15px; line-height: 1.8;
    color: rgba(245,245,245,0.55);
    max-width: 480px; font-weight: 300;
  }
  .fms .sec-hdr { margin-bottom: 56px; }
  .fms .sec-hdr-center { text-align: center; margin-bottom: 56px; }
  .fms .sec-hdr-center .sec-rule { margin-left: auto; margin-right: auto; }
  .fms .sec-hdr-center .sec-sub { margin: 0 auto; }

  /* ── SERVICES ── */
  .fms .svc-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1px;
    background: ${BORDER};
    border: 1px solid ${BORDER};
  }
  .fms .svc-card {
    background: ${SURFACE};
    padding: 32px 28px;
    transition: background 0.25s;
  }
  .fms .svc-card:hover { background: ${SURFACE2}; }
  .fms .svc-icon {
    width: 44px; height: 44px;
    border: 1px solid rgba(183,110,121,0.3);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 20px;
    color: ${ACCENT};
  }
  .fms .svc-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px; font-weight: 500; color: ${TEXT};
    margin-bottom: 10px; letter-spacing: 0.2px;
  }
  .fms .svc-desc {
    font-size: 13px; line-height: 1.75;
    color: rgba(245,245,245,0.5);
    font-weight: 300;
  }

  /* ── BEFORE/AFTER ── */
  .fms .ba-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2px;
  }
  .fms .ba-card { position: relative; overflow: hidden; }
  .fms .ba-split {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 2px; aspect-ratio: 4/3;
  }
  .fms .ba-half {
    position: relative;
    display: flex; align-items: flex-end;
    padding: 12px;
  }
  .fms .ba-half.before {
    background: linear-gradient(160deg, #1a1416 0%, #111010 100%);
  }
  .fms .ba-half.after {
    background: linear-gradient(160deg, #1a1014 0%, #180d0f 100%);
  }
  .fms .ba-half::after {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(circle at 50% 30%, rgba(183,110,121,0.07) 0%, transparent 70%);
  }
  /* Camera placeholder icon */
  .fms .ba-half-icon {
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%, -60%);
    opacity: 0.07;
    width: 40px; height: 40px;
  }
  .fms .ba-label {
    position: relative; z-index: 2;
    font-size: 9px; font-weight: 500;
    letter-spacing: 3px; text-transform: uppercase;
    color: rgba(245,245,245,0.5);
    background: rgba(0,0,0,0.5);
    padding: 4px 8px;
  }
  .fms .ba-label.after-lbl { color: ${ACCENT}; }
  .fms .ba-service {
    position: absolute; bottom: 0; left: 0; right: 0;
    padding: 14px 16px;
    background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%);
    font-size: 12px; font-weight: 500;
    color: rgba(245,245,245,0.8);
    letter-spacing: 0.5px;
  }
  .fms .ba-caption {
    font-size: 11px; color: ${MUTED};
    letter-spacing: 1px; text-transform: uppercase;
    padding: 10px 0;
    text-align: center;
  }

  /* ── ABOUT ── */
  .fms .about-grid {
    display: grid; grid-template-columns: 1fr 1.1fr;
    gap: 80px; align-items: center;
  }
  .fms .about-img-wrap {
    position: relative;
    aspect-ratio: 3/4;
    overflow: hidden;
    background: ${SURFACE2};
  }
  .fms .about-img-wrap::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(160deg, rgba(183,110,121,0.08) 0%, transparent 60%);
    z-index: 1;
  }
  .fms .about-placeholder {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
  }
  .fms .about-placeholder svg { opacity: 0.07; width: 80px; height: 80px; }
  /* Gold frame accent */
  .fms .about-img-wrap::after {
    content: '';
    position: absolute;
    inset: 16px;
    border: 1px solid rgba(183,110,121,0.15);
    pointer-events: none;
    z-index: 2;
  }
  .fms .about-text p {
    font-size: 15px; line-height: 1.85;
    color: rgba(245,245,245,0.65);
    font-weight: 300; margin-bottom: 20px;
  }
  .fms .about-credentials {
    display: flex; gap: 28px; margin-top: 36px;
    padding-top: 28px;
    border-top: 1px solid ${BORDER};
    flex-wrap: wrap;
  }
  .fms .cred {
    font-size: 11px; color: ${MUTED};
    letter-spacing: 1px; text-transform: uppercase;
    display: flex; align-items: center; gap: 8px;
  }
  .fms .cred-dot {
    width: 4px; height: 4px;
    background: ${ACCENT}; border-radius: 50%;
  }

  /* ── TESTIMONIALS ── */
  .fms .rv-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
  .fms .rv {
    background: ${SURFACE};
    border: 1px solid ${BORDER};
    padding: 36px 28px;
  }
  .fms .rv-stars {
    display: flex; gap: 3px; margin-bottom: 20px;
  }
  .fms .rv-stars svg { color: ${ACCENT}; }
  .fms .rv-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 18px; line-height: 1.65;
    color: rgba(245,245,245,0.8);
    font-style: italic; margin-bottom: 24px;
    font-weight: 400;
  }
  .fms .rv-author { font-size: 12px; color: ${MUTED}; letter-spacing: 1px; text-transform: uppercase; }
  .fms .rv-rating {
    font-size: 11px; color: ${ACCENT};
    margin-top: 4px; letter-spacing: 0.5px;
  }

  /* ── CTA BAND ── */
  .fms .cta-band {
    padding: 100px 0; text-align: center;
    position: relative; overflow: hidden;
    background: ${SURFACE};
    border-top: 1px solid rgba(183,110,121,0.15);
    border-bottom: 1px solid rgba(183,110,121,0.15);
  }
  .fms .cta-band::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at 50% 50%, rgba(183,110,121,0.08) 0%, transparent 60%);
  }
  .fms .cta-eyebrow {
    font-size: 10px; letter-spacing: 4px;
    text-transform: uppercase; color: ${ACCENT};
    margin-bottom: 20px; position: relative; z-index: 1;
  }
  .fms .cta-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(36px, 5vw, 64px);
    font-weight: 500; color: ${TEXT};
    line-height: 1.05; letter-spacing: -0.5px;
    margin-bottom: 20px;
    position: relative; z-index: 1;
  }
  .fms .cta-title em {
    font-style: italic;
    background: ${GRADIENT};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .fms .cta-sub {
    font-size: 15px; color: rgba(245,245,245,0.55);
    font-weight: 300; margin-bottom: 44px;
    position: relative; z-index: 1;
  }
  .fms .cta-actions {
    display: flex; gap: 16px;
    justify-content: center; flex-wrap: wrap;
    position: relative; z-index: 1;
  }

  /* ── CONTACT ── */
  .fms .contact-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 48px;
  }
  .fms .contact-block {
    background: ${SURFACE};
    border: 1px solid ${BORDER};
    padding: 40px;
  }
  .fms .contact-block-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px; font-weight: 500; color: ${TEXT};
    margin-bottom: 28px; letter-spacing: 0.2px;
  }
  .fms .ci { display: flex; gap: 14px; margin-bottom: 20px; }
  .fms .ci-icon {
    width: 36px; height: 36px; flex-shrink: 0;
    border: 1px solid rgba(183,110,121,0.25);
    display: flex; align-items: center; justify-content: center;
    color: ${ACCENT};
  }
  .fms .ci-lbl {
    font-size: 9px; font-weight: 500;
    letter-spacing: 2.5px; text-transform: uppercase;
    color: ${MUTED}; margin-bottom: 3px;
  }
  .fms .ci-val {
    font-size: 14px; color: ${TEXT};
    font-weight: 400;
  }
  .fms .ci-val a { color: ${ACCENT}; text-decoration: none; }
  .fms .ci-val a:hover { text-decoration: underline; }
  .fms .hr-row {
    display: flex; justify-content: space-between;
    padding: 11px 0;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    font-size: 13px;
  }
  .fms .hr-day { color: ${MUTED}; font-weight: 300; }
  .fms .hr-time { color: ${TEXT}; font-weight: 400; }

  /* ── FOOTER ── */
  .fms .footer {
    background: ${BG};
    border-top: 1px solid ${BORDER};
    padding: 48px 0 28px;
  }
  .fms .footer-row {
    display: flex; justify-content: space-between;
    align-items: flex-start; gap: 32px;
    flex-wrap: wrap; margin-bottom: 36px;
  }
  .fms .footer-brand-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px; font-weight: 500; color: ${TEXT};
    letter-spacing: 0.3px; margin-bottom: 4px;
  }
  .fms .footer-brand-loc {
    font-size: 12px; color: ${MUTED};
    letter-spacing: 1px;
  }
  .fms .footer-links {
    display: flex; gap: 28px; flex-wrap: wrap;
  }
  .fms .footer-links a {
    font-size: 12px; color: ${MUTED};
    letter-spacing: 0.5px; text-decoration: none;
    transition: color 0.2s;
  }
  .fms .footer-links a:hover { color: ${ACCENT}; }
  .fms .footer-divider {
    height: 1px; background: ${BORDER};
    margin-bottom: 20px;
  }
  .fms .footer-copy {
    display: flex; justify-content: space-between;
    align-items: center; flex-wrap: wrap; gap: 8px;
    font-size: 11px; color: rgba(163,163,163,0.5);
  }
  .fms .footer-copy a { color: ${ACCENT}; text-decoration: none; }

  /* ── PREVIEW BANNER ── */
  .fms .preview-banner {
    position: fixed; bottom: 24px;
    left: 50%; transform: translateX(-50%);
    background: rgba(10,10,10,0.95);
    border: 1px solid rgba(183,110,121,0.25);
    padding: 12px 24px;
    display: flex; align-items: center; gap: 14px;
    z-index: 9999;
    backdrop-filter: blur(16px);
    white-space: nowrap;
  }
  .fms .preview-pulse {
    width: 6px; height: 6px;
    background: ${ACCENT}; border-radius: 50%;
    animation: fms-pulse 2s ease-in-out infinite;
    flex-shrink: 0;
  }
  @keyframes fms-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
  }
  .fms .preview-text {
    font-size: 12px; color: rgba(245,245,245,0.7);
    font-weight: 400; letter-spacing: 0.3px;
  }
  .fms .preview-cta {
    background: ${GRADIENT};
    color: #fff;
    padding: 7px 18px;
    font-size: 11px; font-weight: 500;
    letter-spacing: 1px; text-transform: uppercase;
    text-decoration: none;
    transition: opacity 0.2s;
  }
  .fms .preview-cta:hover { opacity: 0.88; }

  /* ── MOBILE ── */
  @media (max-width: 900px) {
    .fms .con { padding: 0 20px; }
    .fms .nav-links { display: none; }
    .fms .hero { min-height: auto; padding: 80px 0 60px; }
    .fms .hero-visual { display: none; }
    .fms .hero-h1 { font-size: clamp(44px, 10vw, 62px); }
    .fms .sec { padding: 64px 0; }
    .fms .proof-row { gap: 32px; }
    .fms .svc-grid { grid-template-columns: 1fr; }
    .fms .ba-grid { grid-template-columns: 1fr; }
    .fms .about-grid { grid-template-columns: 1fr; gap: 40px; }
    .fms .rv-grid { grid-template-columns: 1fr; }
    .fms .contact-grid { grid-template-columns: 1fr; }
    .fms .footer-row { flex-direction: column; }
    .fms .preview-banner { bottom: 12px; left: 12px; right: 12px; transform: none; }
  }
`

/* ── SVG ICONS (Lucide paths) ── */
const Icon = ({ path, size = 20 }: { path: string; size?: number }) => (
  <svg
    width={size} height={size}
    viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round"
  >
    <path d={path} />
  </svg>
)

// Camera icon for placeholders
const CAMERA_PATH = 'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z'
const USER_PATH = 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z'
const STAR_FILL = 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'

const SERVICES = [
  {
    name: 'Morpheus8',
    desc: 'RF microneedling that remodels skin and subdermal tissue — tightens, lifts, and smooths with precision heat delivery.',
    icon: 'M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10z M8.56 14.08A6 6 0 0 0 2 20h20a6 6 0 0 0-6.56-5.92 M12 17v5 M12 12v5',
  },
  {
    name: 'EVOLVE X',
    desc: 'Non-invasive body contouring, muscle toning, and skin tightening in a single platform. Treatment while you relax.',
    icon: 'M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z M4 22v-7',
  },
  {
    name: 'LUMECCA IPL',
    desc: 'Intense pulsed light therapy for sun damage, pigmentation, redness, and overall skin radiance in 1–3 sessions.',
    icon: 'M12 2v2 M12 20v2 M4.93 4.93l1.41 1.41 M17.66 17.66l1.41 1.41 M2 12h2 M20 12h2 M4.93 19.07l1.41-1.41 M17.66 6.34l1.41-1.41 M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z',
  },
  {
    name: 'Botox & Dysport',
    desc: 'Precision neuromodulator injections for forehead lines, crow\'s feet, and brow lifting — natural results, never frozen.',
    icon: 'M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v11 M3 9h18 M3 12h18 M3 15h18 M3 9v12h18V9',
  },
  {
    name: 'Dermal Fillers',
    desc: 'Hyaluronic acid fillers for lips, cheeks, jawline, and under-eyes. Volume, definition, and youthful contour restored.',
    icon: 'M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z',
  },
  {
    name: 'Medical Weight Loss',
    desc: 'Physician-supervised weight management with customized plans, metabolic support, and medically proven interventions.',
    icon: 'M3 3h18 M3 9h18 M3 15h11 M3 21h11 M17 16.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0z M18.5 14.5V12 M20.5 21.5l-2-5 M16.5 21.5l2-5',
  },
  {
    name: 'Body Contouring',
    desc: 'Non-surgical fat reduction and skin tightening for abdomen, flanks, arms, and thighs. No downtime, measurable results.',
    icon: 'M4 6h16a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z M4 10h16 M8 6v12 M16 6v12',
  },
  {
    name: 'VASCULAZ',
    desc: 'Vascular laser treatment for spider veins, facial redness, rosacea, and port wine stains — cleared in 1–3 sessions.',
    icon: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
  },
]

const REVIEWS = [
  {
    name: 'Aaliyah W.',
    text: 'The Morpheus8 results are stunning. Three sessions and the texture on my cheeks and jawline is completely transformed. Dr. Jacob takes his time to explain everything.',
    stars: 5,
    service: 'Morpheus8',
  },
  {
    name: 'Danielle R.',
    text: 'I\'ve been doing medical weight loss here for four months — down 31 lbs with a plan I can actually stick to. This clinic is different because they treat you like a person, not a number.',
    stars: 5,
    service: 'Medical Weight Loss',
  },
  {
    name: 'Tiffany M.',
    text: 'The LUMECCA IPL cleared my sun damage and redness in two sessions. I stopped wearing foundation. I cannot recommend this place enough to my friends in Livonia.',
    stars: 5,
    service: 'LUMECCA IPL',
  },
]

const HOURS = [
  { day: 'Monday – Friday', time: '9:00 AM – 6:00 PM' },
  { day: 'Saturday', time: '10:00 AM – 4:00 PM' },
  { day: 'Sunday', time: 'Closed' },
]

const BA_ITEMS = [
  { service: 'Morpheus8', desc: 'Skin Tightening' },
  { service: 'LUMECCA IPL', desc: 'Pigmentation' },
  { service: 'EVOLVE X', desc: 'Body Contouring' },
]

export default function FaithMedicalSpaDemo() {
  useEffect(() => {
    const ids = ['cursor-dot', 'cursor-outer', 'meteorField', 'sunParticles']
    const saved: Record<string, string> = {}
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) { saved[id] = el.style.display; el.style.display = 'none' }
    })
    const canvases = Array.from(document.querySelectorAll('canvas'))
    canvases.forEach((c) => ((c as HTMLElement).style.display = 'none'))
    const origCursor = document.body.style.cursor
    document.body.style.cursor = 'auto'
    return () => {
      ids.forEach((id) => {
        const el = document.getElementById(id)
        if (el) el.style.display = saved[id] ?? ''
      })
      canvases.forEach((c) => ((c as HTMLElement).style.display = ''))
      document.body.style.cursor = origCursor
    }
  }, [])

  const marqueeItems = [
    'Morpheus8', 'EVOLVE X', 'LUMECCA IPL', 'Botox & Dysport',
    'Dermal Fillers', 'Medical Weight Loss', 'Body Contouring', 'VASCULAZ',
    'Morpheus8', 'EVOLVE X', 'LUMECCA IPL', 'Botox & Dysport',
    'Dermal Fillers', 'Medical Weight Loss', 'Body Contouring', 'VASCULAZ',
  ]

  return (
    <div className="fms">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* NAV */}
      <nav className="nav">
        <div className="nav-in">
          <div className="logo">
            <div className="logo-name">Faith Medical Spa</div>
            <div className="logo-tag">Livonia, Michigan</div>
          </div>
          <ul className="nav-links">
            <li><a href="#services">Services</a></li>
            <li><a href="#results">Results</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <a href="#contact" className="nav-cta">Book Consultation</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-shimmer" />
        {/* Right visual panel */}
        <div className="hero-visual">
          <div className="hero-visual-inner" />
          <div className="hero-img-placeholder">
            <Icon path={CAMERA_PATH} size={120} />
          </div>
        </div>
        <div className="hero-con">
          <p className="hero-eyebrow">Medical Aesthetics · Livonia, Michigan</p>
          <h1 className="hero-h1">
            Your Most<br />
            <em>Radiant</em><br />
            Self Starts Here
          </h1>
          <div className="hero-divider" />
          <p className="hero-sub">
            Medical-grade aesthetic treatments — Morpheus8, EVOLVE X, LUMECCA, and more — delivered by Dr. Laith Jacob in a clinical setting designed around your results.
          </p>
          <div className="hero-btns">
            <a href="#contact" className="btn-primary">Book Your Consultation</a>
            <a href="#services" className="btn-ghost">Explore Treatments</a>
          </div>
          <div className="hero-trust">
            <div className="htrust"><span className="htrust-dot" />Physician-Led Care</div>
            <div className="htrust"><span className="htrust-dot" />No Downtime Options</div>
            <div className="htrust"><span className="htrust-dot" />Livonia, MI</div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee">
        <div className="marquee-track">
          {marqueeItems.map((item, i) => (
            <span key={i}>
              {item}
              {i < marqueeItems.length - 1 && <span className="m-dot"> ◆ </span>}
            </span>
          ))}
        </div>
      </div>

      {/* PROOF BAR */}
      <section className="proof-bar">
        <div className="con">
          <div className="proof-row">
            {[
              { num: '8+', lbl: 'Treatments Offered' },
              { num: '2024', lbl: 'Established' },
              { num: '5★', lbl: 'Patient Rating' },
              { num: '100%', lbl: 'Physician-Led' },
            ].map((p) => (
              <div key={p.lbl} className="proof-item">
                <span className="proof-num">{p.num}</span>
                <span className="proof-lbl">{p.lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="sec">
        <div className="con">
          <div className="sec-hdr">
            <div className="sec-label">What We Offer</div>
            <h2 className="sec-title">Medical-Grade <em>Aesthetic</em> Treatments</h2>
            <div className="sec-rule" />
            <p className="sec-sub">
              Every treatment is physician-directed, protocol-driven, and tailored to your skin, body, and goals.
            </p>
          </div>
          <div className="svc-grid">
            {SERVICES.map((svc) => (
              <div key={svc.name} className="svc-card">
                <div className="svc-icon">
                  <Icon path={svc.icon} size={20} />
                </div>
                <div className="svc-name">{svc.name}</div>
                <div className="svc-desc">{svc.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section id="results" className="sec sec-alt">
        <div className="con">
          <div className="sec-hdr-center">
            <div className="sec-label">Real Results</div>
            <h2 className="sec-title">Before <em>&</em> After Gallery</h2>
            <div className="sec-rule" />
            <p className="sec-sub">
              Actual results from patients treated at Faith Medical Spa. Individual outcomes vary.
            </p>
          </div>
          <div className="ba-grid">
            {BA_ITEMS.map((item) => (
              <div key={item.service} className="ba-card">
                <div className="ba-split">
                  <div className="ba-half before">
                    <svg className="ba-half-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <path d={CAMERA_PATH} />
                    </svg>
                    <span className="ba-label">Before</span>
                  </div>
                  <div className="ba-half after">
                    <svg className="ba-half-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <path d={CAMERA_PATH} />
                    </svg>
                    <span className="ba-label after-lbl">After</span>
                  </div>
                </div>
                <div className="ba-caption">{item.service} — {item.desc}</div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: 32, fontSize: 11, color: MUTED, letterSpacing: '1px', textTransform: 'uppercase' }}>
            Patient photos collected during consultation process — displayed with written consent
          </p>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="sec">
        <div className="con">
          <div className="about-grid">
            <div className="about-img-wrap">
              <div className="about-placeholder">
                <Icon path={USER_PATH} size={80} />
              </div>
            </div>
            <div className="about-text">
              <div className="sec-label">Our Story</div>
              <h2 className="sec-title">Led by <em>Dr. Laith Jacob</em></h2>
              <div className="sec-rule" />
              <p>
                Faith Medical Spa was founded on a simple belief: aesthetic medicine should be physician-led, evidence-based, and deeply personal. Dr. Laith Jacob brings clinical precision and a genuine care for each patient to every treatment.
              </p>
              <p>
                Located in Livonia, we serve the greater Detroit metro — from Dearborn to Northville to Plymouth — offering the most advanced non-surgical aesthetic technologies available, including Morpheus8, EVOLVE X, LUMECCA, and medical weight loss programs.
              </p>
              <p>
                Our approach: understand your goals, design a protocol, and deliver results you can see. No aggressive upsells, no assembly-line appointments.
              </p>
              <div className="about-credentials">
                <div className="cred"><span className="cred-dot" />Board-Certified Physician</div>
                <div className="cred"><span className="cred-dot" />CareCredit Accepted</div>
                <div className="cred"><span className="cred-dot" />Livonia, MI</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="sec sec-alt">
        <div className="con">
          <div className="sec-hdr-center">
            <div className="sec-label">Patient Reviews</div>
            <h2 className="sec-title">What Our Patients <em>Say</em></h2>
            <div className="sec-rule" />
          </div>
          <div className="rv-grid">
            {REVIEWS.map((rv) => (
              <div key={rv.name} className="rv">
                <div className="rv-stars">
                  {Array.from({ length: rv.stars }).map((_, i) => (
                    <svg key={i} width={14} height={14} viewBox="0 0 24 24" fill="currentColor">
                      <path d={STAR_FILL} />
                    </svg>
                  ))}
                </div>
                <p className="rv-text">&ldquo;{rv.text}&rdquo;</p>
                <div className="rv-author">{rv.name}</div>
                <div className="rv-rating">{rv.service}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="cta-band">
        <div className="con">
          <div className="cta-eyebrow">Start Your Journey</div>
          <h2 className="cta-title">
            Ready to See<br />
            <em>Real Results?</em>
          </h2>
          <p className="cta-sub">
            Book a consultation with Dr. Jacob. We&#39;ll review your goals and design a personalized treatment plan — no obligation.
          </p>
          <div className="cta-actions">
            <a href="#contact" className="btn-primary">Book Your Consultation</a>
            <a href="tel:+12488800000" className="btn-ghost">(248) 880-0000</a>
          </div>
        </div>
      </section>

      {/* CONTACT & HOURS */}
      <section id="contact" className="sec">
        <div className="con">
          <div className="sec-hdr">
            <div className="sec-label">Visit Us</div>
            <h2 className="sec-title">Contact <em>&</em> Hours</h2>
            <div className="sec-rule" />
          </div>
          <div className="contact-grid">
            {/* Contact Info */}
            <div className="contact-block">
              <div className="contact-block-title">Get In Touch</div>
              {[
                {
                  icon: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z',
                  label: 'Phone',
                  val: '(248) 880-0000',
                  href: 'tel:+12488800000',
                },
                {
                  icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6',
                  label: 'Email',
                  val: 'info@faithmedicalspa.com',
                  href: 'mailto:info@faithmedicalspa.com',
                },
                {
                  icon: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
                  label: 'Address',
                  val: 'Livonia, MI 48154',
                  href: 'https://maps.google.com/?q=Faith+Medical+Spa+Livonia+MI',
                },
                {
                  icon: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
                  label: 'Financing',
                  val: 'CareCredit Accepted',
                  href: '#',
                },
              ].map((ci) => (
                <div key={ci.label} className="ci">
                  <div className="ci-icon">
                    <Icon path={ci.icon} size={16} />
                  </div>
                  <div>
                    <div className="ci-lbl">{ci.label}</div>
                    <div className="ci-val">
                      <a href={ci.href} target={ci.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                        {ci.val}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Hours */}
            <div className="contact-block">
              <div className="contact-block-title">Hours of Operation</div>
              {HOURS.map((h) => (
                <div key={h.day} className="hr-row">
                  <span className="hr-day">{h.day}</span>
                  <span className="hr-time">{h.time}</span>
                </div>
              ))}
              <div style={{ marginTop: 32, padding: '20px', background: SURFACE2, borderLeft: `2px solid ${ACCENT}` }}>
                <p style={{ fontSize: 12, color: MUTED, lineHeight: 1.7, fontWeight: 300 }}>
                  Consultations are by appointment. Same-week availability often open. Book online or call directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="con">
          <div className="footer-row">
            <div>
              <div className="footer-brand-name">Faith Medical Spa</div>
              <div className="footer-brand-loc">Livonia, Michigan</div>
            </div>
            <div className="footer-links">
              <a href="#services">Services</a>
              <a href="#results">Results</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
          <div className="footer-divider" />
          <div className="footer-copy">
            <span>© {new Date().getFullYear()} Faith Medical Spa. All rights reserved.</span>
            <span>
              Demo built by{' '}
              <a href="https://caliberwebstudio.com" target="_blank" rel="noopener noreferrer">
                Caliber Web Studio
              </a>
            </span>
          </div>
        </div>
      </footer>

      {/* PREVIEW BANNER */}
      <div className="preview-banner">
        <span className="preview-pulse" />
        <span className="preview-text">Demo preview — Faith Medical Spa, Livonia MI</span>
        <a
          href="https://caliberwebstudio.com"
          target="_blank"
          rel="noopener noreferrer"
          className="preview-cta"
        >
          Get This Site
        </a>
      </div>
    </div>
  )
}
