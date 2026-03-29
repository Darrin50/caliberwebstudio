'use client';

export default function Process() {
  const steps = [
    {
      number: '01',
      title: 'Discovery Call',
      description: 'We learn about your business, goals, competition, and current online presence. This 30-minute call is free \u2014 no pressure, no pitch.',
      duration: '30 min call',
    },
    {
      number: '02',
      title: 'Strategy & Design',
      description: "We build a custom game plan and create a free website mockup tailored to your business. You see exactly what you're getting before you commit.",
      duration: 'Same day',
    },
    {
      number: '03',
      title: 'Build & Launch',
      description: 'Our team builds your AI-powered website, sets up your chatbot, optimizes your Google Business Profile, and configures all your systems.',
      duration: '~48 hours',
    },
    {
      number: '04',
      title: 'Optimize & Grow',
      description: 'Ongoing optimization, content creation, review automation, and monthly strategy calls to make sure your numbers keep climbing.',
      duration: 'Ongoing',
    },
  ];

  return (
    <section
      id="process"
      style={{
        position: 'relative',
        padding: '80px 60px',
        background: 'var(--bg)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Section Label */}
        <div className="sec-label fu">How We Work</div>

        {/* Heading */}
        <h2
          className="fu"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(36px, 6vw, 72px)',
            fontWeight: 800,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            color: 'var(--silver)',
            marginBottom: '80px',
            maxWidth: '900px',
          }}
        >
          From Call to Launch in 48 Hours
        </h2>

        {/* Process Steps */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2px',
            position: 'relative',
          }}
        >
          {/* Vertical Timeline Line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              width: '2px',
              height: '100%',
              background: 'linear-gradient(to bottom, var(--navy), rgba(30, 61, 143, 0.2), transparent)',
              opacity: 0.4,
              pointerEvents: 'none',
            }}
          />

          {steps.map((step, index) => (
            <div
              key={step.number}
              className="fu"
              style={{
                background: 'var(--bg2)',
                border: '1px solid var(--border)',
                padding: '40px 32px',
                borderRadius: '2px',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'var(--navy)';
                const accentLine = el.querySelector('[data-accent-line]') as HTMLElement;
                if (accentLine) {
                  accentLine.style.opacity = '1';
                  accentLine.style.transform = 'scaleX(1)';
                }
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'var(--border)';
                const accentLine = el.querySelector('[data-accent-line]') as HTMLElement;
                if (accentLine) {
                  accentLine.style.opacity = '0';
                  accentLine.style.transform = 'scaleX(0)';
                }
              }}
            >
              {/* Gradient Accent Line at Top */}
              <div
                data-accent-line
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'linear-gradient(to right, var(--navy), var(--chrome), transparent)',
                  opacity: 0,
                  transform: 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'all 0.3s ease',
                }}
              />

              {/* Step Number */}
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '64px',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, var(--navy), var(--chrome))',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  opacity: 1,
                  lineHeight: 1,
                  marginBottom: '16px',
                  transition: 'opacity 0.3s ease',
                }}
              >
                {step.number}
              </div>

              {/* Duration Badge */}
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '10px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--chrome)',
                  marginBottom: '16px',
                  padding: '4px 10px',
                  border: '1px solid var(--border)',
                  display: 'inline-block',
                  borderRadius: '2px',
                }}
              >
                {step.duration}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '22px',
                  fontWeight: 700,
                  color: 'var(--silver)',
                  marginBottom: '16px',
                  lineHeight: 1.3,
                }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '15px',
                  fontWeight: 400,
                  lineHeight: 1.6,
                  color: 'var(--dim)',
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
