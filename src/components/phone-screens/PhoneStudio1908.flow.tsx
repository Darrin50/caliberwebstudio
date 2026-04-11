/**
 * Studio 1908 — User flow: Choose Your Barber → Book Service + Time → Appointment Confirmed
 */

interface Biz {
  id: string; accent: string; name: string; phone: string; bg: string; theme: 'dark' | 'light';
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

function Step1({ b }: { b: Biz }) {
  const barbers = [
    { init: 'M', name: 'Marcus', title: 'Master Barber', since: 'Since 2014', specialty: 'Fades · Tapers', rating: '4.9', cuts: '3,200+', avail: true },
    { init: 'D', name: 'DeShawn', title: 'Senior Stylist', since: 'Since 2018', specialty: 'Lineups · Sculpts', rating: '4.8', cuts: '1,800+', avail: true },
    { init: 'R', name: 'Rico', title: 'Grooming Specialist', since: 'Since 2020', specialty: 'Beard · Scalp', rating: '4.9', cuts: '900+', avail: false },
  ];
  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <div style={{ padding: '5px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
        <div style={{ fontSize: '8px', fontWeight: 900, color: '#fff', letterSpacing: '0.06em' }}>STUDIO 1908</div>
        <div style={{ fontSize: '4px', color: b.accent, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Book a Chair</div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', padding: '8px 12px 8px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '13px', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', marginBottom: '8px', flexShrink: 0 }}>Choose Your Barber</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: 1, overflow: 'hidden' }}>
          {barbers.map(barber => (
            <div key={barber.name} style={{ padding: '7px 9px', background: 'rgba(255,255,255,0.04)', borderRadius: '5px', border: `1px solid rgba(255,255,255,0.07)` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: `1.5px solid ${b.accent}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: '8px', color: '#fff', fontWeight: 700 }}>{barber.init}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '6px', fontWeight: 700, color: '#fff', marginBottom: '1px' }}>{barber.name}</div>
                  <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.4)' }}>{barber.title} · {barber.since}</div>
                </div>
                <div style={{ padding: '2px 5px', background: barber.avail ? '#22c55e18' : 'rgba(255,255,255,0.04)', borderRadius: '3px', border: `1px solid ${barber.avail ? '#22c55e44' : 'rgba(255,255,255,0.08)'}` }}>
                  <span style={{ fontSize: '3px', fontWeight: 700, color: barber.avail ? '#22c55e' : 'rgba(255,255,255,0.25)' }}>{barber.avail ? 'Available' : 'Next Week'}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '3px' }}>
                <span style={{ fontSize: '3px', color: b.accent, padding: '1px 4px', background: `${b.accent}12`, borderRadius: '2px' }}>{barber.specialty}</span>
                <span style={{ fontSize: '3px', color: 'rgba(255,255,255,0.35)', padding: '1px 4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}>★ {barber.rating} · {barber.cuts} cuts</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Step2({ b }: { b: Biz }) {
  const services = ['Signature Haircut — $55', 'Hot Towel Shave — $65', 'Beard Sculpting — $35', 'Scalp Treatment — $55'];
  const times = ['10:00', '10:30', '11:00', '12:00', '2:00', '2:30', '3:00', '4:30'];
  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <div style={{ padding: '5px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
        <div style={{ fontSize: '8px', fontWeight: 900, color: '#fff', letterSpacing: '0.06em' }}>STUDIO 1908</div>
        <div style={{ padding: '2px 5px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '5px', color: '#fff', fontWeight: 700 }}>M</span>
          </div>
          <span style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.6)' }}>Marcus</span>
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', padding: '8px 12px 8px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '12px', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', marginBottom: '7px', flexShrink: 0 }}>Pick a Service</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginBottom: '8px', flexShrink: 0 }}>
          {services.map((s, i) => (
            <div key={s} style={{ padding: '5px 8px', background: i === 0 ? `${b.accent}20` : 'rgba(255,255,255,0.04)', borderRadius: '4px', border: `1px solid ${i === 0 ? b.accent + '55' : 'rgba(255,255,255,0.06)'}`, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: i === 0 ? b.accent : 'rgba(255,255,255,0.15)', flexShrink: 0 }} />
              <span style={{ fontSize: '4.5px', color: i === 0 ? '#fff' : 'rgba(255,255,255,0.5)', fontWeight: i === 0 ? 700 : 400 }}>{s}</span>
            </div>
          ))}
        </div>

        <div style={{ flex: 1, overflow: 'hidden' }}>
          <div style={{ fontSize: '4px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '4px' }}>Today's Availability</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '3px' }}>
            {times.map((t, i) => (
              <div key={t} style={{ padding: '4px 0', textAlign: 'center', background: i === 2 ? `${b.accent}25` : 'rgba(255,255,255,0.05)', borderRadius: '3px', border: i === 2 ? `1px solid ${b.accent}55` : '1px solid transparent', fontSize: '4px', fontWeight: i === 2 ? 700 : 400, color: i === 2 ? b.accent : 'rgba(255,255,255,0.4)' }}>{t}</div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '8px', padding: '7px 10px', background: b.accent, borderRadius: '4px', textAlign: 'center', fontSize: '6px', fontWeight: 900, color: '#000', flexShrink: 0 }}>
          Book 11:00 AM →
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
        <div style={{ fontSize: '8px', fontWeight: 900, color: '#fff', letterSpacing: '0.06em' }}>STUDIO 1908</div>
        <div style={{ fontSize: '4px', color: '#22c55e', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Confirmed</div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', padding: '10px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: `${b.accent}22`, border: `2px solid ${b.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px', flexShrink: 0 }}>
          <span style={{ fontSize: '13px', color: b.accent, lineHeight: 1 }}>✓</span>
        </div>
        <div style={{ fontSize: '11px', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', marginBottom: '3px' }}>You're Booked</div>
        <div style={{ fontSize: '4px', color: 'rgba(255,255,255,0.4)', marginBottom: '12px', textAlign: 'center' }}>Today at 11:00 AM · Marcus</div>

        <div style={{ width: '100%', padding: '8px 10px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', border: `1px solid ${b.accent}33`, marginBottom: '8px' }}>
          {[['Barber', 'Marcus'], ['Service', 'Signature Haircut'], ['Duration', '45 min'], ['Time', 'Today 11:00 AM'], ['Location', 'Midtown Detroit']].map(([label, val]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.3)' }}>{label}</span>
              <span style={{ fontSize: '3.5px', color: '#fff', fontWeight: 600 }}>{val}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '5px', width: '100%' }}>
          <div style={{ flex: 1, padding: '5px', background: `${b.accent}18`, borderRadius: '4px', border: `1px solid ${b.accent}33`, textAlign: 'center', fontSize: '4px', fontWeight: 700, color: b.accent }}>Add to Calendar</div>
          <div style={{ flex: 1, padding: '5px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center', fontSize: '4px', color: 'rgba(255,255,255,0.4)' }}>Get Directions</div>
        </div>
      </div>
    </div>
  );
}

export const STUDIO_1908_FLOW_LABELS: [string, string, string] = ['Choose a Barber', 'Pick Service + Time', 'Appointment Confirmed'];

export function PhoneStudio1908FlowScreen({ b, step }: { b: Biz; step: 0 | 1 | 2 }) {
  if (step === 0) return <Step1 b={b} />;
  if (step === 1) return <Step2 b={b} />;
  return <Step3 b={b} />;
}
