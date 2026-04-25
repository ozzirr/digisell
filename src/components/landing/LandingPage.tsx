import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/site/Logo";
import type { CSSProperties, ReactNode } from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  FileText,
  NotebookPen,
  ShieldCheck,
  Smartphone,
  Target,
} from "lucide-react";

import { CheckoutButton } from "@/components/product/CheckoutButton";
import { StickyCTA } from "@/components/product/StickyCTA";
import { SiteMenu } from "@/components/site/SiteMenu";
import type { PreviewAsset, Product } from "@/data/products";
import { formatPrice } from "@/data/products";

type ProductSectionProps = {
  product: Product;
};

type ProductPriceProps = ProductSectionProps & {
  price: string;
};

type LandingPageProps = ProductSectionProps & {
  isAuthenticated?: boolean;
};

export function LandingPage({ product, isAuthenticated = false }: LandingPageProps) {
  const price = formatPrice(product);

  return (
    <main
      className="min-h-screen bg-[#f8f2e8] pb-24 text-[#211b17] sm:pb-0"
      style={
        {
          "--product-accent": product.accentColor,
          "--product-accent-soft": product.accentSoft,
          "--product-accent-deep": product.accentDeep,
        } as CSSProperties
      }
    >
      <TopBar product={product} isAuthenticated={isAuthenticated} />
      <Hero product={product} price={price} />
      <EmotionalRecognition product={product} />
      <UseWhenSection product={product} />
      <QuoteSection product={product} />
      <InlineCTA product={product} />
      <BundleSection product={product} />
      <ProductPreview product={product} />
      <Benefits product={product} />
      <InlineCTA product={product} />
      <FitSection product={product} />
      <NotFitSection product={product} />
      <FutureReview product={product} />
      <LifestyleGallery />
      <HowItWorks />
      <OfferBox product={product} price={price} />
      <FAQ product={product} />
      <Disclaimer />
      <MicroTension product={product} />
      <FinalCTA product={product} price={price} />
      <StickyCTA productSlug={product.slug} label={product.primaryCta} />
    </main>
  );
}

export function TopBar({ product, isAuthenticated = false }: ProductSectionProps & { isAuthenticated?: boolean }) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#dfd2c2]/70 bg-[#f8f2e8]/92 px-4 backdrop-blur-xl sm:px-8">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Logo accentColor={product.accentColor} />
          <span className="hidden rounded-full bg-white/60 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#6f6257] sm:inline-flex">
            Workbook digitali
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <CheckoutButton productSlug={product.slug} variant="secondary" compact>
              Acquista
            </CheckoutButton>
          </div>
          <SiteMenu accentColor={product.accentColor} isAuthenticated={isAuthenticated} />
        </div>
      </div>
    </header>
  );
}

