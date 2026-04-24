import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import SocialProof from '@/components/SocialProof';
import { ScrollReveal } from '@/components/ScrollReveal';
import AboutStoryVideo from '@/components/AboutStoryVideo';

export const metadata: Metadata = {
  title: { absolute: 'About | Caliber Web Studio — Built in Detroit' },
  description: 'Caliber Web Studio is a Detroit-rooted digital studio founded by Darrin Singer. We build enterprise-grade web systems for local businesses — not templates, not agencies, not excuses.',
  alternates: { canonical: 'https://www.caliberwebstudio.com/about' },
  openGraph: {
    title: 'About Caliber Web Studio — Built in Detroit. Obsessed with Results.',
    description: 'Founded by Darrin Singer in Detroit, MI. We engineer growth systems for local businesses at a price that finally makes sense.',
    url: 'https://www.caliberwebstudio.com/about',
    type: 'website',
    images: [{ url: '/logo-full-hero.png', alt: 'Caliber Web Studio — Built in Detroit', width: 1200, height: 630 }],
  },
};

const values = [
  {
    label: 'Results Over Vanity',
    body: "We don't build pretty websites. We build websites that make money. If your site isn't generating calls, leads, or bookings — it's a liability, not an asset.",
  },
  {
    label: 'Detroit First',
    body: "We're in this market. We know the neighborhoods, the competition, and the customers you're trying to win. Local businesses in our city get our full attention.",
  },
  {
    label: 'No BS Transparency',
    body: "You always know what you're paying for and why. Flat pricing. No surprise invoices. No mystery agency fees. No 3-month 'discovery phases' before we lift a finger.",
  },
];

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About Caliber Web Studio',
  description: 'Caliber Web Studio is a Detroit-based AI-powered web studio founded by Darrin Singer.',
  url: 'https://www.caliberwebstudio.com/about',
  mainEntity: {
    '@type': 'ProfessionalService',
    name: 'Caliber Web Studio',
    foundingDate: '2023',
    founder: { '@type': 'Person', name: 'Darrin Singer' },
    address: { '@type': 'PostalAddress', addressLocality: 'Detroit', addressRegion: 'MI', addressCountry: 'US' },
    telephone: '+13137992315',
    url: 'https://www.caliberwebstudio.com',
  },
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
      <Nav />
      <main style={{ background: 'var(--bg)', color: 'var(--silver)', minHeight: '100vh' }}>

        {/* Cinematic storytelling section — website stats + CWS origin story, plays once */}
        <AboutStoryVideo />

        {/* Hero */}
        <section style={{
          padding: 'clamp(140px, 18vw, 200px) clamp(20px, 6vw, 80px) clamp(80px, 10vw, 120px)',
          textAlign: 'center',
          borderBottom: '1px solid var(--border)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(30,61,143,0.22) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <ScrollReveal>
            <p className="sec-label fu" style={{ justifyContent: 'center' }}>About Us</p>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h1 className="fu" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(44px, 7vw, 88px)', lineHeight: 1.0, letterSpacing: '-0.03em', color: 'var(--text-primary)', margin: '24px 0 28px', position: 'relative' }}>
              Built in Detroit.<br />
              <span style={{ background: 'linear-gradient(135deg, #2563eb, #93c5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Obsessed with Results.</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={160}>
            <p className="fu" style={{ fontSize: 'clamp(17px, 2vw, 22px)', color: 'var(--chrome)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7, position: 'relative' }}>
              Caliber Web Studio serves local businesses who are tired of being invisible online. We believe the playing field should be level — and we build the systems to make it that way.
            </p>
          </ScrollReveal>
        </section>

        {/* Our Story */}
        <section
          data-dark-section
          style={{
          padding: 'clamp(80px, 10vw, 140px) clamp(20px, 6vw, 80px)',
          borderBottom: '1px solid var(--border)',
          background: 'var(--bg2)',
        }}>
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <ScrollReveal>
              <p className="sec-label">Our Story</p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 52px)', color: 'var(--text-primary)', marginBottom: '40px', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                The Gap Nobody Was Filling
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                <p style={{ fontSize: 'clamp(16px, 1.6vw, 18px)', color: 'var(--silver)', lineHeight: 1.85 }}>
                  Caliber started from a simple frustration: watching great Detroit businesses — restaurants, barbershops, contractors, clinics — lose customers every day not because they were bad at what they do, but because nobody online knew they existed.
                </p>
                <p style={{ fontSize: 'clamp(16px, 1.6vw, 18px)', color: 'var(--silver)', lineHeight: 1.85 }}>
                  Big agencies charged $15,000 for a website and disappeared. Template builders were $30/month and impossible to rank. There was a massive gap between &ldquo;I can&apos;t afford a real agency&rdquo; and &ldquo;I refuse to use a DIY builder&rdquo; — and the city&apos;s best small businesses were stuck in it.
                </p>
                <p style={{ fontSize: 'clamp(16px, 1.6vw, 18px)', color: 'var(--silver)', lineHeight: 1.85 }}>
                  AI changed the math. What took six weeks and $20K five years ago now takes 48 hours at a fraction of the cost. We built Caliber to pass that advantage directly to local business owners — and to do it without the smoke and mirrors.
                </p>
                <p style={{ fontSize: 'clamp(16px, 1.6vw, 18px)', color: '#fff', lineHeight: 1.85, fontWeight: 500 }}>
                  We&apos;re not building brochure sites. We&apos;re engineering growth systems — sites that rank, convert, and run 24 hours a day without you lifting a finger.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* How We Work — 3-step process with real photos */}
        <section style={{
          padding: 'clamp(80px, 10vw, 140px) clamp(20px, 6vw, 80px)',
          borderBottom: '1px solid var(--border)',
          background: 'var(--bg)',
        }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <ScrollReveal>
              <p className="sec-label">How We Work</p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(32px, 5vw, 52px)',
                color: 'var(--text-primary)',
                marginBottom: 'clamp(40px, 5vw, 64px)',
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                maxWidth: '620px',
              }}>
                From Blank Page to Business Growth
              </h2>
            </ScrollReveal>
            <div className="process-grid">
              {[
                {
                  n: '01',
                  label: 'Strategy',
                  title: 'We map your market',
                  body: 'Before a line of code is written, we dig into your goals, your competitors, and the searches your customers are actually making. Strategy first — always.',
                  img: '/images/brand/cws-about-sketch-02.jpg',
                  alt: 'Sketching out a website strategy plan for a Detroit business',
                },
                {
                  n: '02',
                  label: 'Build',
                  title: 'We engineer your site',
                  body: 'Your site goes live in 48 hours — built on Next.js, SEO-optimized from day one, designed to convert. Not a template. Not a drag-and-drop builder. A real system.',
                  img: '/images/brand/cws-about-keyboard-01.jpg',
                  alt: 'Developer building a high-performance website for a local business',
                },
                {
                  n: '03',
                  label: 'Results',
                  title: 'You get found and win customers',
                  body: 'Live rankings. Real leads. Ongoing optimization. You track every number in your client portal — we keep the system compounding while you run your business.',
                  img: '/images/brand/cws-about-review-03.jpg',
                  alt: 'Reviewing website analytics and rankings with a Detroit business owner',
                },
              ].map((step) => (
                <ScrollReveal key={step.n}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {/* Photo */}
                    <div style={{
                      position: 'relative',
                      aspectRatio: '4 / 3',
                      borderRadius: '6px',
                      overflow: 'hidden',
                      marginBottom: '28px',
                      border: '1px solid var(--border)',
                    }}>
                      <Image
                        src={step.img}
                        alt={step.alt}
                        fill
                        sizes="(max-width: 860px) 100vw, 33vw"
                        style={{ objectFit: 'cover' }}
                      />
                      {/* Step number overlay */}
                      <div style={{
                        position: 'absolute',
                        top: '16px',
                        left: '16px',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'rgba(10,10,11,0.80)',
                        border: '1px solid rgba(0,118,182,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: 'blur(4px)',
                      }}>
                        <span style={{
                          fontFamily: 'Space Mono, monospace',
                          fontSize: '11px',
                          fontWeight: 700,
                          color: '#60a5fa',
                          letterSpacing: '0.05em',
                        }}>{step.n}</span>
                      </div>
                    </div>
                    {/* Copy */}
                    <p style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '9px',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--accent)',
                      marginBottom: '10px',
                    }}>{step.label}</p>
                    <h3 style={{
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 800,
                      fontSize: 'clamp(18px, 2vw, 22px)',
                      color: 'var(--text-primary)',
                      marginBottom: '10px',
                      lineHeight: 1.2,
                      letterSpacing: '-0.02em',
                    }}>{step.title}</h3>
                    <p style={{
                      fontSize: '15px',
                      color: 'var(--chrome)',
                      lineHeight: 1.75,
                      margin: 0,
                    }}>{step.body}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* What We Stand For */}
        <section style={{
          padding: 'clamp(80px, 10vw, 140px) clamp(20px, 6vw, 80px)',
          borderBottom: '1px solid var(--border)',
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <ScrollReveal>
              <p className="sec-label">What We Stand For</p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 52px)', color: 'var(--text-primary)', marginBottom: 'clamp(40px, 5vw, 64px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                Three Things We Don&apos;t Compromise On
              </h2>
            </ScrollReveal>
            <div className="values-grid">
              {values.map((v, i) => (
                <ScrollReveal key={v.label} delay={i * 80}>
                  <div className="values-card" style={{
                    background: 'var(--bg2)',
                    border: '1px solid var(--border)',
                    borderRadius: '4px',
                    padding: 'clamp(32px, 4vw, 48px)',
                    position: 'relative',
                    overflow: 'hidden',
                    height: '100%',
                  }}>
                    <div style={{
                      position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                      background: 'linear-gradient(to right, var(--accent), transparent)',
                    }} />
                    <div style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '10px',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--accent)',
                      marginBottom: '16px',
                    }}>
                      0{i + 1}
                    </div>
                    <h3 style={{
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 800,
                      fontSize: 'clamp(20px, 2.2vw, 26px)',
                      color: 'var(--text-primary)',
                      marginBottom: '16px',
                      lineHeight: 1.2,
                      letterSpacing: '-0.02em',
                    }}>
                      {v.label}
                    </h3>
                    <p style={{ fontSize: '15px', color: 'var(--chrome)', lineHeight: 1.75, margin: 0 }}>
                      {v.body}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* The Numbers */}
        <section data-dark-section style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
          <SocialProof />
        </section>

        {/* Meet the Founder */}
        <section style={{
          padding: 'clamp(80px, 10vw, 140px) clamp(20px, 6vw, 80px)',
          borderBottom: '1px solid var(--border)',
          background: 'var(--bg2)',
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <ScrollReveal>
              <p className="sec-label">The Founder</p>
            </ScrollReveal>
            <div className="founder-grid" style={{ marginTop: 'clamp(32px, 4vw, 48px)' }}>
              {/* Portrait */}
              <ScrollReveal>
                <div style={{
                  position: 'relative',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  aspectRatio: '3 / 4',
                  border: '1px solid var(--border)',
                  boxShadow: '0 0 60px rgba(0,118,182,0.12)',
                }}>
                  <Image
                    src="/images/darrin-headshot.png"
                    alt="Darrin Singer — Founder and CEO of Caliber Web Studio, Detroit MI"
                    fill
                    sizes="(max-width: 860px) 100vw, 380px"
                    style={{ objectFit: 'cover', objectPosition: 'center top' }}
                    priority
                  />
                  {/* Subtle blue gradient at bottom */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '40%',
                    background: 'linear-gradient(to top, rgba(0,118,182,0.18) 0%, transparent 100%)',
                    pointerEvents: 'none',
                  }} />
                </div>
              </ScrollReveal>

              {/* Bio copy */}
              <ScrollReveal delay={100}>
                <div>
                  <h2 style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 800,
                    fontSize: 'clamp(32px, 4vw, 48px)',
                    color: 'var(--text-primary)',
                    marginBottom: '6px',
                    lineHeight: 1.05,
                    letterSpacing: '-0.03em',
                  }}>
                    Darrin Singer
                  </h2>
                  <p style={{
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '11px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--accent)',
                    marginBottom: '32px',
                  }}>
                    Founder &amp; CEO · Detroit, MI
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '36px' }}>
                    <p style={{ fontSize: 'clamp(15px, 1.6vw, 17px)', color: 'var(--silver)', lineHeight: 1.85 }}>
                      Darrin built Caliber Web Studio after watching too many great Detroit businesses lose customers online — not because they were bad at what they do, but because they were invisible. Big agencies charged $15K and disappeared. Template builders ranked nowhere. There was a gap, and nobody was filling it right.
                    </p>
                    <p style={{ fontSize: 'clamp(15px, 1.6vw, 17px)', color: 'var(--chrome)', lineHeight: 1.85 }}>
                      AI changed the math. What took six weeks and $20K five years ago now takes 48 hours at a fraction of the cost. Caliber passes that advantage directly to local business owners — with flat pricing, zero smoke and mirrors, and a system that keeps working long after launch.
                    </p>
                    <p style={{ fontSize: 'clamp(15px, 1.6vw, 17px)', color: 'var(--chrome)', lineHeight: 1.85 }}>
                      When Darrin isn&apos;t building growth systems for Detroit businesses, he&apos;s studying what the top 1% of web agencies do differently — and figuring out how to bring those tools to the businesses that need them most.
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <Link href="/contact" className="btn-chrome" style={{ textDecoration: 'none' }}>Work With Us</Link>
                    <Link href="/work" className="btn-line" style={{ textDecoration: 'none' }}>See Our Work</Link>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

      </main>
      <Footer />

      <style>{`
        .values-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(12px, 2vw, 20px);
        }
        @media (max-width: 860px) {
          .values-grid { grid-template-columns: 1fr; }
        }
        .process-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(24px, 4vw, 48px);
        }
        @media (max-width: 860px) {
          .process-grid { grid-template-columns: 1fr; gap: clamp(40px, 6vw, 56px); }
        }
        .founder-grid {
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: clamp(40px, 6vw, 80px);
          align-items: center;
        }
        @media (max-width: 860px) {
          .founder-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}

