# Sources & Evidence Log — Ageless Spa Medica
**Audit Date:** 2026-04-20 | **Caliber Web Studio**

All sources accessed and verified on 2026-04-20 unless noted otherwise.

---

## Direct Domain Checks

| Source | URL | Method | Result |
|--------|-----|--------|--------|
| Live site (HEAD) | https://www.agelessspamedica.com | curl -I | 405 Method Not Allowed |
| Live site (GET) | https://www.agelessspamedica.com | curl -L | 200, 114 bytes, GoDaddy parking |
| Lander endpoint | https://www.agelessspamedica.com/lander | curl -L | 200, 795 bytes, GoDaddy parking system |
| Bare domain | https://agelessspamedica.com | curl -I | 405 |
| HTTP redirect check | http://www.agelessspamedica.com | curl -I | 405 |
| Secondary domain | https://drbhanushahmedspa.com | curl | ECONNREFUSED |
| Tertiary domain | https://bhanushahmd.com | WebFetch | ECONNREFUSED |

---

## RDAP / WHOIS

| Source | URL |
|--------|-----|
| Verisign RDAP | https://rdap.verisign.com/com/v1/domain/AGELESSSPAMEDICA.COM |
| Wild West Domains (registrar) | https://rdap.wildwestdomains.com/v1/domain/AGELESSSPAMEDICA.COM |

**Key data extracted:**
- Registration: 2006-04-06
- Expiration: 2027-04-06
- Last modified: 2026-04-07
- Registrar: Wild West Domains LLC (IANA ID 440 — GoDaddy subsidiary)

---

## DNS

| Query | Method | Result |
|-------|--------|--------|
| A records | nslookup | 76.223.67.189, 13.248.213.45 (AWS CloudFront) |
| NS records | nslookup | ns29.domaincontrol.com, ns30.domaincontrol.com |
| MX records | nslookup | None — SOA only (email broken) |
| TXT/SPF | Google DNS API (dns.google/resolve) | None — no SPF, DMARC, DKIM |
| DNS Serial | SOA | 2025041100 (last zone change April 11, 2025) |

---

## Wayback Machine

| Source | URL | Method |
|--------|-----|--------|
| CDX API — agelessspamedica.com | http://web.archive.org/cdx/search/cdx?url=agelessspamedica.com&output=text&limit=30&from=20240101&fl=timestamp,statuscode,urlkey | curl |
| CDX API — drbhanushahmedspa.com | http://web.archive.org/cdx/search/cdx?url=drbhanushahmedspa.com&output=text&limit=10&fl=timestamp,statuscode,urlkey | curl |
| Oct 2025 snapshot | https://web.archive.org/web/20251014041336/https://www.agelessspamedica.com/ | curl |

---

## NPI Registry

| Source | URL |
|--------|-----|
| NPI search | https://npiregistry.cms.hhs.gov/api/?version=2.1&first_name=Bhanu&last_name=Shah&state=MI&pretty=true |

**Extracted:** NPI 1295743896, Dr. Bhanu J Shah MD, OB/GYN taxonomy, license #31534, 37300 Dequindre Rd Suite 115 Sterling Heights MI 48310, phone (586) 574-2190, enumerated 2006-08-03, last updated 2019-01-24.

---

## Michigan LARA

- **Attempted:** lara.michigan.gov license verification for Bhanu Shah (license type 4600 — physician)
- **Result:** 404 Not Found on direct URL
- **Recommendation:** Manual lookup required at lara.michigan.gov → license verification → search Bhanu Shah → type: Physician
- License #31534 confirmed via NPI registry

---

## Review Platforms

| Platform | URL | Data Extracted |
|----------|-----|----------------|
| Birdeye | https://reviews.birdeye.com/ageless-spa-medica-146733718273028 | 93 reviews, 4.9 stars, Yellow Pages (59) + Citysearch (34) |
| Groupon | https://www.groupon.com/biz/warren/ageless-spa-medica | 94 reviews, 3.49 stars, no active deals |
| Yelp | https://www.yelp.com/biz/ageless-spa-medica-warren | 13 reviews, 13 photos, updated Sept 2025 (blocked by Yelp 403) |
| BBB | https://www.bbb.org/us/mi/warren/profile/laser-hair-removal/ageless-spa-medica-0372-90006410 | A+, not accredited, BBB opened 2009-03-17 |
| BBB (alt) | https://www.bbb.org/us/mi/warren/profile/laser-hair-removal/ageless-spa-medica-0332-90006410 | Duplicate BBB profile found |

---

## Professional Profiles

| Source | URL |
|--------|-----|
| Zocdoc | https://www.zocdoc.com/doctor/bhanu-shah-md-28387 |
| ZoomInfo | https://www.zoominfo.com/p/Bhanu-Shah/2363769035 |
| Manta | https://www.manta.com/c/mx4s1gh/ageless-spa-medica |
| BizStanding | https://bizstanding.com/directory/MI/AG/41/ |
| American Health & Beauty | https://americanhealthandbeauty.com/doctors |

---

## Social Media

| Platform | URL | Notes |
|----------|-----|-------|
| Facebook | https://www.facebook.com/p/Dr-Bhanu-J-Shah-Med-Spa-100068724383456/ | "Dr. Bhanu J. Shah Med Spa, Sterling Heights MI" — page exists, content not accessible |
| YouTube | https://www.youtube.com/channel/UCj-3jIyqUh1v0v36AETnw2A/about?disable_polymer=1 | Channel exists, metrics not accessible |
| Instagram | No confirmed account found for this specific practice | — |

---

## Search Queries Used

1. `Ageless Spa Medica Warren MI 29187 Ryan Rd reviews Yelp Groupon 2025 2026`
2. `Dr. Bhanu Shah "Ageless Spa Medica" Michigan medical license OB/GYN med spa Instagram Facebook`
3. `"Ageless Spa Medica" Warren MI Google Business Profile photos hours services 2025 2026`
4. `"Ageless Spa Medica" Groupon reviews complaints "dirty" OR "cancelled" OR "no show" 2023 2024 2025`
5. `"Ageless Spa Medica" OR "bhanu shah med spa" Instagram 2024 2025 Warren Michigan med spa`
6. `site:lara.michigan.gov OR "michigan.gov/lara" "Bhanu Shah" physician license lookup 2025`

---

## Limitations & Gaps

| Gap | Reason | Recommended Action |
|-----|--------|--------------------|
| LARA license status | Direct URL 404, database redirect error | Manual lookup at lara.michigan.gov |
| GBP photos/posts/Q&A | Requires manual Google Maps review | Search "Ageless Spa Medica Warren MI" on Google Maps |
| Yelp reviews content | 403 blocked | Access manually from browser |
| Facebook post recency | Meta blocks automated access | Visit page manually |
| YouTube video count/date | Page returns empty from bot | Visit channel manually |
| Actual Groupon review dates | Limited data in fetch | Visit Groupon manually for full review history |
| Henry Ford Health "Bhanu Shah" | Separate individual — not confirmed same Dr. Shah | Verify manually |
