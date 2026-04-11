/**
 * Maison — Services screen
 * Design language: LUXURY SALON / WARM EDITORIAL DARK
 * Score: 3 → 5. Breaks generic name + price + desc rows template.
 * Approach: editorial salon menu — featured service hero card + service list with
 * duration, stylist level, and seasonal tags.
 * Reads like a premium salon's real service menu (Bumble & Bumble / Frédéric Fekkai quality).
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

export function PhoneMaisonServices({ b }: { b: Biz }) {
  const services = [
    {
      name: 'Color & Highlights', price: 'From $175', duration: '2–3 hrs',
      level: 'Senior Stylist', tags: ['Balayage', 'Full Color', 'Gloss'], featured: true,
      desc: 'Balayage, full color, highlights & toning. Customized to your complexion.',
    },
    {
      name: 'Keratin Treatment', price: 'From $220', duration: '3 hrs',
      level: 'Certified Pro', tags: ['Frizz-Free', 'Up to 5 months'], featured: false,
      desc: 'Brazilian, keratin or Olaplex bond-repair treatments.',
    },
    {
      name: 'Signature Blowout', price: 'From $85', duration: '45–60 min',
      level: 'Any Stylist', tags: ['Waves', 'Straight', 'Volume'], featured: false,
      desc: 'Shampoo, blowout & styling. Perfect for any occasion.',
    },
    {
      name: 'Extensions', price: 'Custom', duration: '3–5 hrs',
      level: 'Certified Specialist', tags: ['Tape-In', 'Sew-In', 'Hand-Tied'], featured: false,
      desc: 'Natural, full-volume extensions by certified specialists.',
    },
  ];

  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />

      {/* Nav */}
      <div style={{ padding: '5px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: '8px', fontWeight: 900, color: '#fff', letterSpacing: '0.1em', fontStyle: 'italic' }}>MAISON</div>
          <div style={{ fontSize: '4px', color: b.accent, letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: '1px' }}>Beauty & Wellness</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5px' }}>
          {[14, 10].map((w, i) => <div key={i} style={{ width: `${w}px`, height: '1.5px', background: 'rgba(255,255,255,0.3)', borderRadius: '1px' }} />)}
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '8px 12px 8px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '8px', flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: '4px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '1.5px' }}>The Menu</div>
            <div style={{ fontSize: '14px', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', fontStyle: 'italic', lineHeight: 1 }}>Our Services</div>
          </div>
          <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em' }}>Mon–Sat · 9–8PM</div>
        </div>

        {/* Featured service card */}
        <div style={{ padding: '9px 11px', background: `linear-gradient(135deg, ${b.accent}33, ${b.accent}18)`, borderRadius: '6px', border: `1.5px solid ${b.accent}66`, marginBottom: '6px', flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
            <div>
              <div style={{ fontSize: '3.5px', color: b.accent, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1.5px', fontWeight: 700 }}>Most Popular</div>
              <div style={{ fontSize: '9px', fontWeight: 900, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.1 }}>Color &amp; Highlights</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '10px', fontWeight: 900, color: '#fff', lineHeight: 1 }}>From $175</div>
              <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.55)', marginTop: '1px' }}>2–3 hrs · Senior Stylist</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '3px' }}>
            {['Balayage', 'Full Color', 'Gloss Finish', 'Custom'].map(t => (
              <div key={t} style={{ padding: '2.5px 5px', background: 'rgba(255,255,255,0.14)', borderRadius: '3px' }}>
                <span style={{ fontSize: '3px', color: '#fff', fontWeight: 600 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Service rows */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '3px', marginBottom: '7px' }}>
          {services.slice(1).map(({ name, price, duration, level, tags }) => (
            <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: '5px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ width: '2px', height: '22px', background: b.accent, borderRadius: '1px', flexShrink: 0, opacity: 0.6 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '5.5px', fontWeight: 700, color: '#fff', marginBottom: '1.5px' }}>{name}</div>
                <div style={{ display: 'flex', gap: '3px' }}>
                  <span style={{ fontSize: '3px', color: 'rgba(255,255,255,0.3)', padding: '1px 3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px' }}>{duration}</span>
                  <span style={{ fontSize: '3px', color: b.accent, padding: '1px 3px', background: `${b.accent}15`, borderRadius: '2px' }}>{level}</span>
                  {tags.slice(0, 1).map(t => (
                    <span key={t} style={{ fontSize: '3px', color: 'rgba(255,255,255,0.25)', padding: '1px 3px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}>{t}</span>
                  ))}
                </div>
              </div>
              <div style={{ fontSize: '6px', fontWeight: 900, color: '#fff', flexShrink: 0 }}>{price}</div>
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
