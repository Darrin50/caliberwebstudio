import { Metadata } from 'next';
import { getAuthenticatedClient } from '@/lib/portal/auth';
import { getClient } from '@/lib/portal/clients';
import SettingsClient from './SettingsClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const client = getClient(slug);

  return {
    title: `Settings | ${client?.businessName || 'Client Portal'} — Caliber Web Studio`,
    description: `Manage your account settings, billing, and integrations.`,
  };
}

export default async function SettingsPage({ params }: PageProps) {
  const { slug } = await params;

  // Verify authentication
  const authenticatedClient = await getAuthenticatedClient();
  if (!authenticatedClient || authenticatedClient.slug !== slug) {
    return null;
  }

  const client = getClient(slug);
  if (!client) {
    return null;
  }

  return (
    <SettingsClient
      slug={client.slug}
      businessName={client.businessName}
      email={client.email}
      phone={client.phone}
      website={client.website}
      plan={client.plan}
      googleAnalyticsPropertyId={client.googleAnalyticsPropertyId}
      googleSearchConsoleProperty={client.googleSearchConsoleProperty}
      googleBusinessProfileId={client.googleBusinessProfileId}
    />
  );
}
