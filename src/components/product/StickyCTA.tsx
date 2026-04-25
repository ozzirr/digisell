"use client";

import { useEffect, useState } from "react";

import { CheckoutButton } from "@/components/product/CheckoutButton";

type StickyCTAProps = {
  productSlug: string;
  label: string;
};

export function StickyCTA({ productSlug, label }: StickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const firstCta = document.getElementById("hero-primary-cta");

    if (!firstCta) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      {
        rootMargin: "-72px 0px 0px 0px",
        threshold: 0,
      },
    );

    observer.observe(firstCta);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-[#dfd2c2] bg-[#f8f2e8]/94 px-4 py-3 shadow-[0_-14px_44px_rgba(54,39,28,0.14)] backdrop-blur-xl transition duration-200 sm:hidden ${
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <div className="mx-auto flex max-w-md justify-center">
        <CheckoutButton productSlug={productSlug} compact>
          {label}
        </CheckoutButton>
      </div>
    </div>
  );
}
