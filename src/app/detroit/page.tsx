import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import DetroitScrollVideo from '@/components/DetroitScrollVideo';

/**
 * /detroit — hidden portfolio flex page.
 *
 * Not linked in nav. Darrin shares this URL directly with Detroit prospects
 * to show Detroit pride, mission, and credibility. Vibe: love letter to the
 * city, not a standard marketing page.
 *
 * NOTE: No ScrollReveal on this page — all content below the 350vh frame
 * sequencer would stay at opacity:0 until the IntersectionObserver fired,
 * making the text unreadable. Content is always visible here.
 */
export const metadata: Metadata = {
  title: { absolute: 'Detroit | Caliber Web Studio — Built in Detroit, For Detroit' },
  description:
    'Caliber Web Studio is Detroit-built and Detroit-proud. Our mission: help every local business get found online so the city that built the world can be found by it.',
  alternates: { canonical: 'https://caliberwebstudio.com/detroit' },
  openGraph: {
    title: "Detroit Built The World. We're Making Sure The World Finds It Again.",
    description:
      'Caliber Web Studio — Detroit-rooted digital studio. Helping local businesses get found online.',
    url: 'https://caliberwebstudio.com/detroit',
    type: 'website',
    images: [
      {
        url: '/logo-full-hero.png',
        alt: 'Caliber Web Studio — Built in Detroit',
        width: 1200,
        height: 630,
      },
    ],
  },
};

const detroitStats = [
  {
    number: '76,000+',
    label: 'Registered small businesses in Detroit — most invisible to their next customer',
  },
  {
    number: '97%',
    label: 'Of consumers search online before visiting a local business',
  },
  {
    number: 'Only 17%',
    label: 'Of local businesses say their website actually brings in new customers',
  },
];

const helpCards = [
  {
    icon: '◈',
    title: 'Get Found on Google',
    body: 'We engineer sites that rank on Google Maps, local search, and AI tools — so the customers who need your service find you first, not your competitor.',
  },
  {
    icon: '◎',
    title: 'Capture Leads 24/7',
    body: 'AI chatbots, click-to-call, and optimized contact flows. Your site works while you work — and while you sleep.',
  },
  {
    icon: '◉',
    title: 'Look the Part',
    body: 'Enterprise-level design at a price that makes sense for local businesses. Not a template. Not a drag-and-drop builder. A real system.',
  },
  {
    icon: '◐',
    title: 'Build Your Reputation',
    body: 'Five-star reviews, social proof, and trust signals that turn Google searchers into paying customers — automatically.',
  },
];

