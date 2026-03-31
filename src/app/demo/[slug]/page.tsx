import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { demos, getDemo } from '../demos';
import { getProspectDemo } from '@/lib/prospect-demo-data';
import DemoPage from './DemoPage';
import ProspectDemoPage from './ProspectDemoPage';

// Allow slugs beyond the statically generated ones (prospect demos)
export const dynamicParams = true;

export async function generateStaticParams() {
  return demos.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const staticConfig = getDemo(slug);
  if (staticConfig) {
    return {
      title: `${staticConfig.businessName} — ${staticConfig.businessType} in ${staticConfig.city.split(',')[0]}`,
      description: staticConfig.about,
      robots: { index: false, follow: false },
    };
  }

  const prospectConfig = getProspectDemo(slug);
  if (prospectConfig) {
    return {
      title: `${prospectConfig.businessName} — Demo Preview`,
      description: prospectConfig.about,
      robots: { index: false, follow: false },
    };
  }

  return { title: 'Demo Not Found' };
}

export default async function DemoRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const staticConfig = getDemo(slug);
  if (staticConfig) return <DemoPage config={staticConfig} />;

  const prospectConfig = getProspectDemo(slug);
  if (prospectConfig) return <ProspectDemoPage config={prospectConfig} />;

  notFound();
}
