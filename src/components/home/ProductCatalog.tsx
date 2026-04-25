import { products } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

export function ProductCatalog() {
  return (
    <section id="catalogo" className="bg-[#f8f2e8] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="animate-fade-in flex flex-col items-between justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
              I percorsi You First. <br />
              <span className="text-[#b96f62]">Per ogni fase.</span>
            </h2>
            <p className="mt-6 text-lg font-semibold leading-8 text-[#5f544b]">
              Scegli lo strumento giusto per il momento che stai vivendo. Ogni workbook è un viaggio pratico verso la tua serenità.
            </p>
          </div>
          <Link 
            href="/catalogo" 
            className="inline-flex h-12 items-center gap-2 rounded-full border-2 border-[#211b17] px-6 text-sm font-black transition hover:bg-[#211b17] hover:text-white"
          >
            Tutti i prodotti
          </Link>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, idx) => (
            <Link 
              key={product.slug}
              href={`/${product.slug}`}
              className={`animate-fade-in stagger-${(idx % 3) + 1} group flex flex-col overflow-hidden rounded-[2rem] bg-white transition-all hover:-translate-y-2 hover:shadow-[0_40px_80px_rgba(33,27,23,0.12)]`}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                {product.lifestyleImage && (
                  <Image
                    src={product.lifestyleImage}
                    alt={product.name}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#211b17]/60 via-transparent to-transparent opacity-60 transition group-hover:opacity-80" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] backdrop-blur-md">
                    <Star className="h-3 w-3 fill-current" />
                    <span>Best seller</span>
                  </div>
                  <h3 className="mt-3 text-2xl font-semibold leading-tight">{product.shortName}</h3>
                </div>
              </div>
              <div className="flex flex-col p-8">
                <p className="text-base font-semibold leading-7 text-[#5f544b] line-clamp-2">
                  {product.subtitle}
                </p>
                <div className="mt-8 flex items-center justify-between">
                  <span className="text-xl font-black">€{(product.price / 100).toFixed(2)}</span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f8f2e8] text-[#211b17] transition group-hover:bg-[#b96f62] group-hover:text-white">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
