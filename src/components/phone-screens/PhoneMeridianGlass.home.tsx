/**
 * Meridian Glass — Home screen (bump 4→5)
 * Design language: INDUSTRIAL / UTILITARIAN
 * The existing GlassHome is good — photo bg + repair type selector + emergency strip.
 * 4→5 bump: replace the emoji phone icon + generic repair type chips with a real vehicle quote tool.
 * Vehicle make/model selector as the dominant hero widget, not just 3 repair type pills.
 * Reads like a real mobile glass quoting app (Safelite-quality UI).
 */

interface Biz {
  id: string; accent: string; name: string; phone: string;
  heroPhoto: string;
}

function StatusBar() {
  const c = 'rgba(255,255,255,0.6)';
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

export function PhoneMeridianGlassHome({ b }: { b: Biz }) {
  const makes = ['Ford', 'Chevy', 'Toyota', 'Honda', 'RAM', 'BMW'];
  const damageTypes = [
    { icon: '◈', label: 'Chip/Crack', sub: '< 6 in', sel: true },
    { icon: '▬', label: 'Full Replace', sub: 'Windshield', sel: false },
    { icon: '◻', label: 'Side/Rear', sub: 'Door glass', sel: false },
  ];

  return (
    <div style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
      <img src={b.heroPhoto} alt="Meridian Glass" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      {/* Deep navy gradient — heavy at top and bottom */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,20,40,0.92) 0%, rgba(10,20,40,0.35) 38%, rgba(10,20,40,0.82) 65%, rgba(10,20,40,1) 100%)' }} />

      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <StatusBar />

        {/* Brand header */}
        <div style={{ padding: '5px 12px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: '8px', fontWeight: 900, color: '#fff', letterSpacing: '0.05em' }}>MERIDIAN GLASS</div>
            <div style={{ fontSize: '3.5px', color: b.accent, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '1px' }}>Same-Day · Detroit Metro · Since 2009</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22c55e' }} />
            <span style={{ fontSize: '3.5px', color: '#22c55e', fontWeight: 700 }}>Available</span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ padding: '8px 12px 0', flexShrink: 0 }}>
          <div style={{ fontSize: '4px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '3px' }}>Instant Quote</div>
          <div style={{ fontSize: '19px', fontWeight: 900, color: '#fff', lineHeight: 1.0, letterSpacing: '-0.03em', textShadow: '0 2px 16px rgba(0,0,0,0.5)' }}>Same-Day<br />Glass Repair</div>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* QUOTE WIDGET */}
        <div style={{ padding: '0 12px 8px', flexShrink: 0 }}>

          {/* Vehicle make strip */}
          <div style={{ marginBottom: '6px' }}>
            <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '4px' }}>Select Your Vehicle Make</div>
            <div style={{ display: 'flex', gap: '3px', flexWrap: 'nowrap', overflow: 'hidden' }}>
              {makes.map((make, i) => (
                <div key={make} style={{
                  flex: '0 0 auto',
                  padding: '4px 7px',
                  borderRadius: '4px',
                  background: i === 0 ? b.accent : 'rgba(255,255,255,0.08)',
                  border: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.12)',
                  fontSize: '5px',
                  fontWeight: i === 0 ? 800 : 500,
                  color: i === 0 ? '#fff' : 'rgba(255,255,255,0.65)',
                }}>{make}</div>
              ))}
            </div>
          </div>

          {/* Damage type */}
          <div style={{ marginBottom: '6px' }}>
            <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '4px' }}>Damage Type</div>
            <div style={{ display: 'flex', gap: '4px' }}>
              {damageTypes.map(({ icon, label, sub, sel }) => (
                <div key={label} style={{
                  flex: 1, padding: '5px 4px', borderRadius: '4px', textAlign: 'center',
                  background: sel ? `${b.accent}22` : 'rgba(255,255,255,0.06)',
                  border: sel ? `1.5px solid ${b.accent}` : '1px solid rgba(255,255,255,0.1)',
                }}>
                  <div style={{ fontSize: '8px', color: sel ? b.accent : 'rgba(255,255,255,0.4)', lineHeight: 1, marginBottom: '2px' }}>{icon}</div>
                  <div style={{ fontSize: '4.5px', fontWeight: sel ? 800 : 500, color: sel ? '#fff' : 'rgba(255,255,255,0.55)' }}>{label}</div>
                  <div style={{ fontSize: '3px', color: 'rgba(255,255,255,0.3)', marginTop: '1px' }}>{sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Insurance + CTA row */}
          <div style={{ display: 'flex', gap: '5px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flex: 1, padding: '6px 8px', background: 'rgba(34,197,94,0.12)', borderRadius: '5px', border: '1px solid rgba(34,197,94,0.25)' }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
              <span style={{ fontSize: '4px', color: 'rgba(255,255,255,0.8)', fontWeight: 600, lineHeight: 1.3 }}>Insurance<br />covered</span>
            </div>
            <div style={{ flex: 2, padding: '6px 10px', background: b.accent, borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.08em' }}>Same-day avail.</div>
                <div style={{ fontSize: '7px', fontWeight: 900, color: '#fff' }}>Get Free Quote →</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
