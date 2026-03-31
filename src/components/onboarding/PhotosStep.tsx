'use client'

import { useState } from 'react'
import { useFormContext, useFieldArray } from 'react-hook-form'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import type { OnboardingFormData } from './schema'

const CATEGORIES = [
  { value: 'hero', label: 'Hero / Featured' },
  { value: 'team', label: 'Team / Staff' },
  { value: 'products', label: 'Products' },
  { value: 'services', label: 'Services / Work' },
  { value: 'gallery', label: 'Gallery' },
  { value: 'other', label: 'Other' },
] as const

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

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'var(--ob-input-bg)',
  border: '1px solid var(--ob-border-strong)',
  borderRadius: '10px',
  padding: '9px 12px',
  color: 'var(--ob-text)',
  fontSize: '14px',
  fontFamily: "'Inter', sans-serif",
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s, box-shadow 0.2s',
}

function onFocus(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = '#1E3D8F'
  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(30,61,143,0.2)'
}
function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = 'var(--ob-border-strong)'
  e.currentTarget.style.boxShadow = 'none'
}

export default function PhotosStep() {
  const params = useParams()
  const slug = params?.slug as string
  const { register, control } = useFormContext<OnboardingFormData>()
  const { fields, append, remove } = useFieldArray({ control, name: 'photos.items' })
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return

    setUploading(true)
    setUploadError('')

    for (const file of files) {
      try {
        const formData = new FormData()
        formData.append('file', file)
        if (slug) formData.append('slug', slug)

        const res = await fetch('/api/upload', { method: 'POST', body: formData })
        const data = await res.json()

        if (!res.ok) throw new Error(data.error || 'Upload failed')

        append({
          url: data.url,
          fileName: data.fileName,
          fileSize: data.fileSize,
          caption: '',
          category: undefined,
        })
      } catch (err) {
        setUploadError(err instanceof Error ? err.message : 'Upload failed')
      }
    }

    setUploading(false)
    e.target.value = ''
  }

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
          Photos & Media
        </h2>
        <p style={{ color: 'var(--ob-label)', fontSize: '0.9rem', lineHeight: 1.6 }}>
          Upload photos of your work, team, or business. High quality images make a big difference.
        </p>
      </div>

      {/* Upload area */}
      <label
        style={{
          display: 'block',
          border: `1px dashed ${uploading ? '#1E3D8F' : 'var(--ob-border-strong)'}`,
          borderRadius: '16px',
          padding: '32px',
          textAlign: 'center',
          cursor: uploading ? 'wait' : 'pointer',
          background: 'var(--ob-surface)',
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          if (!uploading) e.currentTarget.style.borderColor = 'var(--ob-text-secondary)'
        }}
        onMouseLeave={(e) => {
          if (!uploading) e.currentTarget.style.borderColor = 'var(--ob-border-strong)'
        }}
      >
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.webp,.heic,.svg"
          multiple
          onChange={handleFileChange}
          disabled={uploading}
          style={{ display: 'none' }}
        />
        <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>
          {uploading ? '⏳' : '📸'}
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--ob-text-secondary)', marginBottom: '4px', fontWeight: 500 }}>
          {uploading ? 'Uploading...' : 'Click to upload photos'}
        </p>
        <p style={{ fontSize: '0.75rem', color: 'var(--ob-label)' }}>
          JPG, PNG, WebP, HEIC or SVG · Max 20MB per file · Up to 20 photos
        </p>
      </label>

      {uploadError && (
        <p style={{ fontSize: '0.8rem', color: '#f87171', textAlign: 'center' }}>{uploadError}</p>
      )}

      {/* Photo grid */}
      {fields.length > 0 && (
        <div>
          <label style={labelStyle}>Uploaded Photos ({fields.length})</label>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '12px',
            }}
          >
            {fields.map((field, index) => (
              <div
                key={field.id}
                style={{
                  background: 'var(--ob-card)',
                  border: '1px solid var(--ob-border)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                }}
              >
                {/* Thumbnail */}
                <div style={{ position: 'relative', aspectRatio: '4/3', background: 'var(--ob-input-bg)' }}>
                  <Image
                    src={field.url}
                    alt={field.caption || `Photo ${index + 1}`}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    style={{
                      position: 'absolute',
                      top: '6px',
                      right: '6px',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'rgba(0,0,0,0.7)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      lineHeight: 1,
                    }}
                    title="Remove photo"
                  >
                    ×
                  </button>
                </div>

                {/* Meta inputs */}
                <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <input
                    {...register(`photos.items.${index}.caption`)}
                    placeholder="Add a caption..."
                    style={{ ...inputStyle, padding: '7px 10px', fontSize: '12px' }}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                  <select
                    {...register(`photos.items.${index}.category`)}
                    style={{
                      ...inputStyle,
                      padding: '7px 10px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      appearance: 'none' as const,
                    }}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  >
                    <option value="" style={{ background: 'var(--ob-select-bg)' }}>
                      Category...
                    </option>
                    {CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value} style={{ background: 'var(--ob-select-bg)' }}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                  {/* Hidden fields for url/fileName */}
                  <input {...register(`photos.items.${index}.url`)} type="hidden" />
                  <input {...register(`photos.items.${index}.fileName`)} type="hidden" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {fields.length === 0 && (
        <p
          style={{
            textAlign: 'center',
            fontSize: '0.8rem',
            color: 'var(--ob-text-faint)',
            marginTop: '-8px',
          }}
        >
          No photos yet — this step is optional, but photos dramatically improve results
        </p>
      )}
    </div>
  )
}
