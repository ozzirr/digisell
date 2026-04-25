import { CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Acquisto completato",
  description: "Il tuo workbook You First è pronto nella tua area personale.",
};

type CheckoutSuccessPageProps = {
  searchParams: Promise<{
    session_id?: string;
  }>;
};

export default async function CheckoutSuccessPage({ searchParams }: CheckoutSuccessPageProps) {
  const { session_id: sessionId } = await searchParams;
  const accessHref = sessionId ? `/access/checkout?session_id=${sessionId}` : "/dashboard";

  return (
    <main className="min-h-screen px-5 py-16 sm:px-8">
      <section className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center text-center">
        <CheckCircle2 className="mb-6 h-14 w-14 text-[#5d7a5d]" aria-hidden />
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#b0614f]">
          Acquisto completato
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-[#17201a] sm:text-5xl">
          Il tuo workbook è pronto nella tua area personale.
        </h1>
        <p className="mt-5 text-lg leading-8 text-[#5f685f]">
          Puoi accedere subito al workbook, leggerlo e iniziare a compilarlo online. Ti abbiamo inviato
          anche una conferma via email.
        </p>
        <a
          href={accessHref}
          className="mt-8 rounded-full bg-[#17201a] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#2a342d]"
        >
          Vai alla mia area
        </a>
      </section>
    </main>
  );
}
