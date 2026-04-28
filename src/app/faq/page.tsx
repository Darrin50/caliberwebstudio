import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FAQAccordion from './FAQAccordion';

export const metadata: Metadata = {
  title: 'FAQ — Frequently Asked Questions',
  description: 'Answers to the most common questions about Caliber Web Studio — timelines, ownership, pricing, AEO, AI chatbots, and more.',
  alternates: {
    canonical: 'https://www.caliberwebstudio.com/faq'
  },
  openGraph: {
    title: 'FAQ | Caliber Web Studio',
    description: 'Straight answers on timelines, ownership, pricing, AEO, and more.',
    url: 'https://www.caliberwebstudio.com/faq',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long does it take to build my website?',
      acceptedAnswer: { '@type': 'Answer', text: 'Most sites are live in 7–14 days. Our Startup Complete package can have you fully operational in 48 hours.' },
    },
    {
      '@type': 'Question',
      name: 'Do I own my website?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. 100%. We build it, you own it. The code, the domain, everything.' },
    },
    {
      '@type': 'Question',
      name: 'What makes Caliber different from other web agencies?',
      acceptedAnswer: { '@type': 'Answer', text: 'We build in Next.js — the same technology used by companies like Netflix and TikTok. You get a production-grade website, not a WordPress template. And we embed AI systems directly into the build so your site works for you 24/7.' },
    },
    {
      '@type': 'Question',
      name: 'Do you work with businesses outside Detroit?',
      acceptedAnswer: { '@type': 'Answer', text: "Yes. We're Detroit-based but work with businesses everywhere. We specialize in helping Detroit businesses first, but our systems work anywhere." },
    },
    {
      '@type': 'Question',
      name: "What's included in the monthly plans?",
      acceptedAnswer: { '@type': 'Answer', text: 'Hosting, maintenance, security updates, performance monitoring, and ongoing SEO updates. Your site never goes stale.' },
    },
    {
      '@type': 'Question',
      name: 'Can I add a chatbot to my existing website?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes — our AI chatbot can be installed on any website, not just ones we built. Contact us for a custom quote.' },
    },
    {
      '@type': 'Question',
      name: 'What is AEO and why does it matter?',
      acceptedAnswer: { '@type': 'Answer', text: "AEO (Answer Engine Optimization) means optimizing your site so AI tools like ChatGPT and Google's AI Overview recommend your business. It's the future of search, and we build it into every site we deliver." },
    },
    {
      '@type': 'Question',
      name: 'How does pricing work?',
      acceptedAnswer: { '@type': 'Answer', text: "We offer fixed-scope packages so you always know what you're paying. No hourly billing, no surprise invoices. See our pricing page for full details." },
    },
  ],
};

export default function FAQPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Nav />
      <main style={{ paddingTop: '72px', background: 'var(--bg)', minHeight: '100vh' }}>
        <section style={{ padding: 'clamp(80px, 12vw, 130px) clamp(20px, 6vw, 80px) clamp(48px, 6vw, 80px)', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <p className="sec-label fu" style={{ justifyContent: 'center', marginBottom: '24px' }}>FAQ</p>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1, letterSpacing: '-0.02em', background: 'linear-gradient(135deg, var(--chrome), var(--white), var(--chrome))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '20px' }}>
            Frequently Asked Questions
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)', color: 'var(--dim)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
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
