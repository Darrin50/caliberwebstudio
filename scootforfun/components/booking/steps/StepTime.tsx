'use client'

import { useState, useEffect } from 'react'
import type { BookingState, TimeWindowId, SlotAvailability } from '@/lib/types'
import { business } from '@/lib/constants'
import { formatDateDisplay } from '@/lib/utils'

interface Props {
  state: BookingState
  update: (p: Partial<BookingState>) => void
  onNext: () => void
  onBack: () => void
}

export default function StepTime({ state, update, onNext, onBack }: Props) {
  const [availability, setAvailability] = useState<SlotAvailability[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedWindow, setExpandedWindow] = useState<TimeWindowId | null>('morning')

  useEffect(() => {
    if (!state.date) return
    setLoading(true)
    fetch(`/api/availability?date=${state.date}`)
      .then((r) => r.json())
      .then((data: SlotAvailability[]) => { setAvailability(data); setLoading(false) })
      .catch(() => {
        const fallback: SlotAvailability[] = business.timeWindows.flatMap((w) =>
          w.slots.map((slot) => ({
            date: state.date!,
            timeWindow: w.id as TimeWindowId,
            startTime: slot,
            capacity: business.tour.maxCapacity,
            booked: 0,
            available: business.tour.maxCapacity,
          }))
        )
        setAvailability(fallback)
        setLoading(false)
      })
  }, [state.date])

  function getSlotAvailability(windowId: TimeWindowId, slot: string) {
    return (
      availability.find((a) => a.timeWindow === windowId && a.startTime === slot) ?? {
        available: business.tour.maxCapacity,
        booked: 0,
        capacity: business.tour.maxCapacity,
      }
    )
  }

  return (
    <div className="p-6 md:p-8">
      <div className="mb-2">
        <h2 className="font-display text-2xl font-bold text-navy">Pick Your Time</h2>
        {state.date && (
          <p className="mt-1 text-sm text-teal font-medium">{formatDateDisplay(state.date)}</p>
        )}
      </div>
      <p className="mb-6 text-sm text-navy/60">Choose a window, then pick your 1-hour start time.</p>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 rounded-full border-2 border-teal border-t-transparent animate-spin" style={{ minWidth: 32, minHeight: 32 }} />
        </div>
      ) : (
        <div className="space-y-3">
          {business.timeWindows.map((window) => {
            const isExpanded = expandedWindow === window.id
            const windowSlots = window.slots.map((slot) => ({
              slot,
              avail: getSlotAvailability(window.id as TimeWindowId, slot),
            }))
            const hasAvailability = windowSlots.some((s) => s.avail.available > 0)

            return (
              <div
                key={window.id}
                className={`rounded-2xl border transition-all ${
                  isExpanded ? 'border-teal/30 bg-teal/5' : 'border-navy/10 bg-white'
                }`}
              >
                <button
                  onClick={() => setExpandedWindow(isExpanded ? null : window.id as TimeWindowId)}
                  className="flex w-full items-center justify-between px-5 py-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-navy">{window.label}</span>
                    <span className="text-sm text-navy/50">{window.range}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {!hasAvailability && (
                      <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600">Full</span>
                    )}
                    <svg
                      className={`h-5 w-5 text-navy/40 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      width={20} height={20}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {isExpanded && (
                  <div className="grid grid-cols-2 gap-2 px-5 pb-5 sm:grid-cols-4">
                    {windowSlots.map(({ slot, avail }) => {
                      const isFull = avail.available === 0
                      const isSelected = state.timeWindow === window.id && state.startTime === slot
                      return (
                        <button
                          key={slot}
                          disabled={isFull}
                          onClick={() => update({ timeWindow: window.id as TimeWindowId, startTime: slot })}
                          aria-pressed={isSelected}
                          style={{ minHeight: 60 }}
                          className={`
                            flex flex-col items-center rounded-xl border-2 p-3 text-center transition-all
                            ${isSelected
                              ? 'border-teal bg-teal text-white shadow-md shadow-teal/30'
                              : isFull
                              ? 'cursor-not-allowed border-navy/10 bg-navy/5 opacity-50'
                              : 'border-navy/15 hover:border-teal/50 hover:bg-teal/5 text-navy cursor-pointer'
                            }
                          `}
                        >
                          <span className="font-semibold text-sm">{slot}</span>
                          <span className={`mt-1 text-xs ${isSelected ? 'text-white/80' : isFull ? 'text-red-500' : 'text-navy/50'}`}>
                            {isFull ? 'Full' : `${avail.available} spot${avail.available === 1 ? '' : 's'} left`}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {state.startTime && (
        <div className="mt-4 rounded-xl bg-teal/10 border border-teal/20 px-4 py-3 text-sm font-medium text-teal">
          ✓ Selected: {state.startTime} ({business.timeWindows.find((w) => w.id === state.timeWindow)?.label} window)
        </div>
      )}

      <div className="mt-8 flex items-center justify-between gap-3">
        <button onClick={onBack} className="btn-secondary">← Back</button>
        <button
          onClick={onNext}
          disabled={!state.startTime}
          className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Add Riders →
        </button>
      </div>
    </div>
  )
}
