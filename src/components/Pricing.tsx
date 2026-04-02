'use client';

import { ScrollReveal, ScrollRevealGroup } from './ScrollReveal';

const plans = [
  {
    name: 'STARTER',
    price: 197,
    popular: false,
    features: [
      'AI-Optimized Website',
      'AI Chatbot Widget',
      'Google Business Profile Setup',
      'Schema Markup & Local SEO',
      'Basic Client Dashboard',
      'SSL & Security Updates',
      'Monthly Performance Report',
    ],
    cta: 'Get Started',
  },
  {
    name: 'GROWTH',
    price: 397,
    popular: true,
    features: [
      'Everything in Starter',
      'Review Management System',
      'Social Media Auto-Posting',
      'AI Content Engine (Blog Posts)',
      'Full Client Dashboard',
      'Priority Support',
      'Monthly Strategy Call',
    ],
    cta: 'Get Started',
  },
  {
    name: 'DOMINATION',
    price: 697,
    popular: false,
    features: [
      'Everything in Growth',
      'AI Citation Tracking',
      'AI Phone Receptionist',
      'Full Automation Suite',
      'Advanced SEO Reporting',
      'Dedicated Account Management',
      'Weekly Strategy Sessions',
    ],
    cta: 'Get Started',
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      style={{
        position: 'relative',
        padding: 'var(--section-pad-lg) clamp(20px, 6vw, 60px)',
        background: 'var(--bg2)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="section-divider" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />

      <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
        <ScrollReveal>
          <div className="sec-label">Transparent Pricing</div>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
              color: 'var(--silver)',
              marginBottom: '16px',
              textAlign: 'center',
            }}
          >
            Simple, Transparent Pricing
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={140}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '18px',
              lineHeight: 1.7,
              color: 'var(--dim)',
              marginBottom: 'clamp(48px, 6vw, 72px)',
              textAlign: 'center',
              maxWidth: '520px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            $0 down. We build it first. You pay when you say yes.
          </p>
        </ScrollReveal>

        <ScrollRevealGroup className="pricing-cards-grid" stagger={100}>
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card tilt-card${plan.popular ? ' pricing-card--popular' : ''}`}
              style={{
                background: plan.popular
                  ? 'linear-gradient(135deg, rgba(30,61,143,0.1), rgba(22,45,106,0.05))'
                  : 'var(--bg)',
                border: `1px solid ${plan.popular ? 'var(--navy)' : 'var(--border)'}`,
                padding: 'clamp(32px, 4vw, 48px) clamp(24px, 3vw, 36px)',
                borderRadius: '2px',
                position: 'relative',
                transform: plan.popular ? 'scale(1.02)' : 'scale(1)',
                boxShadow: plan.popular
                  ? '0 0 40px rgba(30,61,143,0.2), 0 0 80px rgba(30,61,143,0.1), inset 0 0 30px rgba(30,61,143,0.05)'
                  : 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = plan.popular ? 'scale(1.04) translateY(-6px)' : 'translateY(-6px)';
                el.style.boxShadow = plan.popular
                  ? '0 12px 56px rgba(30,61,143,0.3), 0 0 100px rgba(30,61,143,0.15)'
                  : '0 12px 40px rgba(30,61,143,0.15), 0 0 0 1px rgba(30,61,143,0.1)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = plan.popular ? 'scale(1.02)' : 'scale(1)';
                el.style.boxShadow = plan.popular
                  ? '0 0 40px rgba(30,61,143,0.2), 0 0 80px rgba(30,61,143,0.1)'
                  : 'none';
              }}
            >
              {plan.popular && (
                <div style={{
                  position: 'absolute', top: '-12px', left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'var(--navy)', color: '#fff',
                  padding: '5px 18px', fontSize: '11px', fontWeight: 700,
                  fontFamily: "'Space Mono', monospace",
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  borderRadius: '2px',
                }}>
                  Most Popular
                </div>
              )}

              <h3 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '18px', fontWeight: 800,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                color: 'var(--silver)', marginBottom: '20px',
              }}>
                {plan.name}
              </h3>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '32px' }}>
                <span style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 'clamp(40px, 5vw, 52px)',
                  fontWeight: 800, color: 'var(--chrome)',
                  letterSpacing: '-0.02em',
                }}>
                  ${plan.price}
                </span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'var(--dim)' }}>/month</span>
              </div>

              <ul style={{ listStyle: 'none', marginBottom: '36px' }}>
                {plan.features.map((feature) => (
                  <li key={feature} style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px', lineHeight: 1.8,
                    color: 'var(--dim)',
                    paddingBottom: '12px',
                    borderBottom: '1px solid var(--border)',
                    marginBottom: '12px',
                    display: 'flex', alignItems: 'center', gap: '10px',
                  }}>
                    <span style={{ color: 'var(--navy)', fontSize: '16px', fontWeight: 700, flexShrink: 0 }}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="/contact"
                className="btn-chrome"
                style={{ width: '100%', textAlign: 'center', display: 'block', textDecoration: 'none' }}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </ScrollRevealGroup>

        <ScrollReveal delay={200}>
          <div style={{
            textAlign: 'center', marginTop: '48px',
            fontFamily: "'Space Mono', monospace",
            fontSize: '11px', color: 'var(--dim)', letterSpacing: '0.05em',
          }}>
            All plans include free website mockup · $0 down · cancel anytime with 30 days notice
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        .pricing-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(16px, 2vw, 28px);
          align-items: center;
        }
        @media (max-width: 900px) {
          .pricing-cards-grid {
            grid-template-columns: 1fr;
            max-width: 420px;
            margin-left: auto;
            margin-right: auto;
          }
          .pricing-cards-grid .pricing-card--popular { transform: scale(1) !important; }
        }
      `}</style>
    </section>
  );
}
