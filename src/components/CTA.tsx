'use client';

import { useState } from 'react';
import { ScrollReveal } from './ScrollReveal';

export default function CTA() {
  const [formData, setFormData] = useState({ name: '', businessName: '', phone: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to send message');
      setSubmitted(true);
      setFormData({ name: '', businessName: '', phone: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    background: 'transparent',
    borderBottom: '1px solid var(--border)',
    borderLeft: '2px solid transparent',
    color: 'var(--silver)',
    fontFamily: "'Inter', sans-serif",
    fontSize: '16px',
    padding: '14px 0 14px 12px',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.2s ease, padding-left 0.2s ease',
    borderTop: 'none',
    borderRight: 'none',
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderLeftColor = 'var(--navy)';
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderLeftColor = 'transparent';
  };

  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: 'var(--section-pad-lg) clamp(20px, 6vw, 60px)',
        background: 'var(--bg2)',
        borderTop: '1px solid var(--border)',
      }}
    >
      {/* Radial ambient glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(30,61,143,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <ScrollReveal>
          <div className="sec-label" style={{ justifyContent: 'center' }}>Ready to Build?</div>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            marginBottom: 'clamp(40px, 5vw, 64px)',
            textAlign: 'center',
            maxWidth: '100%',
          }}>
            <span style={{ display: 'block' }}>Let's Architect</span>
            <span style={{
              display: 'block',
              background: 'linear-gradient(90deg, var(--chrome), #fff, var(--chrome))',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shine 3s linear infinite',
            }}>
              Your Future.
            </span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={160}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '28px', marginBottom: '40px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
              <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} onFocus={onFocus} onBlur={onBlur} required style={inputStyle} />
              <input type="text" name="businessName" placeholder="Business Name" value={formData.businessName} onChange={handleChange} onFocus={onFocus} onBlur={onBlur} required style={inputStyle} />
              <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} onFocus={onFocus} onBlur={onBlur} style={inputStyle} />
              <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} onFocus={onFocus} onBlur={onBlur} required style={inputStyle} />
            </div>
            <textarea
              name="message" placeholder="Tell us about your project..."
              value={formData.message} onChange={handleChange} onFocus={onFocus} onBlur={onBlur}
              rows={5}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
            {error && (
              <div style={{ color: '#ff6b6b', fontSize: '14px', padding: '12px', background: 'rgba(255,107,107,0.1)', borderRadius: '2px' }}>
                {error}
              </div>
            )}
            {submitted && (
              <div style={{ color: 'var(--chrome)', fontSize: '14px', padding: '12px', background: 'rgba(168,184,200,0.1)', borderRadius: '2px' }}>
                Thanks for reaching out! We'll get back to you soon.
              </div>
            )}
            <button
              type="submit" disabled={loading}
              className="btn-chrome"
              style={{ opacity: loading ? 0.6 : 1, cursor: loading ? 'wait' : 'pointer' }}
            >
              {loading ? 'Sending...' : 'Send Message →'}
            </button>
          </form>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div style={{
            textAlign: 'center',
            fontFamily: "'Space Mono', monospace",
            fontSize: '11px', color: 'var(--dim)', letterSpacing: '0.05em',
          }}>
            darrin@caliberwebstudio.com · Detroit, MI
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
