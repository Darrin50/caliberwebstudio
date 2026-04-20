# Bella Rosa Med Spa — Site Audit
**Target:** bellarosamedspa.com  
**Location:** 33200 W 14 Mile Rd, West Bloomfield MI 48322  
**Phone:** (248) 977-7791  
**Audit Date:** 2026-04-20  

---

## Platform & Template

**CMS:** WordPress  
**Built by:** MPH Marketing Solutions (mphmarketingsolutions.com) — generalist Metro Detroit agency, founded 2015. Not a med spa specialist.  
**Site age:** Launched approximately mid-2023 (earliest upload: `2023/08/BellaRosa-Logo.png`)  
**SEO plugin:** Rank Math (sitemap generated and last updated Feb 29, 2024 — abandoned for 2+ years)  

**Template tells:**
- Footer logo linked to MPH Marketing — built as an agency credit drop-in
- Repeated H2 widget "Bloomfield Med Spa" appears verbatim on every service page — a keyword-stuffing widget, not real content
- `/contact/` and `/contact-2/` both live — duplicate contact pages with different form fields (evidence of uncleaned template)
- `/skin-care-specialist/` page contains a Syracuse, NY phone number (315) 422-8331 alongside the real (248) number — copy-pasted from another client's build
- Blog at `/blog-post-title/` contains the WordPress theme's setup instructions verbatim as body text — publicly indexed on Google

---

## The About Page — Critical Failure

`/about/` renders with:
> **H2: "I'm Mark – Author, Speaker, Coach & Life Strategist"**

Full body copy is about a motivational speaker named Mark who founded a company called "Keynote," including the Steve Jobs quote:
> *"The ones who are crazy enough to think they can change the world, are the ones that do."*

This is 100% WordPress theme demo content that was never replaced. Any prospective patient visiting `/about/` encounters a page about a fictional life coach.

---

## Image Audit — Zero Real Patient Photos

Every before/after image on the site is manufacturer-supplied promotional material. Not one image shows an actual Bella Rosa patient.

| Filename | Source |
|---|---|
| `marketing_materials_BA-ElitePlus-D-McDaniel-HairRem-Pre-Post3Tx-01.jpg` | Cynosure/Elite iQ vendor marketing kit |
| `Elite-Before-and-After-Image-.jpg` | Elite iQ vendor asset |
| `Elite-Before-After-Photo_WIFH1-.jpg` | Elite iQ vendor asset (product code in filename) |
| `Copy-of-Copy-of-PicoSure-B_A-Tattoo-7B.jpeg` | PicoSure vendor asset — renamed twice manually |
| `Copy-of-PicoSure-B_A-Tattoo-1D.jpeg` | PicoSure vendor asset |
| `Copy-of-Copy-of-PicoSure-B_A-Tattoo-9.jpeg` | PicoSure vendor asset |
| `SCULPSURE.jpg` | BTL/SculpSure generic product image |
| `Potenza-BA-031-1-1-300x169.jpg` | Cartessa/Potenza vendor before/after |
| `PicoSure_RSaluja_Post1Tx_1_Focus-300x169.jpg` | PicoSure clinical trial image (Saluja = known study author) |
| `PicoSure_RWeiss_Post4Tx_1_Focus-300x169.jpg` | PicoSure clinical trial image |
| `IMG_0392-scaled.jpg` | Used as footer CTA background on every service page — raw iPhone filename, no alt text |

**Alt text across site:** Universally absent or broken.
- `IMG_0392` — alt text is the raw filename
- Media page (8 images) — every image uses alt text: `"Image description"` (literal placeholder, never filled in)
- Vendor before/after images — alt text is the messy renamed filename verbatim

---

## SEO Audit

### Page Titles
No page title contains "West Bloomfield" or "MI." Pattern: `[Service] | Bella Rosa Med Spa`

| Page | Title |
|---|---|
| Homepage | "Bella Rosa Med Spa In Bloomfield Michigan" (Google-indexed — drops "West," drops "MI") |
| Hair Removal | "Hair Removal \| Bella Rosa Med Spa" |
| Tattoo Removal | "Tattoo Removal \| Bella Rosa Med Spa" |
| Non-Invasive Fat Reduction | "Non-Invasive Fat Reduction \| Bella Rosa Med Spa" |
| Skin Spot Treatment | "Skin Spot Treatment \| Bella Rosa Med Spa" |
| Vaginal Rejuvenation | "Vaginal Rejuvenation \| Bella Rosa Med Spa" |
| About | "About \| Bella Rosa Med Spa" |
| Media | "Media \| Bella Rosa Med Spa" |

### Meta Descriptions
**Zero meta descriptions on any page.** Google is generating snippets from random body copy.

### H1 Tags
- Homepage: "Age Beautifully And Confidently" — no keywords, no location
- Hair Removal: "Hair Removal With The Elite IQ Laser" — device brand name, not a searched keyword
- Vaginal Rejuvenation: "FEMTOUCH™ Vaginal Rejuvenation" — trademark symbol in H1
- About: "About" — single word

### Schema Markup
**None.** No `LocalBusiness`, no `MedicalBusiness`, no `FAQPage`, no `Service` schema anywhere on the site.

