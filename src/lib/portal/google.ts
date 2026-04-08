/* ─── Google API Integrations ──────────────────────────────────── */
/* Service-account based access to GA4, Search Console, and GBP.   */

import { google } from 'googleapis';
import type {
  TrafficDataPoint,
  TrafficSource,
  TopPage,
  KeywordRanking,
  RankingOverTime,
  ReviewSummary,
  Review,
} from './types';

/* ─── Auth: shared service account ─── */
function getAuth() {
  const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!credentials) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON env var is not set');
  }

  const parsed = JSON.parse(credentials);
  return new google.auth.GoogleAuth({
    credentials: parsed,
    scopes: [
      'https://www.googleapis.com/auth/analytics.readonly',
      'https://www.googleapis.com/auth/webmasters.readonly',
      'https://www.googleapis.com/auth/business.manage',
    ],
  });
}

/* ═══════════════════════════════════════════════════════════════════
   GOOGLE ANALYTICS 4 — Traffic Data
   ═══════════════════════════════════════════════════════════════════ */

export async function getTrafficData(
  propertyId: string,
  startDate: string,
  endDate: string
): Promise<TrafficDataPoint[]> {
  const auth = getAuth();
  const analyticsData = google.analyticsdata({ version: 'v1beta', auth });

  const response = await analyticsData.properties.runReport({
    property: `properties/${propertyId}`,
    requestBody: {
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: 'date' }],
      metrics: [
        { name: 'sessions' },
        { name: 'screenPageViews' },
        { name: 'activeUsers' },
        { name: 'bounceRate' },
        { name: 'averageSessionDuration' },
      ],
      orderBys: [{ dimension: { dimensionName: 'date' } }],
    },
  });

  return (
    response.data.rows?.map((row) => ({
      date: row.dimensionValues?.[0]?.value ?? '',
      sessions: parseInt(row.metricValues?.[0]?.value ?? '0'),
      pageviews: parseInt(row.metricValues?.[1]?.value ?? '0'),
      users: parseInt(row.metricValues?.[2]?.value ?? '0'),
      bounceRate: parseFloat(row.metricValues?.[3]?.value ?? '0'),
      avgSessionDuration: parseFloat(row.metricValues?.[4]?.value ?? '0'),
    })) ?? []
  );
}

export async function getTrafficSources(
  propertyId: string,
  startDate: string,
  endDate: string
): Promise<TrafficSource[]> {
  const auth = getAuth();
  const analyticsData = google.analyticsdata({ version: 'v1beta', auth });

  const response = await analyticsData.properties.runReport({
    property: `properties/${propertyId}`,
    requestBody: {
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: 'sessionDefaultChannelGroup' }],
      metrics: [{ name: 'sessions' }],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      limit: 10,
    },
  });

  const totalSessions =
    response.data.rows?.reduce(
      (sum, row) => sum + parseInt(row.metricValues?.[0]?.value ?? '0'),
      0
    ) ?? 1;

  return (
    response.data.rows?.map((row) => {
      const sessions = parseInt(row.metricValues?.[0]?.value ?? '0');
      return {
        source: row.dimensionValues?.[0]?.value ?? 'Unknown',
        sessions,
        percentage: Math.round((sessions / totalSessions) * 100),
      };
    }) ?? []
  );
}

export async function getTopPages(
  propertyId: string,
  startDate: string,
  endDate: string
): Promise<TopPage[]> {
  const auth = getAuth();
  const analyticsData = google.analyticsdata({ version: 'v1beta', auth });

  const response = await analyticsData.properties.runReport({
    property: `properties/${propertyId}`,
    requestBody: {
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: 'pagePath' }],
      metrics: [
        { name: 'screenPageViews' },
        { name: 'averageSessionDuration' },
        { name: 'bounceRate' },
      ],
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      limit: 15,
    },
  });

  return (
    response.data.rows?.map((row) => ({
      path: row.dimensionValues?.[0]?.value ?? '/',
      pageviews: parseInt(row.metricValues?.[0]?.value ?? '0'),
      avgTimeOnPage: parseFloat(row.metricValues?.[1]?.value ?? '0'),
      bounceRate: parseFloat(row.metricValues?.[2]?.value ?? '0'),
    })) ?? []
  );
}

