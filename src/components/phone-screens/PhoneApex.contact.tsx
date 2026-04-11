/**
 * Apex Athletics — Contact / Intake screen
 * Design language: HIGH PERFORMANCE / ATHLETIC DARK
 * Goal + program intake funnel: fitness goal → experience level → schedule preference → name/contact.
 * Reads as a real athlete onboarding flow, not a generic contact form.
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

export function PhoneApexContact({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />

      {/* Nav */}
      <div style={{ padding: '5px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: '8px', fontWeight: 900, color: '#fff', letterSpacing: '0.08em' }}>APEX</div>
          <div style={{ fontSize: '4px', color: b.accent, letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: '1px' }}>Start Training</div>
        </div>
        <div style={{ padding: '3px 6px', background: `${b.accent}22`, borderRadius: '3px', border: `1px solid ${b.accent}55` }}>
          <div style={{ fontSize: '3.5px', fontWeight: 700, color: b.accent }}>FREE TRIAL</div>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '8px 12px' }}>

        {/* Header */}
        <div style={{ marginBottom: '9px' }}>
          <div style={{ fontSize: '4px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '2px' }}>Athlete Profile</div>
          <div style={{ fontSize: '16px', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.0 }}>What's Your<br />Goal?</div>
        </div>

        {/* Fitness goal grid */}
        <div style={{ marginBottom: '8px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
            {[
              { label: 'Fat Loss', sub: 'Body recomp', icon: '◎', sel: true },
              { label: 'Build Strength', sub: 'Power + mass', icon: '▲', sel: false },
              { label: 'Athletic Perf', sub: 'Sport-specific', icon: '◈', sel: false },
              { label: 'Recovery', sub: 'Rehab + mobility', icon: '◻', sel: false },
            ].map(({ label, sub, icon, sel }) => (
              <div key={label} style={{
                padding: '7px 8px', borderRadius: '5px',
                background: sel ? `${b.accent}22` : 'rgba(255,255,255,0.04)',
                border: sel ? `1.5px solid ${b.accent}` : '1px solid rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', gap: '6px',
              }}>
                <div style={{
                  width: '16px', height: '16px', borderRadius: '3px', flexShrink: 0,
                  background: sel ? b.accent : 'rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontSize: '7px', color: sel ? '#fff' : 'rgba(255,255,255,0.4)', lineHeight: 1 }}>{icon}</span>
                </div>
                <div>
                  <div style={{ fontSize: '5.5px', fontWeight: 700, color: sel ? '#fff' : 'rgba(255,255,255,0.7)', lineHeight: 1.1 }}>{label}</div>
                  <div style={{ fontSize: '3px', color: 'rgba(255,255,255,0.3)', marginTop: '0.5px' }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience level */}
        <div style={{ marginBottom: '8px' }}>
          <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '4px' }}>Experience Level</div>
          <div style={{ display: 'flex', gap: '4px' }}>
            {[['Beginner', false], ['Intermediate', true], ['Elite', false]].map(([label, sel]) => (
              <div key={String(label)} style={{
                flex: 1, padding: '6px 4px', textAlign: 'center', borderRadius: '4px',
                background: sel ? b.accent : 'rgba(255,255,255,0.04)',
                border: sel ? 'none' : '1px solid rgba(255,255,255,0.08)',
              }}>
                <div style={{ fontSize: '5px', fontWeight: sel ? 900 : 500, color: sel ? '#fff' : 'rgba(255,255,255,0.5)' }}>{String(label)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule preference */}
        <div style={{ marginBottom: '8px' }}>
          <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '4px' }}>Preferred Schedule</div>
          <div style={{ display: 'flex', gap: '4px' }}>
            {[
              { label: 'Early AM', sub: '5–8 AM', sel: false },
              { label: 'Midday', sub: '11–2 PM', sel: true },
              { label: 'Evening', sub: '5–9 PM', sel: false },
              { label: 'Flexible', sub: 'Any time', sel: false },
            ].map(({ label, sub, sel }) => (
              <div key={label} style={{
                flex: 1, padding: '5px 0', textAlign: 'center', borderRadius: '4px',
                background: sel ? `${b.accent}22` : 'rgba(255,255,255,0.04)',
                border: sel ? `1px solid ${b.accent}66` : '1px solid rgba(255,255,255,0.08)',
              }}>
                <div style={{ fontSize: '4.5px', fontWeight: sel ? 800 : 500, color: sel ? b.accent : 'rgba(255,255,255,0.5)' }}>{label}</div>
                <div style={{ fontSize: '3px', color: 'rgba(255,255,255,0.25)', marginTop: '1px' }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact row */}
        <div style={{ display: 'flex', gap: '5px', marginBottom: '8px' }}>
          {[['Name', 'Alex Johnson'], ['Phone', '(248) 555-____']].map(([label, ph]) => (
            <div key={label} style={{ flex: 1 }}>
              <div style={{ fontSize: '3px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '3px' }}>{label}</div>
              <div style={{ padding: '5px 7px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px', fontSize: '5.5px', color: 'rgba(255,255,255,0.18)' }}>{ph}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: 'auto' }}>
          <div style={{ padding: '8px 12px', background: b.accent, borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em' }}>Free trial session · No commitment</div>
              <div style={{ fontSize: '7.5px', fontWeight: 900, color: '#fff' }}>Start My Free Trial →</div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '4px', fontSize: '4px', color: 'rgba(255,255,255,0.2)' }}>or call {b.phone}</div>
        </div>

      </div>
    </div>
  );
}