### Technical SEO
- **Sitemap:** Exists at `/sitemap_index.xml` — post sitemap last modified May 9, 2023; page sitemap last modified Feb 29, 2024. Both abandoned 2+ years.
- **Robots.txt:** Bare minimum (`Disallow:` only) — no sitemap declaration
- **Canonical tags:** None detected
- **Open Graph tags:** None detected — social shares produce blank link previews
- **Cookie consent:** None — GDPR/CCPA compliance absent on a healthcare site

### Local Keyword Presence
- "West Bloomfield MI" appears in **zero** title tags or meta descriptions
- City-specific landing pages: none
- Service area copy: none
- "West Bloomfield" does not appear in body copy on any service page

---

## Missing Pages

| Missing Page | Why It Matters |
|---|---|
| Real before/after gallery | Primary conversion driver for aesthetic services |
| Dedicated treatment landing pages (keyword-optimized) | Competitors rank because they have these |
| Online booking (Acuity / Jane / Vagaro) | "Schedule" nav link goes to a contact form |
| About/Team page with actual staff bios + credentials | Zero staff names or credentials found on any page |
| Financing page (CareCredit / Cherry) | VIO leads with 0% APR — Bella Rosa has nothing |
| Privacy Policy / HIPAA Notice | Legal exposure for a medical practice |
| FAQ page | Competitors use these for long-tail keyword capture |
| Service area pages | No geo-targeting for Birmingham, Bloomfield Hills, Farmington |
| Real blog (any content) | Placeholder post from 2023 is the only entry |

---

## Mobile & Performance

**No next/image optimization** — WordPress serves raw uploads from `/wp-content/uploads/`. `IMG_0392-scaled.jpg` is WordPress's auto-scale (source was >2560px wide) served everywhere as a full-bleed background.

**Page builder overhead:** MPH Marketing's WordPress stack typically scores 40-65 on Google PageSpeed Mobile — well below the 90 threshold Google uses for ranking preference.

**Lazy loading:** Not confirmed — visual page builders frequently override WordPress native lazy loading.

**Third-party scripts:** Google reCAPTCHA on contact form. MPH Marketing logo loaded as an external image on every service page.

---

## Content Quality

**Homepage claim:** "Age Beautifully And Confidently" — H1, zero geo or keyword value.

**"State of the Art" positioning vs. reality:**  
Every service page body copy uses phrases like "state-of-the-art," "experienced professionals," and "personalized care" — identical language to hundreds of other med spas using the same vendor marketing copy. No actual differentiator is named or proven.

**Personaliation to West Bloomfield:** None. No reference to the local community, surrounding cities, or years serving the market.

**Contact page:** No physical address displayed. No business hours listed. Two competing contact forms live simultaneously.

**Staff:** Not a single staff name or credential appears on the website. The only staff name found in research is "nurse Katie" — sourced from a Google review, not the website.

**Business hours (found only on Birdeye, not on website):**
- Mon–Fri: 8:00 AM – 5:00 PM
- Closed weekends

---

## Social & Review Signals

| Platform | Status |
|---|---|
| Google Reviews | 4 total (aggregated via Birdeye) — avg 4.0 stars |
| Yelp | Listed, minimal reviews |
| Instagram | @bella_rosa_medical_ — 225 followers, 23 posts |
| Facebook | No page found |
| Review widget on site | None |
| Social icons on site | None confirmed in footer |

**Notable Google review content:**
- One reviewer notes they could not reach the business: *"tried numerous times to call and make an appointment but no one ever answered, left 2 voicemails"*
- One review names "nurse Katie" — only staff identity anywhere online
- Owner response to a review focuses on rebutting a negative rather than promoting services

---

## Competitor Comparison

Rankings for "med spa West Bloomfield MI" — what outranks Bella Rosa and why:

| Competitor | Google Reviews | Booking | Before/After | Staff Named |
|---|---|---|---|---|
| VIO Med Spa | 100+ | Zenoti embedded | Yes | Yes — franchise model |
| ESkinScience | 40+ | PatientNow | Yes — 40+ individual pages | Yes — Korean-owned niche |
| Aloria Skincare | 35+ Yelp | Vagaro | Yes | Yes — "first microblader in MI" |
| Michigan Med Spa | 20+ | Yes | Yes | Yes — Dr. Marvin Bleiberg MD |
| **Bella Rosa** | **4** | **Contact form only** | **Vendor images only** | **None** |

---

## Summary Score

| Category | Score | Notes |
|---|---|---|
| SEO | 1/10 | No meta descriptions, no local targeting, no schema, 2yr stale sitemap |
| Content | 2/10 | About page is a life coach demo; blog is WordPress placeholder text |
| Images | 1/10 | 100% vendor stock; no patient photos; broken alt text |
| Social proof | 1/10 | 4 Google reviews; 225 IG followers; no widgets on site |
| Technical | 3/10 | HTTPS ok; everything else broken or missing |
| Mobile/Speed | 3/10 | WordPress + page builder = typical 40-65 PageSpeed score |
| Trust signals | 0/10 | No staff, no credentials, no privacy policy, no HIPAA notice |
| **Overall** | **2/10** | Site is actively hurting the business's credibility |
