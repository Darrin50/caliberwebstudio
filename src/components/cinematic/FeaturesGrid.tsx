'use client';

/* ── Glass icon shell ── */
function GlassShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-16 w-16 items-center justify-center rounded-[20px] border border-white/20 bg-white/[0.08] backdrop-blur-md transition-transform duration-500 group-hover:scale-105 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_0_30px_rgba(90,170,255,0.18)]">
      <div className="absolute -inset-1 rounded-[24px] bg-gradient-to-br from-blue-400/25 via-cyan-300/10 to-purple-500/20 blur-lg" />
      <div className="absolute inset-0 rounded-[20px] bg-[linear-gradient(135deg,rgba(255,255,255,0.28),transparent_28%,transparent_55%,rgba(96,165,250,0.12))]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function PhoneIcon() {
  return (
    <GlassShell>
      <div className="relative flex h-10 w-6 items-center justify-center">
        <div className="relative h-9 w-5 overflow-hidden rounded-[12px] border border-cyan-300/50 bg-gradient-to-br from-cyan-300/20 to-purple-400/20 shadow-[0_0_20px_rgba(103,232,249,0.25)]">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-300/10 to-purple-400/10" />
          <div className="absolute left-1/2 top-2 h-1.5 w-3 -translate-x-1/2 rounded bg-cyan-300/80 shadow-[0_0_8px_rgba(103,232,249,0.8)]" />
          <div className="absolute left-1/2 top-4 h-1.5 w-2.5 -translate-x-1/2 rounded bg-purple-300/80 shadow-[0_0_8px_rgba(216,180,254,0.8)]" />
          <div className="absolute left-1/2 top-6 h-1.5 w-2 -translate-x-1/2 rounded bg-blue-300/70 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
        </div>
        <div className="absolute inset-0 rounded-[16px] border border-purple-300/30" />
      </div>
    </GlassShell>
  );
}

function SearchNodesIcon() {
  return (
    <GlassShell>
      <div className="relative h-10 w-10">
        <div className="absolute left-1 top-1 h-6 w-6 rounded-full border-2 border-cyan-300/80 shadow-[0_0_18px_rgba(103,232,249,0.45)]" />
        <div className="absolute left-6 top-6 h-3 w-1.5 rotate-[-35deg] rounded-full bg-purple-300/90 shadow-[0_0_14px_rgba(216,180,254,0.45)]" />
        <div className="absolute right-0 top-1 h-1.5 w-1.5 rounded-full bg-blue-300 shadow-[0_0_12px_rgba(96,165,250,0.8)]" />
        <div className="absolute bottom-1 right-1 h-1.5 w-1.5 rounded-full bg-fuchsia-300 shadow-[0_0_12px_rgba(232,121,249,0.8)]" />
        <div className="absolute left-7 top-4 h-px w-3 bg-gradient-to-r from-cyan-300/90 to-transparent" />
        <div className="absolute left-6 top-7 h-px w-4 rotate-[35deg] bg-gradient-to-r from-cyan-300/90 to-transparent" />
      </div>
    </GlassShell>
  );
}

