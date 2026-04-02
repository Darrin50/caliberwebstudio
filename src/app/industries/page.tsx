import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { ScrollReveal, ScrollRevealGroup } from '@/components/ScrollReveal';
import { industries } from './data';

export const metadata: Metadata = {
  title: { absolute: 'Industries We Serve | Caliber Web Studio — Detroit Local Business' },
  description: 'Caliber Web Studio builds AI-powered websites for barbershops, restaurants, plumbers, salons, contractors, and dentists in Detroit and Metro Detroit.',
  alternates: { canonical: 'https://caliberwebstudio.com/industries' },
};

export default function IndustriesPage() {
  return (
    <>
      <Nav />
      <main style={{ background: 'var(--bg)', color: 'var(--silver)', minHeight: '100vh' }}>

        <section style={{ padding: 'clamp(140px,16vw,180px) clamp(20px,6vw,80px) clamp(80px,10vw,120px)', textAlign: 'center', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(30,61,143,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <ScrollReveal>
            <p className="sec-label fu" style={{ justifyContent: 'center' }}>Industries We Serve</p>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h1 className="fu" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(40px,7vw,80px)', lineHeight: 1.0, letterSpacing: '-0.03em', color: '#fff', margin: '20px 0 24px' }}>
              Built for Your Business.<br />Not Just Any Business.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={140}>
            <p className="fu" style={{ fontSize: 'clamp(17px,2vw,20px)', color: 'var(--chrome)', maxWidth: '540px', margin: '0 auto', lineHeight: 1.7 }}>
              We specialize in six Detroit industries. Choose yours to see exactly what we build, what problems we solve, and what results to expect.
            </p>
          </ScrollReveal>
        </section>

        <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,80px)' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <ScrollRevealGroup className="industries-grid" stagger={80}>
              {industries.map(ind => (
                <Link key={ind.slug} href={`/industries/${ind.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '20px', padding: 'clamp(28px,4vw,44px)', transition: 'all 0.25s ease', cursor: 'pointer' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = ind.color + '60'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px ${ind.color}15`; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', gap: '16px' }}>
                      <div>
                        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: ind.color, background: ind.bg, border: `1px solid ${ind.color}30`, borderRadius: '100px', padding: '4px 12px', display: 'inline-block', marginBottom: '12px' }}>
                          {ind.plural}
                        </span>
                        <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(20px,2.5vw,28px)', color: '#fff', margin: 0, letterSpacing: '-0.02em', lineHeight: 1.2 }}>{ind.headline}</h2>
                      </div>
                      <div style={{ background: ind.bg, border: `1px solid ${ind.color}30`, borderRadius: '12px', padding: '12px 16px', textAlign: 'center', flexShrink: 0 }}>
                        <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '20px', color: ind.color, lineHeight: 1 }}>{ind.resultStat.value}</div>
                        <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--dim)', marginTop: '4px', maxWidth: '80px' }}>{ind.resultStat.label}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: ind.color, fontWeight: 700 }}>See What We Build →</span>
                      {ind.demoSlug && <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: 'var(--dim)', letterSpacing: '0.06em' }}>Live demo available</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </ScrollRevealGroup>
          </div>
        </section>

      </main>
      <Footer />
      <style>{`
        .industries-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        @media (max-width: 680px) { .industries-grid { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
}
