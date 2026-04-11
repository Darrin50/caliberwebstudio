/**
 * Apex Athletics — About screen
 * Design language: HIGH PERFORMANCE / ATHLETIC DARK
 * Score: 3 → 5. Breaks story paragraph + trainer cards + stat grid template.
 * Approach: credential-forward coach profiles with real accreditations.
 * Coaches listed with NSCA/CSCS certifications, specialty track records.
 * Facility features as a capabilities strip, not just "240+ members."
 * Energy comes from typography weight and red accent — not generic gym stock.
 */

interface Biz {
  id: string; accent: string; name: string; phone: string; bg: string;
}

function StatusBar() {
  const c = 'rgba(255,255,255,0.5)';
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

export function PhoneApexAbout({ b }: { b: Biz }) {
  const coaches = [
    {
      initial: 'J', name: 'Jordan Reeves', title: 'Head Coach', certs: ['CSCS', 'NSCA-CPT'],
      track: '8 yrs · 340+ clients', specialty: 'Strength & Power', sel: true,
    },
    {
      initial: 'T', name: 'Tyler Okafor', title: 'Performance Coach', certs: ['NSCA-CPT', 'FMS II'],
      track: '6 yrs · Sport-specific', specialty: 'Athletic Conditioning', sel: false,
    },
    {
      initial: 'A', name: 'Aisha Ware', title: 'Nutrition + Recovery', certs: ['CISSN', 'NASM-CNC'],
      track: '5 yrs · 180+ plans', specialty: 'Performance Nutrition', sel: false,
    },
  ];

  const facilities = ['8,000 sq ft', 'Olympic Lifting', 'Recovery Suite', 'Film Room', 'Turf Track', 'Open 5AM–10PM'];

  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />

      {/* Nav */}
      <div style={{ padding: '5px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: '8px', fontWeight: 900, color: '#fff', letterSpacing: '0.1em' }}>APEX ATHLETICS</div>
          <div style={{ fontSize: '4px', color: b.accent, letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: '1px' }}>Performance · Southfield · Est. 2016</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5px' }}>
          {[14, 10].map((w, i) => <div key={i} style={{ width: `${w}px`, height: '1.5px', background: 'rgba(255,255,255,0.35)', borderRadius: '1px' }} />)}
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '9px 12px 8px' }}>

        {/* Manifesto */}
        <div style={{ marginBottom: '9px', flexShrink: 0 }}>
          <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '4px', fontFamily: 'monospace' }}>Built Different. Since 2016.</div>
          <div style={{ fontSize: '16px', fontWeight: 900, color: '#fff', lineHeight: 0.95, letterSpacing: '-0.03em' }}>
            Elite<br />Coaching.<br /><span style={{ color: b.accent }}>Real Results.</span>
          </div>
        </div>

        {/* Coach profiles with credentials */}
        <div style={{ marginBottom: '8px', flexShrink: 0 }}>
          <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '5px' }}>Coaching Staff</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {coaches.map(({ initial, name, title, certs, track, specialty, sel }) => (
              <div key={name} style={{
                display: 'flex', alignItems: 'flex-start', gap: '7px', padding: '6px 8px',
                background: sel ? `${b.accent}18` : 'rgba(255,255,255,0.04)',
                borderRadius: '5px',
                border: sel ? `1px solid ${b.accent}44` : '1px solid rgba(255,255,255,0.07)',
              }}>
                <div style={{
                  width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0,
                  background: sel ? b.accent : 'rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontSize: '8px', fontWeight: 900, color: sel ? '#fff' : 'rgba(255,255,255,0.5)' }}>{initial}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '1px' }}>
                    <span style={{ fontSize: '5.5px', fontWeight: 800, color: sel ? '#fff' : 'rgba(255,255,255,0.8)' }}>{name}</span>
                  </div>
                  <div style={{ fontSize: '3.5px', color: sel ? b.accent : 'rgba(255,255,255,0.35)', marginBottom: '2.5px' }}>{title} · {specialty}</div>
                  {/* Cert badges */}
                  <div style={{ display: 'flex', gap: '2.5px', marginBottom: '2px' }}>
                    {certs.map(cert => (
                      <span key={cert} style={{ fontSize: '3px', padding: '1.5px 4px', background: sel ? `${b.accent}22` : 'rgba(255,255,255,0.06)', borderRadius: '2px', color: sel ? b.accent : 'rgba(255,255,255,0.4)', fontWeight: 700 }}>{cert}</span>
                    ))}
                  </div>
                  <div style={{ fontSize: '3px', color: 'rgba(255,255,255,0.25)' }}>{track}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Facility features */}
        <div style={{ marginBottom: '8px', flexShrink: 0 }}>
          <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '4px' }}>The Facility</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
            {facilities.map(f => (
              <div key={f} style={{ padding: '3px 6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ fontSize: '4px', color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ marginTop: 'auto' }}>
          <div style={{ padding: '8px 12px', background: b.accent, borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: '7px', fontWeight: 900, color: '#fff' }}>Start Free Trial →</div>
            <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.7)' }}>No commitment</div>
          </div>
        </div>
      </div>
    </div>
  );
}
