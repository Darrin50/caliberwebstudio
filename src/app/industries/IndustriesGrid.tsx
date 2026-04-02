'use client';

import Link from 'next/link';
import { ScrollRevealGroup } from '@/components/ScrollReveal';
import { industries } from './data';

export default function IndustriesGrid() {
  return (
    <>
      <ScrollRevealGroup className="industries-grid" stagger={80}>
        {industries.map(ind => (
          <Link key={ind.slug} href={`/industries/${ind.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
            <div
              style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '20px', padding: 'clamp(28px,4vw,44px)', transition: 'all 0.25s ease', cursor: 'pointer' }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = ind.color + '60';
                el.style.transform = 'translateY(-4px)';
                el.style.boxShadow = `0 12px 40px ${ind.color}15`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'var(--border)';
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', gap: '16px' }}>
                <div>
                  <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: ind.color, background: ind.bg, border: `1px solid ${ind.color}30`, borderRadius: '100px', padding: '4px 12px', display: 'inline-block', marginBottom: '12px' }}>
                    {ind.plural}
                  </span>
                  <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(20px,2.5vw,28px)', color: '#fff', margin: 0, letterSpacing: '-0.02em', lineHeight: 1.2 }}>{ind.headline}</h2>
                </div>
                <div style={{ background: ind.bg, border: `1px solid ${ind.color}30`, borderRadius: '12px', padding: '12px 16px', textAlign: 'center', flexShrink: 0 }}>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '20px', color: ind.color, lineHeight: 1 }}>{ind.resultStat.value}</div>
                  <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--dim)', marginTop: '4px', maxWidth: '80px' }}>{ind.resultStat.label}</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: ind.color, fontWeight: 700 }}>See What We Build →</span>
                {ind.demoSlug && <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: 'var(--dim)', letterSpacing: '0.06em' }}>Live demo available</span>}
              </div>
            </div>
          </Link>
        ))}
      </ScrollRevealGroup>
      <style>{`
        .industries-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        @media (max-width: 680px) { .industries-grid { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
}
