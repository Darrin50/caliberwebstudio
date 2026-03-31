import { NextRequest, NextResponse } from 'next/server'
import { onboardingSchema } from '@/components/onboarding/schema'
import {
  hasEmailSubmitted,
  saveSubmission,
  markSlugSubmitted,
} from '@/lib/onboarding-data'
import { buildClientEmail, buildDarrinEmail } from '@/lib/emails/onboarding-confirmation'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { slug, ...formData } = body

    // ── Validate ──────────────────────────────────────────────────────────
    const parsed = onboardingSchema.safeParse(formData)
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors
      console.error('[onboarding] Validation failed:', JSON.stringify(fieldErrors, null, 2))
      return NextResponse.json(
        {
          error: 'Validation failed. Please check your form and try again.',
          details: fieldErrors,
        },
        { status: 400 }
      )
    }

    const data = parsed.data

    // ── Duplicate email check ─────────────────────────────────────────────
    if (hasEmailSubmitted(data.contact.email)) {
      return NextResponse.json(
        {
          error:
            "It looks like you've already submitted your information. If you need to make changes, contact us at darrin@caliberwebstudio.com or (313) 799-2315.",
        },
        { status: 409 }
      )
    }

    const submittedAt = new Date().toISOString()

    // ── Build webhook payload ─────────────────────────────────────────────
    const payload = {
      slug: slug || 'unknown',
      submittedAt,
      business: data.business,
      contact: data.contact,
      services: data.services,
      brand: data.brand,
      photos: data.photos,
      social: data.contact.social,
      story: data.story,
    }

    // ── Console log (always — useful for debugging) ───────────────────────
    console.log('[onboarding] New submission:', JSON.stringify(payload, null, 2))

    // ── Record submission (duplicate-email guard) ─────────────────────────
    saveSubmission({
      slug: slug || 'unknown',
      email: data.contact.email,
      businessName: data.business.name,
      submittedAt,
    })
    markSlugSubmitted(slug || 'unknown')

    // ── Fire all integrations in parallel — failures are isolated ─────────
    const results = await Promise.allSettled([
      sendClientEmail(data),
      sendDarrinEmail(payload),
      fireN8nWebhook(payload),
      createNotionPage(payload),
    ])

    results.forEach((result, i) => {
      const labels = ['client-email', 'darrin-email', 'n8n-webhook', 'notion']
      if (result.status === 'rejected') {
        console.error(`[onboarding] ${labels[i]} failed:`, result.reason)
      }
    })

    // ── Return success ────────────────────────────────────────────────────
    return NextResponse.json({
      success: true,
      message: 'Onboarding received',
    })
  } catch (err) {
    console.error('[onboarding] Unexpected error:', err)
    return NextResponse.json(
      {
        error:
          'Something went wrong on our end. Please email darrin@caliberwebstudio.com directly.',
      },
      { status: 500 }
    )
  }
}

// ─── Client confirmation email ────────────────────────────────────────────────

async function sendClientEmail(data: Parameters<typeof buildClientEmail>[0]) {
  const html = buildClientEmail(data)
  const subject = "We're building your website — here's what's next"

  if (!process.env.RESEND_API_KEY) {
    console.log('[onboarding] RESEND_API_KEY not set — client email payload:', {
      to: data.contact.email,
      subject,
    })
    return
  }

  const { Resend } = await import('resend')
  const resend = new Resend(process.env.RESEND_API_KEY)

  const { error } = await resend.emails.send({
    from: 'Caliber Web Studio <noreply@caliberwebstudio.com>',
    to: [data.contact.email],
    reply_to: 'darrin@caliberwebstudio.com',
    subject,
    html,
  })

  if (error) throw new Error(`Resend client email error: ${JSON.stringify(error)}`)
}

// ─── Internal notification to Darrin ─────────────────────────────────────────

async function sendDarrinEmail(payload: Parameters<typeof buildDarrinEmail>[0]) {
  const html = buildDarrinEmail(payload)
  const subject = `🚀 New Client Onboarding: ${payload.business.name}`

  if (!process.env.RESEND_API_KEY) {
    console.log('[onboarding] RESEND_API_KEY not set — darrin email payload:', {
      to: 'darrin@caliberwebstudio.com',
      subject,
    })
    return
  }

  const { Resend } = await import('resend')
  const resend = new Resend(process.env.RESEND_API_KEY)

  const { error } = await resend.emails.send({
    from: 'Caliber Web Studio <noreply@caliberwebstudio.com>',
    to: ['darrin@caliberwebstudio.com'],
    subject,
    html,
  })

  if (error) throw new Error(`Resend darrin email error: ${JSON.stringify(error)}`)
}

