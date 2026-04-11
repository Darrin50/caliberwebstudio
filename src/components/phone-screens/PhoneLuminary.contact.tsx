/**
 * Luminary Dental — Contact / Patient Intake screen
 * Design language: CLEAN MEDICAL / PREMIUM AESTHETIC
 * New vs. existing patient toggle → concern type selector → insurance field → name.
 * Reads as a real dental practice intake flow, not a generic contact form.
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

export function PhoneLuminaryContact({ b }: { b: Biz }) {
  const concerns = [
    { label: 'Smile Makeover', sub: 'Full aesthetic transformation', icon: '◈', sel: true },
    { label: 'Teeth Whitening', sub: 'In-office or take-home', icon: '◎', sel: false },
    { label: 'Veneers', sub: 'Porcelain or composite', icon: '▬', sel: false },
    { label: 'Invisalign', sub: 'Clear aligner therapy', icon: '◻', sel: false },
    { label: 'Tooth Pain', sub: 'Urgent / emergency', icon: '▲', sel: false },
    { label: 'General Consult', sub: "I'm not sure yet", icon: '…', sel: false },
  ];

  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />

      {/* Nav */}
      <div style={{ padding: '5px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.07)', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: '8px', fontWeight: 900, color: '#0a0a0a', letterSpacing: '0.04em' }}>LUMINARY</div>
          <div style={{ fontSize: '4px', color: b.accent, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '1px' }}>Smile Aesthetics · Birmingham</div>
        </div>
        <div style={{ padding: '3px 7px', background: `${b.accent}12`, borderRadius: '3px', border: `1px solid ${b.accent}33` }}>
          <div style={{ fontSize: '3.5px', fontWeight: 700, color: b.accent }}>FREE CONSULT</div>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '9px 12px 8px' }}>

        {/* Patient type toggle */}
        <div style={{ display: 'flex', marginBottom: '9px', background: '#f3f4f6', borderRadius: '6px', padding: '2px', flexShrink: 0 }}>
          <div style={{
            flex: 1, padding: '6px 0', borderRadius: '5px', textAlign: 'center',
            background: '#fff',
            boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
          }}>
            <div style={{ fontSize: '5.5px', fontWeight: 800, color: '#0a0a0a', letterSpacing: '0.04em' }}>NEW PATIENT</div>
            <div style={{ fontSize: '3px', color: '#9ca3af', marginTop: '1px' }}>First visit</div>
          </div>
          <div style={{ flex: 1, padding: '6px 0', textAlign: 'center' }}>
            <div style={{ fontSize: '5.5px', fontWeight: 600, color: '#9ca3af', letterSpacing: '0.04em' }}>EXISTING</div>
            <div style={{ fontSize: '3px', color: '#c4c9d4', marginTop: '1px' }}>Returning patient</div>
          </div>
        </div>

        {/* Concern selector */}
        <div style={{ marginBottom: '8px' }}>
          <div style={{ fontSize: '3.5px', color: '#9ca3af', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '5px' }}>What Brings You In?</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
            {concerns.map(({ label, sub, icon, sel }) => (
              <div key={label} style={{
                padding: '6px 7px', borderRadius: '5px',
                background: sel ? `${b.accent}0f` : '#f9fafb',
                border: sel ? `1.5px solid ${b.accent}` : '1px solid rgba(0,0,0,0.07)',
                display: 'flex', alignItems: 'flex-start', gap: '5px',
              }}>
                <div style={{
                  width: '14px', height: '14px', borderRadius: '3px', flexShrink: 0,
                  background: sel ? b.accent : '#e5e7eb',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1px',
                }}>
                  <span style={{ fontSize: '6px', color: sel ? '#fff' : '#9ca3af', lineHeight: 1 }}>{icon}</span>
                </div>
                <div>
                  <div style={{ fontSize: '4.5px', fontWeight: 700, color: sel ? '#0a0a0a' : '#374151', lineHeight: 1.2 }}>{label}</div>
                  <div style={{ fontSize: '3px', color: '#9ca3af', marginTop: '0.5px' }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insurance field */}
        <div style={{ marginBottom: '7px' }}>
          <div style={{ fontSize: '3.5px', color: '#9ca3af', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '4px' }}>Insurance Provider</div>
          <div style={{ display: 'flex', gap: '4px' }}>
            {[['Delta Dental', true], ['BCBS', false], ['Aetna', false], ['None / Self-Pay', false]].map(([label, sel]) => (
              <div key={String(label)} style={{
                padding: '4px 6px', borderRadius: '4px',
                background: sel ? `${b.accent}0f` : '#f9fafb',
                border: sel ? `1px solid ${b.accent}55` : '1px solid rgba(0,0,0,0.07)',
                flex: '0 0 auto',
              }}>
                <div style={{ fontSize: '4px', fontWeight: sel ? 700 : 400, color: sel ? b.accent : '#6b7280', whiteSpace: 'nowrap' }}>{String(label)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Name + Phone */}
        <div style={{ display: 'flex', gap: '5px', marginBottom: '7px' }}>
          {[['Name', 'Jane Smith'], ['Phone', '(248) 555-____']].map(([label, ph]) => (
            <div key={label} style={{ flex: 1 }}>
              <div style={{ fontSize: '3.5px', color: '#9ca3af', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '3px' }}>{label}</div>
              <div style={{ padding: '5px 7px', background: '#f9fafb', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '4px', fontSize: '5.5px', color: '#d1d5db' }}>{ph}</div>
            </div>
          ))}
        </div>

        {/* Availability note */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 8px', background: `${b.accent}0a`, borderRadius: '4px', marginBottom: '7px', border: `1px solid ${b.accent}22` }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: b.accent, flexShrink: 0 }} />
          <div style={{ fontSize: '4px', color: b.accent, fontWeight: 600 }}>Free consultations available Mon–Fri · Same-week bookings open</div>
        </div>

        {/* CTA */}
        <div style={{ marginTop: 'auto' }}>
          <div style={{ padding: '8px 12px', background: b.accent, borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em' }}>Free consultation · No obligation</div>
              <div style={{ fontSize: '7.5px', fontWeight: 900, color: '#fff' }}>Book My Consultation →</div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '5px', fontSize: '4px', color: '#9ca3af' }}>or call {b.phone}</div>
        </div>

      </div>
    </div>
  );
}
