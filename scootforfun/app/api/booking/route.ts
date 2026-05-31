import { NextRequest, NextResponse } from 'next/server'
import type { BookingPayload } from '@/lib/types'
import { business } from '@/lib/constants'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { incrementBooked } from '@/lib/bookingStore'

// TODO: Install and configure Square Node.js SDK:
//   pnpm add squareup
//   Then import { Client, Environment } from 'squareup'
//   const client = new Client({ environment: Environment.Production, accessToken: process.env.SQUARE_ACCESS_TOKEN })
//
// TODO: Install and configure an email service (e.g. Resend):
//   pnpm add resend
//   Then send confirmation email to customer + owner notification.
//
// TODO: Install googleapis and create a Google Calendar event:
//   pnpm add googleapis
//   Required env: GOOGLE_CALENDAR_CLIENT_ID, GOOGLE_CALENDAR_CLIENT_SECRET,
//                 GOOGLE_CALENDAR_REFRESH_TOKEN, GOOGLE_CALENDAR_ID
//
// AI TEXTING HOOK: After booking is confirmed, emit to an event queue here.
// e.g. await fetch(process.env.AI_TEXTING_WEBHOOK_URL, { method: 'POST', body: JSON.stringify(booking) })

function generateConfirmationId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let id = 'SFF-'
  for (let i = 0; i < 8; i++) {
    id += chars[Math.floor(Math.random() * chars.length)]
  }
  return id
}

// Simple rate limiting — in production, use Redis or edge middleware
const recentRequests = new Map<string, number>()
function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const last = recentRequests.get(ip) ?? 0
  if (now - last < 3000) return true // 3 second minimum between booking attempts per IP
  recentRequests.set(ip, now)
  return false
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests. Please wait a moment.' }, { status: 429 })
  }

  let body: BookingPayload
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  // Validate required fields
  const { date, timeWindow, startTime, partySize, customerName, customerEmail, totalAmount, sourceToken } = body

  if (!date || !timeWindow || !startTime || !partySize || !customerName || !customerEmail) {
    return NextResponse.json({ error: 'Missing required booking fields' }, { status: 400 })
  }

  if (partySize < 1 || partySize > business.tour.maxCapacity) {
    return NextResponse.json(
      { error: `Party size must be between 1 and ${business.tour.maxCapacity}` },
      { status: 400 }
    )
  }

  // TODO: Re-check availability against database before charging
  // If slot became full between UI check and payment, return 409 Conflict

  // TODO: Process Square payment:
  //   const { result } = await client.paymentsApi.createPayment({
  //     sourceId: sourceToken,
  //     idempotencyKey: crypto.randomUUID(),
  //     amountMoney: { amount: BigInt(totalAmount * 100), currency: 'USD' },
  //     locationId: process.env.SQUARE_LOCATION_ID!,
  //   })

  const squareConfigured = Boolean(process.env.SQUARE_ACCESS_TOKEN && process.env.SQUARE_LOCATION_ID)
  if (!squareConfigured) {
    console.warn('[booking] Square not configured — skipping payment processing (dev mode)')
  }

  const confirmationId = generateConfirmationId()

  // TODO: Update availability in database — mark partySize seats as booked for date/window/slot

  // TODO: Send confirmation email to customer
  // await sendEmail({
  //   to: customerEmail,
  //   subject: `Booking Confirmed — ${confirmationId}`,
  //   body: `Your Scoot for Fun tour on ${date} at ${startTime} is confirmed! ...`
  // })

  // TODO: Notify owner
  // await sendEmail({
  //   to: business.email,
  //   subject: `New Booking: ${confirmationId} — ${date} ${startTime} (${partySize} riders)`,
  //   body: `Name: ${customerName}, Email: ${customerEmail}, Amount: $${totalAmount}`
  // })

  // TODO: Create Google Calendar event
  // const auth = new google.auth.OAuth2(...)
  // await calendar.events.insert({
  //   calendarId: process.env.GOOGLE_CALENDAR_ID!,
  //   requestBody: {
  //     summary: `Scoot for Fun Tour — ${partySize} rider(s)`,
  //     start: { dateTime: `${date}T${startTimeISO}` },
  //     end: { ... },
  //     description: `Confirmation: ${confirmationId}\nName: ${customerName}\nEmail: ${customerEmail}`
  //   }
  // })

  console.log(`[booking] Confirmed: ${confirmationId} | ${date} ${startTime} | ${partySize} rider(s) | ${customerName} | $${totalAmount}`)

  // Void the sourceToken in dev when Square is not configured
  void sourceToken

  return NextResponse.json(
    {
      success: true,
      confirmationId,
      date,
      startTime,
      partySize,
      totalAmount,
      customerEmail,
    },
    { status: 201 }
  )
}
