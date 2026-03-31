import fs from 'fs'
import path from 'path'

// NOTE: This uses the local filesystem. Works in local dev and on servers with
// a persistent filesystem. On Vercel (serverless), writes persist only within
// a single invocation unless you switch to a database or Vercel KV.

const DATA_DIR = path.join(process.cwd(), 'data')
const SLUGS_FILE = path.join(DATA_DIR, 'onboarding-slugs.json')
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'onboarding-submissions.json')

export interface OnboardingSlug {
  slug: string
  businessName: string
  email: string
  createdAt: string
  status: 'pending' | 'submitted'
}

export interface OnboardingSubmission {
  slug: string
  email: string
  businessName: string
  submittedAt: string
}

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
}

function readJson<T>(filePath: string, defaultValue: T): T {
  ensureDataDir()
  try {
    if (!fs.existsSync(filePath)) return defaultValue
    return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as T
  } catch {
    return defaultValue
  }
}

function writeJson<T>(filePath: string, data: T): void {
  ensureDataDir()
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
}

// ── Slugs ─────────────────────────────────────────────────────────────────────

export function getSlugs(): OnboardingSlug[] {
  return readJson<OnboardingSlug[]>(SLUGS_FILE, [])
}

export function saveSlug(entry: OnboardingSlug): void {
  const slugs = getSlugs()
  const idx = slugs.findIndex((s) => s.slug === entry.slug)
  if (idx >= 0) {
    slugs[idx] = entry
  } else {
    slugs.push(entry)
  }
  writeJson(SLUGS_FILE, slugs)
}

export function markSlugSubmitted(slug: string): void {
  const slugs = getSlugs()
  const entry = slugs.find((s) => s.slug === slug)
  if (entry) {
    entry.status = 'submitted'
    writeJson(SLUGS_FILE, slugs)
  }
}

// ── Submissions ───────────────────────────────────────────────────────────────

export function getSubmissions(): OnboardingSubmission[] {
  return readJson<OnboardingSubmission[]>(SUBMISSIONS_FILE, [])
}

export function hasEmailSubmitted(email: string): boolean {
  return getSubmissions().some(
    (s) => s.email.toLowerCase() === email.toLowerCase()
  )
}

export function saveSubmission(entry: OnboardingSubmission): void {
  const submissions = getSubmissions()
  submissions.push(entry)
  writeJson(SUBMISSIONS_FILE, submissions)
}

// ── Slug generation ───────────────────────────────────────────────────────────

export function generateSlug(businessName: string): string {
  const base = businessName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 50) // cap length

  const slugs = getSlugs()
  const taken = slugs.some((s) => s.slug === base)
  if (!taken) return base

  // Append 4-char random suffix
  const suffix = Math.random().toString(36).slice(2, 6)
  return `${base}-${suffix}`
}
