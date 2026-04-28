import type { MetadataRoute } from "next";
import { posts } from "@/app/blog/posts";
import { industries } from "@/app/industries/data";
import { cities } from "@/app/areas/cities";
import { ALL_DEMO_SLUGS } from "@/lib/demos-library-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.caliberwebstudio.com";

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const industryEntries: MetadataRoute.Sitemap = industries.map((ind) => ({
    url: `${baseUrl}/industries/${ind.slug}`,
    lastModified: new Date("2026-04-24"),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const priorityCities = new Set([
    "detroit", "dearborn", "southfield", "warren", "sterling-heights",
    "livonia", "troy", "royal-oak", "farmington-hills", "ann-arbor",
  ]);

  const areaEntries: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/areas/${city.slug}`,
    lastModified: new Date("2026-04-24"),
    changeFrequency: "monthly",
    priority: priorityCities.has(city.slug) ? 0.9 : 0.8,
  }));

  const demoEntries: MetadataRoute.Sitemap = ALL_DEMO_SLUGS.map((slug) => ({
    url: `${baseUrl}/demos/${slug}`,
    lastModified: new Date("2026-04-24"),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date("2026-04-24"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: new Date("2026-04-24"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/services/ai-chatbot`, lastModified: new Date("2026-04-24"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/services/review-automation`, lastModified: new Date("2026-04-24"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/pricing`, lastModified: new Date("2026-04-24"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/startup-complete`, lastModified: new Date("2026-04-24"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: new Date("2026-04-24"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/case-studies`, lastModified: new Date("2026-04-25"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/industries`, lastModified: new Date("2026-04-24"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/areas`, lastModified: new Date("2026-04-24"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/process`, lastModified: new Date("2026-04-24"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/faq`, lastModified: new Date("2026-04-24"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/compare`, lastModified: new Date("2026-04-24"), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/results`, lastModified: new Date("2026-04-24"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/guarantee`, lastModified: new Date("2026-04-24"), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/referral`, lastModified: new Date("2026-04-24"), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/detroit-med-spa-websites`, lastModified: new Date("2026-04-21"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/detroit`, lastModified: new Date("2026-04-24"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/work`, lastModified: new Date("2026-04-24"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/plumbers`, lastModified: new Date("2026-04-24"), changeFrequency: "monthly", priority: 0.8 },
    ...industryEntries,
    ...areaEntries,
    ...blogEntries,
    ...demoEntries,
  ];
}
