'use client'
import { useState } from 'react'

export default function ConceptDisclaimerBar({ spaName }: { spaName: string }) {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 99999,
        background: '#111',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px' }}>
        Private website preview built for <strong style={{ color: '#fff' }}>{spaName}</strong> —{' '}
        Designed by Caliber Web Studio
      </span>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
        <a
          href="https://caliberwebstudio.com/contact"
          style={{
            background: '#C0527A',
            color: '#fff',
            fontWeight: 700,
            fontSize: '12px',
            letterSpacing: '0.06em',
            padding: '8px 16px',
            borderRadius: '100px',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          📅 BOOK MY WALKTHROUGH
        </a>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.5)',
            fontSize: '18px',
            cursor: 'pointer',
            lineHeight: 1,
            padding: '2px',
          }}
        >
          ×
        </button>
      </div>
    </div>
  )
}
