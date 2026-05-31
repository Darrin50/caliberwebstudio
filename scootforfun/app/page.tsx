import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MobileBar from '@/components/layout/MobileBar'
import Hero from '@/components/sections/Hero'
import TourSection from '@/components/sections/TourSection'
import HowItWorks from '@/components/sections/HowItWorks'
import Pricing from '@/components/sections/Pricing'
import Requirements from '@/components/sections/Requirements'
import About from '@/components/sections/About'
import FAQ from '@/components/sections/FAQ'
import ContactSection from '@/components/sections/ContactSection'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TourSection />
        <HowItWorks />
        <Pricing />
        <Requirements />
        <About />
        <FAQ />
        <ContactSection />
      </main>
      <Footer />
      <MobileBar />
    </>
  )
}
