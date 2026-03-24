'use client';

import { useEffect } from 'react';

export default function Hero() {
  useEffect(() => {
    const canvas = document.getElementById('hero-canvas') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationId: number;
    const animate = () => {
      ctx.fillStyle = 'transparent';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      animationId = requestAnimationFrame(animate);
    };
    animate();

    // Fade-up animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('on');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fu').forEach((el) => observer.observe(el));

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '120px 60px 80px',
        background: 'var(--bg)',
        textAlign: 'center',
      }}
    >
      <canvas
        id="hero-canvas"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px', width: '100%' }}>
        {/* Hero Label */}
        <div className="sec-label fu" style={{ justifyContent: 'center' }}>
          Detroit's Premier AI Web Agency
        </div>

        {/* Main Heading */}
        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(48px, 8vw, 96px)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: 'var(--silver)',
            margin: '32px 0 0',
          }}
        >
          <div className="fu">Architects of</div>
          <div
            className="fu"
            style={{
              background: 'linear-gradient(90deg, var(--chrome), #fff, var(--chrome))',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shine 3s linear infinite',
            }}
          >
            the Modern Web.
          </div>
        </h1>

        {/* Subtitle */}
        <p
          className="fu"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '18px',
            fontWeight: 400,
            lineHeight: 1.6,
            color: 'var(--dim)',
            margin: '36px 0 48px',
            maxWidth: '700px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          We build high-performance websites that rank, convert, and grow your business. $0 to start. No contracts.
        </p>

        {/* CTA Buttons */}
        <div
          className="fu"
          style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            margin: '48px 0',
          }}
        >
          <a
            href="#contact"
            className="btn-chrome"
            style={{
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Book a Free Audit
          </a>
          <a
            href="#work"
            className="btn-line"
            style={{
              textDecoration: 'none',
              display: 'inline-flex',
            }}
          >
            See Our Work
          </a>
        </div>

        {/* Stats Row */}
        <div
          className="fu"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            marginTop: '80px',
            paddingTop: '80px',
            borderTop: '1px solid var(--border)',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          {[
            { metric: '500+', label: 'Businesses Served' },
            { metric: '97%', label: 'Client Retention' },
            { metric: '$0', label: 'Down to Start' },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '36px',
                  fontWeight: 800,
                  color: 'var(--chrome)',
                  marginBottom: '8px',
                }}
              >
                {stat.metric}
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  fontWeight: 400,
                  color: 'var(--dim)',
                  letterSpacing: '0.04em',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