export function Hero({ product, price }: ProductPriceProps) {
  return (
    <section className="px-4 pb-12 pt-8 sm:px-8 lg:pb-18 lg:pt-14">
      <div className="mx-auto grid max-w-6xl gap-10 lg:min-h-[calc(100vh-4rem)] lg:grid-cols-[0.92fr_0.88fr] lg:items-center">
        <div>
          <p className="max-w-sm text-sm font-black uppercase tracking-[0.16em] text-[var(--product-accent-deep)]">
            {product.heroContext}
          </p>
          <h1 className="mt-5 max-w-3xl text-[2.9rem] font-semibold leading-[0.96] tracking-normal text-[#211b17] sm:text-6xl lg:text-7xl">
            {product.headline}
          </h1>
          <p className="mt-5 max-w-xl whitespace-pre-line text-[1.7rem] font-semibold leading-[1.12] tracking-normal text-[#3a3029] sm:text-4xl">
            {product.heroSubheadline}
          </p>
          <p className="mt-5 max-w-xl text-base font-semibold leading-7 text-[#6a5c51] sm:text-lg">
            {product.copy?.heroDescription ?? product.subtitle}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center" id="hero-primary-cta">
            <CheckoutButton productSlug={product.slug}>{product.primaryCta}</CheckoutButton>
            <a
              href="#bundle"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-white/72 px-6 py-3 text-sm font-black text-[#211b17] shadow-[inset_0_0_0_1px_rgba(62,48,38,0.14)] transition hover:bg-white"
            >
              {product.secondaryCta}
            </a>
          </div>
          <p className="mt-5 text-sm font-bold leading-6 text-[#6f6257]">
            {product.copy?.heroTrustLine ??
              "Accesso immediato alla dashboard · Workbook online · Nessun abbonamento"}
          </p>
          <p className="mt-2 text-xs font-semibold leading-5 text-[#8a7a6d]">
            {product.copy?.heroDisclaimer ?? "Non sostituisce terapia o supporto professionale."}
          </p>
        </div>
        <div className="relative">
          {product.lifestyleImage && (
            <div className="relative mb-10 overflow-hidden rounded-[2.5rem] shadow-[0_32px_80px_rgba(33,27,23,0.15)] lg:mb-0">
              <Image
                src={product.lifestyleImage}
                alt={product.name}
                width={800}
                height={800}
                className="aspect-[4/5] object-cover transition duration-700 hover:scale-105 sm:aspect-square lg:aspect-[4/5]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#211b17]/20 to-transparent" />
            </div>
          )}
          <div className={`${product.lifestyleImage ? "lg:absolute lg:-bottom-12 lg:-left-12 lg:w-80" : "w-full"}`}>
            <HeroMockup product={product} price={price} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function EmotionalRecognition({ product }: ProductSectionProps) {
  return (
    <SectionShell id="recognition">
      <SectionHeader eyebrow="Momento reale" title={product.recognitionTitle} />
      <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {product.emotionalThoughts.map((thought) => (
          <article key={thought} className="rounded-2xl bg-white/62 p-5 shadow-[0_12px_34px_rgba(54,39,28,0.05)]">
            <NotebookPen className="mb-4 h-5 w-5 text-[var(--product-accent)]" aria-hidden />
            <p className="text-lg font-semibold leading-7 text-[#342b25]">{thought}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

export function QuoteSection({ product }: ProductSectionProps) {
  return (
    <section className="px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-5xl rounded-[1.6rem] bg-[#211b17] px-6 py-12 text-center text-white shadow-[0_22px_70px_rgba(33,27,23,0.18)] sm:px-10">
        <p className="whitespace-pre-line text-3xl font-semibold leading-tight tracking-normal sm:text-5xl">
          “{product.quote}”
        </p>
      </div>
    </section>
  );
}

export function UseWhenSection({ product }: ProductSectionProps) {
  const items = product.copy?.useWhen;
  if (!items?.length) return null;
  return (
    <SectionShell id="use-when">
      <SectionHeader eyebrow="Quando aprirlo" title="Usalo quando" />
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <article
            key={item}
            className="rounded-2xl bg-white/68 p-5 shadow-[0_12px_34px_rgba(54,39,28,0.05)]"
          >
            <span
              className="mb-4 block h-2 w-10 rounded-full"
              style={{ backgroundColor: "var(--product-accent)" }}
              aria-hidden
            />
            <p className="text-lg font-semibold leading-7 text-[#342b25]">{item}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

export function MicroTension({ product }: ProductSectionProps) {
  const tension = product.copy?.microTension;
  if (!tension) return null;
  return (
    <section className="px-4 pt-6 pb-2 sm:px-8 sm:pt-10">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-2xl font-semibold leading-tight tracking-normal text-[#211b17] sm:text-4xl">
          {tension.line1}
        </p>
        <p className="mt-4 text-2xl font-semibold leading-tight tracking-normal text-[#5f544b] sm:text-4xl">
          {tension.line2}
        </p>
      </div>
    </section>
  );
}

export function BundleSection({ product }: ProductSectionProps) {
  return (
    <SectionShell id="bundle">
      <SectionHeader
        eyebrow="Cosa ricevi subito"
        title={product.copy?.bundleTitle ?? "Non stai acquistando un semplice PDF."}
        copy={
          product.copy?.bundleCopy ??
          "Ricevi accesso a un workbook privato online: pagine guidate, esercizi, risposte salvate e una struttura pronta per l'export PDF."
        }
      />
      <div className="mt-8 grid gap-4 lg:grid-cols-5">
        {product.bundleItems.map((item, index) => (
          <article key={item.fileName} className="rounded-2xl bg-white/66 p-5 shadow-[0_14px_40px_rgba(54,39,28,0.06)]">
            <div className="mb-5 flex items-center justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--product-accent-soft)] text-sm font-black text-[var(--product-accent-deep)]">
                0{index + 1}
              </span>
              <FileText className="h-5 w-5 text-[var(--product-accent)]" aria-hidden />
            </div>
            <h3 className="text-xl font-black leading-tight">{item.title}</h3>
            <p className="mt-3 text-sm font-semibold leading-6 text-[#5f544b]">{item.description}</p>
            <p className="mt-5 text-xs font-bold leading-5 text-[#8a7a6d]">Modulo online {index + 1}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

export function ProductPreview({ product }: ProductSectionProps) {
  return (
    <section className="bg-[#eee2d3] px-4 py-16 sm:px-8" id="preview">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Product preview"
          title={product.copy?.previewTitle ?? "Pagine concrete, pronte da compilare."}
          copy={
            product.copy?.previewCopy ??
            "Il workbook vive nella tua area personale: telefono, schede guidate, checklist, tracker ed esercizi salvati online."
          }
        />
        <div className="mt-8 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
          <PhonePreview product={product} />
          <div className="grid gap-4 sm:grid-cols-2">
            {product.previewAssets.map((asset) => (
              <PrintableMockup key={asset.title} title={asset.title} description={asset.description} type={asset.type} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Benefits({ product }: ProductSectionProps) {
  return (
    <SectionShell>
      <SectionHeader
        eyebrow="Come ti aiuta concretamente"
        title={product.copy?.benefitsTitle ?? "Qualcosa da fare adesso, non solo da leggere."}
      />
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {product.benefits.map((benefit) => (
          <article key={benefit} className="rounded-2xl bg-[#211b17] p-5 text-white shadow-[0_18px_52px_rgba(33,27,23,0.12)]">
            <CheckCircle2 className="mb-5 h-6 w-6 text-[var(--product-accent-soft)]" aria-hidden />
            <p className="text-xl font-semibold leading-7">{benefit}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

export function FitSection({ product }: ProductSectionProps) {
  return (
    <SectionShell>
      <ListPanel title={product.copy?.fitTitle ?? "È per te se"} items={product.fit} icon="check" />
    </SectionShell>
  );
}

export function NotFitSection({ product }: ProductSectionProps) {
  return (
    <section className="px-4 pb-16 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <ListPanel
          title={product.copy?.notFitTitle ?? "Non è per te se"}
          items={product.notFit}
          icon="shield"
          subdued
        />
      </div>
    </section>
  );
}

export function FutureReview({ product }: ProductSectionProps) {
  return (
    <section className="bg-[#211b17] px-4 py-16 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-[var(--product-accent-soft)]">
          Niente recensioni finte
        </p>
        <h2 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
          {product.copy?.futureTitle ?? "Cosa potresti sentire dopo averlo compilato"}
        </h2>
        <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-white/68">
          {product.copy?.futureSubtitle ??
            "Non promesse. Solo il tipo di chiarezza che il workbook ti aiuta a cercare."}
        </p>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {product.futureThoughts.map((thought) => (
            <article key={thought} className="rounded-2xl bg-white/[0.07] p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
              <p className="text-xl font-semibold leading-8">“{thought}”</p>
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm font-semibold text-white/55">
          Le recensioni verificate verranno aggiunte dopo i primi acquisti.
        </p>
      </div>
    </section>
  );
}

export function HowItWorks({ product }: { product?: Product }) {
  const steps = product?.copy?.howItWorksSteps ?? [
    "Acquisti in modo sicuro.",
    "Accedi alla tua area personale.",
    "Apri il workbook “Inizia qui”.",
    "Scrivi e salvi le risposte online.",
  ];

  return (
    <SectionShell>
      <SectionHeader
        eyebrow="Come funziona"
        title={product?.copy?.howItWorksTitle ?? "Dal checkout alla prima pagina in pochi minuti."}
      />
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {steps.map((step, index) => (
          <article key={step} className="rounded-2xl bg-white/62 p-5 shadow-[0_12px_34px_rgba(54,39,28,0.05)]">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#211b17] text-sm font-black text-white">
              {index + 1}
            </span>
            <p className="mt-5 text-lg font-black leading-7 text-[#211b17]">{step}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

export function OfferBox({ product, price }: ProductPriceProps) {
  const features = product.copy?.offerFeatures ?? [
    "Workbook online incluso",
    "Accesso immediato alla dashboard",
    "Risposte salvate",
    "Mobile-friendly",
    "Nessun abbonamento",
    "Checkout sicuro",
  ];
  const afterTitle = product.copy?.offerAfterTitle ?? "Cosa succede dopo l'acquisto";
  const afterBullets = product.copy?.offerAfterBullets ?? [
    "Accedi alla dashboard.",
    "Puoi aprirlo da telefono.",
    "Le risposte vengono salvate.",
    "Nessun abbonamento.",
  ];

  return (
    <section className="px-4 py-16 sm:px-8" id="offer">
      <div className="mx-auto grid max-w-6xl gap-6 rounded-[1.6rem] bg-white/70 p-6 shadow-[0_22px_80px_rgba(54,39,28,0.12)] sm:p-8 lg:grid-cols-[1fr_0.78fr] lg:p-10">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-[var(--product-accent-deep)]">
            Offerta digitale
          </p>
          <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">{product.name}</h2>
          <p className="mt-4 text-5xl font-black text-[#211b17]">{price}</p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {features.map((feature) => (
              <p key={feature} className="flex items-center gap-3 text-base font-black text-[#342b25]">
                <CheckCircle2 className="h-5 w-5 text-[var(--product-accent)]" aria-hidden />
                {feature}
              </p>
            ))}
          </div>
          <div className="mt-8">
            <CheckoutButton productSlug={product.slug}>{product.primaryCta}</CheckoutButton>
          </div>
        </div>
        <div className="rounded-[1.2rem] bg-[#211b17] p-6 text-white">
          <h3 className="text-2xl font-semibold tracking-normal">{afterTitle}</h3>
          <div className="mt-6 grid gap-4">
            {afterBullets.map((item) => (
              <p key={item} className="flex gap-3 text-lg font-semibold leading-7 text-white/82">
                <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-[var(--product-accent-soft)]" aria-hidden />
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FAQ({ product }: ProductSectionProps) {
  return (
    <SectionShell id="faq">
      <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
        <SectionHeader eyebrow="FAQ" title="Prima di acquistare." />
        <div className="divide-y divide-[#e1d5c6] rounded-2xl bg-white/62 shadow-[0_12px_34px_rgba(54,39,28,0.05)]">
          {product.faq.map((item) => (
            <details key={`${product.slug}-${item.question}`} className="group p-5 sm:p-6">
              <summary className="cursor-pointer list-none text-lg font-black leading-7 text-[#211b17]">
                {item.question}
              </summary>
              <p className="mt-3 text-base font-semibold leading-7 text-[#5f544b]">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

export function Disclaimer() {
  return (
    <section className="px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl rounded-2xl bg-[#eee2d3] p-5">
        <p className="text-sm font-semibold leading-6 text-[#5f544b]">
          Questo workbook non sostituisce terapia, consulenza psicologica o supporto professionale. Se vivi
          una situazione di violenza, minaccia o pericolo, chiedi aiuto immediato a persone fidate o servizi
          specializzati.
        </p>
      </div>
    </section>
  );
}

export function FinalCTA({ product, price }: ProductPriceProps) {
  return (
    <section className="px-4 pb-28 pt-12 sm:px-8 sm:pb-20">
      <div className="mx-auto max-w-6xl rounded-[1.6rem] bg-[#211b17] p-7 text-white shadow-[0_22px_80px_rgba(33,27,23,0.2)] sm:p-12 lg:p-16">
        <Target className="mb-6 h-8 w-8 text-[var(--product-accent-soft)]" aria-hidden />
        <h2 className="max-w-3xl text-4xl font-semibold leading-tight tracking-normal sm:text-6xl">
          {product.copy?.finalHeadline ?? "Prima di scegliere loro, scegli te."}
        </h2>
        <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-white/70">
          {product.copy?.finalSupportingLine ??
            "Workbook digitali per rimetterti al centro quando l'amore ti confonde."}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <CheckoutButton productSlug={product.slug} variant="secondary">
            {product.primaryCta}
          </CheckoutButton>
          <p className="text-sm font-bold text-white/55">{price} · workbook online · accesso immediato</p>
        </div>
      </div>
    </section>
  );
}

function LifestyleGallery() {
  const images = [
    { src: "/images/lifestyle/workbook.png", alt: "Writing in workbook", span: "row-span-2" },
    { src: "/images/lifestyle/freedom.png", alt: "Walking in nature", span: "col-span-1" },
    { src: "/images/lifestyle/tactile.png", alt: "Notebook detail", span: "col-span-1" },
    { src: "/images/lifestyle/reflection.png", alt: "Self reflection", span: "row-span-2" },
    { src: "/images/lifestyle/relief.png", alt: "Relief and smile", span: "col-span-2" },
    { src: "/images/lifestyle/app-usage.png", alt: "App usage in cozy setting", span: "col-span-1" },
    { src: "/images/lifestyle/empowered.png", alt: "Empowered expression", span: "col-span-1" },
  ];

  return (
    <section className="px-4 py-16 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Momenti You First"
          title="Ritrova il tuo spazio."
          copy="Non è solo un download. È il momento in cui decidi di fermarti e ascoltarti davvero."
        />
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {images.map((img, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-3xl bg-[#eee2d3] shadow-[0_12px_34px_rgba(54,39,28,0.05)] ${img.span}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={600}
                height={800}
                className="h-full w-full object-cover transition duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InlineCTA({ product }: ProductSectionProps) {
  return (
    <section className="px-4 py-4 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 rounded-2xl bg-white/58 p-4 shadow-[0_12px_34px_rgba(54,39,28,0.05)] sm:flex-row sm:items-center sm:justify-between">
        <p className="text-base font-black leading-6 text-[#342b25]">{product.secondaryCta}</p>
        <CheckoutButton productSlug={product.slug} variant="secondary" compact>
          {product.primaryCta}
        </CheckoutButton>
      </div>
    </section>
  );
}

function HeroMockup({ product, price }: ProductPriceProps) {
  return (
    <div className="mx-auto w-full max-w-[28rem] lg:max-w-[30rem]">
      <div className="rounded-[1.8rem] bg-[#efe3d4] p-4 shadow-[0_24px_74px_rgba(54,39,28,0.14)]">
        <div className="rounded-[1.35rem] bg-white/78 p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--product-accent-deep)]">
              Bundle digitale
            </p>
            <p className="rounded-full bg-[var(--product-accent-soft)] px-3 py-1 text-sm font-black text-[var(--product-accent-deep)]">
              {price}
            </p>
          </div>
          <div className="mt-5 grid grid-cols-[0.88fr_1.12fr] gap-3">
            <div className="rounded-[1.1rem] bg-[#211b17] p-4 text-white">
              <p className="text-sm font-black">You First</p>
              <h2 className="mt-8 text-2xl font-semibold leading-none tracking-normal">{product.shortName}</h2>
              <div className="mt-8 space-y-2">
                <span className="block h-2 w-16 rounded-full bg-white/34" />
                <span className="block h-2 w-24 rounded-full bg-white/18" />
              </div>
            </div>
            <div className="grid gap-3">
              {product.bundleItems.slice(0, 2).map((item, index) => (
                <div key={item.fileName} className="rounded-[1rem] bg-[#f8f2e8] p-4">
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-[#8a7a6d]">Modulo 0{index + 1}</p>
                  <p className="mt-8 text-base font-black leading-tight text-[#342b25]">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 grid grid-cols-5 gap-2">
            {product.bundleItems.map((item, index) => (
              <span
                key={item.fileName}
                className="grid h-12 place-items-center rounded-xl bg-[#f8f2e8] text-xs font-black text-[var(--product-accent-deep)]"
              >
                {index + 1}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm font-bold leading-6 text-[#6a5c51]">
            Workbook privato, guidato e accessibile da telefono.
          </p>
        </div>
      </div>
    </div>
  );
}

function PhonePreview({ product }: ProductSectionProps) {
  return (
    <article className="rounded-[1.6rem] bg-[#211b17] p-5 text-white shadow-[0_24px_70px_rgba(33,27,23,0.2)]">
      <div className="mx-auto max-w-[17rem] rounded-[2rem] bg-[#0f0c0a] p-3">
        <div className="rounded-[1.45rem] bg-[#f8f2e8] p-4 text-[#211b17]">
          <div className="mb-5 flex items-center justify-between">
            <span className="h-2 w-14 rounded-full bg-[#d8cbbb]" />
            <Smartphone className="h-4 w-4 text-[var(--product-accent)]" aria-hidden />
          </div>
          <p className="text-xs font-black uppercase tracking-[0.13em] text-[var(--product-accent-deep)]">
            Inizia qui
          </p>
          <h3 className="mt-3 text-2xl font-black leading-none">{product.shortName}</h3>
          <div className="mt-6 space-y-3">
            <div className="rounded-xl bg-white p-3">
              <div className="mb-2 h-2 w-24 rounded-full bg-[#211b17]" />
              <div className="h-2 w-full rounded-full bg-[#dacdbc]" />
            </div>
            <div className="rounded-xl bg-white p-3">
              <div className="mb-2 h-2 w-20 rounded-full bg-[var(--product-accent)]" />
              <div className="h-2 w-10/12 rounded-full bg-[#dacdbc]" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function PrintableMockup({ title, description, type }: PreviewAsset) {
  return (
    <article className="min-h-[16rem] rounded-[1.2rem] bg-[#fbf7f1] p-5 shadow-[0_18px_44px_rgba(54,39,28,0.08)]">
      <div className="mb-7 flex items-center justify-between">
        <span className="text-xs font-black uppercase tracking-[0.14em] text-[var(--product-accent-deep)]">
          {type}
        </span>
        <span className="h-8 w-8 rounded-full bg-[var(--product-accent-soft)]" />
      </div>
      <div className="space-y-3">
        <div className="h-3 w-3/4 rounded-full bg-[#211b17]" />
        <div className="h-2 w-full rounded-full bg-[#d8c8b5]" />
        <div className="h-2 w-10/12 rounded-full bg-[#d8c8b5]" />
        <div className="grid grid-cols-2 gap-2 pt-4">
          <span className="h-12 rounded-xl bg-white" />
          <span className="h-12 rounded-xl bg-white" />
        </div>
      </div>
      <h3 className="mt-7 text-xl font-black leading-tight text-[#211b17]">{title}</h3>
      <p className="mt-3 text-sm font-semibold leading-6 text-[#5f544b]">{description}</p>
    </article>
  );
}

function ListPanel({
  title,
  items,
  icon,
  subdued = false,
}: {
  title: string;
  items: string[];
  icon: "check" | "shield";
  subdued?: boolean;
}) {
  return (
    <article className={`rounded-[1.4rem] p-6 shadow-[0_14px_40px_rgba(54,39,28,0.06)] sm:p-8 ${subdued ? "bg-[#eee2d3]" : "bg-white/64"}`}>
      <h2 className="text-3xl font-semibold tracking-normal text-[#211b17]">{title}</h2>
      <div className="mt-6 grid gap-3">
        {items.map((item) => (
          <p key={item} className="flex gap-3 text-lg font-semibold leading-7 text-[#342b25]">
            {icon === "check" ? (
              <Check className="mt-1 h-5 w-5 shrink-0 text-[var(--product-accent)]" aria-hidden />
            ) : (
              <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[var(--product-accent)]" aria-hidden />
            )}
            {item}
          </p>
        ))}
      </div>
    </article>
  );
}

function SectionShell({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <section id={id} className="px-4 py-16 sm:px-8">
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-black uppercase tracking-[0.16em] text-[var(--product-accent-deep)]">
        {eyebrow}
      </p>
      <h2 className="mt-3 whitespace-pre-line text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
        {title}
      </h2>
      {copy ? <p className="mt-5 text-lg font-medium leading-8 text-[#5f544b]">{copy}</p> : null}
    </div>
  );
}
