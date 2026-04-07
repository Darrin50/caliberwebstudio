'use client';

import { ScrollReveal } from './ScrollReveal';

const projects = [
  {
    name: 'Detroit Auto Glass',
    industry: 'Local Services',
    result: '+240% calls from Google',
    gradient: 'linear-gradient(135deg, #1e3a8a 0%, #0c1a4a 100%)',
    accentColor: '#3b82f6',
    featured: true,
  },
  {
    name: 'Motor City Barbershop',
    industry: 'Retail & Services',
    result: 'Booked 3 weeks out within 60 days',
    gradient: 'linear-gradient(135deg, #374151 0%, #111827 100%)',
    accentColor: '#9ca3af',
    featured: false,
  },
  {
    name: 'Eastside Logistics',
    industry: 'B2B',
    result: 'First page Google in 90 days',
    gradient: 'linear-gradient(135deg, #14532d 0%, #052e16 100%)',
    accentColor: '#4ade80',
    featured: false,
  },
  {
    name: 'Detroit Chiropractic',
    industry: 'Healthcare',
    result: '+180% new patient inquiries',
    gradient: 'linear-gradient(135deg, #4c1d95 0%, #1e0a3c 100%)',
    accentColor: '#a78bfa',
    featured: false,
    wide: true,
  },
];

function ProjectCard({
  project,
  tall = false,
  wide = false,
}: {
  project: (typeof projects)[0];
  tall?: boolean;
  wide?: boolean;
}) {
  return (
    <div
      className="project-card"
      style={{
        position: 'relative',
        borderRadius: '4px',
        overflow: 'hidden',
        background: project.gradient,
        border: '1px solid rgba(255,255,255,0.08)',
        minHeight: tall ? '420px' : wide ? '240px' : '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        cursor: 'pointer',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'scale(1.015)';
        (e.currentTarget as HTMLElement).style.boxShadow = `0 24px 60px rgba(0,0,0,0.5)`;
        const reveal = (e.currentTarget as HTMLElement).querySelector('[data-reveal]') as HTMLElement;
        if (reveal) reveal.style.opacity = '1';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
        const reveal = (e.currentTarget as HTMLElement).querySelector('[data-reveal]') as HTMLElement;
        if (reveal) reveal.style.opacity = '0';
      }}
    >
      {/* Background texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 20% 20%, rgba(255,255,255,0.06) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      {/* Grid lines decoration */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }}
      />

      {/* Content gradient overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '65%',
          background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Industry tag — top left */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          fontFamily: "'Space Mono', monospace",
          fontSize: '9px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: project.accentColor,
          padding: '4px 10px',
          background: 'rgba(0,0,0,0.4)',
          border: `1px solid ${project.accentColor}33`,
          borderRadius: '2px',
          backdropFilter: 'blur(4px)',
        }}
      >
        {project.industry}
      </div>

      {/* Card body */}
      <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(20px, 3vw, 28px)' }}>
        <h3
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: tall ? 'clamp(26px, 3vw, 36px)' : 'clamp(20px, 2.2vw, 26px)',
            fontWeight: 800,
            color: '#fff',
            marginBottom: '8px',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {project.name}
        </h3>

        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '11px',
            color: project.accentColor,
            letterSpacing: '0.06em',
            fontWeight: 700,
            marginBottom: '16px',
          }}
        >
          {project.result}
        </div>

        {/* Hover reveal link */}
        <div
          data-reveal
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '11px',
            color: '#fff',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            opacity: 0,
            transition: 'opacity 0.25s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          View Project →
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  const [featured, small1, small2, wide] = projects;

  return (
    <section
      id="work"
      style={{
        position: 'relative',
        padding: 'clamp(80px, 10vw, 140px) clamp(20px, 6vw, 60px)',
        background: 'var(--bg)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: 'var(--content-max-wide)', margin: '0 auto' }}>
        <ScrollReveal>
          <div className="sec-label">Our Work</div>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(36px, 5vw, 60px)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
              color: '#fff',
              marginBottom: '20px',
              maxWidth: '680px',
            }}
          >
            Our Work Speaks for Itself
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={140}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '17px',
              lineHeight: 1.7,
              color: 'var(--chrome)',
              marginBottom: 'clamp(40px, 5vw, 64px)',
              maxWidth: '520px',
            }}
          >
            Real businesses. Real results. Every project is built to rank, convert, and grow — not just look good.
          </p>
        </ScrollReveal>

        {/* Asymmetric layout */}
        <ScrollReveal delay={180}>
          <div className="work-asymmetric">
            {/* Top row: large left + two stacked right */}
            <div className="work-top-row">
              <ProjectCard project={featured} tall />
              <div className="work-stack">
                <ProjectCard project={small1} />
                <ProjectCard project={small2} />
              </div>
            </div>

            {/* Bottom: full-width card */}
            <ProjectCard project={wide} wide />
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        .work-asymmetric {
          display: flex;
          flex-direction: column;
          gap: clamp(12px, 1.5vw, 20px);
        }
        .work-top-row {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: clamp(12px, 1.5vw, 20px);
        }
        .work-stack {
          display: flex;
          flex-direction: column;
          gap: clamp(12px, 1.5vw, 20px);
        }
        @media (max-width: 720px) {
          .work-top-row {
            grid-template-columns: 1fr;
          }
          .work-stack { flex-direction: column; }
        }
      `}</style>
    </section>
  );
}
