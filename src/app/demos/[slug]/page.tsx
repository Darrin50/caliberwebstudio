import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPortfolioDemo, getMedSpaDemo, ALL_DEMO_SLUGS } from '@/lib/demos-library-data'
import { getDemo } from '@/app/demo/demos'
import DemoPage from '@/app/demo/[slug]/DemoPage'
import DemoBanner from '@/components/DemoBanner'
import MedSpaNewTemplate from '@/components/MedSpaNewTemplate'

export const dynamicParams = false

export async function generateStaticParams() {
  return ALL_DEMO_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  const portfolio = getPortfolioDemo(slug)
  if (portfolio) {
    return {
      title: `${portfolio.fakeName} | ${portfolio.industry} Demo — Caliber Web Studio`,
      description: portfolio.description,
      alternates: { canonical: `https://www.caliberwebstudio.com/demos/${slug}` },
    }
  }

  const spa = getMedSpaDemo(slug)
  if (spa) {
    return {
      title: `${spa.businessName} | Med Spa Demo — Caliber Web Studio`,
      description: spa.tagline,
      alternates: { canonical: `https://www.caliberwebstudio.com/demos/${slug}` },
    }
  }

  return { title: 'Demo Not Found' }
}

export default async function DemosSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const portfolio = getPortfolioDemo(slug)
  if (portfolio) {
    const config = getDemo(portfolio.demoSlug)
    if (!config) notFound()
    return (
      <>
        <DemoBanner />
        <DemoPage config={config} />
      </>
    )
  }

  const spa = getMedSpaDemo(slug)
  if (spa) {
    return (
      <>
        <DemoBanner />
        <MedSpaNewTemplate config={spa} />
      </>
    )
  }

  notFound()
}
