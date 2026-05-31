import { NextRequest, NextResponse } from 'next/server'
import { business } from '@/lib/constants'
import { getBooked } from '@/lib/bookingStore'
import type { SlotAvailability, TimeWindowId } from '@/lib/types'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const date = searchParams.get('date')

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json(
      { error: 'Invalid or missing date parameter (YYYY-MM-DD)' },
      { status: 400 }
    )
  }

  const availability: SlotAvailability[] = business.timeWindows.flatMap((window) =>
    window.slots.map((slot): SlotAvailability => {
      const booked = getBooked(date, window.id, slot)
      return {
        date,
        timeWindow: window.id as TimeWindowId,
        startTime: slot,
        capacity: business.tour.maxCapacity,
        booked,
        available: Math.max(0, business.tour.maxCapacity - booked),
      }
    })
  )

  return NextResponse.json(availability, {
    headers: { 'Cache-Control': 'no-store' },
  })
}
