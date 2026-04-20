# Sources & Evidence Log
*Modern Aesthetics of Michigan — 2026-04-20*
*Conducted by: Caliber Web Studio*

---

## URL Inventory & Fetch Results

| URL | HTTP Status | Key Findings |
|-----|-------------|--------------|
| `https://modernaestheticsofmichigan.com` | 200 OK | Homepage; GoDaddy builder confirmed; 18+ broken placeholder images; no meta description confirmed; title "Modern Aesthetics Of Michigan" only; H1 "Welcome to Modern Aesthetics Of Michigan"; copyright 2021; empty testimonials section; all navigation collapses to 2 links |
| `https://modernaestheticsofmichigan.com/about` | 404 Not Found | Page does not exist |
| `https://modernaestheticsofmichigan.com/services` | 404 Not Found | Page does not exist |
| `https://modernaestheticsofmichigan.com/contact` | 404 Not Found | Redirects/404 — correct URL is `/contact-us` |
| `https://modernaestheticsofmichigan.com/gallery` | 404 Not Found | Page does not exist |
| `https://modernaestheticsofmichigan.com/blog` | 404 Not Found | Page does not exist |
| `https://modernaestheticsofmichigan.com/before-after` | 404 Not Found | Page does not exist |
| `https://modernaestheticsofmichigan.com/team` | 404 Not Found | Page does not exist |
| `https://modernaestheticsofmichigan.com/pricing` | 404 Not Found | Page does not exist |
| `https://modernaestheticsofmichigan.com/faq` | 404 Not Found | Page does not exist |
| `https://modernaestheticsofmichigan.com/sitemap.xml` | 200 OK | Sitemap index containing 3 child sitemaps: `sitemap.website.xml`, `sitemap.ols.xml`, `sitemap.ola.xml` |
| `https://modernaestheticsofmichigan.com/sitemap.website.xml` | 200 OK | 4 URLs: `/`, `/contact-us`, `/privacy-policy`, `/terms-and-conditions`; all lastmod 2026-04-09; GoDaddy Website Builder sitemap format |
| `https://modernaestheticsofmichigan.com/sitemap.ols.xml` | 200 OK | Single URL: homepage only; lastmod 2026-04-20; GoDaddy Online Store sitemap (unused) |
| `https://modernaestheticsofmichigan.com/sitemap.ola.xml` | 200 OK | Single URL: homepage only; lastmod 2026-04-20T05:03:39+00:00; GoDaddy OLA (Online Listing Ads) sitemap |
| `https://modernaestheticsofmichigan.com/robots.txt` | 200 OK | Content: `User-agent: * / Disallow: /404` — GoDaddy default; no Sitemap directive |
| `https://modernaestheticsofmichigan.com/contact-us` | 200 OK | Contact page; phone (248) 514-1709; email ModernAestheticsOfMichigan@gmail.com; address 525 N. Main Street Suite #280 Milford, MI 48381; hours Monday-Sunday 9am-8pm By Appointment; no H1 — heading hierarchy starts at H4; no Google Maps embed confirmed; no booking button; GoDaddy footer attribution |
| `https://modernaestheticsofmichigan.com/privacy-policy` | 200 OK | H1 "Privacy Policy"; body content is "Privacy Policy coming soon" — placeholder text only; no actual privacy policy published despite site existing since 2021; GoDaddy footer attribution |
| `https://modernaestheticsofmichigan.com/terms-and-conditions` | 200 OK | H1 "Terms and Conditions"; GoDaddy footer attribution confirmed with direct URL to `godaddy.com/websites/website-builder` |

---

## Raw HTML Evidence

### GoDaddy Builder Proof — Footer Attribution

Confirmed present on every page scraped. The footer contains a hardcoded link:

```
Powered by [link to: https://www.godaddy.com/websites/website-builder]
```

This is the automatic GoDaddy Website Builder attribution injected into all sites built on their platform. It cannot be removed on standard GoDaddy Website Builder plans.

---

### Broken Image Evidence — Homepage

Every image element on the homepage resolves to this base64 placeholder:

```
src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
```

This is a 1x1 transparent GIF. It is the fallback placeholder GoDaddy's template engine injects when the proprietary lazy-loading JavaScript has not yet executed and replaced the src with the real image URL. In environments where the JS bundle fails, is blocked, or runs slowly, this placeholder becomes permanent and all images on the page appear broken.

