/**
 * DALL-E 3 Blog Image Generator
 * Generates 120 unique, topic-relevant images for 30 blog posts
 * Each post gets: 1 thumbnail + 3 content images = 4 images
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = process.env.OPENAI_API_KEY;
const OUT_DIR = path.join(__dirname, '../public/blog');

if (!API_KEY) {
  console.error('OPENAI_API_KEY not set');
  process.exit(1);
}

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// 120 total images: 4 per post (1 thumbnail + 3 content images)
const IMAGE_PLAN = [
  // ── POST 1: best-web-designer-detroit ──────────────────────────────────────
  {
    file: 'best-web-designer-detroit-thumb.jpg',
    prompt: 'Confident web designer reviewing a sleek website on a large monitor in a modern Detroit office, city view through window, warm professional lighting, photorealistic',
  },
  {
    file: 'best-web-designer-detroit-1.jpg',
    prompt: 'Detroit Renaissance Center skyscrapers at dusk with lights reflecting in the Detroit River, dramatic golden sky, professional architectural photography, photorealistic',
  },
  {
    file: 'best-web-designer-detroit-2.jpg',
    prompt: 'Web designer and client reviewing analytics results together at a computer, showing traffic growth charts, modern collaborative workspace, photorealistic',
  },
  {
    file: 'best-web-designer-detroit-3.jpg',
    prompt: 'Modern business website displayed on desktop monitor and iPhone simultaneously, clean minimalist UI design, dark studio background, photorealistic',
  },

  // ── POST 2: affordable-website-design-detroit ──────────────────────────────
  {
    file: 'affordable-website-design-detroit-thumb.jpg',
    prompt: 'Small Detroit business owner smiling while looking at their new professional website on a laptop in a bright storefront, photorealistic',
  },
  {
    file: 'affordable-website-design-detroit-1.jpg',
    prompt: 'Monthly budget planning concept with open laptop, calculator, and financial documents on a clean desk, business owner reviewing website investment ROI, photorealistic',
  },
  {
    file: 'affordable-website-design-detroit-2.jpg',
    prompt: 'Comparison of expensive agency price quote vs affordable monthly web design plan on paper documents side by side, business office setting, photorealistic',
  },
  {
    file: 'affordable-website-design-detroit-3.jpg',
    prompt: 'Revenue growth line chart showing small Detroit business income increasing after professional website launch, clean business analytics concept, photorealistic',
  },

  // ── POST 3: detroit-web-design-agency-vs-freelancer ───────────────────────
  {
    file: 'detroit-web-design-agency-vs-freelancer-thumb.jpg',
    prompt: 'Professional web design agency team of four diverse people collaborating around a large monitor in a modern Detroit office, photorealistic',
  },
  {
    file: 'detroit-web-design-agency-vs-freelancer-1.jpg',
    prompt: 'Side-by-side scene: left shows corporate web agency meeting room with full team, right shows lone freelancer working on a laptop at home, split composition, photorealistic',
  },
  {
    file: 'detroit-web-design-agency-vs-freelancer-2.jpg',
    prompt: 'Freelance web developer focused on coding at a coffee shop in Detroit, laptop with design software open, natural window light, photorealistic',
  },
  {
    file: 'detroit-web-design-agency-vs-freelancer-3.jpg',
    prompt: 'Business owner shaking hands with a professional web designer at a contract signing meeting, formal office setting, Detroit cityscape visible through window, photorealistic',
  },

  // ── POST 4: why-detroit-small-businesses-need-a-website ───────────────────
  {
    file: 'why-detroit-small-businesses-need-a-website-thumb.jpg',
    prompt: 'Charming Detroit small business storefront on a brick street, open sign, inviting window display, golden afternoon light, photorealistic',
  },
  {
    file: 'why-detroit-small-businesses-need-a-website-1.jpg',
    prompt: 'Local Detroit business owner standing proudly outside their shop in a vibrant neighborhood, welcoming smile, urban backdrop, photorealistic',
  },
  {
    file: 'why-detroit-small-businesses-need-a-website-2.jpg',
    prompt: 'Person searching for a local business on Google Maps on a smartphone, nearby search results visible on screen with map pins, photorealistic',
  },
  {
    file: 'why-detroit-small-businesses-need-a-website-3.jpg',
    prompt: 'Customer discovering a local Detroit restaurant website on their phone and deciding to visit, sitting at a table, photorealistic',
  },

  // ── POST 5: how-caliber-web-studio-helps-detroit-businesses ───────────────
  {
    file: 'how-caliber-web-studio-helps-detroit-businesses-thumb.jpg',
    prompt: 'Digital marketing professional presenting website growth results to a Detroit small business owner, office with large analytics screens, photorealistic',
  },
  {
    file: 'how-caliber-web-studio-helps-detroit-businesses-1.jpg',
    prompt: 'Detroit business district aerial view at golden hour, professional business setting with modern office towers and local streets below, photorealistic',
  },
  {
    file: 'how-caliber-web-studio-helps-detroit-businesses-2.jpg',
    prompt: 'Web studio team reviewing a before and after website redesign on dual monitors, modern collaborative workspace, photorealistic',
  },
  {
    file: 'how-caliber-web-studio-helps-detroit-businesses-3.jpg',
    prompt: 'Business growth concept showing upward arrow chart on a glass whiteboard in a professional Detroit office, strategy planning, photorealistic',
  },

  // ── POST 6: how-much-does-a-small-business-website-cost ───────────────────
  {
    file: 'how-much-does-a-small-business-website-cost-thumb.jpg',
    prompt: 'Business owner reviewing website design pricing proposals spread on a desk with calculator, pen, and laptop, professional office setting, photorealistic',
  },
  {
    file: 'how-much-does-a-small-business-website-cost-1.jpg',
    prompt: 'Website cost breakdown concept with price tags and a web design mockup on a whiteboard in a business meeting, photorealistic',
  },
  {
    file: 'how-much-does-a-small-business-website-cost-2.jpg',
    prompt: 'Three different web design service tier options displayed on a screen, small business owner comparing packages, laptop and notebook on desk, photorealistic',
  },
  {
    file: 'how-much-does-a-small-business-website-cost-3.jpg',
    prompt: 'Stack of dollar bills next to a laptop showing a professional website, investment concept for digital business, photorealistic',
  },

  // ── POST 7: why-cheap-websites-cost-more ──────────────────────────────────
  {
    file: 'why-cheap-websites-cost-more-thumb.jpg',
    prompt: 'Frustrated small business owner looking at a broken, poorly designed website on a laptop screen, home office setting, concerned expression, photorealistic',
  },
  {
    file: 'why-cheap-websites-cost-more-1.jpg',
    prompt: 'Cracked cheap product next to a premium quality product, quality vs cost comparison concept, sharp product photography, photorealistic',
  },
  {
    file: 'why-cheap-websites-cost-more-2.jpg',
    prompt: 'Side by side iPhone screens showing a fast modern professional website vs a slow ugly cheap website, comparison photo, photorealistic',
  },
  {
    file: 'why-cheap-websites-cost-more-3.jpg',
    prompt: 'Business owner paying unexpected additional fees on a calculator after a cheap website failed, frustrated at desk, photorealistic',
  },

  // ── POST 8: whats-included-in-197-per-month-website ───────────────────────
  {
    file: 'whats-included-in-197-per-month-website-thumb.jpg',
    prompt: 'Professional business website displayed responsively on MacBook Pro, iPad, and iPhone on a clean white desk, photorealistic',
  },
  {
    file: 'whats-included-in-197-per-month-website-1.jpg',
    prompt: 'Web developer reviewing a comprehensive features checklist for a website package on a laptop, ticking off items, professional workspace, photorealistic',
  },
  {
    file: 'whats-included-in-197-per-month-website-2.jpg',
    prompt: 'SEO performance dashboard on a professional monitor showing rankings, traffic analytics, and Core Web Vitals scores, photorealistic',
  },
  {
    file: 'whats-included-in-197-per-month-website-3.jpg',
    prompt: 'Business owner receiving a detailed monthly website performance report via email on their laptop, positive results highlighted, photorealistic',
  },

  // ── POST 9: is-paying-monthly-for-a-website-worth-it ──────────────────────
  {
    file: 'is-paying-monthly-for-a-website-worth-it-thumb.jpg',
    prompt: 'Monthly subscription value concept with calendar, credit card, and a laptop showing website results, professional desk setup, photorealistic',
  },
  {
    file: 'is-paying-monthly-for-a-website-worth-it-1.jpg',
    prompt: 'ROI calculation on a whiteboard showing monthly website subscription vs revenue generated, business strategy session, photorealistic',
  },
  {
    file: 'is-paying-monthly-for-a-website-worth-it-2.jpg',
    prompt: 'Satisfied business owner reviewing positive monthly website performance metrics on a laptop over morning coffee, home office, photorealistic',
  },
  {
    file: 'is-paying-monthly-for-a-website-worth-it-3.jpg',
    prompt: 'Investment growth graph showing consistent monthly returns from a professional website subscription, financial concept, photorealistic',
  },

  // ── POST 10: roi-of-a-professional-website ────────────────────────────────
  {
    file: 'roi-of-a-professional-website-thumb.jpg',
    prompt: 'Dramatic upward trending revenue chart on a digital dashboard, business growth analytics, blue and green accent colors, photorealistic',
  },
  {
    file: 'roi-of-a-professional-website-1.jpg',
    prompt: 'Website analytics dashboard on a large monitor showing conversion rates, lead generation, and revenue attribution for a small business, photorealistic',
  },
  {
    file: 'roi-of-a-professional-website-2.jpg',
    prompt: 'Small business owner excited about new customer inquiry notifications on their phone, website generating leads concept, photorealistic',
  },
  {
    file: 'roi-of-a-professional-website-3.jpg',
    prompt: 'Detroit business owner and accountant reviewing website investment returns at a desk, financial documents showing positive ROI, photorealistic',
  },

  // ── POST 11: what-is-an-ai-chatbot-for-business ───────────────────────────
  {
    file: 'what-is-an-ai-chatbot-for-business-thumb.jpg',
    prompt: 'Modern AI chatbot interface on a smartphone with a customer service conversation in progress, dark sleek UI design, photorealistic',
  },
  {
    file: 'what-is-an-ai-chatbot-for-business-1.jpg',
    prompt: 'AI chatbot widget appearing on a local business website on a laptop, conversation bubble animations, customer asking a question, photorealistic',
  },
  {
    file: 'what-is-an-ai-chatbot-for-business-2.jpg',
    prompt: 'Customer service team watching AI chatbot handle multiple customer inquiries automatically, monitoring dashboard, modern call center, photorealistic',
  },
  {
    file: 'what-is-an-ai-chatbot-for-business-3.jpg',
    prompt: 'Happy customer receiving instant answers from an AI chatbot on their phone at 11pm, nighttime setting, photorealistic',
  },

  // ── POST 12: how-ai-is-changing-local-business-marketing ──────────────────
  {
    file: 'how-ai-is-changing-local-business-marketing-thumb.jpg',
    prompt: 'Glowing AI neural network visualization overlaid on a Detroit city skyline at night, digital transformation concept, photorealistic',
  },
  {
    file: 'how-ai-is-changing-local-business-marketing-1.jpg',
    prompt: 'Small Detroit business owner using AI-powered marketing tools on a laptop, data-driven insights on screen, modern office, photorealistic',
  },
  {
    file: 'how-ai-is-changing-local-business-marketing-2.jpg',
    prompt: 'AI-powered customer analytics platform showing automated insights and personalized marketing recommendations for local business, photorealistic',
  },
  {
    file: 'how-ai-is-changing-local-business-marketing-3.jpg',
    prompt: 'Local business marketing team reviewing AI-generated campaign results on a large screen, collaborative modern workspace, photorealistic',
  },

  // ── POST 13: what-is-aeo-answer-engine-optimization ──────────────────────
  {
    file: 'what-is-aeo-answer-engine-optimization-thumb.jpg',
    prompt: 'Google search results page showing a featured snippet answer box highlighted with a local Detroit business answer, close-up screenshot concept, photorealistic',
  },
  {
    file: 'what-is-aeo-answer-engine-optimization-1.jpg',
    prompt: 'Smart speaker sitting on a kitchen counter answering a voice search question, glowing blue ring, modern home, photorealistic',
  },
  {
    file: 'what-is-aeo-answer-engine-optimization-2.jpg',
    prompt: 'Digital marketer writing content optimized for answer engines, laptop with research tools open, sticky notes on desk, photorealistic',
  },
  {
    file: 'what-is-aeo-answer-engine-optimization-3.jpg',
    prompt: 'Business website FAQ page on a monitor with schema markup code visible in developer tools panel, answer optimization concept, photorealistic',
  },

  // ── POST 14: what-is-geo-generative-engine-optimization ──────────────────
  {
    file: 'what-is-geo-generative-engine-optimization-thumb.jpg',
    prompt: 'ChatGPT AI search interface on a laptop screen showing a local business being recommended in a detailed AI response, photorealistic',
  },
  {
    file: 'what-is-geo-generative-engine-optimization-1.jpg',
    prompt: 'Futuristic generative AI visualization with text streams and knowledge graph nodes connecting business data, abstract digital art concept, photorealistic',
  },
  {
    file: 'what-is-geo-generative-engine-optimization-2.jpg',
    prompt: 'Digital marketer creating AI-optimized content strategy on a laptop with AI writing tools, modern office with large monitor, photorealistic',
  },
  {
    file: 'what-is-geo-generative-engine-optimization-3.jpg',
    prompt: 'Split screen showing traditional Google search results vs AI-generated response with citations, search evolution concept on dual monitors, photorealistic',
  },

  // ── POST 15: how-to-show-up-in-chatgpt-and-perplexity ────────────────────
  {
    file: 'how-to-show-up-in-chatgpt-and-perplexity-thumb.jpg',
    prompt: 'Business owner amazed to see their local Detroit business recommended by ChatGPT on a laptop screen, photorealistic',
  },
  {
    file: 'how-to-show-up-in-chatgpt-and-perplexity-1.jpg',
    prompt: 'ChatGPT and Perplexity AI interfaces side by side on dual monitors showing local business search results, photorealistic',
  },
  {
    file: 'how-to-show-up-in-chatgpt-and-perplexity-2.jpg',
    prompt: 'Content strategy session with team reviewing how to optimize business content for AI visibility, laptops open, modern conference room, photorealistic',
  },
  {
    file: 'how-to-show-up-in-chatgpt-and-perplexity-3.jpg',
    prompt: 'AI assistant on a smartphone providing a local business recommendation with citations visible, customer using app, photorealistic',
  },

  // ── POST 16: local-seo-guide-for-small-businesses ────────────────────────
  {
    file: 'local-seo-guide-for-small-businesses-thumb.jpg',
    prompt: 'Google Maps on a smartphone showing multiple local business pins in a Detroit neighborhood, customer searching for nearby services, photorealistic',
  },
  {
    file: 'local-seo-guide-for-small-businesses-1.jpg',
    prompt: 'Local SEO concept with location pin icons, Google Maps interface, and local business listings on a large computer monitor, photorealistic',
  },
  {
    file: 'local-seo-guide-for-small-businesses-2.jpg',
    prompt: 'SEO specialist analyzing local search rankings on a laptop with Google Search Console open, professional workspace, photorealistic',
  },
  {
    file: 'local-seo-guide-for-small-businesses-3.jpg',
    prompt: 'Detroit neighborhood map with highlighted local businesses appearing in search results, top 3 pack concept visualization, photorealistic',
  },

  // ── POST 17: how-to-get-on-first-page-of-google ──────────────────────────
  {
    file: 'how-to-get-on-first-page-of-google-thumb.jpg',
    prompt: 'Close-up of Google search results page on a laptop showing a Detroit business ranked number one organically, photorealistic',
  },
  {
    file: 'how-to-get-on-first-page-of-google-1.jpg',
    prompt: 'Hands typing on a laptop showing Google search results with a local business on the first page in position one, photorealistic',
  },
  {
    file: 'how-to-get-on-first-page-of-google-2.jpg',
    prompt: 'SEO professional reviewing keyword rankings report with first page positions highlighted in green, monitoring dashboard, photorealistic',
  },
  {
    file: 'how-to-get-on-first-page-of-google-3.jpg',
    prompt: 'Business owner celebrating when their website appears on Google page one, pointing at laptop screen excitedly, modern office, photorealistic',
  },

  // ── POST 18: google-business-profile-optimization ────────────────────────
  {
    file: 'google-business-profile-optimization-thumb.jpg',
    prompt: 'Google Business Profile on a smartphone showing a 5-star Detroit restaurant with photos, hours, and customer reviews, photorealistic',
  },
  {
    file: 'google-business-profile-optimization-1.jpg',
    prompt: 'Local business owner sitting at their storefront completing their Google Business Profile on a tablet, natural light, photorealistic',
  },
  {
    file: 'google-business-profile-optimization-2.jpg',
    prompt: 'Google Maps desktop view with an optimized local business knowledge panel showing reviews, photos, and business info, photorealistic',
  },
  {
    file: 'google-business-profile-optimization-3.jpg',
    prompt: 'Business owner uploading professional photos to their Google Business Profile on a laptop, photo gallery management, photorealistic',
  },

  // ── POST 19: what-is-schema-markup ───────────────────────────────────────
  {
    file: 'what-is-schema-markup-thumb.jpg',
    prompt: 'Code editor with JSON-LD schema markup structured data for a local business, dark syntax highlighting theme, clean developer workspace, photorealistic',
  },
  {
    file: 'what-is-schema-markup-1.jpg',
    prompt: 'Web developer adding schema markup to a website on dual monitors showing code editor and live preview, professional dev environment, photorealistic',
  },
  {
    file: 'what-is-schema-markup-2.jpg',
    prompt: 'Google search results showing rich snippets with star ratings and business info powered by schema markup, close-up screenshot, photorealistic',
  },
  {
    file: 'what-is-schema-markup-3.jpg',
    prompt: 'Google Rich Results Test tool on a monitor showing successful schema validation for a local business website, photorealistic',
  },

  // ── POST 20: why-small-business-websites-dont-rank ───────────────────────
  {
    file: 'why-small-business-websites-dont-rank-thumb.jpg',
    prompt: 'Analytics dashboard showing a flat line near zero for website traffic, small business owner looking at screen with concern, photorealistic',
  },
  {
    file: 'why-small-business-websites-dont-rank-1.jpg',
    prompt: 'SEO technical audit results showing multiple red errors and warnings for a website, professional SEO tool interface on monitor, photorealistic',
  },
  {
    file: 'why-small-business-websites-dont-rank-2.jpg',
    prompt: 'Google search results showing a competitor ranking in positions 1-3 while the local business is nowhere on the first page, photorealistic',
  },
  {
    file: 'why-small-business-websites-dont-rank-3.jpg',
    prompt: 'Before and after website SEO optimization comparison - same analytics dashboard showing dramatic traffic increase after fixes, photorealistic',
  },

  // ── POST 21: website-design-for-barbers ──────────────────────────────────
  {
    file: 'website-design-for-barbers-thumb.jpg',
    prompt: 'Stylish modern Detroit barbershop interior with red and white barber pole, vintage leather chairs, brick walls, warm Edison lighting, photorealistic',
  },
  {
    file: 'website-design-for-barbers-1.jpg',
    prompt: 'Expert barber giving a precise skin fade haircut to a client in a well-lit professional Detroit barbershop, photorealistic',
  },
  {
    file: 'website-design-for-barbers-2.jpg',
    prompt: 'Customer on smartphone browsing a barbershop booking website to schedule an appointment, sitting in waiting area, photorealistic',
  },
  {
    file: 'website-design-for-barbers-3.jpg',
    prompt: 'Barbershop website displayed on a laptop and mobile phone simultaneously showing online booking system and gallery, photorealistic',
  },

  // ── POST 22: website-design-for-plumbers-contractors ─────────────────────
  {
    file: 'website-design-for-plumbers-contractors-thumb.jpg',
    prompt: 'Professional licensed plumber in uniform holding pipe tools confidently in a Metro Detroit home, natural light kitchen setting, photorealistic',
  },
  {
    file: 'website-design-for-plumbers-contractors-1.jpg',
    prompt: 'Skilled plumber installing copper pipes under a modern kitchen sink, close-up professional residential plumbing work, photorealistic',
  },
  {
    file: 'website-design-for-plumbers-contractors-2.jpg',
    prompt: 'Contractor van with company logo parked in front of a brick Metro Detroit home for a service call, photorealistic',
  },
  {
    file: 'website-design-for-plumbers-contractors-3.jpg',
    prompt: 'Homeowner searching online for emergency plumber on their phone, finding a local contractor website, photorealistic',
  },

  // ── POST 23: website-design-for-salons ───────────────────────────────────
  {
    file: 'website-design-for-salons-thumb.jpg',
    prompt: 'Upscale Detroit hair salon interior with white styling stations, large mirrors, warm professional lighting, modern decor, photorealistic',
  },
  {
    file: 'website-design-for-salons-1.jpg',
    prompt: 'Professional hair stylist applying a balayage color technique to a client in a modern Detroit beauty salon, photorealistic',
  },
  {
    file: 'website-design-for-salons-2.jpg',
    prompt: 'Salon client browsing hair salon website on a tablet to book a coloring appointment, sitting in styling chair, photorealistic',
  },
  {
    file: 'website-design-for-salons-3.jpg',
    prompt: 'Beautiful salon website on a MacBook showing service menu, stylist portfolio, and online booking, desk with flowers, photorealistic',
  },

  // ── POST 24: website-design-for-restaurants ──────────────────────────────
  {
    file: 'website-design-for-restaurants-thumb.jpg',
    prompt: 'Elegant Detroit restaurant dining room with warm amber lighting, white linen tablecloths, exposed brick walls, upscale atmosphere, photorealistic',
  },
  {
    file: 'website-design-for-restaurants-1.jpg',
    prompt: 'Executive chef plating a beautifully composed gourmet dish in a professional Detroit restaurant kitchen, culinary artistry, photorealistic',
  },
  {
    file: 'website-design-for-restaurants-2.jpg',
    prompt: 'Hungry customer browsing a restaurant menu website on a smartphone to make a reservation, table setting in background, photorealistic',
  },
  {
    file: 'website-design-for-restaurants-3.jpg',
    prompt: 'Restaurant website on a laptop showing food photography gallery, online reservation system, and menu sections, photorealistic',
  },

  // ── POST 25: website-design-for-auto-repair-shops ────────────────────────
  {
    file: 'website-design-for-auto-repair-shops-thumb.jpg',
    prompt: 'ASE certified auto mechanic inspecting a car engine in a clean, modern Metro Detroit garage, professional uniform, photorealistic',
  },
  {
    file: 'website-design-for-auto-repair-shops-1.jpg',
    prompt: 'Auto repair technician using computerized OBD diagnostic equipment on a modern vehicle in a professional shop, photorealistic',
  },
  {
    file: 'website-design-for-auto-repair-shops-2.jpg',
    prompt: 'Customer checking auto shop Google reviews and website on their phone in a clean waiting room area, photorealistic',
  },
  {
    file: 'website-design-for-auto-repair-shops-3.jpg',
    prompt: 'Auto repair shop website on a desktop showing service menu, online appointment booking, and customer reviews section, photorealistic',
  },

  // ── POST 26: website-design-for-lawyers ──────────────────────────────────
  {
    file: 'website-design-for-lawyers-thumb.jpg',
    prompt: 'Confident Detroit attorney in a tailored suit at a mahogany desk with law books and city view, professional portrait, photorealistic',
  },
  {
    file: 'website-design-for-lawyers-1.jpg',
    prompt: 'Prestigious law firm reception area with marble floors, dark wood paneling, and professional branding, Detroit high-rise building, photorealistic',
  },
  {
    file: 'website-design-for-lawyers-2.jpg',
    prompt: 'Attorney reviewing case documents at a conference table with gavel, scales of justice, and legal briefs, professional law office, photorealistic',
  },
  {
    file: 'website-design-for-lawyers-3.jpg',
    prompt: 'Law firm website on a laptop showing practice areas, attorney profiles, and client consultation booking form, photorealistic',
  },

  // ── POST 27: website-design-for-dentists ─────────────────────────────────
  {
    file: 'website-design-for-dentists-thumb.jpg',
    prompt: 'Modern Metro Detroit dental office reception with clean white aesthetic, bright lighting, professional decor, welcoming atmosphere, photorealistic',
  },
  {
    file: 'website-design-for-dentists-1.jpg',
    prompt: 'Dentist in white coat and gloves examining a patient in a state-of-the-art dental chair with bright examination lamp, photorealistic',
  },
  {
    file: 'website-design-for-dentists-2.jpg',
    prompt: 'Patient scheduling a dental appointment on their smartphone in the waiting room, dental office decor visible, photorealistic',
  },
  {
    file: 'website-design-for-dentists-3.jpg',
    prompt: 'Dental practice website on a monitor showing services, before and after smile gallery, and online patient intake form, photorealistic',
  },

  // ── POST 28: website-design-for-real-estate-agents ───────────────────────
  {
    file: 'website-design-for-real-estate-agents-thumb.jpg',
    prompt: 'Confident Metro Detroit real estate agent in business attire showing a beautiful suburban home to a couple of buyers, photorealistic',
  },
  {
    file: 'website-design-for-real-estate-agents-1.jpg',
    prompt: 'Professional realtor standing in front of a FOR SALE sign in an upscale Metro Detroit neighborhood, confident pose, photorealistic',
  },
  {
    file: 'website-design-for-real-estate-agents-2.jpg',
    prompt: 'Home buyer couple browsing property listings on a real estate agent website on a laptop at their kitchen table, photorealistic',
  },
  {
    file: 'website-design-for-real-estate-agents-3.jpg',
    prompt: 'Real estate agent website on a monitor showing property search, agent bio, and home valuation tool, modern interface, photorealistic',
  },

  // ── POST 29: website-design-for-gyms-and-fitness ─────────────────────────
  {
    file: 'website-design-for-gyms-and-fitness-thumb.jpg',
    prompt: 'State-of-the-art Detroit fitness studio with gleaming equipment, high ceilings, natural light, and motivational wall mural, photorealistic',
  },
  {
    file: 'website-design-for-gyms-and-fitness-1.jpg',
    prompt: 'Energetic group fitness class in a modern Detroit gym with diverse participants in a spacious bright studio, photorealistic',
  },
  {
    file: 'website-design-for-gyms-and-fitness-2.jpg',
    prompt: 'Gym member signing up for fitness classes on a gym website on their phone, standing near workout equipment, photorealistic',
  },
  {
    file: 'website-design-for-gyms-and-fitness-3.jpg',
    prompt: 'Fitness studio website on a laptop showing class schedule, membership options, trainer profiles, and gym tour photos, photorealistic',
  },

  // ── POST 30: how-to-get-more-google-reviews ───────────────────────────────
  {
    file: 'how-to-get-more-google-reviews-thumb.jpg',
    prompt: 'Five gold stars on a smartphone screen, happy customer leaving a glowing 5-star Google review for a local Detroit business, photorealistic',
  },
  {
    file: 'how-to-get-more-google-reviews-1.jpg',
    prompt: 'Satisfied customer at a local Detroit business smiling while typing a positive review on their phone, natural in-store setting, photorealistic',
  },
  {
    file: 'how-to-get-more-google-reviews-2.jpg',
    prompt: 'Business owner monitoring their Google Business Profile review dashboard showing 4.9 stars and 200+ reviews on a laptop, photorealistic',
  },
  {
    file: 'how-to-get-more-google-reviews-3.jpg',
    prompt: 'Google review request text message on a smartphone with a direct review link, local business follow-up strategy concept, photorealistic',
  },
];

async function generateImage(prompt) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      model: 'dall-e-3',
      prompt,
      n: 1,
      size: '1792x1024',
      quality: 'standard',
      response_format: 'url',
    });

    const options = {
      hostname: 'api.openai.com',
      path: '/v1/images/generations',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
        'Content-Length': Buffer.byteLength(data),
      },
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          if (response.error) {
            reject(new Error(response.error.message));
            return;
          }
          resolve(response.data[0].url);
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: 'GET',
      headers: { 'User-Agent': 'Node.js' },
    };

    const req = https.request(options, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
        return;
      }
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        fs.writeFileSync(filepath, Buffer.concat(chunks));
        resolve(filepath);
      });
    });
    req.on('error', reject);
    req.end();
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const total = IMAGE_PLAN.length;
  console.log(`Starting generation of ${total} images...`);

  let generated = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 0; i < IMAGE_PLAN.length; i++) {
    const { file, prompt } = IMAGE_PLAN[i];
    const filepath = path.join(OUT_DIR, file);

    // Skip if already exists (resumable)
    if (fs.existsSync(filepath)) {
      const stat = fs.statSync(filepath);
      if (stat.size > 50000) {
        console.log(`[${i + 1}/${total}] SKIP (exists): ${file}`);
        skipped++;
        continue;
      }
    }

    console.log(`[${i + 1}/${total}] Generating: ${file}`);

    let attempts = 0;
    let success = false;

    while (attempts < 3 && !success) {
      try {
        const url = await generateImage(prompt);
        await downloadImage(url, filepath);
        const stat = fs.statSync(filepath);
        console.log(`  ✓ Saved (${Math.round(stat.size / 1024)}KB)`);
        generated++;
        success = true;
      } catch (e) {
        attempts++;
        console.error(`  ✗ Attempt ${attempts} failed: ${e.message}`);
        if (e.message.includes('rate_limit') || e.message.includes('429')) {
          console.log('  Rate limited — waiting 60s...');
          await sleep(60000);
        } else if (attempts < 3) {
          await sleep(5000);
        }
      }
    }

    if (!success) {
      console.error(`  FAILED after 3 attempts: ${file}`);
      failed++;
    }

    // Throttle to avoid rate limits (max ~4 req/min to be safe)
    if (success && i < IMAGE_PLAN.length - 1) {
      await sleep(3000);
    }
  }

  console.log(`\nDone! Generated: ${generated}, Skipped: ${skipped}, Failed: ${failed}`);

  // Output the file list for the next step
  const files = IMAGE_PLAN.map((img) => img.file).filter((f) =>
    fs.existsSync(path.join(OUT_DIR, f))
  );
  fs.writeFileSync(
    path.join(OUT_DIR, 'generated-images.json'),
    JSON.stringify(files, null, 2)
  );
  console.log('Image list saved to public/blog/generated-images.json');
}

main().catch((e) => {
  console.error('Fatal error:', e);
  process.exit(1);
});
