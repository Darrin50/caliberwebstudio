'use client';

export default function Work() {
  const demos = [
    {
      slug: 'detroit-cuts',
      category: 'Barbershop',
      title: 'Detroit Cuts',
      description:
        'Online booking, photo gallery, AI chatbot for after-hours, and Google Maps integration. Everything a barbershop needs to fill its calendar.',
      features: ['Online Booking', 'Photo Gallery', 'AI Chatbot', 'Mobile-First'],
    },
    {
      slug: 'metro-plumbing',
      category: 'Plumbing',
      title: 'Metro Plumbing & Drain',
      description:
        'Emergency call CTA above the fold, service area pages built for local SEO, and a 24/7 lead capture form that routes to the on-call team.',
      features: ['Emergency CTA', 'Service Area Pages', 'Lead Capture', 'Trust Signals'],
    },
    {
      slug: 'luxe-salon',
      category: 'Beauty / Salon',
      title: 'Luxe Beauty Studio',
      description:
        'Gallery-first design, online booking with stylist selection, natural hair SEO structure, and an embedded Instagram feed.',
      features: ['Online Booking', 'Gallery Design', 'Natural Hair SEO', 'Instagram Feed'],
    },
    {
      slug: 'detroits-kitchen',
      category: 'Restaurant',
      title: "Detroit's Kitchen",
      description:
        'Online menu, catering inquiry form, AI chatbot for FAQs, and a private events page to capture that revenue stream.',
      features: ['Online Menu', 'Catering Form', 'AI Chatbot', 'Events Page'],
    },
  ];

  return (
    <section
      id="work"
      style={{
        position: 'relative',
        padding: '80px 60px',
        background: 'var(--bg)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Section Label */}
        <div className="sec-label fu">Live Demo Sites</div>

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
            marginBottom: '16px',
            maxWidth: '900px',
          }}
        >
          We Don&apos;t Just Talk About It.
        </h2>

        <p
          className="fu"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '18px',
            fontWeight: 400,
            lineHeight: 1.6,
            color: 'var(--dim)',
            marginBottom: '80px',
            maxWidth: '640px',
          }}
        >
          These aren&apos;t mockups or screenshots — they&apos;re live, working websites built with
          the same AI-powered system we&apos;ll use for your business. Pick your industry and click
          through.
        </p>

        {/* Demo Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '28px',
            marginBottom: '60px',
          }}
        >
          {demos.map((demo) => (
            <a
              key={demo.slug}
              href={`/demo/${demo.slug}`}
              className="fu case-card"
              style={{
                background: 'var(--bg2)',
                border: '1px solid var(--border)',
                borderRadius: '2px',
                overflow: 'hidden',
                transition: 'border-color 0.2s ease, transform 0.2s ease, box-shadow 0.3s ease',
                position: 'relative',
                textDecoration: 'none',
                display: 'block',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'var(--navy)';
                el.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'var(--border)';
                el.style.transform = 'translateY(0)';
              }}
            >
              {/* Gradient overlay at top */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '80px',
                  background: 'linear-gradient(180deg, rgba(30,61,143,0.08) 0%, transparent 100%)',
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
              />

              {/* Category Tag */}
              <div style={{ padding: '32px 32px 0', position: 'relative', zIndex: 2 }}>
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '10px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--chrome)',
                    padding: '4px 10px',
                    border: '1px solid var(--border)',
                    borderRadius: '2px',
                  }}
                >
                  {demo.category}
                </span>
              </div>

              {/* Content */}
              <div style={{ padding: '20px 32px', position: 'relative', zIndex: 2 }}>
                <h3
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: '22px',
                    fontWeight: 700,
                    color: 'var(--silver)',
                    marginBottom: '12px',
                    lineHeight: 1.3,
                  }}
                >
                  {demo.title}
                </h3>

                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: 1.6,
                    color: 'var(--dim)',
                    marginBottom: '20px',
                  }}
                >
                  {demo.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
                  {demo.features.map((f) => (
                    <span
                      key={f}
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: '9px',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: 'var(--chrome)',
                        padding: '3px 8px',
                        background: 'rgba(168,184,200,0.08)',
                        borderRadius: '2px',
                      }}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* View Demo Footer */}
              <div
                style={{
                  padding: '16px 32px',
                  borderTop: '1px solid var(--border)',
                  background: 'linear-gradient(180deg, rgba(30,61,143,0.04) 0%, transparent 100%)',
                  position: 'relative',
                  zIndex: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '10px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--navy)',
                    fontWeight: 700,
                  }}
                >
                  View Live Demo →
                </span>
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '9px',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'var(--dim)',
                  }}
                >
                  Working Site
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="fu" style={{ textAlign: 'center' }}>
          <a
            href="/case-studies"
            className="btn-chrome"
            style={{
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Explore All Demo Sites →
          </a>
        </div>
      </div>
    </section>
  );
}