function BotHeadIcon() {
  return (
    <GlassShell>
      <div className="relative flex h-10 w-10 items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-300/10 via-transparent to-purple-400/10 blur-md" />
        <div className="relative h-[30px] w-[30px] rounded-[14px] border border-cyan-300/55 bg-gradient-to-br from-white/10 via-cyan-300/16 to-purple-400/18 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_0_24px_rgba(103,232,249,0.28)]">
          <div className="absolute inset-x-1 top-1 h-2 rounded-full bg-gradient-to-b from-white/20 to-transparent" />
          <div className="absolute left-1/2 top-[9px] h-3.5 w-[22px] -translate-x-1/2 rounded-full border border-cyan-300/35 bg-[#07111f]/80 shadow-[inset_0_0_12px_rgba(0,0,0,0.7),0_0_10px_rgba(103,232,249,0.08)]">
            <div className="absolute left-[7px] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,1)]" />
            <div className="absolute right-[7px] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,1)]" />
            <div className="absolute left-1/2 top-1/2 h-px w-1.5 -translate-x-1/2 -translate-y-1/2 bg-cyan-300/50" />
          </div>
          <div className="absolute bottom-[7px] left-1/2 flex h-1.5 w-4 -translate-x-1/2 items-end justify-center gap-[2px] opacity-85">
            <div className="h-[3px] w-[2px] rounded-full bg-cyan-300/70" />
            <div className="h-[5px] w-[2px] rounded-full bg-cyan-300" />
            <div className="h-[3px] w-[2px] rounded-full bg-cyan-300/70" />
          </div>
          <div className="absolute -left-[3px] top-3 h-2.5 w-[2px] rounded-full bg-gradient-to-b from-cyan-300/20 to-cyan-300/70 shadow-[0_0_8px_rgba(103,232,249,0.45)]" />
          <div className="absolute -right-[3px] top-3 h-2.5 w-[2px] rounded-full bg-gradient-to-b from-cyan-300/20 to-cyan-300/70 shadow-[0_0_8px_rgba(103,232,249,0.45)]" />
        </div>
        <div className="absolute top-0 left-1/2 flex -translate-x-1/2 flex-col items-center">
          <div className="h-2 w-[2px] rounded-full bg-gradient-to-b from-cyan-300/30 to-cyan-300/80" />
          <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-cyan-200 to-purple-300 shadow-[0_0_12px_rgba(216,180,254,0.95)]" />
        </div>
      </div>
    </GlassShell>
  );
}

function BoltRingIcon() {
  return (
    <GlassShell>
      <div className="relative h-10 w-10">
        <div className="absolute inset-1 rounded-full border border-white/10 bg-gradient-to-br from-white/5 to-blue-400/10" />
        <div className="absolute inset-0 rounded-full border border-cyan-300/40 shadow-[0_0_18px_rgba(59,130,246,0.35)]" />
        <div className="absolute left-[13px] top-[6px] h-7 w-4 bg-gradient-to-b from-yellow-200 via-cyan-300 to-purple-300 [clip-path:polygon(55%_0%,100%_0%,58%_45%,100%_45%,28%_100%,44%_58%,0%_58%)] shadow-[0_0_18px_rgba(103,232,249,0.4)]" />
      </div>
    </GlassShell>
  );
}

function SchemaIcon() {
  return (
    <GlassShell>
      <div className="relative h-10 w-10">
        <div className="absolute left-1 top-2 text-xl font-semibold text-cyan-300/90">{'{'}</div>
        <div className="absolute right-1 top-2 text-xl font-semibold text-purple-300/90">{'}'}</div>
        <div className="absolute left-3 top-4 h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.9)]" />
        <div className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full bg-fuchsia-300 shadow-[0_0_10px_rgba(232,121,249,0.9)]" />
        <div className="absolute left-4 top-5 h-px w-5 bg-gradient-to-r from-cyan-300 to-fuchsia-300" />
        <div className="absolute bottom-3 right-4 h-1.5 w-1.5 rounded-full bg-blue-300 shadow-[0_0_10px_rgba(96,165,250,0.9)]" />
        <div className="absolute left-5 top-5 h-4 w-px bg-gradient-to-b from-fuchsia-300/0 via-blue-300 to-blue-300" />
      </div>
    </GlassShell>
  );
}

function AnalyticsIcon() {
  return (
    <GlassShell>
      <div className="relative h-10 w-10">
        <div className="absolute bottom-1 left-1 h-6 w-8 rounded-[10px] border border-white/10 bg-white/[0.05]" />
        <div className="absolute bottom-3 left-3 h-2 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.8)]" />
        <div className="absolute bottom-3 left-5 h-4 w-1.5 rounded-full bg-blue-300 shadow-[0_0_10px_rgba(96,165,250,0.8)]" />
        <div className="absolute bottom-3 left-7 h-6 w-1.5 rounded-full bg-purple-300 shadow-[0_0_10px_rgba(216,180,254,0.8)]" />
        <svg viewBox="0 0 40 40" className="absolute inset-0 h-10 w-10 overflow-visible">
          <path d="M7 24 C12 22, 15 17, 19 18 C22 18.5, 24 11, 31 10" fill="none" stroke="rgba(125,211,252,0.95)" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="31" cy="10" r="2" fill="rgba(216,180,254,1)" />
        </svg>
      </div>
    </GlassShell>
  );
}

