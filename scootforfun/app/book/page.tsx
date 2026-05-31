import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MobileBar from '@/components/layout/MobileBar'
import BookingWidget from '@/components/booking/BookingWidget'
import { business } from '@/lib/constants'

export const metadata: Metadata = {
  title: `Book Your Tour | ${business.name}`,
  description: `Reserve your guided Detroit scooter tour. ${business.tour.priceDisplay}/person · ${business.tour.schedule} · Up to ${business.tour.maxCapacity} guests per slot.`,
  alternates: {
    canonical: '/book',
  },
}

export default function BookPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-navy pt-20 pb-28">
        {/* Page header */}
        <div className="container-main py-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal mb-2">
            Reserve Your Spot
          </p>
          <h1 className="font-display text-4xl font-black text-white md:text-5xl">
            Book Your Tour
          </h1>
          <p className="mt-3 text-white/60 max-w-md mx-auto">
            {business.tour.priceDisplay}/person · {business.tour.schedule} · Max {business.tour.maxCapacity} riders per slot
          </p>
        </div>

        {/* Booking widget */}
        <div className="container-main pb-10 px-4 md:px-6">
          <BookingWidget />
        </div>

        {/* Reassurance strip */}
        <div className="container-main">
          <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/5 px-6 py-5">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 text-center">
              {[
                { icon: '🔒', label: 'Secure payment' },
                { icon: '📧', label: 'Instant confirmation' },
                { icon: '🎁', label: 'Free swag included' },
                { icon: '📞', label: 'Questions? Call us' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-1">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-xs text-white/50">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <MobileBar />
    </>
  )
}
