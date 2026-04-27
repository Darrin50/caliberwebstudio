export interface MedSpaTemplateProvider {
  name: string
  title: string
  credentials: string
  philosophy: string
  photo?: string
}

export interface MedSpaTemplateConfig {
  businessName: string
  tagline: string
  location: string
  seoCity: string
  phone?: string
  email?: string
  bookingUrl?: string
  heroHeadline: string
  heroSub: string
  heroImg?: string
  logoImg?: string
  accentColor: string
  providers: MedSpaTemplateProvider[]
  servicePathways: {
    category: string
    icon: string
    treatments: string[]
    description: string
  }[]
  financing?: string[]
  announceBar?: string
  logoHref?: string
}

export const TREATMENT_GOALS = [
  { goal: 'Look Younger', icon: '✦', treatments: ['Botox & Dysport', 'Dermal Fillers', 'RF Microneedling', 'Chemical Peels'] },
  { goal: 'Smooth Skin', icon: '◇', treatments: ['HydraFacial', 'Microneedling', 'Laser Resurfacing', 'Dermaplaning'] },
  { goal: 'Body Contouring', icon: '◎', treatments: ['CoolSculpting', 'Radio-Frequency Body', 'Cavitation', 'Lymphatic Drainage'] },
  { goal: 'Hair Removal', icon: '∿', treatments: ['Laser Hair Removal', 'IPL Hair Reduction', 'Electrolysis Consult'] },
  { goal: 'Clear Complexion', icon: '○', treatments: ['Acne Facial', 'BroadBand Light', 'PRP Facial', 'Retinol Peel'] },
  { goal: 'Total Wellness', icon: '⊕', treatments: ['IV Therapy', 'Medical Weight Loss', 'Hormone Balance', 'Peptide Therapy'] },
]

export const APPROVED_GALLERY_COPY = `Approved Before + After Gallery Goes Here

This section is designed for real patient photos, treatment notes, consent-approved testimonials, and realistic expectations. In a live build, we would only publish approved assets provided by the practice.`
