# Faith Medical Spa — Full Site Audit
**Target:** https://www.faithmedicalspa.com
**Location:** Livonia, MI 48154
**Audit Date:** 2026-04-20
**Auditor:** Caliber Web Studio

---

## 1. TECH STACK & THEME FINGERPRINT

| Signal | Value |
|---|---|
| Platform | WordPress |
| Theme | `faithmedicalob041` (custom Proweaver build) — path: `/wp-content/themes/faithmedicalob041/` |
| Theme version | Not publicly versioned — proprietary Proweaver template |
| Page builder | None (custom PHP/HTML — no Elementor, Divi, or WPBakery) |
| Slider library | **Master Slider** — confirmed on service pages; images in `/wp-content/themes/faithmedicalob041/images/slider/`; uses `blank.gif` lazy-load pattern (jQuery-dependent, legacy) |
| SEO plugin | Yoast SEO (confirmed via sitemap XML header) |
| Analytics | **None detected** — no GA4, Universal Analytics, Facebook Pixel, or any tracking script |
| Schema markup | **None** — zero JSON-LD blocks found on any page |
| SSL | HTTPS active — no issue here |
| Designed by | Proweaver, Inc. (Scottsdale, AZ / offshore operations) — credited in footer |

### Visitor Counter
A "visitor counter placeholder" element is present in the footer — a third-party hit counter widget. This is a standard Proweaver template artifact. In 2026, a live visitor counter reads as amateur-hour and dates the site to circa 2010 web design conventions.

---

## 2. PAGE-BY-PAGE FINDINGS

### Homepage `/`
- **Title:** `Welcome to Faith Medical Spa & Weight loss`
  - "Welcome to" wastes keyword real estate
  - "loss" is lowercase (inconsistent capitalization)
  - No city or state anywhere in title
- **H1:** Identical to title tag — doubles the weakness
- **Meta description:** **MISSING**
- **Hero:** Static image with slider pattern — 2017–2019 jQuery slider aesthetic (blank.gif lazy-load, Master Slider library)

### About `/weight-loss-and-medical-spa-about-us`
- **Title:** `About Us | Weight Loss & Medical Spa in Livonia, Michigan`
- **H1:** "About Us" — generic, not keyword-targeted
- **Meta description:** **MISSING**
- Only one provider (Dr. Laith Jacob) named; no real headshot — stock "medical workers talking" image used

### Services `/weight-loss-and-medical-spa-services`
- **Meta description:** **MISSING**
- Lists 10 services but no individual meta per service on this page
- No pricing on any service

### Individual Service Pages
All follow pattern `/weight-loss-and-medical-spa-services/[service]` — URL slugs are 45+ chars, keyword-diluted, redundant.

| Page | Title | Meta Desc | H1 | Notable |
|---|---|---|---|---|
| Botox | `Botox \| Weight Loss & Medical Spa in Livonia, Michigan` | **MISSING** | "Botox" | No pricing |
| Fillers | `Fillers \| Weight Loss & Medical Spa in Livonia, Michigan` | **MISSING** | "Fillers" | No pricing |
| Body Contouring | `Body Contouring & Skin Tightening \| Weight Loss & Medical Spa in Livonia, Michigan` | **MISSING** | "Body Contouring & Skin Tightening" | Slider images lack alt text |
| Face/Neck Rejuv. | Not extracted | **MISSING** | "Face and Neck Rejuvenation" | blank.gif placeholders, zero alt text |
| Skin Rejuvenation | Not extracted | **MISSING** | "Skin Rejuvenation" | blank.gif placeholders, zero alt text |
| VASCULAZ | Not extracted | **MISSING** | "VASCULAZ" | Gallery images: no alt text |

### Contact `/weight-loss-and-medical-spa-contact-us`
- **Meta description:** **MISSING**
- **No contact form** — only a phone number and address
- **No Google Maps embed**
- **No business hours listed**
- Email displayed: `faithurgentcare@gmail.com` — Gmail address in production, not a custom domain email

### Our Experts `/weight-loss-and-medical-spa-our-experts`
- Title: `Our Experts | Weight Loss & Medical Spa in Livonia, Michigan`
- Only Dr. Laith Jacob listed
- No real headshot — stock "medical workers talking" photo
- No credentials detail, no bio beyond one sentence

