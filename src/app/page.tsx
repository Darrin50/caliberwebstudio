import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import WorkShowcase from '@/components/WorkShowcase';
import PhoneMockupScroll from '@/components/PhoneMockupScroll';
import { ChatWidget, FloatingElements, InteractiveOrbs } from '@/components/ClientOnlyComponents';
import { ScrollReveal, ScrollRevealGroup } from '@/components/ScrollReveal';

/* ─── Shared style tokens ─────────────────────────────────────── */
const NAVY = 'var(--navy)';
const BLUE = 'var(--accent)';
const SEC_LABEL: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: '10px',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: NAVY,
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginBottom: '24px',
};
const SEC_LABEL_LINE: React.CSSProperties = {
  display: 'block',
  width: '24px',
  height: '1px',
  background: NAVY,
  flexShrink: 0,
};

export default function Home() {
  return (
    <main style={{ position: 'relative' }}>
      <Nav />

      {/* ══ 1. HERO ══════════════════════════════════════════════ */}
      <Hero />

      {/* ══ 2. FOUNDER QUOTE ════════════════════════════════════ */}
      <section
        data-dark-section
        style={{
          background: 'var(--bg2)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: 'clamp(40px, 5vw, 64px) clamp(20px, 6vw, 60px)',
          textAlign: 'center',
        }}
      >
        <ScrollReveal>
          <blockquote
          style={{
            maxWidth: '760px',
            margin: '0 auto',
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(1.2rem, 2.5vw, 1.65rem)',
            fontStyle: 'italic',
            fontWeight: 700,
            lineHeight: 1.35,
            letterSpacing: '-0.02em',
            color: '#ffffff',
            position: 'relative',
          }}
        >
          <span style={{ color: NAVY, fontSize: '1.4em', lineHeight: 0, verticalAlign: '-0.2em', marginRight: '6px' }}>&ldquo;</span>
          Local businesses deserve the same tools big brands take for granted — without the agency price tag.
          <span style={{ color: NAVY, fontSize: '1.4em', lineHeight: 0, verticalAlign: '-0.2em', marginLeft: '6px' }}>&rdquo;</span>
          <footer
            style={{
              display: 'block',
              marginTop: '20px',
              fontFamily: "'Space Mono', monospace",
              fontSize: '11px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(208,216,224,0.5)',
              fontWeight: 400,
              fontStyle: 'normal',
            }}
          >
            — Darrin Singer, Founder · Caliber Web Studio
          </footer>
        </blockquote>
        </ScrollReveal>
      </section>

      {/* ══ 3. PROBLEM → SOLUTION ════════════════════════════════ */}
      <section
        style={{
          background: 'var(--bg3)',
          padding: 'clamp(72px, 9vw, 120px) clamp(20px, 6vw, 60px)',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{ ...SEC_LABEL, color: NAVY }}>
              <span style={SEC_LABEL_LINE} />
              The Problem
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: 'var(--silver)',
                marginBottom: 'clamp(40px, 5vw, 64px)',
                maxWidth: '700px',
              }}
            >
              Most Detroit businesses are invisible online.{' '}
              <span style={{ color: BLUE }}>We fix that.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <div className="ps-grid">
            {/* Problems */}
            <div>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--dim)', marginBottom: '16px' }}>The Problem</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
                {[
                  'Your website looks outdated',
                  "Google doesn't know you exist",
                  "You're losing leads to competitors",
                ].map((pain) => (
                  <div
                    key={pain}
                    style={{ padding: '20px 24px', background: 'var(--bg2)', display: 'flex', alignItems: 'center', gap: '14px' }}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                      <path d="M4 4 L16 16" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" style={{ filter: 'url(#brush-x)' }} />
                      <path d="M16 4 L4 16" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" style={{ filter: 'url(#brush-x)' }} />
                      <defs><filter id="brush-x"><feTurbulence type="turbulence" baseFrequency="0.35" numOctaves="3" result="noise" /><feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" /></filter></defs>
                    </svg>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(13px, 1.4vw, 15px)', color: 'var(--chrome)', lineHeight: 1.4 }}>{pain}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Arrows — one per row, vertically aligned to each row */}
            <div className="ps-arrow" style={{ display: 'flex', flexDirection: 'column', gap: '1px', paddingTop: '28px' }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ height: '61px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="24" height="14" viewBox="0 0 24 14" fill="none" style={{ opacity: 0.45 }}>
                    <path d="M0 7h20m0 0l-5-5m5 5l-5 5" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              ))}
            </div>

            {/* Solutions */}
            <div>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--dim)', marginBottom: '16px' }}>The Solution</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
                {[
                  'Professional site that builds trust instantly',
                  'Ranked where your customers are searching',
                  'A system that captures and converts 24/7',
                ].map((fix) => (
                  <div
                    key={fix}
                    style={{ padding: '20px 24px', background: 'rgba(37,99,235,0.1)', display: 'flex', alignItems: 'center', gap: '14px' }}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                      <path d="M4 10.5 L8.5 15 L16 5" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'url(#brush-ck)' }} />
                      <defs><filter id="brush-ck"><feTurbulence type="turbulence" baseFrequency="0.35" numOctaves="3" result="noise" /><feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" /></filter></defs>
                    </svg>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(13px, 1.4vw, 15px)', color: 'var(--silver)', fontWeight: 500, lineHeight: 1.4 }}>{fix}</span>
                  </div>
                ))}
              </div>
            </div>
            </div>
          </ScrollReveal>
        </div>

        <style>{`
          .ps-grid { display: grid; grid-template-columns: 1fr 48px 1fr; gap: 0; align-items: stretch; }
          @media (max-width: 700px) {
            .ps-grid { grid-template-columns: 1fr; gap: clamp(28px,5vw,40px); }
            .ps-arrow { display: none !important; }
          }
        `}</style>
      </section>

      {/* ══ 4. STATS BAR ════════════════════════════════════════ */}
      <section
        data-dark-section
        style={{
          background: 'var(--bg)',
          padding: 'clamp(40px, 5vw, 64px) clamp(20px, 6vw, 60px)',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <ScrollReveal>
          <div className="stats-bar" style={{ maxWidth: '960px', margin: '0 auto' }}>
          {[
            { value: '48hr', label: 'Average Delivery' },
            { value: '$0 Down', label: 'To Start' },
            { value: '30+', label: 'Detroit Businesses' },
            { value: '90+', label: 'Lighthouse Score' },
          ].map((s, i, arr) => (
            <div
              key={s.label}
              style={{
                textAlign: 'center',
                padding: 'clamp(20px, 3vw, 32px) clamp(16px, 2.5vw, 28px)',
                borderRight: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              }}
            >
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '8px' }}>
                {s.value}
              </div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(208,216,224,0.45)' }}>
                {s.label}
              </div>
            </div>
          ))}
          </div>
        </ScrollReveal>
        <style>{`
          .stats-bar { display: grid; grid-template-columns: repeat(4,1fr); }
          @media (max-width: 600px) {
            .stats-bar { grid-template-columns: repeat(2,1fr); }
            .stats-bar > div:nth-child(2) { border-right: none !important; }
            .stats-bar > div:nth-child(1),
            .stats-bar > div:nth-child(2) { border-bottom: 1px solid rgba(255,255,255,0.08); }
          }
        `}</style>
      </section>

      {/* ══ 5. HOW IT WORKS ══════════════════════════════════════ */}
      <section
        style={{
          background: 'var(--bg)',
          padding: 'clamp(72px, 9vw, 120px) clamp(20px, 6vw, 60px)',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{ ...SEC_LABEL }}>
              <span style={SEC_LABEL_LINE} />
              How It Works
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              color: 'var(--silver)',
              marginBottom: 'clamp(48px, 6vw, 80px)',
              maxWidth: '600px',
            }}
          >
            Simple process.<br />
            <span style={{ color: 'var(--dim)' }}>Serious results.</span>
            </h2>
          </ScrollReveal>

          <ScrollRevealGroup className="hiw-grid" stagger={150}>
            {[
              {
                n: '01',
                title: 'We learn your business',
                desc: 'A focused discovery call where we dig into your goals, your market, and the customers you want to win. No generic intake forms — real strategy from day one.',
              },
              {
                n: '02',
                title: 'We build your growth machine',
                desc: 'Site. SEO. Local presence. AI chatbot. Review automation. Everything engineered together so each piece compounds on the next — not a patchwork of tools.',
              },
              {
                n: '03',
                title: 'You get found and win customers',
                desc: "Ongoing results: more calls, more leads, better rankings. You track it. We keep optimizing. The system works around the clock so you don't have to.",
              },
            ].map((step, i, arr) => (
              <div key={step.n} style={{ position: 'relative', paddingRight: i < arr.length - 1 ? '24px' : '0' }}>
                {/* Step number bubble */}
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)', border: '1px solid rgba(37,99,235,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', boxShadow: '0 0 28px rgba(37,99,235,0.15)' }}>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '12px', fontWeight: 700, color: '#93c5fd' }}>{step.n}</span>
                </div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', fontWeight: 800, color: 'var(--silver)', marginBottom: '12px', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                  {step.title}
                </h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', lineHeight: 1.75, color: 'var(--dim)', margin: 0, maxWidth: 'none' }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </ScrollRevealGroup>
        </div>
        <style>{`
          .hiw-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: clamp(40px,6vw,72px); }
          @media (max-width: 860px) {
            .hiw-grid { grid-template-columns: 1fr; gap: clamp(36px,5vw,52px); }
          }
        `}</style>
      </section>

      {/* ══ 6. WORK SHOWCASE ════════════════════════════════════ */}
      <section
        id="work"
        className="work-section"
        style={{
          background: 'var(--bg)',
          padding: 'clamp(72px, 9vw, 120px) clamp(20px, 6vw, 60px)',
          borderTop: '1px solid var(--border)',
          transition: 'background 0.4s ease',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{ ...SEC_LABEL }}>
              <span style={{ ...SEC_LABEL_LINE }} />
              Our Work
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
                color: 'var(--text-primary)',
                marginBottom: '16px',
                maxWidth: '640px',
              }}
            >
              Our Work Speaks for Itself
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '17px', lineHeight: 1.7, color: 'var(--dim)', marginBottom: 'clamp(40px, 5vw, 56px)', maxWidth: '520px' }}>
            Real businesses. Real results. Every project is built to rank, convert, and grow.
            </p>
          </ScrollReveal>

          <WorkShowcase />
        </div>
      </section>

      {/* ══ 7. PHONE MOCKUP SCROLL ══════════════════════════════ */}
      <PhoneMockupScroll />

      {/* ══ 8. TESTIMONIALS ════════════════════════════════════ */}
      <section
        style={{
          background: 'var(--bg3)',
          padding: 'clamp(72px, 9vw, 120px) clamp(20px, 6vw, 60px)',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{ ...SEC_LABEL }}>
              <span style={SEC_LABEL_LINE} />
              Client Testimonials
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
                color: 'var(--silver)',
                marginBottom: 'clamp(40px, 5vw, 64px)',
                maxWidth: '520px',
              }}
            >
              Don&apos;t take our word for it.
            </h2>
          </ScrollReveal>

          <ScrollRevealGroup className="testi-grid" stagger={150}>
            {[
              {
                quote: "Caliber built us a site in 48 hours that I'm genuinely proud to hand to customers. We went from invisible on Google to ranking for 'auto glass Detroit' in two months. The phone hasn't stopped.",
                name: 'Marcus T.',
                role: 'Owner · Detroit Auto Glass',
                industry: 'Local Services',
              },
              {
                quote: "I'd been burned by two agencies before — big promises, bad results, worse communication. Darrin showed me a mockup before I paid a dime. We were booked three weeks out within 60 days of launch.",
                name: 'Kevin R.',
                role: 'Owner · Motor City Barbershop',
                industry: 'Retail & Services',
              },
            ].map((t) => (
              <div
                key={t.name}
                style={{
                  background: 'var(--bg2)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: 'clamp(28px, 4vw, 44px)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Blue top accent */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #2563eb, transparent)' }} />

                {/* Quote mark */}
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(60px, 7vw, 84px)', color: 'rgba(37,99,235,0.18)', lineHeight: 0.7, marginBottom: '24px', fontWeight: 800, userSelect: 'none' }}>
                  &ldquo;
                </div>

                {/* Quote */}
                <blockquote style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(15px, 1.6vw, 18px)', lineHeight: 1.75, color: 'var(--chrome)', fontWeight: 400, margin: '0 0 auto', flex: 1 }}>
                  {t.quote}
                </blockquote>

                {/* Attribution */}
                <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '15px', color: 'var(--silver)', marginBottom: '3px' }}>{t.name}</div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--dim)', marginBottom: '10px' }}>{t.role}</div>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#2563eb', padding: '3px 8px', background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.2)', borderRadius: '2px' }}>
                    {t.industry}
                  </span>
                </div>
              </div>
            ))}
          </ScrollRevealGroup>
        </div>
        <style>{`
          .testi-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: clamp(16px,2.5vw,28px); }
          @media (max-width: 720px) { .testi-grid { grid-template-columns: 1fr; } }
        `}</style>
      </section>

      {/* ══ 9. CTA / CONTACT FORM ════════════════════════════════ */}
      <CTA />

      <Footer />
      <ChatWidget />
      <FloatingElements />
      <InteractiveOrbs />
    </main>
  );
}
