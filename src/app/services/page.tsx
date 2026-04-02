import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { ScrollReveal, ScrollRevealGroup } from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: { absolute: 'Services | Caliber Web Studio — What We Build' },
  description: 'Every tool a Detroit local business needs online — custom website, AI chatbot, review engine, SEO, social content, and a live dashboard. All in one monthly plan.',
  alternates: { canonical: 'https://caliberwebstudio.com/services' },
  openGraph: {
    title: 'Services | Caliber Web Studio — What We Build',
    description: 'AI-powered websites, chatbots, review automation, and local SEO for Detroit businesses. One flat monthly rate, zero upfront.',
    url: 'https://caliberwebstudio.com/services',
    type: 'website',
  },
};

const foundation = [
  'Custom design — no templates, ever',
  'Mobile-first responsive layout',
  'AI chatbot widget (trained on your business)',
  'Contact & lead capture forms',
  'Google Analytics + Search Console setup',
  'Schema markup & local SEO structure',
  'Core Web Vitals optimized (90+ Lighthouse)',
  'SSL security certificate',
  'Google Business Profile optimization',
  'Social media profile links',
  'Accessibility compliance',
  'Cross-browser compatibility',
  'Hosting & infrastructure included',
  'Monthly content updates',
  'Priority email support',
  'No long-term contracts',
];

const services = [
  {
    tag: 'Every Plan',
    color: '#1E3D8F',
    bg: 'rgba(30,61,143,0.08)',
    title: 'AI-Powered Website',
    body: 'Not a template. Not a drag-and-drop builder. A custom-engineered site built for your specific industry, customers, and city — with AI features baked in from day one. Fast, clean, and designed to rank.',
    href: null,
  },
  {
    tag: 'AI',
    color: '#0891b2',
    bg: 'rgba(8,145,178,0.08)',
    title: 'AI Chatbot Widget',
    body: 'Answers questions, captures leads, and books appointments 24/7 — even when you\'re asleep. Trained on your services, your FAQs, and your pricing. Not a generic bot. Your business, automated.',
    href: '/services/ai-chatbot',
  },
  {
    tag: 'SEO',
    color: '#16a34a',
    bg: 'rgba(22,163,74,0.08)',
    title: 'Local SEO & Google Business',
    body: 'Your Google Business Profile optimized end-to-end. Schema markup, geo-targeted landing pages, citation building, and structured data that tells Google exactly who you are and where you serve.',
    href: null,
  },
  {
    tag: 'Growth',
    color: '#d97706',
    bg: 'rgba(217,119,6,0.08)',
    title: 'Review Engine',
    body: 'Automated review requests sent to real customers after every visit. Your reputation builds on autopilot — more 5-star reviews, higher local rankings, and more trust from first-time visitors.',
    href: '/services/review-automation',
  },
  {
    tag: 'Content',
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.08)',
    title: 'Social Content System',
    body: 'AI-generated posts, graphics, and captions crafted for your brand — then scheduled and published for you monthly. Consistent social presence without the time investment.',
    href: null,
  },
  {
    tag: 'Insights',
    color: '#0d9488',
    bg: 'rgba(13,148,136,0.08)',
    title: 'Client Dashboard',
    body: 'Real-time visibility into everything that matters: search rankings, website traffic, lead volume, and review counts — all in one place. No guessing. No spreadsheets. Just clear ROI.',
    href: null,
  },
];

