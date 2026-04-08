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

// ══ SERVICES SCREENS — each looks like a real Services page ════════════════════

// AUTO GLASS — service list with icons + descriptions + prices
function GlassServices({ b }: { b: Biz }) {
  const descs = ['OEM-grade windshield install, lifetime warranty','Chip & star crack repair while you wait','Door, quarter & vent glass replaced fast','Camera & sensor recalibration post-install'];
  const prices = ['From $99','From $49','From $149','From $79'];
  const icons = ['🪟','⚡','🚗','📡'];
  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar light />
      <NavBar b={b} light />
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '10px 12px 8px' }}>
        <div style={{ marginBottom: '9px' }}>
          <div style={{ fontSize: '5px', color: b.accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '2px' }}>What We Do</div>
          <div style={{ fontSize: '15px', fontWeight: 900, color: '#0f0f0f', lineHeight: 1.0, letterSpacing: '-0.02em' }}>Our Services</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, overflow: 'hidden' }}>
          {b.services.map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '7px 9px', background: i === 0 ? `${b.accent}10` : '#f9fafb', borderRadius: '6px', border: i === 0 ? `1px solid ${b.accent}44` : '1px solid rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: '11px', flexShrink: 0, marginTop: '1px' }}>{icons[i]}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '6.5px', fontWeight: 700, color: '#0f0f0f', marginBottom: '1.5px' }}>{s}</div>
                <div style={{ fontSize: '4.5px', color: '#6b7280', lineHeight: 1.5 }}>{descs[i]}</div>
              </div>
              <div style={{ flexShrink: 0, fontSize: '6px', fontWeight: 800, color: b.accent }}>{prices[i]}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '8px', padding: '8px', background: b.accent, borderRadius: '5px', textAlign: 'center', fontSize: '6.5px', fontWeight: 700, color: '#fff', letterSpacing: '0.06em' }}>Get a Free Quote →</div>
      </div>
    </div>
  );
}

// BARBERSHOP — luxury price menu with descriptions
function BarberServices({ b }: { b: Biz }) {
  const descs = ['Classic taper & fade shaped with precision','Straight-razor shave with hot towel prep','Full beard trim, line-up & conditioning oil','Deep scalp cleanse & follicle treatment'];
  const prices = ['$45','$60','$35','$55'];
  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <NavBar b={b} />
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '10px 12px 8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <div style={{ flex: 1, height: '0.5px', background: `${b.accent}55` }} />
          <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'monospace' }}>Services & Pricing</div>
          <div style={{ flex: 1, height: '0.5px', background: `${b.accent}55` }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', flex: 1, overflow: 'hidden' }}>
          {b.services.map((s, i) => (
            <div key={s}>
              <div style={{ display: 'flex', alignItems: 'flex-start', padding: '8px 0', gap: '8px' }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: b.accent, flexShrink: 0, marginTop: '4px' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2px' }}>
                    <div style={{ fontSize: '7px', fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>{s}</div>
                    <div style={{ fontSize: '9px', fontWeight: 900, color: b.accent, flexShrink: 0, marginLeft: '6px' }}>{prices[i]}</div>
                  </div>
                  <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.5 }}>{descs[i]}</div>
                </div>
              </div>
              {i < b.services.length - 1 && <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.06)' }} />}
            </div>
          ))}
        </div>
        <div style={{ marginTop: '8px', padding: '8px', background: b.accent, borderRadius: '3px', textAlign: 'center', fontSize: '6.5px', fontWeight: 700, color: '#000', letterSpacing: '0.1em' }}>BOOK YOUR CUT →</div>
      </div>
    </div>
  );
}

