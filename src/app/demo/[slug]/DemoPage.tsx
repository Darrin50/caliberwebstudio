'use client';

import { useEffect } from 'react';
import type { DemoConfig } from '../demos';

/* ─── Per-slug photo & content data ─── */
const DEMO_DATA: Record<string, {
  heroImg: string;
  heroAlt: string;
  gallery: { url: string; alt: string }[];
  beforeAfter?: { before: string; after: string; beforeLabel: string; afterLabel: string; title: string }[];
  reviews: { name: string; stars: number; text: string }[];
  aboutImg: string;
  theme: {
    bg: string; bg2: string; bg3: string;
    accent: string; accent2: string;
    text: string; muted: string; light: string;
    radius: string;
  };
  announceBar?: string;
  stats: { num: string; label: string }[];
  ctaLabel: string;
}> = {

  'detroit-cuts': {
    heroImg: 'https://images.pexels.com/photos/7447148/pexels-photo-7447148.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    heroAlt: 'Master barber with Detroit Tigers cap giving a fresh cut at Detroit Cuts Barbershop',
    gallery: [
      { url: 'https://images.pexels.com/photos/7697316/pexels-photo-7697316.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', alt: 'Clean taper fade close-up — precision lineup' },
      { url: 'https://images.pexels.com/photos/7697390/pexels-photo-7697390.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', alt: 'Fresh 360 waves with skin fade — Detroit style' },
      { url: 'https://images.pexels.com/photos/7697283/pexels-photo-7697283.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', alt: 'Detroit Cuts Barbershop storefront — Cuts, Fades, Shaves' },
      { url: 'https://images.pexels.com/photos/7697642/pexels-photo-7697642.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', alt: 'Two barbers working side by side — busy Saturday at Detroit Cuts' },
      { url: 'https://images.pexels.com/photos/7697639/pexels-photo-7697639.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', alt: "Kid's cut — young king leaving the chair fresh" },
      { url: 'https://images.pexels.com/photos/7697445/pexels-photo-7697445.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', alt: 'Classic barbershop interior — leather chairs and neon Open sign' },
    ],
    reviews: [
      { name: 'Marcus T.', stars: 5, text: 'Been coming here two years. Jay keeps my fade tighter than anywhere else in the city. Period.' },
      { name: 'DeShawn R.', stars: 5, text: 'Walk-in on a Saturday, in the chair in 20 minutes. Left looking like a whole new man.' },
      { name: 'Antoine M.', stars: 5, text: 'Best barbershop in Detroit. My waves been looking right every single time.' },
    ],
    aboutImg: 'https://images.pexels.com/photos/7447136/pexels-photo-7447136.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    stats: [
      { num: '10+', label: 'Years in Detroit' },
      { num: '4.9★', label: 'Google Rating' },
      { num: '8K+', label: 'Cuts Per Year' },
    ],
    ctaLabel: 'Call to Book Your Cut',
    announceBar: '✂️ Walk-ins welcome · 2847 W Grand Blvd, Detroit · Open 6 days',
    theme: {
      bg: '#0a0a0a', bg2: '#111111', bg3: '#1a1a1a',
      accent: '#C9A84C', accent2: '#E8C470',
      text: '#F5F5F0', muted: '#888888', light: '#cccccc',
      radius: '4px',
    },
  },

  'metro-plumbing': {
    heroImg: 'https://images.unsplash.com/photo-1676210133055-eab6ef033ce3?auto=format&fit=crop&w=1600&q=85',
    heroAlt: 'Metro Plumbing technician working on pipes under a kitchen sink',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80', alt: 'Modern bathroom renovation — clean new fixtures and tile' },
      { url: 'https://images.unsplash.com/photo-1676210134188-4c05dd172f89?auto=format&fit=crop&w=800&q=80', alt: 'Plumber tightening drain connections under a sink' },
      { url: 'https://images.unsplash.com/photo-1584265549731-fc0d5434ff76?auto=format&fit=crop&w=800&q=80', alt: 'Faucet and sink repair close-up' },
      { url: 'https://images.unsplash.com/photo-1620653713380-7a34b773fef8?auto=format&fit=crop&w=800&q=80', alt: 'Water heater pipe fitting — professional repair' },
    ],
    beforeAfter: [
      {
        before: '/demo/plumbing/sink-before.png',
        after: '/demo/plumbing/sink-after.png',
        beforeLabel: 'Clogged kitchen sink — standing water and debris buildup',
        afterLabel: 'Drain cleared, sparkling clean — flowing like new',
        title: 'Kitchen Sink Drain Clearing',
      },
    ],
    reviews: [
      { name: 'Sandra K.', stars: 5, text: 'Called at 9pm with a burst pipe. Tech was at my house in 45 minutes. Fixed it same night. Unbelievable service.' },
      { name: 'James F.', stars: 5, text: 'Used Metro Plumbing twice. Both times on time, straight price before starting, clean work. No upselling.' },
      { name: 'Denise M.', stars: 5, text: "Had a slow drain three plumbers couldn't fix. Metro found it with their camera in 10 minutes. Fixed in an hour." },
    ],
    aboutImg: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80',
    stats: [
      { num: '15+', label: 'Years Serving Detroit' },
      { num: '4.8★', label: 'Google Rating' },
      { num: '3K+', label: 'Jobs Completed' },
    ],
    ctaLabel: '📞 Call Now — 24/7 Emergency Line',
    announceBar: '🚨 24/7 Emergency Service Available · Licensed & Insured in Michigan',
    theme: {
      bg: '#0A1628', bg2: '#0F1F3A', bg3: '#162848',
      accent: '#E8631A', accent2: '#F07A35',
      text: '#F8FAFC', muted: '#718096', light: '#A0AEC0',
      radius: '6px',
    },
  },

  'luxe-salon': {
    heroImg: '/demo/salon/hero-ponytail.png',
    heroAlt: 'Sleek ponytail with laid baby hairs — Luxe Beauty Studio Detroit',
    gallery: [
      { url: '/demo/salon/fulani-braids.png', alt: 'Fulani braids with honey-blonde highlights — flawless feed-in technique' },
      { url: '/demo/salon/pixie-cut.png', alt: 'Chic pixie cut — styled and sleek at Luxe Beauty Studio' },
      { url: '/demo/salon/silk-press.png', alt: 'Bone-straight silk press — long, sleek, damage-free' },
      { url: '/demo/salon/twist-braids.png', alt: 'Twist braids — protective style goals' },
      { url: '/demo/salon/hero-ponytail.png', alt: 'Beautiful natural style — volume and definition on point' },
    ],
    reviews: [
      { name: 'Tiffany W.', stars: 5, text: "Jasmine did my knotless braids and they lasted two full months. So neat, so light. I won't go anywhere else in Detroit." },
      { name: 'Aaliyah P.', stars: 5, text: 'The salon is gorgeous and professional. My loc retwist looked amazing — my scalp felt so moisturized. These stylists really know locs.' },
      { name: 'Kezia N.', stars: 5, text: 'Booked online, walked in on time, and left feeling like royalty. My braids are always tight and last forever. Best in Detroit.' },
    ],
    aboutImg: '/demo/salon/silk-press.png',
    stats: [
      { num: '7+', label: 'Years in Detroit' },
      { num: '4.9★', label: 'Google Rating' },
      { num: '3K+', label: 'Clients Served' },
    ],
    ctaLabel: '💅 Book Your Appointment',
    announceBar: '✨ Now booking April appointments · 1205 Woodward Ave, Detroit · Tue – Sat',
    theme: {
      bg: '#17101E', bg2: '#231830', bg3: '#30203F',
      accent: '#C9956C', accent2: '#E0AE89',
      text: '#FAF4EE', muted: '#9a8a8f', light: '#E0CAC0',
      radius: '8px',
    },
  },
  'detroits-kitchen': {
    heroImg: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    heroAlt: "Detroit's Kitchen soul food restaurant in Detroit MI",
    gallery: [
      { url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80', alt: 'Soul food spread' },
      { url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80', alt: 'Home-cooked meal' },
      { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80', alt: 'Restaurant dining room' },
    ],
    aboutImg: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
    theme: {
      bg: '#1a0a0a', bg2: '#2a1408', bg3: '#3d2010',
      accent: '#D4A017', accent2: '#B8860B',
      text: '#f5f0e8', muted: '#c9bfad', light: '#fff8ec',
      radius: '8px',
    },
    announceBar: 'Now Open Sundays 12–7pm — Dine In & Takeout Available',
    stats: [
      { num: '22+', label: 'Years Serving Detroit' },
      { num: '40+', label: 'Menu Items' },
      { num: '2,000+', label: 'Happy Guests/Month' },
    ],
    reviews: [
      { name: 'Marcus T.', stars: 5, text: 'Best soul food in Detroit, period. The smothered chicken is unbelievable.' },
      { name: 'Denise W.', stars: 5, text: 'Feels like grandma’s kitchen. Warm, welcoming, and absolutely delicious.' },
      { name: 'James R.', stars: 5, text: 'I drive 45 minutes just for their sweet potato pie. Worth every mile.' },
    ],
    ctaLabel: 'Get Your Restaurant Online',
  },
};

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: 2, marginBottom: 12 }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: '#F6C90E', fontSize: 15 }}>★</span>
      ))}
    </div>
  );
}

