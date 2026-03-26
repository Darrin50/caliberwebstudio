import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Our Process | Caliber Web Studio',
  description: 'See exactly how Caliber Web Studio builds your AI-powered website — free mockup first, you approve, then we launch. $0 down, live in 72 hours.',
  alternates: { canonical: 'https://caliberwebstudio.com/process' },
};

const steps = [
  { number: '01', title: 'We Research Your Business', duration: 'Free — No Commitment', description: "We analyze your current online presence, scan your competition, and audit your Google Business Profile. No pitch, no pressure — just a clear picture of where you stand and what's possible.", detail: "You don't have to do anything at this stage. We do the work." },
  { number: '02', title: 'We Build Your Mockup', duration: '48 Hours', description: "Our team builds a fully functional, custom website for your business — for free. Real design, real copy written for your specific services, real AI chatbot configured. You see the actual site before you ever pay a dollar.", detail: "Most agencies charge $3,000–$10,000 upfront. We show you the finished product first." },
  { number: '03', title: 'You Review & Approve', duration: 'Your Call', description: "We send you a live preview link. Browse the site on your phone or desktop. Request any changes — copy, colors, sections, anything. Nothing goes public until you say it's exactly right.", detail: "If you don't love it, we take it down. You owe us nothing." },
  { number: '04', title: 'We Launch in 24 Hours', duration: '24 Hours', description: 'Your AI-powered website goes live on your domain. We deploy your AI chatbot, configure your Google Business Profile, set up schema markup for local SEO, and connect your analytics. Full system, ready to grow.', detail: "From approval to live site in under 24 hours. That's the Caliber standard." },
  { number: '05', title: 'Your Monthly Plan Begins', duration: "After You're Live", description: "Only after your site is live and you're satisfied does your monthly plan start. You get a 14-day live preview — if anything's off, we fix it or you walk away with zero charges. Plans start at $197/mo, all-inclusive.", detail: 'Hosting, SSL, support, updates — all in one flat rate. No surprise bills.' },
];

const faqs = [
  { q: 'Do I really pay nothing upfront?', a: '$0 down. No deposit, no retainer, no credit card before you see your site. We build the mockup on our time and our dime. You only pay when you see the finished product and decide to move forward.' },
  { q: 'How do you build a site so fast?', a: "We use AI-assisted development, proprietary niche templates, and a refined production system built specifically for local businesses. What used to take 6–8 weeks at a traditional agency takes us 48–72 hours." },
  { q: "What if I want changes to the mockup?", a: "We build it right the first time using your business info, but if you want adjustments — different copy, layout tweaks, section changes — we do it. The preview period exists specifically for this. You don't go live until it's perfect." },
  { q: 'What happens after I launch?', a: "Your monthly plan covers everything: hosting, SSL, ongoing support, monthly update requests, and access to your client dashboard. On Growth and Domination plans, we also handle review automation, social posting, and more." },
  { q: 'Is there a contract?', a: "Plans are on a 12-month agreement, but you have a 14-day live preview window before your first charge. If you decide within that window that it's not for you, no charge, no questions." },
  { q: 'What do you need from me to get started?', a: "Your business name, phone number, address, services, hours, and any photos you want to use. That's it. We handle the copy, design, setup, and technical configuration." },
];

