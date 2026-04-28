import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { posts } from "./posts";

export const metadata: Metadata = {
  title: { absolute: "Blog | Detroit Web Design & SEO Tips | Caliber Web Studio" },
  description: "Expert articles on web design, local SEO, AI-powered marketing, and digital growth strategies for Detroit and Metro Michigan small businesses.",
  alternates: { canonical: "https://www.caliberwebstudio.com/blog" },
  openGraph: {
    title: "Blog | Caliber Web Studio",
    description: "Expert tips on web design, local SEO, and AI marketing for Detroit small businesses.",
    url: "https://www.caliberwebstudio.com/blog",
    type: "website",
  },
};

function extractFirstImage(content: string): string | null {
  const match = content.match(/<img[^>]+src="([^"]+)"/);
  return match ? match[1] : null;
}

const categoryColors: Record<string, string> = {
  "Detroit Web Design": "var(--accent, #00d4ff)",
  "Pricing & Value": "#a78bfa",
  "AI & Technology": "#34d399",
  "SEO": "#fb923c",
  "Industry Guides": "#f472b6",
  "Advice": "#facc15",
  "Strategy": "#60a5fa",
};

export default function BlogIndex() {
  return (
    <>
      <Nav />
      <main style={{ minHeight: "100vh", paddingTop: "80px", paddingBottom: "80px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "clamp(56px, 8vw, 88px)", paddingTop: "clamp(40px, 6vw, 64px)" }}>
            <p className="fu sec-label" style={{ justifyContent: "center" }}>
              Resources
            </p>
            <h1 className="fu" style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(44px, 7vw, 80px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", color: "var(--text-primary, #fff)", margin: "20px 0 24px" }}>
              Detroit Business Growth Blog
            </h1>
            <p className="fu" style={{ fontSize: "clamp(17px, 2vw, 20px)", color: "var(--text-secondary, rgba(255,255,255,0.7))", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
              Web design, local SEO, AI marketing, and digital growth strategies built for Detroit small businesses.
            </p>
          </div>

          {/* Posts Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))", gap: "28px" }}>
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} style={{textDecoration:'none',color:'inherit',display:'block'}}>
              <article
                className="blog-card"
                style={{
                  background: "var(--card-bg, rgba(255,255,255,0.04))",
                  border: "1px solid var(--border-color, rgba(255,255,255,0.08))",
                  borderRadius: "16px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0",
                }}
              >
                {(() => {
                  const thumb = post.thumbnail ?? extractFirstImage(post.content);
                  return thumb ? (
                    <div style={{ width: "100%", height: "180px", overflow: "hidden", flexShrink: 0, position: "relative" }}>
                      <Image
                        src={thumb.startsWith('/') ? thumb : `${thumb.split('?')[0]}?w=600&auto=format&fit=crop&q=70`}
                        alt={post.title}
                        fill
                        className="blog-thumb-img"
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 768px) 100vw, 340px"
                      />
                    </div>
                  ) : null;
                })()}
                <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                  <span className="blog-category-badge" style={{
                    fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
                    color: categoryColors[post.category] || "var(--accent, #00d4ff)",
                    background: `${categoryColors[post.category] || "var(--accent, #00d4ff)"}1a`,
                    padding: "4px 10px", borderRadius: "20px",
                  }}>
                    {post.category}
                  </span>
                  <time style={{ fontSize: "0.8rem", color: "var(--text-secondary, rgba(255,255,255,0.5))" }} dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </time>
                </div>

                <h2 style={{ fontSize: "1.1rem", fontWeight: 700, lineHeight: 1.4, color: "var(--text-primary, #fff)", margin: 0 }}>
                  {post.title}
                </h2>

                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary, rgba(255,255,255,0.65))", lineHeight: 1.65, margin: 0, flex: 1 }}>
                  {post.description}
                </p>

                <span
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.875rem", fontWeight: 600, color: "var(--accent, #00d4ff)", textDecoration: "none", marginTop: "4px" }}
                >
                  Read article <span aria-hidden="true">→</span>
                </span>
                </div>
              </article>
              </Link>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="blog-listing-cta" style={{ textAlign: "center", marginTop: "80px", padding: "48px 24px", background: "var(--card-bg, rgba(255,255,255,0.04))", borderRadius: "20px", border: "1px solid var(--border-color, rgba(255,255,255,0.08))" }}>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, color: "var(--text-primary, #fff)", marginBottom: "16px" }}>
              Ready to Grow Your Detroit Business Online?
            </h2>
            <p style={{ color: "var(--text-secondary, rgba(255,255,255,0.7))", marginBottom: "28px", fontSize: "1rem" }}>
              Custom websites, local SEO, AI chatbots, and more — starting at $197/mo with $0 down.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/#pricing" style={{ padding: "12px 28px", background: "var(--accent, #00d4ff)", color: "#000", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "0.95rem" }}>
                View Plans
              </Link>
              <Link href="/#contact" style={{ padding: "12px 28px", background: "transparent", border: "1px solid var(--accent, #00d4ff)", color: "var(--accent, #00d4ff)", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "0.95rem" }}>
                Free Consultation
              </Link>
            </div>
          </div>
        </div>
        <style>{`.blog-thumb-img { transition: transform 0.3s ease; } .blog-thumb-img:hover { transform: scale(1.04); }`}</style>
      </main>
      <Footer />
    </>
  );
}

