import { NextResponse } from "next/server";

import { getProductBySlug } from "@/data/products";
import { getAppUrl } from "@/lib/env";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { productSlug?: string };
    const product = body.productSlug ? getProductBySlug(body.productSlug) : null;

    if (!product) {
      return NextResponse.json({ error: "Unknown product." }, { status: 404 });
    }

    const appUrl = getAppUrl();
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_creation: "if_required",
      allow_promotion_codes: true,
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/checkout/cancel`,
      metadata: {
        productSlug: product.slug,
      },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: product.currency,
            unit_amount: product.price,
            product_data: {
              name: product.title,
              description: product.subtitle,
              images: [`${appUrl}${product.coverImage}`],
              metadata: {
                productSlug: product.slug,
                fileKey: product.downloadable.fileKey,
              },
            },
          },
        },
      ],
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Failed to create Stripe Checkout session", error);

    return NextResponse.json(
      {
        error: "Checkout is not configured. Please contact support.",
      },
      { status: 500 },
    );
  }
}
