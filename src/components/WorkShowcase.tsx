'use client';

import { useEffect, useRef } from 'react';

/* ─── Fake website mock-up designs ──────────────────────────────── */

function AutoGlassMock() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', lineHeight: 1.3, background: '#fff', height: '100%' }}>
      {/* Nav */}
      <div style={{ background: '#fff', padding: '8px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ fontWeight: 800, fontSize: '9px', color: '#1e3a8a', letterSpacing: '0.06em' }}>DETROIT AUTO GLASS</div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {['Services', 'Reviews', 'Contact'].map(t => <div key={t} style={{ fontSize: '7px', color: '#6b7280' }}>{t}</div>)}
        </div>
      </div>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)', padding: '18px 14px 16px' }}>
        <div style={{ fontSize: '13px', fontWeight: 800, color: '#fff', marginBottom: '5px', lineHeight: 1.2 }}>Detroit's #1 Auto Glass Repair</div>
        <div style={{ fontSize: '7.5px', color: 'rgba(255,255,255,0.72)', marginBottom: '11px' }}>Mobile service · Same-day repair · All makes &amp; models</div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <div style={{ background: '#fff', color: '#1e3a8a', fontSize: '7px', fontWeight: 700, padding: '5px 10px', borderRadius: '3px', cursor: 'default' }}>Get Free Quote</div>
          <div style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: '7px', fontWeight: 600, padding: '5px 10px', borderRadius: '3px', border: '1px solid rgba(255,255,255,0.3)', cursor: 'default' }}>Call Now</div>
        </div>
      </div>
      {/* Services */}
      <div style={{ background: '#f9fafb', padding: '12px 14px' }}>
        <div style={{ fontSize: '7px', fontWeight: 700, color: '#374151', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Our Services</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
          {[{ icon: '🪟', name: 'Windshield Replace' }, { icon: '🔧', name: 'Chip Repair' }, { icon: '🚗', name: 'Mobile Service' }].map(s => (
            <div key={s.name} style={{ background: '#fff', padding: '8px 6px', borderRadius: '4px', textAlign: 'center', border: '1px solid #e5e7eb' }}>
              <div style={{ fontSize: '14px', marginBottom: '3px' }}>{s.icon}</div>
              <div style={{ fontSize: '6.5px', color: '#374151', fontWeight: 600 }}>{s.name}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Stats */}
      <div style={{ background: '#1e3a8a', padding: '8px 14px', display: 'flex', justifyContent: 'space-around' }}>
        {['500+ Jobs Done', '5★ Google Rating', '24hr Turnaround'].map(s => (
          <div key={s} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '6.5px', color: '#fff', fontWeight: 700 }}>{s}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BarbershopMock() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', lineHeight: 1.3, background: '#0f0f0f', height: '100%' }}>
      {/* Nav */}
      <div style={{ background: '#181818', padding: '8px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ fontWeight: 800, fontSize: '9px', color: '#ca8a04', letterSpacing: '0.1em' }}>MOTOR CITY BARBERSHOP</div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {['Book', 'Services', 'Gallery'].map(t => <div key={t} style={{ fontSize: '7px', color: 'rgba(255,255,255,0.5)' }}>{t}</div>)}
        </div>
      </div>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(180deg, #1a1209 0%, #0f0f0f 100%)', padding: '18px 14px 16px', borderBottom: '1px solid rgba(202,138,4,0.2)' }}>
        <div style={{ fontSize: '7px', color: '#ca8a04', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '6px' }}>Detroit · Est. 2009</div>
        <div style={{ fontSize: '13px', fontWeight: 800, color: '#fff', marginBottom: '5px', lineHeight: 1.2 }}>Where Detroit Gets Sharp</div>
        <div style={{ fontSize: '7.5px', color: 'rgba(255,255,255,0.5)', marginBottom: '11px' }}>Premium cuts · Beard trims · Hot towel shaves</div>
        <div style={{ background: '#ca8a04', color: '#0f0f0f', fontSize: '7px', fontWeight: 800, padding: '5px 12px', borderRadius: '2px', display: 'inline-block', letterSpacing: '0.08em', cursor: 'default' }}>BOOK APPOINTMENT</div>
      </div>
      {/* Services */}
      <div style={{ padding: '12px 14px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {[{ name: 'Classic Cut', price: '$35' }, { name: 'Beard Trim', price: '$20' }, { name: 'Cut + Beard', price: '$50' }].map(s => (
            <div key={s.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '7.5px', color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>{s.name}</div>
              <div style={{ fontSize: '7.5px', color: '#ca8a04', fontWeight: 700 }}>{s.price}</div>
            </div>
          ))}
        </div>
      </div>
      {/* CTA strip */}
      <div style={{ background: 'rgba(202,138,4,0.08)', border: '1px solid rgba(202,138,4,0.2)', margin: '0 14px', borderRadius: '4px', padding: '7px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '7px', color: 'rgba(255,255,255,0.65)' }}>Walk-ins welcome · Mon–Sat 9am–7pm</div>
        <div style={{ fontSize: '6.5px', color: '#ca8a04', fontWeight: 700 }}>VIEW HOURS →</div>
      </div>
    </div>
  );
}

function LogisticsMock() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', lineHeight: 1.3, background: '#f9fafb', height: '100%' }}>
      {/* Nav */}
      <div style={{ background: '#0f172a', padding: '8px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontWeight: 800, fontSize: '9px', color: '#fff', letterSpacing: '0.06em' }}>EASTSIDE LOGISTICS</div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {['Solutions', 'About', 'Contact'].map(t => <div key={t} style={{ fontSize: '7px', color: 'rgba(255,255,255,0.55)' }}>{t}</div>)}
        </div>
      </div>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)', padding: '18px 14px 16px' }}>
        <div style={{ display: 'inline-block', background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.3)', borderRadius: '20px', padding: '2px 8px', marginBottom: '8px' }}>
          <span style={{ fontSize: '6.5px', color: '#4ade80', fontWeight: 600 }}>Metro Detroit Coverage</span>
        </div>
        <div style={{ fontSize: '13px', fontWeight: 800, color: '#fff', marginBottom: '5px', lineHeight: 1.2 }}>Freight Solutions That Move Michigan Forward</div>
        <div style={{ fontSize: '7.5px', color: 'rgba(255,255,255,0.55)', marginBottom: '11px' }}>Same-day pickup · LTL & FTL · Real-time tracking</div>
        <div style={{ background: '#4ade80', color: '#0f172a', fontSize: '7px', fontWeight: 800, padding: '5px 12px', borderRadius: '3px', display: 'inline-block', cursor: 'default' }}>Get a Quote →</div>
      </div>
      {/* Features */}
      <div style={{ background: '#fff', padding: '12px 14px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
          {[{ icon: '⚡', t: 'Same-Day Pickup' }, { icon: '📍', t: 'Live Tracking' }, { icon: '🔒', t: 'Cargo Insurance' }, { icon: '📞', t: '24/7 Dispatch' }].map(f => (
            <div key={f.t} style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 0' }}>
              <span style={{ fontSize: '11px' }}>{f.icon}</span>
              <span style={{ fontSize: '7px', color: '#374151', fontWeight: 600 }}>{f.t}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Trust bar */}
      <div style={{ background: '#f1f5f9', padding: '8px 14px', display: 'flex', justifyContent: 'space-around', borderTop: '1px solid #e2e8f0' }}>
        {['200+ Clients', '$0 Min Order', 'MI Licensed'].map(s => (
          <div key={s} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '6.5px', color: '#64748b', fontWeight: 700 }}>{s}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChiroMock() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', lineHeight: 1.3, background: '#fafafa', height: '100%' }}>
      {/* Nav */}
      <div style={{ background: '#fff', padding: '8px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f0f0f5', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <div style={{ fontWeight: 800, fontSize: '9px', color: '#6d28d9', letterSpacing: '0.04em' }}>Detroit Chiropractic</div>
        <div style={{ background: '#6d28d9', color: '#fff', fontSize: '6.5px', fontWeight: 700, padding: '3px 8px', borderRadius: '12px', cursor: 'default' }}>Book Now</div>
      </div>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #6d28d9 0%, #4c1d95 100%)', padding: '18px 14px 16px' }}>
        <div style={{ fontSize: '13px', fontWeight: 800, color: '#fff', marginBottom: '5px', lineHeight: 1.2 }}>Live Pain-Free. Move Better.</div>
        <div style={{ fontSize: '7.5px', color: 'rgba(255,255,255,0.7)', marginBottom: '11px' }}>Gentle, effective chiropractic care for the whole family</div>
        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
          <div style={{ background: '#fff', color: '#6d28d9', fontSize: '7px', fontWeight: 700, padding: '4px 10px', borderRadius: '20px', cursor: 'default' }}>New Patient Special</div>
          <div style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: '7px', padding: '4px 10px', borderRadius: '20px', cursor: 'default' }}>Learn More</div>
        </div>
      </div>
      {/* Conditions */}
      <div style={{ background: '#fff', padding: '10px 14px' }}>
        <div style={{ fontSize: '7px', fontWeight: 700, color: '#374151', marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>We Treat</div>
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {['Back Pain', 'Neck Pain', 'Headaches', 'Sciatica', 'Sports Injuries'].map(c => (
            <div key={c} style={{ background: '#f3f0ff', color: '#6d28d9', fontSize: '6.5px', fontWeight: 600, padding: '3px 7px', borderRadius: '10px' }}>{c}</div>
          ))}
        </div>
      </div>
      {/* Testimonial */}
      <div style={{ background: '#f5f3ff', margin: '8px 14px', borderRadius: '6px', padding: '8px 10px', border: '1px solid #ede9fe' }}>
        <div style={{ fontSize: '6.5px', color: '#4c1d95', lineHeight: 1.5, fontStyle: 'italic' }}>"After 3 visits I felt better than I had in years. Highly recommend!"</div>
        <div style={{ fontSize: '6px', color: '#7c3aed', fontWeight: 700, marginTop: '4px' }}>— Sarah M. · Google Review ⭐⭐⭐⭐⭐</div>
      </div>
    </div>
  );
}

/* ─── Browser chrome wrapper ─────────────────────────────────────── */

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
        {/* Traffic lights */}
        <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#28c840' }} />
        </div>
        {/* URL bar */}
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

/* ─── Main component ─────────────────────────────────────────────── */

const projects = [
  {
    name: 'Detroit Auto Glass',
    industry: 'Local Services',
    result: '+240% calls from Google',
    url: 'detroitautoglass.com',
    chrome: '#1e1e1e',
    Mock: AutoGlassMock,
  },
  {
    name: 'Motor City Barbershop',
    industry: 'Retail & Services',
    result: 'Booked 3 weeks out in 60 days',
    url: 'motorcitybarbershop.com',
    chrome: '#111111',
    Mock: BarbershopMock,
  },
  {
    name: 'Eastside Logistics',
    industry: 'B2B',
    result: 'First page Google in 90 days',
    url: 'eastsidelogistics.com',
    chrome: '#1e1e2e',
    Mock: LogisticsMock,
  },
  {
    name: 'Detroit Chiropractic',
    industry: 'Healthcare',
    result: '+180% new patient inquiries',
    url: 'detroitchiropractic.com',
    chrome: '#1e1e1e',
    Mock: ChiroMock,
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
