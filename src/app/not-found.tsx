import type { Metadata } from 'next';
import Nav from '@/components/Nav';

export const metadata: Metadata = {
  title: { absolute: '404 — Page Not Found | Caliber Web Studio' },
  description: "The page you're looking for doesn't exist. Head back to Caliber Web Studio to explore our Detroit web design and AI-powered services.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Nav />
      <main style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem', paddingTop: '8rem' }}>
        <h1 style={{ fontSize: 'clamp(4rem, 15vw, 8rem)', fontWeight: 900, background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}>404</h1>
        <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: 700, margin: '1rem 0 0.5rem', color: 'var(--white, #fff)' }}>This page doesn&apos;t exist — but your next client does.</h2>
        <p style={{ color: 'var(--dim, #888)', maxWidth: '400px', marginBottom: '2rem' }}>Let&apos;s get you back on track.</p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="/" style={{ display: 'inline-block', padding: '0.875rem 2rem', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: '#fff', borderRadius: '0.5rem', fontWeight: 700, textDecoration: 'none', fontSize: '1rem' }}>Back to Home</a>
          <a href="/contact" style={{ display: 'inline-block', padding: '0.875rem 2rem', background: 'transparent', color: 'var(--silver, #D0D8E0)', borderRadius: '0.5rem', fontWeight: 700, textDecoration: 'none', fontSize: '1rem', border: '1px solid rgba(168,184,200,0.3)' }}>Contact Us</a>
        </div>
      </main>
    </>
  )
}
