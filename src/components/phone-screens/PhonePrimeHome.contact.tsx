/**
 * Prime Home — Contact / Service Request screen
 * Design language: EMERGENCY UTILITY / 24-7 DISPATCH
 * Emergency vs. scheduled toggle → issue type selector with urgency → address field.
 * Reads as a real dispatch/service intake app, not a name/phone/email form.
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

export function PhonePrimeHomeContact({ b }: { b: Biz }) {
  const issues = [
    { label: 'Burst Pipe', sub: 'Active leak', urgency: 'emergency', icon: '◈' },
    { label: 'Drain Clog', sub: 'Slow / backed up', urgency: 'priority', icon: '◎', sel: true },
    { label: 'Water Heater', sub: 'No hot water', urgency: 'priority', icon: '▲' },
    { label: 'Sewer Line', sub: 'Backup smell', urgency: 'emergency', icon: '■' },
    { label: 'Remodel / Reno', sub: 'Planned project', urgency: 'standard', icon: '◻' },
    { label: 'Other', sub: 'Describe issue', urgency: 'standard', icon: '…' },
  ];

  const urgencyColor: Record<string, string> = {
    emergency: '#dc2626',
    priority: '#d97706',
    standard: '#6b7280',
  };

  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />

      {/* Nav */}
      <div style={{ padding: '5px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.07)', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: '8px', fontWeight: 900, color: '#0a0a0a', letterSpacing: '0.05em' }}>PRIME HOME</div>
          <div style={{ fontSize: '4px', color: b.accent, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '1px' }}>Licensed · Bonded · Insured</div>
        </div>
        <div style={{ padding: '3px 6px', background: `${b.accent}15`, borderRadius: '3px', border: `1px solid ${b.accent}44` }}>
          <div style={{ fontSize: '3.5px', fontWeight: 700, color: b.accent }}>OPEN 24/7</div>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '9px 12px 8px' }}>

        {/* Emergency / Scheduled toggle */}
        <div style={{ display: 'flex', marginBottom: '9px', background: '#f3f4f6', borderRadius: '6px', padding: '2px', flexShrink: 0 }}>
          <div style={{
            flex: 1, padding: '6px 0', borderRadius: '5px', textAlign: 'center',
            background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
          }}>
            <div style={{ fontSize: '5.5px', fontWeight: 900, color: '#fff', letterSpacing: '0.04em' }}>EMERGENCY</div>
            <div style={{ fontSize: '3px', color: 'rgba(255,255,255,0.75)', marginTop: '1px' }}>Respond now</div>
          </div>
          <div style={{ flex: 1, padding: '6px 0', textAlign: 'center' }}>
            <div style={{ fontSize: '5.5px', fontWeight: 700, color: '#6b7280', letterSpacing: '0.04em' }}>SCHEDULED</div>
            <div style={{ fontSize: '3px', color: '#9ca3af', marginTop: '1px' }}>Pick a time</div>
          </div>
        </div>

        {/* Issue type grid */}
        <div style={{ marginBottom: '8px' }}>
          <div style={{ fontSize: '3.5px', color: '#9ca3af', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '5px' }}>What&apos;s the Issue?</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
            {issues.map(({ label, sub, urgency, icon, sel }) => (
              <div key={label} style={{
                padding: '6px 7px',
                borderRadius: '5px',
                background: sel ? `${b.accent}0f` : '#f9fafb',
                border: sel ? `1.5px solid ${b.accent}` : '1px solid rgba(0,0,0,0.07)',
                display: 'flex', alignItems: 'flex-start', gap: '5px',
              }}>
                <div style={{
                  width: '14px', height: '14px', borderRadius: '3px', flexShrink: 0,
                  background: sel ? b.accent : urgency === 'emergency' ? '#fef2f2' : urgency === 'priority' ? '#fffbeb' : '#f3f4f6',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginTop: '1px',
                }}>
                  <span style={{ fontSize: '6px', color: sel ? '#fff' : urgencyColor[urgency], lineHeight: 1 }}>{icon}</span>
                </div>
                <div>
                  <div style={{ fontSize: '5px', fontWeight: 700, color: sel ? '#0a0a0a' : '#374151', lineHeight: 1.2 }}>{label}</div>
                  <div style={{ fontSize: '3px', color: urgencyColor[urgency], marginTop: '1px', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{urgency}</div>
                  <div style={{ fontSize: '3px', color: '#9ca3af', marginTop: '0.5px' }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Address */}
        <div style={{ marginBottom: '7px' }}>
          <div style={{ fontSize: '3.5px', color: '#9ca3af', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '4px' }}>Service Address</div>
          <div style={{ padding: '6px 9px', background: '#f9fafb', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ fontSize: '8px', color: '#d1d5db', flexShrink: 0 }}>◎</div>
            <div style={{ fontSize: '6px', color: '#d1d5db' }}>Street address or zip code</div>
          </div>
        </div>

        {/* Name + Phone row */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
          {[['Name', 'John Smith'], ['Phone', '(313) 555-____']].map(([label, ph]) => (
            <div key={label} style={{ flex: 1 }}>
              <div style={{ fontSize: '3.5px', color: '#9ca3af', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '3px' }}>{label}</div>
              <div style={{ padding: '5px 7px', background: '#f9fafb', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '4px', fontSize: '5.5px', color: '#d1d5db' }}>{ph}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: 'auto' }}>
          <div style={{ padding: '8px 12px', background: 'linear-gradient(135deg, #dc2626, #b91c1c)', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em' }}>Avg. response under 60 min</div>
              <div style={{ fontSize: '7.5px', fontWeight: 900, color: '#fff' }}>Request Emergency Service →</div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '5px', fontSize: '4px', color: '#9ca3af' }}>or call direct: {b.phone}</div>
        </div>

      </div>
    </div>
  );
}
