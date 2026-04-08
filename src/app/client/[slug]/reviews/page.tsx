import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import ReviewsClient from './ReviewsClient';

interface ReviewsPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  { params }: ReviewsPageProps,
): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Reviews | Caliber Client Portal`,
    description: 'Manage and monitor customer reviews',
  };
}

export default async function ReviewsPage({ params }: ReviewsPageProps) {
  const { slug } = await params;

  // TODO: Add auth check via session
  // const session = await getSession();
  // if (!session) redirect('/login');

  // TODO: Verify client ownership
  // const client = await getClient(slug);
  // if (!client || client.userId !== session.user.id) redirect('/');

  // TODO: Check plan
  // const plan = client.plan; // basic, growth, domination

  const plan = 'growth'; // Mock for now

  return (
    <ReviewsClient slug={slug} plan={plan} />
  );
}
