'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { business } from '@/lib/constants'

// TODO: Replace this SVG placeholder with:
//   <Image src="/logo.png" alt="Scoot for Fun" width={160} height={48} priority />
// once the owner drops the real logo.png into scootforfun/public/logo.png
function LogoSVG() {
  return (
    <svg
      viewBox="0 0 200 56"
      xmlns="http://www.w3.org/2000/svg"
      className="h-11 w-auto"
      aria-label="Scoot for Fun logo"
    >
      {/* Teal badge background */}
      <rect x="1" y="1" width="54" height="54" rx="12" fill="#1BA8A6" />
      {/* Scooter glyph — rear wheel */}
      <circle cx="17" cy="40" r="6" fill="none" stroke="#15323F" strokeWidth="2.2" />
      <circle cx="17" cy="40" r="2" fill="#15323F" />
      {/* Scooter glyph — front wheel */}
      <circle cx="39" cy="40" r="6" fill="none" stroke="#15323F" strokeWidth="2.2" />
      <circle cx="39" cy="40" r="2" fill="#15323F" />
      {/* Scooter body */}
      <path
        d="M20 40 L23 28 L32 28 L36 34 L39 34"
        stroke="#15323F"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Handlebar */}
      <line x1="32" y1="28" x2="36" y2="22" stroke="#15323F" strokeWidth="2" />
      <line x1="33" y1="22" x2="40" y2="22" stroke="#15323F" strokeWidth="2" />
      {/* Speed lines */}
      <line x1="5" y1="32" x2="14" y2="32" stroke="#15323F" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <line x1="3" y1="37" x2="12" y2="37" stroke="#15323F" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <line x1="5" y1="42" x2="14" y2="42" stroke="#15323F" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />

      {/* Wordmark text */}
      <text x="64" y="26" fontFamily="Georgia, serif" fontSize="15" fontWeight="700" fill="#15323F">
        Scoot
      </text>
      <text x="64" y="44" fontFamily="Arial Black, Impact, sans-serif" fontSize="14" fontWeight="900" fill="#1BA8A6" letterSpacing="2">
        FOR FUN
      </text>
    </svg>
  )
}

const navLinks = [
  { href: '/#tour', label: 'The Tour' },
  { href: '/#how-it-works', label: 'How It Works' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/#faq', label: 'FAQ' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-navy/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container-main flex h-16 items-center justify-between md:h-20">
        {/* Logo */}
        <Link href="/" aria-label="Scoot for Fun — Home" onClick={() => setMenuOpen(false)}>
          <LogoSVG />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-white/80 transition-colors hover:text-teal"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <a href={business.phoneHref} className="text-sm font-medium text-white/70 hover:text-white transition-colors">
            {business.phone}
          </a>
          <Link href="/book" className="btn-primary text-sm px-5 py-2.5">
            Book Your Tour
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-lg text-white md:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="bg-navy/98 backdrop-blur-md border-t border-white/10 md:hidden">
          <nav className="container-main flex flex-col gap-1 py-4" aria-label="Mobile">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-4 py-3 text-base font-medium text-white/80 hover:bg-white/5 hover:text-teal transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-3 px-4 pt-3 border-t border-white/10">
              <a href={business.phoneHref} className="btn-outline-white text-sm">
                Call {business.phone}
              </a>
              <Link href="/book" onClick={() => setMenuOpen(false)} className="btn-primary text-sm">
                Book Your Tour →
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
