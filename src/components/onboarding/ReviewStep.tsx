'use client'

import { useFormContext } from 'react-hook-form'
import Image from 'next/image'
import type { OnboardingFormData } from './schema'

interface ReviewStepProps {
  onEditStep: (step: number) => void
}

const DAYS = [
  'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday',
] as const

const DAY_LABELS: Record<string, string> = {
  monday: 'Mon', tuesday: 'Tue', wednesday: 'Wed',
  thursday: 'Thu', friday: 'Fri', saturday: 'Sat', sunday: 'Sun',
}

const STYLE_LABELS: Record<string, string> = {
  'modern-minimal': 'Modern / Minimal',
  'bold-dynamic': 'Bold / Dynamic',
  'classic-professional': 'Classic / Professional',
  'playful-creative': 'Playful / Creative',
}

const SOCIAL_LABELS: Record<string, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  twitter: 'Twitter / X',
  linkedin: 'LinkedIn',
  yelp: 'Yelp',
  google: 'Google',
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function Section({
  title,
  step,
  onEdit,
  children,
  empty,
}: {
  title: string
  step: number
  onEdit: (s: number) => void
  children?: React.ReactNode
  empty?: string
}) {
  return (
    <div
      style={{
        background: 'var(--ob-card)',
        border: '1px solid var(--ob-border)',
        borderRadius: '16px',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 20px',
          borderBottom: '1px solid var(--ob-border)',
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
          {title}
        </span>
        <button
          type="button"
          onClick={() => onEdit(step)}
          style={{
            fontSize: '0.75rem',
            color: '#1E3D8F',
            background: 'rgba(30,61,143,0.12)',
            border: '1px solid rgba(30,61,143,0.25)',
            borderRadius: '8px',
            padding: '4px 12px',
            cursor: 'pointer',
            fontWeight: 500,
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(30,61,143,0.22)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(30,61,143,0.12)'
          }}
        >
          Edit
        </button>
      </div>

      {/* Body */}
      <div style={{ padding: '16px 20px' }}>
        {children || (
          <p style={{ fontSize: '0.85rem', color: 'var(--ob-text-faint)', fontStyle: 'italic' }}>
            {empty || 'No data entered'}
          </p>
        )}
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null
  return (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        padding: '6px 0',
        borderBottom: '1px solid var(--ob-border)',
      }}
    >
      <span
        style={{
          fontSize: '0.78rem',
          color: 'var(--ob-label)',
          width: '120px',
          flexShrink: 0,
          paddingTop: '1px',
        }}
      >
        {label}
      </span>
      <span style={{ fontSize: '0.875rem', color: 'var(--ob-text-secondary)', lineHeight: 1.5 }}>
        {value}
      </span>
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function ReviewStep({ onEditStep }: ReviewStepProps) {
  const {
    watch,
    register,
    formState: { errors },
  } = useFormContext<OnboardingFormData>()

  const data = watch()
  const { business, contact, services, brand, photos, story } = data

  // Social links that have values
  const activeSocialLinks = Object.entries(contact?.social || {}).filter(
    ([, v]) => v && v.trim()
  )

  // Hours that have data
  const activeHours = DAYS.filter((day) => contact?.hours?.[day])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Heading */}
      <div style={{ marginBottom: '8px' }}>
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
          Review everything.
        </h2>
        <p style={{ color: 'var(--ob-label)', fontSize: '0.9rem', lineHeight: 1.6 }}>
          Look everything over before you submit. Click any &quot;Edit&quot; button to go back and make changes.
        </p>
      </div>

      {/* ── 1. Business Basics ── */}
      <Section title="Business Basics" step={1} onEdit={onEditStep}>
        <div>
          <Row label="Name" value={business?.name} />
          <Row label="Tagline" value={business?.tagline} />
          <Row label="Industry" value={business?.industry} />
          <Row label="Years open" value={business?.yearsInBusiness} />
          <Row label="Current site" value={business?.currentWebsite} />
        </div>
      </Section>

      {/* ── 2. Contact & Location ── */}
      <Section title="Contact & Location" step={2} onEdit={onEditStep}>
        <div>
          <Row label="Name" value={contact?.ownerName} />
          <Row label="Email" value={contact?.email} />
          <Row label="Phone" value={contact?.phone} />
          {(contact?.address || contact?.city) && (
            <Row
              label="Address"
              value={[contact.address, contact.city, contact.state, contact.zip]
                .filter(Boolean)
                .join(', ')}
            />
          )}

          {/* Hours grid */}
          {activeHours.length > 0 && (
            <div style={{ marginTop: '12px' }}>
              <p
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--ob-label)',
                  marginBottom: '8px',
                  fontFamily: "'Space Mono', monospace",
                }}
              >
                Business Hours
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '4px 24px',
                }}
              >
                {activeHours.map((day) => {
                  const h = contact?.hours?.[day]
                  if (!h) return null
                  return (
                    <div
                      key={day}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '4px 0',
                        borderBottom: '1px solid var(--ob-border)',
                      }}
                    >
                      <span style={{ fontSize: '0.8rem', color: 'var(--ob-label)' }}>
                        {DAY_LABELS[day]}
                      </span>
                      <span
                        style={{
                          fontSize: '0.8rem',
                          color: h.closed ? 'var(--ob-text-faint)' : 'var(--ob-text-secondary)',
                          fontStyle: h.closed ? 'italic' : 'normal',
                        }}
                      >
                        {h.closed ? 'Closed' : `${h.open} – ${h.close}`}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* ── 3. Services ── */}
      <Section
        title="Services"
        step={3}
        onEdit={onEditStep}
        empty="No services added yet"
      >
        {services?.items && services.items.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {services.items.map((svc, i) => (
              <div
                key={i}
                style={{
                  padding: '10px 14px',
                  background: 'var(--ob-surface)',
                  border: '1px solid var(--ob-border)',
                  borderRadius: '10px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '12px',
                  }}
                >
                  <span
                    style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--ob-text)' }}
                  >
                    {svc.name}
                  </span>
                  {svc.price && (
                    <span
                      style={{
                        fontSize: '0.78rem',
                        color: 'var(--ob-label)',
                        flexShrink: 0,
                      }}
                    >
                      {svc.price}
                    </span>
                  )}
                </div>
                {svc.description && (
                  <p
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--ob-text-secondary)',
                      marginTop: '4px',
                      lineHeight: 1.5,
                    }}
                  >
                    {svc.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : null}
      </Section>

      {/* ── 4. Brand ── */}
      <Section title="Brand & Colors" step={4} onEdit={onEditStep}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Color swatches */}
          <div>
            <p
              style={{
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--ob-label)',
                marginBottom: '10px',
                fontFamily: "'Space Mono', monospace",
              }}
            >
              Colors
            </p>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end' }}>
              {[
                { color: brand?.primaryColor, label: 'Primary' },
                { color: brand?.secondaryColor, label: 'Secondary' },
                { color: brand?.accentColor, label: 'Accent' },
              ].map(
                ({ color, label }) =>
                  color && (
                    <div
                      key={label}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: color,
                          border: '2px solid var(--ob-border-strong)',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                        }}
                      />
                      <span style={{ fontSize: '0.7rem', color: 'var(--ob-label)' }}>{label}</span>
                      <span
                        style={{
                          fontSize: '0.65rem',
                          color: 'var(--ob-text-faint)',
                          fontFamily: "'Space Mono', monospace",
                        }}
                      >
                        {color}
                      </span>
                    </div>
                  )
              )}
            </div>
          </div>

          {brand?.stylePreference && (
            <Row
              label="Style"
              value={STYLE_LABELS[brand.stylePreference] || brand.stylePreference}
            />
          )}

          {/* Logo thumbnail */}
          {brand?.logoUrl && (
            <div>
              <p
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--ob-label)',
                  marginBottom: '8px',
                  fontFamily: "'Space Mono', monospace",
                }}
              >
                Logo
              </p>
              <div
                style={{
                  width: '120px',
                  height: '80px',
                  borderRadius: '10px',
                  border: '1px solid var(--ob-border)',
                  background: 'var(--ob-input-bg)',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <Image
                  src={brand.logoUrl}
                  alt="Logo"
                  fill
                  style={{ objectFit: 'contain', padding: '8px' }}
                />
              </div>
            </div>
          )}

          {brand?.notes && <Row label="Notes" value={brand.notes} />}
        </div>
      </Section>

      {/* ── 5. Photos ── */}
      <Section
        title="Photos & Media"
        step={5}
        onEdit={onEditStep}
        empty="No photos uploaded"
      >
        {photos?.items && photos.items.length > 0 ? (
          <div>
            <p
              style={{
                fontSize: '0.8rem',
                color: 'var(--ob-text-secondary)',
                marginBottom: '10px',
              }}
            >
              {photos.items.length} photo{photos.items.length !== 1 ? 's' : ''} uploaded
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                gap: '8px',
              }}
            >
              {photos.items.map((photo, i) => (
                <div
                  key={i}
                  style={{
                    position: 'relative',
                    aspectRatio: '1',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    background: 'var(--ob-input-bg)',
                  }}
                >
                  <Image
                    src={photo.url}
                    alt={photo.caption || `Photo ${i + 1}`}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  {photo.caption && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                        padding: '16px 6px 5px',
                      }}
                    >
                      <p
                        style={{
                          fontSize: '0.6rem',
                          color: 'rgba(255,255,255,0.8)',
                          margin: 0,
                          lineHeight: 1.3,
                        }}
                      >
                        {photo.caption}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </Section>

      {/* ── Social Media ── */}
      {activeSocialLinks.length > 0 && (
        <Section title="Social Media" step={2} onEdit={onEditStep}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {activeSocialLinks.map(([platform, url]) => (
              <div
                key={platform}
                style={{
                  display: 'flex',
                  gap: '12px',
                  padding: '6px 0',
                  borderBottom: '1px solid var(--ob-border)',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: '0.78rem',
                    color: 'var(--ob-label)',
                    width: '88px',
                    flexShrink: 0,
                  }}
                >
                  {SOCIAL_LABELS[platform] || platform}
                </span>
                <a
                  href={url as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '0.8rem',
                    color: '#1E3D8F',
                    textDecoration: 'none',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {url as string}
                </a>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ── 6. Your Story ── */}
      <Section title="Your Story" step={6} onEdit={onEditStep}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {story?.yourStory && (
            <div>
              <p
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--ob-label)',
                  marginBottom: '6px',
                  fontFamily: "'Space Mono', monospace",
                }}
              >
                Your Story
              </p>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--ob-text-secondary)',
                  lineHeight: 1.7,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {story.yourStory}
              </p>
            </div>
          )}
          {story?.whatMakesDifferent && (
            <div>
              <p
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--ob-label)',
                  marginBottom: '6px',
                  fontFamily: "'Space Mono', monospace",
                }}
              >
                What Makes You Different
              </p>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--ob-text-secondary)',
                  lineHeight: 1.7,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {story.whatMakesDifferent}
              </p>
            </div>
          )}
          {story?.targetCustomers && (
            <div>
              <p
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--ob-label)',
                  marginBottom: '6px',
                  fontFamily: "'Space Mono', monospace",
                }}
              >
                Target Customers
              </p>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--ob-text-secondary)',
                  lineHeight: 1.7,
                }}
              >
                {story.targetCustomers}
              </p>
            </div>
          )}
          {story?.anythingElse && (
            <div>
              <p
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--ob-label)',
                  marginBottom: '6px',
                  fontFamily: "'Space Mono', monospace",
                }}
              >
                Anything Else
              </p>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--ob-text-secondary)',
                  lineHeight: 1.7,
                }}
              >
                {story.anythingElse}
              </p>
            </div>
          )}
        </div>
      </Section>

      {/* ── Agreement ── */}
      <div
        style={{
          background: 'var(--ob-card)',
          border: errors.agreement
            ? '1px solid rgba(248,113,113,0.4)'
            : '1px solid var(--ob-border)',
          borderRadius: '16px',
          padding: '20px',
          transition: 'border-color 0.2s',
        }}
      >
        <label
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '14px',
            cursor: 'pointer',
          }}
        >
          <input
            type="checkbox"
            {...register('agreement')}
            style={{
              marginTop: '3px',
              width: '18px',
              height: '18px',
              flexShrink: 0,
              accentColor: '#1E3D8F',
              cursor: 'pointer',
            }}
          />
          <span
            style={{
              fontSize: '0.85rem',
              color: 'var(--ob-text-secondary)',
              lineHeight: 1.65,
            }}
          >
            I confirm that the information above is accurate and I authorize Caliber Web
            Studio to use this content to build my website. I understand that I&apos;ll receive
            a live preview link within 48 hours and can request changes before anything goes live.
          </span>
        </label>

        {errors.agreement && (
          <p
            style={{
              fontSize: '0.75rem',
              color: '#f87171',
              marginTop: '10px',
              marginLeft: '32px',
            }}
          >
            {errors.agreement.message}
          </p>
        )}
      </div>
    </div>
  )
}
