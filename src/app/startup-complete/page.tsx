import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';
import CheckoutButton from '@/components/CheckoutButton';

export const metadata: Metadata = {
  title: { absolute: 'Startup Complete | Caliber Web Studio — Launch in 48 Hours' },
  description: 'Go from zero to fully operational in 48 hours. Website, brand kit, AI systems, Google Business Profile, and LLC filing assistance — all done for you.',
  alternates: { canonical: 'https://caliberwebstudio.com/startup-complete' },
  openGraph: {
    title: 'Startup Complete — Launch Your Business in 48 Hours',
    description: 'Everything you need to launch: website, brand, AI systems, Google setup, and legal filing assistance. One package. 48-hour delivery.',
    url: 'https://caliberwebstudio.com/startup-complete',
    type: 'website',
  },
};

const deliverables = [
  {
    category: 'Web Presence',
    color: '#1E3D8F',
    bg: 'rgba(30,61,143,0.1)',
    items: ['Full 5–7 page custom website', 'Domain registration + professional email setup', 'Google Business Profile created & optimized', 'Schema markup & local SEO structure', 'AI chatbot trained on your business', 'Contact & lead capture forms', 'SSL certificate & secure hosting'],
  },
  {
    category: 'Brand Identity',
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.1)',
    items: ['Logo concept direction and final files', 'Color palette (hex, RGB, CMYK)', 'Typography selection and pairing', 'Social media accounts created & branded (3 platforms)', 'Pitch deck + one-pager (print & digital)', 'Business card layout', 'Brand guidelines document (PDF)'],
  },
  {
    category: 'AI Systems & Growth',
    color: '#0891b2',
    bg: 'rgba(8,145,178,0.1)',
    items: ['AI chatbot widget (trained & deployed)', 'Email/SMS automation setup', '30 days of content scheduled & queued', 'Review request automation setup', 'Lead routing to your phone or email', 'Performance tracking (Analytics + Search Console)'],
  },
  {
    category: 'Legal & Setup',
    color: '#d97706',
    bg: 'rgba(217,119,6,0.1)',
    items: ['LLC formation assistance (Michigan)', 'EIN registration guidance', 'Business bank account setup guidance', 'Business address setup consultation', 'Operating agreement template', 'Launch checklist — nothing falls through'],
  },
];

const timeline = [
  { time: 'Hour 0', title: 'Kickoff Call', desc: 'We spend 60 minutes gathering everything we need — business info, brand preferences, service details, target customers. This is the only thing we need from you.' },
  { time: 'Hours 1–24', title: 'We Build', desc: 'Website mockup, brand concepts, and AI system configuration happen simultaneously. You run your business while we work.' },
  { time: 'Hours 24–36', title: 'Your Review', desc: 'We send everything for your review. One round of feedback — design tweaks, copy adjustments, branding direction.' },
  { time: 'Hours 36–48', title: 'Final Delivery', desc: 'Site goes live on your domain. Brand files delivered. AI systems activated. Legal guidance provided. You\'re open for business.' },
];

const faqs = [
  { q: 'What\'s the price?', a: 'Startup Complete starts at $5,000 for a standard small business launch. Complex projects with advanced features or multiple locations are scoped individually up to $15,000. We quote before you commit.' },
  { q: 'Does this replace the monthly plan?', a: 'Startup Complete is a one-time launch package. After delivery, a monthly plan ($197–$697/mo) covers hosting, maintenance, and ongoing growth. We\'ll recommend the right tier for your stage.' },
  { q: 'Do I need a business idea already?', a: 'Yes — you should have your business concept, target market, and service list ready. We execute on what you\'ve already decided. We\'re not a business planning service.' },
  { q: 'What about the LLC filing?', a: 'We provide guidance and template documents to help you file your own LLC in Michigan. This is not legal advice, and we don\'t file on your behalf. For complex situations, we\'ll recommend a local attorney.' },
  { q: 'Can I get revisions after delivery?', a: 'One full revision round is included within 7 days of delivery. After that, changes are handled through your monthly plan or billed at our hourly rate.' },
];

