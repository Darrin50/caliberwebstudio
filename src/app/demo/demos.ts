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
    // Detroit's Kitchen Soul Food Restaurant
  {
      slug: 'detroits-kitchen',
            businessName: "Detroit's Kitchen",
            businessType: 'Soul Food Restaurant',
            tagline: "Homemade Soul Food. Detroit Raised. Family Fed.",
            primaryColor: '#8B1A1A',
            accentColor: '#D4A017',
            services: [
        {
                  name: 'Sunday Plate',
                  description: 'Fried chicken, mac & cheese, collard greens, and cornbread — just like grandma made it.',
                  price: '$16',
        },
        {
                  name: 'Smothered Pork Chops',
                  description: 'Thick-cut pork chops smothered in savory onion gravy. Served with two sides.',
                  price: '$18',
        },
        {
                  name: 'Catfish Platter',
                  description: 'Crispy fried catfish with hush puppies, coleslaw, and your choice of side.',
                  price: '$17',
        },
        {
                  name: 'Oxtails',
                  description: 'Slow-braised tender oxtails in rich brown gravy. Served with rice and a side.',
                  price: '$22',
        },
        {
                  name: 'Sides',
                  description: "Mac & cheese, candied yams, black-eyed peas, collard greens, cornbread. Any two with your entree.",
                  price: '$5 each',
        },
        {
                  name: 'Catering',
                  description: 'Feeding a crowd? We do family reunions, church events, and office lunches. Call ahead to order.',
                  price: 'Call for quote',
        },
            ],
            hours: [
        { day: 'Tuesday – Thursday', hours: '11:00 AM – 8:00 PM' },
        { day: 'Friday – Saturday', hours: '11:00 AM – 10:00 PM' },
        { day: 'Sunday', hours: '12:00 PM – 7:00 PM' },
        { day: 'Monday', hours: 'Closed' },
            ],
            phone: '(313) 555-0412',
            address: '7821 Gratiot Ave',
            city: 'Detroit, MI 48213',
            about:
        "Detroit's Kitchen has been feeding the east side since 1987. Started by Miss Loretta out of a love for cooking and community, we've grown from a small carryout to a full sit-down spot — but the recipes haven't changed one bit. Everything is made from scratch daily: the mac & cheese, the greens, the cornbread. No shortcuts, no frozen food, just real soul food with real love in every plate. Come hungry. Leave happy.",
              chatbotGreeting:
        "Hey, welcome to Detroit's Kitchen! We're cooking fresh daily. Want to see our menu, check our hours, or ask about catering?",
          },
  // Detroit Furnace & Air Conditioning
  {
    slug: 'detroit-furnace-ac',
    businessName: 'Detroit Furnace & Air Conditioning',
    businessType: 'HVAC / Heating & Cooling',
    tagline: "24/7 Emergency Service. Furnace Repair, AC Installation & Heating Across Metro Detroit.",
    primaryColor: '#0A1520',
    accentColor: '#E07B2A',
    services: [
      { name: 'Furnace Repair', description: 'Fast same-day furnace diagnostics and repair. We fix all makes and models — no heat is an emergency, and we treat it like one.', price: 'From $89 diagnostic' },
      { name: 'AC Repair & Service', description: 'AC not cooling? We diagnose, repair, and recharge systems fast — usually same day across Metro Detroit.', price: 'From $89 diagnostic' },
      { name: '24/7 Emergency HVAC', description: 'Heating or cooling emergency at 2am? We answer the phone. Emergency dispatch available 365 days a year across Metro Detroit.', price: 'Call for pricing' },
      { name: 'New System Installation', description: 'New furnace or AC installation done right. We size your system correctly, install it cleanly, and back it with a full labor warranty.', price: 'Free estimate' },
      { name: 'Annual Maintenance', description: 'Keep your system running at peak efficiency. Seasonal tune-ups catch small problems before they turn into expensive breakdowns.', price: 'From $79/visit' },
      { name: 'Air Quality & Duct Cleaning', description: 'Dirty ducts reduce efficiency and air quality. Our duct cleaning service removes buildup and improves airflow throughout your home.', price: 'Call for quote' },
    ],
    hours: [
      { day: 'Monday – Friday', hours: '7:00 AM – 7:00 PM' },
      { day: 'Saturday', hours: '8:00 AM – 5:00 PM' },
      { day: 'Sunday', hours: 'Emergency Only' },
      { day: '24/7 Emergency Line', hours: 'Always Available' },
    ],
    phone: '(313) 555-0178',
    address: 'Metro Detroit Service Area',
    city: 'Detroit, MI',
    about: "Detroit Furnace & Air Conditioning has been keeping Metro Detroit homes comfortable for over 20 years. From emergency furnace calls in January to AC installations before the summer heat hits — we've seen it all and fixed it all. Our technicians are NATE-certified, fully licensed in Michigan, and committed to straight pricing. No surprise fees. No upselling. Just honest HVAC work done right.",
    chatbotGreeting: "Hi! HVAC emergency or need a quote? Tell me what's going on and I'll get you connected with our team right away.",
  },

  // Salon Detroit
  {
    slug: 'salon-detroit',
    businessName: 'Salon Detroit',
    businessType: 'Full-Service Salon',
    tagline: "Downtown Detroit's Premier Hair Studio — Cuts, Color, Balayage & More.",
    primaryColor: '#0C0C0F',
    accentColor: '#C9A07A',
    services: [
      { name: 'Haircut & Blowout', description: 'Precision cut tailored to your face shape, finished with a professional blowout. All hair types welcome.', price: 'From $65' },
      { name: 'Color & Highlights', description: 'Single process color, partial or full highlights. Ammonia-free options available.', price: 'From $95' },
      { name: 'Balayage', description: 'Hand-painted highlights for a natural, sun-kissed finish. Low maintenance and high impact.', price: 'From $175' },
      { name: 'Keratin Treatment', description: 'Smooth, frizz-free locks for up to 4 months. Suitable for all textures.', price: 'From $225' },
      { name: 'Deep Conditioning', description: 'Intensive moisture treatment to restore health, shine, and strength to damaged or dry hair.', price: 'From $55' },
      { name: 'Extensions Consultation', description: 'Tape-in, clip-in, or sewn-in extensions. Book a free consultation to find your perfect length and match.', price: 'Free Consult' },
    ],
    hours: [
      { day: 'Tuesday – Friday', hours: '10:00 AM – 7:00 PM' },
      { day: 'Saturday', hours: '9:00 AM – 6:00 PM' },
      { day: 'Sunday – Monday', hours: 'Closed' },
    ],
    phone: '(313) 555-0721',
    address: '1540 Woodward Ave',
    city: 'Detroit, MI 48226',
    about:
      "Salon Detroit is a full-service hair studio rooted in craft and community on Downtown Detroit's iconic Woodward Ave. We believe great hair starts with a great conversation — your stylist takes time to understand your lifestyle, your texture, and your vision before a single snip. From precision cuts to balayage, color, extensions, and keratin treatments, every service is executed with care and intention. Our team of licensed stylists brings years of experience and a genuine love for the craft to every chair. Detroit moves fast and looks good doing it. We're here to keep you ahead of the curve.",
    chatbotGreeting:
      'Welcome to Salon Detroit! Ready to book your next appointment? I can check availability for cuts, color, balayage, and more.',
  },

  // Fusion Med Spa — Dearborn Heights, MI
  {
    slug: 'fusion-med-spa',
    businessName: 'Fusion Med Spa',
    businessType: 'Medical Spa',
    tagline: "Dearborn Heights' Premier Med Spa — Laser Hair Removal, HydraFacials, Body Contouring & More.",
    primaryColor: '#0A0608',
    accentColor: '#B76E79',
    services: [
      {
        name: 'Laser Hair Removal',
        description: 'FDA-cleared laser technology for permanent hair reduction on all skin types. See real results in as few as 4–6 sessions. Free consultation included.',
        price: 'From $99/session',
      },
      {
        name: 'HydraFacial',
        description: "Deep cleanse, extract, and hydrate in one signature treatment. Immediate glow, zero downtime. Detroit's most-booked facial — and for good reason.",
        price: 'From $129',
      },
      {
        name: 'Body Contouring',
        description: 'Non-invasive CoolSculpting and fat-reduction treatments. Sculpt your shape without surgery, without downtime, without compromise.',
        price: 'From $299',
      },
      {
        name: 'IV Therapy',
        description: 'Custom vitamin infusion drips for energy, immunity, skin radiance, and recovery. Feel better from the inside out in under an hour.',
        price: 'From $149',
      },
      {
        name: 'Facial Treatments',
        description: 'Chemical peels, dermaplaning, microdermabrasion, and custom facials. Real clinical results — not just relaxation.',
        price: 'From $89',
      },
      {
        name: 'Waxing & Hair Removal',
        description: 'Brazilian wax, full body waxing, and threading. Smooth, precise, and comfortable. Walk-ins welcome for waxing services.',
        price: 'From $35',
      },
    ],
    hours: [
      { day: 'Monday – Friday', hours: '9:00 AM – 6:00 PM' },
      { day: 'Saturday', hours: '9:00 AM – 6:00 PM' },
      { day: 'Sunday', hours: 'Closed' },
    ],
    phone: '(313) 582-0808',
    address: '6970 N Telegraph Rd',
    city: 'Dearborn Heights, MI 48127',
    about:
      "Fusion Med Spa has been the trusted name in medical aesthetics in the Dearborn Heights community for over 16 years. We combine clinical expertise with genuine care — every treatment is performed by trained professionals who take your goals seriously. Whether you're starting laser hair removal, refreshing your skin with a HydraFacial, or sculpting your body with non-invasive contouring, you'll leave looking and feeling like the best version of yourself. We specialize in serving clients of all skin tones and types. Our technology is selected specifically for efficacy and safety across diverse skin profiles. Fusion is not a chain. We know your name, we remember your goals, and we celebrate your results.",
    chatbotGreeting:
      'Welcome to Fusion Med Spa! Ready to book a consultation for laser hair removal, HydraFacials, or body contouring? I can check availability right now.',
  },
]

export function getDemo(slug: string): DemoConfig | undefined {
  return demos.find((d) => d.slug === slug)
}
