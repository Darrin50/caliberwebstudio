'use client'

import { useFormContext, useFieldArray } from 'react-hook-form'
import type { OnboardingFormData } from './schema'

const inputStyle: React.CSSProperties = {
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

function onFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderColor = '#1E3D8F'
  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(30,61,143,0.2)'
}
function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderColor = 'var(--ob-border-strong)'
  e.currentTarget.style.boxShadow = 'none'
}

export default function ServicesStep() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<OnboardingFormData>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'services.items',
  })

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
          What services do you offer?
        </h2>
        <p style={{ color: 'var(--ob-label)', fontSize: '0.9rem', lineHeight: 1.6 }}>
          Add everything you want on your website. You can always edit later.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {fields.map((field, index) => (
          <div
            key={field.id}
            style={{
              background: 'var(--ob-card)',
              border: '1px solid var(--ob-border)',
              borderRadius: '16px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--ob-label)',
                  fontFamily: "'Space Mono', monospace",
                }}
              >
                Service {index + 1}
              </span>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--ob-text-faint)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '2px 8px',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#f87171'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--ob-text-faint)'
                  }}
                >
                  Remove
                </button>
              )}
            </div>

            <div>
              <label style={labelStyle}>Service Name *</label>
              <input
                {...register(`services.items.${index}.name`)}
                placeholder="e.g. Kitchen Remodeling"
                style={inputStyle}
                onFocus={onFocus}
                onBlur={onBlur}
              />
              {errors.services?.items?.[index]?.name && (
                <p style={errorStyle}>{errors.services.items[index].name?.message}</p>
              )}
            </div>

            <div>
              <label style={labelStyle}>Short Description</label>
              <textarea
                {...register(`services.items.${index}.description`)}
                rows={2}
                placeholder="Briefly describe what's included in this service..."
                style={{
                  ...inputStyle,
                  resize: 'none',
                  lineHeight: 1.6,
                }}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </div>

            <div>
              <label style={labelStyle}>Price / Starting At</label>
              <input
                {...register(`services.items.${index}.price`)}
                placeholder="e.g. Starting at $500 · Call for Quote · Free Estimates"
                style={inputStyle}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </div>
          </div>
        ))}

        {(errors.services?.items as { message?: string } | undefined)?.message && (
          <p style={errorStyle}>
            {(errors.services?.items as { message?: string }).message}
          </p>
        )}

        {fields.length < 20 && (
          <button
            type="button"
            onClick={() => append({ name: '', description: '', price: '' })}
            style={{
              width: '100%',
              padding: '14px',
              border: '1px dashed var(--ob-border-strong)',
              borderRadius: '14px',
              background: 'none',
              color: 'var(--ob-text-dim)',
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--ob-text-secondary)'
              e.currentTarget.style.borderColor = 'var(--ob-border-strong)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--ob-text-dim)'
              e.currentTarget.style.borderColor = 'var(--ob-border-strong)'
            }}
          >
            + Add Another Service
          </button>
        )}
      </div>
    </div>
  )
}
