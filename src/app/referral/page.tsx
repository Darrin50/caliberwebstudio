import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { ScrollReveal, ScrollRevealGroup } from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: { absolute: 'Refer a Client | Caliber Web Studio — Earn $200 Per Referral' },
  description: 'Know a local business that needs a better website? Send them to Caliber Web Studio and earn $200 for every client that signs up. Simple, fast, and no limits.',
  alternates: { canonical: 'https://www.caliberwebstudio.com/referral' },
  openGraph: {
    title: 'Refer a Client & Earn $200 | Caliber Web Studio',
    description: 'Send a local business our way. They get a free mockup and a better web presence. You get $200 when they sign up. No limits.',
    url: 'https://www.caliberwebstudio.com/referral',
    type: 'website',
  },
};

const partners = [
  { role: 'Accountants & Bookkeepers', icon: '📊', desc: 'Your clients trust your advice on everything financial. A website that generates leads directly improves their bottom line — and yours.' },
  { role: 'Business Coaches & Consultants', icon: '🎯', desc: 'You help clients grow their businesses. We build the digital infrastructure that makes that growth visible and sustainable.' },
  { role: 'Commercial Realtors', icon: '🏢', desc: 'Businesses moving into new spaces often need a new or updated web presence. Make the introduction — we take it from there.' },
  { role: 'Insurance Agents', icon: '🛡️', desc: 'Your clients are small business owners. A professional website makes them look more credible — which matters when they\'re filing claims or renewing policies.' },
  { role: 'Attorneys & Notaries', icon: '⚖️', desc: 'You help clients set up LLCs, file trademarks, and navigate business law. We complete the picture by getting them online.' },
  { role: 'Marketing Professionals', icon: '📣', desc: 'Running ads for clients with no landing page or a weak website? Send them our way first. Better foundation, better results for your campaigns.' },
];

const steps = [
  { number: '01', title: 'Tell Us About Your Referral', desc: 'Fill out the short form below with the business owner\'s name, contact info, and a quick note about their situation. That\'s it from you.' },
  { number: '02', title: 'We Reach Out Within 24 Hours', desc: 'We contact them, introduce ourselves, and offer a free mockup — no pressure, no commitment required on their end.' },
  { number: '03', title: 'They Sign Up', desc: 'If they start a monthly plan or purchase Startup Complete, we mark the referral complete.' },
  { number: '04', title: 'You Get $200', desc: 'We send your payout via Venmo, Zelle, or check within 7 days of their first payment. No minimum. No maximum. Unlimited referrals.' },
];

const faq = [
  { q: 'Is there a limit to how many people I can refer?', a: 'No limit. Refer 10 clients and earn $2,000. Refer 50 and earn $10,000. Every qualifying referral pays out.' },
  { q: 'When does the $200 payout happen?', a: 'Within 7 days of your referral\'s first successful payment. We track referrals by name and contact info — no codes needed.' },
  { q: 'Do I need a formal partnership agreement?', a: 'No. Just fill out the referral form with contact info and let us know who you\'re sending. The relationship is simple and informal.' },
  { q: 'What if my referral already contacted Caliber on their own?', a: 'If they contacted us before your submission, the referral won\'t qualify. First touch determines attribution. When in doubt, submit first.' },
  { q: 'What types of businesses qualify?', a: 'Any local business that signs up for a monthly plan ($197+/mo) or purchases Startup Complete ($5,000+). No minimum plan required.' },
];

