import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Startup Complete — Done-For-You Business Launch in 48 Hours',
  description: "Caliber Web Studio's premium done-for-you package. LLC guidance, website, AI chatbot, brand kit, Google profile, and more — fully operational in 48 hours. Starting at $5,000.",
  alternates: {
    canonical: 'https://caliberwebstudio.com/startup-complete'
  },
  openGraph: {
    title: 'Startup Complete | Caliber Web Studio',
    description: "We'll turn your idea into a running business in 48 hours. Everything you need — built, deployed, and ready to take customers.",
    url: 'https://caliberwebstudio.com/startup-complete',
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://caliberwebstudio.com/startup-complete#service',
  name: 'Startup Complete',
  alternateName: 'Done-For-You Business Launch Package',
  description: 'A premium done-for-you service that transforms your business idea into a fully operational company in 48 hours. Includes LLC formation guidance, EIN registration, professional domain and business email, full Next.js website (5–7 pages), AI chatbot, Google Business Profile, social media accounts, brand kit, 30 days of scheduled content, email/SMS automation, pitch deck, and one-pager.',
  provider: {
    '@id': 'https://caliberwebstudio.com/#organization'
  },
  url: 'https://caliberwebstudio.com/startup-complete',
  offers: {
    '@type': 'Offer',
    name: 'Startup Complete Package',
    price: '5000',
    priceCurrency: 'USD',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: '5000',
      priceCurrency: 'USD',
      description: 'One flat fee, no surprises. Starting price.'
    },
    availability: 'https://schema.org/InStock',
    url: 'https://caliberwebstudio.com/startup-complete',
  },
  serviceType: 'Business Launch',
  areaServed: {
    '@type': 'Country',
    name: 'United States'
  },
};

const checklistItems = [
  { label: 'LLC formation guidance', detail: 'We walk you through the exact steps to legally form your business.' },
  { label: 'EIN registration', detail: 'Your federal Employer Identification Number, handled.' },
  { label: 'Professional domain + business email', detail: 'A domain that means business and an email that earns trust.' },
  { label: 'Full website (5–7 pages, Next.js)', detail: 'Production-grade, blazing-fast — the same stack used by Netflix and TikTok.' },
  { label: 'AI chatbot installed and configured', detail: 'Engages visitors 24/7, qualifies leads, and never misses a message.' },
  { label: 'Google Business Profile setup', detail: 'So customers can find you instantly in Maps and Search.' },
  { label: 'Social media accounts created', detail: 'Profiles built, branded, and ready for your first post.' },
  { label: 'Brand kit (logo concept, colors, fonts)', detail: 'A cohesive visual identity that looks like you mean it.' },
  { label: '30 days of content scheduled', detail: 'A full month of posts lined up so you launch with momentum.' },
  { label: 'Email/SMS automation installed', detail: 'Follow-ups and nurture sequences that run on autopilot.' },
  { label: 'Pitch deck + one-pager', detail: 'Professional assets ready for investors, partners, or clients.' },
];

