import Image from 'next/image';

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--bg)',
        borderTop: '1px solid var(--border)',
        padding: '52px 60px',
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
        © 2026 High Caliber Operations LLC · Detroit, MI
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
    </footer>
  );
}
