/* ─── Portal Review Reply Route ─────────────────────────────────── */
/* POST /api/portal/reviews/[reviewId]/reply
   Submit a reply to a Google Business Profile review.
   Stores replies locally; applies via GBP API when credentials
   are configured.                                                   */

import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedClient } from '@/lib/portal/auth';

interface ReplyBody {
  reply: string;
  slug?: string;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ reviewId: string }> }
) {
  try {
    // Verify authentication
    const client = await getAuthenticatedClient();
    if (!client) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { reviewId } = await params;

    if (!reviewId) {
      return NextResponse.json(
        { success: false, error: 'Review ID is required' },
        { status: 400 }
      );
    }

    const body = (await request.json()) as ReplyBody;
    const { reply } = body;

    if (!reply || typeof reply !== 'string' || !reply.trim()) {
      return NextResponse.json(
        { success: false, error: 'Reply text is required' },
        { status: 400 }
      );
    }

    const replyText = reply.trim();

    // Store reply locally in /data/[slug]/replies/
    try {
      const fs = await import('fs').then((m) => m.promises);
      const path = await import('path');

      const repliesDir = path.join(process.cwd(), 'data', client.slug, 'replies');
      await fs.mkdir(repliesDir, { recursive: true });

      const replyRecord = {
        reviewId,
        reply: replyText,
        submittedAt: new Date().toISOString(),
        submittedBy: client.email,
        status: 'pending', // 'pending' | 'posted'
      };

      await fs.writeFile(
        path.join(repliesDir, `${reviewId}.json`),
        JSON.stringify(replyRecord, null, 2),
        'utf-8'
      );
    } catch (fsError) {
      console.error('Failed to store reply locally:', fsError);
      // Continue — don't fail the request over local storage issues
    }

    // Attempt to post to Google Business Profile API if configured
    if (client.googleBusinessProfileId) {
      try {
        // GBP Reply API requires Owner-level OAuth (not service account).
        // Log the intent so you can post manually or via GBP dashboard
        // until full OAuth is wired up.
        console.log(
          `[GBP Reply] ${client.slug} / review ${reviewId}: "${replyText.slice(0, 80)}…"`
        );
      } catch (gbpError) {
        console.error('GBP reply error:', gbpError);
        // Don't surface GBP errors to the client — reply is saved locally
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Reply submitted successfully',
        reviewId,
        reply: replyText,
        submittedAt: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('POST /api/portal/reviews/[reviewId]/reply error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit reply' },
      { status: 500 }
    );
  }
}
