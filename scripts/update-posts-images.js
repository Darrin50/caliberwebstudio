/**
 * Updates posts.ts to:
 * 1. Add thumbnail field to each post (pointing to /blog/{slug}-thumb.jpg)
 * 2. Replace all inline <img> src URLs with local DALL-E image paths
 * 3. Insert a 3rd inline image at a natural break point in each post
 */

const fs = require('fs');
const path = require('path');

const POSTS_FILE = path.join(__dirname, '../src/app/blog/posts.ts');

// Map of slug → [img1, img2, img3] local paths
const POST_IMAGES = {
  'best-web-designer-detroit': ['/blog/best-web-designer-detroit-1.jpg', '/blog/best-web-designer-detroit-2.jpg', '/blog/best-web-designer-detroit-3.jpg'],
  'affordable-website-design-detroit': ['/blog/affordable-website-design-detroit-1.jpg', '/blog/affordable-website-design-detroit-2.jpg', '/blog/affordable-website-design-detroit-3.jpg'],
  'detroit-web-design-agency-vs-freelancer': ['/blog/detroit-web-design-agency-vs-freelancer-1.jpg', '/blog/detroit-web-design-agency-vs-freelancer-2.jpg', '/blog/detroit-web-design-agency-vs-freelancer-3.jpg'],
  'why-detroit-small-businesses-need-a-website': ['/blog/why-detroit-small-businesses-need-a-website-1.jpg', '/blog/why-detroit-small-businesses-need-a-website-2.jpg', '/blog/why-detroit-small-businesses-need-a-website-3.jpg'],
  'how-caliber-web-studio-helps-detroit-businesses': ['/blog/how-caliber-web-studio-helps-detroit-businesses-1.jpg', '/blog/how-caliber-web-studio-helps-detroit-businesses-2.jpg', '/blog/how-caliber-web-studio-helps-detroit-businesses-3.jpg'],
  'how-much-does-a-small-business-website-cost': ['/blog/how-much-does-a-small-business-website-cost-1.jpg', '/blog/how-much-does-a-small-business-website-cost-2.jpg', '/blog/how-much-does-a-small-business-website-cost-3.jpg'],
  'why-cheap-websites-cost-more': ['/blog/why-cheap-websites-cost-more-1.jpg', '/blog/why-cheap-websites-cost-more-2.jpg', '/blog/why-cheap-websites-cost-more-3.jpg'],
  'whats-included-in-197-per-month-website': ['/blog/whats-included-in-197-per-month-website-1.jpg', '/blog/whats-included-in-197-per-month-website-2.jpg', '/blog/whats-included-in-197-per-month-website-3.jpg'],
  'is-paying-monthly-for-a-website-worth-it': ['/blog/is-paying-monthly-for-a-website-worth-it-1.jpg', '/blog/is-paying-monthly-for-a-website-worth-it-2.jpg', '/blog/is-paying-monthly-for-a-website-worth-it-3.jpg'],
  'roi-of-a-professional-website': ['/blog/roi-of-a-professional-website-1.jpg', '/blog/roi-of-a-professional-website-2.jpg', '/blog/roi-of-a-professional-website-3.jpg'],
  'what-is-an-ai-chatbot-for-business': ['/blog/what-is-an-ai-chatbot-for-business-1.jpg', '/blog/what-is-an-ai-chatbot-for-business-2.jpg', '/blog/what-is-an-ai-chatbot-for-business-3.jpg'],
  'how-ai-is-changing-local-business-marketing': ['/blog/how-ai-is-changing-local-business-marketing-1.jpg', '/blog/how-ai-is-changing-local-business-marketing-2.jpg', '/blog/how-ai-is-changing-local-business-marketing-3.jpg'],
  'what-is-aeo-answer-engine-optimization': ['/blog/what-is-aeo-answer-engine-optimization-1.jpg', '/blog/what-is-aeo-answer-engine-optimization-2.jpg', '/blog/what-is-aeo-answer-engine-optimization-3.jpg'],
  'what-is-geo-generative-engine-optimization': ['/blog/what-is-geo-generative-engine-optimization-1.jpg', '/blog/what-is-geo-generative-engine-optimization-2.jpg', '/blog/what-is-geo-generative-engine-optimization-3.jpg'],
  'how-to-show-up-in-chatgpt-and-perplexity': ['/blog/how-to-show-up-in-chatgpt-and-perplexity-1.jpg', '/blog/how-to-show-up-in-chatgpt-and-perplexity-2.jpg', '/blog/how-to-show-up-in-chatgpt-and-perplexity-3.jpg'],
  'local-seo-guide-for-small-businesses': ['/blog/local-seo-guide-for-small-businesses-1.jpg', '/blog/local-seo-guide-for-small-businesses-2.jpg', '/blog/local-seo-guide-for-small-businesses-3.jpg'],
  'how-to-get-on-first-page-of-google': ['/blog/how-to-get-on-first-page-of-google-1.jpg', '/blog/how-to-get-on-first-page-of-google-2.jpg', '/blog/how-to-get-on-first-page-of-google-3.jpg'],
  'google-business-profile-optimization': ['/blog/google-business-profile-optimization-1.jpg', '/blog/google-business-profile-optimization-2.jpg', '/blog/google-business-profile-optimization-3.jpg'],
  'what-is-schema-markup': ['/blog/what-is-schema-markup-1.jpg', '/blog/what-is-schema-markup-2.jpg', '/blog/what-is-schema-markup-3.jpg'],
  'why-small-business-websites-dont-rank': ['/blog/why-small-business-websites-dont-rank-1.jpg', '/blog/why-small-business-websites-dont-rank-2.jpg', '/blog/why-small-business-websites-dont-rank-3.jpg'],
  'website-design-for-barbers': ['/blog/website-design-for-barbers-1.jpg', '/blog/website-design-for-barbers-2.jpg', '/blog/website-design-for-barbers-3.jpg'],
  'website-design-for-plumbers-contractors': ['/blog/website-design-for-plumbers-contractors-1.jpg', '/blog/website-design-for-plumbers-contractors-2.jpg', '/blog/website-design-for-plumbers-contractors-3.jpg'],
  'website-design-for-salons': ['/blog/website-design-for-salons-1.jpg', '/blog/website-design-for-salons-2.jpg', '/blog/website-design-for-salons-3.jpg'],
  'website-design-for-restaurants': ['/blog/website-design-for-restaurants-1.jpg', '/blog/website-design-for-restaurants-2.jpg', '/blog/website-design-for-restaurants-3.jpg'],
  'website-design-for-auto-repair-shops': ['/blog/website-design-for-auto-repair-shops-1.jpg', '/blog/website-design-for-auto-repair-shops-2.jpg', '/blog/website-design-for-auto-repair-shops-3.jpg'],
  'website-design-for-lawyers': ['/blog/website-design-for-lawyers-1.jpg', '/blog/website-design-for-lawyers-2.jpg', '/blog/website-design-for-lawyers-3.jpg'],
  'website-design-for-dentists': ['/blog/website-design-for-dentists-1.jpg', '/blog/website-design-for-dentists-2.jpg', '/blog/website-design-for-dentists-3.jpg'],
  'website-design-for-real-estate-agents': ['/blog/website-design-for-real-estate-agents-1.jpg', '/blog/website-design-for-real-estate-agents-2.jpg', '/blog/website-design-for-real-estate-agents-3.jpg'],
  'website-design-for-gyms-and-fitness': ['/blog/website-design-for-gyms-and-fitness-1.jpg', '/blog/website-design-for-gyms-and-fitness-2.jpg', '/blog/website-design-for-gyms-and-fitness-3.jpg'],
  'how-to-get-more-google-reviews': ['/blog/how-to-get-more-google-reviews-1.jpg', '/blog/how-to-get-more-google-reviews-2.jpg', '/blog/how-to-get-more-google-reviews-3.jpg'],
};

