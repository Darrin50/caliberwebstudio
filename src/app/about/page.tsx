import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

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
  twitter: {
    card: 'summary_large_image',
    title: 'About Caliber Web Studio',
    description: 'Detroit-rooted. AI-powered. We engineer growth systems for local businesses.',
  },
};

const differentiators = [
  {
    label: 'AI-Powered Everything',
    icon: '⚡',
    body: 'Chatbots, content generation, SEO automation, and review management — all built in-house. Not bolted on. Not outsourced. Engineered from the ground up.',
  },
  {
    label: 'Speed: 3-Day Launch',
    icon: '🚀',
    body: 'Most agencies take weeks. We take 72 hours. Your site is live, tested, and generating leads before your competitors finish their kickoff call.',
  },
  {
    label: 'Demo-First Model',
    icon: '🎯',
    body: "See your real, fully-built website before you pay a single dollar. We build it. You approve it. Then we talk money. Zero risk on your end.",
  },
  {
    label: 'Detroit-Focused',
    icon: '🏙️',
    body: 'We know the local market, the local competitors, the local customers. We\'re not a remote agency guessing at your audience — we live here too.',
  },
  {
    label: 'Done-For-You',
    icon: '🛠️',
    body: 'Zero tech knowledge required. We handle the design, development, hosting, SEO, and ongoing updates. You run your business. We run your web presence.',
  },
];

const stats = [
  { value: '$0', label: 'Down to Start' },
  { value: '48hr', label: 'Mockup Turnaround' },
  { value: '5–7', label: 'Days to Launch' },
  { value: '30', label: 'In-Depth Guides Published' },
];

