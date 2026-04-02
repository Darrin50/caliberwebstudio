import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

// Load OPENAI_API_KEY from .env.local if not in env
if (!process.env.OPENAI_API_KEY) {
  const envFile = path.join(ROOT, '.env.local');
  if (fs.existsSync(envFile)) {
    const lines = fs.readFileSync(envFile, 'utf8').split('\n');
    for (const line of lines) {
      const [k, ...v] = line.split('=');
      if (k?.trim() === 'OPENAI_API_KEY') {
        process.env.OPENAI_API_KEY = v.join('=').trim().replace(/^"|"$/g, '');
      }
    }
  }
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, res => {
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', err => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function generate(prompt, outputPath, size = '1792x1024') {
  console.log(`\nGenerating: ${path.basename(outputPath)}`);
  console.log(`Prompt: ${prompt.slice(0, 80)}...`);
  const res = await openai.images.generate({
    model: 'dall-e-3',
    prompt,
    n: 1,
    size,
    quality: 'hd',
    style: 'natural',
  });
  const url = res.data[0].url;
  await downloadImage(url, outputPath);
  console.log(`Saved: ${outputPath}`);
}

const BARBER_DIR = path.join(ROOT, 'public/demo/barber');
const PLUMBING_DIR = path.join(ROOT, 'public/demo/plumbing');

fs.mkdirSync(BARBER_DIR, { recursive: true });
fs.mkdirSync(PLUMBING_DIR, { recursive: true });

const images = [
  // ── BARBERSHOP ──────────────────────────────────────────────────────────────
  {
    path: path.join(BARBER_DIR, 'hero.png'),
    size: '1792x1024',
    prompt:
      'Interior of a modern urban barbershop in Detroit. A Black male barber in his 30s wearing a black apron is giving a precise fade haircut to a Black male client seated in a classic leather barber chair. Clean mirrors, barber tools neatly arranged on the counter, barbershop pole visible in the background, warm ambient lighting. Shot with a Canon DSLR at 35mm, natural light, slightly shallow depth of field, photojournalistic style. No text, no logos.',
  },
  {
    path: path.join(BARBER_DIR, 'about.png'),
    size: '1024x1024',
    prompt:
      'A Black barbershop owner in his 40s standing proudly inside his clean, modern barbershop. Arms crossed, confident warm smile, wearing a black polo shirt. Barber chairs visible behind him, mirrors with product shelves, a Detroit city street visible through the front window. Natural afternoon light. Realistic DSLR photograph, no text, no logos.',
  },
  {
    path: path.join(BARBER_DIR, 'fade-closeup.png'),
    size: '1024x1024',
    prompt:
      'Extreme close-up of a precision skin fade and sharp lineup on a Black man. A barber\'s dark-skinned hands holding professional clippers doing the detail work. Shallow depth of field, the hairline transition is razor-sharp. Studio-quality photographic detail, warm barbershop lighting. No text.',
  },
  {
    path: path.join(BARBER_DIR, 'two-barbers.png'),
    size: '1792x1024',
    prompt:
      'Inside a busy Detroit barbershop, two Black male barbers working simultaneously on two Black male clients. The shop has clean mirrors, neon signs, barbershop poles, products on shelves. Casual professional vibe, Saturday afternoon energy. Wide shot, documentary photography style, natural window light. No text, no logos.',
  },
  {
    path: path.join(BARBER_DIR, 'waves.png'),
    size: '1024x1024',
    prompt:
      'Close-up portrait of a young Black man showing off his fresh 360 waves and tight skin fade. Confident expression, clean barbershop backdrop visible. Shot from the side/three-quarter angle, shallow depth of field. Photorealistic DSLR portrait. No text.',
  },
  {
    path: path.join(BARBER_DIR, 'interior.png'),
    size: '1792x1024',
    prompt:
      'Wide angle interior shot of a modern urban barbershop. Three barber chairs facing large mirrors with product shelves, hardwood floors, exposed brick wall, neon "Open" sign glowing. Clean, professional, upscale but welcoming. No people. Architectural photography style, natural + warm lighting. No text, no logos.',
  },
  // ── PLUMBING ────────────────────────────────────────────────────────────────
  {
    path: path.join(PLUMBING_DIR, 'hero.png'),
    size: '1792x1024',
    prompt:
      'A professional plumber in his 30s wearing a navy blue work uniform and tool belt lying on his back under a residential kitchen sink, using a wrench to tighten a pipe fitting. Real American kitchen cabinet interior visible around him. Natural light from a nearby window. Realistic documentary photograph, iPhone or DSLR quality. No text, no logos.',
  },
  {
    path: path.join(PLUMBING_DIR, 'about.png'),
    size: '1792x1024',
    prompt:
      'A Metro Plumbing service van (white van, no visible branding) parked in a residential driveway in a suburban Detroit neighborhood. A plumber in work uniform carrying a metal toolbox walks from the van toward a house front door. Overcast afternoon light, realistic suburban setting. Documentary photography style. No text, no logos.',
  },
  {
    path: path.join(PLUMBING_DIR, 'pipes.png'),
    size: '1024x1024',
    prompt:
      'Close-up of a plumber\'s hands using a pipe wrench to connect copper pipe fittings inside a wall or under a sink. The copper pipes are shiny and professionally fitted. Work gloves visible. Shallow depth of field, realistic workshop or residential setting. Macro/detail photography style. No text.',
  },
  {
    path: path.join(PLUMBING_DIR, 'water-heater.png'),
    size: '1024x1024',
    prompt:
      'A plumber in work clothes installing a new water heater in a residential utility room. He is connecting pipes at the top of the water heater tank with a wrench. Real American basement or utility closet setting. Natural fluorescent lighting. Realistic documentary photograph. No text, no logos.',
  },
];

(async () => {
  for (const img of images) {
    try {
      await generate(img.prompt, img.path, img.size);
    } catch (err) {
      console.error(`FAILED ${img.path}:`, err.message);
    }
  }
  console.log('\nAll done!');
})();
