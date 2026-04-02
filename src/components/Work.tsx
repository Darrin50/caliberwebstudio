'use client';

import { ScrollReveal, ScrollRevealGroup } from './ScrollReveal';

const demos = [
  {
    slug: 'detroit-cuts',
    category: 'Barbershop',
    title: 'Detroit Cuts',
    description: 'Online booking, photo gallery, AI chatbot for after-hours, and Google Maps integration. Everything a barbershop needs to fill its calendar.',
    features: ['Online Booking', 'Photo Gallery', 'AI Chatbot', 'Mobile-First'],
  },
  {
    slug: 'metro-plumbing',
    category: 'Plumbing',
    title: 'Metro Plumbing & Drain',
    description: 'Emergency call CTA above the fold, service area pages built for local SEO, and a 24/7 lead capture form that routes to the on-call team.',
    features: ['Emergency CTA', 'Service Area Pages', 'Lead Capture', 'Trust Signals'],
  },
  {
    slug: 'luxe-salon',
    category: 'Beauty / Salon',
    title: 'Luxe Beauty Studio',
    description: 'Gallery-first design, online booking with stylist selection, natural hair SEO structure, and an embedded Instagram feed.',
    features: ['Online Booking', 'Gallery Design', 'Natural Hair SEO', 'Instagram Feed'],
  },
  {
    slug: 'detroits-kitchen',
    category: 'Restaurant',
    title: "Detroit's Kitchen",
    description: 'Online menu, catering inquiry form, AI chatbot for FAQs, and a private events page to capture that revenue stream.',
    features: ['Online Menu', 'Catering Form', 'AI Chatbot', 'Events Page'],
  },
];

export default function Work() {
  return (
    <section
      id="work"
      style={{
        position: 'relative',
        padding: 'var(--section-pad-lg) clamp(20px, 6vw, 60px)',
        background: 'var(--bg)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: 'var(--content-max-wide)', margin: '0 auto' }}>
        <ScrollReveal>
          <div className="sec-label">Live Demo Sites</div>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(36px, 5vw, 60px)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
            color: 'var(--silver)',
            marginBottom: '20px',
            maxWidth: '780px',
          }}>
            We Don&apos;t Just Talk About It.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={140}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '18px',
            lineHeight: 1.7,
            color: 'var(--dim)',
            marginBottom: 'clamp(48px, 6vw, 72px)',
            maxWidth: '580px',
          }}>
            These aren&apos;t mockups — they&apos;re live, working websites built with the same AI-powered system we&apos;ll use for your business.
          </p>
        </ScrollReveal>

        <ScrollRevealGroup className="work-grid" stagger={100}>
          {demos.map((demo) => (
            <a
              key={demo.slug}
              href={`/demo/${demo.slug}`}
              className="case-card tilt-card"
              style={{
                background: 'var(--bg2)',
                border: '1px solid var(--border)',
                borderRadius: '2px',
                overflow: 'hidden',
                position: 'relative',
                textDecoration: 'none',
                display: 'block',
                transition: 'border-color 0.3s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--navy)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}
            >
              {/* Top gradient */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '80px',
                background: 'linear-gradient(180deg, rgba(30,61,143,0.08) 0%, transparent 100%)',
                pointerEvents: 'none', zIndex: 1,
              }} />

              <div style={{ padding: '28px 28px 0', position: 'relative', zIndex: 2 }}>
                <span style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '10px', letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: 'var(--chrome)',
                  padding: '4px 10px', border: '1px solid var(--border)',
                  borderRadius: '2px',
                }}>
                  {demo.category}
                </span>
              </div>

              <div style={{ padding: '16px 28px', position: 'relative', zIndex: 2 }}>
                <h3 style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '22px', fontWeight: 700,
                  color: 'var(--silver)', marginBottom: '10px', lineHeight: 1.3,
                }}>
                  {demo.title}
                </h3>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px', lineHeight: 1.7,
                  color: 'var(--dim)', marginBottom: '16px', maxWidth: '100%',
                }}>
                  {demo.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                  {demo.features.map((f) => (
                    <span key={f} style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '9px', letterSpacing: '0.06em',
                      textTransform: 'uppercase', color: 'var(--chrome)',
                      padding: '3px 8px',
                      background: 'rgba(168,184,200,0.08)',
                      borderRadius: '2px',
                    }}>
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{
                padding: '14px 28px',
                borderTop: '1px solid var(--border)',
                background: 'linear-gradient(180deg, rgba(30,61,143,0.04) 0%, transparent 100%)',
                position: 'relative', zIndex: 2,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <span style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '10px', letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: 'var(--navy)', fontWeight: 700,
                }}>
                  View Live Demo →
                </span>
                <span style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '9px', letterSpacing: '0.06em',
                  textTransform: 'uppercase', color: 'var(--dim)',
                }}>
                  Working Site
                </span>
              </div>
            </a>
          ))}
        </ScrollRevealGroup>

        <ScrollReveal delay={200}>
          <div style={{ textAlign: 'center', marginTop: 'clamp(40px, 5vw, 60px)' }}>
            <a href="/case-studies" className="btn-chrome" style={{ textDecoration: 'none', display: 'inline-block' }}>
              Explore All Demo Sites →
            </a>
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        .work-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: clamp(16px, 2vw, 24px);
          margin-bottom: 0;
        }
      `}</style>
    </section>
  );
}
