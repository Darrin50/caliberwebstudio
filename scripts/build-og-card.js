#!/usr/bin/env node
'use strict';

/**
 * Generates public/og-social-card.jpg (1200×630) for Open Graph social sharing.
 *
 * Renders the full card as a single SVG — no PNG compositing.
 * The C-mark is drawn as inline SVG rect + text (identical to Nav.tsx) so it
 * blends perfectly with the card background.  "CALIBER WEB STUDIO" uses the
 * same Syne 800 + chrome-gradient treatment as the live nav.
 *
 * Downloads Syne 800 from Google Fonts and embeds as base64 for authentic
 * rendering. Falls back to system sans-serif if the download fails.
 *
 * Run: node scripts/build-og-card.js
 */

const sharp = require('sharp');
const https = require('https');
const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '../public/og-social-card.jpg');

// ── Layout ───────────────────────────────────────────────────────────────────
// Mark + wordmark lockup: estimate total width ~800px → center at x=600
//   mark (160) + gap (52) + text (~590) = 802 → left edge = 600 - 401 = 199
const MARK_SIZE = 160;
const MARK_X    = 200;                                // left edge of mark box
const MARK_CX   = MARK_X + MARK_SIZE / 2;            // = 250
const LOCKUP_CY = 290;                                // vertical center
const MARK_Y    = LOCKUP_CY - MARK_SIZE / 2;         // = 210  (top of box)
const GAP       = 52;
const TEXT_X    = MARK_X + MARK_SIZE + GAP;          // = 382
// ─────────────────────────────────────────────────────────────────────────────

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      },
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return fetchBuffer(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} fetching ${url}`));
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    });
    req.on('error', reject);
  });
}

async function getSyneFontBase64() {
  process.stdout.write('  Fetching Syne 800 from Google Fonts… ');
  const cssUrl = 'https://fonts.googleapis.com/css2?family=Syne:wght@800&display=swap';
  const css = (await fetchBuffer(cssUrl)).toString('utf-8');

  // Extract all font URLs — last entry is the Latin (U+0000-00FF) subset
  const matches = [...css.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.(?:woff2|ttf))\)/g)];
  if (!matches.length) throw new Error('No font URL found in Google Fonts CSS');

  const fontUrl = matches[matches.length - 1][1];
  const isWoff2 = fontUrl.endsWith('.woff2');
  const fontBuf = await fetchBuffer(fontUrl);
  process.stdout.write('done\n');
  return { b64: fontBuf.toString('base64'), mime: isWoff2 ? 'font/woff2' : 'font/ttf', fmt: isWoff2 ? 'woff2' : 'truetype' };
}

async function main() {
  let fontFaceDecl = '';
  let fontFamily = "'Syne', 'Segoe UI Black', 'Arial Black', sans-serif";

  try {
    const { b64, mime, fmt } = await getSyneFontBase64();
    fontFaceDecl = `@font-face {
        font-family: 'Syne';
        font-weight: 800;
        src: url('data:${mime};base64,${b64}') format('${fmt}');
      }`;
    console.log(`  Syne 800 embedded (${fmt}) ✓`);
  } catch (err) {
    console.warn(`  ⚠ Font embed failed (${err.message}); using system font fallback`);
  }

  // C mark font-size scales to 50% of box (matching nav: 32px in 64px box)
  const MARK_FONT = MARK_SIZE * 0.5;  // = 80

  const cardSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <style>${fontFaceDecl}</style>

    <!-- Deep navy radial background -->
    <radialGradient id="bg" cx="50%" cy="46%" r="68%">
      <stop offset="0%"   stop-color="#0d1525"/>
      <stop offset="100%" stop-color="#060c18"/>
    </radialGradient>

    <!-- Gradient for the C letterform (matches Nav.tsx: #2563eb → #0d9488) -->
    <linearGradient id="c-grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%"   stop-color="#2563eb"/>
      <stop offset="100%" stop-color="#0d9488"/>
    </linearGradient>

    <!-- Chrome gradient for the wordmark -->
    <linearGradient id="chrome" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"   stop-color="#7A8A96"/>
      <stop offset="28%"  stop-color="#BDC9D3"/>
      <stop offset="52%"  stop-color="#FFFFFF"/>
      <stop offset="74%"  stop-color="#BDC9D3"/>
      <stop offset="100%" stop-color="#7A8A96"/>
    </linearGradient>

    <!-- Soft glow behind the C-mark -->
    <radialGradient id="glow" cx="${MARK_CX}" cy="${LOCKUP_CY}"
                    r="240" gradientUnits="userSpaceOnUse">
      <stop offset="0%"   stop-color="#1a3a70" stop-opacity="0.40"/>
      <stop offset="100%" stop-color="#060c18"  stop-opacity="0"/>
    </radialGradient>

    <!-- Very faint dot grid for depth -->
    <pattern id="dots" x="0" y="0" width="40" height="40"
             patternUnits="userSpaceOnUse">
      <circle cx="20" cy="20" r="0.7" fill="rgba(255,255,255,0.06)"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#dots)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <!-- ── C-mark: dark rounded box + gradient "C" (mirrors Nav.tsx exactly) ── -->
  <rect x="${MARK_X}" y="${MARK_Y}"
        width="${MARK_SIZE}" height="${MARK_SIZE}"
        rx="${Math.round(12 / 64 * MARK_SIZE)}"
        fill="#0a0e1a"/>
  <rect x="${MARK_X}" y="${MARK_Y}"
        width="${MARK_SIZE}" height="${MARK_SIZE}"
        rx="${Math.round(12 / 64 * MARK_SIZE)}"
        fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1.5"/>
  <text
    x="${MARK_CX}" y="${LOCKUP_CY}"
    font-family="'Syne', serif"
    font-size="${MARK_FONT}"
    font-weight="800"
    fill="url(#c-grad)"
    text-anchor="middle"
    dominant-baseline="central"
  >C</text>

  <!-- ── Wordmark: Syne 800, chrome gradient (mirrors nav .nav-logo-text) ── -->
  <text
    x="${TEXT_X}" y="${LOCKUP_CY}"
    font-family="${fontFamily}"
    font-size="54"
    font-weight="800"
    fill="url(#chrome)"
    dominant-baseline="central"
    letter-spacing="3.5"
    text-rendering="optimizeLegibility"
  >CALIBER WEB STUDIO</text>

  <!-- ── Separator ── -->
  <line x1="${MARK_X}" y1="400" x2="1030" y2="400"
        stroke="#1e3060" stroke-width="1" opacity="0.65"/>

  <!-- ── Tagline ── -->
  <text
    x="600" y="440"
    font-family="'Courier New', monospace"
    font-size="18"
    fill="#0076B6"
    text-anchor="middle"
    letter-spacing="2.5"
  >DETROIT WEB DESIGN + AI GROWTH SYSTEMS</text>

  <!-- ── Domain ── -->
  <text
    x="600" y="558"
    font-family="'Courier New', monospace"
    font-size="14"
    fill="rgba(255,255,255,0.28)"
    text-anchor="middle"
    letter-spacing="0.8"
  >caliberwebstudio.com</text>
</svg>`;

  const info = await sharp(Buffer.from(cardSvg))
    .jpeg({ quality: 92 })
    .toFile(OUT);

  const kb = Math.round(fs.statSync(OUT).size / 1024);
  console.log(`\n✓ og-social-card.jpg — ${info.width}×${info.height} — ${kb} KB`);

  if (kb < 30 || kb > 220) {
    console.warn(`  ⚠ file size ${kb} KB outside 30–220 KB target`);
  }
}

main().catch(err => {
  console.error('✗', err.message);
  process.exit(1);
});
