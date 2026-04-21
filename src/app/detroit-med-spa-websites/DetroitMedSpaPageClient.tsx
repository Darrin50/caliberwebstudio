'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Link from 'next/link';

const PROBLEMS = [
  {
    num: '01',
    title: 'Broken on Mobile',
    desc: 'Over 70% of med spa searches happen on a phone. If your site takes longer than 3 seconds to load, most visitors leave before reading a single word.',
    sourceLabel: 'CWS Research',
    sourceHref: '/blog/detroit-med-spa-website-design-high-ticket',
  },
  {
    num: '02',
    title: 'No Before & After Gallery',
    desc: "Before/after photos are the single most persuasive element on a med spa site — more than copy, more than credentials. Most Detroit practices don't show them.",
    sourceLabel: 'CWS Industry Guide',
    sourceHref: '/blog/detroit-med-spa-website-design-high-ticket',
  },
  {
    num: '03',
    title: 'No Online Booking',
    desc: "A contact form saying 'we'll get back to you' kills conversions at the exact moment a client is ready to commit. Friction at booking means lost revenue.",
    sourceLabel: 'CWS Booking Audit',
    sourceHref: '/blog/detroit-med-spa-booking-mistakes',
  },
  {
    num: '04',
    title: 'Provider Credentials Hidden',
    desc: "Detroit clients evaluate trust before they book. They want to know who is treating them. Provider bios and certifications need to be front and center — not buried in an 'About' footer.",
    sourceLabel: 'AmSpa Consumer Research',
    sourceHref: '/blog/detroit-med-spa-website-design-high-ticket',
  },
  {
    num: '05',
    title: 'Generic Stock Photography',
    desc: "If your site doesn't show your actual team, your space, and real client results, sophisticated clients notice. It signals you have something to hide — even when you don't.",
    sourceLabel: 'CWS Practice Audits',
    sourceHref: '/blog/detroit-med-spa-website-design-high-ticket',
  },
];

const PROCESS = [
  {
    num: '01',
    tag: 'Week 1',
    tagColor: '#0076B6',
    tagBg: 'rgba(0,118,182,0.1)',
    tagBorder: 'rgba(0,118,182,0.3)',
    glow: 'rgba(0,118,182,0.15)',
    title: 'Audit',
    desc: 'We analyze your current site performance, Google ranking position, and competitor landscape across your Metro Detroit zip codes.',
  },
  {
    num: '02',
    tag: 'Week 1–2',
    tagColor: '#0284c7',
    tagBg: 'rgba(2,132,199,0.1)',
    tagBorder: 'rgba(2,132,199,0.3)',
    glow: 'rgba(2,132,199,0.15)',
    title: 'Design',
    desc: 'A custom mockup built specifically for your practice — your photos, your brand, your service menu. You approve it before a single line of code is written.',
  },
  {
    num: '03',
    tag: 'Week 2–4',
    tagColor: '#6366f1',
    tagBg: 'rgba(99,102,241,0.1)',
    tagBorder: 'rgba(99,102,241,0.3)',
    glow: 'rgba(99,102,241,0.15)',
    title: 'Build',
    desc: 'Next.js-powered site: LocalBusiness schema, embedded booking, mobile-first performance, before/after gallery, and provider credential pages.',
  },
  {
    num: '04',
    tag: 'Week 4',
    tagColor: '#7c3aed',
    tagBg: 'rgba(124,58,237,0.1)',
    tagBorder: 'rgba(124,58,237,0.3)',
    glow: 'rgba(124,58,237,0.15)',
    title: 'Handoff',
    desc: 'Full launch, 30-day post-launch support, Google Business Profile optimization, and a results dashboard so you see exactly what your site is producing.',
  },
];

const STATS = [
  {
    number: '70%+',
    label: 'of med spa searches happen on a phone',
    source: 'CWS Research',
    sourceHref: '/blog/detroit-med-spa-website-design-high-ticket',
  },
  {
    number: '88%',
    label: 'of local mobile searches result in a call or visit within 24 hours',
    source: 'BrightLocal Consumer Review Survey',
    sourceHref: 'https://www.brightlocal.com/research/local-consumer-review-survey/',
  },
  {
    number: '15–30%',
    label: 'more leads captured when AI chatbot is deployed',
    source: 'CWS Client Data',
    sourceHref: '/blog/ai-chatbots-customer-service-small-business',
  },
  {
    number: '90–120',
    label: 'days to first-page Google rankings for Detroit med spa keywords with proper SEO',
    source: 'CWS Client Results',
    sourceHref: '/blog/detroit-med-spa-local-seo-google-ranking',
  },
];

