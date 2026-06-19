/**
 * Durable slot availability store backed by Vercel KV (Upstash Redis).
 *
 * Key format: sff:slot:{date}:{windowId}:{slot_escaped}
 * Value:      integer count of booked seats for that slot.
 *
 * Atomic reservation uses Redis INCRBY: the increment is atomic, so the
 * first caller to push the count over capacity automatically "wins" and
 * subsequent callers get rolled back. This prevents double-booking without
 * requiring Lua scripts.
 *
 * If the KV env vars are absent the functions throw a KvUnconfiguredError
 * so callers can return a safe 503 instead of silently skipping.
 */

import { kv } from '@vercel/kv'

export class KvUnconfiguredError extends Error {
  constructor() {
    super('Vercel KV is not configured. Set KV_REST_API_URL and KV_REST_API_TOKEN.')
    this.name = 'KvUnconfiguredError'
  }
}

function assertKvConfigured(): void {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    throw new KvUnconfiguredError()
  }
}

function slotKey(date: string, windowId: string, slot: string): string {
  // e.g. sff:slot:2026-07-15:morning:9_00_AM
  return `sff:slot:${date}:${windowId}:${slot.replace(/[\s:]/g, '_')}`
}

export async function getBooked(
  date: string,
  windowId: string,
  slot: string,
): Promise<number> {
  assertKvConfigured()
  const val = await kv.get<number>(slotKey(date, windowId, slot))
  return Math.max(0, val ?? 0)
}

/**
 * Atomically reserve `partySize` seats for a slot.
 *
 * Returns { reserved: true } if seats were secured, or
 * { reserved: false, available } if the slot was too full.
 *
 * On failure the increment is rolled back before returning.
 */
export async function reserveSlot(
  date: string,
  windowId: string,
  slot: string,
  partySize: number,
  capacity: number,
): Promise<{ reserved: boolean; available: number }> {
  assertKvConfigured()
  const k = slotKey(date, windowId, slot)

  const newCount = await kv.incrby(k, partySize)

  if (newCount > capacity) {
    const rolledBack = await kv.decrby(k, partySize)
    const current = Math.max(0, rolledBack)
    return { reserved: false, available: Math.max(0, capacity - current) }
  }

  return { reserved: true, available: capacity - newCount }
  // TODO (P2): Add per-reservation TTL to auto-release seats held by crashed
  // requests. Current gap: if the server crashes between reserveSlot and
  // chargeCard, the seats remain locked until manually cleared or capacity
  // is bumped. Fix: store reservations as a sorted set (ZADD with epoch score)
  // and run a periodic cleanup job, or use a separate key per-reservation with
  // EXPIRE (requires tracking reservation IDs).
}

/**
 * Release a previously reserved slot (called when a charge fails).
 */
export async function releaseSlot(
  date: string,
  windowId: string,
  slot: string,
  partySize: number,
): Promise<void> {
  assertKvConfigured()
  const k = slotKey(date, windowId, slot)
  const val = await kv.decrby(k, partySize)
  if (val < 0) await kv.set(k, 0)
}

/** Legacy compatibility — used by availability route. */
export { getBooked as getBookedCount }
