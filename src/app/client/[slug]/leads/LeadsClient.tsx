'use client';

import { useState, useEffect } from 'react';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: 'contact_form' | 'chatbot' | 'phone' | 'email';
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  date: string;
  message?: string;
  notes?: string;
}

interface LeadsData {
  totalLeads: number;
  newLeads: number;
  conversionRate: number;
  topSource: string;
  leadsOverTime: Array<{
    date: string;
    count: number;
  }>;
  sourceBreakdown: {
    contact_form: number;
    chatbot: number;
    phone: number;
    email: number;
  };
  leads: Lead[];
}

const colors = {
  bg: '#0a0a0e',
  blue: '#2563eb',
  navy: '#1E3D8F',
  border: 'rgba(255,255,255,0.08)',
  text: '#ffffff',
  textSecondary: 'rgba(255,255,255,0.6)',
  textTertiary: 'rgba(255,255,255,0.4)',
  green: '#10b981',
  yellow: '#f59e0b',
  purple: '#a855f7',
  red: '#ef4444',
  orange: '#f97316',
};

const statusColors: Record<Lead['status'], string> = {
  new: colors.blue,
  contacted: colors.yellow,
  qualified: colors.purple,
  converted: colors.green,
  lost: '#6b7280',
};

const sourceColors: Record<Lead['source'], string> = {
  contact_form: colors.blue,
  chatbot: colors.purple,
  phone: colors.green,
  email: colors.orange,
};

const sourceLabels: Record<Lead['source'], string> = {
  contact_form: 'Contact Form',
  chatbot: 'Chatbot',
  phone: 'Phone',
  email: 'Email',
};

const SummaryCard = ({
  label,
  value,
  subtext,
}: {
  label: string;
  value: string | number;
  subtext?: string;
}) => (
  <div
    style={{
      padding: 20,
      backgroundColor: 'rgba(255,255,255,0.02)',
      border: `1px solid ${colors.border}`,
      borderRadius: 12,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
    }}
  >
    <div style={{ color: colors.textSecondary, fontSize: 13, marginBottom: 12 }}>
      {label}
    </div>
    <div style={{ fontSize: 32, fontWeight: 'bold', color: colors.text, marginBottom: 4 }}>
      {value}
    </div>
    {subtext && (
      <div style={{ fontSize: 12, color: colors.textTertiary }}>
        {subtext}
      </div>
    )}
  </div>
);

const Badge = ({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '8px 12px',
      backgroundColor: 'rgba(255,255,255,0.02)',
      border: `1px solid ${colors.border}`,
      borderRadius: 8,
      flex: 1,
      minWidth: 120,
    }}
  >
    <div
      style={{
        width: 8,
        height: 8,
        backgroundColor: color,
        borderRadius: '50%',
      }}
    />
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 12, color: colors.textSecondary }}>{label}</div>
      <div style={{ fontSize: 16, fontWeight: 600, color: colors.text }}>
        {value}
      </div>
    </div>
  </div>
);

const SimpleBarChart = ({
  data,
}: {
  data: Array<{ date: string; count: number }>;
}) => {
  const maxCount = Math.max(...data.map((d) => d.count), 1);
  const width = Math.max(320, Math.min(800, data.length * 40));

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 6,
        height: 200,
        width: '100%',
        overflowX: 'auto',
        paddingBottom: 20,
      }}
    >
      {data.map((item, idx) => (
        <div
          key={idx}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: '0 0 auto',
            minWidth: 32,
          }}
        >
          <div
            style={{
              width: 28,
              height: (item.count / maxCount) * 150,
              backgroundColor: colors.blue,
              borderRadius: '4px 4px 0 0',
              marginBottom: 8,
              minHeight: 4,
            }}
          />
          <div
            style={{
              fontSize: 10,
              color: colors.textTertiary,
              textAlign: 'center',
              maxWidth: 32,
              wordBreak: 'break-word',
            }}
          >
            {item.date}
          </div>
        </div>
      ))}
    </div>
  );
};

interface LeadsClientProps {
  slug: string;
  plan: string;
}

