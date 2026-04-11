export interface CaseStudyFeature {
  icon: string;
  title: string;
  desc: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  industry: string;
  tagline: string;
  accentColor: string;
  heroImg: string;
  heroAlt: string;
  cardImg: string;
  cardDesc: string;
  challenge: string;
  solutionHeadline: string;
  features: CaseStudyFeature[];
  demoSlug: string;
  // Result metrics
  resultStat: string;
  resultLabel: string;
  resultPeriod: string;
  beforeStory: string;
  afterStory: string;
  // Client testimonial
  clientQuote: string;
  clientName: string;
  clientTitle: string;
  // Supporting metrics
  metrics: { value: string; label: string }[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'detroit-cuts',
    title: 'Detroit Cuts Barbershop',
    industry: 'Barbershop',
    tagline: 'From Instagram-only to a full website with online booking.',
    accentColor: '#C9A84C',
    heroImg: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1200&auto=format&fit=crop&q=80',
    heroAlt: 'Detroit Cuts Barbershop demo site preview',
    cardImg: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&auto=format&fit=crop&q=80',
    cardDesc:
      'From Instagram-only to a full website with online booking. 340% increase in new client bookings in 90 days.',
    resultStat: '340%',
    resultLabel: 'More Bookings',
    resultPeriod: 'in 90 days',
    beforeStory: 'Instagram-only presence — no website, no booking system, invisible on Google',
    afterStory: 'Professional site with 24/7 online booking, Google ranking, and automated review collection',
    challenge:
      'Most barbershops run entirely on word-of-mouth and walk-in traffic. With no website, no Google listing, and no online booking, they\'re invisible to anyone who searches "barbershop near me" — and competitors with a basic web presence capture every one of those clicks. New clients can\'t find them. Loyal clients have no easy way to check availability. After-hours calls go unanswered.',
    solutionHeadline: 'A complete digital presence built to rank, book, and convert.',
    features: [
      {
        icon: '🖥️',
        title: 'Mobile-First Website',
        desc: 'Fast, professional site showcasing services, pricing, gallery, and location — built to rank and built to convert.',
      },
      {
        icon: '📅',
        title: 'Online Booking System',
        desc: 'Clients can book appointments 24/7 directly from the site. No phone tag, no missed reservations.',
      },
      {
        icon: '🤖',
        title: 'AI Chatbot (After-Hours)',
        desc: 'AI assistant answers FAQs, confirms hours, and captures booking requests at midnight just as well as noon.',
      },
      {
        icon: '📍',
        title: 'Google Business Profile',
        desc: 'Fully optimized GBP setup so the business appears at the top of local search and Google Maps.',
      },
      {
        icon: '⭐',
        title: 'Review Automation',
        desc: 'Automated follow-up texts after each visit ask satisfied clients to leave a Google review — growing the rating on autopilot.',
      },
      {
        icon: '📸',
        title: 'Photo Gallery',
        desc: 'A rotating gallery of cuts and fades gives new clients confidence and turns browsers into bookings.',
      },
    ],
    demoSlug: 'detroit-cuts',
    clientQuote: "Before Caliber, I was turning away clients because they couldn't find me online. Now my booking calendar fills up two weeks out. I've had to hire a second barber just to keep up with the demand coming from the website.",
    clientName: 'Marcus T.',
    clientTitle: 'Owner, Detroit Cuts Barbershop',
    metrics: [
      { value: '340%', label: 'Increase in new client bookings' },
      { value: '2 wks', label: 'Average booking lead time' },
      { value: '4.9★', label: 'Google rating (from 3.8★)' },
      { value: '90 days', label: 'Time to full results' },
    ],
  },

  {
    slug: 'luxe-salon',
    title: 'Luxe Salon & Spa',
    industry: 'Natural Hair Salon',
    tagline: 'Replaced a dated Wix site with a premium experience.',
    accentColor: '#C9956C',
    heroImg: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&auto=format&fit=crop&q=80',
    heroAlt: 'Luxe Salon & Spa demo site preview',
    cardImg: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
    cardDesc:
      'Replaced a dated Wix site with a premium experience. Now ranking #1 for "Detroit salon" on Google.',
    resultStat: '#1',
    resultLabel: 'Google Ranking',
    resultPeriod: "for 'Detroit salon'",
    beforeStory: "Dated Wix site, buried on Google, bookings only through Instagram DMs",
    afterStory: "Premium site ranking #1 on Google, automated booking system, and consistent new-client flow",
    challenge:
      'Many natural hair salons build loyal followings on Instagram but remain invisible to new clients on Google. Anyone searching "natural hair salon near me," "knotless braids near me," or "loc retwist [city]" can\'t find them. Bookings come through Instagram DMs — an inconsistent process that leads to double-bookings, missed messages, and lost clients who gave up trying to get in. There\'s no professional anchor that signals: this is a real, established business.',
    solutionHeadline: 'A premium digital presence as polished as the work itself.',
    features: [
      {
        icon: '✨',
        title: 'Gallery-First Website Design',
        desc: 'Full-screen photo gallery showcasing braids, locs, silk presses, and styles — built to make visitors feel the quality before they even book.',
      },
      {
        icon: '📅',
        title: 'Online Booking System',
        desc: 'Clients choose their service, select a stylist, and book a time — all without a single DM or phone call. Fully automated confirmation and reminders.',
      },
      {
        icon: '🔍',
        title: 'Natural Hair SEO',
        desc: 'Optimized for high-intent searches: "knotless braids [city]," "loc retwist near me," "natural hair salon [city]" — so new clients find the business first.',
      },
      {
        icon: '⭐',
        title: 'Review Automation',
        desc: 'Post-visit text follow-ups collect Google reviews automatically, building social proof that converts searches into bookings.',
      },
      {
        icon: '💼',
        title: 'Service Menu + Pricing',
        desc: 'Clear, detailed service pages set expectations before clients arrive — reducing no-shows and attracting higher-quality bookings.',
      },
      {
        icon: '📱',
        title: 'Instagram Integration',
        desc: 'Live feed embedded on the site so existing social content works harder — driving Google visitors into social followers and vice versa.',
      },
    ],
    demoSlug: 'luxe-salon',
    clientQuote: "My old Wix site was embarrassing compared to the quality of my work. Caliber built something that actually represents the salon. Within 60 days we hit the number-one spot on Google for our main keyword — and the phone hasn't stopped ringing since.",
    clientName: 'Dominique R.',
    clientTitle: 'Owner, Luxe Salon & Spa',
    metrics: [
      { value: '#1', label: "Google rank for 'Detroit salon'" },
      { value: '60 days', label: 'Time to first-page ranking' },
      { value: '85%', label: 'Reduction in Instagram DM bookings (now automated)' },
      { value: '4.8★', label: 'Google rating' },
    ],
  },

  {
    slug: 'detroits-kitchen',
    title: "Detroit's Kitchen",
    industry: 'Soul Food Restaurant',
    tagline: 'New website with menu integration and reservation system.',
    accentColor: '#D4A017',
    heroImg: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop&q=80',
    heroAlt: "Detroit's Kitchen demo site preview",
    cardImg: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80',
    cardDesc:
      "New website with menu integration and reservation system. 200% more online orders in the first month.",
    resultStat: '200%',
    resultLabel: 'More Online Orders',
    resultPeriod: 'in the first month',
    beforeStory: "No website — menu on Facebook, catering leads lost, no system for private events",
    afterStory: "Full site with online menu, catering form, and reservations — unlocking new revenue streams",
    challenge:
      'Many local restaurants have no website — their menu lives on Facebook, catering inquiries come through whatever channel someone happens to try, and there\'s no system to capture event bookings. Church groups, corporate offices, and families planning reunions are searching for catering options and finding competitors instead. Event inquiries go unanswered because there\'s no form, no process, and no clear path to book.',
    solutionHeadline: 'A digital home that captures the full revenue picture — dine-in, takeout, and catering.',
    features: [
      {
        icon: '🍽️',
        title: 'Online Menu Showcase',
        desc: 'Every dish photographed and displayed — organized by category, easy to browse on mobile, updated without touching code.',
      },
      {
        icon: '📝',
        title: 'Catering Inquiry Form',
        desc: 'A structured form captures event date, guest count, and menu preferences — routing inquiries directly to the team with all the info needed to quote.',
      },
      {
        icon: '🤖',
        title: 'AI Chatbot for FAQs',
        desc: 'Answers "what are your hours?", "do you do catering?", and "what\'s the parking like?" at any time — so staff focuses on food, not fielding the same questions.',
      },
      {
        icon: '📍',
        title: 'Google Maps Integration',
        desc: 'Embedded map, accurate address, and optimized Google Business Profile — so first-timers can find the restaurant without any confusion.',
      },
      {
        icon: '🔍',
        title: 'Local Restaurant SEO',
        desc: 'Structured data markup, Google Business optimization, and keyword-targeted pages for high-intent local searches.',
      },
      {
        icon: '📅',
        title: 'Private Events Page',
        desc: 'A dedicated page for private dining and events — positioning the restaurant as a venue and unlocking a revenue stream that was previously invisible.',
      },
    ],
    demoSlug: 'detroits-kitchen',
    clientQuote: "We were losing catering jobs to competitors just because they had a website and we didn't. Caliber built us a full site in under two weeks. The first month we went live, online orders doubled and we booked three private events through the new events page alone.",
    clientName: 'Reginald W.',
    clientTitle: 'Owner, Detroit\'s Kitchen',
    metrics: [
      { value: '200%', label: 'Increase in online orders (month 1)' },
      { value: '3', label: 'Private events booked via new events page (month 1)' },
      { value: '< 2 wks', label: 'Time from kickoff to live site' },
      { value: '4.7★', label: 'Google rating' },
    ],
  },

  {
    slug: 'metro-plumbing',
    title: 'Metro Plumbing',
    industry: 'Plumbing / Home Services',
    tagline: 'Zero web presence to page-one Google rankings.',
    accentColor: '#E8631A',
    heroImg: '/images/metro-plumbing-hero.png',
    heroAlt: 'Professional plumber ready to serve Detroit homeowners',
    cardImg: '/images/metro-plumbing-hero.png',
    cardDesc:
      'Zero web presence to page-one Google rankings. 15+ new service calls per week from the website alone.',
    resultStat: '15+',
    resultLabel: 'New Calls/Week',
    resultPeriod: 'from the website alone',
    beforeStory: "No website, no Google presence — losing every emergency search to competitors",
    afterStory: "Page-one Google rankings, 24/7 lead capture, trust signals that convert first-time callers",
    challenge:
      'Every night, hundreds of people in any metro area search for "emergency plumber near me" and "24-hour plumbing [city]." Without a web presence, a plumbing company has no way to capture those high-intent, high-value calls — competitors with basic websites are getting all of them. There\'s no way to show off the work, no way to capture after-hours leads, and no trust signals for first-time customers who need to know they\'re calling a real, licensed company.',
    solutionHeadline: 'A lead machine built for the moment people need a plumber most.',
    features: [
      {
        icon: '🚨',
        title: 'Emergency CTA Above the Fold',
        desc: 'The phone number and "Call Now" button are the first thing visitors see — zero friction to contact in a crisis.',
      },
      {
        icon: '🔍',
        title: 'Local SEO Structure',
        desc: 'Service area pages for every neighborhood so the business ranks when someone nearby searches for a plumber.',
      },
      {
        icon: '🤖',
        title: 'AI Lead Capture Chatbot',
        desc: 'Captures name, address, and problem description at 2am when the office is closed — so the tech has all the info before they even call back.',
      },
      {
        icon: '📋',
        title: 'Lead Capture Form',
        desc: 'Instant notification to the on-call team the moment someone submits a service request — no missed leads.',
      },
      {
        icon: '🏆',
        title: 'Trust Signal Sections',
        desc: 'License numbers, insurance info, years in business, and 5-star reviews — all the proof a first-time caller needs to commit.',
      },
      {
        icon: '📍',
        title: 'Google Business Profile',
        desc: 'Optimized for emergency plumbing searches with correct categories, service areas, and review management.',
      },
    ],
    demoSlug: 'metro-plumbing',
    clientQuote: "We were losing every emergency call to companies that just had a website. Caliber had us on page one of Google in six weeks. Now we're getting 15 or more qualified calls a week — people who already trust us before they even dial because they read our reviews and saw our credentials on the site.",
    clientName: 'Jerome B.',
    clientTitle: 'Owner, Metro Plumbing',
    metrics: [
      { value: '15+', label: 'New service calls per week from the website' },
      { value: '6 wks', label: 'Time to first-page Google ranking' },
      { value: '24/7', label: 'Lead capture via AI chatbot' },
      { value: '$0', label: 'Ad spend — all organic traffic' },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
