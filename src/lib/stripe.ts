import Stripe from "stripe";

let stripeClient: Stripe | null = null;

export function getStripe() {
  if (!stripeClient) {
    const secretKey = process.env.STRIPE_SECRET_KEY;

    if (!secretKey) {
      throw new Error("Missing required environment variable: STRIPE_SECRET_KEY");
    }

    stripeClient = new Stripe(secretKey, {
      apiVersion: "2025-08-27.basil",
      appInfo: {
        name: "DigiSell",
        version: "0.1.0",
      },
    });
  }

  return stripeClient;
}
