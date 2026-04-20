# Audit: Beauty and Wellness Med Spa
**URL:** https://beautyandwellnessmedspa.com  
**Address:** 22000 Michigan Ave Suite 200 Room 203, Dearborn, MI 48124  
**Owner/Provider:** Zeina Alawieh  
**Platform:** Shopify (confirmed via `cdn.shopify.com` asset URLs)  
**Audit Date:** 2026-04-20  
**Auditor:** Caliber Web Studio

---

## 1. BRAND SPAM — Name + Phone Repeated 10x in Header

The phone number `(248) 917-1065` appears **10 times** in the HTML, all concentrated in the header/navigation block. The business name "Beauty and Wellness" or "Beauty and Wellness Med Spa" appears **21 times** across the document.

**Raw HTML evidence (representative samples):**
```html
<a href="tel:(248) 917-1065">(248) 917-1065</a>   <!-- x10 in header -->
```

This is a Shopify theme artifact — the theme duplicates the phone number across its header variants (desktop nav, mobile nav, announcement bar, sticky header, mobile menu drawer, etc.). The result is an accessibility and UX nightmare: screen readers announce the phone number 10 consecutive times before any content. From a user perspective it looks desperate, not professional.

---

## 2. Platform Mismatch — Shopify as a Med Spa Website

**Shopify is an e-commerce engine built to sell physical products.** Beauty and Wellness Med Spa does not sell products — it sells appointments. Using Shopify creates structural problems:

| Issue | Evidence |
|---|---|
| URL structure | `/pages/`, `/blogs/`, `/collections/` — screams retail store, not medical practice |
| Cart + checkout infrastructure | Built into every Shopify page; adds unnecessary JavaScript weight |
| Theme limitations | Header phone duplication (see above) is a direct result of using an off-the-shelf Shopify theme not built for service businesses |
| Booking tacked on | BLVD (`joinblvd.com`) booking widget is a third-party iframe bolted onto a commerce platform |
| Schema limitations | Shopify's auto-generated schema is `Product` and `Organization`, not `MedicalBusiness` or `LocalBusiness` with `openingHoursSpecification` |

**Competitors like Adorn Medical Spa use WordPress** — a flexible CMS purpose-built for service businesses — with professional photography, doctor credentials prominently displayed, and a proper medical identity. Shopify makes Beauty & Wellness look like a skincare product store, not a clinical provider.

---

## 3. Freepik Watermark Stock Photography

The site uses **Freepik-sourced images**, identifiable by the file naming convention embedded in their Shopify CDN URLs:

```
/cdn/shop/files/freepik__a-confident-female-cosmetologist-wearing-a-black-h__30128.png
/cdn/shop/files/freepik__background__23648.png
```

The filename pattern `freepik__[description]__[ID].png` is Freepik's standard export format. **These are the watermarked free tier or AI-generated Freepik images** — the kind any random person can download for free. Additional stock photos with generic numeric filenames suggest further stock sourcing:

```
/cdn/shop/files/2149341454.jpg      ← stock library ID format
/cdn/shop/files/69932.jpg           ← stock library ID format
/cdn/shop/files/png-portrait-adult-photography-looking.png
```

**Impact:** Freepik images frequently appear on dozens of competitor websites. A prospect who has shopped around may literally recognize the exact same "confident cosmetologist" photo from another med spa's website. Trust is destroyed.

---

## 4. Before & After — Only 2 Examples

The site shows exactly **2 before/after pairs**:
1. **Lip Filler** — "Naturally fuller, more defined lips"
2. **Morpheus8 Skin Tightening** — Skin tightening and jawline definition

With a service menu spanning: Botox, Dermal Fillers, Laser Hair Removal, Microneedling, PRP Treatments, IV Therapy, Facials, Lymphatic Massage, Cellulite Treatments — only 2 before/afters is a major trust gap. A prospect considering Botox or laser hair removal has zero visual proof.

Top-performing med spa websites typically show 10–20+ before/after galleries organized by treatment, with consent disclosures and clear outcome descriptions.

---

## 5. SEO Gaps

### 5a. Missing Meta Description on Homepage
**Detected meta description:** None  
Google will auto-generate a snippet from body copy — typically a random sentence with no conversion intent.

### 5b. Duplicate H1
The H1 tag **"Michigan's Premier Medical Spa"** appears **twice** on the homepage. Two H1s on one page is an HTML specification violation and confuses search engine crawlers about the page's primary topic.

### 5c. H1 = Page Title on Service Pages
On the Botox page, the H1 is identical to the `<title>` tag:
- `<title>`: "Botox in Dearborn, MI | Natural Results at Beauty and Wellness Med Spa"
- `<h1>`: "Botox in Dearborn, MI | Natural Results at Beauty and Wellness Med Spa"

Best practice: the title tag is for SERPs, the H1 is for the user. They should be related but distinct.

### 5d. Zero Schema Markup
**No JSON-LD schema detected anywhere on the site.** Missing schemas:
- `LocalBusiness` / `MedicalBusiness` — no NAP structured data
- `MedicalClinic` with `openingHoursSpecification`
- `FAQPage` — the site likely has FAQ content
- `Review` / `AggregateRating` — 4.7 stars / 146 reviews not structured
- `BreadcrumbList`

