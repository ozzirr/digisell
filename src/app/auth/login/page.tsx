import { AuthForm } from "@/components/auth/AuthForm";
import { Logo } from "@/components/site/Logo";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#f8f2e8] px-4 py-12 flex flex-col items-center justify-center text-[#211b17] sm:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Logo />
          <h1 className="mt-6 text-4xl font-semibold tracking-normal sm:text-5xl">Bentornato/a</h1>
          <p className="mt-4 text-lg font-semibold text-[#5f544b]">
            Inserisci la tua email per accedere alla tua area personale.
          </p>
        </div>

        <AuthForm mode="login" />

        <p className="mt-10 text-center text-sm font-semibold text-[#7a6c60]">
          Non hai ancora un account?{" "}
          <Link href="/auth/signup" className="text-[#211b17] font-black underline">
            Registrati ora
          </Link>
        </p>

        <Link href="/" className="mt-8 block text-center text-sm font-black text-[#7a6c60] hover:text-[#211b17]">
          ← Torna alla home
        </Link>
      </div>
    </main>
  );
}
