# My Beauty and Spa — Sources & Evidence Log
**Date:** 2026-04-20  
**Auditor:** Caliber Web Studio

---

## PRIMARY SOURCE

| URL | Notes |
|-----|-------|
| https://www.mybeautyandspa.com | Homepage — HTML source fetched |
| https://www.mybeautyandspa.com/about-us | About page |
| https://www.mybeautyandspa.com/our-services | Services grid |
| https://www.mybeautyandspa.com/contact | Contact page — no form, no map |
| https://www.mybeautyandspa.com/book-now | Redirects to Moxie |
| https://www.mybeautyandspa.com/ipl-treatment | Content complete |
| https://www.mybeautyandspa.com/neurotoxins | Content complete |
| https://www.mybeautyandspa.com/fillers | Content complete |
| https://www.mybeautyandspa.com/rf-microneedling | Content complete |
| https://www.mybeautyandspa.com/microneedling-with-prp | Content complete |
| https://www.mybeautyandspa.com/chemical-peels | Content complete |
| https://www.mybeautyandspa.com/facials | Content complete |
| https://www.mybeautyandspa.com/laser | "Coming Soon" — indexed |
| https://www.mybeautyandspa.com/sublime | "Coming Soon" — indexed |
| https://www.mybeautyandspa.com/sublative | "Coming Soon" — indexed |
| https://www.mybeautyandspa.com/hair-reduction | "Coming Soon" — indexed |
| https://www.mybeautyandspa.com/mesotherapy | "Coming Soon" — indexed |
| https://www.mybeautyandspa.com/cherry | "Coming Soon" — financing not set up |
| https://www.mybeautyandspa.com/privacy-policy | Unfilled `DATE` placeholder |
| https://www.mybeautyandspa.com/home | Duplicate of homepage — SEO issue |
| https://www.mybeautyandspa.com/robots.txt | Squarespace default template |
| https://www.mybeautyandspa.com/sitemap.xml | All pages, `changefreq: daily` Squarespace default |

---

## SQUARESPACE PLATFORM EVIDENCE

| Evidence | Value |
|----------|-------|
| Site ID (from CDN URL) | `67feb9ff911a15736c6af1d7` |
| CDN domain | `images.squarespace-cdn.com` |
| Title tag suffix | `— MY BEAUTY AND SPA LLC - 1512` |
| Admin paths in robots.txt | `/config`, `/account`, `/search` (Squarespace-specific) |
| Booking redirect | `app.joinmoxie.com/booking/my-beauty-spa` (external) |
| Privacy policy | Squarespace boilerplate, `DATE` field not filled |

---

## CONFIRMED STOCK PHOTO EVIDENCE

| Image | CDN Path | Stock Source Confirmed |
|-------|----------|------------------------|
| Blonde woman | `close-up-smiling-blonde-young-woman-florist-shop.jpg` | Filename reveals florist lifestyle stock; used on 11+ service pages |
| Bearded man | `portrait-concentrated-young-bearded-man.jpg` | Exact match: Freepik free photo #8074591 |
| Before/after GIF | `Assets+(1).gif` | Unoptimized animated GIF, no alt text |

**Freepik stock match:**  
https://www.freepik.com/free-photo/portrait-concentrated-young-bearded-man_8074591.htm

---

## CONFIRMED PLACEHOLDER SOCIAL LINKS (live on site)

```
http://facebook.com/squarespace    ← Squarespace template default, never removed
http://instagram.com/squarespace   ← Squarespace template default, never removed
```

Real links also present:
```
https://facebook.com/mybeautyandspa
https://www.instagram.com/my_beauty_and_spa?igsh=ZnQwbGZ2MTRyNW0x
```

---

## COMPETITOR SOURCES

| Business | URL |
|----------|-----|
| MUSE Medical Spa | https://musetroy.com/ |
| MUSE — Local SEO page | https://musetroy.com/medical-spa-in-troy-mi/ |
| Rêve Medical Spa | https://revemedicalspa.com/ |
| Revitalize Medical Spa | https://revitalizeplasticsmedspa.com/ |
| Glow & Contour Medspa | https://glowandcontour.com/ |
| Yelp — Medical Spas Troy MI | https://www.yelp.com/search?cflt=medicalspa&find_loc=Troy,+MI |

---

## BUSINESS LISTING / AGGREGATOR SOURCES

| Platform | URL / Notes |
|----------|-------------|
| Yelp | https://www.yelp.com/biz/my-beauty-and-spa-troy |
| Groupon | https://www.groupon.com/biz/troy-mi/my-beauty-and-spa |
| Birdeye | https://reviews.birdeye.com/troy-salon-spa-169827872516247 |
| Moxie booking | https://app.joinmoxie.com/booking/my-beauty-spa |
| Square Appointments (old) | https://square.site/book/LF47D53HV69DF/my-beauty-spa-troy-mi — listed as "Lily Bloom Beauty," different hours, different services — NAP inconsistency |

---

## INSTAGRAM / SOCIAL INTEL

| Handle | Notes |
|--------|-------|
| @my_beauty_and_spa | Active handle linked from site |
| @my_beauty_spa_lily | Provided by brief — did not surface in search results; may be inactive or handle changed |
| @mybeautyandspa | Additional handle found in search |

---

## OPERATIONAL INTEL

| Detail | Value |
|--------|-------|
| Med Spa phone | (586) 648-0818 |
| Lash/PMU phone | (248)-801-2370 |
| Public contact email | mybeautyspatroy@gmail.com (Gmail, not domain email) |
| Hours | Tue–Fri 10AM–8PM, Sat 9AM–5PM, Mon/Sun Closed |
| Booking platform | Moxie (primary) + Square (legacy, different business name) |
| Owner | Lily |
| Medical Director | Minghui Giebel (one photo on about page) |
| Other team member noted | Bryan Young (no photo) |

---

## SEO FINDINGS EVIDENCE

| Issue | Evidence |
|-------|----------|
| No meta descriptions | `<meta name="description">` absent on all pages checked |
| No Open Graph tags | No `og:*` tags found in any page `<head>` |
| No JSON-LD schema | No `<script type="application/ld+json">` found anywhere |
| Double H1 on about page | Both "MEET THE TEAM" and "Premier Medspa in Troy, MI 48083" marked as H1 |
| Duplicate URL | Both `/` and `/home` return content; sitemap lists `/home` |
| Triplicated tagline | Raw HTML: "Premier Medspa in Troy, MI 48083 – Premier Medspa in Troy, MI 48083 - Premier Medspa in Troy, MI 48083" |
| Unfilled privacy policy | Live text: "Our Privacy Policy was last updated on DATE." |
