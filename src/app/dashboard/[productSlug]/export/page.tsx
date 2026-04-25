import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { getProductBySlug } from "@/data/products";
import { getWorkbookBySlug } from "@/data/workbooks";
import { getCurrentCustomer } from "@/lib/auth/customer-access";
import { getPaidPurchase } from "@/lib/db/repository";

type ExportPageProps = {
  params: Promise<{
    productSlug: string;
  }>;
};

export default async function ExportPage({ params }: ExportPageProps) {
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

  return (
    <main className="min-h-screen bg-[#f8f2e8] px-4 py-8 text-[#211b17] sm:px-8">
      <section className="mx-auto flex min-h-[70vh] max-w-2xl flex-col justify-center">
        <Link href={`/dashboard/${productSlug}`} className="text-sm font-black text-[#6f6257]">
          You First · {workbook.title}
        </Link>
        <div className="mt-8 rounded-[1.5rem] bg-white/70 p-8 shadow-[0_18px_56px_rgba(54,39,28,0.08)]">
          <p className="text-sm font-black uppercase tracking-[0.16em]" style={{ color: product.accentDeep }}>
            Export PDF
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-normal">
            Presto potrai esportare le tue risposte in PDF stampabile.
          </h1>
          <p className="mt-5 text-lg font-semibold leading-8 text-[#5f544b]">
            Stiamo preparando una struttura per generare un PDF ordinato con risposte, riflessioni e schede
            stampabili.
          </p>
        </div>
      </section>
    </main>
  );
}
