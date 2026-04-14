import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { posts, getPost } from "../posts";

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `https://caliberwebstudio.com/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://caliberwebstudio.com/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      images: post.thumbnail ? [{ url: post.thumbnail, width: 1200, height: 630, alt: post.title }] : [],
    },
  };
}

function extractFirstImage(html: string): { src: string; alt: string } | null {
  const match = html.match(/<img[^>]+src="([^"]+)"[^>]*alt="([^"]*)"[^>]*>/);
  if (!match) return null;
  return { src: match[1], alt: match[2] };
}

function countWords(html: string): number {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').filter(Boolean).length;
}

function deriveKeywords(title: string, category: string): string[] {
  const stopwords = new Set(['and', 'the', 'for', 'in', 'of', 'to', 'a', 'an', 'is', 'are', 'was', 'were', 'that', 'this', 'with', 'what', 'how', 'why', 'does', 'your', 'our', 'not', 'but', 'or', 'on', 'at', 'by', 'as', 'do', 'can']);
  const titleWords = title.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(w => w.length >= 4 && !stopwords.has(w));
  return [...new Set([category, 'Detroit', 'web design', 'small business', ...titleWords.slice(0, 6)])];
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const heroImageFromContent = extractFirstImage(post.content);
  const heroImage = post.thumbnail
    ? { src: post.thumbnail, alt: post.title }
    : heroImageFromContent;
  const related = posts.filter((p) => post.relatedSlugs.includes(p.slug)).slice(0, 4);

  const wordCount = countWords(post.content);
  const keywords = deriveKeywords(post.title, post.category);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    ...(post.thumbnail && { image: { "@type": "ImageObject", url: post.thumbnail, width: 1200, height: 630 } }),
    datePublished: post.date,
    dateModified: post.date,
    wordCount,
    keywords: keywords.join(', '),
    author: { "@type": "Organization", name: "Caliber Web Studio", url: "https://caliberwebstudio.com" },
    publisher: {
      "@type": "Organization",
      name: "Caliber Web Studio",
      url: "https://caliberwebstudio.com",
      logo: { "@type": "ImageObject", url: "https://caliberwebstudio.com/logo-full-hero.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://caliberwebstudio.com/blog/${post.slug}` },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://caliberwebstudio.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://caliberwebstudio.com/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://caliberwebstudio.com/blog/${post.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Nav />
      <main style={{ minHeight: "100vh", paddingTop: "clamp(60px, 8vw, 80px)", paddingBottom: "clamp(60px, 8vw, 80px)" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 clamp(16px, 6vw, 24px)" }}>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: "32px", fontSize: "0.875rem", color: "var(--text-secondary, rgba(255,255,255,0.7))" }}>
            <Link href="/" style={{ color: "var(--text-secondary, rgba(255,255,255,0.7))", textDecoration: "none" }}>Home</Link>
            <span style={{ margin: "0 8px" }}>›</span>
            <Link href="/blog" style={{ color: "var(--text-secondary, rgba(255,255,255,0.7))", textDecoration: "none" }}>Blog</Link>
            <span style={{ margin: "0 8px" }}>›</span>
            <span style={{ color: "var(--text-primary, #fff)" }}>{post.category}</span>
          </nav>

          {/* Hero Image */}
          {heroImage && (
            <div style={{ marginBottom: "40px", borderRadius: "16px", overflow: "hidden", border: "1px solid var(--border-color, rgba(255,255,255,0.08))" }}>
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                width={1200}
                height={480}
                style={{ width: "100%", height: "auto", maxHeight: "480px", objectFit: "cover", display: "block" }}
                priority
                sizes="(max-width: 760px) 100vw, 760px"
              />
            </div>
          )}

          {/* Article Header */}
          <header style={{ marginBottom: "40px" }}>
            <p style={{ fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent, #00d4ff)", marginBottom: "12px" }}>
              {post.category}
            </p>
            <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 800, lineHeight: 1.2, color: "var(--text-primary, #fff)", marginBottom: "16px" }}>
              {post.title}
            </h1>
            <p style={{ fontSize: "1.1rem", color: "var(--text-secondary, rgba(255,255,255,0.7))", lineHeight: 1.7, marginBottom: "20px" }}>
              {post.description}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--text-secondary, rgba(255,255,255,0.5))" }}>
                By <strong style={{ color: "var(--text-primary, #fff)" }}>Caliber Web Studio</strong>
              </span>
              <span style={{ color: "var(--border-color, rgba(255,255,255,0.2))" }}>·</span>
              <time dateTime={post.date} style={{ fontSize: "0.85rem", color: "var(--text-secondary, rgba(255,255,255,0.5))" }}>
                {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </time>
            </div>
          </header>

          <hr style={{ border: "none", borderTop: "1px solid var(--border-color, rgba(255,255,255,0.1))", marginBottom: "40px" }} />

          {/* Article Body */}
          <article
            className="blog-article-body"
            style={{ color: "var(--text-secondary, rgba(255,255,255,0.8))", lineHeight: 1.8, fontSize: "1.05rem" }}
            dangerouslySetInnerHTML={{ __html: post.content
              .replace(/<h2>/g, '<h2 style="font-size:clamp(1.2rem,3vw,1.5rem);font-weight:700;color:var(--text-primary,#fff);margin:2em 0 0.75em;line-height:1.3">')
              .replace(/<h3>/g, '<h3 style="font-size:clamp(1rem,2.5vw,1.2rem);font-weight:700;color:var(--text-primary,#fff);margin:1.5em 0 0.5em">')
              .replace(/<p>/g, '<p style="margin:0 0 1.25em;font-size:clamp(1rem,2vw,1.075rem);line-height:1.8">')
              .replace(/<ul>/g, '<ul style="margin:0 0 1.25em;padding-left:1.5em">')
              .replace(/<ol>/g, '<ol style="margin:0 0 1.25em;padding-left:1.5em">')
              .replace(/<li>/g, '<li style="margin-bottom:0.5em;font-size:clamp(1rem,2vw,1.075rem)">')
              .replace(/<a /g, '<a style="color:var(--accent,#00d4ff);text-decoration:underline;text-underline-offset:3px" ')
              .replace(/<strong>/g, '<strong style="color:var(--text-primary,#fff);font-weight:700">')
            }}
          />

          <hr style={{ border: "none", borderTop: "1px solid var(--border-color, rgba(255,255,255,0.1))", margin: "48px 0" }} />

          {/* CTA */}
          <div className="blog-cta-banner" style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.08) 0%, rgba(99,102,241,0.08) 100%)", border: "1px solid rgba(0,212,255,0.2)", borderRadius: "16px", padding: "clamp(24px,5vw,36px)", textAlign: "center", marginBottom: "48px" }}>
            <h2 style={{ fontSize: "clamp(1.2rem,3vw,1.5rem)", fontWeight: 700, color: "var(--text-primary, #fff)", marginBottom: "12px" }}>
              Ready to Grow Your Detroit Business Online?
            </h2>
            <p style={{ color: "var(--text-secondary, rgba(255,255,255,0.7))", marginBottom: "24px", fontSize: "clamp(0.875rem,2vw,0.95rem)", lineHeight: 1.7 }}>
              Custom websites, local SEO, AI chatbots, and review automation — starting at $197/mo with $0 down.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/#pricing" style={{ padding: "12px 24px", background: "var(--accent, #00d4ff)", color: "#000", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "0.9rem" }}>
                View Plans
              </Link>
              <Link href="/#contact" style={{ padding: "12px 24px", background: "transparent", border: "1px solid var(--accent, #00d4ff)", color: "var(--accent, #00d4ff)", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "0.9rem" }}>
                Free Consultation
              </Link>
            </div>
          </div>

          {/* Service Areas */}
          <section style={{ marginBottom: "48px", padding: "24px", background: "rgba(30,61,143,0.06)", border: "1px solid rgba(30,61,143,0.15)", borderRadius: "12px" }}>
            <p style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(208,216,224,0.5)", marginBottom: "12px" }}>
              Serving Metro Detroit
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {[
                { name: "Detroit", slug: "detroit" },
                { name: "Dearborn", slug: "dearborn" },
                { name: "Southfield", slug: "southfield" },
                { name: "Warren", slug: "warren" },
                { name: "Sterling Heights", slug: "sterling-heights" },
                { name: "Livonia", slug: "livonia" },
                { name: "Troy", slug: "troy" },
                { name: "Royal Oak", slug: "royal-oak" },
                { name: "Farmington Hills", slug: "farmington-hills" },
                { name: "Ann Arbor", slug: "ann-arbor" },
              ].map((city) => (
                <Link
                  key={city.slug}
                  href={`/areas/${city.slug}`}
                  style={{ fontSize: "0.8rem", padding: "6px 14px", background: "rgba(30,61,143,0.12)", border: "1px solid rgba(30,61,143,0.25)", borderRadius: "4px", color: "rgba(208,216,224,0.7)", textDecoration: "none" }}
                >
                  {city.name}
                </Link>
              ))}
            </div>
          </section>

          {/* Related Posts */}
          {related.length > 0 && (
            <section>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary, #fff)", marginBottom: "20px" }}>
                Related Articles
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))", gap: "16px" }}>
                {related.map((rel) => (
                  <Link key={rel.slug} href={`/blog/${rel.slug}`}
                    className="blog-related-card"
                    style={{ display: "block", background: "var(--card-bg, rgba(255,255,255,0.04))", border: "1px solid var(--border-color, rgba(255,255,255,0.08))", borderRadius: "12px", padding: "20px", textDecoration: "none" }}>
                    <p style={{ fontSize: "0.75rem", color: "var(--accent, #00d4ff)", marginBottom: "8px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      {rel.category}
                    </p>
                    <p style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary, #fff)", lineHeight: 1.4, margin: 0 }}>
                      {rel.title}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div style={{ marginTop: "40px", textAlign: "center" }}>
            <Link href="/blog" style={{ fontSize: "0.9rem", color: "var(--text-secondary, rgba(255,255,255,0.6))", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}>
              ← Back to all articles
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
