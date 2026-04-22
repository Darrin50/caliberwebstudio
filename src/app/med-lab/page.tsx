import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Med Spa Websites | Caliber Web Studio',
  description:
    'Caliber Web Studio is a niche agency that builds high-converting websites exclusively for med spas. Custom design, Google-ranked, mobile-first, built to book high-ticket clients.',
  alternates: {
    canonical: 'https://www.caliberwebstudio.com/med-lab',
  },
  openGraph: {
    title: 'Med Spa Websites | Caliber Web Studio',
    description:
      'We build websites exclusively for med spas — conversion-focused, Google-ranked, and designed to book high-ticket clients.',
    url: 'https://www.caliberwebstudio.com/med-lab',
    siteName: 'Caliber Web Studio',
    type: 'website',
    locale: 'en_US',
  },
};

export default function MedLabPage() {
  return (
    <main className="min-h-screen bg-[#0d0d0d] text-white flex flex-col">
      {/* Nav */}
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between max-w-7xl mx-auto w-full">
        <Link href="/" className="text-white font-bold text-lg tracking-tight">
          Caliber Web Studio
        </Link>
        <Link
          href="/pricing"
          className="text-sm bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-white/90 transition-colors"
        >
          See Pricing
        </Link>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24 max-w-4xl mx-auto">
        <div className="inline-block text-xs font-semibold uppercase tracking-widest text-rose-400 border border-rose-400/30 bg-rose-400/10 px-4 py-1.5 rounded-full mb-8">
          Med Spa Niche Agency
        </div>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Websites Built{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-500">
            Exclusively
          </span>{' '}
          for Med Spas
        </h1>
        <p className="text-lg md:text-xl text-white/60 max-w-2xl mb-10 leading-relaxed">
          We don&apos;t build websites for everyone. We specialize in med spas — designing
          high-converting, Google-ranked sites that attract and book high-ticket aesthetic clients.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-base hover:opacity-90 transition-opacity"
          >
            Get Your Free Mockup
          </Link>
          <Link
            href="/pricing"
            className="border border-white/20 text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-white/5 transition-colors"
          >
            View Pricing
          </Link>
        </div>
      </section>

      {/* Why CWS */}
      <section className="border-t border-white/10 px-6 py-20 max-w-7xl mx-auto w-full">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          Why Med Spas Choose Caliber
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Niche Expertise',
              body: 'We only work with med spas. That means deep knowledge of the client journey, compliance considerations, and what actually converts in aesthetics.',
            },
            {
              title: 'Built to Book',
              body: 'Every page, CTA, and layout decision is optimized to turn visitors into booked consultations — not just pretty design.',
            },
            {
              title: 'Free Mockup in 48 Hours',
              body: 'See exactly what your new site will look like before you commit. No cost, no obligation, no generic templates.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-rose-400/30 transition-colors"
            >
              <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="border-t border-white/10 px-6 py-16 text-center">
        <p className="text-white/50 text-sm mb-2">Ready to see your site?</p>
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Get a free custom mockup for your med spa.
        </h2>
        <Link
          href="/contact"
          className="inline-block bg-gradient-to-r from-rose-500 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-base hover:opacity-90 transition-opacity"
        >
          Request Your Free Mockup
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-6 text-center text-white/30 text-xs max-w-7xl mx-auto w-full">
        © {new Date().getFullYear()} Caliber Web Studio · High Caliber Operations LLC ·{' '}
        <Link href="/" className="hover:text-white/60 transition-colors">
          caliberwebstudio.com
        </Link>
      </footer>
    </main>
  );
}
