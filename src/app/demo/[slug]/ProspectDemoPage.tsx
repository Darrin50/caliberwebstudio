'use client'

import { useEffect } from 'react'
import type { ProspectDemoConfig } from '@/lib/prospect-demo-data'

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: 2, marginBottom: 12 }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: '#F6C90E', fontSize: 15 }}>★</span>
      ))}
    </div>
  )
}

export default function ProspectDemoPage({ config }: { config: ProspectDemoConfig }) {
  const t = config.theme

  /* Hide agency UI while demo is mounted */
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
    .dw *, .dw *::before, .dw *::after { box-sizing: border-box; }
    .dw { font-family: 'Inter', system-ui, sans-serif; background: ${t.bg}; color: ${t.text}; overflow-x: hidden; cursor: auto !important; min-height: 100vh; }
    .dw a, .dw button { cursor: pointer !important; }
    .dw img { display: block; max-width: 100%; }
    .dw .con { max-width: 1100px; margin: 0 auto; padding: 0 24px; }

    .dw .announce { background: ${t.accent}; color: ${t.bg}; text-align: center; padding: 10px 20px; font-size: 13px; font-weight: 600; }

    .dw .nav { background: ${t.bg}cc; backdrop-filter: blur(8px); border-bottom: 1px solid rgba(255,255,255,0.08); position: sticky; top: 0; z-index: 100; padding: 0 24px; }
    .dw .nav-in { max-width: 1100px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; height: 68px; }
    .dw .logo-name { font-size: 18px; font-weight: 800; color: ${t.text}; line-height: 1; }
    .dw .logo-tag { font-size: 10px; color: ${t.muted}; letter-spacing: 1.5px; text-transform: uppercase; }
    .dw .nav-links { display: flex; gap: 28px; list-style: none; margin: 0; padding: 0; }
    .dw .nav-links a { color: ${t.light}; font-size: 14px; font-weight: 500; text-decoration: none; transition: color 0.2s; }
    .dw .nav-links a:hover { color: ${t.accent}; }
    .dw .nav-cta { background: ${t.accent}; color: ${t.bg}; padding: 10px 20px; border-radius: ${t.radius}; font-weight: 700; font-size: 14px; text-decoration: none; display: inline-block; transition: background 0.2s; }
    .dw .nav-cta:hover { background: ${t.accent2}; }

    .dw .hero { position: relative; height: 88vh; min-height: 560px; max-height: 820px; overflow: hidden; display: flex; align-items: center; }
    .dw .hero-bg { position: absolute; inset: 0; background: linear-gradient(135deg, ${t.bg3} 0%, ${t.bg} 60%, ${t.bg2} 100%); }
    .dw .hero-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 25%; }
    .dw .hero-ov { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.65) 52%, rgba(0,0,0,0.28) 100%); }
    .dw .hero-con { position: relative; z-index: 2; max-width: 1100px; margin: 0 auto; padding: 0 24px; width: 100%; }
    .dw .hero-tag { display: inline-block; border: 1px solid ${t.accent}; color: ${t.accent}; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; padding: 6px 14px; border-radius: ${t.radius}; margin-bottom: 20px; }
    .dw .hero-title { font-size: clamp(40px, 6vw, 74px); font-weight: 800; line-height: 1.05; letter-spacing: -2px; color: ${t.text}; max-width: 660px; margin-bottom: 18px; }
    .dw .hero-title span { color: ${t.accent}; }
    .dw .hero-sub { font-size: 18px; color: rgba(255,255,255,0.78); max-width: 500px; margin-bottom: 34px; line-height: 1.65; }
    .dw .hero-btns { display: flex; gap: 14px; flex-wrap: wrap; }
    .dw .btn-p { background: ${t.accent}; color: ${t.bg}; padding: 15px 30px; border-radius: ${t.radius}; font-weight: 700; font-size: 15px; text-decoration: none; display: inline-block; transition: background 0.2s; }
    .dw .btn-p:hover { background: ${t.accent2}; }
    .dw .btn-o { border: 2px solid rgba(255,255,255,0.42); color: ${t.text}; padding: 13px 28px; border-radius: ${t.radius}; font-weight: 600; font-size: 15px; text-decoration: none; display: inline-block; transition: border-color 0.2s, color 0.2s; }
    .dw .btn-o:hover { border-color: ${t.accent}; color: ${t.accent}; }
    .dw .hero-badges { display: flex; gap: 24px; margin-top: 36px; flex-wrap: wrap; }
    .dw .hbadge { display: flex; align-items: center; gap: 8px; font-size: 13px; color: rgba(255,255,255,0.66); }
    .dw .bdot { width: 7px; height: 7px; background: ${t.accent}; border-radius: 50%; flex-shrink: 0; }

    .dw .stats-bar { background: ${t.bg3}; border-top: 1px solid rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.06); padding: 28px 0; }
    .dw .stats-row { display: flex; justify-content: center; gap: 48px; flex-wrap: wrap; }
    .dw .stat-item { text-align: center; }
    .dw .stat-num { font-size: 32px; font-weight: 800; color: ${t.accent}; display: block; line-height: 1; }
    .dw .stat-lbl { font-size: 11px; color: ${t.muted}; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; }

    .dw .sec { padding: 80px 0; }
    .dw .sec-alt { background: ${t.bg2}; }
    .dw .sec-dark { background: ${t.bg3}; }
    .dw .slbl { font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: ${t.accent}; margin-bottom: 10px; }
    .dw .stitle { font-size: clamp(28px, 4vw, 42px); font-weight: 800; color: ${t.text}; letter-spacing: -1px; margin-bottom: 12px; line-height: 1.1; }
    .dw .ssub { font-size: 16px; color: ${t.muted}; max-width: 520px; line-height: 1.7; }
    .dw .shdr { margin-bottom: 48px; }
    .dw .dvdr { width: 44px; height: 3px; background: ${t.accent}; margin: 14px 0 18px; }

    .dw .svc-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; overflow: hidden; }
    .dw .svc { background: ${t.bg2}; padding: 26px 28px; }
    .dw .svc-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; }
    .dw .svc-name { font-size: 17px; font-weight: 700; color: ${t.text}; }
    .dw .svc-price { font-size: 18px; font-weight: 800; color: ${t.accent}; white-space: nowrap; margin-left: 12px; }
    .dw .svc-desc { font-size: 14px; color: ${t.muted}; line-height: 1.6; }

    .dw .gal-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
    .dw .gal-item { overflow: hidden; border-radius: 6px; background: ${t.bg3}; }
    .dw .gal-item img { width: 100%; aspect-ratio: 4/3; object-fit: cover; transition: transform 0.4s; }
    .dw .gal-item:hover img { transform: scale(1.04); }

    .dw .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
    .dw .about-img-wrap { overflow: hidden; border-radius: 8px; background: ${t.bg3}; }
    .dw .about-img { width: 100%; aspect-ratio: 4/5; object-fit: cover; }
    .dw .about-text p { color: ${t.light}; line-height: 1.8; font-size: 15px; margin-bottom: 16px; }
    .dw .about-stats { display: flex; gap: 32px; margin-top: 32px; padding-top: 28px; border-top: 1px solid rgba(255,255,255,0.08); flex-wrap: wrap; }
    .dw .astat-num { font-size: 30px; font-weight: 800; color: ${t.accent}; display: block; }
    .dw .astat-lbl { font-size: 11px; color: ${t.muted}; text-transform: uppercase; letter-spacing: 1px; }

    .dw .rv-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
    .dw .rv { background: ${t.bg2}; border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; padding: 28px; }
    .dw .rv-text { font-size: 15px; color: ${t.light}; line-height: 1.7; margin-bottom: 14px; font-style: italic; }
    .dw .rv-name { font-size: 13px; font-weight: 700; color: ${t.accent}; }

    .dw .ct-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
    .dw .ct-block { background: ${t.bg2}; border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; padding: 36px; }
    .dw .ct-block h3 { font-size: 20px; font-weight: 700; color: ${t.text}; margin-bottom: 22px; }
    .dw .hr-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 14px; }
    .dw .hr-day { color: ${t.muted}; }
    .dw .hr-time { color: ${t.text}; font-weight: 500; }
    .dw .ci { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 18px; }
    .dw .ci-icon { width: 36px; height: 36px; background: rgba(255,255,255,0.07); border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; }
    .dw .ci-label { font-size: 11px; color: ${t.muted}; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px; }
    .dw .ci-val { font-size: 15px; color: ${t.text}; font-weight: 500; }
    .dw .ci-val a { color: ${t.accent}; text-decoration: none; }
    .dw .ci-val a:hover { text-decoration: underline; }

    .dw .cta-band { background: ${t.accent}; padding: 60px 0; text-align: center; }
    .dw .cta-title { font-size: clamp(24px, 4vw, 38px); font-weight: 800; color: ${t.bg}; margin-bottom: 12px; letter-spacing: -1px; }
    .dw .cta-sub { font-size: 16px; color: ${t.bg}; opacity: 0.8; margin-bottom: 28px; }
    .dw .cta-btn { background: ${t.bg}; color: ${t.accent}; padding: 16px 36px; border-radius: ${t.radius}; font-weight: 800; font-size: 16px; text-decoration: none; display: inline-block; transition: opacity 0.2s; }
    .dw .cta-btn:hover { opacity: 0.88; }

    .dw .footer { background: ${t.bg}; border-top: 1px solid rgba(255,255,255,0.07); padding: 40px 0 28px; }
    .dw .footer-row { display: flex; justify-content: space-between; align-items: flex-start; gap: 32px; flex-wrap: wrap; margin-bottom: 32px; }
    .dw .footer-biz { font-size: 16px; font-weight: 800; color: ${t.text}; margin-bottom: 4px; }
    .dw .footer-city { font-size: 13px; color: ${t.muted}; }
    .dw .footer-links { display: flex; gap: 20px; flex-wrap: wrap; }
    .dw .footer-links a { color: ${t.muted}; font-size: 13px; text-decoration: none; }
    .dw .footer-links a:hover { color: ${t.accent}; }
    .dw .footer-copy { font-size: 12px; color: ${t.muted}; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px; }
    .dw .footer-copy a { color: ${t.accent}; text-decoration: none; }

    .dw .preview-banner { position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.92); border: 1px solid rgba(255,255,255,0.15); border-radius: 40px; padding: 10px 22px; display: flex; align-items: center; gap: 12px; z-index: 9999; backdrop-filter: blur(12px); white-space: nowrap; }
    .dw .preview-dot { width: 8px; height: 8px; background: ${t.accent}; border-radius: 50%; flex-shrink: 0; }
    .dw .preview-text { font-size: 13px; color: #fff; font-weight: 500; }
    .dw .preview-cta { background: ${t.accent}; color: #000; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: 700; text-decoration: none; }

    @media (max-width: 768px) {
      .dw .nav-links { display: none; }
      .dw .about-grid { grid-template-columns: 1fr; gap: 32px; }
      .dw .ct-grid { grid-template-columns: 1fr; }
      .dw .gal-grid { grid-template-columns: repeat(2, 1fr); }
      .dw .footer-row { flex-direction: column; }
      .dw .about-stats { gap: 20px; }
    }
  `

  const hasGallery = config.gallery.length > 0
  const hasHours = config.hours.length > 0

  return (
    <div className="dw">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* Announce bar */}
      {config.announceBar && (
        <div className="announce">{config.announceBar}</div>
      )}

      {/* Nav */}
      <nav className="nav">
        <div className="nav-in">
          <div>
            <div className="logo-name">{config.businessName}</div>
            <div className="logo-tag">{config.businessType}</div>
          </div>
          <ul className="nav-links">
            <li><a href="#services">Services</a></li>
            {hasGallery && <li><a href="#gallery">Gallery</a></li>}
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          {config.phone ? (
            <a href={`tel:${config.phone}`} className="nav-cta">{config.phone}</a>
          ) : (
            <a href="#contact" className="nav-cta">Contact Us</a>
          )}
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
          <div className="hero-tag">{config.businessType}</div>
          <h1 className="hero-title">{config.businessName}</h1>
          <p className="hero-sub">{config.tagline}</p>
          <div className="hero-btns">
            {config.phone ? (
              <a href={`tel:${config.phone}`} className="btn-p">{config.ctaLabel || 'Call Now'}</a>
            ) : (
              <a href="#contact" className="btn-p">{config.ctaLabel || 'Contact Us'}</a>
            )}
            <a href="#services" className="btn-o">View Services</a>
          </div>
          <div className="hero-badges">
            <div className="hbadge"><span className="bdot" />Professional Service</div>
            <div className="hbadge"><span className="bdot" />Local & Trusted</div>
            {config.phone && <div className="hbadge"><span className="bdot" />{config.phone}</div>}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      {config.stats.length > 0 && (
        <div className="stats-bar">
          <div className="stats-row">
            {config.stats.map((s) => (
              <div key={s.label} className="stat-item">
                <span className="stat-num">{s.num}</span>
                <span className="stat-lbl">{s.label}</span>
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
            <h2 className="stitle">Our Services</h2>
            <div className="dvdr" />
            <p className="ssub">Everything you need, delivered with expertise and care.</p>
          </div>
          <div className="svc-grid">
            {config.services.map((svc) => (
              <div key={svc.name} className="svc">
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

      {/* Gallery */}
      {hasGallery && (
        <section id="gallery" className="sec sec-alt">
          <div className="con">
            <div className="shdr">
              <div className="slbl">Our Work</div>
              <h2 className="stitle">Photo Gallery</h2>
              <div className="dvdr" />
            </div>
            <div className="gal-grid">
              {config.gallery.map((img, i) => (
                <div key={i} className="gal-item">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt={img.alt}
                    onError={(e) => {
                      const el = e.currentTarget as HTMLImageElement
                      el.parentElement!.style.display = 'none'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reviews */}
      <section className="sec sec-dark">
        <div className="con">
          <div className="shdr">
            <div className="slbl">What Clients Say</div>
            <h2 className="stitle">Customer Reviews</h2>
            <div className="dvdr" />
          </div>
          <div className="rv-grid">
            {config.reviews.map((rv) => (
              <div key={rv.name} className="rv">
                <Stars count={rv.stars} />
                <p className="rv-text">"{rv.text}"</p>
                <div className="rv-name">— {rv.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="sec sec-alt">
        <div className="con">
          <div className="about-grid">
            <div className="about-img-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={config.aboutImg || config.heroImg}
                alt={`About ${config.businessName}`}
                className="about-img"
                onError={(e) => {
                  const el = e.currentTarget as HTMLImageElement
                  el.parentElement!.style.background = `linear-gradient(135deg, ${t.bg3}, ${t.bg2})`
                  el.style.display = 'none'
                }}
              />
            </div>
            <div className="about-text">
              <div className="slbl">Our Story</div>
              <h2 className="stitle">About {config.businessName}</h2>
              <div className="dvdr" />
              <p>{config.about}</p>
              {config.website && (
                <p>
                  <a
                    href={config.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: t.accent, textDecoration: 'none', fontWeight: 600 }}
                  >
                    Visit our website →
                  </a>
                </p>
              )}
              {config.stats.length > 0 && (
                <div className="about-stats">
                  {config.stats.map((s) => (
                    <div key={s.label}>
                      <span className="astat-num">{s.num}</span>
                      <span className="astat-lbl">{s.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="cta-band">
        <div className="con">
          <h2 className="cta-title">Ready to Get Started?</h2>
          <p className="cta-sub">Contact us today and let&apos;s talk about what we can do for you.</p>
          {config.phone ? (
            <a href={`tel:${config.phone}`} className="cta-btn">{config.phone}</a>
          ) : (
            <a href="#contact" className="cta-btn">Contact Us</a>
          )}
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
            {/* Contact info */}
            <div className="ct-block">
              <h3>Contact Information</h3>
              {config.phone && (
                <div className="ci">
                  <div className="ci-icon">📞</div>
                  <div>
                    <div className="ci-label">Phone</div>
                    <div className="ci-val"><a href={`tel:${config.phone}`}>{config.phone}</a></div>
                  </div>
                </div>
              )}
              {config.email && (
                <div className="ci">
                  <div className="ci-icon">✉️</div>
                  <div>
                    <div className="ci-label">Email</div>
                    <div className="ci-val"><a href={`mailto:${config.email}`}>{config.email}</a></div>
                  </div>
                </div>
              )}
              {config.address && (
                <div className="ci">
                  <div className="ci-icon">📍</div>
                  <div>
                    <div className="ci-label">Address</div>
                    <div className="ci-val">{config.address}{config.city && `, ${config.city}`}</div>
                  </div>
                </div>
              )}
              {config.website && (
                <div className="ci">
                  <div className="ci-icon">🌐</div>
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
              {config.socials && Object.keys(config.socials).length > 0 && (
                <div className="ci">
                  <div className="ci-icon">🔗</div>
                  <div>
                    <div className="ci-label">Social Media</div>
                    <div className="ci-val" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                      {config.socials.facebook && (
                        <a href={config.socials.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
                      )}
                      {config.socials.instagram && (
                        <a href={config.socials.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
                      )}
                      {config.socials.yelp && (
                        <a href={config.socials.yelp} target="_blank" rel="noopener noreferrer">Yelp</a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Hours */}
            <div className="ct-block">
              <h3>{hasHours ? 'Hours of Operation' : 'We\'re Here For You'}</h3>
              {hasHours ? (
                config.hours.map((h) => (
                  <div key={h.day} className="hr-row">
                    <span className="hr-day">{h.day}</span>
                    <span className="hr-time">{h.hours}</span>
                  </div>
                ))
              ) : (
                <div style={{ color: t.muted, fontSize: 14, lineHeight: 1.7 }}>
                  <p style={{ marginBottom: 16 }}>
                    Contact us directly for our current hours and availability.
                  </p>
                  {config.phone && (
                    <a
                      href={`tel:${config.phone}`}
                      style={{
                        display: 'inline-block',
                        background: t.accent,
                        color: t.bg,
                        padding: '12px 24px',
                        borderRadius: t.radius,
                        fontWeight: 700,
                        fontSize: 15,
                        textDecoration: 'none',
                      }}
                    >
                      {config.phone}
                    </a>
                  )}
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
              <div className="footer-city">{config.city || 'Local Business'}</div>
            </div>
            <div className="footer-links">
              <a href="#services">Services</a>
              {hasGallery && <a href="#gallery">Gallery</a>}
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
          <div className="footer-copy">
            <span>© {new Date().getFullYear()} {config.businessName}. All rights reserved.</span>
            <span>
              Demo built by{' '}
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
        <span className="preview-text">This is a demo preview for {config.businessName}</span>
        <a href="https://caliberwebstudio.com" target="_blank" rel="noopener noreferrer" className="preview-cta">
          Get This Site
        </a>
      </div>
    </div>
  )
}
