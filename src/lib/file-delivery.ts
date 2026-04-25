import { getProductBySlug } from "@/data/products";

import { verifyDownloadToken } from "./download-links";

export async function resolveDownload(token: string) {
  const payload = verifyDownloadToken(token);

  if (!payload) {
    return null;
  }

  const product = getProductBySlug(payload.productSlug);

  if (!product || product.downloadable.fileKey !== payload.fileKey) {
    return null;
  }

  return {
    fileName: product.downloadable.fileName,
    mimeType: product.downloadable.mimeType,
    body:
      "This is a placeholder delivery response. Connect this abstraction to private object storage such as S3, Supabase Storage, or R2 and stream the purchased file here.",
  };
}