/* ═══════════════════════════════════════════════════════════════════
   GOOGLE SEARCH CONSOLE — Rankings Data
   ═══════════════════════════════════════════════════════════════════ */

export async function getKeywordRankings(
  siteUrl: string,
  startDate: string,
  endDate: string
): Promise<KeywordRanking[]> {
  const auth = getAuth();
  const searchConsole = google.searchconsole({ version: 'v1', auth });

  const response = await searchConsole.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate,
      endDate,
      dimensions: ['query', 'page'],
      rowLimit: 50,
      type: 'web',
    },
  });

  // Deduplicate: keep the best-ranking URL per keyword
  const keywordMap = new Map<string, KeywordRanking>();

  response.data.rows?.forEach((row) => {
    const keyword = row.keys?.[0] ?? '';
    const url = row.keys?.[1] ?? '';
    const existing = keywordMap.get(keyword);

    if (!existing || (row.position ?? 100) < existing.position) {
      keywordMap.set(keyword, {
        keyword,
        position: Math.round(row.position ?? 0),
        previousPosition: 0, // filled in by comparison query
        change: 0,
        impressions: row.impressions ?? 0,
        clicks: row.clicks ?? 0,
        ctr: Math.round((row.ctr ?? 0) * 100 * 10) / 10,
        url,
      });
    }
  });

  return Array.from(keywordMap.values()).sort(
    (a, b) => a.position - b.position
  );
}

export async function getRankingTrends(
  siteUrl: string,
  startDate: string,
  endDate: string
): Promise<RankingOverTime[]> {
  const auth = getAuth();
  const searchConsole = google.searchconsole({ version: 'v1', auth });

  const response = await searchConsole.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate,
      endDate,
      dimensions: ['date'],
      type: 'web',
    },
  });

  return (
    response.data.rows?.map((row) => ({
      date: row.keys?.[0] ?? '',
      avgPosition: Math.round((row.position ?? 0) * 10) / 10,
      totalImpressions: row.impressions ?? 0,
      totalClicks: row.clicks ?? 0,
    })) ?? []
  );
}

/* ═══════════════════════════════════════════════════════════════════
   GOOGLE BUSINESS PROFILE — Reviews
   ═══════════════════════════════════════════════════════════════════ */

export async function getGBPReviews(
  accountId: string,
  locationId: string
): Promise<{ reviews: Review[]; summary: ReviewSummary }> {
  const auth = getAuth();
  const mybusiness = google.mybusinessaccountmanagement({
    version: 'v1',
    auth,
  });

  // Note: The GBP API has migrated. For production, you may need to use
  // the Google Business Profile API v4 or the Account Management API.
  // This implementation provides the structure — adapt the exact API calls
  // to whichever GBP API version is available in your Google Cloud project.

  try {
    // Attempt to fetch reviews via the My Business API
    const response = await google.mybusinessbusinessinformation({
      version: 'v1',
      auth,
    }).accounts.locations.list({
      parent: `accounts/${accountId}`,
    });

    // For now, return structured data — the exact API call depends on
    // which GBP API endpoints are enabled in your Google Cloud project
    const reviews: Review[] = [];
    const summary: ReviewSummary = {
      totalReviews: 0,
      averageRating: 0,
      ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      reviewsThisMonth: 0,
      responseRate: 0,
    };

    return { reviews, summary };
  } catch {
    // GBP API may not be configured yet — return empty state
    return {
      reviews: [],
      summary: {
        totalReviews: 0,
        averageRating: 0,
        ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
        reviewsThisMonth: 0,
        responseRate: 0,
      },
    };
  }
}
