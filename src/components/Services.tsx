export default function Services() {
  const services = [
    {
      emoji: '🌐',
      title: 'AI-Powered Website',
      description: 'Custom-built, blazing-fast sites with built-in AI features that work 24/7',
    },
    {
      emoji: '🤖',
      title: 'AI Chatbot',
      description: 'Intelligent chat that qualifies leads, books appointments, and answers questions automatically',
    },
    {
      emoji: '📍',
      title: 'Google Business Profile',
      description: 'Optimized GBP with schema markup so you dominate local search results',
    },
    {
      emoji: '⭐',
      title: 'Review Engine',
      description: 'Automated review requests that build your reputation on autopilot',
    },
    {
      emoji: '📱',
      title: 'Social Content',
      description: 'AI-generated posts, graphics, and captions scheduled and posted for you',
    },
    {
      emoji: '📊',
      title: 'Client Dashboard',
      description: 'Real-time analytics showing rankings, traffic, leads, and ROI in one place',
    },
  ];

  return (
    <section
      id="services"
      style={{
        position: 'relative',
        padding: '120px 60px',
        background: 'var(--bg)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Section Label */}
        <div className="sec-label fu">What We Build</div>

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
          Every Tool You Need to Dominate Your Market
        </h2>

        {/* Service Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
          }}
        >
          {services.map((service, index) => (
            <div
              key={service.title}
              className="svc-card fu"
              style={{
                background: 'var(--bg2)',
                border: '1px solid var(--border)',
                padding: '32px',
                borderRadius: '2px',
                transition: 'border-color 0.2s ease, transform 0.2s ease',
                cursor: 'pointer',
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
              <div
                style={{
                  fontSize: '48px',
                  marginBottom: '20px',
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {service.emoji}
              </div>

              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '20px',
                  fontWeight: 700,
                  lineHeight: 1.3,
                  color: 'var(--silver)',
                  marginBottom: '16px',
                  textAlign: 'left',
                }}
              >
                {service.title}
              </h3>

              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '15px',
                  fontWeight: 400,
                  lineHeight: 1.6,
                  color: 'var(--dim)',
                  textAlign: 'left',
                }}
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
