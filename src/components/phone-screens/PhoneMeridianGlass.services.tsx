/**
 * Meridian Glass — Services screen
 * Design language: INDUSTRIAL / UTILITARIAN — real quoting tool, not a lifestyle card.
 * No emoji. Pricing-forward. Same-day urgency. OEM/warranty trust signals.
 * Completely different layout from all other services screens.
 */

interface Biz {
  id: string; accent: string; name: string; tagline: string; phone: string;
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

// Featured service card — windshield replacement gets the hero treatment
function FeaturedCard({ accent }: { accent: string }) {
  return (
    <div style={{
      background: accent,
      borderRadius: '6px',
      padding: '10px 11px',
      marginBottom: '5px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* diagonal texture lines */}
      <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '60px', background: 'rgba(255,255,255,0.06)', transform: 'skewX(-12deg) translateX(12px)' }} />
      <div style={{ position: 'absolute', top: 0, right: '16px', bottom: 0, width: '20px', background: 'rgba(255,255,255,0.04)', transform: 'skewX(-12deg)' }} />

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '5px', position: 'relative' }}>
        <div>
          <div style={{ fontSize: '3.5px', fontWeight: 700, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '2px' }}>Most Requested</div>
          <div style={{ fontSize: '9px', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1 }}>Windshield Replacement</div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontSize: '10px', fontWeight: 900, color: '#fff', lineHeight: 1 }}>From $99</div>
          <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.7)', marginTop: '1px' }}>OEM-grade glass</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '4px' }}>
        {[['⚡', 'Same-Day'], ['✓', 'Lifetime Warranty'], ['◈', 'ADAS Safe']].map(([icon, label]) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '2.5px', padding: '2.5px 5px', background: 'rgba(255,255,255,0.18)', borderRadius: '3px', backdropFilter: 'blur(4px)' }}>
            <span style={{ fontSize: '5px', color: '#fff' }}>{icon}</span>
            <span style={{ fontSize: '3.5px', fontWeight: 700, color: '#fff', letterSpacing: '0.04em' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Compact service row — the remaining 3 services
function ServiceRow({ name, price, badge, desc, accent }: { name: string; price: string; badge?: string; desc: string; accent: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 0', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
      <div style={{ width: '3px', height: '24px', background: accent, borderRadius: '2px', flexShrink: 0, opacity: 0.6 }} />
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '1.5px' }}>
          <span style={{ fontSize: '6px', fontWeight: 800, color: '#0f0f0f', letterSpacing: '-0.01em' }}>{name}</span>
          {badge && (
            <span style={{ padding: '1px 4px', background: '#f0f7ff', borderRadius: '2px', fontSize: '3px', fontWeight: 700, color: accent }}>{badge}</span>
          )}
        </div>
        <div style={{ fontSize: '4px', color: '#6b7280', lineHeight: 1.4 }}>{desc}</div>
      </div>
      <div style={{ fontSize: '7px', fontWeight: 900, color: '#0f0f0f', flexShrink: 0 }}>{price}</div>
    </div>
  );
}

export function PhoneMeridianGlassServices({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />

      {/* Nav — minimal industrial header, left-heavy */}
      <div style={{ padding: '5px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.07)', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: '8px', fontWeight: 900, color: '#0a0a0a', letterSpacing: '0.06em' }}>MERIDIAN GLASS</div>
          <div style={{ fontSize: '4px', color: b.accent, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '1px' }}>Detroit Metro · Since 2009</div>
        </div>
        <div style={{ padding: '3px 7px', background: '#fef2f2', borderRadius: '3px', border: '1px solid #fecaca' }}>
          <div style={{ fontSize: '3.5px', fontWeight: 700, color: '#dc2626', letterSpacing: '0.06em' }}>24/7 EMERGENCY</div>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '9px 12px 8px' }}>
        {/* Section header */}
        <div style={{ marginBottom: '8px' }}>
          <div style={{ fontSize: '4.5px', color: '#9ca3af', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '1.5px' }}>What We Fix</div>
          <div style={{ fontSize: '14px', fontWeight: 900, color: '#0a0a0a', lineHeight: 1.0, letterSpacing: '-0.03em' }}>Our Services</div>
        </div>

        {/* Featured card */}
        <FeaturedCard accent={b.accent} />

        {/* Service rows */}
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <ServiceRow
            name="Chip & Crack Repair"
            price="From $49"
            badge="30 min"
            desc="Stop cracks from spreading — same-day calibration included"
            accent={b.accent}
          />
          <ServiceRow
            name="Side & Rear Glass"
            price="From $149"
            desc="Door, quarter, and back glass — all makes & models"
            accent={b.accent}
          />
          <ServiceRow
            name="ADAS Recalibration"
            price="From $79"
            badge="Required"
            desc="Camera & sensor re-cal after any windshield replacement"
            accent={b.accent}
          />
        </div>

        {/* Quote CTA */}
        <div style={{ marginTop: '8px' }}>
          <div style={{ padding: '8px 12px', background: b.accent, borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.75)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Free · No obligation</div>
              <div style={{ fontSize: '7px', fontWeight: 900, color: '#fff', letterSpacing: '-0.01em' }}>Get Your Quote →</div>
            </div>
            <div style={{ fontSize: '5.5px', fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>{b.phone}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
