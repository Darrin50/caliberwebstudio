import Link from 'next/link';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
}

const posts: BlogPost[] = [
  {
    slug: 'why-local-businesses-need-ai-websites',
    title: 'Why Local Businesses Need an AI-Powered Website in 2026',
    excerpt: 'The days of a simple 5-page website are over. Here\'s why Detroit businesses that adopt AI-powered sites are outranking and outearning their competition.',
    date: 'March 10, 2026',
    readTime: '5 min read',
    category: 'Strategy',
  },
  {
    slug: 'google-business-profile-domination',
    title: 'How to Dominate Google Business Profile in Your City',
    excerpt: 'Your GBP listing is often the first thing a customer sees. Learn the exact optimization strategy we use to push our clients to the top of local search.',
    date: 'March 3, 2026',
    readTime: '7 min read',
    category: 'Local SEO',
  },
  {
    slug: 'review-automation-guide',
    title: 'The Review Automation Playbook: Get 5-Star Reviews on Autopilot',
    excerpt: 'Reviews are currency. We break down the automated system that helped one of our Detroit clients go from 12 reviews to 200+ in 90 days.',
    date: 'February 24, 2026',
    readTime: '6 min read',
    category: 'Reputation',
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
      {/* Header Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-navy mb-4 text-sm font-semibold tracking-wide uppercase">
            Resources
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            Insights & Strategy
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Strategies and insights to help your local business compete and win online.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <div
                  className="h-full p-7 rounded-lg border transition-all duration-300 cursor-pointer group hover:shadow-lg"
                  style={{
                    backgroundColor: 'var(--bg2)',
                    borderColor: 'var(--border)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#3b5998';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {/* Category Badge */}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-navy bg-gray-700 rounded-full">
                      {post.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-navy transition-colors">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-400 text-sm mb-5 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-700">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
