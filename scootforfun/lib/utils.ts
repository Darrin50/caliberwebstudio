import { business } from './constants'

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`
}

export function calcTourPrice(partySize: number): {
  subtotal: number
  discount: number
  total: number
  discountApplied: boolean
} {
  const subtotal = partySize * business.tour.pricePerPerson
  const discountApplied = partySize > 1
  const discount = discountApplied
    ? Math.round(subtotal * (business.tour.groupDiscount / 100))
    : 0
  return {
    subtotal,
    discount,
    total: subtotal - discount,
    discountApplied,
  }
}

export function isBookableDay(date: Date): boolean {
  const day = date.getDay() // 0=Sun, 1=Mon, ..., 4=Thu, 5=Fri, 6=Sat
  return day === 4 || day === 5 || day === 6 || day === 0
}

export function formatDateDisplay(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number)
  const d = new Date(year, month - 1, day)
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function generateConfirmationId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let id = 'SFF-'
  for (let i = 0; i < 8; i++) {
    id += chars[Math.floor(Math.random() * chars.length)]
  }
  return id
}

export function getISODateString(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}
