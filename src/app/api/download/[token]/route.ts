import { NextResponse } from "next/server";

import { resolveDownload } from "@/lib/file-delivery";

export const runtime = "nodejs";

type DownloadRouteProps = {
  params: Promise<{
    token: string;
  }>;
};

export async function GET(_request: Request, { params }: DownloadRouteProps) {
  const { token } = await params;
  const download = await resolveDownload(token);

  if (!download) {
    return NextResponse.json({ error: "This download link is invalid or expired." }, { status: 404 });
  }

  return new NextResponse(download.body, {
    headers: {
      "Content-Type": download.mimeType,
      "Content-Disposition": `attachment; filename="${download.fileName}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
