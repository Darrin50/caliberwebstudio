'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

interface PortalNavProps {
  slug: string;
  businessName: string;
  plan: 'starter' | 'growth' | 'domination';
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'home', href: '/client/[slug]' },
  { id: 'traffic', label: 'Traffic', icon: 'trending', href: '/client/[slug]/traffic' },
  { id: 'rankings', label: 'Rankings', icon: 'chart', href: '/client/[slug]/rankings' },
  { id: 'reviews', label: 'Reviews', icon: 'star', href: '/client/[slug]/reviews' },
  { id: 'leads', label: 'Leads', icon: 'users', href: '/client/[slug]/leads' },
  { id: 'settings', label: 'Settings', icon: 'settings', href: '/client/[slug]/settings' },
];

const planColors: Record<string, { bg: string; text: string }> = {
  starter: { bg: 'rgba(107, 114, 128, 0.15)', text: '#9CA3AF' },
  growth: { bg: 'rgba(37, 99, 235, 0.15)', text: '#3B82F6' },
  domination: { bg: 'rgba(217, 119, 6, 0.15)', text: '#F59E0B' },
};

function HomeIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function TrendingIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 10.26 24 10.27 17.18 16.7 20.27 24.97 12 18.54 3.73 24.97 6.82 16.7 0 10.27 8.91 10.26 12 2" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m5.08-5.08l4.24-4.24" />
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function getIcon(iconType: string) {
  switch (iconType) {
    case 'home':
      return <HomeIcon />;
    case 'trending':
      return <TrendingIcon />;
    case 'chart':
      return <ChartIcon />;
    case 'star':
      return <StarIcon />;
    case 'users':
      return <UsersIcon />;
    case 'settings':
      return <SettingsIcon />;
    default:
      return null;
  }
}

export default function PortalNav({
  slug,
  businessName,
  plan,
}: PortalNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await fetch('/api/portal/auth', { method: 'DELETE' });
    } finally {
      router.push('/client/login');
    }
  };

  const planColor = planColors[plan] || planColors.starter;

  return (
    <>
      {/* Mobile Top Bar - visible on screens < 768px */}
      <style>{`
        @media (max-width: 767px) {
          #portal-mobile-bar { display: flex !important; }
          #portal-sidebar { display: none !important; }
          #portal-sidebar.mobile-open { display: flex !important; }
        }
        @media (min-width: 768px) {
          #portal-mobile-bar { display: none !important; }
          #portal-sidebar { display: flex !important; }
        }
      `}</style>

      <div
        id="portal-mobile-bar"
        style={{
          height: '60px',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: '16px',
          paddingRight: '16px',
          backgroundColor: 'var(--bg2)',
          borderBottom: '1px solid var(--border)',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Image
            src="/logo-mark-nav.png"
            alt="Caliber"
            width={28}
            height={28}
            style={{ borderRadius: '4px' }}
          />
          <span
            style={{
              fontSize: '12px',
              fontWeight: 700,
              color: 'var(--text-primary)',
            }}
          >
            Caliber
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {mobileOpen ? <CloseIcon /> : <HamburgerIcon />}
        </button>
      </div>

      {/* Desktop/Mobile Sidebar */}
      <aside
        id="portal-sidebar"
        style={{
          width: '280px',
          backgroundColor: 'var(--bg2)',
          borderRight: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100dvh',
          position: mobileOpen ? 'fixed' : 'relative',
          left: mobileOpen ? 0 : 'auto',
          top: mobileOpen ? 60 : 'auto',
          height: mobileOpen ? 'calc(100dvh - 60px)' : '100dvh',
          zIndex: mobileOpen ? 40 : 'auto',
          boxShadow: mobileOpen ? '0 8px 32px rgba(0, 0, 0, 0.4)' : 'none',
          transition: 'transform 0.3s ease',
        }}
      >
        {/* Header */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid var(--border)' }}>
          <div
            id="sidebar-logo"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px',
            }}
          >
            <Image
              src="/logo-mark-nav.png"
              alt="Caliber"
              width={32}
              height={32}
              style={{ borderRadius: '6px' }}
            />
            <span
              style={{
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.05em',
                color: 'var(--text-primary)',
              }}
            >
              Caliber
            </span>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '4px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {businessName}
            </h3>
          </div>

          <div
            style={{
              display: 'inline-block',
              padding: '6px 10px',
              borderRadius: '6px',
              backgroundColor: planColor.bg,
              color: planColor.text,
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {plan} Plan
          </div>
        </div>

        {/* Navigation Items */}
        <nav style={{ flex: 1, padding: '16px 8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {navItems.map((item) => {
            const resolvedHref = item.href.replace('[slug]', slug);
            const active = item.href === '/client/[slug]'
              ? pathname === `/client/${slug}`
              : pathname === resolvedHref;

            return (
              <Link
                key={item.id}
                href={resolvedHref}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  color: active ? 'var(--accent)' : 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 500,
                  backgroundColor: active ? 'rgba(37, 99, 235, 0.12)' : 'transparent',
                  borderLeft: active ? '2px solid var(--accent)' : '2px solid transparent',
                  paddingLeft: '12px',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                      'rgba(255, 255, 255, 0.05)';
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      'var(--text-primary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                      'transparent';
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      'var(--text-secondary)';
                  }
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {getIcon(item.icon)}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div
          style={{
            padding: '16px',
            borderTop: '1px solid var(--border)',
            marginTop: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {/* Sign out button */}
          <button
            onClick={handleSignOut}
            disabled={signingOut}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 14px',
              background: 'none',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '8px',
              color: 'var(--text-secondary)',
              fontSize: '13px',
              fontWeight: 500,
              cursor: signingOut ? 'not-allowed' : 'pointer',
              opacity: signingOut ? 0.6 : 1,
              transition: 'all 0.2s ease',
              fontFamily: 'inherit',
            }}
            onMouseEnter={(e) => {
              if (!signingOut) {
                (e.currentTarget as HTMLButtonElement).style.color = '#ef4444';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(239,68,68,0.3)';
              }
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.08)';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            {signingOut ? 'Signing out…' : 'Sign out'}
          </button>

          <p
            style={{
              fontSize: '10px',
              color: 'var(--text-secondary)',
              textAlign: 'center',
              margin: 0,
              opacity: 0.6,
            }}
          >
            Powered by{' '}
            <a
              href="https://caliberwebstudio.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--accent)',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              Caliber Web Studio
            </a>
          </p>
        </div>
      </aside>
    </>
  );
}
