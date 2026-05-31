import { business } from '@/lib/constants'

export default function Requirements() {
  return (
    <section id="requirements" className="section-light" aria-labelledby="req-heading">
      <div className="container-main">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal">Good to Know</p>
          <h2 id="req-heading" className="heading-lg mt-3 text-navy">
            Before You Book
          </h2>
          <p className="mt-4 text-base text-navy/70">
            Safety first — a few important things every rider should know.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Age requirement */}
          <div className="flex gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy/8">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-teal/10" style={{ minWidth: 48, minHeight: 48 }}>
              <svg className="h-6 w-6 text-teal" width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-navy">Age {business.requirements.minAge}+ to Operate</p>
              <p className="mt-1 text-sm text-navy/60 leading-relaxed">
                Riders must be at least 12 years old to operate a scooter independently.
              </p>
            </div>
          </div>

          {/* Weight limit */}
          <div className="flex gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy/8">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-teal/10" style={{ minWidth: 48, minHeight: 48 }}>
              <svg className="h-6 w-6 text-teal" width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-navy">{business.requirements.maxWeight} lb Weight Limit</p>
              <p className="mt-1 text-sm text-navy/60 leading-relaxed">
                For rider safety, the scooter weight capacity is {business.requirements.maxWeight} lbs maximum.
              </p>
            </div>
          </div>

          {/* Waiver required */}
          <div className="flex gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy/8">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-purple-50" style={{ minWidth: 48, minHeight: 48 }}>
              <svg className="h-6 w-6 text-purple-brand" width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-navy">Safety Waiver Required</p>
              <p className="mt-1 text-sm text-navy/60 leading-relaxed">
                All riders must sign a safety waiver — completed online during booking and confirmed in person.
              </p>
            </div>
          </div>

          {/* Reservations only */}
          <div className="flex gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy/8">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-teal/10" style={{ minWidth: 48, minHeight: 48 }}>
              <svg className="h-6 w-6 text-teal" width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-navy">Reservations Only</p>
              <p className="mt-1 text-sm text-navy/60 leading-relaxed">
                Advance booking is required. We do not accept walk-up riders — book online to guarantee your spot.
              </p>
            </div>
          </div>

          {/* Schedule */}
          <div className="flex gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy/8">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-teal/10" style={{ minWidth: 48, minHeight: 48 }}>
              <svg className="h-6 w-6 text-teal" width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-navy">{business.tour.schedule} Only</p>
              <p className="mt-1 text-sm text-navy/60 leading-relaxed">
                Tours run Thursday through Sunday with morning, afternoon, and evening windows available.
              </p>
            </div>
          </div>

          {/* Small groups */}
          <div className="flex gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy/8">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-teal/10" style={{ minWidth: 48, minHeight: 48 }}>
              <svg className="h-6 w-6 text-teal" width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-navy">Max {business.tour.maxCapacity} Guests Per Slot</p>
              <p className="mt-1 text-sm text-navy/60 leading-relaxed">
                Small groups only — up to {business.tour.maxCapacity} guests per time slot for the best experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