Count of placeholder image elements detected: **18+** across the homepage

Alt attributes on all these elements: **none** (completely absent, not empty string)

Sections affected:
- Before/after treatment photo gallery
- "Meet the owner" (Rachel Daluisio profile photo)
- Service/treatment imagery
- Hero/banner area

---

### Sitemap.xml Raw Content (sitemap.ola.xml)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
  xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:pagemap="http://www.google.com/schemas/sitemap-pagemap/1.0"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://modernaestheticsofmichigan.com</loc>
    <lastmod>2026-04-20T05:03:39+00:00</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

Note the sitemap namespace extensions: image, video, news, mobile, pagemap, xhtml — these are all GoDaddy boilerplate inclusions. A custom-built site would include only the namespaces it actually uses.

---

### robots.txt Raw Content

```
User-agent: *
Disallow: /404
```

No `Sitemap:` directive. No `Crawl-delay`. No `Allow` rules. Pure GoDaddy default.

---

### Homepage Heading Structure

```
H1: "Welcome to Modern Aesthetics Of Michigan"
  Subheadline (not a heading tag): "YOUR PATH TO youthful rejuvination and glowing CONFIDENCE"
H2: "Our Services"
H2: "Treatment menu"
H2: "MEMBERSHIP SAVINGS BANK"
H2: "What Our Clients Say"
H2: "Meet the owner"
H2: "Shop SkinBetter Science Skincare"
H2: "Let's be sure to stay in touch!"
H2: "What else do I need to know?"
  H4: "-When to Schedule-"
  H4: "Can anyone get Botox?"
H2: "Subscribe to see what's coming soon!"
H3: (none detected anywhere on site)
```

Observations:
- FAQ questions "When to Schedule" and "Can anyone get Botox?" are **H4** tags nested under an H2 "What else do I need to know?" — skipping H3 entirely, which is an invalid heading hierarchy jump (H2 → H4)
- The hero subheadline "YOUR PATH TO youthful rejuvination and glowing CONFIDENCE" is **not a heading tag** — it is a styled paragraph or span, meaning it provides no heading SEO signal; it also contains a spelling error ("rejuvination" should be "rejuvenation")
- No H3 tags detected anywhere on the site
- The all-caps "MEMBERSHIP SAVINGS BANK" H2 is typographically inconsistent with all other headings
- "Meet the owner" section body text (confirmed): "Thank you for choosing Modern Aesthetics of Michigan to magnify your beauty! My name is Rachel Daluisio, RN, BSN, I am the owner and lead injector of MAM. My nursing specialties over the past 13 years include Emergency Medicine, Post Operative Services and Aesthetics."

---

### Contact Page Heading Structure

```
H1: (none)
H2: (none)
H3: (none)
H4: "Send Message"
H4: "Call, Text or Email"
H4: "Modern Aesthetics Of Michigan"
H4: "Hours"
H4: "This website uses cookies"
```

The contact page has **no H1, H2, or H3 tags**. The highest heading level is H4. The cookie consent notice ("This website uses cookies") is rendered at H4 level — the same heading weight as the business name and contact sections. This is a complete heading hierarchy failure. A screen reader user navigating by headings would encounter no logical structure.

---

### Navigation Links (Full Inventory)

From the homepage, the following navigation links were confirmed:

**Header navigation:**
- `/` — Home
- `/contact-us` — Contact Us
- ("More" dropdown referenced — contains duplicate links)

**Footer links:**
- `/privacy-policy` — Privacy Policy
- `/terms-and-conditions` — Terms and Conditions

**External links from homepage body:**
- `https://www.vagaro.com/modernaestheticsofmichigan` — "Schedule appointment" (booking)
- `https://www.facebook.com/104126185338847` — Facebook (numeric ID, no vanity URL)
- `https://www.instagram.com/modernaestheticsofmichigan/` — Instagram
- `https://store.skinbetter.com/checkout/checkout.ssp?is=skinusernew&invitecode=2825821#register` — Skinbetter Science store (affiliate/referral link)
- `https://www.godaddy.com/websites/website-builder` — GoDaddy attribution (injected by builder)

