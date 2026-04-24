import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import PlumbersPageContent from './PlumbersPageContent';

export const metadata: Metadata = {
  title: { absolute: 'Plumber Website Design | Caliber Web Studio — Detroit' },
  description:
    'Caliber Web Studio builds high-performance websites for plumbers. Emergency CTA above the fold, local SEO, review capture, mobile-first design. Free demo in 24 hours. $197/mo.',
  keywords: [
    'plumber website design',
    'plumbing website',
    'plumber website Detroit',
    'emergency plumber website',
    'plumbing company website design',
    'local SEO for plumbers',
  ],
  alternates: {
    canonical: 'https://www.caliberwebstudio.com/plumbers',
  },
  openGraph: {
    title: 'Plumber Website Design | Caliber Web Studio',
    description:
      'When a pipe bursts at 2am, homeowners call the first plumber they find on Google. We build the site that puts you first. Free demo in 24 hours.',
    url: 'https://www.caliberwebstudio.com/plumbers',
    siteName: 'Caliber Web Studio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://www.caliberwebstudio.com/images/og-plumbers.jpg',
        width: 1200,
        height: 630,
        alt: 'Plumber Website Design by Caliber Web Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plumber Website Design | Caliber Web Studio',
    description:
      'When a pipe bursts at 2am, homeowners call the first plumber they find on Google. We build the site that puts you first.',
    images: ['https://www.caliberwebstudio.com/images/og-plumbers.jpg'],
  },
};

const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Plumber Website Design',
  description:
    'Caliber Web Studio builds custom websites for plumbing companies. Emergency CTA, local SEO, review capture, mobile-first — all included at $197/month with a 30-day free trial.',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Caliber Web Studio',
    url: 'https://www.caliberwebstudio.com',
    telephone: '+13138005000',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Detroit',
      addressRegion: 'MI',
      addressCountry: 'US',
    },
  },
  areaServed: {
    '@type': 'Country',
    name: 'United States',
  },
  offers: {
    '@type': 'Offer',
    price: '197',
    priceCurrency: 'USD',
    billingIncrement: 'P1M',
    description: '$197/month. First 30 days free. Cancel anytime.',
  },
  serviceType: 'Website Design for Plumbers',
};

export default function PlumbersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />
      <Nav />
      <main style={{ background: 'var(--bg)', color: 'var(--silver)', minHeight: '100vh' }}>
        <PlumbersPageContent />
      </main>
      <Footer />
    </>
  );
}