// Alt text for the 3rd image per post (the inserted one)
const THIRD_IMAGE_ALTS = {
  'best-web-designer-detroit': 'Professional website design displayed on multiple devices',
  'affordable-website-design-detroit': 'Revenue growth chart showing website investment returns',
  'detroit-web-design-agency-vs-freelancer': 'Business owner signing a web design contract',
  'why-detroit-small-businesses-need-a-website': 'Customer discovering a local business through their website',
  'how-caliber-web-studio-helps-detroit-businesses': 'Business growth strategy planning in a modern office',
  'how-much-does-a-small-business-website-cost': 'Stack of money next to a professional website on laptop',
  'why-cheap-websites-cost-more': 'Business owner paying unexpected fees after a cheap website fails',
  'whats-included-in-197-per-month-website': 'Business owner reviewing monthly website performance report',
  'is-paying-monthly-for-a-website-worth-it': 'Investment growth graph showing monthly website returns',
  'roi-of-a-professional-website': 'Detroit business owner reviewing website ROI with accountant',
  'what-is-an-ai-chatbot-for-business': 'Customer receiving instant answers from AI chatbot at night',
  'how-ai-is-changing-local-business-marketing': 'Local business team reviewing AI marketing results',
  'what-is-aeo-answer-engine-optimization': 'Business website FAQ page optimized for answer engines',
  'what-is-geo-generative-engine-optimization': 'Split screen showing traditional search vs AI-generated results',
  'how-to-show-up-in-chatgpt-and-perplexity': 'AI assistant recommending a local business on smartphone',
  'local-seo-guide-for-small-businesses': 'Detroit neighborhood map with local businesses in search results',
  'how-to-get-on-first-page-of-google': 'Business owner celebrating first page Google ranking',
  'google-business-profile-optimization': 'Business owner uploading photos to Google Business Profile',
  'what-is-schema-markup': 'Google Rich Results Test showing successful schema validation',
  'why-small-business-websites-dont-rank': 'Analytics dashboard showing traffic increase after SEO fixes',
  'website-design-for-barbers': 'Barbershop website displayed on laptop and mobile',
  'website-design-for-plumbers-contractors': 'Homeowner finding local plumber on phone',
  'website-design-for-salons': 'Beautiful salon website on MacBook showing services and booking',
  'website-design-for-restaurants': 'Restaurant website showing menu and reservation system on laptop',
  'website-design-for-auto-repair-shops': 'Auto repair shop website with online appointment booking',
  'website-design-for-lawyers': 'Law firm website on a monitor showing practice areas and attorney profiles',
  'website-design-for-dentists': 'Dental practice website showing services and online patient intake form',
  'website-design-for-real-estate-agents': 'Real estate agent website showing property search and listings',
  'website-design-for-gyms-and-fitness': 'Fitness studio website showing class schedule and memberships',
  'how-to-get-more-google-reviews': 'Google review request text message on a smartphone',
};

