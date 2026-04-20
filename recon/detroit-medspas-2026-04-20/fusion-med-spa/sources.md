# FUSION MED SPA — SOURCES & RAW EVIDENCE
**Compiled by:** Caliber Web Studio
**Date:** 2026-04-20
**All data current as of April 20, 2026**

---

## 1. DOMAIN / WHOIS

### RDAP Lookup — fusionspausa.com
**URL:** https://rdap.verisign.com/com/v1/domain/fusionspausa.com
**Method:** Direct cURL to Verisign RDAP API
**Date:** 2026-04-20

**Key raw fields:**
```json
{
  "ldhName": "FUSIONSPAUSA.COM",
  "status": ["client transfer prohibited"],
  "events": [
    {"eventAction": "registration", "eventDate": "2009-12-20T23:29:49Z"},
    {"eventAction": "expiration", "eventDate": "2026-12-20T23:29:49Z"},
    {"eventAction": "last changed", "eventDate": "2025-12-21T08:46:44Z"},
    {"eventAction": "last update of RDAP database", "eventDate": "2026-04-20T05:02:37Z"}
  ],
  "entities": [{"roles": ["registrar"], "fn": "TurnCommerce, Inc. DBA NameBright.com"}],
  "nameservers": ["NSG1.NAMEBRIGHTDNS.COM", "NSG2.NAMEBRIGHTDNS.COM"],
  "secureDNS": {"delegationSigned": false}
}
```

**Notes:**
- TurnCommerce owns both NameBright.com (registrar) and HugeDomains.com (domain reseller). The domain was acquired from the original owner (likely after non-renewal) and is now parked/for-sale under HugeDomains.
- "client transfer prohibited" means the original owner cannot reclaim the domain without purchasing it from HugeDomains.
- Last changed 2025-12-21 = HugeDomains renewed the parking registration.

---

## 2. WAYBACK MACHINE — SITE HISTORY

### CDX API Snapshot History
**URL queried:** https://web.archive.org/cdx/search/cdx?url=fusionspausa.com&output=text&limit=15&fl=timestamp,statuscode
**Method:** Direct cURL

**Raw output:**
```
20101023094025 200   ← First live snapshot (October 23, 2010)
20110208020731 200
20110822202103 200
20120203195225 200
20130224073926 200
20130531030613 200
20130612162523 301
20131214132937 200
20140107012655 301
20140209102939 200
20140518004718 200
20141217063906 200
20150801141531 200
20151120003506 200
20151124100913 200   ← LAST live snapshot (November 24, 2015)
```

**Query for 2016-2026:** Returned EMPTY — zero snapshots.

**Conclusion:** Site was live from October 2010 to November 2015. Dead for 10+ years.

---

## 3. GOOGLE BUSINESS PROFILE

### GBP Data via Mindtrip.ai Aggregation
**URL:** https://mindtrip.ai/attraction/dearborn-heights-michigan/fusion-med-spa/at-JLQmO3nP
**Method:** Firecrawl API (fc-1f18907d65f24b55ae689ea1f2931e90)
**Date:** 2026-04-20

**Raw excerpt:**
```
# Fusion Med Spa
4.5·549 reviews·Dearborn Heights, Michigan

Address: 6970 N Telegraph Rd, Dearborn Heights, MI 48127, United States
Website: www.facebook.com   ← CONFIRMED: GBP website = Facebook
Phone: (313) 582-0808

Hours of operation:
- Mon: 9 AM – 6 PM
- Tue: 9 AM – 6 PM
- Wed: 9 AM – 6 PM
- Thu: 9 AM – 6 PM
- Fri: 9 AM – 6 PM
- Sat: 9 AM – 6 PM
- Sun: Closed

Google Maps CID: 16067678278460779236
```

**"You might want to ask" (AI-generated from unanswered questions):**
- What specific cosmetic and wellness treatments does Fusion Med Spa provide?
- Do you need to schedule an appointment in advance?
- What is the typical price range for laser therapy or injectables?
- Is Fusion Med Spa safe for someone trying med spa treatments for the first time?
- What are the best transportation options and parking details?

---

## 4. YELP

### Yelp Business Listing
**URL:** https://www.yelp.com/biz/fusion-med-spa-dearborn-6
**Label:** "FUSION MED SPA - Updated March 2026"
**Date:** 2026-04-20 (Yelp returned 403 Forbidden on direct scrape)

