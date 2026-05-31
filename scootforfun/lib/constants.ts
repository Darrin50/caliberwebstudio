export const business = {
  name: 'Scoot for Fun',
  tagline: 'Ride. Explore. Enjoy Detroit.',
  tagline2: 'Fun. Community. Freedom.',
  description:
    'Scoot for Fun runs guided 1-hour mobility-scooter tours of Detroit — through the Riverwalk, Dequindre Cut, and Ambassador Park. Locally owned, community-focused, and built for anyone who wants to see the city in a whole new way.',
  phone: '(248) 257-8161',
  phoneHref: 'tel:+12482578161',
  email: 'bookings@scootforfun.com',
  website: 'https://scootforfun.com',
  domain: 'scootforfun.com',
  serviceArea: 'Detroit Metro — downtown & the waterfront',

  tour: {
    duration: '1 hour',
    pricePerPerson: 50,
    priceDisplay: '$50',
    groupDiscount: 10,
    maxCapacity: 4,
    schedule: 'Thursday – Sunday',
    scheduleDays: ['Thursday', 'Friday', 'Saturday', 'Sunday'],
    scheduleDaysShort: ['Thu', 'Fri', 'Sat', 'Sun'],
    bookingType: 'Reservations only — advance booking required',
    swag: ['hat', 'water bottle', 'tote bag', 'keychain'],
  },

  timeWindows: [
    {
      id: 'morning',
      label: 'Morning',
      range: '9:00 AM – 12:00 PM',
      slots: ['9:00 AM', '10:00 AM', '11:00 AM'],
    },
    {
      id: 'afternoon',
      label: 'Afternoon',
      range: '12:00 PM – 4:00 PM',
      slots: ['12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM'],
    },
    {
      id: 'evening',
      label: 'Evening',
      range: '5:00 PM – 9:00 PM',
      slots: ['5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'],
    },
  ],

  requirements: {
    minAge: 18,
    minAgeWithGuardian: 16,
    // Full rule displayed in UI
    ageRuleShort: '18+ to operate; 16–17 with parent/guardian on site',
    ageRuleFull:
      'Riders must be 18 or older with valid ID to operate independently. Riders 16–17 may operate with a parent or guardian present on site who signs a consent form.',
    maxWeight: 285,
    waiverRequired: true,
    reservationsOnly: true,
  },

  routes: [
    {
      id: 'riverwalk',
      name: 'Detroit Riverwalk',
      description:
        'Scenic views and fresh breezes along the Detroit River.',
      icon: '🌊',
      color: 'teal',
    },
    {
      id: 'dequindre',
      name: 'Dequindre Cut',
      description:
        'A unique urban greenway filled with art, history & local flavor.',
      icon: '🎨',
      color: 'purple',
    },
    {
      id: 'ambassador',
      name: 'Ambassador Park',
      description:
        'Relax and take in the scenery at Ambassador Park along the riverfront.',
      icon: '🌳',
      color: 'teal',
    },
  ],

  howItWorks: [
    {
      step: 1,
      title: 'Book Online',
      description: 'Pick your date and time slot on our booking page. All reservations are online — no walk-ups.',
    },
    {
      step: 2,
      title: 'Sign Waiver & Pay',
      description: 'Complete the safety waiver and pay securely online to lock in your spot. Groups of 2+ get 10% off.',
    },
    {
      step: 3,
      title: 'Get Confirmation',
      description: "We'll send a confirmation email with your booking details and meet-up information.",
    },
    {
      step: 4,
      title: 'Show Up & Ride',
      description: 'Arrive at the meeting point, get your free swag, hop on, and explore Detroit with your guide!',
    },
  ],

  faq: [
    {
      question: 'What should I wear?',
      answer:
        'Wear comfortable, weather-appropriate clothing. No open-toe shoes suggested — closed-toe footwear is recommended for the best ride experience. Check the forecast and dress in layers if needed.',
    },
    {
      question: 'Can I bring a group?',
      answer:
        'Absolutely! Each time slot holds up to 4 guests. Book multiple spots for the same slot and everyone gets 10% off. For groups larger than 4, please email us to arrange back-to-back slots.',
    },
    {
      question: 'Is there a weight or age limit?',
      answer:
        'Riders must be 18 or older with valid ID to operate independently. Riders 16–17 may operate with a parent or guardian present on site who signs a consent form. All riders must weigh 285 lbs or less. These requirements are set for safety and by equipment specifications.',
    },
    {
      question: 'Do I need experience riding a scooter?',
      answer:
        'No experience needed! Our guide will walk you through everything before the tour starts. The scooters are easy to operate and beginner-friendly.',
    },
    {
      question: 'Where do we meet?',
      answer:
        'Meet-up location details will be confirmed in your booking confirmation email. [TODO: Add official meet-up address once finalized.]',
    },
    {
      question: 'What is your cancellation policy?',
      answer:
        '[Placeholder — cancellation policy to be confirmed by the owner. Please contact bookings@scootforfun.com with cancellation requests.]',
    },
    {
      question: 'Is the tour accessible for riders with mobility limitations?',
      answer:
        'Our mobility scooters are designed to be accessible and easy to operate. If you have specific accessibility questions, please reach out to us directly at bookings@scootforfun.com before booking.',
    },
    {
      question: 'What happens if it rains?',
      answer:
        '[Placeholder — weather/rain policy to be confirmed by the owner. Please contact bookings@scootforfun.com for weather-related questions.]',
    },
  ],

  socials: {
    instagram: '#',
    facebook: '#',
    tiktok: '#',
  },

  colors: {
    primary: '#1BA8A6',
    navy: '#15323F',
    purple: '#4B2E83',
    cream: '#EAF3F2',
  },

  seo: {
    title: 'Scoot for Fun | Guided Detroit Scooter Tours',
    description:
      'Explore Detroit on a 1-hour guided mobility scooter tour. Ride the Riverwalk, Dequindre Cut & Ambassador Park. $50/person, Thu–Sun. Book online.',
    keywords: [
      'Detroit scooter tours',
      'guided scooter tour Detroit',
      'Detroit riverfront tour',
      'Dequindre Cut tour',
      'mobility scooter tour Detroit',
      'things to do Detroit',
      'Detroit outdoor tours',
      'Ambassador Park Detroit',
    ],
    ogImage: '/og-image.jpg',
  },
} as const
