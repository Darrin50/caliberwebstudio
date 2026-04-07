import { ScrollReveal } from './ScrollReveal';

const pairs = [
  {
    pain: 'Your website looks outdated',
    outcome: 'Professional site that builds trust instantly',
  },
  {
    pain: "Google doesn't know you exist",
    outcome: 'Ranked where your customers are searching',
  },
  {
    pain: "You're losing leads to competitors",
    outcome: 'A system that captures and converts 24/7',
  },
];

export default function ProblemSolution() {
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
          <div className="sec-label">The Problem</div>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(36px, 5vw, 62px)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#fff',
              marginBottom: 'clamp(48px, 6vw, 80px)',
              maxWidth: '700px',
            }}
          >
            Most Detroit businesses are invisible online.{' '}
            <span style={{ color: 'var(--navy)' }}>We fix that.</span>
          </h2>
        </ScrollReveal>

        <div className="ps-grid">
          {/* Pain column */}
          <div>
            <ScrollReveal>
              <p
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '10px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--dim)',
                  marginBottom: '24px',
                }}
              >
                The problem
              </p>
            </ScrollReveal>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
              {pairs.map((p, i) => (
                <ScrollReveal key={p.pain} delay={i * 60}>
                  <div
                    style={{
                      padding: 'clamp(20px, 2.5vw, 28px) clamp(20px, 3vw, 32px)',
                      background: '#111827',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                    }}
                  >
                    <span
                      style={{
                        flexShrink: 0,
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: 'rgba(239,68,68,0.12)',
                        border: '1px solid rgba(239,68,68,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        color: 'rgba(239,68,68,0.7)',
                      }}
                    >
                      ✕
                    </span>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 'clamp(14px, 1.5vw, 16px)',
                        color: 'var(--chrome)',
                        lineHeight: 1.4,
                      }}
                    >
                      {p.pain}
                    </span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Arrow divider (desktop only) */}
          <div
            className="ps-arrow"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '24px',
              paddingTop: '46px',
            }}
          >
            {pairs.map((_, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--navy)',
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '18px',
                  opacity: 0.6,
                }}
              >
                →
              </div>
            ))}
          </div>

          {/* Outcome column */}
          <div>
            <ScrollReveal>
              <p
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '10px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--dim)',
                  marginBottom: '24px',
                }}
              >
                The solution
              </p>
            </ScrollReveal>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
              {pairs.map((p, i) => (
                <ScrollReveal key={p.outcome} delay={i * 60 + 120}>
                  <div
                    style={{
                      padding: 'clamp(20px, 2.5vw, 28px) clamp(20px, 3vw, 32px)',
                      background: '#0f1a2e',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                    }}
                  >
                    <span
                      style={{
                        flexShrink: 0,
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: 'rgba(37,99,235,0.15)',
                        border: '1px solid rgba(37,99,235,0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        color: '#2563eb',
                      }}
                    >
                      ✓
                    </span>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 'clamp(14px, 1.5vw, 16px)',
                        color: '#fff',
                        fontWeight: 500,
                        lineHeight: 1.4,
                      }}
                    >
                      {p.outcome}
                    </span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .ps-grid {
          display: grid;
          grid-template-columns: 1fr 48px 1fr;
          gap: 0;
          align-items: start;
        }
        @media (max-width: 700px) {
          .ps-grid {
            grid-template-columns: 1fr;
            gap: clamp(32px, 5vw, 48px);
          }
          .ps-arrow { display: none !important; }
        }
      `}</style>
    </section>
  );
}
