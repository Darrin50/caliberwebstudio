import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: { absolute: 'Services | Caliber Web Studio' },
  description: 'AI-powered websites for Detroit small businesses. Starter, Growth, and Domination plans — all with $0 down and no long-term contracts.',
  alternates: { canonical: 'https://caliberwebstudio.com/services' },
};

const foundation = [
  'Custom design (no templates)',
  'Mobile-first responsive layout',
  'AI chat widget',
  'Contact & lead capture forms',
  'Google Analytics integration',
  'SEO-optimized structure',
  'Fast loading (Core Web Vitals)',
  'SSL security certificate',
  'Google Business Profile setup',
  'Social media links',
  'Accessibility compliance',
  'Browser compatibility testing',
  'Hosting & maintenance included',
  'Monthly content updates',
  'Priority email support',
  'No long-term contracts',
];

const plans = [
  {
    name: 'Starter',
    price: '$197',
    tagline: 'The Foundation',
    popular: false,
    features: [
      'Up to 5 pages',
      'Custom design',
      'Mobile responsive',
      'AI chat widget',
      'Lead capture forms',
      'Basic SEO setup',
      'Google Analytics',
      'Monthly 1 content update',
    ],
  },
  {
    name: 'Growth',
    price: '$397',
    tagline: 'The Engine',
    popular: true,
    features: [
      'Up to 10 pages',
      'Everything in Starter',
      'Blog / news section',
      'Advanced SEO optimization',
      'Google Ads landing page',
      'Monthly 3 content updates',
    ],
  },
  {
    name: 'Domination',
    price: '$697',
    tagline: 'The Full Stack',
    popular: false,
    features: [
      'Unlimited pages',
      'Everything in Growth',
      'E-commerce ready',
      'Custom integrations',
      'Priority 24hr support',
      'Monthly 10 content updates',
    ],
  },
];

