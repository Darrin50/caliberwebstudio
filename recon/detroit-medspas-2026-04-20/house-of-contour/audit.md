# House of Contour Med Spa — Website Audit
**Target:** houseofcontour.net  
**Audited:** 2026-04-20  
**Analyst:** Caliber Web Studio  

---

## Executive Summary

House of Contour is a 5.0-star, 203-review med spa with 27K Instagram followers, a Forbes-recognized owner, and a Presidential Lifetime Achievement Award. Their website looks like it was built in 2021, hasn't been maintained since, and is actively destroying the brand credibility their real-world reputation has earned. Every trust signal they have is either broken, buried, or absent from the site entirely.

---

## 1. BROKEN STAT COUNTERS

**Severity: HIGH — visible brand damage**

The homepage features two counter widgets built with Elementor's Counter module. Both are permanently frozen at "0+" and never animate. The counters display to every visitor as literal zeros.

**Root cause:** SiteGround Optimizer combined and minified all JavaScript into a single bundle (`siteground-optimizer-combined-js-9ed383a187a8a5fe3d9bea1e5d5c9d85.js`). The Elementor counter module (`elementor-counter`) requires a waypoint/scroll-trigger handler that was excluded from the bundle or has a dependency conflict. Confirmed via DOM inspection:

```javascript
window.elementorFrontend.modules
// Returns: { "StretchElement", "Masonry" }
// Counter module is NOT registered — animations never fire
```

**Live DOM — Counter 1 (Years Experience):**
```html
<span class="elementor-counter-number"
  data-duration="2000"
  data-to-value="3"
  data-from-value="0"
  data-delimiter=",">0      ← permanently shows 0
</span>
<span class="elementor-counter-number-suffix"> +</span>
```

**Live DOM — Counter 2 (Clients):**
```html
<span class="elementor-counter-number"
  data-duration="2000"
  data-to-value="500"      ← configured for 500, not 750
  data-from-value="0"
  data-delimiter=",">0      ← permanently shows 0
</span>
<span class="elementor-counter-number-suffix"> +</span>
```

**Compounding issue:** The counter is configured to show 500 clients, the About page body copy says 750 clients, and the homepage hero copy also says 750 clients. Three different numbers for the same stat on the same site — all while the visible counter says 0.

---

## 2. CONFLICTING ADDRESSES — NAP DISASTER

**Severity: CRITICAL — active local SEO harm**

Two different addresses appear across the same website, creating a Name/Address/Phone (NAP) conflict that suppresses local search rankings:

| Location | Address Shown |
|----------|--------------|
| Homepage body (Location widget) | 24901 Northwestern Highway Suite 607, Southfield, Michigan 48075 |
| Homepage footer | 19400 Livernois Ave, Detroit, Michigan 48221 |
| Contact page body | 19400 Livernois Ave, Detroit, Michigan 48221 |
| Contact page footer | 19400 Livernois Ave, Detroit, Michigan 48221 |
| Services page footer | 19400 Livernois Ave, Detroit, Michigan 48221 |
| Every other page footer | 19400 Livernois Ave, Detroit, Michigan 48221 |

The Livernois/Detroit address is the **old location**. It is hardcoded into the global WordPress footer template and appears on every single page of the site. The contact page shows ONLY the old address in the body content — meaning a visitor going to the contact page to find directions gets sent to a location the business no longer occupies.

**Local SEO impact:**
- Google cross-references the address on your website with your Google Business Profile. NAP conflicts are a confirmed ranking factor in local search.
- The current GBP, Yelp, Birdeye, and TripAdvisor all correctly show the Southfield address. The website is the outlier — and Google weights your own site heavily.
- The old Detroit address (19400 Livernois Ave) is still appearing in some Google search snippets for houseofcontour.net because it's embedded in the site's footer on every page.
- Two competing geographic signals (Southfield + Detroit) dilute relevance for "med spa Southfield" and related searches.

---

## 3. AWARDS BURIED — ZERO HOMEPAGE PRESENCE

**Severity: HIGH — major missed credibility**

House of Contour has earned four significant awards:
- **#1 Med Spa in Metro Detroit 2023** (Detroit City Council President Mary Sheffield)
- **Michigan Chronicle 40 Under 40 2024**
- **Forbes Black Business Mogul Award 2024**
- **Presidential Lifetime Achievement Award** (White House)

