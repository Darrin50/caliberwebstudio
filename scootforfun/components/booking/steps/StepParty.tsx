'use client'

import type { BookingState, RiderInfo } from '@/lib/types'
import { business } from '@/lib/constants'
import { calcTourPrice, formatDateDisplay } from '@/lib/utils'

interface Props {
  state: BookingState
  update: (p: Partial<BookingState>) => void
  onNext: () => void
  onBack: () => void
}

const MAX = business.tour.maxCapacity

export default function StepParty({ state, update, onNext, onBack }: Props) {
  const pricing = calcTourPrice(state.partySize)

  function setPartySize(n: number) {
    const size = Math.max(1, Math.min(MAX, n))
    const riders: RiderInfo[] = Array.from({ length: size }, (_, i) => ({
      name: state.riders[i]?.name ?? '',
      ageAcknowledged: state.riders[i]?.ageAcknowledged ?? false,
      weightAcknowledged: state.riders[i]?.weightAcknowledged ?? false,
    }))
    update({ partySize: size, riders })
  }

  function updateRider(idx: number, partial: Partial<RiderInfo>) {
    const riders = state.riders.map((r, i) => (i === idx ? { ...r, ...partial } : r))
    update({ riders })
  }

  const allAcknowledged = state.riders.every(
    (r) => r.ageAcknowledged && r.weightAcknowledged
  )
  const phoneValid = state.customerPhone.trim().length > 0
  const canContinue =
    allAcknowledged &&
    state.customerName.trim().length > 0 &&
    state.customerEmail.trim().length > 0 &&
    phoneValid

  return (
    <div className="p-6 md:p-8">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-navy">Rider Details</h2>
        {state.date && state.startTime && (
          <p className="mt-1 text-sm text-teal font-medium">
            {formatDateDisplay(state.date)} at {state.startTime}
          </p>
        )}
      </div>

      {/* Party size selector */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-navy mb-3">
          Number of riders (max {MAX})
        </label>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setPartySize(state.partySize - 1)}
            disabled={state.partySize <= 1}
            className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-navy/20 text-navy font-bold text-xl hover:border-teal hover:text-teal disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            style={{ minWidth: 44, minHeight: 44 }}
            aria-label="Remove rider"
          >
            −
          </button>
          <span className="font-display text-4xl font-black text-navy w-8 text-center">
            {state.partySize}
          </span>
          <button
            onClick={() => setPartySize(state.partySize + 1)}
            disabled={state.partySize >= MAX}
            className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-navy/20 text-navy font-bold text-xl hover:border-teal hover:text-teal disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            style={{ minWidth: 44, minHeight: 44 }}
            aria-label="Add rider"
          >
            +
          </button>
          <span className="text-sm text-navy/50">
            {state.partySize} {state.partySize === 1 ? 'rider' : 'riders'}
          </span>
        </div>
      </div>

      {/* Contact info */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold text-navy mb-1.5" htmlFor="c-name">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            id="c-name"
            type="text"
            value={state.customerName}
            onChange={(e) => update({ customerName: e.target.value })}
            placeholder="Full name"
            required
            className="w-full rounded-xl border border-navy/20 px-4 py-3 text-sm text-navy placeholder:text-navy/30 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-navy mb-1.5" htmlFor="c-email">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="c-email"
            type="email"
            value={state.customerEmail}
            onChange={(e) => update({ customerEmail: e.target.value })}
            placeholder="you@example.com"
            required
            className="w-full rounded-xl border border-navy/20 px-4 py-3 text-sm text-navy placeholder:text-navy/30 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-navy mb-1.5" htmlFor="c-phone">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            id="c-phone"
            type="tel"
            value={state.customerPhone}
            onChange={(e) => update({ customerPhone: e.target.value })}
            placeholder="(313) 555-0000"
            required
            className={`w-full rounded-xl border px-4 py-3 text-sm text-navy placeholder:text-navy/30 focus:ring-2 focus:ring-teal/20 outline-none transition-all ${
              state.customerPhone.trim().length === 0 && state.customerName.trim().length > 0
                ? 'border-red-300 focus:border-red-400'
                : 'border-navy/20 focus:border-teal'
            }`}
          />
          {state.customerPhone.trim().length === 0 && state.customerName.trim().length > 0 && (
            <p className="mt-1 text-xs text-red-500">Phone number is required.</p>
          )}
        </div>
      </div>

      {/* Per-rider acknowledgements */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-navy mb-3">
          Rider Acknowledgements — please confirm for each person:
        </p>
        <div className="space-y-4">
          {state.riders.map((rider, i) => (
            <div key={i} className="rounded-2xl border border-navy/10 bg-cream/50 p-4">
              <div className="mb-3">
                <label className="block text-xs font-semibold text-navy/60 mb-1" htmlFor={`rider-name-${i}`}>
                  Rider {i + 1} name
                </label>
                <input
                  id={`rider-name-${i}`}
                  type="text"
                  value={rider.name}
                  onChange={(e) => updateRider(i, { name: e.target.value })}
                  placeholder={`Rider ${i + 1}`}
                  className="w-full rounded-lg border border-navy/15 bg-white px-3 py-2 text-sm text-navy placeholder:text-navy/30 focus:border-teal focus:ring-1 focus:ring-teal/20 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={rider.ageAcknowledged}
                    onChange={(e) => updateRider(i, { ageAcknowledged: e.target.checked })}
                    className="mt-0.5 h-4 w-4 rounded accent-teal flex-shrink-0"
                  />
                  <span className="text-sm text-navy/80">
                    Rider {i + 1} is{' '}
                    <strong>18+ with valid ID</strong>, OR is{' '}
                    <strong>16–17 with a parent/guardian who will be present on site</strong>{' '}
                    and sign consent.
                  </span>
                </label>
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={rider.weightAcknowledged}
                    onChange={(e) => updateRider(i, { weightAcknowledged: e.target.checked })}
                    className="mt-0.5 h-4 w-4 rounded accent-teal flex-shrink-0"
                  />
                  <span className="text-sm text-navy/80">
                    Rider {i + 1} weighs{' '}
                    <strong>{business.requirements.maxWeight} lbs or less</strong>{' '}
                    and meets the weight requirement.
                  </span>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Price summary */}
      <div className="rounded-2xl bg-navy/5 px-5 py-4 mb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-navy/50 mb-3">Price Summary</p>
        <div className="space-y-1.5">
          <div className="flex justify-between text-sm text-navy/70">
            <span>{state.partySize} × ${business.tour.pricePerPerson}</span>
            <span>${pricing.subtotal}</span>
          </div>
          {pricing.discountApplied && (
            <div className="flex justify-between text-sm text-teal font-medium">
              <span>Group discount (10%)</span>
              <span>−${pricing.discount}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-navy border-t border-navy/10 pt-2 mt-2">
            <span>Total</span>
            <span className="text-teal text-lg">${pricing.total}</span>
          </div>
        </div>
        {pricing.discountApplied && (
          <p className="mt-2 text-xs text-teal">🎉 Group discount applied!</p>
        )}
      </div>

      <div className="flex items-center justify-between gap-3">
        <button onClick={onBack} className="btn-secondary">
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={!canContinue}
          className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Sign Waiver →
        </button>
      </div>
      {!canContinue && (
        <p className="mt-3 text-center text-xs text-red-500">
          Please fill in your name, email, and phone number, and check all rider acknowledgements to continue.
        </p>
      )}
    </div>
  )
}