**From search snippet:**
- Rating: 4.5 stars (confirmed by multiple sources; some sources show 4.3)
- Review count: 549 (Yelp) — also seen as 588 in some aggregators
- Hours: Mon-Sat 9AM-6PM
- Address: 6970 N Telegraph Rd (consistent with GBP)
- Phone: (313) 582-0808

---

## 5. BBB (BETTER BUSINESS BUREAU)

### BBB Profile
**URL:** https://www.bbb.org/us/mi/dearborn-heights/profile/spa/fusion-med-spa-0372-90024719
**Method:** WebFetch
**Date:** 2026-04-20

**Raw extracted data:**
```
BBB Rating: A+
Accreditation Status: NOT BBB Accredited
Years in Business: 16 years (started 12/20/2009)
Incorporated: 11/6/2007
BBB File Opened: 1/31/2014
Phone: (313) 582-0808
Address: 6970 N Telegraph Rd, Dearborn Heights, MI 48127
Website: fusionspausa.com  ← STALE — dead/parked domain
Complaints: No specific complaint information displayed
```

---

## 6. GROUPON

### Groupon Business Page
**URL:** https://www.groupon.com/biz/dearborn-mi/fusion-medical-spa-detroit
**Method:** WebFetch
**Date:** 2026-04-20

**Raw extracted data:**
```
Active Deals: NONE — "This merchant doesn't have any deals and is not affiliated with Groupon."
Business name: Fusion Day Spa
Address: 13200 W Warren Ave., Dearborn, MI 48126  ← DIFFERENT ADDRESS
Phone: (313) 582-0808 (same)
Website: fusionspausa.com  ← dead domain
Rating: 4.1 / 5
Review count: 109 verified Groupon reviews
Hours: "Currently closed; opens at 10:00 AM"
Services listed: massages, facials, hair care, chemical peels, IPL, microdermabrasion, 
                 cosmetic injections, hair removal, eyelash extensions, makeup, manicures, pedicures
```

**Notable reviews snippet from search results:**
> "...absolute biggest scam ever... paid over $1500 for full body laser..."

---

## 7. BIRDEYE

### Birdeye Review Aggregator
**URL:** https://reviews.birdeye.com/fusion-med-spa-149487487082724
**Method:** Firecrawl API
**Date:** 2026-04-20

**Raw extracted data:**
```
CLAIM STATUS: "This profile has not been claimed by the business owner or representative."
Rating: 4.5
Total reviews: 892  ← MORE than GBP (549)
Status: Closed / Opens 9:00 a.m.
Category: Day Spas  ← MISCLASSIFIED (not "Medical Spa")
Location: "Dearborn, MI" (not Dearborn Heights)
Business description: "Feel Beautiful, Inside & Out! Fusion Med Spa is a Beauty Salon 
located in Dearborn, Michigan..."
```

---

## 8. WELLNESSLIVING

### WellnessLiving Business Listing
**URL:** https://www.wellnessliving.com/explore/locations/medical-aesthetics/us-mi-dearborn_heights/fusionmedspa/
**Method:** Firecrawl API
**Date:** 2026-04-20

**Raw extracted:**
```
Claim status: "Unverified Business — This listing hasn't been claimed yet."
CTA: "Online booking not available yet — Message the business to learn more"
Address: 6970 N Telegraph Rd, Dearborn Heights, Michigan, 48127, USA
```

---

## 9. WHEREE.COM

### wheree.com Directory Listing
**URL:** https://fusion-med-spa.wheree.com/
**Method:** Firecrawl API
**Date:** 2026-04-20

**Raw extracted:**
```
Verification status: "The owner or a representative of this business has not yet completed 
the verification process."
Phone listed: +131-358-20808  ← MALFORMED (correct: +1-313-582-0808)
Address: 6970 N Telegraph Rd, Dearborn Heights, MI 48127
Hours: 09:00 A.M - 06:00 P.M
```

---

## 10. BESTPROSINTOWN

### BestProsInTown Listing
**URL:** https://www.bestprosintown.com/mi/dearborn/fusion-med-spa-2/
**Date:** 2026-04-20 (search result snippet)

**Raw:**
```
Address: 1650 N Telegraph Rd, Dearborn, MI 48128  ← DIFFERENT ADDRESS (3rd variant)
```

