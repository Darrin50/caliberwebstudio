'use client';

import { useState } from 'react';

type Tier = 'starter' | 'growth' | 'domination';

interface Feature {
  id: string;
  name: string;
  tiers: Tier[];
  what: string;
  included: string[];
  sla: string;
  effort: string;
  worth: string;
  note?: string;
}

const features: Feature[] = [
  {
    id: 'custom-website',
    name: 'Custom Website',
    tiers: ['starter', 'growth', 'domination'],
    what: 'A custom-coded website built specifically for your business. No templates. No drag-and-drop builder. Each site is engineered from scratch to rank in your city for your services.',
    included: [
      'Up to 5 pages (Home, About, Services, Contact, Blog)',
      'Professional copywriting with AI assistance',
      'Midjourney-generated realistic photos — no generic stock',
      'SSL certificate and fast hosting included',
      'Monthly content updates: text changes, image swaps, small additions',
      '90+ Google Lighthouse score target',
    ],
    sla: 'Full site delivered in 7 days from kickoff questionnaire.',
    effort: 'You fill out the onboarding questionnaire (15 minutes). We build everything else.',
    worth: 'Agencies charge $3,000–$35,000 for an initial build, plus $100–$500/mo for maintenance. You get both for $197/mo.',
  },
  {
    id: 'mobile-optimized',
    name: 'Mobile Optimized',
    tiers: ['starter', 'growth', 'domination'],
    what: 'Designed mobile-first — the smallest screen is the primary build target, not an afterthought. Over 60% of local service searches happen on a phone.',
    included: [
      'Responsive layout tested from 375px (iPhone SE) to 1440px (desktop)',
      'Tap targets, font sizes, and spacing built for thumb navigation',
      'Core Web Vitals optimized: LCP < 2.5s, CLS < 0.1',
      'Mobile-specific CTAs (click-to-call, sticky bottom bar for directions)',
    ],
    sla: 'Every site ships mobile-optimized. Verified before launch against all breakpoints.',
    effort: 'Zero. Mobile is the default, not an upgrade.',
    worth: 'Mobile performance audits alone cost $500–$2,000 at agencies. Ongoing mobile optimization is typically a separate retainer.',
  },
  {
    id: 'ai-chatbot',
    name: 'AI Chatbot',
    tiers: ['starter', 'growth', 'domination'],
    what: 'A custom-trained AI assistant embedded on your site. It answers customer questions, captures lead info, and books appointments 24/7 — trained on your specific business, not a generic bot.',
    included: [
      'Configured with your services, pricing, FAQs, hours, and location',
      'Captures name, email, phone, and reason for visit from every visitor',
      'Real-time notifications sent to your phone for qualified leads',
      'Calendar integration for direct appointment booking',
      'Monthly conversation review — responses improved based on real data',
      '24/7 availability, <2 second response time',
    ],
    sla: 'Live within 48 hours of site launch. Response improvements within 5 business days of request.',
    effort: 'Zero. You fill out the onboarding questionnaire. We train the chatbot on your business.',
    worth: 'Tidio starts at $29/mo and Intercom at $39/mo — neither is pre-trained on your business, and both require a learning curve to set up.',
  },
  {
    id: 'seo-aeo',
    name: 'SEO + AEO Setup',
    tiers: ['starter', 'growth', 'domination'],
    what: 'Full technical and local SEO built into every page, plus Answer Engine Optimization so your business gets cited when customers ask AI tools (ChatGPT, Perplexity, Google AI Overviews) for what you offer.',
    included: [
      'On-page SEO: meta titles, descriptions, header tags, alt text, internal linking',
      'Schema markup: LocalBusiness, FAQ, Service, Review — validated before launch',
      'Google Search Console connected and configured',
      'Initial citation submissions: Google, Bing, Yelp, Apple Maps, Facebook',
      '5–10 local search terms researched and targeted per site',
      'AEO-formatted content: FAQ sections, direct answers, structured for AI citation',
    ],
    sla: 'Fully implemented at launch. Keyword ranking data visible in first monthly report.',
    effort: 'Zero. You provide business info. We handle all technical implementation.',
    worth: 'Local SEO agencies charge $750–$2,000/mo for what is included here. AEO as a standalone service doesn\'t exist at a reasonable price yet.',
  },
  {
    id: 'gbp',
    name: 'Google Business Profile',
    tiers: ['starter', 'growth', 'domination'],
    what: 'Full setup and ongoing optimization of your Google Business Profile — the listing that appears in Google Maps and local search results when customers search for businesses like yours.',
    included: [
      'Profile completion: categories, description, hours, photos, attributes, service areas',
      'Initial photo upload (yours or Midjourney-generated)',
      'Monthly profile check and update to keep the listing competitive',
      'Review strategy connected to the profile (Growth and Domination)',
    ],
    sla: 'Setup complete on site launch day. Monthly updates within the first 7 days of each month.',
    effort: 'Grant profile access. Provide existing photos if you have them (optional).',
    worth: 'GBP management services charge $150–$300/mo for what is included here.',
  },
  {
    id: '48hr',
    name: '48hr Turnaround',
    tiers: ['starter', 'growth', 'domination'],
    what: 'Edit and content update requests are turned around in 48 business hours or less. Text changes, image swaps, new service additions, link updates — no waiting, no tickets, no extra charges.',
    included: [
      'Unlimited minor edit requests (text, images, links, small layout changes)',
      'Blog post updates and additions',
      'Service description updates as your offerings evolve',
      'Direct communication with Darrin — no support ticket queues',
    ],
    sla: 'Acknowledged same business day. Completed within 48 business hours.',
    effort: 'Send a text or email describing the change. That is all.',
    worth: 'Agencies bill $75–$150/hour for edits. At that rate, two small changes per month justify the entire Starter plan cost.',
    note: 'This covers ongoing edit requests after launch, not the initial build timeline (7-day standard delivery).',
  },
  {
    id: 'blog',
    name: 'Monthly Blog Posts',
    tiers: ['growth', 'domination'],
    what: 'Long-form SEO and AEO-optimized blog posts written for your business and published every month — targeting local search keywords and formatted to earn citations from AI search engines.',
    included: [
      'Growth: 4 posts/month | Domination: 8 posts/month',
      'Each post targets a specific local search keyword you are not yet ranking for',
      'Written to the AI Visibility Blog Playbook standard (CWS proprietary)',
      'FAQ sections structured for Google AI Overviews and Perplexity citations',
      'Midjourney-generated featured image for every post',
      'Internal links to your service pages built into every post',
      'Published directly to your site — zero effort from you',
    ],
    sla: 'Posts delivered and published within each calendar month.',
    effort: 'Optional: approve topic clusters if you have preferences. Otherwise, we handle everything.',
    worth: 'Professional SEO content agencies charge $200–$500 per post. Growth plan\'s 4 posts = $800–$2,000/mo in content value.',
  },
  {
    id: 'reviews',
    name: 'Review Generation',
    tiers: ['growth', 'domination'],
    what: 'Automated review request sequences that turn every completed service into a potential 5-star review — with smart routing to keep negative feedback private before it goes public.',
    included: [
      'Automated SMS + email review requests triggered after service completion',
      'Smart routing: satisfied customers → Google or Yelp, unhappy customers → private feedback first',
      'Review monitoring dashboard across Google, Yelp, and Facebook',
      'Response templates for positive and negative reviews (you respond in <60 seconds)',
      'Monthly review performance report',
      'Goal: 5–10 new reviews per month per client',
    ],
    sla: 'Sequence activated within 48 hours of Growth plan start.',
    effort: 'Provide customer contact info after service. We handle the sequences, routing, and monitoring.',
    worth: 'NiceJob charges $75/mo, Birdeye $299+/mo, Podium $399+/mo. You get the same outcome built into your plan.',
  },
  {
    id: 'social',
    name: 'Social Media Posts',
    tiers: ['growth', 'domination'],
    what: 'AI-generated social media posts written, designed, and published for your business every month — no logging in, no writing, no design tools.',
    included: [
      'Growth: 8 posts/month | Domination: 12 posts/month',
      'Platforms: Facebook and Instagram',
      'Mix of promotional, educational, and engagement content',
      'AI-generated captions and hashtags optimized for local reach',
      'Brand-consistent visuals (Midjourney + Canva templates)',
      'Scheduled and auto-published — you never have to touch it',
    ],
    sla: 'Month 1 content calendar delivered by Day 14 of subscription.',
    effort: 'Zero. A copy of your logo and brand colors is enough to start.',
    worth: 'Social media management agencies charge $300–$1,500/mo for what is included here.',
  },
  {
    id: 'competitor-monitoring',
    name: 'Competitor Monitoring',
    tiers: ['domination'],
    what: 'Ongoing tracking of where your local competitors are ranking and being cited — so every strategic decision is based on real gap data, not guesswork.',
    included: [
      'Competitor keyword ranking analysis for your top 10 target terms',
      'Identifies where competitors are cited by AI tools (Perplexity, ChatGPT, Gemini) and you are not',
      'Monthly gap report: what they are doing, what you can do better',
      'Content and optimization recommendations driven by competitor data',
    ],
    sla: 'Included in the monthly AI visibility report.',
    effort: 'Zero. You provide competitor business names at onboarding (optional — we research them ourselves otherwise).',
    worth: 'SEO competitive analysis via Semrush or Ahrefs runs $99–$299/mo just for the tool access, before any analysis work.',
  },
  {
    id: 'ai-citation',
    name: 'AI Citation Tracking',
    tiers: ['domination'],
    what: 'Weekly monitoring of whether your business gets cited when potential customers ask AI search engines the questions your business should be answering.',
    included: [
      'Weekly scans across Perplexity, ChatGPT, Gemini, and Google AI Overviews',
      'Tracks which queries cite your business — and which should but don\'t',
      'Identifies content gaps driving missing citations',
      'Content strategy adjustments based on citation data',
      'Full monthly AI visibility report with citation trends',
    ],
    sla: 'Baseline established in month 1. First citation trend report delivered in month 2.',
    effort: 'Zero.',
    worth: 'No affordable standalone tool exists. Enterprise AI citation tracking starts at $499+/mo. This capability is unavailable to small businesses outside of Caliber.',
  },
  {
    id: 'priority-support',
    name: 'Priority Support',
    tiers: ['domination'],
    what: 'Same-day response on everything — requests, questions, issues, strategy. Domination clients do not wait.',
    included: [
      'Direct access to Darrin via phone, text, and email',
      'Same-day response on all requests — not business days, same day',
      'Proactive outreach when Darrin spots something to fix or optimize (you don\'t have to ask)',
      'No ticket queues, no automated reply sequences, no "we\'ll get back to you in 3–5 days"',
    ],
    sla: 'Same-day response. Period. Domination clients are the top of the queue.',
    effort: 'Reach out however you prefer.',
    worth: 'Dedicated account managers at mid-size agencies run $500–$2,000/mo as a standalone add-on.',
  },
  {
    id: 'growth-call',
    name: 'Dedicated Growth Call',
    tiers: ['domination'],
    what: 'Bi-weekly calls with Darrin focused on growth strategy, performance review, and proactive optimization — not just answering questions, but actively managing your growth.',
    included: [
      'Bi-weekly calls or Loom video check-ins (call or async per your preference)',
      'Performance review: rankings, leads, reviews, AI citations',
      'Strategy discussion: what is working, what to prioritize next month',
      'Proactive recommendations — Darrin brings the agenda, not just responds to yours',
      'Accountability: are the recommendations from last month implemented?',
    ],
    sla: 'Bi-weekly cadence maintained. Darrin initiates scheduling.',
    effort: 'Show up to the call. Darrin prepares the agenda.',
    worth: 'Growth plan includes a monthly strategy call. Domination doubles the frequency and adds proactive account management.',
    note: 'Growth plan clients receive a 30-minute Monthly Strategy Call. Domination upgrades this to dedicated bi-weekly management.',
  },
];