export default function StartupCompletePage() {
  return (
    <>
      <Nav />
      <main style={{ background: 'var(--bg)', color: 'var(--silver)', minHeight: '100vh' }}>

        {/* Hero */}
        <section style={{ padding: 'clamp(140px,16vw,180px) clamp(20px,6vw,80px) clamp(80px,10vw,120px)', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(245,158,11,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <ScrollReveal>
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#f59e0b', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '100px', padding: '6px 18px', display: 'inline-block', marginBottom: '24px' }}>
              One-Time Package · 48-Hour Delivery
            </span>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(44px,7vw,88px)', lineHeight: 1.0, letterSpacing: '-0.03em', color: '#fff', margin: '0 0 24px' }}>
              Startup Complete
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={140}>
            <p style={{ fontSize: 'clamp(17px,2vw,22px)', color: 'var(--chrome)', maxWidth: '600px', margin: '0 auto 16px', lineHeight: 1.7 }}>
              Go from idea to fully operational business in 48 hours — website, brand, AI systems, Google presence, and legal setup. Done for you, start to finish.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={180}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '8px', margin: '32px 0' }}>
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(48px,7vw,80px)', color: '#fff', lineHeight: 1, letterSpacing: '-0.03em' }}>$5,000</span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: 'var(--dim)' }}>starting · one-time</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={220}>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <CheckoutButton plan="startup" className="startup-hero-cta">Get Started — $5,000</CheckoutButton>
              <Link href="/contact" className="btn-line" style={{ textDecoration: 'none' }}>Ask a Question First</Link>
            </div>
          </ScrollReveal>
        </section>

        {/* Deliverables */}
        <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,80px)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <ScrollReveal>
              <p className="sec-label">What You Get</p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4vw,52px)', color: '#fff', marginBottom: 'clamp(40px,5vw,64px)', letterSpacing: '-0.025em' }}>
                Everything. In 48 Hours.
              </h2>
            </ScrollReveal>
            <div className="startup-grid">
              {deliverables.map((cat, i) => (
                <ScrollReveal key={cat.category} delay={i * 80}>
                  <div style={{ background: cat.bg, border: `1px solid ${cat.color}25`, borderRadius: '20px', padding: 'clamp(28px,4vw,40px)' }}>
                    <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '20px', color: cat.color, marginBottom: '20px' }}>{cat.category}</div>
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '11px' }}>
                      {cat.items.map(item => (
                        <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: 'var(--silver)', lineHeight: 1.55 }}>
                          <span style={{ color: cat.color, fontWeight: 700, fontSize: '15px', lineHeight: 1.4, flexShrink: 0 }}>✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* 48hr timeline */}
        <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,80px)', borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ScrollReveal>
              <p className="sec-label">The Process</p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4vw,48px)', color: '#fff', marginBottom: 'clamp(40px,5vw,60px)', letterSpacing: '-0.025em' }}>
                48 Hours, Start to Open
              </h2>
            </ScrollReveal>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
              {timeline.map((step, i) => (
                <ScrollReveal key={i} delay={i * 70}>
                  <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '32px', padding: 'clamp(24px,3vw,36px) clamp(24px,4vw,40px)', background: 'var(--bg)', alignItems: 'start' }}>
                    <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#f59e0b', fontWeight: 700, paddingTop: '3px' }}>{step.time}</div>
                    <div>
                      <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(16px,2vw,20px)', color: '#fff', marginBottom: '8px', letterSpacing: '-0.01em' }}>{step.title}</h3>
                      <p style={{ fontSize: '15px', color: 'var(--chrome)', lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,80px)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ScrollReveal>
              <p className="sec-label">Questions</p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4vw,48px)', color: '#fff', marginBottom: 'clamp(36px,5vw,52px)', letterSpacing: '-0.025em' }}>Common Questions</h2>
            </ScrollReveal>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
              {faqs.map((faq, i) => (
                <ScrollReveal key={i} delay={i * 55}>
                  <div style={{ background: 'var(--bg)', padding: 'clamp(24px,3vw,36px) clamp(24px,4vw,40px)' }}>
                    <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(16px,1.8vw,20px)', color: '#fff', marginBottom: '10px', letterSpacing: '-0.01em' }}>{faq.q}</h3>
                    <p style={{ fontSize: '15px', color: 'var(--chrome)', lineHeight: 1.75, margin: 0 }}>{faq.a}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: 'clamp(100px,12vw,160px) clamp(20px,6vw,80px)', textAlign: 'center' }}>
          <ScrollReveal>
            <p className="sec-label" style={{ justifyContent: 'center' }}>Ready to Launch?</p>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(32px,5vw,60px)', color: '#fff', marginBottom: '20px', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
              Your Business. Live.<br />In 48 Hours.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={140}>
            <p style={{ color: 'var(--chrome)', fontSize: 'clamp(16px,1.8vw,19px)', maxWidth: '480px', margin: '0 auto 44px', lineHeight: 1.7 }}>
              Starting at $5,000. Scoped to your business. Everything delivered — or your money back.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <CheckoutButton plan="startup" className="startup-hero-cta">Get Started — $5,000</CheckoutButton>
              <Link href="/contact" className="btn-line" style={{ textDecoration: 'none' }}>Talk Through Your Project</Link>
            </div>
          </ScrollReveal>
        </section>

      </main>
      <Footer />
      <style>{`
        .startup-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        @media (max-width: 680px) { .startup-grid { grid-template-columns: 1fr; } }
        .startup-hero-cta { display: inline-block; padding: 15px 36px; background: linear-gradient(90deg, #d97706, #f59e0b); color: #000; border-radius: 9px; font-weight: 700; font-size: 0.95rem; text-decoration: none; letter-spacing: 0.02em; transition: opacity 0.2s, transform 0.2s; box-shadow: 0 4px 24px rgba(245,158,11,0.35); border: none; cursor: pointer; font-family: inherit; }
        .startup-hero-cta:hover { opacity: 0.9; transform: translateY(-2px); }
      `}</style>
    </>
  );
}
