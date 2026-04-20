# FUSION MED SPA — ART OF WAR INTEL AUDIT
**Target:** Fusion Med Spa — 6970 N Telegraph Rd, Dearborn Heights, MI 48127
**Analyst:** Caliber Web Studio
**Date:** 2026-04-20
**Classification:** Sales Intelligence — Internal Use Only

---

> *"Know your enemy and know yourself and you will win a hundred battles."* — Sun Tzu

---

## EXECUTIVE SUMMARY

Fusion Med Spa is a 16-year-old med spa with genuine community trust (549+ Google reviews, 4.5 stars, 70K Instagram followers) and **zero web presence**. Their domain has been squatted by HugeDomains for 10+ years. Their GBP website button takes customers to Facebook. They use a Gmail address. Their business data is scattered across 6+ directories with three different addresses. They are running a $1,500 laser business with a 2009-era marketing infrastructure. This is a rare combination: a loyal customer base with maximum digital vulnerability. Every competitor with a real website is eating their lunch on Google.

---

## WEAKNESS CATALOG

---

### WEAKNESS #1 — DOMAIN DEAD / HIJACKED FOR 10+ YEARS ☠️ (CRITICAL)

**Evidence:**
- RDAP/WHOIS lookup (2026-04-20): `fusionspausa.com` is owned by **TurnCommerce, Inc. DBA NameBright.com** (IANA ID: 1441), the parent company of HugeDomains.
- Nameservers: `NSG1.NAMEBRIGHTDNS.COM` / `NSG2.NAMEBRIGHTDNS.COM` — HugeDomains parking infrastructure.
- Domain originally registered: **2009-12-20** (by the spa).
- Wayback Machine CDX API confirms last live snapshot with HTTP 200 status: **2015-11-24**.
- Zero Wayback snapshots with 200 status from 2016–2026.
- HugeDomains renewed the parked domain to: **2026-12-20**.
- Domain currently resolves to a HugeDomains "buy this domain" parking page.

**Translation:** For 10+ years, any potential client who types `fusionspausa.com` or clicks their old business cards, old Groupon listings, or old BBB entry lands on a domain broker page advertising the domain for sale. The spa is paying nothing — and losing everything.

**Cost to them:** Every Google search for their own brand name surfaces their social profiles, not a website. They rank nowhere for service keywords. Every referral who goes to look them up online hits a dead end.

---

### WEAKNESS #2 — GBP WEBSITE BUTTON GOES TO FACEBOOK ☠️ (CRITICAL)

**Evidence:**
- Mindtrip.ai aggregates GBP data. Their entry shows: `Website: www.facebook.com` (captured 2026-04-20, URL: mindtrip.ai/attraction/dearborn-heights-michigan/fusion-med-spa/at-JLQmO3nP)
- When a Google Maps user clicks **"Website"** on the Fusion Med Spa GBP listing, they land on Facebook.
- Google uses the website field as a primary ranking signal for local SEO — a Facebook URL provides no domain authority, no indexable content, no schema markup.

**Translation:** The single most important action a customer can take after finding them on Google leads to a different platform they don't control. Facebook can go down. Facebook can show ads. Facebook does not rank for "laser hair removal Dearborn Heights."

---

### WEAKNESS #3 — GMAIL EMAIL ADDRESS FOR A MED SPA 🔴 (HIGH)

**Evidence:**
- Email: `fusionspausa@gmail.com` (confirmed across Yelp, BBB, Groupon, multiple directory listings, 2026-04-20)
- A business doing $1,500+ laser packages and IV therapy is using Google's free consumer email.

**Translation:** No custom domain email = no professional trust signal. Any client doing even minimal due diligence compares them to competitors with `@theirmedspa.com` addresses. Gmail also means zero email marketing infrastructure, no automated appointment reminders, no post-visit follow-up sequences, no re-engagement campaigns.

---

### WEAKNESS #4 — TRIPLE ADDRESS INCONSISTENCY / NAP CHAOS 🔴 (HIGH)

**Evidence (all captured 2026-04-20):**
| Source | Address |
|--------|---------|
| Google Business Profile / current | 6970 N Telegraph Rd, Dearborn Heights, MI 48127 |
| Groupon (groupon.com/biz/dearborn-mi/fusion-medical-spa-detroit) | 13200 W Warren Ave, Dearborn, MI 48126 |
| BestProsInTown (bestprosintown.com/mi/dearborn/fusion-med-spa-2/) | 1650 N Telegraph Rd, Dearborn, MI 48128 |

**Three different addresses across major citation sources.**

**Translation:** Google's local ranking algorithm (Pigeon) uses NAP (Name, Address, Phone) consistency across the web as a primary trust signal. Three conflicting addresses = Google doesn't know where they are. This suppresses their local pack ranking. Every competitor with consistent citations outranks them even with fewer reviews.

---

### WEAKNESS #5 — UNCLAIMED PROFILES ON MAJOR REVIEW PLATFORMS 🔴 (HIGH)

