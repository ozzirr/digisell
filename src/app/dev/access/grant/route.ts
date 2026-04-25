import { notFound, redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

import { getProductBySlug } from "@/data/products";
import { setAccessCookie } from "@/lib/auth/customer-access";
import { upsertCustomer, upsertPaidPurchase } from "@/lib/db/repository";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const productSlug = request.nextUrl.searchParams.get("productSlug");
  const product = productSlug ? getProductBySlug(productSlug) : null;

  if (!productSlug || !product) {
    return NextResponse.redirect(new URL("/dev/access", request.url));
  }

  const customer = await upsertCustomer("test@youfirst.local", "Cliente test");

  await upsertPaidPurchase({
    customerId: customer.id,
    productSlug,
    stripeSessionId: `dev_${customer.id}_${productSlug}`,
    stripeCustomerId: "cus_dev_test",
  });

  await setAccessCookie(customer.email);

  redirect("/dashboard");
}
