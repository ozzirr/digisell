import { createHmac, timingSafeEqual } from "crypto";

import { getAppUrl, requireEnv } from "@/lib/env";

type DownloadTokenPayload = {
  productSlug: string;
  fileKey: string;
  expiresAt: number;
};

function getSigningSecret() {
  return process.env.DOWNLOAD_LINK_SECRET || process.env.STRIPE_WEBHOOK_SECRET || "you-first-download-secret-fallback";
}

function encodeBase64Url(value: string) {
  return Buffer.from(value).toString("base64url");
}

function signPayload(encodedPayload: string) {
  return createHmac("sha256", getSigningSecret()).update(encodedPayload).digest("base64url");
}

export function createDownloadToken(payload: DownloadTokenPayload) {
  const encodedPayload = encodeBase64Url(JSON.stringify(payload));
  const signature = signPayload(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export function createSignedDownloadUrl(productSlug: string, fileKey: string) {
  const token = createDownloadToken({
    productSlug,
    fileKey,
    expiresAt: Date.now() + 1000 * 60 * 60 * 24,
  });

  return `${getAppUrl()}/api/download/${token}`;
}

export function verifyDownloadToken(token: string): DownloadTokenPayload | null {
  const [encodedPayload, signature] = token.split(".");

  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = signPayload(encodedPayload);
  const provided = Buffer.from(signature);
  const expected = Buffer.from(expectedSignature);

  if (provided.length !== expected.length || !timingSafeEqual(provided, expected)) {
    return null;
  }

  const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")) as DownloadTokenPayload;

  if (payload.expiresAt < Date.now()) {
    return null;
  }

  return payload;
}
