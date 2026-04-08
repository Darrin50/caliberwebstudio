import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAuthenticatedClient } from '@/lib/portal/auth';
import { hasFeature } from '@/lib/portal/types';
import RankingsClient from './RankingsClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `Search Rankings | Caliber Portal`,
    description: 'Track keyword rankings and SEO performance',
  };
}

export default async function RankingsPage({
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

  // Check if plan has access to rankings
  const hasRankingsAccess = hasFeature(client.plan, 'basic_rankings');

  if (!hasRankingsAccess) {
    return (
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#0a0a0e',
          padding: '40px 20px',
        }}
      >
        <div
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            padding: '40px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <h1
            style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#fff',
              marginBottom: '16px',
              fontFamily: 'Syne, sans-serif',
            }}
          >
            Rankings Not Available
          </h1>
          <p
            style={{
              fontSize: '16px',
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: '24px',
              lineHeight: '1.6',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Search rankings tracking is available on Growth and Domination plans.
            Your current plan is <strong>{client.plan.charAt(0).toUpperCase() + client.plan.slice(1)}</strong>.
          </p>
          <a
            href={`/portal/${slug}/billing`}
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              backgroundColor: '#2563eb',
              color: '#fff',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '600',
              fontFamily: 'Inter, sans-serif',
              transition: 'background-color 0.2s',
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#1d4ed8';
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#2563eb';
            }}
          >
            Upgrade Plan
          </a>
        </div>
      </div>
    );
  }

  return <RankingsClient slug={slug} />;
}
