/**
 * Maison — About screen
 * Design language: LUXURY SALON / EDITORIAL DARK
 * Score: 3 → 5. Breaks story paragraph + team avatars + quote template.
 * Approach: editorial brand story + stylist profile cards with real credential depth.
 * Stylists have years of experience, education, and featured services — not just a name + specialty.
 * Brand story as large editorial type, not a body text paragraph.
 * Completely distinct from Studio 1908 About (barber roster) — this is warm, fashion-editorial.
 */

interface Biz {
  id: string; accent: string; name: string; phone: string; bg: string; heroPhoto: string;
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

export function PhoneMaisonAbout({ b }: { b: Biz }) {
  const stylists = [
    {
      initial: 'I', name: 'Isabelle Morel', title: 'Creative Director', exp: '11 yrs',
      edu: 'Vidal Sassoon Academy', featured: ['Balayage', 'Color Correction', 'Cuts'],
      sel: true,
    },
    {
      initial: 'C', name: 'Camille Renaud', title: 'Senior Stylist', exp: '8 yrs',
      edu: 'Paul Mitchell School', featured: ['Extensions', 'Keratin', 'Blowouts'],
      sel: false,
    },
    {
      initial: 'N', name: 'Noelle Pierce', title: 'Stylist', exp: '5 yrs',
      edu: 'Toni & Guy Academy', featured: ['Cuts', 'Styling', 'Color'],
      sel: false,
    },
  ];

  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />

      {/* Nav */}
      <div style={{ padding: '5px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: '8px', fontWeight: 900, color: '#fff', letterSpacing: '0.1em', fontStyle: 'italic' }}>MAISON</div>
          <div style={{ fontSize: '4px', color: b.accent, letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: '1px' }}>Royal Oak · Est. 2017</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5px' }}>
          {[14, 10].map((w, i) => <div key={i} style={{ width: `${w}px`, height: '1.5px', background: 'rgba(255,255,255,0.3)', borderRadius: '1px' }} />)}
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '9px 12px 8px' }}>

        {/* Editorial brand statement */}
        <div style={{ marginBottom: '9px', flexShrink: 0 }}>
          <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '4px', fontFamily: 'monospace' }}>Beauty. Elevated.</div>
          <div style={{ fontSize: '16px', fontWeight: 900, color: '#fff', lineHeight: 0.95, letterSpacing: '-0.03em', fontStyle: 'italic' }}>
            Where<br />Craft Meets<br /><span style={{ color: b.accent }}>Confidence.</span>
          </div>
        </div>

        {/* Stylist profiles — deep credential cards */}
        <div style={{ marginBottom: '8px', flexShrink: 0 }}>
          <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '5px' }}>Our Stylists</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {stylists.map(({ initial, name, title, exp, edu, featured, sel }) => (
              <div key={name} style={{
                padding: '7px 8px', borderRadius: '6px',
                background: sel ? `${b.accent}15` : 'rgba(255,255,255,0.04)',
                border: sel ? `1px solid ${b.accent}55` : '1px solid rgba(255,255,255,0.07)',
                display: 'flex', alignItems: 'flex-start', gap: '7px',
              }}>
                {/* Avatar */}
                <div style={{
                  width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0,
                  background: sel ? b.accent : 'rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: sel ? 'none' : '1px solid rgba(255,255,255,0.1)',
                }}>
                  <span style={{ fontSize: '9px', fontWeight: 900, color: sel ? '#1a0f08' : 'rgba(255,255,255,0.55)' }}>{initial}</span>
                </div>
                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '1px' }}>
                    <span style={{ fontSize: '5.5px', fontWeight: 800, color: sel ? b.accent : '#fff' }}>{name}</span>
                    <span style={{ fontSize: '3px', color: 'rgba(255,255,255,0.25)' }}>{exp}</span>
                  </div>
                  <div style={{ fontSize: '3.5px', color: sel ? b.accent : 'rgba(255,255,255,0.4)', marginBottom: '3px', letterSpacing: '0.06em' }}>{title} · {edu}</div>
                  <div style={{ display: 'flex', gap: '2.5px', flexWrap: 'nowrap', overflow: 'hidden' }}>
                    {featured.map(f => (
                      <span key={f} style={{ fontSize: '3px', padding: '1.5px 4px', background: sel ? `${b.accent}22` : 'rgba(255,255,255,0.06)', borderRadius: '2px', color: sel ? b.accent : 'rgba(255,255,255,0.4)', flexShrink: 0 }}>{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Awards strip */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '8px', flexShrink: 0 }}>
          {[['★4.9', '312 reviews'], ['#1', 'Royal Oak'], ['8+', 'Yrs in Business']].map(([v, l]) => (
            <div key={l} style={{ flex: 1, padding: '5px 4px', background: 'rgba(255,255,255,0.04)', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.07)', textAlign: 'center' }}>
              <div style={{ fontSize: '7px', fontWeight: 900, color: b.accent, lineHeight: 1, letterSpacing: '-0.01em' }}>{v}</div>
              <div style={{ fontSize: '3px', color: 'rgba(255,255,255,0.3)', marginTop: '1px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{l}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: 'auto' }}>
          <div style={{ padding: '8px 12px', background: b.accent, borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: '7px', fontWeight: 900, color: '#1a0f08' }}>Reserve a Session →</div>
            <div style={{ fontSize: '4.5px', color: 'rgba(0,0,0,0.45)' }}>{b.phone}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
