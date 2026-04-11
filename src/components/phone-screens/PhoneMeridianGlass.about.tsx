/**
 * Meridian Glass — About screen
 * Design language: INDUSTRIAL / UTILITARIAN — numbers, process, trust, not lifestyle.
 * Breaks the photo-fade-in → story paragraph → stat-grid → quote-block template.
 * Hero treatment: oversized install count stat + vehicle type selector.
 * Reads as real auto glass utility software, not a generic business site.
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

export function PhoneMeridianGlassAbout({ b }: { b: Biz }) {
  const vehicleTypes = ['Sedan', 'SUV', 'Truck', 'Van'];
  const trustSignals = [
    { mark: '◈', label: 'OEM-Grade Glass on Every Job', sub: 'Manufacturer spec, not aftermarket' },
    { mark: '■', label: 'Lifetime Warranty — No Exceptions', sub: 'Glass + labor, transferable on resale' },
    { mark: '▲', label: 'ADAS Recalibration Included', sub: 'Cameras & sensors re-aligned after install' },
  ];
  const steps = [
    { n: '01', label: 'Inspect' },
    { n: '02', label: 'Quote' },
    { n: '03', label: 'Install' },
  ];

  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />

      {/* Nav */}
      <div style={{ padding: '5px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.07)', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: '8px', fontWeight: 900, color: '#0a0a0a', letterSpacing: '0.06em' }}>MERIDIAN GLASS</div>
          <div style={{ fontSize: '4px', color: b.accent, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '1px' }}>Detroit Metro · Since 2009</div>
        </div>
        <div style={{ padding: '3px 7px', background: '#fef2f2', borderRadius: '3px', border: '1px solid #fecaca' }}>
          <div style={{ fontSize: '3.5px', fontWeight: 700, color: '#dc2626' }}>24/7 EMERGENCY</div>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '10px 12px 8px' }}>

        {/* HERO STAT — dramatic oversized number, not a paragraph */}
        <div style={{ paddingBottom: '10px', borderBottom: '1px solid rgba(0,0,0,0.06)', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px', marginBottom: '2px' }}>
            <span style={{ fontSize: '28px', fontWeight: 900, color: b.accent, lineHeight: 1, letterSpacing: '-0.04em' }}>10,247</span>
          </div>
          <div style={{ fontSize: '6px', fontWeight: 700, color: '#0a0a0a', letterSpacing: '0.01em', marginBottom: '3px' }}>Windshields Installed Across Metro Detroit</div>
          <div style={{ fontSize: '4px', color: '#9ca3af', letterSpacing: '0.12em', textTransform: 'uppercase' }}>15 Years · 5★ Rating · Lifetime Warranty</div>
        </div>

        {/* VEHICLE TYPE SELECTOR — utility widget that feels like real software */}
        <div style={{ marginBottom: '9px' }}>
          <div style={{ fontSize: '4px', color: '#9ca3af', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '4px' }}>We Service All Vehicle Types</div>
          <div style={{ display: 'flex', gap: '4px' }}>
            {vehicleTypes.map((v, i) => (
              <div key={v} style={{
                flex: 1,
                padding: '5px 2px',
                textAlign: 'center',
                borderRadius: '4px',
                border: `1px solid ${i === 1 ? b.accent : 'rgba(0,0,0,0.09)'}`,
                background: i === 1 ? `${b.accent}0f` : '#fafafa',
              }}>
                <div style={{ fontSize: '4.5px', fontWeight: i === 1 ? 800 : 500, color: i === 1 ? b.accent : '#6b7280' }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* TRUST SIGNALS — clean rows, no emoji */}
        <div style={{ marginBottom: '9px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {trustSignals.map(({ mark, label, sub }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: '7px' }}>
              <div style={{ width: '16px', height: '16px', background: b.accent, borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                <span style={{ fontSize: '6px', color: '#fff', lineHeight: 1 }}>{mark}</span>
              </div>
              <div>
                <div style={{ fontSize: '5.5px', fontWeight: 700, color: '#0a0a0a', lineHeight: 1.2, marginBottom: '1px' }}>{label}</div>
                <div style={{ fontSize: '3.5px', color: '#9ca3af', lineHeight: 1.4 }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* PROCESS STRIP — horizontal numbered flow */}
        <div style={{ marginBottom: '8px', padding: '8px 0', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <div style={{ fontSize: '4px', color: '#9ca3af', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '6px' }}>How It Works</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
            {steps.map((s, i) => (
              <>
                <div key={s.n} style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ fontSize: '4px', fontWeight: 900, color: b.accent, letterSpacing: '0.08em', marginBottom: '2px' }}>{s.n}</div>
                  <div style={{ fontSize: '5.5px', fontWeight: 700, color: '#0a0a0a' }}>{s.label}</div>
                </div>
                {i < steps.length - 1 && (
                  <div key={`arr-${i}`} style={{ width: '12px', height: '1px', background: `linear-gradient(to right, ${b.accent}88, ${b.accent}44)`, flexShrink: 0 }} />
                )}
              </>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ marginTop: 'auto', padding: '8px 12px', background: b.accent, borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '7px', fontWeight: 900, color: '#fff' }}>Schedule Today →</div>
          <div style={{ fontSize: '5px', fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>{b.phone}</div>
        </div>
      </div>
    </div>
  );
}
