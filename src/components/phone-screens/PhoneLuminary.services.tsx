/**
 * Luminary Dental — Services screen
 * Design language: CLEAN MEDICAL / PREMIUM AESTHETIC DENTAL
 * Score: 4 → 5. Replace emoji icons with clean geometric marks.
 * Featured treatment card (Smile Makeover) + treatment rows with duration + consult tag.
 * Price transparency is key — every treatment has a clear from-price.
 * Insurance note + consultation CTA. Reads like a real dental practice treatment menu.
 */

interface Biz {
  id: string; accent: string; name: string; phone: string;
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

export function PhoneLuminaryServices({ b }: { b: Biz }) {
  const treatments = [
    {
      name: 'Smile Makeover', price: 'From $2,400', duration: '2–4 visits',
      desc: 'Complete aesthetic transformation — veneers, whitening, contouring & more.',
      tags: ['Custom Plan', 'Phased Treatment', 'Financing'], icon: '◈', featured: true,
    },
    {
      name: 'Porcelain Veneers', price: 'From $950/tooth', duration: '2 visits',
      desc: 'Ultra-thin custom-crafted shells bonded to front teeth.',
      tags: ['Lifetime warranty', 'AACD technique'], icon: '▬', featured: false,
    },
    {
      name: 'Invisalign', price: 'From $4,200', duration: '12–18 months',
      desc: 'Clear aligner therapy — Diamond Provider. Includes retainers.',
      tags: ['Diamond Provider', 'Financing available'], icon: '◻', featured: false,
    },
    {
      name: 'Teeth Whitening', price: 'From $399', duration: '1 visit · 60 min',
      desc: 'In-office KöR whitening — up to 16 shades brighter.',
      tags: ['Same appointment', 'Take-home kit included'], icon: '◎', featured: false,
    },
  ];

  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />

      {/* Nav */}
      <div style={{ padding: '5px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.07)', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: '8px', fontWeight: 900, color: '#0a0a0a', letterSpacing: '0.04em' }}>LUMINARY</div>
          <div style={{ fontSize: '4px', color: b.accent, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '1px' }}>Smile Aesthetics</div>
        </div>
        <div style={{ padding: '3px 7px', background: `${b.accent}12`, borderRadius: '3px', border: `1px solid ${b.accent}33` }}>
          <div style={{ fontSize: '3.5px', fontWeight: 700, color: b.accent }}>FREE CONSULT</div>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '9px 12px 8px' }}>

        {/* Header */}
        <div style={{ marginBottom: '8px', flexShrink: 0 }}>
          <div style={{ fontSize: '4px', color: '#9ca3af', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '1.5px' }}>Smile Aesthetics</div>
          <div style={{ fontSize: '14px', fontWeight: 900, color: '#0a0a0a', letterSpacing: '-0.03em', lineHeight: 1 }}>Our Treatments</div>
        </div>

        {/* Featured treatment */}
        <div style={{ padding: '9px 11px', background: `${b.accent}0f`, borderRadius: '6px', border: `1.5px solid ${b.accent}55`, marginBottom: '6px', flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
            <div>
              <div style={{ fontSize: '3.5px', color: b.accent, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1.5px', fontWeight: 700 }}>Most Transformative</div>
              <div style={{ fontSize: '9px', fontWeight: 900, color: '#0a0a0a', letterSpacing: '-0.01em', lineHeight: 1.1 }}>Smile Makeover</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '9px', fontWeight: 900, color: b.accent, lineHeight: 1 }}>From $2,400</div>
              <div style={{ fontSize: '3.5px', color: '#9ca3af', marginTop: '1px' }}>2–4 visits</div>
            </div>
          </div>
          <div style={{ fontSize: '4px', color: '#6b7280', lineHeight: 1.5, marginBottom: '4px' }}>Complete aesthetic transformation — veneers, whitening, contouring & more. Custom phased plan.</div>
          <div style={{ display: 'flex', gap: '3px' }}>
            {['Custom Plan', 'Phased', 'Financing'].map(t => (
              <div key={t} style={{ padding: '2px 5px', background: `${b.accent}12`, borderRadius: '3px', border: `1px solid ${b.accent}33` }}>
                <span style={{ fontSize: '3px', color: b.accent, fontWeight: 700 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Treatment list */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '3px', marginBottom: '7px' }}>
          {treatments.slice(1).map(({ name, price, duration, icon, tags }) => (
            <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '6px 8px', background: '#f9fafb', borderRadius: '5px', border: '1px solid rgba(0,0,0,0.07)', borderLeft: `3px solid ${b.accent}` }}>
              <div style={{ width: '14px', height: '14px', borderRadius: '3px', background: `${b.accent}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: '7px', color: b.accent, lineHeight: 1 }}>{icon}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '5.5px', fontWeight: 700, color: '#0a0a0a', marginBottom: '1.5px' }}>{name}</div>
                <div style={{ display: 'flex', gap: '3px' }}>
                  <span style={{ fontSize: '3px', color: '#9ca3af', padding: '1px 3px', background: '#f3f4f6', borderRadius: '2px' }}>{duration}</span>
                  <span style={{ fontSize: '3px', color: b.accent, padding: '1px 3px', background: `${b.accent}0f`, borderRadius: '2px' }}>{tags[0]}</span>
                </div>
              </div>
              <div style={{ fontSize: '5.5px', fontWeight: 800, color: '#0a0a0a', flexShrink: 0 }}>{price}</div>
            </div>
          ))}
        </div>

        {/* Insurance note */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 8px', background: `${b.accent}0a`, borderRadius: '4px', marginBottom: '7px', border: `1px solid ${b.accent}22`, flexShrink: 0 }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: b.accent, flexShrink: 0 }} />
          <div style={{ fontSize: '4px', color: b.accent, fontWeight: 600 }}>Financing available · Most PPO insurance accepted</div>
        </div>

        {/* CTA */}
        <div style={{ marginTop: 'auto' }}>
          <div style={{ padding: '8px 12px', background: b.accent, borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: '7px', fontWeight: 900, color: '#fff' }}>Book Free Consultation →</div>
            <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.7)' }}>{b.phone}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
