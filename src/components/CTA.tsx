'use client';

import { useState, useEffect } from 'react';

export default function CTA() {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    phone: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const canvas = document.getElementById('cta-canvas') as HTMLCanvasElement;
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitted(true);
      setFormData({
        name: '',
        businessName: '',
        phone: '',
        email: '',
        message: '',
      });

      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '120px 60px',
        background: 'var(--bg)',
        borderTop: '1px solid var(--border)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <canvas
        id="cta-canvas"
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
        {/* Gradient background behind form section */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(30,61,143,0.06) 0%, transparent 50%, rgba(30,61,143,0.03) 100%)',
            borderRadius: '8px',
            zIndex: -1,
          }}
        />

        {/* Section Eye Text */}
        <div className="sec-label fu" style={{ justifyContent: 'center' }}>
          Ready to Build?
        </div>

        {/* Heading */}
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(36px, 6vw, 72px)',
            fontWeight: 800,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            color: 'var(--silver)',
            marginBottom: '60px',
            textAlign: 'center',
          }}
        >
          <div className="fu">Let's Architect</div>
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
            Your Future.
          </div>
        </h2>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            marginBottom: '48px',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            <input
              className="fu"
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                background: 'transparent',
                borderBottom: '1px solid var(--border)',
                borderLeft: '2px solid transparent',
                color: 'var(--silver)',
                fontFamily: "'Inter', sans-serif",
                fontSize: '15px',
                padding: '12px 0 12px 12px',
                width: '100%',
                outline: 'none',
                transition: 'border-color 0.2s ease, padding-left 0.2s ease',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--navy)';
                e.currentTarget.style.borderLeftColor = 'var(--navy)';
                e.currentTarget.style.paddingLeft = '12px';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.borderLeftColor = 'transparent';
                e.currentTarget.style.paddingLeft = '0';
              }}
            />

            <input
              className="fu"
              type="text"
              name="businessName"
              placeholder="Business Name"
              value={formData.businessName}
              onChange={handleChange}
              required
              style={{
                background: 'transparent',
                borderBottom: '1px solid var(--border)',
                borderLeft: '2px solid transparent',
                color: 'var(--silver)',
                fontFamily: "'Inter', sans-serif",
                fontSize: '15px',
                padding: '12px 0 12px 12px',
                width: '100%',
                outline: 'none',
                transition: 'border-color 0.2s ease, padding-left 0.2s ease',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--navy)';
                e.currentTarget.style.borderLeftColor = 'var(--navy)';
                e.currentTarget.style.paddingLeft = '12px';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.borderLeftColor = 'transparent';
                e.currentTarget.style.paddingLeft = '0';
              }}
            />

            <input
              className="fu"
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              style={{
                background: 'transparent',
                borderBottom: '1px solid var(--border)',
                borderLeft: '2px solid transparent',
                color: 'var(--silver)',
                fontFamily: "'Inter', sans-serif",
                fontSize: '15px',
                padding: '12px 0 12px 12px',
                width: '100%',
                outline: 'none',
                transition: 'border-color 0.2s ease, padding-left 0.2s ease',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--navy)';
                e.currentTarget.style.borderLeftColor = 'var(--navy)';
                e.currentTarget.style.paddingLeft = '12px';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.borderLeftColor = 'transparent';
                e.currentTarget.style.paddingLeft = '0';
              }}
            />

            <input
              className="fu"
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                background: 'transparent',
                borderBottom: '1px solid var(--border)',
                borderLeft: '2px solid transparent',
                color: 'var(--silver)',
                fontFamily: "'Inter', sans-serif",
                fontSize: '15px',
                padding: '12px 0 12px 12px',
                width: '100%',
                outline: 'none',
                transition: 'border-color 0.2s ease, padding-left 0.2s ease',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--navy)';
                e.currentTarget.style.borderLeftColor = 'var(--navy)';
                e.currentTarget.style.paddingLeft = '12px';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.borderLeftColor = 'transparent';
                e.currentTarget.style.paddingLeft = '0';
              }}
            />
          </div>

          <textarea
            className="fu"
            name="message"
            placeholder="Tell us about your project..."
            value={formData.message}
            onChange={handleChange}
            rows={6}
            style={{
              background: 'transparent',
              borderBottom: '1px solid var(--border)',
              borderLeft: '2px solid transparent',
              color: 'var(--silver)',
              fontFamily: "'Inter', sans-serif",
              fontSize: '15px',
              padding: '12px 0 12px 12px',
              width: '100%',
              outline: 'none',
              transition: 'border-color 0.2s ease, padding-left 0.2s ease',
              resize: 'vertical',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--navy)';
              e.currentTarget.style.borderLeftColor = 'var(--navy)';
              e.currentTarget.style.paddingLeft = '12px';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.borderLeftColor = 'transparent';
              e.currentTarget.style.paddingLeft = '0';
            }}
          />

          {error && (
            <div
              style={{
                color: '#ff6b6b',
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                padding: '12px',
                background: 'rgba(255,107,107,0.1)',
                borderRadius: '2px',
              }}
            >
              {error}
            </div>
          )}

          {submitted && (
            <div
              style={{
                color: 'var(--chrome)',
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                padding: '12px',
                background: 'rgba(168,184,200,0.1)',
                borderRadius: '2px',
              }}
            >
              Thanks for reaching out! We'll get back to you soon.
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-chrome fu"
            style={{
              textDecoration: 'none',
              display: 'inline-block',
              opacity: loading ? 0.6 : 1,
              cursor: loading ? 'wait' : 'pointer',
              transition: 'box-shadow 0.3s ease, transform 0.15s ease-out',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(30,61,143,0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {loading ? 'Sending...' : 'Send Message →'}
          </button>
        </form>

        {/* Contact Info */}
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
          darrin@caliberwebstudio.com · Detroit, MI
        </div>
      </div>
    </section>
  );
}