export default function LeadsClient({ slug, plan }: LeadsClientProps) {
  const [data, setData] = useState<LeadsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<Lead['status'] | 'all'>('all');
  const [sourceFilter, setSourceFilter] = useState<Lead['source'] | 'all'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/portal/leads?slug=${slug}`);
        if (!response.ok) throw new Error('Failed to fetch leads');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, [slug]);

  const getFilteredLeads = () => {
    if (!data) return [];
    return data.leads.filter((lead) => {
      const statusMatch = statusFilter === 'all' || lead.status === statusFilter;
      const sourceMatch = sourceFilter === 'all' || lead.source === sourceFilter;
      return statusMatch && sourceMatch;
    });
  };

  if (loading) {
    return (
      <div style={{ padding: '40px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <style>{`@keyframes shimmer { 0% { opacity: 0.4 } 50% { opacity: 0.8 } 100% { opacity: 0.4 } }`}</style>
        <div style={{ height: 36, width: 120, borderRadius: 8, background: 'rgba(255,255,255,0.07)', animation: 'shimmer 1.4s ease-in-out infinite', marginBottom: 32 }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 40 }}>
          {[1,2,3,4].map((i) => (
            <div key={i} style={{ height: 88, borderRadius: 12, background: 'rgba(255,255,255,0.04)', animation: `shimmer 1.4s ease-in-out ${i * 0.1}s infinite` }} />
          ))}
        </div>
        {[1,2,3,4,5].map((i) => (
          <div key={i} style={{ height: 68, borderRadius: 10, background: 'rgba(255,255,255,0.03)', marginBottom: 10, animation: `shimmer 1.4s ease-in-out ${i * 0.08}s infinite` }} />
        ))}
      </div>
    );
  }

  if (error || !data) {
    return (
      <div style={{ padding: '40px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <p style={{ color: colors.red, marginBottom: 16 }}>{error || 'Failed to load leads'}</p>
        <button
          onClick={() => window.location.reload()}
          style={{ padding: '9px 18px', background: 'rgba(255,255,255,0.06)', border: `1px solid ${colors.border}`, borderRadius: 8, color: colors.textSecondary, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
        >
          Try again
        </button>
      </div>
    );
  }

  const filteredLeads = getFilteredLeads();

  const exportCSV = () => {
    if (!data?.leads.length) return;
    const headers = ['Name', 'Email', 'Phone', 'Source', 'Status', 'Date', 'Message'];
    const rows = data.leads.map((l) => [
      l.name,
      l.email,
      l.phone || '',
      sourceLabels[l.source] || l.source,
      l.status,
      new Date(l.date || '').toLocaleDateString(),
      (l.message || '').replace(/"/g, '""'),
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: '40px 24px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 'bold',
            color: colors.text,
            margin: 0,
            fontFamily: 'Syne, sans-serif',
          }}
        >
          Leads
        </h1>
        {data.leads.length > 0 && (
          <button
            onClick={exportCSV}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '9px 16px',
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${colors.border}`,
              borderRadius: 8,
              color: colors.textSecondary,
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = colors.text;
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.2)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = colors.textSecondary;
              (e.currentTarget as HTMLButtonElement).style.borderColor = colors.border;
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export CSV
          </button>
        )}
      </div>

      {/* Summary Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 16,
          marginBottom: 40,
        }}
      >
        <SummaryCard label="Total Leads" value={data.totalLeads} />
        <SummaryCard label="New Leads" value={data.newLeads} subtext="This week" />
        <SummaryCard
          label="Conversion Rate"
          value={`${data.conversionRate}%`}
          subtext="Converted / Total"
        />
        <SummaryCard label="Top Source" value={data.topSource} subtext="By volume" />
      </div>

      {/* Leads Over Time Chart */}
      <div
        style={{
          padding: 24,
          backgroundColor: 'rgba(255,255,255,0.02)',
          border: `1px solid ${colors.border}`,
          borderRadius: 12,
          marginBottom: 40,
        }}
      >
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20, color: colors.text }}>
          Leads Over Time
        </h2>
        <SimpleBarChart data={data.leadsOverTime} />
      </div>

      {/* Source Breakdown */}
      <div
        style={{
          padding: 24,
          backgroundColor: 'rgba(255,255,255,0.02)',
          border: `1px solid ${colors.border}`,
          borderRadius: 12,
          marginBottom: 40,
        }}
      >
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: colors.text }}>
          Lead Source Breakdown
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 12,
          }}
        >
          <Badge
            label="Contact Form"
            value={data.sourceBreakdown.contact_form}
            color={sourceColors.contact_form}
          />
          <Badge
            label="Chatbot"
            value={data.sourceBreakdown.chatbot}
            color={sourceColors.chatbot}
          />
          <Badge
            label="Phone"
            value={data.sourceBreakdown.phone}
            color={sourceColors.phone}
          />
          <Badge
            label="Email"
            value={data.sourceBreakdown.email}
            color={sourceColors.email}
          />
        </div>
      </div>

      {/* Filters */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: colors.textSecondary, marginBottom: 8 }}>
            Filter by Status
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {(['all', 'new', 'contacted', 'qualified', 'converted', 'lost'] as const).map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor:
                      statusFilter === status ? colors.blue : 'transparent',
                    border: `1px solid ${
                      statusFilter === status ? colors.blue : colors.border
                    }`,
                    color: colors.text,
                    borderRadius: 6,
                    cursor: 'pointer',
                    fontSize: 13,
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                    textTransform: 'capitalize',
                  }}
                >
                  {status}
                </button>
              ),
            )}
          </div>
        </div>

        <div>
          <div style={{ fontSize: 12, color: colors.textSecondary, marginBottom: 8 }}>
            Filter by Source
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {(['all', 'contact_form', 'chatbot', 'phone', 'email'] as const).map(
              (source) => (
                <button
                  key={source}
                  onClick={() => setSourceFilter(source)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor:
                      sourceFilter === source ? colors.blue : 'transparent',
                    border: `1px solid ${
                      sourceFilter === source ? colors.blue : colors.border
                    }`,
                    color: colors.text,
                    borderRadius: 6,
                    cursor: 'pointer',
                    fontSize: 13,
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                    textTransform: 'capitalize',
                  }}
                >
                  {source === 'all' ? 'All Sources' : sourceLabels[source]}
                </button>
              ),
            )}
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div
        style={{
          overflowX: 'auto',
          border: `1px solid ${colors.border}`,
          borderRadius: 12,
          backgroundColor: 'rgba(255,255,255,0.02)',
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: 14,
          }}
        >
          <thead>
            <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
              <th
                style={{
                  padding: '16px 20px',
                  textAlign: 'left',
                  color: colors.textSecondary,
                  fontWeight: 600,
                  fontSize: 12,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}
              >
                Name
              </th>
              <th
                style={{
                  padding: '16px 20px',
                  textAlign: 'left',
                  color: colors.textSecondary,
                  fontWeight: 600,
                  fontSize: 12,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}
              >
                Email
              </th>
              <th
                style={{
                  padding: '16px 20px',
                  textAlign: 'left',
                  color: colors.textSecondary,
                  fontWeight: 600,
                  fontSize: 12,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}
              >
                Phone
              </th>
              <th
                style={{
                  padding: '16px 20px',
                  textAlign: 'left',
                  color: colors.textSecondary,
                  fontWeight: 600,
                  fontSize: 12,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}
              >
                Source
              </th>
              <th
                style={{
                  padding: '16px 20px',
                  textAlign: 'left',
                  color: colors.textSecondary,
                  fontWeight: 600,
                  fontSize: 12,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}
              >
                Status
              </th>
              <th
                style={{
                  padding: '16px 20px',
                  textAlign: 'left',
                  color: colors.textSecondary,
                  fontWeight: 600,
                  fontSize: 12,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}
              >
                Date
              </th>
              <th
                style={{
                  padding: '16px 20px',
                  textAlign: 'left',
                  color: colors.textSecondary,
                  fontWeight: 600,
                  fontSize: 12,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  style={{
                    padding: '48px 20px',
                    textAlign: 'center',
                  }}
                >
                  <p style={{ color: colors.textSecondary, margin: '0 0 6px 0', fontSize: 14 }}>
                    {data.leads.length === 0
                      ? 'No leads yet. New leads from your contact form and chatbot will appear here.'
                      : 'No leads match this filter.'}
                  </p>
                  {statusFilter !== 'all' || sourceFilter !== 'all' ? (
                    <button
                      onClick={() => { setStatusFilter('all'); setSourceFilter('all'); }}
                      style={{ background: 'none', border: 'none', color: colors.blue, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', padding: 0, fontWeight: 600 }}
                    >
                      Clear filters
                    </button>
                  ) : null}
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead, idx) => (
                <tr
                  key={lead.id}
                  style={{
                    borderBottom: `1px solid ${colors.border}`,
                    backgroundColor: expandedId === lead.id ? 'rgba(255,255,255,0.04)' : 'transparent',
                  }}
                >
                  <td style={{ padding: '16px 20px', color: colors.text }}>
                    {lead.name}
                  </td>
                  <td style={{ padding: '16px 20px', color: colors.textSecondary }}>
                    <a
                      href={`mailto:${lead.email}`}
                      style={{
                        color: colors.blue,
                        textDecoration: 'none',
                        fontSize: 13,
                      }}
                    >
                      {lead.email}
                    </a>
                  </td>
                  <td style={{ padding: '16px 20px', color: colors.textSecondary }}>
                    <a
                      href={`tel:${lead.phone}`}
                      style={{
                        color: colors.blue,
                        textDecoration: 'none',
                        fontSize: 13,
                      }}
                    >
                      {lead.phone}
                    </a>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <div
                      style={{
                        display: 'inline-block',
                        padding: '4px 8px',
                        backgroundColor: sourceColors[lead.source],
                        color: colors.text,
                        borderRadius: 4,
                        fontSize: 11,
                        fontWeight: 600,
                      }}
                    >
                      {sourceLabels[lead.source]}
                    </div>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <div
                      style={{
                        display: 'inline-block',
                        padding: '4px 8px',
                        backgroundColor: statusColors[lead.status],
                        color: colors.text,
                        borderRadius: 4,
                        fontSize: 11,
                        fontWeight: 600,
                        textTransform: 'capitalize',
                      }}
                    >
                      {lead.status}
                    </div>
                  </td>
                  <td style={{ padding: '16px 20px', color: colors.textSecondary }}>
                    {new Date(lead.date).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <button
                      onClick={() =>
                        setExpandedId(expandedId === lead.id ? null : lead.id)
                      }
                      style={{
                        padding: '4px 12px',
                        backgroundColor: colors.navy,
                        color: colors.text,
                        border: 'none',
                        borderRadius: 4,
                        cursor: 'pointer',
                        fontSize: 11,
                        fontWeight: 600,
                      }}
                    >
                      {expandedId === lead.id ? 'Hide' : 'View'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Expanded Lead Details */}
      {expandedId && (
        <div
          style={{
            marginTop: 24,
            padding: 24,
            backgroundColor: 'rgba(255,255,255,0.02)',
            border: `1px solid ${colors.border}`,
            borderRadius: 12,
          }}
        >
          {(() => {
            const expanded = filteredLeads.find((l) => l.id === expandedId);
            if (!expanded) return null;

            return (
              <div>
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    marginBottom: 16,
                    color: colors.text,
                  }}
                >
                  Lead Details: {expanded.name}
                </h3>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: 16,
                    marginBottom: 16,
                  }}
                >
                  <div>
                    <div style={{ color: colors.textSecondary, fontSize: 12, marginBottom: 4 }}>
                      Email
                    </div>
                    <div style={{ color: colors.text, fontSize: 14 }}>
                      {expanded.email}
                    </div>
                  </div>
                  <div>
                    <div style={{ color: colors.textSecondary, fontSize: 12, marginBottom: 4 }}>
                      Phone
                    </div>
                    <div style={{ color: colors.text, fontSize: 14 }}>
                      {expanded.phone}
                    </div>
                  </div>
                  <div>
                    <div style={{ color: colors.textSecondary, fontSize: 12, marginBottom: 4 }}>
                      Source
                    </div>
                    <div style={{ color: colors.text, fontSize: 14 }}>
                      {sourceLabels[expanded.source]}
                    </div>
                  </div>
                  <div>
                    <div style={{ color: colors.textSecondary, fontSize: 12, marginBottom: 4 }}>
                      Status
                    </div>
                    <div
                      style={{
                        display: 'inline-block',
                        padding: '4px 8px',
                        backgroundColor: statusColors[expanded.status],
                        color: colors.text,
                        borderRadius: 4,
                        fontSize: 12,
                        fontWeight: 600,
                        textTransform: 'capitalize',
                      }}
                    >
                      {expanded.status}
                    </div>
                  </div>
                  <div>
                    <div style={{ color: colors.textSecondary, fontSize: 12, marginBottom: 4 }}>
                      Date
                    </div>
                    <div style={{ color: colors.text, fontSize: 14 }}>
                      {new Date(expanded.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {expanded.message && (
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ color: colors.textSecondary, fontSize: 12, marginBottom: 8 }}>
                      Message
                    </div>
                    <div
                      style={{
                        padding: 12,
                        backgroundColor: 'rgba(255,255,255,0.04)',
                        border: `1px solid ${colors.border}`,
                        borderRadius: 6,
                        color: colors.text,
                        fontSize: 13,
                        lineHeight: 1.5,
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {expanded.message}
                    </div>
                  </div>
                )}

                {expanded.notes && (
                  <div>
                    <div style={{ color: colors.textSecondary, fontSize: 12, marginBottom: 8 }}>
                      Internal Notes
                    </div>
                    <div
                      style={{
                        padding: 12,
                        backgroundColor: 'rgba(255,255,255,0.04)',
                        border: `1px solid ${colors.border}`,
                        borderRadius: 6,
                        color: colors.text,
                        fontSize: 13,
                        lineHeight: 1.5,
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {expanded.notes}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
