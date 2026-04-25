import { supabase } from "@/lib/db/supabase";
import type { Customer, Purchase, UserWorkbookAnswer, UserWorkbookProgress } from "@/lib/db/types";

function normalizeEmail(email: any) {
  if (typeof email !== "string") return "";
  return email.trim().toLowerCase();
}

function mapCustomerFromDb(row: any): Customer {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    gender: row.gender,
    age: row.age,
    createdAt: row.created_at,
  };
}

function mapCustomerToDb(customer: Partial<Customer>): any {
  const row: any = {};
  if (customer.id) row.id = customer.id;
  if (customer.email) row.email = customer.email;
  if (customer.name !== undefined) row.name = customer.name;
  if (customer.gender !== undefined) row.gender = customer.gender;
  if (customer.age !== undefined) row.age = customer.age;
  return row;
}

export async function getCustomer(id: string): Promise<Customer | null> {
  const { data, error } = await supabase.from("customers").select("*").eq("id", id).single();

  if (error || !data) return null;
  return mapCustomerFromDb(data);
}

export async function getCustomerByEmail(email: string): Promise<Customer | null> {
  const { data, error } = await supabase.from("customers").select("*").eq("email", normalizeEmail(email)).single();

  if (error || !data) return null;
  return mapCustomerFromDb(data);
}

export async function upsertCustomer(email: string, name?: string): Promise<Customer> {
  const { data, error } = await supabase
    .from("customers")
    .upsert({ email: normalizeEmail(email), name }, { onConflict: "email" })
    .select()
    .single();

  if (error) throw error;
  return mapCustomerFromDb(data);
}

export async function updateCustomer(id: string, updates: Partial<Omit<Customer, "id" | "createdAt">>): Promise<Customer> {
  const { data, error } = await supabase
    .from("customers")
    .update(mapCustomerToDb(updates))
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return mapCustomerFromDb(data);
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
