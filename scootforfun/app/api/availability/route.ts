import { NextRequest, NextResponse } from 'next/server'
import { business } from '@/lib/constants'
import { getBooked, KvUnconfiguredError } from '@/lib/bookingStore'
import type { SlotAvailability, TimeWindowId } from '@/lib/types'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const date = searchParams.get('date')

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json(
      { error: 'Invalid or missing date parameter (YYYY-MM-DD)' },
      { status: 400 },
    )
  }

  try {
    const availability: SlotAvailability[] = await Promise.all(
      business.timeWindows.flatMap((window) =>
        window.slots.map(async (slot): Promise<SlotAvailability> => {
          const booked = await getBooked(date, window.id, slot)
          return {
            date,
            timeWindow: window.id as TimeWindowId,
            startTime: slot,
            capacity: business.tour.maxCapacity,
            booked,
            available: Math.max(0, business.tour.maxCapacity - booked),
          }
        }),
      ),
    )

    return NextResponse.json(availability, {
      headers: { 'Cache-Control': 'no-store' },
    })
  } catch (err) {
    if (err instanceof KvUnconfiguredError) {
      return NextResponse.json(
        { error: 'Availability service not configured. Please call us to check slot availability.' },
        { status: 503 },
      )
    }
    console.error('[availability] KV error:', err)
    return NextResponse.json({ error: 'Failed to load availability.' }, { status: 500 })
  }
}
