# Caliber Web Studio — AI Build Standards
# =========================================
# This file is read by Claude Code, Cursor, and other AI coding agents
# before any code is written. Follow every instruction precisely.
# Owner: Darrin Singer | darrin@caliberwebstudio.com
# Agency: Caliber Web Studio | caliberwebstudio.com
# Legal Entity: High Caliber Operations LLC
# Location: Detroit, Michigan


## PROJECT IDENTITY

Every site built by Caliber Web Studio is a client website for a local business.
The client's business information is stored in /lib/constants.ts.
All copy, metadata, schema, and UI must pull from this single config file.
Never hardcode business info anywhere else.


## TECH STACK (mandatory — no exceptions)

- Framework: Next.js 15+ (App Router, NOT Pages Router)
- Language: TypeScript (strict mode)
- Styling: Tailwind CSS 4+
- Deployment: Vercel
- Font loading: next/font (Google Fonts only, no external CDN)
- Image handling: next/image (all images must use this)
- Package manager: pnpm
- Linting: ESLint with Next.js config
- Node version: 20+


## FOLDER STRUCTURE (follow exactly)

/app
  layout.tsx          — Root layout with metadata, fonts, analytics
  page.tsx            — Homepage
  /about
    page.tsx          — About page
  /services
    page.tsx          — Services page
  /contact
    page.tsx          — Contact page
  /gallery
    page.tsx          — Gallery/portfolio page (if applicable)
  /blog
    page.tsx          — Blog listing (Growth/Domination plans)
    /[slug]
      page.tsx        — Individual blog post
  globals.css         — Tailwind directives + custom CSS variables
  not-found.tsx       — Custom 404 page

/components
  /ui
    Button.tsx        — Primary and secondary button variants
    Card.tsx          — Service card, review card, etc.
    Badge.tsx         — Small label/tag component
    Input.tsx         — Form input with label and error state
    Textarea.tsx      — Form textarea
  /sections
    Hero.tsx          — Above-the-fold hero section
    Services.tsx      — Services grid
    About.tsx         — About/story section
    Reviews.tsx       — Testimonials/reviews carousel or grid
    Gallery.tsx       — Photo gallery grid
    FAQ.tsx           — Accordion FAQ section
    CTA.tsx           — Call-to-action banner section
    Contact.tsx       — Contact form + business info
    Map.tsx           — Google Maps embed
  /layout
    Header.tsx        — Navigation header
    Footer.tsx        — Site footer
    MobileBar.tsx     — Sticky mobile bottom bar (call + directions)
  /chatbot
    ChatWidget.tsx    — Caliber AI chatbot embed

/lib
  constants.ts        — ALL client business data lives here
  metadata.ts         — SEO metadata generator functions
  schema.ts           — JSON-LD schema markup generators
  utils.ts            — Utility functions

/public
  /images             — Client photos (optimized before adding)
  favicon.ico
  robots.txt
  sitemap.xml         — Auto-generated or static


## CLIENT DATA CONFIG (/lib/constants.ts)

This is the single source of truth for all client business information.
Every component pulls from this file. Never scatter business data.

The constants.ts file must follow this exact shape:

```ts
export const business = {
  name: "Business Name",
  tagline: "Short tagline or slogan",
  description: "2-3 sentence business description",
  phone: "(313) 555-1234",
  email: "info@business.com",
  website: "https://www.business.com",
  address: {
    street: "123 Main St",
    city: "Detroit",
    state: "MI",
    zip: "48201",
    full: "123 Main St, Detroit, MI 48201",
  },
  hours: {
    monday: "9:00 AM - 7:00 PM",
    tuesday: "9:00 AM - 7:00 PM",
    wednesday: "9:00 AM - 7:00 PM",
    thursday: "9:00 AM - 7:00 PM",
    friday: "9:00 AM - 7:00 PM",
    saturday: "10:00 AM - 5:00 PM",
    sunday: "Closed",
  },
  services: [
    {
      name: "Service Name",
      description: "What this service includes and why it matters",
      price: "$XX",
      icon: "Scissors",
    },
  ],
  colors: {
    primary: "#1E3D8F",
    secondary: "#A8B8C8",
    dark: "#141414",
    light: "#FFFFFF",
    accent: "#C8A97E",
  },
  socials: {
    facebook: "",
    instagram: "",
    google: "",
    yelp: "",
    tiktok: "",
  },
  googleMapsEmbed: "<Google Maps embed URL>",
  googlePlaceId: "",
  industry: "barbershop",
  serviceArea: ["Detroit", "Dearborn", "Southfield", "Oak Park"],
  reviews: [
    {
      name: "Customer Name",
      rating: 5,
      text: "Review text...",
      date: "2026-01-15",
    },
  ],
  faq: [
    {
      question: "Question text?",
      answer: "Answer text.",
    },
  ],
};
```


## DESIGN STANDARDS

### Layout & Spacing
- Mobile-first design (start with mobile, scale up)
- Max content width: max-w-7xl (1280px) centered with mx-auto
- Section padding: py-16 md:py-24 px-4 md:px-6
- Never use arbitrary pixel values — use Tailwind spacing scale

### Typography
- Headings: font-bold, text-4xl md:text-5xl lg:text-6xl for hero
- Body: text-base md:text-lg, text-gray-300 on dark backgrounds
- Font family: Inter or system font via next/font/google

### Dark Theme Rules
- Background: #141414 or darker
- Card backgrounds: bg-neutral-900 or bg-white/5
- Borders: border-white/10 or border-neutral-800
- Never use pure white backgrounds for main sections

