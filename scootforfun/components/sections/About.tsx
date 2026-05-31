import Link from 'next/link'

export default function About() {
  return (
    <section id="about" className="section-dark" aria-labelledby="about-heading">
      <div className="container-main">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal">Our Story</p>
          <h2 id="about-heading" className="heading-lg mt-3 text-white">
            Built for Detroit. Built for You.
          </h2>
        </div>

        <div className="mt-12 mx-auto max-w-3xl">
          {/* TODO: Replace this placeholder section with a real photo of the owner/team or tour in action.
              Place image at scootforfun/public/images/about-team.jpg */}
          <div
            className="relative mx-auto mb-10 h-56 max-w-lg overflow-hidden rounded-2xl bg-gradient-to-br from-teal/20 to-purple-brand/10 flex items-center justify-center"
            aria-hidden="true"
          >
            <div className="text-center">
              <span className="text-5xl">🛵</span>
              <p className="mt-2 text-sm text-white/40">Photo coming soon</p>
            </div>
          </div>

          <div className="space-y-5 text-center text-white/75 text-base md:text-lg leading-relaxed">
            <p>
              Scoot for Fun is a locally owned Detroit tour company founded on a simple idea:{' '}
              <span className="text-white font-medium">everyone should get to experience this city the way we love it.</span>{' '}
              Whether you live here or you&apos;re visiting for the weekend, the Detroit Riverwalk, the Dequindre Cut, and Ambassador Park are special places — and a mobility scooter is the perfect way to take them all in.
            </p>
            <p>
              Our tours are small, personal, and led by a guide who genuinely loves Detroit. We keep groups to a maximum of four so every ride feels like an adventure with friends, not a crowded bus tour.
            </p>
            <p className="text-teal font-medium text-lg">
              Fun. Community. Freedom. That&apos;s the Scoot for Fun tour.
            </p>
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/book" className="btn-primary px-8">
              Join the Ride
            </Link>
            <a href="mailto:bookings@scootforfun.com" className="btn-outline-white px-8">
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
