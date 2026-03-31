import type { ReactNode } from 'react'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import ThemeToggle from '@/components/onboarding/ThemeToggle'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Client Onboarding — Caliber Web Studio',
  description: 'Tell us about your business so we can build something great.',
}

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  return (
    <div
      id="ob-root"
      data-onboarding-theme="dark"
      suppressHydrationWarning
      className={inter.className}
      style={{
        minHeight: '100dvh',
        backgroundColor: 'var(--ob-bg)',
        color: 'var(--ob-text)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Theme variables */}
      <style>{`
        [data-onboarding-theme="dark"] {
          --ob-bg: #0A0A0A;
          --ob-card: #141414;
          --ob-input-bg: #1A1A1A;
          --ob-input-text: #FFFFFF;
          --ob-border: rgba(255,255,255,0.06);
          --ob-border-strong: rgba(255,255,255,0.1);
          --ob-text: #FFFFFF;
          --ob-text-secondary: rgba(255,255,255,0.6);
          --ob-text-dim: rgba(255,255,255,0.4);
          --ob-text-faint: rgba(255,255,255,0.2);
          --ob-label: #6B6B6B;
          --ob-surface: rgba(255,255,255,0.04);
          --ob-surface-hover: rgba(255,255,255,0.08);
          --ob-dot-inactive: rgba(255,255,255,0.12);
          --ob-progress-track: rgba(255,255,255,0.06);
          --ob-select-bg: #1A1A1A;
          --ob-navy: #1E3D8F;
          --ob-btn-primary-bg: #1E3D8F;
          --ob-btn-primary-text: #FFFFFF;
          --ob-btn-back-border: rgba(255,255,255,0.1);
          --ob-btn-back-text: rgba(255,255,255,0.6);
          --ob-note-bg: rgba(30,61,143,0.08);
          --ob-note-border: rgba(30,61,143,0.2);
        }

        /* Light mode — page-level tokens (header, progress bar, text below card) */
        [data-onboarding-theme="light"] {
          --ob-bg: #F8F9FA;
          --ob-card: #FFFFFF;
          --ob-main-card-bg: #FFFFFF;
          --ob-input-bg: #FFFFFF;
          --ob-input-text: #111111;
          --ob-border: rgba(0,0,0,0.08);
          --ob-border-strong: rgba(0,0,0,0.15);
          --ob-text: #111111;
          --ob-text-secondary: #333333;
          --ob-text-dim: #555555;
          --ob-text-faint: #888888;
          --ob-label: #4A5568;
          --ob-surface: rgba(0,0,0,0.04);
          --ob-surface-hover: rgba(0,0,0,0.08);
          --ob-dot-inactive: rgba(0,0,0,0.15);
          --ob-progress-track: #E5E7EB;
          --ob-select-bg: #FFFFFF;
          --ob-navy: #1E3D8F;
          --ob-btn-primary-bg: #1E3D8F;
          --ob-btn-primary-text: #FFFFFF;
          --ob-btn-back-border: rgba(0,0,0,0.18);
          --ob-btn-back-text: #555555;
          --ob-note-bg: rgba(30,61,143,0.06);
          --ob-note-border: rgba(30,61,143,0.18);
        }

        /* Light mode — inside the blue form card (overrides page-level tokens) */
        [data-onboarding-theme="light"] .ob-main-card {
          --ob-main-card-bg: #1E3D8F;
          --ob-card: rgba(255,255,255,0.11);
          --ob-input-bg: #FFFFFF;
          --ob-input-text: #111111;
          --ob-border: rgba(255,255,255,0.15);
          --ob-border-strong: rgba(255,255,255,0.28);
          --ob-text: #FFFFFF;
          --ob-text-secondary: rgba(255,255,255,0.9);
          --ob-text-dim: rgba(255,255,255,0.75);
          --ob-text-faint: rgba(255,255,255,0.55);
          --ob-label: rgba(255,255,255,0.8);
          --ob-surface: rgba(255,255,255,0.08);
          --ob-surface-hover: rgba(255,255,255,0.16);
          --ob-dot-inactive: rgba(255,255,255,0.25);
          --ob-select-bg: #FFFFFF;
          --ob-btn-primary-bg: #FFFFFF;
          --ob-btn-primary-text: #1E3D8F;
          --ob-btn-back-border: rgba(255,255,255,0.45);
          --ob-btn-back-text: rgba(255,255,255,0.88);
          --ob-note-bg: rgba(255,255,255,0.1);
          --ob-note-border: rgba(255,255,255,0.22);
        }

        [data-onboarding-theme="light"] ::placeholder { color: rgba(0,0,0,0.3) !important; }
        [data-onboarding-theme="light"] .ob-main-card ::placeholder { color: rgba(0,0,0,0.32) !important; }
        [data-onboarding-theme="dark"] ::placeholder { color: rgba(255,255,255,0.2) !important; }
        [data-onboarding-theme="light"] select option { background: #FFFFFF; color: #111; }
        [data-onboarding-theme="dark"] select option { background: #1A1A1A; color: #fff; }
        [data-onboarding-theme="light"] .ob-main-card select option { background: #FFFFFF; color: #111; }
      `}</style>

      {/* Restore theme from localStorage before first paint */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){try{var t=localStorage.getItem('ob-theme');if(t==='light'||t==='dark'){var el=document.getElementById('ob-root');if(el)el.setAttribute('data-onboarding-theme',t);}}catch(e){}})()`,
        }}
      />

      {/* Top bar */}
      <header
        style={{
          padding: '16px 24px',
          borderBottom: '1px solid var(--ob-border)',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Image
            src="/logo-mark-nav.png"
            alt="Caliber Web Studio"
            width={32}
            height={32}
            style={{ borderRadius: '6px' }}
          />
          <span
            style={{
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: 'var(--ob-text)',
              textTransform: 'uppercase',
              opacity: 0.85,
            }}
          >
            Caliber Web Studio
          </span>
        </div>
        <ThemeToggle />
      </header>

      {/* Page content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </main>
    </div>
  )
}
