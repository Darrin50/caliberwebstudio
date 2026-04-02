import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { ScrollReveal, ScrollRevealGroup } from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: { absolute: 'About | Caliber Web Studio' },
  description: 'Caliber Web Studio is a Detroit-rooted, AI-powered web studio founded by Darrin Singer. We engineer growth systems for local businesses — not templates, not fluff.',
  alternates: { canonical: 'https://caliberwebstudio.com/about' },
  openGraph: {
    title: 'About Caliber Web Studio — Built in Detroit. Powered by AI.',
    description: 'Founded by Darrin Singer in Detroit, MI. We build enterprise-grade web technology for local businesses at a price that makes sense.',
    url: 'https://caliberwebstudio.com/about',
    type: 'website',
  },
};

const differentiators = [
  { label: 'AI-Powered Everything', icon: '⚡', body: 'Chatbots, content generation, SEO automation, and review management — all built in-house. Not bolted on. Not outsourced. Engineered from the ground up.' },
  { label: 'Speed: 3-Day Launch', icon: '🚀', body: 'Most agencies take weeks. We take 72 hours. Your site is live, tested, and generating leads before your competitors finish their kickoff call.' },
  { label: 'Demo-First Model', icon: '🎯', body: "See your real, fully-built website before you pay a single dollar. We build it. You approve it. Then we talk money. Zero risk on your end." },
  { label: 'Detroit-Focused', icon: '🏙️', body: "We know the local market, the local competitors, the local customers. We're not a remote agency guessing at your audience — we live here too." },
  { label: 'Done-For-You', icon: '🛠️', body: 'Zero tech knowledge required. We handle the design, development, hosting, SEO, and ongoing updates. You run your business. We run your web presence.' },
  { label: 'Proven ROI', icon: '📈', body: 'Every decision is backed by data — not guesses. We track rankings, traffic, and leads month over month so you always know exactly what your investment is returning.' },
];

const stats = [
  { value: '$0', label: 'Down to Start' },
  { value: '48hr', label: 'Mockup Turnaround' },
  { value: '5–7', label: 'Days to Launch' },
  { value: '90+', label: 'Lighthouse Score' },
];

