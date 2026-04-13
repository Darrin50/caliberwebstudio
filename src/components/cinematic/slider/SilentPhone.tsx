'use client';

export default function SilentPhone() {
  return (
    <>
      <style>{`
        @keyframes sp-breathe {
          0%, 100% { opacity: 0.82; }
          50%       { opacity: 1; }
        }
        .sp-screen { animation: sp-breathe 4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .sp-screen { animation: none !important; }
        }
      `}</style>

      <div style={{
        width: 'clamp(88px, 11.5vw, 148px)',
        height: 'clamp(136px, 18vw, 228px)',
        background: '#0e0f14',
        borderRadius: 'clamp(6px, 1vw, 14px)',
        border: '1.5px solid rgba(176,183,188,0.13)',
        boxShadow: '0 6px 24px rgba(0,0,0,0.75)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        position: 'relative',
      }}>
        {/* Dynamic island */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 5, paddingBottom: 2, flexShrink: 0 }}>
          <div style={{ width: 26, height: 7, background: '#000', borderRadius: 4 }} />
        </div>

        {/* Lock screen — breathing */}
        <div className="sp-screen" style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
          paddingBottom: 8,
        }}>
          {/* Time */}
          <div style={{
            fontSize: 'clamp(18px, 2.4vw, 30px)',
            fontWeight: 700,
            color: 'rgba(176,183,188,0.62)',
            letterSpacing: '-0.03em',
            lineHeight: 1,
          }}>
            2:47
          </div>
          <div style={{ fontSize: 5.5, color: 'rgba(176,183,188,0.32)', letterSpacing: '0.04em' }}>
            Thursday, January 23
          </div>

          {/* Bell with 0 badge */}
          <div style={{ position: 'relative', marginTop: 8 }}>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="rgba(176,183,188,0.28)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13.73 21a2 2 0 01-3.46 0" stroke="rgba(176,183,188,0.28)" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <div style={{
              position: 'absolute',
              top: -4,
              right: -5,
              width: 10,
              height: 10,
              background: '#2d3139',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{ fontSize: 5, color: 'rgba(176,183,188,0.4)', fontWeight: 700, lineHeight: 1 }}>0</span>
            </div>
          </div>

          {/* Status text */}
          <div style={{ fontSize: 5.5, color: 'rgba(176,183,188,0.28)', textAlign: 'center', marginTop: 4 }}>
            No New Notifications
          </div>
        </div>

        {/* Dim overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.22)', pointerEvents: 'none' }} />
      </div>
    </>
  );
}
