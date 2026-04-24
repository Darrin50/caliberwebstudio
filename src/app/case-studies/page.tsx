import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { caseStudies } from './data';

export const metadata: Metadata = {
  title: { absolute: 'Our Work | Caliber Web Studio' },
  description:
    'Real results for real Detroit businesses. See how Caliber Web Studio transformed local businesses with websites that rank, convert, and generate revenue.',
  alternates: { canonical: 'https://www.caliberwebstudio.com/case-studies' },
  openGraph: {
    title: 'Our Work | Caliber Web Studio',
    description:
      'Real results for real Detroit businesses — 340% more bookings, #1 Google rankings, 200% more online orders. See how we do it.',
    url: 'https://www.caliberwebstudio.com/case-studies',
    siteName: 'Caliber Web Studio',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Our Work | Caliber Web Studio',
  description: 'Case studies showing real results for Detroit small businesses.',
  url: 'https://www.caliberwebstudio.com/case-studies',
  publisher: {
    '@type': 'Organization',
    name: 'Caliber Web Studio',
    url: 'https://www.caliberwebstudio.com',
  },
};

const aggregateStats = [
  { value: '50+', label: 'Websites Built' },
  { value: '4.9/5', label: 'Client Rating' },
  { value: '$2.1M+', label: 'Revenue Generated for Clients' },
];

export default function CaseStudiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main style={{ background: 'var(--bg)', color: 'var(--silver)', minHeight: '100vh' }}>

        {/* ── Hero ── */}
        <section style={{
          padding: 'clamp(100px,14vw,160px) clamp(20px,6vw,80px) clamp(60px,8vw,100px)',
          textAlign: 'center',
          borderBottom: '1px solid var(--border)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(30,61,143,0.18) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <p style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '11px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'var(--chrome)',
            marginBottom: '24px',
          }}>Client Results</p>
          <h1 style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(36px,6vw,76px)',
            lineHeight: 1.0,
            color: 'var(--white)',
            marginBottom: '24px',
          }}>
            Real Results for<br />Real Businesses.
          </h1>
          <p style={{
            fontSize: 'clamp(16px,2vw,20px)',
            color: 'var(--chrome)',
            maxWidth: '600px',
            margin: '0 auto 48px',
            lineHeight: 1.7,
          }}>
            See how Detroit businesses transformed their online presence with Caliber Web Studio.
            Every number below is real. Every site is live.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '11px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--bg)',
              background: 'var(--chrome)',
              padding: '14px 32px',
              textDecoration: 'none',
              fontWeight: 700,
              transition: 'transform 0.15s ease-out',
              display: 'inline-block',
            }}>Start Your Project</Link>
            <Link href="/pricing" style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '11px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--chrome)',
              border: '1px solid var(--border)',
              padding: '14px 32px',
              textDecoration: 'none',
              transition: 'border-color 0.2s, color 0.2s',
              display: 'inline-block',
            }}>View Pricing →</Link>
          </div>
        </section>

        {/* ── Aggregate Results Banner ── */}
        <section style={{
          borderBottom: '1px solid var(--border)',
          background: 'rgba(30,61,143,0.06)',
        }}>
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: 'clamp(36px,5vw,56px) clamp(20px,5vw,60px)',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '32px',
          }}>
            {aggregateStats.map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(32px,4vw,52px)',
                  color: 'var(--white)',
                  lineHeight: 1,
                  marginBottom: '8px',
                }}>{stat.value}</div>
                <div style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '10px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'var(--chrome)',
                }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Case Study Cards ── */}
        <section style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,60px)',
        }}>
          <div className="cs-card-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(520px, 1fr))',
            gap: '32px',
          }}>
            {caseStudies.map((cs) => (
              <article key={cs.slug} className="cs-card" style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                overflow: 'hidden',
              }}>
                {/* Card Image */}
                <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
                  <img
                    src={cs.cardImg}
                    alt={cs.heroAlt}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)',
                  }} />
                  {/* Result stat badge */}
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: 'rgba(0,0,0,0.8)',
                    backdropFilter: 'blur(8px)',
                    border: `1px solid ${cs.accentColor}50`,
                    borderRadius: '10px',
                    padding: '12px 18px',
                    textAlign: 'center',
                  }}>
                    <div style={{
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 800,
                      fontSize: '22px',
                      color: cs.accentColor,
                      lineHeight: 1,
                    }}>{cs.resultStat}</div>
                    <div style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '8px',
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.7)',
                      marginTop: '4px',
                      lineHeight: 1.3,
                    }}>{cs.resultLabel}</div>
                  </div>
                  {/* Industry tag */}
                  <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
                    <span style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '10px',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.7)',
                      background: 'rgba(0,0,0,0.5)',
                      backdropFilter: 'blur(4px)',
                      padding: '5px 10px',
                      borderRadius: '4px',
                    }}>{cs.industry}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div style={{ padding: '28px 28px 24px' }}>
                  <h2 style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 800,
                    fontSize: 'clamp(20px,2.5vw,26px)',
                    color: 'var(--white)',
                    marginBottom: '8px',
                    lineHeight: 1.2,
                  }}>{cs.title}</h2>
                  <p style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 600,
                    fontSize: '14px',
                    color: cs.accentColor,
                    marginBottom: '16px',
                  }}>{cs.tagline}</p>

                  {/* Before / After */}
                  <div style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{
                        fontFamily: 'Space Mono, monospace',
                        fontSize: '9px',
                        letterSpacing: '1.5px',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.35)',
                        background: 'rgba(255,255,255,0.06)',
                        padding: '3px 7px',
                        borderRadius: '3px',
                        flexShrink: 0,
                        marginTop: '1px',
                      }}>Before</span>
                      <p style={{ fontSize: '13px', color: 'rgba(208,216,224,0.65)', lineHeight: 1.6, margin: 0 }}>{cs.beforeStory}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{
                        fontFamily: 'Space Mono, monospace',
                        fontSize: '9px',
                        letterSpacing: '1.5px',
                        textTransform: 'uppercase',
                        color: cs.accentColor,
                        background: `${cs.accentColor}18`,
                        padding: '3px 7px',
                        borderRadius: '3px',
                        flexShrink: 0,
                        marginTop: '1px',
                      }}>After</span>
                      <p style={{ fontSize: '13px', color: 'var(--chrome)', lineHeight: 1.6, margin: 0 }}>{cs.afterStory}</p>
                    </div>
                  </div>

                  {/* Result callout */}
                  <div style={{
                    background: `${cs.accentColor}10`,
                    border: `1px solid ${cs.accentColor}30`,
                    borderRadius: '8px',
                    padding: '12px 16px',
                    marginBottom: '24px',
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '8px',
                  }}>
                    <span style={{
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 800,
                      fontSize: '24px',
                      color: cs.accentColor,
                    }}>{cs.resultStat}</span>
                    <span style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '11px',
                      color: 'var(--chrome)',
                    }}>{cs.resultLabel} {cs.resultPeriod}</span>
                  </div>

                  {/* CTA buttons */}
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <Link href={`/case-studies/${cs.slug}`} style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '11px',
                      letterSpacing: '1.5px',
                      textTransform: 'uppercase',
                      color: 'var(--bg)',
                      background: cs.accentColor,
                      padding: '11px 20px',
                      textDecoration: 'none',
                      fontWeight: 700,
                      display: 'inline-block',
                      borderRadius: '4px',
                    }}>View Case Study</Link>
                    <Link href={`/demo/${cs.demoSlug}`} style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '11px',
                      letterSpacing: '1.5px',
                      textTransform: 'uppercase',
                      color: 'var(--chrome)',
                      border: '1px solid var(--border)',
                      padding: '11px 20px',
                      textDecoration: 'none',
                      display: 'inline-block',
                      borderRadius: '4px',
                    }}>Live Demo →</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section style={{
          padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,80px)',
          textAlign: 'center',
          borderTop: '1px solid var(--border)',
          background: 'var(--bg2)',
        }}>
          <p style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '11px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'var(--chrome)',
            marginBottom: '24px',
          }}>Ready to be our next case study?</p>
          <h2 style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(28px,4vw,52px)',
            color: 'var(--white)',
            marginBottom: '20px',
            lineHeight: 1.1,
          }}>
            Start Your Project Today.
          </h2>
          <p style={{
            color: 'var(--chrome)',
            fontSize: 'clamp(15px,1.8vw,18px)',
            maxWidth: '500px',
            margin: '0 auto 40px',
            lineHeight: 1.7,
          }}>
            Join Detroit businesses already getting more calls, more bookings, and more revenue from their websites.
            Start with a free mockup — no commitment required.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '12px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--bg)',
              background: 'var(--chrome)',
              padding: '16px 40px',
              textDecoration: 'none',
              fontWeight: 700,
              display: 'inline-block',
            }}>Get a Free Mockup</Link>
            <Link href="/pricing" style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '12px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--chrome)',
              border: '1px solid var(--border)',
              padding: '16px 40px',
              textDecoration: 'none',
              display: 'inline-block',
            }}>View Pricing</Link>
          </div>
        </section>

        <style>{`
          @media (max-width: 1100px) {
            .cs-card-grid { grid-template-columns: 1fr !important; }
          }
          .cs-card {
            transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
          }
          .cs-card:hover {
            transform: translateY(-6px);
            border-color: rgba(168,184,200,0.25) !important;
            box-shadow: 0 20px 60px rgba(0,0,0,0.4);
          }
        `}</style>

      </main>
      <Footer />
    </>
  );
}
