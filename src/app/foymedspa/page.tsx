'use client'

import { useEffect } from 'react'

export default function FOYMedSpaDemo() {
  useEffect(() => {
    const ids = ['cursor-dot', 'cursor-outer', 'meteorField', 'sunParticles']
    const saved: Record<string, string> = {}
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) { saved[id] = el.style.display; el.style.display = 'none' }
    })
    document.querySelectorAll('canvas').forEach((c) => {
      (c as HTMLElement).style.display = 'none'
    })
    const origCursor = document.body.style.cursor
    document.body.style.cursor = 'auto'
    return () => {
      ids.forEach((id) => {
        const el = document.getElementById(id)
        if (el) el.style.display = saved[id] ?? ''
      })
      document.querySelectorAll('canvas').forEach((c) => {
        (c as HTMLElement).style.display = ''
      })
      document.body.style.cursor = origCursor
    }
  }, [])

  return (
    <div className="foy">
      {/* Google Fonts */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500;600;700;800&display=swap');` }} />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Announce Bar */}
      <div className="foy-announce">
        Now Accepting New Patients &nbsp;·&nbsp; MD-Owned &amp; Operated &nbsp;·&nbsp; Southfield, MI
        &nbsp;&nbsp;
        <a href="tel:2487317414" className="foy-announce-link">Book Today →</a>
      </div>

      {/* Navigation */}
      <nav className="foy-nav">
        <div className="foy-nav-in">
          <div className="foy-logo">
            <div className="foy-logo-name">FOY Med Spa</div>
            <div className="foy-logo-tag">Medical Aesthetics · Southfield, MI</div>
          </div>
          <ul className="foy-nav-links">
            <li><a href="#services">Services</a></li>
            <li><a href="#results">Results</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <a href="tel:2487317414" className="foy-nav-cta">Book Now</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="foy-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.pexels.com/photos/3985341/pexels-photo-3985341.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Luxury medical aesthetic treatment at FOY Med Spa, Southfield Michigan"
          className="foy-hero-img"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
        />
        <div className="foy-hero-ov" />
        <div className="foy-hero-con">
          <div className="foy-hero-inner">
            <div className="foy-tag">Southfield&apos;s Only MD-Owned Med Spa</div>
            <h1 className="foy-hero-title">
              Your Skin Deserves<br />
              <em>a Doctor&apos;s Touch.</em>
            </h1>
            <p className="foy-hero-sub">
              Board-certified physician. Advanced aesthetics. Real results.
              Dr. Gena Harrison-Anderson, MD leads every treatment plan at FOY.
            </p>
            <div className="foy-hero-btns">
              <a href="tel:2487317414" className="foy-btn-p">Book a Consultation</a>
              <a href="#services" className="foy-btn-o">Explore Services</a>
            </div>
            <div className="foy-hero-trust">
              <div className="foy-htrust"><span className="foy-dot" />MD Medical Director On-Site</div>
              <div className="foy-htrust"><span className="foy-dot" />Spravato REMS Certified</div>
              <div className="foy-htrust"><span className="foy-dot" />Minority Woman-Owned</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="foy-stats">
        <div className="foy-con">
          <div className="foy-stats-row">
            {[
              { num: 'MD', label: 'Medical Director' },
              { num: '10+', label: 'Services Offered' },
              { num: '5★', label: 'Patient Reviews' },
              { num: 'REMS', label: 'Spravato Certified' },
            ].map((s) => (
              <div key={s.label} className="foy-stat">
                <span className="foy-stat-num">{s.num}</span>
                <span className="foy-stat-lbl">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="foy-marquee">
        <div className="foy-marquee-track">
          {[
            'BOTOX & DYSPORT', 'DERMAL FILLERS', 'LASER HAIR REMOVAL',
            'IV VITAMIN THERAPY', 'BODY SCULPTING', 'SEMAGLUTIDE WEIGHT LOSS',
            'OPUS PLASMA RESURFACING', 'MICRONEEDLING', 'PRP THERAPY', 'FACIALS & SKIN',
          ].flatMap((s, i) => [
            <span key={`s-${i}`}>{s}</span>,
            <span key={`d-${i}`} className="foy-mdot">◆</span>,
          ])}
          {[
            'BOTOX & DYSPORT', 'DERMAL FILLERS', 'LASER HAIR REMOVAL',
            'IV VITAMIN THERAPY', 'BODY SCULPTING', 'SEMAGLUTIDE WEIGHT LOSS',
            'OPUS PLASMA RESURFACING', 'MICRONEEDLING', 'PRP THERAPY', 'FACIALS & SKIN',
          ].flatMap((s, i) => [
            <span key={`s2-${i}`}>{s}</span>,
            <span key={`d2-${i}`} className="foy-mdot">◆</span>,
          ])}
        </div>
      </div>

      {/* Services */}
      <section id="services" className="foy-sec">
        <div className="foy-con">
          <div className="foy-shdr">
            <div className="foy-slbl">What We Offer</div>
            <h2 className="foy-stitle">Advanced Medical Aesthetics</h2>
            <div className="foy-dvdr" />
            <p className="foy-ssub">
              Every treatment at FOY is physician-supervised and tailored to your skin, body, and goals.
              No cookie-cutter protocols — just real results.
            </p>
          </div>
          <div className="foy-svc-grid">
            {SERVICES.map((svc) => (
              <div key={svc.name} className="foy-svc">
                <div className="foy-svc-icon">{svc.icon}</div>
                <div className="foy-svc-name">{svc.name}</div>
                <div className="foy-svc-desc">{svc.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results / Gallery */}
      <section id="results" className="foy-sec foy-sec-alt">
        <div className="foy-con">
          <div className="foy-shdr">
            <div className="foy-slbl">Real Patients, Real Results</div>
            <h2 className="foy-stitle">The FOY Difference</h2>
            <div className="foy-dvdr" />
            <p className="foy-ssub">
              No stock photos. No before/after filters. Just the work we do every day
              in Suite C2, Southfield.
            </p>
          </div>
          <div className="foy-gal-grid">
            {GALLERY.map((img, i) => (
              <div key={i} className="foy-gal-item">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt={img.alt}
                  onError={(e) => {
                    const el = e.currentTarget as HTMLImageElement
                    el.parentElement!.style.background = `linear-gradient(135deg, #1c1a16, #0a0908)`
                    el.style.display = 'none'
                  }}
                />
                {img.label && <div className="foy-gal-label">{img.label}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Dr. Bio */}
      <section id="about" className="foy-sec">
        <div className="foy-con">
          <div className="foy-about-grid">
            <div className="foy-about-img-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Dr. Gena Harrison-Anderson, MD — Medical Director and Owner of FOY Med Spa"
                className="foy-about-img"
                onError={(e) => {
                  const el = e.currentTarget as HTMLImageElement
                  el.parentElement!.style.background = `linear-gradient(135deg, #1c1a16, #2a2520)`
                  el.style.display = 'none'
                }}
              />
              <div className="foy-about-badge">
                <div className="foy-badge-name">Dr. Gena Harrison-Anderson</div>
                <div className="foy-badge-title">MD · Medical Director &amp; Owner</div>
              </div>
            </div>
            <div className="foy-about-text">
              <div className="foy-slbl">Our Story</div>
              <h2 className="foy-stitle">Medicine Meets Artistry</h2>
              <div className="foy-dvdr" />
              <p>
                FOY Med Spa was founded on a belief that every person deserves access to
                physician-led aesthetic care in a space that feels like home. Dr. Gena
                Harrison-Anderson, MD built FOY to be different — not a franchise, not a
                pop-up injector, not a template.
              </p>
              <p>
                As Southfield&apos;s only MD-owned medical spa, FOY combines clinical precision
                with a warm, inclusive environment. Whether you&apos;re coming in for Botox,
                laser treatments, IV therapy, or Semaglutide — you&apos;re being cared for by
                a team led by a board-certified physician who actually knows your name.
              </p>
              <div className="foy-creds">
                {CREDS.map((c) => (
                  <div key={c} className="foy-cred-item">
                    <span className="foy-cred-dot">◆</span>
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="foy-sec foy-sec-dark">
        <div className="foy-con">
          <div className="foy-shdr">
            <div className="foy-slbl">Patient Reviews</div>
            <h2 className="foy-stitle">What Southfield Is Saying</h2>
            <div className="foy-dvdr" />
          </div>
          <div className="foy-rv-grid">
            {REVIEWS.map((rv) => (
              <div key={rv.name} className="foy-rv">
                <div className="foy-rv-stars">{'★'.repeat(rv.stars)}</div>
                <p className="foy-rv-text">&ldquo;{rv.text}&rdquo;</p>
                <div className="foy-rv-name">— {rv.name}</div>
                {rv.service && <div className="foy-rv-service">{rv.service}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="foy-cta-band">
        <div className="foy-con foy-cta-in">
          <div>
            <h2 className="foy-cta-title">Ready to See What&apos;s Possible?</h2>
            <p className="foy-cta-sub">
              Book a free consultation with Dr. Harrison-Anderson&apos;s team today.
              No pressure. Just real answers about what will work for you.
            </p>
          </div>
          <div className="foy-cta-btns">
            <a href="tel:2487317414" className="foy-cta-btn">(248) 731-7414</a>
            <a href="mailto:contactus@foreverfoy.com" className="foy-cta-btn-o">Send a Message</a>
          </div>
        </div>
      </section>

      {/* Contact & Hours */}
      <section id="contact" className="foy-sec foy-sec-alt">
        <div className="foy-con">
          <div className="foy-shdr">
            <div className="foy-slbl">Visit Us</div>
            <h2 className="foy-stitle">Contact &amp; Hours</h2>
            <div className="foy-dvdr" />
          </div>
          <div className="foy-ct-grid">
            <div className="foy-ct-block">
              <h3>Contact Information</h3>
              {CONTACT_INFO.map((ci) => (
                <div key={ci.label} className="foy-ci">
                  <div className="foy-ci-icon">{ci.icon}</div>
                  <div>
                    <div className="foy-ci-label">{ci.label}</div>
                    {ci.href ? (
                      <a href={ci.href} className="foy-ci-val foy-ci-link">{ci.val}</a>
                    ) : (
                      <div className="foy-ci-val">{ci.val}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="foy-ct-block">
              <h3>Hours of Operation</h3>
              {HOURS.map((h) => (
                <div key={h.day} className="foy-hr-row">
                  <span className="foy-hr-day">{h.day}</span>
                  <span className="foy-hr-time">{h.hours}</span>
                </div>
              ))}
              <div className="foy-hr-note">
                Walk-ins welcome · Appointments recommended
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="foy-footer">
        <div className="foy-con">
          <div className="foy-footer-row">
            <div>
              <div className="foy-footer-biz">FOY Med Spa</div>
              <div className="foy-footer-city">18161 W 13 Mile Rd, Suite C2 · Southfield, MI 48076</div>
            </div>
            <div className="foy-footer-links">
              <a href="#services">Services</a>
              <a href="#results">Results</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
          <div className="foy-footer-copy">
            <span>© {new Date().getFullYear()} FOY Med Spa. All rights reserved.</span>
            <span>
              Demo built by{' '}
              <a href="https://caliberwebstudio.com" target="_blank" rel="noopener noreferrer">
                Caliber Web Studio
              </a>
            </span>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Bar */}
      <div className="foy-mobile-bar">
        <a href="tel:2487317414" className="foy-mobile-call">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12.3a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.59h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.48-1.48a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          Call (248) 731-7414
        </a>
        <a href="mailto:contactus@foreverfoy.com" className="foy-mobile-book">
          Book Appointment
        </a>
      </div>

      {/* Preview Banner */}
      <div className="foy-preview-banner">
        <span className="foy-preview-dot" />
        <span className="foy-preview-text">Demo preview for FOY Med Spa</span>
        <a href="https://caliberwebstudio.com" target="_blank" rel="noopener noreferrer" className="foy-preview-cta">
          Get This Site
        </a>
      </div>
    </div>
  )
}

/* ─── Data ─── */

const SERVICES = [
  {
    icon: '✦',
    name: 'Botox & Dysport',
    desc: 'Precision neurotoxin placement by our licensed medical team. Forehead lines, crow\'s feet, brow lift, jaw slimming, and hyperhidrosis. Natural results, never frozen.',
  },
  {
    icon: '◈',
    name: 'Dermal Fillers',
    desc: 'Volumize cheeks, define lips, smooth nasolabial folds, and contour your jawline. We use premium HA fillers with meticulous placement to enhance — never overdo.',
  },
  {
    icon: '⬡',
    name: 'Opus Plasma Resurfacing',
    desc: 'Fractional plasma technology that targets fine lines, acne scars, and uneven texture. Stimulates deep collagen remodeling with minimal downtime.',
  },
  {
    icon: '◎',
    name: 'Laser Hair Removal',
    desc: 'Soprano ICE — safe and effective on all skin types, including darker skin tones. Virtually painless with permanent hair reduction across all treatment areas.',
  },
  {
    icon: '◇',
    name: 'IV Vitamin Therapy',
    desc: 'Nearly 100% absorption of targeted nutrients delivered directly into your bloodstream. Drip options for energy, immunity, hydration, weight support, and glow.',
  },
  {
    icon: '○',
    name: 'Microneedling + PRP',
    desc: 'Micro-injuries that trigger your skin\'s own healing response. Add PRP (platelet-rich plasma) to amplify collagen production and speed recovery.',
  },
  {
    icon: '◉',
    name: 'Semaglutide Weight Loss',
    desc: 'FDA-cleared GLP-1 receptor agonist for sustainable, medically supervised weight management. Personalized dosing, ongoing monitoring, and lifestyle support.',
  },
  {
    icon: '⬢',
    name: 'Body Sculpting',
    desc: 'Non-invasive contouring that targets stubborn fat, improves circulation, and reduces inflammation. Progressive sessions for measurable, visible results.',
  },
  {
    icon: '◐',
    name: 'Custom Facials & Skin',
    desc: 'Every facial is designed for your skin — not a menu item. Our licensed aestheticians assess your barrier, tone, and concerns before selecting your treatment protocol.',
  },
  {
    icon: '◑',
    name: 'Body Waxing',
    desc: 'Professional waxing with premium products formulated for sensitive skin. Longer-lasting results than shaving, with each session improving over time.',
  },
]

const GALLERY = [
  {
    url: 'https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Professional facial treatment at FOY Med Spa Southfield',
    label: 'Custom Facial Treatment',
  },
  {
    url: 'https://images.pexels.com/photos/3997989/pexels-photo-3997989.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Botox and filler consultation at FOY Med Spa',
    label: 'Botox & Filler Results',
  },
  {
    url: 'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Luxury spa interior at FOY Med Spa Suite C2 Southfield',
    label: 'Suite C2, Southfield',
  },
  {
    url: 'https://images.pexels.com/photos/3985334/pexels-photo-3985334.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Skin care treatment results at FOY Med Spa',
    label: 'Skin Resurfacing',
  },
  {
    url: 'https://images.pexels.com/photos/3865557/pexels-photo-3865557.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'IV vitamin therapy drip at FOY Med Spa Southfield',
    label: 'IV Vitamin Therapy',
  },
  {
    url: 'https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Laser hair removal treatment at FOY Med Spa',
    label: 'Laser Hair Removal',
  },
]

const REVIEWS = [
  {
    name: 'Tamara W.',
    stars: 5,
    text: 'Dr. Harrison-Anderson actually sat with me for 20 minutes before we touched my face. She explained everything, told me what I didn\'t need, and only did what would actually help. That\'s rare.',
    service: 'Botox & Fillers',
  },
  {
    name: 'Keisha D.',
    stars: 5,
    text: 'I\'ve been to three other med spas in Southfield. FOY is the only one where I felt like a patient, not just a booking. The laser results on my skin have been incredible.',
    service: 'Laser Hair Removal',
  },
  {
    name: 'Monique B.',
    stars: 5,
    text: 'Starting semaglutide here was the best decision. The team checks in, adjusts the plan when needed, and genuinely cares about your progress. Down 28 lbs in 4 months.',
    service: 'Semaglutide Weight Loss',
  },
]

const CREDS = [
  'Board-Certified Medical Director (MD)',
  'Spravato REMS Certified Treatment Center',
  'Licensed Physician Assistants & RNs On Staff',
  'Soprano ICE Laser — Safe for All Skin Tones',
  'CareCredit & Cherry Financing Available',
  'Minority Woman-Owned Business',
]

const CONTACT_INFO = [
  { icon: '📞', label: 'Phone', val: '(248) 731-7414', href: 'tel:2487317414' },
  { icon: '✉', label: 'Email', val: 'contactus@foreverfoy.com', href: 'mailto:contactus@foreverfoy.com' },
  { icon: '📍', label: 'Address', val: '18161 W 13 Mile Rd, Suite C2, Southfield, MI 48076', href: null },
  { icon: '📸', label: 'Instagram', val: '@foy_detroit', href: 'https://instagram.com/foy_detroit' },
]

const HOURS = [
  { day: 'Tuesday – Saturday', hours: '9:00 AM – 4:00 PM' },
  { day: 'Sunday – Monday', hours: 'Closed' },
]

/* ─── CSS ─── */
const CSS = `
  .foy *, .foy *::before, .foy *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .foy {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    background: #0a0908;
    color: #f5f0eb;
    overflow-x: hidden;
    cursor: auto !important;
    min-height: 100vh;
  }
  .foy a, .foy button { cursor: pointer !important; }
  .foy img { display: block; max-width: 100%; }
  .foy p { color: #a89880; line-height: 1.8; font-size: 15px; margin-bottom: 16px; }
  .foy-con { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

  /* Announce bar */
  .foy-announce {
    background: #c9a97e;
    color: #0a0908;
    text-align: center;
    padding: 10px 20px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
  .foy-announce-link {
    color: #0a0908;
    font-weight: 800;
    text-decoration: underline;
    margin-left: 8px;
  }

  /* Nav */
  .foy-nav {
    background: rgba(10,9,8,0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(201,169,126,0.12);
    position: sticky;
    top: 0;
    z-index: 100;
    padding: 0 24px;
  }
  .foy-nav-in {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 72px;
  }
  .foy-logo-name {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 22px;
    font-weight: 600;
    color: #f5f0eb;
    letter-spacing: 0.02em;
    line-height: 1;
  }
  .foy-logo-tag {
    font-size: 10px;
    color: #6b5c4a;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-top: 3px;
  }
  .foy-nav-links {
    display: flex;
    gap: 32px;
    list-style: none;
  }
  .foy-nav-links a {
    color: #a89880;
    font-size: 13px;
    font-weight: 500;
    text-decoration: none;
    letter-spacing: 0.05em;
    transition: color 0.2s;
  }
  .foy-nav-links a:hover { color: #c9a97e; }
  .foy-nav-cta {
    background: #c9a97e;
    color: #0a0908;
    padding: 10px 22px;
    border-radius: 4px;
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    text-decoration: none;
    transition: background 0.2s;
  }
  .foy-nav-cta:hover { background: #b8925a; }

  /* Hero */
  .foy-hero {
    position: relative;
    height: 88vh;
    min-height: 580px;
    max-height: 860px;
    overflow: hidden;
    display: flex;
    align-items: center;
  }
  .foy-hero-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 20%;
  }
  .foy-hero-ov {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, rgba(10,9,8,0.95) 0%, rgba(10,9,8,0.75) 55%, rgba(10,9,8,0.3) 100%);
  }
  .foy-hero-con {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }
  .foy-hero-inner { max-width: 600px; }
  .foy-tag {
    display: inline-block;
    border: 1px solid rgba(201,169,126,0.5);
    color: #c9a97e;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 7px 16px;
    border-radius: 2px;
    margin-bottom: 22px;
  }
  .foy-hero-title {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(44px, 6vw, 76px);
    font-weight: 500;
    line-height: 1.06;
    letter-spacing: -0.01em;
    color: #f5f0eb;
    margin-bottom: 20px;
  }
  .foy-hero-title em {
    font-style: italic;
    color: #c9a97e;
  }
  .foy-hero-sub {
    font-size: 17px;
    color: rgba(245,240,235,0.72);
    max-width: 480px;
    margin-bottom: 36px;
    line-height: 1.7;
  }
  .foy-hero-btns { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 36px; }
  .foy-btn-p {
    background: #c9a97e;
    color: #0a0908;
    padding: 15px 32px;
    border-radius: 4px;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    text-decoration: none;
    transition: background 0.2s;
  }
  .foy-btn-p:hover { background: #b8925a; }
  .foy-btn-o {
    border: 1px solid rgba(245,240,235,0.35);
    color: rgba(245,240,235,0.85);
    padding: 14px 30px;
    border-radius: 4px;
    font-weight: 500;
    font-size: 14px;
    letter-spacing: 0.04em;
    text-decoration: none;
    transition: border-color 0.2s, color 0.2s;
  }
  .foy-btn-o:hover { border-color: #c9a97e; color: #c9a97e; }
  .foy-hero-trust { display: flex; gap: 24px; flex-wrap: wrap; }
  .foy-htrust {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: rgba(245,240,235,0.55);
    letter-spacing: 0.04em;
  }
  .foy-dot {
    width: 5px;
    height: 5px;
    background: #c9a97e;
    border-radius: 50%;
    flex-shrink: 0;
  }

  /* Stats bar */
  .foy-stats {
    background: #131210;
    border-top: 1px solid rgba(201,169,126,0.1);
    border-bottom: 1px solid rgba(201,169,126,0.1);
    padding: 32px 0;
  }
  .foy-stats-row {
    display: flex;
    justify-content: center;
    gap: 64px;
    flex-wrap: wrap;
  }
  .foy-stat { text-align: center; }
  .foy-stat-num {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 36px;
    font-weight: 600;
    color: #c9a97e;
    display: block;
    line-height: 1;
  }
  .foy-stat-lbl {
    font-size: 10px;
    color: #6b5c4a;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    margin-top: 6px;
  }

  /* Marquee */
  .foy-marquee {
    background: #1c1a16;
    border-top: 1px solid rgba(201,169,126,0.08);
    border-bottom: 1px solid rgba(201,169,126,0.08);
    padding: 13px 0;
    overflow: hidden;
    white-space: nowrap;
  }
  .foy-marquee-track {
    display: inline-flex;
    gap: 28px;
    animation: foyMarquee 28s linear infinite;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #6b5c4a;
    align-items: center;
  }
  .foy-mdot { color: #c9a97e; font-size: 7px; }
  @keyframes foyMarquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  /* Sections */
  .foy-sec { padding: 96px 0; }
  .foy-sec-alt { background: #0f0e0c; }
  .foy-sec-dark { background: #131210; }
  .foy-slbl {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #c9a97e;
    margin-bottom: 12px;
  }
  .foy-stitle {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(30px, 4vw, 46px);
    font-weight: 500;
    color: #f5f0eb;
    letter-spacing: -0.01em;
    margin-bottom: 14px;
    line-height: 1.1;
  }
  .foy-dvdr {
    width: 40px;
    height: 1px;
    background: #c9a97e;
    margin: 16px 0 20px;
  }
  .foy-ssub {
    font-size: 16px;
    color: #8c7b6a;
    max-width: 540px;
    line-height: 1.75;
  }
  .foy-shdr { margin-bottom: 52px; }

  /* Services grid */
  .foy-svc-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: rgba(201,169,126,0.08);
    border: 1px solid rgba(201,169,126,0.1);
    border-radius: 6px;
    overflow: hidden;
  }
  .foy-svc {
    background: #0f0e0c;
    padding: 32px;
    transition: background 0.2s;
  }
  .foy-svc:hover { background: #141210; }
  .foy-svc-icon {
    font-size: 18px;
    color: #c9a97e;
    margin-bottom: 14px;
    opacity: 0.7;
  }
  .foy-svc-name {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 19px;
    font-weight: 600;
    color: #f5f0eb;
    margin-bottom: 10px;
    line-height: 1.2;
  }
  .foy-svc-desc {
    font-size: 13px;
    color: #7a6a58;
    line-height: 1.7;
  }

  /* Gallery grid */
  .foy-gal-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
  .foy-gal-item {
    overflow: hidden;
    border-radius: 6px;
    background: #1c1a16;
    position: relative;
  }
  .foy-gal-item img {
    width: 100%;
    aspect-ratio: 4/3;
    object-fit: cover;
    transition: transform 0.4s cubic-bezier(0.4,0,0.2,1);
  }
  .foy-gal-item:hover img { transform: scale(1.04); }
  .foy-gal-label {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(0deg, rgba(10,9,8,0.85) 0%, transparent 100%);
    color: #c9a97e;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 20px 16px 14px;
  }

  /* About grid */
  .foy-about-grid {
    display: grid;
    grid-template-columns: 45% 55%;
    gap: 72px;
    align-items: start;
  }
  .foy-about-img-wrap {
    overflow: hidden;
    border-radius: 6px;
    background: #1c1a16;
    position: relative;
  }
  .foy-about-img {
    width: 100%;
    aspect-ratio: 3/4;
    object-fit: cover;
    object-position: top center;
  }
  .foy-about-badge {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(0deg, rgba(10,9,8,0.96) 0%, rgba(10,9,8,0.7) 60%, transparent 100%);
    padding: 40px 24px 24px;
  }
  .foy-badge-name {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 18px;
    font-weight: 600;
    color: #f5f0eb;
    margin-bottom: 4px;
  }
  .foy-badge-title {
    font-size: 11px;
    color: #c9a97e;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .foy-about-text { padding-top: 8px; }
  .foy-creds {
    margin-top: 32px;
    padding-top: 28px;
    border-top: 1px solid rgba(201,169,126,0.12);
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .foy-cred-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    font-size: 14px;
    color: #a89880;
  }
  .foy-cred-dot { color: #c9a97e; flex-shrink: 0; font-size: 9px; margin-top: 3px; }

  /* Reviews */
  .foy-rv-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  .foy-rv {
    background: #0f0e0c;
    border: 1px solid rgba(201,169,126,0.1);
    border-radius: 6px;
    padding: 32px;
  }
  .foy-rv-stars {
    color: #c9a97e;
    font-size: 14px;
    letter-spacing: 2px;
    margin-bottom: 16px;
  }
  .foy-rv-text {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 17px;
    font-style: italic;
    color: #d4c8bb;
    line-height: 1.7;
    margin-bottom: 18px;
  }
  .foy-rv-name {
    font-size: 13px;
    font-weight: 700;
    color: #c9a97e;
    margin-bottom: 4px;
  }
  .foy-rv-service {
    font-size: 11px;
    color: #6b5c4a;
    letter-spacing: 0.08em;
  }

  /* CTA band */
  .foy-cta-band {
    background: linear-gradient(135deg, #1c1a16 0%, #131210 100%);
    border-top: 1px solid rgba(201,169,126,0.15);
    border-bottom: 1px solid rgba(201,169,126,0.15);
    padding: 72px 0;
  }
  .foy-cta-in {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 48px;
    flex-wrap: wrap;
  }
  .foy-cta-title {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(26px, 3.5vw, 40px);
    font-weight: 500;
    color: #f5f0eb;
    letter-spacing: -0.01em;
    margin-bottom: 10px;
  }
  .foy-cta-sub {
    font-size: 15px;
    color: #8c7b6a;
    max-width: 460px;
    line-height: 1.7;
    margin: 0;
  }
  .foy-cta-btns { display: flex; gap: 14px; flex-shrink: 0; flex-wrap: wrap; }
  .foy-cta-btn {
    background: #c9a97e;
    color: #0a0908;
    padding: 15px 32px;
    border-radius: 4px;
    font-weight: 700;
    font-size: 15px;
    letter-spacing: 0.02em;
    text-decoration: none;
    transition: background 0.2s;
    white-space: nowrap;
  }
  .foy-cta-btn:hover { background: #b8925a; }
  .foy-cta-btn-o {
    border: 1px solid rgba(201,169,126,0.4);
    color: #c9a97e;
    padding: 14px 30px;
    border-radius: 4px;
    font-weight: 500;
    font-size: 15px;
    text-decoration: none;
    transition: border-color 0.2s;
    white-space: nowrap;
  }
  .foy-cta-btn-o:hover { border-color: #c9a97e; }

  /* Contact */
  .foy-ct-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
  .foy-ct-block {
    background: #131210;
    border: 1px solid rgba(201,169,126,0.1);
    border-radius: 6px;
    padding: 40px;
  }
  .foy-ct-block h3 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 22px;
    font-weight: 600;
    color: #f5f0eb;
    margin-bottom: 28px;
  }
  .foy-ci { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 22px; }
  .foy-ci-icon {
    width: 38px;
    height: 38px;
    background: rgba(201,169,126,0.08);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    flex-shrink: 0;
  }
  .foy-ci-label {
    font-size: 10px;
    color: #6b5c4a;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    margin-bottom: 3px;
  }
  .foy-ci-val { font-size: 14px; color: #d4c8bb; font-weight: 500; }
  .foy-ci-link { color: #c9a97e; text-decoration: none; }
  .foy-ci-link:hover { text-decoration: underline; }
  .foy-hr-row {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid rgba(201,169,126,0.07);
    font-size: 14px;
  }
  .foy-hr-day { color: #8c7b6a; }
  .foy-hr-time { color: #d4c8bb; font-weight: 500; }
  .foy-hr-note {
    margin-top: 20px;
    font-size: 12px;
    color: #6b5c4a;
    letter-spacing: 0.04em;
  }

  /* Footer */
  .foy-footer {
    background: #0a0908;
    border-top: 1px solid rgba(201,169,126,0.08);
    padding: 44px 0 28px;
  }
  .foy-footer-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 32px;
    flex-wrap: wrap;
    margin-bottom: 32px;
    padding-bottom: 28px;
    border-bottom: 1px solid rgba(201,169,126,0.07);
  }
  .foy-footer-biz {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 20px;
    font-weight: 600;
    color: #f5f0eb;
    margin-bottom: 5px;
  }
  .foy-footer-city { font-size: 12px; color: #6b5c4a; }
  .foy-footer-links { display: flex; gap: 24px; flex-wrap: wrap; align-items: center; }
  .foy-footer-links a { color: #6b5c4a; font-size: 13px; text-decoration: none; transition: color 0.2s; }
  .foy-footer-links a:hover { color: #c9a97e; }
  .foy-footer-copy {
    font-size: 12px;
    color: #4a3d30;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;
  }
  .foy-footer-copy a { color: #c9a97e; text-decoration: none; }

  /* Mobile sticky bar */
  .foy-mobile-bar {
    display: none;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 200;
    background: #131210;
    border-top: 1px solid rgba(201,169,126,0.2);
    gap: 1px;
  }
  .foy-mobile-call, .foy-mobile-book {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 16px 12px;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-decoration: none;
    transition: background 0.2s;
  }
  .foy-mobile-call {
    background: #1c1a16;
    color: #f5f0eb;
  }
  .foy-mobile-call:hover { background: #242018; }
  .foy-mobile-book {
    background: #c9a97e;
    color: #0a0908;
  }
  .foy-mobile-book:hover { background: #b8925a; }

  /* Preview banner */
  .foy-preview-banner {
    position: fixed;
    bottom: 70px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(10,9,8,0.96);
    border: 1px solid rgba(201,169,126,0.25);
    border-radius: 40px;
    padding: 10px 22px;
    display: flex;
    align-items: center;
    gap: 12px;
    z-index: 9999;
    backdrop-filter: blur(12px);
    white-space: nowrap;
  }
  .foy-preview-dot {
    width: 7px;
    height: 7px;
    background: #c9a97e;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .foy-preview-text { font-size: 12px; color: #a89880; font-weight: 500; }
  .foy-preview-cta {
    background: #c9a97e;
    color: #0a0908;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 800;
    text-decoration: none;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .foy-svc-grid { grid-template-columns: repeat(2, 1fr); }
    .foy-about-grid { grid-template-columns: 1fr; gap: 40px; }
    .foy-about-img { aspect-ratio: 16/9; }
  }
  @media (max-width: 768px) {
    .foy-nav-links { display: none; }
    .foy-sec { padding: 64px 0; }
    .foy-svc-grid { grid-template-columns: 1fr; }
    .foy-gal-grid { grid-template-columns: repeat(2, 1fr); }
    .foy-rv-grid { grid-template-columns: 1fr; }
    .foy-ct-grid { grid-template-columns: 1fr; }
    .foy-cta-in { flex-direction: column; }
    .foy-stats-row { gap: 32px; }
    .foy-footer-row { flex-direction: column; }
    .foy-preview-banner { bottom: 80px; }
  }
  @media (min-width: 769px) {
    .foy-mobile-bar { display: none !important; }
  }
  @media (max-width: 768px) {
    .foy-mobile-bar { display: flex; }
    body { padding-bottom: 60px; }
  }
`
