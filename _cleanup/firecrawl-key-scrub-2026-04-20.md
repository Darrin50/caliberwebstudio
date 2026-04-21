# Firecrawl Key Scrub — 2026-04-20

**Rotated key:** `fc-1f18907d65f24b55ae689ea1f2931e90`
**Reason:** Key was rotated on 2026-04-20. New key lives in Vercel env vars as `FIRECRAWL_API_KEY`.
**Replacement label in Firecrawl dashboard:** "CWS Production"

---

## Files Touched — CWS Git Repo (committed)

| File | Change | Lines affected |
|------|--------|----------------|
| `recon/detroit-medspas-2026-04-20/fusion-med-spa/sources.md` | Redacted key from "Method" annotation | 1 line |
| `.env.local.example` | Added `FIRECRAWL_API_KEY=fc-xxxx...` placeholder | 2 lines added |
| `_cleanup/firecrawl-key-scrub-2026-04-20.md` | This report | New file |

---

## Files Touched — Outside Git (worktree filesystem only)

These files are NOT tracked in git — cleaned directly on disk.

| File | Change |
|------|--------|
| `.claude/worktrees/stoic-ptolemy-ab2bdd/.claude/settings.local.json` | Replaced all 11 occurrences of the dead key with `[ROTATED-2026-04-20-use-FIRECRAWL_API_KEY-env-var]` in curl permission entries |
| `.claude/worktrees/stoic-ptolemy-ab2bdd/recon/detroit-medspas-2026-04-20/fusion-med-spa/sources.md` | Redacted key from "Method" annotation |
| `.claude/worktrees/stupefied-robinson-545a90/recon/detroit-medspas-2026-04-20/fusion-med-spa/sources.md` | Redacted key from "Method" annotation |

---

## Empire HQ Vault Scan

**Path scanned:** `C:\Users\singe\OneDrive\Documents\Empire HQ\`
**Result:** CLEAN — no occurrences of the dead key found.

---

## Env Vars Darrin Must Set

### Vercel Dashboard (caliberwebstudio.com production)
Add these in **Vercel → Project → Settings → Environment Variables**:

| Variable | Description | Where to get it |
|----------|-------------|-----------------|
| `FIRECRAWL_API_KEY` | Firecrawl scraping key | firecrawl.dev dashboard → "CWS Production" key |

### Already confirmed in Vercel (no action needed):
- `RESEND_API_KEY` — email sending (confirmed working in recent deploy)
- `OPENAI_API_KEY` — chatbot API
- `STRIPE_SECRET_KEY` + `STRIPE_WEBHOOK_SECRET` — payments
- `PORTAL_JWT_SECRET` — client portal auth

---

## No Code Conversion Needed

Firecrawl was **not used in application code**. The key only appeared in:
1. A research documentation file (sources.md) as a method annotation
2. Claude Code session permission grants (settings.local.json) for ad-hoc curl commands

There is no TypeScript/Next.js module to convert to `process.env.FIRECRAWL_API_KEY`. If Firecrawl is ever integrated into the app (e.g., a scraping API route), use:
```ts
const apiKey = process.env.FIRECRAWL_API_KEY;
if (!apiKey) throw new Error('FIRECRAWL_API_KEY is not set');
```

---

## Other Hardcoded API Keys — Flagged (NOT modified)

**No other hardcoded API keys were found in the CWS repo.** The broad pattern scan for common key prefixes (`sk-`, `AKIA`, `AIza`, `ghp_`, `rk_live_`, `SG.`, `re_`, `AC`, `SK`) returned zero matches across all tracked files.

All known secrets (Resend, OpenAI, Stripe, Portal JWT) are correctly read via `process.env.*` in the application code.

---

## Verify the Fix Worked (60-second test)

Once Darrin has set `FIRECRAWL_API_KEY` in Vercel and `.env.local`:

```bash
# 1. Confirm env var is set
echo $FIRECRAWL_API_KEY  # should print fc-... (new key)

# 2. Test a live Firecrawl scrape with the new key
curl -s https://api.firecrawl.dev/v1/scrape \
  -H "Authorization: Bearer $FIRECRAWL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com", "formats": ["markdown"]}' \
  | python3 -c "import sys,json; d=json.load(sys.stdin); print('OK' if d.get('success') else d)"

# Expected output: OK
# If you see {"success":false,"error":"...auth..."} — wrong key or env var not set
```

---

## Git Commit

**Branch:** `claude/goofy-wu-bb4549`
**Commit message:** `security: move firecrawl key to env var + scrub hardcoded references`
**Status:** DO NOT PUSH until Darrin sets `FIRECRAWL_API_KEY` in Vercel (deploy will break without it if any route uses it — currently no routes use it, but safe practice).
