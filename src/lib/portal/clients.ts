/* ─── Client Registry ──────────────────────────────────────────── */
/* Each client site managed by Caliber Web Studio gets an entry here.
   This is the single source of truth for portal access + API keys.   */

import type { ClientConfig } from './types';

const clients: ClientConfig[] = [
  {
    slug: 'detroit-cuts',
    businessName: 'Detroit Cuts Barbershop',
    ownerName: 'Kevin Robinson',
    email: 'kevin@detroitcuts.com',
    phone: '(313) 555-0101',
    plan: 'growth',
    industry: 'barbershop',
    city: 'Detroit',
    state: 'MI',
    website: 'https://detroitcuts.com',
    googleAnalyticsPropertyId: process.env.GA_PROPERTY_DETROIT_CUTS,
    googleSearchConsoleProperty: process.env.GSC_PROPERTY_DETROIT_CUTS,
    googleBusinessProfileId: process.env.GBP_ID_DETROIT_CUTS,
    stripeCustomerId: process.env.STRIPE_CUSTOMER_DETROIT_CUTS,
    stripeSubscriptionId: process.env.STRIPE_SUB_DETROIT_CUTS,
    createdAt: '2026-02-15',
    active: true,
  },
  {
    slug: 'metro-plumbing',
    businessName: 'Metro Plumbing Detroit',
    ownerName: 'James Wilson',
    email: 'james@metroplumbing.com',
    phone: '(313) 555-0202',
    plan: 'starter',
    industry: 'plumbing',
    city: 'Detroit',
    state: 'MI',
    website: 'https://metroplumbingdetroit.com',
    googleAnalyticsPropertyId: process.env.GA_PROPERTY_METRO_PLUMBING,
    googleSearchConsoleProperty: process.env.GSC_PROPERTY_METRO_PLUMBING,
    googleBusinessProfileId: process.env.GBP_ID_METRO_PLUMBING,
    stripeCustomerId: process.env.STRIPE_CUSTOMER_METRO_PLUMBING,
    stripeSubscriptionId: process.env.STRIPE_SUB_METRO_PLUMBING,
    createdAt: '2026-03-01',
    active: true,
  },
  {
    slug: 'luxe-salon',
    businessName: 'Luxe Hair Studio',
    ownerName: 'Tanya Brooks',
    email: 'tanya@luxehairstudio.com',
    phone: '(313) 555-0303',
    plan: 'domination',
    industry: 'salon',
    city: 'Dearborn',
    state: 'MI',
    website: 'https://luxehairstudio.com',
    googleAnalyticsPropertyId: process.env.GA_PROPERTY_LUXE_SALON,
    googleSearchConsoleProperty: process.env.GSC_PROPERTY_LUXE_SALON,
    googleBusinessProfileId: process.env.GBP_ID_LUXE_SALON,
    stripeCustomerId: process.env.STRIPE_CUSTOMER_LUXE_SALON,
    stripeSubscriptionId: process.env.STRIPE_SUB_LUXE_SALON,
    createdAt: '2026-01-20',
    active: true,
  },
];

export function getClient(slug: string): ClientConfig | undefined {
  return clients.find((c) => c.slug === slug && c.active);
}

export function getAllClients(): ClientConfig[] {
  return clients.filter((c) => c.active);
}

export function getClientByEmail(email: string): ClientConfig | undefined {
  return clients.find(
    (c) => c.email.toLowerCase() === email.toLowerCase() && c.active
  );
}
