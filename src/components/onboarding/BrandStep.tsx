'use client'

import { useFormContext } from 'react-hook-form'
import type { OnboardingFormData } from './schema'

const STYLE_OPTIONS = [
  {
    value: 'modern-minimal',
    label: 'Modern / Minimal',
    desc: 'Clean lines, white space, refined typography',
  },
  {
    value: 'bold-dynamic',
    label: 'Bold / Dynamic',
    desc: 'Strong colors, energy, commanding presence',
  },
  {
    value: 'classic-professional',
    label: 'Classic / Professional',
    desc: 'Trustworthy, established, timeless',
  },
  {
    value: 'playful-creative',
    label: 'Playful / Creative',
    desc: 'Fun, colorful, expressive personality',
  },
] as const

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#1A1A1A',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '12px',
  padding: '12px 16px',
  color: '#fff',
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
  color: '#6B6B6B',
  marginBottom: '8px',
  fontFamily: "'Space Mono', monospace",
}

const errorStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  color: '#f87171',
  marginTop: '4px',
}

function onFocus(e: React.FocusEvent<HTMLTextAreaElement>) {
  e.currentTarget.style.borderColor = '#1E3D8F'
  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(30,61,143,0.2)'
}
function onBlur(e: React.FocusEvent<HTMLTextAreaElement>) {
  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
  e.currentTarget.style.boxShadow = 'none'
}

export default function BrandStep() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<OnboardingFormData>()

  const stylePreference = watch('brand.stylePreference')
  const primaryColor = watch('brand.primaryColor') || '#1E3D8F'
  const secondaryColor = watch('brand.secondaryColor') || '#ffffff'
  const accentColor = watch('brand.accentColor') || '#00d4ff'

  const colors = [
    { key: 'brand.primaryColor' as const, label: 'Primary *', value: primaryColor },
    { key: 'brand.secondaryColor' as const, label: 'Secondary', value: secondaryColor },
    { key: 'brand.accentColor' as const, label: 'Accent', value: accentColor },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div>
        <h2
          style={{
            fontSize: 'clamp(1.4rem, 3vw, 1.75rem)',
            fontWeight: 800,
            color: '#fff',
            marginBottom: '6px',
            letterSpacing: '-0.02em',
            fontFamily: "'Syne', sans-serif",
          }}
        >
          Brand & Colors
        </h2>
        <p style={{ color: '#6B6B6B', fontSize: '0.9rem', lineHeight: 1.6 }}>
          Tell us about your visual identity. Don&apos;t worry if you don&apos;t have everything — we&apos;ll work with what you have.
        </p>
      </div>

      {/* Color pickers */}
      <div>
        <label style={labelStyle}>Your Brand Colors</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          {colors.map(({ key, label, value }) => (
            <div
              key={key}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
            >
              <div
                style={{
                  width: '100%',
                  height: '64px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: value,
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="color"
                  {...register(key)}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer',
                    border: 'none',
                    padding: 0,
                  }}
                />
              </div>
              <span
                style={{ fontSize: '0.72rem', color: '#6B6B6B', textAlign: 'center' }}
              >
                {label}
              </span>
              <span
                style={{
                  fontSize: '0.65rem',
                  color: 'rgba(255,255,255,0.25)',
                  fontFamily: "'Space Mono', monospace",
                }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
        {errors.brand?.primaryColor && (
          <p style={errorStyle}>{errors.brand.primaryColor.message}</p>
        )}
        <p style={{ fontSize: '0.75rem', color: '#6B6B6B', marginTop: '8px' }}>
          Click any swatch to open the color picker
        </p>
      </div>

      {/* Style preference */}
      <div>
        <label style={labelStyle}>Style Preference *</label>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
          }}
        >
          {STYLE_OPTIONS.map((opt) => {
            const isSelected = stylePreference === opt.value
            return (
              <label
                key={opt.value}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '16px',
                  borderRadius: '14px',
                  border: isSelected
                    ? '1px solid #1E3D8F'
                    : '1px solid rgba(255,255,255,0.06)',
                  background: isSelected ? 'rgba(30,61,143,0.12)' : '#141414',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <input
                  type="radio"
                  {...register('brand.stylePreference')}
                  value={opt.value}
                  style={{ marginTop: '2px', accentColor: '#1E3D8F' }}
                />
                <div>
                  <div
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: '#fff',
                      marginBottom: '2px',
                    }}
                  >
                    {opt.label}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6B6B6B', lineHeight: 1.4 }}>
                    {opt.desc}
                  </div>
                </div>
              </label>
            )
          })}
        </div>
        {errors.brand?.stylePreference && (
          <p style={errorStyle}>{errors.brand.stylePreference.message}</p>
        )}
      </div>

      {/* Logo upload placeholder */}
      <div>
        <label style={labelStyle}>Logo File</label>
        <p style={{ fontSize: '0.75rem', color: '#6B6B6B', marginBottom: '12px' }}>
          Upload your logo if you have one — PNG, SVG, or JPG preferred
        </p>
        <div
          style={{
            border: '1px dashed rgba(255,255,255,0.15)',
            borderRadius: '14px',
            padding: '28px',
            textAlign: 'center',
            background: 'rgba(255,255,255,0.02)',
          }}
        >
          <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>🖼</div>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.35)', marginBottom: '6px' }}>
            Logo upload coming soon
          </p>
          <p style={{ fontSize: '0.75rem', color: '#6B6B6B' }}>
            You can email it to darrin@caliberwebstudio.com in the meantime
          </p>
          <input {...register('brand.logoUrl')} type="hidden" />
          <input {...register('brand.logoFileName')} type="hidden" />
        </div>
      </div>

      {/* Notes */}
      <div>
        <label style={labelStyle}>Additional Brand Notes</label>
        <textarea
          {...register('brand.notes')}
          rows={3}
          placeholder="Any other details — fonts you like, websites you admire, things to avoid..."
          style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
    </div>
  )
}
