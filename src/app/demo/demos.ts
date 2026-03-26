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
      { day: 'Monday – Friday', hours: '9:00 AM – 7:00 PM' },
      { day: 'Saturday', hours: '8:00 AM – 6:00 PM' },
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
      { day: 'Monday – Sunday', hours: '24/7 Emergency Available' },
      { day: 'Office Hours', hours: '8:00 AM – 6:00 PM' },
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
    businessType: 'Natural Hair Salon',
    tagline: "Detroit's Premier Natural Hair Studio — Braids, Locs, Silk Press & More.",
    primaryColor: '#17101E',
    accentColor: '#C9956C',
    services: [
      { name: 'Knotless Box Braids', description: 'Feed-in technique for lightweight, natural-looking braids. No tension, no damage. All lengths available.', price: 'From $150' },
      { name: 'Loc Retwist & Style', description: 'Fresh retwist with moisturizing treatment. We specialize in freeform, two-strand, and interlocked locs.', price: 'From $80' },
      { name: 'Natural Hair Styling', description: 'Twist-outs, wash & gos, bantu knots, and afro sets. We celebrate every texture and curl pattern.', price: 'From $65' },
      { name: 'Silk Press', description: 'Smooth, sleek, damage-free silk press with deep conditioning treatment. Perfect for any occasion.', price: 'From $95' },
      { name: 'Sew-In / Weave', description: 'Full sew-in installation with leave-out or closure. Natural, undetectable finish every single time.', price: 'From $180' },
      { name: 'Bridal Package', description: 'Complete wedding day glam — trial run included. Braids, locs, updos, or blowouts. Your day, your style.', price: 'From $275' },
    ],
    hours: [
      { day: 'Tuesday – Friday', hours: '10:00 AM – 7:00 PM' },
      { day: 'Saturday', hours: '9:00 AM – 6:00 PM' },
      { day: 'Sunday – Monday', hours: 'Closed' },
    ],
    phone: '(313) 555-0334',
    address: '1205 Woodward Ave',
    city: 'Detroit, MI 48226',
    about:
      "Luxe Beauty Studio is Detroit's go-to destination for natural hair care, protective styles, and everything in between. From knotless braids to silk presses, loc retwists to sew-ins — we know your crown and we know how to work it. Our stylists are trained in all textures and take pride in every single client who walks out that door looking and feeling their best.",
    chatbotGreeting:
      "Hey! Welcome to Luxe Beauty Studio 💅 Ready to book? I can check stylist availability for braids, locs, silk press, and more.",
  },
]

export function getDemo(slug: string): DemoConfig | undefined {
  return demos.find((d) => d.slug === slug)
}
