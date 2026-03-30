export interface CaseStudyFeature {
  icon: string;
  title: string;
  desc: string;
}

export interface CaseStudyResult {
  metric: string;
  label: string;
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
  keyMetric: string;
  keyMetricLabel: string;
  cardDesc: string;
  challenge: string;
  solutionHeadline: string;
  features: CaseStudyFeature[];
  results: CaseStudyResult[];
  resultsSummary: string;
  demoSlug: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'detroit-cuts',
    title: 'Detroit Cuts Barbershop',
    industry: 'Barbershop',
    tagline: 'From zero online presence to fully booked — 24/7.',
    accentColor: '#C9A84C',
    heroImg: '/demo/barber/hero.png',
    heroAlt: 'Black barber giving a fresh fade at Detroit Cuts Barbershop',
    cardImg: '/demo/barber/hero.png',
    keyMetric: '40%',
    keyMetricLabel: 'Appointments Booked Online',
    cardDesc:
      'Detroit Cuts had no web presence and was losing walk-in traffic to competitors who showed up on Google. We changed that.',
    challenge:
      'Detroit Cuts had been running on word-of-mouth and walk-in traffic for over a decade. With no website, no Google listing, and no way for clients to book online, they were invisible to anyone who searched "barbershop near me" — and competitors were capturing every one of those clicks. New clients couldn\'t find them. Loyal clients had no easy way to check availability. After-hours calls went unanswered.',
    solutionHeadline: 'A complete digital presence built for a Detroit institution.',
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
        desc: "Claimed, optimized, and fully built out — so Detroit Cuts appears at the top of local search and Google Maps.",
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
    results: [
      { metric: '40%', label: 'Appointments Booked Online' },
      { metric: '4.9★', label: 'Google Rating' },
      { metric: '24/7', label: 'Booking Availability' },
      { metric: '3×', label: 'Increase in Profile Views' },
    ],
    resultsSummary:
      'Within 30 days of launch, Detroit Cuts was booking 40% of appointments through the site. Their Google profile views tripled. New clients started arriving specifically because they "found them on Google." The after-hours AI chatbot captures booking requests that would have gone unanswered — turning late-night searches into morning appointments.',
    demoSlug: 'detroit-cuts',
  },

  {
    slug: 'metro-plumbing',
    title: 'Metro Plumbing & Drain',
    industry: 'Plumbing / Home Services',
    tagline: 'Emergency calls answered at 2am — by a website.',
    accentColor: '#E8631A',
    heroImg: '/demo/plumbing/hero.png',
    heroAlt: 'Metro Plumbing technician working on pipes under a kitchen sink',
    cardImg: '/demo/plumbing/hero.png',
    keyMetric: '60%',
    keyMetricLabel: 'Increase in Emergency Calls',
    cardDesc:
      'Metro Plumbing ran entirely on referrals with no digital presence. Competitors were capturing every emergency search query they were invisible to.',
    challenge:
      'Metro Plumbing had been operating for 15 years on referrals and repeat customers — a strong foundation, but a fragile one. Every night, hundreds of people in the Detroit metro searched for "emergency plumber near me" and "24-hour plumbing Detroit." Metro wasn\'t showing up. Competitors with basic websites and Google profiles were capturing every one of those high-intent, high-value calls. Without a web presence, Metro had no way to capture after-hours leads, no way to show off their work, and no trust signals for first-time customers who needed to know they were calling a real, licensed company.',
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
        desc: 'Service area pages for every Detroit neighborhood so Metro ranks when someone in Warren, Dearborn, or Grosse Pointe searches for a plumber.',
      },
      {
        icon: '🤖',
        title: 'AI Lead Capture Chatbot',
        desc: "Captures name, address, and problem description at 2am when the office is closed — so the tech has all the info before they even call back.",
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
    results: [
      { metric: '60%', label: 'Emergency Call Increase' },
      { metric: '24/7', label: 'Lead Capture Active' },
      { metric: '#1', label: 'Local Rank in 3 Neighborhoods' },
      { metric: '4.8★', label: 'Google Rating' },
    ],
    resultsSummary:
      'Within 90 days, emergency call volume increased 60%. The AI chatbot now captures lead information after hours — turning 2am panic searches into morning callback jobs. Service area pages started ranking on page one for "emergency plumber [neighborhood]" searches across three Detroit metro areas. The trust signals section converted first-time visitors into callers at a measurably higher rate than the old referral-only model.',
    demoSlug: 'metro-plumbing',
  },

  {
    slug: 'luxe-salon',
    title: 'Luxe Beauty Studio',
    industry: 'Natural Hair Salon',
    tagline: 'From Instagram DMs to a professional booking flow.',
    accentColor: '#C9956C',
    heroImg:
      'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1600&q=80',
    heroAlt: 'Luxe Beauty Studio — natural hair salon Detroit',
    cardImg:
      'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&auto=format&fit=crop',
    keyMetric: '3×',
    keyMetricLabel: 'New Client Inquiries',
    cardDesc:
      'Luxe Salon had a loyal Instagram following but no Google presence. Anyone searching for natural hair salons in Detroit couldn\'t find them.',
    challenge:
      "Luxe Beauty Studio had built a loyal following on Instagram — their work was stunning, the engagement was real. But Instagram is a closed loop. Anyone who didn't already follow them couldn't find them. No Google presence meant they were invisible to the hundreds of people searching for 'natural hair salon Detroit,' 'knotless braids near me,' or 'loc retwist Detroit' every week. Bookings came through Instagram DMs — an inconsistent, chaotic process that led to double-bookings, missed messages, and lost clients who gave up trying to get in. There was no way for a new client to confidently book, no way to showcase the breadth of services, and no professional anchor that said: this is a real business.",
    solutionHeadline: 'A premium digital presence as polished as the work itself.',
    features: [
      {
        icon: '✨',
        title: 'Gallery-First Website Design',
        desc: "Full-screen photo gallery showcasing braids, locs, silk presses, and styles — built to make visitors feel the salon's quality before they even call.",
      },
      {
        icon: '📅',
        title: 'Online Booking System',
        desc: 'Clients choose their service, select a stylist, and book a time — all without a single DM or phone call. Fully automated confirmation and reminders.',
      },
      {
        icon: '🔍',
        title: 'Natural Hair SEO',
        desc: "Optimized for high-intent searches: 'knotless braids Detroit,' 'loc retwist near me,' 'natural hair salon Detroit' — so new clients find Luxe first.",
      },
      {
        icon: '⭐',
        title: 'Review Automation',
        desc: 'Post-visit text follow-ups collect Google reviews automatically, building the kind of social proof that converts Google searches into bookings.',
      },
      {
        icon: '💼',
        title: 'Service Menu + Pricing',
        desc: 'Clear, detailed service pages set expectations before clients arrive — reducing consultations, reducing no-shows, and attracting higher-quality bookings.',
      },
      {
        icon: '📱',
        title: 'Instagram Integration',
        desc: "Live feed embedded on the site so the Instagram content they'd already built now works harder — driving Google visitors into social followers and vice versa.",
      },
    ],
    results: [
      { metric: '3×', label: 'New Client Inquiries' },
      { metric: '80%', label: 'Reduction in DM Bookings' },
      { metric: '4.9★', label: 'Google Rating' },
      { metric: '24/7', label: 'Self-Service Booking' },
    ],
    resultsSummary:
      "New client inquiries tripled within 60 days of launch as Google searches started converting. The DM-based booking chaos dropped by 80% as clients adopted the self-service booking flow. Luxe now ranks on the first page for natural hair salon searches across Detroit. Reviews automated to a 4.9-star average that's visible to every new visitor who searches for them.",
    demoSlug: 'luxe-salon',
  },

  {
    slug: 'detroits-kitchen',
    title: "Detroit's Kitchen",
    industry: 'Soul Food Restaurant',
    tagline: "From Facebook menu posts to catering inquiries rolling in.",
    accentColor: '#D4A017',
    heroImg: '/demo/restaurant/hero.jpg',
    heroAlt: "Detroit's Kitchen soul food restaurant",
    cardImg: '/demo/restaurant/soul-food-plate.jpg',
    keyMetric: '5×',
    keyMetricLabel: 'Catering Inquiries Per Month',
    cardDesc:
      "Detroit's Kitchen had no website. Their menu lived on Facebook. Catering and event inquiries were sporadic and hard to capture.",
    challenge:
      "Detroit's Kitchen has been feeding the east side since 1987 — one of Detroit's true institutions. But despite decades of loyal regulars, they had zero web presence. No website. The menu existed as Facebook photo posts. Catering inquiries came in through whatever channel someone happened to try — Facebook messages, phone calls, someone walking in. There was no system, no professional anchor, and no way for someone searching Google to even know they existed. Church groups, corporate offices, and families planning reunions were looking for catering options and finding competitors instead. Event inquiries went unanswered because there was no form, no process, and no clear path to book. A restaurant with this much history and this much food deserved better.",
    solutionHeadline: 'A digital home that captures the soul of the restaurant — and catering revenue.',
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
        desc: "Answers 'what are your hours?', 'do you do catering?', and 'what's the parking like?' at any time — so staff focuses on food, not fielding the same questions.",
      },
      {
        icon: '📍',
        title: 'Google Maps Integration',
        desc: 'Embedded map, accurate address, and optimized Google Business Profile — so first-timers can find the restaurant without any confusion.',
      },
      {
        icon: '🔍',
        title: 'Local Restaurant SEO',
        desc: "Structured data markup, Google Business optimization, and keyword-targeted pages for searches like 'soul food Detroit' and 'catering Detroit east side.'",
      },
      {
        icon: '📅',
        title: 'Private Events Page',
        desc: 'A dedicated page for private dining and events — positioning the restaurant as a venue and unlocking a revenue stream that was previously invisible.',
      },
    ],
    results: [
      { metric: '5×', label: 'Catering Inquiries/Month' },
      { metric: 'Top 3', label: 'Google Rank: Soul Food Detroit' },
      { metric: '24/7', label: 'Menu Available Online' },
      { metric: '4.8★', label: 'Google Rating' },
    ],
    resultsSummary:
      "Catering inquiries went from sporadic to a structured pipeline — 5x the volume within 60 days, with all the information needed to respond and quote instantly. The restaurant now appears in the top 3 results for 'soul food Detroit' and related searches. The online menu removed the 'can you send me the menu?' calls and gave Facebook followers a real home to send friends. The private events page unlocked a catering revenue stream that previously had no front door.",
    demoSlug: 'detroits-kitchen',
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
