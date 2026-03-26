'use client';
import dynamic from 'next/dynamic';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Process from '@/components/Process';
import Pricing from '@/components/Pricing';
import Work from '@/components/Work';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

// Client-side only components
const HeroScene = dynamic(() => import('@/components/HeroScene'), { ssr: false });
const ChatWidget = dynamic(() => import('@/components/ChatWidget'), { ssr: false });
const FloatingElements = dynamic(() => import('@/components/FloatingElements'), { ssr: false });

export default function Home() {
  return (
    <main style={{ position: 'relative' }}>
      <Nav />
      <Hero>
        <HeroScene />
      </Hero>
      <Services />
      <Process />
      <Pricing />
      <Work />
      <FAQ />
      <CTA />
      <Footer />
      <ChatWidget />
      {/* Draggable geometric shapes — scattered across the entire page */}
      <FloatingElements />
    </main>
  );
}