export default function StartupCompletePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Nav />
      <main style={{ paddingTop: '72px', background: 'var(--bg)', minHeight: '100vh' }}>
        <section style={{ padding: 'clamp(80px, 12vw, 140px) clamp(20px, 6vw, 80px) clamp(60px, 8vw, 100px)', maxWidth: '1100px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <p className="sec-label fu" style={{ justifyContent: 'center', marginBottom: '28px' }}>Done-For-You Launch Package</p>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', lineHeight: 1.1, letterSpacing: '-0.02em', background: 'linear-gradient(135deg, var(--chrome), var(--white), var(--chrome))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '28px' }}>
            We&apos;ll Turn Your Idea Into a<br />Running Business in 48 Hours
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'var(--dim)', maxWidth: '640px', margin: '0 auto 44px', lineHeight: 1.7 }}>
            Everything you need to launch — built, deployed, and ready to take customers.
          </p>
          <div className="fu" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-chrome">Book Your Launch Call</Link>
            <a href="#whats-included" className="btn-line">See What&apos;s Included</a>
          </div>
          <div aria-hidden="true" style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', background: 'radial-gradient(ellipse, rgba(30,61,143,0.18) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
        </section>

        <section id="whats-included" style={{ padding: 'clamp(60px, 8vw, 100px) clamp(20px, 6vw, 80px)', maxWidth: '1100px', margin: '0 auto' }}>
          <p className="sec-label fu">What&apos;s Included</p>
          <h2 className="fu" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: 'var(--white)', marginBottom: '16px', letterSpacing: '-0.02em' }}>
            Everything to Go from Zero to Open
          </h2>
          <p className="fu" style={{ color: 'var(--dim)', fontSize: '1rem', marginBottom: '56px', maxWidth: '520px' }}>
            Every deliverable is built by our team. You show up to the call with an idea. We hand you a business.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {checklistItems.map((item, i) => (
              <div key={i} className="fu svc-card" style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '2px', padding: '28px 28px 28px 24px', display: 'flex', gap: '16px', alignItems: 'flex-start', position: 'relative', overflow: 'hidden', transition: 'border-color 0.2s, transform 0.2s' }}>
                <div className="accent-line" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />
                <div style={{ flexShrink: 0, width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(30,61,143,0.2)', border: '1px solid rgba(30,61,143,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7L5.5 10L11.5 4" stroke="var(--navy)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: 'var(--silver)', marginBottom: '6px' }}>{item.label}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'var(--dim)', lineHeight: 1.6 }}>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(20px, 6vw, 80px)', maxWidth: '1100px', margin: '0 auto' }}>
          <div className="fu" style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderLeft: '3px solid var(--navy)', padding: 'clamp(40px, 6vw, 64px) clamp(28px, 5vw, 56px)', borderRadius: '2px', maxWidth: '760px' }}>
            <p className="sec-label" style={{ marginBottom: '24px' }}>Who It&apos;s For</p>
            <blockquote style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 'clamp(1.4rem, 3.5vw, 2.25rem)', color: 'var(--white)', lineHeight: 1.3, letterSpacing: '-0.01em', fontStyle: 'normal', margin: 0 }}>
              &ldquo;You have the idea. You have the drive. You just need someone to build the machine.&rdquo;
            </blockquote>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', color: 'var(--dim)', marginTop: '24px', lineHeight: 1.7 }}>
              Startup Complete is for founders, side-hustlers, and first-time business owners who are ready to move fast. No hand-holding required — we do the heavy lifting so you can focus on your customers from day one.
            </p>
          </div>
        </section>

        <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(20px, 6vw, 80px)', maxWidth: '1100px', margin: '0 auto' }}>
          <div className="fu" style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', textAlign: 'center', gap: '32px', padding: 'clamp(48px, 7vw, 80px) clamp(28px, 5vw, 60px)', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '2px', position: 'relative', overflow: 'hidden' }}>
            <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 100%, rgba(30,61,143,0.12) 0%, transparent 60%)', pointerEvents: 'none' }} />
            <p className="sec-label" style={{ justifyContent: 'center' }}>Investment</p>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(3rem, 8vw, 5.5rem)', lineHeight: 1, background: 'linear-gradient(135deg, var(--chrome), var(--white))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '-0.03em' }}>$5,000</div>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--dim)', marginTop: '12px' }}>Starting price — one flat fee, no surprises</p>
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem', color: 'var(--dim)', maxWidth: '480px', lineHeight: 1.7, position: 'relative', zIndex: 1 }}>
              Every deliverable listed above, delivered within 48 hours of your launch call. No hidden fees, no hourly billing, no scope creep.
            </p>
            <Link href="/contact" className="btn-chrome" style={{ position: 'relative', zIndex: 1, fontSize: '12px', letterSpacing: '0.14em' }}>Book Your Launch Call</Link>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(168,184,200,0.3)', position: 'relative', zIndex: 1 }}>Limited spots available each month</p>
          </div>
        </section>

        <section style={{ padding: 'clamp(48px, 6vw, 80px) clamp(20px, 6vw, 80px)', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
          <p className="fu" style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--dim)', marginBottom: '16px' }}>Ready to launch?</p>
          <h2 className="fu" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', color: 'var(--white)', marginBottom: '28px', letterSpacing: '-0.02em' }}>Your business is 48 hours away.</h2>
          <Link href="/contact" className="btn-chrome fu">Book Your Launch Call</Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
