/* ─── Portal Types ─────────────────────────────────────────────── */

export type PlanTier = 'starter' | 'growth' | 'domination';

export interface ClientConfig {
  slug: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  plan: PlanTier;
  industry: string;
  city: string;
  state: string;
  website: string;
  googleAnalyticsPropertyId?: string;
  googleSearchConsoleProperty?: string;
  googleBusinessProfileId?: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  createdAt: string;
  active: boolean;
}

/* ─── Analytics / Dashboard ─── */

export interface KPIMetric {
  label: string;
  value: string | number;
  change: number; // percentage change
  changeLabel: string;
  trend: 'up' | 'down' | 'flat';
  icon: string;
}

export interface TrafficDataPoint {
  date: string;
  sessions: number;
  pageviews: number;
  users: number;
  bounceRate: number;
  avgSessionDuration: number;
}

export interface TrafficSource {
  source: string;
  sessions: number;
  percentage: number;
}

export interface TopPage {
  path: string;
  pageviews: number;
  avgTimeOnPage: number;
  bounceRate: number;
}

/* ─── Rankings ─── */

export interface KeywordRanking {
  keyword: string;
  position: number;
  previousPosition: number;
  change: number;
  impressions: number;
  clicks: number;
  ctr: number;
  url: string;
}

export interface RankingOverTime {
  date: string;
  avgPosition: number;
  totalImpressions: number;
  totalClicks: number;
}

/* ─── Reviews ─── */

export interface Review {
  id: string;
  platform: 'google' | 'yelp' | 'facebook';
  author: string;
  rating: number;
  text: string;
  date: string;
  replied: boolean;
  replyText?: string;
}

export interface ReviewSummary {
  totalReviews: number;
  averageRating: number;
  ratingDistribution: Record<1 | 2 | 3 | 4 | 5, number>;
  reviewsThisMonth: number;
  responseRate: number;
}

/* ─── Leads ─── */

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  source: 'contact_form' | 'chatbot' | 'phone' | 'email';
  message?: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  createdAt: string;
  notes?: string;
}

export interface LeadSummary {
  totalLeads: number;
  newLeads: number;
  conversionRate: number;
  leadsBySource: Record<string, number>;
  leadsOverTime: Array<{ date: string; count: number }>;
}

/* ─── Plan Feature Gating ─── */

export const PLAN_FEATURES: Record<PlanTier, string[]> = {
  starter: [
    'dashboard_overview',
    'basic_traffic',
    'basic_leads',
    'basic_reviews',
    'monthly_report',
  ],
  growth: [
    'dashboard_overview',
    'basic_traffic',
    'advanced_traffic',
    'basic_leads',
    'advanced_leads',
    'basic_reviews',
    'review_management',
    'basic_rankings',
    'monthly_report',
    'social_analytics',
  ],
  domination: [
    'dashboard_overview',
    'basic_traffic',
    'advanced_traffic',
    'basic_leads',
    'advanced_leads',
    'basic_reviews',
    'review_management',
    'basic_rankings',
    'advanced_rankings',
    'citation_tracking',
    'monthly_report',
    'weekly_report',
    'social_analytics',
    'competitor_tracking',
    'ai_insights',
  ],
};

export function hasFeature(plan: PlanTier, feature: string): boolean {
  return PLAN_FEATURES[plan]?.includes(feature) ?? false;
}