### Insurance Page `/weight-loss-and-medical-spa-insurance-accepted`
- States "We accept a variety of insurance plans"
- **Lists zero specific insurance carriers** — completely useless as a conversion or SEO asset

### Blog / Posts
- Post sitemap exists but is **empty** — zero published posts

### Sitemap
- Valid XML at `/sitemap.xml` → splits into `/page-sitemap.xml` (21 pages) and `/post-sitemap.xml` (empty)

### robots.txt
- **CRITICAL: blocks `/wp-content/uploads/`** — this prevents Google from indexing any uploaded photos. Devastating for a visually-driven med spa business.

---

## 3. IMAGE AUDIT

| Source | Alt Text | Assessment |
|---|---|---|
| `/wp-content/themes/faithmedicalob041/images/main-logo.png` | "Faith Medical Spa & Weight loss" | Theme asset — acceptable but inconsistent casing |
| `/wp-content/themes/faithmedicalob041/images/footer-logo.png` | "Faith Medical Spa & Weight loss" | Same |
| `/wp-content/uploads/2024/05/21716111238Uitm65a.jpg` | "woman smiling during treatment" | **Stock** — Proweaver library (numeric hash filename pattern) |
| `/wp-content/uploads/2024/05/2172631511U1s764a.jpg` | "medical workers talking" | **Stock** — used as Dr. Jacob's headshot |
| `/wp-content/uploads/2024/05/2340611725U4638m2.jpg` | "medical worker taking a call in the office" | **Stock** — Proweaver image library |
| `/wp-content/uploads/2024/05/2292623258U2t6475.jpg` | **"woman's body before and after wight loss"** | **Stock** + **TYPO**: "wight" not "weight" |
| `/wp-content/themes/faithmedicalob041/images/thumbnails/Picture1.png` | "woman smiling" | **Stock** — generic placeholder |
| `/wp-content/themes/faithmedicalob041/images/slider/nh-banner.jpg` | "woman getting a facial treatment" | **Stock** — slider background |
| Multiple service page slider/gallery images | **NO ALT TEXT** (blank.gif) | Body contouring, face/neck, skin rejuv, VASCULAZ pages confirmed |
| 6× social icons (fb.png, instagram.png, twitter.png, linkedin.png, pinterest.png, google-icon.png) | **NO ALT TEXT** | Every page, every footer render |

**Verdict:** Zero evidence of real clinic photography. All upload filenames follow Proweaver's numeric-hash naming convention indicating template library images. No real before/after photos, no actual treatment room shots, no genuine staff photos.

**Notable error:** Alt text `"woman's body before and after wight loss"` — misspelling of "weight" crawls into Google's image index with incorrect keyword data.

---

## 4. SEO ANALYSIS

### Meta / Title Issues
- Meta descriptions missing on **every single page** (at minimum 21 pages)
- Homepage title: "Welcome to…" pattern — zero keyword value in first 10 characters
- No city/state in homepage title tag
- H1 = Title on homepage — double penalty, no differentiation

### Schema Markup
- **Zero JSON-LD anywhere** — no LocalBusiness, no Service, no FAQ, no BreadcrumbList, no MedicalBusiness schema
- Invisible to Google's rich results (star ratings, knowledge panel, service features)

### Technical SEO
- `robots.txt` blocks `/wp-content/uploads/` — Google cannot index any uploaded images
- No canonical tags confirmed — duplicate content risk across service parent/child pages
- URL slugs: `/weight-loss-and-medical-spa-services/weight-loss` — 45 chars, redundant keywords
- Post sitemap empty — wastes a sitemap entry, signals zero content strategy
- Yoast SEO is installed but completely misconfigured — meta descriptions missing site-wide despite Yoast's ability to enforce them

### Image SEO
- Multiple blank/empty alt attributes on service pages
- robots.txt blocks image directory from Google crawl
- Generic stock alt text gives Google no local signals ("woman smiling during treatment" vs. "Morpheus8 skin tightening treatment at Faith Medical Spa Livonia MI")

### Analytics Gap
- **No tracking whatsoever** — no GA4, no Facebook Pixel, no heat mapping
- The business is completely blind: no traffic data, no conversion data, no keyword rankings

