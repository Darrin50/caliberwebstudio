'use client'

import { useState } from 'react'
import Script from 'next/script'
import type { BookingState } from '@/lib/types'
import { calcTourPrice, formatDateDisplay } from '@/lib/utils'
import { business } from '@/lib/constants'

interface Props {
  state: BookingState
  update: (p: Partial<BookingState>) => void
  onNext: () => void
  onBack: () => void
}

// ── Accept.js type declarations ───────────────────────────────────────────────
declare global {
  interface Window {
    Accept?: {
      dispatchData: (
        secureData: AcceptSecureData,
        callback: (response: AcceptResponse) => void,
      ) => void
    }
  }
}

interface AcceptSecureData {
  authData: { clientKey: string; apiLoginID: string }
  cardData: {
    cardNumber: string
    month: string
    year: string
    cardCode: string
  }
}

interface AcceptResponse {
  messages: {
    resultCode: 'Ok' | 'Error'
    message?: Array<{ code: string; text: string }>
  }
  opaqueData: {
    dataDescriptor: string
    dataValue: string
  }
}

// ── Environment ───────────────────────────────────────────────────────────────
const AUTHNET_ENV = process.env.NEXT_PUBLIC_AUTHNET_ENV ?? 'sandbox'
const PUBLIC_CLIENT_KEY = process.env.NEXT_PUBLIC_AUTHNET_PUBLIC_CLIENT_KEY ?? ''
const API_LOGIN_ID = process.env.NEXT_PUBLIC_AUTHNET_API_LOGIN_ID ?? ''
const ACCEPT_JS_URL =
  AUTHNET_ENV === 'production'
    ? 'https://js.authorize.net/v1/Accept.js'
    : 'https://jstest.authorize.net/v1/Accept.js'

const authnetConfigured = Boolean(PUBLIC_CLIENT_KEY && API_LOGIN_ID)

// ── Card number formatter ─────────────────────────────────────────────────────
function formatCardNumber(raw: string): string {
  return raw
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim()
}

function formatExpiry(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 4)
  if (digits.length <= 2) return digits
  return `${digits.slice(0, 2)} / ${digits.slice(2)}`
}

