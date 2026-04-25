export type Customer = {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
};

export type PurchaseStatus = "paid" | "pending" | "failed";

export type Purchase = {
  id: string;
  customerId: string;
  productSlug: string;
  stripeSessionId: string;
  stripeCustomerId?: string;
  status: PurchaseStatus;
  createdAt: string;
};

export type UserWorkbookProgress = {
  customerId: string;
  productSlug: string;
  completedPages: string[];
  currentPageId?: string;
  updatedAt: string;
};

export type UserWorkbookAnswer = {
  customerId: string;
  productSlug: string;
  pageId: string;
  promptId: string;
  answer: string;
  updatedAt: string;
};

export type AppDatabase = {
  customers: Customer[];
  purchases: Purchase[];
  progress: UserWorkbookProgress[];
  answers: UserWorkbookAnswer[];
};
