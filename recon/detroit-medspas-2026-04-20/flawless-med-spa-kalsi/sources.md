# Sources — Flawless Med Spa Recon
**Audit date:** 2026-04-20  
**All sources verified or attempted on this date.**

---

## PRIMARY DIAGNOSTICS (direct tool output)

| Tool | Command / Endpoint | Finding |
|---|---|---|
| curl -sI | `https://www.flawlessmdspa.com` (HTTPS) | TLS handshake failure — `SEC_E_ILLEGAL_MESSAGE` |
| curl -sv | `http://www.flawlessmdspa.com` (HTTP) | `503 Service Temporarily Unavailable` — Server: Tengine — Gname CDN script injected |
| curl -sv --insecure | `https://www.flawlessmdspa.com` | Same TLS failure even with cert validation disabled |
| nslookup | `flawlessmdspa.com @8.8.8.8` | A → 172.65.190.172 via CNAME exp.gs-cdn.com |
| nslookup NS | `flawlessmdspa.com @8.8.8.8` | expire1.gname-dns.com, expire2.gname-dns.com |
| nslookup MX | `flawlessmdspa.com @8.8.8.8` | No MX records; CNAME resolves to exp.gs-cdn.com (HiChina SOA) |
| WHOIS | who.is/whois/flawlessmdspa.com | Registrar: Gname 025 Inc; Created: 2025-03-25; Expires: 2027-03-25 |
| Wayback Machine CDX API | web.archive.org/cdx/...flawlessmdspa.com | Blocked / no snapshots available |
| Google site: query | `site:flawlessmdspa.com` | **0 results** — not indexed |
| Foursquare venue ID decode | `5783c757` hex → Unix timestamp | July 13, 2016 — business operating since at least 2016 |

---

## WEB SOURCES

### Business Listings
- [Flawless Med Spa — Yelp](https://www.yelp.com/biz/flawless-med-spa-livonia-2) — Last updated August 2025; ~5 reviews; 403 on direct fetch
- [Flawless Med Spa — Groupon](https://www.groupon.com/biz/livonia-mi/flawless-med-spa) — **Inactive**: "No deals available, not affiliated with Groupon." 4.5★ / 34 reviews
- [Flawless Med Spa — Foursquare](https://foursquare.com/v/flawless-med-spa-julie-kalsi-beri-do/5783c757498e776fb56a4cca) — Listed since July 2016; login-walled
- [Flawless Med Spa — Nextdoor](https://nextdoor.com/pages/flawless-med-spa-julie-kalsi-beri-do-livonia-mi/) — Listed; no website URL, no reviews, no social links
- [Flawless Med Spa — My Local Services](https://www.mylocalservices.com/Flawless+Med+Spa+Julie+Kalsi+Beri+DO-Livonia-Michigan-20661911.html) — Listed; 0 reviews; address listed as Wayne (error), MI 48152

### Professional Profiles
- [Dr. Julie Kalsi Berri — WebMD](https://doctor.webmd.com/doctor/julie-kalsi-berri-d00acfd1-c834-4a8a-8313-c28c844f4c85-overview) — Internal Medicine, 31 years exp., Henry Ford Hospital affiliation; no med spa website listed
- [Flawless Med Spa — LinkedIn](https://www.linkedin.com/company/flawlessmedspa) — 22 followers; 2-10 employees; staff: Lindsey Smith APRN FNP-C, Jason Muscari MSN FNP-BC, Phoebe Blake BSHIM

### Social Media
- [Instagram @flawlessmdspa](https://www.instagram.com/flawlessmdspa/) — Exists ("Beautiful within you"); metrics not publicly accessible via fetch
- Facebook — No business page found

### WHOIS / DNS Tools
- [who.is/whois/flawlessmdspa.com](https://who.is/whois/flawlessmdspa.com) — Full WHOIS record as fetched 2026-04-20

### Competitor References
- [Allure Medical — Livonia](https://alluremedical.com/locations/livonia-mi/)
- [Faith Medical Spa](https://www.faithmedicalspa.com/)
- [TruYou Body Renewal](https://truyoumedspa.com/truyou-body-renewal)
- [Ajeless Health & Medical Spa](https://ajeless.com/)
- [Flawless By Tamika Med Spa — Livonia](https://www.yelp.com/biz/flawless-by-tamika-med-spa-livonia)

### Cached/Indexed Pages (unreachable as of audit, visible in Google search results)
- https://www.flawlessmdspa.com/ — Homepage
- https://www.flawlessmdspa.com/services — Services page
- https://www.flawlessmdspa.com/services/microdermabrasion-dermafrac — DermaFrac service page
- https://www.flawlessmdspa.com/contactus — Contact page
- https://www.flawlessmdspa.com/testimonials — Testimonials page

---

## TECHNICAL NOTES

### Gname CDN Parking Script
When the domain is fetched via HTTP, the response body contains:
```
<script src=https://cf-oss.gname.net/e.js></script>
```
This is Gname registrar's domain monetization/parking script. The `exp.gs-cdn.com` CNAME and the "expire1/expire2" nameservers are part of Gname's expired/lapsed-domain CDN infrastructure. This is a known pattern for domains where the original web hosting was discontinued and the registrar defaults to a parking redirect.

### Alibaba Cloud / HiChina Connection
The `gs-cdn.com` domain has SOA records pointing to `ns7.alidns.com` with responsible mail `hostmaster.hichina.com`. HiChina is an Alibaba Cloud subsidiary. The IP `172.65.190.172` falls in Cloudflare's IP range (172.64.0.0/13) but the actual server software is Tengine — suggesting the connection goes through Gname's frontend CDN before hitting an Alibaba-backed origin.

### Domain Age vs. Business Age Discrepancy
- Business first appears in Foursquare: July 2016
- Current domain registered: March 25, 2025
- Gap: ~9 years of operation before this domain existed
- Most likely explanation: The business used a different domain (possibly the previous hosting platform's subdomain or a different custom domain) which was abandoned when transitioning platforms/registrars. The current domain was re-registered but hosting was never properly established.

### Previous Platform CMS Clues
URL structure and page title format (`{Service} Specialist - Livonia, MI: Julie Kalsi Beri, DO: Medical Spa: Flawless Med Spa`) are consistent with medical practice website builders such as Sesame Communications, Doctor Multimedia, or similar HIPAA-compliant medical CMS platforms. These platforms host sites on their own servers — when billing lapses or a practice cancels, the site goes offline while the domain may remain registered separately.
