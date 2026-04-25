import type { MedSpaTemplateConfig } from './med-spa-new-template-data'

export interface DemoLibraryEntry {
  slug: string
  industry: string
  demoSlug: string
  fakeName: string
  description: string
  highlights: string[]
  accentColor: string
}

/** Ex-portfolio demos (barbershop, salon, restaurant, plumbing) */
export const portfolioDemos: DemoLibraryEntry[] = [
  {
    slug: 'precision-cuts',
    industry: 'Barbershop',
    demoSlug: 'detroit-cuts',
    fakeName: 'Precision Cuts Barbershop',
    description: 'A full-stack digital presence for a Detroit-area barbershop — online booking, gallery, AI chatbot, and local SEO.',
    highlights: ['Online booking system', 'Photo gallery', 'AI after-hours chatbot', 'Google Maps integration', 'Click-to-call mobile bar'],
    accentColor: '#C9A84C',
  },
  {
    slug: 'crown-beauty-studio',
    industry: 'Natural Hair Salon',
    demoSlug: 'luxe-salon',
    fakeName: 'Crown Beauty Studio',
    description: 'Gallery-first salon website built for natural hair — ranking, booking, and review automation for a Detroit-area studio.',
    highlights: ['Full-screen gallery design', 'Online booking flow', 'Service menu with pricing', 'Instagram integration', 'Review automation'],
    accentColor: '#C9956C',
  },
  {
    slug: 'motor-city-kitchen',
    industry: 'Soul Food Restaurant',
    demoSlug: 'detroits-kitchen',
    fakeName: 'Motor City Kitchen',
    description: 'Restaurant site with online menu, catering inquiry form, private events page, and AI chatbot — built for a Detroit soul food spot.',
    highlights: ['Online menu showcase', 'Catering inquiry form', 'Private events page', 'AI FAQ chatbot', 'Google Maps + SEO'],
    accentColor: '#D4A017',
  },
  {
    slug: 'reliable-plumbing-co',
    industry: 'Plumbing / Home Services',
    demoSlug: 'metro-plumbing',
    fakeName: 'Reliable Plumbing Co.',
    description: 'Emergency-first plumbing site with 24/7 lead capture, local SEO structure, and trust signals for a Metro Detroit service company.',
    highlights: ['Emergency CTA above the fold', 'Service area pages', 'AI lead capture chatbot', 'Trust signal sections', 'Google Business optimization'],
    accentColor: '#E8631A',
  },
]

