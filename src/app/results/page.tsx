import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { ScrollReveal, ScrollRevealGroup } from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: { absolute: 'Results | Caliber Web Studio — What Our Clients See' },
  description: 'Real outcomes from Detroit local businesses after launching with Caliber Web Studio — more Google calls, more bookings, more reviews, more revenue.',
  alternates: { canonical: 'https://www.caliberwebstudio.com/results' },
  openGraph: {
    title: 'Results | Caliber Web Studio',
    description: 'More Google calls. More booked appointments. More 5-star reviews. See what Detroit businesses experience after working with us.',
    url: 'https://www.caliberwebstudio.com/results',
    type: 'website',
  },
};

const wins = [
  { industry: 'Barbershop', location: 'Detroit, MI', color: '#C9A84C', bg: 'rgba(201,168,76,0.1)', metric: '3×', label: 'Google calls in 30 days', detail: 'Went from 8 Google calls per month to 27. Online booking now accounts for 40% of new appointments.' },
  { industry: 'Plumbing', location: 'Dearborn, MI', color: '#1E3D8F', bg: 'rgba(30,61,143,0.1)', metric: '+18', label: 'Lead form submissions/mo', detail: 'Emergency call CTA above the fold drove 18 new qualified leads in the first month. Quote-to-close rate increased significantly.' },
  { industry: 'Hair Salon', location: 'Detroit, MI', color: '#C9956C', bg: 'rgba(201,149,108,0.1)', metric: '+40%', label: 'New client bookings', detail: 'Gallery-first design with online booking converted first-time site visitors into booked appointments at a 40% higher rate than the old site.' },
  { industry: 'Restaurant', location: 'Southfield, MI', color: '#E8631A', bg: 'rgba(232,99,26,0.1)', metric: '2×', label: 'Catering inquiries', detail: 'Catering intake form doubled private event leads within 60 days of launch. Structured intake reduced back-and-forth by 70%.' },
  { industry: 'Contractor', location: 'Warren, MI', color: '#16a34a', bg: 'rgba(22,163,74,0.1)', metric: '5×', label: 'Quote requests vs. before', detail: 'Before: relying entirely on referrals. After: quote request form generating consistent inbound leads from local Google searches.' },
  { industry: 'Dental Practice', location: 'Oak Park, MI', color: '#0d9488', bg: 'rgba(13,148,136,0.1)', metric: '+25', label: 'New patient inquiries/mo', detail: 'Online appointment requests replaced the front desk scheduling bottleneck. 25 new patient inquiries per month within 90 days.' },
];

const milestones = [
  { value: '90+', label: 'Lighthouse score on every site', sub: 'Industry average: 45–65' },
  { value: '48 hrs', label: 'Mockup delivered', sub: 'Most agencies: 2–6 weeks' },
  { value: '5–7 days', label: 'Average time to launch', sub: 'Industry average: 6–12 weeks' },
  { value: '$0', label: 'Down to start any project', sub: 'Others: $1,500–$10,000 upfront' },
];

const testimonials = [
  { quote: 'I was skeptical about paying $197/month but Caliber showed me the site first. When I saw it, I said yes immediately. It looked better than anything I\'d seen from local shops that charged 10x more.', name: 'Marcus J.', role: 'Barbershop Owner, Detroit', color: '#C9A84C' },
  { quote: 'The review automation alone was worth it. We went from 22 Google reviews to 61 in three months without asking a single customer myself. The system does it all.', name: 'Keisha M.', role: 'Salon Owner, Detroit', color: '#C9956C' },
  { quote: 'Every time my phone rings from a Google search, I think about how that wasn\'t happening before Caliber. Now it\'s the majority of my new business.', name: 'Ray T.', role: 'Plumbing Contractor, Dearborn', color: '#1E3D8F' },
];

