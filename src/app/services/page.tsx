import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Services | Caliber Web Studio – AI-Powered Growth Systems',
  description: 'Every tool your local business needs to dominate online — AI website, chatbot, Google Business Profile, review engine, and more. Plans from $197/mo.',
  alternates: { canonical: 'https://caliberwebstudio.com/services' },
};

const foundation = [
  'Professional mobile-first website',
  'AI-generated copy written for your specific business',
  'Hero section with strong headline',
  'Services section tailored to what you offer',
  'Photo/gallery section',
  'Reviews & testimonials section',
  'Click-to-call buttons',
  'Contact form',
  'Google Maps embed',
  'Hosting & SSL included',
  'Domain connection',
  'Basic on-page SEO',
  'Google Business Profile setup',
  'Schema markup (LocalBusiness + FAQPage)',
  '1 monthly update request',
  'Text & email support',
];

const plans = [
  {
    name: 'Starter',
    price: '$197',
    tagline: 'The Foundation',
    description: 'Everything a local business needs to look legitimate and get found online.',
    color: 'var(--chrome, #A8B8C8)',
    features: [
      { name: 'AI-Optimized Website', desc: 'Custom-built, blazing-fast site with AI features built in' },
      { name: 'AI Chatbot Widget', desc: 'Qualifies leads, books appointments, answers questions 24/7' },
      { name: 'Google Business Profile Setup', desc: 'Fully optimized GBP so you dominate the local map pack' },
      { name: 'Schema Markup', desc: 'LocalBusiness + FAQPage structured data for maximum SEO signal' },
      { name: 'Basic Client Dashboard', desc: 'Track your rankings, traffic, and leads in one place' },
      { name: 'Hosting & SSL', desc: 'Secure, fast hosting — fully managed. No separate bill.' },
      { name: '1 Monthly Update Request', desc: 'Need to change your hours, add a service, update photos? Done.' },
      { name: 'Text & Email Support', desc: 'Real humans. Fast responses.' },
    ],
    cta: 'Start With Starter',
    popular: false,
  },
  {
    name: 'Growth',
    price: '$397',
    tagline: 'The Engine',
    description: 'Everything in Starter, plus automated review collection, social presence, and content that keeps working while you sleep.',
    color: 'var(--navy, #1E3D8F)',
    features: [
      { name: 'Everything in Starter', desc: 'Full foundation included — website, chatbot, GBP, dashboard' },
      { name: 'Review Management System', desc: 'Automated review requests via SMS/email after every job' },
      { name: 'Social Media Auto-Posting', desc: 'AI-generated posts and graphics scheduled and published for you' },
      { name: 'AI Content Engine', desc: '2–4 SEO blog posts per month — written, optimized, and published' },
      { name: 'Full Client Dashboard', desc: 'Rankings, traffic, reviews, social performance — all in one view' },
      { name: 'Priority Support', desc: 'Jump the queue. Fast-tracked responses and updates.' },
    ],
    cta: 'Start With Growth',
    popular: true,
  },
  {
    name: 'Domination',
    price: '$697',
    tagline: 'The Full Stack',
    description: 'Everything in Growth, plus AI phone coverage, citation tracking, and the full automation suite. Maximum visibility. Zero manual effort.',
    color: 'var(--chrome, #A8B8C8)',
    features: [
      { name: 'Everything in Growth', desc: 'Complete engine — website, reviews, social, content, dashboard' },
      { name: 'AI Citation Tracking', desc: 'Monitor and fix your business listings across 80+ directories automatically' },
      { name: 'AI Phone Receptionist', desc: 'Never miss a call. AI answers, qualifies, and routes 24/7' },
      { name: 'Full Automation Suite', desc: 'End-to-end workflow automation — leads, follow-ups, scheduling' },
      { name: 'Advanced SEO Reporting', desc: 'Keyword tracking, competitor analysis, and monthly growth reports' },
      { name: 'Dedicated Account Management', desc: 'A named strategist reviewing your account every month' },
    ],
    cta: 'Start With Domination',
    popular: false,
  },
];

