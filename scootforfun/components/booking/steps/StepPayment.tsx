'use client'

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import type { BookingState } from '@/lib/types'
import { calcTourPrice, formatDateDisplay, generateConfirmationId } from '@/lib/utils'
import { business } from '@/lib/constants'

interface Props {
  state: BookingState
  update: (p: Partial<BookingState>) => void
  onNext: () => void
  onBack: () => void
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Square?: any
  }
}

const APP_ID = process.env.NEXT_PUBLIC_SQUARE_APP_ID
const LOCATION_ID = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID

export default function StepPayment({ state, update, onNext, onBack }: Props) {
  const pricing = calcTourPrice(state.partySize)
  const cardRef = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cardInstanceRef = useRef<any>(null)
  const [sdkReady, setSdkReady] = useState(false)
  const [cardReady, setCardReady] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const squareConfigured = Boolean(APP_ID && LOCATION_ID)

  async function initSquare() {
    if (!window.Square || !APP_ID || !LOCATION_ID || !cardRef.current) return
    try {
      const payments = window.Square.payments(APP_ID, LOCATION_ID)
      const card = await payments.card()
      await card.attach(cardRef.current)
      cardInstanceRef.current = card
      setCardReady(true)
    } catch {
      setError('Failed to load payment form. Please refresh and try again.')
    }
  }

  useEffect(() => {
    if (sdkReady && squareConfigured) {
      initSquare()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sdkReady])

  async function handlePay() {
    if (!cardInstanceRef.current) return
    setProcessing(true)
    setError(null)
    update({ paymentStatus: 'processing' })

    try {
      const result = await cardInstanceRef.current.tokenize()
      if (result.status !== 'OK') {
        throw new Error(result.errors?.[0]?.message ?? 'Card tokenization failed')
      }

      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: state.date,
          timeWindow: state.timeWindow,
          startTime: state.startTime,
          partySize: state.partySize,
          riders: state.riders,
          customerName: state.customerName,
          customerEmail: state.customerEmail,
          customerPhone: state.customerPhone,
          totalAmount: pricing.total,
          sourceToken: result.token,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Booking failed')

      update({
        paymentStatus: 'success',
        confirmationId: data.confirmationId ?? generateConfirmationId(),
      })
      onNext()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Payment failed. Please try again.'
      setError(msg)
      update({ paymentStatus: 'error', paymentError: msg })
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="p-6 md:p-8">
      {squareConfigured && (
        <Script
          src={
            APP_ID?.startsWith('sandbox')
              ? 'https://sandbox.web.squarecdn.com/v1/square.js'
              : 'https://web.squarecdn.com/v1/square.js'
          }
          strategy="afterInteractive"
          onLoad={() => setSdkReady(true)}
        />
      )}

      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-navy">Payment</h2>
        {state.date && state.startTime && (
          <p className="mt-1 text-sm text-teal font-medium">
            {formatDateDisplay(state.date)} at {state.startTime} · {state.partySize}{' '}
            {state.partySize === 1 ? 'rider' : 'riders'}
          </p>
        )}
      </div>

      {/* Order summary */}
      <div className="mb-6 rounded-2xl bg-cream px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-navy/50 mb-3">Order Summary</p>
        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between text-navy/70">
            <span>{state.partySize} × ${business.tour.pricePerPerson} tour</span>
            <span>${pricing.subtotal}</span>
          </div>
          {pricing.discountApplied && (
            <div className="flex justify-between text-teal font-medium">
              <span>Group discount (10%)</span>
              <span>−${pricing.discount}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-navy border-t border-navy/10 pt-2 mt-2 text-base">
            <span>Total due today</span>
            <span className="text-teal">${pricing.total}.00</span>
          </div>
        </div>
      </div>

      {/* Payment form */}
      {squareConfigured ? (
        <div className="mb-6">
          <label className="block text-sm font-semibold text-navy mb-2">Card Details</label>
          {/* Square card element mounts here */}
          <div
            ref={cardRef}
            id="square-card-container"
            className="min-h-[100px] rounded-xl border border-navy/20 p-3"
            aria-label="Card payment form"
          />
          {!cardReady && (
            <div className="flex items-center justify-center py-4">
              <div className="h-5 w-5 rounded-full border-2 border-teal border-t-transparent animate-spin" />
              <span className="ml-2 text-xs text-navy/50">Loading secure payment form…</span>
            </div>
          )}
        </div>
      ) : (
        /* Payment setup pending state */
        <div className="mb-6 rounded-2xl border-2 border-dashed border-yellow-300 bg-yellow-50 p-6 text-center">
          <svg className="mx-auto mb-3 h-10 w-10 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="font-semibold text-yellow-800 text-sm">Payment Setup Pending</p>
          <p className="mt-1 text-xs text-yellow-700">
            Square payment keys have not been configured yet. Set{' '}
            <code className="bg-yellow-100 px-1 py-0.5 rounded text-yellow-900">NEXT_PUBLIC_SQUARE_APP_ID</code> and{' '}
            <code className="bg-yellow-100 px-1 py-0.5 rounded text-yellow-900">NEXT_PUBLIC_SQUARE_LOCATION_ID</code> in your environment to enable payments.
          </p>
          <p className="mt-3 text-xs text-yellow-600">
            To book in the meantime, call{' '}
            <a href={business.phoneHref} className="underline font-medium">
              {business.phone}
            </a>
          </p>
        </div>
      )}

      {error && (
        <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <p className="mb-6 flex items-center gap-2 text-xs text-navy/40">
        <svg className="h-4 w-4 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        Secured by Square. Your card details are never stored on our servers.
      </p>

      <div className="flex items-center justify-between gap-3">
        <button onClick={onBack} disabled={processing} className="btn-secondary disabled:opacity-40">
          ← Back
        </button>
        {squareConfigured ? (
          <button
            onClick={handlePay}
            disabled={!cardReady || processing}
            className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed min-w-[160px]"
          >
            {processing ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                Processing…
              </span>
            ) : (
              `Pay $${pricing.total} →`
            )}
          </button>
        ) : (
          <a href={business.phoneHref} className="btn-primary">
            Call to Book
          </a>
        )}
      </div>
    </div>
  )
}
