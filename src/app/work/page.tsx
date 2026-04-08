import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: { absolute: 'Sample Builds | Caliber Web Studio' },
  description: 'Live demo sites built for Detroit businesses — barbershops, plumbers, salons, and restaurants. Click through and see exactly what we build.',
  alternates: { canonical: 'https://caliberwebstudio.com/work' },
  openGraph: {
    title: 'Sample Builds | Caliber Web Studio',
    description: 'Live demo sites built for Detroit businesses — barbershops, plumbers, salons, and restaurants. Click through and see exactly what we build.',
    url: 'https://caliberwebstudio.com/work',
    type: 'website',
    images: [{ url: '/logo-full-hero.png', alt: 'Caliber Web Studio Sample Builds', width: 1200, height: 630 }],
  },
};

const projects = [
  {
    slug: 'detroit-cuts',
    image: 'https://images.pexels.com/photos/7447148/pexels-photo-7447148.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    category: 'Barbershop',
    title: 'Detroit Cuts',
    headline: 'Online Booking, Gallery, and AI Chat — Live',
    desc: 'This demo shows everything a barbershop needs online: a mobile-first site with service menu, photo gallery, online booking, Google Maps integration, and an AI chatbot that handles after-hours inquiries. This is exactly what we\'d build for your shop.',
    built: ['Online booking system', 'Service menu with pricing', 'Photo gallery', 'Google Maps embed', 'AI chat for after-hours inquiries', 'Mobile-first design'],
    accent: 'var(--navy, #1E3D8F)',
  },
  {
    slug: 'metro-plumbing',
    image: '/images/metro-plumbing-hero.png',
    category: 'Plumbing',
    title: 'Metro Plumbing',
    headline: 'Emergency-Ready Lead Capture — Click Through',
    desc: 'Built for the moment people need a plumber most. Emergency call CTA above the fold, service area pages built for local SEO, a lead capture form that routes to the on-call team instantly, and trust signals that convert first-time visitors.',
    built: ['Emergency call CTA (above fold)', 'Service area landing pages', 'SEO-optimized structure', 'Lead capture form', 'Google Business Profile integration', 'Trust signals and reviews section'],
    accent: 'var(--chrome, #A8B8C8)',
  },
  {
    slug: 'luxe-salon',
    image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&auto=format&fit=crop',
    category: 'Beauty and Salon',
    title: 'Luxe Salon',
    headline: 'Gallery-First Booking Site — Fully Functional',
    desc: 'A visually striking demo showing exactly what we build for natural hair salons: gallery-first design, online booking with stylist selection, natural hair SEO structure, Instagram feed integration, and a full service menu with pricing.',
    built: ['Gallery-first design', 'Online booking with stylist selection', 'Staff and specialty showcase', 'Natural hair SEO structure', 'Instagram feed embed', 'Service menu with pricing'],
    accent: 'var(--navy, #1E3D8F)',
  },
  {
    slug: 'detroits-kitchen',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop',
    category: 'Restaurant',
    title: "Detroit's Kitchen",
    headline: 'Online Menu, Catering Form, and AI Chatbot',
    desc: 'A full restaurant demo with online menu, catering inquiry form with structured intake, AI chatbot for FAQs, private events page, and Google Maps integration. Everything a restaurant needs to capture dine-in, takeout, and catering revenue.',
    built: ['Online menu (easy to update)', 'Catering inquiry form', 'AI chatbot for FAQs', 'Events and private dining page', 'Google Maps integration', 'Local SEO structure'],
    accent: 'var(--chrome, #A8B8C8)',
  },
];