const addons = [
  { name: 'Google Business Profile Management', price: '+$50/mo', desc: 'Weekly posts, profile updates, Q&A responses' },
  { name: 'Review Engine (standalone)', price: '+$50/mo', desc: 'SMS/email review request flow + reminders' },
  { name: 'Social Graphics & Captions', price: '+$100/mo', desc: '4–8 branded graphics and captions per month' },
  { name: 'SEO Blog Content', price: '+$75/mo', desc: '2–4 AI-assisted, human-reviewed SEO posts' },
  { name: 'Visibility Bundle', price: '+$247/mo', desc: 'GBP management + review engine + social graphics' },
];

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main style={{ minHeight: '100vh', paddingTop: '72px', background: 'var(--bg, #141414)' }}>
        <section style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(80px, 12vw, 160px) clamp(20px, 6vw, 80px) clamp(60px, 8vw, 100px)', borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))' }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '24px' }}>What We Build</div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(40px, 7vw, 88px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--silver, #D0D8E0)', marginBottom: '28px', maxWidth: '900px' }}>
            Every Tool You Need to{' '}
            <span style={{ background: 'linear-gradient(135deg, var(--navy, #1E3D8F), var(--chrome, #A8B8C8))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Dominate Your Market</span>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(16px, 2vw, 20px)', lineHeight: 1.7, color: 'var(--dim, rgba(255,255,255,0.5))', maxWidth: '600px', marginBottom: '48px' }}>
            We don't sell websites. We build complete digital growth systems — AI-powered, always-on, engineered to make your business the most visible name in your market.
          </p>
          <Link href="/pricing" style={{ fontFamily: "'Space Mono', monospace", fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--bg, #141414)', background: 'var(--chrome, #A8B8C8)', padding: '14px 32px', textDecoration: 'none', fontWeight: 700, display: 'inline-block' }}>See Pricing →</Link>
        </section>

        <section style={{ borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))', background: 'rgba(30,61,143,0.04)' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(60px, 8vw, 100px) clamp(20px, 6vw, 80px)' }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '16px' }}>Included in Every Plan</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.02em', color: 'var(--silver, #D0D8E0)', marginBottom: '48px', maxWidth: '700px' }}>The Foundation Is Never Negotiated</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
              {foundation.map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px', background: 'var(--bg2, rgba(255,255,255,0.03))', border: '1px solid var(--border, rgba(255,255,255,0.08))', borderRadius: '2px' }}>
                  <span style={{ color: 'var(--navy, #1E3D8F)', fontSize: '16px', fontWeight: 700, flexShrink: 0 }}>✓</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'var(--dim, rgba(255,255,255,0.6))', lineHeight: 1.4 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(60px, 10vw, 120px) clamp(20px, 6vw, 80px)' }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '16px' }}>Monthly Plans</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.02em', color: 'var(--silver, #D0D8E0)', marginBottom: '56px', maxWidth: '700px' }}>Pick Your Level. Upgrade When You're Ready.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2px' }}>
            {plans.map((plan) => (
              <div key={plan.name} style={{ background: plan.popular ? 'linear-gradient(145deg, rgba(30,61,143,0.12) 0%, rgba(30,61,143,0.04) 100%)' : 'var(--bg2, rgba(255,255,255,0.03))', border: plan.popular ? '1px solid rgba(30,61,143,0.45)' : '1px solid var(--border, rgba(255,255,255,0.08))', borderRadius: '2px', padding: 'clamp(28px, 4vw, 48px)', position: 'relative', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s ease' }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
                {plan.popular && <div style={{ position: 'absolute', top: '-13px', left: '32px', background: 'var(--navy, #1E3D8F)', color: 'var(--silver, #D0D8E0)', fontFamily: "'Space Mono', monospace", fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '4px 14px', borderRadius: '2px' }}>Most Popular</div>}
                <div style={{ marginBottom: '32px' }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: plan.color, marginBottom: '8px' }}>{plan.name}</div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', marginBottom: '8px' }}>
                    <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 800, color: 'var(--silver, #D0D8E0)', lineHeight: 1 }}>{plan.price}</span>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '13px', color: 'var(--dim, rgba(255,255,255,0.4))', marginBottom: '6px' }}>/mo</span>
                  </div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '16px', fontWeight: 700, color: plan.color, marginBottom: '12px' }}>{plan.tagline}</div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', lineHeight: 1.6, color: 'var(--dim, rgba(255,255,255,0.5))', margin: 0 }}>{plan.description}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, marginBottom: '32px' }}>
                  {plan.features.map((feat) => (
                    <div key={feat.name} style={{ display: 'flex', gap: '14px', paddingBottom: '16px', borderBottom: '1px solid var(--border, rgba(255,255,255,0.06))' }}>
                      <span style={{ color: plan.color, fontSize: '15px', fontWeight: 700, flexShrink: 0, marginTop: '1px' }}>✓</span>
                      <div>
                        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '15px', fontWeight: 700, color: 'var(--silver, #D0D8E0)', marginBottom: '4px' }}>{feat.name}</div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--dim, rgba(255,255,255,0.45))', lineHeight: 1.5 }}>{feat.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/pricing" style={{ display: 'block', textAlign: 'center', padding: '14px 24px', fontFamily: "'Space Mono', monospace", fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, textDecoration: 'none', background: plan.popular ? 'var(--navy, #1E3D8F)' : 'transparent', color: plan.popular ? '#fff' : 'var(--chrome, #A8B8C8)', border: plan.popular ? '1px solid var(--navy, #1E3D8F)' : '1px solid var(--border, rgba(255,255,255,0.15))', borderRadius: '2px' }}>{plan.cta} — $0 Down</Link>
              </div>
            ))}
          </div>
        </section>

        <section style={{ borderTop: '1px solid var(--border, rgba(255,255,255,0.08))', background: 'rgba(30,61,143,0.03)', padding: 'clamp(60px, 8vw, 100px) clamp(20px, 6vw, 80px)' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '16px' }}>Add-Ons</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.02em', color: 'var(--silver, #D0D8E0)', marginBottom: '48px', maxWidth: '600px' }}>Stack On More When You're Ready</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2px' }}>
              {addons.map((addon) => (
                <div key={addon.name} style={{ background: 'var(--bg2, rgba(255,255,255,0.03))', border: '1px solid var(--border, rgba(255,255,255,0.08))', padding: '28px 32px', borderRadius: '2px', display: 'flex', flexDirection: 'column', gap: '10px', transition: 'border-color 0.2s' }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--navy, #1E3D8F)'; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border, rgba(255,255,255,0.08))'; }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '16px', fontWeight: 700, color: 'var(--silver, #D0D8E0)', lineHeight: 1.3, flex: 1, paddingRight: '16px' }}>{addon.name}</div>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '13px', fontWeight: 700, color: 'var(--chrome, #A8B8C8)', whiteSpace: 'nowrap', flexShrink: 0 }}>{addon.price}</div>
                  </div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', lineHeight: 1.6, color: 'var(--dim, rgba(255,255,255,0.45))' }}>{addon.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ borderTop: '1px solid var(--border, rgba(255,255,255,0.08))', padding: 'clamp(60px, 10vw, 120px) clamp(20px, 6vw, 80px)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '20px' }}>Your Business Deserves Better</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--silver, #D0D8E0)', marginBottom: '24px' }}>Start With $0 Down</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(15px, 2vw, 18px)', lineHeight: 1.7, color: 'var(--dim, rgba(255,255,255,0.5))', marginBottom: '40px', maxWidth: '500px', margin: '0 auto 40px' }}>We build your site, you see it live, and you decide. No upfront cost, no obligation. Your business already looks good in real life — this makes your online presence match it.</p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/pricing" style={{ fontFamily: "'Space Mono', monospace", fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--bg, #141414)', background: 'var(--chrome, #A8B8C8)', padding: '14px 32px', textDecoration: 'none', fontWeight: 700, display: 'inline-block' }}>View Full Pricing →</Link>
              <Link href="/#contact" style={{ fontFamily: "'Space Mono', monospace", fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', padding: '14px 32px', textDecoration: 'none', fontWeight: 700, display: 'inline-block', border: '1px solid var(--border, rgba(255,255,255,0.08))' }}>Get My Free Mockup</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
