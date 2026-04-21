import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getMedSpaMock, getMedSpaMocks } from '@/lib/med-spa-mock-data'
import MedSpaMockPage from './MedSpaMockPage'

export const dynamicParams = true

export async function generateStaticParams() {
  return getMedSpaMocks().map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const config = getMedSpaMock(slug)
  if (!config) return { title: 'Mock Not Found' }
  return {
    title: `${config.businessName} — Medical Spa Preview`,
    description: config.tagline,
    robots: { index: false, follow: false },
  }
}

export default async function MockRoute({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const config = getMedSpaMock(slug)
  if (!config) notFound()
  return <MedSpaMockPage config={config} />
}
