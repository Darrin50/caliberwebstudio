import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import SocialProof from '@/components/SocialProof';
import { ScrollReveal } from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: { absolute: 'About | Caliber Web Studio — Built in Detroit' },
  description: 'Caliber Web Studio is a Detroit-rooted digital studio founded by Darrin Singer. We build enterprise-grade web systems for local businesses — not templates, not agencies, not excuses.',
  alternates: { canonical: 'https://caliberwebstudio.com/about' },
  openGraph: {
    title: 'About Caliber Web Studio — Built in Detroit. Obsessed with Results.',
    description: 'Founded by Darrin Singer in Detroit, MI. We engineer growth systems for local businesses at a price that finally makes sense.',
    url: 'https://caliberwebstudio.com/about',
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
  url: 'https://caliberwebstudio.com/about',
  mainEntity: {
    '@type': 'ProfessionalService',
    name: 'Caliber Web Studio',
    foundingDate: '2023',
    founder: { '@type': 'Person', name: 'Darrin Singer' },
    address: { '@type': 'PostalAddress', addressLocality: 'Detroit', addressRegion: 'MI', addressCountry: 'US' },
    telephone: '+13137992315',
    url: 'https://caliberwebstudio.com',
  },
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
      <Nav />
      <main style={{ background: 'var(--bg)', color: 'var(--silver)', minHeight: '100vh' }}>

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
            <h1 className="fu" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(44px, 7vw, 88px)', lineHeight: 1.0, letterSpacing: '-0.03em', color: '#fff', margin: '24px 0 28px', position: 'relative' }}>
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
        <section style={{
          padding: 'clamp(80px, 10vw, 140px) clamp(20px, 6vw, 80px)',
          borderBottom: '1px solid var(--border)',
          background: '#111827',
        }}>
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <ScrollReveal>
              <p className="sec-label">Our Story</p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 52px)', color: '#fff', marginBottom: '40px', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
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
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 52px)', color: '#fff', marginBottom: 'clamp(40px, 5vw, 64px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                Three Things We Don&apos;t Compromise On
              </h2>
            </ScrollReveal>
            <div className="values-grid">
              {values.map((v, i) => (
                <ScrollReveal key={v.label} delay={i * 80}>
                  <div style={{
                    background: '#111827',
                    border: '1px solid var(--border)',
                    borderRadius: '4px',
                    padding: 'clamp(32px, 4vw, 48px)',
                    position: 'relative',
                    overflow: 'hidden',
                    height: '100%',
                  }}>
                    <div style={{
                      position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                      background: 'linear-gradient(to right, #2563eb, transparent)',
                    }} />
                    <div style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '10px',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#2563eb',
                      marginBottom: '16px',
                    }}>
                      0{i + 1}
                    </div>
                    <h3 style={{
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 800,
                      fontSize: 'clamp(20px, 2.2vw, 26px)',
                      color: '#fff',
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
        <section style={{ borderBottom: '1px solid var(--border)', background: '#0a0a0a' }}>
          <SocialProof />
        </section>

        {/* Meet the Founder */}
        <section style={{
          padding: 'clamp(80px, 10vw, 120px) clamp(20px, 6vw, 80px)',
          borderBottom: '1px solid var(--border)',
        }}>
          <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
            <ScrollReveal>
              <p className="sec-label" style={{ justifyContent: 'center' }}>The Founder</p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              {/* Founder photo — file exists at public/images/darrin-singer.png */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px', marginTop: '32px' }}>
                <FounderImage />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={140}>
              <h2 style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(24px, 3vw, 32px)',
                color: '#fff',
                marginBottom: '6px',
                letterSpacing: '-0.02em',
              }}>
                Darrin Singer
              </h2>
              <p style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '11px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--dim)',
                marginBottom: '24px',
              }}>
                Founder &amp; CEO · Detroit, MI
              </p>
              <p style={{ fontSize: 'clamp(15px, 1.6vw, 17px)', color: 'var(--chrome)', lineHeight: 1.8, maxWidth: '520px', margin: '0 auto 32px' }}>
                Darrin built Caliber Web Studio to close the gap between what big brands get and what local businesses can afford. Based in Detroit, he&apos;s obsessed with making enterprise-grade web technology accessible to the businesses that need it most.
              </p>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/contact" className="btn-chrome" style={{ textDecoration: 'none' }}>Work With Us</Link>
                <Link href="/work" className="btn-line" style={{ textDecoration: 'none' }}>See Our Work</Link>
              </div>
            </ScrollReveal>
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
      `}</style>
    </>
  );
}

function FounderImage() {
  return (
    <Image
      src="/images/darrin-singer.png"
      alt="Darrin Singer — Founder, Caliber Web Studio"
      width={120}
      height={120}
      className="rounded-full object-cover"
      style={{ border: '2px solid rgba(37,99,235,0.4)', boxShadow: '0 0 32px rgba(37,99,235,0.2)' }}
      priority
    />
  );
}
