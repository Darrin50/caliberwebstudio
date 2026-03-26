import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Services | Caliber Web Studio',
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
  { name: 'Logo Design', price: '+$149/mo', desc: 'Professional logo package with full brand guidelines.' },
  { name: 'Social Media Kit', price: '+$99/mo', desc: 'Branded templates for Instagram, Facebook, and Google Business.' },
  { name: 'Google Ads Management', price: '+$299/mo', desc: 'Full setup and monthly management of Google Ads campaigns.' },
  { name: 'Video Production', price: '+$199/mo', desc: 'Short-form video content for your site and social channels.' },
  { name: 'Email Marketing', price: '+$149/mo', desc: 'Monthly email campaigns to your customer list.' },
];

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main style={{ background: 'var(--bg, #141414)', color: 'var(--silver, #D0D8E0)', minHeight: '100vh' }}>

        <section style={{ padding: 'clamp(80px,12vw,140px) clamp(20px,6vw,80px) clamp(60px,8vw,100px)', textAlign: 'center', borderBottom: '1px solid var(--border, rgba(168,184,200,0.12))' }}>
          <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '24px' }}>What We Build</p>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(36px,6vw,72px)', lineHeight: 1.05, color: '#fff', marginBottom: '24px' }}>Every Tool You Need to<br />Dominate Your Market</h1>
          <p style={{ fontSize: 'clamp(16px,2vw,20px)', color: 'var(--chrome, #A8B8C8)', maxWidth: '560px', margin: '0 auto' }}>Three plans. One mission. Get your Detroit business the online presence it deserves — with zero risk and no upfront cost.</p>
        </section>

        <section style={{ padding: 'clamp(60px,8vw,120px) clamp(20px,6vw,80px)', borderBottom: '1px solid var(--border, rgba(168,184,200,0.12))' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '16px' }}>Included in Every Plan</p>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(24px,3vw,40px)', color: '#fff', marginBottom: '48px' }}>The Foundation Is Never Negotiated</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
              {foundation.map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: 'rgba(30,61,143,0.08)', border: '1px solid rgba(30,61,143,0.2)', borderRadius: '6px' }}>
                  <span style={{ color: 'var(--navy, #1E3D8F)', fontWeight: 700, fontSize: '18px', lineHeight: 1 }}>&#10003;</span>
                  <span style={{ fontSize: '14px', color: 'var(--silver, #D0D8E0)' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: 'clamp(60px,8vw,120px) clamp(20px,6vw,80px)', borderBottom: '1px solid var(--border, rgba(168,184,200,0.12))' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '16px', textAlign: 'center' }}>Plans</p>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(24px,3vw,40px)', color: '#fff', marginBottom: '56px', textAlign: 'center' }}>Choose Your Level</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border, rgba(168,184,200,0.12))' }}>
              {addons.map(addon => (
                <div key={addon.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '28px 32px', background: 'var(--bg, #141414)', gap: '24px', flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '18px', color: '#fff', marginBottom: '4px' }}>{addon.name}</div>
                    <div style={{ fontSize: '14px', color: 'var(--chrome, #A8B8C8)' }}>{addon.desc}</div>
                  </div>
                  <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '14px', color: 'var(--navy, #1E3D8F)', whiteSpace: 'nowrap', fontWeight: 700 }}>{addon.price}</div>
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
    </>
  );
}