const PLANS = [
  {
    name: 'Starter',
    price: '$197',
    period: '/mo',
    tag: 'Launch',
    tagColor: '#0076B6',
    tagBg: 'rgba(0,118,182,0.12)',
    tagBorder: 'rgba(0,118,182,0.35)',
    desc: 'For a new or rebranding med spa that needs a professional foundation online.',
    features: [
      'Custom 5-page website',
      'LocalBusiness schema markup',
      'Google Business Profile setup',
      'Mobile-first responsive design',
      'Click-to-call & contact form',
      '$0 down — mockup first',
    ],
    featured: false,
  },
  {
    name: 'Growth',
    price: '$397',
    period: '/mo',
    tag: 'Most Popular',
    tagColor: '#6366f1',
    tagBg: 'rgba(99,102,241,0.12)',
    tagBorder: 'rgba(99,102,241,0.45)',
    desc: 'For established med spas ready to dominate local search and attract high-ticket clients.',
    features: [
      'Everything in Starter',
      'Before/after gallery',
      'Provider credential pages',
      'Service-specific landing pages',
      'Online booking integration',
      'Monthly SEO + blog content',
    ],
    featured: true,
  },
  {
    name: 'Domination',
    price: '$697',
    period: '/mo',
    tag: 'Full Stack',
    tagColor: '#7c3aed',
    tagBg: 'rgba(124,58,237,0.12)',
    tagBorder: 'rgba(124,58,237,0.45)',
    desc: 'Full-stack digital growth for high-volume or multi-location aesthetic practices.',
    features: [
      'Everything in Growth',
      'AI chatbot trained on your services',
      'Review automation system',
      'Multi-location SEO pages',
      'Analytics dashboard',
      'Quarterly strategy call',
    ],
    featured: false,
  },
];

const BLOG_LINKS = [
  {
    title: 'Website Design for Detroit Med Spas That Attracts High-Ticket Clients',
    href: '/blog/detroit-med-spa-website-design-high-ticket',
    tag: 'Industry Guide',
    tagColor: '#0076B6',
  },
  {
    title: 'Detroit Med Spa Local SEO: How to Own the Google 3-Pack',
    href: '/blog/detroit-med-spa-local-seo-google-ranking',
    tag: 'Local SEO',
    tagColor: '#6366f1',
  },
  {
    title: 'Detroit Med Spa Booking Mistakes: 7 Flow Failures Leaking Revenue',
    href: '/blog/detroit-med-spa-booking-mistakes',
    tag: 'Conversion',
    tagColor: '#0284c7',
  },
];

const SERVICE_AREAS = [
  'Birmingham', 'Bloomfield Hills', 'Dearborn', 'Detroit', 'Grosse Pointe',
  'Northville', 'Royal Oak', 'Southfield', 'Troy', 'West Bloomfield',
];

