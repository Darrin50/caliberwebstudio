import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Process from '@/components/Process';
import Pricing from '@/components/Pricing';
import Work from '@/components/Work';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import { HeroScene, ChatWidget, FloatingElements } from '@/components/ClientOnlyComponents';
import SocialProof from '@/components/SocialProof';

export default function Home() {
  return (
    <main style={{ position: 'relative' }}>
      <Nav />
      <Hero>
        <HeroScene />
      </Hero>
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
