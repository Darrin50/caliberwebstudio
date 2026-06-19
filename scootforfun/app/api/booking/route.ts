import { NextRequest, NextResponse } from 'next/server'
import type { BookingPayload } from '@/lib/types'
import { business } from '@/lib/constants'
import { calcTourPrice, generateConfirmationId } from '@/lib/utils'
import { reserveSlot, releaseSlot, KvUnconfiguredError } from '@/lib/bookingStore'
import { chargeCard } from '@/lib/authnet'
import { sendBookingConfirmation, sendOwnerNotification } from '@/lib/email'

// TODO (P1 — separate branch): add Google Calendar event creation after booking succeeds.
// Required env: GOOGLE_CALENDAR_CLIENT_ID, GOOGLE_CALENDAR_CLIENT_SECRET,
//               GOOGLE_CALENDAR_REFRESH_TOKEN, GOOGLE_CALENDAR_ID
// Seam: call createCalendarEvent(params) here after emails are sent.

// Simple per-IP rate limit — upgrade to Redis/edge middleware for production scale
const recentRequests = new Map<string, number>()
function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const last = recentRequests.get(ip) ?? 0
  if (now - last < 3000) return true
  recentRequests.set(ip, now)
  return false
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests. Please wait a moment.' }, { status: 429 })
  }

  // ── 1. Parse + validate payload ──────────────────────────────────────────
  let body: BookingPayload
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const {
    date, timeWindow, startTime, partySize, riders,
    customerName, customerEmail, customerPhone,
    opaqueDescriptor, opaqueValue,
  } = body

  if (!date || !timeWindow || !startTime || !partySize || !customerName || !customerEmail) {
    return NextResponse.json({ error: 'Missing required booking fields.' }, { status: 400 })
  }
  if (!opaqueDescriptor || !opaqueValue) {
    return NextResponse.json({ error: 'Payment token missing — please re-enter card details.' }, { status: 400 })
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'Invalid date format.' }, { status: 400 })
  }
  if (partySize < 1 || partySize > business.tour.maxCapacity) {
    return NextResponse.json(
      { error: `Party size must be between 1 and ${business.tour.maxCapacity}.` },
      { status: 400 },
    )
  }
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRe.test(customerEmail)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
  }

  // ── 2. Server-side pricing (never trust client amount) ───────────────────
  const pricing = calcTourPrice(partySize)
  const chargeAmount = pricing.total

  // ── 3. Atomic slot reservation in KV ────────────────────────────────────
  let slotReserved = false
  try {
    const reservation = await reserveSlot(
      date, timeWindow, startTime,
      partySize, business.tour.maxCapacity,
    )
    if (!reservation.reserved) {
      return NextResponse.json(
        {
          error: `Sorry, that slot just filled up. Only ${reservation.available} spot${reservation.available === 1 ? '' : 's'} remain — please choose a different time.`,
          available: reservation.available,
        },
        { status: 409 },
      )
    }
    slotReserved = true
  } catch (err) {
    if (err instanceof KvUnconfiguredError) {
      console.error('[booking] KV not configured — cannot process bookings')
      return NextResponse.json(
        { error: 'Booking system is not available. Please call us to reserve your spot.' },
        { status: 503 },
      )
    }
    console.error('[booking] KV reservation error:', err)
    return NextResponse.json({ error: 'Availability check failed. Please try again.' }, { status: 500 })
  }

  // ── 4. Charge via Authorize.Net ──────────────────────────────────────────
  const confirmationId = generateConfirmationId()
  const chargeResult = await chargeCard({
    opaqueDescriptor,
    opaqueValue,
    amount: chargeAmount,
    invoiceNumber: confirmationId,
    orderDescription: `Scoot for Fun Tour — ${partySize} rider${partySize === 1 ? '' : 's'} — ${date} ${startTime}`,
    customerEmail,
  })

  if (!chargeResult.success) {
    // Release the slot so it can be booked by someone else
    if (slotReserved) {
      await releaseSlot(date, timeWindow, startTime, partySize).catch((e) =>
        console.error('[booking] slot release failed after charge failure:', e),
      )
    }
    return NextResponse.json(
      { error: chargeResult.errorText ?? 'Payment declined. Please check your card details and try again.' },
      { status: 402 },
    )
  }

  const transactionId = chargeResult.transactionId!

  // ── 5. Emails (non-blocking — email failure does NOT fail the booking) ───
  const emailParams = {
    confirmationId,
    transactionId,
    date,
    startTime,
    partySize,
    totalAmount: chargeAmount,
    customerName,
    customerEmail,
    customerPhone: customerPhone ?? '',
  }
  const [customerEmailResult, ownerEmailResult] = await Promise.allSettled([
    sendBookingConfirmation(emailParams),
    sendOwnerNotification(emailParams),
  ])

  const emailsSent = customerEmailResult.status === 'fulfilled' && ownerEmailResult.status === 'fulfilled'

  // ── 6. Success ───────────────────────────────────────────────────────────
  console.log(
    `[booking] SUCCESS — ${confirmationId} | txn=${transactionId} | ${date} ${startTime} | ${partySize} rider(s) | ${customerName} | $${chargeAmount} | emails=${emailsSent}`,
  )

  // Note: riders + waiverSigned are captured here for records; extend this
  // to a full DB write (e.g. PlanetScale / Supabase) in a future iteration.
  void riders

  return NextResponse.json(
    {
      success: true,
      confirmationId,
      transactionId,
      date,
      startTime,
      partySize,
      totalAmount: chargeAmount,
      customerEmail,
      emailsSent,
    },
    { status: 201 },
  )
}
