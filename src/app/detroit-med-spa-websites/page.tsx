import type { Metadata } from 'next';
import DetroitMedSpaPageClient from './DetroitMedSpaPageClient';

export const metadata: Metadata = {
  title: 'Detroit Med Spa Website Design',
  description:
    'Caliber Web Studio builds conversion-focused websites for Detroit med spas — custom-designed, Google-ranked, mobile-first, and built to book high-ticket clients. Free mockup in 48 hours.',
  alternates: {
    canonical: 'https://www.caliberwebstudio.com/detroit-med-spa-websites',
  },
  openGraph: {
    title: 'Detroit Med Spa Website Design | Caliber Web Studio',
    description:
      'Custom websites for Detroit-area med spas. Mobile-first, Google-ranked, conversion-focused. Free mockup in 48 hours.',
    url: 'https://www.caliberwebstudio.com/detroit-med-spa-websites',
    siteName: 'Caliber Web Studio',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Detroit Med Spa Website Design | Caliber Web Studio',
    description:
      'Custom websites for Detroit-area med spas. Mobile-first, Google-ranked, conversion-focused. Free mockup in 48 hours.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Detroit Med Spa Website Design',
  serviceType: 'Website Design & Development',
  description:
    'Custom website design for Detroit-area medical spas — conversion-focused, Google-ranked, and mobile-first.',
  url: 'https://www.caliberwebstudio.com/detroit-med-spa-websites',
  areaServed: [
    { '@type': 'City', name: 'Detroit', containedInPlace: { '@type': 'State', name: 'Michigan' } },
    { '@type': 'City', name: 'Dearborn', containedInPlace: { '@type': 'State', name: 'Michigan' } },
    { '@type': 'City', name: 'Royal Oak', containedInPlace: { '@type': 'State', name: 'Michigan' } },
    { '@type': 'City', name: 'Birmingham', containedInPlace: { '@type': 'State', name: 'Michigan' } },
    { '@type': 'City', name: 'Southfield', containedInPlace: { '@type': 'State', name: 'Michigan' } },
    { '@type': 'City', name: 'Bloomfield Hills', containedInPlace: { '@type': 'State', name: 'Michigan' } },
  ],
  provider: {
    '@type': 'LocalBusiness',
    name: 'Caliber Web Studio',
    telephone: '+13137992315',
    url: 'https://www.caliberwebstudio.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Detroit',
      addressRegion: 'MI',
      addressCountry: 'US',
    },
  },
};

export default function DetroitMedSpaWebsitesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DetroitMedSpaPageClient />
    </>
  );
}
