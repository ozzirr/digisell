import { getProductBySlug } from "@/data/products";
import { getWorkbookBySlug, getWorkbookPages } from "@/data/workbooks";
import type { Purchase, UserWorkbookProgress } from "@/lib/db/types";

export function getProgressPercent(productSlug: string, progress?: UserWorkbookProgress | null) {
  const workbook = getWorkbookBySlug(productSlug);

  if (!workbook) {
    return 0;
  }

  const pages = getWorkbookPages(workbook);

  if (pages.length === 0) {
    return 0;
  }

  return Math.round(((progress?.completedPages.length || 0) / pages.length) * 100);
}

export function buildPurchasedProducts(
  purchases: Purchase[],
  progress: UserWorkbookProgress[],
) {
  return purchases
    .map((purchase) => {
      const product = getProductBySlug(purchase.productSlug);
      const workbook = getWorkbookBySlug(purchase.productSlug);
      const productProgress = progress.find((item) => item.productSlug === purchase.productSlug);

      if (!product || !workbook) {
        return null;
      }

      return {
        purchase,
        product,
        workbook,
        progress: productProgress || null,
        progressPercent: getProgressPercent(product.slug, productProgress),
      };
    })
    .filter((item) => item !== null);
}