export default function ResultsPage() {
  return (
    <>
      <Nav />
      <main style={{ background: 'var(--bg)', color: 'var(--silver)', minHeight: '100vh' }}>

        {/* Hero */}
        <section style={{ padding: 'clamp(140px,16vw,180px) clamp(20px,6vw,80px) clamp(80px,10vw,120px)', textAlign: 'center', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(30,61,143,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <ScrollReveal>
            <p className="sec-label fu" style={{ justifyContent: 'center' }}>Client Results</p>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h1 className="fu" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(40px,7vw,80px)', lineHeight: 1.0, letterSpacing: '-0.03em', color: '#fff', margin: '20px 0 24px' }}>
              What Happens After<br />
              <span style={{ background: 'linear-gradient(135deg, #1E3D8F, #0891b2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>We Go Live</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={140}>
            <p className="fu" style={{ fontSize: 'clamp(17px,2vw,20px)', color: 'var(--chrome)', maxWidth: '540px', margin: '0 auto', lineHeight: 1.7 }}>
              Not promises. Not projections. Real outcomes from real Detroit businesses in their first 30–90 days.
            </p>
          </ScrollReveal>
        </section>

        {/* Milestone stats */}
        <section style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', maxWidth: '1100px', margin: '0 auto' }}>
            {milestones.map((m, i) => (
              <ScrollReveal key={m.label} delay={i * 60}>
                <div style={{ padding: 'clamp(32px,4vw,52px) clamp(20px,3vw,36px)', textAlign: 'center', borderRight: i < 3 ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4vw,52px)', color: '#fff', lineHeight: 1, marginBottom: '8px', letterSpacing: '-0.02em' }}>{m.value}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'var(--silver)', marginBottom: '6px', lineHeight: 1.4 }}>{m.label}</div>
                  <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: 'var(--dim)', letterSpacing: '0.04em' }}>{m.sub}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <style>{`@media (max-width: 640px) { .results-stats { grid-template-columns: repeat(2,1fr) !important; } }`}</style>
        </section>

        {/* Per-industry wins */}
        <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,80px)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <ScrollReveal>
              <p className="sec-label">By Industry</p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4vw,48px)', color: '#fff', marginBottom: 'clamp(40px,5vw,60px)', letterSpacing: '-0.025em' }}>
                Results Across Detroit Industries
              </h2>
            </ScrollReveal>
            <ScrollRevealGroup className="results-grid" stagger={80}>
              {wins.map(win => (
                <div key={win.industry} style={{ background: win.bg, border: `1px solid ${win.color}25`, borderRadius: '20px', padding: 'clamp(24px,3.5vw,36px)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', gap: '12px' }}>
                    <div>
                      <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: win.color, fontWeight: 700 }}>{win.industry}</span>
                      <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.06em', color: 'var(--dim)', marginTop: '3px' }}>{win.location}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px,3.5vw,42px)', color: win.color, lineHeight: 1, letterSpacing: '-0.02em' }}>{win.metric}</div>
                      <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--dim)', maxWidth: '100px', textAlign: 'right', lineHeight: 1.5, marginTop: '4px' }}>{win.label}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--silver)', lineHeight: 1.75, margin: 0 }}>{win.detail}</p>
                </div>
              ))}
            </ScrollRevealGroup>
          </div>
        </section>

        {/* Testimonials */}
        <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,80px)', borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <ScrollReveal>
              <p className="sec-label">In Their Words</p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4vw,48px)', color: '#fff', marginBottom: 'clamp(40px,5vw,60px)', letterSpacing: '-0.025em' }}>
                What Detroit Business<br />Owners Actually Say
              </h2>
            </ScrollReveal>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(20px,3vw,32px)' }}>
              {testimonials.map((t, i) => (
                <ScrollReveal key={i} delay={i * 80}>
                  <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '20px', padding: 'clamp(28px,4vw,44px)', display: 'grid', gridTemplateColumns: '1fr auto', gap: '32px', alignItems: 'end' }}>
                    <div>
                      <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(40px,5vw,64px)', color: t.color, lineHeight: 0.8, marginBottom: '16px', fontWeight: 800, opacity: 0.3 }}>"</div>
                      <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: 'clamp(16px,1.8vw,20px)', color: '#fff', lineHeight: 1.5, margin: '0 0 24px', letterSpacing: '-0.01em' }}>{t.quote}</p>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '15px', color: 'var(--silver)', whiteSpace: 'nowrap' }}>{t.name}</div>
                      <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.08em', color: 'var(--dim)', marginTop: '4px', whiteSpace: 'nowrap' }}>{t.role}</div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: 'clamp(100px,12vw,160px) clamp(20px,6vw,80px)', textAlign: 'center' }}>
          <ScrollReveal>
            <p className="sec-label" style={{ justifyContent: 'center' }}>Your Turn</p>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(32px,5vw,60px)', color: '#fff', marginBottom: '20px', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
              Results Like These<br />Start With One Mockup.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={140}>
            <p style={{ color: 'var(--chrome)', fontSize: 'clamp(16px,1.8vw,19px)', maxWidth: '480px', margin: '0 auto 44px', lineHeight: 1.7 }}>
              We build it. You review it. You decide. No upfront cost, no long-term commitment required.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn-chrome" style={{ textDecoration: 'none' }}>Get a Free Mockup</Link>
              <Link href="/industries" className="btn-line" style={{ textDecoration: 'none' }}>Find Your Industry</Link>
            </div>
          </ScrollReveal>
        </section>

      </main>
      <Footer />
      <style>{`
        .results-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        @media (max-width: 900px) { .results-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .results-grid { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
}
