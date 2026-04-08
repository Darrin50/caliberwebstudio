'use client';

import { useState, useEffect } from 'react';
import type { KeywordRanking, RankingOverTime } from '@/lib/portal/types';

type Period = '7d' | '30d' | '90d';

interface RankingsResponse {
  keywords: KeywordRanking[];
  trendData: RankingOverTime[];
  summary: {
    totalKeywords: number;
    avgPosition: number;
    topKeywords: number;
  };
}

export default function RankingsClient({ slug }: { slug: string }) {
  const [period, setPeriod] = useState<Period>('30d');
  const [data, setData] = useState<RankingsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'position' | 'change' | 'keyword'>('position');
  const [sortDesc, setSortDesc] = useState(false);

  // Fetch rankings data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `/api/portal/rankings?slug=${slug}&period=${period}`
        );
        if (!res.ok) {
          throw new Error('Failed to fetch rankings data');
        }
        const json = (await res.json()) as RankingsResponse;
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, period]);

  // Sort keywords
  const sortedKeywords = data?.keywords
    ? [...data.keywords].sort((a, b) => {
        let aVal: number | string;
        let bVal: number | string;

        if (sortBy === 'position') {
          aVal = a.position;
          bVal = b.position;
        } else if (sortBy === 'change') {
          aVal = a.change;
          bVal = b.change;
        } else {
          aVal = a.keyword;
          bVal = b.keyword;
        }

        if (typeof aVal === 'string') {
          return sortDesc
            ? bVal.toString().localeCompare(aVal.toString())
            : aVal.toString().localeCompare(bVal.toString());
        }

        return sortDesc ? (bVal as number) - (aVal as number) : (aVal as number) - (bVal as number);
      })
    : [];

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
                Search Rankings
              </h1>
              <p
                style={{
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.6)',
                  margin: 0,
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Track your keyword positions and SEO performance
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
                  Total Keywords
                </p>
                <p
                  style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    margin: 0,
                    fontFamily: 'Syne, sans-serif',
                  }}
                >
                  {data.summary.totalKeywords}
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
                  Avg. Position
                </p>
                <p
                  style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    margin: 0,
                    fontFamily: 'Syne, sans-serif',
                  }}
                >
                  {data.summary.avgPosition.toFixed(1)}
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
                  Top 10 Keywords
                </p>
                <p
                  style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    margin: 0,
                    fontFamily: 'Syne, sans-serif',
                    color: '#4ade80',
                  }}
                >
                  {data.summary.topKeywords}
                </p>
              </div>
            </div>
          )}

          {/* Keywords Table */}
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              overflow: 'hidden',
            }}
          >
            <div style={{ overflowX: 'auto' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  minWidth: '800px',
                }}
              >
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <th
                      style={{
                        padding: '16px',
                        textAlign: 'left',
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
                        setSortBy('keyword');
                        setSortDesc(sortBy === 'keyword' ? !sortDesc : false);
                      }}
                    >
                      Keyword {sortBy === 'keyword' && (sortDesc ? '↓' : '↑')}
                    </th>
                    <th
                      style={{
                        padding: '16px',
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
                        setSortBy('position');
                        setSortDesc(sortBy === 'position' ? !sortDesc : false);
                      }}
                    >
                      Position {sortBy === 'position' && (sortDesc ? '↓' : '↑')}
                    </th>
                    <th
                      style={{
                        padding: '16px',
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
                        setSortBy('change');
                        setSortDesc(sortBy === 'change' ? !sortDesc : false);
                      }}
                    >
                      Change {sortBy === 'change' && (sortDesc ? '↓' : '↑')}
                    </th>
                    <th
                      style={{
                        padding: '16px',
                        textAlign: 'center',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontFamily: 'Space Mono, monospace',
                        backgroundColor: 'rgba(255, 255, 255, 0.02)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      Impressions
                    </th>
                    <th
                      style={{
                        padding: '16px',
                        textAlign: 'center',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontFamily: 'Space Mono, monospace',
                        backgroundColor: 'rgba(255, 255, 255, 0.02)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      Clicks
                    </th>
                    <th
                      style={{
                        padding: '16px',
                        textAlign: 'center',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontFamily: 'Space Mono, monospace',
                        backgroundColor: 'rgba(255, 255, 255, 0.02)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      CTR
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr>
                      <td
                        colSpan={7}
                        style={{
                          padding: '40px 16px',
                          textAlign: 'center',
                          color: 'rgba(255, 255, 255, 0.5)',
                          fontSize: '14px',
                          fontFamily: 'Inter, sans-serif',
                        }}
                      >
                        Loading rankings...
                      </td>
                    </tr>
                  )}
                  {error && (
                    <tr>
                      <td
                        colSpan={7}
                        style={{
                          padding: '40px 16px',
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
                  {!loading && !error && sortedKeywords.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        style={{
                          padding: '40px 16px',
                          textAlign: 'center',
                          color: 'rgba(255, 255, 255, 0.5)',
                          fontSize: '14px',
                          fontFamily: 'Inter, sans-serif',
                        }}
                      >
                        No ranking data available
                      </td>
                    </tr>
                  )}
                  {sortedKeywords.map((keyword, idx) => (
                    <tr
                      key={idx}
                      style={{
                        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
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
                          padding: '16px',
                          fontSize: '14px',
                          fontFamily: 'Inter, sans-serif',
                          color: '#fff',
                        }}
                      >
                        <a
                          href={keyword.url}
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
                          {keyword.keyword}
                        </a>
                      </td>
                      <td
                        style={{
                          padding: '16px',
                          textAlign: 'center',
                          fontSize: '14px',
                          fontFamily: 'Space Mono, monospace',
                          color: '#fff',
                          fontWeight: '600',
                        }}
                      >
                        {keyword.position}
                      </td>
                      <td
                        style={{
                          padding: '16px',
                          textAlign: 'center',
                          fontSize: '13px',
                          fontWeight: '600',
                          fontFamily: 'Space Mono, monospace',
                          color:
                            keyword.change > 0
                              ? '#4ade80'
                              : keyword.change < 0
                                ? '#ef4444'
                                : 'rgba(255, 255, 255, 0.6)',
                        }}
                      >
                        {keyword.change > 0 ? '↑' : keyword.change < 0 ? '↓' : '–'}{' '}
                        {Math.abs(keyword.change)}
                      </td>
                      <td
                        style={{
                          padding: '16px',
                          textAlign: 'center',
                          fontSize: '14px',
                          fontFamily: 'Inter, sans-serif',
                          color: 'rgba(255, 255, 255, 0.7)',
                        }}
                      >
                        {keyword.impressions.toLocaleString()}
                      </td>
                      <td
                        style={{
                          padding: '16px',
                          textAlign: 'center',
                          fontSize: '14px',
                          fontFamily: 'Inter, sans-serif',
                          color: 'rgba(255, 255, 255, 0.7)',
                        }}
                      >
                        {keyword.clicks.toLocaleString()}
                      </td>
                      <td
                        style={{
                          padding: '16px',
                          textAlign: 'center',
                          fontSize: '14px',
                          fontFamily: 'Space Mono, monospace',
                          color: 'rgba(255, 255, 255, 0.7)',
                        }}
                      >
                        {(keyword.ctr * 100).toFixed(2)}%
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
