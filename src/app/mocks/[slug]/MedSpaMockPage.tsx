'use client'

import { useEffect } from 'react'
import type { MedSpaMockConfig } from '@/lib/med-spa-mock-data'

const PLUM = '#6B2D4E'
const PLUM_DARK = '#4E2039'
const GOLD = '#C9A96A'
const GOLD_DARK = '#B8915A'
const CREAM = '#FDFAF6'
const CREAM2 = '#F5EFE6'
const CREAM3 = '#EDE6DA'
const TEXT = '#1C1C1C'
const MUTED = '#8A7A6E'
const LIGHT = '#5A4A3E'

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: 3, marginBottom: 14 }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: GOLD, fontSize: 16 }}>★</span>
      ))}
    </div>
  )
}

function CategoryBadge({ label }: { label: string }) {
  return (
    <span style={{
      display: 'inline-block',
      background: CREAM3,
      color: PLUM,
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '1.5px',
      textTransform: 'uppercase',
      padding: '3px 10px',
      borderRadius: 2,
      marginBottom: 10,
      fontFamily: 'Montserrat, sans-serif',
    }}>
      {label}
    </span>
  )
}

export default function MedSpaMockPage({ config }: { config: MedSpaMockConfig }) {
  useEffect(() => {
    const ids = ['cursor-dot', 'cursor-outer', 'meteorField', 'sunParticles']
    const origDisplay: Record<string, string> = {}
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) { origDisplay[id] = el.style.display; el.style.display = 'none' }
    })
    const canvases = Array.from(document.querySelectorAll('canvas'))
    canvases.forEach((c) => { (c as HTMLElement).style.display = 'none' })
    const origCursor = document.body.style.cursor
    document.body.style.cursor = 'auto'
    return () => {
      ids.forEach((id) => {
        const el = document.getElementById(id)
        if (el) el.style.display = origDisplay[id] ?? ''
      })
      canvases.forEach((c) => { (c as HTMLElement).style.display = '' })
      document.body.style.cursor = origCursor
    }
  }, [])

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap');

    .ms *, .ms *::before, .ms *::after { box-sizing: border-box; margin: 0; padding: 0; }
    .ms { font-family: 'Montserrat', system-ui, sans-serif; background: ${CREAM}; color: ${TEXT}; overflow-x: hidden; cursor: auto !important; min-height: 100vh; }
    .ms a, .ms button { cursor: pointer !important; }
    .ms img { display: block; max-width: 100%; }
    .ms h1, .ms h2, .ms h3 { font-family: 'Playfair Display', Georgia, serif; }
    .ms .con { max-width: 1100px; margin: 0 auto; padding: 0 28px; }

    /* Announce bar */
    .ms .announce { background: ${PLUM}; color: #fff; text-align: center; padding: 11px 20px; font-size: 12px; font-weight: 500; letter-spacing: 0.5px; }
    .ms .announce span { color: ${GOLD}; font-weight: 700; }

    /* Nav */
    .ms .nav { background: rgba(253,250,246,0.96); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(107,45,78,0.08); position: sticky; top: 0; z-index: 100; padding: 0 28px; }
    .ms .nav-in { max-width: 1100px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; height: 72px; }
    .ms .logo { display: flex; flex-direction: column; }
    .ms .logo-name { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: ${PLUM}; line-height: 1; }
    .ms .logo-tag { font-family: 'Montserrat', sans-serif; font-size: 9px; color: ${MUTED}; letter-spacing: 2px; text-transform: uppercase; margin-top: 3px; }
    .ms .nav-links { display: flex; gap: 32px; list-style: none; }
    .ms .nav-links a { color: ${LIGHT}; font-size: 13px; font-weight: 500; text-decoration: none; letter-spacing: 0.3px; transition: color 0.2s; }
    .ms .nav-links a:hover { color: ${PLUM}; }
    .ms .nav-cta { background: ${PLUM}; color: #fff; padding: 11px 22px; font-size: 13px; font-weight: 600; text-decoration: none; letter-spacing: 0.5px; display: inline-block; transition: background 0.2s; }
    .ms .nav-cta:hover { background: ${PLUM_DARK}; }

    /* Hero */
    .ms .hero { position: relative; height: 90vh; min-height: 580px; max-height: 860px; overflow: hidden; display: flex; align-items: center; }
    .ms .hero-bg { position: absolute; inset: 0; background: linear-gradient(135deg, ${PLUM_DARK}, ${PLUM}); }
    .ms .hero-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 25%; }
    .ms .hero-ov { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.56) 55%, rgba(0,0,0,0.22) 100%); }
    .ms .hero-con { position: relative; z-index: 2; max-width: 1100px; margin: 0 auto; padding: 0 28px; width: 100%; }
    .ms .hero-tag { display: inline-block; border: 1px solid ${GOLD}; color: ${GOLD}; font-size: 10px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; padding: 7px 16px; margin-bottom: 22px; font-family: 'Montserrat', sans-serif; }
    .ms .hero-title { font-size: clamp(38px, 5.5vw, 70px); font-weight: 700; line-height: 1.08; color: #fff; max-width: 680px; margin-bottom: 20px; }
    .ms .hero-title em { color: ${GOLD}; font-style: normal; }
    .ms .hero-sub { font-size: 15px; color: rgba(255,255,255,0.78); max-width: 500px; margin-bottom: 36px; line-height: 1.8; font-weight: 300; letter-spacing: 0.3px; }
    .ms .hero-btns { display: flex; gap: 14px; flex-wrap: wrap; }
    .ms .btn-p { background: ${GOLD}; color: #fff; padding: 16px 34px; font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 13px; letter-spacing: 1px; text-transform: uppercase; text-decoration: none; display: inline-block; transition: background 0.2s; }
    .ms .btn-p:hover { background: ${GOLD_DARK}; }
    .ms .btn-o { border: 1px solid rgba(255,255,255,0.5); color: #fff; padding: 15px 32px; font-family: 'Montserrat', sans-serif; font-weight: 600; font-size: 13px; letter-spacing: 1px; text-transform: uppercase; text-decoration: none; display: inline-block; transition: border-color 0.2s, color 0.2s; }
    .ms .btn-o:hover { border-color: ${GOLD}; color: ${GOLD}; }
    .ms .hero-trust { display: flex; gap: 28px; margin-top: 40px; flex-wrap: wrap; }
    .ms .htrust { display: flex; align-items: center; gap: 8px; font-size: 12px; color: rgba(255,255,255,0.65); font-family: 'Montserrat', sans-serif; }
    .ms .hline { width: 22px; height: 1px; background: ${GOLD}; flex-shrink: 0; }

    /* Credentials strip */
    .ms .cred-strip { background: ${PLUM}; padding: 26px 0; }
    .ms .cred-row { display: flex; justify-content: center; gap: 0; flex-wrap: wrap; }
    .ms .cred-item { text-align: center; padding: 8px 40px; border-right: 1px solid rgba(255,255,255,0.15); }
    .ms .cred-item:last-child { border-right: none; }
    .ms .cred-num { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; color: ${GOLD}; display: block; line-height: 1; }
    .ms .cred-lbl { font-family: 'Montserrat', sans-serif; font-size: 10px; color: rgba(255,255,255,0.72); text-transform: uppercase; letter-spacing: 1.5px; margin-top: 5px; }

    /* Sections */
    .ms .sec { padding: 88px 0; }
    .ms .sec-cream { background: ${CREAM2}; }
    .ms .sec-cream3 { background: ${CREAM3}; }
    .ms .slbl { font-family: 'Montserrat', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: ${GOLD}; margin-bottom: 12px; }
    .ms .stitle { font-size: clamp(28px, 4vw, 44px); font-weight: 700; color: ${PLUM}; letter-spacing: -0.5px; margin-bottom: 14px; line-height: 1.1; }
    .ms .ssub { font-size: 15px; color: ${MUTED}; max-width: 520px; line-height: 1.8; font-weight: 400; }
    .ms .shdr { margin-bottom: 52px; }
    .ms .dvdr { width: 40px; height: 2px; background: ${GOLD}; margin: 16px 0 18px; }

    /* Services */
    .ms .svc-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(310px, 1fr)); gap: 2px; background: ${CREAM3}; }
    .ms .svc { background: ${CREAM}; padding: 28px 32px; border-bottom: 2px solid transparent; transition: border-color 0.2s; }
    .ms .svc:hover { border-color: ${GOLD}; }
    .ms .svc-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; }
    .ms .svc-name { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 600; color: ${PLUM}; }
    .ms .svc-price { font-family: 'Montserrat', sans-serif; font-size: 14px; font-weight: 700; color: ${GOLD}; white-space: nowrap; margin-left: 12px; }
    .ms .svc-desc { font-size: 13px; color: ${MUTED}; line-height: 1.7; margin-top: 4px; }

    /* Before/After */
    .ms .ba-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }
    .ms .ba-item { overflow: hidden; background: ${CREAM3}; }
    .ms .ba-imgs { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
    .ms .ba-img-wrap { position: relative; overflow: hidden; }
    .ms .ba-img { width: 100%; aspect-ratio: 3/4; object-fit: cover; }
    .ms .ba-label { position: absolute; bottom: 8px; left: 8px; background: rgba(0,0,0,0.6); color: #fff; font-family: 'Montserrat', sans-serif; font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; padding: 4px 8px; }
    .ms .ba-treatment { font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: ${PLUM}; text-align: center; padding: 14px; background: ${CREAM}; }

    /* Placeholder for missing before/after */
    .ms .ba-placeholder { aspect-ratio: 3/4; background: linear-gradient(135deg, ${CREAM3}, ${CREAM2}); display: flex; align-items: center; justify-content: center; }
    .ms .ba-ph-text { font-family: 'Montserrat', sans-serif; font-size: 10px; letter-spacing: 1px; text-transform: uppercase; color: ${MUTED}; text-align: center; padding: 16px; }

    /* Providers */
    .ms .provider-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 28px; }
    .ms .provider-card { background: ${CREAM}; border: 1px solid ${CREAM3}; }
    .ms .provider-photo { width: 100%; aspect-ratio: 4/5; object-fit: cover; object-position: top; background: ${CREAM3}; }
    .ms .provider-photo-placeholder { width: 100%; aspect-ratio: 4/5; background: linear-gradient(160deg, ${PLUM_DARK}, ${PLUM}); display: flex; align-items: center; justify-content: center; }
    .ms .pph-initials { font-family: 'Playfair Display', serif; font-size: 48px; color: rgba(255,255,255,0.4); }
    .ms .provider-info { padding: 22px 24px; }
    .ms .provider-name { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: ${PLUM}; margin-bottom: 4px; }
    .ms .provider-title { font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: ${GOLD}; margin-bottom: 8px; }
    .ms .provider-creds { font-family: 'Montserrat', sans-serif; font-size: 11px; color: ${MUTED}; margin-bottom: 14px; font-style: italic; }
    .ms .provider-bio { font-size: 13px; color: ${LIGHT}; line-height: 1.7; }

    /* Reviews */
    .ms .rv-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
    .ms .rv { background: ${CREAM}; border: 1px solid ${CREAM3}; padding: 32px; }
    .ms .rv-text { font-family: 'Playfair Display', serif; font-size: 15px; color: ${LIGHT}; line-height: 1.75; margin-bottom: 18px; font-style: italic; }
    .ms .rv-bottom { display: flex; align-items: center; gap: 12px; }
    .ms .rv-name { font-family: 'Montserrat', sans-serif; font-size: 12px; font-weight: 700; color: ${PLUM}; }
    .ms .rv-treatment { font-family: 'Montserrat', sans-serif; font-size: 11px; color: ${MUTED}; }

    /* Booking CTA */
    .ms .cta-band { background: ${CREAM3}; padding: 80px 0; }
    .ms .cta-inner { text-align: center; max-width: 660px; margin: 0 auto; }
    .ms .cta-label { font-family: 'Montserrat', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: ${GOLD}; margin-bottom: 14px; }
    .ms .cta-title { font-family: 'Playfair Display', serif; font-size: clamp(30px, 4vw, 50px); font-weight: 700; color: ${PLUM}; margin-bottom: 16px; line-height: 1.1; }
    .ms .cta-sub { font-size: 14px; color: ${MUTED}; margin-bottom: 32px; line-height: 1.8; }
    .ms .cta-financing { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-top: 22px; }
    .ms .fin-badge { display: flex; align-items: center; gap: 6px; font-family: 'Montserrat', sans-serif; font-size: 11px; color: ${MUTED}; }
    .ms .fin-dot { width: 5px; height: 5px; background: ${GOLD}; border-radius: 50%; }

    /* Contact */
    .ms .ct-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
    .ms .ct-block { background: ${CREAM2}; padding: 38px; }
    .ms .ct-block h3 { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: ${PLUM}; margin-bottom: 24px; }
    .ms .hr-row { display: flex; justify-content: space-between; padding: 11px 0; border-bottom: 1px solid ${CREAM3}; font-size: 13px; }
    .ms .hr-day { color: ${MUTED}; font-family: 'Montserrat', sans-serif; }
    .ms .hr-time { color: ${TEXT}; font-weight: 500; font-family: 'Montserrat', sans-serif; }
    .ms .ci { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 20px; }
    .ms .ci-line { width: 2px; height: 36px; background: ${GOLD}; flex-shrink: 0; margin-top: 4px; }
    .ms .ci-label { font-family: 'Montserrat', sans-serif; font-size: 9px; font-weight: 700; color: ${MUTED}; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 4px; }
    .ms .ci-val { font-size: 14px; color: ${TEXT}; font-weight: 500; }
    .ms .ci-val a { color: ${PLUM}; text-decoration: none; }
    .ms .ci-val a:hover { color: ${GOLD}; }

    /* Footer */
    .ms .footer { background: ${PLUM_DARK}; color: rgba(255,255,255,0.72); padding: 48px 0 28px; }
    .ms .footer-row { display: flex; justify-content: space-between; align-items: flex-start; gap: 32px; flex-wrap: wrap; margin-bottom: 36px; }
    .ms .footer-biz { font-family: 'Playfair Display', serif; font-size: 20px; color: #fff; margin-bottom: 6px; }
    .ms .footer-city { font-size: 12px; color: rgba(255,255,255,0.5); letter-spacing: 0.5px; }
    .ms .footer-links { display: flex; gap: 22px; flex-wrap: wrap; }
    .ms .footer-links a { color: rgba(255,255,255,0.55); font-size: 13px; text-decoration: none; font-family: 'Montserrat', sans-serif; transition: color 0.2s; }
    .ms .footer-links a:hover { color: ${GOLD}; }
    .ms .footer-copy { font-size: 11px; color: rgba(255,255,255,0.35); padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px; font-family: 'Montserrat', sans-serif; }
    .ms .footer-copy a { color: ${GOLD}; text-decoration: none; }

    /* Preview banner */
    .ms .preview-banner { position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); background: rgba(28,12,20,0.94); border: 1px solid rgba(201,169,106,0.3); padding: 10px 22px; display: flex; align-items: center; gap: 12px; z-index: 9999; backdrop-filter: blur(16px); white-space: nowrap; }
    .ms .preview-dot { width: 7px; height: 7px; background: ${GOLD}; border-radius: 50%; flex-shrink: 0; }
    .ms .preview-text { font-family: 'Montserrat', sans-serif; font-size: 12px; color: rgba(255,255,255,0.8); font-weight: 500; }
    .ms .preview-cta { background: ${GOLD}; color: ${PLUM_DARK}; padding: 7px 16px; font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.5px; text-decoration: none; text-transform: uppercase; }

    @media (max-width: 768px) {
      .ms .nav-links { display: none; }
      .ms .ct-grid { grid-template-columns: 1fr; }
      .ms .about-grid { grid-template-columns: 1fr; gap: 28px; }
      .ms .cred-item { border-right: none; padding: 12px 24px; }
      .ms .footer-row { flex-direction: column; }
      .ms .hero-trust { gap: 16px; }
    }
  `

  const hasBeforeAfter = config.beforeAfterGallery.length > 0
  const hasGallery = config.gallery.length > 0
  const hasHours = (config.hours ?? []).length > 0
  const bookingHref = config.bookingUrl || `tel:${config.phone}` || '#contact'

  const getInitials = (name: string) =>
    name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div className="ms">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* Announce bar */}
      {config.announceBar && (
        <div className="announce" dangerouslySetInnerHTML={{ __html: config.announceBar }} />
      )}

      {/* Nav */}
      <nav className="nav">
        <div className="nav-in">
          <div className="logo">
            <div className="logo-name">{config.businessName}</div>
            <div className="logo-tag">Medical Spa · {config.location}</div>
          </div>
          <ul className="nav-links">
            <li><a href="#services">Services</a></li>
            <li><a href="#results">Results</a></li>
            <li><a href="#team">Our Team</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <a href={bookingHref} className="nav-cta">Book a Consultation</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" />
        {config.heroImg && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={config.heroImg}
            alt={`${config.businessName} hero`}
            className="hero-img"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
          />
        )}
        <div className="hero-ov" />
        <div className="hero-con">
          <div className="hero-tag">Medical Aesthetics · {config.location}</div>
          <h1 className="hero-title"
            dangerouslySetInnerHTML={{ __html: config.heroHeadline.replace(/\*([^*]+)\*/g, '<em>$1</em>') }}
          />
          <p className="hero-sub">{config.heroSub}</p>
          <div className="hero-btns">
            <a href={bookingHref} className="btn-p">{config.ctaLabel || 'Book a Consultation'}</a>
            <a href="#services" className="btn-o">View Services</a>
          </div>
          <div className="hero-trust">
            <div className="htrust"><span className="hline" />Medical Director On-Site</div>
            <div className="htrust"><span className="hline" />FDA-Cleared Technology</div>
            {config.phone && <div className="htrust"><span className="hline" />{config.phone}</div>}
          </div>
        </div>
      </section>

      {/* Credentials strip */}
      {config.stats.length > 0 && (
        <div className="cred-strip">
          <div className="cred-row">
            {config.stats.map((s) => (
              <div key={s.label} className="cred-item">
                <span className="cred-num">{s.num}</span>
                <span className="cred-lbl">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Services */}
      <section id="services" className="sec">
        <div className="con">
          <div className="shdr">
            <div className="slbl">What We Offer</div>
            <h2 className="stitle">Our Treatments</h2>
            <div className="dvdr" />
            <p className="ssub">
              Premium medical-grade treatments performed by licensed providers using the latest FDA-cleared technology.
            </p>
          </div>
          <div className="svc-grid">
            {config.services.map((svc) => (
              <div key={svc.name} className="svc">
                <CategoryBadge label={svc.category} />
                <div className="svc-top">
                  <div className="svc-name">{svc.name}</div>
                  {svc.price && <div className="svc-price">{svc.price}</div>}
                </div>
                <div className="svc-desc">{svc.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section id="results" className="sec sec-cream">
        <div className="con">
          <div className="shdr">
            <div className="slbl">Real Results</div>
            <h2 className="stitle">Before &amp; After</h2>
            <div className="dvdr" />
            <p className="ssub">
              Every result shown is from a real patient treated at {config.businessName}. Individual results vary.
            </p>
          </div>
          {hasBeforeAfter ? (
            <div className="ba-grid">
              {config.beforeAfterGallery.map((pair, i) => (
                <div key={i} className="ba-item">
                  <div className="ba-imgs">
                    <div className="ba-img-wrap">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={pair.before}
                        alt={`Before ${pair.treatment}`}
                        className="ba-img"
                        onError={(e) => {
                          const wrap = (e.currentTarget as HTMLImageElement).parentElement!
                          wrap.innerHTML = `<div class="ba-placeholder"><div class="ba-ph-text">Before<br/>Photo</div></div>`
                        }}
                      />
                      <div className="ba-label">Before</div>
                    </div>
                    <div className="ba-img-wrap">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={pair.after}
                        alt={`After ${pair.treatment}`}
                        className="ba-img"
                        onError={(e) => {
                          const wrap = (e.currentTarget as HTMLImageElement).parentElement!
                          wrap.innerHTML = `<div class="ba-placeholder"><div class="ba-ph-text">After<br/>Photo</div></div>`
                        }}
                      />
                      <div className="ba-label">After</div>
                    </div>
                  </div>
                  <div className="ba-treatment">{pair.treatment}</div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              background: CREAM3,
              padding: '48px 32px',
              textAlign: 'center',
              border: `1px solid ${CREAM3}`,
            }}>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, color: MUTED, lineHeight: 1.7 }}>
                Before &amp; after photos will appear here. Contact us to see real patient results.
              </p>
              <a href={bookingHref} className="btn-p" style={{ marginTop: 20, display: 'inline-block' }}>
                Request a Consultation
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Additional gallery */}
      {hasGallery && (
        <section className="sec sec-cream3">
          <div className="con">
            <div className="shdr">
              <div className="slbl">Our Space</div>
              <h2 className="stitle">Gallery</h2>
              <div className="dvdr" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {config.gallery.map((img, i) => (
                <div key={i} style={{ overflow: 'hidden', background: CREAM3 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt={img.alt}
                    style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).parentElement!.style.display = 'none' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Provider team */}
      <section id="team" className="sec">
        <div className="con">
          <div className="shdr">
            <div className="slbl">Medical Team</div>
            <h2 className="stitle">Meet Your Providers</h2>
            <div className="dvdr" />
            <p className="ssub">
              Board-certified professionals committed to your safety, comfort, and results.
            </p>
          </div>
          <div className="provider-grid">
            {config.providers.map((p) => (
              <div key={p.name} className="provider-card">
                {p.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.photo}
                    alt={p.name}
                    className="provider-photo"
                    onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement
                      const div = document.createElement('div')
                      div.className = 'provider-photo-placeholder'
                      div.innerHTML = `<span class="pph-initials">${getInitials(p.name)}</span>`
                      img.parentElement!.insertBefore(div, img)
                      img.style.display = 'none'
                    }}
                  />
                ) : (
                  <div className="provider-photo-placeholder">
                    <span className="pph-initials">{getInitials(p.name)}</span>
                  </div>
                )}
                <div className="provider-info">
                  <div className="provider-name">{p.name}</div>
                  <div className="provider-title">{p.title}</div>
                  <div className="provider-creds">{p.credentials}</div>
                  <div className="provider-bio">{p.bio}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {config.reviews.length > 0 && (
        <section className="sec sec-cream">
          <div className="con">
            <div className="shdr">
              <div className="slbl">Patient Stories</div>
              <h2 className="stitle">What Our Clients Say</h2>
              <div className="dvdr" />
            </div>
            <div className="rv-grid">
              {config.reviews.map((rv) => (
                <div key={rv.name} className="rv">
                  <Stars count={rv.stars} />
                  <p className="rv-text">&ldquo;{rv.text}&rdquo;</p>
                  <div className="rv-bottom">
                    <div>
                      <div className="rv-name">— {rv.name}</div>
                      {rv.treatment && <div className="rv-treatment">{rv.treatment}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Booking CTA */}
      <section className="cta-band">
        <div className="con">
          <div className="cta-inner">
            <div className="cta-label">Get Started</div>
            <h2 className="cta-title">Your Best Look Starts With One Conversation</h2>
            <p className="cta-sub">
              Schedule a complimentary consultation with one of our providers. We&apos;ll build a personalized treatment plan around your goals.
            </p>
            <a href={bookingHref} className="btn-p">{config.ctaLabel || 'Book a Consultation'}</a>
            {(config.financing ?? []).length > 0 && (
              <div className="cta-financing">
                <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, color: MUTED }}>Financing available:</span>
                {(config.financing ?? []).map((f) => (
                  <div key={f} className="fin-badge">
                    <span className="fin-dot" />{f}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact & Hours */}
      <section id="contact" className="sec">
        <div className="con">
          <div className="shdr">
            <div className="slbl">Get In Touch</div>
            <h2 className="stitle">Contact & Hours</h2>
            <div className="dvdr" />
          </div>
          <div className="ct-grid">
            <div className="ct-block">
              <h3>Contact Us</h3>
              {config.phone && (
                <div className="ci">
                  <div className="ci-line" />
                  <div>
                    <div className="ci-label">Phone</div>
                    <div className="ci-val"><a href={`tel:${config.phone}`}>{config.phone}</a></div>
                  </div>
                </div>
              )}
              {config.email && (
                <div className="ci">
                  <div className="ci-line" />
                  <div>
                    <div className="ci-label">Email</div>
                    <div className="ci-val"><a href={`mailto:${config.email}`}>{config.email}</a></div>
                  </div>
                </div>
              )}
              <div className="ci">
                <div className="ci-line" />
                <div>
                  <div className="ci-label">Location</div>
                  <div className="ci-val">{config.location}</div>
                </div>
              </div>
              {config.website && (
                <div className="ci">
                  <div className="ci-line" />
                  <div>
                    <div className="ci-label">Website</div>
                    <div className="ci-val">
                      <a href={config.website} target="_blank" rel="noopener noreferrer">
                        {config.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  </div>
                </div>
              )}
              {config.socials && (
                <div className="ci">
                  <div className="ci-line" />
                  <div>
                    <div className="ci-label">Follow Us</div>
                    <div className="ci-val" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                      {config.socials.ig && (
                        <a href={config.socials.ig} target="_blank" rel="noopener noreferrer">Instagram</a>
                      )}
                      {config.socials.fb && (
                        <a href={config.socials.fb} target="_blank" rel="noopener noreferrer">Facebook</a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="ct-block">
              <h3>{hasHours ? 'Hours' : 'By Appointment'}</h3>
              {hasHours ? (
                (config.hours ?? []).map((h) => (
                  <div key={h.day} className="hr-row">
                    <span className="hr-day">{h.day}</span>
                    <span className="hr-time">{h.hours}</span>
                  </div>
                ))
              ) : (
                <div style={{ color: MUTED, fontSize: 14, lineHeight: 1.8 }}>
                  <p style={{ marginBottom: 20 }}>
                    We operate by appointment. Contact us to find a time that works for you.
                  </p>
                  <a
                    href={bookingHref}
                    style={{
                      display: 'inline-block',
                      background: PLUM,
                      color: '#fff',
                      padding: '14px 28px',
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 700,
                      fontSize: 13,
                      letterSpacing: '0.5px',
                      textDecoration: 'none',
                    }}
                  >
                    Schedule a Consultation
                  </a>
                </div>
              )}
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
              <div className="footer-city">{config.location}</div>
            </div>
            <div className="footer-links">
              <a href="#services">Services</a>
              <a href="#results">Results</a>
              <a href="#team">Our Team</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
          <div className="footer-copy">
            <span>© {new Date().getFullYear()} {config.businessName}. All rights reserved.</span>
            <span>
              Preview built by{' '}
              <a href="https://caliberwebstudio.com" target="_blank" rel="noopener noreferrer">
                Caliber Web Studio
              </a>
            </span>
          </div>
        </div>
      </footer>

      {/* Preview banner */}
      <div className="preview-banner">
        <span className="preview-dot" />
        <span className="preview-text">Custom preview for {config.businessName}</span>
        <a href="https://caliberwebstudio.com" target="_blank" rel="noopener noreferrer" className="preview-cta">
          Get This Site
        </a>
      </div>
    </div>
  )
}
