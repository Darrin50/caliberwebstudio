import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAuthenticatedClient } from '@/lib/portal/auth';
import { getClient } from '@/lib/portal/clients';
import ReviewsClient from './ReviewsClient';

interface ReviewsPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  { params }: ReviewsPageProps,
): Promise<Metadata> {
  const { slug } = await params;
  const client = getClient(slug);
  return {
    title: `Reviews | ${client?.businessName || 'Client Portal'} — Caliber Web Studio`,
    description: 'Manage and monitor customer reviews',
  };
}

export default async function ReviewsPage({ params }: ReviewsPageProps) {
  const { slug } = await params;

  // Auth guard — redirect to login if not authenticated
  const authenticatedClient = await getAuthenticatedClient();
  if (!authenticatedClient) {
    redirect('/client/login');
  }

  // Verify the authenticated client owns this slug
  if (authenticatedClient.slug !== slug) {
    redirect(`/client/${authenticatedClient.slug}/reviews`);
  }

  return (
    <ReviewsClient slug={slug} plan={authenticatedClient.plan} />
  );
}
