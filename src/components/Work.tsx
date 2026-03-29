'use client';

export default function Work() {
  const projects = [
    {
      category: 'HVAC',
      title: 'Detroit HVAC Company',
      result: 'Page 3 → Page 1 in 6 weeks',
      description: 'Full AI website, chatbot, GBP optimization, and review automation. Went from 12 Google reviews to 200+ in 90 days.',
      metrics: [
        { value: '200+', label: 'Reviews' },
        { value: '6 wks', label: 'To Page 1' },
        { value: '340%', label: 'ROI' },
      ],
    },
    {
      category: 'Home Services',
      title: 'Metro Remodeling Co.',
      result: '40% drop in lead costs',
      description: 'AI-powered website with smart lead scoring, automated follow-ups, and review engine. Cut cost per lead nearly in half.',
      metrics: [
        { value: '40%', label: 'Lower CPL' },
        { value: '3x', label: 'More Leads' },
        { value: '250%', label: 'ROI' },
      ],
    },
    {
      category: 'Legal',
      title: 'Southfield Law Firm',
      result: '#1 for "injury lawyer Southfield"',
      description: 'Custom website with AI chatbot for case intake, GBP domination strategy, and automated review system for client testimonials.',
      metrics: [
        { value: '#1', label: 'Local Rank' },
        { value: '85+', label: 'Reviews' },
        { value: '400%', label: 'ROI' },
      ],
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
        <div className="sec-label fu">Case Studies</div>

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
          Real Businesses. Real Results.
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
            maxWidth: '600px',
          }}
        >
          Every project is a partnership. Here&apos;s what happens when businesses commit to 12 months of growth.
        </p>

        {/* Case Study Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '28px',
            marginBottom: '60px',
          }}
        >
          {projects.map((project) => (
            <div
              key={project.title}
              className="fu case-card"
              style={{
                background: 'var(--bg2)',
                border: '1px solid var(--border)',
                borderRadius: '2px',
                overflow: 'hidden',
                transition: 'border-color 0.2s ease, transform 0.2s ease, box-shadow 0.3s ease',
                position: 'relative',
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
                  {project.category}
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
                    marginBottom: '8px',
                    lineHeight: 1.3,
                  }}
                >
                  {project.title}
                </h3>

                <div
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: '16px',
                    fontWeight: 700,
                    color: 'var(--navy)',
                    marginBottom: '16px',
                  }}
                >
                  {project.result}
                </div>

                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: 1.6,
                    color: 'var(--dim)',
                    marginBottom: '28px',
                  }}
                >
                  {project.description}
                </p>
              </div>

              {/* Metrics Row */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${project.metrics.length}, 1fr)`,
                  borderTop: '1px solid var(--border)',
                  background: 'linear-gradient(180deg, rgba(30,61,143,0.04) 0%, transparent 100%)',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                {project.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    style={{
                      padding: '20px',
                      textAlign: 'center',
                      borderRight: '1px solid var(--border)',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: '24px',
                        fontWeight: 800,
                        color: 'var(--chrome)',
                        lineHeight: 1,
                        marginBottom: '6px',
                      }}
                    >
                      {metric.value}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: '9px',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'var(--dim)',
                      }}
                    >
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="fu" style={{ textAlign: 'center' }}>
          <a
            href="#contact"
            className="btn-chrome"
            style={{
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Get Results Like These →
          </a>
        </div>
      </div>
    </section>
  );
}
