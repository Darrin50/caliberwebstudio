# Scoot for Fun — Website

Guided 1-hour mobility scooter tours of Detroit. Built with Next.js 15 + TypeScript + Tailwind CSS.

## Getting Started

```bash
cd scootforfun
npm install
cp .env.example .env.local   # fill in your keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build for Production

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Push this `scootforfun/` folder to its own GitHub repo (or connect a monorepo subdirectory).
2. Import into Vercel. Set **Root Directory** to `scootforfun/`.
3. Add all environment variables from `.env.example` in the Vercel dashboard.
4. Deploy — production auto-deploys on every push to `main`.

---

## Integration TODOs (required before going live)

### 1. Real Logo
- Drop the official logo PNG at `scootforfun/public/logo.png`
- In `components/layout/Header.tsx`, replace the `<LogoSVG />` component with:
  ```tsx
  import Image from 'next/image'
  <Image src="/logo.png" alt="Scoot for Fun" width={160} height={48} priority />
  ```

### 2. Real Photos
Replace placeholder gradient boxes with real photos. Put images in `public/images/`:

| File | Used in |
|------|---------|
| `hero-bg.jpg` | Hero section background |
| `riverwalk.jpg` | Tour section — Detroit Riverwalk card |
| `dequindre.jpg` | Tour section — Dequindre Cut card |
| `ambassador.jpg` | Tour section — Ambassador Bridge card |
| `about-team.jpg` | About section |
| `og-image.jpg` | Open Graph / social share (1200×630) |

### 3. Square Payments
1. Create a Square developer account at https://developer.squareup.com
2. Create an application and get your App ID, Location ID, and Access Token
3. Add them to `.env.local` (see `.env.example`)
4. Install the Square Node SDK: `npm add squareup`
5. Uncomment and complete the Square charge code in `app/api/booking/route.ts`
6. Test with sandbox keys first

### 4. Email Notifications
1. Sign up at https://resend.com and verify `scootforfun.com`
2. Install: `npm add resend`
3. Add `RESEND_API_KEY` to `.env.local`
4. Uncomment the email send code in `app/api/booking/route.ts` and `app/api/contact/route.ts`

### 5. Google Calendar
1. Follow the [Google Calendar API setup](https://developers.google.com/calendar/api/quickstart/nodejs)
2. Install: `npm add googleapis`
3. Add OAuth credentials to `.env.local`
4. Uncomment the calendar event creation code in `app/api/booking/route.ts`

### 6. Meet-up Location
- Replace the "[TODO: Add official meet-up address]" placeholder in:
  - `components/booking/steps/StepConfirmation.tsx`
  - `lib/constants.ts` (add a `meetupAddress` field)
  - Your confirmation email template

### 7. Safety Waiver Legal Review
- The waiver text in `components/booking/steps/StepWaiver.tsx` is a **placeholder draft**.
- Have it reviewed and finalized by legal counsel before accepting real bookings.

### 8. Cancellation Policy
- Several FAQ items and the booking flow have `[Placeholder — cancellation policy]` notes.
- Decide on your policy and update `lib/constants.ts` → `business.faq`.

### 9. AI Texting Hook
- A comment hook is left in `app/api/booking/route.ts` for AI texting integration.
- When your texting service is ready, uncomment and configure `AI_TEXTING_WEBHOOK_URL`.

### 10. Persistent Availability Storage
- The current availability system is **in-memory** — it resets on server restart.
- Before launch, replace with a real database (Supabase, PlanetScale, etc.)
- See comments in `app/api/availability/route.ts` and `app/api/booking/route.ts`.

---

## Confirmed Facts vs. Placeholders

| Item | Status | Notes |
|------|--------|-------|
| Business name: Scoot for Fun | ✅ Confirmed | |
| Phone: (248) 257-8161 | ✅ Confirmed | |
| Email: bookings@scootforfun.com | ✅ Confirmed | |
| Domain: scootforfun.com | ✅ Confirmed | |
| Price: $50/person, 1-hour tour | ✅ Confirmed | |
| Schedule: Thu–Sun only | ✅ Confirmed | |
| Time windows: 9–12, 12–4, 5–9 | ✅ Confirmed | |
| Max 4 guests per slot | ✅ Confirmed | |
| Group discount: 10% | ✅ Confirmed | |
| Swag: hat, water bottle, tote, keychain | ✅ Confirmed | |
| Age 12+ to operate | ✅ Confirmed | |
| Weight limit: 260 lbs | ✅ Confirmed | |
| Routes: Riverwalk, Dequindre Cut, Ambassador Bridge | ✅ Confirmed | |
| Payment processor: Square | ✅ Confirmed | |
| Owner uses Google Calendar | ✅ Confirmed | |
| Meet-up location address | ❌ **TODO** | Owner to provide |
| Cancellation/refund policy | ❌ **TODO** | Owner to confirm |
| Rain/weather policy | ❌ **TODO** | Owner to confirm |
| Waiver legal text | ❌ **TODO** | Legal review required |
| Real photos (hero, routes, about) | ❌ **TODO** | Owner to supply |
| Official logo PNG | ❌ **TODO** | Owner to supply |
| OG image (social share) | ❌ **TODO** | Design & supply |
| Square API keys | ❌ **TODO** | Owner to set up |
| Email service (Resend) | ❌ **TODO** | Owner to set up |
| Google Calendar credentials | ❌ **TODO** | Owner to set up |

---

## Project Structure

```
scootforfun/
├── app/
│   ├── layout.tsx          Root layout, metadata, fonts, JSON-LD
│   ├── page.tsx            Homepage
│   ├── not-found.tsx       Custom 404
│   ├── globals.css         Tailwind + CSS variables
│   ├── book/
│   │   └── page.tsx        Booking page
│   └── api/
│       ├── availability/   GET availability by date
│       ├── booking/        POST create booking
│       └── contact/        POST contact form
├── components/
│   ├── layout/
│   │   ├── Header.tsx      Fixed nav with SVG logo placeholder
│   │   ├── Footer.tsx      Footer with links + socials
│   │   └── MobileBar.tsx   Mobile sticky Call + Book bar
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── TourSection.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Pricing.tsx
│   │   ├── Requirements.tsx
│   │   ├── About.tsx
│   │   ├── FAQ.tsx
│   │   └── ContactSection.tsx
│   └── booking/
│       ├── BookingWidget.tsx    Multi-step booking shell
│       └── steps/
│           ├── StepDate.tsx         Step 1: Calendar date picker
│           ├── StepTime.tsx         Step 2: Time window + slot
│           ├── StepParty.tsx        Step 3: Party size + rider details
│           ├── StepWaiver.tsx       Step 4: Safety waiver
│           ├── StepPayment.tsx      Step 5: Square payment
│           └── StepConfirmation.tsx Step 6: Success + summary
├── lib/
│   ├── constants.ts        All business data — single source of truth
│   ├── types.ts            TypeScript interfaces (BookingState, etc.)
│   ├── schema.ts           JSON-LD schema generators
│   └── utils.ts            Helpers (pricing, date utils, etc.)
└── public/
    ├── robots.txt
    └── images/             TODO: Add real photos here
```
