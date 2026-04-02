import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: { absolute: 'Our Guarantee | Caliber Web Studio — Zero Risk' },
  description: 'We build your site before you pay. Unlimited revisions. No contracts. Cancel anytime. Read exactly what Caliber Web Studio promises every client.',
  alternates: { canonical: 'https://caliberwebstudio.com/guarantee' },
  openGraph: {
    title: 'The Caliber Guarantee — Zero Risk, Zero Upfront',
    description: '$0 down. Unlimited revisions. No contracts. See exactly what we promise every client.',
    url: 'https://caliberwebstudio.com/guarantee',
    type: 'website',
  },
};

const promises = [
  {
    number: '01',
    title: '$0 Down. Always.',
    color: '#1E3D8F',
    body: 'You pay nothing to get started. We research your business, build your mockup, and deliver a fully designed website before a single dollar changes hands. Your first payment only kicks in when you\'ve reviewed everything and given the green light.',
    detail: 'This isn\'t a trial. This isn\'t a demo. It\'s your actual site — real content, real branding, real layout.',
  },
  {
    number: '02',
    title: 'Unlimited Revisions Until You Love It',
    color: '#0891b2',
    body: 'During the mockup phase, you can request as many changes as it takes. Different headline. Different colors. Completely different layout. We don\'t cap revisions, and we don\'t charge per round. We revise until it\'s exactly right.',
    detail: 'The only thing we ask: be honest. If you don\'t like something, tell us. We\'d rather hear it from you than have you settle for less.',
  },
  {
    number: '03',
    title: 'Mockup in 48 Hours',
    color: '#16a34a',
    body: 'Within 48 hours of receiving your business information, you\'ll see a full design of your new site. Not a wireframe. Not a mood board. A real, functional mockup built on your actual domain with your actual content.',
    detail: 'If something urgent comes up on our end and we\'re running behind, we\'ll tell you — no surprises.',
  },
  {
    number: '04',
    title: 'No Contracts. No Lock-In.',
    color: '#d97706',
    body: 'Your monthly plan has no minimum term. Cancel anytime with 30 days written notice to darrin@caliberwebstudio.com. No early termination fees. No penalties. No questions asked.',
    detail: 'We keep clients because the results speak for themselves — not because we trapped them.',
  },
  {
    number: '05',
    title: 'One Flat Rate. No Surprise Invoices.',
    color: '#7c3aed',
    body: 'Your monthly plan covers everything: design, development, hosting, SSL, security updates, ongoing support, and monthly content updates. One number. One invoice. Nothing extra billed unless you specifically request and approve an add-on.',
    detail: 'We will never add a line item to your invoice without a written approval from you first.',
  },
  {
    number: '06',
    title: 'Your Content Is Always Yours',
    color: '#0d9488',
    body: 'Your domain name, your content, your photos, your brand assets — they belong to you. If you ever leave Caliber, we\'ll provide a complete export of everything. You built your business; you own your digital presence.',
    detail: 'Monthly hosting covers the infrastructure. The content itself is yours, period.',
  },
];

const whatHappensIf = [
  { q: 'What if I don\'t like the first mockup?', a: 'We revise it. No limit on rounds, no extra charge. You tell us what you\'d change and we rebuild it until you\'re satisfied.' },
  { q: 'What if I go silent during the review?', a: 'We\'ll follow up after 3 business days, then again after 7. If we don\'t hear back within 30 days, the project is paused — not canceled. It picks back up whenever you\'re ready.' },
  { q: 'What if there\'s a technical issue after launch?', a: 'All plans include ongoing maintenance and support. Report the issue and we target a fix within 24 business hours for critical issues, 72 hours for non-critical.' },
  { q: 'What if I want to move to a different agency?', a: 'We\'ll respect that decision. Give us 30 days notice, and we\'ll prepare a full handoff package: all files, credentials, and documentation your next provider needs.' },
];