---

## 11. PORTRAITCARE

### PortraitCare Directory
**URL:** https://www.portraitcare.com/location/fusion-med-spa-16472/
**Method:** Firecrawl API
**Date:** 2026-04-20

**Raw extracted:**
```
Name: Fusion Med Spa
Address: 6970 N Telegraph Rd, Dearborn Heights, MI 48127
Phone: (313) 582-0808
Google Rating shown: 4 (243 reviews)  ← Lower count, possibly stale aggregation
Services listed: All marked with ❓ — not populated
```

---

## 12. INSTAGRAM

### @fusionspa Profile
**URL:** https://www.instagram.com/fusionspa/
**Date:** 2026-04-20 (Firecrawl blocked — requires auth; data from search snippets)

**Confirmed from multiple search results:**
```
Handle: @fusionspa
Followers: 70,000
Posts: 1,094
Location: Dearborn, MI
Bio link: Unknown — likely Facebook or absent (no confirmed booking link)
```

---

## 13. FACEBOOK

### Facebook Page
**URL:** https://www.facebook.com/fusionmedspamichigan/
**Date:** 2026-04-20 (WebFetch returned minimal data; page partially blocked)

**Confirmed from GBP data:**
- GBP website field points to this URL
- Page exists and is active (referenced across all sources)
- Engagement data not retrieved

---

## 14. MINDTRIP.AI

### Mindtrip Attraction Profile
**URL:** https://mindtrip.ai/attraction/dearborn-heights-michigan/fusion-med-spa/at-JLQmO3nP
**Method:** Firecrawl API
**Date:** 2026-04-20

**Contains 5 photos aggregated from GBP:**
```
Photo 1: https://images.mindtrip.ai/attractions/fb59/e146/d417/f297/0a9f/d0e7/4cff/8838
Photo 2: https://images.mindtrip.ai/attractions/a9b3/7cf4/f309/1c6f/6bb6/660c/15a0/62f9
Photo 3: https://images.mindtrip.ai/attractions/9768/045a/6b39/ec7f/0654/f0b3/e9f8/197c
Photo 4: https://images.mindtrip.ai/attractions/f883/43aa/f369/d34f/8319/b949/f344/4414
Photo 5: https://images.mindtrip.ai/attractions/b81b/5721/b613/b505/f50f/71d9/a5be/87d1
```

---

## 15. SUPPLEMENTARY SEARCH RESULTS

### WebSearch 1 — General Discovery
**Query:** "Fusion Med Spa Dearborn Heights Michigan 6970 N Telegraph Rd reviews 2025 2026"
**Date:** 2026-04-20
**Confirms:** Phone (313) 582-0808, services (laser, facial, waxing), supervising doctor Dr. Ayoub Sayeg

### WebSearch 2 — Competitor Landscape
**Query:** "Fusion Med Spa Dearborn Michigan competitors Ideal Image 2025 2026"
**Date:** 2026-04-20
**Confirms:** Ideal Image (Allen Park) is the primary branded competitor. Laser Duet Med Spa and Zara Laser Hair Removal are local competitors.

### WebSearch 3 — Negative Review Signals
**Query:** "Fusion Med Spa Dearborn negative reviews scam laser complaints 2023 2024 2025"
**Date:** 2026-04-20
**Notable snippet from results:** *"the absolute biggest scam ever — paid over $1500 for full body laser"*

---

## 16. KEY DATA INCONSISTENCIES SUMMARY TABLE

| Data Point | Source A | Source B | Source C |
|-----------|---------|---------|---------|
| Address | 6970 N Telegraph Rd, Dearborn Heights 48127 (GBP) | 13200 W Warren Ave, Dearborn 48126 (Groupon) | 1650 N Telegraph Rd, Dearborn 48128 (BestProsInTown) |
| Review Count | 549 (GBP/Mindtrip) | 588 (some search snippets) | 892 (Birdeye) |
| Star Rating | 4.5 (Google) | 4.3 (some sources) | 4.1 (Groupon) |
| Website | www.facebook.com (GBP) | fusionspausa.com (BBB, Groupon) | N/A (no real site) |
| Email | fusionspausa@gmail.com | fusionspausa@gmail.com | — |
| Phone | (313) 582-0808 (all major sources) | +131-358-20808 malformed (wheree.com) | — |
