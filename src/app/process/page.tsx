import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: { absolute: 'Our Process | Caliber Web Studio' },
  description: 'See exactly how Caliber Web Studio builds your AI-powered website â free mockup first, you approve, then we launch in 24 hours.',
  alternates: { canonical: 'https://www.caliberwebstudio.com/process' },
};

const steps = [
  { number: '01', title: 'We Research Your Business', duration: 'Free â No Commitment', desc: "We study your industry, competitors, and local market before touching a pixel. You get a site built for your specific customers, not a recycled template." },
  { number: '02', title: 'We Build Your Mockup', duration: '48 Hours', desc: "Within 48 hours you'll see a full design of your new site. Real content, real layout, real branding â nothing generic." },
  { number: '03', title: 'You Review & Approve', duration: 'Your Call', desc: "Take as much time as you need. Request changes, tweaks, or full redesigns until it's exactly right. No pressure, no rushing." },
  { number: '04', title: 'We Launch in 24 Hours', duration: '24 Hours', desc: "Once you give the go-ahead, your site goes live within 24 hours. Fast, clean, and optimized from day one." },
  { number: '05', title: "Your Monthly Plan Begins", duration: "After You're Live", desc: "Your 14-day preview period starts at launch. Once you're satisfied, your monthly plan kicks in â no surprises, no hidden fees." },
];

const faqs = [
  { q: "What happens if I don't like the mockup?", a: "We revise it until you love it. There's no limit on revision rounds during the mockup phase." },
  { q: "Is there really $0 upfront?", a: "Yes. You pay nothing until your site is live and you've had 14 days to preview it on your real domain." },
  { q: "How long does the whole process take?", a: "From first contact to live site: typically 5-7 business days. Mockup in 48 hours, approval is on your timeline, launch within 24 hours of your go-ahead." },
  { q: "What if I need changes after launch?", a: "All plans include ongoing updates and maintenance. You're never on your own after we go live." },
  { q: "Do I own my site?", a: "Your content and domain are always yours. Your monthly plan covers hosting, maintenance, and continuous improvements." },
  { q: "What if I want to cancel?", a: "No contracts. Cancel anytime with 30 days written notice to darrin@caliberwebstudio.com." },
];

export default function ProcessPage() {
  return (
    <>
      <Nav />
      <main style={{ background: 'var(--bg, #141414)', color: 'var(--silver, #D0D8E0)', minHeight: '100vh' }}>

        <section style={{ padding: 'clamp(80px,12vw,140px) clamp(20px,6vw,80px) clamp(60px,8vw,100px)', textAlign: 'center', borderBottom: '1px solid var(--border, rgba(168,184,200,0.12))' }}>
          <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '24px' }}>The Process</p>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(36px,6vw,72px)', lineHeight: 1.05, color: '#fff', marginBottom: '24px' }}>How We Build Your<br />Digital Foundation</h1>
          <p style={{ fontSize: 'clamp(16px,2vw,20px)', color: 'var(--chrome, #A8B8C8)', maxWidth: '560px', margin: '0 auto' }}>$0 down. Free mockup. Live in days. Here is exactly what happens from first contact to your finished site.</p>
        </section>

        <section className="stats-strip" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', borderBottom: '1px solid var(--border, rgba(168,184,200,0.12))' }}>
          {([['$0','Down to start'],['48hrs','Mockup delivered'],['14 days','Preview period'],['$0','Surprise fees']] as [string,string][]).map(([val, label]) => (
            <div key={label} style={{ padding: '40px 32px', textAlign: 'center', borderRight: '1px solid var(--border, rgba(168,184,200,0.12))' }}>
              <div className="stat-val" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4vw,48px)', color: '#fff', marginBottom: '8px' }}>{val}</div>
              <div className="stat-label" style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)' }}>{label}</div>
            </div>
          ))}
        </section>

        <section style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(60px,8vw,120px) clamp(20px,6vw,80px)' }}>
          {steps.map((step, i) => (
            <div key={step.number} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '32px', padding: '48px 0', borderBottom: i < steps.length - 1 ? '1px solid var(--border, rgba(168,184,200,0.12))' : 'none', alignItems: 'start' }}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '48px', color: 'var(--navy, #1E3D8F)', lineHeight: 1 }}>{step.number}</div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
                  <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(20px,3vw,28px)', color: '#fff', margin: 0 }}>{step.title}</h2>
                  <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--navy, #1E3D8F)', background: 'rgba(30,61,143,0.15)', padding: '4px 12px', borderRadius: '4px' }}>{step.duration}</span>
                </div>
                <p style={{ color: 'var(--chrome, #A8B8C8)', fontSize: '16px', lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </section>

        <section style={{ background: 'var(--bg2, #1a1a1a)', padding: 'clamp(60px,8vw,120px) clamp(20px,6vw,80px)', borderTop: '1px solid var(--border, rgba(168,184,200,0.12))' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '16px' }}>FAQ</p>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4vw,48px)', color: '#fff', marginBottom: '56px' }}>Common Questions</h2>
            {faqs.map(faq => (
              <div key={faq.q} style={{ borderBottom: '1px solid var(--border, rgba(168,184,200,0.12))', paddingBottom: '40px', marginBottom: '40px' }}>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '20px', color: '#fff', marginBottom: '12px' }}>{faq.q}</h3>
                <p style={{ color: 'var(--chrome, #A8B8C8)', fontSize: '16px', lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,80px)', textAlign: 'center', borderTop: '1px solid var(--border, rgba(168,184,200,0.12))' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4vw,48px)', color: '#fff', marginBottom: '24px' }}>Ready to Start?</h2>
          <p style={{ color: 'var(--chrome, #A8B8C8)', fontSize: '18px', maxWidth: '480px', margin: '0 auto 40px' }}>No upfront cost. Just a free mockup of your new site in 48 hours â no commitment required to see whatâs possible.</p>
          <Link href="/#contact" style={{ display: 'inline-block', background: 'var(--navy, #1E3D8F)', color: '#fff', fontFamily: 'Space Mono, monospace', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', padding: '18px 40px', textDecoration: 'none' }}>Start a Free Project</Link>
        </section>

      </main>
      <Footer />
    </>
  );
}
