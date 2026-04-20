# Sources: Beauty and Wellness Med Spa Recon
**Audit Date:** 2026-04-20

---

## Primary Source — Website HTML

- **URL:** https://beautyandwellnessmedspa.com  
- **Method:** WebFetch (HTML source extraction)  
- **Key findings:** Phone number x10 in header, business name x21, Freepik filenames, duplicate H1, 2 before/afters, zero schema, no meta description, no canonical tags  
- **Freepik URLs confirmed:**  
  - `//beautyandwellnessmedspa.com/cdn/shop/files/freepik__a-confident-female-cosmetologist-wearing-a-black-h__30128.png`  
  - `//beautyandwellnessmedspa.com/cdn/shop/files/freepik__background__23648.png`  
- **Additional stock photo CDN URLs (numeric IDs):**  
  - `/cdn/shop/files/2149341454.jpg`  
  - `/cdn/shop/files/69932.jpg`  
  - `/cdn/shop/files/png-portrait-adult-photography-looking.png`

---

## Service Page Source

- **URL:** https://beautyandwellnessmedspa.com/pages/botox-dearborn-michigan-beauty-and-wellness-center  
- **Method:** WebFetch  
- **Key findings:** H1 = page title (identical text), additional Freepik CDN reference (`/cdn/shop/files/freepik__background__23648.png`), BLVD booking widget (`joinblvd.com`), no schema markup, ~1,100–1,200 word page

---

## Broken Pages Confirmed (404)

- https://beautyandwellnessmedspa.com/pages/about — 404
- https://beautyandwellnessmedspa.com/our-services/ — 404
- https://beautyandwellnessmedspa.com/contact-us/ — 404
- https://beautyandwellnessmedspa.com/facials-dearborn-michigan/ — 404
- https://beautyandwellnessmedspa.com/blog/ — 404
- https://www.beautyandwellnessmedspa.com/facial-fillers/dermal-fillers.html — 404 (old indexed URL)

---

## Google / Reviews Data

- **Birdeye (Google reviews aggregated):** https://reviews.birdeye.com/beauty-and-wellness-center-169807247379434  
  - Rating: 4.7 stars  
  - Volume: 146 Google reviews  
  - Complaint pattern: "They never answer the phone"  
  - Staff mentioned: Maggie (20+ years experience), Zeina Alawieh (provider/owner)

- **TrustAnalytica:** https://trustanalytica.org/us/mi/dearborn/reviews/beauty-and-wellness-center  
  - Rating confirmed: 4.7 stars

---

## Business Directories

- **Yelp:** https://www.yelp.com/biz/beauty-wellness-and-med-spa-dearborn-2  
  - Updated February 2026  
  - Only 11 photos listed  
  - Location: 22000 Michigan Ave, Dearborn, MI

- **Fresha:** https://www.fresha.com/lvp/beauty-and-wellness-center-michigan-avenue-dearborn-a2lJPb  
  - Address confirmed: 22000 Michigan Ave Suite 200 Room 203, Dearborn, MI 48124

- **InModeMD Physician Directory:** https://inmodemd.com/physician/beauty-and-wellness-center/  
  - Confirms Morpheus8 provider status

---

## Competitor Research

- **Adorn Medical Spa:** https://adornmedspa.com  
  - Platform: WordPress  
  - Address: 24800 Michigan Ave, Dearborn, MI (2.8 miles from Beauty & Wellness)  
  - Design: Professional custom photography, doctor/NP credentials prominent, BLVD booking  
  - Yelp: 38 photos — https://www.yelp.com/biz/adorn-medical-spa-dearborn

---

## Domain / Site Index

- **Google site: search results:**  
  - Homepage: https://beautyandwellnessmedspa.com/  
  - Blog: https://beautyandwellnessmedspa.com/blog/  
  - Author page: https://beautyandwellnessmedspa.com/author/karen-diamond/  
  - Old HTML page (404): https://www.beautyandwellnessmedspa.com/facial-fillers/dermal-fillers.html  

- **Shopify platform confirmed by:** `cdn.shopify.com` asset URLs, `/pages/`, `/blogs/`, `/collections/` URL structure

---

## Social Profiles

- **Facebook (confirmed active):** https://www.facebook.com/BWCmedspa/  
- **Instagram (website links to):** https://www.instagram.com/beautyandwellnesscenter  
  - Note: Business-identified handle is `@BWCmedspa` — possible discrepancy  
- **TikTok:** https://www.tiktok.com/@beautyandwellnesscenter  

---

## Audit Methodology Notes

- **PageSpeed API:** Rate-limited (HTTP 429) during audit window; performance estimates based on observable platform signals (Shopify JS weight, PNG format images, third-party scripts)
- **Shopify theme name:** Not exposed in rendered HTML; `Shopify.theme.name` object not present in accessible page source — likely a Shopify 2.0 theme with client-side rendering
- **Wayback Machine:** Tool blocked in this environment; domain history not accessible
- **WHOIS:** Tools returned tool interfaces only, not raw WHOIS data; domain age not confirmed programmatically
