'use client'

import { useState } from 'react'
import type { BookingState } from '@/lib/types'
import { isBookableDay, getISODateString } from '@/lib/utils'

interface Props {
  state: BookingState
  update: (p: Partial<BookingState>) => void
  onNext: () => void
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]

export default function StepDate({ state, update, onNext }: Props) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  const firstDay = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()

  function prevMonth() {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1)
      setViewMonth(11)
    } else {
      setViewMonth((m) => m - 1)
    }
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1)
      setViewMonth(0)
    } else {
      setViewMonth((m) => m + 1)
    }
  }

  function selectDate(day: number) {
    const d = new Date(viewYear, viewMonth, day)
    if (d < today) return
    if (!isBookableDay(d)) return
    const iso = getISODateString(d)
    update({ date: iso, timeWindow: null, startTime: null })
  }

  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  return (
    <div className="p-6 md:p-8">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-navy">Pick Your Date</h2>
        <p className="mt-1 text-sm text-navy/60">Tours run Thursday – Sunday only.</p>
      </div>

      {/* Calendar header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-cream transition-colors"
          aria-label="Previous month"
        >
          <svg className="h-5 w-5 text-navy/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="font-display font-bold text-navy">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button
          onClick={nextMonth}
          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-cream transition-colors"
          aria-label="Next month"
        >
          <svg className="h-5 w-5 text-navy/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {WEEKDAYS.map((d) => (
          <div key={d} className="text-center text-xs font-semibold uppercase tracking-wide text-navy/40 py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, idx) => {
          if (day === null) return <div key={`empty-${idx}`} />
          const d = new Date(viewYear, viewMonth, day)
          const isPast = d < today
          const isBookable = isBookableDay(d)
          const iso = getISODateString(d)
          const isSelected = state.date === iso
          const isToday = getISODateString(d) === getISODateString(today)

          return (
            <button
              key={day}
              onClick={() => selectDate(day)}
              disabled={isPast || !isBookable}
              aria-label={`${MONTHS[viewMonth]} ${day}, ${viewYear}${isBookable && !isPast ? ' — available' : ' — unavailable'}`}
              aria-pressed={isSelected}
              className={`
                relative flex h-10 w-full items-center justify-center rounded-xl text-sm font-medium transition-all
                ${isSelected
                  ? 'bg-teal text-white font-bold shadow-md shadow-teal/30'
                  : isPast || !isBookable
                  ? 'cursor-not-allowed text-navy/25'
                  : 'hover:bg-teal/10 hover:text-teal text-navy cursor-pointer'
                }
                ${isToday && !isSelected ? 'ring-2 ring-teal/40' : ''}
              `}
            >
              {day}
              {isBookable && !isPast && !isSelected && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-teal/40" aria-hidden="true" />
              )}
            </button>
          )
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center gap-4 text-xs text-navy/50">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-teal/40" />
          Available (Thu–Sun)
        </span>
        <span className="text-navy/25">Grayed = unavailable</span>
      </div>

      {state.date && (
        <div className="mt-4 rounded-xl bg-teal/10 border border-teal/20 px-4 py-3 text-sm font-medium text-teal">
          ✓ Selected: {new Date(state.date + 'T00:00:00').toLocaleDateString('en-US', {
            weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
          })}
        </div>
      )}

      <div className="mt-8 flex justify-end">
        <button
          onClick={onNext}
          disabled={!state.date}
          className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Choose Time →
        </button>
      </div>
    </div>
  )
}
