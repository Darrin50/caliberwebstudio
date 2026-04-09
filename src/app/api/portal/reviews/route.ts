/* ─── Portal Reviews Route ──────────────────────────────────────── */
/* GET /api/portal/reviews
   Fetch reviews from Google Business Profile                        */

import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedClient } from '@/lib/portal/auth';
import { getGBPReviews } from '@/lib/portal/google';
import type { Review, ReviewSummary } from '@/lib/portal/types';

/* ═══════════════════════════════════════════════════════════════════
   GET /api/portal/reviews
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

    // Check if Google Business Profile is configured
    const configured = !!client.googleBusinessProfileId;

    // Initialize response
    const responseData: {
      configured: boolean;
      reviews: Review[];
      summary: ReviewSummary;
    } = {
      configured,
      reviews: [],
      summary: {
        totalReviews: 0,
        averageRating: 0,
        ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
        reviewsThisMonth: 0,
        responseRate: 0,
      },
    };

    // Return default state if not configured
    if (!configured) {
      return NextResponse.json({ success: true, data: responseData }, {
        status: 200,
      });
    }

    try {
      // Fetch reviews from Google Business Profile
      // Note: GBP API requires account ID and location ID
      // This implementation assumes client.googleBusinessProfileId contains the full path
      // or you have a mapping to account/location IDs
      const gbpId = client.googleBusinessProfileId!;
      const gbpAccountId = gbpId.split('/')[0] || gbpId;
      const gbpLocationId = gbpId.split('/')[1] || gbpId;

      const { reviews, summary } = await getGBPReviews(gbpAccountId, gbpLocationId);

      // Filter reviews from the last 30 days for "this month" count
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const recentReviewCount = reviews.filter((r) => {
        const reviewDate = new Date(r.date);
        return reviewDate >= thirtyDaysAgo;
      }).length;

      responseData.reviews = reviews;
      responseData.summary = {
        ...summary,
        reviewsThisMonth: recentReviewCount,
      };
    } catch (error) {
      console.error('Error fetching GBP reviews:', error);
      // Return configured but empty state on error
      responseData.configured = false;
    }

    return NextResponse.json({ success: true, data: responseData }, {
      status: 200,
    });
  } catch (error) {
    console.error('GET /api/portal/reviews error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}
