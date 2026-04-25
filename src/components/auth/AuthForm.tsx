"use client";

import { useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { loginAction } from "@/app/auth/actions";

export function AuthForm({ mode = "login" }: { mode?: "login" | "signup" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const result = await loginAction(email);
      if (result.success) {
        setStatus("success");
        setMessage("Controlla la tua email! Ti abbiamo inviato un link magico per accedere.");
      } else {
        setStatus("error");
        setMessage(result.error || "Qualcosa è andato storto. Riprova più tardi.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Errore di connessione. Riprova.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[1.5rem] bg-white/70 p-8 text-center shadow-[0_20px_60px_rgba(33,27,23,0.08)]">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#f0ddd7] text-[#69372f]">
          <Mail className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-semibold text-[#211b17]">Email inviata</h2>
        <p className="mt-3 text-[#5f544b] leading-7">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-black uppercase tracking-[0.12em] text-[#7a6c60] mb-2">
          La tua email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="nome@esempio.it"
          className="w-full rounded-2xl border-0 bg-white px-5 py-4 text-base font-semibold text-[#211b17] shadow-[inset_0_0_0_1px_rgba(62,48,38,0.12)] outline-none transition focus:shadow-[inset_0_0_0_2px_#b96f62]"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="flex w-full min-h-14 items-center justify-center gap-2 rounded-full bg-[#211b17] px-6 py-4 text-base font-black text-white shadow-[0_18px_50px_rgba(33,27,23,0.22)] transition hover:opacity-92 disabled:opacity-50"
      >
        <span className="text-white">{status === "loading" ? "Inviando..." : mode === "login" ? "Accedi all'area personale" : "Registrati e scarica il manuale"}</span>
        <ArrowRight className="h-5 w-5 text-white" />
      </button>
      {status === "error" && (
        <p className="text-sm font-bold text-red-600 text-center">{message}</p>
      )}
    </form>
  );
}
