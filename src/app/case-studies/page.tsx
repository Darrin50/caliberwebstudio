import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { caseStudies } from './data';

export const metadata: Metadata = {
  title: { absolute: 'Case Studies | Caliber Web Studio' },
  description:
    "See how Caliber Web Studio builds websites that get results. Real case studies for Detroit Cuts, Metro Plumbing, Luxe Salon, and Detroit's Kitchen.",
  alternates: { canonical: 'https://caliberwebstudio.com/case-studies' },
  openGraph: {
    title: 'Case Studies | Caliber Web Studio',
    description:
      'See how Caliber Web Studio builds websites that get results for Detroit small businesses.',
    url: 'https://caliberwebstudio.com/case-studies',
    siteName: 'Caliber Web Studio',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Case Studies | Caliber Web Studio',
  description: 'Portfolio of web design projects and results for Detroit small businesses.',
  url: 'https://caliberwebstudio.com/case-studies',
  publisher: {
    '@type': 'Organization',
    name: 'Caliber Web Studio',
    url: 'https://caliberwebstudio.com',
  },
};

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
          }}>Portfolio</p>
          <h1 style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(36px,6vw,76px)',
            lineHeight: 1.0,
            color: 'var(--white)',
            marginBottom: '24px',
          }}>
            Our Work Speaks<br />For Itself.
          </h1>
          <p style={{
            fontSize: 'clamp(16px,2vw,20px)',
            color: 'var(--chrome)',
            maxWidth: '560px',
            margin: '0 auto 48px',
            lineHeight: 1.7,
          }}>
            Four Detroit businesses. Four real problems. Four websites built to get results.
            Here's what happened.
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
            <Link href="/demo/detroit-cuts" style={{
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
            }}>See Live Demos</Link>
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
            {caseStudies.map((cs, i) => (
              <Link
                key={cs.slug}
                href={`/case-studies/${cs.slug}`}
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <article className="cs-card" style={{
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
                      background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 100%)',
                    }} />
                    {/* Key metric badge */}
                    <div style={{
                      position: 'absolute',
                      top: '20px',
                      right: '20px',
                      background: 'rgba(0,0,0,0.75)',
                      backdropFilter: 'blur(8px)',
                      border: `1px solid ${cs.accentColor}40`,
                      borderRadius: '8px',
                      padding: '10px 16px',
                      textAlign: 'center',
                    }}>
                      <div style={{
                        fontFamily: 'Syne, sans-serif',
                        fontWeight: 800,
                        fontSize: '22px',
                        color: cs.accentColor,
                        lineHeight: 1,
                      }}>{cs.keyMetric}</div>
                      <div style={{
                        fontFamily: 'Space Mono, monospace',
                        fontSize: '9px',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.6)',
                        marginTop: '4px',
                        maxWidth: '90px',
                        lineHeight: 1.3,
                      }}>{cs.keyMetricLabel}</div>
                    </div>
                    {/* Industry tag */}
                    <div style={{
                      position: 'absolute',
                      bottom: '20px',
                      left: '20px',
                    }}>
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
                      marginBottom: '14px',
                    }}>{cs.tagline}</p>
                    <p style={{
                      fontSize: '14px',
                      color: 'var(--chrome)',
                      lineHeight: 1.7,
                      marginBottom: '24px',
                    }}>{cs.cardDesc}</p>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '11px',
                      letterSpacing: '1.5px',
                      textTransform: 'uppercase',
                      color: cs.accentColor,
                    }}>
                      Read Case Study
                      <span style={{ fontSize: '14px' }}>→</span>
                    </div>
                  </div>
                </article>
              </Link>
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
          }}>Ready to be next?</p>
          <h2 style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(28px,4vw,52px)',
            color: 'var(--white)',
            marginBottom: '20px',
            lineHeight: 1.1,
          }}>
            See Your Business Built.<br />Free.
          </h2>
          <p style={{
            color: 'var(--chrome)',
            fontSize: 'clamp(15px,1.8vw,18px)',
            maxWidth: '480px',
            margin: '0 auto 40px',
            lineHeight: 1.7,
          }}>
            We'll build a free mockup of your business before you spend a dollar.
            No commitment. Just results.
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
