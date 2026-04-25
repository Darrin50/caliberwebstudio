'use client'

import type { ReactNode } from 'react'
import { useState } from 'react'
import type { MedSpaTemplateConfig } from '@/lib/med-spa-new-template-data'
import { TREATMENT_GOALS, APPROVED_GALLERY_COPY } from '@/lib/med-spa-new-template-data'

const PLUM = '#5C2D6E'
const GOLD = '#C9A96A'
const CREAM = '#FDFAF6'
const CREAM2 = '#F5EFE8'
const CREAM3 = '#EDE6DA'
const TEXT = '#1C1C1C'
const MUTED = '#8A7A6E'

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div style={{
      fontFamily: 'Montserrat, system-ui, sans-serif',
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '3px',
      textTransform: 'uppercase' as const,
      color: GOLD,
      marginBottom: 12,
    }}>
      {children}
    </div>
  )
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 style={{
      fontFamily: 'Playfair Display, Georgia, serif',
      fontSize: 'clamp(26px, 3.5vw, 42px)',
      fontWeight: 700,
      color: PLUM,
      letterSpacing: '-0.3px',
      lineHeight: 1.15,
      margin: '0 0 12px',
    }}>
      {children}
    </h2>
  )
}

function Divider() {
  return <div style={{ width: 40, height: 2, background: GOLD, margin: '14px 0 20px' }} />
}