const tierColors: Record<Tier, string> = {
  starter: '#16a34a',
  growth: '#0891b2',
  domination: '#2563eb',
};

const tierLabels: Record<Tier, string> = {
  starter: 'Starter',
  growth: 'Growth',
  domination: 'Domination',
};

export default function PricingFeatureBreakdown() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div>
      {features.map((f) => {
        const isOpen = openId === f.id;
        return (
          <div
            key={f.id}
            style={{
              borderBottom: '1px solid var(--border-color, rgba(255,255,255,0.07))',
              transition: 'background 0.2s',
              background: isOpen ? 'rgba(255,255,255,0.02)' : 'transparent',
            }}
          >
            <button
              onClick={() => setOpenId(isOpen ? null : f.id)}
              aria-expanded={isOpen}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                padding: 'clamp(18px,2.5vw,24px) clamp(20px,3vw,32px)',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 'clamp(0.9rem,1.8vw,1.05rem)', color: 'var(--text-primary, #fff)' }}>
                  {f.name}
                </span>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {f.tiers.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: '9px',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: tierColors[t],
                        background: `${tierColors[t]}18`,
                        border: `1px solid ${tierColors[t]}35`,
                        borderRadius: '100px',
                        padding: '3px 8px',
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {tierLabels[t]}
                    </span>
                  ))}
                </div>
              </div>
              <span
                style={{
                  flexShrink: 0,
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  border: '1px solid rgba(168,184,200,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.1rem',
                  lineHeight: 1,
                  transition: 'transform 0.25s ease',
                  transform: isOpen ? 'rotate(45deg)' : 'none',
                  color: 'var(--dim, rgba(255,255,255,0.4))',
                }}
              >
                +
              </span>
            </button>

            <div
              style={{
                maxHeight: isOpen ? '800px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.35s ease',
              }}
            >
              <div style={{ padding: '0 clamp(20px,3vw,32px) clamp(20px,3vw,28px)' }}>
                <p style={{ fontSize: '0.9rem', color: 'var(--chrome, rgba(255,255,255,0.7))', lineHeight: 1.75, marginBottom: '20px' }}>
                  {f.what}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '16px' }}>
                  {/* What's included */}
                  <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '16px 18px' }}>
                    <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '10px', fontWeight: 700 }}>
                      What&apos;s Included
                    </p>
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '7px' }}>
                      {f.included.map((item) => (
                        <li key={item} style={{ display: 'flex', gap: '8px', fontSize: '0.82rem', color: 'var(--silver, rgba(255,255,255,0.8))', lineHeight: 1.5 }}>
                          <span style={{ color: '#34d399', flexShrink: 0, fontSize: '0.85rem', lineHeight: 1.5 }}>✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* SLA / turnaround */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '14px 16px' }}>
                      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '6px', fontWeight: 700 }}>
                        SLA / Turnaround
                      </p>
                      <p style={{ fontSize: '0.82rem', color: 'var(--silver, rgba(255,255,255,0.8))', lineHeight: 1.6 }}>{f.sla}</p>
                    </div>

                    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '14px 16px' }}>
                      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '6px', fontWeight: 700 }}>
                        What You Have to Do
                      </p>
                      <p style={{ fontSize: '0.82rem', color: 'var(--silver, rgba(255,255,255,0.8))', lineHeight: 1.6 }}>{f.effort}</p>
                    </div>

                    <div style={{ background: 'rgba(30,61,143,0.08)', border: '1px solid rgba(30,61,143,0.2)', borderRadius: '10px', padding: '14px 16px' }}>
                      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(30,61,143,0.7)', marginBottom: '6px', fontWeight: 700 }}>
                        What It&apos;s Worth Separately
                      </p>
                      <p style={{ fontSize: '0.82rem', color: 'var(--chrome, rgba(255,255,255,0.65))', lineHeight: 1.6 }}>{f.worth}</p>
                    </div>

                    {f.note && (
                      <div style={{ background: 'rgba(217,119,6,0.06)', border: '1px solid rgba(217,119,6,0.2)', borderRadius: '10px', padding: '12px 14px' }}>
                        <p style={{ fontSize: '0.78rem', color: 'rgba(251,191,36,0.8)', lineHeight: 1.6 }}>
                          <strong style={{ fontWeight: 700 }}>Note: </strong>{f.note}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
