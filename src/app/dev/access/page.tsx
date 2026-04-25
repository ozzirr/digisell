import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { products } from "@/data/products";
import { getWorkbookBySlug } from "@/data/workbooks";

export const metadata = {
  title: "Dev access | You First",
};

export default function DevAccessPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const testableProducts = products.filter((product) => getWorkbookBySlug(product.slug));

  return (
    <main className="min-h-screen bg-[#f8f2e8] px-4 py-10 text-[#211b17] sm:px-8">
      <section className="mx-auto max-w-3xl">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-[#7a4a40]">Solo sviluppo locale</p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-normal sm:text-6xl">
          Entra nella dashboard senza Stripe
        </h1>
        <p className="mt-5 text-lg font-semibold leading-8 text-[#5f544b]">
          Questa pagina crea un acquisto di test per <strong>test@youfirst.local</strong> e ti porta nella tua
          area personale. Non è disponibile in produzione.
        </p>
        <div className="mt-8 grid gap-4">
          {testableProducts.map((product) => (
            <article key={product.slug} className="rounded-[1.25rem] bg-white/70 p-5 shadow-[0_14px_40px_rgba(54,39,28,0.07)]">
              <h2 className="text-2xl font-black leading-tight">{product.shortName}</h2>
              <p className="mt-2 text-base font-semibold leading-7 text-[#5f544b]">{product.subtitle}</p>
              <a
                href={`/dev/access/grant?productSlug=${product.slug}`}
                className="mt-5 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#211b17] px-6 py-4 text-center text-base font-black text-white shadow-[0_18px_50px_rgba(33,27,23,0.22)] sm:w-auto"
              >
                <span className="text-white">Simula acquisto e apri dashboard</span>
                <ArrowRight className="h-5 w-5 text-white" aria-hidden />
              </a>
              <p className="mt-3 text-sm font-semibold leading-6 text-[#7a6c60]">
                Link diretto:{" "}
                <a className="font-black underline" href={`/dev/access/grant?productSlug=${product.slug}`}>
                  crea accesso test
                </a>
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
