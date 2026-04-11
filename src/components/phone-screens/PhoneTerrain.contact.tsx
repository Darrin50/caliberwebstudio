/**
 * Terrain — Contact / Project Intake screen
 * Design language: EDITORIAL / LUXURY LANDSCAPING
 * Project questionnaire: property type → scope → budget range → timeline.
 * Feels like an architect's intake form, not a generic "name + message" contact page.
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

export function PhoneTerrainContact({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />

      {/* Nav */}
      <div style={{ padding: '5px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.07)', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: '8px', fontWeight: 900, color: '#0a0a0a', letterSpacing: '0.08em' }}>TERRAIN</div>
          <div style={{ fontSize: '4px', color: b.accent, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '1px' }}>Landscape Architecture</div>
        </div>
        <div style={{ padding: '3px 7px', background: `${b.accent}12`, borderRadius: '3px', border: `1px solid ${b.accent}33` }}>
          <div style={{ fontSize: '3.5px', fontWeight: 700, color: b.accent }}>FREE CONSULT</div>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '9px 12px 8px' }}>

        {/* Header */}
        <div style={{ marginBottom: '9px' }}>
          <div style={{ fontSize: '4px', color: '#9ca3af', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '2px' }}>Project Questionnaire</div>
          <div style={{ fontSize: '14px', fontWeight: 900, color: '#0a0a0a', letterSpacing: '-0.03em', lineHeight: 1 }}>Tell Us<br />About Your<br />Property</div>
        </div>

        {/* Property type */}
        <div style={{ marginBottom: '8px' }}>
          <div style={{ fontSize: '3.5px', color: '#9ca3af', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '4px' }}>Property Type</div>
          <div style={{ display: 'flex', gap: '4px' }}>
            {[['Residential', true], ['Commercial', false], ['Estate', false]].map(([label, sel]) => (
              <div key={String(label)} style={{
                flex: 1, padding: '6px 4px', textAlign: 'center', borderRadius: '4px',
                background: sel ? `${b.accent}12` : '#f9fafb',
                border: sel ? `1.5px solid ${b.accent}` : '1px solid rgba(0,0,0,0.08)',
              }}>
                <div style={{ fontSize: '5px', fontWeight: sel ? 800 : 500, color: sel ? b.accent : '#6b7280' }}>{String(label)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scope */}
        <div style={{ marginBottom: '8px' }}>
          <div style={{ fontSize: '3.5px', color: '#9ca3af', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '4px' }}>Project Scope</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {[
              { label: 'Full Design + Install', sub: 'New landscape or complete redesign', sel: true },
              { label: 'Design Only', sub: 'Plans + drawings for self-install', sel: false },
              { label: 'Ongoing Maintenance', sub: 'Weekly or seasonal care programs', sel: false },
              { label: 'Hardscaping', sub: 'Patio, walls, driveway, water features', sel: false },
            ].map(({ label, sub, sel }) => (
              <div key={label} style={{
                padding: '5px 8px',
                borderRadius: '4px',
                background: sel ? `${b.accent}0f` : '#f9fafb',
                border: sel ? `1px solid ${b.accent}66` : '1px solid rgba(0,0,0,0.06)',
                display: 'flex', alignItems: 'center', gap: '7px',
              }}>
                <div style={{
                  width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0,
                  background: sel ? b.accent : '#e5e7eb',
                  border: sel ? 'none' : '1.5px solid #d1d5db',
                }} />
                <div>
                  <div style={{ fontSize: '5px', fontWeight: sel ? 700 : 500, color: sel ? '#0a0a0a' : '#374151' }}>{label}</div>
                  <div style={{ fontSize: '3px', color: '#9ca3af', marginTop: '0.5px' }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget + Timeline row */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '3.5px', color: '#9ca3af', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '3px' }}>Budget Range</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5px' }}>
              {[['$10K–$25K', false], ['$25K–$75K', true], ['$75K+', false]].map(([label, sel]) => (
                <div key={String(label)} style={{
                  padding: '4px 6px', borderRadius: '3px',
                  background: sel ? `${b.accent}12` : '#f9fafb',
                  border: sel ? `1px solid ${b.accent}55` : '1px solid rgba(0,0,0,0.07)',
                }}>
                  <div style={{ fontSize: '4.5px', fontWeight: sel ? 800 : 500, color: sel ? b.accent : '#6b7280' }}>{String(label)}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '3.5px', color: '#9ca3af', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '3px' }}>Timeline</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5px' }}>
              {[['ASAP', false], ['1–3 Months', true], ['This Season', false]].map(([label, sel]) => (
                <div key={String(label)} style={{
                  padding: '4px 6px', borderRadius: '3px',
                  background: sel ? `${b.accent}12` : '#f9fafb',
                  border: sel ? `1px solid ${b.accent}55` : '1px solid rgba(0,0,0,0.07)',
                }}>
                  <div style={{ fontSize: '4.5px', fontWeight: sel ? 800 : 500, color: sel ? b.accent : '#6b7280' }}>{String(label)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ marginTop: 'auto' }}>
          <div style={{ padding: '8px 12px', background: b.accent, borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em' }}>No commitment · Free consultation</div>
              <div style={{ fontSize: '7.5px', fontWeight: 900, color: '#fff' }}>Schedule a Site Visit →</div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '5px', fontSize: '4px', color: '#9ca3af' }}>or call {b.phone}</div>
        </div>

      </div>
    </div>
  );
}
