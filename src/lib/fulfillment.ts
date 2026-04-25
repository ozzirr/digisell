import Stripe from "stripe";

import { getProductBySlug } from "@/data/products";
import { upsertCustomer, upsertPaidPurchase } from "@/lib/db/repository";
import { sendPurchaseEmail } from "@/lib/email";

export async function fulfillCheckoutSession(session: Stripe.Checkout.Session, options?: { sendEmail?: boolean }) {
  const productSlug = session.metadata?.productSlug;
  const product = productSlug ? getProductBySlug(productSlug) : null;
  const email = session.customer_details?.email || session.customer_email;
  const name = session.customer_details?.name || undefined;
  const stripeCustomerId = typeof session.customer === "string" ? session.customer : session.customer?.id;

  if (!productSlug || !product) {
    throw new Error(`Checkout session ${session.id} is missing a valid product slug.`);
  }

  if (!email) {
    throw new Error(`Checkout session ${session.id} is missing a customer email.`);
  }

  const customer = await upsertCustomer({ email, name });
  const purchase = await upsertPaidPurchase({
    customerId: customer.id,
    productSlug,
    stripeSessionId: session.id,
    stripeCustomerId,
  });

  if (options?.sendEmail !== false) {
    await sendPurchaseEmail({
      to: email,
      product,
      checkoutSessionId: session.id,
    });
  }

  return { customer, purchase, product };
}
