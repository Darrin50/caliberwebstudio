import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { cities } from './cities';

export const metadata: Metadata = {
  title: { absolute: 'Service Areas | Caliber Web Studio — Metro Detroit Web Design' },
  description: 'Caliber Web Studio builds websites and growth systems for businesses across Metro Detroit. See all cities we serve in Southeast Michigan.',
  alternates: { canonical: 'https://caliberwebstudio.com/areas' },
  openGraph: {
    title: 'Metro Detroit Service Areas | Caliber Web Studio',
    description: 'Professional web design, local SEO, and AI-powered growth systems for businesses across Metro Detroit. See all cities we serve.',
    url: 'https://caliberwebstudio.com/areas',
    type: 'website',
  },
};

const areasSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Service Areas — Metro Detroit Web Design | Caliber Web Studio',
  description: 'Caliber Web Studio serves businesses across Metro Detroit with professional web design, local SEO, and AI-powered growth systems.',
  url: 'https://caliberwebstudio.com/areas',
  provider: {
    '@type': 'ProfessionalService',
    name: 'Caliber Web Studio',
    url: 'https://caliberwebstudio.com',
    telephone: '+13137992315',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Detroit',
      addressRegion: 'MI',
      addressCountry: 'US',
    },
    areaServed: cities.map((c) => ({
      '@type': 'City',
      name: c.name,
      containedInPlace: { '@type': 'State', name: 'Michigan' },
    })),
  },
};

