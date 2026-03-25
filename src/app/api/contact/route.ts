import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, businessName: business, phone, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Send email via Resend
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'Caliber Web Studio <onboarding@resend.dev>',
      to: ['darrin@caliberwebstudio.com'],
      reply_to: email,
      subject: `New Lead: ${name} — ${business || 'No business name'}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Business:</strong> ${business || 'N/A'}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr/>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    });

    // Also send confirmation to the lead
    await resend.emails.send({
      from: 'Caliber Web Studio <onboarding@resend.dev>',
      to: [email],
      subject: `We got your message, ${name.split(' ')[0]}! 🚀`,
      html: `
        <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;">
          <h1 style="color:#1E3D8F;">Measure. Design. Rise.</h1>
          <p>Hey ${name.split(' ')[0]},</p>
          <p>We received your message and will be in touch within 24 hours to discuss your project.</p>
          <p>In the meantime, check out some of our recent work at <a href="https://caliberwebstudio.com">caliberwebstudio.com</a>.</p>
          <p style="margin-top:32px;">— The Caliber Web Studio Team<br/>Detroit, MI</p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Message sent! We'll be in touch within 24 hours.",
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      {
        error: 'Failed to send message. Please email us directly at darrin@caliberwebstudio.com',
      },
      { status: 500 }
    );
  }
}
