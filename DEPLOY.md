# Caliber Web Studio — Deployment Guide

This guide walks you through setting up and deploying the Caliber Web Studio website to Vercel with your custom domain.

---

## Prerequisites

Before you begin, make sure you have:

- **Node.js 18+** installed on your computer (download from [nodejs.org](https://nodejs.org))
- **npm** (comes with Node.js)
- **Git** installed on your computer (download from [git-scm.com](https://git-scm.com))
- A **GitHub account** (sign up at [github.com](https://github.com))
- A **Vercel account** (sign up at [vercel.com](https://vercel.com) — you can use your GitHub login)
- A **Namecheap domain** or a domain you already own (caliberwebstudio.com)
- API keys from **Resend** and **OpenAI** (instructions below)

---

## Part 1: Local Setup

### Step 1: Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/your-username/caliberwebstudio.git
cd caliberwebstudio
```

(Replace `your-username` with your actual GitHub username.)

### Step 2: Install Dependencies

```bash
npm install
```

This downloads all the libraries the project needs. It might take 2-5 minutes depending on your internet speed.

### Step 3: Set Up Environment Variables

```bash
cp .env.local.example .env.local
```

This creates a `.env.local` file that you'll fill with your API keys.

### Step 4: Get Your API Keys

Before running the site locally, you need two API keys. Follow the instructions below.

---

## Part 2: Get API Keys

### Resend API Key (Email Service)

1. Go to [resend.com](https://resend.com)
2. Click **Sign up** and create an account
3. Go to **API Keys** in the left sidebar
4. Copy your API key (starts with `re_`)
5. Paste it into `.env.local`:

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Add a verified sender domain:**

6. Still in Resend, go to **Domains**
7. Click **Add Domain**
8. Enter `darrin@caliberwebstudio.com` (or any email you want to send from)
9. Resend will give you DNS records to add (you'll do this after domain setup)

### OpenAI API Key (AI Features)

1. Go to [platform.openai.com](https://platform.openai.com)
2. Click **Sign up** or **Log in**
3. Go to **API keys** in the left sidebar (under your account settings)
4. Click **Create new secret key**
5. Copy the key (starts with `sk_`)
6. Paste it into `.env.local`:

```
OPENAI_API_KEY=sk_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

> **⚠️ Warning:** Never share your API keys. Never commit them to GitHub. The `.env.local` file is already in `.gitignore`, so it won't be uploaded.

### Site URL

In `.env.local`, make sure the site URL is set:

```
NEXT_PUBLIC_SITE_URL=https://caliberwebstudio.com
```

---

## Part 3: Test Locally

```bash
npm run dev
```

Your site will start at `http://localhost:3000`. Open this URL in your browser to test it.

**What to check:**
- Homepage loads
- All links work
- Contact form appears
- Chatbot appears
- Light/dark theme toggle works

Press `Ctrl+C` (or `Cmd+C` on Mac) to stop the server when done.

---

## Part 4: Deploy to Vercel

### Step 1: Push to GitHub

Make sure your code is in a GitHub repository. If not:

1. Go to [github.com/new](https://github.com/new) and create a new repository called `caliberwebstudio`
2. In your terminal:

```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/caliberwebstudio.git
git push -u origin main
```

### Step 2: Import Project to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **Add New** → **Project**
3. Click **Import Git Repository**
4. Find and select `caliberwebstudio`
5. Click **Import**

### Step 3: Add Environment Variables

On the Vercel project page:

1. Go to **Settings** → **Environment Variables**
2. Add these three variables:

| Variable | Value |
|----------|-------|
| `RESEND_API_KEY` | Your Resend API key (`re_...`) |
| `OPENAI_API_KEY` | Your OpenAI API key (`sk_...`) |
| `NEXT_PUBLIC_SITE_URL` | `https://caliberwebstudio.com` |

3. Click **Save**

### Step 4: Deploy

1. Click the **Deploy** button (or re-deploy if it already deployed)
2. Wait for the build to complete (usually 2-3 minutes)
3. Once it says "Deployment Successful," click the preview URL to test

Your site is now live at a Vercel URL like `caliberwebstudio.vercel.app`.

---

## Part 5: Connect Your Custom Domain

### Option A: Use Vercel's Nameservers (Recommended for Most People)

#### In Vercel:

1. Go to **Settings** → **Domains**
2. Click **Add Domain**
3. Type `caliberwebstudio.com`
4. Click **Add**
5. Vercel will show you **Nameservers**. Copy them:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
   - `ns3.vercel-dns.com`
   - `ns4.vercel-dns.com`

#### In Namecheap:

1. Log in to [namecheap.com](https://namecheap.com)
2. Go to **Domain List**
3. Find `caliberwebstudio.com` and click **Manage**
4. Go to **Nameservers**
5. Select **Custom DNS** from the dropdown
6. Enter the Vercel nameservers (the 4 from above)
7. Click **Save**

#### Wait for Propagation

Domain propagation usually takes **10-30 minutes**, but can take up to **48 hours**. Your site should work at `caliberwebstudio.com` when complete.

---

### Option B: Use Namecheap's Advanced DNS (If You Need Other DNS Records)

#### In Vercel:

1. Go to **Settings** → **Domains**
2. Click **Add Domain** → `caliberwebstudio.com`
3. Vercel will show options. Look for the **A Record** and **CNAME** record:
   - A record: points to Vercel's IP (e.g., `76.76.19.61`)
   - CNAME for `www`: points to `cname.vercel-dns.com`

#### In Namecheap:

1. Log in to [namecheap.com](https://namecheap.com)
2. Go to **Domain List** → **Manage** → **Advanced DNS**
3. Add/Edit these records:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A Record | `@` | (Vercel's IP address) | 30 min |
| CNAME Record | `www` | `cname.vercel-dns.com` | 30 min |

4. Click **Save**

#### Wait for Propagation

Same as above: **10-30 minutes** typically, but can take up to **48 hours**.

---

## Part 6: Verify the Domain Setup

Once your domain is pointing to Vercel:

1. In Vercel, go to **Settings** → **Domains**
2. Find `caliberwebstudio.com`
3. You should see a green checkmark and "Valid Configuration"
4. Try visiting `https://caliberwebstudio.com` in your browser

If you see a Vercel error page, the domain isn't connected yet. Wait 10-20 more minutes and refresh.

---

## Part 7: Set Up Resend Email Domain (Optional but Recommended)

To send emails from `darrin@caliberwebstudio.com` instead of a Resend subdomain:

1. Go to [resend.com](https://resend.com) → **Domains**
2. Click **Add Domain**
3. Enter `caliberwebstudio.com`
4. Resend will give you DNS records to add
5. In Namecheap's Advanced DNS, add the DKIM, DMARC, and Return-Path records Resend shows
6. Return to Resend and click **Verify** once DNS propagates

This ensures emails from your domain don't go to spam.

---

## Part 8: After Deployment Checklist

Once everything is live, test these:

- [ ] **Homepage loads** at `https://caliberwebstudio.com`
- [ ] **Blog page loads** at `/blog`
- [ ] **Blog posts load** (click on one)
- [ ] **Contact form works** (try submitting)
- [ ] **Chatbot appears** and responds (if you added one)
- [ ] **Light/dark theme toggle** works
- [ ] **Mobile design** looks good (test on your phone)
- [ ] **All links work** (no 404 errors)
- [ ] **API keys are working** (if you see errors in the browser console, check your keys in Vercel)

---

## Troubleshooting

### "Domain not connecting to Vercel"
- DNS changes take time. Wait 15-30 minutes and refresh.
- Check that you added the correct nameservers or A/CNAME records.
- Use a DNS checker like [dnschecker.org](https://dnschecker.org) to verify propagation.

### "API key not working / 401 errors"
- Check that your API keys are correct in Vercel's Environment Variables.
- Re-deploy after adding/changing environment variables.
- In local testing, make sure your `.env.local` file has the correct keys.

### "Contact form not sending emails"
- Verify your Resend API key is correct.
- In Resend, make sure `darrin@caliberwebstudio.com` is a verified sender domain.
- Check the Vercel deployment logs for error messages.

### "Chatbot not responding"
- Verify your OpenAI API key is correct in Vercel.
- Check that your OpenAI account has available credits.
- Re-deploy after changing environment variables.

### "Site shows old version after deploying"
- Clear your browser cache (Ctrl+Shift+Delete on Windows, Cmd+Shift+Delete on Mac)
- Wait a few minutes for Vercel's CDN to update.
- Force a re-deploy in Vercel.

---

## Next Steps

Once your site is live:

1. **Add more blog posts** to `/src/app/blog/[slug]/page.tsx`
2. **Update copy** on the homepage to match your business
3. **Add your logo** and company colors
4. **Set up Google Business Profile** and analytics
5. **Share with customers** and gather feedback

---

## Need Help?

- **Vercel docs:** [vercel.com/docs](https://vercel.com/docs)
- **Next.js docs:** [nextjs.org/docs](https://nextjs.org/docs)
- **Resend docs:** [resend.com/docs](https://resend.com/docs)
- **OpenAI docs:** [platform.openai.com/docs](https://platform.openai.com/docs)

---

**You're all set! Your website is now live and connected to your custom domain.**
