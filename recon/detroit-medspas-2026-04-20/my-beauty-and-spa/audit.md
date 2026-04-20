# My Beauty and Spa — Full Site Audit
**Date:** 2026-04-20  
**Audited by:** Caliber Web Studio  
**Target:** https://www.mybeautyandspa.com  
**Location:** 3283 Rochester Rd, Troy, MI 48083  
**Platform:** Squarespace 7.1 (Site ID: `67feb9ff911a15736c6af1d7`)

---

## CRITICAL ISSUES (Deal-Breakers)

### 1. Triplicated Tagline — Keyword Stuffing
The phrase **"Premier Medspa in Troy, MI 48083"** appears **three times consecutively** on the homepage — a Squarespace block duplication artifact from a global section rendered across multiple template zones:

```html
Premier Medspa in Troy, MI 48083 – Premier Medspa in Troy, MI 48083 - Premier Medspa in Troy, MI 48083
```

Google may flag this as keyword stuffing. It looks broken to every visitor who scrolls the page.

---

### 2. Live Squarespace Placeholder Social Links
The template social media defaults were **never removed**. Both the placeholder and real links coexist on every page:

```
http://facebook.com/squarespace        ← LIVE Squarespace placeholder — never deleted
http://instagram.com/squarespace       ← LIVE Squarespace placeholder — never deleted
https://facebook.com/mybeautyandspa    ← real link (also present)
https://www.instagram.com/my_beauty_and_spa?igsh=ZnQwbGZ2MTRyNW0x  ← real link (also present)
```

Visitors clicking the wrong social icon land on Squarespace's corporate Facebook/Instagram pages — not the business. This has been live since launch.

---

### 3. Five "Coming Soon" Pages Indexed by Google
Five service pages are live in the navigation and sitemap but serve empty placeholder content:

| Page | Title Tag | Content |
|------|-----------|---------|
| `/laser` | "Med Spa in Troy, MI, 48083 \| Laser Near Me" | "Coming Soon" |
| `/sublime` | "Med Spa in Troy, MI, 48083 \| Sublime Near Me" | "Coming Soon" |
| `/sublative` | "Med Spa in Troy, MI, 48083 \| Sublative Near Me" | "Coming Soon" |
| `/hair-reduction` | "Med Spa in Troy, MI, 48083 \| Hair Reduction Near Me" | "Coming Soon" |
| `/mesotherapy` | "Med Spa in Troy, MI, 48083 \| Mesotherapy Near Me" | "Coming Soon" |

Google is crawling and indexing all five as thin-content pages. The `/cherry` page (Cherry financing) is also "Coming Soon" while being linked in the nav as a payment option — advertising financing that isn't set up destroys trust.

---

### 4. Stock Photos — Confirmed Mismatched Imagery

**Blonde woman in florist shop** — reused across **every single service page** (11+ pages):
```
https://images.squarespace-cdn.com/content/v1/67feb9ff911a15736c6af1d7/4548a9fb-4b7b-4af9-b32f-5884457f8deb/close-up-smiling-blonde-young-woman-florist-shop.jpg
```
The filename itself — `close-up-smiling-blonde-young-woman-florist-shop.jpg` — reveals this was pulled from a florist/lifestyle stock library. Not a medspa patient. Not relevant. No alt text on any of the 11 pages.

**Bearded man — Freepik free stock:**
```
portrait-concentrated-young-bearded-man.jpg
```
Exact match: Freepik free photo `#8074591`. A generic bearded man in a non-medical context. Appears on the homepage. Zero relevance to medspa services.

**Strategic gap:** The business states it specializes in **Asian skin types** — the only medspa in Michigan with this specialty. Neither of these stock photos shows Asian clientele, any person of color, or a medspa setting of any kind.

---

### 5. Before/After GIF — Unoptimized, Low Quality
```
https://images.squarespace-cdn.com/content/v1/67feb9ff911a15736c6af1d7/Assets+(1).gif
```
- Format: Animated GIF (not WebP, not MP4, not AVIF)
- GIFs have no compression optimization — typical file sizes 2–15MB
- No alt text
- Hurts Core Web Vitals (LCP, CLS)
- No structured before/after gallery — just one GIF on the homepage

---

## SEO ISSUES

### Title Tags — Internal Squarespace ID Leaking
Every page has `— MY BEAUTY AND SPA LLC - 1512` appended to the title. The `- 1512` suffix is a Squarespace internal site version/template identifier leaking into public-facing title tags. Examples:

```
"About My Beauty and Spa | Medspa in Troy, MI, 48083 — MY BEAUTY AND SPA LLC - 1512"
"Medspa Services in Troy, MI, 48083 | Botox, Filler, Microneedling — MY BEAUTY AND SPA LLC - 1512"
"Med Spa in Troy, MI, 48083 | Laser Near Me — MY BEAUTY AND SPA LLC - 1512"
"Best Medspa in Troy, MI, 48083 — MY BEAUTY AND SPA LLC - 1512"
```

Unprofessional appearance in search results. Wastes character space with noise.

### Zero Meta Descriptions — Site-Wide
Not a single page has a meta description. Google writes its own descriptions, almost always poorly. Every competitor has custom meta descriptions.

### No Open Graph Tags — Anywhere
No `og:title`, `og:description`, `og:image`, or `og:url` on any page. Every social media share renders as a bare URL — no image, no description, no preview card.

### No JSON-LD Schema — Anywhere
Zero structured data across the entire site:
- No `LocalBusiness` schema
- No `Service` schema
- No `FAQPage` schema (despite FAQ sections on every service page)
- No `MedicalBusiness` schema

