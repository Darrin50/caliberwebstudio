# FOY Med Spa — Full Site Audit
**Recon Date:** 2026-04-20  
**Target:** https://www.foreverfoy.com  
**Address:** 18161 W 13 Mile Rd, Suite C2, Southfield, MI 48076  
**Phone:** (248) 731-7414  
**Owner:** Dr. Gena Harrison-Anderson, MD  

---

## 1. Platform Intel — Wix Confirmed

FOY Med Spa is built on **Wix**. Evidence:
- Image URLs route through Wix CDN (`static.wixstatic.com`)
- Footer credits "MJC Agency for FOY Med Spa" — a Wix-partner design agency
- AVIF-format image delivery is default Wix behavior
- Page transitions and scroll behavior match Wix Studio template patterns
- No access to `robots.txt` or `sitemap.xml` independently configured
- Canonical URLs managed by Wix, not owner-controlled

**What this costs them:** Wix pages average 40–60 Lighthouse mobile performance scores. Core Web Vitals (LCP, CLS, FID) are out of their control. They cannot add custom server-side rendering, edge caching, or structured data outside of Wix's limited schema tools.

---

## 2. Repeated Gallery Blocks & Formulaic Structure

The homepage repeats the following structural pattern **at least twice**:

```
[Section Heading — "Experience Luxury" / "Why FOY?"]
  [3-column feature grid]
    [Icon] [Title] [2-sentence description]
    [Icon] [Title] [2-sentence description]
    [Icon] [Title] [2-sentence description]
  [Gallery strip — 4–6 images horizontal scroll]
  [CTA Button — "Book Now"]
```

The **"Why FOY?" section** is a textbook Wix template block with the following copy pattern:

> "Advanced Beauty Technology" — "We use the most advanced aesthetic equipment..."  
> "High Quality Care" — "Our experienced doctors, nurses, and aestheticians..."  
> "Facials & Skin" — "Customized facial treatments..."

This exact three-column icon-grid pattern appears in dozens of Wix med spa templates. There is no differentiation — any Wix med spa competitor could swap their logo in and the section would read identically. No specific technology is named. No outcomes are cited. No patient stories are included.

**Gallery repetition:** The image gallery block appears in both the hero-adjacent zone AND lower in the page as a standalone section. The images in both blocks appear to be the same or similar stock photos — not before/after results, not actual client photos.

---

## 3. Stock Photo Audit

All visible lifestyle imagery shows the hallmarks of licensed stock photography:

| Image Context | Stock Indicator |
|---|---|
| Hero section — woman receiving facial | Clean studio lighting, no FOY branding visible, generic spa uniform |
| Services section — injection close-up | No identifying provider features, stock watermark-adjacent framing |
| Gallery strips — spa interior/product | Generic luxury spa aesthetic, no Southfield Suite C2 location features |
| About page — team photo | Individual headshots appear professional but social-style, not branded |

**No before/after photography.** No verified client result photos. No photos of the actual 18161 W 13 Mile Rd location interior. This is a significant trust gap for a medical aesthetics practice.

---

## 4. SEO Gaps

### Title Tags
- **Homepage:** "FOY Med Spa | Facial & Aesthetic Medical Spa | Metro Detroit, MI"
  - Issue: "Metro Detroit" is too broad — not targeting "Southfield" where they physically operate and where local searches originate
  - Missing: primary service keyword in title (Botox, facials, fillers)

### Meta Description
- **Not configured** — Wix is likely auto-generating from page copy, which means search results show truncated body text instead of a crafted description
- Affects CTR directly in Google SERP

### Site Indexation (via site: search)
Only **3 pages** indexed in Google:
1. `/services`
2. `spravato.foreverfoy.com` (subdomain, not integrated)
3. Contact page

Missing indexed pages:
- No `/about` in index
- No individual service landing pages
- No `/blog` — **zero content marketing presence**
- No `/faq`
- No `/gallery` or `/results`

### Content Thinness
Every service description is 1–2 sentences. No keyword depth. Examples:

> "Customized facials with high-quality products" — 6 words of actual content  
> "Botox injections for wrinkles and muscle relaxation" — generic, no specificity  
> "IV infusions (nutrient-rich)" — not even a full sentence

Google's Helpful Content system penalizes thin, vague medical/aesthetic content. These descriptions would score poorly on E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness).

### Schema Markup — None Detected
- No `LocalBusiness` JSON-LD
- No `MedicalBusiness` schema
- No `Service` schema
- No `FAQPage` schema
- No `Review`/`AggregateRating` schema
- No `BreadcrumbList`

This is a full schema blackout. Competitors with proper schema get rich results (star ratings, FAQ dropdowns, service cards) in Google SERP. FOY shows nothing.

### Keywords Not Ranking For (High Intent, Southfield-Specific)
Based on search landscape analysis:
- "botox southfield mi" — not ranking in top 10
- "med spa southfield mi" — not ranking in top 5 (Yelp aggregator pages dominate)
- "laser hair removal southfield" — no dedicated page
- "semaglutide southfield michigan" — no blog post or landing page
- "black owned med spa detroit" — no content targeting this query
- "filler southfield mi" — no dedicated page

---

## 5. Page Speed & Mobile Performance

