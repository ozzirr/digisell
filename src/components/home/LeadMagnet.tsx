"use client";

import { useState } from "react";
import { ArrowRight, BookOpen, Check } from "lucide-react";
import { loginAction } from "@/app/auth/actions";
import Image from "next/image";

export function LeadMagnet() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    await loginAction(email);
    setStatus("success");
  }

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#f0ddd7] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#69372f]">
              <BookOpen className="h-4 w-4" />
              <span>Risorsa Gratuita</span>
            </div>
            <h2 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
              Non sai da dove iniziare? <br />
              <span className="text-[#b96f62]">Scarica il manuale.</span>
            </h2>
            <p className="mt-8 text-lg font-semibold leading-8 text-[#5f544b]">
              "Primi Passi: Il tuo kit di sopravvivenza emotiva". 15 pagine di esercizi pratici per fermarti, respirare e fare ordine nei tuoi pensieri adesso.
            </p>
            
            <ul className="mt-8 space-y-4">
              <li className="flex items-center gap-3 text-base font-bold text-[#6f6257]">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f0ddd7] text-[#69372f]">
                  <Check className="h-4 w-4" />
                </div>
                <span>Esercizio di sblocco immediato</span>
              </li>
              <li className="flex items-center gap-3 text-base font-bold text-[#6f6257]">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f0ddd7] text-[#69372f]">
                  <Check className="h-4 w-4" />
                </div>
                <span>La matrice delle priorità emotive</span>
              </li>
              <li className="flex items-center gap-3 text-base font-bold text-[#6f6257]">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f0ddd7] text-[#69372f]">
                  <Check className="h-4 w-4" />
                </div>
                <span>Checklist: "Cosa sento davvero?"</span>
              </li>
            </ul>
          </div>
          
          <div className="animate-fade-in stagger-2 rounded-[2.5rem] bg-[#f8f2e8] p-8 sm:p-12 shadow-[0_40px_100px_rgba(33,27,23,0.08)]">
            {status === "success" ? (
              <div className="text-center py-10">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white text-[#b96f62] shadow-xl">
                  <Check className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-black">Email inviata!</h3>
                <p className="mt-4 text-[#5f544b] font-semibold leading-7">
                  Controlla la tua posta (anche lo spam). Troverai il link per accedere alla tua area e scaricare il manuale.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-black italic">Iniziamo da qui.</h3>
                  <p className="mt-2 text-sm font-bold text-[#7a6c60]">Inserisci la tua mail per ricevere il kit gratuito.</p>
                </div>
                <div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="La tua email migliore"
                    className="w-full rounded-2xl border-0 bg-white px-5 py-5 text-base font-semibold text-[#211b17] shadow-[inset_0_0_0_1px_rgba(62,48,38,0.12)] outline-none transition focus:shadow-[inset_0_0_0_2px_#b96f62]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex w-full min-h-16 items-center justify-center gap-2 rounded-full bg-[#211b17] px-6 py-4 text-lg font-black !text-white shadow-[0_20px_50px_rgba(33,27,23,0.22)] transition hover:opacity-92 disabled:opacity-50"
                >
                  <span className="!text-white">{status === "loading" ? "Inviando..." : "Invia il manuale ora"}</span>
                  <ArrowRight className="h-5 w-5 !text-white" />
                </button>
                <p className="text-center text-xs font-semibold text-[#7a6c60]">
                  Entrando riceverai anche spunti periodici di riflessione. Puoi disiscriverti quando vuoi.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
