"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";

import { cn } from "@/lib/cn";

type CheckoutButtonProps = {
  productSlug: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

export function CheckoutButton({ productSlug, children, variant = "primary" }: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productSlug }),
      });
      const payload = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !payload.url) {
        throw new Error(payload.error || "Unable to start checkout.");
      }

      window.location.assign(payload.url);
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : "Unable to start checkout.");
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-3">
      <button
        type="button"
        onClick={startCheckout}
        disabled={isLoading}
        className={cn(
          "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-70",
          variant === "primary"
            ? "bg-[#17201a] text-white shadow-[0_20px_60px_rgba(23,32,26,0.22)] hover:bg-[#2a342d]"
            : "border border-[#d7cec1] bg-white/75 text-[#17201a] hover:border-[#17201a]",
        )}
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
        {children}
        {!isLoading ? <ArrowRight className="h-4 w-4" aria-hidden /> : null}
      </button>
      {error ? <p className="max-w-sm text-sm font-medium text-[#a33f35]">{error}</p> : null}
    </div>
  );
}
