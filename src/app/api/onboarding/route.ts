import { NextRequest, NextResponse } from 'next/server'
import { onboardingSchema } from '@/components/onboarding/schema'
import {
  hasEmailSubmitted,
  saveSubmission,
  markSlugSubmitted,
} from '@/lib/onboarding-data'

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

    // ── TODO: Notion API integration ──────────────────────────────────────
    // When ready, create a new page in your Notion database:
    //
    // const notion = new Client({ auth: process.env.NOTION_API_KEY })
    // await notion.pages.create({
    //   parent: { database_id: process.env.NOTION_DATABASE_ID! },
    //   properties: {
    //     Name: { title: [{ text: { content: data.business.name } }] },
    //     Slug: { rich_text: [{ text: { content: slug } }] },
    //     Email: { email: data.contact.email },
    //     SubmittedAt: { date: { start: submittedAt } },
    //   },
    // })

    // ── n8n webhook ───────────────────────────────────────────────────────
    if (process.env.N8N_WEBHOOK_URL) {
      try {
        const webhookRes = await fetch(process.env.N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!webhookRes.ok) {
          console.error('[onboarding] n8n webhook failed:', webhookRes.status)
        }
      } catch (webhookErr) {
        console.error('[onboarding] n8n webhook error:', webhookErr)
        // Don't fail the submission if webhook fails
      }
    }

    // ── TODO: Send email via Resend ───────────────────────────────────────
    // Notification to Darrin:
    //
    // const { Resend } = await import('resend')
    // const resend = new Resend(process.env.RESEND_API_KEY)
    //
    // await resend.emails.send({
    //   from: 'Caliber Web Studio <noreply@caliberwebstudio.com>',
    //   to: ['darrin@caliberwebstudio.com'],
    //   subject: `New Onboarding: ${data.business.name}`,
    //   html: buildInternalEmail(payload),
    // })
    //
    // Confirmation to client:
    // await resend.emails.send({
    //   from: 'Caliber Web Studio <noreply@caliberwebstudio.com>',
    //   to: [data.contact.email],
    //   reply_to: 'darrin@caliberwebstudio.com',
    //   subject: `Got it! Your site is being built — Caliber Web Studio`,
    //   html: buildClientEmail(data),
    // })

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
