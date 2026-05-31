import Link from 'next/link'
import { business } from '@/lib/constants'

export default function Hero() {
  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-navy px-4 pt-20 pb-28"
      aria-label="Hero"
    >
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Large teal circle — top right */}
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-teal/10 blur-3xl" />
        {/* Purple circle — bottom left */}
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-purple-brand/10 blur-3xl" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* TODO: Replace gradient placeholder with a real Detroit riverfront/scooter photo
          Place photo at scootforfun/public/images/hero-bg.jpg and use next/image with fill + priority */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse at 70% 30%, #1BA8A6 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, #4B2E83 0%, transparent 50%)',
        }}
      />

      <div className="container-main relative z-10 text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-4 py-1.5 text-sm font-medium text-teal">
          <span className="h-2 w-2 rounded-full bg-teal animate-pulse" />
          Detroit&apos;s Premier Scooter Tour — Thu–Sun
        </div>

        {/* H1 */}
        <h1 className="heading-xl mx-auto max-w-4xl text-white">
          Ride.{' '}
          <span className="text-teal">Explore.</span>{' '}
          Enjoy Detroit.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70 leading-relaxed md:text-xl">
          Guided 1-hour mobility scooter tours along the Riverwalk, Dequindre Cut &amp; Ambassador Bridge.
          $50 per person. Reservations required.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link href="/book" className="btn-primary px-8 py-4 text-base shadow-lg shadow-teal/25">
            Book Your Tour
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <a href={business.phoneHref} className="btn-outline-white px-8 py-4 text-base">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {business.phone}
          </a>
        </div>

        {/* Trust stats */}
        <div className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto border-t border-white/10 pt-10">
          {[
            { value: '$50', label: 'Per person' },
            { value: '1 hr', label: 'Guided tour' },
            { value: '4 max', label: 'Per slot' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-2xl font-bold text-teal md:text-3xl">{stat.value}</div>
              <div className="mt-1 text-xs text-white/50 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-bounce" aria-hidden="true">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
