import type { OnboardingFormData } from '@/components/onboarding/schema'

// ─── Shared styles ────────────────────────────────────────────────────────────

const styles = {
  body: `margin:0;padding:0;background-color:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;`,
  wrapper: `max-width:600px;margin:0 auto;background-color:#141414;`,
  header: `background-color:#141414;padding:32px 40px 24px;border-bottom:1px solid rgba(255,255,255,0.08);`,
  logo: `font-size:20px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;margin:0;`,
  logoAccent: `color:#c8a97e;`,
  content: `padding:40px;`,
  h1: `font-size:28px;font-weight:700;color:#ffffff;margin:0 0 8px;letter-spacing:-0.5px;`,
  subhead: `font-size:16px;color:rgba(255,255,255,0.5);margin:0 0 32px;`,
  timelineWrap: `margin:32px 0;`,
  timelineStep: (active: boolean) =>
    `display:flex;align-items:flex-start;gap:16px;padding:16px;margin-bottom:8px;border-radius:8px;background-color:${active ? 'rgba(200,169,126,0.08)' : 'rgba(255,255,255,0.03)'};border:1px solid ${active ? 'rgba(200,169,126,0.25)' : 'rgba(255,255,255,0.06)'};`,
  stepNum: (active: boolean) =>
    `width:32px;height:32px;border-radius:50%;background-color:${active ? '#c8a97e' : 'rgba(255,255,255,0.08)'};color:${active ? '#141414' : 'rgba(255,255,255,0.4)'};font-size:14px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;`,
  stepTitle: (active: boolean) =>
    `font-size:15px;font-weight:600;color:${active ? '#c8a97e' : '#ffffff'};margin:0 0 2px;`,
  stepDesc: `font-size:13px;color:rgba(255,255,255,0.45);margin:0;`,
  divider: `border:none;border-top:1px solid rgba(255,255,255,0.08);margin:32px 0;`,
  contactBox: `background-color:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:20px 24px;`,
  contactLabel: `font-size:11px;font-weight:600;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:1px;margin:0 0 12px;`,
  contactRow: `font-size:14px;color:rgba(255,255,255,0.7);margin:0 0 6px;`,
  contactLink: `color:#c8a97e;text-decoration:none;`,
  footer: `padding:24px 40px;border-top:1px solid rgba(255,255,255,0.08);text-align:center;`,
  footerText: `font-size:12px;color:rgba(255,255,255,0.25);margin:0 0 4px;`,
  footerLink: `color:rgba(255,255,255,0.35);text-decoration:none;`,
}

// ─── Client confirmation email ────────────────────────────────────────────────

