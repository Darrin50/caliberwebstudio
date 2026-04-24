import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';
import IndustriesGrid from './IndustriesGrid';

export const metadata: Metadata = {
  title: { absolute: 'Industries We Serve | Caliber Web Studio — Detroit Local Business' },
  description: 'Caliber Web Studio builds AI-powered websites for barbershops, restaurants, plumbers, salons, contractors, and dentists in Detroit and Metro Detroit.',
  alternates: { canonical: 'https://www.caliberwebstudio.com/industries' },
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
            <IndustriesGrid />
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
