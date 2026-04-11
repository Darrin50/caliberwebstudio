/**
 * Prime Home — Services screen
 * Design language: TRUSTWORTHY / URGENT / 24-7 UTILITY
 * Emergency-first hierarchy: the 24/7 response card dominates.
 * No emoji service icons — replaced with bold categorical labels and urgency signals.
 * Unique layout: emergency callout banner + tiered service list with availability badges.
 * Different from Meridian Glass (auto glass quote tool) — this reads as dispatch/emergency UI.
 */

interface Biz {
  id: string; accent: string; name: string; phone: string;
}

function StatusBar() {
  const c = 'rgba(0,0,0,0.5)';
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

type ServiceTier = 'emergency' | 'priority' | 'standard';

interface ServiceItem {
  name: string;
  desc: string;
  price: string;
  tier: ServiceTier;
  time: string;
}

const SERVICES: ServiceItem[] = [
  { name: 'Emergency Repairs', desc: 'Burst pipes, water main breaks, active flooding', price: 'Free Estimate', tier: 'emergency', time: '< 1 hr response' },
  { name: 'Pipe & Drain', desc: 'Clogged drains, sewer lines, hydro-jetting', price: 'From $149', tier: 'priority', time: 'Same-day' },
  { name: 'Water Heater', desc: 'Tank & tankless installation and repair', price: 'From $299', tier: 'standard', time: 'Next-day avail.' },
  { name: 'Remodel Plumbing', desc: 'Full bathroom & kitchen rough-in and finish', price: 'Custom Quote', tier: 'standard', time: 'Scheduled' },
];

const TIER_CONFIG: Record<ServiceTier, { bg: string; label: string; labelColor: string; borderLeft: string }> = {
  emergency: { bg: '#fef2f2', label: '24/7', labelColor: '#dc2626', borderLeft: '#dc2626' },
  priority:  { bg: '#fffbeb', label: 'Priority', labelColor: '#d97706', borderLeft: '#f59e0b' },
  standard:  { bg: '#f9fafb', label: 'Scheduled', labelColor: '#6b7280', borderLeft: '#e5e7eb' },
};

export function PhonePrimeHomeServices({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />

      {/* Nav — industrial, left-heavy, licensed badge */}
      <div style={{ padding: '5px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.07)', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: '8px', fontWeight: 900, color: '#0a0a0a', letterSpacing: '0.05em' }}>PRIME HOME</div>
          <div style={{ fontSize: '4px', color: b.accent, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '1px' }}>Licensed · Bonded · Insured</div>
        </div>
        <div style={{ display: 'flex', gap: '3px' }}>
          <div style={{ padding: '3px 6px', background: `${b.accent}15`, borderRadius: '3px', border: `1px solid ${b.accent}44` }}>
            <div style={{ fontSize: '3.5px', fontWeight: 700, color: b.accent }}>OPEN 24/7</div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '9px 12px 8px' }}>

        {/* Emergency callout banner — dominates the page */}
        <div style={{
          background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
          borderRadius: '6px',
          padding: '9px 11px',
          marginBottom: '8px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* pulse dot */}
          <div style={{ position: 'absolute', top: '9px', right: '11px', width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
          <div style={{ position: 'absolute', top: '7px', right: '9px', width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }} />

          <div style={{ fontSize: '3.5px', fontWeight: 700, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '3px' }}>
            Emergency? We Answer Now.
          </div>
          <div style={{ fontSize: '13px', fontWeight: 900, color: '#fff', lineHeight: 1.0, letterSpacing: '-0.02em', marginBottom: '5px' }}>
            {b.phone}
          </div>
          <div style={{ fontSize: '4px', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.04em' }}>
            Average response under 60 minutes · Metro Detroit
          </div>
        </div>

        {/* Section header */}
        <div style={{ marginBottom: '6px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '11px', fontWeight: 900, color: '#0a0a0a', letterSpacing: '-0.02em' }}>All Services</div>
          <div style={{ fontSize: '4px', color: '#9ca3af', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Free Estimates</div>
        </div>

        {/* Service rows with tier indicators */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {SERVICES.map((svc) => {
            const t = TIER_CONFIG[svc.tier];
            return (
              <div key={svc.name} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 8px 6px 10px',
                background: t.bg,
                borderRadius: '5px',
                borderLeft: `3px solid ${t.borderLeft}`,
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '1.5px' }}>
                    <span style={{ fontSize: '6px', fontWeight: 800, color: '#0a0a0a', letterSpacing: '-0.01em' }}>{svc.name}</span>
                    <span style={{ padding: '1px 4px', background: svc.tier === 'emergency' ? '#fecaca' : svc.tier === 'priority' ? '#fde68a' : '#e5e7eb', borderRadius: '2px', fontSize: '3px', fontWeight: 700, color: t.labelColor }}>{t.label}</span>
                  </div>
                  <div style={{ fontSize: '3.5px', color: '#6b7280', lineHeight: 1.4 }}>{svc.desc}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: '6px', fontWeight: 900, color: '#0a0a0a' }}>{svc.price}</div>
                  <div style={{ fontSize: '3px', color: '#9ca3af', marginTop: '1px' }}>{svc.time}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{ marginTop: '7px', padding: '8px 12px', background: b.accent, borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '7px', fontWeight: 900, color: '#fff' }}>Call Now — Free Estimate</div>
          <div style={{ fontSize: '5px', fontWeight: 700, color: 'rgba(255,255,255,0.8)', letterSpacing: '0.04em' }}>→</div>
        </div>
      </div>
    </div>
  );
}
