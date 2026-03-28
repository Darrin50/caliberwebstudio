import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FAQAccordion from './FAQAccordion';

export const metadata: Metadata = {
  title: 'FAQ — Frequently Asked Questions',
  description:
    'Answers to the most common questions about Caliber Web Studio — timelines, ownership, pricing, AEO, AI chatbots, and more.',
  alternates: { canonical: 'https://caliberwebstudio.com/faq' },
  openGraph: {
    title: 'FAQ | Caliber Web Studio',
    description: 'Straight answers on timelines, ownership, pricing, AEO, and more.',
    url: 'https://caliberwebstudio.com/faq',
  },
};

export default function FAQPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: '72px', background: 'var(--bg)', minHeight: '100vh' }}>

        <section style={{ padding: 'clamp(80px, 12vw, 130px) clamp(20px, 6vw, 80px) clamp(48px, 6vw, 80px)', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <p className="sec-label fu" style={{ justifyContent: 'center', marginBottom: '24px' }}>FAQ</p>
          <h1 className="fu" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1, letterSpacing: '-0.02em', background: 'linear-gradient(135deg, var(--chrome), var(--white), var(--chrome))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '20px' }}>
            Frequently Asked Questions
          </h1>
          <p className="fu" style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)', color: 'var(--dim)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
            Straight answers to the questions we hear most. If yours isn&apos;t here,{' '}
            <a href="/contact" style={{ color: 'var(--chrome)', textDecoration: 'none', borderBottom: '1px solid rgba(168,184,200,0.3)' }}>reach out</a>.
          </p>
        </section>

        <section style={{ padding: '0 clamp(20px, 6vw, 80px) clamp(80px, 10vw, 120px)', maxWidth: '800px', margin: '0 auto' }}>
          <FAQAccordion />
        </section>

        <section style={{ padding: 'clamp(48px, 6vw, 80px) clamp(20px, 6vw, 80px)', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
          <p className="fu" style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--dim)', marginBottom: '16px' }}>Still have questions?</p>
          <h2 className="fu" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(1.4rem, 3vw, 2.25rem)', color: 'var(--white)', marginBottom: '24px', letterSpacing: '-0.02em' }}>Let&apos;s talk it through.</h2>
          <p className="fu" style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem', color: 'var(--dim)', marginBottom: '32px', maxWidth: '420px', margin: '0 auto 32px', lineHeight: 1.7 }}>
            We&apos;re real people. Book a quick call and we&apos;ll answer everything — no sales pressure.
          </p>
          <a href="/contact" className="btn-chrome fu">Start a Conversation</a>
        </section>

      </main>
      <Footer />
    </>
  );
}
