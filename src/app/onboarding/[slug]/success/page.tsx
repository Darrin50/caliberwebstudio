import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: { absolute: "We're on it. | Caliber Web Studio" },
  description: "Your information has been received. We'll have your site preview ready within 48 hours.",
  robots: { index: false, follow: false },
}

const TIMELINE = [
  {
    icon: '✅',
    label: 'Information Received',
    desc: "We've got everything. Your form was submitted successfully.",
    time: 'Just now',
    status: 'done',
  },
  {
    icon: '⏳',
    label: 'Site Build',
    desc: "Our team is building your custom website using your answers and brand details.",
    time: 'Next 24–48 hours',
    status: 'in-progress',
  },
  {
    icon: '🔗',
    label: 'Your Live Preview',
    desc: "You'll receive a private link to review your site before anything goes public. One round of changes included.",
    time: 'Within 48 hours',
    status: 'upcoming',
  },
] as const

export default async function SuccessPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  await params // resolve params (slug not needed for display)

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0A0A0A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 16px',
      }}
    >
      <div style={{ maxWidth: '560px', width: '100%' }}>
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '48px',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: '#1E3D8F',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                color: '#fff',
                fontSize: '0.85rem',
                fontWeight: 800,
                fontFamily: "'Syne', sans-serif",
              }}
            >
              C
            </span>
          </div>
          <span
            style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: '0.85rem',
              letterSpacing: '0.06em',
            }}
          >
            Caliber Web Studio
          </span>
        </div>

        {/* Heading */}
        <div style={{ marginBottom: '48px' }}>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 2.75rem)',
              fontWeight: 800,
              color: '#fff',
              letterSpacing: '-0.03em',
              marginBottom: '12px',
              fontFamily: "'Syne', sans-serif",
              lineHeight: 1.1,
            }}
          >
            We&apos;re on it.
          </h1>
          <p
            style={{
              fontSize: '1rem',
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.7,
            }}
          >
            Your information has been received. Here&apos;s what happens next.
          </p>
        </div>

        {/* Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {TIMELINE.map((item, i) => {
            const isLast = i === TIMELINE.length - 1
            const isDone = item.status === 'done'
            const isInProgress = item.status === 'in-progress'

            return (
              <div key={i} style={{ display: 'flex', gap: '20px' }}>
                {/* Left: icon + line */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: isDone
                        ? 'rgba(30,61,143,0.2)'
                        : isInProgress
                        ? 'rgba(255,255,255,0.06)'
                        : 'rgba(255,255,255,0.03)',
                      border: isDone
                        ? '1px solid rgba(30,61,143,0.4)'
                        : isInProgress
                        ? '1px solid rgba(255,255,255,0.12)'
                        : '1px solid rgba(255,255,255,0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  {!isLast && (
                    <div
                      style={{
                        width: '1px',
                        flex: 1,
                        minHeight: '32px',
                        background: isDone
                          ? 'rgba(30,61,143,0.3)'
                          : 'rgba(255,255,255,0.06)',
                        margin: '6px 0',
                      }}
                    />
                  )}
                </div>

                {/* Right: content */}
                <div
                  style={{
                    paddingBottom: isLast ? '0' : '32px',
                    flex: 1,
                    paddingTop: '8px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '12px',
                      marginBottom: '6px',
                    }}
                  >
                    <h3
                      style={{
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        color: isDone
                          ? '#fff'
                          : isInProgress
                          ? 'rgba(255,255,255,0.85)'
                          : 'rgba(255,255,255,0.4)',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {item.label}
                    </h3>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        color: isDone
                          ? '#1E3D8F'
                          : 'rgba(255,255,255,0.25)',
                        flexShrink: 0,
                        fontFamily: "'Space Mono', monospace",
                        paddingTop: '2px',
                      }}
                    >
                      {item.time}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: '0.85rem',
                      color: isDone
                        ? 'rgba(255,255,255,0.55)'
                        : isInProgress
                        ? 'rgba(255,255,255,0.4)'
                        : 'rgba(255,255,255,0.25)',
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Contact card */}
        <div
          style={{
            marginTop: '48px',
            padding: '20px 24px',
            background: '#141414',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '16px',
          }}
        >
          <p
            style={{
              fontSize: '0.78rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#6B6B6B',
              marginBottom: '14px',
              fontFamily: "'Space Mono', monospace",
            }}
          >
            Questions?
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <a
              href="mailto:darrin@caliberwebstudio.com"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: 'rgba(255,255,255,0.6)',
                textDecoration: 'none',
                fontSize: '0.875rem',
                transition: 'color 0.2s',
              }}
            >
              <span style={{ fontSize: '1rem' }}>✉</span>
              darrin@caliberwebstudio.com
            </a>
            <a
              href="tel:+13137992315"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: 'rgba(255,255,255,0.6)',
                textDecoration: 'none',
                fontSize: '0.875rem',
              }}
            >
              <span style={{ fontSize: '1rem' }}>📞</span>
              (313) 799-2315
            </a>
          </div>
        </div>

        {/* Back to site */}
        <div style={{ textAlign: 'center', marginTop: '36px' }}>
          <Link
            href="/"
            style={{
              fontSize: '0.8rem',
              color: 'rgba(255,255,255,0.25)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
          >
            ← Back to caliberwebstudio.com
          </Link>
        </div>
      </div>
    </div>
  )
}
