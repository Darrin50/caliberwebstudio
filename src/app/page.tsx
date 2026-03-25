'use client';
import dynamic from 'next/dynamic';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Process from '@/components/Process';
import Pricing from '@/components/Pricing';
import Work from '@/components/Work';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

// Three.js scenes — client-side only (no SSR)
const HeroScene = dynamic(() => import('@/components/HeroScene'), { ssr: false });
const ChatWidget = dynamic(() => import('@/components/ChatWidget'), { ssr: false });

export default function Home() {
  return (
    <main>
      <Nav />
      <div style={{ position: 'relative' }}>
        <Hero />
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
          <HeroScene />
        </div>
      </div>
      <Services />
      <Process />
      <Pricing />
      <Work />
      <CTA />
      <Footer />
      <ChatWidget />
    </main>
  );
}
