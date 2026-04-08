/* ─── Portal Authentication ────────────────────────────────────── */
/* JWT-based magic link auth for client portal access.              */

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { getClientByEmail, getClient } from './clients';
import type { ClientConfig } from './types';

const secret = process.env.PORTAL_JWT_SECRET;
if (!secret) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('PORTAL_JWT_SECRET environment variable is required in production');
  }
  // In development only: warn and use a fixed dev secret so magic links survive restarts
  console.warn('[Portal Auth] PORTAL_JWT_SECRET not set — using dev-only fallback. Set this env var before deploying.');
}
const JWT_SECRET = new TextEncoder().encode(secret ?? 'dev-only-secret-do-not-use-in-production');

const COOKIE_NAME = 'caliber-portal-token';
const TOKEN_EXPIRY = '30d';
const MAGIC_LINK_EXPIRY = '15m';

/* ─── Create a magic link token (sent via email) ─── */
export async function createMagicLinkToken(email: string): Promise<string | null> {
  const client = getClientByEmail(email);
  if (!client) return null;

  const token = await new SignJWT({
    email: client.email,
    slug: client.slug,
    type: 'magic_link',
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(MAGIC_LINK_EXPIRY)
    .sign(JWT_SECRET);

  return token;
}

/* ─── Verify a magic link and create a session token ─── */
export async function verifyMagicLink(
  token: string
): Promise<{ sessionToken: string; client: ClientConfig } | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);

    if (payload.type !== 'magic_link' || !payload.slug) return null;

    const client = getClient(payload.slug as string);
    if (!client) return null;

    // Create a longer-lived session token
    const sessionToken = await new SignJWT({
      email: client.email,
      slug: client.slug,
      plan: client.plan,
      businessName: client.businessName,
      type: 'session',
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(TOKEN_EXPIRY)
      .sign(JWT_SECRET);

    return { sessionToken, client };
  } catch {
    return null;
  }
}

/* ─── Set the session cookie ─── */
export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: '/',
  });
}

/* ─── Get the current authenticated client from cookie ─── */
export async function getAuthenticatedClient(): Promise<ClientConfig | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;

    const { payload } = await jwtVerify(token, JWT_SECRET);
    if (payload.type !== 'session' || !payload.slug) return null;

    const client = getClient(payload.slug as string);
    return client ?? null;
  } catch {
    return null;
  }
}

/* ─── Clear the session ─── */
export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/* ─── Verify a token from Authorization header (for API routes) ─── */
export async function verifyApiToken(
  authHeader: string | null
): Promise<ClientConfig | null> {
  if (!authHeader?.startsWith('Bearer ')) return null;

  const token = authHeader.slice(7);
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    if (payload.type !== 'session' || !payload.slug) return null;
    return getClient(payload.slug as string) ?? null;
  } catch {
    return null;
  }
}
