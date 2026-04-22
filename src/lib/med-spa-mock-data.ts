import fs from 'fs'
import path from 'path'
import mockDataFallback from '../../data/med-spa-mocks.json'

export interface MedSpaProvider {
  name: string
  title: string
  credentials: string
  bio: string
  photo?: string
}

export interface MedSpaService {
  name: string
  description: string
  price?: string
  category: string
}

export interface MedSpaBeforeAfter {
  before: string
  after: string
  treatment: string
}

export interface MedSpaMockConfig {
  slug: string
  businessName: string
  location: string
  phone?: string
  email?: string
  website?: string
  socials?: { ig?: string; fb?: string }
  announceBar?: string
  logoImg?: string
  heroHeadline: string
  heroSub: string
  heroImg?: string
  heroTextSide?: 'left' | 'right'
  tagline: string
  about: string
  aboutImg?: string
  providers: MedSpaProvider[]
  services: MedSpaService[]
  beforeAfterGallery: MedSpaBeforeAfter[]
  gallery: { url: string; alt: string }[]
  reviews: { name: string; stars: number; text: string; treatment?: string }[]
  stats: { num: string; label: string }[]
  hours?: { day: string; hours: string }[]
  bookingUrl?: string
  bookingSystem?: 'Boulevard' | 'Vagaro' | 'Acuity' | 'Jane' | 'Mindbody' | 'placeholder'
  ctaLabel?: string
  financing?: string[]
  createdAt: string
  notionPageId: string
}

const DATA_FILE = path.join(process.cwd(), 'data', 'med-spa-mocks.json')

export function getMedSpaMocks(): MedSpaMockConfig[] {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8')
    return JSON.parse(raw) as MedSpaMockConfig[]
  } catch {
    return mockDataFallback as MedSpaMockConfig[]
  }
}

export function getMedSpaMock(slug: string): MedSpaMockConfig | undefined {
  return getMedSpaMocks().find((m) => m.slug === slug)
}

export function saveMedSpaMock(config: MedSpaMockConfig): void {
  const mocks = getMedSpaMocks()
  const idx = mocks.findIndex((m) => m.slug === config.slug)
  if (idx >= 0) {
    mocks[idx] = config
  } else {
    mocks.push(config)
  }
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true })
  fs.writeFileSync(DATA_FILE, JSON.stringify(mocks, null, 2))
}

export function generateMockSlug(businessName: string): string {
  return businessName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 50)
}
