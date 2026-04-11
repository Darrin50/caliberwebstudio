/**
 * Prime Home — About screen
 * Design language: TRUSTWORTHY / INSTITUTIONAL — like a real licensed contractor's profile.
 * Breaks the "no photo, just badges + stat grid + CTA" template entirely.
 * Hero: founder/team photo with credential overlay panel.
 * Layout: split — photo context top, vertical credential timeline bottom.
 * Every element communicates legitimacy, not lifestyle.
 * Distinctly different from Meridian Glass About (industrial utility) and all others.
 */

interface Biz {
  id: string; accent: string; name: string; phone: string; aboutPhoto?: string;
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

export function PhonePrimeHomeAbout({ b }: { b: Biz }) {
  const credentials = [
    { year: '2008', event: 'Founded by Marcus Delgado, Master Plumber License #MP-3847' },
    { year: '2012', event: 'BBB Accreditation — A+ Rating maintained for 12 consecutive years' },
    { year: '2016', event: 'Expanded to full HVAC service — certified technicians on staff' },
    { year: '2024', event: '2,100+ service calls completed across Metro Detroit' },
  ];

  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />

      {/* Nav */}
      <div style={{ padding: '5px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.07)', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: '8px', fontWeight: 900, color: '#0a0a0a', letterSpacing: '0.05em' }}>PRIME HOME</div>
          <div style={{ fontSize: '4px', color: b.accent, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '1px' }}>Licensed · Bonded · Insured</div>
        </div>
        <div style={{ padding: '3px 6px', background: `${b.accent}15`, borderRadius: '3px', border: `1px solid ${b.accent}44` }}>
          <div style={{ fontSize: '3.5px', fontWeight: 700, color: b.accent }}>OPEN 24/7</div>
        </div>
      </div>

      {/* PHOTO HERO — real photo with credential overlay, not a fade-out template */}
      <div style={{ height: '90px', flexShrink: 0, position: 'relative', overflow: 'hidden', background: '#0c1e32' }}>
        <img
          src={(b as { aboutPhoto?: string }).aboutPhoto ?? '/images/phone-home-services.png'}
          alt="Prime Home crew"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
        />
        {/* Left-side dark panel — credential anchor, not a generic gradient */}
        <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '45%', background: 'linear-gradient(to right, rgba(10,20,40,0.95), rgba(10,20,40,0.6))' }} />

        {/* Credential stack in dark panel */}
        <div style={{ position: 'absolute', top: '10px', left: '10px', bottom: '10px', width: '38%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '2px' }}>Est. 2008</div>
            <div style={{ fontSize: '9px', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1 }}>Prime Home</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {['Licensed', 'Bonded', 'Insured'].map(badge => (
              <div key={badge} style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: b.accent, flexShrink: 0 }} />
                <span style={{ fontSize: '4px', fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>{badge}</span>
              </div>
            ))}
          </div>
        </div>

        {/* KPI chip floating on photo side */}
        <div style={{ position: 'absolute', bottom: '8px', right: '10px', background: 'rgba(255,255,255,0.95)', borderRadius: '4px', padding: '4px 7px' }}>
          <div style={{ fontSize: '9px', fontWeight: 900, color: b.accent, lineHeight: 1 }}>2,100+</div>
          <div style={{ fontSize: '3px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Jobs Done</div>
        </div>
      </div>

      {/* CREDENTIAL TIMELINE — shows history, not just a static badge list */}
      <div style={{ flex: 1, overflow: 'hidden', padding: '8px 12px 8px' }}>
        <div style={{ fontSize: '4px', color: '#9ca3af', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '7px' }}>Our Track Record</div>

        <div style={{ position: 'relative', paddingLeft: '14px' }}>
          {/* vertical timeline line */}
          <div style={{ position: 'absolute', left: '4px', top: '4px', bottom: '4px', width: '1px', background: `linear-gradient(to bottom, ${b.accent}, ${b.accent}22)` }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
            {credentials.map(({ year, event }) => (
              <div key={year} style={{ position: 'relative', display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
                {/* timeline dot */}
                <div style={{ position: 'absolute', left: '-11px', top: '3px', width: '5px', height: '5px', borderRadius: '50%', background: b.accent, border: '1.5px solid #fff', boxSizing: 'border-box' }} />
                <div>
                  <div style={{ fontSize: '4px', fontWeight: 800, color: b.accent, letterSpacing: '0.06em', marginBottom: '1px' }}>{year}</div>
                  <div style={{ fontSize: '4.5px', color: '#374151', lineHeight: 1.5 }}>{event}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '0 12px 10px', flexShrink: 0 }}>
        <div style={{ padding: '8px 12px', background: b.accent, borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '7px', fontWeight: 900, color: '#fff' }}>Get a Free Estimate →</div>
          <div style={{ fontSize: '5px', fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>{b.phone}</div>
        </div>
      </div>
    </div>
  );
}
