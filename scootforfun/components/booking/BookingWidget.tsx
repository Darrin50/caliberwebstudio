'use client'

import { useState } from 'react'
import type { BookingState } from '@/lib/types'
import StepDate from './steps/StepDate'
import StepTime from './steps/StepTime'
import StepParty from './steps/StepParty'
import StepWaiver from './steps/StepWaiver'
import StepPayment from './steps/StepPayment'
import StepConfirmation from './steps/StepConfirmation'

const STEP_LABELS = ['Date', 'Time', 'Riders', 'Waiver', 'Payment', 'Confirmation']

const initialState: BookingState = {
  step: 1,
  date: null,
  timeWindow: null,
  startTime: null,
  partySize: 1,
  riders: [{ name: '', ageAcknowledged: false, weightAcknowledged: false }],
  waiverSigned: false,
  waiverSignature: '',
  paymentStatus: 'idle',
  paymentError: null,
  confirmationId: null,
  customerEmail: '',
  customerName: '',
  customerPhone: '',
}

export default function BookingWidget() {
  const [state, setState] = useState<BookingState>(initialState)

  const update = (partial: Partial<BookingState>) =>
    setState((prev) => ({ ...prev, ...partial }))

  const goNext = () =>
    setState((prev) => ({ ...prev, step: (prev.step + 1) as BookingState['step'] }))

  const goBack = () =>
    setState((prev) => ({ ...prev, step: (prev.step - 1) as BookingState['step'] }))

  return (
    <div className="mx-auto max-w-2xl w-full">
      {/* Progress bar — hide on confirmation step */}
      {state.step < 6 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            {STEP_LABELS.map((label, i) => {
              const stepNum = i + 1
              const isActive = stepNum === state.step
              const isDone = stepNum < state.step
              return (
                <div key={label} className="flex flex-col items-center gap-1 flex-1">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                      isDone
                        ? 'bg-teal text-white'
                        : isActive
                        ? 'bg-white text-navy ring-2 ring-teal'
                        : 'bg-white/10 text-white/40'
                    }`}
                    style={{ minWidth: 32, minHeight: 32 }}
                  >
                    {isDone ? (
                      <svg className="h-4 w-4" width={16} height={16} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      stepNum
                    )}
                  </div>
                  <span
                    className={`hidden text-xs sm:block ${
                      isActive ? 'font-semibold text-white' : isDone ? 'text-teal' : 'text-white/40'
                    }`}
                  >
                    {label}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Progress track */}
          <div className="relative h-1.5 rounded-full bg-white/10">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-teal transition-all duration-500"
              style={{ width: `${((state.step - 1) / 5) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Step card */}
      <div className="rounded-3xl bg-white shadow-xl overflow-hidden">
        {state.step === 1 && <StepDate state={state} update={update} onNext={goNext} />}
        {state.step === 2 && <StepTime state={state} update={update} onNext={goNext} onBack={goBack} />}
        {state.step === 3 && <StepParty state={state} update={update} onNext={goNext} onBack={goBack} />}
        {state.step === 4 && <StepWaiver state={state} update={update} onNext={goNext} onBack={goBack} />}
        {state.step === 5 && <StepPayment state={state} update={update} onNext={goNext} onBack={goBack} />}
        {state.step === 6 && <StepConfirmation state={state} />}
      </div>
    </div>
  )
}
