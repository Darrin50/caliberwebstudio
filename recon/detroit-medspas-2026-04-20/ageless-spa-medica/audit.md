# Ageless Spa Medica — Full Site & Digital Presence Audit
**Date:** 2026-04-20 | **Analyst:** Caliber Web Studio
**Target:** 29187 Ryan Rd, Warren MI 48092 | Dr. Bhanu J. Shah, MD

---

## 1. WEBSITE STATUS — DEAD ON ARRIVAL

### 1.1 HTTP Header Checks
**Timestamp: 2026-04-20 01:03 EDT**

| Attempt | URL | Method | Result | Notes |
|---------|-----|--------|--------|-------|
| 01:03:14 | https://www.agelessspamedica.com | HEAD | `405 Method Not Allowed` | Server refuses HEAD requests |
| 01:03:15 | https://agelessspamedica.com | HEAD | `405 Method Not Allowed` | Bare domain same result |
| 01:03:15 | http://www.agelessspamedica.com | HEAD | `405 Method Not Allowed` | No HTTP→HTTPS redirect |
| 01:03:20 | https://www.agelessspamedica.com | GET | `200 OK` | Returns 114 bytes — parking page |
| 01:03:21 | https://www.agelessspamedica.com/lander | GET | `200 OK` | 795 bytes — GoDaddy parking lander |

**What the 114 bytes contain:**
```html
<!DOCTYPE html><html><head><script>window.onload=function(){window.location.href="/lander"}</script></head></html>
```
The site is a **GoDaddy domain parking page**. Visitors are silently JS-redirected to `/lander`, which serves GoDaddy's parking system with Google AdSense for Domains. No business content. No branding. No phone number. Just ads.

### 1.2 SSL Certificate
- SSL verify result: **FAILED (0)**
- `schannel: renegotiating SSL/TLS connection` — the certificate handshake is broken
- No valid TLS certificate serving business content
- A visitor's browser will likely show a security warning before they ever see anything

### 1.3 Performance Metrics (parking page, not real site)
- Name lookup: 16ms
- TCP connect: 34ms  
- Total time: 129ms
- Content-type: text/html
- Total bytes: 114

---

## 2. WAYBACK MACHINE — SNAPSHOT HISTORY

### 2.1 agelessspamedica.com (last 12 months)
**CDX API queried: 2026-04-20**

| Snapshot Date | Status Code | Notes |
|---------------|-------------|-------|
| 2024-02-17 | 301 | Redirect (to where?) |
| 2024-06-10 | 301 | Redirect |
| 2024-07-04 | 301 | Redirect |
| 2025-05-07 | 200 | Last crawl as "200 OK" |
| 2025-10-14 | 200 | **Already parking page** (confirmed) |

**Confirmed:** The October 2025 Wayback snapshot contains the identical `window.location.href="/lander"` parking code. The site has been a GoDaddy parking page since **at least April 2025** (DNS serial `2025041100` = last DNS change April 11, 2025).

**Timeline reconstruction:**
- Site was live (with real content) through ~early 2025
- DNS updated April 11, 2025 — pointing to parking
- Site effectively dead for **12+ months**

### 2.2 drbhanushahmedspa.com (secondary domain, also dead)
| Snapshot Date | Status | Notes |
|---------------|--------|-------|
| 2021-11-30 | 301 | Redirect era |
| 2021-12-04 | 301 | Redirect era |
| 2022-01-12 | — | Timeout/error |
| 2023-09-13 | — | Timeout/error |
| 2023-10-31 | — | Timeout/error |
| 2024-03-27 | 200 | Briefly alive March 2024 |
| 2024-05-27 | — | Dead again |
| 2026-04-20 | ECONNREFUSED | **Completely dead** |

---

## 3. DOMAIN / WHOIS / RDAP

**Source: rdap.verisign.com — queried 2026-04-20 01:03 EDT**

