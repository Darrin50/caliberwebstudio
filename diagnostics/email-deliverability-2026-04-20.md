# Email Deliverability Diagnostic — caliberwebstudio.com
**Date:** 2026-04-20  
**Symptom:** Emails sent from darrin@caliberwebstudio.com arrive in Gmail spam folder instead of inbox.  
**Status confirmed:** Send is working. Pure deliverability/authentication failure at the recipient.

---

## Raw DNS Records (as of 2026-04-20)

### Nameservers
```
caliberwebstudio.com  NS  john.ns.cloudflare.com
caliberwebstudio.com  NS  venus.ns.cloudflare.com
```
**DNS is managed in Cloudflare.** All DNS changes go in `dash.cloudflare.com` → DNS.

### A Records (website)
```
caliberwebstudio.com  A  104.21.39.233
caliberwebstudio.com  A  172.67.171.212
caliberwebstudio.com  AAAA  2606:4700:3030::6815:27e9
caliberwebstudio.com  AAAA  2606:4700:3034::ac43:abd4
```
*Cloudflare proxy IPs — website hosted on Vercel, fronted by Cloudflare.*

### MX Records (inbound mail)
```
caliberwebstudio.com  MX  1  smtp.google.com
```
**⚠️ Non-standard.** Proper Google Workspace MX is `aspmx.l.google.com`. This works for receiving but is a misconfiguration. See fix below.

### TXT Records (SPF, DKIM, DMARC)
```
caliberwebstudio.com  TXT  "google-site-verification=4J_-sP-s8B7diYMUmdKBQDVeGkjfFpHIom2JV4AzYMU"
caliberwebstudio.com  TXT  "google-site-verification=eBAp4ktVOidpDgApabLplmwLuZ-HEW1keuZRnE8NN34"

_dmarc.caliberwebstudio.com  TXT  "v=DMARC1; p=none;"

resend._domainkey.caliberwebstudio.com  TXT  "p=MIGfMA0GCSqGSIb3DQEBA..."  ✅ PRESENT
google._domainkey.caliberwebstudio.com  → NXDOMAIN  ❌ MISSING
default._domainkey.caliberwebstudio.com → NXDOMAIN  ❌ MISSING
```

**SPF record: NONE** — Not a single `v=spf1` record exists for caliberwebstudio.com.

---

## Provider Identification

| Role | Provider | Evidence |
|------|----------|----------|
| **Inbound email** | Google Workspace | MX → smtp.google.com; 2× google-site-verification TXT records |
| **Personal outbound** (darrin@) | Google Workspace | Same — Google Workspace is the mailbox |
| **Transactional outbound** (contact form) | Resend | `resend._domainkey` DKIM record present and valid |
| **DNS management** | Cloudflare | NS → john/venus.ns.cloudflare.com |
| **Website hosting** | Vercel (proxied through Cloudflare) | A records = Cloudflare IPs |

---

## Issues Found — Ranked by Severity

### 🔴 CRITICAL — Missing SPF Record
**Impact: Gmail spam / silent reject at strict receivers**

There is **no SPF TXT record** for caliberwebstudio.com. When Google Workspace sends mail from darrin@caliberwebstudio.com, the recipient's mail server asks: "Is this Google IP authorized to send on behalf of caliberwebstudio.com?" — and gets back `NONE`. 

Gmail's interpretation of SPF=NONE + DKIM=FAIL: treat as potential spoofed mail → spam folder.

Since **February 2024, Google requires** all senders to Gmail to pass SPF *or* DKIM authentication. Without either, even low-volume senders get spam-folded.

**Fix:** Add this TXT record at the root in Cloudflare:

```
Type:  TXT
Name:  @
Value: v=spf1 include:_spf.google.com ~all
TTL:   Auto
```

> `~all` (softfail) is correct here. `+all` is dangerous; `-all` (hard fail) requires DKIM to be working first or you'll break edge cases.

---

### 🔴 CRITICAL — Google Workspace DKIM Not Enabled
**Impact: Every email you send fails DKIM → DMARC misalignment → Gmail spam**

