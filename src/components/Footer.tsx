'use client';

import Image from 'next/image';
import Link from 'next/link';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const legalLinks = [
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--bg)',
        borderTop: '1px solid var(--border)',
        position: 'relative',
      }}
    >
      {/* Top gradient line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--navy), transparent)',
          opacity: 0.6,
        }}
      />

      {/* Main footer grid */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'clamp(48px, 8vw, 80px) clamp(20px, 6vw, 60px) 40px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '48px',
        }}
      >
        {/* Brand column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', gridColumn: 'span 1' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <Image
              src="/logo-mark-nav.png"
              alt="Caliber Web Studio"
              width={32}
              height={32}
              style={{ objectFit: 'contain' }}
            />
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '13px',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--silver)',
              }}
            >
              Caliber Web Studio
            </span>
          </Link>

          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px',
              color: 'var(--dim)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              lineHeight: 1.8,
            }}
          >
            Measure. Design. Rise.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <a
              href="mailto:darrin@caliberwebstudio.com"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '10px',
                color: 'var(--dim)',
                letterSpacing: '0.04em',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--silver)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--dim)')}
            >
              darrin@caliberwebstudio.com
            </a>
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '10px',
                color: 'var(--dim)',
                letterSpacing: '0.04em',
              }}
            >
              Detroit, MI
            </span>
            <a
              href="tel:+13139438052"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '10px',
                color: 'var(--dim)',
                letterSpacing: '0.04em',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--silver)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--dim)')}
            >
              (313) 943-8052
            </a>
          </div>

          {/* Social links */}
          <div style={{ display: 'flex', gap: '16px', marginTop: '4px' }}>
            <a
              href="https://www.linkedin.com/company/caliber-web-studio"
              style={{ color: 'var(--dim)', transition: 'color 0.2s ease', display: 'flex' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--silver)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--dim)')}
              title="LinkedIn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href="https://twitter.com/caliberwebstudio"
              style={{ color: 'var(--dim)', transition: 'color 0.2s ease', display: 'flex' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--silver)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--dim)')}
              title="Twitter/X"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2s9 5 20 5a9.5 9.5 0 0 0-9-5.5c4.75 2.25 7-7 7-7" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/caliberwebstudio"
              style={{ color: 'var(--dim)', transition: 'color 0.2s ease', display: 'flex' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--silver)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--dim)')}
              title="Instagram"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <circle cx="17.5" cy="6.5" r="1.5" />
              </svg>
            </a>
          </div>
        </div>

        {/* Navigation column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '9px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--navy)',
              marginBottom: '4px',
            }}
          >
            Navigation
          </span>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '11px',
                color: 'var(--dim)',
                letterSpacing: '0.04em',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--silver)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--dim)')}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Services column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '9px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--navy)',
              marginBottom: '4px',
            }}
          >
            Services
          </span>
          {[
            { label: 'Web Design', href: '/services' },
            { label: 'SEO', href: '/services' },
            { label: 'AI Chatbots', href: '/services' },
            { label: 'Google Business', href: '/services' },
            { label: 'Review Automation', href: '/services' },
            { label: 'Launch Package', href: '/startup-complete' },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '11px',
                color: 'var(--dim)',
                letterSpacing: '0.04em',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--silver)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--dim)')}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Legal column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '9px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--navy)',
              marginBottom: '4px',
            }}
          >
            Legal
          </span>
          {legalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '11px',
                color: 'var(--dim)',
                letterSpacing: '0.04em',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--silver)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--dim)')}
            >
              {link.label}
            </Link>
          ))}

          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '9px',
                color: 'var(--dim)',
                letterSpacing: '0.04em',
                lineHeight: 1.9,
              }}
            >
              Plans from $197/mo<br />
              $0 down to get started<br />
              Michigan Law Governed
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '1px solid var(--border)',
          padding: '20px clamp(20px, 6vw, 60px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '9px',
            color: 'var(--dim)',
            letterSpacing: '0.05em',
          }}
        >
          © 2026 High Caliber Operations LLC · All rights reserved.
        </span>
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '9px',
            color: 'var(--dim)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          Built in Detroit. Powered by AI.
        </span>
      </div>
    </footer>
  );
}
