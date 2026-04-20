# K Vitality Spa — Full Site Audit
**Date:** 2026-04-20
**Auditor:** Caliber Web Studio
**Target:** K Vitality Spa | 13775 E 13 Mile Rd, Warren MI 48088
**Website:** https://www.kvitalityspa.com
**Platform:** Wix (confirmed)

---

## 1. PLATFORM — WIX PRISON

### Template / Builder Fingerprints
- `<meta name="generator" content="Wix.com Website Builder">` — confirmed in page source
- Footer stamp: *"© 2022 by K Vitality Spa. Proudly created with Wix.com"* — visible to users and crawlers
- WHOIS registrar: Wix.com Ltd. | Nameservers: ns8.wixdns.net / ns9.wixdns.net
- CDN: all images served from `static.wixstatic.com`, scripts from `static.parastorage.com`
- Domain: Registered July 28, 2021 — **expires July 2026 (renewal window is NOW)**
- Domain status: `clientTransferProhibited` + `clientUpdateProhibited` (Wix-locked)
- Booking: Wix native (not MindBody, Vagaro, or Jane App)

### URL Slug Disaster
Every service page uses Wix-generated numeric slugs with zero SEO value:

| Page | URL | Should Be |
|------|-----|-----------|
| Massage | `/services-9` | `/massage-warren-mi` |
| Facials | `/services-9-1` | `/facials-warren-mi` |
| Body Treatments | `/services-9-2` | `/body-treatments` |
| Waxing | `/services-2` | `/waxing-services` |
| About | `/about-1-1` | `/about` |
| Booking | `/book-online-1` | `/book` |
| Gift Certificate | `/copy-of-scheduling-gift-certificate` | `/gift-cards` |

Standard SEO paths (/services, /about, /contact) return 404. These slugs are **permanently baked into Wix** — they cannot be changed without a full rebuild.

---

## 2. SEO AUDIT

### Title Tags
| Page | Current Title | Issues |
|------|--------------|--------|
| Homepage | "Day Spa \| K Vitality Spa \| Warren MI" | Generic; no primary service keyword |
| Massage | "MASSAGE \| K Vitality Spa" | ALL CAPS looks spammy; missing city |
| Facials | "FACIALS \| K Vitality Spa" | ALL CAPS; missing city |
| About | "ABOUT US \| K Vitality Spa" | No keyword, no city |
| Contact | "CONTACT \| K Vitality Spa \| Warren MI" | Acceptable |
| Membership | "MEMBERSHIP \| K Vitality Spa" | Missing city |
| Booking | Not optimized | Missing city |

No page targets money keywords like "med spa Warren MI," "microneedling Warren MI," "facial spa Macomb County."

### Meta Descriptions
- **Present on:** Homepage (~168 chars, slightly over limit), Contact (~152 chars)
- **Missing on:** Massage, Facials, About, Membership, Booking, and all individual service sub-pages
- Homepage description is copy-paste boilerplate — no differentiator, no CTA urgency

### H1 Structure — Duplicate H1 on Every Page
Every page has the site-wide header ("K Vitality Spa") rendered as an H1, creating duplicate H1 violations site-wide. Examples:

- **Massage page H1s:** "K Vitality Spa" AND "THE KEY TO REVITALIZATION IS RIGHT NEXT DOOR..."
- **Facials page H1s:** "K Vitality Spa" AND "Beautify Yourself"
- **Homepage H1:** "OUR PHILOSOPHY" — not a keyword-bearing H1

None of the H1s target "Warren MI," "med spa," "massage," or any local service keyword.

### Schema / JSON-LD
- **Homepage only:** Two JSON-LD scripts (LocalBusiness + WebSite)
- LocalBusiness schema is incomplete:
  - **Present:** name, URL, image, address, telephone
  - **Missing:** `geo` (coordinates), `openingHours`, `priceRange`, `aggregateRating`, `sameAs` (socials), `description`
- **All other pages:** Zero schema — no Service schema, no FAQ schema, no BreadcrumbList anywhere

### Image Alt Text
- 10 homepage images: 3 missing alt text entirely (30% failure rate)
- Passing images use raw filenames as alt text: `"400dpiLogo-removebg-preview (1).png"`, `"Geriatric Massage.png"` — these are not alt texts, they are upload artifacts. Not accessible. Zero keyword value.

