/**
 * Ardor — Contact / Reservation screen
 * Design language: FINE DINING / EXPERIENTIAL
 * OpenTable-style: date strip → party size stepper → occasion selector → time grid.
 * No generic contact form. Every interaction communicates a real restaurant booking flow.
 */

interface Biz {
  id: string; accent: string; name: string; phone: string; bg: string;
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

export function PhoneArdorContact({ b }: { b: Biz }) {
  const days = [
    { d: 'TH', n: '10', avail: true },
    { d: 'FR', n: '11', avail: true },
    { d: 'SA', n: '12', avail: true, sel: true },
    { d: 'SU', n: '13', avail: true },
    { d: 'MO', n: '14', avail: false },
    { d: 'TU', n: '15', avail: true },
  ];

  const times = [
    { t: '5:00 PM', avail: true },
    { t: '5:30 PM', avail: false },
    { t: '6:00 PM', avail: true },
    { t: '6:30 PM', avail: true, sel: true },
    { t: '7:00 PM', avail: false },
    { t: '7:30 PM', avail: true },
  ];

  const occasions = ['Date Night', 'Celebration', 'Business', 'Just Dinner'];

  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />

      {/* Nav */}
      <div style={{ padding: '5px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: '8px', fontWeight: 900, color: '#fff', letterSpacing: '0.08em', fontStyle: 'italic' }}>ARDOR</div>
          <div style={{ fontSize: '4px', color: b.accent, letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: '1px' }}>Reserve a Table</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5px' }}>
          {[14, 10].map((w, i) => <div key={i} style={{ width: `${w}px`, height: '1.5px', background: 'rgba(255,255,255,0.4)', borderRadius: '1px' }} />)}
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '8px 12px 8px' }}>

        {/* Section label */}
        <div style={{ fontSize: '4px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '7px' }}>Select a Date — April 2026</div>

        {/* Date strip */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '9px' }}>
          {days.map(({ d, n, avail, sel }) => (
            <div key={n} style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '5px 0 4px',
              borderRadius: '5px',
              background: sel ? b.accent : avail ? 'rgba(255,255,255,0.06)' : 'transparent',
              border: sel ? 'none' : avail ? `1px solid rgba(255,255,255,0.1)` : '1px solid rgba(255,255,255,0.04)',
              opacity: avail ? 1 : 0.3,
            }}>
              <div style={{ fontSize: '3.5px', color: sel ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.45)', letterSpacing: '0.1em', marginBottom: '2px' }}>{d}</div>
              <div style={{ fontSize: '8px', fontWeight: 900, color: sel ? '#000' : avail ? '#fff' : 'rgba(255,255,255,0.3)', lineHeight: 1 }}>{n}</div>
            </div>
          ))}
        </div>

        {/* Party size + occasion row */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '9px' }}>
          {/* Party size */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '4px' }}>Party Size</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0', background: 'rgba(255,255,255,0.06)', borderRadius: '5px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
              <div style={{ padding: '5px 8px', fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>−</div>
              <div style={{ flex: 1, textAlign: 'center', fontSize: '9px', fontWeight: 900, color: '#fff' }}>2</div>
              <div style={{ padding: '5px 8px', fontSize: '10px', color: b.accent, fontWeight: 300 }}>+</div>
            </div>
          </div>
          {/* Occasion */}
          <div style={{ flex: 2 }}>
            <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '4px' }}>Occasion</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
              {occasions.map((occ, i) => (
                <div key={occ} style={{
                  padding: '3px 5px',
                  borderRadius: '3px',
                  background: i === 0 ? `${b.accent}22` : 'rgba(255,255,255,0.05)',
                  border: i === 0 ? `1px solid ${b.accent}66` : '1px solid rgba(255,255,255,0.08)',
                  fontSize: '3.5px',
                  fontWeight: i === 0 ? 700 : 400,
                  color: i === 0 ? b.accent : 'rgba(255,255,255,0.45)',
                }}>{occ}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Time grid */}
        <div>
          <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '5px' }}>Available Times — Sat Apr 12</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px' }}>
            {times.map(({ t, avail, sel }) => (
              <div key={t} style={{
                padding: '5px 0',
                textAlign: 'center',
                borderRadius: '4px',
                background: sel ? b.accent : avail ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)',
                border: sel ? 'none' : avail ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.04)',
                opacity: avail ? 1 : 0.35,
              }}>
                <div style={{ fontSize: '5.5px', fontWeight: sel ? 900 : 600, color: sel ? '#000' : avail ? '#fff' : 'rgba(255,255,255,0.25)' }}>{t}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ marginTop: 'auto', paddingTop: '8px' }}>
          <div style={{ padding: '8px 12px', background: b.accent, borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '3.5px', color: 'rgba(0,0,0,0.55)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Sat Apr 12 · 6:30 PM · 2 Guests</div>
              <div style={{ fontSize: '7.5px', fontWeight: 900, color: '#000', letterSpacing: '-0.01em' }}>Confirm Reservation →</div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '5px', fontSize: '4px', color: 'rgba(255,255,255,0.25)' }}>or call {b.phone}</div>
        </div>
      </div>
    </div>
  );
}
