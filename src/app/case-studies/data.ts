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
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'detroit-cuts',
    title: 'Detroit Cuts Barbershop',
    industry: 'Barbershop',
    tagline: 'See a complete barbershop site — built and live right now.',
    accentColor: '#C9A84C',
    heroImg: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1200&q=80',
    heroAlt: 'Detroit Cuts Barbershop demo site preview',
    cardImg: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1200&q=80',
    cardDesc:
      'Explore this working demo to see online booking, a photo gallery, an AI chatbot, and mobile-first design. This is exactly what we build for barbershops.',
    challenge:
      'Most barbershops run entirely on word-of-mouth and walk-in traffic. With no website, no Google listing, and no online booking, they\'re invisible to anyone who searches "barbershop near me" — and competitors with a basic web presence capture every one of those clicks. New clients can\'t find them. Loyal clients have no easy way to check availability. After-hours calls go unanswered. This demo shows exactly what we build to fix that.',
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
  },

  {
    slug: 'metro-plumbing',
    title: 'Metro Plumbing & Drain',
    industry: 'Plumbing / Home Services',
    tagline: 'A 24/7 lead-capture site built for plumbing emergencies.',
    accentColor: '#E8631A',
    heroImg: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80',
    heroAlt: 'Metro Plumbing demo site preview',
    cardImg: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80',
    cardDesc:
      'Emergency CTA above the fold, service area pages, lead capture form, and trust signals. This demo is fully functional — click through it.',
    challenge:
      'Every night, hundreds of people in any metro area search for "emergency plumber near me" and "24-hour plumbing [city]." Without a web presence, a plumbing company has no way to capture those high-intent, high-value calls — competitors with basic websites are getting all of them. There\'s no way to show off the work, no way to capture after-hours leads, and no trust signals for first-time customers who need to know they\'re calling a real, licensed company. This demo shows exactly what we build to fix that.',
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
  },

  {
    slug: 'luxe-salon',
    title: 'Luxe Beauty Studio',
    industry: 'Natural Hair Salon',
    tagline: 'Gallery-first booking site for a natural hair studio — fully functional.',
    accentColor: '#C9956C',
    heroImg:
      'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1600&q=80',
    heroAlt: 'Luxe Beauty Studio demo site preview',
    cardImg:
      'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&auto=format&fit=crop',
    cardDesc:
      'Explore a demo with online booking, gallery-first design, natural hair SEO structure, and an Instagram feed integration. Fully clickable.',
    challenge:
      'Many natural hair salons build loyal followings on Instagram but remain invisible to new clients on Google. Anyone searching "natural hair salon near me," "knotless braids near me," or "loc retwist [city]" can\'t find them. Bookings come through Instagram DMs — an inconsistent process that leads to double-bookings, missed messages, and lost clients who gave up trying to get in. There\'s no professional anchor that signals: this is a real, established business. This demo shows exactly what we build to change that.',
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
  },

  {
    slug: 'detroits-kitchen',
    title: "Detroit's Kitchen",
    industry: 'Soul Food Restaurant',
    tagline: 'Online menu, catering form, AI chatbot — everything a restaurant site needs.',
    accentColor: '#D4A017',
    heroImg: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80',
    heroAlt: "Detroit's Kitchen demo site preview",
    cardImg: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
    cardDesc:
      'A full restaurant site with online menu, catering inquiry form, AI chatbot for FAQs, and a private events page. Built to show what we deliver.',
    challenge:
      'Many local restaurants have no website — their menu lives on Facebook, catering inquiries come through whatever channel someone happens to try, and there\'s no system to capture event bookings. Church groups, corporate offices, and families planning reunions are searching for catering options and finding competitors instead. Event inquiries go unanswered because there\'s no form, no process, and no clear path to book. This demo shows the complete solution we build for restaurants.',
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
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
