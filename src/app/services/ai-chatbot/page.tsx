import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: { absolute: 'AI Chatbot for Small Business | Caliber Web Studio | Detroit, MI' },
  description: 'Add an AI chatbot to your website that answers questions, books appointments, and captures leads 24/7. Built and trained on your business — from Caliber Web Studio.',
  alternates: { canonical: 'https://caliberwebstudio.com/services/ai-chatbot' },
  openGraph: {
    title: 'AI Chatbot for Small Business | Caliber Web Studio',
    description: 'An AI employee that never sleeps. Answers FAQs, captures leads, and books appointments — 24/7/365.',
    url: 'https://caliberwebstudio.com/services/ai-chatbot',
    type: 'website',
  },
};

const features = [
  {
    icon: '💬',
    title: 'Answers FAQs Instantly',
    desc: 'Pricing, hours, location, services — your chatbot knows it all and responds in under 2 seconds.',
  },
  {
    icon: '📋',
    title: 'Captures Leads 24/7',
    desc: 'Collects name, phone, and email from every visitor — then sends them straight to you.',
  },
  {
    icon: '📅',
    title: 'Books Appointments',
    desc: 'Connects directly to your calendar so customers can book without ever picking up the phone.',
  },
  {
    icon: '🎯',
    title: 'Qualifies Every Lead',
    desc: 'Asks the right questions upfront so you only spend time on customers who are ready to buy.',
  },
  {
    icon: '🗣️',
    title: 'Sounds Like a Human',
    desc: "Natural, conversational responses. Your customers won't know it's AI — and that's the point.",
  },
  {
    icon: '🕐',
    title: 'Always On, Never Out Sick',
    desc: "Midnight on a Sunday? Covered. Your chatbot doesn't take holidays, lunch breaks, or PTO.",
  },
];

const steps = [
  {
    num: '01',
    title: 'We Train It on Your Business',
    desc: 'Services, pricing, FAQs, policies, hours, location — everything a customer might ask gets loaded in.',
  },
  {
    num: '02',
    title: 'We Embed It on Your Site',
    desc: 'A clean, branded chat widget appears on your website. No friction for your visitors.',
  },
  {
    num: '03',
    title: 'You Get Notified Instantly',
    desc: 'Every conversation is logged. Hot leads trigger an immediate notification straight to your phone.',
  },
  {
    num: '04',
    title: 'It Gets Smarter Over Time',
    desc: "We review real conversations and improve responses monthly. The longer it runs, the better it gets.",
  },
];

const stats = [
  { value: '3×', label: 'More leads captured after hours vs. no chatbot' },
  { value: '67%', label: 'Of consumers prefer chatbots for quick answers' },
  { value: '<2s', label: 'Average response time — faster than any human' },
];

