import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: { absolute: 'About | Caliber Web Studio — Built in Detroit' },
  description: 'Caliber Web Studio is a Detroit-rooted digital studio founded by Darrin Singer. We build enterprise-grade web systems for local businesses — not templates, not agencies, not excuses.',
  alternates: { canonical: 'https://caliberwebstudio.com/about' },
  openGraph: {
    title: 'About Caliber Web Studio — Built in Detroit. Powered by AI.',
    description: 'Founded by Darrin Singer in Detroit, MI. We engineer growth systems for local businesses at a price that finally makes sense.',
    url: 'https://caliberwebstudio.com/about',
    type: 'website',
    images: [{ url: '/logo-full-hero.png', alt: 'Caliber Web Studio — Built in Detroit', width: 1200, height: 630 }],
  },
};

const values = [
  {
    label: 'Skin in the game',
    body: 'We build your site before you pay a dollar. If we can\'t show you something worth investing in, you owe us nothing. We don\'t win unless you win.',
  },
  {
    label: 'Speed as respect',
    body: 'Your time is your business. We don\'t do 6-week timelines or 3-month "discovery phases." Mockup in 48 hours. Live in a week. That\'s how it should work.',
  },
  {
    label: 'No mystery pricing',
    body: 'One flat monthly rate. No setup fees. No surprise invoices. No nickel-and-diming for basic changes. You know exactly what you\'re paying and exactly what you\'re getting.',
  },
  {
    label: 'Local knowledge matters',
    body: 'We\'re not a remote agency guessing at your market. We\'re in Detroit. We know the neighborhoods, the competition, and the customers you\'re trying to reach.',
  },
];

