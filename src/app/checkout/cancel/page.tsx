import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Checkout Canceled",
  description: "Return to the product page and continue checkout when ready.",
};

export default function CheckoutCancelPage() {
  return (
    <main className="min-h-screen px-5 py-16 sm:px-8">
      <section className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#b0614f]">
          Checkout canceled
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-[#17201a] sm:text-5xl">
          No payment was taken.
        </h1>
        <p className="mt-5 text-lg leading-8 text-[#5f685f]">
          You can return to the product page and complete the purchase whenever you are ready.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#d7cec1] bg-white/70 px-6 py-3 text-sm font-bold text-[#17201a] transition hover:border-[#17201a]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Return to product
        </Link>
      </section>
    </main>
  );
}
