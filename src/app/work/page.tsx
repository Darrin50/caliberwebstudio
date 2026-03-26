import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Our Work | Caliber Web Studio – Real Sites for Real Detroit Businesses',
  description: 'See what Caliber Web Studio builds — live demo sites for barbershops, plumbers, salons, and restaurants. AI-powered, fast, and built to convert.',
  alternates: { canonical: 'https://caliberwebstudio.com/work' },
};

const projects = [
  {
    slug: 'detroit-cuts',
    category: 'Barbershop',
    title: 'Detroit Cuts',
    headline: 'The modern barbershop digital experience',
    description: 'A premium barbershop site built with online booking, a full services and pricing grid, photo gallery, and an AI chatbot that handles appointment questions 24/7. Schema markup configured for "barber near me" searches across Detroit.',
    built: ['Mobile-first website with booking integration', 'AI chatbot for appointment booking', 'Services + pricing grid', 'Photo gallery section', 'Google Business Profile optimization', 'Schema markup for local search'],
    accent: 'var(--navy, #1E3D8F)',
  },
  {
    slug: 'metro-plumbing',
    category: 'Plumbing',
    title: 'Metro Plumbing',
    headline: 'Emergency-first plumbing site built to convert',
    description: 'High-urgency plumbing site with a prominent emergency CTA banner, service area coverage map, license and insurance trust badges, and an AI chatbot that qualifies leads and captures job details when owners are on the job.',
    built: ['Emergency CTA banner above the fold', 'Service area map with Detroit coverage zones', 'License & insurance trust badges', 'AI chatbot for lead capture', 'Review engine integration', 'Click-to-call on every page section'],
    accent: 'var(--chrome, #A8B8C8)',
  },
  {
    slug: 'luxe-salon',
    category: 'Beauty & Salon',
    title: 'Luxe Salon',
    headline: 'Elevated salon presence that books while you work',
    description: "A high-end salon site with a visual services menu, before/after gallery, stylist profiles, and integrated booking. The AI chatbot answers questions at 2am so your team doesn't have to.",
    built: ['Visual services menu with pricing', 'Before/after photo gallery', 'Stylist profile section', 'Online booking integration', 'AI chatbot trained on services and FAQ', 'Review showcase section'],
    accent: 'var(--navy, #1E3D8F)',
  },
  {
    slug: 'detroits-kitchen',
    category: 'Restaurant',
    title: "Detroit's Kitchen",
    headline: 'Restaurant site that drives reservations and foot traffic',
    description: "A full restaurant presence featuring menu highlights, hours, location map, online ordering CTA, and a photo-forward gallery. Built for searches like \"best Detroit soul food\" with local schema markup and GBP integration.",
    built: ['Menu highlights section with photos', 'Hours, location, and Google Maps embed', 'Online ordering CTA integration', 'Photo-forward hero and gallery', 'Local SEO schema for restaurant', 'Google Business Profile management setup'],
    accent: 'var(--chrome, #A8B8C8)',
  },
];

