export default function Pricing() {
  const plans = [
    {
      name: 'STARTER',
      price: 197,
      popular: false,
      features: [
        'AI-Built Website',
        'AI Chatbot (Basic)',
        'Google Business Profile Optimization',
        'Schema Markup',
        'Basic Analytics Dashboard',
      ],
      cta: 'Get Started',
    },
    {
      name: 'GROWTH',
      price: 397,
      popular: true,
      features: [
        'Everything in Starter',
        'Review Automation',
        'Social Content Engine',
        'Advanced Analytics',
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
        'Citation Tracking & Building',
        'AI Phone Assistant',
        'Full Marketing Automation',
        'White-Glove Setup',
        'Dedicated Account Manager',
      ],
      cta: 'Get Started',
    },
  ];

  return (
    <section
      id="pricing"
      style={{
        position: 'relative',
        padding: '120px 60px',
        background: 'var(--bg)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Section Label */}
        <div className="sec-label fu">Transparent Pricing</div>

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
          }}
        >
          $0 to Start. Cancel Anytime.
        </h2>

        {/* Subtitle */}
        <p
          className="fu"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '18px',
            fontWeight: 400,
            lineHeight: 1.6,
            color: 'var(--dim)',
            marginBottom: '80px',
          }}
        >
          No setup fees. No long-term contracts. Just results.
        </p>

        {/* Pricing Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
            marginBottom: '60px',
          }}
        >
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="fu"
              style={{
                background: 'var(--bg2)',
                border: `1px solid ${plan.popular ? 'var(--navy)' : 'var(--border)'}`,
                padding: '48px 32px',
                borderRadius: '2px',
                position: 'relative',
                transform: plan.popular ? 'scale(1.02)' : 'scale(1)',
                boxShadow: plan.popular
                  ? '0 0 40px rgba(168,184,200,0.1), 0 0 80px rgba(30,61,143,0.08)'
                  : 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                if (plan.popular) {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = 'scale(1.04)';
                }
              }}
              onMouseLeave={(e) => {
                if (plan.popular) {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = 'scale(1.02)';
                }
              }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--navy)',
                    color: '#fff',
                    padding: '6px 16px',
                    fontSize: '11px',
                    fontWeight: 700,
                    fontFamily: "'Space Mono', monospace",
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    borderRadius: '2px',
                  }}
                >
                  Most Popular
                </div>
              )}

              {/* Plan Name */}
              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '20px',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--silver)',
                  marginBottom: '20px',
                }}
              >
                {plan.name}
              </h3>

              {/* Price */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '8px',
                  marginBottom: '32px',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: '48px',
                    fontWeight: 800,
                    color: 'var(--chrome)',
                  }}
                >
                  ${plan.price}
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    color: 'var(--dim)',
                  }}
                >
                  /month
                </span>
              </div>

              {/* Features List */}
              <ul
                style={{
                  listStyle: 'none',
                  marginBottom: '36px',
                }}
              >
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '14px',
                      fontWeight: 400,
                      lineHeight: 1.8,
                      color: 'var(--dim)',
                      paddingBottom: '12px',
                      borderBottom: '1px solid var(--border)',
                      marginBottom: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <span
                      style={{
                        color: 'var(--chrome)',
                        fontSize: '16px',
                        fontWeight: 700,
                      }}
                    >
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <a
                href="#contact"
                className="btn-chrome"
                style={{
                  width: '100%',
                  textAlign: 'center',
                  display: 'block',
                  textDecoration: 'none',
                }}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div
          className="fu"
          style={{
            textAlign: 'center',
            fontFamily: "'Space Mono', monospace",
            fontSize: '12px',
            color: 'var(--dim)',
            letterSpacing: '0.05em',
          }}
        >
          All plans include free website mockup • No credit card required to start
        </div>
      </div>
    </section>
  );
}
