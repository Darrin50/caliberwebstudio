'use client'

import type { BookingState } from '@/lib/types'

interface Props {
  state: BookingState
  update: (p: Partial<BookingState>) => void
  onNext: () => void
  onBack: () => void
}

export default function StepWaiver({ state, update, onNext, onBack }: Props) {
  const canProceed =
    state.waiverSigned &&
    state.waiverSignature.trim().toLowerCase() === state.customerName.trim().toLowerCase()

  return (
    <div className="p-6 md:p-8">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-navy">Safety Waiver</h2>
        <p className="mt-1 text-sm text-navy/60">
          All riders must agree to the safety waiver before booking is confirmed.
        </p>
      </div>

      {/* Waiver text — legal review recommended before launch (comment only, not visible) */}
      <div className="mb-6 max-h-72 overflow-y-auto rounded-2xl border border-navy/15 bg-cream/50 p-5 text-sm text-navy/75 leading-relaxed space-y-4">
        <p className="font-bold text-navy text-base">SAFETY WAIVER &amp; RELEASE OF LIABILITY</p>

        <p>By signing below, I acknowledge and agree:</p>

        <ul className="space-y-2 pl-1">
          {[
            'I am renting/operating a mobility scooter at my own risk.',
            'I am physically able to operate the scooter safely.',
            'I will follow all safety instructions and traffic laws.',
            'I will wear/use safety equipment as provided/required.',
            'Scoot for Fun is not liable for any injury, accident, or damage to myself, others, or property during the rental/tour.',
            'I am responsible for any damage to the scooter due to negligence or misuse.',
            'I agree to return the scooter in the same condition.',
            'I am 18 years or older (or 16+ with parent/guardian present & signature).',
          ].map((point) => (
            <li key={point} className="flex items-start gap-2">
              <span className="mt-1 flex-shrink-0 h-1.5 w-1.5 rounded-full bg-navy/40" style={{ marginTop: 6, minWidth: 6, minHeight: 6 }} />
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <p className="font-medium text-navy">
          I have read and understood this waiver and sign voluntarily.
        </p>
      </div>

      {/* Acknowledgement checkbox */}
      <label className="mb-5 flex cursor-pointer items-start gap-3 rounded-2xl border border-navy/15 bg-white p-4">
        <input
          type="checkbox"
          checked={state.waiverSigned}
          onChange={(e) => update({ waiverSigned: e.target.checked })}
          className="mt-0.5 h-5 w-5 rounded accent-teal flex-shrink-0"
        />
        <span className="text-sm text-navy/80">
          I have read and agree to the Safety Waiver &amp; Release of Liability above on behalf of myself and all riders in my party. I understand I must also sign in person at the start of the tour.
        </span>
      </label>

      {/* Typed signature */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-navy mb-1.5" htmlFor="sig">
          Type your full name to sign <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-navy/50 mb-2">
          Must match your booking name: <strong>{state.customerName || '—'}</strong>
        </p>
        <input
          id="sig"
          type="text"
          value={state.waiverSignature}
          onChange={(e) => update({ waiverSignature: e.target.value })}
          placeholder="Type your full name exactly"
          className="w-full rounded-xl border border-navy/20 px-4 py-3 text-sm font-medium text-navy placeholder:text-navy/30 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all"
          style={{ fontFamily: 'cursive' }}
        />
        {state.waiverSignature.length > 0 && !canProceed && (
          <p className="mt-1.5 text-xs text-red-500">
            Name doesn&apos;t match. Type: &ldquo;{state.customerName}&rdquo;
          </p>
        )}
        {canProceed && (
          <p className="mt-1.5 text-xs text-teal font-medium">✓ Signature accepted</p>
        )}
      </div>

      <div className="rounded-xl bg-yellow-50 border border-yellow-200 px-4 py-3 mb-6">
        <p className="text-xs text-yellow-800">
          <strong>Reminder:</strong> You will also need to sign a physical waiver at the start of your tour at the meet-up point.
        </p>
      </div>

      <div className="flex items-center justify-between gap-3">
        <button onClick={onBack} className="btn-secondary">
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Proceed to Payment →
        </button>
      </div>
    </div>
  )
}
