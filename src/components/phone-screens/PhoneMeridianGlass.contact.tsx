/**
 * Meridian Glass — Contact / Vehicle Intake screen
 * Design language: INDUSTRIAL / UTILITARIAN
 * Vehicle damage intake: make/model/year → damage type visual selector → service address.
 * Feels like a real mobile glass service intake form, not a generic contact form.
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

export function PhoneMeridianGlassContact({ b }: { b: Biz }) {
  const damageTypes = [
    { label: 'Chip / Crack', sub: '< 6 inches', icon: '◈', sel: true },
    { label: 'Full Replace', sub: 'Windshield', icon: '▬', sel: false },
    { label: 'Side / Rear', sub: 'Door glass', icon: '◻', sel: false },
    { label: 'ADAS Recal', sub: 'After install', icon: '◉', sel: false },
  ];

  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />

      {/* Nav */}
      <div style={{ padding: '5px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.07)', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: '8px', fontWeight: 900, color: '#0a0a0a', letterSpacing: '0.06em' }}>MERIDIAN GLASS</div>
          <div style={{ fontSize: '4px', color: b.accent, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '1px' }}>Free Mobile Service</div>
        </div>
        <div style={{ padding: '3px 7px', background: '#fef2f2', borderRadius: '3px', border: '1px solid #fecaca' }}>
          <div style={{ fontSize: '3.5px', fontWeight: 700, color: '#dc2626' }}>24/7 EMERGENCY</div>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '9px 12px 8px' }}>

        {/* Progress bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '9px' }}>
          {[['1', 'Vehicle', true], ['2', 'Damage', true], ['3', 'Location', false]].map(([n, label, done], i, arr) => (
            <>
              <div key={String(n)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                <div style={{
                  width: '14px', height: '14px', borderRadius: '50%',
                  background: done ? b.accent : '#f3f4f6',
                  border: done ? 'none' : '1px solid #e5e7eb',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontSize: '5.5px', fontWeight: 900, color: done ? '#fff' : '#9ca3af' }}>{String(n)}</span>
                </div>
                <span style={{ fontSize: '3px', color: done ? b.accent : '#9ca3af', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: done ? 700 : 400 }}>{String(label)}</span>
              </div>
              {i < arr.length - 1 && (
                <div key={`line-${i}`} style={{ flex: 1, height: '1px', background: done ? b.accent : '#e5e7eb', marginBottom: '10px' }} />
              )}
            </>
          ))}
        </div>

        {/* Vehicle info strip */}
        <div style={{ padding: '7px 9px', background: '#f8faff', border: `1px solid ${b.accent}22`, borderRadius: '5px', marginBottom: '9px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '3.5px', color: '#9ca3af', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1px' }}>Your Vehicle</div>
            <div style={{ fontSize: '7.5px', fontWeight: 900, color: '#0a0a0a', letterSpacing: '-0.01em' }}>2022 Ford F-150</div>
          </div>
          <div style={{ fontSize: '3.5px', color: b.accent, fontWeight: 700, letterSpacing: '0.06em', cursor: 'pointer' }}>CHANGE</div>
        </div>

        {/* Damage type grid */}
        <div style={{ marginBottom: '9px' }}>
          <div style={{ fontSize: '3.5px', color: '#9ca3af', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '5px' }}>What Needs Repair?</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
            {damageTypes.map(({ label, sub, icon, sel }) => (
              <div key={label} style={{
                padding: '7px 8px',
                borderRadius: '5px',
                background: sel ? `${b.accent}0f` : '#f9fafb',
                border: sel ? `1.5px solid ${b.accent}` : '1px solid rgba(0,0,0,0.08)',
                display: 'flex', alignItems: 'center', gap: '6px',
              }}>
                <div style={{
                  width: '16px', height: '16px', borderRadius: '3px',
                  background: sel ? b.accent : '#e5e7eb',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <span style={{ fontSize: '7px', color: sel ? '#fff' : '#9ca3af', lineHeight: 1 }}>{icon}</span>
                </div>
                <div>
                  <div style={{ fontSize: '5.5px', fontWeight: 700, color: sel ? '#0a0a0a' : '#374151', lineHeight: 1.2 }}>{label}</div>
                  <div style={{ fontSize: '3.5px', color: '#9ca3af', marginTop: '0.5px' }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Address field */}
        <div style={{ marginBottom: '8px' }}>
          <div style={{ fontSize: '3.5px', color: '#9ca3af', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '4px' }}>Service Location — We Come to You</div>
          <div style={{ padding: '7px 9px', background: '#f9fafb', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ fontSize: '8px', color: '#d1d5db', flexShrink: 0 }}>◎</div>
            <div style={{ fontSize: '6px', color: '#d1d5db' }}>Enter your address or zip code</div>
          </div>
        </div>

        {/* Insurance note */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 8px', background: '#f0fdf4', borderRadius: '4px', marginBottom: '7px', border: '1px solid #bbf7d0' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
          <div style={{ fontSize: '4px', color: '#166534', fontWeight: 600 }}>Most repairs covered by insurance — zero out-of-pocket</div>
        </div>

        {/* CTA */}
        <div style={{ marginTop: 'auto' }}>
          <div style={{ padding: '8px 12px', background: b.accent, borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: '7.5px', fontWeight: 900, color: '#fff' }}>Get Free Quote →</div>
            <div style={{ fontSize: '4.5px', fontWeight: 700, color: 'rgba(255,255,255,0.75)' }}>Same-Day Available</div>
          </div>
        </div>

      </div>
    </div>
  );
}
