import { randomUUID } from "crypto";

import type { Customer, Purchase, UserWorkbookAnswer, UserWorkbookProgress } from "@/lib/db/types";
import { supabase } from "@/lib/db/supabase";

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function upsertCustomer(input: { email: string; name?: string | null }): Promise<Customer> {
  const email = normalizeEmail(input.email);

  const { data, error } = await supabase
    .from("customers")
    .upsert(
      {
        email,
        name: input.name || undefined,
      },
      { onConflict: "email" },
    )
    .select()
    .single();

  if (error) throw error;

  return {
    id: data.id,
    email: data.email,
    name: data.name,
    createdAt: data.created_at,
  };
}

export async function upsertPaidPurchase(input: {
  customerId: string;
  productSlug: string;
  stripeSessionId: string;
  stripeCustomerId?: string | null;
}): Promise<Purchase> {
  const { data, error } = await supabase
    .from("purchases")
    .upsert(
      {
        customer_id: input.customerId,
        product_slug: input.productSlug,
        stripe_session_id: input.stripeSessionId,
        stripe_customer_id: input.stripeCustomerId || undefined,
        status: "paid",
      },
      { onConflict: "stripe_session_id" },
    )
    .select()
    .single();

  if (error) throw error;

  return {
    id: data.id,
    customerId: data.customer_id,
    productSlug: data.product_slug,
    stripeSessionId: data.stripe_session_id,
    stripeCustomerId: data.stripe_customer_id,
    status: data.status,
    createdAt: data.created_at,
  };
}

export async function getCustomerByEmail(email: string): Promise<Customer | null> {
  const { data, error } = await supabase
    .from("customers")
    .select()
    .eq("email", normalizeEmail(email))
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // Not found
    throw error;
  }

  return {
    id: data.id,
    email: data.email,
    name: data.name,
    createdAt: data.created_at,
  };
}

export async function getCustomerPurchases(customerId: string): Promise<Purchase[]> {
  const { data, error } = await supabase
    .from("purchases")
    .select()
    .eq("customer_id", customerId)
    .eq("status", "paid");

  if (error) throw error;

  return data.map((item) => ({
    id: item.id,
    customerId: item.customer_id,
    productSlug: item.product_slug,
    stripeSessionId: item.stripe_session_id,
    stripeCustomerId: item.stripe_customer_id,
    status: item.status,
    createdAt: item.created_at,
  }));
}

export async function getPaidPurchase(customerId: string, productSlug: string): Promise<Purchase | null> {
  const { data, error } = await supabase
    .from("purchases")
    .select()
    .eq("customer_id", customerId)
    .eq("product_slug", productSlug)
    .eq("status", "paid")
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }

  return {
    id: data.id,
    customerId: data.customer_id,
    productSlug: data.product_slug,
    stripeSessionId: data.stripe_session_id,
    stripeCustomerId: data.stripe_customer_id,
    status: data.status,
    createdAt: data.created_at,
  };
}

export async function getProgress(customerId: string, productSlug: string): Promise<UserWorkbookProgress> {
  const { data, error } = await supabase
    .from("workbook_progress")
    .select()
    .eq("customer_id", customerId)
    .eq("product_slug", productSlug)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return {
        customerId,
        productSlug,
        completedPages: [],
        updatedAt: new Date().toISOString(),
      };
    }
    throw error;
  }

  return {
    customerId: data.customer_id,
    productSlug: data.product_slug,
    completedPages: data.completed_pages,
    currentPageId: data.current_page_id,
    updatedAt: data.updated_at,
  };
}

export async function getAnswers(customerId: string, productSlug: string): Promise<UserWorkbookAnswer[]> {
  const { data, error } = await supabase
    .from("workbook_answers")
    .select()
    .eq("customer_id", customerId)
    .eq("product_slug", productSlug);

  if (error) throw error;

  return data.map((item) => ({
    customerId: item.customer_id,
    productSlug: item.product_slug,
    pageId: item.page_id,
    promptId: item.prompt_id,
    answer: item.answer,
    updatedAt: item.updated_at,
  }));
}

export async function saveWorkbookAnswers(input: {
  customerId: string;
  productSlug: string;
  pageId: string;
  answers: Array<Pick<UserWorkbookAnswer, "promptId" | "answer">>;
  currentPageId: string;
  completedPage?: boolean;
}): Promise<UserWorkbookProgress> {
  // 1. Save answers
  if (input.answers.length > 0) {
    const { error: answersError } = await supabase.from("workbook_answers").upsert(
      input.answers.map((item) => ({
        customer_id: input.customerId,
        product_slug: input.productSlug,
        page_id: input.pageId,
        prompt_id: item.promptId,
        answer: item.answer,
        updated_at: new Date().toISOString(),
      })),
      { onConflict: "customer_id,product_slug,page_id,prompt_id" },
    );

    if (answersError) throw answersError;
  }

  // 2. Update progress
  const currentProgress = await getProgress(input.customerId, input.productSlug);
  const completedPages = [...currentProgress.completedPages];

  if (input.completedPage && !completedPages.includes(input.pageId)) {
    completedPages.push(input.pageId);
  }

  const { data, error: progressError } = await supabase
    .from("workbook_progress")
    .upsert(
      {
        customer_id: input.customerId,
        product_slug: input.productSlug,
        completed_pages: completedPages,
        current_page_id: input.currentPageId,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "customer_id,product_slug" },
    )
    .select()
    .single();

  if (progressError) throw progressError;

  return {
    customerId: data.customer_id,
    productSlug: data.product_slug,
    completedPages: data.completed_pages,
    currentPageId: data.current_page_id,
    updatedAt: data.updated_at,
  };
}

export type CustomerWithPurchases = Customer & {
  purchases: Purchase[];
  progress: UserWorkbookProgress[];
};
