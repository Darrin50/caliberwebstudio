/**
 * Prime Home — Home screen
 * Design language: EMERGENCY UTILITY / 24-7 DISPATCH
 * Breaks the full-bleed photo + emoji service grid template.
 * Photo stays but UI layer is a real dispatch app:
 * - Live technician status bar (not a static "Available Now" badge)
 * - Issue type selector (no emoji — icon shapes only)
 * - Emergency CTA with phone as hero element
 * Reads like a real service dispatch app (Angi / HomeAdvisor Pro-quality UI).
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

export function PhonePrimeHomeHome({ b }: { b: Biz }) {
  const issueTypes = [
    { label: 'Emergency Leak', icon: '◈', urgent: true },
    { label: 'Clogged Drain', icon: '◎', urgent: false },
    { label: 'Water Heater', icon: '▲', urgent: false },
    { label: 'Pipe Repair', icon: '■', urgent: false },
    { label: 'Remodel', icon: '◻', urgent: false },
    { label: 'Inspection', icon: '◉', urgent: false },
  ];

  return (
    <div style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
      <img src={b.heroPhoto} alt="Prime Home" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      {/* Navy gradient — stronger at top and especially bottom */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,18,36,0.92) 0%, rgba(8,18,36,0.3) 35%, rgba(8,18,36,0.88) 60%, rgba(8,18,36,1) 100%)' }} />

      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <StatusBar />

        {/* Brand + availability */}
        <div style={{ padding: '5px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: '8px', fontWeight: 900, color: '#fff', letterSpacing: '0.05em' }}>PRIME HOME</div>
            <div style={{ fontSize: '3.5px', color: b.accent, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '1px' }}>Licensed · Bonded · Insured</div>
          </div>
          {/* Live status badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', padding: '3px 6px', background: 'rgba(34,197,94,0.15)', borderRadius: '20px', border: '1px solid rgba(34,197,94,0.3)' }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22c55e' }} />
            <span style={{ fontSize: '4px', color: '#22c55e', fontWeight: 700 }}>3 techs available</span>
          </div>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* DISPATCH UI — bottom panel */}
        <div style={{ padding: '0 12px 8px', flexShrink: 0 }}>

          {/* Emergency call banner */}
          <div style={{ padding: '9px 12px', background: 'linear-gradient(135deg, #dc2626, #b91c1c)', borderRadius: '7px', marginBottom: '7px', position: 'relative', overflow: 'hidden' }}>
            {/* Pulsing ring effect */}
            <div style={{ position: 'absolute', top: '50%', right: '14px', transform: 'translateY(-50%)', width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(255,255,255,0.12)', border: '2px solid rgba(255,255,255,0.2)' }} />
            <div style={{ position: 'absolute', top: '50%', right: '12px', transform: 'translateY(-50%)', width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
            <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.75)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '2px' }}>Emergency Line — Answers Now</div>
            <div style={{ fontSize: '15px', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>{b.phone}</div>
            <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.6)', marginTop: '3px' }}>Average response: 47 min · Metro Detroit</div>
          </div>

          {/* Issue type selector — no emoji */}
          <div style={{ marginBottom: '6px' }}>
            <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '4px' }}>What&apos;s the Problem?</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3px' }}>
              {issueTypes.map(({ label, icon, urgent }, i) => (
                <div key={label} style={{
                  padding: '5px 4px', borderRadius: '4px', textAlign: 'center',
                  background: i === 0 ? 'rgba(220,38,38,0.18)' : 'rgba(255,255,255,0.06)',
                  border: i === 0 ? '1px solid rgba(220,38,38,0.4)' : '1px solid rgba(255,255,255,0.08)',
                }}>
                  <div style={{ fontSize: '7px', color: urgent ? '#ef4444' : 'rgba(255,255,255,0.45)', marginBottom: '1.5px', lineHeight: 1 }}>{icon}</div>
                  <div style={{ fontSize: '3.5px', fontWeight: 600, color: urgent ? '#fff' : 'rgba(255,255,255,0.55)', lineHeight: 1.3 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust strip */}
          <div style={{ display: 'flex', gap: '3px' }}>
            {[['★4.9', '214 Reviews'], ['2,100+', 'Jobs Done'], ['Free', 'Estimate']].map(([v, l]) => (
              <div key={l} style={{ flex: 1, padding: '4px 3px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
                <div style={{ fontSize: '6px', fontWeight: 900, color: b.accent, lineHeight: 1 }}>{v}</div>
                <div style={{ fontSize: '3px', color: 'rgba(255,255,255,0.4)', marginTop: '1px', letterSpacing: '0.04em' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
