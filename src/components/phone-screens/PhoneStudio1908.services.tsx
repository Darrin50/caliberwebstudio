/**
 * Studio 1908 — Services screen
 * Design language: PREMIUM BARBERSHOP / EDITORIAL DARK
 * Score: 4 → 5. Breaks bullet-dot + name + price + desc row list.
 * Approach: featured "Signature Cut" hero card + compact service menu with
 * barber availability tags + duration. Reads like a real premium barbershop app.
 */

interface Biz {
  id: string; accent: string; name: string; phone: string; bg: string;
}

function StatusBar() {
  const c = 'rgba(255,255,255,0.55)';
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

export function PhoneStudio1908Services({ b }: { b: Biz }) {
  const services = [
    {
      name: 'Signature Haircut', price: '$55', duration: '45 min',
      desc: 'Classic taper & fade shaped with precision. Includes consultation + finish.',
      barbers: ['Marcus', 'DeShawn', 'Rico'], avail: 3, featured: true,
    },
    {
      name: 'Hot Towel Shave', price: '$65', duration: '30 min',
      desc: 'Straight-razor shave with hot towel prep & post-shave balm.',
      barbers: ['Marcus', 'DeShawn'], avail: 2, featured: false,
    },
    {
      name: 'Beard Sculpting', price: '$35', duration: '20 min',
      desc: 'Full beard trim, line-up & conditioning treatment.',
      barbers: ['Rico', 'Marcus'], avail: 2, featured: false,
    },
    {
      name: 'Scalp Treatment', price: '$55', duration: '30 min',
      desc: 'Deep scalp cleanse, massage & follicle conditioning.',
      barbers: ['DeShawn'], avail: 1, featured: false,
    },
  ];

  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />

      {/* Nav */}
      <div style={{ padding: '5px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: '8px', fontWeight: 900, color: '#fff', letterSpacing: '0.06em' }}>STUDIO 1908</div>
          <div style={{ fontSize: '4px', color: b.accent, letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: '1px' }}>Precision Grooming</div>
        </div>
        <div style={{ padding: '3px 7px', background: `${b.accent}18`, borderRadius: '3px', border: `1px solid ${b.accent}44` }}>
          <div style={{ fontSize: '3.5px', fontWeight: 700, color: b.accent }}>BOOK NOW</div>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '8px 12px 8px' }}>

        {/* Header */}
        <div style={{ marginBottom: '8px', flexShrink: 0 }}>
          <div style={{ fontSize: '4px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '1.5px', fontFamily: 'monospace' }}>Services & Pricing</div>
          <div style={{ fontSize: '14px', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>The Menu</div>
        </div>

        {/* Featured service card */}
        <div style={{ padding: '9px 11px', background: `${b.accent}22`, borderRadius: '6px', border: `1.5px solid ${b.accent}66`, marginBottom: '6px', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '40px', background: 'rgba(255,255,255,0.03)', transform: 'skewX(-12deg) translateX(8px)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
            <div>
              <div style={{ fontSize: '3.5px', color: b.accent, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1.5px', fontWeight: 700 }}>Most Booked</div>
              <div style={{ fontSize: '9px', fontWeight: 900, color: '#fff', letterSpacing: '-0.01em' }}>Signature Haircut</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '10px', fontWeight: 900, color: '#fff', lineHeight: 1 }}>$55</div>
              <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.55)', marginTop: '1px' }}>45 min</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '2px' }}>
              {['M', 'D', 'R'].map(i => (
                <div key={i} style={{ width: '14px', height: '14px', borderRadius: '50%', background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${b.accent}55` }}>
                  <span style={{ fontSize: '5.5px', color: '#fff', fontWeight: 700 }}>{i}</span>
                </div>
              ))}
            </div>
            <span style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.55)' }}>All 3 barbers available</span>
          </div>
        </div>

        {/* Service list */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '3px', marginBottom: '7px' }}>
          {services.slice(1).map(({ name, price, duration, desc, barbers, avail }) => (
            <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 8px', background: 'rgba(255,255,255,0.04)', borderRadius: '5px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ width: '2px', height: '24px', background: b.accent, borderRadius: '1px', flexShrink: 0, opacity: 0.55 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '5.5px', fontWeight: 700, color: '#fff', marginBottom: '2px' }}>{name}</div>
                <div style={{ display: 'flex', gap: '3px' }}>
                  <span style={{ fontSize: '3px', color: 'rgba(255,255,255,0.35)', padding: '1px 3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px' }}>{duration}</span>
                  <span style={{ fontSize: '3px', color: b.accent, padding: '1px 3px', background: `${b.accent}15`, borderRadius: '2px' }}>{avail} barber{avail > 1 ? 's' : ''} avail.</span>
                </div>
              </div>
              <div style={{ fontSize: '7px', fontWeight: 900, color: '#fff', flexShrink: 0 }}>{price}</div>
            </div>
          ))}
        </div>

        {/* Next available slot indicator */}
        <div style={{ padding: '5px 8px', background: `${b.accent}12`, borderRadius: '4px', border: `1px solid ${b.accent}33`, marginBottom: '7px', display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0 }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
          <div style={{ fontSize: '4px', color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>Next available: Today 2:30 PM · Marcus</div>
        </div>

        {/* CTA */}
        <div style={{ marginTop: 'auto' }}>
          <div style={{ padding: '8px 12px', background: b.accent, borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: '7px', fontWeight: 900, color: '#000' }}>Book a Chair →</div>
            <div style={{ fontSize: '4.5px', color: 'rgba(0,0,0,0.45)' }}>{b.phone}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