export default function DetroitMedSpaPageClient() {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('ms-visible');
          }
        });
      },
      { rootMargin: '0px 0px -60px 0px', threshold: 0.08 }
    );

    document.querySelectorAll('.ms-reveal').forEach((el) => observer.observe(el));

    return () => {
      clearTimeout(t);
      observer.disconnect();
    };
  }, []);

  /* ─── shared style fragments ─── */
  const eyebrowStyle: React.CSSProperties = {
    fontFamily: "var(--font-space-mono, 'Space Mono', monospace)",
    fontSize: '10px',
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
    color: '#0076B6',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  };

  const eyebrowLine = (
    <span style={{ display: 'block', width: '28px', height: '1px', background: '#0076B6', flexShrink: 0 }} />
  );

  return (
    <>
      <Nav />
      <main>

        {/* ══════════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════════ */}
        <section
          id="hero"
          data-force-dark
          style={{
            position: 'relative',
            minHeight: 'clamp(540px, 82vh, 100vh)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#000000',
            overflow: 'hidden',
          }}
        >
          {/* Radial glow */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 75% 65% at 50% 38%, rgba(0,118,182,0.22) 0%, rgba(0,118,182,0.07) 45%, transparent 72%)',
            zIndex: 0,
          }} />
          {/* Subtle grid texture */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            zIndex: 0,
          }} />

          <div style={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            padding: 'clamp(80px, 10vw, 140px) clamp(20px, 6vw, 60px)',
            maxWidth: '900px',
            margin: '0 auto',
            width: '100%',
          }}>
            {/* Eyebrow */}
            <div
              className={heroVisible ? 'ms-hero-item ms-hero-in' : 'ms-hero-item'}
              style={{ ...eyebrowStyle, justifyContent: 'center', animationDelay: '0ms' }}
            >
              {eyebrowLine}
              Detroit Med Spa Websites
              {eyebrowLine}
            </div>

            {/* H1 */}
            <h1
              className={heroVisible ? 'ms-hero-item ms-hero-in' : 'ms-hero-item'}
              style={{
                fontFamily: "var(--font-heading, var(--font-syne, 'Syne', sans-serif))",
                fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)',
                fontWeight: 800,
                lineHeight: 1.0,
                letterSpacing: '-0.03em',
                color: '#ffffff',
                marginBottom: '24px',
                animationDelay: '120ms',
              }}
            >
              Detroit Med Spa Websites<br />
              <span style={{ color: '#0076B6' }}>That Actually Convert.</span>
            </h1>

            {/* Sub */}
            <p
              className={heroVisible ? 'ms-hero-item ms-hero-in' : 'ms-hero-item'}
              style={{
                fontFamily: "var(--font-inter, 'Inter', sans-serif)",
                fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)',
                lineHeight: 1.65,
                color: 'rgba(208,216,224,0.82)',
                maxWidth: '580px',
                margin: '0 auto 40px',
                animationDelay: '240ms',
              }}
            >
              Caliber Web Studio builds high-performance, custom websites for Detroit-area
              aesthetic practices — Google-ranked, mobile-first, and built to book clients
              who spend $800+ per visit.
            </p>

            {/* CTAs */}
            <div
              className={heroVisible ? 'ms-hero-item ms-hero-in' : 'ms-hero-item'}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
                animationDelay: '360ms',
              }}
            >
              <a href="/contact" className="ms-btn-primary">
                See Your Free Custom Mock →
              </a>
              <a href="#case-study" className="ms-btn-secondary">
                View Live Example ↓
              </a>
            </div>
          </div>

          {/* Scroll chevron */}
          {heroVisible && (
            <div className="ms-chevron" style={{
              position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', zIndex: 1,
            }}>
              <svg width="24" height="14" viewBox="0 0 24 14" fill="none">
                <path d="M2 2L12 11L22 2" stroke="rgba(208,216,224,0.35)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </section>

        {/* ══════════════════════════════════════════════════════
            VISUAL SHOWCASE
        ══════════════════════════════════════════════════════ */}
        <section
          id="case-study"
          data-force-dark
          style={{
            background: '#111114',
            padding: 'clamp(72px, 9vw, 120px) clamp(20px, 6vw, 60px)',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
              gap: 'clamp(48px, 7vw, 80px)',
              alignItems: 'center',
            }}>

              {/* Left: text */}
              <div className="ms-reveal">
                <div style={eyebrowStyle}>
                  {eyebrowLine}
                  The Standard
                </div>
                <h2 style={{
                  fontFamily: "var(--font-heading, var(--font-syne, 'Syne', sans-serif))",
                  fontSize: 'clamp(1.9rem, 4vw, 3rem)',
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: '-0.03em',
                  color: '#F4F6F8',
                  marginBottom: '20px',
                }}>
                  Detroit&#39;s Best Med Spas<br />
                  <span style={{ color: '#0076B6' }}>Deserve Better Websites.</span>
                </h2>
                <p style={{
                  fontFamily: "var(--font-inter, 'Inter', sans-serif)",
                  fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
                  lineHeight: 1.75,
                  color: 'rgba(208,216,224,0.68)',
                  marginBottom: '32px',
                }}>
                  We build for practices that take their image seriously — providers
                  who invest in their craft and know their website should reflect it.
                  Custom-built, not templated. Premium from the first pixel.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <a href="/contact" className="ms-btn-primary" style={{ alignSelf: 'flex-start' }}>
                    See Your Free Mockup →
                  </a>
                  <a
                    href="https://www.caliberwebstudio.com/mocks/adorn-medical-spa"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "var(--font-space-mono, 'Space Mono', monospace)",
                      fontSize: '10px',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'rgba(0,118,182,0.65)',
                      textDecoration: 'none',
                    }}
                  >
                    ↗ View a live Detroit med spa demo
                  </a>
                </div>
              </div>

              {/* Right: image */}
              <div className="ms-reveal" style={{
                position: 'relative',
                height: 'clamp(420px, 50vw, 600px)',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
              }}>
                <Image
                  src="/images/detroit-med-spa-websites-hero.jpg"
                  alt="Confident Detroit med spa owner in a modern aesthetic clinic"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center center' }}
                />
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            PROBLEMS
        ══════════════════════════════════════════════════════ */}
        <section style={{
          background: 'var(--bg3, #18181c)',
          padding: 'clamp(72px, 9vw, 120px) clamp(20px, 6vw, 60px)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

            <div className="ms-reveal" style={{ marginBottom: 'clamp(40px, 5vw, 64px)' }}>
              <div style={eyebrowStyle}>
                {eyebrowLine}
                What&#39;s Actually Broken
              </div>
              <h2 style={{
                fontFamily: "var(--font-heading, var(--font-syne, 'Syne', sans-serif))",
                fontSize: 'clamp(1.9rem, 4vw, 3rem)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: '#F4F6F8',
                maxWidth: '600px',
              }}>
                Why Most Detroit Med Spa Websites<br />
                <span style={{ color: '#0076B6' }}>Fail Their Owners</span>
              </h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
              gap: '20px',
            }}>
              {PROBLEMS.map((p) => (
                <div key={p.num} className="ms-reveal ms-card">
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    marginBottom: '16px',
                  }}>
                    <span style={{
                      fontFamily: "var(--font-space-mono, 'Space Mono', monospace)",
                      fontSize: '11px',
                      letterSpacing: '0.15em',
                      color: '#0076B6',
                      fontWeight: 700,
                    }}>
                      {p.num}
                    </span>
                  </div>
                  <h3 style={{
                    fontFamily: "var(--font-syne, 'Syne', sans-serif)",
                    fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
                    fontWeight: 700,
                    color: '#F4F6F8',
                    marginBottom: '10px',
                  }}>
                    {p.title}
                  </h3>
                  <p style={{
                    fontFamily: "var(--font-inter, 'Inter', sans-serif)",
                    fontSize: '14px',
                    lineHeight: 1.7,
                    color: 'rgba(208,216,224,0.62)',
                    marginBottom: '16px',
                  }}>
                    {p.desc}
                  </p>
                  <Link href={p.sourceHref} style={{
                    fontFamily: "var(--font-space-mono, 'Space Mono', monospace)",
                    fontSize: '10px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(0,118,182,0.65)',
                    textDecoration: 'none',
                  }}>
                    ↗ {p.sourceLabel}
                  </Link>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            PROCESS
        ══════════════════════════════════════════════════════ */}
        <section style={{
          background: 'var(--bg2, #111114)',
          padding: 'clamp(72px, 9vw, 120px) clamp(20px, 6vw, 60px)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

            <div className="ms-reveal" style={{ marginBottom: 'clamp(40px, 5vw, 64px)' }}>
              <div style={eyebrowStyle}>
                {eyebrowLine}
                How We Build It
              </div>
              <h2 style={{
                fontFamily: "var(--font-heading, var(--font-syne, 'Syne', sans-serif))",
                fontSize: 'clamp(1.9rem, 4vw, 3rem)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: '#F4F6F8',
              }}>
                Four Steps From<br />
                <span style={{ color: '#0076B6' }}>Signed to Launched</span>
              </h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
              gap: '20px',
            }}>
              {PROCESS.map((step) => (
                <div key={step.num} className="ms-reveal ms-card" style={{ position: 'relative' }}>
                  {/* Number — top right */}
                  <span style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    fontFamily: "var(--font-space-mono, 'Space Mono', monospace)",
                    fontSize: '11px',
                    letterSpacing: '0.12em',
                    color: 'rgba(255,255,255,0.15)',
                    fontWeight: 700,
                  }}>
                    {step.num}
                  </span>

                  {/* Tag */}
                  <span style={{
                    display: 'inline-block',
                    fontFamily: "var(--font-space-mono, 'Space Mono', monospace)",
                    fontSize: '10px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: step.tagColor,
                    background: step.tagBg,
                    border: `1px solid ${step.tagBorder}`,
                    borderRadius: '4px',
                    padding: '4px 10px',
                    marginBottom: '16px',
                  }}>
                    {step.tag}
                  </span>

                  <h3 style={{
                    fontFamily: "var(--font-syne, 'Syne', sans-serif)",
                    fontSize: 'clamp(1.1rem, 1.6vw, 1.25rem)',
                    fontWeight: 700,
                    color: '#F4F6F8',
                    marginBottom: '12px',
                  }}>
                    {step.title}
                  </h3>
                  <p style={{
                    fontFamily: "var(--font-inter, 'Inter', sans-serif)",
                    fontSize: '14px',
                    lineHeight: 1.7,
                    color: 'rgba(208,216,224,0.62)',
                    margin: 0,
                  }}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            STATS
        ══════════════════════════════════════════════════════ */}
        <section style={{
          background: '#0a0a0b',
          padding: 'clamp(72px, 9vw, 120px) clamp(20px, 6vw, 60px)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

            <div className="ms-reveal" style={{ marginBottom: 'clamp(40px, 5vw, 64px)', textAlign: 'center' }}>
              <div style={{ ...eyebrowStyle, justifyContent: 'center' }}>
                {eyebrowLine}
                The Numbers
                {eyebrowLine}
              </div>
              <h2 style={{
                fontFamily: "var(--font-heading, var(--font-syne, 'Syne', sans-serif))",
                fontSize: 'clamp(1.9rem, 4vw, 3rem)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: '#F4F6F8',
              }}>
                Data That Drives<br />
                <span style={{ color: '#0076B6' }}>Our Decisions</span>
              </h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 230px), 1fr))',
              gap: '20px',
            }}>
              {STATS.map((s, i) => (
                <div key={i} className="ms-reveal ms-stat-card">
                  <div style={{
                    fontFamily: "var(--font-heading, var(--font-syne, 'Syne', sans-serif))",
                    fontSize: 'clamp(2.2rem, 4vw, 3rem)',
                    fontWeight: 800,
                    color: '#0076B6',
                    lineHeight: 1,
                    marginBottom: '12px',
                    letterSpacing: '-0.02em',
                  }}>
                    {s.number}
                  </div>
                  <p style={{
                    fontFamily: "var(--font-inter, 'Inter', sans-serif)",
                    fontSize: '14px',
                    lineHeight: 1.6,
                    color: 'rgba(208,216,224,0.72)',
                    marginBottom: '14px',
                  }}>
                    {s.label}
                  </p>
                  <a
                    href={s.sourceHref}
                    target={s.sourceHref.startsWith('http') ? '_blank' : undefined}
                    rel={s.sourceHref.startsWith('http') ? 'noopener noreferrer' : undefined}
                    style={{
                      fontFamily: "var(--font-space-mono, 'Space Mono', monospace)",
                      fontSize: '10px',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'rgba(0,118,182,0.55)',
                      textDecoration: 'none',
                    }}
                  >
                    ↗ {s.source}
                  </a>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            PRICING
        ══════════════════════════════════════════════════════ */}
        <section style={{
          background: 'var(--bg2, #111114)',
          padding: 'clamp(72px, 9vw, 120px) clamp(20px, 6vw, 60px)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

            <div className="ms-reveal" style={{ marginBottom: 'clamp(40px, 5vw, 64px)', textAlign: 'center' }}>
              <div style={{ ...eyebrowStyle, justifyContent: 'center' }}>
                {eyebrowLine}
                Built for Your Practice
                {eyebrowLine}
              </div>
              <h2 style={{
                fontFamily: "var(--font-heading, var(--font-syne, 'Syne', sans-serif))",
                fontSize: 'clamp(1.9rem, 4vw, 3rem)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: '#F4F6F8',
                marginBottom: '16px',
              }}>
                Simple Pricing.<br />
                <span style={{ color: '#0076B6' }}>No Surprises.</span>
              </h2>
              <p style={{
                fontFamily: "var(--font-inter, 'Inter', sans-serif)",
                fontSize: '15px',
                color: 'rgba(208,216,224,0.55)',
                maxWidth: '460px',
                margin: '0 auto',
                lineHeight: 1.65,
              }}>
                All plans start with a <strong style={{ color: 'rgba(208,216,224,0.8)' }}>$0 down custom mockup</strong> — you
                see exactly what your site will look like before you pay a cent.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
              gap: '20px',
              alignItems: 'start',
            }}>
              {PLANS.map((plan) => (
                <div
                  key={plan.name}
                  className="ms-reveal ms-plan-card"
                  style={plan.featured ? {
                    background: 'rgba(99,102,241,0.07)',
                    border: '1px solid rgba(99,102,241,0.35)',
                    borderRadius: '12px',
                    padding: 'clamp(24px, 3vw, 36px)',
                    position: 'relative',
                  } : undefined}
                >
                  {plan.featured && (
                    <div style={{
                      position: 'absolute',
                      top: '-1px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: '#6366f1',
                      color: '#fff',
                      fontFamily: "var(--font-space-mono, 'Space Mono', monospace)",
                      fontSize: '9px',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      padding: '5px 16px',
                      borderRadius: '0 0 8px 8px',
                    }}>
                      Most Popular
                    </div>
                  )}

                  {/* Tag */}
                  <span style={{
                    display: 'inline-block',
                    fontFamily: "var(--font-space-mono, 'Space Mono', monospace)",
                    fontSize: '10px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: plan.tagColor,
                    background: plan.tagBg,
                    border: `1px solid ${plan.tagBorder}`,
                    borderRadius: '4px',
                    padding: '4px 10px',
                    marginBottom: '16px',
                  }}>
                    {plan.tag}
                  </span>

                  <div style={{
                    fontFamily: "var(--font-syne, 'Syne', sans-serif)",
                    fontSize: '20px',
                    fontWeight: 800,
                    color: '#F4F6F8',
                    marginBottom: '8px',
                  }}>
                    {plan.name}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '12px' }}>
                    <span style={{
                      fontFamily: "var(--font-heading, var(--font-syne, 'Syne', sans-serif))",
                      fontSize: 'clamp(2rem, 3.5vw, 2.6rem)',
                      fontWeight: 800,
                      color: '#0076B6',
                      lineHeight: 1,
                    }}>
                      {plan.price}
                    </span>
                    <span style={{
                      fontFamily: "var(--font-space-mono, 'Space Mono', monospace)",
                      fontSize: '12px',
                      color: 'rgba(208,216,224,0.45)',
                    }}>
                      {plan.period}
                    </span>
                  </div>

                  <p style={{
                    fontFamily: "var(--font-inter, 'Inter', sans-serif)",
                    fontSize: '13px',
                    lineHeight: 1.65,
                    color: 'rgba(208,216,224,0.55)',
                    marginBottom: '20px',
                  }}>
                    {plan.desc}
                  </p>

                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: '9px' }}>
                    {plan.features.map((f) => (
                      <li key={f} style={{
                        fontFamily: "var(--font-inter, 'Inter', sans-serif)",
                        fontSize: '13px',
                        color: 'rgba(208,216,224,0.72)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                      }}>
                        <span style={{ color: '#0076B6', flexShrink: 0, marginTop: '1px' }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a href="/contact" className={plan.featured ? 'ms-btn-primary' : 'ms-btn-outline'} style={{ display: 'block', textAlign: 'center' }}>
                    Get Your Mock →
                  </a>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            LOCAL TRUST + BLOG LINKS
        ══════════════════════════════════════════════════════ */}
        <section style={{
          background: 'var(--bg3, #18181c)',
          padding: 'clamp(72px, 9vw, 120px) clamp(20px, 6vw, 60px)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
              gap: 'clamp(48px, 6vw, 80px)',
              alignItems: 'start',
            }}>

              {/* Left: trust + areas */}
              <div className="ms-reveal">
                <div style={eyebrowStyle}>
                  {eyebrowLine}
                  Detroit-Built
                </div>
                <h2 style={{
                  fontFamily: "var(--font-heading, var(--font-syne, 'Syne', sans-serif))",
                  fontSize: 'clamp(1.7rem, 3.5vw, 2.6rem)',
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: '-0.03em',
                  color: '#F4F6F8',
                  marginBottom: '20px',
                }}>
                  Based in Detroit.<br />
                  <span style={{ color: '#0076B6' }}>Built for Michigan Med Spas.</span>
                </h2>
                <p style={{
                  fontFamily: "var(--font-inter, 'Inter', sans-serif)",
                  fontSize: '15px',
                  lineHeight: 1.7,
                  color: 'rgba(208,216,224,0.62)',
                  marginBottom: '28px',
                }}>
                  We know Metro Detroit. We know which zip codes are searching for
                  Botox right now, which neighborhoods drive the highest-value aesthetic
                  clients, and how to position your practice to own them.
                </p>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  marginBottom: '32px',
                }}>
                  {SERVICE_AREAS.map((area) => (
                    <span key={area} style={{
                      fontFamily: "var(--font-space-mono, 'Space Mono', monospace)",
                      fontSize: '10px',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'rgba(208,216,224,0.5)',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '4px',
                      padding: '5px 10px',
                    }}>
                      {area}
                    </span>
                  ))}
                </div>
                <a href="tel:+13137992315" style={{
                  fontFamily: "var(--font-syne, 'Syne', sans-serif)",
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#0076B6',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}>
                  <span style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(0,118,182,0.12)',
                    border: '1px solid rgba(0,118,182,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    flexShrink: 0,
                  }}>
                    📞
                  </span>
                  (313) 799-2315
                </a>
              </div>

              {/* Right: blog links */}
              <div className="ms-reveal">
                <div style={eyebrowStyle}>
                  {eyebrowLine}
                  From the Blog
                </div>
                <h3 style={{
                  fontFamily: "var(--font-heading, var(--font-syne, 'Syne', sans-serif))",
                  fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  color: '#F4F6F8',
                  marginBottom: '28px',
                }}>
                  More on Detroit<br />Med Spa Websites
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {BLOG_LINKS.map((post) => (
                    <Link
                      key={post.href}
                      href={post.href}
                      className="ms-blog-link"
                    >
                      <span style={{
                        display: 'inline-block',
                        fontFamily: "var(--font-space-mono, 'Space Mono', monospace)",
                        fontSize: '9px',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: post.tagColor,
                        background: `${post.tagColor}18`,
                        border: `1px solid ${post.tagColor}40`,
                        borderRadius: '3px',
                        padding: '3px 8px',
                        marginBottom: '6px',
                      }}>
                        {post.tag}
                      </span>
                      <p style={{
                        fontFamily: "var(--font-inter, 'Inter', sans-serif)",
                        fontSize: '14px',
                        fontWeight: 500,
                        lineHeight: 1.5,
                        color: 'rgba(208,216,224,0.78)',
                        margin: 0,
                      }}>
                        {post.title} →
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            FINAL CTA
        ══════════════════════════════════════════════════════ */}
        <section
          data-force-dark
          style={{
            position: 'relative',
            minHeight: '72vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            background: '#0a0a0b',
          }}
        >
          <div style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,118,182,0.18) 0%, rgba(0,118,182,0.06) 40%, transparent 70%)',
            zIndex: 0,
          }} />
          <div style={{
            position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 1,
          }} />

          <div style={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            padding: 'clamp(60px, 8vw, 100px) clamp(20px, 6vw, 60px)',
            maxWidth: '780px',
            margin: '0 auto',
          }}>
            <div className="ms-reveal" style={{ ...eyebrowStyle, justifyContent: 'center' }}>
              {eyebrowLine}
              Ready to Grow
              {eyebrowLine}
            </div>

            <h2 className="ms-reveal" style={{
              fontFamily: "var(--font-heading, var(--font-syne, 'Syne', sans-serif))",
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              marginBottom: '20px',
            }}>
              Your free mock in 48 hours.<br />
              <span style={{ color: '#0076B6' }}>No contract. No BS.</span>
            </h2>

            <p className="ms-reveal" style={{
              fontFamily: "var(--font-inter, 'Inter', sans-serif)",
              fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
              lineHeight: 1.7,
              color: 'rgba(208,216,224,0.72)',
              marginBottom: '44px',
              maxWidth: '500px',
              margin: '0 auto 44px',
            }}>
              See exactly what your med spa website could look like — built for your
              practice, your market, your clients — before you pay a cent.
            </p>

            <div className="ms-reveal">
              <a href="/contact" className="ms-btn-primary" style={{ fontSize: '17px', padding: '20px 52px' }}>
                Get My Free Med Spa Mockup →
              </a>
            </div>

            <div style={{ marginTop: '24px' }}>
              <a href="tel:+13137992315" style={{
                fontFamily: "var(--font-space-mono, 'Space Mono', monospace)",
                fontSize: '12px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(176,183,188,0.5)',
                textDecoration: 'none',
              }}>
                Or call us: (313) 799-2315
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />

      <style>{`
        /* ── Hero animation ────────────────────────────────── */
        .ms-hero-item {
          opacity: 0;
          transform: translateY(70px);
        }
        .ms-hero-in {
          animation: ms-rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes ms-rise {
          to { opacity: 1; transform: translateY(0); }
        }

        /* ── Scroll reveal ─────────────────────────────────── */
        .ms-reveal {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .ms-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Chevron bounce ────────────────────────────────── */
        .ms-chevron {
          animation: ms-bounce 2s ease-in-out infinite;
        }
        @keyframes ms-bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); opacity: 0.35; }
          50%       { transform: translateX(-50%) translateY(8px); opacity: 0.75; }
        }

        /* ── Buttons ───────────────────────────────────────── */
        .ms-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 36px;
          background: #0076B6;
          color: #ffffff;
          font-family: var(--font-syne, 'Syne', sans-serif);
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-decoration: none;
          border-radius: 4px;
          border: 1px solid transparent;
          transition: box-shadow 0.3s ease, transform 0.2s ease;
        }
        .ms-btn-primary:hover {
          box-shadow: 0 0 32px rgba(0,118,182,0.55), 0 0 64px rgba(0,118,182,0.25);
          transform: translateY(-2px);
        }

        .ms-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 15px 28px;
          background: transparent;
          color: rgba(208,216,224,0.72);
          font-family: var(--font-syne, 'Syne', sans-serif);
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.03em;
          text-decoration: none;
          border-radius: 4px;
          border: 1px solid rgba(255,255,255,0.14);
          transition: border-color 0.25s ease, color 0.25s ease, transform 0.2s ease;
        }
        .ms-btn-secondary:hover {
          border-color: rgba(0,118,182,0.6);
          color: #0076B6;
          transform: translateY(-2px);
        }

        .ms-btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 22px;
          background: transparent;
          color: #0076B6;
          font-family: var(--font-syne, 'Syne', sans-serif);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-decoration: none;
          border-radius: 4px;
          border: 1px solid rgba(0,118,182,0.45);
          transition: background 0.25s ease, border-color 0.25s ease, transform 0.2s ease;
          white-space: nowrap;
        }
        .ms-btn-outline:hover {
          background: rgba(0,118,182,0.1);
          border-color: rgba(0,118,182,0.7);
          transform: translateY(-1px);
        }

        /* ── Cards ─────────────────────────────────────────── */
        .ms-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: clamp(20px, 2.5vw, 28px);
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .ms-card:hover {
          transform: translateY(-4px);
          border-color: rgba(0,118,182,0.3);
          box-shadow: 0 12px 40px rgba(0,0,0,0.3);
        }

        /* ── Stat card ─────────────────────────────────────── */
        .ms-stat-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          padding: clamp(24px, 3vw, 32px);
          transition: transform 0.25s ease, border-color 0.25s ease;
        }
        .ms-stat-card:hover {
          transform: translateY(-3px);
          border-color: rgba(0,118,182,0.25);
        }

        /* ── Plan card (default — non-featured) ────────────── */
        .ms-plan-card:not([style]) {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: clamp(24px, 3vw, 36px);
          transition: transform 0.25s ease, border-color 0.25s ease;
        }
        .ms-plan-card:not([style]):hover {
          transform: translateY(-4px);
          border-color: rgba(0,118,182,0.28);
        }
        .ms-plan-card[style]:hover {
          transform: translateY(-4px);
        }

        /* ── Blog link ─────────────────────────────────────── */
        .ms-blog-link {
          display: block;
          padding: 16px 20px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 8px;
          text-decoration: none;
          transition: border-color 0.25s ease, background 0.25s ease, transform 0.2s ease;
        }
        .ms-blog-link:hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(0,118,182,0.3);
          transform: translateX(4px);
        }

        /* ── Browser frame shadow on small screens ─────────── */
        @media (max-width: 600px) {
          .ms-browser-frame { border-radius: 8px; }
        }
      `}</style>
    </>
  );
}
