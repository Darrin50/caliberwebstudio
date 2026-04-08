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

// ══ HOME SCREENS — unique layout per business, photo fills full phone ══════════

// AUTO GLASS — photo bg, frosted-glass cards overlaid
function GlassHome({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
      <img src={b.heroPhoto} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      {/* navy gradient scrim — darker at top and bottom */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,20,40,0.82) 0%, rgba(10,20,40,0.35) 40%, rgba(10,20,40,0.75) 100%)' }} />
      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <StatusBar />
        {/* Brand header */}
        <div style={{ padding: '6px 12px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '8px', fontWeight: 800, color: '#fff', letterSpacing: '0.04em' }}>{b.name.toUpperCase()}</div>
            <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '1.5px' }}>Same-Day · Guaranteed</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', border: '1px solid rgba(255,255,255,0.2)' }}>☰</div>
        </div>
        {/* Hero headline floats in middle */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 12px' }}>
          <div style={{ fontSize: '5px', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '10px', height: '0.5px', background: b.accent, display: 'inline-block' }} />Detroit Metro
          </div>
          <div style={{ fontSize: '22px', fontWeight: 900, color: '#fff', lineHeight: 1.0, letterSpacing: '-0.03em', textShadow: '0 2px 16px rgba(0,0,0,0.5)', marginBottom: '8px' }}>
            Same-Day<br />Glass Repair
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2.5px 8px', background: 'rgba(255,255,255,0.12)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)', width: 'fit-content', marginBottom: '14px' }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22c55e' }} />
            <span style={{ fontSize: '4.5px', color: '#fff', fontWeight: 600 }}>⚡ 1-Hour Response</span>
          </div>
          {/* Repair type selector */}
          <div style={{ display: 'flex', gap: '5px', marginBottom: '8px' }}>
            {['Windshield', 'Chip Fix', 'Side Glass'].map((t, i) => (
              <div key={t} style={{ flex: 1, padding: '6px 4px', background: i === 0 ? b.accent : 'rgba(255,255,255,0.1)', borderRadius: '4px', textAlign: 'center', fontSize: '5px', fontWeight: 700, color: '#fff', border: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)' }}>{t}</div>
            ))}
          </div>
        </div>
        {/* Emergency call strip pinned to bottom */}
        <div style={{ background: b.accent, padding: '9px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Emergency Line · 24/7</div>
            <div style={{ fontSize: '11px', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1 }}>{b.phone}</div>
          </div>
          <div style={{ background: '#fff', borderRadius: '50%', width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>📞</div>
        </div>
      </div>
    </div>
  );
}

// BARBERSHOP — full bleed photo, booking card + barber chips overlaid
function BarberHome({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
      <img src={b.heroPhoto} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      {/* Deep dark gradient — clear top, heavy bottom */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(13,11,8,0.65) 0%, rgba(13,11,8,0.2) 30%, rgba(13,11,8,0.88) 70%, rgba(13,11,8,0.97) 100%)' }} />
      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <StatusBar />
        {/* Brand top */}
        <div style={{ padding: '6px 12px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '9px', fontWeight: 800, color: '#fff', letterSpacing: '0.04em' }}>{b.name.toUpperCase()}</div>
            <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '1px' }}>Midtown Detroit</div>
          </div>
          <div style={{ fontSize: '5px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em' }}>TUE–SAT</div>
        </div>
        {/* Spacer pushes content to bottom */}
        <div style={{ flex: 1 }} />
        {/* Next available slot */}
        <div style={{ margin: '0 12px 8px', background: 'rgba(255,255,255,0.06)', border: `1px solid ${b.accent}55`, borderLeft: `3px solid ${b.accent}`, borderRadius: '5px', padding: '8px 10px', backdropFilter: 'blur(8px)' }}>
          <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.16em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '3px' }}>Next Available</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '6px' }}>
            <span style={{ fontSize: '18px', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>2:30</span>
            <span style={{ fontSize: '7px', fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>PM · Today</span>
          </div>
          <div style={{ padding: '5px 0', background: b.accent, borderRadius: '3px', textAlign: 'center', fontSize: '5.5px', fontWeight: 700, color: '#000', letterSpacing: '0.1em' }}>BOOK THIS SLOT →</div>
        </div>
        {/* Barber avatars */}
        <div style={{ padding: '0 12px 8px' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            {[['M','Marcus','Cuts'],['D','DeShawn','Shave'],['R','Rico','Beard']].map(([i, n, s]) => (
              <div key={n} style={{ flex: 1, background: 'rgba(255,255,255,0.06)', borderRadius: '6px', padding: '6px 4px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(6px)' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: b.accent, margin: '0 auto 3px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', fontWeight: 700, color: '#000' }}>{i}</div>
                <div style={{ fontSize: '5px', fontWeight: 700, color: '#fff' }}>{n}</div>
                <div style={{ fontSize: '4px', color: 'rgba(255,255,255,0.45)' }}>{s}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Service chips */}
        <div style={{ padding: '0 12px 10px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {b.services.map(s => (
            <div key={s} style={{ padding: '3px 7px', background: 'rgba(255,255,255,0.08)', borderRadius: '20px', fontSize: '4.5px', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.1)' }}>{s}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

// LANDSCAPING — full bleed photo, quote CTA + project labels overlaid
function LandHome({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
      <img src={b.heroPhoto} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      {/* Light scrim at top, strong dark at bottom */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(12,42,20,0.7) 0%, rgba(12,42,20,0.15) 35%, rgba(12,42,20,0.8) 70%, rgba(12,42,20,0.95) 100%)' }} />
      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <StatusBar />
        {/* Brand header */}
        <div style={{ padding: '6px 12px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '8px', fontWeight: 800, color: '#fff', letterSpacing: '0.06em' }}>{b.name.toUpperCase()}</div>
            <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '1px' }}>Landscape Architecture</div>
          </div>
          <div style={{ padding: '4px 8px', background: b.accent, borderRadius: '20px', fontSize: '5px', fontWeight: 700, color: '#fff' }}>Get Quote</div>
        </div>
        {/* Spacer */}
        <div style={{ flex: 1 }} />
        {/* Season badge + headline */}
        <div style={{ padding: '0 12px 8px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2.5px 7px', background: 'rgba(255,255,255,0.12)', border: `1px solid ${b.accent}66`, borderRadius: '20px', marginBottom: '6px', backdropFilter: 'blur(4px)' }}>
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: b.accent }} />
            <span style={{ fontSize: '4.5px', color: '#fff', fontWeight: 600 }}>Spring bookings open</span>
          </div>
          <div style={{ fontSize: '20px', fontWeight: 900, color: '#fff', letterSpacing: '-0.025em', lineHeight: 1.05, marginBottom: '10px', textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}>Elevated<br />Outdoor Living</div>
          {/* Project labels row */}
          <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
            {['Design','Lawn Care','Hardscape','Seasonal'].map((cat) => (
              <div key={cat} style={{ flex: 1, padding: '4px 3px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', textAlign: 'center', fontSize: '4px', fontWeight: 600, color: '#fff', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)' }}>{cat}</div>
            ))}
          </div>
          {/* CTA */}
          <div style={{ padding: '7px 12px', background: b.accent, borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Free Consultation</div>
              <div style={{ fontSize: '7px', fontWeight: 800, color: '#fff' }}>Request Your Custom Quote</div>
            </div>
            <div style={{ fontSize: '12px', color: '#fff' }}>›</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// LUXURY SALON — full bleed photo, editorial overlay
function SalonHome({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
      <img src={b.heroPhoto} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      {/* Diagonal editorial gradient */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg, rgba(16,12,10,0.85) 0%, rgba(16,12,10,0.3) 45%, rgba(16,12,10,0.9) 100%)' }} />
      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <StatusBar />
        <div style={{ padding: '6px 12px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '7px', fontWeight: 800, color: '#fff', letterSpacing: '0.1em' }}>{b.name.toUpperCase()}</div>
          <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'monospace' }}>Royal Oak · Est 2017</div>
        </div>
        {/* Big headline in the middle */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 12px' }}>
          <div style={{ fontSize: '4px', color: b.accent, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '5px' }}>Featured Experience</div>
          <div style={{ fontSize: '24px', fontWeight: 900, color: '#fff', lineHeight: 1.0, letterSpacing: '-0.03em', textShadow: '0 2px 20px rgba(0,0,0,0.5)', marginBottom: '5px' }}>The Art<br />of Beauty</div>
          <div style={{ fontSize: '5px', color: 'rgba(255,255,255,0.6)', marginBottom: '10px', lineHeight: 1.6 }}>Luxury color · Keratin · Signature Blowout</div>
          <div style={{ padding: '5px 10px', background: b.accent, borderRadius: '3px', fontSize: '5px', fontWeight: 700, color: '#000', display: 'inline-block', width: 'fit-content' }}>Reserve a Session →</div>
        </div>
        {/* Services + rating at bottom */}
        <div style={{ padding: '0 12px 8px' }}>
          <div style={{ display: 'flex', gap: '4px', marginBottom: '6px' }}>
            {b.services.map((s, i) => (
              <div key={s} style={{ padding: '3.5px 6px', background: i === 0 ? b.accent : 'rgba(255,255,255,0.08)', borderRadius: '20px', fontSize: '4.5px', fontWeight: 600, color: i === 0 ? '#000' : 'rgba(255,255,255,0.7)', whiteSpace: 'nowrap', border: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(4px)' }}>{s}</div>
            ))}
          </div>
          <div style={{ padding: '6px 10px', background: 'rgba(255,255,255,0.07)', borderRadius: '5px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backdropFilter: 'blur(6px)' }}>
            <div style={{ fontSize: '5px', color: 'rgba(255,255,255,0.6)' }}>Royal Oak's #1 Salon</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <span style={{ color: '#f59e0b', fontSize: '7px' }}>★★★★★</span>
              <span style={{ fontSize: '5px', color: 'rgba(255,255,255,0.5)' }}>4.9</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// FITNESS STUDIO — full bleed photo, stats + schedule overlaid
function FitnessHome({ b }: { b: Biz }) {
  const classes = [['6:00 AM','HIIT Circuit','High'],['8:30 AM','Power Yoga','Med'],['12:00 PM','Strength & Lift','High']];
  return (
    <div style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
      <img src={b.heroPhoto} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      {/* Heavy dark overlay, lighter in middle so photo shows through */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(5,5,5,0.8) 0%, rgba(5,5,5,0.25) 35%, rgba(5,5,5,0.85) 65%, rgba(5,5,5,0.97) 100%)' }} />
      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <StatusBar />
        {/* Brand + join button */}
        <div style={{ padding: '6px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: '8px', fontWeight: 800, color: '#fff', letterSpacing: '0.06em' }}>{b.name.toUpperCase()}</div>
            <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '1px' }}>Southfield, MI</div>
          </div>
          <div style={{ padding: '3.5px 8px', background: b.accent, borderRadius: '20px', fontSize: '5px', fontWeight: 700, color: '#fff' }}>Join Today</div>
        </div>
        {/* Stats — float in the clear window */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 14px' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            {[['240+','Members'],['18','Classes/Wk'],['6','Trainers']].map(([v, l]) => (
              <div key={l}>
                <div style={{ fontSize: '16px', fontWeight: 900, color: b.accent, lineHeight: 1 }}>{v}</div>
                <div style={{ fontSize: '4px', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '2px' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Today's classes */}
        <div style={{ padding: '0 12px 10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px' }}>
            <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'monospace' }}>Today's Classes</div>
            <div style={{ fontSize: '4.5px', color: b.accent }}>View All →</div>
          </div>
          {classes.map(([time, name, intensity]) => (
            <div key={name} style={{ padding: '5px 8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(6px)' }}>
              <div style={{ fontSize: '5.5px', fontWeight: 700, color: b.accent, width: '30px', flexShrink: 0 }}>{time}</div>
              <div style={{ flex: 1, fontSize: '6px', fontWeight: 700, color: '#fff' }}>{name}</div>
              <div style={{ padding: '1.5px 4px', background: intensity === 'High' ? `${b.accent}40` : 'rgba(255,255,255,0.08)', borderRadius: '3px', fontSize: '3.5px', fontWeight: 700, color: intensity === 'High' ? b.accent : 'rgba(255,255,255,0.5)', letterSpacing: '0.06em' }}>{intensity}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// FINE DINING — full bleed photo, reservation picker at bottom
function RestoHome({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
      <img src={b.heroPhoto} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      {/* Warm dark gradient */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(12,8,3,0.75) 0%, rgba(12,8,3,0.1) 35%, rgba(12,8,3,0.85) 65%, rgba(12,8,3,0.97) 100%)' }} />
      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <StatusBar />
        {/* Brand + menu link */}
        <div style={{ padding: '6px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: '10px', fontWeight: 800, color: '#fff', letterSpacing: '0.08em', fontStyle: 'italic' }}>{b.name}</div>
            <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: '1px' }}>Corktown · Detroit</div>
          </div>
          <div style={{ padding: '3px 7px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', fontSize: '4.5px', color: '#fff', border: '1px solid rgba(255,255,255,0.18)' }}>Menu ↗</div>
        </div>
        {/* Spacer */}
        <div style={{ flex: 1 }} />
        {/* Info badges floating above lower panel */}
        <div style={{ padding: '0 12px 6px', display: 'flex', gap: '3px' }}>
          {['Tue–Sun','5PM–11PM','Reservations'].map(t => (
            <div key={t} style={{ padding: '2px 5px', background: 'rgba(0,0,0,0.45)', borderRadius: '2px', fontSize: '4px', color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(4px)' }}>{t}</div>
          ))}
        </div>
        {/* Reservation picker */}
        <div style={{ padding: '8px 12px', background: 'rgba(12,8,3,0.8)', backdropFilter: 'blur(12px)', borderTop: `1px solid ${b.accent}44` }}>
          <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '5px' }}>Tonight's Reservations</div>
          <div style={{ display: 'flex', gap: '4px', marginBottom: '6px' }}>
            {['7:00','7:30','8:00','8:30'].map((t, i) => (
              <div key={t} style={{ flex: 1, padding: '5px 2px', background: i === 1 ? b.accent : 'rgba(255,255,255,0.07)', borderRadius: '4px', textAlign: 'center', fontSize: '6px', fontWeight: 700, color: i === 1 ? '#000' : 'rgba(255,255,255,0.7)', border: i === 1 ? 'none' : '1px solid rgba(255,255,255,0.1)' }}>{t}</div>
            ))}
          </div>
          <div style={{ padding: '6px 10px', background: b.accent, borderRadius: '4px', textAlign: 'center', fontSize: '6px', fontWeight: 700, color: '#000', letterSpacing: '0.06em' }}>Reserve Table for 2 →</div>
        </div>
      </div>
    </div>
  );
}

// HOME SERVICES — full bleed photo, emergency CTA + service grid overlaid
function PlumbHome({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
      <img src={b.heroPhoto} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      {/* Navy gradient scrim */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(12,30,50,0.88) 0%, rgba(12,30,50,0.3) 35%, rgba(12,30,50,0.88) 65%, rgba(12,30,50,0.97) 100%)' }} />
      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <StatusBar />
        {/* Top bar */}
        <div style={{ padding: '6px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '7.5px', fontWeight: 800, color: '#fff', letterSpacing: '0.04em' }}>{b.name.toUpperCase()}</div>
            <div style={{ fontSize: '4px', color: b.accent, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '1px' }}>Licensed & Bonded · Detroit Metro</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22c55e' }} />
            <span style={{ fontSize: '4.5px', color: '#22c55e', fontWeight: 600 }}>Available Now</span>
          </div>
        </div>
        {/* Spacer */}
        <div style={{ flex: 1 }} />
        {/* Emergency call banner */}
        <div style={{ margin: '0 12px 8px', padding: '11px 12px', background: b.accent, borderRadius: '8px', textAlign: 'center', boxShadow: `0 4px 20px ${b.accent}66`, backdropFilter: 'blur(4px)' }}>
          <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.85)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '3px' }}>Emergency Service · 24/7</div>
          <div style={{ fontSize: '14px', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>{b.phone}</div>
          <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.75)', marginTop: '3px' }}>Avg response: 47 minutes</div>
        </div>
        {/* Service grid */}
        <div style={{ padding: '0 12px 6px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', marginBottom: '6px' }}>
            {[['🚿','Emergency Leak'],['🪠','Drain Clog'],['🔧','Pipe Repair'],['🛁','Water Heater']].map(([icon, label]) => (
              <div key={label} style={{ padding: '6px 7px', background: 'rgba(255,255,255,0.08)', borderRadius: '5px', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', gap: '5px', backdropFilter: 'blur(6px)' }}>
                <span style={{ fontSize: '9px' }}>{icon}</span>
                <span style={{ fontSize: '5px', fontWeight: 600, color: '#fff' }}>{label}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            {['⭐ 4.9 Rating','2,100+ Jobs','Free Estimate'].map(t => (
              <div key={t} style={{ flex: 1, padding: '3.5px 2px', background: 'rgba(255,255,255,0.07)', borderRadius: '3px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', fontSize: '4px', fontWeight: 600, color: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(4px)' }}>{t}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// COSMETIC DENTISTRY — full bleed photo, before/after + consult CTA overlaid
function DentalHome({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
      <img src={b.heroPhoto} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      {/* Clean teal-tinted gradient */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(5,42,32,0.82) 0%, rgba(5,42,32,0.2) 35%, rgba(5,42,32,0.88) 65%, rgba(5,42,32,0.97) 100%)' }} />
      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <StatusBar />
        {/* Header */}
        <div style={{ padding: '6px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '7px', fontWeight: 800, color: '#fff', letterSpacing: '0.06em' }}>{b.name.toUpperCase()}</div>
            <div style={{ fontSize: '4px', color: b.accent, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '1px' }}>Birmingham, MI · Smile Aesthetics</div>
          </div>
          <div style={{ padding: '3px 8px', background: b.accent, borderRadius: '20px', fontSize: '5px', fontWeight: 700, color: '#fff' }}>Free Consult</div>
        </div>
        {/* Center headline */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 12px' }}>
          <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '4px' }}>Smile Transformation</div>
          <div style={{ fontSize: '22px', fontWeight: 900, color: '#fff', lineHeight: 1.0, letterSpacing: '-0.03em', textShadow: '0 2px 16px rgba(0,0,0,0.5)', marginBottom: '6px' }}>Your Smile,<br />Perfected</div>
          {/* Before/After label strip */}
          <div style={{ display: 'flex', gap: '4px' }}>
            <div style={{ flex: 1, padding: '4px 6px', background: 'rgba(0,0,0,0.45)', borderRadius: '4px', textAlign: 'center', fontSize: '5px', fontWeight: 700, color: '#fff', border: '1px solid rgba(255,255,255,0.15)' }}>BEFORE ✕</div>
            <div style={{ flex: 1, padding: '4px 6px', background: b.accent, borderRadius: '4px', textAlign: 'center', fontSize: '5px', fontWeight: 700, color: '#fff' }}>AFTER ✓</div>
          </div>
        </div>
        {/* Treatments + CTA */}
        <div style={{ padding: '0 12px 10px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginBottom: '7px' }}>
            {b.services.map(s => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 8px', background: 'rgba(255,255,255,0.07)', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(4px)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: b.accent, flexShrink: 0 }} />
                  <span style={{ fontSize: '5.5px', color: '#fff', fontWeight: 500 }}>{s}</span>
                </div>
                <span style={{ fontSize: '6px', color: b.accent }}>›</span>
              </div>
            ))}
          </div>
          <div style={{ padding: '7px', background: b.accent, borderRadius: '5px', textAlign: 'center', fontSize: '6px', fontWeight: 700, color: '#fff', letterSpacing: '0.06em' }}>
            Book Your Free Smile Consultation →
          </div>
        </div>
      </div>
    </div>
  );
}

function HomeScreen({ b }: { b: Biz }) {
  if (b.id === 'glass')  return <GlassHome   b={b} />;
  if (b.id === 'barber') return <BarberHome   b={b} />;
  if (b.id === 'land')   return <LandHome     b={b} />;
  if (b.id === 'salon')  return <SalonHome    b={b} />;
  if (b.id === 'fitness')return <FitnessHome  b={b} />;
  if (b.id === 'resto')  return <RestoHome    b={b} />;
  if (b.id === 'plumb')  return <PlumbHome    b={b} />;
  if (b.id === 'dental') return <DentalHome   b={b} />;
  return null;
}

// ══ SERVICES SCREENS — unique layout per business ════════════════════════════

// AUTO GLASS — photo bg, vehicle selector + quote builder
function GlassServices({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
      <img src={b.heroPhoto} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,20,40,0.93) 0%, rgba(10,20,40,0.78) 100%)' }} />
      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <StatusBar />
        <div style={{ padding: '8px 12px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '8px', fontWeight: 800, color: '#fff', letterSpacing: '0.04em' }}>{b.name.toUpperCase()}</div>
          <div style={{ fontSize: '4px', color: b.accent, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Services</div>
        </div>
        <div style={{ flex: 1, padding: '6px 12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'monospace' }}>Get an Instant Quote</div>
          <div style={{ fontSize: '14px', fontWeight: 900, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.02em' }}>Select Your<br />Service</div>
          <div style={{ display: 'flex', gap: '5px' }}>
            {[['🚗','Sedan'],['🚙','SUV'],['🛻','Truck']].map(([icon, type], i) => (
              <div key={type} style={{ flex: 1, padding: '7px 4px', background: i === 0 ? b.accent : 'rgba(255,255,255,0.08)', borderRadius: '6px', textAlign: 'center', border: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)' }}>
                <div style={{ fontSize: '12px', marginBottom: '2px' }}>{icon}</div>
                <div style={{ fontSize: '5px', fontWeight: 700, color: '#fff' }}>{type}</div>
              </div>
            ))}
          </div>
          {b.services.map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 9px', background: i === 0 ? `${b.accent}22` : 'rgba(255,255,255,0.06)', borderRadius: '5px', border: i === 0 ? `1px solid ${b.accent}66` : '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(4px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: i === 0 ? b.accent : 'rgba(255,255,255,0.3)', flexShrink: 0 }} />
                <span style={{ fontSize: '5.5px', color: '#fff', fontWeight: i === 0 ? 700 : 400 }}>{s}</span>
              </div>
              <span style={{ fontSize: '6px', color: b.accent }}>›</span>
            </div>
          ))}
        </div>
        <div style={{ padding: '6px 12px 10px', background: 'rgba(10,20,40,0.7)', backdropFilter: 'blur(8px)', borderTop: `1px solid ${b.accent}33` }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Starting at</div>
              <div style={{ fontSize: '12px', fontWeight: 900, color: b.accent }}>$99</div>
            </div>
            <div style={{ padding: '7px 14px', background: b.accent, borderRadius: '4px', fontSize: '6px', fontWeight: 700, color: '#fff', letterSpacing: '0.06em' }}>Get Free Quote →</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// BARBERSHOP — luxury menu/price list
function BarberServices({ b }: { b: Biz }) {
  const prices = ['$45','$60','$35','$55'];
  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <div style={{ padding: '8px 12px 5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: 'rgba(255,255,255,0.06) 1px solid' }}>
        <div style={{ fontSize: '8px', fontWeight: 800, color: '#fff', letterSpacing: '0.04em' }}>{b.name.toUpperCase()}</div>
        <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Menu</div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '10px 12px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <div style={{ flex: 1, height: '0.5px', background: b.accent, opacity: 0.4 }} />
          <span style={{ fontSize: '5px', color: b.accent, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'monospace' }}>Services & Pricing</span>
          <div style={{ flex: 1, height: '0.5px', background: b.accent, opacity: 0.4 }} />
        </div>
        {b.services.map((s, i) => (
          <div key={s}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: b.accent, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '7px', fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>{s}</div>
                  <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.35)', marginTop: '1.5px' }}>45–60 min</div>
                </div>
              </div>
              <div style={{ fontSize: '8px', fontWeight: 800, color: b.accent }}>{prices[i]}</div>
            </div>
            {i < b.services.length - 1 && <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.06)' }} />}
          </div>
        ))}
      </div>
      <div style={{ padding: '10px 12px' }}>
        <div style={{ padding: '8px', background: b.accent, borderRadius: '3px', textAlign: 'center', fontSize: '6.5px', fontWeight: 700, color: '#000', letterSpacing: '0.1em' }}>BOOK YOUR CUT →</div>
      </div>
    </div>
  );
}

// LANDSCAPING — photo card grid portfolio
function LandServices({ b }: { b: Biz }) {
  const photos = ['land1svc','land2svc','land3svc','land4svc'];
  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar light />
      <div style={{ padding: '7px 12px 5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <div style={{ fontSize: '8px', fontWeight: 800, color: '#0f0f0f', letterSpacing: '0.04em' }}>{b.name.toUpperCase()}</div>
        <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Services</div>
      </div>
      <div style={{ flex: 1, padding: '9px 12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
          <div style={{ width: '12px', height: '1.5px', background: b.accent }} />
          <span style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'monospace' }}>What We Do</span>
        </div>
        <div style={{ fontSize: '14px', fontWeight: 900, color: '#0f0f0f', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '8px' }}>Our<br />Services</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px', flex: 1, overflow: 'hidden' }}>
          {b.services.map((s, i) => (
            <div key={s} style={{ position: 'relative', borderRadius: '6px', overflow: 'hidden', minHeight: '60px' }}>
              <img src={`https://picsum.photos/seed/${photos[i]}/110/80`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)' }} />
              <div style={{ position: 'absolute', bottom: '5px', left: '6px', right: '6px', fontSize: '5.5px', fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>{s}</div>
              <div style={{ position: 'absolute', top: '5px', right: '5px', width: '4px', height: '4px', borderRadius: '50%', background: b.accent }} />
            </div>
          ))}
        </div>
        <div style={{ marginTop: '8px', padding: '7px', background: b.accent, borderRadius: '4px', textAlign: 'center', fontSize: '6px', fontWeight: 700, color: '#fff', letterSpacing: '0.08em' }}>Request Custom Quote →</div>
      </div>
    </div>
  );
}

// LUXURY SALON — editorial category + featured treatment
function SalonServices({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <div style={{ padding: '7px 12px 5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ fontSize: '8px', fontWeight: 800, color: '#fff', letterSpacing: '0.04em' }}>{b.name.toUpperCase()}</div>
        <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Menu</div>
      </div>
      <div style={{ flex: 1, padding: '8px 12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: '4px', marginBottom: '10px' }}>
          {['All','Color','Treatment','Style'].map((cat, i) => (
            <div key={cat} style={{ padding: '3px 8px', background: i === 0 ? b.accent : 'rgba(255,255,255,0.07)', borderRadius: '20px', fontSize: '4.5px', fontWeight: i === 0 ? 700 : 400, color: i === 0 ? '#000' : 'rgba(255,255,255,0.6)', border: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }}>{cat}</div>
          ))}
        </div>
        <div style={{ background: `linear-gradient(135deg, ${b.accent}33, ${b.accent}11)`, border: `1px solid ${b.accent}55`, borderRadius: '8px', padding: '10px', marginBottom: '7px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '8px', right: '8px', padding: '2px 6px', background: b.accent, borderRadius: '20px', fontSize: '3.5px', fontWeight: 700, color: '#000', letterSpacing: '0.08em' }}>MOST POPULAR</div>
          <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '3px' }}>Featured</div>
          <div style={{ fontSize: '10px', fontWeight: 800, color: '#fff', letterSpacing: '-0.01em', marginBottom: '3px' }}>{b.services[0]}</div>
          <div style={{ fontSize: '5px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, marginBottom: '6px' }}>Full color with toning & gloss finish</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: '9px', fontWeight: 800, color: b.accent }}>From $120</div>
            <div style={{ padding: '4px 9px', background: b.accent, borderRadius: '3px', fontSize: '5px', fontWeight: 700, color: '#000' }}>Book →</div>
          </div>
        </div>
        {b.services.slice(1).map((s, i) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: b.accent, opacity: 0.7 }} />
              <span style={{ fontSize: '6px', color: '#fff', fontWeight: 500 }}>{s}</span>
            </div>
            <span style={{ fontSize: '6px', color: b.accent, opacity: 0.7 }}>›</span>
          </div>
        ))}
        <div style={{ marginTop: 'auto', padding: '7px', background: b.accent, borderRadius: '3px', textAlign: 'center', fontSize: '6px', fontWeight: 700, color: '#000', letterSpacing: '0.08em' }}>Reserve a Session →</div>
      </div>
    </div>
  );
}

// FITNESS STUDIO — class schedule / program tiles
function FitnessServices({ b }: { b: Biz }) {
  const durations = ['60 min','45 min','50 min','30 min'];
  const levels = ['Advanced','All Levels','Intermediate','Recovery'];
  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <div style={{ padding: '7px 12px 5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ fontSize: '8px', fontWeight: 800, color: '#fff', letterSpacing: '0.04em' }}>{b.name.toUpperCase()}</div>
        <div style={{ padding: '2.5px 7px', background: b.accent, borderRadius: '20px', fontSize: '4px', fontWeight: 700, color: '#fff' }}>From $79/mo</div>
      </div>
      <div style={{ flex: 1, padding: '8px 12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '4px' }}>Training Programs</div>
        <div style={{ fontSize: '13px', fontWeight: 900, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '8px' }}>Build Your<br />Program</div>
        {b.services.map((s, i) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 9px', background: i === 0 ? `${b.accent}20` : 'rgba(255,255,255,0.04)', borderRadius: '5px', marginBottom: '5px', border: i === 0 ? `1px solid ${b.accent}55` : '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ width: '3px', height: '24px', background: i === 0 ? b.accent : 'rgba(255,255,255,0.15)', borderRadius: '2px', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '6.5px', fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>{s}</div>
              <div style={{ fontSize: '4px', color: 'rgba(255,255,255,0.4)', marginTop: '1.5px' }}>{durations[i]} · {levels[i]}</div>
            </div>
            <div style={{ padding: '2px 5px', background: i === 0 ? b.accent : 'rgba(255,255,255,0.08)', borderRadius: '3px', fontSize: '3.5px', fontWeight: 700, color: i === 0 ? '#fff' : 'rgba(255,255,255,0.5)', letterSpacing: '0.06em' }}>{i === 0 ? 'POPULAR' : 'ENROLL'}</div>
          </div>
        ))}
        <div style={{ marginTop: 'auto', padding: '7px', background: b.accent, borderRadius: '4px', textAlign: 'center', fontSize: '6.5px', fontWeight: 700, color: '#fff', letterSpacing: '0.08em' }}>Start Free Trial →</div>
      </div>
    </div>
  );
}

// FINE DINING — elegant restaurant menu style
function RestoServices({ b }: { b: Biz }) {
  const details = ['7-course journey · $185/pp','Chef selections nightly','Up to 40 guests','Curated by sommelier'];
  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <div style={{ padding: '7px 12px 5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: 'rgba(255,255,255,0.06) 1px solid' }}>
        <div style={{ fontSize: '9px', fontWeight: 800, color: '#fff', letterSpacing: '0.06em', fontStyle: 'italic' }}>{b.name}</div>
        <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Menu</div>
      </div>
      <div style={{ flex: 1, padding: '8px 12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
          <div style={{ fontSize: '4px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.22em', textTransform: 'uppercase', fontFamily: 'monospace' }}>Tonight's Experience</div>
          <div style={{ height: '0.5px', background: `linear-gradient(to right, transparent, ${b.accent}, transparent)`, margin: '6px 0' }} />
        </div>
        <div style={{ padding: '8px', background: `${b.accent}18`, border: `1px solid ${b.accent}44`, borderRadius: '5px', marginBottom: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '2px' }}>Chef's Selection</div>
              <div style={{ fontSize: '9px', fontWeight: 800, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.1 }}>{b.services[0]}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '4px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em' }}>per person</div>
              <div style={{ fontSize: '10px', fontWeight: 900, color: b.accent }}>$185</div>
            </div>
          </div>
          <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.4)', marginTop: '4px', lineHeight: 1.5 }}>7-course progressive journey · seasonal ingredients</div>
        </div>
        {b.services.slice(1).map((s, i) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
            <div>
              <div style={{ fontSize: '6px', fontWeight: 600, color: '#fff' }}>{s}</div>
              <div style={{ fontSize: '4px', color: 'rgba(255,255,255,0.35)', marginTop: '1px' }}>{details[i + 1]}</div>
            </div>
            <span style={{ fontSize: '7px', color: b.accent }}>›</span>
          </div>
        ))}
        <div style={{ marginTop: 'auto', padding: '7px', background: b.accent, borderRadius: '3px', textAlign: 'center', fontSize: '6.5px', fontWeight: 700, color: '#000', letterSpacing: '0.08em' }}>Reserve a Table →</div>
      </div>
    </div>
  );
}

// HOME SERVICES — emergency vs scheduled split layout
function PlumbServices({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar light />
      <div style={{ padding: '7px 12px 5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.07)', background: '#fff' }}>
        <div style={{ fontSize: '7.5px', fontWeight: 800, color: '#0f0f0f', letterSpacing: '0.04em' }}>{b.name.toUpperCase()}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22c55e' }} />
          <span style={{ fontSize: '4px', color: '#22c55e', fontWeight: 600 }}>Available 24/7</span>
        </div>
      </div>
      <div style={{ flex: 1, padding: '8px 12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#fff' }}>
        <div style={{ padding: '3px 7px', background: '#dc2626', borderRadius: '3px', display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '6px', width: 'fit-content' }}>
          <span style={{ fontSize: '7px' }}>⚡</span>
          <span style={{ fontSize: '4.5px', fontWeight: 700, color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Emergency Services</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px', marginBottom: '8px' }}>
          {[['🚿','Emergency Leak'],['🪠','Drain Clog']].map(([icon, label]) => (
            <div key={label} style={{ padding: '8px 7px', background: '#fef2f2', borderRadius: '5px', border: '1px solid #fecaca', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ fontSize: '10px' }}>{icon}</span>
              <span style={{ fontSize: '5px', fontWeight: 700, color: '#0f0f0f', lineHeight: 1.3 }}>{label}</span>
            </div>
          ))}
        </div>
        <div style={{ padding: '3px 7px', background: b.accent, borderRadius: '3px', display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '6px', width: 'fit-content' }}>
          <span style={{ fontSize: '4.5px', fontWeight: 700, color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Scheduled Services</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px', marginBottom: 'auto' }}>
          {[['🔧','Pipe Repair'],['🛁','Water Heater']].map(([icon, label]) => (
            <div key={label} style={{ padding: '8px 7px', background: '#f0f9ff', borderRadius: '5px', border: `1px solid ${b.accent}44`, display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ fontSize: '10px' }}>{icon}</span>
              <span style={{ fontSize: '5px', fontWeight: 700, color: '#0f0f0f', lineHeight: 1.3 }}>{label}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '8px' }}>
          <div style={{ padding: '8px', background: b.accent, borderRadius: '4px', textAlign: 'center', fontSize: '6.5px', fontWeight: 700, color: '#fff', letterSpacing: '0.06em', marginBottom: '4px' }}>Call Now — Free Estimate →</div>
          <div style={{ textAlign: 'center', fontSize: '8px', fontWeight: 900, color: '#0f0f0f' }}>{b.phone}</div>
        </div>
      </div>
    </div>
  );
}

// COSMETIC DENTISTRY — treatment packages with pricing
function DentalServices({ b }: { b: Biz }) {
  const prices = ['From $299','From $199','From $1,800','From $3,500'];
  const icons = ['✨','🦷','💎','😁'];
  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar light />
      <div style={{ padding: '7px 12px 5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <div style={{ fontSize: '7px', fontWeight: 800, color: '#0f0f0f', letterSpacing: '0.04em' }}>{b.name.toUpperCase()}</div>
        <div style={{ padding: '2.5px 7px', background: b.accent, borderRadius: '20px', fontSize: '4px', fontWeight: 700, color: '#fff' }}>Free Consult</div>
      </div>
      <div style={{ flex: 1, padding: '8px 12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
          <div style={{ width: '12px', height: '1.5px', background: b.accent }} />
          <span style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'monospace' }}>Treatments</span>
        </div>
        <div style={{ fontSize: '13px', fontWeight: 900, color: '#0f0f0f', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '8px' }}>Smile<br />Transformations</div>
        {b.services.map((s, i) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 9px', background: i === 0 ? `${b.accent}12` : '#f9fafb', borderRadius: '6px', marginBottom: '5px', border: i === 0 ? `1px solid ${b.accent}44` : '1px solid rgba(0,0,0,0.06)' }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: i === 0 ? b.accent : '#e5f7f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', flexShrink: 0 }}>{icons[i]}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '6px', fontWeight: 700, color: '#0f0f0f' }}>{s}</div>
              <div style={{ fontSize: '4.5px', color: b.accent, marginTop: '1px', fontWeight: 600 }}>{prices[i]}</div>
            </div>
            <span style={{ fontSize: '7px', color: b.accent }}>›</span>
          </div>
        ))}
        <div style={{ marginTop: 'auto', padding: '7px', background: b.accent, borderRadius: '4px', textAlign: 'center', fontSize: '6px', fontWeight: 700, color: '#fff', letterSpacing: '0.06em' }}>Book Free Consultation →</div>
      </div>
    </div>
  );
}

function ServicesScreen({ b }: { b: Biz }) {
  if (b.id === 'glass')   return <GlassServices   b={b} />;
  if (b.id === 'barber')  return <BarberServices  b={b} />;
  if (b.id === 'land')    return <LandServices    b={b} />;
  if (b.id === 'salon')   return <SalonServices   b={b} />;
  if (b.id === 'fitness') return <FitnessServices b={b} />;
  if (b.id === 'resto')   return <RestoServices   b={b} />;
  if (b.id === 'plumb')   return <PlumbServices   b={b} />;
  if (b.id === 'dental')  return <DentalServices  b={b} />;
  return null;
}

// ══ ABOUT SCREENS — unique layout per business ════════════════════════════════

// AUTO GLASS — milestone timeline
function GlassAbout({ b }: { b: Biz }) {
  const milestones: [string,string][] = [['2009','Founded in Detroit'],['2015','Fleet & Commercial'],['2020','ADAS Certified'],['2024','10K+ Installs']];
  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar light />
      <div style={{ padding: '7px 12px 5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <div style={{ fontSize: '8px', fontWeight: 800, color: '#0f0f0f', letterSpacing: '0.04em' }}>{b.name.toUpperCase()}</div>
        <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Our Story</div>
      </div>
      <div style={{ flex: 1, padding: '10px 12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
          <div style={{ width: '12px', height: '1.5px', background: b.accent }} />
          <span style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'monospace' }}>Est. 2009</span>
        </div>
        <div style={{ fontSize: '14px', fontWeight: 900, color: '#0f0f0f', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '12px' }}>Detroit's Most<br />Trusted Glass</div>
        <div style={{ position: 'relative', paddingLeft: '16px' }}>
          <div style={{ position: 'absolute', left: '5px', top: '4px', bottom: '4px', width: '1.5px', background: `linear-gradient(to bottom, ${b.accent}, ${b.accent}33)` }} />
          {milestones.map(([year, label], i) => (
            <div key={year} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: i < 3 ? '10px' : 0, position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-13px', top: '2px', width: '7px', height: '7px', borderRadius: '50%', background: i === 0 ? b.accent : '#fff', border: `1.5px solid ${b.accent}` }} />
              <div>
                <div style={{ fontSize: '4.5px', color: b.accent, fontWeight: 700, letterSpacing: '0.06em', fontFamily: 'monospace' }}>{year}</div>
                <div style={{ fontSize: '6.5px', fontWeight: 600, color: '#0f0f0f', marginTop: '1px' }}>{label}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '5px', marginBottom: '8px' }}>
            {[['15+','Years'],['10K+','Installs'],['5★','Rating']].map(([v, l]) => (
              <div key={l} style={{ textAlign: 'center', padding: '6px 0', background: '#f9fafb', borderRadius: '5px', border: '1px solid rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: '9px', fontWeight: 900, color: b.accent, lineHeight: 1 }}>{v}</div>
                <div style={{ fontSize: '4px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '1.5px' }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: '7px', background: b.accent, borderRadius: '4px', textAlign: 'center', fontSize: '6px', fontWeight: 700, color: '#fff', letterSpacing: '0.06em' }}>Schedule Today →</div>
        </div>
      </div>
    </div>
  );
}

// BARBERSHOP — master barber profile + team
function BarberAbout({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <div style={{ height: '155px', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
        <img src={b.aboutPhoto} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, transparent 30%, ${b.bg} 100%)` }} />
        <div style={{ position: 'absolute', top: '8px', left: '12px', fontSize: '8px', fontWeight: 800, color: '#fff', letterSpacing: '0.04em' }}>{b.name.toUpperCase()}</div>
      </div>
      <div style={{ flex: 1, padding: '0 12px 10px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '8px' }}>
          <div style={{ fontSize: '12px', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1 }}>Marcus Webb</div>
          <div style={{ fontSize: '5px', color: b.accent, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'monospace', marginTop: '2px' }}>Master Barber · 12 Years</div>
        </div>
        <div style={{ fontSize: '6px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '8px', paddingLeft: '6px', borderLeft: `2px solid ${b.accent}` }}>
          {b.philosophy}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
          {['Precision Fades','Classic Cuts','Hot Shave','Beard Art'].map(tag => (
            <div key={tag} style={{ padding: '3px 7px', background: 'rgba(255,255,255,0.07)', borderRadius: '20px', fontSize: '4.5px', color: 'rgba(255,255,255,0.65)', border: '1px solid rgba(255,255,255,0.1)' }}>{tag}</div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '5px', marginBottom: '8px' }}>
          {[['3','Barbers'],['12+','Years'],['4.9★','Rated']].map(([v, l]) => (
            <div key={l} style={{ textAlign: 'center', padding: '5px 0', background: 'rgba(255,255,255,0.04)', borderRadius: '4px', border: 'rgba(255,255,255,0.06) 1px solid' }}>
              <div style={{ fontSize: '8px', fontWeight: 900, color: b.accent, lineHeight: 1 }}>{v}</div>
              <div style={{ fontSize: '4px', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '1.5px' }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: '7px', background: b.accent, borderRadius: '3px', textAlign: 'center', fontSize: '6.5px', fontWeight: 700, color: '#000', letterSpacing: '0.1em' }}>BOOK WITH MARCUS →</div>
      </div>
    </div>
  );
}

// LANDSCAPING — recent project portfolio grid
function LandAbout({ b }: { b: Biz }) {
  const projects = [['landproj1','Bloomfield Estate'],['landproj2','Grosse Pointe Garden'],['landproj3','Troy Corporate'],['landproj4','Royal Oak Patio']];
  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar light />
      <div style={{ padding: '7px 12px 5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <div style={{ fontSize: '8px', fontWeight: 800, color: '#0f0f0f', letterSpacing: '0.04em' }}>{b.name.toUpperCase()}</div>
        <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Our Work</div>
      </div>
      <div style={{ flex: 1, padding: '8px 12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '3px' }}>Recent Projects</div>
        <div style={{ fontSize: '13px', fontWeight: 900, color: '#0f0f0f', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '8px' }}>15 Years of<br />Crafted Environments</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px', flex: 1, overflow: 'hidden' }}>
          {projects.map(([seed, label]) => (
            <div key={seed} style={{ position: 'relative', borderRadius: '6px', overflow: 'hidden', minHeight: '55px' }}>
              <img src={`https://picsum.photos/seed/${seed}/110/80`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%)' }} />
              <div style={{ position: 'absolute', bottom: '4px', left: '5px', right: '5px', fontSize: '4.5px', fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '7px', display: 'flex', gap: '5px' }}>
          {[['150+','Projects'],['15','Years'],['A+','BBB']].map(([v, l]) => (
            <div key={l} style={{ flex: 1, textAlign: 'center', padding: '5px 0', background: '#f9fafb', borderRadius: '4px', border: '1px solid rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: '8px', fontWeight: 900, color: b.accent, lineHeight: 1 }}>{v}</div>
              <div style={{ fontSize: '3.5px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '1px' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// LUXURY SALON — stylist team cards
function SalonAbout({ b }: { b: Biz }) {
  const stylists: [string,string,string][] = [['A','Adria','Color Specialist'],['M','Mia','Extensions'],['K','Kezia','Blowouts']];
  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <div style={{ padding: '7px 12px 5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ fontSize: '8px', fontWeight: 800, color: '#fff', letterSpacing: '0.04em' }}>{b.name.toUpperCase()}</div>
        <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.12em', textTransform: 'uppercase' }}>The Team</div>
      </div>
      <div style={{ flex: 1, padding: '8px 12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '3px' }}>Meet Your Stylists</div>
        <div style={{ fontSize: '13px', fontWeight: 900, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '8px' }}>Style is<br />Personal</div>
        <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
          {stylists.map(([initial, name, specialty], i) => (
            <div key={name} style={{ flex: 1, background: i === 0 ? `${b.accent}22` : 'rgba(255,255,255,0.04)', border: `1px solid ${i === 0 ? b.accent + '55' : 'rgba(255,255,255,0.08)'}`, borderRadius: '7px', padding: '8px 5px', textAlign: 'center' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: b.accent, margin: '0 auto 4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 800, color: '#000' }}>{initial}</div>
              <div style={{ fontSize: '5.5px', fontWeight: 700, color: '#fff', marginBottom: '1.5px' }}>{name}</div>
              <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.4 }}>{specialty}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: '8px', background: 'rgba(255,255,255,0.04)', borderRadius: '5px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '8px' }}>
          <div style={{ fontSize: '6px', color: 'rgba(255,255,255,0.5)', fontStyle: 'italic', lineHeight: 1.6, textAlign: 'center' }}>{b.philosophy}</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '5px', marginBottom: '7px' }}>
          {[['3','Stylists'],['8+','Years'],['4.9★','Reviews']].map(([v, l]) => (
            <div key={l} style={{ textAlign: 'center', padding: '5px 0', background: 'rgba(255,255,255,0.04)', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ fontSize: '8px', fontWeight: 900, color: b.accent, lineHeight: 1 }}>{v}</div>
              <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '1.5px' }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: '7px', background: b.accent, borderRadius: '3px', textAlign: 'center', fontSize: '6px', fontWeight: 700, color: '#000', letterSpacing: '0.08em' }}>Reserve with Your Stylist →</div>
      </div>
    </div>
  );
}

// FITNESS STUDIO — certified trainer profiles
function FitnessAbout({ b }: { b: Biz }) {
  const trainers: [string,string,string,string][] = [['J','Jordan','Strength & HIIT','NSCA-CPT'],['T','Tyler','Performance','NASM-CPT'],['A','Aisha','Nutrition','RD + CPT']];
  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <div style={{ padding: '7px 12px 5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ fontSize: '8px', fontWeight: 800, color: '#fff', letterSpacing: '0.04em' }}>{b.name.toUpperCase()}</div>
        <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Our Team</div>
      </div>
      <div style={{ flex: 1, padding: '8px 12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '3px' }}>Elite Coaching Staff</div>
        <div style={{ fontSize: '13px', fontWeight: 900, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '8px' }}>Train With<br />the Best</div>
        <div style={{ display: 'flex', gap: '5px', marginBottom: '8px' }}>
          {trainers.map(([initial, name, specialty, cert], i) => (
            <div key={name} style={{ flex: 1, background: i === 0 ? `${b.accent}18` : 'rgba(255,255,255,0.04)', border: `1px solid ${i === 0 ? b.accent + '55' : 'rgba(255,255,255,0.07)'}`, borderRadius: '6px', padding: '7px 4px', textAlign: 'center' }}>
              <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: i === 0 ? b.accent : 'rgba(255,255,255,0.12)', margin: '0 auto 3px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 800, color: '#fff' }}>{initial}</div>
              <div style={{ fontSize: '5.5px', fontWeight: 700, color: '#fff', marginBottom: '1.5px' }}>{name}</div>
              <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.4, marginBottom: '3px' }}>{specialty}</div>
              <div style={{ padding: '1.5px 4px', background: i === 0 ? `${b.accent}33` : 'rgba(255,255,255,0.08)', borderRadius: '2px', fontSize: '3px', fontWeight: 700, color: i === 0 ? b.accent : 'rgba(255,255,255,0.4)', letterSpacing: '0.04em' }}>{cert}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '5px', marginBottom: '8px' }}>
          {[['240+','Members'],['6','Trainers'],['4.9★','Rating']].map(([v, l]) => (
            <div key={l} style={{ textAlign: 'center', padding: '6px 0', background: 'rgba(255,255,255,0.04)', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '9px', fontWeight: 900, color: b.accent, lineHeight: 1 }}>{v}</div>
              <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '1.5px' }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: '7px', background: b.accent, borderRadius: '4px', textAlign: 'center', fontSize: '6.5px', fontWeight: 700, color: '#fff', letterSpacing: '0.08em' }}>Meet the Full Team →</div>
      </div>
    </div>
  );
}

// FINE DINING — chef profile + accolades editorial
function RestoAbout({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <div style={{ height: '148px', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
        <img src={b.aboutPhoto} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, transparent 30%, ${b.bg} 95%)` }} />
        <div style={{ position: 'absolute', top: '8px', left: '12px', fontSize: '10px', fontWeight: 800, color: '#fff', letterSpacing: '0.06em', fontStyle: 'italic' }}>{b.name}</div>
      </div>
      <div style={{ flex: 1, padding: '0 12px 8px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '7px' }}>
          <div style={{ fontSize: '11px', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1 }}>Chef Daniel Reyes</div>
          <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'monospace', marginTop: '2px' }}>Executive Chef · Est. 2019</div>
        </div>
        <div style={{ fontSize: '6px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, fontStyle: 'italic', marginBottom: '7px', paddingLeft: '7px', borderLeft: `2px solid ${b.accent}` }}>
          {b.philosophy}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '8px' }}>
          {['James Beard Semifinalist 2023','Food & Wine Best New Chef','Michelin-Recommended'].map(award => (
            <div key={award} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 8px', background: `${b.accent}15`, borderRadius: '4px', border: `1px solid ${b.accent}33` }}>
              <span style={{ fontSize: '7px', color: b.accent }}>★</span>
              <span style={{ fontSize: '5px', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>{award}</span>
            </div>
          ))}
        </div>
        <div style={{ padding: '7px', background: b.accent, borderRadius: '3px', textAlign: 'center', fontSize: '6.5px', fontWeight: 700, color: '#000', letterSpacing: '0.08em' }}>Reserve a Table →</div>
      </div>
    </div>
  );
}

// HOME SERVICES — license badges + trust credentials
function PlumbAbout({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar light />
      <div style={{ padding: '7px 12px 5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <div style={{ fontSize: '7.5px', fontWeight: 800, color: '#0f0f0f', letterSpacing: '0.04em' }}>{b.name.toUpperCase()}</div>
        <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Why Us</div>
      </div>
      <div style={{ flex: 1, padding: '8px 12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '3px' }}>Fully Certified</div>
        <div style={{ fontSize: '13px', fontWeight: 900, color: '#0f0f0f', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '8px' }}>Licensed,<br />Bonded & Trusted</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '8px' }}>
          {[['🏅','Licensed Master Plumber','#LMP-4821-MI'],['🛡','BBB Accredited Business','A+ Rating'],['♻️','EPA Section 608 Certified','Refrigerant Handler'],['🔒','Fully Bonded & Insured','$2M Coverage']].map(([icon, title, sub]) => (
            <div key={title} style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '6px 8px', background: '#f9fafb', borderRadius: '5px', border: '1px solid rgba(0,0,0,0.06)' }}>
              <span style={{ fontSize: '11px', flexShrink: 0 }}>{icon}</span>
              <div>
                <div style={{ fontSize: '5.5px', fontWeight: 700, color: '#0f0f0f' }}>{title}</div>
                <div style={{ fontSize: '4px', color: '#6b7280', marginTop: '1px' }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '5px', marginBottom: '7px' }}>
          {[['18+','Years'],['2,100+','Jobs'],['24/7','Service']].map(([v, l]) => (
            <div key={l} style={{ textAlign: 'center', padding: '5px 0', background: '#f0f9ff', borderRadius: '4px', border: `1px solid ${b.accent}33` }}>
              <div style={{ fontSize: '8px', fontWeight: 900, color: b.accent, lineHeight: 1 }}>{v}</div>
              <div style={{ fontSize: '3.5px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '1.5px' }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: '7px', background: b.accent, borderRadius: '4px', textAlign: 'center', fontSize: '6px', fontWeight: 700, color: '#fff', letterSpacing: '0.06em' }}>Get a Free Estimate →</div>
      </div>
    </div>
  );
}

// COSMETIC DENTISTRY — doctor profile + education credentials
function DentalAbout({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar light />
      <div style={{ padding: '7px 12px 5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <div style={{ fontSize: '7px', fontWeight: 800, color: '#0f0f0f', letterSpacing: '0.04em' }}>{b.name.toUpperCase()}</div>
        <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Our Team</div>
      </div>
      <div style={{ height: '115px', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
        <img src={b.aboutPhoto} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, #fff 95%)' }} />
      </div>
      <div style={{ flex: 1, padding: '0 12px 8px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '6px' }}>
          <div style={{ fontSize: '11px', fontWeight: 900, color: '#0f0f0f', letterSpacing: '-0.02em', lineHeight: 1.1 }}>Dr. Sarah Luminary</div>
          <div style={{ display: 'flex', gap: '4px', marginTop: '3px', flexWrap: 'wrap' }}>
            {['DDS','AACD Member','Invisalign Certified'].map(badge => (
              <div key={badge} style={{ padding: '2px 6px', background: `${b.accent}18`, borderRadius: '3px', fontSize: '3.5px', fontWeight: 700, color: b.accent, border: `1px solid ${b.accent}44` }}>{badge}</div>
            ))}
          </div>
        </div>
        <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '5px' }}>Education</div>
        {[['U of M School of Dentistry','D.D.S. 2007'],['NYU Aesthetic Residency','2008–2010'],['AACD Accredited','2013']].map(([inst, year]) => (
          <div key={inst} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
            <span style={{ fontSize: '5px', color: '#0f0f0f', fontWeight: 500 }}>{inst}</span>
            <span style={{ fontSize: '4px', color: '#6b7280' }}>{year}</span>
          </div>
        ))}
        <div style={{ marginTop: 'auto', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '5px', marginBottom: '7px' }}>
          {[['18+','Yrs Exp'],['1,200+','Smiles'],['Free','Consult']].map(([v, l]) => (
            <div key={l} style={{ textAlign: 'center', padding: '5px 0', background: '#f0fdf4', borderRadius: '4px', border: `1px solid ${b.accent}33` }}>
              <div style={{ fontSize: '8px', fontWeight: 900, color: b.accent, lineHeight: 1 }}>{v}</div>
              <div style={{ fontSize: '3.5px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '1.5px' }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: '7px', background: b.accent, borderRadius: '4px', textAlign: 'center', fontSize: '6px', fontWeight: 700, color: '#fff', letterSpacing: '0.06em' }}>Meet Dr. Luminary →</div>
      </div>
    </div>
  );
}

function AboutScreen({ b }: { b: Biz }) {
  if (b.id === 'glass')   return <GlassAbout   b={b} />;
  if (b.id === 'barber')  return <BarberAbout  b={b} />;
  if (b.id === 'land')    return <LandAbout    b={b} />;
  if (b.id === 'salon')   return <SalonAbout   b={b} />;
  if (b.id === 'fitness') return <FitnessAbout b={b} />;
  if (b.id === 'resto')   return <RestoAbout   b={b} />;
  if (b.id === 'plumb')   return <PlumbAbout   b={b} />;
  if (b.id === 'dental')  return <DentalAbout  b={b} />;
  return null;
}

// ══ CONTACT SCREENS — unique per business ════════════════════════════════════

// AUTO GLASS — vehicle type + service quote form
function GlassContact({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar light />
      <div style={{ padding: '7px 12px 5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <div style={{ fontSize: '8px', fontWeight: 800, color: '#0f0f0f', letterSpacing: '0.04em' }}>{b.name.toUpperCase()}</div>
        <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Get a Quote</div>
      </div>
      <div style={{ flex: 1, padding: '8px 12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '13px', fontWeight: 900, color: '#0f0f0f', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '8px' }}>Get Your<br />Free Quote</div>
        <div style={{ fontSize: '4.5px', color: '#6b7280', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>Vehicle Type</div>
        <div style={{ display: 'flex', gap: '4px', marginBottom: '7px' }}>
          {[['🚗','Sedan'],['🚙','SUV'],['🛻','Truck']].map(([icon, type], i) => (
            <div key={type} style={{ flex: 1, padding: '5px 3px', background: i === 0 ? `${b.accent}15` : '#f9fafb', border: i === 0 ? `1.5px solid ${b.accent}` : '1px solid rgba(0,0,0,0.08)', borderRadius: '5px', textAlign: 'center' }}>
              <div style={{ fontSize: '10px', marginBottom: '1.5px' }}>{icon}</div>
              <div style={{ fontSize: '4.5px', fontWeight: i === 0 ? 700 : 400, color: i === 0 ? b.accent : '#6b7280' }}>{type}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: '4.5px', color: '#6b7280', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>Service Needed</div>
        {['Windshield Replacement','Chip & Crack Repair','Side Window Glass'].map((svc, i) => (
          <div key={svc} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 8px', background: i === 0 ? `${b.accent}12` : '#f9fafb', borderRadius: '4px', marginBottom: '4px', border: i === 0 ? `1px solid ${b.accent}44` : '1px solid rgba(0,0,0,0.06)' }}>
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', border: `1.5px solid ${i === 0 ? b.accent : '#d1d5db'}`, background: i === 0 ? b.accent : 'transparent', flexShrink: 0 }} />
            <span style={{ fontSize: '5.5px', color: i === 0 ? '#0f0f0f' : '#6b7280', fontWeight: i === 0 ? 600 : 400 }}>{svc}</span>
          </div>
        ))}
        <div style={{ marginTop: '5px', marginBottom: '5px' }}>
          <div style={{ fontSize: '4.5px', color: '#6b7280', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '3px' }}>Your Phone</div>
          <div style={{ padding: '5px 8px', background: '#f9fafb', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '4px', fontSize: '6px', color: '#9ca3af' }}>(313) 555-____</div>
        </div>
        <div style={{ marginTop: 'auto', padding: '7px', background: b.accent, borderRadius: '4px', textAlign: 'center', fontSize: '6.5px', fontWeight: 700, color: '#fff', letterSpacing: '0.06em' }}>Get My Free Quote →</div>
      </div>
    </div>
  );
}

// BARBERSHOP — barber + service + time-slot booking widget
function BarberContact({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <div style={{ padding: '7px 12px 5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ fontSize: '8px', fontWeight: 800, color: '#fff', letterSpacing: '0.04em' }}>{b.name.toUpperCase()}</div>
        <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Book a Chair</div>
      </div>
      <div style={{ flex: 1, padding: '8px 12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '13px', fontWeight: 900, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '8px' }}>Book Your<br />Appointment</div>
        <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>Choose Your Barber</div>
        <div style={{ display: 'flex', gap: '5px', marginBottom: '8px' }}>
          {[['M','Marcus'],['D','DeShawn'],['R','Rico']].map(([initial, name], i) => (
            <div key={name} style={{ flex: 1, padding: '6px 4px', background: i === 0 ? `${b.accent}22` : 'rgba(255,255,255,0.05)', borderRadius: '6px', textAlign: 'center', border: i === 0 ? `1.5px solid ${b.accent}` : '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: i === 0 ? b.accent : 'rgba(255,255,255,0.12)', margin: '0 auto 3px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '7px', fontWeight: 800, color: i === 0 ? '#000' : 'rgba(255,255,255,0.6)' }}>{initial}</div>
              <div style={{ fontSize: '5px', fontWeight: i === 0 ? 700 : 400, color: i === 0 ? '#fff' : 'rgba(255,255,255,0.45)' }}>{name}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>Service</div>
        <div style={{ display: 'flex', gap: '4px', marginBottom: '8px', flexWrap: 'wrap' }}>
          {b.services.map((s, i) => (
            <div key={s} style={{ padding: '3px 7px', background: i === 0 ? b.accent : 'rgba(255,255,255,0.07)', borderRadius: '20px', fontSize: '4.5px', fontWeight: i === 0 ? 700 : 400, color: i === 0 ? '#000' : 'rgba(255,255,255,0.55)', border: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.1)' }}>{s}</div>
          ))}
        </div>
        <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>Available Today</div>
        <div style={{ display: 'flex', gap: '4px', marginBottom: 'auto' }}>
          {['11:00','1:30','2:30','4:00'].map((t, i) => (
            <div key={t} style={{ flex: 1, padding: '5px 2px', background: i === 2 ? b.accent : 'rgba(255,255,255,0.06)', borderRadius: '4px', textAlign: 'center', fontSize: '5.5px', fontWeight: 700, color: i === 2 ? '#000' : 'rgba(255,255,255,0.65)', border: i === 2 ? 'none' : '1px solid rgba(255,255,255,0.1)' }}>{t}</div>
          ))}
        </div>
        <div style={{ marginTop: '8px', padding: '7px', background: b.accent, borderRadius: '3px', textAlign: 'center', fontSize: '6.5px', fontWeight: 700, color: '#000', letterSpacing: '0.1em' }}>CONFIRM BOOKING →</div>
      </div>
    </div>
  );
}

// LANDSCAPING — project type + budget consultation form
function LandContact({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar light />
      <div style={{ padding: '7px 12px 5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <div style={{ fontSize: '8px', fontWeight: 800, color: '#0f0f0f', letterSpacing: '0.04em' }}>{b.name.toUpperCase()}</div>
        <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Consultation</div>
      </div>
      <div style={{ flex: 1, padding: '8px 12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '13px', fontWeight: 900, color: '#0f0f0f', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '7px' }}>Start Your<br />Project</div>
        <div style={{ fontSize: '4.5px', color: '#6b7280', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>Project Type</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', marginBottom: '7px' }}>
          {[['🌿','Landscape Design'],['🌱','Lawn Care'],['🪨','Hardscaping'],['🍂','Seasonal']].map(([icon, label], i) => (
            <div key={label} style={{ padding: '6px 8px', background: i === 0 ? `${b.accent}15` : '#f9fafb', border: i === 0 ? `1.5px solid ${b.accent}` : '1px solid rgba(0,0,0,0.07)', borderRadius: '5px', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ fontSize: '10px' }}>{icon}</span>
              <span style={{ fontSize: '4.5px', fontWeight: i === 0 ? 700 : 400, color: i === 0 ? b.accent : '#6b7280', lineHeight: 1.3 }}>{label}</span>
            </div>
          ))}
        </div>
        <div style={{ fontSize: '4.5px', color: '#6b7280', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '3px' }}>Budget Range</div>
        <div style={{ display: 'flex', gap: '3px', marginBottom: '7px' }}>
          {['< $2K','$2–5K','$5–10K','$10K+'].map((range, i) => (
            <div key={range} style={{ flex: 1, padding: '3.5px 2px', background: i === 1 ? `${b.accent}18` : '#f9fafb', border: i === 1 ? `1px solid ${b.accent}` : '1px solid rgba(0,0,0,0.07)', borderRadius: '3px', textAlign: 'center', fontSize: '4px', fontWeight: i === 1 ? 700 : 400, color: i === 1 ? b.accent : '#6b7280' }}>{range}</div>
          ))}
        </div>
        {['Your Name','Phone Number'].map((label, i) => (
          <div key={label} style={{ marginBottom: '5px' }}>
            <div style={{ fontSize: '4.5px', color: '#6b7280', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2.5px' }}>{label}</div>
            <div style={{ padding: '5px 8px', background: '#f9fafb', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '4px', fontSize: '6px', color: '#d1d5db' }}>{i === 0 ? 'John Smith' : '(248) 555-____'}</div>
          </div>
        ))}
        <div style={{ marginTop: 'auto', padding: '7px', background: b.accent, borderRadius: '4px', textAlign: 'center', fontSize: '6px', fontWeight: 700, color: '#fff', letterSpacing: '0.06em' }}>Request Free Consultation →</div>
      </div>
    </div>
  );
}

// LUXURY SALON — stylist selector + service booking
function SalonContact({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <div style={{ padding: '7px 12px 5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ fontSize: '8px', fontWeight: 800, color: '#fff', letterSpacing: '0.04em' }}>{b.name.toUpperCase()}</div>
        <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Reserve</div>
      </div>
      <div style={{ flex: 1, padding: '8px 12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '12px', fontWeight: 900, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '8px' }}>Reserve<br />Your Session</div>
        <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>Choose a Stylist</div>
        <div style={{ display: 'flex', gap: '4px', marginBottom: '7px' }}>
          {[['A','Adria'],['M','Mia'],['K','Kezia']].map(([initial, name], i) => (
            <div key={name} style={{ flex: 1, padding: '5px 3px', background: i === 0 ? `${b.accent}22` : 'rgba(255,255,255,0.04)', borderRadius: '5px', textAlign: 'center', border: i === 0 ? `1.5px solid ${b.accent}` : '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: i === 0 ? b.accent : 'rgba(255,255,255,0.1)', margin: '0 auto 2.5px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '7px', fontWeight: 700, color: i === 0 ? '#000' : 'rgba(255,255,255,0.5)' }}>{initial}</div>
              <div style={{ fontSize: '4.5px', fontWeight: i === 0 ? 700 : 400, color: i === 0 ? '#fff' : 'rgba(255,255,255,0.4)' }}>{name}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>Service Interest</div>
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '7px' }}>
          {b.services.map((s, i) => (
            <div key={s} style={{ padding: '3px 7px', background: i === 0 ? b.accent : 'rgba(255,255,255,0.06)', borderRadius: '20px', fontSize: '4.5px', fontWeight: i === 0 ? 700 : 400, color: i === 0 ? '#000' : 'rgba(255,255,255,0.5)', border: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.1)' }}>{s}</div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px', marginBottom: '5px' }}>
          {['Preferred Date','Your Name'].map(label => (
            <div key={label}>
              <div style={{ fontSize: '4px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2.5px' }}>{label}</div>
              <div style={{ padding: '5px 7px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px', fontSize: '5.5px', color: 'rgba(255,255,255,0.25)' }}>{label === 'Preferred Date' ? 'Apr 15, 2026' : 'Jane Smith'}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 'auto', padding: '7px', background: b.accent, borderRadius: '3px', textAlign: 'center', fontSize: '6px', fontWeight: 700, color: '#000', letterSpacing: '0.08em' }}>Book Appointment →</div>
      </div>
    </div>
  );
}

// FITNESS STUDIO — goal selector + free trial signup
function FitnessContact({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <div style={{ padding: '7px 12px 5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ fontSize: '8px', fontWeight: 800, color: '#fff', letterSpacing: '0.04em' }}>{b.name.toUpperCase()}</div>
        <div style={{ padding: '2.5px 7px', background: b.accent, borderRadius: '20px', fontSize: '4px', fontWeight: 700, color: '#fff' }}>FREE TRIAL</div>
      </div>
      <div style={{ flex: 1, padding: '8px 12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '13px', fontWeight: 900, color: '#fff', lineHeight: 1.0, letterSpacing: '-0.02em', marginBottom: '3px' }}>Claim Your</div>
        <div style={{ fontSize: '18px', fontWeight: 900, color: b.accent, lineHeight: 1.0, letterSpacing: '-0.03em', marginBottom: '8px' }}>Free Week</div>
        <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>Your Goal</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', marginBottom: '8px' }}>
          {[['🔥','Lose Weight'],['💪','Build Muscle'],['⚡','Athletic'],['🧘','Wellness']].map(([icon, goal], i) => (
            <div key={goal} style={{ padding: '6px 7px', background: i === 0 ? `${b.accent}22` : 'rgba(255,255,255,0.05)', border: i === 0 ? `1.5px solid ${b.accent}` : '1px solid rgba(255,255,255,0.08)', borderRadius: '5px', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ fontSize: '10px' }}>{icon}</span>
              <span style={{ fontSize: '5px', fontWeight: i === 0 ? 700 : 400, color: i === 0 ? '#fff' : 'rgba(255,255,255,0.5)' }}>{goal}</span>
            </div>
          ))}
        </div>
        {['First Name','Email Address'].map((label, i) => (
          <div key={label} style={{ marginBottom: '5px' }}>
            <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2.5px' }}>{label}</div>
            <div style={{ padding: '5px 8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px', fontSize: '6px', color: 'rgba(255,255,255,0.25)' }}>{i === 0 ? 'Alex' : 'alex@email.com'}</div>
          </div>
        ))}
        <div style={{ marginTop: 'auto' }}>
          <div style={{ padding: '8px', background: b.accent, borderRadius: '4px', textAlign: 'center', fontSize: '6.5px', fontWeight: 700, color: '#fff', letterSpacing: '0.08em', marginBottom: '4px' }}>Start Free Trial →</div>
          <div style={{ textAlign: 'center', fontSize: '4px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em' }}>No commitment required · Cancel anytime</div>
        </div>
      </div>
    </div>
  );
}

// FINE DINING — date / party size / time reservation widget
function RestoContact({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <div style={{ padding: '7px 12px 5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: 'rgba(255,255,255,0.06) 1px solid' }}>
        <div style={{ fontSize: '9px', fontWeight: 800, color: '#fff', letterSpacing: '0.06em', fontStyle: 'italic' }}>{b.name}</div>
        <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Reservations</div>
      </div>
      <div style={{ flex: 1, padding: '8px 12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '13px', fontWeight: 900, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '8px' }}>Reserve<br />Your Table</div>
        <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>Party Size</div>
        <div style={{ display: 'flex', gap: '4px', marginBottom: '7px' }}>
          {['1–2','3–4','5–6','7+'].map((size, i) => (
            <div key={size} style={{ flex: 1, padding: '6px 2px', background: i === 1 ? b.accent : 'rgba(255,255,255,0.06)', borderRadius: '4px', textAlign: 'center', fontSize: '6px', fontWeight: 700, color: i === 1 ? '#000' : 'rgba(255,255,255,0.6)', border: i === 1 ? 'none' : '1px solid rgba(255,255,255,0.1)' }}>{size}</div>
          ))}
        </div>
        <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>Date</div>
        <div style={{ display: 'flex', gap: '3px', marginBottom: '7px' }}>
          {['Fri Apr 11','Sat Apr 12','Sun Apr 13'].map((d, i) => (
            <div key={d} style={{ flex: 1, padding: '5px 3px', background: i === 1 ? `${b.accent}22` : 'rgba(255,255,255,0.05)', border: i === 1 ? `1px solid ${b.accent}66` : '1px solid rgba(255,255,255,0.08)', borderRadius: '4px', textAlign: 'center', fontSize: '4.5px', fontWeight: i === 1 ? 700 : 400, color: i === 1 ? b.accent : 'rgba(255,255,255,0.55)' }}>{d}</div>
          ))}
        </div>
        <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>Time</div>
        <div style={{ display: 'flex', gap: '4px', marginBottom: '7px' }}>
          {['5:30','7:00','7:30','9:00'].map((t, i) => (
            <div key={t} style={{ flex: 1, padding: '5px 2px', background: i === 2 ? b.accent : 'rgba(255,255,255,0.06)', borderRadius: '4px', textAlign: 'center', fontSize: '6px', fontWeight: 700, color: i === 2 ? '#000' : 'rgba(255,255,255,0.6)', border: i === 2 ? 'none' : '1px solid rgba(255,255,255,0.08)' }}>{t}</div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 8px', background: 'rgba(255,255,255,0.04)', borderRadius: '5px', marginBottom: 'auto', border: '1px solid rgba(255,255,255,0.08)' }}>
          <span style={{ fontSize: '5.5px', color: 'rgba(255,255,255,0.6)' }}>Special Occasion?</span>
          <div style={{ width: '22px', height: '12px', borderRadius: '6px', background: b.accent, display: 'flex', alignItems: 'center', padding: '0 2px', justifyContent: 'flex-end' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fff' }} />
          </div>
        </div>
        <div style={{ marginTop: '7px', padding: '7px', background: b.accent, borderRadius: '3px', textAlign: 'center', fontSize: '6.5px', fontWeight: 700, color: '#000', letterSpacing: '0.08em' }}>Complete Reservation →</div>
      </div>
    </div>
  );
}

// HOME SERVICES — emergency call CTA + schedule form
function PlumbContact({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar light />
      <div style={{ padding: '7px 12px 5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <div style={{ fontSize: '7.5px', fontWeight: 800, color: '#0f0f0f', letterSpacing: '0.04em' }}>{b.name.toUpperCase()}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22c55e' }} />
          <span style={{ fontSize: '4px', color: '#22c55e', fontWeight: 600 }}>24/7 Live</span>
        </div>
      </div>
      <div style={{ flex: 1, padding: '8px 12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#fff' }}>
        <div style={{ padding: '12px', background: 'linear-gradient(135deg, #1d4ed8, #1e3a8a)', borderRadius: '8px', marginBottom: '9px', boxShadow: '0 4px 16px rgba(29,78,216,0.3)' }}>
          <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.75)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '3px' }}>Emergency? Call Directly</div>
          <div style={{ fontSize: '14px', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: '3px' }}>{b.phone}</div>
          <div style={{ fontSize: '4px', color: 'rgba(255,255,255,0.6)' }}>Avg response: 47 min · Flat rate pricing</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <div style={{ flex: 1, height: '0.5px', background: 'rgba(0,0,0,0.1)' }} />
          <span style={{ fontSize: '4.5px', color: '#9ca3af', letterSpacing: '0.1em' }}>OR SCHEDULE</span>
          <div style={{ flex: 1, height: '0.5px', background: 'rgba(0,0,0,0.1)' }} />
        </div>
        <div style={{ fontSize: '4.5px', color: '#6b7280', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>How Soon?</div>
        <div style={{ display: 'flex', gap: '4px', marginBottom: '7px' }}>
          {['Today','This Week','Next Week'].map((t, i) => (
            <div key={t} style={{ flex: 1, padding: '5px 2px', background: i === 0 ? `${b.accent}15` : '#f9fafb', border: i === 0 ? `1.5px solid ${b.accent}` : '1px solid rgba(0,0,0,0.07)', borderRadius: '4px', textAlign: 'center', fontSize: '5px', fontWeight: i === 0 ? 700 : 400, color: i === 0 ? b.accent : '#6b7280' }}>{t}</div>
          ))}
        </div>
        {['Your Name','Phone Number'].map((label) => (
          <div key={label} style={{ marginBottom: '5px' }}>
            <div style={{ fontSize: '4.5px', color: '#6b7280', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2.5px' }}>{label}</div>
            <div style={{ padding: '5px 8px', background: '#f9fafb', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '4px', fontSize: '6px', color: '#d1d5db' }}>{label === 'Your Name' ? 'John Smith' : '(313) 555-____'}</div>
          </div>
        ))}
        <div style={{ marginTop: 'auto', padding: '7px', background: b.accent, borderRadius: '4px', textAlign: 'center', fontSize: '6px', fontWeight: 700, color: '#fff', letterSpacing: '0.06em' }}>Schedule Service →</div>
      </div>
    </div>
  );
}

// COSMETIC DENTISTRY — patient type + treatment interest form
function DentalContact({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar light />
      <div style={{ padding: '7px 12px 5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <div style={{ fontSize: '7px', fontWeight: 800, color: '#0f0f0f', letterSpacing: '0.04em' }}>{b.name.toUpperCase()}</div>
        <div style={{ padding: '2.5px 7px', background: b.accent, borderRadius: '20px', fontSize: '4px', fontWeight: 700, color: '#fff' }}>Free Consult</div>
      </div>
      <div style={{ flex: 1, padding: '8px 12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '12px', fontWeight: 900, color: '#0f0f0f', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '8px' }}>Request Your<br />Appointment</div>
        <div style={{ fontSize: '4.5px', color: '#6b7280', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>Patient Type</div>
        <div style={{ display: 'flex', gap: '4px', marginBottom: '7px' }}>
          {['New Patient','Existing Patient'].map((type, i) => (
            <div key={type} style={{ flex: 1, padding: '5px 6px', background: i === 0 ? `${b.accent}15` : '#f9fafb', border: i === 0 ? `1.5px solid ${b.accent}` : '1px solid rgba(0,0,0,0.07)', borderRadius: '4px', textAlign: 'center', fontSize: '4.5px', fontWeight: i === 0 ? 700 : 400, color: i === 0 ? b.accent : '#6b7280' }}>{type}</div>
          ))}
        </div>
        <div style={{ fontSize: '4.5px', color: '#6b7280', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>Treatment Interest</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', marginBottom: '7px' }}>
          {b.services.map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '5px 6px', background: i === 0 ? `${b.accent}12` : '#f9fafb', border: i === 0 ? `1px solid ${b.accent}44` : '1px solid rgba(0,0,0,0.06)', borderRadius: '4px' }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '2px', border: `1.5px solid ${i === 0 ? b.accent : '#d1d5db'}`, background: i === 0 ? b.accent : 'transparent', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {i === 0 && <div style={{ width: '3px', height: '3px', background: '#fff', borderRadius: '1px' }} />}
              </div>
              <span style={{ fontSize: '4.5px', color: i === 0 ? '#0f0f0f' : '#6b7280', fontWeight: i === 0 ? 600 : 400, lineHeight: 1.3 }}>{s}</span>
            </div>
          ))}
        </div>
        <div style={{ marginBottom: '5px' }}>
          <div style={{ fontSize: '4.5px', color: '#6b7280', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2.5px' }}>Phone Number</div>
          <div style={{ padding: '5px 8px', background: '#f9fafb', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '4px', fontSize: '6px', color: '#d1d5db' }}>(248) 555-____</div>
        </div>
        <div style={{ marginTop: 'auto', padding: '7px', background: b.accent, borderRadius: '4px', textAlign: 'center', fontSize: '6px', fontWeight: 700, color: '#fff', letterSpacing: '0.06em' }}>Book Free Consultation →</div>
      </div>
    </div>
  );
}

function ContactScreen({ b }: { b: Biz }) {
  if (b.id === 'glass')   return <GlassContact   b={b} />;
  if (b.id === 'barber')  return <BarberContact  b={b} />;
  if (b.id === 'land')    return <LandContact    b={b} />;
  if (b.id === 'salon')   return <SalonContact   b={b} />;
  if (b.id === 'fitness') return <FitnessContact b={b} />;
  if (b.id === 'resto')   return <RestoContact   b={b} />;
  if (b.id === 'plumb')   return <PlumbContact   b={b} />;
  if (b.id === 'dental')  return <DentalContact  b={b} />;
  return null;
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

const PHONE_W  = 216;
const PHONE_H  = 444;
const PHONE_SCALE = 1;
const LOOP_PX  = BIZ.length * (PHONE_W + 24); // 8 × 240px = 1920px

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
