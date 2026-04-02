'use client';

import React, { useState } from 'react';
import { ScrollReveal } from './ScrollReveal';

const icons: Record<string, React.ReactNode> = {
  website: (
    <svg width="22" height="22" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
    <svg width="22" height="22" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="4" width="28" height="22" rx="3" />
      <path d="M14 30 L20 26 L26 30" />
      <circle cx="14" cy="14" r="2" />
      <circle cx="26" cy="14" r="2" />
      <path d="M16 20 Q20 23 24 20" />
    </svg>
  ),
  gbp: (
    <svg width="22" height="22" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 4 C14 4 8 10 8 18 C8 28 20 36 20 36 C20 36 32 28 32 18 C32 10 26 4 20 4Z" />
      <circle cx="20" cy="17" r="5" />
      <circle cx="20" cy="17" r="2" fill="currentColor" stroke="none" />
    </svg>
  ),
  reviews: (
    <svg width="22" height="22" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 4 L24.5 13.5 L35 15 L27.5 22 L29.5 32.5 L20 27.5 L10.5 32.5 L12.5 22 L5 15 L15.5 13.5 Z" />
    </svg>
  ),
  social: (
    <svg width="22" height="22" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="6" width="28" height="28" rx="6" />
      <circle cx="20" cy="20" r="7" />
      <circle cx="20" cy="20" r="3" />
      <circle cx="30" cy="10" r="2" fill="currentColor" stroke="none" />
    </svg>
  ),
  dashboard: (
    <svg width="22" height="22" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="14" height="14" rx="2" />
      <rect x="22" y="4" width="14" height="8" rx="2" />
      <rect x="4" y="22" width="14" height="14" rx="2" />
      <rect x="22" y="16" width="14" height="20" rx="2" />
    </svg>
  ),
};

const services = [
  { icon: 'website', title: 'AI-Powered Website',      description: 'Custom-built, blazing-fast sites with built-in AI features that work 24/7',                              tag: 'Core' },
  { icon: 'chatbot', title: 'AI Chatbot',               description: 'Intelligent chat that qualifies leads, books appointments, and answers questions automatically',          tag: 'AI' },
  { icon: 'gbp',     title: 'Google Business Profile',  description: 'Optimized GBP with schema markup so you dominate local search results',                                  tag: 'SEO' },
  { icon: 'reviews', title: 'Review Engine',            description: 'Automated review requests that build your reputation on autopilot',                                      tag: 'Growth' },
  { icon: 'social',  title: 'Social Content',           description: 'AI-generated posts, graphics, and captions — scheduled and posted for you',                             tag: 'Content' },
  { icon: 'dashboard', title: 'Client Dashboard',       description: 'Real-time analytics showing rankings, traffic, leads, and ROI in one place',                            tag: 'Insights' },
];

function ServiceRow({ service, index }: { service: typeof services[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const num = String(index + 1).padStart(2, '0');

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '48px 1fr auto',
        alignItems: 'center',
        gap: 'clamp(20px, 3vw, 40px)',
        padding: 'clamp(24px, 3vw, 32px) clamp(20px, 3vw, 36px)',
        cursor: 'default',
        transition: 'background 0.25s ease',
        borderRadius: '16px',
        overflow: 'hidden',
        background: hovered ? 'var(--bg2)' : 'transparent',
      }}
    >
      {/* Animated left sweep */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(90deg, rgba(30,61,143,0.07) 0%, transparent 60%)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
        borderRadius: '16px',
        pointerEvents: 'none',
      }} />

      {/* Left accent line */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: '20%',
        bottom: '20%',
        width: '2px',
        borderRadius: '2px',
        background: 'linear-gradient(180deg, var(--navy), var(--chrome))',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.25s ease',
      }} />

      {/* Number + Icon stacked */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 1 }}>
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '10px',
          letterSpacing: '0.08em',
          color: hovered ? 'var(--navy)' : 'var(--dim)',
          transition: 'color 0.25s ease',
          lineHeight: 1,
        }}>{num}</span>
        <span style={{
          color: hovered ? 'var(--navy)' : 'var(--chrome)',
          transition: 'color 0.25s ease',
          display: 'flex',
        }}>
          {icons[service.icon]}
        </span>
      </div>

      {/* Title + description */}
      <div style={{ zIndex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px', flexWrap: 'wrap' }}>
          <h3 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(16px, 2vw, 19px)',
            fontWeight: 700,
            color: 'var(--silver)',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            margin: 0,
          }}>
            {service.title}
          </h3>
          <span style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '9px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: hovered ? 'var(--navy)' : 'var(--dim)',
            border: `1px solid ${hovered ? 'rgba(30,61,143,0.4)' : 'var(--border)'}`,
            borderRadius: '100px',
            padding: '3px 9px',
            transition: 'all 0.25s ease',
          }}>
            {service.tag}
          </span>
        </div>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '14px',
          lineHeight: 1.7,
          color: 'var(--dim)',
          margin: 0,
          maxWidth: '520px',
        }}>
          {service.description}
        </p>
      </div>

      {/* Arrow */}
      <div style={{
        zIndex: 1,
        color: hovered ? 'var(--navy)' : 'var(--dim)',
        fontSize: '18px',
        transition: 'transform 0.25s ease, color 0.25s ease',
        transform: hovered ? 'translateX(4px)' : 'translateX(0)',
        flexShrink: 0,
      }}>
        →
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      style={{
        position: 'relative',
        padding: 'var(--section-pad-lg) clamp(20px, 6vw, 60px)',
        background: 'var(--bg)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
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
              marginBottom: 'clamp(40px, 5vw, 64px)',
              maxWidth: '780px',
            }}
          >
            Every Tool You Need to Dominate Your Market
          </h2>
        </ScrollReveal>

        {/* Divider above list */}
        <div style={{ borderTop: '1px solid var(--border)', marginBottom: '4px' }} />

        {/* Service rows */}
        <div>
          {services.map((service, i) => (
            <React.Fragment key={service.title}>
              <ScrollReveal delay={i * 60}>
                <ServiceRow service={service} index={i} />
              </ScrollReveal>
              {i < services.length - 1 && (
                <div style={{ borderTop: '1px solid var(--border)', margin: '0 clamp(20px, 3vw, 36px)' }} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Divider below list */}
        <div style={{ borderTop: '1px solid var(--border)', marginTop: '4px' }} />
      </div>
    </section>
  );
}