Every top competitor has LocalBusiness schema. My Beauty and Spa is invisible to rich results.

### Duplicate Homepage URLs — Active Cannibalization
Both `/` and `/home` exist and return content. The sitemap lists `/home`. These two URLs compete against each other for the same rankings. No canonical tag declared.

### Double H1 Tags on About Page
The about page has two H1s: `"MEET THE TEAM"` and `"Premier Medspa in Troy, MI 48083"`. Violates on-page SEO best practices.

### No Blog, No Content Marketing
Zero blog. No `/blog` path, no content pages, no informational articles. Competitors MUSE and Revitalize both have active blogs with posts as recent as April 2026, pulling organic traffic from informational searches ("how does botox work," "IPL for asian skin," "what is RF microneedling").

### Sitemap Declares `changefreq: daily` for All Pages
Squarespace default — inaccurate for static pages and could mislead crawlers.

---

## TEMPLATE / PLATFORM TELLS

**Platform:** Squarespace 7.1 (confirmed, not disguised)

Evidence:
| Tell | Detail |
|------|--------|
| All images | Served from `images.squarespace-cdn.com` with site ID `67feb9ff911a15736c6af1d7` |
| Title tag suffix | `— MY BEAUTY AND SPA LLC - 1512` — internal Squarespace identifier |
| Robots.txt | Verbatim Squarespace default — blocks ClaudeBot, GPTBot, Amazonbot |
| Privacy policy | Squarespace boilerplate template with `DATE` field blank (never filled in) |
| Admin paths | `/config`, `/account`, `/search` in robots.txt — Squarespace-specific |
| Booking | External redirect to Moxie (`app.joinmoxie.com/booking/my-beauty-spa`) — Squarespace has no native medspa booking |

**Privacy policy has an unfilled template placeholder (live on the public site):**
```
"Our Privacy Policy was last updated on DATE."
```

---

## PAGES AUDIT

| URL | Status | Issue |
|-----|--------|-------|
| `/` | Live | Triplicated tagline, stock photos, no schema |
| `/home` | Live | **Duplicate of homepage** — SEO cannibalization |
| `/about-us` | Live | Sparse content, double H1, no meta |
| `/our-services` | Live | Grid with no descriptions on items |
| `/contact` | Live | **No contact form, no map embed** — just text |
| `/book-now` | Live | External redirect to Moxie |
| `/ipl-treatment` | Live | Content present |
| `/neurotoxins` | Live | Content present |
| `/fillers` | Live | Content present |
| `/rf-microneedling` | Live | Content present |
| `/microneedling-with-prp` | Live | Content present |
| `/chemical-peels` | Live | Content present |
| `/facials` | Live | Content present |
| `/laser` | **Coming Soon** | Indexed thin page |
| `/sublime` | **Coming Soon** | Indexed thin page |
| `/sublative` | **Coming Soon** | Indexed thin page |
| `/hair-reduction` | **Coming Soon** | Indexed thin page |
| `/mesotherapy` | **Coming Soon** | Indexed thin page |
| `/cherry` | **Coming Soon** | Financing advertised in nav, not set up |
| `/privacy-policy` | Live | Unfilled `DATE` placeholder |
| `/gallery` | **404** | No gallery page exists |
| `/blog` | **404** | No blog exists |

---

## MOBILE / PERFORMANCE

- No mobile sticky bar (click-to-call / directions) detected
- GIF on homepage is a Core Web Vitals hit
- No next-gen image formats (WebP, AVIF) — all served as JPEG/PNG/GIF via Squarespace CDN
- No lazy loading optimization (Squarespace handles some by default, but poorly)
- No `priority` hints on hero images
- Squarespace is notoriously slow — typical Lighthouse performance scores 40–65 on mobile

---

## OPERATIONAL / TRUST ISSUES

| Issue | Detail |
|-------|--------|
| Gmail contact email | `mybeautyspatroy@gmail.com` — unprofessional for a medical business |
| Two phone numbers | (586) 648-0818 (Med Spa) and (248)-801-2370 (Lash/PMU) — no explanation for first-time visitors |
| "Lily Bloom Beauty" booking | Separate Square Appointments at `square.site/book/LF47D53HV69DF/my-beauty-spa-troy-mi` under different business name, different hours, different services — NAP inconsistency affecting local SEO |
| Closed Mon & Sun | Tue–Fri 10AM–8PM, Sat 9AM–5PM — no weekend evenings |
| No contact form | Contact page is text-only — no form submission |
| No Google Maps embed | No embedded map on contact page |

---

## CULTURAL / REPRESENTATION GAP — MOST STRATEGIC FLAW

This is the site's biggest missed opportunity. The business is promoted as "Michigan's only medspa specializing in Asian skin." Troy, MI has one of the highest concentrations of Asian American residents in Michigan. Yet:

- **Hero image:** Blonde white woman from a florist stock photo
- **Supporting image:** Generic bearded white man (Freepik free stock)
- **No Asian clientele** visible anywhere on the site
- **No mention of Asian skin specialization** in any title tag, H1, meta description, or heading
- **No Mandarin/Cantonese content** (nor any multilingual support)
- **No educational content** about Fitzpatrick III-V skin tone considerations for IPL, laser, or other treatments
- **No testimonials** from Asian clients
- **Before/after gallery** is a single unoptimized GIF — no demographic diversity shown

This unique differentiator is generating **zero SEO value** and **zero visual trust signal** for the exact clientele the business is best positioned to serve.