**Total internal pages in navigation: 2** (Home + Contact Us)
**Total unique pages on entire site: 4** (/, /contact-us, /privacy-policy, /terms-and-conditions)

---

### Pricing Data (Live on Homepage — Verification Date: 2026-04-20)

The following prices are publicly displayed on the homepage:

- Botox (Wrinkle Relaxer): **$13.50/unit**
- Dysport: **$5.00/unit**
- Dysport (membership rate): **$4.20/unit**
- Botox (membership rate): **$11.50/unit**
- Synthetic Hyaluronic Acid Dermal Fillers: **starting at $625/syringe**
- PRP Dermal Filler: **$799/session**
- Microneedling with PRP/EXOE Exosomes: **starting at $425/session**
- Hair Restoration with PRP/DERIVE Exosomes: **$425/session**
- Membership: **$99/month**

These prices are hardcoded in GoDaddy Website Builder template text fields. Any price change requires logging into the GoDaddy editor and manually updating each instance.

---

### Hero Section — Exact Text Confirmed

```
H1: "Welcome to Modern Aesthetics Of Michigan"
Subheadline (styled paragraph, not a heading tag):
  "YOUR PATH TO youthful rejuvination and glowing CONFIDENCE"
CTA button: "Schedule your appointment or complementary consultation here"
  → href: https://www.vagaro.com/modernaestheticsofmichigan
```

**Typo confirmed:** "rejuvination" — correct spelling is "rejuvenation." This is the second line of text a visitor reads on the homepage.

---

### "Meet the Owner" Section — Exact Text Confirmed

```
"Thank you for choosing Modern Aesthetics of Michigan to magnify your beauty!
My name is Rachel Daluisio, RN, BSN, I am the owner and lead injector of MAM.
My nursing specialties over the past 13 years include Emergency Medicine,
Post Operative Services and Aesthetics."
```

This is the entirety of the owner bio content. No credentials section, no story, no photo (photo is a broken placeholder). No mention of training programs, certifications, or continuing education.

---

### "What Our Clients Say" Section — Confirmed Empty

The section heading "What Our Clients Say" exists in the HTML. The section body contains only broken placeholder GIF images. **No review text, no reviewer names, no star ratings, no dates are visible.** The section is non-functional.

---

### Business Information Confirmed

- **Business Name:** Modern Aesthetics Of Michigan
- **Legal Entity:** Modern Aesthetics of Michigan Management Company, LLC (managed by Modern Aesthetics of Michigan, PLC)
- **Medical Director:** Dr. Joseph Klosterman, D.O.
- **Owner/Injector:** Rachel Daluisio, RN, BSN (13 years nursing experience: Emergency Medicine, Post-Operative Services, Aesthetics)
- **Phone:** (248) 514-1709
- **Email:** ModernAestheticsOfMichigan@gmail.com (free Gmail — not branded domain email)
- **Address:** 525 N. Main Street, Suite #280, Milford, MI 48381
- **Hours:** Monday - Sunday, 9am - 8pm (By Appointment)
- **Booking platform:** Vagaro (`vagaro.com/modernaestheticsofmichigan`)
- **Instagram:** `@modernaestheticsofmichigan`
- **Facebook:** `facebook.com/104126185338847` (numeric ID — no vanity URL — suggests unclaimed/unmanaged page)
- **Skincare retail:** Skinbetter Science (affiliate invite link: `store.skinbetter.com/checkout/checkout.ssp?is=skinusernew&invitecode=2825821#register`)
- **Google rating:** 5.0 stars, 61 reviews (sourced externally — site does not display reviews; "What Our Clients Say" section is broken/empty)
- **Builder:** GoDaddy Website Builder
- **Copyright:** © 2021 (5 years out of date as of 2026-04-20)

---

## Fetch Timestamps

All fetches conducted on: **2026-04-20**

Pages returning 404 (confirmed non-existent): `/about`, `/services`, `/contact`, `/gallery`, `/blog`, `/before-after`, `/team`, `/pricing`, `/faq`

Pages returning 200 (confirmed live): `/` (homepage), `/contact-us`, `/privacy-policy`, `/terms-and-conditions`, `/sitemap.xml`, `/sitemap.website.xml`, `/sitemap.ols.xml`, `/sitemap.ola.xml`, `/robots.txt`
