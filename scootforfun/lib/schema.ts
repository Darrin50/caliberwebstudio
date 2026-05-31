import { business } from './constants'

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: business.name,
    description: business.description,
    url: business.website,
    telephone: business.phone,
    email: business.email,
    areaServed: business.serviceArea,
    priceRange: business.tour.priceDisplay,
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Thursday', 'Friday', 'Saturday', 'Sunday'] },
    ],
    sameAs: [
      business.socials.instagram,
      business.socials.facebook,
    ],
  }
}

export function tourProductSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: '1-Hour Guided Detroit Scooter Tour',
    description: `Guided 1-hour mobility scooter tour of Detroit's Riverwalk, Dequindre Cut, and Ambassador Park.`,
    brand: {
      '@type': 'Brand',
      name: business.name,
    },
    offers: {
      '@type': 'Offer',
      price: business.tour.pricePerPerson,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `${business.website}/book`,
    },
  }
}
