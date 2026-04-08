/* ─── Portal Analytics Route ────────────────────────────────────── */
/* GET /api/portal/analytics
   Fetch dashboard overview: traffic, KPIs, leads, reviews            */

import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedClient } from '@/lib/portal/auth';
import {
  getTrafficData,
  getTrafficSources,
  getTopPages,
  getGBPReviews,
} from '@/lib/portal/google';
import { getClient } from '@/lib/portal/clients';
import type { ClientConfig, TrafficDataPoint, KPIMetric, Lead } from '@/lib/portal/types';

/* ─── Helper: Calculate date range ─── */
function getDateRange(period: string): { startDate: string; endDate: string } {
  const endDate = new Date();
  const startDate = new Date();

  switch (period) {
    case '7d':
      startDate.setDate(endDate.getDate() - 7);
      break;
    case '90d':
      startDate.setDate(endDate.getDate() - 90);
      break;
    case '30d':
    default:
      startDate.setDate(endDate.getDate() - 30);
  }

  return {
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
  };
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/* ─── Helper: Calculate KPIs from traffic data ─── */
function calculateKPIs(
  trafficData: TrafficDataPoint[],
  leadCount: number,
  reviewCount: number
): KPIMetric[] {
  const totalSessions = trafficData.reduce((sum, d) => sum + d.sessions, 0);
  const avgBounceRate =
    trafficData.length > 0
      ? trafficData.reduce((sum, d) => sum + d.bounceRate, 0) / trafficData.length
      : 0;

  // Calculate change vs previous period
  const midpoint = Math.floor(trafficData.length / 2);
  const firstHalf = trafficData.slice(0, midpoint);
  const secondHalf = trafficData.slice(midpoint);

  const firstHalfSessions = firstHalf.reduce((sum, d) => sum + d.sessions, 0) || 1;
  const secondHalfSessions = secondHalf.reduce((sum, d) => sum + d.sessions, 0) || 1;
  const sessionsChange = Math.round(
    ((secondHalfSessions - firstHalfSessions) / firstHalfSessions) * 100
  );

  return [
    {
      label: 'Total Visitors',
      value: totalSessions.toLocaleString(),
      change: sessionsChange,
      changeLabel: sessionsChange > 0 ? 'vs previous period' : 'vs previous period',
      trend: sessionsChange > 0 ? 'up' : sessionsChange < 0 ? 'down' : 'flat',
      icon: 'TrendingUp',
    },
    {
      label: 'Bounce Rate',
      value: `${Math.round(avgBounceRate)}%`,
      change: -Math.round(avgBounceRate - 50), // Inverted: lower is better
      changeLabel: 'target is lower',
      trend: avgBounceRate < 50 ? 'up' : 'down',
      icon: 'Activity',
    },
    {
      label: 'New Leads',
      value: leadCount.toString(),
      change: 0,
      changeLabel: 'this period',
      trend: 'flat',
      icon: 'Users',
    },
    {
      label: 'Reviews',
      value: reviewCount.toString(),
      change: 0,
      changeLabel: 'this period',
      trend: 'flat',
      icon: 'Star',
    },
  ];
}

/* ─── Helper: Load leads from file system ─── */
async function loadLeadsForClient(slug: string): Promise<Lead[]> {
  try {
    // Try to read from /data/{slug}/leads.json
    const fs = await import('fs').then((m) => m.promises);
    const path = await import('path');

    const dataDir = path.join(process.cwd(), 'data', slug);
    const leadsFile = path.join(dataDir, 'leads.json');

    try {
      const content = await fs.readFile(leadsFile, 'utf-8');
      const leads = JSON.parse(content);
      return Array.isArray(leads) ? leads : [];
    } catch {
      // File doesn't exist yet
      return [];
    }
  } catch {
    return [];
  }
}

/* ═══════════════════════════════════════════════════════════════════
   GET /api/portal/analytics
   ═══════════════════════════════════════════════════════════════════ */

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const client = await getAuthenticatedClient();

    if (!client) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const period = searchParams.get('period') || '30d';

    // Validate period
    if (!['7d', '30d', '90d'].includes(period)) {
      return NextResponse.json(
        { success: false, error: 'Invalid period' },
        { status: 400 }
      );
    }

    // Get date range
    const { startDate, endDate } = getDateRange(period);

    // Check if Google APIs are configured
    const configured = !!client.googleAnalyticsPropertyId;

    // Initialize response object
    const responseData: Record<string, unknown> = {
      configured,
      period,
      dateRange: { startDate, endDate },
      kpis: [],
      trafficData: [],
      trafficSources: [],
      topPages: [],
      recentLeads: [],
      leadCount: 0,
      reviewCount: 0,
    };

    // Fetch Google Analytics data if configured
    if (configured && client.googleAnalyticsPropertyId) {
      try {
        const [trafficData, trafficSources, topPages] = await Promise.all([
          getTrafficData(client.googleAnalyticsPropertyId, startDate, endDate),
          getTrafficSources(client.googleAnalyticsPropertyId, startDate, endDate),
          getTopPages(client.googleAnalyticsPropertyId, startDate, endDate),
        ]);

        responseData.trafficData = trafficData;
        responseData.trafficSources = trafficSources;
        responseData.topPages = topPages;
      } catch (error) {
        console.error('Error fetching GA4 data:', error);
        // Continue with empty arrays
      }
    }

    // Load leads
    const leads = await loadLeadsForClient(client.slug);
    const leadCount = leads.length;
    responseData.leadCount = leadCount;
    responseData.recentLeads = leads.slice(0, 10); // Show 10 most recent

    // Fetch reviews if GBP is configured
    let reviewCount = 0;
    if (client.googleBusinessProfileId) {
      try {
        // GBP API requires account ID and location ID
        // This is a placeholder — adapt to your GBP API setup
        const gbpResult = await getGBPReviews(
          client.googleBusinessProfileId,
          client.googleBusinessProfileId
        );
        reviewCount = gbpResult.summary.totalReviews;
        responseData.reviewCount = reviewCount;
      } catch (error) {
        console.error('Error fetching GBP reviews:', error);
      }
    }

    // Calculate KPIs
    const trafficData = (responseData.trafficData as TrafficDataPoint[]) || [];
    responseData.kpis = calculateKPIs(trafficData, leadCount, reviewCount);

    return NextResponse.json({ success: true, data: responseData }, { status: 200 });
  } catch (error) {
    console.error('GET /api/portal/analytics error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}