// LANDSCAPING — 2-column service cards with descriptions
function LandServices({ b }: { b: Biz }) {
  const descs = ['Custom plans from concept to install','Weekly, bi-weekly or monthly programs','Patios, walls, fire pits & walkways','Spring/fall cleanups & winterizing'];
  const icons = ['🌿','🌱','🪨','🍂'];
  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar light />
      <NavBar b={b} light />
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '10px 12px 8px' }}>
        <div style={{ marginBottom: '9px' }}>
          <div style={{ fontSize: '5px', color: b.accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '2px' }}>What We Offer</div>
          <div style={{ fontSize: '15px', fontWeight: 900, color: '#0f0f0f', lineHeight: 1.0, letterSpacing: '-0.02em' }}>Our Services</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', flex: 1, overflow: 'hidden' }}>
          {b.services.map((s, i) => (
            <div key={s} style={{ padding: '9px 8px', background: i === 0 ? `${b.accent}15` : '#f9fafb', borderRadius: '7px', border: i === 0 ? `1.5px solid ${b.accent}55` : '1px solid rgba(0,0,0,0.07)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ fontSize: '14px' }}>{icons[i]}</div>
              <div style={{ fontSize: '6px', fontWeight: 700, color: '#0f0f0f', lineHeight: 1.25 }}>{s}</div>
              <div style={{ fontSize: '4px', color: '#6b7280', lineHeight: 1.5 }}>{descs[i]}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '8px', padding: '8px', background: b.accent, borderRadius: '5px', textAlign: 'center', fontSize: '6px', fontWeight: 700, color: '#fff', letterSpacing: '0.06em' }}>Request a Custom Quote →</div>
      </div>
    </div>
  );
}

// LUXURY SALON — editorial menu with prices
function SalonServices({ b }: { b: Biz }) {
  const descs = ['Balayage, highlights, full color & gloss finish','Brazilian, keratin or Olaplex treatments','Blowout, styling & waves by expert hands','Tape-in, sew-in & tape weft systems'];
  const prices = ['From $120','From $180','From $85','From $250'];
  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <NavBar b={b} />
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '8px 12px' }}>
        <div style={{ marginBottom: '8px' }}>
          <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '2px' }}>Book a Service</div>
          <div style={{ fontSize: '14px', fontWeight: 900, color: '#fff', lineHeight: 1.0, letterSpacing: '-0.02em' }}>Our Services</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: 1, overflow: 'hidden' }}>
          {b.services.map((s, i) => (
            <div key={s} style={{ padding: '8px 9px', background: i === 0 ? `${b.accent}20` : 'rgba(255,255,255,0.04)', borderRadius: '6px', border: `1px solid ${i === 0 ? b.accent + '55' : 'rgba(255,255,255,0.07)'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2px' }}>
                <div style={{ fontSize: '6.5px', fontWeight: 700, color: '#fff' }}>{s}</div>
                <div style={{ fontSize: '6.5px', fontWeight: 800, color: b.accent, flexShrink: 0, marginLeft: '6px' }}>{prices[i]}</div>
              </div>
              <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{descs[i]}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '7px', padding: '7px', background: b.accent, borderRadius: '3px', textAlign: 'center', fontSize: '6px', fontWeight: 700, color: '#000', letterSpacing: '0.08em' }}>Reserve a Session →</div>
      </div>
    </div>
  );
}

// FITNESS STUDIO — program tiles with duration + price
function FitnessServices({ b }: { b: Biz }) {
  const descs = ['1-on-1 coaching tailored to your goals','Speed, agility & sport-specific work','Meal plans, macros & accountability','Mobility, stretching & injury prevention'];
  const durations = ['60 min','45 min','50 min','30 min'];
  const prices = ['$79/mo','$89/mo','$49/mo','Included'];
  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <NavBar b={b} />
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '8px 12px' }}>
        <div style={{ marginBottom: '8px' }}>
          <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '2px' }}>What We Offer</div>
          <div style={{ fontSize: '14px', fontWeight: 900, color: '#fff', lineHeight: 1.0, letterSpacing: '-0.02em' }}>Our Programs</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: 1, overflow: 'hidden' }}>
          {b.services.map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 9px', background: i === 0 ? `${b.accent}18` : 'rgba(255,255,255,0.04)', borderRadius: '5px', border: `1px solid ${i === 0 ? b.accent + '55' : 'rgba(255,255,255,0.07)'}` }}>
              <div style={{ width: '3px', height: '28px', background: i === 0 ? b.accent : 'rgba(255,255,255,0.12)', borderRadius: '2px', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '6.5px', fontWeight: 700, color: '#fff', marginBottom: '1.5px' }}>{s}</div>
                <div style={{ fontSize: '4px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.5 }}>{descs[i]}</div>
                <div style={{ fontSize: '4px', color: 'rgba(255,255,255,0.22)', marginTop: '1px' }}>{durations[i]}</div>
              </div>
              <div style={{ fontSize: '6px', fontWeight: 800, color: i === 0 ? b.accent : 'rgba(255,255,255,0.3)', flexShrink: 0 }}>{prices[i]}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '7px', padding: '8px', background: b.accent, borderRadius: '4px', textAlign: 'center', fontSize: '6.5px', fontWeight: 700, color: '#fff', letterSpacing: '0.08em' }}>Start Free Trial →</div>
      </div>
    </div>
  );
}

// FINE DINING — elegant restaurant menu experience list
function RestoServices({ b }: { b: Biz }) {
  const descs = ['7-course progressive journey · $185/pp · seasonal','Chef selections nightly · à la carte dining','Exclusive dining for groups up to 40 guests','Curated wine pairings by our sommelier'];
  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <NavBar b={b} />
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '8px 12px' }}>
        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
          <div style={{ fontSize: '4px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.22em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '4px' }}>Dining Experiences</div>
          <div style={{ height: '0.5px', background: `linear-gradient(to right, transparent, ${b.accent}, transparent)`, marginBottom: '4px' }} />
          <div style={{ fontSize: '14px', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', fontStyle: 'italic' }}>Our Menu</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', flex: 1, overflow: 'hidden' }}>
          {b.services.map((s, i) => (
            <div key={s}>
              <div style={{ padding: '8px 0', display: 'flex', alignItems: 'flex-start', gap: '7px' }}>
                <div style={{ width: '4px', height: '4px', background: b.accent, borderRadius: '50%', flexShrink: 0, marginTop: '4px' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '7px', fontWeight: 700, color: '#fff', marginBottom: '2px' }}>{s}</div>
                  <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.38)', lineHeight: 1.5 }}>{descs[i]}</div>
                </div>
              </div>
              {i < b.services.length - 1 && <div style={{ height: '0.5px', background: `linear-gradient(to right, ${b.accent}44, transparent)` }} />}
            </div>
          ))}
        </div>
        <div style={{ marginTop: '8px', padding: '7px', background: b.accent, borderRadius: '3px', textAlign: 'center', fontSize: '6.5px', fontWeight: 700, color: '#000', letterSpacing: '0.08em' }}>Reserve a Table →</div>
      </div>
    </div>
  );
}

// HOME SERVICES — service list with emergency flagging
function PlumbServices({ b }: { b: Biz }) {
  const descs = ['Water main breaks, burst pipes & flooding','Clogged drains, sewer lines & hydro-jetting','Tank & tankless installation and repair','Full bathroom & kitchen plumbing remodels'];
  const icons = ['🚨','🪠','🔥','🔧'];
  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar light />
      <NavBar b={b} light />
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '10px 12px 8px' }}>
        <div style={{ marginBottom: '9px' }}>
          <div style={{ fontSize: '5px', color: b.accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '2px' }}>Licensed & Bonded</div>
          <div style={{ fontSize: '15px', fontWeight: 900, color: '#0f0f0f', lineHeight: 1.0, letterSpacing: '-0.02em' }}>Our Services</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: 1, overflow: 'hidden' }}>
          {b.services.map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '7px 9px', background: i === 0 ? '#fef2f2' : '#f9fafb', borderRadius: '6px', border: i === 0 ? '1px solid #fecaca' : `1px solid ${b.accent}22` }}>
              <div style={{ fontSize: '12px', flexShrink: 0 }}>{icons[i]}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '6.5px', fontWeight: 700, color: '#0f0f0f', marginBottom: '1.5px' }}>{s}</div>
                <div style={{ fontSize: '4.5px', color: '#6b7280', lineHeight: 1.5 }}>{descs[i]}</div>
              </div>
              {i === 0 && <div style={{ padding: '2px 5px', background: '#dc2626', borderRadius: '3px', fontSize: '3.5px', fontWeight: 700, color: '#fff', flexShrink: 0, alignSelf: 'flex-start' }}>24/7</div>}
            </div>
          ))}
        </div>
        <div style={{ marginTop: '8px', padding: '8px', background: b.accent, borderRadius: '5px', textAlign: 'center', fontSize: '6.5px', fontWeight: 700, color: '#fff', letterSpacing: '0.06em' }}>Call Now — Free Estimate →</div>
      </div>
    </div>
  );
}

// COSMETIC DENTISTRY — treatment list with icons + prices
function DentalServices({ b }: { b: Biz }) {
  const descs = ['Total transformation: veneers, whitening & more','In-office whitening · results in 1 hour','Custom-crafted ultra-thin porcelain shells','Clear aligner therapy · avg 12–18 months'];
  const prices = ['From $3,500','From $299','From $1,800','From $199/mo'];
  const icons = ['✨','🦷','💎','😁'];
  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar light />
      <NavBar b={b} light />
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '10px 12px 8px' }}>
        <div style={{ marginBottom: '9px' }}>
          <div style={{ fontSize: '5px', color: b.accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '2px' }}>Smile Aesthetics</div>
          <div style={{ fontSize: '15px', fontWeight: 900, color: '#0f0f0f', lineHeight: 1.0, letterSpacing: '-0.02em' }}>Our Treatments</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: 1, overflow: 'hidden' }}>
          {b.services.map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'flex-start', gap: '7px', padding: '7px 9px', background: i === 0 ? `${b.accent}10` : '#f9fafb', borderRadius: '6px', border: i === 0 ? `1px solid ${b.accent}44` : '1px solid rgba(0,0,0,0.06)' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: i === 0 ? b.accent : '#e5f7f0', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px' }}>{icons[i]}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '6px', fontWeight: 700, color: '#0f0f0f', marginBottom: '1.5px' }}>{s}</div>
                <div style={{ fontSize: '4.5px', color: '#6b7280', lineHeight: 1.5 }}>{descs[i]}</div>
              </div>
              <div style={{ fontSize: '5.5px', fontWeight: 700, color: b.accent, flexShrink: 0, textAlign: 'right', lineHeight: 1.3 }}>{prices[i]}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '8px', padding: '8px', background: b.accent, borderRadius: '5px', textAlign: 'center', fontSize: '6px', fontWeight: 700, color: '#fff', letterSpacing: '0.06em' }}>Book Free Consultation →</div>
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

// ══ ABOUT SCREENS — each looks like a real About Us page ════════════════════════

// AUTO GLASS — company story + stats + philosophy
function GlassAbout({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar light />
      <NavBar b={b} light />
      <div style={{ height: '95px', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
        <img src={b.heroPhoto} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, #fff 100%)' }} />
      </div>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '0 12px 8px' }}>
        <div style={{ marginBottom: '6px' }}>
          <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '2px' }}>Est. 2009 · Detroit, MI</div>
          <div style={{ fontSize: '13px', fontWeight: 900, color: '#0f0f0f', lineHeight: 1.05, letterSpacing: '-0.02em' }}>About Us</div>
        </div>
        <div style={{ fontSize: '5.5px', color: '#4b5563', lineHeight: 1.75, marginBottom: '8px' }}>Meridian Glass has served Metro Detroit drivers for over 15 years. We grew from a single-bay shop into the region's most trusted auto glass provider through honest pricing, same-day service, and lifetime warranties on every install.</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '5px', marginBottom: '8px' }}>
          {[['15+','Years'],['10K+','Installs'],['5★','Rated']].map(([v, l]) => (
            <div key={l} style={{ textAlign: 'center', padding: '6px 0', background: '#f9fafb', borderRadius: '5px', border: '1px solid rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: '10px', fontWeight: 900, color: b.accent, lineHeight: 1 }}>{v}</div>
              <div style={{ fontSize: '4px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '1.5px' }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: '8px 10px', background: `${b.accent}10`, borderRadius: '5px', borderLeft: `3px solid ${b.accent}`, marginBottom: '7px' }}>
          <div style={{ fontSize: '5px', color: '#4b5563', lineHeight: 1.7, fontStyle: 'italic' }}>{b.philosophy}</div>
        </div>
        <div style={{ marginTop: 'auto', padding: '7px', background: b.accent, borderRadius: '4px', textAlign: 'center', fontSize: '6px', fontWeight: 700, color: '#fff' }}>Schedule Today →</div>
      </div>
    </div>
  );
}

// BARBERSHOP — shop story + owner + stats
function BarberAbout({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <NavBar b={b} />
      <div style={{ height: '90px', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
        <img src={b.heroPhoto} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, transparent 20%, ${b.bg} 100%)` }} />
      </div>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '0 12px 8px' }}>
        <div style={{ marginBottom: '5px' }}>
          <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '2px' }}>Est. 2014 · Midtown Detroit</div>
          <div style={{ fontSize: '13px', fontWeight: 900, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.02em' }}>About Us</div>
        </div>
        <div style={{ fontSize: '5.5px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, marginBottom: '7px' }}>Studio 1908 was built for men who value the craft. Our barbers combine old-school technique with modern style — every cut is intentional, every visit is an experience. No rush, no shortcuts.</div>
        <div style={{ padding: '7px 10px', background: `${b.accent}15`, borderLeft: `2.5px solid ${b.accent}`, borderRadius: '0 4px 4px 0', marginBottom: '7px' }}>
          <div style={{ fontSize: '5px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, fontStyle: 'italic' }}>{b.philosophy}</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '5px', marginBottom: '7px' }}>
          {[['3','Barbers'],['12+','Years'],['4.9★','Rated']].map(([v, l]) => (
            <div key={l} style={{ textAlign: 'center', padding: '5px 0', background: 'rgba(255,255,255,0.04)', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ fontSize: '9px', fontWeight: 900, color: b.accent, lineHeight: 1 }}>{v}</div>
              <div style={{ fontSize: '4px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '1.5px' }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: '7px', background: b.accent, borderRadius: '3px', textAlign: 'center', fontSize: '6.5px', fontWeight: 700, color: '#000', letterSpacing: '0.1em' }}>BOOK AN APPOINTMENT →</div>
      </div>
    </div>
  );
}

// LANDSCAPING — story + certifications + stats
function LandAbout({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar light />
      <NavBar b={b} light />
      <div style={{ height: '85px', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
        <img src={b.heroPhoto} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, #fff 100%)' }} />
      </div>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '0 12px 8px' }}>
        <div style={{ marginBottom: '5px' }}>
          <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '2px' }}>Est. 2011 · Bloomfield Hills</div>
          <div style={{ fontSize: '13px', fontWeight: 900, color: '#0f0f0f', lineHeight: 1.05, letterSpacing: '-0.02em' }}>About Us</div>
        </div>
        <div style={{ fontSize: '5.5px', color: '#4b5563', lineHeight: 1.75, marginBottom: '6px' }}>Terrain transforms outdoor spaces into living environments. We work exclusively with Metro Detroit's finest residential and commercial properties — designing, installing, and maintaining landscapes that set the standard.</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '6px' }}>
          {[['🏆','Michigan Landscape Assoc. Member'],['🌿','ISA Certified Arborists on Staff'],['⭐','BBB Accredited — A+ Rating']].map(([icon, text]) => (
            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 7px', background: '#f9fafb', borderRadius: '4px', border: '1px solid rgba(0,0,0,0.06)' }}>
              <span style={{ fontSize: '9px' }}>{icon}</span>
              <span style={{ fontSize: '5px', color: '#374151', fontWeight: 500 }}>{text}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '5px', marginBottom: '7px' }}>
          {[['150+','Projects'],['15','Years'],['A+','BBB']].map(([v, l]) => (
            <div key={l} style={{ textAlign: 'center', padding: '5px 0', background: '#f9fafb', borderRadius: '4px', border: '1px solid rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: '9px', fontWeight: 900, color: b.accent, lineHeight: 1 }}>{v}</div>
              <div style={{ fontSize: '3.5px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '1.5px' }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: '7px', background: b.accent, borderRadius: '4px', textAlign: 'center', fontSize: '6px', fontWeight: 700, color: '#fff' }}>Request a Consultation →</div>
      </div>
    </div>
  );
}

// LUXURY SALON — salon story + stylist team
function SalonAbout({ b }: { b: Biz }) {
  const stylists: [string,string,string][] = [['A','Adria','Color'],['M','Mia','Extensions'],['K','Kezia','Blowouts']];
  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <NavBar b={b} />
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '10px 12px 8px' }}>
        <div style={{ marginBottom: '7px' }}>
          <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '2px' }}>Est. 2017 · Royal Oak</div>
          <div style={{ fontSize: '14px', fontWeight: 900, color: '#fff', lineHeight: 1.0, letterSpacing: '-0.02em' }}>About Us</div>
        </div>
        <div style={{ fontSize: '5.5px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, marginBottom: '8px' }}>Maison is Royal Oak's destination for luxury hair care. We believe beauty is personal — every client deserves a stylist who listens, a space that feels like escape, and results that speak for themselves.</div>
        <div style={{ fontSize: '5px', color: b.accent, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '5px' }}>Meet the Team</div>
        <div style={{ display: 'flex', gap: '5px', marginBottom: '8px' }}>
          {stylists.map(([initial, name, specialty], i) => (
            <div key={name} style={{ flex: 1, background: i === 0 ? `${b.accent}22` : 'rgba(255,255,255,0.04)', border: `1px solid ${i === 0 ? b.accent + '55' : 'rgba(255,255,255,0.08)'}`, borderRadius: '7px', padding: '8px 5px', textAlign: 'center' }}>
              <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: b.accent, margin: '0 auto 4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 800, color: '#000' }}>{initial}</div>
              <div style={{ fontSize: '5.5px', fontWeight: 700, color: '#fff', marginBottom: '1.5px' }}>{name}</div>
              <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.4)' }}>{specialty}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: '7px 10px', background: `${b.accent}15`, borderLeft: `2.5px solid ${b.accent}`, borderRadius: '0 4px 4px 0', marginBottom: '8px' }}>
          <div style={{ fontSize: '5px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, fontStyle: 'italic' }}>{b.philosophy}</div>
        </div>
        <div style={{ marginTop: 'auto', padding: '7px', background: b.accent, borderRadius: '3px', textAlign: 'center', fontSize: '6px', fontWeight: 700, color: '#000' }}>Reserve Your Session →</div>
      </div>
    </div>
  );
}

// FITNESS STUDIO — mission + coaching team + stats
function FitnessAbout({ b }: { b: Biz }) {
  const trainers: [string,string,string][] = [['J','Jordan','Strength'],['T','Tyler','Performance'],['A','Aisha','Nutrition']];
  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <NavBar b={b} />
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '10px 12px 8px' }}>
        <div style={{ marginBottom: '7px' }}>
          <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '2px' }}>Est. 2016 · Southfield</div>
          <div style={{ fontSize: '14px', fontWeight: 900, color: '#fff', lineHeight: 1.0, letterSpacing: '-0.02em' }}>About Us</div>
        </div>
        <div style={{ fontSize: '5.5px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, marginBottom: '8px' }}>Apex Athletics is Southfield's elite performance facility. We train athletes, first responders, and everyday people who want real results — with expert coaching, no fads, and no excuses.</div>
        <div style={{ fontSize: '5px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '5px' }}>Our Coaches</div>
        <div style={{ display: 'flex', gap: '5px', marginBottom: '8px' }}>
          {trainers.map(([initial, name, specialty], i) => (
            <div key={name} style={{ flex: 1, background: i === 0 ? `${b.accent}18` : 'rgba(255,255,255,0.04)', border: `1px solid ${i === 0 ? b.accent + '55' : 'rgba(255,255,255,0.07)'}`, borderRadius: '6px', padding: '7px 4px', textAlign: 'center' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: i === 0 ? b.accent : 'rgba(255,255,255,0.1)', margin: '0 auto 3px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', fontWeight: 800, color: '#fff' }}>{initial}</div>
              <div style={{ fontSize: '5px', fontWeight: 700, color: '#fff', marginBottom: '1.5px' }}>{name}</div>
              <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.35)' }}>{specialty}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '5px', marginBottom: '8px' }}>
          {[['240+','Members'],['6','Coaches'],['4.9★','Rated']].map(([v, l]) => (
            <div key={l} style={{ textAlign: 'center', padding: '5px 0', background: 'rgba(255,255,255,0.04)', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '9px', fontWeight: 900, color: b.accent, lineHeight: 1 }}>{v}</div>
              <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '1.5px' }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: '7px', background: b.accent, borderRadius: '4px', textAlign: 'center', fontSize: '6.5px', fontWeight: 700, color: '#fff' }}>Start Training →</div>
      </div>
    </div>
  );
}

// FINE DINING — restaurant story + chef + accolades
function RestoAbout({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <NavBar b={b} />
      <div style={{ height: '85px', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
        <img src={b.heroPhoto} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, transparent 20%, ${b.bg} 100%)` }} />
      </div>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '0 12px 8px' }}>
        <div style={{ marginBottom: '5px' }}>
          <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '2px' }}>Est. 2019 · Corktown</div>
          <div style={{ fontSize: '13px', fontWeight: 900, color: '#fff', fontStyle: 'italic', lineHeight: 1.05 }}>About Ardor</div>
        </div>
        <div style={{ fontSize: '5.5px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, marginBottom: '7px' }}>Ardor is a modern American kitchen celebrating Michigan's finest ingredients. Executive Chef Daniel Reyes draws from classical French training and a passion for fire-driven cooking to create unforgettable dining.</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '8px' }}>
          {['James Beard Semifinalist 2023','Food & Wine Best New Chef','Michelin-Recommended'].map(award => (
            <div key={award} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 8px', background: `${b.accent}12`, borderRadius: '4px', border: `1px solid ${b.accent}33` }}>
              <span style={{ fontSize: '7px', color: b.accent }}>★</span>
              <span style={{ fontSize: '5px', color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>{award}</span>
            </div>
          ))}
        </div>
        <div style={{ padding: '7px 10px', borderLeft: `2.5px solid ${b.accent}`, background: `${b.accent}10`, borderRadius: '0 4px 4px 0', marginBottom: '8px' }}>
          <div style={{ fontSize: '5px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, fontStyle: 'italic' }}>{b.philosophy}</div>
        </div>
        <div style={{ marginTop: 'auto', padding: '7px', background: b.accent, borderRadius: '3px', textAlign: 'center', fontSize: '6.5px', fontWeight: 700, color: '#000' }}>Reserve a Table →</div>
      </div>
    </div>
  );
}

// HOME SERVICES — company story + credentials
function PlumbAbout({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar light />
      <NavBar b={b} light />
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '10px 12px 8px' }}>
        <div style={{ marginBottom: '7px' }}>
          <div style={{ fontSize: '5px', color: b.accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '2px' }}>Est. 2008 · Detroit Metro</div>
          <div style={{ fontSize: '15px', fontWeight: 900, color: '#0f0f0f', lineHeight: 1.0, letterSpacing: '-0.02em' }}>About Us</div>
        </div>
        <div style={{ fontSize: '5.5px', color: '#4b5563', lineHeight: 1.75, marginBottom: '7px' }}>Prime Home has kept Metro Detroit homes and businesses running for over 18 years. We're licensed, bonded, and fully insured — available 24/7 because plumbing problems don't wait for business hours.</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '7px' }}>
          {[['🏅','Licensed Master Plumber'],['🛡','BBB Accredited — A+ Rating'],['🔒','Fully Bonded & Insured']].map(([icon, text]) => (
            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 7px', background: '#f9fafb', borderRadius: '4px', border: '1px solid rgba(0,0,0,0.06)' }}>
              <span style={{ fontSize: '10px' }}>{icon}</span>
              <span style={{ fontSize: '5.5px', color: '#374151', fontWeight: 500 }}>{text}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '5px', marginBottom: '7px' }}>
          {[['18+','Years'],['2,100+','Jobs'],['24/7','Service']].map(([v, l]) => (
            <div key={l} style={{ textAlign: 'center', padding: '5px 0', background: '#f0f9ff', borderRadius: '4px', border: `1px solid ${b.accent}33` }}>
              <div style={{ fontSize: '9px', fontWeight: 900, color: b.accent, lineHeight: 1 }}>{v}</div>
              <div style={{ fontSize: '3.5px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '1.5px' }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: '7px', background: b.accent, borderRadius: '4px', textAlign: 'center', fontSize: '6px', fontWeight: 700, color: '#fff' }}>Get a Free Estimate →</div>
      </div>
    </div>
  );
}

// COSMETIC DENTISTRY — doctor profile + practice story
function DentalAbout({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar light />
      <NavBar b={b} light />
      <div style={{ height: '85px', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
        <img src={b.heroPhoto} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, #fff 100%)' }} />
      </div>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '0 12px 8px' }}>
        <div style={{ marginBottom: '5px' }}>
          <div style={{ fontSize: '11px', fontWeight: 900, color: '#0f0f0f', lineHeight: 1.1 }}>Dr. Sarah Luminary, DDS</div>
          <div style={{ display: 'flex', gap: '4px', marginTop: '3px', flexWrap: 'wrap' }}>
            {['U of M DDS','AACD Member','Invisalign Pro'].map(badge => (
              <div key={badge} style={{ padding: '2px 6px', background: `${b.accent}15`, borderRadius: '3px', fontSize: '3.5px', fontWeight: 700, color: b.accent, border: `1px solid ${b.accent}44` }}>{badge}</div>
            ))}
          </div>
        </div>
        <div style={{ fontSize: '5.5px', color: '#4b5563', lineHeight: 1.75, marginBottom: '7px' }}>Luminary Dental has helped Birmingham families achieve confident smiles for over 18 years. Dr. Luminary combines artistry with science — crafting personalized treatment plans that fit your life and goals.</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '5px', marginBottom: '7px' }}>
          {[['18+','Yrs Exp'],['1,200+','Smiles'],['Free','Consult']].map(([v, l]) => (
            <div key={l} style={{ textAlign: 'center', padding: '5px 0', background: '#f0fdf4', borderRadius: '4px', border: `1px solid ${b.accent}33` }}>
              <div style={{ fontSize: '9px', fontWeight: 900, color: b.accent, lineHeight: 1 }}>{v}</div>
              <div style={{ fontSize: '3.5px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '1.5px' }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: '7px 10px', background: `${b.accent}10`, borderLeft: `3px solid ${b.accent}`, borderRadius: '0 4px 4px 0', marginBottom: '7px' }}>
          <div style={{ fontSize: '5px', color: '#4b5563', lineHeight: 1.7, fontStyle: 'italic' }}>{b.philosophy}</div>
        </div>
        <div style={{ marginTop: 'auto', padding: '7px', background: b.accent, borderRadius: '4px', textAlign: 'center', fontSize: '6px', fontWeight: 700, color: '#fff' }}>Book a Free Consult →</div>
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

// ══ CONTACT SCREENS — all look like real contact forms ════════════════════════

// AUTO GLASS — contact form with service selector
function GlassContact({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar light />
      <NavBar b={b} light />
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '10px 12px 8px' }}>
        <div style={{ marginBottom: '8px' }}>
          <div style={{ fontSize: '5px', color: b.accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '2px' }}>Get in Touch</div>
          <div style={{ fontSize: '14px', fontWeight: 900, color: '#0f0f0f', lineHeight: 1.0, letterSpacing: '-0.02em' }}>Contact Us</div>
        </div>
        {[['Your Name','John Smith'],['Phone Number','(313) 555-____'],['Email Address','john@email.com']].map(([label, placeholder]) => (
          <div key={label} style={{ marginBottom: '6px' }}>
            <div style={{ fontSize: '4.5px', color: '#6b7280', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2.5px' }}>{label}</div>
            <div style={{ padding: '6px 8px', background: '#f9fafb', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '5px', fontSize: '6px', color: '#d1d5db' }}>{placeholder}</div>
          </div>
        ))}
        <div style={{ marginBottom: '7px' }}>
          <div style={{ fontSize: '4.5px', color: '#6b7280', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '3px' }}>Service Needed</div>
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {b.services.map((s, i) => (
              <div key={s} style={{ padding: '3px 7px', background: i === 0 ? `${b.accent}18` : '#f9fafb', border: i === 0 ? `1px solid ${b.accent}` : '1px solid rgba(0,0,0,0.08)', borderRadius: '20px', fontSize: '4px', fontWeight: i === 0 ? 700 : 400, color: i === 0 ? b.accent : '#6b7280' }}>{s}</div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 'auto' }}>
          <div style={{ padding: '8px', background: b.accent, borderRadius: '5px', textAlign: 'center', fontSize: '6.5px', fontWeight: 700, color: '#fff', letterSpacing: '0.06em', marginBottom: '5px' }}>Send Message →</div>
          <div style={{ textAlign: 'center', fontSize: '5px', color: '#9ca3af' }}>or call {b.phone}</div>
        </div>
      </div>
    </div>
  );
}

// BARBERSHOP — appointment contact form
function BarberContact({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <NavBar b={b} />
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '10px 12px 8px' }}>
        <div style={{ marginBottom: '8px' }}>
          <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '2px' }}>Book a Chair</div>
          <div style={{ fontSize: '14px', fontWeight: 900, color: '#fff', lineHeight: 1.0, letterSpacing: '-0.02em' }}>Contact Us</div>
        </div>
        {[['Your Name','Marcus Webb'],['Phone Number','(313) 555-____'],['Email Address','you@email.com']].map(([label, placeholder]) => (
          <div key={label} style={{ marginBottom: '6px' }}>
            <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2.5px' }}>{label}</div>
            <div style={{ padding: '6px 8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '5px', fontSize: '6px', color: 'rgba(255,255,255,0.2)' }}>{placeholder}</div>
          </div>
        ))}
        <div style={{ marginBottom: '7px' }}>
          <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '3px' }}>Service</div>
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {b.services.map((s, i) => (
              <div key={s} style={{ padding: '3px 7px', background: i === 0 ? b.accent : 'rgba(255,255,255,0.06)', border: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', fontSize: '4px', fontWeight: i === 0 ? 700 : 400, color: i === 0 ? '#000' : 'rgba(255,255,255,0.5)' }}>{s}</div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 'auto' }}>
          <div style={{ padding: '8px', background: b.accent, borderRadius: '3px', textAlign: 'center', fontSize: '6.5px', fontWeight: 700, color: '#000', letterSpacing: '0.1em', marginBottom: '5px' }}>SEND MESSAGE →</div>
          <div style={{ textAlign: 'center', fontSize: '5px', color: 'rgba(255,255,255,0.3)' }}>or call {b.phone}</div>
        </div>
      </div>
    </div>
  );
}

// LANDSCAPING — project inquiry form with textarea
function LandContact({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar light />
      <NavBar b={b} light />
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '10px 12px 8px' }}>
        <div style={{ marginBottom: '8px' }}>
          <div style={{ fontSize: '5px', color: b.accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '2px' }}>Free Consultation</div>
          <div style={{ fontSize: '14px', fontWeight: 900, color: '#0f0f0f', lineHeight: 1.0, letterSpacing: '-0.02em' }}>Contact Us</div>
        </div>
        {[['Your Name','Jane Smith'],['Phone Number','(248) 555-____'],['Email Address','jane@email.com']].map(([label, placeholder]) => (
          <div key={label} style={{ marginBottom: '5px' }}>
            <div style={{ fontSize: '4.5px', color: '#6b7280', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2.5px' }}>{label}</div>
            <div style={{ padding: '6px 8px', background: '#f9fafb', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '5px', fontSize: '6px', color: '#d1d5db' }}>{placeholder}</div>
          </div>
        ))}
        <div style={{ marginBottom: '5px' }}>
          <div style={{ fontSize: '4.5px', color: '#6b7280', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2.5px' }}>Tell Us About Your Project</div>
          <div style={{ padding: '6px 8px', background: '#f9fafb', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '5px', fontSize: '5.5px', color: '#d1d5db', minHeight: '28px' }}>Describe what you have in mind...</div>
        </div>
        <div style={{ marginTop: 'auto' }}>
          <div style={{ padding: '8px', background: b.accent, borderRadius: '5px', textAlign: 'center', fontSize: '6px', fontWeight: 700, color: '#fff', letterSpacing: '0.06em', marginBottom: '5px' }}>Request Free Consultation →</div>
          <div style={{ textAlign: 'center', fontSize: '5px', color: '#9ca3af' }}>or call {b.phone}</div>
        </div>
      </div>
    </div>
  );
}

// LUXURY SALON — appointment request form
function SalonContact({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <NavBar b={b} />
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '10px 12px 8px' }}>
        <div style={{ marginBottom: '8px' }}>
          <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '2px' }}>Reserve a Session</div>
          <div style={{ fontSize: '14px', fontWeight: 900, color: '#fff', lineHeight: 1.0, letterSpacing: '-0.02em' }}>Contact Us</div>
        </div>
        {[['Your Name','Jane Smith'],['Phone Number','(248) 555-____'],['Email Address','jane@email.com']].map(([label, placeholder]) => (
          <div key={label} style={{ marginBottom: '5px' }}>
            <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2.5px' }}>{label}</div>
            <div style={{ padding: '6px 8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '5px', fontSize: '6px', color: 'rgba(255,255,255,0.2)' }}>{placeholder}</div>
          </div>
        ))}
        <div style={{ marginBottom: '5px' }}>
          <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '3px' }}>Service Interest</div>
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {b.services.map((s, i) => (
              <div key={s} style={{ padding: '3px 7px', background: i === 0 ? b.accent : 'rgba(255,255,255,0.06)', border: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', fontSize: '4px', fontWeight: i === 0 ? 700 : 400, color: i === 0 ? '#000' : 'rgba(255,255,255,0.5)' }}>{s}</div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 'auto' }}>
          <div style={{ padding: '8px', background: b.accent, borderRadius: '3px', textAlign: 'center', fontSize: '6px', fontWeight: 700, color: '#000', letterSpacing: '0.08em', marginBottom: '5px' }}>Book Appointment →</div>
          <div style={{ textAlign: 'center', fontSize: '5px', color: 'rgba(255,255,255,0.3)' }}>or call {b.phone}</div>
        </div>
      </div>
    </div>
  );
}

// FITNESS STUDIO — membership inquiry form with textarea
function FitnessContact({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <NavBar b={b} />
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '10px 12px 8px' }}>
        <div style={{ marginBottom: '8px' }}>
          <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '2px' }}>Start Free Trial</div>
          <div style={{ fontSize: '14px', fontWeight: 900, color: '#fff', lineHeight: 1.0, letterSpacing: '-0.02em' }}>Contact Us</div>
        </div>
        {[['Your Name','Alex Johnson'],['Phone Number','(248) 555-____'],['Email Address','alex@email.com']].map(([label, placeholder]) => (
          <div key={label} style={{ marginBottom: '5px' }}>
            <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2.5px' }}>{label}</div>
            <div style={{ padding: '6px 8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '5px', fontSize: '6px', color: 'rgba(255,255,255,0.2)' }}>{placeholder}</div>
          </div>
        ))}
        <div style={{ marginBottom: '5px' }}>
          <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2.5px' }}>Your Fitness Goal</div>
          <div style={{ padding: '6px 8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '5px', fontSize: '5.5px', color: 'rgba(255,255,255,0.18)', minHeight: '28px' }}>Tell us what you want to achieve...</div>
        </div>
        <div style={{ marginTop: 'auto' }}>
          <div style={{ padding: '8px', background: b.accent, borderRadius: '4px', textAlign: 'center', fontSize: '6.5px', fontWeight: 700, color: '#fff', letterSpacing: '0.08em', marginBottom: '5px' }}>Send Message →</div>
          <div style={{ textAlign: 'center', fontSize: '5px', color: 'rgba(255,255,255,0.25)' }}>or call {b.phone}</div>
        </div>
      </div>
    </div>
  );
}

// FINE DINING — reservation contact form with special requests
function RestoContact({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <NavBar b={b} />
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '8px 12px' }}>
        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
          <div style={{ fontSize: '4px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.22em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '3px' }}>Reservations</div>
          <div style={{ fontSize: '14px', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', fontStyle: 'italic' }}>Contact Us</div>
        </div>
        {[['Your Name','Jane Smith'],['Phone Number','(313) 555-____'],['Email Address','jane@email.com']].map(([label, placeholder]) => (
          <div key={label} style={{ marginBottom: '5px' }}>
            <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2.5px' }}>{label}</div>
            <div style={{ padding: '6px 8px', background: 'rgba(255,255,255,0.05)', border: `1px solid ${b.accent}33`, borderRadius: '4px', fontSize: '6px', color: 'rgba(255,255,255,0.2)' }}>{placeholder}</div>
          </div>
        ))}
        <div style={{ marginBottom: '5px' }}>
          <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2.5px' }}>Special Requests</div>
          <div style={{ padding: '6px 8px', background: 'rgba(255,255,255,0.05)', border: `1px solid ${b.accent}33`, borderRadius: '4px', fontSize: '5.5px', color: 'rgba(255,255,255,0.18)', minHeight: '26px' }}>Dietary needs, occasions, preferences...</div>
        </div>
        <div style={{ marginTop: 'auto' }}>
          <div style={{ padding: '8px', background: b.accent, borderRadius: '3px', textAlign: 'center', fontSize: '6.5px', fontWeight: 700, color: '#000', letterSpacing: '0.08em', marginBottom: '5px' }}>Send Message →</div>
          <div style={{ textAlign: 'center', fontSize: '5px', color: 'rgba(255,255,255,0.3)' }}>or call {b.phone}</div>
        </div>
      </div>
    </div>
  );
}

// HOME SERVICES — service request form with emergency banner
function PlumbContact({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar light />
      <NavBar b={b} light />
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '10px 12px 8px' }}>
        <div style={{ marginBottom: '6px' }}>
          <div style={{ fontSize: '5px', color: b.accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '2px' }}>Available 24/7</div>
          <div style={{ fontSize: '14px', fontWeight: 900, color: '#0f0f0f', lineHeight: 1.0, letterSpacing: '-0.02em' }}>Contact Us</div>
        </div>
        <div style={{ padding: '7px 10px', background: 'linear-gradient(135deg, #1d4ed8, #1e3a8a)', borderRadius: '6px', marginBottom: '7px' }}>
          <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.75)', marginBottom: '2px', letterSpacing: '0.1em' }}>EMERGENCY? CALL DIRECTLY</div>
          <div style={{ fontSize: '13px', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em' }}>{b.phone}</div>
        </div>
        {[['Your Name','John Smith'],['Phone Number','(313) 555-____'],['Email Address','john@email.com']].map(([label, placeholder]) => (
          <div key={label} style={{ marginBottom: '5px' }}>
            <div style={{ fontSize: '4.5px', color: '#6b7280', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2.5px' }}>{label}</div>
            <div style={{ padding: '5px 8px', background: '#f9fafb', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '4px', fontSize: '6px', color: '#d1d5db' }}>{placeholder}</div>
          </div>
        ))}
        <div style={{ marginBottom: '5px' }}>
          <div style={{ fontSize: '4.5px', color: '#6b7280', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2.5px' }}>Describe the Issue</div>
          <div style={{ padding: '5px 8px', background: '#f9fafb', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '4px', fontSize: '5.5px', color: '#d1d5db', minHeight: '24px' }}>What's happening?</div>
        </div>
        <div style={{ marginTop: 'auto', padding: '7px', background: b.accent, borderRadius: '4px', textAlign: 'center', fontSize: '6px', fontWeight: 700, color: '#fff' }}>Send Message →</div>
      </div>
    </div>
  );
}

// COSMETIC DENTISTRY — appointment request form
function DentalContact({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar light />
      <NavBar b={b} light />
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '10px 12px 8px' }}>
        <div style={{ marginBottom: '8px' }}>
          <div style={{ fontSize: '5px', color: b.accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '2px' }}>Free Consultation</div>
          <div style={{ fontSize: '14px', fontWeight: 900, color: '#0f0f0f', lineHeight: 1.0, letterSpacing: '-0.02em' }}>Contact Us</div>
        </div>
        {[['Your Name','Jane Smith'],['Phone Number','(248) 555-____'],['Email Address','jane@email.com']].map(([label, placeholder]) => (
          <div key={label} style={{ marginBottom: '5px' }}>
            <div style={{ fontSize: '4.5px', color: '#6b7280', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2.5px' }}>{label}</div>
            <div style={{ padding: '6px 8px', background: '#f9fafb', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '5px', fontSize: '6px', color: '#d1d5db' }}>{placeholder}</div>
          </div>
        ))}
        <div style={{ marginBottom: '5px' }}>
          <div style={{ fontSize: '4.5px', color: '#6b7280', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2.5px' }}>What Brings You In?</div>
          <div style={{ padding: '6px 8px', background: '#f9fafb', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '5px', fontSize: '5.5px', color: '#d1d5db', minHeight: '26px' }}>Tell us about your smile goals...</div>
        </div>
        <div style={{ marginTop: 'auto' }}>
          <div style={{ padding: '8px', background: b.accent, borderRadius: '5px', textAlign: 'center', fontSize: '6px', fontWeight: 700, color: '#fff', letterSpacing: '0.06em', marginBottom: '5px' }}>Request Appointment →</div>
          <div style={{ textAlign: 'center', fontSize: '5px', color: '#9ca3af' }}>Free consult · {b.phone}</div>
        </div>
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
