import type { MedSpaTemplateConfig } from './med-spa-new-template-data'

export interface PreviewSpaEntry {
  hash: string
  config: MedSpaTemplateConfig
}

const previewSpas: PreviewSpaEntry[] = [
  {
    hash: 'a4rx8k2p',
    config: {
      businessName: 'Aesthetic RX',
      tagline: 'Where Science Meets Beauty in Novi, MI',
      location: 'Novi, MI',
      seoCity: 'Novi',
      phone: '(313) 263-6343',
      bookingUrl: undefined,
      heroHeadline: 'Precision Aesthetics *You Can See*',
      heroSub: 'Injectables, laser treatments, and advanced skin care — performed by certified providers in Novi, MI.',
      heroImg: '/mocks/aesthetic-rx/aesthetic-rx-hero-01.png',
      accentColor: '#3D5A80',
      providers: [
        {
          name: 'Alison',
          title: 'Founder & Lead Injector',
          credentials: 'PA-C · Physician Assistant — Certified',
          philosophy: 'Beautiful results start with listening. I take the time to understand what you actually want, not just what you think you need to ask for.',
        },
        {
          name: 'Jenna',
          title: 'Injector',
          credentials: 'Certified Aesthetic Injector',
          philosophy: '',
        },
        {
          name: 'Jennie',
          title: 'Esthetician & Skincare Specialist',
          credentials: 'Licensed Esthetician',
          philosophy: '',
        },
      ],
      servicePathways: [
        {
          category: 'Injectables',
          icon: '◇',
          treatments: ['Botox & Dysport', 'Dermal Fillers', 'Lip Enhancement', 'Jawline Contouring'],
          description: 'Natural, precise injectable treatments to refresh, restore, and refine — always calibrated to your anatomy.',
        },
        {
          category: 'Laser & Energy',
          icon: '✦',
          treatments: ['Laser Hair Removal', 'IPL Photofacial', 'Skin Resurfacing', 'Vascular Treatments'],
          description: 'FDA-cleared laser and energy-based treatments for permanent hair reduction, tone correction, and texture improvement.',
        },
        {
          category: 'Skin Care',
          icon: '○',
          treatments: ['HydraFacial', 'Chemical Peels', 'Dermaplaning', 'Microneedling'],
          description: 'Medical-grade facials and skin treatments that deliver real clinical results — not just relaxation.',
        },
        {
          category: 'Wellness',
          icon: '⊕',
          treatments: ['IV Therapy', 'Skin Boosters', 'Vitamin Injections', 'Collagen Therapy'],
          description: 'Support your skin health and overall wellness from the inside out with medically guided wellness treatments.',
        },
        {
          category: 'Body',
          icon: '◎',
          treatments: ['Body Contouring', 'Cellulite Reduction', 'Skin Tightening', 'Spot Reduction'],
          description: 'Non-invasive body shaping treatments that sculpt and tighten without surgery or downtime.',
        },
        {
          category: 'Membership',
          icon: '∿',
          treatments: ['Monthly Facial Plan', 'Injectable Credits', 'Priority Booking', 'Member Events'],
          description: 'Consistent care delivers consistent results. Our membership program makes premium treatments accessible year-round.',
        },
      ],
      financing: [],
      announceBar: 'Now accepting new clients · Book your complimentary consultation today',
    },
  },

  {
    hash: 's9la3f7q',
    config: {
      businessName: 'SeLa Medical & Holistic Spa',
      tagline: 'Integrative Beauty & Wellness in Birmingham, MI',
      location: 'Birmingham, MI',
      seoCity: 'Birmingham',
      phone: '(248) 789-0687',
      bookingUrl: undefined,
      heroHeadline: 'Beauty That Honors the *Whole You*',
      heroSub: 'Medical aesthetics, holistic wellness, and integrative skincare — rooted in natural healing principles. Serving Birmingham, MI.',
      heroImg: '/mocks/sela-medical-holistic-spa/sela-medical-holistic-spa-hero-01.png',
      logoImg: '/mocks/sela-medical-holistic-spa/sela-medical-holistic-spa-logo-01.png',
      accentColor: '#4A7C59',
      providers: [
        {
          name: 'Seya Murray',
          title: 'Founder & Lead Practitioner',
          credentials: 'LMT · Licensed Aesthetician · Certified Herbalist · Reiki Practitioner · Sound & Vibration Practitioner',
          philosophy: 'True beauty is a reflection of inner balance. My practice bridges medical-grade aesthetics with holistic modalities so your results feel as good as they look.',
        },
      ],
      servicePathways: [
        {
          category: 'Injectables',
          icon: '◇',
          treatments: ['Botox & Neurotoxins', 'Dermal Fillers', 'Lip Augmentation', 'Facial Balancing'],
          description: 'Precisely administered injectables with a holistic lens — enhancing your features while maintaining natural harmony and facial balance.',
        },
        {
          category: 'Skin Care',
          icon: '○',
          treatments: ['Custom Facials', 'Herbal Enzyme Peels', 'Microdermabrasion', 'LED Light Therapy'],
          description: 'Advanced skin treatments combined with natural botanical ingredients to restore radiance, clarity, and skin health.',
        },
        {
          category: 'Body & Wellness',
          icon: '◎',
          treatments: ['Body Wraps', 'Lymphatic Massage', 'Infrared Sauna', 'Detox Treatments'],
          description: 'Full-body wellness experiences that reduce inflammation, support lymphatic health, and restore natural vitality.',
        },
        {
          category: 'Wellness',
          icon: '⊕',
          treatments: ['Reiki Sessions', 'Sound Healing', 'Aromatherapy', 'Guided Wellness Plans'],
          description: 'Integrative modalities including Reiki, sound therapy, and certified herbalism to complement your aesthetic treatments.',
        },
        {
          category: 'Laser & Energy',
          icon: '✦',
          treatments: ['Laser Hair Removal', 'Skin Toning', 'Photofacial', 'Pigmentation Correction'],
          description: 'Medical-grade laser and energy treatments for lasting hair reduction and significant skin tone improvements.',
        },
        {
          category: 'Membership',
          icon: '∿',
          treatments: ['Wellness Monthly Plan', 'Facial + Massage Bundles', 'Holistic Care Package', 'Priority Scheduling'],
          description: 'A consistent wellness practice yields the best results. Our memberships offer monthly treatments, herbalist consultations, and member-only perks.',
        },
      ],
      financing: [],
      announceBar: 'Integrative aesthetics · Medical & holistic care · Birmingham, MI',
    },
  },

  {
    hash: 'b6gm2x5n',
    config: {
      businessName: 'Beauty and Glamour Med Spa',
      tagline: 'Luxury Medical Aesthetics in Southfield, MI',
      location: 'Southfield, MI',
      seoCity: 'Southfield',
      phone: '(248) 592-7385',
      bookingUrl: undefined,
      heroHeadline: 'Your Most *Confident* Self Starts Here',
      heroSub: 'Body contouring, injectables, and advanced skin care — delivered by a registered nurse with clinical precision and personalized care.',
      heroImg: '/mocks/beauty-and-glamour-med-spa/beauty-and-glamour-med-spa-hero-01.png',
      logoImg: '/mocks/beauty-and-glamour-med-spa/beauty-and-glamour-med-spa-asset-01.png',
      accentColor: '#7B3F6E',
      providers: [
        {
          name: 'RN Founder',
          title: 'Registered Nurse · Founder',
          credentials: 'Registered Nurse (RN) · Medical Aesthetic Specialist',
          philosophy: 'Every client who walks through my door deserves clinical-grade care in a warm, welcoming space. Results matter. So does how you feel getting there.',
        },
      ],
      servicePathways: [
        {
          category: 'Body',
          icon: '◎',
          treatments: ['CoolSculpting', 'Body Contouring', 'Wood Therapy', 'Ultrasound Cavitation'],
          description: 'Non-surgical body sculpting treatments that target stubborn fat, tighten skin, and reshape your silhouette — no downtime, real results.',
        },
        {
          category: 'Injectables',
          icon: '◇',
          treatments: ['Botox & Dysport', 'Dermal Fillers', 'Lip Filler', 'Cheek Enhancement'],
          description: 'Expert injectable treatments administered by a registered nurse — natural-looking results that enhance without erasing.',
        },
        {
          category: 'Skin Care',
          icon: '○',
          treatments: ['HydraFacial', 'Microneedling', 'Chemical Peels', 'Acne Treatments'],
          description: 'Clinical-grade facial treatments to address hyperpigmentation, acne, fine lines, and uneven texture — for every skin tone.',
        },
        {
          category: 'Wellness',
          icon: '⊕',
          treatments: ['IV Drip Therapy', 'B12 Injections', 'Glutathione IV', 'Wellness Consultations'],
          description: 'Medically guided IV and injection therapies to boost energy, enhance skin radiance, and support your health goals from the inside out.',
        },
        {
          category: 'Laser & Energy',
          icon: '✦',
          treatments: ['Laser Hair Removal', 'Skin Tightening', 'Radio-Frequency', 'Pigmentation Correction'],
          description: 'FDA-cleared energy and laser treatments for permanent hair reduction and significant improvements in tone and texture.',
        },
        {
          category: 'Membership',
          icon: '∿',
          treatments: ['Monthly Body Plan', 'Skin + Injectable Credits', 'VIP Priority Booking', 'Member Pricing'],
          description: 'Our wellness membership gives you priority access, discounted treatments, and a dedicated care plan — all for a predictable monthly rate.',
        },
      ],
      financing: ['CareCredit'],
      announceBar: 'CareCredit financing available · Book your free consultation · Southfield, MI',
    },
  },

  // ── Avenue 1 Aesthetics · Royal Oak, MI · /preview/a1v9n5r3 ──
  // Logo: downloaded from Webflow CDN (cdn.prod.website-files.com/…/avenueone.png) 2026-04-27
  // Providers: Dr. Matthew Rontal + Dr. Daniel Rontal (ENT surgeons, U of M) + Lindsi McAlister (NP, MSN, ACNP-BC)
  // Hero/section images: AI concept imagery pending — see image prompts doc in /public/mocks/avenue-1-aesthetics/
  {
    hash: 'a1v9n5r3',
    config: {
      businessName: 'Avenue 1 Aesthetics',
      tagline: 'ENT Surgeon-Led Medical Aesthetics in Royal Oak, MI',
      location: 'Royal Oak, MI',
      seoCity: 'Royal Oak',
      phone: '(248) 254-8211',
      email: undefined,
      bookingUrl: undefined,
      logoHref: 'https://caliberwebstudio.com/med-lab',
      heroHeadline: 'Surgeon Precision. *Aesthetic* Vision.',
      heroSub: 'Two board-certified ENT surgeons bring facial anatomy expertise no injector-only practice can match. Advanced injectables, Morpheus8, Evoke, and laser treatments — delivered with surgical judgment at every step.',
      heroImg: '/mocks/avenue-1-aesthetics/avenue-1-hero-01.jpg',
      logoImg: '/mocks/avenue-1-aesthetics/avenue-1-aesthetics-logo.png',
      accentColor: '#1A3A6B',
      announceBar: 'ENT Surgeon-Led Practice &nbsp;·&nbsp; Injectables · Morpheus8 · Evoke &nbsp;·&nbsp; Royal Oak, MI &nbsp;·&nbsp; <span style="font-weight:700">(248) 254-8211</span>',
      providers: [
        {
          name: 'Dr. Matthew Rontal',
          title: 'Co-Founder · ENT Surgeon',
          credentials: 'MD · Board-Certified ENT Surgeon · University of Michigan Residency · 15+ Years Facial Anatomy, Reconstructive & Aesthetic Surgery',
          philosophy: 'Aesthetic medicine is an extension of everything we do as surgeons — understanding facial anatomy at a depth most aesthetic providers never reach. We built Avenue 1 because our patients deserved a practice where every injection, every device setting, every treatment plan is backed by real surgical judgment.',
        },
        {
          name: 'Dr. Daniel Rontal',
          title: 'Co-Founder · ENT Surgeon',
          credentials: 'MD · Board-Certified ENT Surgeon · University of Michigan Residency · Specialization in Reconstructive & Aesthetic Facial Surgery',
          philosophy: '',
        },
        {
          name: 'Lindsi McAlister',
          title: 'Nurse Practitioner',
          credentials: 'MSN, ACNP-BC · Advanced Clinical Nurse Practitioner · 15 Years Critical Care & Surgical Nursing · Aesthetic Care Specialist',
          philosophy: '',
        },
      ],
      servicePathways: [
        {
          category: 'Injectables',
          icon: '◇',
          treatments: ['Botox & Dysport', 'Dermal Fillers (Restylane & RHA)', 'Lip Flip & Enhancement', 'Jawline & Facial Balancing'],
          description: 'Neuromodulators and fillers administered by a team with ENT surgical anatomy training — calibrated to your facial structure for results that look natural because they are.',
        },
        {
          category: 'Energy & RF',
          icon: '✦',
          treatments: ['Morpheus8 RF Microneedling', 'Evoke Non-Surgical Facelift', 'Forma RF (Red Carpet Facial)', 'Evolve Transform Body Toning'],
          description: "InMode's leading RF and body-contouring platforms — Morpheus8, Evoke, and Forma — delivered by a practice with the anatomy expertise to maximize every treatment outcome.",
        },
        {
          category: 'Laser & IPL',
          icon: '∿',
          treatments: ['Lumecca IPL Photofacial', 'Laser Hair Removal', 'Pigmentation Correction', 'Vascular & Redness Treatment'],
          description: 'Precision light-based treatments for lasting hair reduction, tone correction, and skin clarity — calibrated for your skin type by a medically trained team.',
        },
        {
          category: 'Skin Care',
          icon: '○',
          treatments: ['PRP Skin Rejuvenation', 'VI Chemical Peels', 'Medical Grade Skincare', 'Personalized Skin Plans'],
          description: 'Clinical-grade skin treatments backed by surgical-level knowledge of skin anatomy. Peels, PRP, and medical skincare protocols that deliver visible, lasting results.',
        },
        {
          category: 'Hair Restoration',
          icon: '⊕',
          treatments: ['PRP Hair Restoration', 'Hair Loss Consultation', 'Laser Hair Therapy', 'Physician-Led Hair Assessment'],
          description: 'PRP-based hair restoration with physician-level assessment behind every recommendation. Understand the root cause — then treat it with clinical precision.',
        },
        {
          category: 'Membership',
          icon: '◎',
          treatments: ['Monthly Injectable Credits', 'Quarterly Skin Treatment', 'Laser Session Package', 'Priority Scheduling'],
          description: 'Consistent care from a surgeon-led team — at a predictable monthly rate. Our membership keeps Royal Oak clients looking their best year-round with priority access and member pricing.',
        },
      ],
      financing: ['CareCredit', 'Cherry Financing'],
    },
  },

  // ── Lure Aesthetics · Royal Oak, MI · /preview/lx7p2q8r ──
  // Logo: Notion Logo property has file "Serenity_Health_Logo.png" — filename mismatch, pending Darrin confirm.
  // Until confirmed, logoImg is unset and the text wordmark renders instead.
  {
    hash: 'lx7p2q8r',
    config: {
      businessName: 'Lure Aesthetics',
      tagline: "Royal Oak's Premier Med Spa — Finally Visible Online",
      location: 'Royal Oak, MI',
      seoCity: 'Royal Oak',
      phone: '(248) 803-0030',
      bookingUrl: undefined,
      logoHref: 'https://caliberwebstudio.com/med-lab',
      heroHeadline: 'Royal Oak\'s *Lure* — The Med Spa That *Finally Shows Up*',
      heroSub: 'Botox · Fillers · Laser · Advanced Skin — for the woman who wants real results, delivered by a practice that\'s actually easy to find, book, and trust.',
      logoImg: '/mocks/lure-aesthetics/lure-aesthetics-logo-01.png',
      heroImg: '/mocks/lure-aesthetics/lure-aesthetics-hero-01.jpg',
      accentColor: '#7A2E4B',
      announceBar: 'Now accepting new clients · Lure Aesthetics · Royal Oak, MI · <span>Call (248) 803-0030</span>',
      providers: [
        {
          name: 'Lure Aesthetics Team',
          title: 'Licensed Aesthetic Professionals',
          credentials: '⚑ Provider credentials not confirmed from recon — verify via IG or direct outreach before live build. Never invent credentials.',
          philosophy: 'Royal Oak deserves a med spa that earns trust — through precision, transparency, and results you can see. We built Lure for women who want to feel like the best version of themselves, not a before-and-after photo.',
        },
      ],
      servicePathways: [
        {
          category: 'Injectables',
          icon: '◇',
          treatments: ['Botox & Dysport', 'Dermal Fillers', 'Lip Enhancement', 'Jawline & Chin Contouring'],
          description: 'Natural, precise injectable treatments designed to refresh and refine — never freeze, never overcorrect. Always calibrated to your anatomy and goals.',
        },
        {
          category: 'Laser & Energy',
          icon: '✦',
          treatments: ['Laser Hair Removal', 'IPL Photofacial', 'Skin Resurfacing', 'Vascular Treatments'],
          description: 'FDA-cleared laser and energy-based treatments for permanent hair reduction, pigmentation correction, and measurable skin tone improvement.',
        },
        {
          category: 'Skin Care',
          icon: '○',
          treatments: ['HydraFacial', 'Chemical Peels', 'Dermaplaning', 'RF Microneedling'],
          description: 'Medical-grade facials and advanced skin treatments that deliver clinical results — not just relaxation. Your skin, visibly improved.',
        },
        {
          category: 'Body',
          icon: '◎',
          treatments: ['Body Contouring', 'Cellulite Reduction', 'Skin Tightening', 'Ultrasound Cavitation'],
          description: 'Non-invasive body shaping treatments that sculpt and tighten without surgery, without downtime, and without compromise.',
        },
        {
          category: 'Wellness',
          icon: '⊕',
          treatments: ['IV Infusion Therapy', 'B12 + Vitamin Shots', 'Collagen Boosters', 'Skin Health Plans'],
          description: 'Support your skin and overall vitality from the inside out — medically guided wellness services that complement every aesthetic treatment.',
        },
        {
          category: 'Membership',
          icon: '∿',
          treatments: ['Monthly Facial Plan', 'Injectable Credit Package', 'Priority Booking', 'Member-Only Events'],
          description: 'Consistent care delivers consistent results. Our membership makes premium Royal Oak aesthetics accessible — and keeps you looking your best year-round.',
        },
      ],
      financing: ['CareCredit', 'Cherry Financing'],
    },
  },
]

export function getPreviewSpa(hash: string): PreviewSpaEntry | undefined {
  return previewSpas.find((p) => p.hash === hash)
}

export function getAllPreviewSpas(): PreviewSpaEntry[] {
  return previewSpas
}
