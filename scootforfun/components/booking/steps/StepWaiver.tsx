'use client'

import { useState } from 'react'
import type { BookingState } from '@/lib/types'

interface Props {
  state: BookingState
  update: (p: Partial<BookingState>) => void
  onNext: () => void
  onBack: () => void
}

// General warnings sourced from the scooter manufacturer's safety manual.
// [Legal review recommended before launch — comment only, not visible on page]
const SAFETY_RULES = [
  'Never operate the scooter while under the influence of alcohol or drugs.',
  'Never use electronic radio transmitters such as walkie-talkies or cell phones while operating.',
  'Make sure there are no obstacles behind you when reversing.',
  'Do not ride the scooter in traffic.',
  'Do not ride in snow or slippery conditions to avoid accidents.',
  'Do not attempt to climb, ascend, or descend ramps greater than 8 degrees.',
  'Do not make sharp turns at high speed in forward or reverse.',
  'Do not attempt to climb curbs beyond the limits in the technical specification.',
  'Do not use an escalator to move the scooter between floors — risk of serious injury.',
]

export default function StepWaiver({ state, update, onNext, onBack }: Props) {
  const [safetyAgreed, setSafetyAgreed] = useState(false)

  const canProceed =
    state.waiverSigned &&
    safetyAgreed &&
    state.waiverSignature.trim().toLowerCase() === state.customerName.trim().toLowerCase()

  return (
    <div className="p-6 md:p-8">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-navy">Safety Waiver</h2>
        <p className="mt-1 text-sm text-navy/60">
          Please read both sections and check all boxes before continuing.
        </p>
      </div>

      {/* ── Section 1: Release of Liability ───────────────────────── */}
      <div className="mb-5 rounded-2xl border border-navy/15 bg-cream/50 overflow-hidden">
        <div className="bg-navy/5 px-5 py-2.5 border-b border-navy/10">
          <p className="text-xs font-bold uppercase tracking-widest text-navy/60">
            Part 1 — Release of Liability
          </p>
        </div>
        <div className="max-h-52 overflow-y-auto px-5 py-4 text-sm text-navy/75 leading-relaxed space-y-3">
          <p className="font-bold text-navy">SAFETY WAIVER &amp; RELEASE OF LIABILITY</p>
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
                <span className="flex-shrink-0 rounded-full bg-navy/30" style={{ marginTop: 6, width: 6, height: 6, minWidth: 6, minHeight: 6 }} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <p className="font-medium text-navy">
            I have read and understood this waiver and sign voluntarily.
          </p>
        </div>
      </div>

      {/* Release checkbox */}
      <label className="mb-5 flex cursor-pointer items-start gap-3 rounded-xl border border-navy/15 bg-white p-4">
        <input
          type="checkbox"
          checked={state.waiverSigned}
          onChange={(e) => update({ waiverSigned: e.target.checked })}
          className="mt-0.5 h-5 w-5 rounded accent-teal flex-shrink-0"
        />
        <span className="text-sm text-navy/80">
          I agree to the Release of Liability above on behalf of myself and all riders, and understand I must sign in person at the start of the tour.
        </span>
      </label>

      {/* ── Section 2: General Warnings ───────────────────────────── */}
      <div className="mb-5 rounded-2xl border border-navy/15 bg-cream/50 overflow-hidden">
        <div className="bg-navy/5 px-5 py-2.5 border-b border-navy/10">
          <p className="text-xs font-bold uppercase tracking-widest text-navy/60">
            Part 2 — General Warnings &amp; Safety Rules
          </p>
        </div>
        <div className="max-h-52 overflow-y-auto px-5 py-4 text-sm text-navy/75 leading-relaxed space-y-3">
          <p>I understand and agree to follow <strong>all</strong> of the following safety rules while operating the scooter:</p>
          <ul className="space-y-2 pl-1">
            {SAFETY_RULES.map((rule) => (
              <li key={rule} className="flex items-start gap-2">
                <span className="flex-shrink-0 rounded-full bg-navy/30" style={{ marginTop: 6, width: 6, height: 6, minWidth: 6, minHeight: 6 }} />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Safety rules checkbox */}
      <label className="mb-5 flex cursor-pointer items-start gap-3 rounded-xl border border-navy/15 bg-white p-4">
        <input
          type="checkbox"
          checked={safetyAgreed}
          onChange={(e) => setSafetyAgreed(e.target.checked)}
          className="mt-0.5 h-5 w-5 rounded accent-teal flex-shrink-0"
        />
        <span className="text-sm text-navy/80">
          I have read and agree to follow <strong>all</strong> of the General Warnings &amp; Safety Rules listed above.
        </span>
      </label>

      {/* ── Typed signature ───────────────────────────────────────── */}
      <div className="mb-5">
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
          <strong>Reminder:</strong> You will also need to sign a physical waiver at the meet-up point before the tour starts.
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

      {(!state.waiverSigned || !safetyAgreed) && state.waiverSignature.length > 0 && (
        <p className="mt-3 text-center text-xs text-red-500">
          Please check both acknowledgement boxes and type your name to continue.
        </p>
      )}
    </div>
  )
}
