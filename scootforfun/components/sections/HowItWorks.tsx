import Link from 'next/link'
import { business } from '@/lib/constants'

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-dark" aria-labelledby="how-heading">
      <div className="container-main">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal">How It Works</p>
          <h2 id="how-heading" className="heading-lg mt-3 text-white">
            Four Easy Steps to Your Tour
          </h2>
          <p className="mt-4 text-base text-white/60 md:text-lg">
            From booking to riding — it&apos;s simple.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {business.howItWorks.map((item, i) => (
            <div key={item.step} className="relative flex flex-col">
              {/* Connector line on desktop */}
              {i < business.howItWorks.length - 1 && (
                <div
                  className="absolute top-8 left-full hidden h-px w-full -translate-y-1/2 bg-gradient-to-r from-teal/40 to-transparent lg:block"
                  style={{ zIndex: 0 }}
                  aria-hidden="true"
                />
              )}

              <div className="relative flex flex-col gap-4">
                {/* Step number */}
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-teal/30 bg-teal/10 font-display text-2xl font-black text-teal">
                  {item.step}
                </div>

                <div>
                  <h3 className="font-display text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-white/60 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link href="/book" className="btn-primary px-8">
            Start Your Booking
          </Link>
          <p className="text-sm text-white/40">Takes about 3 minutes · Instant confirmation</p>
        </div>
      </div>
    </section>
  )
}
