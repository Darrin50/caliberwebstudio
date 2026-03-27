'use client';

import { useState, useCallback } from 'react';

const PASSWORD = 'caliber2024';

const INDUSTRIES = [
  { value: 'automotive', label: '🚗 Automotive / Auto Glass' },
  { value: 'barbershop', label: '✂️ Barbershop' },
  { value: 'plumbing',   label: '🔧 Plumbing' },
  { value: 'salon',      label: '💅 Hair Salon' },
  { value: 'restaurant', label: '🍽️ Restaurant / Food' },
  { value: 'retail',     label: '🛍️ Retail Shop' },
  { value: 'dental',     label: '🦷 Dental Office' },
];

export default function DemoGeneratorPage() {
  const [pw, setPw]             = useState('');
  const [authed, setAuthed]     = useState(false);
  const [pwError, setPwError]   = useState(false);

  const [company, setCompany]   = useState('');
  const [color, setColor]       = useState('#1a56db');
  const [industry, setIndustry] = useState('automotive');
  const [logo, setLogo]         = useState('');
  const [copied, setCopied]     = useState(false);

  /* ── Auth ── */
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === PASSWORD) {
      setAuthed(true);
      setPwError(false);
    } else {
      setPwError(true);
    }
  };

  /* ── URL builder ── */
  const buildUrl = useCallback(() => {
    if (!company.trim()) return '';
    const base = typeof window !== 'undefined' ? window.location.origin : 'https://caliberwebstudio.com';
    const params = new URLSearchParams();
    params.set('company', company.trim());
    params.set('color', color);
    params.set('industry', industry);
    if (logo.trim()) params.set('logo', logo.trim());
    return `${base}/preview?${params.toString()}`;
  }, [company, color, industry, logo]);

  const previewUrl = buildUrl();

  const handleCopy = async () => {
    if (!previewUrl) return;
    await navigator.clipboard.writeText(previewUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  /* ── Styles ── */
  const s: Record<string, React.CSSProperties> = {
    page: {
      minHeight: '100vh',
      background: '#0a0a0a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Inter', system-ui, sans-serif",
      padding: '40px 20px',
    },
    card: {
      background: '#111',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 14,
      padding: '44px 48px',
      width: '100%',
      maxWidth: 560,
    },
    logoRow: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 32,
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: color,
      display: 'inline-block',
      marginRight: 4,
    },
    brandName: {
      fontSize: 14,
      fontWeight: 700,
      color: '#fff',
      letterSpacing: 0.5,
    },
    title: {
      fontSize: 26,
      fontWeight: 800,
      color: '#fff',
      marginBottom: 6,
      letterSpacing: '-0.5px',
    },
    subtitle: {
      fontSize: 14,
      color: '#888',
      marginBottom: 32,
      lineHeight: 1.6,
    },
    label: {
      display: 'block',
      fontSize: 12,
      fontWeight: 700,
      color: '#aaa',
      letterSpacing: '1.2px',
      textTransform: 'uppercase' as const,
      marginBottom: 8,
    },
    input: {
      width: '100%',
      background: '#1a1a1a',
      border: '1px solid rgba(255,255,255,0.12)',
      borderRadius: 7,
      color: '#fff',
      fontSize: 15,
      padding: '12px 14px',
      outline: 'none',
      marginBottom: 22,
      fontFamily: 'inherit',
    },
    select: {
      width: '100%',
      background: '#1a1a1a',
      border: '1px solid rgba(255,255,255,0.12)',
      borderRadius: 7,
      color: '#fff',
      fontSize: 15,
      padding: '12px 14px',
      outline: 'none',
      marginBottom: 22,
      fontFamily: 'inherit',
      cursor: 'pointer',
    },
    colorRow: {
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      marginBottom: 22,
    },
    colorInput: {
      width: 48,
      height: 42,
      border: '1px solid rgba(255,255,255,0.15)',
      borderRadius: 7,
      padding: 3,
      background: '#1a1a1a',
      cursor: 'pointer',
    },
    colorHex: {
      flex: 1,
      background: '#1a1a1a',
      border: '1px solid rgba(255,255,255,0.12)',
      borderRadius: 7,
      color: '#fff',
      fontSize: 15,
      padding: '12px 14px',
      outline: 'none',
      fontFamily: 'monospace',
    },
    divider: {
      height: 1,
      background: 'rgba(255,255,255,0.07)',
      margin: '28px 0',
    },
    urlBox: {
      background: '#0d0d0d',
      border: `1px solid ${color}44`,
      borderRadius: 8,
      padding: '14px 16px',
      marginBottom: 16,
    },
    urlLabel: {
      fontSize: 11,
      color: '#666',
      fontWeight: 700,
      letterSpacing: '1px',
      textTransform: 'uppercase' as const,
      marginBottom: 6,
    },
    urlText: {
      fontSize: 13,
      color: color,
      fontFamily: 'monospace',
      wordBreak: 'break-all' as const,
      lineHeight: 1.6,
    },
    btnRow: {
      display: 'flex',
      gap: 10,
    },
    btnCopy: {
      flex: 1,
      background: color,
      color: '#fff',
      border: 'none',
      borderRadius: 8,
      padding: '13px 20px',
      fontSize: 14,
      fontWeight: 700,
      cursor: 'pointer',
      fontFamily: 'inherit',
    },
    btnPreview: {
      background: 'transparent',
      color: '#fff',
      border: '1px solid rgba(255,255,255,0.2)',
      borderRadius: 8,
      padding: '13px 20px',
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      fontFamily: 'inherit',
    },
    emptyUrl: {
      fontSize: 13,
      color: '#555',
      fontStyle: 'italic',
    },
    pwInput: {
      width: '100%',
      background: '#1a1a1a',
      border: pwError ? '1px solid #e53e3e' : '1px solid rgba(255,255,255,0.12)',
      borderRadius: 7,
      color: '#fff',
      fontSize: 15,
      padding: '12px 14px',
      outline: 'none',
      marginBottom: 16,
      fontFamily: 'inherit',
    },
    pwBtn: {
      width: '100%',
      background: '#1a56db',
      color: '#fff',
      border: 'none',
      borderRadius: 8,
      padding: '14px',
      fontSize: 15,
      fontWeight: 700,
      cursor: 'pointer',
      fontFamily: 'inherit',
    },
    errorMsg: {
      color: '#fc8181',
      fontSize: 13,
      marginBottom: 16,
    },
  };

  /* ── Login screen ── */
  if (!authed) {
    return (
      <div style={s.page}>
        <div style={s.card}>
          <div style={s.logoRow}>
            <span style={s.dot} />
            <span style={s.brandName}>Caliber Web Studio</span>
          </div>
          <h1 style={s.title}>Internal Tool</h1>
          <p style={s.subtitle}>Enter the password to access the demo generator.</p>
          <form onSubmit={handleLogin}>
            <label style={s.label}>Password</label>
            <input
              type="password"
              value={pw}
              onChange={e => { setPw(e.target.value); setPwError(false); }}
              placeholder="Enter password"
              style={s.pwInput}
              autoFocus
            />
            {pwError && <p style={s.errorMsg}>Incorrect password. Try again.</p>}
            <button type="submit" style={s.pwBtn}>Unlock Tool →</button>
          </form>
        </div>
      </div>
    );
  }

  /* ── Generator ── */
  return (
    <div style={s.page}>
      <div style={s.card}>
        {/* Header */}
        <div style={s.logoRow}>
          <span style={{ ...s.dot, background: color }} />
          <span style={s.brandName}>Caliber Web Studio</span>
          <span style={{ marginLeft: 'auto', fontSize: 11, color: '#555' }}>Internal Tool</span>
        </div>
        <h1 style={s.title}>Demo Generator</h1>
        <p style={s.subtitle}>
          Fill out the form below to generate a personalized demo preview link for your cold outreach.
        </p>

        {/* Company name */}
        <label style={s.label}>Business Name</label>
        <input
          type="text"
          value={company}
          onChange={e => setCompany(e.target.value)}
          placeholder="e.g. Detroit Auto Glass"
          style={s.input}
        />

        {/* Industry */}
        <label style={s.label}>Industry</label>
        <select
          value={industry}
          onChange={e => setIndustry(e.target.value)}
          style={s.select}
        >
          {INDUSTRIES.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        {/* Color */}
        <label style={s.label}>Brand Color</label>
        <div style={s.colorRow}>
          <input
            type="color"
            value={color}
            onChange={e => setColor(e.target.value)}
            style={s.colorInput}
          />
          <input
            type="text"
            value={color}
            onChange={e => setColor(e.target.value)}
            placeholder="#1a56db"
            style={s.colorHex}
          />
        </div>

        {/* Logo URL (optional) */}
        <label style={s.label}>Logo URL <span style={{ color: '#555', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span></label>
        <input
          type="url"
          value={logo}
          onChange={e => setLogo(e.target.value)}
          placeholder="https://..."
          style={s.input}
        />

        <div style={s.divider} />

        {/* Generated URL */}
        <div style={{ marginBottom: 8 }}>
          <div style={s.urlLabel}>Generated Preview URL</div>
          <div style={s.urlBox}>
            {previewUrl
              ? <div style={s.urlText}>{previewUrl}</div>
              : <div style={s.emptyUrl}>Enter a business name to generate the URL</div>
            }
          </div>
        </div>

        {/* Buttons */}
        <div style={s.btnRow}>
          <button
            onClick={handleCopy}
            disabled={!previewUrl}
            style={{ ...s.btnCopy, opacity: previewUrl ? 1 : 0.4, background: color }}
          >
            {copied ? '✓ Copied!' : '📋 Copy Link'}
          </button>
          {previewUrl && (
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={s.btnPreview}
            >
              👁 Preview
            </a>
          )}
        </div>

        {/* Outreach tip */}
        {previewUrl && (
          <div style={{
            marginTop: 24,
            padding: '14px 16px',
            background: '#0d0d0d',
            borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.06)',
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#555', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 8 }}>
              Outreach Message Snippet
            </div>
            <div style={{ fontSize: 13, color: '#aaa', lineHeight: 1.7 }}>
              &ldquo;Hey! I built a quick preview of what {company || 'your business'}&apos;s site could look like — no strings attached.
              Take a look: <span style={{ color: color }}>{previewUrl.split('/preview')[0]}/preview…</span>&rdquo;
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
