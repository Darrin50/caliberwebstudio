'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

// ─── DATA ────────────────────────────────────────────────────────────────────

const PROBLEM_BEATS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="13" stroke="#0076B6" strokeWidth="1.5"/>
        <path d="M14 8v7l4 2" stroke="#0076B6" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'They called at 2am — you lost because of your website.',
    body: '90%+ of emergency plumbing searches happen on a phone. If your site takes 6 seconds to load or looks broken on mobile, the customer already called someone else before your page finished loading.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="2" y="5" width="24" height="18" rx="2" stroke="#0076B6" strokeWidth="1.5"/>
        <path d="M2 10h24" stroke="#0076B6" strokeWidth="1.5"/>
        <circle cx="21" cy="7.5" r="1" fill="#0076B6"/>
      </svg>
    ),
    title: 'No emergency CTA above the fold. Every second costs you jobs.',
    body: 'A panicked homeowner does not scroll. If your phone number is not the first thing they see — big, clickable, impossible to miss — you are invisible in the exact moment that matters most.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L14 17.4l-5.6 2.8 1.1-6.2L5 9.6l6.2-.9L14 3z" stroke="#0076B6" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'No reviews. No trust. No call.',
    body: 'When someone searches "emergency plumber near me" at midnight, they click the result with 4.8 stars and 80 reviews. If that is not you, the job goes to whoever built that credibility online first.',
  },
];

const DEMO_CARDS = [
  {
    brand: 'Metro Plumbing & Drain',
    tagline: 'Emergency Service. Detroit Metro.',
    tag: 'Live Demo',
    tagColor: '#0076B6',
    features: ['Emergency CTA above fold', 'Service area map', 'Before/after gallery'],
    href: '/demo/metro-plumbing',
    ctaLabel: 'View Live Demo →',
    isLive: true,
  },
  {
    brand: 'Great Lakes Plumbing Co.',
    tagline: 'Michigan Family-Owned Since 1998',
    tag: 'Preview',
    tagColor: 'rgba(176,183,188,0.35)',
    features: ['24/7 click-to-call', 'Google review widget', 'Zip code service checker'],
    href: '#demo-request',
    ctaLabel: 'Request Your Free Version →',
    isLive: false,
  },
  {
    brand: 'Quick Fix Emergency Plumbing',
    tagline: 'We Answer When Others Don\'t.',
    tag: 'Preview',
    tagColor: 'rgba(176,183,188,0.35)',
    features: ['Emergency-first layout', 'Trust badge section', 'Online quote form'],
    href: '#demo-request',
    ctaLabel: 'Build One for My Business →',
    isLive: false,
  },
];

const FEATURES = [
  { icon: '📞', title: 'Emergency Call CTA — Every Page', desc: 'Click-to-call visible above the fold at all times. Built for homeowners who can\'t wait and won\'t scroll.' },
  { icon: '🗺️', title: 'Service Area Map', desc: 'Shows every city and zip code you cover so customers know you\'re coming before they even call.' },
  { icon: '📸', title: 'Before/After Photo Gallery', desc: 'Show the work. Leaky pipe before, clean repair after. Visual proof that turns skeptics into callers.' },
  { icon: '⭐', title: 'Google + Facebook Review Capture', desc: 'Automated follow-up after every job inviting satisfied customers to leave a 5-star review.' },
  { icon: '📱', title: 'Mobile-First Design', desc: '90%+ of plumbing searches happen on phones. Your site loads in under 2 seconds on any device.' },
  { icon: '✏️', title: 'Unlimited Content Updates', desc: 'Email us a change. We handle it within 24 hours — no extra charge, ever.' },
  { icon: '🔒', title: 'Hosting, SSL & Daily Backups', desc: 'Nothing for you to manage. Fast servers, HTTPS, and automatic backups included.' },
  { icon: '⚡', title: '24-Hour Onboarding', desc: 'Send us your business info. Your demo site is live in one business day.' },
];

