'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { PlanTier } from '@/lib/portal/types';

interface SettingsClientProps {
  slug: string;
  businessName: string;
  email: string;
  phone: string;
  website: string;
  plan: PlanTier;
  googleAnalyticsPropertyId?: string;
  googleSearchConsoleProperty?: string;
  googleBusinessProfileId?: string;
}

const colors = {
  bg: '#0a0a0e',
  blue: '#2563eb',
  navy: '#1E3D8F',
  border: 'rgba(255, 255, 255, 0.08)',
  textPrimary: '#ffffff',
  textSecondary: '#9CA3AF',
  textTertiary: '#6B7280',
  cardBg: 'rgba(255, 255, 255, 0.03)',
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
};

const fontFamilies = {
  heading: 'Syne, sans-serif',
  body: 'Inter, sans-serif',
  mono: '"Space Mono", monospace',
};

export default function SettingsClient({
  slug,
  businessName,
  email,
  phone,
  website,
  plan,
  googleAnalyticsPropertyId,
  googleSearchConsoleProperty,
  googleBusinessProfileId,
}: SettingsClientProps) {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [notifSaved, setNotifSaved] = useState(false);

  const NOTIF_KEY = `caliber-notif-prefs-${slug}`;

  const [notificationPreferences, setNotificationPreferences] = useState(() => {
    const defaults = {
      weeklyReport: true,
      newLeadAlerts: true,
      newReviewAlerts: true,
      rankingChangeAlerts: false,
    };
    if (typeof window === 'undefined') return defaults;
    try {
      const saved = localStorage.getItem(NOTIF_KEY);
      return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
    } catch {
      return defaults;
    }
  });

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      const response = await fetch('/api/portal/auth', {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/client/login');
      }
    } catch (error) {
      console.error('Sign out error:', error);
      setIsSigningOut(false);
    }
  };

  const toggleNotification = (key: keyof typeof notificationPreferences) => {
    setNotificationPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    setNotifSaved(false);
  };

  const saveNotificationPreferences = () => {
    try {
      localStorage.setItem(NOTIF_KEY, JSON.stringify(notificationPreferences));
      setNotifSaved(true);
      setTimeout(() => setNotifSaved(false), 3000);
    } catch {
      // localStorage unavailable
    }
  };

  const isPremiumPlan = plan !== 'starter';

  const planFeatures: Record<PlanTier, string[]> = {
    starter: [
      'Monthly dashboard',
      'Basic traffic analytics',
      'Lead tracking (up to 50/month)',
      'Basic review monitoring',
      'Email support',
    ],
    growth: [
      'Everything in Starter',
      'Advanced traffic analytics',
      'Advanced lead management',
      'Keyword ranking tracking (100 keywords)',
      'Review management & replies',
      'Social media analytics',
      'Priority email support',
    ],
    domination: [
      'Everything in Growth',
      'Advanced keyword rankings (unlimited)',
      'Competitor tracking',
      'Citation management',
      'Weekly reports',
      'AI-powered insights',
      'Dedicated account manager',
      '24/7 priority support',
    ],
  };

  const integrationStatus = [
    {
      name: 'Google Analytics',
      configured: !!googleAnalyticsPropertyId,
      id: googleAnalyticsPropertyId,
    },
    {
      name: 'Google Search Console',
      configured: !!googleSearchConsoleProperty,
      id: googleSearchConsoleProperty,
    },
    {
      name: 'Google Business Profile',
      configured: !!googleBusinessProfileId,
      id: googleBusinessProfileId,
    },
  ];

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', width: '100%' }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1
          style={{
            margin: '0 0 8px 0',
            fontSize: '32px',
            fontWeight: 700,
            color: colors.textPrimary,
            fontFamily: fontFamilies.heading,
          }}
        >
          Settings
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: '14px',
            color: colors.textSecondary,
          }}
        >
          Manage your account, billing, and integrations
        </p>
      </div>

      {/* Account Overview Card */}
      <div
        style={{
          backgroundColor: colors.cardBg,
          border: `1px solid ${colors.border}`,
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px',
        }}
      >
        <h2
          style={{
            margin: '0 0 20px 0',
            fontSize: '18px',
            fontWeight: 600,
            color: colors.textPrimary,
            fontFamily: fontFamilies.heading,
          }}
        >
          Account Overview
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
          }}
        >
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: 600,
                color: colors.textSecondary,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '6px',
                fontFamily: fontFamilies.mono,
              }}
            >
              Business Name
            </label>
            <p
              style={{
                margin: 0,
                fontSize: '14px',
                color: colors.textPrimary,
                fontWeight: 500,
              }}
            >
              {businessName}
            </p>
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: 600,
                color: colors.textSecondary,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '6px',
                fontFamily: fontFamilies.mono,
              }}
            >
              Email Address
            </label>
            <p
              style={{
                margin: 0,
                fontSize: '14px',
                color: colors.textPrimary,
                fontWeight: 500,
              }}
            >
              {email}
            </p>
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: 600,
                color: colors.textSecondary,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '6px',
                fontFamily: fontFamilies.mono,
              }}
            >
              Phone Number
            </label>
            <p
              style={{
                margin: 0,
                fontSize: '14px',
                color: colors.textPrimary,
                fontWeight: 500,
              }}
            >
              {phone}
            </p>
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: 600,
                color: colors.textSecondary,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '6px',
                fontFamily: fontFamilies.mono,
              }}
            >
              Website
            </label>
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '14px',
                color: colors.blue,
                fontWeight: 500,
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLAnchorElement).style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLAnchorElement).style.textDecoration = 'none';
              }}
            >
              {website}
            </a>
          </div>
        </div>
      </div>

      {/* Current Plan Card */}
      <div
        style={{
          backgroundColor: colors.cardBg,
          border: `1px solid ${colors.border}`,
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px',
        }}
      >
        <h2
          style={{
            margin: '0 0 20px 0',
            fontSize: '18px',
            fontWeight: 600,
            color: colors.textPrimary,
            fontFamily: fontFamilies.heading,
          }}
        >
          Current Plan
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px',
            alignItems: 'start',
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '8px',
                marginBottom: '16px',
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: '24px',
                  fontWeight: 700,
                  color: colors.textPrimary,
                  fontFamily: fontFamilies.heading,
                  textTransform: 'capitalize',
                }}
              >
                {plan}
              </h3>
              <span
                style={{
                  fontSize: '12px',
                  padding: '4px 10px',
                  backgroundColor: colors.blue,
                  color: colors.textPrimary,
                  borderRadius: '4px',
                  fontWeight: 600,
                  fontFamily: fontFamilies.mono,
                }}
              >
                Current
              </span>
            </div>

            <div style={{ marginBottom: '16px' }}>
              {plan === 'starter' && (
                <p
                  style={{
                    margin: 0,
                    fontSize: '13px',
                    color: colors.textSecondary,
                  }}
                >
                  $299/month
                </p>
              )}
              {plan === 'growth' && (
                <p
                  style={{
                    margin: 0,
                    fontSize: '13px',
                    color: colors.textSecondary,
                  }}
                >
                  $699/month
                </p>
              )}
              {plan === 'domination' && (
                <p
                  style={{
                    margin: 0,
                    fontSize: '13px',
                    color: colors.textSecondary,
                  }}
                >
                  $1,299/month
                </p>
              )}
            </div>

            {!isPremiumPlan && (
              <a
                href="mailto:darrin@caliberwebstudio.com?subject=Plan%20Upgrade%20Request"
                style={{
                  display: 'inline-block',
                  padding: '10px 16px',
                  backgroundColor: colors.blue,
                  color: colors.textPrimary,
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLAnchorElement).style.backgroundColor = '#1d4ed8';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLAnchorElement).style.backgroundColor = colors.blue;
                }}
              >
                Contact us to upgrade
              </a>
            )}
          </div>

          <div>
            <p
              style={{
                margin: '0 0 12px 0',
                fontSize: '12px',
                fontWeight: 600,
                color: colors.textSecondary,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontFamily: fontFamilies.mono,
              }}
            >
              Included Features
            </p>
            <ul
              style={{
                margin: 0,
                padding: '0',
                listStyle: 'none',
              }}
            >
              {planFeatures[plan].slice(0, 5).map((feature, idx) => (
                <li
                  key={idx}
                  style={{
                    fontSize: '13px',
                    color: colors.textPrimary,
                    padding: '6px 0',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                  }}
                >
                  <span style={{ color: colors.success, fontWeight: 600 }}>✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            {planFeatures[plan].length > 5 && (
              <p
                style={{
                  margin: '8px 0 0 0',
                  fontSize: '12px',
                  color: colors.textSecondary,
                }}
              >
                +{planFeatures[plan].length - 5} more features
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Integrations Card */}
      <div
        style={{
          backgroundColor: colors.cardBg,
          border: `1px solid ${colors.border}`,
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px',
        }}
      >
        <h2
          style={{
            margin: '0 0 20px 0',
            fontSize: '18px',
            fontWeight: 600,
            color: colors.textPrimary,
            fontFamily: fontFamilies.heading,
          }}
        >
          Integrations Status
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {integrationStatus.map((integration, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: `1px solid ${colors.border}`,
                borderRadius: '8px',
              }}
            >
              <div>
                <p
                  style={{
                    margin: '0 0 4px 0',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: colors.textPrimary,
                  }}
                >
                  {integration.name}
                </p>
                {integration.configured ? (
                  <p
                    style={{
                      margin: 0,
                      fontSize: '12px',
                      color: colors.textTertiary,
                    }}
                  >
                    Connected • ID: {integration.id?.slice(0, 12)}...
                  </p>
                ) : (
                  <p
                    style={{
                      margin: 0,
                      fontSize: '12px',
                      color: colors.textTertiary,
                    }}
                  >
                    Not configured
                  </p>
                )}
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                {integration.configured ? (
                  <span
                    style={{
                      fontSize: '18px',
                      color: colors.success,
                    }}
                  >
                    ✓
                  </span>
                ) : (
                  <span
                    style={{
                      fontSize: '18px',
                      color: colors.textTertiary,
                    }}
                  >
                    ✗
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {!integrationStatus.every((i) => i.configured) && (
          <div
            style={{
              marginTop: '16px',
              padding: '12px',
              backgroundColor: 'rgba(59, 130, 246, 0.08)',
              border: `1px solid rgba(59, 130, 246, 0.2)`,
              borderRadius: '8px',
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: '12px',
                color: colors.blue,
              }}
            >
              <a
                href="mailto:darrin@caliberwebstudio.com?subject=Integration%20Setup"
                style={{
                  color: colors.blue,
                  textDecoration: 'none',
                  fontWeight: 600,
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLAnchorElement).style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLAnchorElement).style.textDecoration = 'none';
                }}
              >
                Contact support to connect integrations
              </a>
            </p>
          </div>
        )}
      </div>

      {/* Notification Preferences Card */}
      <div
        style={{
          backgroundColor: colors.cardBg,
          border: `1px solid ${colors.border}`,
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px',
        }}
      >
        <h2
          style={{
            margin: '0 0 20px 0',
            fontSize: '18px',
            fontWeight: 600,
            color: colors.textPrimary,
            fontFamily: fontFamilies.heading,
          }}
        >
          Notification Preferences
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            {
              key: 'weeklyReport',
              label: 'Weekly Email Report',
              description: 'Receive weekly summaries of your analytics',
            },
            {
              key: 'newLeadAlerts',
              label: 'New Lead Alerts',
              description: 'Get notified when new leads come in',
            },
            {
              key: 'newReviewAlerts',
              label: 'New Review Alerts',
              description: 'Get notified when you receive new reviews',
            },
            {
              key: 'rankingChangeAlerts',
              label: 'Ranking Change Alerts',
              description: 'Get notified when keyword rankings change significantly',
            },
          ].map((notification) => (
            <div
              key={notification.key}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: `1px solid ${colors.border}`,
                borderRadius: '8px',
              }}
            >
              <div>
                <p
                  style={{
                    margin: '0 0 4px 0',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: colors.textPrimary,
                  }}
                >
                  {notification.label}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: '12px',
                    color: colors.textTertiary,
                  }}
                >
                  {notification.description}
                </p>
              </div>

              <button
                onClick={() =>
                  toggleNotification(
                    notification.key as keyof typeof notificationPreferences
                  )
                }
                style={{
                  width: '48px',
                  height: '28px',
                  borderRadius: '14px',
                  border: 'none',
                  backgroundColor: notificationPreferences[
                    notification.key as keyof typeof notificationPreferences
                  ]
                    ? colors.blue
                    : 'rgba(255, 255, 255, 0.1)',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  const btn = e.target as HTMLButtonElement;
                  if (
                    notificationPreferences[
                      notification.key as keyof typeof notificationPreferences
                    ]
                  ) {
                    btn.style.backgroundColor = '#1d4ed8';
                  }
                }}
                onMouseLeave={(e) => {
                  const btn = e.target as HTMLButtonElement;
                  if (
                    notificationPreferences[
                      notification.key as keyof typeof notificationPreferences
                    ]
                  ) {
                    btn.style.backgroundColor = colors.blue;
                  }
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    width: '20px',
                    height: '20px',
                    backgroundColor: colors.textPrimary,
                    borderRadius: '10px',
                    top: '4px',
                    transition: 'left 0.2s ease',
                    left: notificationPreferences[
                      notification.key as keyof typeof notificationPreferences
                    ]
                      ? '24px'
                      : '4px',
                  }}
                />
              </button>
            </div>
          ))}
        </div>

        {/* Save notification preferences */}
        <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={saveNotificationPreferences}
            style={{
              padding: '10px 20px',
              backgroundColor: colors.blue,
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: fontFamilies.body,
              transition: 'background 0.2s',
            }}
          >
            Save Preferences
          </button>
          {notifSaved && (
            <span style={{ fontSize: '13px', color: colors.success, fontFamily: fontFamilies.body }}>
              ✓ Preferences saved
            </span>
          )}
        </div>
      </div>

      {/* Support Card */}
      <div
        style={{
          backgroundColor: colors.cardBg,
          border: `1px solid ${colors.border}`,
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px',
        }}
      >
        <h2
          style={{
            margin: '0 0 20px 0',
            fontSize: '18px',
            fontWeight: 600,
            color: colors.textPrimary,
            fontFamily: fontFamilies.heading,
          }}
        >
          Support
        </h2>

        <p
          style={{
            margin: '0 0 16px 0',
            fontSize: '14px',
            color: colors.textSecondary,
          }}
        >
          Need help? Reach out to our support team.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
          }}
        >
          <a
            href="mailto:darrin@caliberwebstudio.com"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: `1px solid ${colors.border}`,
              borderRadius: '8px',
              color: colors.blue,
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 600,
              transition: 'all 0.2s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              const link = e.target as HTMLAnchorElement;
              link.style.backgroundColor = 'rgba(37, 99, 235, 0.1)';
              link.style.borderColor = colors.blue;
            }}
            onMouseLeave={(e) => {
              const link = e.target as HTMLAnchorElement;
              link.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              link.style.borderColor = colors.border;
            }}
          >
            <span>✉</span>
            Email Support
          </a>

          <a
            href="tel:(313)799-2315"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: `1px solid ${colors.border}`,
              borderRadius: '8px',
              color: colors.blue,
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 600,
              transition: 'all 0.2s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              const link = e.target as HTMLAnchorElement;
              link.style.backgroundColor = 'rgba(37, 99, 235, 0.1)';
              link.style.borderColor = colors.blue;
            }}
            onMouseLeave={(e) => {
              const link = e.target as HTMLAnchorElement;
              link.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              link.style.borderColor = colors.border;
            }}
          >
            <span>☎</span>
            (313) 799-2315
          </a>
        </div>
      </div>

      {/* Sign Out Card */}
      <div
        style={{
          backgroundColor: colors.cardBg,
          border: `1px solid ${colors.border}`,
          borderRadius: '12px',
          padding: '24px',
        }}
      >
        <h2
          style={{
            margin: '0 0 20px 0',
            fontSize: '18px',
            fontWeight: 600,
            color: colors.textPrimary,
            fontFamily: fontFamilies.heading,
          }}
        >
          Sign Out
        </h2>

        <p
          style={{
            margin: '0 0 16px 0',
            fontSize: '14px',
            color: colors.textSecondary,
          }}
        >
          You will be signed out of your account and returned to the login page.
        </p>

        <button
          onClick={handleSignOut}
          disabled={isSigningOut}
          style={{
            padding: '12px 24px',
            backgroundColor: colors.error,
            color: colors.textPrimary,
            border: 'none',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: 600,
            cursor: isSigningOut ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            opacity: isSigningOut ? 0.5 : 1,
          }}
          onMouseEnter={(e) => {
            if (!isSigningOut) {
              (e.target as HTMLButtonElement).style.backgroundColor = '#dc2626';
            }
          }}
          onMouseLeave={(e) => {
            if (!isSigningOut) {
              (e.target as HTMLButtonElement).style.backgroundColor = colors.error;
            }
          }}
        >
          {isSigningOut ? 'Signing out...' : 'Sign Out'}
        </button>
      </div>
    </div>
  );
}
