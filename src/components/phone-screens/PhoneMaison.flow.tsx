/**
 * Maison — User flow: Explore Services → Choose Stylist + Time → Session Confirmed
 */

interface Biz {
  id: string; accent: string; name: string; phone: string; bg: string; theme: 'dark' | 'light';
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

function Step1({ b }: { b: Biz }) {
  const services = [
    { name: 'Color & Highlights', price: 'From $175', duration: '2–3 hrs', level: 'Senior Stylist', hot: true },
    { name: 'Keratin Treatment', price: 'From $220', duration: '3 hrs', level: 'Certified Pro', hot: false },
    { name: 'Signature Blowout', price: 'From $85', duration: '45–60 min', level: 'Any Stylist', hot: false },
    { name: 'Extensions', price: 'Custom', duration: '3–5 hrs', level: 'Specialist', hot: false },
  ];
  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <div style={{ padding: '5px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
        <div style={{ fontSize: '8px', fontWeight: 900, color: '#fff', letterSpacing: '0.1em', fontStyle: 'italic' }}>MAISON</div>
        <div style={{ fontSize: '4px', color: b.accent, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Services</div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', padding: '8px 12px 8px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '13px', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', fontStyle: 'italic', marginBottom: '8px', flexShrink: 0 }}>Our Services</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, overflow: 'hidden' }}>
          {services.map(s => (
            <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '6px 8px', background: 'rgba(255,255,255,0.04)', borderRadius: '5px', border: '1px solid rgba(255,255,255,0.07)', borderLeft: `2px solid ${s.hot ? b.accent : 'rgba(255,255,255,0.12)'}` }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '5.5px', fontWeight: 700, color: '#fff', marginBottom: '2px' }}>{s.name}</div>
                <div style={{ display: 'flex', gap: '3px' }}>
                  <span style={{ fontSize: '3px', color: 'rgba(255,255,255,0.3)', padding: '1px 3px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}>{s.duration}</span>
                  <span style={{ fontSize: '3px', color: b.accent, padding: '1px 3px', background: `${b.accent}14`, borderRadius: '2px' }}>{s.level}</span>
                </div>
              </div>
              <div style={{ fontSize: '5.5px', fontWeight: 800, color: '#fff', flexShrink: 0 }}>{s.price}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '8px', padding: '7px 10px', background: b.accent, borderRadius: '4px', textAlign: 'center', fontSize: '6px', fontWeight: 900, color: '#1a0f08', flexShrink: 0 }}>
          Book a Service →
        </div>
      </div>
    </div>
  );
}

function Step2({ b }: { b: Biz }) {
  const stylists = [
    { init: 'S', name: 'Sophia', level: 'Master Stylist', rating: '5.0', specialty: 'Color' },
    { init: 'A', name: 'Amara', level: 'Senior Stylist', rating: '4.9', specialty: 'Keratin' },
    { init: 'L', name: 'Lena', level: 'Any Service', rating: '4.8', specialty: 'Blowout' },
  ];
  const times = ['9:00', '9:30', '10:00', '11:00', '1:00', '2:30'];
  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <div style={{ padding: '5px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
        <div style={{ fontSize: '8px', fontWeight: 900, color: '#fff', letterSpacing: '0.1em', fontStyle: 'italic' }}>MAISON</div>
        <div style={{ fontSize: '4px', color: b.accent, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Book</div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', padding: '8px 12px 8px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '12px', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', fontStyle: 'italic', marginBottom: '7px', flexShrink: 0 }}>Choose Your Stylist</div>

        <div style={{ display: 'flex', gap: '4px', marginBottom: '8px', flexShrink: 0 }}>
          {stylists.map((s, i) => (
            <div key={s.name} style={{ flex: 1, padding: '6px 5px', background: i === 0 ? `${b.accent}22` : 'rgba(255,255,255,0.04)', borderRadius: '5px', border: `1px solid ${i === 0 ? b.accent + '55' : 'rgba(255,255,255,0.07)'}`, textAlign: 'center' }}>
              <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: i === 0 ? b.accent : 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 3px' }}>
                <span style={{ fontSize: '7px', color: i === 0 ? '#fff' : 'rgba(255,255,255,0.6)', fontWeight: 700 }}>{s.init}</span>
              </div>
              <div style={{ fontSize: '4px', fontWeight: 700, color: i === 0 ? '#fff' : 'rgba(255,255,255,0.5)', marginBottom: '1.5px' }}>{s.name}</div>
              <div style={{ fontSize: '3px', color: i === 0 ? b.accent : 'rgba(255,255,255,0.25)' }}>{s.specialty}</div>
            </div>
          ))}
        </div>

        <div style={{ flex: 1, overflow: 'hidden' }}>
          <div style={{ fontSize: '4px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '4px' }}>Available Today</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '3px' }}>
            {times.map((t, i) => (
              <div key={t} style={{ padding: '5px 0', textAlign: 'center', background: i === 2 ? `${b.accent}25` : 'rgba(255,255,255,0.05)', borderRadius: '3px', border: i === 2 ? `1px solid ${b.accent}55` : '1px solid transparent', fontSize: '4px', fontWeight: i === 2 ? 700 : 400, color: i === 2 ? b.accent : 'rgba(255,255,255,0.4)' }}>{t}</div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '8px', padding: '7px 10px', background: b.accent, borderRadius: '4px', textAlign: 'center', fontSize: '6px', fontWeight: 900, color: '#1a0f08', flexShrink: 0 }}>
          Book Sophia · 10:00 AM →
        </div>
      </div>
    </div>
  );
}

function Step3({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <div style={{ padding: '5px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
        <div style={{ fontSize: '8px', fontWeight: 900, color: '#fff', letterSpacing: '0.1em', fontStyle: 'italic' }}>MAISON</div>
        <div style={{ fontSize: '4px', color: '#22c55e', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Confirmed</div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', padding: '10px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: `${b.accent}22`, border: `2px solid ${b.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px', flexShrink: 0 }}>
          <span style={{ fontSize: '13px', color: b.accent, lineHeight: 1 }}>✓</span>
        </div>
        <div style={{ fontSize: '11px', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', fontStyle: 'italic', marginBottom: '3px' }}>You're All Set</div>
        <div style={{ fontSize: '4px', color: 'rgba(255,255,255,0.4)', marginBottom: '12px', textAlign: 'center' }}>Today · 10:00 AM · Sophia</div>

        <div style={{ width: '100%', padding: '8px 10px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', border: `1px solid ${b.accent}33`, marginBottom: '8px' }}>
          {[['Salon', 'Maison · Royal Oak'], ['Stylist', 'Sophia'], ['Service', 'Color & Highlights'], ['Duration', '2–3 hrs'], ['Time', 'Today 10:00 AM']].map(([label, val]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.3)' }}>{label}</span>
              <span style={{ fontSize: '3.5px', color: '#fff', fontWeight: 600 }}>{val}</span>
            </div>
          ))}
        </div>

        <div style={{ width: '100%', padding: '5px 8px', background: `${b.accent}14`, borderRadius: '4px', border: `1px solid ${b.accent}33`, textAlign: 'center', fontSize: '4px', color: b.accent, fontWeight: 600 }}>
          Add to Calendar · Get Directions
        </div>
      </div>
    </div>
  );
}

export const MAISON_FLOW_LABELS: [string, string, string] = ['Explore Services', 'Choose Stylist + Time', 'Session Confirmed'];

export function PhoneMaisonFlowScreen({ b, step }: { b: Biz; step: 0 | 1 | 2 }) {
  if (step === 0) return <Step1 b={b} />;
  if (step === 1) return <Step2 b={b} />;
  return <Step3 b={b} />;
}
