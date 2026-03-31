'use client'

import { useState, useEffect, useCallback } from 'react'
import type { ProspectDemoConfig } from '@/lib/prospect-demo-data'

// ── Styles (reuse admin onboarding pattern) ────────────────────────────────────
const S: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#0a0a0a',
    color: '#e5e5e5',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    padding: '40px 16px',
  },
  container: { maxWidth: 960, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 },
  loginCard: {
    maxWidth: 400, margin: '120px auto 0',
    background: '#141414', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 16, padding: 32,
  },
  loginTitle: { margin: '0 0 4px', fontSize: '1.25rem', fontWeight: 600, color: '#fff' },
  loginSub: { margin: '0 0 24px', fontSize: '0.8rem', color: '#666', letterSpacing: '0.05em' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  title: { margin: '0 0 4px', fontSize: '1.5rem', fontWeight: 700, color: '#fff' },
  sub: { margin: 0, fontSize: '0.85rem', color: '#666' },
  card: {
    background: '#141414', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 16, padding: '24px 28px',
  },
  cardTitle: { margin: '0 0 20px', fontSize: '1rem', fontWeight: 600, color: '#fff' },
  input: {
    width: '100%', background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8,
    color: '#e5e5e5', fontSize: '0.875rem', padding: '10px 14px', outline: 'none',
    marginBottom: 10, boxSizing: 'border-box',
  },
  inputRow: { display: 'flex', gap: 10, flexWrap: 'wrap' as const, alignItems: 'flex-end', marginBottom: 0 },
  textarea: {
    width: '100%', background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8,
    color: '#e5e5e5', fontSize: '0.875rem', padding: '10px 14px', outline: 'none',
    marginBottom: 10, resize: 'vertical' as const, minHeight: 80, boxSizing: 'border-box',
    fontFamily: 'inherit',
  },
  label: { display: 'block', fontSize: '0.75rem', color: '#888', marginBottom: 4, letterSpacing: '0.04em', textTransform: 'uppercase' as const },
  btnPrimary: {
    background: '#1E3D8F', color: '#fff', border: 'none', borderRadius: 8,
    padding: '10px 20px', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap' as const,
  },
  btnAccent: {
    background: '#C9A84C', color: '#000', border: 'none', borderRadius: 8,
    padding: '10px 20px', fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' as const,
  },
  btnGhost: {
    background: 'transparent', color: '#666', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 8, padding: '8px 16px', fontSize: '0.8rem', cursor: 'pointer',
  },
  btnCopy: {
    background: 'rgba(255,255,255,0.08)', color: '#e5e5e5', border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 6, padding: '6px 14px', fontSize: '0.8rem', cursor: 'pointer', whiteSpace: 'nowrap' as const, flexShrink: 0,
  },
  successBox: {
    background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.2)',
    borderRadius: 10, padding: '14px 16px', marginTop: 16,
  },
  successLabel: { margin: '0 0 8px', fontSize: '0.8rem', color: '#4ade80' },
  urlRow: { display: 'flex', alignItems: 'center', gap: 10 },
  urlCode: { flex: 1, fontSize: '0.8rem', color: '#e5e5e5', wordBreak: 'break-all' as const, fontFamily: 'monospace', overflow: 'hidden' },
  error: { margin: '8px 0 0', fontSize: '0.8rem', color: '#fca5a5' },
  divider: { borderTop: '1px solid rgba(255,255,255,0.07)', margin: '20px 0' },
  badge: { display: 'inline-block', padding: '2px 10px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 500 },
  table: { width: '100%', borderCollapse: 'collapse' as const, fontSize: '0.85rem' },
  th: { textAlign: 'left' as const, padding: '8px 12px', color: '#666', fontWeight: 500, fontSize: '0.75rem', letterSpacing: '0.05em', borderBottom: '1px solid rgba(255,255,255,0.07)' },
  td: { padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)', verticalAlign: 'middle' as const },
  link: { color: '#60a5fa', textDecoration: 'none', fontSize: '0.8rem' },
  svcRow: { display: 'flex', gap: 8, marginBottom: 8, alignItems: 'flex-start', flexWrap: 'wrap' as const },
  dim: { color: '#555', fontSize: '0.85rem' },
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={S.label}>{label}</label>
      {children}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ProspectDemoAdminPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [authError, setAuthError] = useState('')
  const [authLoading, setAuthLoading] = useState(false)

  // Generation form
  const [url, setUrl] = useState('')
  const [bizOverride, setBizOverride] = useState('')
  const [genLoading, setGenLoading] = useState(false)
  const [genError, setGenError] = useState('')

  // Results
  const [result, setResult] = useState<{ slug: string; previewUrl: string; extractedData: ProspectDemoConfig } | null>(null)

  // Editable config
  const [config, setConfig] = useState<ProspectDemoConfig | null>(null)
  const [saveLoading, setSaveLoading] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')
  const [copied, setCopied] = useState(false)

  // Past demos list
  const [pastDemos, setPastDemos] = useState<ProspectDemoConfig[]>([])

  const fetchPastDemos = useCallback(async (pw: string) => {
    try {
      const res = await fetch('/api/prospect-demo', {
        headers: { Authorization: `Bearer ${pw}` },
      })
      if (res.ok) {
        const json = await res.json()
        setPastDemos(json.demos ?? [])
      }
    } catch { /* ignore */ }
  }, [])

  useEffect(() => {
    const saved = sessionStorage.getItem('admin-pw')
    if (saved) {
      setAuthed(true)
      fetchPastDemos(saved)
    }
  }, [fetchPastDemos])

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
      if (!res.ok) { setAuthError('Incorrect password.'); return }
      sessionStorage.setItem('admin-pw', password)
      setAuthed(true)
      fetchPastDemos(password)
    } catch { setAuthError('Something went wrong. Try again.') }
    finally { setAuthLoading(false) }
  }

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    setGenError('')
    setResult(null)
    setConfig(null)
    setGenLoading(true)
    try {
      const pw = sessionStorage.getItem('admin-pw') || ''
      const res = await fetch('/api/prospect-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${pw}` },
        body: JSON.stringify({ url, businessName: bizOverride || undefined }),
      })
      const json = await res.json()
      if (!res.ok) { setGenError(json.error || 'Failed to generate demo'); return }
      setResult(json)
      setConfig(json.extractedData)
      fetchPastDemos(pw)
    } catch { setGenError('Something went wrong. Try again.') }
    finally { setGenLoading(false) }
  }

  async function handleSave() {
    if (!config) return
    setSaveLoading(true)
    setSaveMsg('')
    try {
      const pw = sessionStorage.getItem('admin-pw') || ''
      const res = await fetch('/api/prospect-demo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${pw}` },
        body: JSON.stringify(config),
      })
      if (res.ok) {
        setSaveMsg('Saved!')
        fetchPastDemos(pw)
        setTimeout(() => setSaveMsg(''), 3000)
      } else {
        setSaveMsg('Save failed.')
      }
    } catch { setSaveMsg('Save failed.') }
    finally { setSaveLoading(false) }
  }

  function handleCopy(url: string) {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function updateSvc(i: number, field: 'name' | 'description' | 'price', val: string) {
    if (!config) return
    const services = [...config.services]
    services[i] = { ...services[i], [field]: val }
    setConfig({ ...config, services })
  }

  function addSvc() {
    if (!config) return
    setConfig({ ...config, services: [...config.services, { name: '', description: '', price: '' }] })
  }

  function removeSvc(i: number) {
    if (!config) return
    setConfig({ ...config, services: config.services.filter((_, idx) => idx !== i) })
  }

  // ── Password gate ──────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div style={S.page}>
        <div style={S.loginCard}>
          <h1 style={S.loginTitle}>Admin — Prospect Demo</h1>
          <p style={S.loginSub}>Caliber Web Studio</p>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={S.input} />
            {authError && <p style={S.error}>{authError}</p>}
            <button type="submit" disabled={authLoading} style={S.btnPrimary}>
              {authLoading ? 'Checking…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  const previewUrl = result?.previewUrl || (config ? `/demo/${config.slug}` : '')

  // ── Dashboard ──────────────────────────────────────────────────────────────
  return (
    <div style={S.page}>
      <div style={S.container}>

        {/* Header */}
        <div style={S.header}>
          <div>
            <h1 style={S.title}>Prospect Demo Generator</h1>
            <p style={S.sub}>Paste a prospect URL → scrape → generate demo → share link</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <a href="/admin/onboarding" style={{ ...S.btnGhost, textDecoration: 'none', display: 'inline-block' }}>Onboarding</a>
            <button onClick={() => { sessionStorage.removeItem('admin-pw'); setAuthed(false) }} style={S.btnGhost}>
              Sign out
            </button>
          </div>
        </div>

        {/* Generate form */}
        <div style={S.card}>
          <h2 style={S.cardTitle}>Generate Prospect Demo</h2>
          <form onSubmit={handleGenerate}>
            <Field label="Prospect's Website URL">
              <input
                type="url"
                placeholder="https://theirbusiness.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                style={S.input}
              />
            </Field>
            <Field label="Business Name (optional — auto-detected)">
              <input
                type="text"
                placeholder="Auto-detected from their site"
                value={bizOverride}
                onChange={(e) => setBizOverride(e.target.value)}
                style={S.input}
              />
            </Field>
            <button type="submit" disabled={genLoading} style={S.btnAccent}>
              {genLoading ? 'Scraping & generating…' : '⚡ Generate Demo'}
            </button>
          </form>
          {genError && <p style={S.error}>{genError}</p>}

          {result && (
            <div style={S.successBox}>
              <p style={S.successLabel}>Demo generated — {result.extractedData.businessName}</p>
              <div style={S.urlRow}>
                <code style={S.urlCode}>{result.previewUrl}</code>
                <button onClick={() => handleCopy(result.previewUrl)} style={S.btnCopy}>
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <a href={`/demo/${result.slug}`} target="_blank" rel="noopener noreferrer" style={{ ...S.btnPrimary, textDecoration: 'none', display: 'inline-block' }}>
                  Preview →
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Edit extracted data */}
        {config && (
          <div style={S.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ ...S.cardTitle, margin: 0 }}>Edit Extracted Data</h2>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                {saveMsg && <span style={{ fontSize: '0.8rem', color: saveMsg === 'Saved!' ? '#4ade80' : '#fca5a5' }}>{saveMsg}</span>}
                {previewUrl && (
                  <a href={previewUrl} target="_blank" rel="noopener noreferrer" style={{ ...S.btnGhost, textDecoration: 'none', display: 'inline-block' }}>
                    Preview
                  </a>
                )}
                <button onClick={handleSave} disabled={saveLoading} style={S.btnPrimary}>
                  {saveLoading ? 'Saving…' : 'Save Changes'}
                </button>
              </div>
            </div>

            {/* Basic info */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
              <Field label="Business Name">
                <input style={S.input} value={config.businessName} onChange={(e) => setConfig({ ...config, businessName: e.target.value })} />
              </Field>
              <Field label="Business Type">
                <input style={S.input} value={config.businessType} onChange={(e) => setConfig({ ...config, businessType: e.target.value })} />
              </Field>
              <Field label="Phone">
                <input style={S.input} value={config.phone} onChange={(e) => setConfig({ ...config, phone: e.target.value })} />
              </Field>
              <Field label="Email">
                <input style={S.input} value={config.email || ''} onChange={(e) => setConfig({ ...config, email: e.target.value })} />
              </Field>
              <Field label="Address">
                <input style={S.input} value={config.address} onChange={(e) => setConfig({ ...config, address: e.target.value })} />
              </Field>
              <Field label="City">
                <input style={S.input} value={config.city} onChange={(e) => setConfig({ ...config, city: e.target.value })} />
              </Field>
            </div>

            <Field label="Tagline">
              <input style={S.input} value={config.tagline} onChange={(e) => setConfig({ ...config, tagline: e.target.value })} />
            </Field>

            <Field label="About / Description">
              <textarea style={S.textarea} value={config.about} onChange={(e) => setConfig({ ...config, about: e.target.value })} rows={4} />
            </Field>

            <Field label="Announce Bar">
              <input style={S.input} value={config.announceBar || ''} onChange={(e) => setConfig({ ...config, announceBar: e.target.value })} />
            </Field>

            <div style={S.divider} />

            {/* Services */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <label style={S.label}>Services ({config.services.length})</label>
                <button onClick={addSvc} style={{ ...S.btnGhost, fontSize: '0.75rem', padding: '4px 12px' }}>+ Add</button>
              </div>
              {config.services.map((svc, i) => (
                <div key={i} style={{ ...S.svcRow, marginBottom: 12 }}>
                  <div style={{ flex: '1 1 160px' }}>
                    <label style={{ ...S.label, marginBottom: 2 }}>Name</label>
                    <input style={{ ...S.input, marginBottom: 0 }} value={svc.name} onChange={(e) => updateSvc(i, 'name', e.target.value)} placeholder="Service name" />
                  </div>
                  <div style={{ flex: '2 1 220px' }}>
                    <label style={{ ...S.label, marginBottom: 2 }}>Description</label>
                    <input style={{ ...S.input, marginBottom: 0 }} value={svc.description} onChange={(e) => updateSvc(i, 'description', e.target.value)} placeholder="Description" />
                  </div>
                  <div style={{ flex: '0 0 90px' }}>
                    <label style={{ ...S.label, marginBottom: 2 }}>Price</label>
                    <input style={{ ...S.input, marginBottom: 0 }} value={svc.price || ''} onChange={(e) => updateSvc(i, 'price', e.target.value)} placeholder="$00" />
                  </div>
                  <button onClick={() => removeSvc(i)} style={{ ...S.btnGhost, padding: '6px 10px', fontSize: '0.75rem', alignSelf: 'flex-end', marginBottom: 0 }}>✕</button>
                </div>
              ))}
            </div>

            <div style={S.divider} />

            {/* Visual fields */}
            <Field label="Hero Image URL">
              <input style={S.input} value={config.heroImg} onChange={(e) => setConfig({ ...config, heroImg: e.target.value })} placeholder="https://..." />
            </Field>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
              <Field label="Primary Color">
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input type="color" value={config.primaryColor} onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })} style={{ width: 40, height: 36, border: 'none', background: 'none', cursor: 'pointer', padding: 0 }} />
                  <input style={{ ...S.input, marginBottom: 0, flex: 1 }} value={config.primaryColor} onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })} />
                </div>
              </Field>
              <Field label="Accent Color">
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input type="color" value={config.accentColor} onChange={(e) => setConfig({ ...config, accentColor: e.target.value })} style={{ width: 40, height: 36, border: 'none', background: 'none', cursor: 'pointer', padding: 0 }} />
                  <input style={{ ...S.input, marginBottom: 0, flex: 1 }} value={config.accentColor} onChange={(e) => setConfig({ ...config, accentColor: e.target.value })} />
                </div>
              </Field>
            </div>

            <div style={S.divider} />

            {/* Demo link */}
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <div>
                <div style={{ ...S.label, marginBottom: 4 }}>Demo URL</div>
                <code style={{ fontSize: '0.85rem', color: '#60a5fa' }}>{typeof window !== 'undefined' ? `${window.location.origin}/demo/${config.slug}` : `/demo/${config.slug}`}</code>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => handleCopy(typeof window !== 'undefined' ? `${window.location.origin}/demo/${config.slug}` : `/demo/${config.slug}`)} style={S.btnCopy}>
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
                <a href={`/demo/${config.slug}`} target="_blank" rel="noopener noreferrer" style={{ ...S.btnAccent, textDecoration: 'none', display: 'inline-block' }}>
                  Open Preview →
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Past demos */}
        {pastDemos.length > 0 && (
          <div style={S.card}>
            <h2 style={S.cardTitle}>Previously Generated Demos ({pastDemos.length})</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={S.table}>
                <thead>
                  <tr>
                    <th style={S.th}>Business</th>
                    <th style={S.th}>URL Scraped</th>
                    <th style={S.th}>Slug</th>
                    <th style={S.th}>Created</th>
                    <th style={S.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[...pastDemos].reverse().map((d) => (
                    <tr key={d.slug}>
                      <td style={S.td}>{d.businessName}</td>
                      <td style={{ ...S.td, ...S.dim, maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <a href={d.website} target="_blank" rel="noopener noreferrer" style={{ color: '#888', textDecoration: 'none', fontSize: '0.8rem' }}>
                          {d.website?.replace(/^https?:\/\//, '')}
                        </a>
                      </td>
                      <td style={S.td}>
                        <code style={{ fontSize: '0.78rem', color: '#888' }}>{d.slug}</code>
                      </td>
                      <td style={{ ...S.td, ...S.dim }}>
                        {new Date(d.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td style={S.td}>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <a href={`/demo/${d.slug}`} target="_blank" rel="noopener noreferrer" style={{ ...S.btnGhost, textDecoration: 'none', display: 'inline-block', fontSize: '0.75rem', padding: '4px 10px' }}>
                            View
                          </a>
                          <button
                            onClick={() => { setConfig(d); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                            style={{ ...S.btnGhost, fontSize: '0.75rem', padding: '4px 10px' }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleCopy(typeof window !== 'undefined' ? `${window.location.origin}/demo/${d.slug}` : `/demo/${d.slug}`)}
                            style={{ ...S.btnGhost, fontSize: '0.75rem', padding: '4px 10px' }}
                          >
                            Copy
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
