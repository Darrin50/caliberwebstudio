'use client';

import { useState, useEffect } from 'react';
import type { TrafficDataPoint, TrafficSource, TopPage } from '@/lib/portal/types';

type Period = '7d' | '30d' | '90d';

interface AnalyticsResponse {
  trafficData: TrafficDataPoint[];
  sources: TrafficSource[];
  topPages: TopPage[];
  summary: {
    totalSessions: number;
    uniqueUsers: number;
    avgSessionDuration: number;
    bounceRate: number;
    sessionsChange: number;
    usersChange: number;
  };
}

export default function TrafficClient({ slug }: { slug: string }) {
  const [period, setPeriod] = useState<Period>('30d');
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortByPage, setSortByPage] = useState<'pageviews' | 'time' | 'bounce'>('pageviews');
  const [sortDescPage, setSortDescPage] = useState(true);

  // Fetch analytics data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `/api/portal/analytics?slug=${slug}&period=${period}`
        );
        if (!res.ok) {
          throw new Error('Failed to fetch analytics data');
        }
        const json = (await res.json()) as AnalyticsResponse;
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, period]);

  // Sort top pages
  const sortedPages = data?.topPages
    ? [...data.topPages].sort((a, b) => {
        let aVal: number;
        let bVal: number;

        if (sortByPage === 'pageviews') {
          aVal = a.pageviews;
          bVal = b.pageviews;
        } else if (sortByPage === 'time') {
          aVal = a.avgTimeOnPage;
          bVal = b.avgTimeOnPage;
        } else {
          aVal = a.bounceRate;
          bVal = b.bounceRate;
        }

        return sortDescPage ? bVal - aVal : aVal - bVal;
      })
    : [];

  // Format duration in seconds to readable string
  const formatDuration = (seconds: number): string => {
    if (seconds < 60) return `${Math.round(seconds)}s`;
    const minutes = Math.round(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = (seconds / 3600).toFixed(1);
    return `${hours}h`;
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0e', color: '#fff' }}>
      {/* Header */}
      <div style={{ padding: '40px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '32px',
              flexWrap: 'wrap',
              gap: '20px',
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  margin: '0 0 8px 0',
                  fontFamily: 'Syne, sans-serif',
                }}
              >
                Traffic Analytics
              </h1>
              <p
                style={{
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.6)',
                  margin: 0,
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Monitor your website traffic and visitor behavior
              </p>
            </div>

            {/* Period Selector */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {(['7d', '30d', '90d'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: `1px solid ${
                      period === p
                        ? 'rgba(37, 99, 235, 0.5)'
                        : 'rgba(255, 255, 255, 0.08)'
                    }`,
                    backgroundColor:
                      period === p ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
                    color: period === p ? '#2563eb' : 'rgba(255, 255, 255, 0.7)',
                    fontSize: '13px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: 'Space Mono, monospace',
                  }}
                  onMouseOver={(e) => {
                    if (period !== p) {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                        'rgba(255, 255, 255, 0.05)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (period !== p) {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                        'transparent';
                    }
                  }}
                >
                  {p === '7d' ? '7 Days' : p === '30d' ? '30 Days' : '90 Days'}
                </button>
              ))}
            </div>
          </div>

          {/* Summary Cards */}
          {data && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '16px',
                marginBottom: '32px',
              }}
            >
              <div
                style={{
                  padding: '20px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <p
                  style={{
                    fontSize: '12px',
                    color: 'rgba(255, 255, 255, 0.6)',
                    margin: '0 0 8px 0',
                    fontFamily: 'Space Mono, monospace',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Total Sessions
                </p>
                <p
                  style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    margin: '0 0 4px 0',
                    fontFamily: 'Syne, sans-serif',
                  }}
                >
                  {data.summary.totalSessions.toLocaleString()}
                </p>
                <p
                  style={{
                    fontSize: '12px',
                    color:
                      data.summary.sessionsChange > 0 ? '#4ade80' : '#ef4444',
                    margin: 0,
                    fontFamily: 'Space Mono, monospace',
                    fontWeight: '500',
                  }}
                >
                  {data.summary.sessionsChange > 0 ? '↑' : '↓'}{' '}
                  {Math.abs(data.summary.sessionsChange).toFixed(1)}%
                </p>
              </div>

              <div
                style={{
                  padding: '20px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <p
                  style={{
                    fontSize: '12px',
                    color: 'rgba(255, 255, 255, 0.6)',
                    margin: '0 0 8px 0',
                    fontFamily: 'Space Mono, monospace',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Unique Users
                </p>
                <p
                  style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    margin: '0 0 4px 0',
                    fontFamily: 'Syne, sans-serif',
                  }}
                >
                  {data.summary.uniqueUsers.toLocaleString()}
                </p>
                <p
                  style={{
                    fontSize: '12px',
                    color:
                      data.summary.usersChange > 0 ? '#4ade80' : '#ef4444',
                    margin: 0,
                    fontFamily: 'Space Mono, monospace',
                    fontWeight: '500',
                  }}
                >
                  {data.summary.usersChange > 0 ? '↑' : '↓'}{' '}
                  {Math.abs(data.summary.usersChange).toFixed(1)}%
                </p>
              </div>

              <div
                style={{
                  padding: '20px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <p
                  style={{
                    fontSize: '12px',
                    color: 'rgba(255, 255, 255, 0.6)',
                    margin: '0 0 8px 0',
                    fontFamily: 'Space Mono, monospace',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Avg. Session Duration
                </p>
                <p
                  style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    margin: '0 0 4px 0',
                    fontFamily: 'Syne, sans-serif',
                  }}
                >
                  {formatDuration(data.summary.avgSessionDuration)}
                </p>
                <p
                  style={{
                    fontSize: '12px',
                    color: 'rgba(255, 255, 255, 0.6)',
                    margin: 0,
                    fontFamily: 'Space Mono, monospace',
                    fontWeight: '500',
                  }}
                >
                  Per session
                </p>
              </div>

              <div
                style={{
                  padding: '20px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <p
                  style={{
                    fontSize: '12px',
                    color: 'rgba(255, 255, 255, 0.6)',
                    margin: '0 0 8px 0',
                    fontFamily: 'Space Mono, monospace',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Bounce Rate
                </p>
                <p
                  style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    margin: '0 0 4px 0',
                    fontFamily: 'Syne, sans-serif',
                  }}
                >
                  {data.summary.bounceRate.toFixed(1)}%
                </p>
                <p
                  style={{
                    fontSize: '12px',
                    color: 'rgba(255, 255, 255, 0.6)',
                    margin: 0,
                    fontFamily: 'Space Mono, monospace',
                    fontWeight: '500',
                  }}
                >
                  {data.summary.bounceRate < 50
                    ? 'Excellent'
                    : data.summary.bounceRate < 70
                      ? 'Good'
                      : 'Needs improvement'}
                </p>
              </div>
            </div>
          )}

          {/* Traffic Chart Section */}
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '24px',
              marginBottom: '32px',
            }}
          >
            <h2
              style={{
                fontSize: '18px',
                fontWeight: '600',
                margin: '0 0 16px 0',
                fontFamily: 'Syne, sans-serif',
              }}
            >
              Traffic Over Time
            </h2>
            {loading ? (
              <div
                style={{
                  height: '300px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Loading chart...
              </div>
            ) : error ? (
              <div
                style={{
                  height: '300px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ef4444',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {error}
              </div>
            ) : data && data.trafficData.length > 0 ? (
              <div
                style={{
                  height: '300px',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-around',
                  gap: '4px',
                  padding: '16px 0',
                }}
              >
                {data.trafficData.map((point, idx) => {
                  const maxSessions = Math.max(
                    ...data.trafficData.map((p) => p.sessions)
                  );
                  const heightPercent =
                    maxSessions > 0 ? (point.sessions / maxSessions) * 100 : 0;

                  return (
                    <div
                      key={idx}
                      style={{
                        flex: 1,
                        height: `${heightPercent}%`,
                        minHeight: '4px',
                        backgroundColor: '#2563eb',
                        borderRadius: '2px',
                        opacity: 0.8,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                      title={`${point.date}: ${point.sessions} sessions`}
                      onMouseOver={(e) => {
                        (e.currentTarget as HTMLDivElement).style.opacity =
                          '1';
                        (e.currentTarget as HTMLDivElement).style.backgroundColor =
                          '#1d4ed8';
                      }}
                      onMouseOut={(e) => {
                        (e.currentTarget as HTMLDivElement).style.opacity =
                          '0.8';
                        (e.currentTarget as HTMLDivElement).style.backgroundColor =
                          '#2563eb';
                      }}
                    />
                  );
                })}
              </div>
            ) : (
              <div
                style={{
                  height: '300px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                No traffic data available
              </div>
            )}
            {!loading && !error && data?.trafficData && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '16px',
                  fontSize: '12px',
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontFamily: 'Space Mono, monospace',
                }}
              >
                <span>{data.trafficData[0]?.date}</span>
                <span>{data.trafficData[data.trafficData.length - 1]?.date}</span>
              </div>
            )}
          </div>

          {/* Traffic Sources Section */}
          {data && data.sources.length > 0 && (
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '24px',
                marginBottom: '32px',
              }}
            >
              <h2
                style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  margin: '0 0 20px 0',
                  fontFamily: 'Syne, sans-serif',
                }}
              >
                Traffic Sources
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {data.sources.map((source, idx) => (
                  <div key={idx}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '8px',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '14px',
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: '500',
                        }}
                      >
                        {source.source.charAt(0).toUpperCase() +
                          source.source.slice(1)}
                      </span>
                      <span
                        style={{
                          fontSize: '13px',
                          color: 'rgba(255, 255, 255, 0.7)',
                          fontFamily: 'Space Mono, monospace',
                        }}
                      >
                        {source.sessions.toLocaleString()} ({source.percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div
                      style={{
                        width: '100%',
                        height: '8px',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '4px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${source.percentage}%`,
                          backgroundColor: '#2563eb',
                          borderRadius: '4px',
                          transition: 'width 0.3s',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Top Pages Section */}
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '24px' }}>
              <h2
                style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  margin: '0',
                  fontFamily: 'Syne, sans-serif',
                }}
              >
                Top Pages
              </h2>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  minWidth: '700px',
                }}
              >
                <thead>
                  <tr style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <th
                      style={{
                        padding: '16px 24px',
                        textAlign: 'left',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontFamily: 'Space Mono, monospace',
                        backgroundColor: 'rgba(255, 255, 255, 0.02)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      Page URL
                    </th>
                    <th
                      style={{
                        padding: '16px 24px',
                        textAlign: 'center',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontFamily: 'Space Mono, monospace',
                        cursor: 'pointer',
                        backgroundColor: 'rgba(255, 255, 255, 0.02)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                      onClick={() => {
                        setSortByPage('pageviews');
                        setSortDescPage(
                          sortByPage === 'pageviews' ? !sortDescPage : true
                        );
                      }}
                    >
                      Pageviews{' '}
                      {sortByPage === 'pageviews' && (sortDescPage ? '↓' : '↑')}
                    </th>
                    <th
                      style={{
                        padding: '16px 24px',
                        textAlign: 'center',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontFamily: 'Space Mono, monospace',
                        cursor: 'pointer',
                        backgroundColor: 'rgba(255, 255, 255, 0.02)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                      onClick={() => {
                        setSortByPage('time');
                        setSortDescPage(
                          sortByPage === 'time' ? !sortDescPage : true
                        );
                      }}
                    >
                      Avg. Time {sortByPage === 'time' && (sortDescPage ? '↓' : '↑')}
                    </th>
                    <th
                      style={{
                        padding: '16px 24px',
                        textAlign: 'center',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontFamily: 'Space Mono, monospace',
                        cursor: 'pointer',
                        backgroundColor: 'rgba(255, 255, 255, 0.02)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                      onClick={() => {
                        setSortByPage('bounce');
                        setSortDescPage(
                          sortByPage === 'bounce' ? !sortDescPage : true
                        );
                      }}
                    >
                      Bounce Rate{' '}
                      {sortByPage === 'bounce' && (sortDescPage ? '↓' : '↑')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr>
                      <td
                        colSpan={4}
                        style={{
                          padding: '40px 24px',
                          textAlign: 'center',
                          color: 'rgba(255, 255, 255, 0.5)',
                          fontSize: '14px',
                          fontFamily: 'Inter, sans-serif',
                        }}
                      >
                        Loading pages...
                      </td>
                    </tr>
                  )}
                  {error && (
                    <tr>
                      <td
                        colSpan={4}
                        style={{
                          padding: '40px 24px',
                          textAlign: 'center',
                          color: '#ef4444',
                          fontSize: '14px',
                          fontFamily: 'Inter, sans-serif',
                        }}
                      >
                        Error: {error}
                      </td>
                    </tr>
                  )}
                  {!loading && !error && sortedPages.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        style={{
                          padding: '40px 24px',
                          textAlign: 'center',
                          color: 'rgba(255, 255, 255, 0.5)',
                          fontSize: '14px',
                          fontFamily: 'Inter, sans-serif',
                        }}
                      >
                        No page data available
                      </td>
                    </tr>
                  )}
                  {sortedPages.map((page, idx) => (
                    <tr
                      key={idx}
                      style={{
                        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                        transition: 'background-color 0.2s',
                      }}
                      onMouseOver={(e) => {
                        (e.currentTarget as HTMLTableRowElement).style.backgroundColor =
                          'rgba(255, 255, 255, 0.03)';
                      }}
                      onMouseOut={(e) => {
                        (e.currentTarget as HTMLTableRowElement).style.backgroundColor =
                          'transparent';
                      }}
                    >
                      <td
                        style={{
                          padding: '16px 24px',
                          fontSize: '14px',
                          fontFamily: 'Inter, sans-serif',
                          color: '#2563eb',
                          wordBreak: 'break-all',
                        }}
                      >
                        <a
                          href={page.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: '#2563eb',
                            textDecoration: 'none',
                          }}
                          onMouseOver={(e) => {
                            (e.currentTarget as HTMLAnchorElement).style.textDecoration =
                              'underline';
                          }}
                          onMouseOut={(e) => {
                            (e.currentTarget as HTMLAnchorElement).style.textDecoration =
                              'none';
                          }}
                        >
                          {page.path}
                        </a>
                      </td>
                      <td
                        style={{
                          padding: '16px 24px',
                          textAlign: 'center',
                          fontSize: '14px',
                          fontFamily: 'Space Mono, monospace',
                          color: '#fff',
                          fontWeight: '600',
                        }}
                      >
                        {page.pageviews.toLocaleString()}
                      </td>
                      <td
                        style={{
                          padding: '16px 24px',
                          textAlign: 'center',
                          fontSize: '14px',
                          fontFamily: 'Space Mono, monospace',
                          color: 'rgba(255, 255, 255, 0.7)',
                        }}
                      >
                        {formatDuration(page.avgTimeOnPage)}
                      </td>
                      <td
                        style={{
                          padding: '16px 24px',
                          textAlign: 'center',
                          fontSize: '14px',
                          fontFamily: 'Space Mono, monospace',
                          color: 'rgba(255, 255, 255, 0.7)',
                        }}
                      >
                        {page.bounceRate.toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
