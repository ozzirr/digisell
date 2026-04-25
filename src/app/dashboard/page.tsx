import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, BookOpenText, Clock3, ShieldCheck } from "lucide-react";

import { SiteMenu } from "@/components/site/SiteMenu";
import { DashboardTopBar } from "@/components/site/DashboardTopBar";
import { ProfileModal } from "@/components/dashboard/ProfileModal";
import { buildPurchasedProducts } from "@/lib/dashboard";
import { getCurrentCustomer } from "@/lib/auth/customer-access";
import { getCustomerPurchases, getProgress } from "@/lib/db/repository";

export const metadata = {
  title: "La tua area You First",
  description: "Accedi ai workbook You First che hai acquistato.",
};

export default async function DashboardPage() {
  const customer = await getCurrentCustomer();

  if (!customer) {
    redirect("/");
  }

  const purchases = await getCustomerPurchases(customer.id);
  const progress = await Promise.all(purchases.map((purchase) => getProgress(customer.id, purchase.productSlug)));
  const purchasedProducts = buildPurchasedProducts(purchases, progress);

  // Profile is complete if we have name, gender and age
  const isProfileComplete = !!(customer.name && customer.gender && customer.age);

  return (
    <main className="min-h-screen bg-[#f8f2e8] px-4 py-5 text-[#211b17] sm:px-8 sm:py-8">
      {!isProfileComplete && <ProfileModal customer={customer} />}

      <section className="mx-auto max-w-5xl">
        <DashboardTopBar />
        <DashboardWelcome customer={customer} />
        <div className="mt-5 sm:mt-7">
          {purchasedProducts.length === 0 ? (
            <div className="grid gap-6">
              <article className="overflow-hidden rounded-[1.35rem] bg-white shadow-[0_18px_56px_rgba(54,39,28,0.08)]">
                <div className="h-2 bg-[#b96f62]" />
                <div className="p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="inline-flex items-center gap-2 rounded-full bg-[#f8f2e8] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#7a6c60]">
                        <BookOpenText className="h-4 w-4" />
                        Risorsa gratuita
                      </p>
                      <h2 className="mt-4 text-[2rem] font-semibold leading-[1.03] tracking-normal sm:text-4xl">
                        Primi Passi: Kit di sopravvivenza
                      </h2>
                    </div>
                  </div>
                  <p className="mt-4 text-lg font-semibold leading-8 text-[#5f544b]">
                    Inizia da qui. Un piccolo percorso guidato per aiutarti a fermarti e respirare nei momenti di massima confusione.
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Link
                      href="/catalogo"
                      className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-[#211b17] px-8 py-4 text-base font-black text-white shadow-[0_18px_48px_rgba(33,27,23,0.18)] transition hover:opacity-92"
                    >
                      <span className="text-white">Scarica Manuale PDF</span>
                      <ArrowRight className="h-5 w-5 text-white" />
                    </Link>
                  </div>
                </div>
              </article>

              <div className="rounded-[1.4rem] bg-[#f0ddd7]/30 p-6 sm:p-8 border-2 border-dashed border-[#b96f62]/20">
                <h3 className="text-xl font-black text-[#69372f]">Ti senti bloccato/a?</h3>
                <p className="mt-2 text-[#5f544b] font-semibold">
                  I nostri workbook sono pensati per darti strumenti concreti. Dai un'occhiata al catalogo per trovare quello più adatto a te.
                </p>
                <Link href="/catalogo" className="mt-4 inline-flex font-black text-[#b96f62] underline underline-offset-4">
                  Vedi il catalogo completo
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {purchasedProducts.map(({ product, workbook, progressPercent }, idx) => (
                <article
                  key={product.slug}
                  className={`animate-fade-in stagger-${(idx % 3) + 1} overflow-hidden rounded-[1.35rem] bg-white/76 shadow-[0_18px_56px_rgba(54,39,28,0.08)]`}
                >
                  <div className="h-2" style={{ backgroundColor: product.accentColor }} />
                  <div className="p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="inline-flex items-center gap-2 rounded-full bg-[#f8f2e8] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#7a6c60]">
                          <BookOpenText className="h-4 w-4" aria-hidden />
                          Workbook online
                        </p>
                        <h2 className="mt-4 text-[2rem] font-semibold leading-[1.03] tracking-normal sm:text-4xl">
                          {workbook.title}
                        </h2>
                      </div>
                      <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#f8f2e8] text-lg font-black">
                        {progressPercent}%
                      </div>
                    </div>
                    <p className="mt-3 text-base font-semibold leading-7 text-[#5f544b]">{workbook.subtitle}</p>
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm font-black text-[#5f544b]">
                        <span>Progressi salvati</span>
                        <span>{progressPercent === 0 ? "Da iniziare" : `${progressPercent}% completato`}</span>
                      </div>
                      <div className="mt-2 h-2.5 rounded-full bg-[#e6d9ca]">
                        <div
                          className="h-2.5 rounded-full transition-all"
                          style={{ width: `${progressPercent}%`, backgroundColor: product.accentColor }}
                        />
                      </div>
                    </div>
                    <div className="mt-4 grid gap-2 text-sm font-bold text-[#6f6257] sm:grid-cols-2">
                      <p className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4" style={{ color: product.accentColor }} aria-hidden />
                        Risposte nella tua area
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock3 className="h-4 w-4" style={{ color: product.accentColor }} aria-hidden />
                        Riprendi quando vuoi
                      </p>
                    </div>
                    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                      <Link
                        href={`/dashboard/${product.slug}/workbook`}
                        className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-black text-white shadow-[0_18px_48px_rgba(33,27,23,0.18)] transition hover:opacity-92"
                        style={{ backgroundColor: "#211b17", color: "#ffffff" }}
                      >
                        <span style={{ color: "#ffffff" }}>Continua</span>
                        <ArrowRight className="h-5 w-5 text-white" aria-hidden />
                      </Link>
                      <Link
                        href={`/dashboard/${product.slug}`}
                        className="inline-flex min-h-13 items-center justify-center rounded-full bg-[#f2e8dc] px-6 py-3 text-base font-black text-[#211b17]"
                      >
                        Vedi indice
                      </Link>
                    </div>
                    <div className="mt-4 rounded-2xl bg-[#f8f2e8] p-4">
                      <p className="text-sm font-semibold leading-6 text-[#6f6257]">
                        Questo non è un file da cercare nelle email: il workbook resta qui, nella tua area
                        personale.
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function DashboardWelcome({ customer }: { customer: Customer }) {
  const greeting = customer.gender === "f" ? "Bentornata" : customer.gender === "m" ? "Bentornato" : "Bentornato/a";
  const displayName = customer.name ? `, ${customer.name}` : "";

  return (
    <div className="animate-fade-in mt-7 rounded-[1.5rem] bg-[#211b17] p-5 text-white shadow-[0_20px_70px_rgba(33,27,23,0.16)] sm:mt-9 sm:p-8">
      <p className="text-sm font-black uppercase tracking-[0.16em] text-[#e8d6cd]">{greeting}{displayName}</p>
      <h1 className="mt-3 text-[2.25rem] font-semibold leading-[0.98] tracking-normal sm:text-6xl">
        La tua area You First
      </h1>
      <p className="mt-3 max-w-2xl text-base font-semibold leading-7 text-white/72 sm:mt-4 sm:text-lg sm:leading-8">
        Qui trovi i workbook che hai acquistato, le risposte salvate e il punto da cui riprendere.
      </p>
      <p className="mt-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white/72 sm:mt-5">
        Accesso: {customer.email}
      </p>
    </div>
  );
}
