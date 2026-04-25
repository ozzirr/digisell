import Link from "next/link";
import { ArrowRight, BookOpenText } from "lucide-react";

import { SiteMenu } from "@/components/site/SiteMenu";
import { getCurrentCustomer } from "@/lib/auth/customer-access";
import { products, formatPrice } from "@/data/products";

export const metadata = {
  title: "Catalogo workbook",
  description: "Tutti i workbook digitali You First per fare chiarezza nei momenti emotivi difficili.",
};

export default async function CatalogPage() {
  const customer = await getCurrentCustomer();
  const isAuthenticated = Boolean(customer);

  return (
    <main className="min-h-screen bg-[#f8f2e8] pb-20 text-[#211b17]">
      <header className="sticky top-0 z-40 border-b border-[#dfd2c2]/70 bg-[#f8f2e8]/92 px-4 backdrop-blur-xl sm:px-8">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4">
          <Link href="/" className="group inline-flex items-center gap-3" aria-label="You First">
            <span className="relative text-xl font-black tracking-normal text-[#211b17]">
              You First
              <span className="absolute -bottom-1 left-0 h-[3px] w-9 rounded-full bg-[#b96f62] transition group-hover:w-16" />
            </span>
          </Link>
          <SiteMenu isAuthenticated={isAuthenticated} />
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 pt-10 sm:px-8 sm:pt-14">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-[#7a6c60]">Catalogo</p>
        <h1 className="mt-3 text-[2.4rem] font-semibold leading-[1.02] tracking-normal sm:text-5xl">
          Tutti i workbook You First
        </h1>
        <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-[#5f544b] sm:text-lg">
          Scegli il percorso più vicino al momento che stai vivendo. Ogni workbook è digitale, online e ti
          accompagna passo dopo passo.
        </p>
      </section>

      <section className="mx-auto mt-8 grid max-w-6xl gap-5 px-4 sm:px-8 lg:grid-cols-3">
        {products.map((product) => (
          <article
            key={product.slug}
            className="overflow-hidden rounded-[1.35rem] bg-white/76 shadow-[0_18px_56px_rgba(54,39,28,0.08)]"
          >
            <div className="h-2" style={{ backgroundColor: product.accentColor }} />
            <div className="p-5 sm:p-6">
              <p className="inline-flex items-center gap-2 rounded-full bg-[#f8f2e8] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#7a6c60]">
                <BookOpenText className="h-4 w-4" aria-hidden />
                Workbook digitale
              </p>
              <h2 className="mt-4 text-[1.6rem] font-semibold leading-[1.05] tracking-normal sm:text-3xl">
                {product.shortName}
              </h2>
              <p className="mt-3 text-sm font-semibold leading-6 text-[#5f544b]">{product.subtitle}</p>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-xl font-black" style={{ color: product.accentDeep }}>
                  {formatPrice(product)}
                </span>
                <Link
                  href={`/${product.slug}`}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-black text-white"
                  style={{ backgroundColor: "#211b17" }}
                >
                  <span style={{ color: "#ffffff" }}>Scopri</span>
                  <ArrowRight className="h-4 w-4 text-white" aria-hidden />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
