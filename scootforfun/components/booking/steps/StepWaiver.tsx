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

      {/* Waiver text */}
      <div className="mb-6 max-h-64 overflow-y-auto rounded-2xl border border-navy/15 bg-cream/50 p-5 text-sm text-navy/75 leading-relaxed space-y-3">
        <p className="font-bold text-navy">SCOOT FOR FUN — RELEASE OF LIABILITY, WAIVER OF CLAIMS, ASSUMPTION OF RISK &amp; INDEMNITY AGREEMENT</p>

        <p>
          By participating in Scoot for Fun guided tours (&ldquo;Activity&rdquo;), you acknowledge and agree to the following:
        </p>

        <p>
          <strong>1. ASSUMPTION OF RISK.</strong> I understand that riding a mobility scooter involves inherent risks including, but not limited to, falls, collisions, equipment failure, and unforeseen hazards. I voluntarily accept these risks.
        </p>

        <p>
          <strong>2. RIDER REQUIREMENTS.</strong> I confirm that all riders in my party are at least 12 years of age and weigh no more than 260 lbs. I understand that false statements may result in cancellation without refund.
        </p>

        <p>
          <strong>3. RELEASE OF LIABILITY.</strong> I release, waive, and discharge Scoot for Fun and its owners, operators, employees, and agents from any and all claims, demands, or causes of action arising out of participation in this Activity.
        </p>

        <p>
          <strong>4. FOLLOW GUIDE INSTRUCTIONS.</strong> I agree to follow all instructions from the tour guide at all times and to operate the scooter safely and responsibly.
        </p>

        <p>
          <strong>5. CONFIRMATION IN PERSON.</strong> I understand this digital acknowledgement must also be confirmed with a physical signature at the start of the tour.
        </p>

        <p className="text-xs text-navy/40 italic">
          [TODO: Owner should have this waiver reviewed by legal counsel before going live. This is a placeholder draft.]
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
          I have read and agree to the Release of Liability, Waiver of Claims, Assumption of Risk &amp; Indemnity Agreement on behalf of myself and all riders in my party. I understand I must also sign in person at the start of the tour.
        </span>
      </label>

      {/* Typed signature */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-navy mb-1.5" htmlFor="sig">
          Type your full name to sign *
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
