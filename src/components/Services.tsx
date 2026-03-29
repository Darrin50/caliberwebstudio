'use client';

import React from 'react';

/* Premium SVG icons — clean line art matching the design system */
const icons: Record<string, React.ReactNode> = {
  website: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="6" width="32" height="24" rx="2" />
      <line x1="4" y1="14" x2="36" y2="14" />
      <circle cx="9" cy="10" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="14" cy="10" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="19" cy="10" r="1.5" fill="currentColor" stroke="none" />
      <line x1="14" y1="34" x2="26" y2="34" />
      <line x1="20" y1="30" x2="20" y2="34" />
      <path d="M10 20 L16 24 L30 18" strokeWidth="1.5" />
    </svg>
  ),
  chatbot: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="4" width="28" height="22" rx="3" />
      <path d="M14 30 L20 26 L26 30" />
      <circle cx="14" cy="14" r="2" />
      <circle cx="26" cy="14" r="2" />
      <path d="M16 20 Q20 23 24 20" />
      <line x1="32" y1="10" x2="36" y2="8" strokeWidth="1" opacity="0.5" />
      <line x1="32" y1="14" x2="37" y2="14" strokeWidth="1" opacity="0.5" />
      <line x1="32" y1="18" x2="36" y2="20" strokeWidth="1" opacity="0.5" />
    </svg>
  ),
  gbp: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 4 C14 4 8 10 8 18 C8 28 20 36 20 36 C20 36 32 28 32 18 C32 10 26 4 20 4Z" />
      <circle cx="20" cy="17" r="5" />
      <circle cx="20" cy="17" r="2" fill="currentColor" stroke="none" />
    </svg>
  ),
  reviews: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 4 L24.5 13.5 L35 15 L27.5 22 L29.5 32.5 L20 27.5 L10.5 32.5 L12.5 22 L5 15 L15.5 13.5 Z" />
      <path d="M20 10 L22.5 15.5 L28.5 16.5 L24 20.5 L25 26.5 L20 23.5 L15 26.5 L16 20.5 L11.5 16.5 L17.5 15.5 Z" fill="currentColor" stroke="none" opacity="0.15" />
    </svg>
  ),
  social: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="6" width="28" height="28" rx="6" />
      <circle cx="20" cy="20" r="7" />
      <circle cx="20" cy="20" r="3" />
      <circle cx="30" cy="10" r="2" fill="currentColor" stroke="none" />
    </svg>
  ),
  dashboard: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="14" height="14" rx="2" />
      <rect x="22" y="4" width="14" height="8" rx="2" />
      <rect x="4" y="22" width="14" height="14" rx="2" />
      <rect x="22" y="16" width="14" height="20" rx="2" />
      <line x1="8" y1="10" x2="14" y2="10" opacity="0.4" />
      <line x1="8" y1="28" x2="14" y2="28" opacity="0.4" />
      <path d="M26 28 L30 24 L34 30" opacity="0.4" />
    </svg>
  ),
};

export default function Services() {
  const services = [
    {
      icon: 'website',
      title: 'AI-Powered Website',
      description: 'Custom-built, blazing-fast sites with built-in AI features that work 24/7',
    },
    {
      icon: 'chatbot',
      title: 'AI Chatbot',
      description: 'Intelligent chat that qualifies leads, books appointments, and answers questions automatically',
    },
    {
      icon: 'gbp',
      title: 'Google Business Profile',
      description: 'Optimized GBP with schema markup so you dominate local search results',
    },
    {
      icon: 'reviews',
      title: 'Review Engine',
      description: 'Automated review requests that build your reputation on autopilot',
    },
    {
      icon: 'social',
      title: 'Social Content',
      description: 'AI-generated posts, graphics, and captions scheduled and posted for you',
    },
    {
      icon: 'dashboard',
      title: 'Client Dashboard',
      description: 'Real-time analytics showing rankings, traffic, leads, and ROI in one place',
    },
  ];

  return (
    <section
      id="services"
      style={{
        position: 'relative',
        padding: '80px 60px',
        background: 'var(--bg)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div className="sec-label fu">What We Build</div>

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

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
          }}
        >
          {services.map((service) => (
            <div
              key={service.title}
              className="svc-card fu"
              style={{
                background: 'var(--bg2)',
                border: '1px solid var(--border)',
                padding: '36px 32px',
                borderRadius: '2px',
                transition: 'border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'var(--navy)';
                el.style.transform = 'translateY(-6px)';
                el.style.boxShadow = '0 12px 40px rgba(30,61,143,0.12)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'var(--border)';
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'none';
              }}
            >
              {/* Premium SVG Icon */}
              <div
                style={{
                  color: 'var(--navy)',
                  marginBottom: '24px',
                  width: '56px',
                  height: '56px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  background: 'rgba(30,61,143,0.06)',
                }}
              >
                {icons[service.icon]}
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
