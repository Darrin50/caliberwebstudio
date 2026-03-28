import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { demos, getDemo } from '../demos';
import DemoPage from './DemoPage';

export async function generateStaticParams() {
  return demos.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const config = getDemo(slug);
  if (!config) return { title: 'Demo Not Found' };

  return {
    title: `${config.businessName} — ${config.businessType} in ${config.city.split(',')[0]}`,
    description: config.about,
    robots: { index: false, follow: false }, // Don't index demo pages
  };
}

export default async function DemoRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const config = getDemo(slug);
  if (!config) notFound();

  return <DemoPage config={config} />;
}
