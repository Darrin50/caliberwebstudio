/**
 * Studio 1908 — Contact / Booking screen
 * Design language: PREMIUM BARBERSHOP / EDITORIAL DARK
 * Calendar slot picker: week strip → barber selector (avatar row) → service → time chips.
 * Feels like a real appointment booking app, not a contact form.
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

export function PhoneStudio1908Contact({ b }: { b: Biz }) {
  const days = [
    { d: 'TUE', n: '8' },
    { d: 'WED', n: '9' },
    { d: 'THU', n: '10', sel: true },
    { d: 'FRI', n: '11' },
    { d: 'SAT', n: '12' },
  ];

  const barbers = [
    { name: 'Marcus', specialty: 'Fades', avail: true, sel: true, initials: 'M' },
    { name: 'Devon', specialty: 'Shaves', avail: true, initials: 'D' },
    { name: 'Jamal', specialty: 'Cuts', avail: false, initials: 'J' },
  ];

  const times = ['10:00', '10:30', '11:30', '12:00', '1:30', '2:00'];
  const selectedTime = '11:30';

  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />

      {/* Nav */}
      <div style={{ padding: '5px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: '8px', fontWeight: 900, color: '#fff', letterSpacing: '0.06em' }}>STUDIO 1908</div>
          <div style={{ fontSize: '4px', color: b.accent, letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: '1px' }}>Book a Chair</div>
        </div>
        <div style={{ padding: '3px 7px', background: `${b.accent}18`, borderRadius: '3px', border: `1px solid ${b.accent}44` }}>
          <div style={{ fontSize: '3.5px', fontWeight: 700, color: b.accent }}>ONLINE BOOKING</div>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '8px 12px' }}>

        {/* Date strip */}
        <div style={{ marginBottom: '8px' }}>
          <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '5px' }}>April 2026</div>
          <div style={{ display: 'flex', gap: '4px' }}>
            {days.map(({ d, n, sel }) => (
              <div key={n} style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '5px 0 4px',
                borderRadius: '5px',
                background: sel ? b.accent : 'rgba(255,255,255,0.05)',
                border: sel ? 'none' : '1px solid rgba(255,255,255,0.08)',
              }}>
                <div style={{ fontSize: '3.5px', color: sel ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', marginBottom: '2px' }}>{d}</div>
                <div style={{ fontSize: '8.5px', fontWeight: 900, color: sel ? '#000' : '#fff', lineHeight: 1 }}>{n}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Barber selector */}
        <div style={{ marginBottom: '8px' }}>
          <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '5px' }}>Choose Your Barber</div>
          <div style={{ display: 'flex', gap: '6px' }}>
            {barbers.map(({ name, specialty, avail, sel, initials }) => (
              <div key={name} style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '6px 4px',
                borderRadius: '6px',
                background: sel ? `${b.accent}18` : 'rgba(255,255,255,0.04)',
                border: sel ? `1px solid ${b.accent}66` : '1px solid rgba(255,255,255,0.07)',
                opacity: avail ? 1 : 0.35,
              }}>
                {/* Avatar circle */}
                <div style={{
                  width: '22px', height: '22px', borderRadius: '50%',
                  background: sel ? b.accent : 'rgba(255,255,255,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '3px',
                  border: sel ? 'none' : '1px solid rgba(255,255,255,0.12)',
                }}>
                  <span style={{ fontSize: '7px', fontWeight: 900, color: sel ? '#000' : 'rgba(255,255,255,0.6)' }}>{initials}</span>
                </div>
                <div style={{ fontSize: '5px', fontWeight: 700, color: sel ? b.accent : '#fff', marginBottom: '1px' }}>{name}</div>
                <div style={{ fontSize: '3px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em' }}>{avail ? specialty : 'Off Today'}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Service selector */}
        <div style={{ marginBottom: '7px' }}>
          <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '4px' }}>Service — Marcus · Thu Apr 10</div>
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {[['Signature Cut', '45 min · $55', true], ['Hot Towel Shave', '30 min · $45', false], ['Beard Sculpt', '20 min · $35', false]].map(([name, detail, sel]) => (
              <div key={String(name)} style={{
                padding: '4px 7px',
                borderRadius: '4px',
                background: sel ? `${b.accent}18` : 'rgba(255,255,255,0.04)',
                border: sel ? `1px solid ${b.accent}55` : '1px solid rgba(255,255,255,0.08)',
                flex: '0 0 auto',
              }}>
                <div style={{ fontSize: '5px', fontWeight: sel ? 800 : 500, color: sel ? b.accent : 'rgba(255,255,255,0.7)' }}>{String(name)}</div>
                <div style={{ fontSize: '3px', color: 'rgba(255,255,255,0.28)', marginTop: '1px' }}>{String(detail)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Time chips */}
        <div style={{ marginBottom: '6px' }}>
          <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '4px' }}>Available Times</div>
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {times.map(t => (
              <div key={t} style={{
                padding: '4px 7px',
                borderRadius: '4px',
                background: t === selectedTime ? b.accent : 'rgba(255,255,255,0.05)',
                border: t === selectedTime ? 'none' : '1px solid rgba(255,255,255,0.09)',
              }}>
                <span style={{ fontSize: '5.5px', fontWeight: t === selectedTime ? 900 : 500, color: t === selectedTime ? '#000' : 'rgba(255,255,255,0.7)' }}>{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ marginTop: 'auto' }}>
          <div style={{ padding: '8px 12px', background: b.accent, borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '3.5px', color: 'rgba(0,0,0,0.55)', letterSpacing: '0.1em' }}>Marcus · Thu Apr 10 · 11:30 AM</div>
              <div style={{ fontSize: '7.5px', fontWeight: 900, color: '#000', letterSpacing: '-0.01em' }}>Book Appointment →</div>
            </div>
            <div style={{ fontSize: '6px', fontWeight: 900, color: 'rgba(0,0,0,0.45)' }}>$55</div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '4px', fontSize: '4px', color: 'rgba(255,255,255,0.2)' }}>or call {b.phone}</div>
        </div>

      </div>
    </div>
  );
}
