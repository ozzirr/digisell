import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { getProductBySlug } from "@/data/products";
import { requireEnv } from "@/lib/env";
import { sendPurchaseEmail } from "@/lib/email";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const productSlug = session.metadata?.productSlug;
  const product = productSlug ? getProductBySlug(productSlug) : null;
  const email = session.customer_details?.email || session.customer_email;

  if (!productSlug || !product) {
    throw new Error(`Checkout session ${session.id} is missing a valid product slug.`);
  }

  if (!email) {
    throw new Error(`Checkout session ${session.id} is missing a customer email.`);
  }

  await sendPurchaseEmail({
    to: email,
    product,
    checkoutSessionId: session.id,
  });
}

export async function POST(request: Request) {
  const body = await request.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature." }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(body, signature, requireEnv("STRIPE_WEBHOOK_SECRET"));
  } catch (error) {
    console.error("Invalid Stripe webhook signature", error);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Failed to process Stripe webhook", {
      eventId: event.id,
      eventType: event.type,
      error,
    });

    return NextResponse.json({ error: "Webhook processing failed." }, { status: 500 });
  }
}
