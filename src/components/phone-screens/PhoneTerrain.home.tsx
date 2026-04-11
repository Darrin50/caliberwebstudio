/**
 * Terrain — Home screen
 * Design language: EDITORIAL LANDSCAPE ARCHITECTURE / LUXURY
 * Breaks full-bleed photo + gradient + chips template entirely.
 * Split layout: dark editorial left panel (60%) + constrained photo card (40%).
 * Left panel: oversized typography + project type pills + consultation CTA.
 * Reads as a landscape architecture firm's site — Houzz meets Dezeen, not a lawn service.
 */

interface Biz {
  id: string; accent: string; name: string; phone: string;
  heroPhoto: string;
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

export function PhoneTerrainHome({ b }: { b: Biz }) {
  const projectTypes = ['Residential', 'Hardscape', 'Commercial', 'Seasonal'];

  return (
    <div style={{ height: '100%', background: '#0c1a10', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />

      {/* Nav — minimal, editorial */}
      <div style={{ padding: '4px 12px 5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <div style={{ fontSize: '7px', fontWeight: 900, color: '#fff', letterSpacing: '0.12em' }}>TERRAIN</div>
        <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: b.accent }} />
          <span style={{ fontSize: '4px', color: b.accent, letterSpacing: '0.1em', fontWeight: 700 }}>BLOOMFIELD HILLS</span>
        </div>
      </div>

      {/* SPLIT BODY */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', gap: '0' }}>

        {/* LEFT — editorial typography panel */}
        <div style={{ flex: '0 0 55%', display: 'flex', flexDirection: 'column', padding: '10px 0 10px 12px', justifyContent: 'space-between' }}>

          {/* Overline */}
          <div>
            <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '5px', fontFamily: 'monospace' }}>
              Est. 2011 — Since 2011
            </div>
            {/* Oversized headline */}
            <div style={{ fontSize: '24px', fontWeight: 900, color: '#fff', lineHeight: 0.95, letterSpacing: '-0.04em', marginBottom: '8px' }}>
              Archi<br />tected<br />
              <span style={{ color: b.accent }}>Out</span><br />doors
            </div>
            <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, marginBottom: '10px' }}>
              Luxury landscape environments<br />for Metro Detroit estates.
            </div>
          </div>

          {/* Project type pills — vertical list, architectural */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginBottom: '10px' }}>
            {projectTypes.map((type, i) => (
              <div key={type} style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                padding: '4px 0',
                borderBottom: i < projectTypes.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: i === 0 ? b.accent : 'rgba(255,255,255,0.2)', flexShrink: 0 }} />
                <span style={{ fontSize: '5px', color: i === 0 ? '#fff' : 'rgba(255,255,255,0.45)', fontWeight: i === 0 ? 700 : 400 }}>{type}</span>
                {i === 0 && <span style={{ fontSize: '3.5px', color: b.accent, letterSpacing: '0.08em', marginLeft: 'auto' }}>SELECTED</span>}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ padding: '6px 9px', background: b.accent, borderRadius: '4px' }}>
            <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5px' }}>Free Consultation</div>
            <div style={{ fontSize: '6px', fontWeight: 900, color: '#fff' }}>Start Your Project →</div>
          </div>
        </div>

        {/* RIGHT — constrained photo stack */}
        <div style={{ flex: '0 0 45%', display: 'flex', flexDirection: 'column', gap: '4px', padding: '6px 8px 10px 4px' }}>
          {/* Main photo card */}
          <div style={{ flex: 2, borderRadius: '6px', overflow: 'hidden', position: 'relative', background: '#1a2e1a' }}>
            <img
              src={b.heroPhoto}
              alt="Terrain landscape project"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            {/* Project label overlay */}
            <div style={{ position: 'absolute', bottom: '6px', left: '6px', right: '6px' }}>
              <div style={{ padding: '3px 5px', background: 'rgba(0,0,0,0.65)', borderRadius: '3px', backdropFilter: 'blur(4px)' }}>
                <div style={{ fontSize: '3px', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>FEATURED PROJECT</div>
                <div style={{ fontSize: '4.5px', fontWeight: 700, color: '#fff' }}>Bloomfield Estate</div>
              </div>
            </div>
          </div>

          {/* Stats strip */}
          <div style={{ flex: '0 0 auto', background: 'rgba(255,255,255,0.04)', borderRadius: '5px', padding: '6px', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {[['47+', 'Projects'], ['12', 'Yrs'], ['★4.9', 'Rating']].map(([v, l]) => (
                <div key={l} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '8px', fontWeight: 900, color: b.accent, lineHeight: 1, letterSpacing: '-0.02em' }}>{v}</div>
                  <div style={{ fontSize: '3px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '1px' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
