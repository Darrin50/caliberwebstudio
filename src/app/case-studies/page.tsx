import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { portfolioDemos } from '@/lib/demos-library-data';

export const metadata: Metadata = {
  title: { absolute: 'Demo Library | Caliber Web Studio' },
  description:
    'Explore Caliber Web Studio\'s demo library — illustrative website samples for barbershops, salons, restaurants, plumbing companies, and medical spas across Metro Detroit.',
  alternates: { canonical: 'https://www.caliberwebstudio.com/case-studies' },
  openGraph: {
    title: 'Demo Library | Caliber Web Studio',
    description:
      'Illustrative demo websites showing what a Caliber Web Studio build looks like for Detroit-area local businesses.',
    url: 'https://www.caliberwebstudio.com/case-studies',
    siteName: 'Caliber Web Studio',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Demo Library | Caliber Web Studio',
  description: 'Illustrative website demo samples built by Caliber Web Studio for Detroit-area local businesses.',
  url: 'https://www.caliberwebstudio.com/case-studies',
  publisher: {
    '@type': 'Organization',
    name: 'Caliber Web Studio',
    url: 'https://www.caliberwebstudio.com',
  },
};

const industryColors: Record<string, string> = {
  'Barbershop': '#C9A84C',
  'Natural Hair Salon': '#C9956C',
  'Soul Food Restaurant': '#D4A017',
  'Plumbing / Home Services': '#E8631A',
};

const industryHeroImgs: Record<string, string> = {
  'Barbershop': 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&auto=format&fit=crop&q=80',
  'Natural Hair Salon': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
  'Soul Food Restaurant': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80',
  'Plumbing / Home Services': 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&auto=format&fit=crop&q=80',
};

export default function DemoLibraryPage() {
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
          }}>Demo Library</p>
          <h1 style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(36px,6vw,76px)',
            lineHeight: 1.0,
            color: 'var(--white)',
            marginBottom: '24px',
          }}>
            See What We Build.
          </h1>
          <p style={{
            fontSize: 'clamp(16px,2vw,20px)',
            color: 'var(--chrome)',
            maxWidth: '620px',
            margin: '0 auto 48px',
            lineHeight: 1.7,
          }}>
            Illustrative demo websites for Detroit-area local businesses — barbershops, salons, restaurants, home services, and med spas.
            These are sample builds, not live client sites.
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

        {/* ── Disclaimer Banner ── */}
        <section style={{
          background: 'rgba(255,255,255,0.03)',
          borderBottom: '1px solid var(--border)',
          padding: '16px clamp(20px,5vw,60px)',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '10px',
            letterSpacing: '1.5px',
            color: 'var(--chrome)',
            margin: 0,
          }}>
            ✦ All demos below use illustrative brand names, placeholder photos, and example content — not real businesses or real data.
          </p>
        </section>

        {/* ── Portfolio Demo Cards ── */}
        <section style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,60px)',
        }}>
          <p style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '10px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'var(--chrome)',
            marginBottom: '32px',
          }}>Local Business Demos</p>
          <div className="cs-card-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(520px, 1fr))',
            gap: '32px',
          }}>
            {portfolioDemos.map((demo) => {
              const accent = industryColors[demo.industry] ?? '#A8B8C8';
              const img = industryHeroImgs[demo.industry] ?? '';
              return (
                <article key={demo.slug} className="cs-card" style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                }}>
                  {/* Card Image */}
                  <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
                    {img && (
                      <img
                        src={img}
                        alt={`${demo.fakeName} demo preview`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    )}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)',
                    }} />
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
                      }}>{demo.industry}</span>
                    </div>
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      background: 'rgba(0,0,0,0.7)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '6px',
                      padding: '6px 12px',
                    }}>
                      <span style={{
                        fontFamily: 'Space Mono, monospace',
                        fontSize: '9px',
                        letterSpacing: '1.5px',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.55)',
                      }}>Demo</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div style={{ padding: '28px 28px 24px' }}>
                    <h2 style={{
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 800,
                      fontSize: 'clamp(18px,2.2vw,22px)',
                      color: 'var(--white)',
                      marginBottom: '8px',
                      lineHeight: 1.2,
                    }}>{demo.fakeName}</h2>
                    <p style={{
                      fontSize: '14px',
                      color: 'var(--chrome)',
                      lineHeight: 1.65,
                      marginBottom: '20px',
                    }}>{demo.description}</p>

                    {/* Highlights */}
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px',
                      marginBottom: '24px',
                    }}>
                      {demo.highlights.map((h) => (
                        <span key={h} style={{
                          fontFamily: 'Space Mono, monospace',
                          fontSize: '9px',
                          letterSpacing: '1px',
                          textTransform: 'uppercase',
                          color: accent,
                          border: `1px solid ${accent}30`,
                          background: `${accent}10`,
                          padding: '4px 10px',
                          borderRadius: '4px',
                        }}>{h}</span>
                      ))}
                    </div>

                    {/* CTA */}
                    <Link href={`/demos/${demo.slug}`} style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '11px',
                      letterSpacing: '1.5px',
                      textTransform: 'uppercase',
                      color: 'var(--bg)',
                      background: accent,
                      padding: '11px 20px',
                      textDecoration: 'none',
                      fontWeight: 700,
                      display: 'inline-block',
                      borderRadius: '4px',
                    }}>View Demo →</Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ── Med Spa Demos ── */}
        <section style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 clamp(20px,5vw,60px) clamp(60px,8vw,100px)',
        }}>
          <p style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '10px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'var(--chrome)',
            marginBottom: '32px',
          }}>Med Spa Demos</p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
          }}>
            {[
              {
                slug: 'med-spa-growth',
                name: 'Luminary Wellness & Aesthetics',
                location: 'Southfield, MI',
                description: 'Full-service med spa demo with growth-focused structure — treatment finder, service pathways, provider profiles, and goal-based booking.',
                accent: '#6B4E71',
              },
              {
                slug: 'aesthetics-clinic',
                name: 'Meridian Skin Studio',
                location: 'Royal Oak, MI',
                description: 'Precision aesthetics clinic demo with clinical framing — advanced injectables, laser, skin, and wellness pathways.',
                accent: '#3A5A7C',
              },
              {
                slug: 'injectables-studio',
                name: 'Elara Injectable Arts',
                location: 'Detroit, MI',
                description: 'Boutique injectable studio demo with artisan positioning — focused service menu, provider story, and streamlined booking flow.',
                accent: '#7C3D52',
              },
            ].map((spa) => (
              <article key={spa.slug} className="cs-card" style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                overflow: 'hidden',
              }}>
                <div style={{
                  height: '8px',
                  background: spa.accent,
                }} />
                <div style={{ padding: '24px' }}>
                  <div style={{
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '9px',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    color: spa.accent,
                    marginBottom: '10px',
                  }}>Medical Spa Demo · {spa.location}</div>
                  <h3 style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 800,
                    fontSize: '18px',
                    color: 'var(--white)',
                    marginBottom: '10px',
                    lineHeight: 1.2,
                  }}>{spa.name}</h3>
                  <p style={{
                    fontSize: '13px',
                    color: 'var(--chrome)',
                    lineHeight: 1.65,
                    marginBottom: '20px',
                  }}>{spa.description}</p>
                  <Link href={`/demos/${spa.slug}`} style={{
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '10px',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    color: 'var(--bg)',
                    background: spa.accent,
                    padding: '10px 18px',
                    textDecoration: 'none',
                    fontWeight: 700,
                    display: 'inline-block',
                    borderRadius: '4px',
                  }}>View Demo →</Link>
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
          }}>Ready to build yours?</p>
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
            We build custom sites for Detroit-area local businesses. Start with a free mockup — no commitment required.
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
