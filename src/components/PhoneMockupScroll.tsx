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

// ══ HOME SCREENS — unique layout per business ═════════════════════════════════

// AUTO GLASS — emergency-first: call strip + tap-to-select repair type
function GlassHome({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', background: '#f8fafc', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar light />
      {/* Dark header band */}
      <div style={{ background: '#0f1e35', padding: '8px 12px 10px', flexShrink: 0 }}>
        <div style={{ fontSize: '8px', fontWeight: 800, color: '#fff', letterSpacing: '0.04em' }}>{b.name.toUpperCase()}</div>
        <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '1.5px' }}>Same-Day · Guaranteed</div>
      </div>
      {/* Emergency call strip */}
      <div style={{ background: b.accent, padding: '9px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: '5px', color: 'rgba(255,255,255,0.75)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Emergency line</div>
          <div style={{ fontSize: '11px', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1 }}>{b.phone}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: '50%', width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>📞</div>
      </div>
      {/* Photo */}
      <div style={{ height: '100px', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        <img src={b.heroPhoto} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.6))' }} />
        <div style={{ position: 'absolute', bottom: '8px', left: '10px', background: '#fff', borderRadius: '3px', padding: '3px 7px', fontSize: '5.5px', fontWeight: 700, color: '#0f1e35', letterSpacing: '0.06em' }}>⚡ 1-HR RESPONSE</div>
      </div>
      {/* Select repair type */}
      <div style={{ padding: '8px 12px 6px', flexShrink: 0 }}>
        <div style={{ fontSize: '5px', color: '#6b7280', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '6px', fontFamily: 'monospace' }}>Select Repair Type</div>
        <div style={{ display: 'flex', gap: '5px' }}>
          {['Windshield', 'Chip Fix', 'Side Glass'].map((t, i) => (
            <div key={t} style={{ flex: 1, padding: '7px 4px', background: i === 0 ? b.accent : '#f1f5f9', borderRadius: '4px', textAlign: 'center', fontSize: '5.5px', fontWeight: 700, color: i === 0 ? '#fff' : '#374151', border: i === 0 ? 'none' : '1px solid #e2e8f0' }}>{t}</div>
          ))}
        </div>
      </div>
      {/* Trust row */}
      <div style={{ padding: '6px 12px', display: 'flex', gap: '6px', flexShrink: 0 }}>
        {['Licensed & Bonded', 'Lifetime Warranty', 'Mobile Service'].map(t => (
          <div key={t} style={{ flex: 1, padding: '4px 3px', background: '#f1f5f9', borderRadius: '3px', textAlign: 'center', fontSize: '4.5px', fontWeight: 600, color: '#374151' }}>{t}</div>
        ))}
      </div>
    </div>
  );
}