export default function ProcessPage() {
  return (
    <>
      <Nav />
      <main style={{ minHeight: '100vh', paddingTop: '72px', background: 'var(--bg, #141414)' }}>
        <section style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(80px, 12vw, 160px) clamp(20px, 6vw, 80px) clamp(60px, 8vw, 100px)', borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))' }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '24px' }}>How We Work</div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(40px, 7vw, 88px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--silver, #D0D8E0)', marginBottom: '28px', maxWidth: '900px' }}>
            How We Build Your{' '}
            <span style={{ background: 'linear-gradient(135deg, var(--navy, #1E3D8F), var(--chrome, #A8B8C8))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Digital Foundation</span>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(16px, 2vw, 20px)', lineHeight: 1.7, color: 'var(--dim, rgba(255,255,255,0.5))', maxWidth: '600px', marginBottom: '48px' }}>
            $0 down. We build your site first, you see it live, and you only start paying when you say yes. Most clients are live within 72 hours of first contact.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/#contact" style={{ fontFamily: "'Space Mono', monospace", fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--bg, #141414)', background: 'var(--chrome, #A8B8C8)', padding: '14px 32px', textDecoration: 'none', fontWeight: 700, display: 'inline-block' }}>See Your Free Mockup →</Link>
            <Link href="/pricing" style={{ fontFamily: "'Space Mono', monospace", fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', padding: '14px 32px', textDecoration: 'none', fontWeight: 700, display: 'inline-block', border: '1px solid var(--border, rgba(255,255,255,0.08))' }}>View Pricing</Link>
          </div>
        </section>

        <section style={{ background: 'rgba(30,61,143,0.06)', borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px clamp(20px, 6vw, 80px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            {[{ value: '$0', label: 'Down to get started' }, { value: '72 hrs', label: 'From call to live site' }, { value: '14 days', label: 'Risk-free preview' }, { value: '0', label: 'Surprise fees, ever' }].map((stat) => (
              <div key={stat.label} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, background: 'linear-gradient(135deg, var(--navy, #1E3D8F), var(--chrome, #A8B8C8))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--dim, rgba(255,255,255,0.5))' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(60px, 10vw, 120px) clamp(20px, 6vw, 80px)' }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '16px' }}>The Pipeline</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(30px, 5vw, 56px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--silver, #D0D8E0)', marginBottom: '72px', maxWidth: '700px' }}>Prospect to Paying Client — In 72 Hours</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {steps.map((step) => (
              <div key={step.number} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', background: 'var(--bg2, rgba(255,255,255,0.03))', border: '1px solid var(--border, rgba(255,255,255,0.08))', borderRadius: '2px', overflow: 'hidden', transition: 'border-color 0.3s ease' }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--navy, #1E3D8F)'; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border, rgba(255,255,255,0.08))'; }}>
                <div style={{ background: 'rgba(30,61,143,0.06)', borderRight: '1px solid var(--border, rgba(255,255,255,0.08))', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 16px' }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '48px', fontWeight: 800, background: 'linear-gradient(135deg, var(--navy, #1E3D8F), var(--chrome, #A8B8C8))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1 }}>{step.number}</div>
                </div>
                <div style={{ padding: 'clamp(24px, 4vw, 40px)' }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '12px', padding: '4px 10px', border: '1px solid var(--border, rgba(255,255,255,0.08))', display: 'inline-block', borderRadius: '2px' }}>{step.duration}</div>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 700, color: 'var(--silver, #D0D8E0)', marginBottom: '14px', lineHeight: 1.3 }}>{step.title}</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', lineHeight: 1.7, color: 'var(--dim, rgba(255,255,255,0.5))', marginBottom: '12px', maxWidth: '680px' }}>{step.description}</p>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '12px', lineHeight: 1.6, color: 'var(--navy, #1E3D8F)' }}>→ {step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ borderTop: '1px solid var(--border, rgba(255,255,255,0.08))', padding: 'clamp(60px, 10vw, 120px) clamp(20px, 6vw, 80px)' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '16px' }}>FAQ</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.02em', color: 'var(--silver, #D0D8E0)', marginBottom: '56px', maxWidth: '600px' }}>Questions We Hear Every Time</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2px', maxWidth: '1200px' }}>
              {faqs.map((faq, i) => (
                <div key={i} style={{ background: 'var(--bg2, rgba(255,255,255,0.03))', border: '1px solid var(--border, rgba(255,255,255,0.08))', padding: 'clamp(24px, 3vw, 36px)', borderRadius: '2px', transition: 'border-color 0.2s' }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--navy, #1E3D8F)'; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border, rgba(255,255,255,0.08))'; }}>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '17px', fontWeight: 700, color: 'var(--silver, #D0D8E0)', marginBottom: '12px', lineHeight: 1.4 }}>{faq.q}</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', lineHeight: 1.7, color: 'var(--dim, rgba(255,255,255,0.5))', margin: 0 }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ borderTop: '1px solid var(--border, rgba(255,255,255,0.08))', padding: 'clamp(60px, 10vw, 120px) clamp(20px, 6vw, 80px)', background: 'rgba(30,61,143,0.04)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '20px' }}>Ready to Start</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--silver, #D0D8E0)', marginBottom: '24px' }}>See What Your Site Could Look Like — Free</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(15px, 2vw, 18px)', lineHeight: 1.7, color: 'var(--dim, rgba(255,255,255,0.5))', marginBottom: '40px', maxWidth: '520px', margin: '0 auto 40px' }}>Tell us about your business. We'll build your mockup in 48 hours and show you exactly what your digital foundation looks like — before you pay anything.</p>
            <Link href="/#contact" style={{ fontFamily: "'Space Mono', monospace", fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--bg, #141414)', background: 'var(--chrome, #A8B8C8)', padding: '16px 40px', textDecoration: 'none', fontWeight: 700, display: 'inline-block' }}>Get My Free Mockup →</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