**Platform:** Wix (client-side rendered)

Known Wix performance benchmarks (mobile):
- LCP: typically 3.5–5.5s (Google threshold: < 2.5s = Good)
- CLS: often elevated due to Wix's dynamic layout engine
- FID/INP: impacted by Wix's JavaScript payload (often 300–500KB+ of uncompressed JS)
- Mobile Lighthouse score: typically 35–60 range for unoptimized Wix sites

**Specific issues visible on foreverfoy.com:**
- No `priority` loading on hero image (Wix doesn't expose `loading="eager"` or Next.js `priority` prop)
- No `next/image` optimization — raw AVIF from CDN with no responsive sizing
- Multiple render-blocking scripts from Wix analytics and third-party embeds
- Vagaro booking widget likely loaded synchronously, blocking main thread
- No lazy loading control on gallery strips (all images load at page load)

---

## 6. Mobile UX

- No sticky click-to-call button
- No mobile bottom navigation bar
- "Book Now" button in nav collapses to hamburger menu on mobile — hidden behind 2 taps
- Gallery image strips require horizontal scroll on mobile — poor UX
- Contact form is mobile-responsive but lacks autofill optimization
- **Hours displayed as plain text** — not machine-readable, no click-to-call on phone number confirmed

---

## 7. Missing Pages

| Page | Status | Business Impact |
|---|---|---|
| `/blog` | Missing | Zero content marketing, no long-tail SEO |
| `/gallery` or `/results` | Missing | No social proof for aesthetic results |
| `/faq` | Missing | No FAQ schema, misses voice search |
| `/financing` | Missing | CareCredit accepted but no dedicated page |
| `/spravato` | Subdomain only | Disconnected from main site SEO authority |
| Individual service pages | Missing | `/botox-southfield-mi`, `/laser-hair-removal`, etc. |
| `/specials` or `/promotions` | Missing | No urgency or recurring visit incentive |

---

## 8. Google Business Profile (GBP) Audit

**Listing Status:** Claimed (confirmed via CareCredit locator and Vagaro presence)

**Issues identified:**
- Primary category likely "Medical Spa" — may be missing secondary categories (Day Spa, Laser Hair Removal Service, Weight Loss Service)
- No posts visible in search results — GBP posts (weekly cadence) are a free ranking signal being ignored
- Photo count: unclear, but no user-uploaded result photos or before/after visible
- Q&A section: not actively managed (unanswered questions show up as competitor opportunities)
- Review response rate: no owner responses found across Yelp or Vagaro searches — this is a trust and ranking signal being wasted

**Review Profile:**
- Yelp: Listed (updated March 2026), rating/count not accessible
- Vagaro: Present but 404 on direct profile fetch
- Google: Reviews present but count/rating not confirmed in public search
- **No review generation strategy visible** — no follow-up email sequence, no in-office QR code prompts observed

---

## 9. Trust & Credibility Gaps

| Trust Signal | Status |
|---|---|
| Provider license numbers | Missing |
| BBB accreditation | Not displayed |
| Medical board certifications | Not displayed |
| Before/After gallery | Missing |
| Insurance/financing page | Missing (CareCredit exists but no page) |
| Press/media mentions | None found |
| Awards | None displayed |
| HIPAA compliance notice | Not visible |
| Privacy Policy | Linked in nav (present) |

**Dr. Gena Harrison-Anderson, MD** is the Medical Director — this is a significant credibility asset that the site completely undersells. An MD-owned med spa in a market full of nurse-practitioner or aesthetician-only operations should lead with this. Instead it's buried in team bio with no license, board certifications, or specialization mentioned.

---

## 10. Conversion Architecture

**Current funnel:**
> Visit homepage → "Book Now" button → Vagaro booking page (external redirect)

**Issues:**
- External redirect to Vagaro breaks trust and loses the session
- No lead magnet (no "free consultation" form, no email capture)
- No chat widget / live chat
- No SMS opt-in beyond buried contact form checkbox
- No urgency mechanism (no limited-time offers, no waitlist)
- Contact form phone field is optional — reduces callback opportunities
- No pricing means visitors leave to comparison shop on Yelp/Google before booking

---

## 11. Social Media vs. Website Disconnect

Instagram `@foy_detroit` appears active with regular posts. However:
- No Instagram feed embedded on website
- No UGC (user-generated content) integration
- Social proof generated on Instagram is not converted into website trust signals
- TikTok linked but no TikTok content visible on site
- No "As Seen On Instagram" gallery or results carousel

---

## Summary Scorecard

| Category | Grade | Notes |
|---|---|---|
| Platform | D | Wix — performance ceiling, limited SEO control |
| Design | C | Template, repeated blocks, stock photos |
| SEO On-Page | D | No meta, thin content, geo-mismatch |
| Schema Markup | F | Zero structured data |
| Page Speed | D | Wix JS overhead, no optimization levers |
| Content Depth | D | 1–2 sentence service descriptions |
| GBP Management | D | No posts, no review responses |
| Trust Signals | D | MD credentials buried, no before/after |
| Conversion | D | External booking, no lead capture |
| Mobile UX | C | Responsive but no sticky CTA or call bar |
| **Overall** | **D+** | **Active revenue loss at every touchpoint** |