const FEATURES = [
  { icon: <PhoneIcon />,       name: 'Mobile-First Design',  desc: 'Every site works flawlessly on any device' },
  { icon: <SearchNodesIcon />, name: 'SEO & AEO Built In',   desc: 'Optimized for Google AND AI search tools' },
  { icon: <BotHeadIcon />,     name: 'AI Chatbot Included',  desc: 'Captures leads 24/7 with smart conversation' },
  { icon: <BoltRingIcon />,    name: 'Speed Optimized',      desc: 'Sub-2-second load times, 90+ Lighthouse scores' },
  { icon: <SchemaIcon />,      name: 'Schema Markup',        desc: 'Rich results that stand out in search' },
  { icon: <AnalyticsIcon />,   name: 'Analytics Dashboard',  desc: 'See your traffic, leads, and growth in real time' },
];

export default function FeaturesGrid() {
  return (
    <section
      style={{
        background: 'var(--bg2, #111114)',
        padding: 'clamp(72px, 9vw, 120px) clamp(20px, 6vw, 60px)',
        borderTop: '1px solid var(--border, rgba(176,183,188,0.12))',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Headline */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 72px)' }}>
          <div
            style={{
              fontFamily: "var(--font-space-mono, 'Space Mono', monospace)",
              fontSize: '10px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--navy, #0076B6)',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
            }}
          >
            <span style={{ display: 'block', width: '24px', height: '1px', background: 'var(--navy, #0076B6)' }} />
            What&apos;s Included
            <span style={{ display: 'block', width: '24px', height: '1px', background: 'var(--navy, #0076B6)' }} />
          </div>
          <h2
            style={{
              fontFamily: "var(--font-heading, var(--font-syne, 'Syne', sans-serif))",
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: 'var(--silver, #D0D8E0)',
            }}
          >
            Every page.{' '}
            <span style={{ color: 'var(--navy, #0076B6)' }}>Built to convert.</span>
          </h2>
        </div>

        {/* Cards grid */}
        <div className="features-grid">
          {FEATURES.map((feature) => (
            <div key={feature.name} className="flip-card group">
              <div className="flip-inner">
                {/* Front */}
                <div className="flip-front">
                  <div style={{ marginBottom: '20px' }}>
                    {feature.icon}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-syne, 'Syne', sans-serif)",
                      fontSize: 'clamp(1rem, 1.5vw, 1.1rem)',
                      fontWeight: 700,
                      color: 'var(--silver, #D0D8E0)',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.2,
                      margin: 0,
                    }}
                  >
                    {feature.name}
                  </h3>
                </div>
                {/* Back */}
                <div className="flip-back">
                  <h3
                    style={{
                      fontFamily: "var(--font-syne, 'Syne', sans-serif)",
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      color: 'var(--navy, #0076B6)',
                      marginBottom: '12px',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {feature.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-inter, 'Inter', sans-serif)",
                      fontSize: '14px',
                      lineHeight: 1.65,
                      color: 'var(--silver, #D0D8E0)',
                      margin: 0,
                    }}
                  >
                    {feature.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(12px, 2vw, 20px);
        }
        @media (max-width: 860px) {
          .features-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .features-grid { grid-template-columns: 1fr; }
        }

        .flip-card {
          perspective: 800px;
          height: 220px;
        }
        .flip-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .flip-card:hover .flip-inner {
          transform: rotateY(180deg);
        }
        .flip-front,
        .flip-back {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 8px;
          padding: clamp(24px, 3vw, 32px);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
        }
        .flip-front {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .flip-back {
          background: rgba(0,118,182,0.12);
          border: 1px solid rgba(0,118,182,0.3);
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
}
