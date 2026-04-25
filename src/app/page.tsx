import { getCurrentCustomer } from "@/lib/auth/customer-access";
import { BrandHero } from "@/components/home/BrandHero";
import { LeadMagnet } from "@/components/home/LeadMagnet";
import { ProductCatalog } from "@/components/home/ProductCatalog";
import { SiteMenu } from "@/components/site/SiteMenu";
import { Logo } from "@/components/site/Logo";
import Link from "next/link";

export default async function Home() {
  const customer = await getCurrentCustomer();
  const isAuthenticated = Boolean(customer);

  return (
    <div className="bg-[#f8f2e8]">
      <header className="fixed top-0 z-50 w-full px-4 pt-6 sm:px-8">
        <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full bg-white/62 px-6 py-3 backdrop-blur-xl shadow-[0_8px_32px_rgba(33,27,23,0.05)] border border-white/40">
          <Logo />
          <div className="flex items-center gap-4">
            {!isAuthenticated && (
              <Link 
                href="/auth/login" 
                className="hidden text-sm font-black text-[#6f6257] hover:text-[#211b17] sm:block"
              >
                Accedi
              </Link>
            )}
            <Link 
              href={isAuthenticated ? "/dashboard" : "/auth/signup"} 
              className="inline-flex h-10 items-center justify-center rounded-full bg-[#211b17] px-5 text-sm font-black !text-white transition hover:opacity-92"
            >
              <span className="!text-white">{isAuthenticated ? "La tua area" : "Inizia ora"}</span>
            </Link>
            <SiteMenu isAuthenticated={isAuthenticated} />
          </div>
        </nav>
      </header>
      
      <main>
        <BrandHero />
        <LeadMagnet />
        <ProductCatalog />
      </main>
      
      <footer className="bg-white py-16 border-t border-[#f8f2e8]">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-8">
          <Logo />
          <p className="mt-6 text-[#7a6c60] text-sm font-semibold max-w-md mx-auto leading-6">
            You First è uno spazio sicuro per la tua crescita personale. Workbook digitali pensati per chi vuole rimettersi al centro.
          </p>
          <div className="mt-10 flex justify-center gap-8 text-xs font-black uppercase tracking-widest text-[#7a6c60]">
            <Link href="/catalogo" className="hover:text-[#211b17]">Catalogo</Link>
            <Link href="/contatti" className="hover:text-[#211b17]">Contatti</Link>
            <Link href="/privacy" className="hover:text-[#211b17]">Privacy</Link>
          </div>
          <p className="mt-16 text-[#dfd2c2] text-[10px] font-black uppercase tracking-widest">
            © {new Date().getFullYear()} You First. Tutti i diritti riservati.
          </p>
        </div>
      </footer>
    </div>
  );
}
