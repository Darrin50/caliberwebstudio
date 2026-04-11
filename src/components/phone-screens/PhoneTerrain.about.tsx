/**
 * Terrain — About screen
 * Design language: EDITORIAL LANDSCAPE ARCHITECTURE / LUXURY
 * Score: 2 → 5. Complete rebuild — no emoji credentials, no story paragraph, no stat grid.
 * Approach: architectural portfolio feature page.
 * Hero: one featured project card (constrained photo + project specs).
 * Body: founder statement as editorial typography + accolade list as clean certification rows.
 * Reads like Terrain's firm profile on Dezeen or Houzz.
 */

interface Biz {
  id: string; accent: string; name: string; phone: string; heroPhoto: string; philosophy: string;
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

export function PhoneTerrainAbout({ b }: { b: Biz }) {
  const credentials = [
    { mark: '▲', label: 'Michigan Landscape Assoc.', sub: 'Certified Professional Member' },
    { mark: '◈', label: 'ISA Certified Arborists', sub: 'Two on staff — tree assessment + care' },
    { mark: '■', label: 'BBB Accredited — A+', sub: 'Maintained since 2013' },
    { mark: '◎', label: 'Fully Licensed & Insured', sub: 'Michigan Residential Contractor' },
  ];

  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />

      {/* Nav */}
      <div style={{ padding: '5px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.07)', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: '8px', fontWeight: 900, color: '#0a0a0a', letterSpacing: '0.08em' }}>TERRAIN</div>
          <div style={{ fontSize: '4px', color: b.accent, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '1px' }}>Landscape Architecture · Est. 2011</div>
        </div>
        <div style={{ padding: '3px 7px', background: `${b.accent}12`, borderRadius: '3px', border: `1px solid ${b.accent}33` }}>
          <div style={{ fontSize: '3.5px', fontWeight: 700, color: b.accent }}>OUR WORK</div>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '9px 12px 8px' }}>

        {/* FEATURED PROJECT CARD */}
        <div style={{ borderRadius: '6px', overflow: 'hidden', position: 'relative', height: '80px', flexShrink: 0, marginBottom: '9px', background: '#1a2e1a' }}>
          <img
            src={b.heroPhoto}
            alt="Terrain featured project"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          {/* Bottom info overlay */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(12,26,18,0.88) 0%, transparent 55%)' }} />
          <div style={{ position: 'absolute', bottom: '7px', left: '9px', right: '9px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Featured Project</div>
              <div style={{ fontSize: '7px', fontWeight: 900, color: '#fff', letterSpacing: '-0.01em' }}>Bloomfield Estate Redesign</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '3px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>2.4 acres · $180K</div>
              <div style={{ fontSize: '3px', color: b.accent, fontWeight: 700 }}>COMPLETED 2025</div>
            </div>
          </div>
        </div>

        {/* Founder statement */}
        <div style={{ marginBottom: '9px', flexShrink: 0 }}>
          <div style={{ fontSize: '3.5px', color: '#9ca3af', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '3px' }}>Our Philosophy</div>
          <div style={{ fontSize: '12px', fontWeight: 900, color: '#0a0a0a', lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: '5px' }}>
            We don&apos;t<br />maintain yards.<br /><span style={{ color: b.accent }}>We architect</span><br />environments.
          </div>
        </div>

        {/* Credentials — clean rows, no emoji */}
        <div style={{ marginBottom: '8px', flexShrink: 0 }}>
          <div style={{ fontSize: '3.5px', color: '#9ca3af', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '4px' }}>Credentials</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {credentials.map(({ mark, label, sub }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '5px 7px', background: '#f9fafb', borderRadius: '4px', border: '1px solid rgba(0,0,0,0.06)' }}>
                <div style={{ width: '14px', height: '14px', borderRadius: '3px', background: `${b.accent}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: '6px', color: b.accent, lineHeight: 1 }}>{mark}</span>
                </div>
                <div>
                  <div style={{ fontSize: '5px', fontWeight: 700, color: '#0a0a0a', lineHeight: 1.2 }}>{label}</div>
                  <div style={{ fontSize: '3px', color: '#9ca3af', marginTop: '0.5px' }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ marginTop: 'auto' }}>
          <div style={{ padding: '8px 12px', background: b.accent, borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: '7px', fontWeight: 900, color: '#fff' }}>Schedule a Site Visit →</div>
            <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.75)' }}>Free consult</div>
          </div>
        </div>
      </div>
    </div>
  );
}
