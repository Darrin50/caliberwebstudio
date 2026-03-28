'use client';

import { useState } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Link from 'next/link';

const faqs = [
  {
    question: 'How long does it take to build my website?',
    answer: 'Most sites are live in 7–14 days. Our Startup Complete package can have you fully operational in 48 hours.',
  },
  {
    question: 'Do I own my website?',
    answer: 'Yes. 100%. We build it, you own it. The code, the domain, everything.',
  },
  {
    question: 'What makes Caliber different from other web agencies?',
    answer: 'We build in Next.js — the same technology used by companies like Netflix and TikTok. You get a production-grade website, not a WordPress template. And we embed AI systems directly into the build so your site works for you 24/7.',
  },
  {
    question: 'Do you work with businesses outside Detroit?',
    answer: "Yes. We're Detroit-based but work with businesses everywhere. We specialize in helping Detroit businesses first, but our systems work anywhere.",
  },
  {
    question: "What's included in the monthly plans?",
    answer: 'Hosting, maintenance, security updates, performance monitoring, and ongoing SEO updates. Your site never goes stale.',
  },
  {
    question: 'Can I add a chatbot to my existing website?',
    answer: 'Yes — our AI chatbot can be installed on any website, not just ones we built. Contact us for a custom quote.',
  },
  {
    question: 'What is AEO and why does it matter?',
    answer: "AEO (Answer Engine Optimization) means optimizing your site so AI tools like ChatGPT and Google's AI Overview recommend your business. It's the future of search, and we build it into every site we deliver.",
  },
  {
    question: 'How does pricing work?',
    answer: "We offer fixed-scope packages so you always know what you're paying. No hourly billing, no surprise invoices. See our pricing page for full details.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

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
            <Link href="/contact" style={{ color: 'var(--chrome)', textDecoration: 'none', borderBottom: '1px solid rgba(168,184,200,0.3)' }}>reach out</Link>.
          </p>
        </section>

        <section style={{ padding: '0 clamp(20px, 6vw, 80px) clamp(80px, 10vw, 120px)', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {faqs.map((faq, i) => (
              <div key={i} className="fu" style={{ border: '1px solid var(--border)', borderRadius: '2px', overflow: 'hidden', background: 'var(--bg2)', transition: 'border-color 0.2s', borderColor: openIndex === i ? 'rgba(30,61,143,0.4)' : 'var(--border)' }}>
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={openIndex === i}
                  style={{ width: '100%', background: 'none', border: 'none', padding: '22px 24px', textAlign: 'left', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', color: openIndex === i ? 'var(--white)' : 'var(--silver)', fontSize: '1rem', fontWeight: 600, fontFamily: "'Inter', sans-serif", transition: 'color 0.2s' }}
                >
                  <span>{faq.question}</span>
                  <span style={{ flexShrink: 0, width: '22px', height: '22px', borderRadius: '50%', border: '1px solid rgba(168,184,200,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', lineHeight: 1, transition: 'transform 0.25s ease, border-color 0.2s', transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0deg)', color: openIndex === i ? 'var(--chrome)' : 'var(--dim)', borderColor: openIndex === i ? 'rgba(30,61,143,0.5)' : 'rgba(168,184,200,0.2)' }}>+</span>
                </button>
                <div style={{ maxHeight: openIndex === i ? '400px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
                  <div style={{ padding: '0 24px 22px', color: 'var(--dim)', lineHeight: 1.75, fontSize: '0.95rem', fontFamily: "'Inter', sans-serif", borderTop: '1px solid var(--border)', paddingTop: '18px' }}>
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ padding: 'clamp(48px, 6vw, 80px) clamp(20px, 6vw, 80px)', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
          <p className="fu" style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--dim)', marginBottom: '16px' }}>Still have questions?</p>
          <h2 className="fu" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(1.4rem, 3vw, 2.25rem)', color: 'var(--white)', marginBottom: '24px', letterSpacing: '-0.02em' }}>Let&apos;s talk it through.</h2>
          <p className="fu" style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem', color: 'var(--dim)', marginBottom: '32px', maxWidth: '420px', margin: '0 auto 32px', lineHeight: 1.7 }}>
            We&apos;re real people. Book a quick call and we&apos;ll answer everything — no sales pressure.
          </p>
          <Link href="/contact" className="btn-chrome fu">Start a Conversation</Link>
        </section>

      </main>
      <Footer />
    </>
  );
}
