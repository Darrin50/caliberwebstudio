/**
 * Authorize.Net charge helper — uses the REST JSON API directly (no legacy SDK).
 *
 * Endpoints:
 *   Sandbox:    https://apitest.authorize.net/xml/v1/request.api
 *   Production: https://api.authorize.net/xml/v1/request.api
 *
 * AUTHNET_ENV env var selects the environment; defaults to 'sandbox'.
 * Credentials are read from AUTHNET_API_LOGIN_ID + AUTHNET_TRANSACTION_KEY.
 * Never log or return raw credentials.
 */

const ENDPOINTS = {
  sandbox:    'https://apitest.authorize.net/xml/v1/request.api',
  production: 'https://api.authorize.net/xml/v1/request.api',
} as const

export interface AuthNetChargeParams {
  opaqueDescriptor: string   // e.g. 'COMMON.ACCEPT.INAPP.PAYMENT'
  opaqueValue: string        // nonce from Accept.js
  amount: number             // dollars (e.g. 90)
  invoiceNumber: string      // our SFF-XXXXXXXX confirmation id
  orderDescription: string   // short description for the merchant portal
  customerEmail: string
}

export interface AuthNetChargeResult {
  success: boolean
  transactionId?: string
  authCode?: string
  errorText?: string
}

function assertAuthNetConfigured(): void {
  if (!process.env.AUTHNET_API_LOGIN_ID || !process.env.AUTHNET_TRANSACTION_KEY) {
    throw new Error(
      'Authorize.Net is not configured. Set AUTHNET_API_LOGIN_ID and AUTHNET_TRANSACTION_KEY.',
    )
  }
}

export async function chargeCard(params: AuthNetChargeParams): Promise<AuthNetChargeResult> {
  assertAuthNetConfigured()

  const env = (process.env.AUTHNET_ENV ?? 'sandbox') as 'sandbox' | 'production'
  const endpoint = ENDPOINTS[env] ?? ENDPOINTS.sandbox

  const requestBody = {
    createTransactionRequest: {
      merchantAuthentication: {
        name: process.env.AUTHNET_API_LOGIN_ID,
        transactionKey: process.env.AUTHNET_TRANSACTION_KEY,
      },
      refId: params.invoiceNumber.slice(0, 20),
      transactionRequest: {
        transactionType: 'authCaptureTransaction',
        amount: params.amount.toFixed(2),
        payment: {
          opaqueData: {
            dataDescriptor: params.opaqueDescriptor,
            dataValue: params.opaqueValue,
          },
        },
        order: {
          invoiceNumber: params.invoiceNumber.slice(0, 20),
          description: params.orderDescription.slice(0, 255),
        },
        customer: {
          email: params.customerEmail,
        },
        userFields: {
          userField: [{ name: 'source', value: 'scootforfun-web' }],
        },
      },
    },
  }

  let raw: string
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(requestBody),
    })
    raw = await res.text()
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Network error reaching Authorize.Net'
    console.error('[authnet] fetch failed:', msg)
    return { success: false, errorText: 'Payment gateway unreachable. Please try again.' }
  }

  // Authorize.Net sometimes prepends a UTF-8 BOM
  let json: Record<string, unknown>
  try {
    json = JSON.parse(raw.replace(/^﻿/, ''))
  } catch {
    console.error('[authnet] failed to parse response')
    return { success: false, errorText: 'Unexpected response from payment gateway.' }
  }

  const txn = json.transactionResponse as Record<string, unknown> | undefined
  const messages = json.messages as Record<string, unknown> | undefined
  const resultCode = (messages?.resultCode as string | undefined)?.toLowerCase()

  if (resultCode === 'ok' && (txn?.responseCode as string) === '1') {
    const transactionId = txn?.transId as string
    const authCode = txn?.authCode as string
    console.log(`[authnet] charge approved — txnId=${transactionId} authCode=${authCode}`)
    return { success: true, transactionId, authCode }
  }

  // Extract the most useful error message
  const txnErrors = txn?.errors as { error?: Array<{ errorText?: string }> } | undefined
  const txnErrText = txnErrors?.error?.[0]?.errorText
  const apiMsgText = (messages?.message as Array<{ text?: string }> | undefined)?.[0]?.text
  const errorText = txnErrText ?? apiMsgText ?? 'Transaction declined.'

  console.error(`[authnet] charge failed — responseCode=${txn?.responseCode} error="${errorText}"`)
  return { success: false, errorText }
}
