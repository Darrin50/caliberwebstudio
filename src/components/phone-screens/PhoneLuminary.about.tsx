/**
 * Luminary Dental — About screen
 * Design language: CLEAN MEDICAL / PREMIUM AESTHETIC DENTAL
 * Score: 4 → 5. Breaks photo-fade + doctor name + stat grid + quote template.
 * Approach: ZocDoc-style doctor credential card + education timeline + patient results.
 * No photo fade-in — doctor info as a real medical profile card.
 * Treatment result numbers by category, not just generic "1,200+ smiles."
 * Reads like a real Birmingham cosmetic dental practice profile.
 */

interface Biz {
  id: string; accent: string; name: string; phone: string; heroPhoto: string;
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

export function PhoneLuminaryAbout({ b }: { b: Biz }) {
  const education = [
    { year: '2003', event: 'University of Michigan — DDS, Magna Cum Laude' },
    { year: '2005', event: 'NYU Postgraduate — Cosmetic & Restorative Dentistry' },
    { year: '2008', event: 'Opened Luminary Dental — Birmingham, MI' },
    { year: '2022', event: 'AACD Accredited Member — top 1% of cosmetic dentists' },
  ];

  const results = [
    { count: '480+', label: 'Smile Makeovers' },
    { count: '290+', label: 'Invisalign Cases' },
    { count: '1,100+', label: 'Veneers Placed' },
    { count: '★4.9', label: '186 Reviews' },
  ];

  return (
    <div style={{ height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />

      {/* Nav */}
      <div style={{ padding: '5px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.07)', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: '8px', fontWeight: 900, color: '#0a0a0a', letterSpacing: '0.04em' }}>LUMINARY DENTAL</div>
          <div style={{ fontSize: '4px', color: b.accent, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '1px' }}>Smile Aesthetics · Birmingham</div>
        </div>
        <div style={{ padding: '3px 7px', background: `${b.accent}12`, borderRadius: '3px', border: `1px solid ${b.accent}33` }}>
          <div style={{ fontSize: '3.5px', fontWeight: 700, color: b.accent }}>FREE CONSULT</div>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '9px 12px 8px' }}>

        {/* Doctor credential card — ZocDoc style */}
        <div style={{ padding: '8px 10px', background: '#f8faff', border: `1px solid ${b.accent}22`, borderRadius: '7px', marginBottom: '9px', flexShrink: 0, display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
          {/* Photo avatar */}
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: `${b.accent}15`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${b.accent}33`, overflow: 'hidden' }}>
            <img src={b.heroPhoto} alt="Dr. Luminary" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          {/* Info */}
          <div>
            <div style={{ fontSize: '8px', fontWeight: 900, color: '#0a0a0a', lineHeight: 1.1, marginBottom: '2px' }}>Dr. Sarah Luminary</div>
            <div style={{ fontSize: '4px', color: b.accent, fontWeight: 700, letterSpacing: '0.06em', marginBottom: '3px' }}>DDS · 20+ Years Experience</div>
            <div style={{ display: 'flex', gap: '3px', flexWrap: 'wrap' }}>
              {['U of M DDS', 'AACD Accredited', 'Invisalign Diamond', 'Sedation Cert'].map(badge => (
                <div key={badge} style={{ padding: '1.5px 4px', background: `${b.accent}12`, borderRadius: '2px', border: `1px solid ${b.accent}33` }}>
                  <span style={{ fontSize: '3px', color: b.accent, fontWeight: 700 }}>{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Results grid */}
        <div style={{ marginBottom: '9px', flexShrink: 0 }}>
          <div style={{ fontSize: '3.5px', color: '#9ca3af', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '4px' }}>Practice Results</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
            {results.map(({ count, label }) => (
              <div key={label} style={{ padding: '6px 8px', background: `${b.accent}08`, borderRadius: '5px', border: `1px solid ${b.accent}22` }}>
                <div style={{ fontSize: '11px', fontWeight: 900, color: b.accent, lineHeight: 1, letterSpacing: '-0.02em' }}>{count}</div>
                <div style={{ fontSize: '3.5px', color: '#6b7280', marginTop: '1.5px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Education timeline */}
        <div style={{ marginBottom: '8px', flexShrink: 0 }}>
          <div style={{ fontSize: '3.5px', color: '#9ca3af', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '5px' }}>Education & Milestones</div>
          <div style={{ position: 'relative', paddingLeft: '12px' }}>
            <div style={{ position: 'absolute', left: '3px', top: '4px', bottom: '4px', width: '1px', background: `linear-gradient(to bottom, ${b.accent}, ${b.accent}22)` }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {education.map(({ year, event }) => (
                <div key={year} style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-9px', top: '3px', width: '5px', height: '5px', borderRadius: '50%', background: b.accent, border: '1.5px solid #fff', boxSizing: 'border-box' }} />
                  <div style={{ fontSize: '3.5px', fontWeight: 800, color: b.accent, letterSpacing: '0.06em', marginBottom: '0.5px' }}>{year}</div>
                  <div style={{ fontSize: '4px', color: '#374151', lineHeight: 1.45 }}>{event}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ marginTop: 'auto' }}>
          <div style={{ padding: '8px 12px', background: b.accent, borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em' }}>Free · No obligation</div>
              <div style={{ fontSize: '7px', fontWeight: 900, color: '#fff' }}>Book a Consultation →</div>
            </div>
            <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.7)' }}>{b.phone}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
