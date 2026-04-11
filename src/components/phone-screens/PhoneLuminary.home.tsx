/**
 * Luminary Dental — Home screen
 * Design language: CLEAN MEDICAL / PREMIUM AESTHETIC DENTAL
 * Breaks full-bleed photo + dark overlay template entirely.
 * Light background — white/off-white. Dental = clean, clinical luxury (like a real dental site).
 * Hero: constrained photo card + editorial panel layout.
 * Features: treatment menu with price transparency + smile score CTA widget.
 * Reads like Birmingham cosmetic dentistry, not a generic health site.
 */

interface Biz {
  id: string; accent: string; name: string; phone: string;
  heroPhoto: string;
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

export function PhoneLuminaryHome({ b }: { b: Biz }) {
  const treatments = [
    { name: 'Smile Makeover', detail: 'Full transformation', price: 'From $2,400', featured: true },
    { name: 'Porcelain Veneers', detail: 'Per tooth', price: 'From $950', featured: false },
    { name: 'Invisalign', detail: '12–18 months', price: 'From $4,200', featured: false },
    { name: 'Teeth Whitening', detail: 'In-office', price: 'From $399', featured: false },
  ];

  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />

      {/* Nav — minimal clean */}
      <div style={{ padding: '4px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.06)', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: '7.5px', fontWeight: 900, color: '#0a0a0a', letterSpacing: '0.06em' }}>LUMINARY</div>
          <div style={{ fontSize: '3.5px', color: b.accent, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '0.5px' }}>Dental · Birmingham, MI</div>
        </div>
        <div style={{ padding: '3px 8px', background: b.accent, borderRadius: '20px', fontSize: '4.5px', fontWeight: 700, color: '#fff' }}>Free Consult</div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '8px 12px 8px' }}>

        {/* HERO ROW: photo + headline side by side */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '9px', flexShrink: 0 }}>
          {/* Photo */}
          <div style={{ flex: '0 0 40%', borderRadius: '6px', overflow: 'hidden', position: 'relative', background: '#f0f9f5' }}>
            <img
              src={b.heroPhoto}
              alt="Luminary Dental"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: '70px' }}
            />
          </div>

          {/* Headline panel */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '3.5px', color: '#9ca3af', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '3px' }}>Cosmetic Dentistry</div>
              <div style={{ fontSize: '16px', fontWeight: 900, color: '#0a0a0a', lineHeight: 0.95, letterSpacing: '-0.03em' }}>Your<br />Smile,<br /><span style={{ color: b.accent }}>Perfected.</span></div>
            </div>
            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginTop: '6px' }}>
              <span style={{ fontSize: '8px', color: '#f59e0b', lineHeight: 1 }}>★★★★★</span>
              <span style={{ fontSize: '4px', color: '#6b7280', fontWeight: 600 }}>4.9 · 186 reviews</span>
            </div>
          </div>
        </div>

        {/* "Get Your Smile Score" widget */}
        <div style={{ padding: '7px 10px', background: `${b.accent}0f`, border: `1px solid ${b.accent}33`, borderRadius: '6px', marginBottom: '8px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '3.5px', color: b.accent, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '1.5px' }}>Free Assessment</div>
            <div style={{ fontSize: '7.5px', fontWeight: 900, color: '#0a0a0a', letterSpacing: '-0.01em' }}>Get Your Smile Score →</div>
          </div>
          {/* Score ring */}
          <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: `3px solid ${b.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: `${b.accent}0a` }}>
            <span style={{ fontSize: '8px', fontWeight: 900, color: b.accent, lineHeight: 1 }}>?</span>
          </div>
        </div>

        {/* Treatment list */}
        <div style={{ fontSize: '3.5px', color: '#9ca3af', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '4px' }}>Popular Treatments</div>
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '3px' }}>
          {treatments.map(({ name, detail, price, featured }) => (
            <div key={name} style={{
              display: 'flex', alignItems: 'center', gap: '7px',
              padding: '5px 8px',
              background: featured ? `${b.accent}0a` : '#f9fafb',
              borderRadius: '4px',
              border: featured ? `1px solid ${b.accent}33` : '1px solid rgba(0,0,0,0.06)',
            }}>
              <div style={{
                width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0,
                background: featured ? b.accent : '#e5e7eb',
              }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '5.5px', fontWeight: featured ? 700 : 500, color: '#0a0a0a' }}>{name}</div>
                <div style={{ fontSize: '3px', color: '#9ca3af', marginTop: '0.5px' }}>{detail}</div>
              </div>
              <div style={{ fontSize: '5.5px', fontWeight: 800, color: featured ? b.accent : '#374151', flexShrink: 0 }}>{price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
