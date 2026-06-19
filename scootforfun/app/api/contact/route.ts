import { NextRequest, NextResponse } from 'next/server'
import { sendContactNotification } from '@/lib/email'

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
    return NextResponse.json({ success: false, error: 'Invalid request.' }, { status: 400 })
  }

  const { name, email, message } = body

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { success: false, error: 'Name, email, and message are required.' },
      { status: 422 },
    )
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRe.test(email)) {
    return NextResponse.json({ success: false, error: 'Invalid email address.' }, { status: 422 })
  }

  const result = await sendContactNotification({
    name: name.trim(),
    email: email.trim(),
    phone: body.phone?.trim(),
    message: message.trim(),
  })

  console.log(`[contact] From: ${name} <${email}> | emailSent=${result.sent}`)

  return NextResponse.json({
    success: true,
    message: "Message received. We'll be in touch soon!",
  })
}
