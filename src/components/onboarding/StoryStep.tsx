'use client'

import { useFormContext } from 'react-hook-form'
import type { OnboardingFormData } from './schema'

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.7rem',
  fontWeight: 600,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: '#6B6B6B',
  marginBottom: '8px',
  fontFamily: "'Space Mono', monospace",
}

const textareaBase: React.CSSProperties = {
  width: '100%',
  background: '#1A1A1A',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '12px',
  padding: '14px 16px',
  color: '#fff',
  fontSize: '16px',
  fontFamily: "'Inter', sans-serif",
  lineHeight: 1.7,
  outline: 'none',
  boxSizing: 'border-box',
  resize: 'none',
  overflow: 'hidden',
  minHeight: '120px',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  display: 'block',
}

const errorStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  color: '#f87171',
  marginTop: '4px',
}

const helperStyle: React.CSSProperties = {
  fontSize: '0.78rem',
  color: '#6B6B6B',
  marginTop: '6px',
  lineHeight: 1.5,
}

const charCountStyle = (atLimit: boolean): React.CSSProperties => ({
  fontSize: '0.72rem',
  color: atLimit ? '#f87171' : '#6B6B6B',
  marginTop: '4px',
  textAlign: 'right',
  fontFamily: "'Space Mono', monospace",
  transition: 'color 0.2s',
})

function autoResize(e: React.FormEvent<HTMLTextAreaElement>) {
  const el = e.currentTarget
  el.style.height = 'auto'
  el.style.height = `${el.scrollHeight}px`
}

function onFocusStyle(e: React.FocusEvent<HTMLTextAreaElement>) {
  e.currentTarget.style.borderColor = '#1E3D8F'
  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(30,61,143,0.2)'
}

function onBlurStyle(e: React.FocusEvent<HTMLTextAreaElement>) {
  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
  e.currentTarget.style.boxShadow = 'none'
}

interface FieldConfig {
  name: keyof OnboardingFormData['story']
  fieldLabel: string
  helperText: string
  required: boolean
  minChars?: number
  maxChars: number
  minRows: number
  placeholder: string
}

const FIELDS: FieldConfig[] = [
  {
    name: 'yourStory',
    fieldLabel: 'Your Story *',
    helperText:
      'How did your business get started? What drives you? Tell us your story in your own words.',
    required: true,
    minChars: 50,
    maxChars: 2000,
    minRows: 6,
    placeholder:
      "We started this business because\u2026 I've always been passionate about\u2026 What drives me every day is\u2026",
  },
  {
    name: 'whatMakesDifferent',
    fieldLabel: 'What Makes You Different *',
    helperText: 'Why should a customer choose you over the competition?',
    required: true,
    minChars: 30,
    maxChars: 1000,
    minRows: 4,
    placeholder:
      'Unlike other companies, we… Our customers choose us because… What sets us apart is…',
  },
  {
    name: 'targetCustomers',
    fieldLabel: 'Target Customers',
    helperText: 'Who is your ideal customer?',
    required: false,
    maxChars: 500,
    minRows: 4,
    placeholder:
      'Homeowners in the Metro Detroit area… Small business owners who need… Families looking for…',
  },
  {
    name: 'anythingElse',
    fieldLabel: 'Anything Else',
    helperText: 'Is there anything else you want on your website?',
    required: false,
    maxChars: 1000,
    minRows: 4,
    placeholder: "We'd also like to mention\u2026 One thing that's important to us\u2026 Please include\u2026",
  },
]

export default function StoryStep() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<OnboardingFormData>()

  const values = watch('story')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Heading */}
      <div>
        <h2
          style={{
            fontSize: 'clamp(1.4rem, 3vw, 1.75rem)',
            fontWeight: 800,
            color: '#fff',
            marginBottom: '8px',
            letterSpacing: '-0.02em',
            fontFamily: "'Syne', sans-serif",
          }}
        >
          What makes you different?
        </h2>
        <p
          style={{
            fontSize: '0.95rem',
            color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.7,
            maxWidth: '520px',
          }}
        >
          This is the most important part. Your answers become the words on your website.
        </p>
      </div>

      {/* Fields */}
      {FIELDS.map((field) => {
        const value = values?.[field.name] || ''
        const charCount = typeof value === 'string' ? value.length : 0
        const atLimit = charCount >= field.maxChars
        const fieldError = errors.story?.[field.name]

        return (
          <div key={field.name} style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={labelStyle}>{field.fieldLabel}</label>

            <textarea
              {...register(`story.${field.name}`)}
              rows={field.minRows}
              placeholder={field.placeholder}
              style={{
                ...textareaBase,
                minHeight: `${field.minRows * 28}px`,
              }}
              maxLength={field.maxChars}
              onInput={autoResize}
              onFocus={onFocusStyle}
              onBlur={onBlurStyle}
            />

            {/* Footer row: error/helper left, char count right */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginTop: '6px',
                gap: '12px',
              }}
            >
              <div style={{ flex: 1 }}>
                {fieldError ? (
                  <p style={errorStyle}>{fieldError.message}</p>
                ) : (
                  <p style={helperStyle}>{field.helperText}</p>
                )}
                {!fieldError && field.minChars && charCount > 0 && charCount < field.minChars && (
                  <p style={{ ...helperStyle, color: 'rgba(248,113,113,0.7)' }}>
                    {field.minChars - charCount} more characters needed
                  </p>
                )}
              </div>
              <span style={charCountStyle(atLimit)}>
                {charCount.toLocaleString()} / {field.maxChars.toLocaleString()}
              </span>
            </div>
          </div>
        )
      })}

      {/* Bottom note */}
      <div
        style={{
          padding: '16px 20px',
          background: 'rgba(30,61,143,0.08)',
          border: '1px solid rgba(30,61,143,0.2)',
          borderRadius: '12px',
        }}
      >
        <p
          style={{
            fontSize: '0.82rem',
            color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          <span style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>Write naturally.</span>{' '}
          Don&apos;t worry about sounding &quot;professional&quot; — authentic words convert better
          than marketing fluff. We&apos;ll polish the formatting, but the voice should be yours.
        </p>
      </div>
    </div>
  )
}