// BARBERSHOP — booking-first: next available slot + barber cards
function BarberHome({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <div style={{ padding: '8px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: '9px', fontWeight: 800, color: '#fff', letterSpacing: '0.04em' }}>{b.name.toUpperCase()}</div>
          <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '1px' }}>Midtown Detroit</div>
        </div>
        <div style={{ fontSize: '5px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em' }}>TUE–SAT</div>
      </div>
      {/* Next available */}
      <div style={{ margin: '0 12px 10px', background: 'rgba(255,255,255,0.04)', border: `1px solid ${b.accent}55`, borderLeft: `3px solid ${b.accent}`, borderRadius: '4px', padding: '8px 10px', flexShrink: 0 }}>
        <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.16em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '4px' }}>Next Available</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
          <span style={{ fontSize: '18px', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>2:30</span>
          <span style={{ fontSize: '7px', fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>PM · Today</span>
        </div>
        <div style={{ marginTop: '6px', padding: '5px 0', background: b.accent, borderRadius: '3px', textAlign: 'center', fontSize: '5.5px', fontWeight: 700, color: '#000', letterSpacing: '0.1em' }}>BOOK THIS SLOT →</div>
      </div>
      {/* Barbers */}
      <div style={{ padding: '0 12px', flexShrink: 0 }}>
        <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '6px' }}>Our Barbers</div>
        <div style={{ display: 'flex', gap: '7px', marginBottom: '10px' }}>
          {[['M', 'Marcus', 'Cuts & Fades'], ['D', 'DeShawn', 'Shave Specialist'], ['R', 'Rico', 'Beard Art']].map(([i, n, s]) => (
            <div key={n} style={{ flex: 1, background: 'rgba(255,255,255,0.04)', borderRadius: '6px', padding: '7px 5px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: b.accent, margin: '0 auto 4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', fontWeight: 700, color: '#000' }}>{i}</div>
              <div style={{ fontSize: '5.5px', fontWeight: 700, color: '#fff', marginBottom: '1px' }}>{n}</div>
              <div style={{ fontSize: '4px', color: 'rgba(255,255,255,0.4)' }}>{s}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Service chips */}
      <div style={{ padding: '0 12px', flexShrink: 0 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {b.services.map(s => (
            <div key={s} style={{ padding: '3px 7px', background: 'rgba(255,255,255,0.06)', borderRadius: '20px', fontSize: '5px', color: 'rgba(255,255,255,0.65)', border: '1px solid rgba(255,255,255,0.08)' }}>{s}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

// LANDSCAPING — portfolio grid + quote CTA
function LandHome({ b }: { b: Biz }) {
  const colors = ['#c8e6c9','#a5d6a7','#81c784','#66bb6a'];
  return (
    <div style={{ height: '100%', background: '#fafafa', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar light />
      <div style={{ padding: '8px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0, borderBottom: '1px solid #e5e7eb' }}>
        <div>
          <div style={{ fontSize: '8px', fontWeight: 800, color: '#0f0f0f', letterSpacing: '0.06em' }}>{b.name.toUpperCase()}</div>
          <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '1px' }}>Landscape Architecture</div>
        </div>
        <div style={{ padding: '4px 8px', background: b.accent, borderRadius: '20px', fontSize: '5px', fontWeight: 700, color: '#fff' }}>Get Quote</div>
      </div>
      {/* Season badge + headline */}
      <div style={{ padding: '8px 12px 6px', flexShrink: 0 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 7px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '20px', marginBottom: '5px' }}>
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: b.accent }} />
          <span style={{ fontSize: '4.5px', color: b.accent, fontWeight: 600 }}>Spring bookings open</span>
        </div>
        <div style={{ fontSize: '13px', fontWeight: 900, color: '#0f0f0f', letterSpacing: '-0.025em', lineHeight: 1.1 }}>Elevated<br />Outdoor Living</div>
      </div>
      {/* 2×2 project grid */}
      <div style={{ padding: '4px 12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px', flexShrink: 0 }}>
        {[['Bloomfield Estate','Design'],['Ann Arbor Home','Lawn Care'],['Grosse Pointe','Hardscape'],['Birmingham','Seasonal']].map(([name, cat], i) => (
          <div key={name} style={{ height: '60px', borderRadius: '6px', overflow: 'hidden', position: 'relative', background: colors[i] }}>
            <img src={b.heroPhoto} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.65))' }} />
            <div style={{ position: 'absolute', bottom: '5px', left: '6px' }}>
              <div style={{ fontSize: '5px', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>{name}</div>
              <div style={{ fontSize: '4px', color: 'rgba(255,255,255,0.7)' }}>{cat}</div>
            </div>
          </div>
        ))}
      </div>
      {/* CTA */}
      <div style={{ margin: '6px 12px 0', padding: '7px 12px', background: b.accent, borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: '5px', color: 'rgba(255,255,255,0.75)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Free Consultation</div>
          <div style={{ fontSize: '7px', fontWeight: 800, color: '#fff' }}>Request Your Custom Quote</div>
        </div>
        <div style={{ fontSize: '10px', color: '#fff' }}>›</div>
      </div>
    </div>
  );
}

// LUXURY SALON — editorial split layout
function SalonHome({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <div style={{ padding: '7px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <div style={{ fontSize: '7px', fontWeight: 800, color: '#fff', letterSpacing: '0.1em' }}>{b.name.toUpperCase()}</div>
        <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'monospace' }}>Royal Oak · Est 2017</div>
      </div>
      {/* Editorial split */}
      <div style={{ display: 'flex', height: '140px', flexShrink: 0, margin: '0 12px 8px', gap: '7px' }}>
        {/* Left: featured treatment card */}
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.04)', borderRadius: '7px', padding: '10px 9px', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '4px', color: b.accent, letterSpacing: '0.16em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '4px' }}>Featured</div>
            <div style={{ fontSize: '11px', fontWeight: 900, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.02em' }}>The Art<br />of Beauty</div>
          </div>
          <div>
            <div style={{ fontSize: '5px', color: 'rgba(255,255,255,0.5)', marginBottom: '5px', lineHeight: 1.5 }}>Luxury color · Keratin · Blowout</div>
            <div style={{ padding: '4px 8px', background: b.accent, borderRadius: '3px', fontSize: '5px', fontWeight: 700, color: b.accent === '#c9a98a' ? '#000' : '#fff', display: 'inline-block' }}>Reserve →</div>
          </div>
        </div>
        {/* Right: photo */}
        <div style={{ width: '75px', borderRadius: '7px', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
          <img src={b.heroPhoto} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, ${b.accent}33, transparent)` }} />
        </div>
      </div>
      {/* Horizontal service chips */}
      <div style={{ padding: '0 12px 8px', flexShrink: 0 }}>
        <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '6px' }}>Services</div>
        <div style={{ display: 'flex', gap: '4px' }}>
          {b.services.map((s, i) => (
            <div key={s} style={{ padding: '4px 7px', background: i === 0 ? b.accent : 'rgba(255,255,255,0.05)', borderRadius: '20px', fontSize: '5px', fontWeight: 600, color: i === 0 ? '#000' : 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap', border: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.08)' }}>{s}</div>
          ))}
        </div>
      </div>
      {/* Rating strip */}
      <div style={{ margin: '0 12px', padding: '7px 10px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ fontSize: '5px', color: 'rgba(255,255,255,0.5)' }}>Royal Oak's #1 Salon</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
          <span style={{ color: '#f59e0b', fontSize: '7px', letterSpacing: '0.5px' }}>★★★★★</span>
          <span style={{ fontSize: '5px', color: 'rgba(255,255,255,0.4)' }}>4.9</span>
        </div>
      </div>
    </div>
  );
}

// FITNESS STUDIO — today's class schedule
function FitnessHome({ b }: { b: Biz }) {
  const classes = [['6:00 AM','HIIT Circuit','Marcus T.','High'],['8:30 AM','Power Yoga','Alicia M.','Med'],['12:00 PM','Strength & Lift','Dre Williams','High']];
  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      {/* Header with photo */}
      <div style={{ height: '90px', position: 'relative', flexShrink: 0, overflow: 'hidden' }}>
        <img src={b.heroPhoto} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(5,5,5,0.6), rgba(5,5,5,0.85))' }} />
        <div style={{ position: 'absolute', inset: 0, padding: '10px 12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '8px', fontWeight: 800, color: '#fff', letterSpacing: '0.06em' }}>{b.name.toUpperCase()}</div>
              <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '1px' }}>Southfield, MI</div>
            </div>
            <div style={{ padding: '3px 7px', background: b.accent, borderRadius: '20px', fontSize: '5px', fontWeight: 700, color: '#fff' }}>Join Today</div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {[['240+', 'Members'], ['18', 'Classes/Wk'], ['6', 'Trainers']].map(([v, l]) => (
              <div key={l}>
                <div style={{ fontSize: '9px', fontWeight: 900, color: b.accent, lineHeight: 1 }}>{v}</div>
                <div style={{ fontSize: '4px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Today's schedule */}
      <div style={{ padding: '8px 12px', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px', flexShrink: 0 }}>
          <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'monospace' }}>Today's Classes</div>
          <div style={{ fontSize: '4.5px', color: b.accent }}>View All →</div>
        </div>
        {classes.map(([time, name, trainer, intensity]) => (
          <div key={name} style={{ padding: '6px 8px', background: 'rgba(255,255,255,0.04)', borderRadius: '5px', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ width: '32px', flexShrink: 0, textAlign: 'center' }}>
              <div style={{ fontSize: '6px', fontWeight: 700, color: b.accent, lineHeight: 1 }}>{time.split(' ')[0]}</div>
              <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.4)' }}>{time.split(' ')[1]}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '6.5px', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>{name}</div>
              <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.45)', marginTop: '1px' }}>{trainer}</div>
            </div>
            <div style={{ padding: '2px 5px', background: intensity === 'High' ? `${b.accent}33` : 'rgba(255,255,255,0.07)', borderRadius: '3px', fontSize: '4px', fontWeight: 700, color: intensity === 'High' ? b.accent : 'rgba(255,255,255,0.5)', letterSpacing: '0.06em' }}>{intensity}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// FINE DINING — reservation picker + chef's dish
function RestoHome({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      {/* Photo hero with restaurant branding */}
      <div style={{ height: '110px', position: 'relative', flexShrink: 0, overflow: 'hidden' }}>
        <img src={b.heroPhoto} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(44,28,8,0.5) 0%, rgba(8,5,3,0.75) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, padding: '10px 12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '9px', fontWeight: 800, color: '#fff', letterSpacing: '0.08em', fontStyle: 'italic' }}>{b.name}</div>
              <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: '1px' }}>Corktown · Detroit</div>
            </div>
            <div style={{ padding: '3px 7px', background: 'rgba(255,255,255,0.12)', borderRadius: '20px', fontSize: '4.5px', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)' }}>Menu ↗</div>
          </div>
          <div style={{ display: 'flex', gap: '3px' }}>
            {['Tue–Sun', '5PM–11PM', 'Reservations'].map(t => (
              <div key={t} style={{ padding: '2px 5px', background: 'rgba(0,0,0,0.4)', borderRadius: '2px', fontSize: '4px', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.1)' }}>{t}</div>
            ))}
          </div>
        </div>
      </div>
      {/* Reservation time picker */}
      <div style={{ padding: '8px 12px', flexShrink: 0 }}>
        <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '6px' }}>Tonight's Reservations</div>
        <div style={{ display: 'flex', gap: '5px', marginBottom: '8px' }}>
          {['7:00', '7:30', '8:00', '8:30'].map((t, i) => (
            <div key={t} style={{ flex: 1, padding: '5px 3px', background: i === 1 ? b.accent : 'rgba(255,255,255,0.06)', borderRadius: '4px', textAlign: 'center', fontSize: '6px', fontWeight: 700, color: i === 1 ? '#000' : 'rgba(255,255,255,0.7)', border: i === 1 ? 'none' : '1px solid rgba(255,255,255,0.08)' }}>{t}</div>
          ))}
        </div>
        <div style={{ padding: '6px 10px', background: b.accent, borderRadius: '4px', textAlign: 'center', fontSize: '6px', fontWeight: 700, color: '#000', letterSpacing: '0.06em' }}>Reserve Table for 2 →</div>
      </div>
      {/* Chef's special */}
      <div style={{ margin: '0 12px', padding: '7px 9px', background: 'rgba(255,255,255,0.04)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        <div style={{ fontSize: '16px' }}>🍽️</div>
        <div>
          <div style={{ fontSize: '4.5px', color: b.accent, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'monospace' }}>Chef's Special Tonight</div>
          <div style={{ fontSize: '6.5px', fontWeight: 700, color: '#fff', marginTop: '1px' }}>Braised Short Rib · Truffle Jus</div>
          <div style={{ fontSize: '5px', color: 'rgba(255,255,255,0.45)', marginTop: '1px' }}>Paired with Napa Valley Cab</div>
        </div>
      </div>
    </div>
  );
}

// HOME SERVICES — giant emergency CTA + service cards
function PlumbHome({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', background: '#f0f7ff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar light />
      {/* Top bar */}
      <div style={{ background: '#0c1e32', padding: '7px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: '7.5px', fontWeight: 800, color: '#fff', letterSpacing: '0.04em' }}>{b.name.toUpperCase()}</div>
          <div style={{ fontSize: '4px', color: b.accent, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '1px' }}>Detroit Metro · Licensed & Bonded</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22c55e' }} />
          <span style={{ fontSize: '4.5px', color: '#22c55e', fontWeight: 600 }}>Available Now</span>
        </div>
      </div>
      {/* Emergency call banner */}
      <div style={{ margin: '10px 12px 8px', padding: '12px', background: b.accent, borderRadius: '8px', textAlign: 'center', flexShrink: 0, boxShadow: `0 4px 16px ${b.accent}55` }}>
        <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '3px' }}>Emergency Plumbing · 24/7</div>
        <div style={{ fontSize: '14px', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>{b.phone}</div>
        <div style={{ fontSize: '5px', color: 'rgba(255,255,255,0.75)', marginTop: '4px' }}>Avg response: 47 minutes</div>
      </div>
      {/* Quick service selector */}
      <div style={{ padding: '0 12px', flexShrink: 0 }}>
        <div style={{ fontSize: '4.5px', color: '#6b7280', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '5px' }}>What do you need?</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px', marginBottom: '8px' }}>
          {[['🚿','Emergency Leak'],['🪠','Drain Clog'],['🔧','Pipe Repair'],['🛁','Water Heater']].map(([icon, label]) => (
            <div key={label} style={{ padding: '7px 8px', background: '#fff', borderRadius: '5px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '5px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
              <span style={{ fontSize: '10px' }}>{icon}</span>
              <span style={{ fontSize: '5.5px', fontWeight: 600, color: '#1e293b' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Trust row */}
      <div style={{ padding: '0 12px', display: 'flex', gap: '5px', flexShrink: 0 }}>
        {['⭐ 4.9 Rating', '2,100+ Jobs', 'Free Estimate'].map(t => (
          <div key={t} style={{ flex: 1, padding: '4px 3px', background: '#fff', borderRadius: '4px', border: '1px solid #e2e8f0', textAlign: 'center', fontSize: '4.5px', fontWeight: 600, color: '#374151' }}>{t}</div>
        ))}
      </div>
    </div>
  );
}

// COSMETIC DENTISTRY — before/after + free consult banner
function DentalHome({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar light />
      {/* Clean header */}
      <div style={{ padding: '7px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0, borderBottom: '1px solid #f1f5f9' }}>
        <div>
          <div style={{ fontSize: '7px', fontWeight: 800, color: '#0f172a', letterSpacing: '0.06em' }}>{b.name.toUpperCase()}</div>
          <div style={{ fontSize: '4px', color: b.accent, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '1px' }}>Birmingham, MI · Smile Aesthetics</div>
        </div>
        <div style={{ padding: '3px 8px', background: b.accent, borderRadius: '20px', fontSize: '5px', fontWeight: 700, color: '#fff' }}>Free Consult</div>
      </div>
      {/* Before/After panels */}
      <div style={{ padding: '8px 12px 6px', flexShrink: 0 }}>
        <div style={{ fontSize: '4.5px', color: '#94a3b8', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '5px' }}>Real Patient Results</div>
        <div style={{ display: 'flex', gap: '4px', height: '90px', marginBottom: '6px' }}>
          <div style={{ flex: 1, borderRadius: '6px', overflow: 'hidden', position: 'relative', background: '#f1f5f9' }}>
            <img src={b.heroPhoto} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(80%) brightness(0.85)' }} />
            <div style={{ position: 'absolute', bottom: '5px', left: '5px', background: 'rgba(0,0,0,0.55)', padding: '2px 5px', borderRadius: '2px', fontSize: '4.5px', fontWeight: 700, color: '#fff' }}>BEFORE</div>
          </div>
          <div style={{ width: '1.5px', background: '#e2e8f0', borderRadius: '1px', flexShrink: 0 }} />
          <div style={{ flex: 1, borderRadius: '6px', overflow: 'hidden', position: 'relative', background: '#f0fdf4' }}>
            <img src={b.heroPhoto} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(1.05) saturate(1.1)' }} />
            <div style={{ position: 'absolute', bottom: '5px', left: '5px', background: b.accent, padding: '2px 5px', borderRadius: '2px', fontSize: '4.5px', fontWeight: 700, color: '#fff' }}>AFTER</div>
          </div>
        </div>
      </div>
      {/* Treatments */}
      <div style={{ padding: '0 12px', flexShrink: 0 }}>
        <div style={{ fontSize: '4.5px', color: '#94a3b8', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '5px' }}>Treatments</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginBottom: '7px' }}>
          {b.services.map(s => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 8px', background: '#f8fafc', borderRadius: '4px', border: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: b.accent, flexShrink: 0 }} />
                <span style={{ fontSize: '5.5px', color: '#1e293b', fontWeight: 500 }}>{s}</span>
              </div>
              <span style={{ fontSize: '6px', color: b.accent }}>›</span>
            </div>
          ))}
        </div>
      </div>
      {/* CTA */}
      <div style={{ margin: '0 12px', padding: '7px', background: b.accent, borderRadius: '5px', textAlign: 'center', fontSize: '6px', fontWeight: 700, color: '#fff', letterSpacing: '0.06em', flexShrink: 0 }}>
        Book Your Free Smile Consultation →
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
