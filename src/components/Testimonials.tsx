import { ScrollReveal } from './ScrollReveal';

const testimonials = [
  {
    quote:
      "Caliber built us a site in 48 hours that I'm genuinely proud to hand to customers. We went from invisible on Google to ranking for 'auto glass Detroit' in two months. The phone hasn't stopped.",
    name: 'Marcus T.',
    role: 'Owner',
    company: 'Detroit Auto Glass',
    industry: 'Local Services',
  },
  {
    quote:
      "I'd been burned by two agencies before — big promises, bad results, worse communication. Darrin showed me a mockup before I paid a dime. We were booked three weeks out within 60 days of launch.",
    name: 'Kevin R.',
    role: 'Owner',
    company: 'Motor City Barbershop',
    industry: 'Retail & Services',
  },
];

export default function Testimonials() {
  return (
    <section
      style={{
        padding: 'clamp(80px, 10vw, 140px) clamp(20px, 6vw, 60px)',
        background: '#0a0a0a',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: 'var(--content-max-wide)', margin: '0 auto' }}>
        <ScrollReveal>
          <div className="sec-label">Client Testimonials</div>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              color: '#fff',
              marginBottom: 'clamp(48px, 6vw, 80px)',
              maxWidth: '560px',
            }}
          >
            Don&apos;t take our word for it.
          </h2>
        </ScrollReveal>

        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 100}>
              <div
                style={{
                  background: '#111827',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                  padding: 'clamp(36px, 4.5vw, 56px)',
                  position: 'relative',
                  overflow: 'hidden',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Subtle top accent */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(to right, #2563eb, transparent)',
                  }}
                />

                {/* Large quote mark */}
                <div
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 'clamp(72px, 8vw, 96px)',
                    color: 'rgba(37,99,235,0.15)',
                    lineHeight: 0.7,
                    marginBottom: '28px',
                    fontWeight: 800,
                    userSelect: 'none',
                  }}
                >
                  &ldquo;
                </div>

                {/* Quote text */}
                <blockquote
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 'clamp(16px, 1.8vw, 19px)',
                    lineHeight: 1.75,
                    color: 'var(--silver)',
                    fontWeight: 400,
                    margin: '0 0 auto',
                    flex: 1,
                  }}
                >
                  {t.quote}
                </blockquote>

                {/* Attribution */}
                <div
                  style={{
                    marginTop: '36px',
                    paddingTop: '24px',
                    borderTop: '1px solid var(--border)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 700,
                      fontSize: '16px',
                      color: '#fff',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '10px',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--dim)',
                    }}
                  >
                    {t.role} · {t.company}
                  </div>
                  <div
                    style={{
                      display: 'inline-block',
                      marginTop: '8px',
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '9px',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#2563eb',
                      padding: '3px 8px',
                      background: 'rgba(37,99,235,0.1)',
                      border: '1px solid rgba(37,99,235,0.25)',
                      borderRadius: '2px',
                      alignSelf: 'flex-start',
                    }}
                  >
                    {t.industry}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <style>{`
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(16px, 2vw, 28px);
        }
        @media (max-width: 720px) {
          .testimonials-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
