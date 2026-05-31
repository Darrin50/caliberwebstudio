'use client'

import { useState } from 'react'
import { business } from '@/lib/constants'

function FAQItem({ question, answer, isOpen, onToggle }: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="rounded-2xl bg-white overflow-hidden shadow-sm ring-1 ring-navy/8 transition-shadow hover:shadow-md">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-navy text-base">{question}</span>
        <span
          className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all ${
            isOpen ? 'border-teal bg-teal text-white rotate-45' : 'border-navy/20 text-navy/40'
          }`}
          style={{ minWidth: 32, minHeight: 32 }}
          aria-hidden="true"
        >
          <svg className="h-4 w-4" width={16} height={16} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className="px-6 pb-5">
          <div className="h-px bg-navy/8 mb-4" />
          <p className="text-sm text-navy/70 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="section-light" aria-labelledby="faq-heading">
      <div className="container-main">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal">FAQ</p>
          <h2 id="faq-heading" className="heading-lg mt-3 text-navy">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-navy/60">
            Still have questions? Email us at{' '}
            <a href="mailto:bookings@scootforfun.com" className="text-teal hover:underline">
              bookings@scootforfun.com
            </a>
          </p>
        </div>

        <div className="mt-12 mx-auto max-w-2xl space-y-3">
          {business.faq.map((item, i) => (
            <FAQItem
              key={i}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