const techStack = [
  {
    name: 'Next.js + Vercel',
    desc: 'The same stack powering Fortune 500 companies. Enterprise-grade performance, 99.99% uptime, global CDN delivery.',
  },
  {
    name: 'AI Chatbots',
    desc: '24/7 lead capture and customer support — custom-trained on your business, your services, your FAQs.',
  },
  {
    name: 'SEO Infrastructure',
    desc: 'Structured data, Core Web Vitals, semantic markup, and automated content pipelines built in from day one.',
  },
];

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About Caliber Web Studio',
  description: 'Caliber Web Studio is a Detroit-based AI-powered web studio founded by Darrin Singer. We build enterprise-grade websites for local businesses.',
  url: 'https://caliberwebstudio.com/about',
  mainEntity: {
    '@type': 'ProfessionalService',
    name: 'Caliber Web Studio',
    foundingDate: '2023',
    founder: {
      '@type': 'Person',
      name: 'Darrin Singer',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Detroit',
      addressRegion: 'MI',
      addressCountry: 'US',
    },
    telephone: '+13137992315',
    description: 'AI-powered website design and development for Detroit small businesses.',
    url: 'https://caliberwebstudio.com',
    areaServed: 'Detroit Metropolitan Area',
    knowsAbout: [
      'Web Design',
      'AI Chatbots',
      'Search Engine Optimization',
      'Next.js Development',
      'Local Business Marketing',
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <Nav />
      <main style={{ background: 'var(--bg, #141414)', color: 'var(--silver, #D0D8E0)', minHeight: '100vh' }}>

        {/* ── Hero ── */}
        <section style={{ padding: 'clamp(120px,16vw,180px) clamp(20px,6vw,80px) clamp(80px,10vw,120px)', textAlign: 'center', borderBottom: '1px solid var(--border, rgba(168,184,200,0.12))', position: 'relative', overflow: 'hidden' }}>
          {/* Top gradient glow */}
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(30,61,143,0.22) 0%, transparent 70%)', pointerEvents: 'none' }} />
          {/* Bottom gradient fade */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to bottom, transparent, rgba(14,14,14,0.4))', pointerEvents: 'none' }} />
          <p className="fu" style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '24px', position: 'relative' }}>About Caliber Web Studio</p>
          <h1 className="fu" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(36px,6vw,80px)', lineHeight: 1.0, color: '#fff', marginBottom: '32px', position: 'relative' }}>
            Built in Detroit.<br />
            Powered by AI.<br />
            <span style={{ background: 'linear-gradient(135deg, #1E3D8F, #A8B8C8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Designed to Dominate.</span>
          </h1>
          <p className="fu" style={{ fontSize: 'clamp(17px,2vw,22px)', color: 'var(--chrome, #A8B8C8)', maxWidth: '620px', margin: '0 auto', lineHeight: 1.65, position: 'relative' }}>
            We&apos;re not a web design agency. We&apos;re an architecture firm for your digital presence — building systems that attract customers, convert leads, and compound over time.
          </p>
        </section>

        {/* ── The Story ── */}
        <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,80px)', borderBottom: '1px solid var(--border, rgba(168,184,200,0.12))' }}>
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <p className="fu" style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '24px' }}>The Story</p>
            <h2 className="fu" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4vw,52px)', color: '#fff', marginBottom: '40px', lineHeight: 1.1 }}>
              Local Businesses Deserve Better
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <p style={{ fontSize: 'clamp(16px,1.6vw,19px)', color: 'var(--silver, #D0D8E0)', lineHeight: 1.8 }}>
                Caliber Web Studio was founded by <strong style={{ color: 'var(--text-primary)' }}>Darrin Singer</strong> in Detroit, MI — born out of frustration watching local businesses lose customers every single day because their online presence was terrible or nonexistent.
              </p>
              <p style={{ fontSize: 'clamp(16px,1.6vw,19px)', color: 'var(--silver, #D0D8E0)', lineHeight: 1.8 }}>
                Great restaurants with no website. Skilled contractors invisible on Google. Shops with real community roots getting outranked by chains with bigger marketing budgets. The playing field was rigged — and it didn&apos;t have to be.
              </p>
              <p style={{ fontSize: 'clamp(16px,1.6vw,19px)', color: 'var(--silver, #D0D8E0)', lineHeight: 1.8 }}>
                We built Caliber on a single belief: <strong style={{ color: 'var(--text-primary)' }}>every local business deserves enterprise-grade web technology at a price that makes sense.</strong> Not a $15/month template. Not a $20K agency engagement that takes months and delivers mediocre results. Something better.
              </p>
              <p style={{ fontSize: 'clamp(16px,1.6vw,19px)', color: 'var(--silver, #D0D8E0)', lineHeight: 1.8 }}>
                We&apos;re not a template shop. We&apos;re not freelancers piecing together projects. <strong style={{ color: 'var(--text-primary)' }}>We engineer growth systems</strong> — custom-built, AI-powered, and designed to make your business the obvious choice in your market.
              </p>
            </div>
          </div>
        </section>

        {/* ── What Makes Us Different ── */}
        <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,80px)', borderBottom: '1px solid var(--border, rgba(168,184,200,0.12))' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <p className="fu" style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '16px' }}>What Makes Us Different</p>
            <h2 className="fu" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4vw,52px)', color: '#fff', marginBottom: '56px', lineHeight: 1.1 }}>
              Not an Agency. An Advantage.
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {differentiators.map((item) => (
                <div key={item.label} className="diff-card" style={{ background: 'var(--bg2, #1a1a1a)', border: '1px solid var(--border, rgba(168,184,200,0.12))', borderRadius: '12px', padding: '36px 32px' }}>
                  <div style={{ fontSize: '32px', marginBottom: '16px' }}>{item.icon}</div>
                  <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '20px', color: 'var(--text-primary)', marginBottom: '12px' }}>{item.label}</h3>
                  <p style={{ fontSize: '15px', color: 'var(--chrome, #A8B8C8)', lineHeight: 1.7 }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── The Numbers ── */}
        <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,80px)', borderBottom: '1px solid var(--border, rgba(168,184,200,0.12))', background: 'rgba(30,61,143,0.06)' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
            <p className="fu" style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '16px' }}>How We Work</p>
            <h2 className="fu" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4vw,52px)', color: '#fff', marginBottom: '64px', lineHeight: 1.1 }}>
              Built Around Your Confidence
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2px', background: 'var(--border, rgba(168,184,200,0.12))' }}>
              {stats.map((stat) => (
                <div key={stat.label} style={{ background: 'var(--bg, #141414)', padding: '48px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(48px,6vw,72px)', color: 'var(--text-primary)', lineHeight: 1 }}>{stat.value}</div>
                  <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)' }}>{stat.label}</div>
                </div>
              ))}
            </div>
            <p style={{ marginTop: '32px', fontSize: '13px', color: 'var(--dim, rgba(208,216,224,0.45))', fontStyle: 'italic' }}>
              Demo-first model — you see exactly what you're getting before you ever pay a cent.
            </p>
          </div>
        </section>

        {/* ── Tech Stack ── */}
        <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,80px)', borderBottom: '1px solid var(--border, rgba(168,184,200,0.12))' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <p className="fu" style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '16px' }}>Under the Hood</p>
            <h2 className="fu" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4vw,52px)', color: '#fff', marginBottom: '16px', lineHeight: 1.1 }}>
              Fortune 500 Tech.<br />Local Business Price.
            </h2>
            <p style={{ fontSize: 'clamp(16px,1.6vw,19px)', color: 'var(--chrome, #A8B8C8)', maxWidth: '580px', marginBottom: '56px', lineHeight: 1.7 }}>
              Your site runs on the same infrastructure trusted by global enterprises — not shared WordPress hosting that buckles under traffic.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border, rgba(168,184,200,0.12))' }}>
              {techStack.map((item) => (
                <div key={item.name} style={{ display: 'flex', alignItems: 'flex-start', gap: '32px', padding: '32px 40px', background: 'var(--bg, #141414)', flexWrap: 'wrap' }}>
                  <div style={{ minWidth: '220px', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '18px', color: 'var(--text-primary)' }}>{item.name}</div>
                  <div style={{ flex: 1, fontSize: '15px', color: 'var(--chrome, #A8B8C8)', lineHeight: 1.7 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ padding: 'clamp(100px,12vw,160px) clamp(20px,6vw,80px)', textAlign: 'center' }}>
          <p className="fu" style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '24px' }}>Let&apos;s Build</p>
          <h2 className="fu" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(32px,5vw,64px)', color: '#fff', marginBottom: '24px', lineHeight: 1.05 }}>
            Ready to See What We<br />Can Build for You?
          </h2>
          <p className="fu" style={{ color: 'var(--chrome, #A8B8C8)', fontSize: 'clamp(16px,1.8vw,20px)', maxWidth: '520px', margin: '0 auto 48px', lineHeight: 1.65 }}>
            We&apos;ll build your site. You&apos;ll see it live. Then you decide. No risk, no pressure, no templates.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/pricing" style={{ display: 'inline-block', background: 'var(--navy, #1E3D8F)', color: '#fff', fontFamily: 'Space Mono, monospace', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', padding: '18px 48px', textDecoration: 'none', fontWeight: 700 }}>See Pricing</Link>
            <Link href="/contact" style={{ display: 'inline-block', background: 'transparent', color: 'var(--silver, #D0D8E0)', fontFamily: 'Space Mono, monospace', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', padding: '18px 48px', textDecoration: 'none', border: '1px solid var(--border, rgba(168,184,200,0.3))' }}>Get in Touch</Link>
          </div>
        </section>

      </main>
      <Footer />

      <style>{`
        /* About page: fade-up reveal uses the global .fu / .fu.on system */
        /* Stagger delays for hero elements */
        .about-hero-label { transition-delay: 0s !important; }
        .about-hero-h1    { transition-delay: 0.1s !important; }
        .about-hero-sub   { transition-delay: 0.2s !important; }

        /* Differentiator card hover enhancement */
        .diff-card {
          transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease !important;
        }
        .diff-card:hover {
          border-color: rgba(30,61,143,0.5) !important;
          transform: translateY(-3px) !important;
          box-shadow: 0 12px 32px rgba(30,61,143,0.15) !important;
        }
      `}</style>
    </>
  );
}
