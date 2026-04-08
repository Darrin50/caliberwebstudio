'use client';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

interface TrafficDataPoint {
  date: string;
  sessions: number;
  pageviews: number;
  users: number;
  bounceRate: number;
  avgSessionDuration: number;
}

interface TrafficSource {
  source: string;
  sessions: number;
  percentage: number;
}

interface RankingDataPoint {
  date: string;
  avgPosition: number;
}

interface TrafficChartProps {
  data: TrafficDataPoint[];
}

interface LeadSourceChartProps {
  data: Array<{ name: string; value: number }>;
}

interface RankingMiniChartProps {
  data: RankingDataPoint[];
}

const COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd'];
const LEAD_SOURCE_COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd'];

function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: '#1a1a1f',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          padding: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        }}
      >
        <p
          style={{
            margin: '0 0 4px 0',
            fontSize: '12px',
            color: '#9CA3AF',
          }}
        >
          {payload[0].payload.date}
        </p>
        <p
          style={{
            margin: 0,
            fontSize: '14px',
            fontWeight: 600,
            color: '#2563eb',
          }}
        >
          {payload[0].value.toLocaleString()} sessions
        </p>
      </div>
    );
  }
  return null;
}

function PieTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: '#1a1a1f',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          padding: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: '12px',
            color: '#9CA3AF',
          }}
        >
          {payload[0].name}
        </p>
        <p
          style={{
            margin: '4px 0 0 0',
            fontSize: '14px',
            fontWeight: 600,
            color: '#2563eb',
          }}
        >
          {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
}

export function TrafficChart({ data }: TrafficChartProps) {
  const chartData = data.map((item) => ({
    ...item,
    sessions: Math.round(item.sessions),
  }));

  return (
    <div
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '12px',
        padding: '24px',
        height: '320px',
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
        Traffic Trend
      </h3>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255, 255, 255, 0.08)"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            stroke="#6B7280"
            style={{ fontSize: '12px' }}
            tick={{ fill: '#6B7280' }}
          />
          <YAxis
            stroke="#6B7280"
            style={{ fontSize: '12px' }}
            tick={{ fill: '#6B7280' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="sessions"
            stroke="#2563eb"
            dot={false}
            strokeWidth={2}
            name="Sessions"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function LeadSourceChart({
  data,
}: LeadSourceChartProps) {
  const chartData = data.filter((item) => item.value > 0);

  if (chartData.length === 0) {
    return (
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          padding: '24px',
          height: '320px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p style={{ color: '#6B7280', fontSize: '14px' }}>
          No lead source data available
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '12px',
        padding: '24px',
        height: '320px',
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
        Lead Sources
      </h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={80}
            fill="#2563eb"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={LEAD_SOURCE_COLORS[index % LEAD_SOURCE_COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<PieTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RankingMiniChart({ data }: RankingMiniChartProps) {
  const chartData = data.slice(-14).map((item) => ({
    ...item,
    avgPosition: Math.round(item.avgPosition * 10) / 10,
  }));

  if (chartData.length === 0) {
    return (
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          padding: '24px',
          height: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p style={{ color: '#6B7280', fontSize: '14px' }}>
          No ranking data available
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '12px',
        padding: '24px',
        height: '200px',
      }}
    >
      <h3
        style={{
          margin: '0 0 12px 0',
          fontSize: '16px',
          fontWeight: 600,
          color: '#FFFFFF',
          fontFamily: 'Syne, sans-serif',
        }}
      >
        Avg. Ranking Position
      </h3>
      <ResponsiveContainer width="100%" height={140}>
        <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255, 255, 255, 0.08)"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            stroke="#6B7280"
            style={{ fontSize: '11px' }}
            tick={{ fill: '#6B7280' }}
            height={30}
          />
          <YAxis
            stroke="#6B7280"
            style={{ fontSize: '11px' }}
            tick={{ fill: '#6B7280' }}
            width={40}
            reversed
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="avgPosition"
            stroke="#2563eb"
            dot={false}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
