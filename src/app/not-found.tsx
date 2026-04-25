import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5 text-center">
      <section className="max-w-lg">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b0614f]">Not found</p>
        <h1 className="mt-3 text-4xl font-semibold text-[#17201a]">This product does not exist.</h1>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-[#17201a] px-6 py-3 text-sm font-bold text-white"
        >
          View current product
        </Link>
      </section>
    </main>
  );
}
