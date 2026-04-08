'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

/* ─── Style tokens ─── */
const NAVY = '#1E3D8F';
const BLUE = '#2563eb';
const BG = '#0a0a0e';
const BG2 = '#111116';
const BORDER = 'rgba(255,255,255,0.08)';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'verifying' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  /* ─── Handle magic link token from URL ─── */
  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      setStatus('verifying');
      fetch(`/api/portal/auth?token=${encodeURIComponent(token)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.slug) {
            router.push(`/client/${data.slug}`);
          } else {
            setStatus('error');
            setErrorMsg(data.error || 'Invalid or expired link. Please request a new one.');
          }
        })
        .catch(() => {
          setStatus('error');
          setErrorMsg('Something went wrong. Please try again.');
        });
    }
  }, [searchParams, router]);

  /* ─── Send magic link ─── */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/portal/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus('sent');
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Failed to send login link.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  }

  /* ─── Verifying state (magic link clicked) ─── */
  if (status === 'verifying') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <div style={{
          width: '48px', height: '48px', border: '3px solid rgba(255,255,255,0.1)',
          borderTop: `3px solid ${BLUE}`, borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }} />
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: 'rgba(255,255,255,0.6)' }}>
          Verifying your login link...
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  /* ─── Success state (email sent) ─── */
  if (status === 'sent') {
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '64px', height: '64px', borderRadius: '50%',
          background: 'rgba(37,99,235,0.1)', border: `1px solid rgba(37,99,235,0.3)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px',
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 2L11 13" /><path d="M22 2L15 22L11 13L2 9L22 2Z" />
          </svg>
        </div>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '24px', fontWeight: 800, color: '#ffffff', marginBottom: '12px' }}>
          Check your email
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, maxWidth: '360px', margin: '0 auto 24px' }}>
          We sent a login link to <strong style={{ color: 'rgba(255,255,255,0.8)' }}>{email}</strong>. Click the link in the email to access your dashboard.
        </p>
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>
          Link expires in 15 minutes
        </p>
        <button
          onClick={() => { setStatus('idle'); setEmail(''); }}
          style={{
            marginTop: '24px', background: 'none', border: 'none',
            color: BLUE, fontFamily: "'Inter', sans-serif", fontSize: '14px',
            cursor: 'pointer', textDecoration: 'underline',
          }}
        >
          Use a different email
        </button>
      </div>
    );
  }

  /* ─── Login form ─── */
  return (
    <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
      <h1 style={{
        fontFamily: "'Syne', sans-serif", fontSize: 'clamp(28px, 4vw, 36px)',
        fontWeight: 800, color: '#ffffff', marginBottom: '8px', letterSpacing: '-0.03em',
      }}>
        Client Portal
      </h1>
      <p style={{
        fontFamily: "'Inter', sans-serif", fontSize: '15px',
        color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, marginBottom: '32px',
      }}>
        Sign in to view your website performance, leads, and growth metrics.
      </p>

      <label style={{
        display: 'block', fontFamily: "'Space Mono', monospace", fontSize: '10px',
        letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
        marginBottom: '8px',
      }}>
        Email Address
      </label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@yourbusiness.com"
        required
        style={{
          width: '100%', padding: '14px 16px', background: BG2,
          border: `1px solid ${BORDER}`, borderRadius: '8px', color: '#ffffff',
          fontFamily: "'Inter', sans-serif", fontSize: '15px', outline: 'none',
          transition: 'border-color 0.2s',
          boxSizing: 'border-box',
        }}
        onFocus={(e) => (e.target.style.borderColor = 'rgba(37,99,235,0.5)')}
        onBlur={(e) => (e.target.style.borderColor = BORDER)}
      />

      {status === 'error' && (
        <p style={{
          marginTop: '12px', padding: '10px 14px', background: 'rgba(239,68,68,0.08)',
          border: '1px solid rgba(239,68,68,0.2)', borderRadius: '6px',
          fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#f87171',
        }}>
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        style={{
          width: '100%', marginTop: '20px', padding: '14px',
          background: status === 'sending' ? 'rgba(37,99,235,0.5)' : BLUE,
          border: 'none', borderRadius: '8px', color: '#ffffff',
          fontFamily: "'Syne', sans-serif", fontSize: '15px', fontWeight: 700,
          cursor: status === 'sending' ? 'not-allowed' : 'pointer',
          transition: 'background 0.2s, transform 0.1s',
        }}
        onMouseDown={(e) => { if (status !== 'sending') (e.currentTarget.style.transform = 'scale(0.98)'); }}
        onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        {status === 'sending' ? 'Sending...' : 'Send Login Link'}
      </button>

      <p style={{
        marginTop: '24px', textAlign: 'center',
        fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.3)',
      }}>
        Not a client yet?{' '}
        <a href="/pricing" style={{ color: BLUE, textDecoration: 'none' }}>
          View our plans
        </a>
      </p>
    </form>
  );
}

export default function ClientLoginPage() {
  return (
    <div style={{
      minHeight: '100vh', background: BG,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '40px 20px',
    }}>
      {/* Logo */}
      <div style={{ marginBottom: '48px', textAlign: 'center' }}>
        <div style={{
          fontFamily: "'Syne', sans-serif", fontSize: '18px', fontWeight: 800,
          color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '4px',
        }}>
          CALIBER
        </div>
        <div style={{
          fontFamily: "'Space Mono', monospace", fontSize: '9px',
          letterSpacing: '0.2em', textTransform: 'uppercase', color: NAVY,
        }}>
          Web Studio
        </div>
      </div>

      {/* Card */}
      <div style={{
        width: '100%', maxWidth: '480px', padding: 'clamp(32px, 5vw, 48px)',
        background: 'rgba(255,255,255,0.02)', border: `1px solid ${BORDER}`,
        borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        <Suspense fallback={
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Inter', sans-serif" }}>Loading...</p>
          </div>
        }>
          <LoginForm />
        </Suspense>
      </div>

      {/* Footer */}
      <p style={{
        marginTop: '32px', fontFamily: "'Space Mono', monospace",
        fontSize: '10px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.2)',
      }}>
        Powered by{' '}
        <a href="https://caliberwebstudio.com" style={{ color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>
          Caliber Web Studio
        </a>
      </p>
    </div>
  );
}
