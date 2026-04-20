# Faith Medical Spa — Research Sources
**Audit Date:** 2026-04-20

---

## Primary Sources (live page fetches)

| URL | What Was Extracted |
|---|---|
| `https://www.faithmedicalspa.com` | Homepage HTML: theme path, slider library, visitor counter, meta title, H1, analytics check, schema check |
| `https://www.faithmedicalspa.com/weight-loss-and-medical-spa-about-us` | Title tag, H1, meta description status, provider listing |
| `https://www.faithmedicalspa.com/weight-loss-and-medical-spa-services` | Service listing, meta status |
| `https://www.faithmedicalspa.com/weight-loss-and-medical-spa-contact-us` | Contact page completeness: form, map, hours, email address |
| `https://www.faithmedicalspa.com/weight-loss-and-medical-spa-our-experts` | Provider bios, photo audit |
| `https://www.faithmedicalspa.com/weight-loss-and-medical-spa-insurance-accepted` | Insurance carrier listing |
| `https://www.faithmedicalspa.com/weight-loss-and-medical-spa-services/body-contouring-and-skin-tightening` | Slider library confirmation (Master Slider), blank.gif lazy load, alt text audit |
| `https://www.faithmedicalspa.com/weight-loss-and-medical-spa-services/face-and-neck-rejuvenation` | Image audit, alt text |
| `https://www.faithmedicalspa.com/weight-loss-and-medical-spa-services/skin-rejuvenation` | Image audit, alt text |
| `https://www.faithmedicalspa.com/weight-loss-and-medical-spa-services/vasculaz` | Gallery image alt text audit |
| `https://www.faithmedicalspa.com/sitemap.xml` | Sitemap structure: page-sitemap (21 pages), post-sitemap (empty) |
| `https://www.faithmedicalspa.com/robots.txt` | Confirmed `/wp-content/uploads/` disallow directive |

---

## Secondary Sources (external research)

| Source | URL / Query | What Was Found |
|---|---|---|
| BBB (Better Business Bureau) | Search: "Proweaver BBB rating" | D+ rating, 18 filed complaints, billing disputes, site-removal incidents |
| Facebook Business | Search: "Faith Medical Spa Livonia Facebook" | "Not yet rated (1 Review)" — Facebook listing with 1 unrated review |
| WellnessLiving Directory | Search: "Faith Medical Spa WellnessLiving" | "Unverified Business — listing not yet claimed"; "Online booking not available yet" |
| CareCredit Provider Directory | Search: "Faith Medical Spa CareCredit" | Listed as accepting CareCredit — not disclosed on their own website |
| Faith Internal Medicine (sister site) | `https://faithinternalmedicine.com` | 6 testimonials all dated 2024-01-03 (same date — likely seeded); not surfaced on med spa site |
| Yoast SEO Attribution | `https://www.faithmedicalspa.com/sitemap.xml` | Yoast SEO credited as sitemap generator; confirms plugin is installed but misconfigured |

---

## Domain Intelligence

| Field | Source | Value |
|---|---|---|
| Domain registration date | WHOIS / web.archive.org signals | May 21, 2024 |
| Domain age | Calculated | ~23 months as of audit date |
| Registrar | Not confirmed directly | — |

---

## Tools Used

- **WebFetch** — direct HTML source extraction on all target URLs
- **WebSearch** — GBP signals, directory listings, BBB research, sister site discovery
- **Manual HTML analysis** — theme path inspection, script src scanning, robots.txt parsing, sitemap XML parsing, image src/alt inventory

---

## Tools NOT Used (limitations)

| Tool | Reason Not Used |
|---|---|
| Lighthouse / PageSpeed Insights | Not available in current agent context — CWV estimates are inferred from source signals |
| Wayback Machine (direct API) | Searched but no significant archived snapshot data returned; domain only ~23 months old |
| Ahrefs / Semrush | Not available — backlink profile and keyword ranking data not captured |
| Google Search Console | Not accessible (would require site owner authorization) |
| Screaming Frog | Not available in current context |

---

## Notes on Data Quality

- All HTML-extracted findings are from **live page source at time of audit** (2026-04-20)
- Stock photo assessment is **inferred** from Proweaver filename patterns (`21716111238Uitm65a.jpg`) and generic alt text — not confirmed via reverse image search
- GBP star rating and review count could not be confirmed through accessible sources — the profile may exist with reviews not surfaced in search results
- Page speed estimates are qualitative, based on known characteristics of Master Slider, unoptimized WordPress installs, and lack of CDN signals — not from Lighthouse run
