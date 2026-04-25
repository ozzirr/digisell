import { Logo } from "@/components/site/Logo";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function BrandHero() {
  return (
    <section className="relative overflow-hidden bg-[#f8f2e8] pb-20 pt-32 sm:pb-32 sm:pt-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="animate-fade-in inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 text-sm font-black uppercase tracking-[0.14em] text-[#b96f62] shadow-[0_4px_20px_rgba(185,111,98,0.1)]">
            <Sparkles className="h-4 w-4" />
            <span>Benvenuto nel mondo You First</span>
          </div>
          
          <h1 className="animate-fade-in stagger-1 mt-10 max-w-4xl text-[3.5rem] font-semibold leading-[0.95] tracking-tight text-[#211b17] sm:text-[6rem]">
            Metti te al primo posto. <br />
            <span className="text-[#b96f62]">Sempre.</span>
          </h1>
          
          <p className="animate-fade-in stagger-2 mt-8 max-w-2xl text-xl font-semibold leading-8 text-[#5f544b] sm:text-2xl">
            Workbook digitali e percorsi guidati per fare chiarezza quando il cuore ti confonde e ritrovare la tua bussola interiore.
          </p>
          
          <div className="animate-fade-in stagger-3 mt-12 flex flex-col items-center gap-6 sm:flex-row">
            <Link
              href="/auth/signup"
              className="group flex min-h-16 items-center justify-center gap-3 rounded-full bg-[#211b17] px-8 py-4 text-lg font-black !text-white shadow-[0_24px_60px_rgba(33,27,23,0.25)] transition hover:opacity-92"
            >
              <span className="!text-white">Inizia il tuo percorso</span>
              <ArrowRight className="h-5 w-5 !text-white transition group-hover:translate-x-1" />
            </Link>
            <Link
              href="/catalogo"
              className="text-lg font-black text-[#211b17] underline decoration-[#b96f62] decoration-4 underline-offset-8 transition hover:text-[#b96f62]"
            >
              Vedi tutti i workbook
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -left-20 top-40 h-80 w-80 rounded-full bg-[#b96f62]/5 blur-3xl" />
      <div className="absolute -right-20 top-60 h-96 w-96 rounded-full bg-[#59617f]/5 blur-3xl" />
    </section>
  );
}
