import { NextRequest, NextResponse } from "next/server";

import { getWorkbookBySlug } from "@/data/workbooks";
import { getCurrentCustomer } from "@/lib/auth/customer-access";
import { getPaidPurchase, saveWorkbookAnswers } from "@/lib/db/repository";

export const runtime = "nodejs";

type AnswersRouteProps = {
  params: Promise<{
    productSlug: string;
  }>;
};

export async function POST(request: NextRequest, { params }: AnswersRouteProps) {
  const { productSlug } = await params;
  const customer = await getCurrentCustomer();

  if (!customer) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const [workbook, purchase] = await Promise.all([
    getWorkbookBySlug(productSlug),
    getPaidPurchase(customer.id, productSlug),
  ]);

  if (!workbook || !purchase) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const body = (await request.json()) as {
    pageId?: string;
    currentPageId?: string;
    completedPage?: boolean;
    answers?: Array<{ promptId?: string; answer?: string }>;
  };

  if (!body.pageId || !body.currentPageId || !Array.isArray(body.answers)) {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const progress = await saveWorkbookAnswers({
    customerId: customer.id,
    productSlug,
    pageId: body.pageId,
    currentPageId: body.currentPageId,
    completedPage: body.completedPage,
    answers: body.answers
      .filter((answer): answer is { promptId: string; answer: string } => Boolean(answer.promptId))
      .map((answer) => ({
        promptId: answer.promptId,
        answer: answer.answer || "",
      })),
  });

  return NextResponse.json(progress);
}