**Where these awards appear on the current site:** One paragraph of body text on the `/about-us/` page.

**Where they do NOT appear:** The homepage. The services page. The contact page. Above the fold anywhere. In the navigation. In a dedicated awards section. As visual badges or seals. As a proof bar. Anywhere a first-time visitor would see them without clicking to About and scrolling.

There is an `H2: Featured In` section on the About page, but the four `H4` tags beneath it are rendering empty — the media logo images are not loading. No press logos are visible anywhere on the site.

**Impact:** A prospect comparing med spas will not discover these awards unless they click through to About and read several paragraphs. Most visitors never do. The business is competing on the same level as an unknown competitor in Google results when it should be signaling "Forbes-recognized, White House-awarded #1 med spa in Metro Detroit."

---

## 4. STOCK PHOTO RELIANCE & MISSING BEFORE/AFTER GALLERY

**Severity: MEDIUM-HIGH**

The "Our Work" page exists but contains no photos. The page body reads: *"We offer a wide variety of products and services for both male and female."* That's it. The page title promises a portfolio, the content delivers nothing.

The homepage and services sections rely heavily on generic stock imagery. For a med spa where before/after transformations are the primary conversion driver, the absence of real results is a critical gap. Prospective clients book body contouring based on visual proof — the current site provides none.

Additional image problems:
- 10+ images across the site fail to load with HTTP errors
- One broken image URL still points to the developer's old staging server: `https://stefanj36.sg-host.com/wp-content/uploads/2022/07/wave-line.png`
- Zero alt text on any image (every `alt=""` is blank)

---

## 5. GENERIC WORDPRESS THEME

**Severity: MEDIUM**

**Theme:** Astra v4.13.0 (by Brainstorm Force) — one of the most widely-used free WordPress themes globally  
**Child theme:** `house-of-contour` (minimal Astra child)  
**Page builder:** Elementor Pro v4.0.2  

Confirmed from body class: `wp-theme-astra wp-child-theme-house-of-contour astra-4.13.0 elementor-default`

This is a generic foundation used by millions of sites. There is no custom design — the "brand" is applied as colors and fonts over an out-of-the-box template structure. Side by side with a custom-built site, the difference is immediately apparent.

---

## 6. TEMPLATE TELLS

| Tell | Detail |
|------|--------|
| Generator meta tag | `<meta name="generator" content="WordPress 6.x">` — publicly exposes CMS |
| Theme class in body | `wp-theme-astra` visible to any competitor doing recon |
| Developer email exposed | Schema `Person` node includes author slug: `/author/thebusinesstoolkitwebgmail-com/` — developer's Gmail address visible in public JSON-LD |
| Staging URL in production | `stefanj36.sg-host.com` appears in image src and schema `@id` |
| "Developed By The Business Toolkit" | Footer credit link, does NOT open in a new tab — sends visitors away |
| WooCommerce pages indexed | `/cart/`, `/checkout/`, `/my-account/` all publicly indexed on Google |

---

## 7. SEO GAPS

### Title Tags
| Page | Current Title | Problem |
|------|--------------|---------|
| Homepage | `#1 Weight Loss & Med Spa In Detroit \| House Of Counter Med Spa` | **TYPO: "Counter" not "Contour"** — this appears on every social share, tab, and search result |
| About | `About Us - House Of Contour Med Spa` | No location, no keyword |
| Services | `Services - House Of Contour Med Spa` | No location, no keyword, no meta description at all |
| Contact | `Contact Us - House Of Contour Med Spa` | No location |

The homepage typo ("Counter" instead of "Contour") also appears verbatim in the `og:title` and `twitter:title` — every time the site is shared on social media, the preview card reads "House Of Counter Med Spa."

### Meta Descriptions
- About and Homepage descriptions are nearly identical copy
- Services page has **no meta description** at all
- No page targets location-specific keywords ("body contouring Southfield MI")

### H1 Structure
**Every page on the site has an empty H1 tag.**

```html
<h1></h1>  <!-- empty on all pages -->
```

The visual headline content is placed in H2 tags. This is a foundational on-page SEO failure — search engines look at H1 as the primary topic signal for the page, and every page is broadcasting nothing.

Homepage heading hierarchy:
```
H1: [EMPTY]
H2: In 2024, we proudly helped over 750 clients...
H6: OUR SERVICES
H2: Our popular services
H6: LOCATION
H2: Visit us today
```

