import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

import { fulfillCheckoutSession } from "@/lib/fulfillment";
import { setAccessCookie } from "@/lib/auth/customer-access";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.redirect(new URL("/checkout/cancel", request.url));
  }

  const session = await getStripe().checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== "paid" && session.status !== "complete") {
    return NextResponse.redirect(new URL("/checkout/cancel", request.url));
  }

  const { customer } = await fulfillCheckoutSession(session, { sendEmail: false });
  await setAccessCookie(customer.email);

  redirect("/dashboard");
}
