'use client'

import { useState, useEffect, useCallback } from 'react'

interface SlugEntry {
  slug: string
  businessName: string
  email: string
  createdAt: string
  status: 'pending' | 'submitted'
}

export default function AdminOnboardingPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [authError, setAuthError] = useState('')
  const [authLoading, setAuthLoading] = useState(false)

  const [slugs, setSlugs] = useState<SlugEntry[]>([])
  const [dataLoading, setDataLoading] = useState(false)

  const [bizName, setBizName] = useState('')
  const [bizEmail, setBizEmail] = useState('')
  const [genLoading, setGenLoading] = useState(false)
  const [generatedUrl, setGeneratedUrl] = useState('')
  const [genError, setGenError] = useState('')
  const [copied, setCopied] = useState(false)

  const fetchData = useCallback(
    async (pw: string) => {
      setDataLoading(true)
      try {
        const res = await fetch('/api/admin/data', {
          headers: { Authorization: `Bearer ${pw}` },
        })
        if (!res.ok) throw new Error('Failed to load data')
        const json = await res.json()
        setSlugs(json.slugs ?? [])
      } catch {
        // silently ignore — user will see empty table
      } finally {
        setDataLoading(false)
      }
    },
    []
  )

  // Restore session
  useEffect(() => {
    const saved = sessionStorage.getItem('admin-pw')
    if (saved) {
      setAuthed(true)
      fetchData(saved)
    }
  }, [fetchData])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setAuthError('')
    setAuthLoading(true)
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (!res.ok) {
        setAuthError('Incorrect password.')
        return
      }
      sessionStorage.setItem('admin-pw', password)
      setAuthed(true)
      fetchData(password)
    } catch {
      setAuthError('Something went wrong. Try again.')
    } finally {
      setAuthLoading(false)
    }
  }

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    setGenError('')
    setGeneratedUrl('')
    setGenLoading(true)
    try {
      const res = await fetch('/api/onboarding/generate-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessName: bizName, email: bizEmail }),
      })
      const json = await res.json()
      if (!res.ok) {
        setGenError(json.error || 'Failed to generate link')
        return
      }
      setGeneratedUrl(json.url)
      setBizName('')
      setBizEmail('')
      // Refresh list
      const pw = sessionStorage.getItem('admin-pw') || ''
      fetchData(pw)
    } catch {
      setGenError('Something went wrong. Try again.')
    } finally {
      setGenLoading(false)
    }
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(generatedUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleLogout() {
    sessionStorage.removeItem('admin-pw')
    setAuthed(false)
    setSlugs([])
    setPassword('')
  }

  // ── Password gate ──────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div style={styles.page}>
        <div style={styles.loginCard}>
          <h1 style={styles.loginTitle}>Admin — Onboarding</h1>
          <p style={styles.loginSub}>Caliber Web Studio</p>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
            {authError && <p style={styles.error}>{authError}</p>}
            <button type="submit" disabled={authLoading} style={styles.btnPrimary}>
              {authLoading ? 'Checking…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  // ── Admin dashboard ────────────────────────────────────────────────────────
  const pending = slugs.filter((s) => s.status === 'pending')
  const submitted = slugs.filter((s) => s.status === 'submitted')

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Onboarding Links</h1>
            <p style={styles.sub}>
              {slugs.length} total · {pending.length} pending · {submitted.length} submitted
            </p>
          </div>
          <button onClick={handleLogout} style={styles.btnGhost}>
            Sign out
          </button>
        </div>

        {/* Generate new link */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Generate New Onboarding Link</h2>
          <form onSubmit={handleGenerate} style={styles.genForm}>
            <input
              type="text"
              placeholder="Business name (e.g. Detroit Cuts)"
              value={bizName}
              onChange={(e) => setBizName(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="email"
              placeholder="Client email"
              value={bizEmail}
              onChange={(e) => setBizEmail(e.target.value)}
              required
              style={styles.input}
            />
            <button type="submit" disabled={genLoading} style={styles.btnPrimary}>
              {genLoading ? 'Generating…' : 'Generate Link'}
            </button>
          </form>

          {genError && <p style={{ ...styles.error, marginTop: 8 }}>{genError}</p>}

          {generatedUrl && (
            <div style={styles.generatedBox}>
              <p style={styles.generatedLabel}>Link ready — send this to your client:</p>
              <div style={styles.urlRow}>
                <code style={styles.urlCode}>{generatedUrl}</code>
                <button onClick={handleCopy} style={styles.btnCopy}>
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Links table */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>All Onboarding Links</h2>
          {dataLoading ? (
            <p style={styles.dim}>Loading…</p>
          ) : slugs.length === 0 ? (
            <p style={styles.dim}>No links generated yet.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Business</th>
                    <th style={styles.th}>Email</th>
                    <th style={styles.th}>Slug</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Created</th>
                  </tr>
                </thead>
                <tbody>
                  {[...slugs].reverse().map((s) => (
                    <tr key={s.slug} style={styles.tr}>
                      <td style={styles.td}>{s.businessName}</td>
                      <td style={styles.td}>{s.email}</td>
                      <td style={styles.td}>
                        <a
                          href={`/onboarding/${s.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={styles.link}
                        >
                          {s.slug}
                        </a>
                      </td>
                      <td style={styles.td}>
                        <span
                          style={{
                            ...styles.badge,
                            background:
                              s.status === 'submitted'
                                ? 'rgba(34,197,94,0.15)'
                                : 'rgba(250,204,21,0.12)',
                            color: s.status === 'submitted' ? '#4ade80' : '#fcd34d',
                            border: `1px solid ${
                              s.status === 'submitted'
                                ? 'rgba(34,197,94,0.3)'
                                : 'rgba(250,204,21,0.25)'
                            }`,
                          }}
                        >
                          {s.status}
                        </span>
                      </td>
                      <td style={{ ...styles.td, ...styles.dim }}>
                        {new Date(s.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#0a0a0a',
    color: '#e5e5e5',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    padding: '40px 16px',
  },
  container: {
    maxWidth: 900,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  loginCard: {
    maxWidth: 400,
    margin: '120px auto 0',
    background: '#141414',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 16,
    padding: 32,
  },
  loginTitle: {
    margin: '0 0 4px',
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#fff',
  },
  loginSub: {
    margin: '0 0 24px',
    fontSize: '0.8rem',
    color: '#666',
    letterSpacing: '0.05em',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    margin: '0 0 4px',
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#fff',
  },
  sub: {
    margin: 0,
    fontSize: '0.85rem',
    color: '#666',
  },
  card: {
    background: '#141414',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 16,
    padding: '24px 28px',
  },
  cardTitle: {
    margin: '0 0 20px',
    fontSize: '1rem',
    fontWeight: 600,
    color: '#fff',
  },
  genForm: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: 10,
    alignItems: 'flex-end',
  },
  input: {
    flex: '1 1 200px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 8,
    color: '#e5e5e5',
    fontSize: '0.875rem',
    padding: '10px 14px',
    outline: 'none',
  },
  btnPrimary: {
    background: '#1E3D8F',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '10px 20px',
    fontSize: '0.875rem',
    fontWeight: 500,
    cursor: 'pointer',
    whiteSpace: 'nowrap' as const,
  },
  btnGhost: {
    background: 'transparent',
    color: '#666',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 8,
    padding: '8px 16px',
    fontSize: '0.8rem',
    cursor: 'pointer',
  },
  btnCopy: {
    background: 'rgba(255,255,255,0.08)',
    color: '#e5e5e5',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 6,
    padding: '6px 14px',
    fontSize: '0.8rem',
    cursor: 'pointer',
    whiteSpace: 'nowrap' as const,
    flexShrink: 0,
  },
  generatedBox: {
    marginTop: 16,
    background: 'rgba(34,197,94,0.06)',
    border: '1px solid rgba(34,197,94,0.2)',
    borderRadius: 10,
    padding: '14px 16px',
  },
  generatedLabel: {
    margin: '0 0 8px',
    fontSize: '0.8rem',
    color: '#4ade80',
  },
  urlRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  urlCode: {
    flex: 1,
    fontSize: '0.8rem',
    color: '#e5e5e5',
    wordBreak: 'break-all' as const,
    fontFamily: 'monospace',
    overflow: 'hidden',
  },
  error: {
    margin: 0,
    fontSize: '0.8rem',
    color: '#fca5a5',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: '0.85rem',
  },
  th: {
    textAlign: 'left' as const,
    padding: '8px 12px',
    color: '#666',
    fontWeight: 500,
    fontSize: '0.75rem',
    letterSpacing: '0.05em',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
  },
  tr: {},
  td: {
    padding: '12px 12px',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    verticalAlign: 'middle',
  },
  link: {
    color: '#60a5fa',
    textDecoration: 'none',
    fontFamily: 'monospace',
    fontSize: '0.8rem',
  },
  badge: {
    display: 'inline-block',
    padding: '2px 10px',
    borderRadius: 20,
    fontSize: '0.75rem',
    fontWeight: 500,
  },
  dim: {
    color: '#555',
    fontSize: '0.85rem',
  },
}
