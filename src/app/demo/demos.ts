export interface DemoConfig {
  slug: string
  businessName: string
  businessType: string
  tagline: string
  primaryColor: string
  accentColor: string
  services: { name: string; description: string; price?: string }[]
  hours: { day: string; hours: string }[]
  phone: string
  address: string
  city: string
  about: string
  chatbotGreeting: string
}

export const demos: DemoConfig[] = [
  // Detroit Barbershop
  {
    slug: 'detroit-cuts',
    businessName: 'Detroit Cuts Barbershop',
    businessType: 'Barbershop',
    tagline: "Fresh Cuts. Real Style. Detroit's Premier Barbershop.",
    primaryColor: '#1a1a2e',
    accentColor: '#e94560',
    services: [
      { name: 'Classic Haircut', description: 'Traditional cut with straight razor finish', price: '$35' },
      { name: 'Beard Trim & Shape', description: 'Full beard sculpting and hot towel treatment', price: '$25' },
      { name: "Kid's Cut", description: 'Clean cuts for the little ones', price: '$20' },
      { name: 'Full Service', description: 'Haircut + beard + shampoo', price: '$55' },
    ],
    hours: [
      { day: 'Monday â Friday', hours: '9:00 AM â 7:00 PM' },
      { day: 'Saturday', hours: '8:00 AM â 6:00 PM' },
      { day: 'Sunday', hours: 'Closed' },
    ],
    phone: '(313) 555-0147',
    address: '2847 W Grand Blvd',
    city: 'Detroit, MI 48208',
    about:
      'Detroit Cuts has been serving the Detroit community with precision cuts and unmatched style for over a decade. Our master barbers bring old-school craft to a modern setting. Walk-ins welcome, appointments preferred.',
    chatbotGreeting:
      'Hey! Welcome to Detroit Cuts. Want to book an appointment or check our availability?',
  },

  // Metro Plumbing
  {
    slug: 'metro-plumbing',
    businessName: 'Metro Plumbing & Drain',
    businessType: 'Plumbing',
    tagline: "24/7 Emergency Service. Licensed. Insured. Detroit's Trusted Plumbers.",
    primaryColor: '#003366',
    accentColor: '#ff6b00',
    services: [
      { name: 'Emergency Repairs', description: '24/7 emergency plumbing service', price: 'Call for pricing' },
      { name: 'Drain Cleaning', description: 'Full drain and sewer cleaning', price: 'From $99' },
      { name: 'Water Heater Install', description: 'Same-day water heater replacement', price: 'From $799' },
      { name: 'Pipe Repair', description: 'Leak detection and pipe repair', price: 'Free estimate' },
    ],
    hours: [
      { day: 'Monday â Sunday', hours: '24/7 Emergency Available' },
      { day: 'Office Hours', hours: '8:00 AM â 6:00 PM' },
    ],
    phone: '(313) 555-0289',
    address: '4521 E Jefferson Ave',
    city: 'Detroit, MI 48207',
    about:
      'Metro Plumbing has served Detroit homeowners and businesses for over 15 years. Fast, reliable, and fully licensed in Michigan. We show up on time, fix it right the first time, and stand behind our work.',
    chatbotGreeting:
      'Hi! Plumbing emergency or need a quote? I can help you get connected with our team right away.',
  },

  // Luxe Salon
  {
    slug: 'luxe-salon',
    businessName: 'Luxe Beauty Studio',
    businessType: 'Hair Salon',
    tagline: 'Where Detroit Gets Beautiful.',
    primaryColor: '#2d1b33',
    accentColor: '#d4a5c9',
    services: [
      { name: 'Cut & Style', description: 'Precision cut with blowout and style', price: 'From $65' },
      { name: 'Color & Highlights', description: 'Full color, balayage, and highlights', price: 'From $120' },
      { name: 'Natural Hair', description: 'Specializing in natural and protective styles', price: 'From $80' },
      { name: 'Bridal Package', description: 'Complete bridal hair styling', price: 'From $200' },
    ],
    hours: [
      { day: 'Tuesday â Friday', hours: '10:00 AM â 7:00 PM' },
      { day: 'Saturday', hours: '9:00 AM â 6:00 PM' },
      { day: 'Sunday â Monday', hours: 'Closed' },
    ],
    phone: '(313) 555-0334',
    address: '1205 Woodward Ave',
    city: 'Detroit, MI 48226',
    about:
      "Luxe Beauty Studio is Detroit's premier destination for hair color, cuts, and natural hair care. Our stylists are trained in the latest techniques and specialize in all hair textures. Book your transformation today.",
    chatbotGreeting:
      'Welcome to Luxe Beauty Studio! Ready to book your appointment? I can check availability for you.',
  },
]

export function getDemo(slug: string): DemoConfig | undefined {
  return demos.find((d) => d.slug === slug)
}
