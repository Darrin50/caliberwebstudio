import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPreviewSpa, getAllPreviewSpas } from '@/lib/preview-spa-data'
import ConceptDisclaimerBar from '@/components/ConceptDisclaimerBar'
import MedSpaNewTemplate from '@/components/MedSpaNewTemplate'

export const dynamicParams = false

export async function generateStaticParams() {
  return getAllPreviewSpas().map((p) => ({ hash: p.hash }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ hash: string }>
}): Promise<Metadata> {
  const { hash } = await params
  const entry = getPreviewSpa(hash)
  if (!entry) return { title: 'Preview Not Found' }
  return {
    title: `${entry.config.businessName} — Private Concept Preview`,
    description: entry.config.tagline,
    robots: { index: false, follow: false },
  }
}

export default async function PreviewHashPage({
  params,
}: {
  params: Promise<{ hash: string }>
}) {
  const { hash } = await params
  const entry = getPreviewSpa(hash)
  if (!entry) notFound()

  return (
    <>
      <ConceptDisclaimerBar spaName={entry.config.businessName} />
      <MedSpaNewTemplate config={entry.config} />
    </>
  )
}