export default function MedSpaNewTemplate({ config }: { config: MedSpaTemplateConfig }) {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null)
  const [formGoal, setFormGoal] = useState('')
  const [formName, setFormName] = useState('')
  const [formPhone, setFormPhone] = useState('')
  const [formMsg, setFormMsg] = useState('')

  const accent = config.accentColor || PLUM
  const bookingHref = config.bookingUrl || (config.phone ? `tel:${config.phone}` : '#book')

  const goalTreatments = selectedGoal
    ? TREATMENT_GOALS.find((g) => g.goal === selectedGoal)?.treatments ?? []
    : []

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap');
    .msnew *, .msnew *::before, .msnew *::after { box-sizing: border-box; margin: 0; padding: 0; }
    .msnew { font-family: 'Montserrat', system-ui, sans-serif; background: ${CREAM}; color: ${TEXT}; overflow-x: hidden; min-height: 100vh; }
    .msnew h1, .msnew h2, .msnew h3 { font-family: 'Playfair Display', Georgia, serif; }
    .msnew .con { max-width: 1100px; margin: 0 auto; padding: 0 28px; }
    .msnew .sec { padding: 80px 0; }
    .msnew .sec-cream2 { background: ${CREAM2}; }
    .msnew .sec-cream3 { background: ${CREAM3}; }

    /* Announce bar */
    .msnew .announce { background: ${accent}; color: #fff; text-align: center; padding: 10px 20px; font-size: 12px; font-weight: 500; letter-spacing: 0.5px; }

    /* Nav */
    .msnew .nav { background: rgba(253,250,246,0.97); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(92,45,110,0.08); position: sticky; top: 0; z-index: 100; padding: 0 28px; }
    .msnew .nav-in { max-width: 1100px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; height: 70px; }
    .msnew .nav-logo-name { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: ${accent}; line-height: 1; }
    .msnew .nav-logo-tag { font-size: 9px; color: ${MUTED}; letter-spacing: 2px; text-transform: uppercase; margin-top: 3px; }
    .msnew .nav-links { display: flex; gap: 28px; list-style: none; }
    .msnew .nav-links a { color: #5A4A3E; font-size: 13px; font-weight: 500; text-decoration: none; transition: color 0.2s; }
    .msnew .nav-links a:hover { color: ${accent}; }
    .msnew .nav-cta { background: ${accent}; color: #fff; padding: 11px 22px; font-size: 13px; font-weight: 600; text-decoration: none; letter-spacing: 0.5px; transition: opacity 0.2s; }
    .msnew .nav-cta:hover { opacity: 0.88; }
    @media (max-width: 768px) { .msnew .nav-links { display: none; } }

    /* Hero */
    .msnew .hero { position: relative; min-height: 88vh; display: flex; align-items: center; overflow: hidden; }
    .msnew .hero-bg { position: absolute; inset: 0; background: linear-gradient(135deg, #2d1040, ${accent}); }
    .msnew .hero-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 25%; }
    .msnew .hero-ov { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.48) 60%, rgba(0,0,0,0.18) 100%); }
    .msnew .hero-con { position: relative; z-index: 2; max-width: 1100px; margin: 0 auto; padding: 0 28px; }
    .msnew .hero-tag { display: inline-block; border: 1px solid ${GOLD}; color: ${GOLD}; font-size: 10px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; padding: 7px 16px; margin-bottom: 22px; }
    .msnew .hero-h1 { font-size: clamp(36px, 5vw, 68px); font-weight: 700; line-height: 1.08; color: #fff; max-width: 640px; margin-bottom: 20px; }
    .msnew .hero-h1 em { color: ${GOLD}; font-style: normal; }
    .msnew .hero-sub { font-size: 15px; color: rgba(255,255,255,0.78); max-width: 480px; margin-bottom: 36px; line-height: 1.8; font-weight: 300; }
    .msnew .hero-btns { display: flex; gap: 14px; flex-wrap: wrap; }
    .msnew .btn-gold { background: ${GOLD}; color: #fff; padding: 15px 32px; font-weight: 700; font-size: 13px; letter-spacing: 1px; text-transform: uppercase; text-decoration: none; display: inline-block; transition: opacity 0.2s; }
    .msnew .btn-gold:hover { opacity: 0.88; }
    .msnew .btn-outline { border: 1px solid rgba(255,255,255,0.5); color: #fff; padding: 14px 30px; font-size: 13px; letter-spacing: 1px; text-transform: uppercase; text-decoration: none; display: inline-block; transition: border-color 0.2s, color 0.2s; }
    .msnew .btn-outline:hover { border-color: ${GOLD}; color: ${GOLD}; }

    /* Goal finder */
    .msnew .goal-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 32px; }
    .msnew .goal-btn { background: ${CREAM}; border: 2px solid ${CREAM3}; padding: 20px 16px; text-align: center; cursor: pointer; transition: border-color 0.2s, background 0.2s; }
    .msnew .goal-btn:hover, .msnew .goal-btn.active { border-color: ${accent}; background: rgba(92,45,110,0.05); }
    .msnew .goal-icon { font-size: 22px; margin-bottom: 8px; color: ${accent}; }
    .msnew .goal-name { font-family: 'Montserrat', sans-serif; font-size: 12px; font-weight: 600; color: ${TEXT}; letter-spacing: 0.5px; }
    .msnew .goal-result { background: ${CREAM3}; border-left: 3px solid ${GOLD}; padding: 18px 22px; }
    .msnew .goal-result-label { font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: ${GOLD}; margin-bottom: 8px; }
    .msnew .goal-result-list { display: flex; flex-wrap: wrap; gap: 8px; }
    .msnew .goal-result-tag { background: ${CREAM}; border: 1px solid rgba(92,45,110,0.18); color: ${accent}; font-size: 12px; font-weight: 600; padding: 5px 12px; }
    @media (max-width: 640px) { .msnew .goal-grid { grid-template-columns: repeat(2, 1fr); } }

    /* Service pathways */
    .msnew .path-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2px; background: ${CREAM3}; }
    .msnew .path-card { background: ${CREAM}; padding: 30px 28px; border-bottom: 3px solid transparent; transition: border-color 0.2s; }
    .msnew .path-card:hover { border-color: ${GOLD}; }
    .msnew .path-icon { font-size: 26px; margin-bottom: 12px; }
    .msnew .path-cat { font-family: 'Montserrat', sans-serif; font-size: 9px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; color: ${GOLD}; margin-bottom: 8px; }
    .msnew .path-title { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: ${accent}; margin-bottom: 10px; }
    .msnew .path-desc { font-size: 13px; color: ${MUTED}; line-height: 1.7; margin-bottom: 14px; }
    .msnew .path-treats { display: flex; flex-wrap: wrap; gap: 6px; }
    .msnew .path-tag { background: ${CREAM3}; font-size: 11px; font-weight: 600; color: ${accent}; padding: 3px 10px; border-radius: 2px; }

    /* Provider section */
    .msnew .prov-hero { display: grid; grid-template-columns: 1fr 1.2fr; gap: 64px; align-items: center; }
    .msnew .prov-photo { width: 100%; aspect-ratio: 3/4; object-fit: cover; object-position: top; background: ${CREAM3}; display: block; }
    .msnew .prov-placeholder { width: 100%; aspect-ratio: 3/4; background: linear-gradient(160deg, #2d1040, ${accent}); display: flex; align-items: center; justify-content: center; }
    .msnew .prov-initials { font-family: 'Playfair Display', serif; font-size: 56px; color: rgba(255,255,255,0.35); }
    .msnew .prov-name { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; color: ${accent}; margin-bottom: 4px; }
    .msnew .prov-title { font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: ${GOLD}; margin-bottom: 10px; }
    .msnew .prov-creds { font-size: 13px; color: ${MUTED}; font-style: italic; margin-bottom: 20px; }
    .msnew .prov-philosophy { background: ${CREAM3}; border-left: 3px solid ${GOLD}; padding: 18px 22px; font-family: 'Playfair Display', serif; font-size: 15px; color: #5A4A3E; line-height: 1.75; font-style: italic; margin-bottom: 20px; }
    .msnew .safety-badges { display: flex; flex-wrap: wrap; gap: 10px; }
    .msnew .safety-badge { display: flex; align-items: center; gap: 7px; font-size: 12px; font-weight: 600; color: ${MUTED}; }
    .msnew .safety-dot { width: 6px; height: 6px; background: ${GOLD}; border-radius: 50%; flex-shrink: 0; }
    .msnew .prov-rest { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; margin-top: 48px; }
    .msnew .prov-mini { background: ${CREAM}; border: 1px solid ${CREAM3}; padding: 20px; }
    .msnew .prov-mini-name { font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 700; color: ${accent}; margin-bottom: 3px; }
    .msnew .prov-mini-title { font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: ${GOLD}; margin-bottom: 8px; }
    .msnew .prov-mini-creds { font-size: 12px; color: ${MUTED}; font-style: italic; }
    @media (max-width: 768px) { .msnew .prov-hero { grid-template-columns: 1fr; gap: 28px; } }

    /* Approved gallery placeholder */
    .msnew .gallery-ph { background: ${CREAM3}; border: 2px dashed rgba(92,45,110,0.2); padding: 64px 40px; text-align: center; }
    .msnew .gallery-ph-icon { font-size: 36px; opacity: 0.25; margin-bottom: 20px; }
    .msnew .gallery-ph-title { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: ${accent}; margin-bottom: 16px; }
    .msnew .gallery-ph-body { font-size: 14px; color: ${MUTED}; line-height: 1.8; max-width: 580px; margin: 0 auto; }

    /* Local SEO teaser */
    .msnew .seo-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
    .msnew .seo-block { background: ${CREAM}; border: 1px solid ${CREAM3}; padding: 28px; }
    .msnew .seo-block h3 { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: ${accent}; margin-bottom: 12px; }
    .msnew .seo-list { list-style: none; }
    .msnew .seo-list li { font-size: 13px; color: ${MUTED}; padding: 6px 0; border-bottom: 1px solid ${CREAM3}; display: flex; align-items: center; gap: 8px; }
    .msnew .seo-list li:last-child { border-bottom: none; }
    .msnew .seo-list li::before { content: '→'; color: ${GOLD}; font-weight: 700; flex-shrink: 0; }
    @media (max-width: 640px) { .msnew .seo-grid { grid-template-columns: 1fr; } }

    /* Booking form */
    .msnew .book-wrap { display: grid; grid-template-columns: 1.1fr 1fr; gap: 48px; align-items: flex-start; }
    .msnew .book-form { background: ${CREAM}; padding: 38px; border: 1px solid ${CREAM3}; }
    .msnew .book-form h3 { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: ${accent}; margin-bottom: 22px; }
    .msnew .form-row { margin-bottom: 16px; }
    .msnew .form-label { font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: ${MUTED}; display: block; margin-bottom: 6px; }
    .msnew .form-input { width: 100%; border: 1px solid ${CREAM3}; background: ${CREAM2}; padding: 11px 14px; font-family: 'Montserrat', sans-serif; font-size: 13px; color: ${TEXT}; outline: none; transition: border-color 0.2s; }
    .msnew .form-input:focus { border-color: ${accent}; }
    .msnew .form-select { width: 100%; border: 1px solid ${CREAM3}; background: ${CREAM2}; padding: 11px 14px; font-family: 'Montserrat', sans-serif; font-size: 13px; color: ${TEXT}; outline: none; appearance: none; -webkit-appearance: none; cursor: pointer; }
    .msnew .form-submit { width: 100%; background: ${accent}; color: #fff; border: none; padding: 15px; font-family: 'Montserrat', sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; cursor: pointer; margin-top: 8px; transition: opacity 0.2s; }
    .msnew .form-submit:hover { opacity: 0.88; }
    .msnew .book-info { }
    .msnew .book-ctas { display: flex; flex-direction: column; gap: 12px; margin-bottom: 28px; }
    .msnew .book-cta-btn { display: block; text-align: center; padding: 14px 20px; font-size: 13px; font-weight: 600; letter-spacing: 0.5px; text-decoration: none; transition: opacity 0.2s; }
    .msnew .book-cta-btn:hover { opacity: 0.88; }
    .msnew .book-cta-call { background: ${accent}; color: #fff; }
    .msnew .book-cta-text { background: ${CREAM3}; color: ${accent}; }
    .msnew .fin-row { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 16px; }
    .msnew .fin-chip { font-size: 11px; font-weight: 600; color: ${MUTED}; background: ${CREAM3}; padding: 5px 12px; border-radius: 2px; }
    .msnew .member-block { background: ${CREAM3}; border-left: 3px solid ${GOLD}; padding: 18px 22px; margin-top: 24px; }
    .msnew .member-label { font-size: 9px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: ${GOLD}; margin-bottom: 8px; }
    .msnew .member-title { font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 700; color: ${accent}; margin-bottom: 6px; }
    .msnew .member-desc { font-size: 12px; color: ${MUTED}; line-height: 1.6; }
    @media (max-width: 768px) { .msnew .book-wrap { grid-template-columns: 1fr; } }

    /* Footer */
    .msnew .footer { background: #2d1040; color: rgba(255,255,255,0.65); padding: 44px 0 24px; }
    .msnew .footer-row { display: flex; justify-content: space-between; align-items: flex-start; gap: 24px; flex-wrap: wrap; margin-bottom: 28px; }
    .msnew .footer-biz { font-family: 'Playfair Display', serif; font-size: 19px; color: #fff; margin-bottom: 4px; }
    .msnew .footer-loc { font-size: 12px; color: rgba(255,255,255,0.45); }
    .msnew .footer-links { display: flex; gap: 20px; flex-wrap: wrap; }
    .msnew .footer-links a { color: rgba(255,255,255,0.5); font-size: 12px; text-decoration: none; transition: color 0.2s; }
    .msnew .footer-links a:hover { color: ${GOLD}; }
    .msnew .footer-copy { font-size: 11px; color: rgba(255,255,255,0.3); padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px; }
    .msnew .footer-copy a { color: ${GOLD}; text-decoration: none; }
  `

  const lead = config.providers[0] ?? null
  const restProviders = config.providers.slice(1)
  const getInitials = (name: string) =>
    name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div className="msnew">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {config.announceBar && (
        <div className="announce" dangerouslySetInnerHTML={{ __html: config.announceBar }} />
      )}

      {/* Nav */}
      <nav className="nav">
        <div className="nav-in">
          <a href={bookingHref} style={{ textDecoration: 'none' }}>
            {config.logoImg ? (
              <img src={config.logoImg} alt={config.businessName} style={{ height: 44, width: 'auto', objectFit: 'contain' }} />
            ) : (
              <div>
                <div className="nav-logo-name">{config.businessName}</div>
                <div className="nav-logo-tag">Medical Spa · {config.location}</div>
              </div>
            )}
          </a>
          <ul className="nav-links">
            <li><a href="#find-treatment">Find Your Treatment</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#team">Our Team</a></li>
            <li><a href="#book">Contact</a></li>
          </ul>
          <a href={bookingHref} className="nav-cta">Book Consultation</a>
        </div>
      </nav>

      {/* ── Section 1: Hero + Treatment Finder ── */}
      <section className="hero" id="find-treatment">
        <div className="hero-bg" />
        {config.heroImg && (
          <img
            src={config.heroImg}
            alt={config.businessName}
            className="hero-img"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
          />
        )}
        <div className="hero-ov" />
        <div className="hero-con">
          <div className="hero-tag">Medical Aesthetics · {config.location}</div>
          <h1
            className="hero-h1"
            dangerouslySetInnerHTML={{
              __html: config.heroHeadline.replace(/\*([^*]+)\*/g, '<em>$1</em>'),
            }}
          />
          <p className="hero-sub">{config.heroSub}</p>
          <div className="hero-btns">
            <a href={bookingHref} className="btn-gold">Book a Consultation</a>
            <a href="#find-treatment-form" className="btn-outline">Find Your Treatment ↓</a>
          </div>
        </div>
      </section>

      {/* Treatment Finder interactive */}
      <section id="find-treatment-form" className="sec sec-cream2">
        <div className="con">
          <div style={{ textAlign: 'center', maxWidth: 660, margin: '0 auto 48px' }}>
            <SectionLabel>Treatment Finder</SectionLabel>
            <SectionTitle>What Are You Looking to Achieve?</SectionTitle>
            <Divider />
            <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.8 }}>
              Choose a goal and we&apos;ll show you the treatments designed for it.
            </p>
          </div>
          <div className="goal-grid">
            {TREATMENT_GOALS.map((g) => (
              <button
                key={g.goal}
                className={`goal-btn${selectedGoal === g.goal ? ' active' : ''}`}
                onClick={() => setSelectedGoal(selectedGoal === g.goal ? null : g.goal)}
              >
                <div className="goal-icon">{g.icon}</div>
                <div className="goal-name">{g.goal}</div>
              </button>
            ))}
          </div>
          {selectedGoal && goalTreatments.length > 0 && (
            <div className="goal-result">
              <div className="goal-result-label">Recommended for &ldquo;{selectedGoal}&rdquo;</div>
              <div className="goal-result-list">
                {goalTreatments.map((t) => (
                  <a key={t} href={bookingHref} className="goal-result-tag">{t}</a>
                ))}
              </div>
            </div>
          )}
          {!selectedGoal && (
            <p style={{ textAlign: 'center', fontSize: 13, color: MUTED, marginTop: 8 }}>
              Select a goal above to see matched treatments →
            </p>
          )}
        </div>
      </section>

      {/* ── Section 2: Service Pathways ── */}
      <section id="services" className="sec sec-cream3">
        <div className="con">
          <div style={{ maxWidth: 640, marginBottom: 44 }}>
            <SectionLabel>Treatment Pathways</SectionLabel>
            <SectionTitle>A Complete Aesthetic Menu — Explained</SectionTitle>
            <Divider />
            <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.8 }}>
              Not just a list of services — a guided path to the result you&apos;re looking for. Every pathway below has been designed for clarity, so you arrive knowing exactly what to expect.
            </p>
          </div>
          <div className="path-grid">
            {config.servicePathways.map((p) => (
              <div key={p.category} className="path-card">
                <div className="path-icon">{p.icon}</div>
                <div className="path-cat">{p.category}</div>
                <div className="path-title">{p.category} Pathway</div>
                <div className="path-desc">{p.description}</div>
                <div className="path-treats">
                  {p.treatments.map((t) => (
                    <span key={t} className="path-tag">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: Provider Trust ── */}
      <section id="team" className="sec">
        <div className="con">
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 48px' }}>
            <SectionLabel>Your Medical Team</SectionLabel>
            <SectionTitle>Provider-Led. Safety-First.</SectionTitle>
            <Divider />
            <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.8 }}>
              Every treatment at {config.businessName} is performed or supervised by a licensed medical professional — not an esthetician. Your results, and your safety, are our first priority.
            </p>
          </div>

          {lead && (
            <div className="prov-hero">
              <div>
                {lead.photo ? (
                  <img
                    src={lead.photo}
                    alt={lead.name}
                    className="prov-photo"
                    onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement
                      const ph = document.createElement('div')
                      ph.className = 'prov-placeholder'
                      ph.innerHTML = `<span class="prov-initials">${getInitials(lead.name)}</span>`
                      img.parentElement!.insertBefore(ph, img)
                      img.style.display = 'none'
                    }}
                  />
                ) : (
                  <div className="prov-placeholder">
                    <span className="prov-initials">{getInitials(lead.name)}</span>
                  </div>
                )}
              </div>
              <div>
                <SectionLabel>Lead Provider</SectionLabel>
                <div className="prov-name">{lead.name}</div>
                <div className="prov-title">{lead.title}</div>
                {lead.credentials && <div className="prov-creds">{lead.credentials}</div>}
                {lead.philosophy && (
                  <div className="prov-philosophy">&ldquo;{lead.philosophy}&rdquo;</div>
                )}
                <div className="safety-badges">
                  {['Licensed Medical Provider', 'FDA-Cleared Technology', 'Individualized Treatment Plans', 'Safety-First Protocol'].map((b) => (
                    <div key={b} className="safety-badge">
                      <span className="safety-dot" />
                      {b}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {restProviders.length > 0 && (
            <div className="prov-rest">
              {restProviders.map((p) => (
                <div key={p.name} className="prov-mini">
                  <div className="prov-mini-name">{p.name}</div>
                  <div className="prov-mini-title">{p.title}</div>
                  {p.credentials && <div className="prov-mini-creds">{p.credentials}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Section 4: Approved Before/After Gallery Placeholder ── */}
      <section className="sec sec-cream2">
        <div className="con">
          <div style={{ maxWidth: 640, marginBottom: 40 }}>
            <SectionLabel>Results Gallery</SectionLabel>
            <SectionTitle>Before &amp; After</SectionTitle>
            <Divider />
          </div>
          <div className="gallery-ph">
            <div className="gallery-ph-icon">◧</div>
            <div className="gallery-ph-title">Approved Before + After Gallery Goes Here</div>
            <p className="gallery-ph-body">
              {APPROVED_GALLERY_COPY.split('\n\n')[1]}
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 5: Local SEO Teaser ── */}
      <section className="sec sec-cream3">
        <div className="con">
          <div style={{ maxWidth: 640, marginBottom: 44 }}>
            <SectionLabel>Serving {config.seoCity}, MI</SectionLabel>
            <SectionTitle>The Med Spa Built for {config.seoCity}</SectionTitle>
            <Divider />
            <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.8 }}>
              When someone in {config.seoCity} searches for Botox, laser hair removal, or med spa near me — this is the site they find. Every service page and blog post below is built to rank and convert locally.
            </p>
          </div>
          <div className="seo-grid">
            <div className="seo-block">
              <h3>Local Service Pages</h3>
              <ul className="seo-list">
                {[
                  `Botox in ${config.seoCity}, MI`,
                  `Laser Hair Removal ${config.seoCity}`,
                  `HydraFacial ${config.seoCity}, MI`,
                  `Med Spa near ${config.seoCity}`,
                  `Dermal Fillers ${config.seoCity}, MI`,
                  `Medical Weight Loss ${config.seoCity}`,
                ].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="seo-block">
              <h3>Content &amp; Blog Plan</h3>
              <ul className="seo-list">
                {[
                  `Best Med Spa in ${config.seoCity} — What to Look For`,
                  `How Many Units of Botox Do I Need?`,
                  `Laser vs. Waxing: What's Right for You`,
                  `What to Expect on Your First Med Spa Visit`,
                  `${config.seoCity} Guide to Body Contouring Options`,
                  `Memberships vs. Single Treatments — Which Saves More`,
                ].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 6: Goal-Based Booking Form ── */}
      <section id="book" className="sec">
        <div className="con">
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 48px' }}>
            <SectionLabel>Book Your Consultation</SectionLabel>
            <SectionTitle>Your Goals. Our Expertise.</SectionTitle>
            <Divider />
          </div>
          <div className="book-wrap">
            <div className="book-form">
              <h3>Request a Consultation</h3>
              <div className="form-row">
                <label className="form-label">Your Name</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="First & Last Name"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                />
              </div>
              <div className="form-row">
                <label className="form-label">Phone Number</label>
                <input
                  className="form-input"
                  type="tel"
                  placeholder="(313) 555-0000"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                />
              </div>
              <div className="form-row">
                <label className="form-label">I&apos;m Most Interested In</label>
                <select
                  className="form-select"
                  value={formGoal}
                  onChange={(e) => setFormGoal(e.target.value)}
                >
                  <option value="">Select a treatment goal…</option>
                  {TREATMENT_GOALS.map((g) => (
                    <option key={g.goal} value={g.goal}>{g.goal}</option>
                  ))}
                  <option value="Not Sure">Not Sure — I'd Like Guidance</option>
                </select>
              </div>
              <div className="form-row">
                <label className="form-label">Anything Else? (optional)</label>
                <textarea
                  className="form-input"
                  rows={3}
                  placeholder="Tell us about your goals, concerns, or questions…"
                  value={formMsg}
                  onChange={(e) => setFormMsg(e.target.value)}
                  style={{ resize: 'vertical' }}
                />
              </div>
              <button className="form-submit" type="button">
                Request My Consultation
              </button>
            </div>

            <div className="book-info">
              <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.8, marginBottom: 24 }}>
                Prefer to reach us directly? We respond to calls and texts within minutes during business hours.
              </p>
              <div className="book-ctas">
                {config.phone && (
                  <a href={`tel:${config.phone}`} className="book-cta-btn book-cta-call">
                    ☎ Call {config.phone}
                  </a>
                )}
                {config.phone && (
                  <a href={`sms:${config.phone}`} className="book-cta-btn book-cta-text">
                    ✉ Text Us at {config.phone}
                  </a>
                )}
              </div>

              {(config.financing ?? []).length > 0 && (
                <div>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: MUTED, marginBottom: 8 }}>
                    Financing Available
                  </p>
                  <div className="fin-row">
                    {(config.financing ?? []).map((f) => (
                      <span key={f} className="fin-chip">{f}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="member-block">
                <div className="member-label">Membership</div>
                <div className="member-title">Monthly Plans Available</div>
                <p className="member-desc">
                  Get priority booking, discounted treatments, and exclusive member events. Ask about our monthly wellness membership during your consultation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="con">
          <div className="footer-row">
            <div>
              <div className="footer-biz">{config.businessName}</div>
              <div className="footer-loc">{config.location}</div>
            </div>
            <div className="footer-links">
              <a href="#find-treatment">Treatments</a>
              <a href="#services">Services</a>
              <a href="#team">Team</a>
              <a href="#book">Book</a>
            </div>
          </div>
          <div className="footer-copy">
            <span>© {new Date().getFullYear()} {config.businessName}. All rights reserved.</span>
            <span>
              Built by{' '}
              <a href="https://caliberwebstudio.com" target="_blank" rel="noopener noreferrer">
                Caliber Web Studio
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
