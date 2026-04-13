'use client';

const PAGE1 = [
  { name: 'Detroit Threads Co.', rating: '4.8', count: 52 },
  { name: 'Motor City Styles', rating: '4.7', count: 38 },
  { name: 'D-Town Fashion Hub', rating: '4.6', count: 21 },
  { name: 'Midwest Apparel Co.', rating: '4.5', count: 19 },
];

export default function BuriedOnGoogle() {
  return (
    <>
      <style>{`
        @keyframes bog-scroll {
          0%, 15%   { transform: translateY(0); }
          45%, 65%  { transform: translateY(-68px); }
          90%, 100% { transform: translateY(0); }
        }
        .bog-animate { animation: bog-scroll 6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .bog-animate { animation: none !important; }
        }
      `}</style>

      <div style={{
        width: 'clamp(88px, 11.5vw, 148px)',
        height: 'clamp(136px, 18vw, 228px)',
        background: '#13141a',
        borderRadius: 'clamp(6px, 1vw, 14px)',
        border: '1.5px solid rgba(176,183,188,0.18)',
        boxShadow: '0 6px 24px rgba(0,0,0,0.7)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}>
        {/* Status bar */}
        <div style={{ padding: '3px 7px 1px', display: 'flex', justifyContent: 'space-between', flexShrink: 0 }}>
          <span style={{ fontSize: 5.5, color: 'rgba(176,183,188,0.5)' }}>9:41</span>
          <span style={{ fontSize: 5.5, color: 'rgba(176,183,188,0.5)' }}>▪▪▪</span>
        </div>

        {/* Search bar */}
        <div style={{
          margin: '0 5px 5px',
          background: 'rgba(255,255,255,0.06)',
          borderRadius: 5,
          padding: '3px 5px',
          display: 'flex',
          alignItems: 'center',
          gap: 3,
          flexShrink: 0,
        }}>
          <svg width={7} height={7} viewBox="0 0 16 16" fill="none">
            <circle cx="6" cy="6" r="4" stroke="rgba(176,183,188,0.45)" strokeWidth="1.8"/>
            <path d="M10 10l2.5 2.5" stroke="rgba(176,183,188,0.45)" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          <span style={{ fontSize: 5.5, color: 'rgba(176,183,188,0.55)', whiteSpace: 'nowrap', overflow: 'hidden' }}>
            best clothing store in Detroit
          </span>
        </div>

        {/* Clipped scroll window */}
        <div style={{ overflow: 'hidden', maxHeight: 'clamp(44px, 6.5vw, 68px)', flexShrink: 0 }}>
          <div className="bog-animate">
            {PAGE1.map((r) => (
              <div key={r.name} style={{ padding: '3px 5px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ fontSize: 6, fontWeight: 600, color: 'rgba(220,230,240,0.78)', marginBottom: 1.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {r.name}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <span style={{ fontSize: 6, color: '#f5c542', letterSpacing: -0.5 }}>★★★★★</span>
                  <span style={{ fontSize: 5.5, color: 'rgba(176,183,188,0.48)' }}>{r.rating} ({r.count})</span>
                </div>
              </div>
            ))}

            {/* Page 2 divider */}
            <div style={{
              textAlign: 'center',
              fontSize: 5,
              color: 'rgba(176,183,188,0.3)',
              padding: '3px 0',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              margin: '2px 5px',
            }}>
              ── Page 2 ──
            </div>

            {/* Buried result */}
            <div style={{ padding: '3px 5px', background: 'rgba(255,50,50,0.04)' }}>
              <div style={{ fontSize: 6, fontWeight: 600, color: 'rgba(176,183,188,0.38)', marginBottom: 1.5 }}>
                Detroit VS
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <span style={{ fontSize: 6, color: '#ef4444', letterSpacing: -0.5 }}>★★☆☆☆</span>
                <span style={{ fontSize: 5.5, color: 'rgba(176,183,188,0.38)' }}>2.1 (3)</span>
                <span style={{ fontSize: 4.5, background: 'rgba(239,68,68,0.2)', color: 'rgba(239,68,68,0.65)', borderRadius: 2, padding: '1px 2.5px', flexShrink: 0 }}>
                  No photos
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />
      </div>
    </>
  );
}
