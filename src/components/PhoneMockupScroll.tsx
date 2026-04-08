'use client';
import { useState } from 'react';

type Category = 'home' | 'services' | 'about' | 'contact';

// ─── Business config ──────────────────────────────────────────────────────────
interface Biz {
  id: string; label: string;
  name: string; tagline: string;
  city: string; est: string;
  accent: string;
  theme: 'dark' | 'light';
  bg: string; heroGrad: string;
  heroPhoto: string;   // real photograph URL
  aboutPhoto: string;  // portrait / team photo
  services: [string, string, string, string];
  price: string;
  tagline2: string;
  heroTitle: [string, string];
  cta: string;
  phone: string; address: string; hours: string;
  philosophy: string;
}

// picsum.photos seeds are deterministic — same photo every load, zero CORS issues.
// The gradient overlay works with any photo, so it doesn't matter what subject appears.
const BIZ: Biz[] = [
  {
    id: 'glass', label: 'Auto Glass', name: 'Meridian Glass', tagline: 'Same-Day · Guaranteed',
    city: 'Detroit', est: 'Since 2009', accent: '#2563eb', theme: 'light',
    bg: '#ffffff', heroGrad: 'linear-gradient(160deg, #1a2d4a 0%, #0d1b30 100%)',
    heroPhoto: '/images/phone-auto-glass.png',
    aboutPhoto: '/images/phone-auto-glass.png',
    services: ['Windshield Replacement', 'Chip & Crack Repair', 'Side Glass', 'ADAS Recalibration'],
    price: 'From $99', tagline2: 'Trusted by 3,400+ Metro Detroit drivers',
    heroTitle: ['Same-Day Glass', 'Replacement'],
    cta: 'Schedule Now', phone: '(313) 555-0181', address: 'Detroit, MI 48201', hours: 'Mon–Sat 7AM–7PM',
    philosophy: '"Every windshield we install is backed by a lifetime guarantee."',
  },
  {
    id: 'barber', label: 'Barbershop', name: 'Studio 1908', tagline: 'Precision Grooming',
    city: 'Midtown Detroit', est: 'Since 2014', accent: '#b8860b', theme: 'dark',
    bg: '#0d0b08', heroGrad: 'linear-gradient(160deg, #3a2010 0%, #150d05 100%)',
    heroPhoto: '/images/phone-barbershop.png',
    aboutPhoto: '/images/phone-barbershop.png',
    services: ['Signature Haircut', 'Hot Towel Shave', 'Beard Sculpting', 'Scalp Treatment'],
    price: 'From $45', tagline2: "Detroit's premium grooming studio",
    heroTitle: ['Precision Cuts,', 'Classic Craft'],
    cta: 'Book a Chair', phone: '(313) 555-0144', address: 'Midtown Detroit, MI', hours: 'Tue–Sat 10AM–7PM',
    philosophy: '"Every detail matters. We don\'t rush greatness."',
  },
  {
    id: 'land', label: 'Landscaping', name: 'Terrain', tagline: 'Landscape Architecture',
    city: 'Bloomfield Hills', est: 'Since 2011', accent: '#3d7a52', theme: 'light',
    bg: '#ffffff', heroGrad: 'linear-gradient(160deg, #0c2a14 0%, #061008 100%)',
    heroPhoto: '/images/phone-landscaping.png',
    aboutPhoto: '/images/phone-landscaping.png',
    services: ['Landscape Design', 'Premium Lawn Care', 'Hardscaping', 'Seasonal Programs'],
    price: 'Custom Quote', tagline2: 'Luxury outdoor environments for Metro Detroit',
    heroTitle: ['Elevated Outdoor', 'Living'],
    cta: 'Request Consultation', phone: '(248) 555-0162', address: 'Bloomfield Hills, MI', hours: 'Mon–Fri 8AM–6PM',
    philosophy: '"We don\'t maintain yards — we architect environments."',
  },
  {
    id: 'salon', label: 'Luxury Salon', name: 'Maison', tagline: 'Beauty & Wellness',
    city: 'Royal Oak', est: 'Since 2017', accent: '#c9a98a', theme: 'dark',
    bg: '#100c0a', heroGrad: 'linear-gradient(160deg, #2e1a12 0%, #0e0a08 100%)',
    heroPhoto: '/images/phone-luxury-salon.png',
    aboutPhoto: '/images/phone-luxury-salon.png',
    services: ['Color & Highlights', 'Keratin Treatment', 'Signature Blowout', 'Extensions'],
    price: 'From $120', tagline2: "Royal Oak's premier luxury salon experience",
    heroTitle: ['The Art of', 'Beauty'],
    cta: 'Reserve a Session', phone: '(248) 555-0193', address: 'Royal Oak, MI 48067', hours: 'Mon–Sat 9AM–8PM',
    philosophy: '"We create more than looks — we create confidence."',
  },
  {
    id: 'fitness', label: 'Fitness Studio', name: 'Apex Athletics', tagline: 'Performance Training',
    city: 'Southfield', est: 'Since 2016', accent: '#dc2626', theme: 'dark',
    bg: '#050505', heroGrad: 'linear-gradient(160deg, #200808 0%, #030303 100%)',
    heroPhoto: '/images/phone-fitness-studio.png',
    aboutPhoto: '/images/phone-fitness-studio.png',
    services: ['Personal Training', 'Athletic Performance', 'Nutrition Coaching', 'Recovery Programs'],
    price: 'From $79/mo', tagline2: "Southfield's elite performance facility",
    heroTitle: ['Train Without', 'Limits'],
    cta: 'Start Training', phone: '(248) 555-0177', address: 'Southfield, MI 48034', hours: 'Mon–Sun 5AM–10PM',
    philosophy: '"Champions are built here, daily."',
  },
  {
    id: 'resto', label: 'Fine Dining', name: 'Ardor', tagline: 'Modern American Kitchen',
    city: 'Corktown, Detroit', est: 'Since 2019', accent: '#d4a853', theme: 'dark',
    bg: '#0c0806', heroGrad: 'linear-gradient(160deg, #2c1c08 0%, #080503 100%)',
    heroPhoto: '/images/phone-fine-dining.png',
    aboutPhoto: '/images/phone-fine-dining.png',
    services: ['Chef\'s Tasting Menu', 'À La Carte Dining', 'Private Events', 'Wine Pairings'],
    price: 'From $85/pp', tagline2: 'Farm-to-table in the heart of Detroit',
    heroTitle: ['Modern American', 'Dining'],
    cta: 'Reserve a Table', phone: '(313) 555-0155', address: 'Corktown, Detroit MI', hours: 'Tue–Sun 5PM–11PM',
    philosophy: '"Every dish is a story told with honesty and fire."',
  },
  {
    id: 'plumb', label: 'Home Services', name: 'Prime Home', tagline: 'Residential · Commercial',
    city: 'Detroit Metro', est: 'Since 2008', accent: '#0ea5e9', theme: 'light',
    bg: '#ffffff', heroGrad: 'linear-gradient(160deg, #0c1e32 0%, #060e18 100%)',
    heroPhoto: '/images/phone-home-services.png',
    aboutPhoto: '/images/phone-home-services.png',
    services: ['Emergency Repairs', 'Pipe & Drain', 'Water Heater', 'Remodel Plumbing'],
    price: 'Free Estimate', tagline2: 'Licensed, bonded & trusted across Metro Detroit',
    heroTitle: ['24/7 Emergency', 'Home Service'],
    cta: 'Call Now — 24/7', phone: '(313) 555-0122', address: 'Detroit Metro Area', hours: 'Open 24/7',
    philosophy: '"We answer when no one else will."',
  },
  {
    id: 'dental', label: 'Cosmetic Dentistry', name: 'Luminary Dental', tagline: 'Smile Aesthetics',
    city: 'Birmingham', est: 'Since 2013', accent: '#10b981', theme: 'light',
    bg: '#ffffff', heroGrad: 'linear-gradient(160deg, #052a20 0%, #020e0a 100%)',
    heroPhoto: '/images/phone-cosmetic-dentistry.png',
    aboutPhoto: '/images/phone-cosmetic-dentistry.png',
    services: ['Smile Makeover', 'Teeth Whitening', 'Porcelain Veneers', 'Invisalign'],
    price: 'Free Consult', tagline2: "Birmingham's premier cosmetic dental studio",
    heroTitle: ['Your Smile,', 'Perfected'],
    cta: 'Book Consultation', phone: '(248) 555-0138', address: 'Birmingham, MI 48009', hours: 'Mon–Fri 8AM–5PM',
    philosophy: '"A great smile is the foundation of confidence."',
  },
];