export default function AIChatbotPage() {
  return (
    <>
      <Nav />
      <main style={{ background: 'var(--bg, #141414)', color: 'var(--silver, #D0D8E0)', minHeight: '100vh' }}>

        {/* Hero */}
        <section style={{ padding: 'clamp(100px,14vw,160px) clamp(20px,6vw,80px) clamp(60px,8vw,100px)', textAlign: 'center', borderBottom: '1px solid var(--border, rgba(168,184,200,0.12))', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(30,61,143,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '24px' }}>AI Chatbot Service</p>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(32px,5.5vw,68px)', lineHeight: 1.05, color: '#fff', marginBottom: '24px', maxWidth: '900px', margin: '0 auto 24px' }}>
              An AI Employee That<br />
              <span style={{ background: 'linear-gradient(135deg, var(--chrome, #A8B8C8), #fff, var(--navy, #1E3D8F))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Never Sleeps</span>
              {' '}— Built Into Your Website
            </h1>
            <p style={{ fontSize: 'clamp(16px,2vw,20px)', color: 'var(--chrome, #A8B8C8)', maxWidth: '600px', margin: '0 auto 48px', lineHeight: 1.6 }}>
              Our AI chatbot answers customer questions, books appointments, qualifies leads, and captures contact info 24/7. It knows your business inside and out.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" style={{ display: 'inline-block', background: 'var(--navy, #1E3D8F)', color: '#fff', fontFamily: 'Space Mono, monospace', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', padding: '18px 40px', textDecoration: 'none', fontWeight: 700 }}>Get the Chatbot</Link>
              <Link href="/pricing" style={{ display: 'inline-block', border: '1px solid var(--border, rgba(168,184,200,0.2))', color: 'var(--chrome, #A8B8C8)', fontFamily: 'Space Mono, monospace', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', padding: '18px 40px', textDecoration: 'none' }}>See Pricing</Link>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section style={{ borderBottom: '1px solid var(--border, rgba(168,184,200,0.12))', background: 'rgba(30,61,143,0.06)' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1px', background: 'var(--border, rgba(168,184,200,0.12))' }}>
            {stats.map(stat => (
              <div key={stat.value} style={{ padding: 'clamp(32px,4vw,48px) clamp(24px,4vw,48px)', textAlign: 'center', background: 'var(--bg, #141414)' }}>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(40px,5vw,56px)', color: '#fff', lineHeight: 1, marginBottom: '12px' }}>{stat.value}</div>
                <div style={{ fontSize: '14px', color: 'var(--chrome, #A8B8C8)', lineHeight: 1.5 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* What It Does */}
        <section style={{ padding: 'clamp(60px,8vw,120px) clamp(20px,6vw,80px)', borderBottom: '1px solid var(--border, rgba(168,184,200,0.12))' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '16px' }}>Capabilities</p>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4vw,48px)', color: '#fff', marginBottom: '16px' }}>What It Does for Your Business</h2>
            <p style={{ fontSize: '16px', color: 'var(--chrome, #A8B8C8)', marginBottom: '56px', maxWidth: '520px' }}>One tool that handles the repetitive work so your team can focus on the work that actually needs a human.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {features.map(f => (
                <div key={f.title} style={{ padding: '32px', background: 'var(--bg2, #1a1a1a)', border: '1px solid var(--border, rgba(168,184,200,0.1))', borderRadius: '6px', transition: 'border-color 0.2s, transform 0.2s' }} onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(30,61,143,0.5)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; }} onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border, rgba(168,184,200,0.1))'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; }}>
                  <div style={{ fontSize: '28px', marginBottom: '16px', lineHeight: 1 }}>{f.icon}</div>
                  <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '18px', color: '#fff', marginBottom: '10px' }}>{f.title}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--chrome, #A8B8C8)', lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section style={{ padding: 'clamp(60px,8vw,120px) clamp(20px,6vw,80px)', borderBottom: '1px solid var(--border, rgba(168,184,200,0.12))' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '16px' }}>The Process</p>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4vw,48px)', color: '#fff', marginBottom: '56px' }}>How It Works</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border, rgba(168,184,200,0.12))' }}>
              {steps.map((step, i) => (
                <div key={step.num} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '32px', alignItems: 'start', padding: '36px 40px', background: 'var(--bg, #141414)' }}>
                  <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', fontWeight: 700, color: 'var(--navy, #1E3D8F)', letterSpacing: '2px', paddingTop: '4px', minWidth: '28px' }}>{step.num}</div>
                  <div>
                    <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(17px,2vw,22px)', color: '#fff', marginBottom: '8px' }}>{step.title}</h3>
                    <p style={{ fontSize: '15px', color: 'var(--chrome, #A8B8C8)', lineHeight: 1.6 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Demo CTA */}
        <section style={{ padding: 'clamp(60px,8vw,120px) clamp(20px,6vw,80px)', borderBottom: '1px solid var(--border, rgba(168,184,200,0.12))', background: 'rgba(30,61,143,0.05)' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'inline-block', background: 'rgba(30,61,143,0.2)', border: '1px solid rgba(30,61,143,0.4)', borderRadius: '4px', padding: '6px 16px', fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--navy, #1E3D8F)', marginBottom: '28px' }}>Live Demo</div>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4vw,48px)', color: '#fff', marginBottom: '20px', lineHeight: 1.1 }}>See It in Action — Right Now</h2>
            <p style={{ fontSize: 'clamp(15px,1.8vw,18px)', color: 'var(--chrome, #A8B8C8)', lineHeight: 1.6 }}>
              Try it right now — click the chat icon in the bottom right corner of this page. Ask it anything about Caliber Web Studio. That's exactly what your customers will experience.
            </p>
          </div>
        </section>

        {/* Pricing CTA */}
        <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,80px)', textAlign: 'center' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '24px' }}>Pricing</p>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4vw,48px)', color: '#fff', marginBottom: '20px', lineHeight: 1.1 }}>Ready to Install the AI Employee That Never Clocks Out?</h2>
            <p style={{ fontSize: 'clamp(15px,1.8vw,18px)', color: 'var(--chrome, #A8B8C8)', marginBottom: '48px', lineHeight: 1.6 }}>
              Included with <strong style={{ color: '#fff' }}>Growth</strong> and <strong style={{ color: '#fff' }}>Scale</strong> plans at no extra cost. Starter plan clients can add the AI chatbot for <strong style={{ color: '#fff' }}>$97/mo</strong>.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/pricing" style={{ display: 'inline-block', background: 'var(--navy, #1E3D8F)', color: '#fff', fontFamily: 'Space Mono, monospace', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', padding: '18px 40px', textDecoration: 'none', fontWeight: 700 }}>View Plans</Link>
              <Link href="/contact" style={{ display: 'inline-block', border: '1px solid var(--border, rgba(168,184,200,0.2))', color: 'var(--chrome, #A8B8C8)', fontFamily: 'Space Mono, monospace', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', padding: '18px 40px', textDecoration: 'none' }}>Get Started Free</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