### Sitemap
- Auto-generated Wix sitemap at `/sitemap.xml` — valid but contains a dead pricing-plans entry dated `1970-01-01`
- All URLs in sitemap use the ugly `/services-9` slugs

### Robots.txt
- Standard Wix-generated config; no indexing blocks on content pages
- Fine as-is, but Wix boilerplate

### Blog
- **Does not exist.** No `/blog` path, no articles, no content marketing. Zero long-tail keyword capture.

---

## 3. MEDICAL CREDIBILITY GAPS

### Services That Cross Into Clinical Territory
| Service | Regulatory Status (Michigan) |
|---------|------------------------------|
| Microneedling (starts at $200) | Requires licensed medical supervision or delegated esthetician under physician oversight depending on device depth |
| Hydro Dermabrasion (up to $200) | Medical-grade device; supervision requirements vary |
| Chemical Peels (multiple types) | Esthetician scope for superficial; medium-depth requires oversight |
| Manual Lymphatic Drainage | Specialized training required; common post-surgical use |
| Dermaplaning | Michigan esthetician scope, but instrument-dependent |
| "Instant Lift" facial ($170) | Name implies clinical results — no disclosure of technique |

### Staff Credentials on Site
| Provider | Title | Credentials Shown |
|----------|-------|-------------------|
| Kia Vang | Founder & CEO | LMT (17 yrs), Licensed Esthetician |
| Marika Markey | LMT | 9 yrs experience |
| Ger Yang | Licensed Esthetician | ~10 yrs experience |
| Nicole Lee | Spa Support | None |
| Pang Vang | Director of Operations | Hospitality background |

**What is completely absent:**
- No MD, DO, NP, or PA listed anywhere
- No medical director named or implied
- No Michigan state license numbers published for any provider
- No HIPAA compliance notice or privacy policy (medical context)
- No "Results may vary" or FDA disclaimer on any treatment page
- No medical oversight language anywhere on the site
- No before/after gallery — for a business offering microneedling at $200+, this is a major conversion gap

---

## 4. BRAND CONFUSION

### The Positioning No-Man's-Land
The site self-identifies as a **"Day Spa"** (homepage title, Instagram bio), yet:
- Offers microneedling, hydrodermabrasion, dermaplaning, and chemical peels — services marketed by true med spas
- Google/Trustanalytica auto-categorizes the business as **"Medspa"** based on services offered
- No messaging distinguishes esthetic-level versus clinical-level services
- No medical supervision framework described or implied

This creates a trust gap: patients researching clinical treatments won't find the credentialing they need to feel confident, while relaxation-seekers may find the service menu confusing.

---

## 5. MISSING PAGES

| Page | Exists? | Impact |
|------|---------|--------|
| Before/After Gallery | **NO** | Highest-converting content for facial/skin services; completely absent |
| Dedicated Pricing Page | **NO** | Pricing scattered across 4+ service pages; no comparison view |
| Blog | **NO** | Zero SEO content marketing; competitors own long-tail keywords |
| FAQ | **NO** | Policy content exists but buried in /policy; not structured for search |
| Team / Provider Page | **NO** | Team bios buried in /about-1-1; no dedicated credentialing page |
| /services (root) | **404** | Standard path returns not-found; Wix slugs only |
| /about (root) | **404** | Standard path returns not-found |

---

## 6. PERFORMANCE

- DOM Content Loaded: ~876ms
- Full page load: ~2,000ms (2s on broadband)
- Heavy async JS bundles from `parastorage.com` CDN inflate total load time
- Wix sites typically score **60–75 on Lighthouse** — well below the 90+ target for local SEO
- No ability to optimize Wix's JS delivery; code-splitting is not available to site owners

---

## 7. MOBILE

- Wix mobile experience is auto-adapted, not truly mobile-first
- No indication of a mobile sticky CTA bar (click-to-call + directions)
- Booking flow goes through Wix's booking widget — not customizable for conversion optimization

---

## 8. GOOGLE BUSINESS PROFILE AUDIT

