# Orchestration Notes — Day 2 Med Spa Batch (2026-04-20)

## The 2 Slugs

| # | Slug | Brief File |
|---|---|---|
| Cluster #2 | `detroit-med-spa-website-michigan-regulations` | `brief-detroit-med-spa-website-michigan-regulations.md` |
| Cluster #3 | `detroit-med-spa-local-seo-google-ranking` | `brief-detroit-med-spa-local-seo-google-ranking.md` |

Both posts are Med Spa cluster posts. The subject pivots to a new anchor (Roofer, per the May W1 schedule) on Day 3.

---

## Worktree Naming

Spawn one worktree per writer agent. Suggested names:

| Agent | Worktree branch name |
|---|---|
| Writer A (Cluster #2 — Regulations) | `claude/med-spa-michigan-regulations` |
| Writer B (Cluster #3 — Local SEO) | `claude/med-spa-local-seo` |

Both worktrees branch from `main`. Writers work independently — no coordination needed until the dedup/merge agent runs after both complete.

---

## posts.ts Rule — CRITICAL

**Neither writer agent should append to `src/app/blog/posts.ts`.**

Writing to posts.ts in parallel from two worktrees will cause merge conflicts. A dedicated dedup/merge agent runs after both writing agents complete and handles:
1. Deduplicating any slug collisions
2. Appending both new post entries to posts.ts in a single commit
3. Verifying relatedSlugs cross-links are present on all Day 1 + Day 2 posts

Writer agents: write the post content and images only. Do not touch posts.ts.

---

## Phase 1 Only — No Deploy

Darrin is on dispatch/phone today. Writer agents complete Phase 1 only:
- Write post HTML content (ready to drop into posts.ts `content` field)
- Generate image prompts file (`{slug}-image-prompts.txt`) for Darrin to run on phone
- Commit to worktree branch
- Do NOT merge to main, do NOT push to origin

The merge + deploy sequence runs separately after Darrin reviews.

---

## Day 1 Context (for writer agent prompts)

Both Day 2 posts MUST link back to both Day 1 posts:

| Day 1 Post | URL |
|---|---|
| Anchor | `/blog/detroit-med-spa-website-design` |
| Cluster #1 | `/blog/detroit-med-spa-booking-mistakes` |

These posts are live on caliberwebstudio.com. The cluster structure only works if the internal links are tight — Day 2 → Day 1 links are mandatory per the briefs.

---

## Agent Research Rule Reminder

Per the 6-Month Content Plan: **5 real, sourced Detroit + industry data points per post before writing begins.** If an agent cannot find 5 verifiable data points for a post, it flags the post to Darrin and stops — it does not pad, estimate, or fabricate.

Both briefs contain 5 specific research directives. Writer agents execute those directives first, document sources, then write.
