import { ScrollReveal } from './ScrollReveal';

const steps = [
  {
    number: '01',
    title: 'We learn your business',
    description:
      'A focused discovery call where we dig into your goals, your market, and the customers you want to win. No generic intake forms — real strategy from day one.',
  },
  {
    number: '02',
    title: 'We build your growth machine',
    description:
      'Site. SEO. Local presence. AI chatbot. Review automation. Everything engineered together so each piece compounds on the next — not a patchwork of tools.',
  },
  {
    number: '03',
    title: 'You get found and win customers',
    description:
      'Ongoing results: more calls, more leads, better rankings. You track it. We keep optimizing. The system works around the clock so you don\'t have to.',
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      style={{
        padding: 'clamp(80px, 10vw, 140px) clamp(20px, 6vw, 60px)',
        background: '#111827',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: 'var(--content-max-wide)', margin: '0 auto' }}>
        <ScrollReveal>
          <div className="sec-label">How It Works</div>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(36px, 5vw, 60px)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              color: '#fff',
              marginBottom: 'clamp(56px, 7vw, 96px)',
              maxWidth: '640px',
            }}
          >
            Simple process.<br />
            <span style={{ color: 'var(--chrome)' }}>Serious results.</span>
          </h2>
        </ScrollReveal>

        <div className="hiw-steps">
          {steps.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 100}>
              <div className="hiw-step" style={{ position: 'relative' }}>
                {/* Connector line between steps (desktop) */}
                {i < steps.length - 1 && (
                  <div
                    className="hiw-connector"
                    style={{
                      position: 'absolute',
                      top: '28px',
                      right: '-50%',
                      width: '100%',
                      height: '1px',
                      background: 'linear-gradient(to right, var(--border), transparent)',
                      pointerEvents: 'none',
                    }}
                  />
                )}

                {/* Step number bubble */}
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
                    border: '1px solid rgba(37,99,235,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '28px',
                    position: 'relative',
                    zIndex: 1,
                    boxShadow: '0 0 32px rgba(37,99,235,0.2)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '13px',
                      fontWeight: 700,
                      color: '#93c5fd',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {step.number}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 'clamp(20px, 2.2vw, 26px)',
                    fontWeight: 800,
                    color: '#fff',
                    marginBottom: '16px',
                    lineHeight: 1.2,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {step.title}
                </h3>

                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '15px',
                    lineHeight: 1.75,
                    color: 'var(--chrome)',
                    margin: 0,
                  }}
                >
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <style>{`
        .hiw-steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(40px, 6vw, 80px);
        }
        .hiw-step { padding-right: 24px; }
        .hiw-connector { display: block; }
        @media (max-width: 860px) {
          .hiw-steps { grid-template-columns: 1fr; gap: clamp(40px, 6vw, 56px); }
          .hiw-step { padding-right: 0; border-bottom: 1px solid var(--border); padding-bottom: clamp(32px, 5vw, 48px); }
          .hiw-step:last-child { border-bottom: none; padding-bottom: 0; }
          .hiw-connector { display: none !important; }
        }
      `}</style>
    </section>
  );
}