// ── Accept.js tokenisation ────────────────────────────────────────────────────
function dispatchAcceptData(secureData: AcceptSecureData): Promise<AcceptResponse['opaqueData']> {
  return new Promise((resolve, reject) => {
    if (!window.Accept) {
      reject(new Error('Authorize.Net Accept.js did not load. Please refresh and try again.'))
      return
    }
    window.Accept.dispatchData(secureData, (response) => {
      if (response.messages.resultCode === 'Error') {
        const text = response.messages.message?.[0]?.text ?? 'Card tokenisation failed.'
        reject(new Error(text))
      } else {
        resolve(response.opaqueData)
      }
    })
  })
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function StepPayment({ state, update, onNext, onBack }: Props) {
  const pricing = calcTourPrice(state.partySize)

  const [sdkReady, setSdkReady] = useState(false)
  const [sdkLoadFailed, setSdkLoadFailed] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Controlled card fields
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [cardName, setCardName] = useState(state.customerName)

  async function handlePay() {
    if (!authnetConfigured || !sdkReady) return
    setProcessing(true)
    setError(null)
    update({ paymentStatus: 'processing' })

    // Basic client-side validation before hitting Accept.js
    const rawCard = cardNumber.replace(/\s/g, '')
    if (rawCard.length < 13) {
      setError('Please enter a valid card number.')
      setProcessing(false)
      update({ paymentStatus: 'idle' })
      return
    }
    const expiryDigits = expiry.replace(/\D/g, '')
    if (expiryDigits.length < 4) {
      setError('Please enter a valid expiry date (MM / YY).')
      setProcessing(false)
      update({ paymentStatus: 'idle' })
      return
    }
    if (cvv.length < 3) {
      setError('Please enter a valid CVV.')
      setProcessing(false)
      update({ paymentStatus: 'idle' })
      return
    }

    try {
      // Tokenise card — raw number goes direct to Authorize.Net, never our server
      const opaqueData = await dispatchAcceptData({
        authData: { clientKey: PUBLIC_CLIENT_KEY, apiLoginID: API_LOGIN_ID },
        cardData: {
          cardNumber: rawCard,
          month: expiryDigits.slice(0, 2),
          year: expiryDigits.slice(2, 4),
          cardCode: cvv,
        },
      })

      // Submit booking + payment to our server
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
          opaqueDescriptor: opaqueData.dataDescriptor,
          opaqueValue: opaqueData.dataValue,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Booking failed. Please try again.')

      update({
        paymentStatus: 'success',
        confirmationId: data.confirmationId,
        transactionId: data.transactionId,
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

  const inputClass =
    'w-full rounded-xl border border-navy/20 px-4 py-3 text-sm text-navy placeholder:text-navy/30 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20 transition-colors'

  return (
    <div className="p-6 md:p-8">
      {authnetConfigured && (
        <Script
          src={ACCEPT_JS_URL}
          strategy="afterInteractive"
          onLoad={() => setSdkReady(true)}
          onError={() => {
            setSdkLoadFailed(true)
            setError('Failed to load the secure payment module. Please call us to book.')
          }}
        />
      )}

      {/* Header */}
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
            <span>
              {state.partySize} × ${business.tour.pricePerPerson} tour
            </span>
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
      {authnetConfigured ? (
        <div className="mb-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-navy mb-1.5" htmlFor="card-name">
              Name on Card
            </label>
            <input
              id="card-name"
              type="text"
              autoComplete="cc-name"
              placeholder="Jane Smith"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              className={inputClass}
              disabled={processing}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-navy mb-1.5" htmlFor="card-number">
              Card Number
            </label>
            <input
              id="card-number"
              type="text"
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              className={inputClass}
              disabled={processing}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-navy mb-1.5" htmlFor="card-expiry">
                Expiry
              </label>
              <input
                id="card-expiry"
                type="text"
                inputMode="numeric"
                autoComplete="cc-exp"
                placeholder="MM / YY"
                value={expiry}
                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                className={inputClass}
                disabled={processing}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy mb-1.5" htmlFor="card-cvv">
                CVV
              </label>
              <input
                id="card-cvv"
                type="text"
                inputMode="numeric"
                autoComplete="cc-csc"
                placeholder="123"
                maxLength={4}
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                className={inputClass}
                disabled={processing}
              />
            </div>
          </div>

          {!sdkReady && (
            <div className="flex items-center gap-2 text-xs text-navy/50">
              <span className="h-3.5 w-3.5 rounded-full border-2 border-teal border-t-transparent animate-spin" style={{ minWidth: 14, minHeight: 14 }} />
              Loading secure payment module…
            </div>
          )}
        </div>
      ) : (
        <div className="mb-6 rounded-2xl border-2 border-dashed border-yellow-300 bg-yellow-50 p-6 text-center">
          <svg className="mx-auto mb-3 h-10 w-10 text-yellow-500" width={40} height={40} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="font-semibold text-yellow-800 text-sm">Payment Setup Pending</p>
          <p className="mt-1 text-xs text-yellow-700">
            Authorize.Net keys have not been configured.{' '}
            Set <code className="bg-yellow-100 px-1 rounded">NEXT_PUBLIC_AUTHNET_PUBLIC_CLIENT_KEY</code>,{' '}
            <code className="bg-yellow-100 px-1 rounded">NEXT_PUBLIC_AUTHNET_API_LOGIN_ID</code>, and{' '}
            <code className="bg-yellow-100 px-1 rounded">NEXT_PUBLIC_AUTHNET_ENV</code> in Vercel.
          </p>
          <p className="mt-3 text-xs text-yellow-600">
            To book now, call{' '}
            <a href={business.phoneHref} className="underline font-medium">
              {business.phone}
            </a>
          </p>
        </div>
      )}

      {error && (
        <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700" role="alert">
          {error}
        </div>
      )}

      {/* Security badge */}
      <p className="mb-6 flex items-center gap-2 text-xs text-navy/40">
        <svg className="h-4 w-4 text-teal" width={16} height={16} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        Secured by Authorize.Net. Your card details are never stored on our servers.
      </p>

      <div className="flex items-center justify-between gap-3">
        <button onClick={onBack} disabled={processing} className="btn-secondary disabled:opacity-40">
          ← Back
        </button>
        {authnetConfigured && !sdkLoadFailed ? (
          <button
            onClick={handlePay}
            disabled={!sdkReady || processing}
            className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed min-w-[160px]"
          >
            {processing ? (
              <span className="flex items-center gap-2">
                <span
                  className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin"
                  style={{ display: 'inline-block', minWidth: 16, minHeight: 16 }}
                />
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