---

## 5. PAGE SPEED & CORE WEB VITALS (Estimated)

Actual Lighthouse scores were not run, but based on confirmed page source signals:

| Factor | Issue |
|---|---|
| **Master Slider (jQuery)** | Render-blocking JavaScript — adds 200–600ms to LCP |
| **blank.gif lazy loading** | Old JS-based lazy load instead of native `loading="lazy"` — blocks above-fold render |
| **No image optimization** | Proweaver uploads are unoptimized JPEGs — no WebP, no srcset, no next-gen formats |
| **No CDN signals** | No Cloudflare, no Fastly, no Vercel Edge Network detected |
| **WordPress without caching** | No WP Rocket, W3 Total Cache, or server-level caching detected |
| **LinkedIn/Pinterest/Twitter** | Dead social links load icons and scripts for platforms the business doesn't actively use |

Estimated LCP: **>4s on mobile** (poor). Estimated CLS: unknown but slider re-renders are a common CLS source.

---

## 6. MOBILE ISSUES

- No sticky click-to-call button confirmed
- No mobile bottom bar (call + directions)
- Slider/carousel pattern is known to cause layout shift on mobile (CLS liability)
- Contact page has no tap-to-call link prominently placed
- Gmail address requires user to leave their phone's browser to open a Gmail compose — friction

---

## 7. CONTENT GAPS

| Missing Feature | Business Impact |
|---|---|
| **Before/After gallery** | #1 highest-converting content for med spa decisions — completely absent |
| **Online booking** | Patients book after hours; every "call us" CTA loses conversions |
| **Blog / educational content** | Zero organic search traffic for informational queries |
| **Pricing information** | Transparency builds trust; hidden pricing drives bounce |
| **CareCredit / financing page** | Accepted but never advertised — massive missed conversion lever |
| **Real staff photos + detailed bios** | Trust signal for medical aesthetics — stock photos undermine credibility |
| **FAQ landing page** | High-value SEO asset — FAQ content is buried in service pages |
| **Google Maps embed on contact page** | Basic local business requirement — absent |
| **Business hours on contact page** | Not listed anywhere on the contact page |
| **Location/service area pages** | No "Botox in Plymouth MI" type local SEO pages |
| **Testimonials/reviews section** | Reviews exist only on sister site (faithinternalmedicine.com), not surfaced on med spa site |

---

## 8. GOOGLE BUSINESS PROFILE (GBP)

- **Facebook listing:** "Not yet rated (1 Review)" — essentially invisible
- **WellnessLiving listing:** "Unverified Business — This listing hasn't been claimed yet." The business hasn't claimed its own free directory listing.
- **Testimonials on sister site (faithinternalmedicine.com):** 6 reviews, all dated January 3, 2024 — same date. Suggests manually-seeded reviews, not organic accumulation.
- **CareCredit directory:** Listed as accepting CareCredit — but not disclosed on website
- **RealSelf / Healthgrades / Zocdoc:** No profiles found
- **Online booking:** "Online booking not available yet" on WellnessLiving
- **Instagram (@faithmedicalspa):** Profile exists; content/engagement data not accessible

---

## 9. VENDOR RISK

The site is built by **Proweaver, Inc.**

| Risk Factor | Detail |
|---|---|
| BBB Rating | **D+** — 18 filed complaints |
| Complaint types | Billing disputes, charges exceeding agreed amounts, sites removed over payment issues |
| Client dependency | 100% locked in — no drag-and-drop editor, all changes require Proweaver ticket |
| Theme | Proprietary — no WordPress update path, no security patches outside Proweaver |
| US support | Offshore operations — support quality and response time issues documented in reviews |

Dr. Jacob's business continuity depends on maintaining a relationship with a vendor rated D+ by the BBB.

---

## 10. DOMAIN INFO

| Field | Value |
|---|---|
| Registered | May 21, 2024 |
| Age | ~23 months |
| Domain authority | Low (young domain, no link building detected) |
| Email | `faithurgentcare@gmail.com` (Gmail — not domain email) |

The domain either expires May 2026 or was recently renewed. A Gmail contact address on a medical business website signals zero professional web infrastructure.
