/**
 * Scoot for Fun — Sandbox Integration Test
 *
 * Run with real Authorize.Net SANDBOX credentials to prove the charge flow
 * before going live. Also exercises the double-booking logic (mock KV).
 *
 * Usage:
 *   AUTHNET_API_LOGIN_ID=xxx AUTHNET_TRANSACTION_KEY=xxx AUTHNET_ENV=sandbox \
 *   node scripts/test-sandbox.mjs
 *
 * Authorize.Net sandbox test cards:
 *   Visa approve:   4111 1111 1111 1111  exp: any future date  cvv: any
 *   Visa decline:   4222 2222 2222 2222
 *   Insufficient:   4000 0000 0000 0002
 *
 * This script calls the Authorize.Net sandbox API DIRECTLY with card data
 * (no browser / Accept.js needed for server-to-server sandbox verification).
 * Production always uses Accept.js opaque tokens — never raw card data.
 */

const ENDPOINTS = {
  sandbox:    'https://apitest.authorize.net/xml/v1/request.api',
  production: 'https://api.authorize.net/xml/v1/request.api',
}

const API_LOGIN_ID      = process.env.AUTHNET_API_LOGIN_ID
const TRANSACTION_KEY   = process.env.AUTHNET_TRANSACTION_KEY
const AUTHNET_ENV       = process.env.AUTHNET_ENV ?? 'sandbox'

function assert(cond, msg) {
  if (!cond) { console.error(`  ✗ FAIL: ${msg}`); process.exitCode = 1 }
  else        { console.log (`  ✓ ${msg}`) }
}

// ─── Direct-card charge helper (sandbox only, never used in production) ────
async function chargeDirectCard({ cardNumber, expiry, cvv, amount, invoiceNumber }) {
  const endpoint = ENDPOINTS[AUTHNET_ENV] ?? ENDPOINTS.sandbox
  const body = {
    createTransactionRequest: {
      merchantAuthentication: { name: API_LOGIN_ID, transactionKey: TRANSACTION_KEY },
      refId: invoiceNumber,
      transactionRequest: {
        transactionType: 'authCaptureTransaction',
        amount: amount.toFixed(2),
        payment: {
          creditCard: { cardNumber, expirationDate: expiry, cardCode: cvv },
        },
        order: { invoiceNumber, description: 'Scoot for Fun sandbox test' },
        customer: { email: 'sandbox-test@scootforfun.com' },
      },
    },
  }

  const res  = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  })
  const text = await res.text()
  const json = JSON.parse(text.replace(/^﻿/, ''))
  return json
}

// ─── In-process KV mock (proves reservation logic without real Redis) ──────
class MockKv {
  constructor() { this._data = new Map() }
  async get(k)               { return this._data.get(k) ?? null }
  async set(k, v)            { this._data.set(k, v) }
  async incrby(k, n)         { const v = (this._data.get(k) ?? 0) + n; this._data.set(k, v); return v }
  async decrby(k, n)         { const v = (this._data.get(k) ?? 0) - n; this._data.set(k, v); return v }
}

async function reserveSlotMock(kv, date, windowId, slot, partySize, capacity) {
  const k = `sff:slot:${date}:${windowId}:${slot.replace(/[\s:]/g, '_')}`
  const newCount = await kv.incrby(k, partySize)
  if (newCount > capacity) {
    const rolledBack = await kv.decrby(k, partySize)
    const current = Math.max(0, rolledBack)
    return { reserved: false, available: Math.max(0, capacity - current) }
  }
  return { reserved: true, available: capacity - newCount }
}

// ─── Tests ─────────────────────────────────────────────────────────────────

async function testAuthNetConfig() {
  console.log('\n[1] Authorize.Net credential check')
  assert(Boolean(API_LOGIN_ID), 'AUTHNET_API_LOGIN_ID is set')
  assert(Boolean(TRANSACTION_KEY), 'AUTHNET_TRANSACTION_KEY is set')
  assert(AUTHNET_ENV === 'sandbox', `AUTHNET_ENV is "sandbox" (got "${AUTHNET_ENV}")`)
}

