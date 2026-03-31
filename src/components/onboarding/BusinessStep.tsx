'use client'

import { useFormContext } from 'react-hook-form'
import type { OnboardingFormData } from './schema'

const INDUSTRIES = [
  'Contractor / Trades',
  'Restaurant / Food Service',
  'Retail / E-commerce',
  'Healthcare / Medical',
  'Beauty / Salon / Spa',
  'Real Estate',
  'Legal / Law Firm',
  'Automotive',
  'Fitness / Gym',
  'Cleaning / Janitorial',
  'Landscaping / Lawn Care',
  'Photography / Videography',
  'Consulting / Coaching',
  'Technology / Software',
  'Financial Services',
  'Education / Tutoring',
  'Non-Profit',
  'Other',
]

const input: React.CSSProperties = {
  width: '100%',
  background: 'var(--ob-input-bg)',
  border: '1px solid var(--ob-border-strong)',
  borderRadius: '12px',
  padding: '12px 16px',
  color: 'var(--ob-input-text)',
  fontSize: '16px',
  fontFamily: "'Inter', sans-serif",
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s, box-shadow 0.2s',
}

const label: React.CSSProperties = {
  display: 'block',
  fontSize: '0.7rem',
  fontWeight: 600,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--ob-label)',
  marginBottom: '8px',
  fontFamily: "'Space Mono', monospace",
}

const error: React.CSSProperties = {
  fontSize: '0.75rem',
  color: '#f87171',
  marginTop: '4px',
}

const helper: React.CSSProperties = {
  fontSize: '0.75rem',
  color: 'var(--ob-label)',
  marginTop: '4px',
  lineHeight: 1.5,
}

function focusStyle(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderColor = '#1E3D8F'
  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(30,61,143,0.2)'
}
function blurStyle(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderColor = 'var(--ob-border-strong)'
  e.currentTarget.style.boxShadow = 'none'
}

export default function BusinessStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<OnboardingFormData>()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h2
          style={{
            fontSize: 'clamp(1.4rem, 3vw, 1.75rem)',
            fontWeight: 800,
            color: 'var(--ob-text)',
            marginBottom: '6px',
            letterSpacing: '-0.02em',
            fontFamily: "'Syne', sans-serif",
          }}
        >
          Tell us about your business.
        </h2>
        <p style={{ color: 'var(--ob-label)', fontSize: '0.9rem', lineHeight: 1.6 }}>
          This helps us understand who you are and what you do.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={label}>Business Name *</label>
          <input
            {...register('business.name')}
            placeholder="e.g. Detroit Home Builders"
            style={input}
            onFocus={focusStyle}
            onBlur={blurStyle}
          />
          {errors.business?.name && (
            <p style={error}>{errors.business.name.message}</p>
          )}
        </div>

        <div>
          <label style={label}>Tagline / Slogan</label>
          <input
            {...register('business.tagline')}
            placeholder="e.g. Built to Last. Built for You."
            style={input}
            onFocus={focusStyle}
            onBlur={blurStyle}
          />
          <p style={helper}>Optional — a short phrase that captures what you do</p>
        </div>

        <div>
          <label style={label}>Industry / Business Type *</label>
          <select
            {...register('business.industry')}
            style={{ ...input, cursor: 'pointer', appearance: 'none' as const }}
            onFocus={focusStyle}
            onBlur={blurStyle}
          >
            <option value="" disabled>
              Select your industry
            </option>
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind} style={{ background: 'var(--ob-select-bg)' }}>
                {ind}
              </option>
            ))}
          </select>
          {errors.business?.industry && (
            <p style={error}>{errors.business.industry.message}</p>
          )}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
          }}
        >
          <div>
            <label style={label}>Years in Business</label>
            <input
              {...register('business.yearsInBusiness')}
              placeholder="e.g. 5 years"
              style={input}
              onFocus={focusStyle}
              onBlur={blurStyle}
            />
          </div>
          <div>
            <label style={label}>Current Website</label>
            <input
              {...register('business.currentWebsite')}
              type="url"
              placeholder="https://yoursite.com"
              style={input}
              onFocus={focusStyle}
              onBlur={blurStyle}
            />
            <p style={helper}>Leave blank if you don&apos;t have one</p>
          </div>
        </div>
      </div>
    </div>
  )
}
