/**
 * Ardor — User flow: Browse Menu → Reserve a Table → Confirmed
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
  const items = [
    { name: "Wagyu Bavette", price: "$48", tag: "Chef's Pick", section: "Mains" },
    { name: "Seared Diver Scallops", price: "$36", tag: "Seasonal", section: "Starters" },
    { name: "Duck Leg Confit", price: "$42", tag: null, section: "Mains" },
    { name: "Roasted Beet Salad", price: "$18", tag: "Vegan", section: "Starters" },
  ];
  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <div style={{ padding: '5px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
        <div style={{ fontSize: '8px', fontWeight: 900, color: '#fff', letterSpacing: '0.06em', fontStyle: 'italic' }}>ARDOR</div>
        <div style={{ fontSize: '4px', color: b.accent, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Tonight's Menu</div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', padding: '8px 12px 8px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '13px', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1, fontStyle: 'italic', marginBottom: '8px', flexShrink: 0 }}>Tonight's Menu</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, overflow: 'hidden' }}>
          {items.map(item => (
            <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '6px 8px', background: 'rgba(255,255,255,0.04)', borderRadius: '4px', borderLeft: `2px solid ${item.tag === "Chef's Pick" ? b.accent : 'rgba(255,255,255,0.08)'}` }}>
              <div>
                <div style={{ fontSize: '5.5px', fontWeight: 700, color: '#fff', marginBottom: '2px' }}>{item.name}</div>
                <div style={{ display: 'flex', gap: '3px' }}>
                  <span style={{ fontSize: '3px', color: 'rgba(255,255,255,0.3)', padding: '1px 3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px' }}>{item.section}</span>
                  {item.tag && <span style={{ fontSize: '3px', color: b.accent, padding: '1px 3px', background: `${b.accent}18`, borderRadius: '2px' }}>{item.tag}</span>}
                </div>
              </div>
              <div style={{ fontSize: '6px', fontWeight: 800, color: '#fff', flexShrink: 0 }}>{item.price}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '8px', padding: '7px 10px', background: b.accent, borderRadius: '4px', textAlign: 'center', fontSize: '6.5px', fontWeight: 900, color: '#000', flexShrink: 0 }}>
          Reserve a Table →
        </div>
      </div>
    </div>
  );
}

function Step2({ b }: { b: Biz }) {
  const days = [['Mon', '7'], ['Tue', '8'], ['Wed', '9'], ['Thu', '10'], ['Fri', '11'], ['Sat', '12']];
  const times = ['5:00 PM', '5:30 PM', '6:00 PM', '7:00 PM', '7:30 PM', '8:00 PM'];
  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <div style={{ padding: '5px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
        <div style={{ fontSize: '8px', fontWeight: 900, color: '#fff', letterSpacing: '0.06em', fontStyle: 'italic' }}>ARDOR</div>
        <div style={{ fontSize: '4px', color: b.accent, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Reservations</div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', padding: '8px 12px 8px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '12px', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', fontStyle: 'italic', marginBottom: '8px', flexShrink: 0 }}>Reserve a Table</div>

        <div style={{ marginBottom: '7px', flexShrink: 0 }}>
          <div style={{ fontSize: '4px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '3px' }}>Party Size</div>
          <div style={{ display: 'flex', gap: '4px' }}>
            {[2, 4, 6, '8+'].map((n, i) => (
              <div key={String(n)} style={{ flex: 1, padding: '5px 0', textAlign: 'center', background: i === 0 ? b.accent : 'rgba(255,255,255,0.06)', borderRadius: '4px', fontSize: '5.5px', fontWeight: 700, color: i === 0 ? '#000' : 'rgba(255,255,255,0.45)' }}>{n}</div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '7px', flexShrink: 0 }}>
          <div style={{ fontSize: '4px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '3px' }}>Select Date</div>
          <div style={{ display: 'flex', gap: '3px' }}>
            {days.map(([d, n], i) => (
              <div key={d} style={{ flex: 1, padding: '4px 0', textAlign: 'center', background: i === 4 ? b.accent : 'rgba(255,255,255,0.06)', borderRadius: '3px' }}>
                <div style={{ fontSize: '3px', color: i === 4 ? '#000' : 'rgba(255,255,255,0.3)', marginBottom: '1.5px' }}>{d}</div>
                <div style={{ fontSize: '5px', fontWeight: 700, color: i === 4 ? '#000' : 'rgba(255,255,255,0.55)' }}>{n}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, overflow: 'hidden' }}>
          <div style={{ fontSize: '4px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '3px' }}>Available Times</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '3px' }}>
            {times.map((t, i) => (
              <div key={t} style={{ padding: '5px 0', textAlign: 'center', background: i === 2 ? `${b.accent}28` : 'rgba(255,255,255,0.06)', borderRadius: '3px', border: i === 2 ? `1px solid ${b.accent}66` : '1px solid transparent', fontSize: '4px', fontWeight: 600, color: i === 2 ? b.accent : 'rgba(255,255,255,0.45)' }}>{t}</div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '7px', padding: '7px 10px', background: b.accent, borderRadius: '4px', textAlign: 'center', fontSize: '6.5px', fontWeight: 900, color: '#000', flexShrink: 0 }}>
          Confirm Reservation →
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
        <div style={{ fontSize: '8px', fontWeight: 900, color: '#fff', letterSpacing: '0.06em', fontStyle: 'italic' }}>ARDOR</div>
        <div style={{ fontSize: '4px', color: b.accent, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Confirmed</div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', padding: '10px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: `${b.accent}22`, border: `2px solid ${b.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px', flexShrink: 0 }}>
          <span style={{ fontSize: '13px', color: b.accent, lineHeight: 1 }}>✓</span>
        </div>
        <div style={{ fontSize: '11px', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', fontStyle: 'italic', marginBottom: '3px', textAlign: 'center' }}>You're Confirmed</div>
        <div style={{ fontSize: '4px', color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginBottom: '12px' }}>Friday, April 11 · 6:00 PM</div>

        <div style={{ width: '100%', padding: '8px 10px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', border: `1px solid ${b.accent}33`, marginBottom: '8px' }}>
          {[['Restaurant', 'Ardor · Corktown'], ['Date', 'Friday, April 11'], ['Time', '6:00 PM'], ['Party', '2 Guests'], ['Table', '#14 — Window Seat']].map(([label, val]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.3)' }}>{label}</span>
              <span style={{ fontSize: '3.5px', color: '#fff', fontWeight: 600 }}>{val}</span>
            </div>
          ))}
        </div>

        <div style={{ padding: '6px 10px', background: `${b.accent}18`, borderRadius: '4px', border: `1px solid ${b.accent}33`, width: '100%', textAlign: 'center', fontSize: '5px', fontWeight: 700, color: b.accent }}>
          Add to Calendar
        </div>
      </div>
    </div>
  );
}

export const ARDOR_FLOW_LABELS: [string, string, string] = ['Browse Menu', 'Pick a Time', 'Reservation Confirmed'];

export function PhoneArdorFlowScreen({ b, step }: { b: Biz; step: 0 | 1 | 2 }) {
  if (step === 0) return <Step1 b={b} />;
  if (step === 1) return <Step2 b={b} />;
  return <Step3 b={b} />;
}
