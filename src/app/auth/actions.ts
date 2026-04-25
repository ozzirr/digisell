"use server";

import { Resend } from "resend";
import { createMagicAccessUrl } from "@/lib/auth/customer-access";
import { updateCustomer, upsertCustomer } from "@/lib/db/repository";
import { Customer } from "@/lib/db/types";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function loginAction(email: string) {
  try {
    // 1. Create or update customer
    await upsertCustomer(email);

    // 2. Generate magic link
    const magicLink = createMagicAccessUrl(email);

    // 3. Send email via Resend
    if (process.env.NODE_ENV === "production") {
      const { error } = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "You First <onboarding@resend.dev>",
        to: email,
        subject: "Il tuo accesso a You First",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #211b17;">
            <h1 style="font-size: 24px; font-weight: 900; margin-bottom: 24px;">Ciao!</h1>
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 32px;">
              Clicca sul pulsante qui sotto per accedere alla tua area personale su You First. Il link è valido per 24 ore.
            </p>
            <a href="${magicLink}" style="display: inline-block; background-color: #211b17; color: #ffffff; padding: 16px 32px; border-radius: 100px; text-decoration: none; font-weight: 900; font-size: 16px;">
              Accedi ora
            </a>
            <p style="font-size: 14px; color: #7a6c60; margin-top: 40px;">
              Se non hai richiesto tu questo link, puoi tranquillamente ignorare questa email.
            </p>
          </div>
        `,
      });

      if (error) {
        console.error("Resend error:", error);
        return { success: false, error: "Impossibile inviare l'email. Riprova più tardi." };
      }
    } else {
      // In development, just log the link
      console.log("-----------------------------------------");
      console.log("DEV MAGIC LINK:", magicLink);
      console.log("-----------------------------------------");
    }

    return { success: true };
  } catch (err) {
    console.error("Login error:", err);
    return { success: false, error: "Errore durante il login." };
  }
}

export async function updateProfileAction(id: string, updates: Partial<Omit<Customer, "id" | "createdAt">>) {
  try {
    await updateCustomer(id, updates);
    return { success: true };
  } catch (err) {
    console.error("Update profile error:", err);
    return { success: false, error: "Errore durante l'aggiornamento del profilo." };
  }
}
