import { business } from '@/lib/constants'

export default function ContactSection() {
  return (
    <section id="contact" className="section-dark" aria-labelledby="contact-heading">
      <div className="container-main">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal">Contact</p>
          <h2 id="contact-heading" className="heading-lg mt-3 text-white">
            Get in Touch
          </h2>
          <p className="mt-4 text-white/60">
            Questions? Reach out before you book — we&apos;re happy to help.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
          {/* Phone */}
          <a
            href={business.phoneHref}
            className="group flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-8 text-center transition-all hover:bg-white/10 hover:border-teal/40"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal/20 group-hover:bg-teal/30 transition-colors" style={{ minWidth: 56, minHeight: 56 }}>
              <svg className="h-7 w-7 text-teal" width={28} height={28} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-teal mb-1">Call or Text</p>
              <p className="font-semibold text-white text-lg">{business.phone}</p>
            </div>
          </a>

          {/* Email */}
          <a
            href={`mailto:${business.email}`}
            className="group flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-8 text-center transition-all hover:bg-white/10 hover:border-teal/40"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal/20 group-hover:bg-teal/30 transition-colors" style={{ minWidth: 56, minHeight: 56 }}>
              <svg className="h-7 w-7 text-teal" width={28} height={28} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-teal mb-1">Email Us</p>
              <p className="font-semibold text-white text-sm break-all">{business.email}</p>
            </div>
          </a>

          {/* Hours */}
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-8 text-center sm:col-span-2 lg:col-span-1">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal/20" style={{ minWidth: 56, minHeight: 56 }}>
              <svg className="h-7 w-7 text-teal" width={28} height={28} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-teal mb-1">Tour Hours</p>
              <p className="font-semibold text-white">{business.tour.schedule}</p>
              <ul className="mt-2 space-y-1">
                {business.timeWindows.map((w) => (
                  <li key={w.id} className="text-xs text-white/50">
                    {w.label}: {w.range}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Tagline closer */}
        <div className="mt-16 text-center">
          <p className="text-xl text-white/60 italic">
            &ldquo;Fun. Community. Freedom. That&apos;s the Scoot for Fun tour!&rdquo;
          </p>
        </div>
      </div>
    </section>
  )
}
