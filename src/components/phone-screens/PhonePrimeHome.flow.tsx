/**
 * Prime Home — User flow: What's the Issue? → Schedule a Visit → Tech On the Way
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
  const issues = [
    { label: 'Burst Pipe', urgent: true },
    { label: 'No Hot Water', urgent: true },
    { label: 'Backed-Up Drain', urgent: false },
    { label: 'Leaky Faucet', urgent: false },
    { label: 'Water Heater', urgent: false },
    { label: 'Remodel / Install', urgent: false },
  ];
  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <div style={{ padding: '5px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.07)', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: '7px', fontWeight: 900, color: '#0a0a0a', letterSpacing: '0.04em' }}>PRIME HOME</div>
          <div style={{ fontSize: '3.5px', color: b.accent, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.5px' }}>24/7 Service</div>
        </div>
        <div style={{ padding: '2.5px 6px', background: '#fef2f2', borderRadius: '3px', border: '1px solid #fecaca' }}>
          <span style={{ fontSize: '3.5px', fontWeight: 700, color: '#dc2626' }}>EMERGENCY?</span>
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', padding: '8px 12px 8px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '13px', fontWeight: 900, color: '#0a0a0a', letterSpacing: '-0.03em', marginBottom: '3px', flexShrink: 0 }}>What's the Issue?</div>
        <div style={{ fontSize: '4px', color: '#9ca3af', marginBottom: '8px', flexShrink: 0 }}>Select the type of service needed</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', flex: 1, overflow: 'hidden' }}>
          {issues.map((issue, i) => (
            <div key={issue.label} style={{ padding: '8px 7px', background: i === 0 ? '#fef2f2' : '#f9fafb', borderRadius: '5px', border: `1px solid ${i === 0 ? '#fca5a5' : 'rgba(0,0,0,0.07)'}`, display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: i < 2 ? '#dc2626' : b.accent, opacity: i < 2 ? 1 : 0.5 }} />
              <div style={{ fontSize: '4.5px', fontWeight: 700, color: '#0a0a0a' }}>{issue.label}</div>
              {issue.urgent && <div style={{ fontSize: '3px', color: '#dc2626', fontWeight: 600 }}>Urgent</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Step2({ b }: { b: Biz }) {
  const slots = ['ASAP — Next available', 'Today AM (8–12)', 'Today PM (12–5)', 'Tomorrow AM', 'Tomorrow PM', 'Schedule later'];
  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <div style={{ padding: '5px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.07)', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: '7px', fontWeight: 900, color: '#0a0a0a', letterSpacing: '0.04em' }}>PRIME HOME</div>
          <div style={{ fontSize: '3.5px', color: b.accent, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.5px' }}>Burst Pipe Selected</div>
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', padding: '8px 12px 8px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '12px', fontWeight: 900, color: '#0a0a0a', letterSpacing: '-0.03em', marginBottom: '7px', flexShrink: 0 }}>When Do You<br />Need Us?</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: 1, overflow: 'hidden' }}>
          {slots.map((slot, i) => (
            <div key={slot} style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '6px 8px', background: i === 0 ? `${b.accent}10` : '#f9fafb', borderRadius: '4px', border: `1px solid ${i === 0 ? b.accent + '44' : 'rgba(0,0,0,0.07)'}` }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', border: `1.5px solid ${i === 0 ? b.accent : 'rgba(0,0,0,0.2)'}`, background: i === 0 ? b.accent : 'transparent', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {i === 0 && <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#fff' }} />}
              </div>
              <span style={{ fontSize: '5px', fontWeight: i === 0 ? 700 : 400, color: i === 0 ? '#0a0a0a' : '#6b7280' }}>{slot}</span>
              {i === 0 && <span style={{ marginLeft: 'auto', fontSize: '3px', fontWeight: 700, color: '#22c55e' }}>~45 min ETA</span>}
            </div>
          ))}
        </div>

        <div style={{ marginTop: '8px', padding: '7px 10px', background: b.accent, borderRadius: '4px', textAlign: 'center', fontSize: '6px', fontWeight: 900, color: '#fff', flexShrink: 0 }}>
          Dispatch Now →
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
          <div style={{ fontSize: '7px', fontWeight: 900, color: '#0a0a0a', letterSpacing: '0.04em' }}>PRIME HOME</div>
        </div>
        <div style={{ padding: '2.5px 6px', background: '#f0fdf4', borderRadius: '3px', border: '1px solid #86efac' }}>
          <span style={{ fontSize: '3.5px', fontWeight: 700, color: '#16a34a' }}>ON THE WAY</span>
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', padding: '10px 14px', display: 'flex', flexDirection: 'column' }}>
        {/* ETA banner */}
        <div style={{ padding: '8px 10px', background: `${b.accent}10`, borderRadius: '6px', border: `1px solid ${b.accent}33`, marginBottom: '10px', textAlign: 'center', flexShrink: 0 }}>
          <div style={{ fontSize: '5px', color: b.accent, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '2px' }}>Estimated Arrival</div>
          <div style={{ fontSize: '22px', fontWeight: 900, color: '#0a0a0a', lineHeight: 1, letterSpacing: '-0.03em' }}>~42 min</div>
          <div style={{ fontSize: '3.5px', color: '#9ca3af', marginTop: '2px' }}>ETA 10:23 AM · Tracking active</div>
        </div>

        {/* Tech card */}
        <div style={{ padding: '7px 9px', background: '#f9fafb', borderRadius: '5px', border: '1px solid rgba(0,0,0,0.07)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: b.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: '9px', color: '#fff', fontWeight: 900 }}>T</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '5.5px', fontWeight: 700, color: '#0a0a0a', marginBottom: '1.5px' }}>Tony R. · Licensed Tech</div>
            <div style={{ fontSize: '3.5px', color: '#9ca3af' }}>9 yrs · 4.9★ · 830 jobs completed</div>
          </div>
          <div style={{ padding: '3px 7px', background: b.accent, borderRadius: '3px' }}>
            <span style={{ fontSize: '3.5px', fontWeight: 700, color: '#fff' }}>Call</span>
          </div>
        </div>

        <div style={{ padding: '7px 9px', background: '#f9fafb', borderRadius: '5px', border: '1px solid rgba(0,0,0,0.07)', flexShrink: 0 }}>
          {[['Issue', 'Burst Pipe — Urgent'], ['Address', '2114 Woodward Ave'], ['Service', 'Emergency Repair'], ['Estimate', 'Free · On-site diagnosis']].map(([label, val]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3.5px' }}>
              <span style={{ fontSize: '3.5px', color: '#9ca3af' }}>{label}</span>
              <span style={{ fontSize: '3.5px', color: '#0a0a0a', fontWeight: 600 }}>{val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const PRIME_HOME_FLOW_LABELS: [string, string, string] = ['What\'s the Issue?', 'Schedule a Visit', 'Tech On the Way'];

export function PhonePrimeHomeFlowScreen({ b, step }: { b: Biz; step: 0 | 1 | 2 }) {
  if (step === 0) return <Step1 b={b} />;
  if (step === 1) return <Step2 b={b} />;
  return <Step3 b={b} />;
}