const addons = [
  { name: 'Social Media Kit', price: '+$99/mo', desc: 'Branded templates for Instagram, Facebook, and Google Business. Posted and scheduled for you monthly.' },
  { name: 'Logo & Brand Package', price: '+$149', desc: 'Professional logo with full brand guidelines, color palette, typography, and multiple file formats. One-time.' },
  { name: 'Video Content', price: '+$199/mo', desc: 'Short-form video content for your site and social channels, edited and ready to post each month.' },
  { name: 'Google Ads Management', price: '+$299/mo', desc: 'Full setup and monthly management of Google Ads campaigns targeting your service area and keywords.' },
];

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main style={{ background: 'var(--bg)', color: 'var(--silver)', minHeight: '100vh' }}>

        {/* Hero */}
        <section style={{ padding: 'clamp(140px,16vw,180px) clamp(20px,6vw,80px) clamp(80px,10vw,120px)', textAlign: 'center', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(30,61,143,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <ScrollReveal>
            <p className="sec-label fu" style={{ justifyContent: 'center' }}>What We Build</p>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h1 className="fu" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(44px,7vw,88px)', lineHeight: 1.0, letterSpacing: '-0.03em', color: '#fff', margin: '20px 0 24px' }}>
              Not Just a Website.<br />
              <span style={{ background: 'linear-gradient(135deg, #1E3D8F, #0891b2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>A Growth System.</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={140}>
            <p className="fu" style={{ fontSize: 'clamp(17px,2vw,20px)', color: 'var(--chrome)', maxWidth: '540px', margin: '0 auto 40px', lineHeight: 1.7 }}>
              Every tool your Detroit business needs to get found, capture leads, and outrank the competition — all in one flat monthly plan.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/pricing" className="btn-chrome fu" style={{ textDecoration: 'none' }}>See Plans & Pricing</Link>
              <Link href="/work" className="btn-line fu" style={{ textDecoration: 'none' }}>View Live Demos</Link>
            </div>
          </ScrollReveal>
        </section>

        {/* Foundation — what every plan includes */}
        <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,80px)', borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <ScrollReveal>
              <p className="sec-label">Included in Every Plan</p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(32px,4vw,52px)', color: '#fff', marginBottom: '12px', letterSpacing: '-0.025em' }}>
                The Foundation Is Never Negotiated
              </h2>
              <p style={{ fontSize: '17px', color: 'var(--chrome)', maxWidth: '540px', marginBottom: 'clamp(36px,5vw,56px)', lineHeight: 1.7 }}>
                Regardless of which plan you choose, these are non-negotiable starting points. This is our baseline, not our ceiling.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={140}>
              <div className="foundation-grid">
                {foundation.map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '16px 18px', background: 'rgba(30,61,143,0.07)', border: '1px solid rgba(30,61,143,0.18)', borderRadius: '12px' }}>
                    <span style={{ color: '#1E3D8F', fontWeight: 700, fontSize: '16px', lineHeight: 1.4, flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: '14px', color: 'var(--silver)', lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Service deep-dives */}
        <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,80px)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <ScrollReveal>
              <p className="sec-label">The Full Stack</p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(32px,4vw,52px)', color: '#fff', marginBottom: 'clamp(40px,5vw,64px)', letterSpacing: '-0.025em' }}>
                Six Systems. One Mission.
              </h2>
            </ScrollReveal>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
              {services.map((svc, i) => (
                <ScrollReveal key={svc.title} delay={i * 60}>
                  <div style={{ background: 'var(--bg)', padding: 'clamp(28px,4vw,44px) clamp(24px,4vw,44px)', display: 'grid', gridTemplateColumns: '1fr auto', gap: '32px', alignItems: 'start' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px', flexWrap: 'wrap' }}>
                        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: svc.color, background: svc.bg, border: `1px solid ${svc.color}40`, borderRadius: '100px', padding: '4px 12px', fontWeight: 700 }}>{svc.tag}</span>
                        <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(18px,2.2vw,24px)', color: '#fff', margin: 0, letterSpacing: '-0.015em' }}>{svc.title}</h3>
                      </div>
                      <p style={{ fontSize: '15px', color: 'var(--chrome)', lineHeight: 1.75, margin: 0, maxWidth: '580px' }}>{svc.body}</p>
                    </div>
                    {svc.href && (
                      <Link href={svc.href} style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: svc.color, textDecoration: 'none', whiteSpace: 'nowrap', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0, fontWeight: 700 }}>
                        Deep Dive →
                      </Link>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Add-ons */}
        <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,80px)', borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <ScrollReveal>
              <p className="sec-label">Power-Ups</p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4vw,48px)', color: '#fff', marginBottom: '12px', letterSpacing: '-0.025em' }}>
                Add On What You Need
              </h2>
              <p style={{ fontSize: '17px', color: 'var(--chrome)', marginBottom: 'clamp(36px,5vw,52px)', lineHeight: 1.7, maxWidth: '480px' }}>
                Stack any of these on top of your plan. No bundles. Pay for exactly what moves the needle for your business.
              </p>
            </ScrollReveal>
            <ScrollRevealGroup className="addons-grid" stagger={80}>
              {addons.map(addon => (
                <div key={addon.name} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '16px', padding: '28px 28px 24px' }}>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '20px', color: 'var(--silver)', marginBottom: '8px' }}>{addon.name}</div>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '28px', background: 'linear-gradient(90deg, #1E3D8F, #0891b2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1, marginBottom: '12px' }}>{addon.price}</div>
                  <div style={{ fontSize: '14px', color: 'var(--chrome)', lineHeight: 1.7 }}>{addon.desc}</div>
                </div>
              ))}
            </ScrollRevealGroup>
          </div>
        </section>

        {/* CTA — unique to this page: see pricing */}
        <section style={{ padding: 'clamp(100px,12vw,160px) clamp(20px,6vw,80px)', textAlign: 'center' }}>
          <ScrollReveal>
            <p className="sec-label" style={{ justifyContent: 'center' }}>Ready to Pick Your Plan?</p>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(32px,5vw,60px)', color: '#fff', marginBottom: '20px', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
              Every Service.<br />One Monthly Rate.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={140}>
            <p style={{ color: 'var(--chrome)', fontSize: 'clamp(16px,1.8vw,19px)', maxWidth: '460px', margin: '0 auto 44px', lineHeight: 1.7 }}>
              Starter at $197, Growth at $397, or full Domination at $697. Every plan starts at $0 down with a free mockup.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/pricing" className="btn-chrome" style={{ textDecoration: 'none' }}>Compare All Plans</Link>
              <Link href="/compare" className="btn-line" style={{ textDecoration: 'none' }}>See How We Stack Up</Link>
            </div>
          </ScrollReveal>
        </section>

      </main>
      <Footer />
      <style>{`
        .foundation-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        @media (max-width: 960px) { .foundation-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px)  { .foundation-grid { grid-template-columns: 1fr; } }
        .addons-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        @media (max-width: 600px) { .addons-grid { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
}