const STEPS = [
  {
    number: '01',
    title: 'We build your demo in 24 hours.',
    body: 'Fill out the form. We build a live, fully functional plumbing website demo — branded with your name, logo, and service area. Zero payment. Zero obligation. You see it before we ask for anything.',
  },
  {
    number: '02',
    title: 'You review it. We tweak until it\'s right.',
    body: 'Click through your demo. Tell us what to change — colors, copy, services, layout. We handle every revision until you\'re proud to hand it to a customer.',
  },
  {
    number: '03',
    title: '30 days free. Then $197/mo if you love it.',
    body: 'We launch under your domain. Your first 30 days are completely free. If the site is driving calls (it will be), it\'s $197/mo after that. No long-term contract. Cancel anytime.',
  },
];

const TESTIMONIALS = [
  {
    quote: 'Caliber built us a site in 48 hours that I\'m genuinely proud to hand to customers. We went from invisible on Google to ranking for our neighborhood in two months. The phone hasn\'t stopped.',
    name: 'Marcus T.',
    business: 'Detroit Auto Glass',
    rating: 5,
  },
  {
    quote: 'I\'d been burned by two agencies before — big promises, bad results, worse communication. Darrin showed me a live mockup before I paid a dime. We were booked three weeks out within 60 days.',
    name: 'Kevin R.',
    business: 'Motor City Barbershop',
    rating: 5,
  },
  {
    quote: 'I was skeptical about paying for a website when I\'d been doing it myself. Three months in, we\'re ranking #1 for our neighborhood and getting 3× the inquiries. Best investment I\'ve made.',
    name: 'Alicia M.',
    business: 'Prime Home Services',
    rating: 5,
  },
];