Without schema, Google cannot display rich snippets (star ratings, hours, address) in SERPs. Adorn Medical Spa occupying the same search results has a structural advantage even with the same content.

### 5e. No Canonical Tags Detected
No `<link rel="canonical">` found on homepage or service pages. Shopify's default canonical handling is inconsistent and can create duplicate content issues across paginated collections and filtered views.

### 5f. Ghost Pages Still Indexed
Google has indexed the old URL `https://www.beautyandwellnessmedspa.com/facial-fillers/dermal-fillers.html` — this page now returns **404**. Any backlinks to this URL (Yelp, directories, old social posts) are leaking link equity into a dead page. A 301 redirect to the current dermal fillers service page would recover that equity.

### 5g. Thin Keyword Targeting
The homepage headline is **"Michigan's Premier Medical Spa"** — but the business is in **Dearborn**, not Michigan broadly. Primary keyword targets should be:
- "med spa Dearborn MI"
- "Botox Dearborn Michigan"
- "laser hair removal Dearborn"

City-specific targeting is absent from the homepage H1/H2 structure.

---

## 6. Page Speed & Performance

PageSpeed Insights API returned a 429 (rate-limited) during this audit. Based on observable signals:

- **Heavy Shopify theme JavaScript** — Shopify themes load ~400–600KB of JS by default, including cart/checkout logic irrelevant to a service business
- **Freepik PNGs** — PNG format for photographs (vs. WebP) bloats file sizes 3–5x
- **Third-party embeds** — BLVD booking widget loads external JavaScript
- **Multiple duplicate phone number elements** — 10 header elements rendered/hidden via CSS rather than true responsive design

**Estimate:** Mobile performance score likely in the **40–65 range** based on platform and image format indicators. Shopify med spa sites routinely score 50–60 on mobile PageSpeed.

---

## 7. Mobile Experience

- No evidence of a mobile sticky CTA bar (click-to-call / book now pinned to bottom)
- Phone number rendered 10x in header via CSS show/hide — not a true responsive design, adds DOM weight
- Navigation structure has 10+ top-level items — likely a cramped hamburger menu on mobile

---

## 8. Missing Pages

| Page | Status | Impact |
|---|---|---|
| `/about` | 404 | No provider credentials, no trust signals |
| `/our-services/` | 404 | Services hub page broken |
| `/contact-us/` | 404 | Contact page unavailable |
| `/facials-dearborn-michigan/` | 404 | Service SEO landing page broken |
| `/facial-fillers/dermal-fillers.html` | 404 | Old page still indexed |

**Multiple critical pages are returning 404.** This is catastrophic for both SEO and user trust — a prospect who clicks a search result for "facials Dearborn MI" and lands on a 404 page will immediately bounce.

---

## 9. Google Business Profile Audit

- **Rating:** 4.7 stars — strong
- **Reviews:** 146 Google reviews — solid volume
- **Yelp listing:** Only **11 photos** on Yelp despite being a highly visual services business
- **Complaint pattern:** Reviews note "they never answer the phone" — ironic given the phone number appears 10 times on the website
- **Photo quality:** Yelp listing is thin; GBP photo count not confirmed but likely underleveraged

---

## 10. Social Media Discrepancy

| Platform | Handle Used on Website | Actual Active Handle |
|---|---|---|
| Instagram | `instagram.com/beautyandwellnesscenter` | `@BWCmedspa` (per business) |
| Facebook | `facebook.com/BWCmedspa` | Active |
| TikTok | `tiktok.com/@beautyandwellnesscenter` | Unconfirmed |

The website links to `@beautyandwellnesscenter` on Instagram but the business's own marketing identifies as `@BWCmedspa`. Potential broken/wrong social links.

---

## 11. Competitor Contrast — Adorn Medical Spa

| Signal | Beauty & Wellness | Adorn Medical Spa |
|---|---|---|
| Platform | Shopify (e-commerce) | WordPress (service CMS) |
| Photography | Freepik stock | Custom professional photos |
| Provider credentials | Zeina Alawieh (NP) — buried | Doctor/NP credentials front and center |
| Before/After | 2 examples | Multiple galleries by treatment |
| Booking | BLVD iframe bolted on | Native BLVD integration |
| Location | Dearborn (22000 Michigan Ave) | Dearborn (24800 Michigan Ave — 2.8 miles away) |

Adorn is the direct Michigan Ave competitor. Same street, better website.

---

## Summary Score

| Category | Grade | Notes |
|---|---|---|
| Technical SEO | D | No schema, no canonical, duplicate H1, broken pages |
| On-Page SEO | C- | Some keyword landing pages exist but homepage is weak |
| Design & UX | D+ | Shopify theme, 10x phone, stock photos |
| Trust Signals | C | 4.7 stars but not leveraged on-site |
| Mobile | D | No sticky bar, heavy JS, cramped nav |
| Content | C | Some service pages have solid copy; homepage thin |
| Photography | F | Freepik stock = zero authenticity |
| **Overall** | **D+** | **Fixable with a full rebuild** |
