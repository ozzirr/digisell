import { LandingPage } from "@/components/landing/LandingPage";
import { products } from "@/data/products";

export default function Home() {
  return <LandingPage product={products[0]} />;
}
