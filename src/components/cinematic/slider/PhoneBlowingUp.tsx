'use client';

import { useState, useEffect, useRef } from 'react';

const NOTIFS = [
  { icon: '📞', text: 'Missed Call — returning in 5 min' },
  { icon: '⭐', text: 'New Google Review — 5 stars!' },
  { icon: '📋', text: 'New Booking — Sarah M.' },
  { icon: '📞', text: 'Incoming Call...' },
  { icon: '💬', text: "New Chat — 'Do you have the blue...'" },
];

export default function PhoneBlowingUp() {
  const [visible, setVisible] = useState(0);
  const [counter, setCounter] = useState(0);
  const [shaking, setShaking] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let count = 0;
    let alive = true;

    const addNotif = () => {
      if (!alive) return;
      if (count < NOTIFS.length) {
        count++;
        setVisible(count);
        setCounter(Math.round((count / NOTIFS.length) * 23));
        setShaking(true);
        setTimeout(() => { if (alive) setShaking(false); }, 420);
        timerRef.current = setTimeout(addNotif, 520);
      } else {
        timerRef.current = setTimeout(() => {
          if (!alive) return;
          setVisible(0);
          setCounter(0);
          count = 0;
          timerRef.current = setTimeout(addNotif, 700);
        }, 1500);
      }
    };

    timerRef.current = setTimeout(addNotif, 500);
    return () => {
      alive = false;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes pbu-slide {
          from { transform: translateX(115%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes pbu-shake {
          0%,100% { transform: translateX(0); }
          20%     { transform: translateX(-1.8px); }
          40%     { transform: translateX(1.8px); }
          60%     { transform: translateX(-1.2px); }
          80%     { transform: translateX(1.2px); }
        }
        .pbu-notif { animation: pbu-slide 0.28s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .pbu-notif { animation: none !important; }
          .pbu-shake { animation: none !important; }
        }
      `}</style>

      <div
        style={{
          width: 'clamp(88px, 11.5vw, 148px)',
          height: 'clamp(136px, 18vw, 228px)',
          background: '#160e00',
          borderRadius: 'clamp(6px, 1vw, 14px)',
          border: '1.5px solid rgba(251,191,36,0.28)',
          boxShadow: '0 6px 24px rgba(0,0,0,0.7), 0 0 18px rgba(251,191,36,0.08)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          position: 'relative',
          animation: shaking ? 'pbu-shake 0.42s ease-in-out' : 'none',
        }}
      >
        {/* Dynamic island */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 4, paddingBottom: 2, flexShrink: 0 }}>
          <div style={{ width: 22, height: 6, background: '#000', borderRadius: 3 }} />
        </div>

        {/* Lock screen */}
        <div style={{ flex: 1, padding: '3px 4px 4px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Time row with counter badge */}
          <div style={{ textAlign: 'center', marginBottom: 4, position: 'relative', flexShrink: 0 }}>
            <div style={{
              fontSize: 'clamp(16px, 2.1vw, 26px)',
              fontWeight: 700,
              color: 'rgba(255,200,80,0.82)',
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}>
              4:23
            </div>
            <div style={{ fontSize: 5.5, color: 'rgba(251,191,36,0.38)' }}>Friday, January 24</div>

            {/* Bell + counter */}
            <div style={{ position: 'absolute', top: 0, right: 0 }}>
              <svg width={12} height={12} viewBox="0 0 24 24" fill="none">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="rgba(251,191,36,0.45)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.73 21a2 2 0 01-3.46 0" stroke="rgba(251,191,36,0.45)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              {counter > 0 && (
                <div style={{
                  position: 'absolute',
                  top: -3, right: -4,
                  minWidth: 10,
                  height: 10,
                  background: '#ef4444',
                  borderRadius: 5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 1.5px',
                }}>
                  <span style={{ fontSize: 5, color: '#fff', fontWeight: 700, lineHeight: 1 }}>{counter}</span>
                </div>
              )}
            </div>
          </div>

          {/* Notification stack */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, overflow: 'hidden', flex: 1 }}>
            {NOTIFS.slice(0, visible).map((n, i) => (
              <div
                key={i}
                className="pbu-notif"
                style={{
                  background: 'rgba(251,191,36,0.1)',
                  border: '1px solid rgba(251,191,36,0.18)',
                  borderRadius: 4,
                  padding: '2.5px 4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 3,
                  flexShrink: 0,
                }}
              >
                <span style={{ fontSize: 7, flexShrink: 0, lineHeight: 1 }}>{n.icon}</span>
                <span style={{
                  fontSize: 5,
                  color: 'rgba(255,215,130,0.82)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {n.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
