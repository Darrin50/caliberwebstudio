export type BookingStep = 1 | 2 | 3 | 4 | 5 | 6

export type TimeWindowId = 'morning' | 'afternoon' | 'evening'

export interface RiderInfo {
  name: string
  ageAcknowledged: boolean
  weightAcknowledged: boolean
}

export interface BookingState {
  step: BookingStep
  date: string | null         // ISO date string YYYY-MM-DD
  timeWindow: TimeWindowId | null
  startTime: string | null    // e.g. "10:00 AM"
  partySize: number
  riders: RiderInfo[]
  waiverSigned: boolean
  waiverSignature: string
  paymentStatus: 'idle' | 'processing' | 'success' | 'error'
  paymentError: string | null
  confirmationId: string | null
  customerEmail: string
  customerName: string
  customerPhone: string
}

export interface SlotAvailability {
  date: string
  timeWindow: TimeWindowId
  startTime: string
  capacity: number
  booked: number
  available: number
}

export interface BookingPayload {
  date: string
  timeWindow: TimeWindowId
  startTime: string
  partySize: number
  riders: RiderInfo[]
  customerName: string
  customerEmail: string
  customerPhone: string
  totalAmount: number
  sourceToken: string
}

export interface BookingConfirmation {
  confirmationId: string
  date: string
  startTime: string
  partySize: number
  totalAmount: number
  customerEmail: string
}
