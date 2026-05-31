import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center bg-navy px-4 text-center pt-20">
        <div className="text-8xl mb-6" aria-hidden="true">🛵</div>
        <h1 className="font-display text-5xl font-black text-white">Whoops!</h1>
        <p className="mt-3 text-xl text-teal font-semibold">Looks like this scooter took a wrong turn.</p>
        <p className="mt-2 text-white/50 max-w-sm">
          The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on the right path.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link href="/" className="btn-primary px-8">
            Back to Home
          </Link>
          <Link href="/book" className="btn-outline-white px-8">
            Book a Tour
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
