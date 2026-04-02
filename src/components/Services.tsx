'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ScrollReveal } from './ScrollReveal';

const icons: Record<string, React.ReactNode> = {
  website: (
    <svg width="20" height="20" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="6" width="32" height="24" rx="2" />
      <line x1="4" y1="14" x2="36" y2="14" />
      <circle cx="9" cy="10" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="14" cy="10" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="19" cy="10" r="1.5" fill="currentColor" stroke="none" />
      <path d="M10 20 L16 24 L30 18" strokeWidth="1.6" />
    </svg>
  ),
  chatbot: (
    <svg width="20" height="20" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="4" width="28" height="22" rx="3" />
      <path d="M14 30 L20 26 L26 30" />
      <circle cx="14" cy="14" r="2" />
      <circle cx="26" cy="14" r="2" />
      <path d="M16 20 Q20 23 24 20" />
    </svg>
  ),
  gbp: (
    <svg width="20" height="20" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 4 C14 4 8 10 8 18 C8 28 20 36 20 36 C20 36 32 28 32 18 C32 10 26 4 20 4Z" />
      <circle cx="20" cy="17" r="5" />
      <circle cx="20" cy="17" r="2" fill="currentColor" stroke="none" />
    </svg>
  ),
  reviews: (
    <svg width="20" height="20" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 4 L24.5 13.5 L35 15 L27.5 22 L29.5 32.5 L20 27.5 L10.5 32.5 L12.5 22 L5 15 L15.5 13.5 Z" />
    </svg>
  ),
  social: (
    <svg width="20" height="20" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="6" width="28" height="28" rx="6" />
      <circle cx="20" cy="20" r="7" />
      <circle cx="20" cy="20" r="3" />
      <circle cx="30" cy="10" r="2" fill="currentColor" stroke="none" />
    </svg>
  ),
  dashboard: (
    <svg width="20" height="20" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="14" height="14" rx="2" />
      <rect x="22" y="4" width="14" height="8" rx="2" />
      <rect x="4" y="22" width="14" height="14" rx="2" />
      <rect x="22" y="16" width="14" height="20" rx="2" />
    </svg>
  ),
};

const services = [
  {
    icon: 'website',
    title: 'AI-Powered Website',
    description: 'Custom-built, blazing-fast sites with built-in AI features that work 24/7',
    tag: 'Core',
    href: '/contact',
    color: '#1E3D8F',
    bg: 'rgba(30,61,143,0.12)',
  },
  {
    icon: 'chatbot',
    title: 'AI Chatbot',
    description: 'Intelligent chat that qualifies leads, books appointments, and answers questions automatically',
    tag: 'AI',
    href: '/services/ai-chatbot',
    color: '#0891b2',
    bg: 'rgba(8,145,178,0.12)',
  },
  {
    icon: 'gbp',
    title: 'Google Business Profile',
    description: 'Optimized GBP with schema markup so you dominate local search results',
    tag: 'SEO',
    href: '/contact',
    color: '#16a34a',
    bg: 'rgba(22,163,74,0.12)',
  },
  {
    icon: 'reviews',
    title: 'Review Engine',
    description: 'Automated review requests that build your reputation on autopilot',
    tag: 'Growth',
    href: '/services/review-automation',
    color: '#d97706',
    bg: 'rgba(217,119,6,0.12)',
  },
  {
    icon: 'social',
    title: 'Social Content',
    description: 'AI-generated posts, graphics, and captions — scheduled and posted for you',
    tag: 'Content',
    href: '/contact',
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.12)',
  },
  {
    icon: 'dashboard',
    title: 'Client Dashboard',
    description: 'Real-time analytics showing rankings, traffic, leads, and ROI in one place',
    tag: 'Insights',
    href: '/contact',
    color: '#0d9488',
    bg: 'rgba(13,148,136,0.12)',
  },
];

