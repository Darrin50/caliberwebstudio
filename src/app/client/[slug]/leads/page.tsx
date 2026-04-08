import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAuthenticatedClient } from '@/lib/portal/auth';
import { getClient } from '@/lib/portal/clients';
import LeadsClient from './LeadsClient';

interface LeadsPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  { params }: LeadsPageProps,
): Promise<Metadata> {
  const { slug } = await params;
  const client = getClient(slug);
  return {
    title: `Leads | ${client?.businessName || 'Client Portal'} — Caliber Web Studio`,
    description: 'Track and manage incoming leads',
  };
}

export default async function LeadsPage({ params }: LeadsPageProps) {
  const { slug } = await params;

  // Auth guard — redirect to login if not authenticated
  const authenticatedClient = await getAuthenticatedClient();
  if (!authenticatedClient) {
    redirect('/client/login');
  }

  // Verify the authenticated client owns this slug
  if (authenticatedClient.slug !== slug) {
    redirect(`/client/${authenticatedClient.slug}/leads`);
  }

  return (
    <LeadsClient slug={slug} plan={authenticatedClient.plan} />
  );
}
