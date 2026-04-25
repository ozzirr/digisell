"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

type LogoProps = {
  accentColor?: string;
  href?: ComponentProps<typeof Link>["href"];
  className?: string;
  onClick?: () => void;
};

export function Logo({ accentColor = "#b96f62", href = "/", className = "", onClick }: LogoProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group relative inline-flex text-xl font-black tracking-normal text-[#211b17] ${className}`}
    >
      You First
      <span
        className="absolute -bottom-1 left-0 h-[3px] w-9 rounded-full transition-all group-hover:w-14"
        style={{ backgroundColor: accentColor }}
      />
    </Link>
  );
}
