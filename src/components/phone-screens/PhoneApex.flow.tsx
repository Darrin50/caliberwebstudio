/**
 * Apex Athletics — User flow: Explore Programs → Schedule Free Trial → Welcome to Apex
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
  const programs = [
    { name: 'Personal Training', price: 'From $79/mo', intensity: 85, outcome: 'Strength · Composition', tier: 'All Levels' },
    { name: 'Athletic Performance', price: 'From $89/mo', intensity: 95, outcome: 'Speed · Power · Agility', tier: 'Intermediate+' },
    { name: 'Nutrition Coaching', price: 'From $49/mo', intensity: 40, outcome: 'Fueling · Body Recomp', tier: 'All Levels' },
    { name: 'Recovery Programs', price: 'Included', intensity: 30, outcome: 'Mobility · Injury Prev.', tier: 'All Levels' },
  ];
  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <div style={{ padding: '5px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
        <div style={{ fontSize: '8px', fontWeight: 900, color: '#fff', letterSpacing: '0.08em' }}>APEX</div>
        <div style={{ padding: '2.5px 6px', background: `${b.accent}22`, borderRadius: '3px', border: `1px solid ${b.accent}55` }}>
          <span style={{ fontSize: '3.5px', fontWeight: 700, color: b.accent }}>FREE TRIAL</span>
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', padding: '8px 12px 8px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '13px', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', marginBottom: '8px', flexShrink: 0 }}>Our Programs</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, overflow: 'hidden' }}>
          {programs.map(p => (
            <div key={p.name} style={{ padding: '6px 8px', background: 'rgba(255,255,255,0.04)', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                <div>
                  <div style={{ fontSize: '5px', fontWeight: 700, color: '#fff', marginBottom: '1px' }}>{p.name}</div>
                  <div style={{ fontSize: '3px', color: 'rgba(255,255,255,0.3)' }}>{p.tier}</div>
                </div>
                <div style={{ fontSize: '5px', fontWeight: 800, color: p.intensity >= 80 ? b.accent : 'rgba(255,255,255,0.45)', flexShrink: 0 }}>{p.price}</div>
              </div>
              <div style={{ height: '2px', background: 'rgba(255,255,255,0.07)', borderRadius: '1px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${p.intensity}%`, background: p.intensity >= 80 ? b.accent : p.intensity >= 50 ? '#f59e0b' : '#22c55e', borderRadius: '1px' }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '8px', padding: '7px 10px', background: b.accent, borderRadius: '4px', textAlign: 'center', fontSize: '6px', fontWeight: 900, color: '#fff', flexShrink: 0 }}>
          Start Free Trial →
        </div>
      </div>
    </div>
  );
}

function Step2({ b }: { b: Biz }) {
  const times = ['6:00 AM', '7:30 AM', '9:00 AM', '12:00 PM', '4:00 PM', '5:30 PM'];
  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <div style={{ padding: '5px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
        <div style={{ fontSize: '8px', fontWeight: 900, color: '#fff', letterSpacing: '0.08em' }}>APEX</div>
        <div style={{ fontSize: '4px', color: b.accent, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Free Trial</div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', padding: '8px 12px 8px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '12px', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', marginBottom: '8px', flexShrink: 0 }}>Schedule Your<br />First Session</div>

        {/* Trainer card */}
        <div style={{ padding: '7px 9px', background: `${b.accent}18`, borderRadius: '5px', border: `1px solid ${b.accent}44`, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: b.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: '9px', color: '#fff', fontWeight: 900 }}>J</span>
          </div>
          <div>
            <div style={{ fontSize: '5.5px', fontWeight: 700, color: '#fff', marginBottom: '1.5px' }}>Jordan Mitchell · CSCS</div>
            <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.4)' }}>Personal Training · 8 yrs exp · Southfield</div>
          </div>
        </div>

        <div style={{ flex: 1, overflow: 'hidden' }}>
          <div style={{ fontSize: '4px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '4px' }}>Tomorrow's Availability</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '3px' }}>
            {times.map((t, i) => (
              <div key={t} style={{ padding: '5px 0', textAlign: 'center', background: i === 2 ? `${b.accent}28` : 'rgba(255,255,255,0.05)', borderRadius: '3px', border: i === 2 ? `1px solid ${b.accent}55` : '1px solid transparent', fontSize: '3.5px', fontWeight: i === 2 ? 700 : 400, color: i === 2 ? b.accent : 'rgba(255,255,255,0.4)' }}>{t}</div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '8px' }}>
          <div style={{ padding: '5px 8px', background: 'rgba(255,255,255,0.04)', borderRadius: '4px', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
            <span style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.55)' }}>No commitment · First session completely free</span>
          </div>
          <div style={{ padding: '7px 10px', background: b.accent, borderRadius: '4px', textAlign: 'center', fontSize: '6px', fontWeight: 900, color: '#fff' }}>
            Reserve 9:00 AM →
          </div>
        </div>
      </div>
    </div>
  );
}

function Step3({ b }: { b: Biz }) {
  const goals = ['Build lean muscle', 'Improve athletic performance', 'Lose body fat', 'Increase endurance'];
  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <div style={{ padding: '5px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
        <div style={{ fontSize: '8px', fontWeight: 900, color: '#fff', letterSpacing: '0.08em' }}>APEX</div>
        <div style={{ fontSize: '4px', color: '#22c55e', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Welcome</div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', padding: '10px 14px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', flexShrink: 0 }}>
          <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: `${b.accent}22`, border: `2px solid ${b.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: '11px', color: b.accent, lineHeight: 1 }}>✓</span>
          </div>
          <div>
            <div style={{ fontSize: '10px', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>Welcome to Apex</div>
            <div style={{ fontSize: '4px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>Tomorrow 9:00 AM · Jordan Mitchell</div>
          </div>
        </div>

        <div style={{ padding: '7px 9px', background: 'rgba(255,255,255,0.04)', borderRadius: '5px', border: '1px solid rgba(255,255,255,0.07)', marginBottom: '8px', flexShrink: 0 }}>
          <div style={{ fontSize: '4px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '5px' }}>Your Goals</div>
          {goals.map((g, i) => (
            <div key={g} style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '4px' }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '2px', background: i === 0 ? b.accent : 'rgba(255,255,255,0.08)', border: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.12)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {i === 0 && <span style={{ fontSize: '4px', color: '#fff', lineHeight: 1 }}>✓</span>}
              </div>
              <span style={{ fontSize: '4px', color: i === 0 ? '#fff' : 'rgba(255,255,255,0.35)' }}>{g}</span>
            </div>
          ))}
        </div>

        <div style={{ padding: '6px 8px', background: `${b.accent}18`, borderRadius: '4px', border: `1px solid ${b.accent}44`, flexShrink: 0 }}>
          <div style={{ fontSize: '3.5px', color: b.accent, fontWeight: 700, marginBottom: '2px' }}>Jordan will call you today</div>
          <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.4)' }}>To go over your intake and confirm your goals before your first session.</div>
        </div>
      </div>
    </div>
  );
}

export const APEX_FLOW_LABELS: [string, string, string] = ['Explore Programs', 'Schedule Free Trial', 'Welcome to Apex'];

export function PhoneApexFlowScreen({ b, step }: { b: Biz; step: 0 | 1 | 2 }) {
  if (step === 0) return <Step1 b={b} />;
  if (step === 1) return <Step2 b={b} />;
  return <Step3 b={b} />;
}
