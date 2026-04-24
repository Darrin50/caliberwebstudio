import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: { absolute: 'Caliber vs. DIY vs. Agency | Caliber Web Studio' },
  description: 'How does Caliber Web Studio compare to Wix, Squarespace, GoDaddy, and traditional web agencies? See the honest side-by-side breakdown.',
  alternates: { canonical: 'https://www.caliberwebstudio.com/compare' },
  openGraph: {
    title: 'Caliber vs. DIY Builders vs. Traditional Agencies',
    description: 'The honest comparison: what you actually get from Wix, an agency, a freelancer, and Caliber Web Studio.',
    url: 'https://www.caliberwebstudio.com/compare',
    type: 'website',
  },
};

const rows = [
  { feature: 'Upfront cost',         caliber: '$0',                   diy: '$0–$25/mo',        agency: '$3,000–$15,000',    freelancer: '$500–$5,000' },
  { feature: 'Monthly cost',          caliber: '$197–$697/mo',         diy: '$15–$45/mo',       agency: '$0 (one-time)',      freelancer: '$0 (one-time)' },
  { feature: 'Time to launch',        caliber: '5–7 business days',    diy: 'Weeks (DIY)',      agency: '6–12 weeks',         freelancer: '2–8 weeks' },
  { feature: 'Custom design',         caliber: '✓ Always',             diy: '✗ Templates only', agency: '✓ Usually',          freelancer: '✓ Varies' },
  { feature: 'AI chatbot included',   caliber: '✓ Every plan',         diy: '✗ Extra cost',     agency: '✗ Extra cost',       freelancer: '✗ Extra cost' },
  { feature: 'Local SEO setup',       caliber: '✓ Built in',           diy: '✗ Manual',         agency: '✓ Sometimes',        freelancer: '✗ Rarely' },
  { feature: 'Review automation',     caliber: '✓ Growth & up',        diy: '✗ No',             agency: '✗ No',               freelancer: '✗ No' },
  { feature: 'Hosting included',      caliber: '✓ Included',           diy: '✓ Included',       agency: '✗ Extra monthly',    freelancer: '✗ Extra monthly' },
  { feature: 'Monthly updates',       caliber: '✓ Every plan',         diy: '✗ You do it',      agency: '✗ Hourly billing',   freelancer: '✗ Hourly billing' },
  { feature: 'Lighthouse score',      caliber: '90+ guaranteed',       diy: '40–70 typical',    agency: '70–90 typical',      freelancer: '60–85 typical' },
  { feature: 'See it before you pay', caliber: '✓ Free mockup first',  diy: 'N/A',              agency: '✗ No',               freelancer: '✗ Rarely' },
  { feature: 'No long-term contract', caliber: '✓ Cancel anytime',     diy: '✓',                agency: '✗ Often annual',     freelancer: '✓' },
];

const verdicts = [
  {
    vs: 'vs. Wix / Squarespace / GoDaddy',
    color: '#d97706',
    bg: 'rgba(217,119,6,0.08)',
    verdict: 'DIY builders are priced for startups and side projects — not businesses trying to compete. You\'re limited to templates, you\'re doing all the work yourself, and the performance ceilings are low. The moment a customer Googles your competition, you\'ll see why a $15/month website isn\'t enough.',
    bottom_line: 'Great for a personal portfolio. Not for a business competing for local customers.',
  },
  {
    vs: 'vs. Traditional Web Agency',
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.08)',
    verdict: 'Agencies build you something great — once. Then you\'re on your own for maintenance, updates, and ongoing SEO. Most charge $150+/hour for changes and take 6–12 weeks just to start. The quality is often there; the speed and ongoing support usually isn\'t.',
    bottom_line: 'The right choice for enterprise projects with big budgets. Not for local businesses that need agility and ongoing growth.',
  },
  {
    vs: 'vs. Freelancer',
    color: '#0891b2',
    bg: 'rgba(8,145,178,0.08)',
    verdict: 'Freelancers offer flexibility but rarely include ongoing maintenance, local SEO, AI integrations, or growth systems. When they\'re booked with other clients or unavailable, you\'re stuck. And there\'s no team — one sick day or vacation can stall your project indefinitely.',
    bottom_line: 'Good for one-off projects with clear scope. Not reliable for ongoing digital growth.',
  },
];

