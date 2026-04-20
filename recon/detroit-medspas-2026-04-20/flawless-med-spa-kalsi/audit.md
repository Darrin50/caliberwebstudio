# Site Audit — Flawless Med Spa (Dr. Julie Kalsi Beri, D.O.)
**Recon Date:** 2026-04-20  
**Analyst:** Caliber Web Studio  
**Target URL:** https://www.flawlessmdspa.com  
**Business:** 17940 Farmington Rd, Suite 205, Livonia, MI 48152  
**Phone:** (248) 467-3738  
**Owner:** Dr. Julie Kalsi Beri, D.O.

---

## 1. SITE AVAILABILITY — CONNECTION ATTEMPTS

All attempts made on **2026-04-20 ~05:03–05:10 UTC**.

| Time (UTC) | Protocol | Result | Detail |
|---|---|---|---|
| 05:03:00 | HTTPS | **FAIL — TLS Handshake Error** | `SEC_E_ILLEGAL_MESSAGE` — server sent fatal SSL/TLS alert. No certificate negotiated. |
| 05:03:28 | HTTPS (verbose) | **FAIL** | Resolves to `172.65.190.172`. ALPN offered http/1.1. schannel error immediately on handshake. |
| 05:08:31 | HTTP | **503 Service Temporarily Unavailable** | Server: `Tengine` (Alibaba Cloud's Nginx fork). Response body: 51 bytes. Gname CDN parking script injected: `<script src=https://cf-oss.gname.net/e.js></script>` |
| 05:08:32 | HTTPS `--insecure` | **FAIL** | Same TLS handshake error even with SSL verification disabled |

**Diagnosis:** The domain is effectively **parked** by the Gname registrar's Chinese CDN. HTTP returns a 503 parking response. HTTPS is completely broken — no valid SSL certificate is installed. The site is **unreachable to all visitors**.

---

## 2. DNS DIAGNOSTICS

| Record | Value | Notes |
|---|---|---|
| A | `172.65.190.172` | Via CNAME chain |
| CNAME | `exp.gs-cdn.com` | Alibaba Cloud CDN ("exp" = expired) |
| NS | `expire1.gname-dns.com` | Gname registrar DNS |
| NS | `expire2.gname-dns.com` | Gname registrar DNS |
| MX | None found | No email infrastructure configured |
| SOA | `ns7.alidns.com` / `hostmaster.hichina.com` | HiChina = Alibaba Cloud subsidiary |

**Key issues:**
- The CNAME `exp.gs-cdn.com` routes traffic through Chinese infrastructure (Alibaba/HiChina), which is unusual for a Livonia, MI medical spa.
- Nameservers named `expire1` / `expire2` are a red flag — Gname uses these for domains on their parking/expiration pipeline.
- No MX records = no email delivery infrastructure visible at the domain level.

---

## 3. WHOIS / DOMAIN REGISTRATION

| Field | Value |
|---|---|
| Registrar | Gname 025 Inc |
| Created | **March 25, 2025** |
| Updated | March 26, 2026 |
| Expires | March 25, 2027 |
| Status | clientTransferProhibited |
| Registrant | Privacy-protected (no name/org disclosed) |

**Critical finding:** This domain is only **13 months old** as of the audit date. The Foursquare listing places the business in operation since at least **July 2016** (Foursquare venue ID timestamp: `5783c757` → Unix 1468432215 → July 13, 2016). The business operated under an older domain for nearly a decade before this domain was registered. The previous domain/hosting was likely abandoned, and this replacement domain was registered in March 2025 but never properly configured — the hosting behind it appears to have lapsed, leaving the domain parked on Gname's CDN.

---

## 4. SSL CERTIFICATE STATUS

**Status: No valid SSL certificate**

- HTTPS connection fails at TLS handshake (before any certificate is presented)
- The Gname parking CDN does not serve a valid SSL cert for this domain
- All major browsers (Chrome, Safari, Firefox, Edge) would show a **"Your connection is not private"** error — preventing any visitor from reaching the site
- Google explicitly downgrades sites without HTTPS in rankings

---

## 5. HOSTING / SERVER INFRASTRUCTURE

| Field | Value |
|---|---|
| Server | Tengine (Alibaba Cloud's Nginx fork) |
| CDN | Gname CDN / `exp.gs-cdn.com` |
| IP | `172.65.190.172` |
| Infrastructure country | China (Alibaba / HiChina) |
| Hosting tier | **Domain parking** (no active web server behind it) |

The site is effectively hosted nowhere. The domain is registered with a Chinese registrar, pointed at a Chinese CDN, and receiving no origin traffic — it serves a 503 parking page.

---

## 6. GOOGLE INDEXING STATUS

```
Google query: site:flawlessmdspa.com
Results: 0 pages indexed
```

**The site is completely invisible to Google.** Despite Google's index containing cached references to subpages (/services, /contactus, /testimonials, /services/microdermabrasion-dermafrac), a `site:` operator returns zero results. These cached links are remnants of an older crawl and will be fully deindexed as Google recrawls and finds nothing.

**Impact:** Any local search for "med spa Livonia MI," "Botox Livonia," "laser hair removal Livonia" — Flawless Med Spa does not appear in organic results. Competitors are capturing all of this traffic.

---

## 7. PREVIOUSLY ACCESSIBLE PAGES (from Google index cache)

The following pages were indexed at some point and appear in search result snippets, but are currently inaccessible:

| URL | Notes |
|---|---|
| `/` | Homepage |
| `/services` | Services listing page |
| `/services/microdermabrasion-dermafrac` | Individual service page (DermaFrac™) |
| `/contactus` | Contact page |
| `/testimonials` | Patient testimonials page |

**CMS platform clue:** The URL structure (`/services/microdermabrasion-dermafrac`, "Medical Spa Livonia, MI" in page titles, "Julie Kalsi Beri, DO" subdomain-style title) matches the naming conventions of **medical website platform builders** (likely Sesame Communications, Doctor Multimedia, or a similar medical-practice CMS). These platforms often host sites on third-party servers that are billed monthly — when billing lapses, the site goes offline.

---

## 8. SEO AUDIT

### Search Visibility
- **Google indexed pages:** 0
- **Bing:** Not verified (assumed similar)
- **Google Business Profile:** Active (4.93 ⭐, 43 reviews) — the only discovery vector currently working

### On-Page SEO Issues (from cached meta data)
- Page titles follow pattern: `{Service} Specialist - Livonia, MI: Julie Kalsi Beri, DO: Medical Spa: Flawless Med Spa` — bloated, keyword-stuffed, platform-generated
- No evidence of structured data / JSON-LD schema
- No sitemap.xml accessible
- No robots.txt accessible
- Site speed / Core Web Vitals: untestable (site is down)
- No SSL = Google ranking penalty
- Platform-generated URLs are reasonable but lack local keyword depth

### Local SEO Issues
- Google Business Profile is the only working local signal
- No citations with website link pointing to a live URL
- Yelp profile has only ~5 reviews (low for the platform)
- Groupon page: **inactive** — "No deals are currently available... not affiliated with Groupon"
- Nextdoor business page: no website URL listed, no reviews, no activity
- WebMD doctor profile lists Henry Ford contact numbers, not the med spa

---

## 9. GOOGLE BUSINESS PROFILE AUDIT

| Field | Status |
|---|---|
| Name | Flawless Med Spa: Julie Kalsi Beri, DO |
| Rating | ⭐ 4.93 / 5 (43 reviews) — exceptional |
| Address | 17940 Farmington Rd, Suite 205, Livonia, MI 48152 |
| Phone | (248) 467-3738 |
| Website link | Points to flawlessmdspa.com — which is **down** |
| Hours | Tue/Wed 11–5:30, Thu 10–4:30, Fri 9–3:30 (4 days/week only) |
| Review responses | Unknown — not verified |
| Photos | Not fully audited — Yelp shows limited photos |
| Booking link | None detected |
| Posts | Not verified |

**Key gap:** The GBP website link points to a dead site. Anyone clicking "Website" from Google Maps lands on nothing (or a browser security warning). This directly costs bookings.

---

## 10. SOCIAL MEDIA AUDIT

| Platform | Handle/URL | Status | Notes |
|---|---|---|---|
| Instagram | @flawlessmdspa | Exists ("Beautiful within you") | Metrics not publicly accessible; unclear last activity |
| LinkedIn | /company/flawlessmedspa | Active listing | **Only 22 followers**; lists 2–10 employees |
| Facebook | Not found | No page found | No Facebook presence detected |
| TikTok | Not found | — | — |
| Yelp | /biz/flawless-med-spa-livonia-2 | Active listing | ~5 reviews; last updated August 2025 |
| Groupon | Active listing | **Inactive** | "No deals available" — not affiliated |

**Finding:** Essentially no functioning social media marketing. The Instagram exists but shows no verifiable engagement signals. LinkedIn has 22 followers — a ghost profile. No Facebook page, no TikTok.

---

## 11. STAFF / CREDENTIALS (from LinkedIn)

| Name | Credentials |
|---|---|
| Dr. Julie Kalsi Beri | D.O. — DO from Western Univ. Health Sci. COMP (1995); Internist + Integrative Medicine; 31 years experience; Henry Ford Hospital affiliate |
| Lindsey Smith | APRN, MSN, FNP-C |
| Jason Muscari | MSN, FNP-BC |
| Phoebe Blake | BSHIM |

**Underutilized asset:** Dr. Kalsi's credentials (D.O., Henry Ford affiliation, 31 years of clinical experience, integrative medicine background) are exceptional for a med spa context. This story is not being told anywhere online.

---

## 12. COMPETITOR LANDSCAPE (Livonia/West Metro Detroit)

| Business | Web Presence | Notes |
|---|---|---|
| Allure Medical | alluremedical.com | Large regional chain, strong SEO, modern site |
| Faith Medical Spa | faithmedicalspa.com | Active local competitor, Livonia-based |
| TruYou Body Renewal | truyoumedspa.com | Livonia, modern site |
| Ajeless Health & Med Spa | ajeless.com | Serving Livonia area, modern presence |
| Flawless By Tamika Med Spa | flawlessbytamikamedspa.com | Active Livonia competitor, updated March 2026 |

Flawless Med Spa is invisible online while all competitors maintain active, indexed, bookable websites.

---

## 13. COMPLETE ISSUE INVENTORY

| # | Issue | Severity | Impact |
|---|---|---|---|
| 1 | Website completely down (503 + TLS failure) | **CRITICAL** | Zero web traffic, bookings lost |
| 2 | No valid SSL certificate | **CRITICAL** | Browser security warnings block all visitors |
| 3 | Domain parked on Chinese CDN (Gname/Alibaba) | **CRITICAL** | Trust/safety signals destroyed |
| 4 | Zero pages indexed on Google | **CRITICAL** | Invisible to all organic search |
| 5 | GBP website link points to dead URL | **HIGH** | Lost bookings from Maps visitors |
| 6 | No online booking system | **HIGH** | Friction kills conversions |
| 7 | No active social media marketing | **HIGH** | No brand awareness / retargeting |
| 8 | Groupon listing inactive/abandoned | **MEDIUM** | Stale brand impression |
| 9 | Nextdoor page — no website, no reviews | **MEDIUM** | Missed local neighborhood reach |
| 10 | Yelp: only 5 reviews vs. 43 Google reviews | **MEDIUM** | Platform gap, Yelp users see weak presence |
| 11 | WebMD profile — Henry Ford numbers only, no med spa info | **MEDIUM** | Lost doctor-to-patient referral traffic |
| 12 | No schema markup (LocalBusiness, Medical) | **MEDIUM** | Missing rich results in Google |
| 13 | Name spelling inconsistency ("Berri" vs. "Beri") | **LOW** | Citation mismatch, NAP inconsistency |
| 14 | LinkedIn: only 22 followers | **LOW** | Negligible B2B/referral presence |
| 15 | No Facebook page | **LOW** | Missing the largest local social platform |
| 16 | Limited hours (4 days/week) not clearly communicated online | **LOW** | Confusion, lost walk-in attempts |
| 17 | D.O. credentials and Henry Ford affiliation not leveraged | **OPPORTUNITY** | Massive trust differentiator being wasted |
| 18 | 4.93-star rating not marketed anywhere | **OPPORTUNITY** | Best reputation in the category — invisible |
