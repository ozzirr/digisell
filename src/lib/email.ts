import type { Product } from "@/data/products";
import { createMagicAccessUrl } from "@/lib/auth/customer-access";
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
  const accessUrl = createMagicAccessUrl(to);

  return getResend().emails.send({
    from,
    to,
    subject: "Il tuo workbook You First è pronto",
    html: `
      <div style="font-family: Arial, sans-serif; color: #17201a; line-height: 1.6; max-width: 620px; margin: 0 auto;">
        <p>Grazie per il tuo acquisto.</p>
        <h1 style="font-size: 28px; line-height: 1.2;">${product.name}</h1>
        <p>Il tuo workbook è disponibile nella tua area personale. Puoi leggerlo, compilarlo e riprenderlo quando vuoi.</p>
        <p>
          <a href="${accessUrl}" style="display: inline-block; background: #17201a; color: #ffffff; padding: 14px 20px; border-radius: 999px; text-decoration: none; font-weight: 700;">
            Accedi alla tua area
          </a>
        </p>
        <p>Questo link è personale e temporaneo. Se scade, contattaci e ti aiutiamo.</p>
        <p>Supporto: <a href="mailto:${supportEmail}">${supportEmail}</a></p>
        <p style="font-size: 12px; color: #6b7280;">Sessione checkout: ${checkoutSessionId}</p>
      </div>
    `,
    text: [
      "Grazie per il tuo acquisto.",
      "",
      "Il tuo workbook è disponibile nella tua area personale.",
      `Accedi da qui: ${accessUrl}`,
      "",
      `Supporto: ${supportEmail}`,
      `Sessione checkout: ${checkoutSessionId}`,
    ].join("\n"),
  });
}
