/**
 * Resend email helper.
 *
 * If RESEND_API_KEY is absent, all sends are no-ops that return
 * { sent: false, reason: 'unconfigured' } — the booking still succeeds.
 * This is logged so operators know email is disabled.
 *
 * Required env vars: RESEND_API_KEY, EMAIL_FROM, EMAIL_OWNER
 */

import { Resend } from 'resend'
import { business } from './constants'
import { formatDateDisplay } from './utils'

function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null
  return new Resend(process.env.RESEND_API_KEY)
}

const emailFrom = (): string =>
  process.env.EMAIL_FROM ?? `${business.name} <noreply@${business.domain}>`

const emailOwner = (): string =>
  process.env.EMAIL_OWNER ?? business.email

interface SendResult {
  sent: boolean
  reason?: string
}

export interface BookingEmailParams {
  confirmationId: string
  transactionId: string
  date: string
  startTime: string
  partySize: number
  totalAmount: number
  customerName: string
  customerEmail: string
  customerPhone: string
}

export async function sendBookingConfirmation(p: BookingEmailParams): Promise<SendResult> {
  const resend = getResend()
  if (!resend) {
    console.warn('[email] RESEND_API_KEY not set — skipping booking confirmation email')
    return { sent: false, reason: 'unconfigured' }
  }

  const dateDisplay = formatDateDisplay(p.date)
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:#15323F;padding:24px;border-radius:12px 12px 0 0;text-align:center;">
        <h1 style="color:#1BA8A6;margin:0;font-size:24px;">You're Booked! 🛵</h1>
        <p style="color:#ffffff;margin:8px 0 0;">Scoot for Fun — Detroit Riverwalk Tour</p>
      </div>
      <div style="background:#f8f8f8;padding:24px;">
        <p style="color:#15323F;">Hi ${p.customerName},</p>
        <p style="color:#15323F;">Your Scoot for Fun tour is confirmed! We can't wait to ride with you.</p>

        <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:8px;padding:20px;margin:20px 0;">
          <h2 style="color:#15323F;margin:0 0 16px;font-size:16px;text-transform:uppercase;letter-spacing:1px;">Booking Details</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:6px 0;color:#6b7280;font-size:14px;">Confirmation #</td><td style="padding:6px 0;color:#15323F;font-weight:bold;font-size:14px;">${p.confirmationId}</td></tr>
            <tr><td style="padding:6px 0;color:#6b7280;font-size:14px;">Transaction ID</td><td style="padding:6px 0;color:#15323F;font-size:14px;">${p.transactionId}</td></tr>
            <tr><td style="padding:6px 0;color:#6b7280;font-size:14px;">Date</td><td style="padding:6px 0;color:#15323F;font-size:14px;">${dateDisplay}</td></tr>
            <tr><td style="padding:6px 0;color:#6b7280;font-size:14px;">Time</td><td style="padding:6px 0;color:#15323F;font-size:14px;">${p.startTime}</td></tr>
            <tr><td style="padding:6px 0;color:#6b7280;font-size:14px;">Riders</td><td style="padding:6px 0;color:#15323F;font-size:14px;">${p.partySize}</td></tr>
            <tr style="border-top:1px solid #e5e7eb;"><td style="padding:10px 0 6px;color:#15323F;font-weight:bold;">Total Paid</td><td style="padding:10px 0 6px;color:#1BA8A6;font-weight:bold;font-size:16px;">$${p.totalAmount}.00</td></tr>
          </table>
        </div>

        <div style="background:#EAF3F2;border-radius:8px;padding:16px;margin:20px 0;">
          <h3 style="color:#15323F;margin:0 0 12px;font-size:14px;">What to Bring &amp; Know</h3>
          <ul style="color:#374151;font-size:13px;margin:0;padding-left:20px;line-height:1.8;">
            <li>Comfortable clothes &amp; closed-toe shoes</li>
            <li>Government-issued ID (may be requested)</li>
            <li>Arrive 10 minutes early at the meet-up point</li>
            <li>Sign a physical waiver at check-in</li>
            <li>Your free swag awaits: ${business.tour.swag.join(', ')}</li>
          </ul>
        </div>

        <p style="color:#6b7280;font-size:13px;">
          Questions? Call <a href="tel:${business.phoneHref}" style="color:#1BA8A6;">${business.phone}</a>
          or reply to this email.
        </p>
      </div>
      <div style="background:#15323F;padding:16px;border-radius:0 0 12px 12px;text-align:center;">
        <p style="color:#ffffff;margin:0;font-size:12px;">© ${new Date().getFullYear()} ${business.name}</p>
      </div>
    </div>
  `.trim()

  try {
    await resend.emails.send({
      from: emailFrom(),
      to: p.customerEmail,
      subject: `Booking Confirmed — ${p.confirmationId} | Scoot for Fun`,
      html,
    })
    return { sent: true }
  } catch (err) {
    console.error('[email] customer confirmation failed:', err instanceof Error ? err.message : err)
    return { sent: false, reason: 'send_error' }
  }
}

export async function sendOwnerNotification(p: BookingEmailParams): Promise<SendResult> {
  const resend = getResend()
  if (!resend) {
    console.warn('[email] RESEND_API_KEY not set — skipping owner notification')
    return { sent: false, reason: 'unconfigured' }
  }

  const dateDisplay = formatDateDisplay(p.date)
  const text = [
    `NEW BOOKING — ${p.confirmationId}`,
    '',
    `Date:         ${dateDisplay}`,
    `Time:         ${p.startTime}`,
    `Riders:       ${p.partySize}`,
    `Amount:       $${p.totalAmount}.00`,
    '',
    `Customer:     ${p.customerName}`,
    `Email:        ${p.customerEmail}`,
    `Phone:        ${p.customerPhone || 'N/A'}`,
    '',
    `Auth.Net TxnID: ${p.transactionId}`,
  ].join('\n')

  try {
    await resend.emails.send({
      from: emailFrom(),
      to: emailOwner(),
      subject: `New Booking: ${p.confirmationId} — ${dateDisplay} at ${p.startTime} (${p.partySize} rider${p.partySize === 1 ? '' : 's'})`,
      text,
    })
    return { sent: true }
  } catch (err) {
    console.error('[email] owner notification failed:', err instanceof Error ? err.message : err)
    return { sent: false, reason: 'send_error' }
  }
}

export async function sendContactNotification(params: {
  name: string
  email: string
  phone?: string
  message: string
}): Promise<SendResult> {
  const resend = getResend()
  if (!resend) {
    console.warn('[email] RESEND_API_KEY not set — skipping contact notification')
    return { sent: false, reason: 'unconfigured' }
  }

  const text = [
    `New contact form submission — ${business.name}`,
    '',
    `Name:    ${params.name}`,
    `Email:   ${params.email}`,
    `Phone:   ${params.phone ?? 'N/A'}`,
    '',
    `Message:\n${params.message}`,
  ].join('\n')

  try {
    await resend.emails.send({
      from: emailFrom(),
      to: emailOwner(),
      replyTo: params.email,
      subject: `Contact Form: ${params.name} — ${business.name}`,
      text,
    })
    return { sent: true }
  } catch (err) {
    console.error('[email] contact notification failed:', err instanceof Error ? err.message : err)
    return { sent: false, reason: 'send_error' }
  }
}