// ─── n8n webhook ──────────────────────────────────────────────────────────────

async function fireN8nWebhook(payload: object) {
  if (!process.env.N8N_WEBHOOK_URL) {
    console.log('[onboarding] N8N_WEBHOOK_URL not set — skipping webhook')
    return
  }

  const res = await fetch(process.env.N8N_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error(`n8n webhook responded with status ${res.status}`)
  }
}

// ─── Notion page creation ─────────────────────────────────────────────────────

async function createNotionPage(payload: {
  slug: string
  submittedAt: string
  business: { name: string; industry: string }
  contact: { ownerName: string; email: string; phone?: string | null }
  services: { items: { name: string; price?: string | null; description?: string | null }[] }
  brand: {
    primaryColor: string
    secondaryColor?: string | null
    accentColor?: string | null
    stylePreference: string
    logoUrl?: string | null
    notes?: string | null
  }
  photos: { items?: { url: string; fileName: string; caption?: string | null }[] | null }
  story: {
    yourStory: string
    whatMakesDifferent: string
    targetCustomers?: string | null
    anythingElse?: string | null
  }
}) {
  if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
    console.log('[onboarding] NOTION_API_KEY or NOTION_DATABASE_ID not set — skipping Notion')
    return
  }

  const { Client } = await import('@notionhq/client')
  const notion = new Client({ auth: process.env.NOTION_API_KEY })

  const servicesSummary = payload.services.items
    .map((s) => `• ${s.name}${s.price ? ` (${s.price})` : ''}`)
    .join('\n')

  const photosSummary =
    payload.photos.items && payload.photos.items.length > 0
      ? payload.photos.items.map((p) => `• ${p.fileName}: ${p.url}`).join('\n')
      : 'None uploaded'

  await notion.pages.create({
    parent: { database_id: process.env.NOTION_DATABASE_ID },
    properties: {
      'Business Name': {
        title: [{ text: { content: payload.business.name } }],
      },
      Owner: {
        rich_text: [{ text: { content: payload.contact.ownerName } }],
      },
      Email: {
        email: payload.contact.email,
      },
      Phone: {
        phone_number: payload.contact.phone ?? null,
      },
      Industry: {
        rich_text: [{ text: { content: payload.business.industry } }],
      },
      Status: {
        select: { name: 'New Submission' },
      },
    },
    children: [
      notionHeading2('Submission Details'),
      notionParagraph(`Slug: ${payload.slug}`),
      notionParagraph(`Submitted At: ${payload.submittedAt}`),
      notionHeading3('Brand'),
      notionParagraph(`Primary Color: ${payload.brand.primaryColor}`),
      notionParagraph(`Secondary Color: ${payload.brand.secondaryColor ?? 'N/A'}`),
      notionParagraph(`Accent Color: ${payload.brand.accentColor ?? 'N/A'}`),
      notionParagraph(`Style: ${payload.brand.stylePreference}`),
      notionParagraph(`Logo: ${payload.brand.logoUrl ?? 'None'}`),
      notionParagraph(`Brand Notes: ${payload.brand.notes ?? 'None'}`),
      notionHeading3('Services'),
      notionParagraph(servicesSummary),
      notionHeading3('Story'),
      notionParagraph(`Your Story:\n${payload.story.yourStory}`),
      notionParagraph(`What Makes Different:\n${payload.story.whatMakesDifferent}`),
      notionParagraph(`Target Customers: ${payload.story.targetCustomers ?? 'N/A'}`),
      notionParagraph(`Additional Notes: ${payload.story.anythingElse ?? 'N/A'}`),
      notionHeading3('Photos'),
      notionParagraph(photosSummary),
    ],
  })
}

function notionHeading2(text: string) {
  return {
    object: 'block' as const,
    type: 'heading_2' as const,
    heading_2: {
      rich_text: [{ type: 'text' as const, text: { content: text } }],
    },
  }
}

function notionHeading3(text: string) {
  return {
    object: 'block' as const,
    type: 'heading_3' as const,
    heading_3: {
      rich_text: [{ type: 'text' as const, text: { content: text } }],
    },
  }
}

function notionParagraph(text: string) {
  return {
    object: 'block' as const,
    type: 'paragraph' as const,
    paragraph: {
      rich_text: [{ type: 'text' as const, text: { content: text.slice(0, 2000) } }],
    },
  }
}
