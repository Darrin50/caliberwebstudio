import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: { absolute: 'Self-Serve Tools for Local Businesses | Caliber Web Studio' },
  description: 'Add powerful tools to your existing website starting at $29/mo. Live Google Review Widget, Quote Calculator, SMS Appointment Reminders, and AI Chatbot — no full plan required.',
  alternates: { canonical: 'https://www.caliberwebstudio.com/tools' },
  openGraph: {
    title: 'Self-Serve Tools for Local Businesses | Caliber Web Studio',
    description: 'Add powerful tools to any existing website. Google Review Widget at $29/mo, Quote Calculator at $29/mo, SMS Reminders at $49/mo, AI Chatbot at $49/mo.',
    url: 'https://www.caliberwebstudio.com/tools',
    type: 'website',
  },
};

const tools = [
  {
    id: 'review-widget',
    tag: 'All Industries',
    tagColor: '#16a34a',
    tagBg: 'rgba(22,163,74,0.08)',
    name: 'Live Google Review Widget',
    price: '$29',
    billing: '/mo',
    headline: 'Your best reviews. On every page. Automatically.',
    body: 'Pulls your live Google star rating and most recent reviews directly onto your website. Auto-refreshes. No manual copy-paste. No maintenance. Prospective customers see real social proof before they ever call.',
    industries: ['All service businesses'],
    why: 'Customers trust Google reviews more than any testimonial you write yourself. This widget puts your live rating front and center — and it updates without you touching a thing.',
    competitor: {
      label: 'What the big platforms charge',
      rows: [
        { name: 'Podium', price: '$399+/mo', note: 'Review widget buried in a massive platform you don\'t need' },
        { name: 'Birdeye', price: '$299+/mo', note: 'Enterprise reputation suite — overkill for most small businesses' },
        { name: 'NiceJob', price: '$75/mo', note: 'Closest to a standalone — CWS undercuts by $46/mo' },
      ],
    },
    cta: 'Add to My Site',
    right_for: 'Any business with Google reviews that wants to convert more site visitors into leads.',
  },
  {
    id: 'quote-calculator',
    tag: 'Home Services',
    tagColor: '#d97706',
    tagBg: 'rgba(217,119,6,0.08)',
    name: 'Embeddable Quote Calculator',
    price: '$29',
    billing: '/mo',
    headline: 'Give visitors a quote. Capture a lead.',
    body: 'A multi-step estimate calculator built into your website. Visitors answer a few questions about their job, get an instant ballpark estimate, and submit their contact info — giving you a warm lead who already knows your pricing range.',
    industries: ['Plumbers', 'HVAC', 'Roofers', 'Pool Service'],
    why: '90% of homeowners research pricing online before calling. A calculator converts that curiosity into a lead with their name and number — before they call your competitor.',
    competitor: {
      label: 'What the big platforms charge',
      rows: [
        { name: 'ServiceTitan', price: '$245–$500/tech + $5K–$15K setup', note: 'No standalone calculator — it\'s bundled into a full ops platform' },
        { name: 'Jobber', price: '$119+/mo', note: 'Estimate builder locked behind Essentials tier' },
        { name: 'Housecall Pro', price: '$59+/mo', note: 'Estimate builder deliberately removed from base plan to force upgrade' },
      ],
    },
    cta: 'Add to My Site',
    right_for: 'Plumbers, HVAC contractors, roofers, and pool companies whose customers always ask "how much does it cost?"',
  },
  {
    id: 'sms-reminders',
    tag: 'Appointment Businesses',
    tagColor: '#0891b2',
    tagBg: 'rgba(8,145,178,0.08)',
    name: 'SMS Reminder + Deposit Capture',
    price: '$49',
    billing: '/mo',
    headline: 'Stop no-shows. Collect deposits. Automatically.',
    body: 'Automated SMS reminders sent to customers before their appointment, with an optional deposit requirement at booking. One no-show at a med spa pays for 4 months of this tool. Built on Twilio + Stripe — the same infrastructure powering enterprise booking systems, at a price small businesses can actually afford.',
    industries: ['Med Spas', 'Salons', 'Dental Practices', 'Martial Arts Gyms', 'Pool Service'],
    why: 'No-show rates for appointment businesses run 20–40% without reminders. A $200 no-show at a med spa covers 4 months of this tool. Weave charges $249+/mo for the same core capability bundled with VoIP you don\'t need.',
    competitor: {
      label: 'What the big platforms charge',
      rows: [
        { name: 'Weave', price: '$249+/mo + $500–$750 setup', note: 'SMS reminders buried inside a VoIP phone system — 80% of features unused' },
        { name: 'Vagaro', price: '$20+/mo add-on (on top of $47+ base)', note: 'Not a standalone — requires the full Vagaro subscription' },
        { name: 'Mindbody', price: '$499/mo for the marketing tier with automation', note: 'You pay for enterprise features to get basic reminders' },
      ],
    },
    cta: 'Add to My Site',
    right_for: 'Any appointment-based business where a missed booking costs more than $49.',
  },
  {
    id: 'ai-chatbot',
    tag: 'All Industries',
    tagColor: '#7c3aed',
    tagBg: 'rgba(124,58,237,0.08)',
    name: 'AI Lead Capture Chatbot',
    price: '$49',
    billing: '/mo',
    headline: 'Your website answers questions and captures leads at 3 AM.',
    body: 'A custom-trained AI chatbot embedded on your existing site. It answers your most common customer questions, qualifies leads, and captures name, email, and phone — 24/7, without you lifting a finger. Trained specifically on your business, not a generic FAQ bot.',
    industries: ['All service businesses'],
    why: '3× more leads are captured after hours with a chatbot vs. no chatbot. 67% of consumers prefer chatbots for quick questions. The difference: this one is trained on your specific services, pricing, and location — not a generic bot that confuses customers.',
    competitor: {
      label: 'What the big platforms charge',
      rows: [
        { name: 'Tidio', price: '$29+/mo', note: 'Generic — you configure it yourself, with no business training included' },
        { name: 'Intercom', price: '$39+/mo', note: 'Built for SaaS companies, not service businesses' },
        { name: 'Drift', price: '$2,500+/mo', note: 'Enterprise-level — not for small businesses' },
      ],
    },
    cta: 'Add to My Site',
    right_for: 'Any business that gets repetitive questions via phone or email and wants to turn website visitors into leads 24/7.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do these tools work with my existing website?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Caliber Web Studio tools are designed to embed on any existing website — WordPress, Wix, Squarespace, or a custom-built site. You do not need to switch to a CWS-built site to use them.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much do Caliber Web Studio tools cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'CWS self-serve tools start at $29/mo: the Live Google Review Widget is $29/mo, the Embeddable Quote Calculator is $29/mo, SMS Appointment Reminder + Deposit Capture is $49/mo, and the AI Lead Capture Chatbot is $49/mo.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I bundle tools with a full managed plan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Tools can be added to any CWS managed plan (Starter $197/mo, Growth $397/mo, Domination $697/mo) or purchased as standalone tools for an existing website. Industry bundles are available at a discount — see the pricing page for details.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does setup take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Each tool is configured and embedded within 48 hours of signup. You provide access to your website and basic business info. Caliber handles installation, training (for the AI chatbot), and testing.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between the AI Chatbot tool and the AI Chatbot included in managed plans?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The $49/mo standalone AI Chatbot tool is designed for businesses that already have a website but want to add AI lead capture. The AI Chatbot included in managed plans (Starter, Growth, Domination) receives ongoing monthly improvements, deeper integration with the full CWS growth stack, and priority updates.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a contract for tools?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No contracts. Tools are month-to-month. Cancel anytime.',
      },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.caliberwebstudio.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.caliberwebstudio.com/tools' },
  ],
};

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Caliber Web Studio Self-Serve Tools',
  description: 'Monthly add-on tools for local business websites. Add to your existing site starting at $29/mo.',
  url: 'https://www.caliberwebstudio.com/tools',
  itemListElement: tools.map((tool, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Product',
      name: tool.name,
      description: tool.body,
      offers: {
        '@type': 'Offer',
        price: tool.price.replace('$', ''),
        priceCurrency: 'USD',
        priceSpecification: { '@type': 'UnitPriceSpecification', billingDuration: 'P1M' },
        seller: { '@type': 'Organization', name: 'Caliber Web Studio' },
      },
    },
  })),
};

