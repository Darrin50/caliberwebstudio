import fs from 'fs'
import path from 'path'

export interface ProspectDemoConfig {
  slug: string
  businessName: string
  businessType: string
  tagline: string
  primaryColor: string
  accentColor: string
  services: { name: string; description: string; price?: string }[]
  hours: { day: string; hours: string }[]
  phone: string
  address: string
  city: string
  about: string
  chatbotGreeting: string
  // Visual / theme data
  heroImg?: string
  gallery: { url: string; alt: string }[]
  reviews: { name: string; stars: number; text: string }[]
  aboutImg?: string
  theme: {
    bg: string
    bg2: string
    bg3: string
    accent: string
    accent2: string
    text: string
    muted: string
    light: string
    radius: string
  }
  announceBar?: string
  stats: { num: string; label: string }[]
  ctaLabel: string
  // Metadata
  website: string
  email?: string
  socials?: Record<string, string>
  createdAt: string
}

const DATA_FILE = path.join(process.cwd(), 'data', 'prospect-demos.json')

export function getProspectDemos(): ProspectDemoConfig[] {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8')
    return JSON.parse(raw) as ProspectDemoConfig[]
  } catch {
    return []
  }
}

export function getProspectDemo(slug: string): ProspectDemoConfig | undefined {
  return getProspectDemos().find((d) => d.slug === slug)
}

export function saveProspectDemo(config: ProspectDemoConfig): void {
  const demos = getProspectDemos()
  const idx = demos.findIndex((d) => d.slug === config.slug)
  if (idx >= 0) {
    demos[idx] = config
  } else {
    demos.push(config)
  }
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true })
  fs.writeFileSync(DATA_FILE, JSON.stringify(demos, null, 2))
}

export function generateProspectSlug(businessName: string): string {
  const base = businessName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40)
  const slug = `prospect-${base}`
  const demos = getProspectDemos()
  if (!demos.find((d) => d.slug === slug)) return slug
  return `${slug}-${Date.now().toString(36)}`
}