### Schema Markup
Rank Math SEO is installed but generating the **wrong schema type**. The site emits `Organization` schema — not `LocalBusiness`, `MedSpa`, or `HealthAndBeautyBusiness`. None of the local business schema fields are populated:

```json
{
  "@graph": [
    { "@type": "Organization" },   // ← wrong for local SEO
    { "@type": "WebSite" },
    { "@type": "ImageObject" },    // ← URL points to old staging server
    { "@type": "WebPage" },
    { "@type": "Person" },         // ← developer email in author slug
    { "@type": "Article" }
  ]
}
```

**Completely absent:**
- `LocalBusiness` or `MedSpa` schema
- `address` on any node
- `telephone`
- `geo` coordinates
- `openingHours`
- `priceRange`
- `aggregateRating` (despite 203 Google reviews at 5.0 stars — this alone could trigger rich snippets)
- `FAQ` schema
- `Service` schema

---

## 8. PAGE SPEED & TECHNICAL ISSUES

- SiteGround Optimizer JS bundling is actively breaking Elementor counter functionality (see §1)
- Lazy-loading not implemented on images
- No WebP image serving confirmed
- WooCommerce loaded on every page even though it's only used on 4 product pages
- Elementor Pro loading full library for pages that use basic widgets

No formal Lighthouse score run, but the combination of plugin conflicts, broken JS, and broken image loading strongly indicates performance below 70.

---

## 9. MOBILE ISSUES

- Phone number (248-795-5661) appears as **plain text** in footer and contact page — not wrapped in a `tel:` link. Mobile visitors cannot tap to call.
- No mobile sticky bottom bar (click-to-call + directions)
- Services page renders service cards with invisible text on mobile (CSS conflict with Elementor rendering)

---

## 10. MISSING PAGES & CONTENT

| Missing | Impact |
|---------|--------|
| No individual service pages | Cannot rank for "body contouring Southfield," "IV therapy Southfield," etc. |
| No blog | Zero organic content, no long-tail keyword capture |
| No FAQ page | Missing FAQ schema, no content addressing common objections |
| No team/about Stormie page | Owner's credentials (RN, Forbes-recognized) undersold |
| No before/after gallery | Primary conversion driver for med spa category is absent |
| "Our Work" page has no photos | Page exists and is indexed but delivers nothing |
| No Google Maps embed | Contact page has no map; the location image slot shows a broken photo |

---

## 11. SOCIAL PROOF — COMPLETELY HIDDEN

**203 Google reviews at 5.0 stars** — not mentioned, not linked, not embedded anywhere on the website. The word "Google" does not appear anywhere in the site content.

**27,000 Instagram followers** — the Instagram link in the footer is a text link. No follower count displayed, no feed widget, no "Follow us" section.

**Homepage testimonials:** 6 anonymous quotes (initials only: "M.S.", "C.H.", "B.D.") with no photos, no star ratings, no dates, no names. They read as unverifiable and generic.

No link to Google reviews, Yelp, or any third-party platform from any page.

---

## 12. ADDITIONAL BUGS

| Bug | Detail |
|-----|--------|
| Owner name typo | About page renders "Stormie Andeson, RN" (missing "r" in Anderson) |
| Title tag typo | "House Of Counter Med Spa" across all page titles, OG tags, Twitter cards |
| Stats contradiction | Counter says 500, About says 750, hero copy says 750 — three different numbers |
| Services page nearly empty | Body content: "We offer a wide variety of products and services for both male and female." No service descriptions, no pricing |
| All service cards link off-site | Every service CTA sends users to `bfrtx.myaestheticrecord.com` — unbranded generic booking system |
| Misleading nav labels | "Find Out More" → leads to eBook sales page ($21.99), not service info |
| "Secrets to Beauty" nav | Email capture for free eBook, not a beauty tips section |
| Lab Services + Drug Testing | Listed as med spa services with no context or explanation |
| No Google Maps embed | Contact page shows broken image instead of map |
| Hours discrepancy | Homepage shows Mon-Sat 9AM-3PM; booking system and third-party listings show different hours |
| Footer credit | "Developed By The Business Toolkit" opens in same tab (sends visitors away) |

---

## Opportunity Summary

This business has everything needed for an elite web presence — the awards, the reviews, the Instagram following, the owner's credentials — and the current website is doing the opposite of showcasing any of it. The gap between their real-world reputation and their web presence is the pitch.
