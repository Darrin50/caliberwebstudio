'use client';

interface CinematicHeroProps {
  videoSrc?: string;
}

export default function CinematicHero({ videoSrc }: CinematicHeroProps) {
  return (
    <section
      style={{
        minHeight: '100vh',
        background: '#0a0a0b',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Video / gradient placeholder */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: videoSrc
            ? undefined
            : 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,118,182,0.18) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(0,118,182,0.08) 0%, transparent 60%), #0a0a0b',
          zIndex: 0,
        }}
      >
        {videoSrc && (
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45 }}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}
        {videoSrc && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(10,10,11,0.3) 0%, rgba(10,10,11,0.6) 100%)',
            }}
          />
        )}
      </div>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          padding: 'clamp(100px, 12vw, 140px) clamp(20px, 6vw, 60px) clamp(60px, 8vw, 100px)',
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        {/* Eyebrow label */}
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
          Detroit Web Design Agency
          <span style={{ display: 'block', width: '32px', height: '1px', background: 'var(--navy, #0076B6)' }} />
        </div>

        {/* Headline with typing animation */}
        <h1
          className="cinematic-headline"
          style={{
            fontFamily: "var(--font-heading, var(--font-syne, 'Syne', sans-serif))",
            fontSize: 'clamp(2.6rem, 6.5vw, 5.5rem)',
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            marginBottom: '32px',
          }}
        >
          We Build Businesses<br />
          <span style={{ color: 'var(--navy, #0076B6)' }}>That Get Found.</span>
        </h1>

        <p
          style={{
            fontFamily: "var(--font-inter, 'Inter', sans-serif)",
            fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
            lineHeight: 1.7,
            color: 'rgba(208,216,224,0.72)',
            marginBottom: '48px',
            maxWidth: '560px',
            margin: '0 auto 48px',
          }}
        >
          High-performance websites. Real Google rankings. AI lead capture.
          <br />$0 down — see your free mockup before you pay a cent.
        </p>

        {/* CTA */}
        <a
          href="/contact"
          className="cinematic-cta"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '18px 38px',
            background: 'var(--navy, #0076B6)',
            color: '#ffffff',
            fontFamily: "var(--font-syne, 'Syne', sans-serif)",
            fontSize: '15px',
            fontWeight: 700,
            letterSpacing: '0.04em',
            textDecoration: 'none',
            borderRadius: '4px',
            border: '1px solid transparent',
            transition: 'box-shadow 0.3s ease, transform 0.2s ease',
            position: 'relative',
          }}
        >
          Get Your Free Mockup →
        </a>
      </div>

      {/* Animated down chevron */}
      <div
        className="chevron-bounce"
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        <svg width="24" height="14" viewBox="0 0 24 14" fill="none">
          <path d="M2 2L12 11L22 2" stroke="rgba(208,216,224,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <style>{`
        .cinematic-cta:hover {
          box-shadow: 0 0 32px rgba(0,118,182,0.55), 0 0 64px rgba(0,118,182,0.25);
          transform: translateY(-2px);
        }
        @keyframes bounce-chevron {
          0%, 100% { transform: translateX(-50%) translateY(0); opacity: 0.5; }
          50% { transform: translateX(-50%) translateY(8px); opacity: 1; }
        }
        .chevron-bounce {
          animation: bounce-chevron 2s ease-in-out infinite;
        }
        @keyframes cinematic-fade-in {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .cinematic-headline {
          animation: cinematic-fade-in 0.9s ease forwards;
        }
      `}</style>
    </section>
  );
}
