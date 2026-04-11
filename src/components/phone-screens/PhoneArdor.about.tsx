/**
 * Ardor — About screen
 * Design language: FINE DINING / EXPERIENTIAL DARK
 * Score: 4 → 5. Breaks photo-fade + story paragraph + award list + quote template.
 * Approach: chef editorial profile page — press-quality presentation.
 * Hero: chef name as oversized editorial type (not a photo fade-in).
 * Awards formatted as press pull quotes from real publications.
 * Menu philosophy as a large centered statement, not a side-border italic block.
 * Reads like a Michelin-star restaurant's press page.
 */

interface Biz {
  id: string; accent: string; name: string; phone: string; bg: string; heroPhoto: string;
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

export function PhoneArdorAbout({ b }: { b: Biz }) {
  const pressQuotes = [
    { pub: 'Detroit Free Press', quote: '"The most exciting restaurant to open in Corktown in a decade."' },
    { pub: 'Eater Detroit', quote: '"Chef Reyes brings serious classical chops to a room that feels genuinely alive."' },
    { pub: 'Hour Detroit', quote: '"Ardor earns its name — every dish burns with intention."' },
  ];

  const accolades = [
    { mark: '★', label: 'James Beard Semifinalist', year: '2023 + 2024' },
    { mark: '◈', label: 'Michelin Guide — Recommended', year: '2024' },
    { mark: '▲', label: 'Food & Wine Best New Chef', year: '2022' },
  ];

  return (
    <div style={{ height: '100%', background: b.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />

      {/* Nav */}
      <div style={{ padding: '5px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: '8px', fontWeight: 900, color: '#fff', letterSpacing: '0.08em', fontStyle: 'italic' }}>ARDOR</div>
          <div style={{ fontSize: '4px', color: b.accent, letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: '1px' }}>Corktown · Detroit · Est. 2019</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5px' }}>
          {[14, 10].map((w, i) => <div key={i} style={{ width: `${w}px`, height: '1.5px', background: 'rgba(255,255,255,0.3)', borderRadius: '1px' }} />)}
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '9px 12px 8px' }}>

        {/* Chef editorial header — no photo fade */}
        <div style={{ marginBottom: '8px', flexShrink: 0, paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '3px', fontFamily: 'monospace' }}>Executive Chef</div>
          <div style={{ fontSize: '18px', fontWeight: 900, color: '#fff', lineHeight: 0.95, letterSpacing: '-0.03em', fontStyle: 'italic', marginBottom: '4px' }}>
            Daniel<br />Reyes
          </div>
          <div style={{ display: 'flex', gap: '5px' }}>
            {['French Culinary Institute', 'Michelin-Trained', 'Est. 2019'].map((tag, i) => (
              <div key={tag} style={{ padding: '2px 5px', background: i === 1 ? `${b.accent}22` : 'rgba(255,255,255,0.06)', borderRadius: '3px', border: `1px solid ${i === 1 ? b.accent + '55' : 'rgba(255,255,255,0.1)'}` }}>
                <span style={{ fontSize: '3px', color: i === 1 ? b.accent : 'rgba(255,255,255,0.5)', fontWeight: i === 1 ? 700 : 400 }}>{tag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Accolades — clean rows */}
        <div style={{ marginBottom: '8px', flexShrink: 0 }}>
          <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '4px' }}>Recognition</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {accolades.map(({ mark, label, year }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '5px 7px', background: `${b.accent}0a`, borderRadius: '4px', border: `1px solid ${b.accent}22` }}>
                <div style={{ width: '14px', height: '14px', borderRadius: '3px', background: `${b.accent}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: '7px', color: b.accent, lineHeight: 1 }}>{mark}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '5px', fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>{label}</div>
                </div>
                <div style={{ fontSize: '3.5px', color: b.accent, fontWeight: 700 }}>{year}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Press quotes */}
        <div style={{ marginBottom: '8px', flexShrink: 0 }}>
          <div style={{ fontSize: '3.5px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '4px' }}>Press</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {pressQuotes.slice(0, 2).map(({ pub, quote }) => (
              <div key={pub} style={{ padding: '5px 8px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px', borderLeft: `2px solid ${b.accent}` }}>
                <div style={{ fontSize: '3px', color: b.accent, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '2px' }}>{pub}</div>
                <div style={{ fontSize: '4.5px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, fontStyle: 'italic' }}>{quote}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ marginTop: 'auto' }}>
          <div style={{ padding: '8px 12px', background: b.accent, borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: '7px', fontWeight: 900, color: '#000' }}>Reserve a Table →</div>
            <div style={{ fontSize: '4.5px', color: 'rgba(0,0,0,0.45)' }}>{b.phone}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
