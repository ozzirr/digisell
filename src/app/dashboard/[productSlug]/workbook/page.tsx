import { notFound, redirect } from "next/navigation";

import { WorkbookReader } from "@/components/workbook/WorkbookReader";
import { getProductBySlug } from "@/data/products";
import { getWorkbookBySlug, getWorkbookPages } from "@/data/workbooks";
import { getCurrentCustomer } from "@/lib/auth/customer-access";
import { getAnswers, getPaidPurchase, getProgress } from "@/lib/db/repository";

type WorkbookPageProps = {
  params: Promise<{
    productSlug: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function WorkbookPage({ params, searchParams }: WorkbookPageProps) {
  const { productSlug } = await params;
  const { page: pageId } = await searchParams;
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

  const pages = getWorkbookPages(workbook);
  const initialPageId = pages.some((page) => page.id === pageId) ? pageId! : pages[0].id;
  const [answers, progress] = await Promise.all([
    getAnswers(customer.id, productSlug),
    getProgress(customer.id, productSlug),
  ]);

  return (
    <WorkbookReader
      product={product}
      workbook={workbook}
      initialPageId={initialPageId}
      initialAnswers={answers}
      initialProgress={progress}
      customer={customer}
    />
  );
}
