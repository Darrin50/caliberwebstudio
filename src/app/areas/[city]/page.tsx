import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { cities, getCityBySlug, type CityData } from '../cities';

export async function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const cityData = getCityBySlug(slug);
  if (!cityData) return {};

  const title = `${cityData.name} Web Design & Website Designer | Caliber Web Studio`;
  const description = `Professional website designer serving ${cityData.name}, MI businesses. Custom web design, local SEO, AI chatbots, and review automation. Free mockup — starting at $197/mo.`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `https://www.caliberwebstudio.com/areas/${slug}` },
    openGraph: {
      title,
      description,
      url: `https://www.caliberwebstudio.com/areas/${slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

const services = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    name: 'Custom Web Design',
    desc: 'Enterprise-grade websites built on Next.js — blazing fast, mobile-first, and designed to convert visitors into customers. Starting at $197/month.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
    name: 'Local SEO',
    desc: 'Rank for "[service] in [city]" searches across Metro Detroit. We build the technical SEO foundation that gets your business found by customers ready to buy.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    name: 'AI Chatbot',
    desc: '24/7 lead capture and customer support, custom-trained on your business, your services, and your FAQs. Never miss an inquiry again.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    name: 'Review Automation',
    desc: 'Build your Google reputation on autopilot. Automated review requests sent at the right moment — turning happy customers into five-star reviews.',
  },
];

function buildSchema(cityData: CityData) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: `${cityData.name} Web Design & Website Designer | Caliber Web Studio`,
        description: `Professional website designer serving ${cityData.name}, MI businesses. Custom web design, local SEO, AI chatbots, and review automation.`,
        url: `https://www.caliberwebstudio.com/areas/${cityData.slug}`,
        provider: {
          '@type': 'ProfessionalService',
          name: 'Caliber Web Studio',
          url: 'https://www.caliberwebstudio.com',
          telephone: '+13137992315',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Detroit',
            addressRegion: 'MI',
            addressCountry: 'US',
          },
          areaServed: {
            '@type': 'City',
            name: cityData.name,
            containedInPlace: {
              '@type': 'State',
              name: 'Michigan',
            },
          },
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.caliberwebstudio.com' },
          { '@type': 'ListItem', position: 2, name: 'Service Areas', item: 'https://www.caliberwebstudio.com/areas' },
          { '@type': 'ListItem', position: 3, name: `${cityData.name} Web Design`, item: `https://www.caliberwebstudio.com/areas/${cityData.slug}` },
        ],
      },
    ],
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: slug } = await params;
  const cityData = getCityBySlug(slug);
  if (!cityData) notFound();

  const nearbyData = cityData.nearby
    .map((s) => getCityBySlug(s))
    .filter((c): c is CityData => c !== undefined);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchema(cityData)) }}
      />
      <Nav />
      <main style={{ background: 'var(--bg, #0e0e0e)', color: 'var(--silver, #D0D8E0)', minHeight: '100vh' }}>

        {/* ── Hero ── */}
        <section style={{ padding: 'clamp(120px,16vw,180px) clamp(20px,6vw,80px) clamp(80px,10vw,120px)', textAlign: 'center', borderBottom: '1px solid var(--border, rgba(168,184,200,0.12))', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(30,61,143,0.22) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to bottom, transparent, rgba(14,14,14,0.4))', pointerEvents: 'none' }} />

          <p className="fu" style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '24px', position: 'relative' }}>
            Metro Detroit · {cityData.name}, MI
          </p>
          <h1 className="fu" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(32px,5.5vw,72px)', lineHeight: 1.05, color: '#fff', marginBottom: '28px', position: 'relative' }}>
            Web Design &amp; Digital Growth<br />
            for{' '}
            <span style={{ background: 'linear-gradient(135deg, #1E3D8F, #A8B8C8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {cityData.name} Businesses
            </span>
          </h1>
          <p className="fu" style={{ fontSize: 'clamp(16px,1.8vw,20px)', color: 'var(--chrome, #A8B8C8)', maxWidth: '600px', margin: '0 auto 40px', lineHeight: 1.65, position: 'relative' }}>
            Professional websites, local SEO, AI chatbots, and review automation — built for businesses competing in the {cityData.name} market. Starting at $197/month with zero money down.
          </p>
          <div className="fu" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
            <Link
              href={`/contact?city=${encodeURIComponent(cityData.name)}`}
              style={{ display: 'inline-block', background: 'var(--navy, #1E3D8F)', color: '#fff', fontFamily: 'Space Mono, monospace', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', padding: '16px 40px', textDecoration: 'none', fontWeight: 700 }}
            >
              Get a Free Mockup
            </Link>
            <Link
              href="/pricing"
              style={{ display: 'inline-block', background: 'transparent', color: 'var(--silver, #D0D8E0)', fontFamily: 'Space Mono, monospace', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', padding: '16px 40px', textDecoration: 'none', border: '1px solid var(--border, rgba(168,184,200,0.3))' }}
            >
              See Pricing
            </Link>
          </div>
        </section>

        {/* ── Body Copy ── */}
        <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,80px)', borderBottom: '1px solid var(--border, rgba(168,184,200,0.12))' }}>
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <p className="fu" style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '24px' }}>
              Serving {cityData.name}
            </p>
            <h2 className="fu" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(26px,3.5vw,44px)', color: '#fff', marginBottom: '40px', lineHeight: 1.1 }}>
              The {cityData.name} Market Deserves Better
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {cityData.paragraphs.map((para, i) => (
                <p key={i} style={{ fontSize: 'clamp(16px,1.6vw,19px)', color: 'var(--silver, #D0D8E0)', lineHeight: 1.8 }}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* ── Services ── */}
        <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,80px)', borderBottom: '1px solid var(--border, rgba(168,184,200,0.12))' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <p className="fu" style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '16px' }}>
              What We Build
            </p>
            <h2 className="fu" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(26px,3.5vw,44px)', color: '#fff', marginBottom: '56px', lineHeight: 1.1 }}>
              Growth Systems for {cityData.name} Businesses
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {services.map((svc) => (
                <div
                  key={svc.name}
                  className="area-card"
                  style={{ background: 'var(--bg2, #141414)', border: '1px solid var(--border, rgba(168,184,200,0.12))', borderRadius: '12px', padding: '36px 32px' }}
                >
                  <div style={{ width: '44px', height: '44px', background: 'rgba(30,61,143,0.15)', border: '1px solid rgba(30,61,143,0.3)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--navy, #1E3D8F)', marginBottom: '20px' }}>
                    {svc.icon}
                  </div>
                  <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '18px', color: 'var(--white, #F4F6F8)', marginBottom: '12px' }}>{svc.name}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--chrome, #A8B8C8)', lineHeight: 1.7 }}>{svc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Local SEO Stats ── */}
        <section style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,6vw,80px)', borderBottom: '1px solid var(--border, rgba(168,184,200,0.12))', background: 'rgba(30,61,143,0.06)' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
            <p className="fu" style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '16px' }}>
              The Opportunity in {cityData.name}
            </p>
            <h2 className="fu" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(26px,3.5vw,44px)', color: '#fff', marginBottom: '16px', lineHeight: 1.1 }}>
              Most of Your Competition<br />Is Invisible Online
            </h2>
            <p className="fu" style={{ fontSize: 'clamp(16px,1.5vw,18px)', color: 'var(--chrome, #A8B8C8)', maxWidth: '540px', margin: '0 auto 64px', lineHeight: 1.65 }}>
              That's your edge — if you act on it now.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2px', background: 'var(--border, rgba(168,184,200,0.12))' }}>
              <div style={{ background: 'var(--bg, #0e0e0e)', padding: '48px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(36px,5vw,60px)', color: 'var(--navy, #1E3D8F)', lineHeight: 1 }}>
                  {cityData.businessCount.toLocaleString()}+
                </div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', textAlign: 'center' }}>
                  {cityData.name} businesses without a professional website
                </div>
              </div>
              <div style={{ background: 'var(--bg, #0e0e0e)', padding: '48px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(36px,5vw,60px)', color: 'var(--navy, #1E3D8F)', lineHeight: 1 }}>
                  40%
                </div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', textAlign: 'center' }}>
                  of consumers won't buy from a poorly designed website
                </div>
              </div>
              <div style={{ background: 'var(--bg, #0e0e0e)', padding: '48px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(36px,5vw,60px)', color: 'var(--navy, #1E3D8F)', lineHeight: 1 }}>
                  $197
                </div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', textAlign: 'center' }}>
                  per month to start — $0 down
                </div>
              </div>
              <div style={{ background: 'var(--bg, #0e0e0e)', padding: '48px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(36px,5vw,60px)', color: 'var(--navy, #1E3D8F)', lineHeight: 1 }}>
                  5–7
                </div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', textAlign: 'center' }}>
                  days from mockup approval to live site
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ padding: 'clamp(100px,12vw,160px) clamp(20px,6vw,80px)', textAlign: 'center', borderBottom: '1px solid var(--border, rgba(168,184,200,0.12))' }}>
          <p className="fu" style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '24px' }}>
            Zero Risk. Free Mockup.
          </p>
          <h2 className="fu" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4.5vw,60px)', color: '#fff', marginBottom: '24px', lineHeight: 1.05 }}>
            Get a Free Website Mockup<br />
            <span style={{ background: 'linear-gradient(135deg, #1E3D8F, #A8B8C8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              for Your {cityData.name} Business
            </span>
          </h2>
          <p className="fu" style={{ color: 'var(--chrome, #A8B8C8)', fontSize: 'clamp(16px,1.8vw,20px)', maxWidth: '520px', margin: '0 auto 48px', lineHeight: 1.65 }}>
            We'll build your site first. You see it live. Then you decide. No risk, no pressure, no templates.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href={`/contact?city=${encodeURIComponent(cityData.name)}`}
              style={{ display: 'inline-block', background: 'var(--navy, #1E3D8F)', color: '#fff', fontFamily: 'Space Mono, monospace', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', padding: '18px 48px', textDecoration: 'none', fontWeight: 700 }}
            >
              Start My Free Mockup
            </Link>
            <Link
              href="/pricing"
              style={{ display: 'inline-block', background: 'transparent', color: 'var(--silver, #D0D8E0)', fontFamily: 'Space Mono, monospace', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', padding: '18px 48px', textDecoration: 'none', border: '1px solid var(--border, rgba(168,184,200,0.3))' }}
            >
              See Plans &amp; Pricing
            </Link>
          </div>
        </section>

        {/* ── Nearby Areas ── */}
        {nearbyData.length > 0 && (
          <section style={{ padding: 'clamp(80px,10vw,120px) clamp(20px,6vw,80px)' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', marginBottom: '16px' }}>
                Also Serving
              </p>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(22px,3vw,36px)', color: '#fff', marginBottom: '40px', lineHeight: 1.1 }}>
                Nearby Areas
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {nearbyData.map((nearby) => (
                  <Link
                    key={nearby.slug}
                    href={`/areas/${nearby.slug}`}
                    className="nearby-link"
                    style={{ display: 'inline-block', background: 'var(--bg2, #141414)', border: '1px solid var(--border, rgba(168,184,200,0.12))', borderRadius: '6px', padding: '12px 24px', fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--chrome, #A8B8C8)', textDecoration: 'none', transition: 'border-color 0.2s ease, color 0.2s ease' }}
                  >
                    {nearby.name}, MI
                  </Link>
                ))}
                <Link
                  href="/areas"
                  className="nearby-link"
                  style={{ display: 'inline-block', background: 'transparent', border: '1px solid var(--border, rgba(168,184,200,0.12))', borderRadius: '6px', padding: '12px 24px', fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--dim, rgba(208,216,224,0.45))', textDecoration: 'none', transition: 'border-color 0.2s ease, color 0.2s ease' }}
                >
                  All Service Areas →
                </Link>
              </div>
            </div>
          </section>
        )}

      </main>
      <Footer />

      <style>{`
        .area-card {
          transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
        }
        .area-card:hover {
          border-color: rgba(30,61,143,0.5);
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(30,61,143,0.15);
        }
        .nearby-link:hover {
          border-color: rgba(30,61,143,0.5);
          color: var(--silver, #D0D8E0);
        }
      `}</style>
    </>
  );
}
