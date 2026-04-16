import { getProspectDemo } from '@/lib/prospect-demo-data'
import ProspectDemoPage from '@/app/demo/[slug]/ProspectDemoPage'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

const SLUG = 'detroit-vegan-soul'

export const metadata: Metadata = {
  title: 'Detroit Vegan Soul — Plant-Based Soul Food in Detroit, MI',
  description:
    "Detroit's original plant-based soul food restaurant in Grandmont-Rosedale. Mac n Yease, BBQ Jackfruit, Sweet Potato Pie, and catering for any event.",
  robots: { index: false, follow: false },
}

export default function DetroitVeganSoulPage() {
  const config = getProspectDemo(SLUG)
  if (!config) notFound()
  return <ProspectDemoPage config={config} />
}
