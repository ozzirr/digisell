"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";

import { cn } from "@/lib/cn";

type CheckoutButtonProps = {
  productSlug: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  compact?: boolean;
};

export function CheckoutButton({ productSlug, children, variant = "primary", compact = false }: CheckoutButtonProps) {
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
        style={variant === "primary" ? { backgroundColor: "#211b17", color: "#ffffff" } : undefined}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full text-sm font-black transition disabled:cursor-not-allowed disabled:opacity-70",
          compact ? "min-h-11 px-5 py-2.5" : "min-h-12 px-6 py-3",
          variant === "primary"
            ? "bg-[#211b17] !text-white shadow-[0_18px_50px_rgba(33,27,23,0.22)] hover:bg-[#342a23]"
            : "border border-[#cbbbab] bg-white/75 text-[#211b17] hover:border-[#211b17]",
        )}
      >
        {isLoading ? <Loader2 className={cn("h-4 w-4 animate-spin", variant === "primary" && "!text-white")} aria-hidden /> : null}
        <span style={variant === "primary" ? { color: "#ffffff" } : undefined} className={cn(variant === "primary" && "!text-white")}>{children}</span>
        {!isLoading ? <ArrowRight className={cn("h-4 w-4", variant === "primary" && "!text-white")} aria-hidden /> : null}
      </button>
      {error ? <p className="max-w-sm text-sm font-medium text-[#a33f35]">{error}</p> : null}
    </div>
  );
}
