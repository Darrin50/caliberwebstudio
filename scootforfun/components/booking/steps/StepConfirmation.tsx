import Link from 'next/link'
import type { BookingState } from '@/lib/types'
import { calcTourPrice, formatDateDisplay } from '@/lib/utils'
import { business } from '@/lib/constants'

interface Props {
  state: BookingState
}

export default function StepConfirmation({ state }: Props) {
  const pricing = calcTourPrice(state.partySize)

  return (
    <div className="p-6 md:p-10 text-center">
      {/* Success icon */}
      <div
        className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-teal/10 ring-4 ring-teal/20"
        style={{ width: 80, height: 80, minWidth: 80, minHeight: 80 }}
      >
        <svg className="h-10 w-10 text-teal" width={40} height={40} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h2 className="font-display text-3xl font-black text-navy">You&apos;re Booked! 🛵</h2>
      <p className="mt-2 text-navy/60">
        A confirmation email is on its way to{' '}
        <strong className="text-navy">{state.customerEmail}</strong>
      </p>

      {/* Confirmation number + transaction ID */}
      <div className="mx-auto mt-6 max-w-xs rounded-2xl bg-teal/10 border border-teal/20 px-6 py-4 space-y-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-teal mb-0.5">Confirmation #</p>
          <p className="font-display text-2xl font-black text-navy tracking-wider">{state.confirmationId}</p>
        </div>
        {state.transactionId && (
          <div className="border-t border-teal/20 pt-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal mb-0.5">Transaction ID</p>
            <p className="font-mono text-sm font-semibold text-navy">{state.transactionId}</p>
          </div>
        )}
      </div>

      {/* Booking summary */}
      <div className="mx-auto mt-6 max-w-sm rounded-2xl border border-navy/10 bg-cream/50 text-left overflow-hidden">
        <div className="bg-navy px-5 py-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-teal">Booking Details</p>
        </div>
        <div className="px-5 py-4 space-y-2.5 text-sm">
          <div className="flex justify-between">
            <span className="text-navy/60">Date</span>
            <span className="font-medium text-navy">{state.date ? formatDateDisplay(state.date) : '—'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-navy/60">Time</span>
            <span className="font-medium text-navy">{state.startTime ?? '—'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-navy/60">Riders</span>
            <span className="font-medium text-navy">{state.partySize}</span>
          </div>
          <div className="flex justify-between border-t border-navy/10 pt-2">
            <span className="font-bold text-navy">Total Paid</span>
            <span className="font-bold text-teal">${pricing.total}.00</span>
          </div>
        </div>
      </div>

      {/* What to bring */}
      <div className="mx-auto mt-6 max-w-sm rounded-2xl bg-purple-50 border border-purple-brand/10 text-left px-5 py-4">
        <p className="font-semibold text-purple-brand text-sm mb-3">What to Bring &amp; Know</p>
        <ul className="space-y-2">
          {[
            'Comfortable, weather-appropriate clothes & closed-toe shoes',
            'Government-issued ID (may be requested)',
            'Arrive 10 minutes early at the meet-up point',
            'Be ready to sign a physical waiver at check-in',
            `Your free swag is waiting: ${business.tour.swag.join(', ')}`,
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-xs text-navy/70">
              <span className="text-teal mt-0.5 flex-shrink-0">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Meet-up placeholder */}
      <div className="mx-auto mt-4 max-w-sm rounded-xl bg-yellow-50 border border-yellow-200 px-4 py-3">
        <p className="text-xs text-yellow-800">
          <strong>Meet-up Location:</strong> Exact address will be included in your confirmation email.
          {/* TODO: Add official meet-up address once confirmed by owner */}
        </p>
      </div>

      <p className="mt-6 text-xs text-navy/50">
        Questions? Call{' '}
        <a href={business.phoneHref} className="text-teal hover:underline font-medium">{business.phone}</a>{' '}
        or email{' '}
        <a href={`mailto:${business.email}`} className="text-teal hover:underline font-medium">{business.email}</a>
      </p>

      <div className="mt-8">
        <Link href="/" className="btn-primary">Back to Home</Link>
      </div>
    </div>
  )
}
