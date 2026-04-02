import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { industries, getIndustry } from '../data';

export async function generateStaticParams() {
  return industries.map(i => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) return {};
  return {
    title: { absolute: `Web Design for ${ind.plural} in Detroit | Caliber Web Studio` },
    description: `Caliber Web Studio builds AI-powered websites for Detroit ${ind.plural.toLowerCase()}. ${ind.subheadline}`,
    alternates: { canonical: `https://caliberwebstudio.com/industries/${slug}` },
    openGraph: {
      title: `Web Design for ${ind.plural} | Caliber Web Studio`,
      description: ind.subheadline,
      url: `https://caliberwebstudio.com/industries/${slug}`,
      type: 'website',
    },
  };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) notFound();

  return (
    <>
      <Nav />
      <main style={{ background: 'var(--bg)', color: 'var(--silver)', minHeight: '100vh' }}>

        {/* Hero */}
        <section style={{ padding: 'clamp(140px,16vw,180px) clamp(20px,6vw,80px) clamp(80px,10vw,120px)', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 80% 60% at 30% 0%, ${ind.bg.replace('0.1', '0.25')} 0%, transparent 70%)`, pointerEvents: 'none' }} />
          <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px,6vw,80px)', alignItems: 'center' }}>
            <div>
              <ScrollReveal>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: ind.color, background: ind.bg, border: `1px solid ${ind.color}30`, borderRadius: '100px', padding: '5px 14px', display: 'inline-block', marginBottom: '24px' }}>
                  {ind.plural} · Detroit, MI
                </span>
              </ScrollReveal>
              <ScrollReveal delay={80}>
                <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(36px,5.5vw,68px)', lineHeight: 1.0, letterSpacing: '-0.03em', color: '#fff', margin: '0 0 24px' }}>
                  {ind.headline}
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={140}>
                <p style={{ fontSize: 'clamp(16px,1.8vw,19px)', color: 'var(--chrome)', lineHeight: 1.75, marginBottom: '36px' }}>{ind.subheadline}</p>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  <Link href="/contact" className="btn-chrome" style={{ textDecoration: 'none' }}>Get a Free Mockup</Link>
                  {ind.demoSlug && <Link href={`/demo/${ind.demoSlug}`} className="btn-line" style={{ textDecoration: 'none' }}>See Live Demo</Link>}
                </div>
              </ScrollReveal>
            </div>
            <ScrollReveal delay={100}>
              <div style={{ background: ind.bg, border: `1px solid ${ind.color}30`, borderRadius: '20px', padding: 'clamp(32px,4vw,52px)', textAlign: 'center' }}>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(52px,7vw,80px)', color: ind.color, lineHeight: 1, marginBottom: '12px' }}>{ind.resultStat.value}</div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--chrome)', maxWidth: '200px', margin: '0 auto', lineHeight: 1.6 }}>{ind.resultStat.label}</div>
                <div style={{ marginTop: '28px', paddingTop: '24px', borderTop: `1px solid ${ind.color}25`, fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'var(--dim)', lineHeight: 1.7 }}>
                  Average result for Detroit {ind.name.toLowerCase()} clients in their first 30–60 days.
                </div>
              </div>
            </ScrollReveal>
          </div>
          <style>{`@media (max-width: 720px) { .industry-hero-grid { grid-template-columns: 1fr !important; } }`}</style>
        </section>

        {/* Pain Points */}
        <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,80px)', borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <ScrollReveal>
              <p className="sec-label">The Real Problem</p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4vw,48px)', color: '#fff', marginBottom: 'clamp(36px,5vw,52px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                What&apos;s Actually Costing<br />Your {ind.name} Customers
              </h2>
            </ScrollReveal>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {ind.painPoints.map((p, i) => (
                <ScrollReveal key={i} delay={i * 55}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', padding: 'clamp(16px,2vw,24px) clamp(18px,3vw,28px)', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '14px' }}>
                    <span style={{ color: ind.color, fontSize: '18px', fontWeight: 700, lineHeight: 1.4, flexShrink: 0, marginTop: '1px' }}>✗</span>
                    <p style={{ fontSize: '15px', color: 'var(--silver)', lineHeight: 1.7, margin: 0 }}>{p}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* What We Build */}
        <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,80px)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <ScrollReveal>
              <p className="sec-label">What We Build</p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4vw,48px)', color: '#fff', marginBottom: 'clamp(36px,5vw,56px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                Everything a {ind.name} Needs<br />to Win Online
              </h2>
            </ScrollReveal>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
              {ind.whatWeBuild.map((item, i) => (
                <ScrollReveal key={i} delay={i * 60}>
                  <div style={{ background: 'var(--bg)', padding: 'clamp(24px,3vw,36px) clamp(24px,4vw,40px)', display: 'grid', gridTemplateColumns: '220px 1fr', gap: '32px', alignItems: 'start' }}>
                    <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(15px,1.8vw,18px)', color: ind.color, lineHeight: 1.25, letterSpacing: '-0.01em' }}>{item.title}</div>
                    <p style={{ fontSize: '15px', color: 'var(--chrome)', lineHeight: 1.75, margin: 0 }}>{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: 'clamp(100px,12vw,160px) clamp(20px,6vw,80px)', textAlign: 'center' }}>
          <ScrollReveal>
            <p className="sec-label" style={{ justifyContent: 'center' }}>Zero Upfront. Zero Risk.</p>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(32px,5vw,60px)', color: '#fff', marginBottom: '20px', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
              We Build It First.<br />You Pay When You Love It.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={140}>
            <p style={{ color: 'var(--chrome)', fontSize: 'clamp(16px,1.8vw,19px)', maxWidth: '460px', margin: '0 auto 44px', lineHeight: 1.7 }}>
              Tell us about your {ind.name.toLowerCase()} and we&apos;ll have a real mockup ready in 48 hours. No commitment required to see it.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn-chrome" style={{ textDecoration: 'none' }}>Start a Free Project</Link>
              <Link href="/industries" className="btn-line" style={{ textDecoration: 'none' }}>See All Industries</Link>
            </div>
          </ScrollReveal>
        </section>

      </main>
      <Footer />
    </>
  );
}
