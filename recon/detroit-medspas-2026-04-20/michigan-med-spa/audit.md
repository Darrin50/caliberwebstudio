# Michigan Med Spa — Full Site Audit
**Target:** Michigan Med Spa | michiganmedspa.com
**Address:** 6079 W Maple Rd #100b, West Bloomfield, MI 48322
**Phone:** 248-851-7246
**Owners:** Dr. Marvin Bleiberg MD, Erin Bleiberg, Kelly D'Arcy RN
**Audit Date:** 2026-04-20
**Auditor:** Caliber Web Studio

---

## CRITICAL: Platform & Template Identification

**CMS:** WordPress
**Theme:** Avada (Health demo — confirmed via sitemap custom post types `avada_portfolio`, `avada_faq`, `avada_portfolio`, and "Avada Health" brand name left in About page headings)
**Sitemap generator:** Yoast SEO (installed but misconfigured — no meta descriptions, no og tags set)
**Hosting:** Unknown, not Vercel
**Page Builder:** Fusion Builder (bundled with Avada)

**The site is an unfinished installation of the Avada Health demo. Multiple demo content blocks were never replaced. This is not a custom website — it is a bought template with partial content swap.**

---

## 1. LOREM IPSUM & PLACEHOLDER TEXT (Verbatim)

### About Page — Fake Staff (Avada Health Demo Doctors Never Replaced)

The team section shows three placeholder staff members from the Avada Health demo:

| Demo Name | Demo Title | Photo File |
|---|---|---|
| Jon Snow | Anesthesiologist | doctor-1.jpg |
| Tony Stark | Cardiologist | doctor-2.jpg |
| Anna Smith | Nurse Practitioner | doctor-3.jpg |

**Exact placeholder bio text (appears for all three "staff"):**
> "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque"