export default function AreasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(areasSchema) }}
      />
      <Nav />
      <main style={{ background: 'var(--bg, #0e0e0e)', color: 'var(--silver, #D0D8E0)', minHeight: '100vh' }}>

        {/* ── Hero ── */}
        <section style={{ padding: 'clamp(120px,16vw,180px) clamp(20px,6vw,80px) clamp(80px,10vw,120px)', textAlign: 'center', borderBottom: '1px solid var(--border, rgba(168,184,200,0.12))', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(30,61,143,0.22) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to bottom, transparent, rgba(14,14,14,0.4))', pointerEvents: 'none' }} />
          <p className="fu" style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '24px', position: 'relative' }}>
            Southeast Michigan
          </p>
          <h1 className="fu" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(36px,6vw,80px)', lineHeight: 1.0, color: '#fff', marginBottom: '32px', position: 'relative' }}>
            Built for Metro Detroit.<br />
            <span style={{ background: 'linear-gradient(135deg, #1E3D8F, #A8B8C8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Every City.
            </span>
          </h1>
          <p className="fu" style={{ fontSize: 'clamp(16px,1.8vw,20px)', color: 'var(--chrome, #A8B8C8)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.65, position: 'relative' }}>
            Caliber Web Studio builds websites and digital growth systems for local businesses across Metro Detroit. From Detroit proper to the far suburbs — we know this market, and we engineer sites that rank in it.
          </p>
        </section>

        {/* ── Stats ── */}
        <section style={{ borderBottom: '1px solid var(--border, rgba(168,184,200,0.12))' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1px', background: 'var(--border, rgba(168,184,200,0.12))' }}>
            {[
              { value: `${cities.length}`, label: 'Cities Served' },
              { value: '$197', label: 'Starting Monthly Price' },
              { value: '$0', label: 'Down to Start' },
              { value: '48hr', label: 'Free Mockup Turnaround' },
            ].map((stat) => (
              <div key={stat.label} style={{ background: 'var(--bg, #0e0e0e)', padding: '40px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(40px,5vw,64px)', color: 'var(--navy, #1E3D8F)', lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── City Grid ── */}
        <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,80px)', borderBottom: '1px solid var(--border, rgba(168,184,200,0.12))' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <p className="fu" style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '16px' }}>
              Where We Work
            </p>
            <h2 className="fu" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(26px,3.5vw,44px)', color: '#fff', marginBottom: '16px', lineHeight: 1.1 }}>
              All Service Areas
            </h2>
            <p style={{ fontSize: 'clamp(15px,1.4vw,17px)', color: 'var(--chrome, #A8B8C8)', maxWidth: '540px', marginBottom: '56px', lineHeight: 1.7 }}>
              Select your city to see how we help businesses in your market get found, get clicks, and get customers.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/areas/${city.slug}`}
                  className="city-card"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg2, #141414)', border: '1px solid var(--border, rgba(168,184,200,0.12))', borderRadius: '10px', padding: '20px 24px', textDecoration: 'none', transition: 'border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease' }}
                >
                  <div>
                    <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '17px', color: 'var(--white, #F4F6F8)', marginBottom: '4px' }}>
                      {city.name}
                    </div>
                    <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--dim, rgba(208,216,224,0.45))' }}>
                      Michigan
                    </div>
                  </div>
                  <div style={{ color: 'var(--navy, #1E3D8F)', flexShrink: 0, marginLeft: '16px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Local Matters ── */}
        <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,80px)', borderBottom: '1px solid var(--border, rgba(168,184,200,0.12))' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <p className="fu" style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '16px' }}>
              Why It Matters
            </p>
            <h2 className="fu" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(26px,3.5vw,44px)', color: '#fff', marginBottom: '56px', lineHeight: 1.1 }}>
              Local SEO Isn't Optional Anymore
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1px', background: 'var(--border, rgba(168,184,200,0.12))' }}>
              {[
                {
                  stat: '97%',
                  label: 'of consumers search online for local businesses',
                  body: 'If you\'re not showing up in Google when someone searches for your service in your city, that customer is calling your competitor.',
                },
                {
                  stat: '46%',
                  label: 'of all Google searches have local intent',
                  body: 'Nearly half of every search is someone looking for something nearby. Local SEO is the highest-ROI investment a small business can make.',
                },
                {
                  stat: '88%',
                  label: 'of local mobile searches lead to a call or visit within 24 hours',
                  body: 'The customers searching for you right now are ready to buy. You just need to be visible when they look.',
                },
              ].map((item) => (
                <div key={item.stat} style={{ background: 'var(--bg, #0e0e0e)', padding: '48px 40px' }}>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(40px,5vw,64px)', color: 'var(--navy, #1E3D8F)', lineHeight: 1, marginBottom: '12px' }}>{item.stat}</div>
                  <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '20px', lineHeight: 1.6 }}>{item.label}</div>
                  <p style={{ fontSize: '14px', color: 'var(--dim, rgba(208,216,224,0.45))', lineHeight: 1.7 }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ padding: 'clamp(100px,12vw,160px) clamp(20px,6vw,80px)', textAlign: 'center' }}>
          <p className="fu" style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '24px' }}>
            Let's Build
          </p>
          <h2 className="fu" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(32px,5vw,64px)', color: '#fff', marginBottom: '24px', lineHeight: 1.05 }}>
            Ready to Dominate<br />Your Local Market?
          </h2>
          <p className="fu" style={{ color: 'var(--chrome, #A8B8C8)', fontSize: 'clamp(16px,1.8vw,20px)', maxWidth: '520px', margin: '0 auto 48px', lineHeight: 1.65 }}>
            We build your site first. You see it live. Then you decide. No risk, no pressure, no templates.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/contact"
              style={{ display: 'inline-block', background: 'var(--navy, #1E3D8F)', color: '#fff', fontFamily: 'Space Mono, monospace', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', padding: '18px 48px', textDecoration: 'none', fontWeight: 700 }}
            >
              Get a Free Mockup
            </Link>
            <Link
              href="/pricing"
              style={{ display: 'inline-block', background: 'transparent', color: 'var(--silver, #D0D8E0)', fontFamily: 'Space Mono, monospace', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', padding: '18px 48px', textDecoration: 'none', border: '1px solid var(--border, rgba(168,184,200,0.3))' }}
            >
              See Pricing
            </Link>
          </div>
        </section>

      </main>
      <Footer />

      <style>{`
        .city-card:hover {
          border-color: rgba(30,61,143,0.5);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(30,61,143,0.12);
        }
      `}</style>
    </>
  );
}
