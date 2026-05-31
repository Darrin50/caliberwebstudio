import { NextRequest, NextResponse } from 'next/server'
import { business } from '@/lib/constants'

// TODO: Install an email service to deliver contact form submissions:
//   Option A (recommended): pnpm add resend → use Resend API
//   Option B: pnpm add nodemailer → SMTP via Gmail or similar

interface ContactPayload {
  name: string
  email: string
  phone?: string
  message: string
}

export async function POST(request: NextRequest) {
  let body: ContactPayload
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 })
  }

  const { name, email, message } = body

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { success: false, error: 'Name, email, and message are required' },
      { status: 422 }
    )
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json({ success: false, error: 'Invalid email address' }, { status: 422 })
  }

  // TODO: Send email via Resend:
  // const resend = new Resend(process.env.RESEND_API_KEY)
  // await resend.emails.send({
  //   from: `${business.name} <noreply@${business.domain}>`,
  //   to: business.email,
  //   subject: `New contact from ${name}`,
  //   text: `Name: ${name}\nEmail: ${email}\nPhone: ${body.phone ?? 'N/A'}\n\n${message}`,
  // })

  console.log(`[contact] From: ${name} <${email}> | To: ${business.email} | Msg: ${message.substring(0, 80)}`)

  return NextResponse.json({ success: true, message: 'Message received. We\'ll be in touch soon!' })
}
