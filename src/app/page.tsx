import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Process from '@/components/Process';
import Pricing from '@/components/Pricing';
import Work from '@/components/Work';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import { HeroScene, ChatWidget, FloatingElements, MuscleCar } from '@/components/ClientOnlyComponents';
import SocialProof from '@/components/SocialProof';

export default function Home() {
  return (
    <main style={{ position: 'relative' }}>
      <Nav />
      <Hero>
        <HeroScene />
        <MuscleCar />
      </Hero>

      {/* Founder quote callout */}
      <div style={{
        background: 'var(--bg2)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: 'clamp(32px, 4vw, 48px) clamp(20px, 6vw, 60px)',
        textAlign: 'center',
      }}>
        <blockquote style={{
          maxWidth: '760px',
          margin: '0 auto',
          fontFamily: "'Syne', sans-serif",
          fontSize: 'clamp(20px, 2.8vw, 28px)',
          fontWeight: 700,
          lineHeight: 1.3,
          letterSpacing: '-0.02em',
          color: 'var(--silver)',
          position: 'relative',
        }}>
          <span style={{ color: 'var(--navy)', fontSize: '1.4em', lineHeight: 0, verticalAlign: '-0.2em', marginRight: '6px' }}>&ldquo;</span>
          Local businesses deserve the same tools big brands take for granted — without the agency price tag.
          <span style={{ color: 'var(--navy)', fontSize: '1.4em', lineHeight: 0, verticalAlign: '-0.2em', marginLeft: '6px' }}>&rdquo;</span>
          <footer style={{
            display: 'block',
            marginTop: '16px',
            fontFamily: "'Space Mono', monospace",
            fontSize: '11px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--dim)',
            fontWeight: 400,
          }}>
            — Darrin Singer, Founder · Caliber Web Studio
          </footer>
        </blockquote>
      </div>

      <SocialProof />
      <Services />
      <Process />
      <Pricing />
      <Work />
      <FAQ />
      <CTA />
      <Footer />
      <ChatWidget />
      <FloatingElements />
    </main>
  );
}