export default function ReferralPage() {
  return (
    <>
      <Nav />
      <main style={{ background: 'var(--bg)', color: 'var(--silver)', minHeight: '100vh' }}>

        {/* Hero */}
        <section style={{ padding: 'clamp(140px,16vw,180px) clamp(20px,6vw,80px) clamp(80px,10vw,120px)', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(30,61,143,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <ScrollReveal>
            <p className="sec-label fu" style={{ justifyContent: 'center' }}>Partner Program</p>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h1 className="fu" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(44px,7vw,80px)', lineHeight: 1.0, letterSpacing: '-0.03em', color: '#fff', margin: '20px 0 24px' }}>
              Refer a Business.<br />
              <span style={{ background: 'linear-gradient(135deg, #1E3D8F, #0891b2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Earn $200.</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={140}>
            <p className="fu" style={{ fontSize: 'clamp(17px,2vw,20px)', color: 'var(--chrome)', maxWidth: '540px', margin: '0 auto 40px', lineHeight: 1.7 }}>
              Know a local business that needs a better website? Send them our way. They get a free mockup and a professional web presence. You get $200 every time one signs up. No limits, no contracts.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <Link href="#refer-form" className="btn-chrome fu" style={{ textDecoration: 'none' }}>Submit a Referral</Link>
          </ScrollReveal>
        </section>

        {/* Who should partner */}
        <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,80px)', borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <ScrollReveal>
              <p className="sec-label">Who This Is For</p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4vw,52px)', color: '#fff', marginBottom: 'clamp(40px,5vw,60px)', letterSpacing: '-0.025em' }}>
                Great Partners Work<br />With Small Businesses
              </h2>
            </ScrollReveal>
            <ScrollRevealGroup className="partners-grid" stagger={70}>
              {partners.map(p => (
                <div key={p.role} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '16px', padding: 'clamp(24px,3vw,36px)' }}>
                  <div style={{ fontSize: '28px', marginBottom: '14px' }}>{p.icon}</div>
                  <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '17px', color: '#fff', marginBottom: '10px', letterSpacing: '-0.01em' }}>{p.role}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--chrome)', lineHeight: 1.7, margin: 0 }}>{p.desc}</p>
                </div>
              ))}
            </ScrollRevealGroup>
          </div>
        </section>

        {/* How it works */}
        <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,80px)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ScrollReveal>
              <p className="sec-label">How It Works</p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4vw,48px)', color: '#fff', marginBottom: 'clamp(40px,5vw,60px)', letterSpacing: '-0.025em' }}>
                Four Steps. That&apos;s It.
              </h2>
            </ScrollReveal>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(36px,5vw,52px)' }}>
              {steps.map((step, i) => (
                <ScrollReveal key={step.number} delay={i * 70}>
                  <div style={{ display: 'grid', gridTemplateColumns: '72px 1fr', gap: '28px', alignItems: 'start' }}>
                    <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(32px,4vw,48px)', color: '#1E3D8F', lineHeight: 1, opacity: 0.7 }}>{step.number}</div>
                    <div>
                      <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(18px,2.2vw,24px)', color: '#fff', marginBottom: '10px', letterSpacing: '-0.015em' }}>{step.title}</h3>
                      <p style={{ fontSize: '15px', color: 'var(--chrome)', lineHeight: 1.75, margin: 0 }}>{step.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Referral form */}
        <section id="refer-form" style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,80px)', borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            <ScrollReveal>
              <p className="sec-label">Submit a Referral</p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4vw,48px)', color: '#fff', marginBottom: '12px', letterSpacing: '-0.025em' }}>
                Send Us Your Referral
              </h2>
              <p style={{ fontSize: '16px', color: 'var(--chrome)', marginBottom: 'clamp(32px,4vw,48px)', lineHeight: 1.7 }}>
                Fill this out and we&apos;ll reach out to your referral within 24 hours. You&apos;ll receive a confirmation email once submitted.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={140}>
              <form
                action="https://formspree.io/f/darrin@caliberwebstudio.com"
                method="POST"
                style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
              >
                <div>
                  <label style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--dim)', display: 'block', marginBottom: '8px' }}>Your Name</label>
                  <input name="referrer_name" required placeholder="Your full name" style={{ width: '100%', padding: '13px 16px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--silver)', fontFamily: 'Inter, sans-serif', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--dim)', display: 'block', marginBottom: '8px' }}>Your Email (for payout)</label>
                  <input name="referrer_email" type="email" required placeholder="your@email.com" style={{ width: '100%', padding: '13px 16px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--silver)', fontFamily: 'Inter, sans-serif', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
                  <label style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--dim)', display: 'block', marginBottom: '8px' }}>Business Owner&apos;s Name</label>
                  <input name="referral_name" required placeholder="Their name" style={{ width: '100%', padding: '13px 16px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--silver)', fontFamily: 'Inter, sans-serif', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--dim)', display: 'block', marginBottom: '8px' }}>Business Owner&apos;s Phone or Email</label>
                  <input name="referral_contact" required placeholder="Their phone number or email" style={{ width: '100%', padding: '13px 16px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--silver)', fontFamily: 'Inter, sans-serif', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--dim)', display: 'block', marginBottom: '8px' }}>Their Business Type (optional)</label>
                  <input name="referral_industry" placeholder="e.g. barbershop, restaurant, plumber…" style={{ width: '100%', padding: '13px 16px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--silver)', fontFamily: 'Inter, sans-serif', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--dim)', display: 'block', marginBottom: '8px' }}>Anything We Should Know?</label>
                  <textarea name="notes" rows={3} placeholder="Context about their situation — current website, pain points, urgency, etc." style={{ width: '100%', padding: '13px 16px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--silver)', fontFamily: 'Inter, sans-serif', fontSize: '15px', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
                </div>
                <button type="submit" className="btn-chrome" style={{ border: 'none', cursor: 'pointer', textAlign: 'center', fontFamily: 'inherit' }}>
                  Submit Referral →
                </button>
              </form>
            </ScrollReveal>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,80px)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ScrollReveal>
              <p className="sec-label">FAQ</p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4vw,48px)', color: '#fff', marginBottom: 'clamp(36px,5vw,52px)', letterSpacing: '-0.025em' }}>Common Questions</h2>
            </ScrollReveal>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
              {faq.map((f, i) => (
                <ScrollReveal key={i} delay={i * 55}>
                  <div style={{ background: 'var(--bg)', padding: 'clamp(22px,3vw,36px) clamp(24px,4vw,40px)' }}>
                    <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(15px,1.8vw,19px)', color: '#fff', marginBottom: '10px', letterSpacing: '-0.01em' }}>{f.q}</h3>
                    <p style={{ fontSize: '15px', color: 'var(--chrome)', lineHeight: 1.75, margin: 0 }}>{f.a}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: 'clamp(100px,12vw,160px) clamp(20px,6vw,80px)', textAlign: 'center' }}>
          <ScrollReveal>
            <p className="sec-label" style={{ justifyContent: 'center' }}>Know Someone?</p>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(32px,5vw,60px)', color: '#fff', marginBottom: '20px', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
              Every Referral Pays $200.<br />No Limit. No Expiry.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={140}>
            <p style={{ color: 'var(--chrome)', fontSize: 'clamp(16px,1.8vw,19px)', maxWidth: '460px', margin: '0 auto 44px', lineHeight: 1.7 }}>
              Questions about the program? Reach out directly — we keep this simple on purpose.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="#refer-form" className="btn-chrome" style={{ textDecoration: 'none' }}>Submit a Referral</Link>
              <Link href="/contact" className="btn-line" style={{ textDecoration: 'none' }}>Ask a Question</Link>
            </div>
          </ScrollReveal>
        </section>

      </main>
      <Footer />
      <style>{`
        .partners-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        @media (max-width: 900px) { .partners-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .partners-grid { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
}
