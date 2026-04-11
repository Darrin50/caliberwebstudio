/**
 * Maison — Contact / Booking screen
 * Design language: LUXURY SALON / WARM EDITORIAL DARK
 * Stylist match flow: service category → stylist selector (photo cards) → preferred time.
 * No generic contact form — reads like a premium booking experience.
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

export function PhoneMaisonContact({ b }: { b: Biz }) {
  const services = [
    { label: 'Color & Highlights', price: 'From $175', sel: true },
    { label: 'Keratin', price: 'From $220', sel: false },
    { label: 'Blowout', price: 'From $85', sel: false },
    { label: 'Extensions', price: 'Custom', sel: false },
  ];

  const stylists = [
    { name: 'Isabelle', specialty: 'Balayage · Color', avail: true, sel: true, initials: 'I' },
    { name: 'Camille', specialty: 'Extensions · Cuts', avail: true, initials: 'C', sel: false },
    { name: 'Noelle', specialty: 'Keratin · Style', avail: false, initials: 'N', sel: false },
  ];

  const times = ['10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM', '5:30 PM'];
  const selectedTime = '1:00 PM';

  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />

      {/* Nav */}
      <div style={{ padding: '5px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: '8px', fontWeight: 900, color: '#fff', letterSpacing: '0.1em', fontStyle: 'italic' }}>MAISON</div>
          <div style={{ fontSize: '4px', color: b.accent, letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: '1px' }}>Reserve a Session</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5px' }}>
          {[14, 10].map((w, i) => <div key={i} style={{ width: `${w}px`, height: '1.5px', background: 'rgba(255,255,255,0.35)', borderRadius: '1px' }} />)}
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '8px 12px' }}>

        {/* Service selector */}
        <div style={{ marginBottom: '8px' }}>
          <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '4px' }}>Select a Service</div>
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {services.map(({ label, price, sel }) => (
              <div key={label} style={{
                padding: '5px 7px', borderRadius: '4px',
                background: sel ? `${b.accent}22` : 'rgba(255,255,255,0.05)',
                border: sel ? `1px solid ${b.accent}77` : '1px solid rgba(255,255,255,0.08)',
                flex: '0 0 auto',
              }}>
                <div style={{ fontSize: '5px', fontWeight: sel ? 800 : 500, color: sel ? b.accent : 'rgba(255,255,255,0.65)' }}>{label}</div>
                <div style={{ fontSize: '3.5px', color: sel ? `${b.accent}99` : 'rgba(255,255,255,0.3)', marginTop: '1px' }}>{price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Stylists */}
        <div style={{ marginBottom: '8px' }}>
          <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '5px' }}>Choose Your Stylist</div>
          <div style={{ display: 'flex', gap: '5px' }}>
            {stylists.map(({ name, specialty, avail, sel, initials }) => (
              <div key={name} style={{
                flex: 1, padding: '7px 5px', borderRadius: '6px', textAlign: 'center',
                background: sel ? `${b.accent}18` : 'rgba(255,255,255,0.04)',
                border: sel ? `1px solid ${b.accent}66` : '1px solid rgba(255,255,255,0.07)',
                opacity: avail ? 1 : 0.35,
              }}>
                {/* Avatar */}
                <div style={{
                  width: '24px', height: '24px', borderRadius: '50%',
                  background: sel ? b.accent : 'rgba(255,255,255,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 3px',
                  border: sel ? 'none' : '1px solid rgba(255,255,255,0.1)',
                }}>
                  <span style={{ fontSize: '8px', fontWeight: 900, color: sel ? '#1a0f08' : 'rgba(255,255,255,0.55)' }}>{initials}</span>
                </div>
                <div style={{ fontSize: '5.5px', fontWeight: 700, color: sel ? b.accent : '#fff', marginBottom: '1.5px' }}>{name}</div>
                <div style={{ fontSize: '3px', color: 'rgba(255,255,255,0.3)', lineHeight: 1.4 }}>{avail ? specialty : 'Unavailable'}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Date selector */}
        <div style={{ marginBottom: '8px' }}>
          <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '4px' }}>Select Date — April 2026</div>
          <div style={{ display: 'flex', gap: '3px' }}>
            {[['F', '11'], ['S', '12', true], ['S', '13'], ['M', '14'], ['T', '15'], ['W', '16']].map(([d, n, sel], i) => (
              <div key={i} style={{
                flex: 1, textAlign: 'center', padding: '4px 0',
                borderRadius: '4px',
                background: sel ? b.accent : 'rgba(255,255,255,0.05)',
                border: sel ? 'none' : '1px solid rgba(255,255,255,0.08)',
              }}>
                <div style={{ fontSize: '3px', color: sel ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.35)', marginBottom: '1.5px' }}>{d}</div>
                <div style={{ fontSize: '7.5px', fontWeight: 900, color: sel ? '#000' : '#fff', lineHeight: 1 }}>{n}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Time chips */}
        <div style={{ marginBottom: '7px' }}>
          <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '4px' }}>Available Times</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
            {times.map(t => (
              <div key={t} style={{
                padding: '4px 7px', borderRadius: '4px',
                background: t === selectedTime ? b.accent : 'rgba(255,255,255,0.05)',
                border: t === selectedTime ? 'none' : '1px solid rgba(255,255,255,0.09)',
              }}>
                <span style={{ fontSize: '5px', fontWeight: t === selectedTime ? 900 : 500, color: t === selectedTime ? '#1a0f08' : 'rgba(255,255,255,0.7)' }}>{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ marginTop: 'auto' }}>
          <div style={{ padding: '8px 12px', background: b.accent, borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '3.5px', color: 'rgba(0,0,0,0.5)', letterSpacing: '0.1em' }}>Isabelle · Sat Apr 12 · 1:00 PM</div>
              <div style={{ fontSize: '7.5px', fontWeight: 900, color: '#1a0f08' }}>Confirm Booking →</div>
            </div>
            <div style={{ fontSize: '6px', fontWeight: 900, color: 'rgba(0,0,0,0.45)' }}>$175+</div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '4px', fontSize: '4px', color: 'rgba(255,255,255,0.2)' }}>or call {b.phone}</div>
        </div>

      </div>
    </div>
  );
}
