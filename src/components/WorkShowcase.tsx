'use client';

import { useEffect, useRef } from 'react';

/* ─── Mock 1: Plumbing — blue/orange, emergency feel ───────────────── */
function PlumbingMock() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', lineHeight: 1.3, background: '#fff', height: '100%' }}>
      {/* Emergency banner */}
      <div style={{ background: '#ea580c', padding: '4px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '6.5px', color: '#fff', fontWeight: 700, letterSpacing: '0.06em' }}>⚡ 24/7 EMERGENCY SERVICE AVAILABLE</div>
        <div style={{ fontSize: '6.5px', color: '#ffedd5', fontWeight: 600 }}>(313) 555-0192</div>
      </div>
      {/* Nav */}
      <div style={{ background: '#1e3a5f', padding: '7px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>🔧</div>
          <div style={{ fontWeight: 800, fontSize: '9px', color: '#fff', letterSpacing: '0.04em' }}>METRO PLUMBING</div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['Services', 'Reviews', 'Contact'].map(t => <div key={t} style={{ fontSize: '6.5px', color: 'rgba(255,255,255,0.6)' }}>{t}</div>)}
        </div>
      </div>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #1e4d8c 100%)', padding: '16px 14px 14px' }}>
        <div style={{ fontSize: '12px', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: '5px' }}>Detroit's Trusted Plumber — Fast, Reliable, Affordable</div>
        <div style={{ fontSize: '7px', color: 'rgba(255,255,255,0.65)', marginBottom: '10px' }}>Drain cleaning · Water heaters · Leak repair · Same-day service</div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <div style={{ background: '#ea580c', color: '#fff', fontSize: '7px', fontWeight: 800, padding: '5px 11px', borderRadius: '4px', cursor: 'default' }}>Get Free Estimate</div>
          <div style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', fontSize: '7px', padding: '5px 11px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.25)', cursor: 'default' }}>Our Services</div>
        </div>
      </div>
      {/* Services grid */}
      <div style={{ padding: '10px 14px', background: '#f8fafc' }}>
        <div style={{ fontSize: '6.5px', fontWeight: 700, color: '#1e3a5f', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '7px' }}>What We Fix</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '5px' }}>
          {[{ icon: '🚿', n: 'Drain Cleaning' }, { icon: '🔥', n: 'Water Heaters' }, { icon: '💧', n: 'Leak Repair' }, { icon: '🚽', n: 'Toilet Repair' }, { icon: '🏠', n: 'Repiping' }, { icon: '❄️', n: 'Frozen Pipes' }].map(s => (
            <div key={s.n} style={{ background: '#fff', padding: '6px 5px', borderRadius: '4px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '12px', marginBottom: '2px' }}>{s.icon}</div>
              <div style={{ fontSize: '6px', color: '#374151', fontWeight: 600, lineHeight: 1.2 }}>{s.n}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Trust bar */}
      <div style={{ background: '#1e3a5f', padding: '7px 14px', display: 'flex', justifyContent: 'space-around' }}>
        {['Licensed & Insured', '4.9★ on Google', 'Free Estimates'].map(s => (
          <div key={s} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '6px', color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>{s}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Mock 2: Hair Shop — warm/glam, dark gold theme ───────────────── */
function HairShopMock() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', lineHeight: 1.3, background: '#1a1008', height: '100%' }}>
      {/* Nav */}
      <div style={{ background: '#120c04', padding: '8px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(212,163,85,0.2)' }}>
        <div>
          <div style={{ fontWeight: 900, fontSize: '10px', color: '#d4a355', letterSpacing: '0.12em' }}>LUXE HAIR STUDIO</div>
          <div style={{ fontSize: '5.5px', color: 'rgba(212,163,85,0.5)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Detroit · Est. 2016</div>
        </div>
        <div style={{ background: '#d4a355', color: '#120c04', fontSize: '6.5px', fontWeight: 800, padding: '4px 9px', borderRadius: '2px', letterSpacing: '0.06em', cursor: 'default' }}>BOOK NOW</div>
      </div>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(160deg, #2a1a08 0%, #1a1008 100%)', padding: '16px 14px', borderBottom: '1px solid rgba(212,163,85,0.12)', position: 'relative' }}>
        <div style={{ fontSize: '6.5px', color: '#d4a355', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '6px' }}>Premium Salon Experience</div>
        <div style={{ fontSize: '13px', fontWeight: 800, color: '#f5e6c8', lineHeight: 1.15, marginBottom: '5px' }}>Where Detroit Women Glow Up</div>
        <div style={{ fontSize: '7px', color: 'rgba(245,230,200,0.55)', marginBottom: '10px' }}>Color · Cuts · Braids · Extensions · Natural styles</div>
        <div style={{ display: 'inline-block', background: 'rgba(212,163,85,0.15)', border: '1px solid rgba(212,163,85,0.4)', borderRadius: '20px', padding: '3px 10px' }}>
          <span style={{ fontSize: '6.5px', color: '#d4a355', fontWeight: 600 }}>✨ New clients get 20% off first visit</span>
        </div>
      </div>
      {/* Services */}
      <div style={{ padding: '10px 14px' }}>
        <div style={{ fontSize: '6.5px', color: 'rgba(212,163,85,0.6)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>Services & Pricing</div>
        {[{ name: 'Silk Press', price: '$75+' }, { name: 'Color & Highlights', price: '$120+' }, { name: 'Knotless Braids', price: '$200+' }, { name: 'Cut & Style', price: '$55+' }].map(s => (
          <div key={s.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ fontSize: '7.5px', color: 'rgba(245,230,200,0.8)', fontWeight: 500 }}>{s.name}</div>
            <div style={{ fontSize: '7.5px', color: '#d4a355', fontWeight: 700 }}>{s.price}</div>
          </div>
        ))}
      </div>
      {/* Review */}
      <div style={{ background: 'rgba(212,163,85,0.07)', margin: '0 14px 10px', borderRadius: '4px', padding: '7px 9px', border: '1px solid rgba(212,163,85,0.15)' }}>
        <div style={{ fontSize: '6.5px', color: 'rgba(245,230,200,0.7)', fontStyle: 'italic', lineHeight: 1.5 }}>"My hair has never looked better. She's the only stylist I trust!"</div>
        <div style={{ fontSize: '5.5px', color: '#d4a355', fontWeight: 700, marginTop: '3px' }}>— Keisha T. · ⭐⭐⭐⭐⭐ Google</div>
      </div>
    </div>
  );
}

/* ─── Mock 3: Car Repair — dark/industrial, red accents ────────────── */
function CarRepairMock() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', lineHeight: 1.3, background: '#111', height: '100%' }}>
      {/* Nav */}
      <div style={{ background: '#0d0d0d', padding: '8px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #dc2626' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ fontSize: '14px' }}>🔩</div>
          <div>
            <div style={{ fontWeight: 900, fontSize: '9px', color: '#fff', letterSpacing: '0.06em' }}>MOTOR CITY AUTO REPAIR</div>
            <div style={{ fontSize: '5.5px', color: '#dc2626', letterSpacing: '0.1em' }}>ASE CERTIFIED · DETROIT, MI</div>
          </div>
        </div>
        <div style={{ background: '#dc2626', color: '#fff', fontSize: '6.5px', fontWeight: 800, padding: '4px 9px', borderRadius: '3px', cursor: 'default' }}>CALL NOW</div>
      </div>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(170deg, #1a0a0a 0%, #0d0d0d 100%)', padding: '16px 14px 14px' }}>
        <div style={{ display: 'inline-block', background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.4)', borderRadius: '3px', padding: '2px 7px', marginBottom: '7px' }}>
          <span style={{ fontSize: '6px', color: '#f87171', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Family Owned Since 1998</span>
        </div>
        <div style={{ fontSize: '13px', fontWeight: 900, color: '#fff', lineHeight: 1.15, marginBottom: '5px' }}>Detroit's Honest Auto Shop</div>
        <div style={{ fontSize: '7px', color: 'rgba(255,255,255,0.5)', marginBottom: '11px' }}>Brakes · Engine · Transmission · Oil change · Diagnostics</div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <div style={{ background: '#dc2626', color: '#fff', fontSize: '7px', fontWeight: 800, padding: '5px 12px', borderRadius: '3px', cursor: 'default' }}>Free Diagnosis</div>
          <div style={{ background: 'transparent', color: '#dc2626', fontSize: '7px', fontWeight: 700, padding: '5px 12px', borderRadius: '3px', border: '1px solid #dc2626', cursor: 'default' }}>Our Services</div>
        </div>
      </div>
      {/* Services list */}
      <div style={{ padding: '10px 14px' }}>
        <div style={{ fontSize: '6px', color: '#9ca3af', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '7px' }}>Common Repairs</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
          {[{ s: 'Brake Service', p: 'From $89' }, { s: 'Oil Change', p: 'From $39' }, { s: 'Engine Repair', p: 'Free quote' }, { s: 'Tire Rotation', p: 'From $25' }, { s: 'Transmission', p: 'Free quote' }, { s: 'AC Service', p: 'From $79' }].map(i => (
            <div key={i.s} style={{ background: '#1a1a1a', borderRadius: '3px', padding: '5px 7px', borderLeft: '2px solid #dc2626' }}>
              <div style={{ fontSize: '6.5px', color: '#e5e7eb', fontWeight: 600 }}>{i.s}</div>
              <div style={{ fontSize: '6px', color: '#9ca3af' }}>{i.p}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Trust */}
      <div style={{ background: '#dc2626', padding: '6px 14px', display: 'flex', justifyContent: 'space-around' }}>
        {['4.8★ Google', 'Free Towing', 'Warranty on Work'].map(s => (
          <div key={s} style={{ fontSize: '6px', color: '#fff', fontWeight: 700, textAlign: 'center' }}>{s}</div>
        ))}
      </div>
    </div>
  );
}

/* ─── Mock 4: Lawn Service — fresh green, clean outdoor feel ────────── */
function LawnMock() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', lineHeight: 1.3, background: '#f0fdf4', height: '100%' }}>
      {/* Nav */}
      <div style={{ background: '#fff', padding: '8px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #dcfce7', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ fontSize: '14px' }}>🌿</div>
          <div style={{ fontWeight: 800, fontSize: '9px', color: '#15803d', letterSpacing: '0.03em' }}>GREENLINE LAWN CO.</div>
        </div>
        <div style={{ background: '#16a34a', color: '#fff', fontSize: '6.5px', fontWeight: 700, padding: '3px 9px', borderRadius: '12px', cursor: 'default' }}>Free Quote</div>
      </div>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #14532d 0%, #166534 100%)', padding: '16px 14px 14px' }}>
        <div style={{ display: 'inline-block', background: 'rgba(134,239,172,0.15)', border: '1px solid rgba(134,239,172,0.35)', borderRadius: '20px', padding: '2px 9px', marginBottom: '7px' }}>
          <span style={{ fontSize: '6.5px', color: '#86efac', fontWeight: 600 }}>🌱 Serving Metro Detroit</span>
        </div>
        <div style={{ fontSize: '13px', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: '5px' }}>A Lawn Your Neighbors Will Envy</div>
        <div style={{ fontSize: '7px', color: 'rgba(255,255,255,0.65)', marginBottom: '10px' }}>Mowing · Fertilizing · Landscaping · Snow removal</div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <div style={{ background: '#22c55e', color: '#fff', fontSize: '7px', fontWeight: 800, padding: '5px 11px', borderRadius: '4px', cursor: 'default' }}>Get Free Quote</div>
          <div style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', fontSize: '7px', padding: '5px 11px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.25)', cursor: 'default' }}>Our Work</div>
        </div>
      </div>
      {/* Services */}
      <div style={{ padding: '10px 14px', background: '#f0fdf4' }}>
        <div style={{ fontSize: '6.5px', fontWeight: 700, color: '#15803d', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '7px' }}>Services</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '5px' }}>
          {[{ icon: '✂️', n: 'Weekly Mowing', p: 'From $35' }, { icon: '🌸', n: 'Landscaping', p: 'Custom quote' }, { icon: '💧', n: 'Irrigation', p: 'From $150' }, { icon: '❄️', n: 'Snow Removal', p: 'Seasonal' }].map(s => (
            <div key={s.n} style={{ background: '#fff', padding: '7px 8px', borderRadius: '6px', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ fontSize: '12px' }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: '6.5px', color: '#166534', fontWeight: 700 }}>{s.n}</div>
                <div style={{ fontSize: '5.5px', color: '#6b7280' }}>{s.p}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Review */}
      <div style={{ background: '#dcfce7', margin: '0 14px 10px', borderRadius: '6px', padding: '7px 9px', border: '1px solid #bbf7d0' }}>
        <div style={{ fontSize: '6.5px', color: '#166534', lineHeight: 1.5, fontStyle: 'italic' }}>"Best lawn on the block since we hired them. Show up every week, no excuses."</div>
        <div style={{ fontSize: '5.5px', color: '#15803d', fontWeight: 700, marginTop: '3px' }}>— Marcus D. · ⭐⭐⭐⭐⭐ Google</div>
      </div>
    </div>
  );
}

/* ─── Browser chrome wrapper ─────────────────────────────────────────── */

interface BrowserMockProps {
  url: string;
  chromeColor?: string;
  children: React.ReactNode;
  result: string;
  industry: string;
  name: string;
}

function BrowserMock({ url, chromeColor = '#1e1e1e', children, result, industry, name }: BrowserMockProps) {
  return (
    <div
      className="work-card"
      style={{
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 8px 40px rgba(0,0,0,0.35)',
        border: '1px solid rgba(255,255,255,0.07)',
        background: '#0a0a0a',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = 'translateY(-8px) scale(1.015)';
        el.style.boxShadow = '0 24px 64px rgba(0,0,0,0.55)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = 'translateY(0) scale(1)';
        el.style.boxShadow = '0 8px 40px rgba(0,0,0,0.35)';
      }}
    >
      {/* Browser chrome */}
      <div style={{
        background: chromeColor,
        padding: '7px 10px 6px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#28c840' }} />
        </div>
        <div style={{
          flex: 1,
          background: 'rgba(255,255,255,0.08)',
          borderRadius: '4px',
          padding: '3px 8px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(74,222,128,0.7)', flexShrink: 0 }} />
          <span style={{ fontFamily: 'monospace', fontSize: '7px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0' }}>{url}</span>
        </div>
      </div>

      {/* Fake website content */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        {children}
      </div>

      {/* Result overlay bar */}
      <div style={{
        background: '#0a0a0a',
        padding: '10px 14px',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 0,
      }}>
        <div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '12px', color: '#fff', marginBottom: '2px' }}>{name}</div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', color: 'rgba(208,216,224,0.45)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{industry}</div>
        </div>
        <div style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '10px',
          fontWeight: 700,
          color: '#4ade80',
          letterSpacing: '0.04em',
          textAlign: 'right',
        }}>
          {result}
        </div>
      </div>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────────────── */

const projects = [
  {
    name: 'Metro Plumbing Detroit',
    industry: 'Home Services',
    result: '+310% calls in 90 days',
    url: 'metroplumbingdetroit.com',
    chrome: '#1a2a3a',
    Mock: PlumbingMock,
  },
  {
    name: 'Luxe Hair Studio',
    industry: 'Beauty & Salon',
    result: 'Fully booked in 45 days',
    url: 'luxehairstudiodetroit.com',
    chrome: '#120c04',
    Mock: HairShopMock,
  },
  {
    name: 'Motor City Auto Repair',
    industry: 'Automotive',
    result: '+190% website leads',
    url: 'motorcityautorepair.com',
    chrome: '#1a0a0a',
    Mock: CarRepairMock,
  },
  {
    name: 'Greenline Lawn Co.',
    industry: 'Lawn & Landscaping',
    result: '80 new clients in first season',
    url: 'greenlinelawn.com',
    chrome: '#0d1a0f',
    Mock: LawnMock,
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
          <BrowserMock url={p.url} chromeColor={p.chrome} result={p.result} industry={p.industry} name={p.name}>
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
        .work-card { cursor: default; }
      `}</style>
    </div>
  );
}
