import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Stripe Price IDs (created in Stripe dashboard)
const PRICE_IDS: Record<string, string> = {
  starter:    "price_1TGOei3ssao1AlQ6SXhvA2Xu", // Starter Plan $197/mo
  growth:     "price_1TGOgD3ssao1AlQ6PusxEqvu", // Growth Plan $397/mo
  domination: "price_1TGOfX3ssao1AlQ6ICkoBWam", // Domination Plan $697/mo
  startup:    "price_1TGOgx3ssao1AlQ6uOOxc2Xi", // Startup Complete $5,000 one-time
};

export async function POST(req: NextRequest) {
  try {
    const { plan } = await req.json();

    const priceId = PRICE_IDS[plan as string];
    if (!priceId) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    // Subscriptions use "subscription" mode; one-time payments use "payment"
    const isOneTime = plan === "startup";

    const session = await stripe.checkout.sessions.create({
      mode: isOneTime ? "payment" : "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: "https://caliberwebstudio.com/thank-you?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "https://caliberwebstudio.com/pricing",
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
