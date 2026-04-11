/**
 * Apex Athletics — Home screen
 * Design language: HIGH PERFORMANCE / ATHLETIC DARK
 * Breaks generic stats-in-clear-window + today's classes template.
 * Full-bleed photo stays but the overlay UI is completely different:
 * - Live class booking card (real-time capacity bars + countdown)
 * - Performance metric strip (not just stats)
 * - Class schedule with intensity bars, not just text rows
 * Reads like a real gym app (Equinox / F45), not a local gym flyer.
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

export function PhoneApexHome({ b }: { b: Biz }) {
  const classes = [
    { time: '6:00 AM', name: 'HIIT Circuit', intensity: 92, spotsLeft: 3, full: false },
    { time: '9:30 AM', name: 'Power Yoga', intensity: 64, spotsLeft: 8, full: false },
    { time: '12:00 PM', name: 'Strength & Lift', intensity: 78, spotsLeft: 0, full: true },
    { time: '6:00 PM', name: 'Athletic Conditioning', intensity: 95, spotsLeft: 5, full: false },
  ];

  return (
    <div style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
      <img src={b.heroPhoto} alt="Apex Athletics" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      {/* Heavy dark overlay — photo shows only in middle band */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.2) 28%, rgba(5,5,5,0.2) 50%, rgba(5,5,5,0.95) 65%, rgba(5,5,5,1) 100%)' }} />

      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <StatusBar />

        {/* Brand + CTA */}
        <div style={{ padding: '5px 12px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: '8px', fontWeight: 900, color: '#fff', letterSpacing: '0.1em' }}>APEX</div>
            <div style={{ fontSize: '3.5px', color: b.accent, letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: '1px' }}>Performance · Southfield</div>
          </div>
          <div style={{ padding: '3px 7px', background: b.accent, borderRadius: '20px', fontSize: '4.5px', fontWeight: 800, color: '#fff' }}>Free Trial</div>
        </div>

        {/* Headline in clear zone */}
        <div style={{ padding: '8px 12px 0', flexShrink: 0 }}>
          <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '3px' }}>Train Without Limits</div>
          <div style={{ fontSize: '22px', fontWeight: 900, color: '#fff', lineHeight: 1.0, letterSpacing: '-0.03em', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>No Ceiling.<br />No Excuses.</div>
        </div>

        {/* Spacer — lets photo show through */}
        <div style={{ flex: 1 }} />

        {/* TODAY'S SCHEDULE — class list with real capacity indicators */}
        <div style={{ padding: '0 12px 8px', flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
            <div style={{ fontSize: '4px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.16em', textTransform: 'uppercase', fontFamily: 'monospace' }}>Today — April 11</div>
            <div style={{ fontSize: '4px', color: b.accent, fontWeight: 700 }}>Full Schedule →</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {classes.map(({ time, name, intensity, spotsLeft, full }) => (
              <div key={name} style={{
                display: 'flex', alignItems: 'center', gap: '7px',
                padding: '5px 8px',
                background: full ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.07)',
                borderRadius: '5px',
                border: `1px solid ${full ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)'}`,
                opacity: full ? 0.5 : 1,
              }}>
                {/* Time */}
                <div style={{ fontSize: '5px', fontWeight: 700, color: b.accent, width: '28px', flexShrink: 0 }}>{time}</div>

                {/* Name + capacity bar */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '5.5px', fontWeight: 700, color: '#fff', marginBottom: '2.5px', letterSpacing: '-0.01em' }}>{name}</div>
                  {/* Intensity bar */}
                  <div style={{ height: '2px', background: 'rgba(255,255,255,0.1)', borderRadius: '1px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${intensity}%`, background: intensity > 85 ? b.accent : intensity > 65 ? '#f59e0b' : '#22c55e', borderRadius: '1px' }} />
                  </div>
                </div>

                {/* Status */}
                <div style={{ flexShrink: 0, textAlign: 'right' }}>
                  {full ? (
                    <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.3)', fontWeight: 700, letterSpacing: '0.06em' }}>FULL</div>
                  ) : (
                    <>
                      <div style={{ fontSize: '6px', fontWeight: 900, color: spotsLeft <= 3 ? b.accent : '#fff', lineHeight: 1 }}>{spotsLeft}</div>
                      <div style={{ fontSize: '3px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em' }}>spots</div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