async function testApprovedCharge() {
  console.log('\n[2] Approved charge — Visa test card 4111 1111 1111 1111')
  if (!API_LOGIN_ID || !TRANSACTION_KEY) {
    console.log('  ⚠ Skipped — credentials not set')
    return
  }

  const json = await chargeDirectCard({
    cardNumber: '4111111111111111',
    expiry: '2035-12',
    cvv: '123',
    amount: 90,
    invoiceNumber: 'SFF-SANDBOX01',
  })

  const txn       = json?.transactionResponse
  const resultCode = json?.messages?.resultCode?.toLowerCase()
  const transId   = txn?.transId
  const authCode  = txn?.authCode

  assert(resultCode === 'ok', `resultCode is "Ok" (got "${resultCode}")`)
  assert(txn?.responseCode === '1', `responseCode is 1 (got "${txn?.responseCode}")`)
  assert(Boolean(transId && transId !== '0'), `transactionId returned: ${transId}`)
  assert(Boolean(authCode), `authCode returned: ${authCode}`)

  console.log(`  → txnId=${transId}  authCode=${authCode}`)
}

async function testDeclinedCharge() {
  console.log('\n[3] Declined charge — Visa decline card 4222 2222 2222 2222')
  if (!API_LOGIN_ID || !TRANSACTION_KEY) {
    console.log('  ⚠ Skipped — credentials not set')
    return
  }

  const json = await chargeDirectCard({
    cardNumber: '4222222222222222',
    expiry: '2035-12',
    cvv: '123',
    amount: 50,
    invoiceNumber: 'SFF-SANDBOX02',
  })

  const txn       = json?.transactionResponse
  const resultCode = json?.messages?.resultCode?.toLowerCase()

  assert(resultCode === 'error' || txn?.responseCode !== '1', 'Declined card returns non-approval')
  const errText = txn?.errors?.error?.[0]?.errorText ?? json?.messages?.message?.[0]?.text ?? '(none)'
  console.log(`  → Decline reason: ${errText}`)
}

async function testDoubleBookPrevention() {
  console.log('\n[4] Double-booking prevention (mock KV, no real Redis needed)')
  const kv       = new MockKv()
  const date     = '2026-08-15'
  const window   = 'morning'
  const slot     = '9:00 AM'
  const capacity = 4

  // Booking A — 3 riders, should succeed
  const a = await reserveSlotMock(kv, date, window, slot, 3, capacity)
  assert(a.reserved === true,  `Booking A (3 riders) reserved successfully`)
  assert(a.available === 1,    `1 seat remains after Booking A`)

  // Booking B — 2 riders, should fail (only 1 left)
  const b = await reserveSlotMock(kv, date, window, slot, 2, capacity)
  assert(b.reserved === false, `Booking B (2 riders) correctly rejected — slot too full`)
  assert(b.available <= 1,     `Available after rollback is 0 or 1 (got ${b.available})`)

  // Booking C — 1 rider, should succeed (1 seat still open)
  const c = await reserveSlotMock(kv, date, window, slot, 1, capacity)
  assert(c.reserved === true,  `Booking C (1 rider) fills the last seat`)
  assert(c.available === 0,    `0 seats remain after Booking C`)

  // Booking D — 1 rider, should fail (slot is full)
  const d = await reserveSlotMock(kv, date, window, slot, 1, capacity)
  assert(d.reserved === false, `Booking D correctly rejected — slot is full`)
  assert(d.available === 0,    `0 seats confirmed`)
}

async function testSlotReleaseOnFailure() {
  console.log('\n[5] Slot release on charge failure (mock KV)')
  const kv       = new MockKv()
  const date     = '2026-08-15'
  const window   = 'afternoon'
  const slot     = '1:00 PM'
  const capacity = 4

  // Reserve 4 riders
  const r = await reserveSlotMock(kv, date, window, slot, 4, capacity)
  assert(r.reserved === true, 'Reserved 4 riders')

  // Simulate charge failure — release the slot
  const k = `sff:slot:${date}:${window}:${slot.replace(/[\s:]/g, '_')}`
  const afterRelease = await kv.decrby(k, 4)
  if (afterRelease < 0) await kv.set(k, 0)

  // Re-attempt — should succeed now
  const retry = await reserveSlotMock(kv, date, window, slot, 4, capacity)
  assert(retry.reserved === true, 'Slot re-available after charge failure + release')
}

// ─── Runner ─────────────────────────────────────────────────────────────────

console.log('═══════════════════════════════════════════════════')
console.log('  Scoot for Fun — Sandbox Integration Test')
console.log(`  Env: ${AUTHNET_ENV}  Time: ${new Date().toISOString()}`)
console.log('═══════════════════════════════════════════════════')

await testAuthNetConfig()
await testApprovedCharge()
await testDeclinedCharge()
await testDoubleBookPrevention()
await testSlotReleaseOnFailure()

console.log('\n═══════════════════════════════════════════════════')
if (process.exitCode === 1) {
  console.log('  RESULT: ✗ Some tests failed — see above')
} else {
  console.log('  RESULT: ✓ All tests passed')
}
console.log('═══════════════════════════════════════════════════\n')
