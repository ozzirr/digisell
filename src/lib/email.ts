import type { Product } from "@/data/products";
import { createSignedDownloadUrl } from "@/lib/download-links";
import { requireEnv } from "@/lib/env";
import { getResend } from "@/lib/resend";

type SendPurchaseEmailInput = {
  to: string;
  product: Product;
  checkoutSessionId: string;
};

export async function sendPurchaseEmail({ to, product, checkoutSessionId }: SendPurchaseEmailInput) {
  const from = requireEnv("RESEND_FROM_EMAIL");
  const supportEmail = process.env.SUPPORT_EMAIL || from;
  const downloadUrl = createSignedDownloadUrl(product.slug, product.downloadable.fileKey);

  return getResend().emails.send({
    from,
    to,
    subject: `Your ${product.title} is ready`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #17201a; line-height: 1.6; max-width: 620px; margin: 0 auto;">
        <p>Thank you for your purchase.</p>
        <h1 style="font-size: 28px; line-height: 1.2;">${product.title}</h1>
        <p>Your digital workbook is ready. Use the secure link below to download it:</p>
        <p>
          <a href="${downloadUrl}" style="display: inline-block; background: #17201a; color: #ffffff; padding: 14px 20px; border-radius: 999px; text-decoration: none; font-weight: 700;">
            Download your workbook
          </a>
        </p>
        <p>This link is temporary and generated for your order. If it expires, contact us and we will help.</p>
        <p>Support: <a href="mailto:${supportEmail}">${supportEmail}</a></p>
        <p style="font-size: 12px; color: #6b7280;">Checkout session: ${checkoutSessionId}</p>
      </div>
    `,
    text: [
      "Thank you for your purchase.",
      "",
      `${product.title} is ready.`,
      `Download link: ${downloadUrl}`,
      "",
      `Support: ${supportEmail}`,
      `Checkout session: ${checkoutSessionId}`,
    ].join("\n"),
  });
}
