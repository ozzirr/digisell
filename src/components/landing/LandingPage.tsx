import Image from "next/image";
import { Check, Download, LockKeyhole, Mail, ShieldCheck, Sparkles, Star } from "lucide-react";

import type { Product } from "@/data/products";
import { formatPrice } from "@/data/products";
import { CheckoutButton } from "@/components/product/CheckoutButton";

type LandingPageProps = {
  product: Product;
};

export function LandingPage({ product }: LandingPageProps) {
  const price = formatPrice(product);

  return (
    <main>
      <Nav product={product} />
      <Hero product={product} price={price} />
      <TrustBar />
      <ProductPreview product={product} />
      <Benefits product={product} />
      <Inside product={product} />
      <Testimonials product={product} />
      <Faq product={product} />
      <FinalCta product={product} price={price} />
    </main>
  );
}

function Nav({ product }: LandingPageProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-[#e8dfd3]/80 bg-[#fbf7f1]/86 px-5 backdrop-blur-xl sm:px-8">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between">
        <a href="/" className="text-lg font-black tracking-tight text-[#17201a]">
          DigiSell
        </a>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-[#5f685f] md:flex">
          <a href="#preview" className="transition hover:text-[#17201a]">
            Preview
          </a>
          <a href="#inside" className="transition hover:text-[#17201a]">
            Inside
          </a>
          <a href="#reviews" className="transition hover:text-[#17201a]">
            Reviews
          </a>
          <a href="#faq" className="transition hover:text-[#17201a]">
            FAQ
          </a>
        </nav>
        <CheckoutButton productSlug={product.slug} variant="secondary">
          Buy now
        </CheckoutButton>
      </div>
    </header>
  );
}

function Hero({ product, price }: LandingPageProps & { price: string }) {
  return (
    <section className="px-5 pb-16 pt-14 sm:px-8 lg:pb-24 lg:pt-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#e2d8cb] bg-white/60 px-4 py-2 text-sm font-bold text-[#8a584d]">
            <Sparkles className="h-4 w-4" aria-hidden />
            Premium digital workbook
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-tight text-[#17201a] sm:text-6xl lg:text-7xl">
            Feel less overwhelmed. Know what to do next.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5f685f] sm:text-xl">
            {product.description}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <CheckoutButton productSlug={product.slug}>Get instant access for {price}</CheckoutButton>
            <a
              href="#preview"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#d7cec1] bg-white/60 px-6 py-3 text-sm font-bold text-[#17201a] transition hover:border-[#17201a]"
            >
              View preview
            </a>
          </div>
          <div className="mt-8 grid gap-3 text-sm font-semibold text-[#5f685f] sm:grid-cols-3">
            <span className="inline-flex items-center gap-2">
              <LockKeyhole className="h-4 w-4 text-[#b0614f]" aria-hidden />
              Secure checkout
            </span>
            <span className="inline-flex items-center gap-2">
              <Mail className="h-4 w-4 text-[#b0614f]" aria-hidden />
              Email delivery
            </span>
            <span className="inline-flex items-center gap-2">
              <Download className="h-4 w-4 text-[#b0614f]" aria-hidden />
              Digital download
            </span>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-5 rounded-[2.5rem] bg-[#17201a] opacity-10 blur-3xl" />
          <div className="relative rounded-[2rem] border border-white/80 bg-white/50 p-4 shadow-[0_30px_90px_rgba(65,50,36,0.18)] backdrop-blur">
            <Image
              src={product.coverImage}
              width={900}
              height={1100}
              alt={`${product.title} cover preview`}
              priority
              className="h-auto w-full rounded-[1.5rem]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <section className="border-y border-[#e8dfd3] bg-white/45 px-5 py-5 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-4 text-sm font-bold text-[#5f685f] sm:grid-cols-3">
        <span className="inline-flex items-center justify-center gap-2 sm:justify-start">
          <ShieldCheck className="h-4 w-4 text-[#5d7a5d]" aria-hidden />
          Stripe-hosted payments
        </span>
        <span className="inline-flex items-center justify-center gap-2">
          <Mail className="h-4 w-4 text-[#5d7a5d]" aria-hidden />
          Automated fulfillment email
        </span>
        <span className="inline-flex items-center justify-center gap-2 sm:justify-end">
          <LockKeyhole className="h-4 w-4 text-[#5d7a5d]" aria-hidden />
          Temporary delivery links
        </span>
      </div>
    </section>
  );
}

function ProductPreview({ product }: LandingPageProps) {
  return (
    <section id="preview" className="px-5 py-20 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b0614f]">Product preview</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#17201a] sm:text-5xl">
            A workbook that feels calm, useful, and worth keeping.
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#5f685f]">{product.subtitle}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            "Printable PDF layout",
            "Tablet-friendly prompts",
            "Reflection and planning pages",
            "Reusable weekly reset system",
          ].map((item) => (
            <div key={item} className="rounded-lg border border-[#e5dbcf] bg-white/58 p-5">
              <Check className="mb-5 h-5 w-5 text-[#5d7a5d]" aria-hidden />
              <h3 className="text-lg font-bold text-[#17201a]">{item}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Benefits({ product }: LandingPageProps) {
  return (
    <section className="bg-[#17201a] px-5 py-20 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#e3b7aa]">Benefits</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Built for the moment when the customer needs relief and direction.
          </h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {product.benefits.map((benefit) => (
            <div key={benefit} className="rounded-lg border border-white/12 bg-white/[0.06] p-6">
              <Check className="mb-5 h-5 w-5 text-[#e3b7aa]" aria-hidden />
              <p className="text-lg font-semibold leading-8">{benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Inside({ product }: LandingPageProps) {
  return (
    <section id="inside" className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b0614f]">What is inside</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#17201a] sm:text-5xl">
              A clear path from reflection to action.
            </h2>
          </div>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {product.modules.map((module, index) => (
            <article key={module.title} className="rounded-lg border border-[#e5dbcf] bg-white/60 p-6">
              <p className="text-sm font-black text-[#b0614f]">0{index + 1}</p>
              <h3 className="mt-4 text-2xl font-semibold text-[#17201a]">{module.title}</h3>
              <p className="mt-3 leading-7 text-[#5f685f]">{module.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials({ product }: LandingPageProps) {
  return (
    <section id="reviews" className="bg-[#fffaf2] px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b0614f]">Reviews</p>
        <h2 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-[#17201a] sm:text-5xl">
          Trust from people who buy and use digital products.
        </h2>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {product.testimonials.map((testimonial) => (
            <figure key={testimonial.author} className="rounded-lg border border-[#e5dbcf] bg-white/70 p-6">
              <div className="mb-5 flex gap-1 text-[#b0614f]" aria-hidden>
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="text-lg font-semibold leading-8 text-[#17201a]">
                "{testimonial.quote}"
              </blockquote>
              <figcaption className="mt-6 text-sm font-bold text-[#5f685f]">
                {testimonial.author}
                {testimonial.role ? <span className="block font-medium">{testimonial.role}</span> : null}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq({ product }: LandingPageProps) {
  return (
    <section id="faq" className="px-5 py-20 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b0614f]">FAQ</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#17201a]">Before checkout.</h2>
        </div>
        <div className="divide-y divide-[#e5dbcf] rounded-lg border border-[#e5dbcf] bg-white/62">
          {product.faq.map((item) => (
            <details key={item.question} className="group p-6">
              <summary className="cursor-pointer list-none text-lg font-bold text-[#17201a]">
                {item.question}
              </summary>
              <p className="mt-3 leading-7 text-[#5f685f]">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta({ product, price }: LandingPageProps & { price: string }) {
  return (
    <section className="px-5 pb-20 sm:px-8">
      <div className="mx-auto max-w-6xl rounded-[1.5rem] bg-[#17201a] p-8 text-white sm:p-12 lg:p-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#e3b7aa]">Instant access</p>
            <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Start with {product.title}.
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-white/72">
              Secure checkout, automated email delivery, and a temporary download link after payment.
            </p>
          </div>
          <CheckoutButton productSlug={product.slug}>Buy for {price}</CheckoutButton>
        </div>
      </div>
    </section>
  );
}