function processPost(slug, content, images) {
  let updated = content;
  let imgIndex = 0;

  // Replace existing img src URLs (keeping alt text but updating src)
  updated = updated.replace(/<img([^>]*?)src="[^"]*?"([^>]*?)>/g, (match, before, after) => {
    if (imgIndex < 2) {
      const newSrc = images[imgIndex];
      imgIndex++;
      // Extract and keep the alt attribute
      const altMatch = match.match(/alt="([^"]*)"/);
      const alt = altMatch ? altMatch[1] : `${slug} illustration`;
      return `<img src="${newSrc}" alt="${alt}" style="width:100%;border-radius:12px;margin:32px 0;" />`;
    }
    return match; // Leave any extra images as-is
  });

  // Insert 3rd image before the last <h2> section (if there is one)
  const thirdImg = images[2];
  const thirdAlt = THIRD_IMAGE_ALTS[slug] || 'Professional illustration';
  const thirdImgTag = ` <img src="${thirdImg}" alt="${thirdAlt}" style="width:100%;border-radius:12px;margin:32px 0;" /> `;

  // Find the last <h2> before the final paragraph/conclusion section
  const h2Matches = [...updated.matchAll(/<h2>/g)];
  if (h2Matches.length >= 2) {
    // Insert before the second-to-last h2
    const targetIndex = h2Matches[Math.floor(h2Matches.length / 2)].index;
    updated = updated.slice(0, targetIndex) + thirdImgTag + updated.slice(targetIndex);
  } else {
    // Fallback: insert near the end, before the final <p> block
    const lastH2 = updated.lastIndexOf('<h2>');
    if (lastH2 > 0) {
      updated = updated.slice(0, lastH2) + thirdImgTag + updated.slice(lastH2);
    }
  }

  return updated;
}

function main() {
  console.log('Reading posts.ts...');
  let source = fs.readFileSync(POSTS_FILE, 'utf8');

  // Backup
  fs.writeFileSync(POSTS_FILE + '.bak', source);
  console.log('Backup saved to posts.ts.bak');

  let updatedCount = 0;

  for (const [slug, images] of Object.entries(POST_IMAGES)) {
    const thumbnail = `/blog/${slug}-thumb.jpg`;

    // 1. Add thumbnail field after the slug field
    const slugPattern = `"slug": "${slug}"`;
    if (!source.includes(slugPattern)) {
      console.warn(`WARNING: slug not found: ${slug}`);
      continue;
    }

    // Only add thumbnail if not already present
    if (!source.includes(`"slug": "${slug}",\n    "thumbnail"`)) {
      source = source.replace(
        `"slug": "${slug}",`,
        `"slug": "${slug}",\n    "thumbnail": "${thumbnail}",`
      );
    }

    // 2. Update content images for this post
    // Find the content block for this slug
    // Content is a template literal: "content": `...`
    // We'll extract and replace the content for this specific slug's post block

    // Find the start and end of this post's content template literal
    const slugPos = source.indexOf(`"slug": "${slug}"`);
    if (slugPos === -1) continue;

    // Find the "content": ` start after this slug
    const contentStart = source.indexOf('"content": `', slugPos);
    if (contentStart === -1) continue;

    // Find the matching closing backtick
    let depth = 0;
    let i = contentStart + 12; // skip '"content": `'
    let contentEnd = -1;

    // Simple backtick search (no nested template literals expected in content)
    while (i < source.length) {
      if (source[i] === '\\') {
        i += 2; // skip escaped char
        continue;
      }
      if (source[i] === '`') {
        contentEnd = i;
        break;
      }
      i++;
    }

    if (contentEnd === -1) {
      console.warn(`WARNING: could not find content end for ${slug}`);
      continue;
    }

    const contentValue = source.slice(contentStart + 12, contentEnd);
    const updatedContent = processPost(slug, contentValue, images);

    source = source.slice(0, contentStart + 12) + updatedContent + source.slice(contentEnd);

    updatedCount++;
    console.log(`✓ Updated: ${slug}`);
  }

  // Write updated file
  fs.writeFileSync(POSTS_FILE, source);
  console.log(`\nDone! Updated ${updatedCount} posts.`);
  console.log('posts.ts has been updated with DALL-E image paths.');
}

main();
