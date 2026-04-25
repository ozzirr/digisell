import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { SiteMenu } from "@/components/site/SiteMenu";
import { DashboardTopBar } from "@/components/site/DashboardTopBar";
import { getProductBySlug } from "@/data/products";
import { getWorkbookBySlug, getWorkbookPages } from "@/data/workbooks";
import { getCurrentCustomer } from "@/lib/auth/customer-access";
import { getPaidPurchase, getProgress } from "@/lib/db/repository";
import { getProgressPercent } from "@/lib/dashboard";

type ProductDashboardPageProps = {
  params: Promise<{
    productSlug: string;
  }>;
};

export default async function ProductDashboardPage({ params }: ProductDashboardPageProps) {
  const { productSlug } = await params;
  const customer = await getCurrentCustomer();

  if (!customer) {
    redirect("/");
  }

  const product = getProductBySlug(productSlug);
  const workbook = getWorkbookBySlug(productSlug);

  if (!product || !workbook) {
    notFound();
  }

  const purchase = await getPaidPurchase(customer.id, productSlug);

  if (!purchase) {
    redirect("/dashboard");
  }

  const progress = await getProgress(customer.id, productSlug);
  const pages = getWorkbookPages(workbook);
  const currentPageId = progress.currentPageId || pages[0]?.id;
  const progressPercent = getProgressPercent(productSlug, progress);

  return (
    <main className="min-h-screen bg-[#f8f2e8] px-4 py-8 text-[#211b17] sm:px-8">
      <section className="mx-auto max-w-5xl">
        <DashboardTopBar accentColor={product.accentColor} />
        <div className="mt-8 rounded-[1.6rem] bg-white/70 p-6 shadow-[0_18px_56px_rgba(54,39,28,0.08)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.16em]" style={{ color: product.accentDeep }}>
            Workbook acquistato
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-normal sm:text-6xl">
            {workbook.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg font-semibold leading-8 text-[#5f544b]">{workbook.subtitle}</p>
          <div className="mt-7">
            <div className="flex items-center justify-between text-sm font-black text-[#5f544b]">
              <span>Progressi</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-[#e6d9ca]">
              <div
                className="h-2 rounded-full"
                style={{ width: `${progressPercent}%`, backgroundColor: product.accentColor }}
              />
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/dashboard/${productSlug}/workbook?page=${currentPageId}`}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-black text-white transition hover:opacity-92"
              style={{ backgroundColor: "#211b17", color: "#ffffff" }}
            >
              <span style={{ color: "#ffffff" }}>Riprendi da dove eri rimasto</span>
              <ArrowRight className="h-4 w-4 text-white" aria-hidden />
            </Link>
            <Link
              href={`/dashboard/${productSlug}/export`}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#f2e8dc] px-6 py-3 text-sm font-black text-[#211b17]"
            >
              Esporta PDF
            </Link>
          </div>
        </div>
        <div className="mt-8 grid gap-4">
          {workbook.sections.map((section) => (
            <article key={section.id} className="rounded-[1.2rem] bg-white/62 p-5 shadow-[0_12px_34px_rgba(54,39,28,0.05)]">
              <h2 className="text-2xl font-semibold tracking-normal">{section.title}</h2>
              <p className="mt-2 text-base font-semibold leading-7 text-[#5f544b]">{section.description}</p>
              <div className="mt-5 grid gap-2">
                {section.pages.map((page) => (
                  <Link
                    key={page.id}
                    href={`/dashboard/${productSlug}/workbook?page=${page.id}`}
                    className="flex items-center justify-between rounded-2xl bg-[#f8f2e8] p-4 text-sm font-black"
                  >
                    <span>{page.title}</span>
                    <span style={{ color: product.accentDeep }}>
                      {progress.completedPages.includes(page.id) ? "Completata" : "Apri"}
                    </span>
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
