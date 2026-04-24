import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: { absolute: 'Review Automation | Caliber Web Studio' },
  description: 'AI-powered review automation for Detroit small businesses. Automatically ask every customer for a 5-star review at the perfect time — and route unhappy customers to you privately first.',
  alternates: { canonical: 'https://www.caliberwebstudio.com/services/review-automation' },
  openGraph: {
    title: 'Review Automation | Caliber Web Studio',
    description: 'AI-powered review automation for Detroit small businesses. Automatically ask every customer for a 5-star review at the perfect time.',
    url: 'https://www.caliberwebstudio.com/services/review-automation',
    type: 'website',
  },
};

const steps = [
  {
    number: '01',
    title: 'Service Detected',
    description: 'A customer completes a service, books an appointment, or makes a purchase — your system detects it automatically.',
  },
  {
    number: '02',
    title: 'AI Sends the Ask',
    description: 'A personalized review request goes out via SMS or email at the optimal window — when the experience is fresh and satisfaction is highest.',
  },
  {
    number: '03',
    title: 'Smart Routing',
    description: 'Happy customers get directed straight to Google or Yelp. Unhappy ones get routed to you privately first — before they go public.',
  },
];

const stats = [
  { value: '266%', label: 'more leads for businesses with 50+ reviews' },
  { value: '90%', label: 'of consumers read reviews before visiting' },
  { value: '4×', label: 'higher review rate when asked at the right time' },
];

const included = [
  'Automated review request sequences (SMS + email)',
  'Smart routing — positive → Google, negative → private feedback',
  'Review monitoring dashboard',
  'Response templates for positive and negative reviews',
  'Monthly review performance reports',
  'Google Business Profile optimization',
];

const faq = [
  {
    q: 'Will this actually get me more reviews?',
    a: 'Yes — most businesses get 3–5× more reviews within the first 60 days. The key is asking at the right moment with a personal message, not a generic blast.',
  },
  {
    q: 'What if a customer leaves a negative review?',
    a: 'Our smart routing catches unhappy customers before they post publicly. They&apos;re redirected to a private feedback form so you can address the issue first. This dramatically reduces public negative reviews.',
  },
  {
    q: 'Which review platforms does this support?',
    a: 'We prioritize Google Business Profile because it has the highest SEO impact. We also support Yelp, Facebook, and industry-specific platforms depending on your business type.',
  },
  {
    q: 'How does the system know when a customer is ready?',
    a: "We connect to your booking system, POS, or CRM to trigger review requests automatically. If you don't have one, we set up a simple manual trigger that takes seconds to use.",
  },
  {
    q: "Is this against Google's terms of service?",
    a: "No. Asking customers for honest reviews is completely within Google's guidelines. What's not allowed is incentivizing reviews or filtering who gets to post — our system does neither.",
  },
  {
    q: 'Do I have to respond to every review?',
    a: 'We give you response templates for both positive and negative reviews so it takes less than 60 seconds per review. Responding to reviews also boosts your local SEO ranking.',
  },
];

