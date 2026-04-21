# Day 2 Med Spa Deploy Report — 2026-04-20

## Deployment IDs + Timestamps

| Deployment | URL | Status | Timestamp |
|---|---|---|---|
| Integration commit `696e6a0` | https://caliberwebstudio-brplrjq7k-darrin-singers-projects.vercel.app | Ready (1m build) | ~22:54 EDT 2026-04-20 |
| Audit commit `b3bc418` | https://caliberwebstudio-kdx53eeai-darrin-singers-projects.vercel.app | Ready (1m build) | ~23:03 EDT 2026-04-20 |

**Production URL:** https://caliberwebstudio.com

## Final Live URLs

- https://caliberwebstudio.com/blog/detroit-med-spa-website-michigan-regulations
- https://caliberwebstudio.com/blog/detroit-med-spa-local-seo-google-ranking

Both URLs verified live via curl — correct page titles and content confirmed in response.

## Commit SHAs

| Commit | Description |
|---|---|
| `6a497ac` | Writer 1 (upbeat-satoshi-68e1af) — Michigan regulations pending post |
| `e3690af` | Writer 2 (inspiring-shaw-fa0b58) — Local SEO pending post |
| `f592db6` | Merge: inspiring-shaw-fa0b58 into main |
| `6a497ac` | Merge: upbeat-satoshi-68e1af into main (fast-forward) |
| `696e6a0` | Integration: posts.ts + images (deploy commit) |
| `b3bc418` | Audit fixes: title length + Day 1 cross-links |

## Images Deployed (10 files)

All 10 expected images renamed from `.jpg.png` → `.jpg` and committed:

### Michigan Regulations (5 images)
- `detroit-med-spa-website-michigan-regulations-hero.jpg`
- `detroit-med-spa-michigan-regulations-medical-director.jpg`
- `detroit-med-spa-website-compliance-checklist.jpg`
- `detroit-med-spa-ftc-advertising-rules-website.jpg`
- `detroit-med-spa-before-after-photo-consent-form.jpg`

### Local SEO (5 images)
- `detroit-med-spa-local-seo-google-ranking-hero.jpg`
- `detroit-med-spa-google-3-pack-results.jpg`
- `detroit-med-spa-gbp-profile-optimization.jpg`
- `detroit-med-spa-local-citations-checklist.jpg`
- `detroit-med-spa-google-review-response.jpg` *(in public/blog/ but not referenced in post content — writer's image list had 4 images, brief expected 5; deployed regardless)*

### Day 1 Duplicate Cleanup
4 duplicate `.jpg.png` files for Day 1 booking-mistakes images deleted (`.jpg` versions already committed).

## Audit Results (6-Point)

| # | Audit Check | Result |
|---|---|---|
| 1 | Cross-links: Day 2 posts link to each other | PASS |
| 1 | Cross-links: Day 2 posts link to both Day 1 URLs | PASS |
| 2 | Day 1 posts updated with links to Day 2 posts | PASS |
| 3 | No broken image refs (.png.png, .jpg.jpg, wrong paths) | PASS |
| 4 | Meta title <60 chars — michigan-regulations | PASS (58 chars — fixed from 67) |
| 4 | Meta title <60 chars — local-seo | PASS (55 chars) |
| 4 | Meta description <155 chars — michigan-regulations | PASS (149 chars) |
| 4 | Meta description <155 chars — local-seo | PASS (142 chars) |
| 5 | FAQPage JSON-LD present | PASS (both posts) |
| 5 | Article JSON-LD present | PASS (both posts) |
| 5 | Author attribution (Caliber Web Studio) | PASS (both posts) |
| 5 | CTA with phone (313) 799-2315 | PASS (both posts) |
| 5 | CTA with book-a-mockup link | PASS (both posts) |
| 6 | Image file existence — all 10 expected files | PASS |

## Build Notes

- Local build required `NODE_OPTIONS="--max-old-space-size=8192"` due to posts.ts size (~1.15MB). Pre-existing issue, not introduced by this deploy.
- Vercel build succeeded in 1 minute (Vercel environment has sufficient memory by default).
- posts.ts grew from 10,854 → 11,264 lines after integration.

## Audit Fixes Applied

1. **Title shortened**: `michigan-regulations` title reduced from 67 to 58 chars.
   - Before: "Michigan Med Spa Regulations: What Your Website Must and Cannot Say"
   - After: "Michigan Med Spa Compliance: What Your Website Must and Cannot Say"
2. **Day 1 relatedSlugs updated**: Both `detroit-med-spa-website-design` and `detroit-med-spa-booking-mistakes` now include both Day 2 slugs.
3. **Day 1 content cross-links added**:
   - `detroit-med-spa-website-design`: paragraph after compliance section links to both Day 2 posts
   - `detroit-med-spa-booking-mistakes`: paragraph after ROI section links to local-seo guide

## Leftover TODOs / Flagged Items

- `detroit-med-spa-google-review-response.jpg` is deployed to `public/blog/` but not referenced in the local-seo post content. Writer's own image list (in the pending file header) listed 4 images; the brief expected 5. No action needed unless Darrin wants to add a section on review response examples to the post.
- Local build memory requirement: consider adding `NODE_OPTIONS=--max-old-space-size=8192` to the build script in `package.json` for local dev environments. Vercel is unaffected.
- Visual concept check: `detroit-med-spa-google-review-response.jpg` and Day 1's booking-mistakes images overlap thematically (client/practitioner interaction shots). No collision detected on filename basis; Darrin should review if any images look visually identical when added to future posts.
