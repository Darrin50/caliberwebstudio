import Link from 'next/link'
import { business } from '@/lib/constants'

export default function MobileBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 flex items-stretch border-t border-white/10 bg-navy/95 backdrop-blur-md md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <a
        href={business.phoneHref}
        className="flex flex-1 items-center justify-center gap-2 py-4 text-sm font-semibold text-white transition-colors active:bg-white/10"
        aria-label={`Call ${business.phone}`}
      >
        <svg className="h-5 w-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
        Call Us
      </a>

      <div className="w-px bg-white/10" />

      <Link
        href="/book"
        className="flex flex-1 items-center justify-center gap-2 bg-teal py-4 text-sm font-bold text-white transition-colors active:bg-teal-600"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        Book Now
      </Link>
    </div>
  )
}