| Signal | Status |
|--------|--------|
| Rating | ⭐ 4.9 |
| Review Count | 549 Google reviews (exceptional for 3-yr-old business) |
| Groupon Reviews | 348 additional verified reviews |
| Primary Category | Massage Therapist |
| Secondary Category | Medspa (appears auto-assigned) |
| GBP Posts Activity | Not confirmed active |
| Q&A Section | No data surfaced |
| Photos | ~13 on Yelp — very thin for a visual business |
| Hours Consistency | **INCONSISTENCY** — website shows Mon–Thu open; multiple directories show Tue–Wed as CLOSED |

### NAP Inconsistencies
- Main phone (586) 879-0836 listed on website and most directories
- Mobile/text number (947) 224-0458 listed separately — Facebook lists ONLY the mobile number
- Email: `kvitalityspa@gmail.com` — Gmail, not a custom domain email; visible in business directories
- Groupon listing URL slug: `fraser-mi` (wrong city) instead of `warren-mi`
- WellnessLiving profile: unclaimed, booking unavailable
- Birdeye: unclaimed
- ConnectMacomb: broken 404

---

## 9. SOCIAL MEDIA

### Instagram (@kvitalityspa)
- **Posts:** 121 | **Followers:** 491 | **Following:** 277
- Bio category: "Day Spa" | Phone + address in bio
- Link: Linktree (adds booking friction vs. direct website link)
- Story Highlights: "Services," "Grand openin..." "Spa Room 1"
- Content: Mix of graphic promo cards (service + price) and real client photos
- No Reels evident — Reels are the primary discovery engine on Instagram in 2026
- **491 followers vs. 549 Google reviews** — strong offline reputation not converting to social presence

### Facebook
- **Two separate pages:** @KVitalitySpa1 (231 followers, 9 reviews) and @kvitalityspa3 (156 likes) — split audience, split social proof, brand confusion
- Only mobile number on Facebook — not the main business line

---

## 10. COMPETITOR LANDSCAPE (Warren/Macomb County)

| Competitor | Platform | Staff Credentials | Key Advantage |
|-----------|----------|-------------------|---------------|
| The Warren Medspa | WordPress | Named providers | Injectables, IV therapy, high-margin repeat services |
| Allure Medical | Custom enterprise | Dr. Charles Mok D.O. + multiple MDs/PAs | Full surgical + medical practice; 20+ year physician founder |
| ZI BLOOM Aesthetics | Custom | Krystle Dorobek CRNA | Dual locations; CO2 laser; semaglutide weight loss; named CRNA credentials |

**K Vitality's position:** Dominates therapeutic massage (549 reviews is exceptional). However it sits in no-man's-land on clinical services — offering med-spa-adjacent treatments (microneedling, dermaplaning, peels) without the medical credentialing that converts high-intent patients. True med spa competitors will own those higher-margin patients.

---

## SEVERITY SUMMARY

| Issue | Severity | Fixable on Wix? |
|-------|----------|-----------------|
| Non-semantic URL slugs | 🔴 Critical | NO |
| Missing meta descriptions (4/5 pages) | 🔴 Critical | Partial |
| Duplicate H1 on every page | 🔴 Critical | NO |
| No before/after gallery | 🔴 Critical | Yes |
| No medical credibility markers | 🔴 Critical | Partial |
| Thin/incomplete schema | 🟠 High | Partial |
| No blog/content marketing | 🟠 High | Yes (Wix blog) |
| Gmail business email | 🟠 High | No (requires domain email host) |
| Image alt text failures | 🟠 High | Yes |
| NAP inconsistencies (hours) | 🟠 High | Requires multi-directory cleanup |
| Two Facebook pages | 🟠 High | Yes (merge pages) |
| Wix "Proudly created with" footer branding | 🟡 Medium | $$ (paid plan required) |
| Low Instagram follower/review ratio | 🟡 Medium | Strategy, not platform |
| Domain expires July 2026 | 🟡 Medium | Action required ASAP |
| Linktree friction in Instagram bio | 🟡 Medium | Yes |
| No mobile sticky bar | 🟡 Medium | NO |
| Lighthouse score ~60-75 | 🟠 High | NO — Wix ceiling |
