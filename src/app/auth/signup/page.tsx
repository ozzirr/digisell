import { AuthForm } from "@/components/auth/AuthForm";
import { Logo } from "@/components/site/Logo";
import Link from "next/link";
import { ShieldCheck, Zap, Download } from "lucide-react";

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-[#f8f2e8] px-4 py-12 flex flex-col items-center justify-center text-[#211b17] sm:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Logo />
          <h1 className="mt-6 text-4xl font-semibold tracking-normal sm:text-5xl">Unisciti a You First</h1>
          <p className="mt-4 text-lg font-semibold text-[#5f544b]">
            Registrati gratuitamente per ricevere il manuale "Primi Passi" e accedere all'area riservata.
          </p>
        </div>

        <AuthForm mode="signup" />

        <div className="mt-10 space-y-4">
          <BenefitItem 
            icon={<Download className="h-5 w-5" />} 
            text="Manuale gratuito dei primi passi" 
          />
          <BenefitItem 
            icon={<Zap className="h-5 w-5" />} 
            text="Accesso immediato senza password" 
          />
          <BenefitItem 
            icon={<ShieldCheck className="h-5 w-5" />} 
            text="Privacy garantita al 100%" 
          />
        </div>

        <p className="mt-10 text-center text-sm font-semibold text-[#7a6c60]">
          Hai già un account?{" "}
          <Link href="/auth/login" className="text-[#211b17] font-black underline">
            Accedi
          </Link>
        </p>

        <Link href="/" className="mt-8 block text-center text-sm font-black text-[#7a6c60] hover:text-[#211b17]">
          ← Torna alla home
        </Link>
      </div>
    </main>
  );
}

function BenefitItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 text-sm font-bold text-[#6f6257]">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#b96f62]">
        {icon}
      </div>
      <span>{text}</span>
    </div>
  );
}