export default function ComparePage() {
  return (
    <>
      <Nav />
      <main style={{ background: 'var(--bg)', color: 'var(--silver)', minHeight: '100vh' }}>

        {/* Hero */}
        <section style={{ padding: 'clamp(140px,16vw,180px) clamp(20px,6vw,80px) clamp(80px,10vw,120px)', textAlign: 'center', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(30,61,143,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <ScrollReveal>
            <p className="sec-label fu" style={{ justifyContent: 'center' }}>Honest Comparison</p>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h1 className="fu" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(40px,7vw,80px)', lineHeight: 1.0, letterSpacing: '-0.03em', color: '#fff', margin: '20px 0 24px' }}>
              Caliber vs. Everyone Else
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={140}>
            <p className="fu" style={{ fontSize: 'clamp(17px,2vw,20px)', color: 'var(--chrome)', maxWidth: '540px', margin: '0 auto', lineHeight: 1.7 }}>
              We&apos;re not for everyone. But if you&apos;re a local business trying to compete online, here&apos;s the honest breakdown of your options.
            </p>
          </ScrollReveal>
        </section>

        {/* Comparison Table */}
        <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,80px)', borderBottom: '1px solid var(--border)', overflowX: 'auto' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <ScrollReveal>
              <p className="sec-label">Side by Side</p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4vw,48px)', color: '#fff', marginBottom: 'clamp(36px,5vw,56px)', letterSpacing: '-0.025em' }}>
                The Full Breakdown
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <div style={{ overflowX: 'auto', borderRadius: '16px', border: '1px solid var(--border)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '680px' }}>
                  <thead>
                    <tr style={{ background: 'var(--bg2)' }}>
                      <th style={{ padding: '16px 20px', textAlign: 'left', fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--dim)', fontWeight: 600, borderBottom: '1px solid var(--border)' }}>Feature</th>
                      <th style={{ padding: '16px 20px', textAlign: 'center', fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1E3D8F', fontWeight: 700, borderBottom: '1px solid var(--border)', background: 'rgba(30,61,143,0.08)', minWidth: '140px' }}>Caliber ★</th>
                      <th style={{ padding: '16px 20px', textAlign: 'center', fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--dim)', fontWeight: 600, borderBottom: '1px solid var(--border)' }}>DIY Builders</th>
                      <th style={{ padding: '16px 20px', textAlign: 'center', fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--dim)', fontWeight: 600, borderBottom: '1px solid var(--border)' }}>Agency</th>
                      <th style={{ padding: '16px 20px', textAlign: 'center', fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--dim)', fontWeight: 600, borderBottom: '1px solid var(--border)' }}>Freelancer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, i) => (
                      <tr key={row.feature} style={{ background: i % 2 === 0 ? 'var(--bg)' : 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '14px 20px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'var(--chrome)', fontWeight: 500 }}>{row.feature}</td>
                        <td style={{ padding: '14px 20px', textAlign: 'center', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#fff', fontWeight: 700, background: 'rgba(30,61,143,0.06)' }}>{row.caliber}</td>
                        <td style={{ padding: '14px 20px', textAlign: 'center', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'var(--chrome)' }}>{row.diy}</td>
                        <td style={{ padding: '14px 20px', textAlign: 'center', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'var(--chrome)' }}>{row.agency}</td>
                        <td style={{ padding: '14px 20px', textAlign: 'center', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'var(--chrome)' }}>{row.freelancer}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Verdict sections */}
        <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,80px)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <ScrollReveal>
              <p className="sec-label">The Honest Verdict</p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4vw,48px)', color: '#fff', marginBottom: 'clamp(40px,5vw,60px)', letterSpacing: '-0.025em' }}>
                Who Each Option Is Actually For
              </h2>
            </ScrollReveal>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(28px,4vw,48px)' }}>
              {verdicts.map((v, i) => (
                <ScrollReveal key={v.vs} delay={i * 80}>
                  <div style={{ background: v.bg, border: `1px solid ${v.color}25`, borderRadius: '20px', padding: 'clamp(28px,4vw,44px)' }}>
                    <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(18px,2.2vw,24px)', color: v.color, marginBottom: '16px', letterSpacing: '-0.015em' }}>{v.vs}</div>
                    <p style={{ fontSize: '15px', color: 'var(--silver)', lineHeight: 1.8, marginBottom: '16px' }}>{v.verdict}</p>
                    <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '12px', color: v.color, letterSpacing: '0.04em', lineHeight: 1.6, paddingTop: '16px', borderTop: `1px solid ${v.color}25` }}>
                      Bottom line: {v.bottom_line}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: 'clamp(100px,12vw,160px) clamp(20px,6vw,80px)', textAlign: 'center' }}>
          <ScrollReveal>
            <p className="sec-label" style={{ justifyContent: 'center' }}>Still Deciding?</p>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(32px,5vw,60px)', color: '#fff', marginBottom: '20px', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
              See What We Actually Build<br />Before You Commit.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={140}>
            <p style={{ color: 'var(--chrome)', fontSize: 'clamp(16px,1.8vw,19px)', maxWidth: '480px', margin: '0 auto 44px', lineHeight: 1.7 }}>
              Browse four live, working demo sites and make your own call. No sales pressure.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/work" className="btn-chrome" style={{ textDecoration: 'none' }}>See Live Demos</Link>
              <Link href="/pricing" className="btn-line" style={{ textDecoration: 'none' }}>View Pricing</Link>
            </div>
          </ScrollReveal>
        </section>

      </main>
      <Footer />
    </>
  );
}
