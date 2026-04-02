export interface Industry {
  slug: string;
  name: string;
  plural: string;
  headline: string;
  subheadline: string;
  painPoints: string[];
  whatWeBuild: { title: string; desc: string }[];
  demoSlug?: string;
  color: string;
  bg: string;
  resultStat: { value: string; label: string };
}

export const industries: Industry[] = [
  {
    slug: 'barbershops',
    name: 'Barbershop',
    plural: 'Barbershops',
    headline: 'Your Chair Should Always Be Full.',
    subheadline: 'Most barbershops in Detroit are losing walk-ins to shops that show up first on Google. We fix that — and add online booking so your phone stops ringing for appointments.',
    color: '#C9A84C',
    bg: 'rgba(201,168,76,0.1)',
    resultStat: { value: '3×', label: 'More Google calls in 30 days' },
    painPoints: [
      'Invisible on Google Maps when someone searches "barbershop near me"',
      'No online booking — losing customers who don\'t want to call',
      'Reviews are scattered or outdated — harder to trust',
      'No way to show off your cuts before customers walk in',
      'Competing against franchise shops with bigger marketing budgets',
    ],
    whatWeBuild: [
      { title: 'Online Booking System', desc: 'Customers book directly from your website or Google listing — no calls needed. Integrated with your schedule so you\'re never double-booked.' },
      { title: 'Photo Gallery', desc: 'Showcase your best cuts in a high-impact gallery that builds trust before a first visit. Works like an Instagram but lives on your site permanently.' },
      { title: 'Google Business Optimization', desc: 'We claim, verify, and optimize your Google Business Profile so you show up when locals search "barbershop near me" in your neighborhood.' },
      { title: 'AI Chatbot', desc: 'Answers questions about pricing, hours, and booking at midnight — when you\'re closed and a potential client is scrolling.' },
      { title: 'Review Engine', desc: 'Automated follow-up messages after each visit that invite satisfied customers to leave a Google review. More 5-stars, less effort.' },
    ],
    demoSlug: 'detroit-cuts',
  },
  {
    slug: 'restaurants',
    name: 'Restaurant',
    plural: 'Restaurants',
    headline: 'Empty Tables Are a Website Problem.',
    subheadline: 'Diners decide where to eat before they leave the house. If your restaurant isn\'t showing up on Google with a menu, photos, and easy reservation options — they\'re going somewhere else.',
    color: '#E8631A',
    bg: 'rgba(232,99,26,0.1)',
    resultStat: { value: '2×', label: 'Catering inquiries in 60 days' },
    painPoints: [
      'Outdated menu on third-party sites you don\'t control',
      'No direct reservation or catering inquiry system',
      'Zero visibility when tourists or newcomers search nearby',
      'Losing private dining and event revenue to better-known spots',
      'Social media presence that doesn\'t drive real traffic',
    ],
    whatWeBuild: [
      { title: 'Online Menu', desc: 'A fast, mobile-first menu with photos — yours to update instantly without calling a developer. Structured for Google to index every dish.' },
      { title: 'Catering Inquiry Form', desc: 'Structured intake that captures the event type, headcount, date, and budget — so your first conversation is already qualified.' },
      { title: 'Reservation System', desc: 'Direct reservations without third-party fees. Integrate with your host stand or accept requests via email for manual confirmation.' },
      { title: 'Events & Private Dining Page', desc: 'A dedicated page for birthdays, corporate dinners, and buyouts — with its own SEO and inquiry form to capture high-value bookings.' },
      { title: 'AI Chatbot for FAQs', desc: 'Hours, parking, dietary options, corkage fees — the chatbot handles the common questions so your staff handles the guests.' },
    ],
    demoSlug: 'detroits-kitchen',
  },
  {
    slug: 'plumbers',
    name: 'Plumber',
    plural: 'Plumbers & Plumbing Companies',
    headline: 'Emergency Calls Go to Who Shows Up First.',
    subheadline: 'When a pipe bursts at 11 PM, homeowners call the first plumber they find on Google. That could be you — or it\'s your competitor. We build sites that dominate local search for emergency and scheduled plumbing calls.',
    color: '#1E3D8F',
    bg: 'rgba(30,61,143,0.1)',
    resultStat: { value: '+18', label: 'Leads per month on average' },
    painPoints: [
      'Emergency customers calling competitors who rank above you on Google',
      'No lead capture system for non-emergency inquiries',
      'Service area pages that don\'t rank for local searches',
      'Trust gap with new customers who can\'t verify your credentials online',
      'Losing jobs to national franchise services with better web presence',
    ],
    whatWeBuild: [
      { title: 'Emergency Call CTA Above the Fold', desc: 'The single most important element for a plumbing site. Click-to-call on every page, visible before any scrolling — built for panicked homeowners.' },
      { title: 'Service Area Landing Pages', desc: 'Individual pages for every city and neighborhood you serve — Detroit, Dearborn, Southfield, Warren, and beyond. Each one indexed for local searches.' },
      { title: 'Lead Capture Form', desc: 'Structured intake for non-emergency jobs: type of issue, urgency, address, photos. Routes directly to you by email or text.' },
      { title: 'Trust Signals Section', desc: 'License numbers, insurance verification, years in business, and real Google reviews — all in one section that converts skeptics.' },
      { title: 'Google Business Profile', desc: 'Optimized for plumbing-specific searches with service categories, response times, and geo-targeted keywords.' },
    ],
    demoSlug: 'metro-plumbing',
  },
  {
    slug: 'salons',
    name: 'Hair Salon',
    plural: 'Hair Salons & Beauty Studios',
    headline: 'Your Work Should Speak Before You Do.',
    subheadline: 'Clients choose salons based on photos and reviews — long before they call to book. We build gallery-first websites that showcase your artistry and convert visitors into booked appointments.',
    color: '#C9956C',
    bg: 'rgba(201,149,108,0.1)',
    resultStat: { value: '+40%', label: 'New client bookings in month 1' },
    painPoints: [
      'Best work buried on Instagram where it gets lost after 48 hours',
      'No way for new clients to browse stylists before booking',
      'Booking happens over DMs or phone — inefficient and easy to miss',
      'Competition from salons with stronger Google and Yelp presence',
      'No system to ask satisfied clients for Google reviews',
    ],
    whatWeBuild: [
      { title: 'Gallery-First Design', desc: 'High-impact photo layouts that put your best work front and center — styled to match your brand, not a generic template.' },
      { title: 'Stylist Profiles & Specialties', desc: 'Individual pages for each stylist with their portfolio, specialties, availability, and booking link. Helps clients find their perfect match.' },
      { title: 'Online Booking', desc: 'Service selection, stylist selection, date and time — all handled before they walk in. Connected to your schedule system.' },
      { title: 'Natural Hair / Specialty SEO', desc: 'Structured pages targeting your specific services — natural hair, locs, color, braids — so clients searching those terms find you first.' },
      { title: 'Review Engine', desc: 'Post-appointment follow-up that invites happy clients to share their experience on Google. Consistent 5-stars compound over time.' },
    ],
    demoSlug: 'luxe-salon',
  },
  {
    slug: 'contractors',
    name: 'Contractor',
    plural: 'Contractors & Home Services',
    headline: 'Every Job Should Come with Three Referrals.',
    subheadline: 'Homeowners in Detroit hire contractors they trust — and trust is built online before the first call. A professional website with real photos and verifiable reviews turns one job into a steady pipeline.',
    color: '#16a34a',
    bg: 'rgba(22,163,74,0.1)',
    resultStat: { value: '5×', label: 'Quote requests vs. no website' },
    painPoints: [
      'Work speaks for itself but potential clients can\'t see it online',
      'Losing bids to contractors with polished websites and more reviews',
      'No system to follow up with past clients for repeat or referral work',
      'Inconsistent Google Business Profile with missing service info',
      'Phone number hard to find — prospects call a competitor instead',
    ],
    whatWeBuild: [
      { title: 'Project Gallery', desc: 'Before-and-after photos organized by project type. Shows the quality of your work to homeowners before they ever call.' },
      { title: 'Quote Request Form', desc: 'Structured intake: project type, location, timeline, photos. Every submission arrives pre-qualified so you stop wasting time on tire-kickers.' },
      { title: 'Service Pages', desc: 'Dedicated pages for each service you offer — roofing, remodeling, landscaping, HVAC — each optimized for local search terms.' },
      { title: 'License & Insurance Display', desc: 'Your credentials, certifications, and insurance on the homepage. The single biggest converter for homeowners nervous about unlicensed work.' },
      { title: 'Review Automation', desc: 'Post-job follow-up that asks happy clients for reviews while the experience is fresh. Compounds into a dominant local reputation over time.' },
    ],
  },
  {
    slug: 'dentists',
    name: 'Dental Practice',
    plural: 'Dentists & Dental Practices',
    headline: 'Patients Research Before They Book.',
    subheadline: 'Most people choose a dentist based on online reviews and how professional the website looks. If your site feels dated or your Google listing is incomplete, you\'re losing patients to practices that got there first.',
    color: '#0d9488',
    bg: 'rgba(13,148,136,0.1)',
    resultStat: { value: '+25', label: 'New patient inquiries per month' },
    painPoints: [
      'New patient flow dependent on insurance referrals and word of mouth',
      'No online booking — front desk spends hours on scheduling calls',
      'Google reviews sparse compared to competing practices',
      'Insurance and service information buried or hard to find',
      'Website looks like it was built in 2010 — erodes trust instantly',
    ],
    whatWeBuild: [
      { title: 'New Patient Online Booking', desc: 'Appointment requests directly from your site — service type, insurance, preferred date — delivered to your front desk instantly.' },
      { title: 'Services & Insurance Pages', desc: 'Clear, searchable pages for every service you offer and every insurance you accept. Removes the #1 question patients ask before calling.' },
      { title: 'Team & Office Pages', desc: 'Bios for each dentist and hygienist, office photos, and a virtual tour option — all built to reduce new patient anxiety.' },
      { title: 'Local SEO Infrastructure', desc: 'Schema markup, Google Business optimization, and neighborhood-targeted pages that capture "dentist near me" searches in your zip code.' },
      { title: 'Review Engine', desc: 'Post-visit follow-up to satisfied patients — the single most effective way to build Google and Healthgrades reviews consistently.' },
    ],
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find(i => i.slug === slug);
}
