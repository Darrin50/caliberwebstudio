#!/usr/bin/env node
'use strict';

/**
 * Generates public/og-social-card.jpg (1200×630) for Open Graph social sharing.
 *
 * Uses the official CWS logo (public/cws-logo.png) — the real 3-D C-mark lockup
 * with CALIBER / WEB STUDIO / MEASURE.DESIGN.RISE. — composited on a solid
 * #20211A background that exactly matches the logo's own background color,
 * so there's zero visible seam.
 *
 * Run: node scripts/build-og-card.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const LOGO = path.resolve(__dirname, '../public/cws-logo.png');
const OUT  = path.resolve(__dirname, '../public/og-social-card.jpg');

// Logo source: 444 × 376 px
// Background fill: #20211A  (sampled from logo corners — exact match)
const BG = { r: 32, g: 33, b: 26 };   // #20211A

// After trimming the dark border the logo content is ~140×123.
// Scale trimmed content to CONTENT_W wide on the card.
const CONTENT_W = 500;   // rendered width of the trimmed logo on the card
// Trimmed source aspect is 140:123 = 1.138:1
const CONTENT_H = Math.round(CONTENT_W / 140 * 123);  // ≈ 439

// Center on 1200 × 630 canvas, nudged slightly above centre
const LOGO_X = Math.round((1200 - CONTENT_W) / 2);   // = 350
const LOGO_Y = Math.round((630 - CONTENT_H) / 2) - 12; // ≈ 84

async function main() {
  // Trim the dark border, then scale the content to card size
  const logoResized = await sharp(LOGO)
    .trim({ background: { r: BG.r, g: BG.g, b: BG.b }, threshold: 15 })
    .resize(CONTENT_W, CONTENT_H, { fit: 'fill' })
    .png()
    .toBuffer();

  // Domain hint — subtle, bottom-centre
  const domainSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <text
      x="600" y="606"
      font-family="'Courier New', monospace"
      font-size="14"
      fill="rgba(180,175,165,0.38)"
      text-anchor="middle"
      letter-spacing="1.2"
    >caliberwebstudio.com</text>
  </svg>`;

  const info = await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 3,
      background: BG,
    },
  })
    .composite([
      { input: logoResized, top: LOGO_Y, left: LOGO_X },
      { input: Buffer.from(domainSvg), top: 0, left: 0 },
    ])
    .jpeg({ quality: 92 })
    .toFile(OUT);

  const kb = Math.round(fs.statSync(OUT).size / 1024);
  console.log(`✓ og-social-card.jpg — ${info.width}×${info.height} — ${kb} KB`);

  if (kb < 20 || kb > 220) {
    console.warn(`  ⚠ file size ${kb} KB outside 20–220 KB target`);
  }
}

main().catch(err => {
  console.error('✗', err.message);
  process.exit(1);
});
