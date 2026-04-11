/**
 * Studio 1908 — About screen
 * Design language: PREMIUM BARBERSHOP / EDITORIAL DARK
 * Breaks photo-fade → story paragraph → quote → stat grid template.
 * Approach: sports-roster layout for the barber team — credentials, not bios.
 * Left: brand manifesto as a design statement. Right: barber lineup as a real roster.
 * Philosophy as an oversized pull quote, not a side-border italic block.
 */

interface Biz {
  id: string; accent: string; name: string; phone: string; bg: string; philosophy: string;
}

function StatusBar() {
  const c = 'rgba(255,255,255,0.55)';
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

export function PhoneStudio1908About({ b }: { b: Biz }) {
  const roster = [
    { initial: 'M', name: 'Marcus Webb', title: 'Master Barber', since: "'14", specialties: ['Fades', 'Tapers', 'Bald Fade'], rating: '4.9', cuts: '3,200+' },
    { initial: 'D', name: 'DeShawn Cole', title: 'Senior Barber', since: "'17", specialties: ['Shaves', 'Lineups', 'Designs'], rating: '4.8', cuts: '2,100+' },
    { initial: 'R', name: 'Rico Vega', title: 'Barber', since: "'21", specialties: ['Cuts', 'Beards', 'Color'], rating: '4.9', cuts: '1,400+' },
  ];

  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />

      {/* Nav */}
      <div style={{ padding: '5px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: '8px', fontWeight: 900, color: '#fff', letterSpacing: '0.06em' }}>STUDIO 1908</div>
          <div style={{ fontSize: '4px', color: b.accent, letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: '1px' }}>Midtown Detroit · Est. 2014</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5px' }}>
          {[14, 10].map((w, i) => <div key={i} style={{ width: `${w}px`, height: '1.5px', background: 'rgba(255,255,255,0.35)', borderRadius: '1px' }} />)}
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '9px 12px 8px' }}>

        {/* Manifesto header */}
        <div style={{ marginBottom: '9px', flexShrink: 0 }}>
          <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '4px', fontFamily: 'monospace' }}>The Craft. Since 2014.</div>
          <div style={{ fontSize: '15px', fontWeight: 900, color: '#fff', lineHeight: 0.95, letterSpacing: '-0.03em' }}>
            Built on<br />Precision.<br /><span style={{ color: b.accent }}>No Shortcuts.</span>
          </div>
        </div>

        {/* Barber roster */}
        <div style={{ marginBottom: '8px', flexShrink: 0 }}>
          <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '5px' }}>The Barbers</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {roster.map(({ initial, name, title, since, specialties, rating, cuts }, i) => (
              <div key={name} style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 8px',
                background: i === 0 ? `${b.accent}15` : 'rgba(255,255,255,0.04)',
                borderRadius: '5px',
                border: i === 0 ? `1px solid ${b.accent}44` : '1px solid rgba(255,255,255,0.07)',
              }}>
                {/* Avatar */}
                <div style={{
                  width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0,
                  background: i === 0 ? b.accent : 'rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontSize: '8px', fontWeight: 900, color: i === 0 ? '#000' : 'rgba(255,255,255,0.6)' }}>{initial}</span>
                </div>
                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                    <span style={{ fontSize: '5.5px', fontWeight: 800, color: '#fff' }}>{name}</span>
                    <span style={{ fontSize: '3px', color: 'rgba(255,255,255,0.3)' }}>since {since}</span>
                  </div>
                  <div style={{ fontSize: '3.5px', color: b.accent, marginBottom: '2px', letterSpacing: '0.04em' }}>{title}</div>
                  <div style={{ display: 'flex', gap: '2.5px', flexWrap: 'nowrap', overflow: 'hidden' }}>
                    {specialties.map(s => (
                      <span key={s} style={{ fontSize: '3px', color: 'rgba(255,255,255,0.4)', padding: '1px 3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', flexShrink: 0 }}>{s}</span>
                    ))}
                  </div>
                </div>
                {/* Stats */}
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: '6px', fontWeight: 900, color: b.accent, lineHeight: 1 }}>★{rating}</div>
                  <div style={{ fontSize: '3px', color: 'rgba(255,255,255,0.3)', marginTop: '1px' }}>{cuts}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pull quote — oversized, not a side border */}
        <div style={{ padding: '7px 10px', background: 'rgba(255,255,255,0.03)', borderRadius: '5px', border: `1px solid ${b.accent}22`, marginBottom: '8px', flexShrink: 0 }}>
          <div style={{ fontSize: '3.5px', color: b.accent, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '3px' }}>Our Standard</div>
          <div style={{ fontSize: '5.5px', fontWeight: 700, color: 'rgba(255,255,255,0.8)', lineHeight: 1.55, fontStyle: 'italic' }}>&ldquo;Every detail matters. We don&apos;t rush greatness.&rdquo;</div>
        </div>

        {/* CTA */}
        <div style={{ marginTop: 'auto' }}>
          <div style={{ padding: '8px 12px', background: b.accent, borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: '7px', fontWeight: 900, color: '#000' }}>Book an Appointment →</div>
            <div style={{ fontSize: '5px', fontWeight: 700, color: 'rgba(0,0,0,0.45)' }}>{b.phone}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
