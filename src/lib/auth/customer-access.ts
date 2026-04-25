import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

import { getAppUrl, requireEnv } from "@/lib/env";
import { getCustomerByEmail } from "@/lib/db/repository";

const cookieName = "you_first_access";
const tokenTtlMs = 1000 * 60 * 60 * 24 * 30;

type AccessPayload = {
  email: string;
  expiresAt: number;
};

function getAccessSecret() {
  const configuredSecret =
    process.env.ACCESS_LINK_SECRET || process.env.DOWNLOAD_LINK_SECRET || process.env.STRIPE_WEBHOOK_SECRET;

  if (configuredSecret) {
    return configuredSecret;
  }

  if (process.env.NODE_ENV !== "production") {
    return "you-first-local-dev-access-secret";
  }

  return requireEnv("STRIPE_WEBHOOK_SECRET");
}

function encode(value: unknown) {
  return Buffer.from(JSON.stringify(value)).toString("base64url");
}

function sign(payload: string) {
  return createHmac("sha256", getAccessSecret()).update(payload).digest("base64url");
}

export function createAccessToken(email: string, ttlMs = tokenTtlMs) {
  const payload = encode({
    email: email.trim().toLowerCase(),
    expiresAt: Date.now() + ttlMs,
  } satisfies AccessPayload);

  return `${payload}.${sign(payload)}`;
}

export function verifyAccessToken(token: string): AccessPayload | null {
  const [payload, signature] = token.split(".");

  if (!payload || !signature) {
    return null;
  }

  const expected = sign(payload);
  const providedBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (providedBuffer.length !== expectedBuffer.length || !timingSafeEqual(providedBuffer, expectedBuffer)) {
    return null;
  }

  const decoded = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as AccessPayload;

  if (decoded.expiresAt < Date.now()) {
    return null;
  }

  return decoded;
}

export function createMagicAccessUrl(email: string) {
  return `${getAppUrl()}/access/magic?token=${createAccessToken(email)}`;
}

export async function setAccessCookie(email: string) {
  const cookieStore = await cookies();

  cookieStore.set(cookieName, createAccessToken(email), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: Math.floor(tokenTtlMs / 1000),
  });
}

export async function getCurrentCustomer() {
  const token = (await cookies()).get(cookieName)?.value;

  if (!token) {
    return null;
  }

  const payload = verifyAccessToken(token);

  if (!payload) {
    return null;
  }

  return getCustomerByEmail(payload.email);
}
