'use client';

export default function FinalCTA() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#0a0a0b',
      }}
    >
      {/* Video placeholder / gradient background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,118,182,0.18) 0%, rgba(0,118,182,0.06) 40%, transparent 70%), #0a0a0b',
          zIndex: 0,
        }}
      />
      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.6)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          padding: 'clamp(60px, 8vw, 100px) clamp(20px, 6vw, 60px)',
          maxWidth: '840px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-space-mono, 'Space Mono', monospace)",
            fontSize: '10px',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--navy, #0076B6)',
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
          }}
        >
          <span style={{ display: 'block', width: '32px', height: '1px', background: 'var(--navy, #0076B6)' }} />
          Ready to grow?
          <span style={{ display: 'block', width: '32px', height: '1px', background: 'var(--navy, #0076B6)' }} />
        </div>

        <h2
          style={{
            fontFamily: "var(--font-heading, var(--font-syne, 'Syne', sans-serif))",
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            marginBottom: '24px',
          }}
        >
          Ready to be the next business<br />
          <span style={{ color: 'var(--navy, #0076B6)' }}>with a line out the door?</span>
        </h2>

        <p
          style={{
            fontFamily: "var(--font-inter, 'Inter', sans-serif)",
            fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
            lineHeight: 1.7,
            color: 'rgba(208,216,224,0.72)',
            marginBottom: '48px',
            maxWidth: '520px',
            margin: '0 auto 48px',
          }}
        >
          $0 down. See your free mockup before you pay a cent.
        </p>

        {/* Primary CTA */}
        <a
          href="/contact"
          className="final-cta-btn"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '22px 52px',
            background: 'var(--navy, #0076B6)',
            color: '#ffffff',
            fontFamily: "var(--font-syne, 'Syne', sans-serif)",
            fontSize: '17px',
            fontWeight: 700,
            letterSpacing: '0.04em',
            textDecoration: 'none',
            borderRadius: '4px',
            border: '1px solid transparent',
            transition: 'box-shadow 0.3s ease, transform 0.2s ease',
            marginBottom: '28px',
          }}
        >
          Get Your Free Mockup →
        </a>

        {/* Secondary */}
        <div>
          <a
            href="tel:+13137992315"
            style={{
              fontFamily: "var(--font-space-mono, 'Space Mono', monospace)",
              fontSize: '12px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--dim, rgba(176,183,188,0.55))',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            className="final-secondary-link"
          >
            Or call us: (313) 799-2315
          </a>
        </div>
      </div>

      <style>{`
        .final-cta-btn:hover {
          box-shadow: 0 0 40px rgba(0,118,182,0.7), 0 0 80px rgba(0,118,182,0.3);
          transform: scale(1.03) translateY(-2px);
        }
        .final-secondary-link:hover {
          color: var(--silver, #D0D8E0);
        }
      `}</style>
    </section>
  );
}
