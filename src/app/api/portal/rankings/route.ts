/* ─── Portal Rankings Route ─────────────────────────────────────── */
/* GET /api/portal/rankings
   Fetch search rankings data from Google Search Console             */

import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedClient } from '@/lib/portal/auth';
import { getKeywordRankings, getRankingTrends } from '@/lib/portal/google';
import type { KeywordRanking, RankingOverTime } from '@/lib/portal/types';

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

/* ═══════════════════════════════════════════════════════════════════
   GET /api/portal/rankings
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

    // Check if Google Search Console is configured
    const configured =
      !!client.googleSearchConsoleProperty && !!client.website;

    // Initialize response
    const responseData: Record<string, unknown> = {
      configured,
      period,
      keywords: [],
      trends: [],
      summary: {
        topKeyword: null,
        avgPosition: 0,
        totalKeywords: 0,
        totalImpressions: 0,
        totalClicks: 0,
      },
    };

    // Return empty if not configured
    if (!configured) {
      return NextResponse.json({ success: true, data: responseData }, { status: 200 });
    }

    const { startDate, endDate } = getDateRange(period);

    try {
      // Fetch ranking data from Google Search Console
      const [keywords, trends] = await Promise.all([
        getKeywordRankings(client.website, startDate, endDate),
        getRankingTrends(client.website, startDate, endDate),
      ]);

      // Sort keywords by position (best first)
      const sortedKeywords = keywords.sort((a, b) => a.position - b.position);

      // Calculate summary stats
      const topKeyword =
        sortedKeywords.length > 0 ? sortedKeywords[0].keyword : null;
      const avgPosition =
        sortedKeywords.length > 0
          ? Math.round(
              (sortedKeywords.reduce((sum, k) => sum + k.position, 0) /
                sortedKeywords.length) *
                10
            ) / 10
          : 0;
      const totalImpressions = sortedKeywords.reduce(
        (sum, k) => sum + k.impressions,
        0
      );
      const totalClicks = sortedKeywords.reduce((sum, k) => sum + k.clicks, 0);

      responseData.keywords = sortedKeywords;
      responseData.trends = trends;
      responseData.summary = {
        topKeyword,
        avgPosition,
        totalKeywords: sortedKeywords.length,
        totalImpressions,
        totalClicks,
      };
    } catch (error) {
      console.error('Error fetching Google Search Console data:', error);
      // Return configured but empty data
      responseData.keywords = [];
      responseData.trends = [];
    }

    return NextResponse.json({ success: true, data: responseData }, { status: 200 });
  } catch (error) {
    console.error('GET /api/portal/rankings error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch ranking data' },
      { status: 500 }
    );
  }
}
