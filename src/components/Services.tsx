'use client';

import React from 'react';
import { ScrollReveal, ScrollRevealGroup } from './ScrollReveal';

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
    </svg>
  ),
};

const services = [
  { icon: 'website', title: 'AI-Powered Website', description: 'Custom-built, blazing-fast sites with built-in AI features that work 24/7' },
  { icon: 'chatbot', title: 'AI Chatbot', description: 'Intelligent chat that qualifies leads, books appointments, and answers questions automatically' },
  { icon: 'gbp', title: 'Google Business Profile', description: 'Optimized GBP with schema markup so you dominate local search results' },
  { icon: 'reviews', title: 'Review Engine', description: 'Automated review requests that build your reputation on autopilot' },
  { icon: 'social', title: 'Social Content', description: 'AI-generated posts, graphics, and captions scheduled and posted for you' },
  { icon: 'dashboard', title: 'Client Dashboard', description: 'Real-time analytics showing rankings, traffic, leads, and ROI in one place' },
];

export default function Services() {
  return (
    <section
      id="services"
      style={{
        position: 'relative',
        padding: 'var(--section-pad-lg) clamp(20px, 6vw, 60px)',
        background: 'var(--bg2)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {/* Shimmer divider at top */}
      <div className="section-divider" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />

      <div style={{ maxWidth: 'var(--content-max-wide)', margin: '0 auto' }}>
        <ScrollReveal>
          <div className="sec-label">What We Build</div>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(36px, 5vw, 60px)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
              color: 'var(--silver)',
              marginBottom: 'clamp(48px, 6vw, 80px)',
              maxWidth: '780px',
            }}
          >
            Every Tool You Need to Dominate Your Market
          </h2>
        </ScrollReveal>

        <ScrollRevealGroup className="services-grid" stagger={80}>
          {services.map((service) => (
            <div
              key={service.title}
              className="svc-card tilt-card"
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                padding: 'clamp(28px, 4vw, 40px)',
                borderRadius: '2px',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'var(--navy)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'var(--border)';
              }}
            >
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
                  marginBottom: '12px',
                }}
              >
                {service.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '15px',
                  lineHeight: 1.7,
                  color: 'var(--dim)',
                  maxWidth: '100%',
                }}
              >
                {service.description}
              </p>
            </div>
          ))}
        </ScrollRevealGroup>
      </div>

      <style>{`
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(16px, 2vw, 24px);
        }
        @media (max-width: 900px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .services-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