export function buildClientEmail(data: OnboardingFormData): string {
  const businessName = data.business.name
  const ownerName = data.contact.ownerName

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>We're building your website — here's what's next</title>
</head>
<body style="${styles.body}">
  <div style="${styles.wrapper}">

    <!-- Header -->
    <div style="${styles.header}">
      <p style="${styles.logo}">
        Caliber <span style="${styles.logoAccent}">Web Studio</span>
      </p>
    </div>

    <!-- Content -->
    <div style="${styles.content}">
      <h1 style="${styles.h1}">We're on it, ${ownerName.split(' ')[0]}.</h1>
      <p style="${styles.subhead}">
        Your information for <strong style="color:rgba(255,255,255,0.7)">${businessName}</strong> has been received.
        Here's exactly what happens next.
      </p>

      <!-- Timeline -->
      <div style="${styles.timelineWrap}">

        <!-- Step 1 — active (done) -->
        <div style="${styles.timelineStep(true)}">
          <div style="display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background-color:#c8a97e;flex-shrink:0;">
            <span style="font-size:16px;color:#141414;">✓</span>
          </div>
          <div>
            <p style="${styles.stepTitle(true)}">Information Received</p>
            <p style="${styles.stepDesc}">Your business details, services, brand choices, and story are all saved.</p>
          </div>
        </div>

        <!-- Step 2 -->
        <div style="${styles.timelineStep(false)}">
          <div style="display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background-color:rgba(255,255,255,0.08);flex-shrink:0;">
            <span style="font-size:13px;font-weight:700;color:rgba(255,255,255,0.4);">2</span>
          </div>
          <div>
            <p style="${styles.stepTitle(false)}">Site Build — 24–48 Hours</p>
            <p style="${styles.stepDesc}">Darrin builds your full website: all pages, copy, SEO, contact form, and mobile layout.</p>
          </div>
        </div>

        <!-- Step 3 -->
        <div style="${styles.timelineStep(false)}">
          <div style="display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background-color:rgba(255,255,255,0.08);flex-shrink:0;">
            <span style="font-size:13px;font-weight:700;color:rgba(255,255,255,0.4);">3</span>
          </div>
          <div>
            <p style="${styles.stepTitle(false)}">Live Preview Link</p>
            <p style="${styles.stepDesc}">You'll receive a link to review your site before anything goes live. Revisions included.</p>
          </div>
        </div>

      </div>

      <hr style="${styles.divider}" />

      <!-- Contact -->
      <div style="${styles.contactBox}">
        <p style="${styles.contactLabel}">Questions? Reach Darrin directly</p>
        <p style="${styles.contactRow}">
          <span style="margin-right:8px;">✉</span>
          <a href="mailto:darrin@caliberwebstudio.com" style="${styles.contactLink}">darrin@caliberwebstudio.com</a>
        </p>
        <p style="${styles.contactRow}">
          <span style="margin-right:8px;">☎</span>
          <a href="tel:+13137992315" style="${styles.contactLink}">(313) 799-2315</a>
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="${styles.footer}">
      <p style="${styles.footerText}">
        © ${new Date().getFullYear()} Caliber Web Studio — High Caliber Operations LLC
      </p>
      <p style="${styles.footerText}">
        <a href="https://caliberwebstudio.com" style="${styles.footerLink}">caliberwebstudio.com</a>
        &nbsp;·&nbsp; Detroit, Michigan
      </p>
    </div>

  </div>
</body>
</html>`
}

// ─── Internal notification email to Darrin ───────────────────────────────────

type Payload = {
  slug: string
  submittedAt: string
  business: OnboardingFormData['business']
  contact: OnboardingFormData['contact']
  services: OnboardingFormData['services']
  brand: OnboardingFormData['brand']
  photos: OnboardingFormData['photos']
  story: OnboardingFormData['story']
}

function row(label: string, value: string | undefined | null): string {
  if (!value) return ''
  return `<tr>
    <td style="padding:6px 12px 6px 0;font-size:13px;color:rgba(255,255,255,0.4);white-space:nowrap;vertical-align:top;width:160px;">${label}</td>
    <td style="padding:6px 0;font-size:13px;color:rgba(255,255,255,0.85);word-break:break-word;">${value}</td>
  </tr>`
}

function section(title: string, rows: string): string {
  if (!rows.trim()) return ''
  return `
  <div style="margin-bottom:28px;">
    <p style="font-size:11px;font-weight:700;color:rgba(255,255,255,0.3);text-transform:uppercase;letter-spacing:1px;margin:0 0 10px;">${title}</p>
    <div style="background-color:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:8px;padding:12px 16px;">
      <table style="width:100%;border-collapse:collapse;">${rows}</table>
    </div>
  </div>`
}

export function buildDarrinEmail(payload: Payload): string {
  const { business, contact, services, brand, photos, story, slug, submittedAt } = payload

  const hoursText = contact.hours
    ? Object.entries(contact.hours)
        .map(([day, h]) => {
          if (!h) return ''
          const dayLabel = day.charAt(0).toUpperCase() + day.slice(1)
          return h.closed ? `${dayLabel}: Closed` : `${dayLabel}: ${h.open} – ${h.close}`
        })
        .filter(Boolean)
        .join('<br />')
    : ''

  const socialLinks = contact.social
    ? Object.entries(contact.social)
        .filter(([, v]) => v)
        .map(([platform, url]) => `${platform}: ${url}`)
        .join('<br />')
    : ''

  const servicesList = services.items
    .map((s, i) => `${i + 1}. <strong>${s.name}</strong>${s.price ? ` (${s.price})` : ''}${s.description ? ` — ${s.description}` : ''}`)
    .join('<br />')

  const photoLinks = photos.items && photos.items.length > 0
    ? photos.items
        .map((p) => `<a href="${p.url}" style="color:#c8a97e;">${p.fileName}</a>${p.caption ? ` — ${p.caption}` : ''}`)
        .join('<br />')
    : ''

  const businessSection = section('Business', [
    row('Name', business.name),
    row('Tagline', business.tagline || ''),
    row('Industry', business.industry),
    row('Years in Business', business.yearsInBusiness || ''),
    row('Current Website', business.currentWebsite || ''),
  ].join(''))

  const contactSection = section('Contact & Location', [
    row('Owner', contact.ownerName),
    row('Email', contact.email),
    row('Phone', contact.phone || ''),
    row('Address', [contact.address, contact.city, contact.state, contact.zip].filter(Boolean).join(', ')),
    row('Hours', hoursText),
    row('Social', socialLinks),
  ].join(''))

  const servicesSection = section('Services', row('', servicesList))

  const brandSection = section('Brand', [
    row('Primary Color', brand.primaryColor ? `<span style="display:inline-block;width:12px;height:12px;background:${brand.primaryColor};border-radius:2px;margin-right:6px;vertical-align:middle;"></span>${brand.primaryColor}` : ''),
    row('Secondary Color', brand.secondaryColor ? `<span style="display:inline-block;width:12px;height:12px;background:${brand.secondaryColor};border-radius:2px;margin-right:6px;vertical-align:middle;"></span>${brand.secondaryColor}` : ''),
    row('Accent Color', brand.accentColor ? `<span style="display:inline-block;width:12px;height:12px;background:${brand.accentColor};border-radius:2px;margin-right:6px;vertical-align:middle;"></span>${brand.accentColor}` : ''),
    row('Style', brand.stylePreference),
    row('Logo URL', brand.logoUrl ? `<a href="${brand.logoUrl}" style="color:#c8a97e;">${brand.logoFileName || brand.logoUrl}</a>` : ''),
    row('Notes', brand.notes || ''),
  ].join(''))

  const photosSection = photoLinks ? section('Photos', row('Uploaded Files', photoLinks)) : ''

  const storySection = section('Story', [
    row('Your Story', story.yourStory),
    row('What Makes Different', story.whatMakesDifferent),
    row('Target Customers', story.targetCustomers || ''),
    row('Additional Notes', story.anythingElse || ''),
  ].join(''))

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>New Client Onboarding: ${business.name}</title>
</head>
<body style="${styles.body}">
  <div style="${styles.wrapper}">

    <div style="${styles.header}">
      <p style="${styles.logo}">Caliber <span style="${styles.logoAccent}">Web Studio</span></p>
    </div>

    <div style="${styles.content}">
      <h1 style="${styles.h1}">🚀 New Onboarding Submission</h1>
      <p style="${styles.subhead}">
        <strong style="color:rgba(255,255,255,0.7)">${business.name}</strong>
        &nbsp;·&nbsp; Submitted ${new Date(submittedAt).toLocaleString('en-US', { timeZone: 'America/Detroit', dateStyle: 'medium', timeStyle: 'short' })} ET
        &nbsp;·&nbsp; Slug: <code style="background:rgba(255,255,255,0.07);padding:2px 6px;border-radius:4px;font-size:12px;">${slug}</code>
      </p>

      ${businessSection}
      ${contactSection}
      ${servicesSection}
      ${brandSection}
      ${photosSection}
      ${storySection}
    </div>

    <div style="${styles.footer}">
      <p style="${styles.footerText}">Caliber Web Studio — Internal Notification</p>
    </div>

  </div>
</body>
</html>`
}
