import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: { absolute: 'Our Work | Caliber Web Studio' },
  description: "Real websites built for real Detroit businesses. See case studies for Detroit Cuts, Metro Plumbing, Luxe Salon, and Detroit's Kitchen.",
  alternates: { canonical: 'https://caliberwebstudio.com/work' },
};

const projects = [
  {
    slug: 'detroit-cuts',
    image: 'https://images.pexels.com/photos/7447148/pexels-photo-7447148.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    category: 'Barbershop',
    title: 'Detroit Cuts',
    headline: 'From Zero Online Presence to Fully Booked',
    desc: 'Detroit Cuts had no website and relied entirely on word-of-mouth. We built them a fast, modern site with online booking, Google Maps integration, and a gallery that shows off the craft. Within 30 days they were booking 40% of appointments online.',
    built: ['Online booking system', 'Service menu with pricing', 'Photo gallery', 'Google Maps embed', 'AI chat for after-hours inquiries', 'Mobile-first design'],
    accent: 'var(--navy, #1E3D8F)',
  },
  {
    slug: 'metro-plumbing',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&auto=format&fit=crop',
    category: 'Plumbing',
    title: 'Metro Plumbing',
    headline: 'Emergency Calls Up 60% in 90 Days',
    desc: 'Metro Plumbing needed to rank for emergency plumbing searches in Metro Detroit. We built a fast, SEO-optimized site with service area pages, emergency call buttons, and a lead capture form that routes to their on-call team instantly.',
    built: ['Emergency call CTA (above fold)', 'Service area landing pages', 'SEO-optimized structure', 'Lead capture form', 'Google Business Profile integration', 'Trust signals and reviews section'],
    accent: 'var(--chrome, #A8B8C8)',
  },
  {
    slug: 'luxe-salon',
    image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&auto=format&fit=crop',
    category: 'Beauty and Salon',
    title: 'Luxe Salon',
    headline: 'A Brand as Polished as Their Work',
    desc: 'Luxe Salon wanted a site that matched the premium experience they deliver in person. We created a visually striking, editorial-style site with online booking, a staff showcase, and a product store that generates passive revenue between appointments.',
    built: ['Editorial-style design', 'Online booking integration', 'Staff and specialty showcase', 'Product storefront', 'Instagram feed embed', 'Gift card sales page'],
    accent: 'var(--navy, #1E3D8F)',
  },
  {
    slug: 'detroits-kitchen',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop',
    category: 'Restaurant',
    title: "Detroit's Kitchen",
    headline: 'More Reservations, Less Phone Tag',
    desc: "Detroit's Kitchen was turning away customers because their reservation system was entirely phone-based. We built a full restaurant site with online reservations, a dynamic menu, catering inquiry forms, and an events calendar — cutting phone calls by half.",
    built: ['Online reservation system', 'Dynamic menu (easy to update)', 'Catering inquiry form', 'Events and private dining calendar', 'Order online integration', 'Local SEO optimization'],
    accent: 'var(--chrome, #A8B8C8)',
  },
];

export default function WorkPage() {
  return (
    <>
      <Nav />
      <main style={{ background: 'var(--bg, #141414)', color: 'var(--silver, #D0D8E0)', minHeight: '100vh' }}>

        <section style={{ padding: 'clamp(80px,12vw,140px) clamp(20px,6vw,80px) clamp(60px,8vw,100px)', textAlign: 'center', borderBottom: '1px solid var(--border, rgba(168,184,200,0.12))' }}>
          <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '24px' }}>Portfolio</p>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(36px,6vw,72px)', lineHeight: 1.05, color: '#fff', marginBottom: '24px' }}>Real Sites.<br />Real Results.</h1>
          <p style={{ fontSize: 'clamp(16px,2vw,20px)', color: 'var(--chrome, #A8B8C8)', maxWidth: '520px', margin: '0 auto' }}>Every site we build is custom. Every client is a Detroit business owner who needed more than a template.</p>
        </section>

        <section style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(60px,8vw,120px) clamp(20px,6vw,80px)' }}>
          {projects.map((project, i) => (
            <div key={project.slug} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', marginBottom: i < projects.length - 1 ? 'clamp(80px,10vw,140px)' : 0, alignItems: 'center', direction: i % 2 === 0 ? 'ltr' : 'rtl' }}>

              <div style={{ background: 'var(--bg2, #1a1a1a)', border: '1px solid var(--border, rgba(168,184,200,0.12))', borderRadius: '8px', aspectRatio: '16/10', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', direction: 'ltr' }}>
                {project.image && <img src={project.image} alt={project.title + ' preview'} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7, borderRadius: '8px' }} />}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(30,61,143,0.15) 0%, transparent 60%)' }} />
                <div style={{ textAlign: 'center', zIndex: 1, position: 'relative' }}>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(20px,3vw,32px)', color: '#fff', marginBottom: '8px' }}>{project.title}</div>
                  <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '24px' }}>{project.category}</div>
                  <Link href={`https://caliberwebstudio.com/demo/${project.slug}`} style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--navy, #1E3D8F)', textDecoration: 'none', borderBottom: '1px solid var(--navy, #1E3D8F)', paddingBottom: '2px' }}>View Live Demo</Link>
                </div>
              </div>

              <div style={{ direction: 'ltr' }}>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', background: 'rgba(168,184,200,0.1)', padding: '4px 12px', borderRadius: '3px' }}>{project.category}</span>
                <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(24px,3vw,40px)', color: '#fff', margin: '16px 0 8px' }}>{project.title}</h2>
                <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(16px,2vw,22px)', color: project.accent, marginBottom: '20px', lineHeight: 1.3 }}>{project.headline}</p>
                <p style={{ color: 'var(--chrome, #A8B8C8)', fontSize: '15px', lineHeight: 1.8, marginBottom: '28px' }}>{project.desc}</p>
                <div>
                  <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '14px' }}>What Was Built</p>
                  {project.built.map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <span style={{ color: project.accent, fontSize: '14px', fontWeight: 700 }}>&#10003;</span>
                      <span style={{ fontSize: '14px', color: 'var(--silver, #D0D8E0)' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </section>

        <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,80px)', textAlign: 'center', borderTop: '1px solid var(--border, rgba(168,184,200,0.12))' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4vw,48px)', color: '#fff', marginBottom: '24px' }}>Want Results Like These?</h2>
          <p style={{ color: 'var(--chrome, #A8B8C8)', fontSize: '18px', maxWidth: '480px', margin: '0 auto 40px' }}>Start with a free mockup of your business. Zero cost, zero commitment.</p>
          <Link href="/#contact" style={{ display: 'inline-block', background: 'var(--navy, #1E3D8F)', color: '#fff', fontFamily: 'Space Mono, monospace', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', padding: '18px 40px', textDecoration: 'none' }}>Start a Free Project</Link>
        </section>

      </main>
      <Footer />
    </>
  );
}