**Evidence (all captured 2026-04-20):**
- **Birdeye:** Profile page header: *"This profile has not been claimed by the business owner or representative."* — 892 reviews aggregated, 4.5 stars. URL: reviews.birdeye.com/fusion-med-spa-149487487082724
- **WellnessLiving:** Header: *"Unverified Business — This listing hasn't been claimed yet."* URL: wellnessliving.com/explore/locations/medical-aesthetics/us-mi-dearborn_heights/fusionmedspa/
- **wheree.com:** *"The owner or a representative of this business has not yet completed the verification process."* URL: fusion-med-spa.wheree.com

**Translation:** 892 reviews on Birdeye alone — more than GBP — and they can't respond to a single one. Negative reviews sit unanswered. Positive reviews are unacknowledged. Anyone reaching them via these platforms encounters zero human engagement from the business.

---

### WEAKNESS #6 — NO ONLINE BOOKING SYSTEM 🔴 (HIGH)

**Evidence:**
- WellnessLiving shows: *"Online booking not available yet — Message the business to learn more."* (2026-04-20)
- No Vagaro link found in any search results or directory listing.
- No booking widget found on any platform.
- Booking requires phone call to (313) 582-0808 or Instagram DM.

**Translation:** In 2026, med spa clients — especially the under-40 demographic — expect online booking. Requiring a phone call as the only booking method creates friction that kills conversions. A potential client who finds them at 11pm via Instagram cannot book. They go to a competitor who has online booking.

---

### WEAKNESS #7 — INSTAGRAM FUNNEL IS A DEAD END 🟠 (MEDIUM-HIGH)

**Evidence:**
- @fusionspa: 70,000 followers, 1,094 posts (confirmed by multiple sources)
- Instagram bio link: Cannot link to a real website (domain is dead/parked). Likely links to Facebook or is blank.
- No trackable booking link (no Linktree, no Calendly, no booking widget link found in any source).

**Translation:** 70K followers is a genuine asset — but every one of those followers who wants to book hits a wall. There is no landing page, no email capture, no appointment form. The funnel is: Instagram → DM or phone call → hope they convert. Every week with no website is lost revenue from social traffic.

---

### WEAKNESS #8 — ZERO ORGANIC SEO FOOTPRINT 🔴 (HIGH)

**Evidence:**
- Google search for "laser hair removal Dearborn Heights MI" — fusionspausa.com returns 0 results.
- Google search for "med spa Dearborn Heights MI" — no website for Fusion appears in top organic results.
- No website = no blog, no service pages, no location pages, no schema markup, no meta titles, no H1 structure, no internal linking, no sitemap, no robots.txt.

**Translation:** For every month they've had no website (120+ months), competitors have been accumulating backlinks, indexed pages, and keyword rankings. A new CWS site will start from zero, but it starts. Fusion has nothing. "Laser hair removal Dearborn Heights" is a winnable local keyword with zero competition from Fusion right now.

---

### WEAKNESS #9 — MISCLASSIFIED ON BIRDEYE 🟠 (MEDIUM)

**Evidence:**
- Birdeye category: *"Day Spas"* — not Medical Spa, not Laser Hair Removal, not Med Spa.
- URL: reviews.birdeye.com/fusion-med-spa-149487487082724 (captured 2026-04-20)
- "Day Spa" category suppresses them from med-spa specific searches and aggregator rankings.

---

### WEAKNESS #10 — STALE BBB DATA 🟠 (MEDIUM)

**Evidence:**
- BBB profile (bbb.org/us/mi/dearborn-heights/profile/spa/fusion-med-spa-0372-90024719) still lists website as `fusionspausa.com` — the dead/parked domain.
- BBB opened file: 1/31/2014. Incorporated: 11/6/2007. Last likely updated: unknown.
- Rating: A+ (they have this going for them), but NOT accredited — they've never paid for accreditation.

**Translation:** Clients who check BBB see a dead website link. This immediately undercuts trust even for a business with an A+ rating.

---

### WEAKNESS #11 — MALFORMED PHONE NUMBER ON WHEREE.COM 🟠 (MEDIUM)

**Evidence:**
- wheree.com listing shows: `+131-358-20808` (captured 2026-04-20)
- Correct number: `+1-313-582-0808`
- A customer who tries to call directly from this listing reaches a wrong number or fails.

---

### WEAKNESS #12 — NO PRICING TRANSPARENCY 🟠 (MEDIUM)

**Evidence:**
- No pricing page exists (no website).
- No pricing listed on Yelp, Google, or any directory.
- Mindtrip.ai "You might want to ask" section includes: *"What is the typical price range for popular procedures like laser therapy or injectables at Fusion Med Spa?"* — a signal that clients are searching for pricing and finding nothing.
- Groupon 4.1 stars, 109 historical reviews — suggests they've competed on price via deal platforms in the past.

**Translation:** Competitors with pricing pages rank higher AND convert better because they remove the "what does it cost?" friction. Clients comparison-shopping online never see Fusion's pricing — they see a competitor's.

---

### WEAKNESS #13 — NO BEFORE/AFTER GALLERY 🟠 (MEDIUM)

