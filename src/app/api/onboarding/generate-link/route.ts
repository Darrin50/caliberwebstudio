import { NextRequest, NextResponse } from 'next/server'
import { generateSlug, saveSlug } from '@/lib/onboarding-data'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { businessName, email } = body

    if (!businessName || typeof businessName !== 'string' || !businessName.trim()) {
      return NextResponse.json({ error: 'businessName is required' }, { status: 400 })
    }
    if (!email || typeof email !== 'string' || !email.trim()) {
      return NextResponse.json({ error: 'email is required' }, { status: 400 })
    }

    const slug = generateSlug(businessName.trim())
    const entry = {
      slug,
      businessName: businessName.trim(),
      email: email.trim().toLowerCase(),
      createdAt: new Date().toISOString(),
      status: 'pending' as const,
    }

    saveSlug(entry)

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://caliberwebstudio.com'
    const url = `${baseUrl}/onboarding/${slug}`

    console.log(`[generate-link] Created slug "${slug}" for "${businessName}" <${email}>`)

    return NextResponse.json({ slug, url })
  } catch (err) {
    console.error('[generate-link] Error:', err)
    return NextResponse.json({ error: 'Failed to generate link' }, { status: 500 })
  }
}