const techStack = [
  { name: 'Next.js + Vercel', desc: 'The same stack powering Fortune 500 companies. Enterprise-grade performance, 99.99% uptime, global CDN delivery.' },
  { name: 'AI Chatbots', desc: '24/7 lead capture and customer support — custom-trained on your business, your services, your FAQs.' },
  { name: 'SEO Infrastructure', desc: 'Structured data, Core Web Vitals, semantic markup, and automated content pipelines built in from day one.' },
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

const PAD = 'clamp(80px, 10vw, 140px) clamp(20px, 6vw, 80px)';

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
      <Nav />
      <main style={{ background: 'var(--bg)', color: 'var(--silver)', minHeight: '100vh' }}>

        {/* ── Hero ── */}
        <section style={{ padding: 'clamp(140px,18vw,200px) clamp(20px,6vw,80px) clamp(80px,10vw,120px)', textAlign: 'center', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(30,61,143,0.22) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <ScrollReveal>
            <p className="sec-label fu" style={{ justifyContent: 'center' }}>About Caliber Web Studio</p>
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
              We&apos;re not a web design agency. We&apos;re an architecture firm for your digital presence — building systems that attract customers, convert leads, and compound over time.
            </p>
          </ScrollReveal>
        </section>

        {/* ── The Story ── */}
        <section style={{ padding: PAD, borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: '780px', margin: '0 auto' }}>
            <ScrollReveal>
              <p className="sec-label">The Story</p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(32px,5vw,56px)', color: '#fff', marginBottom: '40px', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                Local Businesses Deserve Better
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={140}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <p style={{ fontSize: 'clamp(16px,1.6vw,19px)', color: 'var(--silver)', lineHeight: 1.8, maxWidth: '100%' }}>
                  Caliber Web Studio was founded by <strong style={{ color: 'var(--text-primary)' }}>Darrin Singer</strong> in Detroit, MI — born out of frustration watching local businesses lose customers every single day because their online presence was terrible or nonexistent.
                </p>
                <p style={{ fontSize: 'clamp(16px,1.6vw,19px)', color: 'var(--silver)', lineHeight: 1.8, maxWidth: '100%' }}>
                  Great restaurants with no website. Skilled contractors invisible on Google. Shops with real community roots getting outranked by chains with bigger marketing budgets. The playing field was rigged — and it didn&apos;t have to be.
                </p>
                <p style={{ fontSize: 'clamp(16px,1.6vw,19px)', color: 'var(--silver)', lineHeight: 1.8, maxWidth: '100%' }}>
                  We built Caliber on a single belief: <strong style={{ color: 'var(--text-primary)' }}>every local business deserves enterprise-grade web technology at a price that makes sense.</strong> Not a $15/month template. Not a $20K agency engagement. Something better.
                </p>
                <p style={{ fontSize: 'clamp(16px,1.6vw,19px)', color: 'var(--silver)', lineHeight: 1.8, maxWidth: '100%' }}>
                  We&apos;re not a template shop. We&apos;re not freelancers piecing together projects. <strong style={{ color: 'var(--text-primary)' }}>We engineer growth systems</strong> — custom-built, AI-powered, and designed to make your business the obvious choice in your market.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── What Makes Us Different ── */}
        <section style={{ padding: PAD, borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <ScrollReveal>
              <p className="sec-label">What Makes Us Different</p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(32px,5vw,56px)', color: '#fff', marginBottom: 'clamp(40px,5vw,64px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                Not an Agency. An Advantage.
              </h2>
            </ScrollReveal>
            <ScrollRevealGroup className="diff-grid" stagger={80}>
              {differentiators.map((item) => (
                <div key={item.label} className="diff-card tilt-card" style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '2px', padding: 'clamp(28px,4vw,40px)' }}>
                  <div style={{ fontSize: '32px', marginBottom: '20px' }}>{item.icon}</div>
                  <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '20px', color: 'var(--text-primary)', marginBottom: '12px', letterSpacing: '-0.01em' }}>{item.label}</h3>
                  <p style={{ fontSize: '15px', color: 'var(--chrome)', lineHeight: 1.7, maxWidth: '100%' }}>{item.body}</p>
                </div>
              ))}
            </ScrollRevealGroup>
          </div>
          <style>{`
            .diff-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(16px,2vw,24px); }
            @media (max-width: 900px) { .diff-grid { grid-template-columns: repeat(2, 1fr); } }
            @media (max-width: 600px) { .diff-grid { grid-template-columns: 1fr; } }
            .about-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--border); }
            @media (max-width: 640px) { .about-stats-grid { grid-template-columns: repeat(2, 1fr); } }
          `}</style>
        </section>

        {/* ── The Numbers ── */}
        <section style={{ padding: PAD, borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <ScrollReveal>
              <p className="sec-label" style={{ justifyContent: 'center' }}>How We Work</p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(32px,5vw,56px)', color: '#fff', marginBottom: 'clamp(40px,5vw,60px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                Built Around Your Confidence
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={140}>
              <div className="about-stats-grid">
                {stats.map((stat) => (
                  <div key={stat.label} style={{ background: 'var(--bg2)', padding: 'clamp(32px,4vw,52px) 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(40px,5vw,64px)', color: 'var(--text-primary)', lineHeight: 1, letterSpacing: '-0.02em' }}>{stat.value}</div>
                    <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--chrome)' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Tech Stack ── */}
        <section style={{ padding: PAD, borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <ScrollReveal>
              <p className="sec-label">Under the Hood</p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(32px,5vw,56px)', color: '#fff', marginBottom: '16px', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                Fortune 500 Tech.<br />Local Business Price.
              </h2>
              <p style={{ fontSize: 'clamp(16px,1.6vw,19px)', color: 'var(--chrome)', maxWidth: '540px', marginBottom: 'clamp(40px,5vw,56px)', lineHeight: 1.7 }}>
                Your site runs on the same infrastructure trusted by global enterprises — not shared WordPress hosting that buckles under traffic.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={140}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
                {techStack.map((item) => (
                  <div key={item.name} style={{ display: 'flex', alignItems: 'flex-start', gap: '40px', padding: 'clamp(24px,3vw,36px) clamp(24px,4vw,44px)', background: 'var(--bg)', flexWrap: 'wrap' }}>
                    <div style={{ minWidth: '200px', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '18px', color: 'var(--text-primary)' }}>{item.name}</div>
                    <div style={{ flex: 1, minWidth: '200px', fontSize: '15px', color: 'var(--chrome)', lineHeight: 1.7 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ padding: 'clamp(100px,12vw,160px) clamp(20px,6vw,80px)', textAlign: 'center' }}>
          <ScrollReveal>
            <p className="sec-label" style={{ justifyContent: 'center' }}>Let&apos;s Build</p>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(36px,5vw,64px)', color: '#fff', marginBottom: '24px', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
              Ready to See What We<br />Can Build for You?
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={140}>
            <p style={{ color: 'var(--chrome)', fontSize: 'clamp(16px,1.8vw,20px)', maxWidth: '480px', margin: '0 auto 48px', lineHeight: 1.7 }}>
              We&apos;ll build your site. You&apos;ll see it live. Then you decide. No risk, no pressure, no templates.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/pricing" className="btn-chrome" style={{ textDecoration: 'none' }}>See Pricing</Link>
              <Link href="/contact" className="btn-line" style={{ textDecoration: 'none' }}>Get in Touch</Link>
            </div>
          </ScrollReveal>
        </section>

      </main>
      <Footer />
    </>
  );
}
