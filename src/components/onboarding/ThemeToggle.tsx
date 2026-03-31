'use client'

import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ob-theme') as 'dark' | 'light' | null
      if (saved === 'light' || saved === 'dark') setTheme(saved)
    } catch {}
  }, [])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    try { localStorage.setItem('ob-theme', next) } catch {}
    const root = document.getElementById('ob-root')
    if (root) root.setAttribute('data-onboarding-theme', next)
  }

  return (
    <button
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        width: '40px',
        height: '24px',
        borderRadius: '9999px',
        border: '1px solid var(--ob-border-strong)',
        background: 'var(--ob-surface)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        transition: 'background 0.2s, border-color 0.2s',
        flexShrink: 0,
      }}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}
