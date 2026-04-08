import { Metadata } from 'next';
import Link from 'next/link';
import { getAuthenticatedClient } from '@/lib/portal/auth';
import { getClient } from '@/lib/portal/clients';
import { hasFeature } from '@/lib/portal/types';
import type {
  TrafficDataPoint,
  KPIMetric,
  Lead,
  Review,
  RankingOverTime,
} from '@/lib/portal/types';
import KPICard from '@/components/portal/KPICard';
import { TrafficChart, LeadSourceChart, RankingMiniChart } from '@/components/portal/DashboardCharts';

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface AnalyticsResponse {
  success: boolean;
  data?: {
    configured: boolean;
    period: string;
    dateRange: { startDate: string; endDate: string };
    kpis: KPIMetric[];
    trafficData: TrafficDataPoint[];
    trafficSources: Array<{ source: string; sessions: number; percentage: number }>;
    topPages: Array<{ path: string; pageviews: number; avgTimeOnPage: number; bounceRate: number }>;
    recentLeads: Lead[];
    leadCount: number;
    reviewCount: number;
  };
  error?: string;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const client = getClient(slug);

  return {
    title: `Dashboard | ${client?.businessName || 'Client Portal'} — Caliber Web Studio`,
    description: `Dashboard overview for ${client?.businessName}. Monitor traffic, leads, and reviews.`,
  };
}

