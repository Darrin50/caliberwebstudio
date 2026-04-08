/* ─── Portal Authentication Route ──────────────────────────────── */
/* POST: Send magic link via email
   GET: Verify magic link token
   DELETE: Logout                                                  */

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import {
  createMagicLinkToken,
  verifyMagicLink,
  setSessionCookie,
  clearSession,
  getAuthenticatedClient,
} from '@/lib/portal/auth';
import { getClientByEmail } from '@/lib/portal/clients';

const resend = new Resend(process.env.RESEND_API_KEY);

/* ─── Rate limit tracking (in-memory, simple) ─── */
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 3; // max 3 attempts per minute

function getClientIP(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const attempts = rateLimitMap.get(ip) || [];

  // Remove old attempts outside the window
  const recentAttempts = attempts.filter((t) => now - t < RATE_LIMIT_WINDOW);

  if (recentAttempts.length >= RATE_LIMIT_MAX) {
    return false;
  }

  recentAttempts.push(now);
  rateLimitMap.set(ip, recentAttempts);

  // Cleanup old entries to prevent memory leak
  if (rateLimitMap.size > 1000) {
    const oldestTime = now - RATE_LIMIT_WINDOW - 1000;
    for (const [key, times] of rateLimitMap.entries()) {
      const filtered = times.filter((t) => t > oldestTime);
      if (filtered.length === 0) {
        rateLimitMap.delete(key);
      } else {
        rateLimitMap.set(key, filtered);
      }
    }
  }

  return true;
}

/* ═══════════════════════════════════════════════════════════════════
   POST /api/portal/auth — Send magic link
   ═══════════════════════════════════════════════════════════════════ */

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request);

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many attempts. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email } = body as { email?: string };

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check if client exists
    const client = getClientByEmail(normalizedEmail);

    // Always return success for security (don't leak if email exists)
    if (!client) {
      return NextResponse.json(
        { success: true, message: 'Check your email for a sign-in link' },
        { status: 200 }
      );
    }

    // Create magic link token
    const token = await createMagicLinkToken(normalizedEmail);

    if (!token) {
      return NextResponse.json(
        { success: true, message: 'Check your email for a sign-in link' },
        { status: 200 }
      );
    }

    // Build magic link URL
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://caliberwebstudio.com';
    const magicLinkUrl = `${baseUrl}/client/login?token=${encodeURIComponent(token)}`;

    // Send email via Resend
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'noreply@caliberwebstudio.com',
      to: normalizedEmail,
      subject: 'Sign In to Your Caliber Web Studio Dashboard',
      html: generateMagicLinkEmail(client.businessName, magicLinkUrl),
    });

    return NextResponse.json(
      { success: true, message: 'Check your email for a sign-in link' },
      { status: 200 }
    );
  } catch (error) {
    console.error('POST /api/portal/auth error:', error);
    return NextResponse.json(
      { success: true, message: 'Check your email for a sign-in link' },
      { status: 200 }
    );
  }
}

/* ═══════════════════════════════════════════════════════════════════
   GET /api/portal/auth — Verify magic link token
   ═══════════════════════════════════════════════════════════════════ */

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Token is required' },
        { status: 400 }
      );
    }

    // Verify the magic link token
    const result = await verifyMagicLink(token);

    if (!result) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired link' },
        { status: 401 }
      );
    }

    // Set session cookie
    await setSessionCookie(result.sessionToken);

    return NextResponse.json(
      {
        success: true,
        slug: result.client.slug,
        businessName: result.client.businessName,
        message: 'Successfully signed in',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('GET /api/portal/auth error:', error);
    return NextResponse.json(
      { success: false, error: 'Invalid or expired link' },
      { status: 401 }
    );
  }
}

/* ═══════════════════════════════════════════════════════════════════
   DELETE /api/portal/auth — Logout
   ═══════════════════════════════════════════════════════════════════ */

export async function DELETE(request: NextRequest) {
  try {
    // Verify user is authenticated
    const client = await getAuthenticatedClient();

    if (!client) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Clear session cookie
    await clearSession();

    return NextResponse.json(
      { success: true, message: 'Successfully logged out' },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE /api/portal/auth error:', error);
    return NextResponse.json(
      { success: false, error: 'Logout failed' },
      { status: 500 }
    );
  }
}

/* ─── Email template ─── */
function generateMagicLinkEmail(businessName: string, magicLinkUrl: string): string {
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { background-color: #1E3D8F; color: white; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0; }
      .header h1 { margin: 0; font-size: 24px; font-weight: bold; }
      .content { background-color: #f9f9f9; padding: 30px 20px; border-radius: 0 0 8px 8px; }
      .message { margin-bottom: 30px; font-size: 16px; }
      .button { display: inline-block; background-color: #1E3D8F; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; margin-bottom: 20px; }
      .button:hover { background-color: #152d6b; }
      .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; text-align: center; }
      .footer a { color: #1E3D8F; text-decoration: none; }
      .divider { margin: 20px 0; }
      .small-text { font-size: 14px; color: #666; margin-top: 20px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Welcome back!</h1>
      </div>
      <div class="content">
        <div class="message">
          <p>Hi ${escapeHtml(businessName)},</p>
          <p>Click the button below to sign in to your Caliber Web Studio dashboard and manage your website analytics, leads, and more.</p>
        </div>

        <div style="text-align: center;">
          <a href="${escapeHtml(magicLinkUrl)}" class="button">Sign In to Your Dashboard</a>
        </div>

        <div class="small-text">
          <p>Or copy and paste this link in your browser:</p>
          <p style="word-break: break-all; font-family: monospace; font-size: 12px; color: #666;">
            ${escapeHtml(magicLinkUrl)}
          </p>
        </div>

        <div class="divider"></div>

        <p style="font-size: 14px; color: #666;">
          This link expires in 15 minutes. If you didn't request this sign-in link, please ignore this email.
        </p>

        <div class="footer">
          <p>
            Caliber Web Studio<br>
            <a href="https://caliberwebstudio.com">Visit our website</a> | <a href="https://caliberwebstudio.com">Contact us</a>
          </p>
          <p>&copy; 2026 Caliber Web Studio. All rights reserved.</p>
        </div>
      </div>
    </div>
  </body>
</html>
  `.trim();
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