const FAQ_ITEMS = [
  {
    q: 'Do you handle the domain name?',
    a: 'Yes. We point your existing domain to your new site, or register a new one for you. Either way — handled completely.',
  },
  {
    q: 'Will my old website disappear?',
    a: 'Not until you say so. We build your new site while the old one stays live, so you can compare and approve before we flip the switch.',
  },
  {
    q: 'Can customers book appointments directly from the site?',
    a: 'Yes. We add a click-to-call button, appointment request form, and/or emergency contact form that routes instantly to your phone and email. Customers never hunt for your number.',
  },
  {
    q: 'Do I own the website if I cancel?',
    a: 'The site runs on our platform. If you cancel, we export your content — business info, photos, copy — so you\'re never held hostage. Your business assets are yours.',
  },
  {
    q: 'What if I need changes after launch?',
    a: 'Unlimited content updates are included in $197/mo. New service, price change, seasonal promotion — email us and it\'s done within 24 hours. No extra charge, ever.',
  },
  {
    q: 'How fast can you actually build it?',
    a: 'Your free demo is ready in 24 hours. A fully polished, launch-ready site takes 3–5 business days — faster if you have photos and business info ready to go.',
  },
  {
    q: 'Do you work with plumbers outside Detroit?',
    a: 'Yes. We build for plumbers across Michigan and nationwide. The emergency SEO strategy and trust-building approach works in any market.',
  },
  {
    q: 'Why not just use Wix or Squarespace?',
    a: 'Speed, SEO architecture, AI lead capture, review automation, and ongoing support — all built in and maintained. A DIY site builder can\'t rank for "emergency plumber [your city]" at 2am. Ours does.',
  },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function PlumbersPageContent() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ businessName: '', city: '', phone: '', email: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.play().catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.businessName,
          businessName: form.businessName,
          phone: form.phone,
          email: form.email,
          message: `Plumber website inquiry — ${form.businessName}, ${form.city}. Phone: ${form.phone}`,
        }),
      });
      if (res.ok) {
        setSuccess(true);
      } else {
        setFormError('Something went wrong. Email us at darrin@caliberwebstudio.com');
      }
    } catch {
      setFormError('Something went wrong. Email us at darrin@caliberwebstudio.com');
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(176,183,188,0.15)',
    borderRadius: '6px',
    color: '#F4F6F8',
    fontFamily: "'Inter', sans-serif",
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: "'Space Mono', monospace",
    fontSize: '10px',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: 'rgba(176,183,188,0.6)',
    marginBottom: '8px',
  };

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          HERO — Seedance video loop
          Video slots: /public/videos/plumbers-hero.mp4
          Poster slot: /public/images/plumbers-hero-poster.jpg
      ══════════════════════════════════════════════════════ */}
      <section
        data-force-dark
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000',
          overflow: 'hidden',
        }}
      >
        {/* Ambient background glow — visible when video hasn't loaded yet */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 90% 70% at 50% 60%, rgba(0,40,80,0.85) 0%, #000 70%)',
          zIndex: 0,
        }} />

        {/* Video loop — swap src when Seedance clips are ready */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/images/plumbers-hero-poster.jpg"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1,
            opacity: 0.65,
          }}
        >
          <source src="/videos/plumbers-hero.mp4" type="video/mp4" />
          <source src="/videos/plumbers-hero.webm" type="video/webm" />
        </video>

        {/* Dark gradient overlay — bottom-to-center, keeps text readable */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.15) 100%)',
          zIndex: 2,
        }} />

        {/* Hero content */}
        <div style={{
          position: 'relative',
          zIndex: 3,
          textAlign: 'center',
          padding: 'clamp(120px, 16vw, 180px) clamp(20px, 6vw, 80px) clamp(80px, 10vw, 120px)',
          width: '100%',
          maxWidth: '900px',
          margin: '0 auto',
        }}>
          {/* Eyebrow */}
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '10px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#0076B6',
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
          }}>
            <span style={{ display: 'block', width: '28px', height: '1px', background: '#0076B6' }} />
            Plumber Website Design — Caliber Web Studio
            <span style={{ display: 'block', width: '28px', height: '1px', background: '#0076B6' }} />
          </div>

          <h1 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(2.4rem, 6vw, 4.8rem)',
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            marginBottom: '28px',
          }}>
            The Plumber Website<br />
            <span style={{ color: '#0076B6' }}>That Makes You the Hero.</span>
          </h1>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
            lineHeight: 1.7,
            color: 'rgba(208,216,224,0.85)',
            maxWidth: '560px',
            margin: '0 auto 44px',
          }}>
            When a pipe bursts at 2am, homeowners don&apos;t compare options.
            They call the first plumber Google shows — the one with a fast site,
            a clear phone number, and real reviews. We build that site. In 24 hours.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="#demo-request"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '18px 40px',
                background: '#0076B6',
                color: '#fff',
                fontFamily: "'Syne', sans-serif",
                fontSize: '15px',
                fontWeight: 700,
                letterSpacing: '0.04em',
                textDecoration: 'none',
                borderRadius: '4px',
                transition: 'box-shadow 0.3s, transform 0.2s',
              }}
              className="plumber-cta-primary"
            >
              Get Your Free Demo in 24 Hours →
            </a>
            <a
              href="#demos"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '18px 32px',
                background: 'transparent',
                color: 'rgba(208,216,224,0.85)',
                fontFamily: "'Space Mono', monospace",
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: '4px',
                border: '1px solid rgba(176,183,188,0.2)',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              className="plumber-cta-secondary"
            >
              See Example Sites
            </a>
          </div>
        </div>

        {/* Scroll chevron */}
        <div className="chevron-bounce-p" style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
        }}>
          <svg width="24" height="14" viewBox="0 0 24 14" fill="none">
            <path d="M2 2L12 11L22 2" stroke="rgba(208,216,224,0.35)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TRUST BAR
      ══════════════════════════════════════════════════════ */}
      <div style={{
        borderTop: '1px solid rgba(176,183,188,0.08)',
        borderBottom: '1px solid rgba(176,183,188,0.08)',
        background: 'rgba(0,118,182,0.06)',
        padding: '20px clamp(20px,6vw,80px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <p style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '11px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(176,183,188,0.5)',
          textAlign: 'center',
          maxWidth: 'none',
          margin: 0,
        }}>
          Built by Caliber Web Studio&nbsp;&nbsp;·&nbsp;&nbsp;Used by plumbers across the U.S.&nbsp;&nbsp;·&nbsp;&nbsp;Detroit-rooted. Performance-obsessed.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════
          PROBLEM STATEMENT
      ══════════════════════════════════════════════════════ */}
      <section style={{
        background: 'var(--bg2, #111114)',
        padding: 'clamp(80px,10vw,120px) clamp(20px,6vw,80px)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(48px,6vw,64px)' }}>
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#0076B6',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
            }}>
              <span style={{ display: 'block', width: '24px', height: '1px', background: '#0076B6' }} />
              The Real Problem
              <span style={{ display: 'block', width: '24px', height: '1px', background: '#0076B6' }} />
            </div>
            <h2 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(2rem,4.5vw,3.2rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              color: '#F4F6F8',
              maxWidth: 'none',
            }}>
              Most plumbing websites lose jobs<br />before the phone even rings.
            </h2>
          </div>

          <div className="problem-grid">
            {PROBLEM_BEATS.map((beat, i) => (
              <div key={i} style={{
                background: 'var(--bg, #0a0a0b)',
                border: '1px solid rgba(176,183,188,0.1)',
                borderRadius: '12px',
                padding: 'clamp(28px,3.5vw,40px)',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0,
                  height: '3px',
                  background: 'linear-gradient(90deg, #0076B6, transparent)',
                }} />
                <div style={{ marginBottom: '20px' }}>{beat.icon}</div>
                <h3 style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 'clamp(1.05rem,1.8vw,1.2rem)',
                  fontWeight: 700,
                  color: '#F4F6F8',
                  marginBottom: '12px',
                  lineHeight: 1.3,
                }}>
                  {beat.title}
                </h3>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '15px',
                  lineHeight: 1.7,
                  color: 'rgba(176,183,188,0.72)',
                  margin: 0,
                  maxWidth: 'none',
                }}>
                  {beat.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          DEMO PREVIEW CARDS
      ══════════════════════════════════════════════════════ */}
      <section
        id="demos"
        style={{
          background: 'var(--bg, #0a0a0b)',
          padding: 'clamp(80px,10vw,120px) clamp(20px,6vw,80px)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(48px,6vw,64px)' }}>
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#0076B6',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
            }}>
              <span style={{ display: 'block', width: '24px', height: '1px', background: '#0076B6' }} />
              What We Build
              <span style={{ display: 'block', width: '24px', height: '1px', background: '#0076B6' }} />
            </div>
            <h2 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(2rem,4.5vw,3.2rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              color: '#F4F6F8',
              marginBottom: '20px',
              maxWidth: 'none',
            }}>
              See what your site could look like.
            </h2>
            <p style={{
              fontSize: '17px',
              color: 'rgba(176,183,188,0.7)',
              maxWidth: '480px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}>
              Every site is custom-built for your brand, your service area, and your customer.
              These are examples of what we build for plumbers.
            </p>
          </div>

          <div className="demo-grid">
            {DEMO_CARDS.map((card, i) => (
              <div key={i} style={{
                background: 'var(--bg2, #111114)',
                border: '1px solid rgba(176,183,188,0.1)',
                borderRadius: '12px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}>
                {/* Mock browser frame */}
                <div style={{
                  background: '#0a0a0b',
                  borderBottom: '1px solid rgba(176,183,188,0.08)',
                  padding: '10px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(176,183,188,0.15)' }} />
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(176,183,188,0.15)' }} />
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(176,183,188,0.15)' }} />
                  <div style={{
                    flex: 1,
                    marginLeft: '8px',
                    background: 'rgba(255,255,255,0.04)',
                    borderRadius: '4px',
                    padding: '4px 10px',
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '9px',
                    color: 'rgba(176,183,188,0.3)',
                    letterSpacing: '0.06em',
                  }}>
                    caliberwebstudio.com/demo/{card.brand.toLowerCase().replace(/[^a-z]/g, '-').replace(/-+/g, '-')}
                  </div>
                </div>

                {/* Mock site preview */}
                <div style={{
                  background: 'linear-gradient(160deg, #001830 0%, #000d1f 100%)',
                  padding: '28px 24px',
                  minHeight: '180px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  {/* Tag */}
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    padding: '4px 10px',
                    background: card.isLive ? 'rgba(0,118,182,0.25)' : 'rgba(176,183,188,0.08)',
                    border: `1px solid ${card.isLive ? 'rgba(0,118,182,0.5)' : 'rgba(176,183,188,0.15)'}`,
                    borderRadius: '20px',
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '9px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: card.isLive ? '#0076B6' : 'rgba(176,183,188,0.45)',
                  }}>
                    {card.tag}
                  </div>

                  {/* Mock emergency bar */}
                  <div style={{
                    background: '#0076B6',
                    borderRadius: '4px',
                    padding: '8px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '16px',
                    maxWidth: '220px',
                  }}>
                    <span style={{ fontSize: '14px' }}>📞</span>
                    <span style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#fff',
                      letterSpacing: '0.04em',
                    }}>CALL (313) 555-PIPE</span>
                  </div>

                  {/* Mock headline */}
                  <div>
                    <div style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: 'clamp(15px,2vw,18px)',
                      fontWeight: 800,
                      color: '#F4F6F8',
                      marginBottom: '4px',
                      lineHeight: 1.2,
                    }}>
                      {card.brand}
                    </div>
                    <div style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '11px',
                      color: 'rgba(176,183,188,0.5)',
                    }}>
                      {card.tagline}
                    </div>
                  </div>
                </div>

                {/* Card info */}
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {card.features.map((f, fi) => (
                      <li key={fi} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '13px',
                        color: 'rgba(176,183,188,0.75)',
                      }}>
                        <span style={{
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          background: 'rgba(0,118,182,0.18)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}>
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <path d="M1.5 4L3.5 6L6.5 2" stroke="#0076B6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={card.href}
                    target={card.isLive ? '_blank' : undefined}
                    rel={card.isLive ? 'noopener noreferrer' : undefined}
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      padding: '12px 20px',
                      background: card.isLive ? '#0076B6' : 'transparent',
                      border: `1px solid ${card.isLive ? '#0076B6' : 'rgba(176,183,188,0.2)'}`,
                      borderRadius: '6px',
                      color: card.isLive ? '#fff' : 'rgba(176,183,188,0.7)',
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '10px',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      transition: 'background 0.2s, border-color 0.2s, color 0.2s',
                      marginTop: 'auto',
                    }}
                  >
                    {card.ctaLabel}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WHAT'S INCLUDED AT $197/MONTH
      ══════════════════════════════════════════════════════ */}
      <section style={{
        background: 'var(--bg2, #111114)',
        padding: 'clamp(80px,10vw,120px) clamp(20px,6vw,80px)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(48px,6vw,64px)' }}>
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#0076B6',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
            }}>
              <span style={{ display: 'block', width: '24px', height: '1px', background: '#0076B6' }} />
              What&apos;s Included
              <span style={{ display: 'block', width: '24px', height: '1px', background: '#0076B6' }} />
            </div>
            <h2 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(2rem,4.5vw,3.2rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              color: '#F4F6F8',
              marginBottom: '16px',
              maxWidth: 'none',
            }}>
              Everything a plumbing business needs.<br />Nothing you don&apos;t.
            </h2>
            <p style={{
              fontSize: '17px',
              color: 'rgba(176,183,188,0.65)',
              maxWidth: '460px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}>
              $197/month. All of this. No upsells, no add-ons, no surprises.
            </p>
          </div>

          <div className="features-grid">
            {FEATURES.map((feat, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: '16px',
                padding: 'clamp(20px,2.5vw,28px)',
                background: 'var(--bg, #0a0a0b)',
                border: '1px solid rgba(176,183,188,0.08)',
                borderRadius: '10px',
              }}>
                <div style={{ fontSize: '22px', flexShrink: 0, lineHeight: 1 }}>{feat.icon}</div>
                <div>
                  <div style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: '15px',
                    fontWeight: 700,
                    color: '#F4F6F8',
                    marginBottom: '6px',
                    lineHeight: 1.3,
                  }}>
                    {feat.title}
                  </div>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    lineHeight: 1.65,
                    color: 'rgba(176,183,188,0.6)',
                    margin: 0,
                    maxWidth: 'none',
                  }}>
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PRICING
      ══════════════════════════════════════════════════════ */}
      <section
        id="pricing"
        style={{
          background: 'var(--bg, #0a0a0b)',
          padding: 'clamp(80px,10vw,120px) clamp(20px,6vw,80px)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#0076B6',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
          }}>
            <span style={{ display: 'block', width: '24px', height: '1px', background: '#0076B6' }} />
            Pricing
            <span style={{ display: 'block', width: '24px', height: '1px', background: '#0076B6' }} />
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #001d38 0%, #000e1f 100%)',
            border: '1px solid rgba(0,118,182,0.35)',
            borderRadius: '16px',
            padding: 'clamp(40px,5vw,64px)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Glow */}
            <div style={{
              position: 'absolute',
              top: '-60px', left: '50%',
              transform: 'translateX(-50%)',
              width: '300px', height: '200px',
              background: 'radial-gradient(ellipse, rgba(0,118,182,0.25) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(0,118,182,0.9)',
              marginBottom: '16px',
            }}>
              Plumber Plan
            </div>

            <div style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(3.5rem,8vw,5.5rem)',
              fontWeight: 800,
              color: '#fff',
              lineHeight: 1,
              letterSpacing: '-0.04em',
              marginBottom: '4px',
            }}>
              $197
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '18px',
                fontWeight: 400,
                color: 'rgba(176,183,188,0.5)',
                letterSpacing: 0,
              }}>/mo</span>
            </div>

            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(0,118,182,0.7)',
              marginBottom: '32px',
            }}>
              First 30 days free — no card required
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginBottom: '40px',
              textAlign: 'left',
            }}>
              {[
                'Live, custom demo in 24 hours',
                'Emergency CTA above the fold',
                'Full mobile-first design',
                'Local SEO infrastructure',
                'Google review capture system',
                'Unlimited content updates',
                'Hosting, SSL & backups included',
                'No setup fee. No contract. Cancel anytime.',
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '15px',
                  color: 'rgba(208,216,224,0.85)',
                }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                    <circle cx="8" cy="8" r="7" stroke="rgba(0,118,182,0.5)" strokeWidth="1"/>
                    <path d="M5 8l2.5 2.5L11 5" stroke="#0076B6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {item}
                </div>
              ))}
            </div>

            <a
              href="#demo-request"
              style={{
                display: 'block',
                width: '100%',
                padding: '18px',
                background: '#0076B6',
                color: '#fff',
                fontFamily: "'Syne', sans-serif",
                fontSize: '16px',
                fontWeight: 700,
                letterSpacing: '0.04em',
                textAlign: 'center',
                textDecoration: 'none',
                borderRadius: '6px',
                transition: 'box-shadow 0.3s, transform 0.2s',
              }}
              className="plumber-cta-primary"
            >
              Start Your Free 30 Days →
            </a>

            <p style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '9px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(176,183,188,0.3)',
              marginTop: '16px',
              maxWidth: 'none',
            }}>
              No credit card needed to see your demo. Cancel anytime after trial.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════════════════ */}
      <section style={{
        background: 'var(--bg2, #111114)',
        padding: 'clamp(80px,10vw,120px) clamp(20px,6vw,80px)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(48px,6vw,64px)' }}>
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#0076B6',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
            }}>
              <span style={{ display: 'block', width: '24px', height: '1px', background: '#0076B6' }} />
              How It Works
              <span style={{ display: 'block', width: '24px', height: '1px', background: '#0076B6' }} />
            </div>
            <h2 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(2rem,4.5vw,3.2rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              color: '#F4F6F8',
              maxWidth: 'none',
            }}>
              Three steps. No tech skills needed.
            </h2>
          </div>

          <div className="steps-grid">
            {STEPS.map((step, i) => (
              <div key={i} style={{
                padding: 'clamp(28px,3.5vw,40px)',
                background: 'var(--bg, #0a0a0b)',
                border: '1px solid rgba(176,183,188,0.08)',
                borderRadius: '12px',
                position: 'relative',
              }}>
                <div style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 'clamp(3rem,5vw,4rem)',
                  fontWeight: 800,
                  color: 'rgba(0,118,182,0.15)',
                  lineHeight: 1,
                  marginBottom: '20px',
                  letterSpacing: '-0.04em',
                }}>
                  {step.number}
                </div>
                <h3 style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 'clamp(1.1rem,2vw,1.25rem)',
                  fontWeight: 700,
                  color: '#F4F6F8',
                  marginBottom: '12px',
                  lineHeight: 1.3,
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '15px',
                  lineHeight: 1.7,
                  color: 'rgba(176,183,188,0.65)',
                  margin: 0,
                  maxWidth: 'none',
                }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════════════ */}
      <section style={{
        background: 'var(--bg, #0a0a0b)',
        padding: 'clamp(80px,10vw,120px) clamp(20px,6vw,80px)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(48px,6vw,64px)' }}>
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#0076B6',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
            }}>
              <span style={{ display: 'block', width: '24px', height: '1px', background: '#0076B6' }} />
              From Our Clients
              <span style={{ display: 'block', width: '24px', height: '1px', background: '#0076B6' }} />
            </div>
            <h2 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(2rem,4.5vw,3.2rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              color: '#F4F6F8',
              maxWidth: 'none',
            }}>
              Don&apos;t take our word for it.
            </h2>
            <p style={{
              marginTop: '12px',
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(176,183,188,0.35)',
              maxWidth: 'none',
            }}>
              From local Detroit business owners served by Caliber Web Studio
            </p>
          </div>

          <div className="testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{
                background: 'var(--bg2, #111114)',
                border: '1px solid rgba(176,183,188,0.1)',
                borderRadius: '12px',
                padding: 'clamp(28px,3.5vw,40px)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0,
                  height: '3px',
                  background: 'linear-gradient(90deg, #0076B6, transparent)',
                }} />
                <div style={{
                  fontSize: '14px',
                  color: '#f59e0b',
                  marginBottom: '16px',
                  letterSpacing: '2px',
                }}>
                  {'★'.repeat(t.rating)}
                </div>
                <blockquote style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 'clamp(14px,1.4vw,16px)',
                  lineHeight: 1.75,
                  color: 'rgba(176,183,188,0.82)',
                  fontStyle: 'italic',
                  margin: '0 0 24px',
                  flex: 1,
                }}>
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div style={{ paddingTop: '20px', borderTop: '1px solid rgba(176,183,188,0.08)' }}>
                  <div style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: '15px',
                    color: '#D0D8E0',
                    marginBottom: '3px',
                  }}>
                    {t.name}
                  </div>
                  <div style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '9px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(176,183,188,0.4)',
                  }}>
                    {t.business}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════════ */}
      <section
        id="faq"
        style={{
          background: 'var(--bg2, #111114)',
          padding: 'clamp(80px,10vw,120px) clamp(20px,6vw,80px)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(48px,6vw,64px)' }}>
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#0076B6',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
            }}>
              <span style={{ display: 'block', width: '24px', height: '1px', background: '#0076B6' }} />
              FAQ
              <span style={{ display: 'block', width: '24px', height: '1px', background: '#0076B6' }} />
            </div>
            <h2 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(2rem,4.5vw,3.2rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              color: '#F4F6F8',
              maxWidth: 'none',
            }}>
              Real questions. Straight answers.
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {FAQ_ITEMS.map((item, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--bg, #0a0a0b)',
                  border: '1px solid rgba(176,183,188,0.1)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s',
                  borderColor: openFaq === i ? 'rgba(0,118,182,0.35)' : 'rgba(176,183,188,0.1)',
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    padding: '20px 24px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 'clamp(14px,1.6vw,16px)',
                    fontWeight: 600,
                    color: '#F4F6F8',
                    lineHeight: 1.4,
                  }}>
                    {item.q}
                  </span>
                  <span style={{
                    flexShrink: 0,
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0076B6',
                    transition: 'transform 0.25s',
                    transform: openFaq === i ? 'rotate(45deg)' : 'none',
                  }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </span>
                </button>
                {openFaq === i && (
                  <div style={{
                    padding: '0 24px 20px',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '15px',
                    lineHeight: 1.75,
                    color: 'rgba(176,183,188,0.72)',
                  }}>
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FINAL CTA — Lead capture form
      ══════════════════════════════════════════════════════ */}
      <section
        id="demo-request"
        style={{
          background: 'var(--bg, #0a0a0b)',
          padding: 'clamp(80px,10vw,120px) clamp(20px,6vw,80px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background glow */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(0,118,182,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{
          maxWidth: '660px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
        }}>
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#0076B6',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
          }}>
            <span style={{ display: 'block', width: '24px', height: '1px', background: '#0076B6' }} />
            Get Your Free Demo
            <span style={{ display: 'block', width: '24px', height: '1px', background: '#0076B6' }} />
          </div>

          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(2rem,4.5vw,3.2rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
            color: '#F4F6F8',
            marginBottom: '20px',
            maxWidth: 'none',
          }}>
            See what we&apos;d build for your<br />plumbing business.
          </h2>

          <p style={{
            fontSize: '17px',
            color: 'rgba(176,183,188,0.7)',
            maxWidth: '500px',
            margin: '0 auto 48px',
            lineHeight: 1.7,
          }}>
            No cost. No call required. We&apos;ll have a live demo of your plumbing website
            ready in 24 hours — branded for your business, built to rank.
          </p>

          {success ? (
            <div style={{
              background: 'rgba(0,118,182,0.12)',
              border: '1px solid rgba(0,118,182,0.3)',
              borderRadius: '12px',
              padding: '48px 40px',
            }}>
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>✓</div>
              <div style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '20px',
                fontWeight: 700,
                color: '#F4F6F8',
                marginBottom: '12px',
              }}>
                We&apos;re on it.
              </div>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '15px',
                color: 'rgba(176,183,188,0.7)',
                lineHeight: 1.7,
                maxWidth: 'none',
              }}>
                Your demo will be ready within 24 hours.
                Check your email — we&apos;ll send the link directly to you.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                background: 'var(--bg2, #111114)',
                border: '1px solid rgba(176,183,188,0.1)',
                borderRadius: '12px',
                padding: 'clamp(32px,4vw,48px)',
                textAlign: 'left',
              }}
            >
              <div className="form-grid">
                <div>
                  <label style={labelStyle}>Business Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Metro Plumbing & Drain"
                    value={form.businessName}
                    onChange={e => setForm(f => ({ ...f, businessName: e.target.value }))}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>City / State *</label>
                  <input
                    type="text"
                    required
                    placeholder="Detroit, MI"
                    value={form.city}
                    onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="(313) 555-0100"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="owner@yourplumbing.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    style={inputStyle}
                  />
                </div>
              </div>

              {formError && (
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '13px',
                  color: '#f87171',
                  marginTop: '16px',
                  maxWidth: 'none',
                }}>
                  {formError}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                style={{
                  display: 'block',
                  width: '100%',
                  marginTop: '24px',
                  padding: '18px',
                  background: submitting ? 'rgba(0,118,182,0.5)' : '#0076B6',
                  color: '#fff',
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '16px',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  transition: 'box-shadow 0.3s, transform 0.2s',
                }}
                className={submitting ? '' : 'plumber-cta-primary'}
              >
                {submitting ? 'Sending…' : 'Get My Free Demo in 24 Hours →'}
              </button>

              <p style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '9px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(176,183,188,0.25)',
                textAlign: 'center',
                marginTop: '16px',
                maxWidth: 'none',
              }}>
                No credit card. No obligation. Just your demo.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ── STYLES ─────────────────────────────────────────── */}
      <style>{`
        .plumber-cta-primary:hover {
          box-shadow: 0 0 32px rgba(0,118,182,0.5), 0 0 64px rgba(0,118,182,0.2);
          transform: translateY(-2px);
        }
        .plumber-cta-secondary:hover {
          border-color: rgba(176,183,188,0.45);
          color: #D0D8E0;
        }
        @keyframes bounce-chevron-p {
          0%, 100% { transform: translateY(0); opacity: 0.35; }
          50% { transform: translateY(8px); opacity: 0.75; }
        }
        .chevron-bounce-p { animation: bounce-chevron-p 2s ease-in-out infinite; }

        .problem-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(16px, 2vw, 24px);
        }
        .demo-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(16px, 2vw, 24px);
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(12px, 1.5vw, 16px);
        }
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(16px, 2vw, 24px);
        }
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(16px, 2.5vw, 24px);
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 900px) {
          .problem-grid { grid-template-columns: 1fr; }
          .demo-grid { grid-template-columns: 1fr; }
          .steps-grid { grid-template-columns: 1fr; }
          .testimonials-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .features-grid { grid-template-columns: 1fr; }
          .form-grid { grid-template-columns: 1fr; }
        }
        input::placeholder { color: rgba(176,183,188,0.25); }
        input:focus { border-color: rgba(0,118,182,0.5); }
      `}</style>
    </>
  );
}
