"use client";

import Link from "next/link";
import { Logo } from "@/components/site/Logo";
import { SiteMenu } from "@/components/site/SiteMenu";

type DashboardTopBarProps = {
  accentColor?: string;
};

export function DashboardTopBar({ accentColor = "#b96f62" }: DashboardTopBarProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <Logo accentColor={accentColor} />
      <div className="flex items-center gap-3">
        <span className="hidden rounded-full bg-white/64 px-3 py-1 text-xs font-black text-[#6f6257] sm:inline-flex">
          Area privata
        </span>
        <SiteMenu isAuthenticated accentColor={accentColor} />
      </div>
    </div>
  );
}
