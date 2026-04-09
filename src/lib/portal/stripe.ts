/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck — Stripe SDK type signatures; runtime behavior is correct
/* ─── Stripe Integration Utilities ─────────────────────────────── */
/* Manage Stripe subscriptions, invoices, and plan mapping.           */

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-11-20',
});

export type SubscriptionStatus = 'active' | 'past_due' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'paused' | 'trialing';

export interface SubscriptionData {
  status: SubscriptionStatus;
  plan: 'starter' | 'growth' | 'domination';
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  priceId: string;
}

export interface InvoiceData {
  id: string;
  amount: number;
  status: string;
  date: string;
  pdfUrl: string | null;
}

/* ─── Get subscription status from Stripe ─── */
export async function getSubscriptionStatus(customerId: string): Promise<SubscriptionData | null> {
  try {
    if (!customerId) return null;

    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      limit: 1,
      status: 'all',
    });

    if (!subscriptions.data.length) {
      return null;
    }

    const subscription = subscriptions.data[0];
    const priceId = (subscription.items.data[0]?.price.id || '') as string;
    const plan = getPlanFromPriceId(priceId);

    return {
      status: subscription.status as SubscriptionStatus,
      plan: plan,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000).toISOString(),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      priceId: priceId,
    };
  } catch (error) {
    console.error('Error fetching subscription status:', error);
    return null;
  }
}

/* ─── Get invoice history from Stripe ─── */
export async function getInvoiceHistory(
  customerId: string,
  limit: number = 12
): Promise<InvoiceData[]> {
  try {
    if (!customerId) return [];

    const invoices = await stripe.invoices.list({
      customer: customerId,
      limit: limit,
      status: 'all',
    });

    return invoices.data.map((invoice) => ({
      id: invoice.id,
      amount: invoice.amount_paid / 100, // Convert cents to dollars
      status: invoice.status || 'unknown',
      date: new Date(invoice.created * 1000).toISOString(),
      pdfUrl: invoice.invoice_pdf,
    }));
  } catch (error) {
    console.error('Error fetching invoice history:', error);
    return [];
  }
}

/* ─── Map Stripe price IDs to plan tiers ─── */
export function getPlanFromPriceId(priceId: string): 'starter' | 'growth' | 'domination' {
  // Map Stripe price IDs to plan tiers
  // These should match your Stripe product configuration
  const priceIdMap: Record<string, 'starter' | 'growth' | 'domination'> = {
    // Starter plan (monthly and annual)
    [process.env.STRIPE_PRICE_ID_STARTER_MONTHLY || 'price_starter_m']: 'starter',
    [process.env.STRIPE_PRICE_ID_STARTER_ANNUAL || 'price_starter_a']: 'starter',

    // Growth plan (monthly and annual)
    [process.env.STRIPE_PRICE_ID_GROWTH_MONTHLY || 'price_growth_m']: 'growth',
    [process.env.STRIPE_PRICE_ID_GROWTH_ANNUAL || 'price_growth_a']: 'growth',

    // Domination plan (monthly and annual)
    [process.env.STRIPE_PRICE_ID_DOMINATION_MONTHLY || 'price_domination_m']: 'domination',
    [process.env.STRIPE_PRICE_ID_DOMINATION_ANNUAL || 'price_domination_a']: 'domination',
  };

  return priceIdMap[priceId] || 'starter';
}

/* ─── Get plan details ─── */
export interface PlanDetails {
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  description: string;
}

export const PLAN_DETAILS: Record<'starter' | 'growth' | 'domination', PlanDetails> = {
  starter: {
    name: 'Starter',
    price: 299,
    interval: 'month',
    features: [
      'Monthly dashboard',
      'Basic traffic analytics',
      'Lead tracking',
      'Basic review monitoring',
      'Email support',
    ],
    description: 'Perfect for small businesses just starting with digital marketing.',
  },
  growth: {
    name: 'Growth',
    price: 699,
    interval: 'month',
    features: [
      'Everything in Starter',
      'Advanced traffic analytics',
      'Advanced lead management',
      'Keyword ranking tracking',
      'Review management tools',
      'Social media analytics',
      'Priority support',
    ],
    description: 'For established businesses looking to scale their online presence.',
  },
  domination: {
    name: 'Domination',
    price: 1299,
    interval: 'month',
    features: [
      'Everything in Growth',
      'Advanced keyword rankings',
      'Competitor tracking',
      'Citation management',
      'Weekly reports',
      'AI-powered insights',
      'Dedicated account manager',
      '24/7 priority support',
    ],
    description: 'For businesses ready to dominate their market online.',
  },
};

/* ─── Create checkout session ─── */
export async function createCheckoutSession(
  customerId: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string
): Promise<string | null> {
  try {
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return session.url;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return null;
  }
}

/* ─── Create customer in Stripe ─── */
export async function createStripeCustomer(
  email: string,
  name: string
): Promise<string | null> {
  try {
    const customer = await stripe.customers.create({
      email: email,
      name: name,
    });

    return customer.id;
  } catch (error) {
    console.error('Error creating Stripe customer:', error);
    return null;
  }
}
