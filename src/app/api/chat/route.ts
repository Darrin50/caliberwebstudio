import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are the AI assistant for Caliber Web Studio, a Detroit-based web agency owned by High Caliber Operations LLC. You help potential clients understand our services and pricing.

Key info:
- We build AI-powered websites for local businesses
- Pricing: Starter $197/mo, Growth $397/mo, Domination $697/mo — all $0 down, no contracts
- Services: AI website, AI chatbot, Google Business Profile optimization, review automation, social content, analytics dashboard
- We serve Detroit and surrounding areas but work with businesses nationwide
- Tagline: "Measure. Design. Rise."
- Contact: hello@caliberwebstudio.com

Be friendly, knowledgeable, and focused on qualifying leads. If someone seems interested, encourage them to fill out the contact form or email hello@caliberwebstudio.com. Keep responses concise (2-3 sentences max).`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const OpenAI = (await import('openai')).default;
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.slice(-10), // Keep last 10 messages for context
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    const reply =
      response.choices[0]?.message?.content ||
      "I'd love to help! Please email us at hello@caliberwebstudio.com";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({
      reply:
        "I'm having trouble right now. Please email us at hello@caliberwebstudio.com and we'll respond within 24 hours!",
    });
  }
}
