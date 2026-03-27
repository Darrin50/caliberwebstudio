'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

/* ─────────────────────────────────────────────
   Industry template data
───────────────────────────────────────────── */
type IndustryTemplate = {
  label: string;
  heroImg: string;
  heroAlt: string;
  heroLines: [string, string, string];   // line1, line2 (accented), line3
  tagline: string;
  gallery: { url: string; alt: string }[];
  services: { name: string; description: string; price: string }[];
  hours: { day: string; hours: string }[];
  stats: { num: string; label: string }[];
  reviews: { name: string; stars: number; text: string }[];
  aboutImg: string;
  aboutText: string;
  aboutText2: string;
  announceBar: string;
  ctaLabel: string;
  ctaLabel2: string;
  badge1: string;
  badge2: string;
  badge3: string;
  servicesLabel: string;
  galleryTitle: string;
  gallerySubtitle: string;
  aboutTitle: [string, string];
  reviewsLabel: string;
  navCta: string;
};

const INDUSTRIES: Record<string, IndustryTemplate> = {

  automotive: {
    label: 'Auto Glass',
    heroImg: 'https://images.pexels.com/photos/3806249/pexels-photo-3806249.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop',
    heroAlt: 'Professional auto glass technician at work',
    heroLines: ['Clear Vision.', 'Safe Drive.', 'Guaranteed.'],
    tagline: 'Fast, affordable auto glass service. Most repairs done same-day. Certified technicians, mobile service available.',
    gallery: [
      { url: 'https://images.pexels.com/photos/3806249/pexels-photo-3806249.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', alt: 'Windshield replacement in progress' },
      { url: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', alt: 'Technician applying glass seal' },
      { url: 'https://images.pexels.com/photos/3807133/pexels-photo-3807133.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', alt: 'Clean new windshield after install' },
      { url: 'https://images.pexels.com/photos/3874337/pexels-photo-3874337.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', alt: 'Mobile auto glass service van' },
      { url: 'https://images.pexels.com/photos/6873087/pexels-photo-6873087.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', alt: 'Auto glass shop front' },
      { url: 'https://images.pexels.com/photos/3807386/pexels-photo-3807386.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', alt: 'Chip repair close-up' },
    ],
    services: [
      { name: 'Windshield Replacement', description: 'Full OEM or OEM-equivalent windshield replacement. Done right the first time, backed by our lifetime warranty on installation.', price: 'From $199' },
      { name: 'Chip & Crack Repair', description: 'Small chips and cracks repaired in under 30 minutes. Most insurance covers chip repair 100% — no deductible required.', price: 'From $49' },
      { name: 'Side & Rear Window', description: 'All side windows, quarter glass, and rear windshields replaced same-day on most vehicles. In-shop and mobile.', price: 'From $149' },
      { name: 'Mobile Service', description: "Can't make it to us? We come to you — at home, at work, or anywhere within our service area. No extra fee.", price: 'Free' },
      { name: 'Window Tinting', description: 'Professional window tinting for UV protection, privacy, and heat reduction. All tint levels are Michigan-legal compliant.', price: 'From $129' },
      { name: 'ADAS Recalibration', description: 'We recalibrate advanced driver assistance systems — cameras and sensors — after every windshield replacement. Safety first.', price: 'From $79' },
    ],
    hours: [
      { day: 'Monday – Friday', hours: '8:00 AM – 6:00 PM' },
      { day: 'Saturday', hours: '9:00 AM – 4:00 PM' },
      { day: 'Sunday', hours: 'Closed' },
    ],
    stats: [
      { num: '12+', label: 'Years in Business' },
      { num: '4.9★', label: 'Google Rating' },
      { num: '10K+', label: 'Windshields Replaced' },
    ],
    reviews: [
      { name: 'Mike D.', stars: 5, text: 'Had a huge crack Monday morning. Called them, they came to my office by noon and had it replaced in 45 minutes. Unbelievable service.' },
      { name: 'Sarah K.', stars: 5, text: 'My insurance covered the whole thing. Zero out of pocket. The tech was professional, cleaned everything up, and it looks perfect.' },
      { name: 'James T.', stars: 5, text: 'Called three places. These guys had the best price and came same-day. The new windshield looks factory-perfect. Very happy.' },
    ],
    aboutImg: 'https://images.pexels.com/photos/3806249/pexels-photo-3806249.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    aboutText: "We've been fixing and replacing auto glass in the Detroit area for over 12 years. Our certified technicians use only top-grade materials and follow all AGRSS installation standards. Whether it's a small rock chip or a full windshield replacement, we get it done right — and we stand behind every job.",
    aboutText2: "Every technician is background-checked, certified, and trained on the latest vehicle technology including ADAS systems. We work with all insurance companies and handle the claim paperwork for you. No stress, no hassle — just clear glass and safe driving.",
    announceBar: '🚗 Free mobile service · Most insurance accepted · Same-day appointments available',
    ctaLabel: '📞 Call for a Free Quote',
    ctaLabel2: 'See Services & Pricing',
    badge1: 'Same-Day Service Available',
    badge2: 'Insurance Claims Handled',
    badge3: '4.9+ Stars on Google',
    servicesLabel: 'What We Do',
    galleryTitle: 'Our Work',
    gallerySubtitle: 'Real jobs from real customers. Every install is clean, tight, and warranty-backed.',
    aboutTitle: ['Detroit Owned.', 'Detroit Proud.'],
    reviewsLabel: 'Customer Reviews',
    navCta: 'Get a Quote',
  },

  barbershop: {
    label: 'Barbershop',
    heroImg: 'https://images.pexels.com/photos/7447148/pexels-photo-7447148.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop',
    heroAlt: 'Master barber giving a fresh cut',
    heroLines: ['Fresh Cuts.', 'Sharp Fades.', 'No Waiting.'],
    tagline: "Detroit's go-to barbershop for precision fades, clean lineups, and old-school craft — walk-ins always welcome.",
    gallery: [
      { url: 'https://images.pexels.com/photos/7697316/pexels-photo-7697316.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', alt: 'Clean taper fade' },
      { url: 'https://images.pexels.com/photos/7697390/pexels-photo-7697390.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', alt: 'Fresh 360 waves' },
      { url: 'https://images.pexels.com/photos/7697283/pexels-photo-7697283.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', alt: 'Barbershop interior' },
      { url: 'https://images.pexels.com/photos/7697642/pexels-photo-7697642.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', alt: 'Two barbers working' },
      { url: 'https://images.pexels.com/photos/7697639/pexels-photo-7697639.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', alt: "Kid's cut" },
      { url: 'https://images.pexels.com/photos/7697445/pexels-photo-7697445.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', alt: 'Classic barbershop chairs' },
    ],
    services: [
      { name: 'Classic Haircut', description: 'Traditional cut with scissor or clipper finish, straight razor edge, and hot towel treatment.', price: '$35' },
      { name: 'Beard Trim & Shape', description: 'Full beard sculpting, line-up, and hot towel treatment. Leave looking clean and polished.', price: '$25' },
      { name: "Kid's Cut", description: 'Fresh, clean cuts for the young kings. Patient barbers, great results, every time.', price: '$20' },
      { name: 'Full Service', description: 'Haircut + beard trim + hot towel shave + shampoo. The complete experience.', price: '$55' },
      { name: 'Skin Fade', description: 'Zero to skin fade with precision lining. The sharpest fade in Detroit.', price: '$40' },
      { name: 'Hot Shave', description: 'Traditional straight razor shave with hot towel and soothing aftercare balm.', price: '$30' },
    ],
    hours: [
      { day: 'Monday – Friday', hours: '9:00 AM – 7:00 PM' },
      { day: 'Saturday', hours: '8:00 AM – 6:00 PM' },
      { day: 'Sunday', hours: 'Closed' },
    ],
    stats: [
      { num: '10+', label: 'Years in Detroit' },
      { num: '4.9★', label: 'Google Rating' },
      { num: '8K+', label: 'Cuts Per Year' },
    ],
    reviews: [
      { name: 'Marcus T.', stars: 5, text: "Been coming here two years. My barber keeps my fade tighter than anywhere else in the city. Period." },
      { name: 'DeShawn R.', stars: 5, text: "Walk-in on a Saturday, in the chair in 20 minutes. Left looking like a whole new man." },
      { name: 'Antoine M.', stars: 5, text: "Best barbershop in Detroit. My waves been looking right every single time." },
    ],
    aboutImg: 'https://images.pexels.com/photos/7447136/pexels-photo-7447136.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    aboutText: "We've been serving the Detroit community with precision cuts and unmatched style for over a decade. Our master barbers bring old-school craft to a modern setting.",
    aboutText2: "When you sit in one of our chairs, you're not just getting a haircut. You're getting a fresh start to your week. Walk-ins welcome, appointments preferred.",
    announceBar: '✂️ Walk-ins welcome · Open 6 days · Detroit, MI',
    ctaLabel: 'Call to Book Your Cut',
    ctaLabel2: 'See Services & Pricing',
    badge1: 'Walk-ins Welcome',
    badge2: 'Licensed & Insured',
    badge3: '4.9+ Stars on Google',
    servicesLabel: 'What We Offer',
    galleryTitle: 'The Gallery',
    gallerySubtitle: 'Real work from real clients. This is what we do.',
    aboutTitle: ['Built in Detroit.', 'For Detroit.'],
    reviewsLabel: 'Customer Reviews',
    navCta: 'Book Now',
  },

  plumbing: {
    label: 'Plumbing',
    heroImg: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=1600&q=85',
    heroAlt: 'Plumber at work on residential pipes',
    heroLines: ["Detroit's", 'Trusted', 'Plumber.'],
    tagline: '24/7 emergency service. Licensed & insured in Michigan. We show up on time and fix it right the first time.',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=85', alt: 'Plumber working under cabinet' },
      { url: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=85', alt: 'Pipe repair inside a wall' },
      { url: 'https://images.unsplash.com/photo-1584265549731-fc0d5434ff76?auto=format&fit=crop&w=800&q=80', alt: 'Faucet repair close-up' },
      { url: 'https://images.unsplash.com/photo-1582015752624-e8b1bc4e6019?auto=format&fit=crop&w=800&q=85', alt: 'Plumber with tools ready' },
    ],
    services: [
      { name: 'Emergency Repairs', description: '24/7 emergency plumbing service for burst pipes, gas leaks, and major water damage. We answer every call.', price: 'Call for pricing' },
      { name: 'Drain Cleaning', description: 'Full drain and sewer cleaning using professional-grade equipment. Slow drain? Gone.', price: 'From $99' },
      { name: 'Water Heater Install', description: 'Same-day water heater replacement. Tankless or traditional — we carry most major brands.', price: 'From $799' },
      { name: 'Pipe Repair & Replace', description: 'Leak detection and full pipe repair. We use camera inspection to find hidden issues fast.', price: 'Free estimate' },
      { name: 'Sewer Line Service', description: 'Camera inspection, sewer jetting, and full replacement when needed. We handle everything.', price: 'Call for pricing' },
      { name: 'Fixture Installation', description: 'Sinks, toilets, faucets, showers — installed properly the first time. Parts and labor included.', price: 'From $149' },
    ],
    hours: [
      { day: 'Monday – Sunday', hours: '24/7 Emergency Available' },
      { day: 'Office Hours', hours: '8:00 AM – 6:00 PM' },
    ],
    stats: [
      { num: '15+', label: 'Years Serving Detroit' },
      { num: '4.8★', label: 'Google Rating' },
      { num: '3K+', label: 'Jobs Completed' },
    ],
    reviews: [
      { name: 'Sandra K.', stars: 5, text: "Called at 9pm with a burst pipe. Tech was at my house in 45 minutes. Fixed it same night. Unbelievable service." },
      { name: 'James F.', stars: 5, text: "Used them twice. Both times on time, straight price before starting, clean work. No upselling whatsoever." },
      { name: 'Denise M.', stars: 5, text: "Had a slow drain three plumbers couldn't fix. Found it with their camera in 10 minutes. Fixed in an hour." },
    ],
    aboutImg: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=800&q=85',
    aboutText: "We've served Detroit homeowners and businesses for over 15 years. Fast, reliable, and fully licensed in Michigan. We show up on time, fix it right the first time, and stand behind our work.",
    aboutText2: "Every technician is Michigan-licensed, background checked, and trained in the latest techniques. When we give you a price, that's the price. No hidden fees, no surprises.",
    announceBar: '🚨 24/7 Emergency Service Available · Licensed & Insured in Michigan',
    ctaLabel: '📞 Call Now — 24/7 Emergency Line',
    ctaLabel2: 'See All Services',
    badge1: '24/7 Emergency Service',
    badge2: 'Licensed & Insured · Michigan',
    badge3: '4.8+ Stars on Google',
    servicesLabel: 'What We Fix',
    galleryTitle: 'Our Work',
    gallerySubtitle: "Real jobs we've completed. We leave it better than we found it.",
    aboutTitle: ['Detroit Owned.', 'Detroit Proud.'],
    reviewsLabel: 'Customer Reviews',
    navCta: 'Call Now',
  },

  salon: {
    label: 'Hair Salon',
    heroImg: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1600&q=80',
    heroAlt: 'Beautiful natural hair salon styling',
    heroLines: ['Your Hair.', 'Your Crown.', 'Protected.'],
    tagline: "Detroit's premier natural hair studio — braids, locs, silk press, and more. Every client leaves feeling like royalty.",
    gallery: [
      { url: 'https://images.unsplash.com/photo-1522337360826-9a37efa4e4fc?auto=format&fit=crop&w=800&q=80', alt: 'Fulani braids with highlights' },
      { url: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=800&q=80', alt: 'Chic pixie cut styled' },
      { url: 'https://images.unsplash.com/photo-1562322140-8baeadadec4d?auto=format&fit=crop&w=800&q=80', alt: 'Bone-straight silk press' },
      { url: 'https://images.unsplash.com/photo-1590037094905-e0e3b5d08bdc?auto=format&fit=crop&w=800&q=80', alt: 'Passion twists with ombre' },
      { url: 'https://images.unsplash.com/photo-1522337360826-9a37efa4e4fc?auto=format&fit=crop&w=800&q=80', alt: 'Natural curls defined' },
    ],
    services: [
      { name: 'Knotless Box Braids', description: 'Feed-in technique for lightweight, natural-looking braids. No tension, no damage. All lengths available.', price: 'From $150' },
      { name: 'Loc Retwist & Style', description: 'Fresh retwist with moisturizing treatment. We specialize in freeform, two-strand, and interlocked locs.', price: 'From $80' },
      { name: 'Silk Press', description: 'Smooth, sleek, damage-free silk press with deep conditioning treatment. Perfect for any occasion.', price: 'From $95' },
      { name: 'Natural Hair Styling', description: 'Twist-outs, wash & gos, bantu knots, and afro sets. We celebrate every texture and curl pattern.', price: 'From $65' },
      { name: 'Sew-In / Weave', description: 'Full sew-in installation with leave-out or closure. Natural, undetectable finish every single time.', price: 'From $180' },
      { name: 'Bridal Package', description: 'Complete wedding day glam — trial run included. Braids, locs, updos, or blowouts. Your day, your style.', price: 'From $275' },
    ],
    hours: [
      { day: 'Tuesday – Friday', hours: '10:00 AM – 7:00 PM' },
      { day: 'Saturday', hours: '9:00 AM – 6:00 PM' },
      { day: 'Sunday – Monday', hours: 'Closed' },
    ],
    stats: [
      { num: '7+', label: 'Years in Detroit' },
      { num: '4.9★', label: 'Google Rating' },
      { num: '3K+', label: 'Clients Served' },
    ],
    reviews: [
      { name: 'Tiffany W.', stars: 5, text: "My knotless braids lasted two full months. So neat, so light. I won't go anywhere else in Detroit." },
      { name: 'Aaliyah P.', stars: 5, text: "The salon is gorgeous and professional. My loc retwist looked amazing and my scalp felt so moisturized." },
      { name: 'Kezia N.', stars: 5, text: "Booked online, walked in on time, and left feeling like royalty. My braids are always tight. Best in Detroit." },
    ],
    aboutImg: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=800&q=85',
    aboutText: "We're Detroit's go-to destination for natural hair care, protective styles, and everything in between. From knotless braids to silk presses, loc retwists to sew-ins — we know your crown.",
    aboutText2: "Our stylists are trained in all textures and take pride in every single client who walks out that door looking and feeling their best. Detroit is home. Our clients are our community.",
    announceBar: '✨ Now booking appointments · Tue – Sat · Detroit, MI',
    ctaLabel: '💅 Book Your Appointment',
    ctaLabel2: 'See All Services',
    badge1: 'Appointments Available Online',
    badge2: 'All Hair Textures Welcome',
    badge3: '4.9+ Stars on Google',
    servicesLabel: 'What We Offer',
    galleryTitle: 'The Gallery',
    gallerySubtitle: 'Real work from real clients. This is what we do.',
    aboutTitle: ['Your Hair.', 'Our Passion.'],
    reviewsLabel: 'Client Love',
    navCta: 'Book Now',
  },

  restaurant: {
    label: 'Restaurant',
    heroImg: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80',
    heroAlt: 'Warm restaurant dining room',
    heroLines: ["Detroit's", 'Soul Food.', 'Made Fresh.'],
    tagline: 'Homemade soul food. Detroit raised. Family fed. Every plate made from scratch daily — come hungry, leave happy.',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80', alt: 'Soul food spread' },
      { url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80', alt: 'Home-cooked platter' },
      { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80', alt: 'Restaurant dining room' },
      { url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80', alt: 'Warm restaurant interior' },
    ],
    services: [
      { name: 'Sunday Plate', description: 'Fried chicken, mac & cheese, collard greens, and cornbread — just like grandma made it.', price: '$16' },
      { name: 'Smothered Pork Chops', description: 'Thick-cut pork chops smothered in savory onion gravy. Served with two sides.', price: '$18' },
      { name: 'Catfish Platter', description: 'Crispy fried catfish with hush puppies, coleslaw, and your choice of side.', price: '$17' },
      { name: 'Oxtails', description: 'Slow-braised tender oxtails in rich brown gravy. Served with rice and a side.', price: '$22' },
      { name: 'Sides', description: "Mac & cheese, candied yams, black-eyed peas, collard greens, cornbread. Any two with your entree.", price: '$5 each' },
      { name: 'Catering', description: 'Feeding a crowd? We do family reunions, church events, and office lunches. Call ahead to order.', price: 'Call for quote' },
    ],
    hours: [
      { day: 'Tuesday – Thursday', hours: '11:00 AM – 8:00 PM' },
      { day: 'Friday – Saturday', hours: '11:00 AM – 10:00 PM' },
      { day: 'Sunday', hours: '12:00 PM – 7:00 PM' },
      { day: 'Monday', hours: 'Closed' },
    ],
    stats: [
      { num: '22+', label: 'Years in Detroit' },
      { num: '40+', label: 'Menu Items' },
      { num: '2,000+', label: 'Happy Guests/Month' },
    ],
    reviews: [
      { name: 'Marcus T.', stars: 5, text: "Best soul food in Detroit, period. The smothered chicken is unbelievable. I bring everybody here." },
      { name: 'Denise W.', stars: 5, text: "Feels like grandma's kitchen. Warm, welcoming, and absolutely delicious. Worth every penny." },
      { name: 'James R.', stars: 5, text: "I drive 45 minutes just for their sweet potato pie. Worth every mile. Detroit's best kept secret." },
    ],
    aboutImg: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=85',
    aboutText: "We've been feeding the community since day one — real comfort food, made from scratch, with love. Every plate is a reminder of home, family, and the kind of cooking that never goes out of style.",
    aboutText2: "Everything is made fresh daily: the mac & cheese, the greens, the cornbread. No shortcuts, no frozen food, just real soul food with real love in every plate. Come hungry. Leave happy.",
    announceBar: '🍽️ Now Open Sundays 12–7pm · Dine In & Takeout Available · Detroit, MI',
    ctaLabel: '📞 Call to Order or Cater',
    ctaLabel2: 'See Full Menu',
    badge1: 'Dine In & Takeout',
    badge2: 'Catering Available',
    badge3: '4.8+ Stars on Google',
    servicesLabel: 'Our Menu',
    galleryTitle: 'Inside & Out',
    gallerySubtitle: 'Good food. Good atmosphere. Good people.',
    aboutTitle: ['Homemade.', 'Every Day.'],
    reviewsLabel: 'What People Say',
    navCta: 'Order Now',
  },

  retail: {
    label: 'Retail Shop',
    heroImg: 'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop',
    heroAlt: 'Modern retail store interior',
    heroLines: ['Shop Local.', 'Shop Fresh.', 'Shop Detroit.'],
    tagline: 'Your neighborhood retail destination. Curated products, friendly service, and prices that make sense.',
    gallery: [
      { url: 'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', alt: 'Store front display' },
      { url: 'https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', alt: 'Product shelves' },
      { url: 'https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', alt: 'Shopping bags and products' },
      { url: 'https://images.pexels.com/photos/5632395/pexels-photo-5632395.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', alt: 'Store interior' },
    ],
    services: [
      { name: 'In-Store Shopping', description: 'Browse our full selection in-store. Staff on hand to help you find exactly what you need.', price: 'No minimums' },
      { name: 'Curbside Pickup', description: 'Order online or by phone, pick up the same day. Convenient, fast, and always ready.', price: 'Free' },
      { name: 'Gift Wrapping', description: 'Complimentary gift wrapping on all purchases. We make every gift look perfect.', price: 'Free' },
      { name: 'Loyalty Rewards', description: 'Earn points on every purchase. Redeem for discounts, freebies, and exclusive deals.', price: 'Free to join' },
      { name: 'Special Orders', description: "Don't see what you need? We can order it for you. Most items arrive within 3-5 business days.", price: 'Ask in store' },
      { name: 'Local Delivery', description: 'Same-day local delivery available within our service area. Minimum order may apply.', price: 'From $5' },
    ],
    hours: [
      { day: 'Monday – Friday', hours: '10:00 AM – 7:00 PM' },
      { day: 'Saturday', hours: '10:00 AM – 6:00 PM' },
      { day: 'Sunday', hours: '12:00 PM – 5:00 PM' },
    ],
    stats: [
      { num: '5+', label: 'Years in Detroit' },
      { num: '4.8★', label: 'Google Rating' },
      { num: '500+', label: 'Products In-Stock' },
    ],
    reviews: [
      { name: 'Lisa M.', stars: 5, text: "Best local shop in Detroit. The staff is so helpful and the selection is always fresh. I shop here every week." },
      { name: 'Tony R.', stars: 5, text: "Great prices, great people. Love supporting local. This place is the real deal." },
      { name: 'Angela S.', stars: 5, text: "I've found things here I couldn't find anywhere else. The owner really knows their customers. Five stars always." },
    ],
    aboutImg: 'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    aboutText: "We opened our doors because Detroit deserves a local shop that actually knows its customers. No big-box experience here — just good products, honest prices, and people who genuinely care.",
    aboutText2: "Everything we stock is hand-picked with our customers in mind. We listen to what you need, carry what you ask for, and make sure every visit feels like a welcome.",
    announceBar: '🛍️ Open 7 days a week · Curbside pickup available · Detroit, MI',
    ctaLabel: '📞 Call or Stop In',
    ctaLabel2: 'See What We Carry',
    badge1: 'Open 7 Days a Week',
    badge2: 'Curbside Pickup Available',
    badge3: '4.8+ Stars on Google',
    servicesLabel: 'What We Offer',
    galleryTitle: 'Come See Us',
    gallerySubtitle: 'A welcoming space with everything you need.',
    aboutTitle: ['Local Since', 'Day One.'],
    reviewsLabel: 'Customer Reviews',
    navCta: 'Visit Us',
  },

  dental: {
    label: 'Dental Office',
    heroImg: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop',
    heroAlt: 'Modern dental office with friendly staff',
    heroLines: ['Healthy Smiles.', 'Comfortable', 'Care.'],
    tagline: "Detroit's trusted dental care. From routine cleanings to cosmetic treatments — we make every visit easy.",
    gallery: [
      { url: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', alt: 'Modern dental chair' },
      { url: 'https://images.pexels.com/photos/3881449/pexels-photo-3881449.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', alt: 'Dental team at work' },
      { url: 'https://images.pexels.com/photos/3845741/pexels-photo-3845741.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', alt: 'Clean dental clinic' },
      { url: 'https://images.pexels.com/photos/3845766/pexels-photo-3845766.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', alt: 'Patient smiling after treatment' },
    ],
    services: [
      { name: 'Teeth Cleaning', description: 'Professional cleaning and exam. Includes X-rays, plaque removal, and personalized oral health advice.', price: 'From $99' },
      { name: 'Teeth Whitening', description: 'In-office professional whitening. Whiten up to 8 shades in a single one-hour appointment.', price: 'From $299' },
      { name: 'Dental Implants', description: 'Permanent, natural-looking implants that function just like real teeth. Consultations always free.', price: 'Free consult' },
      { name: 'Invisalign', description: 'Clear aligner treatment for straighter teeth without braces. Discreet, comfortable, effective.', price: 'Free consult' },
      { name: 'Emergency Dental', description: 'Toothache? Broken tooth? We see emergency patients same-day. Call us first.', price: 'Call for pricing' },
      { name: 'Family Dentistry', description: 'We treat the whole family — kids, teens, and adults. Evening and weekend appointments available.', price: 'Most insurance' },
    ],
    hours: [
      { day: 'Monday – Thursday', hours: '8:00 AM – 5:00 PM' },
      { day: 'Friday', hours: '8:00 AM – 3:00 PM' },
      { day: 'Saturday', hours: 'By Appointment' },
      { day: 'Sunday', hours: 'Closed' },
    ],
    stats: [
      { num: '20+', label: 'Years Serving Detroit' },
      { num: '4.9★', label: 'Google Rating' },
      { num: '5K+', label: 'Happy Patients' },
    ],
    reviews: [
      { name: 'Patricia H.', stars: 5, text: "Best dental experience I've ever had. No judgment, no pressure, just great care. My whole family comes here now." },
      { name: 'Robert J.', stars: 5, text: "I was terrified of the dentist for 10 years. These guys made me feel completely comfortable. 10/10." },
      { name: 'Carla M.', stars: 5, text: "The whitening treatment was incredible. My teeth look amazing. Staff is so kind and professional." },
    ],
    aboutImg: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    aboutText: "We've been caring for Detroit smiles for over 20 years. Our team is committed to gentle, thorough, and honest dental care — without the sales pressure you find at chains.",
    aboutText2: "We invest in the latest technology to make every visit faster, more comfortable, and more precise. New patients always welcome. Most insurance plans accepted.",
    announceBar: '🦷 Accepting new patients · Most insurance accepted · Detroit, MI',
    ctaLabel: '📞 Request an Appointment',
    ctaLabel2: 'See All Services',
    badge1: 'New Patients Welcome',
    badge2: 'Most Insurance Accepted',
    badge3: '4.9+ Stars on Google',
    servicesLabel: 'Our Services',
    galleryTitle: 'Our Office',
    gallerySubtitle: 'Clean, modern, and designed for your comfort.',
    aboutTitle: ['Gentle Care.', 'Real Results.'],
    reviewsLabel: 'Patient Reviews',
    navCta: 'Book Appointment',
  },

};

/* ─────────────────────────────────────────────
   Stars helper
───────────────────────────────────────────── */
function Stars({ count, accent }: { count: number; accent: string }) {
  return (
    <div style={{ display: 'flex', gap: 2, marginBottom: 12 }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: accent, fontSize: 15 }}>★</span>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export default function PreviewClient() {
  const params = useSearchParams();

  const company   = params.get('company')  || 'Your Business Name';
  const color     = params.get('color')    || '#1a56db';
  const industry  = params.get('industry') || 'automotive';
  const logo      = params.get('logo')     || '';

  // Normalize color — ensure it has a #
  const accentRaw  = color.startsWith('#') ? color : '#' + color;
  const accent     = accentRaw;

  const tmpl = INDUSTRIES[industry.toLowerCase()] ?? INDUSTRIES.automotive;

  // Dark background always — accent drives the brand color
  const bg  = '#0a0a0a';
  const bg2 = '#111111';
  const bg3 = '#1a1a1a';
  const text  = '#f5f5f0';
  const muted = '#888888';
  const light = '#cccccc';
  const radius = '5px';

  /* Hide agency chrome while preview is mounted */
  useEffect(() => {
    const ids = ['cursor-dot', 'cursor-outer', 'meteorField', 'sunParticles'];
    const origDisplay: Record<string, string> = {};
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) { origDisplay[id] = el.style.display; el.style.display = 'none'; }
    });
    const canvases = Array.from(document.querySelectorAll('canvas'));
    canvases.forEach(c => { (c as HTMLElement).style.display = 'none'; });
    const origCursor = document.body.style.cursor;
    document.body.style.cursor = 'auto';

    return () => {
      ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = origDisplay[id] ?? '';
      });
      canvases.forEach(c => { (c as HTMLElement).style.display = ''; });
      document.body.style.cursor = origCursor;
    };
  }, []);

  const css = `
    .pw *, .pw *::before, .pw *::after { box-sizing: border-box; margin: 0; padding: 0; }
    .pw { font-family: 'Inter', system-ui, sans-serif; background: ${bg}; color: ${text}; overflow-x: hidden; cursor: auto !important; min-height: 100vh; }
    .pw a, .pw button { cursor: pointer !important; }
    .pw img { display: block; max-width: 100%; }
    .pw .con { max-width: 1100px; margin: 0 auto; padding: 0 24px; }

    /* Announce bar */
    .pw .announce { background: ${accent}; color: #fff; text-align: center; padding: 10px 20px; font-size: 13px; font-weight: 600; }

    /* Nav */
    .pw .nav { background: ${bg}cc; backdrop-filter: blur(8px); border-bottom: 1px solid rgba(255,255,255,0.08); position: sticky; top: 0; z-index: 100; padding: 0 24px; }
    .pw .nav-in { max-width: 1100px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; height: 68px; }
    .pw .logo-wrap { display: flex; align-items: center; gap: 10px; }
    .pw .logo-img { height: 36px; width: auto; border-radius: 4px; }
    .pw .logo-name { font-size: 18px; font-weight: 800; color: ${text}; line-height: 1; }
    .pw .logo-tag { font-size: 10px; color: ${muted}; letter-spacing: 1.5px; text-transform: uppercase; }
    .pw .nav-links { display: flex; gap: 28px; list-style: none; }
    .pw .nav-links a { color: ${light}; font-size: 14px; font-weight: 500; text-decoration: none; transition: color 0.2s; }
    .pw .nav-links a:hover { color: ${accent}; }
    .pw .nav-cta { background: ${accent}; color: #fff; padding: 10px 20px; border-radius: ${radius}; font-weight: 700; font-size: 14px; text-decoration: none; display: inline-block; transition: opacity 0.2s; }
    .pw .nav-cta:hover { opacity: 0.88; }

    /* Hero */
    .pw .hero { position: relative; height: 88vh; min-height: 560px; max-height: 820px; overflow: hidden; display: flex; align-items: center; }
    .pw .hero-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 25%; }
    .pw .hero-ov { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.64) 52%, rgba(0,0,0,0.24) 100%); }
    .pw .hero-con { position: relative; z-index: 2; max-width: 1100px; margin: 0 auto; padding: 0 24px; width: 100%; }
    .pw .hero-tag { display: inline-block; border: 1px solid ${accent}; color: ${accent}; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; padding: 6px 14px; border-radius: ${radius}; margin-bottom: 20px; }
    .pw .hero-title { font-size: clamp(40px, 6vw, 74px); font-weight: 800; line-height: 1.05; letter-spacing: -2px; color: ${text}; max-width: 620px; margin-bottom: 18px; }
    .pw .hero-title span { color: ${accent}; }
    .pw .hero-sub { font-size: 18px; color: rgba(255,255,255,0.78); max-width: 500px; margin-bottom: 34px; line-height: 1.65; }
    .pw .hero-btns { display: flex; gap: 14px; flex-wrap: wrap; }
    .pw .btn-p { background: ${accent}; color: #fff; padding: 15px 30px; border-radius: ${radius}; font-weight: 700; font-size: 15px; text-decoration: none; display: inline-block; transition: opacity 0.2s; }
    .pw .btn-p:hover { opacity: 0.88; }
    .pw .btn-o { border: 2px solid rgba(255,255,255,0.42); color: ${text}; padding: 13px 28px; border-radius: ${radius}; font-weight: 600; font-size: 15px; text-decoration: none; display: inline-block; transition: border-color 0.2s, color 0.2s; }
    .pw .btn-o:hover { border-color: ${accent}; color: ${accent}; }
    .pw .hero-badges { display: flex; gap: 24px; margin-top: 36px; flex-wrap: wrap; }
    .pw .hbadge { display: flex; align-items: center; gap: 8px; font-size: 13px; color: rgba(255,255,255,0.66); }
    .pw .bdot { width: 7px; height: 7px; background: ${accent}; border-radius: 50%; flex-shrink: 0; }

    /* Sections */
    .pw .sec { padding: 80px 0; }
    .pw .sec-alt { background: ${bg2}; }
    .pw .sec-dark { background: ${bg3}; }
    .pw .slbl { font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: ${accent}; margin-bottom: 10px; }
    .pw .stitle { font-size: clamp(28px, 4vw, 42px); font-weight: 800; color: ${text}; letter-spacing: -1px; margin-bottom: 12px; line-height: 1.1; }
    .pw .ssub { font-size: 16px; color: ${muted}; max-width: 520px; line-height: 1.7; }
    .pw .shdr { margin-bottom: 48px; }
    .pw .dvdr { width: 44px; height: 3px; background: ${accent}; margin: 14px 0 18px; }

    /* Services */
    .pw .svc-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; overflow: hidden; }
    .pw .svc { background: ${bg2}; padding: 26px 28px; }
    .pw .svc-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; }
    .pw .svc-name { font-size: 17px; font-weight: 700; color: ${text}; }
    .pw .svc-price { font-size: 18px; font-weight: 800; color: ${accent}; white-space: nowrap; margin-left: 12px; }
    .pw .svc-desc { font-size: 14px; color: ${muted}; line-height: 1.6; }

    /* Gallery */
    .pw .gal-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
    .pw .gal-item { overflow: hidden; border-radius: 6px; }
    .pw .gal-item img { width: 100%; aspect-ratio: 4/3; object-fit: cover; object-position: center; transition: transform 0.4s; }
    .pw .gal-item:hover img { transform: scale(1.04); }

    /* About */
    .pw .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
    .pw .about-img { width: 100%; aspect-ratio: 4/5; object-fit: cover; border-radius: 8px; }
    .pw .about-text p { color: ${light}; line-height: 1.8; font-size: 15px; margin-bottom: 16px; }
    .pw .stats { display: flex; gap: 32px; margin-top: 32px; padding-top: 28px; border-top: 1px solid rgba(255,255,255,0.08); flex-wrap: wrap; }
    .pw .stat-num { font-size: 30px; font-weight: 800; color: ${accent}; display: block; }
    .pw .stat-lbl { font-size: 11px; color: ${muted}; text-transform: uppercase; letter-spacing: 1px; }

    /* Reviews */
    .pw .rv-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
    .pw .rv { background: ${bg2}; border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; padding: 28px; }
    .pw .rv-text { font-size: 15px; color: ${light}; line-height: 1.7; margin-bottom: 14px; font-style: italic; }
    .pw .rv-name { font-size: 13px; font-weight: 700; color: ${accent}; }

    /* Contact */
    .pw .ct-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
    .pw .ct-block { background: ${bg2}; border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; padding: 36px; }
    .pw .ct-block h3 { font-size: 20px; font-weight: 700; color: ${text}; margin-bottom: 22px; }
    .pw .hr-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 14px; }
    .pw .hr-day { color: ${muted}; }
    .pw .hr-time { color: ${text}; font-weight: 500; }
    .pw .ci { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 18px; }
    .pw .ci-icon { width: 36px; height: 36px; background: rgba(255,255,255,0.07); border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; }
    .pw .ci-lbl { font-size: 11px; color: ${muted}; text-transform: uppercase; letter-spacing: 1px; }
    .pw .ci-val { font-size: 15px; color: ${text}; font-weight: 500; }
    .pw .cta-btn { background: ${accent}; color: #fff; display: block; text-align: center; padding: 16px; border-radius: ${radius}; font-weight: 800; font-size: 16px; text-decoration: none; margin-top: 24px; transition: opacity 0.2s; }
    .pw .cta-btn:hover { opacity: 0.88; }

    /* Footer */
    .pw .footer { background: ${bg}; border-top: 1px solid rgba(255,255,255,0.06); padding: 28px 24px; }
    .pw .footer-in { max-width: 1100px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
    .pw .f-copy { font-size: 13px; color: ${muted}; }
    .pw .f-badge { font-size: 11px; color: rgba(136,136,136,0.55); }
    .pw .f-badge a { color: ${accent}; opacity: 0.7; text-decoration: none; }
    .pw .f-badge a:hover { opacity: 1; }

    /* Preview banner */
    .pw .preview-bar { background: linear-gradient(90deg, #0f0f0f, #1a1a1a); border-bottom: 1px solid rgba(255,255,255,0.1); padding: 10px 24px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; }
    .pw .preview-bar-text { font-size: 12px; color: rgba(255,255,255,0.55); }
    .pw .preview-bar-url { font-size: 11px; color: ${accent}; font-family: monospace; word-break: break-all; }

    /* Responsive */
    @media (max-width: 768px) {
      .pw .nav-links { display: none; }
      .pw .gal-grid { grid-template-columns: repeat(2, 1fr); }
      .pw .about-grid { grid-template-columns: 1fr; }
      .pw .ct-grid { grid-template-columns: 1fr; }
      .pw .hero-title { letter-spacing: -1px; }
      .pw .preview-bar { flex-direction: column; align-items: flex-start; }
    }
    @media (max-width: 480px) {
      .pw .gal-grid { grid-template-columns: 1fr; }
      .pw .stats { gap: 16px; }
      .pw .hero-badges { flex-direction: column; gap: 10px; }
    }
  `;

  const city = 'Detroit, MI';
  const phone = '(313) 555-0100';
  const address = '1234 Woodward Ave';

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="pw">

        {/* ── Preview banner ── */}
        <div className="preview-bar">
          <span className="preview-bar-text">
            🔗 <strong style={{ color: 'rgba(255,255,255,0.75)' }}>Demo Preview</strong> — This is how {company}&apos;s website could look. Built by Caliber Web Studio.
          </span>
          <span className="preview-bar-url">
            caliberwebstudio.com → {company}
          </span>
        </div>

        {/* ── Announce bar ── */}
        <div className="announce">{tmpl.announceBar}</div>

        {/* ── Nav ── */}
        <nav className="nav">
          <div className="nav-in">
            <div className="logo-wrap">
              {logo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logo} alt={`${company} logo`} className="logo-img" />
              )}
              <div>
                <div className="logo-name">{company}</div>
                <div className="logo-tag">{tmpl.label} · {city}</div>
              </div>
            </div>
            <ul className="nav-links">
              <li><a href="#services">Services</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
            <a href="#contact" className="nav-cta">{tmpl.navCta}</a>
          </div>
        </nav>

        {/* ── Hero ── */}
        <section className="hero">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={tmpl.heroImg} alt={tmpl.heroAlt} className="hero-img" />
          <div className="hero-ov" />
          <div className="hero-con">
            <div className="hero-tag">{tmpl.label} · {city}</div>
            <h1 className="hero-title">
              {tmpl.heroLines[0]}<br />
              <span>{tmpl.heroLines[1]}</span><br />
              {tmpl.heroLines[2]}
            </h1>
            <p className="hero-sub">{tmpl.tagline}</p>
            <div className="hero-btns">
              <a href="#contact" className="btn-p">{tmpl.ctaLabel}</a>
              <a href="#services" className="btn-o">{tmpl.ctaLabel2}</a>
            </div>
            <div className="hero-badges">
              <div className="hbadge"><div className="bdot" /><span>{tmpl.badge1}</span></div>
              <div className="hbadge"><div className="bdot" /><span>{tmpl.badge2}</span></div>
              <div className="hbadge"><div className="bdot" /><span>{tmpl.badge3}</span></div>
            </div>
          </div>
        </section>

        {/* ── Services ── */}
        <section className="sec" id="services">
          <div className="con">
            <div className="shdr">
              <div className="slbl">{tmpl.servicesLabel}</div>
              <h2 className="stitle">Services &amp; Pricing</h2>
              <div className="dvdr" />
              <p className="ssub">Everything you need, done right the first time. Transparent pricing, no surprises.</p>
            </div>
            <div className="svc-grid">
              {tmpl.services.map(s => (
                <div className="svc" key={s.name}>
                  <div className="svc-top">
                    <div className="svc-name">{s.name}</div>
                    <div className="svc-price">{s.price}</div>
                  </div>
                  <div className="svc-desc">{s.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Gallery ── */}
        <section className="sec sec-alt" id="gallery">
          <div className="con">
            <div className="shdr">
              <div className="slbl">Our Work</div>
              <h2 className="stitle">{tmpl.galleryTitle}</h2>
              <div className="dvdr" />
              <p className="ssub">{tmpl.gallerySubtitle}</p>
            </div>
            <div className="gal-grid">
              {tmpl.gallery.map((img, i) => (
                <div className="gal-item" key={i}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.url} alt={img.alt} loading={i > 2 ? 'lazy' : 'eager'} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── About ── */}
        <section className="sec sec-dark" id="about">
          <div className="con">
            <div className="about-grid">
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={tmpl.aboutImg} alt={`About ${company}`} className="about-img" />
              </div>
              <div className="about-text">
                <div className="slbl">Our Story</div>
                <h2 className="stitle">
                  {tmpl.aboutTitle[0]}<br />
                  <span style={{ color: accent }}>{tmpl.aboutTitle[1]}</span>
                </h2>
                <div className="dvdr" />
                <p>{tmpl.aboutText}</p>
                <p>{tmpl.aboutText2}</p>
                <div className="stats">
                  {tmpl.stats.map(s => (
                    <div key={s.label}>
                      <span className="stat-num">{s.num}</span>
                      <span className="stat-lbl">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Reviews ── */}
        <section className="sec sec-alt">
          <div className="con">
            <div className="shdr">
              <div className="slbl">{tmpl.reviewsLabel}</div>
              <h2 className="stitle">What People Say</h2>
              <div className="dvdr" />
            </div>
            <div className="rv-grid">
              {tmpl.reviews.map((r, i) => (
                <div className="rv" key={i}>
                  <Stars count={r.stars} accent={accent} />
                  <p className="rv-text">&ldquo;{r.text}&rdquo;</p>
                  <div className="rv-name"— {r.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Hours & Contact ── */}
        <section className="sec" id="contact">
          <div className="con">
            <div className="shdr">
              <div className="slbl">Reach Us</div>
              <h2 className="stitle">Hours &amp; Contact</h2>
              <div className="dvdr" />
            </div>
            <div className="ct-grid">
              <div className="ct-block">
                <h3>Hours of Operation</h3>
                {tmpl.hours.map(h => (
                  <div className="hr-row" key={h.day}>
                    <span className="hr-day">{h.day}</span>
                    <span className="hr-time">{h.hours}</span>
                  </div>
                ))}
              </div>
              <div className="ct-block">
                <h3>Get In Touch</h3>
                <div className="ci">
                  <div className="ci-icon">📍</div>
                  <div>
                    <div className="ci-lbl">Address</div>
                    <div className="ci-val">{address}<br />{city}</div>
                  </div>
                </div>
                <div className="ci">
                  <div className="ci-icon">📞</div>
                  <div>
                    <div className="ci-lbl">Phone</div>
                    <div className="ci-val">{phone}</div>
                  </div>
                </div>
                <div className="ci">
                  <div className="ci-icon">✉️</div>
                  <div>
                    <div className="ci-lbl">Email</div>
                    <div className="ci-val">info@{company.toLowerCase().replace(/\\s+/g, '').replace(/[^a-z0-9]/g, '')}.com</div>
                  </div>
                </div>
                <a href={`tel:${phone.replace(/\\D/g, '')}`} className="cta-btn">
                  {tmpl.ctaLabel}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="footer">
          <div className="footer-in">
            <div className="f-copy">
              © {new Date().getFullYear()} {company} · {address}, {city}
            </div>
            <div className="f-badge">
              Website by{' '}
              <a href="https://caliberwebstudio.com" target="_blank" rel="noopener noreferrer">
                Caliber Web Studio
              </a>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
