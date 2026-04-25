import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Payment Successful",
  description: "Your digital product payment was successful.",
};

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen px-5 py-16 sm:px-8">
      <section className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center text-center">
        <CheckCircle2 className="mb-6 h-14 w-14 text-[#5d7a5d]" aria-hidden />
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#b0614f]">
          Payment complete
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-[#17201a] sm:text-5xl">
          Your workbook is on its way.
        </h1>
        <p className="mt-5 text-lg leading-8 text-[#5f685f]">
          We are sending the download email to the address used at checkout. If it does not arrive in a
          few minutes, check spam or contact support.
        </p>
        <Link
          href="/"
          className="mt-8 rounded-full bg-[#17201a] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#2a342d]"
        >
          Back to product
        </Link>
      </section>
    </main>
  );
}
