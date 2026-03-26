'use client';

import Image from 'next/image';

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--bg)',
        borderTop: '1px solid var(--border)',
        padding: '52px 60px',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        position: 'relative',
      }}
    >
      {/* Top gradient line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--navy), transparent)',
          opacity: 0.6,
        }}
      />

      {/* Social links row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '24px',
          paddingTop: '16px',
        }}
      >
        <a
          href="#"
          style={{
            color: 'var(--dim)',
            transition: 'color 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '24px',
            height: '24px',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--silver)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--dim)')}
          title="LinkedIn"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </a>

        <a
          href="#"
          style={{
            color: 'var(--dim)',
            transition: 'color 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '24px',
            height: '24px',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--silver)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--dim)')}
          title="Twitter/X"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2s9 5 20 5a9.5 9.5 0 0 0-9-5.5c4.75 2.25 7-7 7-7" />
          </svg>
        </a>

        <a
          href="#"
          style={{
            color: 'var(--dim)',
            transition: 'color 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '24px',
            height: '24px',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--silver)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--dim)')}
          title="Instagram"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <circle cx="17.5" cy="6.5" r="1.5" />
          </svg>
        </a>
      </div>

      {/* Main footer content */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '40px',
        }}
      >
      {/* Left: Logo + Brand Name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Image
          src="/logo-mark-nav.png"
          alt="Caliber Web Studio"
          width={28}
          height={28}
          style={{ objectFit: 'contain' }}
        />
        <span
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: '14px',
            fontWeight: 800,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--silver)',
          }}
        >
          Caliber Web Studio
        </span>
      </div>

      {/* Center: Copyright */}
      <div
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '9px',
          color: 'var(--dim)',
          letterSpacing: '0.05em',
          textAlign: 'center',
          flex: 1,
        }}
      >
        Â© 2026 High Caliber Operations LLC Â· Detroit, MI
      </div>

      {/* Right: Tagline */}
      <div
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '9px',
          color: 'var(--dim)',
          letterSpacing: '0.05em',
          textAlign: 'right',
        }}
      >
        Measure. Design. Rise.
      </div>
      </div>
    </footer>
  );
}