const techStack = [
  { name: 'Next.js + Vercel', desc: 'The same infrastructure powering Fortune 500 companies — 99.99% uptime, global CDN, sub-second load times.' },
  { name: 'AI Systems', desc: 'Custom-trained chatbots, automated review pipelines, and content engines built specifically for your business — not generic SaaS tools.' },
  { name: 'Local SEO Infrastructure', desc: 'Schema markup, geo-targeted pages, Core Web Vitals optimization, and Google Business Profile management all baked into every build.' },
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
        <section style={{ padding: 'clamp(140px,18vw,200px) clamp(20px,6vw,80px) clamp(80px,10vw,120px)', textAlign: 'center', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(30,61,143,0.22) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <ScrollReveal>
            <p className="sec-label fu" style={{ justifyContent: 'center' }}>Our Story</p>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h1 className="fu" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(44px,7vw,88px)', lineHeight: 1.0, letterSpacing: '-0.03em', color: '#fff', margin: '24px 0 28px', position: 'relative' }}>
              Built in Detroit.<br />
              Powered by AI.<br />
              <span style={{ background: 'linear-gradient(135deg, #1E3D8F, #A8B8C8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Designed to Dominate.</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={160}>
            <p className="fu" style={{ fontSize: 'clamp(17px,2vw,22px)', color: 'var(--chrome)', maxWidth: '580px', margin: '0 auto', lineHeight: 1.7, position: 'relative' }}>
              We&apos;re not a web design agency. We engineer growth systems — built to attract customers, capture leads, and compound over time.
            </p>
          </ScrollReveal>
        </section>

        {/* The Story — Darrin + mission */}
        <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,80px)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(48px,6vw,96px)', alignItems: 'center' }}>
            <ScrollReveal>
              <div>
                <p className="sec-label">The Founder</p>
                <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4vw,48px)', color: '#fff', marginBottom: '28px', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                  Darrin Singer<br />
                  <span style={{ fontSize: '0.55em', color: 'var(--chrome)', fontWeight: 600, letterSpacing: '-0.01em' }}>Founder, Caliber Web Studio</span>
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <p style={{ fontSize: 'clamp(15px,1.5vw,17px)', color: 'var(--silver)', lineHeight: 1.8 }}>
                    Caliber Web Studio was born out of a simple frustration: watching great Detroit businesses lose customers every day because their online presence was invisible, broken, or embarrassing.
                  </p>
                  <p style={{ fontSize: 'clamp(15px,1.5vw,17px)', color: 'var(--silver)', lineHeight: 1.8 }}>
                    Great restaurants with no website. Skilled contractors invisible on Google. Barbershops and salons with real community roots getting outranked by chains with bigger marketing budgets. The playing field was rigged.
                  </p>
                  <p style={{ fontSize: 'clamp(15px,1.5vw,17px)', color: 'var(--silver)', lineHeight: 1.8 }}>
                    So I built Caliber on one belief: <strong style={{ color: '#fff' }}>every local business deserves enterprise-grade web technology at a price that actually makes sense.</strong> Not a $15/month template. Not a $20K agency engagement. Something better.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Founder visual / quote card */}
            <ScrollReveal delay={120}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ margin: '0 auto', borderRadius: '16px', overflow: 'hidden', width: '100%', maxWidth: '320px', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
                  <Image
                    src="/images/darrin-singer.png"
                    alt="Darrin Singer — Founder, Caliber Web Studio"
                    width={320}
                    height={400}
                    style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                    priority
                  />
                </div>

                <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '20px', padding: 'clamp(28px,3.5vw,44px)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, right: 0, width: '200px', height: '200px', background: 'radial-gradient(circle at top right, rgba(30,61,143,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
                  <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(40px,5vw,64px)', color: 'rgba(30,61,143,0.2)', lineHeight: 0.8, marginBottom: '20px', fontWeight: 800 }}>"</div>
                  <blockquote style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(16px,2vw,22px)', color: '#fff', lineHeight: 1.35, margin: '0 0 24px', letterSpacing: '-0.015em' }}>
                    Local businesses deserve the same tools big brands take for granted — without the agency price tag.
                  </blockquote>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '15px', color: 'var(--silver)' }}>Darrin Singer</span>
                    <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--dim)' }}>Founder · Detroit, MI</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
          <style>{`.about-founder-grid { grid-template-columns: 1fr !important; } @media (max-width: 760px) { .about-story-grid { grid-template-columns: 1fr !important; } }`}</style>
        </section>

        {/* The Mission */}
        <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,80px)', borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
          <div style={{ maxWidth: '780px', margin: '0 auto' }}>
            <ScrollReveal>
              <p className="sec-label">Why We Exist</p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(32px,5vw,56px)', color: '#fff', marginBottom: '40px', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                The Playing Field<br />Doesn&apos;t Have to Be Rigged
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={140}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <p style={{ fontSize: 'clamp(16px,1.6vw,19px)', color: 'var(--silver)', lineHeight: 1.8 }}>
                  Big chains dominate local search not because they&apos;re better — but because they have bigger marketing budgets, dedicated IT teams, and agencies on retainer. A neighborhood barbershop or family-owned plumbing company shouldn&apos;t lose to a franchise just because it can&apos;t afford a $10,000 website.
                </p>
                <p style={{ fontSize: 'clamp(16px,1.6vw,19px)', color: 'var(--silver)', lineHeight: 1.8 }}>
                  AI changed the math. What took six weeks and $15K five years ago takes 72 hours and a fraction of the cost today. We passed that advantage directly to local business owners — and we built our entire model around it.
                </p>
                <p style={{ fontSize: 'clamp(16px,1.6vw,19px)', color: 'var(--silver)', lineHeight: 1.8 }}>
                  <strong style={{ color: '#fff' }}>We engineer growth systems</strong> — not brochure sites. Every site we build captures leads, answers questions at 2 AM, builds reviews on autopilot, and ranks on Google for the searches your customers are already doing.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Core Values */}
        <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,80px)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <ScrollReveal>
              <p className="sec-label">How We Operate</p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(32px,5vw,56px)', color: '#fff', marginBottom: 'clamp(40px,5vw,64px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                Four Rules We Don&apos;t Break
              </h2>
            </ScrollReveal>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
              {values.map((v, i) => (
                <ScrollReveal key={v.label} delay={i * 70}>
                  <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '40px', padding: 'clamp(28px,3.5vw,44px) clamp(24px,4vw,44px)', background: 'var(--bg)', alignItems: 'start' }}>
                    <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(17px,2vw,22px)', color: '#fff', lineHeight: 1.25, letterSpacing: '-0.015em' }}>{v.label}</div>
                    <p style={{ fontSize: '15px', color: 'var(--chrome)', lineHeight: 1.75, margin: 0 }}>{v.body}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Tech under the hood */}
        <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,80px)', borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <ScrollReveal>
              <p className="sec-label">Under the Hood</p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(32px,5vw,56px)', color: '#fff', marginBottom: '16px', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                Fortune 500 Tech.<br />Local Business Price.
              </h2>
              <p style={{ fontSize: 'clamp(16px,1.6vw,19px)', color: 'var(--chrome)', maxWidth: '540px', marginBottom: 'clamp(40px,5vw,56px)', lineHeight: 1.7 }}>
                Your site runs on the same infrastructure trusted by global enterprises — not shared WordPress hosting that buckles under real traffic.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={140}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
                {techStack.map((item) => (
                  <div key={item.name} style={{ display: 'flex', alignItems: 'flex-start', gap: '40px', padding: 'clamp(24px,3vw,36px) clamp(24px,4vw,44px)', background: 'var(--bg)', flexWrap: 'wrap' }}>
                    <div style={{ minWidth: '200px', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '18px', color: '#fff' }}>{item.name}</div>
                    <div style={{ flex: 1, minWidth: '200px', fontSize: '15px', color: 'var(--chrome)', lineHeight: 1.7 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA — unique to About: see the work */}
        <section style={{ padding: 'clamp(100px,12vw,160px) clamp(20px,6vw,80px)', textAlign: 'center' }}>
          <ScrollReveal>
            <p className="sec-label" style={{ justifyContent: 'center' }}>See It in Action</p>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(36px,5vw,64px)', color: '#fff', marginBottom: '24px', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
              Actions Speak Louder<br />Than Agency Decks
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={140}>
            <p style={{ color: 'var(--chrome)', fontSize: 'clamp(16px,1.8vw,20px)', maxWidth: '480px', margin: '0 auto 48px', lineHeight: 1.7 }}>
              Browse four live, working demo sites — each one built for a real Detroit industry. See exactly what we deliver before committing to anything.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/work" className="btn-chrome" style={{ textDecoration: 'none' }}>Browse Live Demos</Link>
              <Link href="/contact" className="btn-line" style={{ textDecoration: 'none' }}>Start a Conversation</Link>
            </div>
          </ScrollReveal>
        </section>

      </main>
      <Footer />
      <style>{`
        @media (max-width: 760px) {
          .about-story-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