export default function DemoPage({ config }: { config: DemoConfig }) {
  const data = DEMO_DATA[config.slug];
  const t = data?.theme;

  /* Hide all agency UI while this demo is mounted */
  useEffect(() => {
    const ids = ['cursor-dot', 'cursor-outer', 'meteorField', 'sunParticles'];
    const origDisplay: Record<string, string> = {};
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) { origDisplay[id] = el.style.display; el.style.display = 'none'; }
    });
    const canvases = Array.from(document.querySelectorAll('canvas'));
    canvases.forEach(c => { (c as HTMLElement).style.display = 'none'; });
    const origCursor = document.body.style.cursor;
    document.body.style.cursor = 'auto';

    return () => {
      ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = origDisplay[id] ?? '';
      });
      canvases.forEach(c => { (c as HTMLElement).style.display = ''; });
      document.body.style.cursor = origCursor;
    };
  }, []);

  if (!data || !t) return <p style={{ padding: 40, color: '#fff' }}>Demo not found.</p>;

  const isBarber = config.slug === 'detroit-cuts';
  const isPlumbing = config.slug === 'metro-plumbing';
  const isSalon = config.slug === 'luxe-salon';
  const isRestaurant = config.slug === 'detroits-kitchen';

  const css = `
    .dw *, .dw *::before, .dw *::after { box-sizing: border-box; }
    .dw { font-family: 'Inter', system-ui, sans-serif; background: ${t.bg}; color: ${t.text}; overflow-x: hidden; cursor: auto !important; min-height: 100vh; }
    .dw a, .dw button { cursor: pointer !important; }
    .dw img { display: block; max-width: 100%; }
    .dw .con { max-width: 1100px; margin: 0 auto; padding: 0 24px; }

    .dw .announce { background: ${t.accent}; color: ${t.bg}; text-align: center; padding: 10px 20px; font-size: 13px; font-weight: 600; }

    .dw .nav { background: ${t.bg}cc; backdrop-filter: blur(8px); border-bottom: 1px solid rgba(255,255,255,0.08); position: sticky; top: 0; z-index: 100; padding: 0 24px; }
    .dw .nav-in { max-width: 1100px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; height: 68px; }
    .dw .logo-name { font-size: 18px; font-weight: 800; color: ${t.text}; line-height: 1; }
    .dw .logo-tag { font-size: 10px; color: ${t.muted}; letter-spacing: 1.5px; text-transform: uppercase; }
    .dw .nav-links { display: flex; gap: 28px; list-style: none; }
    .dw .nav-links a { color: ${t.light}; font-size: 14px; font-weight: 500; text-decoration: none; transition: color 0.2s; }
    .dw .nav-links a:hover { color: ${t.accent}; }
    .dw .nav-phone { color: ${t.accent}; font-weight: 700; font-size: 15px; }
    .dw .nav-cta { background: ${t.accent}; color: ${t.bg}; padding: 10px 20px; border-radius: ${t.radius}; font-weight: 700; font-size: 14px; text-decoration: none; display: inline-block; transition: background 0.2s; }
    .dw .nav-cta:hover { background: ${t.accent2}; }

    .dw .hero { position: relative; height: 88vh; min-height: 560px; max-height: 820px; overflow: hidden; display: flex; align-items: center; }
    .dw .hero-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 20%; }
    .dw .hero-ov { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(0,0,0,0.86) 0%, rgba(0,0,0,0.62) 52%, rgba(0,0,0,0.22) 100%); }
    .dw .hero-con { position: relative; z-index: 2; max-width: 1100px; margin: 0 auto; padding: 0 24px; width: 100%; }
    .dw .hero-tag { display: inline-block; border: 1px solid ${t.accent}; color: ${t.accent}; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; padding: 6px 14px; border-radius: ${t.radius}; margin-bottom: 20px; }
    .dw .hero-title { font-size: clamp(40px, 6vw, 74px); font-weight: 800; line-height: 1.05; letter-spacing: -2px; color: ${t.text}; max-width: 620px; margin-bottom: 18px; }
    .dw .hero-title span { color: ${t.accent}; }
    .dw .hero-sub { font-size: 18px; color: rgba(255,255,255,0.78); max-width: 480px; margin-bottom: 34px; line-height: 1.65; }
    .dw .hero-btns { display: flex; gap: 14px; flex-wrap: wrap; }
    .dw .btn-p { background: ${t.accent}; color: ${t.bg}; padding: 15px 30px; border-radius: ${t.radius}; font-weight: 700; font-size: 15px; text-decoration: none; display: inline-block; transition: background 0.2s; }
    .dw .btn-p:hover { background: ${t.accent2}; }
    .dw .btn-o { border: 2px solid rgba(255,255,255,0.42); color: ${t.text}; padding: 13px 28px; border-radius: ${t.radius}; font-weight: 600; font-size: 15px; text-decoration: none; display: inline-block; transition: border-color 0.2s, color 0.2s; }
    .dw .btn-o:hover { border-color: ${t.accent}; color: ${t.accent}; }
    .dw .hero-badges { display: flex; gap: 24px; margin-top: 36px; flex-wrap: wrap; }
    .dw .hbadge { display: flex; align-items: center; gap: 8px; font-size: 13px; color: rgba(255,255,255,0.66); }
    .dw .bdot { width: 7px; height: 7px; background: ${t.accent}; border-radius: 50%; flex-shrink: 0; }

    .dw .sec { padding: 80px 0; }
    .dw .sec-alt { background: ${t.bg2}; }
    .dw .sec-dark { background: ${t.bg3}; }
    .dw .slbl { font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: ${t.accent}; margin-bottom: 10px; }
    .dw .stitle { font-size: clamp(28px, 4vw, 42px); font-weight: 800; color: ${t.text}; letter-spacing: -1px; margin-bottom: 12px; line-height: 1.1; }
    .dw .ssub { font-size: 16px; color: ${t.muted}; max-width: 520px; line-height: 1.7; }
    .dw .shdr { margin-bottom: 48px; }
    .dw .dvdr { width: 44px; height: 3px; background: ${t.accent}; margin: 14px 0 18px; }

    .dw .svc-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; overflow: hidden; }
    .dw .svc { background: ${t.bg2}; padding: 26px 28px; }
    .dw .svc-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; }
    .dw .svc-name { font-size: 17px; font-weight: 700; color: ${t.text}; }
    .dw .svc-price { font-size: 18px; font-weight: 800; color: ${t.accent}; white-space: nowrap; margin-left: 12px; }
    .dw .svc-desc { font-size: 14px; color: ${t.muted}; line-height: 1.6; }

    .dw .gal-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
    .dw .gal-item { overflow: hidden; border-radius: 6px; }
    .dw .gal-item img { width: 100%; aspect-ratio: 3/4; object-fit: cover; object-position: top; transition: transform 0.4s; }
    .dw .gal-item:hover img { transform: scale(1.04); }

    .dw .ba-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
    .dw .ba-card { background: ${t.bg2}; border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; overflow: hidden; }
    .dw .ba-imgs { display: grid; grid-template-columns: 1fr 1fr; position: relative; }
    .dw .ba-img { width: 100%; aspect-ratio: 4/3; object-fit: cover; }
    .dw .ba-sep { position: absolute; left: 50%; top: 0; bottom: 0; width: 3px; background: ${t.accent}; transform: translateX(-50%); }
    .dw .ba-lbls { display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid rgba(255,255,255,0.07); }
    .dw .ba-lbl { padding: 9px 14px; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; }
    .dw .ba-lbl-b { color: ${t.muted}; border-right: 1px solid rgba(255,255,255,0.07); }
    .dw .ba-lbl-a { color: ${t.accent}; }
    .dw .ba-info { padding: 16px 20px 22px; border-top: 1px solid rgba(255,255,255,0.07); }
    .dw .ba-title { font-size: 16px; font-weight: 700; color: ${t.text}; margin-bottom: 8px; }
    .dw .ba-descs { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 13px; }
    .dw .ba-db { color: ${t.muted}; }
    .dw .ba-da { color: ${t.accent2}; }

    .dw .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
    .dw .about-img { width: 100%; aspect-ratio: 4/5; object-fit: cover; border-radius: 8px; }
    .dw .about-text p { color: ${t.light}; line-height: 1.8; font-size: 15px; margin-bottom: 16px; }
    .dw .stats { display: flex; gap: 32px; margin-top: 32px; padding-top: 28px; border-top: 1px solid rgba(255,255,255,0.08); }
    .dw .stat-num { font-size: 30px; font-weight: 800; color: ${t.accent}; display: block; }
    .dw .stat-lbl { font-size: 11px; color: ${t.muted}; text-transform: uppercase; letter-spacing: 1px; }

    .dw .rv-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
    .dw .rv { background: ${t.bg2}; border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; padding: 28px; }
    .dw .rv-text { font-size: 15px; color: ${t.light}; line-height: 1.7; margin-bottom: 14px; font-style: italic; }
    .dw .rv-name { font-size: 13px; font-weight: 700; color: ${t.accent}; }

    .dw .ct-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
    .dw .ct-block { background: ${t.bg2}; border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; padding: 36px; }
    .dw .ct-block h3 { font-size: 20px; font-weight: 700; color: ${t.text}; margin-bottom: 22px; }
    .dw .hr-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 14px; }
    .dw .hr-day { color: ${t.muted}; }
    .dw .hr-time { color: ${t.text}; font-weight: 500; }
    .dw .ci { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 18px; }
    .dw .ci-icon { width: 36px; height: 36px; background: rgba(255,255,255,0.07); border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; }
    .dw .ci-lbl { font-size: 11px; color: ${t.muted}; text-transform: uppercase; letter-spacing: 1px; }
    .dw .ci-val { font-size: 15px; color: ${t.text}; font-weight: 500; }
    .dw .cta-btn { background: ${t.accent}; color: ${t.bg}; display: block; text-align: center; padding: 16px; border-radius: ${t.radius}; font-weight: 800; font-size: 16px; text-decoration: none; margin-top: 24px; transition: background 0.2s; }
    .dw .cta-btn:hover { background: ${t.accent2}; }

    .dw .footer { background: ${t.bg}; border-top: 1px solid rgba(255,255,255,0.06); padding: 28px 24px; }
    .dw .footer-in { max-width: 1100px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
    .dw .f-copy { font-size: 13px; color: ${t.muted}; }
    .dw .f-badge { font-size: 11px; color: rgba(136,136,136,0.55); }
    .dw .f-badge a { color: rgba(200,168,76,0.5); text-decoration: none; }
    .dw .f-badge a:hover { color: ${t.accent}; }

    @media (max-width: 768px) {
      .dw .nav-links { display: none; }
      .dw .gal-grid { grid-template-columns: repeat(2, 1fr); }
      .dw .about-grid { grid-template-columns: 1fr; }
      .dw .ct-grid { grid-template-columns: 1fr; }
      .dw .ba-grid { grid-template-columns: 1fr; }
      .dw .hero-title { letter-spacing: -1px; }
    }
    @media (max-width: 480px) {
      .dw .gal-grid { grid-template-columns: 1fr; }
      .dw .stats { flex-wrap: wrap; gap: 16px; }
      .dw .hero-badges { flex-direction: column; gap: 10px; }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="dw">

        {data.announceBar && <div className="announce">{data.announceBar}</div>}

        {/* ── Nav ── */}
        <nav className="nav">
          <div className="nav-in">
            <div>
              <div className="logo-name">{config.businessName}</div>
              <div className="logo-tag">{config.businessType} · Detroit, MI</div>
            </div>
            <ul className="nav-links">
              <li><a href="#services">Services</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div className="nav-phone">📞 {config.phone}</div>
              <a href="#contact" className="nav-cta">{isPlumbing ? 'Call Now' : 'Book Now'}</a>
            </div>
          </div>
        </nav>

        {/* ── Hero ── */}
        <section className="hero">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.heroImg} alt={data.heroAlt} className="hero-img" />
          <div className="hero-ov" />
          <div className="hero-con">
            <div className="hero-tag">{config.businessType} · Detroit, MI</div>
            <h1 className="hero-title">
              {isBarber && (<>Fresh Cuts.<br /><span>Sharp Fades.</span><br />No Waiting.</>)}
              {isPlumbing && (<>Detroit&apos;s<br /><span>Trusted</span><br />Plumber.</>)}
              {isSalon && (<>Your Hair.<br />Your Crown.<br /><span>Protected.</span></>)}
            {isRestaurant && (<>Detroit&apos;s<br /><span>Soul Food.</span><br />Made Fresh.</>)}
            </h1>
            <p className="hero-sub">{config.tagline}</p>
            <div className="hero-btns">
              <a href="/contact" className="btn-p">{data.ctaLabel}</a>
              <a href="#services" className="btn-o">See Services &amp; Pricing</a>
            </div>
            <div className="hero-badges">
              <div className="hbadge"><div className="bdot" /><span>{isPlumbing ? '24/7 Emergency Service' : 'Walk-ins Welcome'}</span></div>
              <div className="hbadge"><div className="bdot" /><span>Licensed &amp; Insured · Detroit, MI</span></div>
              <div className="hbadge"><div className="bdot" /><span>4.8+ Stars on Google</span></div>
            </div>
          </div>
        </section>

        {/* ── Services ── */}
        <section className="sec" id="services">
          <div className="con">
            <div className="shdr">
              <div className="slbl">{isPlumbing ? 'What We Fix' : 'What We Offer'}</div>
              <h2 className="stitle">Services &amp; Pricing</h2>
              <div className="dvdr" />
              <p className="ssub">
                {isBarber && 'Every cut done right the first time. No rushing, no corners cut.'}
                {isPlumbing && 'From slow drains to major emergencies — we handle it all, fast and clean.'}
                {isSalon && 'Every client leaves feeling confident. We take our time, we do it right.'}
              </p>
            </div>
            <div className="svc-grid">
              {config.services.map(s => (
                <div className="svc" key={s.name}>
                  <div className="svc-top">
                    <div className="svc-name">{s.name}</div>
                    {s.price && <div className="svc-price">{s.price}</div>}
                  </div>
                  <div className="svc-desc">{s.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Gallery / Before-After ── */}
        <section className="sec sec-alt" id="gallery">
          <div className="con">
            <div className="shdr">
              <div className="slbl">Our Work</div>
              <h2 className="stitle">{isPlumbing ? 'Before & After' : 'The Gallery'}</h2>
              <div className="dvdr" />
              <p className="ssub">
                {isPlumbing
                  ? "Real jobs we've completed. We leave it better than we found it."
                  : 'Real work from real clients. This is what we do.'}
              </p>
            </div>

            {data.beforeAfter ? (
              <div className="ba-grid">
                {data.beforeAfter.map((item, i) => (
                  <div className="ba-card" key={i}>
                    <div className="ba-imgs">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.before} alt={`Before: ${item.title}`} className="ba-img" />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.after} alt={`After: ${item.title}`} className="ba-img" />
                      <div className="ba-sep" />
                    </div>
                    <div className="ba-lbls">
                      <div className="ba-lbl ba-lbl-b">Before</div>
                      <div className="ba-lbl ba-lbl-a">After</div>
                    </div>
                    <div className="ba-info">
                      <div className="ba-title">{item.title}</div>
                      <div className="ba-descs">
                        <div className="ba-db">{item.beforeLabel}</div>
                        <div className="ba-da">{item.afterLabel}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="gal-grid">
                {data.gallery.map((img, i) => (
                  <div className="gal-item" key={i}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.url} alt={img.alt} loading={i > 1 ? 'lazy' : 'eager'} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── About ── */}
        <section className="sec sec-dark" id="about">
          <div className="con">
            <div className="about-grid">
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={data.aboutImg} alt={`About ${config.businessName}`} className="about-img" />
              </div>
              <div className="about-text">
                <div className="slbl">Our Story</div>
                <h2 className="stitle">
                  {isBarber && 'Built in Detroit.\nFor Detroit.'}
                  {isPlumbing && 'Detroit Owned.\nDetroit Proud.'}
                  {isSalon && 'Your Hair.\nOur Passion.'}
                </h2>
                <div className="dvdr" />
                <p>{config.about}</p>
                <p>
                  {isBarber && "When you sit in one of our chairs, you're not just getting a haircut. You're getting a fresh start to your week."}
                  {isPlumbing && 'Every technician is Michigan-licensed, background checked, and trained in the latest techniques. When we give you a price, that\'s the price. No hidden fees.'}
                  {isSalon && 'Detroit is home. Our clients are our community. Every appointment is a chance to make someone feel like the royalty they are.'}
                </p>
          {isRestaurant && <p className="about-para">Detroit's Kitchen has been serving the community since day one — real comfort food, made from scratch, with love. We believe everyone deserves a hot meal that feels like home.</p>}
                <div className="stats">
                  {data.stats.map(s => (
                    <div key={s.label}>
                      <span className="stat-num">{s.num}</span>
                      <span className="stat-lbl">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Reviews ── */}
        <section className="sec sec-alt">
          <div className="con">
            <div className="shdr">
              <div className="slbl">{isSalon ? 'Client Love' : 'Customer Reviews'}</div>
              <h2 className="stitle">What People Say</h2>
              <div className="dvdr" />
            </div>
            <div className="rv-grid">
              {data.reviews.map((r, i) => (
                <div className="rv" key={i}>
                  <Stars count={r.stars} />
                  <p className="rv-text">&ldquo;{r.text}&rdquo;</p>
                  <div className="rv-name">— {r.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Hours & Contact ── */}
        <section className="sec" id="contact">
          <div className="con">
            <div className="shdr">
              <div className="slbl">Reach Us</div>
              <h2 className="stitle">Hours &amp; Contact</h2>
              <div className="dvdr" />
            </div>
            <div className="ct-grid">
              <div className="ct-block">
                <h3>Hours of Operation</h3>
                {config.hours.map(h => (
                  <div className="hr-row" key={h.day}>
                    <span className="hr-day">{h.day}</span>
                    <span className="hr-time">{h.hours}</span>
                  </div>
                ))}
                {isPlumbing && (
                  <p style={{ marginTop: 16, fontSize: 13, color: t.muted, lineHeight: 1.6 }}>
                    Emergency service available 24/7 for burst pipes, gas line issues, and major leaks.
                  </p>
                )}
              </div>
              <div className="ct-block">
                <h3>Get In Touch</h3>
                <div className="ci">
                  <div className="ci-icon">📍</div>
                  <div>
                    <div className="ci-lbl">Address</div>
                    <div className="ci-val">{config.address}<br />{config.city}</div>
                  </div>
                </div>
                <div className="ci">
                  <div className="ci-icon">📞</div>
                  <div>
                    <div className="ci-lbl">Phone{isPlumbing ? ' (24/7)' : ''}</div>
                    <div className="ci-val">{config.phone}</div>
                  </div>
                </div>
                <div className="ci">
                  <div className="ci-icon">✉️</div>
                  <div>
                    <div className="ci-lbl">Email</div>
                    <div className="ci-val">info@{config.slug.replace('-', '')}.com</div>
                  </div>
                </div>
                <a href="/contact" className="cta-btn">
                  {data.ctaLabel}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="footer">
          <div className="footer-in">
            <div className="f-copy">
              © {new Date().getFullYear()} {config.businessName} · {config.address}, {config.city}
            </div>
            <div className="f-badge">
              Website by{' '}
              <a href="https://caliberwebstudio.com" target="_blank" rel="noopener noreferrer">
                Caliber Web Studio
              </a>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}