const addons = [
  { name: 'Social Media Kit', price: '+$99/mo', desc: 'Branded templates for Instagram, Facebook, and Google Business. Posted and scheduled for you monthly.' },
  { name: 'Logo Design', price: '+$149/mo', desc: 'Professional logo package with full brand guidelines, color palette, and multiple file formats.' },
  { name: 'Video Production', price: '+$199/mo', desc: 'Short-form video content for your site and social channels, edited and ready to post.' },
  { name: 'Google Ads Management', price: '+$299/mo', desc: 'Full setup and monthly management of Google Ads campaigns targeting your service area.' },
];

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main style={{ background: 'var(--bg, #141414)', color: 'var(--silver, #D0D8E0)', minHeight: '100vh' }}>

        <section style={{ padding: 'clamp(140px,16vw,180px) clamp(20px,6vw,80px) clamp(80px,10vw,120px)', textAlign: 'center', borderBottom: '1px solid var(--border, rgba(168,184,200,0.12))', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(30,61,143,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <p className="fu sec-label" style={{ justifyContent: 'center' }}>What We Build</p>
          <h1 className="fu" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(44px,7vw,88px)', lineHeight: 1.0, letterSpacing: '-0.03em', color: '#fff', margin: '20px 0 24px' }}>Every Tool You Need to<br />Dominate Your Market</h1>
          <p className="fu" style={{ fontSize: 'clamp(17px,2vw,20px)', color: 'var(--chrome, #A8B8C8)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>Three plans. One mission. Get your Detroit business the online presence it deserves — with zero risk and no upfront cost.</p>
        </section>

        <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,80px)', borderBottom: '1px solid var(--border, rgba(168,184,200,0.12))', background: 'var(--bg2)' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <p className="fu sec-label">Included in Every Plan</p>
            <h2 className="fu" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(32px,4vw,52px)', color: '#fff', marginBottom: 'clamp(36px,5vw,56px)', letterSpacing: '-0.025em' }}>The Foundation Is Never Negotiated</h2>
            <div className="foundation-grid">
              {foundation.map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: 'rgba(30,61,143,0.08)', border: '1px solid rgba(30,61,143,0.2)', borderRadius: '6px' }}>
                  <span style={{ color: 'var(--navy, #1E3D8F)', fontWeight: 700, fontSize: '18px', lineHeight: 1 }}>&#10003;</span>
                  <span style={{ fontSize: '14px', color: 'var(--silver, #D0D8E0)' }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '32px', padding: '24px 28px', background: 'rgba(30,61,143,0.1)', border: '1px solid rgba(30,61,143,0.3)', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '16px', color: '#fff' }}>AI Chatbot — Included on Every Plan</span>
                <span style={{ display: 'block', fontSize: '13px', color: 'var(--chrome, #A8B8C8)', marginTop: '4px' }}>Answers questions, captures leads, and books appointments 24/7. Trained on your business.</span>
              </div>
              <Link href="/services/ai-chatbot" style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--navy, #1E3D8F)', textDecoration: 'none', whiteSpace: 'nowrap', fontWeight: 700 }}>Learn More →</Link>
            </div>
          </div>
        </section>

        <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,80px)', borderBottom: '1px solid var(--border, rgba(168,184,200,0.12))' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <p className="fu sec-label" style={{ justifyContent: 'center' }}>Plans</p>
            <h2 className="fu" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(32px,4vw,52px)', color: '#fff', marginBottom: 'clamp(40px,5vw,64px)', textAlign: 'center', letterSpacing: '-0.025em' }}>Choose Your Level</h2>
            <div className="services-plans-grid">
              {plans.map(plan => (
                <div key={plan.name} style={{ background: plan.popular ? 'var(--navy, #1E3D8F)' : 'var(--bg2, #1a1a1a)', border: plan.popular ? '2px solid var(--navy, #1E3D8F)' : '1px solid var(--border, rgba(168,184,200,0.12))', borderRadius: '8px', padding: '40px 32px', position: 'relative' }}>
                  {plan.popular && (
                    <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#fff', color: 'var(--navy, #1E3D8F)', fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', padding: '4px 16px', borderRadius: '12px', fontWeight: 700, whiteSpace: 'nowrap' }}>Most Popular</div>
                  )}
                  <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: plan.popular ? 'rgba(255,255,255,0.7)' : 'var(--chrome, #A8B8C8)', marginBottom: '8px' }}>{plan.tagline}</p>
                  <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '32px', color: '#fff', margin: '0 0 4px' }}>{plan.name}</h3>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '48px', color: '#fff', marginBottom: '32px' }}>{plan.price}<span style={{ fontSize: '16px', fontWeight: 400, opacity: 0.7 }}>/mo</span></div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
                    {plan.features.map(f => (
                      <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <span style={{ color: plan.popular ? '#fff' : 'var(--navy, #1E3D8F)', fontWeight: 700, fontSize: '16px', marginTop: '1px' }}>&#10003;</span>
                        <span style={{ fontSize: '15px', color: plan.popular ? 'rgba(255,255,255,0.9)' : 'var(--silver, #D0D8E0)' }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/pricing" style={{ display: 'block', textAlign: 'center', background: plan.popular ? '#fff' : 'var(--navy, #1E3D8F)', color: plan.popular ? 'var(--navy, #1E3D8F)' : '#fff', fontFamily: 'Space Mono, monospace', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', padding: '16px 24px', textDecoration: 'none', borderRadius: '4px' }}>See Full Pricing</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: 'clamp(60px,8vw,120px) clamp(20px,6vw,80px)', borderBottom: '1px solid var(--border, rgba(168,184,200,0.12))' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '16px' }}>Add-Ons</p>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(24px,3vw,40px)', color: '#fff', marginBottom: '48px' }}>Power Up Any Plan</h2>
            <div className="addons-grid">
              {addons.map(addon => (
                <div key={addon.name} className="addon-card" style={{ background: 'var(--bg2, #1a1a1a)', border: '1px solid var(--border, rgba(168,184,200,0.12))', borderRadius: '12px', padding: '28px 28px 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '20px', color: 'var(--silver, #D0D8E0)', lineHeight: 1.2 }}>{addon.name}</div>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '28px', background: 'linear-gradient(90deg, var(--navy, #1E3D8F), #0077aa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1 }}>{addon.price}</div>
                  <div style={{ fontSize: '14px', color: 'var(--chrome, #A8B8C8)', lineHeight: 1.6 }}>{addon.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,80px)', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4vw,48px)', color: '#fff', marginBottom: '24px' }}>See the Full Pricing Breakdown</h2>
          <p style={{ color: 'var(--chrome, #A8B8C8)', fontSize: '18px', maxWidth: '480px', margin: '0 auto 40px' }}>Every feature, every plan, every add-on — all laid out with no surprises.</p>
          <Link href="/pricing" style={{ display: 'inline-block', background: 'var(--navy, #1E3D8F)', color: '#fff', fontFamily: 'Space Mono, monospace', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', padding: '18px 40px', textDecoration: 'none' }}>View Pricing</Link>
        </section>

      </main>
      <Footer />
      <style>{`
        .foundation-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        @media (max-width: 960px) {
          .foundation-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .foundation-grid { grid-template-columns: 1fr; }
        }
        .services-plans-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 860px) {
          .services-plans-grid { grid-template-columns: 1fr; max-width: 440px; margin-left: auto; margin-right: auto; }
        }
        .addons-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        @media (max-width: 600px) {
          .addons-grid { grid-template-columns: 1fr; }
        }
        .addon-card { transition: border-color 0.2s ease, box-shadow 0.2s ease; }
        .addon-card:hover { border-color: rgba(30,61,143,0.4) !important; box-shadow: 0 8px 32px rgba(30,61,143,0.1); }
      `}</style>
    </>
  );
}
