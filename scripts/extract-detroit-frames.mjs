/**
 * extract-detroit-frames.mjs
 *
 * Extracts ~120 evenly-spaced JPEG frames from detroit-manifesto.mp4
 * and writes them to public/images/detroit-frames/ as
 * frame-0000.jpg … frame-0119.jpg (zero-padded, 4 digits).
 *
 * Run once during development:
 *   node scripts/extract-detroit-frames.mjs
 */

import { spawnSync, execFileSync } from 'child_process';
import { createRequire } from 'module';
import { mkdirSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require    = createRequire(import.meta.url);

const ffmpegPath = require('ffmpeg-static');
const ROOT       = path.resolve(__dirname, '..');
const VIDEO      = path.join(ROOT, 'public', 'videos', 'detroit-manifesto.mp4');
const OUT_DIR    = path.join(ROOT, 'public', 'images', 'detroit-frames');
const TOTAL_FRAMES = 120;

// ── 1. Get video duration ──────────────────────────────────────────
const probe = spawnSync(ffmpegPath, ['-i', VIDEO], { encoding: 'buffer' });
const probeOut = (probe.stderr || Buffer.alloc(0)).toString('utf8');
const durMatch = probeOut.match(/Duration:\s*([\d]+):([\d]+):([\d.]+)/);
if (!durMatch) {
  console.error('Could not determine video duration. ffmpeg output:\n', probeOut.slice(0, 600));
  process.exit(1);
}
const durationSec =
  parseInt(durMatch[1]) * 3600 +
  parseInt(durMatch[2]) * 60 +
  parseFloat(durMatch[3]);
console.log(`Video duration: ${durationSec.toFixed(2)}s`);

// ── 2. Create output directory ────────────────────────────────────
if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

// ── 3. Extract frames at evenly-spaced timestamps ─────────────────
console.log(`Extracting ${TOTAL_FRAMES} frames…`);

let extracted = 0;
for (let i = 0; i < TOTAL_FRAMES; i++) {
  const t   = (i / (TOTAL_FRAMES - 1)) * durationSec;
  const idx = String(i).padStart(4, '0');
  const out = path.join(OUT_DIR, `frame-${idx}.jpg`);

  // -ss before -i is fast seek; -frames:v 1 grabs exactly one frame
  const result = spawnSync(
    ffmpegPath,
    [
      '-y',
      '-ss', String(t.toFixed(4)),
      '-i', VIDEO,
      '-frames:v', '1',
      '-q:v', '3',        // JPEG quality 3 ≈ ~80% quality, good file size
      '-vf', 'scale=1280:-2',  // 1280px wide, height auto
      out,
    ],
    { encoding: 'buffer' }
  );

  if (result.status !== 0) {
    const err = (result.stderr || Buffer.alloc(0)).toString('utf8');
    console.warn(`  Warning: frame ${idx} (t=${t.toFixed(2)}s) failed:`, err.slice(-200));
  } else {
    extracted++;
  }

  if ((i + 1) % 20 === 0 || i === TOTAL_FRAMES - 1) {
    process.stdout.write(`  ${i + 1}/${TOTAL_FRAMES} frames done\n`);
  }
}

console.log(`\nDone. ${extracted}/${TOTAL_FRAMES} frames written to public/images/detroit-frames/`);