export default function WorkPage() {
  return (
    <>
      <Nav />
      <main style={{ minHeight: '100vh', paddingTop: '72px', background: 'var(--bg, #141414)' }}>
        <section style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(80px, 12vw, 160px) clamp(20px, 6vw, 80px) clamp(60px, 8vw, 100px)', borderBottom: '1px solid var(--border, rgba(255,255,255,0.08))' }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '24px' }}>Case Studies</div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(40px, 7vw, 88px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--silver, #D0D8E0)', marginBottom: '28px', maxWidth: '900px' }}>
            Real Sites.{' '}
            <span style={{ background: 'linear-gradient(135deg, var(--navy, #1E3D8F), var(--chrome, #A8B8C8))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Real Results.</span>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(16px, 2vw, 20px)', lineHeight: 1.7, color: 'var(--dim, rgba(255,255,255,0.5))', maxWidth: '620px', marginBottom: '48px' }}>
            Every site below was built from scratch — custom copy, AI chatbot configured, local SEO dialed in. This is what we build for your business. Click any card to see the live demo.
          </p>
          <Link href="/#contact" style={{ fontFamily: "'Space Mono', monospace", fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--bg, #141414)', background: 'var(--chrome, #A8B8C8)', padding: '14px 32px', textDecoration: 'none', fontWeight: 700, display: 'inline-block' }}>Get One Built for Your Business →</Link>
        </section>

        <section style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(60px, 10vw, 120px) clamp(20px, 6vw, 80px)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {projects.map((project, index) => (
              <div key={project.slug} style={{ display: 'grid', gridTemplateColumns: index % 2 === 0 ? '1fr 1.2fr' : '1.2fr 1fr', background: 'var(--bg2, rgba(255,255,255,0.03))', border: '1px solid var(--border, rgba(255,255,255,0.08))', borderRadius: '2px', overflow: 'hidden', transition: 'border-color 0.3s ease', minHeight: '320px' }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = project.accent; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border, rgba(255,255,255,0.08))'; }}>
                <div style={{ padding: 'clamp(32px, 4vw, 56px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', order: index % 2 === 0 ? 0 : 1 }}>
                  <div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: project.accent, padding: '4px 10px', border: `1px solid ${project.accent}`, borderRadius: '2px' }}>{project.category}</span>
                    </div>
                    <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 800, color: 'var(--silver, #D0D8E0)', marginBottom: '10px', lineHeight: 1.2, letterSpacing: '-0.01em' }}>{project.title}</h2>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '15px', fontWeight: 600, color: project.accent, marginBottom: '18px', lineHeight: 1.4 }}>{project.headline}</div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', lineHeight: 1.7, color: 'var(--dim, rgba(255,255,255,0.5))', marginBottom: '24px', maxWidth: '480px' }}>{project.description}</p>
                  </div>
                  <div>
                    <a href={`https://caliberwebstudio.com/demo/${project.slug}`} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--silver, #D0D8E0)', textDecoration: 'none', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 20px', border: '1px solid var(--border, rgba(255,255,255,0.12))', borderRadius: '2px', transition: 'border-color 0.2s' }}>View Live Demo →</a>
                  </div>
                </div>
                <div style={{ background: 'rgba(30,61,143,0.04)', borderLeft: index % 2 === 0 ? '1px solid var(--border, rgba(255,255,255,0.08))' : 'none', borderRight: index % 2 !== 0 ? '1px solid var(--border, rgba(255,255,255,0.08))' : 'none', padding: 'clamp(32px, 4vw, 56px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', order: index % 2 === 0 ? 1 : 0 }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--dim, rgba(255,255,255,0.35))', marginBottom: '20px' }}>What Was Built</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {project.built.map((item) => (
                      <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontFamily: "'Inter', sans-serif", fontSize: '14px', lineHeight: 1.5, color: 'var(--dim, rgba(255,255,255,0.55))', paddingBottom: '12px', borderBottom: '1px solid var(--border, rgba(255,255,255,0.05))' }}>
                        <span style={{ color: project.accent, fontWeight: 700, flexShrink: 0, marginTop: '1px' }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ borderTop: '1px solid var(--border, rgba(255,255,255,0.08))', background: 'rgba(30,61,143,0.04)', padding: 'clamp(60px, 8vw, 100px) clamp(20px, 6vw, 80px)' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2px' }}>
              {[
                { label: 'Every Site Includes', items: ['AI chatbot', 'Local SEO setup', 'GBP optimization', 'Schema markup', 'Mobile-first design', 'Hosting & SSL'] },
                { label: 'Delivered In', items: ['48-hour mockup build', '24-hour launch after approval', '$0 down to get started', '14-day risk-free preview', 'No design or tech skills needed from you'] },
                { label: 'Built For', items: ['Barbershops & salons', 'Plumbers & HVAC', 'Restaurants & food', 'Contractors & trades', 'Any Detroit local business'] },
              ].map((col) => (
                <div key={col.label} style={{ background: 'var(--bg2, rgba(255,255,255,0.03))', border: '1px solid var(--border, rgba(255,255,255,0.08))', padding: '36px', borderRadius: '2px' }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '20px' }}>{col.label}</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {col.items.map((item) => (
                      <li key={item} style={{ display: 'flex', gap: '10px', fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'var(--dim, rgba(255,255,255,0.55))', lineHeight: 1.4 }}>
                        <span style={{ color: 'var(--navy, #1E3D8F)', fontWeight: 700, flexShrink: 0 }}>→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ borderTop: '1px solid var(--border, rgba(255,255,255,0.08))', padding: 'clamp(60px, 10vw, 120px) clamp(20px, 6vw, 80px)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '20px' }}>Your Business Is Next</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--silver, #D0D8E0)', marginBottom: '24px' }}>We'll Build Yours in 48 Hours</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(15px, 2vw, 18px)', lineHeight: 1.7, color: 'var(--dim, rgba(255,255,255,0.5))', marginBottom: '40px', maxWidth: '520px', margin: '0 auto 40px' }}>Tell us about your business. We'll build a free custom mockup and send you the link. $0 down. No commitment until you see it and love it.</p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/#contact" style={{ fontFamily: "'Space Mono', monospace", fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--bg, #141414)', background: 'var(--chrome, #A8B8C8)', padding: '14px 32px', textDecoration: 'none', fontWeight: 700, display: 'inline-block' }}>Get My Free Mockup →</Link>
              <Link href="/process" style={{ fontFamily: "'Space Mono', monospace", fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', padding: '14px 32px', textDecoration: 'none', fontWeight: 700, display: 'inline-block', border: '1px solid var(--border, rgba(255,255,255,0.08))' }}>How It Works</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
