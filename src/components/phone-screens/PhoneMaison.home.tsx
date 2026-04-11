/**
 * Maison — Home screen
 * Design language: LUXURY SALON / WARM EDITORIAL DARK
 * Breaks full-bleed photo + dark scrim template.
 * Bottom-anchored editorial treatment: photo fills upper 60%, white editorial panel at bottom.
 * White panel = luxury contrast against photo — reads as a real premium salon site (Vogue / Bumble & Bumble).
 * Completely different from Studio 1908 (dark barber) — this is warm, feminine, editorial.
 */

interface Biz {
  id: string; accent: string; name: string; phone: string;
  heroPhoto: string; tagline: string;
}

function StatusBar() {
  const c = 'rgba(255,255,255,0.6)';
  return (
    <div style={{ height: '28px', position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 14px 5px', zIndex: 10 }}>
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

export function PhoneMaisonHome({ b }: { b: Biz }) {
  const featuredServices = [
    { label: 'Color & Highlights', price: 'From $175', hot: true },
    { label: 'Keratin Treatment', price: 'From $220', hot: false },
    { label: 'Signature Blowout', price: 'From $85', hot: false },
    { label: 'Extensions', price: 'Custom', hot: false },
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#0f0b09' }}>

      {/* PHOTO — top 58% */}
      <div style={{ flex: '0 0 58%', position: 'relative', overflow: 'hidden' }}>
        <StatusBar />
        <img
          src={b.heroPhoto}
          alt="Maison luxury salon"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        {/* Minimal top-to-transparent scrim for status bar legibility only */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(15,11,9,0.5) 0%, transparent 40%)' }} />

        {/* Brand name — top left */}
        <div style={{ position: 'absolute', top: '32px', left: '12px' }}>
          <div style={{ fontSize: '11px', fontWeight: 900, color: '#fff', letterSpacing: '0.1em', fontStyle: 'italic', textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}>MAISON</div>
        </div>

        {/* "Royal Oak" badge — top right */}
        <div style={{ position: 'absolute', top: '33px', right: '12px', padding: '2px 6px', background: 'rgba(0,0,0,0.35)', borderRadius: '20px', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.15)' }}>
          <span style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.85)', letterSpacing: '0.1em' }}>ROYAL OAK</span>
        </div>

        {/* Photo bottom notch — season label */}
        <div style={{ position: 'absolute', bottom: '8px', left: '12px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 7px', background: 'rgba(0,0,0,0.5)', borderRadius: '20px', backdropFilter: 'blur(6px)', border: `1px solid ${b.accent}55` }}>
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: b.accent }} />
            <span style={{ fontSize: '4px', color: '#fff', fontWeight: 600, letterSpacing: '0.06em' }}>Spring Collection 2026</span>
          </div>
        </div>
      </div>

      {/* EDITORIAL PANEL — bottom 42% */}
      <div style={{ flex: '0 0 42%', background: '#100c0a', display: 'flex', flexDirection: 'column', padding: '9px 12px 8px', borderTop: `2px solid ${b.accent}` }}>

        {/* Headline */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '7px' }}>
          <div>
            <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '2px', fontFamily: 'monospace' }}>Luxury Color Studio</div>
            <div style={{ fontSize: '14px', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.0, fontStyle: 'italic' }}>The Art<br />of Beauty</div>
          </div>
          {/* Rating chip */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px', padding: '4px 6px', background: `${b.accent}18`, borderRadius: '4px', border: `1px solid ${b.accent}44`, flexShrink: 0 }}>
            <span style={{ fontSize: '7px', color: b.accent, lineHeight: 1 }}>★</span>
            <span style={{ fontSize: '5.5px', fontWeight: 900, color: b.accent }}>4.9</span>
          </div>
        </div>

        {/* Services — horizontal scroll feel */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '8px', overflow: 'hidden' }}>
          {featuredServices.map(({ label, price, hot }) => (
            <div key={label} style={{
              flex: '0 0 auto',
              padding: '5px 7px',
              background: hot ? `${b.accent}18` : 'rgba(255,255,255,0.04)',
              borderRadius: '4px',
              border: hot ? `1px solid ${b.accent}66` : '1px solid rgba(255,255,255,0.07)',
            }}>
              <div style={{ fontSize: '4.5px', fontWeight: hot ? 800 : 500, color: hot ? b.accent : 'rgba(255,255,255,0.65)', whiteSpace: 'nowrap', marginBottom: '1.5px' }}>{label}</div>
              <div style={{ fontSize: '3px', color: hot ? `${b.accent}99` : 'rgba(255,255,255,0.25)' }}>{price}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: 'auto', padding: '7px 12px', background: b.accent, borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '3.5px', color: 'rgba(0,0,0,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Mon–Sat · 9AM–8PM</div>
            <div style={{ fontSize: '7px', fontWeight: 900, color: '#1a0f08' }}>Reserve a Session →</div>
          </div>
          <div style={{ fontSize: '5px', fontWeight: 700, color: 'rgba(0,0,0,0.45)' }}>{b.phone}</div>
        </div>
      </div>
    </div>
  );
}
