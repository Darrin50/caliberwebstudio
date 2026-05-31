import Link from 'next/link'
import { business } from '@/lib/constants'

export default function Pricing() {
  return (
    <section id="pricing" className="section-white" aria-labelledby="pricing-heading">
      <div className="container-main">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal">Pricing</p>
          <h2 id="pricing-heading" className="heading-lg mt-3 text-navy">
            Simple, Transparent Pricing
          </h2>
        </div>

        {/* Main pricing card — purple panel styled after flyer */}
        <div className="mt-12 mx-auto max-w-3xl overflow-hidden rounded-3xl shadow-2xl">
          {/* Purple header */}
          <div className="bg-purple-brand px-8 py-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-purple-50/70 mb-2">1-Hour Guided Tour</p>
            <div className="flex items-start justify-center gap-1">
              <span className="mt-4 text-3xl font-bold text-white/70">$</span>
              <span className="font-display text-8xl font-black leading-none text-teal">50</span>
            </div>
            <p className="mt-3 text-lg text-white/70">per person</p>
          </div>

          {/* White details section */}
          <div className="bg-white px-8 py-8">
            <ul className="space-y-4">
              {[
                { icon: '✓', text: 'Full guided 1-hour tour of the Riverwalk, Dequindre Cut & Ambassador Park' },
                { icon: '✓', text: 'Free rider swag — hat, water bottle, tote bag & keychain' },
                { icon: '✓', text: 'Small groups, max 4 guests per slot' },
                { icon: '✓', text: 'Expert local guide the entire ride' },
                { icon: '✓', text: 'Thu–Sun, multiple time windows available' },
              ].map((item) => (
                <li key={item.text} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-teal/10 text-xs font-bold text-teal">
                    {item.icon}
                  </span>
                  <span className="text-sm text-navy/80">{item.text}</span>
                </li>
              ))}
            </ul>

            {/* Group discount callout */}
            <div className="mt-6 rounded-2xl bg-cream px-6 py-4 border border-teal/20">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-teal text-white font-bold text-sm">
                  10%
                </div>
                <div>
                  <p className="font-semibold text-navy text-sm">Group Discount</p>
                  <p className="text-xs text-navy/60 mt-0.5">
                    Book 2 or more tours for the same time slot and everyone saves 10% automatically.
                  </p>
                </div>
              </div>
            </div>

            {/* Swag callout */}
            <div className="mt-4 rounded-2xl bg-purple-50 px-6 py-4 border border-purple-brand/10">
              <p className="font-semibold text-purple-brand text-sm mb-1">🎁 Ride, Smile &amp; Win!</p>
              <p className="text-xs text-navy/60">
                Every rider gets a free welcome kit: {business.tour.swag.join(' · ')}.
              </p>
            </div>

            <div className="mt-8 text-center">
              <Link href="/book" className="btn-primary w-full max-w-xs text-base py-4">
                Reserve Your Spot
              </Link>
              <p className="mt-3 text-xs text-navy/40">
                Advance booking required · Secure payment via Square
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