export default function WorkPage() {
  return (
    <>
      <Nav />
      <main style={{ background: 'var(--bg, #141414)', color: 'var(--silver, #D0D8E0)', minHeight: '100vh' }}>

        <section style={{ padding: 'clamp(80px,12vw,140px) clamp(20px,6vw,80px) clamp(60px,8vw,100px)', textAlign: 'center', borderBottom: '1px solid var(--border, rgba(168,184,200,0.12))' }}>
          <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '24px' }}>Live Demo Sites</p>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(36px,6vw,72px)', lineHeight: 1.05, color: '#fff', marginBottom: '24px' }}>See What We Build.</h1>
          <p style={{ fontSize: 'clamp(16px,2vw,20px)', color: 'var(--chrome, #A8B8C8)', maxWidth: '560px', margin: '0 auto' }}>Four live, working websites — each one built to show exactly what we deliver. Pick your industry and click through.</p>
        </section>

        <section style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(60px,8vw,120px) clamp(20px,6vw,80px)' }}>
          {projects.map((project, i) => (
            <div key={project.slug} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', marginBottom: i < projects.length - 1 ? 'clamp(80px,10vw,140px)' : 0, alignItems: 'center', direction: i % 2 === 0 ? 'ltr' : 'rtl' }}>

              <div style={{ background: 'var(--bg2, #1a1a1a)', border: '1px solid var(--border, rgba(168,184,200,0.12))', borderRadius: '8px', aspectRatio: '16/10', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', direction: 'ltr' }}>
                {project.image && <Image src={project.image} alt={project.title + ' demo preview'} fill style={{ objectFit: 'cover', opacity: 0.7, borderRadius: '8px' }} sizes="(max-width: 768px) 100vw, 50vw" />}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(30,61,143,0.15) 0%, transparent 60%)' }} />
                <div style={{ textAlign: 'center', zIndex: 1, position: 'relative' }}>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(20px,3vw,32px)', color: '#fff', marginBottom: '8px' }}>{project.title}</div>
                  <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '24px' }}>{project.category}</div>
                  <Link href={`/demo/${project.slug}`} style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--navy, #1E3D8F)', textDecoration: 'none', borderBottom: '1px solid var(--navy, #1E3D8F)', paddingBottom: '2px' }}>View Live Demo</Link>
                </div>
              </div>

              <div style={{ direction: 'ltr' }}>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', background: 'rgba(168,184,200,0.1)', padding: '4px 12px', borderRadius: '3px' }}>{project.category}</span>
                <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(24px,3vw,40px)', color: '#fff', margin: '16px 0 8px' }}>{project.title}</h2>
                <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(16px,2vw,22px)', color: project.accent, marginBottom: '20px', lineHeight: 1.3 }}>{project.headline}</p>
                <p style={{ color: 'var(--chrome, #A8B8C8)', fontSize: '15px', lineHeight: 1.8, marginBottom: '28px' }}>{project.desc}</p>
                <div>
                  <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '14px' }}>What&apos;s Built Into This Demo</p>
                  {project.built.map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <span style={{ color: project.accent, fontSize: '14px', fontWeight: 700 }}>&#10003;</span>
                      <span style={{ fontSize: '14px', color: 'var(--silver, #D0D8E0)' }}>{item}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '32px' }}>
                  <Link href={`/demo/${project.slug}`} style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#fff', background: 'var(--navy, #1E3D8F)', padding: '12px 28px', textDecoration: 'none', display: 'inline-block' }}>
                    View Live Demo →
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </section>

        <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,80px)', textAlign: 'center', borderTop: '1px solid var(--border, rgba(168,184,200,0.12))' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4vw,48px)', color: '#fff', marginBottom: '24px' }}>Your Business Could Look Like This in 48 Hours.</h2>
          <p style={{ color: 'var(--chrome, #A8B8C8)', fontSize: '18px', maxWidth: '480px', margin: '0 auto 40px' }}>We build with the same system used in every demo above. Start with a free mockup — no commitment.</p>
          <Link href="/#contact" style={{ display: 'inline-block', background: 'var(--navy, #1E3D8F)', color: '#fff', fontFamily: 'Space Mono, monospace', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', padding: '18px 40px', textDecoration: 'none' }}>Get a Free Mockup</Link>
        </section>

      </main>
      <Footer />
    </>
  );
}
