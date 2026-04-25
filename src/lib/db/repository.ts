import { randomUUID } from "crypto";

import type { Customer, Purchase, UserWorkbookAnswer, UserWorkbookProgress } from "@/lib/db/types";
import { readDb, updateDb } from "@/lib/db/json-store";

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function upsertCustomer(input: { email: string; name?: string | null }) {
  const email = normalizeEmail(input.email);

  return updateDb((db) => {
    let customer = db.customers.find((item) => item.email === email);

    if (!customer) {
      customer = {
        id: randomUUID(),
        email,
        name: input.name || undefined,
        createdAt: new Date().toISOString(),
      };
      db.customers.push(customer);
      return customer;
    }

    if (input.name && !customer.name) {
      customer.name = input.name;
    }

    return customer;
  });
}

export async function upsertPaidPurchase(input: {
  customerId: string;
  productSlug: string;
  stripeSessionId: string;
  stripeCustomerId?: string | null;
}) {
  return updateDb((db) => {
    let purchase = db.purchases.find((item) => item.stripeSessionId === input.stripeSessionId);

    if (!purchase) {
      purchase = {
        id: randomUUID(),
        customerId: input.customerId,
        productSlug: input.productSlug,
        stripeSessionId: input.stripeSessionId,
        stripeCustomerId: input.stripeCustomerId || undefined,
        status: "paid",
        createdAt: new Date().toISOString(),
      };
      db.purchases.push(purchase);
      return purchase;
    }

    purchase.status = "paid";
    purchase.customerId = input.customerId;
    purchase.productSlug = input.productSlug;
    purchase.stripeCustomerId = input.stripeCustomerId || purchase.stripeCustomerId;

    return purchase;
  });
}

export async function getCustomerByEmail(email: string) {
  const db = await readDb();
  return db.customers.find((customer) => customer.email === normalizeEmail(email)) || null;
}

export async function getCustomerPurchases(customerId: string) {
  const db = await readDb();
  return db.purchases.filter((purchase) => purchase.customerId === customerId && purchase.status === "paid");
}

export async function getPaidPurchase(customerId: string, productSlug: string) {
  const db = await readDb();
  return (
    db.purchases.find(
      (purchase) =>
        purchase.customerId === customerId &&
        purchase.productSlug === productSlug &&
        purchase.status === "paid",
    ) || null
  );
}

export async function getProgress(customerId: string, productSlug: string) {
  const db = await readDb();
  return (
    db.progress.find((item) => item.customerId === customerId && item.productSlug === productSlug) || {
      customerId,
      productSlug,
      completedPages: [],
      updatedAt: new Date().toISOString(),
    }
  );
}

export async function getAnswers(customerId: string, productSlug: string) {
  const db = await readDb();
  return db.answers.filter((answer) => answer.customerId === customerId && answer.productSlug === productSlug);
}

export async function saveWorkbookAnswers(input: {
  customerId: string;
  productSlug: string;
  pageId: string;
  answers: Array<Pick<UserWorkbookAnswer, "promptId" | "answer">>;
  currentPageId: string;
  completedPage?: boolean;
}) {
  const now = new Date().toISOString();

  return updateDb((db) => {
    for (const item of input.answers) {
      const existing = db.answers.find(
        (answer) =>
          answer.customerId === input.customerId &&
          answer.productSlug === input.productSlug &&
          answer.pageId === input.pageId &&
          answer.promptId === item.promptId,
      );

      if (existing) {
        existing.answer = item.answer;
        existing.updatedAt = now;
      } else {
        db.answers.push({
          customerId: input.customerId,
          productSlug: input.productSlug,
          pageId: input.pageId,
          promptId: item.promptId,
          answer: item.answer,
          updatedAt: now,
        });
      }
    }

    let progress = db.progress.find(
      (item) => item.customerId === input.customerId && item.productSlug === input.productSlug,
    );

    if (!progress) {
      progress = {
        customerId: input.customerId,
        productSlug: input.productSlug,
        completedPages: [],
        updatedAt: now,
      };
      db.progress.push(progress);
    }

    progress.currentPageId = input.currentPageId;
    progress.updatedAt = now;

    if (input.completedPage && !progress.completedPages.includes(input.pageId)) {
      progress.completedPages.push(input.pageId);
    }

    return progress;
  });
}

export type CustomerWithPurchases = Customer & {
  purchases: Purchase[];
  progress: UserWorkbookProgress[];
};