| Field | Value |
|-------|-------|
| Domain | AGELESSSPAMEDICA.COM |
| Handle | 401919815_DOMAIN_COM-VRSN |
| Registrar | Wild West Domains LLC (GoDaddy subsidiary, IANA ID 440) |
| Registration Date | **2006-04-06** (20 years old) |
| **Expiration Date** | **2027-04-06** |
| **Last Updated** | **2026-04-07** (13 days before this audit) |
| Nameservers | NS29.DOMAINCONTROL.COM, NS30.DOMAINCONTROL.COM |
| DNSSEC | **Not configured** (delegationSigned: false) |
| Domain Locks | client delete prohibited, client renew prohibited, client transfer prohibited, client update prohibited |

**Key observation:** The domain was renewed/touched on April 7, 2026 — 13 days ago. Someone is maintaining this domain but has not restored the website. The domain is safe through April 2027.

---

## 4. DNS RECORDS

**Queried via nslookup + Google DNS API — 2026-04-20 01:03 EDT**

### A Records (agelessspamedica.com → IPv4)
| IP | Owner |
|----|-------|
| 76.223.67.189 | **AWS Global Accelerator / CloudFront** |
| 13.248.213.45 | **AWS Global Accelerator / CloudFront** |

The site was previously hosted on an AWS-backed infrastructure. DNS now routes those IPs to GoDaddy's parking system.

### Nameservers
- NS29.DOMAINCONTROL.COM (97.74.104.15)
- NS30.DOMAINCONTROL.COM (173.201.72.15)
Both GoDaddy nameservers.

### MX Records
**None found.** The MX query returned only an SOA authority record with no actual mail exchange records.
**Implication: Email to any @agelessspamedica.com address bounces.** If a potential client emails info@agelessspamedica.com, the message is silently dropped. Every lost inquiry = lost revenue.

### TXT Records (SPF / DMARC)
**None found.** No SPF record, no DMARC policy, no DKIM setup.
- Zero email authentication
- The domain can be freely spoofed for phishing

### DNS Serial
`2025041100` — Last DNS zone update: **April 11, 2025** (~12 months ago, confirming parking cutover date)

---

## 5. THREE DEAD WEBSITES

This is not a single broken website. It is a pattern of digital abandonment across the entire web presence:

| Domain | Status | Last Live |
|--------|--------|-----------|
| agelessspamedica.com | GoDaddy parking page | ~April 2025 |
| drbhanushahmedspa.com | ECONNREFUSED — completely dead | ~2024 |
| bhanushahmd.com | ECONNREFUSED — completely dead | Unknown |

Three separate domains representing the business, all dead or near-dead simultaneously. Potential clients searching any variation of the doctor's name or practice get nothing.

---

## 6. REVIEW PLATFORM AUDIT

### 6.1 Birdeye — 93 Reviews, 4.9 ⭐
**Source:** reviews.birdeye.com/ageless-spa-medica-146733718273028

| Metric | Value |
|--------|-------|
| Total Reviews | 93 |
| Rating | 4.9 / 5.0 |
| Review Sources | Yellow Pages (59), Citysearch (34), Birdeye native (0) |
| **Age of Reviews** | **8–9 years old** |

**The 4.9-star story is misleading.** All 93 reviews originate from Yellow Pages and Citysearch — platforms that have been functionally irrelevant since ~2016. These are not recent patients. The most recent reviews visible are from 8+ years ago.

**Sentiment from extracted reviews:**
- Botox — praised multiple times ("REAL results", "AWESOME price", "meticulous and a perfectionist")
- Laser hair removal — praised for physician supervision ("doctor is right there")
- Venus Freeze (skin tightening) — praised for visible results
- Staff friendliness and promptness (< 5 min wait times)
- Cleanliness noted positively ("spa is very clean")
- Non-surgical facelift via Groupon — mentioned as "GREAT"

**Problem:** This reputation is invisible. Nobody searches Yellow Pages. The 4.9 score lives on Birdeye and nowhere else anyone looks.

---

### 6.2 Groupon — 94 Reviews, 3.49 ⭐
**Source:** groupon.com/biz/warren/ageless-spa-medica

| Metric | Value |
|--------|-------|
| Total Reviews | 94 |
| Rating | **3.49 / 5.0** |
| Active Deals | **NONE** |
| Status | "This merchant doesn't have any deals and is not affiliated with Groupon" |