**Real staff** (Dr. Marvin Bleiberg MD, Erin Bleiberg, Kelly D'Arcy RN) appear on the homepage but have NO individual bios, NO credentials detail, and NO professional photos.

### About Page — Stats Block
All four metrics show literal zero:
- Healthy Patients: **0**
- Specialized Doctors: **0**
- Unique Departments: **0**
- National Awards: **0**

### About Page — Avada Branding Never Removed

Page heading reads: **"Avada Health"** — competitor branding left in a live client page.

Section headings that are Avada demo template copy:
- "Avada Health Values"
- "Expert Healthcare"
- "OUR PATIENTS SAY" — testimonials contain identical filler text in all three slots

### Services Page — Unfilled Product Sections

Three back-to-back sections with exact Avada template placeholder headings:
- "**Product / Service #1**"
- "**Product / Service #2**"
- "**Product / Service #3**"

Exact placeholder body copy (appears multiple times):
> "Whatever your company is most known for should go right here, whether that's being a technology leader, having skin in the game with clients and investors, or just talking about how much you love dogs."
> "What's another popular item you have for sale or trade? Talk about it here in glowing, memorable terms so people will get excited about it."
> "Don't think of this product or service as your third favorite, the way you like to think of that section of your house that's never quite as clean as the other parts. Talk about it the same way you would talk about your first two products."

Section heading also appearing twice: **"Talk more about your products here"**

CTA on services page: Button labeled **"Call to Action"** — no href, goes nowhere.

### Homepage — Lorem Ipsum in Service Descriptions

Latin-origin lorem ipsum detected in service description copy:
> "Sed ut perspiciatis unde omnis iste natus error..."

(Standard Lorem Ipsum from Cicero's De Finibus — unambiguously filler text.)

---

## 2. BROKEN IMAGES

| Image | URL | Status | Issue |
|---|---|---|---|
| Team photo | /wp-content/uploads/2018/04/teammms.jpg | **404 Not Found** | Misspelled filename never uploaded |
| About placeholder doctors | doctor-1.jpg, doctor-2.jpg, doctor-3.jpg | Loading but wrong | Stock Avada demo photos, not real staff |
| Multiple SVG elements | Various | Zero dimensions | Broken SVG placeholders in about section |

---

## 3. BROKEN CTAs & ROUTING ISSUES

### Services Page — Dead CTA
- Button text: "Call to Action"
- href: None / undefined
- Impact: Every visitor who clicks the primary services CTA goes nowhere

### Stretch Marks Removal — Broken CTA Chain
- The Stretch Marks Removal page's "Learn More" CTA was reported to link toward a leg veins/vein treatment page
- `/leg-veins/` returns **HTTP 404** — that destination page does not exist
- A broken service CTA on a revenue-generating treatment page means zero conversion

### Facebook Social Link — Wrong Profile
- Site links to: `https://www.facebook.com/michiganspine/` (Michigan Spine & Pain clinic)
- Michigan Med Spa's correct Facebook: `https://www.facebook.com/MichiganMedSpa/`
- Anyone who clicks the footer Facebook icon lands on a different business

---

## 4. SEO GAPS (Complete Failure)

### Meta Descriptions — All Missing
Zero pages have a meta description set. Checked:
- Homepage
- About
- Services
- Scar Removal
- Skin Rejuvenation
- Laser Hair Removal
- Stretch Marks Removal
- HydraFacial
- Contact
- Blog

Google is auto-generating snippets from random on-page text — usually the lorem ipsum or "Avada Health" copy.

### Page Title — Draft Title Live
Homepage title tag: **"Home New - Michigan Med Spa"**
- "New" is a WordPress draft suffix from when a new homepage was created
- This is the live, indexed title — the one Google shows in search results

### Open Graph — Completely Missing
- No `og:title`
- No `og:description`
- No `og:image`
- No `og:url`
- No `og:type`

Every social share from michiganmedspa.com shows blank previews.

### JSON-LD Schema — Not Implemented
Zero structured data markup on any page. Missing:
- `LocalBusiness` schema (name, address, phone, hours, coordinates)
- `MedicalBusiness` / `MedSpa` schema
- `Service` schema on service pages
- `FAQPage` schema
- `BreadcrumbList` schema
- `Person` schema for Dr. Bleiberg

Google cannot pull rich results, knowledge panel data is weak, and local pack ranking is suppressed without schema signals.

### Canonical Tags — Absent
No canonical URL declarations on any page. Risk: duplicate content penalties if WordPress generates multiple URL variants (e.g., `?p=123` versions).

### Blog — 8 Years Dead
- 2 posts total
- Most recent: March 25, 2018 — "A Night Out with Michigan Med Spa Event April 30th!" (that event was 8 years ago)
- Zero posts in 2019, 2020, 2021, 2022, 2023, 2024, 2025
- A dead blog signals to Google that this domain is not an active, authoritative resource
- Competitors actively blogging about med spa treatments outrank for every long-tail keyword

### Keyword Targeting — None
No evidence of deliberate keyword optimization. No service pages target:
- "laser hair removal West Bloomfield MI"
- "Botox West Bloomfield"
- "HydraFacial West Bloomfield"
- "med spa near me West Bloomfield"
- etc.

Headers and body copy use generic language with no geo-modifiers.

---

## 5. DESIGN & TYPOGRAPHY (Circa 2018)

### Avada Health Demo Aesthetic
The site uses the Avada Health demo's default color palette and typography without customization:
- Default Avada blue/grey color scheme — no brand differentiation
- Generic sans-serif font stack
- Outdated card/grid layout patterns from 2017-2018 Avada
- Heavy drop shadows and dated visual effects
- No dark mode or modern luxury spa aesthetic
- Zero whitespace discipline — sections are cramped and visually noisy

### Comparison to 2026 Med Spa Standard
Competitors like VIO Med Spa (viomedspa.com) and Emmanuel Skinscience (eskinscience.com) use:
- Minimal, luxury-forward design
- Custom brand colors and typography
- High-quality photography
- Clear visual hierarchy
- Smooth scroll animations
- Mobile-optimized layouts

Michigan Med Spa looks approximately 7-8 years behind the current design standard.

---

## 6. MOBILE ISSUES

- No mobile sticky bar (click-to-call / get directions)
- No evidence of mobile-optimized layout testing
- Heavy WordPress page builder markup creates layout inconsistencies at <768px
- The SculpSure page shows a "$500 off Coupon" popup appearing multiple times — on mobile this aggressively blocks content
- No click-to-call shortcut prominently placed for mobile users
- Footer duplicates contact info instead of optimizing for mobile conversion

---

## 7. MISSING PAGES

| Page | Status | Impact |
|---|---|---|
| Pricing page | Missing | Competitors list transparent pricing; patients want to know before calling |
| Before & After gallery (standalone) | Missing (gallery exists but not as a dedicated page) | High-converting content type for med spas |
| Staff/Team bios page | Broken (demo content) | Trust signal — patients want to know their injector |
| Reviews/Testimonials page | Missing | Third-party validation critical in med spa category |
| FAQ page | Missing (Avada FAQ post type exists, no published content) | Schema opportunity lost |
| Booking/Scheduling page | Missing | No online booking; competitors all have it |
| Acupuncture dedicated page | Missing (listed in nav but no page) | Service page needed for SEO |
| Exomind dedicated page | Missing (listed in nav but no page) | Service page needed for SEO |

---

## 8. TECHNICAL ISSUES

### Copyright Footer — Broken
Footer displays: **"© Copyright - | Michigan Med Spa"**
- Year field is empty/broken — the dynamic year variable is not rendering
- Published date of privacy policy: April 28, 2018 — suggests site was set up once and never maintained

### Professional Email — Missing
Contact email: **michiganmedspa@gmail.com**
- A @gmail.com address signals zero professionalism
- Competitors and referral sources expect a domain email
- Spam filters flag gmail-originating contact form replies

### Hours — Not Displayed on Contact Page
- Hours not shown on contact page
- Hours not in site footer
- Known hours (Mon-Thu 8AM-5PM, Fri-Sun Closed) are completely absent from the website

### Google Maps — Not Embedded
- Contact page has no embedded map
- Patients cannot visually locate the office from the website itself

### HTTPS / SSL
Site loads over HTTPS — this is correct.

### Page Speed
WordPress + Avada page builder + unoptimized images = predictably poor Core Web Vitals. The Avada theme is known for heavy JS/CSS bundles. Without a full Lighthouse audit (blocked by JS rendering), estimated score: **35-55 Performance** based on comparable Avada Health demo installations.

---

## 9. GOOGLE BUSINESS PROFILE GAPS

**Dr. Marvin N. Bleiberg MD — Public Rating: 2.7 stars / 18 reviews (Birdeye)**
- Reviews cite: long wait times, rude front desk staff, "assembly line medicine" feeling
- This is the public reputation anchor for the business
- No review response strategy evident
- No GBP review request workflow on the website

**GBP Issues Likely Present (based on site state):**
- Website link on GBP probably points to the broken homepage ("Home New")
- Hours may be incorrect or missing from GBP
- No booking link connected to GBP
- No photos submitted to GBP in recent years (Instagram last post cadence unknown)

---

## 10. BRAND INTEGRITY ISSUES

| Issue | Severity |
|---|---|
| "Avada Health" heading on About page | Critical |
| "Jon Snow", "Tony Stark", "Anna Smith" as active staff | Critical |
| Gmail contact email | High |
| Facebook link goes to spine clinic | High |
| Page title "Home New" indexed by Google | High |
| Zero metrics (0 Patients, 0 Doctors) displayed publicly | High |
| $500 coupon popup appearing 3x on SculpSure page | Medium |
| Typo: "Skin Sure Body Scultping" (should be Sculpting) | Medium |
| Privacy policy from 2018 with blank copyright year | Medium |
| teammms.jpg misspelled and 404 | Medium |

---

## SEVERITY SUMMARY

| Category | Issues Found | Severity |
|---|---|---|
| Placeholder / Lorem Ipsum Content | 12 instances | CRITICAL |
| Broken Images | 3 confirmed | HIGH |
| Broken CTAs / Routing | 3 confirmed | HIGH |
| SEO — No Meta Descriptions | 10+ pages | CRITICAL |
| SEO — No Schema Markup | Site-wide | HIGH |
| SEO — Dead Blog (8 years) | Site-wide | HIGH |
| Design — Dated Template (2018) | Site-wide | HIGH |
| Missing Pages | 8 pages | MEDIUM-HIGH |
| Mobile UX | Multiple issues | HIGH |
| Brand Integrity | 10 issues | CRITICAL |
| Reputation (2.7 stars) | Public signal | HIGH |

**Bottom line: This is an incomplete, abandoned WordPress template build with significant brand damage in plain sight. Any competitor with a professional modern website immediately wins the comparison on first impression.**
