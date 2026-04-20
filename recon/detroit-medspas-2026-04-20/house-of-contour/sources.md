# House of Contour — Recon Sources
**Compiled:** 2026-04-20

---

## Primary Source

| Source | URL | Data Points Extracted |
|--------|-----|-----------------------|
| Live website | https://houseofcontour.net | Full DOM, counter HTML, address strings, schema markup, heading structure, theme class, broken image URLs |
| About page | https://houseofcontour.net/about-us/ | Owner name (and typo), award text, business stats |
| Services page | https://houseofcontour.net/services/ | Empty content confirmed, service card structure, off-site booking URL |
| Contact page | https://houseofcontour.net/contact-us/ | Old Detroit address confirmed in body + footer |
| WordPress Sitemap | https://houseofcontour.net/wp-sitemap.xml | Full page inventory, last-modified dates |
| WordPress REST API | https://houseofcontour.net/wp-json/wp/v2/pages | Page list, post count (0 blog posts confirmed) |

---

## Third-Party Listings

| Platform | Listing URL | Data Confirmed |
|----------|------------|----------------|
| Google Business Profile | Google Maps search: "House of Contour Med Spa" | 24901 Northwestern Hwy #607, Southfield MI 48075 · 5.0 ⭐ · 203 reviews |
| Birdeye | Birdeye listing | 5.0 / 203 reviews · Southfield address confirmed |
| Yelp | Listed as "House Of Contour Spa And Wellness" | Southfield address confirmed |
| TripAdvisor | Listed at Southfield address | Southfield confirmed |
| Groupon | Multiple active deals | houseofcontour.net linked as booking destination |
| Instagram | @houseofcontourmedspa | 27,000 followers confirmed |

---

## Technical Evidence

### Counter Code (from live DOM)

```html
<!-- Counter 1 — Years Experience (permanently stuck at 0) -->
<span class="elementor-counter-number"
  data-duration="2000"
  data-to-value="3"
  data-from-value="0"
  data-delimiter=",">0
</span>
<span class="elementor-counter-number-suffix"> +</span>

<!-- Counter 2 — Clients (permanently stuck at 0) -->
<span class="elementor-counter-number"
  data-duration="2000"
  data-to-value="500"
  data-from-value="0"
  data-delimiter=",">0
</span>
<span class="elementor-counter-number-suffix"> +</span>
```

Elementor module check:
```javascript
window.elementorFrontend.modules
// { "StretchElement", "Masonry" }
// elementor-counter NOT present — SiteGround JS bundle conflict
```

Bundled JS file: `/wp-content/uploads/siteground-optimizer-assets/siteground-optimizer-combined-js-9ed383a187a8a5fe3d9bea1e5d5c9d85.js`

### Theme Identification (from body class)
```
wp-theme-astra wp-child-theme-house-of-contour theme-astra astra-4.13.0
elementor-default elementor-kit-39 elementor-page
```

### Schema Markup (from `<script type="application/ld+json">`)
```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization" },
    { "@type": "WebSite" },
    { "@type": "ImageObject", "@id": "https://stefanj36.sg-host.com/wp-content/uploads/2022/07/wave-line.png" },
    { "@type": "WebPage" },
    { "@type": "Person" },
    { "@type": "Article" }
  ]
}
```

Missing: `LocalBusiness`, `MedSpa`, `address`, `telephone`, `geo`, `openingHours`, `aggregateRating`

### Broken Image URLs (confirmed 404 / staging domain)
```
https://stefanj36.sg-host.com/wp-content/uploads/2022/07/wave-line.png  ← OLD STAGING SERVER
https://houseofcontour.net/wp-content/uploads/2023/08/Waxing.jpg
https://houseofcontour.net/wp-content/uploads/2022/07/Wood-Body-Contouring.jpg
https://houseofcontour.net/wp-content/uploads/2023/08/Post-Op-Lymphatic-Manipulation-Package.jpg
https://houseofcontour.net/wp-content/uploads/2023/08/IV-Therapy.jpg
https://houseofcontour.net/wp-content/uploads/2022/07/Vaginal-Rejuvanation.jpg
https://houseofcontour.net/wp-content/uploads/2023/08/Injection.jpg
https://houseofcontour.net/wp-content/uploads/2023/08/Lab-Services.jpg
https://houseofcontour.net/wp-content/uploads/2023/08/Drug-Testing.jpg
https://houseofcontour.net/wp-content/uploads/2022/07/Natural-1024x682.jpg
```

### Address Strings (exact text from DOM)

Homepage body: `"24901 Northwestern Highway Suite 607 Southfield, Michigan 48075"`  
Footer (every page): `"19400 Livernois Ave, Detroit, Michigan 48221"`  
Contact page body: `"19400 Livernois Ave Detroit, Michigan 48221"`

### Title Tag Typo (verbatim from `<title>` and og:title)
```
#1 Weight Loss & Med Spa In Detroit | House Of Counter Med Spa
```
Typo: "Counter" should be "Contour" — appears on homepage, og:title, twitter:title, og:image:alt

### Owner Name Typo (verbatim from About page)
```
Stormie Andeson, RN
```
Should be: "Stormie Anderson, RN"

---

## Known Business Facts (from on-site copy and third-party verification)

| Field | Value | Source |
|-------|-------|--------|
| Business name | House of Contour Med Spa | GBP, website |
| Owner | Stormie Anderson, RN | About page |
| Address (current) | 24901 Northwestern Hwy Suite 607, Southfield MI 48075 | GBP |
| Address (old/wrong) | 19400 Livernois Ave, Detroit MI 48221 | Footer on every page |
| Phone | 248-795-5661 | Footer |
| Instagram | @houseofcontourmedspa | Footer link |
| Instagram followers | 27,000 | Instagram profile |
| Google rating | 5.0 ⭐ | GBP |
| Google review count | 203 | GBP |
| Clients served | 750 (per About page copy) | houseofcontour.net/about-us |
| Combined weight loss | 10,000 lbs | Homepage hero copy |
| Award 1 | #1 Med Spa Metro Detroit 2023 (Detroit City Council President Mary Sheffield) | About page |
| Award 2 | Michigan Chronicle 40 Under 40 2024 | About page |
| Award 3 | Forbes Black Business Mogul Award 2024 | About page |
| Award 4 | Presidential Lifetime Achievement Award (White House) | About page |
| CMS | WordPress 6.x | meta generator tag |
| Theme | Astra v4.13.0 + custom child theme | body class |
| Page builder | Elementor Pro v4.0.2 | DOM |
| SEO plugin | Rank Math | DOM |
| Developer credit | The Business Toolkit (thebusinesstoolkit.com) | Footer |
| Last contact page update | 2026-01-14 | Sitemap |
| Blog posts | 0 | WP REST API |
