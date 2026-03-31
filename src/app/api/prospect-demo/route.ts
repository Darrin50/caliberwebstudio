import { NextRequest, NextResponse } from 'next/server'
import * as cheerio from 'cheerio'
import {
  saveProspectDemo,
  getProspectDemo,
  generateProspectSlug,
  type ProspectDemoConfig,
} from '@/lib/prospect-demo-data'

// ── Auth helper ────────────────────────────────────────────────────────────────
function checkAuth(req: NextRequest): boolean {
  const auth = req.headers.get('authorization') || ''
  const token = auth.replace(/^Bearer\s+/i, '').trim()
  const adminPassword = process.env.ADMIN_PASSWORD || 'caliber2026'
  return token === adminPassword
}

// ── URL resolution ─────────────────────────────────────────────────────────────
function resolveUrl(src: string, baseUrl: string): string {
  try {
    if (src.startsWith('data:') || src.startsWith('//')) {
      if (src.startsWith('//')) return `https:${src}`
      return src
    }
    return new URL(src, baseUrl).href
  } catch {
    return src
  }
}

// ── Color helpers ──────────────────────────────────────────────────────────────
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = hex.replace('#', '').match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
  if (!m) return null
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) }
}

function darken(hex: string, amount: number): string {
  const rgb = hexToRgb(hex)
  if (!rgb) return '#0a0a0a'
  const r = Math.max(0, Math.round(rgb.r * (1 - amount)))
  const g = Math.max(0, Math.round(rgb.g * (1 - amount)))
  const b = Math.max(0, Math.round(rgb.b * (1 - amount)))
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

function lighten(hex: string, amount: number): string {
  const rgb = hexToRgb(hex)
  if (!rgb) return '#ffffff'
  const r = Math.min(255, Math.round(rgb.r + (255 - rgb.r) * amount))
  const g = Math.min(255, Math.round(rgb.g + (255 - rgb.g) * amount))
  const b = Math.min(255, Math.round(rgb.b + (255 - rgb.b) * amount))
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

// ── Scraper ────────────────────────────────────────────────────────────────────
async function scrapeWebsite(rawUrl: string) {
  // Normalize URL
  const url = rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`

  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      Accept: 'text/html,application/xhtml+xml,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
    },
    signal: AbortSignal.timeout(15000),
    redirect: 'follow',
  })

  const finalUrl = res.url || url
  const html = await res.text()
  const $ = cheerio.load(html)

  // ── Business name ──
  const ogTitle = $('meta[property="og:title"]').attr('content')?.trim()
  const rawTitle = $('title').text().trim()
  const h1Text = $('h1').first().text().trim()
  // Strip common suffixes from title
  const cleanTitle = rawTitle
    .split(/[|\-–—]/)[0]
    .trim()
    .replace(/home\s*$/i, '')
    .trim()
  const businessName = ogTitle || h1Text || cleanTitle || 'Your Business'

  // ── Description / tagline ──
  const ogDesc = $('meta[property="og:description"]').attr('content')?.trim()
  const metaDesc = $('meta[name="description"]').attr('content')?.trim()
  const description = ogDesc || metaDesc || ''

  // Tagline: look for subheading near h1 or short description
  let tagline = ''
  const h1El = $('h1').first()
  const sibling = h1El.next('h2, h3, p, span')
  const siblingText = sibling.text().trim()
  if (siblingText && siblingText.length < 120) tagline = siblingText

  // ── Phone (US formats) ──
  const bodyText = $('body').text()
  const phoneRegex =
    /(?:\+?1[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}(?!\d)/g
  const phoneMatches = bodyText.match(phoneRegex) || []
  // Also check tel: links
  const telLink = $('a[href^="tel:"]').first().attr('href')?.replace('tel:', '').trim()
  const phone = telLink || phoneMatches.find((p) => p.replace(/\D/g, '').length >= 10) || ''

  // ── Email ──
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
  const mailtoLink = $('a[href^="mailto:"]').first().attr('href')?.replace('mailto:', '').split('?')[0].trim()
  const emailMatches = bodyText.match(emailRegex) || []
  const email =
    mailtoLink ||
    emailMatches.find(
      (e) => !e.includes('example.') && !e.includes('sentry.') && !e.includes('@2x')
    ) ||
    ''

  // ── Address ──
  const addressRegex =
    /\d{1,5}\s+[A-Za-z0-9\s.]+(?:St|Ave|Blvd|Dr|Rd|Way|Ln|Ct|Pl|Pkwy|Hwy|Suite|Ste|Fl)[.,\s]+[A-Za-z\s]+,?\s+[A-Z]{2}\s+\d{5}/gi
  const addressMatches = bodyText.match(addressRegex)
  const address = addressMatches?.[0]?.trim() || ''

  // City/state from address or URL
  let city = ''
  if (address) {
    const cityMatch = address.match(/,\s*([A-Za-z\s]+),\s*[A-Z]{2}/)
    if (cityMatch) city = cityMatch[1].trim()
  }

  // ── Services ──
  const services: string[] = []
  // Look for nav items, service section headings, list items in service sections
  const serviceSelectors = [
    '#services h2, #services h3, #services h4',
    '.services h2, .services h3, .services h4',
    '[class*="service"] h2, [class*="service"] h3, [class*="service"] h4',
    'section h3',
    'nav a',
  ]
  for (const sel of serviceSelectors) {
    $(sel).each((_, el) => {
      const text = $(el).text().trim()
      const skip = /home|about|contact|blog|gallery|privacy|terms|faq|menu|location|review/i
      if (text && text.length < 60 && !skip.test(text)) {
        services.push(text)
      }
    })
    if (services.length >= 6) break
  }

  // ── Social links ──
  const socials: Record<string, string> = {}
  $('a[href*="facebook.com"]').each((_, el) => {
    const href = $(el).attr('href')
    if (href && href.includes('facebook.com/') && !href.includes('sharer')) {
      socials.facebook = href
    }
  })
  $('a[href*="instagram.com"]').each((_, el) => {
    const href = $(el).attr('href')
    if (href && href.includes('instagram.com/')) socials.instagram = href
  })
  $('a[href*="twitter.com"], a[href*="x.com"]').each((_, el) => {
    const href = $(el).attr('href')
    if (href) socials.twitter = href
  })
  $('a[href*="yelp.com"]').each((_, el) => {
    const href = $(el).attr('href')
    if (href && href.includes('yelp.com/biz')) socials.yelp = href
  })

  // ── Images ──
  const ogImage = $('meta[property="og:image"]').attr('content')?.trim()

  // Collect page images (skip tiny icons, data URIs, tracking pixels)
  const imageUrls: string[] = []
  $('img').each((_, el) => {
    const src = $(el).attr('src')
    const w = parseInt($(el).attr('width') || '999')
    const h = parseInt($(el).attr('height') || '999')
    if (!src) return
    if (src.startsWith('data:')) return
    if (w < 100 || h < 100) return
    const resolved = resolveUrl(src, finalUrl)
    if (resolved && !imageUrls.includes(resolved)) imageUrls.push(resolved)
  })

  // Also check srcset / lazysrc
  $('img[data-src], img[data-lazy-src], img[data-original]').each((_, el) => {
    const lazySrc =
      $(el).attr('data-src') || $(el).attr('data-lazy-src') || $(el).attr('data-original')
    if (lazySrc && !lazySrc.startsWith('data:')) {
      const resolved = resolveUrl(lazySrc, finalUrl)
      if (resolved && !imageUrls.includes(resolved)) imageUrls.push(resolved)
    }
  })

  // ── Theme color ──
  const themeColor =
    $('meta[name="theme-color"]').attr('content')?.trim() || ''

  // ── Favicon ──
  const favicon =
    $('link[rel="icon"]').attr('href') ||
    $('link[rel="shortcut icon"]').attr('href') ||
    '/favicon.ico'

  return {
    businessName,
    description,
    tagline,
    phone,
    email,
    address,
    city,
    services: [...new Set(services)].slice(0, 8),
    socials,
    ogImage: ogImage ? resolveUrl(ogImage, finalUrl) : '',
    images: imageUrls.slice(0, 20),
    themeColor,
    favicon: resolveUrl(favicon, finalUrl),
    finalUrl,
  }
}

// ── Build theme from extracted color ──────────────────────────────────────────
function buildTheme(primaryHex: string, accentHex: string) {
  const bg = darken(primaryHex, 0.85)
  const bg2 = darken(primaryHex, 0.75)
  const bg3 = darken(primaryHex, 0.65)
  const accent2 = lighten(accentHex, 0.2)
  return {
    bg: bg || '#0a0a0a',
    bg2: bg2 || '#141414',
    bg3: bg3 || '#1e1e1e',
    accent: accentHex,
    accent2,
    text: '#f5f5f5',
    muted: '#888888',
    light: '#cccccc',
    radius: '6px',
  }
}

// ── Default fallback colors ────────────────────────────────────────────────────
const DEFAULT_PRIMARY = '#1a2a4a'
const DEFAULT_ACCENT = '#C9A84C'

// ── POST handler ──────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { url?: string; businessName?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { url, businessName: overrideName } = body
  if (!url) return NextResponse.json({ error: 'url is required' }, { status: 400 })

  // ── Scrape ──
  let scraped: Awaited<ReturnType<typeof scrapeWebsite>>
  try {
    scraped = await scrapeWebsite(url)
  } catch (err) {
    return NextResponse.json(
      { error: `Failed to fetch URL: ${err instanceof Error ? err.message : String(err)}` },
      { status: 422 }
    )
  }

  const bizName = overrideName?.trim() || scraped.businessName
  const slug = generateProspectSlug(bizName)

  // ── Colors ──
  const primaryColor = scraped.themeColor || DEFAULT_PRIMARY
  const accentColor = DEFAULT_ACCENT
  const theme = buildTheme(primaryColor, accentColor)

  // ── Services ──
  const builtServices = scraped.services.slice(0, 6).map((name) => ({
    name,
    description: `Professional ${name.toLowerCase()} service. Contact us for details.`,
    price: '',
  }))
  if (builtServices.length === 0) {
    builtServices.push({
      name: 'Our Services',
      description: 'Contact us to learn about everything we offer.',
      price: '',
    })
  }

  // ── Gallery ──
  const heroImg = scraped.ogImage || scraped.images[0] || ''
  const galleryImgs = scraped.images
    .filter((u) => u !== heroImg)
    .slice(0, 6)
    .map((url) => ({ url, alt: `${bizName} photo` }))

  // ── Config ──
  const config: ProspectDemoConfig = {
    slug,
    businessName: bizName,
    businessType: 'Local Business',
    tagline: scraped.tagline || scraped.description.slice(0, 100) || `Professional services in ${scraped.city || 'your area'}`,
    primaryColor,
    accentColor,
    services: builtServices,
    hours: [],
    phone: scraped.phone,
    address: scraped.address,
    city: scraped.city,
    about: scraped.description || `${bizName} is dedicated to providing exceptional service to our community. We pride ourselves on quality, reliability, and customer satisfaction.`,
    chatbotGreeting: `Hi! Welcome to ${bizName}. How can we help you today?`,
    heroImg,
    gallery: galleryImgs,
    reviews: [
      { name: 'Google Reviewer', stars: 5, text: `Amazing experience at ${bizName}. Highly recommend to anyone looking for quality service in the area!` },
      { name: 'Yelp Reviewer', stars: 5, text: 'Professional, friendly, and great results. Will definitely be back.' },
      { name: 'Facebook Reviewer', stars: 5, text: 'Best in the area, no question. The team really cares about their customers.' },
    ],
    aboutImg: scraped.images[1] || heroImg,
    theme,
    announceBar: `Now accepting new clients · ${scraped.phone || 'Call us today'}`,
    stats: [
      { num: '100+', label: 'Happy Clients' },
      { num: '5★', label: 'Average Rating' },
      { num: '5+', label: 'Years of Experience' },
    ],
    ctaLabel: `Call ${bizName}`,
    website: url,
    email: scraped.email,
    socials: scraped.socials,
    createdAt: new Date().toISOString(),
  }

  saveProspectDemo(config)

  const host = req.headers.get('host') || 'caliberwebstudio.com'
  const protocol = host.includes('localhost') ? 'http' : 'https'
  const previewUrl = `${protocol}://${host}/demo/${slug}`

  return NextResponse.json({ slug, previewUrl, extractedData: config })
}

// ── PUT handler (update existing prospect demo) ───────────────────────────────
export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let config: ProspectDemoConfig
  try {
    config = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (!config.slug) return NextResponse.json({ error: 'slug is required' }, { status: 400 })

  saveProspectDemo(config)

  const host = req.headers.get('host') || 'caliberwebstudio.com'
  const protocol = host.includes('localhost') ? 'http' : 'https'
  const previewUrl = `${protocol}://${host}/demo/${config.slug}`

  return NextResponse.json({ slug: config.slug, previewUrl })
}

// ── GET handler (list all prospect demos) ─────────────────────────────────────
export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { getProspectDemos } = await import('@/lib/prospect-demo-data')
  return NextResponse.json({ demos: getProspectDemos() })
}
