#!/usr/bin/env node
'use strict';

/**
 * Generates public/og-social-card.jpg (1200×630) for Open Graph social sharing.
 *
 * Base: public/logo-full-hero.png (1200×630, C-mark on dark #0a0a0b background)
 * Overlay: SVG text composited into the lower half
 *   - "CALIBER WEB STUDIO" — white, bold, 68px
 *   - tagline — brand blue #0076B6, 26px
 *
 * Note: uses the C-mark logo because no full wordmark PNG exists in public/.
 * When a wordmark file is available, replace BASE with the wordmark path and
 * adjust positioning accordingly.
 *
 * Run: node scripts/build-og-card.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const BASE = path.resolve(__dirname, '../public/logo-full-hero.png');
const OUT  = path.resolve(__dirname, '../public/og-social-card.jpg');

// SVG composited over the bottom portion of the base image.
// Positioned at top=408 on the 1200×630 canvas → sits below the C mark.
const OVERLAY_TOP  = 408;
const OVERLAY_H    = 222;

const textSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="${OVERLAY_H}">
  <!-- thin rule to separate mark from text -->
  <line x1="440" y1="14" x2="760" y2="14" stroke="#0076B6" stroke-width="1" opacity="0.6"/>

  <!-- company name -->
  <text
    x="600" y="80"
    font-family="Arial, Helvetica, sans-serif"
    font-size="68"
    font-weight="bold"
    fill="#ffffff"
    text-anchor="middle"
    letter-spacing="6"
  >CALIBER WEB STUDIO</text>

  <!-- tagline -->
  <text
    x="600" y="138"
    font-family="Arial, Helvetica, sans-serif"
    font-size="26"
    fill="#0076B6"
    text-anchor="middle"
    letter-spacing="1.5"
  >Detroit Web Design + AI Growth Systems</text>

  <!-- domain -->
  <text
    x="600" y="192"
    font-family="Arial, Helvetica, sans-serif"
    font-size="18"
    fill="rgba(255,255,255,0.38)"
    text-anchor="middle"
    letter-spacing="0.5"
  >caliberwebstudio.com</text>
</svg>`;

async function main() {
  const info = await sharp(BASE)
    .composite([
      {
        input: Buffer.from(textSvg),
        top: OVERLAY_TOP,
        left: 0,
      },
    ])
    .jpeg({ quality: 92 })
    .toFile(OUT);

  const kb = Math.round(fs.statSync(OUT).size / 1024);
  console.log(`✓ og-social-card.jpg — ${info.width}×${info.height} — ${kb} KB`);

  if (kb < 80 || kb > 200) {
    console.warn(`  ⚠ file size ${kb} KB is outside 80–200 KB target; review quality setting`);
  }
}

main().catch(err => {
  console.error('✗ Error:', err.message);
  process.exit(1);
});
