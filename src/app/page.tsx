import { LandingPage } from "@/components/landing/LandingPage";
import { getCurrentCustomer } from "@/lib/auth/customer-access";
import { products } from "@/data/products";

export default async function Home() {
  const customer = await getCurrentCustomer();
  return <LandingPage product={products[0]} isAuthenticated={Boolean(customer)} />;
}
