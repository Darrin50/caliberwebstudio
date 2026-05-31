'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { business } from '@/lib/constants'

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
          <Image
            src="/logo.png"
            alt="Scoot for Fun"
            width={96}
            height={96}
            priority
            className="h-10 w-10 md:h-12 md:w-12"
          />
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
            <svg className="h-6 w-6" width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
