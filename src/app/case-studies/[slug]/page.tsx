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
    title: { absolute: `${cs.title} — Case Study | Caliber Web Studio` },
    description: `${cs.tagline} ${cs.resultStat} ${cs.resultLabel} ${cs.resultPeriod}. See the full story.`,
    alternates: { canonical: `https://www.caliberwebstudio.com/case-studies/${slug}` },
    openGraph: {
      title: `${cs.title} — Case Study | Caliber Web Studio`,
      description: `${cs.tagline} ${cs.resultStat} ${cs.resultLabel} ${cs.resultPeriod}.`,
      url: `https://www.caliberwebstudio.com/case-studies/${slug}`,
      siteName: 'Caliber Web Studio',
      type: 'article',
      images: [{ url: cs.heroImg, alt: cs.heroAlt }],
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
    headline: `${cs.title} — Case Study`,
    description: `${cs.tagline} ${cs.resultStat} ${cs.resultLabel} ${cs.resultPeriod}.`,
    image: cs.heroImg,
    url: `https://www.caliberwebstudio.com/case-studies/${slug}`,
    publisher: {
      '@type': 'Organization',
      name: 'Caliber Web Studio',
      url: 'https://www.caliberwebstudio.com',
    },
  };

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
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'flex-end',
          overflow: 'hidden',
        }}>
          <img
            src={cs.heroImg}
            alt={cs.heroAlt}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(14,14,14,0.4) 0%, rgba(14,14,14,0.92) 100%)',
          }} />
          <div style={{
            position: 'relative',
            maxWidth: '1100px',
            width: '100%',
            margin: '0 auto',
            padding: 'clamp(100px,12vw,140px) clamp(20px,5vw,60px) clamp(48px,6vw,80px)',
          }}>
            {/* Breadcrumb */}
            <div style={{ marginBottom: '24px' }}>
              <Link href="/case-studies" style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '10px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'var(--chrome)',
                textDecoration: 'none',
                opacity: 0.7,
              }}>← Our Work</Link>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <span style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '10px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.6)',
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(4px)',
                padding: '5px 12px',
                borderRadius: '4px',
              }}>{cs.industry}</span>
              <span style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '10px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: cs.accentColor,
                background: `${cs.accentColor}20`,
                padding: '5px 12px',
                borderRadius: '4px',
              }}>Case Study</span>
            </div>
            <h1 style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(32px,5vw,64px)',
              lineHeight: 1.05,
              color: 'var(--white)',
              marginBottom: '16px',
            }}>{cs.title}</h1>
            <p style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 600,
              fontSize: 'clamp(16px,2vw,22px)',
              color: cs.accentColor,
              marginBottom: '32px',
            }}>{cs.tagline}</p>
            {/* Key result */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'baseline',
              gap: '10px',
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(12px)',
              border: `1px solid ${cs.accentColor}40`,
              borderRadius: '10px',
              padding: '16px 24px',
            }}>
              <span style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(28px,4vw,44px)',
                color: cs.accentColor,
                lineHeight: 1,
              }}>{cs.resultStat}</span>
              <div>
                <div style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '12px',
                  letterSpacing: '1px',
                  color: 'var(--white)',
                  fontWeight: 700,
                }}>{cs.resultLabel}</div>
                <div style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '10px',
                  letterSpacing: '1px',
                  color: 'var(--chrome)',
                  textTransform: 'uppercase',
                }}>{cs.resultPeriod}</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Before / After ── */}
        <section style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,60px)',
        }}>
          <div className="before-after-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px',
            marginBottom: 'clamp(60px,8vw,100px)',
          }}>
            {/* Before */}
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: 'clamp(24px,3vw,40px)',
            }}>
              <div style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '10px',
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)',
                background: 'rgba(255,255,255,0.06)',
                display: 'inline-block',
                padding: '4px 10px',
                borderRadius: '4px',
                marginBottom: '20px',
              }}>Before</div>
              <h2 style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(18px,2vw,24px)',
                color: 'var(--white)',
                marginBottom: '16px',
              }}>The Challenge</h2>
              <p style={{
                fontSize: 'clamp(14px,1.5vw,16px)',
                color: 'var(--chrome)',
                lineHeight: 1.8,
              }}>{cs.challenge}</p>
            </div>

            {/* After */}
            <div style={{
              background: `${cs.accentColor}08`,
              border: `1px solid ${cs.accentColor}30`,
              borderRadius: '12px',
              padding: 'clamp(24px,3vw,40px)',
            }}>
              <div style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '10px',
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                color: cs.accentColor,
                background: `${cs.accentColor}18`,
                display: 'inline-block',
                padding: '4px 10px',
                borderRadius: '4px',
                marginBottom: '20px',
              }}>After</div>
              <h2 style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(18px,2vw,24px)',
                color: 'var(--white)',
                marginBottom: '16px',
              }}>{cs.solutionHeadline}</h2>
              <p style={{
                fontSize: 'clamp(14px,1.5vw,16px)',
                color: 'var(--chrome)',
                lineHeight: 1.8,
                marginBottom: '24px',
              }}>{cs.afterStory}</p>
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '10px',
                borderTop: `1px solid ${cs.accentColor}20`,
                paddingTop: '20px',
              }}>
                <span style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 800,
                  fontSize: '36px',
                  color: cs.accentColor,
                }}>{cs.resultStat}</span>
                <span style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '12px',
                  color: 'var(--chrome)',
                }}>{cs.resultLabel} {cs.resultPeriod}</span>
              </div>
            </div>
          </div>

          {/* ── What We Built ── */}
          <div style={{ marginBottom: 'clamp(60px,8vw,100px)' }}>
            <p style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '10px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'var(--chrome)',
              marginBottom: '16px',
            }}>What We Built</p>
            <h2 style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(26px,3.5vw,44px)',
              color: 'var(--white)',
              marginBottom: 'clamp(32px,4vw,56px)',
              lineHeight: 1.1,
            }}>The Full Solution</h2>
            <div className="features-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px',
            }}>
              {cs.features.map((f, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  padding: '24px',
                }}>
                  <div style={{ fontSize: '28px', marginBottom: '12px' }}>{f.icon}</div>
                  <h3 style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 700,
                    fontSize: '16px',
                    color: 'var(--white)',
                    marginBottom: '8px',
                  }}>{f.title}</h3>
                  <p style={{
                    fontSize: '13px',
                    color: 'var(--chrome)',
                    lineHeight: 1.7,
                  }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Client Quote ── */}
          <div style={{ marginBottom: 'clamp(60px,8vw,100px)' }}>
            <blockquote style={{
              background: `${cs.accentColor}08`,
              border: `1px solid ${cs.accentColor}25`,
              borderLeft: `4px solid ${cs.accentColor}`,
              borderRadius: '12px',
              padding: 'clamp(28px,4vw,48px)',
              margin: 0,
            }}>
              <p style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 600,
                fontSize: 'clamp(17px,2.2vw,22px)',
                color: 'var(--white)',
                lineHeight: 1.55,
                marginBottom: '20px',
                fontStyle: 'italic',
                maxWidth: '100%',
              }}>
                &ldquo;{cs.clientQuote}&rdquo;
              </p>
              <footer style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <cite style={{
                  fontFamily: 'Space Mono, monospace',
                  fontStyle: 'normal',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: cs.accentColor,
                  letterSpacing: '0.03em',
                }}>{cs.clientName}</cite>
                <span style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '11px',
                  color: 'var(--chrome)',
                  letterSpacing: '0.02em',
                }}>{cs.clientTitle}</span>
              </footer>
            </blockquote>
          </div>

          {/* ── Key Metrics ── */}
          <div style={{ marginBottom: 'clamp(60px,8vw,100px)' }}>
            <p style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '10px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'var(--chrome)',
              marginBottom: '24px',
            }}>By the Numbers</p>
            <div className="metrics-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '16px',
            }}>
              {cs.metrics.map((m, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  padding: '20px 16px',
                  textAlign: 'center',
                }}>
                  <div style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 800,
                    fontSize: 'clamp(22px,2.8vw,34px)',
                    color: cs.accentColor,
                    lineHeight: 1,
                    marginBottom: '8px',
                  }}>{m.value}</div>
                  <div style={{
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '10px',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    color: 'var(--chrome)',
                    lineHeight: 1.4,
                  }}>{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── View the Live Site ── */}
          <div style={{
            background: `${cs.accentColor}08`,
            border: `1px solid ${cs.accentColor}30`,
            borderRadius: '16px',
            padding: 'clamp(36px,5vw,60px)',
            textAlign: 'center',
          }}>
            <p style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '10px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: cs.accentColor,
              marginBottom: '16px',
            }}>See It Live</p>
            <h2 style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(22px,3vw,38px)',
              color: 'var(--white)',
              marginBottom: '12px',
            }}>Explore the Working Site</h2>
            <p style={{
              color: 'var(--chrome)',
              fontSize: '15px',
              maxWidth: '440px',
              margin: '0 auto 32px',
              lineHeight: 1.7,
            }}>
              Click through the live demo — the same system we build for every client. Fully interactive.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href={`/demo/${cs.demoSlug}`} style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '11px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'var(--bg)',
                background: cs.accentColor,
                padding: '14px 32px',
                textDecoration: 'none',
                fontWeight: 700,
                display: 'inline-block',
                borderRadius: '4px',
              }}>View Live Demo →</Link>
              <Link href="/contact" style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '11px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'var(--chrome)',
                border: '1px solid var(--border)',
                padding: '14px 32px',
                textDecoration: 'none',
                display: 'inline-block',
                borderRadius: '4px',
              }}>Start My Project</Link>
            </div>
          </div>
        </section>

        {/* ── Other Case Studies ── */}
        <section style={{
          borderTop: '1px solid var(--border)',
          padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,60px)',
          background: 'var(--bg2)',
        }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <p style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '10px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'var(--chrome)',
              marginBottom: '12px',
            }}>More Results</p>
            <h2 style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(22px,3vw,36px)',
              color: 'var(--white)',
              marginBottom: '36px',
            }}>Other Case Studies</h2>
            <div className="related-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px',
            }}>
              {caseStudies
                .filter((c) => c.slug !== cs.slug)
                .map((related) => (
                  <Link key={related.slug} href={`/case-studies/${related.slug}`} style={{ textDecoration: 'none' }}>
                    <div className="related-card" style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid var(--border)',
                      borderRadius: '10px',
                      overflow: 'hidden',
                    }}>
                      <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
                        <img
                          src={related.cardImg}
                          alt={related.heroAlt}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                        <div style={{
                          position: 'absolute', inset: 0,
                          background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.7) 100%)',
                        }} />
                        <div style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          background: 'rgba(0,0,0,0.75)',
                          backdropFilter: 'blur(6px)',
                          border: `1px solid ${related.accentColor}40`,
                          borderRadius: '6px',
                          padding: '6px 10px',
                          textAlign: 'center',
                        }}>
                          <div style={{
                            fontFamily: 'Syne, sans-serif',
                            fontWeight: 800,
                            fontSize: '15px',
                            color: related.accentColor,
                            lineHeight: 1,
                          }}>{related.resultStat}</div>
                          <div style={{
                            fontFamily: 'Space Mono, monospace',
                            fontSize: '7px',
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                            color: 'rgba(255,255,255,0.6)',
                            marginTop: '2px',
                          }}>{related.resultLabel}</div>
                        </div>
                      </div>
                      <div style={{ padding: '16px 18px' }}>
                        <div style={{
                          fontFamily: 'Space Mono, monospace',
                          fontSize: '9px',
                          letterSpacing: '2px',
                          textTransform: 'uppercase',
                          color: 'var(--chrome)',
                          marginBottom: '6px',
                          opacity: 0.6,
                        }}>{related.industry}</div>
                        <h3 style={{
                          fontFamily: 'Syne, sans-serif',
                          fontWeight: 700,
                          fontSize: '15px',
                          color: 'var(--white)',
                          marginBottom: '4px',
                        }}>{related.title}</h3>
                        <p style={{
                          fontFamily: 'Space Mono, monospace',
                          fontSize: '10px',
                          letterSpacing: '1px',
                          textTransform: 'uppercase',
                          color: related.accentColor,
                        }}>View Case Study →</p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>

        <style>{`
          .before-after-grid { grid-template-columns: 1fr 1fr !important; }
          .features-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .related-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .related-card {
            transition: transform 0.2s ease, border-color 0.2s ease;
          }
          .related-card:hover {
            transform: translateY(-4px);
            border-color: rgba(168,184,200,0.25) !important;
          }
          @media (max-width: 900px) {
            .before-after-grid { grid-template-columns: 1fr !important; }
            .features-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .related-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .metrics-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 580px) {
            .features-grid { grid-template-columns: 1fr !important; }
            .related-grid { grid-template-columns: 1fr !important; }
            .metrics-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
        `}</style>

      </main>
      <Footer />
    </>
  );
}