// ── Status bar ────────────────────────────────────────────────────────────────
function StatusBar({ light }: { light?: boolean }) {
  const c = light ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.6)';
  return (
    <div style={{ height: '28px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 14px 5px', flexShrink: 0 }}>
      <span style={{ fontSize: '7.5px', fontWeight: 700, color: c, fontFamily: 'system-ui', letterSpacing: '-0.01em' }}>9:41</span>
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '1.5px', alignItems: 'flex-end' }}>
          {[3, 5, 7].map(h => <div key={h} style={{ width: '2.5px', height: `${h}px`, background: c, borderRadius: '1px' }} />)}
        </div>
        <div style={{ width: '16px', height: '8px', border: `1.5px solid ${c}`, borderRadius: '2px', position: 'relative' }}>
          <div style={{ position: 'absolute', right: '-4px', top: '50%', transform: 'translateY(-50%)', width: '2px', height: '5px', background: c, borderRadius: '1px' }} />
          <div style={{ margin: '1.5px', height: '3px', background: c, borderRadius: '1px', width: '65%' }} />
        </div>
      </div>
    </div>
  );
}

// ── Nav bar ───────────────────────────────────────────────────────────────────
function NavBar({ b, light }: { b: Biz; light?: boolean }) {
  const textC = light ? '#111' : '#fff';
  const borderC = light ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.06)';
  return (
    <div style={{ padding: '5px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${borderC}`, flexShrink: 0, background: light ? '#fff' : undefined }}>
      <div>
        <div style={{ fontSize: '8px', fontWeight: 800, color: textC, letterSpacing: '0.04em', lineHeight: 1 }}>{b.name.toUpperCase()}</div>
        <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '1.5px' }}>{b.tagline}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5px' }}>
        {[14, 10].map((w, i) => <div key={i} style={{ width: `${w}px`, height: '1.5px', background: light ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.5)', borderRadius: '1px' }} />)}
      </div>
    </div>
  );
}

// ── Hero photo block — real photograph with gradient overlay ──────────────────
function HeroPhoto({ b, height = 170 }: { b: Biz; height?: number }) {
  return (
    <div style={{ height, flexShrink: 0, position: 'relative', overflow: 'hidden', background: b.heroGrad }}>
      {/* Authentic photograph */}
      <img
        src={b.heroPhoto}
        alt=""
        loading="eager"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      {/* Gradient overlay — accent tint top-left + dark scrim at bottom for text */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(160deg, ${b.accent}55 0%, transparent 45%, rgba(0,0,0,0.72) 100%)`,
      }} />
      {/* Accent left edge */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '2px', height: '70%', background: `linear-gradient(to bottom, ${b.accent}, transparent)`, opacity: 0.9 }} />
      {/* Text overlay */}
      <div style={{ position: 'absolute', bottom: '14px', left: '12px', right: '12px' }}>
        <div style={{ fontSize: '5px', color: 'rgba(255,255,255,0.72)', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: '8px', height: '0.5px', background: b.accent, display: 'inline-block' }} />
          {b.est} · {b.city}
        </div>
        <div style={{ fontSize: '17px', fontWeight: 900, color: '#fff', lineHeight: 1.08, letterSpacing: '-0.03em', textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}>
          {b.heroTitle[0]}<br />{b.heroTitle[1]}
        </div>
      </div>
    </div>
  );
}

// ══ HOME SCREEN ══════════════════════════════════════════════════════════════

function HomeScreen({ b }: { b: Biz }) {
  const lm = b.theme === 'light';
  const textH = lm ? '#0f0f0f' : '#ffffff';
  const textB = lm ? '#6b7280' : 'rgba(255,255,255,0.45)';
  const border = lm ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.06)';
  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar light={lm} />
      <NavBar b={b} light={lm} />
      <HeroPhoto b={b} height={170} />
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* sub + CTA strip */}
        <div style={{ padding: '9px 12px 8px', borderBottom: `1px solid ${border}` }}>
          <div style={{ fontSize: '5.5px', color: textB, lineHeight: 1.5, marginBottom: '6px' }}>{b.tagline2}</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'inline-flex', padding: '5px 12px', background: b.accent, borderRadius: '2px', fontSize: '6px', fontWeight: 700, color: '#fff', letterSpacing: '0.07em', textTransform: 'uppercase', gap: '5px', alignItems: 'center' }}>
              {b.cta} <span style={{ fontSize: '8px' }}>→</span>
            </div>
            <div style={{ fontSize: '5px', color: textB, textAlign: 'right' }}>
              <div style={{ color: '#f59e0b', letterSpacing: '1px', lineHeight: 1 }}>★★★★★</div>
              <div style={{ marginTop: '1px', opacity: 0.7 }}>200+ reviews</div>
            </div>
          </div>
        </div>
        {/* services mini-list */}
        {b.services.slice(0, 3).map((s, i) => (
          <div key={s} style={{ padding: '6px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: i < 2 ? `1px solid ${border}` : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: b.accent, flexShrink: 0 }} />
              <span style={{ fontSize: '6.5px', fontWeight: 500, color: textH }}>{s}</span>
            </div>
            <span style={{ fontSize: '7px', color: b.accent, opacity: 0.7 }}>›</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ══ SERVICES SCREEN ══════════════════════════════════════════════════════════

function ServicesScreen({ b }: { b: Biz }) {
  const lm = b.theme === 'light';
  const textH = lm ? '#0f0f0f' : '#ffffff';
  const textB = lm ? '#6b7280' : 'rgba(255,255,255,0.45)';
  const border = lm ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.06)';
  const cardBg = lm ? '#f9fafb' : 'rgba(255,255,255,0.04)';
  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar light={lm} />
      <NavBar b={b} light={lm} />
      <div style={{ flex: 1, padding: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
          <div style={{ width: '14px', height: '1px', background: b.accent }} />
          <span style={{ fontSize: '5.5px', color: b.accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'monospace' }}>Our Services</span>
        </div>
        <div style={{ fontSize: '15px', fontWeight: 900, color: textH, lineHeight: 1.1, letterSpacing: '-0.025em', marginBottom: '10px' }}>
          What We<br />Offer
        </div>
        {/* 2×2 service cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '10px' }}>
          {b.services.map(s => (
            <div key={s} style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: '6px', padding: '8px 7px', borderTop: `2px solid ${b.accent}` }}>
              <div style={{ fontSize: '6px', fontWeight: 700, color: textH, lineHeight: 1.35 }}>{s}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
          <div style={{ fontSize: '7px', fontWeight: 800, color: b.accent }}>{b.price}</div>
          <div style={{ padding: '5px 12px', background: b.accent, borderRadius: '2px', fontSize: '6px', fontWeight: 700, color: '#fff', letterSpacing: '0.07em' }}>Book Now</div>
        </div>
      </div>
    </div>
  );
}

// ══ ABOUT SCREEN ═════════════════════════════════════════════════════════════

function AboutScreen({ b }: { b: Biz }) {
  const lm = b.theme === 'light';
  const textH = lm ? '#0f0f0f' : '#ffffff';
  const textB = lm ? '#6b7280' : 'rgba(255,255,255,0.45)';
  const border = lm ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.06)';
  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar light={lm} />
      <NavBar b={b} light={lm} />
      {/* About hero — real photo with scrim */}
      <div style={{ height: '148px', flexShrink: 0, position: 'relative', overflow: 'hidden', background: b.heroGrad }}>
        <img
          src={b.aboutPhoto}
          alt=""
          loading="eager"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, ${b.accent}44 0%, rgba(0,0,0,0.55) 100%)` }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50px', background: `linear-gradient(to bottom, transparent, ${b.bg})` }} />
      </div>
      <div style={{ flex: 1, padding: '10px 12px', overflow: 'hidden' }}>
        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
          <div style={{ fontSize: '12px', fontWeight: 900, color: textH, letterSpacing: '-0.02em' }}>{b.name}</div>
          <div style={{ fontSize: '5px', color: b.accent, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'monospace', marginTop: '2px' }}>{b.est} · {b.city}</div>
        </div>
        <div style={{ height: '1px', background: border, marginBottom: '8px' }} />
        <div style={{ fontSize: '7px', color: textB, lineHeight: 1.75, fontStyle: 'italic', textAlign: 'center', padding: '0 4px', marginBottom: '8px' }}>
          {b.philosophy}
        </div>
        <div style={{ height: '1px', background: border, marginBottom: '7px' }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '6px' }}>
          {[['10+', 'Years'], ['500+', 'Clients'], ['5★', 'Rated']].map(([v, l]) => (
            <div key={l} style={{ textAlign: 'center', padding: '5px 0', background: lm ? '#f9fafb' : 'rgba(255,255,255,0.04)', borderRadius: '4px', border: `1px solid ${border}` }}>
              <div style={{ fontSize: '9px', fontWeight: 900, color: b.accent, lineHeight: 1 }}>{v}</div>
              <div style={{ fontSize: '5px', color: textB, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '2px' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ══ CONTACT SCREEN ════════════════════════════════════════════════════════════

function ContactScreen({ b }: { b: Biz }) {
  const lm = b.theme === 'light';
  const textH = lm ? '#0f0f0f' : '#ffffff';
  const textB = lm ? '#6b7280' : 'rgba(255,255,255,0.45)';
  const border = lm ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.06)';
  const fieldBg = lm ? '#f9fafb' : 'rgba(255,255,255,0.04)';
  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar light={lm} />
      <NavBar b={b} light={lm} />
      <div style={{ flex: 1, padding: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
          <div style={{ width: '14px', height: '1px', background: b.accent }} />
          <span style={{ fontSize: '5.5px', color: b.accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'monospace' }}>Contact Us</span>
        </div>
        <div style={{ fontSize: '15px', fontWeight: 900, color: textH, lineHeight: 1.1, letterSpacing: '-0.025em', marginBottom: '9px' }}>Get In<br />Touch</div>
        <div style={{ marginBottom: '9px' }}>
          <div style={{ fontSize: '8.5px', fontWeight: 800, color: b.accent, marginBottom: '3px' }}>{b.phone}</div>
          <div style={{ fontSize: '6px', color: textB, lineHeight: 1.6 }}>{b.address}</div>
          <div style={{ fontSize: '6px', color: textB }}>{b.hours}</div>
        </div>
        <div style={{ height: '1px', background: border, marginBottom: '9px' }} />
        {['Full Name', 'Email Address', 'Message'].map((label, i) => (
          <div key={label} style={{ marginBottom: '6px' }}>
            <div style={{ fontSize: '4.5px', color: textB, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '3px' }}>{label}</div>
            <div style={{ background: fieldBg, border: `1px solid ${border}`, borderRadius: '4px', padding: i === 2 ? '5px 8px 14px' : '5px 8px', fontSize: '6px', color: `${textB}66` }}>
              {i === 0 ? 'John Smith' : i === 1 ? 'john@email.com' : ''}
            </div>
          </div>
        ))}
        <div style={{ marginTop: 'auto', padding: '6px', background: b.accent, borderRadius: '3px', textAlign: 'center', fontSize: '6.5px', fontWeight: 700, color: '#fff', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
          Send Message <span style={{ fontSize: '8px' }}>→</span>
        </div>
      </div>
    </div>
  );
}

// ══ PHONE CHROME ══════════════════════════════════════════════════════════════

function Phone({ b, category }: { b: Biz; category: Category }) {
  return (
    <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', pointerEvents: 'none', userSelect: 'none' }}>
      {/* ── Label ABOVE (Mobbin pattern) ── */}
      <div style={{ fontFamily: "'Inter',system-ui,sans-serif", fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '-0.01em' }}>
        {b.label}
      </div>
      {/* ── Frame ── */}
      <div style={{
        width: `${PHONE_W}px`, height: `${PHONE_H}px`,
        background: '#0e0e0e',
        borderRadius: `${40 * PHONE_SCALE}px`,
        border: '2.5px solid #252525',
        overflow: 'hidden',
        boxShadow: '0 0 0 1px rgba(255,255,255,0.04), inset 0 0 0 1px rgba(255,255,255,0.04), 0 48px 100px rgba(0,0,0,0.55), 0 16px 36px rgba(0,0,0,0.4)',
        position: 'relative',
        flexShrink: 0,
      }}>
        {/* dynamic island — scaled position */}
        <div style={{ position: 'absolute', top: `${10 * PHONE_SCALE}px`, left: '50%', transform: 'translateX(-50%)', width: `${62 * PHONE_SCALE}px`, height: `${16 * PHONE_SCALE}px`, background: '#000', borderRadius: `${12 * PHONE_SCALE}px`, zIndex: 10 }} />
        {/* screen — scale all inner content proportionally */}
        <div style={{ height: '100%', paddingTop: '2px', overflow: 'hidden' }}>
          <div style={{ width: '216px', height: '444px', transform: `scale(${PHONE_SCALE})`, transformOrigin: 'top left' }}>
            {category === 'home'     && <HomeScreen     b={b} />}
            {category === 'services' && <ServicesScreen b={b} />}
            {category === 'about'    && <AboutScreen    b={b} />}
            {category === 'contact'  && <ContactScreen  b={b} />}
          </div>
        </div>
        {/* specular sheen */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 45%)', borderRadius: `${38 * PHONE_SCALE}px`, pointerEvents: 'none', zIndex: 6 }} />
      </div>
    </div>
  );
}

// ══ SECTION ═══════════════════════════════════════════════════════════════════

const TABS: { id: Category; label: string }[] = [
  { id: 'home',     label: 'Home Pages' },
  { id: 'services', label: 'Services'   },
  { id: 'about',    label: 'About Us'   },
  { id: 'contact',  label: 'Contact'    },
];

const PHONE_W  = 290;
const PHONE_H  = 596;
const PHONE_SCALE = PHONE_W / 216; // scale inner content proportionally
const LOOP_PX  = BIZ.length * (PHONE_W + 28); // 8 × 318px = 2544px

export default function PhoneMockupScroll() {
  const [active, setActive] = useState<Category>('home');
  const [fading, setFading]   = useState(false);

  const switchTab = (cat: Category) => {
    if (cat === active) return;
    setFading(true);
    setTimeout(() => { setActive(cat); setFading(false); }, 200);
  };

  return (
    <section
      style={{
        background: 'var(--bg3)',
        padding: 'clamp(72px,9vw,120px) 0',
        borderTop: '1px solid var(--border)',
        overflow: 'hidden',
      }}
    >
      {/* ── Header ── */}
      <div style={{ maxWidth: '1280px', margin: '0 auto clamp(44px,5.5vw,64px)', padding: '0 clamp(20px,6vw,60px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: "'Space Mono',monospace", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '20px' }}>
          <span style={{ width: '24px', height: '1px', background: 'var(--navy)', display: 'block' }} />
          Built For Your Industry
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'clamp(20px,3vw,32px)' }}>
          <div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(2rem,4.5vw,3.25rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.025em', color: 'var(--text-primary)', margin: '0 0 12px', maxWidth: '560px' }}>
              Every page.<br />
              <span style={{ color: 'var(--dim)' }}>Built to convert.</span>
            </h2>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '16px', lineHeight: 1.7, color: 'var(--dim)', margin: 0, maxWidth: '480px' }}>
              From barbershops to dental studios — every page is custom-designed for your industry, audience, and goals.
            </p>
          </div>

          {/* ── Segmented tab control (Mobbin-style) ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '999px', padding: '4px' }}>
            {TABS.map(t => (
              <button
                key={t.id}
                onClick={() => switchTab(t.id)}
                style={{
                  padding: '7px 16px', borderRadius: '999px', border: 'none',
                  background: active === t.id ? 'var(--navy)' : 'transparent',
                  color: active === t.id ? '#fff' : 'var(--dim)',
                  fontSize: '12px', fontFamily: "'Inter',sans-serif", fontWeight: active === t.id ? 600 : 400,
                  cursor: 'pointer', transition: 'all 0.2s ease', outline: 'none', letterSpacing: '-0.01em',
                  whiteSpace: 'nowrap',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Carousel ── */}
      <div style={{
        overflow: 'hidden',
        maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
      }}>
        <div
          className="pms-track"
          style={{
            display: 'flex', gap: '28px', padding: '8px 0 40px',
            opacity: fading ? 0 : 1, transition: 'opacity 0.2s ease',
            animation: 'pmsScroll 46s linear infinite',
            willChange: 'transform',
          }}
        >
          {[...BIZ, ...BIZ].map((b, i) => (
            <Phone key={`${b.id}-${i}`} b={b} category={active} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pmsScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-${LOOP_PX}px); }
        }
      `}</style>
    </section>
  );
}
