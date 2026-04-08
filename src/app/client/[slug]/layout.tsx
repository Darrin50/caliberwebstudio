import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getAuthenticatedClient } from '@/lib/portal/auth';
import { getClient } from '@/lib/portal/clients';
import PortalNav from '@/components/portal/PortalNav';
import PortalProvider from '@/components/portal/PortalContext';

interface ClientLayoutProps {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}

export const metadata = {
  title: 'Client Portal — Caliber Web Studio',
  description: 'Dashboard for your Caliber Web Studio client portal.',
};

export default async function ClientLayout({
  children,
  params,
}: ClientLayoutProps) {
  const { slug } = await params;

  // Check authentication
  const authenticatedClient = await getAuthenticatedClient();
  if (!authenticatedClient || authenticatedClient.slug !== slug) {
    redirect(`/client/login?redirect=/client/${slug}`);
  }

  // Load client config
  const client = getClient(slug);
  if (!client) {
    redirect('/client/login');
  }

  return (
    <PortalProvider
      slug={client.slug}
      businessName={client.businessName}
      plan={client.plan}
      email={client.email}
    >
      <div
        style={{
          display: 'flex',
          minHeight: '100dvh',
          backgroundColor: 'var(--bg)',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-inter), Inter, sans-serif',
        }}
      >
        {/* Sidebar Navigation */}
        <PortalNav
          slug={client.slug}
          businessName={client.businessName}
          plan={client.plan}
        />

        {/* Main Content Area */}
        <main
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto',
          }}
        >
          {children}
        </main>
      </div>
    </PortalProvider>
  );
}
