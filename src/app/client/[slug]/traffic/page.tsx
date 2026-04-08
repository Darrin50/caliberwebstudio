import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAuthenticatedClient } from '@/lib/portal/auth';
import { hasFeature } from '@/lib/portal/types';
import TrafficClient from './TrafficClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `Traffic Analytics | Caliber Portal`,
    description: 'Monitor your website traffic, sources, and visitor behavior',
  };
}

export default async function TrafficPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const client = await getAuthenticatedClient();

  // Redirect unauthenticated users
  if (!client || client.slug !== slug) {
    redirect('/portal/login');
  }

  // Check if plan has access to traffic analytics
  const hasTrafficAccess = hasFeature(client.plan, 'basic_traffic');

  if (!hasTrafficAccess) {
    redirect('/portal/login');
  }

  return <TrafficClient slug={slug} />;
}
