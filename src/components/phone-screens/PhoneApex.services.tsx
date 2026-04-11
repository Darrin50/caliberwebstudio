/**
 * Apex Athletics — Services screen
 * Design language: HIGH PERFORMANCE / ATHLETIC DARK
 * Score: 4 → 5. Breaks service rows with left accent bar + price template.
 * Approach: program tile grid with intensity level indicators + outcome labels.
 * Featured program card with trial CTA. Each tile shows intensity bar, duration, outcome.
 * Reads like a real performance facility's program catalog (Equinox / F45 level).
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

export function PhoneApexServices({ b }: { b: Biz }) {
  const programs = [
    {
      name: 'Personal Training', price: 'From $79/mo', duration: '60 min sessions',
      intensity: 85, outcome: 'Strength · Composition', tier: 'All levels', featured: true,
    },
    {
      name: 'Athletic Performance', price: 'From $89/mo', duration: '45 min sessions',
      intensity: 95, outcome: 'Speed · Power · Agility', tier: 'Intermediate+', featured: false,
    },
    {
      name: 'Nutrition Coaching', price: 'From $49/mo', duration: '50 min/wk check-in',
      intensity: 40, outcome: 'Fueling · Body Recomp', tier: 'All levels', featured: false,
    },
    {
      name: 'Recovery Programs', price: 'Included', duration: '30 min sessions',
      intensity: 30, outcome: 'Mobility · Injury Prev.', tier: 'All levels', featured: false,
    },
  ];

  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />

      {/* Nav */}
      <div style={{ padding: '5px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: '8px', fontWeight: 900, color: '#fff', letterSpacing: '0.08em' }}>APEX</div>
          <div style={{ fontSize: '4px', color: b.accent, letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: '1px' }}>Performance Training</div>
        </div>
        <div style={{ padding: '3px 6px', background: `${b.accent}22`, borderRadius: '3px', border: `1px solid ${b.accent}55` }}>
          <div style={{ fontSize: '3.5px', fontWeight: 700, color: b.accent }}>FREE TRIAL</div>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '8px 12px 8px' }}>

        {/* Header */}
        <div style={{ marginBottom: '8px', flexShrink: 0 }}>
          <div style={{ fontSize: '4px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '1.5px' }}>What We Offer</div>
          <div style={{ fontSize: '14px', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>Our Programs</div>
        </div>

        {/* Featured program */}
        <div style={{ padding: '9px 11px', background: `${b.accent}22`, borderRadius: '6px', border: `1.5px solid ${b.accent}`, marginBottom: '6px', flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
            <div>
              <div style={{ fontSize: '3.5px', color: b.accent, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1.5px', fontWeight: 700 }}>Most Popular</div>
              <div style={{ fontSize: '9px', fontWeight: 900, color: '#fff', letterSpacing: '-0.01em' }}>Personal Training</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '9px', fontWeight: 900, color: '#fff', lineHeight: 1 }}>From $79/mo</div>
              <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.5)', marginTop: '1px' }}>60 min sessions</div>
            </div>
          </div>
          {/* Intensity bar */}
          <div style={{ marginBottom: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
              <span style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.5)' }}>Intensity</span>
              <span style={{ fontSize: '3.5px', color: b.accent, fontWeight: 700 }}>85%</span>
            </div>
            <div style={{ height: '3px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '85%', background: b.accent, borderRadius: '2px' }} />
            </div>
          </div>
          <div style={{ fontSize: '4px', color: 'rgba(255,255,255,0.55)' }}>Outcome: Strength · Composition · All levels</div>
        </div>

        {/* Program list */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '3px', marginBottom: '7px' }}>
          {programs.slice(1).map(({ name, price, duration, intensity, outcome, tier }) => (
            <div key={name} style={{ padding: '6px 8px', background: 'rgba(255,255,255,0.04)', borderRadius: '5px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3px' }}>
                <div>
                  <div style={{ fontSize: '5.5px', fontWeight: 700, color: '#fff' }}>{name}</div>
                  <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.3)', marginTop: '1px' }}>{duration} · {tier}</div>
                </div>
                <div style={{ fontSize: '5.5px', fontWeight: 800, color: intensity >= 80 ? b.accent : 'rgba(255,255,255,0.5)', flexShrink: 0 }}>{price}</div>
              </div>
              {/* Mini intensity bar */}
              <div style={{ height: '2px', background: 'rgba(255,255,255,0.07)', borderRadius: '1px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${intensity}%`, background: intensity >= 80 ? b.accent : intensity >= 50 ? '#f59e0b' : '#22c55e', borderRadius: '1px' }} />
              </div>
              <div style={{ fontSize: '3px', color: 'rgba(255,255,255,0.25)', marginTop: '2px' }}>Outcome: {outcome}</div>
            </div>
          ))}
        </div>

        {/* Trial CTA */}
        <div style={{ marginTop: 'auto' }}>
          <div style={{ padding: '8px 12px', background: b.accent, borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em' }}>No commitment · First session free</div>
              <div style={{ fontSize: '7px', fontWeight: 900, color: '#fff' }}>Start Free Trial →</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
