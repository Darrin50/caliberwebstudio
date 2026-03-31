export interface CityData {
  name: string;
  slug: string;
  businessCount: number;
  paragraphs: string[];
  nearby: string[];
}

export const cities: CityData[] = [
  {
    name: 'Detroit',
    slug: 'detroit',
    businessCount: 7400,
    paragraphs: [
      "Detroit is one of America's great comeback cities — and its small businesses are at the heart of that resurgence. From the boutiques along Livernois Avenue of Fashion to the packed restaurants of Corktown and Eastern Market, Detroit entrepreneurs are building something real. But too many are still invisible online, losing customers to better-ranked competitors every single day.",
      "At Caliber Web Studio, we're rooted in Detroit. We know Midtown, Mexicantown, New Center, and the Woodward corridor. When we build a website for a Detroit business, we're not guessing at your audience — we're your neighbors, and we engineer sites designed to rank and convert.",
      "Whether you run a shop in Brightmoor, a salon in the West Village, or a restaurant off the Lodge Freeway, we'll build you a digital presence that makes your business the obvious choice in your neighborhood. Starting at $197/month with zero money down.",
    ],
    nearby: ['dearborn', 'southfield', 'warren', 'eastpointe', 'wyandotte'],
  },
  {
    name: 'Dearborn',
    slug: 'dearborn',
    businessCount: 1200,
    paragraphs: [
      "Dearborn is one of Metro Detroit's most dynamic business communities — home to a thriving business corridor along Michigan Avenue, Ford Motor Company's global headquarters, and a diverse ecosystem of restaurants, professional services, and retail. The opportunity here is enormous, but so is the competition.",
      "A professional website, strong Google Business Profile, and consistent review strategy can separate a Dearborn business from dozens of competitors still running outdated sites — or no site at all. Caliber Web Studio builds AI-powered growth systems that help Dearborn businesses rank for the searches that matter and convert visitors into loyal customers.",
    ],
    nearby: ['detroit', 'dearborn-heights', 'allen-park', 'lincoln-park', 'inkster'],
  },
  {
    name: 'Southfield',
    slug: 'southfield',
    businessCount: 950,
    paragraphs: [
      "Southfield is Metro Detroit's office capital — home to some of the highest concentrations of professional services firms in the region. Law firms, financial advisors, medical practices, staffing agencies, and tech companies cluster here, and the competition for visibility is fierce. In a market like this, your website is your first impression.",
      "Caliber Web Studio helps Southfield businesses cut through the noise with enterprise-grade websites that load fast, rank on Google, and capture leads automatically. Whether you're on Northwestern Highway, Telegraph Road, or tucked into one of Southfield's many business parks, we'll build the digital infrastructure you need to grow.",
    ],
    nearby: ['detroit', 'farmington-hills', 'bloomfield-hills', 'royal-oak', 'ferndale'],
  },
  {
    name: 'Troy',
    slug: 'troy',
    businessCount: 1100,
    paragraphs: [
      "Troy is one of Michigan's premier business addresses — a corporate hub packed with Fortune 500 offices, medical centers, law firms, and the Somerset Collection anchoring its retail scene. With so much economic activity and a highly affluent population, Troy businesses that invest in their digital presence see outsized returns.",
      "Caliber Web Studio builds websites that match the professionalism Troy customers expect. Clean, fast, and engineered for local search — your site will work as hard as you do, capturing leads from Google, qualifying prospects through AI chatbots, and building your reputation through automated review systems.",
    ],
    nearby: ['bloomfield-hills', 'auburn-hills', 'rochester-hills', 'warren', 'sterling-heights'],
  },
  {
    name: 'Royal Oak',
    slug: 'royal-oak',
    businessCount: 750,
    paragraphs: [
      "Royal Oak has one of the most vibrant downtowns in Metro Detroit — a walkable strip of independent restaurants, boutiques, bars, and galleries that draws visitors from across the region. But even the most beloved local spots need a digital presence that works when foot traffic slows and customers search online.",
      "Caliber Web Studio helps Royal Oak businesses look as sharp online as they do in person. From the Main Street corridor to the neighborhoods off Woodward, we build sites that rank, convert, and keep your calendar full year-round.",
    ],
    nearby: ['ferndale', 'southfield', 'troy', 'eastpointe', 'warren'],
  },
  {
    name: 'Ferndale',
    slug: 'ferndale',
    businessCount: 400,
    paragraphs: [
      "Ferndale punches well above its size — a compact, creative city with a thriving arts scene, eclectic restaurants, and a loyal local customer base. Businesses here benefit from strong community ties, but in 2025, community loyalty alone doesn't pay the bills. Google does.",
      "Caliber Web Studio helps Ferndale businesses turn their local reputation into online dominance — with fast, beautiful websites, automated review collection, and SEO systems that put you at the top of search results when customers nearby are looking for exactly what you offer.",
    ],
    nearby: ['royal-oak', 'southfield', 'detroit', 'eastpointe'],
  },
  {
    name: 'Warren',
    slug: 'warren',
    businessCount: 1800,
    paragraphs: [
      "Warren is Michigan's third-largest city and one of Metro Detroit's most important commercial corridors. From auto suppliers and manufacturers along the Van Dyke and Mound Road corridors to the restaurants, medical practices, and service businesses serving its large residential population, Warren's business community is diverse and competitive.",
      "Caliber Web Studio helps Warren businesses build the digital infrastructure that drives consistent growth — professional websites, Google visibility, AI-powered lead capture, and review automation that builds your reputation over time.",
    ],
    nearby: ['sterling-heights', 'roseville', 'eastpointe', 'detroit', 'clinton-township'],
  },
  {
    name: 'Sterling Heights',
    slug: 'sterling-heights',
    businessCount: 1700,
    paragraphs: [
      "Sterling Heights is a fast-growing suburban powerhouse with one of Metro Detroit's largest and most diverse populations. The Dodge, Mound, and Van Dyke corridors are packed with businesses — restaurants, medical offices, retail shops, contractors, and professional services all competing for the same local customers.",
      "Caliber Web Studio builds websites and growth systems that help Sterling Heights businesses rise to the top of Google searches and stay there. From lead-capturing AI chatbots to review automation, we give local businesses the digital edge that was previously only available to big brands.",
    ],
    nearby: ['warren', 'clinton-township', 'shelby-township', 'rochester-hills', 'troy'],
  },
  {
    name: 'Livonia',
    slug: 'livonia',
    businessCount: 1200,
    paragraphs: [
      "Livonia is one of Metro Detroit's largest and most established suburban communities — a city of strong homeowners, loyal local shoppers, and a business community that spans everything from auto repair to fine dining. The customers here know what they want and they search for it online before they ever walk through your door.",
      "Caliber Web Studio helps Livonia businesses win those searches with fast, professional websites, the SEO infrastructure to generate leads consistently, five-star reputation builders on Google, and AI systems that convert website visitors into paying customers.",
    ],
    nearby: ['westland', 'redford', 'farmington-hills', 'northville', 'plymouth'],
  },
  {
    name: 'Westland',
    slug: 'westland',
    businessCount: 1000,
    paragraphs: [
      "Westland's central location between Detroit and Ann Arbor makes it a natural hub for contractors, service businesses, retailers, and healthcare providers serving a wide swath of Wayne County. The competition is real, and customers here rely heavily on Google to find who to call.",
      "Caliber Web Studio builds Westland businesses the websites and digital growth systems they need to dominate local search — starting with a free mockup of your site so you can see exactly what you're getting before you commit to a penny.",
    ],
    nearby: ['livonia', 'redford', 'inkster', 'dearborn-heights', 'canton'],
  },
  {
    name: 'Redford',
    slug: 'redford',
    businessCount: 600,
    paragraphs: [
      "Redford's close-knit community and prime location between Detroit and Livonia make it an attractive market for local businesses — but word of mouth alone can't match the reach of a strong online presence. Customers search Google before they call, and businesses without a professional website are invisible to them.",
      "Caliber Web Studio helps Redford businesses get found, get clicks, and get calls — with modern, fast-loading websites and the local SEO tools your competitors haven't figured out yet.",
    ],
    nearby: ['livonia', 'westland', 'inkster', 'detroit'],
  },
  {
    name: 'Inkster',
    slug: 'inkster',
    businessCount: 350,
    paragraphs: [
      "Inkster is a community with strong character and a growing base of local entrepreneurs and service businesses. Like many Wayne County communities, businesses here often rely on reputation and referrals — but digital visibility is increasingly the difference between thriving and stagnating.",
      "Caliber Web Studio builds websites for Inkster businesses that level the playing field — professional, fast, and built to rank on Google so you get found by customers who are actively looking for what you offer.",
    ],
    nearby: ['westland', 'dearborn-heights', 'dearborn', 'taylor', 'redford'],
  },
  {
    name: 'Taylor',
    slug: 'taylor',
    businessCount: 800,
    paragraphs: [
      "Taylor sits at the heart of Downriver, a major crossroads for South Metro Detroit commerce. Restaurants, contractors, auto shops, medical offices, and retail businesses serve a large and loyal customer base — but competition from both Detroit and the outer suburbs keeps the pressure on.",
      "Caliber Web Studio helps Taylor businesses stand out online with professional websites, Google-first SEO, and review systems that build lasting reputation. We build your digital presence so you can focus on doing great work.",
    ],
    nearby: ['lincoln-park', 'allen-park', 'wyandotte', 'inkster', 'dearborn-heights'],
  },
  {
    name: 'Dearborn Heights',
    slug: 'dearborn-heights',
    businessCount: 700,
    paragraphs: [
      "Dearborn Heights is a large, diverse community bordering Dearborn, Westland, and Inkster — and its business corridor is packed with restaurants, medical practices, auto services, and neighborhood shops serving a mix of families, professionals, and retirees.",
      "Caliber Web Studio helps Dearborn Heights businesses compete and win online with modern websites, targeted local SEO, and AI-powered lead capture. Whether you're on Telegraph Road or a side-street gem, we'll make sure customers can find you.",
    ],
    nearby: ['dearborn', 'westland', 'inkster', 'livonia', 'redford'],
  },
  {
    name: 'Allen Park',
    slug: 'allen-park',
    businessCount: 350,
    paragraphs: [
      "Allen Park is a tight-knit Downriver community with strong local loyalty and a mix of restaurants, service businesses, and professionals who have served the same neighbors for decades. But loyalty doesn't generate new customers — Google does, and most Allen Park businesses are barely visible there.",
      "Caliber Web Studio builds Allen Park businesses the websites they need to expand beyond word-of-mouth and get found by the thousands of nearby residents searching for local services every day.",
    ],
    nearby: ['lincoln-park', 'taylor', 'wyandotte', 'dearborn', 'dearborn-heights'],
  },
  {
    name: 'Lincoln Park',
    slug: 'lincoln-park',
    businessCount: 480,
    paragraphs: [
      "Lincoln Park is a working-class Downriver city with a loyal local consumer base and a business community that includes restaurants, auto services, retail, and a growing number of service professionals. The customers here are value-driven and do their research online before spending money.",
      "Caliber Web Studio builds websites that help Lincoln Park businesses look credible, trustworthy, and easy to hire — with local SEO that puts you in front of Downriver customers exactly when they're searching for what you offer.",
    ],
    nearby: ['allen-park', 'taylor', 'wyandotte', 'downriver', 'dearborn-heights'],
  },
  {
    name: 'Wyandotte',
    slug: 'wyandotte',
    businessCount: 330,
    paragraphs: [
      "Wyandotte has one of the most charming downtowns in the Downriver area — a riverfront city with a walkable business district, family restaurants, boutique shops, and a community that takes pride in shopping local. A strong digital presence can make a real difference for businesses competing for those loyal customers.",
      "Caliber Web Studio helps Wyandotte businesses build websites that match the quality of their brand — fast, professional, and optimized to rank on Google so you capture both the walk-in traffic and the 'near me' searches that drive customers through your door.",
    ],
    nearby: ['lincoln-park', 'allen-park', 'taylor', 'downriver'],
  },
  {
    name: 'Downriver',
    slug: 'downriver',
    businessCount: 2800,
    paragraphs: [
      "The Downriver area — encompassing Wyandotte, Lincoln Park, Allen Park, Taylor, and dozens of communities along the Detroit River — represents one of Metro Detroit's largest and most underserved business markets. Thousands of small businesses here rely on foot traffic and referrals while competitors with stronger online presences siphon off customers every day.",
      "Caliber Web Studio specializes in building digital growth systems for Downriver businesses. Whether you're a contractor, restaurant, medical provider, or retail shop, we build websites that rank in local search, capture leads automatically, and build the kind of online reputation that keeps your phone ringing.",
      "From the waterfront communities to the inland neighborhoods, every Downriver business deserves the same enterprise-grade digital infrastructure we build for corporations — at a local business price.",
    ],
    nearby: ['wyandotte', 'lincoln-park', 'allen-park', 'taylor'],
  },
  {
    name: 'Eastpointe',
    slug: 'eastpointe',
    businessCount: 420,
    paragraphs: [
      "Eastpointe sits at the eastern edge of Detroit, bordering Roseville and Warren in a high-traffic corridor home to restaurants, auto services, retail, and medical practices serving both Macomb and Wayne County residents.",
      "Caliber Web Studio helps Eastpointe businesses get visible online with professional websites and local SEO strategies built for this market. We know what Metro Detroit customers search for — and we build sites that show up when they do.",
    ],
    nearby: ['roseville', 'warren', 'detroit', 'clinton-township'],
  },
  {
    name: 'Roseville',
    slug: 'roseville',
    businessCount: 600,
    paragraphs: [
      "Roseville is a busy Macomb County hub with major commercial strips along Gratiot Avenue and a business community that includes auto dealers, restaurants, contractors, retailers, and healthcare providers. Competition here is steady, and customers increasingly find businesses through Google before walking in.",
      "Caliber Web Studio builds Roseville businesses the websites and digital infrastructure they need to rank, get found, and capture leads consistently — with AI chatbots, review automation, and local SEO baked in from the start.",
    ],
    nearby: ['eastpointe', 'warren', 'clinton-township', 'sterling-heights'],
  },
  {
    name: 'Clinton Township',
    slug: 'clinton-township',
    businessCount: 1250,
    paragraphs: [
      "Clinton Township is one of Macomb County's largest and fastest-growing communities — a sprawling township with major retail corridors along Garfield, Gratiot, and Hall Road. With over 100,000 residents and growing, the market here is huge, but so is the competition.",
      "Caliber Web Studio helps Clinton Township businesses stand out in a crowded market with enterprise-grade websites, AI-powered lead capture, and local SEO built specifically for this area. We know the Hall Road corridor and we know how to make your business the first call customers make.",
    ],
    nearby: ['sterling-heights', 'roseville', 'warren', 'shelby-township', 'rochester-hills'],
  },
  {
    name: 'Shelby Township',
    slug: 'shelby-township',
    businessCount: 950,
    paragraphs: [
      "Shelby Township is one of Metro Detroit's most affluent and fastest-growing suburban communities — a township with above-average household income, a growing restaurant and retail scene, and a population that does extensive research online before making purchasing decisions.",
      "Caliber Web Studio builds Shelby Township businesses websites that reflect the quality of their services and the expectations of their upscale clientele. Professional, fast, and built to rank on Google — with the review automation tools to build the five-star reputation your business deserves.",
    ],
    nearby: ['clinton-township', 'sterling-heights', 'rochester-hills', 'auburn-hills'],
  },
  {
    name: 'Rochester Hills',
    slug: 'rochester-hills',
    businessCount: 920,
    paragraphs: [
      "Rochester Hills is a highly educated, affluent Oakland County community home to Stellantis technical centers, Oakland University, and a thriving business ecosystem of restaurants, medical practices, professional services, and retailers catering to one of Metro Detroit's highest-income demographics.",
      "Caliber Web Studio helps Rochester Hills businesses build digital presences that match their quality and appeal to their discerning clientele. We build websites that rank, convert, and reflect the professionalism your customers expect before they ever pick up the phone.",
    ],
    nearby: ['auburn-hills', 'shelby-township', 'troy', 'sterling-heights', 'bloomfield-hills'],
  },
  {
    name: 'Auburn Hills',
    slug: 'auburn-hills',
    businessCount: 350,
    paragraphs: [
      "Auburn Hills is Michigan's automotive and technology hub — home to Stellantis, BorgWarner, and dozens of global suppliers — but it's also home to a growing community of restaurants, retailers, and service businesses catering to the engineers, executives, and families who live and work here.",
      "Caliber Web Studio builds Auburn Hills businesses the websites and digital infrastructure to compete for local search visibility in this high-income, high-competition Oakland County market.",
    ],
    nearby: ['rochester-hills', 'pontiac', 'bloomfield-hills', 'troy'],
  },
  {
    name: 'Pontiac',
    slug: 'pontiac',
    businessCount: 770,
    paragraphs: [
      "Pontiac is one of Michigan's most historic cities — the birthplace of the Pontiac automobile and a community in the midst of a genuine revitalization. New restaurants, arts venues, and service businesses are emerging alongside long-established players, and the competition for local customers is intensifying.",
      "Caliber Web Studio helps Pontiac businesses build credible, professional digital presences that attract new customers and showcase the quality that Pontiac's growing business community offers. We build sites that rank and convert in this market.",
    ],
    nearby: ['auburn-hills', 'bloomfield-hills', 'rochester-hills'],
  },
  {
    name: 'Bloomfield Hills',
    slug: 'bloomfield-hills',
    businessCount: 200,
    paragraphs: [
      "Bloomfield Hills is one of Michigan's most affluent communities — a city where expectations are high, competition is premium-tier, and customers are accustomed to excellence. Businesses serving this market can't afford to look anything less than exceptional online.",
      "Caliber Web Studio builds websites for Bloomfield Hills businesses that command the respect and trust their clientele expect — fast, sophisticated, and engineered to rank at the top of search results in one of Oakland County's most competitive markets.",
    ],
    nearby: ['southfield', 'farmington-hills', 'troy', 'auburn-hills', 'pontiac'],
  },
  {
    name: 'Farmington Hills',
    slug: 'farmington-hills',
    businessCount: 1000,
    paragraphs: [
      "Farmington Hills is one of Metro Detroit's most prosperous suburban cities — a diverse, upscale community with major commercial corridors along Northwestern Highway, Orchard Lake Road, and 12 Mile Road. Medical practices, professional services, restaurants, and retailers all compete for a high-spending, digitally-savvy customer base.",
      "Caliber Web Studio helps Farmington Hills businesses build the online infrastructure that converts searchers into customers — with fast, professional websites, local SEO, and AI-powered lead capture systems built for this market.",
    ],
    nearby: ['bloomfield-hills', 'southfield', 'novi', 'livonia', 'northville'],
  },
  {
    name: 'Novi',
    slug: 'novi',
    businessCount: 700,
    paragraphs: [
      "Novi has transformed into one of Metro Detroit's most dynamic commercial hubs — anchored by Twelve Oaks Mall and the Expo Center, with a sprawling mix of restaurants, retail, auto dealerships, healthcare providers, and corporate offices. The customer base here is affluent, mobile, and heavily dependent on Google for discovery.",
      "Caliber Web Studio helps Novi businesses rank at the top of local search and convert website visitors into paying customers — with professional websites, local SEO, and AI-powered growth systems built for one of Oakland County's most competitive markets.",
    ],
    nearby: ['farmington-hills', 'northville', 'plymouth', 'canton', 'westland'],
  },
  {
    name: 'Canton',
    slug: 'canton',
    businessCount: 1250,
    paragraphs: [
      "Canton Township has grown into one of Metro Detroit's largest and most prosperous suburban communities — a sprawling township with major commercial corridors along Ford Road, Canton Center Road, and Cherry Hill. With nearly 100,000 residents and a rapidly expanding business base, Canton is one of the most competitive local markets in Wayne County.",
      "Caliber Web Studio builds Canton businesses the websites and growth systems to compete and win in this market. Professional design, local SEO, AI chatbots, and review automation — everything you need to make your business the obvious choice when Canton residents search for what you offer.",
    ],
    nearby: ['plymouth', 'northville', 'novi', 'westland', 'livonia'],
  },
  {
    name: 'Plymouth',
    slug: 'plymouth',
    businessCount: 200,
    paragraphs: [
      "Plymouth has one of the most beloved downtowns in Metro Detroit — a charming, walkable city center packed with independent restaurants, boutiques, and professional services that draw visitors from across Wayne and Washtenaw counties. But even the most beloved local business needs a professional digital presence to capture customers who discover it through Google first.",
      "Caliber Web Studio helps Plymouth businesses look as polished online as they do on Kellogg Park — with fast, professional websites that rank on Google and turn curious visitors into loyal customers.",
    ],
    nearby: ['northville', 'canton', 'novi', 'livonia'],
  },
  {
    name: 'Northville',
    slug: 'northville',
    businessCount: 180,
    paragraphs: [
      "Northville is one of Metro Detroit's most charming small cities — a historic downtown with specialty shops, acclaimed restaurants, and professional services competing for a highly affluent, discerning customer base. In a market where reputation is everything, your digital presence has to match your real-world quality.",
      "Caliber Web Studio builds Northville businesses websites that command trust and reflect the premium experience their customers expect — paired with SEO and review systems that keep them visible and competitive in this high-end market.",
    ],
    nearby: ['plymouth', 'canton', 'novi', 'farmington-hills', 'livonia'],
  },
  {
    name: 'Ann Arbor',
    slug: 'ann-arbor',
    businessCount: 1500,
    paragraphs: [
      "Ann Arbor is Michigan's most educated and innovative city — home to the University of Michigan, a world-class research ecosystem, and one of the most vibrant small business communities in the Midwest. Restaurants, boutiques, tech companies, healthcare providers, and professional services all compete in an incredibly dynamic market.",
      "Caliber Web Studio extends its Metro Detroit expertise west to Ann Arbor — building websites, SEO systems, and AI-powered growth infrastructure for businesses in this market. Fast, professional, and engineered to rank in one of Michigan's most competitive local search environments.",
    ],
    nearby: ['plymouth', 'canton', 'northville'],
  },
];

export function getCityBySlug(slug: string): CityData | undefined {
  return cities.find((c) => c.slug === slug);
}

export function getAllSlugs(): string[] {
  return cities.map((c) => c.slug);
}
