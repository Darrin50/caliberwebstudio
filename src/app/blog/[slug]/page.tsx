import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
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
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = posts.filter((p) => post.relatedSlugs.includes(p.slug)).slice(0, 4);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: "Caliber Web Studio", url: "https://caliberwebstudio.com" },
    publisher: { "@type": "Organization", name: "Caliber Web Studio", url: "https://caliberwebstudio.com" },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://caliberwebstudio.com/blog/${post.slug}` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Nav />
      <main style={{ minHeight: "100vh", paddingTop: "80px", paddingBottom: "80px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 24px" }}>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: "32px", fontSize: "0.875rem", color: "var(--text-secondary, rgba(255,255,255,0.55))" }}>
            <Link href="/" style={{ color: "var(--text-secondary, rgba(255,255,255,0.55))", textDecoration: "none" }}>Home</Link>
            <span style={{ margin: "0 8px" }}>›</span>
            <Link href="/blog" style={{ color: "var(--text-secondary, rgba(255,255,255,0.55))", textDecoration: "none" }}>Blog</Link>
            <span style={{ margin: "0 8px" }}>›</span>
            <span style={{ color: "var(--text-primary, #fff)" }}>{post.category}</span>
          </nav>

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
            style={{ color: "var(--text-secondary, rgba(255,255,255,0.8))", lineHeight: 1.8, fontSize: "1.05rem" }}
            dangerouslySetInnerHTML={{ __html: post.content
              .replace(/<h2>/g, '<h2 style="font-size:clamp(1.2rem,3vw,1.5rem);font-weight:700;color:var(--text-primary,#fff);margin:2em 0 0.75em;line-height:1.3">')
              .replace(/<h3>/g, '<h3 style="font-size:clamp(1rem,2.5vw,1.2rem);font-weight:700;color:var(--text-primary,#fff);margin:1.5em 0 0.5em">')
              .replace(/<p>/g, '<p style="margin:0 0 1.25em;font-size:clamp(0.95rem,2vw,1.05rem);line-height:1.8">')
              .replace(/<ul>/g, '<ul style="margin:0 0 1.25em;padding-left:1.5em">')
              .replace(/<ol>/g, '<ol style="margin:0 0 1.25em;padding-left:1.5em">')
              .replace(/<li>/g, '<li style="margin-bottom:0.5em;font-size:clamp(0.95rem,2vw,1.05rem)">')
              .replace(/<a /g, '<a style="color:var(--accent,#00d4ff);text-decoration:underline;text-underline-offset:3px" ')
              .replace(/<strong>/g, '<strong style="color:var(--text-primary,#fff);font-weight:700">')
            }}
          />

          <hr style={{ border: "none", borderTop: "1px solid var(--border-color, rgba(255,255,255,0.1))", margin: "48px 0" }} />

          {/* CTA */}
          <div style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.08) 0%, rgba(99,102,241,0.08) 100%)", border: "1px solid rgba(0,212,255,0.2)", borderRadius: "16px", padding: "clamp(24px,5vw,36px)", textAlign: "center", marginBottom: "48px" }}>
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

          {/* Related Posts */}
          {related.length > 0 && (
            <section>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary, #fff)", marginBottom: "20px" }}>
                Related Articles
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))", gap: "16px" }}>
                {related.map((rel) => (
                  <Link key={rel.slug} href={`/blog/${rel.slug}`}
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
