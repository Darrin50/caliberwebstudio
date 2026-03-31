import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Client Onboarding — Caliber Web Studio',
  description: 'Tell us about your business so we can build something great.',
};

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={inter.className}
      style={{
        minHeight: '100dvh',
        backgroundColor: '#0A0A0A',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top bar */}
      <header
        style={{
          padding: '20px 24px',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.18em',
            color: '#FFFFFF',
            textTransform: 'uppercase',
          }}
        >
          CALIBER WEB STUDIO
        </span>
      </header>

      {/* Page content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </main>
    </div>
  );
}
