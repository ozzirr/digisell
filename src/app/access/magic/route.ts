import { NextRequest, NextResponse } from "next/server";

import { setAccessCookie, verifyAccessToken } from "@/lib/auth/customer-access";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const payload = token ? verifyAccessToken(token) : null;

  if (!payload) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  await setAccessCookie(payload.email);

  return NextResponse.redirect(new URL("/dashboard", request.url));
}