The `google._domainkey.caliberwebstudio.com` TXT record does not exist. Google Workspace has a DKIM feature that must be **manually enabled** per domain inside Google Admin Console — it doesn't turn on automatically.

Without DKIM:
- Your emails are not cryptographically signed by your domain
- DMARC cannot achieve alignment (SPF alone won't align if the return-path is a Google subdomain)
- Gmail's spam score tanks

**Fix — Darrin must do this in Google Admin (can't be done via DNS alone):**

1. Go to [admin.google.com](https://admin.google.com)
2. Apps → Google Workspace → Gmail → **Authenticate email**
3. Select domain: `caliberwebstudio.com`
4. Click **Generate new record** → Key length: **2048-bit** (stronger)
5. Copy the TXT record shown — it will look like:
   ```
   Name:  google._domainkey.caliberwebstudio.com
   Value: v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ...
   ```
6. Add that TXT record in **Cloudflare DNS**
7. Return to Google Admin → click **Start authentication**

Allow 24-48 hours for DNS propagation, then Gmail will start seeing valid DKIM signatures.

---

### 🟠 HIGH — MX Record is Non-Standard
**Impact: Currently receiving, but fragile configuration that can break**

`smtp.google.com` is Google's outbound SMTP relay, not the proper inbound MX target for Google Workspace. The standard MX records Google requires are:

```
Type  Name  Value                    Priority
MX    @     aspmx.l.google.com       1
MX    @     alt1.aspmx.l.google.com  5
MX    @     alt2.aspmx.l.google.com  5
MX    @     alt3.aspmx.l.google.com  10
MX    @     alt4.aspmx.l.google.com  10
```

**Fix — Do this in Cloudflare DNS:**
1. Delete existing MX record: `smtp.google.com` priority 1
2. Add the five records above

> ⚠️ Do this during low-traffic hours. There will be a brief window (minutes) where the old record is gone and new ones haven't propagated — any inbound mail during that window would bounce. In practice with Cloudflare's fast propagation this is under 60 seconds.

---

### 🟡 MEDIUM — DMARC Is Bare Minimum (No Reporting)
**Impact: No visibility into spoofing attempts; not enforcing policy**

Current DMARC: `v=DMARC1; p=none;`

This does nothing — `p=none` is a monitor-only mode and without a `rua=` address, you never receive aggregate reports. You're flying blind.

**Fix — Update DMARC in phases:**

**Phase 1 (now — add reporting address):**
Update the existing `_dmarc.caliberwebstudio.com` TXT record to:
```
v=DMARC1; p=none; rua=mailto:darrin@caliberwebstudio.com; ruf=mailto:darrin@caliberwebstudio.com; fo=1;
```

**Phase 2 (after SPF + DKIM confirmed working, ~2 weeks):**
```
v=DMARC1; p=quarantine; pct=25; rua=mailto:darrin@caliberwebstudio.com;
```

**Phase 3 (after 4 weeks clean reporting):**
```
v=DMARC1; p=reject; rua=mailto:darrin@caliberwebstudio.com;
```

---

### ✅ INFO — Resend DKIM Is Correctly Configured
The contact form transactional emails (via Resend) are authenticated properly. The `resend._domainkey.caliberwebstudio.com` DKIM record is present and signs emails with `d=caliberwebstudio.com`, achieving DMARC alignment. No action needed here.

---

## Blocklist Status

The domain IPs (104.21.39.233, 172.67.171.212) are Cloudflare shared IPs — not your sending IPs. Outbound email for Google Workspace is sent from Google's own IP ranges (74.125.x.x, 209.85.x.x), which are large shared pools that are not blocklisted.

No evidence of domain-level blocklisting. The problem is authentication, not blacklisting.

**Darrin's manual check** (takes 2 minutes):
1. Visit [mxtoolbox.com/blacklists.aspx](https://mxtoolbox.com/blacklists.aspx)
2. Enter `caliberwebstudio.com`
3. If clean across all lists → confirmed auth-only problem (expected)

---

## 30-Second "Am I Fixed?" Test

After applying the DNS fixes below:

1. Go to [mail-tester.com](https://mail-tester.com) → copy the unique test address shown
2. Send a plain email from darrin@caliberwebstudio.com to that address
3. Click "Then check your score" on mail-tester.com
4. **Target: 10/10** — if SPF + DKIM are working, you'll hit this immediately
5. If 10/10: send a test to singerdarrin50.ds@gmail.com → confirm it lands in inbox, not spam

---

## Fix Summary: Who Does What

### Darrin does in Google Admin Console (admin.google.com)
These require dashboard access — cannot be done via DNS alone.

- [ ] **Enable DKIM**: Apps → Google Workspace → Gmail → Authenticate email → Generate new record (2048-bit) → copy the TXT value
- [ ] **Verify MX setup**: Apps → Google Workspace → Gmail → Setup → MX Records — confirm Google shows them as correct after the DNS update

### DNS changes in Cloudflare (dash.cloudflare.com → DNS)
These I can help Darrin apply once he has the DKIM value from Google Admin.

| Priority | Record | Type | Name | Value |
|----------|--------|------|------|-------|
| 🔴 CRITICAL | Add SPF | TXT | `@` | `v=spf1 include:_spf.google.com ~all` |
| 🔴 CRITICAL | Add Google DKIM | TXT | `google._domainkey` | *(value from Google Admin Console Step above)* |
| 🟠 HIGH | Fix MX — remove old | MX | `@` | Delete `smtp.google.com` priority 1 |
| 🟠 HIGH | Fix MX — add primary | MX | `@` | `aspmx.l.google.com` priority 1 |
| 🟠 HIGH | Fix MX — add alt1 | MX | `@` | `alt1.aspmx.l.google.com` priority 5 |
| 🟠 HIGH | Fix MX — add alt2 | MX | `@` | `alt2.aspmx.l.google.com` priority 5 |
| 🟠 HIGH | Fix MX — add alt3 | MX | `@` | `alt3.aspmx.l.google.com` priority 10 |
| 🟠 HIGH | Fix MX — add alt4 | MX | `@` | `alt4.aspmx.l.google.com` priority 10 |
| 🟡 MEDIUM | Update DMARC | TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:darrin@caliberwebstudio.com; ruf=mailto:darrin@caliberwebstudio.com; fo=1;` |

> The SPF record I can add directly in Cloudflare right now. The DKIM record requires the value from Google Admin first — Darrin gets that, sends me the value, I add it.

---

## Domain Warming Plan

After fixing auth records, your sender reputation starts at zero. Don't blast a list immediately.

| Timeframe | Max emails/day | Goal |
|-----------|---------------|------|
| Week 1–2 | 25–50 | Seed positive signals — send to people who will open/reply |
| Week 3–4 | 50–200 | Expand slowly — monitor spam rate in Google Postmaster Tools |
| Week 5–6 | 200–500 | Normal business volume |
| Week 7+ | Unlimited for your volume | Reputation established |

**Set up Google Postmaster Tools** (free, takes 5 minutes):
1. Go to [postmaster.google.com](https://postmaster.google.com)
2. Add and verify `caliberwebstudio.com`
3. After a week of sending you'll see: spam rate, IP reputation, domain reputation, DKIM/SPF/DMARC pass rates — real data, not guesswork

---

## Root Cause Summary

| Problem | Why email goes to Gmail spam |
|---------|------------------------------|
| No SPF record | Gmail can't confirm Google's IPs are authorized to send as `@caliberwebstudio.com` |
| No Google Workspace DKIM | Emails carry no cryptographic signature from your domain |
| DMARC `p=none` with no SPF/DKIM | No alignment achieved; Gmail spam heuristics kick in |
| Gmail's Feb 2024 requirements | Even low-volume senders must pass SPF or DKIM — failing both = spam folder |

The Resend integration (contact form) is fine — DKIM is configured and authenticates correctly. The broken path is specifically: **Darrin's personal email sent from Google Workspace → Gmail recipients**.
