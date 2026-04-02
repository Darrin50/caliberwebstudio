/**
 * Compress all blog images to web-optimized sizes
 * Target: ~200-400KB per image at 1200px wide
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.join(__dirname, '../public/blog');

async function main() {
  const files = fs.readdirSync(BLOG_DIR).filter(
    (f) => f.endsWith('.jpg') && !f.startsWith('test-')
  );

  console.log(`Compressing ${files.length} images...`);

  let compressed = 0;
  let skipped = 0;
  let errors = 0;

  for (const file of files) {
    const filepath = path.join(BLOG_DIR, file);
    const stat = fs.statSync(filepath);

    // Skip if already small (< 500KB = already compressed)
    if (stat.size < 500 * 1024) {
      skipped++;
      continue;
    }

    const tmpPath = filepath + '.tmp';

    try {
      await sharp(filepath)
        .resize(1200, 675, { fit: 'cover', position: 'centre' })
        .jpeg({ quality: 82, progressive: true })
        .toFile(tmpPath);

      const newStat = fs.statSync(tmpPath);
      fs.renameSync(tmpPath, filepath);

      const savings = Math.round((1 - newStat.size / stat.size) * 100);
      console.log(
        `✓ ${file}: ${Math.round(stat.size / 1024)}KB → ${Math.round(newStat.size / 1024)}KB (-${savings}%)`
      );
      compressed++;
    } catch (e) {
      console.error(`✗ Error compressing ${file}: ${e.message}`);
      if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
      errors++;
    }
  }

  console.log(`\nDone! Compressed: ${compressed}, Skipped: ${skipped}, Errors: ${errors}`);
}

main().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});