export default function DetroitPage() {
  return (
    <>
      <Nav />
      <main data-detroit style={{ background: '#0a0a0b', color: '#D0D8E0', minHeight: '100vh' }}>

        {/* ── Scroll-driven frame sequence — the truck builds as you scroll ── */}
        <DetroitScrollVideo />

        {/* ── Hero manifesto ─────────────────────────────────────────────── */}
        <section style={{
          padding: 'clamp(100px, 14vw, 160px) clamp(20px, 6vw, 80px)',
          textAlign: 'center',
          background: '#0a0a0b',
          borderBottom: '1px solid rgba(176,183,188,0.1)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,118,182,0.13) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{ position: 'relative' }}>
            <p style={{
              fontFamily: "var(--font-space-mono,'Space Mono',monospace)",
              fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase',
              color: '#0076B6', marginBottom: '28px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px',
            }}>
              <span style={{ display: 'block', width: '32px', height: '1px', background: '#0076B6' }} />
              Detroit First
              <span style={{ display: 'block', width: '32px', height: '1px', background: '#0076B6' }} />
            </p>
            <h1 style={{
              fontFamily: "var(--font-syne,'Syne',sans-serif)",
              fontWeight: 800,
              fontSize: 'clamp(2.6rem, 6.5vw, 5.5rem)',
              lineHeight: 0.97,
              letterSpacing: '-0.04em',
              color: '#ffffff',
              margin: '0 auto 8px',
              maxWidth: '960px',
            }}>
              Detroit Built The World.
            </h1>
            <h2 style={{
              fontFamily: "var(--font-syne,'Syne',sans-serif)",
              fontWeight: 800,
              fontSize: 'clamp(2.6rem, 6.5vw, 5.5rem)',
              lineHeight: 0.97,
              letterSpacing: '-0.04em',
              color: '#0076B6',
              margin: '0 auto 40px',
              maxWidth: '960px',
            }}>
              We&apos;re Making Sure<br />The World Finds It Again.
            </h2>
            <p style={{
              fontFamily: "var(--font-inter,'Inter',sans-serif)",
              fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
              color: 'rgba(208,216,224,0.78)',
              maxWidth: '640px',
              margin: '0 auto',
              lineHeight: 1.78,
            }}>
              The Motor City gave the world the assembly line, Motown, and a blueprint for
              American grit. Our mission is simple: make sure every great Detroit business
              gets found online.
            </p>
          </div>
        </section>

        {/* ── Detroit reality stats ───────────────────────────────────────── */}
        <section style={{
          padding: 'clamp(80px, 10vw, 120px) clamp(20px, 6vw, 80px)',
          background: '#0f0f10',
          borderBottom: '1px solid rgba(176,183,188,0.1)',
        }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <p style={{
              fontFamily: "var(--font-space-mono,'Space Mono',monospace)",
              fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#0076B6', marginBottom: '12px',
              display: 'flex', alignItems: 'center', gap: '10px',
            }}>
              <span style={{ display: 'block', width: '24px', height: '1px', background: '#0076B6' }} />
              The Reality
            </p>
            <h2 style={{
              fontFamily: "var(--font-syne,'Syne',sans-serif)",
              fontWeight: 800,
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              color: '#ffffff', lineHeight: 1.05, letterSpacing: '-0.03em',
              marginBottom: 'clamp(48px, 6vw, 72px)', maxWidth: '660px',
            }}>
              Great businesses.<br />Invisible online.
            </h2>
            <div className="detroit-stats-grid">
              {detroitStats.map((stat) => (
                <div key={stat.label} style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(0,118,182,0.18)',
                  borderRadius: '6px',
                  padding: 'clamp(28px, 4vw, 44px) clamp(20px, 3vw, 32px)',
                  position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                    background: 'linear-gradient(to right, #0076B6, transparent)',
                  }} />
                  <div style={{
                    fontFamily: "var(--font-syne,'Syne',sans-serif)",
                    fontWeight: 800,
                    fontSize: 'clamp(2rem, 5vw, 4rem)',
                    lineHeight: 1, letterSpacing: '-0.03em',
                    color: '#0076B6', marginBottom: '12px',
                  }}>{stat.number}</div>
                  <div style={{
                    fontFamily: "var(--font-inter,'Inter',sans-serif)",
                    fontSize: 'clamp(13px, 1.4vw, 15px)',
                    color: 'rgba(208,216,224,0.72)',
                    lineHeight: 1.6,
                  }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Our Mission ─────────────────────────────────────────────────── */}
        <section style={{
          padding: 'clamp(80px, 10vw, 140px) clamp(20px, 6vw, 80px)',
          background: '#0a0a0b',
          borderBottom: '1px solid rgba(176,183,188,0.1)',
        }}>
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <p style={{
              fontFamily: "var(--font-space-mono,'Space Mono',monospace)",
              fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#0076B6', marginBottom: '12px',
              display: 'flex', alignItems: 'center', gap: '10px',
            }}>
              <span style={{ display: 'block', width: '24px', height: '1px', background: '#0076B6' }} />
              Our Mission
            </p>
            <h2 style={{
              fontFamily: "var(--font-syne,'Syne',sans-serif)",
              fontWeight: 800,
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              color: '#ffffff', lineHeight: 1.0, letterSpacing: '-0.035em',
              marginBottom: '36px',
            }}>
              Help every Detroit business{' '}
              <span style={{ color: '#0076B6' }}>get found.</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <p style={{
                fontFamily: "var(--font-inter,'Inter',sans-serif)",
                fontSize: 'clamp(16px, 1.6vw, 18px)', color: 'rgba(208,216,224,0.85)', lineHeight: 1.85,
              }}>
                Detroit built the world. The assembly line. Motown. The middle class. The
                city&apos;s fingerprints are on everything. But right now, too many of its
                best businesses are invisible online — losing customers every day to
                competitors who spent more on ads or stumbled into a decent template.
              </p>
              <p style={{
                fontFamily: "var(--font-inter,'Inter',sans-serif)",
                fontSize: 'clamp(16px, 1.6vw, 18px)', color: 'rgba(208,216,224,0.85)', lineHeight: 1.85,
              }}>
                We started Caliber Web Studio with one goal: level the playing field. Give
                Detroit&apos;s local businesses access to the same enterprise-level web
                systems that national brands pay agencies six figures to build — at a price
                that actually makes sense.
              </p>
              <p style={{
                fontFamily: "var(--font-inter,'Inter',sans-serif)",
                fontSize: 'clamp(16px, 1.6vw, 18px)', color: '#ffffff', lineHeight: 1.85, fontWeight: 500,
              }}>
                If your business is great, Detroit deserves to know about it.
                That&apos;s what we&apos;re here for.
              </p>
            </div>
          </div>
        </section>

        {/* ── How we help ─────────────────────────────────────────────────── */}
        <section style={{
          padding: 'clamp(80px, 10vw, 140px) clamp(20px, 6vw, 80px)',
          background: '#0f0f10',
          borderBottom: '1px solid rgba(176,183,188,0.1)',
        }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <p style={{
              fontFamily: "var(--font-space-mono,'Space Mono',monospace)",
              fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#0076B6', marginBottom: '12px',
              display: 'flex', alignItems: 'center', gap: '10px',
            }}>
              <span style={{ display: 'block', width: '24px', height: '1px', background: '#0076B6' }} />
              How We Help
            </p>
            <h2 style={{
              fontFamily: "var(--font-syne,'Syne',sans-serif)",
              fontWeight: 800,
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              color: '#ffffff', lineHeight: 1.05, letterSpacing: '-0.03em',
              marginBottom: 'clamp(48px, 6vw, 72px)', maxWidth: '660px',
            }}>
              We don&apos;t just build sites.<br />
              We build your entire online presence.
            </h2>
            <div className="detroit-cards-grid">
              {helpCards.map((card) => (
                <div key={card.title}
                  className="detroit-help-card"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(176,183,188,0.09)',
                    borderRadius: '6px',
                    padding: 'clamp(28px, 4vw, 44px)',
                    transition: 'border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                >
                  <div style={{ fontSize: '28px', color: '#0076B6', marginBottom: '16px', lineHeight: 1 }}>
                    {card.icon}
                  </div>
                  <h3 style={{
                    fontFamily: "var(--font-syne,'Syne',sans-serif)",
                    fontWeight: 800, fontSize: 'clamp(18px, 2vw, 22px)',
                    color: '#ffffff', marginBottom: '10px',
                    letterSpacing: '-0.02em', lineHeight: 1.2,
                  }}>{card.title}</h3>
                  <p style={{
                    fontFamily: "var(--font-inter,'Inter',sans-serif)",
                    fontSize: '15px', color: 'rgba(208,216,224,0.72)', lineHeight: 1.75, margin: 0,
                  }}>{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────────────────── */}
        <section style={{
          padding: 'clamp(100px, 12vw, 160px) clamp(20px, 6vw, 80px)',
          background: '#0a0a0b',
          textAlign: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,118,182,0.11) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{ position: 'relative', maxWidth: '700px', margin: '0 auto' }}>
            <p style={{
              fontFamily: "var(--font-space-mono,'Space Mono',monospace)",
              fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase',
              color: '#0076B6', marginBottom: '24px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px',
            }}>
              <span style={{ display: 'block', width: '32px', height: '1px', background: '#0076B6' }} />
              Is Your Business Invisible?
              <span style={{ display: 'block', width: '32px', height: '1px', background: '#0076B6' }} />
            </p>
            <h2 style={{
              fontFamily: "var(--font-syne,'Syne',sans-serif)",
              fontWeight: 800,
              fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)',
              lineHeight: 0.97, letterSpacing: '-0.04em',
              color: '#ffffff', marginBottom: '20px',
            }}>
              Let&apos;s change that.
            </h2>
            <p style={{
              fontFamily: "var(--font-inter,'Inter',sans-serif)",
              fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
              color: 'rgba(208,216,224,0.72)',
              maxWidth: '520px', margin: '0 auto 44px', lineHeight: 1.75,
            }}>
              See your custom website before you commit. Free mockup, built around your
              business, delivered in&nbsp;48&nbsp;hours.
            </p>
            <Link
              href="/contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                padding: '18px 52px',
                background: '#0076B6', color: '#fff',
                fontFamily: "var(--font-syne,'Syne',sans-serif)",
                fontSize: '16px', fontWeight: 700, letterSpacing: '0.04em',
                textDecoration: 'none', borderRadius: '4px',
                transition: 'box-shadow 0.3s ease, transform 0.2s ease',
              }}
            >
              Get Your Free Mockup Today →
            </Link>
          </div>
        </section>

      </main>
      <Footer />

      <style>{`
        .detroit-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(12px, 2vw, 20px);
        }
        .detroit-cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(12px, 2vw, 20px);
        }
        .detroit-help-card:hover {
          border-color: rgba(0,118,182,0.35);
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(0,118,182,0.12);
        }
        @media (max-width: 860px) {
          .detroit-stats-grid { grid-template-columns: 1fr; }
          .detroit-cards-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
