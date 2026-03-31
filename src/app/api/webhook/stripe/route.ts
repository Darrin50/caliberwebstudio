import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET || !process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Missing signature or webhook/Stripe secret" }, { status: 400 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const customerName = session.customer_details?.name ?? "Unknown";
    const customerEmail = session.customer_details?.email ?? "Unknown";
    const amountTotal = session.amount_total ? `$${(session.amount_total / 100).toFixed(2)}` : "Unknown";
    const currency = (session.currency ?? "usd").toUpperCase();
    const dateTime = new Date(session.created * 1000).toLocaleString("en-US", {
      timeZone: "America/Chicago",
      dateStyle: "full",
      timeStyle: "short",
    });

    // Determine plan name from line items (expand if available) or fall back to metadata
    let planName = "Unknown Plan";
    if (session.metadata?.plan) {
      const metaPlan = session.metadata.plan;
      const metaNames: Record<string, string> = {
        starter: "Starter Plan ($197/mo)",
        growth: "Growth Plan ($397/mo)",
        domination: "Domination Plan ($697/mo)",
        startup: "Startup Complete ($5,000 one-time)",
      };
      planName = metaNames[metaPlan] ?? metaPlan;
    } else {
      // Try to resolve from display_items or fall back to mode
      planName = session.mode === "subscription" ? "Subscription Plan" : "One-Time Payment";
    }

    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Caliber Web Studio <noreply@caliberwebstudio.com>",
        to: "darrin@caliberwebstudio.com",
        subject: `New Payment Received — ${planName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
            <h2 style="color: #0070f3;">New Payment Received</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 160px;">Customer Name</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${customerName}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Customer Email</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${customerEmail}">${customerEmail}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Plan Purchased</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${planName}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Amount Paid</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${amountTotal} ${currency}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Date / Time</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${dateTime} (CT)</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold;">Stripe Session ID</td>
                <td style="padding: 10px; font-size: 0.85em; color: #555;">${session.id}</td>
              </tr>
            </table>
            <p style="margin-top: 24px; color: #555; font-size: 0.9em;">
              Log in to the <a href="https://dashboard.stripe.com">Stripe Dashboard</a> for full transaction details.
            </p>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error("Failed to send payment notification email:", emailErr);
      // Don't return an error — Stripe will retry if we return non-200
    }
  }

  return NextResponse.json({ received: true });
}