export default function GuaranteePage() {
  return (
    <>
      <Nav />
      <main style={{ background: 'var(--bg)', color: 'var(--silver)', minHeight: '100vh' }}>

        {/* Hero */}
        <section style={{ padding: 'clamp(140px,16vw,180px) clamp(20px,6vw,80px) clamp(80px,10vw,120px)', textAlign: 'center', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(30,61,143,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <ScrollReveal>
            <p className="sec-label fu" style={{ justifyContent: 'center' }}>The Caliber Guarantee</p>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h1 className="fu" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(44px,7vw,88px)', lineHeight: 1.0, letterSpacing: '-0.03em', color: '#fff', margin: '20px 0 24px' }}>
              Zero Risk.<br />
              <span style={{ background: 'linear-gradient(135deg, #1E3D8F, #0891b2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Zero Compromise.</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={140}>
            <p className="fu" style={{ fontSize: 'clamp(17px,2vw,20px)', color: 'var(--chrome)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
              This is our commitment in writing. Every client. Every project. No fine print.
            </p>
          </ScrollReveal>
        </section>

        {/* Stats strip */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
          {([['$0', 'Down to start'], ['48 hrs', 'Mockup delivered'], ['Unlimited', 'Revision rounds'], ['30 days', 'Cancel notice']]) .map(([val, label]) => (
            <div key={label} style={{ padding: 'clamp(28px,4vw,48px) 24px', textAlign: 'center', borderRight: '1px solid var(--border)' }}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(24px,3.5vw,44px)', color: '#fff', marginBottom: '8px', letterSpacing: '-0.02em' }}>{val}</div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--dim)' }}>{label}</div>
            </div>
          ))}
          <style>{`@media (max-width: 640px) { section .guarantee-strip { grid-template-columns: repeat(2,1fr) !important; } }`}</style>
        </section>

        {/* The Six Promises */}
        <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,80px)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <ScrollReveal>
              <p className="sec-label">What We Promise</p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(32px,5vw,56px)', color: '#fff', marginBottom: 'clamp(48px,6vw,72px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                Six Promises We Keep<br />On Every Project
              </h2>
            </ScrollReveal>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(40px,5vw,64px)' }}>
              {promises.map((p, i) => (
                <ScrollReveal key={p.number} delay={i * 60}>
                  <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '32px', alignItems: 'start' }}>
                    <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(36px,4vw,52px)', color: p.color, lineHeight: 1, opacity: 0.8 }}>{p.number}</div>
                    <div>
                      <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(20px,2.5vw,28px)', color: '#fff', marginBottom: '14px', letterSpacing: '-0.015em', lineHeight: 1.2 }}>{p.title}</h3>
                      <p style={{ fontSize: '16px', color: 'var(--silver)', lineHeight: 1.8, marginBottom: '12px' }}>{p.body}</p>
                      <p style={{ fontSize: '14px', color: p.color, lineHeight: 1.7, fontStyle: 'italic', paddingLeft: '16px', borderLeft: `2px solid ${p.color}50` }}>{p.detail}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* What happens if… */}
        <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,80px)', borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ScrollReveal>
              <p className="sec-label">Edge Cases</p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4vw,48px)', color: '#fff', marginBottom: 'clamp(36px,5vw,56px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                What Happens If…
              </h2>
            </ScrollReveal>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
              {whatHappensIf.map((item, i) => (
                <ScrollReveal key={i} delay={i * 60}>
                  <div style={{ background: 'var(--bg)', padding: 'clamp(24px,3vw,36px) clamp(24px,4vw,40px)' }}>
                    <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(16px,1.8vw,20px)', color: '#fff', marginBottom: '10px', letterSpacing: '-0.01em' }}>{item.q}</h3>
                    <p style={{ fontSize: '15px', color: 'var(--chrome)', lineHeight: 1.75, margin: 0 }}>{item.a}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal delay={200}>
              <p style={{ fontSize: '14px', color: 'var(--dim)', textAlign: 'center', marginTop: '32px', fontFamily: 'Space Mono, monospace', letterSpacing: '0.04em' }}>
                More questions? <Link href="/faq" style={{ color: 'var(--chrome)', textDecoration: 'none', borderBottom: '1px solid rgba(168,184,200,0.3)' }}>Browse the full FAQ →</Link>
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: 'clamp(100px,12vw,160px) clamp(20px,6vw,80px)', textAlign: 'center' }}>
          <ScrollReveal>
            <p className="sec-label" style={{ justifyContent: 'center' }}>Nothing to Lose</p>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(32px,5vw,60px)', color: '#fff', marginBottom: '20px', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
              Start With a Free Mockup.<br />Decide When You See It.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={140}>
            <p style={{ color: 'var(--chrome)', fontSize: 'clamp(16px,1.8vw,19px)', maxWidth: '480px', margin: '0 auto 44px', lineHeight: 1.7 }}>
              No forms to fill out. No pitch decks. Just tell us about your business and we&apos;ll have something real to show you in 48 hours.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn-chrome" style={{ textDecoration: 'none' }}>Get Your Free Mockup</Link>
              <Link href="/pricing" className="btn-line" style={{ textDecoration: 'none' }}>See Plan Pricing</Link>
            </div>
          </ScrollReveal>
        </section>

      </main>
      <Footer />
    </>
  );
}
