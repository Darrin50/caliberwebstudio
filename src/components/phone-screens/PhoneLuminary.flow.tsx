/**
 * Luminary Dental — User flow: Explore Treatments → Book Free Consult → Consultation Confirmed
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
  const treatments = [
    { name: 'Smile Makeover', price: 'From $2,400', icon: '◈', tag: 'Most Transformative', featured: true },
    { name: 'Porcelain Veneers', price: 'From $950/tooth', icon: '▬', tag: 'Lifetime warranty', featured: false },
    { name: 'Invisalign', price: 'From $4,200', icon: '◻', tag: 'Diamond Provider', featured: false },
    { name: 'Teeth Whitening', price: 'From $399', icon: '◎', tag: 'Same day', featured: false },
  ];
  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <div style={{ padding: '5px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.07)', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: '8px', fontWeight: 900, color: '#0a0a0a', letterSpacing: '0.04em' }}>LUMINARY</div>
          <div style={{ fontSize: '4px', color: b.accent, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '0.5px' }}>Smile Aesthetics</div>
        </div>
        <div style={{ padding: '2.5px 7px', background: `${b.accent}12`, borderRadius: '3px', border: `1px solid ${b.accent}33` }}>
          <span style={{ fontSize: '3.5px', fontWeight: 700, color: b.accent }}>FREE CONSULT</span>
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', padding: '8px 12px 8px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '13px', fontWeight: 900, color: '#0a0a0a', letterSpacing: '-0.03em', marginBottom: '8px', flexShrink: 0 }}>Our Treatments</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, overflow: 'hidden' }}>
          {treatments.map(t => (
            <div key={t.name} style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '6px 8px', background: t.featured ? `${b.accent}08` : '#f9fafb', borderRadius: '5px', border: `1px solid ${t.featured ? b.accent + '33' : 'rgba(0,0,0,0.07)'}`, borderLeft: `3px solid ${b.accent}` }}>
              <div style={{ width: '14px', height: '14px', borderRadius: '3px', background: `${b.accent}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: '7px', color: b.accent, lineHeight: 1 }}>{t.icon}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '5.5px', fontWeight: 700, color: '#0a0a0a', marginBottom: '1.5px' }}>{t.name}</div>
                <span style={{ fontSize: '3px', color: b.accent, padding: '1px 3px', background: `${b.accent}0f`, borderRadius: '2px' }}>{t.tag}</span>
              </div>
              <div style={{ fontSize: '5px', fontWeight: 800, color: '#0a0a0a', flexShrink: 0 }}>{t.price}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '8px', padding: '7px 10px', background: b.accent, borderRadius: '4px', textAlign: 'center', fontSize: '6px', fontWeight: 900, color: '#fff', flexShrink: 0 }}>
          Book Free Consultation →
        </div>
      </div>
    </div>
  );
}

function Step2({ b }: { b: Biz }) {
  const concerns = ['Stained / Yellowing', 'Chipped / Cracked', 'Gaps Between Teeth', 'Crooked / Misaligned', 'Gum Concerns', 'Full Smile Refresh'];
  const times = ['8:00 AM', '9:30 AM', '11:00 AM', '2:00 PM', '3:30 PM', '4:45 PM'];
  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <div style={{ padding: '5px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.07)', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: '8px', fontWeight: 900, color: '#0a0a0a', letterSpacing: '0.04em' }}>LUMINARY</div>
        </div>
        <div style={{ fontSize: '4px', color: b.accent, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Free Consult</div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', padding: '8px 12px 8px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '12px', fontWeight: 900, color: '#0a0a0a', letterSpacing: '-0.03em', marginBottom: '7px', flexShrink: 0 }}>Book Your<br />Free Consult</div>

        <div style={{ marginBottom: '7px', flexShrink: 0 }}>
          <div style={{ fontSize: '4px', color: '#9ca3af', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '3px' }}>Primary Concern</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px' }}>
            {concerns.slice(0, 4).map((c, i) => (
              <div key={c} style={{ padding: '5px 6px', background: i === 0 ? `${b.accent}10` : '#f9fafb', borderRadius: '3px', border: `1px solid ${i === 0 ? b.accent + '44' : 'rgba(0,0,0,0.06)'}`, fontSize: '3.5px', fontWeight: i === 0 ? 700 : 400, color: i === 0 ? b.accent : '#6b7280', textAlign: 'center' }}>{c}</div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, overflow: 'hidden' }}>
          <div style={{ fontSize: '4px', color: '#9ca3af', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '3px' }}>Available This Week</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '3px' }}>
            {times.map((t, i) => (
              <div key={t} style={{ padding: '5px 0', textAlign: 'center', background: i === 1 ? `${b.accent}12` : '#f9fafb', borderRadius: '3px', border: `1px solid ${i === 1 ? b.accent + '44' : 'rgba(0,0,0,0.06)'}`, fontSize: '3.5px', fontWeight: i === 1 ? 700 : 400, color: i === 1 ? b.accent : '#9ca3af' }}>{t}</div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '7px', padding: '7px 10px', background: b.accent, borderRadius: '4px', textAlign: 'center', fontSize: '6px', fontWeight: 900, color: '#fff', flexShrink: 0 }}>
          Confirm 9:30 AM →
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
          <div style={{ fontSize: '8px', fontWeight: 900, color: '#0a0a0a', letterSpacing: '0.04em' }}>LUMINARY</div>
        </div>
        <div style={{ padding: '2.5px 6px', background: '#f0fdf4', borderRadius: '3px', border: '1px solid #86efac' }}>
          <span style={{ fontSize: '3.5px', fontWeight: 700, color: '#16a34a' }}>CONFIRMED</span>
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', padding: '10px 14px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', flexShrink: 0 }}>
          <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: `${b.accent}15`, border: `2px solid ${b.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: '11px', color: b.accent, lineHeight: 1 }}>✓</span>
          </div>
          <div>
            <div style={{ fontSize: '10px', fontWeight: 900, color: '#0a0a0a', letterSpacing: '-0.02em', lineHeight: 1 }}>Consultation Confirmed</div>
            <div style={{ fontSize: '4px', color: '#9ca3af', marginTop: '2px' }}>Wed Apr 9 · 9:30 AM · Free</div>
          </div>
        </div>

        {/* Doctor card */}
        <div style={{ padding: '7px 9px', background: '#f9fafb', borderRadius: '5px', border: '1px solid rgba(0,0,0,0.07)', marginBottom: '7px', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: `${b.accent}18`, border: `1.5px solid ${b.accent}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: '9px', color: b.accent, fontWeight: 900 }}>L</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '5.5px', fontWeight: 700, color: '#0a0a0a', marginBottom: '1.5px' }}>Dr. Laura Chen · DDS, AACD</div>
            <div style={{ fontSize: '3.5px', color: '#9ca3af' }}>Cosmetic Dentistry · 14 yrs · Birmingham, MI</div>
          </div>
        </div>

        <div style={{ padding: '7px 9px', background: '#f9fafb', borderRadius: '5px', border: '1px solid rgba(0,0,0,0.07)', marginBottom: '7px', flexShrink: 0 }}>
          {[['Concern', 'Stained / Yellowing'], ['Date', 'Wednesday, April 9'], ['Time', '9:30 AM'], ['Type', 'Free Consultation'], ['Location', 'Birmingham, MI 48009']].map(([label, val]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3.5px' }}>
              <span style={{ fontSize: '3.5px', color: '#9ca3af' }}>{label}</span>
              <span style={{ fontSize: '3.5px', color: '#0a0a0a', fontWeight: 600 }}>{val}</span>
            </div>
          ))}
        </div>

        <div style={{ padding: '5px 8px', background: `${b.accent}08`, borderRadius: '4px', border: `1px solid ${b.accent}22`, fontSize: '3.5px', color: b.accent, textAlign: 'center', fontWeight: 600 }}>
          Bring any x-rays or prior dental records
        </div>
      </div>
    </div>
  );
}

export const LUMINARY_FLOW_LABELS: [string, string, string] = ['Explore Treatments', 'Book Free Consult', 'Consultation Confirmed'];

export function PhoneLuminaryFlowScreen({ b, step }: { b: Biz; step: 0 | 1 | 2 }) {
  if (step === 0) return <Step1 b={b} />;
  if (step === 1) return <Step2 b={b} />;
  return <Step3 b={b} />;
}