function ServiceRow({ service, index }: { service: typeof services[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const num = String(index + 1).padStart(2, '0');

  return (
    <Link
      href={service.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '64px 1fr auto',
        alignItems: 'center',
        gap: 'clamp(16px, 2.5vw, 32px)',
        padding: 'clamp(20px, 2.5vw, 28px) clamp(16px, 2.5vw, 28px)',
        textDecoration: 'none',
        borderRadius: '16px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.22s ease',
        background: hovered ? 'var(--bg2)' : 'transparent',
        cursor: 'pointer',
      }}
    >
      {/* Hover sweep tinted with service color */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(90deg, ${service.bg} 0%, transparent 55%)`,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.28s ease',
        pointerEvents: 'none',
        borderRadius: '16px',
      }} />

      {/* Left accent bar */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: '18%',
        bottom: '18%',
        width: '3px',
        borderRadius: '3px',
        background: service.color,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.22s ease',
      }} />

      {/* Icon block */}
      <div style={{
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
      }}>
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '10px',
          letterSpacing: '0.06em',
          color: hovered ? service.color : 'var(--dim)',
          lineHeight: 1,
          transition: 'color 0.22s ease',
        }}>{num}</span>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: hovered ? service.bg : 'rgba(0,0,0,0.03)',
          border: `1px solid ${hovered ? service.color + '40' : 'var(--border)'}`,
          color: hovered ? service.color : 'var(--chrome)',
          transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: hovered ? 'scale(1.12)' : 'scale(1)',
          boxShadow: hovered ? `0 4px 14px ${service.color}25` : 'none',
        }}>
          {icons[service.icon]}
        </div>
      </div>

      {/* Text */}
      <div style={{ zIndex: 1, minWidth: 0 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '5px',
          flexWrap: 'wrap',
        }}>
          <h3 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(15px, 1.8vw, 18px)',
            fontWeight: 700,
            color: hovered ? service.color : 'var(--silver)',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            margin: 0,
            transition: 'color 0.22s ease',
          }}>
            {service.title}
          </h3>
          <span style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '9px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: hovered ? service.color : 'var(--dim)',
            background: hovered ? service.bg : 'transparent',
            border: `1px solid ${hovered ? service.color + '50' : 'var(--border)'}`,
            borderRadius: '100px',
            padding: '3px 9px',
            transition: 'all 0.22s ease',
          }}>
            {service.tag}
          </span>
        </div>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '14px',
          lineHeight: 1.65,
          color: 'var(--dim)',
          margin: 0,
        }}>
          {service.description}
        </p>
      </div>

      {/* Arrow — slides in from right on hover */}
      <div style={{
        zIndex: 1,
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        border: `1px solid ${hovered ? service.color + '60' : 'var(--border)'}`,
        background: hovered ? service.bg : 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: hovered ? service.color : 'var(--dim)',
        fontSize: '15px',
        flexShrink: 0,
        transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: hovered ? 'translateX(4px) scale(1.08)' : 'translateX(-4px) scale(0.92)',
        opacity: hovered ? 1 : 0.4,
        boxShadow: hovered ? `0 0 16px ${service.color}30` : 'none',
      }}>
        →
      </div>
    </Link>
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
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(36px, 5vw, 60px)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
            color: 'var(--silver)',
            marginBottom: 'clamp(40px, 5vw, 64px)',
            maxWidth: '780px',
          }}>
            Every Tool You Need to Dominate Your Market
          </h2>
        </ScrollReveal>

        <div style={{ borderTop: '1px solid var(--border)', marginBottom: '4px' }} />

        <div>
          {services.map((service, i) => (
            <React.Fragment key={service.title}>
              <ScrollReveal delay={i * 55}>
                <ServiceRow service={service} index={i} />
              </ScrollReveal>
              {i < services.length - 1 && (
                <div style={{
                  borderTop: '1px solid var(--border)',
                  margin: '0 clamp(16px, 2.5vw, 28px)',
                }} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div style={{ borderTop: '1px solid var(--border)', marginTop: '4px' }} />
      </div>
    </section>
  );
}
