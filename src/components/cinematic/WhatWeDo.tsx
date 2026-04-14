import Link from 'next/link';

const SERVICES = [
  {
    num: '01',
    tag: 'Design',
    tagColor: '#0076B6',
    tagBg: 'rgba(0,118,182,0.1)',
    tagBorder: 'rgba(0,118,182,0.3)',
    glow: 'rgba(0,118,182,0.18)',
    title: 'Custom Web Design',
    desc: 'High-performance sites built from scratch — mobile-first, lightning fast, and designed to turn visitors into paying customers. Not a template. Not a drag-and-drop builder.',
  },
  {
    num: '02',
    tag: 'SEO',
    tagColor: '#0284c7',
    tagBg: 'rgba(2,132,199,0.1)',
    tagBorder: 'rgba(2,132,199,0.3)',
    glow: 'rgba(2,132,199,0.18)',
    title: 'Local SEO & Google',
    desc: 'Dominate page one for the searches your customers are actually making. Google Business optimization, schema markup, and geo-targeted landing pages.',
  },
  {
    num: '03',
    tag: 'AI',
    tagColor: '#6366f1',
    tagBg: 'rgba(99,102,241,0.1)',
    tagBorder: 'rgba(99,102,241,0.3)',
    glow: 'rgba(99,102,241,0.18)',
    title: 'AI Chatbot & Lead Capture',
    desc: 'A 24/7 AI assistant trained on your business — answers questions, books appointments, and captures leads automatically while you sleep.',
  },
  {
    num: '04',
    tag: 'Growth',
    tagColor: '#7c3aed',
    tagBg: 'rgba(124,58,237,0.1)',
    tagBorder: 'rgba(124,58,237,0.3)',
    glow: 'rgba(124,58,237,0.18)',
    title: 'Digital Growth Systems',
    desc: 'Review automation, reputation management, analytics dashboard, and social content — systems that keep compounding results long after launch day.',
  },
];

export default function WhatWeDo() {
  return (
    <section
      style={{
        background: 'var(--bg2)',
        padding: 'clamp(72px, 9vw, 120px) clamp(20px, 6vw, 60px)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Headline */}
        <div style={{ marginBottom: 'clamp(48px, 6vw, 72px)' }}>
          <div
            style={{
              fontFamily: "var(--font-space-mono, 'Space Mono', monospace)",
              fontSize: '10px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--navy)',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span style={{ display: 'block', width: '24px', height: '1px', background: 'var(--navy)' }} />
            What We Do
          </div>

          <h2
            style={{
              fontFamily: "var(--font-heading, var(--font-syne, 'Syne', sans-serif))",
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              marginBottom: '16px',
              maxWidth: '740px',
            }}
          >
            Everything your Detroit business needs{' '}
            <span style={{ color: '#0076B6' }}>to get found and grow.</span>
          </h2>

          <p
            style={{
              fontSize: 'clamp(16px, 1.6vw, 18px)',
              color: 'var(--chrome)',
              maxWidth: '560px',
              lineHeight: 1.75,
              margin: 0,
            }}
          >
            One studio. Four core systems. We build the digital foundation that turns your website into your best-performing employee.
          </p>
        </div>

        {/* Service cards */}
        <div className="wwd-grid">
          {SERVICES.map((svc) => (
            <div
              key={svc.title}
              className="wwd-card"
              style={{ '--card-glow': svc.glow, '--card-accent': svc.tagColor } as React.CSSProperties}
            >
              {/* Top accent bar */}
              <div
                style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0,
                  height: '4px',
                  background: `linear-gradient(90deg, ${svc.tagColor} 0%, transparent 100%)`,
                  borderRadius: '12px 12px 0 0',
                }}
              />

              {/* Large background number */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  bottom: '-12px',
                  right: '20px',
                  fontFamily: "var(--font-syne, 'Syne', sans-serif)",
                  fontSize: 'clamp(90px, 11vw, 130px)',
                  fontWeight: 900,
                  color: svc.tagColor,
                  opacity: 0.07,
                  lineHeight: 1,
                  letterSpacing: '-0.05em',
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
              >
                {svc.num}
              </div>

              {/* Tag pill */}
              <span
                style={{
                  display: 'inline-block',
                  fontFamily: "var(--font-space-mono, 'Space Mono', monospace)",
                  fontSize: '10px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: svc.tagColor,
                  background: svc.tagBg,
                  border: `1px solid ${svc.tagBorder}`,
                  borderRadius: '100px',
                  padding: '4px 12px',
                  fontWeight: 700,
                  marginBottom: '20px',
                }}
              >
                {svc.tag}
              </span>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "var(--font-syne, 'Syne', sans-serif)",
                  fontSize: 'clamp(18px, 2vw, 22px)',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '12px',
                  letterSpacing: '-0.015em',
                  lineHeight: 1.2,
                  display: 'block',
                }}
              >
                {svc.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: '15px',
                  color: 'var(--chrome)',
                  lineHeight: 1.75,
                  margin: 0,
                  maxWidth: '100%',
                  position: 'relative',
                }}
              >
                {svc.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ marginTop: 'clamp(40px, 5vw, 56px)', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          <Link href="/services" className="btn-chrome" style={{ textDecoration: 'none' }}>
            See All Services
          </Link>
          <Link href="/contact" className="btn-line" style={{ textDecoration: 'none' }}>
            Get Your Free Mockup
          </Link>
        </div>
      </div>

      <style>{`
        .wwd-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(16px, 2vw, 24px);
        }
        @media (max-width: 640px) {
          .wwd-grid { grid-template-columns: 1fr; }
        }

        /* Card base */
        .wwd-card {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: clamp(28px, 3.5vw, 40px);
          position: relative;
          overflow: hidden;
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }

        /* Radial accent glow in top-right corner — works in all themes */
        .wwd-card::before {
          content: '';
          position: absolute;
          top: -40px;
          right: -40px;
          width: 180px;
          height: 180px;
          background: radial-gradient(circle, var(--card-accent) 0%, transparent 70%);
          opacity: 0.1;
          pointer-events: none;
          border-radius: 50%;
          transition: opacity 0.3s ease;
        }
        .wwd-card:hover::before { opacity: 0.18; }

        /* Light mode card */
        [data-theme="light"] .wwd-card {
          background: #ffffff;
          border-color: rgba(0,0,0,0.08);
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }
        [data-theme="light"] .wwd-card::before { opacity: 0.07; }

        /* Hover */
        .wwd-card:hover {
          transform: translateY(-4px);
          border-color: var(--card-accent);
          box-shadow: 0 8px 40px var(--card-glow), 0 2px 0 var(--card-accent) inset;
        }
        [data-theme="light"] .wwd-card:hover {
          box-shadow: 0 8px 40px var(--card-glow), 0 2px 12px rgba(0,0,0,0.06);
          border-color: var(--card-accent);
        }

        /* Light mode text overrides */
        [data-theme="light"] .wwd-card h3 { color: #111827 !important; }
        [data-theme="light"] .wwd-card p  { color: #374151 !important; }
      `}</style>
    </section>
  );
}