export default function ToolsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <Nav />
      <main style={{ background: 'var(--bg, #0a0a0e)', minHeight: '100vh' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 clamp(20px,5vw,48px)' }}>

          {/* AI answer block — cited by AI engines */}
          <div style={{ paddingTop: 'clamp(120px,14vw,160px)', marginBottom: '0' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary, rgba(255,255,255,0.5))', lineHeight: 1.7, maxWidth: '700px', borderLeft: '2px solid rgba(255,255,255,0.1)', paddingLeft: '16px', marginBottom: '0' }}>
              Caliber Web Studio self-serve tools start at $29/mo and can be added to any existing website. Available tools: Live Google Review Widget ($29/mo), Embeddable Quote Calculator ($29/mo), SMS Appointment Reminder + Deposit Capture ($49/mo), and AI Lead Capture Chatbot ($49/mo). No contract. Setup in 48 hours.
            </p>
          </div>

          {/* Hero */}
          <div style={{ textAlign: 'center', marginBottom: 'clamp(56px,8vw,96px)', paddingTop: 'clamp(40px,6vw,64px)' }}>
            <ScrollReveal>
              <p className="sec-label fu" style={{ justifyContent: 'center' }}>
                Self-Serve Tools
              </p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h1 className="fu" style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(40px,7vw,76px)', fontWeight: 800, lineHeight: 1.05, color: 'var(--text-primary, #fff)', margin: '20px 0 24px', letterSpacing: '-0.03em' }}>
                Add a tool.<br />
                <span style={{ background: 'linear-gradient(135deg, #7c3aed, #0891b2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Not a commitment.</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={140}>
              <p className="fu" style={{ fontSize: 'clamp(17px,2vw,20px)', color: 'var(--text-secondary, rgba(255,255,255,0.65))', maxWidth: '560px', margin: '0 auto 36px', lineHeight: 1.7 }}>
                Not ready for a full managed plan? Start with one tool. Add it to your existing website. Pay monthly. Cancel anytime.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={180}>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <p className="fu" style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary, rgba(255,255,255,0.4))', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#34d399' }}>✓</span> Works on any website
                  <span style={{ opacity: 0.3 }}>·</span>
                  <span style={{ color: '#34d399' }}>✓</span> 48hr setup
                  <span style={{ opacity: 0.3 }}>·</span>
                  <span style={{ color: '#34d399' }}>✓</span> No contracts
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Tool cards */}
          {tools.map((tool, i) => (
            <ScrollReveal key={tool.id} delay={i * 60}>
              <div id={tool.id} style={{ marginBottom: 'clamp(32px,5vw,56px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', overflow: 'hidden' }}>

                {/* Tool header */}
                <div style={{ padding: 'clamp(28px,4vw,44px)', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.025)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '240px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
                        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: tool.tagColor, background: tool.tagBg, border: `1px solid ${tool.tagColor}40`, borderRadius: '100px', padding: '4px 12px', fontWeight: 700 }}>
                          {tool.tag}
                        </span>
                      </div>
                      <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(20px,3vw,30px)', color: 'var(--text-primary, #fff)', margin: '0 0 10px', letterSpacing: '-0.02em' }}>
                        {tool.name}
                      </h2>
                      <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 'clamp(14px,1.8vw,17px)', color: 'var(--chrome, rgba(255,255,255,0.65))', margin: '0 0 14px', fontStyle: 'italic' }}>
                        {tool.headline}
                      </p>
                      <p style={{ fontSize: 'clamp(14px,1.6vw,16px)', color: 'var(--chrome, rgba(255,255,255,0.6))', lineHeight: 1.75, maxWidth: '560px' }}>
                        {tool.body}
                      </p>
                    </div>

                    {/* Price + CTA */}
                    <div style={{ textAlign: 'center', padding: 'clamp(20px,3vw,28px)', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', minWidth: '180px' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', justifyContent: 'center', marginBottom: '4px' }}>
                        <span style={{ fontSize: 'clamp(2.2rem,4vw,2.8rem)', fontWeight: 800, color: 'var(--text-primary, #fff)', lineHeight: 1 }}>
                          {tool.price}
                        </span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary, rgba(255,255,255,0.45))', marginBottom: '6px', fontFamily: "'Space Mono', monospace" }}>
                          {tool.billing}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary, rgba(255,255,255,0.35))', marginBottom: '18px', fontFamily: "'Space Mono', monospace", letterSpacing: '0.05em' }}>
                        no contract · cancel anytime
                      </p>
                      <Link href="/contact" className="btn-chrome" style={{ textDecoration: 'none', display: 'block', fontSize: '0.78rem', padding: '11px 18px' }}>
                        {tool.cta}
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Why CWS wins + industries + competitor table */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '1px', background: 'rgba(255,255,255,0.05)' }}>

                  {/* Why section */}
                  <div style={{ padding: 'clamp(20px,3vw,32px)', background: 'var(--bg, #0a0a0e)' }}>
                    <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '10px', fontWeight: 700 }}>
                      Why This Exists
                    </p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--chrome, rgba(255,255,255,0.65))', lineHeight: 1.75 }}>
                      {tool.why}
                    </p>
                    <div style={{ marginTop: '16px' }}>
                      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '8px', fontWeight: 700 }}>
                        Right For You If
                      </p>
                      <p style={{ fontSize: '0.83rem', color: 'var(--silver, rgba(255,255,255,0.8))', lineHeight: 1.6, fontStyle: 'italic' }}>
                        {tool.right_for}
                      </p>
                    </div>
                    {tool.industries.length > 1 && (
                      <div style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {tool.industries.map((ind) => (
                          <span key={ind} style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px', padding: '4px 10px' }}>
                            {ind}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Competitor table */}
                  <div style={{ padding: 'clamp(20px,3vw,32px)', background: 'var(--bg, #0a0a0e)' }}>
                    <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '12px', fontWeight: 700 }}>
                      {tool.competitor.label}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                      {tool.competitor.rows.map((row) => (
                        <div key={row.name} style={{ padding: '12px 14px', background: 'var(--bg, #0a0a0e)', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '12px', alignItems: 'start' }}>
                          <div>
                            <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.83rem', color: 'var(--text-primary, #fff)', margin: '0 0 2px', whiteSpace: 'nowrap' }}>{row.name}</p>
                            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.72rem', color: '#f87171', margin: 0, whiteSpace: 'nowrap' }}>{row.price}</p>
                          </div>
                          <p style={{ fontSize: '0.78rem', color: 'var(--chrome, rgba(255,255,255,0.5))', lineHeight: 1.6, margin: 0 }}>{row.note}</p>
                        </div>
                      ))}
                      {/* CWS row */}
                      <div style={{ padding: '12px 14px', background: 'rgba(30,61,143,0.12)', borderTop: '1px solid rgba(30,61,143,0.25)', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '12px', alignItems: 'center' }}>
                        <div>
                          <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '0.83rem', color: '#fff', margin: '0 0 2px', whiteSpace: 'nowrap' }}>Caliber Web Studio</p>
                          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.72rem', color: '#34d399', margin: 0, whiteSpace: 'nowrap' }}>{tool.price}/mo</p>
                        </div>
                        <p style={{ fontSize: '0.78rem', color: 'rgba(52,211,153,0.8)', lineHeight: 1.5, margin: 0, fontWeight: 600 }}>Built for small business. No bundled platform you don&apos;t need.</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </ScrollReveal>
          ))}

          {/* Upgrade CTA */}
          <ScrollReveal>
            <div style={{ margin: 'clamp(40px,6vw,80px) 0', padding: 'clamp(36px,5vw,56px)', background: 'linear-gradient(135deg, rgba(30,61,143,0.12) 0%, rgba(8,145,178,0.08) 100%)', border: '1px solid rgba(30,61,143,0.3)', borderRadius: '20px', textAlign: 'center' }}>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(30,61,143,0.7)', marginBottom: '12px', fontWeight: 700 }}>
                Want It Done For You Instead?
              </p>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(22px,4vw,36px)', color: 'var(--text-primary, #fff)', marginBottom: '16px', letterSpacing: '-0.02em' }}>
                Tools are self-serve. Managed plans are done-for-you.
              </h2>
              <p style={{ fontSize: 'clamp(14px,1.8vw,17px)', color: 'var(--chrome, rgba(255,255,255,0.65))', maxWidth: '540px', margin: '0 auto 32px', lineHeight: 1.7 }}>
                With a managed plan, Caliber handles everything — website, chatbot, SEO, reviews, content, and strategy. You run your business. We grow it.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/pricing" className="btn-chrome" style={{ textDecoration: 'none' }}>See Managed Plans →</Link>
                <Link href="/compare" className="btn-line" style={{ textDecoration: 'none' }}>Compare Options</Link>
              </div>
            </div>
          </ScrollReveal>

          {/* FAQ */}
          <ScrollReveal>
            <div style={{ marginBottom: 'clamp(60px,8vw,100px)' }}>
              <p className="sec-label" style={{ marginBottom: '32px' }}>Common Questions</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(255,255,255,0.05)', borderRadius: '14px', overflow: 'hidden' }}>
                {faqSchema.mainEntity.map((item) => (
                  <div key={item.name} style={{ padding: 'clamp(18px,3vw,28px)', background: 'var(--bg, #0a0a0e)' }}>
                    <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 'clamp(0.9rem,1.8vw,1rem)', color: 'var(--text-primary, #fff)', marginBottom: '8px' }}>{item.name}</p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--chrome, rgba(255,255,255,0.6))', lineHeight: 1.7, margin: 0 }}>{item.acceptedAnswer.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

        </div>
      </main>
      <Footer />
    </>
  );
}