### Responsive Breakpoints
- Mobile: default (< 768px)
- Tablet: md: (768px+)
- Desktop: lg: (1024px+)
- Large desktop: xl: (1280px+)
- Always test at 375px minimum width


## COMPONENT STANDARDS

### Hero Section (every site must have)
- Full viewport height on mobile (min-h-screen or min-h-[80vh])
- Business name + tagline + subheadline
- Primary CTA button + click-to-call on mobile
- Background: gradient, subtle pattern, or dark solid

### Services Section
- Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Each card: icon + name + short description + optional price
- Subtle borders and hover effects

### Reviews Section
- 3-6 reviews in grid or carousel
- Star rating in primary color
- Pull from business.reviews in constants.ts

### Contact Section
- Form: name, email, phone, message
- Submits via /app/api/contact/route.ts
- Show phone (click-to-call), email, address, hours, Google Maps

### Footer
- Business name, nav links, contact info, hours, social icons
- Copyright: © {year} {business.name}. All rights reserved.
- "Built by Caliber Web Studio" link to caliberwebstudio.com

### Mobile Sticky Bar
- Fixed bottom, mobile only (md:hidden)
- Two buttons: Click to Call + Get Directions

### Chatbot Widget
- Floating widget bottom-right, lazy-loaded after page load
- Config from constants.ts


## SEO REQUIREMENTS (every page, no exceptions)

### Metadata
- Title: "{Page} | {business.name} | {city}, {state}"
- Meta description: 150-160 chars, include city + service
- Open Graph: og:title, og:description, og:image, og:url, og:type
- Canonical URL on every page

### Schema Markup (JSON-LD)
- LocalBusiness schema on every page
- Include: name, address, phone, hours, geo, priceRange, image, url
- Service schema on services page
- FAQ schema where applicable
- Use /lib/schema.ts to generate from constants.ts

### Technical SEO
- sitemap.xml + robots.txt
- All images: descriptive alt text
- One H1 per page, proper H2/H3 nesting
- Target: 90+ Lighthouse performance score


## PERFORMANCE RULES

- next/image for all images (priority={true} for hero only)
- next/font for all fonts — no external CDN
- Server Components by default — "use client" only for interactivity
- Target: LCP < 2.5s, FID < 100ms, CLS < 0.1


## API ROUTES

### /app/api/contact/route.ts
- Validate: name, email (required), phone (required), message (optional)
- Send notification via Resend or nodemailer
- Return: { success: true/false, message: string }
- Add rate limiting


## BLOG POST SCHEMA (src/app/blog/posts.ts)

Every blog post object MUST include both image fields — they MUST be different files:

```ts
{
  slug: "post-slug",
  thumbnail: "/blog/post-slug-thumb.jpg",   // Used on listing cards + OG image
  hero: "/blog/post-slug-hero.jpg",          // Used as large hero on post page
  title: "...",
  ...
}
```

- `thumbnail` — the card image shown on /blog listing page and Open Graph previews. Typically a landscape crop or tighter composition.
- `hero` — the full-width image rendered at the top of the individual post page. Typically a wider, more editorial shot.
- **Never use the same filename for both fields.** Generate two distinct images per post — one for each slot.
- Both paths must start with `/blog/` and the files must exist in `/public/blog/`.
- If only one image is available at time of writing, use it for `thumbnail` and leave `hero` unset — the page will fall back to the first `<img>` in the post body. Come back and add `hero` once the second image is ready.


## THINGS TO NEVER DO

- Never use Pages Router — App Router only
- Never use inline styles — Tailwind classes only
- Never hardcode business info outside of constants.ts
- Never use external font CDNs — next/font only
- Never skip alt text on images
- Never use generic placeholder copy
- Never use client components for static content
- Never deploy without a Lighthouse audit
- Never leave TODO comments in production code
- Never use !important in CSS
- Never set `hero` and `thumbnail` to the same image file on a blog post


## DEPLOYMENT

- Platform: Vercel
- Production: main branch auto-deploys
- Environment variables: Vercel dashboard only, never in code
- SSL: automatic via Vercel (HTTPS enforced)


## BUILD WORKFLOW

1. `pnpm create next-app@latest [client-slug] --typescript --tailwind --app --src-dir=false --import-alias="@/*"`
2. Copy CLAUDE.md into project root
3. Populate /lib/constants.ts with client data from onboarding form
4. Generate all copy with Claude (headlines, descriptions, FAQ, meta)
5. Build all pages and components following standards above
6. Configure chatbot widget with client data
7. Add schema markup via /lib/schema.ts
8. Run Lighthouse audit — fix anything below 90
9. Deploy to Vercel preview URL
10. Send preview link to client with Loom walkthrough


## QUALITY CHECKLIST (run before every deployment)

- [ ] All pages render correctly on mobile (375px), tablet (768px), desktop (1280px)
- [ ] Click-to-call works on mobile
- [ ] Contact form submits and sends notification
- [ ] Chatbot widget loads and captures leads
- [ ] All images have alt text
- [ ] Schema markup validates (Google Rich Results Test)
- [ ] Meta titles and descriptions unique per page
- [ ] Lighthouse performance 90+
- [ ] No console errors
- [ ] "Built by Caliber Web Studio" footer link present
- [ ] Mobile sticky bar works
- [ ] Google Maps embed loads
- [ ] Social links open in new tab
- [ ] 404 page works
- [ ] robots.txt and sitemap.xml accessible
