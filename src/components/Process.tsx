'use client';

import { ScrollReveal, ScrollRevealGroup } from './ScrollReveal';

const steps = [
  { number: '01', title: 'Discovery Call', description: 'We learn about your business, goals, competition, and current online presence. This 30-minute call is free — no pressure, no pitch.', duration: '30 min' },
  { number: '02', title: 'Strategy & Design', description: "We build a custom game plan and create a free website mockup tailored to your business. You see exactly what you're getting before you commit.", duration: 'Same day' },
  { number: '03', title: 'Build & Launch', description: 'Our team builds your AI-powered website, sets up your chatbot, optimizes your Google Business Profile, and configures all your systems.', duration: '~48 hours' },
  { number: '04', title: 'Optimize & Grow', description: 'Ongoing optimization, content creation, review automation, and monthly strategy calls to make sure your numbers keep climbing.', duration: 'Ongoing' },
];

export default function Process() {
  return (
    <section
      id="process"
      style={{
        position: 'relative',
        padding: 'var(--section-pad-lg) clamp(20px, 6vw, 60px)',
        background: 'var(--bg)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: 'var(--content-max-wide)', margin: '0 auto' }}>
        <ScrollReveal>
          <div className="sec-label">How We Work</div>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(36px, 5vw, 60px)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
              color: 'var(--silver)',
              marginBottom: 'clamp(48px, 6vw, 80px)',
              maxWidth: '780px',
            }}
          >
            From Call to Launch in 48 Hours
          </h2>
        </ScrollReveal>

        <ScrollRevealGroup
          className="process-grid"
          stagger={100}
        >
          {steps.map((step) => (
            <div
              key={step.number}
              className="process-card tilt-card"
              style={{
                background: 'var(--bg2)',
                border: '1px solid var(--border)',
                padding: 'clamp(32px, 4vw, 48px)',
                borderRadius: '2px',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'var(--navy)';
                const line = el.querySelector('[data-accent-line]') as HTMLElement;
                if (line) { line.style.opacity = '1'; line.style.transform = 'scaleX(1)'; }
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'var(--border)';
                const line = el.querySelector('[data-accent-line]') as HTMLElement;
                if (line) { line.style.opacity = '0'; line.style.transform = 'scaleX(0)'; }
              }}
            >
              <div
                data-accent-line
                style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                  background: 'linear-gradient(to right, var(--navy), var(--chrome), transparent)',
                  opacity: 0, transform: 'scaleX(0)', transformOrigin: 'left',
                  transition: 'all 0.4s ease',
                }}
              />

              {/* Big number */}
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 'clamp(64px, 8vw, 96px)',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, var(--navy), var(--chrome))',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1,
                  marginBottom: '16px',
                  letterSpacing: '-0.03em',
                }}
              >
                {step.number}
              </div>

              {/* Duration badge */}
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '10px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--chrome)',
                marginBottom: '20px',
                padding: '4px 12px',
                border: '1px solid var(--border)',
                display: 'inline-block',
                borderRadius: '2px',
              }}>
                {step.duration}
              </div>

              <h3 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '22px',
                fontWeight: 700,
                color: 'var(--silver)',
                marginBottom: '14px',
                lineHeight: 1.3,
              }}>
                {step.title}
              </h3>

              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '15px',
                lineHeight: 1.7,
                color: 'var(--dim)',
                maxWidth: '100%',
              }}>
                {step.description}
              </p>
            </div>
          ))}
        </ScrollRevealGroup>
      </div>

      <style>{`
        .process-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(16px, 2vw, 24px);
        }
        @media (max-width: 1000px) {
          .process-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .process-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
