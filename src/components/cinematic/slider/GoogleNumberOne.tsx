'use client';

import { useState, useEffect } from 'react';

const REVIEWS = [
  'New 5★ review from Sarah M.',
  'New 5★ review from James T.',
  'New 5★ review from Maria L.',
  'New 5★ review from David K.',
];

export default function GoogleNumberOne() {
  const [starCount, setStarCount] = useState(0);
  const [notifIdx, setNotifIdx] = useState(-1);
  const [notifIn, setNotifIn] = useState(false);

  // Stars fill in one by one on mount
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i++;
      setStarCount(i);
      if (i >= 5) clearInterval(t);
    }, 180);
    return () => clearInterval(t);
  }, []);

  // Rotating review notifications
  useEffect(() => {
    let idx = 0;
    let alive = true;

    const show = () => {
      if (!alive) return;
      setNotifIdx(idx % REVIEWS.length);
      setNotifIn(true);
      setTimeout(() => {
        if (!alive) return;
        setNotifIn(false);
        setTimeout(() => {
          if (!alive) return;
          idx++;
          show();
        }, 600);
      }, 2200);
    };

    const init = setTimeout(show, 1200);
    return () => {
      alive = false;
      clearTimeout(init);
    };
  }, []);

  const PHOTO_COLORS = ['#2563eb', '#7c3aed', '#db2777'];

  return (
    <>
      <style>{`
        @keyframes gno-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.55; }
        }
        @keyframes gno-in {
          from { transform: translateY(-110%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes gno-out {
          from { transform: translateY(0);    opacity: 1; }
          to   { transform: translateY(-110%); opacity: 0; }
        }
        .gno-pulse { animation: gno-pulse 2.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .gno-pulse { animation: none !important; }
          .gno-notif { animation: none !important; }
        }
      `}</style>

      <div style={{
        width: 'clamp(88px, 11.5vw, 148px)',
        height: 'clamp(136px, 18vw, 228px)',
        background: '#0d1a2e',
        borderRadius: 'clamp(6px, 1vw, 14px)',
        border: '1.5px solid rgba(0,118,182,0.28)',
        boxShadow: '0 6px 24px rgba(0,0,0,0.7), 0 0 18px rgba(0,118,182,0.1)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        position: 'relative',
      }}>
        {/* Sliding notification */}
        {notifIdx >= 0 && (
          <div
            className="gno-notif"
            style={{
              position: 'absolute',
              top: 4, left: 4, right: 4,
              background: 'rgba(0,118,182,0.92)',
              borderRadius: 5,
              padding: '3px 5px',
              fontSize: 5.5,
              color: '#fff',
              fontWeight: 600,
              zIndex: 10,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              animation: notifIn
                ? 'gno-in 0.3s ease-out both'
                : 'gno-out 0.3s ease-in both',
            }}
          >
            ⭐ {REVIEWS[notifIdx]}
          </div>
        )}

        {/* Status bar */}
        <div style={{ padding: '3px 7px 1px', display: 'flex', justifyContent: 'space-between', flexShrink: 0 }}>
          <span style={{ fontSize: 5.5, color: 'rgba(176,183,188,0.5)' }}>9:41</span>
          <span style={{ fontSize: 5.5, color: 'rgba(176,183,188,0.5)' }}>▪▪▪</span>
        </div>

        {/* Mini map */}
        <div style={{
          height: 'clamp(32px, 4.5vw, 58px)',
          background: 'linear-gradient(135deg, #1a3a5c 0%, #0d2744 100%)',
          flexShrink: 0,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.25 }} viewBox="0 0 100 50" preserveAspectRatio="none">
            <line x1="25" y1="0" x2="25" y2="50" stroke="#4a9fd4" strokeWidth="0.6"/>
            <line x1="50" y1="0" x2="50" y2="50" stroke="#4a9fd4" strokeWidth="0.6"/>
            <line x1="75" y1="0" x2="75" y2="50" stroke="#4a9fd4" strokeWidth="0.6"/>
            <line x1="0" y1="25" x2="100" y2="25" stroke="#4a9fd4" strokeWidth="0.6"/>
            <line x1="0" y1="12" x2="100" y2="12" stroke="#4a9fd4" strokeWidth="0.3"/>
            <line x1="0" y1="38" x2="100" y2="38" stroke="#4a9fd4" strokeWidth="0.3"/>
          </svg>
          {/* Pin */}
          <div style={{ position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)' }}>
            <div style={{
              width: 8,
              height: 8,
              background: '#DB4437',
              borderRadius: '50% 50% 50% 0',
              transform: 'rotate(-45deg)',
              boxShadow: '0 1px 4px rgba(0,0,0,0.5)',
            }} />
          </div>
          {/* #1 badge */}
          <div style={{
            position: 'absolute',
            top: 3,
            right: 4,
            background: '#22c55e',
            borderRadius: 3,
            padding: '1.5px 4px',
            fontSize: 5,
            fontWeight: 700,
            color: '#fff',
          }}>
            #1
          </div>
        </div>

        {/* Business card */}
        <div style={{ flex: 1, padding: '4px 5px', display: 'flex', flexDirection: 'column', gap: 3, overflow: 'hidden' }}>
          <div style={{ fontSize: 7, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>Detroit VS</div>

          {/* Stars */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <span style={{ fontSize: 7, color: '#f5c542', letterSpacing: -0.5 }}>
              {'★'.repeat(starCount)}{'☆'.repeat(5 - starCount)}
            </span>
            <span style={{ fontSize: 5.5, color: 'rgba(176,183,188,0.6)' }}>4.9 (126)</span>
          </div>

          {/* Open Now */}
          <div className="gno-pulse" style={{ fontSize: 6, color: '#22c55e', fontWeight: 700 }}>
            ● Open Now
          </div>

          {/* Photo row */}
          <div style={{ display: 'flex', gap: 2 }}>
            {PHOTO_COLORS.map((c, i) => (
              <div key={i} style={{ flex: 1, height: 'clamp(10px, 1.6vw, 18px)', background: c, borderRadius: 2, opacity: 0.72 }} />
            ))}
          </div>

          {/* Directions button */}
          <div style={{
            marginTop: 'auto',
            background: '#1a73e8',
            borderRadius: 3,
            padding: '2.5px 4px',
            textAlign: 'center',
            fontSize: 5.5,
            color: '#fff',
            fontWeight: 600,
          }}>
            Directions
          </div>
        </div>
      </div>
    </>
  );
}
