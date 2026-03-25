'use client';
import dynamic from 'next/dynamic';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Pricing from '@/components/Pricing';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

// Three.js scenes — client-side only (no SSR)
const HeroScene = dynamic(() => import('@/components/HeroScene'), { ssr: false });
const ChatWidget = dynamic(() => import('@/components/ChatWidget'), { ssr: false });

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <HeroScene />
      <Services />
      <Pricing />
      <CTA />
      <Footer />
      <ChatWidget />
    </main>
  );
}
