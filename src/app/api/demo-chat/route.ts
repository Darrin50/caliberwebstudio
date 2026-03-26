import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { messages, businessName, businessType, phone, address, services } = await req.json();

    const systemPrompt = `You are the AI assistant for ${businessName}, a local ${businessType} business located at ${address}.

Your job is to help customers with questions, scheduling, pricing, and general information about the business.

Services offered: ${services}
Phone: ${phone}

Guidelines:
- Be friendly, warm, and helpful — like a real staff member
- Keep responses concise (2–3 sentences max)
- If someone wants to book or get pricing, encourage them to call ${phone} or use the booking form on the page
- If you don't know something specific, say "Give us a call at ${phone} and we'll be happy to help!"
- Don't make up specific prices or availability — encourage them to contact us directly
- Always stay in character as a representative of ${businessName}`;

    const OpenAI = (await import('openai')).default;
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.slice(-8),
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    const reply =
      response.choices[0]?.message?.content ||
      `Thanks for reaching out! Please give us a call at ${phone} and we'll be happy to help.`;

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Demo chat error:', error);
    return NextResponse.json({
      reply: `Sorry, I'm having trouble right now. Please give us a call and we'll get you sorted out right away!`,
    });
  }
}