**Evidence:**
- No website = no before/after gallery.
- No structured before/after content found on any directory listing.
- Before/after photos are the #1 conversion asset for med spas.
- 16 years of client results = zero documented visual proof online.

---

### WEAKNESS #14 — NO TEAM / CREDENTIALS PAGE 🟠 (MEDIUM)

**Evidence:**
- Dr. Ayoub Sayeg mentioned in historical search snippets as supervising doctor.
- No staff page, no practitioner bios, no certification listings on any platform.
- For a med spa doing lasers and injectables, absence of credential display is a liability trust gap.
- Clients considering laser or injectables actively search for provider qualifications.

---

### WEAKNESS #15 — NO BLOG / CONTENT MARKETING 🟠 (MEDIUM)

**Evidence:**
- Zero blog posts found anywhere.
- No educational content: no "what to expect from laser hair removal," no "HydraFacial vs. chemical peel," no "IV therapy benefits."
- Competitors with blogs rank on long-tail SEO keywords like "laser hair removal dark skin Michigan" — Fusion gets none of this traffic.

---

### WEAKNESS #16 — REVIEW RESPONSE GAP (UNKNOWN RATE) 🟠 (MEDIUM)

**Evidence:**
- Yelp: reviews with no confirmed owner response data (Yelp blocked scraping).
- Birdeye: 892 reviews, profile unclaimed — 0% response rate guaranteed.
- WellnessLiving: unclaimed.
- GBP response rate unknown, but absence of website/booking suggests operational investment in digital is low.
- Earlier search snippet: one review called it *"the absolute biggest scam ever"* citing $1,500 paid with no results — no confirmed owner response.

---

### WEAKNESS #17 — GROUPON HISTORY / PRICE POSITIONING DAMAGE 🟡 (LOW-MEDIUM)

**Evidence:**
- Groupon listing: 4.1 stars, 109 verified deal reviews (groupon.com/biz/dearborn-mi/fusion-medical-spa-detroit)
- No current Groupon deals active (2026-04-20)
- Historical Groupon presence signals a "deal-seeking" client acquisition strategy that undermines premium med spa positioning.
- Services listed include manicures, pedicures, eyelash extensions — signals inconsistent brand identity (are they a day spa or med spa?).

---

### WEAKNESS #18 — NO FAQ / PATIENT EDUCATION 🟡 (LOW-MEDIUM)

**Evidence:**
- No FAQ on any platform.
- Mindtrip.ai auto-generates "You might want to ask" questions including: safety of first-time medical spa treatments, pricing, appointment requirements, transportation.
- These are conversion-killing questions that have no public answers.

---

### WEAKNESS #19 — NO SCHEMA MARKUP 🟡 (LOW — NO WEBSITE EXISTS)

**Evidence:**
- No website = no JSON-LD, no LocalBusiness schema, no Service schema, no FAQ schema, no Review schema.
- Google relies on schema to generate rich results (star ratings in SERP, FAQ dropdowns, etc.).
- Competitors with schema get richer SERP features and click-through rate advantages.

---

### WEAKNESS #20 — HOSTING / DNS FLAGS 🟡 (LOW)

**Evidence (RDAP 2026-04-20):**
- Status: `"client transfer prohibited"` — HugeDomains locks domains so the original owner can't retrieve it without buying it back.
- No DNSSEC: `"delegationSigned": false`
- Nameservers controlled by HugeDomains infrastructure.
- The original owner cannot point this domain anywhere even if they tried — they must buy it back or use a new domain.

---

## STRENGTH ASSESSMENT (Know Thyself / Know Thine Enemy)

| Strength | Significance |
|----------|-------------|
| 4.5 stars, 549+ Google reviews | Strong social proof — real loyalty exists |
| 70,000 Instagram followers | Massive organic reach, built over years |
| 16 years in business | Trust and longevity signal |
| Multiple service lines | Upsell potential |
| "Feel Beautiful, Inside & Out" tagline | Emotional brand hook exists |
| A+ BBB rating (unaccredited) | Baseline credibility |
| Dr. Ayoub Sayeg (medical supervision) | Credentialed authority |

---

## THREAT MATRIX

| Competitor Type | Their Weapon | Fusion's Gap |
|----------------|-------------|-------------|
| Ideal Image (Allen Park) | National brand, full website, online booking | Fusion has no web comparison point |
| Local med spas with websites | Rankings for every service keyword | Fusion ranks zero |
| Any competitor with booking widget | 24/7 online booking | Fusion: phone only |
| Instagram competitors | Link in bio → booking page | Fusion: dead end |

---

## FINAL ASSESSMENT

Fusion Med Spa has the loyal customer base of a premium brand and the online infrastructure of a business that closed in 2015. The gap between their in-person reputation and their digital presence is the largest CWS has seen in this vertical. This is not a "let's improve their SEO" conversation — **they have no foundation at all**. A new CWS site doesn't improve Fusion's web presence; it **creates it from zero.**

The urgency is real: their domain expires December 20, 2026. If they don't act, a new squatter cycle begins. CWS can position this as a deadline.
