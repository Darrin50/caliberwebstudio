'use client';

export default function Process() {
  const steps = [
    {
      number: '01',
      title: 'Discovery Call',
      description: 'We learn about your business, goals, competition, and current online presence. This 30-minute call is free — no pressure, no pitch.',
      duration: '30 min call',
    },
    {
      number: '02',
      title: 'Strategy & Design',
      description: 'We build a custom game plan and create a free website mockup tailored to your business. You see exactly what you\'re getting before you commit.',
      duration: '3–5 days',
    },
    {
      number: '03',
      title: 'Build & Launch',
      description: 'Our team builds your AI-powered website, sets up your chatbot, optimizes your Google Business Profile, and configures all your systems.',
      duration: '~2 weeks',
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
        padding: '120px 60px',
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
          From Call to Launch in 2 Weeks
        </h2>

        {/* Process Steps */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2px',
          }}
        >
          {steps.map((step) => (
            <div
              key={step.number}
              className="fu"
              style={{
                background: 'var(--bg2)',
                border: '1px solid var(--border)',
                padding: '40px 32px',
                borderRadius: '2px',
                transition: 'border-color 0.2s ease',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--navy)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
              }}
            >
              {/* Step Number */}
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '64px',
                  fontWeight: 800,
                  color: 'var(--navy)',
                  opacity: 0.3,
                  lineHeight: 1,
                  marginBottom: '16px',
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