/** Data for the 3 new generic med-spa demos */
export const medSpaDemos: Record<string, MedSpaTemplateConfig> = {
  'med-spa-growth': {
    businessName: 'Luminary Wellness & Aesthetics',
    tagline: 'Premium Med Spa · Southfield, MI',
    location: 'Southfield, MI',
    seoCity: 'Southfield',
    phone: '(248) 555-0291',
    bookingUrl: undefined,
    heroHeadline: 'Glow Brighter. *Age Slower.*',
    heroSub: 'Injectables, skin care, body contouring, and wellness — curated for the modern Detroit woman. Serving Southfield and Metro Detroit.',
    heroImg: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&q=80',
    accentColor: '#6B4E71',
    providers: [
      {
        name: 'Dr. Natalie Reeves',
        title: 'Medical Director',
        credentials: 'MD · Board-Certified Internal Medicine · Aesthetic Medicine Fellowship',
        philosophy: 'The best aesthetic work is invisible — it makes you look like a well-rested, refreshed version of yourself, not a different person entirely.',
      },
      {
        name: 'Amber Cole, NP',
        title: 'Lead Injector & Nurse Practitioner',
        credentials: 'MSN, NP-C · Certified Aesthetic Injector',
        philosophy: '',
      },
    ],
    servicePathways: [
      {
        category: 'Injectables',
        icon: '◇',
        treatments: ['Botox & Dysport', 'Dermal Fillers', 'Lip Enhancement', 'Cheek & Jawline'],
        description: 'Natural, precise injectable treatments to refresh and restore — administered by a board-certified physician and certified nurse practitioner.',
      },
      {
        category: 'Skin',
        icon: '○',
        treatments: ['HydraFacial', 'Chemical Peels', 'Microneedling with PRP', 'Morpheus8'],
        description: 'Clinical-grade facials and energy treatments for significant, lasting improvements in texture, tone, and radiance.',
      },
      {
        category: 'Laser',
        icon: '✦',
        treatments: ['Laser Hair Removal', 'BroadBand Light', 'Skin Resurfacing', 'Vascular Correction'],
        description: 'FDA-cleared laser treatments for permanent hair reduction and dramatic skin tone improvements — safe for diverse skin tones.',
      },
      {
        category: 'Wellness',
        icon: '⊕',
        treatments: ['IV Drip Therapy', 'Medical Weight Loss', 'B12 & Vitamin Injections', 'Hormone Consultation'],
        description: 'Medically supervised wellness programs that complement your aesthetic goals and support your health from the inside out.',
      },
      {
        category: 'Body',
        icon: '◎',
        treatments: ['CoolSculpting', 'Emsculpt', 'Body RF Tightening', 'Cellulite Reduction'],
        description: 'Non-invasive body contouring treatments that sculpt, tighten, and tone without surgery, anesthesia, or recovery time.',
      },
      {
        category: 'Membership',
        icon: '∿',
        treatments: ['Monthly Glow Plan', 'Injectable Credits', 'Laser Packages', 'Wellness Add-ons'],
        description: 'Our membership program delivers monthly treatments, discounted services, and priority booking — making luxury self-care a regular habit.',
      },
    ],
    financing: ['CareCredit', 'Affirm', 'Cherry'],
    announceBar: 'New client special: complimentary consultation · Now serving Southfield & Metro Detroit',
  },

  'aesthetics-clinic': {
    businessName: 'Meridian Skin Studio',
    tagline: 'Advanced Medical Aesthetics · Royal Oak, MI',
    location: 'Royal Oak, MI',
    seoCity: 'Royal Oak',
    phone: '(248) 555-0417',
    bookingUrl: undefined,
    heroHeadline: 'Skin That Speaks *For Itself*',
    heroSub: 'Precision skin treatments, injectables, and laser therapies — for patients who want real, measurable results. Royal Oak, MI.',
    heroImg: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1600&q=80',
    accentColor: '#3A5A7C',
    providers: [
      {
        name: 'Dr. Priya Shah',
        title: 'Founder & Medical Director',
        credentials: 'MD · Dermatology-Trained · Board-Certified in Aesthetic Medicine',
        philosophy: 'Skin is medicine. I treat every patient the way I would want to be treated — with honest expectations, conservative technique, and real science behind every recommendation.',
      },
      {
        name: 'Lauren Tate, PA-C',
        title: 'Physician Assistant — Aesthetics',
        credentials: 'PA-C · Certified Aesthetic Injector · Laser Certified',
        philosophy: '',
      },
    ],
    servicePathways: [
      {
        category: 'Injectables',
        icon: '◇',
        treatments: ['Botox & Dysport', 'Restylane & Juvederm', 'Sculptra', 'Kybella'],
        description: 'Clinically precise injectables with a conservative, natural-results philosophy — every unit planned and every syringe placed with intention.',
      },
      {
        category: 'Skin',
        icon: '○',
        treatments: ['Signature HydraFacial', 'TCA Peels', 'Microneedling', 'Dermaplaning'],
        description: 'Result-driven skin treatments built for your specific skin concerns — not a one-size-fits-all menu.',
      },
      {
        category: 'Laser',
        icon: '✦',
        treatments: ['Laser Hair Removal', 'HALO Hybrid Laser', 'BBL Hero', 'CO2 Resurfacing'],
        description: 'Industry-leading laser platforms for dramatic skin improvement, permanent hair reduction, and precise corrective treatments.',
      },
      {
        category: 'Wellness',
        icon: '⊕',
        treatments: ['IV Therapy', 'Peptide Treatments', 'Skin Booster Injections', 'Nutrition Consultation'],
        description: 'Science-backed wellness treatments that support your skin health, energy, and overall vitality.',
      },
      {
        category: 'Body',
        icon: '◎',
        treatments: ['EmSculpt NEO', 'CoolTone', 'Profound RF', 'Skin Tightening'],
        description: 'Medical-grade body treatments for muscle definition, fat reduction, and skin tightening — results you can see and measure.',
      },
      {
        category: 'Membership',
        icon: '∿',
        treatments: ['Quarterly Skin Plan', 'Injection Credits', 'Laser Prepay Program', 'Concierge Care'],
        description: 'Consistent skin care is cumulative — our membership ensures you stay on track with your treatment plan all year long.',
      },
    ],
    financing: ['CareCredit', 'Alphaeon Credit'],
    announceBar: 'Royal Oak\'s precision aesthetics clinic · Board-certified medical team · Book your skin consult',
  },

  'injectables-studio': {
    businessName: 'Elara Injectable Arts',
    tagline: 'Boutique Injectables & Aesthetics · Detroit, MI',
    location: 'Detroit, MI',
    seoCity: 'Detroit',
    phone: '(313) 555-0639',
    bookingUrl: undefined,
    heroHeadline: 'Injectable Artistry. *Zero Compromise.*',
    heroSub: 'Boutique injectable studio in Detroit — Botox, fillers, skin, and laser treatments by certified aesthetic providers. Natural results, every time.',
    heroImg: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80',
    accentColor: '#7C3D52',
    providers: [
      {
        name: 'Camille Brooks, NP',
        title: 'Founder & Lead Injector',
        credentials: 'MSN, FNP-BC · Certified Aesthetic Injector · AAAASF Safety Trained',
        philosophy: 'I started Elara because I believe great injectable work is an art form — and it should never look like you had "work done." My goal is always for people to notice you look amazing, not why.',
      },
    ],
    servicePathways: [
      {
        category: 'Injectables',
        icon: '◇',
        treatments: ['Botox & Xeomin', 'HA Dermal Fillers', 'Lip Flip & Filler', 'Brow Lift & Bunny Lines'],
        description: 'Our specialty. Precise, artistic injectable treatments — every placement deliberate, every result designed to enhance without announcing itself.',
      },
      {
        category: 'Skin',
        icon: '○',
        treatments: ['Signature Facial', 'Enzyme Peel', 'Microneedling', 'LED Therapy'],
        description: 'Curated skin treatments that complement your injectable results — building long-term skin health alongside immediate improvements.',
      },
      {
        category: 'Laser',
        icon: '✦',
        treatments: ['Laser Hair Removal', 'Photofacial', 'Spot Correction', 'Skin Toning'],
        description: 'Targeted laser treatments for hair removal, skin tone correction, and vascular work — selected for efficacy across all skin tones.',
      },
      {
        category: 'Wellness',
        icon: '⊕',
        treatments: ['Vitamin B12 Shots', 'Skin Booster Injections', 'Lipo-C Injections', 'Wellness Consultation'],
        description: 'Supportive wellness injections and consultations to keep your energy, glow, and confidence at their peak.',
      },
      {
        category: 'Body',
        icon: '◎',
        treatments: ['Body Contouring', 'Skin Tightening', 'Spot Reduction', 'Cellulite Smoothing'],
        description: 'Non-invasive body treatments for targeted shaping and skin quality improvements — no surgery, no downtime.',
      },
      {
        category: 'Membership',
        icon: '∿',
        treatments: ['Quarterly Maintenance Plan', 'Tox Credits', 'Skin Session Credits', 'Priority Access'],
        description: 'Stay ahead of aging with a consistent maintenance plan. Members get lower per-unit pricing, priority booking, and early access to new treatments.',
      },
    ],
    financing: ['CareCredit', 'Cherry'],
    announceBar: 'Detroit\'s boutique injectable studio · Natural results · Book your complimentary consult',
  },
}

export function getMedSpaDemo(slug: string): MedSpaTemplateConfig | undefined {
  return medSpaDemos[slug]
}

export function getPortfolioDemo(slug: string): DemoLibraryEntry | undefined {
  return portfolioDemos.find((d) => d.slug === slug)
}

export const ALL_DEMO_SLUGS = [
  ...portfolioDemos.map((d) => d.slug),
  ...Object.keys(medSpaDemos),
]
