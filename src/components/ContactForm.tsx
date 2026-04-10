'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      business: (form.elements.namedItem('business_name') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
        setErrorMsg(json.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    background: 'var(--card-bg)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    color: 'var(--text-primary)',
    fontSize: '0.95rem',
    fontFamily: "'Inter', sans-serif",
    boxSizing: 'border-box',
    outline: 'none',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.8rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--text-secondary)',
    marginBottom: '8px',
    fontFamily: "'Space Mono', monospace",
  };

  if (status === 'success') {
    return (
      <div style={{
        background: 'rgba(22,163,74,0.08)',
        border: '1px solid rgba(22,163,74,0.3)',
        borderRadius: '16px',
        padding: '48px 36px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>✓</div>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px' }}>
          Message Sent!
        </h3>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          We&apos;ll review your submission and get back to you within 1 business day with a custom plan.
        </p>
      </div>
    );
  }

  return (
    <div style={{
      background: 'var(--card-bg, rgba(255,255,255,0.04))',
      border: '1px solid var(--border-color, rgba(255,255,255,0.08))',
      borderRadius: '20px',
      padding: '40px 36px',
    }}>
      <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '28px', letterSpacing: '-0.01em' }}>
        Book Your Free Strategy Call
      </h2>

      {status === 'error' && (
        <div style={{
          background: 'rgba(220,38,38,0.08)',
          border: '1px solid rgba(220,38,38,0.3)',
          borderRadius: '8px',
          padding: '12px 16px',
          marginBottom: '20px',
          color: '#fca5a5',
          fontSize: '0.9rem',
        }}>
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label htmlFor="contact-name" style={labelStyle}>Name *</label>
          <input id="contact-name" type="text" name="name" required placeholder="Your full name" aria-label="Your full name" style={inputStyle} />
        </div>

        <div>
          <label htmlFor="contact-business" style={labelStyle}>Business Name *</label>
          <input id="contact-business" type="text" name="business_name" required placeholder="Your business name" aria-label="Your business name" style={inputStyle} />
        </div>

        <div>
          <label htmlFor="contact-phone" style={labelStyle}>Phone</label>
          <input id="contact-phone" type="tel" name="phone" placeholder="(313) 555-0100" aria-label="Your phone number" style={inputStyle} />
        </div>

        <div>
          <label htmlFor="contact-email" style={labelStyle}>Email *</label>
          <input id="contact-email" type="email" name="email" required placeholder="you@yourbusiness.com" aria-label="Your email address" style={inputStyle} />
        </div>

        <div>
          <label htmlFor="contact-message" style={labelStyle}>Tell Us About Your Business</label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            placeholder="What kind of business do you run? What are your biggest challenges right now?"
            aria-label="Tell us about your business"
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          style={{
            padding: '14px 32px',
            background: status === 'sending' ? 'rgba(0,118,182,0.5)' : 'var(--accent, #0076B6)',
            color: '#fff',
            border: 'none',
            borderRadius: '9px',
            fontWeight: 700,
            fontSize: '1rem',
            cursor: status === 'sending' ? 'not-allowed' : 'pointer',
            letterSpacing: '0.02em',
            marginTop: '4px',
            transition: 'background 0.2s',
          }}
        >
          {status === 'sending' ? 'Sending...' : 'Send Your Details →'}
        </button>
      </form>
    </div>
  );
}