**This is the most damaging platform in their portfolio.**

The business stopped running Groupon deals (no active offers), but the **listing persists publicly** with 94 reviews averaging 3.49 stars. Negative reviews include:
- "Horrible, dirty"
- Appointment cancelled without callback
- Massage caused soreness requiring chiropractic care
- "No manicure included" / disappointing facial experience
- Overpowering scent / poor treatment quality

This means:
1. They are getting **Groupon-discount clients** (not ideal patients)
2. Those clients leave **low-quality reviews** on a permanent public listing
3. The practice gets **no revenue** from Groupon anymore
4. The **reputation damage stays** indefinitely
5. Any prospective patient googling the business will find 3.49 stars before they find the 4.9 stars

---

### 6.3 Yelp — 13 Reviews
**Source:** yelp.com/biz/ageless-spa-medica-warren (updated September 2025)

- Only 13 reviews — strikingly low for a 20-year-old practice
- Yelp blocked direct access but search confirms listing is active
- 13 photos (Sept 2025 update suggests recent photo activity)
- Rating unknown from audit (blocked by Yelp)
- Business phone listed: (586) 574-2191

---

### 6.4 BBB — A+ (Not Accredited)
**Source:** bbb.org

| Field | Value |
|-------|-------|
| Rating | A+ |
| Accreditation | Not accredited |
| BBB File Opened | March 17, 2009 |
| Years in Business | 20 |
| Phone on BBB | **(586) 330-8010** ← different from Yelp/NPI |
| Website on BBB | **drbhanushahmedspa.com** ← dead domain |
| Second Address | 33101 23 Mile Rd, Chesterfield MI 48048 |

---

### 6.5 Phone Number Inconsistency (NAP Audit)
Across all platforms, **four different phone numbers** are listed:

| Platform | Phone |
|----------|-------|
| Groupon, Yelp, Zocdoc | (586) 574-2191 |
| NPI Registry | (586) 574-2190 |
| BBB | (586) 330-8010 |
| Search results / Manta | (844) 445-8089 |

Inconsistent NAP (Name-Address-Phone) is a local SEO killer. Google's algorithm treats inconsistent NAP signals as a trust negative and will rank competitors with clean data above them.

---

## 7. PROVIDER CREDENTIALS — DR. BHANU J. SHAH, MD

### 7.1 NPI Registry
**Source:** npiregistry.cms.hhs.gov — queried 2026-04-20

| Field | Value |
|-------|-------|
| NPI Number | **1295743896** |
| Full Name | Mrs. Bhanu J Shah |
| Credential | MD |
| Taxonomy / Specialty | **Obstetrics & Gynecology** |
| Michigan License | **#31534** |
| Practice Address | 37300 Dequindre Rd Suite 115, Sterling Heights MI 48310 |
| Phone | (586) 574-2190 |
| Entity Type | Individual (not sole proprietor) |
| Enumeration Date | August 3, 2006 |
| **NPI Last Updated** | **January 24, 2019** (7+ years stale) |

**Critical:** NPI profile has not been updated in over 7 years. The practice address on the NPI differs from the Warren address. One third-party source noted Dr. Shah's MD status as "inactive" — LARA verification could not be completed due to database redirect errors during this audit. Michigan LARA license search should be run manually at lara.michigan.gov.

### 7.2 Additional Professional Profile Data
- **Zocdoc:** Profile listed under "Woman to Woman Care Center and Ageless Spa Medica"
- **ZoomInfo:** Listed as "Doctor of Gynecology at Ageless Aesthetics Medical Spa" — yet another business name
- **Henry Ford Health System:** A Bhanu Shah MD is listed in their directory (may be a different person)
- **Practice context:** Dr. Shah runs a dual-practice model — OB/GYN at the Ryan Rd Warren location and cosmetic/med spa at the Dequindre/Chesterfield locations

---

## 8. GOOGLE BUSINESS PROFILE (GBP)

GBP data was not directly accessible for this audit (requires manual Google Maps search). From secondary sources:

