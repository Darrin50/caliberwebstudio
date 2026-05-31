import Link from 'next/link'
import { business } from '@/lib/constants'

const routeVisuals: Record<string, { gradient: string; imageBg: string }> = {
  riverwalk: {
    gradient: 'from-teal/20 to-teal/5',
    imageBg: 'bg-teal/10',
  },
  dequindre: {
    gradient: 'from-purple-brand/20 to-purple-brand/5',
    imageBg: 'bg-purple-brand/10',
  },
  ambassador: {
    gradient: 'from-teal/20 to-navy/20',
    imageBg: 'bg-teal/10',
  },
}

export default function TourSection() {
  return (
    <section id="tour" className="section-light" aria-labelledby="tour-heading">
      <div className="container-main">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal">The Tour</p>
          <h2 id="tour-heading" className="heading-lg mt-3 text-navy">
            Three Detroit Landmarks. One Unforgettable Ride.
          </h2>
          <p className="mt-4 text-base text-navy/70 md:text-lg leading-relaxed">
            Your guide leads the way through the heart of Detroit&apos;s most scenic spots — all in about an hour.
          </p>
        </div>

        {/* Route cards */}
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {business.routes.map((route) => {
            const visual = routeVisuals[route.id]
            return (
              <div
                key={route.id}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-navy/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* TODO: Replace placeholder with real photo of each landmark.
                    Place images at scootforfun/public/images/{route.id}.jpg
                    Use <Image src={`/images/${route.id}.jpg`} fill alt="..." className="object-cover" /> */}
                <div
                  className={`relative h-52 w-full bg-gradient-to-br ${visual.gradient} flex items-center justify-center`}
                  aria-hidden="true"
                >
                  <div className={`flex h-20 w-20 items-center justify-center rounded-2xl ${visual.imageBg} backdrop-blur-sm`}>
                    <span className="text-4xl" role="img" aria-label={route.name}>{route.icon}</span>
                  </div>
                  {/* Decorative corners */}
                  <div className="absolute top-4 right-4 h-8 w-8 rounded-full border-2 border-teal/20" />
                  <div className="absolute bottom-4 left-4 h-5 w-5 rounded-full bg-teal/10" />
                </div>

                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-navy">{route.name}</h3>
                  <p className="mt-2 text-sm text-navy/65 leading-relaxed">{route.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="mb-5 text-sm text-navy/60">
            All three stops in every tour · Guided the whole way · Thu–Sun
          </p>
          <Link href="/book" className="btn-primary">
            Book the Full Tour — $50/person
          </Link>
        </div>
      </div>
    </section>
  )
}