export default function ReviewAutomationPage() {
  return (
    <>
      <Nav />
      <main style={{ background: 'var(--bg, #141414)', color: 'var(--silver, #D0D8E0)', minHeight: '100vh' }}>

        {/* Hero */}
        <section style={{ padding: 'clamp(100px,14vw,160px) clamp(20px,6vw,80px) clamp(60px,8vw,100px)', textAlign: 'center', borderBottom: '1px solid var(--border, rgba(168,184,200,0.12))' }}>
          <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '24px' }}>Review Automation</p>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(32px,5.5vw,68px)', lineHeight: 1.05, color: '#fff', marginBottom: '28px', maxWidth: '860px', margin: '0 auto 28px' }}>Turn Happy Customers Into<br />5-Star Reviews — On Autopilot</h1>
          <p style={{ fontSize: 'clamp(16px,2vw,20px)', color: 'var(--chrome, #A8B8C8)', maxWidth: '620px', margin: '0 auto 48px', lineHeight: 1.7 }}>Most businesses leave money on the table by not asking for reviews. Our AI-powered review automation system asks every customer for a review at the perfect time, on the right platform.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/#contact" style={{ display: 'inline-block', background: 'var(--navy, #1E3D8F)', color: '#fff', fontFamily: 'Space Mono, monospace', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', padding: '18px 40px', textDecoration: 'none' }}>Start a Project</Link>
            <Link href="/pricing" style={{ display: 'inline-block', border: '1px solid rgba(168,184,200,0.3)', color: 'var(--silver, #D0D8E0)', fontFamily: 'Space Mono, monospace', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', padding: '18px 40px', textDecoration: 'none' }}>View Pricing</Link>
          </div>
        </section>

        {/* Stats */}
        <section style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,6vw,80px)', borderBottom: '1px solid var(--border, rgba(168,184,200,0.12))', background: 'rgba(30,61,143,0.06)' }}>
          <div style={{ maxWidth: '960px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '40px', textAlign: 'center' }}>
            {stats.map(stat => (
              <div key={stat.value}>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(48px,7vw,80px)', color: 'var(--navy, #1E3D8F)', lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontSize: '15px', color: 'var(--chrome, #A8B8C8)', marginTop: '12px', lineHeight: 1.5 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section style={{ padding: 'clamp(60px,8vw,120px) clamp(20px,6vw,80px)', borderBottom: '1px solid var(--border, rgba(168,184,200,0.12))' }}>
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '16px' }}>The System</p>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(24px,3vw,40px)', color: '#fff', marginBottom: '56px' }}>How It Works</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px' }}>
              {steps.map(step => (
                <div key={step.number} style={{ padding: '40px 32px', background: 'var(--bg2, #1a1a1a)', border: '1px solid var(--border, rgba(168,184,200,0.12))', borderRadius: '6px', position: 'relative' }}>
                  <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--navy, #1E3D8F)', marginBottom: '20px', fontWeight: 700 }}>{step.number}</div>
                  <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '22px', color: '#fff', marginBottom: '16px' }}>{step.title}</h3>
                  <p style={{ fontSize: '15px', color: 'var(--chrome, #A8B8C8)', lineHeight: 1.7 }}>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section style={{ padding: 'clamp(60px,8vw,120px) clamp(20px,6vw,80px)', borderBottom: '1px solid var(--border, rgba(168,184,200,0.12))' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '16px' }}>Everything You Get</p>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(24px,3vw,40px)', color: '#fff', marginBottom: '48px' }}>What's Included</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border, rgba(168,184,200,0.12))' }}>
              {included.map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '24px 28px', background: 'var(--bg, #141414)' }}>
                  <span style={{ color: 'var(--navy, #1E3D8F)', fontWeight: 700, fontSize: '20px', lineHeight: 1, flexShrink: 0 }}>&#10003;</span>
                  <span style={{ fontSize: '16px', color: 'var(--silver, #D0D8E0)' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing CTA */}
        <section style={{ padding: 'clamp(60px,8vw,120px) clamp(20px,6vw,80px)', borderBottom: '1px solid var(--border, rgba(168,184,200,0.12))', background: 'rgba(30,61,143,0.06)', textAlign: 'center' }}>
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--navy, #1E3D8F)', marginBottom: '20px', fontWeight: 700 }}>Included in Every Plan</p>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(26px,4vw,44px)', color: '#fff', marginBottom: '24px', lineHeight: 1.1 }}>Already a Client? It's Already On.</h2>
            <p style={{ fontSize: 'clamp(16px,2vw,18px)', color: 'var(--chrome, #A8B8C8)', marginBottom: '40px', lineHeight: 1.7 }}>Review automation is included with all Caliber Web Studio plans. Not a client yet? Start a project and get this built in — along with your website, AI chatbot, and everything else you need to dominate your local market.</p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/#contact" style={{ display: 'inline-block', background: 'var(--navy, #1E3D8F)', color: '#fff', fontFamily: 'Space Mono, monospace', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', padding: '18px 40px', textDecoration: 'none' }}>Start a Project</Link>
              <Link href="/pricing" style={{ display: 'inline-block', border: '1px solid rgba(168,184,200,0.3)', color: 'var(--silver, #D0D8E0)', fontFamily: 'Space Mono, monospace', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', padding: '18px 40px', textDecoration: 'none' }}>See Pricing</Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: 'clamp(60px,8vw,120px) clamp(20px,6vw,80px)' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '16px' }}>FAQ</p>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(24px,3vw,40px)', color: '#fff', marginBottom: '48px' }}>Common Questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border, rgba(168,184,200,0.12))' }}>
              {faq.map(item => (
                <div key={item.q} style={{ padding: '32px 28px', background: 'var(--bg, #141414)' }}>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '17px', color: '#fff', marginBottom: '12px' }}>{item.q}</div>
                  <div style={{ fontSize: '15px', color: 'var(--chrome, #A8B8C8)', lineHeight: 1.7 }}>{item.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
