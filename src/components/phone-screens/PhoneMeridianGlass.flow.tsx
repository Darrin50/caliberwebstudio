/**
 * Meridian Glass — User flow: Describe the Damage → Pick Appointment → Tech Dispatched
 */

interface Biz {
  id: string; accent: string; name: string; phone: string; bg: string; theme: 'dark' | 'light';
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

function Step1({ b }: { b: Biz }) {
  const makes = ['Ford', 'Chevrolet', 'Jeep', 'Toyota', 'Honda', 'BMW'];
  const types = [
    { label: 'Windshield', desc: 'Front glass', selected: true },
    { label: 'Side Window', desc: 'Driver/Pass.', selected: false },
    { label: 'Rear Window', desc: 'Back glass', selected: false },
    { label: 'Chip Repair', desc: 'Under 6"', selected: false },
  ];
  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <div style={{ padding: '5px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.07)', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: '7.5px', fontWeight: 900, color: '#0a0a0a', letterSpacing: '0.04em' }}>MERIDIAN GLASS</div>
          <div style={{ fontSize: '3.5px', color: b.accent, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.5px' }}>Same-Day Service</div>
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', padding: '8px 12px 8px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '13px', fontWeight: 900, color: '#0a0a0a', letterSpacing: '-0.03em', marginBottom: '8px', flexShrink: 0 }}>Describe the Damage</div>

        <div style={{ marginBottom: '7px', flexShrink: 0 }}>
          <div style={{ fontSize: '4px', color: '#9ca3af', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '3px' }}>Vehicle Make</div>
          <div style={{ display: 'flex', gap: '3px' }}>
            {makes.map((m, i) => (
              <div key={m} style={{ flex: 1, padding: '4px 0', textAlign: 'center', background: i === 0 ? b.accent : '#f3f4f6', borderRadius: '3px', fontSize: '3.5px', fontWeight: i === 0 ? 700 : 400, color: i === 0 ? '#fff' : '#9ca3af' }}>{m}</div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, overflow: 'hidden' }}>
          <div style={{ fontSize: '4px', color: '#9ca3af', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '3px' }}>Type of Damage</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
            {types.map(t => (
              <div key={t.label} style={{ padding: '7px 8px', background: t.selected ? `${b.accent}10` : '#f9fafb', borderRadius: '5px', border: `1px solid ${t.selected ? b.accent + '44' : 'rgba(0,0,0,0.07)'}` }}>
                <div style={{ fontSize: '5px', fontWeight: 700, color: t.selected ? b.accent : '#374151', marginBottom: '2px' }}>{t.label}</div>
                <div style={{ fontSize: '3.5px', color: '#9ca3af' }}>{t.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '8px', padding: '5px 8px', background: '#f0fdf4', borderRadius: '4px', border: '1px solid #86efac', display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0 }}>
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
          <span style={{ fontSize: '3.5px', color: '#16a34a', fontWeight: 600 }}>Insurance handled · Zero out-of-pocket in most cases</span>
        </div>

        <div style={{ marginTop: '6px', padding: '7px 10px', background: b.accent, borderRadius: '4px', textAlign: 'center', fontSize: '6px', fontWeight: 900, color: '#fff', flexShrink: 0 }}>
          Check Availability →
        </div>
      </div>
    </div>
  );
}

function Step2({ b }: { b: Biz }) {
  const days = [['Tue', '8'], ['Wed', '9'], ['Thu', '10'], ['Fri', '11'], ['Sat', '12']];
  const times = ['7:00 AM', '8:30 AM', '10:00 AM', '12:00 PM', '2:00 PM', '4:30 PM'];
  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <div style={{ padding: '5px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.07)', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: '7.5px', fontWeight: 900, color: '#0a0a0a', letterSpacing: '0.04em' }}>MERIDIAN GLASS</div>
          <div style={{ fontSize: '3.5px', color: b.accent, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.5px' }}>Ford · Windshield</div>
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', padding: '8px 12px 8px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '12px', fontWeight: 900, color: '#0a0a0a', letterSpacing: '-0.03em', marginBottom: '8px', flexShrink: 0 }}>Pick Your Appointment</div>

        <div style={{ display: 'flex', gap: '4px', marginBottom: '4px', flexShrink: 0 }}>
          {['Mobile · Come to you', 'Shop · Drop off'].map((opt, i) => (
            <div key={opt} style={{ flex: 1, padding: '5px 6px', background: i === 0 ? `${b.accent}12` : '#f9fafb', borderRadius: '4px', border: `1px solid ${i === 0 ? b.accent + '44' : 'rgba(0,0,0,0.07)'}`, textAlign: 'center', fontSize: '3.5px', fontWeight: i === 0 ? 700 : 400, color: i === 0 ? b.accent : '#9ca3af' }}>{opt}</div>
          ))}
        </div>

        <div style={{ marginBottom: '7px', flexShrink: 0 }}>
          <div style={{ fontSize: '4px', color: '#9ca3af', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '3px' }}>Date</div>
          <div style={{ display: 'flex', gap: '3px' }}>
            {days.map(([d, n], i) => (
              <div key={d} style={{ flex: 1, padding: '4px 0', textAlign: 'center', background: i === 1 ? b.accent : '#f3f4f6', borderRadius: '3px' }}>
                <div style={{ fontSize: '3px', color: i === 1 ? 'rgba(255,255,255,0.7)' : '#9ca3af', marginBottom: '1.5px' }}>{d}</div>
                <div style={{ fontSize: '5px', fontWeight: 700, color: i === 1 ? '#fff' : '#374151' }}>{n}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, overflow: 'hidden' }}>
          <div style={{ fontSize: '4px', color: '#9ca3af', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '3px' }}>Time</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '3px' }}>
            {times.map((t, i) => (
              <div key={t} style={{ padding: '5px 0', textAlign: 'center', background: i === 0 ? `${b.accent}12` : '#f9fafb', borderRadius: '3px', border: `1px solid ${i === 0 ? b.accent + '44' : 'rgba(0,0,0,0.06)'}`, fontSize: '3.5px', fontWeight: i === 0 ? 700 : 400, color: i === 0 ? b.accent : '#9ca3af' }}>{t}</div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '7px', padding: '7px 10px', background: b.accent, borderRadius: '4px', textAlign: 'center', fontSize: '6px', fontWeight: 900, color: '#fff', flexShrink: 0 }}>
          Confirm Wed 7:00 AM →
        </div>
      </div>
    </div>
  );
}

function Step3({ b }: { b: Biz }) {
  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <div style={{ padding: '5px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.07)', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: '7.5px', fontWeight: 900, color: '#0a0a0a', letterSpacing: '0.04em' }}>MERIDIAN GLASS</div>
        </div>
        <div style={{ padding: '2.5px 6px', background: '#f0fdf4', borderRadius: '3px', border: '1px solid #86efac' }}>
          <span style={{ fontSize: '3.5px', fontWeight: 700, color: '#16a34a' }}>BOOKED</span>
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', padding: '10px 14px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', flexShrink: 0 }}>
          <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: `${b.accent}15`, border: `2px solid ${b.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: '11px', color: b.accent, lineHeight: 1 }}>✓</span>
          </div>
          <div>
            <div style={{ fontSize: '10px', fontWeight: 900, color: '#0a0a0a', letterSpacing: '-0.02em', lineHeight: 1 }}>Tech Dispatched</div>
            <div style={{ fontSize: '4px', color: '#9ca3af', marginTop: '2px' }}>Wed Apr 9 · 7:00 AM · Mobile</div>
          </div>
        </div>

        <div style={{ padding: '7px 9px', background: '#f9fafb', borderRadius: '5px', border: '1px solid rgba(0,0,0,0.07)', marginBottom: '7px', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: b.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: '9px', color: '#fff', fontWeight: 900 }}>D</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '5.5px', fontWeight: 700, color: '#0a0a0a', marginBottom: '1.5px' }}>Dave K. · Certified Installer</div>
            <div style={{ fontSize: '3.5px', color: '#9ca3af' }}>4.9★ · 1,400+ installs · Licensed & bonded</div>
          </div>
        </div>

        <div style={{ padding: '7px 9px', background: '#f9fafb', borderRadius: '5px', border: '1px solid rgba(0,0,0,0.07)', marginBottom: '7px', flexShrink: 0 }}>
          {[['Vehicle', 'Ford · Windshield Replace'], ['Service', 'Mobile — Come to you'], ['Location', '2114 Woodward Ave, Detroit'], ['Insurance', 'GEICO filed · $0 est.'], ['Warranty', 'Lifetime · Nationwide']].map(([label, val]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3.5px' }}>
              <span style={{ fontSize: '3.5px', color: '#9ca3af' }}>{label}</span>
              <span style={{ fontSize: '3.5px', color: '#0a0a0a', fontWeight: 600 }}>{val}</span>
            </div>
          ))}
        </div>

        <div style={{ padding: '5px 8px', background: `${b.accent}10`, borderRadius: '4px', border: `1px solid ${b.accent}22`, textAlign: 'center', fontSize: '4px', color: b.accent, fontWeight: 600 }}>
          Dave will call you morning of to confirm ETA
        </div>
      </div>
    </div>
  );
}

export const MERIDIAN_GLASS_FLOW_LABELS: [string, string, string] = ['Describe the Damage', 'Pick Appointment', 'Tech Dispatched'];

export function PhoneMeridianGlassFlowScreen({ b, step }: { b: Biz; step: 0 | 1 | 2 }) {
  if (step === 0) return <Step1 b={b} />;
  if (step === 1) return <Step2 b={b} />;
  return <Step3 b={b} />;
}