async function fetchAnalytics(
  slug: string
): Promise<AnalyticsResponse | null> {
  try {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const token = cookieStore.get('caliber-portal-token')?.value || '';
    const baseUrl =
      process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
    const response = await fetch(
      `${baseUrl}/api/portal/analytics?slug=${slug}&period=30d`,
      {
        headers: {
          Cookie: `caliber-portal-token=${token}`,
        },
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      console.error('Analytics fetch failed:', response.status);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return null;
  }
}

function UpgradePrompt({ feature, plan }: { feature: string; plan: string }) {
  const featureNames: Record<string, string> = {
    advanced_traffic: 'Advanced Traffic Analytics',
    advanced_leads: 'Advanced Lead Management',
    advanced_rankings: 'Advanced Keyword Rankings',
    competitor_tracking: 'Competitor Tracking',
    ai_insights: 'AI-Powered Insights',
  };

  return (
    <div
      style={{
        backgroundColor: 'rgba(37, 99, 235, 0.08)',
        border: '1px solid rgba(37, 99, 235, 0.2)',
        borderRadius: '8px',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
      }}
    >
      <div>
        <p
          style={{
            margin: '0 0 4px 0',
            fontSize: '13px',
            fontWeight: 500,
            color: '#3B82F6',
          }}
        >
          {featureNames[feature] || feature}
        </p>
        <p
          style={{
            margin: 0,
            fontSize: '12px',
            color: '#60A5FA',
          }}
        >
          Available on higher plans. Upgrade to unlock.
        </p>
      </div>
    </div>
  );
}

export default async function DashboardPage({ params }: PageProps) {
  const { slug } = await params;

  // Verify authentication
  const authenticatedClient = await getAuthenticatedClient();
  if (!authenticatedClient || authenticatedClient.slug !== slug) {
    return null;
  }

  const client = getClient(slug);
  if (!client) {
    return null;
  }

  // Fetch analytics data
  const analyticsData = await fetchAnalytics(slug);

  const kpis: KPIMetric[] = analyticsData?.data?.kpis || [];
  const trafficData: TrafficDataPoint[] = analyticsData?.data?.trafficData || [];
  const trafficSources = analyticsData?.data?.trafficSources || [];
  const topPages = analyticsData?.data?.topPages || [];
  const recentLeads: Lead[] = analyticsData?.data?.recentLeads || [];
  const leadCount = analyticsData?.data?.leadCount || 0;
  const reviewCount = analyticsData?.data?.reviewCount || 0;
  const configured = analyticsData?.data?.configured || false;

  // Prepare lead source data for chart
  const leadSourceData = [
    { name: 'Contact Form', value: trafficSources.find((s) => s.source === 'contact_form')?.sessions || 0 },
    { name: 'Chatbot', value: trafficSources.find((s) => s.source === 'chatbot')?.sessions || 0 },
    { name: 'Phone', value: trafficSources.find((s) => s.source === 'phone')?.sessions || 0 },
    { name: 'Email', value: trafficSources.find((s) => s.source === 'email')?.sessions || 0 },
  ];

  // Prepare ranking data for chart (empty until rankings API provides data)
  const rankingData: RankingOverTime[] = [];

  return (
    <div style={{ padding: '32px', maxWidth: '1600px', width: '100%' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1
          style={{
            margin: '0 0 8px 0',
            fontSize: '32px',
            fontWeight: 700,
            color: '#FFFFFF',
            fontFamily: 'Syne, sans-serif',
          }}
        >
          Dashboard
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: '14px',
            color: '#9CA3AF',
          }}
        >
          Welcome back, {client.ownerName}
        </p>
      </div>

      {/* Configuration Warning */}
      {!configured && (
        <div
          style={{
            backgroundColor: 'rgba(217, 119, 6, 0.08)',
            border: '1px solid rgba(217, 119, 6, 0.2)',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div style={{ color: '#F59E0B' }}>
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
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <div>
            <p
              style={{
                margin: '0 0 4px 0',
                fontSize: '13px',
                fontWeight: 500,
                color: '#F59E0B',
              }}
            >
              Analytics Not Configured
            </p>
            <p
              style={{
                margin: 0,
                fontSize: '12px',
                color: '#D97706',
              }}
            >
              Connect your Google Analytics and Google Business Profile in settings to see real data.
            </p>
          </div>
        </div>
      )}

      {/* KPI Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        {kpis.length > 0 ? (
          kpis.map((kpi) => (
            <KPICard
              key={kpi.label}
              label={kpi.label}
              value={kpi.value}
              change={kpi.change}
              changeLabel={kpi.changeLabel}
              trend={kpi.trend}
              icon={kpi.icon}
            />
          ))
        ) : (
          <div
            style={{
              gridColumn: '1 / -1',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              padding: '24px',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: '14px',
                color: '#6B7280',
              }}
            >
              No data available yet. {!configured && 'Configure analytics to get started.'}
            </p>
          </div>
        )}
      </div>

      {/* Charts Section */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '24px',
          marginBottom: '32px',
        }}
      >
        <TrafficChart data={trafficData} />
        <LeadSourceChart data={leadSourceData} />
      </div>

      {/* Ranking Chart (if available) */}
      {hasFeature(client.plan, 'basic_rankings') && (
        <div style={{ marginBottom: '32px' }}>
          <RankingMiniChart data={rankingData} />
        </div>
      )}

      {/* Recent Leads & Quick Actions */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          marginBottom: '32px',
        }}
      >
        {/* Recent Leads */}
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '24px',
          }}
        >
          <h3
            style={{
              margin: '0 0 16px 0',
              fontSize: '16px',
              fontWeight: 600,
              color: '#FFFFFF',
              fontFamily: 'Syne, sans-serif',
            }}
          >
            Recent Leads
          </h3>

          {recentLeads.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recentLeads.slice(0, 5).map((lead) => (
                <div
                  key={lead.id}
                  style={{
                    padding: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <p
                      style={{
                        margin: '0 0 4px 0',
                        fontSize: '13px',
                        fontWeight: 500,
                        color: '#FFFFFF',
                      }}
                    >
                      {lead.name}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: '11px',
                        color: '#6B7280',
                      }}
                    >
                      {lead.source} • {new Date(lead.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div
                    style={{
                      padding: '4px 8px',
                      backgroundColor: 'rgba(37, 99, 235, 0.15)',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: 500,
                      color: '#3B82F6',
                      textTransform: 'capitalize',
                    }}
                  >
                    {lead.status}
                  </div>
                </div>
              ))}
              {recentLeads.length > 5 && (
                <Link
                  href={`/client/${slug}/leads`}
                  style={{
                    display: 'block',
                    margin: '8px 0 0 0',
                    fontSize: '12px',
                    color: '#3B82F6',
                    fontWeight: 500,
                    textDecoration: 'none',
                  }}
                >
                  View all {recentLeads.length} leads →
                </Link>
              )}
            </div>
          ) : (
            <p
              style={{
                margin: 0,
                fontSize: '13px',
                color: '#6B7280',
              }}
            >
              No leads yet. Your new leads will appear here.
            </p>
          )}
        </div>

        {/* Quick Actions */}
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '24px',
          }}
        >
          <h3
            style={{
              margin: '0 0 16px 0',
              fontSize: '16px',
              fontWeight: 600,
              color: '#FFFFFF',
              fontFamily: 'Syne, sans-serif',
            }}
          >
            Quick Actions
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link
              href={`/client/${slug}/traffic`}
              style={{
                display: 'block',
                padding: '12px 16px',
                backgroundColor: '#2563eb',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                textDecoration: 'none',
                textAlign: 'center',
              }}
            >
              View Full Traffic Report
            </Link>

            {hasFeature(client.plan, 'review_management') ? (
              <Link
                href={`/client/${slug}/reviews`}
                style={{
                  display: 'block',
                  padding: '12px 16px',
                  backgroundColor: 'transparent',
                  color: '#3B82F6',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  textAlign: 'center',
                }}
              >
                Manage Reviews
              </Link>
            ) : (
              <UpgradePrompt feature="review_management" plan={client.plan} />
            )}

            {hasFeature(client.plan, 'basic_rankings') ? (
              <Link
                href={`/client/${slug}/rankings`}
                style={{
                  display: 'block',
                  padding: '12px 16px',
                  backgroundColor: 'transparent',
                  color: '#3B82F6',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  textAlign: 'center',
                }}
              >
                View All Keywords
              </Link>
            ) : (
              <UpgradePrompt feature="basic_rankings" plan={client.plan} />
            )}

            <Link
              href={`/client/${slug}/leads`}
              style={{
                display: 'block',
                padding: '12px 16px',
                backgroundColor: 'transparent',
                color: '#3B82F6',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                textDecoration: 'none',
                textAlign: 'center',
              }}
            >
              View All Leads
            </Link>
          </div>
        </div>
      </div>

      {/* Top Pages */}
      {topPages.length > 0 && (
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '24px',
          }}
        >
          <h3
            style={{
              margin: '0 0 16px 0',
              fontSize: '16px',
              fontWeight: 600,
              color: '#FFFFFF',
              fontFamily: 'Syne, sans-serif',
            }}
          >
            Top Pages
          </h3>

          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '13px',
              }}
            >
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <th
                    style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontWeight: 600,
                      color: '#9CA3AF',
                      fontSize: '12px',
                    }}
                  >
                    Page
                  </th>
                  <th
                    style={{
                      padding: '12px',
                      textAlign: 'right',
                      fontWeight: 600,
                      color: '#9CA3AF',
                      fontSize: '12px',
                    }}
                  >
                    Pageviews
                  </th>
                  <th
                    style={{
                      padding: '12px',
                      textAlign: 'right',
                      fontWeight: 600,
                      color: '#9CA3AF',
                      fontSize: '12px',
                    }}
                  >
                    Avg. Time
                  </th>
                  <th
                    style={{
                      padding: '12px',
                      textAlign: 'right',
                      fontWeight: 600,
                      color: '#9CA3AF',
                      fontSize: '12px',
                    }}
                  >
                    Bounce Rate
                  </th>
                </tr>
              </thead>
              <tbody>
                {topPages.slice(0, 5).map((page, idx) => (
                  <tr
                    key={idx}
                    style={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                    }}
                  >
                    <td
                      style={{
                        padding: '12px',
                        color: '#FFFFFF',
                        fontWeight: 500,
                        wordBreak: 'break-word',
                      }}
                    >
                      {page.path}
                    </td>
                    <td
                      style={{
                        padding: '12px',
                        textAlign: 'right',
                        color: '#D1D5DB',
                      }}
                    >
                      {page.pageviews.toLocaleString()}
                    </td>
                    <td
                      style={{
                        padding: '12px',
                        textAlign: 'right',
                        color: '#D1D5DB',
                      }}
                    >
                      {Math.round(page.avgTimeOnPage)}s
                    </td>
                    <td
                      style={{
                        padding: '12px',
                        textAlign: 'right',
                        color: '#D1D5DB',
                      }}
                    >
                      {Math.round(page.bounceRate)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
