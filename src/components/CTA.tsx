'use client';

import { useState } from 'react';
import { ScrollReveal } from './ScrollReveal';

export default function CTA() {
  const [formData, setFormData] = useState({ name: '', businessName: '', phone: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [focused, setFocused] = useState<string | null>(null);

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

  const Field = ({
    label, name, type = 'text', placeholder, required, textarea,
  }: {
    label: string; name: keyof typeof formData; type?: string;
    placeholder: string; required?: boolean; textarea?: boolean;
  }) => {
    const isFocused = focused === name;
    const hasValue = !!formData[name];

    const fieldStyle: React.CSSProperties = {
      width: '100%',
      padding: '14px 16px',
      background: isFocused
        ? 'rgba(30,61,143,0.04)'
        : 'var(--field-bg, rgba(0,0,0,0.025))',
      border: `1px solid ${isFocused ? 'rgba(30,61,143,0.5)' : 'var(--border)'}`,
      borderRadius: '12px',
      color: 'var(--silver)',
      fontFamily: "'Inter', sans-serif",
      fontSize: '15px',
      outline: 'none',
      boxSizing: 'border-box' as const,
      boxShadow: isFocused ? '0 0 0 3px rgba(30,61,143,0.1)' : 'none',
      transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
      resize: textarea ? 'vertical' : undefined,
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
        <label style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '10px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: isFocused ? 'var(--navy)' : 'var(--dim)',
          transition: 'color 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}>
          {label}
          {required && <span style={{ color: 'var(--navy)', marginLeft: '2px' }}>*</span>}
          {hasValue && !isFocused && (
            <span style={{ color: 'var(--navy)', fontSize: '11px', marginLeft: '4px' }}>✓</span>
          )}
        </label>
        {textarea ? (
          <textarea
            name={name} placeholder={placeholder}
            value={formData[name]} onChange={handleChange} rows={5}
            onFocus={() => setFocused(name)}
            onBlur={() => setFocused(null)}
            style={fieldStyle}
          />
        ) : (
          <input
            type={type} name={name} placeholder={placeholder}
            value={formData[name]} onChange={handleChange} required={required}
            onFocus={() => setFocused(name)}
            onBlur={() => setFocused(null)}
            style={fieldStyle}
          />
        )}
      </div>
    );
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
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(30,61,143,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '720px', margin: '0 auto', width: '100%' }}>

        {/* Header */}
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
            color: 'var(--silver)',
            marginBottom: 'clamp(40px, 5vw, 56px)',
            textAlign: 'center',
          }}>
            <span style={{ display: 'block' }}>Let&apos;s Architect</span>
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

        {/* Form card */}
        <ScrollReveal delay={160}>
          <div style={{
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: '24px',
            padding: 'clamp(32px, 5vw, 52px)',
            boxShadow: '0 2px 40px rgba(0,0,0,0.06)',
          }}>
            {submitted ? (
              <div style={{
                textAlign: 'center',
                padding: '48px 24px',
              }}>
                <div style={{ fontSize: '40px', marginBottom: '20px' }}>✓</div>
                <h3 style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '22px',
                  fontWeight: 800,
                  color: 'var(--silver)',
                  marginBottom: '12px',
                }}>Message Sent</h3>
                <p style={{ color: 'var(--dim)', fontSize: '15px', lineHeight: 1.7 }}>
                  We'll review your submission and get back to you within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Row 1 */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="cta-2col">
                  <Field label="Your Name" name="name" placeholder="John Smith" required />
                  <Field label="Business Name" name="businessName" placeholder="Smith Plumbing" required />
                </div>

                {/* Row 2 */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="cta-2col">
                  <Field label="Phone Number" name="phone" type="tel" placeholder="(313) 555-0100" />
                  <Field label="Email Address" name="email" type="email" placeholder="you@business.com" required />
                </div>

                {/* Message */}
                <Field
                  label="Tell us about your project"
                  name="message"
                  placeholder="What kind of business do you run? What's your biggest challenge right now?"
                  textarea
                />

                {error && (
                  <div style={{
                    color: '#ff6b6b', fontSize: '13px', padding: '12px 16px',
                    background: 'rgba(255,107,107,0.08)', borderRadius: '10px',
                    border: '1px solid rgba(255,107,107,0.2)',
                  }}>
                    {error}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '16px 24px',
                    background: loading
                      ? 'var(--navy2)'
                      : 'linear-gradient(135deg, var(--navy) 0%, var(--navy2) 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    cursor: loading ? 'wait' : 'pointer',
                    opacity: loading ? 0.7 : 1,
                    transition: 'opacity 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease',
                    boxShadow: '0 4px 20px rgba(30,61,143,0.35)',
                    marginTop: '4px',
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(30,61,143,0.45)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(30,61,143,0.35)';
                  }}
                >
                  {loading ? 'Sending...' : 'Send Message →'}
                </button>

                <p style={{
                  textAlign: 'center',
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '10px',
                  color: 'var(--dim)',
                  letterSpacing: '0.05em',
                  marginTop: '4px',
                }}>
                  $0 down · No contracts · Response within 1 business day
                </p>
              </form>
            )}
          </div>
        </ScrollReveal>

        {/* Footer note */}
        <ScrollReveal delay={220}>
          <div style={{
            textAlign: 'center',
            fontFamily: "'Space Mono', monospace",
            fontSize: '11px', color: 'var(--dim)',
            letterSpacing: '0.05em',
            marginTop: '32px',
          }}>
            darrin@caliberwebstudio.com · Detroit, MI
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        input::placeholder, textarea::placeholder { color: var(--dim); opacity: 0.6; }
        [data-theme="light"] .cta-2col { }
        @media (max-width: 600px) {
          .cta-2col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
