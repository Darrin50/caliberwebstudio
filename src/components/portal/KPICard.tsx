'use client';

interface KPICardProps {
  label: string;
  value: string | number;
  change: number;
  changeLabel: string;
  trend: 'up' | 'down' | 'flat';
  icon: string;
}

function TrendingUpIcon() {
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
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 17" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

function TrendingDownIcon() {
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
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
      <polyline points="17 18 23 18 23 12" />
    </svg>
  );
}

function ActivityIcon() {
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
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
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
      <polygon points="12 2 15.09 10.26 24 10.27 17.18 16.7 20.27 24.97 12 18.54 3.73 24.97 6.82 16.7 0 10.27 8.91 10.26" />
    </svg>
  );
}

function getIcon(iconType: string) {
  switch (iconType) {
    case 'TrendingUp':
      return <TrendingUpIcon />;
    case 'TrendingDown':
      return <TrendingDownIcon />;
    case 'Activity':
      return <ActivityIcon />;
    case 'Users':
      return <UsersIcon />;
    case 'Star':
      return <StarIcon />;
    default:
      return null;
  }
}

export default function KPICard({
  label,
  value,
  change,
  changeLabel,
  trend,
  icon,
}: KPICardProps) {
  const trendColor =
    trend === 'up' ? '#10B981' : trend === 'down' ? '#EF4444' : '#6B7280';
  const trendArrow = trend === 'up' ? '↑' : trend === 'down' ? '↓' : '—';

  return (
    <div
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '12px',
        padding: '24px',
        borderTop: '3px solid #2563eb',
        transition: 'all 0.3s ease',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = '0 8px 32px rgba(37, 99, 235, 0.15)';
        el.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = 'none';
        el.style.transform = 'translateY(0)';
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '16px',
        }}
      >
        <span
          style={{
            fontSize: '13px',
            fontWeight: 500,
            color: '#9CA3AF',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          {label}
        </span>
        <div style={{ color: '#6B7280' }}>
          {getIcon(icon)}
        </div>
      </div>

      <div style={{ marginBottom: '12px' }}>
        <div
          style={{
            fontSize: '28px',
            fontWeight: 700,
            color: '#FFFFFF',
            fontFamily: 'Syne, sans-serif',
            lineHeight: '1.2',
          }}
        >
          {value}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '12px',
          color: trendColor,
          fontWeight: 500,
        }}
      >
        <span>{trendArrow}</span>
        <span>
          {Math.abs(change)}% {changeLabel}
        </span>
      </div>
    </div>
  );
}
