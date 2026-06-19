import Image from 'next/image'

export default function PromoStrip() {
  return (
    <section id="gallery" className="section-light" aria-labelledby="gallery-heading">
      <div className="container-main">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal">See It in Action</p>
          <h2 id="gallery-heading" className="heading-lg mt-3 text-navy">
            Scoot for Fun on the Detroit Riverwalk
          </h2>
          <p className="mt-4 text-base text-navy/70">
            A one-of-a-kind experience right in the heart of Detroit.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 max-w-4xl mx-auto">
          {/* Landscape promo banner */}
          <div className="relative aspect-square overflow-hidden rounded-2xl ring-1 ring-navy/10 shadow-sm">
            <Image
              src="/images/promo-1.jpg"
              alt="Scoot for Fun guided scooter tour along the Detroit Riverwalk"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 45vw, 430px"
            />
          </div>
          {/* Portrait promo banner — object-top keeps the main graphic in frame */}
          <div className="relative aspect-square overflow-hidden rounded-2xl ring-1 ring-navy/10 shadow-sm">
            <Image
              src="/images/promo-2.jpg"
              alt="Scoot for Fun — #1 Scooter Tour on the Detroit Riverwalk"
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 45vw, 430px"
            />
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-navy/50">
          Guided tours Thu – Sun &nbsp;·&nbsp; Detroit Riverwalk &nbsp;·&nbsp; $50 per person
        </p>
      </div>
    </section>
  )
}
