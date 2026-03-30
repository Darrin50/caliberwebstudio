import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { caseStudies, getCaseStudy } from '../data';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return {
    title: { absolute: `${cs.title} Case Study | Caliber Web Studio` },
    description: cs.cardDesc,
    alternates: { canonical: `https://caliberwebstudio.com/case-studies/${slug}` },
    openGraph: {
      title: `${cs.title} Case Study | Caliber Web Studio`,
      description: cs.cardDesc,
      url: `https://caliberwebstudio.com/case-studies/${slug}`,
      siteName: 'Caliber Web Studio',
      images: [{ url: cs.heroImg, width: 1600, alt: cs.heroAlt }],
      type: 'article',
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${cs.title} — Web Design Case Study`,
    description: cs.cardDesc,
    image: cs.heroImg,
    url: `https://caliberwebstudio.com/case-studies/${slug}`,
    author: {
      '@type': 'Organization',
      name: 'Caliber Web Studio',
      url: 'https://caliberwebstudio.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Caliber Web Studio',
      url: 'https://caliberwebstudio.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://caliberwebstudio.com/logo-full-hero.png',
      },
    },
    about: {
      '@type': 'LocalBusiness',
      name: cs.title,
    },
  };

  const accent = cs.accentColor;

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
          position: 'relative',
          height: 'clamp(500px, 65vh, 760px)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-end',
        }}>
          <img
            src={cs.heroImg}
            alt={cs.heroAlt}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(0,0,0,0.6)',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.55) 100%)',
          }} />
          <div style={{
            position: 'relative', zIndex: 2,
            width: '100%',
            maxWidth: '1100px',
            margin: '0 auto',
            padding: 'clamp(40px,6vw,80px) clamp(20px,5vw,60px)',
          }}>
            {/* Breadcrumb */}
            <div style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '10px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.5)',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <Link href="/case-studies" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>
                Case Studies
              </Link>
              <span>/</span>
              <span style={{ color: 'rgba(255,255,255,0.75)' }}>{cs.title}</span>
            </div>
            {/* Industry tag */}
            <span style={{
              display: 'inline-block',
              fontFamily: 'Space Mono, monospace',
              fontSize: '10px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: accent,
              background: `${accent}20`,
              border: `1px solid ${accent}45`,
              padding: '5px 12px',
              borderRadius: '4px',
              marginBottom: '20px',
            }}>{cs.industry}</span>
            <h1 style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(32px,5vw,64px)',
              color: '#fff',
              lineHeight: 1.05,
              marginBottom: '16px',
            }}>{cs.title}</h1>
            <p style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 600,
              fontSize: 'clamp(16px,2.2vw,22px)',
              color: accent,
              maxWidth: '600px',
              lineHeight: 1.4,
            }}>{cs.tagline}</p>
          </div>
        </section>

        {/* ── Results Bar ── */}
        <section style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
          <div className="cs-stats-grid" style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: 'clamp(32px,4vw,52px) clamp(20px,5vw,60px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
          }}>
            {cs.results.map((r) => (
              <div key={r.label} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(28px,4vw,44px)',
                  color: accent,
                  lineHeight: 1,
                  marginBottom: '8px',
                }}>{r.metric}</div>
                <div style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '10px',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  color: 'var(--chrome)',
                  lineHeight: 1.4,
                }}>{r.label}</div>
              </div>
            ))}
          </div>
        </section>

        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 clamp(20px,5vw,60px)' }}>

          {/* ── The Challenge ── */}
          <section className="cs-challenge-grid" style={{
            padding: 'clamp(60px,8vw,100px) 0',
            borderBottom: '1px solid var(--border)',
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: 'clamp(40px,6vw,80px)',
            alignItems: 'start',
          }}>
            <div>
              <p style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '11px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: 'var(--chrome)',
                marginBottom: '16px',
              }}>01 / The Challenge</p>
              <h2 style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(22px,2.8vw,34px)',
                color: 'var(--white)',
                lineHeight: 1.2,
              }}>What Was Holding Them Back</h2>
            </div>
            <p style={{
              fontSize: 'clamp(15px,1.6vw,18px)',
              color: 'var(--chrome)',
              lineHeight: 1.85,
              marginTop: 0,
            }}>{cs.challenge}</p>
          </section>

          {/* ── The Solution ── */}
          <section style={{ padding: 'clamp(60px,8vw,100px) 0', borderBottom: '1px solid var(--border)' }}>
            <div style={{ marginBottom: 'clamp(40px,5vw,60px)' }}>
              <p style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '11px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: 'var(--chrome)',
                marginBottom: '16px',
              }}>02 / The Solution</p>
              <h2 style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(24px,3.5vw,44px)',
                color: 'var(--white)',
                lineHeight: 1.15,
                maxWidth: '700px',
              }}>{cs.solutionHeadline}</h2>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '20px',
            }}>
              {cs.features.map((f) => (
                <div key={f.title} style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '28px 24px',
                }}>
                  <div style={{ fontSize: '28px', marginBottom: '14px' }}>{f.icon}</div>
                  <h3 style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 700,
                    fontSize: '16px',
                    color: 'var(--white)',
                    marginBottom: '10px',
                  }}>{f.title}</h3>
                  <p style={{
                    fontSize: '14px',
                    color: 'var(--chrome)',
                    lineHeight: 1.7,
                    margin: 0,
                  }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Results ── */}
          <section style={{ padding: 'clamp(60px,8vw,100px) 0', borderBottom: '1px solid var(--border)' }}>
            <div className="cs-results-grid" style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'clamp(40px,6vw,80px)',
              alignItems: 'start',
            }}>
              <div>
                <p style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '11px',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  color: 'var(--chrome)',
                  marginBottom: '16px',
                }}>03 / The Results</p>
                <h2 style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(24px,3vw,40px)',
                  color: 'var(--white)',
                  lineHeight: 1.2,
                  marginBottom: '28px',
                }}>What Changed After Launch</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {cs.results.map((r) => (
                    <div key={r.label} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '14px 18px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                    }}>
                      <span style={{
                        fontFamily: 'Syne, sans-serif',
                        fontWeight: 800,
                        fontSize: '22px',
                        color: accent,
                        minWidth: '64px',
                      }}>{r.metric}</span>
                      <span style={{
                        fontFamily: 'Space Mono, monospace',
                        fontSize: '11px',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        color: 'var(--silver)',
                      }}>{r.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{
                background: `linear-gradient(135deg, ${accent}14 0%, transparent 60%)`,
                border: `1px solid ${accent}28`,
                borderRadius: '16px',
                padding: 'clamp(28px,4vw,48px)',
              }}>
                <div style={{ fontSize: '32px', marginBottom: '20px' }}>📈</div>
                <h3 style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 700,
                  fontSize: '18px',
                  color: 'var(--white)',
                  marginBottom: '16px',
                }}>The Full Picture</h3>
                <p style={{
                  fontSize: '15px',
                  color: 'var(--chrome)',
                  lineHeight: 1.85,
                  margin: 0,
                }}>{cs.resultsSummary}</p>
              </div>
            </div>
          </section>

        </div>

        {/* ── CTA ── */}
        <section style={{
          background: 'var(--bg2)',
          borderTop: '1px solid var(--border)',
          padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,80px)',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '11px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'var(--chrome)',
            marginBottom: '24px',
          }}>Want Results Like This?</p>
          <h2 style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(28px,4.5vw,56px)',
            color: 'var(--white)',
            lineHeight: 1.1,
            marginBottom: '20px',
          }}>
            See Your Business<br />Built For Free.
          </h2>
          <p style={{
            color: 'var(--chrome)',
            fontSize: 'clamp(15px,1.8vw,18px)',
            maxWidth: '480px',
            margin: '0 auto 40px',
            lineHeight: 1.7,
          }}>
            We'll build a free mockup of your business before you spend a dollar.
            Zero commitment. Real results.
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
            }}>Start My Free Project</Link>
            <Link href={`/demo/${cs.demoSlug}`} style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '12px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: accent,
              border: `1px solid ${accent}55`,
              padding: '16px 40px',
              textDecoration: 'none',
              display: 'inline-block',
            }}>View Live Demo →</Link>
          </div>

          {/* More case studies links */}
          <div style={{ marginTop: '52px', paddingTop: '40px', borderTop: '1px solid var(--border)' }}>
            <p style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '10px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--chrome)',
              marginBottom: '20px',
            }}>More Case Studies</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {caseStudies.filter((c) => c.slug !== cs.slug).map((c) => (
                <Link key={c.slug} href={`/case-studies/${c.slug}`} style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '10px',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  color: 'var(--chrome)',
                  textDecoration: 'none',
                  padding: '8px 16px',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                }}>{c.title}</Link>
              ))}
            </div>
          </div>
        </section>

        <style>{`
          @media (max-width: 768px) {
            .cs-challenge-grid { grid-template-columns: 1fr !important; }
            .cs-results-grid { grid-template-columns: 1fr !important; }
            .cs-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 480px) {
            .cs-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
        `}</style>

      </main>
      <Footer />
    </>
  );
}
