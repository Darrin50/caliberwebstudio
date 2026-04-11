/**
 * Terrain — Services screen
 * Design language: EDITORIAL LANDSCAPE ARCHITECTURE / LUXURY
 * Score: 3 → 5. Replace emoji icon grid with an architectural services brief format.
 * Featured service: full design + install as hero card.
 * Each service: scope level + typical project size + complexity tag.
 * Process strip: Design → Install → Maintain (3-step horizontal).
 * No emoji. Reads like an architectural firm's capabilities page.
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

export function PhoneTerrainServices({ b }: { b: Biz }) {
  const services = [
    {
      name: 'Landscape Design + Install', scope: 'Full-service', size: '$25K–$200K+',
      tags: ['Custom Plans', 'Material Sourcing', 'Site Management'], featured: true,
      desc: 'Concept through completion — design drawings, plant selection, grading & install.',
    },
    {
      name: 'Premium Lawn Care', scope: 'Recurring', size: 'From $180/mo',
      tags: ['Weekly / Bi-weekly', 'Certified Arborists'], featured: false,
      desc: 'Fertilization, mowing, edging, weed control & seasonal turf programs.',
    },
    {
      name: 'Hardscaping', scope: 'Project-based', size: '$8K–$60K',
      tags: ['Patios', 'Fire Pits', 'Retaining Walls'], featured: false,
      desc: 'Paver patios, stone walls, outdoor kitchens & drainage systems.',
    },
    {
      name: 'Seasonal Programs', scope: 'Recurring', size: 'From $95/visit',
      tags: ['Spring Cleanup', 'Fall Prep', 'Winterize'], featured: false,
      desc: 'Spring/fall cleanups, mulching, planting rotations & winterizing.',
    },
  ];

  const steps = [
    { n: '01', label: 'Site Assessment' },
    { n: '02', label: 'Design + Plan' },
    { n: '03', label: 'Install' },
    { n: '04', label: 'Maintain' },
  ];

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
        <div style={{ marginBottom: '8px', flexShrink: 0 }}>
          <div style={{ fontSize: '4px', color: '#9ca3af', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '1.5px' }}>What We Do</div>
          <div style={{ fontSize: '14px', fontWeight: 900, color: '#0a0a0a', lineHeight: 1.0, letterSpacing: '-0.03em' }}>Our Services</div>
        </div>

        {/* Featured service */}
        <div style={{ padding: '9px 11px', background: b.accent, borderRadius: '6px', marginBottom: '6px', flexShrink: 0 }}>
          <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '2px' }}>Most Requested</div>
          <div style={{ fontSize: '9px', fontWeight: 900, color: '#fff', letterSpacing: '-0.01em', marginBottom: '3px' }}>Landscape Design + Install</div>
          <div style={{ fontSize: '4px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5, marginBottom: '5px' }}>Concept through completion — custom plans, plant sourcing, site management.</div>
          <div style={{ display: 'flex', gap: '3px' }}>
            {['Custom Plans', 'Full Project Mgmt', 'Material Sourcing'].map(t => (
              <div key={t} style={{ padding: '2px 5px', background: 'rgba(255,255,255,0.2)', borderRadius: '3px' }}>
                <span style={{ fontSize: '3px', color: '#fff', fontWeight: 600 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Remaining services */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '3px', marginBottom: '7px' }}>
          {services.slice(1).map(({ name, scope, size, tags }) => (
            <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '5px 7px', background: '#f9fafb', borderRadius: '4px', border: '1px solid rgba(0,0,0,0.07)', borderLeft: `3px solid ${b.accent}` }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '5.5px', fontWeight: 700, color: '#0a0a0a', marginBottom: '1.5px' }}>{name}</div>
                <div style={{ display: 'flex', gap: '3px' }}>
                  {tags.slice(0, 2).map(t => (
                    <span key={t} style={{ fontSize: '3px', color: '#9ca3af', padding: '1px 3px', background: '#f3f4f6', borderRadius: '2px' }}>{t}</span>
                  ))}
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: '5.5px', fontWeight: 800, color: '#0a0a0a' }}>{size}</div>
                <div style={{ fontSize: '3px', color: '#9ca3af', marginTop: '1px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{scope}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Process strip */}
        <div style={{ flexShrink: 0, padding: '6px 0', borderTop: '1px solid rgba(0,0,0,0.06)', marginBottom: '7px' }}>
          <div style={{ fontSize: '3.5px', color: '#9ca3af', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '5px' }}>Our Process</div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {steps.map((s, i) => (
              <>
                <div key={s.n} style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ fontSize: '4px', fontWeight: 900, color: b.accent, letterSpacing: '0.06em', marginBottom: '1.5px' }}>{s.n}</div>
                  <div style={{ fontSize: '4.5px', fontWeight: 600, color: '#374151' }}>{s.label}</div>
                </div>
                {i < steps.length - 1 && (
                  <div key={`a${i}`} style={{ width: '8px', height: '1px', background: `${b.accent}55`, flexShrink: 0 }} />
                )}
              </>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ marginTop: 'auto' }}>
          <div style={{ padding: '8px 12px', background: b.accent, borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: '7px', fontWeight: 900, color: '#fff' }}>Request Custom Quote →</div>
            <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.75)' }}>Free consult</div>
          </div>
        </div>
      </div>
    </div>
  );
}
