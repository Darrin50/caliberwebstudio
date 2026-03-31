import { NextRequest, NextResponse } from 'next/server'
import { getSlugs, getSubmissions } from '@/lib/onboarding-data'

function isAuthorized(req: NextRequest): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) return false
  const auth = req.headers.get('authorization')
  return auth === `Bearer ${adminPassword}`
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.json({
    slugs: getSlugs(),
    submissions: getSubmissions(),
  })
}
