/**
 * Terrain — User flow: See Our Work → Request Consultation → Consultation Scheduled
 */

interface Biz {
  id: string; accent: string; name: string; phone: string; bg: string; theme: 'dark' | 'light';
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

function Step1({ b }: { b: Biz }) {
  const projects = [
    { name: 'Bloomfield Estate', type: 'Full Design + Install', budget: '$185K', tag: 'Featured' },
    { name: 'Grosse Pointe Terrace', type: 'Hardscape + Water Feature', budget: '$62K', tag: null },
    { name: 'Oakland County', type: 'Annual Maintenance', budget: '$2,400/yr', tag: null },
    { name: 'Birmingham Courtyard', type: 'Urban Garden Design', budget: '$44K', tag: 'Award' },
  ];
  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <div style={{ padding: '5px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.07)', flexShrink: 0 }}>
        <div style={{ fontSize: '8px', fontWeight: 900, color: '#0a0a0a', letterSpacing: '0.08em' }}>TERRAIN</div>
        <div style={{ fontSize: '4px', color: b.accent, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Our Work</div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', padding: '8px 12px 8px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '13px', fontWeight: 900, color: '#0a0a0a', letterSpacing: '-0.03em', marginBottom: '8px', flexShrink: 0 }}>Recent Projects</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px', flex: 1, overflow: 'hidden' }}>
          {projects.map(p => (
            <div key={p.name} style={{ background: '#f9fafb', borderRadius: '5px', border: '1px solid rgba(0,0,0,0.07)', overflow: 'hidden' }}>
              <div style={{ height: '50px', background: `linear-gradient(135deg, ${b.accent}22, ${b.accent}08)`, borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {p.tag && <div style={{ padding: '2px 5px', background: b.accent, borderRadius: '2px' }}><span style={{ fontSize: '3px', color: '#fff', fontWeight: 700 }}>{p.tag}</span></div>}
              </div>
              <div style={{ padding: '5px' }}>
                <div style={{ fontSize: '4.5px', fontWeight: 700, color: '#0a0a0a', marginBottom: '2px', lineHeight: 1.2 }}>{p.name}</div>
                <div style={{ fontSize: '3px', color: '#9ca3af', marginBottom: '2px' }}>{p.type}</div>
                <div style={{ fontSize: '4px', fontWeight: 700, color: b.accent }}>{p.budget}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '8px', padding: '7px 10px', background: b.accent, borderRadius: '4px', textAlign: 'center', fontSize: '6px', fontWeight: 900, color: '#fff', flexShrink: 0 }}>
          Request Consultation →
        </div>
      </div>
    </div>
  );
}

function Step2({ b }: { b: Biz }) {
  const types = ['Residential', 'Estate / Multi-acre', 'Commercial', 'HOA / Community'];
  const scopes = [
    { label: 'Full Design + Install', size: '$25K–$200K+' },
    { label: 'Hardscaping Only', size: '$8K–$60K' },
    { label: 'Premium Lawn Care', size: 'From $180/mo' },
    { label: 'Seasonal Programs', size: 'From $95/visit' },
  ];
  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <div style={{ padding: '5px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.07)', flexShrink: 0 }}>
        <div style={{ fontSize: '8px', fontWeight: 900, color: '#0a0a0a', letterSpacing: '0.08em' }}>TERRAIN</div>
        <div style={{ padding: '2.5px 7px', background: `${b.accent}12`, borderRadius: '3px', border: `1px solid ${b.accent}33` }}>
          <span style={{ fontSize: '3.5px', fontWeight: 700, color: b.accent }}>FREE CONSULT</span>
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', padding: '8px 12px 8px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '12px', fontWeight: 900, color: '#0a0a0a', letterSpacing: '-0.03em', marginBottom: '7px', flexShrink: 0 }}>Tell Us About<br />Your Space</div>

        <div style={{ marginBottom: '7px', flexShrink: 0 }}>
          <div style={{ fontSize: '4px', color: '#9ca3af', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '3px' }}>Property Type</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px' }}>
            {types.map((t, i) => (
              <div key={t} style={{ padding: '5px 6px', background: i === 0 ? `${b.accent}12` : '#f9fafb', borderRadius: '4px', border: `1px solid ${i === 0 ? b.accent + '44' : 'rgba(0,0,0,0.07)'}`, fontSize: '4px', fontWeight: i === 0 ? 700 : 400, color: i === 0 ? b.accent : '#6b7280', textAlign: 'center' }}>{t}</div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, overflow: 'hidden' }}>
          <div style={{ fontSize: '4px', color: '#9ca3af', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '3px' }}>Service Scope</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {scopes.map((s, i) => (
              <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 8px', background: i === 0 ? `${b.accent}08` : '#f9fafb', borderRadius: '4px', border: `1px solid ${i === 0 ? b.accent + '33' : 'rgba(0,0,0,0.06)'}`, borderLeft: `3px solid ${i === 0 ? b.accent : 'rgba(0,0,0,0.08)'}` }}>
                <span style={{ fontSize: '4.5px', fontWeight: i === 0 ? 700 : 400, color: i === 0 ? '#0a0a0a' : '#6b7280' }}>{s.label}</span>
                <span style={{ fontSize: '4px', fontWeight: 700, color: i === 0 ? b.accent : '#9ca3af' }}>{s.size}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '7px', padding: '7px 10px', background: b.accent, borderRadius: '4px', textAlign: 'center', fontSize: '6px', fontWeight: 900, color: '#fff', flexShrink: 0 }}>
          Schedule Site Visit →
        </div>
      </div>
    </div>
  );
}

function Step3({ b }: { b: Biz }) {
  const next = [
    { n: '01', text: 'Site assessment — we\'ll walk the property' },
    { n: '02', text: 'Concept rendering + material palette' },
    { n: '03', text: 'Detailed proposal + timeline' },
  ];
  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <div style={{ padding: '5px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.07)', flexShrink: 0 }}>
        <div style={{ fontSize: '8px', fontWeight: 900, color: '#0a0a0a', letterSpacing: '0.08em' }}>TERRAIN</div>
        <div style={{ fontSize: '4px', color: '#22c55e', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Scheduled</div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', padding: '10px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: `${b.accent}15`, border: `2px solid ${b.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px', flexShrink: 0 }}>
          <span style={{ fontSize: '13px', color: b.accent, lineHeight: 1 }}>✓</span>
        </div>
        <div style={{ fontSize: '11px', fontWeight: 900, color: '#0a0a0a', letterSpacing: '-0.02em', marginBottom: '2px' }}>Consultation Scheduled</div>
        <div style={{ fontSize: '4px', color: '#9ca3af', marginBottom: '12px', textAlign: 'center' }}>Friday, April 18 · 10:00 AM</div>

        <div style={{ width: '100%', padding: '7px 10px', background: '#f9fafb', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.07)', marginBottom: '8px' }}>
          <div style={{ fontSize: '3.5px', color: '#9ca3af', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '5px' }}>What Happens Next</div>
          {next.map(item => (
            <div key={item.n} style={{ display: 'flex', gap: '6px', marginBottom: '5px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '4px', fontWeight: 900, color: b.accent, lineHeight: 1.4 }}>{item.n}</span>
              <span style={{ fontSize: '4px', color: '#374151', lineHeight: 1.4 }}>{item.text}</span>
            </div>
          ))}
        </div>

        <div style={{ width: '100%', padding: '5px 8px', background: `${b.accent}10`, borderRadius: '4px', border: `1px solid ${b.accent}22`, display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
          <span style={{ fontSize: '4px', color: b.accent, fontWeight: 600 }}>Ryan Chen · Lead Designer</span>
        </div>
      </div>
    </div>
  );
}

export const TERRAIN_FLOW_LABELS: [string, string, string] = ['See Our Work', 'Request Consultation', 'Consultation Scheduled'];

export function PhoneTerrainFlowScreen({ b, step }: { b: Biz; step: 0 | 1 | 2 }) {
  if (step === 0) return <Step1 b={b} />;
  if (step === 1) return <Step2 b={b} />;
  return <Step3 b={b} />;
}