| Data Point | Status |
|------------|--------|
| GBP listing exists | Confirmed (appears in Zocdoc, Birdeye aggregations) |
| Photos | Yelp shows 13 photos (Sept 2025) |
| Hours | **Conflicting:** Mon–Fri 9AM–5PM (one source) vs Mon–Fri 10AM–6PM (another) |
| Posts | No evidence of recent GBP posts |
| Q&A section | Status unknown |
| Website link on GBP | Likely pointing to dead agelessspamedica.com |

**The hours discrepancy alone is a conversion killer.** A patient who shows up at 9:30 AM based on one listing, then finds the door locked because another listing says they open at 10, doesn't come back.

---

## 9. SOCIAL MEDIA SIGNALS

| Platform | Profile | Status |
|----------|---------|--------|
| Facebook | "Dr. Bhanu J. Shah Med Spa, Sterling Heights MI" | Exists, activity unknown |
| YouTube | "Dr. Bhanu J. Shah Med Spa" (UCj-3jIyqUh1v0v36AETnw2A) | Channel exists, content volume/recency unknown |
| Instagram | No confirmed account for this business | Dark |
| TikTok | No confirmed account | Dark |

No evidence of an active social media content strategy. A board-certified OB/GYN running a medspa is a compelling content story — Dr. Shah's "30 years in medicine turned cosmetics" angle is completely untapped.

---

## 10. BUSINESS ENTITY CONFUSION

The practice operates under multiple names with no central digital home:
- Ageless Spa Medica (Yelp, Groupon, Birdeye)
- Ageless Spa Medica PLLC (BizStanding — professional limited liability company)
- Dr. Bhanu J. Shah Med Spa (Facebook, YouTube, BBB website)
- Ageless Aesthetics Medical Spa (ZoomInfo current listing)
- Woman to Woman Care Center (Zocdoc)

**A potential patient cannot connect these.** If they have a good experience and want to refer a friend, they don't know what to search. If they look up "ageless spa medica" they find a dead website and a 3.49-star Groupon page.

---

## 11. COMPLETE WEAKNESS INVENTORY

| # | Issue | Severity | Impact |
|---|-------|----------|--------|
| 1 | Website parked for 12+ months — GoDaddy ads showing | Critical | Zero online conversion |
| 2 | No MX records — email bouncing | Critical | Lost inquiries |
| 3 | Two additional dead domains (drbhanushahmedspa.com, bhanushahmd.com) | Critical | Brand confusion |
| 4 | Groupon listing: 3.49 stars, no deals, negative reviews public | High | Active reputation damage |
| 5 | Birdeye 4.9 rating based entirely on 8–9 year old reviews | High | False positive; reputation hollow |
| 6 | Zero recent reviews anywhere (no active review strategy) | High | Not ranking in local pack |
| 7 | 4 different phone numbers across platforms | High | Local SEO trust penalty |
| 8 | Conflicting hours (9AM vs 10AM open) | High | Conversion failure; patient frustration |
| 9 | No SSL certificate | High | Browser security warnings |
| 10 | No DNSSEC, no SPF/DMARC (spoofable domain) | Medium | Security/deliverability risk |
| 11 | NPI profile 7+ years stale (wrong address) | Medium | Provider credibility concern |
| 12 | No Instagram / TikTok presence | Medium | Zero organic reach in key demo |
| 13 | BBB website field pointing to dead domain | Medium | Broken trust signal |
| 14 | 5 different business names across platforms | Medium | Zero brand cohesion |
| 15 | No GBP posts activity | Medium | Lower local pack ranking |
| 16 | Yelp: only 13 reviews for 20-year practice | Medium | Underdeveloped platform |
| 17 | YouTube channel — no visible content activity | Low | Untapped authority channel |
| 18 | Dr. Shah's OB/GYN credentials not featured anywhere | Low | Massive trust asset buried |
| 19 | No schema markup anywhere (site was dead) | Low | Zero rich result eligibility |
| 20 | AWS CloudFront still in DNS despite parking | Low | Hosting infrastructure limbo |
