'use client'

import { useFormContext } from 'react-hook-form'
import type { OnboardingFormData } from './schema'

const DAYS = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
] as const

const DAY_LABELS: Record<string, string> = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
}

const TIMES = [
  '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
  '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM',
]

const SOCIAL_PLATFORMS = [
  { key: 'facebook' as const, label: 'Facebook', placeholder: 'https://facebook.com/yourbusiness' },
  { key: 'instagram' as const, label: 'Instagram', placeholder: 'https://instagram.com/yourbusiness' },
  { key: 'twitter' as const, label: 'Twitter / X', placeholder: 'https://twitter.com/yourbusiness' },
  { key: 'linkedin' as const, label: 'LinkedIn', placeholder: 'https://linkedin.com/in/yourname' },
  { key: 'yelp' as const, label: 'Yelp', placeholder: 'https://yelp.com/biz/yourbusiness' },
  { key: 'google' as const, label: 'Google', placeholder: 'https://g.page/yourbusiness' },
]

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'var(--ob-input-bg)',
  border: '1px solid var(--ob-border-strong)',
  borderRadius: '12px',
  padding: '12px 16px',
  color: 'var(--ob-text)',
  fontSize: '16px',
  fontFamily: "'Inter', sans-serif",
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s, box-shadow 0.2s',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.7rem',
  fontWeight: 600,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--ob-label)',
  marginBottom: '8px',
  fontFamily: "'Space Mono', monospace",
}

const errorStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  color: '#f87171',
  marginTop: '4px',
}

function onFocus(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = '#1E3D8F'
  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(30,61,143,0.2)'
}
function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = 'var(--ob-border-strong)'
  e.currentTarget.style.boxShadow = 'none'
}

export default function ContactStep() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<OnboardingFormData>()

  const hours = watch('contact.hours')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
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
          Contact & Location
        </h2>
        <p style={{ color: 'var(--ob-label)', fontSize: '0.9rem', lineHeight: 1.6 }}>
          How customers can reach you and where you&apos;re located.
        </p>
      </div>

      {/* Contact info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Your Name *</label>
            <input
              {...register('contact.ownerName')}
              placeholder="Your full name"
              style={inputStyle}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            {errors.contact?.ownerName && (
              <p style={errorStyle}>{errors.contact.ownerName.message}</p>
            )}
          </div>
          <div>
            <label style={labelStyle}>Email *</label>
            <input
              {...register('contact.email')}
              type="email"
              placeholder="you@yourbusiness.com"
              style={inputStyle}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            {errors.contact?.email && (
              <p style={errorStyle}>{errors.contact.email.message}</p>
            )}
          </div>
        </div>

        <div>
          <label style={labelStyle}>Phone Number</label>
          <input
            {...register('contact.phone')}
            type="tel"
            placeholder="(313) 555-0100"
            style={inputStyle}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </div>

        <div>
          <label style={labelStyle}>Street Address</label>
          <input
            {...register('contact.address')}
            placeholder="123 Main St"
            style={inputStyle}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 100px', gap: '12px' }}>
          <div>
            <label style={labelStyle}>City</label>
            <input
              {...register('contact.city')}
              placeholder="Detroit"
              style={inputStyle}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>
          <div>
            <label style={labelStyle}>State</label>
            <input
              {...register('contact.state')}
              placeholder="MI"
              style={inputStyle}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>
          <div>
            <label style={labelStyle}>ZIP</label>
            <input
              {...register('contact.zip')}
              placeholder="48201"
              style={inputStyle}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>
        </div>
      </div>

      {/* Business Hours */}
      <div>
        <label style={labelStyle}>Business Hours</label>
        <p
          style={{
            fontSize: '0.75rem',
            color: 'var(--ob-label)',
            marginBottom: '12px',
            lineHeight: 1.5,
          }}
        >
          Check &quot;Closed&quot; for days you&apos;re not open
        </p>
        <div
          style={{
            background: 'var(--ob-card)',
            border: '1px solid var(--ob-border)',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          {DAYS.map((day, i) => {
            const isClosed = hours?.[day]?.closed
            return (
              <div
                key={day}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 16px',
                  borderBottom:
                    i < DAYS.length - 1
                      ? '1px solid var(--ob-border)'
                      : 'none',
                }}
              >
                <span
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--ob-text-secondary)',
                    width: '88px',
                    flexShrink: 0,
                  }}
                >
                  {DAY_LABELS[day]}
                </span>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    flex: 1,
                    opacity: isClosed ? 0.3 : 1,
                    transition: 'opacity 0.2s',
                  }}
                >
                  <select
                    {...register(`contact.hours.${day}.open`)}
                    disabled={!!isClosed}
                    style={{
                      background: 'var(--ob-input-bg)',
                      border: '1px solid var(--ob-border-strong)',
                      borderRadius: '8px',
                      padding: '6px 8px',
                      fontSize: '0.8rem',
                      color: 'var(--ob-text)',
                      flex: 1,
                      outline: 'none',
                      cursor: isClosed ? 'not-allowed' : 'pointer',
                      appearance: 'none' as const,
                    }}
                  >
                    {TIMES.map((t) => (
                      <option key={t} value={t} style={{ background: 'var(--ob-select-bg)' }}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <span style={{ fontSize: '0.75rem', color: 'var(--ob-text-faint)', flexShrink: 0 }}>
                    to
                  </span>
                  <select
                    {...register(`contact.hours.${day}.close`)}
                    disabled={!!isClosed}
                    style={{
                      background: 'var(--ob-input-bg)',
                      border: '1px solid var(--ob-border-strong)',
                      borderRadius: '8px',
                      padding: '6px 8px',
                      fontSize: '0.8rem',
                      color: 'var(--ob-text)',
                      flex: 1,
                      outline: 'none',
                      cursor: isClosed ? 'not-allowed' : 'pointer',
                      appearance: 'none' as const,
                    }}
                  >
                    {TIMES.map((t) => (
                      <option key={t} value={t} style={{ background: 'var(--ob-select-bg)' }}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    flexShrink: 0,
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="checkbox"
                    {...register(`contact.hours.${day}.closed`)}
                    style={{ accentColor: '#1E3D8F', width: '14px', height: '14px' }}
                  />
                  <span style={{ fontSize: '0.75rem', color: 'var(--ob-label)' }}>Closed</span>
                </label>
              </div>
            )
          })}
        </div>
      </div>

      {/* Social Media */}
      <div>
        <label style={labelStyle}>Social Media Links</label>
        <p
          style={{
            fontSize: '0.75rem',
            color: 'var(--ob-label)',
            marginBottom: '12px',
            lineHeight: 1.5,
          }}
        >
          Add any profiles you want linked on your site — all optional
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {SOCIAL_PLATFORMS.map(({ key, label, placeholder }) => (
            <div
              key={key}
              style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
            >
              <span
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--ob-label)',
                  width: '80px',
                  flexShrink: 0,
                }}
              >
                {label}
              </span>
              <input
                {...register(`contact.social.${key}`)}
                placeholder={placeholder}
                style={{
                  ...inputStyle,
                  padding: '10px 14px',
                  fontSize: '14px',
                  borderRadius: '10px',
                }}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
