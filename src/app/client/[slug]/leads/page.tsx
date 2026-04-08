import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import LeadsClient from './LeadsClient';

interface LeadsPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  { params }: LeadsPageProps,
): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Leads | Caliber Client Portal`,
    description: 'Track and manage incoming leads',
  };
}

export default async function LeadsPage({ params }: LeadsPageProps) {
  const { slug } = await params;

  // TODO: Add auth check via session
  // const session = await getSession();
  // if (!session) redirect('/login');

  // TODO: Verify client ownership
  // const client = await getClient(slug);
  // if (!client || client.userId !== session.user.id) redirect('/');

  const plan = 'growth'; // Mock for now

  return (
    <LeadsClient slug={slug} plan={plan} />
  );
}
